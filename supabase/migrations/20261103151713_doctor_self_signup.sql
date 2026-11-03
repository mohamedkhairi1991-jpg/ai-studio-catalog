-- Doctor self sign-up without administrator approval (owner decision, 2026-11-03).
--
-- A new doctor gives name, phone and medical specialty and can use the
-- catalog straight away. A licence number is no longer required.
-- The specialty also drives the two "for your specialty" products on the
-- doctor home page.

-- 1. A licence number is no longer required for an approved doctor.
--    A self-approved doctor is recorded as reviewed by their own profile.
alter table public.healthcare_professionals
  drop constraint healthcare_professionals_review_metadata;
alter table public.healthcare_professionals
  add constraint healthcare_professionals_review_metadata check (
    (
      verification_status = 'pending'
      and reviewed_by is null
      and reviewed_at is null
      and review_reason is null
    )
    or (
      verification_status = 'approved'
      and reviewed_by is not null
      and reviewed_at is not null
    )
    or (
      verification_status in ('rejected', 'documents_requested')
      and reviewed_by is not null
      and reviewed_at is not null
      and review_reason is not null
    )
  );

create or replace function private.validate_healthcare_professional()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.specialty_id is not null
    and not private.validate_active_specialty(new.specialty_id, new.profession_type) then
    raise exception using errcode = '23514',
      message = 'The selected specialty must be active and compatible with the profession.';
  end if;

  if new.verification_status = 'approved' and new.specialty_id is null then
    raise exception using errcode = '23514',
      message = 'An active specialty is required for approval.';
  end if;

  return new;
end;
$$;

-- 2. Self sign-up: one call saves the profile and approves the doctor.
create or replace function public.doctor_self_signup(
  p_full_name text,
  p_phone text,
  p_specialty_id uuid
)
returns public.healthcare_professionals
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile_id uuid := private.current_profile_id();
  v_profile public.profiles;
  v_name text := nullif(btrim(coalesce(p_full_name, '')), '');
  v_phone text := nullif(btrim(coalesce(p_phone, '')), '');
  v_old public.healthcare_professionals;
  v_record public.healthcare_professionals;
begin
  if v_profile_id is null then
    raise exception using errcode = '42501', message = 'Please sign in first.';
  end if;

  select * into v_profile from public.profiles where id = v_profile_id for update;

  if v_profile.status in ('suspended', 'archived') then
    raise exception using errcode = '42501', message = 'This account cannot be used.';
  end if;
  if v_profile.role is not null and v_profile.role <> 'healthcare_professional' then
    raise exception using errcode = '23514',
      message = 'This account is not a doctor account.';
  end if;
  if exists (select 1 from public.company_users where profile_id = v_profile_id)
     or exists (select 1 from public.companies where applicant_profile_id = v_profile_id) then
    raise exception using errcode = '23514',
      message = 'A company account cannot sign up as a doctor.';
  end if;

  if v_phone is null then
    raise exception using errcode = '22023', message = 'Phone number is required.';
  end if;
  if char_length(v_phone) > 30 or v_phone !~ '^\+?[0-9][0-9 ()-]{5,}$' then
    raise exception using errcode = '22023', message = 'Enter a valid phone number.';
  end if;
  if v_name is not null and char_length(v_name) > 120 then
    raise exception using errcode = '22023', message = 'The name is too long.';
  end if;
  if p_specialty_id is null
     or not private.validate_active_specialty(p_specialty_id, 'physician') then
    raise exception using errcode = '23514', message = 'Choose your medical specialty.';
  end if;

  update public.profiles
  set full_name = coalesce(v_name, full_name),
      phone = v_phone
  where id = v_profile_id;

  select * into v_old from public.healthcare_professionals
  where profile_id = v_profile_id for update;

  if found then
    if v_old.profession_type <> 'physician' then
      raise exception using errcode = '23514',
        message = 'This account is not a doctor account.';
    end if;
    update public.healthcare_professionals
    set specialty_id = p_specialty_id,
        verification_status = 'approved',
        reviewed_by = coalesce(reviewed_by, v_profile_id),
        reviewed_at = coalesce(reviewed_at, now()),
        review_reason = null
    where id = v_old.id
    returning * into v_record;
  else
    insert into public.healthcare_professionals (
      profile_id, profession_type, specialty_id, verification_status, reviewed_by, reviewed_at
    )
    values (v_profile_id, 'physician', p_specialty_id, 'approved', v_profile_id, now())
    returning * into v_record;
  end if;

  if v_profile.role is null then
    perform private.assign_platform_role(
      v_profile_id, 'healthcare_professional', v_profile_id, 'Doctor self sign-up'
    );
  end if;

  update public.profiles set status = 'active' where id = v_profile_id;

  perform private.write_audit_log(
    v_profile_id,
    'healthcare_professional_self_signup',
    'healthcare_professional',
    v_record.id,
    case when v_old.id is null then null
      else jsonb_build_object('specialty_id', v_old.specialty_id,
                              'verification_status', v_old.verification_status) end,
    jsonb_build_object('specialty_id', v_record.specialty_id,
                       'verification_status', v_record.verification_status)
  );

  return v_record;
end;
$$;

comment on function public.doctor_self_signup(text, text, uuid) is
  'Doctor sign-up without administrator approval: saves name and phone, records the '
  'medical specialty and activates the doctor account. Calling it again changes the specialty.';

revoke all on function public.doctor_self_signup(text, text, uuid) from public, anon;
grant execute on function public.doctor_self_signup(text, text, uuid) to authenticated, service_role;

-- 3. Home page: two published products for the doctor's specialty.
--    The pair changes once a day and is the same all day.
create or replace function public.doctor_home_suggestions(p_limit integer default 2)
returns table (
  product_id uuid,
  brand_name_en text,
  generic_name_en text,
  company_id uuid,
  company_name text,
  drug_class_name_en text,
  category text,
  strength text,
  dosage_form text,
  specialty_id uuid,
  specialty_name text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_specialty uuid;
  v_limit integer := least(greatest(coalesce(p_limit, 2), 1), 10);
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501',
      message = 'Only doctors can see suggestions.';
  end if;

  select h.specialty_id into v_specialty
  from public.healthcare_professionals as h
  join public.profiles as pr on pr.id = h.profile_id
  where pr.auth_user_id = (select auth.uid());

  if v_specialty is null then
    return;
  end if;

  return query
  select
    p.id,
    t.brand_name,
    g.name,
    c.id,
    c.company_name,
    d.name,
    p.category::text,
    market.strength,
    market.dosage_form,
    v_specialty,
    s.name
  from public.products as p
  join public.companies as c on c.id = p.company_id
  join public.product_specialties as ps
    on ps.product_id = p.id and ps.specialty_id = v_specialty
  left join public.product_translations as t on t.product_id = p.id and t.locale = 'en'
  left join public.generic_drug_translations as g
    on g.generic_drug_id = p.generic_drug_id and g.locale = 'en'
  left join public.drug_class_translations as d
    on d.drug_class_id = p.drug_class_id and d.locale = 'en'
  left join public.specialty_translations as s
    on s.specialty_id = v_specialty and s.locale = 'en'
  left join lateral (
    select pm.strength, pm.dosage_form
    from public.product_markets as pm
    join public.countries as country on country.id = pm.country_id
    where pm.product_id = p.id and country.iso_code = 'IQ'
    order by pm.created_at
    limit 1
  ) as market on true
  where p.status = 'published'
    and c.status = 'verified'
    and private.is_official_catalog_product_visible(p.id)
  order by md5(p.id::text || current_date::text)
  limit v_limit;
end;
$$;

comment on function public.doctor_home_suggestions(integer) is
  'Published products for the signed-in doctor''s specialty (default 2), rotating daily.';

revoke all on function public.doctor_home_suggestions(integer) from public, anon;
grant execute on function public.doctor_home_suggestions(integer) to authenticated, service_role;

-- 4. Merge duplicate specialties (spelling variants) so each doctor and each
--    product uses one name. Product links and doctor records move to the kept
--    specialty; the duplicates are deactivated, never deleted.
do $$
declare
  r record;
  v_keep uuid;
  v_dup uuid;
begin
  for r in select * from (values
    ('paediatrics', 'pediatrics'),
    ('obstetrics_and_gynecology', 'obstetrics_gynecology'),
    ('obstetrics_gynaecology', 'obstetrics_gynecology'),
    ('gynecology', 'obstetrics_gynecology'),
    ('allergy_and_immunology', 'allergy_immunology'),
    ('ent_otolaryngology', 'ent'),
    ('otolaryngology_ent', 'ent'),
    ('otolaryngology', 'ent'),
    ('haematology', 'hematology'),
    ('critical_care_medicine', 'critical_care'),
    ('anaesthesiology', 'anesthesiology'),
    ('orthopaedics', 'orthopedics'),
    ('endocrinology_diabetes', 'endocrinology'),
    ('respiratory_medicine', 'pulmonology'),
    ('surgery', 'general_surgery'),
    ('family_medicine', 'general_practice')
  ) as t(dup, keep) loop
    select id into v_dup from public.specialties where code = r.dup;
    select id into v_keep from public.specialties where code = r.keep;
    continue when v_dup is null or v_keep is null;

    insert into public.product_specialties (product_id, specialty_id, created_by)
    select ps.product_id, v_keep, ps.created_by from public.product_specialties as ps
    where ps.specialty_id = v_dup
    on conflict do nothing;
    delete from public.product_specialties where specialty_id = v_dup;

    update public.healthcare_professionals set specialty_id = v_keep where specialty_id = v_dup;

    update public.specialties set is_active = false where id = v_dup;
  end loop;
end $$;

update public.specialty_translations as t
set name = 'ENT (Otolaryngology)'
from public.specialties as s
where s.id = t.specialty_id and s.code = 'ent' and t.locale = 'en';

update public.specialty_translations as t
set name = 'General Practice / Family Medicine'
from public.specialties as s
where s.id = t.specialty_id and s.code = 'general_practice' and t.locale = 'en';

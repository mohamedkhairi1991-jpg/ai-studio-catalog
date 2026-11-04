-- Home page "Refresh" shows another pair of specialty drugs.
-- p_seed = 0 keeps the daily pair; any other value gives a different pair.

drop function if exists public.doctor_home_suggestions(integer);

create or replace function public.doctor_home_suggestions(p_limit integer default 2, p_seed integer default 0)
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
  order by md5(p.id::text || current_date::text || coalesce(p_seed, 0)::text)
  limit v_limit;
end;
$$;

comment on function public.doctor_home_suggestions(integer, integer) is
  'Published products for the signed-in doctor''s specialty (default 2), rotating daily; p_seed > 0 gives another pair (Refresh).';

revoke all on function public.doctor_home_suggestions(integer, integer) from public, anon;
grant execute on function public.doctor_home_suggestions(integer, integer) to authenticated, service_role;

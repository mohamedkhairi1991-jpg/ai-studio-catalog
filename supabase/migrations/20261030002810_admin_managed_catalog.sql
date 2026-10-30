-- Admin-managed catalog (temporary operating model).
--
-- For now the platform has two kinds of users: administrators and doctors.
-- Administrators enter companies and their Iraq products; doctors read them.
-- Company self-service stays in place but unused, so it can be switched back
-- on later without rebuilding anything.
--
-- 1. Companies added by an administrator have no applicant account.
-- 2. The "verified company keeps an active company administrator" rule only
--    applies to self-managed companies (those with an applicant).
-- 3. New RPCs: admin_create_company, admin_update_company.
-- 4. Administrators can create product drafts for any verified company and
--    edit draft / changes_requested content (which also opens the existing
--    content RPCs and storage upload policies to them).

-- 1 ---------------------------------------------------------------------------
alter table public.companies
  alter column applicant_profile_id drop not null;

comment on column public.companies.applicant_profile_id is
  'Profile that applied for the company. NULL for companies added directly by an administrator (admin-managed, no company accounts).';

-- 2 ---------------------------------------------------------------------------
create or replace function private.enforce_verified_company_admin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_company_id uuid;
  target_status public.company_status;
  target_applicant_id uuid;
begin
  if tg_table_name = 'companies' then
    target_company_id := (to_jsonb(new) ->> 'id')::uuid;
  else
    target_company_id := coalesce(
      (to_jsonb(new) ->> 'company_id')::uuid,
      (to_jsonb(old) ->> 'company_id')::uuid
    );
  end if;

  select company.status, company.applicant_profile_id
    into target_status, target_applicant_id
  from public.companies as company
  where company.id = target_company_id;

  -- Admin-managed companies (no applicant) have no company accounts.
  if target_status = 'verified'
    and target_applicant_id is not null
    and not private.company_has_active_admin(target_company_id) then
    raise exception using
      errcode = '23514',
      message = 'A verified company must retain an active company administrator.';
  end if;

  return null;
end;
$$;

revoke all on function private.enforce_verified_company_admin() from public;

-- 3 ---------------------------------------------------------------------------
create or replace function public.admin_create_company(
  p_country_id uuid,
  p_city_id uuid,
  p_company_name text,
  p_legal_name text,
  p_description text default null,
  p_website_url text default null,
  p_contact_email text default null,
  p_contact_phone text default null
)
returns public.companies
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_profile_id uuid;
  created_company public.companies;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  actor_profile_id := private.current_profile_id();

  insert into public.companies (
    applicant_profile_id, country_id, city_id, company_name, legal_name,
    description, website_url, contact_email, contact_phone,
    status, verified_by, verified_at
  ) values (
    null,
    p_country_id,
    p_city_id,
    btrim(p_company_name),
    btrim(p_legal_name),
    nullif(btrim(p_description), ''),
    nullif(btrim(p_website_url), ''),
    nullif(lower(btrim(p_contact_email)), ''),
    nullif(btrim(p_contact_phone), ''),
    'verified',
    actor_profile_id,
    now()
  )
  returning * into created_company;

  perform private.write_audit_log(
    actor_profile_id, 'company_created_by_admin', 'company',
    created_company.id, null,
    jsonb_build_object(
      'company_name', created_company.company_name,
      'legal_name', created_company.legal_name,
      'status', created_company.status
    )
  );

  return created_company;
end;
$$;

create or replace function public.admin_update_company(
  p_company_id uuid,
  p_country_id uuid,
  p_city_id uuid,
  p_company_name text,
  p_legal_name text,
  p_description text default null,
  p_website_url text default null,
  p_contact_email text default null,
  p_contact_phone text default null
)
returns public.companies
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_profile_id uuid;
  old_company public.companies;
  updated_company public.companies;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  actor_profile_id := private.current_profile_id();

  select * into old_company
  from public.companies
  where id = p_company_id
  for update;

  if not found then
    raise exception using errcode = 'P0002',
      message = 'The company does not exist.';
  end if;

  if old_company.status = 'archived' then
    raise exception using errcode = '23514',
      message = 'An archived company cannot be edited.';
  end if;

  update public.companies
  set
    country_id = p_country_id,
    city_id = p_city_id,
    company_name = btrim(p_company_name),
    legal_name = btrim(p_legal_name),
    description = nullif(btrim(p_description), ''),
    website_url = nullif(btrim(p_website_url), ''),
    contact_email = nullif(lower(btrim(p_contact_email)), ''),
    contact_phone = nullif(btrim(p_contact_phone), '')
  where id = p_company_id
  returning * into updated_company;

  perform private.write_audit_log(
    actor_profile_id, 'company_updated_by_admin', 'company', p_company_id,
    jsonb_build_object(
      'company_name', old_company.company_name,
      'legal_name', old_company.legal_name
    ),
    jsonb_build_object(
      'company_name', updated_company.company_name,
      'legal_name', updated_company.legal_name
    )
  );

  return updated_company;
end;
$$;

revoke all on function public.admin_create_company(
  uuid, uuid, text, text, text, text, text, text
) from public, anon;
grant execute on function public.admin_create_company(
  uuid, uuid, text, text, text, text, text, text
) to authenticated, service_role;

revoke all on function public.admin_update_company(
  uuid, uuid, uuid, text, text, text, text, text, text
) from public, anon;
grant execute on function public.admin_update_company(
  uuid, uuid, uuid, text, text, text, text, text, text
) to authenticated, service_role;

-- 4 ---------------------------------------------------------------------------
create or replace function private.can_manage_official_product_content(
  target_product_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    exists (
      select 1
      from public.products as product
      where product.id = target_product_id
        and product.status in ('draft', 'changes_requested')
        and (
          private.has_company_role(
            product.company_id,
            array[
              'company_admin',
              'product_manager'
            ]::public.company_role[]
          )
          or (
            private.is_admin_or_super_admin()
            and private.is_verified_company(product.company_id)
          )
        )
    ),
    false
  );
$$;

create or replace function public.create_product_draft(
  p_company_id uuid,
  p_category public.product_category,
  p_generic_drug_id uuid,
  p_drug_class_id uuid,
  p_english_brand_name text
)
returns public.products
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  created_row public.products;
begin
  actor_id := private.current_profile_id();
  if actor_id is null or not (
    private.has_company_role(
      p_company_id,
      array['company_admin', 'product_manager']::public.company_role[]
    )
    or private.is_admin_or_super_admin()
  ) then
    raise exception using errcode = '42501',
      message = 'Product draft management access is required.';
  end if;
  insert into public.products (
    company_id, generic_drug_id, drug_class_id, category,
    created_by, updated_by
  ) values (
    p_company_id, p_generic_drug_id, p_drug_class_id, p_category,
    actor_id, actor_id
  ) returning * into created_row;
  insert into public.product_translations (
    product_id, locale, brand_name
  ) values (
    created_row.id, 'en', btrim(p_english_brand_name)
  );
  perform private.refresh_product_search_keywords(created_row.id);
  perform private.write_audit_log(
    actor_id, 'product_draft_created', 'product', created_row.id, null,
    jsonb_build_object(
      'company_id', created_row.company_id,
      'category', created_row.category,
      'generic_drug_id', created_row.generic_drug_id,
      'drug_class_id', created_row.drug_class_id
    )
  );
  return created_row;
end;
$$;

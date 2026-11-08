-- Manufacturer vs Iraq agent (owner request, 8 Nov 2026).
--
-- Doctors want to see who MAKES a drug. Many products reach Iraq through a
-- local agent / scientific office. Keep the two roles separate:
--
--   products.company_id        = the manufacturer (unchanged; immutable)
--   products.agent_company_id  = optional Iraq agent / office for that product
--
-- 1. companies.company_type: manufacturer | agent | both (default manufacturer).
--    companies.origin_country_code: manufacturer's home country (ISO 3166-1
--    alpha-2). companies.country_id stays as the Iraq market/operating country.
-- 2. company_agencies: which agent represents which manufacturer in Iraq
--    (admin-managed for now).
-- 3. products.agent_company_id + checks: the agent must be an active agent of
--    the product's manufacturer.
-- 4. Guard: a company's type cannot change in a way that breaks its products
--    or agency links.
-- 5. Admin RPCs: admin_set_company_profile, admin_set_company_agency,
--    admin_set_product_agent (all audited).
-- Dedupe keys stay manufacturer + brand + strength.

-- 1 ---------------------------------------------------------------------------
alter table public.companies
  add column company_type text not null default 'manufacturer',
  add column origin_country_code text;

alter table public.companies
  add constraint companies_company_type_valid
    check (company_type in ('manufacturer', 'agent', 'both')),
  add constraint companies_origin_country_code_format
    check (origin_country_code is null or origin_country_code ~ '^[A-Z]{2}$');

comment on column public.companies.company_type is
  'manufacturer = makes products; agent = Iraq agent / scientific office that brings other manufacturers'' products; both = does both.';
comment on column public.companies.origin_country_code is
  'Manufacturer home country (ISO 3166-1 alpha-2, e.g. CH). NULL when unknown. country_id is the Iraq market/operating country.';

-- 2 ---------------------------------------------------------------------------
create table public.company_agencies (
  manufacturer_company_id uuid not null
    references public.companies(id) on update restrict on delete restrict,
  agent_company_id uuid not null
    references public.companies(id) on update restrict on delete restrict,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on update restrict on delete set null,
  updated_by uuid references public.profiles(id) on update restrict on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (manufacturer_company_id, agent_company_id),
  constraint company_agencies_not_self
    check (manufacturer_company_id <> agent_company_id)
);

comment on table public.company_agencies is
  'Iraq agent / scientific office that represents a manufacturer. Admin-managed.';

create index company_agencies_agent_idx
  on public.company_agencies (agent_company_id);

create trigger company_agencies_set_updated_at
before update on public.company_agencies
for each row execute function private.set_updated_at();

create or replace function private.validate_company_agency()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.companies
    where id = new.manufacturer_company_id
      and company_type in ('manufacturer', 'both')
  ) then
    raise exception using errcode = '23514',
      message = 'The represented company must be a manufacturer.';
  end if;

  if not exists (
    select 1 from public.companies
    where id = new.agent_company_id
      and company_type in ('agent', 'both')
  ) then
    raise exception using errcode = '23514',
      message = 'The agent company must be marked as an agent / office.';
  end if;

  if tg_op = 'UPDATE' and old.is_active and not new.is_active and exists (
    select 1 from public.products
    where company_id = new.manufacturer_company_id
      and agent_company_id = new.agent_company_id
  ) then
    raise exception using errcode = '23514',
      message = 'Remove this agent from the manufacturer''s products first.';
  end if;

  return new;
end;
$$;

create trigger company_agencies_validate
before insert or update on public.company_agencies
for each row execute function private.validate_company_agency();

alter table public.company_agencies enable row level security;

revoke all on table public.company_agencies from public, anon;
revoke insert, update, delete, truncate on table public.company_agencies from authenticated;
grant select on table public.company_agencies to authenticated;
grant all on table public.company_agencies to service_role;

create policy company_agencies_admin_read
on public.company_agencies
for select
to authenticated
using (private.is_admin_or_super_admin());

create policy company_agencies_approved_doctor_read
on public.company_agencies
for select
to authenticated
using (is_active and private.is_approved_doctor());

create policy company_agencies_member_read
on public.company_agencies
for select
to authenticated
using (
  private.is_active_company_member(manufacturer_company_id)
  or private.is_active_company_member(agent_company_id)
);

-- 3 ---------------------------------------------------------------------------
alter table public.products
  add column agent_company_id uuid
    references public.companies(id) on update restrict on delete restrict;

alter table public.products
  add constraint products_agent_not_manufacturer
    check (agent_company_id is null or agent_company_id <> company_id);

comment on column public.products.agent_company_id is
  'Optional Iraq agent / scientific office for this product. company_id is always the manufacturer.';

create index products_agent_company_idx
  on public.products (agent_company_id)
  where agent_company_id is not null;

create or replace function private.validate_product_companies()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' or new.company_id is distinct from old.company_id then
    if not exists (
      select 1 from public.companies
      where id = new.company_id
        and company_type in ('manufacturer', 'both')
    ) then
      raise exception using errcode = '23514',
        message = 'Products must be saved under their manufacturer, not an agent / office.';
    end if;
  end if;

  if new.agent_company_id is not null
    and (tg_op = 'INSERT' or new.agent_company_id is distinct from old.agent_company_id)
    and not exists (
      select 1 from public.company_agencies
      where manufacturer_company_id = new.company_id
        and agent_company_id = new.agent_company_id
        and is_active
    ) then
    raise exception using errcode = '23514',
      message = 'This agent does not represent the product''s manufacturer.';
  end if;

  return new;
end;
$$;

create trigger products_validate_companies
before insert or update of company_id, agent_company_id on public.products
for each row execute function private.validate_product_companies();

-- 4 ---------------------------------------------------------------------------
create or replace function private.guard_company_type_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.company_type = old.company_type then
    return new;
  end if;

  if new.company_type = 'agent' and (
    exists (select 1 from public.products where company_id = new.id)
    or exists (
      select 1 from public.company_agencies
      where manufacturer_company_id = new.id and is_active
    )
  ) then
    raise exception using errcode = '23514',
      message = 'This company has its own products or agents; use "both" instead of "agent".';
  end if;

  if new.company_type = 'manufacturer' and (
    exists (select 1 from public.products where agent_company_id = new.id)
    or exists (
      select 1 from public.company_agencies
      where agent_company_id = new.id and is_active
    )
  ) then
    raise exception using errcode = '23514',
      message = 'This company is an agent for other manufacturers; use "both" instead of "manufacturer".';
  end if;

  return new;
end;
$$;

create trigger companies_guard_type_change
before update of company_type on public.companies
for each row execute function private.guard_company_type_change();

-- 5 ---------------------------------------------------------------------------
create or replace function public.admin_set_company_profile(
  p_company_id uuid,
  p_company_type text,
  p_origin_country_code text default null
)
returns public.companies
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  old_row public.companies;
  new_row public.companies;
  clean_code text;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  if p_company_type is null or p_company_type not in ('manufacturer', 'agent', 'both') then
    raise exception using errcode = '22023',
      message = 'Company type must be manufacturer, agent or both.';
  end if;

  clean_code := nullif(upper(btrim(coalesce(p_origin_country_code, ''))), '');
  if clean_code is not null and clean_code !~ '^[A-Z]{2}$' then
    raise exception using errcode = '22023',
      message = 'Country must be a 2-letter code, e.g. CH.';
  end if;

  select * into old_row from public.companies where id = p_company_id for update;
  if not found then
    raise exception using errcode = 'P0002', message = 'Company not found.';
  end if;

  update public.companies
  set company_type = p_company_type,
      origin_country_code = clean_code
  where id = p_company_id
  returning * into new_row;

  perform private.write_audit_log(
    actor_id, 'company_profile_updated', 'companies', p_company_id,
    jsonb_build_object('company_type', old_row.company_type, 'origin_country_code', old_row.origin_country_code),
    jsonb_build_object('company_type', new_row.company_type, 'origin_country_code', new_row.origin_country_code)
  );

  return new_row;
end;
$$;

create or replace function public.admin_set_company_agency(
  p_manufacturer_company_id uuid,
  p_agent_company_id uuid,
  p_is_active boolean default true
)
returns public.company_agencies
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  saved public.company_agencies;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  insert into public.company_agencies (
    manufacturer_company_id, agent_company_id, is_active, created_by, updated_by
  ) values (
    p_manufacturer_company_id, p_agent_company_id, coalesce(p_is_active, true), actor_id, actor_id
  )
  on conflict (manufacturer_company_id, agent_company_id) do update
    set is_active = excluded.is_active,
        updated_by = excluded.updated_by
  returning * into saved;

  perform private.write_audit_log(
    actor_id, 'company_agency_set', 'company_agencies', p_agent_company_id,
    null,
    jsonb_build_object(
      'manufacturer_company_id', p_manufacturer_company_id,
      'agent_company_id', p_agent_company_id,
      'is_active', saved.is_active
    )
  );

  return saved;
end;
$$;

create or replace function public.admin_set_product_agent(
  p_product_id uuid,
  p_agent_company_id uuid default null
)
returns public.products
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  old_agent uuid;
  saved public.products;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  select agent_company_id into old_agent
  from public.products where id = p_product_id for update;
  if not found then
    raise exception using errcode = 'P0002', message = 'Product not found.';
  end if;

  update public.products
  set agent_company_id = p_agent_company_id,
      updated_by = actor_id
  where id = p_product_id
  returning * into saved;

  perform private.write_audit_log(
    actor_id, 'product_agent_set', 'products', p_product_id,
    jsonb_build_object('agent_company_id', old_agent),
    jsonb_build_object('agent_company_id', p_agent_company_id)
  );

  return saved;
end;
$$;

revoke all on function private.validate_company_agency() from public, anon, authenticated;
revoke all on function private.validate_product_companies() from public, anon, authenticated;
revoke all on function private.guard_company_type_change() from public, anon, authenticated;

revoke all on function public.admin_set_company_profile(uuid, text, text) from public, anon;
revoke all on function public.admin_set_company_agency(uuid, uuid, boolean) from public, anon;
revoke all on function public.admin_set_product_agent(uuid, uuid) from public, anon;
grant execute on function public.admin_set_company_profile(uuid, text, text) to authenticated, service_role;
grant execute on function public.admin_set_company_agency(uuid, uuid, boolean) to authenticated, service_role;
grant execute on function public.admin_set_product_agent(uuid, uuid) to authenticated, service_role;

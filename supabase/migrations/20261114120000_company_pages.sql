-- Company pages (owner request, 14 Nov 2026).
--
-- A page per company that doctors can open and scroll: logo, cover image,
-- tagline, about, founded year, website/contacts, home country, Iraq agents,
-- an image gallery, one image/banner space (from sponsored_ads.company_id,
-- shown without any "ad" or "sponsored" wording), and the company's products
-- (the app groups them by therapeutic class).
--
-- 1. companies: tagline, founded_year, logo_path, cover_path.
-- 2. Storage bucket company-media (public images; only admins upload).
-- 3. company_media: gallery images (admin-managed).
-- 4. get_company_page(company_id) and get_company_directory() for doctors.
-- 5. Admin RPCs: admin_update_company_page, admin_add_company_media,
--    admin_remove_company_media (audited).
-- Products listed are the official published catalog products only; the page
-- does not show stock, prices or availability.

-- 1 ---------------------------------------------------------------------------
alter table public.companies
  add column tagline text,
  add column founded_year integer,
  add column logo_path text,
  add column cover_path text;

alter table public.companies
  add constraint companies_tagline_len
    check (tagline is null or char_length(btrim(tagline)) between 1 and 140),
  add constraint companies_founded_year_range
    check (founded_year is null or founded_year between 1800 and 2100),
  add constraint companies_logo_path_owner
    check (logo_path is null or logo_path like (id::text || '/%')),
  add constraint companies_cover_path_owner
    check (cover_path is null or cover_path like (id::text || '/%'));

comment on column public.companies.tagline is 'Short line under the company name on its page (max 140 characters).';
comment on column public.companies.founded_year is 'Year the company was founded, when known.';
comment on column public.companies.logo_path is 'Logo image path in the company-media bucket (<company_id>/...).';
comment on column public.companies.cover_path is 'Cover image path in the company-media bucket (<company_id>/...).';

-- 2 ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'company-media',
  'company-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do nothing;

create policy company_media_storage_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'company-media'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
  and private.is_admin_or_super_admin()
);

create policy company_media_storage_admin_update
on storage.objects
for update
to authenticated
using (bucket_id = 'company-media' and private.is_admin_or_super_admin())
with check (bucket_id = 'company-media' and private.is_admin_or_super_admin());

create policy company_media_storage_admin_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'company-media' and private.is_admin_or_super_admin());

-- 3 ---------------------------------------------------------------------------
create table public.company_media (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on update restrict on delete restrict,
  storage_path text not null,
  caption text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on update restrict on delete set null,
  updated_by uuid references public.profiles(id) on update restrict on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint company_media_path_owner check (storage_path like (company_id::text || '/%')),
  constraint company_media_caption_len check (caption is null or char_length(btrim(caption)) between 1 and 140),
  constraint company_media_sort_range check (sort_order between 0 and 1000)
);

comment on table public.company_media is 'Gallery images on a company page (admin-managed).';

create index company_media_company_idx on public.company_media (company_id, sort_order) where is_active;

create trigger company_media_set_updated_at
before update on public.company_media
for each row execute function private.set_updated_at();

alter table public.company_media enable row level security;

revoke all on table public.company_media from public, anon;
revoke insert, update, delete, truncate on table public.company_media from authenticated;
grant select on table public.company_media to authenticated;
grant all on table public.company_media to service_role;

create policy company_media_admin_read
on public.company_media
for select
to authenticated
using (private.is_admin_or_super_admin());

create policy company_media_doctor_read
on public.company_media
for select
to authenticated
using (is_active and private.is_approved_doctor());

-- 4 ---------------------------------------------------------------------------
create or replace function public.get_company_page(p_company_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_company public.companies;
  v_is_admin boolean := private.is_admin_or_super_admin();
begin
  if not (private.is_approved_doctor() or v_is_admin) then
    raise exception using errcode = '42501',
      message = 'Only approved doctors can open company pages.';
  end if;

  select * into v_company from public.companies where id = p_company_id;
  if not found or (v_company.status <> 'verified' and not v_is_admin) then
    raise exception using errcode = 'P0002', message = 'Company not found.';
  end if;

  return jsonb_build_object(
    'company', jsonb_build_object(
      'id', v_company.id,
      'name', v_company.company_name,
      'legal_name', v_company.legal_name,
      'company_type', v_company.company_type,
      'origin_country_code', v_company.origin_country_code,
      'tagline', v_company.tagline,
      'description', v_company.description,
      'founded_year', v_company.founded_year,
      'website_url', v_company.website_url,
      'contact_email', v_company.contact_email,
      'contact_phone', v_company.contact_phone,
      'logo_path', v_company.logo_path,
      'cover_path', v_company.cover_path
    ),
    'agents', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.company_name) order by c.company_name)
      from public.company_agencies as a
      join public.companies as c on c.id = a.agent_company_id
      where a.manufacturer_company_id = p_company_id and a.is_active and c.status = 'verified'
    ), '[]'::jsonb),
    'represents', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.company_name) order by c.company_name)
      from public.company_agencies as a
      join public.companies as c on c.id = a.manufacturer_company_id
      where a.agent_company_id = p_company_id and a.is_active and c.status = 'verified'
    ), '[]'::jsonb),
    'gallery', coalesce((
      select jsonb_agg(jsonb_build_object('id', m.id, 'storage_path', m.storage_path, 'caption', m.caption)
                       order by m.sort_order, m.created_at)
      from public.company_media as m
      where m.company_id = p_company_id and m.is_active
    ), '[]'::jsonb),
    'feature', (
      select jsonb_build_object('id', s.id, 'title', s.title, 'body', s.body,
                                'image_url', s.image_url, 'link_url', s.link_url)
      from public.sponsored_ads as s
      where s.company_id = p_company_id
        and s.is_active
        and (s.starts_on is null or s.starts_on <= current_date)
        and (s.ends_on is null or s.ends_on >= current_date)
      order by s.priority desc, s.created_at desc
      limit 1
    ),
    'products', coalesce((
      select jsonb_agg(jsonb_build_object(
          'product_id', r.product_id,
          'brand_name_en', r.brand_en,
          'generic_name_en', r.generic_en,
          'drug_class_name_en', r.class_en,
          'category', r.category,
          'strength', r.strength,
          'dosage_form', r.dosage_form,
          'manufacturer_id', r.company_id,
          'manufacturer_name', r.company_name,
          'via_agent', r.company_id <> p_company_id
        ) order by lower(r.brand_en))
      from private.catalog_search_rows(null, null) as r
      where r.company_id = p_company_id
         or exists (
           select 1 from public.products as p
           where p.id = r.product_id and p.agent_company_id = p_company_id
         )
    ), '[]'::jsonb)
  );
end;
$$;

comment on function public.get_company_page(uuid) is
  'Company page for doctors: details, agents, gallery, one feature image, and published products.';

create or replace function public.get_company_directory()
returns table (
  company_id uuid,
  company_name text,
  company_type text,
  origin_country_code text,
  tagline text,
  logo_path text,
  product_count bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501',
      message = 'Only approved doctors can see companies.';
  end if;

  return query
  select c.id, c.company_name, c.company_type, c.origin_country_code, c.tagline, c.logo_path,
         count(r.product_id)
  from public.companies as c
  join private.catalog_search_rows(null, null) as r on r.company_id = c.id
  where c.status = 'verified'
  group by c.id
  order by lower(c.company_name);
end;
$$;

comment on function public.get_company_directory() is
  'Verified companies that have published products, for the companies list.';

-- 5 ---------------------------------------------------------------------------
create or replace function public.admin_update_company_page(
  p_company_id uuid,
  p_tagline text default null,
  p_founded_year integer default null,
  p_logo_path text default null,
  p_cover_path text default null
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
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  select * into old_row from public.companies where id = p_company_id for update;
  if not found then
    raise exception using errcode = 'P0002', message = 'Company not found.';
  end if;

  if nullif(btrim(coalesce(p_logo_path, '')), '') is not null
     and p_logo_path not like (p_company_id::text || '/%') then
    raise exception using errcode = '22023', message = 'The logo must be uploaded for this company.';
  end if;
  if nullif(btrim(coalesce(p_cover_path, '')), '') is not null
     and p_cover_path not like (p_company_id::text || '/%') then
    raise exception using errcode = '22023', message = 'The cover image must be uploaded for this company.';
  end if;

  update public.companies
  set tagline = nullif(btrim(coalesce(p_tagline, '')), ''),
      founded_year = p_founded_year,
      logo_path = nullif(btrim(coalesce(p_logo_path, '')), ''),
      cover_path = nullif(btrim(coalesce(p_cover_path, '')), '')
  where id = p_company_id
  returning * into new_row;

  perform private.write_audit_log(
    actor_id, 'company_page_updated', 'companies', p_company_id,
    jsonb_build_object('tagline', old_row.tagline, 'founded_year', old_row.founded_year,
                       'logo_path', old_row.logo_path, 'cover_path', old_row.cover_path),
    jsonb_build_object('tagline', new_row.tagline, 'founded_year', new_row.founded_year,
                       'logo_path', new_row.logo_path, 'cover_path', new_row.cover_path)
  );

  return new_row;
end;
$$;

create or replace function public.admin_add_company_media(
  p_company_id uuid,
  p_storage_path text,
  p_caption text default null,
  p_sort_order integer default 0
)
returns public.company_media
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  saved public.company_media;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  if p_storage_path is null or p_storage_path not like (p_company_id::text || '/%') then
    raise exception using errcode = '22023', message = 'The image must be uploaded for this company.';
  end if;

  insert into public.company_media (company_id, storage_path, caption, sort_order, created_by, updated_by)
  values (p_company_id, p_storage_path, nullif(btrim(coalesce(p_caption, '')), ''),
          coalesce(p_sort_order, 0), actor_id, actor_id)
  returning * into saved;

  perform private.write_audit_log(
    actor_id, 'company_media_added', 'company_media', saved.id, null,
    jsonb_build_object('company_id', p_company_id, 'storage_path', p_storage_path)
  );

  return saved;
end;
$$;

create or replace function public.admin_remove_company_media(p_media_id uuid)
returns public.company_media
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  saved public.company_media;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  actor_id := private.current_profile_id();

  update public.company_media
  set is_active = false, updated_by = actor_id
  where id = p_media_id
  returning * into saved;
  if not found then
    raise exception using errcode = 'P0002', message = 'Image not found.';
  end if;

  perform private.write_audit_log(
    actor_id, 'company_media_removed', 'company_media', p_media_id,
    jsonb_build_object('is_active', true), jsonb_build_object('is_active', false)
  );

  return saved;
end;
$$;

revoke all on function public.get_company_page(uuid) from public, anon;
revoke all on function public.get_company_directory() from public, anon;
revoke all on function public.admin_update_company_page(uuid, text, integer, text, text) from public, anon;
revoke all on function public.admin_add_company_media(uuid, text, text, integer) from public, anon;
revoke all on function public.admin_remove_company_media(uuid) from public, anon;
grant execute on function public.get_company_page(uuid) to authenticated, service_role;
grant execute on function public.get_company_directory() to authenticated, service_role;
grant execute on function public.admin_update_company_page(uuid, text, integer, text, text) to authenticated, service_role;
grant execute on function public.admin_add_company_media(uuid, text, text, integer) to authenticated, service_role;
grant execute on function public.admin_remove_company_media(uuid) to authenticated, service_role;

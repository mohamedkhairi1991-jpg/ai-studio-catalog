-- Sponsored space and anonymous usage statistics (owner request, 2026-11-04).
--
-- 1. sponsored_ads: administrators create the ads shown in the "Sponsored"
--    space on the doctor home page, optionally for one specialty and a date
--    range. Doctors never read the table directly; they call
--    doctor_sponsored_ad().
-- 2. Anonymous daily counters, never linked to a person:
--    sponsored_ad_daily_stats (views, clicks), catalog_search_daily_stats
--    (what doctors search for, and searches with no result) and
--    product_view_daily_stats (which drugs are opened).
--    Administrators read them through admin_* functions.

-- 1. Ads ----------------------------------------------------------------------

create table public.sponsored_ads (
  id uuid primary key default gen_random_uuid(),
  sponsor_name text not null,
  title text not null,
  body text,
  image_url text,
  link_url text,
  company_id uuid references public.companies (id) on delete set null,
  target_specialty_id uuid references public.specialties (id) on delete set null,
  starts_on date,
  ends_on date,
  is_active boolean not null default true,
  priority integer not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint sponsored_ads_sponsor_len check (char_length(btrim(sponsor_name)) between 1 and 80),
  constraint sponsored_ads_title_len check (char_length(btrim(title)) between 1 and 80),
  constraint sponsored_ads_body_len check (body is null or char_length(body) <= 280),
  constraint sponsored_ads_image_https check (image_url is null or image_url ~ '^https://[^ ]+$'),
  constraint sponsored_ads_link_https check (link_url is null or link_url ~ '^https://[^ ]+$'),
  constraint sponsored_ads_dates check (starts_on is null or ends_on is null or starts_on <= ends_on),
  constraint sponsored_ads_priority check (priority between 0 and 100)
);

create index sponsored_ads_active_idx on public.sponsored_ads (is_active, target_specialty_id);

create trigger sponsored_ads_set_updated_at
  before update on public.sponsored_ads
  for each row execute function private.set_updated_at();

alter table public.sponsored_ads enable row level security;

create policy sponsored_ads_admin_read on public.sponsored_ads
  for select to authenticated
  using (private.is_admin_or_super_admin());

revoke all on public.sponsored_ads from anon;
grant select on public.sponsored_ads to authenticated;

-- 2. Anonymous counters ------------------------------------------------------

create table public.sponsored_ad_daily_stats (
  ad_id uuid not null references public.sponsored_ads (id) on delete cascade,
  day date not null,
  views integer not null default 0,
  clicks integer not null default 0,
  primary key (ad_id, day)
);

create table public.catalog_search_daily_stats (
  day date not null,
  query_norm text not null,
  specialty_id uuid references public.specialties (id) on delete set null,
  searches integer not null default 0,
  zero_result_searches integer not null default 0,
  constraint catalog_search_daily_stats_query_len check (char_length(query_norm) between 2 and 60)
);

create unique index catalog_search_daily_stats_key
  on public.catalog_search_daily_stats (day, query_norm, coalesce(specialty_id, '00000000-0000-0000-0000-000000000000'::uuid));

create table public.product_view_daily_stats (
  product_id uuid not null references public.products (id) on delete cascade,
  day date not null,
  views integer not null default 0,
  primary key (product_id, day)
);

alter table public.sponsored_ad_daily_stats enable row level security;
alter table public.catalog_search_daily_stats enable row level security;
alter table public.product_view_daily_stats enable row level security;
revoke all on public.sponsored_ad_daily_stats, public.catalog_search_daily_stats,
  public.product_view_daily_stats from anon, authenticated;

-- Helper: the signed-in doctor's specialty (null for others).
create or replace function private.current_doctor_specialty_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select h.specialty_id
  from public.healthcare_professionals as h
  join public.profiles as pr on pr.id = h.profile_id
  where pr.auth_user_id = (select auth.uid())
  limit 1;
$$;

-- 3. Admin: create or edit an ad ---------------------------------------------

create or replace function public.admin_save_sponsored_ad(
  p_ad_id uuid,
  p_sponsor_name text,
  p_title text,
  p_body text default null,
  p_image_url text default null,
  p_link_url text default null,
  p_company_id uuid default null,
  p_target_specialty_id uuid default null,
  p_starts_on date default null,
  p_ends_on date default null,
  p_is_active boolean default true,
  p_priority integer default 0
)
returns public.sponsored_ads
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := private.current_profile_id();
  v_row public.sponsored_ads;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;

  if p_ad_id is null then
    insert into public.sponsored_ads (
      sponsor_name, title, body, image_url, link_url, company_id, target_specialty_id,
      starts_on, ends_on, is_active, priority, created_by, updated_by
    ) values (
      btrim(p_sponsor_name), btrim(p_title), nullif(btrim(coalesce(p_body, '')), ''),
      nullif(btrim(coalesce(p_image_url, '')), ''), nullif(btrim(coalesce(p_link_url, '')), ''),
      p_company_id, p_target_specialty_id, p_starts_on, p_ends_on,
      coalesce(p_is_active, true), coalesce(p_priority, 0), v_actor, v_actor
    )
    returning * into v_row;
  else
    update public.sponsored_ads set
      sponsor_name = btrim(p_sponsor_name),
      title = btrim(p_title),
      body = nullif(btrim(coalesce(p_body, '')), ''),
      image_url = nullif(btrim(coalesce(p_image_url, '')), ''),
      link_url = nullif(btrim(coalesce(p_link_url, '')), ''),
      company_id = p_company_id,
      target_specialty_id = p_target_specialty_id,
      starts_on = p_starts_on,
      ends_on = p_ends_on,
      is_active = coalesce(p_is_active, true),
      priority = coalesce(p_priority, 0),
      updated_by = v_actor
    where id = p_ad_id
    returning * into v_row;
    if not found then
      raise exception using errcode = 'P0002', message = 'The ad does not exist.';
    end if;
  end if;

  perform private.write_audit_log(
    v_actor,
    case when p_ad_id is null then 'sponsored_ad_created' else 'sponsored_ad_updated' end,
    'sponsored_ad', v_row.id, null,
    jsonb_build_object('title', v_row.title, 'sponsor', v_row.sponsor_name, 'is_active', v_row.is_active)
  );

  return v_row;
end;
$$;

-- 4. Doctor: the ad to show in the Sponsored space -----------------------------
--    Picks an active, in-date ad for the doctor's specialty or for everyone,
--    highest priority first, rotating among equals. p_seed changes the pick.

create or replace function public.doctor_sponsored_ad(p_seed integer default 0)
returns table (
  ad_id uuid,
  sponsor_name text,
  title text,
  body text,
  image_url text,
  link_url text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_specialty uuid := private.current_doctor_specialty_id();
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only doctors can see sponsored content.';
  end if;

  return query
  select a.id, a.sponsor_name, a.title, a.body, a.image_url, a.link_url
  from public.sponsored_ads as a
  where a.is_active
    and (a.starts_on is null or a.starts_on <= current_date)
    and (a.ends_on is null or a.ends_on >= current_date)
    and (a.target_specialty_id is null or a.target_specialty_id = v_specialty)
  order by a.priority desc,
    md5(a.id::text || current_date::text || coalesce(p_seed, 0)::text)
  limit 1;
end;
$$;

-- 5. Doctor: anonymous counters ---------------------------------------------

create or replace function public.record_sponsored_ad_event(p_ad_id uuid, p_event text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only doctors can record ad events.';
  end if;
  if p_event not in ('view', 'click') then
    raise exception using errcode = '22023', message = 'The event must be view or click.';
  end if;
  if not exists (select 1 from public.sponsored_ads where id = p_ad_id) then
    return;
  end if;

  insert into public.sponsored_ad_daily_stats (ad_id, day, views, clicks)
  values (p_ad_id, current_date,
          case when p_event = 'view' then 1 else 0 end,
          case when p_event = 'click' then 1 else 0 end)
  on conflict (ad_id, day) do update set
    views = public.sponsored_ad_daily_stats.views + excluded.views,
    clicks = public.sponsored_ad_daily_stats.clicks + excluded.clicks;
end;
$$;

create or replace function public.record_catalog_search(p_query text, p_result_count integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_query text := left(private.normalize_english_text(coalesce(p_query, '')), 60);
  v_specialty uuid := private.current_doctor_specialty_id();
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only doctors can record searches.';
  end if;
  v_query := btrim(v_query);
  if char_length(v_query) < 2 then
    return;
  end if;

  insert into public.catalog_search_daily_stats (day, query_norm, specialty_id, searches, zero_result_searches)
  values (current_date, v_query, v_specialty, 1, case when coalesce(p_result_count, 0) = 0 then 1 else 0 end)
  on conflict (day, query_norm, coalesce(specialty_id, '00000000-0000-0000-0000-000000000000'::uuid))
  do update set
    searches = public.catalog_search_daily_stats.searches + 1,
    zero_result_searches = public.catalog_search_daily_stats.zero_result_searches + excluded.zero_result_searches;
end;
$$;

create or replace function public.record_product_view(p_product_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only doctors can record product views.';
  end if;
  if not exists (select 1 from public.products where id = p_product_id and status = 'published') then
    return;
  end if;

  insert into public.product_view_daily_stats (product_id, day, views)
  values (p_product_id, current_date, 1)
  on conflict (product_id, day) do update set
    views = public.product_view_daily_stats.views + 1;
end;
$$;

-- 6. Admin: read the statistics ------------------------------------------------

create or replace function public.admin_top_searches(p_days integer default 30, p_limit integer default 50)
returns table (query text, searches bigint, zero_result_searches bigint)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  return query
  select s.query_norm, sum(s.searches)::bigint, sum(s.zero_result_searches)::bigint
  from public.catalog_search_daily_stats as s
  where s.day > current_date - least(greatest(coalesce(p_days, 30), 1), 365)
  group by s.query_norm
  order by 2 desc, 1
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
end;
$$;

create or replace function public.admin_top_viewed_products(p_days integer default 30, p_limit integer default 50)
returns table (product_id uuid, brand_name_en text, company_name text, views bigint)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  return query
  select v.product_id, t.brand_name, c.company_name, sum(v.views)::bigint
  from public.product_view_daily_stats as v
  join public.products as p on p.id = v.product_id
  join public.companies as c on c.id = p.company_id
  left join public.product_translations as t on t.product_id = p.id and t.locale = 'en'
  where v.day > current_date - least(greatest(coalesce(p_days, 30), 1), 365)
  group by v.product_id, t.brand_name, c.company_name
  order by 4 desc, 2
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
end;
$$;

create or replace function public.admin_sponsored_ad_stats(p_days integer default 30)
returns table (ad_id uuid, title text, sponsor_name text, is_active boolean, views bigint, clicks bigint)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  return query
  select a.id, a.title, a.sponsor_name, a.is_active,
    coalesce(sum(s.views), 0)::bigint, coalesce(sum(s.clicks), 0)::bigint
  from public.sponsored_ads as a
  left join public.sponsored_ad_daily_stats as s
    on s.ad_id = a.id and s.day > current_date - least(greatest(coalesce(p_days, 30), 1), 365)
  group by a.id, a.title, a.sponsor_name, a.is_active
  order by a.is_active desc, 5 desc, a.title;
end;
$$;

-- Grants -------------------------------------------------------------------

revoke all on function private.current_doctor_specialty_id() from public, anon;
grant execute on function private.current_doctor_specialty_id() to authenticated, service_role;

revoke all on function public.admin_save_sponsored_ad(uuid, text, text, text, text, text, uuid, uuid, date, date, boolean, integer) from public, anon;
revoke all on function public.doctor_sponsored_ad(integer) from public, anon;
revoke all on function public.record_sponsored_ad_event(uuid, text) from public, anon;
revoke all on function public.record_catalog_search(text, integer) from public, anon;
revoke all on function public.record_product_view(uuid) from public, anon;
revoke all on function public.admin_top_searches(integer, integer) from public, anon;
revoke all on function public.admin_top_viewed_products(integer, integer) from public, anon;
revoke all on function public.admin_sponsored_ad_stats(integer) from public, anon;

grant execute on function public.admin_save_sponsored_ad(uuid, text, text, text, text, text, uuid, uuid, date, date, boolean, integer) to authenticated, service_role;
grant execute on function public.doctor_sponsored_ad(integer) to authenticated, service_role;
grant execute on function public.record_sponsored_ad_event(uuid, text) to authenticated, service_role;
grant execute on function public.record_catalog_search(text, integer) to authenticated, service_role;
grant execute on function public.record_product_view(uuid) to authenticated, service_role;
grant execute on function public.admin_top_searches(integer, integer) to authenticated, service_role;
grant execute on function public.admin_top_viewed_products(integer, integer) to authenticated, service_role;
grant execute on function public.admin_sponsored_ad_stats(integer) to authenticated, service_role;

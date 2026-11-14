-- Ready for 5,000 doctors (14 Nov 2026).
--
-- Every search, company page and companies list called
-- private.catalog_search_rows(), which rebuilt the whole visible catalog
-- (joins, ingredient lists) on each call: ~50-80 ms of database time per
-- keystroke. On the free plan's small machine, hundreds of doctors typing at
-- once would overload it.
--
-- 1. private.catalog_search_cache: the visible catalog with its search text,
--    stored once. catalog_search_rows() now reads this table.
-- 2. private.refresh_catalog_search_cache(): rebuilds it (about 0.1 s).
-- 3. Statement triggers on every table that changes what doctors see refresh
--    it automatically. Catalog edits are admin-only and rare.
-- 4. Indexes for foreign keys flagged by the performance advisor.

-- 1 ---------------------------------------------------------------------------
create table private.catalog_search_cache (
  product_id uuid primary key,
  company_id uuid not null,
  category text,
  published_at timestamptz,
  company_name text,
  brand_en text,
  generic_en text,
  class_en text,
  strength text,
  dosage_form text,
  n_brand text not null default '',
  n_generic text not null default '',
  n_company text not null default '',
  n_class text not null default '',
  n_strength text not null default '',
  n_ingredients text not null default '',
  specialty_ids uuid[] not null default '{}'
);

comment on table private.catalog_search_cache is
  'Visible doctor catalog with normalized search text; rebuilt by triggers when the catalog changes.';

create index catalog_search_cache_company_idx on private.catalog_search_cache (company_id);
create index catalog_search_cache_specialties_idx on private.catalog_search_cache using gin (specialty_ids);

revoke all on table private.catalog_search_cache from public, anon, authenticated;

-- 2 ---------------------------------------------------------------------------
create or replace function private.refresh_catalog_search_cache()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- DELETE (not TRUNCATE) so searches running at the same time keep reading
  -- the previous rows instead of waiting for a table lock.
  delete from private.catalog_search_cache;

  insert into private.catalog_search_cache (
    product_id, company_id, category, published_at, company_name,
    brand_en, generic_en, class_en, strength, dosage_form,
    n_brand, n_generic, n_company, n_class, n_strength, n_ingredients, specialty_ids
  )
  select
    p.id, p.company_id, p.category::text, p.published_at, c.company_name,
    t_en.brand_name, g_en.name, d_en.name, market.strength, market.dosage_form,
    coalesce(t_en.search_text, ''), coalesce(g_en.search_text, ''), coalesce(c.search_text, ''),
    coalesce(d_en.search_text, ''), coalesce(market.search_text, ''),
    coalesce((
      select string_agg(k.normalized_keyword, ' ')
      from public.product_search_keywords as k
      where k.product_id = p.id and k.keyword_type = 'ingredient'
    ), ''),
    coalesce((
      select array_agg(ps.specialty_id)
      from public.product_specialties as ps
      where ps.product_id = p.id
    ), '{}')
  from public.products as p
  join public.companies as c on c.id = p.company_id
  join lateral (
    select pm.strength, pm.dosage_form, pm.search_text
    from public.product_markets as pm
    join public.countries as country on country.id = pm.country_id
    where pm.product_id = p.id
      and country.iso_code = 'IQ'
      and country.is_active
      and pm.market_status = 'marketed_in_iraq'
    order by pm.created_at
    limit 1
  ) as market on true
  left join public.product_translations as t_en
    on t_en.product_id = p.id and t_en.locale = 'en'
  left join public.generic_drug_translations as g_en
    on g_en.generic_drug_id = p.generic_drug_id and g_en.locale = 'en'
  left join public.drug_class_translations as d_en
    on d_en.drug_class_id = p.drug_class_id and d_en.locale = 'en'
  where p.status = 'published'
    and p.submitted_by is not null and p.submitted_at is not null
    and p.reviewed_by is not null and p.reviewed_at is not null
    and p.published_by is not null and p.published_at is not null
    and c.status = 'verified';
end;
$$;

revoke all on function private.refresh_catalog_search_cache() from public, anon, authenticated;

-- Same columns as before; now a cheap read of the cache.
create or replace function private.catalog_search_rows(
  p_company_id uuid default null,
  p_specialty_id uuid default null
)
returns table (
  product_id uuid,
  company_id uuid,
  category text,
  published_at timestamptz,
  company_name text,
  brand_en text,
  generic_en text,
  class_en text,
  strength text,
  dosage_form text,
  n_brand text,
  n_generic text,
  n_company text,
  n_class text,
  n_strength text,
  n_ingredients text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    s.product_id, s.company_id, s.category, s.published_at, s.company_name,
    s.brand_en, s.generic_en, s.class_en, s.strength, s.dosage_form,
    s.n_brand, s.n_generic, s.n_company, s.n_class, s.n_strength, s.n_ingredients
  from private.catalog_search_cache as s
  where (p_company_id is null or s.company_id = p_company_id)
    and (p_specialty_id is null or s.specialty_ids @> array[p_specialty_id]);
$$;

revoke all on function private.catalog_search_rows(uuid, uuid) from public, anon, authenticated;

-- 3 ---------------------------------------------------------------------------
create or replace function private.refresh_catalog_search_cache_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.refresh_catalog_search_cache();
  return null;
end;
$$;

revoke all on function private.refresh_catalog_search_cache_trigger() from public, anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'products', 'product_translations', 'product_markets', 'companies',
    'generic_drug_translations', 'drug_class_translations',
    'product_search_keywords', 'product_specialties', 'countries'
  ] loop
    execute format(
      'create trigger %I after insert or update or delete on public.%I
         for each statement execute function private.refresh_catalog_search_cache_trigger()',
      t || '_refresh_search_cache', t
    );
  end loop;
end;
$$;

select private.refresh_catalog_search_cache();

-- 4 ---------------------------------------------------------------------------
create index if not exists sponsored_ads_company_idx on public.sponsored_ads (company_id);
create index if not exists sponsored_ads_target_specialty_idx on public.sponsored_ads (target_specialty_id);
create index if not exists user_notifications_sender_profile_idx on public.user_notifications (sender_profile_id);
create index if not exists user_notifications_sender_company_idx on public.user_notifications (sender_company_id);
create index if not exists catalog_search_daily_stats_specialty_idx on public.catalog_search_daily_stats (specialty_id);

-- 5 ---------------------------------------------------------------------------
-- Ad pictures/videos are public files counted against the monthly data
-- allowance; keep them small (the editor now allows 10 MB videos, 5 MB pictures).
update storage.buckets set file_size_limit = 10485760 where id = 'sponsored-ads';

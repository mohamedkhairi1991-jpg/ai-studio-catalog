-- Fix catalog edits from the app (15 Nov 2026).
--
-- 1. Requests from the app run with pg-safeupdate, which refuses a DELETE
--    without a WHERE clause. private.refresh_catalog_search_cache() used
--    "delete from private.catalog_search_cache;", so every catalog change made
--    from the app (publish, archive, unarchive, edits) failed with
--    "DELETE requires a WHERE clause". Now "where true".
-- 2. The cache was rebuilt after every statement; one publish runs many
--    statements, so it rebuilt the whole cache many times. The refresh now runs
--    once per transaction, at commit (deferred constraint triggers + a
--    transaction-local marker). Tests that read the cache in the same
--    transaction call private.refresh_catalog_search_cache() first.

create or replace function private.refresh_catalog_search_cache()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- DELETE (not TRUNCATE) so searches running at the same time keep reading
  -- the previous rows instead of waiting for a table lock. "where true" is
  -- required by pg-safeupdate on app requests.
  delete from private.catalog_search_cache where true;

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

-- Old per-statement triggers: now do nothing (kept to avoid dropping objects).
create or replace function private.refresh_catalog_search_cache_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  return null;
end;
$$;

revoke all on function private.refresh_catalog_search_cache_trigger() from public, anon, authenticated;

-- New triggers run at commit; the first call in a transaction rebuilds, the
-- rest skip. No "set search_path" clause on purpose: a function-level SET
-- undoes set_config() at function exit, which would lose the marker. Every
-- name is schema-qualified instead.
create or replace function private.refresh_catalog_search_cache_at_commit()
returns trigger
language plpgsql
security definer
as $$
declare
  v_tx text := pg_catalog.txid_current()::text;
begin
  if coalesce(pg_catalog.current_setting('pharmaty.search_cache_refreshed_tx', true), '') <> v_tx then
    perform private.refresh_catalog_search_cache();
    perform pg_catalog.set_config('pharmaty.search_cache_refreshed_tx', v_tx, true);
  end if;
  return null;
end;
$$;

revoke all on function private.refresh_catalog_search_cache_at_commit() from public, anon, authenticated;

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
      'create constraint trigger %I after insert or update or delete on public.%I
         deferrable initially deferred
         for each row execute function private.refresh_catalog_search_cache_at_commit()',
      t || '_refresh_search_cache_at_commit', t
    );
  end loop;
end;
$$;

select private.refresh_catalog_search_cache();

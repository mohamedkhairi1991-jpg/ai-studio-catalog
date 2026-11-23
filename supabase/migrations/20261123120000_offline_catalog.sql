-- Offline catalog (23 Nov 2026).
--
-- Doctors can use Pharmaty with no internet. While online, the app downloads
-- the whole visible catalog once (about 1 MB compressed) and keeps it on the
-- phone; it downloads again only when the catalog version changes.
--
-- 1. public.get_offline_catalog_version(): a short fingerprint of the catalog.
-- 2. public.get_offline_catalog_changes(p_since): every drug a doctor can see
--    (same rules as search: private.catalog_search_cache) with the fields the
--    drug page shows, plus companies, specialties and search synonyms. With
--    p_since, only drugs changed since then (small daily updates).
--    public.get_offline_catalog() = the whole catalog.
-- Approved doctors and admins only. No registration numbers.

create or replace function public.get_offline_catalog_version()
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only approved doctors can download the catalog.';
  end if;
  return md5(concat_ws('|',
    (select count(*) from private.catalog_search_cache),
    (select max(published_at) from private.catalog_search_cache),
    (select max(updated_at) from public.products),
    (select max(updated_at) from public.product_translations),
    (select max(updated_at) from public.product_markets),
    (select max(updated_at) from public.product_market_translations),
    (select max(updated_at) from public.companies),
    (select max(updated_at) from public.generic_drug_translations),
    (select max(updated_at) from public.drug_class_translations),
    (select max(updated_at) from public.specialty_translations),
    (select count(*) from public.product_specialties),
    (select count(*) from private.search_synonyms)
  ));
end;
$$;

-- p_since = null: the whole catalog. p_since = a time: only drugs changed after
-- it, plus the ids of all visible drugs (so the phone can drop removed ones).
-- Companies, specialties and synonyms are small and always sent in full.
create or replace function public.get_offline_catalog_changes(p_since timestamptz default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_products jsonb;
  v_all_ids jsonb;
  v_companies jsonb;
  v_specialties jsonb;
  v_synonyms jsonb;
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only approved doctors can download the catalog.';
  end if;

  select coalesce(jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
      'id', s.product_id,
      'companyId', s.company_id,
      'agentCompanyId', p.agent_company_id,
      'category', s.category,
      'brand', s.brand_en,
      'generic', s.generic_en,
      'drugClass', s.class_en,
      'strength', m.strength,
      'dosageForm', m.dosage_form,
      'route', m.route,
      'packSize', m.pack_size,
      'specialtyIds', to_jsonb(s.specialty_ids),
      'storage', mt.storage_conditions,
      'indications', mt.approved_indications,
      'dose', mt.usual_adult_dose,
      'contraindications', mt.contraindications,
      'adverseEffects', mt.common_adverse_effects,
      'publishedAt', s.published_at,
      'nBrand', nullif(s.n_brand, ''),
      'nGeneric', nullif(s.n_generic, ''),
      'nCompany', nullif(s.n_company, ''),
      'nClass', nullif(s.n_class, ''),
      'nStrength', nullif(s.n_strength, ''),
      'nIngredients', nullif(s.n_ingredients, '')
    )) order by s.brand_en), '[]'::jsonb)
  into v_products
  from private.catalog_search_cache as s
  join public.products as p on p.id = s.product_id
  join public.companies as c on c.id = s.company_id
  left join lateral (
    select pm.id, pm.strength, pm.dosage_form, pm.route, pm.pack_size, pm.updated_at
    from public.product_markets as pm
    join public.countries as country on country.id = pm.country_id
    where pm.product_id = s.product_id
      and country.iso_code = 'IQ'
      and country.is_active
      and pm.market_status = 'marketed_in_iraq'
    order by pm.created_at
    limit 1
  ) as m on true
  left join public.product_market_translations as mt
    on mt.product_market_id = m.id and mt.locale = 'en'
  left join public.product_translations as t
    on t.product_id = s.product_id and t.locale = 'en'
  left join public.generic_drug_translations as g
    on g.generic_drug_id = p.generic_drug_id and g.locale = 'en'
  left join public.drug_class_translations as d
    on d.drug_class_id = p.drug_class_id and d.locale = 'en'
  where p_since is null
     or greatest(
          p.updated_at, c.updated_at, m.updated_at, mt.updated_at,
          t.updated_at, g.updated_at, d.updated_at, s.published_at
        ) > p_since;

  if p_since is not null then
    select coalesce(jsonb_agg(s.product_id), '[]'::jsonb)
    into v_all_ids
    from private.catalog_search_cache as s;
  end if;

  select coalesce(jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
      'id', c.id,
      'name', c.company_name,
      'legalName', c.legal_name,
      'type', c.company_type,
      'originCountryCode', c.origin_country_code,
      'tagline', c.tagline,
      'description', c.description,
      'websiteUrl', c.website_url,
      'foundedYear', c.founded_year
    )) order by c.company_name), '[]'::jsonb)
  into v_companies
  from public.companies as c
  where c.status = 'verified';

  select coalesce(jsonb_agg(jsonb_build_object('id', st.specialty_id, 'name', st.name) order by st.name), '[]'::jsonb)
  into v_specialties
  from public.specialty_translations as st
  where st.locale = 'en';

  select coalesce(jsonb_agg(jsonb_build_array(sy.term, sy.replacement)), '[]'::jsonb)
  into v_synonyms
  from private.search_synonyms as sy;

  return jsonb_strip_nulls(jsonb_build_object(
    'version', public.get_offline_catalog_version(),
    'generatedAt', timezone('utc', now()),
    'full', p_since is null,
    'products', v_products,
    'allIds', v_all_ids,
    'companies', v_companies,
    'specialties', v_specialties,
    'synonyms', v_synonyms
  ));
end;
$$;

-- The whole catalog (same as get_offline_catalog_changes(null)).
create or replace function public.get_offline_catalog()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select public.get_offline_catalog_changes(null);
$$;

revoke all on function public.get_offline_catalog_version() from public, anon;
revoke all on function public.get_offline_catalog() from public, anon;
revoke all on function public.get_offline_catalog_changes(timestamptz) from public, anon;
grant execute on function public.get_offline_catalog_version() to authenticated, service_role;
grant execute on function public.get_offline_catalog() to authenticated, service_role;
grant execute on function public.get_offline_catalog_changes(timestamptz) to authenticated, service_role;

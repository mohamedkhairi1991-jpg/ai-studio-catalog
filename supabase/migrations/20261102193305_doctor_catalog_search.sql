-- Fast catalog search for doctors (and administrators).
--
-- Returns one page of published, Iraq-marketed products that match a query on
-- brand name (English or Arabic), generic name or company name, optionally
-- filtered by company and specialty. The doctor screen calls this instead of
-- downloading the whole catalog; full details load when a product is opened.

create or replace function public.search_catalog_products(
  p_query text default null,
  p_company_id uuid default null,
  p_specialty_id uuid default null,
  p_limit integer default 20,
  p_offset integer default 0
)
returns table (
  product_id uuid,
  brand_name_en text,
  brand_name_ar text,
  generic_name_en text,
  company_id uuid,
  company_name text,
  drug_class_name_en text,
  category text,
  strength text,
  dosage_form text,
  published_at timestamptz,
  total_count bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_raw text := nullif(btrim(coalesce(p_query, '')), '');
  v_has_arabic boolean;
  v_en text;
  v_ar text;
  v_limit integer := least(greatest(coalesce(p_limit, 20), 1), 50);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501',
      message = 'Only approved doctors can search the catalog.';
  end if;

  if v_raw is not null and char_length(v_raw) > 100 then
    raise exception using errcode = '22023',
      message = 'The search text is too long (100 characters at most).';
  end if;

  v_has_arabic := v_raw is not null and v_raw ~ '[؀-ۿ]';
  v_en := case when v_raw is null then null else private.normalize_english_text(v_raw) end;
  v_ar := case when v_has_arabic then private.normalize_arabic_text(v_raw) end;
  -- LIKE wildcards in the Arabic text are matched literally.
  v_ar := replace(replace(replace(v_ar, '\', '\\'), '%', '\%'), '_', '\_');

  return query
  with visible as (
    select
      p.id,
      p.company_id,
      p.generic_drug_id,
      p.drug_class_id,
      p.category::text as category,
      p.published_at,
      c.company_name,
      t_en.brand_name as brand_en,
      t_ar.brand_name as brand_ar,
      g_en.name as generic_en,
      g_ar.name as generic_ar,
      d_en.name as class_en,
      private.normalize_english_text(t_en.brand_name) as n_brand,
      private.normalize_english_text(g_en.name) as n_generic,
      private.normalize_english_text(c.company_name) as n_company
    from public.products as p
    join public.companies as c on c.id = p.company_id
    left join public.product_translations as t_en
      on t_en.product_id = p.id and t_en.locale = 'en'
    left join public.product_translations as t_ar
      on t_ar.product_id = p.id and t_ar.locale = 'ar'
    left join public.generic_drug_translations as g_en
      on g_en.generic_drug_id = p.generic_drug_id and g_en.locale = 'en'
    left join public.generic_drug_translations as g_ar
      on g_ar.generic_drug_id = p.generic_drug_id and g_ar.locale = 'ar'
    left join public.drug_class_translations as d_en
      on d_en.drug_class_id = p.drug_class_id and d_en.locale = 'en'
    where p.status = 'published'
      and c.status = 'verified'
      and (p_company_id is null or p.company_id = p_company_id)
      and (
        p_specialty_id is null
        or exists (
          select 1 from public.product_specialties as ps
          where ps.product_id = p.id and ps.specialty_id = p_specialty_id
        )
      )
      and private.is_official_catalog_product_visible(p.id)
  ),
  matched as (
    select
      v.*,
      case
        when v_en is null and v_ar is null then 0
        when v_en is not null and v.n_brand like v_en || '%' then 0
        when v_ar is not null and private.normalize_arabic_text(v.brand_ar) like v_ar || '%' escape '\' then 0
        when v_en is not null and v.n_generic like v_en || '%' then 1
        when v_en is not null and v.n_brand like '%' || v_en || '%' then 2
        when v_ar is not null and private.normalize_arabic_text(v.brand_ar) like '%' || v_ar || '%' escape '\' then 2
        when v_en is not null and v.n_generic like '%' || v_en || '%' then 3
        when v_ar is not null and private.normalize_arabic_text(v.generic_ar) like '%' || v_ar || '%' escape '\' then 3
        when v_en is not null and v.n_company like '%' || v_en || '%' then 4
        else null
      end as rank
    from visible as v
  )
  select
    m.id,
    m.brand_en,
    m.brand_ar,
    m.generic_en,
    m.company_id,
    m.company_name,
    m.class_en,
    m.category,
    market.strength,
    market.dosage_form,
    m.published_at,
    count(*) over () as total_count
  from matched as m
  left join lateral (
    select pm.strength, pm.dosage_form
    from public.product_markets as pm
    join public.countries as country on country.id = pm.country_id
    where pm.product_id = m.id and country.iso_code = 'IQ'
    order by pm.created_at
    limit 1
  ) as market on true
  where m.rank is not null
    and (v_raw is null or v_en is not null or v_ar is not null)
  order by m.rank, lower(m.brand_en), m.id
  limit v_limit
  offset v_offset;
end;
$$;

comment on function public.search_catalog_products(text, uuid, uuid, integer, integer) is
  'One page (max 50) of published Iraq-catalog products for approved doctors and administrators, '
  'matched on brand (en/ar), generic and company name; total_count is the number of matches.';

revoke all on function public.search_catalog_products(text, uuid, uuid, integer, integer) from public, anon;
grant execute on function public.search_catalog_products(text, uuid, uuid, integer, integer)
  to authenticated, service_role;

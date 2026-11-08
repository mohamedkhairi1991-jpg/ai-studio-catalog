-- Smart search v2 (leader mode, 8 Nov 2026).
--
-- Live test before this change: 0 results for typos ("panadool", "augmentn",
-- "amoxicilin", "metformine", "breaztri"), US/UK names ("acetaminophen",
-- "albuterol"), classes ("beta blocker"), multi-word ("amlodipine 10 pfizer")
-- and "vitamin d".
--
-- 1. private.search_synonyms: query words -> catalog words (US/UK names,
--    abbreviations, "vitamin d" -> colecalciferol). Admin-editable later.
-- 2. search_catalog_products_v2: same arguments as search_catalog_products,
--    plus match_kind ('exact' | 'close'); search_catalog_products now calls
--    it (same columns as before). Ranking:
--      0 brand starts with   1 generic starts with   2 brand contains
--      3 generic contains    4 every word in brand/generic/company/strength
--      5 every word in drug class   6 company contains
--      7 ingredient name contains
--      8 close spelling (only when nothing above matched)
-- 3. get_product_alternatives: same generic, other brands sold in Iraq
--    (same strength and form first) for the drug page.

-- 1 ---------------------------------------------------------------------------
create table private.search_synonyms (
  term text primary key,
  replacement text not null,
  constraint search_synonyms_term_normalized check (term = private.normalize_english_text(term)),
  constraint search_synonyms_replacement_normalized check (replacement = private.normalize_english_text(replacement))
);

comment on table private.search_synonyms is
  'Search query words (normalized) and the catalog words they also mean.';

revoke all on table private.search_synonyms from public, anon, authenticated;

insert into private.search_synonyms (term, replacement) values
  ('acetaminophen', 'paracetamol'),
  ('apap', 'paracetamol'),
  ('albuterol', 'salbutamol'),
  ('epinephrine', 'adrenaline'),
  ('norepinephrine', 'noradrenaline'),
  ('glyburide', 'glibenclamide'),
  ('meperidine', 'pethidine'),
  ('lignocaine', 'lidocaine'),
  ('frusemide', 'furosemide'),
  ('cyclosporine', 'ciclosporin'),
  ('cephalexin', 'cefalexin'),
  ('cefalexine', 'cefalexin'),
  ('rifampin', 'rifampicin'),
  ('levothyroxin', 'levothyroxine'),
  ('thyroxine', 'levothyroxine'),
  ('hydroxyzine hcl', 'hydroxyzine'),
  ('vitamin d', 'colecalciferol'),
  ('vitamin d3', 'colecalciferol'),
  ('vit d', 'colecalciferol'),
  ('vit d3', 'colecalciferol'),
  ('cholecalciferol', 'colecalciferol'),
  ('vitamin b12', 'cyanocobalamin'),
  ('vit b12', 'cyanocobalamin'),
  ('b12', 'cobalamin'),
  ('vitamin c', 'ascorbic acid'),
  ('vitamin k', 'phytomenadione'),
  ('folic', 'folic acid'),
  ('aspirin', 'acetylsalicylic acid'),
  ('asa', 'acetylsalicylic acid'),
  ('ppi', 'proton pump inhibitor'),
  ('ccb', 'calcium channel blocker'),
  ('arb', 'angiotensin ii receptor'),
  ('acei', 'ace inhibitor'),
  ('doac', 'factor xa'),
  ('noac', 'factor xa'),
  ('antibiotic', 'antibacterial'),
  ('antibiotics', 'antibacterial'),
  ('painkiller', 'analgesic'),
  ('steroid', 'corticosteroid'),
  ('steroids', 'corticosteroid'),
  ('gliptin', 'dpp 4'),
  ('gliflozin', 'sglt2'),
  ('blood thinner', 'anticoagulant'),
  ('inhaler', 'inhalation'),
  ('syrup', 'oral solution');

-- 2a --------------------------------------------------------------------------
-- Visible catalog rows with their stored search text (same rules as
-- private.is_official_catalog_product_visible, written as joins for speed).
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
    p.id,
    p.company_id,
    p.category::text,
    p.published_at,
    c.company_name,
    t_en.brand_name,
    g_en.name,
    d_en.name,
    market.strength,
    market.dosage_form,
    coalesce(t_en.search_text, ''),
    coalesce(g_en.search_text, ''),
    coalesce(c.search_text, ''),
    coalesce(d_en.search_text, ''),
    coalesce(market.search_text, ''),
    coalesce((
      select string_agg(k.normalized_keyword, ' ')
      from public.product_search_keywords as k
      where k.product_id = p.id and k.keyword_type = 'ingredient'
    ), '')
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
    and c.status = 'verified'
    and (p_company_id is null or p.company_id = p_company_id)
    and (
      p_specialty_id is null
      or exists (
        select 1 from public.product_specialties as ps
        where ps.product_id = p.id and ps.specialty_id = p_specialty_id
      )
    );
$$;

revoke all on function private.catalog_search_rows(uuid, uuid) from public, anon, authenticated;

-- 2 ---------------------------------------------------------------------------
create or replace function public.search_catalog_products_v2(
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
  total_count bigint,
  match_kind text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_raw text := nullif(btrim(coalesce(p_query, '')), '');
  v_en text;
  v_variants text[];
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

  v_en := case when v_raw is null then null else private.normalize_english_text(v_raw) end;

  -- The query itself plus one variant per synonym found as whole words.
  if v_en is not null then
    select array_agg(distinct variant)
    into v_variants
    from (
      select v_en as variant
      union all
      select btrim(regexp_replace(' ' || v_en || ' ', ' ' || s.term || ' ', ' ' || s.replacement || ' '))
      from private.search_synonyms as s
      where (' ' || v_en || ' ') like ('% ' || s.term || ' %')
    ) as variants;
  end if;

  -- Pass 1: exact matches (brand, generic, words, class, company, ingredients).
  return query
  with visible as (
    select * from private.catalog_search_rows(p_company_id, p_specialty_id)
  ),
  ranked as (
    select
      v.*,
      case when v_en is null then 0 else (
        select min(
          case
            when v.n_brand like q.v || '%' then 0
            when v.n_generic like q.v || '%' then 1
            when v.n_brand like '%' || q.v || '%' then 2
            when v.n_generic like '%' || q.v || '%' then 3
            when not exists (
              select 1 from unnest(q.words) as w
              where (' ' || v.n_brand || ' ' || v.n_generic || ' ' || v.n_company || ' ' || v.n_strength)
                not like ('% ' || w || '%')
            ) then 4
            when v.n_class <> '' and not exists (
              select 1 from unnest(q.words) as w
              where (' ' || v.n_class) not like ('% ' || w || '%')
            ) then 5
            when v.n_company like '%' || q.v || '%' then 6
            when (' ' || v.n_ingredients) like ('% ' || q.v || '%') then 7
            else null
          end)
        from (
          select variant as v, regexp_split_to_array(variant, ' ') as words
          from unnest(v_variants) as variant
        ) as q
      ) end as rank
    from visible as v
  )
  select
    r.product_id, r.brand_en, null::text, r.generic_en, r.company_id, r.company_name,
    r.class_en, r.category, r.strength, r.dosage_form, r.published_at,
    count(*) over () as total_count,
    'exact'::text
  from ranked as r
  where r.rank is not null
  order by r.rank, lower(r.brand_en), r.product_id
  limit v_limit
  offset v_offset;

  if found or v_en is null or char_length(v_en) < 3 or v_offset > 0 then
    return;
  end if;

  -- Pass 2: nothing matched exactly, so offer close spellings ("Did you mean").
  return query
  with visible as (
    select * from private.catalog_search_rows(p_company_id, p_specialty_id)
  ),
  scored as (
    select
      v.*,
      greatest(
        extensions.word_similarity(v_en, v.n_brand),
        extensions.word_similarity(v_en, v.n_generic)
      ) as closeness,
      greatest(
        extensions.similarity(v_en, v.n_brand),
        extensions.similarity(v_en, v.n_generic)
      ) as whole
    from visible as v
  )
  select
    s.product_id, s.brand_en, null::text, s.generic_en, s.company_id, s.company_name,
    s.class_en, s.category, s.strength, s.dosage_form, s.published_at,
    count(*) over () as total_count,
    'close'::text
  from scored as s
  where s.closeness >= 0.45
  order by s.closeness desc, s.whole desc, lower(s.brand_en), s.product_id
  limit v_limit;
end;
$$;

comment on function public.search_catalog_products_v2(text, uuid, uuid, integer, integer) is
  'One page (max 50) of published Iraq-catalog products for approved doctors and administrators. '
  'Matches brand, generic, company, strength, drug class and ingredients, understands common '
  'synonyms, and falls back to close spellings (match_kind = close) when nothing matches exactly.';

revoke all on function public.search_catalog_products_v2(text, uuid, uuid, integer, integer) from public, anon;
grant execute on function public.search_catalog_products_v2(text, uuid, uuid, integer, integer)
  to authenticated, service_role;

-- 2b --------------------------------------------------------------------------
-- The original name keeps its result columns and uses the new search, so the
-- app that is live today gets the better search at once.
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
language sql
stable
security definer
set search_path = ''
as $$
  select
    s.product_id, s.brand_name_en, s.brand_name_ar, s.generic_name_en, s.company_id,
    s.company_name, s.drug_class_name_en, s.category, s.strength, s.dosage_form,
    s.published_at, s.total_count
  from public.search_catalog_products_v2(p_query, p_company_id, p_specialty_id, p_limit, p_offset) as s;
$$;

comment on function public.search_catalog_products(text, uuid, uuid, integer, integer) is
  'Same as search_catalog_products_v2 without match_kind (kept for older app versions).';

revoke all on function public.search_catalog_products(text, uuid, uuid, integer, integer) from public, anon;
grant execute on function public.search_catalog_products(text, uuid, uuid, integer, integer)
  to authenticated, service_role;

-- 3 ---------------------------------------------------------------------------
create or replace function public.get_product_alternatives(
  p_product_id uuid,
  p_limit integer default 20
)
returns table (
  product_id uuid,
  brand_name_en text,
  company_id uuid,
  company_name text,
  origin_country_code text,
  strength text,
  dosage_form text,
  same_strength boolean,
  same_form boolean
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_generic uuid;
  v_strength text;
  v_form text;
  v_limit integer := least(greatest(coalesce(p_limit, 20), 1), 50);
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501',
      message = 'Only approved doctors can see alternatives.';
  end if;

  if not private.is_official_catalog_product_visible(p_product_id) then
    raise exception using errcode = '42501',
      message = 'This drug is not available.';
  end if;

  select p.generic_drug_id,
         private.normalize_english_text(pm.strength),
         private.normalize_english_text(pm.dosage_form)
  into v_generic, v_strength, v_form
  from public.products as p
  left join lateral (
    select m.strength, m.dosage_form
    from public.product_markets as m
    join public.countries as country on country.id = m.country_id
    where m.product_id = p.id and country.iso_code = 'IQ'
    order by m.created_at
    limit 1
  ) as pm on true
  where p.id = p_product_id;

  if v_generic is null then
    return;
  end if;

  return query
  select
    p.id,
    t.brand_name,
    c.id,
    c.company_name,
    c.origin_country_code,
    pm.strength,
    pm.dosage_form,
    coalesce(private.normalize_english_text(pm.strength) = v_strength, false),
    coalesce(private.normalize_english_text(pm.dosage_form) = v_form, false)
  from public.products as p
  join public.companies as c on c.id = p.company_id
  left join public.product_translations as t
    on t.product_id = p.id and t.locale = 'en'
  left join lateral (
    select m.strength, m.dosage_form
    from public.product_markets as m
    join public.countries as country on country.id = m.country_id
    where m.product_id = p.id and country.iso_code = 'IQ'
    order by m.created_at
    limit 1
  ) as pm on true
  where p.generic_drug_id = v_generic
    and p.id <> p_product_id
    and p.status = 'published'
    and c.status = 'verified'
    and private.is_official_catalog_product_visible(p.id)
  order by
    (private.normalize_english_text(pm.strength) = v_strength) desc nulls last,
    (private.normalize_english_text(pm.dosage_form) = v_form) desc nulls last,
    lower(t.brand_name),
    p.id
  limit v_limit;
end;
$$;

comment on function public.get_product_alternatives(uuid, integer) is
  'Other published brands of the same generic sold in Iraq (same strength and form first).';

revoke all on function public.get_product_alternatives(uuid, integer) from public, anon;
grant execute on function public.get_product_alternatives(uuid, integer) to authenticated, service_role;

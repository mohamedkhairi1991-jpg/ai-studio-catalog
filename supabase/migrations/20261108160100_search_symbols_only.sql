-- Search v2 fix: a query with no letters or digits (e.g. "%%" or "--")
-- returns nothing, as the original search did, instead of every drug.

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

  -- Text with no letters or digits (e.g. "%%") matches nothing, as before.
  if v_raw is not null and v_en is null then
    return;
  end if;

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


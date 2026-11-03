-- English-only catalog (owner decision, 2026-11-03: "no Arabic words").
--
-- 1. admin_save_ai_product_draft no longer stores an Arabic brand name
--    (brandNameAr in a draft is ignored).
-- 2. Existing Arabic brand names, their Arabic search keywords and the
--    brandNameAr field of stored AI drafts are removed.
-- English names, generics, clinical text and everything else are unchanged.

create or replace function public.admin_save_ai_product_draft(
  p_company_id uuid,
  p_draft jsonb,
  p_sources jsonb default '[]'::jsonb,
  p_model text default null
)
returns table (
  product_id uuid,
  outcome text,
  missing text[]
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid;
  v_brand text;
  v_category text;
  v_class text;
  v_generic text;
  v_ingredients text[];
  v_specialties text[];
  v_strength text;
  v_form text;
  v_route text;
  v_pack text;
  v_clinical jsonb;
  v_existing uuid;
  v_class_id uuid;
  v_generic_id uuid;
  v_product_id uuid;
  v_specialty_ids uuid[];
  v_missing text[] := array[]::text[];
  v_market_saved boolean := false;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  if not private.is_verified_company(p_company_id) then
    raise exception using errcode = '23514',
      message = 'Choose an active company first.';
  end if;

  if p_draft is null or jsonb_typeof(p_draft) <> 'object' then
    raise exception using errcode = '22023', message = 'The AI draft is missing.';
  end if;
  if p_sources is null or jsonb_typeof(p_sources) <> 'array' then
    p_sources := '[]'::jsonb;
  end if;

  v_actor := private.current_profile_id();
  v_brand := nullif(btrim(coalesce(p_draft->>'brandName', '')), '');
  v_category := nullif(btrim(coalesce(p_draft->>'category', '')), '');
  v_class := nullif(btrim(coalesce(p_draft->>'drugClass', '')), '');
  v_generic := nullif(btrim(coalesce(p_draft->>'genericName', '')), '');
  v_strength := btrim(coalesce(p_draft->>'strength', ''));
  v_form := btrim(coalesce(p_draft->>'dosageForm', ''));
  v_route := btrim(coalesce(p_draft->>'route', ''));
  v_pack := btrim(coalesce(p_draft->>'packSize', ''));
  v_clinical := coalesce(p_draft->'clinical', '{}'::jsonb);

  select coalesce(array_agg(btrim(value)) filter (where btrim(value) <> ''), array[]::text[])
    into v_ingredients
  from jsonb_array_elements_text(
    case when jsonb_typeof(p_draft->'activeIngredients') = 'array'
      then p_draft->'activeIngredients' else '[]'::jsonb end
  ) as value;

  select coalesce(array_agg(btrim(value)) filter (where btrim(value) <> ''), array[]::text[])
    into v_specialties
  from jsonb_array_elements_text(
    case when jsonb_typeof(p_draft->'specialties') = 'array'
      then p_draft->'specialties' else '[]'::jsonb end
  ) as value;

  if v_brand is null then
    raise exception using errcode = '22023', message = 'The AI draft has no brand name.';
  end if;

  -- Skip products this company already has: same English brand name and,
  -- when both are known, the same strength.
  select p.id into v_existing
  from public.products as p
  join public.product_translations as t
    on t.product_id = p.id and t.locale = 'en'
  left join public.product_markets as m
    on m.product_id = p.id
  where p.company_id = p_company_id
    -- any status, including archived: never re-create a removed product
    and lower(btrim(t.brand_name)) = lower(v_brand)
    and (v_strength = '' or m.strength is null or lower(btrim(m.strength)) = lower(v_strength))
  limit 1;
  if v_existing is not null then
    return query select v_existing, 'exists'::text, array[]::text[];
    return;
  end if;

  if v_category is null
     or v_category not in ('prescription_drug', 'otc_drug', 'dietary_supplement') then
    raise exception using errcode = '22023',
      message = format('"%s": the category is unknown. Draft it manually.', v_brand);
  end if;
  if v_class is null then
    raise exception using errcode = '22023',
      message = format('"%s": the drug class is unknown. Draft it manually.', v_brand);
  end if;
  if v_category <> 'dietary_supplement' and v_generic is null then
    raise exception using errcode = '22023',
      message = format('"%s": the generic name is unknown. Draft it manually.', v_brand);
  end if;

  select e.drug_class_id, e.generic_drug_id into v_class_id, v_generic_id
  from public.admin_ensure_generic_drug(
    v_class,
    case when v_category = 'dietary_supplement' then null else v_generic end,
    nullif(v_ingredients, array[]::text[])
  ) as e;

  select d.id into v_product_id
  from public.create_product_draft(
    p_company_id, v_category::public.product_category, v_generic_id, v_class_id, v_brand
  ) as d;

  -- English-only catalog: an Arabic brand name in the draft is ignored.

  -- Iraq market record: needs all four presentation fields.
  if v_strength <> '' and v_form <> '' and v_route <> '' and v_pack <> '' then
    perform public.upsert_product_market(
      v_product_id, v_strength, v_form, v_route, v_pack,
      'marketed_in_iraq', 'not_recorded', null, null, null
    );
    v_market_saved := true;
  else
    if v_strength = '' then v_missing := v_missing || 'strength'::text; end if;
    if v_form = '' then v_missing := v_missing || 'dosage form'::text; end if;
    if v_route = '' then v_missing := v_missing || 'route'::text; end if;
    if v_pack = '' then v_missing := v_missing || 'pack size'::text; end if;
  end if;

  -- English clinical content: needs the market record and all five fields.
  if v_market_saved
     and btrim(coalesce(v_clinical->>'approvedIndications', '')) <> ''
     and btrim(coalesce(v_clinical->>'usualAdultDose', '')) <> ''
     and btrim(coalesce(v_clinical->>'contraindications', '')) <> ''
     and btrim(coalesce(v_clinical->>'commonAdverseEffects', '')) <> ''
     and btrim(coalesce(v_clinical->>'storageConditions', '')) <> '' then
    perform public.upsert_product_market_translation(
      v_product_id, 'en',
      v_clinical->>'storageConditions',
      v_clinical->>'approvedIndications',
      v_clinical->>'usualAdultDose',
      v_clinical->>'contraindications',
      v_clinical->>'commonAdverseEffects'
    );
  else
    v_missing := v_missing || 'clinical information (kept in the AI draft)'::text;
  end if;

  if cardinality(v_specialties) > 0 then
    select array_agg(s.specialty_id) into v_specialty_ids
    from public.admin_ensure_specialties(v_specialties) as s;
    perform public.set_product_specialties(v_product_id, v_specialty_ids);
  else
    v_missing := v_missing || 'specialty'::text;
  end if;

  insert into public.product_ai_drafts (product_id, draft, sources, model, created_by)
  values (v_product_id, p_draft - 'brandNameAr', p_sources, nullif(btrim(coalesce(p_model, '')), ''), v_actor);

  return query select v_product_id, 'created'::text, v_missing;
end;
$$;

revoke all on function public.admin_save_ai_product_draft(uuid, jsonb, jsonb, text) from public, anon;
grant execute on function public.admin_save_ai_product_draft(uuid, jsonb, jsonb, text) to authenticated, service_role;

delete from public.product_search_keywords where locale = 'ar';
delete from public.product_translations where locale = 'ar';
update public.product_ai_drafts set draft = draft - 'brandNameAr' where draft ? 'brandNameAr';

-- Admin taxonomy helpers for the AI-assisted product drafting flow.
--
-- When the administrator drafts a product (often pre-filled by the
-- ai-draft-product function), the drug class, active ingredients, generic
-- drug and specialties it names may not exist yet. These helpers find them
-- by English name or code, and create + translate + activate the missing
-- ones in one call, by reusing the existing audited admin RPCs.
--
-- Both helpers are administrator-only. Existing but inactive records are
-- never silently re-activated: the helper stops and says so.

-- Code derived from an English name: "SGLT2 Inhibitors" -> "sglt2_inhibitors".
create or replace function private.taxonomy_code(p_name text)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  slug text;
begin
  slug := btrim(regexp_replace(lower(coalesce(p_name, '')), '[^a-z0-9]+', '_', 'g'), '_');
  if slug = '' then
    raise exception using errcode = '22023',
      message = format('An English name is required (got "%s").', coalesce(p_name, ''));
  end if;
  if slug !~ '^[a-z]' then
    slug := 'x_' || slug;
  end if;
  return left(slug, 64);
end;
$$;

revoke all on function private.taxonomy_code(text) from public;

create or replace function public.admin_ensure_generic_drug(
  p_drug_class_name text,
  p_generic_name text default null,
  p_ingredient_names text[] default null
)
returns table (
  drug_class_id uuid,
  generic_drug_id uuid,
  created text[]
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_created text[] := array[]::text[];
  v_class_id uuid;
  v_class_active boolean;
  v_generic_id uuid;
  v_generic_active boolean;
  v_ingredient_id uuid;
  v_ingredient_active boolean;
  v_ingredient_ids uuid[] := array[]::uuid[];
  v_name text;
  v_code text;
  v_names text[];
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  if p_drug_class_name is null or btrim(p_drug_class_name) = '' then
    raise exception using errcode = '22023',
      message = 'A drug class name is required.';
  end if;

  -- Drug class ---------------------------------------------------------------
  v_name := btrim(p_drug_class_name);
  v_code := private.taxonomy_code(v_name);
  select dc.id, dc.is_active into v_class_id, v_class_active
  from public.drug_classes as dc
  where lower(dc.code) = v_code
     or exists (
       select 1 from public.drug_class_translations as t
       where t.drug_class_id = dc.id and t.locale = 'en'
         and lower(btrim(t.name)) = lower(v_name)
     )
  order by (lower(dc.code) = v_code) desc
  limit 1;

  if v_class_id is null then
    select c.id into v_class_id from public.admin_create_drug_class(v_code, null) as c;
    perform public.admin_upsert_drug_class_translation(v_class_id, 'en', v_name, null);
    perform public.admin_set_drug_class_active(v_class_id, true);
    v_created := v_created || ('drug class: ' || v_name);
  elsif not v_class_active then
    raise exception using errcode = '23514',
      message = format('Drug class "%s" exists but is inactive. Activate it first.', v_name);
  end if;

  -- Dietary supplements have no generic drug.
  if p_generic_name is null or btrim(p_generic_name) = '' then
    return query select v_class_id, null::uuid, v_created;
    return;
  end if;

  -- Generic drug -------------------------------------------------------------
  v_name := btrim(p_generic_name);
  v_code := private.taxonomy_code(v_name);
  select g.id, g.is_active into v_generic_id, v_generic_active
  from public.generic_drugs as g
  where lower(g.code) = v_code
     or exists (
       select 1 from public.generic_drug_translations as t
       where t.generic_drug_id = g.id and t.locale = 'en'
         and lower(btrim(t.name)) = lower(v_name)
     )
  order by (lower(g.code) = v_code) desc
  limit 1;

  if v_generic_id is not null then
    if not v_generic_active then
      raise exception using errcode = '23514',
        message = format('Generic drug "%s" exists but is inactive. Activate it first.', v_name);
    end if;
    return query select v_class_id, v_generic_id, v_created;
    return;
  end if;

  -- Active ingredients (default: the generic itself, single-ingredient).
  v_names := coalesce(
    nullif(array_remove(p_ingredient_names, null), array[]::text[]),
    array[v_name]
  );

  foreach v_name in array v_names loop
    v_name := btrim(v_name);
    continue when v_name = '';
    v_code := private.taxonomy_code(v_name);
    v_ingredient_id := null;
    select a.id, a.is_active into v_ingredient_id, v_ingredient_active
    from public.active_ingredients as a
    where lower(a.code) = v_code
       or exists (
         select 1 from public.active_ingredient_translations as t
         where t.active_ingredient_id = a.id and t.locale = 'en'
           and lower(btrim(t.name)) = lower(v_name)
       )
    order by (lower(a.code) = v_code) desc
    limit 1;

    if v_ingredient_id is null then
      select a.id into v_ingredient_id from public.admin_create_active_ingredient(v_code) as a;
      perform public.admin_upsert_active_ingredient_translation(v_ingredient_id, 'en', v_name, null);
      perform public.admin_set_active_ingredient_active(v_ingredient_id, true);
      v_created := v_created || ('active ingredient: ' || v_name);
    elsif not v_ingredient_active then
      raise exception using errcode = '23514',
        message = format('Active ingredient "%s" exists but is inactive. Activate it first.', v_name);
    end if;

    if not v_ingredient_id = any(v_ingredient_ids) then
      v_ingredient_ids := v_ingredient_ids || v_ingredient_id;
    end if;
  end loop;

  if cardinality(v_ingredient_ids) = 0 then
    raise exception using errcode = '22023',
      message = 'At least one active ingredient name is required.';
  end if;

  v_name := btrim(p_generic_name);
  select g.id into v_generic_id
  from public.admin_create_generic_drug(private.taxonomy_code(v_name), v_class_id) as g;
  perform public.admin_upsert_generic_drug_translation(v_generic_id, 'en', v_name, null);
  perform public.admin_set_generic_drug_ingredients(v_generic_id, v_ingredient_ids);
  perform public.admin_set_generic_drug_active(v_generic_id, true);
  v_created := v_created || ('generic drug: ' || v_name);

  return query select v_class_id, v_generic_id, v_created;
end;
$$;

create or replace function public.admin_ensure_specialties(p_names text[])
returns table (
  specialty_id uuid,
  name text,
  created boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text;
  v_code text;
  v_id uuid;
  v_active boolean;
  v_seen text[] := array[]::text[];
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  if p_names is null then
    return;
  end if;

  foreach v_name in array p_names loop
    v_name := btrim(coalesce(v_name, ''));
    continue when v_name = '';
    v_code := private.taxonomy_code(v_name);
    continue when v_code = any(v_seen);
    v_seen := v_seen || v_code;

    v_id := null;
    select s.id, s.is_active into v_id, v_active
    from public.specialties as s
    where lower(s.code) = v_code
       or exists (
         select 1 from public.specialty_translations as t
         where t.specialty_id = s.id and t.locale = 'en'
           and lower(btrim(t.name)) = lower(v_name)
       )
    order by (lower(s.code) = v_code) desc
    limit 1;

    if v_id is null then
      select s.id into v_id from public.admin_create_specialty(v_code, null) as s;
      perform public.admin_upsert_specialty_translation(v_id, 'en', v_name, null);
      perform public.admin_set_specialty_active(v_id, true);
      return query select v_id, v_name, true;
    elsif not v_active then
      raise exception using errcode = '23514',
        message = format('Specialty "%s" exists but is inactive. Activate it first.', v_name);
    else
      return query select v_id, v_name, false;
    end if;
  end loop;
end;
$$;

revoke all on function public.admin_ensure_generic_drug(text, text, text[]) from public, anon;
grant execute on function public.admin_ensure_generic_drug(text, text, text[]) to authenticated, service_role;

revoke all on function public.admin_ensure_specialties(text[]) from public, anon;
grant execute on function public.admin_ensure_specialties(text[]) to authenticated, service_role;

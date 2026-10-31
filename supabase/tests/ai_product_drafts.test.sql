begin;

select plan(13);

-- Fixtures --------------------------------------------------------------------
-- 73..01 administrator, 73..03 user without a role
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
select
  user_id, '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', email,
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  now(), now()
from (
  values
    ('73000000-0000-4000-8000-000000000001'::uuid, 'aid-admin@example.com'),
    ('73000000-0000-4000-8000-000000000003'::uuid, 'aid-plain@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '73000000-0000-4000-8000-000000000001';

set constraints all immediate;

select set_config('request.jwt.claim.sub', '73000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Draft Pharma', 'Draft Pharma LLC'
);

-- 1. A complete AI draft is saved as a draft product ---------------------------
select is(
  (
    select row(outcome, cardinality(missing))::text
    from public.admin_save_ai_product_draft(
      (select id from public.companies where company_name = 'Draft Pharma'),
      '{
        "brandName": "Glucora 10 mg", "brandNameAr": "غلوكورا ١٠ ملغ",
        "category": "prescription_drug",
        "genericName": "Glucoflozin", "activeIngredients": ["Glucoflozin"],
        "drugClass": "SGLT2 inhibitors",
        "strength": "10 mg", "dosageForm": "Film-coated tablet", "route": "Oral", "packSize": "28 tablets",
        "clinical": {
          "approvedIndications": "Type 2 diabetes mellitus.",
          "usualAdultDose": "10 mg once daily.",
          "contraindications": "Hypersensitivity.",
          "commonAdverseEffects": "Genital infections.",
          "storageConditions": "Store below 30 °C."
        },
        "specialties": ["Endocrinology", "Cardiology"]
      }'::jsonb,
      '[{"title": "EMA SmPC", "url": "https://www.ema.europa.eu/x"}]'::jsonb,
      'gemini-3.8-flash'
    )
  ),
  row('created', 0)::text,
  'a complete AI draft is saved with nothing missing'
);

select is(
  (
    select row(p.status, m.market_status, m.registration_status, mt.usual_adult_dose,
      (select count(*) from public.product_specialties ps where ps.product_id = p.id),
      (select brand_name from public.product_translations where product_id = p.id and locale = 'ar'),
      (select jsonb_array_length(sources) from public.product_ai_drafts where product_id = p.id))::text
    from public.products p
    join public.product_translations t on t.product_id = p.id and t.locale = 'en'
    join public.product_markets m on m.product_id = p.id
    join public.product_market_translations mt on mt.product_market_id = m.id and mt.locale = 'en'
    where t.brand_name = 'Glucora 10 mg'
  ),
  row('draft', 'marketed_in_iraq', 'not_recorded', '10 mg once daily.', 2, 'غلوكورا ١٠ ملغ', 1)::text,
  'it is a draft with market, clinical text, specialties, Arabic name and stored sources'
);

-- 2. Duplicates are skipped, other strengths are not ---------------------------
select is(
  (
    select row(outcome, product_id = (select product_id from public.product_translations where brand_name = 'Glucora 10 mg'))::text
    from public.admin_save_ai_product_draft(
      (select id from public.companies where company_name = 'Draft Pharma'),
      '{"brandName": "GLUCORA 10 mg", "category": "prescription_drug", "genericName": "Glucoflozin",
        "drugClass": "SGLT2 inhibitors", "strength": "10 mg"}'::jsonb
    )
  ),
  row('exists', true)::text,
  'the same brand and strength is reported as existing, not duplicated'
);

select is(
  (
    select outcome from public.admin_save_ai_product_draft(
      (select id from public.companies where company_name = 'Draft Pharma'),
      '{"brandName": "Glucora 10 mg", "category": "prescription_drug", "genericName": "Glucoflozin",
        "drugClass": "SGLT2 inhibitors", "strength": "25 mg", "dosageForm": "Film-coated tablet",
        "route": "Oral", "packSize": "28 tablets", "specialties": ["Endocrinology"]}'::jsonb
    )
  ),
  'created',
  'a different strength becomes its own product'
);

-- 3. Incomplete drafts are saved with a list of what is missing -----------------
select is(
  (
    select missing from public.admin_save_ai_product_draft(
      (select id from public.companies where company_name = 'Draft Pharma'),
      '{"brandName": "Glucora Duo 5/850 mg", "category": "prescription_drug",
        "genericName": "Glucoflozin and Metformin", "activeIngredients": ["Glucoflozin", "Metformin"],
        "drugClass": "Combination antidiabetics", "strength": "5 mg/850 mg",
        "dosageForm": "Film-coated tablet", "route": "Oral", "packSize": "",
        "clinical": {"approvedIndications": "Type 2 diabetes mellitus."},
        "specialties": ["Endocrinology"]}'::jsonb
    )
  ),
  array['pack size', 'clinical information (kept in the AI draft)'],
  'missing fields are listed and the draft is still saved'
);

select is(
  (
    select count(*) from public.product_markets m
    join public.product_translations t on t.product_id = m.product_id
    where t.brand_name = 'Glucora Duo 5/850 mg'
  ),
  0::bigint,
  'no market record is invented when the pack size is unknown'
);

select is(
  (
    select outcome from public.admin_save_ai_product_draft(
      (select id from public.companies where company_name = 'Draft Pharma'),
      '{"brandName": "Vitaglow D3 1000 IU", "category": "dietary_supplement", "genericName": "Cholecalciferol",
        "drugClass": "Vitamins", "strength": "1000 IU", "dosageForm": "Capsule", "route": "Oral",
        "packSize": "30 capsules", "specialties": ["Internal Medicine"]}'::jsonb
    )
  ),
  'created',
  'dietary supplements are saved without a generic drug'
);

select throws_ok(
  $$ select public.admin_save_ai_product_draft(
       (select id from public.companies where company_name = 'Draft Pharma'),
       '{"brandName": "Mystery 5 mg", "category": "prescription_drug", "genericName": "Mysterine"}'::jsonb) $$,
  '22023', null,
  'a draft without a drug class is refused'
);

select throws_ok(
  $$ select public.admin_save_ai_product_draft(gen_random_uuid(), '{"brandName": "X"}'::jsonb) $$,
  '23514', null,
  'an unknown company is refused'
);

-- 4. Nothing is published, and a saved complete draft can be published ---------
select is(
  (
    select count(*) from public.products p
    where p.company_id = (select id from public.companies where company_name = 'Draft Pharma')
      and p.status <> 'draft'
  ),
  0::bigint,
  'bulk saving never submits or publishes'
);

select public.submit_product_for_review(
  (select p.id from public.products p
   join public.product_markets m on m.product_id = p.id
   join public.product_translations t on t.product_id = p.id and t.locale = 'en'
   where t.brand_name = 'Glucora 10 mg' and m.strength = '10 mg')
);
select is(
  (
    select status::text from public.admin_publish_product(
      (select p.id from public.products p
       join public.product_markets m on m.product_id = p.id
       join public.product_translations t on t.product_id = p.id and t.locale = 'en'
       where t.brand_name = 'Glucora 10 mg' and m.strength = '10 mg')
    )
  ),
  'published',
  'a complete saved draft passes every publication check'
);
reset role;

-- 5. Only administrators --------------------------------------------------------
select set_config('request.jwt.claim.sub', '73000000-0000-4000-8000-000000000003', true);
set local role authenticated;
select is(
  (select count(*) from public.product_ai_drafts),
  0::bigint,
  'non-administrators cannot read AI drafts'
);
select throws_ok(
  $$ select public.admin_save_ai_product_draft(gen_random_uuid(), '{"brandName": "X"}'::jsonb) $$,
  '42501', null,
  'non-administrators cannot save AI drafts'
);
reset role;

select * from finish();
rollback;

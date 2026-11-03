begin;

select plan(12);

-- Fixtures --------------------------------------------------------------------
-- 74..01 administrator, 74..02 approved physician, 74..03 user without a role
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
    ('74000000-0000-4000-8000-000000000001'::uuid, 'search-admin@example.com'),
    ('74000000-0000-4000-8000-000000000002'::uuid, 'search-doctor@example.com'),
    ('74000000-0000-4000-8000-000000000003'::uuid, 'search-plain@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '74000000-0000-4000-8000-000000000001';
update public.profiles set role = 'healthcare_professional', status = 'active'
where auth_user_id = '74000000-0000-4000-8000-000000000002';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select '74000000-0000-4000-8000-000000000010', 'search_general', null, id, id
from public.profiles where auth_user_id = '74000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name)
values ('74000000-0000-4000-8000-000000000010', 'en', 'Search General');
update public.specialties set is_active = true
where id = '74000000-0000-4000-8000-000000000010';

insert into public.healthcare_professionals (
  profile_id, profession_type, specialty_id, license_number,
  verification_status, reviewed_by, reviewed_at
)
select doctor.id, 'physician', '74000000-0000-4000-8000-000000000010',
  'SRCH-0002', 'approved', admin_profile.id, now()
from public.profiles doctor
cross join public.profiles admin_profile
where doctor.auth_user_id = '74000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '74000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Administrator builds a small catalog: two published products, one draft.
select set_config('request.jwt.claim.sub', '74000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Searchwell Pharma', 'Searchwell Pharma LLC'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Searchwell Pharma'),
  format('{"brandName": %s, "brandNameAr": %s, "category": "prescription_drug",
    "genericName": %s, "drugClass": "Test antidiabetics",
    "strength": %s, "dosageForm": "Film-coated tablet", "route": "Oral", "packSize": "28 tablets",
    "clinical": {"approvedIndications": "Type 2 diabetes mellitus.", "usualAdultDose": "Once daily.",
      "contraindications": "Hypersensitivity.", "commonAdverseEffects": "Nausea.",
      "storageConditions": "Store below 30 °C."},
    "specialties": ["Search Endocrinology"]}',
    to_jsonb(brand), to_jsonb(brand_ar), to_jsonb(generic), to_jsonb(strength))::jsonb
)
from (values
  ('Searcora 10 mg', 'سيركورا ١٠ ملغ', 'Searchoflozin', '10 mg'),
  ('Metasearch 500 mg', 'ميتاسيرش ٥٠٠ ملغ', 'Metasearchin', '500 mg'),
  ('Draftora 5 mg', 'درافتورا ٥ ملغ', 'Draftoflozin', '5 mg')
) as v(brand, brand_ar, generic, strength);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
join public.product_translations t on t.product_id = p.id and t.locale = 'en'
where t.brand_name in ('Searcora 10 mg', 'Metasearch 500 mg');
reset role;

-- Doctor searches ----------------------------------------------------------------
select set_config('request.jwt.claim.sub', '74000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is(
  (select array_agg(brand_name_en order by brand_name_en) from public.search_catalog_products()),
  array['Metasearch 500 mg', 'Searcora 10 mg'],
  'an empty search lists every published product and never drafts'
);

select is(
  (select array_agg(brand_name_en) from public.search_catalog_products('searc')),
  array['Searcora 10 mg', 'Metasearch 500 mg'],
  'brand names that start with the query come before names that only contain it'
);

select is(
  (select row(brand_name_en, generic_name_en, strength, dosage_form, company_name)::text
   from public.search_catalog_products('SEARCHOFLOZIN')),
  row('Searcora 10 mg', 'Searchoflozin', '10 mg', 'Film-coated tablet', 'Searchwell Pharma')::text,
  'generic names match regardless of case, with strength, form and company returned'
);

select is(
  (select brand_name_ar from public.search_catalog_products('searcora')),
  null::text,
  'no Arabic brand name is stored (English-only catalog)'
);

select is(
  (select count(*) from public.search_catalog_products('searchwell')),
  2::bigint,
  'company names are searchable'
);

select is(
  (select count(*) from public.search_catalog_products('draftora')),
  0::bigint,
  'drafts are never found'
);

select is(
  (select row(brand_name_en, total_count)::text
   from public.search_catalog_products(null, null, null, 1, 1)),
  row('Searcora 10 mg', 2)::text,
  'results are paged and carry the total number of matches'
);

select is(
  (select count(*) from public.search_catalog_products(null, gen_random_uuid())),
  0::bigint,
  'the company filter is applied'
);

select is(
  (select count(*) from public.search_catalog_products('%')),
  0::bigint,
  'a query with no letters or digits matches nothing'
);

select throws_ok(
  $$ select * from public.search_catalog_products(repeat('a', 101)) $$,
  '22023', null,
  'very long search text is refused'
);
reset role;

-- Access ---------------------------------------------------------------------------
select set_config('request.jwt.claim.sub', '74000000-0000-4000-8000-000000000003', true);
set local role authenticated;
select throws_ok(
  $$ select * from public.search_catalog_products('searc') $$,
  '42501', null,
  'users who are not approved doctors cannot search'
);
reset role;

select ok(
  not has_function_privilege('anon', 'public.search_catalog_products(text, uuid, uuid, integer, integer)', 'execute'),
  'anonymous visitors cannot call the search'
);

select * from finish();
rollback;

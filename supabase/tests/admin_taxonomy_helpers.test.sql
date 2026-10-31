begin;

select plan(18);

-- Fixtures --------------------------------------------------------------------
-- 72..01 administrator, 72..02 approved physician, 72..03 user without a role
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
    ('72000000-0000-4000-8000-000000000001'::uuid, 'tax-admin@example.com'),
    ('72000000-0000-4000-8000-000000000002'::uuid, 'tax-doctor@example.com'),
    ('72000000-0000-4000-8000-000000000003'::uuid, 'tax-plain@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '72000000-0000-4000-8000-000000000001';
update public.profiles set role = 'healthcare_professional', status = 'active'
where auth_user_id = '72000000-0000-4000-8000-000000000002';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select '72000000-0000-4000-8000-000000000010', 'tax_general', null, id, id
from public.profiles where auth_user_id = '72000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name)
values ('72000000-0000-4000-8000-000000000010', 'en', 'Tax General');
update public.specialties set is_active = true
where id = '72000000-0000-4000-8000-000000000010';

insert into public.healthcare_professionals (
  profile_id, profession_type, specialty_id, license_number,
  verification_status, reviewed_by, reviewed_at
)
select doctor.id, 'physician', '72000000-0000-4000-8000-000000000010',
  'TAX-0002', 'approved', admin_profile.id, now()
from public.profiles doctor
cross join public.profiles admin_profile
where doctor.auth_user_id = '72000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '72000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Code derivation -------------------------------------------------------------
select is(private.taxonomy_code('SGLT2 Inhibitors'), 'sglt2_inhibitors',
  'codes are derived from English names');
select is(private.taxonomy_code('5-HT3 antagonists'), 'x_5_ht3_antagonists',
  'codes always start with a letter');
select throws_ok($$ select private.taxonomy_code('مضادات') $$, '22023', null,
  'a name without English letters or digits is rejected');

-- Administrator ---------------------------------------------------------------
select set_config('request.jwt.claim.sub', '72000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  (select cardinality(created) from public.admin_ensure_generic_drug('SGLT2 Inhibitors', 'Dapagliflozin')),
  3,
  'creates the missing class, ingredient and generic in one call'
);

select is(
  (
    select count(*) from public.generic_drug_ingredients gi
    join public.generic_drugs g on g.id = gi.generic_drug_id
    where g.code = 'dapagliflozin' and g.is_active
  ),
  1::bigint,
  'the new generic is active and linked to its ingredient'
);

select is(
  (select generic_drug_id from public.admin_ensure_generic_drug('sglt2 inhibitors', 'DAPAGLIFLOZIN')),
  (select id from public.generic_drugs where code = 'dapagliflozin'),
  'matching is case-insensitive and returns the existing generic'
);

select is(
  (select cardinality(created) from public.admin_ensure_generic_drug('SGLT2 Inhibitors', 'Dapagliflozin')),
  0,
  'calling again creates nothing'
);

select is(
  (
    select created from public.admin_ensure_generic_drug(
      'Combination Antidiabetics', 'Dapagliflozin and Metformin',
      array['Dapagliflozin', 'Metformin']
    )
  ),
  array[
    'drug class: Combination Antidiabetics',
    'active ingredient: Metformin',
    'generic drug: Dapagliflozin and Metformin'
  ],
  'combination generics reuse existing ingredients'
);

select is(
  (
    select count(*) from public.generic_drug_ingredients gi
    join public.generic_drugs g on g.id = gi.generic_drug_id
    where g.code = 'dapagliflozin_and_metformin'
  ),
  2::bigint,
  'the combination generic has both ingredients'
);

select is(
  (select generic_drug_id from public.admin_ensure_generic_drug('Vitamins')),
  null::uuid,
  'dietary supplements get a class and no generic'
);

select is(
  (select count(*) filter (where created) from public.admin_ensure_specialties(
    array['Endocrinology', 'endocrinology', ' Internal Medicine '])),
  2::bigint,
  'specialties are created once each'
);

select is(
  (select count(*) filter (where not created) from public.admin_ensure_specialties(
    array['Endocrinology', 'Internal Medicine'])),
  2::bigint,
  'existing specialties are returned, not duplicated'
);

-- Inactive records are not silently re-activated.
select public.admin_ensure_generic_drug('Retired Class');
reset role;
update public.drug_classes set is_active = false where code = 'retired_class';
set local role authenticated;
select throws_ok(
  $$ select public.admin_ensure_generic_drug('Retired Class', 'Newdrug') $$,
  '23514', null,
  'an inactive class stops the helper instead of being re-activated'
);

-- End-to-end: the exact flow the admin screen uses ----------------------------
select is(
  (
    select p.status::text
    from public.admin_create_company(
      '00000000-0000-4000-8000-000000000368', null, 'Tax Pharma', 'Tax Pharma LLC'
    ) as c
    cross join lateral public.create_product_draft(
      c.id, 'prescription_drug',
      (select id from public.generic_drugs where code = 'dapagliflozin'),
      (select id from public.drug_classes where code = 'sglt2_inhibitors'),
      'Testoxiga 10 mg'
    ) as p
  ),
  'draft',
  'admin creates a company and a product draft'
);

select public.upsert_product_market(
  (select product_id from public.product_translations where brand_name = 'Testoxiga 10 mg'),
  '10 mg', 'Film-coated tablet', 'Oral', '28 tablets',
  'marketed_in_iraq', 'not_recorded', null, null, null
);
select public.upsert_product_market_translation(
  (select product_id from public.product_translations where brand_name = 'Testoxiga 10 mg'),
  'en', 'Store below 30 °C.', 'Type 2 diabetes mellitus.', '10 mg once daily.',
  'Hypersensitivity to the active substance.', 'Genital mycotic infections.'
);
select public.set_product_specialties(
  (select product_id from public.product_translations where brand_name = 'Testoxiga 10 mg'),
  array(select specialty_id from public.admin_ensure_specialties(array['Endocrinology']))
);
select public.submit_product_for_review(
  (select product_id from public.product_translations where brand_name = 'Testoxiga 10 mg')
);
select is(
  (
    select status::text from public.admin_publish_product(
      (select product_id from public.product_translations where brand_name = 'Testoxiga 10 mg')
    )
  ),
  'published',
  'the product publishes without images, brochures or a registration number'
);
reset role;

-- Approved physician sees it --------------------------------------------------
select set_config('request.jwt.claim.sub', '72000000-0000-4000-8000-000000000002', true);
set local role authenticated;
select is(
  (select count(*) from public.product_translations where brand_name = 'Testoxiga 10 mg'),
  1::bigint,
  'an approved physician can read the published product'
);
reset role;

-- Not an administrator ---------------------------------------------------------
select set_config('request.jwt.claim.sub', '72000000-0000-4000-8000-000000000003', true);
set local role authenticated;
select throws_ok(
  $$ select public.admin_ensure_specialties(array['Oncology']) $$,
  '42501', null,
  'a user without a role cannot create taxonomy'
);
reset role;

set local role anon;
select throws_ok(
  $$ select public.admin_ensure_generic_drug('Anon Class') $$,
  '42501', null,
  'anonymous users cannot call the helper'
);
reset role;

select * from finish();
rollback;

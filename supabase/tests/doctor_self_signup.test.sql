begin;

select plan(15);

-- Fixtures --------------------------------------------------------------------
-- 77..01 administrator, 77..02 new user who signs up as a doctor, 77..03 plain user
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
    ('77000000-0000-4000-8000-000000000001'::uuid, 'selfsignup-admin@example.com'),
    ('77000000-0000-4000-8000-000000000002'::uuid, 'selfsignup-doctor@example.com'),
    ('77000000-0000-4000-8000-000000000003'::uuid, 'selfsignup-plain@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '77000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Administrator publishes three cardiology products and one dermatology product.
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Selfsign Pharma', 'Selfsign Pharma LLC'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Selfsign Pharma'),
  format('{"brandName": %s, "category": "prescription_drug",
    "genericName": %s, "drugClass": "Test selfsign class",
    "strength": "10 mg", "dosageForm": "Tablet", "route": "Oral", "packSize": "30 tablets",
    "clinical": {"approvedIndications": "Test indication.", "usualAdultDose": "Once daily.",
      "contraindications": "Hypersensitivity.", "commonAdverseEffects": "Headache.",
      "storageConditions": "Store below 30 °C."},
    "specialties": [%s]}',
    to_jsonb(brand), to_jsonb(generic), to_jsonb(specialty))::jsonb
)
from (values
  ('Cardself A', 'Cardselfin A', 'Selfsign Cardiology'),
  ('Cardself B', 'Cardselfin B', 'Selfsign Cardiology'),
  ('Cardself C', 'Cardselfin C', 'Selfsign Cardiology'),
  ('Dermself A', 'Dermselfin A', 'Selfsign Dermatology')
) as v(brand, generic, specialty);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
where p.company_id = (select id from public.companies where company_name = 'Selfsign Pharma');
reset role;

create temporary table selfsign_specialty as
select s.id, t.name
from public.specialties s
join public.specialty_translations t on t.specialty_id = s.id and t.locale = 'en'
where t.name in ('Selfsign Cardiology', 'Selfsign Dermatology');
grant select on selfsign_specialty to authenticated;

-- Access ------------------------------------------------------------------------
select ok(
  not has_function_privilege('anon', 'public.doctor_self_signup(text, text, uuid)', 'execute'),
  'anonymous visitors cannot call doctor sign-up'
);

-- New doctor signs up -------------------------------------------------------------
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select throws_ok(
  $$ select public.doctor_self_signup('Dr Test', '',
       (select id from selfsign_specialty where name = 'Selfsign Cardiology')) $$,
  '22023', 'Phone number is required.',
  'a phone number is required'
);

select throws_ok(
  $$ select public.doctor_self_signup('Dr Test', '+964 770 123 4567', null) $$,
  '23514', 'Choose your medical specialty.',
  'a specialty is required'
);

select lives_ok(
  $$ select public.doctor_self_signup('Dr Test', '+964 770 123 4567',
       (select id from selfsign_specialty where name = 'Selfsign Cardiology')) $$,
  'a doctor signs up with name, phone and specialty'
);

select is(
  (select verification_status::text from public.healthcare_professionals
   where profile_id = private.current_profile_id()),
  'approved',
  'the doctor is approved without an administrator'
);

select is(
  (select row(status::text, role::text, phone)::text from public.profiles
   where id = private.current_profile_id()),
  row('active', 'healthcare_professional', '+964 770 123 4567')::text,
  'the profile is active, has the doctor role and the phone number'
);

select ok(private.is_approved_doctor(), 'the new doctor can use the catalog');

select is(
  (select count(*) from public.search_catalog_products('self')),
  4::bigint,
  'the new doctor can search the catalog'
);

select is(
  (select count(*) from public.doctor_home_suggestions()),
  2::bigint,
  'the home page shows two suggestions by default'
);

select is(
  (select count(*) from public.doctor_home_suggestions(10)
   where specialty_name = 'Selfsign Cardiology' and brand_name_en like 'Cardself%'),
  3::bigint,
  'suggestions are only products of the doctor''s specialty'
);

select is(
  (select array_agg(product_id order by product_id) from public.doctor_home_suggestions()),
  (select array_agg(product_id order by product_id) from public.doctor_home_suggestions()),
  'the suggested pair is the same within a day'
);

select is(
  (select count(*) from public.doctor_home_suggestions(2, 7)
   where specialty_name = 'Selfsign Cardiology'),
  2::bigint,
  'Refresh (another seed) still gives two drugs of the doctor''s specialty'
);

select lives_ok(
  $$ select public.doctor_self_signup('Dr Test', '+964 770 123 4567',
       (select id from selfsign_specialty where name = 'Selfsign Dermatology')) $$,
  'the doctor can change the specialty'
);

select is(
  (select array_agg(brand_name_en) from public.doctor_home_suggestions()),
  array['Dermself A'],
  'suggestions follow the new specialty'
);
reset role;

-- A user who is not a doctor gets no suggestions ------------------------------------
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000003', true);
set local role authenticated;

select throws_ok(
  $$ select * from public.doctor_home_suggestions() $$,
  '42501', 'Only doctors can see suggestions.',
  'a user who is not a doctor cannot see suggestions'
);
reset role;

select * from finish();
rollback;

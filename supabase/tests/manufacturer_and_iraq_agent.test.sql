begin;

select plan(16);

-- Fixtures: 79..01 administrator, 79..02 approved physician
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
    ('79000000-0000-4000-8000-000000000001'::uuid, 'agency-admin@example.com'),
    ('79000000-0000-4000-8000-000000000002'::uuid, 'agency-doctor@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '79000000-0000-4000-8000-000000000001';
update public.profiles set role = 'healthcare_professional', status = 'active'
where auth_user_id = '79000000-0000-4000-8000-000000000002';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select '79000000-0000-4000-8000-000000000010', 'agency_general', null, id, id
from public.profiles where auth_user_id = '79000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name)
values ('79000000-0000-4000-8000-000000000010', 'en', 'Agency General');
update public.specialties set is_active = true
where id = '79000000-0000-4000-8000-000000000010';

insert into public.healthcare_professionals (
  profile_id, profession_type, specialty_id, license_number,
  verification_status, reviewed_by, reviewed_at
)
select doctor.id, 'physician', '79000000-0000-4000-8000-000000000010',
  'AGCY-0002', 'approved', admin_profile.id, now()
from public.profiles doctor
cross join public.profiles admin_profile
where doctor.auth_user_id = '79000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '79000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Administrator -----------------------------------------------------------------
select set_config('request.jwt.claim.sub', '79000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Maker Pharma', 'Maker Pharma AG'
);
select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Noor Scientific Office', 'Noor Scientific Office'
);

select is(
  (select company_type from public.companies where company_name = 'Maker Pharma'),
  'manufacturer',
  'new companies are manufacturers by default'
);

select is(
  (public.admin_set_company_profile(
    (select id from public.companies where company_name = 'Noor Scientific Office'), 'agent', ' iq '
  )).origin_country_code,
  'IQ',
  'admin marks a company as agent and saves its country code in upper case'
);

select public.admin_set_company_profile(
  (select id from public.companies where company_name = 'Maker Pharma'), 'manufacturer', 'CH'
);

select throws_ok(
  $$ select public.admin_set_company_profile(
       (select id from public.companies where company_name = 'Maker Pharma'), 'shop', null) $$,
  '22023', null, 'unknown company types are refused'
);

select throws_ok(
  $$ select public.admin_set_company_profile(
       (select id from public.companies where company_name = 'Maker Pharma'), 'manufacturer', 'Swiss') $$,
  '22023', null, 'country must be a 2-letter code'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Maker Pharma'),
  '{"brandName": "Makerol 10 mg", "category": "prescription_drug",
    "genericName": "Makerolol", "drugClass": "Test beta blockers",
    "strength": "10 mg", "dosageForm": "Tablet", "route": "Oral", "packSize": "30 tablets",
    "clinical": {"approvedIndications": "Hypertension.", "usualAdultDose": "Once daily.",
      "contraindications": "Asthma.", "commonAdverseEffects": "Fatigue.",
      "storageConditions": "Store below 30 °C."},
    "specialties": ["Agency Cardiology"]}'::jsonb,
  '[{"title": "Official label", "url": "https://example.com/makerol.pdf"}]'::jsonb
);

select throws_ok(
  $$ select public.admin_set_product_agent(
       (select product_id from public.product_translations where brand_name = 'Makerol 10 mg'),
       (select id from public.companies where company_name = 'Noor Scientific Office')) $$,
  '23514', 'This agent does not represent the product''s manufacturer.',
  'a product agent must represent the manufacturer'
);

select is(
  (public.admin_set_company_agency(
    (select id from public.companies where company_name = 'Maker Pharma'),
    (select id from public.companies where company_name = 'Noor Scientific Office')
  )).is_active,
  true,
  'admin links the office as Iraq agent of the manufacturer'
);

select is(
  (public.admin_set_product_agent(
    (select product_id from public.product_translations where brand_name = 'Makerol 10 mg'),
    (select id from public.companies where company_name = 'Noor Scientific Office')
  )).agent_company_id,
  (select id from public.companies where company_name = 'Noor Scientific Office'),
  'admin sets the Iraq agent on the product; manufacturer stays the company'
);

select throws_ok(
  $$ select public.admin_set_company_agency(
       (select id from public.companies where company_name = 'Noor Scientific Office'),
       (select id from public.companies where company_name = 'Maker Pharma')) $$,
  '23514', null, 'an agent-only company cannot be the represented manufacturer'
);

select throws_ok(
  $$ select public.admin_set_company_profile(
       (select id from public.companies where company_name = 'Noor Scientific Office'), 'manufacturer', 'IQ') $$,
  '23514', null, 'an office that is an agent cannot become manufacturer-only'
);

select throws_ok(
  $$ select public.admin_set_company_profile(
       (select id from public.companies where company_name = 'Maker Pharma'), 'agent', 'CH') $$,
  '23514', null, 'a manufacturer with products cannot become agent-only'
);

select throws_ok(
  $$ select public.admin_set_company_agency(
       (select id from public.companies where company_name = 'Maker Pharma'),
       (select id from public.companies where company_name = 'Noor Scientific Office'), false) $$,
  '23514', 'Remove this agent from the manufacturer''s products first.',
  'an agency in use cannot be switched off'
);

select throws_ok(
  $$ select public.admin_save_ai_product_draft(
       (select id from public.companies where company_name = 'Noor Scientific Office'),
       '{"brandName": "Officeol 5 mg", "category": "prescription_drug",
         "genericName": "Officeolol", "drugClass": "Test beta blockers",
         "strength": "5 mg", "dosageForm": "Tablet", "route": "Oral", "packSize": "30 tablets",
         "clinical": {"approvedIndications": "Hypertension.", "usualAdultDose": "Once daily.",
           "contraindications": "Asthma.", "commonAdverseEffects": "Fatigue.",
           "storageConditions": "Store below 30 °C."},
         "specialties": ["Agency Cardiology"]}'::jsonb,
       '[]'::jsonb) $$,
  '23514', null, 'products cannot be saved under an agent-only office'
);

select ok(
  exists (
    select 1 from public.audit_logs
    where action = 'product_agent_set'
      and target_id = (select product_id from public.product_translations where brand_name = 'Makerol 10 mg')
  ),
  'setting a product agent is audited'
);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
join public.product_translations t on t.product_id = p.id and t.locale = 'en'
where t.brand_name = 'Makerol 10 mg';
reset role;

-- Approved doctor -----------------------------------------------------------------
select set_config('request.jwt.claim.sub', '79000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is(
  (select c.company_name || ' / ' || a.company_name || ' / ' || c.origin_country_code
   from public.products p
   join public.product_translations t on t.product_id = p.id and t.brand_name = 'Makerol 10 mg'
   join public.companies c on c.id = p.company_id
   join public.companies a on a.id = p.agent_company_id),
  'Maker Pharma / Noor Scientific Office / CH',
  'doctors see the manufacturer, its country and the Iraq agent'
);

select is(
  (select count(*)::int from public.company_agencies
   where manufacturer_company_id = (select id from public.companies where company_name = 'Maker Pharma')),
  1,
  'doctors can read active agency links'
);

select throws_ok(
  $$ select public.admin_set_company_agency(
       (select id from public.companies where company_name = 'Maker Pharma'),
       (select id from public.companies where company_name = 'Noor Scientific Office')) $$,
  '42501', null, 'doctors cannot change agency links'
);

reset role;
select * from finish();
rollback;

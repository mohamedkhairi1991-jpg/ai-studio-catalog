begin;

select plan(14);

-- Fixtures: 7b..01 administrator, 7b..02 approved physician
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
    ('7b000000-0000-4000-8000-000000000001'::uuid, 'page-admin@example.com'),
    ('7b000000-0000-4000-8000-000000000002'::uuid, 'page-doctor@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '7b000000-0000-4000-8000-000000000001';
update public.profiles set role = 'healthcare_professional', status = 'active'
where auth_user_id = '7b000000-0000-4000-8000-000000000002';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select '7b000000-0000-4000-8000-000000000010', 'page_general', null, id, id
from public.profiles where auth_user_id = '7b000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name)
values ('7b000000-0000-4000-8000-000000000010', 'en', 'Page General');
update public.specialties set is_active = true
where id = '7b000000-0000-4000-8000-000000000010';

insert into public.healthcare_professionals (
  profile_id, profession_type, specialty_id, license_number,
  verification_status, reviewed_by, reviewed_at
)
select doctor.id, 'physician', '7b000000-0000-4000-8000-000000000010',
  'PAGE-0002', 'approved', admin_profile.id, now()
from public.profiles doctor
cross join public.profiles admin_profile
where doctor.auth_user_id = '7b000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '7b000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Administrator -----------------------------------------------------------------
select set_config('request.jwt.claim.sub', '7b000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Pagemaker Pharma', 'Pagemaker Pharma AG'
);
select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Rafidain Scientific Office', 'Rafidain Scientific Office'
);
select public.admin_set_company_profile(
  (select id from public.companies where company_name = 'Rafidain Scientific Office'), 'agent', 'IQ'
);
select public.admin_set_company_profile(
  (select id from public.companies where company_name = 'Pagemaker Pharma'), 'manufacturer', 'CH'
);
select public.admin_set_company_agency(
  (select id from public.companies where company_name = 'Pagemaker Pharma'),
  (select id from public.companies where company_name = 'Rafidain Scientific Office')
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Pagemaker Pharma'),
  format('{"brandName": %s, "category": "prescription_drug",
    "genericName": %s, "drugClass": %s,
    "strength": "10 mg", "dosageForm": "Tablet", "route": "Oral", "packSize": "30 tablets",
    "clinical": {"approvedIndications": "Test.", "usualAdultDose": "Test.",
      "contraindications": "Test.", "commonAdverseEffects": "Test.",
      "storageConditions": "Store below 30 °C."},
    "specialties": ["Page Medicine"]}',
    to_jsonb(brand), to_jsonb(generic), to_jsonb(class))::jsonb,
  '[{"title": "Official label", "url": "https://example.com/label.pdf"}]'::jsonb
)
from (values
  ('Pagestatin 10 mg', 'Pagevastatin', 'HMG-CoA reductase inhibitor (statin)'),
  ('Pagecillin 10 mg', 'Pageoxicillin', 'Penicillin antibacterial')
) as v(brand, generic, class);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
where p.company_id = (select id from public.companies where company_name = 'Pagemaker Pharma');

select public.admin_set_product_agent(
  (select product_id from public.product_translations where brand_name = 'Pagestatin 10 mg'),
  (select id from public.companies where company_name = 'Rafidain Scientific Office')
);

select is(
  (public.admin_update_company_page(
    (select id from public.companies where company_name = 'Pagemaker Pharma'),
    ' Medicines made with care ', 1950,
    (select id::text from public.companies where company_name = 'Pagemaker Pharma') || '/logo.png',
    null
  )).tagline,
  'Medicines made with care',
  'admin saves the tagline, founded year and logo'
);

select throws_ok(
  $$ select public.admin_update_company_page(
       (select id from public.companies where company_name = 'Pagemaker Pharma'),
       null, null, 'someone-else/logo.png', null) $$,
  '22023', null, 'images must belong to the company'
);

select is(
  (public.admin_add_company_media(
    (select id from public.companies where company_name = 'Pagemaker Pharma'),
    (select id::text from public.companies where company_name = 'Pagemaker Pharma') || '/factory.jpg',
    'Our factory', 1
  )).caption,
  'Our factory',
  'admin adds a gallery image'
);

select public.admin_add_company_media(
  (select id from public.companies where company_name = 'Pagemaker Pharma'),
  (select id::text from public.companies where company_name = 'Pagemaker Pharma') || '/old.jpg',
  'Old photo', 2
);

select is(
  (public.admin_remove_company_media(
    (select id from public.company_media where caption = 'Old photo')
  )).is_active,
  false,
  'admin removes a gallery image'
);

reset role;
insert into public.sponsored_ads (sponsor_name, title, body, image_url, company_id, is_active)
values ('Pagemaker Pharma', 'Pagemaker banner', 'Banner text', 'https://example.com/banner.png',
        (select id from public.companies where company_name = 'Pagemaker Pharma'), true);

-- Approved doctor -----------------------------------------------------------------
select set_config('request.jwt.claim.sub', '7b000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is(
  (public.get_company_page((select id from public.companies where company_name = 'Pagemaker Pharma'))
     -> 'company' ->> 'tagline'),
  'Medicines made with care',
  'doctors see company details'
);

select is(
  jsonb_array_length(public.get_company_page((select id from public.companies where company_name = 'Pagemaker Pharma')) -> 'products'),
  2,
  'the page lists the company''s published products'
);

select is(
  (public.get_company_page((select id from public.companies where company_name = 'Pagemaker Pharma'))
     -> 'agents' -> 0 ->> 'name'),
  'Rafidain Scientific Office',
  'the page shows the Iraq agent'
);

select is(
  jsonb_array_length(public.get_company_page((select id from public.companies where company_name = 'Pagemaker Pharma')) -> 'gallery'),
  1,
  'removed gallery images are hidden'
);

select is(
  (public.get_company_page((select id from public.companies where company_name = 'Pagemaker Pharma'))
     -> 'feature' ->> 'title'),
  'Pagemaker banner',
  'the company''s active banner fills the image space'
);

select is(
  (select (p ->> 'via_agent') || ' / ' || (p ->> 'manufacturer_name')
   from jsonb_array_elements(
     public.get_company_page((select id from public.companies where company_name = 'Rafidain Scientific Office')) -> 'products'
   ) as p),
  'true / Pagemaker Pharma',
  'an agent office page lists the products it brings, with the manufacturer'
);

select is(
  (public.get_company_page((select id from public.companies where company_name = 'Rafidain Scientific Office'))
     -> 'represents' -> 0 ->> 'name'),
  'Pagemaker Pharma',
  'an agent office page shows which manufacturers it represents'
);

select is(
  (select product_count::int from public.get_company_directory() where company_name = 'Pagemaker Pharma'),
  2,
  'the companies list shows each company with its product count'
);

select throws_ok(
  $$ select public.admin_update_company_page(
       (select id from public.companies where company_name = 'Pagemaker Pharma'), 'x', null, null, null) $$,
  '42501', null, 'doctors cannot edit company pages'
);

reset role;

-- Signed-in user without doctor approval ------------------------------------------
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-0000000000ff', true);
set local role authenticated;

select throws_ok(
  $$ select public.get_company_page((select id from public.companies limit 1)) $$,
  '42501', null, 'unapproved users cannot open company pages'
);

reset role;
select * from finish();
rollback;

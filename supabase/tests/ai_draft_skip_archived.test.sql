begin;

select plan(3);

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
values (
  '75000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'skip-admin@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
);
update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '75000000-0000-4000-8000-000000000001';

set constraints all immediate;

select set_config('request.jwt.claim.sub', '75000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Archive Pharma', 'Archive Pharma LLC'
);

select is(
  (select outcome from public.admin_save_ai_product_draft(
    (select id from public.companies where company_name = 'Archive Pharma'),
    '{"brandName": "Removora 5 mg", "category": "prescription_drug", "genericName": "Removorin",
      "drugClass": "Test class", "strength": "5 mg", "dosageForm": "Tablet", "route": "Oral",
      "packSize": "30 tablets"}'::jsonb)),
  'created',
  'the first save creates the draft'
);

select public.admin_archive_product(
  (select product_id from public.product_translations where brand_name = 'Removora 5 mg'),
  'Duplicate'
);

select is(
  (select outcome from public.admin_save_ai_product_draft(
    (select id from public.companies where company_name = 'Archive Pharma'),
    '{"brandName": "removora 5 mg", "category": "prescription_drug", "genericName": "Removorin",
      "drugClass": "Test class", "strength": "5 mg"}'::jsonb)),
  'exists',
  'an archived product is not created again'
);

select is(
  (select count(*) from public.products p
   join public.product_translations t on t.product_id = p.id and t.locale = 'en'
   where lower(t.brand_name) = 'removora 5 mg'),
  1::bigint,
  'only the archived product exists'
);
reset role;

select * from finish();
rollback;

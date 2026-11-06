begin;

select plan(7);

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
values
(
  '76000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'unarchive-admin@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
),
(
  '76000000-0000-4000-8000-000000000002', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'unarchive-user@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
);
update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '76000000-0000-4000-8000-000000000001';

set constraints all immediate;

select set_config('request.jwt.claim.sub', '76000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Unarchive Pharma', 'Unarchive Pharma LLC'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Unarchive Pharma'),
  '{"brandName": "Bringback 10 mg", "category": "prescription_drug", "genericName": "Bringbackin",
    "drugClass": "Test class", "strength": "10 mg", "dosageForm": "Tablet", "route": "Oral",
    "packSize": "30 tablets"}'::jsonb
);

select public.admin_archive_product(
  (select product_id from public.product_translations where brand_name = 'Bringback 10 mg'),
  'Archived by mistake'
);

select is(
  (public.admin_unarchive_product(
    (select product_id from public.product_translations where brand_name = 'Bringback 10 mg'),
    'Publish again'
  )).status::text,
  'draft',
  'an administrator brings an archived product back as a draft'
);

select is(
  (select archived_at is null and archived_by is null and archive_reason is null
   from public.products
   where id = (select product_id from public.product_translations where brand_name = 'Bringback 10 mg')),
  true,
  'the archive details are cleared'
);

select throws_ok(
  $$ select public.admin_unarchive_product(
       (select product_id from public.product_translations where brand_name = 'Bringback 10 mg'), null) $$,
  '23514',
  'Only archived products can be restored.',
  'a product that is not archived cannot be restored'
);

select is(
  current_setting('pharmaty.admin_unarchive', true),
  'off',
  'the restore permission is switched off after the function'
);

reset role;

select is(
  (select count(*) from public.audit_logs
   where action = 'product_unarchived'
     and target_id = (select product_id from public.product_translations where brand_name = 'Bringback 10 mg')),
  1::bigint,
  'restoring writes one audit entry'
);

select public.admin_archive_product(
  (select product_id from public.product_translations where brand_name = 'Bringback 10 mg'),
  'Archived again'
);

select set_config('request.jwt.claim.sub', '76000000-0000-4000-8000-000000000002', true);

select throws_ok(
  $$ select set_config('pharmaty.admin_unarchive', 'on', true);
     update public.products set status = 'draft'
     where id = (select product_id from public.product_translations where brand_name = 'Bringback 10 mg') $$,
  '23514',
  null,
  'without administrator access the flag alone cannot move an archived product back'
);

set local role authenticated;

select throws_ok(
  $$ select public.admin_unarchive_product('00000000-0000-4000-8000-000000000001', null) $$,
  '42501',
  'Administrator access is required.',
  'non-administrators cannot restore products'
);

reset role;

select * from finish();
rollback;
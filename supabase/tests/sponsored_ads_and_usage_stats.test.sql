begin;

select plan(16);

-- Fixtures: 78..01 administrator, 78..02 cardiology doctor, 78..03 plain user
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
from (values
  ('78000000-0000-4000-8000-000000000001'::uuid, 'ads-admin@example.com'),
  ('78000000-0000-4000-8000-000000000002'::uuid, 'ads-doctor@example.com'),
  ('78000000-0000-4000-8000-000000000003'::uuid, 'ads-plain@example.com')
) as f(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '78000000-0000-4000-8000-000000000001';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select s.id, s.code, null, p.id, p.id
from (values
  ('78000000-0000-4000-8000-000000000010'::uuid, 'ads_cardio'),
  ('78000000-0000-4000-8000-000000000011'::uuid, 'ads_derm')
) as s(id, code)
cross join public.profiles p
where p.auth_user_id = '78000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name) values
  ('78000000-0000-4000-8000-000000000010', 'en', 'Ads Cardiology'),
  ('78000000-0000-4000-8000-000000000011', 'en', 'Ads Dermatology');
update public.specialties set is_active = true
where id in ('78000000-0000-4000-8000-000000000010', '78000000-0000-4000-8000-000000000011');

set constraints all immediate;

-- Doctor signs up (cardiology).
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000002', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;
select public.doctor_self_signup('Dr Ads', '+964 770 000 0000', '78000000-0000-4000-8000-000000000010');
reset role;

-- Administrator creates ads.
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000001', true);
set local role authenticated;

select lives_ok(
  $$ select public.admin_save_sponsored_ad(null, 'Heartco', 'Heart ad', 'For cardiologists',
       null, 'https://example.com/heart', null, '78000000-0000-4000-8000-000000000010',
       null, null, true, 10) $$,
  'an administrator creates a specialty ad'
);
select public.admin_save_sponsored_ad(null, 'Skinco', 'Skin ad', null, null, null, null,
  '78000000-0000-4000-8000-000000000011', null, null, true, 10);
select public.admin_save_sponsored_ad(null, 'Oldco', 'Expired ad', null, null, null, null,
  null, current_date - 10, current_date - 1, true, 50);
select public.admin_save_sponsored_ad(null, 'Offco', 'Inactive ad', null, null, null, null,
  null, null, null, false, 90);

select throws_ok(
  $$ select public.admin_save_sponsored_ad(null, 'Bad', 'Bad link', null, null, 'http://insecure.example', null, null, null, null, true, 0) $$,
  '23514', null,
  'ad links must use https'
);

select is((select count(*) from public.sponsored_ads where sponsor_name in ('Heartco','Skinco','Oldco','Offco')),
  4::bigint, 'administrators can read all ads');
reset role;

-- Doctor sees the right ad.
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is((select title from public.doctor_sponsored_ad()), 'Heart ad',
  'the doctor gets an active, in-date ad for their specialty');
select is((select count(*) from public.sponsored_ads), 0::bigint,
  'doctors cannot read the ads table directly');

select lives_ok(
  $$ select public.record_sponsored_ad_event((select ad_id from public.doctor_sponsored_ad()), 'view') $$,
  'the doctor records an ad view');
select public.record_sponsored_ad_event((select ad_id from public.doctor_sponsored_ad()), 'click');
select throws_ok(
  $$ select public.record_sponsored_ad_event((select ad_id from public.doctor_sponsored_ad()), 'like') $$,
  '22023', 'The event must be view or click.', 'only view and click events are accepted');

select public.record_catalog_search('  LIPITOR ', 3);
select public.record_catalog_search('lipitor', 2);
select public.record_catalog_search('zzzz', 0);
select public.record_catalog_search('a', 0);

select throws_ok($$ select * from public.admin_top_searches() $$, '42501', null,
  'doctors cannot read search statistics');
reset role;

-- Plain user cannot record anything.
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000003', true);
set local role authenticated;
select throws_ok($$ select public.record_catalog_search('lipitor', 1) $$, '42501', null,
  'a user who is not a doctor cannot record searches');
select throws_ok($$ select * from public.doctor_sponsored_ad() $$, '42501', null,
  'a user who is not a doctor gets no sponsored content');
reset role;

-- Administrator reads statistics.
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000001', true);
set local role authenticated;

select is((select row(searches, zero_result_searches)::text from public.admin_top_searches() where query = 'lipitor'),
  row(2, 0)::text, 'searches are counted per normalised query');
select is((select zero_result_searches from public.admin_top_searches() where query = 'zzzz'),
  1::bigint, 'searches with no result are counted');
select is((select count(*) from public.admin_top_searches() where query = 'a'),
  0::bigint, 'one-letter searches are ignored');
select is((select row(views, clicks)::text from public.admin_sponsored_ad_stats() where title = 'Heart ad'),
  row(1, 1)::text, 'ad views and clicks are counted');
reset role;

select ok(not exists (
  select 1 from information_schema.columns
  where table_schema = 'public'
    and table_name in ('catalog_search_daily_stats', 'product_view_daily_stats', 'sponsored_ad_daily_stats')
    and column_name in ('profile_id', 'user_id', 'auth_user_id', 'email')
), 'usage statistics store no personal identifiers');

select ok(not has_function_privilege('anon', 'public.record_catalog_search(text, integer)', 'execute'),
  'anonymous visitors cannot record statistics');

select * from finish();
rollback;

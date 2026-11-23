begin;

select plan(4);

select is(
  (select column_default from information_schema.columns
   where table_schema = 'public' and table_name = 'sponsored_ads' and column_name = 'cta'),
  '''learn_more''::text',
  'ads get the "Learn more" button by default'
);
select ok(
  not has_function_privilege('anon', 'public.doctor_sponsored_ad_v2(integer)', 'execute'),
  'visitors who are not signed in cannot load ads'
);

select set_config('request.jwt.claim.sub', '7f000000-0000-4000-8000-0000000000fd', true);
select set_config('request.jwt.claims', '{"sub":"7f000000-0000-4000-8000-0000000000fd","role":"authenticated"}', true);
set local role authenticated;
select throws_ok(
  $$ select public.admin_set_sponsored_ad_cta('7f000000-0000-4000-8000-0000000000fd', 'call') $$,
  '42501',
  'Administrator access is required.',
  'only the admin sets the ad button'
);
select throws_ok(
  $$ select public.doctor_sponsored_ad_v2(0) $$,
  '42501',
  'Only doctors can see sponsored content.',
  'accounts that are not approved doctors cannot load ads'
);
reset role;

select * from finish();
rollback;

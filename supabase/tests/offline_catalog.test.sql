begin;

select plan(6);

select ok(
  not has_function_privilege('anon', 'public.get_offline_catalog_changes(timestamptz)', 'execute'),
  'visitors who are not signed in cannot download the catalog'
);
select ok(
  has_function_privilege('authenticated', 'public.get_offline_catalog_changes(timestamptz)', 'execute'),
  'signed-in users can call the offline download (the function checks they are approved doctors)'
);
select ok(
  not has_function_privilege('anon', 'public.get_offline_catalog_version()', 'execute'),
  'visitors who are not signed in cannot read the catalog version'
);

-- A signed-in account that is not an approved doctor is refused.
select set_config('request.jwt.claim.sub', '7f000000-0000-4000-8000-0000000000ff', true);
select set_config('request.jwt.claims', '{"sub":"7f000000-0000-4000-8000-0000000000ff","role":"authenticated"}', true);
set local role authenticated;

select throws_ok(
  $$ select public.get_offline_catalog_changes(null) $$,
  '42501',
  'Only approved doctors can download the catalog.',
  'accounts that are not approved doctors cannot download the catalog'
);
select throws_ok(
  $$ select public.get_offline_catalog_version() $$,
  '42501',
  'Only approved doctors can download the catalog.',
  'accounts that are not approved doctors cannot read the catalog version'
);
reset role;

-- No registration numbers in the offline download.
select ok(
  pg_get_functiondef('public.get_offline_catalog_changes(timestamptz)'::regprocedure) !~* 'registration_number',
  'the offline download never includes registration numbers'
);

select * from finish();
rollback;

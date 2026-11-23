begin;

select plan(10);

select ok(
  not has_function_privilege('anon', 'public.get_noble_feed(uuid, integer, integer)', 'execute'),
  'visitors who are not signed in cannot read noble posts'
);
select ok(
  not has_function_privilege('anon', 'public.noble_save_post(uuid, text, text, text, boolean, uuid[], text[])', 'execute'),
  'visitors who are not signed in cannot post'
);
select ok(
  not has_table_privilege('authenticated', 'public.noble_posts', 'select'),
  'noble posts are read only through the functions'
);
select ok(
  not has_function_privilege('anon', 'public.record_noble_post_views(uuid[])', 'execute'),
  'visitors who are not signed in cannot record post views'
);
select ok(
  not has_table_privilege('authenticated', 'public.noble_post_views', 'select'),
  'view counts are read only through the functions (author and admins)'
);
select is(
  (select public from storage.buckets where id = 'noble-posts'),
  true,
  'noble post pictures are in a public bucket'
);

-- A signed-in account that is not an approved doctor or a noble doctor.
select set_config('request.jwt.claim.sub', '7f000000-0000-4000-8000-0000000000fe', true);
select set_config('request.jwt.claims', '{"sub":"7f000000-0000-4000-8000-0000000000fe","role":"authenticated"}', true);
set local role authenticated;

select throws_ok(
  $$ select public.get_noble_doctors(null) $$,
  '42501',
  'Only approved doctors can read noble doctors'' pages.',
  'accounts that are not approved doctors cannot read noble doctors'
);
select throws_ok(
  $$ select public.noble_save_post(null, null, 'hello', 'tip', false, '{}', '{}') $$,
  '42501',
  'Only noble doctors can post.',
  'only noble doctors can post'
);
select throws_ok(
  $$ select public.admin_set_noble_doctor('7f000000-0000-4000-8000-0000000000fe', '7f000000-0000-4000-8000-0000000000fe') $$,
  '42501',
  'Administrator access is required.',
  'only the admin chooses noble doctors'
);
select is(
  (public.get_my_noble_status() ->> 'isNoble'),
  'false',
  'anyone signed in can ask whether they are a noble doctor'
);
reset role;

select * from finish();
rollback;

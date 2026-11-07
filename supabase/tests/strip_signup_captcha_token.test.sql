begin;
select plan(3);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, raw_app_meta_data, created_at, updated_at)
values (
  '00000000-0000-4000-8000-00000000c401',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'captcha-strip@example.test',
  jsonb_build_object('full_name', 'Dr. Strip', 'captcha_token', 'one-time-token'),
  '{"provider":"email","providers":["email"]}'::jsonb,
  now(), now()
);

select ok(
  not ((select raw_user_meta_data from auth.users where id = '00000000-0000-4000-8000-00000000c401') ? 'captcha_token'),
  'captcha token is removed on sign-up'
);
select is(
  (select raw_user_meta_data->>'full_name' from auth.users where id = '00000000-0000-4000-8000-00000000c401'),
  'Dr. Strip',
  'other sign-up metadata is kept'
);

update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"captcha_token":"again"}'::jsonb
where id = '00000000-0000-4000-8000-00000000c401';

select ok(
  not ((select raw_user_meta_data from auth.users where id = '00000000-0000-4000-8000-00000000c401') ? 'captcha_token'),
  'captcha token is removed on metadata update'
);

select * from finish();
rollback;

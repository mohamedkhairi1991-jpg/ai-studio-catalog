begin;

select plan(11);

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
values
(
  '77000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'notify-admin@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
),
(
  '77000000-0000-4000-8000-000000000002', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'notify-doctor-a@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
),
(
  '77000000-0000-4000-8000-000000000003', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'notify-doctor-b@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
);
update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '77000000-0000-4000-8000-000000000001';
update public.profiles set status = 'active'
where auth_user_id in ('77000000-0000-4000-8000-000000000002', '77000000-0000-4000-8000-000000000003');

set constraints all immediate;

-- Administrator sends one invitation to doctor A
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  public.admin_send_notification(
    array[(select id from public.profiles where auth_user_id = '77000000-0000-4000-8000-000000000002')],
    'invitation', 'Webinar invitation', 'Join our cardiology webinar on Monday.',
    'https://example.com/webinar'
  ),
  1,
  'an administrator sends a notification to one user'
);

select throws_ok(
  $$ select public.admin_send_notification(array[]::uuid[], 'message', 'Hi', 'Body') $$,
  '22023',
  'Choose at least one user.',
  'at least one recipient is required'
);

select throws_ok(
  $$ select public.admin_send_notification(
       array[(select id from public.profiles where auth_user_id = '77000000-0000-4000-8000-000000000002')],
       'message', 'Hi', 'Body', 'http://not-secure.example.com') $$,
  '23514',
  null,
  'links must use https'
);

reset role;

select is(
  (select count(*) from public.audit_logs where action = 'notification_sent'),
  1::bigint,
  'sending writes one audit entry'
);

-- Doctor A sees only their own notification and marks it read
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is(
  (select count(*) from public.user_notifications where read_at is null),
  1::bigint,
  'the recipient sees their unread notification'
);

select throws_ok(
  $$ update public.user_notifications set read_at = now() $$,
  '42501',
  null,
  'users cannot update notifications directly'
);

select is(public.mark_my_notifications_read(null), 1, 'the recipient marks it read');

select is(
  (select count(*) from public.user_notifications where read_at is null),
  0::bigint,
  'no unread notifications remain'
);

select throws_ok(
  $$ select public.admin_send_notification(
       array[(select id from public.profiles where auth_user_id = '77000000-0000-4000-8000-000000000003')],
       'message', 'Hi', 'Body') $$,
  '42501',
  'Administrator access is required.',
  'doctors cannot send notifications'
);

select public.record_app_open();

reset role;

-- Doctor B cannot see doctor A's notification
select set_config('request.jwt.claim.sub', '77000000-0000-4000-8000-000000000003', true);
set local role authenticated;

select is(
  (select count(*) from public.user_notifications),
  0::bigint,
  'other users cannot see the notification'
);

reset role;

select isnt(
  (select last_seen_at from public.profiles where auth_user_id = '77000000-0000-4000-8000-000000000002'),
  null,
  'record_app_open sets last_seen_at'
);

select * from finish();
rollback;
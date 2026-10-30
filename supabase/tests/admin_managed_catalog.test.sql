begin;

select plan(13);

-- Fixtures --------------------------------------------------------------------
-- 70..01 administrator
-- 70..02 company administrator of a self-managed company
-- 70..03 signed-in user with no platform role
-- 70..04 applicant used only for the self-managed regression check
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
    ('70000000-0000-4000-8000-000000000001'::uuid, 'amc-admin@example.com'),
    ('70000000-0000-4000-8000-000000000002'::uuid, 'amc-manager@example.com'),
    ('70000000-0000-4000-8000-000000000003'::uuid, 'amc-plain@example.com'),
    ('70000000-0000-4000-8000-000000000004'::uuid, 'amc-applicant@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '70000000-0000-4000-8000-000000000001';
update public.profiles set role = 'company_user', status = 'active'
where auth_user_id = '70000000-0000-4000-8000-000000000002';

-- Self-managed company with an active company administrator.
insert into public.companies (
  id, applicant_profile_id, country_id, company_name, legal_name,
  status, verified_by, verified_at
)
select
  '70000000-0000-4000-8000-000000000010', member.id,
  '00000000-0000-4000-8000-000000000368',
  'Self Managed Co', 'Self Managed Co LLC',
  'verified', admin_profile.id, now()
from public.profiles member
cross join public.profiles admin_profile
where member.auth_user_id = '70000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '70000000-0000-4000-8000-000000000001';

insert into public.company_users (company_id, profile_id, company_role, created_by)
select
  '70000000-0000-4000-8000-000000000010', member.id,
  'company_admin', admin_profile.id
from public.profiles member
cross join public.profiles admin_profile
where member.auth_user_id = '70000000-0000-4000-8000-000000000002'
  and admin_profile.auth_user_id = '70000000-0000-4000-8000-000000000001';

insert into public.drug_classes (id, code, created_by, updated_by)
select '70000000-0000-4000-8000-000000000020', 'amc_class', id, id
from public.profiles
where auth_user_id = '70000000-0000-4000-8000-000000000001';
insert into public.drug_class_translations (drug_class_id, locale, name)
values ('70000000-0000-4000-8000-000000000020', 'en', 'AMC Class');
update public.drug_classes set is_active = true
where id = '70000000-0000-4000-8000-000000000020';

-- Fire deferred constraint triggers immediately from here on, so the
-- "verified company keeps an active company administrator" rule is checked
-- inside this test rather than at a commit that never happens.
set constraints all immediate;

-- Administrator ---------------------------------------------------------------
select set_config('request.jwt.claim.sub', '70000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  (
    select status::text
    from public.admin_create_company(
      '00000000-0000-4000-8000-000000000368', null,
      'Admin Managed Co', 'Admin Managed Co LLC',
      '', null, 'Info@AdminManaged.example', null
    )
  ),
  'verified',
  'administrator creates a verified company with no company accounts'
);

select is(
  (select applicant_profile_id from public.companies where company_name = 'Admin Managed Co'),
  null::uuid,
  'admin-managed company has no applicant'
);

select is(
  (
    select row(description, contact_email)::text
    from public.companies where company_name = 'Admin Managed Co'
  ),
  row(null::text, 'info@adminmanaged.example'::text)::text,
  'blank optional fields become null and email is normalised'
);

select is(
  (
    select company_name
    from public.admin_update_company(
      (select id from public.companies where company_name = 'Admin Managed Co'),
      '00000000-0000-4000-8000-000000000368', null,
      'Admin Managed Company', 'Admin Managed Co LLC'
    )
  ),
  'Admin Managed Company',
  'administrator updates an admin-managed company'
);

select is(
  (
    select status::text
    from public.create_product_draft(
      (select id from public.companies where company_name = 'Admin Managed Company'),
      'dietary_supplement', null,
      '70000000-0000-4000-8000-000000000020', 'Admin Brand'
    )
  ),
  'draft',
  'administrator creates a product draft for an admin-managed company'
);

select ok(
  private.can_manage_official_product_content(
    (select product_id from public.product_translations where brand_name = 'Admin Brand')
  ),
  'administrator may edit a draft'
);

select lives_ok(
  $$
    select public.upsert_product_translation(
      (select product_id from public.product_translations where brand_name = 'Admin Brand'),
      'ar', 'علامة الإدارة'
    )
  $$,
  'administrator can use the existing draft content RPCs'
);
reset role;

-- A submitted product is no longer editable, even by an administrator.
update public.products
set status = 'submitted',
    submitted_by = created_by,
    submitted_at = now()
where id = (select product_id from public.product_translations where brand_name = 'Admin Brand');

select set_config('request.jwt.claim.sub', '70000000-0000-4000-8000-000000000001', true);
set local role authenticated;
select is(
  private.can_manage_official_product_content(
    (select product_id from public.product_translations where brand_name = 'Admin Brand')
  ),
  false,
  'administrator cannot edit submitted content'
);
reset role;

-- Company product manager of another company ----------------------------------
select set_config('request.jwt.claim.sub', '70000000-0000-4000-8000-000000000002', true);
set local role authenticated;
select throws_ok(
  $$
    select public.create_product_draft(
      (select id from public.companies where company_name = 'Admin Managed Company'),
      'dietary_supplement', null,
      '70000000-0000-4000-8000-000000000020', 'Intruder Brand'
    )
  $$,
  '42501', null,
  'a company user cannot create drafts for an admin-managed company'
);
reset role;

-- Signed-in user without a role -----------------------------------------------
select set_config('request.jwt.claim.sub', '70000000-0000-4000-8000-000000000003', true);
set local role authenticated;
select throws_ok(
  $$
    select public.admin_create_company(
      '00000000-0000-4000-8000-000000000368', null, 'Rogue Co', 'Rogue Co LLC'
    )
  $$,
  '42501', null,
  'a non-administrator cannot create companies'
);
select throws_ok(
  $$
    select public.admin_update_company(
      '70000000-0000-4000-8000-000000000010',
      '00000000-0000-4000-8000-000000000368', null, 'Renamed', 'Renamed LLC'
    )
  $$,
  '42501', null,
  'a non-administrator cannot update companies'
);
reset role;

-- Anonymous -------------------------------------------------------------------
set local role anon;
select throws_ok(
  $$
    select public.admin_create_company(
      '00000000-0000-4000-8000-000000000368', null, 'Anon Co', 'Anon Co LLC'
    )
  $$,
  '42501', null,
  'anonymous users cannot call admin_create_company'
);
reset role;

-- Regression: self-managed companies still need a company administrator ------
select throws_ok(
  $$
    insert into public.companies (
      applicant_profile_id, country_id, company_name, legal_name,
      status, verified_by, verified_at
    )
    select
      applicant.id, '00000000-0000-4000-8000-000000000368',
      'Orphan Co', 'Orphan Co LLC',
      'verified', admin_profile.id, now()
    from public.profiles applicant
    cross join public.profiles admin_profile
    where applicant.auth_user_id = '70000000-0000-4000-8000-000000000004'
      and admin_profile.auth_user_id = '70000000-0000-4000-8000-000000000001'
  $$,
  '23514', null,
  'a verified self-managed company without a company administrator is rejected'
);

select * from finish();
rollback;

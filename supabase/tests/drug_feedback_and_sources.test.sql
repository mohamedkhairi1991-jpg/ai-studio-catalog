begin;

select plan(16);

-- Fixtures --------------------------------------------------------------------
-- 78..01 administrator, 78..02 approved physician, 78..03 second physician,
-- 78..04 active user without a doctor role
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
    ('78000000-0000-4000-8000-000000000001'::uuid, 'feedback-admin@example.com'),
    ('78000000-0000-4000-8000-000000000002'::uuid, 'feedback-doctor-a@example.com'),
    ('78000000-0000-4000-8000-000000000003'::uuid, 'feedback-doctor-b@example.com'),
    ('78000000-0000-4000-8000-000000000004'::uuid, 'feedback-plain@example.com')
) as fixture(user_id, email);

update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '78000000-0000-4000-8000-000000000001';
update public.profiles set role = 'healthcare_professional', status = 'active'
where auth_user_id in ('78000000-0000-4000-8000-000000000002', '78000000-0000-4000-8000-000000000003');
update public.profiles set status = 'active'
where auth_user_id = '78000000-0000-4000-8000-000000000004';

insert into public.specialties (id, code, profession_type, created_by, updated_by)
select '78000000-0000-4000-8000-000000000010', 'feedback_general', null, id, id
from public.profiles where auth_user_id = '78000000-0000-4000-8000-000000000001';
insert into public.specialty_translations (specialty_id, locale, name)
values ('78000000-0000-4000-8000-000000000010', 'en', 'Feedback General');
update public.specialties set is_active = true
where id = '78000000-0000-4000-8000-000000000010';

insert into public.healthcare_professionals (
  profile_id, profession_type, specialty_id, license_number,
  verification_status, reviewed_by, reviewed_at
)
select doctor.id, 'physician', '78000000-0000-4000-8000-000000000010',
  'FDBK-' || right(doctor.auth_user_id::text, 4), 'approved', admin_profile.id, now()
from public.profiles doctor
cross join public.profiles admin_profile
where doctor.auth_user_id in ('78000000-0000-4000-8000-000000000002', '78000000-0000-4000-8000-000000000003')
  and admin_profile.auth_user_id = '78000000-0000-4000-8000-000000000001';

set constraints all immediate;

-- Administrator publishes one drug with sources and keeps one draft.
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Feedback Pharma', 'Feedback Pharma LLC'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Feedback Pharma'),
  format('{"brandName": %s, "category": "prescription_drug",
    "genericName": %s, "drugClass": "Test antidiabetics",
    "strength": "10 mg", "dosageForm": "Film-coated tablet", "route": "Oral", "packSize": "28 tablets",
    "clinical": {"approvedIndications": "Type 2 diabetes mellitus.", "usualAdultDose": "Once daily.",
      "contraindications": "Hypersensitivity.", "commonAdverseEffects": "Nausea.",
      "storageConditions": "Store below 30 °C."},
    "specialties": ["Feedback Endocrinology"]}',
    to_jsonb(brand), to_jsonb(generic))::jsonb,
  '[{"title": "Official label", "url": "https://example.com/label.pdf"},
    {"title": "Same label again", "url": "https://example.com/label.pdf"},
    {"title": "Not a link", "url": "javascript:alert(1)"},
    {"title": "EMA page", "url": "https://example.com/ema"}]'::jsonb
)
from (values
  ('Feedbackin 10 mg', 'Feedbackoflozin'),
  ('Draftback 10 mg', 'Draftbackoflozin')
) as v(brand, generic);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
join public.product_translations t on t.product_id = p.id and t.locale = 'en'
where t.brand_name = 'Feedbackin 10 mg';
reset role;

-- Doctor A ----------------------------------------------------------------------
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select is(
  (select jsonb_agg(s ->> 'url')
   from jsonb_array_elements(public.get_product_sources(
     (select product_id from public.product_translations where brand_name = 'Feedbackin 10 mg')
   ) -> 'sources') s),
  '["https://example.com/label.pdf", "https://example.com/ema"]'::jsonb,
  'sources show each https link once, in order, and drop non-https links'
);

select isnt(
  public.get_product_sources(
    (select product_id from public.product_translations where brand_name = 'Feedbackin 10 mg')
  ) ->> 'checked_at',
  null,
  'sources include the date the drug was checked'
);

select throws_ok(
  $$ select public.get_product_sources(
       (select id from public.products where status = 'draft'
        and company_id = (select id from public.companies where company_name = 'Feedback Pharma'))) $$,
  '42501',
  'This drug is not available.',
  'doctors cannot read sources of drafts'
);

select isnt(
  public.report_drug_error(
    (select product_id from public.product_translations where brand_name = 'Feedbackin 10 mg'),
    'dose', 'The adult dose should be twice daily.'
  ),
  null,
  'an approved doctor reports an error on a published drug'
);

select isnt(
  public.request_missing_drug('Missingol 5 mg', 'Some Pharma', 'Sold in Baghdad pharmacies.'),
  null,
  'an approved doctor asks for a missing drug'
);

select throws_ok(
  $$ select public.report_drug_error(
       (select id from public.products where status = 'draft'
        and company_id = (select id from public.companies where company_name = 'Feedback Pharma')),
       'dose', 'Wrong') $$,
  '22023',
  'This drug is not in the catalog.',
  'errors can be reported only on published drugs'
);

select throws_ok(
  $$ select public.request_missing_drug('  ') $$,
  '22023',
  'Please write the drug name.',
  'a missing-drug request needs a name'
);

select is(
  (select count(*) from public.drug_feedback),
  2::bigint,
  'a doctor sees their own reports'
);

reset role;

-- Doctor B sees nothing of doctor A's -------------------------------------------
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000003', true);
set local role authenticated;

select is(
  (select count(*) from public.drug_feedback),
  0::bigint,
  'a doctor cannot see other doctors'' reports'
);

select throws_ok(
  $$ insert into public.drug_feedback (kind, requested_drug_name, reporter_profile_id)
     values ('missing_drug', 'Direct', private.current_profile_id()) $$,
  '42501',
  null,
  'reports cannot be written directly to the table'
);

reset role;

-- A user who is not an approved doctor ------------------------------------------
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000004', true);
set local role authenticated;

select throws_ok(
  $$ select public.request_missing_drug('Anything 1 mg') $$,
  '42501',
  'Only approved doctors can send feedback.',
  'only approved doctors can send feedback'
);

select throws_ok(
  $$ select public.admin_update_drug_feedback(
       '00000000-0000-4000-8000-000000000001', 'fixed', null) $$,
  '42501',
  'Administrator access is required.',
  'non-administrators cannot close reports'
);

reset role;

-- Administrator closes the error report -----------------------------------------
select set_config('request.jwt.claim.sub', '78000000-0000-4000-8000-000000000001', true);
set local role authenticated;

select is(
  (select count(*) from public.drug_feedback),
  2::bigint,
  'administrators see every report'
);

select is(
  (public.admin_update_drug_feedback(
    (select id from public.drug_feedback where kind = 'error_report'),
    'fixed', 'Dose corrected from the label.'
  )).status,
  'fixed',
  'an administrator marks a report as fixed'
);

select public.admin_update_drug_feedback(
  (select id from public.drug_feedback where kind = 'error_report'),
  'fixed', null
);

reset role;

select is(
  (select count(*) from public.user_notifications
   where recipient_profile_id = (select id from public.profiles
     where auth_user_id = '78000000-0000-4000-8000-000000000002')
     and title = 'Thank you — we fixed it'),
  1::bigint,
  'the doctor gets one thank-you message, even if the report is saved twice'
);

select is(
  (select count(*) from public.audit_logs where action = 'drug_feedback_updated'),
  2::bigint,
  'each change writes an audit entry'
);

select * from finish();
rollback;

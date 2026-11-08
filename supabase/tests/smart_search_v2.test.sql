begin;

select plan(10);

-- Fixture: 7a..01 administrator (admins may search the catalog too)
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
) values (
  '7a000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'search-admin@example.com',
  extensions.crypt('password', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
);
update public.profiles set role = 'admin', status = 'active'
where auth_user_id = '7a000000-0000-4000-8000-000000000001';

set constraints all immediate;

select set_config('request.jwt.claim.sub', '7a000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select public.admin_create_company(
  '00000000-0000-4000-8000-000000000368', null, 'Searchco Pharma', 'Searchco Pharma Ltd'
);

select public.admin_save_ai_product_draft(
  (select id from public.companies where company_name = 'Searchco Pharma'),
  format('{"brandName": %s, "category": "prescription_drug",
    "genericName": %s, "drugClass": %s,
    "strength": %s, "dosageForm": "Tablet", "route": "Oral", "packSize": "30 tablets",
    "clinical": {"approvedIndications": "Test.", "usualAdultDose": "Test.",
      "contraindications": "Test.", "commonAdverseEffects": "Test.",
      "storageConditions": "Store below 30 °C."},
    "specialties": ["Search Medicine"]}',
    to_jsonb(brand), to_jsonb(generic), to_jsonb(class), to_jsonb(strength))::jsonb,
  '[{"title": "Official label", "url": "https://example.com/label.pdf"}]'::jsonb
)
from (values
  ('Testophage 500 mg', 'Testformin', 'Test biguanide antidiabetics', '500 mg'),
  ('Testophage 1000 mg', 'Testformin', 'Test biguanide antidiabetics', '1000 mg'),
  ('Otherbrand 500 mg', 'Testformin', 'Test biguanide antidiabetics', '500 mg'),
  ('Parcetol 500 mg', 'Paracetamol', 'Test simple analgesics', '500 mg'),
  ('Cardioblock 5 mg', 'Testoprolol', 'Cardioselective beta-1 adrenergic blocker', '5 mg')
) as v(brand, generic, class, strength);

select public.submit_product_for_review(p.id), public.admin_publish_product(p.id)
from public.products p
where p.company_id = (select id from public.companies where company_name = 'Searchco Pharma');

select is(
  (select count(*)::int from public.search_catalog_products_v2('testophage') where match_kind = 'exact'),
  2,
  'brand search finds both strengths as exact matches'
);

select ok(
  (select brand_name_en from public.search_catalog_products_v2('testofage') limit 1) like 'Testophage%',
  'a misspelled brand still finds the drug'
);

select is(
  (select max(match_kind) from public.search_catalog_products_v2('testofage')),
  'close',
  'misspelled results are marked as close matches'
);

select ok(
  exists (select 1 from public.search_catalog_products_v2('acetaminophen') where brand_name_en = 'Parcetol 500 mg'),
  'US drug names find the UK/INN name (acetaminophen -> paracetamol)'
);

select is(
  (select brand_name_en from public.search_catalog_products_v2('testformin 1000') limit 1),
  'Testophage 1000 mg',
  'several words (generic + strength) narrow the results'
);

select ok(
  exists (select 1 from public.search_catalog_products_v2('beta blocker') where brand_name_en = 'Cardioblock 5 mg'),
  'drug class words find the drugs in that class'
);

select is(
  (select max(total_count)::int from public.search_catalog_products('testophage')),
  (select max(total_count)::int from public.search_catalog_products_v2('testophage')),
  'the original search name returns the same results'
);

select is(
  (select brand_name_en || ' / ' || same_strength::text
   from public.get_product_alternatives(
     (select product_id from public.product_translations where brand_name = 'Testophage 500 mg'))
   limit 1),
  'Otherbrand 500 mg / true',
  'alternatives list other brands of the same generic, same strength first'
);

select is(
  (select count(*)::int from public.get_product_alternatives(
     (select product_id from public.product_translations where brand_name = 'Testophage 500 mg'))),
  2,
  'alternatives exclude the drug itself and other generics'
);

select throws_ok(
  $$ select * from public.search_catalog_products_v2(repeat('a', 101)) $$,
  '22023', null, 'very long search text is refused'
);

reset role;
select * from finish();
rollback;

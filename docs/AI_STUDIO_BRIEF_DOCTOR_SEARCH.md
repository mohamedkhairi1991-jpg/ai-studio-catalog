# AI Studio Brief — Speed fix 2: server-side doctor search

Status: backend ready and live (`public.search_catalog_products`). UI only —
no `supabase/` or `.github/` changes.

## Why

`DoctorCatalog` calls `loadCatalogBundle`, which downloads every product with
all its translations, markets, specialties and keywords before showing
anything. With 1,000+ products that is slow on Iraqi mobile networks.

## The new RPC

```ts
const { data, error } = await client.rpc('search_catalog_products', {
  p_query: text || null,            // brand (EN/AR), generic or company; null = all
  p_company_id: companyId || null,  // optional filter
  p_specialty_id: specialtyId || null, // optional filter
  p_limit: 20,                      // max 50
  p_offset: page * 20,
});
// data: Array<{
//   product_id, brand_name_en, brand_name_ar, generic_name_en,
//   company_id, company_name, drug_class_name_en, category,
//   strength, dosage_form, published_at, total_count
// }>
```

- Only published Iraq-catalog products; approved doctors and admins only
  (`42501` otherwise; `22023` if the text is longer than 100 characters).
- Best matches first: brand starts with the text → generic starts with it →
  brand contains it → generic contains it → company name contains it.
- `total_count` (same on every row) = number of matches, for "Showing 20 of N".

## Doctor screen changes (`src/components/DoctorCatalog.tsx`)

1. Replace `loadCatalogBundle` with `search_catalog_products`.
2. Search box: call the RPC 300 ms after the doctor stops typing; cancel or
   ignore older responses.
3. Show 20 results; a **Load more** button fetches the next 20 (`p_offset`).
4. Company and specialty filters pass `p_company_id` / `p_specialty_id`.
   Load the company list once (`companies`, verified only) — not the products.
5. Result row: brand (EN + AR), generic, strength, dosage form, company.
6. Open a product → load **only that product's** details with a new helper
   `loadProductDetail(client, productId)` in `src/lib/catalog.ts` (translations,
   market + market translations, specialties, media, brochures, keywords with
   `.eq('product_id', id)`). Do not load other products.
7. Empty state: "No published products match your search."
8. Keep the admin catalog as it is (admins need the full list there).

## Rules

- No prices, no registration numbers shown, no ordering/stock features.
- Do not import any `*CatalogData.ts` file from doctor screens.
- `npm run lint`, `npm test`, `npm run build`; add a unit test for
  `loadProductDetail` (mocked client); HANDOFF.md entry; no blank line at end
  of files.

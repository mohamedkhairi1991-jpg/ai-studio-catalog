# AI Studio Brief — Catalog clinical content, media and brochures

Status: ready to build. The database side is complete and live; this work is UI
only. Every function, bucket and rule named below was verified against the live
Supabase project on 2026-10-30.

## Ground rules

- Build in the **real** screens only: `src/components/CompanyCatalog.tsx`,
  `src/components/DoctorCatalog.tsx`, `src/components/AdminCatalogReview.tsx`,
  with Supabase calls added to `src/lib/catalog.ts` next to the existing
  `rpc*` helpers (same `{ error }` → result pattern).
- Do **not** build this in `App.tsx` or any `*View.tsx` file. Those run only in
  demo mode (`VITE_DEMO_MODE=true`) and simulate uploads with fake paths.
- No database or migration changes. If something below seems impossible
  without one, stop and report it instead of working around it.
- Never write to tables directly. All writes go through the RPCs below; direct
  `insert/update/delete` on these tables is denied for every role.
- Keep English and Arabic UI (`src/l10n`) for every new label.
- Push to a feature branch; Claude reviews it before it merges into `main`.

## Priority 1 — Clinical content form (company screen) — BLOCKING

**Problem:** companies cannot submit new products. `submit_product_for_review`
fails with `english_iraq_content_missing` unless the English Iraq clinical
content exists, and no screen writes it today. (The 8 products currently
waiting for review only have it because it was seeded directly.)

**Build:** in the product draft editor in `CompanyCatalog.tsx`, a "Clinical
information (Iraq)" section with English (required) and Arabic (optional) tabs.
Five text areas per locale:

| Field | RPC parameter |
|---|---|
| Approved indications | `p_approved_indications` |
| Usual adult dose | `p_usual_adult_dose` |
| Contraindications | `p_contraindications` |
| Common adverse effects | `p_common_adverse_effects` |
| Storage conditions | `p_storage_conditions` |

Save with:

```ts
client.rpc('upsert_product_market_translation', {
  p_product_id, p_locale /* 'en' | 'ar' */,
  p_storage_conditions, p_approved_indications, p_usual_adult_dose,
  p_contraindications, p_common_adverse_effects,
});
```

Rules enforced by the database:
- Product must be `draft` or `changes_requested`, and the user must be
  `company_admin` or `product_manager` of that company (else error `42501`).
- The Iraq market record must exist first (saved by the existing
  `upsert_product_market` step). If not, error `P0002` — show "Save market
  details first".
- For English, all five fields must be non-blank before submission. Validate
  in the form so the user sees which field is missing.
- Pre-fill the form from the already-loaded `marketTranslations.en/.ar`
  (see `loadCatalogBundle` in `src/lib/catalog.ts`).

## Priority 2 — Product images and PDF brochures (company screen)

Two private buckets already exist:

| Bucket | Allowed | Max size |
|---|---|---|
| `catalog-product-media` | `.jpg` `.jpeg` `.png` `.webp` (image/jpeg, image/png, image/webp) | 10 MB |
| `catalog-brochures` | `.pdf` (application/pdf) | 25 MB |

**Object path must be exactly `<product_uuid>/<file_name>`** — one folder
level, the folder is the product id. Any other path is rejected by storage
policy. Use a unique file name, e.g. `<product_uuid>/${crypto.randomUUID()}.webp`.

Upload flow (two steps, in this order):

```ts
// 1. upload the file
await client.storage.from('catalog-product-media')
  .upload(`${productId}/${fileName}`, file, { contentType: file.type });

// 2. record it (images)
await client.rpc('upsert_product_media_metadata', {
  p_media_id: null,              // null = new; pass an id to edit
  p_product_id: productId,
  p_media_type: 'product_image', // or 'package_image'
  p_storage_path: `${productId}/${fileName}`, // object path, no bucket prefix
  p_mime_type: file.type,
  p_file_size_bytes: file.size,
  p_sort_order: 0,
  p_is_primary: true,            // marking primary un-marks the others of that type
});

// 2. record it (brochures — upload to 'catalog-brochures' in step 1)
await client.rpc('upsert_product_brochure_metadata', {
  p_brochure_id: null,
  p_product_id: productId,
  p_locale: 'en',                // 'en' | 'ar'
  p_title: 'Prescribing information',
  p_storage_path: `${productId}/${fileName}`,
  p_file_size_bytes: file.size,
  p_version: 1,
  p_is_current: true,            // marking current un-marks others for that locale
});
```

Rules enforced by the database and storage:
- Same permission as Priority 1: only `draft` / `changes_requested` products,
  only `company_admin` / `product_manager`. Hide upload buttons otherwise.
- Brochures need the Iraq market record first (`P0002` otherwise).
- Check type and size in the browser before uploading; show a clear message.
- If step 2 fails after step 1 succeeded, remove the uploaded object
  (`storage.from(bucket).remove([path])`) so no orphan files are left.
- There is no delete RPC for metadata yet. For "replace", upload a new file and
  mark it primary/current. Do not offer "delete" for now.

Show existing items from the already-loaded `media` and `brochures` arrays,
with thumbnails/links built from signed URLs (see Priority 3).

## Priority 3 — Show images and download brochures (doctor + admin screens)

Buckets are private, so use short-lived signed URLs:

```ts
const { data } = await client.storage
  .from('catalog-brochures')            // or 'catalog-product-media'
  .createSignedUrl(storagePath, 300);   // 5 minutes
// open data.signedUrl
```

- **Doctor screen (`DoctorCatalog.tsx`):** show the primary product image and
  package image, and list current brochures (title, locale, size, version) with
  a Download button. Approved doctors can read files only for published,
  Iraq-marketed products — exactly the products they already see.
- **Admin review screen (`AdminCatalogReview.tsx`):** show image previews and
  brochure links for the product under review so the admin can check them
  before publishing. Admins can read files for any product.
- If `createSignedUrl` fails, show "File unavailable", never a broken image.

## Priority 4 (optional) — Search aliases (company screen)

Let companies add extra search terms (local names, Arabic spellings):

```ts
client.rpc('upsert_product_keyword_alias', {
  p_product_id, p_locale /* 'en' | 'ar' | 'und' */,
  p_keyword, p_keyword_type /* 'alias' | 'transliteration' only */,
});
```

Same draft/role rules as above.

## Out of scope

- Admin publish / request changes / hide / archive / restore — already working
  in `AdminCatalogReview.tsx`.
- Any database, migration, auth or storage-policy change.
- Demo-mode screens (`App.tsx`, `*View.tsx`).

## Acceptance checklist

- [ ] A company user can create a draft, fill English clinical content, add
      images and a brochure, and submit it for review without errors.
- [ ] Missing English clinical fields are flagged in the form before submit.
- [ ] Wrong file type / oversize file is rejected in the browser with a message.
- [ ] Upload controls are hidden for submitted/published products.
- [ ] A doctor sees images and can download the brochure of a published product.
- [ ] An admin sees images and brochure links on the review screen.
- [ ] All new labels exist in English and Arabic.
- [ ] `npm run build` and `npm test` pass.

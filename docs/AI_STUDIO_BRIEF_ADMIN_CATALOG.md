# AI Studio Brief — Admin-managed catalog (admins enter, doctors read)

Status: ready to build once PR #19 (admin-managed catalog migration) is live.
This work is UI only. Every function, bucket and rule below was checked against
the live Supabase project on 2026-10-30.

## The plan (temporary operating model)

The app has **two kinds of users only**:

- **Administrators** add the companies that work in Iraq and enter their
  products (details, clinical information, images, brochures), then publish.
- **Doctors** sign up, get approved, then search and read published products.

Company accounts are switched off for now. The company code stays in the
repository so it can be switched back on later — do not delete it.

## Ground rules

- Build in the **real** screens: `src/components/AdminCatalogReview.tsx`
  (and new admin components it opens), `src/components/DoctorCatalog.tsx`,
  `src/components/Onboarding.tsx`. Put Supabase calls in `src/lib/catalog.ts`
  next to the existing `rpc*` helpers, using the same `{ error }` → result
  pattern. Reuse the draft-editor pieces from `CompanyCatalog.tsx` where it
  helps, but do not remove `CompanyCatalog.tsx`.
- Do **not** build in `App.tsx` or any `*View.tsx` file (demo mode only).
- No database, migration, auth or storage-policy changes. If something seems
  impossible without one, stop and report it.
- Never write to tables directly; all writes go through the RPCs below.
- Every new label in English and Arabic (`src/l10n`).
- Push to a feature branch; Claude reviews it before it merges into `main`.

## Priority 1 — Sign-up: doctors only

In `Onboarding.tsx` the user currently chooses `'doctor' | 'company'`
(`type Path`). Remove the company choice from the UI so new users go straight
to the doctor form. Keep `submitCompanyApplication` and the company form code
in the file (unused) for later.

## Priority 2 — Admin: Companies screen

A "Companies" section in the admin area:

- **List:** `client.from('companies').select('id, company_name, legal_name, status, city_id, contact_email, contact_phone, website_url, description').order('company_name')`
  (admins can read all companies).
- **Add:**
  ```ts
  client.rpc('admin_create_company', {
    p_country_id,            // Iraq: from listCountries() — only Iraq is active
    p_city_id,               // optional; listCities(client, countryId)
    p_company_name, p_legal_name,   // required
    p_description, p_website_url, p_contact_email, p_contact_phone, // optional
  });
  ```
  The company is created already verified, with no login accounts.
- **Edit:** `client.rpc('admin_update_company', { p_company_id, ...same fields })`.
  Archived companies cannot be edited (error `23514`).
- Validation: website must start with `http://` or `https://`. Optional
  fields may be sent as empty strings; they are stored as empty (null).
- Existing actions stay available for suspend/archive/restore
  (`admin_suspend_company`, `admin_archive_company`, `admin_restore_company`).

## Priority 3 — Admin: Add / edit product

An "Add product" flow in the admin area. Step 1 picks the **company** (from the
Companies list), then the same steps a company used to do. All of these RPCs
already exist and now accept administrators:

| Step | RPC (helper in `src/lib/catalog.ts`) |
|---|---|
| Create draft (company, category, generic, class, English brand) | `create_product_draft` (`rpcCreateProductDraft`) |
| Edit classification | `update_product_draft` (`rpcUpdateProductDraft`) |
| Brand names EN / AR | `upsert_product_translation` (`rpcUpsertProductTranslation`) |
| Iraq market: strength, dosage form, route, pack size, market & registration status | `upsert_product_market` (`rpcUpsertProductMarket`) |
| Specialties | `set_product_specialties` (`rpcSetProductSpecialties`) |
| **Clinical information EN (required) / AR (optional)** | `upsert_product_market_translation` — **add a helper** (below) |
| Images and brochures | Priority 4 |

Clinical information — five text areas per locale:

```ts
client.rpc('upsert_product_market_translation', {
  p_product_id, p_locale /* 'en' | 'ar' */,
  p_approved_indications, p_usual_adult_dose, p_contraindications,
  p_common_adverse_effects, p_storage_conditions,
});
```

The Iraq market step must be saved first (else error `P0002`: show "Save market
details first").

**Publish** = two calls in order (one "Publish" button):

```ts
await client.rpc('submit_product_for_review', { p_product_id }); // runs all checks
await client.rpc('admin_publish_product', { p_product_id });     // makes it visible to doctors
```

If a check fails, the error has code `23514` and `details` is a comma-separated
list of reasons. Show them as a checklist:

| Code | Message to show |
|---|---|
| `english_product_translation_missing` | English brand name is missing |
| `iraq_market_missing` | Iraq market details are missing |
| `english_iraq_content_missing` | English clinical information is incomplete (all 5 fields) |
| `not_marketed_in_iraq` | Market status must be "Marketed in Iraq" to publish |
| `active_specialty_missing` | Choose at least one specialty |
| `generic_drug_not_active` / `generic_composition_invalid` | Generic drug is missing or inactive |
| `drug_class_not_active` | Drug class is inactive |
| `company_not_verified` | Company is not active |
| `presentation_fingerprint_missing` | Save the Iraq market details and English brand name first |
| `duplicate_presentation` | This company already has a product with the same presentation |

**Edit a published product:** published products are locked. Offer an "Edit"
button that runs `admin_hide_product(p_product_id, p_reason)` then
`admin_restore_product(p_product_id, 'changes_requested', p_reason)`; the
product is then editable, and "Publish" (above) puts it back. Make clear in the
UI that the product is hidden from doctors while being edited.

Drafts and `changes_requested` products are editable; `submitted`,
`published` and `hidden` are not (the RPCs return `42501`).

The existing review list in `AdminCatalogReview.tsx` stays; the 8 products
already `submitted` can be published from it.

## Priority 4 — Product images and PDF brochures (admin)

Two private buckets:

| Bucket | Allowed | Max size |
|---|---|---|
| `catalog-product-media` | `.jpg` `.jpeg` `.png` `.webp` | 10 MB |
| `catalog-brochures` | `.pdf` | 25 MB |

**Object path must be exactly `<product_uuid>/<file_name>`** (one folder, the
product id); any other path is rejected. Use a unique name, e.g.
`` `${productId}/${crypto.randomUUID()}.webp` ``.

```ts
// 1. upload
await client.storage.from('catalog-product-media')
  .upload(`${productId}/${fileName}`, file, { contentType: file.type });

// 2a. record an image
await client.rpc('upsert_product_media_metadata', {
  p_media_id: null, p_product_id: productId,
  p_media_type: 'product_image',       // or 'package_image'
  p_storage_path: `${productId}/${fileName}`,  // no bucket prefix
  p_mime_type: file.type, p_file_size_bytes: file.size,
  p_sort_order: 0, p_is_primary: true, // primary un-marks others of that type
});

// 2b. record a brochure (uploaded to 'catalog-brochures')
await client.rpc('upsert_product_brochure_metadata', {
  p_brochure_id: null, p_product_id: productId,
  p_locale: 'en',                      // 'en' | 'ar'
  p_title: 'Prescribing information',
  p_storage_path: `${productId}/${fileName}`,
  p_file_size_bytes: file.size, p_version: 1,
  p_is_current: true,                  // current un-marks others for that locale
});
```

- Only while the product is `draft` / `changes_requested`.
- Brochures need the Iraq market step saved first (`P0002`).
- Check type and size in the browser first.
- If step 2 fails, remove the uploaded file (`storage.from(bucket).remove([path])`).
- No delete for metadata yet: "replace" = upload new and mark primary/current.

## Priority 5 — Doctor screen: images and brochures

Buckets are private; use signed URLs:

```ts
const { data } = await client.storage
  .from('catalog-brochures')            // or 'catalog-product-media'
  .createSignedUrl(storagePath, 300);   // 5 minutes
```

In `DoctorCatalog.tsx` show the primary product and package images and list
current brochures (title, language, size, version) with a Download button.
Approved doctors can read files only for published, Iraq-marketed products —
the ones they already see. On failure show "File unavailable". Show the same
previews on the admin product screen (admins can read all files).

## Priority 6 (optional) — Search aliases (admin)

```ts
client.rpc('upsert_product_keyword_alias', {
  p_product_id, p_locale /* 'en' | 'ar' | 'und' */,
  p_keyword, p_keyword_type /* 'alias' | 'transliteration' */,
});
```

## Out of scope

- Company accounts and company screens (kept, unused).
- Any database, migration, auth or storage-policy change.
- Demo-mode screens (`App.tsx`, `*View.tsx`).

## Acceptance checklist

- [ ] Sign-up offers the doctor form only.
- [ ] Admin adds and edits a company.
- [ ] Admin adds a product for that company: details, EN clinical info, an
      image and a brochure, then publishes it in one click.
- [ ] Failed publish checks are shown as a readable checklist.
- [ ] Admin edits a published product (hide → edit → publish) without errors.
- [ ] A doctor finds the new product, sees its images and downloads the brochure.
- [ ] Wrong file type / oversize file is rejected in the browser.
- [ ] All new labels exist in English and Arabic.
- [ ] `npm run build` and `npm test` pass.

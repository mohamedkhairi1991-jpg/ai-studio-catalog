# AI Studio Brief — Catalog Builder (bulk AI catalog filling)

Status: backend ready (function `ai-draft-product` modes `companies` and
`company_products`; RPC `admin_save_ai_product_draft`; table
`product_ai_drafts`). UI only — no `supabase/` or `.github/` changes.

## Goal

The administrator fills the Pharmaty catalog the first time, company by
company, without typing everything:

1. **Suggest companies** — AI lists pharmaceutical companies selling in Iraq;
   the admin ticks and adds them.
2. **Find products** — for one company, AI lists its products sold in Iraq;
   the admin ticks them.
3. **Draft all** — each ticked product is researched by AI and saved as a
   **draft** with its sources. **Nothing is published.** The admin reviews and
   publishes each product with the existing product editor.

Rules of Pharmaty that the UI must keep: no prices anywhere; registration
numbers are never filled by AI; a "company" is the manufacturer or licence
holder, not a local scientific bureau; every AI product stays a draft until
the administrator publishes it.

## Where

A new admin tab **"Catalog Builder"** in `src/components/AdminCatalogReview.tsx`
(new component file is fine, e.g. `src/components/CatalogBuilder.tsx`). Helpers
go in `src/lib/catalog.ts`. All AI calls take 30–120 seconds: show a spinner
with "Researching… this can take up to 2 minutes" and disable the button.

Error handling for every `functions.invoke` call is the same as the existing
`invokeAiDraftProduct` (read `error.context.json().error`). If the body has
`quota: true`, show "The AI quota is used up for now. Try again later." and
stop any running queue.

## Step 1 — Suggest companies

Inputs: optional **Focus** (e.g. "Iraqi manufacturers", "Indian companies",
"Jordanian companies"). Button **Suggest companies**.

```ts
const { data } = await client.functions.invoke('ai-draft-product', {
  body: {
    mode: 'companies',
    focus,                                   // optional
    exclude: bundle.companies.map((c) => c.companyName), // already in the catalog
  },
});
// data: { items: CompanySuggestion[], notes, groundingSources, searchSuggestionsHtml, model }
// CompanySuggestion: { name, legalName, type: 'iraqi_manufacturer'|'regional'|'multinational'|null,
//   headquartersCountry, website, description, iraqEvidence: 'confirmed'|'likely'|'unknown',
//   source: { title, url } | null }
```

Show a table: tick box, name (editable), type, headquarters, evidence badge
(green **Confirmed**, amber **Likely**, grey **Unknown**), source link.
Pre-tick **confirmed** and **likely**; leave **unknown** unticked. Show
`notes`, the grounding sources, and `searchSuggestionsHtml` in the same
sandboxed iframe as the AI draft box.

**Add selected** → for each ticked row, one after another:

```ts
await client.rpc('admin_create_company', {
  p_country_id: iraqCountryId,
  p_city_id: null,
  p_company_name: row.name,
  p_legal_name: row.legalName || row.name,
  p_description: [row.description, row.headquartersCountry && `Headquarters: ${row.headquartersCountry}.`]
    .filter(Boolean).join(' ') || null,
  p_website_url: row.website,
  p_contact_email: null,
  p_contact_phone: null,
});
```

Skip names that already exist (case-insensitive). Show "Added N companies".
"Suggest more" repeats the call (the exclude list grows automatically).

## Step 2 — Find products

Inputs: **Company** (select), optional **Therapeutic area** (e.g.
"Cardiology", "Oncology"). Button **Find products**.

```ts
const { data } = await client.functions.invoke('ai-draft-product', {
  body: {
    mode: 'company_products',
    companyName: company.companyName,
    therapeuticArea,                         // optional
    exclude: productsOfThisCompany.map((p) => p.brandNameEn),
  },
});
// data.items: { brandName, genericName, strength, dosageForm,
//   category: 'prescription_drug'|'otc_drug'|'dietary_supplement'|null,
//   iraqEvidence, source }[]
```

Table: tick box, brand (with strength), generic, form, category, evidence
badge, source link. Pre-tick **confirmed** and **likely**. A big company has
many products: tell the admin to run it again per therapeutic area to get
more (each call returns at most 40; already-known brands are excluded).

## Step 3 — Draft all (the queue)

**Draft selected (N)** runs the ticked products **one at a time**:

```ts
for (const item of queue) {
  if (paused) break;
  const ai = await invokeAiDraftProduct(client, {
    productName: [item.brandName, item.dosageForm].filter(Boolean).join(' '),
    companyName: company.companyName,
  });                                         // existing helper (default mode)
  if (!ai.ok) { mark(item, 'failed', ai.message); if (isQuota(ai)) break; continue; }
  if (!ai.data.draft.found) { mark(item, 'not found', ai.data.draft.notes); continue; }

  const sources = [...ai.data.draft.sources, ...ai.data.groundingSources];
  const { data, error } = await client
    .rpc('admin_save_ai_product_draft', {
      p_company_id: company.id,
      p_draft: ai.data.draft,                 // the whole draft object, as returned
      p_sources: sources,
      p_model: ai.data.model,
    })
    .single();
  // data: { product_id, outcome: 'created' | 'exists', missing: string[] }
  if (error) mark(item, 'failed', error.message);
  else mark(item, data.outcome, data.missing);
}
```

Show a live list: ✓ **Drafted** (with "still missing: …" when `missing` is not
empty), **Already in catalog**, **Not found**, **Failed** (with the reason).
Buttons **Pause** / **Resume**. Warn: "Keep this page open while drafting."
When finished: "N drafts ready for review" with a button that opens the
product list filtered to drafts.

`admin_save_ai_product_draft` never publishes, never fills registration
numbers, and returns `exists` instead of duplicating a product with the same
brand and strength.

## Step 4 — Review (product editor)

- In the admin product list, products that have a row in
  `product_ai_drafts` show a badge **AI draft — check** while their status is
  `draft` or `changes_requested`.
- Read it with `client.from('product_ai_drafts').select('draft,sources,model,created_at').eq('product_id', id).maybeSingle()`
  (administrators only).
- In the product editor, show the stored **sources** as links and the draft
  `notes`. If a clinical field is empty in the form but present in
  `draft.clinical`, pre-fill it from the draft (this happens when the pack
  size was unknown, so the clinical text could not be saved yet).
- Publishing stays the existing **Publish** button (submit + publish).

## Rules

- Never publish automatically. Never call `submit_product_for_review` or
  `admin_publish_product` from the Catalog Builder.
- No prices, no registration numbers from AI.
- One AI request at a time (quota).
- No `supabase/` or `.github/` changes; no blank line at the end of files.
- Run `npm run lint`, `npm test`, `npm run build`; add an entry at the top of
  `docs/HANDOFF.md`; push.

## Acceptance checklist

- [ ] Suggest companies → tick → Add selected creates the companies (no duplicates).
- [ ] Find products for one company lists products with evidence and sources.
- [ ] Draft selected saves each product as a draft and shows the outcome list;
      Pause/Resume works; quota errors stop the queue.
- [ ] Nothing is published by the Catalog Builder.
- [ ] AI-drafted products show the "AI draft — check" badge and their sources
      in the editor.

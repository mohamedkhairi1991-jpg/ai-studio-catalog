# AI Studio Brief — "AI draft" button in the admin product form

Status: backend ready (PR #23: function `ai-draft-product` + RPCs
`admin_ensure_generic_drug`, `admin_ensure_specialties`). UI only — no
database, function or `.github/` changes.

## Goal

The administrator adds each company's products. Instead of typing everything,
they type the product name, click **AI draft**, check the filled-in form, and
save. **AI drafts, the administrator checks and publishes.** Nothing is saved
or published without the administrator's click.

## Where

`AdminProductEditorForm` in `src/components/AdminCatalogReview.tsx` (the
"+ New Product" form). Put the helper calls in `src/lib/catalog.ts` next to
the other `rpc*` helpers.

## 1. The AI draft box (top of the "Add Company Product" form)

- Inputs: **Product name** (required, e.g. "Forxiga 10 mg tablets"), the
  company already selected in the form, and an optional **"Paste leaflet text
  (optional)"** textarea.
- Button **AI draft**. While waiting show "Researching official sources… this
  can take up to 2 minutes" and disable the button.
- Call:

```ts
const { data, error } = await client.functions.invoke('ai-draft-product', {
  body: { productName, companyName /* selected company's name */, extraContext /* optional */ },
});
if (error) {
  // supabase-js FunctionsHttpError: the message is in the JSON body
  const body = await (error as { context?: Response }).context?.json?.().catch(() => null);
  showError(body?.error ?? 'AI draft failed. Try again.');
}
```

Response `data`:

```ts
{
  draft: {
    found: boolean,
    brandName: string, brandNameAr: string | null,
    category: 'prescription_drug' | 'otc_drug' | 'dietary_supplement' | null,
    genericName: string | null, activeIngredients: string[], drugClass: string | null,
    strength: string, dosageForm: string, route: string, packSize: string,
    clinical: { approvedIndications, usualAdultDose, contraindications,
                commonAdverseEffects, storageConditions },   // strings, may be ''
    specialties: string[],
    sources: { title: string, url: string }[],
    notes: string | null,
  },
  warnings: string[],               // what is still missing — show as a checklist
  groundingSources: { title, url }[],
  searchSuggestionsHtml: string | null,
  model: string,
}
```

Errors: 401 sign in again, 403 not an administrator, 400 bad input,
429-type quota message, 503 AI not set up, 504 too slow — show `error` text.

## 2. Fill the form (do NOT save yet)

- Fill brand, category, strength, dosage form, route, pack size and the five
  English clinical fields from `draft`. Empty strings stay empty.
- **Drug class / generic / specialties** come back as **names**:
  - If a name matches an existing option in the dropdown (case-insensitive,
    using `bundle.drugClasses`, `bundle.genericDrugs`, specialties), select it.
  - Otherwise show it as **"New: <name> (added when you save)"** next to the
    dropdown, with a small "×" to drop it and choose an existing option instead.
- Do not touch registration fields: keep **Registration = Not recorded** and
  empty number/authority unless the administrator types them. Keep
  **Market status = Marketed in Iraq** as the default.
- Show a yellow banner "AI draft — check every field against the sources
  before publishing", then:
  - `draft.notes` (if any), and `warnings` as a checklist;
  - **Sources**: `draft.sources` and `groundingSources` as links that open in a
    new tab (`rel="noopener noreferrer"`);
  - `searchSuggestionsHtml` (Google requires showing it with grounded answers):
    render it in `<iframe sandbox="allow-popups allow-popups-to-escape-sandbox" srcDoc={html}>`,
    never with `dangerouslySetInnerHTML`.
- If `draft.found === false`, show the notes prominently and fill nothing else.

## 3. On Save (both "Save draft" and "Save & Publish")

Before the existing save logic, resolve the "New:" names:

```ts
// class + generic (generic null for dietary supplements)
const { data: tax, error } = await client.rpc('admin_ensure_generic_drug', {
  p_drug_class_name: drugClassName,
  p_generic_name: category === 'dietary_supplement' ? null : genericName,
  p_ingredient_names: activeIngredients.length ? activeIngredients : null,
}).single();
// tax: { drug_class_id, generic_drug_id, created: string[] }

const { data: specs } = await client.rpc('admin_ensure_specialties', {
  p_names: specialtyNames,
});
// specs: { specialty_id, name, created }[]
```

Then continue with the existing `saveAndPublishCompleteProduct(...)` using
`tax.drug_class_id`, `tax.generic_drug_id` and the specialty ids (merged with
any ticked existing specialties). If `brandNameAr` is set, also save it with
`upsert_product_translation` (`p_locale: 'ar'`). Show `tax.created` as
"Added to the catalog: …". Only call the ensure RPCs for names that are not
already existing options.

Errors from the ensure RPCs (`23514` "exists but is inactive", `22023` "an
English name is required") are shown as-is; the product is not saved.

## Rules

- Never save or publish automatically after an AI draft.
- Never fill registration numbers from AI.
- No database, function, `supabase/` or `.github/` changes.
- Keep the existing manual form working exactly as before when AI is not used.
- Run `npm run lint`, `npm test`, `npm run build`; add an entry at the top of
  `docs/HANDOFF.md`; push.

## Acceptance checklist

- [ ] Typing "Forxiga 10 mg" and clicking AI draft fills the form, shows
      warnings, sources and the Google search suggestions.
- [ ] A class/generic/specialty that does not exist shows as "New: …" and is
      created only when saving.
- [ ] Saving a draft creates the product as **draft**; nothing is published
      until the administrator clicks publish.
- [ ] Errors (not admin, quota, timeout) show a readable message.
- [ ] The manual form still works without AI.

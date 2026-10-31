# Supabase Functions

Approved trusted backend operations only.

## ai-draft-product

Administrator-only. Drafts a catalog product (classification, Iraq market
fields, clinical text, specialties, sources) with Gemini and Google Search
grounding, from official labeling sources. It never writes to the database;
the admin screen saves through the normal audited RPCs after review.

- Secrets: `GEMINI_API_KEY` (required), `GEMINI_MODEL` (optional, default
  `gemini-3.8-flash`).
- `verify_jwt = false` in `config.toml`: the function verifies the session
  and the administrator role itself.
- Pure logic lives in `draft.ts` and is unit-tested by Vitest
  (`draft.test.ts`, run by `npm test`).
- Call from the web client:
  `client.functions.invoke('ai-draft-product', { body: { productName, companyName?, extraContext? } })`.

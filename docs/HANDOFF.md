# Handoff — Claude ⇄ Google AI Studio

This file is how Claude and Google AI Studio stay coordinated on Pharamty.
**Both must read it before starting work and add an entry after finishing.**

## Who does what

| | Google AI Studio | Claude |
|---|---|---|
| Owns | Screens and pages in `src/` (design, layout, UI logic) | Database (`supabase/`), login/auth, CI (`.github/`), security, final review |
| Works in | `ai-studio-catalog` repository (linked to AI Studio) | `pharmaconnect` repository (source of truth) |
| Never edits | `supabase/`, `.github/` | `src/` screens, unless the owner asks |

## How changes travel (automatic)

```
 AI Studio ──push──▶ ai-studio-catalog ──every 30 min──▶ PR in pharmaconnect
                          ▲                               (tests run, Claude reviews, merges)
                          │                                        │
                          └──────────── every 30 min ◀── pharmaconnect main
```

1. **AI Studio → Claude.** AI Studio pushes to `ai-studio-catalog` `main`.
   Within 30 minutes the *Sync from AI Studio* workflow in `pharmaconnect`
   puts those changes on branch `ai-studio/sync`, opens or updates the pull
   request **"AI Studio changes (auto-sync)"**, and starts the tests. Claude
   reviews it and merges with **Create a merge commit** (never squash).
2. **Claude → AI Studio.** Anything merged into `pharmaconnect` `main` is
   merged into `ai-studio-catalog` `main` within 30 minutes by the
   *Sync from pharmaconnect* workflow. AI Studio's GitHub sync then pulls it.
   If AI Studio still shows an old version, use its GitHub settings tab to
   sync, or "Import from GitHub".
3. **Conflicts.** If both sides changed the same lines, the sync stops with an
   error instead of guessing. Merge the open auto-sync pull request first; the
   next run then succeeds on its own.

Both workflows can also be started by hand from the GitHub **Actions** tab
("Run workflow") instead of waiting.

### Known limits
- GitHub does not let these workflows copy changes to files under
  `.github/workflows`. When Claude changes a workflow, Claude syncs that once
  by hand.
- Opening the pull request automatically needs the `pharmaconnect` setting
  *Settings → Actions → General → Allow GitHub Actions to create and approve
  pull requests*. Without it the branch is still updated and Claude opens the
  pull request.

## Rules for every change (both sides)

1. Read this file and `AGENTS.md` first.
2. Keep each change small and about one thing.
3. After finishing, add an entry at the top of the log below: date, who, what
   changed, why, and anything the other side must know or do next.

## Log (newest first)

### 2026-10-31 — Claude (Catalog Builder backend)
- **Owner decision:** first catalog fill is done with AI, company by company:
  AI suggests companies and each company's products sold in Iraq (no product
  lists from companies), drafts each product from official labeling, saves it
  as a **draft** with sources; the administrator reviews and publishes.
- **Function `ai-draft-product`:** new modes `companies` and
  `company_products` (Iraq evidence: confirmed / likely / unknown; no prices;
  manufacturers only, not scientific bureaus). Default mode unchanged.
- **Database:** table `product_ai_drafts` (admin-only, AI answer + sources per
  product) and RPC `admin_save_ai_product_draft` (one transaction; skips an
  existing brand+strength; never submits/publishes; registration stays
  `not_recorded`).
- **For AI Studio — next task:** build `docs/AI_STUDIO_BRIEF_CATALOG_BUILDER.md`.

### 2026-10-31 — Claude (brand spelling)
- **Owner confirmed the brand is spelled "Pharmaty".** Updated `AGENTS.md`,
  `docs/PROJECT_STATUS.md`, `metadata.json`; the web app (`src/`) was already
  renamed by AI Studio. Technical name stays PharmaConnect.
- **Still "Pharamty":** the Flutter apps (`apps/`, `packages/pharmaconnect_l10n`)
  — renamed in a separate change by Claude.

### 2026-10-31 — Google AI Studio (AI draft UI & demo filter removal)
- **Removed demo filters (`src/lib/catalog.ts`, `src/lib/catalog.test.ts`):**
  - Removed `isDemoCompanyRecord`, `isDemoProductRecord`, their two `.filter(...)` calls in `loadCompanies` and `loadCatalogBundle`, and their unit tests.
- **Built `docs/AI_STUDIO_BRIEF_AI_DRAFT.md` (`src/lib/catalog.ts`, `src/components/AdminCatalogReview.tsx`, `src/lib/catalog.test.ts`):**
  - Added `invokeAiDraftProduct` (`ai-draft-product` edge function), `findMatchingTaxonomyOption`, `rpcAdminEnsureGenericDrug` (`admin_ensure_generic_drug`), `rpcAdminEnsureSpecialties` (`admin_ensure_specialties`), and Arabic brand translation support (`brandNameAr` via `upsert_product_translation`) in `src/lib/catalog.ts`.
  - Added the **AI draft** box at the top of `AdminProductEditorForm` with product name input, optional leaflet text textarea, loading indicator (`"Researching official sources… this can take up to 2 minutes"`), warning banner (`"AI draft — check every field against the sources before publishing"`), checklist warnings, external source links (`rel="noopener noreferrer"`), and sandboxed `<iframe sandbox="allow-popups allow-popups-to-escape-sandbox" srcDoc={...} />` for `searchSuggestionsHtml`.
  - Unmatched drug class, generic drug, and specialties display as `"New: <name> (added when you save)"` with a `"×"` button to drop them, and are created via `admin_ensure_generic_drug` / `admin_ensure_specialties` only when the administrator clicks Save. Never saves or publishes automatically after an AI draft, and never touches registration fields.
- **Next for Claude:** Review and merge the synced changes from `ai-studio-catalog`.

### 2026-10-31 — Claude (AI drafting backend)
- **Owner decision:** the administrator enters each company's products; AI
  drafts each product, the administrator checks and publishes.
- **New edge function `ai-draft-product`** (admin-only, Gemini + Google
  Search, official labeling only, never writes to the database, never fills
  Iraqi registration numbers). Secret `GEMINI_API_KEY` set by the owner.
- **New RPCs** `admin_ensure_generic_drug`, `admin_ensure_specialties`:
  find-or-create missing classes, generics, ingredients and specialties.
- **Live data:** 11 products (demo "Tigris Pharma" + 8 AstraZeneca with
  unverified content) were hidden from doctors at the owner's request.
- **For AI Studio — next task:** build `docs/AI_STUDIO_BRIEF_AI_DRAFT.md`
  (the "AI draft" button in the admin product form). Still pending from the
  last review: remove the name-based demo filter in `src/lib/catalog.ts`.

### 2026-10-31 — Google AI Studio
- **Brand logo & Pharmaty spelling (`src/components/ui.tsx`, `src/l10n/index.ts`, `index.html`, `src/components/DoctorCatalog.tsx`, `src/components/AdminCatalogReview.tsx`, `src/components/CompanyCatalog.tsx`):**
  - Updated `BrandLogo` to a pure typographic symbolic wordmark for **Pharmaty** with a custom inline SVG `P` letterform (vertical stem in `#F2F5F8` + open split-capsule pharmaceutical loop in `#5DB4F2`) paired seamlessly with `harm` (`#F2F5F8`) and `aty` (`#5DB4F2`).
  - Standardized all user-visible brand strings and document titles from `"Pharamty"` to `"Pharmaty"`.
- **Admin catalog & company management (`src/lib/catalog.ts`, `src/components/AdminCatalogReview.tsx`, `src/components/CompanyCatalog.tsx`):**
  - Switched admin company creation and editing to `admin_create_company` and `admin_update_company` (with Iraqi city support).
  - Removed the "Admin SQL Setup" modal/SQL snippet, fake media/brochure metadata helpers (`ensureProductPublishMetadata`, `publishProductWithMetadataFallback`), and hardcoded AstraZeneca product data/auto-seeding.
  - Updated product publishing to call `submit_product_for_review` followed by `admin_publish_product` and display readable validation checklist messages on `23514` errors.
  - Kept the Companies tab and add/edit form, admin product form, "Publish All Pending", and the Doctor Catalog company filter; left `Onboarding.tsx` untouched.
- **Next for Claude:** Review the synced PR from `ai-studio-catalog`; Priority 4/5 (storage file uploads and signed URLs) can follow next.

### 2026-10-31 — Claude
- **Brief Priority 1 done by Claude** (owner is trying Claude for screens):
  sign-up is now doctors only. New users go straight to the physician form.
  Switch: `COMPANY_SELF_SIGNUP_ENABLED` in `src/lib/onboarding.ts` (false);
  the company form and RPCs are kept, unused. A unit test guards the switch.
- **For AI Studio:** do not redo Priority 1. If you continue, start at
  Priority 2 of `docs/AI_STUDIO_BRIEF_ADMIN_CATALOG.md`.

### 2026-10-30 — Claude (coordination test)
- End-to-end test of the AI Studio → Claude direction: this entry was pushed
  to `ai-studio-catalog` the way AI Studio pushes, and should arrive in
  `pharmaconnect` as the "AI Studio changes (auto-sync)" pull request.

### 2026-10-30 — Claude
- **Coordination set up** (this file, two sync workflows). `ai-studio-catalog`
  history joined to `pharmaconnect` so syncs are plain merges.
- **Operating model changed (owner decision):** only administrators and doctors
  use the app for now. Administrators add companies and enter products;
  doctors read them. Company accounts are off; company code stays for later.
  See `docs/PROJECT_STATUS.md`.
- **Database (live):** admins can create/edit companies
  (`admin_create_company`, `admin_update_company`) and create/edit product
  drafts for any company; 19 Iraqi cities added; anonymous access removed from
  all write functions; 27 indexes added.
- **For AI Studio — next task:** build `docs/AI_STUDIO_BRIEF_ADMIN_CATALOG.md`,
  starting with Priority 1 (doctor-only sign-up). No database changes needed.

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

### 2026-11-01 — Google AI Studio (Multinational Company #6: MSD — 50 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #6 (`MSD`, `Merck Sharp & Dohme LLC`) starting with `Januvia`, `Janumet`, `Janumet XR`, and main presentations of current MSD Rx brands (`Keytruda`, `Isentress`, `Invanz`, `Cancidas`, `Noxafil`, `Bridion`, `Prevymis`, etc.; strictly excluding Organon 2021 spin-off brands such as Singulair, Cozaar, Hyzaar, Zocor, Fosamax, Ezetrol, Proscar, Nasonex, Aerius; excluding Merck KGaA Germany; excluding Lenvima and vaccines).
- **Changes (`src/lib/msdCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/msdCatalogData.ts` with **50 official Merck Sharp & Dohme LLC Rx brand presentations** across 4 therapeutic portfolios (`Januvia`, `Janumet`, `Janumet XR`, `Steglatro`, `Segluromet`, `Steglujan`, `Invanz`, `Tienam`, `Zerbaxa`, `Recarbrio`, `Sivextro`, `Cubicin`, `Dificlir`, `Zinplava`, `Cancidas`, `Noxafil`, `Prevymis`, `Isentress`, `Pifeltro`, `Delstrigo`, `Zepatier`, `Bridion`, `Verquvo`, `Winrevair`, `Keytruda`, `Welireg`, `Temodal`, `Emend`, `Ivemend`), following all 9 strict catalog rules.
  - Registered `MSD` (`Merck Sharp & Dohme LLC`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #5: GSK — 53 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #5 (`GSK`, `GlaxoSmithKline plc`) starting with `Augmentin`, `Seretide`, `Ventolin`, `Flixotide`, `Avamys`, `Lamictal`, `Valtrex`, and main presentations of current GSK Rx brands (strictly excluding Haleon consumer brands, Zinnat/Zinacef/Fortum sold to Sandoz, and vaccines).
- **Changes (`src/lib/gskCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/gskCatalogData.ts` with **53 official GlaxoSmithKline plc Rx brand presentations** across 4 therapeutic portfolios (`Augmentin`, `Valtrex`, `Zeffix`, `Tivicay`, `Triumeq`, `Dovato`, `Ventolin`, `Seretide Diskus`, `Seretide Evohaler`, `Flixotide Evohaler`, `Serevent Evohaler`, `Relvar Ellipta`, `Trelegy Ellipta`, `Anoro Ellipta`, `Incruse Ellipta`, `Avamys`, `Flixonase`, `Nucala`, `Lamictal`, `Imigran`, `Requip XL`, `Seroxat`, `Avodart`, `Combodart`, `Dermovate`, `Betnovate`, `Bactroban`, `Benlysta`, `Zejula`, `Jemperli`), following all 9 strict catalog rules.
  - Registered `GSK` (`GlaxoSmithKline plc`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #4: Pfizer — 52 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #4 (`Pfizer`, `Pfizer Inc.`) starting with `Eliquis`, `Zithromax`, `Xeljanz`, and main presentations of current Pfizer Rx brands (anti-infectives, oncology, inflammation, hospital products; excluding vaccines and excluding Viatris/Upjohn brands such as Lipitor, Norvasc, Celebrex, Lyrica, Viagra, Xanax, Zoloft).
- **Changes (`src/lib/pfizerCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/pfizerCatalogData.ts` with **52 official Pfizer Inc. Rx brand presentations** across 5 therapeutic portfolios (`Eliquis`, `Fragmin`, `Aldactone`, `Vyndaqel`, `Zithromax`, `Unasyn`, `Tygacil`, `Zavicefta`, `Zinforo`, `Zyvox`, `Vfend`, `Diflucan`, `Ecalta`, `Cresemba`, `Dalacin C`, `Xeljanz`, `Enbrel`, `Cibinqo`, `Litfulo`, `Vydura`, `Medrol`, `Solu-Medrol`, `Depo-Medrol`, `Dostinex`, `Genotropin`, `Ibrance`, `Sutent`, `Inlyta`, `Xalkori`, `Lorviqua`, `Bosulif`, `Talzenna`, `Aromasin`, `Camptosar`), following all 9 strict catalog rules.
  - Registered `Pfizer` (`Pfizer Inc.`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #3: Novartis — 59 Brand Drug Drafts)
- **Owner request:** Add Multinational Company #3 (`Novartis`, `Novartis Pharma AG`) following all 9 strict catalog rules (official label data only, exact brand-matching source URLs, INN base generic names without salts/hydrates, all clinical and presentation fields filled, `brandNameAr` = brand + strength only, no prices or Iraqi registration numbers, drafts only, no unverified "marketed in Iraq" notes, current licence holder only excluding Haleon OTC brands, no trailing blank lines).
- **Changes (`src/lib/novartisCatalogData.ts`, `src/lib/chatCatalogData.ts`, `src/lib/sanofiCatalogData.ts`):**
  - Created `src/lib/novartisCatalogData.ts` with **59 official Novartis Pharma AG Rx brand presentations** across 6 therapeutic portfolios (`Diovan`, `Co-Diovan`, `Exforge`, `Exforge HCT`, `Entresto`, `Leqvio`, `Galvus`, `Galvus Met`, systemic Rx `Voltaren` & `Cataflam`, `Tegretol`, `Trileptal`, `Exelon`, `Gilenya`, `Kesimpta`, `Mayzent`, `Aimovig`, `Cosentyx`, `Xolair`, `Ilaris`, `Sandimmun Neoral`, `Myfortic`, `Certican`, `Simulect`, `Glivec`, `Tasigna`, `Jakavi`, `Kisqali`, `Afinitor`, `Femara`, `Revolade`, `Exjade`, `Sandostatin LAR`, `Lucentis`).
  - Wired `Novartis` (`Novartis Pharma AG`) into `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts` and normalized INN base `genericName` and `notes` across `src/lib/chatCatalogData.ts` and `src/lib/sanofiCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR when pushed from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #2: Sanofi Iraq Catalog — 55 Brand Products)
- **Owner request:** Proceed with the 2nd multinational company (`Sanofi`) in the step-by-step Iraq catalog curation workflow, keeping the single-button company drill-down UI.
- **Changes (`src/lib/sanofiCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/sanofiCatalogData.ts` containing **55 official Sanofi (`Sanofi S.A.`) Iraq-marketed brand drug presentations** across 5 therapeutic portfolios:
    1. **Cardiovascular, Thrombosis & Anticoagulants (15 presentations):** Plavix 75 mg & 300 mg, CoPlavix 75 mg/100 mg, Clexane 20 mg/0.2 mL, 40 mg/0.4 mL, 60 mg/0.6 mL & 80 mg/0.8 mL, Aprovel 150 mg & 300 mg, CoAprovel 150 mg/12.5 mg, 300 mg/12.5 mg & 300 mg/25 mg, Cordarone 200 mg tablets & 150 mg/3 mL IV, Lasix 40 mg tablets & 20 mg/2 mL IV, Tritace 2.5 mg, 5 mg & 10 mg, Multaq 400 mg, Praluent 75 mg/mL & 150 mg/mL.
    2. **Diabetes & Endocrinology — Insulins & Oral Antidiabetics (9 presentations):** Lantus SoloStar 100 U/mL, Toujeo SoloStar 300 U/mL, Apidra SoloStar 100 U/mL, Soliqua 100/33 & 100/50 SoloStar, Amaryl 1 mg, 2 mg, 3 mg & 4 mg, Amaryl M 2 mg/500 mg.
    3. **Neurology, Epilepsy & Psychiatry (9 presentations):** Depakine Chrono 300 mg & 500 mg, Depakine 200 mg/mL Oral Solution, Depakine 57.64 mg/mL Syrup, Depakine 400 mg IV, Dogmatil 50 mg capsules & 200 mg tablets, Stilnox 10 mg, Aubagio 14 mg.
    4. **Allergy, Gastroenterology, Spasmolytics & Pain (10 presentations):** Telfast 120 mg & 180 mg, Telfast 30 mg/5 mL Oral Suspension, Enterogermina 2 Billion/5 mL & 4 Billion/5 mL Oral Suspension, No-Spa 40 mg tablets & 40 mg/2 mL ampoules, Essentiale Forte N 300 mg, Maalox Plus Oral Suspension, Profenid 100 mg.
    5. **Anti-Infectives, Immunology, Oncology & Urology (12 presentations):** Targocid 200 mg & 400 mg IV/IM, Claforan 1 g IV/IM, Rovamycine 1.5 MIU & 3 MIU, Flagyl 500 mg tablets & 500 mg/100 mL IV, Rodogyl 750,000 IU/125 mg, Xatral XL 10 mg, Dupixent 300 mg/2 mL & 200 mg/1.14 mL, Taxotere 80 mg/4 mL, Eloxatin 100 mg/20 mL, Jevtana 60 mg/1.5 mL.
  - Registered `Sanofi` (`Sanofi S.A.`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts` so opening the Admin Catalog view auto-syncs Sanofi as the second single company button (`Sanofi`) alongside `AstraZeneca`, with all products saved as `draft` (`not_recorded`).
- **Validation:** `npm test -- --run`, `npm run lint`, and `npm run build` passed cleanly.
- **Next for Claude:** No database schema or Edge Function changes needed.

### 2026-11-01 — Google AI Studio (Full AstraZeneca Iraq Catalog & Single-Button Company Drill-Down UI)
- **Owner request:** Do not expose full product details or all drug choices on the main Admin page—place all drug choices under a single company button (`AstraZeneca`) that opens the company's drugs page when pressed, and only open a drug's details when pressing that drug's name—and add all AstraZeneca products marketed in Iraq.
- **Changes (`src/lib/chatCatalogData.ts`, `src/lib/catalog.ts`, `src/components/AdminCatalogReview.tsx`):**
  - Updated `AdminCatalogReview.tsx` so the main Admin Catalog view shows a single button per company (`AstraZeneca`). Pressing `AstraZeneca` opens the company's page of drug subclasses and compact clickable drug-name buttons, and pressing any drug name opens its full clinical details (`AdminProductInspector`) with `← Back` navigation at every step.
  - Expanded **AstraZeneca (`AstraZeneca PLC`)** in `src/lib/chatCatalogData.ts` to **52 official Iraq-marketed brand drug presentations** across all 7 therapeutic franchises:
    1. **Gastroenterology (PPIs):** `Nexium 20 mg`, `Nexium 40 mg`, `Nexium 10 mg Sachets`, `Nexium IV 40 mg`, `Losec MUPS 20 mg`, `Losec MUPS 40 mg`
    2. **Lipid-Lowering (Statins):** `Crestor 5 mg`, `Crestor 10 mg`, `Crestor 20 mg`, `Crestor 40 mg`
    3. **Diabetes, Heart Failure & CKD (SGLT2 & DPP-4):** `Forxiga 5 mg`, `Forxiga 10 mg`, `Xigduo XR 5 mg / 1000 mg`, `Xigduo XR 10 mg / 1000 mg`, `Qtern 5 mg / 10 mg`, `Onglyza 5 mg`, `Kombiglyze XR 5 mg / 1000 mg`
    4. **Cardiovascular, Hypertension & Renal:** `Brilinta 90 mg`, `Brilinta 60 mg`, `Betaloc ZOK 25 mg`, `Betaloc ZOK 50 mg`, `Betaloc ZOK 100 mg`, `Betaloc ZOK 200 mg`, `Tenormin 50 mg`, `Tenormin 100 mg`, `Atacand 8 mg`, `Atacand 16 mg`, `Atacand 32 mg`, `Atacand Plus 16 mg / 12.5 mg`, `Plendil 5 mg`, `Plendil 10 mg`, `Zestril 10 mg`, `Zestril 20 mg`, `Zestoretic 20 mg / 12.5 mg`, `Lokelma 5 g`
    5. **Respiratory & Immunology:** `Symbicort Turbuhaler 80/4.5 mcg`, `Symbicort Turbuhaler 160/4.5 mcg`, `Symbicort Turbuhaler 320/9 mcg`, `Pulmicort Respules 0.5 mg/2 mL`, `Pulmicort Respules 1 mg/2 mL`, `Pulmicort Turbuhaler 200 mcg`, `Bricanyl Turbuhaler 0.5 mg`, `Rhinocort Aqua 64 mcg`, `Fasenra 30 mg`
    6. **Oncology & Endocrine Oncology:** `Tagrisso 80 mg`, `Lynparza 150 mg`, `Calquence 100 mg`, `Imfinzi 500 mg/10 mL`, `Iressa 250 mg`, `Faslodex 250 mg/5 mL`, `Zoladex 3.6 mg`, `Zoladex LA 10.8 mg`, `Arimidex 1 mg`, `Casodex 50 mg`, `Nolvadex 10 mg`, `Nolvadex-D 20 mg`
    7. **CNS, Anesthesia & Hospital Anti-Infectives:** `Seroquel 25 mg`, `Seroquel 100 mg`, `Seroquel 200 mg`, `Seroquel XR 300 mg`, `Zomig 2.5 mg`, `Xylocaine 2% Jelly`, `Xylocaine 10% Pump Spray`, `Xylocaine 2% Injection`, `Marcaine 0.5% Spinal Heavy`, `Naropin 0.2% (2 mg/mL)`, `Diprivan 1% (10 mg/mL)`, `Meronem 1 g IV`
- **Next for Claude:** Review and merge the synced changes from `ai-studio-catalog`.

### 2026-11-01 — Google AI Studio (Removed in-app Catalog Builder & browser/Express AI layer)
- **Owner decision:** Remove the last two steps (the `@google/genai` / `server.ts` AI layer and the in-app `CatalogBuilder` tab); companies and products will be added through chat workflow rather than an in-app AI Catalog Builder page.
- **Changes (`package.json`, `vite.config.ts`, `src/vite-env.d.ts`, `src/components/AdminCatalogReview.tsx`, `src/lib/catalog.ts`, `src/lib/catalog.test.ts`):**
  - Deleted `server.ts` and `src/components/CatalogBuilder.tsx`, and restored `package.json` to the standard Vite SPA setup.
  - Removed the **Catalog Builder** tab from `AdminCatalogReview.tsx`.
  - Kept the clean Admin Catalog (`Catalog`, `Companies`, and `Doctor Approvals` tabs), hiding of `archived` records, and per-company **Remove** with inline confirmation (`Confirm Remove` / `Cancel`).
- **Next for Claude:** Review and merge the synced changes from `ai-studio-catalog`.

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
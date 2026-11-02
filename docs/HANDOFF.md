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

### 2026-11-02 — Google AI Studio (Speed Fix 1: Dynamic-Import Code Splitting for `chatCatalogData.ts` & Manual Admin Sync Confirmation)
- **Owner request:**
  1. Remove the automatic catalog sync that runs when the admin page opens; keep only the manual `'Sync Chat Catalog'` button with a confirm step.
  2. Load `chatCatalogData.ts` and all `*CatalogData.ts` files ONLY when the admin clicks and confirms that button, using dynamic `import()` so they become a separate chunk that doctors never download.
  3. Ensure `DoctorCatalog` and login/onboarding screens do not import any `*CatalogData.ts` file, directly or indirectly.
  4. Record the `npm run build` size of the main `index-*.js` file before and after in `HANDOFF.md` (target: under 1 MB).
- **Changes (`src/components/AdminCatalogReview.tsx`):**
  - Removed the static top-level import of `../lib/chatCatalogData` and removed the automatic `syncChatApprovedCatalog` call inside `refresh()` when the admin page opens.
  - Added an inline confirmation step (`Confirm Sync` / `Cancel`) to the manual `'Sync Chat Catalog'` button in both the Catalog and Companies headers.
  - Loaded `../lib/chatCatalogData` via dynamic `await import('../lib/chatCatalogData')` exclusively inside `handleManualSyncChatCatalog()`.
  - Verified via `grep -rn "CatalogData" src/` that `DoctorCatalog`, `AuthGate`, `Onboarding`, and `CompanyCatalog` have zero direct or indirect static imports of any `*CatalogData.ts` module.
- **Production Bundle Size (`npm run build` / `tsc -b && vite build`):**
  - **Before (`index-*.js`):** `2,790.44 kB` minified (`gzip: 597.25 kB`; unminified compile output: `3,747,073 bytes` / `3.57 MB`) — all 52 companies' curated drug monographs were bundled into the main chunk.
  - **After (`index-*.js`):** **`906.53 kB`** minified (`gzip: 234.47 kB`) — **under the 1 MB target** (reduced by **1.88 MB / 67.5%**).
  - **Separate Admin On-Demand Chunk (`chatCatalogData-*.js`):** `1,883.91 kB` minified (`gzip: 362.78 kB`) — downloaded only when an administrator clicks `Sync Chat Catalog` → `Confirm Sync`.

### 2026-11-02 — Google AI Studio (Group 4 — Company #52: Nineveh Drug Industry (NDI) — 0 Products + Iraqi Companies Source URL Audit)
- **Owner request:**
  1. Ensure `npm run lint`, `npm test`, and `npm run build` pass.
  2. Add Company #52 (`Nineveh Drug Industry (NDI)`, Mosul, Iraq) with **ZERO products** unless an official online page confirms exact retail trade names and strengths.
  3. Audit all previously added Iraqi company products (`SDI Samarra`, `Pioneer`, `Awamedica`, `Al-Kindi`) in `HANDOFF.md`, listing the exact subpage URL where each trade name was seen or marking `NOT CONFIRMED`.
- **Changes (`src/lib/ndiCatalogData.ts`, `src/lib/chatCatalogData.ts`, `src/lib/sdiSamarraCatalogData.ts`, `src/lib/pioneerCatalogData.ts`, `src/lib/alKindiCatalogData.ts`):**
  - Created `src/lib/ndiCatalogData.ts` with `export const NDI_PRODUCTS: AiProductDraft[] = [];` (0 products) and registered `Nineveh Drug Industry (NDI)` (`key: 'ndi'`) in `src/lib/chatCatalogData.ts`.
  - Updated `sdiSamarraCatalogData.ts`, `pioneerCatalogData.ts`, and `alKindiCatalogData.ts` so confirmed products reference their exact subpage/PDF URLs rather than the bare company homepage.
- **Iraqi Companies Product Source Audit (Exact URL vs. `NOT CONFIRMED`):**
  - **#48 SDI Samarra (`sdi.industry.gov.iq`):**
    1. `Samapril 20 mg` (`سامابريل 20 ملغ`): Listed in Arabic only (`سامابريل 20 ملغ`, row #2) at `https://sdi.industry.gov.iq/public/index.php/show/product?page=18` — English spelling `Samapril` and INN (`Enalapril`) are **NOT CONFIRMED** on that page (table shows Arabic name + pack count `10` only).
    2. `Valiapam 5 mg` (`فالياپام 5 ملغ`): Listed in Arabic only (`فالياپام 5 ملغ`, row #9) at `https://sdi.industry.gov.iq/public/index.php/show/product?page=18` — English spelling `Valiapam` and INN (`Diazepam`) are **NOT CONFIRMED** on that page.
    3. `Dapoxin 10 mg`: Listed in SDI Samarra's official marketing/agency PDF at `https://www.sdi.industry.gov.iq/uploads/files/2025/08/921334_25-08-06-08-53-15_9a3085f3f10bddeeee787073960e1dd5b8fc3cbb.pdf` (no standalone HTML SmPC page).
    4. `Linagliptin SDI 5 mg`: Listed in SDI Samarra's official marketing/agency PDF at `https://www.sdi.industry.gov.iq/uploads/files/2025/08/921334_25-08-06-08-53-15_9a3085f3f10bddeeee787073960e1dd5b8fc3cbb.pdf` (no standalone HTML SmPC page).
  - **#49 Pioneer (`pioneerpharmaceutical.com`):**
    1. `Piocefix 400 mg`: **CONFIRMED** at `https://pioneerpharmaceutical.com/cephalosporin-antibiotics/` (`Piocefix — Cefixime (as trihydrate) — 200 mg, 400 mg Capsule`).
    2. `Piolexine 500 mg`: **CONFIRMED** at `https://pioneerpharmaceutical.com/cephalosporin-antibiotics/` (`Piolexine — Cephalexin (as monohydrate) — 250 mg, 500 mg Capsule`).
    3. `Zinax 500 mg`: **CONFIRMED** at `https://pioneerpharmaceutical.com/cephalosporin-antibiotics/` (`Zinax — Cefuroxime — 250 mg, 500 mg Tablet`).
    4. `Omnimax 0.4 mg`: **NOT CONFIRMED** on `pioneerpharmaceutical.com` (found only on a third-party Scribd order sheet `https://id.scribd.com/document/1077420093/Pioneer-Order-Sheet-21-1-2023-Wp`).
  - **#50 Awamedica (`awamedica.com`):**
    1. `AwaZitro 500 mg`: **NOT CONFIRMED** on `awamedica.com` (found only on third-party Iraqi pharmacy site `https://dalanypharmacy.com/products/awazitro-500mg/`).
    2. `Atorvastatin Awa 40 mg`: **NOT CONFIRMED** on `awamedica.com` (found only on third-party Iraqi pharmacy listings).
    3. `AwaCarvedol 6.25 mg`: **NOT CONFIRMED** on `awamedica.com` (found only on third-party Iraqi pharmacy listings).
    4. `Mefenamic Awa 250 mg`: **NOT CONFIRMED** on `awamedica.com` (found only on third-party Iraqi pharmacy site `https://dalanypharmacy.com/products/mefenamic-awa-250mg-1-20cap/`).
  - **#51 Al-Kindi (`alkindipharma.com`):**
    1. `Azithrokindin 500 mg`: Listed as `AZITHROKINDIN 500` on `https://www.alkindipharma.com/shop?page=4` (slug `azithrokindin-500`; strength `500 mg` and INN are **NOT CONFIRMED** by a full SmPC on the catalog card).
    2. `Amlodepen 5 mg`: Listed as `AMLODEPEN 5 TABLETS` on `https://www.alkindipharma.com/shop?page=4` (slug `amlodepen-5-tablets`; `5 mg` unit and full SmPC are **NOT CONFIRMED** on the catalog card).
    3. `Lyrikine 75 mg`: Listed as `LYRIKINE 75 CAPSULES` on `https://www.alkindipharma.com/shop-1` and `https://www.alkindipharma.com/shop?page=4` (slug `lyrikine-75-capsules`; `75 mg` unit and full SmPC are **NOT CONFIRMED** on the catalog card).
    4. `Calcium-Kindi 500 mg`: **CONFIRMED** at `https://www.alkindipharma.com/ar/product-page/calcium-kindi-tablets` (`CALCIUM-KINDI TABLETS — Calcium Carbonate 500 mg/Tab`).
  - **#52 Nineveh Drug Industry (NDI):**
    - Added with **0 products** (no official online product page confirms individual retail trade names and strengths).

### 2026-11-02 — Google AI Studio (Group 4 — Company #51: Al-Kindi — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #51 (`Al-Kindi` / `Al-Kindi Co. for Pharmaceutical Industry, Laboratory Equipment & Cosmetics Ltd.`, Baghdad, Iraq) with confirmed Rx products from Al-Kindi's official website catalog (`Azithrokindin 500 mg` [Azithromycin], `Amlodepen 5 mg` [Amlodipine], `Lyrikine 75 mg` [Pregabalin], `Calcium-Kindi 500 mg` [Calcium carbonate]).
- **Changes (`src/lib/alKindiCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/alKindiCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Al-Kindi` (`key: 'al_kindi'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 4 — Company #50: Awamedica — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #50 (`Awamedica` / `Awamedica Pharmaceutical Company`, Erbil, Iraq) with confirmed Rx products from Awamedica's official portfolio (`AwaZitro 500 mg` [Azithromycin], `Atorvastatin Awa 40 mg` [Atorvastatin], `AwaCarvedol 6.25 mg` [Carvedilol], `Mefenamic Awa 250 mg` [Mefenamic acid]).
- **Changes (`src/lib/awamedicaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/awamedicaCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Awamedica` (`key: 'awamedica'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 4 — Company #49: Pioneer — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #49 (`Pioneer` / `Pioneer Co. for Pharmaceutical Industries`, Sulaymaniyah, Iraq) with confirmed Rx products from Pioneer's official portfolio (`Piocefix 400 mg` [Cefixime], `Piolexine 500 mg` [Cefalexin], `Zinax 500 mg` [Cefuroxime], `Omnimax 0.4 mg` [Tamsulosin]).
- **Changes (`src/lib/pioneerCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/pioneerCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Pioneer` (`key: 'pioneer'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 4 — Company #48: SDI Samarra — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #48 (`SDI Samarra` / `State Company for Drugs Industry and Medical Appliances (SDI)`, Samarra, Iraq — first of Group 4 Iraqi manufacturers) with confirmed Rx products from the official SDI Samarra product directory (`Samapril 20 mg` [Enalapril], `Valiapam 5 mg` [Diazepam], `Dapoxin 10 mg` [Dapagliflozin], `Linagliptin SDI 5 mg` [Linagliptin]).
- **Changes (`src/lib/sdiSamarraCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/sdiSamarraCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `SDI Samarra` (`key: 'sdi_samarra'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 3 — Company #47: Nobel Ilac — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #47 (`Nobel Ilac` / `Nobel İlaç San. ve Tic. A.Ş.`, Turkey — last of Group 3 MENA/Turkish manufacturers) with confirmed own-brand Rx products from official Turkish KÜB (SmPC) sources (`Etol Fort 400 mg` [Etodolac], `Pulcet 40 mg` [Pantoprazole], `Ultrox 20 mg` [Rosuvastatin], `Lansoprol 30 mg` [Lansoprazole]).
- **Changes (`src/lib/nobelIlacCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/nobelIlacCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Nobel Ilac` (`key: 'nobel_ilac'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 3 — Company #46: Deva Holding — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #46 (`Deva Holding` / `Deva Holding A.Ş.`, Turkey) with confirmed own-brand Rx products from official Turkish KÜB (SmPC) sources (`Amoklavin BID 1000 mg` [Amoxicillin + Clavulanic acid], `Azitro 500 mg` [Azithromycin], `Candexil 16 mg` [Candesartan], `Dikloron 50 mg` [Diclofenac]).
- **Changes (`src/lib/devaHoldingCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/devaHoldingCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Deva Holding` (`key: 'deva_holding'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 3 — Company #45: Bilim Ilac — 4 Current Rx Brand Drafts)
- **Owner request:** Add Company #45 (`Bilim Ilac` / `Bilim İlaç San. ve Tic. A.Ş.`, Turkey) with confirmed own-brand Rx products from official Turkish KÜB (SmPC) sources (`Klamoks BID 1000 mg` [Amoxicillin + Clavulanic acid], `Zespira 10 mg` [Montelukast], `Raneks 20 mg` [Rabeprazole], `Glifix 30 mg` [Pioglitazone]).
- **Changes (`src/lib/bilimIlacCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/bilimIlacCatalogData.ts` with 4 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Bilim Ilac` (`key: 'bilim_ilac'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Group 3 — Company #44: Abdi Ibrahim — 5 Current Rx Brand Drafts)
- **Owner request:** Add Company #44 (`Abdi Ibrahim` / `Abdi İbrahim İlaç San. ve Tic. A.Ş.`, Turkey) with confirmed own-brand Rx products from official Turkish KÜB (SmPC) sources (`Protonex 40 mg` [Pantoprazole], `Onceair 10 mg` [Montelukast], `Cetryn 10 mg` [Cetirizine], `Parkyn 1 mg` [Pramipexole], `Pixart 30 mg` [Pioglitazone]).
- **Changes (`src/lib/abdiIbrahimCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/abdiIbrahimCatalogData.ts` with 5 complete Rx drafts including `category: 'prescription_drug'`, `drugClass`, INN base `genericName`, Arabic brand + strength `brandNameAr`, and structured `clinical` fields.
  - Registered `Abdi Ibrahim` (`key: 'abdi_ibrahim'`) in `src/lib/chatCatalogData.ts`.

### 2026-11-02 — Google AI Studio (Build Fix + Group 3 — Company #43: Pharco — 5 Current Rx Brand Drafts)
- **Owner request:** Fix TypeScript build and ensure Pharco (`Pharco Pharmaceuticals`, Egypt) includes `category: 'prescription_drug'`, `drugClass`, and full `clinical` object on all 5 confirmed Rx products (`Amrizole`, `Cefaxone`, `Ciprofar`, `Farcolin`, `Gratisovir`).
- **Changes (`src/lib/pharcoCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Updated `PHARCO_PRODUCTS` to import `AiProductDraft` from `./catalog` and include `found: true`, `category: 'prescription_drug'`, `drugClass`, and structured `clinical` fields on all 5 Pharco presentations.
- **Next for Claude / Owner:** Review Pharco catalog drafts and proceed to Company #44 (Abdi Ibrahim).

### 2026-11-02 — Google AI Studio (Group 3 — Company #42: EIPICO — 5 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #42: EIPICO (`Egyptian International Pharmaceutical Industries Co. (EIPICO)`, Egypt) with confirmed official-portfolio branded Rx products (`Flumox`, `Epicephin`, `Cefotax`, `Epirazole`, `Epigent`).
- **Changes (`src/lib/eipicoCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `EIPICO_PRODUCTS` (5 official-label Rx presentations across 5 confirmed EIPICO brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin + Flucloxacillin`, `Ceftriaxone`, `Cefotaxime`, `Omeprazole`, `Gentamicin`) with complete clinical/presentation fields and official EIPICO sources.
  - Registered `EIPICO` (`Egyptian International Pharmaceutical Industries Co. (EIPICO)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync EIPICO catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #41: EVA Pharma — 6 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #41: EVA Pharma (`EVA Pharma for Pharmaceuticals and Medical Appliances S.A.E.`, Egypt) with confirmed official-portfolio branded Rx products (`Thiotacid`, `Mellitofix`, `Atoreza`).
- **Changes (`src/lib/evaPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `EVA_PHARMA_PRODUCTS` (6 official-label Rx presentations across 3 confirmed EVA Pharma brands using exact pack trade names + strengths and INN base generic names: `Thioctic acid`, `Empagliflozin`, `Ezetimibe + Atorvastatin`) with complete clinical/presentation fields and official EVA Pharma sources.
  - Registered `EVA Pharma` (`EVA Pharma for Pharmaceuticals and Medical Appliances S.A.E.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync EVA Pharma catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #40: Hayat Pharmaceuticals — 4 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #40: Hayat Pharmaceuticals (`Hayat Pharmaceutical Industries Co.`, Jordan) with confirmed official-portfolio branded Rx products (`Biodal`, `Xenodol`, `Alpranax`).
- **Changes (`src/lib/hayatPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `HAYAT_PHARMA_PRODUCTS` (4 official-label Rx presentations across 3 confirmed Hayat Pharmaceuticals brands using exact pack trade names + strengths and INN base generic names: `Colecalciferol`, `Lornoxicam`, `Alprazolam`) with complete clinical/presentation fields and official Hayat Pharma sources.
  - Registered `Hayat Pharmaceuticals` (`Hayat Pharmaceutical Industries Co.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Hayat Pharmaceuticals catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #39: United Pharmaceuticals — 6 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #39: United Pharmaceuticals (`The United Pharmaceutical Manufacturing Co. Ltd.`, Jordan) with confirmed official-portfolio branded Rx products (`Unicast`, `Unicam`, `Unifed`, `Unidox`).
- **Changes (`src/lib/unitedPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `UNITED_PHARMA_PRODUCTS` (6 official-label Rx presentations across 4 confirmed United Pharmaceuticals brands using exact pack trade names + strengths and INN base generic names: `Montelukast`, `Piroxicam`, `Pseudoephedrine + Triprolidine`, `Doxycycline`) with complete clinical/presentation fields and official UPM / MS Pharma sources.
  - Registered `United Pharmaceuticals` (`The United Pharmaceutical Manufacturing Co. Ltd.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync United Pharmaceuticals catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #38: JOSWE — 7 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #38: JOSWE (`Jordan Sweden Medical and Sterilization Co. (JOSWE Medical)`, Jordan) with confirmed official-portfolio branded Rx products (`Arbiten`, `Corteza`, `B-Cor`, `Clovex`, `Evox`).
- **Changes (`src/lib/josweCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `JOSWE_PRODUCTS` (7 official-label Rx presentations across 5 confirmed JOSWE brands using exact pack trade names + strengths and INN base generic names: `Valsartan`, `Rosuvastatin`, `Bisoprolol`, `Clopidogrel`, `Levofloxacin`) with complete clinical/presentation fields and official JOSWE Medical sources.
  - Registered `JOSWE` (`Jordan Sweden Medical and Sterilization Co. (JOSWE Medical)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync JOSWE catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #37: Riyadh Pharma — 5 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #37: Riyadh Pharma (`Medical and Cosmetic Products Company Ltd. (Riyadh Pharma)`, Saudi Arabia) with confirmed SFDA-registered branded Rx products (`Gastrozole`, `Riapanta`, `Simvagen Plus`, `Lorahist`).
- **Changes (`src/lib/riyadhPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `RIYADH_PHARMA_PRODUCTS` (5 official-label Rx presentations across 4 confirmed Riyadh Pharma brands using exact pack trade names + strengths and INN base generic names: `Omeprazole`, `Pantoprazole`, `Ezetimibe + Simvastatin`, `Loratadine`) with complete clinical/presentation fields and official SFDA/Riyadh Pharma sources.
  - Registered `Riyadh Pharma` (`Medical and Cosmetic Products Company Ltd. (Riyadh Pharma)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Riyadh Pharma catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #36: Jamjoom — 7 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #36: Jamjoom (`Jamjoom Pharmaceuticals Factory Co. (Jamjoom Pharma)`, Saudi Arabia) with confirmed flagship ophthalmology, dermatology, and GI branded Rx products (`Acretin`, `Hyfresh`, `Optiflox`, `Optidex-T`, `Xolamol`, `Dompy`).
- **Changes (`src/lib/jamjoomCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `JAMJOOM_PRODUCTS` (7 official-label Rx presentations across 6 confirmed Jamjoom brands using exact pack trade names + strengths and INN base generic names: `Tretinoin`, `Sodium hyaluronate`, `Ofloxacin`, `Tobramycin + Dexamethasone`, `Dorzolamide + Timolol`, `Domperidone`) with complete clinical/presentation fields and official Jamjoom Pharma sources.
  - Registered `Jamjoom` (`Jamjoom Pharmaceuticals Factory Co. (Jamjoom Pharma)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Jamjoom catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #35: SPIMACO — 8 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #35: SPIMACO (`SPIMACO Addwaeih`, Saudi Arabia) with confirmed flagship branded Rx products (`Klavox`, `Zimax`, `Cipromax`, `Sapofen`).
- **Changes (`src/lib/spimacoCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `SPIMACO_PRODUCTS` (8 official-label Rx presentations across 4 confirmed SPIMACO brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin + Clavulanic acid`, `Azithromycin`, `Ciprofloxacin`, `Ibuprofen`) with complete clinical/presentation fields and official SPIMACO sources.
  - Registered `SPIMACO` (`Saudi Pharmaceutical Industries & Medical Appliances Corporation (SPIMACO Addwaeih)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync SPIMACO catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #34: Tabuk — 7 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #34: Tabuk (`Tabuk Pharmaceutical Manufacturing Co.`, Saudi Arabia) with confirmed flagship branded Rx products (`Tabuvan`, `Co-Tabuvan`, `Toprazole`, `Divido`).
- **Changes (`src/lib/tabukCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `TABUK_PRODUCTS` (7 official-label Rx presentations across 4 confirmed Tabuk brands using exact pack trade names + strengths and INN base generic names: `Valsartan`, `Valsartan + Hydrochlorothiazide`, `Pantoprazole`, `Diclofenac`) with complete clinical/presentation fields and official Tabuk sources.
  - Registered `Tabuk` (`Tabuk Pharmaceutical Manufacturing Co.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Tabuk catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #33: Julphar — 9 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #33: Julphar (`Gulf Pharmaceutical Industries (Julphar)`, UAE) with confirmed flagship branded Rx products (`Julmentin`, `Julphamox`, `Profinal`, `Jusprin`, `Mebo`).
- **Changes (`src/lib/julpharCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `JULPHAR_PRODUCTS` (9 official-label Rx presentations across 5 confirmed Julphar brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin + Clavulanic acid`, `Amoxicillin`, `Ibuprofen`, `Acetylsalicylic acid`, `Beta-sitosterol`) with complete clinical/presentation fields and official Julphar sources.
  - Registered `Julphar` (`Gulf Pharmaceutical Industries (Julphar)`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Julphar catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #32: Dar Al Dawa — 8 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #32: Dar Al Dawa (`Dar Al Dawa Development & Investment Co.`, Jordan) with confirmed flagship branded Rx products (`Ciprodar`, `Claridar`, `Hyposec`, `Lansodar`, `Amlodar`, `Diclogesic`).
- **Changes (`src/lib/darAlDawaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `DAR_AL_DAWA_PRODUCTS` (8 official-label Rx presentations across 6 confirmed Dar Al Dawa brands using exact pack trade names + strengths and INN base generic names: `Ciprofloxacin`, `Clarithromycin`, `Omeprazole`, `Lansoprazole`, `Amlodipine`, `Diclofenac`) with complete clinical/presentation fields and official Dar Al Dawa sources.
  - Registered `Dar Al Dawa` (`Dar Al Dawa Development & Investment Co.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Dar Al Dawa catalog drafts.

### 2026-11-02 — Google AI Studio (Group 3 — Company #31: Hikma — 10 Current Rx Brand Drafts)
- **Owner request:** Add Group 3 (MENA) Company #31: Hikma (`Hikma Pharmaceuticals PLC`, Jordan/UK) with confirmed flagship MENA branded Rx products (`Amoclan`, `Suprax`, `Omnicef`, `Zomax`, `Rofenac`).
- **Changes (`src/lib/hikmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `HIKMA_PRODUCTS` (10 official-label Rx presentations across 5 confirmed Hikma MENA brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin + Clavulanic acid`, `Cefixime`, `Cefdinir`, `Azithromycin`, `Diclofenac`) with complete clinical/presentation fields and official Hikma sources.
  - Registered `Hikma` (`Hikma Pharmaceuticals PLC`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Hikma catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #30: Chiesi — 10 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #30: Chiesi (`Chiesi Farmaceutici S.p.A.`, Italy) starting with `Foster`, `Clenil`, `Trimbow`, `Curosurf`, plus confirmed EMA Chiesi brand (`Peyona`).
- **Changes (`src/lib/chiesiCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `CHIESI_PRODUCTS` (10 official-label Rx presentations across 5 confirmed Chiesi brands using Middle East pack trade names + strengths and INN base generic names: `Beclometasone + Formoterol`, `Beclometasone`, `Beclometasone + Formoterol + Glycopyrronium`, `Poractant alfa`, `Caffeine`) with complete clinical/presentation fields and official EMA / UK EMC sources.
  - Registered `Chiesi` (`Chiesi Farmaceutici S.p.A.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Chiesi catalog drafts (completing Group 2).

### 2026-11-02 — Google AI Studio (Group 2 — Company #29: Recordati — 10 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #29: Recordati (`Recordati Industria Chimica e Farmaceutica S.p.A.`, Italy) starting with `Zanidip`, `Urorec`, `Lomexin`, plus confirmed main Recordati brands (`Zanipress`, `Livazo`, `Urispas`).
- **Changes (`src/lib/recordatiCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `RECORDATI_PRODUCTS` (10 official-label Rx presentations across 6 confirmed Recordati brands using exact pack trade names + strengths and INN base generic names: `Lercanidipine`, `Enalapril + Lercanidipine`, `Silodosin`, `Fenticonazole`, `Pitavastatin`, `Flavoxate`) with complete clinical/presentation fields and official EMA / UK EMC / Recordati sources.
  - Registered `Recordati` (`Recordati Industria Chimica e Farmaceutica S.p.A.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Recordati catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #28: Teva / Actavis — 10 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #28: Teva / Actavis (`Teva Pharmaceutical Industries Ltd.`, including Pliva/Actavis) starting with `Sumamed` (excluding `Decapeptyl` which belongs to Ipsen/Ferring in most markets), plus confirmed EMA/EMC Teva brands (`Copaxone`, `Ajovy`, `Azilect`, `Lonquex`, `DuoResp Spiromax`).
- **Changes (`src/lib/tevaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `TEVA_PRODUCTS` (10 official-label Rx presentations across 6 confirmed Teva / Pliva brands using exact pack trade names + strengths and INN base generic names: `Azithromycin`, `Glatiramer acetate`, `Fremanezumab`, `Rasagiline`, `Lipegfilgrastim`, `Budesonide + Formoterol`) with complete clinical/presentation fields and official EMA / UK EMC sources.
  - Registered `Teva / Actavis` (`Teva Pharmaceutical Industries Ltd.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Teva / Actavis catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #27: Medochemie — 9 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #27: Medochemie (`Medochemie Ltd`, Cyprus) starting with `Medoclav`, `Medoflucon`, plus confirmed main Medochemie brands (`Medoprazole`, `Medociprin`, `Axetine`, `Medopenem`).
- **Changes (`src/lib/medochemieCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `MEDOCHEMIE_PRODUCTS` (9 official-label Rx presentations across 6 confirmed Medochemie brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin + Clavulanic acid`, `Fluconazole`, `Omeprazole`, `Ciprofloxacin`, `Cefuroxime`, `Meropenem`) with complete clinical/presentation fields and official Medochemie product page sources.
  - Registered `Medochemie` (`Medochemie Ltd`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Medochemie catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #26: Denk Pharma — 14 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #26: Denk Pharma (`Denk Pharma GmbH & Co. KG`, Germany) starting with `Amoxi-Denk`, `Panto-Denk`, `Azithro-Denk`, `Captopril Denk`, plus confirmed main Denk Pharma brands (`Amlo-Denk`, `Losar-Denk`, `Cipro-Denk`, `Metformin Denk`).
- **Changes (`src/lib/denkPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `DENK_PHARMA_PRODUCTS` (14 official-label Rx presentations across 8 confirmed Denk Pharma brands using exact pack trade names + strengths and INN base generic names: `Amoxicillin`, `Pantoprazole`, `Azithromycin`, `Captopril`, `Amlodipine`, `Losartan`, `Ciprofloxacin`, `Metformin`) with complete clinical/presentation fields and official Denk Pharma product page sources.
  - Registered `Denk Pharma` (`Denk Pharma GmbH & Co. KG`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Denk Pharma catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #25: Zentiva — 12 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #25: Zentiva (`Zentiva, k.s.`, Czech Republic) starting with `Helicid`, `Agen`, `Torvacard`, `Zodac`, plus confirmed main Zentiva brands (`Lozap`, `Lozap H`, `Clopidogrel Zentiva`).
- **Changes (`src/lib/zentivaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `ZENTIVA_PRODUCTS` (12 official-label Rx presentations across 7 confirmed Zentiva brands using exact pack trade names + strengths and INN base generic names: `Omeprazole`, `Amlodipine`, `Atorvastatin`, `Cetirizine`, `Losartan`, `Losartan + Hydrochlorothiazide`, `Clopidogrel`) with complete clinical/presentation fields and official EMA / Zentiva / SÚKL sources.
  - Registered `Zentiva` (`Zentiva, k.s.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Zentiva catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #24: Gedeon Richter — 13 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #24: Gedeon Richter (`Gedeon Richter Plc.`, Hungary) starting with `Cavinton`, `Mydocalm`, `Escapelle`, `Postinor`, `Verospiron` (excluding withdrawn `Esmya`), plus confirmed EMA/official Gedeon Richter brands (`Reagila`, `Ryeqo`, `Terrosa`).
- **Changes (`src/lib/gedeonRichterCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `GEDEON_RICHTER_PRODUCTS` (13 official-label Rx presentations across 8 confirmed Gedeon Richter brands using exact pack trade names + strengths and INN base generic names: `Vinpocetine`, `Tolperisone`, `Levonorgestrel`, `Spironolactone`, `Cariprazine`, `Relugolix + Estradiol + Norethisterone`, `Teriparatide`) with complete clinical/presentation fields and official EMA / Gedeon Richter sources.
  - Registered `Gedeon Richter` (`Gedeon Richter Plc.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Gedeon Richter catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #23: KRKA — 20 Current Rx Brand Drafts)
- **Owner request:** Add Group 2 Company #23: KRKA (`KRKA, d.d., Novo mesto`, Slovenia) starting with `Atoris`, `Nolpaza`, `Lorista`, `Enap`, `Prenessa`, `Fromilid`, plus confirmed main KRKA brands (`Lorista H`, `Co-Prenessa`, `Valsacor`, `Roswera`, `Tolura`, `Enap-H`).
- **Changes (`src/lib/krkaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `KRKA_PRODUCTS` (20 official-label Rx presentations across 12 confirmed KRKA brands using exact pack trade names + strengths and INN base generic names: `Atorvastatin`, `Pantoprazole`, `Losartan`, `Losartan + Hydrochlorothiazide`, `Enalapril`, `Enalapril + Hydrochlorothiazide`, `Perindopril`, `Perindopril + Indapamide`, `Clarithromycin`, `Valsartan`, `Rosuvastatin`, `Telmisartan`) with complete clinical/presentation fields and official KRKA SmPC / EMA EPAR sources.
  - Registered `KRKA` (`KRKA, d.d., Novo mesto`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync KRKA catalog drafts.

### 2026-11-02 — Google AI Studio (Group 2 — Company #22: Sandoz — 19 Current Rx Brand Drafts)
- **Owner request:** Add Company #22: Sandoz (`Sandoz Group AG`, Switzerland) starting with Sandoz amoxicillin/clavulanic acid (`Curam`), Sandoz losartan (`Losartan Sandoz`), `Zarzio`, plus `Zinnat`, `Zinacef`, and `Fortum` (acquired from GSK in 2021), and current Sandoz biosimilars (`Binocrit`, `Omnitrope`, `Hyrimoz`, `Rixathon`; strictly excluding `Omez`).
- **Changes (`src/lib/sandozCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `SANDOZ_PRODUCTS` (19 official-label Rx presentations across 10 Sandoz brands using exact pack trade names and INN base generic names: `Amoxicillin + Clavulanic acid`, `Losartan`, `Cefuroxime`, `Ceftazidime`, `Filgrastim`, `Epoetin alfa`, `Somatropin`, `Adalimumab`, `Rituximab`) with complete clinical/presentation fields and official EMA/UK EMC/Sandoz sources.
  - Registered `Sandoz` (`Sandoz Group AG`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Sandoz catalog drafts.

### 2026-11-02 — Google AI Studio (Multinational Company #21: Ferring — 21 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #21: Ferring (`Ferring Pharmaceuticals`, Switzerland) starting with `Pentasa`, `Minirin`, and other current Ferring brands marketed in the Middle East (`Minirin Melt`, `Menopur`, `Gonapeptyl`, `Gonapeptyl Depot`, `Firmagon`, `Rekovelle`, `Propess`, `Glypressin`, `Picoprep`, `Tractocile`, `Pabal`; strictly excluding `Merional` which belongs to IBSA).
- **Changes (`src/lib/ferringCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `FERRING_PRODUCTS` (21 official-label Rx presentations across 11 Ferring brands using Middle East brand names and INN base generic names: `Mesalazine`, `Desmopressin`, `Menotropin`, `Triptorelin`, `Degarelix`, `Follitropin delta`, `Dinoprostone`, `Terlipressin`, `Sodium picosulfate + Magnesium oxide + Citric acid`, `Atosiban`, `Carbetocin`) with complete clinical/presentation fields and official EMA/UK EMC sources.
  - Registered `Ferring` (`Ferring Pharmaceuticals`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Ferring catalog drafts (completing Multinational Group 1).

### 2026-11-02 — Google AI Studio (Multinational Company #20: LEO Pharma — 19 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #20: LEO Pharma (`LEO Pharma A/S`, Denmark) starting with `Fucidin`, `Fucicort`, `Daivobet`, `Innohep`, and other current LEO Pharma brands marketed in the Middle East (`Fucidin H`, `Fucithalmic`, `Enstilar`, `Xamiol`, `Daivonex`, `Adtralza`, `Protopic`; one Middle East name per product and INN base generic names including `'Fusidic acid'` for both Fucidin cream and sodium fusidate ointment/tablets).
- **Changes (`src/lib/leoPharmaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `LEO_PHARMA_PRODUCTS` (19 official-label Rx presentations across 11 LEO Pharma brands using Middle East brand names and INN base generic names: `Fusidic acid`, `Fusidic acid + Betamethasone`, `Fusidic acid + Hydrocortisone`, `Calcipotriol + Betamethasone`, `Calcipotriol`, `Tinzaparin`, `Tralokinumab`, `Tacrolimus`) with complete clinical/presentation fields and official EMA/UK EMC/LEO Pharma sources.
  - Registered `LEO Pharma` (`LEO Pharma A/S`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync LEO Pharma catalog drafts.

### 2026-11-02 — Google AI Studio (Multinational Company #19: Menarini — 18 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #19: Menarini (`A. Menarini Industrie Farmaceutiche Riunite S.r.l.`, Italy) starting with `Nebilet`, `Adenuric`, `Fastum Gel`, `Enantyum`, and other current Menarini brands where Menarini or its regional/group company is the licence holder (`Nebilet Plus`, `Ranexa`, `Zofenil`, `Zofenil Plus`, `Bilaxten`, `Priligy`; strictly excluding `Elevit`, uncertain third-party licensed brands, and duplicate country names).
- **Changes (`src/lib/menariniCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `MENARINI_PRODUCTS` (18 official-label Rx presentations across 10 Menarini brands using Middle East brand names and INN base generic names: `Nebivolol`, `Nebivolol + Hydrochlorothiazide`, `Febuxostat`, `Ketoprofen`, `Dexketoprofen`, `Ranolazine`, `Zofenopril`, `Zofenopril + Hydrochlorothiazide`, `Bilastine`, `Dapoxetine`) with complete clinical/presentation fields and official EMA/UK EMC/Menarini sources.
  - Registered `Menarini` (`A. Menarini Industrie Farmaceutiche Riunite S.r.l.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Menarini catalog drafts.

### 2026-11-02 — Google AI Studio (Multinational Company #18: Astellas — 22 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #18: Astellas (`Astellas Pharma Inc.`, Japan) starting with `Omnic Ocas`, `Betmiga`, `Vesicare`, `Prograf`, and other current Astellas Rx brands marketed in the Middle East (`Omnic`, `Vesomni`, `Advagraf`, `Xtandi`, `Xospata`, `Padcev`, `Mycamine`; strictly excluding `Suprax` and duplicate country names).
- **Changes (`src/lib/astellasCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `ASTELLAS_PRODUCTS` (22 official-label Rx presentations across 11 Astellas brands using Middle East brand names and INN base generic names: `Tamsulosin`, `Mirabegron`, `Solifenacin`, `Solifenacin + Tamsulosin`, `Tacrolimus`, `Enzalutamide`, `Gilteritinib`, `Enfortumab vedotin`, `Micafungin`) with complete clinical/presentation fields and official EMA/UK EMC sources.
  - Registered `Astellas` (`Astellas Pharma Inc.`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Astellas catalog drafts.

### 2026-11-02 — Google AI Studio (Stable `.order('id')` Tie-Breakers on Paged Queries & Multinational Company #17: Takeda)
- **Owner request:** Add `.order('id')` as the last order (tie-breaker) to every query paged with `.range(from, to)` in `src/lib/catalog.ts`, then add Multinational Company #17: Takeda (`Takeda Pharmaceutical Company Limited`, Japan) with official-label Rx presentations.
- **Changes (`src/lib/catalog.ts`, `src/lib/takedaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Added `.order('id')` before `.range(from, to)` on all 16 paged queries in `loadDrugClasses`, `loadGenericDrugs`, `loadSpecialtiesCatalog`, `loadCompanies`, and `loadCatalogBundle` so rows cannot be skipped or repeated across pages.
  - Added `TAKEDA_PRODUCTS` (32 official-label Rx presentations across 16 Takeda brands: `Pantoloc`, `Controloc`, `Dexilant`, `Entyvio`, `Edarbi`, `Edarbyclor`, `Ninlaro`, `Alunbrig`, `Adcetris`, `Takhzyro`, `Vpriv`, `Replagal`, `Elaprase`, `Advate`, `Adynovi`, `Feiba`; older MEA brands divested to Acino in 2020 omitted) and registered `Takeda` (`Takeda Pharmaceutical Company Limited`) in `CHAT_CURATED_COMPANIES`.
- **Next for Claude / Owner:** Review and push to sync Takeda drafts and stable pagination tie-breakers.

### 2026-11-02 — Google AI Studio (Fix Catalog Child Query Chunking & 1,000-Row Pagination)
- **Owner request:** Fix `'Untitled Product'` bug caused by PostgREST's 1,000-row response limit when loading `product_translations` (now 1,606 rows) and other child/list tables in `src/lib/catalog.ts`.
- **Changes (`src/lib/catalog.ts`, `src/lib/catalog.test.ts`):**
  - Added `fetchInChunksPaged` (splits ID lists into chunks of 150 IDs and pages each chunk with `.range(from, from + 999)` until fewer than 1,000 rows return) and `fetchAllPages` (pages list queries with `.range(from, from + 999)` until fewer than 1,000 rows return).
  - Updated all `.in(...)` child queries (`product_translations`, `product_markets`, `product_specialties`, `product_media`, `product_search_keywords`, `product_ai_drafts`, `product_market_translations`, `product_brochures`, `drug_class_translations`, `generic_drug_translations`, `specialty_translations`) and all catalog/taxonomy list queries (`products`, `companies`, `drug_classes`, `generic_drugs`, `specialties`) to use the helpers.
  - Added unit tests in `src/lib/catalog.test.ts` covering 150-ID chunking and 1,000-row range pagination.
- **No database/CI changes:** `supabase/` and `.github/` untouched.

### 2026-11-01 — Google AI Studio (Multinational Company #16: Janssen — 52 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #16 (`Janssen`, `Janssen Pharmaceutica NV`, Belgium/USA — Johnson & Johnson Innovative Medicine) starting with `Risperdal`, `Invega`, `Topamax`, `Stelara`, `Remicade`, and main presentations of current Janssen Rx brands (`Risperdal Consta`, `Xeplion`, `Trevicta`, `Spravato`, `Concerta XL`, `Durogesic`, `Simponi`, `Tremfya`, `Darzalex`, `Imbruvica`, `Zytiga`, `Erleada`, `Velcade`, `Edurant`, `Prezista`, `Symtuza`, `Sporanox`, `Opsumit`, `Uptravi`; strictly excluding `Motilium`, `Xarelto`, and Kenvue consumer brands such as `Tylenol`, `Nizoral`, and `Daktarin`).
- **Changes (`src/lib/janssenCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/janssenCatalogData.ts` with **52 official Janssen Pharmaceutica NV Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Janssen` (`Janssen Pharmaceutica NV`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #15: AbbVie — 34 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #15 (`AbbVie`, `AbbVie Inc.`, USA) starting with `Humira`, `Rinvoq`, `Skyrizi`, `Botox`, and main presentations of current AbbVie Rx brands (`Venclyxto`, `Tepkinly`, `Lucrin Depot`, `Duodopa`, `Aquipta`, `Sevorane`, `Maviret`, `Ozurdex`, `Ganfort`, `Lumigan`, `Combigan`, `Alphagan`; strictly excluding `Imbruvica` which is marketed by Janssen outside the US, `Synagis` which belongs to Sobi, aesthetic fillers such as `Juvederm`, and medical devices).
- **Changes (`src/lib/abbvieCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/abbvieCatalogData.ts` with **34 official AbbVie Inc. Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `AbbVie` (`AbbVie Inc.`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #14: Abbott — 43 Current Brand Drafts)
- **Owner request:** Add Multinational Company #14 (`Abbott`, `Abbott Laboratories`, USA — Established Pharmaceuticals Division) starting with `Duphaston`, `Creon`, `Brufen`, `Klaricid`, `Dicetel`, and main presentations of current Abbott brands (`Femoston`, `Femoston Conti`, `Duspatalin`, `Duspatalin Retard`, `Ganaton`, `Duphalac`, `Heptral`, `Betaserc`, `Luvox`, `Physiotens`, `Lipanthyl`, `Isoptin`, `Rytmonorm`, `Tarka`, `Omacor`; excluding vaccines such as Influvac, nutrition products, devices, and brands not held by Abbott in the region).
- **Changes (`src/lib/abbottCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/abbottCatalogData.ts` with **43 official Abbott Laboratories brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Abbott` (`Abbott Laboratories`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #13: Roche — 49 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #13 (`Roche`, `F. Hoffmann-La Roche Ltd`, Switzerland) starting with `Rocephin`, `Rivotril`, `CellCept`, `Actemra`, `Herceptin`, `Avastin`, and main presentations of current Roche Rx brands (`MabThera`, `Perjeta`, `Phesgo`, `Kadcyla`, `Tecentriq`, `Alecensa`, `Gazyvaro`, `Polivy`, `Xeloda`, `Madopar`, `Ocrevus`, `Evrysdi`, `Enspryng`, `Hemlibra`, `Tamiflu`, `Xofluza`, `Mircera`, `NeoRecormon`, `Pulmozyme`, `Vabysmo`; strictly excluding brands divested to Cheplapharm/Pharma& such as Xenical, Valcyte, Pegasys, and Lexotanil, and excluding diagnostics).
- **Changes (`src/lib/rocheCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/rocheCatalogData.ts` with **49 official F. Hoffmann-La Roche Ltd Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Roche` (`F. Hoffmann-La Roche Ltd`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #12: Servier — 29 Current Brand Drafts)
- **Owner request:** Add Multinational Company #12 (`Servier`, `Les Laboratoires Servier`, France) starting with `Coversyl`, `Coveram`, `Preductal MR`, `Daflon 500 mg`, `Diamicron MR`, `Natrilix SR`, and main presentations of current Servier brands (`Coversyl Plus`, `Bi-Preterax`, `Triplixam`, `Viacoram`, `Procoralan`, `Daflon 1000 mg`, `Valdoxan`, `Lonsurf`, `Onivyde pegylated liposomal`, `Tibsovo`).
- **Changes (`src/lib/servierCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/servierCatalogData.ts` with **29 official Les Laboratoires Servier brand presentations** across 3 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Servier` (`Les Laboratoires Servier`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #11: Bayer — 37 Current Brand Drafts)
- **Owner request:** Add Multinational Company #11 (`Bayer`, `Bayer AG`, Germany) starting with `Xarelto`, `Adalat LA`, `Ciprobay`, `Yasmin`, `Yaz`, `Diane-35`, `Aspirin Protect`, and main presentations of current Bayer brands (`Kerendia`, `Verquvo`, `Adempas`, `Glucobay`, `Avelox`, `Visanne`, `Mirena`, `Progynova`, `Primolut N`, `Nexavar`, `Stivarga`, `Nubeqa`, `Eylea`, `Betaferon`, `Canesten`; excluding contrast media, vaccines, and dermatology brands divested to LEO Pharma).
- **Changes (`src/lib/bayerCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/bayerCatalogData.ts` with **37 official Bayer AG brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Bayer` (`Bayer AG`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #10: Boehringer Ingelheim — 45 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #10 (`Boehringer Ingelheim`, `Boehringer Ingelheim International GmbH`, Germany) starting with `Jardiance`, `Synjardy`, `Glyxambi`, `Trajenta`, `Jentadueto`, `Micardis`, `MicardisPlus`, `Twynsta`, `Spiriva` (HandiHaler and Respimat), `Spiolto`, `Pradaxa`, `Ofev`, and main presentations of current Boehringer Ingelheim Rx brands (`Praxbind`, `Actilyse`, `Metalyse`, `Atrovent`, `Berodual`, `Giotrif`, `Vargatef`, `Spevigo`, `Sifrol`; strictly excluding consumer health brands moved to Sanofi/Opella in 2017 such as Mucosolvan, Buscopan, Dulcolax, Pharmaton).
- **Changes (`src/lib/boehringerCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/boehringerCatalogData.ts` with **45 official Boehringer Ingelheim International GmbH Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Boehringer Ingelheim` (`Boehringer Ingelheim International GmbH`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #9: Eli Lilly — 45 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #9 (`Eli Lilly`, `Eli Lilly and Company`, USA) starting with `Humalog`, `Humalog Mix`, `Humulin`, `Trulicity`, `Mounjaro`, `Cialis`, and main presentations of current Eli Lilly Rx brands (`Lyumjev`, `Abasaglar`, `Cymbalta`, `Emgality`, `Olumiant`, `Taltz`, `Forsteo`, `Verzenios`, `Alimta`, `Cyramza`, `Retsevmo`; strictly excluding Boehringer Ingelheim licences `Jardiance` and `Synjardy`).
- **Changes (`src/lib/eliLillyCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/eliLillyCatalogData.ts` with **45 official Eli Lilly and Company Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Eli Lilly` (`Eli Lilly and Company`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #8: Novo Nordisk — 51 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #8 (`Novo Nordisk`, `Novo Nordisk A/S`, Denmark) starting with `NovoRapid`, `NovoMix 30`, `Levemir`, `Tresiba`, `Ozempic`, `Victoza`, `Rybelsus`, and main presentations of current Novo Nordisk Rx brands (`Fiasp`, `NovoMix 50`, `NovoMix 70`, `Ryzodeg`, `Xultophy`, `Actrapid`, `Insulatard`, `Mixtard 30`, `Saxenda`, `Wegovy`, `NovoNorm`, `GlucaGen HypoKit`, `Norditropin FlexPro`, `NovoSeven`, `NovoEight`, `Vagifem`), giving real pen/cartridge/vial forms and strengths as separate products only where they officially exist.
- **Changes (`src/lib/novoNordiskCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/novoNordiskCatalogData.ts` with **51 official Novo Nordisk A/S Rx brand presentations** across 4 therapeutic portfolios, following all 9 strict catalog rules.
  - Registered `Novo Nordisk` (`Novo Nordisk A/S`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

### 2026-11-01 — Google AI Studio (Multinational Company #7: Merck KGaA — 47 Current Rx Brand Drafts)
- **Owner request:** Add Multinational Company #7 (`Merck KGaA`, `Merck KGaA`, Darmstadt, Germany) starting with `Concor`, `Concor Cor`, `Glucophage`, `Glucophage XR`, `Euthyrox`, and main presentations of current Merck KGaA Rx brands (`Concor AM`, `Concor Plus`, `Glucovance`, `Gonal-f`, `Pergoveris`, `Luveris`, `Cetrotide`, `Ovitrelle`, `Crinone`, `Saizen`, `Rebif`, `Mavenclad`, `Erbitux`, `Bavencio`, `Tepmetko`; strictly excluding consumer health brands sold to Procter & Gamble in 2018 such as Neurobion and Seven Seas).
- **Changes (`src/lib/merckKgaaCatalogData.ts`, `src/lib/chatCatalogData.ts`):**
  - Created `src/lib/merckKgaaCatalogData.ts` with **47 official Merck KGaA Rx brand presentations** across 4 therapeutic portfolios (`Concor`, `Concor Cor`, `Concor AM`, `Concor Plus`, `Glucophage`, `Glucophage XR`, `Glucovance`, `Euthyrox`, `Gonal-f`, `Pergoveris`, `Luveris`, `Cetrotide`, `Ovitrelle`, `Crinone`, `Saizen`, `Rebif`, `Mavenclad`, `Erbitux`, `Bavencio`, `Tepmetko`), following all 9 strict catalog rules.
  - Registered `Merck KGaA` (`Merck KGaA`) in `CHAT_CURATED_COMPANIES` in `src/lib/chatCatalogData.ts`.
- **Validation:** `npm run lint`, `npm test -- --run`, and `npm run build` passed with zero errors.
- **Next for Claude:** Review auto-sync PR after owner pushes from AI Studio.

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

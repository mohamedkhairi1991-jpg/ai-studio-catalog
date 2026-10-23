# Compact Secondary Rolling Drug Class Strip Plan

## 1. Objective
Convert the Drug Class list on the Doctor Official Catalog page into a **compact secondary horizontal scrolling ("rolling") strip** positioned directly beneath the main search bar, displaying each pharmacological class name and its matching published drug count badge.

---

## 2. Key UI & Interaction Changes

### A. Secondary Horizontal Rolling Strip Under the Search Bar
- **Placement**: Directly below the primary search input row inside the `Official Medicine Catalog` search panel (`/src/App.tsx`).
- **Compact Rolling Layout**:
  - A single-row horizontal scrollable container (`flex items-center gap-1.5 overflow-x-auto py-1`) with subtle left/right scroll nudge buttons for effortless mouse and touch rolling.
  - A compact leading label (`Drug Classes:`) and an `All` reset button when a class is active.
- **Item Content & Styling**:
  - Each button in the rolling strip is a compact interactive control (`px-2.5 py-1 rounded-[8px] text-[12px] font-semibold whitespace-nowrap shrink-0`) showing:
    1. **Drug Class Name** (e.g., *Beta Blockers*, *SGLT2 Inhibitors*, *HMG-CoA Reductase Inhibitors (Statins)*, *Proton Pump Inhibitors (PPIs)*).
    2. **Matching Drug Count Badge** (`text-[11px] font-mono px-1.5 py-0.5 rounded`).
- **Filtering Behavior**:
  - Clicking any drug class in the secondary rolling strip selects that class (`selectedDrugClassId`), switches or filters the catalog across **all pharmaceutical companies in Iraq**, and immediately displays all matching published medications below.
  - Clicking the active drug class again (or clicking `All`) clears the class filter and returns to the default Doctor Home view.

### B. Streamlined Drug Class Search Mode View
- Replace the large multi-row `Pharmacological Drug Classes` card below the search panel with a compact single-line active filter banner when a drug class is selected, keeping the vertical footprint minimal so cross-company medication cards appear immediately below the search bar.

---

## 3. Compliance & Quality Guardrails
- Preserves the formal clinical dark-graphite palette (`#18222B`, `#1F2D38`, `#263744`, `#304451`, `#51616D`, `#5DB4F2`, `#1769AA`).
- Enforces minimum `11px` typography on all count badges and secondary labels.
- Maintains existing Company Page navigation, Admin controls, and cross-company catalog filtering logic.

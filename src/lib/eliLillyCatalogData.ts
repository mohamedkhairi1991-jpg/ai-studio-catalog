import type { AiDraftSource, AiProductDraft } from './catalog';

const LILLY_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactLillyDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  drugClassNameEn: string;
  dosageForm: string;
  strength: string;
  route: string;
  packSize: string;
  indications: string;
  adultDosage: string;
  contraindications: string;
  sideEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

function toLillyProductDraft(item: CompactLillyDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.genericName.split(' + ').map((s) => s.trim()),
    drugClass: item.drugClassNameEn,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.indications,
      usualAdultDose: item.adultDosage,
      contraindications: item.contraindications,
      commonAdverseEffects: item.sideEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: LILLY_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Eli Lilly and Company regulatory monograph (EMA EPAR / SmPC / FDA); saved as draft pending verification.',
  };
}

const LILLY_COMPACT_PRODUCTS: CompactLillyDrug[] = [
  // =========================================================================
  // 1. INSULIN ANALOGUES & HUMAN INSULINS — HUMALOG, LYUMJEV, ABASAGLAR, HUMULIN (16 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Humalog KwikPen 100 units/mL',
    brandNameAr: 'هيومالوغ كويكبن 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of adults and children with diabetes mellitus who require insulin for the maintenance of normal glucose homeostasis, and for the initial stabilisation of diabetes mellitus.',
    adultDosage:
      'Individualized mealtime bolus administered subcutaneously shortly before a meal (within 15 minutes before a meal) or soon after meals when necessary, typically in combination with an intermediate- or long-acting basal insulin.',
    contraindications:
      'Hypersensitivity to insulin lispro or any of the excipients; hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia (most frequent), local injection-site reactions (erythema, swelling, pruritus), lipodystrophy, cutaneous amyloidosis at unrotated injection sites, and peripheral oedema.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 28 days; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Humalog (insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog KwikPen 200 units/mL',
    brandNameAr: 'هيومالوغ كويكبن 200 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues (Concentrated)',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '200 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of adults with diabetes mellitus who require insulin for the maintenance of normal glucose homeostasis, particularly patients requiring >20 units of mealtime insulin per day.',
    adultDosage:
      'Subcutaneous injection shortly before a meal (or soon after a meal when needed). Unit-for-unit conversion from Humalog 100 units/mL; dose window shows exact units. Never withdraw insulin from the 200 units/mL KwikPen with a syringe.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, local injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Humalog (insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog 100 units/mL Cartridge',
    brandNameAr: 'هيومالوغ 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in cartridge',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of adults and children with diabetes mellitus who require mealtime insulin using reusable Lilly insulin pens (such as HumaPen Savvio).',
    adultDosage:
      'Subcutaneous injection within 15 minutes before a meal or immediately after a meal as part of a basal-bolus regimen; rotate injection sites within the same anatomical region.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, local injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Humalog (insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog 100 units/mL Vial',
    brandNameAr: 'هيومالوغ 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of adults and children with diabetes mellitus by subcutaneous injection, continuous subcutaneous insulin infusion (CSII) pump, or supervised hospital intravenous infusion.',
    adultDosage:
      'Subcutaneous mealtime bolus within 15 minutes before meals or via CSII pump. Intravenous administration in hospital settings at concentrations from 0.1 to 1.0 unit/mL in 0.9% sodium chloride or 5% glucose with close blood glucose and potassium monitoring.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, hypokalaemia (with IV use), injection-site allergy, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store in a refrigerator (2°C–8°C) or below 30°C for up to 28 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'EMA EPAR — Humalog (insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog Mix25 KwikPen 100 units/mL',
    brandNameAr: 'هيومالوغ ميكس 25 كويكبن 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (25% Soluble / 75% Protamine)',
    dosageForm: 'Suspension for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of patients with diabetes mellitus who require insulin for the maintenance of normal glucose homeostasis.',
    adultDosage:
      'Individualized subcutaneous dosing given shortly before meals (typically twice daily before breakfast and evening meal). Gently roll the pre-filled pen 10 times and invert 10 times until uniformly cloudy before each injection.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia. Under no circumstances should Humalog Mix25 be given intravenously.',
    sideEffects:
      'Hypoglycaemia, weight gain, peripheral oedema, local injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Humalog Mix25 (biphasic insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog Mix25 100 units/mL Cartridge',
    brandNameAr: 'هيومالوغ ميكس 25 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (25% Soluble / 75% Protamine)',
    dosageForm: 'Suspension for injection in cartridge',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of patients with diabetes mellitus using reusable Lilly insulin delivery pens.',
    adultDosage:
      'Subcutaneous injection within 15 minutes before meals; resuspend cartridge thoroughly until uniformly cloudy before each administration.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, local injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Humalog Mix25 (biphasic insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog Mix50 KwikPen 100 units/mL',
    brandNameAr: 'هيومالوغ ميكس 50 كويكبن 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (50% Soluble / 50% Protamine)',
    dosageForm: 'Suspension for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of patients with diabetes mellitus requiring a 50% rapid-acting / 50% intermediate-acting protamine insulin lispro premixed suspension for postprandial and basal glycaemic control.',
    adultDosage:
      'Subcutaneous injection within 15 minutes before meals (twice or three times daily according to individual requirements). Resuspend thoroughly before each injection until uniformly white and cloudy.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Humalog Mix50 (biphasic insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Humalog Mix50 100 units/mL Cartridge',
    brandNameAr: 'هيومالوغ ميكس 50 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (50% Soluble / 50% Protamine)',
    dosageForm: 'Suspension for injection in cartridge',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of patients with diabetes mellitus using reusable Lilly insulin delivery pens.',
    adultDosage:
      'Subcutaneous injection within 15 minutes before meals; resuspend cartridge thoroughly until uniformly cloudy before each injection.',
    contraindications:
      'Hypersensitivity to insulin lispro or any excipient; hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, local injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Humalog Mix50 (biphasic insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humalog',
  },
  {
    brandName: 'Lyumjev KwikPen 100 units/mL',
    brandNameAr: 'ليومجيف كويكبن 100 وحدة/مل',
    genericName: 'Insulin lispro',
    drugClassNameEn: 'Ultra-Rapid-Acting Mealtime Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above.',
    adultDosage:
      'Administered subcutaneously 0 to 2 minutes before the start of the meal, with the option to administer up to 20 minutes after starting the meal, in combination with intermediate- or long-acting basal insulin.',
    contraindications:
      'Hypersensitivity to insulin lispro or any of the excipients; hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions (pain, erythema, pruritus, oedema), lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 28 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Lyumjev (insulin lispro) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lyumjev',
  },
  {
    brandName: 'Abasaglar KwikPen 100 units/mL',
    brandNameAr: 'أباساغلار كويكبن 100 وحدة/مل',
    genericName: 'Insulin glargine',
    drugClassNameEn: 'Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 2 years and above.',
    adultDosage:
      'Administered subcutaneously once daily at any time of the day, but at the same time each day. In insulin-naive type 2 diabetes: recommended starting dose is 0.2 units/kg or up to 10 units once daily, adjusted according to fasting blood glucose.',
    contraindications:
      'Hypersensitivity to insulin glargine or any of the excipients. Must not be administered intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipohypertrophy, cutaneous amyloidosis, and rare transient visual impairment during glycaemic normalisation.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 28 days away from direct heat or light; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Abasaglar (insulin glargine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/abasaglar',
  },
  {
    brandName: 'Humulin R 100 units/mL Vial',
    brandNameAr: 'هيومولين آر 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Short-Acting Regular Human Insulins (rDNA)',
    dosageForm: 'Solution for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of adult and paediatric patients with diabetes mellitus to improve glycaemic control, including hospital intravenous infusion for diabetic ketoacidosis and hyperosmolar hyperglycaemic states.',
    adultDosage:
      'Subcutaneous injection approximately 30 minutes before a meal, usually 3 or more times daily in combination with intermediate- or long-acting insulin. Intravenous infusion under close medical supervision at concentrations from 0.1 to 1 unit/mL in 0.9% sodium chloride with close glucose and potassium monitoring.',
    contraindications:
      'During episodes of hypoglycaemia, and in patients with hypersensitivity to regular human insulin or any excipient.',
    sideEffects:
      'Hypoglycaemia, hypokalaemia (especially with IV administration), weight gain, peripheral oedema, lipodystrophy, and injection-site reactions.',
    storageConditions:
      'Unopened: store in a refrigerator (2°C–8°C); do not freeze. In use: may be kept at room temperature (below 30°C) or refrigerated for up to 31 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'Eli Lilly Official Prescribing Information — Humulin R (human insulin) U-100',
    sourceUrl: 'https://pi.lilly.com/us/humulin-r-pi.pdf',
  },
  {
    brandName: 'Humulin R 100 units/mL Cartridge',
    brandNameAr: 'هيومولين آر 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Short-Acting Regular Human Insulins (rDNA)',
    dosageForm: 'Solution for injection in cartridge',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults and children using reusable Lilly insulin delivery pens.',
    adultDosage:
      'Subcutaneous injection 20–45 minutes before meals as part of an individualized basal-bolus insulin regimen.',
    contraindications:
      'Hypoglycaemia, and hypersensitivity to human insulin or any excipient.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 28 days; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'Eli Lilly Official Prescribing Information — Humulin R (human insulin)',
    sourceUrl: 'https://pi.lilly.com/us/humulin-r-pi.pdf',
  },
  {
    brandName: 'Humulin N 100 units/mL Vial',
    brandNameAr: 'هيومولين إن 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Intermediate-Acting Isophane (NPH) Human Insulins',
    dosageForm: 'Suspension for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of adults and children with diabetes mellitus requiring intermediate-acting basal human insulin to improve glycaemic control.',
    adultDosage:
      'Administered subcutaneously once or twice daily. Roll the vial gently between the palms 10 times and invert 10 times until the suspension is uniformly cloudy before drawing up the dose.',
    contraindications:
      'During episodes of hypoglycaemia, and hypersensitivity to human insulin isophane or any excipient. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, weight gain, and peripheral oedema.',
    storageConditions:
      'Unopened: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 31 days away from heat and light.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    sourceTitle: 'Eli Lilly Official Product Information — Humulin N (human insulin isophane) U-100',
    sourceUrl: 'https://pi.lilly.com/us/HUMULIN-N-IFU.pdf',
  },
  {
    brandName: 'Humulin N KwikPen 100 units/mL',
    brandNameAr: 'هيومولين إن كويكبن 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Intermediate-Acting Isophane (NPH) Human Insulins',
    dosageForm: 'Suspension for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults and children requiring intermediate-acting basal human insulin in a pre-filled pen.',
    adultDosage:
      'Subcutaneous injection once or twice daily; roll pen between palms 10 times and invert 10 times until uniformly white and cloudy before each injection.',
    contraindications:
      'Hypoglycaemia, and hypersensitivity to human insulin or any excipient. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store at room temperature (below 30°C) for up to 14–28 days per pack leaflet; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    sourceTitle: 'Eli Lilly Official Product Information — Humulin N (human insulin isophane) U-100',
    sourceUrl: 'https://pi.lilly.com/us/HUMULIN-N-IFU.pdf',
  },
  {
    brandName: 'Humulin 70/30 100 units/mL Vial',
    brandNameAr: 'هيومولين 70/30 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Biphasic (Premixed) Human Insulins (70% Isophane / 30% Soluble)',
    dosageForm: 'Suspension for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of patients with diabetes mellitus requiring both short-acting (30% regular) and intermediate-acting (70% NPH isophane) human insulin in a fixed premixed suspension.',
    adultDosage:
      'Subcutaneous injection approximately 30 minutes before a meal (typically twice daily before breakfast and evening meal). Gently roll and invert the vial until uniformly cloudy before withdrawing each dose.',
    contraindications:
      'During episodes of hypoglycaemia, and hypersensitivity to human insulin or any excipient. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, weight gain, peripheral oedema, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Unopened: store in a refrigerator (2°C–8°C); do not freeze. In use: store at room temperature (below 30°C) for up to 31 days.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Eli Lilly Official Product Information — Humulin 70/30 (human insulin isophane / regular) U-100',
    sourceUrl: 'https://pi.lilly.com/us/HUMULIN-7030-IFU.pdf',
  },
  {
    brandName: 'Humulin 70/30 KwikPen 100 units/mL',
    brandNameAr: 'هيومولين 70/30 كويكبن 100 وحدة/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Biphasic (Premixed) Human Insulins (70% Isophane / 30% Soluble)',
    dosageForm: 'Suspension for injection in pre-filled pen (KwikPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus requiring biphasic premixed human insulin in a pre-filled pen.',
    adultDosage:
      'Subcutaneous injection approximately 30 minutes before meals (usually twice daily); roll pen 10 times and invert 10 times until uniformly white and cloudy before each injection.',
    contraindications:
      'Hypoglycaemia, and hypersensitivity to human insulin or any excipient. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 10–28 days per pack leaflet; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Eli Lilly Official Product Information — Humulin 70/30 (human insulin isophane / regular) U-100',
    sourceUrl: 'https://pi.lilly.com/us/HUMULIN-7030-IFU.pdf',
  },

  // =========================================================================
  // 2. INCRETIN MIMETICS (GLP-1 & GIP/GLP-1) — TRULICITY & MOUNJARO (10 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Trulicity 0.75 mg/0.5 mL',
    brandNameAr: 'تروليسيتي 0.75 ملغم/0.5 مل',
    genericName: 'Dulaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '0.75 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '4 single-dose pre-filled pens x 0.5 mL',
    indications:
      'Treatment of adults, adolescents, and children aged 10 years and above with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise, as monotherapy when metformin is considered inappropriate due to intolerance or contraindications, or in addition to other medicinal products for the treatment of diabetes.',
    adultDosage:
      'Monotherapy: 0.75 mg injected subcutaneously once weekly. Add-on therapy in potentially vulnerable populations (or paediatric initiation ≥10 years): 0.75 mg once weekly, which may be increased to 1.5 mg once weekly for additional glycaemic control.',
    contraindications:
      'Hypersensitivity to dulaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, decreased appetite, dyspepsia, fatigue, sinus tachycardia, first-degree AV block, and hypoglycaemia when used with insulin or a sulfonylurea.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze. May be stored unrefrigerated at up to 30°C for up to 14 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Trulicity (dulaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trulicity',
  },
  {
    brandName: 'Trulicity 1.5 mg/0.5 mL',
    brandNameAr: 'تروليسيتي 1.5 ملغم/0.5 مل',
    genericName: 'Dulaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '1.5 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '4 single-dose pre-filled pens x 0.5 mL',
    indications:
      'Add-on therapy to other glucose-lowering medicinal products in adults and adolescents (≥10 years) with insufficiently controlled type 2 diabetes mellitus, including cardiovascular risk reduction in patients with established cardiovascular disease or multiple cardiovascular risk factors.',
    adultDosage:
      'Recommended add-on dose in adults: 1.5 mg injected subcutaneously once weekly at any time of day, with or without meals. After at least 4 weeks on 1.5 mg once weekly, may be increased to 3 mg once weekly if additional glycaemic control is needed.',
    contraindications:
      'Hypersensitivity to dulaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, dyspepsia, decreased appetite, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original carton; do not freeze. May be kept at up to 30°C for up to 14 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Trulicity (dulaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trulicity',
  },
  {
    brandName: 'Trulicity 3 mg/0.5 mL',
    brandNameAr: 'تروليسيتي 3 ملغم/0.5 مل',
    genericName: 'Dulaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '3 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '4 single-dose pre-filled pens x 0.5 mL',
    indications:
      'Dose escalation for adults with type 2 diabetes mellitus requiring additional glycaemic control after at least 4 weeks on Trulicity 1.5 mg once weekly.',
    adultDosage:
      '3 mg injected subcutaneously once weekly after at least 4 weeks on 1.5 mg once weekly; may be further increased to 4.5 mg once weekly after at least 4 weeks on 3 mg once weekly.',
    contraindications:
      'Hypersensitivity to dulaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, dyspepsia, fatigue, and cholelithiasis.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze. May be kept at up to 30°C for up to 14 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Trulicity (dulaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trulicity',
  },
  {
    brandName: 'Trulicity 4.5 mg/0.5 mL',
    brandNameAr: 'تروليسيتي 4.5 ملغم/0.5 مل',
    genericName: 'Dulaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '4.5 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '4 single-dose pre-filled pens x 0.5 mL',
    indications:
      'Maximum maintenance dose for adults with type 2 diabetes mellitus requiring additional glycaemic control after at least 4 weeks on Trulicity 3 mg once weekly.',
    adultDosage:
      '4.5 mg injected subcutaneously once weekly (maximum recommended weekly dose).',
    contraindications:
      'Hypersensitivity to dulaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, constipation, dyspepsia, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze. May be kept at up to 30°C for up to 14 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Trulicity (dulaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trulicity',
  },
  {
    brandName: 'Mounjaro KwikPen 2.5 mg',
    brandNameAr: 'مونجارو كويكبن 2.5 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '2.5 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise (as monotherapy when metformin is inappropriate, or in addition to other diabetes medicinal products); and as an adjunct to a reduced-calorie diet and increased physical activity for weight management in adults with BMI ≥30 kg/m² (obesity) or BMI ≥27 kg/m² to <30 kg/m² (overweight) in the presence of at least one weight-related comorbid condition.',
    adultDosage:
      'Starting dose for treatment initiation: 2.5 mg injected subcutaneously once weekly for 4 weeks (into the abdomen, thigh, or upper arm at any time of day, with or without meals); after 4 weeks, increase to 5 mg once weekly.',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, decreased appetite, vomiting, constipation, dyspepsia, abdominal pain, eructation, flatulence, gastro-oesophageal reflux, hair loss (in weight management), cholelithiasis, and hypoglycaemia when combined with insulin or a sulfonylurea.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze. In use: may be stored unrefrigerated not above 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },
  {
    brandName: 'Mounjaro KwikPen 5 mg',
    brandNameAr: 'مونجارو كويكبن 5 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '5 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Maintenance treatment of adults with insufficiently controlled type 2 diabetes mellitus and chronic weight management in adults with obesity or overweight with weight-related comorbidities.',
    adultDosage:
      '5 mg injected subcutaneously once weekly after 4 weeks on 2.5 mg once weekly; if needed, dose increases can be made in 2.5 mg increments after a minimum of 4 weeks on the current dose.',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, decreased appetite, vomiting, constipation, dyspepsia, abdominal pain, cholelithiasis, and increased pancreatic enzymes.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store up to 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },
  {
    brandName: 'Mounjaro KwikPen 7.5 mg',
    brandNameAr: 'مونجارو كويكبن 7.5 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '7.5 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Stepwise dose escalation for type 2 diabetes mellitus and chronic weight management in adults after at least 4 weeks on 5 mg once weekly.',
    adultDosage:
      '7.5 mg injected subcutaneously once weekly for at least 4 weeks before advancing to the 10 mg maintenance dose.',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, decreased appetite, dyspepsia, abdominal pain, and cholelithiasis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store up to 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },
  {
    brandName: 'Mounjaro KwikPen 10 mg',
    brandNameAr: 'مونجارو كويكبن 10 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '10 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Recommended maintenance dose for adults with type 2 diabetes mellitus and chronic weight management after at least 4 weeks on 7.5 mg once weekly.',
    adultDosage:
      '10 mg injected subcutaneously once weekly; if additional glycaemic control or weight reduction is required after at least 4 weeks on 10 mg, may be increased to 12.5 mg once weekly and then 15 mg once weekly.',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, decreased appetite, dyspepsia, abdominal pain, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store up to 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },
  {
    brandName: 'Mounjaro KwikPen 12.5 mg',
    brandNameAr: 'مونجارو كويكبن 12.5 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '12.5 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Stepwise dose escalation for type 2 diabetes mellitus and chronic weight management in adults after at least 4 weeks on 10 mg once weekly.',
    adultDosage:
      '12.5 mg injected subcutaneously once weekly for at least 4 weeks before advancing to the 15 mg maintenance dose.',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, decreased appetite, dyspepsia, abdominal pain, and cholelithiasis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store up to 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },
  {
    brandName: 'Mounjaro KwikPen 15 mg',
    brandNameAr: 'مونجارو كويكبن 15 ملغم',
    genericName: 'Tirzepatide',
    drugClassNameEn: 'Dual GIP and GLP-1 Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen (KwikPen)',
    strength: '15 mg per 0.6 mL dose',
    route: 'Subcutaneous',
    packSize: '1 multi-dose pre-filled pen (2.4 mL, 4 weekly doses)',
    indications:
      'Maximum recommended maintenance dose for adults with type 2 diabetes mellitus and chronic weight management after at least 4 weeks on 12.5 mg once weekly.',
    adultDosage:
      '15 mg injected subcutaneously once weekly (maximum weekly dose is 15 mg).',
    contraindications:
      'Hypersensitivity to tirzepatide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, decreased appetite, dyspepsia, abdominal pain, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before first use: store in a refrigerator (2°C–8°C); do not freeze. In use: store up to 30°C for up to 30 days.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Mounjaro (tirzepatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mounjaro',
  },

  // =========================================================================
  // 3. UROLOGY, NEUROSCIENCE, IMMUNOLOGY & OSTEOPOROSIS — CIALIS, CYMBALTA, EMGALITY, OLUMIANT, TALTZ, FORSTEO (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Cialis 5 mg',
    brandNameAr: 'سياليس 5 ملغم',
    genericName: 'Tadalafil',
    drugClassNameEn: 'Phosphodiesterase Type 5 (PDE5) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of erectile dysfunction in adult men, and treatment of the signs and symptoms of benign prostatic hyperplasia (BPH) in adult men (including men with both erectile dysfunction and benign prostatic hyperplasia).',
    adultDosage:
      'Benign prostatic hyperplasia and/or once-daily erectile dysfunction regimen: 5 mg taken orally once daily at approximately the same time of day, with or without food (may be reduced to 2.5 mg once daily for erectile dysfunction based on individual tolerability).',
    contraindications:
      'Concomitant administration of any form of organic nitrate or nitric oxide donors (such as amyl nitrite); concomitant use of guanylate cyclase stimulators (such as riociguat); men with cardiac disease for whom sexual activity is inadvisable (myocardial infarction within the last 90 days, unstable angina, NYHA Class 2 or greater heart failure within the last 6 months, uncontrolled arrhythmias, hypotension <90/50 mmHg, or stroke within the last 6 months); and previous loss of vision in one eye due to non-arteritic anterior ischaemic optic neuropathy (NAION).',
    sideEffects:
      'Headache, dyspepsia, back pain, myalgia, nasal congestion, flushing, and pain in extremity.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Cialis (tadalafil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cialis',
  },
  {
    brandName: 'Cialis 10 mg',
    brandNameAr: 'سياليس 10 ملغم',
    genericName: 'Tadalafil',
    drugClassNameEn: 'Phosphodiesterase Type 5 (PDE5) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '4 film-coated tablets',
    indications:
      'On-demand treatment of erectile dysfunction in adult men (sexual stimulation is required for tadalafil to be effective).',
    adultDosage:
      'Recommended starting on-demand dose is 10 mg taken prior to anticipated sexual activity (at least 30 minutes prior), with or without food; maximum dosing frequency is once per day.',
    contraindications:
      'Concomitant use of organic nitrates or guanylate cyclase stimulators (riociguat), recent myocardial infarction (<90 days) or stroke (<6 months), unstable angina, uncontrolled arrhythmias or hypotension (<90/50 mmHg), and prior NAION.',
    sideEffects:
      'Headache, dyspepsia, back pain, myalgia, flushing, nasal congestion, and gastro-oesophageal reflux.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Cialis (tadalafil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cialis',
  },
  {
    brandName: 'Cialis 20 mg',
    brandNameAr: 'سياليس 20 ملغم',
    genericName: 'Tadalafil',
    drugClassNameEn: 'Phosphodiesterase Type 5 (PDE5) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '4 film-coated tablets',
    indications:
      'On-demand treatment of erectile dysfunction in adult men in whom tadalafil 10 mg does not produce an adequate effect.',
    adultDosage:
      '20 mg taken prior to anticipated sexual activity (at least 30 minutes prior), with or without food; maximum dosing frequency is once per day. Not recommended for continuous daily use.',
    contraindications:
      'Concomitant organic nitrates or guanylate cyclase stimulators (riociguat), recent myocardial infarction (<90 days) or stroke (<6 months), unstable cardiovascular disease, hypotension (<90/50 mmHg), and prior NAION.',
    sideEffects:
      'Headache, dyspepsia, back pain, myalgia, flushing, nasal congestion, dizziness, and palpitations.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Cialis (tadalafil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cialis',
  },
  {
    brandName: 'Cymbalta 30 mg',
    brandNameAr: 'سيمبالتا 30 ملغم',
    genericName: 'Duloxetine',
    drugClassNameEn: 'Serotonin-Noradrenaline Reuptake Inhibitors (SNRIs)',
    dosageForm: 'Hard gastro-resistant capsule',
    strength: '30 mg',
    route: 'Oral',
    packSize: '28 gastro-resistant capsules',
    indications:
      'Treatment of major depressive disorder, treatment of diabetic peripheral neuropathic pain, and treatment of generalised anxiety disorder in adults.',
    adultDosage:
      'Generalised anxiety disorder: starting dose 30 mg once daily, increased to 60 mg once daily if response is insufficient (up to 120 mg/day). Major depressive disorder and diabetic peripheral neuropathic pain: 60 mg once daily with or without food. Swallow whole; do not chew or crush.',
    contraindications:
      'Concomitant use with non-selective irreversible monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuing an MAOI; liver disease resulting in hepatic impairment; concomitant use with potent CYP1A2 inhibitors (fluvoxamine, ciprofloxacin, enoxacin); severe renal impairment (CrCl <30 mL/min); and initiation in patients with uncontrolled hypertension.',
    sideEffects:
      'Nausea, headache, dry mouth, somnolence, dizziness, insomnia, constipation, diarrhoea, hyperhidrosis, decreased appetite, and fatigue.',
    storageConditions:
      'Store below 30°C in the original package in order to protect from moisture.',
    specialties: ['Psychiatry', 'Neurology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Cymbalta (duloxetine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cymbalta',
  },
  {
    brandName: 'Cymbalta 60 mg',
    brandNameAr: 'سيمبالتا 60 ملغم',
    genericName: 'Duloxetine',
    drugClassNameEn: 'Serotonin-Noradrenaline Reuptake Inhibitors (SNRIs)',
    dosageForm: 'Hard gastro-resistant capsule',
    strength: '60 mg',
    route: 'Oral',
    packSize: '28 gastro-resistant capsules',
    indications:
      'Treatment of major depressive disorder, diabetic peripheral neuropathic pain, and generalised anxiety disorder in adults.',
    adultDosage:
      '60 mg once daily with or without food (maximum dose 120 mg/day). Taper gradually over at least 1 to 2 weeks when discontinuing treatment to reduce withdrawal reactions.',
    contraindications:
      'Concomitant irreversible MAOIs, hepatic impairment, potent CYP1A2 inhibitors (fluvoxamine, ciprofloxacin, enoxacin), severe renal impairment (CrCl <30 mL/min), and uncontrolled hypertension.',
    sideEffects:
      'Nausea, dry mouth, headache, somnolence, insomnia, dizziness, constipation, hyperhidrosis, and sexual dysfunction.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Psychiatry', 'Neurology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Cymbalta (duloxetine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cymbalta',
  },
  {
    brandName: 'Emgality 120 mg',
    brandNameAr: 'إمغاليتي 120 ملغم',
    genericName: 'Galcanezumab',
    drugClassNameEn: 'Anti-CGRP Monoclonal Antibodies (Migraine Prophylaxis)',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '120 mg / 1 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen x 1 mL',
    indications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month.',
    adultDosage:
      'Recommended dose is 120 mg injected subcutaneously once monthly, with a 240 mg loading dose (two 120 mg injections) as the initial dose.',
    contraindications:
      'Hypersensitivity to galcanezumab or any of the excipients.',
    sideEffects:
      'Injection-site pain and reactions (erythema, pruritus, bruising, swelling), vertigo, constipation, urticaria, and pruritus.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze or shake. May be stored unrefrigerated up to 30°C for a single period of up to 7 days.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Emgality (galcanezumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/emgality',
  },
  {
    brandName: 'Olumiant 2 mg',
    brandNameAr: 'أولوميانت 2 ملغم',
    genericName: 'Baricitinib',
    drugClassNameEn: 'Janus Kinase (JAK1/JAK2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of moderate to severe active rheumatoid arthritis, moderate to severe atopic dermatitis, severe alopecia areata in adults, and active juvenile idiopathic arthritis in patients aged 2 years and older.',
    adultDosage:
      '2 mg once daily in patients aged ≥65 years, patients with increased risk of venous thromboembolism, MACE, or malignancy, patients with history of chronic/recurrent infections, or patients with moderate renal impairment (CrCl 30–60 mL/min); also for maintenance once sustained disease control has been achieved with 4 mg once daily.',
    contraindications:
      'Hypersensitivity to baricitinib or any of the excipients; pregnancy.',
    sideEffects:
      'Upper respiratory tract infections, herpes zoster, herpes simplex, hypercholesterolaemia, headache, nausea, abdominal pain, thrombocytosis, and elevated hepatic transaminases.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Rheumatology', 'Dermatology', 'Immunology'],
    sourceTitle: 'EMA EPAR — Olumiant (baricitinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/olumiant',
  },
  {
    brandName: 'Olumiant 4 mg',
    brandNameAr: 'أولوميانت 4 ملغم',
    genericName: 'Baricitinib',
    drugClassNameEn: 'Janus Kinase (JAK1/JAK2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of moderate to severe active rheumatoid arthritis in adults who have responded inadequately to or are intolerant to one or more DMARDs, moderate to severe atopic dermatitis in adults and children (≥2 years), severe alopecia areata in adults, and active juvenile idiopathic arthritis.',
    adultDosage:
      'Recommended dose is 4 mg taken orally once daily with or without food (reduce to 2 mg once daily in patients ≥65 years, those with cardiovascular/VTE/malignancy risk factors, or CrCl 30–60 mL/min).',
    contraindications:
      'Hypersensitivity to baricitinib or any of the excipients; pregnancy.',
    sideEffects:
      'Upper respiratory tract infections, herpes zoster, urinary tract infections, hyperlipidaemia (elevated LDL and HDL cholesterol), nausea, acne, creatine phosphokinase elevation, and venous thromboembolism.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Rheumatology', 'Dermatology', 'Immunology'],
    sourceTitle: 'EMA EPAR — Olumiant (baricitinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/olumiant',
  },
  {
    brandName: 'Taltz 80 mg',
    brandNameAr: 'تالتز 80 ملغم',
    genericName: 'Ixekizumab',
    drugClassNameEn: 'Interleukin-17A (IL-17A) Antagonist Monoclonal Antibodies',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '80 mg / 1 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen x 1 mL',
    indications:
      'Treatment of moderate to severe plaque psoriasis in adults, children (from 6 years and ≥25 kg), and adolescents who are candidates for systemic therapy; active psoriatic arthritis in adults (alone or in combination with methotrexate); and active axial spondyloarthritis (ankylosing spondylitis and non-radiographic axial spondyloarthritis) in adults.',
    adultDosage:
      'Plaque psoriasis: 160 mg (two 80 mg injections) at Week 0, followed by 80 mg at Weeks 2, 4, 6, 8, 10, and 12, then maintenance dose of 80 mg every 4 weeks. Psoriatic arthritis / axial spondyloarthritis: 160 mg at Week 0, followed by 80 mg every 4 weeks.',
    contraindications:
      'Serious hypersensitivity to ixekizumab or any of the excipients, and clinically important active infections (such as active tuberculosis).',
    sideEffects:
      'Injection-site reactions, upper respiratory tract infections, tinea infections, mucocutaneous candidiasis, and oropharyngeal pain.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze. May be stored unrefrigerated up to 30°C for a single period of up to 5 days.',
    specialties: ['Dermatology', 'Rheumatology', 'Immunology'],
    sourceTitle: 'EMA EPAR — Taltz (ixekizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/taltz',
  },
  {
    brandName: 'Forsteo 20 mcg/80 mcL',
    brandNameAr: 'فورستيو 20 ميكروغرام/80 ميكرولتر',
    genericName: 'Teriparatide',
    drugClassNameEn: 'Recombinant Parathyroid Hormone (rhPTH 1-34) Osteoanabolic Agents',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '20 mcg / 80 mcL (250 mcg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (2.4 mL, 28 daily doses)',
    indications:
      'Treatment of osteoporosis in postmenopausal women and in men at increased risk of fracture, and treatment of osteoporosis associated with sustained systemic glucocorticoid therapy in women and men at increased risk for fracture.',
    adultDosage:
      '20 mcg administered once daily by subcutaneous injection in the thigh or abdomen. Maximum total duration of treatment with Forsteo should be 24 months and should not be repeated over a patient’s lifetime. Supplement with calcium and vitamin D if dietary intake is inadequate.',
    contraindications:
      'Pregnancy and breast-feeding, pre-existing hypercalcaemia, severe renal impairment, metabolic bone diseases (including hyperparathyroidism and Paget’s disease of the bone) other than primary or glucocorticoid-induced osteoporosis, unexplained elevations of alkaline phosphatase, prior external beam or implant radiation therapy to the skeleton, and patients with skeletal malignancies or bone metastases.',
    sideEffects:
      'Pain in limb, nausea, headache, dizziness, orthostatic hypotension, muscle cramps, mild transient hypercalcaemia, and hyperuricaemia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) at all times; return the pre-filled pen to the refrigerator immediately after each daily use. Do not freeze.',
    specialties: ['Endocrinology', 'Rheumatology', 'Orthopedics'],
    sourceTitle: 'EMA EPAR — Forsteo (teriparatide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forsteo',
  },

  // =========================================================================
  // 4. ONCOLOGY — VERZENIOS, ALIMTA, CYRAMZA, RETSEVMO (9 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Verzenios 50 mg',
    brandNameAr: 'فيرزينيوس 50 ملغم',
    genericName: 'Abemaciclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'In combination with endocrine therapy for the adjuvant treatment of adult patients with hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative, node-positive early breast cancer at high risk of recurrence; and for the treatment of women with HR-positive, HER2-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor or fulvestrant.',
    adultDosage:
      'Dose-reduction strength (50 mg twice daily) for management of adverse reactions or concomitant strong CYP3A4 inhibitors; standard starting dose in combination with endocrine therapy is 150 mg twice daily taken continuously with or without food.',
    contraindications:
      'Hypersensitivity to abemaciclib or any of the excipients.',
    sideEffects:
      'Diarrhoea (manage promptly with loperamide and fluids), neutropenia, leukopenia, anaemia, thrombocytopenia, nausea, vomiting, fatigue, elevated ALT/AST, venous thromboembolism, and interstitial lung disease / pneumonitis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Verzenios (abemaciclib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verzenios',
  },
  {
    brandName: 'Verzenios 100 mg',
    brandNameAr: 'فيرزينيوس 100 ملغم',
    genericName: 'Abemaciclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'Adjuvant treatment of HR-positive, HER2-negative, node-positive high-risk early breast cancer in combination with endocrine therapy, and treatment of HR-positive, HER2-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor or fulvestrant.',
    adultDosage:
      'First dose-reduction level: 100 mg taken orally twice daily (approximately every 12 hours) for management of grade 3/4 haematological or gastrointestinal toxicities or moderate CYP3A4 interactions.',
    contraindications:
      'Hypersensitivity to abemaciclib or any of the excipients.',
    sideEffects:
      'Diarrhoea, neutropenia, leukopenia, anaemia, fatigue, nausea, abdominal pain, alopecia, elevated hepatic transaminases, and venous thromboembolism.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Verzenios (abemaciclib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verzenios',
  },
  {
    brandName: 'Verzenios 150 mg',
    brandNameAr: 'فيرزينيوس 150 ملغم',
    genericName: 'Abemaciclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '150 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'Standard starting dose in combination with endocrine therapy for adjuvant treatment of high-risk HR-positive, HER2-negative early breast cancer (for up to 2 years), and in combination with an aromatase inhibitor or fulvestrant for HR-positive, HER2-negative locally advanced or metastatic breast cancer.',
    adultDosage:
      'Recommended starting dose: 150 mg taken orally twice daily continuously with or without food at approximately the same times every day. Avoid grapefruit or grapefruit juice.',
    contraindications:
      'Hypersensitivity to abemaciclib or any of the excipients.',
    sideEffects:
      'Diarrhoea, neutropenia, infections, leukopenia, anaemia, fatigue, nausea, vomiting, decreased appetite, alopecia, venous thromboembolism, and rare pneumonitis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Verzenios (abemaciclib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verzenios',
  },
  {
    brandName: 'Alimta 100 mg',
    brandNameAr: 'أليمتا 100 ملغم',
    genericName: 'Pemetrexed',
    drugClassNameEn: 'Multi-Targeted Antifolate Antineoplastic Agents',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '100 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'In combination with cisplatin for the treatment of chemotherapy-naive patients with unresectable malignant pleural mesothelioma; in combination with cisplatin for first-line treatment of locally advanced or metastatic non-squamous non-small cell lung cancer (NSCLC); and as monotherapy for maintenance or second-line treatment of locally advanced or metastatic non-squamous NSCLC.',
    adultDosage:
      '500 mg/m² body surface area administered as an intravenous infusion over 10 minutes on the first day of each 21-day cycle. Patients must receive daily oral folic acid (350–1000 mcg) and intramuscular vitamin B12 (1000 mcg every 3 cycles) supplementation, plus oral corticosteroid premedication.',
    contraindications:
      'Hypersensitivity to pemetrexed or any of the excipients, breast-feeding, and concomitant yellow fever vaccine.',
    sideEffects:
      'Bone marrow suppression (neutropenia, leukopenia, anaemia, thrombocytopenia), nausea, vomiting, stomatitis/pharyngitis, diarrhoea, fatigue, skin rash, and elevated creatinine.',
    storageConditions:
      'This medicinal product does not require any special storage conditions before reconstitution.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Alimta (pemetrexed) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alimta',
  },
  {
    brandName: 'Alimta 500 mg',
    brandNameAr: 'أليمتا 500 ملغم',
    genericName: 'Pemetrexed',
    drugClassNameEn: 'Multi-Targeted Antifolate Antineoplastic Agents',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '500 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'Treatment of unresectable malignant pleural mesothelioma (with cisplatin) and locally advanced or metastatic non-squamous non-small cell lung cancer (first-line, maintenance, or second-line).',
    adultDosage:
      '500 mg/m² IV over 10 minutes on Day 1 of each 21-day cycle, with mandatory folic acid, vitamin B12, and dexamethasone supplementation. Not recommended in patients with creatinine clearance <45 mL/min.',
    contraindications:
      'Hypersensitivity to pemetrexed, breast-feeding, and concomitant yellow fever vaccine.',
    sideEffects:
      'Neutropenia, anaemia, thrombocytopenia, fatigue, nausea, anorexia, stomatitis, diarrhoea, rash, and nephrotoxicity.',
    storageConditions:
      'This medicinal product does not require any special storage conditions before reconstitution.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Alimta (pemetrexed) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alimta',
  },
  {
    brandName: 'Cyramza 100 mg/10 mL',
    brandNameAr: 'سيرامزا 100 ملغم/10 مل',
    genericName: 'Ramucirumab',
    drugClassNameEn: 'Anti-VEGFR2 Monoclonal Antibodies (Angiogenesis Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '100 mg / 10 mL (10 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 10 mL',
    indications:
      'Advanced gastric cancer or gastro-oesophageal junction adenocarcinoma (with paclitaxel or as monotherapy) after prior platinum and fluoropyrimidine chemotherapy; metastatic colorectal cancer (with FOLFIRI); locally advanced or metastatic NSCLC (with erlotinib in EGFR-mutated first-line or with docetaxel after platinum chemotherapy); and advanced or unresectable hepatocellular carcinoma (with serum AFP ≥400 ng/mL after sorafenib).',
    adultDosage:
      'Gastric cancer / HCC: 8 mg/kg IV every 2 weeks. mCRC: 8 mg/kg IV every 2 weeks prior to FOLFIRI. NSCLC: 10 mg/kg IV every 2 weeks (with erlotinib) or 10 mg/kg IV on Day 1 of a 21-day cycle (with docetaxel). Premedicate with an intravenous H1 antagonist.',
    contraindications:
      'Hypersensitivity to ramucirumab or any of the excipients; for NSCLC patients, tumour cavitation or tumour involvement of major vessels.',
    sideEffects:
      'Hypertension, proteinuria, epistaxis, gastrointestinal haemorrhage, neutropenia, thrombocytopenia, diarrhoea, stomatitis, peripheral oedema, fatigue, and arterial thromboembolic events.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology', 'Gastroenterology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Cyramza (ramucirumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cyramza',
  },
  {
    brandName: 'Cyramza 500 mg/50 mL',
    brandNameAr: 'سيرامزا 500 ملغم/50 مل',
    genericName: 'Ramucirumab',
    drugClassNameEn: 'Anti-VEGFR2 Monoclonal Antibodies (Angiogenesis Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '500 mg / 50 mL (10 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 50 mL',
    indications:
      'Treatment of advanced gastric or gastro-oesophageal junction adenocarcinoma, metastatic colorectal cancer, metastatic non-small cell lung cancer, and advanced hepatocellular carcinoma with AFP ≥400 ng/mL.',
    adultDosage:
      '8 mg/kg IV every 2 weeks (gastric cancer, mCRC, HCC) or 10 mg/kg IV every 2 or 3 weeks (NSCLC) infused over 60 minutes (may be shortened to 30 minutes if first infusion is tolerated).',
    contraindications:
      'Hypersensitivity to ramucirumab or any excipient; in NSCLC, tumour cavitation or major vessel involvement.',
    sideEffects:
      'Hypertension, proteinuria, haemorrhage/epistaxis, neutropenia, thrombocytopenia, fatigue, diarrhoea, and impaired wound healing.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze.',
    specialties: ['Oncology', 'Gastroenterology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Cyramza (ramucirumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cyramza',
  },
  {
    brandName: 'Retsevmo 40 mg',
    brandNameAr: 'ريتسيفمو 40 ملغم',
    genericName: 'Selpercatinib',
    drugClassNameEn: 'Selective RET Receptor Tyrosine Kinase Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '40 mg',
    route: 'Oral',
    packSize: '56 hard capsules',
    indications:
      'Monotherapy for adults with advanced RET fusion-positive non-small cell lung cancer (NSCLC), advanced RET fusion-positive thyroid cancer, and adults and adolescents aged ≥12 years with advanced RET-mutant medullary thyroid cancer (MTC).',
    adultDosage:
      'Weight-based dosing: Patients <50 kg: 120 mg (three 40 mg capsules) orally twice daily; Patients ≥50 kg: 160 mg orally twice daily (approximately every 12 hours) with or without food (take with food if co-administered with a proton pump inhibitor).',
    contraindications:
      'Hypersensitivity to selpercatinib or any of the excipients.',
    sideEffects:
      'Increased AST/ALT, dry mouth, diarrhoea, hypertension, oedema, fatigue, rash, QT interval prolongation, constipation, thrombocytopenia, and hypothyroidism.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Endocrinology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Retsevmo (selpercatinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/retsevmo',
  },
  {
    brandName: 'Retsevmo 80 mg',
    brandNameAr: 'ريتسيفمو 80 ملغم',
    genericName: 'Selpercatinib',
    drugClassNameEn: 'Selective RET Receptor Tyrosine Kinase Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '80 mg',
    route: 'Oral',
    packSize: '56 hard capsules',
    indications:
      'Monotherapy for adults with advanced RET fusion-positive NSCLC, advanced RET fusion-positive thyroid cancer, and adults and adolescents aged ≥12 years with advanced RET-mutant medullary thyroid cancer.',
    adultDosage:
      'Patients ≥50 kg: 160 mg (two 80 mg capsules) taken orally twice daily (approximately every 12 hours) until disease progression or unacceptable toxicity.',
    contraindications:
      'Hypersensitivity to selpercatinib or any of the excipients.',
    sideEffects:
      'Elevated hepatic transaminases, hypertension, dry mouth, diarrhoea, peripheral oedema, fatigue, QTc prolongation, and interstitial lung disease / pneumonitis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Endocrinology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Retsevmo (selpercatinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/retsevmo',
  },
];

export const ELI_LILLY_PRODUCTS: AiProductDraft[] = LILLY_COMPACT_PRODUCTS.map(toLillyProductDraft);
import type { AiDraftSource, AiProductDraft } from './catalog';

const NOVO_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactNovoDrug {
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

function toNovoProductDraft(item: CompactNovoDrug): AiProductDraft {
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
    sources: NOVO_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Novo Nordisk A/S regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

const NOVO_COMPACT_PRODUCTS: CompactNovoDrug[] = [
  // =========================================================================
  // 1. FAST-ACTING, BASAL, PREMIXED & COMBINATION INSULIN ANALOGUES (17 PRODUCTS)
  // =========================================================================
  {
    brandName: 'NovoRapid FlexPen 100 units/mL',
    brandNameAr: 'نوفورابيد فليكسبن 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (FlexPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above.',
    adultDosage:
      'Individualized mealtime insulin regimen: injected subcutaneously immediately before a meal (or soon after a meal when necessary), typically in combination with intermediate- or long-acting basal insulin. Total daily insulin requirement is usually 0.5 to 1.0 unit/kg/day.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; do not administer during episodes of hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia (most common), injection-site reactions, lipodystrophy or cutaneous amyloidosis at unrotated injection sites, peripheral oedema, and transient refraction anomalies at therapy initiation.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C (or at 2°C–8°C) for up to 4 weeks with the pen cap on to protect from light.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NovoRapid (insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novorapid',
  },
  {
    brandName: 'NovoRapid Penfill 100 units/mL',
    brandNameAr: 'نوفورابيد بنفيل 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in cartridge (Penfill)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above using durable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Injected subcutaneously into the abdominal wall, thigh, upper arm, or deltoid region immediately before a meal as part of a basal-bolus regimen; rotate injection sites within the same region.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, local injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral fluid retention.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: keep below 30°C for up to 4 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NovoRapid (insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novorapid',
  },
  {
    brandName: 'NovoRapid 100 units/mL Vial',
    brandNameAr: 'نوفورابيد 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Rapid-Acting Insulin Analogues',
    dosageForm: 'Solution for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above; suitable for subcutaneous injection, continuous subcutaneous insulin infusion (CSII) in pump systems, and intravenous administration by healthcare professionals.',
    adultDosage:
      'Subcutaneous: individualized mealtime bolus immediately before meals. Intravenous (hospital setting): diluted to 0.05 to 1.0 unit/mL in 0.9% sodium chloride or 5%–10% glucose with potassium chloride, with close blood glucose and serum potassium monitoring.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, hypokalaemia (particularly with intravenous administration), injection-site reactions, and lipodystrophy.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 4 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'EMA EPAR — NovoRapid (insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novorapid',
  },
  {
    brandName: 'Fiasp FlexTouch 100 units/mL',
    brandNameAr: 'فياسب فليكستاتش 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Ultra-Rapid-Acting Mealtime Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above.',
    adultDosage:
      'Subcutaneous mealtime bolus administered up to 2 minutes before the start of the meal, with the option to administer up to 20 minutes after starting the meal, in a basal-bolus regimen.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients (including nicotinamide/vitamin B3); active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, allergic skin manifestations, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C (or at 2°C–8°C) for up to 4 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Fiasp (fast-acting insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/fiasp',
  },
  {
    brandName: 'Fiasp Penfill 100 units/mL',
    brandNameAr: 'فياسب بنفيل 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Ultra-Rapid-Acting Mealtime Insulin Analogues',
    dosageForm: 'Solution for injection in cartridge (Penfill)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above using compatible Novo Nordisk reusable insulin pens.',
    adultDosage:
      'Injected subcutaneously 0–2 minutes before starting a meal (or up to 20 minutes after starting a meal) in combination with intermediate- or long-acting insulin.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 4 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Fiasp (fast-acting insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/fiasp',
  },
  {
    brandName: 'Fiasp 100 units/mL Vial',
    brandNameAr: 'فياسب 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Ultra-Rapid-Acting Mealtime Insulin Analogues',
    dosageForm: 'Solution for injection in vial',
    strength: '100 units/mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above by subcutaneous injection, continuous subcutaneous insulin infusion (CSII), or supervised intravenous infusion.',
    adultDosage:
      'Subcutaneous bolus 0–2 minutes before meals (or via CSII pump). Intravenous administration by healthcare professionals at 0.5 to 1.0 unit/mL in infusion systems with close glucose and potassium monitoring.',
    contraindications:
      'Hypersensitivity to insulin aspart or any excipient; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, hypokalaemia (with IV use), injection/infusion-site reactions, and lipodystrophy.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C (or at 2°C–8°C) for up to 4 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Fiasp (fast-acting insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/fiasp',
  },
  {
    brandName: 'NovoMix 30 FlexPen 100 units/mL',
    brandNameAr: 'نوفوميكس 30 فليكسبن 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (30% Soluble / 70% Protamine)',
    dosageForm: 'Suspension for injection in pre-filled pen (FlexPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 10 years and above.',
    adultDosage:
      'In insulin-naive type 2 diabetes: start with 6 units at breakfast and 6 units at the evening meal (or 12 units once daily with the evening meal, switching to twice daily when reaching 30 units). Resuspend thoroughly before each injection until uniformly white and cloudy.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, weight gain, peripheral oedema, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 4 weeks; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NovoMix 30 (biphasic insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novomix',
  },
  {
    brandName: 'NovoMix 30 Penfill 100 units/mL',
    brandNameAr: 'نوفوميكس 30 بنفيل 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (30% Soluble / 70% Protamine)',
    dosageForm: 'Suspension for injection in cartridge (Penfill)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 10 years and above using reusable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Administered subcutaneously once, twice, or three times daily immediately before meals. Roll and invert cartridge at least 10 times before each injection until uniformly white and cloudy.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 4 weeks; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NovoMix 30 (biphasic insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novomix',
  },
  {
    brandName: 'NovoMix 50 FlexPen 100 units/mL',
    brandNameAr: 'نوفوميكس 50 فليكسبن 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (50% Soluble / 50% Protamine)',
    dosageForm: 'Suspension for injection in pre-filled pen (FlexPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults requiring a higher proportion of rapid-acting mealtime insulin in a premixed biphasic formulation.',
    adultDosage:
      'Individualized subcutaneous dosing administered immediately before meals (once, twice, or three times daily), titrated according to pre-meal blood glucose levels. Resuspend thoroughly before each injection.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and fluid retention.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 4 weeks; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — NovoMix (biphasic insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novomix',
  },
  {
    brandName: 'NovoMix 70 FlexPen 100 units/mL',
    brandNameAr: 'نوفوميكس 70 فليكسبن 100 وحدة/مل',
    genericName: 'Insulin aspart',
    drugClassNameEn: 'Biphasic (Premixed) Insulin Analogues (70% Soluble / 30% Protamine)',
    dosageForm: 'Suspension for injection in pre-filled pen (FlexPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults requiring intensive postprandial glucose control with a 70% soluble / 30% protamine-crystallised insulin aspart suspension.',
    adultDosage:
      'Subcutaneous injection immediately before meals (typically three times daily before main meals), individualized by blood glucose monitoring. Resuspend thoroughly before use.',
    contraindications:
      'Hypersensitivity to insulin aspart or any of the excipients; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 4 weeks; do not refrigerate.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — NovoMix (biphasic insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novomix',
  },
  {
    brandName: 'Levemir FlexPen 100 units/mL',
    brandNameAr: 'ليفيمير فليكسبن 100 وحدة/مل',
    genericName: 'Insulin detemir',
    drugClassNameEn: 'Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (FlexPen)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above.',
    adultDosage:
      'Combined with oral antidiabetic medicines or GLP-1 receptor agonists: 10 units (or 0.1–0.2 units/kg) subcutaneously once daily in the evening or at bedtime, titrated according to fasting self-measured plasma glucose. In basal-bolus regimens: administered once or twice daily according to patient needs.',
    contraindications:
      'Hypersensitivity to insulin detemir or any of the excipients; active hypoglycaemia. Do not administer intravenously or in insulin infusion pumps.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions (pain, redness, hives, inflammation, swelling), lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Levemir (insulin detemir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/levemir',
  },
  {
    brandName: 'Levemir Penfill 100 units/mL',
    brandNameAr: 'ليفيمير بنفيل 100 وحدة/مل',
    genericName: 'Insulin detemir',
    drugClassNameEn: 'Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in cartridge (Penfill)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 1 year and above using durable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Subcutaneous injection once or twice daily into the thigh, abdominal wall, upper arm, or deltoid region; rotate injection sites within the same anatomical area.',
    contraindications:
      'Hypersensitivity to insulin detemir or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Levemir (insulin detemir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/levemir',
  },
  {
    brandName: 'Tresiba FlexTouch 100 units/mL',
    brandNameAr: 'تريسيبا فليكستاتش 100 وحدة/مل',
    genericName: 'Insulin degludec',
    drugClassNameEn: 'Ultra-Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children from the age of 1 year.',
    adultDosage:
      'Administered subcutaneously once daily at any time of the day, preferably at the same time every day (minimum 8 hours must elapse between injections if dosing time is flexibly adjusted). Type 2 diabetes starting dose: 10 units once daily, titrated weekly based on fasting plasma glucose.',
    contraindications:
      'Hypersensitivity to insulin degludec or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C (or at 2°C–8°C) for up to 8 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Tresiba (insulin degludec) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tresiba',
  },
  {
    brandName: 'Tresiba FlexTouch 200 units/mL',
    brandNameAr: 'تريسيبا فليكستاتش 200 وحدة/مل',
    genericName: 'Insulin degludec',
    drugClassNameEn: 'Ultra-Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '200 units/mL',
    route: 'Subcutaneous',
    packSize: '3 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children from the age of 1 year requiring higher basal insulin doses in half the injection volume (dose window shows exact units from 2 to 160 units per injection in 2-unit increments).',
    adultDosage:
      'Subcutaneous injection once daily at any time of the day (minimum 8 hours between doses). Unit-for-unit conversion when switching between Tresiba 100 units/mL and 200 units/mL; never withdraw insulin from the pen with a syringe.',
    contraindications:
      'Hypersensitivity to insulin degludec or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C (or at 2°C–8°C) for up to 8 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Tresiba (insulin degludec) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tresiba',
  },
  {
    brandName: 'Tresiba Penfill 100 units/mL',
    brandNameAr: 'تريسيبا بنفيل 100 وحدة/مل',
    genericName: 'Insulin degludec',
    drugClassNameEn: 'Ultra-Long-Acting Basal Insulin Analogues',
    dosageForm: 'Solution for injection in cartridge (Penfill)',
    strength: '100 units/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children from the age of 1 year using compatible Novo Nordisk reusable insulin pens.',
    adultDosage:
      'Subcutaneous injection once daily at any time of the day (minimum 8 hours between injections); titrate dose based on fasting plasma glucose.',
    contraindications:
      'Hypersensitivity to insulin degludec or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 8 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Tresiba (insulin degludec) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tresiba',
  },
  {
    brandName: 'Ryzodeg FlexTouch 100 units/mL',
    brandNameAr: 'ريزوديغ فليكستاتش 100 وحدة/مل',
    genericName: 'Insulin degludec + Insulin aspart',
    drugClassNameEn: 'Soluble Basal and Rapid-Acting Insulin Analogue Co-Formulations (70% / 30%)',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '100 units/mL (70% insulin degludec / 30% insulin aspart)',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus in adults, adolescents, and children from the age of 2 years.',
    adultDosage:
      'Administered subcutaneously once or twice daily with the main meal(s). In insulin-naive type 2 diabetes: start with 10 units once daily with the largest meal (or 5 units twice daily with the two main meals), titrated weekly by fasting plasma glucose. Clear solution; does not require resuspension.',
    contraindications:
      'Hypersensitivity to insulin degludec, insulin aspart, or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C (or at 2°C–8°C) for up to 4 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Ryzodeg (insulin degludec / insulin aspart) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ryzodeg',
  },
  {
    brandName: 'Xultophy 100 units/mL + 3.6 mg/mL',
    brandNameAr: 'زولتوفي 100 وحدة/مل + 3.6 ملغم/مل',
    genericName: 'Insulin degludec + Liraglutide',
    drugClassNameEn: 'Fixed-Ratio Basal Insulin and GLP-1 Receptor Agonist Combinations',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '100 units/mL + 3.6 mg/mL',
    route: 'Subcutaneous',
    packSize: '3 pre-filled pens x 3 mL',
    indications:
      'Treatment of adults with insufficiently controlled type 2 diabetes mellitus to improve glycaemic control as an adjunct to diet and exercise in addition to other oral medicinal products for the treatment of diabetes.',
    adultDosage:
      'Administered subcutaneously once daily at any time of the day (preferably at the same time each day), independent of meals, dosed in dose steps (1 dose step = 1 unit insulin degludec + 0.036 mg liraglutide). Starting dose: 10 dose steps when adding to oral antidiabetics, or 16 dose steps when transferring from GLP-1 receptor agonist or basal insulin; maximum daily dose is 50 dose steps (50 units / 1.8 mg).',
    contraindications:
      'Hypersensitivity to insulin degludec, liraglutide, or any of the excipients.',
    sideEffects:
      'Hypoglycaemia, nausea, diarrhoea, vomiting, decreased appetite, dyspepsia, constipation, increased lipase/amylase, and injection-site reactions.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C or in a refrigerator (2°C–8°C) for up to 21 days with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xultophy (insulin degludec / liraglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xultophy',
  },

  // =========================================================================
  // 2. HUMAN INSULINS — ACTRAPID, INSULATARD & MIXTARD 30 (8 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Actrapid 100 IU/mL Vial',
    brandNameAr: 'أكترابيد 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Short-Acting Soluble Human Insulins (rDNA)',
    dosageForm: 'Solution for injection in vial',
    strength: '100 IU/mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of diabetes mellitus in adults and children, including emergency inpatient intravenous management of diabetic ketoacidosis, hyperosmolar hyperglycaemic states, and perioperative glycaemic control.',
    adultDosage:
      'Subcutaneous injection 30 minutes before a meal or carbohydrate-containing snack (onset ~30 minutes, peak 1.5–3.5 hours, duration 7–8 hours). Intravenous administration by healthcare professionals at concentrations of 0.05 to 1.0 IU/mL in infusion bags with close glucose and potassium monitoring.',
    contraindications:
      'Hypersensitivity to human insulin or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, hypokalaemia (particularly during IV infusion), injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 25°C for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'EMA EPAR — Actrapid (human insulin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/actrapid',
  },
  {
    brandName: 'Actrapid Penfill 100 IU/mL',
    brandNameAr: 'أكترابيد بنفيل 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Short-Acting Soluble Human Insulins (rDNA)',
    dosageForm: 'Solution for injection in cartridge (Penfill)',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus using durable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Injected subcutaneously into the abdominal wall, thigh, gluteal region, or deltoid region followed within 30 minutes by a meal or snack containing carbohydrates.',
    contraindications:
      'Hypersensitivity to human insulin or any of the excipients; active hypoglycaemia.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Actrapid (human insulin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/actrapid',
  },
  {
    brandName: 'Insulatard 100 IU/mL Vial',
    brandNameAr: 'إنسولاتارد 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Intermediate-Acting Isophane (NPH) Human Insulins',
    dosageForm: 'Suspension for injection in vial',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of diabetes mellitus requiring intermediate-acting basal insulin coverage.',
    adultDosage:
      'Administered subcutaneously (usually into the thigh or abdominal wall) once or twice daily, alone or combined with fast-acting insulin (onset within 1.5 hours, maximum effect 4–12 hours, duration up to 24 hours). Resuspend gently until uniformly white and cloudy before drawing up.',
    contraindications:
      'Hypersensitivity to human insulin or any of the excipients; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, cutaneous amyloidosis, and peripheral oedema.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 25°C for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — Insulatard (human insulin isophane) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/insulatard',
  },
  {
    brandName: 'Insulatard Penfill 100 IU/mL',
    brandNameAr: 'إنسولاتارد بنفيل 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Intermediate-Acting Isophane (NPH) Human Insulins',
    dosageForm: 'Suspension for injection in cartridge (Penfill)',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus using durable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Injected subcutaneously once or twice daily as basal insulin; invert cartridge up and down at least 10–20 times until the suspension is uniformly white and cloudy before each injection.',
    contraindications:
      'Hypersensitivity to human insulin or any excipient; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — Insulatard (human insulin isophane) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/insulatard',
  },
  {
    brandName: 'Insulatard FlexPen 100 IU/mL',
    brandNameAr: 'إنسولاتارد فليكسبن 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Intermediate-Acting Isophane (NPH) Human Insulins',
    dosageForm: 'Suspension for injection in pre-filled pen (FlexPen)',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus requiring intermediate-acting basal human insulin in a pre-filled pen.',
    adultDosage:
      'Subcutaneous injection once or twice daily; resuspend pen thoroughly before each injection until uniformly white and cloudy.',
    contraindications:
      'Hypersensitivity to human insulin or any excipient; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — Insulatard (human insulin isophane) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/insulatard',
  },
  {
    brandName: 'Mixtard 30 100 IU/mL Vial',
    brandNameAr: 'ميكستارد 30 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Biphasic (Premixed) Human Insulins (30% Soluble / 70% Isophane)',
    dosageForm: 'Suspension for injection in vial',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of diabetes mellitus requiring dual-acting (30% soluble short-acting and 70% isophane intermediate-acting) human insulin.',
    adultDosage:
      'Administered subcutaneously 30 minutes before a meal or carbohydrate-containing snack, once or twice daily according to individual requirements. Resuspend gently until uniformly white and cloudy before each withdrawal.',
    contraindications:
      'Hypersensitivity to human insulin or any excipient; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, weight gain, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 25°C for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Mixtard 30 (biphasic human insulin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mixtard',
  },
  {
    brandName: 'Mixtard 30 Penfill 100 IU/mL',
    brandNameAr: 'ميكستارد 30 بنفيل 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Biphasic (Premixed) Human Insulins (30% Soluble / 70% Isophane)',
    dosageForm: 'Suspension for injection in cartridge (Penfill)',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '5 cartridges x 3 mL',
    indications:
      'Treatment of diabetes mellitus using durable Novo Nordisk insulin delivery pens.',
    adultDosage:
      'Subcutaneous injection 30 minutes before meals (typically breakfast and evening meal); resuspend cartridge thoroughly until uniformly white and cloudy before each injection.',
    contraindications:
      'Hypersensitivity to human insulin or any excipient; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Mixtard 30 (biphasic human insulin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mixtard',
  },
  {
    brandName: 'Mixtard 30 FlexPen 100 IU/mL',
    brandNameAr: 'ميكستارد 30 فليكسبن 100 وحدة دولية/مل',
    genericName: 'Insulin human',
    drugClassNameEn: 'Biphasic (Premixed) Human Insulins (30% Soluble / 70% Isophane)',
    dosageForm: 'Suspension for injection in pre-filled pen (FlexPen)',
    strength: '100 IU/mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled pens x 3 mL',
    indications:
      'Treatment of diabetes mellitus requiring biphasic human insulin in a pre-filled pen.',
    adultDosage:
      'Subcutaneous injection 30 minutes before a meal once or twice daily; resuspend pen thoroughly until uniformly white and cloudy before each injection.',
    contraindications:
      'Hypersensitivity to human insulin or any excipient; active hypoglycaemia. Never administer intravenously.',
    sideEffects:
      'Hypoglycaemia, injection-site reactions, lipodystrophy, and cutaneous amyloidosis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). In use: store below 30°C for up to 6 weeks; do not refrigerate while in use.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Mixtard 30 (biphasic human insulin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mixtard',
  },

  // =========================================================================
  // 3. GLP-1 RECEPTOR AGONISTS — OZEMPIC, RYBELSUS, VICTOZA, SAXENDA, WEGOVY (14 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Ozempic 0.25 mg',
    brandNameAr: 'أوزمبيك 0.25 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '0.25 mg per dose (1.34 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.5 mL) + 4 NovoFine Plus needles',
    indications:
      'Treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise, as monotherapy when metformin is considered inappropriate due to intolerance or contraindications, or in addition to other medicinal products for the treatment of diabetes.',
    adultDosage:
      'Initiation dose to improve gastrointestinal tolerability: 0.25 mg injected subcutaneously once weekly for 4 weeks (into the abdomen, thigh, or upper arm at any time of day, with or without meals), then increase to 0.5 mg once weekly.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, constipation, dyspepsia, cholelithiasis, diabetic retinopathy complications (in patients with pre-existing retinopathy and insulin use), and hypoglycaemia when combined with a sulfonylurea or insulin.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Ozempic (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic',
  },
  {
    brandName: 'Ozempic 0.5 mg',
    brandNameAr: 'أوزمبيك 0.5 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '0.5 mg per dose (1.34 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.5 mL) + 4 NovoFine Plus needles',
    indications:
      'Maintenance treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise, including reduction of cardiovascular events in patients with established cardiovascular disease.',
    adultDosage:
      '0.5 mg injected subcutaneously once weekly on the same day each week, after 4 weeks of 0.25 mg once weekly; after at least 4 weeks on 0.5 mg once weekly, the dose may be increased to 1 mg once weekly to further improve glycaemic control.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, decreased appetite, increased lipase/amylase, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Ozempic (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic',
  },
  {
    brandName: 'Ozempic 1 mg',
    brandNameAr: 'أوزمبيك 1 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '1 mg per dose (1.34 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (3 mL) + 4 NovoFine Plus needles',
    indications:
      'Maintenance treatment of adults with type 2 diabetes mellitus as an adjunct to diet and exercise, as monotherapy when metformin is inappropriate, or in combination with other diabetes medicines.',
    adultDosage:
      '1 mg injected subcutaneously once weekly after at least 4 weeks on 0.5 mg once weekly; may be increased to 2 mg once weekly after at least 4 weeks on 1 mg once weekly if additional glycaemic control is needed.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, constipation, fatigue, cholelithiasis, diabetic retinopathy complications, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Ozempic (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic',
  },
  {
    brandName: 'Ozempic 2 mg',
    brandNameAr: 'أوزمبيك 2 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '2 mg per dose (2.68 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (3 mL) + 4 NovoFine Plus needles',
    indications:
      'Maintenance treatment of adults with type 2 diabetes mellitus requiring higher-dose once-weekly GLP-1 receptor agonist therapy after at least 4 weeks on 1 mg once weekly.',
    adultDosage:
      '2 mg injected subcutaneously once weekly (maximum recommended weekly dose for type 2 diabetes).',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, dyspepsia, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Ozempic (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic',
  },
  {
    brandName: 'Rybelsus 3 mg',
    brandNameAr: 'ريبلسس 3 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Oral Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Tablet',
    strength: '3 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of adults with insufficiently controlled type 2 diabetes mellitus to improve glycaemic control as an adjunct to diet and exercise, as monotherapy when metformin is inappropriate, or in combination with other diabetes medicines.',
    adultDosage:
      'Starting dose: 3 mg once daily for 1 month on an empty stomach at any time of day, swallowed whole with up to half a glass of water (up to 120 mL); wait at least 30 minutes before eating, drinking, or taking other oral medicinal products. Increase to 7 mg once daily after 1 month.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, abdominal pain, vomiting, decreased appetite, dyspepsia, constipation, and hypoglycaemia when combined with insulin or a sulfonylurea.',
    storageConditions:
      'Store in the original alu/alu blister package in order to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Rybelsus (oral semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rybelsus',
  },
  {
    brandName: 'Rybelsus 7 mg',
    brandNameAr: 'ريبلسس 7 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Oral Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Tablet',
    strength: '7 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Maintenance treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise.',
    adultDosage:
      '7 mg once daily on an empty stomach with up to 120 mL of water, waiting at least 30 minutes before food, drink, or other oral medicines; after at least 1 month on 7 mg once daily, may be increased to 14 mg once daily.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, decreased appetite, constipation, cholelithiasis, and diabetic retinopathy complications.',
    storageConditions:
      'Store in the original blister package in order to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Rybelsus (oral semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rybelsus',
  },
  {
    brandName: 'Rybelsus 14 mg',
    brandNameAr: 'ريبلسس 14 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'Oral Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Tablet',
    strength: '14 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Maximum maintenance dose for adults with insufficiently controlled type 2 diabetes mellitus requiring additional glycaemic reduction beyond 7 mg once daily.',
    adultDosage:
      '14 mg (one 14 mg tablet; do not take two 7 mg tablets to achieve a 14 mg dose) once daily on an empty stomach with up to 120 mL of water, at least 30 minutes before food, drink, or other oral medications.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, constipation, dyspepsia, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Store in the original blister package in order to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Rybelsus (oral semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rybelsus',
  },
  {
    brandName: 'Victoza 6 mg/mL',
    brandNameAr: 'فيكتوزا 6 ملغم/مل',
    genericName: 'Liraglutide',
    drugClassNameEn: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '6 mg/mL',
    route: 'Subcutaneous',
    packSize: '2 pre-filled pens x 3 mL',
    indications:
      'Treatment of adults, adolescents, and children aged 10 years and above with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise, as monotherapy when metformin is inappropriate, or in addition to other medicinal products for the treatment of diabetes.',
    adultDosage:
      'Starting dose is 0.6 mg subcutaneously once daily for at least 1 week; increase to 1.2 mg once daily, and after at least 1 week may be further increased to 1.8 mg once daily to improve glycaemic control (maximum 1.8 mg daily). Administer at any time of day, independent of meals.',
    contraindications:
      'Hypersensitivity to liraglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, dyspepsia, upper abdominal pain, constipation, anorexia, headache, cholelithiasis, increased heart rate, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C or in a refrigerator (2°C–8°C) for up to 1 month with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Victoza (liraglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/victoza',
  },
  {
    brandName: 'Saxenda 6 mg/mL',
    brandNameAr: 'ساكسيندا 6 ملغم/مل',
    genericName: 'Liraglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '6 mg/mL',
    route: 'Subcutaneous',
    packSize: '3 pre-filled pens x 3 mL',
    indications:
      'Adjunct to a reduced-calorie diet and increased physical activity for weight management in adult patients with an initial BMI of ≥30 kg/m² (obesity), or ≥27 kg/m² to <30 kg/m² (overweight) in the presence of at least one weight-related comorbidity (dysglycaemia, hypertension, dyslipidaemia, or obstructive sleep apnoea), and in adolescents aged ≥12 years with obesity.',
    adultDosage:
      'Starting dose is 0.6 mg subcutaneously once daily, escalated in weekly increments of 0.6 mg over 4 weeks (0.6 mg, 1.2 mg, 1.8 mg, 2.4 mg) to the maintenance dose of 3.0 mg once daily. Discontinue if patients have not lost at least 5% of initial body weight after 12 weeks on 3.0 mg/day.',
    contraindications:
      'Hypersensitivity to liraglutide or any of the excipients; pregnancy.',
    sideEffects:
      'Nausea, vomiting, diarrhoea, constipation, dyspepsia, cholelithiasis, cholecystitis, insomnia, dizziness, fatigue, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. In use: store below 30°C or in a refrigerator (2°C–8°C) for up to 1 month with the pen cap on.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Saxenda (liraglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/saxenda',
  },
  {
    brandName: 'Wegovy 0.25 mg',
    brandNameAr: 'ويغوفي 0.25 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '0.25 mg per dose',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.5 mL, 4 doses) + 4 NovoFine Plus needles',
    indications:
      'Adjunct to a reduced-calorie diet and increased physical activity for weight management, including weight loss and weight maintenance, in adults with an initial BMI of ≥30 kg/m² (obesity) or ≥27 kg/m² to <30 kg/m² (overweight) in the presence of at least one weight-related comorbidity, and in adolescents aged ≥12 years with obesity.',
    adultDosage:
      'Weeks 1–4 initiation step: 0.25 mg injected subcutaneously once weekly, before escalating every 4 weeks through 0.5 mg, 1 mg, and 1.7 mg to the maintenance dose of 2.4 mg once weekly.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, dizziness, abdominal distension, and cholelithiasis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Wegovy (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
  },
  {
    brandName: 'Wegovy 0.5 mg',
    brandNameAr: 'ويغوفي 0.5 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '0.5 mg per dose',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.5 mL, 4 doses) + 4 NovoFine Plus needles',
    indications:
      'Dose-escalation step 2 (weeks 5–8) in chronic weight management for adults with obesity (BMI ≥30 kg/m²) or overweight (BMI ≥27 kg/m²) with weight-related comorbidities, and adolescents aged ≥12 years with obesity.',
    adultDosage:
      'Weeks 5–8 dose-escalation step: 0.5 mg injected subcutaneously once weekly for 4 weeks, before advancing to 1 mg once weekly.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, headache, fatigue, and cholelithiasis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Wegovy (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
  },
  {
    brandName: 'Wegovy 1 mg',
    brandNameAr: 'ويغوفي 1 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '1 mg per dose',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (3 mL, 4 doses) + 4 NovoFine Plus needles',
    indications:
      'Dose-escalation step 3 (weeks 9–12) in chronic weight management for adults with obesity or overweight with weight-related comorbidities, and adolescents aged ≥12 years with obesity.',
    adultDosage:
      'Weeks 9–12 dose-escalation step: 1 mg injected subcutaneously once weekly for 4 weeks, before advancing to 1.7 mg once weekly.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, dyspepsia, headache, fatigue, and cholelithiasis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Wegovy (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
  },
  {
    brandName: 'Wegovy 1.7 mg',
    brandNameAr: 'ويغوفي 1.7 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '1.7 mg per dose',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (3 mL, 4 doses) + 4 NovoFine Plus needles',
    indications:
      'Dose-escalation step 4 (weeks 13–16) and alternative maintenance dose in chronic weight management for adults and adolescents aged ≥12 years.',
    adultDosage:
      'Weeks 13–16 dose-escalation step: 1.7 mg injected subcutaneously once weekly for 4 weeks, before advancing to the target maintenance dose of 2.4 mg once weekly (1.7 mg once weekly may be maintained if 2.4 mg is not tolerated).',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, fatigue, headache, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Wegovy (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
  },
  {
    brandName: 'Wegovy 2.4 mg',
    brandNameAr: 'ويغوفي 2.4 ملغم',
    genericName: 'Semaglutide',
    drugClassNameEn: 'GLP-1 Receptor Agonists for Chronic Weight Management',
    dosageForm: 'Solution for injection in pre-filled pen (FlexTouch)',
    strength: '2.4 mg per dose',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (3 mL, 4 doses) + 4 NovoFine Plus needles',
    indications:
      'Target maintenance dose for chronic weight management and cardiovascular risk reduction in adults with obesity (BMI ≥30 kg/m²) or overweight (BMI ≥27 kg/m²) with weight-related comorbidities, and in adolescents aged ≥12 years with obesity.',
    adultDosage:
      'Week 17 and onwards maintenance dose: 2.4 mg injected subcutaneously once weekly on the same day each week, with or without meals.',
    contraindications:
      'Hypersensitivity to semaglutide or any of the excipients.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, constipation, abdominal pain, headache, fatigue, dyspepsia, eructation, cholelithiasis, and rare acute pancreatitis.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C). After first opening: store below 30°C or in a refrigerator (2°C–8°C) for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Wegovy (semaglutide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
  },

  // =========================================================================
  // 4. ORAL ANTIDIABETIC, HYPOGLYCAEMIA, GROWTH HORMONE, HAEMOPHILIA & HRT (12 PRODUCTS)
  // =========================================================================
  {
    brandName: 'NovoNorm 0.5 mg',
    brandNameAr: 'نوفونورم 0.5 ملغم',
    genericName: 'Repaglinide',
    drugClassNameEn: 'Meglitinide Prandial Glucose Regulators',
    dosageForm: 'Tablet',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '90 tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus whose hyperglycaemia can no longer be controlled satisfactorily by diet, weight reduction, and exercise; also indicated in combination with metformin when metformin alone is not satisfactory.',
    adultDosage:
      'Recommended starting dose is 0.5 mg taken orally within 15 minutes before each main meal (up to 30 minutes before meals); if a meal is skipped, skip the corresponding dose. Adjust dose at 1- to 2-week intervals (maximum single dose 4 mg; maximum daily dose 16 mg).',
    contraindications:
      'Hypersensitivity to repaglinide, type 1 diabetes mellitus (C-peptide negative), diabetic ketoacidosis, severe hepatic function disorders, and concomitant use of gemfibrozil.',
    sideEffects:
      'Hypoglycaemia, abdominal pain, diarrhoea, nausea, vomiting, constipation, and transient visual disturbances at therapy initiation.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — NovoNorm (repaglinide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novonorm',
  },
  {
    brandName: 'NovoNorm 1 mg',
    brandNameAr: 'نوفونورم 1 ملغم',
    genericName: 'Repaglinide',
    drugClassNameEn: 'Meglitinide Prandial Glucose Regulators',
    dosageForm: 'Tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '90 tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus as monotherapy or in combination with metformin.',
    adultDosage:
      '1 mg taken orally within 15 minutes before each main meal (initial dose when transferring from another oral hypoglycaemic medicinal product); titrate up to a maximum of 4 mg per main meal (maximum 16 mg/day).',
    contraindications:
      'Hypersensitivity to repaglinide, type 1 diabetes mellitus, diabetic ketoacidosis, severe hepatic impairment, and concomitant gemfibrozil.',
    sideEffects:
      'Hypoglycaemia, abdominal pain, diarrhoea, nausea, and rare hepatic enzyme elevations.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — NovoNorm (repaglinide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novonorm',
  },
  {
    brandName: 'NovoNorm 2 mg',
    brandNameAr: 'نوفونورم 2 ملغم',
    genericName: 'Repaglinide',
    drugClassNameEn: 'Meglitinide Prandial Glucose Regulators',
    dosageForm: 'Tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '90 tablets',
    indications:
      'Maintenance prandial glucose regulation in adults with type 2 diabetes mellitus as monotherapy or in combination with metformin.',
    adultDosage:
      '2 mg to 4 mg taken orally within 15 minutes before each main meal (2, 3, or 4 times daily depending on meal pattern; maximum 16 mg daily).',
    contraindications:
      'Hypersensitivity to repaglinide, type 1 diabetes mellitus, diabetic ketoacidosis, severe hepatic impairment, and concomitant gemfibrozil.',
    sideEffects:
      'Hypoglycaemia, abdominal pain, diarrhoea, nausea, vomiting, and constipation.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — NovoNorm (repaglinide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novonorm',
  },
  {
    brandName: 'GlucaGen HypoKit 1 mg',
    brandNameAr: 'غلوكاغين هايبوكيت 1 ملغم',
    genericName: 'Glucagon',
    drugClassNameEn: 'Glycogenolytic Hormones (Emergency Antihypoglycaemic Agents)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '1 mg (1 IU)',
    route: 'Subcutaneous / Intramuscular / Intravenous',
    packSize: '1 vial powder + 1 pre-filled syringe of water for injections (1 mL)',
    indications:
      'Treatment of severe hypoglycaemic reactions which may occur in insulin-treated children and adults with diabetes mellitus; and diagnostic motility inhibition in examinations of the gastrointestinal tract in adults.',
    adultDosage:
      'Severe hypoglycaemia: Adults and children >25 kg (or >6–8 years): inject entire 1 mg (1 mL) subcutaneously or intramuscularly; Children <25 kg (or <6–8 years): inject 0.5 mg (0.5 mL). Once the patient has responded (usually within 10 minutes), give oral carbohydrates to restore liver glycogen and prevent relapse.',
    contraindications:
      'Hypersensitivity to glucagon or lactose, and phaeochromocytoma.',
    sideEffects:
      'Nausea, vomiting, abdominal pain, tachycardia, transient blood pressure elevation, and rebound hypoglycaemia (especially in insulinoma).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze. The user may keep GlucaGen HypoKit at a temperature not exceeding 25°C for 18 months provided the expiry date is not exceeded.',
    specialties: ['Endocrinology', 'Emergency Medicine', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'UK EMC — GlucaGen HypoKit 1 mg (glucagon) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1289/smpc',
  },
  {
    brandName: 'Norditropin FlexPro 5 mg/1.5 mL',
    brandNameAr: 'نورديتروبين فليكسبرو 5 ملغم/1.5 مل',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in pre-filled pen (FlexPro)',
    strength: '5 mg / 1.5 mL (3.3 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen x 1.5 mL',
    indications:
      'Growth failure in children due to growth hormone deficiency (GHD), Turner syndrome, chronic renal disease, Noonan syndrome, or short children born small for gestational age (SGA); and replacement therapy in adults with pronounced childhood-onset or adult-onset growth hormone deficiency.',
    adultDosage:
      'Subcutaneous injection in the evening: Paediatric GHD 0.025–0.035 mg/kg/day; Turner syndrome 0.045–0.067 mg/kg/day; SGA 0.035 mg/kg/day; Adult GHD starting dose 0.15–0.3 mg/day titrated monthly by clinical response and serum IGF-1.',
    contraindications:
      'Closed epiphyses (when used for growth promotion in children), any evidence of activity of a tumour, acute critical illness due to complications following open heart surgery, abdominal surgery, multiple accidental trauma, or acute respiratory failure.',
    sideEffects:
      'Peripheral oedema, arthralgia, myalgia, paraesthesia, carpal tunnel syndrome (in adults), headache, injection-site reactions, and reduced insulin sensitivity.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C) in the outer carton; do not freeze. After first opening: store up to 4 weeks in a refrigerator (2°C–8°C) or up to 3 weeks below 25°C.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'FDA Prescribing Information — Norditropin FlexPro (somatropin) Injection',
    sourceUrl: 'https://www.novo-pi.com/norditropin.pdf',
  },
  {
    brandName: 'Norditropin FlexPro 10 mg/1.5 mL',
    brandNameAr: 'نورديتروبين فليكسبرو 10 ملغم/1.5 مل',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in pre-filled pen (FlexPro)',
    strength: '10 mg / 1.5 mL (6.7 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen x 1.5 mL',
    indications:
      'Growth failure in children due to growth hormone deficiency, Turner syndrome, chronic renal disease, Noonan syndrome, or short stature born small for gestational age (SGA), and replacement therapy in adult growth hormone deficiency.',
    adultDosage:
      'Subcutaneous injection in the evening, rotating injection sites daily to prevent lipoatrophy; dose individualized by body weight/BSA in children and by serum IGF-1 levels in adults.',
    contraindications:
      'Closed epiphyses (for paediatric growth promotion), active malignancy, and acute critical illness following major surgery, trauma, or acute respiratory failure.',
    sideEffects:
      'Peripheral fluid retention, arthralgia, myalgia, headache, paraesthesia, injection-site reactions, and hyperglycaemia.',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. After first opening: store up to 4 weeks at 2°C–8°C or up to 3 weeks below 25°C.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'FDA Prescribing Information — Norditropin FlexPro (somatropin) Injection',
    sourceUrl: 'https://www.novo-pi.com/norditropin.pdf',
  },
  {
    brandName: 'Norditropin FlexPro 15 mg/1.5 mL',
    brandNameAr: 'نورديتروبين فليكسبرو 15 ملغم/1.5 مل',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in pre-filled pen (FlexPro)',
    strength: '15 mg / 1.5 mL (10 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen x 1.5 mL',
    indications:
      'Growth failure in children and adolescents due to growth hormone deficiency, Turner syndrome, chronic renal disease, Noonan syndrome, or SGA, and adult growth hormone deficiency.',
    adultDosage:
      'Subcutaneous injection in the evening via Norditropin FlexPro pen, individualized by body weight/BSA in children and adolescents and by serum IGF-1 in adults.',
    contraindications:
      'Closed epiphyses (for paediatric growth promotion), active malignancy, and acute critical illness.',
    sideEffects:
      'Peripheral oedema, arthralgia, myalgia, headache, injection-site reactions, unmasking of hypothyroidism, and benign intracranial hypertension (rare).',
    storageConditions:
      'Before opening: store in a refrigerator (2°C–8°C); do not freeze. After first opening: store up to 4 weeks at 2°C–8°C or up to 3 weeks below 25°C.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'FDA Prescribing Information — Norditropin FlexPro (somatropin) Injection',
    sourceUrl: 'https://www.novo-pi.com/norditropin.pdf',
  },
  {
    brandName: 'NovoSeven 1 mg',
    brandNameAr: 'نوفوسيفن 1 ملغم',
    genericName: 'Eptacog alfa (activated)',
    drugClassNameEn: 'Recombinant Coagulation Factor VIIa (Bypassing Agents)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '1 mg (50 KIU)',
    route: 'Intravenous bolus',
    packSize: '1 vial powder + 1 vial/pre-filled syringe solvent (1.1 mL)',
    indications:
      'Treatment of bleeding episodes and for the prevention of bleeding in those undergoing surgery or invasive procedures in patients with congenital haemophilia with inhibitors to coagulation factors VIII or IX (>5 BU), acquired haemophilia, congenital factor VII deficiency, and Glanzmann thrombasthenia with past or present refractoriness to platelet transfusions; and treatment of severe postpartum haemorrhage when uterotonics are insufficient.',
    adultDosage:
      'Haemophilia A or B with inhibitors or acquired haemophilia: 90 mcg/kg body weight given by intravenous bolus injection over 2–5 minutes every 2–3 hours until haemostasis is achieved (or single bolus dose of 270 mcg/kg in mild-to-moderate bleeds). Congenital Factor VII deficiency: 15–30 mcg/kg every 4–6 hours.',
    contraindications:
      'Hypersensitivity to eptacog alfa (activated), or to mouse, hamster, or bovine protein.',
    sideEffects:
      'Venous and arterial thromboembolic events, pyrexia, rash, decreased therapeutic response, and headache.',
    storageConditions:
      'Store below 25°C in the original package to protect from light; do not freeze. Administer immediately after reconstitution.',
    specialties: ['Hematology', 'Emergency Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — NovoSeven (eptacog alfa activated) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novoseven',
  },
  {
    brandName: 'NovoSeven 2 mg',
    brandNameAr: 'نوفوسيفن 2 ملغم',
    genericName: 'Eptacog alfa (activated)',
    drugClassNameEn: 'Recombinant Coagulation Factor VIIa (Bypassing Agents)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '2 mg (100 KIU)',
    route: 'Intravenous bolus',
    packSize: '1 vial powder + 1 vial/pre-filled syringe solvent (2.1 mL)',
    indications:
      'Treatment of bleeding episodes and surgical prophylaxis in congenital haemophilia with inhibitors, acquired haemophilia, congenital factor VII deficiency, Glanzmann thrombasthenia, and severe postpartum haemorrhage.',
    adultDosage:
      'Haemophilia with inhibitors / acquired haemophilia: 90 mcg/kg by intravenous bolus over 2–5 minutes every 2–3 hours until haemostasis is achieved. Severe postpartum haemorrhage: 60–90 mcg/kg intravenous bolus.',
    contraindications:
      'Hypersensitivity to eptacog alfa (activated), or to mouse, hamster, or bovine protein.',
    sideEffects:
      'Arterial and venous thromboembolic events, pyrexia, rash, and injection-site reactions.',
    storageConditions:
      'Store below 25°C protected from light; do not freeze.',
    specialties: ['Hematology', 'Emergency Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — NovoSeven (eptacog alfa activated) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novoseven',
  },
  {
    brandName: 'NovoSeven 5 mg',
    brandNameAr: 'نوفوسيفن 5 ملغم',
    genericName: 'Eptacog alfa (activated)',
    drugClassNameEn: 'Recombinant Coagulation Factor VIIa (Bypassing Agents)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '5 mg (250 KIU)',
    route: 'Intravenous bolus',
    packSize: '1 vial powder + 1 vial/pre-filled syringe solvent (5.2 mL)',
    indications:
      'Treatment of bleeding episodes and surgical bleeding prophylaxis in congenital haemophilia with inhibitors, acquired haemophilia, congenital factor VII deficiency, Glanzmann thrombasthenia, and severe postpartum haemorrhage.',
    adultDosage:
      'Haemophilia with inhibitors / acquired haemophilia: 90 mcg/kg by slow intravenous bolus over 2–5 minutes every 2–3 hours (or 270 mcg/kg single bolus in mild-to-moderate bleeding).',
    contraindications:
      'Hypersensitivity to eptacog alfa (activated), or to mouse, hamster, or bovine protein.',
    sideEffects:
      'Thromboembolic events (myocardial ischaemia, cerebral infarction, deep vein thrombosis, pulmonary embolism), pyrexia, and rash.',
    storageConditions:
      'Store below 25°C protected from light; do not freeze.',
    specialties: ['Hematology', 'Emergency Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA EPAR — NovoSeven (eptacog alfa activated) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novoseven',
  },
  {
    brandName: 'NovoEight 500 IU',
    brandNameAr: 'نوفوإيت 500 وحدة دولية',
    genericName: 'Turoctocog alfa',
    drugClassNameEn: 'Recombinant Coagulation Factor VIII',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '500 IU',
    route: 'Intravenous',
    packSize: '1 vial powder + 1 pre-filled syringe of 0.9% NaCl solvent (4 mL)',
    indications:
      'Treatment and prophylaxis of bleeding in patients with haemophilia A (congenital factor VIII deficiency) of all age groups.',
    adultDosage:
      'On-demand bleeding treatment: required IU = body weight (kg) x desired factor VIII rise (%) x 0.5, administered intravenously at 1–2 mL/min. Long-term prophylaxis: 20–40 IU/kg every second day or 20–50 IU/kg three times weekly.',
    contraindications:
      'Hypersensitivity to turoctocog alfa or any of the excipients, or known allergic reaction to hamster protein.',
    sideEffects:
      'Factor VIII inhibition (neutralising antibodies, particularly in previously untreated patients), injection-site reactions, pyrexia, and increased hepatic enzymes.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C); do not freeze. May be stored at up to 30°C for a single period not exceeding 9 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NovoEight (turoctocog alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/novoeight',
  },
  {
    brandName: 'Vagifem 10 mcg',
    brandNameAr: 'فاجيفيم 10 ميكروغرام',
    genericName: 'Estradiol',
    drugClassNameEn: 'Local Vaginal Oestrogens',
    dosageForm: 'Vaginal tablet',
    strength: '10 mcg',
    route: 'Vaginal',
    packSize: '18 vaginal tablets in single-use applicators',
    indications:
      'Treatment of vaginal atrophy due to oestrogen deficiency in postmenopausal women.',
    adultDosage:
      'Initial dose: 1 vaginal tablet (10 mcg) daily for 2 weeks, inserted into the vagina using the single-use applicator. Maintenance dose: 1 vaginal tablet twice a week with a 3- or 4-day interval between doses.',
    contraindications:
      'Known, past, or suspected breast cancer; known or suspected oestrogen-dependent malignant tumours (endometrial cancer); undiagnosed genital bleeding; untreated endometrial hyperplasia; previous or current venous thromboembolism (DVT, pulmonary embolism) or arterial thromboembolic disease; acute liver disease; and porphyria.',
    sideEffects:
      'Headache, abdominal pain, vaginal haemorrhage, vaginal discharge, or vaginal discomfort, and vulvovaginal mycotic infection.',
    storageConditions:
      'Do not refrigerate. Keep the blister in the outer carton in order to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'UK EMC — Vagifem 10 micrograms (estradiol) Vaginal Tablets Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5719/pil',
  },
];

export const NOVO_NORDISK_PRODUCTS: AiProductDraft[] = NOVO_COMPACT_PRODUCTS.map(toNovoProductDraft);
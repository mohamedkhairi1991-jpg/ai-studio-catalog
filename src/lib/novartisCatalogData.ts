import type { AiDraftSource, AiProductDraft } from './catalog';

const NVS_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactNovartisDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  drugClassNameEn: string;
  drugClassNameAr: string;
  dosageForm: string;
  strength: string;
  route: string;
  packSize: string;
  summary: string;
  indications: string;
  adultDosage: string;
  contraindications: string;
  sideEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

function toNovartisProductDraft(item: CompactNovartisDrug): AiProductDraft {
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
    sources: NVS_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Novartis Pharma AG regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

const NOVARTIS_COMPACT_PRODUCTS: CompactNovartisDrug[] = [
  // =========================================================================
  // 1. CARDIOVASCULAR, HYPERTENSION, HEART FAILURE & LIPIDS (17 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Diovan 80 mg',
    brandNameAr: 'ديوفان 80 ملغم',
    genericName: 'Valsartan',
    drugClassNameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '80 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Selective angiotensin II type 1 (AT1) receptor antagonist indicated for essential hypertension, recent myocardial infarction, and symptomatic heart failure.',
    indications:
      'Treatment of essential hypertension in adults and children aged 6 to less than 18 years; treatment of clinically stable adults with symptomatic heart failure or asymptomatic left ventricular systolic dysfunction after a recent (12 hours to 10 days) myocardial infarction; treatment of symptomatic heart failure in adults when ACE inhibitors are not tolerated.',
    adultDosage:
      'Hypertension: 80 mg once daily; may be increased to 160 mg or 320 mg once daily. Post-myocardial infarction: initiate at 20 mg twice daily and titrate to 40 mg, 80 mg, and 160 mg twice daily as tolerated. Heart failure: initiate at 40 mg twice daily and titrate up to 80 mg and 160 mg twice daily.',
    contraindications:
      'Hypersensitivity to valsartan or any excipient; severe hepatic impairment, biliary cirrhosis, and cholestasis; second and third trimesters of pregnancy; concomitant use with aliskiren in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    sideEffects:
      'Dizziness, postural dizziness, hypotension, orthostatic hypotension, renal impairment, increased serum creatinine, hyperkalemia, fatigue, neutropenia, and vertigo.',
    storageConditions: 'Store below 30°C in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan (valsartan) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan',
  },
  {
    brandName: 'Diovan 160 mg',
    brandNameAr: 'ديوفان 160 ملغم',
    genericName: 'Valsartan',
    drugClassNameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '160 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Standard maintenance strength of valsartan (160 mg) for essential hypertension, post-myocardial infarction left ventricular dysfunction, and chronic heart failure.',
    indications:
      'Treatment of essential hypertension; maintenance therapy after recent myocardial infarction (target 160 mg twice daily); treatment of symptomatic heart failure (target 160 mg twice daily).',
    adultDosage:
      'Hypertension: 160 mg once daily (may increase up to 320 mg once daily). Heart failure and post-MI maintenance: up to 160 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to valsartan; severe hepatic impairment, biliary cirrhosis, or cholestasis; second and third trimesters of pregnancy; concomitant aliskiren in diabetes mellitus or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Dizziness, hypotension, orthostatic hypotension, hyperkalemia, elevated blood urea nitrogen and serum creatinine, headache, and cough.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan (valsartan) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan',
  },
  {
    brandName: 'Diovan 320 mg',
    brandNameAr: 'ديوفان 320 ملغم',
    genericName: 'Valsartan',
    drugClassNameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '320 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'High-strength valsartan (320 mg) film-coated tablet for essential hypertension requiring maximum once-daily AT1 receptor blockade.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on lower doses of valsartan.',
    adultDosage:
      'One 320 mg tablet once daily with or without food. Maximum daily dose for hypertension is 320 mg.',
    contraindications:
      'Hypersensitivity to valsartan; severe hepatic impairment, biliary cirrhosis, and cholestasis; second and third trimesters of pregnancy; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Dizziness, postural hypotension, hyperkalemia, decreased renal function, fatigue, vertigo, and abdominal pain.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan (valsartan) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan',
  },
  {
    brandName: 'Co-Diovan 80 mg/12.5 mg',
    brandNameAr: 'كو-ديوفان 80 ملغم / 12.5 ملغم',
    genericName: 'Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'ARB & Thiazide Diuretic Combinations',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2 مع مدرات الثيازيد',
    dosageForm: 'Film-coated tablet',
    strength: '80 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of valsartan 80 mg and hydrochlorothiazide 12.5 mg for essential hypertension not adequately controlled by monotherapy.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled by valsartan or hydrochlorothiazide monotherapy.',
    adultDosage:
      'One tablet (80 mg/12.5 mg) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, or other sulfonamide-derived medicinal products; second and third trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, and cholestasis; severe renal impairment (creatinine clearance < 30 mL/min), anuria; refractory hypokalemia, hyponatremia, hypercalcemia, and symptomatic hyperuricemia; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Dizziness, hypotension, hypokalemia, hyponatremia, hyperuricemia, headache, fatigue, non-melanoma skin cancer with cumulative high-dose HCTZ, and cough.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan Comp / Co-Diovan (valsartan / hydrochlorothiazide) — EMA Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan-comp',
  },
  {
    brandName: 'Co-Diovan 160 mg/12.5 mg',
    brandNameAr: 'كو-ديوفان 160 ملغم / 12.5 ملغم',
    genericName: 'Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'ARB & Thiazide Diuretic Combinations',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2 مع مدرات الثيازيد',
    dosageForm: 'Film-coated tablet',
    strength: '160 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of valsartan 160 mg and hydrochlorothiazide 12.5 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled by valsartan 160 mg monotherapy.',
    adultDosage:
      'One tablet (160 mg/12.5 mg) once daily with or without food.',
    contraindications:
      'Hypersensitivity to valsartan or sulfonamide derivatives; second and third trimesters of pregnancy; severe hepatic impairment or cholestasis; severe renal impairment (CrCl < 30 mL/min) or anuria; refractory hypokalemia, hyponatremia, hypercalcemia, or symptomatic hyperuricemia.',
    sideEffects:
      'Dizziness, postural hypotension, electrolyte disturbances (hypokalemia, hyponatremia), hyperuricemia, fatigue, diarrhea, and nasopharyngitis.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan Comp / Co-Diovan (valsartan / hydrochlorothiazide) — EMA Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan-comp',
  },
  {
    brandName: 'Co-Diovan 160 mg/25 mg',
    brandNameAr: 'كو-ديوفان 160 ملغم / 25 ملغم',
    genericName: 'Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'ARB & Thiazide Diuretic Combinations',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2 مع مدرات الثيازيد',
    dosageForm: 'Film-coated tablet',
    strength: '160 mg / 25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of valsartan 160 mg and hydrochlorothiazide 25 mg for essential hypertension requiring higher thiazide diuretic dosing.',
    indications:
      'Treatment of essential hypertension in adults not adequately controlled by valsartan 160 mg or Co-Diovan 160 mg/12.5 mg.',
    adultDosage:
      'One tablet (160 mg/25 mg) once daily with or without food.',
    contraindications:
      'Hypersensitivity to active substances or sulfonamides; second and third trimesters of pregnancy; severe hepatic impairment or cholestasis; CrCl < 30 mL/min or anuria; refractory hypokalemia, hyponatremia, hypercalcemia, or symptomatic hyperuricemia.',
    sideEffects:
      'Dizziness, hypotension, hypokalemia, hyponatremia, hyperuricemia, hyperglycemia, syncope, and photosensitivity.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan Comp / Co-Diovan (valsartan / hydrochlorothiazide) — EMA Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan-comp',
  },
  {
    brandName: 'Co-Diovan 320 mg/12.5 mg',
    brandNameAr: 'كو-ديوفان 320 ملغم / 12.5 ملغم',
    genericName: 'Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'ARB & Thiazide Diuretic Combinations',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2 مع مدرات الثيازيد',
    dosageForm: 'Film-coated tablet',
    strength: '320 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'High-strength valsartan 320 mg combined with hydrochlorothiazide 12.5 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on valsartan 320 mg monotherapy.',
    adultDosage:
      'One tablet (320 mg/12.5 mg) once daily with or without food.',
    contraindications:
      'Hypersensitivity to valsartan or sulfonamide derivatives; second and third trimesters of pregnancy; severe hepatic impairment or cholestasis; CrCl < 30 mL/min or anuria; refractory electrolyte disorders.',
    sideEffects:
      'Dizziness, hypotension, hypokalemia, hyperuricemia, increased serum creatinine, headache, and fatigue.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan Comp / Co-Diovan (valsartan / hydrochlorothiazide) — EMA Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan-comp',
  },
  {
    brandName: 'Co-Diovan 320 mg/25 mg',
    brandNameAr: 'كو-ديوفان 320 ملغم / 25 ملغم',
    genericName: 'Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'ARB & Thiazide Diuretic Combinations',
    drugClassNameAr: 'حاصرات مستقبلات الأنجيوتنسين 2 مع مدرات الثيازيد',
    dosageForm: 'Film-coated tablet',
    strength: '320 mg / 25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Maximum-strength fixed-dose combination of valsartan 320 mg and hydrochlorothiazide 25 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension in adults not adequately controlled on lower-strength valsartan/hydrochlorothiazide combinations.',
    adultDosage:
      'One tablet (320 mg/25 mg) once daily (maximum recommended daily dose is 320 mg/25 mg).',
    contraindications:
      'Hypersensitivity to valsartan or sulfonamides; second and third trimesters of pregnancy; severe hepatic impairment or cholestasis; CrCl < 30 mL/min or anuria; refractory hypokalemia, hyponatremia, hypercalcemia, or symptomatic hyperuricemia.',
    sideEffects:
      'Dizziness, orthostatic hypotension, hypokalemia, hyponatremia, hyperuricemia, renal function changes, and fatigue.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Diovan Comp / Co-Diovan (valsartan / hydrochlorothiazide) — EMA Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diovan-comp',
  },
  {
    brandName: 'Exforge 5 mg/80 mg',
    brandNameAr: 'إكسفورج 5 ملغم / 80 ملغم',
    genericName: 'Amlodipine + Valsartan',
    drugClassNameEn: 'Calcium Channel Blocker & ARB Combinations',
    drugClassNameAr: 'حاصرات قنوات الكالسيوم مع حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 80 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of amlodipine 5 mg and valsartan 80 mg indicated for essential hypertension in adults.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on amlodipine or valsartan monotherapy.',
    adultDosage:
      'One 5 mg/80 mg tablet once daily with or without food. May be titrated to 5 mg/160 mg or 10 mg/160 mg once daily.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or valsartan; severe hepatic impairment, biliary cirrhosis, or cholestasis; concomitant use with aliskiren in diabetes mellitus or GFR < 60 mL/min/1.73 m²; second and third trimesters of pregnancy; severe hypotension, shock, left ventricular outflow tract obstruction (high-grade aortic stenosis), or hemodynamically unstable heart failure after acute MI.',
    sideEffects:
      'Nasopharyngitis, influenza, headache, peripheral edema, pitting edema, facial edema, flushing, asthenia, fatigue, dizziness, and somnolence.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Exforge (amlodipine / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exforge',
  },
  {
    brandName: 'Exforge 5 mg/160 mg',
    brandNameAr: 'إكسفورج 5 ملغم / 160 ملغم',
    genericName: 'Amlodipine + Valsartan',
    drugClassNameEn: 'Calcium Channel Blocker & ARB Combinations',
    drugClassNameAr: 'حاصرات قنوات الكالسيوم مع حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 160 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of amlodipine 5 mg and valsartan 160 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on amlodipine or valsartan monotherapy.',
    adultDosage:
      'One 5 mg/160 mg tablet once daily with or without food; may be increased to 10 mg/160 mg once daily if required.',
    contraindications:
      'Hypersensitivity to active substances or dihydropyridines; severe hepatic impairment, biliary cirrhosis, or cholestasis; second and third trimesters of pregnancy; severe hypotension, shock, or severe aortic stenosis; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Peripheral edema, headache, nasopharyngitis, dizziness, flushing, palpitations, orthostatic hypotension, and fatigue.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Exforge (amlodipine / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exforge',
  },
  {
    brandName: 'Exforge 10 mg/160 mg',
    brandNameAr: 'إكسفورج 10 ملغم / 160 ملغم',
    genericName: 'Amlodipine + Valsartan',
    drugClassNameEn: 'Calcium Channel Blocker & ARB Combinations',
    drugClassNameAr: 'حاصرات قنوات الكالسيوم مع حاصرات مستقبلات الأنجيوتنسين 2',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 160 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'High-strength fixed-dose combination of amlodipine 10 mg and valsartan 160 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on lower strengths of amlodipine/valsartan.',
    adultDosage:
      'One 10 mg/160 mg tablet once daily with or without food.',
    contraindications:
      'Hypersensitivity to amlodipine or valsartan; severe hepatic impairment, biliary cirrhosis, or cholestasis; second and third trimesters of pregnancy; severe hypotension, shock, or severe aortic stenosis; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Peripheral edema, headache, dizziness, flushing, palpitations, fatigue, asthenia, and hypotension.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Exforge (amlodipine / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exforge',
  },
  {
    brandName: 'Exforge HCT 5 mg/160 mg/12.5 mg',
    brandNameAr: 'إكسفورج إتش سي تي 5 ملغم / 160 ملغم / 12.5 ملغم',
    genericName: 'Amlodipine + Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'Triple Antihypertensive Combinations (CCB + ARB + Thiazide)',
    drugClassNameAr: 'مضادات ارتفاع ضغط الدم الثلاثية',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 160 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Single-pill triple combination of amlodipine 5 mg, valsartan 160 mg, and hydrochlorothiazide 12.5 mg for essential hypertension.',
    indications:
      'Treatment of essential hypertension as substitution therapy in adult patients whose blood pressure is adequately controlled on the combination of amlodipine, valsartan, and hydrochlorothiazide.',
    adultDosage:
      'One tablet (5 mg/160 mg/12.5 mg) once daily, preferably in the morning, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy; hepatic impairment, biliary cirrhosis, or cholestasis; severe renal impairment (GFR < 30 mL/min/1.73 m²), anuria, and patients undergoing dialysis; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m²; refractory hypokalemia, hyponatremia, hypercalcemia, and symptomatic hyperuricemia; severe hypotension, shock, or severe aortic stenosis.',
    sideEffects:
      'Dizziness, headache, hypotension, dyspepsia, pollakiuria, fatigue, peripheral edema, hypokalemia, and hyperuricemia.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Exforge HCT (amlodipine / valsartan / hydrochlorothiazide) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exforge-hct',
  },
  {
    brandName: 'Exforge HCT 10 mg/160 mg/25 mg',
    brandNameAr: 'إكسفورج إتش سي تي 10 ملغم / 160 ملغم / 25 ملغم',
    genericName: 'Amlodipine + Valsartan + Hydrochlorothiazide',
    drugClassNameEn: 'Triple Antihypertensive Combinations (CCB + ARB + Thiazide)',
    drugClassNameAr: 'مضادات ارتفاع ضغط الدم الثلاثية',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 160 mg / 25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'High-strength single-pill triple antihypertensive combination of amlodipine 10 mg, valsartan 160 mg, and hydrochlorothiazide 25 mg.',
    indications:
      'Treatment of essential hypertension as substitution therapy in adults controlled on the corresponding doses of amlodipine, valsartan, and hydrochlorothiazide.',
    adultDosage:
      'One tablet (10 mg/160 mg/25 mg) once daily, preferably in the morning, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy; hepatic impairment, biliary cirrhosis, or cholestasis; GFR < 30 mL/min/1.73 m², anuria, or dialysis; refractory hypokalemia, hyponatremia, hypercalcemia, or symptomatic hyperuricemia; severe hypotension, shock, or severe aortic stenosis.',
    sideEffects:
      'Dizziness, hypotension, peripheral edema, hypokalemia, hyperuricemia, headache, dyspepsia, and fatigue.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Exforge HCT (amlodipine / valsartan / hydrochlorothiazide) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exforge-hct',
  },
  {
    brandName: 'Entresto 24 mg/26 mg',
    brandNameAr: 'إنتريستو 24 ملغم / 26 ملغم',
    genericName: 'Sacubitril + Valsartan',
    drugClassNameEn: 'Angiotensin Receptor-Neprilysin Inhibitors (ARNIs)',
    drugClassNameAr: 'مثبطات مستقبلات الأنجيوتنسين والنيبريليسين',
    dosageForm: 'Film-coated tablet',
    strength: '24 mg / 26 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'First-in-class angiotensin receptor-neprilysin inhibitor (ARNI) starter strength (24 mg sacubitril / 26 mg valsartan) for symptomatic chronic heart failure with reduced ejection fraction.',
    indications:
      'Treatment of symptomatic chronic heart failure with reduced ejection fraction in adult patients; treatment of symptomatic chronic heart failure with left ventricular systolic dysfunction in children and adolescents aged one year and older.',
    adultDosage:
      'Starting dose of one 24 mg/26 mg tablet twice daily in patients not currently taking an ACE inhibitor or ARB, or taking low doses, or with severe renal/moderate hepatic impairment. Double the dose every 2 to 4 weeks to the target dose of 97 mg/103 mg twice daily as tolerated. Must not be administered for at least 36 hours after discontinuing ACE inhibitor therapy.',
    contraindications:
      'Hypersensitivity to sacubitril or valsartan; concomitant use with ACE inhibitors (do not administer within 36 hours of discontinuing an ACE inhibitor); known history of angioedema related to previous ACE inhibitor or ARB therapy; hereditary or idiopathic angioedema; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m²; severe hepatic impairment, biliary cirrhosis, and cholestasis; second and third trimesters of pregnancy.',
    sideEffects:
      'Hypotension, hyperkalemia, renal impairment, cough, dizziness, diarrhea, anemia, fatigue, hypokalemia, headache, and angioedema.',
    storageConditions: 'This medicinal product does not require any special temperature storage conditions. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Entresto (sacubitril / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/entresto',
  },
  {
    brandName: 'Entresto 49 mg/51 mg',
    brandNameAr: 'إنتريستو 49 ملغم / 51 ملغم',
    genericName: 'Sacubitril + Valsartan',
    drugClassNameEn: 'Angiotensin Receptor-Neprilysin Inhibitors (ARNIs)',
    drugClassNameAr: 'مثبطات مستقبلات الأنجيوتنسين والنيبريليسين',
    dosageForm: 'Film-coated tablet',
    strength: '49 mg / 51 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    summary:
      'Standard starting and intermediate titration strength (49 mg sacubitril / 51 mg valsartan) of Entresto for symptomatic chronic heart failure with reduced ejection fraction.',
    indications:
      'Treatment of symptomatic chronic heart failure with reduced ejection fraction in adults and pediatric patients aged 1 year and older.',
    adultDosage:
      'Recommended starting dose is one 49 mg/51 mg tablet twice daily, doubled after 2 to 4 weeks to the target dose of 97 mg/103 mg twice daily as tolerated by the patient. Require a 36-hour washout after stopping any ACE inhibitor.',
    contraindications:
      'Hypersensitivity to active substances; concomitant ACE inhibitor therapy or within 36 hours of stopping an ACE inhibitor; history of ACEi/ARB-associated angioedema or hereditary/idiopathic angioedema; severe hepatic impairment, biliary cirrhosis, or cholestasis; second and third trimesters of pregnancy; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    sideEffects:
      'Hypotension, hyperkalemia, renal impairment, dizziness, cough, orthostatic hypotension, fatigue, and angioedema.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Entresto (sacubitril / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/entresto',
  },
  {
    brandName: 'Entresto 97 mg/103 mg',
    brandNameAr: 'إنتريستو 97 ملغم / 103 ملغم',
    genericName: 'Sacubitril + Valsartan',
    drugClassNameEn: 'Angiotensin Receptor-Neprilysin Inhibitors (ARNIs)',
    drugClassNameAr: 'مثبطات مستقبلات الأنجيوتنسين والنيبريليسين',
    dosageForm: 'Film-coated tablet',
    strength: '97 mg / 103 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    summary:
      'Target maintenance strength (97 mg sacubitril / 103 mg valsartan) of Entresto for chronic heart failure with reduced ejection fraction.',
    indications:
      'Target maintenance therapy for symptomatic chronic heart failure with reduced ejection fraction in adults.',
    adultDosage:
      'Target maintenance dose of one 97 mg/103 mg tablet twice daily with or without food, reached after gradual up-titration every 2 to 4 weeks as tolerated.',
    contraindications:
      'Hypersensitivity to sacubitril or valsartan; concomitant use with ACE inhibitors (within 36 hours); history of angioedema with ACEi/ARB or hereditary/idiopathic angioedema; severe hepatic impairment; second and third trimesters of pregnancy.',
    sideEffects:
      'Hypotension, hyperkalemia, renal impairment, dizziness, cough, fatigue, and angioedema.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Entresto (sacubitril / valsartan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/entresto',
  },
  {
    brandName: 'Leqvio 284 mg',
    brandNameAr: 'ليكفيو 284 ملغم',
    genericName: 'Inclisiran',
    drugClassNameEn: 'PCSK9-Targeting Small Interfering RNA (siRNA)',
    drugClassNameAr: 'مثبطات PCSK9 عبر الحمض النووي الريبوزي المتداخل الصغير',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '284 mg / 1.5 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (1.5 mL)',
    summary:
      'Cholesterol-lowering double-stranded small interfering ribonucleic acid (siRNA) conjugated with GalNAc that inhibits hepatic PCSK9 synthesis, administered twice yearly during maintenance.',
    indications:
      'Indicated in adults with primary hypercholesterolemia (heterozygous familial and non-familial) or mixed dyslipidemia, as an adjunct to diet: in combination with a statin or statin with other lipid-lowering therapies in patients unable to reach LDL-C goals with the maximum tolerated dose of a statin, or alone or in combination with other lipid-lowering therapies in patients who are statin-intolerant, or for whom a statin is contraindicated.',
    adultDosage:
      '284 mg administered as a single subcutaneous injection initially, again at 3 months, and then every 6 months thereafter by a healthcare professional.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Adverse reactions at the injection site (injection site reaction, injection site pain, injection site erythema, and injection site rash).',
    storageConditions: 'This medicinal product does not require any special storage conditions. Do not freeze.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Leqvio (inclisiran) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/leqvio',
  },

  // =========================================================================
  // 2. DIABETES & ENDOCRINOLOGY (4 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Galvus 50 mg',
    brandNameAr: 'جالفوس 50 ملغم',
    genericName: 'Vildagliptin',
    drugClassNameEn: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitors',
    drugClassNameAr: 'مثبطات ثنائي ببتيديل ببتيداز-4',
    dosageForm: 'Tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 tablets (blister pack)',
    summary:
      'Potent and selective dipeptidyl peptidase-4 (DPP-4) islet enhancer indicated for glycemic control in adults with type 2 diabetes mellitus.',
    indications:
      'Treatment of type 2 diabetes mellitus in adults as monotherapy (when metformin is inappropriate due to contraindications or intolerance) or in combination with metformin, a sulphonylurea, a thiazolidinedione, a sulphonylurea plus metformin, or insulin (with or without metformin) when diet and exercise do not provide adequate glycemic control.',
    adultDosage:
      '50 mg twice daily (morning and evening) when used as monotherapy, in combination with metformin, with a thiazolidinedione, or with insulin. When used in dual combination with a sulphonylurea, the recommended dose of vildagliptin is 50 mg once daily administered in the morning. In moderate or severe renal impairment or ESRD, the recommended dose is 50 mg once daily.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Dizziness, headache, tremor, nausea, gastro-esophageal reflux disease, constipation, peripheral edema, asthenia, hypoglycemia (when combined with sulphonylurea or insulin), and rare hepatic transaminase elevations or pancreatitis.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Galvus (vildagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/galvus',
  },
  {
    brandName: 'Galvus Met 50 mg/500 mg',
    brandNameAr: 'جالفوس مت 50 ملغم / 500 ملغم',
    genericName: 'Vildagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    drugClassNameAr: 'مثبطات DPP-4 مع البيغوانيد',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 500 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of vildagliptin 50 mg and metformin 500 mg for type 2 diabetes mellitus.',
    indications:
      'Treatment of adult patients with type 2 diabetes mellitus who are unable to achieve sufficient glycemic control at their maximally tolerated dose of oral metformin alone or who are already treated with the combination of vildagliptin and metformin as separate tablets; also indicated in combination with a sulphonylurea or insulin as an adjunct to diet and exercise.',
    adultDosage:
      'One tablet twice daily (morning and evening) with or just after food to reduce gastrointestinal symptoms associated with metformin.',
    contraindications:
      'Hypersensitivity to vildagliptin or metformin; any type of acute metabolic acidosis (such as lactic acidosis, diabetic ketoacidosis); diabetic pre-coma; severe renal failure (GFR < 30 mL/min); acute conditions with potential to alter renal function (dehydration, severe infection, shock, intravascular iodinated contrast administration); acute or chronic disease which may cause tissue hypoxia (cardiac or respiratory failure, recent myocardial infarction, shock); hepatic impairment; acute alcohol intoxication, alcoholism.',
    sideEffects:
      'Nausea, vomiting, diarrhea, abdominal pain, loss of appetite, metallic taste, headache, tremor, dizziness, decreased vitamin B12 absorption, and very rare lactic acidosis.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Galvus Met (vildagliptin / metformin) — Novartis Official Prescribing Information',
    sourceUrl: 'https://www.novartis.com/sg-en/sites/novartis_sg/files/Galvus_Met-Jul2020.SIN-App051120.pdf',
  },
  {
    brandName: 'Galvus Met 50 mg/850 mg',
    brandNameAr: 'جالفوس مت 50 ملغم / 850 ملغم',
    genericName: 'Vildagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    drugClassNameAr: 'مثبطات DPP-4 مع البيغوانيد',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 850 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    summary:
      'Fixed-dose combination of vildagliptin 50 mg and metformin 850 mg for adults with type 2 diabetes mellitus.',
    indications:
      'Treatment of type 2 diabetes mellitus in adults inadequately controlled on metformin alone, switching from separate vildagliptin and metformin tablets, or in combination with a sulphonylurea or insulin.',
    adultDosage:
      'One 50 mg/850 mg tablet twice daily (morning and evening) with meals.',
    contraindications:
      'Hypersensitivity to active substances; acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis); GFR < 30 mL/min; acute conditions altering renal function; tissue hypoxia states; hepatic impairment; acute alcohol intoxication or alcoholism.',
    sideEffects:
      'Gastrointestinal disturbances (diarrhea, nausea, vomiting, abdominal pain, decreased appetite), dizziness, headache, tremor, and vitamin B12 decrease.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Galvus Met (vildagliptin / metformin) — Novartis Official Prescribing Information',
    sourceUrl: 'https://www.novartis.com/sg-en/sites/novartis_sg/files/Galvus_Met-Jul2020.SIN-App051120.pdf',
  },
  {
    brandName: 'Galvus Met 50 mg/1000 mg',
    brandNameAr: 'جالفوس مت 50 ملغم / 1000 ملغم',
    genericName: 'Vildagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    drugClassNameAr: 'مثبطات DPP-4 مع البيغوانيد',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 1000 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    summary:
      'High-strength fixed-dose combination of vildagliptin 50 mg and metformin 1000 mg for type 2 diabetes mellitus.',
    indications:
      'Treatment of type 2 diabetes mellitus in adults inadequately controlled on maximally tolerated metformin alone, or as substitution for separate vildagliptin 50 mg and metformin 1000 mg tablets twice daily.',
    adultDosage:
      'One 50 mg/1000 mg tablet twice daily (morning and evening) with meals. Do not exceed the maximum daily dose of 100 mg vildagliptin and 2000 mg metformin.',
    contraindications:
      'Hypersensitivity to vildagliptin or metformin; acute metabolic acidosis (lactic acidosis, DKA); GFR < 30 mL/min; hepatic impairment; acute conditions causing renal dysfunction or tissue hypoxia; alcoholism.',
    sideEffects:
      'Diarrhea, nausea, vomiting, abdominal pain, metallic taste, headache, dizziness, tremor, asthenia, and decreased vitamin B12 levels.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Galvus Met (vildagliptin / metformin) — Novartis Official Prescribing Information',
    sourceUrl: 'https://www.novartis.com/sg-en/sites/novartis_sg/files/Galvus_Met-Jul2020.SIN-App051120.pdf',
  },

  // =========================================================================
  // 3. RHEUMATOLOGY, PAIN & ANTI-INFLAMMATORY — SYSTEMIC RX (5 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Voltaren 50 mg',
    brandNameAr: 'فولتارين 50 ملغم',
    genericName: 'Diclofenac',
    drugClassNameEn: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    drugClassNameAr: 'مضادات الالتهاب غير الستيرويدية',
    dosageForm: 'Gastro-resistant tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '20 gastro-resistant tablets (blister pack)',
    summary:
      'Enteric-coated systemic non-steroidal anti-inflammatory drug (diclofenac 50 mg) for inflammatory and degenerative rheumatic diseases and acute musculoskeletal or postoperative pain.',
    indications:
      'Relief of signs and symptoms of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis; acute gout; acute musculoskeletal disorders; painful post-traumatic and post-operative inflammation and swelling; primary dysmenorrhea.',
    adultDosage:
      'Usually 100 to 150 mg daily divided into 2 or 3 doses (one 50 mg gastro-resistant tablet 2 to 3 times daily), swallowed whole with liquid, preferably before meals. In milder cases or long-term therapy, 75 to 100 mg daily is usually sufficient.',
    contraindications:
      'Active gastric or intestinal ulcer, bleeding, or perforation; history of GI bleeding or perforation related to previous NSAID therapy; last trimester of pregnancy; hepatic failure; renal failure (GFR < 15 mL/min/1.73 m²); established congestive heart failure (NYHA II-IV), ischemic heart disease, peripheral arterial disease, or cerebrovascular disease; hypersensitivity to diclofenac, aspirin, or other NSAIDs.',
    sideEffects:
      'Headache, dizziness, vertigo, nausea, vomiting, diarrhea, dyspepsia, abdominal pain, flatulence, decreased appetite, elevated transaminases, rash, fluid retention, edema, and hypertension.',
    storageConditions: 'Store below 30°C. Protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Voltaren (diclofenac) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/019201s039s040lbl.pdf',
  },
  {
    brandName: 'Voltaren SR 75 mg',
    brandNameAr: 'فولتارين إس آر 75 ملغم',
    genericName: 'Diclofenac',
    drugClassNameEn: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    drugClassNameAr: 'مضادات الالتهاب غير الستيرويدية',
    dosageForm: 'Prolonged-release tablet',
    strength: '75 mg',
    route: 'Oral',
    packSize: '20 prolonged-release tablets (blister pack)',
    summary:
      'Sustained-release diclofenac 75 mg tablet designed for once- or twice-daily dosing in chronic inflammatory and degenerative rheumatic disorders.',
    indications:
      'Inflammatory and degenerative forms of rheumatism: rheumatoid arthritis, ankylosing spondylitis, osteoarthritis, and spondylarthritis; painful syndromes of the vertebral column; non-articular rheumatism; post-traumatic and post-operative pain, inflammation, and swelling.',
    adultDosage:
      'One 75 mg prolonged-release tablet once daily or twice daily (maximum 150 mg daily), swallowed whole with liquid, preferably with meals.',
    contraindications:
      'Active peptic ulcer, GI bleeding, or perforation; last trimester of pregnancy; severe hepatic or renal failure; established congestive heart failure (NYHA II-IV), ischemic heart disease, peripheral arterial disease, or cerebrovascular disease; NSAID-induced asthma, angioedema, or urticaria.',
    sideEffects:
      'Epigastric pain, nausea, diarrhea, dyspepsia, abdominal cramps, headache, dizziness, vertigo, elevated serum transaminases, skin rash, and peripheral edema.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Voltaren SR (diclofenac prolonged-release tablets) — Novartis Official Package Insert',
    sourceUrl: 'https://www.novartis.com/sg-en/sites/novartis_sg/files/VoltarenSRTablet-Aug2021.SIN-App170222.pdf',
  },
  {
    brandName: 'Voltaren SR 100 mg',
    brandNameAr: 'فولتارين إس آر 100 ملغم',
    genericName: 'Diclofenac',
    drugClassNameEn: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    drugClassNameAr: 'مضادات الالتهاب غير الستيرويدية',
    dosageForm: 'Prolonged-release tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '20 prolonged-release tablets (blister pack)',
    summary:
      'Once-daily prolonged-release diclofenac 100 mg tablet for maintenance control of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis.',
    indications:
      'Chronic inflammatory and degenerative rheumatic diseases (rheumatoid arthritis, osteoarthritis, ankylosing spondylitis), painful vertebral syndromes, and non-articular rheumatism.',
    adultDosage:
      'One 100 mg prolonged-release tablet once daily, swallowed whole with liquid, preferably with food. Where symptoms are most pronounced at night or in the morning, Voltaren SR 100 mg should preferably be taken in the evening.',
    contraindications:
      'Active GI ulcer, bleeding, or perforation; third trimester of pregnancy; severe hepatic or renal insufficiency; established congestive heart failure (NYHA II-IV), ischemic heart disease, peripheral arterial disease, or cerebrovascular disease; hypersensitivity to diclofenac or other NSAIDs.',
    sideEffects:
      'Dyspepsia, abdominal pain, nausea, diarrhea, headache, dizziness, vertigo, elevated liver enzymes, rash, and fluid retention.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Voltaren SR (diclofenac prolonged-release tablets) — Novartis Official Package Insert',
    sourceUrl: 'https://www.novartis.com/sg-en/sites/novartis_sg/files/VoltarenSRTablet-Aug2021.SIN-App170222.pdf',
  },
  {
    brandName: 'Voltaren 75 mg/3 mL',
    brandNameAr: 'فولتارين 75 ملغم / 3 مل',
    genericName: 'Diclofenac',
    drugClassNameEn: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    drugClassNameAr: 'مضادات الالتهاب غير الستيرويدية',
    dosageForm: 'Solution for injection',
    strength: '75 mg / 3 mL',
    route: 'Intramuscular',
    packSize: '5 ampoules × 3 mL',
    summary:
      'Parenteral diclofenac 75 mg/3 mL ampoule for acute severe inflammatory pain, renal colic, biliary colic, and acute exacerbations of rheumatic disorders.',
    indications:
      'Intramuscular injection in acute exacerbations of rheumatic and non-rheumatic inflammatory pain, acute gout attacks, renal colic and biliary colic, post-traumatic and post-operative pain, inflammation, and swelling, and severe migraine attacks.',
    adultDosage:
      'Generally one 75 mg ampoule daily given by deep intragluteal injection into the upper outer quadrant. In severe cases (e.g. colic), two 75 mg injections separated by a few hours may be given (one into each buttock), up to a maximum of 150 mg/day. Should not be given for more than 2 days.',
    contraindications:
      'Active GI ulcer, bleeding, or perforation; third trimester of pregnancy; severe hepatic or renal failure; established congestive heart failure (NYHA II-IV), ischemic heart disease, peripheral arterial disease, or cerebrovascular disease; bleeding disorders or anticoagulant therapy (for IM route).',
    sideEffects:
      'Injection site pain, injection site induration, nausea, vomiting, dizziness, headache, dyspepsia, elevated transaminases, and rare injection site necrosis (Nicolau syndrome).',
    storageConditions: 'Store below 30°C. Keep ampoules in the outer carton in order to protect from light.',
    specialties: ['Orthopedics', 'Emergency Medicine', 'Rheumatology', 'Urology', 'General Surgery'],
    sourceTitle: 'Diclofenac-Containing Systemic Medicines — EMA Official Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diclofenac-containing-medicines',
  },
  {
    brandName: 'Cataflam 50 mg',
    brandNameAr: 'كتافلام 50 ملغم',
    genericName: 'Diclofenac',
    drugClassNameEn: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    drugClassNameAr: 'مضادات الالتهاب غير الستيرويدية',
    dosageForm: 'Coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '20 coated tablets (blister pack)',
    summary:
      'Rapid-onset immediate-release diclofenac 50 mg coated tablet indicated for short-term management of acute pain, primary dysmenorrhea, and migraine attacks.',
    indications:
      'Short-term treatment of acute painful conditions including post-traumatic pain, inflammation, and swelling (e.g. sprains), post-operative pain and inflammation (e.g. following dental or orthopedic surgery), primary dysmenorrhea, migraine attacks, and painful syndromes of the vertebral column.',
    adultDosage:
      'Generally 100 to 150 mg daily divided into 2 to 3 doses (one 50 mg tablet 2 to 3 times daily), swallowed whole with liquid, preferably before meals.',
    contraindications:
      'Active gastric or intestinal ulcer, bleeding, or perforation; third trimester of pregnancy; severe hepatic or renal failure; established congestive heart failure (NYHA II-IV), ischemic heart disease, peripheral arterial disease, or cerebrovascular disease; hypersensitivity to diclofenac, aspirin, or other NSAIDs.',
    sideEffects:
      'Epigastric pain, nausea, vomiting, diarrhea, dyspepsia, headache, dizziness, vertigo, elevated transaminases, and rash.',
    storageConditions: 'Store below 30°C. Protect from moisture.',
    specialties: ['Orthopedics', 'Rheumatology', 'Obstetrics and Gynecology', 'General Surgery'],
    sourceTitle: 'Cataflam (diclofenac) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/019201s039s040lbl.pdf',
  },

  // =========================================================================
  // 4. NEUROLOGY, EPILEPSY, MIGRAINE, ALZHEIMER'S & MULTIPLE SCLEROSIS (17 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Tegretol 200 mg',
    brandNameAr: 'تيغريتول 200 ملغم',
    genericName: 'Carbamazepine',
    drugClassNameEn: 'Anticonvulsants & Mood Stabilizers (Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج ومثبتات المزاج',
    dosageForm: 'Tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '50 tablets (blister pack)',
    summary:
      'Dibenzazepine antiepileptic, neurotropic, and psychotropic agent indicated for partial and generalized tonic-clonic seizures, trigeminal neuralgia, and bipolar disorder.',
    indications:
      'Epilepsy: generalised tonic-clonic and partial seizures; paroxysmal pain of trigeminal neuralgia; prophylaxis of manic-depressive psychosis in patients unresponsive to lithium therapy.',
    adultDosage:
      'Epilepsy: initiate at 100 to 200 mg once or twice daily, slowly increased to usual maintenance of 800 to 1200 mg daily in divided doses (up to 1600 to 2000 mg daily in select patients). Trigeminal neuralgia: initiate at 200 to 400 mg daily, increased until pain relief (usually 200 mg 3 to 4 times daily). Bipolar prophylaxis: 400 to 600 mg daily in 2 to 3 divided doses.',
    contraindications:
      'Known hypersensitivity to carbamazepine or structurally related drugs (e.g. tricyclic antidepressants); patients with atrioventricular block; history of bone marrow depression or hepatic porphyrias; concomitant use with monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuing MAOIs.',
    sideEffects:
      'Dizziness, ataxia, drowsiness, fatigue, headache, diplopia, accommodation disorders, nausea, vomiting, leukopenia, thrombocytopenia, elevated gamma-GT and alkaline phosphatase, hyponatremia, allergic skin reactions, and rare Stevens-Johnson syndrome/toxic epidermal necrolysis (screen HLA-B*1502 in at-risk ancestry).',
    storageConditions: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Tegretol 200 mg Tablets (carbamazepine) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1040/smpc',
  },
  {
    brandName: 'Tegretol Prolonged Release 200 mg',
    brandNameAr: 'تيغريتول ممتد المفعول 200 ملغم',
    genericName: 'Carbamazepine',
    drugClassNameEn: 'Anticonvulsants & Mood Stabilizers (Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج ومثبتات المزاج',
    dosageForm: 'Prolonged-release tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '50 prolonged-release tablets (blister pack)',
    summary:
      'Divisible prolonged-release carbamazepine 200 mg tablet providing stable plasma concentrations and reduced peak-related neurotoxicity.',
    indications:
      'Epilepsy (generalised tonic-clonic and partial seizures), trigeminal neuralgia, and prophylaxis of manic-depressive psychosis.',
    adultDosage:
      'Administered in 2 divided daily doses, swallowed whole or halved along the score line with liquid without chewing; usual maintenance in epilepsy is 400 mg twice daily (800 to 1200 mg/day).',
    contraindications:
      'Hypersensitivity to carbamazepine or tricyclic compounds; atrioventricular block; history of bone marrow depression or hepatic porphyrias; use within 14 days of MAOIs.',
    sideEffects:
      'Dizziness, ataxia, somnolence, diplopia, nausea, leukopenia, hyponatremia, elevated liver enzymes, and cutaneous hypersensitivity reactions.',
    storageConditions: 'Do not store above 25°C. Protect from moisture.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Tegretol Prolonged Release 200 mg and 400 mg Tablets — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1043/smpc',
  },
  {
    brandName: 'Tegretol Prolonged Release 400 mg',
    brandNameAr: 'تيغريتول ممتد المفعول 400 ملغم',
    genericName: 'Carbamazepine',
    drugClassNameEn: 'Anticonvulsants & Mood Stabilizers (Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج ومثبتات المزاج',
    dosageForm: 'Prolonged-release tablet',
    strength: '400 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets (blister pack)',
    summary:
      'High-strength divisible prolonged-release carbamazepine 400 mg tablet for twice-daily maintenance control of epilepsy and bipolar disorder.',
    indications:
      'Epilepsy (generalised tonic-clonic and partial seizures), trigeminal neuralgia, and prophylaxis of manic-depressive psychosis.',
    adultDosage:
      'Usual maintenance dose in epilepsy is one 400 mg prolonged-release tablet twice daily (800 to 1200 mg daily in 2 divided doses), swallowed whole or halved along the score line without chewing.',
    contraindications:
      'Hypersensitivity to carbamazepine or tricyclic antidepressants; atrioventricular block; history of bone marrow depression or hepatic porphyrias; concomitant MAOIs.',
    sideEffects:
      'Dizziness, ataxia, drowsiness, diplopia, blurred vision, nausea, leukopenia, hyponatremia, and skin reactions.',
    storageConditions: 'Do not store above 25°C. Protect from moisture.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Tegretol Prolonged Release 200 mg and 400 mg Tablets — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1043/smpc',
  },
  {
    brandName: 'Tegretol 100 mg/5 mL',
    brandNameAr: 'تيغريتول 100 ملغم / 5 مل',
    genericName: 'Carbamazepine',
    drugClassNameEn: 'Anticonvulsants & Mood Stabilizers (Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج ومثبتات المزاج',
    dosageForm: 'Oral suspension',
    strength: '100 mg / 5 mL',
    route: 'Oral',
    packSize: '1 bottle × 250 mL',
    summary:
      'Carbamazepine 100 mg/5 mL (2% w/v) oral suspension for pediatric epilepsy and adult patients unable to swallow tablets.',
    indications:
      'Epilepsy (generalised tonic-clonic and partial seizures), trigeminal neuralgia, and prophylaxis of manic-depressive psychosis.',
    adultDosage:
      'Because a given dose of Tegretol Liquid produces higher peak plasma levels than the same dose in tablets, start with low doses and increase slowly in smaller, more frequent divided doses (e.g. 3 to 4 times daily). Shake well before use.',
    contraindications:
      'Hypersensitivity to carbamazepine or tricyclic compounds; atrioventricular block; history of bone marrow depression or hepatic porphyrias; concomitant MAOIs.',
    sideEffects:
      'Somnolence, dizziness, ataxia, diplopia, nausea, vomiting, leukopenia, hyponatremia, and rash.',
    storageConditions: 'Do not store above 30°C. Protect from light.',
    specialties: ['Pediatrics', 'Neurology', 'Psychiatry'],
    sourceTitle: 'Tegretol Liquid 100 mg/5 mL (carbamazepine) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1034/smpc',
  },
  {
    brandName: 'Trileptal 300 mg',
    brandNameAr: 'تريليبتال 300 ملغم',
    genericName: 'Oxcarbazepine',
    drugClassNameEn: 'Anticonvulsants (Keto-Analogue Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج',
    dosageForm: 'Film-coated tablet',
    strength: '300 mg',
    route: 'Oral',
    packSize: '50 film-coated tablets (blister pack)',
    summary:
      'Antiepileptic drug (oxcarbazepine 300 mg) indicated as monotherapy or adjunctive therapy for partial seizures with or without secondarily generalized tonic-clonic seizures.',
    indications:
      'Treatment of partial seizures with or without secondarily generalised tonic-clonic seizures, as monotherapy or adjunctive therapy in adults and children aged 6 years and above.',
    adultDosage:
      'Initiate at 600 mg/day (8 to 10 mg/kg/day) given in two divided doses (300 mg twice daily). Therapeutic effects are seen between 600 mg/day and 2400 mg/day; may be increased by a maximum of 600 mg/day at approximately weekly intervals.',
    contraindications:
      'Hypersensitivity to oxcarbazepine, eslicarbazepine, or to any of the excipients.',
    sideEffects:
      'Hyponatremia, somnolence, headache, dizziness, diplopia, blurred vision, visual disturbances, nausea, vomiting, fatigue, asthenia, ataxia, tremor, and nystagmus.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Pediatrics'],
    sourceTitle: 'Trileptal 300 mg and 600 mg Film-Coated Tablets (oxcarbazepine) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3815/smpc',
  },
  {
    brandName: 'Trileptal 600 mg',
    brandNameAr: 'تريليبتال 600 ملغم',
    genericName: 'Oxcarbazepine',
    drugClassNameEn: 'Anticonvulsants (Keto-Analogue Dibenzazepine Derivatives)',
    drugClassNameAr: 'مضادات الاختلاج',
    dosageForm: 'Film-coated tablet',
    strength: '600 mg',
    route: 'Oral',
    packSize: '50 film-coated tablets (blister pack)',
    summary:
      'High-strength oxcarbazepine 600 mg film-coated tablet for maintenance treatment of partial-onset seizures.',
    indications:
      'Monotherapy or adjunctive therapy of partial seizures with or without secondarily generalised tonic-clonic seizures in adults and children aged 6 years and above.',
    adultDosage:
      'Maintenance dose typically 600 mg to 2400 mg/day administered in two divided doses with or without food.',
    contraindications:
      'Hypersensitivity to oxcarbazepine, eslicarbazepine, or any excipient.',
    sideEffects:
      'Hyponatremia, dizziness, somnolence, diplopia, headache, nausea, vomiting, ataxia, and fatigue.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Pediatrics'],
    sourceTitle: 'Trileptal 300 mg and 600 mg Film-Coated Tablets (oxcarbazepine) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3815/smpc',
  },
  {
    brandName: 'Exelon 1.5 mg',
    brandNameAr: 'إكسيلون 1.5 ملغم',
    genericName: 'Rivastigmine',
    drugClassNameEn: 'Acetylcholinesterase & Butyrylcholinesterase Inhibitors',
    drugClassNameAr: 'مثبطات إستيراز الأسيتيل كولين والبيوتيريل كولين',
    dosageForm: 'Hard capsule',
    strength: '1.5 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack)',
    summary:
      'Carbamate-type brain-selective acetylcholinesterase and butyrylcholinesterase inhibitor indicated for Alzheimer’s disease dementia and Parkinson’s disease dementia.',
    indications:
      'Symptomatic treatment of mild to moderately severe Alzheimer’s dementia; symptomatic treatment of mild to moderately severe dementia in patients with idiopathic Parkinson’s disease.',
    adultDosage:
      'Initial dose: 1.5 mg twice daily with morning and evening meals. If well tolerated after at least two weeks, increase to 3 mg twice daily; subsequent increases to 4.5 mg and 6 mg twice daily may be made after a minimum of 2 weeks at each dose. Effective maintenance dose is 3 to 6 mg twice daily.',
    contraindications:
      'Hypersensitivity to rivastigmine, other carbamate derivatives, or any excipient; previous history of application site reactions suggestive of allergic contact dermatitis with rivastigmine patch.',
    sideEffects:
      'Anorexia, decreased appetite, dizziness, somnolence, tremor, headache, agitation, confusion, anxiety, nausea, vomiting, diarrhea, abdominal pain, dyspepsia, weight decreased, and bradycardia.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Exelon (rivastigmine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exelon',
  },
  {
    brandName: 'Exelon 3 mg',
    brandNameAr: 'إكسيلون 3 ملغم',
    genericName: 'Rivastigmine',
    drugClassNameEn: 'Acetylcholinesterase & Butyrylcholinesterase Inhibitors',
    drugClassNameAr: 'مثبطات إستيراز الأسيتيل كولين والبيوتيريل كولين',
    dosageForm: 'Hard capsule',
    strength: '3 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack)',
    summary:
      'Maintenance strength rivastigmine 3 mg hard capsule for mild to moderately severe Alzheimer’s dementia and Parkinson’s disease dementia.',
    indications:
      'Symptomatic treatment of mild to moderately severe Alzheimer’s dementia and mild to moderately severe dementia in idiopathic Parkinson’s disease.',
    adultDosage:
      '3 mg twice daily with morning and evening meals after at least 2 weeks on 1.5 mg twice daily; may be titrated up to 6 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to rivastigmine or carbamate derivatives; history of allergic contact dermatitis with rivastigmine patch.',
    sideEffects:
      'Nausea, vomiting, diarrhea, anorexia, dizziness, headache, tremor, agitation, and weight loss.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Exelon (rivastigmine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exelon',
  },
  {
    brandName: 'Exelon Patch 4.6 mg/24 h',
    brandNameAr: 'إكسيلون لصقات 4.6 ملغم / 24 ساعة',
    genericName: 'Rivastigmine',
    drugClassNameEn: 'Acetylcholinesterase & Butyrylcholinesterase Inhibitors',
    drugClassNameAr: 'مثبطات إستيراز الأسيتيل كولين والبيوتيريل كولين',
    dosageForm: 'Transdermal patch',
    strength: '4.6 mg / 24 h',
    route: 'Transdermal',
    packSize: '30 transdermal patches (sachets)',
    summary:
      'Once-daily rivastigmine 4.6 mg/24 h (5 cm²) transdermal initiation patch for mild to moderately severe Alzheimer’s dementia.',
    indications:
      'Symptomatic treatment of mild to moderately severe Alzheimer’s dementia.',
    adultDosage:
      'Initiate with one 4.6 mg/24 h transdermal patch applied once daily to clean, dry, hairless, intact healthy skin on the upper or lower back, upper arm, or chest. After a minimum of four weeks and if well tolerated, increase to the recommended effective maintenance dose of 9.5 mg/24 h.',
    contraindications:
      'Hypersensitivity to rivastigmine, other carbamate derivatives, or any excipient; previous history of application site reactions suggestive of allergic contact dermatitis with rivastigmine patch.',
    sideEffects:
      'Application site reactions (erythema, pruritus, edema, dermatitis), anorexia, nausea, vomiting, diarrhea, urinary tract infection, anxiety, depression, headache, and syncope.',
    storageConditions: 'Do not store above 25°C. Keep the transdermal patch in the sachet until use.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Exelon (rivastigmine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exelon',
  },
  {
    brandName: 'Exelon Patch 9.5 mg/24 h',
    brandNameAr: 'إكسيلون لصقات 9.5 ملغم / 24 ساعة',
    genericName: 'Rivastigmine',
    drugClassNameEn: 'Acetylcholinesterase & Butyrylcholinesterase Inhibitors',
    drugClassNameAr: 'مثبطات إستيراز الأسيتيل كولين والبيوتيريل كولين',
    dosageForm: 'Transdermal patch',
    strength: '9.5 mg / 24 h',
    route: 'Transdermal',
    packSize: '30 transdermal patches (sachets)',
    summary:
      'Standard once-daily maintenance transdermal patch of rivastigmine 9.5 mg/24 h (10 cm²) for mild to moderately severe Alzheimer’s dementia.',
    indications:
      'Symptomatic treatment of mild to moderately severe Alzheimer’s dementia.',
    adultDosage:
      'Apply one 9.5 mg/24 h patch every 24 hours after at least 4 weeks of treatment with 4.6 mg/24 h. Replace with a new patch every 24 hours and rotate application sites (avoid same spot for 14 days).',
    contraindications:
      'Hypersensitivity to rivastigmine or carbamate derivatives; history of allergic contact dermatitis with rivastigmine patch.',
    sideEffects:
      'Application site erythema and pruritus, anorexia, nausea, vomiting, diarrhea, dizziness, headache, agitation, and bradycardia.',
    storageConditions: 'Do not store above 25°C. Keep the patch in the sachet until use.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Exelon (rivastigmine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exelon',
  },
  {
    brandName: 'Gilenya 0.5 mg',
    brandNameAr: 'جيلينيا 0.5 ملغم',
    genericName: 'Fingolimod',
    drugClassNameEn: 'Sphingosine 1-Phosphate (S1P) Receptor Modulators',
    drugClassNameAr: 'معدلات مستقبلات سفينغوزين 1-فوسفات',
    dosageForm: 'Hard capsule',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack)',
    summary:
      'Oral sphingosine 1-phosphate receptor modulator indicated as single disease-modifying therapy in highly active relapsing-remitting multiple sclerosis.',
    indications:
      'Single disease-modifying therapy in highly active relapsing-remitting multiple sclerosis for adult patients and pediatric patients aged 10 years and older with highly active disease despite a full and adequate course of at least one disease-modifying therapy, or rapidly evolving severe relapsing-remitting multiple sclerosis.',
    adultDosage:
      'One 0.5 mg capsule taken orally once daily with or without food. First-dose cardiovascular monitoring (ECG and blood pressure for at least 6 hours) is required at treatment initiation.',
    contraindications:
      'Immunodeficiency syndrome; patients with increased risk for opportunistic infections; severe active infections or active chronic infections (hepatitis, tuberculosis); active malignancies; severe hepatic impairment (Child-Pugh class C); myocardial infarction, unstable angina, stroke/TIA, decompensated heart failure, or NYHA class III/IV heart failure in the previous 6 months; Mobitz type II second-degree or third-degree AV block or sick-sinus syndrome (without a pacemaker); baseline QTc interval ≥ 500 msec; during pregnancy and in women of childbearing potential not using effective contraception.',
    sideEffects:
      'Influenza, sinusitis, bronchitis, herpes viral infections, headache, cough, diarrhea, back pain, elevated hepatic enzymes (ALT, GGT, AST), lymphopenia, bradycardia/AV block at initiation, hypertension, and macular edema.',
    storageConditions: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Neurology'],
    sourceTitle: 'Gilenya (fingolimod) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gilenya',
  },
  {
    brandName: 'Kesimpta 20 mg',
    brandNameAr: 'كيسيمبتا 20 ملغم',
    genericName: 'Ofatumumab',
    drugClassNameEn: 'Anti-CD20 Monoclonal Antibodies (Selective Immunosuppressants)',
    drugClassNameAr: 'الأجسام المضادة وحيدة النسيلة المضادة لـ CD20',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '20 mg / 0.4 mL',
    route: 'Subcutaneous',
    packSize: '1 Sensoready pre-filled pen (0.4 mL)',
    summary:
      'Fully human anti-CD20 monoclonal antibody (ofatumumab 20 mg/0.4 mL Sensoready pen) for monthly subcutaneous self-administration in relapsing forms of multiple sclerosis.',
    indications:
      'Treatment of adult patients with relapsing forms of multiple sclerosis (RMS) with active disease defined by clinical or imaging features.',
    adultDosage:
      '20 mg administered by subcutaneous injection with initial dosing at weeks 0, 1, and 2, followed by subsequent monthly dosing starting at week 4.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; patients in a severely immunocompromised state; severe active infection until resolution; known active malignancy.',
    sideEffects:
      'Upper respiratory tract infections, urinary tract infections, oral herpes, injection-related systemic reactions (fever, headache, myalgia, chills, fatigue), injection-site reactions (erythema, pain, itching, swelling), and decreased blood immunoglobulin M.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton in order to protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'Kesimpta (ofatumumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kesimpta',
  },
  {
    brandName: 'Mayzent 2 mg',
    brandNameAr: 'مايزنت 2 ملغم',
    genericName: 'Siponimod',
    drugClassNameEn: 'Selective Sphingosine 1-Phosphate (S1P1/S1P5) Receptor Modulators',
    drugClassNameAr: 'معدلات مستقبلات سفينغوزين 1-فوسفات الانتقائية',
    dosageForm: 'Film-coated tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Selective sphingosine 1-phosphate receptor 1 and 5 modulator indicated for adults with secondary progressive multiple sclerosis (SPMS) with active disease.',
    indications:
      'Treatment of adult patients with secondary progressive multiple sclerosis (SPMS) with active disease evidenced by relapses or imaging features of inflammatory activity.',
    adultDosage:
      'Requires CYP2C9 genotyping prior to initiation. In patients with CYP2C9 *1/*1, *1/*2, or *2/*2 genotypes, titrate over 5 days using the starter pack (0.25 mg days 1-2, 0.5 mg day 3, 0.75 mg day 4, 1.25 mg day 5) to the maintenance dose of 2 mg once daily starting on day 6 (1 mg once daily for *1/*3 or *2/*3 genotypes).',
    contraindications:
      'Hypersensitivity to siponimod, peanut, soya, or any excipient; patients homozygous for CYP2C9*3 (*3/*3 genotype); immunodeficiency syndrome; history of progressive multifocal leukoencephalopathy or cryptococcal meningitis; active malignancies; severe hepatic impairment (Child-Pugh class C); recent (past 6 months) MI, unstable angina, stroke/TIA, or decompensated heart failure; Mobitz type II 2nd-degree or 3rd-degree AV block or sick-sinus syndrome without a pacemaker; during pregnancy and in women of childbearing potential not using effective contraception.',
    sideEffects:
      'Headache, hypertension, bradycardia, lymphopenia, increased hepatic transaminases, herpes zoster, melanocytic nevus, dizziness, tremor, diarrhea, nausea, macular edema, and peripheral edema.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). After opening the blister pack container, may be stored up to 25°C for 3 months.',
    specialties: ['Neurology'],
    sourceTitle: 'Mayzent (siponimod) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mayzent',
  },
  {
    brandName: 'Aimovig 70 mg',
    brandNameAr: 'أيموفيج 70 ملغم',
    genericName: 'Erenumab',
    drugClassNameEn: 'Calcitonin Gene-Related Peptide (CGRP) Receptor Antagonists',
    drugClassNameAr: 'مضادات مستقبلات الببتيد المرتبط بجين الكالسيتونين',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '70 mg / mL',
    route: 'Subcutaneous',
    packSize: '1 SureClick pre-filled pen (1 mL)',
    summary:
      'Human IgG2 monoclonal antibody that potently and competitively binds to the calcitonin gene-related peptide (CGRP) receptor for prophylaxis of migraine in adults.',
    indications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month.',
    adultDosage:
      '70 mg administered subcutaneously every 4 weeks. Some patients may benefit from a dose of 140 mg every 4 weeks.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Injection site reactions (pain, erythema, pruritus), constipation, muscle spasms, pruritus, and development or worsening of hypertension.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light; once removed from the refrigerator, must be used within 7 days when stored up to 25°C.',
    specialties: ['Neurology'],
    sourceTitle: 'Aimovig (erenumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aimovig',
  },
  {
    brandName: 'Aimovig 140 mg',
    brandNameAr: 'أيموفيج 140 ملغم',
    genericName: 'Erenumab',
    drugClassNameEn: 'Calcitonin Gene-Related Peptide (CGRP) Receptor Antagonists',
    drugClassNameAr: 'مضادات مستقبلات الببتيد المرتبط بجين الكالسيتونين',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '140 mg / mL',
    route: 'Subcutaneous',
    packSize: '1 SureClick pre-filled pen (1 mL)',
    summary:
      'High-strength erenumab 140 mg/mL single-injection pre-filled pen for prophylaxis of episodic and chronic migraine in adults.',
    indications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month.',
    adultDosage:
      '140 mg administered subcutaneously once every 4 weeks into the abdomen, thigh, or outer area of the upper arm.',
    contraindications:
      'Hypersensitivity to erenumab or any excipient.',
    sideEffects:
      'Constipation, injection site reactions (erythema, swelling, pain), muscle spasms, pruritus, and hypertension.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'Aimovig (erenumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aimovig',
  },

  // =========================================================================
  // 5. IMMUNOLOGY, DERMATOLOGY, RESPIRATORY & TRANSPLANTATION (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Cosentyx 150 mg',
    brandNameAr: 'كوسنتيكس 150 ملغم',
    genericName: 'Secukinumab',
    drugClassNameEn: 'Interleukin-17A (IL-17A) Inhibitors',
    drugClassNameAr: 'مثبطات الإنترلوكين 17-أ',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '150 mg / mL',
    route: 'Subcutaneous',
    packSize: '2 Sensoready pre-filled pens × 1 mL',
    summary:
      'Fully human IgG1/κ monoclonal antibody that selectively binds and neutralizes the proinflammatory cytokine interleukin-17A (IL-17A).',
    indications:
      'Moderate to severe plaque psoriasis in adults, children, and adolescents from 6 years; active psoriatic arthritis; active ankylosing spondylitis; active non-radiographic axial spondyloarthritis; moderate to severe active hidradenitis suppurativa in adults; active enthesitis-related arthritis and juvenile psoriatic arthritis in patients 6 years and older.',
    adultDosage:
      'Plaque psoriasis: 300 mg by subcutaneous injection at weeks 0, 1, 2, 3, and 4, followed by monthly maintenance dosing. Psoriatic arthritis / axial spondyloarthritis: 150 mg (or 300 mg in concomitant moderate-to-severe psoriasis or anti-TNF inadequate responders) at weeks 0, 1, 2, 3, and 4, followed by monthly maintenance dosing.',
    contraindications:
      'Severe hypersensitivity reactions to the active substance or to any excipient; clinically important, active infection (e.g. active tuberculosis).',
    sideEffects:
      'Upper respiratory tract infections (most frequently nasopharyngitis, rhinitis), oral herpes, tinea pedis, mucocutaneous candidiasis, headache, rhinorrhea, diarrhea, nausea, urticaria, and rare exacerbation or new onset of inflammatory bowel disease.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'Cosentyx (secukinumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cosentyx',
  },
  {
    brandName: 'Cosentyx 300 mg',
    brandNameAr: 'كوسنتيكس 300 ملغم',
    genericName: 'Secukinumab',
    drugClassNameEn: 'Interleukin-17A (IL-17A) Inhibitors',
    drugClassNameAr: 'مثبطات الإنترلوكين 17-أ',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '300 mg / 2 mL',
    route: 'Subcutaneous',
    packSize: '1 UnoReady pre-filled pen (2 mL)',
    summary:
      'Single-injection 300 mg/2 mL UnoReady pre-filled pen of secukinumab for moderate-to-severe plaque psoriasis, psoriatic arthritis, ankylosing spondylitis, and hidradenitis suppurativa.',
    indications:
      'Moderate to severe plaque psoriasis, active psoriatic arthritis, active ankylosing spondylitis, and moderate to severe active hidradenitis suppurativa in adults.',
    adultDosage:
      '300 mg administered as a single 2 mL subcutaneous injection at weeks 0, 1, 2, 3, and 4, followed by monthly (or every 2 weeks in hidradenitis suppurativa if required) maintenance dosing.',
    contraindications:
      'Severe hypersensitivity to secukinumab or any excipient; clinically important active infection (such as active tuberculosis).',
    sideEffects:
      'Upper respiratory tract infections, oral herpes, mucocutaneous candidiasis, headache, diarrhea, fatigue, and injection site reactions.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'Cosentyx (secukinumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cosentyx',
  },
  {
    brandName: 'Xolair 150 mg',
    brandNameAr: 'زولير 150 ملغم',
    genericName: 'Omalizumab',
    drugClassNameEn: 'Anti-IgE Monoclonal Antibodies',
    drugClassNameAr: 'الأجسام المضادة وحيدة النسيلة المضادة لـ IgE',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '150 mg / mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (1 mL)',
    summary:
      'Recombinant humanized monoclonal antibody that selectively binds human immunoglobulin E (IgE) for severe persistent allergic asthma, chronic spontaneous urticaria, and severe chronic rhinosinusitis with nasal polyps.',
    indications:
      'Add-on therapy to improve asthma control in adults, adolescents, and children (6 years and older) with severe persistent allergic asthma; add-on therapy with intranasal corticosteroids for severe chronic rhinosinusitis with nasal polyps (CRSwNP) in adults; add-on therapy for chronic spontaneous urticaria (CSU) in adults and adolescents (12 years and above) with inadequate response to H1 antihistamine treatment.',
    adultDosage:
      'Allergic asthma and CRSwNP: 75 to 600 mg subcutaneously in 1 to 4 injections every 2 or 4 weeks, determined by baseline serum IgE (IU/mL) and body weight (kg). Chronic spontaneous urticaria: 300 mg (two 150 mg injections) by subcutaneous injection every 4 weeks.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Headache, pyrexia, upper abdominal pain, arthralgia, injection site reactions (swelling, erythema, pain, pruritus), sinusitis, upper respiratory tract infection, and rare anaphylaxis.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton in order to protect from light.',
    specialties: ['Pulmonology', 'Dermatology', 'Otolaryngology', 'Internal Medicine'],
    sourceTitle: 'Xolair (omalizumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xolair',
  },
  {
    brandName: 'Ilaris 150 mg/mL',
    brandNameAr: 'إيلاريس 150 ملغم / مل',
    genericName: 'Canakinumab',
    drugClassNameEn: 'Interleukin-1 Beta (IL-1β) Inhibitors',
    drugClassNameAr: 'مثبطات الإنترلوكين-1 بيتا',
    dosageForm: 'Solution for injection',
    strength: '150 mg / mL',
    route: 'Subcutaneous',
    packSize: '1 vial × 1 mL',
    summary:
      'Fully human anti-human interleukin-1 beta (IL-1β) monoclonal antibody indicated for autoinflammatory periodic fever syndromes (including Familial Mediterranean Fever), Still’s disease, and gouty arthritis.',
    indications:
      'Autoinflammatory periodic fever syndromes in adults, adolescents, and children aged 2 years and older: Cryopyrin-Associated Periodic Syndromes (CAPS), Tumour Necrosis Factor Receptor Associated Periodic Syndrome (TRAPS), Hyperimmunoglobulin D Syndrome (HIDS)/Mevalonate Kinase Deficiency (MKD), and Familial Mediterranean Fever (FMF); active Still’s disease including adult-onset Still’s disease (AOSD) and systemic juvenile idiopathic arthritis (SJIA); symptomatic treatment of adult patients with frequent gouty arthritis attacks.',
    adultDosage:
      'CAPS (>40 kg): 150 mg every 8 weeks. TRAPS, HIDS/MKD, and FMF (>40 kg): 150 mg every 4 weeks (may increase to 300 mg every 4 weeks if inadequate response). Still’s disease: 4 mg/kg (up to 300 mg) every 4 weeks. Gouty arthritis: 150 mg as a single subcutaneous dose during an attack (at least 12 weeks between doses).',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; active, severe infections.',
    sideEffects:
      'Infections of the upper respiratory tract, nasopharyngitis, urinary tract infection, gastroenteritis, injection site reaction, vertigo, arthralgia, back pain, leukopenia, and neutropenia.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Rheumatology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Ilaris (canakinumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ilaris',
  },
  {
    brandName: 'Sandimmun Neoral 25 mg',
    brandNameAr: 'سانديميون نيورال 25 ملغم',
    genericName: 'Ciclosporin',
    drugClassNameEn: 'Calcineurin Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (مثبطات الكالسينيورين)',
    dosageForm: 'Soft capsule',
    strength: '25 mg',
    route: 'Oral',
    packSize: '50 soft capsules (blister pack)',
    summary:
      'Microemulsion formulation of ciclosporin (25 mg soft capsule) for prevention and treatment of solid organ and bone marrow transplant rejection and severe autoimmune diseases.',
    indications:
      'Solid organ transplantation (prevention of graft rejection following kidney, liver, heart, combined heart-lung, lung, or pancreas transplantation; treatment of transplant cellular rejection); bone marrow transplantation (prevention of graft rejection and prophylaxis or treatment of graft-versus-host disease); endogenous uveitis; nephrotic syndrome; severe active rheumatoid arthritis; severe psoriasis; severe atopic dermatitis.',
    adultDosage:
      'Always administered in 2 divided daily doses guided by therapeutic blood trough monitoring. Solid organ transplantation: 10 to 15 mg/kg/day in 2 divided doses starting within 12 hours before surgery, tapered to maintenance of 2 to 6 mg/kg/day in 2 divided doses. Autoimmune indications: typically 2.5 to 5 mg/kg/day in 2 divided doses.',
    contraindications:
      'Hypersensitivity to ciclosporin or any excipient; combination with products containing Hypericum perforatum (St John’s Wort); combination with substrates for the multidrug efflux transporter P-glycoprotein or organic anion transporter proteins (e.g. bosentan, dabigatran etexilate, aliskiren); renal dysfunction (except nephrotic syndrome), uncontrolled hypertension, uncontrolled infections, or any malignancy in non-transplant indications.',
    sideEffects:
      'Renal dysfunction/nephrotoxicity, hypertension, tremor, headache, paresthesia, hyperlipidemia, anorexia, hyperuricemia, hyperkalemia, hypomagnesemia, nausea, vomiting, abdominal pain, diarrhea, gingival hyperplasia, hirsutism/hypertrichosis, and hepatic dysfunction.',
    storageConditions: 'Do not store above 25°C. Leave capsules in the blister foil until required for use.',
    specialties: ['Nephrology', 'Rheumatology', 'Dermatology', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Sandimmun Neoral (ciclosporin) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/sandimmun-neoral-associated-names',
  },
  {
    brandName: 'Sandimmun Neoral 50 mg',
    brandNameAr: 'سانديميون نيورال 50 ملغم',
    genericName: 'Ciclosporin',
    drugClassNameEn: 'Calcineurin Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (مثبطات الكالسينيورين)',
    dosageForm: 'Soft capsule',
    strength: '50 mg',
    route: 'Oral',
    packSize: '50 soft capsules (blister pack)',
    summary:
      'Microemulsion ciclosporin 50 mg soft capsule for organ transplantation and autoimmune immunosuppression.',
    indications:
      'Prophylaxis and treatment of solid organ and bone marrow transplant rejection; severe endogenous uveitis, steroid-dependent/resistant nephrotic syndrome, severe rheumatoid arthritis, severe psoriasis, and severe atopic dermatitis.',
    adultDosage:
      'Administered in 2 divided daily doses every 12 hours, individualized by whole-blood ciclosporin trough concentrations and renal function.',
    contraindications:
      'Hypersensitivity to ciclosporin; concomitant St John’s Wort, bosentan, dabigatran, or aliskiren; uncontrolled hypertension, uncontrolled infection, malignancy, or baseline renal impairment in non-transplant patients.',
    sideEffects:
      'Nephrotoxicity, hypertension, tremor, headache, hyperlipidemia, hyperkalemia, hypomagnesemia, gingival hyperplasia, and hypertrichosis.',
    storageConditions: 'Do not store above 25°C. Keep in the original blister until administration.',
    specialties: ['Nephrology', 'Rheumatology', 'Dermatology', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Sandimmun Neoral (ciclosporin) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/sandimmun-neoral-associated-names',
  },
  {
    brandName: 'Sandimmun Neoral 100 mg',
    brandNameAr: 'سانديميون نيورال 100 ملغم',
    genericName: 'Ciclosporin',
    drugClassNameEn: 'Calcineurin Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (مثبطات الكالسينيورين)',
    dosageForm: 'Soft capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '50 soft capsules (blister pack)',
    summary:
      'High-strength microemulsion ciclosporin 100 mg soft capsule for solid organ and hematopoietic stem cell transplantation.',
    indications:
      'Prophylaxis and treatment of solid organ and bone marrow transplant rejection, graft-versus-host disease, and severe autoimmune disorders.',
    adultDosage:
      'Divided into 2 daily doses (every 12 hours), adjusted according to blood trough monitoring and clinical protocol.',
    contraindications:
      'Hypersensitivity to ciclosporin; concomitant St John’s Wort, bosentan, dabigatran, or aliskiren; uncontrolled hypertension, infection, or malignancy in autoimmune indications.',
    sideEffects:
      'Dose-dependent nephrotoxicity, hypertension, tremor, hyperlipidemia, gingival hyperplasia, hypertrichosis, hyperkalemia, and hepatotoxicity.',
    storageConditions: 'Do not store above 25°C. Keep capsules in the blister pack until use.',
    specialties: ['Nephrology', 'General Surgery', 'Rheumatology', 'Dermatology', 'Internal Medicine'],
    sourceTitle: 'Sandimmun Neoral (ciclosporin) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/sandimmun-neoral-associated-names',
  },
  {
    brandName: 'Sandimmun Neoral 100 mg/mL',
    brandNameAr: 'سانديميون نيورال 100 ملغم / مل',
    genericName: 'Ciclosporin',
    drugClassNameEn: 'Calcineurin Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (مثبطات الكالسينيورين)',
    dosageForm: 'Oral solution',
    strength: '100 mg / mL',
    route: 'Oral',
    packSize: '1 bottle × 50 mL',
    summary:
      'Microemulsion ciclosporin 100 mg/mL oral solution for precise weight-based dosing in pediatric and adult transplant recipients and autoimmune disorders.',
    indications:
      'Prevention and treatment of solid organ and bone marrow transplant rejection, graft-versus-host disease, nephrotic syndrome, endogenous uveitis, severe rheumatoid arthritis, psoriasis, and atopic dermatitis.',
    adultDosage:
      'Administered in 2 divided daily doses diluted with orange or apple juice (never grapefruit juice) in a glass container just before intake, guided by blood trough levels.',
    contraindications:
      'Hypersensitivity to ciclosporin; concomitant St John’s Wort, bosentan, dabigatran, or aliskiren; baseline renal dysfunction, uncontrolled hypertension, or malignancy in non-transplant indications.',
    sideEffects:
      'Renal dysfunction, hypertension, tremor, headache, hirsutism, gingival hyperplasia, GI disturbances, hyperkalemia, and hypomagnesemia.',
    storageConditions: 'Store between 15°C and 30°C (do not refrigerate below 20°C for prolonged periods). Use within 2 months of opening.',
    specialties: ['Nephrology', 'Pediatrics', 'General Surgery', 'Rheumatology'],
    sourceTitle: 'Sandimmun Neoral (ciclosporin) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/sandimmun-neoral-associated-names',
  },
  {
    brandName: 'Myfortic 180 mg',
    brandNameAr: 'مايفورتيك 180 ملغم',
    genericName: 'Mycophenolic Acid',
    drugClassNameEn: 'Inosine Monophosphate Dehydrogenase (IMPDH) Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (حمض الميكوفينوليك)',
    dosageForm: 'Gastro-resistant tablet',
    strength: '180 mg',
    route: 'Oral',
    packSize: '120 gastro-resistant tablets (blister pack)',
    summary:
      'Enteric-coated mycophenolic acid (180 mg gastro-resistant tablet) indicated in combination with ciclosporin and corticosteroids for prophylaxis of acute renal transplant rejection.',
    indications:
      'Indicated in combination with ciclosporin and corticosteroids for the prophylaxis of acute transplant rejection in adult patients receiving allogeneic renal transplants.',
    adultDosage:
      '720 mg administered twice daily (1440 mg daily total dose), swallowed whole with or without food. Do not crush, chew, or cut the enteric-coated tablets.',
    contraindications:
      'Hypersensitivity to mycophenolate sodium, mycophenolic acid, or mycophenolate mofetil; women of childbearing potential not using highly effective contraceptive methods; initiation in women of childbearing potential without a negative pregnancy test; pregnancy unless there is no suitable alternative treatment to prevent transplant rejection; breastfeeding.',
    sideEffects:
      'Viral, bacterial, and fungal infections (CMV, UTI, herpes, candidiasis), leukopenia, anemia, thrombocytopenia, hypocalcemia, hypokalemia, hyperuricemia, anxiety, dizziness, headache, hypertension, cough, diarrhea, abdominal distension, abdominal pain, constipation, dyspepsia, nausea, and vomiting.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture and light.',
    specialties: ['Nephrology', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Myfortic 180 mg and 360 mg Gastro-Resistant Tablets (mycophenolic acid) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5560/smpc',
  },
  {
    brandName: 'Myfortic 360 mg',
    brandNameAr: 'مايفورتيك 360 ملغم',
    genericName: 'Mycophenolic Acid',
    drugClassNameEn: 'Inosine Monophosphate Dehydrogenase (IMPDH) Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (حمض الميكوفينوليك)',
    dosageForm: 'Gastro-resistant tablet',
    strength: '360 mg',
    route: 'Oral',
    packSize: '120 gastro-resistant tablets (blister pack)',
    summary:
      'Standard maintenance strength enteric-coated mycophenolic acid (360 mg gastro-resistant tablet) for prophylaxis of acute renal allograft rejection.',
    indications:
      'Prophylaxis of acute transplant rejection in adult patients receiving allogeneic renal transplants, in combination with ciclosporin and corticosteroids.',
    adultDosage:
      'Two 360 mg gastro-resistant tablets (720 mg) twice daily (total daily dose 1440 mg), swallowed whole without crushing or breaking.',
    contraindications:
      'Hypersensitivity to mycophenolate sodium, mycophenolic acid, or mycophenolate mofetil; women of childbearing potential not using highly effective contraception; pregnancy unless no alternative exists; breastfeeding.',
    sideEffects:
      'Leukopenia, anemia, diarrhea, nausea, vomiting, dyspepsia, abdominal pain, urinary tract infections, CMV infection, hypertension, and peripheral edema.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture and light.',
    specialties: ['Nephrology', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Myfortic 180 mg and 360 mg Gastro-Resistant Tablets (mycophenolic acid) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5560/smpc',
  },
  {
    brandName: 'Certican 0.75 mg',
    brandNameAr: 'سيرتيكان 0.75 ملغم',
    genericName: 'Everolimus',
    drugClassNameEn: 'mTOR Inhibitor Immunosuppressants',
    drugClassNameAr: 'مثبطات المناعة (مثبطات mTOR)',
    dosageForm: 'Tablet',
    strength: '0.75 mg',
    route: 'Oral',
    packSize: '60 tablets (blister pack)',
    summary:
      'Proliferation signal inhibitor (mTOR inhibitor) everolimus 0.75 mg tablet indicated for prophylaxis of organ rejection in adult kidney, heart, and liver transplant recipients.',
    indications:
      'Prophylaxis of organ rejection in adult patients at low to moderate immunological risk receiving an allogeneic renal or cardiac transplant (in combination with ciclosporin for microemulsion and corticosteroids) or hepatic transplant (in combination with tacrolimus and corticosteroids).',
    adultDosage:
      'Renal and cardiac transplantation: initial dose of 0.75 mg twice daily as soon as possible after transplantation. Hepatic transplantation: initial dose of 1.0 mg twice daily starting approximately 4 weeks after transplantation. Adjust dose to maintain target whole-blood trough concentrations of 3 to 8 ng/mL.',
    contraindications:
      'Hypersensitivity to everolimus, sirolimus, or to any of the excipients.',
    sideEffects:
      'Infections (viral, bacterial, fungal), leukopenia, anemia, thrombocytopenia, hyperlipidemia (hypercholesterolemia, hypertriglyceridemia), new-onset diabetes mellitus, hypertension, pericardial and pleural effusion, peripheral edema, impaired wound healing, stomatitis/mouth ulceration, diarrhea, nausea, and proteinuria.',
    storageConditions: 'Store in the original package in order to protect from light and moisture.',
    specialties: ['Nephrology', 'Cardiology', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Certican Tablets (everolimus) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1920/smpc',
  },
  {
    brandName: 'Simulect 20 mg',
    brandNameAr: 'سيميوليكت 20 ملغم',
    genericName: 'Basiliximab',
    drugClassNameEn: 'Interleukin-2 Receptor Antagonist Monoclonal Antibodies (Anti-CD25)',
    drugClassNameAr: 'الأجسام المضادة لمستقبلات الإنترلوكين-2',
    dosageForm: 'Powder and solvent for solution for injection/infusion',
    strength: '20 mg',
    route: 'Intravenous',
    packSize: '1 vial powder (20 mg) + 1 ampoule solvent (5 mL)',
    summary:
      'Chimeric murine/human monoclonal antibody directed against the interleukin-2 receptor alpha-chain (CD25 antigen) for induction prophylaxis of acute organ rejection in de-novo allogeneic renal transplantation.',
    indications:
      'Prophylaxis of acute organ rejection in de-novo allogeneic renal transplantation in adult and pediatric patients (1 to 17 years), to be used concomitantly with ciclosporin for microemulsion- and corticosteroid-based immunosuppression.',
    adultDosage:
      'Standard total dose of 40 mg given in two 20 mg doses by intravenous infusion over 20 to 30 minutes or intravenous bolus: the first 20 mg dose within 2 hours prior to transplantation surgery, and the second 20 mg dose 4 days after transplantation.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; pregnancy and lactation.',
    sideEffects:
      'Constipation, urinary tract infection, pain, nausea, peripheral edema, hypertension, anemia, headache, hyperkalemia, hypercholesterolemia, surgical wound complication, weight increase, and increased serum creatinine.',
    storageConditions: 'Store and transport refrigerated (2°C to 8°C).',
    specialties: ['Nephrology', 'General Surgery', 'Urology'],
    sourceTitle: 'Simulect (basiliximab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/simulect',
  },

  // =========================================================================
  // 6. ONCOLOGY, HEMATOLOGY & OPHTHALMOLOGY (16 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Glivec 100 mg',
    brandNameAr: 'جليفيك 100 ملغم',
    genericName: 'Imatinib',
    drugClassNameEn: 'BCR-ABL / c-KIT / PDGFR Tyrosine Kinase Inhibitors',
    drugClassNameAr: 'مثبطات كيناز التيروسين (BCR-ABL / c-KIT)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    summary:
      'Protein-tyrosine kinase inhibitor that potently inhibits BCR-ABL, c-KIT, and PDGFR tyrosine kinases in Philadelphia chromosome-positive leukemias and gastrointestinal stromal tumors.',
    indications:
      'Philadelphia chromosome (bcr-abl) positive (Ph+) chronic myeloid leukemia (CML) in chronic phase, accelerated phase, or blast crisis; Ph+ acute lymphoblastic leukemia (ALL); myelodysplastic/myeloproliferative diseases (MDS/MPD) with PDGFR gene re-arrangements; advanced hypereosinophilic syndrome (HES) and/or chronic eosinophilic leukemia (CEL); Kit (CD117) positive unresectable and/or metastatic malignant gastrointestinal stromal tumors (GIST) and adjuvant treatment after resection of Kit+ GIST; unresectable dermatofibrosarcoma protuberans (DFSP).',
    adultDosage:
      'Chronic phase CML: 400 mg once daily. Accelerated phase or blast crisis CML: 600 mg once daily (up to 400 mg twice daily). Ph+ ALL: 600 mg once daily. GIST: 400 mg once daily. Administer orally with a meal and a large glass of water to minimize gastrointestinal irritation.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Neutropenia, thrombocytopenia, anemia, headache, nausea, diarrhea, vomiting, dyspepsia, abdominal pain, periorbital edema, dermatitis/eczema/rash, muscle spasm and cramps, musculoskeletal pain, fluid retention and edema, fatigue, and weight increased.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Glivec (imatinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/glivec',
  },
  {
    brandName: 'Glivec 400 mg',
    brandNameAr: 'جليفيك 400 ملغم',
    genericName: 'Imatinib',
    drugClassNameEn: 'BCR-ABL / c-KIT / PDGFR Tyrosine Kinase Inhibitors',
    drugClassNameAr: 'مثبطات كيناز التيروسين (BCR-ABL / c-KIT)',
    dosageForm: 'Film-coated tablet',
    strength: '400 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    summary:
      'Once-daily 400 mg film-coated tablet of imatinib for chronic phase Ph+ chronic myeloid leukemia and KIT-positive gastrointestinal stromal tumors (GIST).',
    indications:
      'Ph+ chronic myeloid leukemia (CML), Ph+ acute lymphoblastic leukemia (ALL), KIT (CD117)+ gastrointestinal stromal tumors (GIST), MDS/MPD, HES/CEL, and DFSP.',
    adultDosage:
      'One 400 mg tablet once daily with a meal and a large glass of water (for 800 mg daily dosing, give one 400 mg tablet twice daily).',
    contraindications:
      'Hypersensitivity to imatinib or any excipient.',
    sideEffects:
      'Periorbital and peripheral edema, nausea, vomiting, diarrhea, muscle cramps, musculoskeletal pain, cytopenias (neutropenia, thrombocytopenia, anemia), rash, and hepatotoxicity.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Glivec (imatinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/glivec',
  },
  {
    brandName: 'Tasigna 150 mg',
    brandNameAr: 'تاسيجنا 150 ملغم',
    genericName: 'Nilotinib',
    drugClassNameEn: 'Second-Generation BCR-ABL Tyrosine Kinase Inhibitors',
    drugClassNameAr: 'مثبطات كيناز التيروسين BCR-ABL من الجيل الثاني',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '112 hard capsules (multipack)',
    summary:
      'Potent second-generation BCR-ABL tyrosine kinase inhibitor (nilotinib 150 mg) for newly diagnosed Ph+ chronic myeloid leukemia in the chronic phase.',
    indications:
      'Treatment of adult and pediatric patients with newly diagnosed Philadelphia chromosome positive chronic myelogenous leukemia (CML) in the chronic phase.',
    adultDosage:
      '300 mg (two 150 mg capsules) twice daily, approximately 12 hours apart. Must be taken on an empty stomach: no food should be consumed for 2 hours before the dose is taken and for at least 1 hour after the dose is taken.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Thrombocytopenia, neutropenia, anemia, headache, nausea, constipation, diarrhea, vomiting, upper abdominal pain, rash, pruritus, alopecia, myalgia, arthralgia, fatigue, elevated lipase and bilirubin, hyperglycemia, hypercholesterolemia, QTc prolongation, and arterial occlusive events.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Tasigna (nilotinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tasigna',
  },
  {
    brandName: 'Tasigna 200 mg',
    brandNameAr: 'تاسيجنا 200 ملغم',
    genericName: 'Nilotinib',
    drugClassNameEn: 'Second-Generation BCR-ABL Tyrosine Kinase Inhibitors',
    drugClassNameAr: 'مثبطات كيناز التيروسين BCR-ABL من الجيل الثاني',
    dosageForm: 'Hard capsule',
    strength: '200 mg',
    route: 'Oral',
    packSize: '112 hard capsules (multipack)',
    summary:
      'Second-generation BCR-ABL tyrosine kinase inhibitor (nilotinib 200 mg) for chronic and accelerated phase Ph+ CML with resistance or intolerance to prior therapy including imatinib.',
    indications:
      'Treatment of adult patients with chronic phase and accelerated phase Ph+ CML with resistance or intolerance to prior therapy including imatinib, and pediatric patients with chronic phase Ph+ CML with resistance or intolerance to prior therapy including imatinib.',
    adultDosage:
      '400 mg (two 200 mg capsules) twice daily, approximately 12 hours apart, on an empty stomach (no food for 2 hours before and at least 1 hour after dosing).',
    contraindications:
      'Hypersensitivity to nilotinib or any excipient.',
    sideEffects:
      'Myelosuppression (thrombocytopenia, neutropenia, anemia), rash, pruritus, headache, nausea, fatigue, elevated hepatic transaminases, bilirubin, and pancreatic lipase, QTc prolongation, and cardiovascular/arterial occlusive events.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Tasigna (nilotinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tasigna',
  },
  {
    brandName: 'Jakavi 5 mg',
    brandNameAr: 'جاكافي 5 ملغم',
    genericName: 'Ruxolitinib',
    drugClassNameEn: 'Janus Associated Kinase (JAK1 / JAK2) Inhibitors',
    drugClassNameAr: 'مثبطات كيناز جانوس (JAK1 / JAK2)',
    dosageForm: 'Tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    summary:
      'Selective inhibitor of the Janus Associated Kinases JAK1 and JAK2 indicated for myelofibrosis, polycythemia vera, and graft-versus-host disease.',
    indications:
      'Treatment of disease-related splenomegaly or symptoms in adults with primary myelofibrosis, post-polycythemia vera myelofibrosis, or post-essential thrombocythemia myelofibrosis; treatment of adults with polycythemia vera who are resistant to or intolerant of hydroxyurea; treatment of patients aged 28 days and older with acute or chronic graft-versus-host disease (GvHD) who have inadequate response to corticosteroids or other systemic therapies.',
    adultDosage:
      'Myelofibrosis: starting dose depends on baseline platelet count (5 mg twice daily for platelets 50,000 to <100,000/mm³; 15 mg twice daily for 100,000 to 200,000/mm³; 20 mg twice daily for >200,000/mm³). Polycythemia vera and GvHD: 10 mg twice daily.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; pregnancy and lactation.',
    sideEffects:
      'Anemia, thrombocytopenia, neutropenia, urinary tract infections, herpes zoster, pneumonia, hypercholesterolemia, hypertriglyceridemia, weight gain, dizziness, headache, elevated ALT and AST, bruising, and hypertension.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Jakavi (ruxolitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jakavi',
  },
  {
    brandName: 'Jakavi 15 mg',
    brandNameAr: 'جاكافي 15 ملغم',
    genericName: 'Ruxolitinib',
    drugClassNameEn: 'Janus Associated Kinase (JAK1 / JAK2) Inhibitors',
    drugClassNameAr: 'مثبطات كيناز جانوس (JAK1 / JAK2)',
    dosageForm: 'Tablet',
    strength: '15 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    summary:
      'Intermediate starting and maintenance strength (15 mg) of ruxolitinib for myelofibrosis in patients with baseline platelet counts of 100,000 to 200,000/mm³.',
    indications:
      'Primary myelofibrosis, post-polycythemia vera myelofibrosis, post-essential thrombocythemia myelofibrosis, hydroxyurea-resistant/intolerant polycythemia vera, and steroid-refractory acute or chronic graft-versus-host disease.',
    adultDosage:
      'Myelofibrosis (platelets 100,000 to 200,000/mm³): 15 mg orally twice daily with or without food, titrated according to platelet and neutrophil counts.',
    contraindications:
      'Hypersensitivity to ruxolitinib or any excipient; pregnancy and lactation.',
    sideEffects:
      'Anemia, thrombocytopenia, neutropenia, herpes zoster, urinary tract infections, hyperlipidemia, weight gain, bruising, dizziness, and headache.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Jakavi (ruxolitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jakavi',
  },
  {
    brandName: 'Jakavi 20 mg',
    brandNameAr: 'جاكافي 20 ملغم',
    genericName: 'Ruxolitinib',
    drugClassNameEn: 'Janus Associated Kinase (JAK1 / JAK2) Inhibitors',
    drugClassNameAr: 'مثبطات كيناز جانوس (JAK1 / JAK2)',
    dosageForm: 'Tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    summary:
      'High-strength ruxolitinib 20 mg tablet for myelofibrosis in adults with baseline platelet counts above 200,000/mm³.',
    indications:
      'Treatment of disease-related splenomegaly or symptoms in adult patients with primary myelofibrosis, post-polycythemia vera myelofibrosis, or post-essential thrombocythemia myelofibrosis.',
    adultDosage:
      '20 mg orally twice daily for patients with baseline platelet count > 200,000/mm³ (maximum dose 25 mg twice daily).',
    contraindications:
      'Hypersensitivity to ruxolitinib or any excipient; pregnancy and lactation.',
    sideEffects:
      'Dose-dependent anemia, thrombocytopenia, neutropenia, infections (herpes zoster, UTI), hypercholesterolemia, weight gain, dizziness, and elevated transaminases.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Jakavi (ruxolitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jakavi',
  },
  {
    brandName: 'Kisqali 200 mg',
    brandNameAr: 'كيسكالي 200 ملغم',
    genericName: 'Ribociclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    drugClassNameAr: 'مثبطات الكيناز المعتمد على السيكلين 4 و 6',
    dosageForm: 'Film-coated tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '63 film-coated tablets (blister pack)',
    summary:
      'Selective inhibitor of cyclin-dependent kinase 4 and 6 (CDK4/6) indicated in combination with endocrine therapy for HR-positive, HER2-negative early and advanced or metastatic breast cancer.',
    indications:
      'In combination with an aromatase inhibitor as adjuvant treatment in patients with hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative early breast cancer at high risk of recurrence; and for treatment of women with HR-positive, HER2-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor or fulvestrant as initial endocrine-based therapy, or in women who have received prior endocrine therapy.',
    adultDosage:
      'Advanced/metastatic breast cancer: 600 mg (three 200 mg film-coated tablets) once daily for 21 consecutive days followed by 7 days off treatment (28-day cycle). Adjuvant early breast cancer: 400 mg (two 200 mg tablets) once daily for 21 consecutive days followed by 7 days off treatment for 3 years.',
    contraindications:
      'Hypersensitivity to the active substance or to peanut, soya, or any excipient.',
    sideEffects:
      'Neutropenia, leukopenia, anemia, lymphopenia, headache, dizziness, dyspnea, cough, nausea, diarrhea, vomiting, constipation, stomatitis, abdominal pain, alopecia, rash, pruritus, fatigue, peripheral edema, pyrexia, abnormal liver function tests, and QTc interval prolongation.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'Kisqali (ribociclib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kisqali',
  },
  {
    brandName: 'Afinitor 5 mg',
    brandNameAr: 'أفينيتور 5 ملغم',
    genericName: 'Everolimus',
    drugClassNameEn: 'mTOR Kinase Inhibitor Antineoplastic Agents',
    drugClassNameAr: 'مثبطات كيناز mTOR المضادة للأورام',
    dosageForm: 'Tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '30 tablets (blister pack)',
    summary:
      'Selective inhibitor of mTOR (mammalian target of rapamycin) indicated for HR+/HER2- advanced breast cancer, neuroendocrine tumors, and advanced renal cell carcinoma.',
    indications:
      'Hormone receptor-positive, HER2/neu-negative advanced breast cancer in combination with exemestane in postmenopausal women without symptomatic visceral disease after recurrence or progression following a non-steroidal aromatase inhibitor; unresectable or metastatic, well- or moderately-differentiated neuroendocrine tumors of pancreatic origin, and of gastrointestinal or lung origin; advanced renal cell carcinoma whose disease has progressed on or after VEGF-targeted therapy.',
    adultDosage:
      'Recommended dose is 10 mg once daily; the 5 mg strength is used for dose reduction (5 mg once daily or 5 mg every other day) to manage adverse reactions or in hepatic impairment.',
    contraindications:
      'Hypersensitivity to the active substance, to other rapamycin derivatives, or to any of the excipients.',
    sideEffects:
      'Stomatitis, infections, non-infectious pneumonitis, anemia, thrombocytopenia, neutropenia, hyperglycemia, hypercholesterolemia, hypertriglyceridemia, decreased appetite, dysgeusia, headache, epistaxis, diarrhea, nausea, rash, pruritus, fatigue, asthenia, peripheral edema, and increased serum creatinine.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from light and moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Afinitor (everolimus) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/afinitor',
  },
  {
    brandName: 'Afinitor 10 mg',
    brandNameAr: 'أفينيتور 10 ملغم',
    genericName: 'Everolimus',
    drugClassNameEn: 'mTOR Kinase Inhibitor Antineoplastic Agents',
    drugClassNameAr: 'مثبطات كيناز mTOR المضادة للأورام',
    dosageForm: 'Tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 tablets (blister pack)',
    summary:
      'Standard 10 mg once-daily oncology tablet of everolimus for advanced HR+/HER2- breast cancer, neuroendocrine tumors, and advanced renal cell carcinoma.',
    indications:
      'HR+/HER2- advanced breast cancer (with exemestane), unresectable or metastatic neuroendocrine tumors of pancreatic, GI, or lung origin, and advanced renal cell carcinoma after VEGF-targeted therapy.',
    adultDosage:
      'One 10 mg tablet once daily at the same time every day, consistently either with or without food, swallowed whole with a glass of water.',
    contraindications:
      'Hypersensitivity to everolimus, other rapamycin derivatives, or any excipient.',
    sideEffects:
      'Stomatitis, non-infectious pneumonitis, infections, rash, fatigue, diarrhea, peripheral edema, anemia, hyperglycemia, and hyperlipidemia.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from light and moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Afinitor (everolimus) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/afinitor',
  },
  {
    brandName: 'Femara 2.5 mg',
    brandNameAr: 'فيمارا 2.5 ملغم',
    genericName: 'Letrozole',
    drugClassNameEn: 'Non-Steroidal Aromatase Inhibitors',
    drugClassNameAr: 'مثبطات الأروماتاز غير الستيرويدية',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    summary:
      'Potent and selective non-steroidal aromatase inhibitor indicated for adjuvant, extended adjuvant, first-line, and second-line treatment of hormone-receptor-positive breast cancer in postmenopausal women.',
    indications:
      'Adjuvant treatment of postmenopausal women with hormone receptor-positive invasive early breast cancer; extended adjuvant treatment of hormonally-dependent invasive breast cancer in postmenopausal women who have received 5 years of prior standard adjuvant tamoxifen therapy; first-line treatment in postmenopausal women with hormone-dependent advanced breast cancer; advanced breast cancer after relapse or disease progression in women with natural or artificially induced postmenopausal endocrine status; neoadjuvant treatment of postmenopausal women with HER-2 negative hormone receptor-positive breast cancer.',
    adultDosage:
      'One 2.5 mg tablet once daily, with or without food.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; premenopausal endocrine status; pregnancy and lactation.',
    sideEffects:
      'Hot flushes, hypercholesterolemia, arthralgia, fatigue, increased sweating, bone pain, myalgia, headache, dizziness, nausea, peripheral edema, osteoporosis, and bone fractures.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Femara 2.5 mg Tablets (letrozole) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1029/smpc',
  },
  {
    brandName: 'Revolade 25 mg',
    brandNameAr: 'ريفوليد 25 ملغم',
    genericName: 'Eltrombopag',
    drugClassNameEn: 'Thrombopoietin Receptor Agonists (TPO-RAs)',
    drugClassNameAr: 'ناهضات مستقبلات الثرومبوبويتين',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Oral small-molecule thrombopoietin receptor agonist that stimulates megakaryocyte proliferation and platelet production in primary immune thrombocytopenia and severe aplastic anemia.',
    indications:
      'Primary immune thrombocytopenia (ITP) in patients aged 1 year and above who are refractory to other treatments (e.g. corticosteroids, immunoglobulins); thrombocytopenia in adult patients with chronic hepatitis C virus (HCV) infection to allow initiation and maintenance of interferon-based therapy; acquired severe aplastic anemia (SAA) refractory to prior immunosuppressive therapy or heavily pretreated and unsuitable for hematopoietic stem cell transplantation.',
    adultDosage:
      'ITP: initiate at 50 mg once daily (25 mg once daily in patients of East-/Southeast-Asian ancestry or hepatic impairment), adjusted to maintain platelet count ≥ 50,000/µL (maximum 75 mg daily). Take at least 2 hours before or 4 hours after antacids, dairy products, or mineral supplements containing polyvalent cations (iron, calcium, magnesium, aluminum, selenium, zinc).',
    contraindications:
      'Hypersensitivity to eltrombopag or to any of the excipients.',
    sideEffects:
      'Pharyngitis, urinary tract infection, nausea, diarrhea, mouth ulceration, elevated ALT/AST and bilirubin, alopecia, rash, back pain, muscle spasm, paresthesia, cataract, and thromboembolic events.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'Revolade (eltrombopag) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/revolade',
  },
  {
    brandName: 'Revolade 50 mg',
    brandNameAr: 'ريفوليد 50 ملغم',
    genericName: 'Eltrombopag',
    drugClassNameEn: 'Thrombopoietin Receptor Agonists (TPO-RAs)',
    drugClassNameAr: 'ناهضات مستقبلات الثرومبوبويتين',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    summary:
      'Standard 50 mg once-daily tablet of eltrombopag for primary immune thrombocytopenia (ITP) and severe aplastic anemia.',
    indications:
      'Primary immune thrombocytopenia (ITP), chronic HCV-associated thrombocytopenia, and acquired severe aplastic anemia (SAA).',
    adultDosage:
      'ITP standard starting dose: 50 mg once daily; SAA standard starting dose: 150 mg once daily (reduced in East-/Southeast-Asian ancestry). Take at least 2 hours before or 4 hours after polyvalent cation-containing products or dairy.',
    contraindications:
      'Hypersensitivity to eltrombopag or any excipient.',
    sideEffects:
      'Headache, nausea, diarrhea, elevated hepatic transaminases and bilirubin, fatigue, rash, arthralgia, and thromboembolic complications at excessive platelet counts.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Internal Medicine'],
    sourceTitle: 'Revolade (eltrombopag) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/revolade',
  },
  {
    brandName: 'Exjade 360 mg',
    brandNameAr: 'إكسجيد 360 ملغم',
    genericName: 'Deferasirox',
    drugClassNameEn: 'Oral Iron Chelating Agents',
    drugClassNameAr: 'خالبات الحديد الفموية',
    dosageForm: 'Film-coated tablet',
    strength: '360 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    summary:
      'Orally active tridentate iron chelator (deferasirox 360 mg film-coated tablet) indicated for chronic iron overload due to blood transfusions and non-transfusion-dependent thalassemia syndromes.',
    indications:
      'Treatment of chronic iron overload due to frequent blood transfusions (≥7 mL/kg/month of packed red blood cells) in patients with beta thalassemia major aged 6 years and older; chronic transfusional iron overload when deferoxamine therapy is contraindicated or inadequate in pediatric and adult patients with other anemias; chronic iron overload requiring chelation therapy when deferoxamine is contraindicated or inadequate in patients with non-transfusion-dependent thalassemia syndromes aged 10 years and older.',
    adultDosage:
      'Transfusional iron overload: recommended initial dose of Exjade film-coated tablets is 14 mg/kg body weight once daily, adjusted in steps of 3.5 or 7 mg/kg/day every 3 to 6 months based on serum ferritin trends (maximum 28 mg/kg/day). Non-transfusion-dependent thalassemia: initial dose 7 mg/kg/day. Swallow whole with water or crush onto soft food once daily, with or without a light meal.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; combination with other iron chelator therapies; estimated creatinine clearance < 60 mL/min.',
    sideEffects:
      'Increased blood creatinine, proteinuria, renal tubular disorder, nausea, vomiting, diarrhea, abdominal pain, abdominal distension, constipation, dyspepsia, increased transaminases, rash, pruritus, and headache.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Exjade (deferasirox) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/exjade',
  },
  {
    brandName: 'Sandostatin LAR 30 mg',
    brandNameAr: 'ساندوستاتين لار 30 ملغم',
    genericName: 'Octreotide',
    drugClassNameEn: 'Long-Acting Somatostatin Analogues',
    drugClassNameAr: 'نظائر السوماتوستاتين طويلة المفعول',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection',
    strength: '30 mg',
    route: 'Intramuscular',
    packSize: '1 vial powder (30 mg) + 1 pre-filled syringe solvent (2 mL)',
    summary:
      'Long-acting depot formulation of the synthetic somatostatin analogue octreotide (30 mg) administered by deep intragluteal injection every 4 weeks for acromegaly and gastroenteropancreatic neuroendocrine tumors.',
    indications:
      'Treatment of patients with acromegaly in whom surgery is inappropriate or ineffective, or in the interim period until radiotherapy becomes fully effective; treatment of patients with symptoms associated with functional gastro-entero-pancreatic (GEP) endocrine tumors (carcinoid tumors with features of the carcinoid syndrome, VIPomas, glucagonomas, gastrinomas/Zollinger-Ellison syndrome, insulinomas, GRFomas); treatment of patients with advanced neuroendocrine tumors of the midgut or of unknown primary origin where non-midgut sites of origin have been excluded.',
    adultDosage:
      'Acromegaly and functional GEP endocrine tumors: initiate at 20 mg every 4 weeks for 3 months, then adjust to 10 mg, 20 mg, or 30 mg every 4 weeks based on GH/IGF-1 levels and clinical symptoms. Advanced midgut neuroendocrine tumors: 30 mg administered by deep intragluteal injection every 4 weeks.',
    contraindications:
      'Known hypersensitivity to octreotide or to any of the excipients.',
    sideEffects:
      'Cholelithiasis (gallstones), biliary sludge, diarrhea, abdominal pain, nausea, constipation, flatulence, headache, hyperglycemia, hypothyroidism, bradycardia, alopecia, and injection site pain/swelling.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Endocrinology', 'Oncology', 'Gastroenterology'],
    sourceTitle: 'Sandostatin / Sandostatin LAR (octreotide) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/sandostatin-associated-names',
  },
  {
    brandName: 'Lucentis 10 mg/mL',
    brandNameAr: 'لوسنتس 10 ملغم / مل',
    genericName: 'Ranibizumab',
    drugClassNameEn: 'Anti-VEGF-A Monoclonal Antibody Fragments (Ocular Anti-Neovascular Agents)',
    drugClassNameAr: 'مثبطات عامل نمو بطانة الأوعية الدموية العينية (Anti-VEGF)',
    dosageForm: 'Solution for injection',
    strength: '10 mg / mL',
    route: 'Intravitreal',
    packSize: '1 vial (0.23 mL) or 1 pre-filled syringe (0.165 mL)',
    summary:
      'Humanized recombinant monoclonal antibody fragment targeted against human vascular endothelial growth factor A (VEGF-A) for neovascular retinal disorders.',
    indications:
      'Neovascular (wet) age-related macular degeneration (AMD); visual impairment due to diabetic macular edema (DME); proliferative diabetic retinopathy (PDR); visual impairment due to macular edema secondary to retinal vein occlusion (branch RVO or central RVO); visual impairment due to choroidal neovascularisation (CNV); retinopathy of prematurity (ROP) in preterm infants.',
    adultDosage:
      'Adults: 0.5 mg (0.05 mL of 10 mg/mL solution) given as a single intravitreal injection. Treatment is initiated with one injection per month until maximum visual acuity is achieved and/or there are no signs of disease activity, with subsequent monitoring and treatment intervals determined by the physician (treat-and-extend or PRN). At least 4 weeks must elapse between two doses in the same eye.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; patients with active or suspected ocular or periocular infections; patients with active severe intraocular inflammation.',
    sideEffects:
      'Conjunctival hemorrhage, eye pain, vitreous floaters, retinal hemorrhage, increased intraocular pressure, vitreous detachment, intraocular inflammation, eye irritation, foreign body sensation in eyes, increased lacrimation, blepharitis, dry eye, ocular hyperemia, eye pruritus, and rare endophthalmitis or retinal detachment.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the container in the outer carton in order to protect from light.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'Lucentis (ranibizumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lucentis',
  },
];

export const NOVARTIS_PRODUCTS: AiProductDraft[] = NOVARTIS_COMPACT_PRODUCTS.map(toNovartisProductDraft);
import type { AiDraftSource, AiProductDraft } from './catalog';

const MERCK_KGAA_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactMerckKgaaDrug {
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

function toMerckKgaaProductDraft(item: CompactMerckKgaaDrug): AiProductDraft {
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
    sources: MERCK_KGAA_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Merck KGaA (Darmstadt, Germany) regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

const MERCK_KGAA_COMPACT_PRODUCTS: CompactMerckKgaaDrug[] = [
  // =========================================================================
  // 1. CARDIOVASCULAR — BISOPROLOL & FIXED-DOSE COMBINATIONS (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Concor 5 mg',
    brandNameAr: 'كونكور 5 ملغم',
    genericName: 'Bisoprolol',
    drugClassNameEn: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of essential hypertension, chronic stable angina pectoris (coronary heart disease), and stable chronic heart failure with reduced systolic left ventricular function in addition to ACE inhibitors, diuretics, and optionally cardiac glycosides.',
    adultDosage:
      'Hypertension and angina pectoris: usually 5 mg to 10 mg once daily in the morning with or without food (maximum 20 mg once daily). Do not discontinue abruptly, especially in patients with ischaemic heart disease.',
    contraindications:
      'Acute heart failure or decompensated heart failure requiring intravenous inotropic therapy, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, sinoatrial block, symptomatic bradycardia, symptomatic hypotension, severe bronchial asthma, severe peripheral arterial occlusive disease or Raynaud syndrome, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, dizziness, headache, feeling of coldness or numbness in the extremities, hypotension, gastrointestinal complaints (nausea, vomiting, diarrhoea, constipation), and fatigue.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor (bisoprolol) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/cardiovascular/products/concor/indications-and-dosing.html',
  },
  {
    brandName: 'Concor 10 mg',
    brandNameAr: 'كونكور 10 ملغم',
    genericName: 'Bisoprolol',
    drugClassNameEn: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Maintenance treatment of essential hypertension, chronic stable angina pectoris, and target maintenance dose in stable chronic heart failure with reduced ejection fraction.',
    adultDosage:
      'Hypertension and angina pectoris: 10 mg once daily in the morning (maximum 20 mg once daily). Chronic heart failure target maintenance dose: 10 mg once daily after gradual up-titration. In severe renal (CrCl <20 mL/min) or severe hepatic impairment, do not exceed 10 mg daily.',
    contraindications:
      'Acute or decompensated heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia or hypotension, severe bronchial asthma, severe peripheral arterial occlusive disease, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, fatigue, dizziness, headache, peripheral coldness, hypotension, and mild gastrointestinal disturbances.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor (bisoprolol) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/cardiovascular/products/concor/indications-and-dosing.html',
  },
  {
    brandName: 'Concor Cor 1.25 mg',
    brandNameAr: 'كونكور كور 1.25 ملغم',
    genericName: 'Bisoprolol',
    drugClassNameEn: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    dosageForm: 'Film-coated tablet',
    strength: '1.25 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Initial titration treatment of stable chronic heart failure with reduced systolic left ventricular function in addition to ACE inhibitors and diuretics, and optionally cardiac glycosides.',
    adultDosage:
      'Initial titration dose in stable chronic heart failure: 1.25 mg once daily for 1 week; if well tolerated, increase stepwise (2.5 mg for 1 week, 3.75 mg for 1 week, 5 mg for 4 weeks, 7.5 mg for 4 weeks) to target maintenance dose of 10 mg once daily.',
    contraindications:
      'Acute heart failure or decompensated heart failure requiring IV inotropic therapy, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, sinoatrial block, symptomatic bradycardia (<60 bpm prior to start), symptomatic hypotension (SBP <100 mmHg), severe bronchial asthma, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, worsening of pre-existing heart failure during titration, dizziness, hypotension, fatigue, asthenia, and cold extremities.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor Cor (bisoprolol) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/neast-en/cmc/cardiovascular/products/concor-cor/indications-and-dosing.html',
  },
  {
    brandName: 'Concor Cor 2.5 mg',
    brandNameAr: 'كونكور كور 2.5 ملغم',
    genericName: 'Bisoprolol',
    drugClassNameEn: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of stable chronic heart failure with reduced systolic left ventricular function in addition to ACE inhibitors and diuretics, and optionally cardiac glycosides.',
    adultDosage:
      'Step 2 of chronic heart failure up-titration: 2.5 mg once daily in the morning for 1 week after tolerating 1.25 mg once daily, before advancing to 3.75 mg once daily and 5 mg once daily.',
    contraindications:
      'Acute or decompensated heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia or hypotension, severe bronchial asthma, severe peripheral arterial occlusive disease, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, dizziness, orthostatic hypotension, transient worsening of heart failure, fatigue, headache, and coldness in extremities.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor Cor (bisoprolol) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/neast-en/cmc/cardiovascular/products/concor-cor/indications-and-dosing.html',
  },
  {
    brandName: 'Concor Cor 3.75 mg',
    brandNameAr: 'كونكور كور 3.75 ملغم',
    genericName: 'Bisoprolol',
    drugClassNameEn: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    dosageForm: 'Film-coated tablet',
    strength: '3.75 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Stepwise titration of stable chronic heart failure with reduced systolic left ventricular function in combination with standard heart failure therapy.',
    adultDosage:
      'Step 3 of chronic heart failure up-titration: 3.75 mg once daily in the morning for 1 week after tolerating 2.5 mg once daily, before advancing to 5 mg once daily.',
    contraindications:
      'Acute or decompensated heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia or hypotension, severe bronchial asthma, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, dizziness, hypotension, fatigue, asthenia, headache, and gastrointestinal disturbances.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor Cor (bisoprolol) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/neast-en/cmc/cardiovascular/products/concor-cor/indications-and-dosing.html',
  },
  {
    brandName: 'Concor AM 5 mg/5 mg',
    brandNameAr: 'كونكور إيه إم 5 ملغم/5 ملغم',
    genericName: 'Bisoprolol + Amlodipine',
    drugClassNameEn: 'Beta-Blocker and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '5 mg / 5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of essential hypertension as substitution therapy in adult patients whose blood pressure is adequately controlled with the individual products (bisoprolol 5 mg and amlodipine 5 mg) given concurrently at the same dose level.',
    adultDosage:
      'One tablet (5 mg/5 mg) once daily in the morning, with or without food, swallowed whole without chewing. Do not stop treatment abruptly.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe hypotension, outflow tract obstruction of the left ventricle (high-grade aortic stenosis), severe bronchial asthma, severe peripheral arterial occlusive disease, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Peripheral oedema (ankle swelling), headache, dizziness, somnolence, palpitations, flushing, bradycardia, fatigue, and abdominal pain or nausea.',
    storageConditions: 'Store below 30°C in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor AM (bisoprolol / amlodipine) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/en/cmc/cardiovascular/products/concor-am.html',
  },
  {
    brandName: 'Concor AM 5 mg/10 mg',
    brandNameAr: 'كونكور إيه إم 5 ملغم/10 ملغم',
    genericName: 'Bisoprolol + Amlodipine',
    drugClassNameEn: 'Beta-Blocker and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '5 mg / 10 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of essential hypertension as substitution therapy in adult patients adequately controlled with bisoprolol 5 mg and amlodipine 10 mg given concurrently.',
    adultDosage:
      'One tablet (5 mg/10 mg) once daily in the morning, with or without food. Do not discontinue abruptly.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe hypotension, high-grade aortic stenosis, severe bronchial asthma, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Peripheral ankle oedema, flushing, headache, dizziness, bradycardia, fatigue, and gastrointestinal discomfort.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor AM (bisoprolol / amlodipine) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/en/cmc/cardiovascular/products/concor-am.html',
  },
  {
    brandName: 'Concor AM 10 mg/5 mg',
    brandNameAr: 'كونكور إيه إم 10 ملغم/5 ملغم',
    genericName: 'Bisoprolol + Amlodipine',
    drugClassNameEn: 'Beta-Blocker and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '10 mg / 5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of essential hypertension as substitution therapy in adult patients adequately controlled with bisoprolol 10 mg and amlodipine 5 mg given concurrently.',
    adultDosage:
      'One tablet (10 mg/5 mg) once daily in the morning, with or without food. Do not discontinue abruptly.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe hypotension, high-grade aortic stenosis, severe bronchial asthma, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Bradycardia, peripheral oedema, dizziness, headache, flushing, cold extremities, and fatigue.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor AM (bisoprolol / amlodipine) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/en/cmc/cardiovascular/products/concor-am.html',
  },
  {
    brandName: 'Concor AM 10 mg/10 mg',
    brandNameAr: 'كونكور إيه إم 10 ملغم/10 ملغم',
    genericName: 'Bisoprolol + Amlodipine',
    drugClassNameEn: 'Beta-Blocker and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '10 mg / 10 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of essential hypertension as substitution therapy in adult patients adequately controlled with bisoprolol 10 mg and amlodipine 10 mg given concurrently.',
    adultDosage:
      'One tablet (10 mg/10 mg) once daily in the morning, with or without food. Do not discontinue abruptly.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe hypotension, high-grade aortic stenosis, severe bronchial asthma, untreated phaeochromocytoma, and metabolic acidosis.',
    sideEffects:
      'Peripheral oedema, bradycardia, dizziness, headache, flushing, hypotension, and fatigue.',
    storageConditions: 'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor AM (bisoprolol / amlodipine) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/en/cmc/cardiovascular/products/concor-am.html',
  },
  {
    brandName: 'Concor Plus 5 mg/12.5 mg',
    brandNameAr: 'كونكور بلس 5 ملغم/12.5 ملغم',
    genericName: 'Bisoprolol + Hydrochlorothiazide',
    drugClassNameEn: 'Beta-Blocker and Thiazide Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 12.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on monotherapy with bisoprolol or hydrochlorothiazide alone.',
    adultDosage:
      'One film-coated tablet (5 mg/12.5 mg) once daily in the morning, with or without food. May be increased to two tablets (10 mg/25 mg) once daily if needed.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe bronchial asthma, severe renal impairment (CrCl ≤30 mL/min), anuria, severe hepatic impairment, refractory hypokalaemia, hyponatraemia, hypercalcaemia, symptomatic hyperuricaemia/gout, and sulfonamide hypersensitivity.',
    sideEffects:
      'Bradycardia, dizziness, headache, hypokalaemia, hyperuricaemia, hyperglycaemia, hyperlipidaemia, cold extremities, and fatigue.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor Plus (bisoprolol / hydrochlorothiazide) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/cardiovascular/products/concor-plus/indications-and-dosing.html',
  },
  {
    brandName: 'Concor Plus 10 mg/25 mg',
    brandNameAr: 'كونكور بلس 10 ملغم/25 ملغم',
    genericName: 'Bisoprolol + Hydrochlorothiazide',
    drugClassNameEn: 'Beta-Blocker and Thiazide Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 25 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of essential hypertension in patients requiring higher-strength combination therapy with bisoprolol 10 mg and hydrochlorothiazide 25 mg.',
    adultDosage:
      'One film-coated tablet (10 mg/25 mg) once daily in the morning, with or without food.',
    contraindications:
      'Acute heart failure, cardiogenic shock, second- or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe bronchial asthma, severe renal impairment (CrCl ≤30 mL/min), anuria, severe hepatic impairment, refractory hypokalaemia, hyponatraemia, hypercalcaemia, gout, and sulfonamide hypersensitivity.',
    sideEffects:
      'Bradycardia, hypokalaemia, hyperuricaemia, dizziness, headache, orthostatic hypotension, fatigue, and cold extremities.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Concor Plus (bisoprolol / hydrochlorothiazide) Official Prescribing Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/cardiovascular/products/concor-plus/indications-and-dosing.html',
  },

  // =========================================================================
  // 2. DIABETES & THYROID — GLUCOPHAGE, GLUCOVANCE & EUTHYROX (14 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Glucophage 500 mg',
    brandNameAr: 'غلوكوفاج 500 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '50 film-coated tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults and children aged 10 years and older, particularly in overweight patients, when dietary management and exercise alone do not result in adequate glycaemic control; may be used as monotherapy or in combination with other oral antidiabetic agents or insulin.',
    adultDosage:
      'Initially 500 mg or 850 mg two or three times daily given during or after meals; adjust dose after 10–15 days based on blood glucose measurements. Maximum recommended dose is 3000 mg daily in 3 divided doses (reduce dose if eGFR 30–44 mL/min/1.73 m²; contraindicated if eGFR <30 mL/min/1.73 m²).',
    contraindications:
      'Any type of acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), diabetic pre-coma, severe renal failure (eGFR <30 mL/min/1.73 m²), acute conditions with potential to alter renal function (dehydration, severe infection, shock), tissue hypoxia (decompensated heart failure, respiratory failure, recent myocardial infarction), hepatic insufficiency, and acute alcohol intoxication.',
    sideEffects:
      'Gastrointestinal disturbances (nausea, vomiting, diarrhoea, abdominal pain, loss of appetite), taste disturbance (metallic taste), decreased vitamin B12 absorption on long-term use, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'EMA Referral — Glucophage (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucophage 850 mg',
    brandNameAr: 'غلوكوفاج 850 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics',
    dosageForm: 'Film-coated tablet',
    strength: '850 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults and children aged 10 years and older as monotherapy or in combination with other antidiabetic medicines or insulin.',
    adultDosage:
      'Initially 850 mg two or three times daily with or after meals; maintenance dose usually 1700 mg to 2550 mg daily in divided doses (maximum 3000 mg daily; maximum 1000 mg daily if eGFR 30–44 mL/min/1.73 m²).',
    contraindications:
      'Acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), severe renal failure (eGFR <30 mL/min/1.73 m²), dehydration, severe infection, shock, decompensated heart or respiratory failure, hepatic insufficiency, and alcoholism.',
    sideEffects:
      'Diarrhoea, nausea, vomiting, abdominal pain, dysgeusia, vitamin B12 deficiency, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Glucophage (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucophage 1000 mg',
    brandNameAr: 'غلوكوفاج 1000 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics',
    dosageForm: 'Film-coated tablet',
    strength: '1000 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Maintenance treatment of type 2 diabetes mellitus in adults and children aged 10 years and older requiring higher-strength metformin therapy.',
    adultDosage:
      'Maintenance dose: 1000 mg twice daily (2000 mg/day) or up to 1000 mg three times daily (3000 mg/day) taken during or after meals. Withhold at the time of or prior to iodinated contrast imaging procedures according to renal function.',
    contraindications:
      'Acute metabolic acidosis, severe renal impairment (eGFR <30 mL/min/1.73 m²), acute dehydration or shock, tissue hypoxia, hepatic insufficiency, and acute alcohol intoxication.',
    sideEffects:
      'Gastrointestinal symptoms (diarrhoea, nausea, abdominal discomfort), metallic taste, reduced serum vitamin B12 levels, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Glucophage (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucophage XR 500 mg',
    brandNameAr: 'غلوكوفاج إكس آر 500 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics (Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults, particularly in overweight patients, when dietary management and exercise alone do not result in adequate glycaemic control, and for reduction in the risk or delay of the onset of type 2 diabetes in adult overweight patients with impaired glucose tolerance and/or impaired fasting glucose.',
    adultDosage:
      'Initially 500 mg once daily with the evening meal; after 10–15 days adjust dose in 500 mg increments every 10–15 days up to a maximum of 2000 mg once daily with the evening meal. Swallow whole; do not chew or crush.',
    contraindications:
      'Acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), severe renal failure (eGFR <30 mL/min/1.73 m²), acute conditions altering renal function, tissue hypoxia, hepatic insufficiency, and alcoholism.',
    sideEffects:
      'Nausea, diarrhoea, abdominal pain, loss of appetite, taste disturbance, vitamin B12 decrease, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Glucophage / Glucophage XR (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucophage XR 750 mg',
    brandNameAr: 'غلوكوفاج إكس آر 750 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics (Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '750 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults as monotherapy or in combination with other oral antidiabetic agents or insulin, and prevention of type 2 diabetes in high-risk prediabetes.',
    adultDosage:
      'Usually 1 tablet (750 mg) once daily with the evening meal, titrated up to 2 tablets (1500 mg) once daily with the evening meal (maximum 2000 mg daily). Swallow whole without chewing.',
    contraindications:
      'Acute metabolic acidosis, severe renal impairment (eGFR <30 mL/min/1.73 m²), dehydration, shock, tissue hypoxia, and hepatic insufficiency.',
    sideEffects:
      'Gastrointestinal complaints (diarrhoea, nausea, abdominal pain), metallic taste, decreased vitamin B12 levels, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Glucophage / Glucophage XR (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucophage XR 1000 mg',
    brandNameAr: 'غلوكوفاج إكس آر 1000 ملغم',
    genericName: 'Metformin',
    drugClassNameEn: 'Biguanide Antidiabetics (Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '1000 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Maintenance treatment of type 2 diabetes mellitus in adults already treated with metformin tablets (1000 mg to 2000 mg daily) as monotherapy or in combination with other antidiabetic agents or insulin.',
    adultDosage:
      '1 to 2 prolonged-release tablets (1000 mg to 2000 mg) once daily with the evening meal (maximum 2000 mg once daily). Swallow whole without chewing or crushing.',
    contraindications:
      'Acute metabolic acidosis, severe renal failure (eGFR <30 mL/min/1.73 m²), acute dehydration or sepsis, tissue hypoxia, and hepatic insufficiency.',
    sideEffects:
      'Diarrhoea, nausea, abdominal discomfort, dysgeusia, decreased serum vitamin B12, and very rarely lactic acidosis.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Glucophage / Glucophage XR (metformin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/glucophage',
  },
  {
    brandName: 'Glucovance 500 mg/2.5 mg',
    brandNameAr: 'غلوكوفانس 500 ملغم/2.5 ملغم',
    genericName: 'Metformin + Glibenclamide',
    drugClassNameEn: 'Biguanide and Sulfonylurea Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg / 2.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults as second-line therapy when diet, exercise, and previous treatment with metformin or a sulfonylurea alone do not result in adequate glycaemic control, or as replacement for stable combination of metformin and glibenclamide.',
    adultDosage:
      'Initially 1 tablet (500 mg/2.5 mg) once daily with breakfast or the first main meal; adjust by 1 tablet increments every 1–2 weeks according to glycaemic response (usual maintenance 2 tablets daily with meals).',
    contraindications:
      'Type 1 diabetes mellitus, diabetic ketoacidosis, lactic acidosis, severe renal impairment (eGFR <30 mL/min/1.73 m²), hepatic insufficiency, porphyria, pregnancy, lactation, concomitant bosentan therapy, and hypersensitivity to sulfonylureas or sulfonamides.',
    sideEffects:
      'Hypoglycaemia, nausea, diarrhoea, epigastric fullness, abdominal pain, weight gain, taste disturbance, and pruritus or rash.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Glucovance (metformin / glibenclamide) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/diabetes/products/glucovance/pharmacology.html',
  },
  {
    brandName: 'Glucovance 500 mg/5 mg',
    brandNameAr: 'غلوكوفانس 500 ملغم/5 ملغم',
    genericName: 'Metformin + Glibenclamide',
    drugClassNameEn: 'Biguanide and Sulfonylurea Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg / 5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults requiring higher sulfonylurea strength when monotherapy with metformin or glibenclamide is insufficient, or as substitution for concurrent metformin and glibenclamide.',
    adultDosage:
      '1 to 2 tablets daily (up to maximum 2000 mg metformin / 20 mg glibenclamide daily) administered in divided doses at the beginning of carbohydrate-containing meals to minimize hypoglycaemia.',
    contraindications:
      'Type 1 diabetes mellitus, diabetic ketoacidosis, lactic acidosis, severe renal failure (eGFR <30 mL/min/1.73 m²), hepatic insufficiency, porphyria, pregnancy, lactation, and concomitant bosentan.',
    sideEffects:
      'Hypoglycaemia, gastrointestinal disturbances (nausea, diarrhoea, abdominal pain), weight gain, dysgeusia, and very rarely lactic acidosis.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Merck KGaA — Glucovance (metformin / glibenclamide) Official Product Information',
    sourceUrl: 'https://hcp.merckgroup.com/ae-en/cmc/diabetes/products/glucovance/pharmacology.html',
  },
  {
    brandName: 'Euthyrox 25 mcg',
    brandNameAr: 'إيوثيروكس 25 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '25 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Replacement therapy in primary, secondary (pituitary), and tertiary (hypothalamic) hypothyroidism of any aetiology; treatment of benign euthyroid goitre; prophylaxis of relapse after surgery for euthyroid goitre; and suppression therapy in malignant thyroid tumours.',
    adultDosage:
      'Initial low-dose titration (especially in elderly patients, patients with coronary artery disease, or severe/long-standing hypothyroidism): 12.5–25 mcg once daily in the morning on an empty stomach, 30 to 60 minutes before breakfast with water; increase by 12.5–25 mcg every 2–4 weeks guided by serum TSH.',
    contraindications:
      'Untreated adrenal cortical insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'Dose-related signs of hyperthyroidism if over-replaced: tachycardia, palpitations, cardiac arrhythmias, tremor, insomnia, restlessness, headache, flushing, hyperhidrosis, diarrhoea, and weight loss.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },
  {
    brandName: 'Euthyrox 50 mcg',
    brandNameAr: 'إيوثيروكس 50 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '50 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Replacement therapy in hypothyroidism, treatment of benign euthyroid goitre and prophylaxis of goitre recurrence after surgery, concomitant supplementation during anti-thyroid drug treatment of hyperthyroidism, and suppression therapy in differentiated thyroid cancer.',
    adultDosage:
      'Hypothyroidism initial adult dose: 25–50 mcg once daily in the morning on an empty stomach (30–60 minutes before breakfast), adjusted by 25–50 mcg at 2–4 week intervals based on serum TSH and free T4.',
    contraindications:
      'Untreated adrenal insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'When dose tolerance is exceeded: palpitations, tachycardia, tremor, nervousness, insomnia, headache, heat intolerance, sweating, and weight loss.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },
  {
    brandName: 'Euthyrox 75 mcg',
    brandNameAr: 'إيوثيروكس 75 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '75 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Replacement therapy in hypothyroidism, treatment and post-surgical relapse prophylaxis of benign euthyroid goitre (75–200 mcg/day), and concomitant supplementation during anti-thyroid treatment of hyperthyroidism.',
    adultDosage:
      'Administer 75 mcg once daily in the morning on an empty stomach 30–60 minutes before breakfast; separate by at least 4 hours from calcium, iron, bile acid sequestrants, or proton pump inhibitors.',
    contraindications:
      'Untreated adrenal insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'Symptoms of iatrogenic thyrotoxicosis with excessive dosing: tachycardia, arrhythmia, angina, tremor, anxiety, insomnia, diarrhoea, and decreased bone mineral density with chronic over-suppression.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },
  {
    brandName: 'Euthyrox 100 mcg',
    brandNameAr: 'إيوثيروكس 100 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '100 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Maintenance replacement therapy in adult hypothyroidism (100–200 mcg/day), treatment and relapse prophylaxis of benign euthyroid goitre (75–200 mcg/day), and TSH suppression therapy in thyroid carcinoma.',
    adultDosage:
      'Usual adult maintenance dose: 100–200 mcg (approximately 1.6 mcg/kg/day) taken as a single daily dose in the morning on an empty stomach 30–60 minutes before breakfast.',
    contraindications:
      'Untreated adrenal insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'Dose-related hyperthyroid symptoms if over-replaced: palpitations, tachycardia, atrial fibrillation, tremor, nervousness, insomnia, sweating, and weight loss.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },
  {
    brandName: 'Euthyrox 125 mcg',
    brandNameAr: 'إيوثيروكس 125 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '125 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Full replacement therapy in adult hypothyroidism, benign euthyroid goitre, and TSH suppression therapy following thyroidectomy for differentiated thyroid cancer.',
    adultDosage:
      '125 mcg once daily in the morning on an empty stomach 30–60 minutes before breakfast, individualized according to serum TSH and free T4 monitoring every 4–6 weeks during titration and every 6–12 months once stable.',
    contraindications:
      'Untreated adrenal insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'If dose exceeds individual requirement: tachycardia, palpitations, tremor, insomnia, heat intolerance, hyperhidrosis, and reduced bone mineral density.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },
  {
    brandName: 'Euthyrox 150 mcg',
    brandNameAr: 'إيوثيروكس 150 ميكروغرام',
    genericName: 'Levothyroxine',
    drugClassNameEn: 'Thyroid Hormones (Synthetic Thyroxine T4)',
    dosageForm: 'Tablet',
    strength: '150 mcg',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Full replacement therapy in adult hypothyroidism, suppression therapy in malignant thyroid tumours (150–300 mcg/day), and thyroid suppression diagnostic testing.',
    adultDosage:
      '150 mcg once daily in the morning on an empty stomach 30–60 minutes before breakfast, titrated to target serum TSH.',
    contraindications:
      'Untreated adrenal insufficiency, untreated pituitary insufficiency, untreated thyrotoxicosis, acute myocardial infarction, acute myocarditis, and acute pancarditis.',
    sideEffects:
      'Signs of excessive thyroid hormone activity: tachycardia, cardiac arrhythmias, angina pectoris, tremor, agitation, insomnia, diarrhoea, and bone mineral loss with prolonged over-suppression.',
    storageConditions: 'Store below 25°C in the original blister to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'FDA Prescribing Information — Euthyrox (levothyroxine) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021292s004%2C021292s005%2C021292s006lbl.pdf',
  },

  // =========================================================================
  // 3. FERTILITY & GROWTH HORMONE — GONAL-F, PERGOVERIS, CETROTIDE, OVITRELLE, SAIZEN (16 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Gonal-f 75 IU',
    brandNameAr: 'غونال-إف 75 وحدة دولية',
    genericName: 'Follitropin Alfa',
    drugClassNameEn: 'Recombinant Human Follicle-Stimulating Hormones (r-hFSH)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '75 IU (5.5 mcg)',
    route: 'Subcutaneous',
    packSize: '1 vial + 1 pre-filled syringe of solvent (1 mL)',
    indications:
      'Anovulation (including polycystic ovarian syndrome) in women unresponsive to clomifene citrate; controlled ovarian hyperstimulation for multiple follicular development in assisted reproductive technologies (IVF, ICSI, GIFT, ZIFT); stimulation of follicular development in women with severe LH and FSH deficiency (in association with lutropin alfa); and stimulation of spermatogenesis in men with congenital or acquired hypogonadotrophic hypogonadism with concomitant hCG.',
    adultDosage:
      'Anovulation: typically initiated at 75–150 IU SC daily, adjusted by 37.5 or 75 IU at 7- or 14-day intervals. Controlled ovarian hyperstimulation for ART: commonly 150–225 IU SC daily starting on days 2 or 3 of the cycle, adjusted to follicular response (usually not exceeding 450 IU daily).',
    contraindications:
      'Hypersensitivity to follitropin alfa or FSH, tumours of the hypothalamus or pituitary gland, ovarian enlargement or ovarian cyst not due to polycystic ovarian disease, gynaecological haemorrhages of unknown aetiology, and ovarian, uterine, or mammary carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild to moderate ovarian hyperstimulation syndrome (OHSS), abdominal pain, abdominal distension, nausea, and injection-site reactions.',
    storageConditions: 'Store below 25°C in the original package in order to protect from light. Do not freeze. Administer immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'EMA EPAR — Gonal-f (follitropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gonal-f',
  },
  {
    brandName: 'Gonal-f 300 IU/0.5 mL',
    brandNameAr: 'غونال-إف 300 وحدة دولية/0.5 مل',
    genericName: 'Follitropin Alfa',
    drugClassNameEn: 'Recombinant Human Follicle-Stimulating Hormones (r-hFSH)',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '300 IU / 0.5 mL (22 mcg / 0.5 mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (0.5 mL) + 8 needles',
    indications:
      'Anovulation in women unresponsive to clomifene citrate, controlled ovarian hyperstimulation in assisted reproductive technology (ART) programmes, severe LH and FSH deficiency (with lutropin alfa), and hypogonadotrophic hypogonadism in men (with hCG).',
    adultDosage:
      'Individualized subcutaneous dosing via pre-filled pen: Anovulation 75–150 IU daily; ART superovulation 150–225 IU daily starting day 2–3 of cycle, monitored by serum estradiol and ultrasound.',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian enlargement or cysts, unexplained gynaecological bleeding, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, pelvic/abdominal pain, nausea, and local injection-site reactions.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) before opening. Do not freeze. Once opened, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'EMA EPAR — Gonal-f (follitropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gonal-f',
  },
  {
    brandName: 'Gonal-f 450 IU/0.75 mL',
    brandNameAr: 'غونال-إف 450 وحدة دولية/0.75 مل',
    genericName: 'Follitropin Alfa',
    drugClassNameEn: 'Recombinant Human Follicle-Stimulating Hormones (r-hFSH)',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '450 IU / 0.75 mL (33 mcg / 0.75 mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (0.75 mL) + 12 needles',
    indications:
      'Controlled ovarian hyperstimulation in ART programmes (IVF/ICSI), anovulation (including PCOS), severe LH/FSH deficiency, and male hypogonadotrophic hypogonadism.',
    adultDosage:
      'Administer subcutaneously via pre-filled pen according to individualized ovarian stimulation protocol (typically 150–225 IU daily for ART; Male hypogonadotrophic hypogonadism: 150 IU three times a week with hCG for at least 4 months).',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian cysts, unexplained gynaecological haemorrhage, and hormone-dependent reproductive tract or breast malignancies.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, abdominal discomfort, nausea, and injection-site bruising or erythema.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) before opening. Once opened, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'EMA EPAR — Gonal-f (follitropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gonal-f',
  },
  {
    brandName: 'Gonal-f 900 IU/1.5 mL',
    brandNameAr: 'غونال-إف 900 وحدة دولية/1.5 مل',
    genericName: 'Follitropin Alfa',
    drugClassNameEn: 'Recombinant Human Follicle-Stimulating Hormones (r-hFSH)',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '900 IU / 1.5 mL (66 mcg / 1.5 mL)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.5 mL) + 20 needles',
    indications:
      'Controlled ovarian hyperstimulation in assisted reproductive technologies (IVF/ICSI), anovulation, severe LH/FSH deficiency, and male hypogonadotrophic hypogonadism.',
    adultDosage:
      'Subcutaneous administration via multi-dose pre-filled pen: ART 150–225 IU daily starting day 2–3 of cycle until adequate follicular development is achieved (maximum 450 IU/day).',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian cysts, unexplained gynaecological bleeding, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, pelvic pain, nausea, and injection-site reactions.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) before opening. Once opened, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'EMA EPAR — Gonal-f (follitropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gonal-f',
  },
  {
    brandName: 'Pergoveris 150 IU/75 IU',
    brandNameAr: 'بيرغوفيريس 150 وحدة دولية/75 وحدة دولية',
    genericName: 'Follitropin Alfa + Lutropin Alfa',
    drugClassNameEn: 'Recombinant Human FSH and LH Combinations',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '150 IU / 75 IU',
    route: 'Subcutaneous',
    packSize: '1 vial powder + 1 vial solvent (1 mL)',
    indications:
      'Stimulation of follicular development in adult women with severe luteinising hormone (LH) and follicle-stimulating hormone (FSH) deficiency.',
    adultDosage:
      '1 vial (150 IU r-hFSH / 75 IU r-hLH) administered subcutaneously once daily; tailor treatment to the individual patient response as assessed by ultrasound follicle size and oestrogen response.',
    contraindications:
      'Hypersensitivity to gonadotropins, tumours of the hypothalamus and pituitary gland, ovarian enlargement or ovarian cyst unrelated to polycystic ovarian disease, gynaecological haemorrhages of unknown origin, and ovarian, uterine, or mammary carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild to moderate OHSS, pelvic and abdominal pain, abdominal distension, nausea, and injection-site reactions.',
    storageConditions: 'Store below 25°C in the original package to protect from light. For immediate single use after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Pergoveris (follitropin alfa / lutropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pergoveris',
  },
  {
    brandName: 'Pergoveris 300 IU/150 IU',
    brandNameAr: 'بيرغوفيريس 300 وحدة دولية/150 وحدة دولية',
    genericName: 'Follitropin Alfa + Lutropin Alfa',
    drugClassNameEn: 'Recombinant Human FSH and LH Combinations',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '300 IU / 150 IU per 0.48 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (0.48 mL) + 5 needles',
    indications:
      'Stimulation of follicular development in adult women with severe LH and FSH deficiency.',
    adultDosage:
      'Recommended starting dose is 150 IU r-hFSH / 75 IU r-hLH subcutaneously once daily via the pre-filled pen, adjusted according to follicular growth and serum oestrogen.',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian enlargement or cyst, unexplained gynaecological haemorrhage, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, abdominal pain, nausea, and injection-site reactions.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze. After first opening, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Pergoveris (follitropin alfa / lutropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pergoveris',
  },
  {
    brandName: 'Pergoveris 450 IU/225 IU',
    brandNameAr: 'بيرغوفيريس 450 وحدة دولية/225 وحدة دولية',
    genericName: 'Follitropin Alfa + Lutropin Alfa',
    drugClassNameEn: 'Recombinant Human FSH and LH Combinations',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '450 IU / 225 IU per 0.72 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (0.72 mL) + 7 needles',
    indications:
      'Stimulation of follicular development in adult women with severe LH and FSH deficiency.',
    adultDosage:
      'Administer subcutaneously once daily starting at 150 IU r-hFSH / 75 IU r-hLH, adjusted at 7- to 14-day intervals by 37.5–75 IU follitropin alfa according to ovarian response.',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian enlargement or cyst, unexplained gynaecological haemorrhage, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, pelvic pain, abdominal distension, and injection-site reactions.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze. After first opening, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Pergoveris (follitropin alfa / lutropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pergoveris',
  },
  {
    brandName: 'Pergoveris 900 IU/450 IU',
    brandNameAr: 'بيرغوفيريس 900 وحدة دولية/450 وحدة دولية',
    genericName: 'Follitropin Alfa + Lutropin Alfa',
    drugClassNameEn: 'Recombinant Human FSH and LH Combinations',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '900 IU / 450 IU per 1.44 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1.44 mL) + 14 needles',
    indications:
      'Stimulation of follicular development in adult women with severe LH and FSH deficiency.',
    adultDosage:
      'Subcutaneous injection once daily via multi-dose pre-filled pen, starting at 150 IU r-hFSH / 75 IU r-hLH and individualized to ovarian follicular response.',
    contraindications:
      'Hypothalamic or pituitary tumours, non-PCOS ovarian enlargement or cyst, unexplained gynaecological haemorrhage, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, ovarian cysts, mild-to-moderate OHSS, abdominal pain, nausea, and local injection-site reactions.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze. After first opening, may be stored for up to 28 days at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Pergoveris (follitropin alfa / lutropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pergoveris',
  },
  {
    brandName: 'Luveris 75 IU',
    brandNameAr: 'لوفيريس 75 وحدة دولية',
    genericName: 'Lutropin Alfa',
    drugClassNameEn: 'Recombinant Human Luteinising Hormones (r-hLH)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '75 IU (3.4 mcg)',
    route: 'Subcutaneous',
    packSize: '1 vial powder + 1 vial solvent (1 mL)',
    indications:
      'In association with a follicle-stimulating hormone (FSH) preparation for the stimulation of follicular development in adult women with severe luteinising hormone (LH) and FSH deficiency.',
    adultDosage:
      '75 IU lutropin alfa daily concomitantly with 75–150 IU FSH by subcutaneous injection, individualized to follicular development and oestrogen response.',
    contraindications:
      'Hypersensitivity to gonadotropins, tumours of the hypothalamus and pituitary gland, ovarian enlargement or ovarian cyst not due to polycystic ovarian disease, gynaecological haemorrhages of unknown origin, and ovarian, uterine, or breast carcinoma.',
    sideEffects:
      'Headache, nausea, vomiting, diarrhoea, abdominal and pelvic pain, ovarian cyst, mild-to-moderate OHSS, and injection-site reactions.',
    storageConditions: 'Store below 25°C in the original package to protect from light. Administer immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Luveris (lutropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/luveris',
  },
  {
    brandName: 'Cetrotide 0.25 mg',
    brandNameAr: 'سيتروتايد 0.25 ملغم',
    genericName: 'Cetrorelix',
    drugClassNameEn: 'Gonadotropin-Releasing Hormone (GnRH) Antagonists',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '0.25 mg',
    route: 'Subcutaneous',
    packSize: '1 vial powder + 1 pre-filled syringe solvent (1 mL)',
    indications:
      'Prevention of premature ovulation in patients undergoing a controlled ovarian stimulation, followed by oocyte pick-up and assisted reproductive techniques.',
    adultDosage:
      '0.25 mg injected subcutaneously into the lower abdominal wall once daily (either every morning or every evening), initiated on day 5 or day 6 of ovarian stimulation with gonadotropins and continued throughout the gonadotropin treatment period including the day of ovulation induction (or the evening before).',
    contraindications:
      'Hypersensitivity to cetrorelix, extrinsic peptide hormones, or mannitol; pregnancy and lactation; and severe renal or hepatic impairment.',
    sideEffects:
      'Local injection-site reactions (erythema, swelling, pruritus), mild to moderate ovarian hyperstimulation syndrome (OHSS), nausea, and headache.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze. Unopened product may be kept at or below 30°C for up to 3 months.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Cetrotide (cetrorelix) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cetrotide',
  },
  {
    brandName: 'Ovitrelle 250 mcg/0.5 mL',
    brandNameAr: 'أوفيتريل 250 ميكروغرام/0.5 مل',
    genericName: 'Choriogonadotropin Alfa',
    drugClassNameEn: 'Recombinant Human Chorionic Gonadotropins (r-hCG)',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '250 mcg / 0.5 mL (equivalent to ~6500 IU)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (0.5 mL) + 1 needle',
    indications:
      'Treatment of adult women undergoing superovulation prior to assisted reproductive techniques such as in vitro fertilisation (IVF) to trigger final follicular maturation and luteinisation after stimulation of follicular growth; and treatment of anovulatory or oligo-ovulatory women to trigger ovulation and luteinisation after stimulation of follicular growth.',
    adultDosage:
      'One pre-filled pen (250 mcg in 0.5 mL) administered as a single subcutaneous injection 24 to 48 hours after the last administration of an FSH or hMG preparation, when optimal stimulation of follicular growth is achieved.',
    contraindications:
      'Tumours of the hypothalamus and pituitary gland, ovarian enlargement or cyst of unknown aetiology, gynaecological haemorrhages of unknown aetiology, ovarian, uterine, or mammary carcinoma, active thromboembolic disorders, and conditions where an effective response cannot be obtained (primary ovarian failure).',
    sideEffects:
      'Injection-site reactions, headache, abdominal pain, nausea, vomiting, and mild to moderate ovarian hyperstimulation syndrome (OHSS).',
    storageConditions: 'Store in a refrigerator (2°C–8°C) in the original package. May be stored at or below 25°C for a single period of up to 30 days.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Ovitrelle (choriogonadotropin alfa) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ovitrelle',
  },
  {
    brandName: 'Crinone 8%',
    brandNameAr: 'كرينون 8%',
    genericName: 'Progesterone',
    drugClassNameEn: 'Progestogens',
    dosageForm: 'Vaginal gel',
    strength: '8% w/w (90 mg per 1.125 g application)',
    route: 'Vaginal',
    packSize: '15 single-use vaginal applicators',
    indications:
      'Progesterone supplementation of the luteal phase in adults as part of an Assisted Reproductive Technology (ART) procedure.',
    adultDosage:
      'From the day of embryo transfer, insert 1.125 g of Crinone 8% vaginal gel (90 mg progesterone) vaginally once daily; once laboratory evidence confirms pregnancy, continue therapy for a total duration of 30 days (or up to 10–12 weeks according to clinical protocol).',
    contraindications:
      'Hypersensitivity to progesterone or any excipient, undiagnosed vaginal bleeding, known or suspected malignancy of the breast or genital organs, porphyria, thrombophlebitis, thromboembolic disorder, cerebral apoplexy, and missed abortion.',
    sideEffects:
      'Somnolence, headache, breast tenderness, vaginal spotting or intermenstrual bleeding, vaginal irritation, and harmless white/clumped vaginal gel discharge.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'UK EMC — Crinone 8% w/w (progesterone) Vaginal Gel Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1283.pdf',
  },
  {
    brandName: 'Saizen 6 mg',
    brandNameAr: 'سايزن 6 ملغم',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in cartridge',
    strength: '6 mg / 1.03 mL (5.83 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 cartridge (1.03 mL)',
    indications:
      'Growth failure in children caused by decreased or absent secretion of endogenous growth hormone (GH deficiency), growth failure in girls with gonadal dysgenesis (Turner syndrome) confirmed by chromosomal analysis, growth failure in prepubertal children due to chronic renal failure, growth disturbance in short children born small for gestational age (SGA), and replacement therapy in adults with pronounced growth hormone deficiency.',
    adultDosage:
      'Paediatric GH deficiency: 0.7–1.0 mg/m² body surface area per day (or 0.025–0.035 mg/kg/day) SC in the evening. Adult GH deficiency: start at 0.15–0.3 mg SC daily, titrated monthly by clinical response and serum IGF-1.',
    contraindications:
      'Closed epiphyses (when used for growth promotion in children), any evidence of activity of a tumour or active malignancy, acute critical illness (complications following open heart surgery, abdominal surgery, multiple accidental trauma, or acute respiratory failure), and proliferative or preproliferative diabetic retinopathy.',
    sideEffects:
      'Injection-site reactions, peripheral oedema, arthralgia, myalgia, carpal tunnel syndrome (in adults), headache, hypothyroidism, and insulin resistance/hyperglycaemia.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) in the original package to protect from light. Do not freeze. After first injection, store at 2°C–8°C for up to 28 days.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'EMA Referral — Saizen (somatropin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/saizen',
  },
  {
    brandName: 'Saizen 12 mg',
    brandNameAr: 'سايزن 12 ملغم',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in cartridge',
    strength: '12 mg / 1.5 mL (8 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 cartridge (1.5 mL)',
    indications:
      'Growth failure in children due to growth hormone deficiency, Turner syndrome, chronic renal failure, or short stature born small for gestational age (SGA), and replacement therapy in adult growth hormone deficiency.',
    adultDosage:
      'Subcutaneous administration in the evening individualized by body weight or surface area in children (0.025–0.050 mg/kg/day depending on indication) and by IGF-1 titration in adults (starting 0.15–0.3 mg/day).',
    contraindications:
      'Closed epiphyses (for paediatric growth promotion), active neoplasia, acute critical illness following major surgery or trauma, and proliferative diabetic retinopathy.',
    sideEffects:
      'Peripheral fluid retention, arthralgia, myalgia, paraesthesia, headache, injection-site lipoatrophy (rotate sites), and benign intracranial hypertension (rare).',
    storageConditions: 'Store in a refrigerator (2°C–8°C) protected from light. Do not freeze. Use within 28 days after first opening.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'EMA Referral — Saizen (somatropin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/saizen',
  },
  {
    brandName: 'Saizen 20 mg',
    brandNameAr: 'سايزن 20 ملغم',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones (r-hGH)',
    dosageForm: 'Solution for injection in cartridge',
    strength: '20 mg / 2.5 mL (8 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 cartridge (2.5 mL)',
    indications:
      'Growth failure in paediatric GH deficiency, Turner syndrome, chronic renal failure, short children born SGA, and replacement therapy in adult GH deficiency.',
    adultDosage:
      'Administer subcutaneously in the evening using an approved Saizen injection device, rotating injection sites daily; dose individualized by BSA/weight in paediatric patients and serum IGF-1 in adults.',
    contraindications:
      'Closed epiphyses (for paediatric growth promotion), active malignancy, acute critical illness, and proliferative or preproliferative diabetic retinopathy.',
    sideEffects:
      'Oedema, arthralgia, myalgia, headache, injection-site reactions, mild hyperglycaemia, and unmasking of central hypothyroidism.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) protected from light. Do not freeze. Use within 28 days after first opening.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'EMA Referral — Saizen (somatropin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/saizen',
  },

  // =========================================================================
  // 4. NEUROLOGY & ONCOLOGY — REBIF, MAVENCLAD, ERBITUX, BAVENCIO, TEPMETKO (7 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Rebif 22 mcg/0.5 mL',
    brandNameAr: 'ريبيف 22 ميكروغرام/0.5 مل',
    genericName: 'Interferon Beta-1a',
    drugClassNameEn: 'Disease-Modifying Interferons for Multiple Sclerosis',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '22 mcg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '12 pre-filled syringes (0.5 mL)',
    indications:
      'Treatment of patients with multiple sclerosis (MS) who have had two or more acute relapses in the previous two years (relapsing multiple sclerosis), and patients with a single demyelinating event with an active inflammatory process at high risk of developing clinically definite multiple sclerosis.',
    adultDosage:
      '22 mcg or 44 mcg injected subcutaneously three times per week (preferably on the same three days, at least 48 hours apart, in the late afternoon or evening) after a 4-week initial dose titration.',
    contraindications:
      'Hypersensitivity to natural or recombinant interferon beta, and current severe depression and/or suicidal ideation.',
    sideEffects:
      'Flu-like symptoms (fever, chills, myalgia, headache, fatigue), injection-site reactions (inflammation, erythema, pain), hepatic transaminase elevations, leukopenia, lymphopenia, and thyroid dysfunction.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) away from the cooling element. Do not freeze. Protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Rebif (interferon beta-1a) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rebif',
  },
  {
    brandName: 'Rebif 44 mcg/0.5 mL',
    brandNameAr: 'ريبيف 44 ميكروغرام/0.5 مل',
    genericName: 'Interferon Beta-1a',
    drugClassNameEn: 'Disease-Modifying Interferons for Multiple Sclerosis',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '44 mcg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '12 pre-filled syringes (0.5 mL)',
    indications:
      'Treatment of relapsing multiple sclerosis (RMS) in adults and adolescents to reduce the frequency and severity of clinical relapses and slow progression of physical disability.',
    adultDosage:
      'Recommended maintenance dose: 44 mcg given three times per week by subcutaneous injection (at least 48 hours apart) following a 4-week titration schedule (8.8 mcg three times weekly in weeks 1–2, 22 mcg three times weekly in weeks 3–4).',
    contraindications:
      'Hypersensitivity to natural or recombinant interferon beta, and current severe depression and/or suicidal ideation.',
    sideEffects:
      'Flu-like syndrome, injection-site erythema/induration, elevated hepatic transaminases, neutropenia, lymphopenia, depression, and thyroid disorders.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze. May be stored at up to 25°C for a single period of up to 14 days.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Rebif (interferon beta-1a) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rebif',
  },
  {
    brandName: 'Mavenclad 10 mg',
    brandNameAr: 'مافينكلاد 10 ملغم',
    genericName: 'Cladribine',
    drugClassNameEn: 'Nucleoside Metabolic Inhibitors (Selective Immune Reconstitution Therapy)',
    dosageForm: 'Tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: 'Dose pack (1, 4, or 6 tablets)',
    indications:
      'Treatment of adult patients with highly active relapsing multiple sclerosis (MS) as defined by clinical or imaging features.',
    adultDosage:
      'Cumulative dose of 3.5 mg/kg body weight over 2 years, administered as 1 treatment course of 1.75 mg/kg per year; each yearly course consists of 2 treatment weeks (one at the beginning of month 1 and one at the beginning of month 2 of the respective treatment year), taking 10 mg or 20 mg daily for 4 or 5 days based on body weight. No further cladribine treatment is required in years 3 and 4.',
    contraindications:
      'Infection with HIV, active chronic infection (tuberculosis or hepatitis), initiation in immunocompromised patients, active malignancy, moderate or severe renal impairment (CrCl <60 mL/min), and pregnancy and breast-feeding.',
    sideEffects:
      'Lymphopenia (expected pharmacological effect), oral herpes, dermatomal herpes zoster, rash, alopecia, decreased neutrophil count, and rare serious liver injury.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Mavenclad (cladribine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mavenclad',
  },
  {
    brandName: 'Erbitux 100 mg/20 mL',
    brandNameAr: 'إربيتوكس 100 ملغم/20 مل',
    genericName: 'Cetuximab',
    drugClassNameEn: 'Anti-EGFR Monoclonal Antibodies',
    dosageForm: 'Solution for infusion',
    strength: '100 mg / 20 mL (5 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial (20 mL)',
    indications:
      'Treatment of patients with EGFR-expressing, RAS wild-type metastatic colorectal cancer (mCRC) in combination with irinotecan-based chemotherapy, in first-line in combination with FOLFOX, or as a single agent after oxaliplatin- and irinotecan-based failure; and treatment of squamous cell cancer of the head and neck (SCCHN) in combination with radiation therapy for locally advanced disease or with platinum-based chemotherapy for recurrent/metastatic disease.',
    adultDosage:
      'Weekly regimen: initial dose 400 mg/m² IV over 120 minutes, followed by subsequent weekly doses of 250 mg/m² IV over 60 minutes (or 500 mg/m² every 2 weeks in mCRC). Premedicate with an antihistamine and a corticosteroid 1 hour prior to infusion.',
    contraindications:
      'Known severe (grade 3 or 4) hypersensitivity reactions to cetuximab, and combination with oxaliplatin-containing chemotherapy in patients with mutant RAS mCRC or unknown RAS mCRC status.',
    sideEffects:
      'Acne-like skin rash (>80%), hypomagnesaemia, mild-to-severe infusion-related reactions, mucositis, diarrhoea, paronychia, fatigue, and conjunctivitis.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Erbitux (cetuximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/erbitux',
  },
  {
    brandName: 'Erbitux 500 mg/100 mL',
    brandNameAr: 'إربيتوكس 500 ملغم/100 مل',
    genericName: 'Cetuximab',
    drugClassNameEn: 'Anti-EGFR Monoclonal Antibodies',
    dosageForm: 'Solution for infusion',
    strength: '500 mg / 100 mL (5 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial (100 mL)',
    indications:
      'Treatment of EGFR-expressing, RAS wild-type metastatic colorectal cancer (mCRC) and squamous cell cancer of the head and neck (SCCHN).',
    adultDosage:
      'Weekly regimen: 400 mg/m² initial IV dose followed by 250 mg/m² weekly; or biweekly regimen in mCRC: 500 mg/m² IV every 2 weeks. Administer with antihistamine and corticosteroid premedication.',
    contraindications:
      'Known severe (grade 3 or 4) hypersensitivity reactions to cetuximab, and combination with oxaliplatin-containing chemotherapy in mutant RAS or unknown RAS status mCRC.',
    sideEffects:
      'Acneiform rash, xerosis, paronychia, hypomagnesaemia, hypocalcaemia, hypokalaemia, infusion-related reactions, diarrhoea, nausea, and mucositis.',
    storageConditions: 'Store in a refrigerator (2°C–8°C). Do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Erbitux (cetuximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/erbitux',
  },
  {
    brandName: 'Bavencio 200 mg/10 mL',
    brandNameAr: 'بافينسيو 200 ملغم/10 مل',
    genericName: 'Avelumab',
    drugClassNameEn: 'PD-L1 Blocking Monoclonal Antibodies (Immune Checkpoint Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '200 mg / 10 mL (20 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial (10 mL)',
    indications:
      'Monotherapy for the first-line maintenance treatment of adult patients with locally advanced or metastatic urothelial carcinoma (UC) who are progression-free following platinum-based chemotherapy; monotherapy for adult patients with metastatic Merkel cell carcinoma (MCC); and in combination with axitinib for the first-line treatment of adult patients with advanced renal cell carcinoma (RCC).',
    adultDosage:
      '800 mg administered intravenously over 60 minutes every 2 weeks. Premedicate with an antihistamine and paracetamol prior to the first 4 infusions.',
    contraindications:
      'Hypersensitivity to avelumab or any of the excipients.',
    sideEffects:
      'Fatigue, nausea, diarrhoea, decreased appetite, constipation, infusion-related reactions, anaemia, hypothyroidism, and immune-mediated adverse reactions (pneumonitis, hepatitis, colitis, endocrinopathies, nephritis).',
    storageConditions: 'Store in a refrigerator (2°C–8°C) in the original package to protect from light. Do not freeze.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR — Bavencio (avelumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/bavencio',
  },
  {
    brandName: 'Tepmetko 225 mg',
    brandNameAr: 'تيبميتكو 225 ملغم',
    genericName: 'Tepotinib',
    drugClassNameEn: 'MET Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '225 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Monotherapy for the treatment of adult patients with advanced non-small cell lung cancer (NSCLC) harbouring mesenchymal-epithelial transition factor gene exon 14 (METex14) skipping alterations, who require systemic therapy following prior treatment with immunotherapy and/or platinum-based chemotherapy.',
    adultDosage:
      '450 mg (two 225 mg tablets) taken orally once daily with food until disease progression or unacceptable toxicity (dose reduction for adverse events: 225 mg once daily).',
    contraindications:
      'Hypersensitivity to tepotinib or any of the excipients.',
    sideEffects:
      'Peripheral oedema, hypoalbuminaemia, nausea, diarrhoea, increased blood creatinine, elevated ALT/AST, pleural effusion, and interstitial lung disease / pneumonitis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Tepmetko (tepotinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tepmetko',
  },
];

export const MERCK_KGAA_PRODUCTS: AiProductDraft[] = MERCK_KGAA_COMPACT_PRODUCTS.map(toMerckKgaaProductDraft);
import type { AiDraftSource, AiProductDraft } from './catalog';

const BI_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactBoehringerDrug {
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

function toBoehringerProductDraft(item: CompactBoehringerDrug): AiProductDraft {
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
    sources: BI_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Boehringer Ingelheim International GmbH regulatory monograph (EMA EPAR / SmPC / UK EMC); saved as draft pending verification.',
  };
}

const BOEHRINGER_COMPACT_PRODUCTS: CompactBoehringerDrug[] = [
  // =========================================================================
  // 1. DIABETES, HEART FAILURE & CKD — JARDIANCE, SYNJARDY, GLYXAMBI, TRAJENTA, JENTADUETO (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Jardiance 10 mg',
    brandNameAr: 'جارديانس 10 ملغم',
    genericName: 'Empagliflozin',
    drugClassNameEn: 'Sodium-Glucose Co-Transporter 2 (SGLT2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of insufficiently controlled type 2 diabetes mellitus in adults and children aged 10 years and above as an adjunct to diet and exercise (as monotherapy when metformin is inappropriate, or in addition to other diabetes medicines); treatment of adults with symptomatic chronic heart failure (across the spectrum of ejection fraction); and treatment of adults with chronic kidney disease.',
    adultDosage:
      'Type 2 diabetes mellitus: starting dose 10 mg once daily (may be increased to 25 mg once daily if eGFR ≥60 mL/min/1.73 m² and additional glycaemic control is needed). Chronic heart failure and chronic kidney disease: 10 mg once daily with or without food.',
    contraindications:
      'Hypersensitivity to empagliflozin or any of the excipients.',
    sideEffects:
      'Vaginal moniliasis, vulvovaginitis, balanitis and other genital infections, urinary tract infection, volume depletion, thirst, pruritus, hypoglycaemia (when combined with a sulfonylurea or insulin), and rare diabetic ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Cardiology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Jardiance (empagliflozin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jardiance',
  },
  {
    brandName: 'Jardiance 25 mg',
    brandNameAr: 'جارديانس 25 ملغم',
    genericName: 'Empagliflozin',
    drugClassNameEn: 'Sodium-Glucose Co-Transporter 2 (SGLT2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of insufficiently controlled type 2 diabetes mellitus in adults and children aged 10 years and above who tolerate empagliflozin 10 mg once daily, have an eGFR ≥60 mL/min/1.73 m², and require tighter glycaemic control.',
    adultDosage:
      '25 mg taken orally once daily with or without food (reduce to 10 mg once daily if eGFR persistently falls below 60 mL/min/1.73 m²).',
    contraindications:
      'Hypersensitivity to empagliflozin or any of the excipients.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, increased urination, volume depletion, constipation, pruritus, and rare euglycaemic diabetic ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Jardiance (empagliflozin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jardiance',
  },
  {
    brandName: 'Synjardy 5 mg/850 mg',
    brandNameAr: 'سينجاردي 5 ملغم/850 ملغم',
    genericName: 'Empagliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 850 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults and children aged 10 years and above with type 2 diabetes mellitus as an adjunct to diet and exercise: in patients insufficiently controlled on their maximally tolerated dose of metformin alone, in combination with other medicines for the treatment of diabetes, or in patients already being treated with the combination of empagliflozin and metformin as separate tablets.',
    adultDosage:
      'One tablet (5 mg/850 mg) twice daily with meals to reduce gastrointestinal adverse effects associated with metformin.',
    contraindications:
      'Any type of acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), diabetic pre-coma, severe renal failure (eGFR <30 mL/min/1.73 m²), acute conditions with the potential to alter renal function (dehydration, severe infection, shock), tissue hypoxia (decompensated heart failure, respiratory failure, recent myocardial infarction), hepatic insufficiency, and acute alcohol intoxication.',
    sideEffects:
      'Gastrointestinal symptoms (nausea, vomiting, diarrhoea, abdominal pain, loss of appetite), genital mycotic infections, urinary tract infections, taste disturbance, and very rarely lactic acidosis or ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Synjardy (empagliflozin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/synjardy',
  },
  {
    brandName: 'Synjardy 5 mg/1000 mg',
    brandNameAr: 'سينجاردي 5 ملغم/1000 ملغم',
    genericName: 'Empagliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 1000 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults and children aged 10 years and above with type 2 diabetes mellitus insufficiently controlled on metformin alone or already treated with empagliflozin 10 mg/day and metformin 2000 mg/day.',
    adultDosage:
      'One tablet (5 mg/1000 mg) twice daily with meals (providing a total daily dose of 10 mg empagliflozin and 2000 mg metformin).',
    contraindications:
      'Acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), severe renal failure (eGFR <30 mL/min/1.73 m²), dehydration, severe infection, shock, tissue hypoxia, hepatic insufficiency, and alcoholism.',
    sideEffects:
      'Diarrhoea, nausea, abdominal pain, genital mycotic infections, urinary tract infections, dysgeusia, and very rarely lactic acidosis or ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Synjardy (empagliflozin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/synjardy',
  },
  {
    brandName: 'Synjardy 12.5 mg/850 mg',
    brandNameAr: 'سينجاردي 12.5 ملغم/850 ملغم',
    genericName: 'Empagliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '12.5 mg / 850 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults and children aged 10 years and above with type 2 diabetes mellitus requiring 25 mg empagliflozin and 1700 mg metformin daily.',
    adultDosage:
      'One tablet (12.5 mg/850 mg) twice daily with meals (providing 25 mg empagliflozin and 1700 mg metformin daily; requires eGFR ≥60 mL/min/1.73 m²).',
    contraindications:
      'Acute metabolic acidosis, severe renal failure (eGFR <30 mL/min/1.73 m²), acute dehydration or sepsis, tissue hypoxia, and hepatic insufficiency.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, gastrointestinal disturbances, volume depletion, and very rarely lactic acidosis or diabetic ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Synjardy (empagliflozin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/synjardy',
  },
  {
    brandName: 'Synjardy 12.5 mg/1000 mg',
    brandNameAr: 'سينجاردي 12.5 ملغم/1000 ملغم',
    genericName: 'Empagliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '12.5 mg / 1000 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults and children aged 10 years and above with type 2 diabetes mellitus requiring maximum daily doses of empagliflozin (25 mg) and metformin (2000 mg).',
    adultDosage:
      'One tablet (12.5 mg/1000 mg) twice daily with meals (maximum daily dose 25 mg empagliflozin and 2000 mg metformin).',
    contraindications:
      'Acute metabolic acidosis, severe renal failure (eGFR <30 mL/min/1.73 m²), acute dehydration or shock, tissue hypoxia, and hepatic insufficiency.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, diarrhoea, nausea, vomiting, dysgeusia, and very rarely lactic acidosis or diabetic ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Synjardy (empagliflozin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/synjardy',
  },
  {
    brandName: 'Glyxambi 10 mg/5 mg',
    brandNameAr: 'غليكسامبي 10 ملغم/5 ملغم',
    genericName: 'Empagliflozin + Linagliptin',
    drugClassNameEn: 'SGLT2 Inhibitor and DPP-4 Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus to improve glycaemic control when metformin and/or sulfonylurea and one of the monocomponents of Glyxambi do not provide adequate glycaemic control, or when already being treated with the free combination of empagliflozin and linagliptin.',
    adultDosage:
      'Recommended starting dose is 1 film-coated tablet (10 mg empagliflozin / 5 mg linagliptin) once daily with or without food.',
    contraindications:
      'Hypersensitivity to empagliflozin, linagliptin, any other SGLT2 or DPP-4 inhibitor, or any of the excipients.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, nasopharyngitis, cough, increased lipase, constipation, volume depletion, and rare acute pancreatitis or bullous pemphigoid.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'EMA EPAR — Glyxambi (empagliflozin / linagliptin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/glyxambi',
  },
  {
    brandName: 'Glyxambi 25 mg/5 mg',
    brandNameAr: 'غليكسامبي 25 ملغم/5 ملغم',
    genericName: 'Empagliflozin + Linagliptin',
    drugClassNameEn: 'SGLT2 Inhibitor and DPP-4 Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg / 5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus who tolerate Glyxambi 10 mg/5 mg once daily, have an eGFR ≥60 mL/min/1.73 m², and require additional glycaemic control.',
    adultDosage:
      'One film-coated tablet (25 mg empagliflozin / 5 mg linagliptin) once daily with or without food.',
    contraindications:
      'Hypersensitivity to empagliflozin, linagliptin, or any of the excipients.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, nasopharyngitis, cough, increased lipase, thirst, and rare acute pancreatitis or ketoacidosis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Glyxambi (empagliflozin / linagliptin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/glyxambi',
  },
  {
    brandName: 'Trajenta 5 mg',
    brandNameAr: 'تراجينتا 5 ملغم',
    genericName: 'Linagliptin',
    drugClassNameEn: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus as an adjunct to diet and exercise to improve glycaemic control: as monotherapy when metformin is inappropriate due to intolerance or contraindicated due to renal impairment, or in combination with other medicinal products for the treatment of diabetes, including insulin.',
    adultDosage:
      '5 mg taken orally once daily at any time of the day, with or without a meal. No dose adjustment is required for renal or hepatic impairment.',
    contraindications:
      'Hypersensitivity to linagliptin or any of the excipients.',
    sideEffects:
      'Nasopharyngitis, cough, elevated lipase, hypoglycaemia (when combined with a sulfonylurea or insulin), and rare acute pancreatitis or bullous pemphigoid.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Trajenta (linagliptin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trajenta',
  },
  {
    brandName: 'Jentadueto 2.5 mg/850 mg',
    brandNameAr: 'جينتادويتو 2.5 ملغم/850 ملغم',
    genericName: 'Linagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg / 850 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus as an adjunct to diet and exercise in patients inadequately controlled on their maximally tolerated dose of metformin alone, in combination with other diabetes medicinal products (including insulin), or in patients already being treated with the combination of linagliptin and metformin as separate tablets.',
    adultDosage:
      'One tablet (2.5 mg/850 mg) twice daily with meals to reduce gastrointestinal adverse effects associated with metformin.',
    contraindications:
      'Acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis), diabetic pre-coma, severe renal failure (eGFR <30 mL/min/1.73 m²), acute conditions altering renal function, tissue hypoxia, hepatic insufficiency, and acute alcohol intoxication.',
    sideEffects:
      'Diarrhoea, nausea, decreased appetite, nasopharyngitis, cough, increased lipase, and very rarely lactic acidosis or acute pancreatitis.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Jentadueto (linagliptin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jentadueto',
  },
  {
    brandName: 'Jentadueto 2.5 mg/1000 mg',
    brandNameAr: 'جينتادويتو 2.5 ملغم/1000 ملغم',
    genericName: 'Linagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor and Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg / 1000 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Treatment of adults with type 2 diabetes mellitus inadequately controlled on metformin 2000 mg/day alone or already treated with linagliptin 5 mg/day and metformin 2000 mg/day.',
    adultDosage:
      'One tablet (2.5 mg/1000 mg) twice daily with meals (maximum daily dose is 5 mg linagliptin and 2000 mg metformin).',
    contraindications:
      'Acute metabolic acidosis, severe renal failure (eGFR <30 mL/min/1.73 m²), dehydration, severe infection, shock, tissue hypoxia, hepatic insufficiency, and alcoholism.',
    sideEffects:
      'Diarrhoea, nausea, abdominal pain, nasopharyngitis, cough, increased lipase, and very rarely lactic acidosis or acute pancreatitis.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Jentadueto (linagliptin / metformin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jentadueto',
  },

  // =========================================================================
  // 2. CARDIOVASCULAR, ANTICOAGULATION & THROMBOLYSIS — MICARDIS, MICARDISPLUS, TWYNSTA, PRADAXA, PRAXBIND, ACTILYSE, METALYSE (17 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Micardis 40 mg',
    brandNameAr: 'ميكارديس 40 ملغم',
    genericName: 'Telmisartan',
    drugClassNameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    dosageForm: 'Tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults; and cardiovascular prevention (reduction of cardiovascular morbidity in adults with manifest atherothrombotic cardiovascular disease or type 2 diabetes mellitus with documented target organ damage).',
    adultDosage:
      'Hypertension: usually effective dose is 40 mg once daily with or without food; may be increased to a maximum of 80 mg once daily if target blood pressure is not achieved after 4–8 weeks (in mild-to-moderate hepatic impairment, do not exceed 40 mg once daily).',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders, severe hepatic impairment, and concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    sideEffects:
      'Hypotension, dizziness, hyperkalaemia, renal impairment, upper respiratory tract infection, urinary tract infection, and abdominal pain or diarrhoea.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'EMA EPAR — Micardis (telmisartan) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/micardis',
  },
  {
    brandName: 'Micardis 80 mg',
    brandNameAr: 'ميكارديس 80 ملغم',
    genericName: 'Telmisartan',
    drugClassNameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    dosageForm: 'Tablet',
    strength: '80 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults requiring 80 mg once daily, and reduction of cardiovascular morbidity in adults with manifest atherothrombotic cardiovascular disease (history of coronary heart disease, stroke, or peripheral arterial disease) or type 2 diabetes mellitus with documented target organ damage.',
    adultDosage:
      '80 mg taken orally once daily with liquid, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders, severe hepatic impairment, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, orthostatic hypotension, hyperkalaemia, elevated serum creatinine, back pain, and gastrointestinal discomfort.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'EMA EPAR — Micardis (telmisartan) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/micardis',
  },
  {
    brandName: 'MicardisPlus 40 mg/12.5 mg',
    brandNameAr: 'ميكارديس بلس 40 ملغم/12.5 ملغم',
    genericName: 'Telmisartan + Hydrochlorothiazide',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Thiazide Diuretic Combinations',
    dosageForm: 'Tablet',
    strength: '40 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on telmisartan 40 mg alone.',
    adultDosage:
      'One tablet (40 mg/12.5 mg) taken orally once daily with liquid, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, cholestasis and biliary obstructive disorders, severe hepatic impairment, severe renal impairment (CrCl <30 mL/min), refractory hypokalaemia, hypercalcaemia, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, hypokalaemia, hyperuricaemia, hypotension, syncope, dyspnoea, diarrhoea, and photosensitivity.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — MicardisPlus (telmisartan / hydrochlorothiazide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/micardisplus',
  },
  {
    brandName: 'MicardisPlus 80 mg/12.5 mg',
    brandNameAr: 'ميكارديس بلس 80 ملغم/12.5 ملغم',
    genericName: 'Telmisartan + Hydrochlorothiazide',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Thiazide Diuretic Combinations',
    dosageForm: 'Tablet',
    strength: '80 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on telmisartan 80 mg alone.',
    adultDosage:
      'One tablet (80 mg/12.5 mg) taken orally once daily with liquid, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, cholestasis and biliary obstructive disorders, severe hepatic impairment, severe renal impairment (CrCl <30 mL/min), refractory hypokalaemia, hypercalcaemia, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, orthostatic hypotension, hypokalaemia, hyponatraemia, hyperuricaemia, back pain, and gastrointestinal disturbances.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — MicardisPlus (telmisartan / hydrochlorothiazide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/micardisplus',
  },
  {
    brandName: 'MicardisPlus 80 mg/25 mg',
    brandNameAr: 'ميكارديس بلس 80 ملغم/25 ملغم',
    genericName: 'Telmisartan + Hydrochlorothiazide',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Thiazide Diuretic Combinations',
    dosageForm: 'Tablet',
    strength: '80 mg / 25 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled by MicardisPlus 80 mg/12.5 mg or in patients who have been previously stabilised on telmisartan and hydrochlorothiazide given separately.',
    adultDosage:
      'One tablet (80 mg/25 mg) taken orally once daily with liquid, with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, cholestasis and biliary obstructive disorders, severe hepatic impairment, severe renal impairment (CrCl <30 mL/min), refractory hypokalaemia, hypercalcaemia, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, hypokalaemia, hyperuricaemia, orthostatic hypotension, paraesthesia, and muscle spasms.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — MicardisPlus (telmisartan / hydrochlorothiazide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/micardisplus',
  },
  {
    brandName: 'Twynsta 40 mg/5 mg',
    brandNameAr: 'توينستا 40 ملغم/5 ملغم',
    genericName: 'Telmisartan + Amlodipine',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '40 mg / 5 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults as add-on therapy in patients whose blood pressure is not adequately controlled on amlodipine 5 mg alone, or as replacement therapy in adults receiving telmisartan 40 mg and amlodipine 5 mg from separate tablets.',
    adultDosage:
      'One tablet (40 mg/5 mg) taken orally once daily with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders and severe hepatic impairment, shock (including cardiogenic shock), obstruction of the outflow tract of the left ventricle (high-grade aortic stenosis), haemodynamically unstable heart failure after acute myocardial infarction, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, peripheral oedema (significantly lower than with amlodipine monotherapy), somnolence, migraine, headache, palpitations, flushing, and hypotension.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Twynsta (telmisartan / amlodipine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/twynsta',
  },
  {
    brandName: 'Twynsta 40 mg/10 mg',
    brandNameAr: 'توينستا 40 ملغم/10 ملغم',
    genericName: 'Telmisartan + Amlodipine',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '40 mg / 10 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on amlodipine 10 mg alone or as substitution for concurrent telmisartan 40 mg and amlodipine 10 mg.',
    adultDosage:
      'One tablet (40 mg/10 mg) taken orally once daily with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders, severe hepatic impairment, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Peripheral ankle oedema, dizziness, headache, flushing, hypotension, palpitations, and fatigue.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Twynsta (telmisartan / amlodipine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/twynsta',
  },
  {
    brandName: 'Twynsta 80 mg/5 mg',
    brandNameAr: 'توينستا 80 ملغم/5 ملغم',
    genericName: 'Telmisartan + Amlodipine',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '80 mg / 5 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on Twynsta 40 mg/5 mg or as substitution for concurrent telmisartan 80 mg and amlodipine 5 mg.',
    adultDosage:
      'One tablet (80 mg/5 mg) taken orally once daily with or without food.',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders, severe hepatic impairment, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, peripheral oedema, hypotension, headache, somnolence, flushing, and asthenia.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Twynsta (telmisartan / amlodipine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/twynsta',
  },
  {
    brandName: 'Twynsta 80 mg/10 mg',
    brandNameAr: 'توينستا 80 ملغم/10 ملغم',
    genericName: 'Telmisartan + Amlodipine',
    drugClassNameEn: 'Angiotensin II Receptor Blocker and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '80 mg / 10 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Maximum-strength combination therapy for essential hypertension in adults not adequately controlled on lower-dose telmisartan/amlodipine combinations or already stabilised on telmisartan 80 mg and amlodipine 10 mg.',
    adultDosage:
      'One tablet (80 mg/10 mg) taken orally once daily with or without food (maximum recommended daily dose).',
    contraindications:
      'Second and third trimesters of pregnancy, biliary obstructive disorders, severe hepatic impairment, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Peripheral oedema, dizziness, hypotension, flushing, headache, palpitations, and fatigue.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Twynsta (telmisartan / amlodipine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/twynsta',
  },
  {
    brandName: 'Pradaxa 75 mg',
    brandNameAr: 'براداكسا 75 ملغم',
    genericName: 'Dabigatran etexilate',
    drugClassNameEn: 'Direct Oral Thrombin Inhibitors (DOACs)',
    dosageForm: 'Hard capsule',
    strength: '75 mg',
    route: 'Oral',
    packSize: '60 hard capsules',
    indications:
      'Primary prevention of venous thromboembolic events (VTE) in adult patients who have undergone elective total hip replacement surgery or total knee replacement surgery (particularly in patients with moderate renal impairment, CrCl 30–50 mL/min, or concomitant verapamil/amiodarone/quinidine); and treatment of VTE and prevention of recurrent VTE in paediatric patients.',
    adultDosage:
      'Orthopaedic VTE prophylaxis in moderate renal impairment (CrCl 30–50 mL/min) or concomitant verapamil: start with 75 mg (1 capsule) within 1–4 hours of completed surgery, continuing with 150 mg (2 capsules of 75 mg) once daily for 10 days (knee replacement) or 28–35 days (hip replacement). Swallow whole; do not open the capsule.',
    contraindications:
      'Severe renal impairment (CrCl <30 mL/min in adults), active clinically significant bleeding, lesion or condition at significant risk of major bleeding, concomitant treatment with any other anticoagulant, hepatic impairment or liver disease expected to have any impact on survival, concomitant systemic ketoconazole, cyclosporine, itraconazole, or dronedarone, and prosthetic heart valves requiring anticoagulant treatment.',
    sideEffects:
      'Bleeding (epistaxis, gastrointestinal haemorrhage, urogenital bleeding, anaemia), dyspepsia, abdominal pain, diarrhoea, and nausea.',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Cardiology', 'Orthopedics', 'Hematology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Pradaxa (dabigatran etexilate) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pradaxa',
  },
  {
    brandName: 'Pradaxa 110 mg',
    brandNameAr: 'براداكسا 110 ملغم',
    genericName: 'Dabigatran etexilate',
    drugClassNameEn: 'Direct Oral Thrombin Inhibitors (DOACs)',
    dosageForm: 'Hard capsule',
    strength: '110 mg',
    route: 'Oral',
    packSize: '60 hard capsules',
    indications:
      'Primary prevention of venous thromboembolic events after elective total hip or knee replacement surgery; prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) with one or more risk factors; and treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE), and prevention of recurrent DVT and PE in adults.',
    adultDosage:
      'Orthopaedic VTE prophylaxis: 110 mg (1 capsule) 1–4 hours after surgery, followed by 220 mg (2 capsules) once daily. NVAF and DVT/PE in patients aged ≥80 years, patients receiving concomitant verapamil, or patients at increased bleeding risk (aged 75–79 years, CrCl 30–50 mL/min, gastritis/oesophagitis): 110 mg twice daily. Swallow whole; do not open capsules.',
    contraindications:
      'Severe renal impairment (CrCl <30 mL/min), active clinically significant bleeding, high-risk bleeding lesions, concomitant anticoagulants, hepatic disease impacting survival, concomitant systemic ketoconazole, cyclosporine, itraconazole, or dronedarone, and prosthetic heart valves.',
    sideEffects:
      'Haemorrhage (gastrointestinal, intracranial, urogenital, epistaxis), dyspepsia, gastro-oesophageal reflux, abdominal pain, and diarrhoea.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Neurology', 'Hematology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Pradaxa (dabigatran etexilate) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pradaxa',
  },
  {
    brandName: 'Pradaxa 150 mg',
    brandNameAr: 'براداكسا 150 ملغم',
    genericName: 'Dabigatran etexilate',
    drugClassNameEn: 'Direct Oral Thrombin Inhibitors (DOACs)',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '60 hard capsules',
    indications:
      'Prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) with one or more risk factors (prior stroke/TIA, age ≥75 years, heart failure NYHA Class ≥II, diabetes mellitus, hypertension); and treatment of DVT and PE and prevention of recurrent DVT and PE in adults.',
    adultDosage:
      'Standard adult dose for NVAF and DVT/PE (following at least 5 days of parenteral anticoagulant in acute DVT/PE): 150 mg taken orally twice daily (one capsule in the morning and one in the evening) with or without food. Swallow whole with water; never open the capsule as this markedly increases bioavailability and bleeding risk.',
    contraindications:
      'Severe renal impairment (CrCl <30 mL/min), active clinically significant bleeding, high-risk bleeding lesions, concomitant anticoagulants, hepatic disease impacting survival, concomitant systemic ketoconazole, cyclosporine, itraconazole, or dronedarone, and prosthetic heart valves.',
    sideEffects:
      'Haemorrhage (gastrointestinal bleeding, epistaxis, haematuria), dyspepsia, abdominal pain, diarrhoea, and nausea.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Neurology', 'Hematology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Pradaxa (dabigatran etexilate) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pradaxa',
  },
  {
    brandName: 'Praxbind 2.5 g/50 mL',
    brandNameAr: 'براكسبايند 2.5 غم/50 مل',
    genericName: 'Idarucizumab',
    drugClassNameEn: 'Specific Reversal Agents for Dabigatran (Humanised Monoclonal Antibody Fragments)',
    dosageForm: 'Solution for injection / infusion',
    strength: '2.5 g / 50 mL (50 mg/mL)',
    route: 'Intravenous',
    packSize: '2 vials x 50 mL (total 5 g dose)',
    indications:
      'Specific reversal agent for dabigatran, indicated in adult patients treated with Pradaxa (dabigatran etexilate) when rapid reversal of its anticoagulant effects is required for emergency surgery / urgent procedures, or in life-threatening or uncontrolled bleeding.',
    adultDosage:
      'Recommended complete dose is 5 g idarucizumab (2 vials of 2.5 g / 50 mL), administered intravenously as two consecutive infusions over 5 to 10 minutes each or as a bolus injection.',
    contraindications:
      'None (in life-threatening emergency situations, weigh any known hypersensitivity to idarucizumab or excipients including sorbitol in hereditary fructose intolerance against the benefit of emergency treatment).',
    sideEffects:
      'Thrombotic events secondary to reversal of anticoagulation in patients with underlying prothrombotic disease, headache, hypokalaemia, delirium, constipation, and pyrexia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze. Unopened vials may be kept at room temperature (up to 30°C) for up to 48 hours.',
    specialties: ['Emergency Medicine', 'Cardiology', 'Hematology', 'Neurology'],
    sourceTitle: 'EMA EPAR — Praxbind (idarucizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/praxbind',
  },
  {
    brandName: 'Actilyse 20 mg',
    brandNameAr: 'أكتيليز 20 ملغم',
    genericName: 'Alteplase',
    drugClassNameEn: 'Recombinant Tissue Plasminogen Activators (Fibrinolytics / Thrombolytics)',
    dosageForm: 'Powder and solvent for solution for injection and infusion',
    strength: '20 mg',
    route: 'Intravenous',
    packSize: '1 vial powder + 1 vial solvent (20 mL)',
    indications:
      'Fibrinolytic treatment of acute myocardial infarction, acute massive pulmonary embolism with haemodynamic instability, and acute ischaemic stroke (initiated within 4.5 hours after onset of stroke symptoms and after exclusion of intracranial haemorrhage by imaging).',
    adultDosage:
      'Acute ischaemic stroke: 0.9 mg/kg (maximum 90 mg) infused IV over 60 minutes with 10% of the total dose given as an initial IV bolus. Acute MI (90-minute accelerated regimen): 15 mg IV bolus, then 50 mg over 30 min, then 35 mg over 60 min (up to 100 mg total). Acute massive PE: 10 mg IV bolus over 1–2 min followed by 90 mg IV over 2 hours.',
    contraindications:
      'Significant bleeding disorder at present or within the past 6 months, known haemorrhagic diathesis, effective oral anticoagulant treatment (INR >1.3), history of CNS damage or intracranial haemorrhage, severe uncontrolled arterial hypertension, major surgery or significant trauma within the past 10 days, bacterial endocarditis, and acute pancreatitis.',
    sideEffects:
      'Haemorrhage (intracranial haemorrhage in stroke patients, gastrointestinal/puncture-site bleeding), reperfusion arrhythmias (in acute MI), hypotension, and rare angioedema (especially with concomitant ACE inhibitors).',
    storageConditions:
      'Store below 25°C in the original package in order to protect from light. Do not freeze.',
    specialties: ['Emergency Medicine', 'Cardiology', 'Neurology', 'Critical Care'],
    sourceTitle: 'EMA Referral — Actilyse (alteplase) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/actilyse',
  },
  {
    brandName: 'Actilyse 50 mg',
    brandNameAr: 'أكتيليز 50 ملغم',
    genericName: 'Alteplase',
    drugClassNameEn: 'Recombinant Tissue Plasminogen Activators (Fibrinolytics / Thrombolytics)',
    dosageForm: 'Powder and solvent for solution for injection and infusion',
    strength: '50 mg',
    route: 'Intravenous',
    packSize: '1 vial powder + 1 vial solvent (50 mL)',
    indications:
      'Fibrinolytic treatment of acute myocardial infarction (90-minute accelerated regimen within 6 hours or 3-hour regimen within 6–12 hours), acute massive pulmonary embolism with haemodynamic instability, and acute ischaemic stroke (within 4.5 hours of symptom onset after exclusion of intracranial haemorrhage).',
    adultDosage:
      'Acute ischaemic stroke: 0.9 mg/kg (maximum 90 mg) over 60 minutes (10% as initial IV bolus). Acute MI (accelerated regimen for ≥65 kg): 15 mg IV bolus, 50 mg over 30 min, 35 mg over 60 min (total 100 mg). Massive PE (≥65 kg): 10 mg IV bolus over 1–2 min, then 90 mg over 2 hours.',
    contraindications:
      'Active internal bleeding, history of intracranial haemorrhage or suspected subarachnoid haemorrhage, severe uncontrolled hypertension, recent intracranial/intraspinal surgery or serious head trauma, intracranial neoplasm/AVM/aneurysm, and known bleeding diathesis.',
    sideEffects:
      'Intracerebral and systemic haemorrhage, reperfusion cardiac arrhythmias, hypotension, fever, and orolingual angioedema.',
    storageConditions:
      'Store below 25°C in the original package to protect from light. Administer immediately after reconstitution.',
    specialties: ['Emergency Medicine', 'Cardiology', 'Neurology', 'Critical Care'],
    sourceTitle: 'EMA Referral — Actilyse (alteplase) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/actilyse',
  },
  {
    brandName: 'Metalyse 5000 U (25 mg)',
    brandNameAr: 'ميتاليز 5000 وحدة (25 ملغم)',
    genericName: 'Tenecteplase',
    drugClassNameEn: 'Fibrin-Specific Recombinant Plasminogen Activators (Thrombolytics)',
    dosageForm: 'Powder for solution for injection',
    strength: '5000 units (25 mg)',
    route: 'Intravenous bolus',
    packSize: '1 vial powder (25 mg)',
    indications:
      'Thrombolytic treatment of adults with acute ischaemic stroke (AIS) within 4.5 hours from last known well and after exclusion of intracranial haemorrhage.',
    adultDosage:
      'Acute ischaemic stroke: single weight-based intravenous bolus of 0.25 mg/kg (maximum 25 mg / 5000 U) administered over 5 to 10 seconds.',
    contraindications:
      'Significant bleeding disorder at present or within the past 6 months, effective oral anticoagulation (INR >1.3), history of CNS damage or intracranial haemorrhage, severe uncontrolled arterial hypertension, and acute pancreatitis.',
    sideEffects:
      'Intracranial haemorrhage, epistaxis, gastrointestinal bleeding, ecchymosis at injection site, and anaphylactoid/angioedema reactions.',
    storageConditions:
      'Store below 30°C in the outer carton in order to protect from light. Do not freeze.',
    specialties: ['Neurology', 'Emergency Medicine', 'Critical Care'],
    sourceTitle: 'EMA EPAR — Metalyse (tenecteplase) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/metalyse',
  },
  {
    brandName: 'Metalyse 10000 U (50 mg)',
    brandNameAr: 'ميتاليز 10000 وحدة (50 ملغم)',
    genericName: 'Tenecteplase',
    drugClassNameEn: 'Fibrin-Specific Recombinant Plasminogen Activators (Thrombolytics)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '10000 units (50 mg)',
    route: 'Intravenous bolus',
    packSize: '1 vial powder + 1 pre-filled syringe of water for injections (10 mL)',
    indications:
      'Thrombolytic treatment of suspected myocardial infarction with persistent ST elevation or recent left bundle branch block within 6 hours after the onset of AMI symptoms.',
    adultDosage:
      'Single weight-adjusted intravenous bolus administered over 5–10 seconds: <60 kg: 6000 U (30 mg); 60 to <70 kg: 7000 U (35 mg); 70 to <80 kg: 8000 U (40 mg); 80 to <90 kg: 9000 U (45 mg); ≥90 kg: 10000 U (50 mg), with adjunctive antithrombotic therapy.',
    contraindications:
      'Significant bleeding disorder, history of haemorrhagic stroke or stroke of unknown origin at any time, ischaemic stroke or TIA in the preceding 6 months, severe uncontrolled hypertension, and major surgery or trauma within the past 2 months.',
    sideEffects:
      'Haemorrhage (injection-site, gastrointestinal, urogenital, intracranial), reperfusion arrhythmias, hypotension, and pyrexia.',
    storageConditions:
      'Store below 30°C in the outer carton to protect from light. Do not freeze.',
    specialties: ['Cardiology', 'Emergency Medicine', 'Critical Care'],
    sourceTitle: 'EMA EPAR — Metalyse (tenecteplase) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/metalyse',
  },

  // =========================================================================
  // 3. RESPIRATORY & PULMONARY FIBROSIS — SPIRIVA, SPIOLTO, ATROVENT, BERODUAL, OFEV (9 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Spiriva HandiHaler 18 mcg',
    brandNameAr: 'سبيريفا هانديهيلر 18 ميكروغرام',
    genericName: 'Tiotropium',
    drugClassNameEn: 'Long-Acting Muscarinic Antagonists (LAMAs)',
    dosageForm: 'Inhalation powder, hard capsule',
    strength: '18 mcg (delivers 10 mcg per actuation)',
    route: 'Inhalation',
    packSize: '30 capsules + 1 HandiHaler device',
    indications:
      'Maintenance bronchodilator treatment to relieve symptoms of patients with chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      'Inhalation of the contents of one 18 mcg capsule once daily using the HandiHaler device at the same time of day. Capsules must not be swallowed.',
    contraindications:
      'Hypersensitivity to tiotropium, atropine or its derivatives (such as ipratropium or oxitropium), or to the excipient lactose monohydrate.',
    sideEffects:
      'Dry mouth, pharyngitis, cough, dizziness, headache, constipation, urinary retention (particularly in men with prostatic hyperplasia), and tachycardia.',
    storageConditions:
      'Store below 25°C. Do not freeze. After first opening a blister strip, use within 9 days.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'UK EMC — Spiriva 18 microgram Inhalation Powder (tiotropium) SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/407/smpc',
  },
  {
    brandName: 'Spiriva Respimat 2.5 mcg',
    brandNameAr: 'سبيريفا ريسبيمات 2.5 ميكروغرام',
    genericName: 'Tiotropium',
    drugClassNameEn: 'Long-Acting Muscarinic Antagonists (LAMAs)',
    dosageForm: 'Solution for inhalation (Respimat soft mist inhaler)',
    strength: '2.5 mcg per puff (5 mcg per 2-puff daily dose)',
    route: 'Inhalation',
    packSize: '1 Respimat inhaler + 1 cartridge (60 puffs / 30 doses)',
    indications:
      'Maintenance bronchodilator treatment to relieve symptoms of patients with chronic obstructive pulmonary disease (COPD); and as an add-on maintenance bronchodilator treatment in patients aged 6 years and older with severe asthma who experienced one or more severe asthma exacerbations in the preceding year.',
    adultDosage:
      '5 mcg tiotropium given as two puffs from the Respimat inhaler once daily, at the same time of the day.',
    contraindications:
      'Hypersensitivity to tiotropium, atropine or its derivatives (ipratropium, oxitropium), or any of the excipients.',
    sideEffects:
      'Dry mouth, cough, pharyngitis, dysphonia, dizziness, headache, constipation, urinary retention, and glaucoma exacerbation if sprayed into eyes.',
    storageConditions:
      'Do not freeze. Discard cartridge 3 months after insertion into the Respimat inhaler.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'UK EMC — Spiriva Respimat (tiotropium) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/407/smpc',
  },
  {
    brandName: 'Spiolto Respimat 2.5 mcg/2.5 mcg',
    brandNameAr: 'سبيولتو ريسبيمات 2.5 ميكروغرام/2.5 ميكروغرام',
    genericName: 'Tiotropium + Olodaterol',
    drugClassNameEn: 'Long-Acting Muscarinic Antagonist and Long-Acting Beta-2 Agonist (LAMA/LABA) Combinations',
    dosageForm: 'Solution for inhalation (Respimat soft mist inhaler)',
    strength: '2.5 mcg / 2.5 mcg per puff',
    route: 'Inhalation',
    packSize: '1 Respimat inhaler + 1 cartridge (60 puffs / 30 doses)',
    indications:
      'Maintenance bronchodilator treatment to relieve symptoms in adult patients with chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      '5 mcg tiotropium and 5 mcg olodaterol given as two puffs from the Respimat inhaler once daily, at the same time of the day. Not indicated for the treatment of asthma or acute bronchospasm.',
    contraindications:
      'Hypersensitivity to tiotropium, olodaterol, atropine or its derivatives (ipratropium, oxitropium), or any of the excipients.',
    sideEffects:
      'Dry mouth, nasopharyngitis, cough, dizziness, insomnia, headache, tachycardia, palpitations, constipation, and urinary retention.',
    storageConditions:
      'Do not freeze. In-use shelf life is 3 months after insertion of the cartridge.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'UK EMC — Spiolto Respimat 2.5 microgram/2.5 microgram (tiotropium / olodaterol) SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6902/smpc',
  },
  {
    brandName: 'Atrovent 20 mcg/actuation Inhaler',
    brandNameAr: 'أتروفنت 20 ميكروغرام/بخاخ',
    genericName: 'Ipratropium',
    drugClassNameEn: 'Short-Acting Muscarinic Antagonists (SAMAs)',
    dosageForm: 'Pressurised inhalation, solution (MDI)',
    strength: '20 mcg per actuation',
    route: 'Inhalation',
    packSize: '1 metered-dose inhaler (200 actuations)',
    indications:
      'Regular maintenance bronchodilator treatment of reversible bronchospasm associated with chronic obstructive pulmonary disease (COPD) and chronic bronchial asthma.',
    adultDosage:
      '1 to 2 puffs (20–40 mcg) three or four times daily (in early treatment, up to 4 puffs at a time may be taken up to a maximum of 12 puffs in 24 hours).',
    contraindications:
      'Hypersensitivity to ipratropium, atropine, or atropine derivatives.',
    sideEffects:
      'Headache, throat irritation, cough, dry mouth, gastrointestinal motility disturbances, dizziness, tachycardia, and ocular accommodation disorders / acute angle-closure glaucoma if mist enters eyes.',
    storageConditions:
      'Store below 30°C; protect from direct sunlight, heat, and frost.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'UK EMC — Atrovent CFC-Free Inhaler (ipratropium) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/61/smpc',
  },
  {
    brandName: 'Atrovent 250 mcg/mL Nebuliser Solution',
    brandNameAr: 'أتروفنت 250 ميكروغرام/مل',
    genericName: 'Ipratropium',
    drugClassNameEn: 'Short-Acting Muscarinic Antagonists (SAMAs)',
    dosageForm: 'Nebuliser solution',
    strength: '250 mcg / mL (0.025%)',
    route: 'Inhalation (Nebulisation)',
    packSize: '1 bottle x 20 mL (or 20 single-dose vials x 1 mL)',
    indications:
      'Reversible bronchospasm associated with chronic obstructive pulmonary disease (COPD) and acute or chronic asthma (especially in combination with inhaled beta-2 agonists).',
    adultDosage:
      'Adults and adolescents (>12 years): 250–500 mcg (1–2 mL) nebulised 3 to 4 times daily, diluted to a final volume of 3–4 mL with sterile 0.9% sodium chloride solution.',
    contraindications:
      'Hypersensitivity to ipratropium, atropine, or its derivatives.',
    sideEffects:
      'Dry mouth, cough, headache, throat irritation, nausea, tachycardia, urinary retention, and mydriasis or increased intraocular pressure if nebulised mist contacts the eyes (use a mouthpiece rather than a face mask where possible).',
    storageConditions:
      'Store below 25°C in the outer carton to protect from light; do not freeze.',
    specialties: ['Pulmonology', 'Emergency Medicine', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'UK EMC — Atrovent (ipratropium) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/61/smpc',
  },
  {
    brandName: 'Berodual N 20 mcg/50 mcg Inhaler',
    brandNameAr: 'بيرودوال إن 20 ميكروغرام/50 ميكروغرام',
    genericName: 'Ipratropium + Fenoterol',
    drugClassNameEn: 'Short-Acting Muscarinic Antagonist and Beta-2 Agonist (SAMA/SABA) Combinations',
    dosageForm: 'Pressurised inhalation, solution (MDI)',
    strength: '20 mcg ipratropium / 50 mcg fenoterol per actuation',
    route: 'Inhalation',
    packSize: '1 metered-dose inhaler (200 actuations)',
    indications:
      'Prevention and treatment of symptoms in chronic obstructive airway disorders with reversible airflow limitation, such as bronchial asthma and especially chronic bronchitis with or without emphysema.',
    adultDosage:
      'Acute asthma episodes: 2 actuations; if breathing has not noticeably improved after 5 minutes, 2 further actuations may be taken. Intermittent and long-term treatment: 1 to 2 actuations per administration, up to a maximum of 8 actuations per day (average 1–2 actuations three times daily).',
    contraindications:
      'Hypersensitivity to fenoterol, ipratropium, atropine-like substances, or any excipient; hypertrophic obstructive cardiomyopathy; and tachyarrhythmia.',
    sideEffects:
      'Fine skeletal muscle tremor, nervousness, dry mouth, cough, headache, dizziness, tachycardia, palpitations, and hypokalaemia.',
    storageConditions:
      'Store below 25°C; protect from direct sunlight and frost.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Boehringer Ingelheim — Berodual (ipratropium / fenoterol) Official Product Information',
    sourceUrl: 'https://www.boehringer-ingelheim.com/human-health/products/berodual',
  },
  {
    brandName: 'Berodual 0.25 mg/0.5 mg per mL Nebuliser Solution',
    brandNameAr: 'بيرودوال 0.25 ملغم/0.5 ملغم لكل مل',
    genericName: 'Ipratropium + Fenoterol',
    drugClassNameEn: 'Short-Acting Muscarinic Antagonist and Beta-2 Agonist (SAMA/SABA) Combinations',
    dosageForm: 'Solution for nebulisation',
    strength: '0.25 mg ipratropium / 0.5 mg fenoterol per mL (20 drops)',
    route: 'Inhalation (Nebulisation)',
    packSize: '1 bottle x 20 mL',
    indications:
      'Prevention and treatment of acute and chronic reversible bronchospasm in bronchial asthma and chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      'Adults and adolescents (>12 years): 1 mL (20 drops) to 2.5 mL (50 drops) diluted with physiological saline (0.9% NaCl) to a final volume of 3–4 mL and nebulised up to 4 times daily (up to 4 mL in severe hospitalised cases under medical supervision).',
    contraindications:
      'Hypersensitivity to fenoterol, ipratropium, or atropine derivatives; hypertrophic obstructive cardiomyopathy; and tachyarrhythmia.',
    sideEffects:
      'Tremor, tachycardia, palpitations, dry mouth, cough, throat irritation, headache, hypokalaemia, and ocular complications if mist enters eyes.',
    storageConditions:
      'Store below 25°C; protect from light; do not freeze.',
    specialties: ['Pulmonology', 'Emergency Medicine', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Boehringer Ingelheim — Berodual (ipratropium / fenoterol) Official Product Information',
    sourceUrl: 'https://www.boehringer-ingelheim.com/human-health/products/berodual',
  },
  {
    brandName: 'Ofev 100 mg',
    brandNameAr: 'أوفيف 100 ملغم',
    genericName: 'Nintedanib',
    drugClassNameEn: 'Intracellular Tyrosine Kinase Inhibitors (Antifibrotic Agents)',
    dosageForm: 'Soft capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '60 soft capsules',
    indications:
      'Treatment of idiopathic pulmonary fibrosis (IPF) in adults; treatment of other chronic fibrosing interstitial lung diseases (ILDs) with a progressive phenotype in adults; and treatment of systemic sclerosis-associated interstitial lung disease (SSc-ILD) in adults and children aged 6 years and older.',
    adultDosage:
      'Dose-reduction strength (100 mg twice daily approximately 12 hours apart with food) for management of diarrhoea, nausea, or hepatic transaminase elevations, or in patients with mild hepatic impairment (Child-Pugh A).',
    contraindications:
      'Pregnancy, and hypersensitivity to nintedanib, peanut, or soya, or any of the excipients.',
    sideEffects:
      'Diarrhoea, nausea, vomiting, abdominal pain, decreased appetite, weight loss, elevated hepatic enzymes (ALT, AST), bleeding, and hypertension.',
    storageConditions:
      'Store below 25°C in the original blister package in order to protect from moisture.',
    specialties: ['Pulmonology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR — Ofev (nintedanib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ofev',
  },
  {
    brandName: 'Ofev 150 mg',
    brandNameAr: 'أوفيف 150 ملغم',
    genericName: 'Nintedanib',
    drugClassNameEn: 'Intracellular Tyrosine Kinase Inhibitors (Antifibrotic Agents)',
    dosageForm: 'Soft capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '60 soft capsules',
    indications:
      'Standard maintenance dose for the treatment of idiopathic pulmonary fibrosis (IPF), progressive fibrosing interstitial lung diseases (ILDs), and systemic sclerosis-associated interstitial lung disease (SSc-ILD) in adults.',
    adultDosage:
      'Recommended adult dose is 150 mg twice daily administered approximately 12 hours apart, taken with food and swallowed whole with water (do not chew, open, or crush the capsules).',
    contraindications:
      'Pregnancy, and hypersensitivity to nintedanib, peanut, or soya, or any of the excipients.',
    sideEffects:
      'Diarrhoea (very common; manage with hydration and loperamide), nausea, abdominal pain, elevated liver enzymes, decreased appetite, weight loss, epistaxis, and rare gastrointestinal perforation.',
    storageConditions:
      'Store below 25°C in the original blister package in order to protect from moisture.',
    specialties: ['Pulmonology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR — Ofev (nintedanib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ofev',
  },

  // =========================================================================
  // 4. ONCOLOGY, DERMATOLOGY & NEUROLOGY — GIOTRIF, VARGATEF, SPEVIGO, SIFROL (8 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Giotrif 20 mg',
    brandNameAr: 'جيوتريف 20 ملغم',
    genericName: 'Afatinib',
    drugClassNameEn: 'Irreversible ErbB Family (EGFR/HER2/ErbB4) Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Monotherapy for the treatment of EGFR TKI-naive adult patients with locally advanced or metastatic non-small cell lung cancer (NSCLC) with activating EGFR mutations; and locally advanced or metastatic NSCLC of squamous histological subtype progressing on or after platinum-based chemotherapy.',
    adultDosage:
      'Dose-reduction strength (20 mg once daily) for managing adverse reactions; take without food (at least 1 hour before or 3 hours after food).',
    contraindications:
      'Hypersensitivity to afatinib or any of the excipients.',
    sideEffects:
      'Diarrhoea, rash/acneiform dermatitis, stomatitis, paronychia, dry skin, decreased appetite, epistaxis, and rare interstitial lung disease or keratitis.',
    storageConditions:
      'Store in the original package in order to protect from moisture and light.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Giotrif (afatinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/giotrif',
  },
  {
    brandName: 'Giotrif 30 mg',
    brandNameAr: 'جيوتريف 30 ملغم',
    genericName: 'Afatinib',
    drugClassNameEn: 'Irreversible ErbB Family (EGFR/HER2/ErbB4) Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '30 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of locally advanced or metastatic EGFR-mutation-positive NSCLC and squamous NSCLC progressing on or after platinum-based chemotherapy.',
    adultDosage:
      '30 mg taken orally once daily without food (first dose-reduction step from 40 mg once daily).',
    contraindications:
      'Hypersensitivity to afatinib or any of the excipients.',
    sideEffects:
      'Diarrhoea, acneiform rash, stomatitis, paronychia, pruritus, dry skin, and decreased appetite.',
    storageConditions:
      'Store in the original package in order to protect from moisture and light.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Giotrif (afatinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/giotrif',
  },
  {
    brandName: 'Giotrif 40 mg',
    brandNameAr: 'جيوتريف 40 ملغم',
    genericName: 'Afatinib',
    drugClassNameEn: 'Irreversible ErbB Family (EGFR/HER2/ErbB4) Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Standard recommended starting dose for EGFR TKI-naive locally advanced or metastatic NSCLC with activating EGFR mutations, and squamous NSCLC progressing on or after platinum-based chemotherapy.',
    adultDosage:
      'Recommended starting dose is 40 mg taken orally once daily without food (at least 1 hour before or 3 hours after eating).',
    contraindications:
      'Hypersensitivity to afatinib or any of the excipients.',
    sideEffects:
      'Diarrhoea (manage early with loperamide), rash/acneiform dermatitis, stomatitis, paronychia, epistaxis, cystitis, and elevated hepatic transaminases.',
    storageConditions:
      'Store in the original package in order to protect from moisture and light.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Giotrif (afatinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/giotrif',
  },
  {
    brandName: 'Vargatef 150 mg',
    brandNameAr: 'فارغاتيف 150 ملغم',
    genericName: 'Nintedanib',
    drugClassNameEn: 'Triple Angiokinase (VEGFR/FGFR/PDGFR) Inhibitors',
    dosageForm: 'Soft capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '60 soft capsules',
    indications:
      'In combination with docetaxel for the treatment of adult patients with locally advanced, metastatic, or locally recurrent non-small cell lung cancer (NSCLC) of adenocarcinoma tumour histology after first-line chemotherapy.',
    adultDosage:
      'Recommended dose is 200 mg (two 100 mg capsules) or dose-reduced 150 mg twice daily administered approximately 12 hours apart on Days 2 to 21 of a standard 21-day docetaxel treatment cycle (must not be taken on Day 1 of docetaxel infusion). Take with food.',
    contraindications:
      'Hypersensitivity to nintedanib, peanut, or soya, or any of the excipients.',
    sideEffects:
      'Neutropenia (including febrile neutropenia), diarrhoea, vomiting, nausea, increased ALT/AST, mucositis, peripheral neuropathy, bleeding, and hypertension.',
    storageConditions:
      'Store below 25°C in the original package in order to protect from moisture.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Vargatef (nintedanib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vargatef',
  },
  {
    brandName: 'Spevigo 450 mg/7.5 mL',
    brandNameAr: 'سبيفيغو 450 ملغم/7.5 مل',
    genericName: 'Spesolimab',
    drugClassNameEn: 'Anti-Interleukin-36 Receptor (IL-36R) Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '450 mg / 7.5 mL (60 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '2 vials x 7.5 mL (total 900 mg dose)',
    indications:
      'Treatment of generalized pustular psoriasis (GPP) flares in adults and adolescents from 12 years of age as monotherapy.',
    adultDosage:
      'Recommended dose for a GPP flare is a single intravenous dose of 900 mg (2 vials of 450 mg/7.5 mL) diluted and infused over 90 minutes; if flare symptoms persist, an additional 900 mg dose may be administered 1 week after the initial dose.',
    contraindications:
      'Severe or life-threatening hypersensitivity to spesolimab or any of the excipients, and clinically important active infections.',
    sideEffects:
      'Urinary tract infection, upper respiratory tract infection, fatigue, nausea, headache, pruritus, infusion-site erythema, and peripheral neuropathy.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original package to protect from light; do not freeze.',
    specialties: ['Dermatology', 'Immunology'],
    sourceTitle: 'EMA EPAR — Spevigo (spesolimab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/spevigo',
  },
  {
    brandName: 'Sifrol 0.18 mg',
    brandNameAr: 'سيفرول 0.18 ملغم',
    genericName: 'Pramipexole',
    drugClassNameEn: 'Non-Ergot Dopamine Receptor Agonists',
    dosageForm: 'Tablet',
    strength: '0.18 mg pramipexole base (equivalent to 0.25 mg salt)',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of the signs and symptoms of idiopathic Parkinson’s disease in adults (alone or in combination with levodopa); and symptomatic treatment of moderate to severe idiopathic Restless Legs Syndrome in adults.',
    adultDosage:
      'Parkinson’s disease: start at 0.088 mg base three times daily in Week 1, then 0.18 mg base three times daily in Week 2, and 0.35 mg base three times daily in Week 3 (maintenance 0.264 mg to 3.3 mg base/day in 3 divided doses). Restless Legs Syndrome: 0.088 mg to 0.54 mg base once daily 2–3 hours before bedtime.',
    contraindications:
      'Hypersensitivity to pramipexole or any of the excipients.',
    sideEffects:
      'Nausea, somnolence, sudden onset of sleep, dizziness, dyskinesia (with levodopa), hallucinations, insomnia, peripheral oedema, orthostatic hypotension, and impulse control disorders.',
    storageConditions:
      'Store in the original package in order to protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Sifrol (pramipexole) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sifrol',
  },
  {
    brandName: 'Sifrol 0.7 mg',
    brandNameAr: 'سيفرول 0.7 ملغم',
    genericName: 'Pramipexole',
    drugClassNameEn: 'Non-Ergot Dopamine Receptor Agonists',
    dosageForm: 'Tablet',
    strength: '0.7 mg pramipexole base (equivalent to 1 mg salt)',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Maintenance treatment of the signs and symptoms of idiopathic Parkinson’s disease in adults, as monotherapy or in combination with levodopa.',
    adultDosage:
      'Administered in 3 equally divided daily doses (up to a maximum of 3.3 mg pramipexole base per day). When discontinuing therapy in Parkinson’s disease, taper gradually by 0.54 mg base per day to avoid neuroleptic malignant syndrome or dopamine agonist withdrawal syndrome.',
    contraindications:
      'Hypersensitivity to pramipexole or any of the excipients.',
    sideEffects:
      'Somnolence, dizziness, dyskinesia, nausea, constipation, hallucinations, confusion, peripheral oedema, hypotension, and impulse control disorders.',
    storageConditions:
      'Store in the original package in order to protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Sifrol (pramipexole) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sifrol',
  },
  {
    brandName: 'Sifrol 1.05 mg Prolonged-Release',
    brandNameAr: 'سيفرول 1.05 ملغم ممتد المفعول',
    genericName: 'Pramipexole',
    drugClassNameEn: 'Non-Ergot Dopamine Receptor Agonists (Once-Daily Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '1.05 mg pramipexole base (equivalent to 1.5 mg salt)',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Once-daily treatment of the signs and symptoms of idiopathic Parkinson’s disease in adults, as monotherapy or in combination with levodopa.',
    adultDosage:
      'Swallowed whole with water once daily at about the same time each day, with or without food (do not chew, divide, or crush). Patients may be switched overnight from immediate-release Sifrol tablets at the same total daily dose.',
    contraindications:
      'Hypersensitivity to pramipexole or any of the excipients.',
    sideEffects:
      'Somnolence, nausea, dyskinesia, dizziness, hallucinations, constipation, peripheral oedema, and impulse control disorders.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Sifrol (pramipexole) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sifrol',
  },
];

export const BOEHRINGER_PRODUCTS: AiProductDraft[] = BOEHRINGER_COMPACT_PRODUCTS.map(toBoehringerProductDraft);
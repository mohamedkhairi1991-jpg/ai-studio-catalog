import type { AiDraftSource, AiProductDraft } from './catalog';

const SERVIER_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactServierDrug {
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

function toServierProductDraft(item: CompactServierDrug): AiProductDraft {
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
    sources: SERVIER_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Les Laboratoires Servier regulatory monograph (EMA EPAR / SmPC / Servier Middle East SmPC); saved as draft pending verification.',
  };
}

const SERVIER_COMPACT_PRODUCTS: CompactServierDrug[] = [
  // =========================================================================
  // 1. CARDIOVASCULAR — COVERSYL, COVERSYL PLUS, BI-PRETERAX, COVERAM, TRIPLIXAM, VIACORAM, NATRILIX SR, PREDUCTAL MR, PROCORALAN (22 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Coversyl 5 mg',
    brandNameAr: 'كوفيرسيل 5 ملغم',
    genericName: 'Perindopril',
    drugClassNameEn: 'Angiotensin-Converting Enzyme (ACE) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg (as perindopril arginine)',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of hypertension; treatment of symptomatic heart failure; and reduction of risk of cardiac events in patients with stable coronary artery disease who have a history of myocardial infarction and/or revascularisation.',
    adultDosage:
      'Hypertension and stable coronary artery disease: recommended starting dose is 5 mg once daily taken in the morning before a meal; may be increased to 10 mg once daily after 1 month of treatment. Symptomatic heart failure: start at 2.5 mg (half a 5 mg scored tablet) once daily in the morning, increasing to 5 mg once daily after 2 weeks if tolerated.',
    contraindications:
      'Hypersensitivity to perindopril or any other ACE inhibitor, history of angioedema associated with previous ACE inhibitor therapy, hereditary or idiopathic angioedema, second and third trimesters of pregnancy, concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²), concomitant use with sacubitril/valsartan (must not be initiated earlier than 36 hours after the last dose of sacubitril/valsartan), and extracorporeal treatments leading to contact of blood with negatively charged surfaces.',
    sideEffects:
      'Dry persistent cough, dizziness, headache, paraesthesia, vertigo, visual disturbances, tinnitus, hypotension, nausea, abdominal pain, dysgeusia, diarrhoea, constipation, rash, pruritus, muscle cramps, hyperkalaemia, and rare angioedema.',
    storageConditions:
      'Keep the tablet container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'EMA Referral — Coversyl (perindopril) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/coversyl',
  },
  {
    brandName: 'Coversyl 10 mg',
    brandNameAr: 'كوفيرسيل 10 ملغم',
    genericName: 'Perindopril',
    drugClassNameEn: 'Angiotensin-Converting Enzyme (ACE) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg (as perindopril arginine)',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Maintenance treatment of hypertension and reduction of risk of cardiac events in patients with stable coronary artery disease who have a history of myocardial infarction and/or revascularisation.',
    adultDosage:
      '10 mg taken orally once daily in the morning before a meal (after at least 1 month on 5 mg once daily and provided renal function and serum potassium remain satisfactory).',
    contraindications:
      'Prior ACE-inhibitor-associated angioedema, hereditary or idiopathic angioedema, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, concomitant aliskiren in diabetes or renal impairment, and bilateral renal artery stenosis.',
    sideEffects:
      'Dry cough, dizziness, headache, hypotension, hyperkalaemia, renal function elevation, gastrointestinal disturbances, rash, and rare angioedema.',
    storageConditions:
      'Keep the tablet container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'EMA Referral — Coversyl (perindopril) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/coversyl',
  },
  {
    brandName: 'Coversyl Plus 5 mg/1.25 mg',
    brandNameAr: 'كوفيرسيل بلس 5 ملغم/1.25 ملغم',
    genericName: 'Perindopril + Indapamide',
    drugClassNameEn: 'ACE Inhibitor and Thiazide-Like Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 1.25 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on perindopril alone.',
    adultDosage:
      'One film-coated tablet (5 mg/1.25 mg) once daily, preferably taken in the morning and before a meal.',
    contraindications:
      'History of angioedema, hereditary/idiopathic angioedema, severe renal impairment (CrCl <30 mL/min), hepatic encephalopathy or severe hepatic impairment, hypokalaemia, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, concomitant aliskiren in diabetes or renal impairment, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dry cough, hypokalaemia, hyponatraemia, dizziness, headache, hypotension, gastrointestinal complaints, rash, and muscle spasms.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Coversyl Plus (perindopril / indapamide) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/coversyl-plus',
  },
  {
    brandName: 'Coversyl Plus 10 mg/2.5 mg',
    brandNameAr: 'كوفيرسيل بلس 10 ملغم/2.5 ملغم',
    genericName: 'Perindopril + Indapamide',
    drugClassNameEn: 'ACE Inhibitor and Thiazide-Like Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 2.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Substitution therapy for the treatment of essential hypertension in patients already controlled with perindopril and indapamide given concurrently at the same dose level (10 mg/2.5 mg).',
    adultDosage:
      'One film-coated tablet (10 mg/2.5 mg) once daily, preferably taken in the morning and before a meal.',
    contraindications:
      'History of angioedema, moderate or severe renal impairment (CrCl <60 mL/min for the 10 mg/2.5 mg strength), severe hepatic impairment or hepatic encephalopathy, hypokalaemia, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dry cough, hypokalaemia, hyponatraemia, hyperuricaemia, dizziness, headache, orthostatic hypotension, and rash.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Coversyl Plus (perindopril / indapamide) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/coversyl-plus',
  },
  {
    brandName: 'Bi-Preterax 5 mg/1.25 mg',
    brandNameAr: 'بي-بريتيراكس 5 ملغم/1.25 ملغم',
    genericName: 'Perindopril + Indapamide',
    drugClassNameEn: 'ACE Inhibitor and Thiazide-Like Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 1.25 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on perindopril monotherapy.',
    adultDosage:
      'One film-coated tablet (5 mg/1.25 mg) taken orally once daily in the morning before breakfast.',
    contraindications:
      'Prior ACE-inhibitor-related or hereditary/idiopathic angioedema, severe renal impairment (CrCl <30 mL/min), severe hepatic impairment or hepatic encephalopathy, hypokalaemia, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dry cough, hypokalaemia, hyponatraemia, dizziness, headache, postural hypotension, constipation, dry mouth, and rash.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Bi-Preterax (perindopril / indapamide)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Bipreterax-10mg-2.5mg-SmPC-Version-06.2021-LEBANON-JORDAN.pdf',
  },
  {
    brandName: 'Bi-Preterax 10 mg/2.5 mg',
    brandNameAr: 'بي-بريتيراكس 10 ملغم/2.5 ملغم',
    genericName: 'Perindopril + Indapamide',
    drugClassNameEn: 'ACE Inhibitor and Thiazide-Like Diuretic Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 2.5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Substitution therapy for essential hypertension in adult patients already controlled with perindopril 10 mg and indapamide 2.5 mg given concurrently.',
    adultDosage:
      'One film-coated tablet (10 mg/2.5 mg) taken orally once daily in the morning before a meal.',
    contraindications:
      'History of angioedema, moderate or severe renal impairment (CrCl <60 mL/min), severe hepatic impairment or hepatic encephalopathy, hypokalaemia, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dry cough, hypokalaemia, hyponatraemia, hyperuricaemia, dizziness, headache, hypotension, and photosensitivity.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Bi-Preterax 10 mg/2.5 mg (perindopril / indapamide)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Bipreterax-10mg-2.5mg-SmPC-Version-06.2021-LEBANON-JORDAN.pdf',
  },
  {
    brandName: 'Coveram 5 mg/5 mg',
    brandNameAr: 'كوفيرام 5 ملغم/5 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'ACE Inhibitor and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '5 mg / 5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Substitution therapy for the treatment of essential hypertension and/or stable coronary artery disease, in patients already controlled with perindopril and amlodipine given concurrently at the same dose level.',
    adultDosage:
      'One tablet (5 mg/5 mg) taken orally as a single dose once daily, preferably in the morning and before a meal.',
    contraindications:
      'History of angioedema associated with prior ACE inhibitor therapy, hereditary or idiopathic angioedema, second and third trimesters of pregnancy, severe hypotension, shock (including cardiogenic shock), obstruction of the outflow tract of the left ventricle (high-grade aortic stenosis), haemodynamically unstable heart failure after acute myocardial infarction, concomitant sacubitril/valsartan, and concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Peripheral oedema (ankle swelling), dry cough, dizziness, headache, somnolence, palpitations, flushing, abdominal pain, and nausea.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Coveram (perindopril / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Coveram-SmPC-Version-01.2022-KSA.pdf',
  },
  {
    brandName: 'Coveram 5 mg/10 mg',
    brandNameAr: 'كوفيرام 5 ملغم/10 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'ACE Inhibitor and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '5 mg / 10 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Substitution therapy for essential hypertension and/or stable coronary artery disease in patients adequately controlled with perindopril 5 mg and amlodipine 10 mg given concurrently.',
    adultDosage:
      'One tablet (5 mg/10 mg) once daily in the morning before a meal.',
    contraindications:
      'History of angioedema, second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, concomitant sacubitril/valsartan, and moderate-to-severe renal impairment (CrCl <60 mL/min).',
    sideEffects:
      'Peripheral ankle oedema, flushing, headache, dizziness, dry cough, palpitations, and fatigue.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Coveram (perindopril / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Coveram-SmPC-Version-01.2022-KSA.pdf',
  },
  {
    brandName: 'Coveram 10 mg/5 mg',
    brandNameAr: 'كوفيرام 10 ملغم/5 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'ACE Inhibitor and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '10 mg / 5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Substitution therapy for essential hypertension and/or stable coronary artery disease in patients adequately controlled with perindopril 10 mg and amlodipine 5 mg given concurrently.',
    adultDosage:
      'One tablet (10 mg/5 mg) once daily in the morning before a meal.',
    contraindications:
      'History of angioedema, second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, concomitant sacubitril/valsartan, and CrCl <60 mL/min.',
    sideEffects:
      'Dry cough, peripheral oedema, dizziness, headache, flushing, hypotension, and hyperkalaemia.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Coveram (perindopril / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Coveram-SmPC-Version-01.2022-KSA.pdf',
  },
  {
    brandName: 'Coveram 10 mg/10 mg',
    brandNameAr: 'كوفيرام 10 ملغم/10 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'ACE Inhibitor and Dihydropyridine Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '10 mg / 10 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Substitution therapy for essential hypertension and/or stable coronary artery disease in patients adequately controlled with perindopril 10 mg and amlodipine 10 mg given concurrently.',
    adultDosage:
      'One tablet (10 mg/10 mg) once daily in the morning before a meal (maximum daily dose).',
    contraindications:
      'History of angioedema, second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, concomitant sacubitril/valsartan, and CrCl <60 mL/min.',
    sideEffects:
      'Peripheral oedema, dry cough, dizziness, headache, flushing, palpitations, hypotension, and fatigue.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Coveram (perindopril / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Coveram-SmPC-Version-01.2022-KSA.pdf',
  },
  {
    brandName: 'Triplixam 5 mg/1.25 mg/5 mg',
    brandNameAr: 'تريبليكسام 5 ملغم/1.25 ملغم/5 ملغم',
    genericName: 'Perindopril + Indapamide + Amlodipine',
    drugClassNameEn: 'Triple Antihypertensive Combinations (ACE Inhibitor + Thiazide-Like Diuretic + Calcium Channel Blocker)',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 1.25 mg / 5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Substitution therapy for the treatment of essential hypertension in adult patients already controlled with the fixed-dose combination of perindopril/indapamide (5 mg/1.25 mg) and amlodipine (5 mg) taken at the same dose level.',
    adultDosage:
      'One film-coated tablet (5 mg/1.25 mg/5 mg) once daily, preferably taken in the morning and before a meal.',
    contraindications:
      'Dialysis patients, untreated decompensated heart failure, severe renal impairment (CrCl <30 mL/min), hepatic encephalopathy or severe hepatic impairment, hypokalaemia, history of angioedema, second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dizziness, headache, somnolence, dysgeusia, palpitations, flushing, dry cough, peripheral oedema, abdominal pain, hypokalaemia, and hyponatraemia.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Triplixam (perindopril / indapamide / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2022/09/SmPC_Triplixam_Version-06.2021-Bhn.pdf',
  },
  {
    brandName: 'Triplixam 5 mg/1.25 mg/10 mg',
    brandNameAr: 'تريبليكسام 5 ملغم/1.25 ملغم/10 ملغم',
    genericName: 'Perindopril + Indapamide + Amlodipine',
    drugClassNameEn: 'Triple Antihypertensive Combinations (ACE Inhibitor + Thiazide-Like Diuretic + Calcium Channel Blocker)',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 1.25 mg / 10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Substitution therapy for essential hypertension in adult patients already controlled with perindopril/indapamide 5 mg/1.25 mg and amlodipine 10 mg.',
    adultDosage:
      'One film-coated tablet (5 mg/1.25 mg/10 mg) once daily in the morning before a meal.',
    contraindications:
      'Dialysis, untreated decompensated heart failure, severe renal impairment (CrCl <30 mL/min), severe hepatic impairment or hepatic encephalopathy, hypokalaemia, history of angioedema, second and third trimesters of pregnancy, cardiogenic shock, high-grade aortic stenosis, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Peripheral ankle oedema, dizziness, headache, flushing, dry cough, hypokalaemia, hyponatraemia, and hypotension.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Triplixam (perindopril / indapamide / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2022/09/SmPC_Triplixam_Version-06.2021-Bhn.pdf',
  },
  {
    brandName: 'Triplixam 10 mg/2.5 mg/5 mg',
    brandNameAr: 'تريبليكسام 10 ملغم/2.5 ملغم/5 ملغم',
    genericName: 'Perindopril + Indapamide + Amlodipine',
    drugClassNameEn: 'Triple Antihypertensive Combinations (ACE Inhibitor + Thiazide-Like Diuretic + Calcium Channel Blocker)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 2.5 mg / 5 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Substitution therapy for essential hypertension in adult patients already controlled with perindopril/indapamide 10 mg/2.5 mg and amlodipine 5 mg.',
    adultDosage:
      'One film-coated tablet (10 mg/2.5 mg/5 mg) once daily in the morning before a meal.',
    contraindications:
      'Moderate or severe renal impairment (CrCl <60 mL/min for 10 mg/2.5 mg strengths), dialysis, untreated decompensated heart failure, severe hepatic impairment, hypokalaemia, history of angioedema, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Dry cough, dizziness, headache, peripheral oedema, hypokalaemia, hyponatraemia, hyperuricaemia, and orthostatic hypotension.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Triplixam (perindopril / indapamide / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2022/09/SmPC_Triplixam_Version-06.2021-Bhn.pdf',
  },
  {
    brandName: 'Triplixam 10 mg/2.5 mg/10 mg',
    brandNameAr: 'تريبليكسام 10 ملغم/2.5 ملغم/10 ملغم',
    genericName: 'Perindopril + Indapamide + Amlodipine',
    drugClassNameEn: 'Triple Antihypertensive Combinations (ACE Inhibitor + Thiazide-Like Diuretic + Calcium Channel Blocker)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 2.5 mg / 10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Maximum-strength triple substitution therapy for essential hypertension in adult patients already controlled with perindopril/indapamide 10 mg/2.5 mg and amlodipine 10 mg.',
    adultDosage:
      'One film-coated tablet (10 mg/2.5 mg/10 mg) once daily in the morning before a meal (maximum daily dose).',
    contraindications:
      'Moderate or severe renal impairment (CrCl <60 mL/min), dialysis, untreated decompensated heart failure, severe hepatic impairment, hypokalaemia, history of angioedema, second and third trimesters of pregnancy, concomitant sacubitril/valsartan, and sulfonamide hypersensitivity.',
    sideEffects:
      'Peripheral oedema, dry cough, dizziness, headache, flushing, hypokalaemia, hyponatraemia, and hypotension.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture; store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Triplixam (perindopril / indapamide / amlodipine)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2022/09/SmPC_Triplixam_Version-06.2021-Bhn.pdf',
  },
  {
    brandName: 'Viacoram 3.5 mg/2.5 mg',
    brandNameAr: 'فياكورام 3.5 ملغم/2.5 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'First-Line Single-Pill ACE Inhibitor and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '3.5 mg / 2.5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'First-line treatment of essential hypertension in adults.',
    adultDosage:
      'Starting dose: 1 tablet (3.5 mg/2.5 mg) once daily as a single dose, preferably taken in the morning and before a meal; after at least 4 weeks, may be increased to Viacoram 7 mg/5 mg once daily if blood pressure is not adequately controlled.',
    contraindications:
      'History of angioedema, severe renal impairment (CrCl <30 mL/min), second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, unstable heart failure after acute MI, and concomitant sacubitril/valsartan.',
    sideEffects:
      'Dizziness, dry cough, headache, peripheral oedema, somnolence, flushing, and palpitations.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'HPRA / EU Regulatory — Viacoram (perindopril / amlodipine) Authorised Product Information',
    sourceUrl: 'https://www.hpra.ie/find-a-medicine/for-human-use/authorised-medicines/details/18571',
  },
  {
    brandName: 'Viacoram 7 mg/5 mg',
    brandNameAr: 'فياكورام 7 ملغم/5 ملغم',
    genericName: 'Perindopril + Amlodipine',
    drugClassNameEn: 'Single-Pill ACE Inhibitor and Calcium Channel Blocker Combinations',
    dosageForm: 'Tablet',
    strength: '7 mg / 5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled on Viacoram 3.5 mg/2.5 mg.',
    adultDosage:
      'One tablet (7 mg/5 mg) once daily in the morning before a meal.',
    contraindications:
      'History of angioedema, moderate or severe renal impairment (CrCl <60 mL/min), second and third trimesters of pregnancy, severe hypotension, cardiogenic shock, high-grade aortic stenosis, and concomitant sacubitril/valsartan.',
    sideEffects:
      'Peripheral oedema, dry cough, dizziness, headache, flushing, hypotension, and hyperkalaemia.',
    storageConditions:
      'Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'HPRA / EU Regulatory — Viacoram (perindopril / amlodipine) Authorised Product Information',
    sourceUrl: 'https://www.hpra.ie/find-a-medicine/for-human-use/authorised-medicines/details/18571',
  },
  {
    brandName: 'Natrilix SR 1.5 mg',
    brandNameAr: 'ناتريليكس إس آر 1.5 ملغم',
    genericName: 'Indapamide',
    drugClassNameEn: 'Thiazide-Like Sulfonamide Diuretics (Sustained-Release)',
    dosageForm: 'Prolonged-release film-coated tablet',
    strength: '1.5 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Treatment of essential hypertension in adults.',
    adultDosage:
      'One prolonged-release tablet (1.5 mg) every 24 hours, preferably in the morning, swallowed whole with water and not chewed. At higher doses the antihypertensive action of indapamide is not enhanced, whereas the saluretic effect increases.',
    contraindications:
      'Hypersensitivity to indapamide or other sulfonamides, severe renal failure, hepatic encephalopathy or severe impairment of liver function, and hypokalaemia.',
    sideEffects:
      'Hypokalaemia, hyponatraemia, hyperuricaemia, hyperglycaemia, maculopapular rash, photosensitivity, dizziness, fatigue, headache, paraesthesia, and choroidal effusion (acute myopia/angle-closure glaucoma).',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Natrilix SR 1.5 mg (indapamide)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2022/09/SmPC_Natrilix-SR_Version-11.2021.pdf',
  },
  {
    brandName: 'Preductal MR 35 mg',
    brandNameAr: 'بريدكتال إم آر 35 ملغم',
    genericName: 'Trimetazidine',
    drugClassNameEn: 'Metabolic Anti-Ischaemic Agents (3-Ketoacyl-CoA Thiolase Inhibitors)',
    dosageForm: 'Modified-release film-coated tablet',
    strength: '35 mg',
    route: 'Oral',
    packSize: '60 modified-release tablets',
    indications:
      'Add-on therapy for the symptomatic treatment of adult patients with stable angina pectoris who are inadequately controlled by or intolerant to first-line antianginal therapies.',
    adultDosage:
      'One modified-release tablet of 35 mg twice daily during meals (1 tablet in the morning and 1 tablet in the evening). In moderate renal impairment (CrCl 30–60 mL/min), reduce dose to 1 tablet (35 mg) once daily in the morning during breakfast.',
    contraindications:
      'Hypersensitivity to trimetazidine, Parkinson’s disease, parkinsonian symptoms, tremors, restless legs syndrome, and other related movement disorders, and severe renal impairment (CrCl <30 mL/min).',
    sideEffects:
      'Dizziness, headache, abdominal pain, diarrhoea, dyspepsia, nausea, vomiting, rash, pruritus, urticaria, asthenia, and reversible extrapyramidal / parkinsonian symptoms (tremor, akinesia, hypertonia; discontinue permanently if these occur).',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA Article 31 Referral — Preductal MR (trimetazidine 35 mg) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/documents/referral/trimetazidine-article-31-annex-i_en.pdf',
  },
  {
    brandName: 'Procoralan 5 mg',
    brandNameAr: 'بروكورالان 5 ملغم',
    genericName: 'Ivabradine',
    drugClassNameEn: 'Selective Sinus Node If Current Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'Symptomatic treatment of chronic stable angina pectoris in coronary artery disease adults with normal sinus rhythm and heart rate ≥70 bpm (in patients intolerant to or with a contraindication to beta-blockers, or in combination with beta-blockers); and treatment of chronic heart failure NYHA II to IV class with systolic dysfunction, in patients in sinus rhythm and whose heart rate is ≥75 bpm, in combination with standard therapy including beta-blocker therapy or when beta-blocker therapy is contraindicated or not tolerated.',
    adultDosage:
      'Usual starting dose is 5 mg twice daily (morning and evening during meals); in patients aged ≥75 years, start at 2.5 mg twice daily (half a 5 mg scored tablet twice daily). After 2–4 weeks, adjust to 7.5 mg twice daily if resting heart rate remains persistently >60 bpm, or reduce to 2.5 mg twice daily if resting heart rate falls persistently <50 bpm.',
    contraindications:
      'Resting heart rate below 70 bpm prior to treatment, cardiogenic shock, acute myocardial infarction, severe hypotension (<90/50 mmHg), severe hepatic insufficiency, sick sinus syndrome, sino-atrial block, unstable or acute heart failure, pacemaker dependence, unstable angina, third-degree AV block, combination with strong CYP3A4 inhibitors (azole antifungals, macrolides, HIV protease inhibitors, nefazodone), combination with verapamil or diltiazem, and pregnancy/lactation.',
    sideEffects:
      'Luminous phenomena (phosphenes — transient enhanced brightness in visual field), blurred vision, bradycardia, first-degree AV block, ventricular extrasystoles, atrial fibrillation, uncontrolled blood pressure, and headache.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Procoralan (ivabradine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/procoralan',
  },
  {
    brandName: 'Procoralan 7.5 mg',
    brandNameAr: 'بروكورالان 7.5 ملغم',
    genericName: 'Ivabradine',
    drugClassNameEn: 'Selective Sinus Node If Current Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '7.5 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'Maintenance treatment of chronic stable angina pectoris and chronic heart failure with systolic dysfunction in patients in sinus rhythm whose resting heart rate remains >60 bpm after 2–4 weeks on ivabradine 5 mg twice daily.',
    adultDosage:
      '7.5 mg taken orally twice daily (one tablet in the morning and one in the evening during meals; maximum dose 7.5 mg twice daily). Avoid grapefruit juice.',
    contraindications:
      'Pre-treatment resting heart rate <70 bpm, cardiogenic shock, acute MI, severe hypotension (<90/50 mmHg), severe hepatic insufficiency, sick sinus syndrome, sino-atrial block, third-degree AV block, pacemaker dependence, concomitant strong CYP3A4 inhibitors, concomitant verapamil or diltiazem, and pregnancy/lactation.',
    sideEffects:
      'Phosphenes (visual luminous phenomena), bradycardia, atrial fibrillation, headache, dizziness, and blurred vision.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Procoralan (ivabradine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/procoralan',
  },

  // =========================================================================
  // 2. PHLEBOLOGY & DIABETES — DAFLON & DIAMICRON MR (4 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Daflon 500 mg',
    brandNameAr: 'دافلون 500 ملغم',
    genericName: 'Diosmin + Hesperidin',
    drugClassNameEn: 'Micronised Purified Flavonoid Fraction (MPFF) Venotonics and Vasculoprotectors',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg (450 mg diosmin + 50 mg hesperidin)',
    route: 'Oral',
    packSize: '30 film-coated tablets (or 60 tablets)',
    indications:
      'Treatment of symptoms related to venolymphatic insufficiency (heavy legs, pain, early morning restless legs); and treatment of functional symptoms related to acute haemorrhoidal attack.',
    adultDosage:
      'Venolymphatic insufficiency: 2 tablets daily in two divided doses (1 tablet at midday and 1 tablet in the evening) at meal times. Acute haemorrhoidal attack: 6 tablets per day (3 tablets twice daily) for the first 4 days, then 4 tablets per day (2 tablets twice daily) for the next 3 days at meal times.',
    contraindications:
      'Hypersensitivity to micronised purified flavonoid fraction or any of the excipients.',
    sideEffects:
      'Diarrhoea, dyspepsia, nausea, vomiting, colitis, dizziness, headache, malaise, rash, pruritus, and urticaria.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Vascular Surgery', 'General Surgery', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'Servier Middle East Official SmPC — Daflon (micronised purified flavonoid fraction)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Daflon-1000mg-SmPC-Version-01.2019-LEBANON.pdf',
  },
  {
    brandName: 'Daflon 1000 mg',
    brandNameAr: 'دافلون 1000 ملغم',
    genericName: 'Diosmin + Hesperidin',
    drugClassNameEn: 'Micronised Purified Flavonoid Fraction (MPFF) Venotonics and Vasculoprotectors',
    dosageForm: 'Film-coated tablet',
    strength: '1000 mg (900 mg diosmin + 100 mg hesperidin)',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Treatment of symptoms related to venolymphatic insufficiency (heavy legs, pain, early morning restless legs) and treatment of functional symptoms related to acute haemorrhoidal attack.',
    adultDosage:
      'Venolymphatic insufficiency: 1 tablet (1000 mg) once daily at meal time. Acute haemorrhoidal attack: 3 tablets daily (1 tablet morning, midday, and evening) for the first 4 days, then 2 tablets daily (1 tablet morning and evening) for the next 3 days at meal times.',
    contraindications:
      'Hypersensitivity to micronised purified flavonoid fraction or any of the excipients.',
    sideEffects:
      'Diarrhoea, dyspepsia, nausea, vomiting, colitis, headache, dizziness, and mild cutaneous reactions.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Vascular Surgery', 'General Surgery', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Daflon 1000 mg (micronised purified flavonoid fraction)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Daflon-1000mg-SmPC-Version-01.2019-LEBANON.pdf',
  },
  {
    brandName: 'Diamicron MR 30 mg',
    brandNameAr: 'دياميكرون إم آر 30 ملغم',
    genericName: 'Gliclazide',
    drugClassNameEn: 'Second-Generation Sulfonylurea Antidiabetics (Modified-Release)',
    dosageForm: 'Modified-release tablet',
    strength: '30 mg',
    route: 'Oral',
    packSize: '60 modified-release tablets',
    indications:
      'Non-insulin-dependent diabetes (type 2) in adults when dietary measures, physical exercise, and weight loss alone are not sufficient to control blood glucose.',
    adultDosage:
      'Daily dose may vary from 1 to 4 tablets (30 mg to 120 mg) taken orally as a single dose at breakfast time. Initial recommended dose is 30 mg (1 tablet) once daily at breakfast; adjust in 30 mg steps at intervals of at least 1 month according to glycaemic response (maximum 120 mg once daily). Swallow whole without crushing or chewing.',
    contraindications:
      'Hypersensitivity to gliclazide, other sulfonylureas, or sulfonamides; type 1 diabetes mellitus; diabetic pre-coma and coma, diabetic ketoacidosis; severe renal or hepatic insufficiency; treatment with miconazole; and lactation.',
    sideEffects:
      'Hypoglycaemia (especially if meals are irregular or skipped), abdominal pain, nausea, vomiting, dyspepsia, diarrhoea, constipation, rash, pruritus, and rare haematological or hepatic enzyme changes.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Diamicron MR (gliclazide)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Diamicron-MR-SmPC-Version-03.2020-KSA.pdf',
  },
  {
    brandName: 'Diamicron MR 60 mg',
    brandNameAr: 'دياميكرون إم آر 60 ملغم',
    genericName: 'Gliclazide',
    drugClassNameEn: 'Second-Generation Sulfonylurea Antidiabetics (Breakable Modified-Release)',
    dosageForm: 'Modified-release tablet (scored)',
    strength: '60 mg',
    route: 'Oral',
    packSize: '30 modified-release tablets',
    indications:
      'Non-insulin-dependent diabetes (type 2) in adults when dietary measures, physical exercise, and weight loss alone are not sufficient to control blood glucose.',
    adultDosage:
      'Half to 2 tablets (30 mg to 120 mg) taken orally as a single daily dose at breakfast time (initial dose 30 mg = half a scored 60 mg tablet once daily at breakfast; maximum daily dose 120 mg = two 60 mg tablets once daily). Do not crush or chew.',
    contraindications:
      'Hypersensitivity to gliclazide, other sulfonylureas, or sulfonamides; type 1 diabetes; diabetic ketoacidosis or coma; severe renal or hepatic insufficiency; concomitant miconazole; and breast-feeding.',
    sideEffects:
      'Hypoglycaemia, gastrointestinal disturbances (nausea, dyspepsia, diarrhoea, constipation), skin rash/urticaria, and transient visual disturbances at treatment initiation.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Servier Middle East Official SmPC — Diamicron MR 60 mg (gliclazide)',
    sourceUrl: 'https://myservier-me.com/wp-content/uploads/2023/05/Diamicron-MR-SmPC-Version-03.2020-KSA.pdf',
  },

  // =========================================================================
  // 3. NEUROSCIENCE & ONCOLOGY — VALDOXAN, LONSURF, ONIVYDE, TIBSOVO (5 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Valdoxan 25 mg',
    brandNameAr: 'فالدوكسان 25 ملغم',
    genericName: 'Agomelatine',
    drugClassNameEn: 'Melatonergic Agonist (MT1/MT2) and 5-HT2C Antagonist Antidepressants',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of major depressive episodes in adults.',
    adultDosage:
      'Recommended dose is 25 mg (1 tablet) taken orally once daily at bedtime with or without food; after 2 weeks of treatment, if there is no improvement of symptoms, the dose may be increased to 50 mg (two 25 mg tablets) once daily at bedtime. Perform liver function tests in all patients at baseline and after 3, 6, 12, and 24 weeks.',
    contraindications:
      'Hepatic impairment (cirrhosis or active liver disease) or transaminases exceeding 3 times the upper limit of normal; concomitant use of potent CYP1A2 inhibitors (such as fluvoxamine or ciprofloxacin); and hypersensitivity to agomelatine.',
    sideEffects:
      'Headache, dizziness, somnolence, insomnia, anxiety, nausea, diarrhoea, constipation, abdominal pain, hyperhidrosis, back pain, fatigue, and elevated serum ALT and/or AST.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'EMA EPAR — Valdoxan (agomelatine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/valdoxan',
  },
  {
    brandName: 'Lonsurf 15 mg/6.14 mg',
    brandNameAr: 'لونسورف 15 ملغم/6.14 ملغم',
    genericName: 'Trifluridine + Tipiracil',
    drugClassNameEn: 'Antineoplastic Thymidine-Based Nucleoside Analogue and Thymidine Phosphorylase Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '15 mg / 6.14 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets (or 60 tablets)',
    indications:
      'In combination with bevacizumab, or as monotherapy, for the treatment of adult patients with metastatic colorectal cancer (mCRC) who have received two prior anticancer treatment regimens including fluoropyrimidine-, oxaliplatin- and irinotecan-based chemotherapies, anti-VEGF agents, and/or anti-EGFR agents; and as monotherapy for adult patients with metastatic gastric cancer including adenocarcinoma of the gastro-oesophageal junction who have been previously treated with at least two prior systemic treatment regimens.',
    adultDosage:
      'Recommended starting dose in adults is 35 mg/m²/dose (based on trifluridine component; maximum 80 mg/dose) administered orally twice daily on Days 1 to 5 and Days 8 to 12 of each 28-day cycle, taken within 1 hour after completion of morning and evening meals.',
    contraindications:
      'Hypersensitivity to trifluridine, tipiracil, or any of the excipients.',
    sideEffects:
      'Neutropenia, leukopenia, anaemia, thrombocytopenia, febrile neutropenia, nausea, vomiting, diarrhoea, decreased appetite, fatigue, stomatitis, and alopecia.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR — Lonsurf (trifluridine / tipiracil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lonsurf',
  },
  {
    brandName: 'Lonsurf 20 mg/8.19 mg',
    brandNameAr: 'لونسورف 20 ملغم/8.19 ملغم',
    genericName: 'Trifluridine + Tipiracil',
    drugClassNameEn: 'Antineoplastic Thymidine-Based Nucleoside Analogue and Thymidine Phosphorylase Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg / 8.19 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets (or 60 tablets)',
    indications:
      'Treatment of adult patients with refractory metastatic colorectal cancer (as monotherapy or in combination with bevacizumab) and refractory metastatic gastric / gastro-oesophageal junction adenocarcinoma.',
    adultDosage:
      '35 mg/m²/dose (based on trifluridine component, combining 15 mg and 20 mg tablets according to body surface area; maximum 80 mg/dose) taken orally twice daily on Days 1–5 and Days 8–12 of each 28-day cycle within 1 hour after morning and evening meals. Obtain complete blood cell counts prior to each cycle and on Day 15.',
    contraindications:
      'Hypersensitivity to trifluridine, tipiracil, or any of the excipients.',
    sideEffects:
      'Myelosuppression (neutropenia, anaemia, thrombocytopenia), nausea, diarrhoea, vomiting, fatigue, decreased appetite, and pyrexia.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR — Lonsurf (trifluridine / tipiracil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lonsurf',
  },
  {
    brandName: 'Onivyde pegylated liposomal 4.3 mg/mL',
    brandNameAr: 'أونيفايد 4.3 ملغم/مل',
    genericName: 'Irinotecan',
    drugClassNameEn: 'Topoisomerase I Inhibitors (Pegylated Liposomal Formulation)',
    dosageForm: 'Concentrate for dispersion for infusion',
    strength: '4.3 mg/mL (43 mg / 10 mL vial as irinotecan anhydrous free base)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of metastatic adenocarcinoma of the pancreas, in combination with 5-fluorouracil (5-FU) and leucovorin (LV) in adult patients who have progressed following gemcitabine-based therapy, or in combination with oxaliplatin, 5-FU, and LV (NALIRIFOX) for first-line treatment of adult patients with metastatic adenocarcinoma of the pancreas.',
    adultDosage:
      'Post-gemcitabine (with 5-FU/LV): 70 mg/m² (or 50 mg/m² in UGT1A1*28 homozygous patients) infused IV over 90 minutes every 2 weeks. First-line NALIRIFOX: 50 mg/m² infused IV over 90 minutes on Day 1 and Day 15 of each 28-day cycle. Do not substitute on a mg-for-mg basis with non-liposomal irinotecan.',
    contraindications:
      'History of severe hypersensitivity to irinotecan or any of the excipients, and breast-feeding.',
    sideEffects:
      'Diarrhoea (early cholinergic and late-onset; treat promptly with atropine/loperamide), neutropenia, nausea, vomiting, decreased appetite, stomatitis, asthenia, anaemia, thrombocytopenia, and alopecia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR — Onivyde pegylated liposomal (irinotecan) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/onivyde-pegylated-liposomal',
  },
  {
    brandName: 'Tibsovo 250 mg',
    brandNameAr: 'تيبسوفو 250 ملغم',
    genericName: 'Ivosidenib',
    drugClassNameEn: 'Isocitrate Dehydrogenase-1 (IDH1) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '250 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'In combination with azacitidine for the treatment of adult patients with newly diagnosed acute myeloid leukaemia (AML) with an IDH1 R132 mutation who are not eligible to receive standard induction chemotherapy; and as monotherapy for the treatment of adult patients with locally advanced or metastatic cholangiocarcinoma with an IDH1 R132 mutation who were previously treated by at least one prior line of systemic therapy.',
    adultDosage:
      'Recommended dose is 500 mg (two 250 mg tablets) taken orally once daily at about the same time each day; do not eat food for 2 hours before and for 1 hour after taking each dose (avoid high-fat meals). Reduce to 250 mg once daily if co-administered with strong CYP3A4 inhibitors.',
    contraindications:
      'Hypersensitivity to ivosidenib, co-administration with strong CYP3A4 inducers or dabigatran, and congenital long QT syndrome, family history of sudden death or polymorphic ventricular arrhythmia, or QT/QTc interval >500 msec.',
    sideEffects:
      'Differentiation syndrome (in AML — treat promptly with dexamethasone), ECG QT prolongation, leukocytosis, neutropenia, thrombocytopenia, diarrhoea, nausea, vomiting, abdominal pain, fatigue, and decreased appetite.',
    storageConditions:
      'Keep the bottle tightly closed in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA EPAR — Tibsovo (ivosidenib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tibsovo',
  },
];

export const SERVIER_PRODUCTS: AiProductDraft[] = SERVIER_COMPACT_PRODUCTS.map(toServierProductDraft);
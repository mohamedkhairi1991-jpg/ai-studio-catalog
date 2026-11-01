import type { AiProductDraft } from './catalog';

interface CompactSanofiDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  activeIngredients: string[];
  drugClass: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

function toSanofiDraft(item: CompactSanofiDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.activeIngredients,
    drugClass: item.drugClass,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.approvedIndications,
      usualAdultDose: item.usualAdultDose,
      contraindications: item.contraindications,
      commonAdverseEffects: item.commonAdverseEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: [{ title: item.sourceTitle, url: item.sourceUrl }],
    notes: 'Official Sanofi product presentation marketed in Iraq.',
  };
}

const SANOFI_COMPACT_PRODUCTS: CompactSanofiDrug[] = [
  // ============================================================================
  // 1. CARDIOVASCULAR, THROMBOSIS & ANTICOAGULANTS
  // ============================================================================
  {
    brandName: 'Plavix 75 mg',
    brandNameAr: 'بلافيكس ٧٥ ملغ',
    genericName: 'Clopidogrel bisulfate',
    activeIngredients: ['Clopidogrel'],
    drugClass: 'P2Y12 Platelet Aggregation Inhibitors',
    strength: '75 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Secondary prevention of atherothrombotic events in adult patients suffering from myocardial infarction, ischemic stroke, or established peripheral arterial disease; acute coronary syndrome (unstable angina / NSTEMI or STEMI) in combination with acetylsalicylic acid (ASA); prevention of atherothrombotic and thromboembolic events in atrial fibrillation (with ASA when oral anticoagulants are unsuitable).',
    usualAdultDose:
      '75 mg orally once daily with or without food. In acute coronary syndrome or high-risk TIA/minor ischemic stroke, initiate with a 300 mg (or 600 mg) loading dose followed by 75 mg once daily in combination with ASA (75–100 mg daily).',
    contraindications:
      'Hypersensitivity to clopidogrel or any excipient; severe hepatic impairment; active pathological bleeding such as peptic ulcer or intracranial hemorrhage.',
    commonAdverseEffects:
      'Hematoma, epistaxis, gastrointestinal hemorrhage, diarrhea, abdominal pain, dyspepsia, bruising, and puncture site bleeding.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Neurology', 'Internal Medicine', 'Vascular Surgery'],
    sourceTitle: 'Plavix (clopidogrel) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/plavix',
  },
  {
    brandName: 'Plavix 300 mg',
    brandNameAr: 'بلافيكس ٣٠٠ ملغ جرعة تحميل',
    genericName: 'Clopidogrel bisulfate',
    activeIngredients: ['Clopidogrel'],
    drugClass: 'P2Y12 Platelet Aggregation Inhibitors',
    strength: '300 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '10 film-coated tablets',
    approvedIndications:
      'Single loading-dose presentation for adult patients with acute coronary syndrome (non-ST-segment elevation acute coronary syndrome including unstable angina/NSTEMI, or acute ST-segment elevation myocardial infarction) and for patients undergoing percutaneous coronary intervention (PCI).',
    usualAdultDose:
      'Single 300 mg oral loading dose (one 300 mg tablet) upon presentation, followed by maintenance therapy with Plavix 75 mg once daily plus low-dose ASA (75–325 mg initially, then 75–100 mg daily).',
    contraindications:
      'Hypersensitivity to clopidogrel; severe hepatic impairment; active pathological bleeding (peptic ulcer or intracranial hemorrhage).',
    commonAdverseEffects:
      'Gastrointestinal hemorrhage, hematoma, epistaxis, bruising, puncture site hemorrhage, dyspepsia, abdominal pain, and diarrhea.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Emergency Medicine', 'Internal Medicine'],
    sourceTitle: 'Plavix (clopidogrel) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/plavix',
  },
  {
    brandName: 'CoPlavix 75 mg / 100 mg',
    brandNameAr: 'كو-بلافيكس ٧٥ ملغ / ١٠٠ ملغ',
    genericName: 'Clopidogrel + Acetylsalicylic acid',
    activeIngredients: ['Clopidogrel', 'Acetylsalicylic acid'],
    drugClass: 'Dual Antiplatelet Combinations (DAPT)',
    strength: '75 mg / 100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Secondary prevention of atherothrombotic events in adult patients already taking both clopidogrel and acetylsalicylic acid (ASA) for non-ST segment elevation acute coronary syndrome (unstable angina or non-Q-wave MI), including patients undergoing stent placement following PCI, or ST-segment elevation acute myocardial infarction.',
    usualAdultDose:
      'One 75 mg / 100 mg film-coated tablet once daily, with or without food, in patients stabilized on individual clopidogrel 75 mg and ASA 100 mg.',
    contraindications:
      'Hypersensitivity to clopidogrel, ASA, or NSAIDs; syndrome of asthma, rhinitis, and nasal polyps; severe hepatic or severe renal impairment (CrCl < 30 mL/min); active pathological bleeding; third trimester of pregnancy.',
    commonAdverseEffects:
      'Hematoma, epistaxis, gastrointestinal hemorrhage, dyspepsia, abdominal pain, diarrhea, bruising, and surgical/puncture site bleeding.',
    storageConditions: 'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'DuoPlavin / CoPlavix (clopidogrel / acetylsalicylic acid) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/duoplavin',
  },
  {
    brandName: 'Clexane 2000 IU (20 mg/0.2 mL)',
    brandNameAr: 'كليكسان ٢٠٠٠ وحدة دولية (٢٠ ملغ / ٠.٢ مل) محقنة مسبقة التعبئة',
    genericName: 'Enoxaparin sodium',
    activeIngredients: ['Enoxaparin sodium'],
    drugClass: 'Low Molecular Weight Heparins (LMWH)',
    strength: '2000 IU (20 mg) / 0.2 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous / Intravenous (hemodialysis)',
    packSize: '2 pre-filled syringes x 0.2 mL',
    approvedIndications:
      'Prophylaxis of venous thromboembolism (VTE) in surgical patients at moderate risk (general surgery); prophylaxis of VTE in patients with severe renal impairment (CrCl 15–30 mL/min); prevention of thrombus formation in extracorporeal circulation during hemodialysis.',
    usualAdultDose:
      'Moderate-risk surgical VTE prophylaxis: 2000 IU (20 mg) by subcutaneous injection once daily, initiated 2 hours before surgery. Severe renal impairment (CrCl 15–30 mL/min) prophylaxis: 2000 IU (20 mg) SC once daily.',
    contraindications:
      'Hypersensitivity to enoxaparin, heparin, or heparin derivatives; history of immune-mediated heparin-induced thrombocytopenia (HIT) within the past 100 days or in the presence of circulating antibodies; active clinically significant bleeding and conditions with a high risk of hemorrhage.',
    commonAdverseEffects:
      'Hemorrhage, injection site hematoma/ecchymosis, thrombocytosis, thrombocytopenia, and transient asymptomatic elevation of hepatic transaminases (ALT, AST).',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['General Surgery', 'Orthopedics', 'Obstetrics & Gynecology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Clexane (enoxaparin sodium) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/clexane',
  },
  {
    brandName: 'Clexane 4000 IU (40 mg/0.4 mL)',
    brandNameAr: 'كليكسان ٤٠٠٠ وحدة دولية (٤٠ ملغ / ٠.٤ مل) محقنة مسبقة التعبئة',
    genericName: 'Enoxaparin sodium',
    activeIngredients: ['Enoxaparin sodium'],
    drugClass: 'Low Molecular Weight Heparins (LMWH)',
    strength: '4000 IU (40 mg) / 0.4 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous / Intravenous',
    packSize: '2 pre-filled syringes x 0.4 mL',
    approvedIndications:
      'Prophylaxis of venous thromboembolic disease in moderate- and high-risk surgical patients (especially orthopedic or oncological surgery) and in acutely ill medical patients with reduced mobility (heart failure, respiratory failure, severe infections, or rheumatic diseases).',
    usualAdultDose:
      '4000 IU (40 mg) administered by deep subcutaneous injection once daily into the anterolateral or posterolateral abdominal wall.',
    contraindications:
      'Hypersensitivity to enoxaparin or heparin; history of immune-mediated HIT within the last 100 days; active major bleeding; recent hemorrhagic stroke; spinal/epidural anesthesia with therapeutic doses.',
    commonAdverseEffects:
      'Bleeding manifestations, injection site hematoma/pain, thrombocytopenia or reactive thrombocytosis, and elevated hepatic transaminases.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Internal Medicine', 'Orthopedics', 'General Surgery', 'Obstetrics & Gynecology', 'Cardiology'],
    sourceTitle: 'Clexane (enoxaparin sodium) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/clexane',
  },
  {
    brandName: 'Clexane 6000 IU (60 mg/0.6 mL)',
    brandNameAr: 'كليكسان ٦٠٠٠ وحدة دولية (٦٠ ملغ / ٠.٦ مل) محقنة مسبقة التعبئة',
    genericName: 'Enoxaparin sodium',
    activeIngredients: ['Enoxaparin sodium'],
    drugClass: 'Low Molecular Weight Heparins (LMWH)',
    strength: '6000 IU (60 mg) / 0.6 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous / Intravenous',
    packSize: '2 pre-filled syringes x 0.6 mL',
    approvedIndications:
      'Treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE); treatment of unstable angina, NSTEMI, and acute STEMI in combination with antiplatelet therapy.',
    usualAdultDose:
      'Weight-based therapeutic dosing: 100 IU/kg (1 mg/kg) subcutaneously every 12 hours (i.e., 6000 IU / 60 mg twice daily for a 60 kg patient) or 150 IU/kg (1.5 mg/kg) once daily. Reduce to 100 IU/kg (1 mg/kg) once daily if CrCl 15–30 mL/min.',
    contraindications:
      'Active major bleeding; history of immune-mediated HIT; hypersensitivity to enoxaparin or heparin; neuraxial (spinal/epidural) anesthesia during therapeutic anticoagulation.',
    commonAdverseEffects:
      'Hemorrhage (gastrointestinal, retroperitoneal, or procedural), injection site hematoma, thrombocytopenia, and hepatic transaminase elevations.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Cardiology', 'Internal Medicine', 'Vascular Surgery', 'Pulmonology', 'Obstetrics & Gynecology'],
    sourceTitle: 'Clexane (enoxaparin sodium) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/clexane',
  },
  {
    brandName: 'Clexane 8000 IU (80 mg/0.8 mL)',
    brandNameAr: 'كليكسان ٨٠٠٠ وحدة دولية (٨٠ ملغ / ٠.٨ مل) محقنة مسبقة التعبئة',
    genericName: 'Enoxaparin sodium',
    activeIngredients: ['Enoxaparin sodium'],
    drugClass: 'Low Molecular Weight Heparins (LMWH)',
    strength: '8000 IU (80 mg) / 0.8 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous / Intravenous',
    packSize: '2 pre-filled syringes x 0.8 mL',
    approvedIndications:
      'Full therapeutic anticoagulation for deep vein thrombosis (DVT), pulmonary embolism (PE), unstable angina, NSTEMI, and acute STEMI in adult patients (~80 kg body weight).',
    usualAdultDose:
      '100 IU/kg (1 mg/kg) subcutaneously every 12 hours (8000 IU / 80 mg twice daily for an 80 kg patient) or 150 IU/kg (1.5 mg/kg) once daily.',
    contraindications:
      'Active major bleeding; history of immune-mediated HIT; hypersensitivity to enoxaparin or heparin; spinal/epidural anesthesia with therapeutic doses.',
    commonAdverseEffects:
      'Major or minor bleeding, injection site ecchymosis/hematoma, thrombocytopenia, hyperkalemia, and elevated liver enzymes.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Cardiology', 'Internal Medicine', 'Pulmonology', 'Vascular Surgery'],
    sourceTitle: 'Clexane (enoxaparin sodium) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/clexane',
  },
  {
    brandName: 'Aprovel 150 mg',
    brandNameAr: 'أبروفيل ١٥٠ ملغ',
    genericName: 'Irbesartan',
    activeIngredients: ['Irbesartan'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '150 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Treatment of essential hypertension in adults; treatment of renal disease in adult patients with hypertension and type 2 diabetes mellitus as part of an antihypertensive medicinal regimen.',
    usualAdultDose:
      'Recommended initial and maintenance dose is 150 mg once daily, with or without food. May be increased to 300 mg once daily if blood pressure is insufficiently controlled or as target maintenance dose for hypertensive type 2 diabetic nephropathy.',
    contraindications:
      'Hypersensitivity to irbesartan; second and third trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    commonAdverseEffects:
      'Dizziness, orthostatic dizziness, orthostatic hypotension, nausea/vomiting, fatigue, musculoskeletal pain, and hyperkalemia (especially in diabetic renal disease).',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Aprovel (irbesartan) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aprovel',
  },
  {
    brandName: 'Aprovel 300 mg',
    brandNameAr: 'أبروفيل ٣٠٠ ملغ',
    genericName: 'Irbesartan',
    activeIngredients: ['Irbesartan'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '300 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Maintenance treatment of essential hypertension and target renoprotective dose for nephropathy in hypertensive patients with type 2 diabetes mellitus.',
    usualAdultDose:
      '300 mg orally once daily, with or without food.',
    contraindications:
      'Hypersensitivity to irbesartan; second and third trimesters of pregnancy; concomitant aliskiren in diabetes or moderate-to-severe renal impairment.',
    commonAdverseEffects:
      'Dizziness, orthostatic hypotension, hyperkalemia, fatigue, nausea, and elevated serum creatinine or BUN.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Aprovel (irbesartan) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aprovel',
  },
  {
    brandName: 'CoAprovel 150 mg / 12.5 mg',
    brandNameAr: 'كو-أبروفيل ١٥٠ ملغ / ١٢.٥ ملغ',
    genericName: 'Irbesartan + Hydrochlorothiazide',
    activeIngredients: ['Irbesartan', 'Hydrochlorothiazide'],
    drugClass: 'ARB & Thiazide Diuretic Combinations',
    strength: '150 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on irbesartan or hydrochlorothiazide alone.',
    usualAdultDose:
      'One tablet (150 mg irbesartan / 12.5 mg hydrochlorothiazide) once daily, with or without food.',
    contraindications:
      'Hypersensitivity to active substances or sulfonamide derivatives; second and third trimesters of pregnancy; severe renal impairment (CrCl < 30 mL/min); refractory hypokalemia or hypercalcemia; biliary cirrhosis and cholestasis; concomitant aliskiren in diabetes/renal impairment.',
    commonAdverseEffects:
      'Dizziness, fatigue, nausea/vomiting, abnormal urination, elevated BUN/creatinine, electrolyte imbalances (hypokalemia, hyponatremia), and hyperuricemia.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'CoAprovel (irbesartan / hydrochlorothiazide) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/coaprovel',
  },
  {
    brandName: 'CoAprovel 300 mg / 12.5 mg',
    brandNameAr: 'كو-أبروفيل ٣٠٠ ملغ / ١٢.٥ ملغ',
    genericName: 'Irbesartan + Hydrochlorothiazide',
    activeIngredients: ['Irbesartan', 'Hydrochlorothiazide'],
    drugClass: 'ARB & Thiazide Diuretic Combinations',
    strength: '300 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Essential hypertension in adults inadequately controlled on irbesartan 300 mg monotherapy or CoAprovel 150/12.5 mg.',
    usualAdultDose:
      'One tablet (300 mg irbesartan / 12.5 mg hydrochlorothiazide) orally once daily, with or without food.',
    contraindications:
      'Hypersensitivity to irbesartan, thiazides, or sulfonamides; second and third trimesters of pregnancy; severe renal impairment (CrCl < 30 mL/min); refractory hypokalemia/hypercalcemia; severe hepatic impairment/cholestasis.',
    commonAdverseEffects:
      'Dizziness, orthostatic hypotension, fatigue, nausea, hypokalemia or hyperkalemia, hyperuricemia, and elevated serum creatinine.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'CoAprovel (irbesartan / hydrochlorothiazide) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/coaprovel',
  },
  {
    brandName: 'CoAprovel 300 mg / 25 mg',
    brandNameAr: 'كو-أبروفيل ٣٠٠ ملغ / ٢٥ ملغ',
    genericName: 'Irbesartan + Hydrochlorothiazide',
    activeIngredients: ['Irbesartan', 'Hydrochlorothiazide'],
    drugClass: 'ARB & Thiazide Diuretic Combinations',
    strength: '300 mg / 25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Essential hypertension in adult patients whose blood pressure is not adequately controlled by CoAprovel 300 mg / 12.5 mg.',
    usualAdultDose:
      'One tablet (300 mg irbesartan / 25 mg hydrochlorothiazide) orally once daily (maximum recommended daily dose).',
    contraindications:
      'Hypersensitivity to irbesartan or sulfonamide-derived diuretics; second and third trimesters of pregnancy; severe renal impairment (CrCl < 30 mL/min); refractory hypokalemia/hypercalcemia; biliary cirrhosis/cholestasis.',
    commonAdverseEffects:
      'Dizziness, hypotension, hypokalemia, hyponatremia, hyperuricemia/gout, hyperglycemia, and fatigue.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'CoAprovel (irbesartan / hydrochlorothiazide) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/coaprovel',
  },
  {
    brandName: 'Aprovasc 150 mg / 5 mg',
    brandNameAr: 'أبروفسك ١٥٠ ملغ / ٥ ملغ',
    genericName: 'Irbesartan + Amlodipine besylate',
    activeIngredients: ['Irbesartan', 'Amlodipine'],
    drugClass: 'ARB & Calcium Channel Blocker Combinations',
    strength: '150 mg / 5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on irbesartan or amlodipine monotherapy.',
    usualAdultDose:
      'One tablet (150 mg irbesartan / 5 mg amlodipine) orally once daily, with or without food.',
    contraindications:
      'Hypersensitivity to irbesartan, amlodipine, or dihydropyridine derivatives; second and third trimesters of pregnancy; cardiogenic shock; severe aortic stenosis; unstable angina or hypotension; concomitant aliskiren in diabetes or renal impairment.',
    commonAdverseEffects:
      'Peripheral edema, dizziness, headache, flushing, palpitations, orthostatic hypotension, and fatigue.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Aprovasc (irbesartan / amlodipine) — Official SmPC Summary',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aprovel',
  },
  {
    brandName: 'Aprovasc 300 mg / 10 mg',
    brandNameAr: 'أبروفسك ٣٠٠ ملغ / ١٠ ملغ',
    genericName: 'Irbesartan + Amlodipine besylate',
    activeIngredients: ['Irbesartan', 'Amlodipine'],
    drugClass: 'ARB & Calcium Channel Blocker Combinations',
    strength: '300 mg / 10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of essential hypertension in adults requiring high-strength dual ARB and dihydropyridine calcium channel blocker therapy.',
    usualAdultDose:
      'One tablet (300 mg irbesartan / 10 mg amlodipine) orally once daily.',
    contraindications:
      'Second and third trimesters of pregnancy; severe hypotension; shock; hemodynamically unstable heart failure after acute MI; severe left ventricular outflow tract obstruction; concomitant aliskiren in diabetes/renal impairment.',
    commonAdverseEffects:
      'Peripheral ankle edema, flushing, dizziness, headache, palpitations, and somnolence.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Aprovasc (irbesartan / amlodipine) — Official SmPC Summary',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aprovel',
  },
  {
    brandName: 'Tritace 2.5 mg',
    brandNameAr: 'تريتاس ٢.٥ ملغ',
    genericName: 'Ramipril',
    activeIngredients: ['Ramipril'],
    drugClass: 'ACE Inhibitors',
    strength: '2.5 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '28 scored tablets',
    approvedIndications:
      'Treatment of hypertension; cardiovascular prevention (reduction of cardiovascular morbidity and mortality in patients with manifest atherothrombotic cardiovascular disease or diabetes with at least one cardiovascular risk factor); diabetic or non-diabetic glomerular nephropathy; symptomatic heart failure; secondary prevention after acute myocardial infarction.',
    usualAdultDose:
      'Hypertension / CV prevention: start at 2.5 mg once daily, titrated to 5–10 mg once daily. Heart failure / nephropathy initiation: start at 1.25 mg or 2.5 mg once daily and titrate gradually up to max 10 mg daily.',
    contraindications:
      'Hypersensitivity to ramipril or any ACE inhibitor; history of angioedema; extracorporeal treatments leading to contact of blood with negatively charged surfaces; significant bilateral renal artery stenosis; second and third trimesters of pregnancy; concomitant sacubitril/valsartan or aliskiren in diabetes/renal impairment.',
    commonAdverseEffects:
      'Dry non-productive irritating cough, headache, dizziness, hypotension, hyperkalemia, gastrointestinal inflammation/nausea, and muscle cramps.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Tritace (ramipril) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/tritace',
  },
  {
    brandName: 'Tritace 5 mg',
    brandNameAr: 'تريتاس ٥ ملغ',
    genericName: 'Ramipril',
    activeIngredients: ['Ramipril'],
    drugClass: 'ACE Inhibitors',
    strength: '5 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '28 scored tablets',
    approvedIndications:
      'Hypertension, cardiovascular risk reduction, diabetic and non-diabetic nephropathy, chronic heart failure, and post-myocardial infarction secondary prevention.',
    usualAdultDose:
      '5 mg orally once daily (or 2.5 mg twice daily post-MI), titrated up to 10 mg daily as needed.',
    contraindications:
      'History of angioedema; second and third trimesters of pregnancy; bilateral renal artery stenosis; concomitant sacubitril/valsartan within 36 hours.',
    commonAdverseEffects:
      'Persistent dry cough, dizziness, orthostatic hypotension, hyperkalemia, headache, fatigue, and elevated serum creatinine.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Tritace (ramipril) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/tritace',
  },
  {
    brandName: 'Tritace 10 mg',
    brandNameAr: 'تريتاس ١٠ ملغ',
    genericName: 'Ramipril',
    activeIngredients: ['Ramipril'],
    drugClass: 'ACE Inhibitors',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Target maintenance dose for cardiovascular event prevention (HOPE regimen), essential hypertension, proteinuric nephropathy, and chronic heart failure.',
    usualAdultDose:
      '10 mg orally once daily at the same time each day, with or without food.',
    contraindications:
      'History of angioedema; second and third trimesters of pregnancy; bilateral renal artery stenosis; concomitant sacubitril/valsartan within 36 hours.',
    commonAdverseEffects:
      'Dry cough, hypotension, dizziness, hyperkalemia, renal function changes, and headache.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Tritace (ramipril) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/tritace',
  },
  {
    brandName: 'Cordarone 200 mg',
    brandNameAr: 'كوردارون ٢٠٠ ملغ',
    genericName: 'Amiodarone hydrochloride',
    activeIngredients: ['Amiodarone hydrochloride'],
    drugClass: 'Class III Antiarrhythmics',
    strength: '200 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'Prevention and treatment of severe life-threatening cardiac arrhythmias where other therapies are ineffective or contraindicated: atrial fibrillation/flutter, AV nodal and AV re-entrant tachycardias (including Wolff-Parkinson-White syndrome), and life-threatening ventricular arrhythmias (sustained/non-sustained VT or prevention of VF).',
    usualAdultDose:
      'Loading regimen: 200 mg three times daily for 1 week, reduced to 200 mg twice daily for the second week. Maintenance dose: lowest effective dose, typically 100–200 mg once daily.',
    contraindications:
      'Sinus bradycardia and sinoatrial heart block; sick sinus syndrome or severe atrioventricular conduction disturbances without a pacemaker; thyroid dysfunction (hypo- or hyperthyroidism); known hypersensitivity to iodine or amiodarone; combination with QTc-prolonging drugs inducing torsades de pointes; pregnancy and lactation.',
    commonAdverseEffects:
      'Corneal microdeposits, photosensitivity and slate-grey skin pigmentation, hypothyroidism or hyperthyroidism, pulmonary toxicity/interstitial pneumonitis, bradycardia, peripheral neuropathy, tremor, sleep disorders, and elevated hepatic transaminases.',
    storageConditions: 'Store below 30°C protected from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Cordarone X (amiodarone HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5470/smpc',
  },
  {
    brandName: 'Cordarone IV 150 mg/3 mL',
    brandNameAr: 'كوردارون ١٥٠ ملغ / ٣ مل أمبولات للزرق والتسريب الوريدي',
    genericName: 'Amiodarone hydrochloride',
    activeIngredients: ['Amiodarone hydrochloride'],
    drugClass: 'Class III Antiarrhythmics',
    strength: '150 mg / 3 mL (50 mg/mL)',
    dosageForm: 'Concentrate for solution for injection / infusion',
    route: 'Intravenous',
    packSize: '6 ampoules x 3 mL',
    approvedIndications:
      'Acute management of severe cardiac arrhythmias when rapid response is required or oral administration is not possible: tachyarrhythmias associated with Wolff-Parkinson-White syndrome, atrial fibrillation/flutter, paroxysmal supraventricular tachycardias, and resuscitation of shock-refractory ventricular fibrillation / pulseless ventricular tachycardia.',
    usualAdultDose:
      'Standard IV loading infusion: 5 mg/kg (or 150–300 mg) diluted strictly in 5% glucose infused over 20 minutes to 2 hours, followed by maintenance infusion of up to 900–1200 mg over 24 hours. Shock-refractory VF/pVT cardiac arrest: 300 mg IV/IO bolus, followed if needed by a supplementary 150 mg bolus.',
    contraindications:
      'Sinus bradycardia, sinoatrial block, or severe conduction disturbances without pacemaker; circulatory collapse or severe arterial hypotension; thyroid disease; hypersensitivity to iodine or amiodarone (unless life-threatening cardiac arrest).',
    commonAdverseEffects:
      'Hypotension (rate-related), bradycardia, superficial phlebitis at peripheral infusion site (central venous catheter preferred), nausea, acute hepatotoxicity, and QTc prolongation.',
    storageConditions: 'Store below 25°C in original carton protected from light. Dilute only in 5% dextrose (incompatible with 0.9% NaCl).',
    specialties: ['Cardiology', 'Emergency Medicine', 'Anesthesiology', 'Internal Medicine'],
    sourceTitle: 'Cordarone X Intravenous (amiodarone HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5471/smpc',
  },
  {
    brandName: 'Lasix 40 mg',
    brandNameAr: 'لازكس ٤٠ ملغ',
    genericName: 'Furosemide',
    activeIngredients: ['Furosemide'],
    drugClass: 'Loop Diuretics',
    strength: '40 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '20 scored tablets',
    approvedIndications:
      'Edema associated with congestive heart failure, hepatic cirrhosis (ascites), and renal disease (including nephrotic syndrome); management of mild-to-moderate hypertension alone or in combination with other antihypertensive agents.',
    usualAdultDose:
      'Edema: initial dose 20–80 mg orally as a single dose, adjusted according to diuretic response (maintenance 20–40 mg daily or on alternate days; higher doses in chronic renal insufficiency).',
    contraindications:
      'Hypersensitivity to furosemide or sulfonamides; hypovolemia or dehydration; anuria or renal failure not responding to furosemide; severe hypokalemia or severe hyponatremia; hepatic coma or pre-coma.',
    commonAdverseEffects:
      'Electrolyte depletion (hypokalemia, hyponatremia, hypomagnesemia, hypocalcemia), hypovolemia, dehydration, orthostatic hypotension, hyperuricemia/gout, hyperglycemia, and ototoxicity (at high doses/rapid IV).',
    storageConditions: 'Store below 30°C protected from light.',
    specialties: ['Cardiology', 'Nephrology', 'Internal Medicine', 'Gastroenterology'],
    sourceTitle: 'Lasix (furosemide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/016273s072lbl.pdf',
  },
  {
    brandName: 'Lasix 20 mg/2 mL Ampoules',
    brandNameAr: 'لازكس ٢٠ ملغ / ٢ مل أمبولات للحقن الوريدي أو العضلي',
    genericName: 'Furosemide',
    activeIngredients: ['Furosemide'],
    drugClass: 'Loop Diuretics',
    strength: '20 mg / 2 mL (10 mg/mL)',
    dosageForm: 'Solution for injection',
    route: 'Intravenous / Intramuscular',
    packSize: '5 ampoules x 2 mL',
    approvedIndications:
      'Acute pulmonary edema, acute decompensated heart failure, hypertensive crisis with fluid overload, cerebral edema, and acute/chronic renal edema when rapid diuresis is required or oral absorption is impaired.',
    usualAdultDose:
      '20–40 mg injected slowly intravenously (at a rate not exceeding 4 mg/minute) or intramuscularly; may be repeated or increased in 20 mg increments every 2 hours until desired diuretic effect is achieved.',
    contraindications:
      'Anuria; severe hypovolemia/dehydration; severe hypokalemia or hyponatremia; hepatic coma; hypersensitivity to furosemide or sulfonamides.',
    commonAdverseEffects:
      'Hypovolemia, hypotension, hypokalemia, hyponatremia, metabolic alkalosis, hyperuricemia, and transient or permanent hearing impairment if injected too rapidly.',
    storageConditions: 'Store below 25°C in the outer carton to protect from light.',
    specialties: ['Cardiology', 'Emergency Medicine', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Lasix Injection (furosemide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/016363s047lbl.pdf',
  },
  {
    brandName: 'Praluent 150 mg',
    brandNameAr: 'برالوينت ١٥٠ ملغ قلم مسبق التعبئة',
    genericName: 'Alirocumab',
    activeIngredients: ['Alirocumab'],
    drugClass: 'PCSK9 Inhibitors',
    strength: '150 mg / mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '2 pre-filled pens x 1 mL',
    approvedIndications:
      'Primary hypercholesterolemia (heterozygous familial and non-familial) or mixed dyslipidemia as an adjunct to diet in combination with a statin (or statin-intolerant); established atherosclerotic cardiovascular disease (ASCVD) to reduce cardiovascular risk by lowering LDL-C levels.',
    usualAdultDose:
      '75 mg or 150 mg subcutaneously once every 2 weeks (or 300 mg once every 4 weeks) injected into the thigh, abdomen, or upper arm.',
    contraindications:
      'Hypersensitivity to alirocumab or any excipient.',
    commonAdverseEffects:
      'Injection site reactions (erythema, itching, swelling, pain), upper respiratory tract signs and symptoms, and pruritus.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light. Do not freeze.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Praluent (alirocumab) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/praluent',
  },

  // ============================================================================
  // 2. DIABETES & ENDOCRINOLOGY — Insulins & Oral Antidiabetics
  // ============================================================================
  {
    brandName: 'Lantus SoloStar 100 IU/mL',
    brandNameAr: 'لانتوس سولوستار ١٠٠ وحدة/مل أقلام أنسولين مسبقة التعبئة',
    genericName: 'Insulin glargine',
    activeIngredients: ['Insulin glargine'],
    drugClass: 'Long-Acting Basal Insulins',
    strength: '100 units / mL',
    dosageForm: 'Solution for injection in pre-filled pen (SoloStar)',
    route: 'Subcutaneous',
    packSize: '5 SoloStar pre-filled pens x 3 mL (300 units per pen)',
    approvedIndications:
      'Treatment of diabetes mellitus in adults, adolescents, and children aged 2 years and above, where treatment with a long-acting basal insulin analogue is required.',
    usualAdultDose:
      'Administered subcutaneously once daily at any time of the day, but at the same time every day. Dosage and timing are individually titrated based on fasting blood glucose targets. Must not be administered intravenously.',
    contraindications:
      'Hypersensitivity to insulin glargine or any excipient.',
    commonAdverseEffects:
      'Hypoglycemia, lipohypertrophy at injection sites, injection site reactions, and transient visual refraction changes during glycemic normalization.',
    storageConditions:
      'Unopened pens: store in a refrigerator (2°C–8°C); do not freeze. In-use pen: may be stored below 30°C away from direct heat and light for up to 4 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'Lantus (insulin glargine) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lantus',
  },
  {
    brandName: 'Toujeo SoloStar 300 IU/mL',
    brandNameAr: 'توجيو سولوستار ٣٠٠ وحدة/مل أقلام أنسولين مسبقة التعبئة',
    genericName: 'Insulin glargine (300 units/mL)',
    activeIngredients: ['Insulin glargine'],
    drugClass: 'Ultra-Long-Acting Basal Insulins',
    strength: '300 units / mL',
    dosageForm: 'Solution for injection in pre-filled pen (SoloStar)',
    route: 'Subcutaneous',
    packSize: '3 SoloStar pre-filled pens x 1.5 mL (450 units per pen)',
    approvedIndications:
      'Treatment of diabetes mellitus in adults, adolescents, and children from the age of 6 years requiring ultra-long-acting concentrated basal insulin with reduced nocturnal hypoglycemia risk.',
    usualAdultDose:
      'Administered subcutaneously once daily at the same time each day (with up to ±3 hours flexibility when needed). Do not dilute or mix with any other insulin; dose adjustments should not be made more frequently than every 3–4 days.',
    contraindications:
      'Hypersensitivity to insulin glargine or any excipient.',
    commonAdverseEffects:
      'Hypoglycemia, lipodystrophy/lipohypertrophy, and injection site reactions.',
    storageConditions:
      'Unopened pens: store in a refrigerator (2°C–8°C); do not freeze. In-use pen: store below 30°C for up to 6 weeks.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'Toujeo (insulin glargine 300 units/mL) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/toujeo',
  },
  {
    brandName: 'Apidra SoloStar 100 IU/mL',
    brandNameAr: 'أبيدرا سولوستار ١٠٠ وحدة/مل أقلام أنسولين سريع المفعول',
    genericName: 'Insulin glulisine',
    activeIngredients: ['Insulin glulisine'],
    drugClass: 'Rapid-Acting Prandial Insulins',
    strength: '100 units / mL',
    dosageForm: 'Solution for injection in pre-filled pen (SoloStar)',
    route: 'Subcutaneous',
    packSize: '5 SoloStar pre-filled pens x 3 mL (300 units per pen)',
    approvedIndications:
      'Treatment of adults, adolescents, and children aged 6 years or older with diabetes mellitus where treatment with a rapid-acting mealtime insulin is required.',
    usualAdultDose:
      'Administer by subcutaneous injection shortly (0–15 minutes) before or soon after meals, in a regimen that includes an intermediate- or long-acting basal insulin (such as Lantus or Toujeo).',
    contraindications:
      'Hypersensitivity to insulin glulisine or any excipient; hypoglycemia.',
    commonAdverseEffects:
      'Hypoglycemia, injection site reactions, and cutaneous lipodystrophy.',
    storageConditions:
      'Unopened pens: store in a refrigerator (2°C–8°C); do not freeze. In-use pen: store below 25°C for up to 4 weeks protected from light.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Pediatrics'],
    sourceTitle: 'Apidra (insulin glulisine) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/apidra',
  },
  {
    brandName: 'Suliqua 100/50 SoloStar',
    brandNameAr: 'سوليكوا ١٠٠ / ٥٠ سولوستار قلم مسبق التعبئة',
    genericName: 'Insulin glargine + Lixisenatide',
    activeIngredients: ['Insulin glargine', 'Lixisenatide'],
    drugClass: 'Basal Insulin & GLP-1 Receptor Agonist Combinations',
    strength: '100 units/mL + 50 mcg/mL',
    dosageForm: 'Solution for injection in pre-filled pen (10–40 dose steps)',
    route: 'Subcutaneous',
    packSize: '3 pre-filled pens x 3 mL',
    approvedIndications:
      'Treatment of insufficiently controlled type 2 diabetes mellitus in adults to improve glycemic control as an adjunct to diet and exercise in addition to metformin with or without SGLT2 inhibitors.',
    usualAdultDose:
      'Injected subcutaneously once daily within the hour prior to a meal (preferably the same meal every day). Titrate dose steps (10 to 40 units insulin glargine / 5 to 20 mcg lixisenatide) according to fasting plasma glucose.',
    contraindications:
      'Hypersensitivity to insulin glargine or lixisenatide.',
    commonAdverseEffects:
      'Hypoglycemia, nausea, diarrhea, vomiting, dizziness, and injection site reactions.',
    storageConditions:
      'Unopened pens: store in a refrigerator (2°C–8°C); do not freeze. In-use pen: store below 25°C for up to 28 days.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Suliqua (insulin glargine / lixisenatide) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/suliqua',
  },
  {
    brandName: 'Amaryl 1 mg',
    brandNameAr: 'أماريل ١ ملغ',
    genericName: 'Glimepiride',
    activeIngredients: ['Glimepiride'],
    drugClass: 'Sulfonylureas',
    strength: '1 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'Treatment of type 2 diabetes mellitus when diet, physical exercise, and weight reduction alone are not adequate.',
    usualAdultDose:
      'Initial dose is 1 mg once daily taken shortly before or during a substantial breakfast (or first main meal). If control is achieved, 1 mg daily is used as maintenance; otherwise titrate stepwise at 1–2 week intervals to 2 mg, 3 mg, or 4 mg daily.',
    contraindications:
      'Insulin-dependent (type 1) diabetes mellitus; diabetic coma; ketoacidosis; severe renal or hepatic function disorders; hypersensitivity to glimepiride, other sulfonylureas, or sulfonamides; pregnancy and lactation.',
    commonAdverseEffects:
      'Hypoglycemia, transient visual disturbances at treatment initiation, nausea, abdominal fullness, weight gain, and rare hematologic changes.',
    storageConditions: 'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Amaryl (glimepiride) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/amaryl',
  },
  {
    brandName: 'Amaryl 2 mg',
    brandNameAr: 'أماريل ٢ ملغ',
    genericName: 'Glimepiride',
    activeIngredients: ['Glimepiride'],
    drugClass: 'Sulfonylureas',
    strength: '2 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'Type 2 diabetes mellitus as monotherapy or in combination with metformin, SGLT2 inhibitors, DPP-4 inhibitors, or basal insulin.',
    usualAdultDose:
      '2 mg orally once daily immediately before or during breakfast. Swallow whole with liquid.',
    contraindications:
      'Type 1 diabetes mellitus; diabetic ketoacidosis; severe hepatic or renal impairment; hypersensitivity to sulfonylureas or sulfonamides; pregnancy and breastfeeding.',
    commonAdverseEffects:
      'Hypoglycemia, weight gain, mild gastrointestinal symptoms (nausea, diarrhea, epigastric pressure), and transient visual changes.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Amaryl (glimepiride) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/amaryl',
  },
  {
    brandName: 'Amaryl 3 mg',
    brandNameAr: 'أماريل ٣ ملغ',
    genericName: 'Glimepiride',
    activeIngredients: ['Glimepiride'],
    drugClass: 'Sulfonylureas',
    strength: '3 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'Maintenance treatment of type 2 diabetes mellitus in adult patients titrated from lower glimepiride strengths.',
    usualAdultDose:
      '3 mg orally once daily immediately before or during the first main meal of the day.',
    contraindications:
      'Type 1 diabetes; diabetic ketoacidosis or coma; severe renal or hepatic insufficiency; sulfonylurea/sulfonamide hypersensitivity; pregnancy and lactation.',
    commonAdverseEffects:
      'Hypoglycemia, weight gain, nausea, abdominal pain, and elevated hepatic enzymes.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Amaryl (glimepiride) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/amaryl',
  },
  {
    brandName: 'Amaryl 4 mg',
    brandNameAr: 'أماريل ٤ ملغ',
    genericName: 'Glimepiride',
    activeIngredients: ['Glimepiride'],
    drugClass: 'Sulfonylureas',
    strength: '4 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'High-strength maintenance therapy for type 2 diabetes mellitus in adults requiring 4 mg daily glimepiride.',
    usualAdultDose:
      '4 mg orally once daily immediately before or during breakfast (usual maximum effective maintenance dose is 4 mg daily; max 6 mg daily in exceptional cases).',
    contraindications:
      'Type 1 diabetes; diabetic ketoacidosis; severe renal or hepatic impairment; hypersensitivity to sulfonylureas or sulfonamides; pregnancy and lactation.',
    commonAdverseEffects:
      'Hypoglycemia, weight gain, gastrointestinal discomfort, and allergic skin reactions.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Amaryl (glimepiride) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/amaryl',
  },
  {
    brandName: 'Amaryl M 2 mg / 500 mg',
    brandNameAr: 'أماريل إم ٢ ملغ / ٥٠٠ ملغ',
    genericName: 'Glimepiride + Metformin hydrochloride',
    activeIngredients: ['Glimepiride', 'Metformin hydrochloride'],
    drugClass: 'Sulfonylurea & Biguanide Combinations',
    strength: '2 mg / 500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Treatment of type 2 diabetes mellitus as an adjunct to diet and exercise in patients inadequately controlled on glimepiride or metformin monotherapy, or as replacement for separate glimepiride and metformin tablets.',
    usualAdultDose:
      'One tablet once or twice daily before or with meals, individualized according to the patient’s current regimen and blood glucose response.',
    contraindications:
      'Type 1 diabetes; acute or chronic metabolic acidosis (lactic acidosis, DKA); severe renal impairment (eGFR < 30 mL/min/1.73 m²); hepatic insufficiency; acute conditions predisposing to renal dysfunction or tissue hypoxia; hypersensitivity to glimepiride, metformin, or sulfonamides; pregnancy and lactation.',
    commonAdverseEffects:
      'Hypoglycemia, nausea, vomiting, diarrhea, abdominal pain, metallic taste, and decreased vitamin B12 absorption.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Amaryl (glimepiride) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/amaryl',
  },
  {
    brandName: 'Daonil 5 mg',
    brandNameAr: 'داونيل ٥ ملغ',
    genericName: 'Glibenclamide',
    activeIngredients: ['Glibenclamide'],
    drugClass: 'Sulfonylureas',
    strength: '5 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '100 scored tablets',
    approvedIndications:
      'Treatment of non-insulin-dependent (type 2) diabetes mellitus in adults when dietary measures, physical exercise, and weight loss alone fail to achieve adequate glycemic control.',
    usualAdultDose:
      'Initiate at 2.5 mg (half tablet) to 5 mg daily before breakfast; adjust in 2.5 mg increments at intervals of 7 days up to a maximum daily dose of 15 mg (doses above 10 mg divided before morning and evening meals).',
    contraindications:
      'Type 1 diabetes; diabetic ketoacidosis or pre-coma; severe renal or hepatic insufficiency; concomitant bosentan; hypersensitivity to glibenclamide or sulfonamides; pregnancy and breastfeeding.',
    commonAdverseEffects:
      'Hypoglycemia (can be prolonged, especially in elderly or renal impairment), weight gain, nausea, epigastric fullness, and pruritus/rash.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Daonil (glibenclamide) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1191/smpc',
  },

  // ============================================================================
  // 3. NEUROLOGY, EPILEPSY & PSYCHIATRY
  // ============================================================================
  {
    brandName: 'Depakine Chrono 500 mg',
    brandNameAr: 'ديباكين كرونو ٥٠٠ ملغ أقراص ممتدة المفعول',
    genericName: 'Sodium valproate + Valproic acid',
    activeIngredients: ['Sodium valproate', 'Valproic acid'],
    drugClass: 'Antiepileptics & Mood Stabilizers',
    strength: '500 mg (333 mg sodium valproate + 145 mg valproic acid)',
    dosageForm: 'Prolonged-release scored film-coated tablet',
    route: 'Oral',
    packSize: '30 prolonged-release scored tablets',
    approvedIndications:
      'Treatment of generalized, focal (partial), or other epilepsies (tonic-clonic, myoclonic, absence, atonic, and mixed seizures; Lennox-Gastaut syndrome); treatment of manic episodes in bipolar disorder and continuation/prophylaxis when lithium is contraindicated or not tolerated.',
    usualAdultDose:
      'Epilepsy: start at 10–15 mg/kg/day and titrate to optimal maintenance dose (usually 20–30 mg/kg/day, given in 1 or 2 divided doses). Bipolar mania: initiate at 750 mg/day and titrate to 1000–2000 mg/day. Prolonged-release scored tablets may be halved if needed; do not crush or chew.',
    contraindications:
      'Active hepatitis or personal/family history of severe hepatic dysfunction; hepatic porphyria; known urea cycle disorders; mitochondrial disorders caused by POLG mutations; pregnancy and women of childbearing potential unless all conditions of the Valproate Pregnancy Prevention Programme are fulfilled.',
    commonAdverseEffects:
      'Tremor, nausea, gastralgia, diarrhea, weight gain, transient alopecia, thrombocytopenia, hyperammonemia, somnolence, extrapyramidal symptoms, and polycystic ovaries.',
    storageConditions: 'Store below 25°C in a dry place; keep container tightly closed to protect from moisture.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Depakine / Epilim Chrono (sodium valproate) — EMA Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valproate-related-substances-0',
  },
  {
    brandName: 'Depakine 200 mg',
    brandNameAr: 'ديباكين ٢٠٠ ملغ أقراص مقاومة للمعدة',
    genericName: 'Sodium valproate',
    activeIngredients: ['Sodium valproate'],
    drugClass: 'Antiepileptics & Mood Stabilizers',
    strength: '200 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: '40 gastro-resistant tablets',
    approvedIndications:
      'Treatment of generalized and focal epilepsies (absence, myoclonic, tonic-clonic, atonic, and mixed seizures) in adults and children capable of swallowing tablets whole.',
    usualAdultDose:
      'Titrate to 20–30 mg/kg/day divided into 2 or 3 daily doses with meals. Swallow gastro-resistant tablets whole with water; do not crush or chew.',
    contraindications:
      'Acute or chronic hepatitis; hepatic porphyria; urea cycle disorders; mitochondrial POLG mutations; pregnancy and women of childbearing potential unless Valproate Pregnancy Prevention Programme criteria are met.',
    commonAdverseEffects:
      'Tremor, weight gain, hair thinning, nausea, abdominal pain, thrombocytopenia, and elevated liver enzymes or ammonia.',
    storageConditions: 'Store below 25°C in the original container to protect from moisture.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Depakine / Epilim (sodium valproate) — EMA Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valproate-related-substances-0',
  },
  {
    brandName: 'Depakine Oral Solution 200 mg/mL',
    brandNameAr: 'ديباكين ٢٠٠ ملغ/مل محلول (نقط) فموي',
    genericName: 'Sodium valproate',
    activeIngredients: ['Sodium valproate'],
    drugClass: 'Antiepileptics & Mood Stabilizers',
    strength: '200 mg / mL',
    dosageForm: 'Oral solution with graduated dosing syringe',
    route: 'Oral',
    packSize: '1 bottle x 40 mL with calibrated oral syringe',
    approvedIndications:
      'Pediatric and adult generalized and partial epilepsies where concentrated liquid dosing is required.',
    usualAdultDose:
      'Children/Infants: 30 mg/kg/day; Adolescents/Adults: 20–30 mg/kg/day divided into 2–3 doses, diluted in half a glass of non-carbonated water or juice and taken with meals using the provided calibrated syringe.',
    contraindications:
      'Active liver disease; mitochondrial POLG mutations (especially in children <2 years with suspected POLG disorder); urea cycle disorders; hepatic porphyria; pregnancy.',
    commonAdverseEffects:
      'Nausea, vomiting, tremor, somnolence, weight changes, thrombocytopenia, and hepatotoxicity risk (highest in infants <3 years on polytherapy).',
    storageConditions: 'Store below 25°C away from direct light.',
    specialties: ['Pediatrics', 'Neurology'],
    sourceTitle: 'Depakine / Epilim (sodium valproate) — EMA Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valproate-related-substances-0',
  },
  {
    brandName: 'Depakine Syrup 57.64 mg/mL',
    brandNameAr: 'ديباكين شراب فموي (٢٠٠ ملغ / ٣.٥ مل)',
    genericName: 'Sodium valproate',
    activeIngredients: ['Sodium valproate'],
    drugClass: 'Antiepileptics & Mood Stabilizers',
    strength: '57.64 mg / mL (200 mg / 3.5 mL)',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: '1 bottle x 150 mL with dosing syringe',
    approvedIndications:
      'Treatment of generalized and partial epileptic seizures in infants and children.',
    usualAdultDose:
      '20–30 mg/kg/day divided into 2 or 3 administrations with meals, measured solely with the graduated oral dosing syringe provided.',
    contraindications:
      'Active hepatic disease; mitochondrial POLG disorders; urea cycle defects; porphyria; pregnancy.',
    commonAdverseEffects:
      'Gastrointestinal upset, tremor, somnolence, increased appetite/weight gain, and thrombocytopenia.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Pediatrics', 'Neurology'],
    sourceTitle: 'Depakine / Epilim (sodium valproate) — EMA Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valproate-related-substances-0',
  },
  {
    brandName: 'Depakine IV 400 mg',
    brandNameAr: 'ديباكين ٤٠٠ ملغ فيال للزرق والتسريب الوريدي',
    genericName: 'Sodium valproate',
    activeIngredients: ['Sodium valproate'],
    drugClass: 'Antiepileptics & Mood Stabilizers',
    strength: '400 mg / 4 mL (100 mg/mL after reconstitution)',
    dosageForm: 'Powder and solvent for solution for injection/infusion',
    route: 'Intravenous',
    packSize: '4 vials x 400 mg + 4 ampoules x 4 mL solvent',
    approvedIndications:
      'Temporary intravenous replacement of oral valproate therapy in epileptic patients when oral administration is temporarily not possible, and acute hospital management of status epilepticus or serial seizures.',
    usualAdultDose:
      'Replacement of oral therapy: infuse IV at the same total daily dose in divided administrations or continuous infusion. Acute initiation/loading: 15 mg/kg slow IV injection over 3–5 minutes, followed after 30 minutes by continuous IV infusion at 1 mg/kg/hour (up to 25 mg/kg/day).',
    contraindications:
      'Acute/chronic hepatitis; mitochondrial POLG disorders; urea cycle defects; hepatic porphyria; pregnancy unless life-threatening seizure with no alternative.',
    commonAdverseEffects:
      'Transient dizziness, nausea, somnolence, local phlebitis/pain at injection site, hyperammonemia, and thrombocytopenia.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Neurology', 'Emergency Medicine', 'Pediatrics', 'Anesthesiology'],
    sourceTitle: 'Epilim / Depakine Intravenous (sodium valproate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5483/smpc',
  },
  {
    brandName: 'Stilnox 10 mg',
    brandNameAr: 'ستيلنوكس ١٠ ملغ',
    genericName: 'Zolpidem tartrate',
    activeIngredients: ['Zolpidem tartrate'],
    drugClass: 'Non-Benzodiazepine Hypnotics (Z-Drugs)',
    strength: '10 mg',
    dosageForm: 'Scored film-coated tablet',
    route: 'Oral',
    packSize: '20 scored film-coated tablets',
    approvedIndications:
      'Short-term treatment of severe, disabling insomnia or insomnia subjecting the adult patient to extreme distress.',
    usualAdultDose:
      '10 mg (one tablet) taken orally immediately at bedtime with liquid (ensure 7–8 hours of uninterrupted sleep). In elderly, debilitated, or hepatically impaired patients: 5 mg (half tablet) once daily at bedtime. Treatment duration should not exceed 4 weeks including tapering.',
    contraindications:
      'Hypersensitivity to zolpidem; severe hepatic insufficiency; sleep apnea syndrome; myasthenia gravis; acute and/or severe respiratory depression; history of complex sleep behaviors (sleepwalking, sleep-driving) after taking zolpidem.',
    commonAdverseEffects:
      'Somnolence, headache, dizziness, anterograde amnesia, hallucinations, agitation, nightmares, complex sleep behaviors, diarrhea, nausea, and fatigue.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Stilnoct / Stilnox (zolpidem tartrate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5475/smpc',
  },
  {
    brandName: 'Dogmatil 50 mg',
    brandNameAr: 'دوغماتيل ٥٠ ملغ كبسولات',
    genericName: 'Sulpiride',
    activeIngredients: ['Sulpiride'],
    drugClass: 'Benzamide Antipsychotics',
    strength: '50 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: '30 hard capsules',
    approvedIndications:
      'Short-term symptomatic management of anxiety states in adults when standard measures have failed, functional psychosomatic gastrointestinal disorders (such as irritable bowel syndrome), and behavioral disorders or schizophrenia (at higher doses).',
    usualAdultDose:
      'Anxiety / functional GI psychosomatic disorders in adults: 50–150 mg daily (1 to 3 capsules of 50 mg daily) in divided doses for up to 4 weeks.',
    contraindications:
      'Hypersensitivity to sulpiride; prolactin-dependent tumors (pituitary prolactinomas and breast cancer); known or suspected pheochromocytoma; acute porphyria; concomitant levodopa or dopamine agonists.',
    commonAdverseEffects:
      'Hyperprolactinemia (galactorrhea, amenorrhea, gynecomastia), sedation/drowsiness, weight gain, extrapyramidal symptoms, orthostatic hypotension, and QTc prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Gastroenterology', 'Internal Medicine', 'Neurology'],
    sourceTitle: 'Dogmatil / Dolmatil (sulpiride) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5472/smpc',
  },
  {
    brandName: 'Solian 200 mg',
    brandNameAr: 'سوليان ٢٠٠ ملغ',
    genericName: 'Amisulpride',
    activeIngredients: ['Amisulpride'],
    drugClass: 'Benzamide Antipsychotics',
    strength: '200 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '30 scored tablets',
    approvedIndications:
      'Treatment of acute and chronic schizophrenic disorders with prominent positive symptoms (delusions, hallucinations, thought disorders) and/or predominant negative symptoms (blunted affect, emotional and social withdrawal).',
    usualAdultDose:
      'Acute psychotic episodes: 400–800 mg/day in 2 divided doses (max 1200 mg/day). Predominant negative symptoms: 50–300 mg once daily. Doses up to 300 mg/day may be administered as a single daily dose.',
    contraindications:
      'Hypersensitivity to amisulpride; concomitant prolactin-dependent tumors (pituitary prolactinoma, breast cancer); pheochromocytoma; children before puberty; breastfeeding; combination with levodopa or drugs inducing torsades de pointes.',
    commonAdverseEffects:
      'Insomnia, anxiety, agitation, extrapyramidal symptoms (tremor, rigidity, akathisia), hyperprolactinemia (galactorrhea, amenorrhea, gynecomastia), weight gain, hypotension, and QTc prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Solian (amisulpride) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5474/smpc',
  },
  {
    brandName: 'Aubagio 14 mg',
    brandNameAr: 'أوباجيو ١٤ ملغ',
    genericName: 'Teriflunomide',
    activeIngredients: ['Teriflunomide'],
    drugClass: 'Multiple Sclerosis Immunomodulators',
    strength: '14 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of adult and pediatric patients aged 10 years and older with relapsing-remitting multiple sclerosis (RRMS).',
    usualAdultDose:
      'Adults (and children >40 kg): 14 mg orally once daily, with or without food.',
    contraindications:
      'Severe hepatic impairment (Child-Pugh class C); pregnancy and women of childbearing potential not using reliable contraception; breastfeeding; severe immunodeficiency states; significantly impaired bone marrow function; severe active infection; severe hypoproteinemia.',
    commonAdverseEffects:
      'Headache, diarrhea, nausea, alopecia (hair thinning, usually transient), increased ALT, neutropenia, paresthesia, and hypertension.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Neurology'],
    sourceTitle: 'Aubagio (teriflunomide) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aubagio',
  },

  // ============================================================================
  // 4. ALLERGY, GASTROENTEROLOGY & PAIN / MUSCULOSKELETAL
  // ============================================================================
  {
    brandName: 'Telfast 120 mg',
    brandNameAr: 'تلفاست ١٢٠ ملغ',
    category: 'otc_drug',
    genericName: 'Fexofenadine hydrochloride',
    activeIngredients: ['Fexofenadine hydrochloride'],
    drugClass: 'Second-Generation Non-Sedating H1 Antihistamines',
    strength: '120 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 film-coated tablets',
    approvedIndications:
      'Relief of symptoms associated with seasonal allergic rhinitis (hay fever) in adults and adolescents aged 12 years and older.',
    usualAdultDose:
      '120 mg (one tablet) orally once daily taken before a meal with water (avoid fruit juices such as grapefruit, orange, or apple juice which reduce oral bioavailability).',
    contraindications:
      'Hypersensitivity to fexofenadine hydrochloride or any excipient.',
    commonAdverseEffects:
      'Headache, drowsiness, dizziness, and nausea (incidence similar to placebo).',
    storageConditions: 'Store below 30°C.',
    specialties: ['Allergy & Immunology', 'ENT (Otolaryngology)', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Telfast 120 mg (fexofenadine HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5476/smpc',
  },
  {
    brandName: 'Telfast 180 mg',
    brandNameAr: 'تلفاست ١٨٠ ملغ',
    category: 'otc_drug',
    genericName: 'Fexofenadine hydrochloride',
    activeIngredients: ['Fexofenadine hydrochloride'],
    drugClass: 'Second-Generation Non-Sedating H1 Antihistamines',
    strength: '180 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 film-coated tablets',
    approvedIndications:
      'Relief of symptoms associated with chronic idiopathic urticaria (chronic spontaneous urticaria) and severe allergic rhinitis in adults and adolescents aged 12 years and older.',
    usualAdultDose:
      '180 mg (one tablet) orally once daily before a meal with water.',
    contraindications:
      'Hypersensitivity to fexofenadine hydrochloride or any excipient.',
    commonAdverseEffects:
      'Headache, drowsiness, dizziness, nausea, and fatigue.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Dermatology', 'Allergy & Immunology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sourceTitle: 'Telfast 180 mg (fexofenadine HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5477/smpc',
  },
  {
    brandName: 'Telfast Oral Suspension 30 mg/5 mL',
    brandNameAr: 'تلفاست ٣٠ ملغ / ٥ مل معلق فموي للأطفال',
    category: 'otc_drug',
    genericName: 'Fexofenadine hydrochloride',
    activeIngredients: ['Fexofenadine hydrochloride'],
    drugClass: 'Second-Generation Non-Sedating H1 Antihistamines',
    strength: '30 mg / 5 mL (6 mg/mL)',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: '1 bottle x 150 mL',
    approvedIndications:
      'Symptomatic relief of seasonal allergic rhinitis in children aged 2 to 11 years and chronic idiopathic urticaria in children aged 6 months to 11 years.',
    usualAdultDose:
      'Children 2–11 years: 30 mg (5 mL) twice daily. Children 6 months to <2 years (chronic urticaria): 15 mg (2.5 mL) twice daily. Shake bottle well before each use.',
    contraindications:
      'Hypersensitivity to fexofenadine hydrochloride or any excipient.',
    commonAdverseEffects:
      'Headache, upper respiratory tract infection, pyrexia, coughing, and otitis media in pediatric trials.',
    storageConditions: 'Store below 30°C. Do not freeze.',
    specialties: ['Pediatrics', 'Allergy & Immunology', 'Dermatology', 'ENT (Otolaryngology)'],
    sourceTitle: 'Allegra / Telfast Pediatric Suspension (fexofenadine HCl) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/021963s003lbl.pdf',
  },
  {
    brandName: 'Enterogermina 2 Billion/5 mL',
    brandNameAr: 'إنتروجيرمينا ٢ مليار / ٥ مل أمبولات فموية (بروبيوتيك)',
    category: 'otc_drug',
    genericName: 'Spores of polyantibiotic-resistant Bacillus clausii (strains SIN, O/C, T, N/R)',
    activeIngredients: ['Bacillus clausii spores'],
    drugClass: 'Antidiarrheal Probiotics & Intestinal Flora Restorers',
    strength: '2 billion spores / 5 mL',
    dosageForm: 'Oral suspension in single-dose mini-bottle',
    route: 'Oral',
    packSize: '20 single-dose mini-bottles x 5 mL',
    approvedIndications:
      'Treatment and prophylaxis of intestinal dysmicrobism (dysbiosis) and subsequent endogenous avitaminosis; adjunctive therapy to restore intestinal microbial flora altered during antibiotic or chemotherapeutic treatments; acute and chronic gastrointestinal disorders in infants, children, and adults.',
    usualAdultDose:
      'Adults: 2–3 mini-bottles (4–6 billion spores) per day. Children and infants: 1–2 mini-bottles (2–4 billion spores) per day at regular intervals. Shake mini-bottle and administer orally as is or diluted in water, milk, or juice. For oral use only—never inject.',
    contraindications:
      'Hypersensitivity to Bacillus clausii or any excipient.',
    commonAdverseEffects:
      'Generally well tolerated; rare hypersensitivity reactions (rash, urticaria, angioedema). Bacteremia may occur solely in severely immunocompromised or critically ill hospitalized patients.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Pediatrics', 'Gastroenterology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Enterogermina (Bacillus clausii spores) — Official Sanofi Product Monograph',
    sourceUrl: 'https://www.sanofi.com/en/your-health/consumer-healthcare/digestive-wellness',
  },
  {
    brandName: 'Enterogermina 4 Billion/5 mL',
    brandNameAr: 'إنتروجيرمينا ٤ مليار / ٥ مل أمبولات فموية',
    category: 'otc_drug',
    genericName: 'Spores of polyantibiotic-resistant Bacillus clausii (strains SIN, O/C, T, N/R)',
    activeIngredients: ['Bacillus clausii spores'],
    drugClass: 'Antidiarrheal Probiotics & Intestinal Flora Restorers',
    strength: '4 billion spores / 5 mL',
    dosageForm: 'Oral suspension in single-dose mini-bottle',
    route: 'Oral',
    packSize: '10 single-dose mini-bottles x 5 mL',
    approvedIndications:
      'Once-daily restoration and prophylaxis of intestinal microbial flora imbalance (dysbiosis), acute infectious or antibiotic-associated diarrhea, and endogenous vitamin deficiency in adults, children, and infants.',
    usualAdultDose:
      'Adults: 1 mini-bottle (4 billion spores) per day (or up to 6 billion spores/day). Infants and children: 1 mini-bottle (4 billion spores) once daily. For oral administration only—never inject.',
    contraindications:
      'Hypersensitivity to Bacillus clausii or any excipient.',
    commonAdverseEffects:
      'Rare hypersensitivity reactions (skin rash, urticaria).',
    storageConditions: 'Store below 30°C.',
    specialties: ['Gastroenterology', 'Pediatrics', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Enterogermina 4B (Bacillus clausii spores) — Official Sanofi Product Monograph',
    sourceUrl: 'https://www.sanofi.com/en/your-health/consumer-healthcare/digestive-wellness',
  },
  {
    brandName: 'Essentiale Forte N 300 mg',
    brandNameAr: 'إسينشيالي فورت إن ٣٠٠ ملغ كبسولات لدعم الكبد',
    category: 'otc_drug',
    genericName: 'Essential phospholipids from soybean (EPL)',
    activeIngredients: ['Soybean phospholipids containing 76% (3-sn-phosphatidyl)choline'],
    drugClass: 'Hepatoprotective Agents',
    strength: '300 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: '30 hard capsules',
    approvedIndications:
      'Improvement of subjective complaints such as loss of appetite and sensation of pressure in the right epigastrium in patients with toxic-nutritional liver damage (steatotic liver disease / fatty liver) and in chronic hepatitis.',
    usualAdultDose:
      'Adults and adolescents (≥12 years): 2 capsules (600 mg) three times daily (total 1800 mg/day) swallowed whole with meals and plenty of liquid.',
    contraindications:
      'Known hypersensitivity to soybean preparations, peanut, phosphatidylcholine, or any excipient.',
    commonAdverseEffects:
      'Soft stools, diarrhea, mild abdominal discomfort, and rare allergic reactions (exanthema, urticaria, pruritus).',
    storageConditions: 'Store below 25°C in a dry place.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Essentiale Forte N (essential phospholipids) — Official Sanofi Product Information',
    sourceUrl: 'https://www.sanofi.com/en/your-health/consumer-healthcare/digestive-wellness',
  },
  {
    brandName: 'Maalox Plus Suspension',
    brandNameAr: 'مالوكس بلس معلق فموي مضاد للحموضة والانتفاخ',
    category: 'otc_drug',
    genericName: 'Magnesium hydroxide + Dried aluminium hydroxide gel + Simethicone',
    activeIngredients: ['Magnesium hydroxide', 'Aluminium hydroxide', 'Simethicone'],
    drugClass: 'Antacids & Antiflatulents',
    strength: '200 mg + 225 mg + 25 mg per 5 mL',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: '1 bottle x 355 mL',
    approvedIndications:
      'Symptomatic relief of hyperacidity, heartburn, acid indigestion, dyspepsia, gastroesophageal reflux, and gastritis associated with flatulence and abdominal bloating.',
    usualAdultDose:
      '5–10 mL (1–2 teaspoons) taken 4 times daily, 20 to 60 minutes after meals and at bedtime. Shake bottle well before use. Separate by at least 2 hours from fluoroquinolones, tetracyclines, iron salts, or levothyroxine.',
    contraindications:
      'Severe renal insufficiency/debilitation; hypophosphatemia; hypersensitivity to active substances or parabens.',
    commonAdverseEffects:
      'Mild constipation or diarrhea, and hypermagnesemia/hyperaluminemia in patients with impaired renal function.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Maalox Plus Oral Suspension — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5480/smpc',
  },
  {
    brandName: 'Buscopan 10 mg',
    brandNameAr: 'بسكوبان ١٠ ملغ أقراص مضادة للتشنج',
    category: 'otc_drug',
    genericName: 'Hyoscine butylbromide (Scopolamine butylbromide)',
    activeIngredients: ['Hyoscine butylbromide'],
    drugClass: 'Antispasmodics & Anticholinergics',
    strength: '10 mg',
    dosageForm: 'Coated tablet',
    route: 'Oral',
    packSize: '20 coated tablets',
    approvedIndications:
      'Symptomatic relief of gastrointestinal or genitourinary tract smooth muscle spasm, including irritable bowel syndrome (IBS), biliary colic, renal colic, and spasmodic dysmenorrhea.',
    usualAdultDose:
      'Adults and adolescents (>12 years): 1–2 tablets (10–20 mg) 3 to 4 times daily (up to 2 tablets 4 times daily for IBS). Children (6–12 years): 1 tablet (10 mg) 3 times daily. Swallow whole with water.',
    contraindications:
      'Myasthenia gravis; mechanical gastrointestinal stenosis; paralytic or obstructive ileus; megacolon; untreated narrow-angle glaucoma; tachycardia; prostatic enlargement with urinary retention.',
    commonAdverseEffects:
      'Dry mouth (xerostomia), tachycardia, dyshidrosis, accommodation disorders, constipation, and urinary retention.',
    storageConditions: 'Store below 25°C in a dry place.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Obstetrics & Gynecology', 'Urology', 'General Practice'],
    sourceTitle: 'Buscopan Tablets (hyoscine butylbromide) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1009/smpc',
  },
  {
    brandName: 'Buscopan 20 mg/mL Ampoules',
    brandNameAr: 'بسكوبان ٢٠ ملغ / ١ مل أمبولات للحقن',
    genericName: 'Hyoscine butylbromide (Scopolamine butylbromide)',
    activeIngredients: ['Hyoscine butylbromide'],
    drugClass: 'Antispasmodics & Anticholinergics',
    strength: '20 mg / 1 mL',
    dosageForm: 'Solution for injection',
    route: 'Intravenous / Intramuscular / Subcutaneous',
    packSize: '6 ampoules x 1 mL',
    approvedIndications:
      'Acute spasm in gastrointestinal, biliary, or genitourinary colic; aid in diagnostic and therapeutic procedures where spasm may be a problem (e.g., gastroduodenal endoscopy, ERCP, and radiology).',
    usualAdultDose:
      '20 mg (1 ampoule) administered by slow intravenous, intramuscular, or subcutaneous injection; may be repeated after 30 minutes if necessary. Maximum daily parenteral dose: 100 mg.',
    contraindications:
      'Untreated narrow-angle glaucoma; hypertrophy of the prostate with urinary retention; mechanical stenosis in the GI tract; paralytic/obstructive ileus; megacolon; tachycardia; myasthenia gravis; IM injection in patients on anticoagulant therapy.',
    commonAdverseEffects:
      'Visual accommodation disturbances, tachycardia, dizziness, dry mouth, transient hypotension, flushing, and urinary retention.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Emergency Medicine', 'Gastroenterology', 'General Surgery', 'Urology', 'Obstetrics & Gynecology'],
    sourceTitle: 'Buscopan Ampoules (hyoscine butylbromide) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1008/smpc',
  },
  {
    brandName: 'Profenid 100 mg',
    brandNameAr: 'بروفينيد ١٠٠ ملغ أقراص معوية الكسوة',
    genericName: 'Ketoprofen',
    activeIngredients: ['Ketoprofen'],
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    strength: '100 mg',
    dosageForm: 'Enteric-coated tablet',
    route: 'Oral',
    packSize: '30 enteric-coated tablets',
    approvedIndications:
      'Symptomatic treatment of rheumatoid arthritis, ankylosing spondylitis, osteoarthritis, acute gouty arthritis, acute musculoskeletal disorders (tendinitis, bursitis, low back pain), postoperative or post-traumatic pain, and dysmenorrhea.',
    usualAdultDose:
      '100–200 mg daily in 1 or 2 divided doses taken with meals. Swallow enteric-coated tablets whole with liquid.',
    contraindications:
      'History of asthma, urticaria, or allergic reactions to ketoprofen, ASA, or other NSAIDs; active peptic ulcer or history of recurrent GI bleeding/perforation; severe heart failure, severe hepatic failure, or severe renal failure; third trimester of pregnancy.',
    commonAdverseEffects:
      'Dyspepsia, nausea, abdominal pain, vomiting, diarrhea, peptic ulceration/GI bleeding, headache, dizziness, tinnitus, fluid retention, and elevated transaminases.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Orthopedics', 'Rheumatology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Profenid / Orudis (ketoprofen) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ketoprofen',
  },
  {
    brandName: 'Bi-Profenid 150 mg',
    brandNameAr: 'باي-بروفينيد ١٥٠ ملغ أقراص معدلة الإطلاق ثنائية الطبقة',
    genericName: 'Ketoprofen',
    activeIngredients: ['Ketoprofen'],
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    strength: '150 mg (75 mg immediate-release + 75 mg extended-release)',
    dosageForm: 'Modified-release scored bilayer tablet',
    route: 'Oral',
    packSize: '20 modified-release scored tablets',
    approvedIndications:
      'Long-term symptomatic treatment of chronic inflammatory rheumatism (rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis) and severe osteoarthritis, as well as short-term treatment of acute flares of osteoarticular, musculoskeletal, and lumbar pain.',
    usualAdultDose:
      'Maintenance dose: one 150 mg tablet once daily with a meal (or half a tablet twice daily). In acute flares: up to two half-tablets twice daily (300 mg/day max) for a short period.',
    contraindications:
      'Active peptic ulcer or GI hemorrhage; hypersensitivity/asthma triggered by NSAIDs or ASA; severe cardiac, hepatic, or renal insufficiency; third trimester of pregnancy.',
    commonAdverseEffects:
      'Gastrointestinal pain, dyspepsia, nausea, peptic ulceration, headache, vertigo, edema, and hypertension.',
    storageConditions: 'Store below 25°C in the original package.',
    specialties: ['Orthopedics', 'Rheumatology', 'Neurology', 'General Surgery'],
    sourceTitle: 'Profenid (ketoprofen) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ketoprofen',
  },
  {
    brandName: 'Profenid IM 100 mg/2 mL',
    brandNameAr: 'بروفينيد ١٠٠ ملغ / ٢ مل أمبولات للحقن العضلي',
    genericName: 'Ketoprofen',
    activeIngredients: ['Ketoprofen'],
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    strength: '100 mg / 2 mL (50 mg/mL)',
    dosageForm: 'Solution for intramuscular injection',
    route: 'Intramuscular',
    packSize: '6 ampoules x 2 mL',
    approvedIndications:
      'Short-term acute parenteral treatment of severe inflammatory rheumatologic flares, acute radiculalgia/sciatica, renal colic, and postoperative or post-traumatic musculoskeletal pain.',
    usualAdultDose:
      '100 mg (1 ampoule) by deep intramuscular injection into the upper outer quadrant of the buttock once or twice daily (100–200 mg/day) for a maximum of 2 to 3 days before transitioning to oral therapy.',
    contraindications:
      'Active peptic ulcer/GI bleeding; NSAID/ASA-induced asthma or hypersensitivity; hemostasis disorders or ongoing anticoagulant therapy (risk of gluteal hematoma); severe heart, liver, or kidney failure; third trimester of pregnancy.',
    commonAdverseEffects:
      'Injection site pain and burning sensation, dyspepsia, nausea, GI ulceration/bleeding, dizziness, and fluid retention.',
    storageConditions: 'Store below 25°C protected from light.',
    specialties: ['Orthopedics', 'Emergency Medicine', 'General Surgery', 'Urology'],
    sourceTitle: 'Profenid (ketoprofen) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ketoprofen',
  },

  // ============================================================================
  // 5. ANTI-INFECTIVES, IMMUNOLOGY, ONCOLOGY & UROLOGY
  // ============================================================================
  {
    brandName: 'Flagyl 500 mg',
    brandNameAr: 'فلاجيل ٥٠٠ ملغ أقراص',
    genericName: 'Metronidazole',
    activeIngredients: ['Metronidazole'],
    drugClass: 'Nitroimidazole Antibacterials & Antiprotozoals',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 film-coated tablets',
    approvedIndications:
      'Treatment of anaerobic bacterial infections (intra-abdominal, pelvic/gynecological, dental/periodontal, skin/soft tissue, Clostridioides difficile colitis, Helicobacter pylori eradication); treatment of protozoal infections including intestinal and hepatic amebiasis (Entamoeba histolytica), giardiasis (Giardia lamblia), urogenital trichomoniasis (Trichomonas vaginalis), and bacterial vaginosis.',
    usualAdultDose:
      'Anaerobic infections: 500 mg orally 3 times daily for 7 days. Amebiasis: 500–750 mg 3 times daily for 7–10 days. Giardiasis: 500 mg twice daily for 5–7 days (or 2 g once daily for 3 days). Trichomoniasis / bacterial vaginosis: 500 mg twice daily for 7 days or 2 g single dose. Avoid alcohol during treatment and for 48 hours after.',
    contraindications:
      'Hypersensitivity to metronidazole or other nitroimidazole derivatives.',
    commonAdverseEffects:
      'Metallic/unpleasant taste, furred tongue, glossitis, stomatitis, nausea, vomiting, epigastric distress, diarrhea, dark-colored urine, headache, dizziness, and peripheral neuropathy with prolonged use.',
    storageConditions: 'Store below 30°C protected from light.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Obstetrics & Gynecology', 'General Surgery', 'General Practice'],
    sourceTitle: 'Flagyl (metronidazole) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/012623s076lbl.pdf',
  },
  {
    brandName: 'Flagyl Oral Suspension 125 mg/5 mL',
    brandNameAr: 'فلاجيل ١٢٥ ملغ / ٥ مل معلق فموي للأطفال',
    genericName: 'Metronidazole benzoate',
    activeIngredients: ['Metronidazole'],
    drugClass: 'Nitroimidazole Antibacterials & Antiprotozoals',
    strength: '125 mg / 5 mL (equivalent to metronidazole base)',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: '1 bottle x 120 mL',
    approvedIndications:
      'Pediatric treatment of intestinal and extraintestinal amebiasis, giardiasis, trichomoniasis, and anaerobic bacterial infections.',
    usualAdultDose:
      'Children: Amebiasis 30–40 mg/kg/day divided into 3 doses for 7–10 days; Giardiasis 15–20 mg/kg/day divided into 2–3 doses for 5 days; Anaerobic infections 20–30 mg/kg/day divided into 3 doses. Shake well before use.',
    contraindications:
      'Hypersensitivity to metronidazole, nitroimidazoles, or any excipient.',
    commonAdverseEffects:
      'Nausea, abdominal pain, diarrhea, metallic taste, anorexia, and darkening of urine.',
    storageConditions: 'Store below 25°C protected from light.',
    specialties: ['Pediatrics', 'Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Flagyl S Oral Suspension (metronidazole benzoate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5473/smpc',
  },
  {
    brandName: 'Flagyl IV 500 mg/100 mL',
    brandNameAr: 'فلاجيل ٥٠٠ ملغ / ١٠٠ مل محلول للتسريب الوريدي',
    genericName: 'Metronidazole',
    activeIngredients: ['Metronidazole'],
    drugClass: 'Nitroimidazole Antibacterials & Antiprotozoals',
    strength: '500 mg / 100 mL (5 mg/mL)',
    dosageForm: 'Solution for intravenous infusion',
    route: 'Intravenous',
    packSize: '1 infusion bag / bottle x 100 mL',
    approvedIndications:
      'Treatment of severe surgical, intra-abdominal, pelvic, CNS, or septicemic anaerobic infections when oral therapy is not feasible, surgical prophylaxis against postoperative anaerobic infections, and severe amebic liver abscess.',
    usualAdultDose:
      'Adults: 500 mg (100 mL) infused intravenously over 20–30 minutes every 8 hours (1.5 g/day). Children: 20–30 mg/kg/day divided every 8 hours. Transition to oral Flagyl as soon as clinically appropriate.',
    contraindications:
      'Hypersensitivity to metronidazole or other nitroimidazole derivatives.',
    commonAdverseEffects:
      'Nausea, vomiting, metallic taste, thrombophlebitis at infusion site, dark urine, leukopenia, and peripheral or optic neuropathy with prolonged courses.',
    storageConditions: 'Store below 25°C in the outer overwrap to protect from light.',
    specialties: ['General Surgery', 'Obstetrics & Gynecology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Flagyl Injection (metronidazole IV) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/018353s053lbl.pdf',
  },
  {
    brandName: 'Rovamycine 3 MIU',
    brandNameAr: 'روفامايسين ٣ مليون وحدة دولية أقراص',
    genericName: 'Spiramycin',
    activeIngredients: ['Spiramycin'],
    drugClass: 'Macrolide Antibacterials',
    strength: '3 Million IU (3 MIU)',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '10 film-coated tablets',
    approvedIndications:
      'Prevention of congenital toxoplasmosis transmission during pregnancy in women with acute gestational Toxoplasma gondii infection; treatment of respiratory tract, ENT, stomatological/dental, skin, and genital infections caused by susceptible organisms (especially in penicillin-allergic patients); meningococcal meningitis prophylaxis.',
    usualAdultDose:
      'Adults (including maternal toxoplasmosis prophylaxis): 6 to 9 Million IU (2 to 3 tablets of 3 MIU) per day in 2 or 3 divided doses. Swallow whole with a glass of water.',
    contraindications:
      'Hypersensitivity to spiramycin or other macrolides; breastfeeding (excreted in breast milk).',
    commonAdverseEffects:
      'Nausea, vomiting, diarrhea, abdominal pain, transient paresthesia, rash/urticaria, and rare cholestatic hepatitis or QTc prolongation.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'ENT (Otolaryngology)', 'Internal Medicine', 'Pulmonology'],
    sourceTitle: 'Rovamycine (spiramycin) — Official Sanofi SmPC Information',
    sourceUrl: 'https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=64069094',
  },
  {
    brandName: 'Targocid 400 mg',
    brandNameAr: 'تارجوسيد ٤٠٠ ملغ فيال للزرق الوريدي أو العضلي',
    genericName: 'Teicoplanin',
    activeIngredients: ['Teicoplanin'],
    drugClass: 'Glycopeptide Antibacterials',
    strength: '400 mg',
    dosageForm: 'Powder and solvent for solution for injection/infusion or oral solution',
    route: 'Intravenous / Intramuscular / Oral (C. difficile only)',
    packSize: '1 vial x 400 mg + 1 ampoule x 3 mL water for injections',
    approvedIndications:
      'Severe Gram-positive infections including MRSA: complicated skin and soft tissue infections, bone and joint infections, hospital- and community-acquired pneumonia, complicated urinary tract infections, infective endocarditis, CAPD-associated peritonitis, bacteremia, and (by oral administration) Clostridioides difficile-associated diarrhea and colitis.',
    usualAdultDose:
      'Complicated skin/soft tissue, pneumonia, or UTI: loading dose 400 mg (6 mg/kg) IV/IM every 12 hours for 3 administrations, then maintenance 6 mg/kg once daily. Bone/joint infections or infective endocarditis: loading dose 800 mg (12 mg/kg) IV every 12 hours for 3 to 5 administrations, then maintenance 12 mg/kg once daily. Adjust dose after Day 4 in renal impairment.',
    contraindications:
      'Hypersensitivity to teicoplanin.',
    commonAdverseEffects:
      'Erythema, local pain, thrombophlebitis, rash, pruritus, drug fever, eosinophilia, thrombocytopenia, elevated transaminases, and rare nephrotoxicity or ototoxicity.',
    storageConditions: 'Store dry powder vials below 25°C.',
    specialties: ['Internal Medicine', 'Orthopedics', 'General Surgery', 'Pulmonology', 'Emergency Medicine'],
    sourceTitle: 'Targocid (teicoplanin) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/targocid',
  },
  {
    brandName: 'Tavanic 500 mg',
    brandNameAr: 'تافانيك ٥٠٠ ملغ أقراص',
    genericName: 'Levofloxacin hemihydrate',
    activeIngredients: ['Levofloxacin'],
    drugClass: 'Fluoroquinolone Antibacterials',
    strength: '500 mg',
    dosageForm: 'Scored film-coated tablet',
    route: 'Oral',
    packSize: '5 scored film-coated tablets',
    approvedIndications:
      'Treatment of bacterial infections in adults: community-acquired pneumonia, complicated skin and soft tissue infections, acute pyelonephritis and complicated urinary tract infections, chronic bacterial prostatitis, and (when other commonly recommended antibiotics are inappropriate) acute bacterial sinusitis or acute exacerbation of chronic obstructive pulmonary disease.',
    usualAdultDose:
      '500 mg once daily (or 500 mg twice daily in severe pneumonia or complicated skin infections) for 7–14 days (28 days in chronic bacterial prostatitis). Separate by at least 2 hours from iron salts, zinc, magnesium/aluminium antacids, or sucralfate. Adjust dose if CrCl < 50 mL/min.',
    contraindications:
      'Hypersensitivity to levofloxacin or other quinolones; epilepsy; history of tendon disorders related to fluoroquinolone administration; children or growing adolescents (<18 years); pregnancy and breastfeeding.',
    commonAdverseEffects:
      'Insomnia, headache, dizziness, diarrhea, vomiting, nausea, elevated hepatic enzymes, tendinitis and tendon rupture (especially Achilles tendon), peripheral neuropathy, photosensitivity, and QTc prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Pulmonology', 'Urology', 'Internal Medicine', 'ENT (Otolaryngology)', 'General Surgery'],
    sourceTitle: 'Tavanic (levofloxacin) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/tavanic',
  },
  {
    brandName: 'Claforan 1 g',
    brandNameAr: 'كلافوران ١ غرام فيال للزرق الوريدي أو العضلي',
    genericName: 'Cefotaxime sodium',
    activeIngredients: ['Cefotaxime'],
    drugClass: 'Third-Generation Cephalosporins',
    strength: '1 g',
    dosageForm: 'Powder for solution for injection / infusion',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial x 1 g + solvent ampoule',
    approvedIndications:
      'Severe infections caused by cefotaxime-susceptible bacteria: lower respiratory tract infections (pneumonia), urinary tract infections, septicemia/bacteremia, infective endocarditis, bacterial meningitis, intra-abdominal infections (peritonitis), skin/soft tissue, bone/joint, and pelvic/gonococcal infections; perioperative surgical prophylaxis.',
    usualAdultDose:
      'Uncomplicated infections: 1 g IV or IM every 12 hours (2 g/day). Moderate-to-severe infections: 1–2 g every 8 hours (3–6 g/day). Severe life-threatening infections / bacterial meningitis: 2 g IV every 6–8 hours (up to 12 g/day).',
    contraindications:
      'Hypersensitivity to cefotaxime or any cephalosporin; history of severe immediate hypersensitivity (anaphylaxis) to penicillins or other beta-lactam antibiotics.',
    commonAdverseEffects:
      'Injection site pain/phlebitis, rash, pruritus, drug fever, diarrhea, nausea, transient leukopenia or eosinophilia, and elevated hepatic transaminases.',
    storageConditions: 'Store below 25°C in the outer carton to protect from light.',
    specialties: ['Internal Medicine', 'Pediatrics', 'General Surgery', 'Pulmonology', 'Emergency Medicine'],
    sourceTitle: 'Claforan (cefotaxime sodium) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/050547s071lbl.pdf',
  },
  {
    brandName: 'Xatral XL 10 mg',
    brandNameAr: 'زاترال إكس إل ١٠ ملغ أقراص ممتدة المفعول',
    genericName: 'Alfuzosin hydrochloride',
    activeIngredients: ['Alfuzosin hydrochloride'],
    drugClass: 'Alpha-1 Adrenoceptor Antagonists (BPH)',
    strength: '10 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    approvedIndications:
      'Treatment of moderate-to-severe functional symptoms of benign prostatic hyperplasia (BPH) and adjunctive therapy to urethral catheterization in acute urinary retention (AUR) related to BPH.',
    usualAdultDose:
      'One 10 mg prolonged-release tablet once daily, taken immediately after the evening meal. Swallow whole with liquid; do not crush, chew, or divide.',
    contraindications:
      'Hypersensitivity to alfuzosin; history of orthostatic hypotension; hepatic insufficiency (Child-Pugh A, B, or C); combination with other alpha-1 blockers or potent CYP3A4 inhibitors (ketoconazole, itraconazole, ritonavir).',
    commonAdverseEffects:
      'Dizziness/faintness, headache, asthenia, postural hypotension, nausea, abdominal pain, rhinitis, and intraoperative floppy iris syndrome (IFIS) during cataract surgery.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Urology'],
    sourceTitle: 'Xatral XL (alfuzosin HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5479/smpc',
  },
  {
    brandName: 'Dupixent 300 mg/2 mL',
    brandNameAr: 'دوبيكسنت ٣٠٠ ملغ / ٢ مل محقنة / قلم مسبق التعبئة',
    genericName: 'Dupilumab',
    activeIngredients: ['Dupilumab'],
    drugClass: 'Anti-IL-4Rα Monoclonal Antibodies',
    strength: '300 mg / 2 mL (150 mg/mL)',
    dosageForm: 'Solution for injection in pre-filled syringe / pen',
    route: 'Subcutaneous',
    packSize: '2 pre-filled syringes / pens x 2 mL',
    approvedIndications:
      'Moderate-to-severe atopic dermatitis in adults and adolescents/children who are candidates for systemic therapy; add-on maintenance treatment for severe asthma with type 2 inflammation; severe chronic rhinosinusitis with nasal polyposis (CRSwNP); prurigo nodularis; eosinophilic esophagitis (EoE); and uncontrolled COPD with raised blood eosinophils.',
    usualAdultDose:
      'Atopic dermatitis / prurigo nodularis: initial dose of 600 mg (two 300 mg injections), followed by 300 mg given every other week (every 2 weeks) by subcutaneous injection. CRSwNP / COPD: 300 mg every 2 weeks.',
    contraindications:
      'Hypersensitivity to dupilumab or any excipient.',
    commonAdverseEffects:
      'Injection site reactions (erythema, edema, pruritus), conjunctivitis, blepharitis, oral herpes, eosinophilia, and arthralgia.',
    storageConditions: 'Store in a refrigerator (2°C–8°C) in the original carton to protect from light. Do not freeze.',
    specialties: ['Dermatology', 'Pulmonology', 'Allergy & Immunology', 'ENT (Otolaryngology)', 'Gastroenterology'],
    sourceTitle: 'Dupixent (dupilumab) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/dupixent',
  },
  {
    brandName: 'Taxotere 80 mg/4 mL',
    brandNameAr: 'تاكسوتير ٨٠ ملغ / ٤ مل فيال للتسريب الوريدي',
    genericName: 'Docetaxel',
    activeIngredients: ['Docetaxel'],
    drugClass: 'Taxane Antineoplastics',
    strength: '80 mg / 4 mL (20 mg/mL)',
    dosageForm: 'Concentrate for solution for intravenous infusion',
    route: 'Intravenous',
    packSize: '1 vial x 4 mL',
    approvedIndications:
      'Operable node-positive/node-negative, locally advanced, or metastatic breast cancer; locally advanced or metastatic non-small cell lung cancer (NSCLC); metastatic castration-resistant and hormone-sensitive prostate cancer; gastric adenocarcinoma; and locally advanced squamous cell carcinoma of the head and neck.',
    usualAdultDose:
      '75 to 100 mg/m² administered as a 1-hour intravenous infusion every 3 weeks (with oral dexamethasone premedication starting 1 day prior to infusion to reduce fluid retention and hypersensitivity).',
    contraindications:
      'Hypersensitivity to docetaxel or polysorbate 80; baseline neutrophil count < 1,500 cells/mm³; severe liver impairment.',
    commonAdverseEffects:
      'Neutropenia, febrile neutropenia, anemia, alopecia, stomatitis, diarrhea, nausea, vomiting, peripheral sensory/motor neuropathy, fluid retention, nail disorders, myalgia, arthralgia, and asthenia.',
    storageConditions: 'Store below 25°C in the outer carton to protect from light.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'Taxotere (docetaxel) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/taxotere',
  },
  {
    brandName: 'Eloxatin 100 mg/20 mL',
    brandNameAr: 'إيلوكساتين ١٠٠ ملغ / ٢٠ مل فيال للتسريب الوريدي',
    genericName: 'Oxaliplatin',
    activeIngredients: ['Oxaliplatin'],
    drugClass: 'Platinum Antineoplastics',
    strength: '100 mg / 20 mL (5 mg/mL)',
    dosageForm: 'Concentrate for solution for intravenous infusion',
    route: 'Intravenous',
    packSize: '1 vial x 20 mL',
    approvedIndications:
      'In combination with 5-fluorouracil (5-FU) and folinic acid (leucovorin) — FOLFOX regimen — for adjuvant treatment of stage III (Duke’s C) colon cancer after complete resection of the primary tumor, and treatment of metastatic colorectal cancer.',
    usualAdultDose:
      '85 mg/m² administered as a 2- to 6-hour intravenous infusion in 250–500 mL of 5% glucose solution (never dilute with NaCl/chloride solutions) every 2 weeks, always prior to fluoropyrimidines.',
    contraindications:
      'Hypersensitivity to oxaliplatin or other platinum compounds; breastfeeding; myelosuppression prior to starting first course (neutrophils < 2 × 10⁹/L and/or platelets < 100 × 10⁹/L); peripheral sensitive neuropathy with functional impairment prior to first course; severely impaired renal function (CrCl < 30 mL/min).',
    commonAdverseEffects:
      'Acute cold-triggered pharyngolaryngeal dysesthesia and peripheral sensory neuropathy (cumulative), nausea, vomiting, diarrhea, stomatitis, neutropenia, thrombocytopenia, anemia, fatigue, and elevated hepatic enzymes.',
    storageConditions: 'Store vial in the outer carton to protect from light. Do not freeze.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'Eloxatin (oxaliplatin) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/021759s023lbl.pdf',
  },
];

export const SANOFI_PRODUCTS: AiProductDraft[] =
  SANOFI_COMPACT_PRODUCTS.map(toSanofiDraft);
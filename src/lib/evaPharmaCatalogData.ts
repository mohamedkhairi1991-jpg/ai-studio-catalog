import type { AiDraftSource, AiProductDraft } from './catalog';

interface CompactDrug {
  brandName: string;
  brandNameAr: string;
  genericName: string;
  activeIngredients: string[];
  drugClass: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  indications: string;
  dose: string;
  contraindications: string;
  adverseEffects: string;
  storage: string;
  specialties: string[];
  sources: AiDraftSource[];
  notes: string;
  category?: AiProductDraft['category'];
}

const RAW_EVA_PHARMA: CompactDrug[] = [
  // 1. Thiotacid (Thioctic acid — EVA Pharma)
  {
    brandName: 'Thiotacid 300 mg',
    brandNameAr: 'ثيوتاسيد 300 ملغ',
    genericName: 'Thioctic acid',
    activeIngredients: ['Thioctic acid'],
    drugClass: 'Metabolic neuroprotective antioxidant (alpha-lipoic acid)',
    strength: '300 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of paraesthesias and neuropathic pain associated with diabetic sensorimotor peripheral polyneuropathy, as well as optic and alcoholic neuritis.',
    dose:
      'Adults: Total daily dose is 600 mg (two 300 mg tablets) taken as a single oral dose on an empty stomach approximately 30 minutes before breakfast. Food and polyvalent cations (iron, magnesium, calcium/dairy products) reduce oral absorption; separate from mineral supplements or dairy products.',
    contraindications:
      'Hypersensitivity to thioctic acid (alpha-lipoic acid) or to any of the excipients; children and adolescents (due to lack of clinical data).',
    adverseEffects:
      'Very rare: gastrointestinal symptoms (nausea, vomiting, stomach and intestinal pain, diarrhoea), allergic skin reactions (urticaria, pruritus, eczema, rash), dysgeusia, headache, dizziness, sweating, visual disturbances, hypoglycaemic symptoms (due to improved glucose utilisation in diabetic patients), insulin autoimmune syndrome.',
    storage:
      'Store below 30°C in a dry place, protected from light.',
    specialties: ['Endocrinology', 'Neurology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Thiotacid (thioctic acid / alpha-lipoic acid) Official Product Information',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma (Cairo, Egypt) SmPC data. Each film-coated tablet contains 300 mg thioctic acid (alpha-lipoic acid; INN base: Thioctic acid).',
  },
  {
    brandName: 'Thiotacid 600 mg',
    brandNameAr: 'ثيوتاسيد 600 ملغ',
    genericName: 'Thioctic acid',
    activeIngredients: ['Thioctic acid'],
    drugClass: 'Metabolic neuroprotective antioxidant (alpha-lipoic acid)',
    strength: '600 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of diabetic sensorimotor peripheral polyneuropathy (burning pain, numbness, tingling, and paraesthesias).',
    dose:
      'Adults: One 600 mg film-coated tablet once daily taken whole with water on an empty stomach 30 minutes before the first meal of the day.',
    contraindications:
      'Hypersensitivity to thioctic acid or excipients; children and adolescents.',
    adverseEffects:
      'Very rare: nausea, vomiting, abdominal pain, diarrhoea, allergic skin rash or urticaria, altered taste sensation, hypoglycaemia-like symptoms (dizziness, diaphoresis, headache) due to enhanced glucose uptake.',
    storage:
      'Store below 30°C in a dry place, protected from light.',
    specialties: ['Endocrinology', 'Neurology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Thiotacid 600 mg Official Product Information',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma SmPC data. Each film-coated tablet contains 600 mg thioctic acid (INN base: Thioctic acid).',
  },

  // 2. Mellitofix (Empagliflozin — EVA Pharma)
  {
    brandName: 'Mellitofix 10 mg',
    brandNameAr: 'ميليتوفيكس 10 ملغ',
    genericName: 'Empagliflozin',
    activeIngredients: ['Empagliflozin'],
    drugClass: 'Sodium-glucose co-transporter 2 (SGLT2) inhibitor',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of insufficiently controlled type 2 diabetes mellitus in adults and children aged 10 years and above as an adjunct to diet and exercise (as monotherapy when metformin is inappropriate due to intolerance, or in addition to other medicinal products for the treatment of diabetes); treatment of symptomatic chronic heart failure in adults; and treatment of chronic kidney disease in adults.',
    dose:
      'Type 2 diabetes mellitus: recommended starting dose is 10 mg empagliflozin once daily, which can be increased to 25 mg once daily in patients tolerating 10 mg who have eGFR >= 60 mL/min/1.73 m² and need tighter glycaemic control. Heart failure and chronic kidney disease: recommended dose is 10 mg once daily. Can be taken with or without food.',
    contraindications:
      'Hypersensitivity to empagliflozin or to any of the excipients.',
    adverseEffects:
      'Very common: hypoglycaemia (when used with sulphonylurea or insulin), volume depletion (in heart failure). Common: vaginal moniliasis, vulvovaginitis, balanitis and other genital infections, urinary tract infection (including pyelonephritis and urosepsis), thirst, constipation, pruritus, rash, increased urination, serum lipids increased. Rare: diabetic ketoacidosis (including euglycaemic DKA), necrotising fasciitis of the perineum (Fournier gangrene).',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Endocrinology', 'Cardiology', 'Nephrology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Diabetes & Cardiometabolic Portfolio (Mellitofix / Empagliflozin)',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma SmPC data. Each film-coated tablet contains 10 mg empagliflozin.',
  },
  {
    brandName: 'Mellitofix 25 mg',
    brandNameAr: 'ميليتوفيكس 25 ملغ',
    genericName: 'Empagliflozin',
    activeIngredients: ['Empagliflozin'],
    drugClass: 'Sodium-glucose co-transporter 2 (SGLT2) inhibitor',
    strength: '25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of type 2 diabetes mellitus in adults and children aged 10 years and older with eGFR >= 60 mL/min/1.73 m² requiring additional glycaemic control beyond 10 mg once daily.',
    dose:
      '25 mg once daily (maximum daily dose), taken with or without food.',
    contraindications:
      'Hypersensitivity to empagliflozin or excipients.',
    adverseEffects:
      'Common: genital mycotic infections, urinary tract infections, increased urination, thirst, volume depletion, hypoglycaemia (with insulin or insulin secretagogues). Rare: diabetic ketoacidosis, Fournier gangrene.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Endocrinology', 'Cardiology', 'Nephrology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Diabetes & Cardiometabolic Portfolio (Mellitofix 25 mg)',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma SmPC data. Each film-coated tablet contains 25 mg empagliflozin.',
  },

  // 3. Atoreza (Ezetimibe + Atorvastatin — EVA Pharma)
  {
    brandName: 'Atoreza 10 mg/10 mg',
    brandNameAr: 'أتوريزا 10 ملغ/10 ملغ',
    genericName: 'Ezetimibe + Atorvastatin',
    activeIngredients: ['Ezetimibe', 'Atorvastatin'],
    drugClass: 'Cholesterol absorption inhibitor and HMG-CoA reductase inhibitor (statin) fixed-dose combination',
    strength: '10 mg/10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Adjunctive therapy to diet in adult patients with primary (heterozygous familial and non-familial) hypercholesterolaemia or mixed hyperlipidaemia not appropriately controlled with a statin alone or already treated with a statin and ezetimibe; homozygous familial hypercholesterolaemia; and prevention of cardiovascular events in patients with coronary heart disease and a history of acute coronary syndrome.',
    dose:
      'One tablet (10 mg ezetimibe / 10 mg atorvastatin) once daily at any time of the day, with or without food (dose range 10 mg/10 mg to 10 mg/80 mg once daily).',
    contraindications:
      'Hypersensitivity to ezetimibe, atorvastatin, or excipients; pregnancy and breastfeeding, and in women of child-bearing potential not using appropriate contraceptive measures; active liver disease or unexplained persistent elevations in serum transaminases exceeding 3x ULN; concomitant treatment with glecaprevir/pibrentasvir.',
    adverseEffects:
      'Common: diarrhoea, myalgia. Uncommon: influenza, depression, insomnia, sleep disorder, dizziness, dysgeusia, headache, paraesthesia, sinus bradycardia, hot flush, dyspnoea, abdominal discomfort, abdominal distension, abdominal pain, constipation, dyspepsia, flatulence, gastritis, nausea, acne, urticaria, arthralgia, back pain, muscle fatigue, muscle spasms, muscular weakness, pain in extremity, asthenia, fatigue, malaise, oedema, increased ALT/AST, ALP, and blood creatine kinase.',
    storage:
      'Store below 30°C in the original package to protect from moisture and oxygen.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Cardiovascular Portfolio (Atoreza: ezetimibe / atorvastatin)',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma SmPC data. Each film-coated tablet contains 10 mg ezetimibe and atorvastatin calcium equivalent to 10 mg atorvastatin (INN bases: Ezetimibe + Atorvastatin).',
  },
  {
    brandName: 'Atoreza 10 mg/20 mg',
    brandNameAr: 'أتوريزا 10 ملغ/20 ملغ',
    genericName: 'Ezetimibe + Atorvastatin',
    activeIngredients: ['Ezetimibe', 'Atorvastatin'],
    drugClass: 'Cholesterol absorption inhibitor and HMG-CoA reductase inhibitor (statin) fixed-dose combination',
    strength: '10 mg/20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia (heterozygous familial and non-familial), mixed hyperlipidaemia, homozygous familial hypercholesterolaemia, and secondary prevention of cardiovascular events in patients with coronary heart disease.',
    dose:
      'One tablet (10 mg ezetimibe / 20 mg atorvastatin) once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to ezetimibe, atorvastatin, or excipients; active liver disease or persistent serum transaminase elevations >3x ULN; pregnancy and breastfeeding; concomitant glecaprevir/pibrentasvir.',
    adverseEffects:
      'Common: diarrhoea, myalgia. Uncommon: arthralgia, muscle spasms, headache, dizziness, dyspepsia, nausea, flatulence, elevated hepatic transaminases and creatine kinase.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'EVA Pharma — Cardiovascular Portfolio (Atoreza 10 mg/20 mg)',
        url: 'https://www.evapharma.com/',
      },
    ],
    notes:
      'Official EVA Pharma SmPC data. Each film-coated tablet contains 10 mg ezetimibe and atorvastatin calcium equivalent to 20 mg atorvastatin (INN bases: Ezetimibe + Atorvastatin). Also available in 10 mg/40 mg strength.',
  },
];

export const EVA_PHARMA_PRODUCTS: AiProductDraft[] = RAW_EVA_PHARMA.map((d) => ({
  found: true,
  brandName: d.brandName,
  brandNameAr: d.brandNameAr,
  category: d.category ?? 'prescription_drug',
  genericName: d.genericName,
  activeIngredients: d.activeIngredients,
  drugClass: d.drugClass,
  strength: d.strength,
  dosageForm: d.dosageForm,
  route: d.route,
  packSize: d.packSize,
  clinical: {
    approvedIndications: d.indications,
    usualAdultDose: d.dose,
    contraindications: d.contraindications,
    commonAdverseEffects: d.adverseEffects,
    storageConditions: d.storage,
  },
  specialties: d.specialties,
  sources: d.sources,
  notes: d.notes,
}));
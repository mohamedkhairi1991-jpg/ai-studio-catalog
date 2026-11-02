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

const RAW_SDI_SAMARRA: CompactDrug[] = [
  // 1. Samapril 20 mg (Enalapril — SDI Samarra)
  {
    brandName: 'Samapril 20 mg',
    brandNameAr: 'سامابريل 20 ملغ',
    genericName: 'Enalapril',
    activeIngredients: ['Enalapril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor antihypertensive (ATC C09AA02)',
    strength: '20 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Treatment of essential and renovascular hypertension; treatment of symptomatic heart failure; prevention of symptomatic heart failure in patients with asymptomatic left ventricular dysfunction (ejection fraction ≤35%).',
    dose:
      'Adults: Hypertension: Initial dose 5 to 20 mg once daily depending on degree of hypertension; usual maintenance dose is 20 mg once daily (maximum 40 mg daily). Heart failure: Initiate at 2.5 mg once daily and titrate gradually over 2–4 weeks to usual maintenance of 20 mg daily in 1 or 2 divided doses.',
    contraindications:
      'Hypersensitivity to enalapril, any other ACE inhibitor, or any excipient; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; second and third trimesters of pregnancy; concomitant use with sacubitril/valsartan (within 36 hours) or aliskiren in diabetes/renal impairment.',
    adverseEffects:
      'Dry persistent cough, dizziness, headache, hypotension (including orthostatic hypotension), hyperkalaemia, elevated serum creatinine, nausea, diarrhoea, fatigue, rash, angioedema.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product Directory Page 18 (سامابريل 20 ملغ)',
        url: 'https://sdi.industry.gov.iq/public/index.php/show/product?page=18',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each tablet contains enalapril maleate equivalent to 20 mg enalapril (INN base: Enalapril).',
  },

  // 2. Valiapam 5 mg (Diazepam — SDI Samarra)
  {
    brandName: 'Valiapam 5 mg',
    brandNameAr: 'فاليابام 5 ملغ',
    genericName: 'Diazepam',
    activeIngredients: ['Diazepam'],
    drugClass: 'Long-acting benzodiazepine anxiolytic, anticonvulsant, and skeletal muscle relaxant (ATC N05BA01)',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Short-term relief (2–4 weeks only) of severe anxiety; relief of acute skeletal muscle spasm due to local pathology or upper motor neuron disorders (cerebral palsy, paraplegia); adjunct in convulsive disorders and management of acute alcohol withdrawal symptoms.',
    dose:
      'Adults: Severe anxiety: 2 mg three times daily increased if necessary to 15–30 mg daily in divided doses. Muscle spasm: 2–15 mg daily in divided doses. Use lowest effective dose for the shortest possible duration (not exceeding 4 weeks including tapering).',
    contraindications:
      'Hypersensitivity to diazepam, other benzodiazepines, or any excipient; myasthenia gravis; severe respiratory insufficiency; sleep apnoea syndrome; severe hepatic insufficiency; acute narrow-angle glaucoma.',
    adverseEffects:
      'Drowsiness, sedation, muscle weakness, ataxia, fatigue, confusion, anterograde amnesia, dizziness, slurred speech, paradoxical CNS stimulation, physical and psychological dependence with withdrawal phenomena upon abrupt cessation.',
    storage:
      'Store below 25°C protected from light and moisture.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product Directory Page 18 (فالياپام 5 ملغ)',
        url: 'https://sdi.industry.gov.iq/public/index.php/show/product?page=18',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each tablet contains 5 mg diazepam (INN base: Diazepam).',
  },

  // 3. Dapoxin 10 mg (Dapagliflozin — SDI Samarra)
  {
    brandName: 'Dapoxin 10 mg',
    brandNameAr: 'دابوكسين 10 ملغ',
    genericName: 'Dapagliflozin',
    activeIngredients: ['Dapagliflozin'],
    drugClass: 'Sodium-glucose co-transporter 2 (SGLT2) inhibitor (ATC A10BK01)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of insufficiently controlled type 2 diabetes mellitus in adults and children aged 10 years and above as an adjunct to diet and exercise (as monotherapy when metformin is inappropriate, or in addition to other glucose-lowering medicinal products); treatment of symptomatic chronic heart failure and chronic kidney disease in adults.',
    dose:
      'Recommended dose is 10 mg orally once daily for type 2 diabetes mellitus, heart failure, and chronic kidney disease, taken at any time of day with or without food. Swallow tablet whole.',
    contraindications:
      'Hypersensitivity to dapagliflozin or any excipient.',
    adverseEffects:
      'Vulvovaginal candidiasis, balanitis and related genital mycotic infections, urinary tract infection, hypoglycaemia (when used with sulphonylurea or insulin), polyuria, dysuria, dizziness, back pain, dyslipidaemia, increased haematocrit. Rare: diabetic ketoacidosis, Fournier gangrene.',
    storage:
      'Store below 30°C in the original blister package.',
    specialties: ['Endocrinology & Diabetes', 'Cardiology', 'Nephrology', 'Internal Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product & Agency List PDF (Dapoxin 10 mg)',
        url: 'https://www.sdi.industry.gov.iq/uploads/files/2025/08/921334_25-08-06-08-53-15_9a3085f3f10bddeeee787073960e1dd5b8fc3cbb.pdf',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each film-coated tablet contains dapagliflozin propanediol monohydrate equivalent to 10 mg dapagliflozin base (INN base: Dapagliflozin).',
  },

  // 4. Linagliptin SDI 5 mg (Linagliptin — SDI Samarra)
  {
    brandName: 'Linagliptin SDI 5 mg',
    brandNameAr: 'ليناغليبتين سامراء 5 ملغ',
    genericName: 'Linagliptin',
    activeIngredients: ['Linagliptin'],
    drugClass: 'Dipeptidyl peptidase-4 (DPP-4) inhibitor oral antihyperglycaemic agent (ATC A10BH05)',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of type 2 diabetes mellitus in adults as an adjunct to diet and exercise to improve glycaemic control as monotherapy (when metformin is inappropriate due to intolerance or contraindicated due to renal impairment) or in combination with metformin, sulphonylureas, SGLT2 inhibitors, or insulin.',
    dose:
      'Adults: 5 mg orally once daily taken with or without a meal at any time of the day. No dose adjustment is required in patients with renal or hepatic impairment.',
    contraindications:
      'Hypersensitivity to linagliptin or to any of the excipients.',
    adverseEffects:
      'Nasopharyngitis, cough, hypoglycaemia (when combined with metformin plus sulphonylurea or insulin), elevated lipase. Uncommon/Rare: hypersensitivity, angioedema, urticaria, acute pancreatitis, bullous pemphigoid.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Endocrinology & Diabetes', 'Internal Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product & Agency List PDF (Linagliptin SDI 5 mg)',
        url: 'https://www.sdi.industry.gov.iq/uploads/files/2025/08/921334_25-08-06-08-53-15_9a3085f3f10bddeeee787073960e1dd5b8fc3cbb.pdf',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each film-coated tablet contains 5 mg linagliptin (INN base: Linagliptin).',
  },
];

export const SDI_SAMARRA_PRODUCTS: AiProductDraft[] = RAW_SDI_SAMARRA.map((d) => ({
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

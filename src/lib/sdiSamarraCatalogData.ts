import type { AiDraftSource, AiProductDraft } from './catalog';

interface CompactDrug {
  brandName: string;
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
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product Directory Page 18 (Samapril 20 mg)',
        url: 'https://sdi.industry.gov.iq/public/index.php/show/product?page=18',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each tablet contains enalapril maleate equivalent to 20 mg enalapril (INN base: Enalapril).',
  },

  // 2. Valiapam 5 mg (Diazepam — SDI Samarra)
  {
    brandName: 'Valiapam 5 mg',
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
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product Directory Page 18 (Valiapam 5 mg)',
        url: 'https://sdi.industry.gov.iq/public/index.php/show/product?page=18',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each tablet contains 5 mg diazepam (INN base: Diazepam).',
  },

  // 3. Dapoxin 10 mg (Dapagliflozin — SDI Samarra)
  {
    brandName: 'Dapoxin 10 mg',
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
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Official Product & Agency List PDF (Linagliptin SDI 5 mg)',
        url: 'https://www.sdi.industry.gov.iq/uploads/files/2025/08/921334_25-08-06-08-53-15_9a3085f3f10bddeeee787073960e1dd5b8fc3cbb.pdf',
      },
    ],
    notes:
      'Official SDI Samarra product directory data. Each film-coated tablet contains 5 mg linagliptin (INN base: Linagliptin).',
  },
  {
    brandName: 'Asthmasam 2 mg',
    genericName: 'Salbutamol',
    activeIngredients: ['Salbutamol sulfate'],
    drugClass: 'Selective Short-Acting Beta2-Adrenoceptor Agonists (SABA)',
    strength: '2 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 tablets',
    indications:
      'Symptomatic relief and prevention of bronchospasm in bronchial asthma, chronic bronchitis, and other reversible obstructive airway diseases when inhalation therapy is unsuitable.',
    dose:
      'Adults: 2 mg to 4 mg orally 3 or 4 times daily (start with 2 mg three or four times daily in elderly or beta-agonist-sensitive patients).',
    contraindications:
      'Hypersensitivity to salbutamol or any excipient. Non-intravenous formulations must not be used to arrest uncomplicated premature labour or threatened abortion.',
    adverseEffects:
      'Fine skeletal muscle tremor (especially hands), tachycardia, palpitations, headache, peripheral vasodilation, muscle cramps, hypokalaemia (with high doses).',
    storage: 'Store below 30°C in a dry place protected from light.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Pediatrics', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Respiratory Portfolio (Asthmasam)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra respiratory portfolio data. Each tablet contains salbutamol sulfate equivalent to 2 mg salbutamol.',
  },
  {
    brandName: 'Asthmasam 4 mg',
    genericName: 'Salbutamol',
    activeIngredients: ['Salbutamol sulfate'],
    drugClass: 'Selective Short-Acting Beta2-Adrenoceptor Agonists (SABA)',
    strength: '4 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 tablets',
    indications:
      'Relief of reversible bronchospasm in bronchial asthma and chronic obstructive bronchitis in adults when inhaled bronchodilators cannot be used effectively.',
    dose:
      'Adults: One 4 mg tablet orally 3 or 4 times daily (up to a maximum of 8 mg three or four times daily if required and tolerated).',
    contraindications:
      'Hypersensitivity to salbutamol or any excipient.',
    adverseEffects:
      'Fine tremor, palpitations, sinus tachycardia, headache, muscle cramps, hypokalaemia.',
    storage: 'Store below 30°C in a dry place protected from light.',
    specialties: ['Pulmonology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Respiratory Portfolio (Asthmasam 4 mg)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra respiratory portfolio data. Each tablet contains salbutamol sulfate equivalent to 4 mg salbutamol.',
  },
  {
    brandName: 'Samilin Syrup',
    genericName: 'Diphenhydramine hydrochloride + Ammonium chloride',
    activeIngredients: ['Diphenhydramine hydrochloride', 'Ammonium chloride'],
    drugClass: 'Antihistamine & Expectorant Cough Mixtures',
    strength: '13.5 mg / 131.5 mg per 5 mL',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: '1 bottle (100 mL or 120 mL)',
    indications:
      'Symptomatic relief of cough and upper respiratory tract congestion associated with acute bronchitis, common cold, and allergic respiratory conditions.',
    dose:
      'Adults and adolescents (≥12 years): 5 to 10 mL (1 to 2 teaspoons) orally 3 times daily.',
    contraindications:
      'Hypersensitivity to diphenhydramine or any excipient; acute asthma attack; narrow-angle glaucoma; symptomatic prostatic hypertrophy or urinary retention; concomitant monoamine oxidase inhibitors (MAOIs); severe hepatic or renal impairment.',
    adverseEffects:
      'Drowsiness, sedation, dizziness, dry mouth, nose and throat, blurred vision, thickened bronchial secretions, gastrointestinal upset.',
    storage: 'Store below 30°C in a tightly closed bottle, protected from light.',
    specialties: ['Pulmonology', 'General Practice / Family Medicine', 'Internal Medicine', 'ENT (Otolaryngology)'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Respiratory Syrups Portfolio (Samilin)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra cough/expectorant syrup formulation.',
  },
  {
    brandName: 'Sedilar 15 mg Tablet (Sidlar)',
    genericName: 'Dextromethorphan hydrobromide',
    activeIngredients: ['Dextromethorphan hydrobromide'],
    drugClass: 'Centrally Acting Non-Opioid Antitussives (Cough Suppressants)',
    strength: '15 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets',
    indications:
      'Symptomatic relief of unproductive (dry, irritating, hacky) cough due to throat or bronchial irritation.',
    dose:
      'Adults and adolescents (≥12 years): 15 to 30 mg (1 to 2 tablets) orally 3 to 4 times daily as needed; maximum 120 mg in 24 hours.',
    contraindications:
      'Hypersensitivity to dextromethorphan; concomitant use with or within 14 days of monoamine oxidase inhibitors (MAOIs), SSRIs, or linezolid (risk of serotonin syndrome); respiratory failure, acute asthma, or productive cough with copious mucus.',
    adverseEffects:
      'Dizziness, drowsiness, nausea, gastrointestinal discomfort, excitation or confusion at high doses.',
    storage: 'Store below 30°C in a dry place.',
    specialties: ['Pulmonology', 'General Practice / Family Medicine', 'Internal Medicine', 'ENT (Otolaryngology)'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Antitussive Portfolio (Sedilar)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra antitussive tablet (commonly written clinically as Sidlar / Sedilar 15 mg).',
  },
  {
    brandName: 'Sedilar Syrup (Sidlar Syrup)',
    genericName: 'Dextromethorphan hydrobromide',
    activeIngredients: ['Dextromethorphan hydrobromide'],
    drugClass: 'Centrally Acting Non-Opioid Antitussives (Cough Suppressants)',
    strength: '15 mg / 5 mL',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: '1 bottle (100 mL)',
    indications:
      'Symptomatic suppression of non-productive dry cough in adults and children aged 6 years and older.',
    dose:
      'Adults and adolescents (≥12 years): 5 to 10 mL (15 to 30 mg) orally 3 times daily (maximum 4 doses in 24 hours).',
    contraindications:
      'Hypersensitivity to dextromethorphan; concomitant MAOIs or serotonergic drugs within 14 days; chronic productive cough, bronchial asthma, or respiratory insufficiency.',
    adverseEffects:
      'Mild drowsiness, dizziness, nausea, vomiting, abdominal discomfort.',
    storage: 'Store below 30°C in the original bottle.',
    specialties: ['Pulmonology', 'General Practice / Family Medicine', 'Internal Medicine', 'Pediatrics'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Antitussive Portfolio (Sedilar Syrup)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra dry cough suppressant syrup (commonly written clinically as Sidlar Syrup).',
  },
  {
    brandName: 'Tussilar 15 mg Tablet',
    genericName: 'Dextromethorphan hydrobromide',
    activeIngredients: ['Dextromethorphan hydrobromide'],
    drugClass: 'Centrally Acting Non-Opioid Antitussives (Cough Suppressants)',
    strength: '15 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets',
    indications:
      'Symptomatic relief of dry, non-productive irritating cough.',
    dose:
      'Adults and adolescents (≥12 years): One to two 15 mg tablets orally 3 to 4 times daily as needed (maximum 120 mg/day).',
    contraindications:
      'Hypersensitivity to dextromethorphan; concomitant MAOIs within 14 days; respiratory failure, asthma, or productive cough.',
    adverseEffects:
      'Drowsiness, dizziness, nausea, mild gastrointestinal upset.',
    storage: 'Store below 30°C in a dry place.',
    specialties: ['Pulmonology', 'General Practice / Family Medicine', 'Internal Medicine'],
    sources: [
      {
        title: 'State Company for Drugs Industry and Medical Appliances (SDI Samarra) — Tussilar 15 mg (dextromethorphan)',
        url: 'https://www.sdi.industry.gov.iq',
      },
    ],
    notes:
      'Official SDI Samarra dextromethorphan 15 mg tablet presentation.',
  },
];

export const SDI_SAMARRA_PRODUCTS: AiProductDraft[] = RAW_SDI_SAMARRA.map((d) => ({
  found: true,
  brandName: d.brandName,
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

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

const RAW_JOSWE: CompactDrug[] = [
  // 1. Arbiten (Valsartan — JOSWE Medical)
  {
    brandName: 'Arbiten 80 mg',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents 6 to less than 18 years of age; treatment of clinically stable adult patients with symptomatic heart failure or asymptomatic left ventricular systolic dysfunction after a recent (12 hours to 10 days) myocardial infarction; and treatment of symptomatic heart failure in adult patients when ACE inhibitors are not tolerated.',
    dose:
      'Hypertension: recommended starting dose is 80 mg once daily; if blood pressure is not adequately controlled, the dose may be increased to 160 mg and to a maximum of 320 mg once daily. Heart failure: starting dose 40 mg twice daily, titrated to 80 mg and 160 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant use with sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, postural dizziness, hypotension, orthostatic hypotension, decreased renal function and renal impairment (in heart failure/post-MI). Uncommon: vertigo, cough, abdominal pain, fatigue, asthenia, hyperkalaemia, syncope, headache, nausea, diarrhoea, angioedema.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'JOSWE Medical (Jordan Sweden Medical and Sterilization Co.) — Cardiovascular Portfolio (Arbiten / Valsartan)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical (Na’ur, Amman, Jordan) product portfolio and SmPC data. Each film-coated tablet contains 80 mg valsartan.',
  },
  {
    brandName: 'Arbiten 160 mg',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '160 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Essential hypertension; clinically stable post-myocardial infarction left ventricular systolic dysfunction; and symptomatic chronic heart failure when ACE inhibitors cannot be used.',
    dose:
      'Hypertension: 160 mg once daily (up to a maximum of 320 mg once daily). Heart failure and post-myocardial infarction target maintenance dose: 160 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, orthostatic hypotension, renal impairment, hyperkalaemia (especially in heart failure or renal disease). Uncommon: vertigo, cough, abdominal pain, diarrhoea, nausea, fatigue, syncope, angioedema.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'JOSWE Medical — Cardiovascular Portfolio (Arbiten 160 mg)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains 160 mg valsartan.',
  },

  // 2. Corteza (Rosuvastatin — JOSWE Medical)
  {
    brandName: 'Corteza 10 mg',
    genericName: 'Rosuvastatin',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of primary hypercholesterolaemia (type IIa including heterozygous familial hypercholesterolaemia) or mixed dyslipidaemia (type IIb) in adults, adolescents, and children aged 6 years or older as an adjunct to diet; homozygous familial hypercholesterolaemia; and prevention of major cardiovascular events in patients estimated to have a high risk for a first cardiovascular event.',
    dose:
      'Recommended start dose is 5 mg or 10 mg orally once daily in both statin-naive and switched patients. Dose adjustment to the next dose level can be made after 4 weeks if necessary. May be given at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to rosuvastatin or excipients; active liver disease including unexplained persistent elevations of serum transaminases (>3x ULN); severe renal impairment (CrCl < 30 mL/min); myopathy; concomitant combination of sofosbuvir/velpatasvir/voxilaprevir; concomitant ciclosporin; pregnancy and lactation.',
    adverseEffects:
      'Common: diabetes mellitus, headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia. Uncommon: pruritus, rash, urticaria.',
    storage:
      'Store below 30°C in the original package to protect from moisture and light.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'JOSWE Medical — Cardiovascular Portfolio (Corteza / Rosuvastatin)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains rosuvastatin calcium equivalent to 10 mg rosuvastatin (INN base: Rosuvastatin).',
  },
  {
    brandName: 'Corteza 20 mg',
    genericName: 'Rosuvastatin',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'High-intensity lipid lowering in primary hypercholesterolaemia, heterozygous and homozygous familial hypercholesterolaemia, mixed dyslipidaemia, and primary/secondary cardiovascular event prevention.',
    dose:
      '20 mg once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to rosuvastatin or excipients; active liver disease or persistent transaminase elevations >3x ULN; severe renal impairment (CrCl < 30 mL/min); myopathy; concomitant ciclosporin; pregnancy and lactation.',
    adverseEffects:
      'Common: headache, dizziness, constipation, nausea, abdominal pain, myalgia, diabetes mellitus, asthenia.',
    storage:
      'Store below 30°C in the original package to protect from moisture and light.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'JOSWE Medical — Cardiovascular Portfolio (Corteza 20 mg)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains rosuvastatin calcium equivalent to 20 mg rosuvastatin (INN base: Rosuvastatin).',
  },

  // 3. B-Cor (Bisoprolol — JOSWE Medical)
  {
    brandName: 'B-Cor 5 mg',
    genericName: 'Bisoprolol',
    activeIngredients: ['Bisoprolol'],
    drugClass: 'Cardioselective beta-1 adrenergic receptor blocker',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of hypertension; treatment of coronary heart disease (chronic stable angina pectoris); and treatment of stable chronic heart failure with reduced systolic left ventricular function in addition to ACE inhibitors and diuretics, and optionally cardiac glycosides.',
    dose:
      'Hypertension and angina pectoris: usual dose is 5 mg to 10 mg once daily (maximum 20 mg once daily). Stable chronic heart failure: initiated at 1.25 mg once daily and gradually titrated up to a maximum maintenance dose of 10 mg once daily. Take in the morning with or without food.',
    contraindications:
      'Hypersensitivity to bisoprolol or excipients; acute heart failure or during episodes of heart failure decompensation requiring IV inotropic therapy; cardiogenic shock; second or third degree AV block (without a pacemaker); sick sinus syndrome; sinoatrial block; symptomatic bradycardia; symptomatic hypotension; severe bronchial asthma or severe COPD; severe peripheral arterial occlusive disease or Raynaud syndrome; untreated phaeochromocytoma; metabolic acidosis.',
    adverseEffects:
      'Very common: bradycardia (in chronic heart failure patients). Common: worsening of pre-existing heart failure, dizziness, headache, feeling of coldness or numbness in the extremities, hypotension, gastrointestinal complaints (nausea, vomiting, diarrhoea, constipation), asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'JOSWE Medical — Cardiovascular Portfolio (B-Cor / Bisoprolol fumarate)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains 5 mg bisoprolol fumarate (INN base: Bisoprolol). Also available in 2.5 mg and 10 mg strengths.',
  },

  // 4. Clovex (Clopidogrel — JOSWE Medical)
  {
    brandName: 'Clovex 75 mg',
    genericName: 'Clopidogrel',
    activeIngredients: ['Clopidogrel'],
    drugClass: 'P2Y12 adenosine diphosphate (ADP)-receptor antagonist (antiplatelet agent)',
    strength: '75 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Secondary prevention of atherothrombotic events in adult patients suffering from myocardial infarction, ischaemic stroke, or established peripheral arterial disease; acute coronary syndrome (non-ST segment elevation ACS or ST-segment elevation acute myocardial infarction) in combination with acetylsalicylic acid (ASA); and prevention of atherothrombotic and thromboembolic events in atrial fibrillation (with ASA) when vitamin K antagonists are unsuitable.',
    dose:
      '75 mg as a single daily dose, taken with or without food.',
    contraindications:
      'Hypersensitivity to clopidogrel or excipients; severe hepatic impairment; active pathological bleeding such as peptic ulcer or intracranial haemorrhage.',
    adverseEffects:
      'Common: haematoma, epistaxis, gastrointestinal haemorrhage, diarrhoea, abdominal pain, dyspepsia, bruising, bleeding at puncture site.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Neurology', 'Internal Medicine', 'Vascular Surgery'],
    sources: [
      {
        title: 'JOSWE Medical — Cardiovascular Portfolio (Clovex / Clopidogrel 75 mg)',
        url: 'https://joswe.com/therapeutic-category/cardiovascular/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains clopidogrel bisulfate equivalent to 75 mg clopidogrel (INN base: Clopidogrel).',
  },

  // 5. Evox (Levofloxacin — JOSWE Medical)
  {
    brandName: 'Evox 500 mg',
    genericName: 'Levofloxacin',
    activeIngredients: ['Levofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 5 or 7 film-coated tablets in blister',
    indications:
      'Treatment of bacterial infections in adults: acute bacterial sinusitis, acute exacerbation of chronic obstructive pulmonary disease, community-acquired pneumonia, complicated skin and soft tissue infections, acute pyelonephritis and complicated urinary tract infections, chronic bacterial prostatitis, and inhalational anthrax.',
    dose:
      'Adults with normal renal function (CrCl > 50 mL/min): 500 mg once daily (or 500 mg twice daily for severe community-acquired pneumonia or complicated skin/soft tissue infections) for 7 to 14 days (28 days for chronic bacterial prostatitis). Separate by at least 2 hours from iron salts, zinc salts, magnesium/aluminium-containing antacids, or sucralfate.',
    contraindications:
      'Hypersensitivity to levofloxacin, other quinolones, or excipients; epilepsy; history of tendon disorders related to fluoroquinolone administration; children or growing adolescents; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: insomnia, headache, dizziness, diarrhoea, vomiting, nausea, hepatic enzyme increased (ALT/AST). Uncommon/Rare: fungal infection, leukopenia, anxiety, confusional state, tremor, vertigo, dyspnoea, abdominal pain, dyspepsia, rash, pruritus, arthralgia, myalgia, tendinitis (including Achilles tendon), QT prolongation.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'JOSWE Medical — Anti-Infectives Portfolio (Evox / Levofloxacin)',
        url: 'https://joswe.com/therapeutic-category/anti-infective/',
      },
    ],
    notes:
      'Official JOSWE Medical product portfolio and SmPC data. Each film-coated tablet contains levofloxacin hemihydrate equivalent to 500 mg levofloxacin (INN base: Levofloxacin). Also available in 250 mg and 750 mg strengths.',
  },
];

export const JOSWE_PRODUCTS: AiProductDraft[] = RAW_JOSWE.map((d) => ({
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

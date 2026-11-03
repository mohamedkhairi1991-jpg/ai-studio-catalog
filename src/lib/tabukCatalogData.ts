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

const RAW_TABUK: CompactDrug[] = [
  // 1. Tabuvan (Valsartan — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Tabuvan 80 mg',
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
      'Hypertension: recommended starting dose is 80 mg once daily; if blood pressure is not adequately controlled, the dose may be increased to 160 mg and to a maximum of 320 mg once daily. Heart failure: starting dose 40 mg twice daily, titrated to 80 mg and 160 mg twice daily as tolerated. Post-myocardial infarction: starting dose 20 mg twice daily, titrated up to a target of 160 mg twice daily.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant use with sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, postural dizziness, hypotension, orthostatic hypotension, decreased renal function and renal impairment (in heart failure/post-MI). Uncommon: vertigo, cough, abdominal pain, fatigue, asthenia, hyperkalaemia, syncope, headache, nausea, diarrhoea, angioedema, acute renal failure.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuvan (valsartan) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. (Saudi Arabia) product page and SmPC data. Each film-coated tablet contains 80 mg valsartan.',
  },
  {
    brandName: 'Tabuvan 160 mg',
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
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuvan (valsartan) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 160 mg valsartan.',
  },

  // 2. Co-Tabuvan (Valsartan + Hydrochlorothiazide — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Co-Tabuvan 80 mg/12.5 mg',
    genericName: 'Valsartan + Hydrochlorothiazide',
    activeIngredients: ['Valsartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '80 mg/12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled by valsartan or hydrochlorothiazide monotherapy.',
    dose:
      'One film-coated tablet (80 mg valsartan / 12.5 mg hydrochlorothiazide) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, sulfonamide-derived substances, or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, and cholestasis; severe renal impairment (CrCl < 30 mL/min), anuria; refractory hypokalaemia, hyponatraemia, hypercalcaemia, and symptomatic hyperuricaemia; concomitant aliskiren in diabetes mellitus or renal impairment.',
    adverseEffects:
      'Uncommon: dehydration, dizziness, paraesthesia, blurred vision, tinnitus, hypotension, cough, myalgia, fatigue. Electrolyte disturbances: hypokalaemia or hyperkalaemia, hyponatraemia, hyperuricaemia, hyperglycaemia.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Co-Tabuvan (valsartan / hydrochlorothiazide) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 80 mg valsartan and 12.5 mg hydrochlorothiazide.',
  },
  {
    brandName: 'Co-Tabuvan 160 mg/12.5 mg',
    genericName: 'Valsartan + Hydrochlorothiazide',
    activeIngredients: ['Valsartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '160 mg/12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on valsartan 160 mg or hydrochlorothiazide monotherapy.',
    dose:
      'One film-coated tablet (160 mg valsartan / 12.5 mg hydrochlorothiazide) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, sulfonamides, or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, cholestasis; severe renal impairment (CrCl < 30 mL/min), anuria; refractory hypokalaemia, hyponatraemia, hypercalcaemia, or symptomatic hyperuricaemia; concomitant aliskiren in diabetes mellitus or renal impairment.',
    adverseEffects:
      'Uncommon: dizziness, hypotension, dehydration, cough, myalgia, fatigue, electrolyte imbalances (hypokalaemia, hyponatraemia, hyperuricaemia).',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Co-Tabuvan (valsartan / hydrochlorothiazide) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 160 mg valsartan and 12.5 mg hydrochlorothiazide.',
  },

  // 3. Toprazole (Pantoprazole — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Toprazole 20 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis; and prevention of gastroduodenal ulcers induced by non-selective NSAIDs in patients at risk requiring continuous NSAID treatment.',
    dose:
      'Symptomatic GORD and long-term reflux oesophagitis maintenance: 20 mg once daily. NSAID-induced ulcer prophylaxis: 20 mg once daily. Swallow whole 1 hour before a meal with water; do not crush or chew.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain, elevated liver enzymes, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Toprazole (pantoprazole) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 20 mg pantoprazole (INN base: Pantoprazole).',
  },
  {
    brandName: 'Toprazole 40 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Reflux oesophagitis; eradication of Helicobacter pylori in combination with two appropriate antibiotics in patients with peptic ulcers; gastric and duodenal ulcer; and Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily for 2–8 weeks. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Zollinger-Ellison syndrome: initially 80 mg daily. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, bloating, constipation, dry mouth, abdominal pain, elevated hepatic transaminases, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Toprazole (pantoprazole) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole (INN base: Pantoprazole).',
  },

  // 4. Divido (Diclofenac — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Divido 75 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, dual-release phenylacetic acid derivative)',
    strength: '75 mg',
    dosageForm: 'Modified-release hard capsule',
    route: 'Oral',
    packSize: 'Pack of 20 dual-release hard capsules in blisters',
    indications:
      'Symptomatic relief of acute and chronic pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, acute gout, acute musculoskeletal disorders, post-operative and post-traumatic pain and swelling, and primary dysmenorrhoea.',
    dose:
      'Adults: One 75 mg dual-release capsule once daily, or in severe cases one 75 mg capsule twice daily (maximum daily dose 150 mg). Swallow whole with liquid during or after meals.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or history of recurrent peptic ulcer/haemorrhage; history of GI bleeding or perforation related to previous NSAID therapy; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, anorexia, elevated transaminases, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Divido (diclofenac sodium 75 mg dual-release capsule) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each dual-release hard capsule contains 75 mg diclofenac sodium (25 mg gastro-resistant pellets and 50 mg prolonged-release pellets; INN base: Diclofenac).',
  },
];

export const TABUK_PRODUCTS: AiProductDraft[] = RAW_TABUK.map((d) => ({
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

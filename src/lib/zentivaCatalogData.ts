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

const RAW_ZENTIVA: CompactDrug[] = [
  // 1. Helicid (Omeprazole — Zentiva, k.s.)
  {
    brandName: 'Helicid 20 mg',
    brandNameAr: 'هيليسيد 20 ملغ',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant hard capsules',
    indications:
      'Treatment and prevention of relapse of duodenal ulcers and benign gastric ulcers; eradication of Helicobacter pylori in peptic ulcer disease in combination with appropriate antibiotics; treatment and prevention of NSAID-associated gastric and duodenal ulcers; treatment of reflux oesophagitis and long-term management of patients with healed reflux oesophagitis; symptomatic gastro-oesophageal reflux disease; and treatment of Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 20 mg once daily for 2–4 weeks. Gastric ulcer and reflux oesophagitis: 20 mg once daily for 4–8 weeks (up to 40 mg once daily in refractory cases). H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics. NSAID ulcer prophylaxis: 20 mg once daily. Swallow capsules whole in the morning with half a glass of water; do not chew or crush enteric-coated pellets.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or to any of the excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps. Uncommon: insomnia, dizziness, paraesthesia, somnolence, vertigo, increased liver enzymes, dermatitis, pruritus, rash, urticaria, fracture of hip, wrist or spine, malaise, peripheral oedema.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture and light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Zentiva, k.s. — Helicid (omeprazole) Product Portfolio & National SmPC (SÚKL)',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. / SÚKL SmPC data. Each gastro-resistant hard capsule contains 20 mg omeprazole.',
  },
  {
    brandName: 'Helicid 40 mg',
    brandNameAr: 'هيليسيد 40 ملغ',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant hard capsules',
    indications:
      'Severe or refractory reflux oesophagitis; refractory duodenal or benign gastric ulcers; and pathological hypersecretory conditions including Zollinger-Ellison syndrome.',
    dose:
      'Refractory peptic ulcer or severe reflux oesophagitis: 40 mg once daily for 4 to 8 weeks. Zollinger-Ellison syndrome: recommended initial dose is 60 mg daily, adjusted individually (usual maintenance range 20 mg to 120 mg daily; doses above 80 mg/day should be divided and given twice daily).',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, diarrhoea, constipation, abdominal pain, nausea, vomiting, flatulence, benign fundic gland polyps. Long-term therapy: hypomagnesaemia, vitamin B12 malabsorption, increased risk of Clostridioides difficile gastrointestinal infection and osteoporotic fractures.',
    storage:
      'Store below 25°C in the original package to protect from moisture and light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Zentiva, k.s. — Helicid (omeprazole) Product Portfolio & National SmPC (SÚKL)',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. / SÚKL SmPC data. Each gastro-resistant hard capsule contains 40 mg omeprazole.',
  },

  // 2. Agen (Amlodipine — Zentiva, k.s.)
  {
    brandName: 'Agen 5 mg',
    brandNameAr: 'أجين 5 ملغ',
    genericName: 'Amlodipine',
    activeIngredients: ['Amlodipine'],
    drugClass: 'Dihydropyridine calcium channel blocker',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; and vasospastic (Prinzmetal) angina.',
    dose:
      'Adults: For both hypertension and angina, the usual initial dose is 5 mg once daily, which may be increased to a maximum dose of 10 mg once daily depending on the individual patient’s response. Children and adolescents (6–17 years) with hypertension: 2.5 mg once daily (half of a scored 5 mg tablet), titrated to 5 mg once daily after 4 weeks if blood pressure goal is not achieved.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; shock (including cardiogenic shock); obstruction of the outflow tract of the left ventricle (e.g. high grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: oedema. Common: somnolence, dizziness, headache, visual disturbances, palpitations, flushing, dyspnoea, abdominal pain, nausea, dyspepsia, altered bowel habits, ankle swelling, muscle cramps, fatigue, asthenia.',
    storage:
      'Store below 25°C in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Zentiva, k.s. — Agen (amlodipine) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each tablet contains amlodipine besilate equivalent to 5 mg amlodipine (INN base: Amlodipine).',
  },
  {
    brandName: 'Agen 10 mg',
    brandNameAr: 'أجين 10 ملغ',
    genericName: 'Amlodipine',
    activeIngredients: ['Amlodipine'],
    drugClass: 'Dihydropyridine calcium channel blocker',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; and vasospastic (Prinzmetal) angina in adults requiring maximal dihydropyridine calcium channel blockade.',
    dose:
      'Adults: 10 mg once daily (maximum daily dose) for patients not adequately controlled on 5 mg once daily. May be used in combination with thiazide diuretics, alpha-blockers, beta-blockers, ACE inhibitors, or angiotensin II receptor blockers.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; cardiogenic shock; severe left ventricular outflow tract obstruction (high-grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: peripheral oedema / ankle swelling. Common: headache, dizziness, somnolence, flushing, palpitations, abdominal pain, nausea, dyspepsia, muscle cramps, fatigue.',
    storage:
      'Store below 25°C in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Zentiva, k.s. — Agen (amlodipine) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each tablet contains amlodipine besilate equivalent to 10 mg amlodipine (INN base: Amlodipine).',
  },

  // 3. Torvacard (Atorvastatin — Zentiva, k.s.)
  {
    brandName: 'Torvacard 10 mg',
    brandNameAr: 'تورفاكارد 10 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Adjunct to diet for reduction of elevated total cholesterol, LDL-cholesterol, apolipoprotein B, and triglycerides in adults, adolescents, and children aged 10 years or older with primary hypercholesterolaemia (including familial heterozygous hypercholesterolaemia) or combined (mixed) hyperlipidaemia; homozygous familial hypercholesterolaemia; and prevention of cardiovascular events in adult patients at high risk.',
    dose:
      'Usual starting dose is 10 mg once daily. Dose adjustments should be made at intervals of 4 weeks or more up to a maximum dose of 80 mg once daily. May be administered at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or unexplained persistent elevations of serum transaminases exceeding 3 times the upper limit of normal; pregnancy, breastfeeding, and women of child-bearing potential not using appropriate contraceptive measures; concomitant use with glecaprevir/pibrentasvir.',
    adverseEffects:
      'Common: nasopharyngitis, allergic reactions, hyperglycaemia, headache, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, joint swelling, back pain, abnormal liver function test, increased blood creatine kinase.',
    storage:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'Zentiva, k.s. — Torvacard (atorvastatin) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each film-coated tablet contains atorvastatin calcium trihydrate equivalent to 10 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Torvacard 20 mg',
    brandNameAr: 'تورفاكارد 20 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol, LDL-C, apolipoprotein B, and triglycerides in primary hypercholesterolaemia, heterozygous and homozygous familial hypercholesterolaemia, or mixed hyperlipidaemia; and primary and secondary prevention of cardiovascular events.',
    dose:
      '20 mg once daily at any time of day, with or without food. May be titrated at intervals of 4 weeks or more up to 80 mg once daily.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or unexplained persistent transaminase elevations >3x ULN; pregnancy and lactation; concomitant glecaprevir/pibrentasvir.',
    adverseEffects:
      'Common: myalgia, arthralgia, muscle spasms, back pain, headache, nasopharyngitis, dyspepsia, nausea, diarrhoea, constipation, flatulence, hyperglycaemia, elevated hepatic transaminases and serum creatine kinase.',
    storage:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'Zentiva, k.s. — Torvacard (atorvastatin) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each film-coated tablet contains atorvastatin calcium trihydrate equivalent to 20 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Torvacard 40 mg',
    brandNameAr: 'تورفاكارد 40 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'High-intensity lipid lowering in primary hypercholesterolaemia, familial hypercholesterolaemia, mixed hyperlipidaemia, and secondary cardiovascular prevention in high-risk adult patients.',
    dose:
      '40 mg once daily (up to a maximum of 80 mg once daily), taken at any time of day with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or unexplained persistent transaminase elevations >3x ULN; pregnancy and breastfeeding; concomitant glecaprevir/pibrentasvir.',
    adverseEffects:
      'Common: myalgia, arthralgia, muscle spasms, back pain, headache, dyspepsia, diarrhoea, constipation, flatulence, hyperglycaemia, elevated hepatic transaminases and creatine kinase.',
    storage:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'Zentiva, k.s. — Torvacard (atorvastatin) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each film-coated tablet contains atorvastatin calcium trihydrate equivalent to 40 mg atorvastatin (INN base: Atorvastatin).',
  },

  // 4. Zodac (Cetirizine — Zentiva, k.s.)
  {
    brandName: 'Zodac 10 mg',
    brandNameAr: 'زوداك 10 ملغ',
    genericName: 'Cetirizine',
    activeIngredients: ['Cetirizine'],
    drugClass: 'Second-generation selective peripheral histamine H1-receptor antagonist',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Relief of nasal and ocular symptoms of seasonal and perennial allergic rhinitis, and relief of symptoms of chronic idiopathic urticaria in adults and paediatric patients aged 6 years and above.',
    dose:
      'Adults and adolescents aged 12 years and above: 10 mg (1 tablet) once daily. Children aged 6 to 12 years: 5 mg (half of a scored tablet) twice daily. Patients with moderate renal impairment (CrCl 30–49 mL/min): 5 mg once daily; severe renal impairment (CrCl 10–29 mL/min): 5 mg once every 2 days.',
    contraindications:
      'Hypersensitivity to cetirizine, hydroxyzine, any piperazine derivatives, or to any of the excipients; patients with severe renal impairment with creatinine clearance below 10 mL/min.',
    adverseEffects:
      'Common: somnolence, fatigue, dizziness, headache, pharyngitis, rhinitis (in children), dry mouth, nausea, diarrhoea. Uncommon: agitation, paraesthesia, abdominal pain, pruritus, rash, asthenia, malaise.',
    storage:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Allergy and Immunology', 'Dermatology', 'ENT', 'Internal Medicine', 'Pediatrics'],
    sources: [
      {
        title: 'Zentiva, k.s. — Zodac (cetirizine dihydrochloride) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each scored film-coated tablet contains 10 mg cetirizine dihydrochloride (INN base: Cetirizine).',
  },

  // 5. Lozap (Losartan — Zentiva, k.s.)
  {
    brandName: 'Lozap 50 mg',
    brandNameAr: 'لوزاب 50 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents aged 6–18 years; treatment of renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >= 0.5 g/day; treatment of chronic heart failure in adult patients when ACE inhibitors are considered unsuitable; and reduction in the risk of stroke in adult hypertensive patients with left ventricular hypertrophy documented by ECG.',
    dose:
      'Hypertension: usual starting and maintenance dose is 50 mg once daily, which may be increased to 100 mg once daily. Diabetic nephropathy: 50 mg once daily, increased to 100 mg once daily based on blood pressure response. Heart failure: initially 12.5 mg once daily, titrated weekly up to a maximum of 150 mg once daily.',
    contraindications:
      'Hypersensitivity to losartan or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    adverseEffects:
      'Common: dizziness, vertigo, hypotension / orthostatic hypotension, asthenia, fatigue, hyperkalaemia, anaemia, renal impairment, hypoglycaemia (in diabetic patients). Uncommon: somnolence, headache, sleep disorders, palpitations, angina pectoris, dyspnoea, cough, abdominal pain, constipation, diarrhoea, nausea, vomiting, urticaria, pruritus, rash.',
    storage:
      'Store below 30°C in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Zentiva, k.s. — Lozap (losartan potassium) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each film-coated tablet contains 50 mg losartan potassium (INN base: Losartan).',
  },
  {
    brandName: 'Lozap 100 mg',
    brandNameAr: 'لوزاب 100 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Essential hypertension; renal protection in hypertensive type 2 diabetic patients with proteinuria >= 0.5 g/day; chronic heart failure maintenance when ACE inhibitors are unsuitable; and stroke risk reduction in hypertensive patients with ECG-documented left ventricular hypertrophy.',
    dose:
      '100 mg once daily in patients requiring maximal blood pressure control or target organ protection, taken with or without food.',
    contraindications:
      'Hypersensitivity to losartan or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    adverseEffects:
      'Common: dizziness, vertigo, orthostatic hypotension, hyperkalaemia, asthenia, fatigue, increased blood urea and serum creatinine, anaemia.',
    storage:
      'Store below 30°C in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Zentiva, k.s. — Lozap (losartan potassium) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Each film-coated tablet contains 100 mg losartan potassium (INN base: Losartan).',
  },

  // 6. Lozap H (Losartan + Hydrochlorothiazide — Zentiva, k.s.)
  {
    brandName: 'Lozap H 50 mg/12.5 mg',
    brandNameAr: 'لوزاب إتش 50 ملغ/12.5 ملغ',
    genericName: 'Losartan + Hydrochlorothiazide',
    activeIngredients: ['Losartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '50 mg/12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on losartan or hydrochlorothiazide alone.',
    dose:
      'Usual maintenance dose is 1 tablet (50 mg losartan / 12.5 mg hydrochlorothiazide) once daily. For patients who do not respond adequately, the dose may be increased to 2 tablets once daily (maximum 100 mg/25 mg once daily).',
    contraindications:
      'Hypersensitivity to losartan, sulfonamide-derived substances (as hydrochlorothiazide), or excipients; therapy-resistant hypokalaemia or hypercalcaemia; severe hepatic impairment, cholestasis and biliary obstructive disorders; refractory hyponatraemia; symptomatic hyperuricaemia/gout; 2nd and 3rd trimesters of pregnancy; severe renal impairment (creatinine clearance < 30 mL/min); anuria; concomitant aliskiren in diabetes mellitus or renal impairment.',
    adverseEffects:
      'Common: dizziness, headache, cough, abdominal pain, nausea, diarrhoea, dyspepsia, asthenia, fatigue, chest pain, muscle cramp, back pain, hyperkalaemia or hypokalaemia, hyperuricaemia.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Zentiva, k.s. — Lozap H (losartan / hydrochlorothiazide) National SmPC & Product Information',
        url: 'https://www.zentiva.com/products',
      },
    ],
    notes:
      'Official Zentiva, k.s. SmPC data. Fixed-dose combination containing 50 mg losartan potassium and 12.5 mg hydrochlorothiazide (INN bases: Losartan + Hydrochlorothiazide).',
  },

  // 7. Clopidogrel Zentiva (Clopidogrel — Zentiva, k.s.)
  {
    brandName: 'Clopidogrel Zentiva 75 mg',
    brandNameAr: 'كلوبيدوغريل زينتيفا 75 ملغ',
    genericName: 'Clopidogrel',
    activeIngredients: ['Clopidogrel'],
    drugClass: 'P2Y12 adenosine diphosphate (ADP)-receptor antagonist (antiplatelet agent)',
    strength: '75 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Secondary prevention of atherothrombotic events in adult patients suffering from myocardial infarction (from a few days until less than 35 days), ischaemic stroke (from 7 days until less than 6 months), or established peripheral arterial disease; acute coronary syndrome (non-ST segment elevation ACS or ST-segment elevation acute myocardial infarction) in combination with acetylsalicylic acid (ASA); and prevention of atherothrombotic and thromboembolic events in atrial fibrillation (with ASA) when vitamin K antagonists are unsuitable.',
    dose:
      '75 mg as a single daily dose, taken with or without food. In acute coronary syndrome or high-risk TIA/minor ischaemic stroke, initiated with a 300 mg or 600 mg loading dose according to clinical indication.',
    contraindications:
      'Hypersensitivity to clopidogrel or to any of the excipients; severe hepatic impairment; active pathological bleeding such as peptic ulcer or intracranial haemorrhage.',
    adverseEffects:
      'Common: haematoma, epistaxis, gastrointestinal haemorrhage, diarrhoea, abdominal pain, dyspepsia, bruising, bleeding at puncture site. Uncommon: thrombocytopenia, leukopenia, eosinophilia, intracranial bleeding, headache, paraesthesia, dizziness, gastric and duodenal ulcer, gastritis, vomiting, nausea, constipation, flatulence, rash, pruritus, purpura, haematuria, prolonged bleeding time.',
    storage:
      'Store in the original package in order to protect from moisture. No special temperature storage conditions required.',
    specialties: ['Cardiology', 'Neurology', 'Internal Medicine', 'Vascular Surgery'],
    sources: [
      {
        title: 'EMA EPAR — Clopidogrel Zentiva (clopidogrel) Product Information (Zentiva, k.s.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/clopidogrel-zentiva',
      },
    ],
    notes:
      'Official EMA EPAR product information (Zentiva, k.s.). Each film-coated tablet contains clopidogrel hydrogen sulfate equivalent to 75 mg clopidogrel (INN base: Clopidogrel).',
  },
];

export const ZENTIVA_PRODUCTS: AiProductDraft[] = RAW_ZENTIVA.map((d) => ({
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
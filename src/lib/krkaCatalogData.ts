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

const RAW_KRKA: CompactDrug[] = [
  // 1. Atoris (Atorvastatin — KRKA, d.d., Novo mesto)
  {
    brandName: 'Atoris 10 mg',
    brandNameAr: 'أتوريس 10 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Adjunct to diet for reduction of elevated total cholesterol, LDL-cholesterol, apolipoprotein B, and triglycerides in adults, adolescents, and children aged 10 years or older with primary hypercholesterolaemia (including familial heterozygous hypercholesterolaemia) or combined (mixed) hyperlipidaemia; homozygous familial hypercholesterolaemia; and prevention of cardiovascular events in adult patients estimated to have a high risk for a first cardiovascular event.',
    dose:
      'Usual starting dose is 10 mg once daily. Dose adjustment should be made at intervals of 4 weeks or more up to a maximum of 80 mg once daily. May be given at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or any excipient; active liver disease or unexplained persistent elevations of serum transaminases exceeding 3 times the upper limit of normal; pregnancy, breast-feeding, and in women of child-bearing potential not using appropriate contraceptive measures; concomitant treatment with glecaprevir/pibrentasvir.',
    adverseEffects:
      'Nasopharyngitis, allergic reactions, hyperglycaemia, headache, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, joint swelling, back pain, abnormal liver function test, increased blood creatine kinase; myopathy/rhabdomyolysis (rare).',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Atoris Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/atoris-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 10 mg atorvastatin (as atorvastatin calcium). Generic name normalized to INN base (Atorvastatin).',
  },
  {
    brandName: 'Atoris 20 mg',
    brandNameAr: 'أتوريس 20 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia (including heterozygous familial hypercholesterolaemia), combined (mixed) hyperlipidaemia, homozygous familial hypercholesterolaemia, and primary/secondary prevention of cardiovascular events.',
    dose:
      '20 mg once daily at any time of day, with or without food; titrate at intervals of >=4 weeks according to LDL-C goal and patient response (maximum 80 mg once daily).',
    contraindications:
      'Hypersensitivity to atorvastatin or any excipient; active liver disease or unexplained persistent elevations of serum transaminases >3x ULN; pregnancy and breast-feeding; concomitant use of glecaprevir/pibrentasvir.',
    adverseEffects:
      'Nasopharyngitis, hyperglycaemia, headache, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, muscle spasms, back pain, elevated hepatic transaminases and blood creatine kinase.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Atoris Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/atoris-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 20 mg atorvastatin (as atorvastatin calcium). Generic name normalized to INN base (Atorvastatin).',
  },
  {
    brandName: 'Atoris 40 mg',
    brandNameAr: 'أتوريس 40 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia, combined (mixed) hyperlipidaemia, homozygous familial hypercholesterolaemia, and intensive lipid-lowering for cardiovascular event prevention.',
    dose:
      '40 mg once daily (may be initiated at 40 mg once daily in patients requiring >45% reduction in LDL-C); maximum dose 80 mg once daily.',
    contraindications:
      'Hypersensitivity to atorvastatin or any excipient; active liver disease or unexplained persistent elevations of serum transaminases >3x ULN; pregnancy and breast-feeding; concomitant use of glecaprevir/pibrentasvir.',
    adverseEffects:
      'Nasopharyngitis, hyperglycaemia, headache, gastrointestinal disturbances, myalgia, arthralgia, muscle spasms, elevated serum transaminases and creatine kinase.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Atoris Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/atoris-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 40 mg atorvastatin (as atorvastatin calcium). Generic name normalized to INN base (Atorvastatin).',
  },

  // 2. Nolpaza (Pantoprazole — KRKA, d.d., Novo mesto)
  {
    brandName: 'Nolpaza 20 mg',
    brandNameAr: 'نولبازا 20 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (substituted benzimidazole H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant tablets in blisters',
    indications:
      'Adults and adolescents 12 years of age and above: Symptomatic gastro-oesophageal reflux disease (GERD) and long-term management and prevention of relapse in reflux oesophagitis. Adults: Prevention of gastroduodenal ulcers induced by non-selective non-steroidal anti-inflammatory drugs (NSAIDs) in patients at risk with a need for continuous NSAID treatment.',
    dose:
      'Symptomatic GERD: 20 mg once daily for 2–4 weeks (up to 4 additional weeks if required). Long-term management of reflux oesophagitis and NSAID ulcer prophylaxis: 20 mg once daily (may increase to 40 mg daily if reflux oesophagitis recurs). Swallow whole with water 1 hour before a meal; do not chew or crush.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient (contains sorbitol).',
    adverseEffects:
      'Fundic gland polyps (benign), headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain and discomfort, rash/exanthema/eruption, pruritus, asthenia, fatigue, malaise, elevated liver enzymes, sleep disorders; hypomagnesaemia and bone fractures with prolonged use.',
    storage: 'Store in the original package in order to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Nolpaza Gastro-Resistant Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/nolpaza-gastro-resistant-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each gastro-resistant tablet contains 20 mg pantoprazole (as pantoprazole sodium sesquihydrate). Generic name normalized to INN base (Pantoprazole).',
  },
  {
    brandName: 'Nolpaza 40 mg',
    brandNameAr: 'نولبازا 40 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (substituted benzimidazole H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant tablets in blisters',
    indications:
      'Adults and adolescents 12 years of age and above: Reflux oesophagitis. Adults: Eradication of Helicobacter pylori in combination with appropriate antibiotic therapy in patients with H. pylori-associated ulcers; gastric and duodenal ulcer; Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily for 2–8 weeks depending on indication. H. pylori eradication: 40 mg twice daily (second tablet before evening meal) in combination with two antibiotics for 7–14 days. Zollinger-Ellison syndrome: starting dose 80 mg daily, adjusted as needed. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, any excipient, or any of the combination antimicrobial agents when used for H. pylori eradication.',
    adverseEffects:
      'Fundic gland polyps (benign), headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension, constipation, dry mouth, abdominal pain, rash, pruritus, asthenia, fatigue, elevated liver enzymes.',
    storage: 'Store in the original package in order to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Nolpaza Gastro-Resistant Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/nolpaza-gastro-resistant-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each gastro-resistant tablet contains 40 mg pantoprazole (as pantoprazole sodium sesquihydrate). Generic name normalized to INN base (Pantoprazole).',
  },

  // 3. Lorista & Lorista H (Losartan & Losartan + Hydrochlorothiazide — KRKA)
  {
    brandName: 'Lorista 50 mg',
    brandNameAr: 'لوريستا 50 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents 6–18 years of age; treatment of renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >=0.5 g/day; treatment of chronic heart failure in adult patients when treatment with ACE inhibitors is considered unsuitable; reduction in the risk of stroke in adult hypertensive patients with ECG-documented left ventricular hypertrophy.',
    dose:
      'Usual starting and maintenance dose is 50 mg once daily in most patients; may be increased to 100 mg once daily (in the morning) based on blood pressure response. In chronic heart failure, start at 12.5 mg once daily and titrate at weekly intervals to the maximum tolerated dose (up to 150 mg once daily).',
    contraindications:
      'Hypersensitivity to losartan or any excipient; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, vertigo, hypotension, orthostatic hypotension, asthenia, fatigue, hypoglycaemia, hyperkalaemia, anaemia, renal impairment, elevated blood urea and serum creatinine.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Lorista Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/lorista-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 50 mg losartan potassium. Generic name normalized to INN base (Losartan).',
  },
  {
    brandName: 'Lorista 100 mg',
    brandNameAr: 'لوريستا 100 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Essential hypertension; renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >=0.5 g/day; chronic heart failure when ACE inhibitors are unsuitable; stroke risk reduction in hypertensive patients with left ventricular hypertrophy.',
    dose:
      'Maintenance / maximum hypertension and diabetic nephropathy dose: 100 mg once daily (after starting at 50 mg once daily). May be administered with or without food.',
    contraindications:
      'Hypersensitivity to losartan or any excipient; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren in diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, vertigo, hypotension, orthostatic hypotension, asthenia, fatigue, hypoglycaemia, hyperkalaemia, anaemia, renal impairment.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Lorista Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/lorista-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 100 mg losartan potassium. Generic name normalized to INN base (Losartan).',
  },
  {
    brandName: 'Lorista H 50 mg/12.5 mg',
    brandNameAr: 'لوريستا إتش 50 ملغ/12.5 ملغ',
    genericName: 'Losartan + Hydrochlorothiazide',
    activeIngredients: ['Losartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor antagonist (ARB) and thiazide diuretic fixed-dose combination',
    strength: '50 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on losartan or hydrochlorothiazide alone.',
    dose:
      'Usual maintenance dose is one Lorista H 50 mg/12.5 mg tablet once daily. For patients who do not respond adequately to Lorista H 50 mg/12.5 mg, the dosage may be increased to 100 mg/25 mg (or two 50 mg/12.5 mg tablets) once daily. Maximum dose is 100 mg/25 mg once daily.',
    contraindications:
      'Hypersensitivity to losartan, sulfonamide-derived substances (as hydrochlorothiazide), or any excipient; therapy-resistant hypokalaemia or hypercalcaemia; severe hepatic impairment, cholestasis, and biliary obstructive disorders; refractory hyponatraemia; symptomatic hyperuricaemia/gout; 2nd and 3rd trimesters of pregnancy; severe renal impairment (CrCl <30 mL/min); anuria; concomitant use with aliskiren in diabetes or GFR <60 mL/min/1.73 m².',
    adverseEffects:
      'Dizziness, headache, cough, abdominal pain, nausea, diarrhoea, dyspepsia, asthenia, fatigue, hyperkalaemia or hypokalaemia, hyponatraemia, hyperuricaemia, muscle cramps, back pain, non-melanoma skin cancer (with cumulative HCTZ exposure).',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Lorista H Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/lorista-h-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 50 mg losartan potassium and 12.5 mg hydrochlorothiazide. Generic names normalized to INN bases (Losartan + Hydrochlorothiazide).',
  },

  // 4. Enap & Enap-H (Enalapril & Enalapril + Hydrochlorothiazide — KRKA)
  {
    brandName: 'Enap 10 mg',
    brandNameAr: 'إيناب 10 ملغ',
    genericName: 'Enalapril',
    activeIngredients: ['Enalapril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 scored tablets in blisters',
    indications:
      'Treatment of hypertension; treatment of symptomatic heart failure; prevention of symptomatic heart failure in patients with asymptomatic left ventricular dysfunction (ejection fraction <=35%).',
    dose:
      'Hypertension: Initial dose 5 mg to maximum 20 mg once daily depending on severity; usual maintenance dose is 20 mg daily (maximum 40 mg daily). Heart failure / asymptomatic LV dysfunction: Initial dose 2.5 mg daily under supervision, titrated over 2–4 weeks to the target maintenance dose of 20 mg daily given as a single dose or in two divided doses.',
    contraindications:
      'Hypersensitivity to enalapril, any other ACE inhibitor, or any excipient; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; 2nd and 3rd trimesters of pregnancy; concomitant use with sacubitril/valsartan (must not be initiated earlier than 36 hours after last dose of sacubitril/valsartan); concomitant use with aliskiren in diabetes or GFR <60 mL/min/1.73 m².',
    adverseEffects:
      'Blurred vision, dizziness, cough, nausea, asthenia, headache, depression, syncope, hypotension (including orthostatic hypotension), chest pain, rhythm disturbances, angina pectoris, tachycardia, dyspnoea, diarrhoea, abdominal pain, taste alteration, rash, hypersensitivity/angioneurotic oedema, hyperkalaemia, increased serum creatinine.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Enap Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/enap-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 10 mg enalapril maleate. Generic name normalized to INN base (Enalapril).',
  },
  {
    brandName: 'Enap 20 mg',
    brandNameAr: 'إيناب 20 ملغ',
    genericName: 'Enalapril',
    activeIngredients: ['Enalapril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor',
    strength: '20 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 scored tablets in blisters',
    indications:
      'Treatment of hypertension; treatment of symptomatic heart failure; prevention of symptomatic heart failure in patients with asymptomatic left ventricular dysfunction (ejection fraction <=35%).',
    dose:
      'Usual maintenance dose in hypertension and heart failure: 20 mg daily (given once daily or in two divided doses; maximum 40 mg daily in hypertension or severe heart failure).',
    contraindications:
      'Hypersensitivity to enalapril, any other ACE inhibitor, or any excipient; history of ACE-inhibitor-associated, hereditary, or idiopathic angioedema; 2nd and 3rd trimesters of pregnancy; concomitant use with sacubitril/valsartan; concomitant use with aliskiren in diabetes or GFR <60 mL/min/1.73 m².',
    adverseEffects:
      'Dizziness, dry cough, blurred vision, nausea, asthenia, headache, hypotension, dyspnoea, diarrhoea, rash, angioedema, hyperkalaemia, increased serum creatinine.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Enap Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/enap-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 20 mg enalapril maleate. Generic name normalized to INN base (Enalapril).',
  },
  {
    brandName: 'Enap-H 10 mg/25 mg',
    brandNameAr: 'إيناب-إتش 10 ملغ/25 ملغ',
    genericName: 'Enalapril + Hydrochlorothiazide',
    activeIngredients: ['Enalapril', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor and thiazide diuretic fixed-dose combination',
    strength: '10 mg / 25 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Treatment of hypertension in patients in whom blood pressure is not adequately controlled on monotherapy and for whom combination therapy is appropriate.',
    dose:
      'One tablet once daily (maximum two tablets once daily if necessary). Prior diuretic therapy should be discontinued for 2–3 days before initiating Enap-H.',
    contraindications:
      'Hypersensitivity to enalapril, other ACE inhibitors, hydrochlorothiazide, sulfonamide derivatives, or any excipient; severe renal impairment (CrCl <=30 mL/min); anuria; history of angioedema; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with sacubitril/valsartan or aliskiren (in diabetes or GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, cough, blurred vision, nausea, asthenia, hypotension, muscle cramps, hypokalaemia or hyperkalaemia, hyperuricaemia, hyperglycaemia, increased serum creatinine and urea.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Enap-H Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/enap-h-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 10 mg enalapril maleate and 25 mg hydrochlorothiazide. Generic names normalized to INN bases (Enalapril + Hydrochlorothiazide).',
  },

  // 5. Prenessa & Co-Prenessa (Perindopril & Perindopril + Indapamide — KRKA)
  {
    brandName: 'Prenessa 4 mg',
    brandNameAr: 'برينيسا 4 ملغ',
    genericName: 'Perindopril',
    activeIngredients: ['Perindopril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor',
    strength: '4 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 scored tablets in blisters',
    indications:
      'Treatment of hypertension; treatment of symptomatic heart failure; reduction of risk of cardiac events in patients with stable coronary artery disease who have a history of myocardial infarction and/or revascularisation.',
    dose:
      'Taken once daily in the morning before a meal. Hypertension: recommended starting dose is 4 mg once daily, which may be increased to 8 mg once daily after 1 month of treatment. Stable coronary artery disease: start at 4 mg once daily for two weeks, then increase to 8 mg once daily depending on renal function and tolerability. Symptomatic heart failure: start at 2 mg in the morning, increasing to 4 mg once daily after >=2 weeks.',
    contraindications:
      'Hypersensitivity to perindopril, any other ACE inhibitor, or any excipient; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; 2nd and 3rd trimesters of pregnancy; concomitant use with sacubitril/valsartan or aliskiren (in diabetes or GFR <60 mL/min/1.73 m²); extracorporeal treatments leading to contact of blood with negatively charged surfaces; significant bilateral renal artery stenosis.',
    adverseEffects:
      'Dizziness, headache, paraesthesia, vertigo, visual disturbances, tinnitus, hypotension, cough, dyspnoea, abdominal pain, constipation, diarrhoea, dyspepsia, nausea, vomiting, dysgeusia, pruritus, rash, muscle cramps, asthenia.',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Prenessa Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/prenessa-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 4 mg perindopril tert-butylamine (erbumine). Generic name normalized to INN base (Perindopril).',
  },
  {
    brandName: 'Prenessa 8 mg',
    brandNameAr: 'برينيسا 8 ملغ',
    genericName: 'Perindopril',
    activeIngredients: ['Perindopril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor',
    strength: '8 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 scored tablets in blisters',
    indications:
      'Treatment of hypertension; reduction of risk of cardiac events in patients with stable coronary artery disease who have a history of myocardial infarction and/or revascularisation.',
    dose:
      'Maintenance dose in hypertension and stable coronary artery disease: 8 mg once daily in the morning before a meal (reached after initial titration with 4 mg once daily).',
    contraindications:
      'Hypersensitivity to perindopril, any other ACE inhibitor, or any excipient; history of angioedema; 2nd and 3rd trimesters of pregnancy; concomitant use with sacubitril/valsartan or aliskiren (in diabetes or GFR <60 mL/min/1.73 m²); bilateral renal artery stenosis.',
    adverseEffects:
      'Dizziness, headache, paraesthesia, vertigo, hypotension, dry cough, dyspnoea, gastrointestinal disturbances, rash, pruritus, muscle cramps, asthenia.',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Prenessa Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/prenessa-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 8 mg perindopril tert-butylamine (erbumine). Generic name normalized to INN base (Perindopril).',
  },
  {
    brandName: 'Co-Prenessa 4 mg/1.25 mg',
    brandNameAr: 'كو-برينيسا 4 ملغ/1.25 ملغ',
    genericName: 'Perindopril + Indapamide',
    activeIngredients: ['Perindopril', 'Indapamide'],
    drugClass: 'ACE inhibitor and sulfonamide-like diuretic fixed-dose combination',
    strength: '4 mg / 1.25 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on perindopril alone.',
    dose:
      'One Co-Prenessa 4 mg/1.25 mg tablet per day as a single dose, preferably to be taken in the morning and before a meal.',
    contraindications:
      'Hypersensitivity to perindopril, any other ACE inhibitor, indapamide, any other sulfonamides, or any excipient; history of angioedema; 2nd and 3rd trimesters of pregnancy; lactation; severe renal impairment (CrCl <30 mL/min); hepatic encephalopathy or severe hepatic impairment; hypokalaemia; untreated decompensated heart failure; concomitant use with sacubitril/valsartan or aliskiren (in diabetes or GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Hypokalaemia, dizziness, headache, paraesthesia, dysgeusia, visual impairment, tinnitus, vertigo, hypotension, dry cough, dyspnoea, abdominal pain, constipation, diarrhoea, dyspepsia, nausea, vomiting, pruritus, rash, maculopapular rash, muscle spasms, asthenia.',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Co-Prenessa Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/co-prenessa-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each tablet contains 4 mg perindopril tert-butylamine and 1.25 mg indapamide. Generic names normalized to INN bases (Perindopril + Indapamide).',
  },

  // 6. Fromilid (Clarithromycin — KRKA)
  {
    brandName: 'Fromilid 500 mg',
    brandNameAr: 'فروميليد 500 ملغ',
    genericName: 'Clarithromycin',
    activeIngredients: ['Clarithromycin'],
    drugClass: 'Macrolide antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections caused by susceptible organisms in adults and adolescents 12 years and older: upper respiratory tract infections (pharyngitis/tonsillitis, acute maxillary sinusitis), lower respiratory tract infections (acute bacterial exacerbation of chronic bronchitis, community-acquired pneumonia), uncomplicated skin and soft tissue infections, mycobacterial infections (Mycobacterium avium complex), and eradication of Helicobacter pylori in combination with acid suppression and another antimicrobial.',
    dose:
      'Adults and adolescents >=12 years: Standard dose is 250 mg twice daily; in severe infections, the dose may be increased to 500 mg twice daily for 6 to 14 days. H. pylori eradication: 500 mg twice daily in combination with another antibiotic and a proton pump inhibitor for 7–14 days. May be taken with or without food.',
    contraindications:
      'Hypersensitivity to clarithromycin, other macrolide antibiotics, or any excipient; concomitant administration with astemizole, cisapride, domperidone, pimozide, terfenadine, ergotamine/dihydroergotamine, oral midazolam, lomitapide, ticagrelor, ivabradine, ranolazine, colchicine, or HMG-CoA reductase inhibitors extensively metabolised by CYP3A4 (lovastatin or simvastatin); history of QT prolongation or ventricular cardiac arrhythmia (including torsades de pointes); electrolyte disturbances (hypokalaemia or hypomagnesaemia); severe hepatic failure in combination with renal impairment.',
    adverseEffects:
      'Insomnia, dysgeusia (taste perversion), headache, diarrhoea, vomiting, dyspepsia, nausea, abdominal pain, abnormal liver function test, rash, hyperhidrosis; QT prolongation and cholestatic hepatitis (uncommon/rare).',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Gastroenterology', 'Otolaryngology (ENT)', 'Internal Medicine'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Fromilid Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/fromilid-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data.',
  },

  // 7. Valsacor (Valsartan — KRKA)
  {
    brandName: 'Valsacor 80 mg',
    brandNameAr: 'فالسأكور 80 ملغ',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and hypertension in children and adolescents 6 to <18 years of age; treatment of clinically stable adult patients with symptomatic heart failure or asymptomatic left ventricular systolic dysfunction after a recent (12 hours–10 days) myocardial infarction; treatment of symptomatic heart failure in adult patients when ACE inhibitors cannot be used or as add-on therapy to ACE inhibitors when beta-blockers cannot be used.',
    dose:
      'Hypertension: Recommended starting dose is 80 mg once daily; may be increased to 160 mg and up to a maximum of 320 mg once daily. Post-myocardial infarction: start at 20 mg twice daily and titrate over several weeks to a target maintenance dose of 160 mg twice daily. Heart failure: start at 40 mg twice daily and titrate to 80 mg and 160 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to valsartan or any excipient; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, postural dizziness, hypotension, orthostatic hypotension, renal impairment and renal failure, hyperkalaemia, headache, cough, abdominal pain, fatigue, asthenia.',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Valsacor Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/valsacor-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data.',
  },
  {
    brandName: 'Valsacor 160 mg',
    brandNameAr: 'فالسأكور 160 ملغ',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '160 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Essential hypertension in adults and children/adolescents 6 to <18 years; recent myocardial infarction with symptomatic heart failure or asymptomatic left ventricular systolic dysfunction; symptomatic heart failure in adults.',
    dose:
      'Hypertension: 160 mg once daily (up to maximum 320 mg once daily). Post-myocardial infarction and heart failure target maintenance dose: 160 mg twice daily.',
    contraindications:
      'Hypersensitivity to valsartan or any excipient; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren in diabetes mellitus or GFR <60 mL/min/1.73 m².',
    adverseEffects:
      'Dizziness, hypotension, orthostatic hypotension, renal impairment, hyperkalaemia, headache, cough, fatigue.',
    storage: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Valsacor Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/valsacor-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data.',
  },

  // 8. Roswera (Rosuvastatin — KRKA)
  {
    brandName: 'Roswera 10 mg',
    brandNameAr: 'روزويرا 10 ملغ',
    genericName: 'Rosuvastatin',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Treatment of primary hypercholesterolaemia (type IIa including heterozygous familial hypercholesterolaemia) or mixed dyslipidaemia (type IIb) in adults, adolescents, and children aged 6 years or older as an adjunct to diet; homozygous familial hypercholesterolaemia; and prevention of major cardiovascular events in patients estimated to have a high risk for a first cardiovascular event.',
    dose:
      'Recommended start dose is 5 mg or 10 mg orally once daily in both statin-naive and switched patients (20 mg once daily for primary cardiovascular prevention). Dose adjustment to the next dose level can be made after 4 weeks if necessary (maximum 40 mg under specialist supervision for severe hypercholesterolaemia). May be given at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to rosuvastatin or any excipient; active liver disease including unexplained persistent elevations of serum transaminases >3x ULN; severe renal impairment (CrCl <30 mL/min); myopathy; concomitant combination of sofosbuvir/velpatasvir/voxilaprevir; concomitant ciclosporin; pregnancy, lactation, and women of childbearing potential not using appropriate contraceptive measures.',
    adverseEffects:
      'Diabetes mellitus, headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia, proteinuria (tubular in origin, usually transient), elevated hepatic transaminases and creatine kinase; myopathy/rhabdomyolysis (rare).',
    storage: 'Store in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Roswera Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/roswera-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 10 mg rosuvastatin (as rosuvastatin calcium). Generic name normalized to INN base (Rosuvastatin).',
  },
  {
    brandName: 'Roswera 20 mg',
    brandNameAr: 'روزويرا 20 ملغ',
    genericName: 'Rosuvastatin',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia, mixed dyslipidaemia, homozygous familial hypercholesterolaemia, and prevention of major cardiovascular events in high-risk patients.',
    dose:
      '20 mg orally once daily at any time of day, with or without food (recommended dose for cardiovascular event prevention and maintenance dose after titration from 5–10 mg once daily).',
    contraindications:
      'Hypersensitivity to rosuvastatin or any excipient; active liver disease; severe renal impairment (CrCl <30 mL/min); myopathy; concomitant ciclosporin or sofosbuvir/velpatasvir/voxilaprevir; pregnancy and lactation.',
    adverseEffects:
      'Diabetes mellitus, headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia, elevated hepatic transaminases and creatine kinase.',
    storage: 'Store in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'KRKA, d.d., Novo mesto — Roswera Film-Coated Tablets Official Product Information',
        url: 'https://www.krka.biz/en/products/krka-products/roswera-film-coated-tablets/',
      },
    ],
    notes:
      'Official KRKA, d.d., Novo mesto SmPC data. Each film-coated tablet contains 20 mg rosuvastatin (as rosuvastatin calcium). Generic name normalized to INN base (Rosuvastatin).',
  },

  // 9. Tolura (Telmisartan — KRKA, EMA EPAR)
  {
    brandName: 'Tolura 80 mg',
    brandNameAr: 'تولورا 80 ملغ',
    genericName: 'Telmisartan',
    activeIngredients: ['Telmisartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '80 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 tablets in aluminium/aluminium blisters',
    indications:
      'Treatment of essential hypertension in adults; cardiovascular prevention (reduction of cardiovascular morbidity in adults with manifest atherothrombotic cardiovascular disease [history of coronary heart disease, stroke, or peripheral arterial disease] or type 2 diabetes mellitus with documented target organ damage).',
    dose:
      'Hypertension: Usually effective dose is 40 mg once daily; can be increased to a maximum of 80 mg once daily to achieve target blood pressure. Cardiovascular prevention: recommended dose is 80 mg once daily. Taken with liquid, with or without food.',
    contraindications:
      'Hypersensitivity to telmisartan or any excipient (contains sorbitol); 2nd and 3rd trimesters of pregnancy; biliary obstructive disorders; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Upper respiratory tract infection, urinary tract infection, anaemia, hyperkalaemia, insomnia, depression, syncope, vertigo, bradycardia, hypotension, orthostatic hypotension, dyspnoea, cough, abdominal pain, diarrhoea, dyspepsia, flatulence, vomiting, pruritus, hyperhidrosis, rash, back pain, muscle spasms, myalgia, renal impairment, asthenia, chest pain.',
    storage: 'Store in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'EMA EPAR — Tolura (telmisartan) Product Information (KRKA, d.d., Novo mesto)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tolura',
      },
    ],
    notes:
      'Official EMA EPAR product information (KRKA, d.d., Novo mesto). Also available in 20 mg and 40 mg tablets.',
  },
];

export const KRKA_PRODUCTS: AiProductDraft[] = RAW_KRKA.map((d) => ({
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

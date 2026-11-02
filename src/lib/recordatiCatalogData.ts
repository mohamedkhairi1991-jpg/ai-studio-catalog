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

const RAW_RECORDATI: CompactDrug[] = [
  // 1. Zanidip (Lercanidipine — Recordati S.p.A.)
  {
    brandName: 'Zanidip 10 mg',
    brandNameAr: 'زانيديب 10 ملغ',
    genericName: 'Lercanidipine',
    activeIngredients: ['Lercanidipine'],
    drugClass: 'Third-generation lipophilic dihydropyridine calcium channel blocker',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of mild to moderate essential hypertension in adults.',
    dose:
      'Recommended dose is 10 mg orally once daily at least 15 minutes before meals; the dose may be increased to 20 mg depending on the individual patient’s response. Dose titration should be gradual because it may take about 2 weeks before the maximal antihypertensive effect is apparent.',
    contraindications:
      'Hypersensitivity to lercanidipine or to any of the excipients; left ventricular outflow tract obstruction; untreated congestive cardiac failure; unstable angina pectoris or recent (within 1 month) myocardial infarction; severe hepatic impairment; severe renal impairment (GFR < 30 mL/min), including patients undergoing dialysis; co-administration with strong CYP3A4 inhibitors (e.g. ketoconazole, itraconazole, ritonavir, erythromycin, troleandomycin, clarithromycin), ciclosporin, or grapefruit/grapefruit juice; pregnancy and lactation.',
    adverseEffects:
      'Common: headache, dizziness, peripheral oedema, tachycardia, palpitations, flushing. Uncommon: somnolence, angina pectoris, hypotension, dyspepsia, nausea, upper abdominal pain, rash, pruritus, myalgia, polyuria, asthenia, fatigue.',
    storage:
      'Store in the original package in order to protect from light and moisture. Do not store above 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Zanidip 10 mg and 20 mg Film-Coated Tablets SmPC (Recordati Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1428/smpc',
      },
    ],
    notes:
      'Official UK EMC / Recordati S.p.A. SmPC data. Each film-coated tablet contains 10 mg lercanidipine hydrochloride (equivalent to 9.4 mg lercanidipine; INN base: Lercanidipine).',
  },
  {
    brandName: 'Zanidip 20 mg',
    brandNameAr: 'زانيديب 20 ملغ',
    genericName: 'Lercanidipine',
    activeIngredients: ['Lercanidipine'],
    drugClass: 'Third-generation lipophilic dihydropyridine calcium channel blocker',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of mild to moderate essential hypertension in adults not adequately controlled on 10 mg once daily.',
    dose:
      '20 mg (1 tablet) orally once daily taken at least 15 minutes before a meal (preferably breakfast), as a high-fat meal significantly increases oral bioavailability.',
    contraindications:
      'Hypersensitivity to lercanidipine or excipients; left ventricular outflow tract obstruction; untreated congestive heart failure; unstable angina or myocardial infarction within 1 month; severe hepatic or renal impairment (GFR < 30 mL/min); concomitant strong CYP3A4 inhibitors, ciclosporin, or grapefruit juice; pregnancy and lactation.',
    adverseEffects:
      'Common: peripheral oedema, flushing, headache, dizziness, palpitations, tachycardia. Uncommon: hypotension, dyspepsia, nausea, abdominal pain, rash, pruritus, myalgia, asthenia, fatigue.',
    storage:
      'Store in the original package in order to protect from light and moisture. Do not store above 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Zanidip 10 mg and 20 mg Film-Coated Tablets SmPC (Recordati Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1428/smpc',
      },
    ],
    notes:
      'Official UK EMC / Recordati S.p.A. SmPC data. Each film-coated tablet contains 20 mg lercanidipine hydrochloride (equivalent to 18.8 mg lercanidipine; INN base: Lercanidipine).',
  },

  // 2. Zanipress (Enalapril + Lercanidipine — Recordati S.p.A.)
  {
    brandName: 'Zanipress 20 mg/10 mg',
    brandNameAr: 'زانيبريس 20 ملغ/10 ملغ',
    genericName: 'Enalapril + Lercanidipine',
    activeIngredients: ['Enalapril', 'Lercanidipine'],
    drugClass: 'ACE inhibitor and dihydropyridine calcium channel blocker fixed-dose combination',
    strength: '20 mg/10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on enalapril 20 mg or lercanidipine 10 mg monotherapy.',
    dose:
      'Recommended dose is 1 tablet once daily at least 15 minutes before a meal, preferably in the morning. Should not be administered with grapefruit juice.',
    contraindications:
      'Hypersensitivity to enalapril, lercanidipine, any ACE inhibitor, any dihydropyridine calcium channel blocker, or excipients; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; 2nd and 3rd trimesters of pregnancy; left ventricular outflow tract obstruction; untreated congestive heart failure; unstable angina or recent (within 1 month) myocardial infarction; severe renal impairment (GFR < 30 mL/min) or haemodialysis; severe hepatic impairment; co-administration with strong CYP3A4 inhibitors, ciclosporin, grapefruit, sacubitril/valsartan, or aliskiren (in diabetes or GFR < 60 mL/min/1.73 m²).',
    adverseEffects:
      'Common: cough, dizziness, headache, peripheral oedema, flushing. Uncommon: anaemia, hypoglycaemia, anxiety, insomnia, vertigo, postural hypotension, palpitations, tachycardia, dyspnoea, abdominal pain, constipation, diarrhoea, nausea, dyspepsia, dry mouth, angioedema, erythema, pruritus, rash, arthralgia, myalgia, pollakiuria, asthenia, fatigue, hyperkalaemia, increased serum creatinine.',
    storage:
      'Keep in the original package in order to protect from light and moisture. Do not store above 25°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Recordati S.p.A. — Cardiovascular Portfolio (Zanipress: enalapril maleate / lercanidipine hydrochloride)',
        url: 'https://www.recordati.com/en/specialty_and_primary_care/cardiovascular/',
      },
    ],
    notes:
      'Official Recordati S.p.A. SmPC data. Each film-coated tablet contains 20 mg enalapril maleate and 10 mg lercanidipine hydrochloride (INN bases: Enalapril + Lercanidipine). Also available in 10 mg/10 mg and 20 mg/20 mg strengths.',
  },

  // 3. Urorec (Silodosin — Recordati S.p.A.)
  {
    brandName: 'Urorec 4 mg',
    brandNameAr: 'يوروريك 4 ملغ',
    genericName: 'Silodosin',
    activeIngredients: ['Silodosin'],
    drugClass: 'Highly selective alpha-1A adrenoceptor antagonist',
    strength: '4 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 30 hard capsules in blisters',
    indications:
      'Treatment of the signs and symptoms of benign prostatic hyperplasia (BPH) in adult men.',
    dose:
      'Recommended standard adult dose is 8 mg once daily. For special patient populations — specifically patients with moderate renal impairment (CrCl >= 30 to < 50 mL/min) — a starting dose of one Urorec 4 mg capsule once daily is recommended, which may be increased to 8 mg once daily after 1 week of treatment depending on the individual patient’s response. Take with a meal, preferably at the same time every day.',
    contraindications:
      'Hypersensitivity to silodosin or to any of the excipients.',
    adverseEffects:
      'Very common: retrograde ejaculation, anejaculation (reversible within a few days upon discontinuation). Common: dizziness, orthostatic hypotension, nasal congestion, diarrhoea. Uncommon: libido decreased, nausea, dry mouth, rash, pruritus, urticaria, drug eruption, erectile dysfunction, tachycardia, hypotension. Intraoperative Floppy Iris Syndrome (IFIS) may occur during cataract surgery.',
    storage:
      'Do not store above 30°C. Store in the original package in order to protect from light and moisture.',
    specialties: ['Urology'],
    sources: [
      {
        title: 'EMA EPAR — Urorec (silodosin) Product Information (Recordati Ireland Ltd / Recordati S.p.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/urorec',
      },
    ],
    notes:
      'Official EMA EPAR product information (Recordati). Each hard capsule contains 4 mg silodosin.',
  },
  {
    brandName: 'Urorec 8 mg',
    brandNameAr: 'يوروريك 8 ملغ',
    genericName: 'Silodosin',
    activeIngredients: ['Silodosin'],
    drugClass: 'Highly selective alpha-1A adrenoceptor antagonist',
    strength: '8 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 30 hard capsules in blisters',
    indications:
      'Treatment of the signs and symptoms of benign prostatic hyperplasia (BPH) in adult men.',
    dose:
      'One capsule of Urorec 8 mg once daily. The capsule should be taken with food, preferably at the same time every day, and swallowed whole with a glass of water.',
    contraindications:
      'Hypersensitivity to silodosin or to any of the excipients. Use in patients with severe renal impairment (CrCl < 30 mL/min) or severe hepatic impairment is not recommended.',
    adverseEffects:
      'Very common: retrograde ejaculation, anejaculation. Common: dizziness, orthostatic hypotension, nasal congestion, diarrhoea. Uncommon: decreased libido, erectile dysfunction, tachycardia, hypotension, nausea, dry mouth, skin rash, pruritus. Precaution: Intraoperative Floppy Iris Syndrome (IFIS) during cataract surgery.',
    storage:
      'Do not store above 30°C. Store in the original package in order to protect from light and moisture.',
    specialties: ['Urology'],
    sources: [
      {
        title: 'EMA EPAR — Urorec (silodosin) Product Information (Recordati Ireland Ltd / Recordati S.p.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/urorec',
      },
    ],
    notes:
      'Official EMA EPAR product information (Recordati). Each hard capsule contains 8 mg silodosin.',
  },

  // 4. Lomexin (Fenticonazole — Recordati S.p.A.)
  {
    brandName: 'Lomexin 600 mg',
    brandNameAr: 'لوميكسين 600 ملغ',
    genericName: 'Fenticonazole',
    activeIngredients: ['Fenticonazole'],
    drugClass: 'Imidazole topical and gynaecological antifungal agent',
    strength: '600 mg',
    dosageForm: 'Vaginal capsule, soft',
    route: 'Vaginal',
    packSize: 'Pack of 1 or 2 soft vaginal capsules in blister',
    indications:
      'Treatment of vulvovaginal candidiasis in adolescent (aged > 16 years) and adult women.',
    dose:
      'One 600 mg soft vaginal capsule inserted deeply into the vagina at bedtime as a single dose. If symptoms persist, a second 600 mg dose may be administered after 3 days.',
    contraindications:
      'Hypersensitivity to fenticonazole, soya/peanut (as the soft capsule shell contains soya lecithin), or to any of the excipients.',
    adverseEffects:
      'Very rare: vulvovaginal burning sensation, erythema, pruritus, rash, mild transient local irritation after insertion. Contains fatty excipients and oils that may damage latex contraceptives (condoms and diaphragms).',
    storage:
      'Do not store above 30°C.',
    specialties: ['Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Recordati S.p.A. — Lomexin (fenticonazole nitrate) Official Product Information',
        url: 'https://www.recordati.com/en/specialty_and_primary_care/',
      },
    ],
    notes:
      'Official Recordati S.p.A. SmPC data. Each soft vaginal capsule contains 600 mg fenticonazole nitrate (equivalent to 527.1 mg fenticonazole; INN base: Fenticonazole). Also available as Lomexin 200 mg vaginal capsules (3-day regimen).',
  },
  {
    brandName: 'Lomexin 2%',
    brandNameAr: 'لوميكسين 2%',
    genericName: 'Fenticonazole',
    activeIngredients: ['Fenticonazole'],
    drugClass: 'Imidazole topical antifungal agent',
    strength: '2% (20 mg/g)',
    dosageForm: 'Cream',
    route: 'Topical',
    packSize: 'Tube of 30 g cream',
    indications:
      'Topical treatment of dermatomycoses caused by dermatophytes (Trichophyton, Microsporum, Epidermophyton) at different locations (tinea capitis, tinea corporis, tinea cruris, tinea pedis, tinea manuum, tinea faciei, tinea barbae, tinea unguium), cutaneous candidiasis (intertrigo, perleche, facial and napkin candidiasis, perineal and scrotal candidiasis, balanitis, balanoposthitis, onychia and paronychia), and pityriasis versicolor (Malassezia furfur).',
    dose:
      'Apply a thin layer of cream to the affected skin lesion and surrounding area 1 to 2 times daily (preferably in the evening or morning and evening) after washing and drying thoroughly, for 2 to 4 weeks depending on the type of mycosis.',
    contraindications:
      'Hypersensitivity to fenticonazole, other imidazole derivatives, or to any of the excipients; pregnancy (unless strictly necessary under medical supervision).',
    adverseEffects:
      'Very rare: mild and transient erythema, burning sensation, pruritus, or local skin irritation at the application site.',
    storage:
      'Store below 25°C.',
    specialties: ['Dermatology', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Recordati S.p.A. — Lomexin (fenticonazole nitrate) Official Product Information',
        url: 'https://www.recordati.com/en/specialty_and_primary_care/',
      },
    ],
    notes:
      'Official Recordati S.p.A. SmPC data. 100 g of cream contains 2 g fenticonazole nitrate (equivalent to 1.757 g fenticonazole; INN base: Fenticonazole).',
  },

  // 5. Livazo (Pitavastatin — Recordati S.p.A.)
  {
    brandName: 'Livazo 2 mg',
    brandNameAr: 'ليفازو 2 ملغ',
    genericName: 'Pitavastatin',
    activeIngredients: ['Pitavastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '2 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol (TC) and LDL-cholesterol (LDL-C) in adults, adolescents, and children aged 6 years or older with primary hypercholesterolaemia, including heterozygous familial hypercholesterolaemia, and combined (mixed) dyslipidaemia, when response to diet and other non-pharmacological measures is inadequate.',
    dose:
      'Usual starting dose is 1 mg once daily; adjusted at intervals of 4 weeks or more according to LDL-C response and patient goal. Most patients require 2 mg once daily; maximum daily dose is 4 mg once daily (in children 6–9 years, maximum 2 mg once daily). Can be taken at any time of day with or without food.',
    contraindications:
      'Hypersensitivity to pitavastatin, other statins, or excipients; severe hepatic impairment, active liver disease, or unexplained persistent elevations in serum transaminases (>3x ULN); myopathy; concomitant treatment with ciclosporin; pregnancy, lactation, and women of childbearing potential not taking appropriate contraceptive precautions.',
    adverseEffects:
      'Common: headache, constipation, diarrhoea, dyspepsia, nausea, myalgia, arthralgia, back pain, pain in extremity, muscle spasms. Uncommon: anaemia, anorexia, insomnia, dizziness, dysgeusia, somnolence, tinnitus, abdominal pain, dry mouth, vomiting, elevated hepatic transaminases (AST, ALT), pruritus, rash, asthenia, malaise, fatigue, peripheral oedema.',
    storage:
      'Do not store above 25°C. Keep the blisters in the outer carton to protect from light.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Livazo 1 mg, 2 mg and 4 mg Film-Coated Tablets SmPC (Recordati Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/4587/smpc',
      },
    ],
    notes:
      'Official UK EMC / Recordati SmPC data. Each film-coated tablet contains pitavastatin calcium equivalent to 2 mg pitavastatin (INN base: Pitavastatin).',
  },
  {
    brandName: 'Livazo 4 mg',
    brandNameAr: 'ليفازو 4 ملغ',
    genericName: 'Pitavastatin',
    activeIngredients: ['Pitavastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '4 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol and LDL-cholesterol in adults and adolescents aged 10 years or older with primary hypercholesterolaemia (including heterozygous familial hypercholesterolaemia) and mixed dyslipidaemia requiring maximal pitavastatin therapy.',
    dose:
      '4 mg once daily (maximum recommended daily dose), taken at any time of day with or without food. Not recommended in patients with severe renal impairment.',
    contraindications:
      'Hypersensitivity to pitavastatin, other statins, or excipients; severe hepatic impairment, active liver disease, or persistent transaminase elevations >3x ULN; myopathy; concomitant ciclosporin; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: myalgia, arthralgia, back pain, muscle spasms, headache, constipation, diarrhoea, dyspepsia, nausea. Uncommon: elevated serum creatine kinase and hepatic transaminases, dizziness, insomnia, abdominal pain, rash, pruritus, fatigue.',
    storage:
      'Do not store above 25°C. Keep the blisters in the outer carton to protect from light.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Livazo 1 mg, 2 mg and 4 mg Film-Coated Tablets SmPC (Recordati Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/4587/smpc',
      },
    ],
    notes:
      'Official UK EMC / Recordati SmPC data. Each film-coated tablet contains pitavastatin calcium equivalent to 4 mg pitavastatin (INN base: Pitavastatin).',
  },

  // 6. Urispas (Flavoxate — Recordati S.p.A.)
  {
    brandName: 'Urispas 200 mg',
    brandNameAr: 'يوريسباس 200 ملغ',
    genericName: 'Flavoxate',
    activeIngredients: ['Flavoxate'],
    drugClass: 'Urinary tract smooth muscle antispasmodic (musculotropic spasmolytic)',
    strength: '200 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Symptomatic relief of dysuria, urgency, nocturia, suprapubic pain, frequency, and incontinence as may occur in cystitis, prostatitis, urethritis, urethrocystitis, and urethrotrigonitis.',
    dose:
      'Adults and adolescents over 12 years of age: One 200 mg film-coated tablet 3 to 4 times daily, preferably taken after meals to minimize gastric irritation. Dose may be reduced as symptoms improve.',
    contraindications:
      'Hypersensitivity to flavoxate or to any of the excipients; pyloric or duodenal obstruction, obstructive intestinal lesions or ileus, achalasia; gastrointestinal haemorrhage; obstructive uropathies of the lower urinary tract; glaucoma.',
    adverseEffects:
      'Common: nausea, vomiting, dry mouth. Uncommon: drowsiness, dizziness, headache, mental confusion (particularly in elderly patients), blurred vision, accommodation disturbances, increased intraocular pressure, tachycardia, palpitations, epigastric pain, dyspepsia, constipation, urticaria, pruritus, erythema, dysuria, eosinophilia.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Urology', 'Obstetrics and Gynecology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Urispas 200 mg Tablets SmPC (Recordati Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1427/smpc',
      },
    ],
    notes:
      'Official UK EMC / Recordati S.p.A. SmPC data. Each film-coated tablet contains 200 mg flavoxate hydrochloride (INN base: Flavoxate).',
  },
];

export const RECORDATI_PRODUCTS: AiProductDraft[] = RAW_RECORDATI.map((d) => ({
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
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

const RAW_GEDEON_RICHTER: CompactDrug[] = [
  // 1. Cavinton (Vinpocetine — Gedeon Richter Plc.)
  {
    brandName: 'Cavinton 5 mg',
    brandNameAr: 'كافينتون 5 ملغ',
    genericName: 'Vinpocetine',
    activeIngredients: ['Vinpocetine'],
    drugClass: 'Cerebral vasodilator and neuroprotective nootropic agent (synthetic eburnamenine derivative)',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 50 tablets in blisters',
    indications:
      'Treatment of different forms of cerebral circulatory disorders (states after acute ischaemic stroke, vascular dementia, cerebral atherosclerosis, post-traumatic and hypertensive encephalopathy) to alleviate neurological and cognitive symptoms resulting from chronic cerebrovascular insufficiency; chronic vascular disorders of the choroid and retina in ophthalmology; and perceptive hearing loss, Meniere disease, and vascular tinnitus in otolaryngology.',
    dose:
      'Adults: Usual dose is 5 mg to 10 mg three times daily (15 mg to 30 mg daily), taken orally after meals. No dose adjustment is required in patients with renal or hepatic impairment.',
    contraindications:
      'Hypersensitivity to vinpocetine or to any of the excipients; acute phase of haemorrhagic stroke; severe ischaemic heart disease; severe cardiac arrhythmias; pregnancy; lactation; use in children and adolescents under 18 years of age (due to lack of clinical trial data).',
    adverseEffects:
      'Uncommon: headache, dizziness, sleep disturbances (insomnia, somnolence), nausea, dry mouth, abdominal discomfort, hypotension, tachycardia, extrasystoles, ECG QT prolongation, flushing, elevated hepatic transaminases. Rare: leukopenia, thrombocytopenia, erythema, pruritus.',
    storage:
      'Store below 30°C in the original package in order to protect from light and moisture.',
    specialties: ['Neurology', 'Internal Medicine', 'ENT', 'Ophthalmology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Central Nervous System Portfolio (Cavinton / Vinpocetine)',
        url: 'https://www.gedeonrichter.com/en/products/central-nervous-system',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Each tablet contains 5 mg vinpocetine.',
  },
  {
    brandName: 'Cavinton Forte 10 mg',
    brandNameAr: 'كافينتون فورت 10 ملغ',
    genericName: 'Vinpocetine',
    activeIngredients: ['Vinpocetine'],
    drugClass: 'Cerebral vasodilator and neuroprotective nootropic agent (synthetic eburnamenine derivative)',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Symptomatic treatment of chronic cerebral circulatory insufficiency (post-stroke states, vascular dementia, cerebral atherosclerosis, post-traumatic and hypertensive encephalopathy); chronic vascular disorders of the retina and choroid; and vascular-related perceptive hearing loss, Meniere disease, and tinnitus.',
    dose:
      'Adults: 1 tablet (10 mg) three times daily (30 mg/day) taken orally after meals. Maintenance dose: 5 mg to 10 mg three times daily.',
    contraindications:
      'Hypersensitivity to vinpocetine or excipients; acute phase of haemorrhagic stroke; severe ischaemic heart disease; severe cardiac arrhythmias; pregnancy and lactation; children under 18 years of age.',
    adverseEffects:
      'Uncommon: headache, vertigo, insomnia, somnolence, nausea, heartburn, dry mouth, slight blood pressure reduction, tachycardia, extrasystoles, QT prolongation on ECG, skin flushing. ECG monitoring is recommended in patients with pre-existing long QT syndrome or concomitant QT-prolonging medicines.',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Neurology', 'Internal Medicine', 'ENT', 'Ophthalmology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Central Nervous System Portfolio (Cavinton Forte / Vinpocetine)',
        url: 'https://www.gedeonrichter.com/en/products/central-nervous-system',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Each tablet contains 10 mg vinpocetine.',
  },

  // 2. Mydocalm (Tolperisone — Gedeon Richter Plc.)
  {
    brandName: 'Mydocalm 50 mg',
    brandNameAr: 'ميدوكالم 50 ملغ',
    genericName: 'Tolperisone',
    activeIngredients: ['Tolperisone'],
    drugClass: 'Centrally acting skeletal muscle relaxant',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of post-stroke spasticity in adults.',
    dose:
      'Adults: 150 mg to 450 mg daily divided into three equal doses according to individual clinical needs and tolerance (1 to 3 film-coated tablets of 50 mg three times daily). Must be taken with meals, as food significantly increases the bioavailability of tolperisone.',
    contraindications:
      'Hypersensitivity to tolperisone, chemically similar eperisone, or to any of the excipients; myasthenia gravis; breastfeeding.',
    adverseEffects:
      'Uncommon: anorexia, insomnia, sleep disorder, headache, dizziness, somnolence, arterial hypotension, abdominal discomfort, diarrhoea, dry mouth, dyspepsia, nausea, muscular weakness, myalgia, pain in extremity, asthenia, malaise, fatigue. Rare: hypersensitivity reactions (pruritus, urticaria, rash, angioedema, anaphylactic reaction, dyspnoea).',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Neurology', 'Orthopedics', 'Physical Medicine and Rehabilitation'],
    sources: [
      {
        title: 'EMA Article-31 Referral — Tolperisone-containing medicines (Mydocalm / Gedeon Richter)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/tolperisone',
      },
    ],
    notes:
      'Official EMA Article-31 referral and Gedeon Richter Plc. SmPC data. Each film-coated tablet contains 50 mg tolperisone hydrochloride (INN base: Tolperisone).',
  },
  {
    brandName: 'Mydocalm 150 mg',
    brandNameAr: 'ميدوكالم 150 ملغ',
    genericName: 'Tolperisone',
    activeIngredients: ['Tolperisone'],
    drugClass: 'Centrally acting skeletal muscle relaxant',
    strength: '150 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of post-stroke spasticity in adults.',
    dose:
      'Adults: 150 mg to 450 mg daily divided into three equal doses (usually 1 film-coated tablet of 150 mg three times daily) according to individual need and tolerance. Should be taken after meals with a glass of water to ensure adequate oral bioavailability.',
    contraindications:
      'Hypersensitivity to tolperisone, eperisone, or excipients; myasthenia gravis; breastfeeding.',
    adverseEffects:
      'Uncommon: headache, dizziness, somnolence, insomnia, hypotension, nausea, dyspepsia, dry mouth, diarrhoea, muscular weakness, asthenia, fatigue. Rare: hypersensitivity reactions ranging from mild skin reactions (urticaria, erythema, pruritus) to severe systemic reactions (angioedema, anaphylactic shock).',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Neurology', 'Orthopedics', 'Physical Medicine and Rehabilitation'],
    sources: [
      {
        title: 'EMA Article-31 Referral — Tolperisone-containing medicines (Mydocalm / Gedeon Richter)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/tolperisone',
      },
    ],
    notes:
      'Official EMA Article-31 referral and Gedeon Richter Plc. SmPC data. Each film-coated tablet contains 150 mg tolperisone hydrochloride (INN base: Tolperisone).',
  },

  // 3. Escapelle (Levonorgestrel — Gedeon Richter Plc.)
  {
    brandName: 'Escapelle 1.5 mg',
    brandNameAr: 'إسكابيل 1.5 ملغ',
    genericName: 'Levonorgestrel',
    activeIngredients: ['Levonorgestrel'],
    drugClass: 'Progestogen emergency contraceptive',
    strength: '1.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 1 tablet in blister',
    indications:
      'Emergency contraception within 72 hours (3 days) of unprotected sexual intercourse or failure of a contraceptive method.',
    dose:
      'One 1.5 mg tablet to be taken as soon as possible, preferably within 12 hours, and no later than 72 hours after unprotected intercourse. In women using hepatic enzyme-inducing drugs during the last 4 weeks and unable to use a non-hormonal intrauterine device, a double dose (2 tablets = 3 mg taken together) is recommended. If vomiting occurs within 3 hours of taking the tablet, another tablet should be taken immediately.',
    contraindications:
      'Hypersensitivity to levonorgestrel or to any of the excipients; severe hepatic impairment; confirmed pregnancy.',
    adverseEffects:
      'Very common: headache, nausea, lower abdominal pain, bleeding not related to menses, fatigue. Common: dizziness, diarrhoea, vomiting, breast tenderness, delay of menses by more than 7 days, irregular bleeding and spotting.',
    storage:
      'Store in the original package in order to protect from light. No special temperature storage conditions required.',
    specialties: ['Obstetrics and Gynecology'],
    sources: [
      {
        title: 'EMA Article-31 Referral — Levonorgestrel and ulipristal emergency contraceptives (Escapelle / Gedeon Richter)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/emergency-contraceptives',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Single-dose 1.5 mg levonorgestrel emergency contraceptive tablet.',
  },

  // 4. Postinor-2 (Levonorgestrel — Gedeon Richter Plc.)
  {
    brandName: 'Postinor-2 0.75 mg',
    brandNameAr: 'بوستينور-2 0.75 ملغ',
    genericName: 'Levonorgestrel',
    activeIngredients: ['Levonorgestrel'],
    drugClass: 'Progestogen emergency contraceptive',
    strength: '0.75 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 2 tablets in blister',
    indications:
      'Emergency contraception within 72 hours of unprotected sexual intercourse or failure of a contraceptive method.',
    dose:
      'Two 0.75 mg tablets: either taken together as a single 1.5 mg dose or one 0.75 mg tablet taken as soon as possible (preferably within 12 hours and no later than 72 hours after unprotected intercourse) followed by the second 0.75 mg tablet 12 hours after the first dose. If vomiting occurs within 3 hours of taking either tablet, another tablet should be taken immediately.',
    contraindications:
      'Hypersensitivity to levonorgestrel or to any of the excipients; severe hepatic dysfunction; existing pregnancy.',
    adverseEffects:
      'Very common: nausea, lower abdominal pain, fatigue, headache, intermenstrual bleeding or spotting. Common: dizziness, breast tenderness, diarrhoea, vomiting, delay of menses by more than 7 days.',
    storage:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Women’s Healthcare Portfolio (Postinor / Escapelle)',
        url: 'https://www.gedeonrichter.com/en/products/womens-healthcare',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Two-tablet emergency contraceptive pack containing 0.75 mg levonorgestrel per tablet.',
  },

  // 5. Verospiron (Spironolactone — Gedeon Richter Plc.)
  {
    brandName: 'Verospiron 25 mg',
    brandNameAr: 'فيروسبيرون 25 ملغ',
    genericName: 'Spironolactone',
    activeIngredients: ['Spironolactone'],
    drugClass: 'Aldosterone receptor antagonist (potassium-sparing diuretic)',
    strength: '25 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Congestive heart failure (as an adjunct in NYHA Class III–IV heart failure to improve survival and reduce hospitalisation); essential hypertension (in combination with other antihypertensives); cirrhosis of the liver accompanied by ascites and oedema; nephrotic syndrome oedema; diagnosis and treatment of primary hyperaldosteronism (Conn syndrome); and prevention/treatment of hypokalaemia.',
    dose:
      'Heart failure: initially 25 mg once daily, titrated up to 50 mg once daily as tolerated. Essential hypertension: 50 mg to 100 mg daily in single or divided doses. Hepatic cirrhosis with ascites/oedema: 100 mg to 400 mg daily depending on urinary Na+/K+ ratio. Primary hyperaldosteronism: 100 mg to 400 mg daily in preparation for surgery, or lowest effective maintenance dose.',
    contraindications:
      'Hypersensitivity to spironolactone or excipients; anuria; acute renal insufficiency; severe renal impairment (eGFR < 30 mL/min/1.73 m²); hyperkalaemia; Addison disease; concomitant use of eplerenone or other potassium-sparing diuretics; pregnancy and lactation.',
    adverseEffects:
      'Very common: hyperkalaemia (especially in renal impairment or concomitant ACEi/ARB therapy). Common: gynaecomastia, breast pain/tenderness, menstrual irregularities, erectile dysfunction, dizziness, headache, drowsiness, nausea, vomiting, diarrhoea, muscle spasms, acute kidney injury, pruritus, rash.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Gastroenterology', 'Endocrinology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Cardiovascular Portfolio (Verospiron / Spironolactone)',
        url: 'https://www.gedeonrichter.com/en/products/cardiovascular',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Each tablet contains 25 mg spironolactone.',
  },
  {
    brandName: 'Verospiron 50 mg',
    brandNameAr: 'فيروسبيرون 50 ملغ',
    genericName: 'Spironolactone',
    activeIngredients: ['Spironolactone'],
    drugClass: 'Aldosterone receptor antagonist (potassium-sparing diuretic)',
    strength: '50 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 30 hard capsules in blisters',
    indications:
      'Congestive heart failure; essential hypertension; hepatic cirrhosis accompanied by ascites and oedema; nephrotic syndrome oedema; and primary hyperaldosteronism (Conn syndrome).',
    dose:
      'Essential hypertension: 50 mg to 100 mg daily in 1 or 2 doses. Heart failure maintenance: 25 mg to 50 mg once daily. Cirrhosis with ascites/oedema: 100 mg to 400 mg daily depending on urinary Na+/K+ ratio. Administer with food.',
    contraindications:
      'Hypersensitivity to spironolactone or excipients; anuria; acute renal failure; severe renal impairment; hyperkalaemia; Addison disease; concomitant eplerenone or potassium-sparing diuretics; pregnancy and lactation.',
    adverseEffects:
      'Hyperkalaemia, hyponatraemia, gynaecomastia, mastodynia, menstrual disturbances, impotence, dizziness, confusion, gastrointestinal upset, muscle cramps, rash, Reversible elevation of blood urea and creatinine.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Gastroenterology', 'Endocrinology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Cardiovascular Portfolio (Verospiron / Spironolactone)',
        url: 'https://www.gedeonrichter.com/en/products/cardiovascular',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Each hard capsule contains 50 mg spironolactone.',
  },
  {
    brandName: 'Verospiron 100 mg',
    brandNameAr: 'فيروسبيرون 100 ملغ',
    genericName: 'Spironolactone',
    activeIngredients: ['Spironolactone'],
    drugClass: 'Aldosterone receptor antagonist (potassium-sparing diuretic)',
    strength: '100 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 30 hard capsules in blisters',
    indications:
      'Oedematous states due to hepatic cirrhosis with ascites, congestive heart failure, or nephrotic syndrome; essential hypertension; and diagnosis and pre-operative/chronic management of primary hyperaldosteronism.',
    dose:
      'Cirrhosis with ascites/oedema: 100 mg to 400 mg daily. Primary hyperaldosteronism: 100 mg to 400 mg daily prior to surgery, or lowest effective maintenance dose for patients unsuitable for surgery. Essential hypertension: 50 mg to 100 mg once daily.',
    contraindications:
      'Hypersensitivity to spironolactone or excipients; anuria; acute renal insufficiency; severe renal impairment; hyperkalaemia; Addison disease; concomitant use of eplerenone or potassium-sparing diuretics; pregnancy and lactation.',
    adverseEffects:
      'Hyperkalaemia, hyponatraemia, gynaecomastia, breast tenderness, menstrual disorders, erectile dysfunction, gastrointestinal irritation, drowsiness, ataxia, headache, skin rashes.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Gastroenterology', 'Endocrinology'],
    sources: [
      {
        title: 'Gedeon Richter Plc. — Cardiovascular Portfolio (Verospiron / Spironolactone)',
        url: 'https://www.gedeonrichter.com/en/products/cardiovascular',
      },
    ],
    notes:
      'Official Gedeon Richter Plc. SmPC data. Each hard capsule contains 100 mg spironolactone.',
  },

  // 6. Reagila (Cariprazine — Gedeon Richter Plc.)
  {
    brandName: 'Reagila 1.5 mg',
    brandNameAr: 'رياجيلا 1.5 ملغ',
    genericName: 'Cariprazine',
    activeIngredients: ['Cariprazine'],
    drugClass: 'Atypical antipsychotic (dopamine D3/D2 and serotonin 5-HT1A receptor partial agonist)',
    strength: '1.5 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 28 hard capsules in blisters',
    indications:
      'Treatment of schizophrenia in adult patients.',
    dose:
      'Recommended starting dose is 1.5 mg once daily. Thereafter, the dose can be increased slowly in 1.5 mg increments to a maximum dose of 6 mg/day, if needed. The lowest effective dose should be maintained according to the clinical judgement of the treating physician. May be taken with or without food.',
    contraindications:
      'Hypersensitivity to cariprazine or to any of the excipients; concomitant administration of strong or moderate CYP3A4 inhibitors (e.g. ketoconazole, clarithromycin, erythromycin, diltiazem, verapamil) or strong or moderate CYP3A4 inducers (e.g. carbamazepine, phenobarbital, phenytoin, rifampicin, efavirenz).',
    adverseEffects:
      'Very common: akathisia, parkinsonism. Common: dyslipidaemia, weight increased, decreased or increased appetite, sleep disorders, anxiety, dizziness, dystonia, other extrapyramidal diseases, sedation, somnolence, tremor, blurred vision, tachyarrhythmia, hypertension, nausea, constipation, vomiting, increased hepatic enzymes, fatigue.',
    storage:
      'Keep the blisters in the outer carton in order to protect from light. This medicinal product does not require any special temperature storage conditions.',
    specialties: ['Psychiatry', 'Neurology'],
    sources: [
      {
        title: 'EMA EPAR — Reagila (cariprazine) Product Information (Gedeon Richter Plc.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/reagila',
      },
    ],
    notes:
      'Official EMA EPAR product information (Gedeon Richter Plc.). Each hard capsule contains cariprazine hydrochloride equivalent to 1.5 mg cariprazine (INN base: Cariprazine). Also available in 3 mg, 4.5 mg, and 6 mg hard capsules.',
  },
  {
    brandName: 'Reagila 3 mg',
    brandNameAr: 'رياجيلا 3 ملغ',
    genericName: 'Cariprazine',
    activeIngredients: ['Cariprazine'],
    drugClass: 'Atypical antipsychotic (dopamine D3/D2 and serotonin 5-HT1A receptor partial agonist)',
    strength: '3 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 28 hard capsules in blisters',
    indications:
      'Treatment of schizophrenia in adult patients.',
    dose:
      'Initiated at 1.5 mg once daily and titrated in 1.5 mg increments to 3 mg, 4.5 mg, or up to a maximum of 6 mg once daily depending on clinical response and tolerability. Because of the long half-life of cariprazine and its active metabolites (especially didesmethyl-cariprazine), changes in dose will not be fully reflected in plasma for several weeks.',
    contraindications:
      'Hypersensitivity to cariprazine or excipients; concomitant administration of strong or moderate CYP3A4 inhibitors or strong or moderate CYP3A4 inducers.',
    adverseEffects:
      'Very common: akathisia, parkinsonism. Common: weight gain, dyslipidaemia, insomnia, anxiety, dizziness, dystonia, somnolence, tremor, blurred vision, hypertension, tachycardia, nausea, constipation, vomiting, elevated hepatic enzymes, fatigue.',
    storage:
      'Keep the blisters in the outer carton in order to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sources: [
      {
        title: 'EMA EPAR — Reagila (cariprazine) Product Information (Gedeon Richter Plc.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/reagila',
      },
    ],
    notes:
      'Official EMA EPAR product information (Gedeon Richter Plc.). Each hard capsule contains cariprazine hydrochloride equivalent to 3 mg cariprazine (INN base: Cariprazine).',
  },

  // 7. Ryeqo (Relugolix + Estradiol + Norethisterone — Gedeon Richter Plc.)
  {
    brandName: 'Ryeqo 40 mg/1 mg/0.5 mg',
    brandNameAr: 'رايكو 40 ملغ/1 ملغ/0.5 ملغ',
    genericName: 'Relugolix + Estradiol + Norethisterone',
    activeIngredients: ['Relugolix', 'Estradiol', 'Norethisterone'],
    drugClass: 'Oral GnRH receptor antagonist with low-dose oestrogen/progestogen add-back therapy',
    strength: '40 mg/1 mg/0.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Bottle of 28 film-coated tablets',
    indications:
      'Treatment of moderate to severe symptoms of uterine fibroids in adult women of reproductive age; and symptomatic treatment of endometriosis in women with a history of previous medical or surgical treatment for their endometriosis.',
    dose:
      'One tablet (40 mg relugolix / 1 mg estradiol / 0.5 mg norethisterone acetate) must be taken once daily, at approximately the same time each day, with or without food. The first tablet must be started within 5 days of the onset of menstrual bleeding. Hormonal contraceptives must be stopped prior to initiation; provides adequate contraception after at least 1 month of use.',
    contraindications:
      'Hypersensitivity to the active substances or excipients; current or previous venous thromboembolic disorder (deep vein thrombosis, pulmonary embolism); current or previous arterial thromboembolic cardiovascular disease (myocardial infarction, stroke, ischaemic heart disease); known thrombophilic disorder; known osteoporosis; headaches with focal neurological symptoms or migraine with aura; known or suspected sex-steroid-influenced malignancies; liver tumours (benign or malignant) or severe hepatic disease; pregnancy or breastfeeding; genital bleeding of unknown aetiology; concomitant use of hormonal contraceptives.',
    adverseEffects:
      'Very common: headache, hot flush. Common: irritability, anxiety, depression, mood swings, decreased libido, alopecia, hyperhidrosis, night sweats, uterine bleeding (menorraghia, metrorrhagia, irregular menstruation), dyspepsia, arthralgia, bone mineral density decreased, breast cyst.',
    storage:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Obstetrics and Gynecology'],
    sources: [
      {
        title: 'EMA EPAR — Ryeqo (relugolix / estradiol / norethisterone acetate) Product Information (Gedeon Richter Plc.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ryeqo',
      },
    ],
    notes:
      'Official EMA EPAR product information (Gedeon Richter Plc.). Each film-coated tablet contains 40 mg relugolix, 1 mg estradiol (as hemihydrate), and 0.5 mg norethisterone acetate (INN bases: Relugolix + Estradiol + Norethisterone). Esmya is excluded per regulatory withdrawal.',
  },

  // 8. Terrosa (Teriparatide — Gedeon Richter Plc.)
  {
    brandName: 'Terrosa 20 micrograms/80 microlitres',
    brandNameAr: 'تيروزا 20 ميكروغرام/80 ميكرولتر',
    genericName: 'Teriparatide',
    activeIngredients: ['Teriparatide'],
    drugClass: 'Parathyroid hormone analogue (recombinant human PTH 1-34 bone formation agent, biosimilar)',
    strength: '20 micrograms/80 microlitres',
    dosageForm: 'Solution for injection in cartridge',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 cartridge of 2.4 mL (28 doses) for use with Terrosa Pen',
    indications:
      'Treatment of osteoporosis in postmenopausal women and in men at increased risk of fracture; and treatment of osteoporosis associated with sustained systemic glucocorticoid therapy in women and men at increased risk for fracture.',
    dose:
      'Recommended dose is 20 micrograms administered once daily by subcutaneous injection in the thigh or abdomen using the reusable Terrosa Pen. Maximum total duration of treatment with teriparatide should be 24 months and this 24-month course should not be repeated over a patient’s lifetime. Patients should receive supplemental calcium and vitamin D if dietary intake is inadequate.',
    contraindications:
      'Hypersensitivity to teriparatide or to any of the excipients; pregnancy and breastfeeding; pre-existing hypercalcaemia; severe renal impairment; metabolic bone diseases (including hyperparathyroidism and Paget disease of bone) other than primary osteoporosis or glucocorticoid-induced osteoporosis; unexplained elevations of alkaline phosphatase; prior external beam or implant radiation therapy to the skeleton; patients with skeletal malignancies or bone metastases.',
    adverseEffects:
      'Very common: pain in limb. Common: anaemia, hypercholesterolaemia, depression, dizziness, headache, sciatica, syncope, vertigo, palpitations, hypotension, dyspnoea, nausea, vomiting, hiatus hernia, gastro-oesophageal reflux disease, sweating increased, muscle cramps, fatigue, chest pain, asthenia, mild and transient injection site events (pain, swelling, erythema, localised bruising, pruritus).',
    storage:
      'Store in a refrigerator (2°C to 8°C) at all times. Return the pen with inserted cartridge to the refrigerator immediately after use. Do not freeze. Keep the cartridge in the outer carton to protect from light.',
    specialties: ['Endocrinology', 'Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — Terrosa (teriparatide) Product Information (Gedeon Richter Plc.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/terrosa',
      },
    ],
    notes:
      'Official EMA EPAR product information (Gedeon Richter Plc.). Each 80 microlitre dose contains 20 micrograms of teriparatide.',
  },
];

export const GEDEON_RICHTER_PRODUCTS: AiProductDraft[] = RAW_GEDEON_RICHTER.map((d) => ({
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
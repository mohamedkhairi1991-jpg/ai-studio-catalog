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

const RAW_MENARINI: CompactDrug[] = [
  // 1. Nebilet (Nebivolol)
  {
    brandName: 'Nebilet 5 mg',
    genericName: 'Nebivolol',
    activeIngredients: ['Nebivolol'],
    drugClass: 'Selective beta-1 adrenergic receptor antagonist with vasodilating properties (NO-potentiating)',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 cross-scored tablets in PVC/aluminium blisters',
    indications:
      'Treatment of essential hypertension in adults; treatment of stable mild and moderate chronic heart failure in addition to standard therapies in elderly patients aged 70 years or older.',
    dose:
      'Hypertension: 5 mg (one tablet) once daily, preferably at the same time each day, with or without food (2.5 mg starting dose in patients with renal insufficiency or aged >65 years). Chronic heart failure: initial titration from 1.25 mg once daily, doubled every 1–2 weeks as tolerated to a maximum target dose of 10 mg once daily.',
    contraindications:
      'Hypersensitivity to nebivolol or any excipient; liver insufficiency or liver function impairment; acute heart failure, cardiogenic shock, or episodes of heart failure decompensation requiring IV inotropic therapy; sick sinus syndrome (including sino-atrial block); second- and third-degree heart block (without a pacemaker); history of bronchospasm and bronchial asthma; untreated phaeochromocytoma; metabolic acidosis; bradycardia (heart rate <60 bpm prior to therapy); hypotension (systolic BP <90 mmHg); severe peripheral circulatory disturbances.',
    adverseEffects:
      'Headache, dizziness, paraesthesia, dyspnoea, constipation, nausea, diarrhoea, tiredness, oedema; in chronic heart failure, bradycardia and dizziness are very common, and worsening of heart failure, postural hypotension, drug intolerance, first-degree AV block, and lower limb oedema are common.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Nebilet 5 mg Tablets SmPC (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.medicines.org.uk/emc/product/1659/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Menarini International Operations Luxembourg S.A., Menarini Group). Each tablet contains 5 mg of nebivolol (equivalent to 5.45 mg nebivolol hydrochloride). Generic name normalized to INN base (Nebivolol).',
  },

  // 2. Nebilet Plus (Nebivolol + Hydrochlorothiazide)
  {
    brandName: 'Nebilet Plus 5 mg / 12.5 mg',
    genericName: 'Nebivolol + Hydrochlorothiazide',
    activeIngredients: ['Nebivolol', 'Hydrochlorothiazide'],
    drugClass: 'Selective beta-1 blocker and thiazide diuretic fixed-dose combination',
    strength: '5 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is adequately controlled on nebivolol 5 mg and hydrochlorothiazide 12.5 mg given concurrently.',
    dose:
      'One film-coated tablet (5 mg / 12.5 mg) once daily, preferably at the same time of day, taken with or without food.',
    contraindications:
      'Hypersensitivity to nebivolol, hydrochlorothiazide, other sulfonamide-derived substances, or any excipient; hepatic insufficiency or impaired liver function; anuria, severe renal insufficiency (creatinine clearance <30 mL/min); acute heart failure, cardiogenic shock, or decompensated heart failure requiring IV inotropes; sick sinus syndrome; second- or third-degree AV block (without pacemaker); bronchospasm and bronchial asthma; untreated phaeochromocytoma; metabolic acidosis; bradycardia (<60 bpm); hypotension (SBP <90 mmHg); severe peripheral circulatory disturbances; refractory hypokalaemia, hyponatraemia, hypercalcaemia, and symptomatic hyperuricaemia.',
    adverseEffects:
      'Headache, dizziness, paraesthesia, fatigue, dyspnoea, nausea, constipation, diarrhoea, oedema, hypokalaemia, hyperuricaemia, hyperglycaemia, hyperlipidaemia, postural hypotension, bradycardia.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Nebilet Plus (Nebivolol / Hydrochlorothiazide) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini International Operations Luxembourg S.A. SmPC data for Nebilet Plus 5 mg / 12.5 mg film-coated tablets. Generic names normalized to INN bases (Nebivolol + Hydrochlorothiazide).',
  },
  {
    brandName: 'Nebilet Plus 5 mg / 25 mg',
    genericName: 'Nebivolol + Hydrochlorothiazide',
    activeIngredients: ['Nebivolol', 'Hydrochlorothiazide'],
    drugClass: 'Selective beta-1 blocker and thiazide diuretic fixed-dose combination',
    strength: '5 mg / 25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is adequately controlled on nebivolol 5 mg and hydrochlorothiazide 25 mg given concurrently.',
    dose:
      'One film-coated tablet (5 mg / 25 mg) once daily, preferably at the same time of day, taken with or without food.',
    contraindications:
      'Hypersensitivity to nebivolol, hydrochlorothiazide, other sulfonamide-derived substances, or any excipient; hepatic insufficiency or impaired liver function; anuria, severe renal insufficiency (creatinine clearance <30 mL/min); acute heart failure, cardiogenic shock, or decompensated heart failure requiring IV inotropes; sick sinus syndrome; second- or third-degree AV block (without pacemaker); bronchospasm and bronchial asthma; untreated phaeochromocytoma; metabolic acidosis; bradycardia (<60 bpm); hypotension (SBP <90 mmHg); severe peripheral circulatory disturbances; refractory hypokalaemia, hyponatraemia, hypercalcaemia, and symptomatic hyperuricaemia.',
    adverseEffects:
      'Headache, dizziness, paraesthesia, fatigue, dyspnoea, nausea, constipation, diarrhoea, oedema, hypokalaemia, hyperuricaemia, hyperglycaemia, hyperlipidaemia, postural hypotension, bradycardia.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Nebilet Plus (Nebivolol / Hydrochlorothiazide) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini International Operations Luxembourg S.A. SmPC data for Nebilet Plus 5 mg / 25 mg film-coated tablets. Generic names normalized to INN bases (Nebivolol + Hydrochlorothiazide).',
  },

  // 3. Adenuric (Febuxostat)
  {
    brandName: 'Adenuric 80 mg',
    genericName: 'Febuxostat',
    activeIngredients: ['Febuxostat'],
    drugClass: 'Non-purine selective xanthine oxidase inhibitor (antigout preparation)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in PVC/PVDC/aluminium blisters',
    indications:
      'Treatment of chronic hyperuricaemia in conditions where urate deposition has already occurred (including a history, or presence of, tophus and/or gouty arthritis) in adults.',
    dose:
      'Recommended starting oral dose is 80 mg once daily without regard to food. If serum uric acid is >6 mg/dL (357 µmol/L) after 2–4 weeks, Adenuric 120 mg once daily may be considered. Gout flare prophylaxis of at least 6 months is recommended.',
    contraindications:
      'Hypersensitivity to febuxostat or to any of the excipients.',
    adverseEffects:
      'Gout flares, headache, diarrhoea, nausea, liver function abnormalities, rash, oedema.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Rheumatology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'EMA EPAR — Adenuric (febuxostat) Product Information (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adenuric',
      },
    ],
    notes:
      'Official EMA EPAR product information (Menarini International Operations Luxembourg S.A.).',
  },
  {
    brandName: 'Adenuric 120 mg',
    genericName: 'Febuxostat',
    activeIngredients: ['Febuxostat'],
    drugClass: 'Non-purine selective xanthine oxidase inhibitor (antigout preparation)',
    strength: '120 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in PVC/PVDC/aluminium blisters',
    indications:
      'Treatment of chronic hyperuricaemia in conditions where urate deposition has already occurred (including a history, or presence of, tophus and/or gouty arthritis) in adults; prevention and treatment of hyperuricaemia in adult patients undergoing chemotherapy for haematologic malignancies at intermediate to high risk of Tumor Lysis Syndrome (TLS).',
    dose:
      'Chronic hyperuricaemia/gout: 120 mg once daily if serum uric acid remains >6 mg/dL after 2–4 weeks on 80 mg once daily. Tumor Lysis Syndrome: 120 mg once daily starting two days before cytotoxic therapy and continuing for a minimum of 7 days (up to 9 days according to chemotherapy duration).',
    contraindications:
      'Hypersensitivity to febuxostat or to any of the excipients.',
    adverseEffects:
      'Gout flares, headache, diarrhoea, nausea, liver function abnormalities, rash, oedema.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Rheumatology', 'Internal Medicine', 'Hematology', 'Oncology'],
    sources: [
      {
        title: 'EMA EPAR — Adenuric (febuxostat) Product Information (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adenuric',
      },
    ],
    notes:
      'Official EMA EPAR product information (Menarini International Operations Luxembourg S.A.).',
  },

  // 4. Fastum Gel (Ketoprofen)
  {
    brandName: 'Fastum Gel 2.5%',
    genericName: 'Ketoprofen',
    activeIngredients: ['Ketoprofen'],
    drugClass: 'Topical non-steroidal anti-inflammatory drug (propionic acid derivative)',
    strength: '2.5% w/w (25 mg/g)',
    dosageForm: 'Gel',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 50 g gel',
    indications:
      'Local symptomatic relief of pain and inflammation in rheumatic or traumatic conditions of the joints, tendons, ligaments, and muscles (such as sprains, strains, tendinitis, and contusions).',
    dose:
      'Adults: Apply a thin layer of gel (3–5 cm, or more depending on the extent of the affected area) to the skin once or twice daily, massaging gently to aid absorption. Total duration of treatment should not exceed 7 days. Wash hands thoroughly after each application.',
    contraindications:
      'History of any photosensitivity reaction; known hypersensitivity reactions (such as symptoms of asthma, allergic rhinitis, or urticaria) to ketoprofen, fenofibrate, tiaprofenic acid, acetylsalicylic acid, or other NSAIDs; history of skin allergy to ketoprofen, UV blockers (octocrylene), or perfumes; exposure of treated areas to sunlight (even hazy) or UV light from solarium during treatment and for 2 weeks after discontinuation; application to pathological skin changes such as eczema, acne, infected skin, or open wounds; third trimester of pregnancy.',
    adverseEffects:
      'Localised skin reactions (erythema, pruritus, eczema, burning sensation), photosensitivity reactions, bullous dermatoses, urticaria, contact dermatitis, rare systemic hypersensitivity/anaphylactic reactions or worsening of renal insufficiency.',
    storage: 'Do not store above 25°C. Keep tube tightly closed in the outer carton to protect from light.',
    specialties: ['Orthopedics', 'Rheumatology', 'General Practice'],
    sources: [
      {
        title: 'A. Menarini Industrie Farmaceutiche Riunite S.r.l. — Fastum Gel 2.5% (Ketoprofen) Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini SmPC data for Fastum Gel 2.5% (25 mg ketoprofen per gram of gel).',
  },

  // 5. Enantyum (Dexketoprofen)
  {
    brandName: 'Enantyum 12.5 mg',
    genericName: 'Dexketoprofen',
    activeIngredients: ['Dexketoprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (propionic acid derivative)',
    strength: '12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Short-term symptomatic treatment of acute pain of mild to moderate intensity in adults, such as musculoskeletal pain, dysmenorrhoea, and dental pain.',
    dose:
      'Adults: 12.5 mg every 4–6 hours or 25 mg every 8 hours depending on the nature and severity of pain; total daily dose should not exceed 75 mg (not exceeding 50 mg/day in elderly patients or those with mild renal or mild-to-moderate hepatic impairment). Take with a sufficient amount of water; administration at least 30 minutes before meals is advised in acute pain.',
    contraindications:
      'Hypersensitivity to dexketoprofen, any other NSAID, or any excipient; patients in whom substances with a similar action (e.g. aspirin or other NSAIDs) precipitate attacks of asthma, bronchospasm, acute rhinitis, nasal polyps, urticaria, or angioneurotic oedema; known photoallergic or phototoxic reactions during treatment with ketoprofen or fibrates; history of gastrointestinal bleeding or perforation related to previous NSAID therapy; active peptic ulcer/gastrointestinal haemorrhage or any history of recurrent GI bleeding/ulceration; chronic dyspepsia; other active bleeding or bleeding disorders; Crohn disease or ulcerative colitis; severe heart failure; moderate to severe renal dysfunction (CrCl <=59 mL/min); severely impaired hepatic function; haemorrhagic diathesis and other coagulation disorders; severe dehydration; third trimester of pregnancy and lactation.',
    adverseEffects:
      'Nausea, vomiting, abdominal pain, diarrhoea, dyspepsia, dizziness, headache, somnolence, insomnia, vertigo, gastritis, constipation, dry mouth, flatulence, rash, fatigue, palpitations.',
    storage: 'Store below 30°C in the original package in order to protect from light and moisture.',
    specialties: ['Internal Medicine', 'Orthopedics', 'Gynecology', 'General Practice'],
    sources: [
      {
        title: 'Menarini Group — Enantyum (Dexketoprofen) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini Group (Laboratorios Menarini S.A.) SmPC data. Each tablet contains 12.5 mg dexketoprofen (as dexketoprofen trometamol). Generic name normalized to INN base (Dexketoprofen).',
  },
  {
    brandName: 'Enantyum 25 mg',
    genericName: 'Dexketoprofen',
    activeIngredients: ['Dexketoprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (propionic acid derivative)',
    strength: '25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 scored film-coated tablets in blisters',
    indications:
      'Short-term symptomatic treatment of acute pain of mild to moderate intensity in adults, such as musculoskeletal pain, dysmenorrhoea, and dental pain.',
    dose:
      'Adults: 25 mg every 8 hours (or 12.5 mg every 4–6 hours); total daily dose should not exceed 75 mg (not exceeding 50 mg/day in elderly patients or those with mild renal or mild-to-moderate hepatic impairment). In acute pain, take at least 30 minutes before meals.',
    contraindications:
      'Hypersensitivity to dexketoprofen, any other NSAID, or any excipient; NSAID-induced asthma, bronchospasm, acute rhinitis, nasal polyps, urticaria, or angioedema; known photoallergic or phototoxic reactions to ketoprofen or fibrates; active or recurrent peptic ulcer/gastrointestinal haemorrhage or GI perforation related to prior NSAID therapy; Crohn disease or ulcerative colitis; severe heart failure; moderate to severe renal dysfunction (CrCl <=59 mL/min); severely impaired hepatic function; haemorrhagic diathesis and coagulation disorders; severe dehydration; third trimester of pregnancy and lactation.',
    adverseEffects:
      'Nausea, vomiting, abdominal pain, diarrhoea, dyspepsia, dizziness, headache, somnolence, insomnia, vertigo, gastritis, constipation, dry mouth, flatulence, rash, fatigue, palpitations.',
    storage: 'Store below 30°C in the original package in order to protect from light and moisture.',
    specialties: ['Internal Medicine', 'Orthopedics', 'Gynecology', 'General Practice'],
    sources: [
      {
        title: 'Menarini Group — Enantyum 25 mg (Dexketoprofen) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini Group (Laboratorios Menarini S.A.) SmPC data. Each scored tablet contains 25 mg dexketoprofen (as dexketoprofen trometamol). Generic name normalized to INN base (Dexketoprofen).',
  },
  {
    brandName: 'Enantyum 50 mg/2 mL',
    genericName: 'Dexketoprofen',
    activeIngredients: ['Dexketoprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (propionic acid derivative)',
    strength: '50 mg/2 mL (25 mg/mL)',
    dosageForm: 'Solution for injection or concentrate for solution for infusion',
    route: 'Intramuscular or intravenous',
    packSize: 'Pack of 5 amber glass ampoules of 2 mL',
    indications:
      'Symptomatic treatment of acute pain of moderate to severe intensity when oral administration is not appropriate, such as post-operative pain, renal colic, and low back pain in adults.',
    dose:
      'Adults: 50 mg every 8–12 hours. If necessary, administration can be repeated 6 hours apart; total daily dose must not exceed 150 mg (50 mg total daily dose in elderly or patients with mild renal or mild-to-moderate hepatic impairment). Intended for short-term acute period only (no more than 2 days); switch to oral analgesic treatment as soon as possible.',
    contraindications:
      'Hypersensitivity to dexketoprofen, other NSAIDs, or excipients; NSAID-induced asthma, bronchospasm, acute rhinitis, urticaria, or angioedema; photoallergic/phototoxic reactions to ketoprofen or fibrates; active or recurrent peptic ulcer/GI haemorrhage or perforation; Crohn disease or ulcerative colitis; severe heart failure; moderate to severe renal dysfunction (CrCl <=59 mL/min); severely impaired hepatic function; haemorrhagic diathesis or concomitant anticoagulant therapy; neuraxial (intrathecal or epidural) administration due to ethanol content; third trimester of pregnancy and lactation.',
    adverseEffects:
      'Injection site pain, injection site reaction (inflammation, bruising, haemorrhage), nausea, vomiting, anaemia, insomnia, headache, dizziness, blurred vision, hypotension, abdominal pain, diarrhoea, dyspepsia, dermatitis, pruritus, rash, pyrexia, fatigue.',
    storage: 'Keep the ampoules in the outer carton in order to protect from light. Diluted IV solutions must be protected from natural daylight.',
    specialties: ['Anesthesiology', 'Emergency Medicine', 'Surgery', 'Orthopedics', 'Urology'],
    sources: [
      {
        title: 'Menarini Group — Enantyum 50 mg/2 mL Solution for Injection/Infusion Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini Group SmPC data. Each 2 mL ampoule contains 50 mg dexketoprofen (as dexketoprofen trometamol). Generic name normalized to INN base (Dexketoprofen).',
  },

  // 6. Ranexa (Ranolazine)
  {
    brandName: 'Ranexa 375 mg',
    genericName: 'Ranolazine',
    activeIngredients: ['Ranolazine'],
    drugClass: 'Antianginal agent (late sodium current inhibitor in cardiac cells)',
    strength: '375 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 60 prolonged-release tablets in blisters',
    indications:
      'Indicated in adults as add-on therapy for the symptomatic treatment of patients with stable angina pectoris who are inadequately controlled or intolerant to first-line antianginal therapies (such as beta-blockers and/or calcium antagonists).',
    dose:
      'Recommended initial dose is 375 mg twice daily. After 2–4 weeks, the dose should be titrated to 500 mg twice daily and, according to the patient response, further titrated to a recommended maximum dose of 750 mg twice daily. Swallow whole with or without food; do not crush, break, or chew.',
    contraindications:
      'Hypersensitivity to ranolazine or to any of the excipients; severe renal impairment (creatinine clearance <30 mL/min); moderate or severe hepatic impairment; concomitant administration of potent CYP3A4 inhibitors (e.g. itraconazole, ketoconazole, voriconazole, posaconazole, HIV protease inhibitors, clarithromycin, telithromycin, nefazodone); concomitant administration of Class Ia (e.g. quinidine) or Class III (e.g. dofetilide, sotalol) antiarrhythmics other than amiodarone.',
    adverseEffects:
      'Dizziness, headache, constipation, vomiting, nausea, asthenia, QT interval prolongation, tinnitus, vertigo, blurred vision, diplopia, abdominal pain, dry mouth, dyspepsia, pruritus, peripheral oedema.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — Ranexa (ranolazine) Product Information (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ranexa',
      },
    ],
    notes:
      'Official EMA EPAR product information (Menarini International Operations Luxembourg S.A.).',
  },
  {
    brandName: 'Ranexa 500 mg',
    genericName: 'Ranolazine',
    activeIngredients: ['Ranolazine'],
    drugClass: 'Antianginal agent (late sodium current inhibitor in cardiac cells)',
    strength: '500 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 60 prolonged-release tablets in blisters',
    indications:
      'Indicated in adults as add-on therapy for the symptomatic treatment of patients with stable angina pectoris who are inadequately controlled or intolerant to first-line antianginal therapies (such as beta-blockers and/or calcium antagonists).',
    dose:
      'Titrated dose: 500 mg twice daily after 2–4 weeks on 375 mg twice daily; may be further titrated to a maximum of 750 mg twice daily according to clinical response and tolerability. Maximum dose is 500 mg twice daily in patients taking moderate CYP3A4 inhibitors (e.g. diltiazem, verapamil, erythromycin) or P-gp inhibitors (e.g. verapamil, ciclosporin). Swallow whole; do not crush, break, or chew.',
    contraindications:
      'Hypersensitivity to ranolazine or to any of the excipients; severe renal impairment (creatinine clearance <30 mL/min); moderate or severe hepatic impairment; concomitant administration of potent CYP3A4 inhibitors; concomitant administration of Class Ia or Class III antiarrhythmics other than amiodarone.',
    adverseEffects:
      'Dizziness, headache, constipation, vomiting, nausea, asthenia, QT interval prolongation, tinnitus, vertigo, blurred vision, diplopia, abdominal pain, dry mouth, dyspepsia, pruritus, peripheral oedema.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — Ranexa (ranolazine) Product Information (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ranexa',
      },
    ],
    notes:
      'Official EMA EPAR product information (Menarini International Operations Luxembourg S.A.).',
  },
  {
    brandName: 'Ranexa 750 mg',
    genericName: 'Ranolazine',
    activeIngredients: ['Ranolazine'],
    drugClass: 'Antianginal agent (late sodium current inhibitor in cardiac cells)',
    strength: '750 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 60 prolonged-release tablets in blisters',
    indications:
      'Indicated in adults as add-on therapy for the symptomatic treatment of patients with stable angina pectoris who are inadequately controlled or intolerant to first-line antianginal therapies (such as beta-blockers and/or calcium antagonists).',
    dose:
      'Maximum maintenance dose: 750 mg twice daily, reached by stepwise titration from 375 mg twice daily and 500 mg twice daily. If treatment-related adverse events occur (e.g. dizziness, nausea, vomiting), down-titrate to 500 mg or 375 mg twice daily. Swallow whole; do not crush, break, or chew.',
    contraindications:
      'Hypersensitivity to ranolazine or to any of the excipients; severe renal impairment (creatinine clearance <30 mL/min); moderate or severe hepatic impairment; concomitant administration of potent CYP3A4 inhibitors; concomitant administration of Class Ia or Class III antiarrhythmics other than amiodarone.',
    adverseEffects:
      'Dizziness, headache, constipation, vomiting, nausea, asthenia, QT interval prolongation, tinnitus, vertigo, blurred vision, diplopia, abdominal pain, dry mouth, dyspepsia, pruritus, peripheral oedema.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — Ranexa (ranolazine) Product Information (Menarini International Operations Luxembourg S.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ranexa',
      },
    ],
    notes:
      'Official EMA EPAR product information (Menarini International Operations Luxembourg S.A.).',
  },

  // 7. Zofenil (Zofenopril)
  {
    brandName: 'Zofenil 7.5 mg',
    genericName: 'Zofenopril',
    activeIngredients: ['Zofenopril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor (sulfhydryl-containing)',
    strength: '7.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of mild to moderate essential hypertension; treatment initiated within the first 24 hours of patients with acute myocardial infarction with or without signs and symptoms of heart failure, who are haemodynamically stable and have not received thrombolytic therapy.',
    dose:
      'Hypertension: starting dose in patients with volume/salt depletion or renal/hepatic impairment is 7.5 mg once daily, titrated up to the usual effective dose of 30 mg once daily. Acute myocardial infarction: Day 1 and 2: 7.5 mg every 12 hours; Day 3 and 4: 15 mg every 12 hours; from Day 5 onwards: 30 mg every 12 hours for 6 weeks.',
    contraindications:
      'Hypersensitivity to zofenopril calcium, any other ACE inhibitor, or any excipient; history of angioneurotic oedema associated with previous ACE inhibitor therapy; concomitant use with sacubitril/valsartan therapy (do not initiate within 36 hours of last dose of sacubitril/valsartan); hereditary/idiopathic angioneurotic oedema; severe hepatic impairment; bilateral renal artery stenosis or unilateral renal artery stenosis in a single kidney; second and third trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, headache, cough, fatigue, nausea, vomiting, hypotension, rash, muscle cramps, asthenia, hyperkalaemia, renal function impairment, angioedema (rare).',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Zofenil (Zofenopril) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini International Operations Luxembourg S.A. SmPC data. Each tablet contains 7.5 mg zofenopril calcium (equivalent to 7.2 mg zofenopril). Generic name normalized to INN base (Zofenopril).',
  },
  {
    brandName: 'Zofenil 30 mg',
    genericName: 'Zofenopril',
    activeIngredients: ['Zofenopril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor (sulfhydryl-containing)',
    strength: '30 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 scored film-coated tablets in blisters',
    indications:
      'Treatment of mild to moderate essential hypertension; treatment initiated within the first 24 hours of patients with acute myocardial infarction with or without signs and symptoms of heart failure, who are haemodynamically stable and have not received thrombolytic therapy.',
    dose:
      'Essential hypertension: start with 15 mg (half a 30 mg tablet) once daily and titrate at 4-week intervals to the usual optimal maintenance dose of 30 mg once daily (maximum 60 mg/day in a single or two divided doses). Acute myocardial infarction: target dose from Day 5 onwards is 30 mg every 12 hours for 6 weeks.',
    contraindications:
      'Hypersensitivity to zofenopril calcium, any other ACE inhibitor, or any excipient; history of angioneurotic oedema associated with previous ACE inhibitor therapy; concomitant use with sacubitril/valsartan therapy; hereditary/idiopathic angioneurotic oedema; severe hepatic impairment; bilateral renal artery stenosis or unilateral renal artery stenosis in a single kidney; second and third trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, headache, cough, fatigue, nausea, vomiting, hypotension, rash, muscle cramps, asthenia, hyperkalaemia, renal function impairment, angioedema (rare).',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Zofenil 30 mg (Zofenopril) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini International Operations Luxembourg S.A. SmPC data. Each scored tablet contains 30 mg zofenopril calcium (equivalent to 28.7 mg zofenopril). Generic name normalized to INN base (Zofenopril).',
  },

  // 8. Zofenil Plus (Zofenopril + Hydrochlorothiazide)
  {
    brandName: 'Zofenil Plus 30 mg / 12.5 mg',
    genericName: 'Zofenopril + Hydrochlorothiazide',
    activeIngredients: ['Zofenopril', 'Hydrochlorothiazide'],
    drugClass: 'ACE inhibitor and thiazide diuretic fixed-dose combination',
    strength: '30 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of mild to moderate essential hypertension in adult patients whose blood pressure is not adequately controlled on zofenopril alone.',
    dose:
      'One film-coated tablet (30 mg / 12.5 mg) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to zofenopril, other ACE inhibitors, hydrochlorothiazide, other sulfonamide derivatives, or any excipient; history of angioneurotic oedema associated with previous ACE inhibitor therapy; concomitant use with sacubitril/valsartan; hereditary/idiopathic angioneurotic oedema; severe hepatic impairment; severe renal impairment (creatinine clearance <30 mL/min) or anuria; bilateral renal artery stenosis or stenosis in a solitary kidney; second and third trimesters of pregnancy; concomitant use with aliskiren in patients with diabetes mellitus or GFR <60 mL/min/1.73 m².',
    adverseEffects:
      'Dizziness, headache, cough, hyperuricaemia, hyperglycaemia, hypokalaemia, hyperlipidaemia, fatigue, nausea, abdominal pain, hypotension, muscle cramps.',
    storage: 'Do not store above 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Zofenil Plus (Zofenopril / Hydrochlorothiazide) Film-Coated Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini International Operations Luxembourg S.A. SmPC data for Zofenil Plus 30 mg / 12.5 mg film-coated tablets. Generic names normalized to INN bases (Zofenopril + Hydrochlorothiazide).',
  },

  // 9. Bilaxten (Bilastine)
  {
    brandName: 'Bilaxten 20 mg',
    genericName: 'Bilastine',
    activeIngredients: ['Bilastine'],
    drugClass: 'Non-sedating long-acting peripheral histamine H1-receptor antagonist',
    strength: '20 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in aluminium/aluminium blisters',
    indications:
      'Symptomatic treatment of allergic rhino-conjunctivitis (seasonal and perennial) and urticaria in adults and adolescents aged 12 years and older.',
    dose:
      '20 mg (one tablet) once daily for the relief of symptoms of allergic rhino-conjunctivitis and urticaria. The tablet must be taken in fasting conditions, 1 hour before or 2 hours after intake of food or fruit juice.',
    contraindications:
      'Hypersensitivity to bilastine or to any of the excipients.',
    adverseEffects:
      'Headache, somnolence, dizziness, fatigue, abdominal pain, nausea, diarrhoea, dry mouth, increased appetite, anxiety, insomnia, tinnitus.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Allergy & Immunology', 'Otolaryngology (ENT)', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Menarini Group — Bilaxten 20 mg (Bilastine) Tablets Official Product Information',
        url: 'https://www.menarini.com/en-us/our-products/pharmaceuticals',
      },
    ],
    notes:
      'Official Menarini Group SmPC data for Bilaxten 20 mg tablets.',
  },

  // 10. Priligy (Dapoxetine)
  {
    brandName: 'Priligy 30 mg',
    genericName: 'Dapoxetine',
    activeIngredients: ['Dapoxetine'],
    drugClass: 'Short-acting selective serotonin reuptake inhibitor (SSRI) for premature ejaculation',
    strength: '30 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 or 6 film-coated tablets in PVC/PE/PVDC/aluminium blisters',
    indications:
      'Treatment of premature ejaculation (PE) in adult men aged 18 to 64 years who meet all diagnostic criteria (intravaginal ejaculatory latency time <2 minutes, persistent or recurrent ejaculation with minimal sexual stimulation before, on, or shortly after penetration and before the patient wishes it, marked personal distress or interpersonal difficulty as a consequence of PE, and poor control over ejaculation).',
    dose:
      'Recommended starting dose for all patients is 30 mg, taken as needed approximately 1 to 3 hours prior to sexual activity with at least one full glass of water. Do not take more than once every 24 hours. Not intended for continuous daily use. Check orthostatic blood pressure and pulse rate before initiating therapy.',
    contraindications:
      'Hypersensitivity to dapoxetine or any excipient; significant pathological cardiac conditions (heart failure NYHA class II–IV, conduction abnormalities such as AV block or sick sinus syndrome, significant ischaemic heart disease, significant valvular disease); history of syncope; history of mania or severe depression; concomitant treatment with MAOIs (or within 14 days of discontinuing an MAOI; do not give an MAOI within 7 days of stopping Priligy), thioridazine, SSRIs, SNRIs, tricyclic antidepressants, or other medicinal/herbal products with serotonergic effects (e.g. L-tryptophan, triptans, tramadol, linezolid, lithium, St. John Wort); concomitant treatment with potent CYP3A4 inhibitors (ketoconazole, itraconazole, ritonavir, saquinavir, telithromycin, nefazodone, nelfinavir, atazanavir); moderate and severe hepatic impairment.',
    adverseEffects:
      'Nausea, dizziness, headache, diarrhoea, insomnia, fatigue, anxiety, agitation, restlessness, decreased libido, somnolence, disturbance in attention, tremor, paraesthesia, blurred vision, tinnitus, flushing, sinus congestion, vomiting, constipation, abdominal pain, dyspepsia, flatulence, dry mouth, hyperhidrosis, erectile dysfunction, irritability, orthostatic hypotension, syncope.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Andrology'],
    sources: [
      {
        title: 'UK EMC — Priligy 30 mg Film-Coated Tablets SmPC (Berlin-Chemie AG / Menarini Group)',
        url: 'https://www.medicines.org.uk/emc/product/1269/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Berlin-Chemie AG, Menarini Group). Each tablet contains 30 mg dapoxetine (as dapoxetine hydrochloride). Generic name normalized to INN base (Dapoxetine).',
  },
  {
    brandName: 'Priligy 60 mg',
    genericName: 'Dapoxetine',
    activeIngredients: ['Dapoxetine'],
    drugClass: 'Short-acting selective serotonin reuptake inhibitor (SSRI) for premature ejaculation',
    strength: '60 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 or 6 film-coated tablets in PVC/PE/PVDC/aluminium blisters',
    indications:
      'Treatment of premature ejaculation (PE) in adult men aged 18 to 64 years when the individual response to 30 mg is insufficient and the patient has not experienced moderate or severe adverse reactions or prodromal symptoms suggestive of syncope.',
    dose:
      'May be increased from the mandatory 30 mg starting dose to a maximum recommended dose of 60 mg taken as needed approximately 1 to 3 hours prior to sexual activity with at least one full glass of water, maximum once every 24 hours. Maximum dose is restricted to 30 mg in patients taking moderate CYP3A4 inhibitors or known CYP2D6 poor metabolisers.',
    contraindications:
      'Hypersensitivity to dapoxetine or any excipient; significant pathological cardiac conditions (heart failure NYHA class II–IV, conduction abnormalities, significant ischaemic heart disease, significant valvular disease); history of syncope; history of mania or severe depression; concomitant treatment with MAOIs, thioridazine, SSRIs, SNRIs, tricyclic antidepressants, or other serotonergic medicinal/herbal products; concomitant treatment with potent CYP3A4 inhibitors; moderate and severe hepatic impairment.',
    adverseEffects:
      'Nausea, dizziness, headache, diarrhoea, insomnia, fatigue, anxiety, agitation, restlessness, decreased libido, somnolence, disturbance in attention, tremor, paraesthesia, blurred vision, tinnitus, flushing, sinus congestion, vomiting, constipation, abdominal pain, dyspepsia, flatulence, dry mouth, hyperhidrosis, erectile dysfunction, irritability, orthostatic hypotension, syncope.',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Andrology'],
    sources: [
      {
        title: 'UK EMC — Priligy 60 mg Film-Coated Tablets SmPC (Berlin-Chemie AG / Menarini Group)',
        url: 'https://www.medicines.org.uk/emc/product/1270/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Berlin-Chemie AG, Menarini Group). Each tablet contains 60 mg dapoxetine (as dapoxetine hydrochloride). Generic name normalized to INN base (Dapoxetine).',
  },
];

export const MENARINI_PRODUCTS: AiProductDraft[] = RAW_MENARINI.map((d) => ({
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

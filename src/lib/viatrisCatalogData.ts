import type { AiDraftSource, AiProductDraft } from './catalog';

const VTRS_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactViatrisDrug {
  brandName: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  drugClassNameEn: string;
  dosageForm: string;
  strength: string;
  route: string;
  packSize: string;
  indications: string;
  adultDosage: string;
  contraindications: string;
  sideEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

const VIATRIS_COMPACT_PRODUCTS: CompactViatrisDrug[] = [
  // =========================================================================
  // CARDIOVASCULAR & LIPID-LOWERING
  // =========================================================================
  {
    brandName: 'Lipitor 10 mg',
    genericName: 'Atorvastatin',
    drugClassNameEn: 'HMG-CoA Reductase Inhibitor (Statin)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Reduction of elevated total cholesterol, LDL-cholesterol, apolipoprotein B, and triglycerides in adults, adolescents, and children aged 10 years or older with primary hypercholesterolaemia or mixed dyslipidaemia; prevention of cardiovascular events in high-risk patients.',
    adultDosage:
      'Usual starting dose is 10 mg once daily; adjust at intervals of 4 weeks or more up to a maximum of 80 mg once daily according to LDL-C response.',
    contraindications:
      'Hypersensitivity to atorvastatin; active liver disease or unexplained persistent elevations of serum transaminases exceeding 3 times the upper limit of normal; pregnancy and breast-feeding; concomitant glecaprevir/pibrentasvir.',
    sideEffects:
      'Nasopharyngitis, hyperglycaemia, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, abnormal liver function tests, increased blood creatine phosphokinase.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology', 'General Practice / Family Medicine'],
    sourceTitle: 'Lipitor 10 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1059/smpc',
  },
  {
    brandName: 'Lipitor 20 mg',
    genericName: 'Atorvastatin',
    drugClassNameEn: 'HMG-CoA Reductase Inhibitor (Statin)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Primary hypercholesterolaemia, heterozygous and homozygous familial hypercholesterolaemia, combined (mixed) hyperlipidaemia, and primary or secondary prevention of cardiovascular events.',
    adultDosage:
      '20 mg once daily at any time of day, with or without food; titrate at intervals of 4 weeks or more up to 80 mg once daily.',
    contraindications:
      'Active liver disease or unexplained persistent transaminase elevation >3x ULN; pregnancy; lactation; hypersensitivity to any component.',
    sideEffects:
      'Myalgia, arthralgia, dyspepsia, diarrhoea, nausea, nasopharyngitis, elevated serum transaminases and creatine kinase.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology', 'General Practice / Family Medicine'],
    sourceTitle: 'Lipitor 20 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5237/smpc',
  },
  {
    brandName: 'Lipitor 40 mg',
    genericName: 'Atorvastatin',
    drugClassNameEn: 'HMG-CoA Reductase Inhibitor (Statin)',
    dosageForm: 'Film-coated tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Intensive lipid-lowering therapy in primary hypercholesterolaemia, familial hypercholesterolaemia, and secondary prevention of atherosclerotic cardiovascular disease.',
    adultDosage:
      '40 mg once daily orally with or without food; may be increased to a maximum of 80 mg once daily.',
    contraindications:
      'Active hepatic disease, unexplained persistent serum transaminase elevation >3x ULN, pregnancy, breast-feeding, hypersensitivity.',
    sideEffects:
      'Myalgia, muscle spasms, arthralgia, gastrointestinal discomfort, elevated hepatic transaminases, elevated CPK, rare rhabdomyolysis.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Lipitor 40 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5238/smpc',
  },
  {
    brandName: 'Lipitor 80 mg',
    genericName: 'Atorvastatin',
    drugClassNameEn: 'HMG-CoA Reductase Inhibitor (Statin)',
    dosageForm: 'Film-coated tablet',
    strength: '80 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'High-intensity statin therapy in adults with acute coronary syndromes, established atherosclerotic cardiovascular disease, or homozygous/heterozygous familial hypercholesterolaemia.',
    adultDosage:
      '80 mg once daily orally with or without food (maximum recommended daily dose).',
    contraindications:
      'Active liver disease, unexplained persistent serum transaminase elevation >3x ULN, pregnancy, breast-feeding, hypersensitivity.',
    sideEffects:
      'Myalgia, arthralgia, diarrhoea, nausea, hepatic transaminase elevation, creatine kinase elevation, rare myopathy or rhabdomyolysis.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Lipitor 80 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5239/smpc',
  },
  {
    brandName: 'Norvasc 5 mg',
    genericName: 'Amlodipine',
    drugClassNameEn: 'Dihydropyridine Calcium Channel Blocker',
    dosageForm: 'Tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Essential hypertension; chronic stable angina pectoris; vasospastic (Prinzmetal) angina.',
    adultDosage:
      'Usual initial dose is 5 mg once daily; may be increased to a maximum of 10 mg once daily depending on individual response.',
    contraindications:
      'Hypersensitivity to dihydropyridine derivatives or amlodipine; severe hypotension; shock (including cardiogenic shock); left ventricular outflow tract obstruction (high-grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    sideEffects:
      'Peripheral oedema, flushing, headache, dizziness, somnolence, palpitations, abdominal pain, nausea, fatigue.',
    storageConditions:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Norvasc (amlodipine) — official prescribing information',
    sourceUrl: 'https://labeling.pfizer.com/ShowLabeling.aspx?id=1151',
  },
  {
    brandName: 'Norvasc 10 mg',
    genericName: 'Amlodipine',
    drugClassNameEn: 'Dihydropyridine Calcium Channel Blocker',
    dosageForm: 'Tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Essential hypertension; chronic stable angina pectoris; vasospastic (Prinzmetal) angina requiring maximum calcium channel blockade.',
    adultDosage:
      '10 mg once daily orally (maximum recommended daily dose).',
    contraindications:
      'Severe hypotension, cardiogenic shock, severe aortic stenosis, unstable heart failure after acute MI, hypersensitivity to dihydropyridines.',
    sideEffects:
      'Ankle and peripheral oedema, flushing, headache, dizziness, palpitations, fatigue, nausea.',
    storageConditions:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Norvasc (amlodipine) — official prescribing information',
    sourceUrl: 'https://labeling.pfizer.com/ShowLabeling.aspx?id=1151',
  },
  {
    brandName: 'Caduet 5 mg / 10 mg',
    genericName: 'Amlodipine + Atorvastatin',
    drugClassNameEn: 'Calcium Channel Blocker & Statin Fixed-Dose Combination',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Prevention of cardiovascular events in hypertensive patients with three concomitant cardiovascular risk factors, normal to mildly elevated cholesterol levels, without clinically evident coronary heart disease, and in patients with hypertension and dyslipidaemia where both amlodipine and atorvastatin are appropriate.',
    adultDosage:
      'One 5 mg / 10 mg tablet once daily at any time of the day, with or without food.',
    contraindications:
      'Hypersensitivity to dihydropyridines, amlodipine, or atorvastatin; active liver disease or unexplained persistent elevations of serum transaminases >3x ULN; pregnancy and breast-feeding; severe hypotension; shock; unstable heart failure after acute MI.',
    sideEffects:
      'Peripheral oedema, headache, dizziness, somnolence, myalgia, arthralgia, nasopharyngitis, dyspepsia, diarrhoea, nausea, elevated hepatic transaminases.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Caduet — DailyMed (US NLM) label search',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Caduet',
  },
  {
    brandName: 'Caduet 10 mg / 20 mg',
    genericName: 'Amlodipine + Atorvastatin',
    drugClassNameEn: 'Calcium Channel Blocker & Statin Fixed-Dose Combination',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 20 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Co-existing essential hypertension (or angina) and hypercholesterolaemia/mixed dyslipidaemia in adults stabilized on or requiring amlodipine 10 mg and atorvastatin 20 mg.',
    adultDosage:
      'One 10 mg / 20 mg tablet once daily orally, with or without food.',
    contraindications:
      'Active liver disease, persistent transaminase elevation >3x ULN, pregnancy, lactation, severe hypotension, cardiogenic shock, hypersensitivity to dihydropyridines or statins.',
    sideEffects:
      'Peripheral oedema, flushing, palpitations, myalgia, arthralgia, headache, gastrointestinal upset, hepatic enzyme elevations.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Caduet — DailyMed (US NLM) label search',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Caduet',
  },
  {
    brandName: 'Lopid 600 mg',
    genericName: 'Gemfibrozil',
    drugClassNameEn: 'Fibric Acid Derivative (Fibrate)',
    dosageForm: 'Film-coated tablet',
    strength: '600 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Severe hypertriglyceridaemia with or without low HDL cholesterol; mixed hyperlipidaemia when a statin is contraindicated or not tolerated; primary hypercholesterolaemia when a statin is contraindicated or not tolerated; reduction of cardiovascular morbidity in men with elevated non-HDL cholesterol at high risk of a first cardiovascular event when a statin is contraindicated or not tolerated.',
    adultDosage:
      '1200 mg daily given as one 600 mg tablet twice daily, taken 30 minutes before morning and evening meals.',
    contraindications:
      'Hepatic dysfunction; severe renal dysfunction; pre-existing gallbladder disease or cholelithiasis; concomitant repaglinide, dasabuvir, selexipag, or simvastatin; history of photoallergy or phototoxic reaction during fibrate treatment.',
    sideEffects:
      'Vertigo, headache, dyspepsia, abdominal pain, diarrhoea, flatulence, nausea, vomiting, constipation, eczema, rash, fatigue, cholelithiasis, myopathy.',
    storageConditions:
      'Store below 25°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Lopid 600 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2261/smpc',
  },

  // =========================================================================
  // UROLOGY & CARDIOVASCULAR ALPHA-BLOCKER
  // =========================================================================
  {
    brandName: 'Cardura XL 4 mg',
    genericName: 'Doxazosin',
    drugClassNameEn: 'Selective Alpha-1 Adrenergic Receptor Blocker',
    dosageForm: 'Prolonged-release tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    indications:
      'Essential hypertension; symptomatic treatment of urinary outflow obstruction and lower urinary tract symptoms associated with benign prostatic hyperplasia (BPH).',
    adultDosage:
      '4 mg once daily; if needed, may be increased after 4 weeks to a maximum of 8 mg once daily. Swallow whole with liquid; do not chew, divide, or crush.',
    contraindications:
      'Hypersensitivity to quinazolines or doxazosin; history of orthostatic hypotension; BPH with concomitant upper urinary tract congestion, chronic urinary tract infection, or bladder stones; history of gastrointestinal or oesophageal obstruction; hypotension (in BPH patients).',
    sideEffects:
      'Dizziness, headache, postural hypotension, palpitations, tachycardia, Somnolence, rhinitis, abdominal pain, dyspepsia, dry mouth, nausea, asthenia, peripheral oedema, intraoperative floppy iris syndrome (IFIS).',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Cardiology', 'Internal Medicine'],
    sourceTitle: 'Cardura XL 4 mg prolonged-release tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1310/smpc',
  },
  {
    brandName: 'Viagra 50 mg',
    genericName: 'Sildenafil',
    drugClassNameEn: 'Phosphodiesterase Type 5 (PDE5) Inhibitor',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '4 film-coated tablets',
    indications:
      'Treatment of adult men with erectile dysfunction, which is the inability to achieve or maintain a penile erection sufficient for satisfactory sexual performance (sexual stimulation is required).',
    adultDosage:
      'Recommended starting dose is 50 mg taken as needed approximately 1 hour before sexual activity; may be adjusted to 25 mg or 100 mg depending on efficacy and tolerability. Maximum dosing frequency is once per day.',
    contraindications:
      'Co-administration with nitric oxide donors (such as amyl nitrite) or nitrates in any form; co-administration with guanylate cyclase stimulators such as riociguat; severe cardiovascular disorders (unstable angina, severe cardiac failure); loss of vision in one eye due to non-arteritic anterior ischaemic optic neuropathy (NAION); severe hepatic impairment; hypotension (BP <90/50 mmHg); recent stroke or myocardial infarction.',
    sideEffects:
      'Headache, flushing, dyspepsia, nasal congestion, dizziness, visual colour tinge, blurred vision, cyanopsia, palpitations, hot flush, nausea.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Viagra 50 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/7980/smpc',
  },
  {
    brandName: 'Viagra 100 mg',
    genericName: 'Sildenafil',
    drugClassNameEn: 'Phosphodiesterase Type 5 (PDE5) Inhibitor',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '4 film-coated tablets',
    indications:
      'Treatment of erectile dysfunction in adult men requiring the maximum recommended dose (sexual stimulation is required for efficacy).',
    adultDosage:
      '100 mg orally as needed approximately 1 hour prior to sexual activity (maximum recommended dose; maximum once daily).',
    contraindications:
      'Concomitant nitrates or nitric oxide donors; concomitant riociguat; severe hepatic impairment; hypotension (<90/50 mmHg); recent stroke or myocardial infarction; history of NAION; unstable angina.',
    sideEffects:
      'Headache, facial flushing, dyspepsia, nasal congestion, transient visual disturbances (cyanopsia, blurred vision), dizziness, palpitations.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Viagra 100 mg film-coated tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/7978/smpc',
  },

  // =========================================================================
  // NEUROLOGY & PAIN
  // =========================================================================
  {
    brandName: 'Lyrica 75 mg',
    genericName: 'Pregabalin',
    drugClassNameEn: 'Gabapentinoid Anticonvulsant & Neuropathic Pain Agent',
    dosageForm: 'Hard capsule',
    strength: '75 mg',
    route: 'Oral',
    packSize: '56 hard capsules',
    indications:
      'Peripheral and central neuropathic pain in adults; adjunctive therapy in adults with partial seizures with or without secondary generalisation; Generalised Anxiety Disorder (GAD) in adults.',
    adultDosage:
      '150 to 600 mg per day given in either two or three divided doses (typically starting at 75 mg twice daily and titrated after 3–7 days to 150 mg twice daily). Adjust dose in renal impairment.',
    contraindications:
      'Hypersensitivity to pregabalin or to any of the excipients.',
    sideEffects:
      'Dizziness, somnolence, headache, increased appetite, weight increased, euphoric mood, confusion, irritability, ataxia, abnormal coordination, tremor, dysarthria, blurred vision, diplopia, vertigo, dry mouth, constipation, peripheral oedema, fatigue.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Neurology', 'Psychiatry', 'Endocrinology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Lyrica (pregabalin) — EMA EPAR',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lyrica',
  },
  {
    brandName: 'Lyrica 150 mg',
    genericName: 'Pregabalin',
    drugClassNameEn: 'Gabapentinoid Anticonvulsant & Neuropathic Pain Agent',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '56 hard capsules',
    indications:
      'Peripheral and central neuropathic pain in adults; adjunctive therapy in adults with partial-onset seizures; Generalised Anxiety Disorder (GAD) in adults.',
    adultDosage:
      '150 mg twice daily (300 mg/day); based on individual response and tolerability, may be increased to a maximum of 300 mg twice daily (600 mg/day) after an additional 7-day interval.',
    contraindications:
      'Hypersensitivity to pregabalin or to any of the excipients.',
    sideEffects:
      'Dizziness, somnolence, weight gain, peripheral oedema, blurred vision, dry mouth, ataxia, tremor, fatigue.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Neurology', 'Psychiatry', 'Endocrinology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Lyrica 150 mg hard capsules — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/10306/smpc',
  },
  {
    brandName: 'Lyrica 300 mg',
    genericName: 'Pregabalin',
    drugClassNameEn: 'Gabapentinoid Anticonvulsant & Neuropathic Pain Agent',
    dosageForm: 'Hard capsule',
    strength: '300 mg',
    route: 'Oral',
    packSize: '56 hard capsules',
    indications:
      'Refractory peripheral and central neuropathic pain, adjunctive partial-onset epilepsy therapy, and Generalised Anxiety Disorder in adults requiring maximum maintenance dosing.',
    adultDosage:
      '300 mg twice daily (maximum daily dose 600 mg/day) in patients with normal renal function; discontinue gradually over a minimum of 1 week.',
    contraindications:
      'Hypersensitivity to pregabalin or any excipient.',
    sideEffects:
      'Dizziness, somnolence, ataxia, peripheral oedema, weight gain, blurred vision, diplopia, dry mouth, constipation, respiratory depression when co-administered with opioids.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Neurology', 'Psychiatry', 'Internal Medicine'],
    sourceTitle: 'Lyrica 300 mg hard capsules — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/10310/smpc',
  },
  {
    brandName: 'Dilantin 100 mg',
    genericName: 'Phenytoin',
    drugClassNameEn: 'Hydantoin Anticonvulsant',
    dosageForm: 'Hard capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '100 hard capsules',
    indications:
      'Control of generalized tonic-clonic (grand mal) and complex partial (psychomotor, temporal lobe) seizures; prevention and treatment of seizures occurring during or following neurosurgery.',
    adultDosage:
      'Treatment-naive adults: start with one 100 mg capsule three times daily, then individualize maintenance dose (typically 300–400 mg daily in divided doses) guided by therapeutic serum phenytoin monitoring (10–20 mcg/mL).',
    contraindications:
      'Hypersensitivity to phenytoin or other hydantoins; sinus bradycardia, sino-atrial block, second- and third-degree A-V block, Adams-Stokes syndrome; concomitant delavirdine.',
    sideEffects:
      'Nystagmus, ataxia, slurred speech, decreased coordination, mental confusion, dizziness, insomnia, gingival hyperplasia, hirsutism, coarsening of facial features, morbilliform rash, rare Stevens-Johnson syndrome/TEN, megaloblastic anaemia, osteomalacia.',
    storageConditions:
      'Store below 30°C in a tight, light-resistant container; protect from moisture.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Dilantin — DailyMed (US NLM) label search',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Dilantin',
  },

  // =========================================================================
  // PSYCHIATRY
  // =========================================================================
  {
    brandName: 'Zoloft 50 mg',
    genericName: 'Sertraline',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Major depressive episodes and prevention of recurrence; panic disorder with or without agoraphobia; obsessive-compulsive disorder (OCD) in adults and paediatric patients aged 6–17 years; social anxiety disorder; post-traumatic stress disorder (PTSD).',
    adultDosage:
      'Depression and OCD: start at 50 mg once daily. Panic disorder, PTSD, and social anxiety disorder: start at 25 mg once daily and increase to 50 mg once daily after 1 week. May titrate in 50 mg increments at intervals of at least 1 week up to a maximum of 200 mg/day.',
    contraindications:
      'Concomitant irreversible monoamine oxidase inhibitors (MAOIs) or within 14 days of stopping an MAOI; concomitant pimozide; hypersensitivity to sertraline.',
    sideEffects:
      'Insomnia, dizziness, somnolence, headache, diarrhoea, nausea, dry mouth, ejaculation failure, fatigue, tremor, hyperhidrosis, anxiety, decreased appetite.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Lustral (sertraline) 50 mg tablets — UK eMC SmPC (Zoloft outside the UK)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1070/smpc',
  },
  {
    brandName: 'Zoloft 100 mg',
    genericName: 'Sertraline',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Maintenance and higher-dose treatment of major depressive disorder, obsessive-compulsive disorder (OCD), panic disorder, social anxiety disorder, and post-traumatic stress disorder (PTSD).',
    adultDosage:
      '100 mg once daily, morning or evening, with or without food; maximum recommended dose is 200 mg once daily.',
    contraindications:
      'Concomitant irreversible MAOIs (Wait at least 14 days when switching); concomitant pimozide; hypersensitivity to sertraline.',
    sideEffects:
      'Nausea, diarrhoea, dyspepsia, insomnia, somnolence, dizziness, tremor, sexual dysfunction, increased sweating, QT prolongation at supratherapeutic doses.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Lustral (sertraline) 100 mg tablets — UK eMC SmPC (Zoloft outside the UK)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2835/smpc',
  },
  {
    brandName: 'Xanax 0.5 mg',
    genericName: 'Alprazolam',
    drugClassNameEn: 'Triazolobenzodiazepine Anxiolytic',
    dosageForm: 'Tablet',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Short-term symptomatic treatment of severe anxiety when the disorder is disabling or subjecting the individual to extreme distress; panic disorder with or without agoraphobia.',
    adultDosage:
      'Anxiety: 0.25 mg to 0.5 mg three times daily, adjusted to patient response up to a maximum of 4 mg daily in divided doses for the shortest possible duration (not exceeding 2–4 weeks including tapering).',
    contraindications:
      'Myasthenia gravis; severe respiratory insufficiency; sleep apnoea syndrome; severe hepatic insufficiency; hypersensitivity to benzodiazepines.',
    sideEffects:
      'Sedation, somnolence, ataxia, memory impairment, dysarthria, dizziness, headache, constipation, dry mouth, fatigue, irritability, physical and psychological dependence, withdrawal phenomena on abrupt discontinuation.',
    storageConditions:
      'Store below 25°C; protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Xanax 500 microgram tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1656/smpc',
  },
  {
    brandName: 'Xanax XR 1 mg',
    genericName: 'Alprazolam',
    drugClassNameEn: 'Triazolobenzodiazepine Anxiolytic (Extended-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    indications:
      'Treatment of panic disorder, with or without agoraphobia, and severe anxiety states where sustained once-daily release is indicated.',
    adultDosage:
      'Initially 0.5 mg to 1 mg once daily (preferably in the morning), titrated every 3–4 days by at most 1 mg/day according to response. Swallow whole; do not chew, crush, or break. Taper gradually when discontinuing.',
    contraindications:
      'Hypersensitivity to alprazolam or benzodiazepines; myasthenia gravis; severe respiratory insufficiency; sleep apnoea syndrome; severe hepatic impairment; concomitant potent CYP3A4 azole antifungals (ketoconazole, itraconazole).',
    sideEffects:
      'Sedation, somnolence, memory impairment, ataxia, dysarthria, dizziness, fatigue, depression, dependence and withdrawal syndrome on rapid taper, respiratory depression with opioids.',
    storageConditions:
      'Store below 25°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Xanax XR — DailyMed (US NLM) label search',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Xanax+XR',
  },
  {
    brandName: 'Effexor XR 75 mg',
    genericName: 'Venlafaxine',
    drugClassNameEn: 'Serotonin-Norepinephrine Reuptake Inhibitor (SNRI)',
    dosageForm: 'Prolonged-release hard capsule',
    strength: '75 mg',
    route: 'Oral',
    packSize: '28 prolonged-release capsules',
    indications:
      'Treatment and prevention of recurrence of major depressive episodes; Generalised Anxiety Disorder (GAD); Social Anxiety Disorder; Panic Disorder with or without agoraphobia.',
    adultDosage:
      'Usual starting dose for depression, GAD, and social anxiety disorder is 75 mg once daily taken with food at approximately the same time each day; may be titrated at intervals of 2 weeks or more up to 225 mg/day (or up to 375 mg/day in severe depression). Swallow whole.',
    contraindications:
      'Concomitant irreversible monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuing an MAOI (and allow at least 7 days after stopping venlafaxine before starting an MAOI); hypersensitivity to venlafaxine.',
    sideEffects:
      'Nausea, dry mouth, headache, sweating (including night sweats), insomnia, dizziness, somnolence, tremor, constipation, hypertension, palpitations, decreased appetite, sexual dysfunction, discontinuation syndrome if stopped abruptly.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Efexor XL 75 mg prolonged-release capsules — UK eMC SmPC (Effexor XR outside the UK)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5474/smpc',
  },
  {
    brandName: 'Effexor XR 150 mg',
    genericName: 'Venlafaxine',
    drugClassNameEn: 'Serotonin-Norepinephrine Reuptake Inhibitor (SNRI)',
    dosageForm: 'Prolonged-release hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '28 prolonged-release capsules',
    indications:
      'Major depressive disorder (including prevention of relapse/recurrence), Generalised Anxiety Disorder, Social Anxiety Disorder, and Panic Disorder in adults requiring higher-strength once-daily maintenance therapy.',
    adultDosage:
      '150 mg once daily orally with food at approximately the same time each day; maximum dose 225 mg/day for anxiety disorders and 375 mg/day for severe depression. Taper gradually when discontinuing.',
    contraindications:
      'Concomitant irreversible MAOIs (within 14 days); hypersensitivity to venlafaxine.',
    sideEffects:
      'Nausea, hyperhidrosis, dry mouth, dose-related blood pressure elevation, insomnia, dizziness, tremor, constipation, anorgasmia/ejaculation disorder, withdrawal symptoms upon abrupt cessation.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Efexor XL 150 mg prolonged-release capsules — UK eMC SmPC (Effexor XR outside the UK)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1219/smpc',
  },

  // =========================================================================
  // RHEUMATOLOGY, ORTHOPEDICS & ANTI-INFLAMMATORY
  // =========================================================================
  {
    brandName: 'Celebrex 100 mg',
    genericName: 'Celecoxib',
    drugClassNameEn: 'Selective Cyclooxygenase-2 (COX-2) Inhibitor (NSAID)',
    dosageForm: 'Hard capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '20 hard capsules',
    indications:
      'Symptomatic relief in the treatment of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis in adults.',
    adultDosage:
      'Osteoarthritis: 200 mg once daily or 100 mg twice daily. Rheumatoid arthritis: 100 mg twice daily, increased if needed to 200 mg twice daily. Use the lowest effective dose for the shortest possible duration.',
    contraindications:
      'Known sulfonamide hypersensitivity; active peptic ulceration or GI bleeding; history of asthma, acute rhinitis, or urticaria after aspirin/NSAIDs; pregnancy and women of childbearing potential not using effective contraception; severe hepatic dysfunction; CrCl <30 mL/min; inflammatory bowel disease; congestive heart failure (NYHA II–IV), established ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease.',
    sideEffects:
      'Hypertension, sinusitis, upper respiratory tract infection, dizziness, insomnia, abdominal pain, diarrhoea, dyspepsia, flatulence, peripheral oedema, rash, increased risk of serious cardiovascular thrombotic events and GI ulceration.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Celebrex 100 mg capsules — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5533/smpc',
  },
  {
    brandName: 'Celebrex 200 mg',
    genericName: 'Celecoxib',
    drugClassNameEn: 'Selective Cyclooxygenase-2 (COX-2) Inhibitor (NSAID)',
    dosageForm: 'Hard capsule',
    strength: '200 mg',
    route: 'Oral',
    packSize: '20 hard capsules',
    indications:
      'Symptomatic relief in the treatment of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis in adults.',
    adultDosage:
      'Osteoarthritis and ankylosing spondylitis: 200 mg once daily (up to 400 mg daily if required). Rheumatoid arthritis: 200 mg twice daily if needed. Maximum recommended daily dose is 400 mg for all indications.',
    contraindications:
      'Sulfonamide allergy; active GI ulceration or bleeding; NSAID-induced asthma/urticaria; pregnancy and breast-feeding; severe hepatic or renal impairment; NYHA II–IV heart failure, established ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease.',
    sideEffects:
      'Hypertension, peripheral oedema, dyspepsia, abdominal pain, diarrhoea, dizziness, upper respiratory infection, cardiovascular thrombotic events, gastrointestinal bleeding.',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Celebrex 200 mg capsules — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2945/smpc',
  },
  {
    brandName: 'Medrol 4 mg',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Systemic Glucocorticoid (Corticosteroid)',
    dosageForm: 'Tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Endocrine disorders (adrenal insufficiency), rheumatic and collagen diseases (rheumatoid arthritis, systemic lupus erythematosus), dermatologic, allergic, respiratory, haematologic, neoplastic, nervous system (acute exacerbations of multiple sclerosis), and gastrointestinal (ulcerative colitis, Crohn disease) conditions responsive to systemic corticosteroid therapy.',
    adultDosage:
      'Initial dosage varies from 4 mg to 48 mg of methylprednisolone per day depending on the specific disease entity being treated; titrate to the lowest effective maintenance dose and taper gradually after prolonged therapy.',
    contraindications:
      'Systemic fungal infections; known hypersensitivity to methylprednisolone; administration of live or live-attenuated vaccines in patients receiving immunosuppressive doses of corticosteroids.',
    sideEffects:
      'Fluid and sodium retention, hypertension, hyperglycaemia, Cushingoid state, HPA axis suppression, peptic ulceration, osteoporosis, myopathy, cataracts, increased intraocular pressure, mood changes, insomnia, increased susceptibility to infection.',
    storageConditions:
      'Store below 25°C; protect from light.',
    specialties: ['Rheumatology', 'Internal Medicine', 'Pulmonology', 'Dermatology', 'Neurology', 'Endocrinology'],
    sourceTitle: 'Medrol 4 mg / 16 mg tablets — SAHPRA approved professional information',
    sourceUrl: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2024/02/Medrol-4mg_16mg-tablets-Approved-PI-26-January-2024.pdf',
  },
  {
    brandName: 'Medrol 16 mg',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Systemic Glucocorticoid (Corticosteroid)',
    dosageForm: 'Tablet',
    strength: '16 mg',
    route: 'Oral',
    packSize: '50 tablets',
    indications:
      'Moderate-to-high dose systemic glucocorticoid therapy in severe autoimmune, rheumatic, respiratory, haematologic, neurological, and inflammatory bowel disorders.',
    adultDosage:
      'Individualized according to disease severity (16 mg to 64 mg or higher daily in divided or single morning doses); taper gradually to the lowest effective maintenance dose.',
    contraindications:
      'Untreated systemic fungal infections; live or live-attenuated vaccines during immunosuppressive corticosteroid dosing; hypersensitivity to methylprednisolone.',
    sideEffects:
      'Hyperglycaemia, adrenal suppression, Cushingoid features, hypertension, hypokalaemia, osteoporosis, avascular osteonecrosis, peptic ulceration, psychiatric disturbances, opportunistic infections.',
    storageConditions:
      'Store below 25°C; protect from light.',
    specialties: ['Rheumatology', 'Internal Medicine', 'Pulmonology', 'Neurology', 'Oncology'],
    sourceTitle: 'Medrol 4 mg / 16 mg tablets — SAHPRA approved professional information',
    sourceUrl: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2024/02/Medrol-4mg_16mg-tablets-Approved-PI-26-January-2024.pdf',
  },
  {
    brandName: 'Ponstan Forte 500 mg',
    genericName: 'Mefenamic acid',
    drugClassNameEn: 'Fenamate Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets',
    indications:
      'Acute mild to moderate pain including muscular, traumatic, and dental pain, headache, postoperative and postpartum pain; primary dysmenorrhoea and menorrhagia due to dysfunctional causes; symptomatic relief in rheumatoid arthritis and osteoarthritis.',
    adultDosage:
      '500 mg three times daily taken preferably with or immediately after food, for the shortest duration necessary (do not exceed 7 days in acute pain or dysmenorrhoea).',
    contraindications:
      'Active or history of recurrent peptic ulcer/haemorrhage; inflammatory bowel disease; history of GI bleeding or perforation related to previous NSAID therapy; severe heart, hepatic, or renal failure; last trimester of pregnancy; NSAID-induced asthma, rhinitis, or urticaria.',
    sideEffects:
      'Diarrhoea (discontinue immediately if persistent diarrhoea occurs), abdominal pain, nausea, dyspepsia, GI ulceration/bleeding, dizziness, drowsiness, headache, skin rash, haemolytic anaemia, nephrotoxicity.',
    storageConditions:
      'Store below 30°C in a dry place.',
    specialties: ['Obstetrics & Gynecology', 'Orthopedics', 'Rheumatology', 'General Practice / Family Medicine'],
    sourceTitle: 'Ponstan Forte 500 mg tablets — UK eMC SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1732/smpc',
  },
  {
    brandName: 'Feldene 20 mg',
    genericName: 'Piroxicam',
    drugClassNameEn: 'Oxicam Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    dosageForm: 'Hard capsule',
    strength: '20 mg',
    route: 'Oral',
    packSize: '30 hard capsules',
    indications:
      'Symptomatic relief of osteoarthritis, rheumatoid arthritis, or ankylosing spondylitis when other non-steroidal anti-inflammatory drugs have been insufficient (treatment should be initiated by a physician experienced in inflammatory or degenerative rheumatic diseases).',
    adultDosage:
      'Maximum recommended daily dose is 20 mg administered as one single daily dose taken with food; review treatment benefit and tolerability within 14 days.',
    contraindications:
      'History of gastro-intestinal ulceration, bleeding, or perforation; active peptic ulcer, inflammatory GI disorders, or GI bleeding; history of severe allergic drug reaction or severe skin reactions (SJS, TEN); concomitant use with other NSAIDs or anticoagulants; severe heart, hepatic, or renal failure; third trimester of pregnancy.',
    sideEffects:
      'Gastrointestinal ulceration, perforation, and bleeding, stomatitis, anorexia, epigastric distress, nausea, constipation, diarrhoea, oedema, hypertension, dizziness, headache, pruritus, rash, rare severe cutaneous adverse reactions (SJS/TEN).',
    storageConditions:
      'Store below 30°C.',
    specialties: ['Rheumatology', 'Orthopedics'],
    sourceTitle: 'Feldene (piroxicam) — UK eMC search',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Feldene',
  },
];

function toViatrisProductDraft(item: CompactViatrisDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.genericName.split(' + ').map((s) => s.trim()),
    drugClass: item.drugClassNameEn,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.indications,
      usualAdultDose: item.adultDosage,
      contraindications: item.contraindications,
      commonAdverseEffects: item.sideEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: VTRS_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Viatris Inc. regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

export const VIATRIS_PRODUCTS: AiProductDraft[] = VIATRIS_COMPACT_PRODUCTS.map(
  toViatrisProductDraft
);

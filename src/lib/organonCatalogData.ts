import type { AiDraftSource, AiProductDraft } from './catalog';

const OGN_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactOrganonDrug {
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

const ORGANON_COMPACT_PRODUCTS: CompactOrganonDrug[] = [
  // =========================================================================
  // CARDIOVASCULAR & LIPID-MODIFYING
  // =========================================================================
  {
    brandName: 'Cozaar 50 mg',
    genericName: 'Losartan potassium',
    drugClassNameEn: 'Angiotensin II Receptor Blocker (ARB)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents aged 6–18 years; renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >=0.5 g/day; chronic heart failure in adult patients when ACE inhibitors are unsuitable; reduction in the risk of stroke in adult hypertensive patients with left ventricular hypertrophy documented by ECG.',
    adultDosage:
      'Usual starting and maintenance dose is 50 mg once daily in most patients; may be increased to 100 mg once daily based on blood pressure response.',
    contraindications:
      'Hypersensitivity to losartan or any excipient; second and third trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    sideEffects:
      'Dizziness, vertigo, hypotension, orthostatic hypotension, hyperkalaemia, asthenia, fatigue, renal impairment, hypoglycaemia (in diabetic patients), anaemia.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology', 'General Practice / Family Medicine'],
    sourceTitle: 'Cozaar 50 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Cozaar',
  },
  {
    brandName: 'Cozaar 100 mg',
    genericName: 'Losartan potassium',
    drugClassNameEn: 'Angiotensin II Receptor Blocker (ARB)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Essential hypertension requiring maximum ARB dosing; diabetic nephropathy with hypertension and proteinuria >=0.5 g/day; stroke risk reduction in hypertensive patients with ECG-documented left ventricular hypertrophy; chronic heart failure maintenance.',
    adultDosage:
      '100 mg once daily orally with or without food (maximum recommended daily dose).',
    contraindications:
      'Second and third trimesters of pregnancy; severe hepatic impairment; concomitant aliskiren in diabetes or renal impairment (GFR <60 mL/min/1.73 m²); hypersensitivity to losartan.',
    sideEffects:
      'Dizziness, vertigo, hypotension, hyperkalaemia, elevated serum creatinine and urea, asthenia, fatigue.',
    storageConditions:
      'Store in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Endocrinology'],
    sourceTitle: 'Cozaar 100 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Cozaar',
  },
  {
    brandName: 'Hyzaar 50 mg / 12.5 mg',
    genericName: 'Losartan potassium + Hydrochlorothiazide',
    drugClassNameEn: 'Angiotensin II Receptor Blocker & Thiazide Diuretic Combination',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 12.5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on losartan or hydrochlorothiazide alone.',
    adultDosage:
      'Usual maintenance dose is one 50 mg / 12.5 mg tablet once daily; if blood pressure remains inadequately controlled, may be increased to at most two 50 mg / 12.5 mg tablets (or one 100 mg / 25 mg tablet) once daily.',
    contraindications:
      'Hypersensitivity to losartan, sulfonamide derivatives (hydrochlorothiazide), or any excipient; therapy-resistant hypokalaemia or hypercalcaemia; severe hepatic impairment, cholestasis, and biliary obstructive disorders; refractory hyponatraemia; symptomatic hyperuricaemia/gout; second and third trimesters of pregnancy; severe renal impairment (CrCl <30 mL/min); anuria; concomitant aliskiren in diabetes or renal impairment.',
    sideEffects:
      'Dizziness, headache, cough, abdominal pain, nausea, diarrhoea, dyspepsia, asthenia, fatigue, electrolyte imbalances (hypokalaemia, hyponatraemia), hyperuricaemia, hyperglycaemia, photosensitivity reactions (including non-melanoma skin cancer risk with cumulative HCTZ exposure).',
    storageConditions:
      'Do not store above 30°C. Store in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Cozaar-Comp / Hyzaar 50 mg / 12.5 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Cozaar-Comp',
  },
  {
    brandName: 'Ezetrol 10 mg',
    genericName: 'Ezetimibe',
    drugClassNameEn: 'Cholesterol Absorption Inhibitor',
    dosageForm: 'Tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Adjunctive therapy to diet in primary (heterozygous familial and non-familial) hypercholesterolaemia (co-administered with a statin or as monotherapy when a statin is inappropriate or not tolerated); prevention of cardiovascular events in patients with coronary heart disease and a history of acute coronary syndrome when added to ongoing statin therapy; homozygous familial hypercholesterolaemia (with a statin); homozygous sitosterolaemia.',
    adultDosage:
      '10 mg once daily at any time of the day, with or without food. When added to a bile acid sequestrant, administer either >=2 hours before or >=4 hours after the bile acid sequestrant.',
    contraindications:
      'Hypersensitivity to ezetimibe or any excipient; when co-administered with a statin: pregnancy and lactation, and active liver disease or unexplained persistent elevations in serum transaminases.',
    sideEffects:
      'Monotherapy: abdominal pain, diarrhoea, flatulence, fatigue. Co-administered with a statin: headache, myalgia, increased ALT and/or AST.',
    storageConditions:
      'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Ezetrol 10 mg Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Ezetrol',
  },
  {
    brandName: 'Atozet 10 mg / 20 mg',
    genericName: 'Ezetimibe + Atorvastatin',
    drugClassNameEn: 'Cholesterol Absorption Inhibitor & Statin Fixed-Dose Combination',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg / 20 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Prevention of cardiovascular events in patients with coronary heart disease and a history of acute coronary syndrome; adjunctive therapy to diet in adults with primary (heterozygous familial and non-familial) hypercholesterolaemia or mixed hyperlipidaemia not appropriately controlled with a statin alone or already treated with a statin and ezetimibe; homozygous familial hypercholesterolaemia.',
    adultDosage:
      'One tablet once daily at any time of the day, with or without food (dose range 10/10 mg to 10/80 mg once daily according to LDL-C target).',
    contraindications:
      'Hypersensitivity to ezetimibe or atorvastatin; active liver disease or unexplained persistent elevations in serum transaminases >3x ULN; pregnancy and breast-feeding, and women of childbearing potential not using appropriate contraceptive measures; concomitant glecaprevir/pibrentasvir.',
    sideEffects:
      'Diarrhoea, myalgia, arthralgia, muscle spasms, dyspepsia, nausea, flatulence, headache, increased hepatic transaminases and blood creatine phosphokinase.',
    storageConditions:
      'Store in the original package in order to protect from oxygen.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Atozet Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Atozet',
  },
  {
    brandName: 'Zocor 20 mg',
    genericName: 'Simvastatin',
    drugClassNameEn: 'HMG-CoA Reductase Inhibitor (Statin)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of primary hypercholesterolaemia or mixed dyslipidaemia as an adjunct to diet; homozygous familial hypercholesterolaemia; reduction of cardiovascular mortality and morbidity in patients with manifest atherosclerotic cardiovascular disease or diabetes mellitus.',
    adultDosage:
      'Usual starting dose is 10–20 mg/day (or 20–40 mg/day in high cardiovascular risk) taken as a single dose in the evening; adjust at intervals of not less than 4 weeks.',
    contraindications:
      'Hypersensitivity to simvastatin; active liver disease or unexplained persistent elevations of serum transaminases; pregnancy and lactation; concomitant potent CYP3A4 inhibitors (itraconazole, ketoconazole, posaconazole, voriconazole, HIV protease inhibitors, boceprevir, telaprevir, erythromycin, clarithromycin, telithromycin, nefazodone, cobicistat); concomitant gemfibrozil, ciclosporin, or danazol.',
    sideEffects:
      'Myalgia, arthralgia, muscle cramps, constipation, abdominal pain, flatulence, dyspepsia, diarrhoea, nausea, headache, dizziness, elevated serum transaminases and CK, rare myopathy/rhabdomyolysis.',
    storageConditions:
      'Do not store above 25°C. Store in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Zocor Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Zocor',
  },

  // =========================================================================
  // RESPIRATORY & ALLERGY
  // =========================================================================
  {
    brandName: 'Singulair 10 mg',
    genericName: 'Montelukast',
    drugClassNameEn: 'Leukotriene Receptor Antagonist (LTRA)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Add-on treatment of asthma in patients aged 15 years and older with mild to moderate persistent asthma inadequately controlled on inhaled corticosteroids and in whom as-needed short-acting beta-agonists provide inadequate clinical control; symptomatic relief of seasonal allergic rhinitis in asthmatic patients; prophylaxis of exercise-induced bronchoconstriction.',
    adultDosage:
      'Adults and adolescents aged 15 years and older: one 10 mg film-coated tablet daily to be taken in the evening, with or without food.',
    contraindications:
      'Hypersensitivity to montelukast or any of the excipients.',
    sideEffects:
      'Upper respiratory infection, headache, abdominal pain, diarrhoea, nausea, vomiting, rash, pyrexia, elevated serum transaminases, neuropsychiatric events (abnormal dreams, nightmares, insomnia, anxiety, agitation, depression, suicidal ideation/behaviour — discontinue if neuropsychiatric symptoms occur).',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Pulmonology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Singulair 10 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Singulair',
  },
  {
    brandName: 'Singulair Paediatric 5 mg',
    genericName: 'Montelukast',
    drugClassNameEn: 'Leukotriene Receptor Antagonist (LTRA)',
    dosageForm: 'Chewable tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '28 chewable tablets',
    indications:
      'Add-on treatment of mild to moderate persistent asthma in paediatric patients aged 6 to 14 years; alternative treatment option to low-dose inhaled corticosteroids for patients aged 6 to 14 years with mild persistent asthma without recent serious asthma attacks; prophylaxis of exercise-induced bronchoconstriction.',
    adultDosage:
      'Paediatric patients aged 6 to 14 years: one 5 mg chewable tablet daily to be taken in the evening (if taken in connection with food, take 1 hour before or 2 hours after food).',
    contraindications:
      'Hypersensitivity to montelukast or any excipient (contains aspartame, a source of phenylalanine).',
    sideEffects:
      'Headache, abdominal pain, thirst, upper respiratory infection, rash, neuropsychiatric events (sleep disturbances, nightmares, irritability, anxiety, behavioural changes).',
    storageConditions:
      'Store in the original package to protect from light and moisture.',
    specialties: ['Pediatrics', 'Pulmonology', 'General Practice / Family Medicine'],
    sourceTitle: 'Singulair Paediatric 5 mg Chewable Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Singulair',
  },
  {
    brandName: 'Singulair Paediatric 4 mg',
    genericName: 'Montelukast',
    drugClassNameEn: 'Leukotriene Receptor Antagonist (LTRA)',
    dosageForm: 'Chewable tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '28 chewable tablets',
    indications:
      'Add-on treatment of mild to moderate persistent asthma in paediatric patients aged 2 to 5 years; alternative to low-dose inhaled corticosteroids in children aged 2 to 5 years with mild persistent asthma; prophylaxis of exercise-induced bronchoconstriction from 2 years of age.',
    adultDosage:
      'Paediatric patients aged 2 to 5 years: one 4 mg chewable tablet daily to be taken in the evening (1 hour before or 2 hours after food).',
    contraindications:
      'Hypersensitivity to montelukast or any excipient (contains aspartame).',
    sideEffects:
      'Abdominal pain, thirst, headache, diarrhoea, hyperactivity, sleep disturbances, nightmares, irritability, rash.',
    storageConditions:
      'Store in the original package to protect from light and moisture.',
    specialties: ['Pediatrics', 'Pulmonology'],
    sourceTitle: 'Singulair Paediatric 4 mg Chewable Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Singulair',
  },
  {
    brandName: 'Nasonex 50 mcg/actuation',
    genericName: 'Mometasone furoate',
    drugClassNameEn: 'Intranasal Corticosteroid',
    dosageForm: 'Nasal spray, suspension',
    strength: '50 mcg/actuation',
    route: 'Intranasal',
    packSize: '1 bottle (140 actuations)',
    indications:
      'Symptomatic treatment of seasonal allergic or perennial rhinitis in adults and children aged 3 years and older; treatment of nasal polyps in adults aged 18 years and older.',
    adultDosage:
      'Allergic rhinitis (adults and adolescents >=12 years): two actuations (50 mcg/actuation) in each nostril once daily (total dose 200 mcg), reduced to 1 actuation per nostril once controlled. Children 3–11 years: 1 actuation in each nostril once daily. Nasal polyps (adults): 2 actuations in each nostril once daily, increased to twice daily if needed.',
    contraindications:
      'Hypersensitivity to mometasone furoate or any excipient; untreated localized infection involving the nasal mucosa (such as herpes simplex); recent nasal surgery or trauma until healing has occurred.',
    sideEffects:
      'Epistaxis, pharyngitis, nasal burning, nasal irritation, nasal ulceration, headache, sneezing, upper respiratory tract infection.',
    storageConditions:
      'Do not store above 25°C. Do not freeze. Use within 2 months of first use.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Nasonex 50 micrograms/actuation Nasal Spray — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Nasonex',
  },

  // =========================================================================
  // BONE, RHEUMATOLOGY & ORTHOPEDICS
  // =========================================================================
  {
    brandName: 'Fosamax Once Weekly 70 mg',
    genericName: 'Alendronic acid',
    drugClassNameEn: 'Bisphosphonate Bone Resorption Inhibitor',
    dosageForm: 'Tablet',
    strength: '70 mg',
    route: 'Oral',
    packSize: '4 tablets',
    indications:
      'Treatment of postmenopausal osteoporosis in women to reduce the risk of vertebral and hip fractures.',
    adultDosage:
      'One 70 mg tablet once weekly. Must be taken at least 30 minutes before the first food, beverage, or medicinal product of the day with a full glass of plain water only, and the patient must remain upright (sitting, standing, or walking) for at least 30 minutes and until after the first food of the day. Swallow whole; do not crush or chew.',
    contraindications:
      'Abnormalities of the oesophagus and other factors which delay oesophageal emptying (stricture or achalasia); inability to stand or sit upright for at least 30 minutes; hypocalcaemia; hypersensitivity to alendronate; severe renal impairment (GFR <35 mL/min).',
    sideEffects:
      'Musculoskeletal (bone, muscle, or joint) pain, abdominal pain, dyspepsia, constipation, diarrhoea, flatulence, oesophageal ulcer, dysphagia, abdominal distension, acid regurgitation, headache, dizziness, alopecia, rare osteonecrosis of the jaw and atypical femoral fractures.',
    storageConditions:
      'This medicinal product does not require any special storage conditions; keep in original blister until use.',
    specialties: ['Endocrinology', 'Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'Fosamax Once Weekly 70 mg Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fosamax',
  },
  {
    brandName: 'Arcoxia 60 mg',
    genericName: 'Etoricoxib',
    drugClassNameEn: 'Selective Cyclooxygenase-2 (COX-2) Inhibitor (NSAID)',
    dosageForm: 'Film-coated tablet',
    strength: '60 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Symptomatic relief of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis in adults and adolescents aged 16 years and older.',
    adultDosage:
      'Osteoarthritis: 30 mg once daily, increased to a maximum of 60 mg once daily if symptom relief is insufficient. Rheumatoid arthritis and ankylosing spondylitis: 60 mg once daily, increased up to 90 mg once daily if required. Use the lowest effective dose for the shortest possible duration.',
    contraindications:
      'Hypersensitivity to etoricoxib; active peptic ulceration or active GI bleeding; history of bronchospasm, acute rhinitis, nasal polyps, angioneurotic oedema, or urticaria after aspirin/NSAIDs; pregnancy and lactation; severe hepatic dysfunction; CrCl <30 mL/min; children <16 years; inflammatory bowel disease; congestive heart failure (NYHA II–IV); hypertension with BP persistently >140/90 mmHg and inadequately controlled; established ischaemic heart disease, peripheral arterial disease, and/or cerebrovascular disease.',
    sideEffects:
      'Abdominal pain, constipation, flatulence, gastritis, heartburn/acid reflux, diarrhoea, dyspepsia, nausea, vomiting, oesophagitis, oral ulcer, oedema/fluid retention, hypertension, palpitations, arrhythmia, dizziness, headache, bronchospasm, increased ALT/AST, alveolar osteitis.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Arcoxia 60 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Arcoxia',
  },
  {
    brandName: 'Arcoxia 90 mg',
    genericName: 'Etoricoxib',
    drugClassNameEn: 'Selective Cyclooxygenase-2 (COX-2) Inhibitor (NSAID)',
    dosageForm: 'Film-coated tablet',
    strength: '90 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Symptomatic relief of rheumatoid arthritis and ankylosing spondylitis, and short-term treatment of moderate pain associated with dental surgery in adults and adolescents aged 16 years and older.',
    adultDosage:
      'Rheumatoid arthritis and ankylosing spondylitis: 60 mg once daily, increased to a maximum of 90 mg once daily if needed; down-titrate to 60 mg once daily once clinically stabilised. Post-dental surgery pain: 90 mg once daily for a maximum of 3 days.',
    contraindications:
      'Active peptic ulceration or GI bleeding; NSAID-induced asthma/urticaria; pregnancy and lactation; severe hepatic or renal impairment (CrCl <30 mL/min); inflammatory bowel disease; NYHA II–IV heart failure; uncontrolled hypertension (>140/90 mmHg); established ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease.',
    sideEffects:
      'Hypertension, peripheral oedema, abdominal pain, dyspepsia, diarrhoea, nausea, dizziness, headache, elevated hepatic enzymes, serious cardiovascular thrombotic and GI bleeding risks.',
    storageConditions:
      'Store in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Arcoxia 90 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Arcoxia',
  },
  {
    brandName: 'Arcoxia 120 mg',
    genericName: 'Etoricoxib',
    drugClassNameEn: 'Selective Cyclooxygenase-2 (COX-2) Inhibitor (NSAID)',
    dosageForm: 'Film-coated tablet',
    strength: '120 mg',
    route: 'Oral',
    packSize: '7 film-coated tablets',
    indications:
      'Symptomatic relief of pain and signs of inflammation associated with acute gouty arthritis in adults and adolescents aged 16 years and older.',
    adultDosage:
      'Acute gouty arthritis: 120 mg once daily, used only for the acute symptomatic period and limited to a maximum of 8 days of treatment.',
    contraindications:
      'Active peptic ulceration or GI bleeding; NSAID hypersensitivity; pregnancy and lactation; severe hepatic or renal impairment; inflammatory bowel disease; NYHA II–IV heart failure; uncontrolled hypertension (>140/90 mmHg); established ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease.',
    sideEffects:
      'Hypertension, fluid retention/oedema, abdominal pain, dyspepsia, nausea, diarrhoea, dizziness, headache, elevated ALT/AST, cardiovascular thrombotic events.',
    storageConditions:
      'Store in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'Arcoxia 120 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Arcoxia',
  },

  // =========================================================================
  // UROLOGY & DERMATOLOGY
  // =========================================================================
  {
    brandName: 'Proscar 5 mg',
    genericName: 'Finasteride',
    drugClassNameEn: '5-Alpha-Reductase Inhibitor',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment and control of benign prostatic hyperplasia (BPH) in patients with an enlarged prostate to cause regression of the enlarged prostate, improve urinary flow and symptoms associated with BPH, and reduce the incidence of acute urinary retention and the need for surgery including transurethral resection of the prostate (TURP).',
    adultDosage:
      'One 5 mg tablet daily with or without food (alone or in combination with the alpha-blocker doxazosin).',
    contraindications:
      'Not indicated for use in women or children; contraindicated in pregnancy and women of childbearing potential (women who are or may potentially be pregnant must not handle crushed or broken tablets); hypersensitivity to finasteride.',
    sideEffects:
      'Impotence (erectile dysfunction), decreased libido, decreased volume of ejaculate, ejaculation disorder, breast tenderness and enlargement (gynaecomastia), rash, depression, anxiety, lowers serum PSA by ~50%.',
    storageConditions:
      'Do not store above 30°C. Store in the original package to protect from light and moisture.',
    specialties: ['Urology'],
    sourceTitle: 'Proscar 5 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Proscar',
  },
  {
    brandName: 'Propecia 1 mg',
    genericName: 'Finasteride',
    drugClassNameEn: '5-Alpha-Reductase Inhibitor',
    dosageForm: 'Film-coated tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of men aged 18–41 years with early stages of androgenetic alopecia (male pattern hair loss) to stabilise the hair-loss process and prevent further hair loss.',
    adultDosage:
      'One 1 mg tablet daily with or without food. Continuous use for 3 to 6 months is generally required before evidence of stabilisation of hair loss is observed.',
    contraindications:
      'Contraindicated in women (especially pregnant or potentially pregnant women, who must not handle crushed or broken tablets due to risk of feminisation of a male foetus) and children/adolescents; concomitant use of finasteride 5 mg or other 5-alpha-reductase inhibitors; hypersensitivity to finasteride.',
    sideEffects:
      'Decreased libido, erectile dysfunction, ejaculation disorder (decreased volume of ejaculate), depressed mood, depression, anxiety, breast tenderness/enlargement, testicular pain, hypersensitivity reactions.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Dermatology'],
    sourceTitle: 'Propecia 1 mg Film-Coated Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Propecia',
  },
  {
    brandName: 'Elocon 0.1% Cream',
    genericName: 'Mometasone furoate',
    drugClassNameEn: 'Potent Topical Corticosteroid (Group III)',
    dosageForm: 'Cream',
    strength: '0.1% w/w (1 mg/g)',
    route: 'Topical (cutaneous)',
    packSize: '30 g tube',
    indications:
      'Treatment of inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses, such as psoriasis and atopic dermatitis, in adults and children aged 2 years and older.',
    adultDosage:
      'Apply a thin film to the affected skin areas once daily. Facial application should not exceed 5 days; use in children should not exceed 5 days and should not be covered with occlusive dressings.',
    contraindications:
      'Facial rosacea, acne vulgaris, skin atrophy, perioral dermatitis, perianal and genital pruritus, napkin eruptions, bacterial (e.g. impetigo, pyodermas), viral (e.g. herpes simplex, herpes zoster, varicella, verrucae vulgares, condylomata acuminata, molluscum contagiosum), parasitic, and fungal (e.g. candida or dermatophyte) infections, tuberculosis, syphilis, or post-vaccine reactions; application to wounds or ulcerated skin; hypersensitivity to mometasone furoate or other corticosteroids.',
    sideEffects:
      'Application site burning, pruritus, folliculitis, acneiform reactions, skin atrophy, striae, telangiectasia, hypopigmentation, secondary infection, reversible HPA axis suppression with prolonged or extensive use.',
    storageConditions:
      'Do not store above 25°C.',
    specialties: ['Dermatology', 'Pediatrics', 'General Practice / Family Medicine'],
    sourceTitle: 'Elocon 0.1% w/w Cream — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Elocon',
  },
  {
    brandName: 'Diprosalic Ointment',
    genericName: 'Betamethasone dipropionate + Salicylic acid',
    drugClassNameEn: 'Potent Topical Corticosteroid & Keratolytic Combination',
    dosageForm: 'Ointment',
    strength: '0.05% w/w + 3% w/w',
    route: 'Topical (cutaneous)',
    packSize: '30 g tube',
    indications:
      'Topical treatment of subacute and chronic hyperkeratotic and dry corticosteroid-responsive dermatoses such as psoriasis, chronic atopic dermatitis, neurodermatitis (lichen simplex chronicus), lichen planus, and hyperkeratotic eczema.',
    adultDosage:
      'Apply a thin film to cover the affected area completely twice daily (morning and night); in some patients, less frequent maintenance application may be adequate.',
    contraindications:
      'Rosacea, acne, perioral dermatitis, perianal and genital pruritus; viral, tuberculous, fungal, or primary bacterial skin lesions; napkin eruptions; hypersensitivity to betamethasone dipropionate, salicylates, or any excipient.',
    sideEffects:
      'Burning, itching, irritation, dryness, folliculitis, hypertrichosis, acneiform eruptions, hypopigmentation, perioral dermatitis, allergic contact dermatitis, skin maceration, secondary infection, skin atrophy, striae, miliaria, systemic corticosteroid or salicylate absorption with extensive/occlusive use.',
    storageConditions:
      'Do not store above 25°C.',
    specialties: ['Dermatology'],
    sourceTitle: 'Diprosalic Ointment — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Diprosalic',
  },

  // =========================================================================
  // WOMEN'S HEALTH, CONTRACEPTION & FERTILITY
  // =========================================================================
  {
    brandName: 'Marvelon',
    genericName: 'Desogestrel + Ethinylestradiol',
    drugClassNameEn: 'Combined Hormonal Oral Contraceptive',
    dosageForm: 'Tablet',
    strength: '150 mcg / 30 mcg',
    route: 'Oral',
    packSize: '21 tablets',
    indications:
      'Oral hormonal contraception in women of fertile age (taking into account individual venous thromboembolism and arterial thromboembolism risk factors).',
    adultDosage:
      'One tablet daily at about the same time each day for 21 consecutive days, followed by a 7-day tablet-free interval during which withdrawal bleeding usually occurs.',
    contraindications:
      'Presence or risk of venous thromboembolism (VTE) or arterial thromboembolism (ATE); cerebrovascular disease; severe hypertension, severe dyslipoproteinaemia, or diabetes mellitus with vascular symptoms; migraine with focal neurological symptoms; pancreatitis associated with severe hypertriglyceridaemia; severe hepatic disease or liver tumours; known or suspected sex-steroid-influenced malignancies; undiagnosed vaginal bleeding; concomitant glecaprevir/pibrentasvir or ombitasvir/paritaprevir/ritonavir/dasabuvir.',
    sideEffects:
      'Depressed mood, mood altered, headache, nausea, abdominal pain, breast pain, breast tenderness, weight increased, fluid retention, decreased libido, migraine, venous and arterial thromboembolic events.',
    storageConditions:
      'Do not store above 30°C. Do not freeze. Store in the original package to protect from light and moisture.',
    specialties: ['Obstetrics & Gynecology', 'General Practice / Family Medicine'],
    sourceTitle: 'Marvelon Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Marvelon',
  },
  {
    brandName: 'Mercilon',
    genericName: 'Desogestrel + Ethinylestradiol',
    drugClassNameEn: 'Low-Dose Combined Hormonal Oral Contraceptive',
    dosageForm: 'Tablet',
    strength: '150 mcg / 20 mcg',
    route: 'Oral',
    packSize: '21 tablets',
    indications:
      'Oral hormonal contraception in women of fertile age.',
    adultDosage:
      'One tablet daily at about the same time each day for 21 consecutive days, followed by a 7-day tablet-free interval before starting the next pack.',
    contraindications:
      'Presence or risk of venous thromboembolism (VTE) or arterial thromboembolism (ATE); migraine with aura; severe hepatic disease or hepatic tumours; sex-steroid-dependent malignancies; undiagnosed vaginal bleeding; concomitant direct-acting HCV regimens containing ombitasvir/paritaprevir/ritonavir or glecaprevir/pibrentasvir.',
    sideEffects:
      'Headache, migraine, depressed mood, altered mood, nausea, abdominal pain, breast tenderness/pain, irregular breakthrough bleeding or spotting, weight increased, thromboembolic risk.',
    storageConditions:
      'Do not store above 30°C. Do not freeze. Store in the original package to protect from light and moisture.',
    specialties: ['Obstetrics & Gynecology', 'General Practice / Family Medicine'],
    sourceTitle: 'Mercilon Tablets — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Mercilon',
  },
  {
    brandName: 'Nexplanon 68 mg',
    genericName: 'Etonogestrel',
    drugClassNameEn: 'Progestogen-Only Subdermal Contraceptive Implant',
    dosageForm: 'Implant for subdermal use',
    strength: '68 mg',
    route: 'Subdermal',
    packSize: '1 radiopaque subdermal implant in preloaded applicator',
    indications:
      'Long-acting reversible contraception for women aged between 18 and 40 years (effective for up to 3 years).',
    adultDosage:
      'One radiopaque implant (68 mg etonogestrel) inserted subdermally at the inner side of the non-dominant upper arm by a trained healthcare professional; remove or replace after no more than 3 years.',
    contraindications:
      'Active venous thromboembolic disorder; known or suspected sex-steroid-sensitive malignancies; presence or history of liver tumours (benign or malignant); presence or history of severe hepatic disease as long as liver function values have not returned to normal; undiagnosed vaginal bleeding; hypersensitivity to etonogestrel or any excipient.',
    sideEffects:
      'Vaginal infection, headache, acne, breast tenderness and pain, irregular menstrual bleeding (amenorrhoea, infrequent, frequent, or prolonged bleeding), weight increased, affect lability, depressed mood, nervousness, decreased libido, dizziness, alopecia, abdominal pain, nausea, implant site pain or reaction.',
    storageConditions:
      'This medicinal product does not require any special storage conditions; store in the original blister package.',
    specialties: ['Obstetrics & Gynecology'],
    sourceTitle: 'Nexplanon 68 mg Implant for Subdermal Use — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Nexplanon',
  },
  {
    brandName: 'NuvaRing',
    genericName: 'Etonogestrel + Ethinylestradiol',
    drugClassNameEn: 'Combined Hormonal Contraceptive Vaginal Ring',
    dosageForm: 'Vaginal delivery system',
    strength: '0.120 mg / 0.015 mg per 24 hours',
    route: 'Intravaginal',
    packSize: '1 or 3 vaginal rings (sachets)',
    indications:
      'Contraception in women of fertile age.',
    adultDosage:
      'One ring is inserted into the vagina by the woman herself, left in place continuously for 3 weeks, then removed on the same day of the week as insertion for a 1-week ring-free interval before inserting a new ring.',
    contraindications:
      'Presence or risk of venous thromboembolism (VTE) or arterial thromboembolism (ATE); migraine with focal neurological symptoms; pancreatitis with severe hypertriglyceridaemia; severe hepatic disease or liver tumours; sex-steroid-influenced malignancies; undiagnosed vaginal bleeding; concomitant ombitasvir/paritaprevir/ritonavir or glecaprevir/pibrentasvir.',
    sideEffects:
      'Headache, migraine, depressed mood, decreased libido, vaginal infection, vaginal discharge, vulvovaginal pruritus, device expulsion or discomfort, abdominal pain, nausea, acne, breast tenderness, dysmenorrhoea, weight gain, venous/arterial thromboembolism.',
    storageConditions:
      'Prior to dispensing: store in a refrigerator (2°C–8°C). At the time of dispensing: may be stored up to 4 months at <=30°C in the original sachet.',
    specialties: ['Obstetrics & Gynecology'],
    sourceTitle: 'NuvaRing 0.120 mg / 0.015 mg per 24 hours Vaginal Delivery System — UK eMC SmPC (Organon)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=NuvaRing',
  },
  {
    brandName: 'Puregon 300 IU / 0.36 mL',
    genericName: 'Follitropin beta',
    drugClassNameEn: 'Recombinant Follicle-Stimulating Hormone (rFSH) Gonadotropin',
    dosageForm: 'Solution for injection in cartridge',
    strength: '300 IU / 0.36 mL',
    route: 'Subcutaneous',
    packSize: '1 cartridge (0.36 mL) with 6 needles for Puregon Pen',
    indications:
      'Treatment of female infertility in anovulation (including polycystic ovarian syndrome, PCOS) in women unresponsive to clomifene citrate, and controlled ovarian hyperstimulation to induce development of multiple follicles in medically assisted reproduction programmes (IVF/ET, GIFT, ICSI); deficient spermatogenesis due to hypogonadotrophic hypogonadism in men.',
    adultDosage:
      'Individualized according to ovarian response monitored by ultrasonography and serum oestradiol levels (anovulation typically starts at 50 IU daily for at least 7 days; controlled ovarian hyperstimulation typically starts at 100–225 IU daily for the first 4 days). Administered subcutaneously via Puregon Pen under specialist supervision.',
    contraindications:
      'Tumours of the ovary, breast, uterus, testis, pituitary, or hypothalamus; primary gonadal failure; undiagnosed vaginal bleeding; ovarian cysts or enlarged ovaries not related to PCOS; malformations of the reproductive organs or fibroid tumours of the uterus incompatible with pregnancy; hypersensitivity to follitropin beta or streptomycin/neomycin.',
    sideEffects:
      'Ovarian hyperstimulation syndrome (OHSS), pelvic pain, ovarian enlargement/cysts, abdominal pain and distension, headache, nausea, injection site bruising/pain/erythema/swelling, multiple pregnancy.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C). Do not freeze. Keep the cartridge in the outer carton. Once pierced by a needle, may be stored for a maximum of 28 days at <=25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'Puregon (Follitropin beta) — European Medicines Agency EPAR Product Information (Organon)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/puregon',
  },
  {
    brandName: 'Orgalutran 0.25 mg / 0.5 mL',
    genericName: 'Ganirelix',
    drugClassNameEn: 'Gonadotropin-Releasing Hormone (GnRH) Antagonist',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '0.25 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '1 or 5 pre-filled syringes × 0.5 mL',
    indications:
      'Prevention of premature luteinising hormone (LH) surges in women undergoing controlled ovarian hyperstimulation (COH) for assisted reproduction techniques.',
    adultDosage:
      '0.25 mg injected subcutaneously once daily (preferably in the upper leg), starting on day 5 or day 6 of FSH administration and continued throughout the gonadotropin treatment period up to and including the day of ovulation induction with hCG.',
    contraindications:
      'Hypersensitivity to ganirelix, gonadotropin-releasing hormone (GnRH), any other GnRH analogue, or any excipient (needle shield contains dry natural rubber/latex); moderate or severe impairment of renal or hepatic function; pregnancy and lactation.',
    sideEffects:
      'Local skin reaction at the injection site (predominantly redness with or without swelling), headache, nausea, malaise, pelvic pain, ovarian hyperstimulation syndrome (related to COH), hypersensitivity reactions.',
    storageConditions:
      'Do not freeze. Store in the original package in order to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Orgalutran (Ganirelix) — European Medicines Agency EPAR Product Information (Organon)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/orgalutran',
  },
];

function toOrganonProductDraft(item: CompactOrganonDrug): AiProductDraft {
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
    sources: OGN_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Organon & Co. regulatory monograph (EMA EPAR / UK eMC SmPC); saved as draft pending verification.',
  };
}

export const ORGANON_PRODUCTS: AiProductDraft[] = ORGANON_COMPACT_PRODUCTS.map(
  toOrganonProductDraft
);

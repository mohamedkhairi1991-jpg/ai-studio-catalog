import type { AiDraftSource, AiProductDraft } from './catalog';

const BAYER_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactBayerDrug {
  brandName: string;
  brandNameAr: string;
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

function toBayerProductDraft(item: CompactBayerDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
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
    sources: BAYER_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Bayer AG regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

const BAYER_COMPACT_PRODUCTS: CompactBayerDrug[] = [
  // =========================================================================
  // 1. CARDIOVASCULAR, THROMBOSIS, CKD & DIABETES — XARELTO, ADALAT LA, ASPIRIN PROTECT, KERENDIA, VERQUVO, ADEMPAS, GLUCOBAY (19 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Xarelto 2.5 mg',
    brandNameAr: 'زاريلتو 2.5 ملغم',
    genericName: 'Rivaroxaban',
    drugClassNameEn: 'Direct Oral Factor Xa Inhibitors (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    indications:
      'Co-administered with acetylsalicylic acid (ASA) alone or with ASA plus clopidogrel or ticlopidine, for the prevention of atherothrombotic events in adult patients after an acute coronary syndrome (ACS) with elevated cardiac biomarkers; and co-administered with ASA for the prevention of atherothrombotic events in adult patients with coronary artery disease (CAD) or symptomatic peripheral artery disease (PAD) at high risk of ischaemic events.',
    adultDosage:
      '2.5 mg taken orally twice daily (one tablet in the morning and one in the evening, with or without food) in combination with a daily dose of 75–100 mg acetylsalicylic acid (plus 75 mg clopidogrel daily where indicated after ACS).',
    contraindications:
      'Active clinically significant bleeding, lesion or condition considered to be a significant risk for major bleeding, concomitant treatment with any other anticoagulants, concomitant treatment of ACS with antiplatelet therapy in patients with a prior stroke or transient ischaemic attack (TIA), concomitant treatment of CAD/PAD with ASA in patients with previous haemorrhagic or lacunar stroke or any stroke within a month, hepatic disease associated with coagulopathy and clinically relevant bleeding risk (including Child-Pugh B and C cirrhosis), and pregnancy and breast-feeding.',
    sideEffects:
      'Bleeding (epistaxis, gingival bleeding, gastrointestinal haemorrhage, urogenital bleeding, contusion, anaemia), dizziness, headache, pain in extremity, and elevated hepatic transaminases.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Vascular Surgery', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xarelto (rivaroxaban) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xarelto',
  },
  {
    brandName: 'Xarelto 10 mg',
    brandNameAr: 'زاريلتو 10 ملغم',
    genericName: 'Rivaroxaban',
    drugClassNameEn: 'Direct Oral Factor Xa Inhibitors (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Prevention of venous thromboembolism (VTE) in adult patients undergoing elective hip or knee replacement surgery; and extended prevention of recurrent deep vein thrombosis (DVT) and pulmonary embolism (PE) following completion of at least 6 months of therapy for DVT or PE.',
    adultDosage:
      'Orthopaedic VTE prophylaxis: 10 mg orally once daily with or without food, initiated 6 to 10 hours after surgery once haemostasis is established, continued for 5 weeks (major hip surgery) or 2 weeks (major knee surgery). Extended VTE recurrence prevention (after ≥6 months of treatment): 10 mg once daily.',
    contraindications:
      'Active clinically significant bleeding, lesion or condition at significant risk of major bleeding, concomitant treatment with other anticoagulants, hepatic disease associated with coagulopathy (including Child-Pugh B and C cirrhosis), and pregnancy and breast-feeding.',
    sideEffects:
      'Haemorrhage (post-procedural haemorrhage, epistaxis, gastrointestinal bleeding, haematuria), anaemia, nausea, dizziness, and peripheral oedema.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Orthopedics', 'Hematology', 'Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xarelto (rivaroxaban) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xarelto',
  },
  {
    brandName: 'Xarelto 15 mg',
    brandNameAr: 'زاريلتو 15 ملغم',
    genericName: 'Rivaroxaban',
    drugClassNameEn: 'Direct Oral Factor Xa Inhibitors (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '15 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) with one or more risk factors (particularly in moderate or severe renal impairment, CrCl 15–49 mL/min); and treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE), and prevention of recurrent DVT and PE in adults and children.',
    adultDosage:
      'Acute DVT/PE initial phase (Days 1–21): 15 mg taken orally twice daily WITH FOOD for the first 3 weeks, followed by 20 mg once daily with food from Day 22 onwards. NVAF in moderate/severe renal impairment (CrCl 15–49 mL/min): 15 mg once daily WITH FOOD.',
    contraindications:
      'Active clinically significant bleeding, high-risk bleeding lesions, concomitant anticoagulants, hepatic disease associated with coagulopathy (including Child-Pugh B and C cirrhosis), and pregnancy and breast-feeding.',
    sideEffects:
      'Gastrointestinal haemorrhage, epistaxis, haematuria, menorrhagia, anaemia, dizziness, headache, and contusion.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Hematology', 'Pulmonology', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xarelto (rivaroxaban) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xarelto',
  },
  {
    brandName: 'Xarelto 20 mg',
    brandNameAr: 'زاريلتو 20 ملغم',
    genericName: 'Rivaroxaban',
    drugClassNameEn: 'Direct Oral Factor Xa Inhibitors (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) with one or more risk factors (congestive heart failure, hypertension, age ≥75 years, diabetes mellitus, prior stroke or TIA); and maintenance treatment of DVT and PE and prevention of recurrent DVT and PE in adults.',
    adultDosage:
      'NVAF (CrCl ≥50 mL/min): 20 mg taken orally once daily WITH FOOD. DVT/PE continuation phase (Day 22 onwards after 21 days of 15 mg twice daily): 20 mg once daily WITH FOOD. Taking 15 mg and 20 mg tablets with food is mandatory to ensure complete oral bioavailability.',
    contraindications:
      'Active clinically significant bleeding, high-risk bleeding lesions, concomitant anticoagulants, hepatic disease associated with coagulopathy (including Child-Pugh B and C cirrhosis), and pregnancy and breast-feeding.',
    sideEffects:
      'Haemorrhage (gastrointestinal, intracranial, ocular, epistaxis, urogenital), anaemia, dizziness, headache, and gastrointestinal discomfort.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Hematology', 'Neurology', 'Pulmonology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xarelto (rivaroxaban) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xarelto',
  },
  {
    brandName: 'Adalat LA 20 mg',
    brandNameAr: 'أدالات إل إيه 20 ملغم',
    genericName: 'Nifedipine',
    drugClassNameEn: 'Dihydropyridine Calcium Channel Blockers (Osmotic Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    indications:
      'Treatment of all grades of hypertension.',
    adultDosage:
      'Recommended starting dose in hypertension: one 20 mg or 30 mg prolonged-release tablet once daily swallowed whole with liquid, with or without food (up to a maximum of 90 mg once daily). Must not be bitten, chewed, or broken up. Avoid grapefruit juice.',
    contraindications:
      'Cardiogenic shock, clinically significant aortic stenosis, unstable angina, during or within 1 month of a myocardial infarction, acute attacks of angina, secondary prevention of myocardial infarction, Kock pouch (ileostomy after proctocolectomy), and concomitant administration with rifampicin.',
    sideEffects:
      'Headache, peripheral oedema (vasodilatory ankle swelling), flushing, constipation, dizziness, palpitations, and lethargy.',
    storageConditions:
      'Store below 30°C in the original blister package in order to protect from moisture and light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'UK EMC — Adalat LA (nifedipine) Prolonged-Release Tablets Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6180/pil',
  },
  {
    brandName: 'Adalat LA 30 mg',
    brandNameAr: 'أدالات إل إيه 30 ملغم',
    genericName: 'Nifedipine',
    drugClassNameEn: 'Dihydropyridine Calcium Channel Blockers (Osmotic Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '30 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    indications:
      'Treatment of all grades of hypertension, and prophylaxis of chronic stable angina pectoris either as monotherapy or in combination with a beta-blocker.',
    adultDosage:
      'One 30 mg prolonged-release tablet once daily swallowed whole with water at approximately 24-hour intervals; may be increased stepwise according to clinical response up to 60 mg or 90 mg once daily. The insoluble outer tablet shell is eliminated intact in the faeces.',
    contraindications:
      'Cardiogenic shock, clinically significant aortic stenosis, unstable angina, within 1 month of acute myocardial infarction, Kock pouch, and concomitant rifampicin.',
    sideEffects:
      'Peripheral ankle oedema, headache, flushing, vasodilatation, constipation, dizziness, and tachycardia/palpitations.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture and light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'UK EMC — Adalat LA (nifedipine) Prolonged-Release Tablets Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6180/pil',
  },
  {
    brandName: 'Adalat LA 60 mg',
    brandNameAr: 'أدالات إل إيه 60 ملغم',
    genericName: 'Nifedipine',
    drugClassNameEn: 'Dihydropyridine Calcium Channel Blockers (Osmotic Prolonged-Release)',
    dosageForm: 'Prolonged-release tablet',
    strength: '60 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    indications:
      'Maintenance treatment of hypertension and prophylaxis of chronic stable angina pectoris in patients requiring 60 mg once daily.',
    adultDosage:
      'One 60 mg prolonged-release tablet once daily swallowed whole with water (do not chew, divide, or crush). Avoid grapefruit juice.',
    contraindications:
      'Cardiogenic shock, clinically significant aortic stenosis, unstable angina, within 1 month of acute myocardial infarction, Kock pouch, and concomitant rifampicin.',
    sideEffects:
      'Peripheral oedema, flushing, headache, dizziness, constipation, palpitations, and gingival hyperplasia.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture and light.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'UK EMC — Adalat LA (nifedipine) Prolonged-Release Tablets Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6180/pil',
  },
  {
    brandName: 'Aspirin Protect 100 mg',
    brandNameAr: 'أسبرين بروتكت 100 ملغم',
    category: 'otc_drug',
    genericName: 'Acetylsalicylic acid',
    drugClassNameEn: 'Platelet Aggregation Inhibitors (Cyclooxygenase-1 Inhibitors)',
    dosageForm: 'Gastro-resistant tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '30 gastro-resistant tablets',
    indications:
      'Secondary prevention of myocardial infarction; prevention of cardiovascular morbidity in patients suffering from stable angina pectoris; history of unstable angina pectoris; prevention of graft occlusion after coronary artery bypass grafting (CABG); coronary angioplasty (PTCA); and secondary prevention of transient ischaemic attacks (TIA) and ischaemic stroke.',
    adultDosage:
      '100 mg (1 gastro-resistant tablet) once daily, swallowed whole with plenty of water preferably at least 30 minutes before a meal (in acute myocardial infarction, the first tablet should be crushed or chewed for rapid absorption).',
    contraindications:
      'Hypersensitivity to acetylsalicylic acid or other salicylates/NSAIDs (history of salicylate-induced asthma), active peptic ulceration, haemorrhagic diathesis, severe renal or hepatic failure, severe uncontrolled heart failure, combination with methotrexate ≥15 mg/week, and last trimester of pregnancy (at doses >100 mg/day).',
    sideEffects:
      'Dyspepsia, epigastric pain, gastrointestinal microbleeding or ulceration, epistaxis, gingival bleeding, increased bleeding time, and bronchospasm in aspirin-sensitive patients.',
    storageConditions:
      'Store below 30°C in the original blister package.',
    specialties: ['Cardiology', 'Neurology', 'Vascular Surgery', 'Internal Medicine'],
    sourceTitle: 'Bayer AG — Aspirin Protect (acetylsalicylic acid) Official Portfolio Information',
    sourceUrl: 'https://www.bayer.com/en/portfolio/aspirin',
  },
  {
    brandName: 'Kerendia 10 mg',
    brandNameAr: 'كيرينديا 10 ملغم',
    genericName: 'Finerenone',
    drugClassNameEn: 'Non-Steroidal Selective Mineralocorticoid Receptor Antagonists (MRAs)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of chronic kidney disease (with albuminuria) associated with type 2 diabetes in adults.',
    adultDosage:
      'Starting dose in patients with eGFR 25 to <60 mL/min/1.73 m² (and serum potassium ≤4.8 mmol/L): 10 mg once daily with or without food; remeasure serum potassium and eGFR 4 weeks after initiation and increase to target dose of 20 mg once daily if serum potassium ≤4.8 mmol/L.',
    contraindications:
      'Concomitant treatment with strong inhibitors of CYP3A4 (itraconazole, ketoconazole, ritonavir, nelfinavir, cobicistat, clarithromycin, telithromycin, nefazodone), and Addison’s disease.',
    sideEffects:
      'Hyperkalaemia (most common), hyponatraemia, hypotension, pruritus, and initial mild decrease in glomerular filtration rate.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Nephrology', 'Endocrinology', 'Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Kerendia (finerenone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kerendia',
  },
  {
    brandName: 'Kerendia 20 mg',
    brandNameAr: 'كيرينديا 20 ملغم',
    genericName: 'Finerenone',
    drugClassNameEn: 'Non-Steroidal Selective Mineralocorticoid Receptor Antagonists (MRAs)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Target maintenance dose (and starting dose when eGFR ≥60 mL/min/1.73 m²) for chronic kidney disease with albuminuria associated with type 2 diabetes in adults.',
    adultDosage:
      'Recommended target dose is 20 mg taken orally once daily with or without food (withhold if serum potassium >5.5 mmol/L and restart at 10 mg once daily when serum potassium is ≤5.0 mmol/L). Avoid grapefruit or grapefruit juice.',
    contraindications:
      'Concomitant strong CYP3A4 inhibitors, and Addison’s disease.',
    sideEffects:
      'Hyperkalaemia, hyponatraemia, hypotension, hyperuricaemia, pruritus, and transient GFR decrease.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Nephrology', 'Endocrinology', 'Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Kerendia (finerenone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kerendia',
  },
  {
    brandName: 'Verquvo 2.5 mg',
    brandNameAr: 'فيركوفو 2.5 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets',
    indications:
      'Treatment of symptomatic chronic heart failure in adult patients with reduced ejection fraction who are stabilised after a recent decompensation event requiring intravenous therapy.',
    adultDosage:
      'Recommended starting dose is 2.5 mg once daily taken WITH FOOD; double the dose approximately every 2 weeks (to 5 mg once daily and then to the target maintenance dose of 10 mg once daily) as tolerated by the patient.',
    contraindications:
      'Concomitant use of other soluble guanylate cyclase (sGC) stimulators (such as riociguat), and hypersensitivity to vericiguat or any excipient.',
    sideEffects:
      'Hypotension, dizziness, headache, anaemia, nausea, dyspepsia, vomiting, and gastro-oesophageal reflux disease.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Verquvo (vericiguat) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Verquvo 5 mg',
    brandNameAr: 'فيركوفو 5 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets',
    indications:
      'Intermediate titration step (and maintenance dose if 10 mg is not tolerated) for symptomatic chronic heart failure with reduced ejection fraction stabilised after recent decompensation.',
    adultDosage:
      '5 mg taken orally once daily WITH FOOD for approximately 2 weeks before advancing to the target maintenance dose of 10 mg once daily.',
    contraindications:
      'Concomitant use of other soluble guanylate cyclase stimulators (riociguat), and concomitant PDE5 inhibitors (not recommended due to symptomatic hypotension risk).',
    sideEffects:
      'Hypotension, orthostatic dizziness, anaemia, headache, dyspepsia, and nausea.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Verquvo (vericiguat) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Verquvo 10 mg',
    brandNameAr: 'فيركوفو 10 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Target maintenance dose for symptomatic chronic heart failure in adult patients with reduced ejection fraction stabilised after a recent decompensation event requiring intravenous therapy.',
    adultDosage:
      'Target maintenance dose is 10 mg taken orally once daily WITH FOOD.',
    contraindications:
      'Concomitant use of other soluble guanylate cyclase stimulators (such as riociguat).',
    sideEffects:
      'Hypotension, anaemia, dizziness, headache, nausea, dyspepsia, and gastro-oesophageal reflux.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Verquvo (vericiguat) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Adempas 1 mg',
    brandNameAr: 'أديمباس 1 ملغم',
    genericName: 'Riociguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators (Pulmonary Hypertension)',
    dosageForm: 'Film-coated tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '42 film-coated tablets',
    indications:
      'Treatment of adult patients with WHO Functional Class II to III chronic thromboembolic pulmonary hypertension (CTEPH, inoperable or persistent/recurrent after surgical treatment) to improve exercise capacity; and treatment of adult and paediatric patients (aged ≥6 years and ≥50 kg) with pulmonary arterial hypertension (PAH) as monotherapy or in combination with endothelin receptor antagonists.',
    adultDosage:
      'Recommended starting dose is 1 mg three times daily (approximately 6 to 8 hours apart) for 2 weeks; increase by 0.5 mg three times daily every 2 weeks if systolic blood pressure is ≥95 mmHg and the patient has no signs or symptoms of hypotension, up to a maximum of 2.5 mg three times daily.',
    contraindications:
      'Co-administration with PDE5 inhibitors (sildenafil, tadalafil, vardenafil), severe hepatic impairment (Child-Pugh C), co-administration with nitrates or nitric oxide donors in any form, co-administration with other sGC stimulators (vericiguat), pregnancy, patients with systolic blood pressure <95 mmHg at treatment initiation, and patients with pulmonary hypertension associated with idiopathic interstitial pneumonias (PH-IIP).',
    sideEffects:
      'Headache, dizziness, dyspepsia, peripheral oedema, nausea, diarrhoea, vomiting, hypotension, anaemia, and haemoptysis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Adempas (riociguat) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adempas',
  },
  {
    brandName: 'Adempas 2.5 mg',
    brandNameAr: 'أديمباس 2.5 ملغم',
    genericName: 'Riociguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators (Pulmonary Hypertension)',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '84 film-coated tablets',
    indications:
      'Maximum target maintenance dose for chronic thromboembolic pulmonary hypertension (CTEPH) and pulmonary arterial hypertension (PAH).',
    adultDosage:
      'Target maintenance dose is 2.5 mg taken orally three times daily (approximately 6 to 8 hours apart), with or without food.',
    contraindications:
      'Co-administration with PDE5 inhibitors, nitrates/NO donors, or other sGC stimulators; severe hepatic impairment (Child-Pugh C); pregnancy; baseline SBP <95 mmHg; and PH-IIP.',
    sideEffects:
      'Headache, dizziness, dyspepsia, peripheral oedema, hypotension, gastro-oesophageal reflux, anaemia, epistaxis, and haemoptysis.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Adempas (riociguat) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adempas',
  },
  {
    brandName: 'Glucobay 50 mg',
    brandNameAr: 'غلوكوباي 50 ملغم',
    genericName: 'Acarbose',
    drugClassNameEn: 'Alpha-Glucosidase Inhibitors',
    dosageForm: 'Tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Treatment of type 2 diabetes mellitus in adults when dietary management and physical exercise alone are insufficient, as monotherapy or in combination with metformin, sulfonylureas, or insulin.',
    adultDosage:
      'Initial dose: 50 mg three times daily (or 50 mg once or twice daily increasing gradually to 50 mg three times daily); tablets must be chewed with the first mouthful of food or swallowed whole with a little liquid immediately before the meal.',
    contraindications:
      'Hypersensitivity to acarbose, chronic intestinal disorders associated with distinct disturbances of digestion and absorption, states which may deteriorate as a result of increased gas formation in the intestine (Roemheld’s syndrome, major hernias, intestinal obstructions, intestinal ulceration, inflammatory bowel disease), severe renal impairment (CrCl <25 mL/min), and severe hepatic impairment.',
    sideEffects:
      'Flatulence, borborygmi, abdominal distension, diarrhoea, abdominal pain, and rare asymptomatic hepatic transaminase elevations. (Note: if hypoglycaemia occurs during combination therapy with insulin or a sulfonylurea, treat with oral glucose/dextrose rather than sucrose/cane sugar.)',
    storageConditions:
      'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Regulatory Reference — Glucobay (acarbose) Official Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/documents/psusa/acarbose-list-nationally-authorised-medicinal-products-psusa00000017201503_en.pdf',
  },
  {
    brandName: 'Glucobay 100 mg',
    brandNameAr: 'غلوكوباي 100 ملغم',
    genericName: 'Acarbose',
    drugClassNameEn: 'Alpha-Glucosidase Inhibitors',
    dosageForm: 'Tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Maintenance treatment of type 2 diabetes mellitus in adults requiring higher postprandial alpha-glucosidase inhibition.',
    adultDosage:
      'Maintenance dose: 100 mg three times daily taken immediately before meals or chewed with the first mouthful of food (maximum dose 200 mg three times daily).',
    contraindications:
      'Inflammatory bowel disease, colonic ulceration, partial intestinal obstruction, chronic malabsorption disorders, severe renal impairment (CrCl <25 mL/min), and severe hepatic impairment.',
    sideEffects:
      'Flatulence, diarrhoea, abdominal pain, meteorism, and rare reversible liver enzyme elevations.',
    storageConditions:
      'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA Regulatory Reference — Glucobay (acarbose) Official Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/documents/psusa/acarbose-list-nationally-authorised-medicinal-products-psusa00000017201503_en.pdf',
  },

  // =========================================================================
  // 2. ANTI-INFECTIVES — CIPROBAY & AVELOX (6 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Ciprobay 250 mg',
    brandNameAr: 'سيبروباي 250 ملغم',
    genericName: 'Ciprofloxacin',
    drugClassNameEn: 'Fluoroquinolone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '250 mg',
    route: 'Oral',
    packSize: '10 film-coated tablets',
    indications:
      'Treatment of complicated and uncomplicated urinary tract infections, gonococcal urethritis and cervicitis, gastrointestinal tract infections (travellers’ diarrhoea, shigellosis), and post-exposure prophylaxis of inhalational anthrax in adults.',
    adultDosage:
      '250 mg to 500 mg orally twice daily (every 12 hours) for 3 to 14 days depending on infection type and severity. Swallow whole with liquid; do not take concurrently with dairy products, calcium, iron, zinc, or magnesium/aluminium antacids (separate by 1–2 hours before or at least 4 hours after).',
    contraindications:
      'Hypersensitivity to ciprofloxacin or other quinolones, and concomitant administration with tizanidine.',
    sideEffects:
      'Nausea, diarrhoea, tendinitis and tendon rupture (especially Achilles tendon; discontinue at first sign of tendon pain/inflammation), arthralgia, peripheral neuropathy, QT interval prolongation, photosensitivity, and CNS effects (dizziness, headache, insomnia).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Ciprobay (ciprofloxacin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ciprobay',
  },
  {
    brandName: 'Ciprobay 500 mg',
    brandNameAr: 'سيبروباي 500 ملغم',
    genericName: 'Ciprofloxacin',
    drugClassNameEn: 'Fluoroquinolone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '10 film-coated tablets',
    indications:
      'Treatment of lower respiratory tract infections due to Gram-negative bacteria, chronic suppurative otitis media, acute exacerbation of chronic sinusitis, complicated urinary tract infections and acute pyelonephritis, bacterial prostatitis, genital tract infections, intra-abdominal infections, skin and soft tissue infections due to Gram-negative bacteria, bone and joint infections, and bronchopulmonary Pseudomonas aeruginosa infections in cystic fibrosis.',
    adultDosage:
      '500 mg orally twice daily (every 12 hours) for 7 to 28 days depending on indication (up to 4–6 weeks in bone/joint infections or chronic bacterial prostatitis). Separate from multivalent cation products and dairy.',
    contraindications:
      'Hypersensitivity to ciprofloxacin or other quinolones, and concomitant administration with tizanidine.',
    sideEffects:
      'Nausea, diarrhoea, tendinitis and tendon rupture, peripheral neuropathy, dizziness, headache, rash, elevated hepatic transaminases, and QTc prolongation.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Urology', 'Pulmonology', 'Orthopedics', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Ciprobay (ciprofloxacin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ciprobay',
  },
  {
    brandName: 'Ciprobay 750 mg',
    brandNameAr: 'سيبروباي 750 ملغم',
    genericName: 'Ciprofloxacin',
    drugClassNameEn: 'Fluoroquinolone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '750 mg',
    route: 'Oral',
    packSize: '10 film-coated tablets',
    indications:
      'Treatment of severe or deep-seated Gram-negative infections including Pseudomonas aeruginosa bronchopulmonary infections in cystic fibrosis, malignant external otitis, bone and joint infections (osteomyelitis), and severe complicated urinary or respiratory tract infections.',
    adultDosage:
      '750 mg orally twice daily (every 12 hours) in severe infections or infections caused by less susceptible organisms such as Pseudomonas aeruginosa.',
    contraindications:
      'Hypersensitivity to ciprofloxacin or other quinolones, and concomitant administration with tizanidine.',
    sideEffects:
      'Nausea, diarrhoea, vomiting, tendinitis and tendon rupture, peripheral neuropathy, CNS disturbances, photosensitivity, and QTc prolongation.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Orthopedics', 'Urology', 'ENT'],
    sourceTitle: 'EMA Referral — Ciprobay (ciprofloxacin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ciprobay',
  },
  {
    brandName: 'Ciprobay 200 mg/100 mL',
    brandNameAr: 'سيبروباي 200 ملغم/100 مل',
    genericName: 'Ciprofloxacin',
    drugClassNameEn: 'Fluoroquinolone Antibacterials (Intravenous)',
    dosageForm: 'Solution for infusion',
    strength: '200 mg / 100 mL (2 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 bottle x 100 mL',
    indications:
      'Parenteral treatment of complicated urinary tract infections, acute pyelonephritis, bacterial prostatitis, Gram-negative lower respiratory tract infections, intra-abdominal infections, bone and joint infections, and neutropenic fever.',
    adultDosage:
      '400 mg (two 200 mg/100 mL bottles) intravenously twice daily or three times daily infused over 60 minutes into a large vein (switch to oral therapy as soon as clinically indicated).',
    contraindications:
      'Hypersensitivity to ciprofloxacin or other quinolones, and concomitant tizanidine.',
    sideEffects:
      'Infusion-site reaction/phlebitis, nausea, diarrhoea, elevated transaminases, tendinitis/tendon rupture, QT prolongation, and CNS reactions.',
    storageConditions:
      'Keep the bottle in the outer carton in order to protect from light; do not refrigerate or freeze.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Urology', 'Internal Medicine'],
    sourceTitle: 'EMA Referral — Ciprobay (ciprofloxacin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/ciprobay',
  },
  {
    brandName: 'Avelox 400 mg',
    brandNameAr: 'أفيلوكس 400 ملغم',
    genericName: 'Moxifloxacin',
    drugClassNameEn: 'Respiratory Fluoroquinolone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '400 mg',
    route: 'Oral',
    packSize: '5 film-coated tablets',
    indications:
      'Treatment of community-acquired pneumonia (CAP, except severe cases), mild to moderate pelvic inflammatory disease, and (only when other commonly recommended antibiotics cannot be used or have failed) acute bacterial sinusitis and acute exacerbation of chronic bronchitis in adults (≥18 years).',
    adultDosage:
      'One 400 mg film-coated tablet once daily swallowed whole with liquid, independent of meals (duration: 10 days for CAP, 7 days for acute bacterial sinusitis, 5–10 days for acute exacerbation of chronic bronchitis, 14 days for pelvic inflammatory disease). Separate by at least 6 hours from magnesium/aluminium antacids, iron, or zinc.',
    contraindications:
      'Hypersensitivity to moxifloxacin or other quinolones, pregnancy and lactation, patients below 18 years of age, history of tendon disease/disorder related to quinolone treatment, congenital or documented acquired QT prolongation, electrolyte disturbances (particularly uncorrected hypokalaemia), clinically relevant bradycardia or heart failure with reduced LVEF, history of symptomatic arrhythmias, concomitant QT-prolonging drugs, and severe hepatic impairment (Child-Pugh C or transaminases >5x ULN).',
    sideEffects:
      'Nausea, diarrhoea, dizziness, headache, QT prolongation in patients with hypokalaemia, mycotic superinfections, tendinitis and tendon rupture, and peripheral neuropathy.',
    storageConditions:
      'Store below 25°C in the original blister package in order to protect from moisture.',
    specialties: ['Pulmonology', 'Infectious Diseases', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA Referral — Avelox (moxifloxacin) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/avelox',
  },
  {
    brandName: 'Avelox 400 mg/250 mL',
    brandNameAr: 'أفيلوكس 400 ملغم/250 مل',
    genericName: 'Moxifloxacin',
    drugClassNameEn: 'Respiratory Fluoroquinolone Antibacterials (Intravenous)',
    dosageForm: 'Solution for infusion',
    strength: '400 mg / 250 mL (1.6 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 bottle / bag x 250 mL',
    indications:
      'Treatment of community-acquired pneumonia (CAP) and complicated skin and skin structure infections (cSSSI, including diabetic foot infections) in adults.',
    adultDosage:
      '400 mg infused intravenously once daily at a constant rate over 60 minutes (total oral + IV duration: 7–14 days for CAP; 7–21 days for cSSSI).',
    contraindications:
      'Hypersensitivity to moxifloxacin or other quinolones, pregnancy and lactation, age <18 years, history of quinolone-related tendon disorder, congenital/acquired QT prolongation, uncorrected hypokalaemia, clinically relevant bradycardia or heart failure, concomitant Class IA/III antiarrhythmics or other QT-prolonging drugs, and severe hepatic impairment (Child-Pugh C).',
    sideEffects:
      'Infusion-site reactions, nausea, diarrhoea, dizziness, QTc prolongation, hepatic transaminase elevation, and tendinitis/tendon rupture.',
    storageConditions:
      'Do not store below 15°C (precipitation may occur at cool temperatures, which redissolves at room temperature).',
    specialties: ['Pulmonology', 'Infectious Diseases', 'Critical Care', 'Internal Medicine'],
    sourceTitle: 'UK EMC — Avelox 400 mg/250 mL Solution for Infusion (moxifloxacin) SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6771/smpc',
  },

  // =========================================================================
  // 3. WOMEN’S HEALTHCARE — YASMIN, YAZ, DIANE-35, VISANNE, MIRENA, PROGYNOVA, PRIMOLUT N (7 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Yasmin 3 mg/0.03 mg',
    brandNameAr: 'ياسمين 3 ملغم/0.03 ملغم',
    genericName: 'Drospirenone + Ethinylestradiol',
    drugClassNameEn: 'Combined Oral Contraceptives (Fourth-Generation Progestogen with Antimineralocorticoid Activity)',
    dosageForm: 'Film-coated tablet',
    strength: '3 mg / 0.03 mg',
    route: 'Oral',
    packSize: '21 film-coated tablets',
    indications:
      'Oral contraception in women (with antimineralocorticoid and antiandrogenic properties beneficial in hormone-related fluid retention and acne/seborrhoea).',
    adultDosage:
      'One tablet taken orally daily at about the same time each day for 21 consecutive days, followed by a 7-day tablet-free interval during which a withdrawal bleed usually occurs.',
    contraindications:
      'Presence or risk of venous thromboembolism (VTE) or arterial thromboembolism (ATE), history of migraine with focal neurological symptoms, severe hepatic disease or liver tumours, severe or acute renal failure, undiagnosed vaginal bleeding, known or suspected sex-steroid-influenced malignancies, and concomitant hepatitis C regimen containing ombitasvir/paritaprevir/ritonavir and dasabuvir.',
    sideEffects:
      'Mood swings, depressive mood, headache, migraine, nausea, breast pain/tenderness, menstrual irregularities, unscheduled uterine bleeding, and increased risk of venous/arterial thromboembolism.',
    storageConditions:
      'Store below 25°C in the original blister package.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'UK EMC — Yasmin 0.03 mg / 3 mg Film-Coated Tablets (ethinylestradiol / drospirenone) SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1607/smpc',
  },
  {
    brandName: 'Yaz 3 mg/0.02 mg',
    brandNameAr: 'ياز 3 ملغم/0.02 ملغم',
    genericName: 'Drospirenone + Ethinylestradiol',
    drugClassNameEn: 'Low-Dose Combined Oral Contraceptives (24/4 Regimen)',
    dosageForm: 'Film-coated tablet',
    strength: '3 mg / 0.02 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (24 light pink active tablets + 4 white placebo tablets)',
    indications:
      'Oral contraception, treatment of symptoms of premenstrual dysphoric disorder (PMDD) in women who choose to use an oral contraceptive, and treatment of moderate acne vulgaris in women at least 14 years of age who have no known contraindications to oral contraceptive therapy.',
    adultDosage:
      'One tablet taken orally daily at the same time every day for 28 consecutive days in the order directed on the blister pack (1 light pink active tablet daily for 24 days, followed by 1 white inert tablet daily for 4 days), starting the next pack immediately without a gap.',
    contraindications:
      'Renal impairment, adrenal insufficiency, presence or high risk of arterial or venous thrombotic diseases (including women >35 years who smoke), breast cancer or other estrogen/progestin-sensitive cancer, liver tumours or liver disease, undiagnosed abnormal uterine bleeding, pregnancy, and concomitant hepatitis C regimens containing ombitasvir/paritaprevir/ritonavir.',
    sideEffects:
      'Headache/migraine, menstrual irregularities (spotting, breakthrough bleeding), nausea/vomiting, breast pain/tenderness, mood changes, hyperkalaemia (in high-risk patients), and venous/arterial thromboembolism.',
    storageConditions:
      'Store at 25°C (excursions permitted to 15°C–30°C).',
    specialties: ['Obstetrics & Gynecology', 'Dermatology', 'Endocrinology'],
    sourceTitle: 'FDA Prescribing Information — Yaz (drospirenone and ethinyl estradiol) Tablets',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021676s020lbl.pdf',
  },
  {
    brandName: 'Diane-35 2 mg/0.035 mg',
    brandNameAr: 'ديان-35 2 ملغم/0.035 ملغم',
    genericName: 'Cyproterone + Ethinylestradiol',
    drugClassNameEn: 'Antiandrogen and Oestrogen Combinations',
    dosageForm: 'Coated tablet',
    strength: '2 mg / 0.035 mg',
    route: 'Oral',
    packSize: '21 coated tablets',
    indications:
      'Treatment of moderate to severe acne related to androgen-sensitivity (with or without seborrhoea) and/or hirsutism in women of reproductive age, after topical therapy or systemic antibiotic treatments have failed (also acts as a hormonal contraceptive and must not be used in combination with another hormonal contraceptive).',
    adultDosage:
      'One tablet daily for 21 consecutive days (starting on Day 1 of the menstrual cycle), followed by a 7-day tablet-free interval; discontinue 3 to 4 cycles after the treated condition has completely resolved.',
    contraindications:
      'Concomitant use with another hormonal contraceptive, current or past venous or arterial thrombosis/thromboembolism, history of migraine with focal neurological symptoms, severe or multiple risk factors for thrombosis, meningioma or history of meningioma, severe hepatic disease, known or suspected sex-steroid-influenced malignancies, and pregnancy or breast-feeding.',
    sideEffects:
      'Nausea, abdominal pain, weight increase, headache, depressed mood, altered mood, breast pain and tenderness, and increased risk of venous and arterial thromboembolism.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Obstetrics & Gynecology', 'Dermatology', 'Endocrinology'],
    sourceTitle: 'EMA Referral — Diane-35 (cyproterone acetate 2 mg / ethinylestradiol 35 mcg) Harmonised Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/diane-35-other-medicines-containing-cyproterone-acetate-2-mg-ethinylestradiol-35-micrograms',
  },
  {
    brandName: 'Visanne 2 mg',
    brandNameAr: 'فيزان 2 ملغم',
    genericName: 'Dienogest',
    drugClassNameEn: 'Selective Progestogens for Endometriosis',
    dosageForm: 'Tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of endometriosis (management of endometriosis-associated pelvic pain and reduction of endometriotic lesions).',
    adultDosage:
      'One 2 mg tablet taken orally daily without any break, preferably at the same time each day with some liquid as needed, with or without food. Tablets must be taken continuously regardless of vaginal bleeding; start the next pack immediately after finishing the previous pack.',
    contraindications:
      'Active venous thromboembolic disorder, arterial and cardiovascular disease (myocardial infarction, cerebrovascular accident, ischaemic heart disease) past or present, diabetes mellitus with vascular involvement, presence or history of severe hepatic disease or liver tumours, known or suspected sex hormone-dependent malignancies, and undiagnosed vaginal bleeding.',
    sideEffects:
      'Headache, breast discomfort, depressed mood, sleep disorder, nervousness, loss of libido, acne, alopecia, weight increase, and altered menstrual bleeding pattern (spotting, irregular bleeding, or amenorrhoea).',
    storageConditions:
      'Store in the original package in order to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Bayer Official Product Monograph — Visanne (dienogest 2 mg) Tablets',
    sourceUrl: 'https://bag-p-001.sitecorecontenthub.cloud/api/public/content/visanne-pm-en-ba86abb9d38e4ae4850bf1fed0ad6ac9',
  },
  {
    brandName: 'Mirena 52 mg (20 mcg/24 h)',
    brandNameAr: 'ميرينا 52 ملغم (20 ميكروغرام/24 ساعة)',
    genericName: 'Levonorgestrel',
    drugClassNameEn: 'Levonorgestrel-Releasing Intrauterine Delivery Systems (IUS)',
    dosageForm: 'Intrauterine delivery system',
    strength: '52 mg levonorgestrel (initial release 20 mcg / 24 hours)',
    route: 'Intrauterine',
    packSize: '1 sterile intrauterine system with EvoInserter',
    indications:
      'Contraception, idiopathic menorrhagia (heavy menstrual bleeding), and protection from endometrial hyperplasia during oestrogen replacement therapy.',
    adultDosage:
      'One system inserted into the uterine cavity by a trained healthcare professional within 7 days of the onset of menstruation. Effective for up to 8 years for contraception, up to 5–8 years for idiopathic menorrhagia (replace if symptoms return), and 5 years for endometrial protection during oestrogen replacement therapy.',
    contraindications:
      'Known or suspected pregnancy, current or recurrent pelvic inflammatory disease, lower genital tract infection, postpartum endometritis, infected abortion during the past 3 months, cervicitis, cervical dysplasia, uterine or cervical malignancy, progestogen-dependent tumours (breast cancer), abnormal uterine bleeding of unknown aetiology, congenital or acquired uterine anomaly distorting the uterine cavity, and acute liver disease or liver tumour.',
    sideEffects:
      'Changes in menstrual bleeding pattern (initial spotting/prolonged bleeding followed by oligomenorrhoea or amenorrhoea), benign functional ovarian cysts, pelvic/abdominal pain, headache, breast tenderness, acne, depressed mood, and rare uterine perforation or device expulsion.',
    storageConditions:
      'Store in the original package; keep the blister in the outer carton to protect from light.',
    specialties: ['Obstetrics & Gynecology'],
    sourceTitle: 'UK EMC — Mirena 20 micrograms/24 hours Intrauterine Delivery System (levonorgestrel) SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1132/smpc',
  },
  {
    brandName: 'Progynova 2 mg',
    brandNameAr: 'بروجينوفا 2 ملغم',
    genericName: 'Estradiol',
    drugClassNameEn: 'Natural Oestrogens for Hormone Replacement Therapy (HRT)',
    dosageForm: 'Sugar-coated tablet',
    strength: '2 mg (as estradiol valerate)',
    route: 'Oral',
    packSize: '28 sugar-coated tablets (or 84 tablets)',
    indications:
      'Hormone replacement therapy (HRT) for oestrogen deficiency symptoms in peri- and postmenopausal women; and prevention of osteoporosis in postmenopausal women at high risk of future fractures who are intolerant of, or contraindicated for, other medicinal products approved for the prevention of osteoporosis.',
    adultDosage:
      'One 2 mg tablet taken orally daily without a break. In women with an intact uterus, an appropriate progestogen must be added for at least 12 to 14 days of each 28-day cycle to prevent oestrogen-induced endometrial hyperplasia.',
    contraindications:
      'Known, past, or suspected breast cancer; known or suspected oestrogen-dependent malignant tumours (endometrial cancer); undiagnosed genital bleeding; untreated endometrial hyperplasia; previous or current venous thromboembolism (DVT, PE) or arterial thromboembolic disease; acute liver disease; and porphyria.',
    sideEffects:
      'Breast tenderness/enlargement, breakthrough bleeding or spotting, nausea, abdominal pain, headache, weight change, oedema, and increased risk of venous thromboembolism or endometrial hyperplasia if unopposed in women with a uterus.',
    storageConditions:
      'Store below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'UK EMC — Progynova 2 mg Tablets (estradiol valerate) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1417/smpc',
  },
  {
    brandName: 'Primolut N 5 mg',
    brandNameAr: 'بريمولوت إن 5 ملغم',
    genericName: 'Norethisterone',
    drugClassNameEn: 'Oral Progestogens',
    dosageForm: 'Tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Dysfunctional uterine bleeding (metropathia haemorrhagica), premenstrual syndrome, postponement of menstruation, menorrhagia, dysmenorrhoea, and endometriosis.',
    adultDosage:
      'Dysfunctional uterine bleeding: 1 tablet (5 mg) three times daily for 10 days. Postponement of menstruation: 1 tablet (5 mg) three times daily starting 3 days before expected menstruation for no more than 10–14 days. Endometriosis: start between Day 1 and Day 5 with 1 tablet twice daily, increasing to 2 tablets twice daily if spotting occurs, for 4–6 months.',
    contraindications:
      'Pregnancy, lactation, active venous thromboembolic disorders or history of VTE, arterial and cardiovascular disease (MI, stroke, ischaemic heart disease), diabetes mellitus with vascular involvement, severe hepatic disease or liver tumours, sex-hormone-dependent malignancies, and undiagnosed vaginal bleeding.',
    sideEffects:
      'Uterine/vaginal bleeding including spotting, hypomenorrhoea, amenorrhoea, headache, migraine, nausea, oedema, and visual disturbances.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'UK EMC — Primolut N 5 mg Tablets (norethisterone) Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1135.pdf',
  },

  // =========================================================================
  // 4. ONCOLOGY, OPHTHALMOLOGY, NEUROLOGY & DERMATOLOGY — NEXAVAR, STIVARGA, NUBEQA, EYLEA, BETAFERON, CANESTEN (7 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Nexavar 200 mg',
    brandNameAr: 'نيكسافار 200 ملغم',
    genericName: 'Sorafenib',
    drugClassNameEn: 'Multikinase (RAF/VEGFR/PDGFR) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '112 film-coated tablets',
    indications:
      'Treatment of hepatocellular carcinoma (HCC); treatment of patients with advanced renal cell carcinoma (RCC) who have failed prior interferon-alpha or interleukin-2 based therapy or are considered unsuitable for such therapy; and treatment of patients with progressive, locally advanced or metastatic, differentiated (papillary/follicular/Hürthle cell) thyroid carcinoma refractory to radioactive iodine.',
    adultDosage:
      'Recommended adult dose is 400 mg (two 200 mg tablets) twice daily (equivalent to a total daily dose of 800 mg), taken without food (at least 1 hour before or 2 hours after a meal) or with a low- or moderate-fat meal.',
    contraindications:
      'Hypersensitivity to sorafenib or any of the excipients.',
    sideEffects:
      'Hand-foot skin reaction (palmar-plantar erythrodysaesthesia), diarrhoea, alopecia, rash, fatigue, hypertension, weight loss, anorexia, haemorrhage, and hypophosphataemia.',
    storageConditions:
      'Do not store above 25°C.',
    specialties: ['Oncology', 'Hepatology', 'Endocrinology'],
    sourceTitle: 'EMA EPAR — Nexavar (sorafenib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/nexavar',
  },
  {
    brandName: 'Stivarga 40 mg',
    brandNameAr: 'ستيفارغا 40 ملغم',
    genericName: 'Regorafenib',
    drugClassNameEn: 'Oral Multikinase (Angiogenic, Stromal, and Oncogenic) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '84 film-coated tablets (3 bottles x 28 tablets)',
    indications:
      'Monotherapy for the treatment of adult patients with metastatic colorectal cancer (mCRC) who have been previously treated with, or are not considered candidates for, available therapies (fluoropyrimidine-based chemotherapy, anti-VEGF therapy, and anti-EGFR therapy); unresectable or metastatic gastrointestinal stromal tumours (GIST) who progressed on or are intolerant to prior imatinib and sunitinib; and hepatocellular carcinoma (HCC) who have been previously treated with sorafenib.',
    adultDosage:
      'Recommended dose is 160 mg (four 40 mg tablets) taken orally once daily for 3 weeks (21 days) followed by 1 week (7 days) off therapy to comprise a 4-week cycle; take at the same time each day after a light meal containing <30% fat.',
    contraindications:
      'Hypersensitivity to regorafenib or any of the excipients.',
    sideEffects:
      'Hand-foot skin reaction, asthenia/fatigue, decreased appetite and food intake, hypertension, diarrhoea, dysphonia, infection, pain, weight loss, hyperbilirubinaemia, transaminase elevation, and haemorrhage.',
    storageConditions:
      'Store in the original bottle with the desiccant capsule inside in order to protect from moisture; discard 7 weeks after first opening the bottle.',
    specialties: ['Oncology', 'Gastroenterology', 'Hepatology'],
    sourceTitle: 'EMA EPAR — Stivarga (regorafenib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/stivarga',
  },
  {
    brandName: 'Nubeqa 300 mg',
    brandNameAr: 'نوبيكا 300 ملغم',
    genericName: 'Darolutamide',
    drugClassNameEn: 'Androgen Receptor Inhibitors (ARIs)',
    dosageForm: 'Film-coated tablet',
    strength: '300 mg',
    route: 'Oral',
    packSize: '112 film-coated tablets',
    indications:
      'Treatment of adult men with non-metastatic castration-resistant prostate cancer (nmCRPC) who are at high risk of developing metastatic disease; and treatment of adult men with metastatic hormone-sensitive prostate cancer (mHSPC) in combination with docetaxel and androgen deprivation therapy.',
    adultDosage:
      'Recommended dose is 600 mg (two 300 mg film-coated tablets) taken orally twice daily (equivalent to a total daily dose of 1200 mg) WITH FOOD. Medical castration with an LHRH analogue should be continued during treatment in patients not surgically castrated.',
    contraindications:
      'Hypersensitivity to darolutamide or any of the excipients, and women who are or may become pregnant.',
    sideEffects:
      'Fatigue/asthenic conditions, rash, hypertension, neutropenia, increased bilirubin, and increased AST/ALT.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR — Nubeqa (darolutamide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/nubeqa',
  },
  {
    brandName: 'Eylea 40 mg/mL',
    brandNameAr: 'إيليا 40 ملغم/مل',
    genericName: 'Aflibercept',
    drugClassNameEn: 'Anti-VEGF Recombinant Fusion Proteins (Intravitreal)',
    dosageForm: 'Solution for injection in vial / pre-filled syringe',
    strength: '40 mg / mL (delivers 2 mg in 0.05 mL)',
    route: 'Intravitreal',
    packSize: '1 vial or 1 pre-filled syringe',
    indications:
      'Treatment of adults with neovascular (wet) age-related macular degeneration (AMD), visual impairment due to macular oedema secondary to retinal vein occlusion (branch RVO or central RVO), visual impairment due to diabetic macular oedema (DME), and visual impairment due to myopic choroidal neovascularisation (myopic CNV); and retinopathy of prematurity (ROP) in preterm infants.',
    adultDosage:
      'Wet AMD: 2 mg (0.05 mL) intravitreal injection monthly for 3 consecutive doses, then extended to every 2 months (or treat-and-extend up to 16-week intervals). DME: 2 mg monthly for 5 consecutive doses, then every 2 months (or treat-and-extend). Must be administered only by a qualified physician experienced in intravitreal injections.',
    contraindications:
      'Hypersensitivity to aflibercept or any excipient, active or suspected ocular or periocular infection, and active severe intraocular inflammation.',
    sideEffects:
      'Conjunctival haemorrhage, eye pain, reduced visual acuity, vitreous floaters, vitreous detachment, cataract, increased intraocular pressure, and rare endophthalmitis or retinal detachment.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR — Eylea (aflibercept) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/eylea',
  },
  {
    brandName: 'Betaferon 250 mcg/mL',
    brandNameAr: 'بيتافيرون 250 ميكروغرام/مل',
    genericName: 'Interferon beta-1b',
    drugClassNameEn: 'Disease-Modifying Interferons for Multiple Sclerosis',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '250 mcg (8.0 million IU) per mL when reconstituted',
    route: 'Subcutaneous',
    packSize: '15 vials powder + 15 pre-filled syringes of 0.54% NaCl solvent (1.2 mL)',
    indications:
      'Treatment of patients with a single demyelinating event with an active inflammatory process at high risk of developing clinically definite multiple sclerosis; patients with relapsing-remitting multiple sclerosis (RRMS) with two or more relapses within the last two years; and patients with secondary progressive multiple sclerosis (SPMS) with active disease evidenced by relapses.',
    adultDosage:
      'Recommended maintenance dose is 250 mcg (8.0 million IU) contained in 1 mL of the reconstituted solution injected subcutaneously every other day (initiated with a titration schedule starting at 62.5 mcg / 0.25 mL every other day and increasing slowly to 250 mcg / 1.0 mL by injection 10).',
    contraindications:
      'Hypersensitivity to natural or recombinant interferon beta, human albumin, or any excipient; patients with current severe depression and/or suicidal ideation; and patients with decompensated liver disease.',
    sideEffects:
      'Flu-like symptom complex (fever, chills, arthralgia, malaise, sweating, headache, myalgia), injection-site reactions (redness, swelling, pain, rare injection-site necrosis), lymphopenia, leukopenia, and elevated hepatic transaminases.',
    storageConditions:
      'Do not store above 25°C; do not freeze. After reconstitution, immediate use is recommended (may be stored at 2°C–8°C for up to 3 hours).',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Betaferon (interferon beta-1b) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/betaferon',
  },
  {
    brandName: 'Canesten 1% Cream',
    brandNameAr: 'كانيستين 1%',
    category: 'otc_drug',
    genericName: 'Clotrimazole',
    drugClassNameEn: 'Imidazole Topical Antifungals',
    dosageForm: 'Cream',
    strength: '1% w/w (10 mg/g)',
    route: 'Topical',
    packSize: '1 tube x 20 g',
    indications:
      'Treatment of fungal skin infections due to dermatophytes, yeasts, moulds, and other fungi, including ringworm (tinea) infections, athlete’s foot (tinea pedis), paronychia, pityriasis versicolor, erythrasma, intertrigo, fungal nappy rash, and candidal vulvitis and candidal balanitis.',
    adultDosage:
      'Apply thinly and evenly to the affected area 2 to 3 times daily and rub in gently; continue treatment for at least 2 weeks for candida infections or at least 1 month for dermatophyte infections to prevent relapse.',
    contraindications:
      'Hypersensitivity to clotrimazole or any of the excipients (including cetostearyl alcohol or benzyl alcohol).',
    sideEffects:
      'Local mild burning, stinging, erythema, pruritus, peeling, or allergic contact dermatitis at the application site.',
    storageConditions:
      'Store below 25°C.',
    specialties: ['Dermatology', 'Obstetrics & Gynecology', 'General Practice'],
    sourceTitle: 'UK EMC — Canesten 1% w/w Cream (clotrimazole) Summary of Product Characteristics',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1282/smpc',
  },
  {
    brandName: 'Canesten 500 mg Pessary',
    brandNameAr: 'كانيستين 500 ملغم',
    category: 'otc_drug',
    genericName: 'Clotrimazole',
    drugClassNameEn: 'Imidazole Vaginal Antifungals',
    dosageForm: 'Pessary (vaginal tablet)',
    strength: '500 mg',
    route: 'Vaginal',
    packSize: '1 pessary + 1 applicator',
    indications:
      'Treatment of candidal vaginitis (vulvovaginal candidiasis / thrush).',
    adultDosage:
      'Insert one 500 mg pessary as a single dose deeply into the vagina at night using the supplied applicator; a second treatment may be carried out if necessary after 7 days.',
    contraindications:
      'Hypersensitivity to clotrimazole or any excipient.',
    sideEffects:
      'Local vaginal burning, itching, erythema, irritation, pelvic cramps, or slight vaginal discharge; may reduce the effectiveness and safety of latex products such as condoms and diaphragms.',
    storageConditions:
      'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Obstetrics & Gynecology', 'General Practice'],
    sourceTitle: 'UK EMC — Canesten (clotrimazole) Official Product Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1282/smpc',
  },
];

export const BAYER_PRODUCTS: AiProductDraft[] = BAYER_COMPACT_PRODUCTS.map(toBayerProductDraft);
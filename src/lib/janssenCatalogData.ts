import type { AiDraftSource, AiProductDraft } from './catalog';

const JANSSEN_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactJanssenDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  drugClass: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

function toJanssenProductDraft(item: CompactJanssenDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.genericName.split(' + ').map((s) => s.trim()),
    drugClass: item.drugClass,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.approvedIndications,
      usualAdultDose: item.usualAdultDose,
      contraindications: item.contraindications,
      commonAdverseEffects: item.commonAdverseEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: JANSSEN_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Janssen Pharmaceutica NV (Johnson & Johnson Innovative Medicine) regulatory monograph (EMA EPAR / EMA Referral / UK EMC); saved as draft pending verification.',
  };
}

const JANSSEN_COMPACT_PRODUCTS: CompactJanssenDrug[] = [
  // ===========================================================================
  // 1. NEUROSCIENCE, PSYCHIATRY, EPILEPSY & SEVERE PAIN (25 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Risperdal 1 mg',
    brandNameAr: 'ريسبردال 1 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX08)',
    strength: '1 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 or 60 film-coated tablets',
    approvedIndications:
      'Treatment of schizophrenia; treatment of moderate to severe manic episodes associated with bipolar disorders; short-term treatment (up to 6 weeks) of persistent aggression in patients with moderate to severe Alzheimer’s dementia unresponsive to non-pharmacological approaches; short-term symptomatic treatment (up to 6 weeks) of persistent aggression in conduct disorder in children from the age of 5 years and adolescents with subaverage intellectual functioning or mental retardation.',
    usualAdultDose:
      'Schizophrenia: start with 2 mg/day (may increase on Day 2 to 4 mg/day); usual optimal dose is 4 to 6 mg/day administered once daily or in two divided doses. Bipolar mania: start with 2 mg once daily, adjusted in 1 mg/day increments to 1 to 6 mg/day. Persistent aggression in Alzheimer’s dementia: start 0.25 mg twice daily, optimum 0.5 mg twice daily.',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Insomnia, sedation/somnolence, parkinsonism, akathisia, dystonia, dizziness, headache, tremor, hyperprolactinaemia, weight gain, increased appetite, tachycardia, hypertension, dyspnoea, abdominal pain, nausea, vomiting, constipation, dry mouth, rash, urinary incontinence.',
    storageConditions:
      'Do not store above 30°C. Protect from light.',
    specialties: ['Psychiatry', 'Neurology', 'Paediatrics'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal',
  },
  {
    brandName: 'Risperdal 2 mg',
    brandNameAr: 'ريسبردال 2 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX08)',
    strength: '2 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 or 60 film-coated tablets',
    approvedIndications:
      'Treatment of schizophrenia and moderate to severe manic episodes associated with bipolar disorders in adults.',
    usualAdultDose:
      'Schizophrenia and bipolar mania: 2 to 6 mg/day orally once daily or in two divided doses.',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Parkinsonism, akathisia, somnolence/sedation, insomnia, headache, hyperprolactinaemia, weight increased, tachycardia, gastrointestinal discomfort.',
    storageConditions:
      'Do not store above 30°C. Protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal',
  },
  {
    brandName: 'Risperdal 4 mg',
    brandNameAr: 'ريسبردال 4 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX08)',
    strength: '4 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 or 60 film-coated tablets',
    approvedIndications:
      'Maintenance treatment of schizophrenia and moderate to severe manic episodes associated with bipolar disorders in adults.',
    usualAdultDose:
      'Usual effective maintenance dose in schizophrenia: 4 to 6 mg once daily (doses above 10 mg/day have not demonstrated greater efficacy and may increase extrapyramidal symptoms; maximum 16 mg/day).',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Parkinsonism, akathisia, dystonia, tremor, sedation, insomnia, headache, hyperprolactinaemia, weight gain, orthostatic hypotension.',
    storageConditions:
      'Do not store above 30°C. Protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal',
  },
  {
    brandName: 'Risperdal 1 mg/mL Oral Solution',
    brandNameAr: 'ريسبردال 1 ملغ/مل محلول فموي',
    genericName: 'Risperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX08)',
    strength: '1 mg/mL',
    dosageForm: 'Oral solution',
    route: 'Oral',
    packSize: '1 bottle (30 mL or 100 mL) with calibrated dosing pipette',
    approvedIndications:
      'Schizophrenia; manic episodes in bipolar disorder; short-term treatment of persistent aggression in moderate to severe Alzheimer’s dementia; short-term symptomatic treatment of persistent aggression in conduct disorder in children (≥5 years) and adolescents.',
    usualAdultDose:
      'Measured accurately with the supplied calibrated pipette: 0.25 mg to 6 mg/day depending on indication and age. Oral solution may be mixed with mineral water, orange juice, or black coffee, but must NOT be mixed with tea.',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Somnolence, insomnia, parkinsonism, akathisia, headache, increased appetite, weight gain, hyperprolactinaemia.',
    storageConditions:
      'Do not store above 30°C. Do not refrigerate or freeze. Use within 3 months of first opening.',
    specialties: ['Psychiatry', 'Neurology', 'Paediatrics'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal',
  },
  {
    brandName: 'Risperdal Consta 25 mg',
    brandNameAr: 'ريسبردال كونستا 25 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Long-Acting Injectable Atypical Antipsychotics (N05AX08)',
    strength: '25 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection',
    route: 'Intramuscular (deep deltoid or gluteal)',
    packSize: '1 vial microsphere powder + 1 pre-filled syringe of 2 mL diluent + Needlemate needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in patients currently stabilised with oral antipsychotics.',
    usualAdultDose:
      '25 mg administered by deep intramuscular deltoid or gluteal injection every two weeks. Oral risperidone (or previous antipsychotic) supplementation must be continued during the first 3 weeks after the first Risperdal Consta injection to ensure adequate plasma concentrations.',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Insomnia, anxiety, depression, parkinsonism, akathisia, headache, dizziness, somnolence, weight gain, hyperprolactinaemia, upper respiratory tract infection, injection site pain/reaction.',
    storageConditions:
      'Store the entire dose pack in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal Consta (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal-consta',
  },
  {
    brandName: 'Risperdal Consta 37.5 mg',
    brandNameAr: 'ريسبردال كونستا 37.5 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Long-Acting Injectable Atypical Antipsychotics (N05AX08)',
    strength: '37.5 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection',
    route: 'Intramuscular (deep deltoid or gluteal)',
    packSize: '1 vial microsphere powder + 1 pre-filled syringe of 2 mL diluent + Needlemate needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in patients currently stabilised with oral antipsychotics.',
    usualAdultDose:
      '37.5 mg by deep intramuscular deltoid or gluteal injection every two weeks (for patients stabilised on >4 mg/day oral risperidone or titrated upward after at least 4 weeks at a lower dose).',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Parkinsonism, akathisia, insomnia, depression, anxiety, weight gain, hyperprolactinaemia, injection site pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal Consta (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal-consta',
  },
  {
    brandName: 'Risperdal Consta 50 mg',
    brandNameAr: 'ريسبردال كونستا 50 ملغ',
    genericName: 'Risperidone',
    drugClass: 'Long-Acting Injectable Atypical Antipsychotics (N05AX08)',
    strength: '50 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection',
    route: 'Intramuscular (deep deltoid or gluteal)',
    packSize: '1 vial microsphere powder + 1 pre-filled syringe of 2 mL diluent + Needlemate needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in patients currently stabilised with oral antipsychotics.',
    usualAdultDose:
      '50 mg by deep intramuscular deltoid or gluteal injection every two weeks (maximum recommended dose: 50 mg every two weeks).',
    contraindications:
      'Hypersensitivity to risperidone or to any of the excipients.',
    commonAdverseEffects:
      'Parkinsonism, akathisia, tremor, sedation, insomnia, weight gain, hyperprolactinaemia, injection site reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA Article 30 Referral – Risperdal Consta (risperidone) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/risperdal-consta',
  },
  {
    brandName: 'Invega 3 mg',
    brandNameAr: 'إنفيغا 3 ملغ',
    genericName: 'Paliperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX13)',
    strength: '3 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Treatment of schizophrenia in adults and in adolescents aged 15 years and older; treatment of schizoaffective disorder in adults.',
    usualAdultDose:
      'Recommended starting and maintenance dose in adolescents (≥15 years, <51 kg) or renally impaired adults: 3 mg once daily in the morning; standard adult starting dose is 6 mg once daily (dosing range 3 to 12 mg once daily). Swallow whole with liquid; do not chew, divide, or crush (the non-absorbable OROS shell is eliminated in faeces).',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient; patients with severe gastrointestinal narrowing (pathologic or iatrogenic) or dysphagia.',
    commonAdverseEffects:
      'Insomnia, parkinsonism, akathisia, sedation/somnolence, headache, tachycardia, dystonia, tremor, orthostatic hypotension, weight gain, hyperprolactinaemia, upper respiratory tract infection, nausea, constipation.',
    storageConditions:
      'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Invega (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/invega',
  },
  {
    brandName: 'Invega 6 mg',
    brandNameAr: 'إنفيغا 6 ملغ',
    genericName: 'Paliperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX13)',
    strength: '6 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Treatment of schizophrenia in adults and adolescents (≥15 years); treatment of schizoaffective disorder in adults.',
    usualAdultDose:
      'Recommended adult dose for schizophrenia and schizoaffective disorder: 6 mg once daily in the morning without the need for initial dose titration (adjustable within 3 to 12 mg once daily). Standardise administration in relation to breakfast (always fasting or always with breakfast).',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Insomnia, parkinsonism, akathisia, headache, tachycardia, somnolence, weight gain, hyperprolactinaemia.',
    storageConditions:
      'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Invega (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/invega',
  },
  {
    brandName: 'Invega 9 mg',
    brandNameAr: 'إنفيغا 9 ملغ',
    genericName: 'Paliperidone',
    drugClass: 'Second-Generation (Atypical) Antipsychotics (N05AX13)',
    strength: '9 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Treatment of schizophrenia and schizoaffective disorder in adults requiring titration above 6 mg/day.',
    usualAdultDose:
      '9 mg once daily in the morning (titrated in increments of 3 mg/day at intervals of more than 5 days; maximum 12 mg once daily). Swallow whole; do not chew, divide, or crush.',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Parkinsonism, akathisia, dystonia, insomnia, somnolence, tachycardia, weight gain, hyperprolactinaemia.',
    storageConditions:
      'Do not store above 30°C. Store in the original package to protect from moisture.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Invega (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/invega',
  },
  {
    brandName: 'Xeplion 75 mg',
    brandNameAr: 'زيبليون 75 ملغ سرنجة',
    genericName: 'Paliperidone',
    drugClass: 'Monthly Long-Acting Injectable Atypical Antipsychotics (N05AX13)',
    strength: '75 mg (equivalent to 117 mg paliperidone palmitate)',
    dosageForm: 'Prolonged-release suspension for injection in pre-filled syringe',
    route: 'Intramuscular (deltoid or gluteal)',
    packSize: '1 pre-filled syringe + 2 safety needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in adult patients stabilised with paliperidone or risperidone.',
    usualAdultDose:
      'Initiation: 150 mg on Day 1 and 100 mg on Day 8 (both in the deltoid muscle). Monthly maintenance dose: 75 mg once monthly in either the deltoid or gluteal muscle (range 25 to 150 mg monthly based on tolerability and efficacy).',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Insomnia, headache, anxiety, upper respiratory tract infection, injection site reaction/pain, parkinsonism, akathisia, weight increased, hyperprolactinaemia, tachycardia.',
    storageConditions:
      'Do not store above 30°C.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Xeplion (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeplion',
  },
  {
    brandName: 'Xeplion 100 mg',
    brandNameAr: 'زيبليون 100 ملغ سرنجة',
    genericName: 'Paliperidone',
    drugClass: 'Monthly Long-Acting Injectable Atypical Antipsychotics (N05AX13)',
    strength: '100 mg (equivalent to 156 mg paliperidone palmitate)',
    dosageForm: 'Prolonged-release suspension for injection in pre-filled syringe',
    route: 'Intramuscular (deltoid or gluteal)',
    packSize: '1 pre-filled syringe + 2 safety needles',
    approvedIndications:
      'Day 8 initiation loading dose and monthly maintenance treatment of schizophrenia in adult patients stabilised with paliperidone or risperidone.',
    usualAdultDose:
      'Day 8 initiation dose: 100 mg injected into the deltoid muscle one week after the Day 1 150 mg deltoid dose. Monthly maintenance: 100 mg once monthly in deltoid or gluteal muscle when clinically indicated.',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Insomnia, headache, parkinsonism, akathisia, weight gain, hyperprolactinaemia, injection site pain.',
    storageConditions:
      'Do not store above 30°C.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Xeplion (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeplion',
  },
  {
    brandName: 'Xeplion 150 mg',
    brandNameAr: 'زيبليون 150 ملغ سرنجة',
    genericName: 'Paliperidone',
    drugClass: 'Monthly Long-Acting Injectable Atypical Antipsychotics (N05AX13)',
    strength: '150 mg (equivalent to 234 mg paliperidone palmitate)',
    dosageForm: 'Prolonged-release suspension for injection in pre-filled syringe',
    route: 'Intramuscular (deltoid or gluteal)',
    packSize: '1 pre-filled syringe + 2 safety needles',
    approvedIndications:
      'Day 1 initiation loading dose and high-dose monthly maintenance treatment of schizophrenia in adult patients stabilised with paliperidone or risperidone.',
    usualAdultDose:
      'Day 1 initiation dose: 150 mg injected into the deltoid muscle (followed by 100 mg deltoid on Day 8). Monthly maintenance: up to 150 mg once monthly in deltoid or gluteal muscle in patients who are overweight/obese or require higher maintenance exposure.',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Insomnia, headache, parkinsonism, akathisia, weight gain, hyperprolactinaemia, injection site reactions.',
    storageConditions:
      'Do not store above 30°C.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Xeplion (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeplion',
  },
  {
    brandName: 'Trevicta 350 mg',
    brandNameAr: 'تريفيكتا 350 ملغ سرنجة',
    genericName: 'Paliperidone',
    drugClass: '3-Monthly Long-Acting Injectable Atypical Antipsychotics (N05AX13)',
    strength: '350 mg (equivalent to 546 mg paliperidone palmitate)',
    dosageForm: 'Prolonged-release suspension for injection in pre-filled syringe',
    route: 'Intramuscular (deltoid or gluteal)',
    packSize: '1 pre-filled syringe + 2 thin-walled safety needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in adult patients who are clinically stable on 1-monthly paliperidone palmitate injectable (Xeplion) for at least 4 months.',
    usualAdultDose:
      'For patients stabilised on 100 mg monthly Xeplion: 350 mg Trevicta administered by deep intramuscular deltoid or gluteal injection once every 3 months (3.5-fold multiple of the last 1-monthly dose).',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Increased weight, upper respiratory tract infection, anxiety, headache, insomnia, akathisia, parkinsonism, injection site reaction.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Trevicta (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trevicta',
  },
  {
    brandName: 'Trevicta 525 mg',
    brandNameAr: 'تريفيكتا 525 ملغ سرنجة',
    genericName: 'Paliperidone',
    drugClass: '3-Monthly Long-Acting Injectable Atypical Antipsychotics (N05AX13)',
    strength: '525 mg (equivalent to 819 mg paliperidone palmitate)',
    dosageForm: 'Prolonged-release suspension for injection in pre-filled syringe',
    route: 'Intramuscular (deltoid or gluteal)',
    packSize: '1 pre-filled syringe + 2 thin-walled safety needles',
    approvedIndications:
      'Maintenance treatment of schizophrenia in adult patients who are clinically stable on 150 mg 1-monthly paliperidone palmitate injectable (Xeplion) for at least 4 months.',
    usualAdultDose:
      'For patients stabilised on 150 mg monthly Xeplion: 525 mg Trevicta administered by deep intramuscular deltoid or gluteal injection once every 3 months.',
    contraindications:
      'Hypersensitivity to paliperidone, risperidone, or any excipient.',
    commonAdverseEffects:
      'Increased weight, upper respiratory tract infection, headache, insomnia, akathisia, parkinsonism, hyperprolactinaemia, injection site pain.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Trevicta (paliperidone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trevicta',
  },
  {
    brandName: 'Spravato 28 mg',
    brandNameAr: 'سبرافاتو 28 ملغ بخاخ أنفي',
    genericName: 'Esketamine',
    drugClass: 'NMDA Receptor Antagonist Rapid-Acting Antidepressants (N06AX27)',
    strength: '28 mg (delivered in 2 sprays of 14 mg per device)',
    dosageForm: 'Nasal spray, solution',
    route: 'Nasal',
    packSize: '1, 2, or 3 single-use nasal spray devices (28 mg per device)',
    approvedIndications:
      'In combination with a SSRI or SNRI, for adults with treatment-resistant Major Depressive Disorder (TRD) who have not responded to at least two different treatments with antidepressants in the current moderate to severe depressive episode; co-administered with oral antidepressant therapy in adults with a moderate to severe episode of Major Depressive Disorder as acute short-term treatment for the rapid reduction of depressive symptoms which according to clinical judgement constitute a psychiatric emergency.',
    usualAdultDose:
      'Self-administered by the patient under the direct supervision of a healthcare professional: TRD induction (<65 years): 56 mg (two 28 mg devices) on Day 1, then 56 mg or 84 mg (three 28 mg devices) twice weekly in Weeks 1–4, then once weekly in Weeks 5–8, and every 1 or 2 weeks thereafter. Monitor blood pressure and observe patient for at least 2 hours post-dose.',
    contraindications:
      'Patients for whom an increase in blood pressure or intracranial pressure poses a serious risk: aneurysmal vascular disease (including intracranial, thoracic, or abdominal aorta, or peripheral arterial vessels); history of intracerebral haemorrhage; recent (within 6 weeks) cardiovascular event including myocardial infarction; hypersensitivity to esketamine, ketamine, or any excipient.',
    commonAdverseEffects:
      'Dissociation, dizziness, nausea, sedation/somnolence, headache, vertigo, hypoaesthesia, anxiety, lethargy, dysgeusia, transient blood pressure increased, vomiting.',
    storageConditions:
      'This medicinal product does not require any special storage conditions. Do not freeze.',
    specialties: ['Psychiatry'],
    sourceTitle: 'EMA EPAR – Spravato (esketamine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/spravato',
  },
  {
    brandName: 'Topamax 25 mg',
    brandNameAr: 'توباماكس 25 ملغ',
    genericName: 'Topiramate',
    drugClass: 'Broad-Spectrum Sulfamate-Substituted Monosaccharide Antiepileptics & Migraine Prophylactics (N03AX11)',
    strength: '25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    approvedIndications:
      'Monotherapy in adults, adolescents, and children over 6 years of age with partial seizures with or without secondary generalised seizures, and primary generalised tonic-clonic seizures; adjunctive therapy in children aged 2 years and above, adolescents, and adults with partial onset seizures, primary generalised tonic-clonic seizures, or seizures associated with Lennox-Gastaut syndrome; prophylaxis of migraine headache in adults after careful evaluation of alternative treatment options.',
    usualAdultDose:
      'Migraine prophylaxis: titrate at 25 mg/day weekly increments from 25 mg nightly to a target total daily dose of 100 mg/day (50 mg twice daily). Epilepsy monotherapy in adults: start 25 mg nightly for 1 week, titrate to 100–200 mg/day in 2 divided doses (maximum 500 mg/day).',
    contraindications:
      'Hypersensitivity to topiramate or any excipient; migraine prophylaxis in pregnancy and in women of childbearing potential not using highly effective contraception; epilepsy in pregnancy unless there is no suitable alternative treatment.',
    commonAdverseEffects:
      'Paraesthesia, somnolence, dizziness, fatigue, weight decreased, decreased appetite, bradyphrenia/cognitive slowing, word-finding difficulty, memory impairment, depression, anxiety, nephrolithiasis, metabolic acidosis, acute myopia and secondary angle-closure glaucoma.',
    storageConditions:
      'Do not store above 25°C. Keep the tablets in the original container/blister tightly closed to protect from moisture.',
    specialties: ['Neurology', 'Paediatrics'],
    sourceTitle: 'EMA Article 30 Referral – Topamax (topiramate) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/topamax',
  },
  {
    brandName: 'Topamax 50 mg',
    brandNameAr: 'توباماكس 50 ملغ',
    genericName: 'Topiramate',
    drugClass: 'Broad-Spectrum Sulfamate-Substituted Monosaccharide Antiepileptics & Migraine Prophylactics (N03AX11)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    approvedIndications:
      'Monotherapy and adjunctive therapy of partial onset seizures, primary generalised tonic-clonic seizures, and Lennox-Gastaut syndrome; prophylaxis of migraine headache in adults.',
    usualAdultDose:
      'Migraine prophylaxis maintenance: 50 mg twice daily (100 mg/day). Epilepsy monotherapy maintenance: 50 mg to 100 mg twice daily (100–200 mg/day).',
    contraindications:
      'Hypersensitivity to topiramate; pregnancy and women of childbearing potential not using highly effective contraception (strictly contraindicated in migraine prophylaxis, and in epilepsy unless no suitable alternative exists).',
    commonAdverseEffects:
      'Paraesthesia, weight decreased, anorexia, cognitive slowing, somnolence, dizziness, fatigue, mood disturbances, metabolic acidosis, nephrolithiasis.',
    storageConditions:
      'Do not store above 25°C. Protect from moisture.',
    specialties: ['Neurology', 'Paediatrics'],
    sourceTitle: 'EMA Article 30 Referral – Topamax (topiramate) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/topamax',
  },
  {
    brandName: 'Topamax 100 mg',
    brandNameAr: 'توباماكس 100 ملغ',
    genericName: 'Topiramate',
    drugClass: 'Broad-Spectrum Sulfamate-Substituted Monosaccharide Antiepileptics & Migraine Prophylactics (N03AX11)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    approvedIndications:
      'Monotherapy and adjunctive therapy in adults, adolescents, and children with partial onset seizures, primary generalised tonic-clonic seizures, or seizures associated with Lennox-Gastaut syndrome.',
    usualAdultDose:
      'Epilepsy monotherapy: 100 mg to 200 mg/day in 2 divided doses. Epilepsy adjunctive therapy in adults: 200 to 400 mg/day in 2 divided doses.',
    contraindications:
      'Hypersensitivity to topiramate; pregnancy and women of childbearing potential not using highly effective contraception.',
    commonAdverseEffects:
      'Paraesthesia, weight loss, cognitive and language impairment, somnolence, dizziness, fatigue, metabolic acidosis, renal calculi.',
    storageConditions:
      'Do not store above 25°C. Protect from moisture.',
    specialties: ['Neurology', 'Paediatrics'],
    sourceTitle: 'EMA Article 30 Referral – Topamax (topiramate) Harmonised Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/topamax',
  },
  {
    brandName: 'Concerta XL 18 mg',
    brandNameAr: 'كونسيرتا إكس إل 18 ملغ',
    genericName: 'Methylphenidate',
    drugClass: 'Centrally Acting Sympathomimetic Psychostimulants for ADHD (N06BA04)',
    strength: '18 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    approvedIndications:
      'Part of a comprehensive treatment programme for Attention Deficit Hyperactivity Disorder (ADHD) in children aged 6 years of age and over and adolescents when remedial measures alone prove insufficient.',
    usualAdultDose:
      'Starting dose for patients new to methylphenidate: 18 mg once daily in the morning, adjusted at weekly intervals in 18 mg increments up to a maximum of 54 mg/day (children) or 72 mg/day (adults where licensed). Swallow whole with liquid; must not be chewed, divided, or crushed.',
    contraindications:
      'Hypersensitivity to methylphenidate; glaucoma; phaeochromocytoma; during treatment with non-selective irreversible MAOIs or within 14 days of discontinuing an MAOI; hyperthyroidism or thyrotoxicosis; diagnosis or history of severe depression, anorexia nervosa, suicidal tendencies, psychotic symptoms, severe mood disorders, mania, or schizophrenia; severe cardiovascular or cerebrovascular disorders (severe hypertension, heart failure, arterial occlusive disease, angina, haemodynamically significant congenital heart disease, cardiomyopathies, MI, cerebral aneurysm).',
    commonAdverseEffects:
      'Insomnia, nervousness, headache, decreased appetite, weight and height velocity reduction in children, abdominal pain, nausea, dry mouth, tachycardia, palpitations, increased blood pressure, irritability, tics, affect lability.',
    storageConditions:
      'Do not store above 30°C. Keep the bottle tightly closed in order to protect from moisture.',
    specialties: ['Psychiatry', 'Paediatrics', 'Neurology'],
    sourceTitle: 'UK EMC Official SmPC – Concerta XL (methylphenidate) 18 mg, 27 mg, 36 mg & 54 mg Prolonged-Release Tablets',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6872/smpc',
  },
  {
    brandName: 'Concerta XL 36 mg',
    brandNameAr: 'كونسيرتا إكس إل 36 ملغ',
    genericName: 'Methylphenidate',
    drugClass: 'Centrally Acting Sympathomimetic Psychostimulants for ADHD (N06BA04)',
    strength: '36 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    approvedIndications:
      'Comprehensive treatment programme for Attention Deficit Hyperactivity Disorder (ADHD) in children aged 6 years and over and adolescents.',
    usualAdultDose:
      'One 36 mg prolonged-release OROS tablet taken orally once daily in the morning with or without food. Swallow whole; do not chew, divide, or crush.',
    contraindications:
      'Hypersensitivity to methylphenidate; glaucoma; phaeochromocytoma; concomitant or recent (<14 days) MAOIs; hyperthyroidism; severe depression, psychosis, mania, or suicidal ideation; pre-existing severe cardiovascular or cerebrovascular disorders.',
    commonAdverseEffects:
      'Insomnia, decreased appetite, headache, nervousness, tachycardia, elevated blood pressure, abdominal pain, dry mouth, irritability.',
    storageConditions:
      'Do not store above 30°C. Keep the bottle tightly closed to protect from moisture.',
    specialties: ['Psychiatry', 'Paediatrics', 'Neurology'],
    sourceTitle: 'UK EMC Official SmPC – Concerta XL (methylphenidate) 18 mg, 27 mg, 36 mg & 54 mg Prolonged-Release Tablets',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6872/smpc',
  },
  {
    brandName: 'Concerta XL 54 mg',
    brandNameAr: 'كونسيرتا إكس إل 54 ملغ',
    genericName: 'Methylphenidate',
    drugClass: 'Centrally Acting Sympathomimetic Psychostimulants for ADHD (N06BA04)',
    strength: '54 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    approvedIndications:
      'Comprehensive treatment programme for Attention Deficit Hyperactivity Disorder (ADHD) in children aged 6 years and over and adolescents.',
    usualAdultDose:
      'One 54 mg prolonged-release OROS tablet once daily in the morning (maximum recommended daily dose in children and adolescents is 54 mg). Swallow whole with liquid.',
    contraindications:
      'Hypersensitivity to methylphenidate; glaucoma; phaeochromocytoma; concomitant MAOIs; hyperthyroidism; severe psychiatric or cardiovascular/cerebrovascular disorders.',
    commonAdverseEffects:
      'Insomnia, anorexia, headache, nervousness, tachycardia, hypertension, abdominal pain, dry mouth, tics.',
    storageConditions:
      'Do not store above 30°C. Keep the bottle tightly closed to protect from moisture.',
    specialties: ['Psychiatry', 'Paediatrics', 'Neurology'],
    sourceTitle: 'UK EMC Official SmPC – Concerta XL (methylphenidate) 18 mg, 27 mg, 36 mg & 54 mg Prolonged-Release Tablets',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6872/smpc',
  },
  {
    brandName: 'Durogesic 25 mcg/h',
    brandNameAr: 'دوروجيسيك 25 ميكروغرام/ساعة لصقة جلدية',
    genericName: 'Fentanyl',
    drugClass: 'Phenylpiperidine Opioid Analgesics (Transdermal Matrix System, N02AB03)',
    strength: '25 micrograms/hour (4.2 mg fentanyl per 10.5 cm² patch)',
    dosageForm: 'Transdermal patch',
    route: 'Transdermal',
    packSize: '5 transdermal patches',
    approvedIndications:
      'Management of severe chronic pain that requires continuous long-term opioid administration in adults and in opioid-tolerant children aged 2 years and older.',
    usualAdultDose:
      'Individualised based on prior 24-hour opioid requirement in opioid-tolerant patients: apply one patch to non-irritated, non-irradiated flat skin on the torso or upper arm and replace every 72 hours (3 days). Avoid exposing the application site to external heat sources (heating pads, hot baths, fever).',
    contraindications:
      'Hypersensitivity to fentanyl or to the adhesives of the patch; acute or postoperative pain (because there is no opportunity for dose titration during short-term use and life-threatening hypoventilation could result); severe respiratory depression.',
    commonAdverseEffects:
      'Somnolence, dizziness, headache, insomnia, nausea, vomiting, constipation, dry mouth, hyperhidrosis, pruritus, application site erythema/rash, urinary retention, respiratory depression, dependence and withdrawal syndrome.',
    storageConditions:
      'Keep in the original sealed pouch to protect from light; no special temperature storage conditions required.',
    specialties: ['Oncology', 'Anaesthesiology', 'Internal Medicine'],
    sourceTitle: 'UK EMC Official SmPC – Durogesic DTrans (fentanyl) 12, 25, 50, 75 & 100 mcg/h Transdermal Patches',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/157/smpc',
  },
  {
    brandName: 'Durogesic 50 mcg/h',
    brandNameAr: 'دوروجيسيك 50 ميكروغرام/ساعة لصقة جلدية',
    genericName: 'Fentanyl',
    drugClass: 'Phenylpiperidine Opioid Analgesics (Transdermal Matrix System, N02AB03)',
    strength: '50 micrograms/hour (8.4 mg fentanyl per 21 cm² patch)',
    dosageForm: 'Transdermal patch',
    route: 'Transdermal',
    packSize: '5 transdermal patches',
    approvedIndications:
      'Management of severe chronic pain requiring continuous long-term opioid administration in opioid-tolerant patients.',
    usualAdultDose:
      'Apply one 50 mcg/h transdermal patch to flat skin of the torso or upper arm every 72 hours in opioid-tolerant patients converted from equivalent oral/parenteral morphine regimens. Do not cut patches; avoid external heat sources.',
    contraindications:
      'Hypersensitivity to fentanyl or patch adhesives; acute or postoperative pain; opioid-naïve patients; severe respiratory depression.',
    commonAdverseEffects:
      'Somnolence, dizziness, nausea, vomiting, constipation, hyperhidrosis, pruritus, respiratory depression, bradycardia, hypotension.',
    storageConditions:
      'Keep in the original sealed pouch until use.',
    specialties: ['Oncology', 'Anaesthesiology', 'Internal Medicine'],
    sourceTitle: 'UK EMC Official SmPC – Durogesic DTrans (fentanyl) 12, 25, 50, 75 & 100 mcg/h Transdermal Patches',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/157/smpc',
  },
  {
    brandName: 'Durogesic 100 mcg/h',
    brandNameAr: 'دوروجيسيك 100 ميكروغرام/ساعة لصقة جلدية',
    genericName: 'Fentanyl',
    drugClass: 'Phenylpiperidine Opioid Analgesics (Transdermal Matrix System, N02AB03)',
    strength: '100 micrograms/hour (16.8 mg fentanyl per 42 cm² patch)',
    dosageForm: 'Transdermal patch',
    route: 'Transdermal',
    packSize: '5 transdermal patches',
    approvedIndications:
      'Management of severe chronic pain requiring high-dose continuous long-term opioid administration in opioid-tolerant patients.',
    usualAdultDose:
      'Apply one 100 mcg/h transdermal patch every 72 hours in patients titrated or converted from high-dose chronic opioid regimens (multiple patches may be used for doses >100 mcg/h). Do not cut patches; avoid external heat sources.',
    contraindications:
      'Hypersensitivity to fentanyl or patch adhesives; acute or postoperative pain; opioid-naïve patients; severe respiratory depression.',
    commonAdverseEffects:
      'Somnolence, sedation, nausea, vomiting, severe constipation, hyperhidrosis, respiratory depression, dependence.',
    storageConditions:
      'Keep in the original sealed pouch until use.',
    specialties: ['Oncology', 'Anaesthesiology'],
    sourceTitle: 'UK EMC Official SmPC – Durogesic DTrans (fentanyl) 12, 25, 50, 75 & 100 mcg/h Transdermal Patches',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/157/smpc',
  },

  // ===========================================================================
  // 2. IMMUNOLOGY, RHEUMATOLOGY, DERMATOLOGY & GASTROENTEROLOGY (7 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Stelara 45 mg Pre-filled Syringe',
    brandNameAr: 'ستيلارا 45 ملغ سرنجة',
    genericName: 'Ustekinumab',
    drugClass: 'Interleukin-12 and Interleukin-23 (IL-12/23p40) Monoclonal Antibody Inhibitors (L04AC05)',
    strength: '45 mg/0.5 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (0.5 mL)',
    approvedIndications:
      'Moderate to severe plaque psoriasis in adults and children/adolescents aged 6 years and older who have failed to respond to, or have a contraindication to, or are intolerant to other systemic therapies; active psoriatic arthritis in adults (alone or in combination with methotrexate) when response to previous non-biological DMARD therapy has been inadequate.',
    usualAdultDose:
      'Plaque psoriasis and psoriatic arthritis (patients ≤100 kg): initial dose of 45 mg subcutaneously at Week 0, followed by 45 mg at Week 4, and then every 12 weeks thereafter.',
    contraindications:
      'Hypersensitivity to ustekinumab or any excipient; clinically important active infection (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Upper respiratory tract infection, nasopharyngitis, sinusitis, dizziness, headache, oropharyngeal pain, diarrhoea, nausea, vomiting, pruritus, back pain, myalgia, arthralgia, fatigue, injection site erythema/pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled syringe in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology', 'Paediatrics'],
    sourceTitle: 'EMA EPAR – Stelara (ustekinumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/stelara',
  },
  {
    brandName: 'Stelara 90 mg Pre-filled Syringe',
    brandNameAr: 'ستيلارا 90 ملغ سرنجة',
    genericName: 'Ustekinumab',
    drugClass: 'Interleukin-12 and Interleukin-23 (IL-12/23p40) Monoclonal Antibody Inhibitors (L04AC05)',
    strength: '90 mg/1 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (1 mL)',
    approvedIndications:
      'Subcutaneous maintenance treatment of adult patients with moderately to severely active Crohn’s disease or moderately to severely active ulcerative colitis (following intravenous Stelara induction); plaque psoriasis and psoriatic arthritis in adults with body weight >100 kg.',
    usualAdultDose:
      'Crohn’s disease and ulcerative colitis maintenance: 90 mg subcutaneously at Week 8 after the IV induction dose, then every 12 weeks thereafter (or every 8 weeks in patients with inadequate response). Plaque psoriasis / PsA (>100 kg): 90 mg at Week 0, Week 4, and every 12 weeks thereafter.',
    contraindications:
      'Hypersensitivity to ustekinumab; clinically important active infection (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Upper respiratory tract infection, nasopharyngitis, headache, dizziness, diarrhoea, nausea, pruritus, arthralgia, myalgia, fatigue, injection site erythema.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Gastroenterology', 'Dermatology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Stelara (ustekinumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/stelara',
  },
  {
    brandName: 'Stelara 130 mg Concentrate for Infusion',
    brandNameAr: 'ستيلارا 130 ملغ/26 مل فيال وريدي',
    genericName: 'Ustekinumab',
    drugClass: 'Interleukin-12 and Interleukin-23 (IL-12/23p40) Monoclonal Antibody Inhibitors (L04AC05)',
    strength: '130 mg/26 mL (5 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial (26 mL)',
    approvedIndications:
      'Single-dose weight-tiered intravenous induction of adult patients with moderately to severely active Crohn’s disease or moderately to severely active ulcerative colitis who have had an inadequate response with, lost response to, or were intolerant to either conventional therapy or a biologic.',
    usualAdultDose:
      'Single intravenous infusion over at least 1 hour (~6 mg/kg): body weight ≤55 kg: 260 mg (2 vials); body weight >55 kg to ≤85 kg: 390 mg (3 vials); body weight >85 kg: 520 mg (4 vials), followed by the first 90 mg subcutaneous dose at Week 8.',
    contraindications:
      'Hypersensitivity to ustekinumab; clinically important active infection (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Nasopharyngitis, upper respiratory tract infection, headache, arthralgia, nausea, abdominal pain, fatigue, infusion-related reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Do not shake. Protect from light.',
    specialties: ['Gastroenterology'],
    sourceTitle: 'EMA EPAR – Stelara (ustekinumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/stelara',
  },
  {
    brandName: 'Remicade 100 mg',
    brandNameAr: 'ريميكيد 100 ملغ فيال',
    genericName: 'Infliximab',
    drugClass: 'Chimeric Monoclonal Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB02)',
    strength: '100 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    approvedIndications:
      'Rheumatoid arthritis (in combination with methotrexate); adult and paediatric (6–17 years) moderately to severely active Crohn’s disease and fistulising active Crohn’s disease; adult and paediatric (6–17 years) moderately to severely active ulcerative colitis; active ankylosing spondylitis; active and progressive psoriatic arthritis; moderate to severe plaque psoriasis in adults.',
    usualAdultDose:
      'Administered by IV infusion over 2 hours: Rheumatoid arthritis: 3 mg/kg at Weeks 0, 2, and 6, then every 8 weeks (with methotrexate). Crohn’s disease, ulcerative colitis, psoriatic arthritis, plaque psoriasis: 5 mg/kg at Weeks 0, 2, and 6, then every 8 weeks. Ankylosing spondylitis: 5 mg/kg at Weeks 0, 2, and 6, then every 6 to 8 weeks.',
    contraindications:
      'History of hypersensitivity to infliximab, other murine proteins, or any excipient; tuberculosis or other severe infections such as sepsis, abscesses, and opportunistic infections; moderate or severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Viral and bacterial infections (upper respiratory tract, sinusitis, pharyngitis, UTI), acute infusion-related reactions and delayed hypersensitivity, headache, vertigo, flushing, abdominal pain, nausea, elevated hepatic transaminases, rash, arthralgia, fatigue.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). May be stored at temperatures up to a maximum of 25°C for a single period of up to 6 months.',
    specialties: ['Gastroenterology', 'Rheumatology', 'Dermatology', 'Paediatrics'],
    sourceTitle: 'EMA EPAR – Remicade (infliximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/remicade',
  },
  {
    brandName: 'Simponi 50 mg Pre-filled Pen',
    brandNameAr: 'سيمبوني 50 ملغ قلم',
    genericName: 'Golimumab',
    drugClass: 'Human Monoclonal Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB06)',
    strength: '50 mg/0.5 mL',
    dosageForm: 'Solution for injection in pre-filled pen (SmartJect)',
    route: 'Subcutaneous',
    packSize: '1 SmartJect pre-filled pen (0.5 mL)',
    approvedIndications:
      'Moderate to severe active rheumatoid arthritis (in combination with methotrexate); active and progressive psoriatic arthritis (alone or with methotrexate); severe active ankylosing spondylitis and severe non-radiographic axial spondyloarthritis; polyarticular juvenile idiopathic arthritis (≥40 kg); moderately to severely active ulcerative colitis in adults.',
    usualAdultDose:
      'Rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis: 50 mg administered subcutaneously once a month, on the same date each month. Ulcerative colitis (<80 kg): 200 mg at Week 0, 100 mg at Week 2, then 50 mg every 4 weeks.',
    contraindications:
      'Hypersensitivity to golimumab or any excipient (needle cover contains dry natural rubber/latex); active tuberculosis or other severe infections such as sepsis and opportunistic infections; moderate or severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Upper respiratory tract infections (nasopharyngitis, pharyngitis, laryngitis, rhinitis), bacterial and viral infections, anaemia, dizziness, headache, hypertension, dyspepsia, abdominal pain, elevated ALT/AST, rash, injection site erythema, pyrexia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton to protect from light.',
    specialties: ['Rheumatology', 'Gastroenterology', 'Paediatrics'],
    sourceTitle: 'EMA EPAR – Simponi (golimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/simponi',
  },
  {
    brandName: 'Simponi 100 mg Pre-filled Pen',
    brandNameAr: 'سيمبوني 100 ملغ قلم',
    genericName: 'Golimumab',
    drugClass: 'Human Monoclonal Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB06)',
    strength: '100 mg/1 mL',
    dosageForm: 'Solution for injection in pre-filled pen (SmartJect)',
    route: 'Subcutaneous',
    packSize: '1 SmartJect pre-filled pen (1 mL)',
    approvedIndications:
      'Induction and maintenance treatment of moderately to severely active ulcerative colitis in adults; rheumatoid arthritis, psoriatic arthritis, and axial spondyloarthritis in patients weighing >100 kg who do not achieve an adequate clinical response after 3 or 4 doses of 50 mg.',
    usualAdultDose:
      'Ulcerative colitis: 200 mg (two 100 mg injections) at Week 0, followed by 100 mg at Week 2, then 100 mg every 4 weeks in patients with body weight ≥80 kg (or in <80 kg patients with inadequate response to 50 mg). RA/PsA/axSpA (>100 kg): 100 mg once monthly.',
    contraindications:
      'Hypersensitivity to golimumab; active tuberculosis or other severe/opportunistic infections; moderate or severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Upper respiratory tract infections, bronchitis, sinusitis, herpes viral infections, headache, dizziness, elevated hepatic transaminases, injection site reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Gastroenterology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Simponi (golimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/simponi',
  },
  {
    brandName: 'Tremfya 100 mg Pre-filled Pen',
    brandNameAr: 'تريمفايا 100 ملغ قلم',
    genericName: 'Guselkumab',
    drugClass: 'Selective Human Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC16)',
    strength: '100 mg/1 mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '1 One-Press patient-controlled pre-filled pen (1 mL)',
    approvedIndications:
      'Treatment of moderate to severe plaque psoriasis in adults who are candidates for systemic therapy; treatment of active psoriatic arthritis in adult patients (alone or in combination with methotrexate) who have had an inadequate response or who have been intolerant to a prior DMARD therapy.',
    usualAdultDose:
      '100 mg by subcutaneous injection at Weeks 0 and 4, followed by a maintenance dose of 100 mg every 8 weeks (in psoriatic arthritis patients at high risk of joint damage, 100 mg every 4 weeks may be considered).',
    contraindications:
      'Serious hypersensitivity to guselkumab or any excipient; clinically important active infections (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Respiratory tract infections, headache, diarrhoea, gastroenteritis, herpes simplex infections, tinea infections, arthralgia, increased transaminases, injection site erythema and pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Tremfya (guselkumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tremfya',
  },

  // ===========================================================================
  // 3. ONCOLOGY & MALIGNANT HAEMATOLOGY (11 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Darzalex 100 mg/5 mL',
    brandNameAr: 'دارزاليكس 100 ملغ/5 مل فيال',
    genericName: 'Daratumumab',
    drugClass: 'Anti-CD38 Human Monoclonal Antibodies (L01FC01)',
    strength: '100 mg/5 mL (20 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial (5 mL)',
    approvedIndications:
      'Treatment of adult patients with newly diagnosed multiple myeloma (eligible or ineligible for autologous stem cell transplant in combination with lenalidomide/dexamethasone, bortezomib/melphalan/prednisone, or bortezomib/thalidomide/dexamethasone); relapsed/refractory multiple myeloma in combination with lenalidomide/dexamethasone or bortezomib/dexamethasone, or as monotherapy.',
    usualAdultDose:
      '16 mg/kg body weight administered as an intravenous infusion after dilution in 0.9% sodium chloride according to the regimen-specific weekly, every-2-week, and every-4-week schedule, with pre- and post-infusion medication (corticosteroid, antipyretic, antihistamine) to reduce infusion-related reactions.',
    contraindications:
      'Hypersensitivity to daratumumab or to any of the excipients.',
    commonAdverseEffects:
      'Infusion-related reactions (bronchospasm, dyspnoea, laryngeal oedema, nasal congestion, cough, chills), neutropenia, thrombocytopenia, anaemia, lymphopenia, pneumonia, upper respiratory tract infection, peripheral sensory neuropathy, diarrhoea, constipation, nausea, fatigue, pyrexia, peripheral oedema; interference with indirect antiglobulin (Coombs) blood compatibility testing.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Darzalex (daratumumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/darzalex',
  },
  {
    brandName: 'Darzalex 400 mg/20 mL',
    brandNameAr: 'دارزاليكس 400 ملغ/20 مل فيال',
    genericName: 'Daratumumab',
    drugClass: 'Anti-CD38 Human Monoclonal Antibodies (L01FC01)',
    strength: '400 mg/20 mL (20 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial (20 mL)',
    approvedIndications:
      'Newly diagnosed and relapsed/refractory multiple myeloma in adults in combination regimens or as monotherapy.',
    usualAdultDose:
      '16 mg/kg body weight administered by intravenous infusion with pre- and post-infusion prophylaxis.',
    contraindications:
      'Hypersensitivity to daratumumab or to any of the excipients.',
    commonAdverseEffects:
      'Infusion-related reactions, neutropenia, thrombocytopenia, anaemia, lymphopenia, upper respiratory tract infection, pneumonia, peripheral neuropathy, diarrhoea, fatigue, pyrexia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Darzalex (daratumumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/darzalex',
  },
  {
    brandName: 'Darzalex 1800 mg Subcutaneous',
    brandNameAr: 'دارزاليكس 1800 ملغ/15 مل تحت الجلد',
    genericName: 'Daratumumab',
    drugClass: 'Anti-CD38 Human Monoclonal Antibodies (L01FC01)',
    strength: '1800 mg/15 mL (120 mg/mL)',
    dosageForm: 'Solution for injection',
    route: 'Subcutaneous',
    packSize: '1 single-dose vial (15 mL co-formulated with recombinant human hyaluronidase PH20)',
    approvedIndications:
      'Treatment of adult patients with newly diagnosed or relapsed/refractory multiple myeloma; treatment of adult patients with newly diagnosed systemic light chain (AL) amyloidosis in combination with cyclophosphamide, bortezomib, and dexamethasone.',
    usualAdultDose:
      'Fixed flat dose of 1800 mg (15 mL) regardless of body weight, injected subcutaneously into the abdomen (approx. 7.5 cm right or left of the navel) over approximately 3 to 5 minutes according to the indication-specific dosing schedule.',
    contraindications:
      'Hypersensitivity to daratumumab, recombinant human hyaluronidase, or any excipient.',
    commonAdverseEffects:
      'Neutropenia, thrombocytopenia, anaemia, lymphopenia, upper respiratory tract infection, pneumonia, systemic and local injection-related reactions, peripheral sensory neuropathy, diarrhoea, constipation, fatigue, peripheral oedema.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Darzalex (daratumumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/darzalex',
  },
  {
    brandName: 'Imbruvica 140 mg',
    brandNameAr: 'إمبروفيكا 140 ملغ',
    genericName: 'Ibrutinib',
    drugClass: 'Bruton’s Tyrosine Kinase (BTK) Inhibitors (L01EL01)',
    strength: '140 mg',
    dosageForm: 'Film-coated tablet (or hard capsule)',
    route: 'Oral',
    packSize: '28, 90, or 120 tablets/capsules',
    approvedIndications:
      'Chronic lymphocytic leukaemia (CLL): as a single agent or in combination with rituximab, obinutuzumab, or venetoclax in previously untreated adults, and as a single agent or in combination with bendamustine + rituximab in previously treated CLL; Relapsed or refractory mantle cell lymphoma (MCL) in adults; Waldenström’s macroglobulinaemia (WM) in adults as monotherapy or in combination with rituximab.',
    usualAdultDose:
      'CLL and WM: 420 mg orally once daily. Relapsed/refractory MCL: 560 mg orally once daily. Dose modifications (280 mg or 140 mg once daily) are used for moderate/strong CYP3A4 inhibitor co-administration or toxicity management. Swallow whole with water at approximately the same time each day.',
    contraindications:
      'Hypersensitivity to ibrutinib or any excipient; concomitant use of preparations containing St. John’s wort.',
    commonAdverseEffects:
      'Diarrhoea, neutropenia, thrombocytopenia, haemorrhage/bruising (petechiae, epistaxis), musculoskeletal pain, arthralgia, nausea, rash, pyrexia, pneumonia, upper respiratory tract infection, hypertension, atrial fibrillation and ventricular tachyarrhythmias.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Imbruvica (ibrutinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/imbruvica',
  },
  {
    brandName: 'Imbruvica 420 mg',
    brandNameAr: 'إمبروفيكا 420 ملغ',
    genericName: 'Ibrutinib',
    drugClass: 'Bruton’s Tyrosine Kinase (BTK) Inhibitors (L01EL01)',
    strength: '420 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 or 30 film-coated tablets',
    approvedIndications:
      'Single-tablet once-daily regimen for chronic lymphocytic leukaemia (CLL) and Waldenström’s macroglobulinaemia (WM) in adults.',
    usualAdultDose:
      'One 420 mg film-coated tablet orally once daily until disease progression or unacceptable toxicity (or for 15 cycles in fixed-duration combination with venetoclax in CLL). Swallow whole with water; avoid grapefruit and Seville oranges.',
    contraindications:
      'Hypersensitivity to ibrutinib or any excipient; concomitant St. John’s wort.',
    commonAdverseEffects:
      'Diarrhoea, neutropenia, thrombocytopenia, bruising/bleeding, arthralgia, musculoskeletal pain, hypertension, atrial fibrillation, respiratory tract infections, rash.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Imbruvica (ibrutinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/imbruvica',
  },
  {
    brandName: 'Imbruvica 560 mg',
    brandNameAr: 'إمبروفيكا 560 ملغ',
    genericName: 'Ibrutinib',
    drugClass: 'Bruton’s Tyrosine Kinase (BTK) Inhibitors (L01EL01)',
    strength: '560 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 or 30 film-coated tablets',
    approvedIndications:
      'Single-tablet once-daily treatment of adult patients with relapsed or refractory mantle cell lymphoma (MCL).',
    usualAdultDose:
      'One 560 mg film-coated tablet orally once daily until disease progression or no longer tolerated by the patient. Swallow whole with water.',
    contraindications:
      'Hypersensitivity to ibrutinib or any excipient; concomitant St. John’s wort.',
    commonAdverseEffects:
      'Diarrhoea, neutropenia, thrombocytopenia, anaemia, haemorrhage/bruising, fatigue, musculoskeletal pain, pneumonia, hypertension, atrial fibrillation.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Imbruvica (ibrutinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/imbruvica',
  },
  {
    brandName: 'Zytiga 250 mg',
    brandNameAr: 'زايتيغا 250 ملغ',
    genericName: 'Abiraterone',
    drugClass: 'Androgen Biosynthesis (CYP17) Inhibitors (L02BX03)',
    strength: '250 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '120 tablets',
    approvedIndications:
      'With prednisone or prednisolone for the treatment of: newly diagnosed high-risk metastatic hormone-sensitive prostate cancer (mHSPC) in adult men in combination with androgen deprivation therapy (ADT); metastatic castration-resistant prostate cancer (mCRPC) in adult men who are asymptomatic or mildly symptomatic after failure of ADT in whom chemotherapy is not yet clinically indicated; mCRPC in adult men whose disease has progressed on or after a docetaxel-based chemotherapy regimen.',
    usualAdultDose:
      '1000 mg (four 250 mg tablets) as a single daily dose on an empty stomach (at least 1 hour before or at least 2 hours after eating—taking with food significantly increases systemic exposure), co-administered with prednisone or prednisolone (5 mg once daily in mHSPC; 5 mg twice daily in mCRPC) and continued medical/surgical castration.',
    contraindications:
      'Hypersensitivity to abiraterone or any excipient; women who are or may potentially be pregnant; severe hepatic impairment (Child-Pugh Class C); Zytiga with prednisone/prednisolone in combination with Ra-223.',
    commonAdverseEffects:
      'Peripheral oedema, hypokalaemia, hypertension, urinary tract infection, hypertriglyceridaemia, elevated ALT and AST, diarrhoea, dyspepsia, haematuria, cardiac failure, angina pectoris, atrial fibrillation, tachycardia, adrenal insufficiency, bone fractures.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR – Zytiga (abiraterone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zytiga',
  },
  {
    brandName: 'Zytiga 500 mg',
    brandNameAr: 'زايتيغا 500 ملغ',
    genericName: 'Abiraterone',
    drugClass: 'Androgen Biosynthesis (CYP17) Inhibitors (L02BX03)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 or 60 film-coated tablets',
    approvedIndications:
      'With prednisone or prednisolone for newly diagnosed high-risk metastatic hormone-sensitive prostate cancer (mHSPC) in combination with ADT, and for pre- or post-chemotherapy metastatic castration-resistant prostate cancer (mCRPC) in adult men.',
    usualAdultDose:
      '1000 mg (two 500 mg film-coated tablets) as a single daily dose taken on an empty stomach (at least 2 hours after eating and no food for at least 1 hour after taking the tablets), co-administered with low-dose prednisone or prednisolone.',
    contraindications:
      'Hypersensitivity to abiraterone; women who are or may potentially be pregnant; severe hepatic impairment (Child-Pugh Class C); combination of Zytiga + prednisone/prednisolone with Ra-223.',
    commonAdverseEffects:
      'Mineralocorticoid excess (hypertension, hypokalaemia, fluid retention/peripheral oedema), hepatotoxicity (elevated ALT/AST), urinary tract infection, diarrhoea, dyspepsia, cardiac arrhythmias/heart failure, fractures.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR – Zytiga (abiraterone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zytiga',
  },
  {
    brandName: 'Erleada 60 mg',
    brandNameAr: 'إرليدا 60 ملغ',
    genericName: 'Apalutamide',
    drugClass: 'Selective Androgen Receptor Inhibitors (L02BB05)',
    strength: '60 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '112 or 120 film-coated tablets',
    approvedIndications:
      'Treatment of adult men with non-metastatic castration-resistant prostate cancer (nmCRPC) who are at high risk of developing metastatic disease; treatment of adult men with metastatic hormone-sensitive prostate cancer (mHSPC) in combination with androgen deprivation therapy (ADT).',
    usualAdultDose:
      '240 mg (four 60 mg film-coated tablets) taken orally as a single daily dose with or without food. Medical castration with a GnRH analogue must be continued in patients not surgically castrated.',
    contraindications:
      'Hypersensitivity to apalutamide or any excipient; women who are or may become pregnant.',
    commonAdverseEffects:
      'Fatigue, skin rash (maculo-papular), hypertension, hot flush, arthralgia, diarrhoea, falls, bone fractures, weight decreased, decreased appetite, hypothyroidism, pruritus, ischaemic heart disease, rare seizures.',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR – Erleada (apalutamide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/erleada',
  },
  {
    brandName: 'Erleada 240 mg',
    brandNameAr: 'إرليدا 240 ملغ',
    genericName: 'Apalutamide',
    drugClass: 'Selective Androgen Receptor Inhibitors (L02BB05)',
    strength: '240 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Single-tablet once-daily treatment of adult men with high-risk non-metastatic castration-resistant prostate cancer (nmCRPC) or metastatic hormone-sensitive prostate cancer (mHSPC) in combination with ADT.',
    usualAdultDose:
      'One 240 mg film-coated tablet orally once daily with or without food (may also be dispersed in water and non-carbonated beverages/applesauce for patients with swallowing difficulties per SmPC instructions).',
    contraindications:
      'Hypersensitivity to apalutamide; women who are or may become pregnant.',
    commonAdverseEffects:
      'Fatigue, skin rash, hypertension, hot flush, arthralgia, diarrhoea, falls, fractures, hypothyroidism, weight loss.',
    storageConditions:
      'Store in the original package to protect from moisture.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA EPAR – Erleada (apalutamide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/erleada',
  },
  {
    brandName: 'Velcade 3.5 mg',
    brandNameAr: 'فيلكيد 3.5 ملغ فيال',
    genericName: 'Bortezomib',
    drugClass: 'Reversible 26S Proteasome Inhibitors (L01XG01)',
    strength: '3.5 mg',
    dosageForm: 'Powder for solution for injection',
    route: 'Subcutaneous or Intravenous',
    packSize: '1 vial',
    approvedIndications:
      'Multiple myeloma: as monotherapy or in combination with pegylated liposomal doxorubicin or dexamethasone for progressive multiple myeloma in adults who have received at least 1 prior therapy; in combination with melphalan and prednisone, or with dexamethasone / dexamethasone + thalidomide for previously untreated multiple myeloma; Mantle cell lymphoma: in combination with rituximab, cyclophosphamide, doxorubicin, and prednisone for previously untreated adults unsuitable for haematopoietic stem cell transplantation.',
    usualAdultDose:
      '1.3 mg/m² body surface area administered subcutaneously (at 2.5 mg/mL concentration into thigh or abdomen) or by 3–5 second intravenous bolus (at 1 mg/mL concentration) twice weekly for 2 weeks (Days 1, 4, 8, and 11) in a 21-day treatment cycle, with at least 72 hours between consecutive doses. MUST NEVER be administered intrathecally.',
    contraindications:
      'Hypersensitivity to bortezomib, boron, or any excipient; acute diffuse infiltrative pulmonary and pericardial disease. Intrathecal administration is fatal and strictly contraindicated.',
    commonAdverseEffects:
      'Peripheral neuropathy (predominantly sensory, sometimes painful or motor), thrombocytopenia, neutropenia, anaemia, nausea, diarrhoea, constipation, vomiting, fatigue, pyrexia, herpes zoster reactivation (antiviral prophylaxis recommended), orthostatic hypotension.',
    storageConditions:
      'Do not store above 30°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Velcade (bortezomib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/velcade',
  },

  // ===========================================================================
  // 4. INFECTIOUS DISEASES, ANTIFUNGALS & PULMONARY ARTERIAL HYPERTENSION (9 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Edurant 25 mg',
    brandNameAr: 'إيدورانت 25 ملغ',
    genericName: 'Rilpivirine',
    drugClass: 'Non-Nucleoside Reverse Transcriptase Inhibitors (NNRTIs, J05AG05)',
    strength: '25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'In combination with other antiretroviral medicinal products, for the treatment of human immunodeficiency virus type 1 (HIV-1) infection in antiretroviral treatment-naïve patients (adults and paediatric patients weighing at least 25 kg) with a viral load ≤100,000 HIV-1 RNA copies/mL; also used as a short-term oral lead-in with cabotegravir prior to long-acting injectable therapy.',
    usualAdultDose:
      'One 25 mg film-coated tablet orally once daily MUST be taken with a meal to ensure optimal systemic absorption. Swallow whole; do not chew or crush.',
    contraindications:
      'Hypersensitivity to rilpivirine or any excipient; co-administration with CYP3A inducers or proton pump inhibitors that significantly decrease rilpivirine plasma concentrations (carbamazepine, oxcarbazepine, phenobarbital, phenytoin, rifampicin, rifapentine, omeprazole, esomeprazole, lansoprazole, pantoprazole, rabeprazole, systemic dexamethasone >1 dose, St. John’s wort).',
    commonAdverseEffects:
      'Insomnia, headache, dizziness, depressed mood, depression, abnormal dreams, sleep disorders, nausea, abdominal pain, vomiting, decreased appetite, elevated transaminases and pancreatic amylase, rash, fatigue.',
    storageConditions:
      'Store in the original bottle in order to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR – Edurant (rilpivirine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/edurant',
  },
  {
    brandName: 'Prezista 600 mg',
    brandNameAr: 'بريزيستا 600 ملغ',
    genericName: 'Darunavir',
    drugClass: 'HIV-1 Protease Inhibitors (J05AE10)',
    strength: '600 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    approvedIndications:
      'Co-administered with low-dose ritonavir in combination with other antiretroviral medicinal products for the treatment of HIV-1 infection in antiretroviral treatment-experienced adults and paediatric patients (from age 3 years and ≥15 kg), including those with darunavir resistance-associated mutations.',
    usualAdultDose:
      'Treatment-experienced adults with at least one darunavir resistance-associated mutation (or during pregnancy): 600 mg Prezista co-administered with 100 mg ritonavir twice daily taken with food.',
    contraindications:
      'Hypersensitivity to darunavir or any excipient; severe hepatic impairment (Child-Pugh Class C); concomitant use with strong CYP3A inducers (rifampicin, St. John’s wort, carbamazepine, phenobarbital, phenytoin) or narrow-therapeutic-index CYP3A substrates (alfuzosin, amiodarone, astemizole, cisapride, pimozide, quetiapine, quinidine, sertindole, terfenadine, lomitapide, lovastatin, simvastatin, ticagrelor, oral midazolam, triazolam, ergot alkaloids, sildenafil for PAH).',
    commonAdverseEffects:
      'Diarrhoea, nausea, vomiting, abdominal pain, headache, rash (contains sulfonamide moiety), hypertriglyceridaemia, hypercholesterolaemia, elevated hepatic transaminases, fatigue.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR – Prezista (darunavir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/prezista',
  },
  {
    brandName: 'Prezista 800 mg',
    brandNameAr: 'بريزيستا 800 ملغ',
    genericName: 'Darunavir',
    drugClass: 'HIV-1 Protease Inhibitors (J05AE10)',
    strength: '800 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Co-administered with low-dose ritonavir (100 mg) or cobicistat (150 mg) in combination with other antiretroviral medicinal products for the once-daily treatment of HIV-1 infection in antiretroviral treatment-naïve adults and adolescents (≥40 kg), and in treatment-experienced patients with no darunavir resistance-associated mutations.',
    usualAdultDose:
      'One 800 mg Prezista tablet co-administered with 150 mg cobicistat or 100 mg ritonavir once daily, taken with food.',
    contraindications:
      'Hypersensitivity to darunavir; severe hepatic impairment (Child-Pugh Class C); concomitant rifampicin, St. John’s wort, carbamazepine, phenobarbital, phenytoin, lovastatin, simvastatin, lomitapide, alfuzosin, amiodarone, quetiapine, ticagrelor, oral midazolam, triazolam, ergot derivatives, or sildenafil for PAH.',
    commonAdverseEffects:
      'Diarrhoea, nausea, rash, headache, abdominal pain, vomiting, dyslipidaemia, elevated liver enzymes, fatigue.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR – Prezista (darunavir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/prezista',
  },
  {
    brandName: 'Symtuza 800 mg/150 mg/200 mg/10 mg',
    brandNameAr: 'سيمتوزا 800 ملغ / 150 ملغ / 200 ملغ / 10 ملغ',
    genericName: 'Darunavir + Cobicistat + Emtricitabine + Tenofovir alafenamide',
    drugClass: 'Single-Tablet Complete HIV-1 Antiretroviral Regimens (PI + Booster + 2 NRTIs, J05AR22)',
    strength: '800 mg / 150 mg / 200 mg / 10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Treatment of human immunodeficiency virus type 1 (HIV-1) infection in adults and adolescents (aged 12 years and older with body weight at least 40 kg). Genotypic testing should guide the use of Symtuza (patients must have no darunavir resistance-associated mutations and HIV-1 RNA <100,000 copies/mL and CD4+ ≥100 cells/mm³ if ART-experienced).',
    usualAdultDose:
      'One tablet taken orally once daily with food. Swallow whole.',
    contraindications:
      'Hypersensitivity to any active substance or excipient; severe hepatic impairment (Child-Pugh Class C); co-administration with strong CYP3A inducers (carbamazepine, phenobarbital, phenytoin, rifampicin, St. John’s wort) or narrow-therapeutic-index CYP3A substrates (alfuzosin, amiodarone, quinidine, dronedarone, ivabradine, ranolazine, lomitapide, lovastatin, simvastatin, pimozide, lurasidone, quetiapine, sertindole, triazolam, oral midazolam, ergot derivatives, ticagrelor, sildenafil for PAH, dapoxetine).',
    commonAdverseEffects:
      'Diarrhoea, nausea, rash, headache, fatigue, abdominal pain, flatulence, dyspepsia, increased blood creatinine (due to cobicistat inhibition of tubular secretion), dyslipidaemia.',
    storageConditions:
      'Store in the original package with desiccant in order to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR – Symtuza (darunavir / cobicistat / emtricitabine / tenofovir alafenamide) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/symtuza',
  },
  {
    brandName: 'Sporanox 100 mg',
    brandNameAr: 'سبورانوكس 100 ملغ كبسول',
    genericName: 'Itraconazole',
    drugClass: 'Triazole Systemic Antimycotics / Antifungals (J02AC02)',
    strength: '100 mg',
    dosageForm: 'Capsule, hard',
    route: 'Oral',
    packSize: '4, 15, or 28 hard capsules',
    approvedIndications:
      'Gynaecological: vulvovaginal candidosis; Dermatological / mucosal / ophthalmological: pityriasis versicolor, dermatophytoses, oral candidosis, fungal keratitis; Onychomycosis caused by dermatophytes and/or yeasts; Systemic mycoses: systemic aspergillosis and candidosis, cryptococcosis (including cryptococcal meningitis), histoplasmosis, blastomycosis, sporotrichosis, paracoccidioidomycosis.',
    usualAdultDose:
      'Must be taken immediately after a full meal for maximal absorption: Vulvovaginal candidosis: 200 mg twice daily for 1 day (or 200 mg once daily for 3 days). Dermatophytoses: 200 mg once daily for 7 days or 100 mg once daily for 15 days. Onychomycosis: pulse treatment (200 mg twice daily for 1 week per month for 2–3 pulses) or continuous 200 mg once daily for 3 months. Systemic mycoses: 100–200 mg once or twice daily.',
    contraindications:
      'Hypersensitivity to itraconazole; ventricular dysfunction such as congestive heart failure (CHF) or history of CHF (except for life-threatening or other serious infections); pregnancy (except for life-threatening cases); co-administration with CYP3A4 substrates that prolong QT or cause severe toxicity (terfenadine, astemizole, mizolastine, cisapride, dofetilide, quinidine, pimozide, sertindole, simvastatin, lovastatin, triazolam, oral midazolam, ergot alkaloids, ticagrelor, finerenone, colchicine in renal/hepatic impairment).',
    commonAdverseEffects:
      'Headache, abdominal pain, nausea, diarrhoea, dyspepsia, rash, reversible elevation of hepatic enzymes, rare serious hepatotoxicity or congestive heart failure.',
    storageConditions:
      'Do not store above 25°C. Protect from light and moisture.',
    specialties: ['Dermatology', 'Infectious Diseases', 'Obstetrics & Gynaecology', 'Internal Medicine'],
    sourceTitle: 'UK EMC Official SmPC – Sporanox (itraconazole) 100 mg Hard Capsules',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/14180/smpc',
  },
  {
    brandName: 'Sporanox 10 mg/mL Oral Solution',
    brandNameAr: 'سبورانوكس 10 ملغ/مل محلول فموي',
    genericName: 'Itraconazole',
    drugClass: 'Triazole Systemic Antimycotics / Antifungals (J02AC02)',
    strength: '10 mg/mL',
    dosageForm: 'Oral solution',
    route: 'Oral',
    packSize: '1 bottle (150 mL) with measuring cup',
    approvedIndications:
      'Treatment of oral and/or oesophageal candidosis in HIV-positive or other immunocompromised patients; prophylaxis of deep fungal infections expected to be susceptible to itraconazole in patients with haematological malignancy or undergoing bone marrow transplant who are expected to become neutropenic (<500 cells/µL).',
    usualAdultDose:
      'Must be taken WITHOUT food (at least 1 hour before a meal; Sporanox Oral Solution has higher bioavailability and is NOT interchangeable mg-for-mg with Sporanox Capsules): Oral/oesophageal candidosis: 200 mg (20 mL) daily in 1 or 2 doses for 1–2 weeks (swish in the mouth for ~20 seconds before swallowing). Prophylaxis in neutropenia: 5 mg/kg/day in two divided doses.',
    contraindications:
      'Hypersensitivity to itraconazole; ventricular dysfunction / congestive heart failure (unless life-threatening infection); pregnancy; concomitant CYP3A4 substrates that prolong QT or cause myopathy/ergotism (lovastatin, simvastatin, quinidine, pimozide, cisapride, oral midazolam, triazolam, ergot alkaloids).',
    commonAdverseEffects:
      'Diarrhoea, nausea, abdominal pain, vomiting, dyspeusia/unpleasant taste (due to hydroxypropyl-beta-cyclodextrin vehicle), headache, dizziness, rash, pyrexia, hypokalaemia, elevated liver enzymes.',
    storageConditions:
      'Do not store above 25°C. Use within 1 month of first opening.',
    specialties: ['Haematology', 'Oncology', 'Infectious Diseases'],
    sourceTitle: 'UK EMC Official SmPC – Sporanox (itraconazole) 10 mg/mL Oral Solution',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/10049/smpc',
  },
  {
    brandName: 'Opsumit 10 mg',
    brandNameAr: 'أوبسوميت 10 ملغ',
    genericName: 'Macitentan',
    drugClass: 'Dual Endothelin Receptor (ET-A / ET-B) Antagonists for PAH (C02KX04)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Monotherapy or in combination, for the long-term treatment of pulmonary arterial hypertension (PAH) in adult patients of WHO Functional Class II to III, and in paediatric patients (<18 years and ≥40 kg) of WHO Functional Class II to III.',
    usualAdultDose:
      'One 10 mg film-coated tablet orally once daily, with or without food. Swallow whole; do not split, crush, or chew.',
    contraindications:
      'Hypersensitivity to macitentan, soya, or any excipient; pregnancy, women of childbearing potential who are not using reliable contraception, and breastfeeding; severe hepatic impairment (with or without cirrhosis); baseline hepatic aminotransferases (AST and/or ALT) >3× ULN.',
    commonAdverseEffects:
      'Nasopharyngitis, bronchitis, pharyngitis, influenza, urinary tract infection, anaemia / haemoglobin decrease, headache, hypotension, nasal congestion, peripheral oedema, aminotransferases increased.',
    storageConditions:
      'Do not store above 30°C.',
    specialties: ['Cardiology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR – Opsumit (macitentan) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/opsumit',
  },
  {
    brandName: 'Uptravi 200 micrograms',
    brandNameAr: 'أوبترافي 200 ميكروغرام',
    genericName: 'Selexipag',
    drugClass: 'Oral Selective Prostacyclin (IP) Receptor Agonists for PAH (B01AC27)',
    strength: '200 micrograms',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 or 140 film-coated tablets (titration pack)',
    approvedIndications:
      'Long-term treatment of pulmonary arterial hypertension (PAH) in adult patients with WHO Functional Class II–III, either as combination therapy in patients insufficiently controlled with an endothelin receptor antagonist (ERA) and/or a phosphodiesterase type 5 (PDE-5) inhibitor, or as monotherapy in patients who are not candidates for these therapies.',
    usualAdultDose:
      'Individualised dose titration: starting dose is 200 micrograms twice daily (morning and evening), increased in increments of 200 micrograms twice daily usually at weekly intervals to the highest individually tolerated dose up to a maximum of 1600 micrograms twice daily. Take with food to improve tolerability.',
    contraindications:
      'Hypersensitivity to selexipag or any excipient; severe coronary heart disease or unstable angina; myocardial infarction within the last 6 months; decompensated cardiac failure not under close medical supervision; severe arrhythmias; cerebrovascular events (TIA, stroke) within the last 3 months; congenital or acquired valvular defects with clinically relevant myocardial function disorders not related to pulmonary hypertension; concomitant strong inhibitors of CYP2C8 (e.g., gemfibrozil).',
    commonAdverseEffects:
      'Headache, diarrhoea, nausea, vomiting, jaw pain, myalgia, pain in extremity, arthralgia, flushing, nasopharyngitis, anaemia, hyperthyroidism.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR – Uptravi (selexipag) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/uptravi',
  },
  {
    brandName: 'Uptravi 800 micrograms',
    brandNameAr: 'أوبترافي 800 ميكروغرام',
    genericName: 'Selexipag',
    drugClass: 'Oral Selective Prostacyclin (IP) Receptor Agonists for PAH (B01AC27)',
    strength: '800 micrograms',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    approvedIndications:
      'Long-term maintenance treatment of pulmonary arterial hypertension (PAH) in adult patients with WHO Functional Class II–III following individualised titration from 200 micrograms twice daily.',
    usualAdultDose:
      '800 micrograms orally twice daily (morning and evening) with food in patients whose individualised highest tolerated maintenance dose is 800 micrograms twice daily.',
    contraindications:
      'Hypersensitivity to selexipag; severe coronary heart disease, recent MI (<6 months), decompensated heart failure, severe arrhythmias, recent stroke/TIA (<3 months), relevant valvular heart disease; concomitant strong CYP2C8 inhibitors (e.g., gemfibrozil).',
    commonAdverseEffects:
      'Headache, diarrhoea, jaw pain, nausea, myalgia, vomiting, pain in extremity, flushing, arthralgia.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR – Uptravi (selexipag) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/uptravi',
  },
];

export const JANSSEN_PRODUCTS: AiProductDraft[] =
  JANSSEN_COMPACT_PRODUCTS.map(toJanssenProductDraft);
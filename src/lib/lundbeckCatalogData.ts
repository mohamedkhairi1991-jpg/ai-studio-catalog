import type { AiDraftSource, AiProductDraft } from './catalog';

const LUND_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactLundbeckDrug {
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

const LUNDBECK_COMPACT_PRODUCTS: CompactLundbeckDrug[] = [
  // =========================================================================
  // DEPRESSION & ANXIETY DISORDERS
  // =========================================================================
  {
    brandName: 'Cipralex 10 mg',
    genericName: 'Escitalopram',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of major depressive episodes; panic disorder with or without agoraphobia; social anxiety disorder (social phobia); generalised anxiety disorder (GAD); obsessive-compulsive disorder (OCD).',
    adultDosage:
      'Usual dose is 10 mg taken as a single daily dose with or without food. Depending on individual patient response, the dose may be increased to a maximum of 20 mg daily (maximum 10 mg daily in patients over 65 years of age or with mild-to-moderate hepatic impairment).',
    contraindications:
      'Hypersensitivity to escitalopram or any excipient; concomitant treatment with non-selective, irreversible monoamine oxidase inhibitors (MAOIs) or reversible MAO-A inhibitors (moclobemide) or linezolid due to risk of serotonin syndrome; known QT interval prolongation or congenital long QT syndrome; concomitant use with medicinal products known to prolong the QT interval.',
    sideEffects:
      'Nausea, headache, insomnia, somnolence, dizziness, diarrhoea, constipation, dry mouth, increased sweating (hyperhidrosis), fatigue, sexual dysfunction (delayed ejaculation, decreased libido, anorgasmia), anxiety, restlessness, weight changes, dose-dependent QT prolongation.',
    storageConditions:
      'Do not store above 30°C. Store in the original package.',
    specialties: ['Psychiatry', 'Neurology', 'General Practice / Family Medicine'],
    sourceTitle: 'Cipralex 10 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Cipralex',
  },
  {
    brandName: 'Cipralex 20 mg',
    genericName: 'Escitalopram',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of major depressive episodes, panic disorder with or without agoraphobia, social anxiety disorder, generalised anxiety disorder, and obsessive-compulsive disorder in adult patients requiring maximum SSRI dosing.',
    adultDosage:
      '20 mg once daily orally with or without food (maximum recommended daily dose in adults under 65 years without hepatic impairment).',
    contraindications:
      'Hypersensitivity to escitalopram; concomitant irreversible or reversible MAOIs or linezolid; congenital long QT syndrome or known QT interval prolongation; coadministration with other QT-prolonging drugs.',
    sideEffects:
      'Nausea, insomnia, somnolence, dizziness, headache, diarrhoea, dry mouth, hyperhidrosis, sexual dysfunction, fatigue, dose-dependent QT interval prolongation, hyponatraemia (rare, especially in elderly).',
    storageConditions:
      'Do not store above 30°C. Store in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Cipralex 20 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Cipralex',
  },
  {
    brandName: 'Brintellix 10 mg',
    genericName: 'Vortioxetine',
    drugClassNameEn: 'Multimodal Serotonergic Antidepressant',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of major depressive episodes in adults.',
    adultDosage:
      'Starting and recommended dose is 10 mg vortioxetine once daily in adults under 65 years of age, taken with or without food. Depending on individual patient response, the dose may be increased to a maximum of 20 mg once daily or decreased to a minimum of 5 mg once daily (starting dose in patients >=65 years is 5 mg once daily).',
    contraindications:
      'Hypersensitivity to vortioxetine or any excipient; concomitant use with non-selective monoamine oxidase inhibitors (MAOIs) or selective MAO-A inhibitors.',
    sideEffects:
      'Nausea (most common, usually transient during the first 2 weeks), diarrhoea, constipation, vomiting, dizziness, generalised pruritus, abnormal dreams, flushing, night sweats.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Brintellix (Vortioxetine) — European Medicines Agency EPAR Product Information (Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/brintellix',
  },
  {
    brandName: 'Brintellix 20 mg',
    genericName: 'Vortioxetine',
    drugClassNameEn: 'Multimodal Serotonergic Antidepressant',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of major depressive episodes in adults requiring higher maintenance dosing.',
    adultDosage:
      '20 mg once daily orally with or without food (maximum recommended daily dose). Consider a lower dose if strong CYP2D6 inhibitors (such as bupropion, quinidine, fluoxetine, or paroxetine) are co-administered.',
    contraindications:
      'Hypersensitivity to vortioxetine or any excipient; concomitant non-selective MAOIs or selective MAO-A inhibitors.',
    sideEffects:
      'Nausea, diarrhoea, constipation, vomiting, dizziness, pruritus, abnormal dreams, serotonin syndrome (rare, if combined with serotonergic agents), hyponatraemia (rare).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Brintellix (Vortioxetine) — European Medicines Agency EPAR Product Information (Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/brintellix',
  },
  {
    brandName: 'Deanxit 0.5 mg / 10 mg',
    genericName: 'Flupentixol + Melitracen',
    drugClassNameEn: 'Thioxanthene Neuroleptic & Tricyclic Antidepressant Combination',
    dosageForm: 'Film-coated tablet',
    strength: '0.5 mg / 10 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    indications:
      'Short-term symptomatic management of mild-to-moderate mixed anxiety and depressive states, psychosomatic disturbances accompanied by anxiety and apathy.',
    adultDosage:
      'Usually 2 tablets daily (1 tablet in the morning and 1 tablet at midday). In severe cases the morning dose may be increased to 2 tablets; maintenance dose is 1 tablet in the morning. Not recommended to be taken in the evening due to activating properties.',
    contraindications:
      'Hypersensitivity to flupentixol, melitracen, or any excipient; circulatory collapse, depressed level of consciousness of any cause (acute alcohol, barbiturate, or opiate intoxication), coma; blood dyscrasias; phaeochromocytoma; recent myocardial infarction, any degree of atrioventricular block or cardiac arrhythmias, coronary artery insufficiency; concomitant treatment with MAOIs (within 14 days); untreated narrow-angle glaucoma; agitated or overactive patients.',
    sideEffects:
      'Insomnia, restlessness, agitation, dizziness, tremor, dry mouth, constipation, accommodation disturbances, fatigue, tachycardia, extrapyramidal symptoms (uncommon at low doses).',
    storageConditions:
      'Store below 30°C in the original package to protect from light.',
    specialties: ['Psychiatry', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Deanxit (Flupentixol and Melitracen) — Drugs.com International Monograph (Lundbeck)',
    sourceUrl: 'https://www.drugs.com/international/deanxit.html',
  },

  // =========================================================================
  // ALZHEIMER'S DISEASE & PARKINSON'S DISEASE
  // =========================================================================
  {
    brandName: 'Ebixa 10 mg',
    genericName: 'Memantine hydrochloride',
    drugClassNameEn: 'NMDA Receptor Antagonist (Anti-Dementia)',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of adult patients with moderate to severe Alzheimer’s disease.',
    adultDosage:
      'Titrated in 5 mg weekly increments over the first 3 weeks (Week 1: 5 mg/day; Week 2: 10 mg/day; Week 3: 15 mg/day; Week 4+: 20 mg/day). Recommended maintenance dose is 20 mg once daily (or 10 mg once daily in patients with severe renal impairment, CrCl 5–29 mL/min).',
    contraindications:
      'Hypersensitivity to memantine hydrochloride or any excipient.',
    sideEffects:
      'Dizziness, headache, constipation, somnolence, hypertension, dyspnoea, drug hypersensitivity, elevated liver function test results, balance disorders, confusion, hallucinations (mainly in patients with severe Alzheimer’s disease).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry', 'Internal Medicine'],
    sourceTitle: 'Ebixa (Memantine) — European Medicines Agency EPAR Product Information (Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ebixa',
  },
  {
    brandName: 'Ebixa 20 mg',
    genericName: 'Memantine hydrochloride',
    drugClassNameEn: 'NMDA Receptor Antagonist (Anti-Dementia)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Maintenance treatment of adult patients with moderate to severe Alzheimer’s disease following initial dose titration.',
    adultDosage:
      'Recommended maintenance dose is one 20 mg tablet once daily taken at the same time every day, with or without food.',
    contraindications:
      'Hypersensitivity to memantine hydrochloride or any excipient.',
    sideEffects:
      'Dizziness, headache, constipation, somnolence, hypertension, dyspnoea, balance disorders, elevated hepatic enzymes.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry', 'Internal Medicine'],
    sourceTitle: 'Ebixa (Memantine) — European Medicines Agency EPAR Product Information (Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ebixa',
  },
  {
    brandName: 'Azilect 1 mg',
    genericName: 'Rasagiline',
    drugClassNameEn: 'Selective Irreversible Monoamine Oxidase-B (MAO-B) Inhibitor',
    dosageForm: 'Tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '28 tablets',
    indications:
      'Treatment of idiopathic Parkinson’s disease (PD) in adults as monotherapy (without levodopa) or as adjunct therapy (with levodopa) in patients with end-of-dose fluctuations.',
    adultDosage:
      '1 mg once daily orally, with or without food, either as monotherapy or as adjunct therapy to levodopa.',
    contraindications:
      'Hypersensitivity to rasagiline or any excipient; concomitant treatment with other monoamine oxidase (MAO) inhibitors (including medicinal and natural products without prescription such as St. John’s Wort) or pethidine (at least 14 days must elapse between discontinuation of rasagiline and initiation of MAOIs or pethidine); severe hepatic impairment.',
    sideEffects:
      'Headache, dyskinesia (when used as adjunct to levodopa), orthostatic hypotension, falls, nausea, vomiting, constipation, dry mouth, arthralgia, musculoskeletal pain, neck pain, depression, hallucinations, influenza-like illness.',
    storageConditions:
      'Do not store above 25°C.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Azilect (Rasagiline) — European Medicines Agency EPAR Product Information (Lundbeck / Teva)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/azilect',
  },

  // =========================================================================
  // SCHIZOPHRENIA & PSYCHOTIC DISORDERS (ATYPICAL & TYPICAL ANTIPSYCHOTICS)
  // =========================================================================
  {
    brandName: 'Abilify Maintena 400 mg',
    genericName: 'Aripiprazole',
    drugClassNameEn: 'Long-Acting Injectable Atypical Antipsychotic',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection',
    strength: '400 mg',
    route: 'Intramuscular',
    packSize: '1 vial of powder + 1 vial of 2 mL solvent + sterile needles and syringes',
    indications:
      'Maintenance treatment of schizophrenia in adult patients stabilised with oral aripiprazole.',
    adultDosage:
      'Recommended starting and maintenance dose is 400 mg administered once monthly (no sooner than 26 days after the previous injection) as a single gluteal or deltoid intramuscular injection. After the first injection, treatment with 10 mg to 20 mg oral aripiprazole should be continued for 14 consecutive days. If adverse reactions occur at 400 mg, reduce to 300 mg once monthly.',
    contraindications:
      'Hypersensitivity to aripiprazole or any excipient. Must not be administered intravenously or subcutaneously.',
    sideEffects:
      'Weight increased, diabetes mellitus, agitation, anxiety, restlessness, insomnia, extrapyramidal disorder, akathisia, tremor, dizziness, somnolence, sedation, headache, dry mouth, musculoskeletal stiffness, injection site pain and induration.',
    storageConditions:
      'Do not freeze. Keep in the original package to protect from light. Use immediately after reconstitution.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Abilify Maintena (Aripiprazole) — European Medicines Agency EPAR Product Information (Otsuka / Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/abilify-maintena',
  },
  {
    brandName: 'Rexulti 1 mg',
    genericName: 'Brexpiprazole',
    drugClassNameEn: 'Atypical Antipsychotic (Serotonin-Dopamine Activity Modulator)',
    dosageForm: 'Film-coated tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Treatment of schizophrenia in adults and adolescents aged 13 years and older; adjunctive therapy to antidepressants for the treatment of major depressive disorder (MDD) in adults.',
    adultDosage:
      'Schizophrenia: start at 1 mg once daily on Days 1 to 4, titrate to 2 mg once daily on Days 5 to 7, then to 4 mg once daily on Day 8 based on clinical response and tolerability (recommended target dose 2 mg to 4 mg once daily). Adjunctive treatment of MDD: start at 0.5 mg or 1 mg once daily and titrate at weekly intervals to the recommended target dose of 2 mg once daily (maximum 3 mg/day).',
    contraindications:
      'Known hypersensitivity to brexpiprazole or any excipient.',
    sideEffects:
      'Akathisia, weight gain, somnolence, dizziness, tremor, sedation, fatigue, headache, nasopharyngitis, restlessness.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Rexulti (Brexpiprazole) Film-Coated Tablets — DailyMed FDA Prescribing Information (Otsuka / Lundbeck)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Rexulti',
  },
  {
    brandName: 'Rexulti 2 mg',
    genericName: 'Brexpiprazole',
    drugClassNameEn: 'Atypical Antipsychotic (Serotonin-Dopamine Activity Modulator)',
    dosageForm: 'Film-coated tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    indications:
      'Target maintenance treatment of schizophrenia in adults and adolescents aged 13 years and older; target adjunctive therapy to antidepressants in adults with major depressive disorder (MDD).',
    adultDosage:
      '2 mg once daily orally with or without food (may be increased up to 4 mg once daily in schizophrenia or up to 3 mg once daily as adjunctive therapy in MDD). Adjust dose in moderate-to-severe hepatic or renal impairment or with strong CYP2D6/CYP3A4 inhibitors.',
    contraindications:
      'Hypersensitivity to brexpiprazole or any excipient.',
    sideEffects:
      'Akathisia, weight gain, somnolence, headache, dizziness, tremor, extrapyramidal symptoms, hyperprolactinaemia, metabolic changes (hyperglycaemia, dyslipidaemia).',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Rexulti (Brexpiprazole) Film-Coated Tablets — DailyMed FDA Prescribing Information (Otsuka / Lundbeck)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Rexulti',
  },
  {
    brandName: 'Clopixol 10 mg',
    genericName: 'Zuclopenthixol',
    drugClassNameEn: 'Thioxanthene Typical Antipsychotic',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '100 film-coated tablets',
    indications:
      'Acute and chronic schizophrenia and other psychotic disorders, particularly with symptoms such as hallucinations, delusions, thought disturbances, agitation, restlessness, hostility, and aggressiveness.',
    adultDosage:
      'Individually adjusted according to patient condition. Initially 20–30 mg daily in divided doses, increasing if necessary to a maximum of 150 mg daily; usual maintenance dose is 20–50 mg daily.',
    contraindications:
      'Hypersensitivity to zuclopenthixol or thioxanthenes; circulatory collapse, depressed level of consciousness of any cause (acute alcohol, barbiturate or opiate intoxication), coma.',
    sideEffects:
      'Somnolence, akathisia, hyperkinesia, hypokinesia, extrapyramidal symptoms (parkinsonism, dystonia, tremor), dry mouth, accommodation disorder, urinary retention, constipation, tachycardia, orthostatic hypotension, weight gain, hyperprolactinaemia.',
    storageConditions:
      'Do not store above 25°C. Keep the container tightly closed to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Clopixol 10 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Clopixol',
  },
  {
    brandName: 'Clopixol 25 mg',
    genericName: 'Zuclopenthixol',
    drugClassNameEn: 'Thioxanthene Typical Antipsychotic',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '100 film-coated tablets',
    indications:
      'Maintenance and acute management of schizophrenia and other psychoses presenting with agitation, hostility, delusions, and hallucinations.',
    adultDosage:
      '20–50 mg daily orally as a single evening dose or in divided doses; up to 150 mg daily in severe acute psychosis.',
    contraindications:
      'Hypersensitivity to zuclopenthixol or thioxanthenes; circulatory collapse, CNS depression of any cause, coma.',
    sideEffects:
      'Extrapyramidal symptoms (rigidity, tremor, akathisia, acute dystonia), somnolence, dry mouth, blurred vision, constipation, tachycardia, postural hypotension, QT prolongation.',
    storageConditions:
      'Do not store above 25°C. Protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Clopixol 25 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Clopixol',
  },
  {
    brandName: 'Clopixol Depot 200 mg / mL',
    genericName: 'Zuclopenthixol decanoate',
    drugClassNameEn: 'Long-Acting Depot Thioxanthene Antipsychotic',
    dosageForm: 'Solution for injection',
    strength: '200 mg / mL',
    route: 'Intramuscular',
    packSize: '10 ampoules x 1 mL',
    indications:
      'Maintenance treatment of schizophrenia and paranoid psychoses, particularly in patients with agitation, hostility, or poor adherence to oral antipsychotic medication.',
    adultDosage:
      'Administered by deep intramuscular injection into the upper outer quadrant of the buttock. Usual maintenance dose is 200 mg to 400 mg (1 mL to 2 mL) every 2 to 4 weeks; some patients may require higher doses or shorter intervals.',
    contraindications:
      'Hypersensitivity to zuclopenthixol decanoate, vegetable oil vehicle, or thioxanthenes; circulatory collapse, depressed level of consciousness, coma.',
    sideEffects:
      'Extrapyramidal symptoms (parkinsonism, akathisia, tardive dyskinesia), somnolence, dry mouth, constipation, urinary retention, weight gain, injection site pain or nodule, hyperprolactinaemia, neuroleptic malignant syndrome (rare).',
    storageConditions:
      'Do not store above 25°C. Keep the ampoules in the outer carton in order to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Clopixol Conc / Depot 200 mg/mL Solution for Injection — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Clopixol',
  },
  {
    brandName: 'Fluanxol 0.5 mg',
    genericName: 'Flupentixol',
    drugClassNameEn: 'Thioxanthene Antipsychotic & Antidepressant',
    dosageForm: 'Film-coated tablet',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Depressive illness, including mild-to-moderate depression with or without anxiety and psychosomatic symptoms.',
    adultDosage:
      'Initially 1 mg (two 0.5 mg tablets) as a single morning dose (0.5 mg in elderly patients). After 1 week, the dose may be increased to 2 mg daily (maximum 3 mg daily in divided doses before 4 pm).',
    contraindications:
      'Hypersensitivity to flupentixol or thioxanthenes; excitable or agitated patients; circulatory collapse, depressed level of consciousness of any cause, coma; phaeochromocytoma; blood dyscrasias; recent myocardial infarction or cardiac arrhythmias.',
    sideEffects:
      'Insomnia, restlessness, nervousness, dizziness, tremor, dry mouth, accommodation disorder, fatigue, rare extrapyramidal symptoms.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Fluanxol 0.5 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fluanxol',
  },
  {
    brandName: 'Fluanxol 1 mg',
    genericName: 'Flupentixol',
    drugClassNameEn: 'Thioxanthene Antipsychotic & Antidepressant',
    dosageForm: 'Film-coated tablet',
    strength: '1 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Depressive illness with or without anxiety; schizophrenia and other psychotic disorders (at higher doses).',
    adultDosage:
      'Depression: initially 1 mg in the morning, increased after 1 week to 2 mg daily if needed (maximum 3 mg daily; last dose before 4 pm). Psychoses: initially 3–9 mg twice daily, adjusted according to clinical response up to a maximum of 40 mg daily.',
    contraindications:
      'Hypersensitivity to flupentixol or thioxanthenes; circulatory collapse, depressed CNS state, coma, phaeochromocytoma; agitated or overactive patients (at low antidepressant doses).',
    sideEffects:
      'Insomnia, restlessness, extrapyramidal symptoms (dose-related), dry mouth, blurred vision, constipation, tachycardia, dizziness.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Fluanxol 1 mg Film-Coated Tablets — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fluanxol',
  },
  {
    brandName: 'Fluanxol Depot 20 mg / mL',
    genericName: 'Flupentixol decanoate',
    drugClassNameEn: 'Long-Acting Depot Thioxanthene Antipsychotic',
    dosageForm: 'Solution for injection',
    strength: '20 mg / mL',
    route: 'Intramuscular',
    packSize: '10 ampoules x 1 mL',
    indications:
      'Maintenance treatment of schizophrenia and other psychoses, particularly with symptoms such as hallucinations, paranoid delusions, apathy, anergia, and social withdrawal.',
    adultDosage:
      'Administered by deep intramuscular injection into the upper outer quadrant of the buttock. Test dose of 20 mg (1 mL) in neuroleptic-naive patients, followed after at least 7 days by 20 mg to 40 mg repeated every 2 to 4 weeks according to clinical response.',
    contraindications:
      'Hypersensitivity to flupentixol decanoate or thioxanthenes; circulatory collapse, depressed level of consciousness of any cause, coma.',
    sideEffects:
      'Extrapyramidal symptoms (parkinsonism, akathisia, dystonia, tardive dyskinesia), insomnia, restlessness, somnolence, dry mouth, weight changes, hyperprolactinaemia, injection site reactions.',
    storageConditions:
      'Do not store above 25°C. Keep the ampoules in the outer carton to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Depixol / Fluanxol Depot 20 mg/mL Solution for Injection — UK eMC SmPC (Lundbeck)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fluanxol',
  },

  // =========================================================================
  // MIGRAINE PREVENTION (MONOCLONAL ANTIBODY)
  // =========================================================================
  {
    brandName: 'Vyepti 100 mg',
    genericName: 'Eptinezumab',
    drugClassNameEn: 'Anti-CGRP Monoclonal Antibody (Migraine Prophylaxis)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '100 mg / mL',
    route: 'Intravenous',
    packSize: '1 vial x 1 mL concentrate',
    indications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month.',
    adultDosage:
      'Recommended dose is 100 mg administered by intravenous infusion every 12 weeks (some patients may benefit from 300 mg every 12 weeks). Dilute in 100 mL of 0.9% sodium chloride solution for injection and infuse over approximately 30 minutes; do not administer as an IV push or bolus.',
    contraindications:
      'Hypersensitivity to eptinezumab or any excipient (sorbitol, L-histidine, polysorbate 80).',
    sideEffects:
      'Nasopharyngitis, hypersensitivity reactions (urticaria, flushing, rash, pruritus, rare anaphylaxis), fatigue, infusion-related reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze or shake. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Vyepti (Eptinezumab) — European Medicines Agency EPAR Product Information (Lundbeck)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vyepti',
  },
];

function toLundbeckProductDraft(item: CompactLundbeckDrug): AiProductDraft {
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
    sources: LUND_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official H. Lundbeck A/S regulatory monograph (EMA EPAR / UK eMC SmPC / DailyMed FDA); saved as draft pending verification.',
  };
}

export const LUNDBECK_PRODUCTS: AiProductDraft[] = LUNDBECK_COMPACT_PRODUCTS.map(
  toLundbeckProductDraft
);

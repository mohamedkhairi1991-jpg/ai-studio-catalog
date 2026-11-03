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

const RAW_HAYAT_PHARMA: CompactDrug[] = [
  // 1. Biodal (Colecalciferol — Hayat Pharmaceutical Industries Co.)
  {
    brandName: 'Biodal 50000 IU',
    genericName: 'Colecalciferol',
    activeIngredients: ['Colecalciferol'],
    drugClass: 'Vitamin D3 (secosteroid calcium and bone homeostasis regulator)',
    strength: '50,000 IU (1.25 mg)',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Treatment of clinically confirmed vitamin D deficiency (serum 25-hydroxyvitamin D < 25 nmol/L or < 10 ng/mL) in adults; and adjunct to specific therapy for osteoporosis in patients with vitamin D deficiency or at risk of vitamin D insufficiency.',
    dose:
      'Adults (treatment of vitamin D deficiency): One 50,000 IU tablet once weekly for 6 to 8 weeks (total loading dose 300,000 to 400,000 IU), followed by maintenance therapy (equivalent to 800 to 2,000 IU daily or one 50,000 IU tablet monthly) guided by serum 25(OH)D and calcium monitoring. Take with a main meal to enhance absorption.',
    contraindications:
      'Hypersensitivity to colecalciferol or excipients; diseases and/or conditions resulting in hypercalcaemia and/or hypercalciuria; nephrolithiasis (renal calcium calculi) or nephrocalcinosis; severe renal impairment; hypervitaminosis D.',
    adverseEffects:
      'Uncommon: hypercalcaemia and hypercalciuria. Rare: pruritus, rash, urticaria. Symptoms of overdose/hypercalcaemia include nausea, vomiting, polydipsia, polyuria, constipation, dehydration, and renal calculi.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Orthopedics', 'Rheumatology'],
    sources: [
      {
        title: 'Hayat Pharmaceutical Industries Co. — Vitamins & Supplements Portfolio (Biodal / Colecalciferol)',
        url: 'https://www.hayatpharma.com/products/',
      },
    ],
    notes:
      'Official Hayat Pharmaceutical Industries Co. (Amman, Jordan) SmPC data. Each film-coated tablet contains 50,000 IU (1.25 mg) colecalciferol (vitamin D3; INN base: Colecalciferol).',
  },
  {
    brandName: 'Biodal 5000 IU',
    genericName: 'Colecalciferol',
    activeIngredients: ['Colecalciferol'],
    drugClass: 'Vitamin D3 (secosteroid calcium and bone homeostasis regulator)',
    strength: '5,000 IU (125 micrograms)',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Prevention and treatment of vitamin D deficiency and insufficiency in adults and adolescents; and adjunctive therapy in osteoporosis and osteomalacia.',
    dose:
      'Adults: One 5,000 IU tablet daily for 8 to 12 weeks for treatment of vitamin D insufficiency, or 1 to 2 tablets weekly for maintenance therapy as directed by a physician based on serum 25(OH)D levels.',
    contraindications:
      'Hypersensitivity to colecalciferol or excipients; hypercalcaemia, hypercalciuria, calcium nephrolithiasis, nephrocalcinosis, severe renal failure, hypervitaminosis D.',
    adverseEffects:
      'Uncommon: hypercalcaemia, hypercalciuria. Rare: gastrointestinal discomfort (constipation, flatulence, nausea), skin rash, pruritus.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Orthopedics', 'Rheumatology'],
    sources: [
      {
        title: 'Hayat Pharmaceutical Industries Co. — Vitamins & Supplements Portfolio (Biodal 5000 IU)',
        url: 'https://www.hayatpharma.com/products/',
      },
    ],
    notes:
      'Official Hayat Pharmaceutical Industries Co. SmPC data. Each film-coated tablet contains 5,000 IU (125 micrograms) colecalciferol (INN base: Colecalciferol).',
  },

  // 2. Xenodol (Lornoxicam — Hayat Pharmaceutical Industries Co.)
  {
    brandName: 'Xenodol 8 mg',
    genericName: 'Lornoxicam',
    activeIngredients: ['Lornoxicam'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, oxicam class)',
    strength: '8 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Short-term relief of acute mild to moderate pain; symptomatic relief of pain and inflammation in osteoarthritis and rheumatoid arthritis in adults.',
    dose:
      'Acute pain: 8 mg to 16 mg daily divided into 2 or 3 doses (maximum 24 mg on Day 1, then maximum 16 mg daily thereafter). Osteoarthritis and rheumatoid arthritis: initial recommended dose of 12 mg daily divided into 2 or 3 doses; maintenance dose should not exceed 16 mg daily. Take before meals with a sufficient amount of water.',
    contraindications:
      'Hypersensitivity to lornoxicam, aspirin, or other NSAIDs; thrombocytopenia; severe heart failure; gastrointestinal bleeding, cerebrovascular bleeding, or other bleeding disorders; history of GI bleeding or perforation related to previous NSAID therapy; active or history of recurrent peptic ulcer/haemorrhage; severe hepatic or severe renal impairment (serum creatinine > 700 micromol/L); third trimester of pregnancy.',
    adverseEffects:
      'Common: mild and transient headache, dizziness, nausea, abdominal pain, dyspepsia, diarrhoea, vomiting. Uncommon: anorexia, insomnia, depression, conjunctivitis, vertigo, tinnitus, palpitations, tachycardia, flushing, oedema, rhinitis, constipation, flatulence, gastritis, gastric or duodenal ulcer, elevated hepatic transaminases (ALT, AST), rash, pruritus, arthralgia.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Hayat Pharmaceutical Industries Co. — Pain & Inflammation Portfolio (Xenodol / Lornoxicam)',
        url: 'https://www.hayatpharma.com/products/',
      },
    ],
    notes:
      'Official Hayat Pharmaceutical Industries Co. SmPC data. Each film-coated tablet contains 8 mg lornoxicam.',
  },

  // 3. Alpranax (Alprazolam — Hayat Pharmaceutical Industries Co.)
  {
    brandName: 'Alpranax 0.5 mg',
    genericName: 'Alprazolam',
    activeIngredients: ['Alprazolam'],
    drugClass: 'Triazolobenzodiazepine anxiolytic',
    strength: '0.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Short-term symptomatic treatment of anxiety in adults when the disorder is severe, disabling, or subjecting the individual to extreme distress; and treatment of panic disorder, with or without agoraphobia.',
    dose:
      'Anxiety: initial dose 0.25 mg to 0.5 mg three times daily, adjusted according to patient response up to a maximum of 4 mg daily in divided doses. Panic disorder: initial dose 0.5 mg to 1 mg at bedtime or 0.5 mg three times daily, titrated gradually. Elderly or debilitated patients: 0.25 mg two or three times daily. Total duration of treatment should be as short as possible (not exceeding 2–4 weeks for anxiety, including tapering off).',
    contraindications:
      'Hypersensitivity to alprazolam, benzodiazepines, or excipients; myasthenia gravis; severe respiratory insufficiency; sleep apnoea syndrome; severe hepatic insufficiency; acute intoxication with alcohol or other CNS depressants.',
    adverseEffects:
      'Very common: depression, sedation, somnolence, ataxia, memory impairment, dysarthria, dizziness, headache, constipation, dry mouth, fatigue, irritability. Common: decreased appetite, confusional state, disorientation, libido changes, anxiety, insomnia, nervousness, balance disorder, abnormal coordination, disturbance in attention, hypersomnia, lethargy, tremor, blurred vision, nausea, dermatitis, sexual dysfunction, weight changes. Risk of physical and psychological dependence and withdrawal phenomena.',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Psychiatry', 'Neurology'],
    sources: [
      {
        title: 'Hayat Pharmaceutical Industries Co. — Neurology & CNS Portfolio (Alpranax / Alprazolam)',
        url: 'https://www.hayatpharma.com/products/',
      },
    ],
    notes:
      'Official Hayat Pharmaceutical Industries Co. SmPC data. Each tablet contains 0.5 mg alprazolam. Controlled prescription medicine.',
  },
];

export const HAYAT_PHARMA_PRODUCTS: AiProductDraft[] = RAW_HAYAT_PHARMA.map((d) => ({
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

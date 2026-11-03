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

const RAW_AL_KINDI: CompactDrug[] = [
  // 1. Azithrokindin 500 mg (Azithromycin — Al-Kindi)
  {
    brandName: 'Azithrokindin 500 mg',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) systemic antibacterial (ATC J01FA10)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Treatment of bacterial infections caused by azithromycin-susceptible organisms: acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, uncomplicated skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents ≥45 kg: 500 mg orally once daily for 3 consecutive days (total dose 1500 mg). For uncomplicated Chlamydia trachomatis genital infections: 1000 mg as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or any excipient.',
    adverseEffects:
      'Diarrhoea, abdominal pain, nausea, flatulence, vomiting, dyspepsia, headache, dizziness, dysgeusia. Rare: QT interval prolongation, hepatic dysfunction/cholestatic jaundice, Clostridioides difficile-associated diarrhoea.',
    storage:
      'Store below 30°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Al-Kindi Co. for Pharmaceutical Industry — Official Tablets Catalog Page 4 (AZITHROKINDIN 500)',
        url: 'https://www.alkindipharma.com/shop?page=4',
      },
    ],
    notes:
      'Official Al-Kindi Co. for Pharmaceutical Industry (Baghdad, Iraq) product catalog data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin base (INN base: Azithromycin).',
  },

  // 2. Amlodepen 5 mg (Amlodipine — Al-Kindi)
  {
    brandName: 'Amlodepen 5 mg',
    genericName: 'Amlodipine',
    activeIngredients: ['Amlodipine'],
    drugClass: 'Dihydropyridine calcium channel blocker antihypertensive and antianginal (ATC C08CA01)',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; vasospastic (Prinzmetal’s) angina.',
    dose:
      'Adults: For both hypertension and angina, the usual initial dose is 5 mg orally once daily, which may be increased to a maximum dose of 10 mg once daily depending on the individual patient’s response.',
    contraindications:
      'Hypersensitivity to dihydropyridine derivatives, amlodipine, or any excipient; severe hypotension; shock (including cardiogenic shock); obstruction of the outflow tract of the left ventricle (e.g., high-grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Oedema (ankle swelling), somnolence, dizziness, headache, palpitations, flushing, abdominal pain, nausea, fatigue, asthenia, visual disturbance, muscle cramps.',
    storage:
      'Store below 25°C protected from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Al-Kindi Co. for Pharmaceutical Industry — Official Tablets Catalog Page 4 (AMLODEPEN 5 TABLETS)',
        url: 'https://www.alkindipharma.com/shop?page=4',
      },
    ],
    notes:
      'Official Al-Kindi Co. for Pharmaceutical Industry (Baghdad, Iraq) product catalog data. Each tablet contains amlodipine besilate equivalent to 5 mg amlodipine base (INN base: Amlodipine).',
  },

  // 3. Lyrikine 75 mg (Pregabalin — Al-Kindi)
  {
    brandName: 'Lyrikine 75 mg',
    genericName: 'Pregabalin',
    activeIngredients: ['Pregabalin'],
    drugClass: 'Gamma-aminobutyric acid (GABA) analogue antiepileptic and neuropathic pain agent (ATC N03AX16)',
    strength: '75 mg',
    dosageForm: 'Capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 hard capsules in blisters',
    indications:
      'Treatment of peripheral and central neuropathic pain in adults; adjunctive therapy in adults with partial seizures with or without secondary generalisation; treatment of generalised anxiety disorder (GAD) in adults.',
    dose:
      'Adults: Dose range is 150 to 600 mg per day given in either two or three divided doses. Initiate at 150 mg/day (75 mg twice daily); based on individual response and tolerability, may be increased to 300 mg/day after 3–7 days, and if needed to maximum 600 mg/day after an additional 7-day interval. Adjust dose in renal impairment; discontinue gradually over at least 1 week.',
    contraindications:
      'Hypersensitivity to pregabalin or to any of the excipients.',
    adverseEffects:
      'Dizziness, somnolence, headache, increased appetite, weight gain, euphoric mood, confusion, irritability, ataxia, abnormal coordination, tremor, dysarthria, memory impairment, blurred vision, diplopia, vertigo, dry mouth, constipation, vomiting, flatulence, peripheral oedema, fatigue.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Neurology', 'Endocrinology & Diabetes', 'Psychiatry', 'Internal Medicine'],
    sources: [
      {
        title: 'Al-Kindi Co. for Pharmaceutical Industry — Official Capsules Catalog (LYRIKINE 75 CAPSULES)',
        url: 'https://www.alkindipharma.com/shop-1',
      },
    ],
    notes:
      'Official Al-Kindi Co. for Pharmaceutical Industry (Baghdad, Iraq) product catalog data. Each hard capsule contains 75 mg pregabalin (INN base: Pregabalin).',
  },

  // 4. Calcium-Kindi 500 mg (Calcium carbonate — Al-Kindi)
  {
    brandName: 'Calcium-Kindi 500 mg',
    genericName: 'Calcium carbonate',
    activeIngredients: ['Calcium carbonate'],
    drugClass: 'Calcium mineral supplement and oral phosphate binder (ATC A12AA04)',
    strength: '500 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Prevention and treatment of calcium deficiency states; adjunct to specific therapy in the prevention and treatment of osteoporosis; control of hyperphosphataemia in patients with chronic renal failure.',
    dose:
      'Adults: Calcium supplementation / osteoporosis adjunct: 1 to 3 tablets (500–1500 mg calcium carbonate) daily in divided doses with meals. Hyperphosphataemia in chronic renal failure: taken with meals, titrated according to serum phosphate levels.',
    contraindications:
      'Hypersensitivity to calcium carbonate or any excipient; diseases and/or conditions resulting in hypercalcaemia and/or hypercalciuria; severe renal calculi (nephrolithiasis).',
    adverseEffects:
      'Constipation, flatulence, nausea, abdominal pain, diarrhoea. Uncommon/Rare: hypercalcaemia and hypercalciuria (with prolonged high doses), milk-alkali syndrome.',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Endocrinology & Diabetes', 'Nephrology', 'Obstetrics & Gynecology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Al-Kindi Co. for Pharmaceutical Industry — Official Product Page (CALCIUM-KINDI TABLETS 500 mg)',
        url: 'https://www.alkindipharma.com/ar/product-page/calcium-kindi-tablets',
      },
    ],
    notes:
      'Official Al-Kindi Co. for Pharmaceutical Industry (Baghdad, Iraq) product catalog data. Each tablet contains 500 mg calcium carbonate (INN base: Calcium carbonate).',
  },
];

export const AL_KINDI_PRODUCTS: AiProductDraft[] = RAW_AL_KINDI.map((d) => ({
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

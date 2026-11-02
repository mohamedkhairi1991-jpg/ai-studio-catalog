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

const RAW_RIYADH_PHARMA: CompactDrug[] = [
  // 1. Gastrozole (Omeprazole — Riyadh Pharma)
  {
    brandName: 'Gastrozole 20 mg',
    brandNameAr: 'غاستروزول 20 ملغ',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Treatment and prevention of relapse of duodenal ulcers and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease in combination with appropriate antibiotics; treatment and prophylaxis of NSAID-associated gastric and duodenal ulcers; treatment and maintenance of reflux oesophagitis; symptomatic gastro-oesophageal reflux disease; and Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 20 mg once daily for 2–4 weeks. Gastric ulcer and reflux oesophagitis: 20 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics. NSAID ulcer prophylaxis: 20 mg once daily. Swallow whole in the morning before food.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps. Uncommon: dizziness, insomnia, paraesthesia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place, protected from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Saudi Food and Drug Authority (SFDA) / Riyadh Pharma — Gastrozole (omeprazole 20 mg) Registered Product Information',
        url: 'https://www.sfda.gov.sa/en/drugs-list',
      },
    ],
    notes:
      'Official Riyadh Pharma (Medical and Cosmetic Products Co. Ltd., Riyadh, Saudi Arabia) / SFDA registered SmPC data. Each gastro-resistant hard capsule contains 20 mg omeprazole.',
  },

  // 2. Riapanta (Pantoprazole — Riyadh Pharma)
  {
    brandName: 'Riapanta 20 mg',
    brandNameAr: 'ريابانتا 20 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis; and prevention of gastroduodenal ulcers induced by non-selective NSAIDs in patients at risk requiring continuous NSAID treatment.',
    dose:
      'Symptomatic GORD and long-term reflux oesophagitis maintenance: 20 mg once daily. NSAID-induced ulcer prophylaxis: 20 mg once daily. Swallow whole 1 hour before a meal with water.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain, elevated liver enzymes, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Saudi Food and Drug Authority (SFDA) / Riyadh Pharma — Riapanta (pantoprazole) Registered Product Information',
        url: 'https://www.sfda.gov.sa/en/drugs-list',
      },
    ],
    notes:
      'Official Riyadh Pharma / SFDA registered SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 20 mg pantoprazole (INN base: Pantoprazole).',
  },
  {
    brandName: 'Riapanta 40 mg',
    brandNameAr: 'ريابانتا 40 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Reflux oesophagitis; eradication of Helicobacter pylori in combination with two appropriate antibiotics in patients with peptic ulcers; gastric and duodenal ulcer; and Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily for 2–8 weeks. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Zollinger-Ellison syndrome: initially 80 mg daily. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, bloating, constipation, dry mouth, abdominal pain, elevated hepatic transaminases, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Saudi Food and Drug Authority (SFDA) / Riyadh Pharma — Riapanta 40 mg Registered Product Information',
        url: 'https://www.sfda.gov.sa/en/drugs-list',
      },
    ],
    notes:
      'Official Riyadh Pharma / SFDA registered SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole (INN base: Pantoprazole).',
  },

  // 3. Simvagen Plus (Ezetimibe + Simvastatin — Riyadh Pharma)
  {
    brandName: 'Simvagen Plus 10 mg/20 mg',
    brandNameAr: 'سيمفاجين بلس 10 ملغ/20 ملغ',
    genericName: 'Ezetimibe + Simvastatin',
    activeIngredients: ['Ezetimibe', 'Simvastatin'],
    drugClass: 'Cholesterol absorption inhibitor and HMG-CoA reductase inhibitor (statin) fixed-dose combination',
    strength: '10 mg/20 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Adjunctive therapy to diet in adult patients with primary (heterozygous familial and non-familial) hypercholesterolaemia or mixed hyperlipidaemia not appropriately controlled with a statin alone or already treated with a statin and ezetimibe; homozygous familial hypercholesterolaemia; and prevention of cardiovascular events in patients with coronary heart disease and a history of acute coronary syndrome.',
    dose:
      'One tablet (10 mg ezetimibe / 20 mg simvastatin) once daily in the evening, with or without food. Separate by at least 2 hours before or 4 hours after administration of a bile acid sequestrant.',
    contraindications:
      'Hypersensitivity to ezetimibe, simvastatin, or excipients; pregnancy and lactation; active liver disease or unexplained persistent elevations in serum transaminases; concomitant administration of potent CYP3A4 inhibitors (itraconazole, ketoconazole, posaconazole, voriconazole, HIV protease inhibitors, boceprevir, telaprevir, erythromycin, clarithromycin, telithromycin, nefazodone, cobicistat), gemfibrozil, ciclosporin, or danazol.',
    adverseEffects:
      'Common: elevations in serum ALT and/or AST, increased blood creatine kinase, myalgia, headache, abdominal pain, constipation, flatulence, dyspepsia, diarrhoea, nausea.',
    storage:
      'Store below 30°C in the original package to protect from moisture and light.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Saudi Food and Drug Authority (SFDA) / Riyadh Pharma — Simvagen Plus (ezetimibe / simvastatin) Registered Product Information',
        url: 'https://www.sfda.gov.sa/en/drugs-list',
      },
    ],
    notes:
      'Official Riyadh Pharma / SFDA registered SmPC data. Each tablet contains 10 mg ezetimibe and 20 mg simvastatin. Also available in 10 mg/40 mg strength.',
  },

  // 4. Lorahist (Loratadine — Riyadh Pharma)
  {
    brandName: 'Lorahist 10 mg',
    brandNameAr: 'لوراهيست 10 ملغ',
    genericName: 'Loratadine',
    activeIngredients: ['Loratadine'],
    drugClass: 'Second-generation non-sedating histamine H1-receptor antagonist',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 30 tablets in blisters',
    indications:
      'Symptomatic treatment of allergic rhinitis (seasonal and perennial) and chronic idiopathic urticaria in adults and children aged 6 years and older weighing > 30 kg.',
    dose:
      'Adults and children over 6 years (body weight > 30 kg): One 10 mg tablet once daily, taken with or without food. Patients with severe hepatic impairment: 10 mg every other day.',
    contraindications:
      'Hypersensitivity to loratadine or to any of the excipients.',
    adverseEffects:
      'Common: somnolence, headache, increased appetite, insomnia. Very rare: dizziness, convulsion, tachycardia, palpitations, nausea, dry mouth, gastritis, abnormal hepatic function, rash, alopecia, fatigue.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Allergy and Immunology', 'Dermatology', 'ENT', 'Internal Medicine'],
    sources: [
      {
        title: 'Saudi Food and Drug Authority (SFDA) / Riyadh Pharma — Lorahist (loratadine 10 mg) Registered Product Information',
        url: 'https://www.sfda.gov.sa/en/drugs-list',
      },
    ],
    notes:
      'Official Riyadh Pharma / SFDA registered SmPC data. Each tablet contains 10 mg loratadine.',
  },
];

export const RIYADH_PHARMA_PRODUCTS: AiProductDraft[] = RAW_RIYADH_PHARMA.map((d) => ({
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
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

const RAW_NOBEL_ILAC: CompactDrug[] = [
  // 1. Etol Fort 400 mg (Etodolac — Nobel Ilac)
  {
    brandName: 'Etol Fort 400 mg',
    brandNameAr: 'إيتول فورت 400 ملغ',
    genericName: 'Etodolac',
    activeIngredients: ['Etodolac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID), pyranocarboxylic acid derivative (ATC M01AB08)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 film-coated tablets in blisters',
    indications:
      'Acute or long-term management of signs and symptoms of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis, as well as relief of acute musculoskeletal and postoperative pain.',
    dose:
      'Adults: Osteoarthritis / rheumatoid arthritis: 400 mg once or twice daily (400–800 mg/day; maximum 1200 mg/day in divided doses). Acute pain: 200–400 mg every 6–8 hours as needed (not to exceed 1000–1200 mg/day). Take with food or water.',
    contraindications:
      'Hypersensitivity to etodolac or any excipient; active peptic ulcer or history of recurrent GI ulceration/bleeding; history of GI bleeding or perforation related to previous NSAID therapy; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy; aspirin/NSAID-induced asthma, rhinitis, or urticaria.',
    adverseEffects:
      'Dyspepsia, abdominal pain, nausea, diarrhoea, flatulence, constipation, gastritis, dizziness, headache, asthenia, tinnitus, rash, pruritus, fluid retention/oedema. Rare: GI ulceration/haemorrhage, elevated hepatic enzymes, renal dysfunction.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Nobel İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Etol Fort 400 mg Film Tablet)',
        url: 'https://www.nobelilac.com.tr',
      },
    ],
    notes:
      'Official Nobel İlaç KÜB (SmPC) data. Each film-coated tablet contains 400 mg etodolac (INN base: Etodolac).',
  },

  // 2. Pulcet 40 mg (Pantoprazole — Nobel Ilac)
  {
    brandName: 'Pulcet 40 mg',
    brandNameAr: 'بولسيت 40 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (PPI) gastric acid secretion inhibitor (ATC A02BC02)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Reflux oesophagitis; eradication of Helicobacter pylori in combination with appropriate antibiotic therapy in patients with peptic ulcers; gastric and duodenal ulcer; Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Adults and adolescents ≥12 years in reflux oesophagitis: 40 mg once daily for 4–8 weeks. Adults in gastric/duodenal ulcer: 40 mg once daily. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Swallow whole with water 1 hour before a meal; do not chew or crush.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    adverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain, elevated hepatic transaminases, skin rash. Rare: hypomagnesaemia, interstitial nephritis.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Nobel İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Pulcet 40 mg Enterik Kaplı Tablet)',
        url: 'https://www.nobelilac.com.tr',
      },
    ],
    notes:
      'Official Nobel İlaç KÜB (SmPC) data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole base (INN base: Pantoprazole).',
  },

  // 3. Ultrox 20 mg (Rosuvastatin — Nobel Ilac)
  {
    brandName: 'Ultrox 20 mg',
    brandNameAr: 'أولتروكس 20 ملغ',
    genericName: 'Rosuvastatin',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin) lipid-modifying agent (ATC C10AA07)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of primary hypercholesterolaemia (type IIa including heterozygous familial hypercholesterolaemia) or mixed dyslipidaemia (type IIb) as an adjunct to diet; homozygous familial hypercholesterolaemia; prevention of major cardiovascular events in patients estimated to have a high risk for a first cardiovascular event.',
    dose:
      'Adults: Recommended start dose is 5 mg or 10 mg orally once daily; may be adjusted after 4 weeks to 20 mg once daily if necessary. May be given at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to rosuvastatin or any excipient; active liver disease including unexplained persistent elevations of serum transaminases; severe renal impairment (creatinine clearance <30 mL/min); myopathy; concomitant ciclosporin; pregnancy, lactation, and women of childbearing potential not using appropriate contraceptive measures.',
    adverseEffects:
      'Diabetes mellitus, headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia. Uncommon/Rare: pruritus, rash, urticaria, myopathy (including myositis), rhabdomyolysis, elevated hepatic transaminases, pancreatitis.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology & Diabetes', 'Internal Medicine'],
    sources: [
      {
        title: 'Nobel İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Ultrox 20 mg Film Kaplı Tablet)',
        url: 'https://www.nobelilac.com.tr',
      },
    ],
    notes:
      'Official Nobel İlaç KÜB (SmPC) data. Each film-coated tablet contains rosuvastatin calcium equivalent to 20 mg rosuvastatin base (INN base: Rosuvastatin).',
  },

  // 4. Lansoprol 30 mg (Lansoprazole — Nobel Ilac)
  {
    brandName: 'Lansoprol 30 mg',
    brandNameAr: 'لانسوبرول 30 ملغ',
    genericName: 'Lansoprazole',
    activeIngredients: ['Lansoprazole'],
    drugClass: 'Proton pump inhibitor (PPI) gastric acid secretion inhibitor (ATC A02BC03)',
    strength: '30 mg',
    dosageForm: 'Gastro-resistant capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant micropellet capsules',
    indications:
      'Treatment of duodenal and gastric ulcer; treatment and prophylaxis of reflux oesophagitis; eradication of Helicobacter pylori concurrently with appropriate antibiotic therapy; treatment and prophylaxis of NSAID-associated benign gastric and duodenal ulcers in patients requiring continued NSAID treatment; symptomatic gastro-oesophageal reflux disease; Zollinger-Ellison syndrome.',
    dose:
      'Adults: Duodenal ulcer: 30 mg once daily for 2 weeks (up to 4 weeks). Gastric ulcer and reflux oesophagitis: 30 mg once daily for 4 weeks (up to 8 weeks). H. pylori eradication: 30 mg twice daily for 7–14 days in combination with two antibiotics. Take at least 30 minutes before food; swallow whole with liquid.',
    contraindications:
      'Hypersensitivity to lansoprazole or to any of the excipients.',
    adverseEffects:
      'Headache, dizziness, nausea, diarrhoea, stomach ache, constipation, vomiting, flatulence, dry mouth or throat, benign fundic gland polyps, increase in liver enzyme levels, urticaria, itching, rash, fatigue.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Nobel İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Lansoprol 30 mg Enterik Kaplı Mikropellet Kapsül)',
        url: 'https://www.nobelilac.com.tr',
      },
    ],
    notes:
      'Official Nobel İlaç KÜB (SmPC) data. Each gastro-resistant capsule contains 30 mg lansoprazole in enteric-coated micropellets (INN base: Lansoprazole).',
  },
];

export const NOBEL_ILAC_PRODUCTS: AiProductDraft[] = RAW_NOBEL_ILAC.map((d) => ({
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
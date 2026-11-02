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

const RAW_BILIM_ILAC: CompactDrug[] = [
  // 1. Klamoks BID 1000 mg (Amoxicillin + Clavulanic acid — Bilim Ilac)
  {
    brandName: 'Klamoks BID 1000 mg',
    brandNameAr: 'كلاموكس بيد 1000 ملغ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin antibacterial plus beta-lactamase inhibitor combination (ATC J01CR02)',
    strength: '875 mg / 125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections in adults and children caused by susceptible organisms: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscesses), and bone and joint infections.',
    dose:
      'Adults and children ≥40 kg: One 875 mg/125 mg (1000 mg) tablet twice daily (every 12 hours), or three times daily for severe infections such as otitis media, sinusitis, and lower respiratory tract infections. Administer at the start of a meal to minimise gastrointestinal intolerance.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or any excipient; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Mucocutaneous candidiasis, diarrhoea, nausea, vomiting. Uncommon/Rare: dizziness, headache, indigestion, elevated hepatic transaminases, skin rash, pruritus, urticaria, antibiotic-associated colitis, cholestatic jaundice.',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'ENT (Otolaryngology)', 'Pulmonology', 'General Practice'],
    sources: [
      {
        title: 'Bilim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Klamoks BID 1000 mg Film Tablet)',
        url: 'https://www.bilimilac.com',
      },
    ],
    notes:
      'Official Bilim İlaç KÜB (SmPC) data. Each film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN base: Amoxicillin + Clavulanic acid).',
  },

  // 2. Zespira 10 mg (Montelukast — Bilim Ilac)
  {
    brandName: 'Zespira 10 mg',
    brandNameAr: 'زيسبيرا 10 ملغ',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1) (ATC R03DC03)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Add-on treatment of persistent asthma in patients aged 15 years and older with mild to moderate persistent asthma inadequately controlled on inhaled corticosteroids, prophylaxis of exercise-induced bronchoconstriction, and symptomatic relief of seasonal and perennial allergic rhinitis.',
    dose:
      'Adults and adolescents aged 15 years and older: one 10 mg film-coated tablet once daily to be taken in the evening, with or without food.',
    contraindications:
      'Hypersensitivity to montelukast or to any of the excipients.',
    adverseEffects:
      'Upper respiratory tract infection, headache, abdominal pain, diarrhoea, nausea, vomiting, elevated serum transaminases, rash, pyrexia. Uncommon/Rare: neuropsychiatric events (abnormal dreams, insomnia, anxiety, agitation, depression), angioedema.',
    storage:
      'Store below 25°C in the original package to protect from moisture and light.',
    specialties: ['Pulmonology', 'Allergy & Immunology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sources: [
      {
        title: 'Bilim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Zespira 10 mg Film Kaplı Tablet)',
        url: 'https://www.bilimilac.com',
      },
    ],
    notes:
      'Official Bilim İlaç KÜB (SmPC) data. Each film-coated tablet contains 10.4 mg montelukast sodium equivalent to 10 mg montelukast base (INN base: Montelukast).',
  },

  // 3. Raneks 20 mg (Rabeprazole — Bilim Ilac)
  {
    brandName: 'Raneks 20 mg',
    brandNameAr: 'رانيكس 20 ملغ',
    genericName: 'Rabeprazole',
    activeIngredients: ['Rabeprazole'],
    drugClass: 'Proton pump inhibitor (PPI) gastric acid secretion inhibitor (ATC A02BC04)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Treatment of active duodenal ulcer, active benign gastric ulcer, symptomatic erosive or ulcerative gastro-oesophageal reflux disease (GORD), GORD long-term maintenance management, symptomatic treatment of moderate to very severe GORD, Zollinger-Ellison syndrome, and eradication of Helicobacter pylori in combination with appropriate antibacterial regimens.',
    dose:
      'Adults: Active duodenal or benign gastric ulcer and erosive GORD: 20 mg orally once daily in the morning for 4–8 weeks. H. pylori eradication: 20 mg twice daily with clarithromycin 500 mg and amoxicillin 1 g twice daily for 7 days. Swallow whole; do not chew or crush.',
    contraindications:
      'Hypersensitivity to rabeprazole, substituted benzimidazoles, or any excipient. Pregnancy and breast-feeding.',
    adverseEffects:
      'Headache, dizziness, insomnia, cough, pharyngitis, rhinitis, diarrhoea, vomiting, nausea, abdominal pain, constipation, flatulence, benign fundic gland polyps, non-specific pain/back pain, asthenia, influenza-like illness.',
    storage:
      'Store below 25°C in the original package to protect from moisture; do not refrigerate.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Bilim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Raneks 20 mg Enterik Kaplı Tablet)',
        url: 'https://www.bilimilac.com',
      },
    ],
    notes:
      'Official Bilim İlaç KÜB (SmPC) data. Each gastro-resistant tablet contains 20 mg rabeprazole sodium equivalent to 18.85 mg rabeprazole base (INN base: Rabeprazole).',
  },

  // 4. Glifix 30 mg (Pioglitazone — Bilim Ilac)
  {
    brandName: 'Glifix 30 mg',
    brandNameAr: 'غليفيكس 30 ملغ',
    genericName: 'Pioglitazone',
    activeIngredients: ['Pioglitazone'],
    drugClass: 'Thiazolidinedione (PPAR-gamma agonist) oral antihyperglycaemic agent (ATC A10BG03)',
    strength: '30 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 tablets in blisters',
    indications:
      'Second- or third-line treatment of type 2 diabetes mellitus in adults as monotherapy (when metformin is inappropriate due to contraindications or intolerance) or in combination therapy with metformin, a sulphonylurea, or insulin.',
    dose:
      'Adults: Initiate at 15 mg or 30 mg orally once daily with or without food; may be increased in increments up to 45 mg once daily based on glycaemic response.',
    contraindications:
      'Hypersensitivity to pioglitazone or any excipient; cardiac failure or history of cardiac failure (NYHA stages I to IV); hepatic impairment; diabetic ketoacidosis; current bladder cancer or history of bladder cancer; uninvestigated macroscopic haematuria.',
    adverseEffects:
      'Fluid retention and oedema, weight gain, upper respiratory tract infection, visual disturbance (macular oedema), hypoesthesia, bone fractures (particularly in women), heart failure when combined with insulin, elevated hepatic transaminases.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Endocrinology & Diabetes', 'Internal Medicine'],
    sources: [
      {
        title: 'Bilim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Glifix 30 mg Tablet)',
        url: 'https://www.bilimilac.com',
      },
    ],
    notes:
      'Official Bilim İlaç KÜB (SmPC) data. Each tablet contains pioglitazone hydrochloride equivalent to 30 mg pioglitazone base (INN base: Pioglitazone).',
  },
];

export const BILIM_ILAC_PRODUCTS: AiProductDraft[] = RAW_BILIM_ILAC.map((d) => ({
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
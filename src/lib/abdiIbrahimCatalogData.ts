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

const RAW_ABDI_IBRAHIM: CompactDrug[] = [
  // 1. Protonex (Pantoprazole — Abdi Ibrahim)
  {
    brandName: 'Protonex 40 mg',
    brandNameAr: 'بروتونكس 40 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (PPI) gastric acid secretion inhibitor (ATC A02BC02)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Reflux oesophagitis; eradication of Helicobacter pylori in combination with two appropriate antibiotics in patients with peptic ulcers; gastric and duodenal ulcer; Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Adults and adolescents ≥12 years in reflux oesophagitis: 40 mg once daily for 4–8 weeks. Adults in gastric/duodenal ulcer: 40 mg once daily. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Swallow whole with water 1 hour before a meal; do not chew or crush.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    adverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain, elevated hepatic enzymes, rash/exanthema. Rare: hypomagnesaemia, interstitial nephritis, subacute cutaneous lupus erythematosus.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Protonex 40 mg Enterik Kaplı Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole base (INN base: Pantoprazole).',
  },

  // 2. Onceair (Montelukast — Abdi Ibrahim)
  {
    brandName: 'Onceair 10 mg',
    brandNameAr: 'وانس إير 10 ملغ',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1) (ATC R03DC03)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Add-on treatment of persistent asthma in patients aged 15 years and older with mild to moderate persistent asthma inadequately controlled on inhaled corticosteroids, and prophylaxis of exercise-induced bronchoconstriction; symptomatic relief of seasonal and perennial allergic rhinitis.',
    dose:
      'Adults and adolescents aged 15 years and older: one 10 mg film-coated tablet once daily to be taken in the evening, with or without food.',
    contraindications:
      'Hypersensitivity to montelukast or to any of the excipients.',
    adverseEffects:
      'Upper respiratory infection, headache, abdominal pain, diarrhoea, nausea, vomiting, elevated serum transaminases, rash, pyrexia. Uncommon/Rare: neuropsychiatric events (abnormal dreams, insomnia, anxiety, agitation, depression), angioedema, Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis).',
    storage:
      'Store below 25°C in the original package to protect from moisture and light.',
    specialties: ['Pulmonology', 'Allergy & Immunology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Onceair 10 mg Film Kaplı Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each film-coated tablet contains 10.4 mg montelukast sodium equivalent to 10 mg montelukast base (INN base: Montelukast).',
  },

  // 3. Cetryn (Cetirizine — Abdi Ibrahim)
  {
    brandName: 'Cetryn 10 mg',
    brandNameAr: 'سيترين 10 ملغ',
    genericName: 'Cetirizine',
    activeIngredients: ['Cetirizine'],
    drugClass: 'Second-generation selective peripheral H1-receptor antagonist antihistamine (ATC R06AE07)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Relief of nasal and ocular symptoms of seasonal and perennial allergic rhinitis, and relief of symptoms of chronic idiopathic urticaria in adults and paediatric patients aged 6 years and above.',
    dose:
      'Adults and adolescents over 12 years: 10 mg (1 tablet) once daily. Children 6 to 12 years: 5 mg (half tablet) twice daily. Dose adjustment required in moderate to severe renal impairment. Swallow with a glass of liquid.',
    contraindications:
      'Hypersensitivity to cetirizine, hydroxyzine, any piperazine derivative, or any excipient. Patients with severe renal impairment (creatinine clearance below 10 mL/min).',
    adverseEffects:
      'Somnolence, fatigue, dizziness, headache, dry mouth, nausea, diarrhoea, pharyngitis, rhinitis. Uncommon: agitation, paraesthesia, pruritus, rash, asthenia.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Allergy & Immunology', 'Dermatology', 'ENT (Otolaryngology)', 'General Practice'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Cetryn 10 mg Film Kaplı Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each film-coated tablet contains 10 mg cetirizine dihydrochloride (INN base: Cetirizine).',
  },

  // 4. Parkyn (Pramipexole — Abdi Ibrahim)
  {
    brandName: 'Parkyn 1 mg',
    brandNameAr: 'باركين 1 ملغ',
    genericName: 'Pramipexole',
    activeIngredients: ['Pramipexole'],
    drugClass: 'Non-ergot dopamine D2/D3 receptor agonist antiparkinsonian agent (ATC N04BC05)',
    strength: '1 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 100 tablets in blisters',
    indications:
      'Treatment of the signs and symptoms of idiopathic Parkinson’s disease in adults, alone (without levodopa) or in combination with levodopa through the course of the disease when the effect of levodopa wears off or becomes inconsistent.',
    dose:
      'Adults: Administer orally in 3 equally divided daily doses. Initiate with ascending titration from 0.375 mg salt (0.264 mg base) per day, increasing every 5–7 days up to maintenance dose (1.5 mg to maximum 4.5 mg salt daily in 3 divided doses). Discontinue gradually over several days.',
    contraindications:
      'Hypersensitivity to pramipexole or to any of the excipients.',
    adverseEffects:
      'Somnolence, dizziness, dyskinesia, nausea, hallucinations, insomnia, confusion, abnormal dreams, peripheral oedema, hypotension, constipation, fatigue, impulse control disorders (pathological gambling, hypersexuality, binge eating), sudden onset of sleep episodes.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Neurology', 'Geriatrics', 'Internal Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Parkyn 1 mg Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each tablet contains 1 mg pramipexole dihydrochloride monohydrate equivalent to 0.7 mg pramipexole base (INN base: Pramipexole).',
  },

  // 5. Pixart (Pioglitazone — Abdi Ibrahim)
  {
    brandName: 'Pixart 30 mg',
    brandNameAr: 'بيكسارت 30 ملغ',
    genericName: 'Pioglitazone',
    activeIngredients: ['Pioglitazone'],
    drugClass: 'Thiazolidinedione (PPAR-gamma agonist) oral antihyperglycaemic agent (ATC A10BG03)',
    strength: '30 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 tablets in blisters',
    indications:
      'Second- or third-line treatment of type 2 diabetes mellitus in adults as monotherapy (when metformin is inappropriate due to contraindications or intolerance) or in dual/triple oral therapy with metformin and/or a sulphonylurea, or in combination with insulin.',
    dose:
      'Adults: Initiate at 15 mg or 30 mg orally once daily with or without food; may be increased in increments up to a maximum of 45 mg once daily based on glycaemic response.',
    contraindications:
      'Hypersensitivity to pioglitazone or any excipient; cardiac failure or history of cardiac failure (NYHA stages I to IV); hepatic impairment; diabetic ketoacidosis; current bladder cancer or history of bladder cancer; uninvestigated macroscopic haematuria.',
    adverseEffects:
      'Fluid retention and peripheral oedema, weight gain, upper respiratory tract infection, visual disturbance (macular oedema), hypoesthesia, bone fractures (particularly in women), congestive heart failure (especially when combined with insulin), elevated hepatic enzymes.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Endocrinology & Diabetes', 'Internal Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Pixart 30 mg Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each tablet contains pioglitazone hydrochloride equivalent to 30 mg pioglitazone base (INN base: Pioglitazone).',
  },
];

export const ABDI_IBRAHIM_PRODUCTS: AiProductDraft[] = RAW_ABDI_IBRAHIM.map((d) => ({
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

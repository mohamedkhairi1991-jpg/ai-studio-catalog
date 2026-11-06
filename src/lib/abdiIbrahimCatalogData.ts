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

const RAW_ABDI_IBRAHIM: CompactDrug[] = [
  // 1. Protonex (Pantoprazole — Abdi Ibrahim)
  {
    brandName: 'Protonex 40 mg',
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
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Pixart 30 mg Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each tablet contains pioglitazone hydrochloride equivalent to 30 mg pioglitazone base (INN base: Pioglitazone).',
  },
  {
    brandName: 'Pixart 15 mg',
    genericName: 'Pioglitazone',
    activeIngredients: ['Pioglitazone'],
    drugClass: 'Thiazolidinedione (PPAR-gamma agonist) oral antihyperglycaemic agent (ATC A10BG03)',
    strength: '15 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 tablets in blisters',
    indications:
      'Second- or third-line treatment of type 2 diabetes mellitus in adults as monotherapy or in combination with metformin, a sulphonylurea, or insulin.',
    dose:
      'Adults: Initiate at 15 mg or 30 mg orally once daily with or without food; may be titrated in increments up to 45 mg once daily.',
    contraindications:
      'Hypersensitivity to pioglitazone; cardiac failure or history of cardiac failure (NYHA stages I to IV); hepatic impairment; diabetic ketoacidosis; current or history of bladder cancer; uninvestigated macroscopic haematuria.',
    adverseEffects:
      'Fluid retention and peripheral oedema, weight gain, upper respiratory tract infection, visual disturbance, bone fractures, congestive heart failure.',
    storage: 'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Pixart 15 mg Tablet)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each tablet contains pioglitazone hydrochloride equivalent to 15 mg pioglitazone base.',
  },
  {
    brandName: 'Risonel 50 mcg/actuation Nasal Spray',
    genericName: 'Mometasone furoate',
    activeIngredients: ['Mometasone furoate'],
    drugClass: 'Intranasal Corticosteroids',
    strength: '50 mcg / actuation',
    dosageForm: 'Nasal spray, suspension',
    route: 'Nasal',
    packSize: '1 bottle (140 actuations)',
    indications:
      'Symptomatic treatment of seasonal allergic or perennial rhinitis in adults and children aged 3 years and older, and treatment of nasal polyps in adults aged 18 years and older.',
    dose:
      'Allergic rhinitis in adults and adolescents (≥12 years): Two actuations (50 mcg/actuation; total 200 mcg) in each nostril once daily (may be reduced to 1 spray in each nostril once daily for maintenance, or increased to a maximum of 2 sprays in each nostril twice daily if symptoms are inadequately controlled). Nasal polyps in adults: 2 actuations in each nostril once daily, increased to twice daily after 5–6 weeks if needed.',
    contraindications:
      'Hypersensitivity to mometasone furoate or any excipient; untreated localized infection involving the nasal mucosa (such as herpes simplex); recent nasal surgery or nasal trauma until healing has occurred.',
    adverseEffects:
      'Epistaxis, pharyngitis, nasal burning, nasal irritation, nasal ulceration, headache, upper respiratory tract infection, blurred vision.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['ENT (Otolaryngology)', 'Allergy & Immunology', 'Pulmonology', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'Abdi İbrahim İlaç San. ve Tic. A.Ş. — Official Product Portfolio & KÜB (Risonel 50 mcg Nasal Spray)',
        url: 'https://www.abdiibrahim.com.tr',
      },
    ],
    notes:
      'Official Abdi İbrahim KÜB (SmPC) data. Each metered actuation delivers 50 micrograms of mometasone furoate (as monohydrate).',
  },
];

export const ABDI_IBRAHIM_PRODUCTS: AiProductDraft[] = RAW_ABDI_IBRAHIM.map((d) => ({
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

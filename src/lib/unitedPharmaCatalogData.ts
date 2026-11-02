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

const RAW_UNITED_PHARMA: CompactDrug[] = [
  // 1. Unicast (Montelukast — United Pharmaceuticals)
  {
    brandName: 'Unicast 4 mg',
    brandNameAr: 'يونيكاست 4 ملغ',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1 antagonist)',
    strength: '4 mg',
    dosageForm: 'Chewable tablet',
    route: 'Oral',
    packSize: 'Pack of 28 chewable tablets in blisters',
    indications:
      'Add-on treatment of mild to moderate persistent asthma in paediatric patients aged 2 to 5 years who are inadequately controlled on inhaled corticosteroids; alternative treatment option to low-dose inhaled corticosteroids for patients aged 2 to 5 years with mild persistent asthma without recent serious asthma attacks; and prophylaxis of exercise-induced bronchoconstriction in patients aged 2 years and older.',
    dose:
      'Children aged 2 to 5 years: One 4 mg chewable tablet daily to be taken in the evening. If taken in connection with food, Unicast 4 mg should be taken 1 hour before or 2 hours after food.',
    contraindications:
      'Hypersensitivity to montelukast or to any of the excipients; phenylketonuria (if aspartame is an excipient in the chewable tablet).',
    adverseEffects:
      'Common: upper respiratory infection, abdominal pain, thirst, diarrhoea, hyperkinesia, asthma, scaly and itchy skin, rash. Post-marketing class warning: neuropsychiatric events (abnormal dreams, nightmares, insomnia, agitation, anxiety, depression, behavioural changes).',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Pediatrics', 'Pulmonology', 'Allergy and Immunology'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Respiratory Portfolio (Unicast / Montelukast)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. (Amman, Jordan) SmPC data. Each chewable tablet contains montelukast sodium equivalent to 4 mg montelukast (INN base: Montelukast).',
  },
  {
    brandName: 'Unicast 5 mg',
    brandNameAr: 'يونيكاست 5 ملغ',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1 antagonist)',
    strength: '5 mg',
    dosageForm: 'Chewable tablet',
    route: 'Oral',
    packSize: 'Pack of 28 chewable tablets in blisters',
    indications:
      'Add-on treatment of mild to moderate persistent asthma in paediatric patients aged 6 to 14 years who are inadequately controlled on inhaled corticosteroids; alternative treatment option to low-dose inhaled corticosteroids for mild persistent asthma; and prophylaxis of exercise-induced bronchoconstriction.',
    dose:
      'Children aged 6 to 14 years: One 5 mg chewable tablet daily to be taken in the evening (1 hour before or 2 hours after food).',
    contraindications:
      'Hypersensitivity to montelukast or excipients; phenylketonuria (contains aspartame).',
    adverseEffects:
      'Common: headache, abdominal pain, upper respiratory infection. Uncommon/Post-marketing: sleep disturbances, abnormal dreams, irritability, restlessness, epistaxis, dry mouth, dyspepsia, rash.',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Pediatrics', 'Pulmonology', 'Allergy and Immunology'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Respiratory Portfolio (Unicast 5 mg)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. SmPC data. Each chewable tablet contains montelukast sodium equivalent to 5 mg montelukast (INN base: Montelukast).',
  },
  {
    brandName: 'Unicast 10 mg',
    brandNameAr: 'يونيكاست 10 ملغ',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1 antagonist)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Add-on treatment of mild to moderate persistent asthma in adults and adolescents aged 15 years and older; symptomatic relief of seasonal and perennial allergic rhinitis in asthmatic patients; and prophylaxis of exercise-induced bronchoconstriction.',
    dose:
      'Adults and adolescents aged 15 years and older: One 10 mg film-coated tablet daily to be taken in the evening, with or without food.',
    contraindications:
      'Hypersensitivity to montelukast or to any of the excipients.',
    adverseEffects:
      'Very common: upper respiratory infection. Common: diarrhoea, nausea, vomiting, elevated serum transaminases (ALT, AST), rash, pyrexia, headache, abdominal pain. Uncommon: neuropsychiatric events (abnormal dreams, insomnia, somnolence, anxiety, agitation, depression).',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine', 'ENT'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Respiratory Portfolio (Unicast 10 mg)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. SmPC data. Each film-coated tablet contains montelukast sodium equivalent to 10 mg montelukast (INN base: Montelukast).',
  },

  // 2. Unicam (Piroxicam — United Pharmaceuticals)
  {
    brandName: 'Unicam 20 mg',
    brandNameAr: 'يونيكام 20 ملغ',
    genericName: 'Piroxicam',
    activeIngredients: ['Piroxicam'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, oxicam derivative)',
    strength: '20 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 20 hard capsules in blisters',
    indications:
      'Symptomatic relief of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis when other NSAIDs have proved inadequate.',
    dose:
      'Adults: Maximum recommended daily dose is 20 mg administered as one single daily dose taken with or immediately after food. Concomitant gastroprotective therapy (e.g. a proton pump inhibitor or misoprostol) should be considered.',
    contraindications:
      'Hypersensitivity to piroxicam, aspirin, or other NSAIDs; history of gastrointestinal ulceration, bleeding, or perforation; history of gastrointestinal disorders predisposing to bleeding disorders (ulcerative colitis, Crohn disease, GI cancers, diverticulitis); active peptic ulcer, inflammatory GI disorder, or GI bleeding; history of severe allergic drug reaction (especially SJS or TEN); severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: stomatitis, anorexia, epigastric distress, nausea, constipation, abdominal discomfort, flatulence, diarrhoea, abdominal pain, indigestion, dizziness, headache, vertigo, tinnitus, pruritus, rash, oedema, reversible elevation of BUN and creatinine, elevated hepatic transaminases, anaemia.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Unicam (piroxicam 20 mg)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. SmPC data. Each hard capsule contains 20 mg piroxicam.',
  },

  // 3. Unifed (Pseudoephedrine + Triprolidine — United Pharmaceuticals)
  {
    brandName: 'Unifed 60 mg/2.5 mg',
    brandNameAr: 'يونيفيد 60 ملغ/2.5 ملغ',
    genericName: 'Pseudoephedrine + Triprolidine',
    activeIngredients: ['Pseudoephedrine', 'Triprolidine'],
    drugClass: 'Sympathomimetic nasal decongestant and first-generation H1-antihistamine combination',
    strength: '60 mg/2.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Symptomatic relief of upper respiratory tract disorders accompanied by nasal and sinus congestion and rhinorrhoea, including allergic rhinitis, vasomotor rhinitis, and the common cold.',
    dose:
      'Adults and adolescents aged 12 years and older: One tablet (60 mg pseudoephedrine hydrochloride / 2.5 mg triprolidine hydrochloride) three times daily (every 8 hours; maximum 4 tablets in 24 hours).',
    contraindications:
      'Hypersensitivity to pseudoephedrine, triprolidine, other sympathomimetic amines, or excipients; severe hypertension or severe coronary artery disease; concomitant use with or within 14 days of stopping monoamine oxidase inhibitors (MAOIs); severe acute or chronic kidney disease/renal failure; narrow-angle glaucoma; urinary retention.',
    adverseEffects:
      'Common: drowsiness, sedation, dizziness, dry mouth, nose and throat, headache, insomnia, nervousness, tachycardia, palpitations. Rare: hallucinations, urinary retention (especially in men with prostatic enlargement), blood pressure elevation, skin rash.',
    storage:
      'Store below 25°C in a dry place, protected from light.',
    specialties: ['ENT', 'Internal Medicine', 'Allergy and Immunology'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Unifed (pseudoephedrine / triprolidine)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. SmPC data. Each tablet contains 60 mg pseudoephedrine hydrochloride and 2.5 mg triprolidine hydrochloride (INN bases: Pseudoephedrine + Triprolidine).',
  },

  // 4. Unidox (Doxycycline — United Pharmaceuticals)
  {
    brandName: 'Unidox 100 mg',
    brandNameAr: 'يونيدوكس 100 ملغ',
    genericName: 'Doxycycline',
    activeIngredients: ['Doxycycline'],
    drugClass: 'Tetracycline broad-spectrum bacteriostatic antibacterial',
    strength: '100 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 10 hard capsules in blister',
    indications:
      'Treatment of respiratory tract infections (atypical pneumonia due to Mycoplasma pneumoniae or Chlamydophila pneumoniae, acute exacerbations of chronic bronchitis), urogenital infections (Chlamydia trachomatis, nongonococcal urethritis, pelvic inflammatory disease, syphilis in penicillin-allergic patients), rickettsial infections, brucellosis (in combination with rifampicin or streptomycin), Lyme borreliosis, acne vulgaris, rosacea, and malaria prophylaxis/treatment.',
    dose:
      'Adults and adolescents (> 12 years): Usual dose is 200 mg on the first day (as a single dose or 100 mg every 12 hours) followed by a maintenance dose of 100 mg once daily (or 100 mg twice daily in severe infections or brucellosis). Administer with plenty of water in an upright position at least 1 hour before bedtime to prevent oesophageal ulceration.',
    contraindications:
      'Hypersensitivity to doxycycline, any other tetracycline, or excipients; pregnancy and breastfeeding; children under 8 years of age (risk of permanent tooth discolouration and enamel hypoplasia); concomitant use with oral retinoids (isotretinoin, acitretin) due to risk of benign intracranial hypertension.',
    adverseEffects:
      'Common: photosensitivity reactions, nausea, vomiting, diarrhoea, oesophagitis, oesophageal ulceration, headache, vaginitis/candidiasis. Uncommon/Rare: benign intracranial hypertension (pseudotumor cerebri), hepatotoxicity, Clostridium difficile colitis, exfoliative dermatitis, SJS/TEN.',
    storage:
      'Store below 25°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Dermatology', 'Pulmonology', 'Urology', 'Obstetrics and Gynecology', 'Internal Medicine'],
    sources: [
      {
        title: 'The United Pharmaceutical Manufacturing Co. Ltd. (MS Pharma / UPM Jordan) — Unidox (doxycycline 100 mg)',
        url: 'https://mspharma.com/',
      },
    ],
    notes:
      'Official The United Pharmaceutical Manufacturing Co. Ltd. SmPC data. Each hard capsule contains doxycycline hyclate equivalent to 100 mg doxycycline (INN base: Doxycycline).',
  },
];

export const UNITED_PHARMA_PRODUCTS: AiProductDraft[] = RAW_UNITED_PHARMA.map((d) => ({
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
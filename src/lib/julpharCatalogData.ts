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

const RAW_JULPHAR: CompactDrug[] = [
  // 1. Julmentin (Amoxicillin + Clavulanic acid — Julphar)
  {
    brandName: 'Julmentin 625 mg',
    brandNameAr: 'جولمنتين 625 ملغ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '500 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 20 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscess with spreading cellulitis), and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 625 mg (500 mg/125 mg) film-coated tablet every 8 hours (three times daily) for 5 to 14 days. Take at the start of a meal to reduce gastrointestinal intolerance.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (cephalosporin, carbapenem, or monobactam); history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, indigestion, elevated AST/ALT, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — General Medicines Portfolio (Julmentin)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar (Gulf Pharmaceutical Industries, Ras Al Khaimah, UAE) SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Julmentin 1 g',
    brandNameAr: 'جولمنتين 1 غ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '875 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Treatment of acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 1 g (875 mg/125 mg) film-coated tablet every 12 hours (twice daily); up to three times daily for severe respiratory or urinary tract infections. Take at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: headache, dizziness, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — General Medicines Portfolio (Julmentin 1 g)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each 1 g film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Julmentin Forte 457 mg/5 mL',
    brandNameAr: 'جولمنتين فورت 457 ملغ/5 مل',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '400 mg/57 mg per 5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 70 mL oral suspension',
    indications:
      'Paediatric bacterial infections: acute bacterial sinusitis, acute otitis media, community-acquired pneumonia, cystitis, pyelonephritis, and skin and soft tissue infections.',
    dose:
      'Children < 40 kg (aged >= 2 months): 25/3.6 mg/kg/day to 45/6.4 mg/kg/day (up to 70/10 mg/kg/day for acute otitis media, sinusitis, and lower respiratory tract infections) divided into 2 equal doses given every 12 hours at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated cholestatic jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis, diaper dermatitis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C in a dry place. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — General Medicines Portfolio (Julmentin Forte)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each 5 mL of reconstituted suspension contains 400 mg amoxicillin and 57 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },

  // 2. Julphamox (Amoxicillin — Julphar)
  {
    brandName: 'Julphamox 500 mg',
    brandNameAr: 'جولفاموكس 500 ملغ',
    genericName: 'Amoxicillin',
    activeIngredients: ['Amoxicillin'],
    drugClass: 'Broad-spectrum aminopenicillin beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 20 hard capsules in blisters',
    indications:
      'Acute bacterial sinusitis, acute otitis media, acute streptococcal tonsillitis and pharyngitis, acute exacerbations of chronic bronchitis, community-acquired pneumonia, acute cystitis, asymptomatic bacteriuria in pregnancy, acute pyelonephritis, typhoid and paratyphoid fever, dental abscess with spreading cellulitis, and Helicobacter pylori eradication (in combination therapy).',
    dose:
      'Adults and children >= 40 kg: 500 mg every 8 hours, or 750 mg to 1000 mg every 12 hours depending on the severity and site of infection; up to 1000 mg every 8 hours for severe infections. H. pylori eradication: 1000 mg twice daily for 7–14 days with a proton pump inhibitor and a second antibiotic.',
    contraindications:
      'Hypersensitivity to amoxicillin, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial.',
    adverseEffects:
      'Common: diarrhoea, nausea, skin rash. Uncommon: vomiting, urticaria, pruritus.',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — General Medicines Portfolio (Julphamox)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each hard capsule contains amoxicillin trihydrate equivalent to 500 mg amoxicillin (INN base: Amoxicillin). Also available as Julphamox 250 mg/5 mL oral suspension.',
  },

  // 3. Profinal (Ibuprofen — Julphar)
  {
    brandName: 'Profinal 400 mg',
    brandNameAr: 'بروفينال 400 ملغ',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Relief of mild to moderate pain (headache, migraine, dental pain, postoperative pain, primary dysmenorrhoea, muscular and rheumatic pain), symptomatic relief of fever, and anti-inflammatory management of rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, and acute soft-tissue injuries (sprains and strains).',
    dose:
      'Adults and adolescents (>= 12 years): 400 mg every 6 to 8 hours as needed (1200 mg to 1800 mg daily in divided doses; up to a maximum of 2400 mg daily under medical supervision). Take with or after food.',
    contraindications:
      'Hypersensitivity to ibuprofen, aspirin, or other NSAIDs (history of bronchospasm, asthma, rhinitis, angioedema, or urticaria); active or history of recurrent peptic ulcer/haemorrhage; history of GI bleeding or perforation related to previous NSAID therapy; severe heart failure (NYHA Class IV), severe hepatic failure, or severe renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, heartburn, abdominal pain, nausea, vomiting, flatulence, diarrhoea, constipation, dizziness, headache, skin rash. Uncommon/Rare: gastritis, peptic ulcer, gastrointestinal perforation or haemorrhage, oedema, hypertension, bronchospasm, acute renal impairment.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Pain & Inflammation Portfolio (Profinal / Ibuprofen)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains 400 mg ibuprofen.',
  },
  {
    brandName: 'Profinal 600 mg',
    brandNameAr: 'بروفينال 600 ملغ',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '600 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, non-articular rheumatism, acute musculoskeletal disorders, and acute gout.',
    dose:
      'Adults: 600 mg 2 to 3 times daily (1200 mg to 1800 mg daily; maximum 2400 mg daily in divided doses) taken with or after meals.',
    contraindications:
      'Hypersensitivity to ibuprofen, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, abdominal pain, nausea, diarrhoea, flatulence, constipation, headache, dizziness, rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Pain & Inflammation Portfolio (Profinal 600 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains 600 mg ibuprofen.',
  },
  {
    brandName: 'Profinal 100 mg/5 mL',
    brandNameAr: 'بروفينال 100 ملغ/5 مل',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '100 mg/5 mL',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: 'Bottle of 100 mL or 110 mL oral suspension',
    indications:
      'Reduction of fever (including post-immunisation pyrexia) and relief of mild to moderate pain (teething pain, toothache, earache, sore throat, headache, minor aches and sprains) in infants and children.',
    dose:
      'Children (aged 3 months and older weighing > 5 kg): Daily dose is 20 to 30 mg/kg body weight in 3 to 4 divided doses every 6 to 8 hours (2.5 mL to 10 mL three times daily depending on age/weight). Shake well before use.',
    contraindications:
      'Hypersensitivity to ibuprofen or other NSAIDs; active or history of peptic ulcer/bleeding; severe hepatic, renal, or cardiac failure; infants weighing less than 5 kg or under 3 months of age.',
    adverseEffects:
      'Uncommon: abdominal pain, nausea, dyspepsia, diarrhoea, skin rash, urticaria, pruritus.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pediatrics'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Profinal Paediatric Suspension Portfolio',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each 5 mL of oral suspension contains 100 mg ibuprofen.',
  },

  // 4. Jusprin (Acetylsalicylic acid — Julphar)
  {
    brandName: 'Jusprin 81 mg',
    brandNameAr: 'جوسبرين 81 ملغ',
    genericName: 'Acetylsalicylic acid',
    activeIngredients: ['Acetylsalicylic acid'],
    drugClass: 'Antiplatelet agent (irreversible cyclooxygenase-1 inhibitor)',
    strength: '81 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 30 gastro-resistant tablets in blisters',
    indications:
      'Secondary prevention of myocardial infarction and thrombotic cerebrovascular events (ischaemic stroke and transient ischaemic attack); unstable angina and stable angina pectoris; prevention of graft occlusion after coronary artery bypass grafting (CABG) or percutaneous coronary intervention (PCI).',
    dose:
      'Adults: One to two 81 mg gastro-resistant tablets (81 mg to 162 mg) once daily for long-term antiplatelet prophylaxis. Swallow whole with water; do not crush or chew enteric-coated tablets.',
    contraindications:
      'Hypersensitivity to acetylsalicylic acid, salicylates, or NSAIDs; history of asthma induced by salicylates or NSAIDs; active peptic ulceration or gastrointestinal bleeding; haemorrhagic diathesis, haemophilia, or severe thrombocytopenia; severe hepatic or renal impairment; third trimester of pregnancy (at doses > 100 mg/day); children and adolescents under 16 years with viral infections (risk of Reye syndrome).',
    adverseEffects:
      'Common: dyspepsia, upper abdominal pain, nausea, increased bleeding tendency (epistaxis, gingival bleeding, bruising, gastrointestinal microbleeding). Uncommon: urticaria, rhinitis, bronchospasm. Rare: gastrointestinal haemorrhage or ulceration, intracranial haemorrhage.',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Cardiology', 'Neurology', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Cardiovascular Portfolio (Jusprin 81 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each enteric-coated tablet contains 81 mg acetylsalicylic acid.',
  },

  // 5. Mebo (Beta-sitosterol — Julphar)
  {
    brandName: 'Mebo 0.25%',
    brandNameAr: 'ميبو 0.25%',
    genericName: 'Beta-sitosterol',
    activeIngredients: ['Beta-sitosterol'],
    drugClass: 'Topical burn, wound, and ulcer healing dermatological ointment',
    strength: '0.25% w/w',
    dosageForm: 'Ointment',
    route: 'Topical',
    packSize: 'Tube of 15 g, 30 g, or 75 g ointment',
    indications:
      'Local management of first-, second-, and third-degree thermal and chemical burns; chronic cutaneous ulcers (including diabetic foot ulcers, venous stasis ulcers, and pressure ulcers/bedsores); surgical and obstetric wounds (including episiotomy and circumcision wounds); donor site wounds; cracked nipples; and post-laser skin resurfacing or chemical peeling.',
    dose:
      'Exposed burns and wounds: apply a thin layer (approximately 1 mm thickness) over the burn/wound surface 3 to 4 times daily after gently wiping off liquefied necrotic tissue and residual ointment. Covered wounds/ulcers: apply a 2 to 3 mm layer once or twice daily under sterile dressing.',
    contraindications:
      'Hypersensitivity to beta-sitosterol, sesame oil, beeswax, or to any of the excipients.',
    adverseEffects:
      'Generally well tolerated; rare local hypersensitivity or mild transient contact irritation in patients allergic to sesame oil.',
    storage:
      'Store below 25°C in a cool, dry place.',
    specialties: ['Dermatology', 'General Surgery', 'Plastic Surgery', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Wound & Burn Care Portfolio (MEBO Ointment)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Contains 0.25% w/w beta-sitosterol in a natural sesame oil and beeswax base.',
  },
];

export const JULPHAR_PRODUCTS: AiProductDraft[] = RAW_JULPHAR.map((d) => ({
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
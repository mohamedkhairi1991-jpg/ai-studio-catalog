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

const RAW_JULPHAR: CompactDrug[] = [
  // 1. Julmentin (Amoxicillin + Clavulanic acid — Julphar)
  {
    brandName: 'Julmentin 625 mg',
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
  {
    brandName: 'Julphamox 250 mg/5 mL',
    genericName: 'Amoxicillin',
    activeIngredients: ['Amoxicillin'],
    drugClass: 'Broad-spectrum aminopenicillin beta-lactam antibacterial',
    strength: '250 mg/5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 100 mL oral suspension',
    indications:
      'Paediatric bacterial infections: acute otitis media, acute bacterial sinusitis, streptococcal tonsillitis and pharyngitis, community-acquired pneumonia, acute cystitis, and skin and soft tissue infections.',
    dose:
      'Children < 40 kg: 40 to 90 mg/kg/day in two or three divided doses (maximum 3 g/day) depending on indication and severity.',
    contraindications:
      'Hypersensitivity to amoxicillin, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial.',
    adverseEffects:
      'Common: diarrhoea, nausea, skin rash. Uncommon: vomiting, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 14 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — General Medicines Portfolio (Julphamox Suspension)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. After reconstitution, each 5 mL contains amoxicillin trihydrate equivalent to 250 mg amoxicillin (INN base: Amoxicillin).',
  },
  {
    brandName: 'Adol Extra 500 mg/65 mg',
    category: 'otc_drug',
    genericName: 'Paracetamol + Caffeine',
    activeIngredients: ['Paracetamol', 'Caffeine'],
    drugClass: 'Analgesic and antipyretic with central nervous system stimulant adjuvant',
    strength: '500 mg/65 mg',
    dosageForm: 'Film-coated caplet',
    route: 'Oral',
    packSize: 'Pack of 24 film-coated caplets in blisters',
    indications:
      'Symptomatic relief of mild to moderate pain including headache, migraine, tension headache, toothache, sore throat, dysmenorrhoea, musculoskeletal pain, and fever.',
    dose:
      'Adults and adolescents (>= 12 years): 1 to 2 caplets every 4 to 6 hours as needed; maximum 8 caplets (4000 mg paracetamol / 520 mg caffeine) in 24 hours. Avoid excessive intake of caffeinated beverages.',
    contraindications:
      'Hypersensitivity to paracetamol, caffeine, or excipients; severe hepatic failure.',
    adverseEffects:
      'Uncommon/Rare: nervousness, dizziness, insomnia, restlessness, palpitations (due to caffeine), skin rash, hypersensitivity reactions, hepatotoxicity in overdose.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['General Practice / Family Medicine', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Consumer Healthcare Portfolio (Adol Extra)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated caplet contains 500 mg paracetamol and 65 mg caffeine.',
  },
  {
    brandName: 'Adol Drops 100 mg/mL',
    category: 'otc_drug',
    genericName: 'Paracetamol',
    activeIngredients: ['Paracetamol'],
    drugClass: 'Analgesic and antipyretic',
    strength: '100 mg/mL',
    dosageForm: 'Oral drops, solution',
    route: 'Oral',
    packSize: 'Dropper bottle of 15 mL oral solution with calibrated dropper',
    indications:
      'Symptomatic relief of fever (including post-vaccination fever) and mild to moderate pain (such as teething pain, earache, headache, and sore throat) in infants and young children.',
    dose:
      'Infants and children: 10 to 15 mg/kg body weight per dose every 4 to 6 hours as required, up to a maximum of 4 doses (60 mg/kg/day) in 24 hours. Measure accurately using the calibrated dropper.',
    contraindications:
      'Hypersensitivity to paracetamol or excipients; severe hepatic insufficiency.',
    adverseEffects:
      'Rare: skin rash, urticaria, hypersensitivity reactions, blood dyscrasias. Overdose can cause severe hepatotoxicity.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pediatrics', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Paediatric Portfolio (Adol Drops)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each 1 mL of oral drops contains 100 mg paracetamol.',
  },
  {
    brandName: 'Profinal XP 400 mg/65 mg',
    genericName: 'Ibuprofen + Caffeine',
    activeIngredients: ['Ibuprofen', 'Caffeine'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID) with analgesic adjuvant',
    strength: '400 mg/65 mg',
    dosageForm: 'Film-coated caplet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated caplets in blisters',
    indications:
      'Short-term acute treatment of moderate pain such as tension headache, migraine headache, dental pain, postoperative pain, dysmenorrhoea, and muscular pain in adults.',
    dose:
      'Adults: One caplet (400 mg ibuprofen / 65 mg caffeine) every 6 to 8 hours as needed, up to a maximum of 3 caplets (1200 mg ibuprofen / 195 mg caffeine) in 24 hours. Take with food.',
    contraindications:
      'Hypersensitivity to ibuprofen, caffeine, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-induced GI bleeding or perforation; severe cardiac, hepatic, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, abdominal pain, nausea, dizziness, insomnia, nervousness, palpitations, headache.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Internal Medicine', 'Neurology', 'Orthopedics', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Pain & Inflammation Portfolio (Profinal XP)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated caplet contains 400 mg ibuprofen and 65 mg caffeine.',
  },
  {
    brandName: 'Julflam 50 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '50 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 20 gastro-resistant tablets in blisters',
    indications:
      'Relief of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, acute gout, acute musculoskeletal disorders, post-traumatic and post-operative pain and swelling, and primary dysmenorrhoea.',
    dose:
      'Adults: 100 mg to 150 mg daily in 2 or 3 divided doses (one 50 mg tablet 2 to 3 times daily). Swallow whole with liquid before meals.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, elevated transaminases, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Pain & Inflammation Portfolio (Julflam 50 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each gastro-resistant tablet contains 50 mg diclofenac sodium (INN base: Diclofenac).',
  },
  {
    brandName: 'Julflam SR 100 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '100 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 20 prolonged-release tablets in blisters',
    indications:
      'Maintenance treatment of pain and inflammation in chronic rheumatic and degenerative joint disorders including rheumatoid arthritis, osteoarthritis, and ankylosing spondylitis.',
    dose:
      'Adults: One 100 mg prolonged-release tablet once daily, swallowed whole with liquid during or after a meal.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: epigastric pain, nausea, diarrhoea, dyspepsia, headache, dizziness, vertigo, elevated transaminases, rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Pain & Inflammation Portfolio (Julflam SR 100 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each prolonged-release tablet contains 100 mg diclofenac sodium (INN base: Diclofenac).',
  },
  {
    brandName: 'Lipigard 10 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol, LDL-C, apolipoprotein B, and triglycerides in primary hypercholesterolaemia, heterozygous and homozygous familial hypercholesterolaemia, or combined (mixed) hyperlipidaemia; primary and secondary prevention of cardiovascular events.',
    dose:
      'Usual starting dose is 10 mg or 20 mg once daily; dose range is 10 mg to 80 mg once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or unexplained persistent elevations of serum transaminases > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: nasopharyngitis, hyperglycaemia, headache, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, abnormal liver function test, increased blood creatine kinase.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Cardiovascular Portfolio (Lipigard / Atorvastatin)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 10 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Lipigard 20 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia, familial hypercholesterolaemia, mixed dyslipidaemia, and prevention of cardiovascular events in high-risk patients.',
    dose:
      '20 mg once daily at any time of day, with or without food; titrate at intervals of 4 weeks or more up to a maximum of 80 mg once daily.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or persistent elevations of serum transaminases > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: nasopharyngitis, hyperglycaemia, headache, dyspepsia, nausea, diarrhoea, constipation, myalgia, arthralgia, elevated hepatic transaminases and CK.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Cardiovascular Portfolio (Lipigard 20 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 20 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Lipigard 40 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'High-intensity LDL-C reduction in severe hypercholesterolaemia, familial hypercholesterolaemia, and secondary cardiovascular prevention.',
    dose:
      '40 mg once daily (up to 80 mg once daily), taken with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or persistent serum transaminase elevations > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: myalgia, arthralgia, diarrhoea, dyspepsia, nausea, headache, hyperglycaemia, elevated serum transaminases and creatine kinase.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Cardiovascular Portfolio (Lipigard 40 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 40 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Moxiflox 400 mg',
    genericName: 'Moxifloxacin',
    activeIngredients: ['Moxifloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 5 film-coated tablets in blister',
    indications:
      'Treatment of bacterial infections in patients aged 18 years and older: acute bacterial sinusitis, acute exacerbation of chronic obstructive pulmonary disease, community-acquired pneumonia (except severe cases), and mild to moderate pelvic inflammatory disease.',
    dose:
      'Adults (>= 18 years): One 400 mg film-coated tablet once daily for 5–7 days (acute exacerbation of COPD), 7 days (acute bacterial sinusitis), 10 days (community-acquired pneumonia), or 14 days (pelvic inflammatory disease). Separate by at least 4–6 hours from antacids, iron, or zinc.',
    contraindications:
      'Hypersensitivity to moxifloxacin or other quinolones; pregnancy and lactation; patients below 18 years of age; history of tendon disease/disorder related to quinolones; congenital or documented acquired QT prolongation, electrolyte disturbances (particularly uncorrected hypokalaemia), clinically relevant bradycardia or heart failure with reduced LVEF, or concomitant Class IA/III antiarrhythmics.',
    adverseEffects:
      'Common: superinfections due to resistant bacteria or fungi, headache, dizziness, QT prolongation in patients with hypokalaemia, nausea, vomiting, gastrointestinal and abdominal pain, diarrhoea, increase in transaminases.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Anti-Infectives Portfolio (Moxiflox 400 mg)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each film-coated tablet contains moxifloxacin hydrochloride equivalent to 400 mg moxifloxacin (INN base: Moxifloxacin).',
  },
  {
    brandName: 'Butalin 2 mg',
    genericName: 'Salbutamol',
    activeIngredients: ['Salbutamol'],
    drugClass: 'Selective short-acting beta-2 adrenergic bronchodilator',
    strength: '2 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Symptomatic relief of bronchospasm in bronchial asthma, chronic bronchitis, and other reversible obstructive airway diseases when inhaled therapy is unsuitable.',
    dose:
      'Adults: 2 mg to 4 mg three or four times daily. Elderly or beta-agonist-sensitive patients: initiate with 2 mg three or four times daily.',
    contraindications:
      'Hypersensitivity to salbutamol or excipients; non-intravenous formulations must not be used to arrest uncomplicated premature labour or threatened abortion.',
    adverseEffects:
      'Very common: fine skeletal muscle tremor (particularly hands). Common: headache, tachycardia, palpitations, muscle cramps. Uncommon: hypokalaemia, peripheral vasodilatation.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Respiratory Portfolio (Butalin / Salbutamol)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each tablet contains salbutamol sulfate equivalent to 2 mg salbutamol (INN base: Salbutamol).',
  },
  {
    brandName: 'Butalin 2 mg/5 mL',
    genericName: 'Salbutamol',
    activeIngredients: ['Salbutamol'],
    drugClass: 'Selective short-acting beta-2 adrenergic bronchodilator',
    strength: '2 mg/5 mL',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: 'Bottle of 120 mL oral syrup',
    indications:
      'Relief of bronchospasm in bronchial asthma, bronchitis, and reversible airway obstruction in children and adults unable to use inhaled devices effectively.',
    dose:
      'Children 2–6 years: 1 to 2 mg (2.5 to 5 mL) 3 to 4 times daily. Children 6–12 years: 2 mg (5 mL) 3 to 4 times daily. Over 12 years and adults: 2 to 4 mg (5 to 10 mL) 3 to 4 times daily.',
    contraindications:
      'Hypersensitivity to salbutamol or excipients.',
    adverseEffects:
      'Common: fine tremor, headache, tachycardia, palpitations, restlessness or hyperactivity in children, muscle cramps.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pediatrics', 'Pulmonology'],
    sources: [
      {
        title: 'Julphar (Gulf Pharmaceutical Industries) — Respiratory Portfolio (Butalin Syrup)',
        url: 'https://www.julphar.net/en/our-products/general-medicines',
      },
    ],
    notes:
      'Official Julphar SmPC data. Each 5 mL of syrup contains salbutamol sulfate equivalent to 2 mg salbutamol (INN base: Salbutamol).',
  },
];

export const JULPHAR_PRODUCTS: AiProductDraft[] = RAW_JULPHAR.map((d) => ({
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

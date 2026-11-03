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

const RAW_HIKMA: CompactDrug[] = [
  // 1. Amoclan (Amoxicillin + Clavulanic acid — Hikma Pharmaceuticals PLC)
  {
    brandName: 'Amoclan 625 mg',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '500 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 15 or 20 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscess with spreading cellulitis), and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 625 mg (500 mg/125 mg) film-coated tablet every 8 hours (three times daily) for 5 to 14 days. Administer at the start of a meal to minimise gastrointestinal intolerance and optimise absorption.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (cephalosporin, carbapenem, or monobactam); history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, indigestion, elevated AST/ALT, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Branded Anti-Infectives Portfolio (Amoclan: amoxicillin / clavulanate potassium)',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC (Amman, Jordan) SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and clavulanate potassium equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Amoclan BID 1000 mg',
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
      'Adults and children >= 40 kg: One 1000 mg (875 mg/125 mg) tablet every 12 hours (twice daily); up to three times daily for severe respiratory or urinary tract infections. Take at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: headache, dizziness, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Branded Anti-Infectives Portfolio (Amoclan BID 1000 mg)',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. Each 1000 mg film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and clavulanate potassium equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Amoclan Forte 457 mg/5 mL',
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
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated cholestatic jaundice or hepatic dysfunction; phenylketonuria (if aspartame is present).',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis, diaper dermatitis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C in a dry place. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Branded Anti-Infectives Portfolio (Amoclan Forte Oral Suspension)',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. Each 5 mL of reconstituted suspension contains 400 mg amoxicillin and 57 mg clavulanic acid (7:1 BID paediatric formulation; INN bases: Amoxicillin + Clavulanic acid).',
  },

  // 2. Suprax (Cefixime — Hikma Pharmaceuticals PLC)
  {
    brandName: 'Suprax 400 mg',
    genericName: 'Cefixime',
    activeIngredients: ['Cefixime'],
    drugClass: 'Third-generation oral cephalosporin beta-lactam antibacterial',
    strength: '400 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 6 hard capsules in blister',
    indications:
      'Treatment of acute infections caused by susceptible microorganisms: acute exacerbations of chronic bronchitis, community-acquired pneumonia, acute otitis media, acute bacterial sinusitis, pharyngitis and tonsillitis, uncomplicated urinary tract infections (cystitis) and uncomplicated acute pyelonephritis, and uncomplicated cervical/urethral gonorrhoea.',
    dose:
      'Adults and adolescents (> 12 years or >= 50 kg): 400 mg daily administered either as a single 400 mg oral dose once daily or divided into two 200 mg doses every 12 hours for 7 to 14 days (3 days for uncomplicated female cystitis; single 400 mg dose for uncomplicated gonorrhoea). May be taken with or without food.',
    contraindications:
      'Hypersensitivity to cefixime, any other cephalosporin antibiotic, or excipients; previous immediate and/or severe hypersensitivity reaction to penicillin or any other beta-lactam antibiotic.',
    adverseEffects:
      'Common: diarrhoea, soft stools. Uncommon: headache, dizziness, abdominal pain, indigestion, nausea, vomiting, flatulence, reversible elevation of hepatic enzymes, skin rash, pruritus, urticaria. Rare/Very rare: pseudomembranous colitis, eosinophilia, leukopenia, severe cutaneous adverse reactions (SJS, TEN, DRESS), acute renal failure / tubulointerstitial nephritis.',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Pulmonology', 'ENT', 'Internal Medicine'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Suprax (cefixime) Official Prescribing Information',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data (Hikma holds the marketing authorisation for Suprax across the MENA region). Each capsule contains cefixime trihydrate equivalent to 400 mg anhydrous cefixime (INN base: Cefixime).',
  },
  {
    brandName: 'Suprax 100 mg/5 mL',
    genericName: 'Cefixime',
    activeIngredients: ['Cefixime'],
    drugClass: 'Third-generation oral cephalosporin beta-lactam antibacterial',
    strength: '100 mg/5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 30 mL or 60 mL oral suspension',
    indications:
      'Paediatric bacterial infections caused by cefixime-susceptible organisms: acute otitis media, pharyngitis and tonsillitis, acute bronchitis and acute exacerbations of chronic bronchitis, and uncomplicated urinary tract infections.',
    dose:
      'Children aged 6 months to 12 years (< 50 kg): 8 mg/kg/day (0.4 mL/kg/day of 100 mg/5 mL suspension) administered either as a single daily dose or in two divided doses of 4 mg/kg every 12 hours for 7 to 14 days.',
    contraindications:
      'Hypersensitivity to cefixime, cephalosporin antibiotics, or excipients; history of severe immediate hypersensitivity reaction to penicillins or other beta-lactam antibiotics.',
    adverseEffects:
      'Common: diarrhoea, loose stools. Uncommon: abdominal pain, nausea, vomiting, flatulence, headache, dizziness, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store below 25°C (do not refrigerate or freeze) and discard unused portion after 14 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology', 'Urology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Suprax (cefixime) Oral Suspension Official Prescribing Information',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. After reconstitution, each 5 mL of oral suspension contains cefixime trihydrate equivalent to 100 mg anhydrous cefixime (INN base: Cefixime).',
  },

  // 3. Omnicef (Cefdinir — Hikma Pharmaceuticals PLC)
  {
    brandName: 'Omnicef 300 mg',
    genericName: 'Cefdinir',
    activeIngredients: ['Cefdinir'],
    drugClass: 'Third-generation oral cephalosporin beta-lactam antibacterial',
    strength: '300 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 10 hard capsules in blister',
    indications:
      'Treatment of mild to moderate bacterial infections in adults and adolescents: community-acquired pneumonia, acute exacerbations of chronic bronchitis, acute maxillary sinusitis, pharyngitis/tonsillitis (caused by Streptococcus pyogenes), and uncomplicated skin and skin structure infections.',
    dose:
      'Adults and adolescents (>= 13 years): Total daily dose is 600 mg, administered either as 300 mg twice daily (every 12 hours) for 5 to 10 days or as 600 mg once daily for 10 days (twice-daily dosing is required for community-acquired pneumonia and skin infections). Separate by at least 2 hours from antacids or iron supplements.',
    contraindications:
      'Known allergy to cefdinir, other cephalosporin class antibiotics, or excipients; history of severe immediate hypersensitivity to beta-lactam antibiotics.',
    adverseEffects:
      'Common: diarrhoea, vaginal moniliasis, nausea, headache, abdominal pain. Uncommon: rash, dyspepsia, flatulence, vomiting, abnormal stools, anorexia, constipation, dizziness, insomnia, pruritus. Non-pathological reddish discoloration of stools may occur if co-administered with iron-containing products.',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Omnicef (cefdinir) Branded Anti-Infectives Portfolio',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. Each hard capsule contains 300 mg cefdinir.',
  },
  {
    brandName: 'Omnicef 125 mg/5 mL',
    genericName: 'Cefdinir',
    activeIngredients: ['Cefdinir'],
    drugClass: 'Third-generation oral cephalosporin beta-lactam antibacterial',
    strength: '125 mg/5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 60 mL oral suspension',
    indications:
      'Paediatric mild to moderate bacterial infections (aged 6 months to 12 years): acute bacterial otitis media, acute maxillary sinusitis, pharyngitis/tonsillitis, and uncomplicated skin and skin structure infections.',
    dose:
      'Paediatric patients (6 months through 12 years): Total daily dose is 14 mg/kg/day, up to a maximum dose of 600 mg per day, administered either as 7 mg/kg every 12 hours for 5 to 10 days or 14 mg/kg once daily for 10 days (twice-daily dosing required for skin infections).',
    contraindications:
      'Known allergy to cefdinir, cephalosporin class antibiotics, or excipients; history of severe beta-lactam hypersensitivity.',
    adverseEffects:
      'Common: diarrhoea, rash, diaper dermatitis, vomiting, abdominal pain. Note: non-bloody reddish stools may occur with concurrent iron-fortified infant formula or iron supplements.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store at controlled room temperature (below 25°C) and discard unused portion after 10 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Dermatology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Omnicef (cefdinir) Oral Suspension Portfolio',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. After reconstitution, each 5 mL contains 125 mg cefdinir.',
  },

  // 4. Zomax (Azithromycin — Hikma Pharmaceuticals PLC)
  {
    brandName: 'Zomax 500 mg',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Upper and lower respiratory tract infections (acute bacterial sinusitis, acute otitis media, pharyngitis/tonsillitis, acute exacerbations of chronic bronchitis, community-acquired pneumonia), uncomplicated skin and soft tissue infections, and uncomplicated genital infections due to Chlamydia trachomatis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (1 tablet) once daily for 3 consecutive days (total dose 1500 mg). Uncomplicated Chlamydia trachomatis urethritis/cervicitis: 1000 mg (2 tablets) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients; history of cholestatic jaundice/hepatic dysfunction associated with prior use of azithromycin.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea. Uncommon: dizziness, dysgeusia, palpitations, gastritis, flatulence, rash, pruritus, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Zomax (azithromycin) Branded Anti-Infectives Portfolio',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Zomax 200 mg/5 mL',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '200 mg/5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 15 mL or 22.5 mL oral suspension',
    indications:
      'Paediatric bacterial infections: acute otitis media, acute bacterial sinusitis, streptococcal pharyngitis and tonsillitis, community-acquired pneumonia, and skin and soft tissue infections.',
    dose:
      'Children (< 45 kg): 10 mg/kg body weight (0.25 mL/kg) once daily for 3 consecutive days (total dose 30 mg/kg); for streptococcal pharyngitis/tonsillitis, 10–20 mg/kg once daily for 3 days (maximum 500 mg/day).',
    contraindications:
      'Hypersensitivity to azithromycin, macrolide or ketolide antibiotics, or excipients.',
    adverseEffects:
      'Common: diarrhoea, abdominal pain, nausea, vomiting, headache, rash.',
    storage:
      'Dry powder: store below 30°C. Reconstituted suspension: store below 25°C and discard unused portion after 5–10 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Zomax (azithromycin) Oral Suspension Portfolio',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. After reconstitution, each 5 mL contains azithromycin dihydrate equivalent to 200 mg azithromycin (INN base: Azithromycin).',
  },

  // 5. Rofenac (Diclofenac — Hikma Pharmaceuticals PLC)
  {
    brandName: 'Rofenac 50 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '50 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 20 gastro-resistant tablets in blisters',
    indications:
      'Relief of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, acute gout, acute musculoskeletal disorders (periarthritis, tendinitis, tenosynovitis, bursitis, sprains, strains), post-traumatic and post-operative pain and swelling, and primary dysmenorrhoea.',
    dose:
      'Adults: Recommended daily dose is 100 mg to 150 mg in 2 or 3 divided doses (one 50 mg tablet 2 to 3 times daily). In milder cases or for long-term therapy, 75 mg to 100 mg daily is usually sufficient. Use the lowest effective dose for the shortest duration necessary. Swallow whole with liquid, preferably before meals.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs (history of asthma, angioedema, urticaria, or acute rhinitis precipitated by NSAIDs); active or history of recurrent peptic ulcer/haemorrhage; history of gastrointestinal bleeding or perforation related to previous NSAID therapy; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, and/or cerebrovascular disease; severe hepatic or renal failure; last trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, decreased appetite, increased transaminases, rash. Rare/Very rare: gastritis, gastrointestinal haemorrhage, peptic ulcer/perforation, oedema, hypertension, arterial thrombotic events, asthma/bronchospasm, acute kidney injury, SJS/TEN.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Hikma Pharmaceuticals PLC — Rofenac (diclofenac sodium) Branded Portfolio',
        url: 'https://www.hikma.com/what-we-do/branded/',
      },
    ],
    notes:
      'Official Hikma Pharmaceuticals PLC SmPC data. Each gastro-resistant tablet contains 50 mg diclofenac sodium (INN base: Diclofenac). Also available as Rofenac SR 100 mg prolonged-release tablets and Rofenac 75 mg/3 mL ampoules.',
  },
];

export const HIKMA_PRODUCTS: AiProductDraft[] = RAW_HIKMA.map((d) => ({
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

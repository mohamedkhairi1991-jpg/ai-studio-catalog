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

const RAW_SPIMACO: CompactDrug[] = [
  // 1. Klavox (Amoxicillin + Clavulanic acid — SPIMACO Addwaeih)
  {
    brandName: 'Klavox 625 mg',
    brandNameAr: 'كلافوكس 625 ملغ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '500 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscess with spreading cellulitis), and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 625 mg (500 mg/125 mg) film-coated tablet every 8 hours (three times daily) for 5 to 14 days. Administer at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (cephalosporin, carbapenem, or monobactam); history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, indigestion, elevated AST/ALT, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Klavox (amoxicillin / clavulanate potassium) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih (Saudi Pharmaceutical Industries & Medical Appliances Corporation) SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Klavox 1 g',
    brandNameAr: 'كلافوكس 1 غ',
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
        title: 'SPIMACO Addwaeih — Klavox 1 g Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each 1 g film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Klavox 457 mg/5 mL',
    brandNameAr: 'كلافوكس 457 ملغ/5 مل',
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
        title: 'SPIMACO Addwaeih — Klavox Oral Suspension Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each 5 mL of reconstituted suspension contains 400 mg amoxicillin and 57 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },

  // 2. Zimax (Azithromycin — SPIMACO Addwaeih)
  {
    brandName: 'Zimax 250 mg',
    brandNameAr: 'زيماكس 250 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '250 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 6 hard capsules in blister',
    indications:
      'Upper and lower respiratory tract infections (acute bacterial sinusitis, acute otitis media, pharyngitis/tonsillitis, acute exacerbations of chronic bronchitis, mild to moderate community-acquired pneumonia), uncomplicated skin and soft tissue infections, and uncomplicated genital infections due to Chlamydia trachomatis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (two 250 mg capsules) once daily for 3 consecutive days (total dose 1500 mg), or 500 mg on Day 1 followed by 250 mg once daily on Days 2 to 5. Uncomplicated Chlamydia trachomatis urethritis/cervicitis: 1000 mg (four 250 mg capsules) as a single oral dose. Take at least 1 hour before or 2 hours after food.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients; history of cholestatic jaundice/hepatic dysfunction associated with prior use of azithromycin.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea. Uncommon: dizziness, dysgeusia, palpitations, gastritis, flatulence, rash, pruritus, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Zimax (azithromycin) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each hard capsule contains azithromycin dihydrate equivalent to 250 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Zimax 500 mg',
    brandNameAr: 'زيماكس 500 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Acute bacterial sinusitis, acute otitis media, pharyngitis/tonsillitis, acute exacerbations of chronic bronchitis, mild to moderate community-acquired pneumonia, uncomplicated skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (1 tablet) once daily for 3 consecutive days (total dose 1500 mg). Uncomplicated Chlamydia trachomatis infection: 1000 mg (2 tablets) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, macrolide or ketolide antibiotics, or excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, nausea, vomiting, abdominal pain. Uncommon: dizziness, dysgeusia, palpitations, rash, pruritus, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Zimax 500 mg Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },

  // 3. Cipromax (Ciprofloxacin — SPIMACO Addwaeih)
  {
    brandName: 'Cipromax 500 mg',
    brandNameAr: 'سيبروماكس 500 ملغ',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Uncomplicated and complicated urinary tract infections, acute pyelonephritis, bacterial prostatitis, gonococcal urethritis and cervicitis, epididymo-orchitis, pelvic inflammatory disease, lower respiratory tract infections due to Gram-negative bacteria, chronic suppurative otitis media, malignant external otitis, complicated skin and soft tissue infections, bone and joint infections, infectious diarrhoea, and typhoid fever.',
    dose:
      'Adults: 250 mg to 750 mg twice daily (every 12 hours) for 5 to 14 days depending on indication and severity. Swallow whole with liquid; separate from dairy products or polyvalent cation antacids/supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other fluoroquinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: fungal superinfections, headache, dizziness, sleep disorders, vomiting, abdominal pain, dyspepsia, elevated transaminases, rash, pruritus, arthralgia. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine', 'Pulmonology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Cipromax (ciprofloxacin) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 500 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },

  // 4. Sapofen (Ibuprofen — SPIMACO Addwaeih)
  {
    brandName: 'Sapofen 400 mg',
    brandNameAr: 'سابوفين 400 ملغ',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Relief of mild to moderate pain (headache, dental pain, postoperative pain, primary dysmenorrhoea, musculoskeletal pain), reduction of fever, and anti-inflammatory treatment of rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, and acute soft-tissue injuries.',
    dose:
      'Adults and adolescents (>= 12 years): 400 mg every 6 to 8 hours as required (1200 mg to 1800 mg daily in divided doses; maximum 2400 mg/day). Administer with or after food.',
    contraindications:
      'Hypersensitivity to ibuprofen, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of GI bleeding or perforation related to previous NSAID therapy; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, heartburn, abdominal pain, nausea, vomiting, flatulence, diarrhoea, constipation, headache, dizziness, rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Sapofen (ibuprofen) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains 400 mg ibuprofen.',
  },
  {
    brandName: 'Sapofen 600 mg',
    brandNameAr: 'سابوفين 600 ملغ',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '600 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Symptomatic treatment of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, non-articular rheumatism, and acute musculoskeletal disorders.',
    dose:
      'Adults: 600 mg 2 to 3 times daily (1200 mg to 1800 mg daily; maximum 2400 mg daily in divided doses) taken with or after meals.',
    contraindications:
      'Hypersensitivity to ibuprofen, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, abdominal pain, nausea, diarrhoea, flatulence, constipation, headache, dizziness, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Sapofen 600 mg Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains 600 mg ibuprofen.',
  },
];

export const SPIMACO_PRODUCTS: AiProductDraft[] = RAW_SPIMACO.map((d) => ({
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

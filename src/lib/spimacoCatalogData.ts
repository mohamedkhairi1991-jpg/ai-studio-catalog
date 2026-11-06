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

const RAW_SPIMACO: CompactDrug[] = [
  // 1. Klavox (Amoxicillin + Clavulanic acid — SPIMACO Addwaeih)
  {
    brandName: 'Klavox 625 mg',
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
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
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
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
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
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT (Otolaryngology)', 'Pulmonology'],
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
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Dermatology', 'Internal Medicine'],
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
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Dermatology', 'Internal Medicine'],
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
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics & Gynecology'],
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
  {
    brandName: 'Klavox 228.5 mg/5 mL',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '200 mg/28.5 mg per 5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 70 mL oral suspension',
    indications:
      'Paediatric bacterial infections: acute bacterial sinusitis, acute otitis media, tonsillitis, community-acquired pneumonia, cystitis, pyelonephritis, and skin and soft tissue infections.',
    dose:
      'Children < 40 kg (aged >= 2 months): 25/3.6 mg/kg/day to 45/6.4 mg/kg/day divided into 2 equal doses given every 12 hours at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis, diaper dermatitis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT (Otolaryngology)', 'Pulmonology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Klavox 228.5 mg/5 mL Oral Suspension Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each 5 mL of reconstituted suspension contains 200 mg amoxicillin and 28.5 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Zimax 200 mg/5 mL',
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
      'Children (< 45 kg): 10 mg/kg body weight (0.25 mL/kg) once daily for 3 consecutive days; for streptococcal pharyngitis/tonsillitis, 10–20 mg/kg once daily for 3 days (maximum 500 mg/day).',
    contraindications:
      'Hypersensitivity to azithromycin, macrolide or ketolide antibiotics, or excipients.',
    adverseEffects:
      'Common: diarrhoea, abdominal pain, nausea, vomiting, headache, rash.',
    storage:
      'Dry powder: store below 30°C. Reconstituted suspension: store below 25°C and discard unused portion after 10 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT (Otolaryngology)', 'Pulmonology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Zimax 200 mg/5 mL Oral Suspension Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. After reconstitution, each 5 mL contains azithromycin dihydrate equivalent to 200 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Cipromax 250 mg',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Uncomplicated and complicated urinary tract infections, gonococcal urethritis and cervicitis, infectious diarrhoea, and respiratory or skin infections caused by susceptible Gram-negative bacteria.',
    dose:
      'Adults: 250 mg to 500 mg twice daily (every 12 hours) for 3 to 14 days depending on indication and severity. Separate from dairy products or polyvalent cation antacids/supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other fluoroquinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: fungal superinfections, headache, dizziness, abdominal pain, dyspepsia, rash, arthralgia. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Cipromax 250 mg Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 250 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },
  {
    brandName: 'Cipromax 750 mg',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '750 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Severe or complicated bacterial infections in adults: bone and joint infections (osteomyelitis), malignant external otitis, lower respiratory tract infections due to Pseudomonas aeruginosa in bronchiectasis/COPD, complicated intra-abdominal infections, and chronic bacterial prostatitis.',
    dose:
      'Adults: 750 mg twice daily (every 12 hours) for 7 to 14 days (up to 4–8 weeks for bone and joint infections or malignant external otitis).',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other fluoroquinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: headache, dizziness, vomiting, abdominal pain, elevated transaminases, rash, arthralgia. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Urology', 'Orthopedics', 'Pulmonology', 'ENT (Otolaryngology)'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Cipromax 750 mg Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 750 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },
  {
    brandName: 'Sapofen Junior 100 mg/5 mL',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '100 mg/5 mL',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: 'Bottle of 100 mL or 120 mL oral suspension',
    indications:
      'Reduction of fever (including post-vaccination pyrexia) and relief of mild to moderate pain (teething pain, toothache, earache, sore throat, headache, minor sprains) in infants and children.',
    dose:
      'Children aged 3 months and older (> 5 kg): 20 to 30 mg/kg body weight daily in 3 to 4 divided doses every 6 to 8 hours. Shake well before use.',
    contraindications:
      'Hypersensitivity to ibuprofen or other NSAIDs; active or history of peptic ulcer/bleeding; severe hepatic, renal, or cardiac failure; infants under 3 months of age or weighing < 5 kg.',
    adverseEffects:
      'Uncommon: abdominal pain, nausea, dyspepsia, diarrhoea, skin rash, urticaria, pruritus.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pediatrics'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Sapofen Junior Oral Suspension Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each 5 mL of oral suspension contains 100 mg ibuprofen.',
  },
  {
    brandName: 'Snafi 20 mg',
    genericName: 'Tadalafil',
    activeIngredients: ['Tadalafil'],
    drugClass: 'Selective phosphodiesterase type 5 (PDE5) inhibitor',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 4 or 6 film-coated tablets in blister',
    indications:
      'Treatment of erectile dysfunction in adult males (sexual stimulation is required for tadalafil to be effective).',
    dose:
      'Adult men: Recommended on-demand dose is 10 mg to 20 mg taken at least 30 minutes prior to anticipated sexual activity, with or without food. Maximum dosing frequency is once per day. 20 mg is not recommended for continuous daily use.',
    contraindications:
      'Hypersensitivity to tadalafil or excipients; concomitant administration with any form of organic nitrate or nitric oxide donor (e.g. glyceryl trinitrate, isosorbide dinitrate/mononitrate); concomitant guanylate cyclase stimulators (riociguat); cardiac disease where sexual activity is inadvisable (MI within 90 days, unstable angina, NYHA Class >= II heart failure within 6 months, uncontrolled arrhythmias, hypotension < 90/50 mmHg, uncontrolled hypertension, or stroke within 6 months); previous loss of vision in one eye due to non-arteritic anterior ischaemic optic neuropathy (NAION).',
    adverseEffects:
      'Common: headache, dyspepsia, back pain, myalgia, nasal congestion, flushing, pain in extremity.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Urology', 'Andrology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Snafi (tadalafil) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains 20 mg tadalafil.',
  },
  {
    brandName: 'Snafi 5 mg',
    genericName: 'Tadalafil',
    activeIngredients: ['Tadalafil'],
    drugClass: 'Selective phosphodiesterase type 5 (PDE5) inhibitor',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Once-daily treatment of erectile dysfunction in adult males, and treatment of the signs and symptoms of benign prostatic hyperplasia (BPH) in adult males (including those with both erectile dysfunction and BPH).',
    dose:
      'Adult men: One 5 mg tablet once daily taken at approximately the same time every day, with or without food.',
    contraindications:
      'Hypersensitivity to tadalafil or excipients; concomitant organic nitrates or nitric oxide donors; concomitant riociguat; recent myocardial infarction (within 90 days) or stroke (within 6 months), unstable angina, NYHA Class >= II heart failure, uncontrolled arrhythmias or blood pressure; history of NAION.',
    adverseEffects:
      'Common: headache, dyspepsia, gastro-oesophageal reflux, back pain, myalgia, nasal congestion, flushing, pain in extremity.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Urology', 'Andrology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Snafi 5 mg Once Daily Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains 5 mg tadalafil.',
  },
  {
    brandName: 'Lorine 10 mg',
    genericName: 'Loratadine',
    activeIngredients: ['Loratadine'],
    drugClass: 'Second-generation non-sedating histamine H1-receptor antagonist',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 30 tablets in blisters',
    indications:
      'Symptomatic treatment of seasonal and perennial allergic rhinitis and chronic idiopathic urticaria in adults and children aged 6 years and older weighing > 30 kg.',
    dose:
      'Adults and children > 6 years (> 30 kg): One 10 mg tablet once daily, with or without food.',
    contraindications:
      'Hypersensitivity to loratadine or excipients.',
    adverseEffects:
      'Common: headache, somnolence, increased appetite, insomnia, fatigue.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Allergy & Immunology', 'Dermatology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Lorine (loratadine) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each tablet contains 10 mg loratadine.',
  },
  {
    brandName: 'Lorine 5 mg/5 mL',
    genericName: 'Loratadine',
    activeIngredients: ['Loratadine'],
    drugClass: 'Second-generation non-sedating histamine H1-receptor antagonist',
    strength: '5 mg/5 mL (1 mg/mL)',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: 'Bottle of 100 mL oral syrup',
    indications:
      'Symptomatic relief of allergic rhinitis and chronic idiopathic urticaria in children aged 2 years and older and adults.',
    dose:
      'Children 2 to 12 years: body weight <= 30 kg: 5 mL (5 mg) once daily; body weight > 30 kg: 10 mL (10 mg) once daily. Adults and adolescents (> 12 years): 10 mL (10 mg) once daily.',
    contraindications:
      'Hypersensitivity to loratadine or excipients; children under 2 years of age.',
    adverseEffects:
      'Common: headache, nervousness, fatigue, somnolence.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Pediatrics', 'Allergy & Immunology', 'Dermatology', 'ENT (Otolaryngology)'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Lorine Syrup Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each 5 mL of syrup contains 5 mg loratadine.',
  },
  {
    brandName: 'Omez 20 mg',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Duodenal and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease with antibiotics; NSAID-associated gastric and duodenal ulcers; reflux oesophagitis and symptomatic GORD; and Zollinger-Ellison syndrome.',
    dose:
      '20 mg once daily in the morning before food for 2–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps.',
    storage:
      'Store below 25°C in a dry place, protected from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Omez (omeprazole 20 mg) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each gastro-resistant capsule contains 20 mg omeprazole.',
  },
  {
    brandName: 'Cefutil 500 mg',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation oral cephalosporin beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and early Lyme disease.',
    dose:
      'Adults and children >= 40 kg: 250 mg to 500 mg twice daily (every 12 hours) for 5 to 10 days (14 days for early Lyme disease), taken after food for optimal absorption.',
    contraindications:
      'Hypersensitivity to cefuroxime, other cephalosporin antibiotics, or excipients; history of severe hypersensitivity reaction to penicillins or other beta-lactam antibacterials.',
    adverseEffects:
      'Common: Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzyme levels.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Cefutil (cefuroxime axetil 500 mg) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains cefuroxime axetil equivalent to 500 mg cefuroxime (INN base: Cefuroxime).',
  },
  {
    brandName: 'Clarimax 500 mg',
    genericName: 'Clarithromycin',
    activeIngredients: ['Clarithromycin'],
    drugClass: 'Macrolide antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Upper and lower respiratory tract infections (pharyngitis, tonsillitis, acute maxillary sinusitis, acute exacerbation of chronic bronchitis, community-acquired pneumonia), uncomplicated skin and soft tissue infections, and Helicobacter pylori eradication in combination therapy.',
    dose:
      'Adults and adolescents (>= 12 years): 250 mg to 500 mg twice daily for 6 to 14 days. H. pylori eradication: 500 mg twice daily for 7 to 14 days with a proton pump inhibitor and amoxicillin or metronidazole.',
    contraindications:
      'Hypersensitivity to clarithromycin, macrolide antibiotics, or excipients; concomitant astemizole, cisapride, domperidone, pimozide, terfenadine, ergot alkaloids, oral midazolam, lomitapide, ticagrelor, ivabradine, ranolazine, lovastatin, simvastatin, or colchicine; history of QT prolongation or ventricular arrhythmia; hypokalaemia or hypomagnesaemia.',
    adverseEffects:
      'Common: insomnia, dysgeusia, headache, diarrhoea, vomiting, dyspepsia, nausea, abdominal pain, abnormal liver function test, rash, hyperhidrosis.',
    storage:
      'Store below 30°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'SPIMACO Addwaeih — Clarimax (clarithromycin 500 mg) Official Product Portfolio',
        url: 'https://www.spimaco.com.sa/',
      },
    ],
    notes:
      'Official SPIMACO Addwaeih SmPC data. Each film-coated tablet contains 500 mg clarithromycin.',
  },
];

export const SPIMACO_PRODUCTS: AiProductDraft[] = RAW_SPIMACO.map((d) => ({
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

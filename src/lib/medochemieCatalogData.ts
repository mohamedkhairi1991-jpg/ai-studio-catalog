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

const RAW_MEDOCHEMIE: CompactDrug[] = [
  // 1. Medoclav (Amoxicillin + Clavulanic acid — Medochemie Ltd)
  {
    brandName: 'Medoclav 625 mg',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '500 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 20 film-coated tablets in foil blisters',
    indications:
      'Treatment of bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscess with spreading cellulitis), and bone and joint infections (osteomyelitis).',
    dose:
      'Adults and children >= 40 kg: One 500 mg/125 mg (625 mg) tablet taken three times daily for 5 to 14 days. Administer with a meal to minimise gastrointestinal intolerance and optimise absorption of clavulanic acid.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (cephalosporin, carbapenem, or monobactam); history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, indigestion, elevated AST/ALT, skin rash, pruritus, urticaria. Rare/Very rare: reversible leukopenia and thrombocytopenia, antibiotic-associated colitis, cholestatic jaundice, hepatitis, severe cutaneous adverse reactions (SJS, TEN, DRESS, AGEP).',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoclav (amoxicillin / clavulanic acid) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Medoclav 1 g',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '875 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in foil blisters',
    indications:
      'Treatment of acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 875 mg/125 mg (1 g) tablet twice daily; for severe infections (such as otitis media, sinusitis, lower respiratory tract infections, and urinary tract infections), one 875 mg/125 mg tablet three times daily. Administer at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: headache, dizziness, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoclav (amoxicillin / clavulanic acid) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each 1 g film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },

  // 2. Medoflucon (Fluconazole — Medochemie Ltd)
  {
    brandName: 'Medoflucon 150 mg',
    genericName: 'Fluconazole',
    activeIngredients: ['Fluconazole'],
    drugClass: 'Triazole systemic antifungal agent',
    strength: '150 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 1 hard capsule in blister',
    indications:
      'Treatment of acute or recurrent vaginal candidiasis and candidal balanitis where local therapy is not appropriate; dermatomycosis including tinea pedis, tinea corporis, tinea cruris, tinea versicolor, tinea unguium (onychomycosis), and dermal Candida infections; mucosal candidiasis (oropharyngeal, oesophageal, mucocutaneous); and systemic candidiasis and cryptococcosis.',
    dose:
      'Acute vaginal candidiasis and candidal balanitis: 150 mg as a single oral dose. Recurrent vaginal candidiasis: 150 mg every third day for a total of 3 doses (Day 1, 4, and 7) followed by 150 mg once weekly for 6 months. Dermatomycoses: 150 mg once weekly for 2 to 6 weeks. Tinea unguium: 150 mg once weekly until infected nail is replaced.',
    contraindications:
      'Hypersensitivity to fluconazole, related azole substances, or excipients; coadministration with terfenadine (at fluconazole doses >= 400 mg/day); coadministration with other medicinal products known to prolong the QT interval and metabolised via CYP3A4 (such as cisapride, astemizole, pimozide, quinidine, and erythromycin).',
    adverseEffects:
      'Common: headache, abdominal pain, vomiting, diarrhoea, nausea, increased alanine aminotransferase, aspartate aminotransferase, and blood alkaline phosphatase, rash. Uncommon: anaemia, decreased appetite, insomnia, somnolence, dizziness, paraesthesia, dysgeusia, vertigo, constipation, dyspepsia, flatulence, dry mouth, cholestasis, jaundice, pruritus, urticaria, myalgia, fatigue, QT prolongation.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Infectious Diseases', 'Obstetrics & Gynecology', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoflucon (fluconazole) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each hard capsule contains 150 mg fluconazole. Also available in 50 mg and 200 mg strengths.',
  },
  {
    brandName: 'Medoflucon 200 mg',
    genericName: 'Fluconazole',
    activeIngredients: ['Fluconazole'],
    drugClass: 'Triazole systemic antifungal agent',
    strength: '200 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 7 hard capsules in blister',
    indications:
      'Treatment of cryptococcal meningitis and maintenance therapy to prevent relapse of cryptococcal disease in high-risk patients; invasive candidiasis (candidaemia, disseminated candidiasis); severe mucosal candidiasis (oesophageal, tracheobronchial, chronic mucocutaneous); and prophylaxis of fungal infections in immunocompromised patients with neutropenia.',
    dose:
      'Cryptococcal meningitis and invasive candidiasis: loading dose of 400 mg (two 200 mg capsules) on Day 1, followed by 200 mg to 400 mg once daily. Prevention of relapse of cryptococcal meningitis: 200 mg once daily. Fungal prophylaxis in neutropenic patients: 200 mg to 400 mg once daily.',
    contraindications:
      'Hypersensitivity to fluconazole, related azoles, or excipients; coadministration with terfenadine (at doses >= 400 mg/day) or CYP3A4-metabolised QT-prolonging drugs (cisapride, astemizole, pimozide, quinidine, erythromycin).',
    adverseEffects:
      'Common: headache, nausea, vomiting, abdominal pain, diarrhoea, elevated hepatic enzymes (ALT, AST, ALP), skin rash. Rare: hepatic toxicity, exfoliative cutaneous disorders (SJS, TEN), torsade de pointes / QT prolongation.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Hematology', 'Oncology'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoflucon (fluconazole) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each hard capsule contains 200 mg fluconazole.',
  },

  // 3. Medoprazole (Omeprazole — Medochemie Ltd)
  {
    brandName: 'Medoprazole 20 mg',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant hard capsules',
    indications:
      'Treatment and prevention of relapse of duodenal ulcers and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease in combination with appropriate antibiotics; treatment and prophylaxis of NSAID-associated gastric and duodenal ulcers; treatment and maintenance of reflux oesophagitis; symptomatic gastro-oesophageal reflux disease; and Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 20 mg once daily for 2–4 weeks. Gastric ulcer and reflux oesophagitis: 20 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics. NSAID ulcer prophylaxis: 20 mg once daily. Swallow capsules whole in the morning before food.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps. Uncommon: dizziness, insomnia, paraesthesia, elevated hepatic enzymes, rash, pruritus, urticaria, malaise.',
    storage:
      'Store below 25°C in a dry place, protected from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoprazole (omeprazole) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each gastro-resistant hard capsule contains 20 mg omeprazole.',
  },

  // 4. Medociprin (Ciprofloxacin — Medochemie Ltd)
  {
    brandName: 'Medociprin 500 mg',
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
      'Adults: 250 mg to 750 mg twice daily depending on the site and severity of infection (typically 500 mg twice daily for 7 to 14 days). Swallow whole with liquid; separate from dairy products or polyvalent cation antacids/supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other quinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: mycotic superinfections, headache, dizziness, sleep disorders, vomiting, abdominal pain, dyspepsia, elevated hepatic transaminases, rash, pruritus, arthralgia. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT prolongation.',
    storage:
      'Store below 25°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine', 'Pulmonology'],
    sources: [
      {
        title: 'Medochemie Ltd — Medociprin (ciprofloxacin) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 500 mg ciprofloxacin (INN base: Ciprofloxacin). Also available in 250 mg tablets.',
  },

  // 5. Axetine (Cefuroxime — Medochemie Ltd)
  {
    brandName: 'Axetine 500 mg',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Treatment of acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and treatment of early Lyme disease.',
    dose:
      'Adults and children >= 40 kg: 250 mg to 500 mg twice daily for 5 to 10 days depending on indication (500 mg twice daily for acute otitis media, severe lower respiratory tract infections, and Lyme disease for 14 days). Take after food for optimum absorption.',
    contraindications:
      'Hypersensitivity to cefuroxime, any other cephalosporin antibiotic, or excipients; history of severe hypersensitivity (e.g. anaphylactic reaction) to any other type of beta-lactam antibacterial agent (penicillins, monobactams, and carbapenems).',
    adverseEffects:
      'Common: Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzyme levels.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Medochemie Ltd — Axetine (cefuroxime) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each film-coated tablet contains cefuroxime axetil equivalent to 500 mg cefuroxime (INN base: Cefuroxime).',
  },
  {
    brandName: 'Axetine 750 mg',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin beta-lactam antibacterial',
    strength: '750 mg',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous or Intramuscular',
    packSize: 'Pack of 1 or 10 vials of powder for injection',
    indications:
      'Community-acquired pneumonia, acute exacerbations of chronic bronchitis, complicated urinary tract infections (including pyelonephritis), soft-tissue infections (cellulitis, erysipelas, wound infections), intra-abdominal infections, and prophylaxis of infection in gastrointestinal, orthopaedic, cardiovascular, and gynaecological surgery.',
    dose:
      'Adults and children >= 40 kg: 750 mg every 8 hours by intravenous or intramuscular injection; for more severe infections, 1.5 g every 8 hours (or every 6 hours) intravenously. Surgical prophylaxis: 1.5 g IV at induction of anaesthesia, supplemented by two 750 mg IM/IV doses after 8 and 16 hours for prolonged procedures.',
    contraindications:
      'Hypersensitivity to cefuroxime or cephalosporin antibiotics; history of severe hypersensitivity reaction to any other beta-lactam antibacterial.',
    adverseEffects:
      'Common: neutropenia, eosinophilia, decreased haemoglobin concentration, transient rise in liver enzymes, injection site reactions (pain and thrombophlebitis).',
    storage:
      'Store below 25°C. Keep the vial in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'General Surgery', 'Critical Care', 'Pulmonology'],
    sources: [
      {
        title: 'Medochemie Ltd — Axetine (cefuroxime sodium) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each vial contains cefuroxime sodium equivalent to 750 mg cefuroxime (INN base: Cefuroxime). Also available in 1.5 g vials.',
  },

  // 6. Medopenem (Meropenem — Medochemie Ltd)
  {
    brandName: 'Medopenem 1 g',
    genericName: 'Meropenem',
    activeIngredients: ['Meropenem'],
    drugClass: 'Carbapenem beta-lactam antibacterial',
    strength: '1 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous',
    packSize: 'Pack of 10 vials of powder for IV injection/infusion',
    indications:
      'Treatment of severe infections in adults and children aged 3 months and older: severe pneumonia (including hospital-acquired and ventilator-associated pneumonia), broncho-pulmonary infections in cystic fibrosis, complicated urinary tract infections, complicated intra-abdominal infections, intra- and post-partum infections, complicated skin and soft tissue infections, acute bacterial meningitis, and management of febrile neutropenic patients.',
    dose:
      'Adults and adolescents: 500 mg to 1 g intravenously every 8 hours depending on type and severity of infection; up to 2 g every 8 hours for bacterial meningitis and broncho-pulmonary infections in cystic fibrosis. Administer as an IV infusion over 15–30 minutes or as an IV bolus injection over approximately 5 minutes. Adjust dose when CrCl <= 50 mL/min.',
    contraindications:
      'Hypersensitivity to meropenem, any other carbapenem antibacterial agent, or excipients; severe hypersensitivity (e.g. anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (e.g. penicillins or cephalosporins).',
    adverseEffects:
      'Common: thrombocythaemia, headache, diarrhoea, vomiting, nausea, abdominal pain, increased transaminases (ALT, AST), alkaline phosphatase, and lactate dehydrogenase, rash, pruritus, inflammation and pain at injection site.',
    storage:
      'This medicinal product does not require any special temperature storage conditions. Do not freeze the reconstituted solution.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Internal Medicine', 'Pulmonology', 'General Surgery'],
    sources: [
      {
        title: 'Medochemie Ltd — Medopenem (meropenem) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each vial contains meropenem trihydrate equivalent to 1 g anhydrous meropenem (INN base: Meropenem). Also available in 500 mg vials.',
  },
  {
    brandName: 'Medoclav Forte 312.5 mg/5 mL',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '250 mg/62.5 mg per 5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 100 mL oral suspension',
    indications:
      'Paediatric bacterial infections: acute bacterial sinusitis, acute otitis media, tonsillitis, community-acquired pneumonia, cystitis, pyelonephritis, and skin and soft tissue infections.',
    dose:
      'Children < 40 kg: 20/5 mg/kg/day to 60/15 mg/kg/day divided into 3 equal doses given every 8 hours at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT (Otolaryngology)', 'Pulmonology'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoclav Forte Oral Suspension Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each 5 mL of reconstituted suspension contains 250 mg amoxicillin and 62.5 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Medoflucon 50 mg',
    genericName: 'Fluconazole',
    activeIngredients: ['Fluconazole'],
    drugClass: 'Triazole systemic antifungal agent',
    strength: '50 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 7 hard capsules in blister',
    indications:
      'Treatment of mucosal candidiasis (oropharyngeal, oesophageal, mucocutaneous candidiasis, candiduria), dermatomycoses (tinea pedis, tinea corporis, tinea cruris, tinea versicolor, dermal Candida infections), and prophylaxis of candidiasis in immunocompromised patients.',
    dose:
      'Oropharyngeal candidiasis: 50 mg to 100 mg once daily for 7 to 14 days. Dermatomycoses: 50 mg once daily for 2 to 4 weeks (up to 6 weeks in tinea pedis).',
    contraindications:
      'Hypersensitivity to fluconazole, related azoles, or excipients; coadministration with terfenadine (at doses >= 400 mg/day) or CYP3A4-metabolised QT-prolonging drugs (cisapride, astemizole, pimozide, quinidine, erythromycin).',
    adverseEffects:
      'Common: headache, abdominal pain, diarrhoea, nausea, vomiting, elevated ALT/AST/ALP, rash.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Infectious Diseases', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoflucon 50 mg Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each hard capsule contains 50 mg fluconazole.',
  },
  {
    brandName: 'Medociprin 250 mg',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Uncomplicated and complicated urinary tract infections, gonococcal urethritis and cervicitis, infectious diarrhoea, and respiratory or skin infections due to susceptible Gram-negative bacteria.',
    dose:
      'Adults: 250 mg to 500 mg twice daily (every 12 hours) for 3 to 14 days depending on indication and severity. Separate from dairy products or polyvalent cation antacids/supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other quinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: headache, dizziness, abdominal pain, dyspepsia, elevated transaminases, rash, arthralgia. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT prolongation.',
    storage:
      'Store below 25°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medociprin 250 mg Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 250 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },
  {
    brandName: 'Axetine 250 mg',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin beta-lactam antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, and uncomplicated skin and soft tissue infections.',
    dose:
      'Adults and children >= 40 kg: 250 mg twice daily for most infections (500 mg twice daily for pneumonia, severe bronchitis, or otitis media) for 5 to 10 days, taken after food.',
    contraindications:
      'Hypersensitivity to cefuroxime, other cephalosporins, or excipients; history of severe hypersensitivity reaction to penicillins or other beta-lactam antibacterials.',
    adverseEffects:
      'Common: Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzyme levels.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Medochemie Ltd — Axetine 250 mg Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each film-coated tablet contains cefuroxime axetil equivalent to 250 mg cefuroxime (INN base: Cefuroxime).',
  },
  {
    brandName: 'Axetine 1.5 g',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin beta-lactam antibacterial',
    strength: '1.5 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous or Intramuscular',
    packSize: 'Pack of 1 or 10 vials of powder for injection/infusion',
    indications:
      'Severe community-acquired pneumonia, complicated urinary tract infections (including pyelonephritis), soft-tissue and intra-abdominal infections, and surgical antimicrobial prophylaxis.',
    dose:
      'Adults and children >= 40 kg: 1.5 g intravenously every 8 hours (or every 6 hours) for severe infections. Surgical prophylaxis: 1.5 g IV at induction of anaesthesia.',
    contraindications:
      'Hypersensitivity to cefuroxime or cephalosporin antibiotics; history of severe hypersensitivity reaction to any other beta-lactam antibacterial.',
    adverseEffects:
      'Common: neutropenia, eosinophilia, decreased haemoglobin concentration, transient rise in liver enzymes, injection site pain and thrombophlebitis.',
    storage:
      'Store below 25°C. Keep vial in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'General Surgery', 'Critical Care', 'Pulmonology'],
    sources: [
      {
        title: 'Medochemie Ltd — Axetine 1.5 g Injection Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each vial contains cefuroxime sodium equivalent to 1.5 g cefuroxime (INN base: Cefuroxime).',
  },
  {
    brandName: 'Medopenem 500 mg',
    genericName: 'Meropenem',
    activeIngredients: ['Meropenem'],
    drugClass: 'Carbapenem beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous',
    packSize: 'Pack of 10 vials of powder for IV injection/infusion',
    indications:
      'Severe pneumonia (including hospital-acquired and ventilator-associated pneumonia), complicated urinary tract infections, complicated intra-abdominal infections, intra- and post-partum infections, and complicated skin and soft tissue infections.',
    dose:
      'Adults and adolescents: 500 mg to 1 g intravenously every 8 hours over 15–30 minutes (or IV bolus over 5 minutes) depending on infection type and severity; adjust dose in renal impairment (CrCl <= 50 mL/min).',
    contraindications:
      'Hypersensitivity to meropenem, other carbapenems, or excipients; severe hypersensitivity to penicillins, cephalosporins, or other beta-lactam antibacterials.',
    adverseEffects:
      'Common: thrombocythaemia, headache, diarrhoea, vomiting, nausea, abdominal pain, increased transaminases, rash, pruritus, injection site inflammation.',
    storage:
      'Do not freeze the reconstituted solution.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Internal Medicine', 'General Surgery'],
    sources: [
      {
        title: 'Medochemie Ltd — Medopenem 500 mg Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each vial contains meropenem trihydrate equivalent to 500 mg anhydrous meropenem (INN base: Meropenem).',
  },
  {
    brandName: 'Medomicin 500 mg',
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
      'Adults and adolescents (>= 45 kg): 500 mg once daily for 3 consecutive days (total dose 1500 mg). Uncomplicated Chlamydia trachomatis infection: 1000 mg as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients; history of azithromycin-associated cholestatic jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea. Uncommon: dizziness, dysgeusia, palpitations, rash, pruritus, QT prolongation.',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Anti-Infectives Portfolio (Medomicin / azithromycin)',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Medoklor 500 mg',
    genericName: 'Cefaclor',
    activeIngredients: ['Cefaclor'],
    drugClass: 'Second-generation oral cephalosporin beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 15 or 16 hard capsules in blisters',
    indications:
      'Treatment of respiratory tract infections (otitis media, sinusitis, pharyngitis, tonsillitis, acute bronchitis, pneumonia), uncomplicated urinary tract infections (cystitis, pyelonephritis), and skin and soft tissue infections caused by susceptible organisms.',
    dose:
      'Adults: Usual dose is 250 mg every 8 hours; for more severe infections (such as pneumonia) or less susceptible organisms, 500 mg every 8 hours (maximum 4 g/day).',
    contraindications:
      'Hypersensitivity to cefaclor, other cephalosporins, or excipients; history of severe immediate hypersensitivity reaction to penicillins or other beta-lactam antibiotics.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, dyspepsia, maculopapular rash, urticaria, eosinophilia. Rare: serum sickness-like reaction (erythema multiforme, rashes, and arthralgia/arthritis).',
    storage:
      'Store below 25°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medoklor (cefaclor) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each hard capsule contains cefaclor monohydrate equivalent to 500 mg anhydrous cefaclor (INN base: Cefaclor).',
  },
  {
    brandName: 'Medobufen 400 mg',
    genericName: 'Ibuprofen',
    activeIngredients: ['Ibuprofen'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, propionic acid derivative)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 film-coated tablets in blisters',
    indications:
      'Symptomatic relief of mild to moderate pain (headache, dental pain, dysmenorrhoea, postoperative and musculoskeletal pain), fever, and inflammatory joint disorders (rheumatoid arthritis, osteoarthritis, ankylosing spondylitis).',
    dose:
      'Adults and adolescents (>= 12 years): 400 mg every 6 to 8 hours as needed (1200 mg to 1800 mg daily; maximum 2400 mg/day in divided doses). Take with or after food.',
    contraindications:
      'Hypersensitivity to ibuprofen, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: dyspepsia, abdominal pain, nausea, diarrhoea, flatulence, constipation, headache, dizziness, rash.',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medobufen (ibuprofen 400 mg) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd product page and SmPC data. Each film-coated tablet contains 400 mg ibuprofen.',
  },
  {
    brandName: 'Medozol 200 mg',
    genericName: 'Albendazole',
    activeIngredients: ['Albendazole'],
    drugClass: 'Benzimidazole carbamate broad-spectrum anthelmintic',
    strength: '200 mg',
    dosageForm: 'Film-coated / chewable tablet',
    route: 'Oral',
    packSize: 'Pack of 2 tablets in blister',
    indications:
      'Intestinal nematode and cestode infections including Enterobius vermicularis (pinworm/threadworm), Ascaris lumbricoides (roundworm), Trichuris trichiura (whipworm), Ancylostoma duodenale and Necator americanus (hookworm), Strongyloides stercoralis, Taenia species, and systemic echinococcosis / neurocysticercosis.',
    dose:
      'Adults and children over 2 years: Enterobiasis, ascariasis, trichuriasis, and hookworm: 400 mg (two 200 mg tablets) as a single oral dose (repeat after 2 weeks for enterobiasis). Strongyloidiasis or taeniasis: 400 mg once daily for 3 consecutive days.',
    contraindications:
      'Hypersensitivity to albendazole, other benzimidazole derivatives, or excipients; pregnancy and women suspected of being pregnant.',
    adverseEffects:
      'Common/Uncommon: upper gastrointestinal symptoms (epigastric or abdominal pain, nausea, vomiting), diarrhoea, headache, dizziness, reversible elevation of hepatic enzymes, reversible alopecia or leukopenia (in prolonged high-dose therapy).',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Infectious Diseases', 'Gastroenterology', 'Pediatrics', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Medozol (albendazole) Official Product Information',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd SmPC data. Each tablet contains 200 mg albendazole.',
  },
  {
    brandName: 'Amlomed 5 mg',
    genericName: 'Amlodipine',
    activeIngredients: ['Amlodipine'],
    drugClass: 'Dihydropyridine calcium channel blocker',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; and vasospastic (Prinzmetal) angina.',
    dose:
      'Adults: Usual initial dose is 5 mg once daily, which may be increased to a maximum dose of 10 mg once daily depending on individual response.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; shock (including cardiogenic shock); left ventricular outflow tract obstruction (e.g. severe aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: peripheral oedema. Common: somnolence, dizziness, headache, palpitations, flushing, abdominal pain, nausea, dyspepsia, ankle swelling, muscle cramps, fatigue.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Cardiovascular Portfolio (Amlomed / amlodipine)',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd SmPC data. Each tablet contains amlodipine besilate equivalent to 5 mg amlodipine (INN base: Amlodipine).',
  },
  {
    brandName: 'Amlomed 10 mg',
    genericName: 'Amlodipine',
    activeIngredients: ['Amlodipine'],
    drugClass: 'Dihydropyridine calcium channel blocker',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; and vasospastic (Prinzmetal) angina in adult patients requiring maximal calcium channel blockade.',
    dose:
      'Adults: 10 mg once daily (maximum daily dose) for patients not adequately controlled on 5 mg once daily.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; cardiogenic shock; severe aortic stenosis; haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: peripheral oedema / ankle swelling. Common: headache, dizziness, somnolence, flushing, palpitations, abdominal pain, nausea, dyspepsia, muscle cramps, fatigue.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Medochemie Ltd — Cardiovascular Portfolio (Amlomed 10 mg)',
        url: 'https://www.medochemie.com/',
      },
    ],
    notes:
      'Official Medochemie Ltd SmPC data. Each tablet contains amlodipine besilate equivalent to 10 mg amlodipine (INN base: Amlodipine).',
  },
];

export const MEDOCHEMIE_PRODUCTS: AiProductDraft[] = RAW_MEDOCHEMIE.map((d) => ({
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

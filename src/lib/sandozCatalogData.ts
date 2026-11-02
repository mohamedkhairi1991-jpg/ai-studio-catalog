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

const RAW_SANDOZ: CompactDrug[] = [
  // 1. Curam (Amoxicillin + Clavulanic acid — Sandoz GmbH)
  {
    brandName: 'Curam 625 mg',
    brandNameAr: 'كورام 625 ملغ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Beta-lactam antibacterial (penicillin and beta-lactamase inhibitor combination)',
    strength: '500 mg / 125 mg (625 mg)',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 20 film-coated tablets in aluminium blisters',
    indications:
      'Treatment of the following bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (in particular cellulitis, animal bites, severe dental abscess with spreading cellulitis), and bone and joint infections (in particular osteomyelitis).',
    dose:
      'Adults and children >=40 kg: One 500 mg / 125 mg (625 mg) tablet taken three times daily. Administer at the start of a meal to minimise potential gastrointestinal intolerance and optimise absorption.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any of the penicillins, or any excipient; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (e.g. a cephalosporin, carbapenem, or monobactam); history of jaundice/hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Mucocutaneous candidiasis, diarrhoea, nausea, vomiting, dizziness, headache, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria; antibiotic-associated colitis, cholestatic jaundice/hepatitis (rare).',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'Otolaryngology (ENT)', 'General Practice'],
    sources: [
      {
        title: 'Sandoz GmbH — Curam (Amoxicillin / Clavulanic acid) Film-Coated Tablets Official Product Information',
        url: 'https://www.sandoz.com/our-work/anti-infectives/',
      },
    ],
    notes:
      'Official Sandoz GmbH (Kundl, Austria / Sandoz Group AG) SmPC data for Curam 625 mg (500 mg amoxicillin as trihydrate + 125 mg clavulanic acid as potassium clavulanate). Generic names normalized to INN bases (Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Curam 1000 mg',
    brandNameAr: 'كورام 1000 ملغ',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Beta-lactam antibacterial (penicillin and beta-lactamase inhibitor combination)',
    strength: '875 mg / 125 mg (1000 mg)',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in aluminium blisters',
    indications:
      'Treatment of bacterial infections in adults and children >=40 kg: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children >=40 kg: Standard dose is one 875 mg / 125 mg (1000 mg) tablet twice daily; higher dose (particularly for otitis media, sinusitis, lower respiratory tract infections, and urinary tract infections) is one 875 mg / 125 mg tablet three times daily. Take at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or any excipient; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of jaundice/hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Diarrhoea (very common in adults), mucocutaneous candidiasis, nausea, vomiting, dizziness, headache, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage: 'Do not store above 25°C. Store in the original package in order to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'Otolaryngology (ENT)', 'General Practice'],
    sources: [
      {
        title: 'Sandoz GmbH — Curam 1000 mg (875 mg / 125 mg) Film-Coated Tablets Official Product Information',
        url: 'https://www.sandoz.com/our-work/anti-infectives/',
      },
    ],
    notes:
      'Official Sandoz GmbH (Kundl, Austria / Sandoz Group AG) SmPC data for Curam 1000 mg (875 mg amoxicillin as trihydrate + 125 mg clavulanic acid as potassium clavulanate). Generic names normalized to INN bases (Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Curam 457 mg/5 mL',
    brandNameAr: 'كورام 457 ملغ/5 مل',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Beta-lactam antibacterial (penicillin and beta-lactamase inhibitor combination)',
    strength: '400 mg / 57 mg per 5 mL (457 mg/5 mL)',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Amber glass bottle for 70 mL reconstituted oral suspension with dosing syringe/spoon',
    indications:
      'Treatment of bacterial infections in children (<40 kg): acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Children <40 kg (from 2 months of age): Standard dose: 25 mg/3.6 mg/kg/day to 45 mg/6.4 mg/kg/day given as two divided doses. Higher dose (for otitis media, sinusitis, and lower respiratory tract infections): up to 70 mg/10 mg/kg/day given as two divided doses. Administer at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or any excipient (contains aspartame/phenylalanine); history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of jaundice/hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Diarrhoea, nausea, vomiting, mucocutaneous candidiasis, rash, pruritus, urticaria, reversible tooth discolouration.',
    storage: 'Dry powder: Do not store above 25°C. Reconstituted suspension: Store in a refrigerator (2°C–8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'Otolaryngology (ENT)'],
    sources: [
      {
        title: 'Sandoz GmbH — Curam 457 mg/5 mL Powder for Oral Suspension Official Product Information',
        url: 'https://www.sandoz.com/our-work/anti-infectives/',
      },
    ],
    notes:
      'Official Sandoz GmbH SmPC data for Curam Forte 457 mg/5 mL (400 mg amoxicillin as trihydrate + 57 mg clavulanic acid as potassium clavulanate per 5 mL). Generic names normalized to INN bases (Amoxicillin + Clavulanic acid).',
  },

  // 2. Losartan Sandoz (Losartan)
  {
    brandName: 'Losartan Sandoz 50 mg',
    brandNameAr: 'لوسارتان ساندوز 50 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 scored film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents 6–18 years of age; treatment of renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >=0.5 g/day as part of an antihypertensive treatment; treatment of chronic heart failure in adult patients when treatment with ACE inhibitors is considered unsuitable due to incompatibility (especially cough) or contraindication; reduction in the risk of stroke in adult hypertensive patients with left ventricular hypertrophy documented by ECG.',
    dose:
      'Usual starting and maintenance dose is 50 mg once daily in most patients. Maximal antihypertensive effect is attained 3–6 weeks after initiation; may be increased to 100 mg once daily (in the morning). In chronic heart failure, start at 12.5 mg once daily and titrate weekly to 25 mg, 50 mg, 100 mg, up to a maximum of 150 mg once daily as tolerated.',
    contraindications:
      'Hypersensitivity to losartan or any excipient; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, vertigo, hypotension, orthostatic hypotension, asthenia, fatigue, hypoglycaemia, hyperkalaemia, anaemia, renal impairment, renal failure, increased blood urea, serum creatinine, and serum potassium.',
    storage: 'This medicinal product does not require any special storage conditions. Store in the original package to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Losartan Potassium 50 mg Film-coated Tablets SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/4977/smpc',
      },
    ],
    notes:
      'Official Sandoz SmPC data. Each film-coated tablet contains 50 mg losartan potassium. Generic name normalized to INN base (Losartan).',
  },
  {
    brandName: 'Losartan Sandoz 100 mg',
    brandNameAr: 'لوسارتان ساندوز 100 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension; treatment of renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >=0.5 g/day; treatment of chronic heart failure in adults when ACE inhibitors are unsuitable; reduction in the risk of stroke in adult hypertensive patients with ECG-documented left ventricular hypertrophy.',
    dose:
      'Maintenance / maximum hypertension and diabetic nephropathy dose: 100 mg once daily (reached after starting at 50 mg once daily). May be administered with or without food.',
    contraindications:
      'Hypersensitivity to losartan or any excipient; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness, vertigo, hypotension, orthostatic hypotension, asthenia, fatigue, hypoglycaemia, hyperkalaemia, anaemia, renal impairment, elevated blood urea and serum creatinine.',
    storage: 'This medicinal product does not require any special storage conditions. Store in the original package to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Losartan Potassium 100 mg Film-coated Tablets SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/4978/smpc',
      },
    ],
    notes:
      'Official Sandoz SmPC data. Each film-coated tablet contains 100 mg losartan potassium. Generic name normalized to INN base (Losartan).',
  },

  // 3. Zinnat (Cefuroxime — acquired by Sandoz from GSK in 2021)
  {
    brandName: 'Zinnat 250 mg',
    brandNameAr: 'زينات 250 ملغ',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in aluminium blisters',
    indications:
      'Treatment of infections in adults and children from the age of 3 months: acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and treatment of early Lyme disease.',
    dose:
      'Adults and children (>=40 kg): 250 mg twice daily for acute tonsillitis/pharyngitis, acute bacterial sinusitis, uncomplicated skin/soft tissue infections, and cystitis; 500 mg twice daily for acute exacerbations of chronic bronchitis, acute otitis media, and early Lyme disease (for 14 days). Tablets should be taken after food for optimum absorption; do not crush or chew.',
    contraindications:
      'Hypersensitivity to cefuroxime or any excipient; patients with known hypersensitivity to cephalosporin antibiotics; history of severe hypersensitivity (e.g. anaphylactic reaction) to any other type of beta-lactam antibacterial agent (penicillins, monobactams, and carbapenems).',
    adverseEffects:
      'Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzyme levels; positive Coombs test, thrombocytopenia, leukopenia, skin rashes, pseudomembranous colitis (uncommon/rare).',
    storage: 'Do not store above 30°C. Store in the original package.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'Otolaryngology (ENT)', 'Urology'],
    sources: [
      {
        title: 'UK EMC — Zinnat 250 mg Tablets SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5488/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited, following Sandoz global acquisition of the Zinnat/Zinacef/Fortum cephalosporin portfolio from GSK in 2021). Each tablet contains 250 mg cefuroxime (as cefuroxime axetil). Generic name normalized to INN base (Cefuroxime).',
  },
  {
    brandName: 'Zinnat 500 mg',
    brandNameAr: 'زينات 500 ملغ',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in aluminium blisters',
    indications:
      'Treatment of infections in adults and children (>=40 kg): acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and early Lyme disease.',
    dose:
      'Adults and children (>=40 kg): 500 mg twice daily for acute otitis media, acute exacerbations of chronic bronchitis, and early Lyme disease (14 days; range 10–21 days). Take after food for optimum absorption; do not crush or divide tablets.',
    contraindications:
      'Hypersensitivity to cefuroxime or any excipient; known hypersensitivity to cephalosporin antibiotics; history of severe hypersensitivity reaction to any other beta-lactam antibacterial agent.',
    adverseEffects:
      'Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzymes.',
    storage: 'Do not store above 30°C. Store in the original package.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'Otolaryngology (ENT)', 'Urology'],
    sources: [
      {
        title: 'UK EMC — Zinnat 500 mg Tablets SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5489/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Each tablet contains 500 mg cefuroxime (as cefuroxime axetil). Generic name normalized to INN base (Cefuroxime).',
  },
  {
    brandName: 'Zinnat 125 mg/5 mL',
    brandNameAr: 'زينات 125 ملغ/5 مل',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation cephalosporin antibacterial',
    strength: '125 mg/5 mL',
    dosageForm: 'Granules for oral suspension',
    route: 'Oral',
    packSize: 'Amber glass bottle for 70 mL or 100 mL oral suspension with dosing cup/syringe',
    indications:
      'Treatment of infections in children from the age of 3 months and adults: acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and early Lyme disease.',
    dose:
      'Children (<40 kg, from 3 months): 10 mg/kg twice daily up to a maximum of 125 mg twice daily (for acute tonsillitis, pharyngitis, sinusitis, and cystitis), or 15 mg/kg twice daily up to a maximum of 250 mg twice daily (for otitis media in children >=2 years or severe infections, pyelonephritis, skin/soft tissue infections, and Lyme disease). Take after food.',
    contraindications:
      'Hypersensitivity to cefuroxime or any excipient (contains aspartame and sucrose); known hypersensitivity to cephalosporins; history of severe hypersensitivity to any other beta-lactam antibacterial agent.',
    adverseEffects:
      'Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzymes.',
    storage: 'Dry granules: Do not store above 30°C. Reconstituted suspension: Store in a refrigerator (2°C–8°C) and discard after 10 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'Otolaryngology (ENT)'],
    sources: [
      {
        title: 'UK EMC — Zinnat 125 mg/5 ml Suspension SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5487/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Contains 125 mg cefuroxime (as cefuroxime axetil) per 5 mL reconstituted suspension. Generic name normalized to INN base (Cefuroxime).',
  },

  // 4. Zinacef (Cefuroxime parenteral — acquired by Sandoz from GSK in 2021)
  {
    brandName: 'Zinacef 750 mg',
    brandNameAr: 'زيناسيف 750 ملغ',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation parenteral cephalosporin antibacterial',
    strength: '750 mg',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous or intramuscular',
    packSize: '1 or 5 glass vials of powder for solution for injection/infusion',
    indications:
      'Treatment of infections in adults and children (including neonates from birth): community-acquired pneumonia, acute exacerbations of chronic bronchitis, complicated urinary tract infections (including pyelonephritis), soft-tissue infections (cellulitis, erysipelas, wound infections), intra-abdominal infections, and prophylaxis of infection for gastrointestinal (including oesophageal), orthopaedic, cardiovascular, and gynaecological surgery (including caesarean section).',
    dose:
      'Adults and adolescents (>=40 kg): 750 mg every 8 hours IV or IM for complicated UTIs, soft-tissue infections, and intra-abdominal infections; 1.5 g twice or three times daily IV for severe pneumonia or acute exacerbations of chronic bronchitis. Surgical prophylaxis: 1.5 g IV at induction of anaesthesia, supplemented by two 750 mg IM/IV doses after 8 and 16 hours if needed.',
    contraindications:
      'Hypersensitivity to cefuroxime or any excipient; known hypersensitivity to cephalosporin antibiotics; history of severe hypersensitivity (e.g. anaphylactic reaction) to any other beta-lactam antibacterial agent.',
    adverseEffects:
      'Neutropenia, eosinophilia, decreased haemoglobin concentration, transient rise in liver enzymes, injection site reactions (pain and thrombophlebitis), positive Coombs test, skin rash, pruritus, urticaria, gastrointestinal disturbance.',
    storage: 'Do not store above 25°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Infectious Diseases', 'Surgery', 'Internal Medicine', 'Pulmonology', 'Obstetrics & Gynecology', 'Pediatrics'],
    sources: [
      {
        title: 'UK EMC — Zinacef 750 mg Powder for Solution for Injection or Infusion SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5484/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Each vial contains 750 mg cefuroxime (as cefuroxime sodium). Generic name normalized to INN base (Cefuroxime).',
  },
  {
    brandName: 'Zinacef 1.5 g',
    brandNameAr: 'زيناسيف 1.5 غ',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation parenteral cephalosporin antibacterial',
    strength: '1.5 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous',
    packSize: '1 or 5 glass vials of powder for solution for injection/infusion',
    indications:
      'Treatment of severe bacterial infections (community-acquired pneumonia, acute exacerbations of chronic bronchitis, complicated UTIs, soft-tissue and intra-abdominal infections) and surgical prophylaxis in adults and children.',
    dose:
      'Adults and adolescents (>=40 kg): 1.5 g twice or three times daily by intravenous injection or infusion for severe infections; 1.5 g IV at induction of anaesthesia for surgical prophylaxis.',
    contraindications:
      'Hypersensitivity to cefuroxime or any excipient; known hypersensitivity to cephalosporin antibiotics; history of severe hypersensitivity reaction to any other beta-lactam antibacterial agent.',
    adverseEffects:
      'Neutropenia, eosinophilia, decreased haemoglobin concentration, transient rise in liver enzymes, injection site pain and thrombophlebitis, positive Coombs test, skin rash, gastrointestinal disturbance.',
    storage: 'Do not store above 25°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Infectious Diseases', 'Surgery', 'Internal Medicine', 'Pulmonology', 'Critical Care'],
    sources: [
      {
        title: 'UK EMC — Zinacef 1.5 g Powder for Solution for Injection or Infusion SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5485/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Each vial contains 1.5 g cefuroxime (as cefuroxime sodium). Generic name normalized to INN base (Cefuroxime).',
  },

  // 5. Fortum (Ceftazidime — acquired by Sandoz from GSK in 2021)
  {
    brandName: 'Fortum 1 g',
    brandNameAr: 'فورتوم 1 غ',
    genericName: 'Ceftazidime',
    activeIngredients: ['Ceftazidime'],
    drugClass: 'Third-generation antipseudomonal parenteral cephalosporin antibacterial',
    strength: '1 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous or intramuscular',
    packSize: '1 or 5 glass vials of powder for solution for injection/infusion',
    indications:
      'Treatment of severe infections in adults and children including neonates (from birth): nosocomial pneumonia, broncho-pulmonary infections in cystic fibrosis, bacterial meningitis, chronic suppurative otitis media, malignant otitis externa, complicated urinary tract infections, complicated skin and soft tissue infections, complicated intra-abdominal infections, bone and joint infections, peritonitis associated with dialysis in patients on CAPD, bacteraemia associated with any of the above, and management of neutropenic patients with fever suspected to be due to a bacterial infection.',
    dose:
      'Adults and children >=40 kg: 1 g to 2 g every 8 hours (or 2 g every 12 hours) by IV injection/infusion or deep IM injection depending on infection type and severity. Dose must be adjusted according to creatinine clearance in patients with renal impairment (CrCl <=50 mL/min).',
    contraindications:
      'Hypersensitivity to ceftazidime, any other cephalosporin, or any excipient; history of severe hypersensitivity (e.g. anaphylactic reaction) to any other type of beta-lactam antibacterial agent (penicillins, monobactams, and carbapenems).',
    adverseEffects:
      'Eosinophilia, thrombocytosis, phlebitis or thrombophlebitis with IV administration, diarrhoea, transient elevations in hepatic enzymes, maculopapular or urticarial rash, pain/inflammation after IM injection, positive Coombs test; neurotoxicity (myoclonia, convulsions, encephalopathy) if dose is not reduced in renal impairment.',
    storage: 'Store below 25°C. Keep vials in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Pulmonology', 'Hematology', 'Oncology', 'Pediatrics'],
    sources: [
      {
        title: 'UK EMC — Fortum 1 g Powder for Solution for Injection or Infusion SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5473/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Each vial contains 1 g ceftazidime (as pentahydrate) with sodium carbonate. Generic name normalized to INN base (Ceftazidime).',
  },
  {
    brandName: 'Fortum 2 g',
    brandNameAr: 'فورتوم 2 غ',
    genericName: 'Ceftazidime',
    activeIngredients: ['Ceftazidime'],
    drugClass: 'Third-generation antipseudomonal parenteral cephalosporin antibacterial',
    strength: '2 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous',
    packSize: '1 or 5 glass vials of powder for solution for injection/infusion',
    indications:
      'Treatment of severe infections in adults and children including neonates: nosocomial pneumonia, broncho-pulmonary infections in cystic fibrosis, bacterial meningitis, malignant otitis externa, complicated urinary tract, skin/soft tissue, intra-abdominal, and bone/joint infections, bacteraemia, and febrile neutropenia.',
    dose:
      'Adults and children >=40 kg: 2 g every 8 hours by IV injection or infusion (up to 9 g/day in cystic fibrosis or life-threatening infections; continuous infusion of 4–6 g every 24 hours after a 2 g loading dose may also be used). Adjust dose in renal impairment (CrCl <=50 mL/min).',
    contraindications:
      'Hypersensitivity to ceftazidime, any other cephalosporin, or any excipient; history of severe hypersensitivity reaction to any other beta-lactam antibacterial agent.',
    adverseEffects:
      'Eosinophilia, thrombocytosis, phlebitis or thrombophlebitis with IV administration, diarrhoea, transient elevations in hepatic enzymes, maculopapular or urticarial rash, positive Coombs test.',
    storage: 'Store below 25°C. Keep vials in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Pulmonology', 'Hematology', 'Oncology'],
    sources: [
      {
        title: 'UK EMC — Fortum 2 g Powder for Solution for Injection or Infusion SmPC (Sandoz Limited)',
        url: 'https://www.medicines.org.uk/emc/product/5474/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Marketing Authorisation Holder: Sandoz Limited). Each vial contains 2 g ceftazidime (as pentahydrate) with sodium carbonate. Generic name normalized to INN base (Ceftazidime).',
  },

  // 6. Zarzio (Filgrastim — Sandoz GmbH)
  {
    brandName: 'Zarzio 30 MU/0.5 mL',
    brandNameAr: 'زارزيو 30 مليون وحدة/0.5 مل',
    genericName: 'Filgrastim',
    activeIngredients: ['Filgrastim'],
    drugClass: 'Recombinant human granulocyte colony-stimulating factor (G-CSF)',
    strength: '30 MU/0.5 mL (300 mcg/0.5 mL)',
    dosageForm: 'Solution for injection or infusion in pre-filled syringe',
    route: 'Subcutaneous or intravenous infusion',
    packSize: 'Pack of 1 or 5 pre-filled syringes of 0.5 mL with needle guard',
    indications:
      'Reduction in the duration of neutropenia and the incidence of febrile neutropenia in patients treated with established cytotoxic chemotherapy for malignancy (with the exception of chronic myeloid leukaemia and myelodysplastic syndromes) and reduction in the duration of neutropenia in patients undergoing myeloablative therapy followed by bone marrow transplantation; mobilisation of peripheral blood progenitor cells (PBPC); severe congenital, cyclic, or idiopathic neutropenia with history of severe or recurrent infections; persistent neutropenia (ANC <=1.0 x 10^9/L) in patients with advanced HIV infection.',
    dose:
      'Established cytotoxic chemotherapy: 0.5 MU (5 mcg)/kg/day administered as a daily subcutaneous injection or daily 30-minute IV infusion, starting not less than 24 hours following cytotoxic chemotherapy and continuing until the expected neutrophil nadir is passed and neutrophil count recovers to normal range.',
    contraindications:
      'Hypersensitivity to filgrastim or to any of the excipients.',
    adverseEffects:
      'Thrombocytopenia, anaemia, splenomegaly, headache, diarrhoea, vomiting, nausea, alopecia, musculoskeletal pain (bone pain, arthralgia, myalgia), fatigue, mucosal inflammation, pyrexia, leukocytosis, splenic rupture (rare), acute respiratory distress syndrome (uncommon).',
    storage: 'Store in a refrigerator (2°C–8°C). Keep the pre-filled syringe in the outer carton to protect from light. May be exposed to room temperature (up to 25°C) for a single period up to 8 days.',
    specialties: ['Oncology', 'Hematology'],
    sources: [
      {
        title: 'EMA EPAR — Zarzio (filgrastim) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zarzio',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH). Each 0.5 mL pre-filled syringe contains 30 million units (MU) / 300 micrograms filgrastim (60 MU/mL).',
  },
  {
    brandName: 'Zarzio 48 MU/0.5 mL',
    brandNameAr: 'زارزيو 48 مليون وحدة/0.5 مل',
    genericName: 'Filgrastim',
    activeIngredients: ['Filgrastim'],
    drugClass: 'Recombinant human granulocyte colony-stimulating factor (G-CSF)',
    strength: '48 MU/0.5 mL (480 mcg/0.5 mL)',
    dosageForm: 'Solution for injection or infusion in pre-filled syringe',
    route: 'Subcutaneous or intravenous infusion',
    packSize: 'Pack of 1 or 5 pre-filled syringes of 0.5 mL with needle guard',
    indications:
      'Reduction in the duration of neutropenia and the incidence of febrile neutropenia in patients treated with established cytotoxic chemotherapy for malignancy and in patients undergoing myeloablative therapy followed by bone marrow transplantation; mobilisation of peripheral blood progenitor cells (PBPC); severe congenital, cyclic, or idiopathic neutropenia; persistent neutropenia in advanced HIV infection.',
    dose:
      'Cytotoxic chemotherapy: 0.5 MU (5 mcg)/kg/day subcutaneously or by 30-minute IV infusion starting >=24 hours after chemotherapy. PBPC mobilisation (monotherapy): 1.0 MU (10 mcg)/kg/day for 5–7 consecutive days.',
    contraindications:
      'Hypersensitivity to filgrastim or to any of the excipients.',
    adverseEffects:
      'Thrombocytopenia, anaemia, splenomegaly, headache, diarrhoea, vomiting, nausea, alopecia, musculoskeletal pain (bone pain, arthralgia, myalgia), fatigue, mucosal inflammation, pyrexia.',
    storage: 'Store in a refrigerator (2°C–8°C). Keep the pre-filled syringe in the outer carton to protect from light.',
    specialties: ['Oncology', 'Hematology'],
    sources: [
      {
        title: 'EMA EPAR — Zarzio (filgrastim) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zarzio',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH). Each 0.5 mL pre-filled syringe contains 48 million units (MU) / 480 micrograms filgrastim (96 MU/mL).',
  },

  // 7. Binocrit (Epoetin alfa — Sandoz GmbH)
  {
    brandName: 'Binocrit 4,000 IU/0.4 mL',
    brandNameAr: 'بينوكريت 4,000 وحدة دولية/0.4 مل',
    genericName: 'Epoetin alfa',
    activeIngredients: ['Epoetin alfa'],
    drugClass: 'Recombinant human erythropoietin (erythropoiesis-stimulating agent, ESA)',
    strength: '4,000 IU/0.4 mL (10,000 IU/mL)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous or intravenous',
    packSize: 'Pack of 1 or 6 pre-filled syringes of 0.4 mL with needle guard',
    indications:
      'Treatment of symptomatic anaemia associated with chronic renal failure (CRF) in adult and paediatric patients on haemodialysis and adult patients on peritoneal dialysis; treatment of severe anaemia of renal origin accompanied by clinical symptoms in adult patients with renal insufficiency not yet undergoing dialysis; treatment of anaemia and reduction of transfusion requirements in adult patients receiving chemotherapy for solid tumours, malignant lymphoma, or multiple myeloma; autologous predonation programme and major elective orthopaedic surgery.',
    dose:
      'Chronic renal failure (adults): Correction phase 50 IU/kg three times per week IV or SC, adjusted in steps of 25 IU/kg at 4-week intervals to achieve target haemoglobin of 10–12 g/dL (do not exceed 12 g/dL). Maintenance phase: 75–300 IU/kg/week.',
    contraindications:
      'Hypersensitivity to epoetin alfa or any excipient; patients who develop pure red cell aplasia (PRCA) following treatment with any erythropoietin; uncontrolled hypertension; patients who cannot receive adequate antithrombotic prophylaxis in surgical indications.',
    adverseEffects:
      'Diarrhoea, nausea, vomiting, pyrexia, headache, hypertension, thrombotic vascular events (deep vein thrombosis, pulmonary embolism, arteriovenous shunt thrombosis), rash, arthralgia, bone pain, influenza-like illness, pure red cell aplasia (very rare).',
    storage: 'Store and transport refrigerated (2°C–8°C). Do not freeze. Keep the pre-filled syringe in the outer carton to protect from light.',
    specialties: ['Nephrology', 'Hematology', 'Oncology'],
    sources: [
      {
        title: 'EMA EPAR — Binocrit (epoetin alfa) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/binocrit',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH).',
  },
  {
    brandName: 'Binocrit 40,000 IU/1 mL',
    brandNameAr: 'بينوكريت 40,000 وحدة دولية/1 مل',
    genericName: 'Epoetin alfa',
    activeIngredients: ['Epoetin alfa'],
    drugClass: 'Recombinant human erythropoietin (erythropoiesis-stimulating agent, ESA)',
    strength: '40,000 IU/1 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous or intravenous',
    packSize: 'Pack of 1, 4, or 6 pre-filled syringes of 1 mL with needle guard',
    indications:
      'Treatment of anaemia and reduction of transfusion requirements in adult patients receiving chemotherapy for solid tumours, malignant lymphoma, or multiple myeloma, and at risk of transfusion as assessed by the patient general status; adult patients with low- or intermediate-1-risk myelodysplastic syndromes (MDS) who have symptomatic anaemia (haemoglobin <=10 g/dL) and low serum erythropoietin (<200 mU/mL).',
    dose:
      'Chemotherapy-induced anaemia: Initial dose 150 IU/kg subcutaneously 3 times per week, or 450 IU/kg (approximately 40,000 IU) subcutaneously once weekly. Target haemoglobin concentration is 10–12 g/dL. Discontinue 4 weeks after the end of chemotherapy.',
    contraindications:
      'Hypersensitivity to epoetin alfa or any excipient; pure red cell aplasia (PRCA) following treatment with any erythropoietin; uncontrolled hypertension.',
    adverseEffects:
      'Nausea, vomiting, diarrhoea, pyrexia, headache, hypertension, venous and arterial thromboembolic events, arthralgia, bone pain, rash, influenza-like illness.',
    storage: 'Store and transport refrigerated (2°C–8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Oncology', 'Hematology'],
    sources: [
      {
        title: 'EMA EPAR — Binocrit (epoetin alfa) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/binocrit',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH).',
  },

  // 8. Omnitrope (Somatropin — Sandoz GmbH)
  {
    brandName: 'Omnitrope 10 mg/1.5 mL',
    brandNameAr: 'أومنيتروب 10 ملغ/1.5 مل',
    genericName: 'Somatropin',
    activeIngredients: ['Somatropin'],
    drugClass: 'Recombinant human growth hormone (rhGH)',
    strength: '10 mg/1.5 mL (6.7 mg/mL)',
    dosageForm: 'Solution for injection in cartridge',
    route: 'Subcutaneous',
    packSize: 'Pack of 1, 5, or 10 glass cartridges of 1.5 mL for use with SurePal 10 pen',
    indications:
      'Infants, children, and adolescents: Growth disturbance due to insufficient secretion of growth hormone (growth hormone deficiency, GHD), Turner syndrome, chronic renal insufficiency, short children/adolescents born small for gestational age (SGA), and Prader-Willi syndrome (PWS). Adults: Replacement therapy in adults with pronounced growth hormone deficiency (adult-onset or childhood-onset).',
    dose:
      'Administered subcutaneously in the evening, rotating injection sites to prevent lipoatrophy. Paediatric GHD: 0.025–0.035 mg/kg body weight/day. Turner syndrome and chronic renal insufficiency: 0.045–0.050 mg/kg/day. SGA: 0.035 mg/kg/day. Adult GHD: start with 0.15–0.3 mg/day and titrate gradually according to clinical response and serum IGF-I levels.',
    contraindications:
      'Hypersensitivity to somatropin or any excipient (contains benzyl alcohol: must not be given to premature babies or neonates); any evidence of activity of a tumour (intracranial tumours must be inactive and antitumour therapy completed prior to starting GH therapy); promotion of growth in children with closed epiphyses; acute critical illness suffering complications following open heart surgery, abdominal surgery, multiple accidental trauma, acute respiratory failure, or similar conditions.',
    adverseEffects:
      'Paediatric: injection site reactions, transient local skin reactions, arthralgia, myalgia, water retention/peripheral oedema, impaired glucose tolerance, benign intracranial hypertension (rare), slipped capital femoral epiphysis (rare). Adults: peripheral oedema, arthralgia, myalgia, paraesthesia, carpal tunnel syndrome, stiffness in extremities, hyperglycaemia.',
    storage: 'Store and transport refrigerated (2°C–8°C). Do not freeze. Store in the original package to protect from light. After first injection, keep cartridge in the pen in a refrigerator (2°C–8°C) and use within 28 days.',
    specialties: ['Pediatric Endocrinology', 'Endocrinology', 'Pediatrics'],
    sources: [
      {
        title: 'EMA EPAR — Omnitrope (somatropin) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/omnitrope',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH). Also available in 5 mg/1.5 mL and 15 mg/1.5 mL cartridges.',
  },

  // 9. Hyrimoz (Adalimumab — Sandoz GmbH)
  {
    brandName: 'Hyrimoz 40 mg',
    brandNameAr: 'هيريموز 40 ملغ',
    genericName: 'Adalimumab',
    activeIngredients: ['Adalimumab'],
    drugClass: 'Recombinant human monoclonal antibody tumour necrosis factor-alpha (TNF-alpha) inhibitor',
    strength: '40 mg/0.4 mL (citrate-free high-concentration) or 40 mg/0.8 mL',
    dosageForm: 'Solution for injection in pre-filled pen (SensoReady) or pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 2 pre-filled pens (SensoReady) or 2 pre-filled syringes',
    indications:
      'Treatment of rheumatoid arthritis, juvenile idiopathic arthritis, axial spondyloarthritis (ankylosing spondylitis and non-radiographic axial spondyloarthritis), psoriatic arthritis, psoriasis, paediatric plaque psoriasis, hidradenitis suppurativa, Crohn disease, paediatric Crohn disease, ulcerative colitis, paediatric ulcerative colitis, and non-infectious intermediate, posterior, and panuveitis.',
    dose:
      'Rheumatoid arthritis, psoriatic arthritis, and ankylosing spondylitis in adults: 40 mg administered every other week as a single dose via subcutaneous injection. Plaque psoriasis: initial dose of 80 mg SC, followed by 40 mg every other week starting one week after the initial dose. Crohn disease and ulcerative colitis: induction with 160 mg at Week 0 and 80 mg at Week 2, followed by 40 mg every other week.',
    contraindications:
      'Hypersensitivity to adalimumab or any excipient; active tuberculosis or other severe infections such as sepsis and opportunistic infections; moderate to severe heart failure (NYHA class III/IV).',
    adverseEffects:
      'Respiratory tract infections (upper and lower, pneumonia, sinusitis, pharyngitis, nasopharyngitis), leukopenia, anaemia, headache, abdominal pain, nausea, vomiting, elevated liver enzymes, rash, musculoskeletal pain, injection site reaction (erythema, itching, haemorrhage, pain, swelling).',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Keep in the outer carton to protect from light. May be stored at temperatures up to 25°C for a single period of up to 21 days (42 days for 40 mg/0.4 mL formulation).',
    specialties: ['Rheumatology', 'Gastroenterology', 'Dermatology', 'Ophthalmology'],
    sources: [
      {
        title: 'EMA EPAR — Hyrimoz (adalimumab) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/hyrimoz',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH).',
  },

  // 10. Rixathon (Rituximab — Sandoz GmbH)
  {
    brandName: 'Rixathon 500 mg/50 mL',
    brandNameAr: 'ريكساتون 500 ملغ/50 مل',
    genericName: 'Rituximab',
    activeIngredients: ['Rituximab'],
    drugClass: 'Chimeric murine/human anti-CD20 monoclonal antibody',
    strength: '500 mg/50 mL (10 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 glass vial of 50 mL concentrate for solution for infusion',
    indications:
      'Non-Hodgkin lymphoma (NHL: follicular lymphoma and CD20-positive diffuse large B-cell NHL); chronic lymphocytic leukaemia (CLL); severe active rheumatoid arthritis (in combination with methotrexate); granulomatosis with polyangiitis (GPA) and microscopic polyangiitis (MPA); moderate to severe pemphigus vulgaris.',
    dose:
      'Administered as an intravenous infusion after premedication (antipyretic, antihistamine, and glucocorticoid as indicated). NHL: 375 mg/m² BSA per cycle. CLL: 375 mg/m² on day 0 of cycle 1 followed by 500 mg/m² on day 1 of cycles 2–6. Rheumatoid arthritis: two 1,000 mg IV infusions given 2 weeks apart. Must not be administered as an IV push or bolus.',
    contraindications:
      'Hypersensitivity to rituximab, murine proteins, or any excipient; active severe infections; patients in a severely immunocompromised state; severe heart failure (NYHA class IV) or severe uncontrolled cardiac disease (in rheumatoid arthritis, GPA, MPA, and pemphigus vulgaris).',
    adverseEffects:
      'Infusion-related reactions, bacterial and viral infections (bronchitis, nasopharyngitis, pneumonia, herpes zoster, hepatitis B reactivation), neutropenia, leukopenia, febrile neutropenia, thrombocytopenia, angioedema, nausea, pruritus, rash, alopecia, fever, chills, asthenia, headache, decreased IgG/IgM levels, progressive multifocal leukoencephalopathy (very rare).',
    storage: 'Store in a refrigerator (2°C–8°C). Keep the container in the outer carton in order to protect from light.',
    specialties: ['Hematology', 'Oncology', 'Rheumatology', 'Dermatology'],
    sources: [
      {
        title: 'EMA EPAR — Rixathon (rituximab) Product Information (Sandoz GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rixathon',
      },
    ],
    notes:
      'Official EMA EPAR product information (Sandoz GmbH). Also available in 100 mg/10 mL vials.',
  },
];

export const SANDOZ_PRODUCTS: AiProductDraft[] = RAW_SANDOZ.map((d) => ({
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
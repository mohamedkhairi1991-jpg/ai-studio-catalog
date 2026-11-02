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

const RAW_EIPICO: CompactDrug[] = [
  // 1. Flumox (Amoxicillin + Flucloxacillin — EIPICO)
  {
    brandName: 'Flumox 500 mg',
    brandNameAr: 'فلوموكس 500 ملغ',
    genericName: 'Amoxicillin + Flucloxacillin',
    activeIngredients: ['Amoxicillin', 'Flucloxacillin'],
    drugClass: 'Broad-spectrum aminopenicillin and penicillinase-resistant isoxazolyl penicillin combination',
    strength: '250 mg/250 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 16 hard capsules in blisters',
    indications:
      'Treatment of mixed Gram-positive (including beta-lactamase-producing staphylococci) and Gram-negative bacterial infections: skin and soft tissue infections (boils, carbuncles, abscesses, cellulitis, infected wounds, impetigo), respiratory tract infections (tonsillitis, pharyngitis, sinusitis, otitis media, bronchitis, pneumonia), bone and joint infections, and urinary tract infections.',
    dose:
      'Adults and adolescents: One 500 mg (250 mg/250 mg) capsule every 6 to 8 hours (or two 500 mg capsules every 8 hours in severe infections), taken 30 to 60 minutes before food.',
    contraindications:
      'Hypersensitivity to amoxicillin, flucloxacillin, any penicillin, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of flucloxacillin-associated jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, abdominal discomfort, skin rash. Rare/Very rare: urticaria, pruritus, cholestatic hepatitis/jaundice (may be delayed up to several weeks after stopping flucloxacillin), antibiotic-associated colitis, high-anion-gap metabolic acidosis (when flucloxacillin is co-administered with paracetamol in high-risk patients).',
    storage:
      'Store below 25°C in a dry place.',
    specialties: ['Infectious Diseases', 'Dermatology', 'General Surgery', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'EIPICO (Egyptian International Pharmaceutical Industries Co.) — Anti-Infectives Portfolio (Flumox)',
        url: 'https://www.eipico.com.eg/',
      },
    ],
    notes:
      'Official EIPICO (10th of Ramadan City, Egypt) SmPC data. Each 500 mg hard capsule contains amoxicillin trihydrate equivalent to 250 mg amoxicillin and flucloxacillin sodium equivalent to 250 mg flucloxacillin (INN bases: Amoxicillin + Flucloxacillin).',
  },

  // 2. Epicephin (Ceftriaxone — EIPICO)
  {
    brandName: 'Epicephin 1 g',
    brandNameAr: 'إيبيسيفين 1 غ',
    genericName: 'Ceftriaxone',
    activeIngredients: ['Ceftriaxone'],
    drugClass: 'Third-generation parenteral cephalosporin beta-lactam antibacterial',
    strength: '1 g',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous or Intramuscular',
    packSize: '1 vial of 1 g powder with solvent ampoule',
    indications:
      'Treatment of severe bacterial infections in adults and children including neonates: bacterial meningitis, community-acquired and hospital-acquired pneumonia, acute otitis media, intra-abdominal infections, complicated urinary tract infections (including pyelonephritis), infections of bones and joints, complicated skin and soft tissue infections, gonorrhoea, syphilis, bacterial endocarditis, Lyme borreliosis, febrile neutropenia, and pre-operative prophylaxis of surgical site infections.',
    dose:
      'Adults and children over 12 years (>= 50 kg): 1 g to 2 g once daily (every 24 hours), increased to 4 g once daily (or 2 g every 12 hours) in severe infections or bacterial meningitis. Administer by deep intramuscular injection (with lidocaine solvent for IM use ONLY — never administer lidocaine solutions intravenously) or by slow IV injection/infusion.',
    contraindications:
      'Hypersensitivity to ceftriaxone, any other cephalosporin, or excipients; history of severe hypersensitivity to any other beta-lactam antibacterial; premature neonates up to a postmenstrual age of 41 weeks; full-term neonates (up to 28 days of age) with hyperbilirubinaemia, jaundice, hypoalbuminaemia, or acidosis, or if they require (or are expected to require) intravenous calcium treatment due to risk of fatal ceftriaxone-calcium salt precipitation.',
    adverseEffects:
      'Common: eosinophilia, leukopenia, thrombocytopenia, diarrhoea, loose stools, elevated hepatic enzymes, rash. Uncommon: genital fungal infection, granulocytopenia, anaemia, coagulopathy, headache, dizziness, nausea, vomiting, pruritus, phlebitis, injection site pain, pyrexia, increased blood creatinine, biliary pseudolithiasis / gallbladder sludge.',
    storage:
      'Store below 30°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pediatrics', 'General Surgery', 'Critical Care'],
    sources: [
      {
        title: 'EIPICO (Egyptian International Pharmaceutical Industries Co.) — Cephalosporin Portfolio (Epicephin / Ceftriaxone)',
        url: 'https://www.eipico.com.eg/',
      },
    ],
    notes:
      'Official EIPICO SmPC data. Each vial contains ceftriaxone sodium equivalent to 1 g ceftriaxone (INN base: Ceftriaxone). Also available in 500 mg and 2 g vials.',
  },

  // 3. Cefotax (Cefotaxime — EIPICO)
  {
    brandName: 'Cefotax 1 g',
    brandNameAr: 'سيفوتاكس 1 غ',
    genericName: 'Cefotaxime',
    activeIngredients: ['Cefotaxime'],
    drugClass: 'Third-generation parenteral cephalosporin beta-lactam antibacterial',
    strength: '1 g',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous or Intramuscular',
    packSize: '1 vial of 1 g powder with solvent ampoule',
    indications:
      'Treatment of severe infections caused by cefotaxime-susceptible bacteria: lower respiratory tract infections (pneumonia), complicated urinary tract infections, septicaemia and bacteraemia, bacterial endocarditis, bacterial meningitis, intra-abdominal infections (peritonitis), skin and soft tissue infections, bone and joint infections, and gonorrhoea.',
    dose:
      'Adults and adolescents: Uncomplicated infections: 1 g every 12 hours IM or IV (2 g/day). Moderate to severe infections: 1 g to 2 g every 8 hours (3 g to 6 g/day). Life-threatening infections / bacterial meningitis: up to 2 g every 6 to 8 hours IV (up to 12 g/day).',
    contraindications:
      'Hypersensitivity to cefotaxime, other cephalosporins, or excipients; history of severe immediate hypersensitivity reaction to penicillins or other beta-lactam antibiotics. Formulations reconstituted with lidocaine must never be administered intravenously or in infants under 30 months of age.',
    adverseEffects:
      'Common: pain and induration at IM injection site, phlebitis/thrombophlebitis after IV administration, transient elevation of serum transaminases (ALT, AST, ALP), rash, pruritus, urticaria, diarrhoea, nausea, vomiting, reversible neutropenia or eosinophilia.',
    storage:
      'Store below 25°C, protected from light.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Internal Medicine', 'Pediatrics', 'General Surgery'],
    sources: [
      {
        title: 'EIPICO (Egyptian International Pharmaceutical Industries Co.) — Cephalosporin Portfolio (Cefotax / Cefotaxime)',
        url: 'https://www.eipico.com.eg/',
      },
    ],
    notes:
      'Official EIPICO SmPC data. Each vial contains cefotaxime sodium equivalent to 1 g cefotaxime (INN base: Cefotaxime). Also available in 500 mg and 2 g vials.',
  },

  // 4. Epirazole (Omeprazole — EIPICO)
  {
    brandName: 'Epirazole 20 mg',
    brandNameAr: 'إيبيرازول 20 ملغ',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 gastro-resistant hard capsules',
    indications:
      'Treatment and prevention of relapse of duodenal ulcers and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease in combination with appropriate antibiotics; treatment and prophylaxis of NSAID-associated gastric and duodenal ulcers; treatment and maintenance of reflux oesophagitis; symptomatic gastro-oesophageal reflux disease; and Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 20 mg once daily for 2–4 weeks. Gastric ulcer and reflux oesophagitis: 20 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics. NSAID ulcer prophylaxis: 20 mg once daily. Swallow whole in the morning before food.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps.',
    storage:
      'Store below 25°C in a dry place, protected from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'EIPICO (Egyptian International Pharmaceutical Industries Co.) — Gastrointestinal Portfolio (Epirazole / Omeprazole)',
        url: 'https://www.eipico.com.eg/',
      },
    ],
    notes:
      'Official EIPICO SmPC data. Each gastro-resistant hard capsule contains 20 mg omeprazole.',
  },

  // 5. Epigent (Gentamicin — EIPICO)
  {
    brandName: 'Epigent 80 mg/2 mL',
    brandNameAr: 'إيبيجنت 80 ملغ/2 مل',
    genericName: 'Gentamicin',
    activeIngredients: ['Gentamicin'],
    drugClass: 'Aminoglycoside parenteral bactericidal antibacterial',
    strength: '80 mg/2 mL (40 mg/mL)',
    dosageForm: 'Solution for injection or infusion',
    route: 'Intramuscular or Intravenous',
    packSize: 'Pack of 3 or 6 ampoules of 2 mL',
    indications:
      'Treatment of severe systemic infections caused by susceptible Gram-negative bacteria and staphylococci: complicated urinary tract infections and acute pyelonephritis, hospital-acquired pneumonia, infective endocarditis (in combination with a beta-lactam or glycopeptide), intra-abdominal infections (peritonitis), septicaemia/bacteraemia, skin and soft tissue infections (including severe burns), and surgical infection prophylaxis.',
    dose:
      'Adults with normal renal function: 3 to 5 mg/kg/day administered either as a single daily dose (5 to 7 mg/kg once every 24 hours in critically ill patients without endocarditis/pregnancy/burns) or divided into 3 equal doses every 8 hours. Monitor renal function (serum creatinine) and trough/peak serum gentamicin concentrations.',
    contraindications:
      'Hypersensitivity to gentamicin, any other aminoglycoside, or excipients (including sodium metabisulfite); myasthenia gravis.',
    adverseEffects:
      'Nephrotoxicity (reversible elevation of serum creatinine and BUN, oliguria, proteinuria, acute tubular necrosis) and eighth cranial nerve ototoxicity (vestibular damage: dizziness, vertigo, ataxia, tinnitus; cochlear damage: high-frequency hearing loss and deafness). Rare: neuromuscular blockade, peripheral neuropathy, hypomagnesaemia, hypocalcaemia, hypokalaemia.',
    storage:
      'Store below 25°C. Do not freeze.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Internal Medicine', 'General Surgery', 'Urology'],
    sources: [
      {
        title: 'EIPICO (Egyptian International Pharmaceutical Industries Co.) — Parenteral Antibiotics Portfolio (Epigent / Gentamicin)',
        url: 'https://www.eipico.com.eg/',
      },
    ],
    notes:
      'Official EIPICO SmPC data. Each 2 mL ampoule contains gentamicin sulfate equivalent to 80 mg gentamicin base (40 mg/mL; INN base: Gentamicin).',
  },
];

export const EIPICO_PRODUCTS: AiProductDraft[] = RAW_EIPICO.map((d) => ({
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
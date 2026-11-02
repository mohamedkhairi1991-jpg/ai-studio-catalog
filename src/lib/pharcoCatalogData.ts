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

const RAW_PHARCO: CompactDrug[] = [
  // 1. Amrizole (Metronidazole — Pharco)
  {
    brandName: 'Amrizole 500 mg',
    brandNameAr: 'أمريزول 500 ملغ',
    genericName: 'Metronidazole',
    activeIngredients: ['Metronidazole'],
    drugClass: 'Nitroimidazole derivative antibacterial and antiprotozoal (ATC P01AB01 / J01XD01)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Treatment of infections caused by susceptible anaerobic bacteria (including Bacteroides, Clostridium, Peptostreptococcus, and Fusobacterium species), acute intestinal and hepatic amoebiasis (Entamoeba histolytica), giardiasis (Giardia lamblia), urogenital trichomoniasis (Trichomonas vaginalis), bacterial vaginosis, acute ulcerative gingivitis, and Helicobacter pylori eradication regimens.',
    dose:
      'Adults: Anaerobic infections: 500 mg orally three times daily for 7 days. Amoebiasis: 500–750 mg three times daily for 5–10 days. Trichomoniasis or bacterial vaginosis: 500 mg twice daily for 7 days or 2 g as a single oral dose. Swallow tablets whole with water during or after meals.',
    contraindications:
      'Known hypersensitivity to metronidazole, other nitroimidazole derivatives, or any excipient. Abstain from alcohol during therapy and for at least 48 hours afterwards due to risk of disulfiram-like reaction.',
    adverseEffects:
      'Metallic taste, nausea, vomiting, epigastric distress, furry tongue, stomatitis, anorexia, dark coloration of urine. Uncommon/Rare: peripheral sensory neuropathy (with prolonged therapy), dizziness, ataxia, leukopenia, skin rash, pruritus, hepatotoxicity.',
    storage:
      'Store below 30°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Gastroenterology', 'Obstetrics & Gynecology', 'Internal Medicine'],
    sources: [
      {
        title: 'Pharco Pharmaceuticals — Therapies & Products Portfolio (Amrizole / Metronidazole 500 mg)',
        url: 'https://pharco.org/therapies-and-products',
      },
    ],
    notes:
      'Official Pharco Pharmaceuticals SmPC data. Each film-coated tablet contains 500 mg metronidazole (INN base: Metronidazole).',
  },

  // 2. Cefaxone (Ceftriaxone — Pharco)
  {
    brandName: 'Cefaxone 1 g',
    brandNameAr: 'سيفاكسون 1 غ',
    genericName: 'Ceftriaxone',
    activeIngredients: ['Ceftriaxone'],
    drugClass: 'Third-generation parenteral cephalosporin antibacterial (ATC J01DD04)',
    strength: '1 g',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intramuscular / Intravenous',
    packSize: '1 glass vial of powder + 1 ampoule of solvent',
    indications:
      'Treatment of severe bacterial infections caused by ceftriaxone-susceptible pathogens, including bacterial meningitis, community-acquired and hospital-acquired pneumonia, complicated urinary tract infections (including pyelonephritis), intra-abdominal infections, complicated skin and soft tissue infections, bone and joint infections, gonorrhoea, and surgical site infection prophylaxis.',
    dose:
      'Adults and children over 12 years (≥50 kg): 1–2 g once daily (up to 4 g daily in severe infections such as bacterial meningitis). Administer by deep intramuscular injection or slow intravenous injection/infusion. Intramuscular preparations reconstituted with lidocaine must NEVER be administered intravenously.',
    contraindications:
      'Hypersensitivity to ceftriaxone, any other cephalosporin, or severe immediate hypersensitivity to any beta-lactam antibiotic. Premature neonates up to postmenstrual age of 41 weeks. Full-term neonates (up to 28 days) with hyperbilirubinaemia, jaundice, or requiring intravenous calcium-containing solutions.',
    adverseEffects:
      'Eosinophilia, leukopenia, thrombocytopenia, diarrhoea, loose stools, elevated hepatic transaminases, rash, injection site pain/induration. Uncommon/Rare: Clostridioides difficile colitis, biliary sludge/pseudolithiasis, nephrolithiasis, anaphylaxis.',
    storage:
      'Store below 30°C protected from light. Use reconstituted solution immediately.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pediatrics', 'General Surgery', 'Emergency Medicine'],
    sources: [
      {
        title: 'Pharco Pharmaceuticals — Therapies & Products Portfolio (Cefaxone / Ceftriaxone 1 g)',
        url: 'https://pharco.org/therapies-and-products',
      },
    ],
    notes:
      'Official Pharco Pharmaceuticals SmPC data. Each vial contains ceftriaxone sodium equivalent to 1 g ceftriaxone base (INN base: Ceftriaxone).',
  },

  // 3. Ciprofar (Ciprofloxacin — Pharco)
  {
    brandName: 'Ciprofar 500 mg',
    brandNameAr: 'سيبروفار 500 ملغ',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Second-generation fluoroquinolone antibacterial (ATC J01MA02)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blisters',
    indications:
      'Treatment of complicated urinary tract infections and acute pyelonephritis, chronic bacterial prostatitis, gonococcal urethritis and cervicitis, lower respiratory tract infections due to Gram-negative bacteria, infectious diarrhoea, typhoid fever, intra-abdominal infections, and bone and joint infections.',
    dose:
      'Adults: 500 mg orally twice daily (every 12 hours) for 7 to 14 days depending on infection severity and site (up to 750 mg twice daily in severe bone/joint or Pseudomonas infections). Swallow whole with liquid; separate by at least 2 hours from dairy products, antacids, or mineral supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin or other quinolones; concomitant administration with tizanidine.',
    adverseEffects:
      'Nausea, diarrhoea, vomiting, abdominal pain, dyspepsia, headache, dizziness, rash, elevated transaminases, arthralgia. Rare: tendinitis and tendon rupture, QT interval prolongation, peripheral neuropathy, photosensitivity, Clostridioides difficile colitis.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine', 'Pulmonology'],
    sources: [
      {
        title: 'Pharco Pharmaceuticals — Therapies & Products Portfolio (Ciprofar / Ciprofloxacin 500 mg)',
        url: 'https://pharco.org/therapies-and-products',
      },
    ],
    notes:
      'Official Pharco Pharmaceuticals SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 500 mg ciprofloxacin base (INN base: Ciprofloxacin).',
  },

  // 4. Farcolin (Salbutamol — Pharco)
  {
    brandName: 'Farcolin 5 mg/mL',
    brandNameAr: 'فاركولين 5 ملغ/مل',
    genericName: 'Salbutamol',
    activeIngredients: ['Salbutamol'],
    drugClass: 'Selective short-acting beta-2 adrenergic agonist bronchodilator (ATC R03AC02)',
    strength: '5 mg/mL',
    dosageForm: 'Nebuliser solution',
    route: 'Inhalation',
    packSize: 'Bottle of 20 mL respirator solution (0.5% w/v)',
    indications:
      'Relief of severe acute bronchospasm in bronchial asthma and chronic obstructive pulmonary disease (COPD), and management of chronic bronchospasm unresponsive to conventional bronchodilator therapy.',
    dose:
      'Intermittent administration via nebuliser: Adults: 0.5 mL to 1.0 mL (2.5 mg to 5 mg salbutamol) diluted to a final volume of 2.0 to 2.5 mL with sterile normal saline, inhaled over 10 minutes up to four times daily. Children under 12 years: 0.5 mL (2.5 mg) diluted to 2.0–2.5 mL with sterile normal saline. For inhalation only; do not inject or swallow.',
    contraindications:
      'Hypersensitivity to salbutamol or any excipient. Non-intravenous formulations of salbutamol must not be used to arrest uncomplicated premature labour or threatened abortion.',
    adverseEffects:
      'Fine tremor of skeletal muscle (particularly hands), headache, tachycardia, palpitations, muscle cramps, mouth and throat irritation. Rare: hypokalaemia, peripheral vasodilatation, paradoxical bronchospasm, arrhythmias, lactic acidosis.',
    storage:
      'Store below 30°C protected from light. Discard 1 month after first opening.',
    specialties: ['Pulmonology', 'Emergency Medicine', 'Pediatrics', 'Internal Medicine'],
    sources: [
      {
        title: 'Pharco Pharmaceuticals — Therapies & Products Portfolio (Farcolin / Salbutamol 5 mg/mL)',
        url: 'https://pharco.org/therapies-and-products',
      },
    ],
    notes:
      'Official Pharco Pharmaceuticals SmPC data. Respirator solution containing salbutamol sulfate equivalent to 5 mg/mL (0.5% w/v) salbutamol base (INN base: Salbutamol).',
  },

  // 5. Gratisovir (Sofosbuvir — Pharco)
  {
    brandName: 'Gratisovir 400 mg',
    brandNameAr: 'غراتيسوفير 400 ملغ',
    genericName: 'Sofosbuvir',
    activeIngredients: ['Sofosbuvir'],
    drugClass: 'Direct-acting antiviral nucleotide analogue HCV NS5B polymerase inhibitor (ATC J05AP08)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Bottle of 28 film-coated tablets',
    indications:
      'Indicated in combination with other antiviral medicinal products (such as daclatasvir, velpatasvir, ledipasvir, or ribavirin) for the treatment of chronic hepatitis C virus (CHC) infection in adults and adolescents.',
    dose:
      'One 400 mg film-coated tablet taken orally once daily with food, in combination with other direct-acting antivirals or ribavirin. Monotherapy is not recommended. Swallow the tablet whole; do not chew or crush.',
    contraindications:
      'Hypersensitivity to sofosbuvir or any excipient. Co-administration with potent P-gp and CYP inducers (rifampicin, rifabutin, St. John’s wort [Hypericum perforatum], carbamazepine, phenytoin, phenobarbital, oxcarbazepine) due to significantly decreased sofosbuvir plasma concentration.',
    adverseEffects:
      'When administered in combination regimens: fatigue, headache, nausea, insomnia, irritability, anaemia and hyperbilirubinaemia (when combined with ribavirin). Severe symptomatic bradycardia if co-administered with amiodarone; risk of hepatitis B virus (HBV) reactivation in HCV/HBV co-infected patients.',
    storage:
      'Store below 30°C in the original container to protect from moisture.',
    specialties: ['Gastroenterology', 'Hepatology', 'Infectious Diseases', 'Internal Medicine'],
    sources: [
      {
        title: 'Pharco Pharmaceuticals — Therapies & Products Portfolio (Gratisovir / Sofosbuvir 400 mg)',
        url: 'https://pharco.org/therapies-and-products',
      },
    ],
    notes:
      'Official Pharco Pharmaceuticals SmPC data. Each film-coated tablet contains 400 mg sofosbuvir (INN base: Sofosbuvir).',
  },
];

export const PHARCO_PRODUCTS: AiProductDraft[] = RAW_PHARCO.map((d) => ({
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

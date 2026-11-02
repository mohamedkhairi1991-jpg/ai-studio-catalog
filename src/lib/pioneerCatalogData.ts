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

const RAW_PIONEER: CompactDrug[] = [
  // 1. Piocefix 400 mg (Cefixime — Pioneer)
  {
    brandName: 'Piocefix 400 mg',
    brandNameAr: 'بيوسيفيكس 400 ملغ',
    genericName: 'Cefixime',
    activeIngredients: ['Cefixime'],
    drugClass: 'Third-generation oral cephalosporin antibacterial (ATC J01DD08)',
    strength: '400 mg',
    dosageForm: 'Capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 6 or 10 hard capsules in blisters',
    indications:
      'Treatment of acute infections caused by cefixime-susceptible organisms: acute exacerbations of chronic bronchitis, community-acquired pneumonia, acute otitis media, acute sinusitis, pharyngitis and tonsillitis, uncomplicated lower urinary tract infections (cystitis), and uncomplicated acute pyelonephritis.',
    dose:
      'Adults and adolescents over 12 years: 400 mg orally once daily as a single dose, or 200 mg twice daily (every 12 hours), for 7 to 14 days depending on severity of infection. May be taken with or without food.',
    contraindications:
      'Hypersensitivity to cefixime, other cephalosporin antibiotics, or any excipient; previous immediate and/or severe hypersensitivity reaction to penicillin or any beta-lactam antibiotic.',
    adverseEffects:
      'Diarrhoea, soft stools, abdominal pain, dyspepsia, nausea, vomiting, flatulence, headache, dizziness, transient elevation of hepatic enzymes, skin rash, pruritus. Rare: Clostridioides difficile-associated pseudomembranous colitis, severe cutaneous adverse reactions, anaphylaxis.',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Pulmonology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sources: [
      {
        title: 'Pioneer Co. for Pharmaceutical Industries — Cephalosporin Antibiotics Portfolio (Piocefix 400 mg Capsules)',
        url: 'https://pioneerpharmaceutical.com/cephalosporin-antibiotics/',
      },
    ],
    notes:
      'Official Pioneer Co. for Pharmaceutical Industries (Sulaymaniyah, Iraq) portfolio data. Each hard capsule contains cefixime trihydrate equivalent to 400 mg anhydrous cefixime (INN base: Cefixime).',
  },

  // 2. Piolexine 500 mg (Cefalexin — Pioneer)
  {
    brandName: 'Piolexine 500 mg',
    brandNameAr: 'بيوليكسين 500 ملغ',
    genericName: 'Cefalexin',
    activeIngredients: ['Cefalexin'],
    drugClass: 'First-generation oral cephalosporin antibacterial (ATC J01DB01)',
    strength: '500 mg',
    dosageForm: 'Capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 20 hard capsules in blisters',
    indications:
      'Treatment of infections due to susceptible Gram-positive and Gram-negative bacteria: respiratory tract infections, otitis media, skin and soft tissue infections, bone and joint infections, genito-urinary tract infections (including acute prostatitis), and dental infections.',
    dose:
      'Adults: 1–4 g daily in divided doses; most infections respond to 500 mg orally every 8 hours. For skin and soft tissue infections, streptococcal pharyngitis, and mild uncomplicated urinary tract infections, 500 mg every 12 hours may be administered.',
    contraindications:
      'Hypersensitivity to cefalexin, other cephalosporins, or any excipient; severe immediate hypersensitivity to penicillins or other beta-lactam antibiotics.',
    adverseEffects:
      'Nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, candidiasis (genital and oral), eosinophilia, rash, urticaria, pruritus, reversible elevation of AST/ALT. Rare: pseudomembranous colitis, interstitial nephritis.',
    storage:
      'Store below 25°C in a dry place protected from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Dermatology', 'Urology', 'General Practice'],
    sources: [
      {
        title: 'Pioneer Co. for Pharmaceutical Industries — Cephalosporin Antibiotics Portfolio (Piolexine 500 mg Capsules)',
        url: 'https://pioneerpharmaceutical.com/cephalosporin-antibiotics/',
      },
    ],
    notes:
      'Official Pioneer Co. for Pharmaceutical Industries (Sulaymaniyah, Iraq) portfolio data. Each hard capsule contains cefalexin monohydrate equivalent to 500 mg anhydrous cefalexin (INN base: Cefalexin).',
  },

  // 3. Zinax 500 mg (Cefuroxime — Pioneer)
  {
    brandName: 'Zinax 500 mg',
    brandNameAr: 'زيناكس 500 ملغ',
    genericName: 'Cefuroxime',
    activeIngredients: ['Cefuroxime'],
    drugClass: 'Second-generation oral cephalosporin antibacterial (ATC J01DC02)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Treatment of acute streptococcal tonsillitis and pharyngitis, acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, cystitis, pyelonephritis, uncomplicated skin and soft tissue infections, and early Lyme disease.',
    dose:
      'Adults and children ≥40 kg: 250 mg to 500 mg orally twice daily (every 12 hours) for 5–10 days depending on indication (500 mg twice daily for acute otitis media, severe lower respiratory tract infections, and Lyme disease). Take after food for optimum absorption.',
    contraindications:
      'Hypersensitivity to cefuroxime, any other cephalosporin, or any excipient; history of severe hypersensitivity to any other type of beta-lactam antibacterial agent.',
    adverseEffects:
      'Candida overgrowth, eosinophilia, headache, dizziness, diarrhoea, nausea, abdominal pain, transient increases in hepatic enzyme levels. Uncommon: vomiting, skin rashes, leukopenia, thrombocytopenia, pseudomembranous colitis.',
    storage:
      'Store below 30°C in the original blister package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'Pioneer Co. for Pharmaceutical Industries — Cephalosporin Antibiotics Portfolio (Zinax 500 mg Tablets)',
        url: 'https://pioneerpharmaceutical.com/cephalosporin-antibiotics/',
      },
    ],
    notes:
      'Official Pioneer Co. for Pharmaceutical Industries (Sulaymaniyah, Iraq) portfolio data. Each film-coated tablet contains cefuroxime axetil equivalent to 500 mg cefuroxime base (INN base: Cefuroxime).',
  },

  // 4. Omnimax 0.4 mg (Tamsulosin — Pioneer)
  {
    brandName: 'Omnimax 0.4 mg',
    brandNameAr: 'أومنيماكس 0.4 ملغ',
    genericName: 'Tamsulosin',
    activeIngredients: ['Tamsulosin'],
    drugClass: 'Selective alpha-1A/1D adrenoceptor antagonist for benign prostatic hyperplasia (ATC G04CA02)',
    strength: '0.4 mg',
    dosageForm: 'Modified-release capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 30 modified-release capsules in blisters',
    indications:
      'Treatment of functional lower urinary tract symptoms (LUTS) associated with benign prostatic hyperplasia (BPH) in men.',
    dose:
      'Adult men: One 0.4 mg capsule once daily, taken after breakfast or the first meal of the day. Swallow whole with a glass of water while standing or sitting; do not crunch or chew.',
    contraindications:
      'Hypersensitivity to tamsulosin, including drug-induced angioedema, or to any excipient; history of orthostatic hypotension; severe hepatic insufficiency.',
    adverseEffects:
      'Dizziness, ejaculation disorders (including retrograde ejaculation and ejaculation failure). Uncommon: headache, palpitations, orthostatic hypotension, rhinitis, constipation, diarrhoea, nausea, vomiting, rash, pruritus, asthenia; intraoperative floppy iris syndrome (IFIS) during cataract surgery.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'Pioneer Co. for Pharmaceutical Industries — Official Product Portfolio (Omnimax 0.4 mg Capsules)',
        url: 'https://pioneerpharmaceutical.com',
      },
    ],
    notes:
      'Official Pioneer Co. for Pharmaceutical Industries (Sulaymaniyah, Iraq) portfolio data. Each modified-release capsule contains 0.4 mg tamsulosin hydrochloride equivalent to 0.367 mg tamsulosin base (INN base: Tamsulosin).',
  },
];

export const PIONEER_PRODUCTS: AiProductDraft[] = RAW_PIONEER.map((d) => ({
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

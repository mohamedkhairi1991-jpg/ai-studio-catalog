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

const RAW_DEVA_HOLDING: CompactDrug[] = [
  // 1. Amoklavin BID 1000 mg (Amoxicillin + Clavulanic acid — Deva Holding)
  {
    brandName: 'Amoklavin BID 1000 mg',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin antibacterial plus beta-lactamase inhibitor combination (ATC J01CR02)',
    strength: '875 mg / 125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 14 film-coated tablets in blisters',
    indications:
      'Treatment of bacterial infections in adults and children caused by beta-lactamase-producing and susceptible organisms: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children ≥40 kg: One 875 mg/125 mg (1000 mg) tablet twice daily (every 12 hours), or three times daily for severe infections such as otitis media, sinusitis, and lower respiratory tract infections. Administer at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or any excipient; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    adverseEffects:
      'Mucocutaneous candidiasis, diarrhoea, nausea, vomiting. Uncommon/Rare: dizziness, headache, indigestion, elevated hepatic transaminases, skin rash, pruritus, urticaria, antibiotic-associated colitis, cholestatic jaundice.',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'ENT (Otolaryngology)', 'Pulmonology', 'General Practice'],
    sources: [
      {
        title: 'Deva Holding A.Ş. — Official Product Portfolio & KÜB (Amoklavin BID 1000 mg Film Tablet)',
        url: 'https://www.deva.com.tr',
      },
    ],
    notes:
      'Official Deva Holding KÜB (SmPC) data. Each film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN base: Amoxicillin + Clavulanic acid).',
  },

  // 2. Azitro 500 mg (Azithromycin — Deva Holding)
  {
    brandName: 'Azitro 500 mg',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) systemic antibacterial (ATC J01FA10)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Treatment of infections caused by azithromycin-susceptible organisms: acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, uncomplicated skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents ≥45 kg: Total dose of 1500 mg administered as 500 mg once daily for 3 consecutive days. For uncomplicated Chlamydia trachomatis genital infections: 1000 mg (two 500 mg tablets) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or any excipient.',
    adverseEffects:
      'Diarrhoea, abdominal pain, nausea, flatulence, vomiting, dyspepsia, headache, dizziness, paraesthesia, dysgeusia, transient lymphopenia or eosinophilia. Rare: QT interval prolongation, hepatic dysfunction/cholestatic jaundice, Clostridioides difficile colitis.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Deva Holding A.Ş. — Official Product Portfolio & KÜB (Azitro 500 mg Film Tablet)',
        url: 'https://www.deva.com.tr',
      },
    ],
    notes:
      'Official Deva Holding KÜB (SmPC) data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin base (INN base: Azithromycin).',
  },

  // 3. Candexil 16 mg (Candesartan — Deva Holding)
  {
    brandName: 'Candexil 16 mg',
    genericName: 'Candesartan',
    activeIngredients: ['Candesartan'],
    drugClass: 'Angiotensin II receptor antagonist (ARB) antihypertensive (ATC C09CA06)',
    strength: '16 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents aged 6 to <18 years; treatment of adult patients with heart failure and impaired left ventricular systolic function (left ventricular ejection fraction ≤40%) when ACE inhibitors are not tolerated or as add-on therapy to ACE inhibitors.',
    dose:
      'Hypertension in adults: Recommended initial and usual maintenance dose is 8 mg once daily; may be increased to 16 mg once daily (up to maximum 32 mg once daily) according to blood pressure response. Heart failure: Initiate at 4 mg once daily, doubling at intervals of at least 2 weeks up to target 32 mg once daily.',
    contraindications:
      'Hypersensitivity to candesartan or any excipient; second and third trimesters of pregnancy; severe hepatic impairment and/or cholestasis; children aged under 1 year; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR <60 mL/min/1.73 m²).',
    adverseEffects:
      'Dizziness/vertigo, headache, respiratory infection, hypotension, hyperkalaemia, renal impairment (increased creatinine/urea). Rare: angioedema, leukopenia, neutropenia, agranulocytosis, hyponatraemia, elevated hepatic enzymes.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Deva Holding A.Ş. — Official Product Portfolio & KÜB (Candexil 16 mg Tablet)',
        url: 'https://www.deva.com.tr',
      },
    ],
    notes:
      'Official Deva Holding KÜB (SmPC) data. Each tablet contains 16 mg candesartan cilexetil (INN base: Candesartan).',
  },

  // 4. Dikloron 50 mg (Diclofenac — Deva Holding)
  {
    brandName: 'Dikloron 50 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID), acetic acid derivative (ATC M01AB05)',
    strength: '50 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 20 gastro-resistant tablets in blisters',
    indications:
      'Symptomatic relief of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, acute gout, acute musculoskeletal disorders, post-traumatic and post-operative pain and swelling, and primary dysmenorrhoea.',
    dose:
      'Adults: Recommended initial daily dose is 100 to 150 mg in 2 or 3 divided doses (one 50 mg tablet 2 to 3 times daily); in milder cases or maintenance therapy, 75 to 100 mg daily is usually sufficient. Swallow whole with liquid, preferably before meals; do not divide or chew.',
    contraindications:
      'Hypersensitivity to diclofenac or any excipient; active gastric or intestinal ulcer, bleeding or perforation; history of GI bleeding or perforation related to previous NSAID therapy; third trimester of pregnancy; severe hepatic or renal failure; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; NSAID/aspirin-induced asthma, angioedema, or urticaria.',
    adverseEffects:
      'Headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, anorexia, elevated transaminases, skin rash. Rare/Very rare: gastrointestinal ulceration/haemorrhage, arterial thrombotic events, bronchospasm, interstitial nephritis, bullous skin reactions.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Deva Holding A.Ş. — Official Product Portfolio & KÜB (Dikloron 50 mg Enterik Kaplı Tablet)',
        url: 'https://www.deva.com.tr',
      },
    ],
    notes:
      'Official Deva Holding KÜB (SmPC) data. Each gastro-resistant tablet contains 50 mg diclofenac sodium (INN base: Diclofenac).',
  },
];

export const DEVA_HOLDING_PRODUCTS: AiProductDraft[] = RAW_DEVA_HOLDING.map((d) => ({
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

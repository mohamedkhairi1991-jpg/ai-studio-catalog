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

const RAW_DAR_AL_DAWA: CompactDrug[] = [
  // 1. Ciprodar (Ciprofloxacin — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Ciprodar 500 mg',
    brandNameAr: 'سيبرودار 500 ملغ',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Treatment of uncomplicated and complicated urinary tract infections, acute pyelonephritis, bacterial prostatitis, gonococcal urethritis and cervicitis, epididymo-orchitis, pelvic inflammatory disease, lower respiratory tract infections due to Gram-negative bacteria, chronic suppurative otitis media, malignant external otitis, complicated skin and soft tissue infections, bone and joint infections, infectious diarrhoea, and typhoid fever.',
    dose:
      'Adults: 250 mg to 750 mg twice daily (every 12 hours) for 5 to 14 days depending on the site and severity of infection (up to 4–6 weeks for bone/joint infections or chronic bacterial prostatitis). Swallow whole with liquid; separate by at least 2 hours before or 4 hours after dairy products or polyvalent cation antacids/supplements.',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other fluoroquinolones, or excipients; concomitant administration with tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: fungal superinfections, headache, dizziness, sleep disorders, dysgeusia, vomiting, abdominal pain, dyspepsia, flatulence, transient increases in transaminases and bilirubin, rash, pruritus, urticaria, arthralgia, musculoskeletal pain. Class warnings: tendinitis and tendon rupture, peripheral neuropathy, QT interval prolongation.',
    storage:
      'Store below 30°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine', 'Pulmonology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Ciprodar (ciprofloxacin) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. (Amman, Jordan) SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 500 mg ciprofloxacin (INN base: Ciprofloxacin). Also available in 250 mg and 750 mg strengths.',
  },

  // 2. Claridar (Clarithromycin — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Claridar 500 mg',
    brandNameAr: 'كلاريدار 500 ملغ',
    genericName: 'Clarithromycin',
    activeIngredients: ['Clarithromycin'],
    drugClass: 'Macrolide antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Bacterial pharyngitis/tonsillitis, acute maxillary sinusitis, acute bacterial exacerbation of chronic bronchitis, mild to moderate community-acquired pneumonia, uncomplicated skin and soft tissue infections, and eradication of Helicobacter pylori in patients with duodenal/peptic ulcer in combination with acid suppression and another antibiotic.',
    dose:
      'Adults and adolescents (>= 12 years): Usual dose is 250 mg twice daily, increased to 500 mg twice daily in severe infections for 6 to 14 days. H. pylori eradication: 500 mg twice daily for 7 to 14 days in combination with a proton pump inhibitor and amoxicillin or metronidazole.',
    contraindications:
      'Hypersensitivity to clarithromycin, any macrolide antibiotic, or excipients; concomitant administration with astemizole, cisapride, domperidone, pimozide, terfenadine, ergot alkaloids, oral midazolam, lomitapide, ticagrelor, ivabradine, ranolazine, lovastatin, simvastatin, or colchicine; history of QT prolongation or ventricular arrhythmia; hypokalaemia or hypomagnesaemia; severe hepatic failure in combination with renal impairment.',
    adverseEffects:
      'Common: insomnia, dysgeusia, headache, taste perversion, diarrhoea, vomiting, dyspepsia, nausea, abdominal pain, abnormal liver function test, rash, hyperhidrosis.',
    storage:
      'Store below 30°C in a dry place Protected from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Claridar (clarithromycin) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains 500 mg clarithromycin.',
  },

  // 3. Hyposec (Omeprazole — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Hyposec 20 mg',
    brandNameAr: 'هايبوسيك 20 ملغ',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Treatment and prevention of relapse of duodenal ulcers and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease in combination with appropriate antibiotics; treatment and prophylaxis of NSAID-associated gastric and duodenal ulcers; treatment and maintenance of reflux oesophagitis; symptomatic gastro-oesophageal reflux disease; and Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 20 mg once daily for 2–4 weeks. Gastric ulcer and reflux oesophagitis: 20 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics. NSAID ulcer prophylaxis: 20 mg once daily. Swallow whole in the morning before food.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps. Uncommon: dizziness, insomnia, paraesthesia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place, protected from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Hyposec (omeprazole) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each gastro-resistant hard capsule contains enteric-coated pellets equivalent to 20 mg omeprazole.',
  },

  // 4. Lansodar (Lansoprazole — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Lansodar 30 mg',
    brandNameAr: 'لانسودار 30 ملغ',
    genericName: 'Lansoprazole',
    activeIngredients: ['Lansoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '30 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Treatment of duodenal and gastric ulcer; treatment and prophylaxis of reflux oesophagitis; eradication of Helicobacter pylori concurrently given with appropriate antibiotic therapy for treatment of associated ulcers; treatment and prophylaxis of NSAID-associated benign gastric and duodenal ulcers in patients requiring continued NSAID treatment; symptomatic gastro-oesophageal reflux disease; and Zollinger-Ellison syndrome.',
    dose:
      'Duodenal ulcer: 30 mg once daily for 2 weeks (up to 4 weeks). Gastric ulcer and reflux oesophagitis: 30 mg once daily for 4 weeks (up to 8 weeks). H. pylori eradication: 30 mg twice daily for 7–14 days in combination with two antibiotics. Take at least 30 minutes before food in the morning.',
    contraindications:
      'Hypersensitivity to lansoprazole or to any of the excipients.',
    adverseEffects:
      'Common: headache, dizziness, nausea, diarrhoea, stomach ache, constipation, vomiting, flatulence, dry mouth or throat, benign fundic gland polyps, increase in liver enzyme levels, urticaria, itching, rash, fatigue.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Lansodar (lansoprazole) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each gastro-resistant hard capsule contains 30 mg lansoprazole. Also available in 15 mg capsules.',
  },

  // 5. Amlodar (Amlodipine — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Amlodar 5 mg',
    brandNameAr: 'أملودار 5 ملغ',
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
      'Adults: Usual initial dose is 5 mg once daily, which may be increased to a maximum dose of 10 mg once daily depending on the individual patient’s response.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; shock (including cardiogenic shock); obstruction of the outflow tract of the left ventricle (e.g. high-grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: oedema. Common: somnolence, dizziness, headache, palpitations, flushing, abdominal pain, nausea, dyspepsia, ankle swelling, muscle cramps, fatigue.',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Amlodar (amlodipine) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each tablet contains amlodipine besilate equivalent to 5 mg amlodipine (INN base: Amlodipine).',
  },
  {
    brandName: 'Amlodar 10 mg',
    brandNameAr: 'أملودار 10 ملغ',
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
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Amlodar (amlodipine) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each tablet contains amlodipine besilate equivalent to 10 mg amlodipine (INN base: Amlodipine).',
  },

  // 6. Diclogesic (Diclofenac — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Diclogesic 50 mg',
    brandNameAr: 'ديكلوجيسيك 50 ملغ',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '50 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 20 gastro-resistant tablets in blisters',
    indications:
      'Inflammatory and degenerative forms of rheumatism (rheumatoid arthritis, ankylosing spondylitis, osteoarthritis, spondylarthritis), painful syndromes of the vertebral column, non-articular rheumatism, acute attacks of gout, post-traumatic and post-operative pain, inflammation and swelling, and gynaecological pain/primary dysmenorrhoea.',
    dose:
      'Adults: 100 mg to 150 mg daily in 2 or 3 divided doses (one 50 mg tablet 2 to 3 times daily); 75 mg to 100 mg daily in milder cases. Swallow whole with liquid before meals.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of GI bleeding or perforation related to previous NSAID therapy; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, anorexia, increased transaminases, rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine', 'Obstetrics and Gynecology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Diclogesic (diclofenac sodium) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each gastro-resistant tablet contains 50 mg diclofenac sodium (INN base: Diclofenac).',
  },
  {
    brandName: 'Diclogesic Retard 100 mg',
    brandNameAr: 'ديكلوجيسيك ريتارد 100 ملغ',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '100 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 10 or 20 prolonged-release tablets in blisters',
    indications:
      'Maintenance relief of pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, chronic spondylarthritis, and musculoskeletal disorders.',
    dose:
      'Adults: One 100 mg prolonged-release tablet once daily, swallowed whole with liquid, preferably with a meal. When symptoms are most pronounced during the night or in the morning, Diclogesic Retard 100 mg should preferably be taken in the evening.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or history of recurrent peptic ulcer/haemorrhage; history of NSAID-induced GI bleeding or perforation; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: epigastric pain, nausea, vomiting, diarrhoea, abdominal cramps, dyspepsia, flatulence, anorexia, headache, dizziness, vertigo, elevated transaminases, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Diclogesic Retard (diclofenac sodium) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each prolonged-release tablet contains 100 mg diclofenac sodium (INN base: Diclofenac).',
  },
];

export const DAR_AL_DAWA_PRODUCTS: AiProductDraft[] = RAW_DAR_AL_DAWA.map((d) => ({
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

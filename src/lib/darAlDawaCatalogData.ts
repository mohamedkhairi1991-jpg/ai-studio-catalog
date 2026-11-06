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

const RAW_DAR_AL_DAWA: CompactDrug[] = [
  // 1. Ciprodar (Ciprofloxacin — Dar Al Dawa Development & Investment Co.)
  {
    brandName: 'Ciprodar 500 mg',
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
  {
    brandName: 'Ciprodar 250 mg',
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
      'Store below 30°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Ciprodar 250 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 250 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },
  {
    brandName: 'Ciprodar 750 mg',
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
      'Store below 30°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Orthopedics', 'Pulmonology', 'ENT'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Ciprodar 750 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 750 mg ciprofloxacin (INN base: Ciprofloxacin).',
  },
  {
    brandName: 'Claridar 250 mg',
    genericName: 'Clarithromycin',
    activeIngredients: ['Clarithromycin'],
    drugClass: 'Macrolide antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Bacterial pharyngitis/tonsillitis, acute maxillary sinusitis, acute bacterial exacerbation of chronic bronchitis, mild to moderate community-acquired pneumonia, and uncomplicated skin and soft tissue infections.',
    dose:
      'Adults and adolescents (>= 12 years): Usual dose is 250 mg twice daily (every 12 hours) for 6 to 14 days, increased to 500 mg twice daily in severe infections.',
    contraindications:
      'Hypersensitivity to clarithromycin, macrolide antibiotics, or excipients; concomitant astemizole, cisapride, domperidone, pimozide, terfenadine, ergot alkaloids, oral midazolam, lomitapide, ticagrelor, ivabradine, ranolazine, lovastatin, simvastatin, or colchicine; history of QT prolongation or ventricular arrhythmia; hypokalaemia or hypomagnesaemia.',
    adverseEffects:
      'Common: insomnia, dysgeusia, headache, diarrhoea, vomiting, dyspepsia, nausea, abdominal pain, abnormal liver function test, rash, hyperhidrosis.',
    storage:
      'Store below 30°C in a dry place, protected from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Claridar 250 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains 250 mg clarithromycin.',
  },
  {
    brandName: 'Claridar 125 mg/5 mL',
    genericName: 'Clarithromycin',
    activeIngredients: ['Clarithromycin'],
    drugClass: 'Macrolide antibacterial',
    strength: '125 mg/5 mL',
    dosageForm: 'Granules for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 60 mL or 100 mL oral suspension',
    indications:
      'Paediatric bacterial infections (aged 6 months to 12 years): streptococcal pharyngitis/tonsillitis, acute otitis media, acute maxillary sinusitis, community-acquired pneumonia, and uncomplicated skin and soft tissue infections.',
    dose:
      'Children aged 6 months to 12 years: Recommended dose is 7.5 mg/kg twice daily (every 12 hours) for 5 to 10 days, up to a maximum of 500 mg twice daily. May be given with or without food or milk.',
    contraindications:
      'Hypersensitivity to clarithromycin, macrolide antibiotics, or excipients; concomitant QT-prolonging drugs or ergot alkaloids; history of QT prolongation or ventricular cardiac arrhythmia; hypokalaemia.',
    adverseEffects:
      'Common: diarrhoea, vomiting, abdominal pain, dyspepsia, dysgeusia, headache, rash.',
    storage:
      'Dry granules: store below 30°C. Reconstituted suspension: store below 25°C (do not refrigerate) and use within 14 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Claridar Paediatric Suspension Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. After reconstitution, each 5 mL contains 125 mg clarithromycin.',
  },
  {
    brandName: 'Hyposec 40 mg',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Severe or refractory reflux oesophagitis, gastric ulcer, duodenal ulcer poorly responsive to 20 mg daily, Helicobacter pylori eradication regimens, and Zollinger-Ellison syndrome.',
    dose:
      '40 mg once daily in the morning before food for 4 to 8 weeks. Zollinger-Ellison syndrome: initially 60 mg once daily, titrated individually.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps.',
    storage:
      'Store below 25°C in a dry place, protected from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Hyposec 40 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each gastro-resistant hard capsule contains 40 mg omeprazole.',
  },
  {
    brandName: 'Lansodar 15 mg',
    genericName: 'Lansoprazole',
    activeIngredients: ['Lansoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '15 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Maintenance treatment for prevention of relapse of reflux oesophagitis; symptomatic gastro-oesophageal reflux disease (heartburn and acid regurgitation); and prophylaxis of NSAID-associated benign gastric and duodenal ulcers in patients requiring continued NSAID treatment.',
    dose:
      '15 mg once daily in the morning at least 30 minutes before food (may be increased to 30 mg once daily if required).',
    contraindications:
      'Hypersensitivity to lansoprazole or to any of the excipients.',
    adverseEffects:
      'Common: headache, dizziness, nausea, diarrhoea, stomach ache, constipation, vomiting, flatulence, dry mouth or throat, benign fundic gland polyps, elevated liver enzymes, rash, fatigue.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Lansodar 15 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each gastro-resistant hard capsule contains 15 mg lansoprazole.',
  },
  {
    brandName: 'Diclogesic 75 mg/3 mL',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '75 mg/3 mL',
    dosageForm: 'Solution for injection',
    route: 'Intramuscular',
    packSize: 'Pack of 5 ampoules of 3 mL solution for injection',
    indications:
      'Acute exacerbations of inflammatory and degenerative rheumatic diseases, acute gout, renal colic, biliary colic, post-traumatic and post-operative pain, inflammation, and swelling.',
    dose:
      'Adults: One 75 mg ampoule once daily by deep intragluteal injection into the upper outer quadrant (or two 75 mg injections separated by a few hours in severe cases, maximum 150 mg/day) for no more than 2 days.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; bleeding disorders or concomitant anticoagulation; third trimester of pregnancy.',
    adverseEffects:
      'Common: injection site pain and induration, headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, elevated transaminases, rash.',
    storage:
      'Store below 30°C, protected from light. Do not freeze.',
    specialties: ['Orthopedics', 'Rheumatology', 'Emergency Medicine', 'General Surgery', 'Urology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Diclogesic Ampoules Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each 3 mL ampoule contains 75 mg diclofenac sodium (INN base: Diclofenac).',
  },
  {
    brandName: 'Diclogesic 1% Emulgel',
    category: 'otc_drug',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Topical non-steroidal anti-inflammatory and analgesic gel',
    strength: '1% w/w',
    dosageForm: 'Gel',
    route: 'Topical',
    packSize: 'Tube of 50 g topical gel',
    indications:
      'Local symptomatic relief of pain and inflammation in trauma of the tendons, ligaments, muscles, and joints (e.g. due to sprains, strains, and bruises), localised forms of soft-tissue rheumatism (tendinitis, bursitis, shoulder-hand syndrome), and localised osteoarthritis of superficial joints.',
    dose:
      'Adults and adolescents (>= 14 years): Gently rub 2 g to 4 g of gel into the affected area 3 to 4 times daily. Wash hands after application unless they are the site being treated.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, other NSAIDs, or excipients; third trimester of pregnancy; application to open wounds, infected skin, or exfoliative dermatitis; children and adolescents under 14 years of age.',
    adverseEffects:
      'Common: local dermatitis (including contact dermatitis), rash, erythema, eczema, pruritus. Very rare: pustular rash, angioedema, asthma, photosensitivity reaction.',
    storage:
      'Store below 30°C.',
    specialties: ['Orthopedics', 'Rheumatology', 'Physical Medicine and Rehabilitation', 'General Practice / Family Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Diclogesic Emulgel Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Contains diclofenac diethylamine equivalent to 1% w/w diclofenac sodium (INN base: Diclofenac).',
  },
  {
    brandName: 'Moxiclav 625 mg',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '500 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 or 20 film-coated tablets in blisters',
    indications:
      'Acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 625 mg (500 mg/125 mg) tablet every 8 hours (three times daily) for 5 to 14 days at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, dyspepsia, elevated AST/ALT, rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Moxiclav (amoxicillin / clavulanic acid) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Moxiclav 1 g',
    genericName: 'Amoxicillin + Clavulanic acid',
    activeIngredients: ['Amoxicillin', 'Clavulanic acid'],
    drugClass: 'Penicillin beta-lactam antibacterial and beta-lactamase inhibitor combination',
    strength: '875 mg/125 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 14 film-coated tablets in blisters',
    indications:
      'Acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    dose:
      'Adults and children >= 40 kg: One 1 g (875 mg/125 mg) tablet every 12 hours (twice daily); up to three times daily for severe infections. Administer at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: headache, dizziness, dyspepsia, elevated hepatic transaminases, skin rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Moxiclav 1 g Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each 1 g film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Moxiclav Forte 457 mg/5 mL',
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
      'Children < 40 kg (aged >= 2 months): 25/3.6 mg/kg/day to 45/6.4 mg/kg/day (up to 70/10 mg/kg/day for severe infections) divided into 2 equal doses every 12 hours at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis, diaper dermatitis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Moxiclav Forte Oral Suspension Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each 5 mL of reconstituted suspension contains 400 mg amoxicillin and 57 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Atorlip 10 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol, LDL-C, apolipoprotein B, and triglycerides in primary hypercholesterolaemia, heterozygous and homozygous familial hypercholesterolaemia, or combined (mixed) hyperlipidaemia; primary and secondary prevention of cardiovascular events.',
    dose:
      'Usual starting dose is 10 mg or 20 mg once daily; dose range is 10 mg to 80 mg once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or unexplained persistent elevations of serum transaminases > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: nasopharyngitis, hyperglycaemia, headache, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, abnormal liver function test, increased blood creatine kinase.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Atorlip (atorvastatin) Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 10 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Atorlip 20 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Primary hypercholesterolaemia, familial hypercholesterolaemia, mixed dyslipidaemia, and prevention of cardiovascular events in high-risk patients.',
    dose:
      '20 mg once daily at any time of day, with or without food; titrate at intervals of 4 weeks or more up to a maximum of 80 mg once daily.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or persistent elevations of serum transaminases > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: nasopharyngitis, hyperglycaemia, headache, dyspepsia, nausea, diarrhoea, constipation, myalgia, arthralgia, elevated hepatic transaminases and CK.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Atorlip 20 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 20 mg atorvastatin (INN base: Atorvastatin).',
  },
  {
    brandName: 'Atorlip 40 mg',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin lipid-modifying agent)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'High-intensity LDL-C reduction in severe hypercholesterolaemia, familial hypercholesterolaemia, and secondary cardiovascular prevention.',
    dose:
      '40 mg once daily (up to 80 mg once daily), taken with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or excipients; active liver disease or persistent serum transaminase elevations > 3x ULN; pregnancy and breastfeeding.',
    adverseEffects:
      'Common: myalgia, arthralgia, diarrhoea, dyspepsia, nausea, headache, hyperglycaemia, elevated serum transaminases and creatine kinase.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Dar Al Dawa Development & Investment Co. — Atorlip 40 mg Official Product Portfolio',
        url: 'https://www.dadgroup.com/',
      },
    ],
    notes:
      'Official Dar Al Dawa Development & Investment Co. SmPC data. Each film-coated tablet contains atorvastatin calcium equivalent to 40 mg atorvastatin (INN base: Atorvastatin).',
  },
];

export const DAR_AL_DAWA_PRODUCTS: AiProductDraft[] = RAW_DAR_AL_DAWA.map((d) => ({
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

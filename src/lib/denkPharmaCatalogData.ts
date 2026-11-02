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

const RAW_DENK_PHARMA: CompactDrug[] = [
  // 1. Amoxi-Denk (Amoxicillin — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Amoxi-Denk 500 mg',
    brandNameAr: 'أموكسي-دنك 500 ملغ',
    genericName: 'Amoxicillin',
    activeIngredients: ['Amoxicillin'],
    drugClass: 'Broad-spectrum aminopenicillin beta-lactam antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Treatment of acute bacterial sinusitis, acute otitis media, acute streptococcal tonsillitis and pharyngitis, acute exacerbations of chronic bronchitis, community-acquired pneumonia, acute cystitis, asymptomatic bacteriuria in pregnancy, acute pyelonephritis, typhoid and paratyphoid fever, dental abscess with spreading cellulitis, prosthetic joint infections, Helicobacter pylori eradication (in combination therapy), and Lyme disease.',
    dose:
      'Adults and children >= 40 kg: 500 mg every 8 hours, or 750 mg to 1000 mg every 12 hours depending on the severity and site of infection; up to 1000 mg every 8 hours for severe infections. H. pylori eradication: 1000 mg twice daily for 7–14 days in combination with a proton pump inhibitor and another antibiotic.',
    contraindications:
      'Hypersensitivity to amoxicillin, to any of the penicillins, or to any of the excipients; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (such as a cephalosporin, carbapenem, or monobactam).',
    adverseEffects:
      'Common: diarrhoea, nausea, skin rash. Uncommon: vomiting, urticaria, pruritus. Very rare: mucocutaneous candidiasis, reversible leukopenia and thrombocytopenia, antibiotic-associated colitis (including pseudomembranous colitis), severe cutaneous adverse reactions (SJS, TEN, DRESS, AGEP), angioedema, anaphylaxis, interstitial nephritis.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture and light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Urology'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Amoxi-Denk 500 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/amoxi-denk-500/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin (INN base: Amoxicillin).',
  },
  {
    brandName: 'Amoxi-Denk 1000 mg',
    brandNameAr: 'أموكسي-دنك 1000 ملغ',
    genericName: 'Amoxicillin',
    activeIngredients: ['Amoxicillin'],
    drugClass: 'Broad-spectrum aminopenicillin beta-lactam antibacterial',
    strength: '1000 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 film-coated tablets in blisters',
    indications:
      'Treatment of upper and lower respiratory tract infections (acute bacterial sinusitis, acute otitis media, streptococcal pharyngotonsillitis, acute exacerbations of chronic bronchitis, community-acquired pneumonia), urinary tract infections, dental abscesses with spreading cellulitis, Lyme disease, and eradication of Helicobacter pylori in peptic ulcer disease (in combination therapy).',
    dose:
      'Adults and children >= 40 kg: 750 mg to 1000 mg every 12 hours, or 1000 mg every 8 hours for severe infections. H. pylori eradication: 1000 mg twice daily for 7–14 days with a proton pump inhibitor and a second antibacterial agent.',
    contraindications:
      'Hypersensitivity to amoxicillin, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial.',
    adverseEffects:
      'Common: diarrhoea, nausea, skin rash (especially morbilliform rash in patients with infectious mononucleosis). Uncommon: vomiting, urticaria, pruritus.',
    storage:
      'Store below 25°C in the original package to protect from moisture and light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT', 'Gastroenterology'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Amoxi-Denk 1000 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/amoxi-denk-1000/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains amoxicillin trihydrate equivalent to 1000 mg amoxicillin (INN base: Amoxicillin).',
  },

  // 2. Panto-Denk (Pantoprazole — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Panto-Denk 20 mg',
    brandNameAr: 'بانتو-دنك 20 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis; and prevention of gastroduodenal ulcers induced by non-selective non-steroidal anti-inflammatory drugs (NSAIDs) in patients at risk with a need for continuous NSAID treatment.',
    dose:
      'Symptomatic GORD and long-term reflux oesophagitis maintenance: 20 mg once daily (may be increased to 40 mg daily if relapse occurs). NSAID-induced ulcer prophylaxis: 20 mg once daily. Tablets must not be chewed or crushed, and should be swallowed whole 1 hour before a meal with some water.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, soya/peanut lecithin (if present in formulation), or to any of the excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: sleep disorders, headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain and discomfort, liver enzymes increased, rash, exanthema, pruritus, fracture of hip, wrist or spine, asthenia, fatigue and malaise.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Panto-Denk 20 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/panto-denk-20/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data (also registered in German-speaking markets as Pantoprazol-Denk 20 mg). Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 20 mg pantoprazole (INN base: Pantoprazole).',
  },
  {
    brandName: 'Panto-Denk 40 mg',
    brandNameAr: 'بانتو-دنك 40 ملغ',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Reflux oesophagitis; eradication of Helicobacter pylori in combination with two appropriate antibiotics in patients with peptic ulcers; gastric and duodenal ulcer; and Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    dose:
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily for 2–8 weeks. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Zollinger-Ellison syndrome: initially 80 mg daily, adjusted individually. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or to any of the excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, bloating, constipation, dry mouth, abdominal pain, elevated hepatic transaminases, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Panto-Denk 40 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/panto-denk-40/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data (also registered as Pantoprazol-Denk 40 mg). Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole (INN base: Pantoprazole).',
  },

  // 3. Azithro-Denk (Azithromycin — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Azithro-Denk 250 mg',
    brandNameAr: 'أزيثرو-دنك 250 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 6 film-coated tablets in blister',
    indications:
      'Infections caused by azithromycin-susceptible microorganisms: acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, skin and soft tissue infections of mild to moderate severity (erythema migrans, erysipelas, impetigo, secondary pyoderma), and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): Total dose is 1500 mg, administered either as 500 mg (two 250 mg tablets) once daily for 3 consecutive days, or as 500 mg on Day 1 followed by 250 mg once daily on Days 2 to 5. Uncomplicated Chlamydia trachomatis genital infections: 1000 mg (four 250 mg tablets) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, soya/peanut (if soya lecithin is an excipient), or to any of the excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea, decreased lymphocyte count, increased blood eosinophils, decreased blood bicarbonate. Uncommon: candidiasis, dizziness, somnolence, dysgeusia, palpitations, gastritis, constipation, flatulence, hepatitis, rash, pruritus, QT prolongation on ECG.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Azithro-Denk 250 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/azithro-denk-250/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 250 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Azithro-Denk 500 mg',
    brandNameAr: 'أزيثرو-دنك 500 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Acute bacterial sinusitis, acute bacterial otitis media, pharyngitis/tonsillitis, acute exacerbation of chronic bronchitis, mild to moderate community-acquired pneumonia, mild to moderate skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (1 tablet) once daily for 3 consecutive days (total dose 1500 mg). Uncomplicated Chlamydia trachomatis urethritis/cervicitis: 1000 mg (2 tablets) taken as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, nausea, vomiting, abdominal pain, transient changes in leukocyte and eosinophil counts. Uncommon: dizziness, dysgeusia, palpitations, flatulence, gastritis, rash, pruritus, ECG QT prolongation.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Azithro-Denk 500 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/azithro-denk-500/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },

  // 4. Captopril Denk (Captopril — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Captopril Denk 25 mg',
    brandNameAr: 'كابتوبريل دنك 25 ملغ',
    genericName: 'Captopril',
    activeIngredients: ['Captopril'],
    drugClass: 'Angiotensin-converting enzyme (ACE) inhibitor',
    strength: '25 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic congestive heart failure with reduction of systolic ventricular function (in combination with diuretics and, when appropriate, digitalis and beta-blockers); short-term (4 weeks) and long-term treatment after myocardial infarction in clinically stable patients with asymptomatic left ventricular dysfunction (ejection fraction <= 40%); and treatment of macroproteinuric diabetic nephropathy in patients with type 1 diabetes mellitus.',
    dose:
      'Hypertension: starting dose 25 mg to 50 mg daily in two divided doses, titrated at intervals of at least 2 weeks to 100 mg–150 mg daily in two divided doses. Heart failure: initially 6.25 mg to 12.5 mg twice or three times daily, titrated gradually to maintenance 75 mg–150 mg daily in divided doses. Diabetic nephropathy: 75 mg to 100 mg daily in divided doses.',
    contraindications:
      'Hypersensitivity to captopril, any other ACE inhibitor, or excipients; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant use with sacubitril/valsartan (within 36 hours).',
    adverseEffects:
      'Common: sleep disorders, taste impairment (dysgeusia), dizziness, dry irritating (non-productive) cough, dyspnoea, nausea, vomiting, gastric irritations, abdominal pain, diarrhoea, constipation, dry mouth, pruritus, rash, alopecia. Uncommon: tachycardia, angina pectoris, hypotension, Raynaud phenomenon, flushing, angioedema, fatigue, malaise.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Captopril Denk 25 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/captopril-denk-25/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each tablet contains 25 mg captopril.',
  },

  // 5. Amlo-Denk (Amlodipine — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Amlo-Denk 5 mg',
    brandNameAr: 'أملو-دنك 5 ملغ',
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
      'Adults: Usual initial dose is 5 mg once daily, which may be increased to a maximum dose of 10 mg once daily depending on the individual patient’s response. Children and adolescents (6–17 years) with hypertension: 2.5 mg once daily, increased to 5 mg once daily if blood pressure target is not achieved after 4 weeks.',
    contraindications:
      'Hypersensitivity to amlodipine, dihydropyridine derivatives, or excipients; severe hypotension; shock (including cardiogenic shock); obstruction of the outflow tract of the left ventricle (e.g. high grade aortic stenosis); haemodynamically unstable heart failure after acute myocardial infarction.',
    adverseEffects:
      'Very common: oedema. Common: somnolence, dizziness, headache, visual disturbances, palpitations, flushing, dyspnoea, abdominal pain, nausea, dyspepsia, altered bowel habits, ankle swelling, muscle cramps, fatigue, asthenia.',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Amlo-Denk 5 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/amlo-denk-5/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each tablet contains amlodipine besilate equivalent to 5 mg amlodipine (INN base: Amlodipine).',
  },
  {
    brandName: 'Amlo-Denk 10 mg',
    brandNameAr: 'أملو-دنك 10 ملغ',
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
        title: 'Denk Pharma GmbH & Co. KG — Amlo-Denk 10 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/amlo-denk-10/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each tablet contains amlodipine besilate equivalent to 10 mg amlodipine (INN base: Amlodipine).',
  },

  // 6. Losar-Denk (Losartan — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Losar-Denk 50 mg',
    brandNameAr: 'لوسار-دنك 50 ملغ',
    genericName: 'Losartan',
    activeIngredients: ['Losartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents aged 6–18 years; renal disease in adult patients with hypertension and type 2 diabetes mellitus with proteinuria >= 0.5 g/day; chronic heart failure in adult patients when ACE inhibitors are unsuitable; and reduction in the risk of stroke in adult hypertensive patients with left ventricular hypertrophy documented by ECG.',
    dose:
      'Hypertension and diabetic nephropathy: usual starting dose is 50 mg once daily, which may be increased to 100 mg once daily based on blood pressure response. Heart failure: initially 12.5 mg once daily, titrated weekly up to a maximum of 150 mg once daily.',
    contraindications:
      'Hypersensitivity to losartan or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment; concomitant use with aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    adverseEffects:
      'Common: dizziness, vertigo, hypotension / orthostatic hypotension, asthenia, fatigue, hyperkalaemia, anaemia, renal impairment, hypoglycaemia (in diabetic patients).',
    storage:
      'Store below 25°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Losar-Denk 50 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/losar-denk-50/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains 50 mg losartan potassium (INN base: Losartan). Also available in 25 mg and 100 mg tablets.',
  },

  // 7. Cipro-Denk (Ciprofloxacin — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Cipro-Denk 500 mg',
    brandNameAr: 'سيبرو-دنك 500 ملغ',
    genericName: 'Ciprofloxacin',
    activeIngredients: ['Ciprofloxacin'],
    drugClass: 'Fluoroquinolone antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 10 film-coated tablets in blister',
    indications:
      'Complicated and uncomplicated urinary tract infections, acute pyelonephritis, bacterial prostatitis, gonococcal urethritis and cervicitis, epididymo-orchitis, pelvic inflammatory disease, lower respiratory tract infections due to Gram-negative bacteria, chronic suppurative otitis media, malignant external otitis, complicated skin and soft tissue infections, bone and joint infections, infectious diarrhoea, typhoid fever, and inhalational anthrax prophylaxis and cure.',
    dose:
      'Adults: 250 mg to 750 mg twice daily depending on the site and severity of infection (commonly 500 mg twice daily for 7 to 14 days). Swallow whole with liquid; do not take concurrently with dairy products, calcium, magnesium, aluminium, iron, or zinc supplements (separate by at least 2 hours before or 4 hours after).',
    contraindications:
      'Hypersensitivity to ciprofloxacin, other quinolones, or excipients; concomitant administration of ciprofloxacin and tizanidine.',
    adverseEffects:
      'Common: nausea, diarrhoea. Uncommon: mycotic superinfections, decreased appetite, psychomotor hyperactivity/agitation, headache, dizziness, sleep disorders, taste disorders, vomiting, gastrointestinal and abdominal pains, dyspepsia, flatulence, increased transaminases and bilirubin, rash, pruritus, urticaria, musculoskeletal pain (arthralgia), renal impairment, asthenia, fever. Rare/Class warnings: tendinitis and tendon rupture (especially Achilles tendon), peripheral neuropathy, QT prolongation, aortic aneurysm/dissection.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Urology', 'Internal Medicine', 'Pulmonology'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Cipro-Denk 500 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/cipro-denk-500/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains ciprofloxacin hydrochloride equivalent to 500 mg ciprofloxacin (INN base: Ciprofloxacin). Also available in 750 mg strength.',
  },

  // 8. Metformin Denk (Metformin — Denk Pharma GmbH & Co. KG)
  {
    brandName: 'Metformin Denk 500 mg',
    brandNameAr: 'ميتفورمين دنك 500 ملغ',
    genericName: 'Metformin',
    activeIngredients: ['Metformin'],
    drugClass: 'Biguanide oral antihyperglycaemic agent',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of type 2 diabetes mellitus, particularly in overweight patients, when dietary management and exercise alone do not result in adequate glycaemic control. May be used as monotherapy or in combination with other oral antidiabetic agents or with insulin in adults, and in children from 10 years of age and adolescents.',
    dose:
      'Adults with normal renal function (GFR >= 90 mL/min): usual starting dose is 500 mg or 850 mg two or three times daily given during or after meals, adjusted after 10–15 days on the basis of blood glucose measurements up to a maximum of 3000 mg daily in 3 divided doses.',
    contraindications:
      'Hypersensitivity to metformin or excipients; any type of acute metabolic acidosis (such as lactic acidosis, diabetic ketoacidosis); diabetic pre-coma; severe renal failure (GFR < 30 mL/min); acute conditions with the potential to alter renal function (dehydration, severe infection, shock); tissue hypoxia (decompensated heart failure, respiratory failure, recent myocardial infarction, shock); hepatic insufficiency, acute alcohol intoxication, alcoholism.',
    adverseEffects:
      'Very common: nausea, vomiting, diarrhoea, abdominal pain, loss of appetite (most frequent during initiation and resolve spontaneously in most cases). Common: taste disturbance, vitamin B12 decrease/deficiency. Very rare: lactic acidosis, hepatitis, skin reactions (erythema, pruritus, urticaria).',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Metformin Denk 500 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/metformin-denk-500/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains 500 mg metformin hydrochloride (INN base: Metformin).',
  },
  {
    brandName: 'Metformin Denk 850 mg',
    brandNameAr: 'ميتفورمين دنك 850 ملغ',
    genericName: 'Metformin',
    activeIngredients: ['Metformin'],
    drugClass: 'Biguanide oral antihyperglycaemic agent',
    strength: '850 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Treatment of type 2 diabetes mellitus in adults and children aged 10 years and older, as monotherapy or in combination with other oral antidiabetic medicinal products or insulin.',
    dose:
      'Usual starting dose is 850 mg two or three times daily given during or after meals. Maximum recommended dose is 2550 mg to 3000 mg daily taken in 3 divided doses. Reduce maximum dose in moderate renal impairment (GFR 30–59 mL/min).',
    contraindications:
      'Hypersensitivity to metformin or excipients; acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis); diabetic pre-coma; severe renal failure (GFR < 30 mL/min); acute dehydration, severe infection, or shock; tissue hypoxia; hepatic insufficiency or alcoholism.',
    adverseEffects:
      'Very common: gastrointestinal disturbances (nausea, vomiting, diarrhoea, abdominal pain, loss of appetite). Common: metallic taste, decreased vitamin B12 absorption. Very rare: lactic acidosis.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Metformin Denk 850 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/metformin-denk-850/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains 850 mg metformin hydrochloride (INN base: Metformin).',
  },
  {
    brandName: 'Metformin Denk 1000 mg',
    brandNameAr: 'ميتفورمين دنك 1000 ملغ',
    genericName: 'Metformin',
    activeIngredients: ['Metformin'],
    drugClass: 'Biguanide oral antihyperglycaemic agent',
    strength: '1000 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Maintenance treatment of type 2 diabetes mellitus in patients requiring higher daily doses of metformin as monotherapy or in combination with other oral antidiabetic agents or insulin.',
    dose:
      '1000 mg twice daily (or up to 1000 mg three times daily, maximum 3000 mg/day in patients with GFR >= 60 mL/min) taken with or after meals.',
    contraindications:
      'Hypersensitivity to metformin or excipients; lactic acidosis, diabetic ketoacidosis, diabetic pre-coma; severe renal failure (GFR < 30 mL/min); acute conditions altering renal function or causing tissue hypoxia; hepatic insufficiency, alcoholism.',
    adverseEffects:
      'Very common: gastrointestinal upset (diarrhoea, nausea, vomiting, abdominal pain, decreased appetite). Common: dysgeusia, decreased serum vitamin B12 levels. Very rare: lactic acidosis.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sources: [
      {
        title: 'Denk Pharma GmbH & Co. KG — Metformin Denk 1000 mg Official Product Information',
        url: 'https://www.denkpharma.com/products/metformin-denk-1000/',
      },
    ],
    notes:
      'Official Denk Pharma GmbH & Co. KG product page and SmPC data. Each film-coated tablet contains 1000 mg metformin hydrochloride (INN base: Metformin).',
  },
];

export const DENK_PHARMA_PRODUCTS: AiProductDraft[] = RAW_DENK_PHARMA.map((d) => ({
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

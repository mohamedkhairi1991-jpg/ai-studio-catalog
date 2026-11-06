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

const RAW_TABUK: CompactDrug[] = [
  // 1. Tabuvan (Valsartan — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Tabuvan 80 mg',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults and in children and adolescents 6 to less than 18 years of age; treatment of clinically stable adult patients with symptomatic heart failure or asymptomatic left ventricular systolic dysfunction after a recent (12 hours to 10 days) myocardial infarction; and treatment of symptomatic heart failure in adult patients when ACE inhibitors are not tolerated.',
    dose:
      'Hypertension: recommended starting dose is 80 mg once daily; if blood pressure is not adequately controlled, the dose may be increased to 160 mg and to a maximum of 320 mg once daily. Heart failure: starting dose 40 mg twice daily, titrated to 80 mg and 160 mg twice daily as tolerated. Post-myocardial infarction: starting dose 20 mg twice daily, titrated up to a target of 160 mg twice daily.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant use with aliskiren in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant use with sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, postural dizziness, hypotension, orthostatic hypotension, decreased renal function and renal impairment (in heart failure/post-MI). Uncommon: vertigo, cough, abdominal pain, fatigue, asthenia, hyperkalaemia, syncope, headache, nausea, diarrhoea, angioedema, acute renal failure.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuvan (valsartan) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. (Saudi Arabia) product page and SmPC data. Each film-coated tablet contains 80 mg valsartan.',
  },
  {
    brandName: 'Tabuvan 160 mg',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '160 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Essential hypertension; clinically stable post-myocardial infarction left ventricular systolic dysfunction; and symptomatic chronic heart failure when ACE inhibitors cannot be used.',
    dose:
      'Hypertension: 160 mg once daily (up to a maximum of 320 mg once daily). Heart failure and post-myocardial infarction target maintenance dose: 160 mg twice daily as tolerated.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, orthostatic hypotension, renal impairment, hyperkalaemia (especially in heart failure or renal disease). Uncommon: vertigo, cough, abdominal pain, diarrhoea, nausea, fatigue, syncope, angioedema.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuvan (valsartan) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 160 mg valsartan.',
  },

  // 2. Co-Tabuvan (Valsartan + Hydrochlorothiazide — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Co-Tabuvan 80 mg/12.5 mg',
    genericName: 'Valsartan + Hydrochlorothiazide',
    activeIngredients: ['Valsartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '80 mg/12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults whose blood pressure is not adequately controlled by valsartan or hydrochlorothiazide monotherapy.',
    dose:
      'One film-coated tablet (80 mg valsartan / 12.5 mg hydrochlorothiazide) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, sulfonamide-derived substances, or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, and cholestasis; severe renal impairment (CrCl < 30 mL/min), anuria; refractory hypokalaemia, hyponatraemia, hypercalcaemia, and symptomatic hyperuricaemia; concomitant aliskiren in diabetes mellitus or renal impairment.',
    adverseEffects:
      'Uncommon: dehydration, dizziness, paraesthesia, blurred vision, tinnitus, hypotension, cough, myalgia, fatigue. Electrolyte disturbances: hypokalaemia or hyperkalaemia, hyponatraemia, hyperuricaemia, hyperglycaemia.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Co-Tabuvan (valsartan / hydrochlorothiazide) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 80 mg valsartan and 12.5 mg hydrochlorothiazide.',
  },
  {
    brandName: 'Co-Tabuvan 160 mg/12.5 mg',
    genericName: 'Valsartan + Hydrochlorothiazide',
    activeIngredients: ['Valsartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '160 mg/12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on valsartan 160 mg or hydrochlorothiazide monotherapy.',
    dose:
      'One film-coated tablet (160 mg valsartan / 12.5 mg hydrochlorothiazide) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, sulfonamides, or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, cholestasis; severe renal impairment (CrCl < 30 mL/min), anuria; refractory hypokalaemia, hyponatraemia, hypercalcaemia, or symptomatic hyperuricaemia; concomitant aliskiren in diabetes mellitus or renal impairment.',
    adverseEffects:
      'Uncommon: dizziness, hypotension, dehydration, cough, myalgia, fatigue, electrolyte imbalances (hypokalaemia, hyponatraemia, hyperuricaemia).',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Co-Tabuvan (valsartan / hydrochlorothiazide) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 160 mg valsartan and 12.5 mg hydrochlorothiazide.',
  },

  // 3. Toprazole (Pantoprazole — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Toprazole 20 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Pack of 28 gastro-resistant tablets in blisters',
    indications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis; and prevention of gastroduodenal ulcers induced by non-selective NSAIDs in patients at risk requiring continuous NSAID treatment.',
    dose:
      'Symptomatic GORD and long-term reflux oesophagitis maintenance: 20 mg once daily. NSAID-induced ulcer prophylaxis: 20 mg once daily. Swallow whole 1 hour before a meal with water; do not crush or chew.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain, elevated liver enzymes, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Toprazole (pantoprazole) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 20 mg pantoprazole (INN base: Pantoprazole).',
  },
  {
    brandName: 'Toprazole 40 mg',
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
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily for 2–8 weeks. H. pylori eradication: 40 mg twice daily for 7–14 days with combination antibiotics. Zollinger-Ellison syndrome: initially 80 mg daily. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or excipients.',
    adverseEffects:
      'Common: benign fundic gland polyps. Uncommon: headache, dizziness, diarrhoea, nausea, vomiting, bloating, constipation, dry mouth, abdominal pain, elevated hepatic transaminases, skin rash, pruritus, asthenia, fatigue.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Toprazole (pantoprazole) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each gastro-resistant tablet contains pantoprazole sodium sesquihydrate equivalent to 40 mg pantoprazole (INN base: Pantoprazole).',
  },

  // 4. Divido (Diclofenac — Tabuk Pharmaceutical Manufacturing Co.)
  {
    brandName: 'Divido 75 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, dual-release phenylacetic acid derivative)',
    strength: '75 mg',
    dosageForm: 'Modified-release hard capsule',
    route: 'Oral',
    packSize: 'Pack of 20 dual-release hard capsules in blisters',
    indications:
      'Symptomatic relief of acute and chronic pain and inflammation in rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, acute gout, acute musculoskeletal disorders, post-operative and post-traumatic pain and swelling, and primary dysmenorrhoea.',
    dose:
      'Adults: One 75 mg dual-release capsule once daily, or in severe cases one 75 mg capsule twice daily (maximum daily dose 150 mg). Swallow whole with liquid during or after meals.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or history of recurrent peptic ulcer/haemorrhage; history of GI bleeding or perforation related to previous NSAID therapy; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, anorexia, elevated transaminases, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Divido (diclofenac sodium 75 mg dual-release capsule) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each dual-release hard capsule contains 75 mg diclofenac sodium (25 mg gastro-resistant pellets and 50 mg prolonged-release pellets; INN base: Diclofenac).',
  },
  {
    brandName: 'Tabuvan 320 mg',
    genericName: 'Valsartan',
    activeIngredients: ['Valsartan'],
    drugClass: 'Angiotensin II receptor blocker (ARB)',
    strength: '320 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients requiring maximal angiotensin II receptor blockade.',
    dose:
      'Adults: One 320 mg film-coated tablet once daily (maximum daily dose for hypertension), taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan or excipients; severe hepatic impairment, biliary cirrhosis, and cholestasis; 2nd and 3rd trimesters of pregnancy; concomitant aliskiren in diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²); concomitant sacubitril/valsartan.',
    adverseEffects:
      'Common: dizziness, postural dizziness, hypotension, orthostatic hypotension, hyperkalaemia, renal impairment.',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuvan 320 mg Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 320 mg valsartan.',
  },
  {
    brandName: 'Co-Tabuvan 160 mg/25 mg',
    genericName: 'Valsartan + Hydrochlorothiazide',
    activeIngredients: ['Valsartan', 'Hydrochlorothiazide'],
    drugClass: 'Angiotensin II receptor blocker (ARB) and thiazide diuretic fixed-dose combination',
    strength: '160 mg/25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets in blisters',
    indications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not adequately controlled on valsartan 160 mg, hydrochlorothiazide, or Co-Tabuvan 160 mg/12.5 mg.',
    dose:
      'One film-coated tablet (160 mg valsartan / 25 mg hydrochlorothiazide) once daily, taken with or without food.',
    contraindications:
      'Hypersensitivity to valsartan, hydrochlorothiazide, sulfonamides, or excipients; 2nd and 3rd trimesters of pregnancy; severe hepatic impairment, biliary cirrhosis, cholestasis; severe renal impairment (CrCl < 30 mL/min), anuria; refractory hypokalaemia, hyponatraemia, hypercalcaemia, or symptomatic hyperuricaemia; concomitant aliskiren in diabetes or renal impairment.',
    adverseEffects:
      'Uncommon: dehydration, dizziness, hypotension, cough, myalgia, fatigue, electrolyte disturbances (hypokalaemia, hyponatraemia, hyperuricaemia, hyperglycaemia).',
    storage:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Co-Tabuvan 160 mg/25 mg Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. product page and SmPC data. Each film-coated tablet contains 160 mg valsartan and 25 mg hydrochlorothiazide.',
  },
  {
    brandName: 'Tabuklav 625 mg',
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
      'Adults and children >= 40 kg: One 625 mg (500 mg/125 mg) tablet every 8 hours (three times daily) for 5 to 14 days, taken at the start of a meal.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, penicillins, or excipients; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: mucocutaneous candidiasis, nausea, vomiting. Uncommon: dizziness, headache, dyspepsia, elevated AST/ALT, rash, pruritus, urticaria.',
    storage:
      'Store below 25°C in a dry place in the original package to protect from moisture.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuklav (amoxicillin / clavulanic acid) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each 625 mg film-coated tablet contains amoxicillin trihydrate equivalent to 500 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Tabuklav 1 g',
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
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pulmonology', 'ENT (Otolaryngology)', 'Urology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuklav 1 g Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each 1 g film-coated tablet contains amoxicillin trihydrate equivalent to 875 mg amoxicillin and potassium clavulanate equivalent to 125 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Tabuklav 457 mg/5 mL',
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
      'Children < 40 kg (aged >= 2 months): 25/3.6 mg/kg/day to 45/6.4 mg/kg/day (up to 70/10 mg/kg/day for severe otitis media, sinusitis, or lower respiratory infections) divided into 2 equal doses every 12 hours at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or beta-lactamase inhibitors; history of severe hypersensitivity to other beta-lactam agents; history of amoxicillin/clavulanic acid-associated jaundice or hepatic dysfunction.',
    adverseEffects:
      'Common: diarrhoea, nausea, vomiting, mucocutaneous candidiasis, diaper dermatitis. Uncommon: indigestion, skin rash, urticaria, pruritus.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store in a refrigerator (2°C to 8°C) and use within 7 days.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT (Otolaryngology)', 'Pulmonology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Tabuklav 457 mg/5 mL Oral Suspension Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each 5 mL of reconstituted suspension contains 400 mg amoxicillin and 57 mg clavulanic acid (INN bases: Amoxicillin + Clavulanic acid).',
  },
  {
    brandName: 'Azomac 500 mg',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Upper and lower respiratory tract infections (sinusitis, otitis media, pharyngitis/tonsillitis, bronchitis, mild to moderate community-acquired pneumonia), uncomplicated skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (1 tablet) once daily for 3 consecutive days (total dose 1500 mg). Uncomplicated Chlamydia trachomatis infection: 1000 mg (2 tablets) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients; history of azithromycin-associated cholestatic jaundice or hepatic dysfunction.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea. Uncommon: dizziness, dysgeusia, palpitations, rash, pruritus, QT prolongation.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Azomac (azithromycin) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Azomac 200 mg/5 mL',
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
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Azomac Oral Suspension Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. After reconstitution, each 5 mL contains azithromycin dihydrate equivalent to 200 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Fastflam 50 mg',
    genericName: 'Diclofenac',
    activeIngredients: ['Diclofenac'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID, phenylacetic acid derivative)',
    strength: '50 mg',
    dosageForm: 'Sugar-coated / film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 20 tablets in blisters',
    indications:
      'Short-term treatment of acute painful and inflammatory conditions: post-traumatic pain, inflammation, and swelling (e.g. sprains), post-operative pain and inflammation (e.g. dental or orthopaedic surgery), primary dysmenorrhoea, migraine attacks, and acute musculoskeletal or spinal pain syndromes.',
    dose:
      'Adults: Recommended initial daily dose is 100 mg to 150 mg divided into 2 or 3 doses (one 50 mg tablet 2 to 3 times daily); in milder cases, 50 mg to 100 mg daily.',
    contraindications:
      'Hypersensitivity to diclofenac, aspirin, or other NSAIDs; active or recurrent peptic ulcer/haemorrhage; history of NSAID-related GI bleeding or perforation; established congestive heart failure (NYHA II–IV), ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; severe hepatic or renal failure; third trimester of pregnancy.',
    adverseEffects:
      'Common: headache, dizziness, vertigo, nausea, vomiting, diarrhoea, dyspepsia, abdominal pain, flatulence, elevated transaminases, skin rash.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Orthopedics', 'Rheumatology', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Fastflam (diclofenac potassium 50 mg) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each tablet contains 50 mg diclofenac potassium for rapid onset of analgesia (INN base: Diclofenac).',
  },
  {
    brandName: 'Vasoxen 5 mg',
    genericName: 'Nebivolol',
    activeIngredients: ['Nebivolol'],
    drugClass: 'Cardioselective third-generation beta-1 adrenergic receptor blocker with nitric oxide-mediated vasodilating properties',
    strength: '5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 tablets in blisters',
    indications:
      'Treatment of essential hypertension in adults; and treatment of stable mild and moderate chronic heart failure in addition to standard therapies in elderly patients aged >= 70 years.',
    dose:
      'Hypertension: One 5 mg tablet once daily, preferably at the same time each day, with or without food (2.5 mg starting dose in renal insufficiency or patients > 65 years). Chronic heart failure: titrated slowly from 1.25 mg once daily up to a maximum of 10 mg once daily.',
    contraindications:
      'Hypersensitivity to nebivolol or excipients; liver insufficiency or liver function impairment; acute heart failure, cardiogenic shock, or episodes of heart failure decompensation requiring IV inotropic therapy; sick sinus syndrome, sino-atrial block, second- and third-degree AV block (without a pacemaker); history of bronchospasm and bronchial asthma; untreated phaeochromocytoma; metabolic acidosis; bradycardia (< 60 bpm prior to therapy); severe hypotension or severe peripheral circulatory disturbances.',
    adverseEffects:
      'Common: headache, dizziness, paraesthesia, dyspnoea, constipation, nausea, diarrhoea, tiredness, oedema. Uncommon: bradycardia, heart failure, slowed AV conduction/AV block, hypotension, bronchospasm, dyspepsia, flatulence, vomiting, pruritus, rash, erectile dysfunction.',
    storage:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Vasoxen (nebivolol 5 mg) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each tablet contains nebivolol hydrochloride equivalent to 5 mg nebivolol (INN base: Nebivolol).',
  },
  {
    brandName: 'Celoxib 200 mg',
    genericName: 'Celecoxib',
    activeIngredients: ['Celecoxib'],
    drugClass: 'Selective cyclooxygenase-2 (COX-2) inhibitor (NSAID)',
    strength: '200 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 20 or 30 hard capsules in blisters',
    indications:
      'Symptomatic relief in the treatment of osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis in adults.',
    dose:
      'Osteoarthritis: 200 mg once daily or 100 mg twice daily. Rheumatoid arthritis: 100 mg to 200 mg twice daily. Ankylosing spondylitis: 200 mg once daily (up to 400 mg daily).',
    contraindications:
      'Hypersensitivity to celecoxib, sulfonamides, or excipients; NSAID/aspirin-induced asthma, urticaria, or allergic reactions; active peptic ulceration or GI bleeding; severe hepatic dysfunction; CrCl < 30 mL/min; inflammatory bowel disease; congestive heart failure (NYHA II–IV), established ischaemic heart disease, peripheral arterial disease, or cerebrovascular disease; pregnancy.',
    adverseEffects:
      'Very common: hypertension. Common: sinusitis, upper respiratory tract infection, insomnia, dizziness, headache, abdominal pain, diarrhoea, dyspepsia, flatulence, vomiting, nausea, rash, pruritus, peripheral oedema.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Rheumatology', 'Orthopedics', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Celoxib (celecoxib 200 mg) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each hard capsule contains 200 mg celecoxib.',
  },
  {
    brandName: 'Airfast 10 mg',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 film-coated tablets in blisters',
    indications:
      'Add-on treatment of mild to moderate persistent bronchial asthma in patients aged 15 years and older inadequately controlled on inhaled corticosteroids and short-acting beta-agonists, prophylaxis of exercise-induced bronchoconstriction, and symptomatic relief of seasonal allergic rhinitis in asthmatic patients.',
    dose:
      'Adults and adolescents (>= 15 years): One 10 mg film-coated tablet once daily in the evening, taken with or without food.',
    contraindications:
      'Hypersensitivity to montelukast or to any of the excipients.',
    adverseEffects:
      'Very common: upper respiratory infection. Common: diarrhoea, nausea, vomiting, elevated serum transaminases (ALT, AST), rash, pyrexia, headache. Post-marketing warning: neuropsychiatric events (sleep disturbances, agitation, depression, behavioural changes).',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Pulmonology', 'Allergy & Immunology', 'ENT (Otolaryngology)', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Airfast (montelukast) Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each film-coated tablet contains montelukast sodium equivalent to 10 mg montelukast (INN base: Montelukast).',
  },
  {
    brandName: 'Airfast 5 mg',
    genericName: 'Montelukast',
    activeIngredients: ['Montelukast'],
    drugClass: 'Selective leukotriene receptor antagonist (CysLT1)',
    strength: '5 mg',
    dosageForm: 'Chewable tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 chewable tablets in blisters',
    indications:
      'Add-on treatment of mild to moderate persistent asthma, alternative to low-dose inhaled corticosteroids in mild persistent asthma without recent serious attacks, and prophylaxis of exercise-induced asthma in paediatric patients aged 6 to 14 years.',
    dose:
      'Paediatric patients aged 6 to 14 years: One 5 mg chewable tablet once daily in the evening, taken at least 1 hour before or 2 hours after food.',
    contraindications:
      'Hypersensitivity to montelukast or excipients; phenylketonuria (if sweetened with aspartame).',
    adverseEffects:
      'Common: headache, abdominal pain, thirst, hyperkinesia, asthma, scaly and itchy skin. Monitor for neuropsychiatric changes (nightmares, behavioural changes).',
    storage:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Pediatrics', 'Pulmonology', 'Allergy & Immunology'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Airfast 5 mg Chewable Tablets Official Product Information',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each chewable tablet contains montelukast sodium equivalent to 5 mg montelukast (INN base: Montelukast).',
  },
  {
    brandName: 'Cardex 5 mg',
    genericName: 'Bisoprolol',
    activeIngredients: ['Bisoprolol fumarate'],
    drugClass: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets',
    indications:
      'Treatment of essential hypertension, stable chronic angina pectoris, and stable chronic heart failure with reduced systolic left ventricular function in addition to ACE inhibitors, diuretics, and optionally cardiac glycosides.',
    dose:
      'Hypertension and angina pectoris: Usual dose is 5 mg to 10 mg orally once daily in the morning with or without breakfast (maximum 20 mg once daily). Chronic heart failure: titrate gradually from 1.25 mg once daily up to target 10 mg once daily.',
    contraindications:
      'Hypersensitivity to bisoprolol; acute heart failure or decompensated heart failure requiring intravenous inotropic therapy; cardiogenic shock; second- or third-degree AV block (without a pacemaker); sick sinus syndrome; sinoatrial block; symptomatic bradycardia; symptomatic hypotension; severe bronchial asthma or severe COPD; severe peripheral arterial occlusive disease or Raynaud syndrome; untreated phaeochromocytoma; metabolic acidosis.',
    adverseEffects:
      'Bradycardia, worsening of pre-existing heart failure, dizziness, headache, feeling of coldness or numbness in the extremities, hypotension, gastrointestinal complaints (nausea, vomiting, diarrhoea, constipation), asthenia, fatigue.',
    storage: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Cardiovascular Portfolio (Cardex 5 mg)',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each film-coated tablet contains 5 mg bisoprolol fumarate.',
  },
  {
    brandName: 'Cardex 10 mg',
    genericName: 'Bisoprolol',
    activeIngredients: ['Bisoprolol fumarate'],
    drugClass: 'Cardioselective Beta-1 Adrenoceptor Blockers',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets',
    indications:
      'Maintenance treatment of essential hypertension, chronic stable angina pectoris, and stable chronic heart failure with reduced ejection fraction.',
    dose:
      '10 mg orally once daily in the morning with or without food. Do not discontinue beta-blocker therapy abruptly, particularly in patients with ischaemic heart disease.',
    contraindications:
      'Hypersensitivity to bisoprolol; acute/decompensated heart failure, cardiogenic shock, 2nd/3rd-degree AV block, sick sinus syndrome, symptomatic bradycardia or hypotension, severe bronchial asthma, severe peripheral arterial disease, untreated phaeochromocytoma, metabolic acidosis.',
    adverseEffects:
      'Bradycardia, dizziness, headache, cold extremities, hypotension, nausea, diarrhoea, fatigue.',
    storage: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Tabuk Pharmaceutical Manufacturing Co. — Cardiovascular Portfolio (Cardex 10 mg)',
        url: 'https://www.tabukpharmaceuticals.com/',
      },
    ],
    notes:
      'Official Tabuk Pharmaceutical Manufacturing Co. SmPC data. Each film-coated tablet contains 10 mg bisoprolol fumarate.',
  },
];

export const TABUK_PRODUCTS: AiProductDraft[] = RAW_TABUK.map((d) => ({
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

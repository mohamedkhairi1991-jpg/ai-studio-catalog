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

const RAW_AWAMEDICA: CompactDrug[] = [
  // 1. AwaZitro 500 mg (Azithromycin — Awamedica)
  {
    brandName: 'AwaZitro 500 mg',
    brandNameAr: 'أوازيترو 500 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) systemic antibacterial (ATC J01FA10)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Treatment of bacterial infections caused by azithromycin-susceptible organisms: acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, uncomplicated skin and soft tissue infections, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents ≥45 kg: 500 mg orally once daily for 3 consecutive days (total dose 1500 mg). For uncomplicated Chlamydia trachomatis genital infections: 1000 mg as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or any excipient.',
    adverseEffects:
      'Diarrhoea, abdominal pain, nausea, flatulence, vomiting, dyspepsia, headache, dizziness, dysgeusia. Rare: QT interval prolongation, hepatic dysfunction/cholestatic jaundice, Clostridioides difficile-associated diarrhoea.',
    storage:
      'Store below 30°C in a dry place in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT (Otolaryngology)', 'Internal Medicine', 'General Practice'],
    sources: [
      {
        title: 'Awamedica Pharmaceutical Company — Official Product Portfolio (AwaZitro 500 mg Film-Coated Tablets)',
        url: 'https://www.awamedica.com',
      },
    ],
    notes:
      'Official Awamedica Pharmaceutical Company (Erbil, Iraq) portfolio data. Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin base (INN base: Azithromycin).',
  },

  // 2. Atorvastatin Awa 40 mg (Atorvastatin — Awamedica)
  {
    brandName: 'Atorvastatin Awa 40 mg',
    brandNameAr: 'أتورفاستاتين أوا 40 ملغ',
    genericName: 'Atorvastatin',
    activeIngredients: ['Atorvastatin'],
    drugClass: 'HMG-CoA reductase inhibitor (statin) lipid-modifying agent (ATC C10AA05)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Reduction of elevated total cholesterol, LDL-cholesterol, apolipoprotein B, and triglycerides in adults, adolescents, and children aged 10 years or older with primary hypercholesterolaemia (including familial hypercholesterolaemia) or combined (mixed) hyperlipidaemia; homozygous familial hypercholesterolaemia; prevention of cardiovascular events in patients at high cardiovascular risk.',
    dose:
      'Adults: Usual starting dose is 10 mg or 20 mg once daily (40 mg once daily may be started in patients requiring >45% LDL-C reduction); dose range is 10 mg to 80 mg once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to atorvastatin or any excipient; active liver disease or unexplained persistent elevations of serum transaminases exceeding 3 times the upper limit of normal; pregnancy, breast-feeding, and women of child-bearing potential not using appropriate contraceptive measures.',
    adverseEffects:
      'Nasopharyngitis, hyperglycaemia, headache, pharyngolaryngeal pain, epistaxis, constipation, flatulence, dyspepsia, nausea, diarrhoea, myalgia, arthralgia, pain in extremity, muscle spasms, abnormal liver function tests, increased blood creatine kinase. Rare: myopathy, myositis, rhabdomyolysis.',
    storage:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology & Diabetes', 'Internal Medicine'],
    sources: [
      {
        title: 'Awamedica Pharmaceutical Company — Official Product Portfolio (Atorvastatin Awa 40 mg Film-Coated Tablets)',
        url: 'https://www.awamedica.com',
      },
    ],
    notes:
      'Official Awamedica Pharmaceutical Company (Erbil, Iraq) portfolio data. Each film-coated tablet contains atorvastatin calcium trihydrate equivalent to 40 mg atorvastatin base (INN base: Atorvastatin).',
  },

  // 3. AwaCarvedol 6.25 mg (Carvedilol — Awamedica)
  {
    brandName: 'AwaCarvedol 6.25 mg',
    brandNameAr: 'أواكارفيدول 6.25 ملغ',
    genericName: 'Carvedilol',
    activeIngredients: ['Carvedilol'],
    drugClass: 'Alpha- and beta-adrenoceptor blocking agent (ATC C07AG02)',
    strength: '6.25 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 30 tablets in blisters',
    indications:
      'Essential hypertension; chronic stable angina pectoris; adjunctive treatment of moderate to severe stable chronic heart failure.',
    dose:
      'Chronic heart failure: Initiate at 3.125 mg twice daily for 2 weeks; if tolerated, increase at intervals of not less than 2 weeks to 6.25 mg twice daily, then 12.5 mg twice daily, up to 25 mg twice daily. Take with food to slow absorption and reduce orthostatic effects.',
    contraindications:
      'Hypersensitivity to carvedilol or any excipient; unstable/decompensated heart failure; clinically manifest liver dysfunction; bronchospasm or asthma; second- or third-degree AV block (unless permanent pacemaker in place); severe bradycardia (<50 bpm); sick sinus syndrome; cardiogenic shock; severe hypotension (systolic BP <85 mmHg).',
    adverseEffects:
      'Dizziness, headache, fatigue, asthenia, hypotension, postural hypotension, bradycardia, oedema/fluid overload, dyspnoea, bronchitis, nausea, diarrhoea, vomiting, weight increase, visual disturbances.',
    storage:
      'Store below 25°C protected from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sources: [
      {
        title: 'Awamedica Pharmaceutical Company — Official Product Portfolio (AwaCarvedol 6.25 mg Tablets)',
        url: 'https://www.awamedica.com',
      },
    ],
    notes:
      'Official Awamedica Pharmaceutical Company (Erbil, Iraq) portfolio data. Each tablet contains 6.25 mg carvedilol (INN base: Carvedilol).',
  },

  // 4. Mefenamic Awa 250 mg (Mefenamic acid — Awamedica)
  {
    brandName: 'Mefenamic Awa 250 mg',
    brandNameAr: 'ميفيناميك أوا 250 ملغ',
    genericName: 'Mefenamic acid',
    activeIngredients: ['Mefenamic acid'],
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID), fenamate derivative (ATC M01AG01)',
    strength: '250 mg',
    dosageForm: 'Capsule, hard',
    route: 'Oral',
    packSize: 'Pack of 20 hard capsules in blisters',
    indications:
      'Symptomatic relief of mild to moderate pain including muscular, traumatic, dental, and postoperative pain, headache, osteoarthritis, rheumatoid arthritis, primary dysmenorrhoea, and dysfunctional menorrhagia.',
    dose:
      'Adults and adolescents over 14 years: 500 mg (two 250 mg capsules) orally three times daily, taken with or immediately after meals.',
    contraindications:
      'Hypersensitivity to mefenamic acid or any excipient; active or history of recurrent peptic ulcer/haemorrhage; inflammatory bowel disease; history of GI bleeding or perforation related to previous NSAID therapy; severe heart failure, hepatic failure, or renal failure; third trimester of pregnancy; aspirin/NSAID-induced asthma, rhinitis, or urticaria.',
    adverseEffects:
      'Abdominal pain, diarrhoea (discontinue if diarrhoea occurs), dyspepsia, nausea, vomiting, constipation, flatulence, peptic ulceration/GI bleeding, headache, dizziness, drowsiness, skin rash, haemolytic anaemia (with prolonged therapy).',
    storage:
      'Store below 25°C in a dry place in the original package.',
    specialties: ['Obstetrics & Gynecology', 'Rheumatology', 'Orthopedics', 'General Practice'],
    sources: [
      {
        title: 'Awamedica Pharmaceutical Company — Official Product Portfolio (Mefenamic Awa 250 mg Capsules)',
        url: 'https://www.awamedica.com',
      },
    ],
    notes:
      'Official Awamedica Pharmaceutical Company (Erbil, Iraq) portfolio data. Each hard capsule contains 250 mg mefenamic acid (INN base: Mefenamic acid).',
  },
];

export const AWAMEDICA_PRODUCTS: AiProductDraft[] = RAW_AWAMEDICA.map((d) => ({
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

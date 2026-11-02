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

const RAW_TEVA: CompactDrug[] = [
  // 1. Sumamed (Azithromycin — Pliva / Teva Pharmaceutical Industries Ltd.)
  {
    brandName: 'Sumamed 250 mg',
    brandNameAr: 'سوماميد 250 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '250 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 6 hard capsules in blister',
    indications:
      'Treatment of infections caused by azithromycin-susceptible organisms: acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, skin and soft tissue infections (erythema migrans, erysipelas, impetigo, secondary pyoderma), and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): Total dose of 1500 mg given either as 500 mg (two 250 mg capsules) once daily for 3 days, or 500 mg on Day 1 followed by 250 mg once daily on Days 2 to 5. Uncomplicated Chlamydia trachomatis genital infections: 1000 mg (four 250 mg capsules) as a single oral dose. Hard capsules should be taken at least 1 hour before or 2 hours after a meal.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or to any of the excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea, decreased lymphocyte count, increased blood eosinophils. Uncommon: candidiasis, dizziness, somnolence, dysgeusia, palpitations, gastritis, constipation, flatulence, hepatitis, rash, pruritus, ECG QT prolongation.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA Article-30 Referral — Sumamed and associated names (azithromycin) Product Information (Pliva / Teva)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/sumamed',
      },
    ],
    notes:
      'Official EMA Article-30 referral product information (Pliva / Teva Pharmaceutical Industries Ltd.). Each hard capsule contains azithromycin dihydrate equivalent to 250 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Sumamed 500 mg',
    brandNameAr: 'سوماميد 500 ملغ',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 3 film-coated tablets in blister',
    indications:
      'Treatment of upper and lower respiratory tract infections (acute bacterial sinusitis, acute otitis media, pharyngitis/tonsillitis, acute exacerbation of chronic bronchitis, mild to moderate community-acquired pneumonia), mild to moderate skin and soft tissue infections (including erythema migrans), and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    dose:
      'Adults and adolescents (>= 45 kg): 500 mg (1 tablet) once daily for 3 consecutive days (total dose 1500 mg). Erythema migrans: 1000 mg on Day 1 followed by 500 mg once daily on Days 2 to 5 (total dose 3000 mg). Uncomplicated Chlamydia trachomatis infection: 1000 mg (2 tablets) as a single oral dose. Film-coated tablets may be taken with or without food.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, nausea, vomiting, abdominal pain, transient changes in leukocyte and eosinophil counts. Uncommon: dizziness, dysgeusia, palpitations, flatulence, gastritis, rash, pruritus, QT prolongation.',
    storage:
      'Store below 25°C in the original package.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'ENT', 'Dermatology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA Article-30 Referral — Sumamed and associated names (azithromycin) Product Information (Pliva / Teva)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/sumamed',
      },
    ],
    notes:
      'Official EMA Article-30 referral product information (Pliva / Teva Pharmaceutical Industries Ltd.). Each film-coated tablet contains azithromycin dihydrate equivalent to 500 mg azithromycin (INN base: Azithromycin).',
  },
  {
    brandName: 'Sumamed Forte 200 mg/5 mL',
    brandNameAr: 'سوماميد فورت 200 ملغ/5 مل',
    genericName: 'Azithromycin',
    activeIngredients: ['Azithromycin'],
    drugClass: 'Macrolide (azalide) antibacterial',
    strength: '200 mg/5 mL',
    dosageForm: 'Powder for oral suspension',
    route: 'Oral',
    packSize: 'Bottle for preparation of 15 mL, 20 mL, 30 mL, or 37.5 mL oral suspension with dosing syringe/spoon',
    indications:
      'Paediatric and adult bacterial infections caused by azithromycin-susceptible organisms: acute bacterial otitis media, acute bacterial sinusitis, streptococcal pharyngitis and tonsillitis, community-acquired pneumonia, and skin and soft tissue infections (impetigo, erysipelas, erythema migrans).',
    dose:
      'Children and adolescents (< 45 kg): 10 mg/kg body weight (0.25 mL/kg of 200 mg/5 mL suspension) once daily for 3 consecutive days (total dose 30 mg/kg); or 10 mg/kg on Day 1 followed by 5 mg/kg once daily on Days 2 to 5. For streptococcal pharyngitis/tonsillitis: 10 mg/kg or 20 mg/kg once daily for 3 days (maximum daily dose 500 mg).',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or excipients.',
    adverseEffects:
      'Very common: diarrhoea. Common: headache, vomiting, abdominal pain, nausea. Uncommon: oral/vaginal candidiasis, dizziness, somnolence, rash, pruritus, urticaria.',
    storage:
      'Dry powder: store below 25°C. Reconstituted suspension: store below 25°C for up to 5–10 days according to pack volume.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'ENT', 'Pulmonology'],
    sources: [
      {
        title: 'EMA Article-30 Referral — Sumamed and associated names (azithromycin) Product Information (Pliva / Teva)',
        url: 'https://www.ema.europa.eu/en/medicines/human/referrals/sumamed',
      },
    ],
    notes:
      'Official EMA Article-30 referral product information (Pliva / Teva Pharmaceutical Industries Ltd.). After reconstitution, each 5 mL of oral suspension contains azithromycin dihydrate equivalent to 200 mg azithromycin (INN base: Azithromycin).',
  },

  // 2. Copaxone (Glatiramer acetate — Teva GmbH)
  {
    brandName: 'Copaxone 20 mg/mL',
    brandNameAr: 'كوبكسون 20 ملغ/مل',
    genericName: 'Glatiramer acetate',
    activeIngredients: ['Glatiramer acetate'],
    drugClass: 'Immunomodulating polypeptide disease-modifying therapy for multiple sclerosis',
    strength: '20 mg/mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 28 pre-filled syringes of 1 mL',
    indications:
      'Treatment of relapsing forms of multiple sclerosis (MS) in ambulatory patients (able to walk without assistance). Copaxone is not indicated in primary or secondary progressive MS.',
    dose:
      'Adults: 20 mg of glatiramer acetate (1 pre-filled syringe of 1 mL) administered as a subcutaneous injection once daily. Rotate injection sites daily (abdomen, thighs, hips, upper arms).',
    contraindications:
      'Hypersensitivity to glatiramer acetate or to any of the excipients (mannitol).',
    adverseEffects:
      'Very common: injection site reactions (erythema, pain, mass, pruritus, oedema, inflammation, lipoatrophy), immediate post-injection reaction (vasodilatation, flushing, chest pain, dyspnoea, palpitations, tachycardia), arthralgia, back pain, headache, anxiety, depression, nausea, rash, asthenia, influenza-like illness.',
    storage:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled syringes in the outer carton in order to protect from light. May be kept at room temperature (15°C to 25°C) on a one-time basis for up to 1 month.',
    specialties: ['Neurology'],
    sources: [
      {
        title: 'UK EMC — Copaxone 20 mg/ml Solution for Injection in Pre-Filled Syringe SmPC (Teva UK Limited)',
        url: 'https://www.medicines.org.uk/emc/product/3556/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Teva Pharmaceutical Industries Ltd.). Each 1 mL pre-filled syringe contains 20 mg glatiramer acetate (equivalent to 18 mg glatiramer base).',
  },
  {
    brandName: 'Copaxone 40 mg/mL',
    brandNameAr: 'كوبكسون 40 ملغ/مل',
    genericName: 'Glatiramer acetate',
    activeIngredients: ['Glatiramer acetate'],
    drugClass: 'Immunomodulating polypeptide disease-modifying therapy for multiple sclerosis',
    strength: '40 mg/mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 12 pre-filled syringes of 1 mL',
    indications:
      'Treatment of relapsing forms of multiple sclerosis (MS). Not indicated in primary or secondary progressive MS.',
    dose:
      'Adults: 40 mg of glatiramer acetate (1 pre-filled syringe of 1 mL) administered by subcutaneous injection three times a week, with at least 48 hours between injections.',
    contraindications:
      'Hypersensitivity to glatiramer acetate or to any of the excipients (mannitol).',
    adverseEffects:
      'Very common: injection site reactions (erythema, pain, mass, pruritus, oedema), immediate post-injection reaction (flushing, chest tightness, dyspnoea, palpitations, tachycardia), headache, arthralgia, back pain, nausea, rash, asthenia.',
    storage:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light. May be stored once at 15°C–25°C for up to 1 month.',
    specialties: ['Neurology'],
    sources: [
      {
        title: 'UK EMC — Copaxone 40 mg/ml Solution for Injection in Pre-Filled Syringe SmPC (Teva UK Limited)',
        url: 'https://www.medicines.org.uk/emc/product/7046/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Teva Pharmaceutical Industries Ltd.). Three-times-weekly 40 mg/mL subcutaneous formulation.',
  },

  // 3. Ajovy (Fremanezumab — Teva GmbH)
  {
    brandName: 'Ajovy 225 mg',
    brandNameAr: 'أجوفي 225 ملغ',
    genericName: 'Fremanezumab',
    activeIngredients: ['Fremanezumab'],
    drugClass: 'Humanised anti-CGRP (calcitonin gene-related peptide) monoclonal antibody',
    strength: '225 mg',
    dosageForm: 'Solution for injection in pre-filled syringe or pre-filled pen',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 or 3 pre-filled syringes/pens of 1.5 mL',
    indications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month.',
    dose:
      'Two dosing options are available: 225 mg once monthly (monthly dosing) OR 675 mg every 3 months (quarterly dosing, administered as three consecutive 225 mg subcutaneous injections) into the abdomen, thigh, or upper arm. Treatment benefit should be assessed within 3 months after initiation.',
    contraindications:
      'Hypersensitivity to fremanezumab or to any of the excipients.',
    adverseEffects:
      'Very common: injection site pain, induration, and erythema. Common: injection site pruritus. Uncommon: injection site rash, hypersensitivity reactions (rash, pruritus, urticaria, swelling).',
    storage:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled syringe or pen in the outer carton to protect from light. May be stored unrefrigerated for up to 7 days at a temperature up to 30°C.',
    specialties: ['Neurology'],
    sources: [
      {
        title: 'EMA EPAR — Ajovy (fremanezumab) Product Information (Teva GmbH)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ajovy',
      },
    ],
    notes:
      'Official EMA EPAR product information (Teva GmbH). Each 1.5 mL pre-filled syringe or pre-filled pen contains 225 mg fremanezumab.',
  },

  // 4. Azilect (Rasagiline — Teva B.V.)
  {
    brandName: 'Azilect 1 mg',
    brandNameAr: 'أزيليكت 1 ملغ',
    genericName: 'Rasagiline',
    activeIngredients: ['Rasagiline'],
    drugClass: 'Selective irreversible monoamine oxidase-B (MAO-B) inhibitor',
    strength: '1 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Pack of 28 or 30 tablets in blisters',
    indications:
      'Treatment of idiopathic Parkinson disease (PD) in adults as monotherapy (without levodopa) or as adjunct therapy (with levodopa) in patients with end-of-dose fluctuations.',
    dose:
      'Recommended dose is 1 mg (one tablet) once daily, to be taken with or without levodopa, and with or without food.',
    contraindications:
      'Hypersensitivity to rasagiline or excipients; concomitant treatment with other monoamine oxidase (MAO) inhibitors (including medicinal and natural products without prescription, e.g. St. John’s Wort) or pethidine (at least 14 days must elapse between discontinuation of rasagiline and initiation of MAO inhibitors or pethidine); severe hepatic impairment.',
    adverseEffects:
      'Very common: dyskinesia (in adjunct therapy with levodopa), headache (in monotherapy). Common: influenza, skin carcinoma, leukopenia, allergic reaction, depression, hallucinations, conjunctivitis, vertigo, angina pectoris, orthostatic hypotension, rhinitis, flatulence, abdominal pain, constipation, nausea and vomiting, dry mouth, dermatitis, musculoskeletal pain, neck pain, arthritis, urinary urgency, fever, malaise, weight decreased, fall.',
    storage:
      'Do not store above 25°C.',
    specialties: ['Neurology'],
    sources: [
      {
        title: 'EMA EPAR — Azilect (rasagiline) Product Information (Teva B.V.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/azilect',
      },
    ],
    notes:
      'Official EMA EPAR product information (Teva B.V.). Each tablet contains rasagiline mesilate equivalent to 1 mg rasagiline (INN base: Rasagiline).',
  },

  // 5. Lonquex (Lipegfilgrastim — Teva B.V.)
  {
    brandName: 'Lonquex 6 mg',
    brandNameAr: 'لونكويكس 6 ملغ',
    genericName: 'Lipegfilgrastim',
    activeIngredients: ['Lipegfilgrastim'],
    drugClass: 'Long-acting glycoPEGylated recombinant human granulocyte colony-stimulating factor (G-CSF)',
    strength: '6 mg',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 pre-filled syringe of 0.6 mL with safety device',
    indications:
      'Reduction in the duration of neutropenia and the incidence of febrile neutropenia in adult patients and children aged 2 years and older treated with cytotoxic chemotherapy for malignancy (with the exception of chronic myeloid leukaemia and myelodysplastic syndromes).',
    dose:
      'Adults and children (>= 45 kg): One 6 mg (0.6 mL) subcutaneous injection is recommended for each chemotherapy cycle, given approximately 24 hours after cytotoxic chemotherapy into the abdomen, thigh, or upper arm.',
    contraindications:
      'Hypersensitivity to lipegfilgrastim or to any of the excipients.',
    adverseEffects:
      'Very common: musculoskeletal pain and bone pain. Common: thrombocytopenia, hypokalaemia, headache, skin reactions (erythema, rash), chest pain, haemoptysis, injection site pain. Uncommon: leukocytosis, splenomegaly, capillary leak syndrome, acute respiratory distress syndrome (ARDS).',
    storage:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled syringe in the outer carton in order to protect from light. May be removed from the refrigerator and stored below 25°C for a single period of up to 7 days.',
    specialties: ['Oncology', 'Hematology'],
    sources: [
      {
        title: 'EMA EPAR — Lonquex (lipegfilgrastim) Product Information (Teva B.V.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lonquex',
      },
    ],
    notes:
      'Official EMA EPAR product information (Teva B.V.). Each 0.6 mL pre-filled syringe contains 6 mg lipegfilgrastim.',
  },

  // 6. DuoResp Spiromax (Budesonide + Formoterol — Teva Pharma B.V.)
  {
    brandName: 'DuoResp Spiromax 160 micrograms/4.5 micrograms',
    brandNameAr: 'ديوريسب سبيروماكس 160 ميكروغرام/4.5 ميكروغرام',
    genericName: 'Budesonide + Formoterol',
    activeIngredients: ['Budesonide', 'Formoterol'],
    drugClass: 'Inhaled corticosteroid (ICS) and long-acting beta2-agonist (LABA) fixed-dose combination',
    strength: '160 micrograms/4.5 micrograms',
    dosageForm: 'Inhalation powder',
    route: 'Inhalation',
    packSize: '1 Spiromax multi-dose dry powder inhaler containing 120 doses',
    indications:
      'Regular treatment of asthma in adults and adolescents (12 years and older) where use of a combination (inhaled corticosteroid and long-acting beta2-adrenoceptor agonist) is appropriate (maintenance therapy, or both maintenance and reliever therapy — MART); and symptomatic treatment of adults with COPD with FEV1 < 70% predicted normal and a history of repeated exacerbations.',
    dose:
      'Asthma maintenance therapy: 1–2 inhalations twice daily (maximum 4 inhalations twice daily). Asthma maintenance and reliever therapy (MART): 1 inhalation twice daily (or 2 inhalations once daily) plus 1 additional inhalation as needed for symptom relief (maximum 6 inhalations on any single occasion; maximum 8 inhalations daily). COPD: 2 inhalations twice daily.',
    contraindications:
      'Hypersensitivity to budesonide, formoterol, or to the excipient lactose (which contains small amounts of milk proteins).',
    adverseEffects:
      'Common: candidiasis of the oropharynx, pneumonia (in COPD patients), headache, tremor, palpitations, mild irritation in the throat, coughing, dysphonia (hoarseness), muscle cramps.',
    storage:
      'Do not store above 25°C. Keep the mouthpiece cover closed after removal of the foil wrapping. Use within 6 months of opening the foil pouch.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — DuoResp Spiromax (budesonide / formoterol) Product Information (Teva Pharma B.V.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/duoresp-spiromax',
      },
    ],
    notes:
      'Official EMA EPAR product information (Teva Pharma B.V.). Each delivered dose contains 160 micrograms budesonide and 4.5 micrograms formoterol fumarate dihydrate (INN bases: Budesonide + Formoterol).',
  },
  {
    brandName: 'DuoResp Spiromax 320 micrograms/9 micrograms',
    brandNameAr: 'ديوريسب سبيروماكس 320 ميكروغرام/9 ميكروغرام',
    genericName: 'Budesonide + Formoterol',
    activeIngredients: ['Budesonide', 'Formoterol'],
    drugClass: 'Inhaled corticosteroid (ICS) and long-acting beta2-agonist (LABA) fixed-dose combination',
    strength: '320 micrograms/9 micrograms',
    dosageForm: 'Inhalation powder',
    route: 'Inhalation',
    packSize: '1 Spiromax multi-dose dry powder inhaler containing 60 doses',
    indications:
      'Regular maintenance treatment of asthma in adults and adolescents aged 12 years and older (with a separate rapid-acting bronchodilator for rescue); and symptomatic treatment of adults with COPD with FEV1 < 70% predicted normal and a history of repeated exacerbations.',
    dose:
      'Asthma maintenance: 1 inhalation twice daily (up to a maximum of 2 inhalations twice daily in adults). Not intended for MART reliever use. COPD: 1 inhalation twice daily.',
    contraindications:
      'Hypersensitivity to budesonide, formoterol, or lactose.',
    adverseEffects:
      'Common: oropharyngeal candidiasis, pneumonia (in COPD patients), headache, tremor, palpitations, throat irritation, cough, dysphonia, muscle cramps.',
    storage:
      'Do not store above 25°C. Keep the mouthpiece cover closed. Use within 6 months of removing the foil pouch.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — DuoResp Spiromax (budesonide / formoterol) Product Information (Teva Pharma B.V.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/duoresp-spiromax',
      },
    ],
    notes:
      'Official EMA EPAR product information (Teva Pharma B.V.). Each delivered dose contains 320 micrograms budesonide and 9 micrograms formoterol fumarate dihydrate (INN bases: Budesonide + Formoterol).',
  },
];

export const TEVA_PRODUCTS: AiProductDraft[] = RAW_TEVA.map((d) => ({
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

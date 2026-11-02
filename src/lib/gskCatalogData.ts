import type { AiDraftSource, AiProductDraft } from './catalog';

const GSK_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactGskDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
  drugClassNameEn: string;
  dosageForm: string;
  strength: string;
  route: string;
  packSize: string;
  indications: string;
  adultDosage: string;
  contraindications: string;
  sideEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

function toGskProductDraft(item: CompactGskDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.genericName.split(' + ').map((s) => s.trim()),
    drugClass: item.drugClassNameEn,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.indications,
      usualAdultDose: item.adultDosage,
      contraindications: item.contraindications,
      commonAdverseEffects: item.sideEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: GSK_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official GlaxoSmithKline plc regulatory monograph (EMA EPAR / SmPC / UK EMC); saved as draft pending verification.',
  };
}

const GSK_COMPACT_PRODUCTS: CompactGskDrug[] = [
  // =========================================================================
  // 1. ANTI-INFECTIVES & ANTIVIRALS (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Augmentin 625 mg',
    brandNameAr: 'أوغمنتين 625 ملغم',
    genericName: 'Amoxicillin + Clavulanic Acid',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg / 125 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets (foil pouch blister pack)',
    indications:
      'Treatment of bacterial infections in adults and children: acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscesses with spreading cellulitis), and bone and joint infections (osteomyelitis).',
    adultDosage:
      'Standard dose (adults and children ≥40 kg): one 500 mg/125 mg (625 mg) tablet taken three times daily at the start of a meal to minimize gastrointestinal intolerance and optimize absorption.',
    contraindications:
      'Hypersensitivity to amoxicillin, clavulanic acid, any penicillin, or any excipient; history of a severe immediate hypersensitivity reaction (e.g. anaphylaxis) to another beta-lactam agent (cephalosporin, carbapenem, or monobactam); history of jaundice or hepatic impairment due to amoxicillin/clavulanic acid.',
    sideEffects:
      'Mucocutaneous candidiasis, diarrhea, nausea, vomiting, dizziness, headache, dyspepsia, elevated AST and/or ALT, skin rash, pruritus, urticaria, and rare antibiotic-associated colitis or cholestatic hepatitis.',
    storageConditions: 'Do not store above 25°C. Store in the original package in order to protect from moisture. Use within 30 days of opening the foil pouch.',
    specialties: ['Internal Medicine', 'Pulmonology', 'Otolaryngology', 'Urology', 'General Surgery'],
    sourceTitle: 'Augmentin (amoxicillin / clavulanic acid) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/augmentin',
  },
  {
    brandName: 'Augmentin 1 g',
    brandNameAr: 'أوغمنتين 1 غم',
    genericName: 'Amoxicillin + Clavulanic Acid',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '875 mg / 125 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets (foil pouch blister pack)',
    indications:
      'Acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections (cellulitis, animal bites, severe dental abscesses), and osteomyelitis.',
    adultDosage:
      'Adults and children ≥40 kg: one 875 mg/125 mg (1 g) tablet twice daily (or one 875 mg/125 mg tablet three times daily for severe infections such as otitis media, sinusitis, lower respiratory tract infections, and urinary tract infections), taken at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or clavulanic acid; history of severe immediate hypersensitivity reaction to another beta-lactam antibacterial; history of jaundice/hepatic impairment associated with amoxicillin/clavulanic acid.',
    sideEffects:
      'Diarrhea, mucocutaneous candidiasis, nausea, vomiting, abdominal pain, dyspepsia, elevated hepatic transaminases, skin rash, and urticaria.',
    storageConditions: 'Do not store above 25°C. Store in the original foil pouch to protect from moisture.',
    specialties: ['Internal Medicine', 'Pulmonology', 'Otolaryngology', 'Urology', 'General Surgery'],
    sourceTitle: 'Augmentin (amoxicillin / clavulanic acid) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/augmentin',
  },
  {
    brandName: 'Augmentin 457 mg/5 mL',
    brandNameAr: 'أوغمنتين 457 ملغم / 5 مل',
    genericName: 'Amoxicillin + Clavulanic Acid',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for oral suspension',
    strength: '400 mg / 57 mg per 5 mL',
    route: 'Oral',
    packSize: '1 bottle × 70 mL (after reconstitution)',
    indications:
      'Pediatric treatment of acute bacterial sinusitis, acute otitis media, acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, and bone and joint infections.',
    adultDosage:
      'Primarily for children <40 kg: 25 mg/3.6 mg/kg/day to 45 mg/6.4 mg/kg/day given as two divided doses (up to 70 mg/10 mg/kg/day in two divided doses for otitis media, sinusitis, and lower respiratory tract infections), administered at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or clavulanic acid; history of severe immediate hypersensitivity to another beta-lactam; history of amoxicillin/clavulanic acid-induced jaundice or hepatic dysfunction; phenylketonuria (contains aspartame).',
    sideEffects:
      'Diarrhea, nausea, vomiting, mucocutaneous candidiasis, rash, urticaria, and reversible superficial tooth discoloration.',
    storageConditions: 'Store dry powder below 25°C. Store reconstituted suspension in a refrigerator (2°C to 8°C) and use within 7 days; do not freeze.',
    specialties: ['Pediatrics', 'Otolaryngology', 'Pulmonology'],
    sourceTitle: 'Augmentin (amoxicillin / clavulanic acid) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/augmentin',
  },
  {
    brandName: 'Augmentin ES 600 mg/42.9 mg per 5 mL',
    brandNameAr: 'أوغمنتين إي إس 600 ملغم / 42.9 ملغم لكل 5 مل',
    genericName: 'Amoxicillin + Clavulanic Acid',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for oral suspension',
    strength: '600 mg / 42.9 mg per 5 mL',
    route: 'Oral',
    packSize: '1 bottle × 100 mL (after reconstitution)',
    indications:
      'Treatment of community-acquired pneumonia and acute otitis media in pediatric patients aged at least 3 months and weighing less than 40 kg, particularly where penicillin-resistant Streptococcus pneumoniae is suspected.',
    adultDosage:
      'Pediatric formulation (<40 kg, ≥3 months): recommended dose is 90 mg/6.4 mg/kg/day in two divided doses every 12 hours for 10 days, taken at the start of a meal.',
    contraindications:
      'Hypersensitivity to penicillins or other beta-lactams; history of amoxicillin/clavulanic acid-associated cholestatic jaundice or hepatic dysfunction; phenylketonuria.',
    sideEffects:
      'Diarrhea, diaper dermatitis, vomiting, nausea, mucocutaneous candidiasis, rash, and superficial tooth discoloration.',
    storageConditions: 'Store dry powder below 25°C. Store reconstituted suspension at 2°C to 8°C and discard after 10 days.',
    specialties: ['Pediatrics', 'Otolaryngology', 'Pulmonology'],
    sourceTitle: 'Augmentin (amoxicillin / clavulanic acid) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/augmentin',
  },
  {
    brandName: 'Augmentin IV 1.2 g',
    brandNameAr: 'أوغمنتين وريدي 1.2 غم',
    genericName: 'Amoxicillin + Clavulanic Acid',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for solution for injection/infusion',
    strength: '1000 mg / 200 mg',
    route: 'Intravenous',
    packSize: '10 vials × 1.2 g',
    indications:
      'Severe infections of the ear, nose, and throat (mastoiditis, peritonsillar infections, epiglottitis, sinusitis), acute exacerbations of chronic bronchitis, community-acquired pneumonia, cystitis, pyelonephritis, skin and soft tissue infections, bone and joint infections, intra-abdominal infections, female genital infections, and prophylaxis against infections associated with major surgical procedures in adults.',
    adultDosage:
      'Adults and children ≥40 kg: 1000 mg/200 mg (1.2 g) every 8 hours (or every 6 hours for more severe infections) by slow intravenous injection over 3 to 4 minutes or intravenous infusion over 30 to 40 minutes. Surgical prophylaxis: 1.2 g at induction of anesthesia.',
    contraindications:
      'Hypersensitivity to penicillins or clavulanic acid; history of severe immediate hypersensitivity reaction to another beta-lactam agent; history of jaundice/hepatic impairment due to amoxicillin/clavulanic acid.',
    sideEffects:
      'Thrombophlebitis at injection site, diarrhea, mucocutaneous candidiasis, nausea, vomiting, rash, pruritus, urticaria, and transient increases in AST/ALT.',
    storageConditions: 'Do not store above 25°C. Store in the original package to protect from moisture. Use immediately after reconstitution.',
    specialties: ['Internal Medicine', 'General Surgery', 'Pulmonology', 'Obstetrics and Gynecology', 'Urology'],
    sourceTitle: 'Augmentin (amoxicillin / clavulanic acid) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/augmentin',
  },
  {
    brandName: 'Valtrex 500 mg',
    brandNameAr: 'فالتريكس 500 ملغم',
    genericName: 'Valaciclovir',
    drugClassNameEn: 'Nucleoside Analogue Antivirals',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '42 film-coated tablets (blister pack)',
    indications:
      'Treatment of herpes zoster (shingles) and ophthalmic zoster in immunocompetent adults; treatment and suppression of herpes simplex virus (HSV) infections of the skin and mucous membranes including initial and recurrent genital herpes and herpes labialis; reduction of transmission of genital herpes; prophylaxis of cytomegalovirus (CMV) infection and disease following solid organ transplantation.',
    adultDosage:
      'Herpes zoster: 1000 mg (two 500 mg tablets) three times daily for 7 days. Initial HSV genital herpes: 500 mg twice daily for up to 10 days. Recurrent HSV treatment: 500 mg twice daily for 3 to 5 days. HSV suppression (immunocompetent): 500 mg once daily. Herpes labialis: 2000 mg twice in one day (12 hours apart). CMV prophylaxis post-transplant: 2000 mg four times daily. Adjust dose in renal impairment.',
    contraindications:
      'Hypersensitivity to valaciclovir, aciclovir, or any of the excipients.',
    sideEffects:
      'Headache, nausea, dizziness, vomiting, diarrhea, photosensitivity, rash, pruritus, dyspnea, reversible neurological reactions (confusion, agitation, hallucinations, particularly in renal impairment), and elevated liver enzymes.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'Internal Medicine', 'Infectious Diseases', 'Obstetrics and Gynecology', 'Ophthalmology'],
    sourceTitle: 'Valtrex (valaciclovir) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valtrex',
  },
  {
    brandName: 'Valtrex 1000 mg',
    brandNameAr: 'فالتريكس 1000 ملغم',
    genericName: 'Valaciclovir',
    drugClassNameEn: 'Nucleoside Analogue Antivirals',
    dosageForm: 'Film-coated tablet',
    strength: '1000 mg',
    route: 'Oral',
    packSize: '21 film-coated tablets (blister pack)',
    indications:
      'Herpes zoster (shingles) and ophthalmic zoster, herpes labialis (cold sores), treatment and suppression of mucocutaneous and genital herpes simplex infections, and CMV prophylaxis following solid organ transplantation.',
    adultDosage:
      'Herpes zoster: one 1000 mg tablet three times daily for 7 days. Herpes labialis: two 1000 mg tablets (2000 mg) twice daily for 1 day (taken 12 hours apart). CMV prophylaxis post-solid organ transplant: two 1000 mg tablets (2000 mg) four times daily initiated as early as possible post-transplant. Reduce dose in renal impairment.',
    contraindications:
      'Hypersensitivity to valaciclovir, aciclovir, or any excipient.',
    sideEffects:
      'Headache, nausea, dizziness, abdominal discomfort, vomiting, diarrhea, rash, photosensitivity, and reversible neurotoxicity or renal insufficiency if inadequately hydrated or unadjusted in renal impairment.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'Internal Medicine', 'Ophthalmology', 'Nephrology'],
    sourceTitle: 'Valtrex (valaciclovir) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/valtrex',
  },
  {
    brandName: 'Zeffix 100 mg',
    brandNameAr: 'زيفيكس 100 ملغم',
    genericName: 'Lamivudine',
    drugClassNameEn: 'Nucleoside Reverse Transcriptase Inhibitors (Anti-HBV Antivirals)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Treatment of chronic hepatitis B in adults with compensated liver disease with evidence of active viral replication, persistently elevated serum alanine aminotransferase (ALT) levels, and histological evidence of active liver inflammation and/or fibrosis, or decompensated liver disease in combination with a second agent without cross-resistance to lamivudine.',
    adultDosage:
      'One 100 mg tablet once daily with or without food. Dose must be reduced in patients with moderate-to-severe renal impairment (creatinine clearance <50 mL/min) using the oral solution.',
    contraindications:
      'Hypersensitivity to lamivudine or to any of the excipients.',
    sideEffects:
      'ALT and creatine phosphokinase (CPK) elevations, headache, insomnia, cough, nasal symptoms, nausea, vomiting, abdominal pain/cramps, diarrhea, rash, alopecia, arthralgia, muscle disorders, fatigue, malaise, pyrexia, and post-treatment hepatitis flares upon discontinuation.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Zeffix (lamivudine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zeffix',
  },
  {
    brandName: 'Tivicay 50 mg',
    brandNameAr: 'تيفيكاي 50 ملغم',
    genericName: 'Dolutegravir',
    drugClassNameEn: 'HIV Integrase Strand Transfer Inhibitors (INSTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (bottle)',
    indications:
      'In combination with other anti-retroviral medicinal products for the treatment of Human Immunodeficiency Virus (HIV) infected adults, adolescents, and children of at least 6 years of age or older and weighing at least 14 kg.',
    adultDosage:
      'HIV-1 without documented or clinically suspected integrase class resistance: 50 mg orally once daily. Switch to 50 mg twice daily when coadministered with efavirenz, nevirapine, tipranavir/ritonavir, etravirine (without boosted PI), carbamazepine, oxcarbazepine, phenytoin, phenobarbital, St John’s Wort, or rifampicin, or in patients with documented/suspected INSTI resistance.',
    contraindications:
      'Hypersensitivity to dolutegravir or any excipient; coadministration with medicinal products with narrow therapeutic windows that are substrates of organic cation transporter 2 (OCT2), including fampridine (dalfampridine).',
    sideEffects:
      'Insomnia, abnormal dreams, depression, anxiety, headache, dizziness, nausea, diarrhea, vomiting, flatulence, upper abdominal pain, rash, pruritus, fatigue, weight gain, and elevated hepatic transaminases and creatine phosphokinase.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Tivicay (dolutegravir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tivicay',
  },
  {
    brandName: 'Triumeq 50 mg/600 mg/300 mg',
    brandNameAr: 'تريوميك 50 ملغم / 600 ملغم / 300 ملغم',
    genericName: 'Dolutegravir + Abacavir + Lamivudine',
    drugClassNameEn: 'Single-Tablet HIV Antiretroviral Combinations (INSTI + 2 NRTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 600 mg / 300 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (bottle)',
    indications:
      'Treatment of Human Immunodeficiency Virus (HIV) infected adults, adolescents, and children weighing at least 25 kg (requires negative screening for the HLA-B*5701 allele prior to initiation).',
    adultDosage:
      'One 50 mg/600 mg/300 mg film-coated tablet once daily with or without food.',
    contraindications:
      'Hypersensitivity to dolutegravir, abacavir, or lamivudine; patients positive for the HLA-B*5701 allele; coadministration with fampridine (dalfampridine).',
    sideEffects:
      'Abacavir hypersensitivity reaction (fever, rash, GI/respiratory symptoms—never rechallenge), insomnia, headache, nausea, diarrhea, fatigue, depression, abnormal dreams, dizziness, and weight increase.',
    storageConditions: 'Store in the original package in order to protect from moisture. Keep the bottle tightly closed; do not remove the desiccant.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Triumeq (dolutegravir / abacavir / lamivudine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/triumeq',
  },
  {
    brandName: 'Dovato 50 mg/300 mg',
    brandNameAr: 'دوفاتو 50 ملغم / 300 ملغم',
    genericName: 'Dolutegravir + Lamivudine',
    drugClassNameEn: 'Two-Drug HIV Antiretroviral Combinations (INSTI + NRTI)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 300 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (bottle or blister pack)',
    indications:
      'Treatment of Human Immunodeficiency Virus type 1 (HIV-1) infection in adults and adolescents above 12 years of age weighing at least 40 kg, with no known or suspected resistance to the integrase inhibitor class, or lamivudine.',
    adultDosage:
      'One 50 mg/300 mg tablet once daily with or without food.',
    contraindications:
      'Hypersensitivity to dolutegravir or lamivudine; coadministration with narrow-therapeutic-window OCT2 substrates such as fampridine.',
    sideEffects:
      'Headache, diarrhea, nausea, insomnia, fatigue, dizziness, depression, anxiety, abnormal dreams, somnolence, flatulence, abdominal pain, and weight gain.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Dovato (dolutegravir / lamivudine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/dovato',
  },

  // =========================================================================
  // 2. RESPIRATORY & ALLERGY (22 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Ventolin Evohaler 100 mcg',
    brandNameAr: 'فنتولين إيفوهيلر 100 مايكروغرام',
    genericName: 'Salbutamol',
    drugClassNameEn: 'Short-Acting Beta-2 Adrenergic Agonists (SABAs)',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '100 mcg / actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (200 actuations)',
    indications:
      'Symptomatic relief and prevention of bronchospasm in bronchial asthma and reversible airways obstruction associated with chronic obstructive pulmonary disease (COPD), including prevention of allergen- or exercise-induced bronchospasm.',
    adultDosage:
      'Acute bronchospasm relief: 100 or 200 mcg (1 or 2 puffs) as needed. Prevention of allergen- or exercise-induced bronchospasm: 200 mcg (2 puffs) 10 to 15 minutes before exposure or challenge. Maximum 800 mcg (8 puffs) in 24 hours.',
    contraindications:
      'Hypersensitivity to salbutamol or any excipient; non-IV formulations of salbutamol must not be used to arrest uncomplicated premature labor or threatened abortion.',
    sideEffects:
      'Tremor, headache, tachycardia, palpitations, muscle cramps, mouth and throat irritation, peripheral vasodilatation, hypokalemia (at high doses), and rare paradoxical bronchospasm.',
    storageConditions: 'Store below 30°C. Protect from frost and direct sunlight. Pressurised canister: do not puncture, break, or burn.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'Ventolin Evohaler 100 micrograms (salbutamol) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/850/pil',
  },
  {
    brandName: 'Ventolin Nebules 2.5 mg/2.5 mL',
    brandNameAr: 'فنتولين نبيولز 2.5 ملغم / 2.5 مل',
    genericName: 'Salbutamol',
    drugClassNameEn: 'Short-Acting Beta-2 Adrenergic Agonists (SABAs)',
    dosageForm: 'Nebuliser solution',
    strength: '2.5 mg / 2.5 mL',
    route: 'Inhalation',
    packSize: '20 unit-dose ampoules × 2.5 mL',
    indications:
      'Routine management of chronic bronchospasm unresponsive to conventional therapy and treatment of acute severe asthma (status asthmaticus).',
    adultDosage:
      '2.5 mg (one Nebule) administered via a suitable nebuliser up to four times daily; may be increased to 5 mg up to four times daily in severe airway obstruction.',
    contraindications:
      'Hypersensitivity to salbutamol or any excipient; non-IV formulations must not be used to arrest uncomplicated premature labor or threatened abortion.',
    sideEffects:
      'Fine skeletal muscle tremor, headache, tachycardia, palpitations, hypokalemia, peripheral vasodilation, muscle cramps, restlessness, and rare lactic acidosis at high nebulised doses.',
    storageConditions: 'Store below 30°C. Keep Nebules in the foil tray inside the carton to protect from light.',
    specialties: ['Pulmonology', 'Emergency Medicine', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Ventolin Nebules 2.5 mg and 5 mg (salbutamol) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/854/smpc',
  },
  {
    brandName: 'Ventolin Nebules 5 mg/2.5 mL',
    brandNameAr: 'فنتولين نبيولز 5 ملغم / 2.5 مل',
    genericName: 'Salbutamol',
    drugClassNameEn: 'Short-Acting Beta-2 Adrenergic Agonists (SABAs)',
    dosageForm: 'Nebuliser solution',
    strength: '5 mg / 2.5 mL',
    route: 'Inhalation',
    packSize: '20 unit-dose ampoules × 2.5 mL',
    indications:
      'Management of severe chronic bronchospasm and acute severe asthma (status asthmaticus) in adults and adolescents.',
    adultDosage:
      '2.5 mg to 5 mg administered by nebulisation up to four times daily; in hospital under close supervision, higher doses up to 40 mg per day may be given for severe airways obstruction.',
    contraindications:
      'Hypersensitivity to salbutamol; non-IV use in uncomplicated premature labor or threatened abortion.',
    sideEffects:
      'Tremor, tachycardia, palpitations, headache, hypokalemia, lactic acidosis, muscle cramps, and paradoxical bronchospasm.',
    storageConditions: 'Store below 30°C. Protect from light.',
    specialties: ['Pulmonology', 'Emergency Medicine', 'Internal Medicine'],
    sourceTitle: 'Ventolin Nebules 2.5 mg and 5 mg (salbutamol) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/854/smpc',
  },
  {
    brandName: 'Seretide Diskus 50/100 mcg',
    brandNameAr: 'سيريتايد ديسكس 50 / 100 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '50 mcg / 100 mcg',
    route: 'Inhalation',
    packSize: '1 Diskus / Accuhaler device (60 doses)',
    indications:
      'Regular treatment of asthma where use of a combination product (long-acting beta-2 agonist and inhaled corticosteroid) is appropriate: patients not adequately controlled with inhaled corticosteroids and "as needed" inhaled short-acting beta-2 agonist, or patients already adequately controlled on both inhaled corticosteroid and long-acting beta-2 agonist.',
    adultDosage:
      'Adults and adolescents ≥12 years (and children ≥4 years): one inhalation of 50 mcg salmeterol and 100 mcg fluticasone twice daily. Rinse mouth with water and spit out after each dose.',
    contraindications:
      'Hypersensitivity to salmeterol, fluticasone, or lactose excipient (which contains small amounts of milk proteins).',
    sideEffects:
      'Candidiasis of the mouth and throat, pneumonia (in COPD patients), bronchitis, hypokalemia, headache, nasopharyngitis, tremor, palpitations, throat irritation, hoarseness/dysphonia, sinusitis, contusions, muscle cramps, traumatic fractures, arthralgia, and myalgia.',
    storageConditions: 'Do not store above 30°C. Store in a dry place.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Seretide Diskus (salmeterol / fluticasone) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seretide-diskus',
  },
  {
    brandName: 'Seretide Diskus 50/250 mcg',
    brandNameAr: 'سيريتايد ديسكس 50 / 250 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '50 mcg / 250 mcg',
    route: 'Inhalation',
    packSize: '1 Diskus / Accuhaler device (60 doses)',
    indications:
      'Regular maintenance treatment of persistent asthma in adults and adolescents ≥12 years where combination LABA/ICS therapy is indicated.',
    adultDosage:
      'One inhalation (50 mcg salmeterol / 250 mcg fluticasone) twice daily. Rinse mouth with water after inhalation.',
    contraindications:
      'Hypersensitivity to salmeterol, fluticasone, or lactose excipient.',
    sideEffects:
      'Oropharyngeal candidiasis, dysphonia/hoarseness, throat irritation, headache, tremor, palpitations, muscle cramps, and arthralgia.',
    storageConditions: 'Do not store above 30°C. Store in a dry place.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Seretide Diskus (salmeterol / fluticasone) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seretide-diskus',
  },
  {
    brandName: 'Seretide Diskus 50/500 mcg',
    brandNameAr: 'سيريتايد ديسكس 50 / 500 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '50 mcg / 500 mcg',
    route: 'Inhalation',
    packSize: '1 Diskus / Accuhaler device (60 doses)',
    indications:
      'Regular treatment of severe persistent asthma in adults and adolescents ≥12 years, and symptomatic treatment of patients with chronic obstructive pulmonary disease (COPD) with a FEV1 <60% predicted normal (pre-bronchodilator) and a history of repeated exacerbations, who have significant symptoms despite regular bronchodilator therapy.',
    adultDosage:
      'Asthma and COPD: one inhalation (50 mcg salmeterol / 500 mcg fluticasone) twice daily. Rinse mouth with water and spit out after each inhalation.',
    contraindications:
      'Hypersensitivity to salmeterol, fluticasone, or lactose excipient.',
    sideEffects:
      'Oropharyngeal candidiasis, pneumonia (in COPD), dysphonia, throat irritation, headache, tremor, palpitations, muscle cramps, contusions, and adrenal suppression at prolonged high doses.',
    storageConditions: 'Do not store above 30°C. Store in a dry place.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Seretide Diskus (salmeterol / fluticasone) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seretide-diskus',
  },
  {
    brandName: 'Seretide Evohaler 25/50 mcg',
    brandNameAr: 'سيريتايد إيفوهيلر 25 / 50 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '25 mcg / 50 mcg per actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Regular maintenance treatment of asthma in adults, adolescents, and children aged 4 years and older where use of a combination LABA/ICS metered-dose inhaler is appropriate.',
    adultDosage:
      'Two actuations of 25 mcg salmeterol and 50 mcg fluticasone twice daily. Rinse mouth after use.',
    contraindications:
      'Hypersensitivity to the active substances or to any excipient.',
    sideEffects:
      'Candidiasis of mouth and throat, hoarseness/dysphonia, throat irritation, headache, tremor, palpitations, and muscle cramps.',
    storageConditions: 'Do not store above 25°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Seretide 50, 125, 250 Evohaler (salmeterol / fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5504/smpc',
  },
  {
    brandName: 'Seretide Evohaler 25/125 mcg',
    brandNameAr: 'سيريتايد إيفوهيلر 25 / 125 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '25 mcg / 125 mcg per actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Regular maintenance treatment of persistent asthma in adults and adolescents aged 12 years and older.',
    adultDosage:
      'Two actuations of 25 mcg salmeterol and 125 mcg fluticasone twice daily.',
    contraindications:
      'Hypersensitivity to salmeterol, fluticasone, or norflurane propellant.',
    sideEffects:
      'Oropharyngeal candidiasis, dysphonia, throat irritation, headache, tremor, palpitations, and muscle cramps.',
    storageConditions: 'Do not store above 25°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Seretide 50, 125, 250 Evohaler (salmeterol / fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5504/smpc',
  },
  {
    brandName: 'Seretide Evohaler 25/250 mcg',
    brandNameAr: 'سيريتايد إيفوهيلر 25 / 250 مايكروغرام',
    genericName: 'Salmeterol + Fluticasone',
    drugClassNameEn: 'LABA & Inhaled Corticosteroid (ICS) Combinations',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '25 mcg / 250 mcg per actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Regular maintenance treatment of severe persistent asthma in adults and adolescents aged 12 years and older.',
    adultDosage:
      'Two actuations of 25 mcg salmeterol and 250 mcg fluticasone twice daily.',
    contraindications:
      'Hypersensitivity to salmeterol, fluticasone, or excipient.',
    sideEffects:
      'Oropharyngeal candidiasis, dysphonia, throat irritation, headache, tremor, palpitations, muscle cramps, and potential systemic corticosteroid effects with prolonged high doses.',
    storageConditions: 'Do not store above 25°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Seretide 50, 125, 250 Evohaler (salmeterol / fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5504/smpc',
  },
  {
    brandName: 'Flixotide Evohaler 50 mcg',
    brandNameAr: 'فليكسوتايد إيفوهيلر 50 مايكروغرام',
    genericName: 'Fluticasone',
    drugClassNameEn: 'Inhaled Corticosteroids (ICS)',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '50 mcg / actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Prophylactic anti-inflammatory management of mild, moderate, and severe persistent asthma in adults and children aged 1 year and older.',
    adultDosage:
      'Adults and adolescents >16 years: 100 to 1000 mcg twice daily depending on asthma severity (mild asthma: 100–250 mcg twice daily; moderate: 250–500 mcg twice daily; severe: 500–1000 mcg twice daily). Children ≥4 years: 50 to 200 mcg twice daily. Rinse mouth after use.',
    contraindications:
      'Hypersensitivity to fluticasone or the propellant excipient.',
    sideEffects:
      'Candidiasis of the mouth and throat, hoarseness/dysphonia, throat irritation, contusions, and rare paradoxical bronchospasm or adrenal suppression at high doses.',
    storageConditions: 'Store below 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Flixotide Evohaler 50, 125, and 250 micrograms (fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3824/smpc',
  },
  {
    brandName: 'Flixotide Evohaler 125 mcg',
    brandNameAr: 'فليكسوتايد إيفوهيلر 125 مايكروغرام',
    genericName: 'Fluticasone',
    drugClassNameEn: 'Inhaled Corticosteroids (ICS)',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '125 mcg / actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Prophylactic controller treatment of persistent asthma in adults and adolescents >16 years.',
    adultDosage:
      '125 mcg to 500 mcg (1 to 4 puffs) twice daily (up to 1000 mcg twice daily in severe asthma), titrated to the lowest effective maintenance dose.',
    contraindications:
      'Hypersensitivity to fluticasone or propellant.',
    sideEffects:
      'Oropharyngeal candidiasis, hoarseness, throat irritation, contusions, and pneumonia in COPD patients.',
    storageConditions: 'Store below 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Flixotide Evohaler 50, 125, and 250 micrograms (fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3824/smpc',
  },
  {
    brandName: 'Flixotide Evohaler 250 mcg',
    brandNameAr: 'فليكسوتايد إيفوهيلر 250 مايكروغرام',
    genericName: 'Fluticasone',
    drugClassNameEn: 'Inhaled Corticosteroids (ICS)',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '250 mcg / actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Prophylactic management of moderate to severe persistent asthma in adults and adolescents >16 years.',
    adultDosage:
      '250 mcg to 1000 mcg (1 to 4 puffs) twice daily, stepped down to the minimum effective dose once asthma control is achieved.',
    contraindications:
      'Hypersensitivity to fluticasone or propellant.',
    sideEffects:
      'Oropharyngeal candidiasis, dysphonia, throat irritation, easy bruising, and dose-related systemic corticosteroid effects with long-term high doses.',
    storageConditions: 'Store below 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Flixotide Evohaler 50, 125, and 250 micrograms (fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3824/smpc',
  },
  {
    brandName: 'Serevent Evohaler 25 mcg',
    brandNameAr: 'سيريفنت إيفوهيلر 25 مايكروغرام',
    genericName: 'Salmeterol',
    drugClassNameEn: 'Long-Acting Beta-2 Adrenergic Agonists (LABAs)',
    dosageForm: 'Pressurised inhalation, suspension',
    strength: '25 mcg / actuation',
    route: 'Inhalation',
    packSize: '1 inhaler (120 actuations)',
    indications:
      'Regular symptomatic long-term treatment of reversible airways obstruction in patients with asthma (including nocturnal asthma and prevention of exercise-induced bronchospasm) who are receiving inhaled corticosteroids, and in patients with chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      'Two inhalations (2 × 25 mcg = 50 mcg) twice daily; up to four inhalations (4 × 25 mcg = 100 mcg) twice daily in more severe airways obstruction in asthma. Must always be co-prescribed with an inhaled corticosteroid in asthma.',
    contraindications:
      'Hypersensitivity to salmeterol or to any excipient.',
    sideEffects:
      'Tremor, palpitations, headache, muscle cramps, tachycardia, cardiac arrhythmias (including atrial fibrillation, supraventricular tachycardia, and extrasystoles), hypokalemia, and oropharyngeal irritation.',
    storageConditions: 'Store below 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Serevent Evohaler 25 micrograms (salmeterol) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/168/smpc',
  },
  {
    brandName: 'Relvar Ellipta 92/22 mcg',
    brandNameAr: 'ريلفار إليبتا 92 / 22 مايكروغرام',
    genericName: 'Fluticasone + Vilanterol',
    drugClassNameEn: 'Once-Daily ICS & Ultra-LABA Combinations',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '92 mcg / 22 mcg',
    route: 'Inhalation',
    packSize: '1 Ellipta inhaler (30 doses)',
    indications:
      'Regular treatment of asthma in adults and adolescents aged 12 years and older where use of a combination medicinal product (long-acting beta-2 agonist and inhaled corticosteroid) is appropriate; symptomatic treatment of adults with COPD with a FEV1 <70% predicted normal (post-bronchodilator) with an exacerbation history despite regular bronchodilator therapy.',
    adultDosage:
      'Asthma and COPD: one inhalation of Relvar Ellipta 92/22 mcg once daily at the same time each day. Rinse mouth with water without swallowing after inhalation.',
    contraindications:
      'Hypersensitivity to the active substances or to any of the excipients (including severe milk-protein allergy).',
    sideEffects:
      'Pneumonia (in COPD), upper respiratory tract infection, bronchitis, influenza, candidiasis of mouth and throat, headache, migraine, nasopharyngitis, oropharyngeal pain, sinusitis, pharyngitis, rhinitis, cough, dysphonia, abdominal pain, arthralgia, back pain, fractures, and pyrexia.',
    storageConditions: 'Do not store above 25°C. Store in the original foil tray in order to protect from moisture; use within 6 weeks of opening the tray.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Relvar Ellipta (fluticasone furoate / vilanterol) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/relvar-ellipta',
  },
  {
    brandName: 'Relvar Ellipta 184/22 mcg',
    brandNameAr: 'ريلفار إليبتا 184 / 22 مايكروغرام',
    genericName: 'Fluticasone + Vilanterol',
    drugClassNameEn: 'Once-Daily ICS & Ultra-LABA Combinations',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '184 mcg / 22 mcg',
    route: 'Inhalation',
    packSize: '1 Ellipta inhaler (30 doses)',
    indications:
      'Regular treatment of asthma in adults and adolescents aged 12 years and older requiring a higher dose of inhaled corticosteroid in combination with a long-acting beta-2 agonist (not indicated for COPD).',
    adultDosage:
      'One inhalation of Relvar Ellipta 184/22 mcg once daily at the same time each day. Rinse mouth with water after inhalation.',
    contraindications:
      'Hypersensitivity to fluticasone, vilanterol, or excipients (lactose/milk protein).',
    sideEffects:
      'Oropharyngeal candidiasis, upper respiratory tract infections, headache, nasopharyngitis, dysphonia, oropharyngeal pain, cough, back pain, and arthralgia.',
    storageConditions: 'Do not store above 25°C. Keep in the sealed foil tray until first use; discard 6 weeks after opening.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Relvar Ellipta (fluticasone furoate / vilanterol) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/relvar-ellipta',
  },
  {
    brandName: 'Trelegy Ellipta 92/55/22 mcg',
    brandNameAr: 'تريليجي إليبتا 92 / 55 / 22 مايكروغرام',
    genericName: 'Fluticasone + Umeclidinium + Vilanterol',
    drugClassNameEn: 'Once-Daily Triple Inhaled Therapy (ICS + LAMA + LABA)',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '92 mcg / 55 mcg / 22 mcg',
    route: 'Inhalation',
    packSize: '1 Ellipta inhaler (30 doses)',
    indications:
      'Maintenance treatment in adult patients with moderate to severe chronic obstructive pulmonary disease (COPD) who are not adequately treated by a combination of an inhaled corticosteroid and a long-acting beta-2 agonist or a combination of a long-acting beta-2 agonist and a long-acting muscarinic antagonist.',
    adultDosage:
      'One single inhalation once daily at the same time each day (maximum dose is one inhalation once daily). Rinse mouth with water after inhalation.',
    contraindications:
      'Hypersensitivity to the active substances or to any of the excipients.',
    sideEffects:
      'Pneumonia, upper respiratory tract infection, bronchitis, pharyngitis, rhinitis, sinusitis, influenza, nasopharyngitis, candidiasis of mouth and throat, urinary tract infection, headache, cough, oropharyngeal pain, dysphonia, constipation, dry mouth, arthralgia, and back pain.',
    storageConditions: 'Do not store above 30°C. Keep in the sealed tray to protect from moisture and use within 6 weeks of opening.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Trelegy Ellipta (fluticasone / umeclidinium / vilanterol) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trelegy-ellipta',
  },
  {
    brandName: 'Anoro Ellipta 55/22 mcg',
    brandNameAr: 'أنورو إليبتا 55 / 22 مايكروغرام',
    genericName: 'Umeclidinium + Vilanterol',
    drugClassNameEn: 'Once-Daily Dual Bronchodilators (LAMA + LABA)',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '55 mcg / 22 mcg',
    route: 'Inhalation',
    packSize: '1 Ellipta inhaler (30 doses)',
    indications:
      'Maintenance bronchodilator treatment to relieve symptoms in adult patients with chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      'One inhalation of Anoro Ellipta 55/22 mcg once daily at the same time of the day.',
    contraindications:
      'Hypersensitivity to umeclidinium, vilanterol, or any excipient.',
    sideEffects:
      'Urinary tract infection, sinusitis, nasopharyngitis, pharyngitis, upper respiratory tract infection, headache, cough, oropharyngeal pain, constipation, and dry mouth.',
    storageConditions: 'Do not store above 30°C. Store in the sealed tray to protect from moisture; discard 6 weeks after opening.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Anoro Ellipta (umeclidinium / vilanterol) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/anoro-ellipta',
  },
  {
    brandName: 'Incruse Ellipta 55 mcg',
    brandNameAr: 'إنكروز إليبتا 55 مايكروغرام',
    genericName: 'Umeclidinium',
    drugClassNameEn: 'Long-Acting Muscarinic Antagonists (LAMAs)',
    dosageForm: 'Inhalation powder, pre-dispensed',
    strength: '55 mcg',
    route: 'Inhalation',
    packSize: '1 Ellipta inhaler (30 doses)',
    indications:
      'Maintenance bronchodilator treatment to relieve symptoms in adult patients with chronic obstructive pulmonary disease (COPD).',
    adultDosage:
      'One inhalation of umeclidinium 55 mcg once daily at the same time each day.',
    contraindications:
      'Hypersensitivity to umeclidinium or to any of the excipients.',
    sideEffects:
      'Nasopharyngitis, upper respiratory tract infection, urinary tract infection, sinusitis, headache, tachycardia, cough, dry mouth, and constipation.',
    storageConditions: 'Do not store above 30°C. Keep inside the sealed foil tray to protect from moisture; discard 6 weeks after opening.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Incruse Ellipta (umeclidinium) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/incruse-ellipta',
  },
  {
    brandName: 'Avamys 27.5 mcg',
    brandNameAr: 'أفاميس 27.5 مايكروغرام',
    genericName: 'Fluticasone',
    drugClassNameEn: 'Intranasal Corticosteroids',
    dosageForm: 'Nasal spray, suspension',
    strength: '27.5 mcg / spray',
    route: 'Intranasal',
    packSize: '1 bottle (120 sprays)',
    indications:
      'Treatment of the symptoms of allergic rhinitis (both nasal and ocular symptoms) in adults, adolescents, and children aged 6 years and over.',
    adultDosage:
      'Adults and adolescents ≥12 years: recommended starting dosage is two sprays (27.5 mcg per spray; total daily dose 110 mcg) in each nostril once daily; once control is achieved, may reduce to one spray in each nostril once daily (total 55 mcg/day). Children 6 to 11 years: one spray in each nostril once daily.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Epistaxis, nasal ulceration, headache, dyspnea, nasal pain/discomfort/dryness, and rare nasal septum perforation.',
    storageConditions: 'Do not refrigerate or freeze. Store upright with the cap on.',
    specialties: ['Otolaryngology', 'Pulmonology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Avamys (fluticasone furoate nasal spray) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/avamys',
  },
  {
    brandName: 'Flixonase 50 mcg',
    brandNameAr: 'فليكسونيز 50 مايكروغرام',
    genericName: 'Fluticasone',
    drugClassNameEn: 'Intranasal Corticosteroids',
    dosageForm: 'Nasal spray, suspension',
    strength: '50 mcg / spray',
    route: 'Intranasal',
    packSize: '1 bottle (150 sprays)',
    indications:
      'Prophylaxis and treatment of seasonal allergic rhinitis (including hay fever) and perennial rhinitis in adults and children aged 4 years and over.',
    adultDosage:
      'Adults and children over 12 years: two sprays into each nostril once daily, preferably in the morning (total 200 mcg/day); in some cases two sprays into each nostril twice daily (maximum 400 mcg/day) may be required.',
    contraindications:
      'Hypersensitivity to fluticasone or to any excipient.',
    sideEffects:
      'Epistaxis, headache, unpleasant taste, unpleasant smell, nasal dryness, nasal irritation, and throat dryness/irritation.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Otolaryngology', 'Pulmonology', 'Pediatrics', 'Internal Medicine'],
    sourceTitle: 'Flixonase Aqueous Nasal Spray (fluticasone) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/845/smpc',
  },
  {
    brandName: 'Nucala 100 mg',
    brandNameAr: 'نوكالا 100 ملغم',
    genericName: 'Mepolizumab',
    drugClassNameEn: 'Anti-Interleukin-5 (IL-5) Monoclonal Antibodies',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '100 mg / mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1 mL)',
    indications:
      'Add-on treatment for severe refractory eosinophilic asthma in adults, adolescents, and children aged 6 years and older; add-on treatment with intranasal corticosteroids for adult patients with severe chronic rhinosinusitis with nasal polyps (CRSwNP); add-on treatment for patients aged 6 years and older with relapsing-remitting or refractory eosinophilic granulomatosis with polyangiitis (EGPA); add-on treatment for adult patients with inadequately controlled hypereosinophilic syndrome (HES) without an identifiable non-hematologic secondary cause.',
    adultDosage:
      'Severe eosinophilic asthma and CRSwNP: 100 mg administered subcutaneously once every 4 weeks. EGPA and HES: 300 mg (three 100 mg injections) administered subcutaneously once every 4 weeks.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Headache, injection site reactions (pain, erythema, swelling, itching, burning), back pain, lower respiratory tract infection, urinary tract infection, pharyngitis, nasal congestion, upper abdominal pain, eczema, pyrexia, and rare systemic hypersensitivity/anaphylaxis.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Store in the original carton in order to protect from light.',
    specialties: ['Pulmonology', 'Otolaryngology', 'Rheumatology', 'Hematology'],
    sourceTitle: 'Nucala (mepolizumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/nucala',
  },

  // =========================================================================
  // 3. NEUROLOGY & PSYCHIATRY (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Lamictal 25 mg',
    brandNameAr: 'لاميكتال 25 ملغم',
    genericName: 'Lamotrigine',
    drugClassNameEn: 'Phenyltriazine Anticonvulsants & Mood Stabilizers',
    dosageForm: 'Tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    indications:
      'Epilepsy in adults and adolescents aged 13 years and above (adjunctive or monotherapy treatment of partial seizures and generalised seizures, including tonic-clonic seizures and seizures associated with Lennox-Gastaut syndrome); adjunctive therapy in children and adolescents aged 2 to 12 years and monotherapy of typical absence seizures; Bipolar I disorder in adults aged 18 years and above (prevention of depressive episodes).',
    adultDosage:
      'Requires strict slow dose titration over 4 to 6 weeks to reduce the risk of serious skin rash, adjusted according to concomitant valproate (which doubles lamotrigine half-life) or enzyme-inducing antiepileptics. Monotherapy maintenance in epilepsy: 100 to 200 mg/day (in 1 or 2 divided doses). Bipolar maintenance: 200 mg/day (100 mg/day with valproate; 400 mg/day with enzyme inducers).',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Skin rash (including rare life-threatening Stevens-Johnson syndrome, toxic epidermal necrolysis, and DRESS), headache, somnolence, dizziness, tremor, insomnia, agitation, ataxia, diplopia, blurred vision, nausea, vomiting, diarrhea, dry mouth, arthralgia, back pain, tiredness, and rare aseptic meningitis or hemophagocytic lymphohistiocytosis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Lamictal Tablets and Dispersible Tablets (lamotrigine) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1286.pdf',
  },
  {
    brandName: 'Lamictal 50 mg',
    brandNameAr: 'لاميكتال 50 ملغم',
    genericName: 'Lamotrigine',
    drugClassNameEn: 'Phenyltriazine Anticonvulsants & Mood Stabilizers',
    dosageForm: 'Tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    indications:
      'Partial and generalized epilepsy (including Lennox-Gastaut syndrome) in adults and children, and prevention of depressive episodes in adults with Bipolar I disorder.',
    adultDosage:
      'Titrate strictly according to official dosing tables based on concomitant valproate or enzyme inducers to target maintenance (100 to 200 mg/day in monotherapy or with valproate; 200 to 400 mg/day with enzyme inducers).',
    contraindications:
      'Hypersensitivity to lamotrigine or any excipient.',
    sideEffects:
      'Skin rash (discontinue immediately at first sign of drug-related rash unless clearly non-drug related), headache, dizziness, diplopia, blurred vision, somnolence, insomnia, ataxia, tremor, nausea, vomiting, and diarrhea.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'Lamictal Tablets (lamotrigine) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1286.pdf',
  },
  {
    brandName: 'Lamictal 100 mg',
    brandNameAr: 'لاميكتال 100 ملغم',
    genericName: 'Lamotrigine',
    drugClassNameEn: 'Phenyltriazine Anticonvulsants & Mood Stabilizers',
    dosageForm: 'Tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    indications:
      'Maintenance monotherapy or adjunctive therapy of partial and generalized seizures (including tonic-clonic and Lennox-Gastaut seizures) and maintenance prevention of depressive episodes in Bipolar I disorder.',
    adultDosage:
      'Standard maintenance dose is 100 mg to 200 mg daily (in 1 or 2 divided doses), reached only after gradual 4- to 6-week titration.',
    contraindications:
      'Hypersensitivity to lamotrigine or any excipient.',
    sideEffects:
      'Skin rash (including rare SJS/TEN), headache, dizziness, somnolence, insomnia, diplopia, ataxia, tremor, nausea, vomiting, and fatigue.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Lamictal Tablets (lamotrigine) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1286.pdf',
  },
  {
    brandName: 'Lamictal 200 mg',
    brandNameAr: 'لاميكتال 200 ملغم',
    genericName: 'Lamotrigine',
    drugClassNameEn: 'Phenyltriazine Anticonvulsants & Mood Stabilizers',
    dosageForm: 'Tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '56 tablets (blister pack)',
    indications:
      'High-strength maintenance tablet for partial and generalized epilepsy and Bipolar I disorder in adults.',
    adultDosage:
      'Maintenance dosing of 200 mg to 400 mg daily (as a single dose or 2 divided doses) after completion of the required titration schedule.',
    contraindications:
      'Hypersensitivity to lamotrigine or any excipient.',
    sideEffects:
      'Cutaneous hypersensitivity/rash, headache, dizziness, diplopia, blurred vision, somnolence, ataxia, tremor, nausea, and irritability.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'Lamictal Tablets (lamotrigine) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.1286.pdf',
  },
  {
    brandName: 'Imigran 50 mg',
    brandNameAr: 'إيميجران 50 ملغم',
    genericName: 'Sumatriptan',
    drugClassNameEn: 'Selective 5-HT1B/1D Receptor Agonists (Triptans)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '6 film-coated tablets (blister pack)',
    indications:
      'Acute relief of migraine attacks, with or without aura.',
    adultDosage:
      'Recommended adult dose is a single 50 mg tablet taken as early as possible after the onset of a migraine headache (some patients may require 100 mg). If symptoms recur after initial response, a second dose may be taken after at least 2 hours (maximum 300 mg in 24 hours). Do not take a second dose for the same attack if there is no response to the first dose.',
    contraindications:
      'Hypersensitivity to sumatriptan or any excipient; history of myocardial infarction, ischemic heart disease, coronary vasospasm (Prinzmetal’s angina), peripheral vascular disease, or symptoms/signs consistent with ischemic heart disease; history of cerebrovascular accident (CVA) or transient ischemic attack (TIA); severe hepatic impairment; moderate and severe hypertension or mild uncontrolled hypertension; concomitant administration of ergotamine or derivatives (including methysergide) or any triptan/5-HT1 agonist; concurrent or recent (within 2 weeks) use of monoamine oxidase inhibitors (MAOIs).',
    sideEffects:
      'Dizziness, drowsiness, sensory disturbance (paresthesia, hypoesthesia), transient increases in blood pressure, flushing, dyspnea, nausea, vomiting, sensations of heaviness, pressure, tightness, or pain in the chest, throat, neck, or jaw, myalgia, and fatigue.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Imigran 50 mg and 100 mg Tablets (sumatriptan) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2214/smpc',
  },
  {
    brandName: 'Imigran 100 mg',
    brandNameAr: 'إيميجران 100 ملغم',
    genericName: 'Sumatriptan',
    drugClassNameEn: 'Selective 5-HT1B/1D Receptor Agonists (Triptans)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '6 film-coated tablets (blister pack)',
    indications:
      'Acute relief of migraine attacks, with or without aura, in adults.',
    adultDosage:
      'One 100 mg film-coated tablet at onset of migraine headache; if migraine recurs after initial relief, a second dose may be taken at least 2 hours later (maximum 300 mg in 24 hours).',
    contraindications:
      'Hypersensitivity to sumatriptan; ischemic heart disease, prior MI, Prinzmetal’s angina, peripheral vascular disease, prior stroke or TIA; moderate/severe or uncontrolled hypertension; severe hepatic impairment; concomitant ergotamines, other triptans, or MAOIs (within 14 days).',
    sideEffects:
      'Tingling, warmth/heaviness/pressure/tightness in chest or throat, dizziness, somnolence, flushing, transient BP elevation, nausea, vomiting, and fatigue.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Imigran 50 mg and 100 mg Tablets (sumatriptan) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2214/smpc',
  },
  {
    brandName: 'Requip XL 2 mg',
    brandNameAr: 'ريكويب إكس إل 2 ملغم',
    genericName: 'Ropinirole',
    drugClassNameEn: 'Non-Ergoline Dopamine D2/D3 Receptor Agonists',
    dosageForm: 'Prolonged-release tablet',
    strength: '2 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (blister pack)',
    indications:
      'Treatment of Parkinson’s disease as initial monotherapy in order to delay the introduction of levodopa, or in combination with levodopa over the course of the disease when the effect of levodopa wears off or becomes inconsistent and fluctuations in therapeutic effect ("end of dose" or "on-off" fluctuations) occur.',
    adultDosage:
      'Initial dose is 2 mg once daily for the first week, increased to 4 mg once daily from the second week of treatment; may be titrated in 2 mg weekly increments up to 8 mg once daily, and then by 2 to 4 mg every two weeks up to a maximum of 24 mg once daily. Swallow whole; do not chew, crush, or divide.',
    contraindications:
      'Hypersensitivity to ropinirole or any excipient; severe renal impairment (creatinine clearance <30 mL/min) without regular hemodialysis; hepatic impairment.',
    sideEffects:
      'Somnolence, sudden onset of sleep episodes, syncope, dizziness, dyskinesia (in adjunct therapy), hallucinations, confusion, impulse control disorders (pathological gambling, hypersexuality, compulsive shopping/eating), nausea, constipation, abdominal pain, postural hypotension, and peripheral edema.',
    storageConditions: 'Do not store above 25°C. Store in the original package in order to protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'Requip XL Prolonged-Release Tablets (ropinirole) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6247/smpc',
  },
  {
    brandName: 'Requip XL 4 mg',
    brandNameAr: 'ريكويب إكس إل 4 ملغم',
    genericName: 'Ropinirole',
    drugClassNameEn: 'Non-Ergoline Dopamine D2/D3 Receptor Agonists',
    dosageForm: 'Prolonged-release tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (blister pack)',
    indications:
      'Monotherapy or adjunctive therapy with levodopa in idiopathic Parkinson’s disease.',
    adultDosage:
      '4 mg once daily starting in Week 2 (after 2 mg once daily in Week 1), titrated according to clinical response up to 24 mg once daily. Taken once daily at a similar time each day with or without food.',
    contraindications:
      'Hypersensitivity to ropinirole; severe renal impairment (CrCl <30 mL/min) without hemodialysis; hepatic impairment.',
    sideEffects:
      'Somnolence, dizziness, nausea, dyskinesia, hallucinations, orthostatic hypotension, peripheral edema, constipation, and impulse control disorders.',
    storageConditions: 'Do not store above 25°C. Store in the original package to protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'Requip XL Prolonged-Release Tablets (ropinirole) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6247/smpc',
  },
  {
    brandName: 'Requip XL 8 mg',
    brandNameAr: 'ريكويب إكس إل 8 ملغم',
    genericName: 'Ropinirole',
    drugClassNameEn: 'Non-Ergoline Dopamine D2/D3 Receptor Agonists',
    dosageForm: 'Prolonged-release tablet',
    strength: '8 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (blister pack)',
    indications:
      'Maintenance monotherapy or adjunctive therapy with levodopa in Parkinson’s disease.',
    adultDosage:
      '8 mg to 24 mg once daily following gradual titration from 2 mg/day.',
    contraindications:
      'Hypersensitivity to ropinirole; severe renal impairment without hemodialysis; hepatic impairment.',
    sideEffects:
      'Somnolence, sudden sleep onset, dyskinesia, hallucinations, nausea, postural hypotension, peripheral edema, and impulse control disorders.',
    storageConditions: 'Do not store above 25°C. Protect from light.',
    specialties: ['Neurology'],
    sourceTitle: 'Requip XL Prolonged-Release Tablets (ropinirole) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6247/smpc',
  },
  {
    brandName: 'Seroxat 20 mg',
    brandNameAr: 'سيروكسات 20 ملغم',
    genericName: 'Paroxetine',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitors (SSRIs)',
    dosageForm: 'Film-coated tablet',
    strength: '20 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    indications:
      'Major depressive episode, obsessive-compulsive disorder (OCD), panic disorder with and without agoraphobia, social anxiety disorder/social phobia, generalised anxiety disorder, and post-traumatic stress disorder (PTSD) in adults.',
    adultDosage:
      'Major depression, social anxiety disorder, GAD, and PTSD: recommended dose is 20 mg once daily in the morning with food (maximum 50 mg/day). OCD and panic disorder: recommended target dose is 40 mg daily (initiate at 20 mg/day for OCD and 10 mg/day for panic disorder, increased in 10 mg weekly increments; maximum 60 mg/day). Taper gradually when discontinuing.',
    contraindications:
      'Hypersensitivity to paroxetine or any excipient; concomitant use with monoamine oxidase inhibitors (MAOIs, including linezolid and methylthioninium chloride) or within 2 weeks of terminating MAOI treatment; concomitant use with thioridazine or pimozide.',
    sideEffects:
      'Nausea, sexual dysfunction, somnolence, insomnia, agitation, abnormal dreams, dizziness, tremor, headache, blurred vision, yawning, constipation, diarrhea, vomiting, dry mouth, sweating, asthenia, weight gain, hypercholesterolemia, hyponatremia, and discontinuation symptoms upon abrupt withdrawal.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroxat (paroxetine) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroxat',
  },
  {
    brandName: 'Seroxat 30 mg',
    brandNameAr: 'سيروكسات 30 ملغم',
    genericName: 'Paroxetine',
    drugClassNameEn: 'Selective Serotonin Reuptake Inhibitors (SSRIs)',
    dosageForm: 'Film-coated tablet',
    strength: '30 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    indications:
      'Major depressive episode, obsessive-compulsive disorder (OCD), panic disorder, social anxiety disorder, generalised anxiety disorder, and post-traumatic stress disorder in adults requiring higher maintenance dosing.',
    adultDosage:
      '30 mg to 50 mg (up to 60 mg in OCD/panic disorder) once daily in the morning with food, titrated in 10 mg increments at intervals of at least one week.',
    contraindications:
      'Hypersensitivity to paroxetine; concomitant or recent (within 14 days) MAOI therapy; concomitant thioridazine or pimozide.',
    sideEffects:
      'Nausea, sexual dysfunction, insomnia, somnolence, dizziness, tremor, headache, dry mouth, constipation, diarrhea, diaphoresis, weight gain, and withdrawal symptoms if stopped abruptly.',
    storageConditions: 'Do not store above 30°C. Store in the original package to protect from light.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroxat (paroxetine) — EMA Article 30 Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroxat',
  },

  // =========================================================================
  // 4. UROLOGY, DERMATOLOGY, IMMUNOLOGY & ONCOLOGY (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Avodart 0.5 mg',
    brandNameAr: 'أفودارت 0.5 ملغم',
    genericName: 'Dutasteride',
    drugClassNameEn: 'Dual 5-Alpha Reductase (Type 1 and Type 2) Inhibitors',
    dosageForm: 'Soft capsule',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '30 soft capsules (blister pack)',
    indications:
      'Treatment of moderate to severe symptoms of benign prostatic hyperplasia (BPH) and reduction in the risk of acute urinary retention (AUR) and surgery in patients with moderate to severe symptoms of BPH.',
    adultDosage:
      'One capsule (0.5 mg) taken orally once daily with or without food. Capsules must be swallowed whole and not chewed or opened, as contact with the capsule contents may result in irritation of the oropharyngeal mucosa.',
    contraindications:
      'Women, children, and adolescents; patients with hypersensitivity to dutasteride, other 5-alpha reductase inhibitors, soya, peanut, or any excipient; patients with severe hepatic impairment.',
    sideEffects:
      'Impotence (erectile dysfunction), altered (decreased) libido, ejaculation disorders, breast disorders (including breast enlargement/gynecomastia and breast tenderness), dizziness (when combined with tamsulosin), alopecia (primarily body hair loss), or hypertrichosis.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Urology'],
    sourceTitle: 'Avodart 0.5 mg Soft Capsules (dutasteride) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6758/pil',
  },
  {
    brandName: 'Combodart 0.5 mg/0.4 mg',
    brandNameAr: 'كومبودارت 0.5 ملغم / 0.4 ملغم',
    genericName: 'Dutasteride + Tamsulosin',
    drugClassNameEn: '5-Alpha Reductase Inhibitor & Alpha-1A Adrenoceptor Blocker Combinations',
    dosageForm: 'Hard capsule',
    strength: '0.5 mg / 0.4 mg',
    route: 'Oral',
    packSize: '30 hard capsules (HDPE bottle)',
    indications:
      'Treatment of moderate to severe symptoms of benign prostatic hyperplasia (BPH) and reduction in the risk of acute urinary retention (AUR) and surgery in patients with moderate to severe symptoms of BPH.',
    adultDosage:
      'One capsule (0.5 mg dutasteride / 0.4 mg tamsulosin) taken orally once daily approximately 30 minutes after the same meal each day. Swallow whole; do not chew or open.',
    contraindications:
      'Women, children, and adolescents; hypersensitivity to dutasteride, other 5-alpha reductase inhibitors, tamsulosin (including tamsulosin-induced angioedema), soya, peanut, or any excipient; history of orthostatic hypotension; severe hepatic impairment.',
    sideEffects:
      'Dizziness, impotence, decreased libido, ejaculation disorders (including retrograde ejaculation), breast disorders (gynecomastia, tenderness), postural hypotension, palpitations, constipation, diarrhea, vomiting, and intraoperative floppy iris syndrome (IFIS) during cataract surgery.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Urology'],
    sourceTitle: 'Combodart 0.5 mg / 0.4 mg Hard Capsules (dutasteride / tamsulosin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/507/smpc',
  },
  {
    brandName: 'Dermovate Cream 0.05%',
    brandNameAr: 'ديرموفيت كريم 0.05%',
    genericName: 'Clobetasol',
    drugClassNameEn: 'Very Potent Topical Corticosteroids (Group IV)',
    dosageForm: 'Cream',
    strength: '0.05% w/w (0.5 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 25 g',
    indications:
      'Short-term treatment only of more resistant inflammatory and pruritic dermatoses such as psoriasis (excluding widespread plaque psoriasis), recalcitrant dermatoses, lichen planus, discoid lupus erythematosus, and other skin conditions which do not respond satisfactorily to less potent steroids.',
    adultDosage:
      'Apply thinly and gently rub in using only enough to cover the entire affected area once or twice daily for up to 4 weeks until improvement occurs, then reduce frequency or change to a less potent preparation. Maximum weekly dose should not exceed 50 g/week.',
    contraindications:
      'Untreated cutaneous infections (viral, bacterial, fungal); rosacea; acne vulgaris; pruritus without inflammation; perianal and genital pruritus; perioral dermatitis; dermatoses in children under 1 year of age, including dermatitis and napkin eruptions.',
    sideEffects:
      'Pruritus, local skin burning/pain, skin atrophy, striae, telangiectasia, pigmentation changes, hypertrichosis, exacerbation of underlying symptoms, allergic contact dermatitis, and HPA axis suppression/Cushingoid features with prolonged or extensive/occlusive application.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Dermatology'],
    sourceTitle: 'Dermovate Cream and Ointment 0.05% (clobetasol) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/939/smpc',
  },
  {
    brandName: 'Dermovate Ointment 0.05%',
    brandNameAr: 'ديرموفيت مرهم 0.05%',
    genericName: 'Clobetasol',
    drugClassNameEn: 'Very Potent Topical Corticosteroids (Group IV)',
    dosageForm: 'Ointment',
    strength: '0.05% w/w (0.5 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 25 g',
    indications:
      'Short-term treatment of dry, lichenified, or scaly resistant inflammatory dermatoses including localized plaque psoriasis, recalcitrant eczema, lichen planus, and discoid lupus erythematosus.',
    adultDosage:
      'Apply thinly to the affected area once or twice daily for up to 4 weeks (maximum 50 g per week), then step down to a less potent corticosteroid.',
    contraindications:
      'Untreated bacterial, viral, or fungal skin infections; rosacea; acne vulgaris; perioral dermatitis; perianal/genital pruritus; children under 1 year of age.',
    sideEffects:
      'Local burning/pruritus, skin atrophy, striae, telangiectasia, secondary infection, folliculitis, and systemic HPA axis suppression if applied over large surface areas or under occlusion.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Dermatology'],
    sourceTitle: 'Dermovate Cream and Ointment 0.05% (clobetasol) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/939/smpc',
  },
  {
    brandName: 'Betnovate Cream 0.1%',
    brandNameAr: 'بيتنوفيت كريم 0.1%',
    genericName: 'Betamethasone',
    drugClassNameEn: 'Potent Topical Corticosteroids (Group III)',
    dosageForm: 'Cream',
    strength: '0.1% w/w (1 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 30 g',
    indications:
      'Relief of the inflammatory and pruritic manifestations of steroid-responsive dermatoses in adults and children aged 1 year and over: atopic dermatitis, nummular dermatitis (discoid eczema), prurigo nodularis, psoriasis (excluding widespread plaque psoriasis), lichen simplex chronicus, lichen planus, seborrheic dermatitis, irritant or allergic contact dermatitis, discoid lupus erythematosus, and generalized erythroderma adjunctive therapy.',
    adultDosage:
      'Apply thinly and gently rub in using only enough to cover the entire affected area once or twice daily for up to 4 weeks until improvement occurs, then reduce frequency or switch to a less potent preparation.',
    contraindications:
      'Untreated cutaneous infections; rosacea; acne vulgaris; pruritus without inflammation; perianal and genital pruritus; perioral dermatitis; dermatoses in children under 1 year of age.',
    sideEffects:
      'Pruritus, local skin burning/pain, skin atrophy, striae, telangiectasia, hypertrichosis, pigmentary changes, secondary opportunistic infection, and HPA axis suppression with prolonged/extensive use.',
    storageConditions: 'Do not store above 25°C.',
    specialties: ['Dermatology', 'Pediatrics'],
    sourceTitle: 'Betnovate Cream and Ointment 0.1% (betamethasone) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.931.pdf',
  },
  {
    brandName: 'Betnovate Ointment 0.1%',
    brandNameAr: 'بيتنوفيت مرهم 0.1%',
    genericName: 'Betamethasone',
    drugClassNameEn: 'Potent Topical Corticosteroids (Group III)',
    dosageForm: 'Ointment',
    strength: '0.1% w/w (1 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 30 g',
    indications:
      'Dry, lichenified, or scaly steroid-responsive dermatoses including atopic eczema, discoid eczema, prurigo nodularis, localized psoriasis, lichen simplex chronicus, lichen planus, and contact dermatitis.',
    adultDosage:
      'Apply thinly to the affected skin once or twice daily for up to 4 weeks, then reduce frequency of application.',
    contraindications:
      'Untreated skin infections; rosacea; acne vulgaris; perioral dermatitis; perianal/genital pruritus; children under 1 year of age.',
    sideEffects:
      'Local pruritus and burning, skin thinning/atrophy, striae, telangiectasia, contact dermatitis, and systemic absorption with extensive or occlusive use.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'Pediatrics'],
    sourceTitle: 'Betnovate Cream and Ointment 0.1% (betamethasone) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/files/pil.931.pdf',
  },
  {
    brandName: 'Bactroban Ointment 2%',
    brandNameAr: 'باكتروبان مرهم 2%',
    genericName: 'Mupirocin',
    drugClassNameEn: 'Topical Antibacterials (Isoleucyl-tRNA Synthetase Inhibitors)',
    dosageForm: 'Ointment',
    strength: '2% w/w (20 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 15 g',
    indications:
      'Topical treatment of primary and secondary bacterial skin infections caused by susceptible Staphylococcus aureus (including methicillin-resistant strains), other staphylococci, and streptococci: impetigo, folliculitis, furunculosis, and infected eczema or traumatic skin lesions.',
    adultDosage:
      'Apply a small amount to the affected area 2 to 3 times daily for up to 10 days depending on response.',
    contraindications:
      'Hypersensitivity to mupirocin or to any of the excipients (contains polyethylene glycol/macrogol; avoid on large open wounds with significant renal impairment). Not suitable for ophthalmic or intranasal use.',
    sideEffects:
      'Application site burning, localized pruritus, erythema, stinging, dryness, and cutaneous sensitization reactions.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Dermatology', 'Pediatrics', 'General Surgery'],
    sourceTitle: 'Bactroban 2% Ointment (mupirocin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1156/smpc',
  },
  {
    brandName: 'Bactroban Cream 2%',
    brandNameAr: 'باكتروبان كريم 2%',
    genericName: 'Mupirocin',
    drugClassNameEn: 'Topical Antibacterials (Isoleucyl-tRNA Synthetase Inhibitors)',
    dosageForm: 'Cream',
    strength: '2% w/w (20 mg/g)',
    route: 'Topical',
    packSize: '1 tube × 15 g',
    indications:
      'Topical treatment of secondarily infected traumatic skin lesions such as small lacerations, sutured wounds, or abrasions caused by susceptible strains of Staphylococcus aureus and Streptococcus pyogenes.',
    adultDosage:
      'Apply a small quantity to the affected area 3 times daily for up to 10 days.',
    contraindications:
      'Hypersensitivity to mupirocin or any excipient. Not for ophthalmic or intranasal application.',
    sideEffects:
      'Cutaneous hypersensitivity reactions, application site pain/burning, pruritus, rash, and erythema.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Dermatology', 'General Surgery', 'Pediatrics'],
    sourceTitle: 'Bactroban 2% Cream (mupirocin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3812/smpc',
  },
  {
    brandName: 'Benlysta 200 mg',
    brandNameAr: 'بينليستا 200 ملغم',
    genericName: 'Belimumab',
    drugClassNameEn: 'Anti-BLyS (B-Lymphocyte Stimulator) Monoclonal Antibodies',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '200 mg / mL',
    route: 'Subcutaneous',
    packSize: '4 pre-filled pens × 1 mL',
    indications:
      'Add-on therapy in adult patients with active, autoantibody-positive systemic lupus erythematosus (SLE) with a high degree of disease activity (e.g. positive anti-dsDNA and low complement) despite standard therapy; and in combination with background immunosuppressive therapies for the treatment of adult patients with active lupus nephritis.',
    adultDosage:
      'SLE: 200 mg once weekly, administered subcutaneously on the same day each week. Active lupus nephritis: 400 mg (two 200 mg injections) once weekly for 4 doses, followed by 200 mg once weekly thereafter.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Bacterial infections (bronchitis, urinary tract infection), viral gastroenteritis, pharyngitis, nasopharyngitis, leukopenia, hypersensitivity reactions, depression, insomnia, migraine, diarrhea, nausea, injection site reactions, pain in extremity, and pyrexia.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Store in the original package in order to protect from light.',
    specialties: ['Rheumatology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Benlysta (belimumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/benlysta',
  },
  {
    brandName: 'Zejula 100 mg',
    brandNameAr: 'زيجولا 100 ملغم',
    genericName: 'Niraparib',
    drugClassNameEn: 'Poly (ADP-Ribose) Polymerase (PARP1 / PARP2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Monotherapy for the maintenance treatment of adult patients with advanced epithelial (FIGO Stages III and IV) high-grade ovarian, fallopian tube, or primary peritoneal cancer who are in response (complete or partial) following completion of first-line platinum-based chemotherapy; and for maintenance treatment of adult patients with platinum-sensitive relapsed high-grade serous epithelial ovarian, fallopian tube, or primary peritoneal cancer who are in response to platinum-based chemotherapy.',
    adultDosage:
      'First-line maintenance: 200 mg (two 100 mg tablets) once daily (or 300 mg once daily in patients weighing ≥77 kg AND with baseline platelet count ≥150,000/µL). Recurrent ovarian cancer maintenance: 200 mg once daily in patients <77 kg or with platelets <150,000/µL; 300 mg once daily in patients ≥77 kg and platelets ≥150,000/µL.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; breastfeeding.',
    sideEffects:
      'Thrombocytopenia, anemia, neutropenia, leukopenia, hypertension, palpitations, tachycardia, nausea, constipation, vomiting, abdominal pain, diarrhea, dyspepsia, dry mouth, mucositis/stomatitis, fatigue, asthenia, insomnia, headache, dizziness, dyspnea, cough, back pain, arthralgia, and rare myelodysplastic syndrome/acute myeloid leukemia or posterior reversible encephalopathy syndrome (PRES).',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Zejula (niraparib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zejula',
  },
  {
    brandName: 'Jemperli 500 mg/10 mL',
    brandNameAr: 'جيمبيرلي 500 ملغم / 10 مل',
    genericName: 'Dostarlimab',
    drugClassNameEn: 'Anti-PD-1 Immune Checkpoint Inhibitor Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '50 mg / mL (500 mg / 10 mL)',
    route: 'Intravenous',
    packSize: '1 vial × 10 mL (500 mg)',
    indications:
      'In combination with carboplatin and paclitaxel for the treatment of adult patients with mismatch repair deficient (dMMR)/microsatellite instability-high (MSI-H) primary advanced or recurrent endometrial cancer who are candidates for systemic therapy; and as monotherapy for adult patients with dMMR/MSI-H recurrent or advanced endometrial cancer that has progressed on or following prior treatment with a platinum-containing regimen.',
    adultDosage:
      'Monotherapy: 500 mg every 3 weeks for 4 cycles followed by 1000 mg every 6 weeks for all cycles thereafter, administered by intravenous infusion over 30 minutes. In combination with carboplatin/paclitaxel: 500 mg every 3 weeks in combination with chemotherapy for 6 cycles followed by 1000 mg monotherapy every 6 weeks.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Anemia, hypothyroidism, diarrhea, nausea, vomiting, abdominal pain, colitis, pruritus, rash, arthralgia, myalgia, pyrexia, elevated transaminases, and immune-mediated adverse reactions (pneumonitis, colitis, hepatitis, endocrinopathies, nephritis, severe skin reactions).',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Store in the original package in order to protect from light.',
    specialties: ['Oncology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Jemperli (dostarlimab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/jemperli',
  },
];

export const GSK_PRODUCTS: AiProductDraft[] = GSK_COMPACT_PRODUCTS.map(toGskProductDraft);
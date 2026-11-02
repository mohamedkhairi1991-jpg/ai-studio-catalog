import type { AiDraftSource, AiProductDraft } from './catalog';

const ROCHE_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactRocheDrug {
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

function toRocheProductDraft(item: CompactRocheDrug): AiProductDraft {
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
    sources: ROCHE_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official F. Hoffmann-La Roche Ltd regulatory monograph (EMA EPAR / SmPC / UK EMC); saved as draft pending verification.',
  };
}

const ROCHE_COMPACT_PRODUCTS: CompactRocheDrug[] = [
  // =========================================================================
  // 1. ANTI-INFECTIVES, TRANSPLANTATION & IMMUNOLOGY — ROCEPHIN, TAMIFLU, XOFLUZA, CELLCEPT, ACTEMRA (13 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Rocephin 500 mg',
    brandNameAr: 'روسيفين 500 ملغم',
    genericName: 'Ceftriaxone',
    drugClassNameEn: 'Third-Generation Parenteral Cephalosporin Antibacterials',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '500 mg',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial powder + 1 ampoule solvent',
    indications:
      'Treatment of bacterial meningitis, community-acquired and hospital-acquired pneumonia, acute otitis media, intra-abdominal infections, complicated urinary tract infections (including pyelonephritis), infections of bones and joints, complicated skin and soft tissue infections, gonorrhoea, syphilis, bacterial endocarditis, acute exacerbations of COPD, disseminated Lyme borreliosis, pre-operative prophylaxis of surgical site infections, and management of neutropenic patients with fever suspected to be due to a bacterial infection.',
    adultDosage:
      'Adults and children ≥12 years (≥50 kg): usual dose is 1 g to 2 g once daily (every 24 hours), increased to 4 g once daily (or 2 g every 12 hours) in severe infections such as bacterial meningitis. Uncomplicated gonorrhoea: 500 mg as a single intramuscular dose.',
    contraindications:
      'Hypersensitivity to ceftriaxone or any other cephalosporin; history of severe hypersensitivity (anaphylactic reaction) to any other type of beta-lactam antibacterial agent (penicillins, monobactams, carbapenems); premature neonates up to a postmenstrual age of 41 weeks; full-term neonates (up to 28 days of age) with hyperbilirubinaemia, jaundice, hypoalbuminaemia, or acidosis, or if they require (or are expected to require) intravenous calcium treatment due to risk of fatal ceftriaxone-calcium precipitation; and lidocaine contraindications when using lidocaine solvent for IM injection (lidocaine solutions must never be administered intravenously).',
    sideEffects:
      'Diarrhoea, loose stools, nausea, eosinophilia, leukopenia, thrombocytopenia, rash, elevated hepatic enzymes, biliary sludge/pseudolithiasis, and injection-site pain or phlebitis.',
    storageConditions:
      'Store below 30°C; keep the vial in the outer carton in order to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine', 'General Surgery'],
    sourceTitle: 'EMA Article 30 Referral — Rocephin (ceftriaxone) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/rocephin',
  },
  {
    brandName: 'Rocephin 1 g IV',
    brandNameAr: 'روسيفين 1 غم وريدي',
    genericName: 'Ceftriaxone',
    drugClassNameEn: 'Third-Generation Parenteral Cephalosporin Antibacterials',
    dosageForm: 'Powder and solvent for solution for injection / infusion',
    strength: '1 g',
    route: 'Intravenous',
    packSize: '1 vial powder + 1 ampoule of water for injections (10 mL)',
    indications:
      'Treatment of severe systemic and localized bacterial infections including sepsis, bacterial meningitis, community- and hospital-acquired pneumonia, complicated urinary tract and intra-abdominal infections, bone and joint infections, and surgical prophylaxis.',
    adultDosage:
      '1 g to 2 g administered once daily by slow intravenous injection over 5 minutes or by intravenous infusion over at least 30 minutes (up to 2 g every 12 hours in bacterial meningitis or severe life-threatening infections). Do not mix or administer simultaneously with calcium-containing IV solutions (such as Ringer’s or Hartmann’s solution).',
    contraindications:
      'Hypersensitivity to cephalosporins or severe beta-lactam allergy, premature neonates up to 41 weeks postmenstrual age, and full-term neonates with hyperbilirubinaemia or requiring intravenous calcium.',
    sideEffects:
      'Diarrhoea, Clostridioides difficile-associated colitis, eosinophilia, leukopenia, thrombocytopenia, elevated transaminases, biliary pseudolithiasis, and phlebitis.',
    storageConditions:
      'Store below 30°C; keep the vial in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Critical Care', 'Emergency Medicine', 'General Surgery'],
    sourceTitle: 'EMA Article 30 Referral — Rocephin (ceftriaxone) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/rocephin',
  },
  {
    brandName: 'Rocephin 1 g IM',
    brandNameAr: 'روسيفين 1 غم عضلي',
    genericName: 'Ceftriaxone',
    drugClassNameEn: 'Third-Generation Parenteral Cephalosporin Antibacterials',
    dosageForm: 'Powder and solvent for solution for intramuscular injection',
    strength: '1 g',
    route: 'Intramuscular',
    packSize: '1 vial powder + 1 ampoule of 1% lidocaine hydrochloride solvent (3.5 mL)',
    indications:
      'Intramuscular treatment of susceptible bacterial infections (pneumonia, acute otitis media, complicated UTI, skin and soft tissue infections, gonorrhoea, syphilis, Lyme borreliosis) when intravenous access is not required or feasible.',
    adultDosage:
      '1 g to 2 g once daily by deep intragluteal intramuscular injection; no more than 1 g should be injected at a single intramuscular site. Reconstituted with 1% lidocaine solution to reduce local injection pain — NEVER administer lidocaine-reconstituted Rocephin intravenously.',
    contraindications:
      'Hypersensitivity to cephalosporins, severe beta-lactam allergy, known hypersensitivity to lidocaine or amide local anaesthetics, non-paced heart block, severe heart failure, premature neonates, and hyperbilirubinaemic or calcium-treated neonates.',
    sideEffects:
      'Local injection-site induration/tenderness, diarrhoea, rash, eosinophilia, leukopenia, and reversible biliary precipitates.',
    storageConditions:
      'Store below 30°C; keep the vial in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'EMA Article 30 Referral — Rocephin (ceftriaxone) Harmonised SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/rocephin',
  },
  {
    brandName: 'Tamiflu 75 mg',
    brandNameAr: 'تاميفلو 75 ملغم',
    genericName: 'Oseltamivir',
    drugClassNameEn: 'Viral Neuraminidase Inhibitors (Anti-Influenza Antivirals)',
    dosageForm: 'Hard capsule',
    strength: '75 mg',
    route: 'Oral',
    packSize: '10 hard capsules',
    indications:
      'Treatment of influenza in adults and children (including full-term neonates) who present with symptoms typical of influenza when influenza virus is circulating in the community; and post-exposure prevention of influenza in individuals aged 1 year or older following contact with a clinically diagnosed influenza case.',
    adultDosage:
      'Treatment of influenza (adults and adolescents ≥13 years or >40 kg): 75 mg orally twice daily for 5 days, initiated as soon as possible within the first 48 hours of symptom onset (10 days in immunocompromised patients). Post-exposure prophylaxis: 75 mg once daily for 10 days.',
    contraindications:
      'Hypersensitivity to oseltamivir or any of the excipients.',
    sideEffects:
      'Nausea, vomiting (reduced when taken with food), headache, pain, bronchitis, insomnia, dizziness, and rare neuropsychiatric events (primarily in children and adolescents).',
    storageConditions:
      'Do not store above 25°C.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Tamiflu (oseltamivir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tamiflu',
  },
  {
    brandName: 'Tamiflu 6 mg/mL Oral Suspension',
    brandNameAr: 'تاميفلو 6 ملغم/مل',
    genericName: 'Oseltamivir',
    drugClassNameEn: 'Viral Neuraminidase Inhibitors (Anti-Influenza Antivirals)',
    dosageForm: 'Powder for oral suspension',
    strength: '6 mg/mL after reconstitution',
    route: 'Oral',
    packSize: '1 bottle (delivering 65 mL reconstituted suspension)',
    indications:
      'Treatment of influenza in infants, children, and adults unable to swallow capsules, and post-exposure prophylaxis of influenza in individuals aged 1 year and older.',
    adultDosage:
      'Weight-based paediatric dosing twice daily for 5 days (treatment) or once daily for 10 days (prophylaxis): ≤15 kg: 30 mg (5 mL); >15 to 23 kg: 45 mg (7.5 mL); >23 to 40 kg: 60 mg (10 mL); >40 kg and adults: 75 mg (12.5 mL). Infants <1 year treatment: 3 mg/kg twice daily for 5 days.',
    contraindications:
      'Hypersensitivity to oseltamivir or any of the excipients.',
    sideEffects:
      'Vomiting, nausea, diarrhoea, otitis media (in children), headache, abdominal pain, and epistaxis.',
    storageConditions:
      'Powder: do not store above 30°C. Reconstituted suspension: store up to 10 days below 25°C.',
    specialties: ['Pediatrics', 'Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Tamiflu (oseltamivir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tamiflu',
  },
  {
    brandName: 'Xofluza 40 mg',
    brandNameAr: 'زوفلوزا 40 ملغم',
    genericName: 'Baloxavir marboxil',
    drugClassNameEn: 'Cap-Dependent Endonuclease Inhibitors (Single-Dose Anti-Influenza Antivirals)',
    dosageForm: 'Film-coated tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '1 film-coated tablet (or 2 tablets)',
    indications:
      'Treatment of uncomplicated influenza and post-exposure prophylaxis of influenza in individuals aged 1 year and above.',
    adultDosage:
      'Single oral dose taken as soon as possible within 48 hours of symptom onset or close contact with an infected individual: Body weight 20 kg to <80 kg: single 40 mg dose; Body weight ≥80 kg: single 80 mg dose (two 40 mg tablets). Do not take with dairy products, calcium-fortified beverages, polyvalent cation laxatives, antacids, or oral supplements containing iron, zinc, selenium, calcium, or magnesium.',
    contraindications:
      'Hypersensitivity to baloxavir marboxil or any of the excipients.',
    sideEffects:
      'Diarrhoea, bronchitis, nausea, sinusitis, headache, and rare hypersensitivity reactions (urticaria, angioedema, anaphylaxis).',
    storageConditions:
      'Store in the original blister package in order to protect from moisture.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Xofluza (baloxavir marboxil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xofluza',
  },
  {
    brandName: 'CellCept 250 mg',
    brandNameAr: 'سيلسيبت 250 ملغم',
    genericName: 'Mycophenolate mofetil',
    drugClassNameEn: 'Inosine Monophosphate Dehydrogenase (IMPDH) Inhibitor Immunosuppressants',
    dosageForm: 'Hard capsule',
    strength: '250 mg',
    route: 'Oral',
    packSize: '100 hard capsules',
    indications:
      'In combination with ciclosporin and corticosteroids for the prophylaxis of acute transplant rejection in adult and paediatric patients (≥1 year) receiving allogeneic renal, cardiac, or hepatic transplants.',
    adultDosage:
      'Renal transplant: 1 g (four 250 mg capsules) orally twice daily (2 g daily total). Cardiac or hepatic transplant: 1.5 g orally twice daily (3 g daily total). Capsules should not be opened or crushed to avoid inhalation or direct skin/mucous membrane contact with the teratogenic powder.',
    contraindications:
      'Hypersensitivity to mycophenolate mofetil or mycophenolic acid; women of childbearing potential not using highly effective contraception; initiation in women of childbearing potential without a negative pregnancy test; pregnancy (unless no suitable alternative treatment exists to prevent transplant rejection); and breast-feeding.',
    sideEffects:
      'Diarrhoea, leukopenia, bacterial/viral/fungal opportunistic infections (CMV, candidiasis, herpes), vomiting, abdominal pain, anaemia, thrombocytopenia, and increased risk of lymphoma and skin malignancies.',
    storageConditions:
      'Do not store above 30°C; store in the original package in order to protect from moisture.',
    specialties: ['Nephrology', 'Rheumatology', 'Immunology', 'Hepatology', 'Cardiology'],
    sourceTitle: 'EMA EPAR — CellCept (mycophenolate mofetil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cellcept',
  },
  {
    brandName: 'CellCept 500 mg',
    brandNameAr: 'سيلسيبت 500 ملغم',
    genericName: 'Mycophenolate mofetil',
    drugClassNameEn: 'Inosine Monophosphate Dehydrogenase (IMPDH) Inhibitor Immunosuppressants',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '50 film-coated tablets',
    indications:
      'In combination with ciclosporin and corticosteroids for the prophylaxis of acute transplant rejection in patients receiving allogeneic renal, cardiac, or hepatic transplants.',
    adultDosage:
      'Renal transplant: 1 g (two 500 mg tablets) orally twice daily (total 2 g/day). Cardiac or hepatic transplant: 1.5 g (three 500 mg tablets) orally twice daily (total 3 g/day). Swallow tablets whole; do not crush or break.',
    contraindications:
      'Hypersensitivity to mycophenolate mofetil or mycophenolic acid, women of childbearing potential not using highly effective contraception or without a negative baseline pregnancy test, pregnancy, and breast-feeding.',
    sideEffects:
      'Diarrhoea, leukopenia, sepsis and opportunistic infections (CMV viraemia/syndrome, herpes simplex/zoster, candidiasis), vomiting, anaemia, thrombocytopenia, and hypertension.',
    storageConditions:
      'Do not store above 30°C; keep the blister in the outer carton in order to protect from light.',
    specialties: ['Nephrology', 'Rheumatology', 'Immunology', 'Hepatology', 'Cardiology'],
    sourceTitle: 'EMA EPAR — CellCept (mycophenolate mofetil) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cellcept',
  },
  {
    brandName: 'Actemra 162 mg/0.9 mL SC',
    brandNameAr: 'أكتيمرا 162 ملغم/0.9 مل',
    genericName: 'Tocilizumab',
    drugClassNameEn: 'Interleukin-6 (IL-6) Receptor Antagonist Monoclonal Antibodies',
    dosageForm: 'Solution for injection in pre-filled syringe / pre-filled pen (ACTPen)',
    strength: '162 mg / 0.9 mL',
    route: 'Subcutaneous',
    packSize: '4 pre-filled syringes or 4 pre-filled pens x 0.9 mL',
    indications:
      'Treatment of moderate to severe active rheumatoid arthritis (RA) in adult patients who have either responded inadequately to, or who were intolerant to, previous therapy with one or more DMARDs or TNF antagonists; treatment of giant cell arteritis (GCA) in adults; active systemic juvenile idiopathic arthritis (sJIA) in patients aged 1 year and older; and juvenile idiopathic polyarthritis (pJIA) in patients aged 2 years and older.',
    adultDosage:
      'Rheumatoid arthritis and Giant Cell Arteritis: 162 mg injected subcutaneously once every week into the abdomen, thigh, or upper arm (in GCA, in combination with a tapering course of glucocorticoids). Monitor neutrophils, platelets, and hepatic transaminases every 4–8 weeks initially.',
    contraindications:
      'Hypersensitivity to tocilizumab or any excipient, and active, severe infections (with the exception of COVID-19 where IV formulation is indicated).',
    sideEffects:
      'Upper respiratory tract infections, nasopharyngitis, cellulitis, headache, hypertension, increased ALT/AST, hypercholesterolaemia, neutropenia, thrombocytopenia, injection-site reactions, and rare gastrointestinal perforation (especially in patients with history of diverticulitis).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze. Once removed from the refrigerator, must be administered within 8 hours (or up to 2 weeks at ≤30°C per label).',
    specialties: ['Rheumatology', 'Immunology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — RoActemra / Actemra (tocilizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/roactemra',
  },
  {
    brandName: 'Actemra 80 mg/4 mL IV',
    brandNameAr: 'أكتيمرا 80 ملغم/4 مل',
    genericName: 'Tocilizumab',
    drugClassNameEn: 'Interleukin-6 (IL-6) Receptor Antagonist Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '80 mg / 4 mL (20 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 4 mL',
    indications:
      'Intravenous treatment of moderate to severe active rheumatoid arthritis in adults, active systemic JIA (≥2 years), active polyarticular JIA (≥2 years), CAR T-cell-induced severe or life-threatening cytokine release syndrome (CRS), and severe COVID-19 in adults receiving systemic corticosteroids and requiring supplemental oxygen or mechanical ventilation.',
    adultDosage:
      'Rheumatoid arthritis: 8 mg/kg diluted in 100 mL of 0.9% NaCl and infused intravenously over 1 hour once every 4 weeks (maximum 800 mg per infusion). Paediatric sJIA: 8 mg/kg (if ≥30 kg) or 12 mg/kg (if <30 kg) IV every 2 weeks.',
    contraindications:
      'Hypersensitivity to tocilizumab or any excipient, and active, severe infections (except COVID-19).',
    sideEffects:
      'Upper respiratory tract infections, serious bacterial/opportunistic infections, elevated hepatic transaminases, hypercholesterolaemia, neutropenia, thrombocytopenia, hypertension, and rare diverticular perforation.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Rheumatology', 'Immunology', 'Pediatrics', 'Oncology', 'Critical Care'],
    sourceTitle: 'EMA EPAR — RoActemra / Actemra (tocilizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/roactemra',
  },
  {
    brandName: 'Actemra 200 mg/10 mL IV',
    brandNameAr: 'أكتيمرا 200 ملغم/10 مل',
    genericName: 'Tocilizumab',
    drugClassNameEn: 'Interleukin-6 (IL-6) Receptor Antagonist Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '200 mg / 10 mL (20 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 10 mL',
    indications:
      'Intravenous treatment of moderate to severe active rheumatoid arthritis, sJIA, pJIA, CAR T-cell-induced cytokine release syndrome (CRS), and hospitalized COVID-19 requiring supplemental oxygen or ventilation.',
    adultDosage:
      'RA: 8 mg/kg IV over 1 hour every 4 weeks (maximum 800 mg). CRS: 8 mg/kg (if ≥30 kg) or 12 mg/kg (if <30 kg) IV over 1 hour (up to 4 doses at least 8 hours apart). COVID-19: single 8 mg/kg IV infusion over 60 minutes (maximum 800 mg).',
    contraindications:
      'Hypersensitivity to tocilizumab or any excipient, and active, severe non-COVID-19 infections.',
    sideEffects:
      'Infections, neutropenia, thrombocytopenia, elevated ALT/AST, hyperlipidaemia, hypertension, infusion reactions, and rare gastrointestinal perforation.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Rheumatology', 'Immunology', 'Oncology', 'Critical Care'],
    sourceTitle: 'EMA EPAR — RoActemra / Actemra (tocilizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/roactemra',
  },
  {
    brandName: 'Actemra 400 mg/20 mL IV',
    brandNameAr: 'أكتيمرا 400 ملغم/20 مل',
    genericName: 'Tocilizumab',
    drugClassNameEn: 'Interleukin-6 (IL-6) Receptor Antagonist Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '400 mg / 20 mL (20 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 20 mL',
    indications:
      'Intravenous treatment of moderate to severe active rheumatoid arthritis, sJIA, pJIA, CAR T-cell-induced cytokine release syndrome (CRS), and severe hospitalized COVID-19.',
    adultDosage:
      '8 mg/kg diluted in 100 mL of sterile 0.9% sodium chloride and infused intravenously over 60 minutes every 4 weeks in RA (maximum 800 mg per infusion). Do not initiate in RA patients with ANC <2 x 10⁹/L, platelets <100 x 10³/mcL, or ALT/AST >1.5x ULN.',
    contraindications:
      'Hypersensitivity to tocilizumab or any excipient, and active, severe non-COVID-19 infections.',
    sideEffects:
      'Upper respiratory and serious infections, neutropenia, thrombocytopenia, elevated liver enzymes, hypercholesterolaemia, and rare GI perforation.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Rheumatology', 'Immunology', 'Oncology', 'Critical Care'],
    sourceTitle: 'EMA EPAR — RoActemra / Actemra (tocilizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/roactemra',
  },

  // =========================================================================
  // 2. ONCOLOGY & MALIGNANT HEMATOLOGY — HERCEPTIN, PERJETA, PHESGO, KADCYLA, AVASTIN, MABTHERA, GAZYVARO, TECENTRIQ, ALECENSA, XELODA, POLIVY (20 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Herceptin 150 mg IV',
    brandNameAr: 'هرسبتين 150 ملغم وريدي',
    genericName: 'Trastuzumab',
    drugClassNameEn: 'Anti-HER2 Monoclonal Antibodies',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '150 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'Treatment of adult patients with HER2-positive metastatic breast cancer (MBC) and HER2-positive early breast cancer (EBC); and in combination with capecitabine or 5-fluorouracil and cisplatin for HER2-positive metastatic adenocarcinoma of the stomach or gastro-oesophageal junction.',
    adultDosage:
      'Three-weekly IV regimen: initial loading dose of 8 mg/kg body weight infused over 90 minutes, followed by 6 mg/kg every 3 weeks infused over 30–90 minutes. Weekly IV regimen: initial loading dose of 4 mg/kg, followed by 2 mg/kg weekly. Do not administer as an intravenous push or bolus.',
    contraindications:
      'Severe hypersensitivity to trastuzumab, murine proteins, or any excipient; and severe dyspnoea at rest due to complications of advanced malignancy or requiring supplementary oxygen therapy.',
    sideEffects:
      'Cardiac dysfunction (decreased LVEF, congestive heart failure — monitor LVEF at baseline and every 3 months; do not give concurrently with anthracyclines), infusion-related reactions (fever, chills), diarrhoea, nausea, neutropenia, fatigue, and rash.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C); do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Herceptin (trastuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/herceptin',
  },
  {
    brandName: 'Herceptin 600 mg/5 mL SC',
    brandNameAr: 'هرسبتين 600 ملغم/5 مل تحت الجلد',
    genericName: 'Trastuzumab',
    drugClassNameEn: 'Anti-HER2 Monoclonal Antibodies (Subcutaneous Fixed-Dose)',
    dosageForm: 'Solution for injection',
    strength: '600 mg / 5 mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 5 mL',
    indications:
      'Treatment of adult patients with HER2-positive metastatic breast cancer (MBC) and HER2-positive early breast cancer (EBC). (Not indicated for gastric cancer.)',
    adultDosage:
      'Fixed dose of 600 mg (5 mL) administered subcutaneously into the thigh over 2 to 5 minutes every 3 weeks, irrespective of the patient’s body weight; no loading dose is required. Alternate between the left and right thigh.',
    contraindications:
      'Severe hypersensitivity to trastuzumab, murine proteins, hyaluronidase, or any excipient; and severe dyspnoea at rest due to complications of advanced malignancy.',
    sideEffects:
      'Cardiotoxicity (left ventricular dysfunction, heart failure), administration-related reactions, injection-site pain/erythema, arthralgia, diarrhoea, fatigue, and neutropenia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze. Once removed from the refrigerator, must be used within 6 hours.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Herceptin (trastuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/herceptin',
  },
  {
    brandName: 'Perjeta 420 mg/14 mL',
    brandNameAr: 'بيرجيتا 420 ملغم/14 مل',
    genericName: 'Pertuzumab',
    drugClassNameEn: 'HER2 Dimerisation Inhibitor Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '420 mg / 14 mL (30 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 14 mL',
    indications:
      'In combination with trastuzumab and docetaxel for adult patients with HER2-positive metastatic or locally recurrent unresectable breast cancer who have not received previous anti-HER2 therapy or chemotherapy for their metastatic disease; and in combination with trastuzumab and chemotherapy for the neoadjuvant and adjuvant treatment of adult patients with HER2-positive early breast cancer at high risk of recurrence.',
    adultDosage:
      'Initial loading dose of 840 mg (two 420 mg vials) administered as a 60-minute intravenous infusion, followed every 3 weeks thereafter by a maintenance dose of 420 mg (one vial) administered over 30 to 60 minutes, in combination with trastuzumab.',
    contraindications:
      'Hypersensitivity to pertuzumab or any of the excipients.',
    sideEffects:
      'Diarrhoea, alopecia, neutropenia, febrile neutropenia, nausea, fatigue, rash, mucosal inflammation, peripheral neuropathy, left ventricular dysfunction, and infusion-related/hypersensitivity reactions.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Perjeta (pertuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/perjeta',
  },
  {
    brandName: 'Phesgo 600 mg/600 mg',
    brandNameAr: 'فيسغو 600 ملغم/600 ملغم',
    genericName: 'Pertuzumab + Trastuzumab',
    drugClassNameEn: 'Fixed-Dose Subcutaneous Anti-HER2 Monoclonal Antibody Combinations',
    dosageForm: 'Solution for injection',
    strength: '600 mg pertuzumab / 600 mg trastuzumab in 10 mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 10 mL',
    indications:
      'Maintenance every-3-week subcutaneous treatment of adult patients with HER2-positive early breast cancer (neoadjuvant and adjuvant) and HER2-positive metastatic or locally recurrent unresectable breast cancer.',
    adultDosage:
      'Maintenance dose: 600 mg pertuzumab / 600 mg trastuzumab (10 mL) injected subcutaneously into the thigh over approximately 5 minutes every 3 weeks (following the initial Phesgo 1200 mg/600 mg loading dose). Observe patients for 15 minutes after each maintenance injection.',
    contraindications:
      'Known hypersensitivity to pertuzumab, trastuzumab, vorhyaluronidase alfa, or any of the excipients.',
    sideEffects:
      'Alopecia, diarrhoea, nausea, anaemia, asthenia, arthralgia, injection-site reaction, neutropenia, and decreased left ventricular ejection fraction.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Phesgo (pertuzumab / trastuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/phesgo',
  },
  {
    brandName: 'Phesgo 1200 mg/600 mg',
    brandNameAr: 'فيسغو 1200 ملغم/600 ملغم',
    genericName: 'Pertuzumab + Trastuzumab',
    drugClassNameEn: 'Fixed-Dose Subcutaneous Anti-HER2 Monoclonal Antibody Combinations',
    dosageForm: 'Solution for injection',
    strength: '1200 mg pertuzumab / 600 mg trastuzumab in 15 mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 15 mL',
    indications:
      'Initial loading dose for adult patients with HER2-positive early breast cancer (neoadjuvant and adjuvant) and HER2-positive metastatic breast cancer.',
    adultDosage:
      'Loading dose: 1200 mg pertuzumab / 600 mg trastuzumab (15 mL) injected subcutaneously into the thigh over approximately 8 minutes, followed every 3 weeks by Phesgo 600 mg/600 mg maintenance doses. Observe patients for 30 minutes after completion of the loading dose.',
    contraindications:
      'Known hypersensitivity to pertuzumab, trastuzumab, vorhyaluronidase alfa, or any excipient.',
    sideEffects:
      'Diarrhoea, alopecia, nausea, neutropenia, anaemia, injection-site reactions, hypersensitivity/administration reactions, and cardiac dysfunction.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Phesgo (pertuzumab / trastuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/phesgo',
  },
  {
    brandName: 'Kadcyla 100 mg',
    brandNameAr: 'كادسيلا 100 ملغم',
    genericName: 'Trastuzumab emtansine',
    drugClassNameEn: 'HER2-Targeted Antibody-Drug Conjugates (ADCs)',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '100 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'As a single agent for the adjuvant treatment of adult patients with HER2-positive early breast cancer who have residual invasive disease in the breast and/or lymph nodes after neoadjuvant taxane-based and HER2-targeted therapy; and as a single agent for adult patients with HER2-positive, unresectable locally advanced or metastatic breast cancer who previously received trastuzumab and a taxane.',
    adultDosage:
      'Recommended dose is 3.6 mg/kg body weight administered as an intravenous infusion every 3 weeks (21-day cycle), for 14 cycles in early breast cancer or until disease progression in metastatic breast cancer. NEVER substitute Kadcyla for or with trastuzumab.',
    contraindications:
      'Hypersensitivity to trastuzumab emtansine or any of the excipients.',
    sideEffects:
      'Thrombocytopenia, elevated hepatic transaminases (AST/ALT) and rare nodular regenerative hyperplasia, peripheral neuropathy, fatigue, nausea, musculoskeletal pain, epistaxis, haemorrhage, and left ventricular dysfunction.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C); do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Kadcyla (trastuzumab emtansine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kadcyla',
  },
  {
    brandName: 'Kadcyla 160 mg',
    brandNameAr: 'كادسيلا 160 ملغم',
    genericName: 'Trastuzumab emtansine',
    drugClassNameEn: 'HER2-Targeted Antibody-Drug Conjugates (ADCs)',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '160 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'Single-agent adjuvant treatment of HER2-positive early breast cancer with residual invasive disease post-neoadjuvant therapy, and single-agent treatment of HER2-positive unresectable locally advanced or metastatic breast cancer after prior trastuzumab and taxane.',
    adultDosage:
      '3.6 mg/kg administered as an intravenous infusion every 3 weeks (initial dose infused over 90 minutes; subsequent doses over 30 minutes if well tolerated). Do not administer as an IV push or bolus, and do not dilute with glucose (5%) solution.',
    contraindications:
      'Hypersensitivity to trastuzumab emtansine or any excipient.',
    sideEffects:
      'Thrombocytopenia, hepatotoxicity (increased transaminases), peripheral sensory neuropathy, fatigue, nausea, constipation, epistaxis, and decreased LVEF.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C); do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'EMA EPAR — Kadcyla (trastuzumab emtansine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/kadcyla',
  },
  {
    brandName: 'Avastin 100 mg/4 mL',
    brandNameAr: 'أفاستين 100 ملغم/4 مل',
    genericName: 'Bevacizumab',
    drugClassNameEn: 'Anti-VEGF Monoclonal Antibodies (Angiogenesis Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '100 mg / 4 mL (25 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 4 mL',
    indications:
      'Treatment of adult patients with metastatic carcinoma of the colon or rectum (with fluoropyrimidine-based chemotherapy), metastatic breast cancer, unresectable advanced, metastatic or recurrent non-squamous non-small cell lung cancer (NSCLC), advanced and/or metastatic renal cell cancer, advanced epithelial ovarian, fallopian tube, or primary peritoneal cancer, and persistent, recurrent, or metastatic carcinoma of the cervix.',
    adultDosage:
      'mCRC: 5 mg/kg or 10 mg/kg IV every 2 weeks, or 7.5 mg/kg or 15 mg/kg IV every 3 weeks. NSCLC / Ovarian / Cervical cancer: 7.5 mg/kg or 15 mg/kg IV every 3 weeks. Do not initiate for at least 28 days following major surgery or until surgical wound is fully healed. Dilute only in 0.9% sodium chloride.',
    contraindications:
      'Hypersensitivity to bevacizumab, Chinese Hamster Ovary (CHO) cell products, or other recombinant human or humanised antibodies; and pregnancy.',
    sideEffects:
      'Hypertension, proteinuria, fatigue/asthenia, diarrhoea, abdominal pain, epistaxis, haemorrhage, arterial and venous thromboembolism, impaired wound healing, and gastrointestinal perforation or fistulae.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze or shake.',
    specialties: ['Oncology', 'Obstetrics & Gynecology', 'Gastroenterology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Avastin (bevacizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/avastin',
  },
  {
    brandName: 'Avastin 400 mg/16 mL',
    brandNameAr: 'أفاستين 400 ملغم/16 مل',
    genericName: 'Bevacizumab',
    drugClassNameEn: 'Anti-VEGF Monoclonal Antibodies (Angiogenesis Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '400 mg / 16 mL (25 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 16 mL',
    indications:
      'Combination treatment of metastatic colorectal cancer, metastatic breast cancer, advanced non-squamous NSCLC, advanced renal cell carcinoma, advanced epithelial ovarian/fallopian tube/primary peritoneal cancer, and persistent/recurrent/metastatic cervical cancer.',
    adultDosage:
      '5 mg/kg or 10 mg/kg IV every 2 weeks, or 7.5 mg/kg or 15 mg/kg IV every 3 weeks depending on tumour type and regimen. First infusion over 90 minutes, second over 60 minutes, and subsequent infusions over 30 minutes if tolerated.',
    contraindications:
      'Hypersensitivity to bevacizumab or CHO cell products, and pregnancy.',
    sideEffects:
      'Hypertension, proteinuria, haemorrhage, arterial/venous thromboembolism, neutropenia, wound healing complications, GI perforation, and posterior reversible encephalopathy syndrome (PRES).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology', 'Obstetrics & Gynecology', 'Gastroenterology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Avastin (bevacizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/avastin',
  },
  {
    brandName: 'MabThera 100 mg/10 mL',
    brandNameAr: 'مابثيرا 100 ملغم/10 مل',
    genericName: 'Rituximab',
    drugClassNameEn: 'Anti-CD20 Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '100 mg / 10 mL (10 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '2 vials x 10 mL',
    indications:
      'Treatment of non-Hodgkin’s lymphoma (follicular lymphoma and CD20-positive diffuse large B-cell lymphoma), chronic lymphocytic leukaemia (CLL), severe active rheumatoid arthritis (in combination with methotrexate), granulomatosis with polyangiitis (GPA) and microscopic polyangiitis (MPA), and moderate to severe pemphigus vulgaris.',
    adultDosage:
      'Non-Hodgkin’s lymphoma: 375 mg/m² BSA administered as an intravenous infusion per cycle. Rheumatoid arthritis / Pemphigus vulgaris: two 1000 mg intravenous infusions given 2 weeks apart. Always premedicate with an antipyretic, an antihistamine, and a glucocorticoid (where applicable) prior to each infusion.',
    contraindications:
      'Hypersensitivity to rituximab or murine proteins, active severe infections, and patients in a severely immunocompromised state (plus severe heart failure NYHA Class IV in RA/GPA/MPA/PV).',
    sideEffects:
      'Infusion-related reactions (cytokine release, fever, chills, rigors, hypotension, bronchospasm), bacterial and viral infections, neutropenia, leukopenia, hypogammaglobulinaemia, hepatitis B reactivation (screen all patients before starting), and very rare progressive multifocal leukoencephalopathy (PML).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Hematology', 'Oncology', 'Rheumatology', 'Nephrology', 'Dermatology'],
    sourceTitle: 'EMA EPAR — MabThera (rituximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mabthera',
  },
  {
    brandName: 'MabThera 500 mg/50 mL',
    brandNameAr: 'مابثيرا 500 ملغم/50 مل',
    genericName: 'Rituximab',
    drugClassNameEn: 'Anti-CD20 Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '500 mg / 50 mL (10 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 50 mL',
    indications:
      'Treatment of CD20-positive follicular lymphoma and diffuse large B-cell non-Hodgkin’s lymphoma, chronic lymphocytic leukaemia (CLL), severe active rheumatoid arthritis, granulomatosis with polyangiitis (GPA) / microscopic polyangiitis (MPA), and moderate to severe pemphigus vulgaris.',
    adultDosage:
      'NHL: 375 mg/m² IV per cycle. CLL: 375 mg/m² IV on Day 0 of Cycle 1, followed by 500 mg/m² on Day 1 of Cycles 2–6. RA: two 1000 mg IV infusions separated by 2 weeks. GPA/MPA induction: 375 mg/m² IV once weekly for 4 weeks.',
    contraindications:
      'Hypersensitivity to rituximab or murine proteins, active severe infections, and severely immunocompromised state.',
    sideEffects:
      'Infusion-related reactions, infections, neutropenia,febrile neutropenia, thrombocytopenia, hepatitis B reactivation, tumour lysis syndrome, and rare PML.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Hematology', 'Oncology', 'Rheumatology', 'Nephrology'],
    sourceTitle: 'EMA EPAR — MabThera (rituximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mabthera',
  },
  {
    brandName: 'MabThera 1400 mg SC',
    brandNameAr: 'مابثيرا 1400 ملغم تحت الجلد',
    genericName: 'Rituximab',
    drugClassNameEn: 'Anti-CD20 Monoclonal Antibodies (Subcutaneous Fixed-Dose)',
    dosageForm: 'Solution for subcutaneous injection',
    strength: '1400 mg / 11.7 mL',
    route: 'Subcutaneous',
    packSize: '1 vial x 11.7 mL',
    indications:
      'Treatment of adult patients with non-Hodgkin’s lymphoma (follicular lymphoma and CD20-positive diffuse large B-cell lymphoma) after they have received at least one full dose of MabThera intravenous formulation.',
    adultDosage:
      'Cycle 1 must always be given as MabThera IV (375 mg/m²); subsequent cycles: fixed dose of 1400 mg (11.7 mL) injected subcutaneously into the abdominal wall over approximately 5 minutes once per chemotherapy cycle (or every 2 or 3 months during follicular lymphoma maintenance). Premedicate prior to each injection.',
    contraindications:
      'Hypersensitivity to rituximab, murine proteins, or hyaluronidase; active severe infections; and severely immunocompromised state.',
    sideEffects:
      'Injection-site erythema, pain, and oedema, neutropenia, febrile neutropenia, infections, nausea, and alopecia (when combined with chemotherapy).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA EPAR — MabThera (rituximab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mabthera',
  },
  {
    brandName: 'Gazyvaro 1000 mg/40 mL',
    brandNameAr: 'غازيفارو 1000 ملغم/40 مل',
    genericName: 'Obinutuzumab',
    drugClassNameEn: 'Glycoengineered Type II Anti-CD20 Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '1000 mg / 40 mL (25 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 40 mL',
    indications:
      'In combination with chlorambucil for adult patients with previously untreated chronic lymphocytic leukaemia (CLL) and comorbidities making them unsuitable for full-dose fludarabine-based therapy; and in combination with chemotherapy (or bendamustine) followed by Gazyvaro maintenance for follicular lymphoma (FL).',
    adultDosage:
      'Cycle 1 (CLL): 100 mg IV on Day 1, 900 mg IV on Day 2 (or 1000 mg on Day 1), and 1000 mg IV on Days 8 and 15; Cycles 2–6: 1000 mg IV on Day 1 of each 28-day cycle. Follicular lymphoma: 1000 mg IV on Days 1, 8, and 15 of Cycle 1, then Day 1 of Cycles 2–6 (or 2–8), followed by 1000 mg every 2 months for up to 2 years.',
    contraindications:
      'Hypersensitivity to obinutuzumab or any of the excipients.',
    sideEffects:
      'Infusion-related reactions, neutropenia, thrombocytopenia, anaemia, leukopenia, infections, tumour lysis syndrome, pyrexia, cough, diarrhoea, and hepatitis B reactivation.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA EPAR — Gazyvaro (obinutuzumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/gazyvaro',
  },
  {
    brandName: 'Tecentriq 1200 mg/20 mL',
    brandNameAr: 'تيسينتريك 1200 ملغم/20 مل',
    genericName: 'Atezolizumab',
    drugClassNameEn: 'Anti-PD-L1 Monoclonal Antibodies (Immune Checkpoint Inhibitors)',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '1200 mg / 20 mL (60 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 20 mL',
    indications:
      'Treatment of adult patients with locally advanced or metastatic urothelial carcinoma, early-stage (adjuvant) and metastatic non-small cell lung cancer (NSCLC), extensive-stage small cell lung cancer (ES-SCLC, in combination with carboplatin and etoposide), triple-negative breast cancer (TNBC), and advanced or unresectable hepatocellular carcinoma (HCC, in combination with bevacizumab).',
    adultDosage:
      '1200 mg infused intravenously every 3 weeks (initial infusion over 60 minutes; if tolerated, subsequent infusions may be given over 30 minutes), or 840 mg every 2 weeks, or 1680 mg every 4 weeks.',
    contraindications:
      'Hypersensitivity to atezolizumab or any of the excipients.',
    sideEffects:
      'Fatigue, decreased appetite, nausea, vomiting, diarrhoea, pyrexia, rash, pruritus, arthralgia, hypothyroidism/hyperthyroidism, and immune-mediated adverse reactions (pneumonitis, hepatitis, colitis, endocrinopathies, nephritis, myocarditis).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology', 'Pulmonology', 'Hepatology', 'Urology'],
    sourceTitle: 'EMA EPAR — Tecentriq (atezolizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tecentriq',
  },
  {
    brandName: 'Alecensa 150 mg',
    brandNameAr: 'أليسينسا 150 ملغم',
    genericName: 'Alectinib',
    drugClassNameEn: 'Anaplastic Lymphoma Kinase (ALK) and RET Tyrosine Kinase Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '224 hard capsules (4 multipacks x 56 capsules)',
    indications:
      'Monotherapy as adjuvant treatment following complete tumour resection for adult patients with ALK-positive non-small cell lung cancer (NSCLC) at high risk of recurrence; and first-line or post-crizotinib monotherapy for adult patients with ALK-positive advanced NSCLC.',
    adultDosage:
      'Recommended dose is 600 mg (four 150 mg capsules) taken orally twice daily WITH FOOD (total daily dose of 1200 mg) until disease progression or unacceptable toxicity (or for 2 years in the adjuvant setting).',
    contraindications:
      'Hypersensitivity to alectinib or any of the excipients.',
    sideEffects:
      'Constipation, myalgia, increased blood creatine phosphokinase (CPK), peripheral oedema, anaemia, haemolytic anaemia, increased bilirubin/ALT/AST, bradycardia, visual disturbances, photosensitivity, and rare interstitial lung disease / pneumonitis.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA EPAR — Alecensa (alectinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alecensa',
  },
  {
    brandName: 'Xeloda 150 mg',
    brandNameAr: 'زيلودا 150 ملغم',
    genericName: 'Capecitabine',
    drugClassNameEn: 'Oral Fluoropyrimidine Antimetabolites (5-Fluorouracil Prodrug)',
    dosageForm: 'Film-coated tablet',
    strength: '150 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets',
    indications:
      'Adjuvant treatment of stage III (Dukes’ stage C) colon cancer; treatment of metastatic colorectal cancer; first-line treatment of advanced gastric cancer in combination with a platinum-based regimen; and treatment of locally advanced or metastatic breast cancer (in combination with docetaxel after anthracycline failure, or as monotherapy after taxane and anthracycline failure).',
    adultDosage:
      'Monotherapy (colon, colorectal, breast cancer): 1250 mg/m² orally twice daily (morning and evening) for 14 days followed by a 7-day rest period (21-day cycle); in combination regimens: 800–1000 mg/m² twice daily for 14 days followed by a 7-day rest period. Swallow whole with water within 30 minutes after a meal.',
    contraindications:
      'Known complete dihydropyrimidine dehydrogenase (DPD) deficiency (test for DPD deficiency prior to initiation); recent or concomitant treatment with brivudine (must wait at least 4 weeks after stopping brivudine); severe leukopenia, neutropenia, or thrombocytopenia; severe hepatic impairment; severe renal impairment (CrCl <30 mL/min); and history of severe and unexpected reactions to fluoropyrimidine therapy.',
    sideEffects:
      'Palmar-plantar erythrodysaesthesia (hand-foot syndrome), diarrhoea, nausea, vomiting, stomatitis, abdominal pain, fatigue, anorexia, myelosuppression, and cardiotoxicity (coronary vasospasm/angina).',
    storageConditions:
      'Do not store above 30°C; store in the original package to protect from moisture.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR — Xeloda (capecitabine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeloda',
  },
  {
    brandName: 'Xeloda 500 mg',
    brandNameAr: 'زيلودا 500 ملغم',
    genericName: 'Capecitabine',
    drugClassNameEn: 'Oral Fluoropyrimidine Antimetabolites (5-Fluorouracil Prodrug)',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '120 film-coated tablets',
    indications:
      'Adjuvant treatment of stage III colon cancer, treatment of metastatic colorectal cancer, first-line treatment of advanced gastric cancer (with platinum), and treatment of locally advanced or metastatic breast cancer.',
    adultDosage:
      '1000–1250 mg/m² orally twice daily (combined using 500 mg and 150 mg tablets according to BSA) taken within 30 minutes after the end of a meal for 14 days followed by a 7-day rest period (reduce starting dose by 25% in moderate renal impairment, CrCl 30–50 mL/min).',
    contraindications:
      'Known complete DPD deficiency, recent or concomitant brivudine (fatal drug interaction), severe renal impairment (CrCl <30 mL/min), severe hepatic impairment, and severe cytopenias.',
    sideEffects:
      'Hand-foot syndrome, diarrhoea, stomatitis, nausea, vomiting, fatigue, neutropenia, anaemia, hyperbilirubinaemia, and coronary vasospasm.',
    storageConditions:
      'Do not store above 30°C; store in the original blister package to protect from moisture.',
    specialties: ['Oncology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR — Xeloda (capecitabine) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeloda',
  },
  {
    brandName: 'Polivy 140 mg',
    brandNameAr: 'بوليفي 140 ملغم',
    genericName: 'Polatuzumab vedotin',
    drugClassNameEn: 'CD79b-Directed Antibody-Drug Conjugates (ADCs)',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '140 mg',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    indications:
      'In combination with rituximab, cyclophosphamide, doxorubicin, and prednisone (R-CHP) for the treatment of adult patients with previously untreated diffuse large B-cell lymphoma (DLBCL); and in combination with bendamustine and rituximab for adult patients with relapsed/refractory DLBCL who are not candidates for haematopoietic stem cell transplant.',
    adultDosage:
      'Recommended dose is 1.8 mg/kg given as an intravenous infusion every 21 days for 6 cycles in combination with R-CHP or bendamustine + rituximab. Premedicate with an antihistamine and an antipyretic.',
    contraindications:
      'Hypersensitivity to polatuzumab vedotin or any excipient, and active severe infections.',
    sideEffects:
      'Peripheral neuropathy, neutropenia, febrile neutropenia, thrombocytopenia, anaemia, diarrhoea, nausea, constipation, fatigue, mucositis, and infusion-related reactions.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA EPAR — Polivy (polatuzumab vedotin) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/polivy',
  },

  // =========================================================================
  // 3. NEUROSCIENCE — RIVOTRIL, MADOPAR, OCREVUS, EVRYSDI, ENSPRYNG (7 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Rivotril 0.5 mg',
    brandNameAr: 'ريفوتريل 0.5 ملغم',
    genericName: 'Clonazepam',
    drugClassNameEn: 'Benzodiazepine Antiepileptics',
    dosageForm: 'Tablet',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '50 tablets',
    indications:
      'Treatment of all clinical forms of epileptic disease and seizures in infants, children, and adults, especially absence seizures (petit mal), myoclonic seizures, akinetic seizures, tonic-clonic seizures, and focal seizures.',
    adultDosage:
      'Initial dose for adults should not exceed 1.5 mg/day divided into 3 doses (such as 0.5 mg three times daily or 0.5 mg in the evening), increased in increments of 0.5 mg every 3 days until seizures are controlled (usual maintenance dose 3–6 mg/day; maximum 20 mg/day). Never discontinue abruptly.',
    contraindications:
      'Hypersensitivity to clonazepam or other benzodiazepines, severe respiratory insufficiency, severe hepatic insufficiency, myasthenia gravis, sleep apnoea syndrome, and acute alcohol or drug intoxication.',
    sideEffects:
      'Somnolence, dizziness, ataxia, muscle hypotonia, fatigue, impaired concentration, anterograde amnesia, paradoxical agitation, respiratory depression, and physical/psychological dependence.',
    storageConditions:
      'Store below 30°C in the original package to protect from light.',
    specialties: ['Neurology', 'Psychiatry', 'Pediatrics'],
    sourceTitle: 'HPRA Regulatory Monograph — Rivotril (clonazepam) Tablets',
    sourceUrl: 'https://assets.hpra.ie/products/Human/30767/90b7d8b9-1efa-4c5e-b120-522ce1834e73.pdf',
  },
  {
    brandName: 'Rivotril 2 mg',
    brandNameAr: 'ريفوتريل 2 ملغم',
    genericName: 'Clonazepam',
    drugClassNameEn: 'Benzodiazepine Antiepileptics',
    dosageForm: 'Tablet (cross-scored)',
    strength: '2 mg',
    route: 'Oral',
    packSize: '30 tablets (or 100 tablets)',
    indications:
      'Maintenance treatment of generalized and focal epilepsies in adults and children after gradual dose titration.',
    adultDosage:
      'Usual adult maintenance dose is 4 mg to 8 mg daily divided into 3 or 4 doses (maximum 20 mg daily). Taper gradually when discontinuing to avoid status epilepticus or withdrawal seizures.',
    contraindications:
      'Hypersensitivity to benzodiazepines, severe respiratory insufficiency, severe hepatic impairment, sleep apnoea syndrome, and myasthenia gravis.',
    sideEffects:
      'Drowsiness, ataxia, dizziness, muscle weakness, coordination disturbances, hypersalivation or bronchial hypersecretion (in infants/children), and dependence.',
    storageConditions:
      'Store below 30°C in the original package to protect from light.',
    specialties: ['Neurology', 'Psychiatry'],
    sourceTitle: 'HPRA Regulatory Monograph — Rivotril (clonazepam) Tablets',
    sourceUrl: 'https://assets.hpra.ie/products/Human/30767/90b7d8b9-1efa-4c5e-b120-522ce1834e73.pdf',
  },
  {
    brandName: 'Madopar 200 mg/50 mg',
    brandNameAr: 'مادوبار 200 ملغم/50 ملغم',
    genericName: 'Levodopa + Benserazide',
    drugClassNameEn: 'Dopamine Precursor and Peripheral Decarboxylase Inhibitor Combinations',
    dosageForm: 'Tablet (scored)',
    strength: '200 mg levodopa / 50 mg benserazide',
    route: 'Oral',
    packSize: '100 tablets',
    indications:
      'Treatment of Parkinson’s disease (idiopathic and post-encephalitic parkinsonism, except drug-induced parkinsonism).',
    adultDosage:
      'After initial gradual titration (starting at 50 mg/12.5 mg three to four times daily), usual maintenance dosage is 400–800 mg levodopa / 100–200 mg benserazide daily divided into 3 to 6 administrations, taken at least 30 minutes before or 1 hour after meals. Do not stop abruptly (risk of neuroleptic malignant-like syndrome).',
    contraindications:
      'Concomitant use with non-selective monoamine oxidase (MAO) inhibitors or combined MAO-A + MAO-B inhibitors, decompensated endocrine, renal, or hepatic function, cardiac disorders, psychiatric diseases with a psychotic component, closed-angle glaucoma, patients under 25 years of age (skeletal development must be complete), and pregnancy/lactation.',
    sideEffects:
      'Dyskinesia (choreiform or dystonic involuntary movements), motor fluctuations (wearing-off and on-off phenomena), nausea, vomiting, orthostatic hypotension, insomnia, hallucinations, confusion, and impulse control disorders.',
    storageConditions:
      'Store below 25°C in a tightly closed bottle to protect from moisture.',
    specialties: ['Neurology'],
    sourceTitle: 'UK EMC — Madopar (levodopa / benserazide) Official Information',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1111/pil',
  },
  {
    brandName: 'Ocrevus 300 mg/10 mL',
    brandNameAr: 'أوكريفوس 300 ملغم/10 مل',
    genericName: 'Ocrelizumab',
    drugClassNameEn: 'Humanised Anti-CD20 Monoclonal Antibodies for Multiple Sclerosis',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '300 mg / 10 mL (30 mg/mL)',
    route: 'Intravenous infusion',
    packSize: '1 vial x 10 mL',
    indications:
      'Treatment of adult patients with relapsing forms of multiple sclerosis (RMS) with active disease defined by clinical or imaging features; and treatment of adult patients with early primary progressive multiple sclerosis (PPMS) in terms of disease duration and level of disability, coupled with imaging features characteristic of inflammatory activity.',
    adultDosage:
      'Initial dose: 600 mg administered as two separate intravenous infusions — first as a 300 mg infusion on Day 1, followed 2 weeks later by a second 300 mg infusion on Day 15. Subsequent maintenance doses: single 600 mg (two 300 mg vials) intravenous infusion every 6 months. Premedicate with 100 mg IV methylprednisolone and an antihistamine prior to every infusion.',
    contraindications:
      'Hypersensitivity to ocrelizumab or any excipient, current active infection, patients in a severely immunocompromised state, and known active malignancies.',
    sideEffects:
      'Infusion-related reactions (pruritus, rash, throat irritation, flushing, hypotension, pyrexia), upper respiratory tract infections, nasopharyngitis, sinusitis, bronchitis, herpes infections, decreased immunoglobulins (IgM/IgG), and neutropenia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze or shake.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR — Ocrevus (ocrelizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ocrevus',
  },
  {
    brandName: 'Evrysdi 0.75 mg/mL',
    brandNameAr: 'إفريسدي 0.75 ملغم/مل',
    genericName: 'Risdiplam',
    drugClassNameEn: 'Survival of Motor Neuron 2 (SMN2) Pre-mRNA Splicing Modifiers',
    dosageForm: 'Powder for oral solution',
    strength: '0.75 mg/mL after reconstitution (60 mg in 80 mL)',
    route: 'Oral',
    packSize: '1 bottle powder + oral syringes',
    indications:
      'Treatment of 5q spinal muscular atrophy (SMA) in patients with a clinical diagnosis of SMA Type 1, Type 2, or Type 3 or with one to four SMN2 copies.',
    adultDosage:
      'Administered orally once daily after a meal at approximately the same time each day using the provided reusable oral syringe: Age ≥2 years and body weight ≥20 kg: 5 mg (6.6 mL) once daily; Age 2 months to <2 years: 0.20 mg/kg once daily; Age ≥2 years and <20 kg: 0.25 mg/kg once daily. Must be reconstituted by a healthcare professional prior to dispensing.',
    contraindications:
      'Hypersensitivity to risdiplam or any of the excipients.',
    sideEffects:
      'Diarrhoea, rash, headache, pyrexia, mouth and aphthous ulcers, urinary tract infection, and arthralgia.',
    storageConditions:
      'Powder: store in the original amber bottle to protect from light. Reconstituted oral solution: store in a refrigerator (2°C–8°C) upright in the original amber bottle for up to 64 days; do not freeze.',
    specialties: ['Neurology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Evrysdi (risdiplam) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/evrysdi',
  },
  {
    brandName: 'Enspryng 120 mg',
    brandNameAr: 'إنسبيرينغ 120 ملغم',
    genericName: 'Satralizumab',
    drugClassNameEn: 'Recycling Anti-IL-6 Receptor Monoclonal Antibodies (NMOSD)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '120 mg / 1 mL',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe x 1 mL',
    indications:
      'Monotherapy or in combination with immunosuppressive therapy (IST) for the treatment of neuromyelitis optica spectrum disorders (NMOSD) in adult and adolescent patients from 12 years of age who are anti-aquaporin-4 IgG (AQP4-IgG) seropositive.',
    adultDosage:
      'Loading dose: 120 mg by subcutaneous injection into the abdomen or thigh every 2 weeks for the first three administrations (Weeks 0, 2, and 4). Maintenance dose: 120 mg by subcutaneous injection every 4 weeks starting at Week 8.',
    contraindications:
      'Hypersensitivity to satralizumab or any of the excipients.',
    sideEffects:
      'Headache, arthralgia, hyperlipidaemia, injection-site reactions, leukopenia, neutropenia, hypofibrinogenaemia, and elevated hepatic transaminases.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light and moisture; do not freeze.',
    specialties: ['Neurology', 'Ophthalmology', 'Immunology'],
    sourceTitle: 'EMA EPAR — Enspryng (satralizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/enspryng',
  },

  // =========================================================================
  // 4. HEMATOLOGY, NEPHROLOGY, RESPIRATORY & OPHTHALMOLOGY — HEMLIBRA, MIRCERA, NEORECORMON, PULMOZYME, VABYSMO (11 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Hemlibra 30 mg/1 mL',
    brandNameAr: 'هيمليبرا 30 ملغم/1 مل',
    genericName: 'Emicizumab',
    drugClassNameEn: 'Bispecific Factor IXa- and Factor X-Directed Monoclonal Antibodies',
    dosageForm: 'Solution for injection',
    strength: '30 mg / 1 mL (30 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 vial x 1 mL',
    indications:
      'Routine prophylaxis of bleeding episodes in patients with haemophilia A (congenital factor VIII deficiency) with factor VIII inhibitors, or severe (<1% FVIII) or moderate (1% to 5% FVIII with severe bleeding phenotype) haemophilia A without factor VIII inhibitors, across all age groups.',
    adultDosage:
      'Loading dose: 3 mg/kg once weekly for the first 4 weeks by subcutaneous injection, followed from Week 5 by maintenance dosing of either 1.5 mg/kg once weekly, 3 mg/kg every 2 weeks, or 6 mg/kg every 4 weeks. Never combine high-dose aPCC (>100 U/kg/24h for ≥24h) due to risk of thrombotic microangiopathy and thromboembolism.',
    contraindications:
      'Hypersensitivity to emicizumab or any of the excipients.',
    sideEffects:
      'Injection-site reactions, arthralgia, headache, pyrexia, diarrhoea, myalgia, and thrombotic microangiopathy or thromboembolism when co-administered with high-dose activated prothrombin complex concentrate (aPCC).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze. Unopened vials may be stored at room temperature (<30°C) for up to 7 days.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Hemlibra (emicizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/hemlibra',
  },
  {
    brandName: 'Hemlibra 60 mg/0.4 mL',
    brandNameAr: 'هيمليبرا 60 ملغم/0.4 مل',
    genericName: 'Emicizumab',
    drugClassNameEn: 'Bispecific Factor IXa- and Factor X-Directed Monoclonal Antibodies',
    dosageForm: 'Solution for injection',
    strength: '60 mg / 0.4 mL (150 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 vial x 0.4 mL',
    indications:
      'Routine prophylaxis of bleeding episodes in patients with haemophilia A with or without factor VIII inhibitors.',
    adultDosage:
      'Loading: 3 mg/kg SC once weekly for 4 weeks. Maintenance (from Week 5): 1.5 mg/kg once weekly, 3 mg/kg every 2 weeks, or 6 mg/kg every 4 weeks. Do not combine vials of different concentrations (30 mg/mL and 150 mg/mL) in a single syringe.',
    contraindications:
      'Hypersensitivity to emicizumab or any of the excipients.',
    sideEffects:
      'Injection-site reactions, arthralgia, headache, pyrexia, and thrombotic microangiopathy or thromboembolism if co-administered with high-dose aPCC.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Hemlibra (emicizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/hemlibra',
  },
  {
    brandName: 'Hemlibra 105 mg/0.7 mL',
    brandNameAr: 'هيمليبرا 105 ملغم/0.7 مل',
    genericName: 'Emicizumab',
    drugClassNameEn: 'Bispecific Factor IXa- and Factor X-Directed Monoclonal Antibodies',
    dosageForm: 'Solution for injection',
    strength: '105 mg / 0.7 mL (150 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 vial x 0.7 mL',
    indications:
      'Routine prophylaxis of bleeding episodes in patients with haemophilia A with or without factor VIII inhibitors.',
    adultDosage:
      'Loading: 3 mg/kg SC once weekly for 4 weeks. Maintenance: 1.5 mg/kg once weekly, 3 mg/kg every 2 weeks, or 6 mg/kg every 4 weeks into the abdomen, upper outer arm, or thigh.',
    contraindications:
      'Hypersensitivity to emicizumab or any of the excipients.',
    sideEffects:
      'Injection-site reactions, headache, arthralgia, pyrexia, diarrhoea, and TMA/thromboembolism if combined with high-dose aPCC.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Hemlibra (emicizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/hemlibra',
  },
  {
    brandName: 'Hemlibra 150 mg/1 mL',
    brandNameAr: 'هيمليبرا 150 ملغم/1 مل',
    genericName: 'Emicizumab',
    drugClassNameEn: 'Bispecific Factor IXa- and Factor X-Directed Monoclonal Antibodies',
    dosageForm: 'Solution for injection',
    strength: '150 mg / 1 mL (150 mg/mL)',
    route: 'Subcutaneous',
    packSize: '1 vial x 1 mL',
    indications:
      'Routine prophylaxis of bleeding episodes in patients with haemophilia A with or without factor VIII inhibitors.',
    adultDosage:
      'Loading: 3 mg/kg SC once weekly for 4 weeks. Maintenance: 1.5 mg/kg once weekly, 3 mg/kg every 2 weeks, or 6 mg/kg every 4 weeks (maximum volume per single subcutaneous injection is 2 mL).',
    contraindications:
      'Hypersensitivity to emicizumab or any of the excipients.',
    sideEffects:
      'Injection-site reactions, arthralgia, headache, pyrexia, and TMA/thromboembolism if combined with high-dose aPCC.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) protected from light; do not freeze.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — Hemlibra (emicizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/hemlibra',
  },
  {
    brandName: 'Mircera 50 mcg/0.3 mL',
    brandNameAr: 'ميرسيرا 50 ميكروغرام/0.3 مل',
    genericName: 'Methoxy polyethylene glycol-epoetin beta',
    drugClassNameEn: 'Continuous Erythropoietin Receptor Activators (Long-Acting ESAs)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '50 mcg / 0.3 mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 pre-filled syringe x 0.3 mL',
    indications:
      'Treatment of symptomatic anaemia associated with chronic kidney disease (CKD) in adult and paediatric patients (aged 3 months to <18 years converting from another ESA).',
    adultDosage:
      'ESA-naive patients: 0.6 mcg/kg administered once every 2 weeks SC or IV (or 1.2 mcg/kg SC once every month in non-dialysis patients) to increase haemoglobin to 10–12 g/dL, then convert to once-monthly maintenance dosing.',
    contraindications:
      'Uncontrolled hypertension, and hypersensitivity to methoxy polyethylene glycol-epoetin beta or any excipient.',
    sideEffects:
      'Hypertension, vascular access thrombosis, headache, thromboembolic events, thrombocytopenia, and very rare pure red cell aplasia (PRCA) or severe cutaneous adverse reactions.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze. May be kept at room temperature (≤30°C) for a single period of 1 month.',
    specialties: ['Nephrology', 'Hematology'],
    sourceTitle: 'EMA EPAR — Mircera (methoxy polyethylene glycol-epoetin beta) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mircera',
  },
  {
    brandName: 'Mircera 100 mcg/0.3 mL',
    brandNameAr: 'ميرسيرا 100 ميكروغرام/0.3 مل',
    genericName: 'Methoxy polyethylene glycol-epoetin beta',
    drugClassNameEn: 'Continuous Erythropoietin Receptor Activators (Long-Acting ESAs)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '100 mcg / 0.3 mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 pre-filled syringe x 0.3 mL',
    indications:
      'Treatment of symptomatic anaemia associated with chronic kidney disease (CKD) in adult and paediatric patients.',
    adultDosage:
      'Once-monthly or once-every-two-weeks SC or IV maintenance dosing individualized to maintain haemoglobin between 10 and 12 g/dL (do not exceed 12 g/dL).',
    contraindications:
      'Uncontrolled hypertension, and hypersensitivity to the active substance or any excipient.',
    sideEffects:
      'Hypertension, shunt/vascular access thrombosis, headache, stroke/thromboembolic events, and rare pure red cell aplasia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Nephrology', 'Hematology'],
    sourceTitle: 'EMA EPAR — Mircera (methoxy polyethylene glycol-epoetin beta) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mircera',
  },
  {
    brandName: 'Mircera 200 mcg/0.3 mL',
    brandNameAr: 'ميرسيرا 200 ميكروغرام/0.3 مل',
    genericName: 'Methoxy polyethylene glycol-epoetin beta',
    drugClassNameEn: 'Continuous Erythropoietin Receptor Activators (Long-Acting ESAs)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '200 mcg / 0.3 mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 pre-filled syringe x 0.3 mL',
    indications:
      'Once-monthly maintenance treatment of symptomatic anaemia associated with chronic kidney disease (CKD) in patients converted from higher weekly doses of epoetin or darbepoetin alfa.',
    adultDosage:
      '200 mcg administered subcutaneously or intravenously once monthly (or 100 mcg every 2 weeks) when converting from weekly epoetin 8000–16000 IU or darbepoetin alfa 40–80 mcg; adjust dose at monthly intervals to maintain haemoglobin 10–12 g/dL.',
    contraindications:
      'Uncontrolled hypertension, and hypersensitivity to the active substance or any excipient.',
    sideEffects:
      'Hypertension, vascular access thrombosis, headache, thromboembolic events, and rare pure red cell aplasia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Nephrology', 'Hematology'],
    sourceTitle: 'EMA EPAR — Mircera (methoxy polyethylene glycol-epoetin beta) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mircera',
  },
  {
    brandName: 'NeoRecormon 4000 IU',
    brandNameAr: 'نيوريكورمون 4000 وحدة دولية',
    genericName: 'Epoetin beta',
    drugClassNameEn: 'Recombinant Human Erythropoietins (ESAs)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '4000 IU / 0.3 mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '6 pre-filled syringes x 0.3 mL',
    indications:
      'Treatment of symptomatic anaemia associated with chronic renal failure in adult and paediatric patients; prevention of anaemia of prematurity in preterm infants (birth weight 750–1500 g and gestational age <34 weeks); treatment of symptomatic anaemia in adult patients with non-myeloid malignancies receiving chemotherapy; and increasing the yield of autologous blood in patients in a predonation programme.',
    adultDosage:
      'Chronic renal failure correction phase: SC 3 x 20 IU/kg per week (or daily), or IV 3 x 40 IU/kg per week, titrated every 4 weeks to maintain target haemoglobin of 10–12 g/dL.',
    contraindications:
      'Uncontrolled hypertension, and myocardial infarction or stroke within the month preceding treatment, unstable angina pectoris, or deep venous thrombosis (when used for increasing autologous blood yield).',
    sideEffects:
      'Hypertension, hypertensive crisis, headache, thromboembolic events, shunt thrombosis, thrombocytosis, and very rare anti-erythropoietin antibody-mediated pure red cell aplasia (PRCA).',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Nephrology', 'Hematology', 'Oncology', 'Pediatrics'],
    sourceTitle: 'EMA EPAR — NeoRecormon (epoetin beta) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/neorecormon',
  },
  {
    brandName: 'NeoRecormon 30000 IU',
    brandNameAr: 'نيوريكورمون 30000 وحدة دولية',
    genericName: 'Epoetin beta',
    drugClassNameEn: 'Recombinant Human Erythropoietins (ESAs)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '30000 IU / 0.6 mL',
    route: 'Subcutaneous / Intravenous',
    packSize: '1 pre-filled syringe x 0.6 mL (or 4 pre-filled syringes)',
    indications:
      'Once-weekly treatment of symptomatic anaemia in adult patients with non-myeloid malignancies receiving chemotherapy, and maintenance treatment of symptomatic anaemia associated with chronic renal failure.',
    adultDosage:
      'Chemotherapy-induced anaemia in adults: 30000 IU (approximately 450 IU/kg) administered as a single subcutaneous injection once weekly (if haemoglobin does not increase by at least 1 g/dL after 4 weeks, double the dose to 60000 IU once weekly; discontinue if no response after 8 weeks).',
    contraindications:
      'Uncontrolled hypertension, and hypersensitivity to epoetin beta or any excipient.',
    sideEffects:
      'Thromboembolic events, hypertension, headache, and rare pure red cell aplasia.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Oncology', 'Hematology', 'Nephrology'],
    sourceTitle: 'EMA EPAR — NeoRecormon (epoetin beta) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/neorecormon',
  },
  {
    brandName: 'Pulmozyme 2.5 mg/2.5 mL',
    brandNameAr: 'بلموزايم 2.5 ملغم/2.5 مل',
    genericName: 'Dornase alfa',
    drugClassNameEn: 'Recombinant Human Deoxyribonucleases (Mucolytics for Cystic Fibrosis)',
    dosageForm: 'Nebuliser solution',
    strength: '2.5 mg (2500 U) / 2.5 mL (1 mg/mL)',
    route: 'Inhalation (Nebulisation)',
    packSize: '6 single-use ampoules x 2.5 mL (or 30 ampoules)',
    indications:
      'Management of cystic fibrosis patients greater than 5 years of age with a forced vital capacity (FVC) of greater than 40% of predicted to improve pulmonary function.',
    adultDosage:
      '2.5 mg (2500 U, the contents of one 2.5 mL single-use ampoule) inhaled once daily using a recommended jet nebuliser system without dilution (patients over 21 years of age may benefit from twice-daily dosing). Do not mix with other medicines in the nebuliser bowl.',
    contraindications:
      'Hypersensitivity to dornase alfa or any of the excipients.',
    sideEffects:
      'Voice alteration (hoarseness/dysphonia), pharyngitis, laryngitis, rash, urticaria, chest pain (pleuritic/non-cardiac), conjunctivitis, dyspepsia, and transient decline in FVC at treatment initiation.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton in foil pouches to protect from light and heat.',
    specialties: ['Pulmonology', 'Pediatrics'],
    sourceTitle: 'EMA Referral — Pulmozyme (dornase alfa) Harmonised Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/pulmozyme',
  },
  {
    brandName: 'Vabysmo 120 mg/mL',
    brandNameAr: 'فابيسمو 120 ملغم/مل',
    genericName: 'Faricimab',
    drugClassNameEn: 'Bispecific Anti-Angiopoietin-2 (Ang-2) and Anti-VEGF-A Monoclonal Antibodies (Intravitreal)',
    dosageForm: 'Solution for injection',
    strength: '120 mg/mL (delivers 6 mg in 0.05 mL)',
    route: 'Intravitreal',
    packSize: '1 vial + 1 transfer filter needle',
    indications:
      'Treatment of adult patients with neovascular (wet) age-related macular degeneration (nAMD), visual impairment due to diabetic macular oedema (DME), and visual impairment due to macular oedema secondary to retinal vein occlusion (branch RVO or central RVO).',
    adultDosage:
      'Recommended dose is 6 mg (0.05 mL solution) administered by intravitreal injection every 4 weeks (monthly) for the first 4 doses (nAMD and DME) or 6 doses (RVO), followed by individualized extended dosing intervals of up to every 16 weeks (4 months) based on anatomic and visual outcomes.',
    contraindications:
      'Hypersensitivity to faricimab or any excipient, active or suspected ocular or periocular infection, and active intraocular inflammation.',
    sideEffects:
      'Cataract, conjunctival haemorrhage, vitreous detachment, increased intraocular pressure, vitreous floaters, retinal pigment epithelial tear (in nAMD), eye pain, and rare endophthalmitis or retinal vasculitis.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the outer carton to protect from light; do not freeze.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR — Vabysmo (faricimab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vabysmo',
  },
];

export const ROCHE_PRODUCTS: AiProductDraft[] = ROCHE_COMPACT_PRODUCTS.map(toRocheProductDraft);
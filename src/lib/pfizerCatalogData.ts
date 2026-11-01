import type { AiDraftSource, AiProductDraft } from './catalog';

const PFE_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactPfizerDrug {
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

function toPfizerProductDraft(item: CompactPfizerDrug): AiProductDraft {
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
    sources: PFE_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Pfizer Inc. regulatory monograph (EMA EPAR / SmPC / FDA / UK EMC); saved as draft pending verification.',
  };
}

const PFIZER_COMPACT_PRODUCTS: CompactPfizerDrug[] = [
  // =========================================================================
  // 1. CARDIOVASCULAR, THROMBOSIS & RARE CARDIOLOGY (9 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Eliquis 2.5 mg',
    brandNameAr: 'إليكويس 2.5 ملغم',
    genericName: 'Apixaban',
    drugClassNameEn: 'Direct Factor Xa Inhibitor Oral Anticoagulants (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    indications:
      'Prevention of venous thromboembolic events (VTE) in adult patients who have undergone elective hip or knee replacement surgery; prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) meeting dose-reduction criteria; treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE), and prevention of recurrent DVT and PE in adults.',
    adultDosage:
      'VTE prophylaxis post hip/knee arthroplasty: 2.5 mg orally twice daily starting 12 to 24 hours after surgery (32 to 38 days for hip, 10 to 14 days for knee). Prevention of recurrent DVT/PE after completion of 6 months of treatment: 2.5 mg twice daily. NVAF dose reduction: 2.5 mg twice daily in patients with at least two of: age ≥80 years, body weight ≤60 kg, or serum creatinine ≥1.5 mg/dL (133 micromole/L), or in severe renal impairment (CrCl 15–29 mL/min).',
    contraindications:
      'Hypersensitivity to apixaban or any excipient; active clinically significant bleeding; hepatic disease associated with coagulopathy and clinically relevant bleeding risk; lesion or condition considered a significant risk factor for major bleeding; concomitant treatment with any other anticoagulant agent except during specific switching protocols.',
    sideEffects:
      'Anemia, hemorrhage, hematoma, epistaxis, contusion, gastrointestinal bleeding, hematuria, gingival bleeding, nausea, and hypotension.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Orthopedics', 'Hematology'],
    sourceTitle: 'Eliquis (apixaban) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/eliquis',
  },
  {
    brandName: 'Eliquis 5 mg',
    brandNameAr: 'إليكويس 5 ملغم',
    genericName: 'Apixaban',
    drugClassNameEn: 'Direct Factor Xa Inhibitor Oral Anticoagulants (DOACs)',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (blister pack)',
    indications:
      'Prevention of stroke and systemic embolism in adult patients with non-valvular atrial fibrillation (NVAF) with one or more risk factors (prior stroke or TIA, age ≥75 years, hypertension, diabetes mellitus, symptomatic heart failure); treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE), and prevention of recurrent DVT and PE in adults.',
    adultDosage:
      'NVAF: 5 mg taken orally twice daily with or without food. Acute DVT and PE treatment: 10 mg taken orally twice daily for the first 7 days followed by 5 mg taken orally twice daily.',
    contraindications:
      'Hypersensitivity to apixaban; active clinically significant bleeding; hepatic disease associated with coagulopathy and clinically relevant bleeding risk; lesion or condition at significant risk for major bleeding; concomitant use of other anticoagulants.',
    sideEffects:
      'Hemorrhage (ocular, gastrointestinal, rectal, epistaxis, hematuria, contusion, hematoma), anemia, thrombocytopenia, nausea, skin rash, and elevated gamma-GT/transaminases.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine', 'Pulmonology', 'Hematology'],
    sourceTitle: 'Eliquis (apixaban) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/eliquis',
  },
  {
    brandName: 'Fragmin 2500 IU',
    brandNameAr: 'فراجمين 2500 وحدة دولية',
    genericName: 'Dalteparin',
    drugClassNameEn: 'Low Molecular Weight Heparins (LMWH)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '2500 IU / 0.2 mL',
    route: 'Subcutaneous',
    packSize: '10 pre-filled syringes × 0.2 mL',
    indications:
      'Peri- and post-operative thromboprophylaxis in patients with moderate risk of venous thromboembolism; prevention of clotting in the extracorporeal system during hemodialysis and hemofiltration.',
    adultDosage:
      'Moderate-risk surgical thromboprophylaxis: 2500 IU subcutaneously 1 to 2 hours before surgery, followed by 2500 IU subcutaneously once daily each morning until the patient is mobilized (generally 5 to 7 days or longer).',
    contraindications:
      'Hypersensitivity to dalteparin or other low molecular weight heparins and/or unfractionated heparin or pork products; confirmed or suspected immunologically mediated heparin-induced thrombocytopenia (HIT); active clinically significant bleeding (such as gastrointestinal ulceration/bleeding or cerebral hemorrhage); severe coagulation disorders; acute or subacute septic endocarditis; recent injury or operations on the central nervous system, eyes, and ears; epidural/spinal anesthesia when high therapeutic LMWH doses are used.',
    sideEffects:
      'Hemorrhage, subcutaneous hematoma at injection site, injection site pain, reversible non-immunogenic mild thrombocytopenia, transient elevation of hepatic transaminases (AST, ALT), and rare immune-mediated heparin-induced thrombocytopenia or skin necrosis.',
    storageConditions: 'Do not store above 25°C. Do not freeze.',
    specialties: ['General Surgery', 'Orthopedics', 'Internal Medicine', 'Nephrology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Fragmin 2500 IU (dalteparin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/4241/smpc',
  },
  {
    brandName: 'Fragmin 5000 IU',
    brandNameAr: 'فراجمين 5000 وحدة دولية',
    genericName: 'Dalteparin',
    drugClassNameEn: 'Low Molecular Weight Heparins (LMWH)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '5000 IU / 0.2 mL',
    route: 'Subcutaneous',
    packSize: '10 pre-filled syringes × 0.2 mL',
    indications:
      'Thromboprophylaxis in high-risk surgical procedures (such as orthopedic hip surgery or malignancy surgery) and in acutely ill medical patients with restricted mobility; prevention of clotting during hemodialysis.',
    adultDosage:
      'High-risk surgical thromboprophylaxis: 5000 IU subcutaneously the evening before surgery and 5000 IU once daily every subsequent evening (or 2500 IU 1–2 hours pre-op, 2500 IU 8–12 hours later, then 5000 IU once daily). Medical patients with restricted mobility: 5000 IU subcutaneously once daily for up to 14 days.',
    contraindications:
      'Hypersensitivity to dalteparin, other LMWHs, unfractionated heparin, or porcine products; history of confirmed or suspected immune-mediated heparin-induced thrombocytopenia; active clinically significant bleeding; severe coagulation disorders; acute septic endocarditis; recent CNS, ophthalmic, or otic trauma/surgery.',
    sideEffects:
      'Hemorrhage, injection site hematoma and pain, mild thrombocytopenia, transient transaminase elevations, and rare HIT or anaphylactoid reactions.',
    storageConditions: 'Do not store above 25°C. Do not freeze.',
    specialties: ['General Surgery', 'Orthopedics', 'Internal Medicine', 'Oncology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Fragmin (dalteparin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/4241/smpc',
  },
  {
    brandName: 'Fragmin 7500 IU',
    brandNameAr: 'فراجمين 7500 وحدة دولية',
    genericName: 'Dalteparin',
    drugClassNameEn: 'Low Molecular Weight Heparins (LMWH)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '7500 IU / 0.3 mL',
    route: 'Subcutaneous',
    packSize: '10 pre-filled syringes × 0.3 mL',
    indications:
      'Treatment of acute deep vein thrombosis (DVT) and pulmonary embolism (PE), unstable coronary artery disease (unstable angina and non-ST-elevation myocardial infarction), and extended treatment/secondary prophylaxis of venous thromboembolism in patients with solid tumors.',
    adultDosage:
      'Acute DVT/PE: 200 IU/kg body weight subcutaneously once daily (or 100 IU/kg twice daily); for body weight 46–56 kg or stepped cancer-VTE maintenance dosing, use weight-banded pre-filled syringes.',
    contraindications:
      'Hypersensitivity to dalteparin or heparins; immune-mediated HIT; active major bleeding; severe coagulation disorders; septic endocarditis; recent CNS/eye/ear surgery or trauma; neuraxial anesthesia during therapeutic anticoagulation.',
    sideEffects:
      'Bleeding complications, injection site hematoma, thrombocytopenia, transient liver enzyme increases, and rare hyperkalemia or osteoporosis with prolonged use.',
    storageConditions: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Internal Medicine', 'Cardiology', 'Oncology', 'Hematology'],
    sourceTitle: 'Fragmin (dalteparin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/4241/smpc',
  },
  {
    brandName: 'Fragmin 10000 IU',
    brandNameAr: 'فراجمين 10000 وحدة دولية',
    genericName: 'Dalteparin',
    drugClassNameEn: 'Low Molecular Weight Heparins (LMWH)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '10000 IU / mL',
    route: 'Subcutaneous',
    packSize: '5 pre-filled syringes × 1 mL',
    indications:
      'Treatment of acute deep vein thrombosis (DVT) and pulmonary embolism (PE), unstable angina and non-Q-wave myocardial infarction, and extended VTE treatment in patients with solid tumors.',
    adultDosage:
      'Acute DVT/PE: 200 IU/kg subcutaneously once daily (maximum single daily dose 18,000 IU) or 100 IU/kg subcutaneously every 12 hours. Unstable coronary artery disease: 120 IU/kg subcutaneously every 12 hours (maximum 10,000 IU/12 hours) with low-dose aspirin.',
    contraindications:
      'Hypersensitivity to dalteparin or heparins; history of immune-mediated HIT; active clinically significant bleeding; severe coagulation disorders; septic endocarditis; neuraxial anesthesia during therapeutic anticoagulation.',
    sideEffects:
      'Hemorrhage, injection site hematoma and pain, thrombocytopenia, elevated AST/ALT, and rare hyperkalemia.',
    storageConditions: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Cardiology', 'Internal Medicine', 'Oncology', 'Hematology'],
    sourceTitle: 'Fragmin (dalteparin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/4241/smpc',
  },
  {
    brandName: 'Aldactone 25 mg',
    brandNameAr: 'ألداكتون 25 ملغم',
    genericName: 'Spironolactone',
    drugClassNameEn: 'Mineralocorticoid (Aldosterone) Receptor Antagonists / Potassium-Sparing Diuretics',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets (blister pack)',
    indications:
      'NYHA Class III–IV heart failure and reduced ejection fraction to increase survival, manage edema, and reduce the need for hospitalization; essential hypertension (usually in combination with other agents); edema associated with hepatic cirrhosis or nephrotic syndrome; diagnosis and treatment of primary hyperaldosteronism.',
    adultDosage:
      'Heart failure (HFrEF): initiate at 25 mg once daily (if serum potassium ≤5.0 mEq/L and eGFR >50 mL/min/1.73 m²); may increase to 50 mg once daily as tolerated or reduce to 25 mg every other day if hyperkalemia develops. Essential hypertension: 25 to 100 mg daily in single or divided doses. Cirrhotic edema/ascites: initiate at 100 mg daily (range 25 to 200 mg daily).',
    contraindications:
      'Hyperkalemia; Addison’s disease or other conditions associated with hyperkalemia; concomitant use of eplerenone; acute renal insufficiency, significant impairment of renal excretory function, or anuria.',
    sideEffects:
      'Hyperkalemia, gynecomastia, breast tenderness, menstrual irregularities, erectile dysfunction, gastrointestinal disturbances (nausea, cramping, diarrhea), drowsiness, dizziness, headache, hyponatremia, and elevated serum creatinine/BUN.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Gastroenterology', 'Endocrinology'],
    sourceTitle: 'Aldactone (spironolactone) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2008/012151s062lbl.pdf',
  },
  {
    brandName: 'Aldactone 100 mg',
    brandNameAr: 'ألداكتون 100 ملغم',
    genericName: 'Spironolactone',
    drugClassNameEn: 'Mineralocorticoid (Aldosterone) Receptor Antagonists / Potassium-Sparing Diuretics',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets (blister pack)',
    indications:
      'Edema and ascites associated with hepatic cirrhosis, nephrotic syndrome, primary hyperaldosteronism (preoperative management and long-term maintenance), and resistant hypertension.',
    adultDosage:
      'Hepatic cirrhosis with ascites/edema: 100 mg to 400 mg daily depending on urinary Na+/K+ ratio. Primary hyperaldosteronism: 100 mg to 400 mg daily in preparation for surgery, or lowest effective maintenance dose.',
    contraindications:
      'Hyperkalemia; Addison’s disease; concomitant eplerenone; anuria or acute/severe renal insufficiency.',
    sideEffects:
      'Hyperkalemia, hyponatremia, gynecomastia, mastodynia, amenorrhea, postmenopausal bleeding, gastrointestinal upset, lethargy, and ataxia.',
    storageConditions: 'Store below 25°C.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Endocrinology', 'Nephrology', 'Cardiology'],
    sourceTitle: 'Aldactone (spironolactone) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2008/012151s062lbl.pdf',
  },
  {
    brandName: 'Vyndaqel 61 mg',
    brandNameAr: 'فينداكيل 61 ملغم',
    genericName: 'Tafamidis',
    drugClassNameEn: 'Transthyretin (TTR) Kinetic Stabilizers',
    dosageForm: 'Soft capsule',
    strength: '61 mg',
    route: 'Oral',
    packSize: '30 soft capsules (blister pack)',
    indications:
      'Treatment of wild-type or hereditary transthyretin amyloidosis in adult patients with cardiomyopathy (ATTR-CM).',
    adultDosage:
      'One Vyndaqel 61 mg free-acid soft capsule taken orally once daily, swallowed whole with or without food (61 mg tafamidis free acid corresponds to 80 mg tafamidis meglumine).',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Flatulence, diarrhea, upper abdominal pain, urinary tract infection, and increased liver function tests.',
    storageConditions: 'Do not store above 25°C. Store in the original package in order to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Vyndaqel (tafamidis) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vyndaqel',
  },

  // =========================================================================
  // 2. ANTI-INFECTIVES & HOSPITAL ANTIBIOTICS / ANTIFUNGALS (21 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Zithromax 250 mg',
    brandNameAr: 'زيثروماكس 250 ملغم',
    genericName: 'Azithromycin',
    drugClassNameEn: 'Macrolide Antibacterials (Azalides)',
    dosageForm: 'Hard capsule',
    strength: '250 mg',
    route: 'Oral',
    packSize: '6 hard capsules (blister pack)',
    indications:
      'Acute bacterial sinusitis, acute bacterial otitis media, pharyngitis, tonsillitis, acute exacerbation of chronic bronchitis, mild to moderately severe community-acquired pneumonia, skin and soft tissue infections of mild to moderate severity, and uncomplicated Chlamydia trachomatis urethritis and cervicitis.',
    adultDosage:
      'Respiratory tract and skin/soft tissue infections: 500 mg daily (two 250 mg capsules once daily) for 3 days, or 500 mg on Day 1 followed by 250 mg once daily on Days 2 to 5 (total dose 1500 mg). Uncomplicated Chlamydia trachomatis urethritis/cervicitis: 1000 mg (four 250 mg capsules) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibiotic, or to any excipient.',
    sideEffects:
      'Diarrhea, abdominal pain, nausea, flatulence, vomiting, dyspepsia, headache, dizziness, paresthesia, dysgeusia, visual impairment, deafness, pruritus, rash, arthralgia, fatigue, decreased lymphocyte count, and QT interval prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Internal Medicine', 'Pulmonology', 'Otolaryngology', 'Dermatology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Zithromax (azithromycin) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zithromax',
  },
  {
    brandName: 'Zithromax 500 mg',
    brandNameAr: 'زيثروماكس 500 ملغم',
    genericName: 'Azithromycin',
    drugClassNameEn: 'Macrolide Antibacterials (Azalides)',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '3 film-coated tablets (blister pack)',
    indications:
      'Upper and lower respiratory tract infections (sinusitis, pharyngitis/tonsillitis, acute otitis media, acute exacerbation of chronic bronchitis, community-acquired pneumonia), mild-to-moderate skin and soft tissue infections, and uncomplicated genital infections due to Chlamydia trachomatis.',
    adultDosage:
      'One 500 mg film-coated tablet once daily for 3 consecutive days (total dose 1500 mg), taken with or without food. For uncomplicated Chlamydia trachomatis urethritis/cervicitis: two 500 mg tablets (1000 mg) as a single oral dose.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, any macrolide or ketolide antibacterial, or any excipient.',
    sideEffects:
      'Diarrhea, nausea, abdominal pain, vomiting, dyspepsia, flatulence, headache, dizziness, transient transaminase elevations, and QT prolongation.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Internal Medicine', 'Pulmonology', 'Otolaryngology', 'Urology'],
    sourceTitle: 'Zithromax (azithromycin) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zithromax',
  },
  {
    brandName: 'Zithromax 200 mg/5 mL',
    brandNameAr: 'زيثروماكس 200 ملغم / 5 مل',
    genericName: 'Azithromycin',
    drugClassNameEn: 'Macrolide Antibacterials (Azalides)',
    dosageForm: 'Powder for oral suspension',
    strength: '200 mg / 5 mL',
    route: 'Oral',
    packSize: '1 bottle (15 mL or 30 mL after reconstitution)',
    indications:
      'Pediatric and adult treatment of acute bacterial otitis media, acute bacterial sinusitis, streptococcal pharyngitis/tonsillitis, community-acquired pneumonia, and skin and soft tissue infections caused by susceptible organisms.',
    adultDosage:
      'Adults: 500 mg (12.5 mL) once daily for 3 days. Pediatric dosing (referenced on label): 10 mg/kg once daily for 3 days (or 20 mg/kg/day for 3 days in streptococcal pharyngitis, up to 500 mg/day maximum).',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, or any macrolide or ketolide antibiotic.',
    sideEffects:
      'Diarrhea, loose stools, abdominal pain, nausea, vomiting, flatulence, rash, and transient hepatic enzyme elevations.',
    storageConditions: 'Store dry powder and reconstituted suspension below 30°C. Use reconstituted suspension within 5 to 10 days.',
    specialties: ['Pediatrics', 'Otolaryngology', 'Pulmonology'],
    sourceTitle: 'Zithromax (azithromycin) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zithromax',
  },
  {
    brandName: 'Zithromax IV 500 mg',
    brandNameAr: 'زيثروماكس وريدي 500 ملغم',
    genericName: 'Azithromycin',
    drugClassNameEn: 'Macrolide Antibacterials (Azalides)',
    dosageForm: 'Powder for solution for infusion',
    strength: '500 mg',
    route: 'Intravenous',
    packSize: '1 vial × 500 mg',
    indications:
      'Community-acquired pneumonia and pelvic inflammatory disease caused by susceptible organisms in adult patients who require initial intravenous therapy.',
    adultDosage:
      'Community-acquired pneumonia: 500 mg as a single daily intravenous infusion (infused over at least 60 minutes at 2 mg/mL or over 3 hours at 1 mg/mL) for at least 2 days, followed by oral azithromycin 500 mg daily to complete a 7- to 10-day course. Pelvic inflammatory disease: 500 mg IV once daily for 1 or 2 days, followed by 250 mg orally daily to complete 7 days. Never administer as an IV bolus or intramuscular injection.',
    contraindications:
      'Hypersensitivity to azithromycin, erythromycin, or any macrolide or ketolide antibiotic.',
    sideEffects:
      'Injection site pain and local inflammation, diarrhea, nausea, abdominal pain, vomiting, elevated ALT/AST, and QT prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Obstetrics and Gynecology', 'Emergency Medicine'],
    sourceTitle: 'Zithromax (azithromycin) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zithromax',
  },
  {
    brandName: 'Unasyn 1.5 g',
    brandNameAr: 'يوناسين 1.5 غم',
    genericName: 'Ampicillin + Sulbactam',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for solution for injection/infusion',
    strength: '1000 mg / 500 mg',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial × 1.5 g',
    indications:
      'Treatment of infections due to susceptible beta-lactamase-producing microorganisms: skin and skin structure infections, intra-abdominal infections, and gynecological infections caused by beta-lactamase-producing strains of Staphylococcus aureus, Escherichia coli, Klebsiella spp., Proteus mirabilis, Bacteroides spp. (including B. fragilis), Enterobacter spp., and Acinetobacter calcoaceticus.',
    adultDosage:
      '1.5 g (1 g ampicillin + 0.5 g sulbactam) to 3 g (2 g ampicillin + 1 g sulbactam) every 6 hours by slow intravenous injection over at least 10–15 minutes, intravenous infusion over 15–30 minutes, or deep intramuscular injection. Total daily dose of sulbactam should not exceed 4 g/day. Reduce dosing frequency in renal impairment.',
    contraindications:
      'History of serious hypersensitivity reactions (anaphylaxis or Stevens-Johnson syndrome) to ampicillin, sulbactam, or other beta-lactam antibacterial drugs (penicillins or cephalosporins); history of cholestatic jaundice or hepatic dysfunction associated with prior Unasyn use.',
    sideEffects:
      'Injection site pain (especially IM), thrombophlebitis, diarrhea, nausea, vomiting, candidiasis, rash, urticaria, transient increases in AST/ALT, eosinophilia, and Clostridioides difficile-associated diarrhea.',
    storageConditions: 'Store dry powder at or below 30°C prior to reconstitution.',
    specialties: ['Internal Medicine', 'General Surgery', 'Obstetrics and Gynecology', 'Urology', 'Emergency Medicine'],
    sourceTitle: 'Unasyn (ampicillin and sulbactam for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/050608s044lbl.pdf',
  },
  {
    brandName: 'Unasyn 3 g',
    brandNameAr: 'يوناسين 3 غم',
    genericName: 'Ampicillin + Sulbactam',
    drugClassNameEn: 'Aminopenicillin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for solution for injection/infusion',
    strength: '2000 mg / 1000 mg',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial × 3 g',
    indications:
      'Severe skin and skin structure infections, intra-abdominal infections, and pelvic/gynecological infections caused by susceptible beta-lactamase-producing bacteria including Acinetobacter, Bacteroides fragilis, Escherichia coli, Klebsiella, and Staphylococcus aureus.',
    adultDosage:
      '3 g (2 g ampicillin + 1 g sulbactam) administered intravenously every 6 hours (maximum 12 g Unasyn / 4 g sulbactam per day), adjusted for creatinine clearance in renal impairment.',
    contraindications:
      'History of serious hypersensitivity reaction to any penicillin, cephalosporin, or sulbactam; history of Unasyn-associated cholestatic jaundice or hepatic dysfunction.',
    sideEffects:
      'Injection site pain, phlebitis, diarrhea, rash, pruritus, elevated hepatic transaminases, anemia, thrombocytopenia, eosinophilia, and C. difficile colitis.',
    storageConditions: 'Store dry powder at or below 30°C.',
    specialties: ['Internal Medicine', 'General Surgery', 'Obstetrics and Gynecology', 'Pulmonology'],
    sourceTitle: 'Unasyn (ampicillin and sulbactam for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/050608s044lbl.pdf',
  },
  {
    brandName: 'Tygacil 50 mg',
    brandNameAr: 'تيجاسيل 50 ملغم',
    genericName: 'Tigecycline',
    drugClassNameEn: 'Glycylcycline Antibacterials',
    dosageForm: 'Powder for solution for infusion',
    strength: '50 mg',
    route: 'Intravenous',
    packSize: '10 vials × 50 mg',
    indications:
      'Complicated skin and soft tissue infections (cSSTI), excluding diabetic foot infections, and complicated intra-abdominal infections (cIAI) in adults and children from the age of 8 years, only in situations where other alternative antibiotics are not suitable.',
    adultDosage:
      'Initial loading dose of 100 mg followed by 50 mg every 12 hours for 5 to 14 days, administered strictly by intravenous infusion over 30 to 60 minutes. In severe hepatic impairment (Child-Pugh C), reduce maintenance dose to 25 mg every 12 hours after the 100 mg loading dose.',
    contraindications:
      'Hypersensitivity to tigecycline or to any excipient; patients hypersensitive to tetracycline class antibiotics may also be hypersensitive to tigecycline.',
    sideEffects:
      'Nausea, vomiting, diarrhea, abdominal pain, dyspepsia, anorexia, prolonged aPTT and prothrombin time, thrombocytopenia, dizziness, phlebitis, elevated AST/ALT and bilirubin, hyperamylasemia, acute pancreatitis, and hypoproteinemia.',
    storageConditions: 'Store below 25°C.',
    specialties: ['General Surgery', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Tygacil (tigecycline) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tygacil',
  },
  {
    brandName: 'Zavicefta 2 g/0.5 g',
    brandNameAr: 'زافيسيفتا 2 غم / 0.5 غم',
    genericName: 'Ceftazidime + Avibactam',
    drugClassNameEn: 'Third-Generation Cephalosporin & Non-Beta-Lactam Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '2000 mg / 500 mg',
    route: 'Intravenous',
    packSize: '10 vials × 2.5 g',
    indications:
      'Complicated intra-abdominal infection (cIAI), complicated urinary tract infection (cUTI) including pyelonephritis, hospital-acquired pneumonia (HAP) including ventilator-associated pneumonia (VAP), and infections due to aerobic Gram-negative organisms in patients with limited treatment options.',
    adultDosage:
      '2 g ceftazidime / 0.5 g avibactam administered by intravenous infusion over 2 hours every 8 hours for 5 to 14 days depending on indication. Requires dose reduction when creatinine clearance is ≤50 mL/min.',
    contraindications:
      'Hypersensitivity to the active substances or to any excipient; hypersensitivity to any cephalosporin antibacterial agent; severe hypersensitivity (e.g. anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (e.g. penicillins, monobactams, or carbapenems).',
    sideEffects:
      'Positive direct Coombs test, eosinophilia, thrombocytosis, thrombocytopenia, headache, dizziness, diarrhea, abdominal pain, nausea, vomiting, elevated ALT/AST and alkaline phosphatase, maculopapular rash, urticaria, pruritus, infusion site thrombosis/phlebitis, and pyrexia.',
    storageConditions: 'This medicinal product does not require any special temperature storage conditions. Store in the original package in order to protect from light.',
    specialties: ['Internal Medicine', 'Pulmonology', 'General Surgery', 'Urology', 'Emergency Medicine'],
    sourceTitle: 'Zavicefta (ceftazidime / avibactam) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zavicefta',
  },
  {
    brandName: 'Zinforo 600 mg',
    brandNameAr: 'زينفورو 600 ملغم',
    genericName: 'Ceftaroline',
    drugClassNameEn: 'Fifth-Generation Advanced Cephalosporin Antibacterials (Anti-MRSA)',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '600 mg',
    route: 'Intravenous',
    packSize: '10 vials × 600 mg',
    indications:
      'Treatment of complicated skin and soft tissue infections (cSSTI) and community-acquired pneumonia (CAP) in neonates, infants, children, adolescents, and adults.',
    adultDosage:
      '600 mg administered every 12 hours by intravenous infusion over 5 to 60 minutes (or 600 mg every 8 hours infused over 120 minutes for cSSTI caused by S. aureus with ceftaroline MIC of 2 or 4 mg/L). Adjust dose when CrCl ≤50 mL/min.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; hypersensitivity to cephalosporin antibacterial agents; immediate and severe hypersensitivity (e.g. anaphylactic reaction) to any other type of beta-lactam antibacterial agent (e.g. penicillins or carbapenems).',
    sideEffects:
      'Positive Coombs direct test, rash, pruritus, headache, dizziness, phlebitis, diarrhea, nausea, vomiting, abdominal pain, increased transaminases, pyrexia, and infusion site reactions.',
    storageConditions: 'Store below 30°C. Store in the original package in order to protect from light.',
    specialties: ['Internal Medicine', 'Pulmonology', 'Dermatology', 'General Surgery'],
    sourceTitle: 'Zinforo (ceftaroline fosamil) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zinforo',
  },
  {
    brandName: 'Zyvox 600 mg',
    brandNameAr: 'زيفوكس 600 ملغم',
    genericName: 'Linezolid',
    drugClassNameEn: 'Oxazolidinone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '600 mg',
    route: 'Oral',
    packSize: '10 film-coated tablets (blister pack)',
    indications:
      'Nosocomial pneumonia and community-acquired pneumonia known or suspected to be caused by susceptible Gram-positive bacteria (including MRSA and penicillin-resistant Streptococcus pneumoniae); complicated skin and soft tissue infections caused by susceptible Gram-positive bacteria; vancomycin-resistant Enterococcus faecium (VRE) infections.',
    adultDosage:
      '600 mg orally twice daily (every 12 hours) for 10 to 14 consecutive days (up to 28 days for VRE infections), taken with or without food. Complete blood counts should be monitored weekly.',
    contraindications:
      'Hypersensitivity to linezolid or any excipient; patients taking monoamine oxidase A or B inhibitors (e.g. phenelzine, isocarboxazid, selegiline, moclobemide) or within two weeks of taking such medicinal products; unless close blood pressure and serotonin syndrome monitoring is available: uncontrolled hypertension, pheochromocytoma, carcinoid, thyrotoxicosis, bipolar depression, or concomitant serotonergic agents (SSRIs, SNRIs, tricyclics, triptans, pethidine, buspirone) or vasopressors.',
    sideEffects:
      'Diarrhea, headache, nausea, vomiting, metallic taste, oral and vaginal candidiasis, reversible myelosuppression (anemia, leukopenia, thrombocytopenia, pancytopenia), elevated liver enzymes, peripheral and optic neuropathy (especially with treatment >28 days), lactic acidosis, and serotonin syndrome.',
    storageConditions: 'Store at 25°C (15°C to 30°C). Protect from light and moisture.',
    specialties: ['Internal Medicine', 'Pulmonology', 'General Surgery', 'Orthopedics'],
    sourceTitle: 'Zyvox (linezolid) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/021130s046,021131s044,021132s046lbl.pdf',
  },
  {
    brandName: 'Zyvox 2 mg/mL',
    brandNameAr: 'زيفوكس 2 ملغم / مل',
    genericName: 'Linezolid',
    drugClassNameEn: 'Oxazolidinone Antibacterials',
    dosageForm: 'Solution for infusion',
    strength: '600 mg / 300 mL',
    route: 'Intravenous',
    packSize: '10 infusion bags × 300 mL',
    indications:
      'Nosocomial pneumonia, community-acquired pneumonia, complicated skin and soft tissue infections, and vancomycin-resistant Enterococcus faecium infections caused by susceptible Gram-positive bacteria.',
    adultDosage:
      '600 mg (300 mL infusion bag) administered intravenously over 30 to 120 minutes every 12 hours. Patients may be switched from intravenous to oral Zyvox 600 mg twice daily at the same dose without adjustment (100% oral bioavailability).',
    contraindications:
      'Hypersensitivity to linezolid; concomitant or recent (within 14 days) MAOI use; uncontrolled hypertension, pheochromocytoma, carcinoid, thyrotoxicosis, or concomitant serotonergic/adrenergic agents without close monitoring.',
    sideEffects:
      'Diarrhea, nausea, headache, candidiasis, thrombocytopenia, anemia, leukopenia, elevated hepatic enzymes, peripheral/optic neuropathy with prolonged therapy, and lactic acidosis.',
    storageConditions: 'Store at 25°C. Keep infusion bags in the protective overwrap until ready to use to protect from light. Do not freeze.',
    specialties: ['Internal Medicine', 'Pulmonology', 'General Surgery', 'Emergency Medicine'],
    sourceTitle: 'Zyvox (linezolid) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/021130s046,021131s044,021132s046lbl.pdf',
  },
  {
    brandName: 'Vfend 200 mg',
    brandNameAr: 'فيفند 200 ملغم',
    genericName: 'Voriconazole',
    drugClassNameEn: 'Broad-Spectrum Triazole Antifungals',
    dosageForm: 'Film-coated tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets (blister pack)',
    indications:
      'Treatment of invasive aspergillosis; treatment of candidemia in non-neutropenic patients; treatment of fluconazole-resistant serious invasive Candida infections (including C. krusei); treatment of serious fungal infections caused by Scedosporium spp. and Fusarium spp.; prophylaxis of invasive fungal infections in high-risk allogeneic hematopoietic stem cell transplant (HSCT) recipients.',
    adultDosage:
      'Patients ≥40 kg: oral loading dose of 400 mg every 12 hours for the first 24 hours (2 doses), followed by a maintenance dose of 200 mg twice daily (may be increased to 300 mg twice daily if response is inadequate). Must be taken at least 1 hour before or 1 hour following a meal.',
    contraindications:
      'Hypersensitivity to voriconazole or any excipient; coadministration with CYP3A4 substrates that prolong QTc (terfenadine, astemizole, cisapride, pimozide, quinidine, ivabradine); coadministration with rifampicin, carbamazepine, phenobarbital, efavirenz (≥400 mg/day), high-dose ritonavir, ergot alkaloids, sirolimus, St John’s Wort, venetoclax at initiation/titration, lurbinectedin, naloxegol, tolvaptan, or lurasidone.',
    sideEffects:
      'Visual impairment (photophobia, blurred vision, altered color vision), pyrexia, rash, photosensitivity, vomiting, nausea, diarrhea, headache, peripheral edema, respiratory distress, and elevated hepatic enzymes/jaundice.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Hematology', 'Internal Medicine', 'Pulmonology'],
    sourceTitle: 'Vfend (voriconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vfend',
  },
  {
    brandName: 'Vfend IV 200 mg',
    brandNameAr: 'فيفند وريدي 200 ملغم',
    genericName: 'Voriconazole',
    drugClassNameEn: 'Broad-Spectrum Triazole Antifungals',
    dosageForm: 'Powder for solution for infusion',
    strength: '200 mg',
    route: 'Intravenous',
    packSize: '1 vial × 200 mg',
    indications:
      'Invasive aspergillosis, candidemia in non-neutropenic patients, fluconazole-resistant serious invasive Candida infections, serious Scedosporium and Fusarium infections, and prophylaxis of invasive fungal infections in high-risk allogeneic HSCT recipients.',
    adultDosage:
      'Intravenous loading dose of 6 mg/kg every 12 hours for the first 24 hours (2 doses), followed by maintenance dose of 4 mg/kg twice daily (or 3 mg/kg twice daily for candidemia/prophylaxis), infused at a maximum rate of 3 mg/kg/hour over 1 to 3 hours. Never administer as an IV bolus.',
    contraindications:
      'Hypersensitivity to voriconazole; coadministration with terfenadine, astemizole, cisapride, pimozide, quinidine, ivabradine, rifampicin, carbamazepine, phenobarbital, high-dose ritonavir, ergot alkaloids, sirolimus, St John’s Wort, or lurasidone.',
    sideEffects:
      'Transient visual disturbances, hepatotoxicity (elevated transaminases, bilirubin, alkaline phosphatase), rash, photosensitivity, pyrexia, peripheral edema, nausea, vomiting, hypokalemia, and infusion-related reactions.',
    storageConditions: 'This medicinal product does not require any special storage conditions prior to reconstitution.',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine', 'Pulmonology'],
    sourceTitle: 'Vfend (voriconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vfend',
  },
  {
    brandName: 'Diflucan 150 mg',
    brandNameAr: 'ديفلوكان 150 ملغم',
    genericName: 'Fluconazole',
    drugClassNameEn: 'Triazole Antifungals',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '1 hard capsule (blister pack)',
    indications:
      'Acute or recurrent vaginal candidiasis, candidal balanitis, mucosal candidiasis (oropharyngeal, esophageal), dermatomycoses (tinea pedis, tinea corporis, tinea cruris, tinea versicolor, dermal candidiasis, onychomycosis), invasive candidiasis, and cryptococcal meningitis.',
    adultDosage:
      'Acute vaginal candidiasis / candidal balanitis: 150 mg as a single oral dose. Recurrent vaginal candidiasis: 150 mg every third day for 3 doses (days 1, 4, and 7) followed by 150 mg once weekly for 6 months. Onychomycosis / dermatomycoses: 150 mg once weekly.',
    contraindications:
      'Hypersensitivity to fluconazole, related azole compounds, or any excipient; coadministration of terfenadine (with multiple doses ≥400 mg/day) or other QT-prolonging CYP3A4 substrates (cisapride, astemizole, pimozide, quinidine, erythromycin).',
    sideEffects:
      'Headache, abdominal pain, diarrhea, nausea, vomiting, elevated ALT, AST, and alkaline phosphatase, rash, and rare QT prolongation or hepatotoxicity.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Obstetrics and Gynecology', 'Dermatology', 'Internal Medicine', 'Urology'],
    sourceTitle: 'Diflucan (fluconazole) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/019949s072lbl.pdf',
  },
  {
    brandName: 'Diflucan 200 mg',
    brandNameAr: 'ديفلوكان 200 ملغم',
    genericName: 'Fluconazole',
    drugClassNameEn: 'Triazole Antifungals',
    dosageForm: 'Hard capsule',
    strength: '200 mg',
    route: 'Oral',
    packSize: '7 hard capsules (blister pack)',
    indications:
      'Invasive candidiasis (candidemia, disseminated candidiasis), cryptococcal meningitis (treatment and maintenance prophylaxis to prevent relapse), coccidioidomycosis, and prophylaxis of candidal infections in immunocompromised patients with prolonged neutropenia.',
    adultDosage:
      'Invasive candidiasis / cryptococcal meningitis: loading dose of 800 mg on Day 1, followed by 400 mg once daily. Cryptococcal meningitis maintenance prophylaxis: 200 mg once daily. Prophylaxis in neutropenic patients: 200 to 400 mg once daily.',
    contraindications:
      'Hypersensitivity to fluconazole or other azoles; coadministration with cisapride, astemizole, pimozide, quinidine, terfenadine, or erythromycin.',
    sideEffects:
      'Headache, nausea, abdominal pain, diarrhea, dyspepsia, rash, elevated liver enzymes, hypokalemia, and QT prolongation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Internal Medicine', 'Oncology', 'Hematology', 'Neurology'],
    sourceTitle: 'Diflucan (fluconazole) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/019949s072lbl.pdf',
  },
  {
    brandName: 'Diflucan 2 mg/mL',
    brandNameAr: 'ديفلوكان 2 ملغم / مل',
    genericName: 'Fluconazole',
    drugClassNameEn: 'Triazole Antifungals',
    dosageForm: 'Solution for infusion',
    strength: '200 mg / 100 mL',
    route: 'Intravenous',
    packSize: '1 vial × 100 mL',
    indications:
      'Parenteral treatment of cryptococcal meningitis, coccidioidomycosis, invasive candidiasis, mucosal candidiasis, and prophylaxis of candidal infections in patients with prolonged neutropenia.',
    adultDosage:
      '200 mg to 400 mg once daily (after an 800 mg loading dose on Day 1 for invasive candidiasis/cryptococcal meningitis), infused intravenously at a rate not exceeding 10 mL/minute (200 mg/hour). Reduce maintenance dose by 50% when CrCl ≤50 mL/min.',
    contraindications:
      'Hypersensitivity to fluconazole or related azole antifungals; coadministration with QT-prolonging CYP3A4 substrates (cisapride, astemizole, pimozide, quinidine, terfenadine, erythromycin).',
    sideEffects:
      'Headache, nausea, vomiting, diarrhea, abdominal pain, rash, elevated hepatic transaminases, and QT prolongation.',
    storageConditions: 'Store below 30°C. Do not freeze.',
    specialties: ['Internal Medicine', 'Hematology', 'Oncology', 'Emergency Medicine'],
    sourceTitle: 'Diflucan (fluconazole) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/019949s072lbl.pdf',
  },
  {
    brandName: 'Ecalta 100 mg',
    brandNameAr: 'إيكالتا 100 ملغم',
    genericName: 'Anidulafungin',
    drugClassNameEn: 'Echinocandin Antifungals',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '100 mg',
    route: 'Intravenous',
    packSize: '1 vial × 100 mg',
    indications:
      'Treatment of invasive candidiasis in adult and pediatric patients aged 1 month to <18 years.',
    adultDosage:
      'Single 200 mg loading dose on Day 1, followed by 100 mg daily thereafter for at least 14 days after the last positive culture. Administer by intravenous infusion at a rate not exceeding 1.1 mg/minute (equivalent to 1.4 mL/minute when reconstituted and diluted per instructions). No dose adjustment required for any degree of hepatic or renal insufficiency.',
    contraindications:
      'Hypersensitivity to anidulafungin, other medicinal products of the echinocandin class, or any excipient.',
    sideEffects:
      'Hypokalemia, diarrhea, nausea, coagulopathy, convulsion, headache, flushing, hot flush, hypertension, bronchospasm, dyspnea, elevated ALT/AST/alkaline phosphatase/bilirubin/GGT, rash, pruritus, and elevated blood creatinine.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Excursions up to 25°C for up to 96 hours are permitted.',
    specialties: ['Internal Medicine', 'Hematology', 'Oncology', 'General Surgery'],
    sourceTitle: 'Ecalta (anidulafungin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ecalta',
  },
  {
    brandName: 'Cresemba 100 mg',
    brandNameAr: 'كريسيمبا 100 ملغم',
    genericName: 'Isavuconazole',
    drugClassNameEn: 'Triazole Antifungals',
    dosageForm: 'Hard capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '14 hard capsules (blister pack)',
    indications:
      'Treatment of invasive aspergillosis in adults and pediatric patients from 1 year of age, and treatment of mucormycosis in patients for whom amphotericin B is inappropriate.',
    adultDosage:
      'Loading dose: 200 mg (two 100 mg capsules) every 8 hours for the first 48 hours (6 administrations in total). Maintenance dose: 200 mg (two 100 mg capsules) once daily, starting 12 to 24 hours after the last loading dose, with or without food.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; coadministration with ketoconazole, high-dose ritonavir (>200 mg every 12 hours), or strong CYP3A4/5 inducers (rifampicin, rifabutin, carbamazepine, long-acting barbiturates, phenytoin, St John’s Wort) or moderate CYP3A4/5 inducers (efavirenz, nafcillin); patients with familial short QT syndrome.',
    sideEffects:
      'Elevated liver chemistry tests, nausea, vomiting, diarrhea, abdominal pain, hypokalemia, decreased appetite, delirium, headache, somnolence, dyspnea, acute respiratory failure, rash, pruritus, renal failure, and shortened QTc interval.',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine', 'Pulmonology'],
    sourceTitle: 'Cresemba (isavuconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cresemba',
  },
  {
    brandName: 'Cresemba 200 mg',
    brandNameAr: 'كريسيمبا 200 ملغم',
    genericName: 'Isavuconazole',
    drugClassNameEn: 'Triazole Antifungals',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '200 mg',
    route: 'Intravenous',
    packSize: '1 vial × 200 mg',
    indications:
      'Intravenous treatment of invasive aspergillosis and mucormycosis (when amphotericin B is inappropriate).',
    adultDosage:
      'Loading dose: one 200 mg vial every 8 hours for the first 48 hours (6 doses total). Maintenance dose: one 200 mg vial once daily starting 12 to 24 hours after the last loading dose, infused over at least 1 hour through an in-line filter (0.2 to 1.2 micron).',
    contraindications:
      'Hypersensitivity to isavuconazole; coadministration with ketoconazole, high-dose ritonavir, strong/moderate CYP3A4/5 inducers (rifampicin, carbamazepine, phenytoin, efavirenz, St John’s Wort); familial short QT syndrome.',
    sideEffects:
      'Elevated hepatic enzymes, nausea, vomiting, diarrhea, hypokalemia, headache, dyspnea, rash, infusion site reactions, and dose-related QTc shortening.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C).',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine', 'Pulmonology'],
    sourceTitle: 'Cresemba (isavuconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cresemba',
  },
  {
    brandName: 'Dalacin C 150 mg',
    brandNameAr: 'دالاسين سي 150 ملغم',
    genericName: 'Clindamycin',
    drugClassNameEn: 'Lincosamide Antibacterials',
    dosageForm: 'Hard capsule',
    strength: '150 mg',
    route: 'Oral',
    packSize: '24 hard capsules (blister pack)',
    indications:
      'Treatment of serious infections caused by susceptible anaerobic bacteria or susceptible strains of Gram-positive aerobic bacteria such as streptococci, staphylococci, and pneumococci: upper and lower respiratory tract infections, skin and soft tissue infections, bone and joint infections (including acute hematogenous osteomyelitis), pelvic and intra-abdominal infections, and dental infections.',
    adultDosage:
      '150 to 300 mg every 6 hours; in more severe infections, 300 to 450 mg every 6 hours. Capsules must be swallowed whole with a full glass of water in an upright position to avoid esophageal irritation.',
    contraindications:
      'Hypersensitivity to clindamycin, lincomycin, or any of the excipients.',
    sideEffects:
      'Abdominal pain, diarrhea, pseudomembranous colitis (Clostridioides difficile colitis), nausea, vomiting, esophagitis, esophageal ulcer, abnormal liver function tests, maculopapular rash, and urticaria.',
    storageConditions: 'Do not store above 25°C.',
    specialties: ['Internal Medicine', 'Orthopedics', 'General Surgery', 'Obstetrics and Gynecology', 'Dermatology'],
    sourceTitle: 'Dalacin C 150 mg Capsules (clindamycin) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6809/pil',
  },
  {
    brandName: 'Dalacin C 300 mg',
    brandNameAr: 'دالاسين سي 300 ملغم',
    genericName: 'Clindamycin',
    drugClassNameEn: 'Lincosamide Antibacterials',
    dosageForm: 'Hard capsule',
    strength: '300 mg',
    route: 'Oral',
    packSize: '16 hard capsules (blister pack)',
    indications:
      'Serious anaerobic and Gram-positive aerobic bacterial infections including skin and soft tissue infections, osteomyelitis, septic arthritis, pelvic inflammatory disease, intra-abdominal infections, and severe odontogenic infections.',
    adultDosage:
      '300 mg to 450 mg orally every 6 hours, swallowed whole with a full glass of water.',
    contraindications:
      'Hypersensitivity to clindamycin, lincomycin, or any excipient.',
    sideEffects:
      'Diarrhea, Clostridioides difficile colitis, abdominal pain, nausea, vomiting, esophagitis, elevated transaminases, and skin rash.',
    storageConditions: 'Do not store above 25°C.',
    specialties: ['Internal Medicine', 'Orthopedics', 'General Surgery', 'Obstetrics and Gynecology', 'Dermatology'],
    sourceTitle: 'Dalacin C Capsules (clindamycin) — UK EMC Official PIL/SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6809/pil',
  },

  // =========================================================================
  // 3. INFLAMMATION, IMMUNOLOGY & MIGRAINE (8 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Xeljanz 5 mg',
    brandNameAr: 'زيلجانز 5 ملغم',
    genericName: 'Tofacitinib',
    drugClassNameEn: 'Janus Kinase (JAK) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Moderate to severe active rheumatoid arthritis (RA) in adults with inadequate response or intolerance to one or more DMARDs; active psoriatic arthritis (PsA) in adults with inadequate response or intolerance to prior DMARD therapy; active ankylosing spondylitis (AS) in adults with inadequate response to conventional therapy; moderately to severely active ulcerative colitis (UC) in adults; active polyarticular juvenile idiopathic arthritis and juvenile psoriatic arthritis in patients 2 years of age and older.',
    adultDosage:
      'Rheumatoid arthritis, psoriatic arthritis, and ankylosing spondylitis: 5 mg administered orally twice daily with or without food. Ulcerative colitis maintenance: 5 mg twice daily (following 10 mg twice daily induction for 8 weeks). Reduce to 5 mg once daily in moderate hepatic impairment or severe renal impairment.',
    contraindications:
      'Hypersensitivity to tofacitinib or any excipient; active tuberculosis (TB), serious infections such as sepsis, or opportunistic infections; severe hepatic impairment (Child-Pugh C); pregnancy and lactation.',
    sideEffects:
      'Pneumonia, influenza, herpes zoster, urinary tract infection, pharyngitis, nasopharyngitis, sinusitis, anemia, headache, hypertension, cough, abdominal pain, vomiting, diarrhea, nausea, gastritis, dyspepsia, rash, arthralgia, peripheral edema, pyrexia, fatigue, increased blood creatine phosphokinase, hyperlipidemia, and increased risks of venous thromboembolism, MACE, and malignancy in high-risk populations.',
    storageConditions: 'This medicinal product does not require any special temperature storage conditions. Store in the original package in order to protect from moisture.',
    specialties: ['Rheumatology', 'Gastroenterology', 'Dermatology'],
    sourceTitle: 'Xeljanz (tofacitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeljanz',
  },
  {
    brandName: 'Xeljanz 10 mg',
    brandNameAr: 'زيلجانز 10 ملغم',
    genericName: 'Tofacitinib',
    drugClassNameEn: 'Janus Kinase (JAK) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Induction and select maintenance treatment of adult patients with moderately to severely active ulcerative colitis (UC) who have had an inadequate response, lost response, or were intolerant to either conventional therapy or a biologic agent.',
    adultDosage:
      'Ulcerative colitis induction: 10 mg given orally twice daily for 8 weeks (may be extended for an additional 8 weeks, maximum 16 weeks total), followed by 5 mg twice daily for maintenance.',
    contraindications:
      'Hypersensitivity to tofacitinib; active tuberculosis, serious systemic infections, or opportunistic infections; severe hepatic impairment; pregnancy and lactation.',
    sideEffects:
      'Herpes zoster, nasopharyngitis, upper respiratory tract infections, hypercholesterolemia, elevated creatine phosphokinase, headache, diarrhea, hypertension, and dose-dependent venous thromboembolism risk.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Gastroenterology'],
    sourceTitle: 'Xeljanz (tofacitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeljanz',
  },
  {
    brandName: 'Xeljanz XR 11 mg',
    brandNameAr: 'زيلجانز إكس آر 11 ملغم',
    genericName: 'Tofacitinib',
    drugClassNameEn: 'Janus Kinase (JAK) Inhibitors',
    dosageForm: 'Prolonged-release tablet',
    strength: '11 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (blister pack)',
    indications:
      'Once-daily treatment of moderate to severe active rheumatoid arthritis, active psoriatic arthritis, and active ankylosing spondylitis in adult patients.',
    adultDosage:
      'One 11 mg prolonged-release tablet taken orally once daily with or without food, swallowed whole without crushing, splitting, or chewing.',
    contraindications:
      'Hypersensitivity to tofacitinib; active TB, serious infections, or opportunistic infections; severe hepatic impairment; pregnancy and lactation.',
    sideEffects:
      'Upper respiratory tract infections, herpes zoster, UTI, headache, hypertension, diarrhea, nausea, hyperlipidemia, and elevated CPK.',
    storageConditions: 'Store in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Dermatology'],
    sourceTitle: 'Xeljanz (tofacitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xeljanz',
  },
  {
    brandName: 'Enbrel 25 mg',
    brandNameAr: 'إنبريل 25 ملغم',
    genericName: 'Etanercept',
    drugClassNameEn: 'Tumor Necrosis Factor-Alpha (TNF-α) Inhibitors',
    dosageForm: 'Solution for injection in pre-filled syringe',
    strength: '25 mg / 0.5 mL',
    route: 'Subcutaneous',
    packSize: '4 pre-filled syringes × 0.5 mL',
    indications:
      'Moderate to severe active rheumatoid arthritis, juvenile idiopathic arthritis (polyarthritis, extended oligoarthritis, psoriatic arthritis, enthesitis-related arthritis from age 2 or 12 years), active and progressive psoriatic arthritis, severe active ankylosing spondylitis, active non-radiographic axial spondyloarthritis, and moderate to severe plaque psoriasis in adults and pediatric patients from 6 years.',
    adultDosage:
      '25 mg administered twice weekly (or 50 mg once weekly) as a subcutaneous injection.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; sepsis or risk of sepsis; initiation in patients with active infections, including chronic or localized infections (such as active tuberculosis).',
    sideEffects:
      'Infections (upper respiratory tract infections, bronchitis, cystitis, skin infections), injection site reactions (bleeding, bruising, erythema, itching, pain, swelling), allergic reactions, autoantibody formation, pruritus, rash, and pyrexia.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Rheumatology', 'Dermatology', 'Pediatrics'],
    sourceTitle: 'Enbrel (etanercept) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/enbrel',
  },
  {
    brandName: 'Enbrel 50 mg',
    brandNameAr: 'إنبريل 50 ملغم',
    genericName: 'Etanercept',
    drugClassNameEn: 'Tumor Necrosis Factor-Alpha (TNF-α) Inhibitors',
    dosageForm: 'Solution for injection in pre-filled pen',
    strength: '50 mg / mL',
    route: 'Subcutaneous',
    packSize: '4 MYCLIC pre-filled pens × 1 mL',
    indications:
      'Moderate to severe active rheumatoid arthritis, active psoriatic arthritis, severe active ankylosing spondylitis, active non-radiographic axial spondyloarthritis, and moderate to severe plaque psoriasis in adults.',
    adultDosage:
      '50 mg administered once weekly by subcutaneous injection (in plaque psoriasis, may alternatively give 50 mg twice weekly for up to 12 weeks followed by 50 mg once weekly).',
    contraindications:
      'Hypersensitivity to etanercept; sepsis or risk of sepsis; active infections including chronic or localized infections.',
    sideEffects:
      'Upper respiratory tract infections, sinusitis, bronchitis, UTI, injection site erythema/pain/swelling, pruritus, rash, headache, and rare demyelinating or hematologic reactions.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Rheumatology', 'Dermatology'],
    sourceTitle: 'Enbrel (etanercept) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/enbrel',
  },
  {
    brandName: 'Cibinqo 100 mg',
    brandNameAr: 'سيبينكو 100 ملغم',
    genericName: 'Abrocitinib',
    drugClassNameEn: 'Selective Janus Kinase 1 (JAK1) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Treatment of moderate-to-severe atopic dermatitis in adults and adolescents 12 years and older who are candidates for systemic therapy.',
    adultDosage:
      'Recommended starting dose is 100 mg or 200 mg once daily based on individual patient characteristics (100 mg once daily recommended starting dose for patients ≥65 years, adolescents, or those at higher risk of VTE, MACE, and malignancy), taken with or without food.',
    contraindications:
      'Hypersensitivity to abrocitinib or any excipient; active serious systemic infections including tuberculosis; severe hepatic impairment; pregnancy and breastfeeding.',
    sideEffects:
      'Nausea, headache, acne, herpes simplex, increased blood creatine phosphokinase, vomiting, upper abdominal pain, dizziness, herpes zoster, and thrombocytopenia.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Dermatology'],
    sourceTitle: 'Cibinqo (abrocitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cibinqo',
  },
  {
    brandName: 'Litfulo 50 mg',
    brandNameAr: 'ليتفولو 50 ملغم',
    genericName: 'Ritlecitinib',
    drugClassNameEn: 'Selective JAK3 and TEC Family Kinase Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack)',
    indications:
      'Treatment of severe alopecia areata in adults and adolescents 12 years of age and older.',
    adultDosage:
      'One 50 mg hard capsule taken orally once daily with or without food, swallowed whole.',
    contraindications:
      'Hypersensitivity to ritlecitinib or any excipient; active serious infections including tuberculosis; severe hepatic impairment; pregnancy and breastfeeding.',
    sideEffects:
      'Diarrhea, acne, upper respiratory tract infections, urticaria, rash, folliculitis, dizziness, herpes zoster, and increased blood creatine phosphokinase.',
    storageConditions: 'This medicinal product does not require any special temperature storage conditions. Store in the original package to protect from light.',
    specialties: ['Dermatology'],
    sourceTitle: 'Litfulo (ritlecitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/litfulo',
  },
  {
    brandName: 'Vydura 75 mg',
    brandNameAr: 'فيدورا 75 ملغم',
    genericName: 'Rimegepant',
    drugClassNameEn: 'Calcitonin Gene-Related Peptide (CGRP) Receptor Antagonists (Gepants)',
    dosageForm: 'Oral lyophilisate',
    strength: '75 mg',
    route: 'Oral / Sublingual',
    packSize: '8 oral lyophilisates (blister pack)',
    indications:
      'Acute treatment of migraine with or without aura in adults; preventive treatment of episodic migraine in adults who have at least 4 migraine attacks per month.',
    adultDosage:
      'Acute treatment of migraine: 75 mg as needed, once daily (maximum daily dose 75 mg). Prophylaxis of episodic migraine: 75 mg every other day. Place the oral lyophilisate on or under the tongue where it disintegrates in saliva and can be swallowed without liquid.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Nausea and hypersensitivity reactions (including rash and dyspnea).',
    storageConditions: 'Do not store above 30°C. Store in the original package in order to protect from moisture.',
    specialties: ['Neurology'],
    sourceTitle: 'Vydura (rimegepant) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vydura',
  },

  // =========================================================================
  // 4. CORTICOSTEROIDS & ENDOCRINOLOGY (10 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Medrol 4 mg',
    brandNameAr: 'ميدرول 4 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Systemic Glucocorticoids (Intermediate-Acting Corticosteroids)',
    dosageForm: 'Tablet',
    strength: '4 mg',
    route: 'Oral',
    packSize: '30 tablets (blister pack)',
    indications:
      'Endocrine, rheumatic, collagen/connective tissue, dermatologic, allergic, ophthalmic, respiratory, hematologic, neoplastic, edematous (nephrotic syndrome), gastrointestinal (ulcerative colitis, regional enteritis), and nervous system (acute exacerbations of multiple sclerosis) disorders responsive to systemic corticosteroid therapy.',
    adultDosage:
      'Initial dosage may vary from 4 mg to 48 mg of methylprednisolone per day depending on the specific disease entity being treated; once a favorable response is noted, decrease in small decrements at appropriate intervals to the lowest dosage that maintains adequate clinical response.',
    contraindications:
      'Systemic fungal infections; known hypersensitivity to methylprednisolone or any component of the formulation; administration of live or live-attenuated vaccines in patients receiving immunosuppressive doses of corticosteroids.',
    sideEffects:
      'Fluid and electrolyte retention, hypertension, hyperglycemia, Cushingoid state, HPA axis suppression, peptic ulceration, myopathy, osteoporosis, mood changes/insomnia, subcapsular cataracts, glaucoma, impaired wound healing, and increased susceptibility to infection.',
    storageConditions: 'Store at controlled room temperature 20°C to 25°C.',
    specialties: ['Rheumatology', 'Pulmonology', 'Dermatology', 'Internal Medicine', 'Neurology'],
    sourceTitle: 'Medrol (methylprednisolone tablets) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011153s083lbl.pdf',
  },
  {
    brandName: 'Medrol 16 mg',
    brandNameAr: 'ميدرول 16 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Systemic Glucocorticoids (Intermediate-Acting Corticosteroids)',
    dosageForm: 'Tablet',
    strength: '16 mg',
    route: 'Oral',
    packSize: '50 tablets (blister pack)',
    indications:
      'Systemic glucocorticoid therapy for severe rheumatic, autoimmune, allergic, dermatologic, respiratory, hematologic, renal, gastrointestinal, and neurologic inflammatory disorders.',
    adultDosage:
      'Individualized according to disease severity and patient response (4 mg to 48 mg/day or higher in acute exacerbations), tapered gradually to the minimum effective maintenance dose.',
    contraindications:
      'Systemic fungal infections; hypersensitivity to methylprednisolone; live or live-attenuated vaccines during immunosuppressive corticosteroid dosing.',
    sideEffects:
      'Sodium and fluid retention, hypokalemia, hypertension, hyperglycemia, Cushingoid features, osteoporosis, peptic ulceration, psychiatric disturbances, cataracts, and opportunistic infections.',
    storageConditions: 'Store at 20°C to 25°C.',
    specialties: ['Rheumatology', 'Pulmonology', 'Neurology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Medrol (methylprednisolone tablets) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011153s083lbl.pdf',
  },
  {
    brandName: 'Solu-Medrol 40 mg',
    brandNameAr: 'سولو-ميدرول 40 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Parenteral Glucocorticoids',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '40 mg / mL',
    route: 'Intravenous / Intramuscular',
    packSize: '1 Act-O-Vial (40 mg / 1 mL)',
    indications:
      'Acute allergic reactions, status asthmaticus, severe exacerbations of rheumatic, autoimmune, dermatologic, gastrointestinal, hematologic, or neurologic disorders, and acute adrenal insufficiency (with mineralocorticoid supplementation) when oral therapy is not feasible.',
    adultDosage:
      'Initial dose 10 mg to 40 mg administered intravenously over a period of several minutes or intramuscularly, repeated as clinically required.',
    contraindications:
      'Systemic fungal infections; known hypersensitivity to methylprednisolone or cow’s milk proteins (in formulations containing lactose of bovine origin); intrathecal or epidural administration; live vaccines during immunosuppressive dosing.',
    sideEffects:
      'Hyperglycemia, hypertension, fluid retention, hypokalemia, insomnia, mood swings, peptic ulceration, cardiac arrhythmias with rapid high-dose IV administration, and increased infection risk.',
    storageConditions: 'Store unreconstituted product at 20°C to 25°C. Protect from light.',
    specialties: ['Emergency Medicine', 'Pulmonology', 'Internal Medicine', 'Rheumatology', 'Pediatrics'],
    sourceTitle: 'Solu-Medrol (methylprednisolone for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011856s144lbl.pdf',
  },
  {
    brandName: 'Solu-Medrol 125 mg',
    brandNameAr: 'سولو-ميدرول 125 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Parenteral Glucocorticoids',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '125 mg / 2 mL',
    route: 'Intravenous / Intramuscular',
    packSize: '1 Act-O-Vial (125 mg / 2 mL)',
    indications:
      'Acute severe asthma/COPD exacerbations, severe hypersensitivity reactions, acute autoimmune or inflammatory flares, and hospital emergencies requiring rapid parenteral glucocorticoid effect.',
    adultDosage:
      '40 mg to 125 mg administered intravenously over several minutes or intramuscularly every 6 to 24 hours according to clinical severity.',
    contraindications:
      'Systemic fungal infections; hypersensitivity to methylprednisolone; intrathecal or epidural administration; live vaccines at immunosuppressive doses.',
    sideEffects:
      'Hyperglycemia, fluid and sodium retention, hypokalemia, hypertension, psychiatric symptoms, GI irritation/ulceration, and immunosuppression.',
    storageConditions: 'Store at 20°C to 25°C. Protect from light.',
    specialties: ['Emergency Medicine', 'Pulmonology', 'Internal Medicine', 'Neurology', 'Rheumatology'],
    sourceTitle: 'Solu-Medrol (methylprednisolone for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011856s144lbl.pdf',
  },
  {
    brandName: 'Solu-Medrol 500 mg',
    brandNameAr: 'سولو-ميدرول 500 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Parenteral Glucocorticoids',
    dosageForm: 'Powder and solvent for solution for injection/infusion',
    strength: '500 mg',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial powder (500 mg) + 1 vial solvent (7.8 mL)',
    indications:
      'High-dose intravenous pulse corticosteroid therapy for acute relapses of multiple sclerosis, lupus nephritis, severe vasculitis, acute allograft rejection, and life-threatening inflammatory or hematologic crises.',
    adultDosage:
      'High-dose pulse therapy: 500 mg to 1000 mg daily (or 30 mg/kg) administered by intravenous infusion over at least 30 minutes (doses >500 mg must never be given in less than 30 minutes due to risk of cardiac arrhythmias and circulatory collapse).',
    contraindications:
      'Systemic fungal infections; hypersensitivity to methylprednisolone; intrathecal or epidural administration.',
    sideEffects:
      'Cardiac arrhythmia/bradycardia (if infused too rapidly), hyperglycemia, hypertension, hypokalemia, fluid retention, flushing, metallic taste, psychosis/insomnia, peptic ulceration, and opportunistic infections.',
    storageConditions: 'Store at 20°C to 25°C. Protect from light.',
    specialties: ['Neurology', 'Nephrology', 'Rheumatology', 'Hematology', 'Internal Medicine'],
    sourceTitle: 'Solu-Medrol (methylprednisolone for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011856s144lbl.pdf',
  },
  {
    brandName: 'Solu-Medrol 1000 mg',
    brandNameAr: 'سولو-ميدرول 1000 ملغم',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Parenteral Glucocorticoids',
    dosageForm: 'Powder and solvent for solution for injection/infusion',
    strength: '1000 mg',
    route: 'Intravenous / Intramuscular',
    packSize: '1 vial powder (1000 mg) + 1 vial solvent (15.6 mL)',
    indications:
      'High-dose intravenous pulse therapy in acute multiple sclerosis relapses, severe lupus nephritis, ANCA-associated vasculitis, acute transplant rejection, and severe hematologic or rheumatologic emergencies.',
    adultDosage:
      '1000 mg once daily for 3 to 5 days administered by slow intravenous infusion over at least 30 to 60 minutes.',
    contraindications:
      'Systemic fungal infections; hypersensitivity to methylprednisolone; intrathecal or epidural administration.',
    sideEffects:
      'Arrhythmias/bradycardia if infused rapidly, severe hyperglycemia, hypertension, hypokalemia, insomnia/mood changes, GI bleeding, osteonecrosis, and serious infections.',
    storageConditions: 'Store at 20°C to 25°C. Protect from light.',
    specialties: ['Neurology', 'Nephrology', 'Rheumatology', 'Hematology', 'Internal Medicine'],
    sourceTitle: 'Solu-Medrol (methylprednisolone for injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011856s144lbl.pdf',
  },
  {
    brandName: 'Depo-Medrol 40 mg/mL',
    brandNameAr: 'ديبو-ميدرول 40 ملغم / مل',
    genericName: 'Methylprednisolone',
    drugClassNameEn: 'Depot Parenteral Glucocorticoids',
    dosageForm: 'Suspension for injection',
    strength: '40 mg / mL',
    route: 'Intramuscular / Intra-articular / Intralesional',
    packSize: '1 vial × 1 mL',
    indications:
      'Intramuscular depot corticosteroid therapy for allergic, dermatologic, rheumatic, and collagen diseases; intra-articular or soft-tissue injection as adjunctive short-term therapy in synovitis of osteoarthritis, rheumatoid arthritis, acute gouty arthritis, acute and subacute bursitis, epicondylitis, and acute nonspecific tenosynovitis; intralesional injection in keloids, alopecia areata, discoid lupus erythematosus, and psoriatic plaques.',
    adultDosage:
      'Intramuscular: 40 mg to 120 mg deep gluteal injection at intervals of 1 to 4 weeks. Intra-articular: 4 mg to 80 mg depending on joint size (large joints 20–80 mg, medium joints 10–40 mg, small joints 4–10 mg). Intralesional: 20 mg to 60 mg. Never administer intravenously, intrathecally, or epidurally.',
    contraindications:
      'Systemic fungal infections; hypersensitivity to methylprednisolone or any component; intravenous, intrathecal, or epidural administration; injection into unstable or infected joints.',
    sideEffects:
      'Injection site atrophy/depigmentation, post-injection flare, sterile abscess, Charcot-like arthropathy with repeated intra-articular injections, hyperglycemia, hypertension, fluid retention, and HPA axis suppression.',
    storageConditions: 'Store at controlled room temperature 20°C to 25°C. Do not freeze.',
    specialties: ['Orthopedics', 'Rheumatology', 'Dermatology'],
    sourceTitle: 'Depo-Medrol (methylprednisolone injectable suspension) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/011757s125lbl.pdf',
  },
  {
    brandName: 'Dostinex 0.5 mg',
    brandNameAr: 'دوستينكس 0.5 ملغم',
    genericName: 'Cabergoline',
    drugClassNameEn: 'Dopamine D2 Receptor Agonists (Prolactin Inhibitors)',
    dosageForm: 'Tablet',
    strength: '0.5 mg',
    route: 'Oral',
    packSize: '8 tablets (bottle)',
    indications:
      'Treatment of hyperprolactinemic disorders, either idiopathic or due to pituitary adenomas (micro- or macroprolactinomas); inhibition of physiological lactation soon after delivery and suppression of already established lactation.',
    adultDosage:
      'Hyperprolactinemic disorders: initiate at 0.25 mg twice weekly; may increase by 0.25 mg twice weekly at 4-week intervals according to serum prolactin levels up to 1 mg twice weekly (up to 4.5 mg/week in select patients). Inhibition of lactation: 1 mg (two 0.5 mg tablets) given as a single dose on the first day post-partum. Suppression of established lactation: 0.25 mg (half a 0.5 mg tablet) every 12 hours for 2 days (1 mg total dose). Take with meals.',
    contraindications:
      'Hypersensitivity to cabergoline, any ergot alkaloid, or any excipient; uncontrolled hypertension; history of pulmonary, pericardial, or retroperitoneal fibrotic disorders; cardiac valvulopathy as determined by pre-treatment echocardiography (for long-term treatment); pre-eclampsia, eclampsia, or post-partum hypertension.',
    sideEffects:
      'Cardiac valvulopathy and pericarditis/pericardial effusion (with long-term use), nausea, headache, dizziness/vertigo, abdominal pain, dyspepsia, gastritis, asthenia/fatigue, constipation, vomiting, chest pain, hot flushes, depression, and postural hypotension.',
    storageConditions: 'Store below 25°C in the original container with desiccant in the cap to protect from moisture.',
    specialties: ['Endocrinology', 'Obstetrics and Gynecology', 'Neurology'],
    sourceTitle: 'Dostinex (cabergoline tablets) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/020664s016lbl.pdf',
  },
  {
    brandName: 'Genotropin 5.3 mg',
    brandNameAr: 'جينوتروبين 5.3 ملغم',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '5.3 mg (16 IU) / mL',
    route: 'Subcutaneous',
    packSize: '1 GoQuick pre-filled pen (5.3 mg / 1 mL)',
    indications:
      'Growth disturbance in children due to insufficient secretion of growth hormone (GHD), Turner syndrome, chronic renal insufficiency, Prader-Willi syndrome, or short children born small for gestational age (SGA) who failed to show catch-up growth by age 4; replacement therapy in adults with pronounced growth hormone deficiency.',
    adultDosage:
      'Adult GHD replacement: initiate with low dose of 0.15 to 0.3 mg daily by subcutaneous injection, titrated monthly based on clinical response and serum IGF-1 concentrations (maintenance rarely exceeds 1.0 mg/day). Pediatric dosing is weight- or body-surface-area-based (e.g. 0.025–0.035 mg/kg/day in pediatric GHD). Rotate injection sites daily to prevent lipoatrophy.',
    contraindications:
      'Hypersensitivity to somatropin or any excipient; any evidence of activity of a tumor (intracranial tumors must be inactive and antitumor therapy completed prior to starting GH); children with closed epiphyses (for growth promotion); acute critical illness suffering complications following open heart surgery, abdominal surgery, multiple accidental trauma, or acute respiratory failure.',
    sideEffects:
      'In adults: peripheral edema, arthralgia, myalgia, paresthesia, carpal tunnel syndrome, stiffness in extremities, and insulin resistance/hyperglycemia. In children: transient local skin reactions, arthralgia, headache, and rare benign intracranial hypertension or slipped capital femoral epiphysis.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C) before and after reconstitution (use within 4 weeks after reconstitution). Do not freeze. Keep in outer carton to protect from light.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'Genotropin 5.3 mg and 12 mg GoQuick (somatropin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/32/smpc',
  },
  {
    brandName: 'Genotropin 12 mg',
    brandNameAr: 'جينوتروبين 12 ملغم',
    genericName: 'Somatropin',
    drugClassNameEn: 'Recombinant Human Growth Hormones',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '12 mg (36 IU) / mL',
    route: 'Subcutaneous',
    packSize: '1 GoQuick pre-filled pen (12 mg / 1 mL)',
    indications:
      'Growth disturbance due to growth hormone deficiency, Turner syndrome, chronic renal insufficiency, Prader-Willi syndrome, and small for gestational age (SGA) in pediatric patients; replacement therapy in adults with pronounced growth hormone deficiency.',
    adultDosage:
      'Individualized daily subcutaneous injection (0.15 to 0.3 mg/day initial dose in adults; weight-based 0.025 to 0.050 mg/kg/day in children depending on indication), rotating injection sites daily.',
    contraindications:
      'Hypersensitivity to somatropin; active malignancy/tumor activity; closed epiphyses when used for growth promotion; acute critical illness following major surgery, trauma, or acute respiratory failure.',
    sideEffects:
      'Peripheral edema, arthralgia, myalgia, paresthesia, carpal tunnel syndrome, injection site reactions, hyperglycemia, hypothyroidism, and rare intracranial hypertension.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Endocrinology', 'Pediatrics'],
    sourceTitle: 'Genotropin 5.3 mg and 12 mg GoQuick (somatropin) — UK EMC Official SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/32/smpc',
  },

  // =========================================================================
  // 5. ONCOLOGY & HEMATOLOGY (15 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Ibrance 75 mg',
    brandNameAr: 'إيبرانس 75 ملغم',
    genericName: 'Palbociclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '75 mg',
    route: 'Oral',
    packSize: '21 film-coated tablets (blister pack)',
    indications:
      'Treatment of hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor, or in combination with fulvestrant in women who have received prior endocrine therapy (and in pre- or perimenopausal women, combined with an LHRH agonist).',
    adultDosage:
      'Recommended starting dose is 125 mg once daily for 21 consecutive days followed by 7 days off treatment (28-day cycle). The 75 mg strength is used as the second dose-reduction step (125 mg → 100 mg → 75 mg once daily) for management of hematologic or non-hematologic toxicities, or in severe hepatic impairment (Child-Pugh C). May be taken with or without food.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; use of preparations containing St John’s Wort.',
    sideEffects:
      'Neutropenia, leukopenia, anemia, thrombocytopenia, infections, fatigue, nausea, stomatitis, alopecia, diarrhea, decreased appetite, vomiting, asthenia, peripheral neuropathy, epistaxis, rash, dry skin, and rare interstitial lung disease/pneumonitis.',
    storageConditions: 'Store in the original blister pack in order to protect from moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Ibrance (palbociclib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ibrance',
  },
  {
    brandName: 'Ibrance 100 mg',
    brandNameAr: 'إيبرانس 100 ملغم',
    genericName: 'Palbociclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '21 film-coated tablets (blister pack)',
    indications:
      'HR-positive, HER2-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor or fulvestrant.',
    adultDosage:
      'First dose-reduction strength: one 100 mg film-coated tablet once daily for 21 consecutive days followed by 7 days off treatment (28-day cycle) in combination with letrozole or fulvestrant.',
    contraindications:
      'Hypersensitivity to palbociclib or any excipient; concomitant use of St John’s Wort.',
    sideEffects:
      'Neutropenia, leukopenia, anemia, thrombocytopenia, infections, fatigue, stomatitis, nausea, diarrhea, alopecia, rash, and rare pneumonitis.',
    storageConditions: 'Store in the original blister pack in order to protect from moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Ibrance (palbociclib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ibrance',
  },
  {
    brandName: 'Ibrance 125 mg',
    brandNameAr: 'إيبرانس 125 ملغم',
    genericName: 'Palbociclib',
    drugClassNameEn: 'Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '125 mg',
    route: 'Oral',
    packSize: '21 film-coated tablets (blister pack)',
    indications:
      'Standard starting dose for HR-positive, HER2-negative locally advanced or metastatic breast cancer in combination with an aromatase inhibitor or fulvestrant.',
    adultDosage:
      'One 125 mg film-coated tablet once daily at approximately the same time each day for 21 consecutive days followed by 7 days off treatment (complete cycle of 28 days), swallowed whole with or without food.',
    contraindications:
      'Hypersensitivity to palbociclib or any excipient; concomitant use of St John’s Wort.',
    sideEffects:
      'Neutropenia, leukopenia, anemia, thrombocytopenia, infections, fatigue, nausea, stomatitis, alopecia, diarrhea, vomiting, and rare ILD/pneumonitis.',
    storageConditions: 'Store in the original blister pack in order to protect from moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Ibrance (palbociclib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ibrance',
  },
  {
    brandName: 'Sutent 12.5 mg',
    brandNameAr: 'سوتنت 12.5 ملغم',
    genericName: 'Sunitinib',
    drugClassNameEn: 'Multi-Targeted Receptor Tyrosine Kinase Inhibitors (VEGFR / PDGFR / KIT)',
    dosageForm: 'Hard capsule',
    strength: '12.5 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack or bottle)',
    indications:
      'Unresectable and/or metastatic malignant gastrointestinal stromal tumor (GIST) in adults after failure of imatinib treatment due to resistance or intolerance; advanced/metastatic renal cell carcinoma (MRCC) in adults; unresectable or metastatic, well-differentiated pancreatic neuroendocrine tumors (pNET) with disease progression in adults.',
    adultDosage:
      'GIST and MRCC: 50 mg orally once daily for 4 consecutive weeks followed by a 2-week rest period (Schedule 4/2). pNET: 37.5 mg orally once daily without a scheduled rest period. Dose adjustments are made in 12.5 mg steps based on individual safety and tolerability.',
    contraindications:
      'Hypersensitivity to the active substance or to any of the excipients.',
    sideEffects:
      'Fatigue, asthenia, diarrhea, nausea, stomatitis, dyspepsia, vomiting, abdominal pain, hypertension, palmar-plantar erythrodysesthesia syndrome (hand-foot syndrome), skin discoloration, hair color changes, hypothyroidism, neutropenia, thrombocytopenia, anemia, epistaxis, and decreased left ventricular ejection fraction.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'Sutent (sunitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sutent',
  },
  {
    brandName: 'Sutent 25 mg',
    brandNameAr: 'سوتنت 25 ملغم',
    genericName: 'Sunitinib',
    drugClassNameEn: 'Multi-Targeted Receptor Tyrosine Kinase Inhibitors (VEGFR / PDGFR / KIT)',
    dosageForm: 'Hard capsule',
    strength: '25 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack or bottle)',
    indications:
      'Unresectable/metastatic gastrointestinal stromal tumor (GIST) after imatinib failure, advanced/metastatic renal cell carcinoma (MRCC), and progressive well-differentiated pancreatic neuroendocrine tumors (pNET).',
    adultDosage:
      'GIST/MRCC: 50 mg once daily (4 weeks on, 2 weeks off), adjusted in 12.5 mg steps (e.g. to 37.5 mg or 25 mg daily). pNET: 37.5 mg once daily continuously.',
    contraindications:
      'Hypersensitivity to sunitinib or any excipient.',
    sideEffects:
      'Fatigue, diarrhea, mucositis/stomatitis, nausea, hypertension, hand-foot syndrome, yellowing of skin/hair depigmentation, hypothyroidism, thrombocytopenia, neutropenia, and hemorrhage.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'Sutent (sunitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sutent',
  },
  {
    brandName: 'Sutent 50 mg',
    brandNameAr: 'سوتنت 50 ملغم',
    genericName: 'Sunitinib',
    drugClassNameEn: 'Multi-Targeted Receptor Tyrosine Kinase Inhibitors (VEGFR / PDGFR / KIT)',
    dosageForm: 'Hard capsule',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 hard capsules (blister pack or bottle)',
    indications:
      'Standard starting dose for unresectable/metastatic gastrointestinal stromal tumor (GIST) after imatinib failure and advanced/metastatic renal cell carcinoma (MRCC) in adults.',
    adultDosage:
      'One 50 mg hard capsule orally once daily for 4 consecutive weeks, followed by a 2-week rest period (complete cycle of 6 weeks), with or without food.',
    contraindications:
      'Hypersensitivity to sunitinib or any excipient.',
    sideEffects:
      'Fatigue, diarrhea, stomatitis, nausea, vomiting, hypertension, palmar-plantar erythrodysesthesia, hypothyroidism, neutropenia, thrombocytopenia, anemia, and cardiac dysfunction.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'Sutent (sunitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sutent',
  },
  {
    brandName: 'Inlyta 5 mg',
    brandNameAr: 'إنليتا 5 ملغم',
    genericName: 'Axitinib',
    drugClassNameEn: 'Selective VEGFR-1, -2, and -3 Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Treatment of adult patients with advanced renal cell carcinoma (RCC) after failure of prior treatment with sunitinib or a cytokine (and in first-line combination regimens per approved oncology protocols).',
    adultDosage:
      'Recommended starting dose is 5 mg twice daily taken approximately 12 hours apart with or without food; may be titrated up to 7 mg twice daily and 10 mg twice daily in normotensive patients who tolerate the dose without >Grade 2 adverse reactions, or reduced to 3 mg or 2 mg twice daily if toxicity occurs.',
    contraindications:
      'Hypersensitivity to axitinib or to any of the excipients.',
    sideEffects:
      'Diarrhea, hypertension, fatigue, decreased appetite, nausea, dysphonia, palmar-plantar erythrodysesthesia (hand-foot) syndrome, weight decreased, vomiting, asthenia, constipation, hypothyroidism, stomatitis, proteinuria, and hemorrhage.',
    storageConditions: 'This medicinal product does not require any special temperature storage conditions. Store in the original package in order to protect from moisture.',
    specialties: ['Oncology'],
    sourceTitle: 'Inlyta (axitinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/inlyta',
  },
  {
    brandName: 'Xalkori 250 mg',
    brandNameAr: 'زالكوري 250 ملغم',
    genericName: 'Crizotinib',
    drugClassNameEn: 'ALK and ROS1 Receptor Tyrosine Kinase Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '250 mg',
    route: 'Oral',
    packSize: '60 hard capsules (blister pack)',
    indications:
      'First-line treatment of adults with anaplastic lymphoma kinase (ALK)-positive advanced non-small cell lung cancer (NSCLC); treatment of adults with previously treated ALK-positive advanced NSCLC; treatment of adults with ROS1-positive advanced NSCLC; treatment of pediatric patients (≥6 to <18 years) with relapsed or refractory systemic ALK-positive anaplastic large cell lymphoma (ALCL) or unresectable, recurrent, or refractory ALK-positive inflammatory myofibroblastic tumor (IMT).',
    adultDosage:
      '250 mg twice daily (500 mg daily) taken continuously with or without food; if dose reduction is required, reduce to 200 mg twice daily and then to 250 mg once daily.',
    contraindications:
      'Hypersensitivity to crizotinib or to any of the excipients.',
    sideEffects:
      'Vision disorder (diplopia, photopsia, blurred vision), nausea, diarrhea, vomiting, edema, constipation, elevated transaminases, fatigue, decreased appetite, dizziness, dysgeusia, neuropathy, bradycardia, neutropenia, QTc prolongation, and rare severe hepatotoxicity or pneumonitis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'Xalkori (crizotinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xalkori',
  },
  {
    brandName: 'Lorviqua 100 mg',
    brandNameAr: 'لورفيكوا 100 ملغم',
    genericName: 'Lorlatinib',
    drugClassNameEn: 'Third-Generation ALK and ROS1 Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (blister pack)',
    indications:
      'Monotherapy for the treatment of adult patients with anaplastic lymphoma kinase (ALK)-positive advanced non-small cell lung cancer (NSCLC) previously not treated with an ALK inhibitor, or whose disease has progressed after alectinib or ceritinib as the first ALK TKI therapy, or crizotinib and at least one other ALK TKI.',
    adultDosage:
      'One 100 mg film-coated tablet taken orally once daily at approximately the same time each day with or without food (dose reductions use 25 mg tablets: 75 mg once daily, then 50 mg once daily).',
    contraindications:
      'Hypersensitivity to lorlatinib or any excipient; concomitant use of strong CYP3A4/5 inducers (e.g. rifampicin, carbamazepine, enzalutamide, mitotane, phenytoin, St John’s Wort) due to risk of severe hepatotoxicity.',
    sideEffects:
      'Hypercholesterolemia, hypertriglyceridemia, edema, peripheral neuropathy, weight increased, cognitive effects, fatigue, diarrhea, arthralgia, anemia, mood effects, hypertension, and PR interval prolongation/AV block.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'Lorviqua (lorlatinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lorviqua',
  },
  {
    brandName: 'Bosulif 100 mg',
    brandNameAr: 'بوسوليف 100 ملغم',
    genericName: 'Bosutinib',
    drugClassNameEn: 'Dual Src / Abl Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '112 film-coated tablets (blister pack)',
    indications:
      'Treatment of adult patients with newly-diagnosed chronic phase (CP) Philadelphia chromosome-positive chronic myelogenous leukemia (Ph+ CML), or CP, accelerated phase (AP), and blast phase (BP) Ph+ CML previously treated with one or more tyrosine kinase inhibitors and for whom imatinib, nilotinib, and dasatinib are not considered appropriate treatment options.',
    adultDosage:
      'Newly-diagnosed CP Ph+ CML: 400 mg once daily with food. Previously-treated CP, AP, or BP Ph+ CML: 500 mg once daily with food. The 100 mg tablet is used for dose titration and dose adjustments.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; hepatic impairment.',
    sideEffects:
      'Diarrhea, nausea, thrombocytopenia, abdominal pain, vomiting, rash, anemia, pyrexia, fatigue, increased alanine aminotransferase and aspartate aminotransferase, headache, cough, neutropenia, and pleural/pericardial effusion.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Hematology'],
    sourceTitle: 'Bosulif (bosutinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/bosulif',
  },
  {
    brandName: 'Bosulif 500 mg',
    brandNameAr: 'بوسوليف 500 ملغم',
    genericName: 'Bosutinib',
    drugClassNameEn: 'Dual Src / Abl Tyrosine Kinase Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '500 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Treatment of adult patients with chronic phase, accelerated phase, and blast phase Philadelphia chromosome-positive chronic myelogenous leukemia (Ph+ CML) previously treated with one or more tyrosine kinase inhibitors.',
    adultDosage:
      'One 500 mg film-coated tablet taken orally once daily with food.',
    contraindications:
      'Hypersensitivity to bosutinib or any excipient; hepatic impairment.',
    sideEffects:
      'Diarrhea, nausea, vomiting, abdominal pain, thrombocytopenia, anemia, neutropenia, elevated ALT/AST, rash, fatigue, and fluid retention.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Hematology'],
    sourceTitle: 'Bosulif (bosutinib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/bosulif',
  },
  {
    brandName: 'Talzenna 1 mg',
    brandNameAr: 'تالزينا 1 ملغم',
    genericName: 'Talazoparib',
    drugClassNameEn: 'Poly (ADP-Ribose) Polymerase (PARP1 / PARP2) Inhibitors',
    dosageForm: 'Hard capsule',
    strength: '1 mg',
    route: 'Oral',
    packSize: '30 hard capsules (blister pack)',
    indications:
      'Monotherapy for adult patients with germline BRCA1/2-mutations, who have HER2-negative locally advanced or metastatic breast cancer previously treated with an anthracycline and/or a taxane and endocrine therapy (if HR-positive); and in combination with enzalutamide for adult patients with metastatic castration-resistant prostate cancer (mCRPC) in whom chemotherapy is not clinically indicated.',
    adultDosage:
      'HER2-negative BRCA-mutated breast cancer monotherapy: 1 mg taken orally once daily with or without food (for mCRPC in combination with enzalutamide, the recommended dose is 0.5 mg once daily). Reduce dose in moderate or severe renal impairment.',
    contraindications:
      'Hypersensitivity to the active substance or to any excipient; breastfeeding.',
    sideEffects:
      'Anemia, fatigue, nausea, neutropenia, thrombocytopenia, decreased appetite, headache, vomiting, alopecia, diarrhea, dizziness, leukopenia, and rare myelodysplastic syndrome/acute myeloid leukemia.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology'],
    sourceTitle: 'Talzenna (talazoparib) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/talzenna',
  },
  {
    brandName: 'Aromasin 25 mg',
    brandNameAr: 'أروماسين 25 ملغم',
    genericName: 'Exemestane',
    drugClassNameEn: 'Steroidal Irreversible Aromatase Inactivators',
    dosageForm: 'Coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '30 coated tablets (blister pack)',
    indications:
      'Adjuvant treatment of postmenopausal women with estrogen-receptor positive invasive early breast cancer following 2–3 years of initial adjuvant tamoxifen therapy to complete a total of 5 consecutive years of adjuvant hormonal therapy; treatment of advanced breast cancer in women with natural or induced postmenopausal status whose disease has progressed following anti-estrogen therapy.',
    adultDosage:
      'One 25 mg tablet once daily, preferably after a meal.',
    contraindications:
      'Hypersensitivity to exemestane or to any excipient; pre-menopausal women; pregnancy and lactation.',
    sideEffects:
      'Hot flushes, arthralgia, musculoskeletal pain, fatigue, insomnia, headache, depression, dizziness, carpal tunnel syndrome, nausea, abdominal pain, increased sweating, alopecia, bone mineral density reduction/osteoporosis, and elevated hepatic enzymes.',
    storageConditions: 'Store at 25°C (15°C to 30°C).',
    specialties: ['Oncology'],
    sourceTitle: 'Aromasin (exemestane tablets) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/020753s020lbl.pdf',
  },
  {
    brandName: 'Camptosar 40 mg/2 mL',
    brandNameAr: 'كامبتوسار 40 ملغم / 2 مل',
    genericName: 'Irinotecan',
    drugClassNameEn: 'Topoisomerase I Inhibitor Antineoplastic Agents',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '20 mg / mL (40 mg / 2 mL)',
    route: 'Intravenous',
    packSize: '1 vial × 2 mL',
    indications:
      'First-line therapy in combination with 5-fluorouracil and leucovorin (FOLFIRI) for patients with metastatic carcinoma of the colon or rectum; monotherapy for patients with metastatic carcinoma of the colon or rectum whose disease has recurred or progressed following initial fluorouracil-based therapy.',
    adultDosage:
      'Combination regimen (FOLFIRI): 180 mg/m² administered as an intravenous infusion over 90 minutes on Day 1 every 2 weeks (followed by leucovorin and 5-FU). Single-agent regimen: 125 mg/m² IV over 90 minutes weekly for 4 weeks in a 6-week cycle, or 350 mg/m² IV over 90 minutes once every 3 weeks. Consider reduced starting dose in patients homozygous for UGT1A1*28.',
    contraindications:
      'Known hypersensitivity to irinotecan or any excipient.',
    sideEffects:
      'Early and late severe diarrhea, cholinergic syndrome (rhinitis, increased salivation, miosis, lacrimation, diaphoresis, flushing, abdominal cramping, bradycardia), severe neutropenia/febrile neutropenia, anemia, thrombocytopenia, nausea, vomiting, alopecia, asthenia, mucositis, and elevated liver enzymes/bilirubin.',
    storageConditions: 'Store at controlled room temperature 15°C to 30°C. Protect from light. Do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'Camptosar (irinotecan injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2014/020571s048lbl.pdf',
  },
  {
    brandName: 'Camptosar 100 mg/5 mL',
    brandNameAr: 'كامبتوسار 100 ملغم / 5 مل',
    genericName: 'Irinotecan',
    drugClassNameEn: 'Topoisomerase I Inhibitor Antineoplastic Agents',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '20 mg / mL (100 mg / 5 mL)',
    route: 'Intravenous',
    packSize: '1 vial × 5 mL',
    indications:
      'Treatment of metastatic colorectal carcinoma as first-line therapy in combination with 5-fluorouracil and leucovorin, or as single-agent therapy after progression on fluorouracil-based chemotherapy.',
    adultDosage:
      '180 mg/m² IV over 90 minutes every 2 weeks (in combination with 5-FU/leucovorin) or 350 mg/m² IV over 90 minutes every 3 weeks as monotherapy, diluted in 5% dextrose or 0.9% sodium chloride prior to infusion.',
    contraindications:
      'Hypersensitivity to irinotecan or any excipient.',
    sideEffects:
      'Early cholinergic diarrhea and late-onset dose-limiting diarrhea, neutropenia, leukopenia, anemia, thrombocytopenia, nausea, vomiting, alopecia, asthenia, and stomatitis.',
    storageConditions: 'Store at 15°C to 30°C. Protect from light. Do not freeze.',
    specialties: ['Oncology'],
    sourceTitle: 'Camptosar (irinotecan injection) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2014/020571s048lbl.pdf',
  },
];

export const PFIZER_PRODUCTS: AiProductDraft[] = PFIZER_COMPACT_PRODUCTS.map(toPfizerProductDraft);
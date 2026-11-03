import type { AiDraftSource, AiProductDraft } from './catalog';

const SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactDrug {
  brandName: string;
  genericName: string;
  activeIngredients: string[];
  drugClass: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
  notes: string;
  category?: AiProductDraft['category'];
}

const ASTELLAS_COMPACT_DRUGS: CompactDrug[] = [
  // 1. Omnic Ocas (Tamsulosin) — Oral Controlled Absorption System prolonged-release film-coated tablet
  {
    brandName: 'Omnic Ocas 0.4 mg',
    genericName: 'Tamsulosin',
    activeIngredients: ['Tamsulosin'],
    drugClass: 'Alpha-1 Adrenoceptor Antagonists (Benign Prostatic Hyperplasia)',
    strength: '0.4 mg',
    dosageForm: 'Prolonged-release film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 30 prolonged-release film-coated tablets',
    approvedIndications:
      'Treatment of lower urinary tract symptoms (LUTS) associated with benign prostatic hyperplasia (BPH) in men.',
    usualAdultDose:
      'One 0.4 mg prolonged-release tablet once daily, taken independently of food; swallow whole without crunching or chewing.',
    contraindications:
      'Hypersensitivity to tamsulosin (including drug-induced angioedema) or to any excipient; history of orthostatic hypotension; severe hepatic insufficiency.',
    commonAdverseEffects:
      'Dizziness, abnormal ejaculation (retrograde ejaculation, ejaculation failure), headache, palpitations, orthostatic hypotension, rhinitis, constipation, diarrhoea, nausea, vomiting, rash, pruritus, asthenia, intraoperative floppy iris syndrome (IFIS) during cataract/glaucoma surgery.',
    storageConditions:
      'Store in the original package. No special temperature storage conditions are required.',
    specialties: ['Urology', 'Internal Medicine'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Omnic OCAS / Contiflo XL 400 micrograms Prolonged-Release Film-Coated Tablets SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/191/smpc',
    notes:
      'Originator Astellas Oral Controlled Absorption System (OCAS) prolonged-release gel matrix tablet of tamsulosin (Middle East brand name: Omnic Ocas). Advise ophthalmologists of current or previous tamsulosin therapy prior to cataract or glaucoma surgery (IFIS risk).',
  },

  // 2. Omnic (Tamsulosin) — Modified-release hard capsule
  {
    brandName: 'Omnic 0.4 mg',
    genericName: 'Tamsulosin',
    activeIngredients: ['Tamsulosin'],
    drugClass: 'Alpha-1 Adrenoceptor Antagonists (Benign Prostatic Hyperplasia)',
    strength: '0.4 mg',
    dosageForm: 'Modified-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 30 modified-release hard capsules',
    approvedIndications:
      'Treatment of functional lower urinary tract symptoms (LUTS) of benign prostatic hyperplasia (BPH).',
    usualAdultDose:
      'One 0.4 mg modified-release capsule once daily after breakfast or the first meal of the day; swallow whole with a glass of water while standing or sitting (do not crunch or chew).',
    contraindications:
      'Hypersensitivity to tamsulosin (including drug-induced angioedema) or excipients; history of orthostatic hypotension; severe hepatic insufficiency.',
    commonAdverseEffects:
      'Dizziness, ejaculation disorders (retrograde ejaculation, reduced or absent ejaculation), headache, palpitations, postural hypotension, rhinitis, gastrointestinal disturbances, rash, urticaria, intraoperative floppy iris syndrome (IFIS).',
    storageConditions:
      'Store in the original package in order to protect from moisture.',
    specialties: ['Urology', 'Internal Medicine'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Flomaxtra / Omnic 400 micrograms Modified-Release Capsules SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/734/smpc',
    notes:
      'Originator Astellas modified-release capsule formulation of tamsulosin (Middle East brand name: Omnic).',
  },

  // 3. Betmiga (Mirabegron)
  {
    brandName: 'Betmiga 25 mg',
    genericName: 'Mirabegron',
    activeIngredients: ['Mirabegron'],
    drugClass: 'Selective Beta-3 Adrenoceptor Agonists (Overactive Bladder)',
    strength: '25 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Blister pack of 30 prolonged-release tablets',
    approvedIndications:
      'Symptomatic treatment of urgency, increased micturition frequency and/or urgency incontinence as may occur in adult patients with overactive bladder (OAB) syndrome.',
    usualAdultDose:
      'Recommended adult dose is 50 mg once daily with or without food. The 25 mg once daily dose is recommended in patients with severe renal impairment (GFR 15 to 29 mL/min/1.73 m²), moderate hepatic impairment (Child-Pugh B), or mild-to-moderate renal/hepatic impairment receiving concomitant strong CYP3A inhibitors.',
    contraindications:
      'Hypersensitivity to mirabegron or excipients; severe uncontrolled hypertension defined as systolic blood pressure ≥180 mmHg and/or diastolic blood pressure ≥110 mmHg.',
    commonAdverseEffects:
      'Tachycardia, urinary tract infection, headache, dizziness, nausea, constipation, diarrhoea, dyspepsia, gastritis, palpitations, atrial fibrillation, blood pressure elevation.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Betmiga (mirabegron)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/betmiga',
    notes:
      'Originator Astellas selective beta-3 adrenoceptor agonist prolonged-release 25 mg tablet (Middle East brand name: Betmiga). Swallow whole with liquid; do not chew, divide, or crush.',
  },
  {
    brandName: 'Betmiga 50 mg',
    genericName: 'Mirabegron',
    activeIngredients: ['Mirabegron'],
    drugClass: 'Selective Beta-3 Adrenoceptor Agonists (Overactive Bladder)',
    strength: '50 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Blister pack of 30 prolonged-release tablets',
    approvedIndications:
      'Symptomatic treatment of urgency, increased micturition frequency and/or urgency incontinence as may occur in adult patients with overactive bladder (OAB) syndrome.',
    usualAdultDose:
      'Recommended adult dose (including elderly patients): 50 mg once daily with or without food, swallowed whole with liquid.',
    contraindications:
      'Hypersensitivity to mirabegron or excipients; severe uncontrolled hypertension (systolic blood pressure ≥180 mmHg and/or diastolic blood pressure ≥110 mmHg).',
    commonAdverseEffects:
      'Tachycardia, urinary tract infection, headache, dizziness, nausea, constipation, diarrhoea, dyspepsia, palpitations, increased blood pressure.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Obstetrics & Gynecology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Betmiga (mirabegron)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/betmiga',
    notes:
      'Originator Astellas selective beta-3 adrenoceptor agonist standard 50 mg prolonged-release tablet. Measure blood pressure before starting treatment and monitor periodically during therapy, especially in hypertensive patients.',
  },

  // 4. Vesicare (Solifenacin)
  {
    brandName: 'Vesicare 5 mg',
    genericName: 'Solifenacin',
    activeIngredients: ['Solifenacin'],
    drugClass: 'Urinary Antispasmodics (Muscarinic M3 Receptor Antagonists)',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 30 film-coated tablets',
    approvedIndications:
      'Symptomatic treatment of urge incontinence and/or increased urinary frequency and urgency as may occur in patients with overactive bladder syndrome.',
    usualAdultDose:
      'Recommended starting and maintenance dose is 5 mg once daily with or without food, swallowed whole with liquid. May be increased to 10 mg once daily if needed. Maximum 5 mg once daily in severe renal impairment, moderate hepatic impairment, or concomitant potent CYP3A4 inhibitor use.',
    contraindications:
      'Urinary retention; severe gastrointestinal condition (including toxic megacolon); myasthenia gravis; narrow-angle glaucoma; hypersensitivity to solifenacin or excipients; patients undergoing haemodialysis; severe hepatic impairment; severe renal or moderate hepatic impairment on potent CYP3A4 inhibitors (e.g., ketoconazole).',
    commonAdverseEffects:
      'Dry mouth (very common), constipation, nausea, dyspepsia, abdominal pain, blurred vision, dry eyes, fatigue, somnolence, urinary tract infection, peripheral oedema.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Obstetrics & Gynecology'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Vesicare 5 mg and 10 mg Film-Coated Tablets SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1602/smpc',
    notes:
      'Originator Astellas bladder-selective muscarinic M3 receptor antagonist 5 mg film-coated tablet.',
  },
  {
    brandName: 'Vesicare 10 mg',
    genericName: 'Solifenacin',
    activeIngredients: ['Solifenacin'],
    drugClass: 'Urinary Antispasmodics (Muscarinic M3 Receptor Antagonists)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 30 film-coated tablets',
    approvedIndications:
      'Symptomatic treatment of urge incontinence and/or increased urinary frequency and urgency as may occur in patients with overactive bladder syndrome.',
    usualAdultDose:
      '10 mg once daily with or without food in patients requiring increased efficacy beyond the 5 mg once-daily starting dose; swallow whole with liquid.',
    contraindications:
      'Urinary retention; severe gastrointestinal condition (including toxic megacolon); myasthenia gravis; narrow-angle glaucoma; hypersensitivity to solifenacin or excipients; haemodialysis; severe hepatic impairment; severe renal impairment (CrCl ≤30 mL/min); moderate hepatic impairment; concomitant potent CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Dry mouth (very common), constipation, nausea, dyspepsia, abdominal pain, gastro-oesophageal reflux, blurred vision, dry eyes, urinary tract infection, fatigue.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology', 'Obstetrics & Gynecology'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Vesicare 5 mg and 10 mg Film-Coated Tablets SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1602/smpc',
    notes:
      'Originator Astellas bladder-selective muscarinic M3 receptor antagonist 10 mg film-coated tablet.',
  },

  // 5. Vesomni (Solifenacin + Tamsulosin)
  {
    brandName: 'Vesomni 6 mg / 0.4 mg',
    genericName: 'Solifenacin + Tamsulosin',
    activeIngredients: ['Solifenacin', 'Tamsulosin'],
    drugClass: 'Fixed-Dose Antimuscarinic and Alpha-1 Blocker Combinations (BPH with Storage LUTS)',
    strength: '6 mg / 0.4 mg',
    dosageForm: 'Modified-release tablet',
    route: 'Oral',
    packSize: 'Aluminium blister pack of 30 modified-release tablets',
    approvedIndications:
      'Treatment of moderate to severe storage symptoms (urgency, increased micturition frequency) and voiding symptoms associated with benign prostatic hyperplasia (BPH) in men who are not adequately responding to treatment with monotherapy.',
    usualAdultDose:
      'Adult males (including elderly): One Vesomni 6 mg / 0.4 mg tablet once daily taken orally with or without food. Swallow whole; do not bite, chew, or crush.',
    contraindications:
      'Hypersensitivity to solifenacin, tamsulosin, or excipients; haemodialysis; severe hepatic impairment; severe renal or moderate hepatic impairment also treated with a potent CYP3A4 inhibitor; severe gastrointestinal conditions (including toxic megacolon), myasthenia gravis, or narrow-angle glaucoma; history of orthostatic hypotension.',
    commonAdverseEffects:
      'Dry mouth, constipation, dyspepsia, dizziness, blurred vision, fatigue, ejaculation disorders (including retrograde ejaculation and ejaculation failure), urinary retention, pruritus, intraoperative floppy iris syndrome (IFIS).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Urology'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Vesomni 6 mg / 0.4 mg Modified-Release Tablets SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/5256/smpc',
    notes:
      'Originator Astellas two-layer modified-release tablet combining solifenacin 6 mg and tamsulosin 0.4 mg OCAS. Maximum daily dose is one tablet (6 mg / 0.4 mg).',
  },

  // 6. Prograf (Tacrolimus — immediate-release hard capsules & concentrate for IV infusion)
  {
    brandName: 'Prograf 0.5 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Transplant Immunosuppressants)',
    strength: '0.5 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 hard capsules in sealed aluminium wrapper with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in liver, kidney or heart allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products.',
    usualAdultDose:
      'Administered twice daily (morning and evening) on an empty stomach (at least 1 hour before or 2 to 3 hours after meals), guided by whole blood trough concentration monitoring: initial oral prophylaxis 0.10–0.20 mg/kg/day (liver), 0.20–0.30 mg/kg/day (kidney), or 0.075 mg/kg/day (heart) divided into two doses.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia/new-onset diabetes mellitus, renal impairment/increased blood creatinine, hyperkalaemia, hypertension, diarrhoea, nausea, hepatic enzyme abnormalities, opportunistic infections.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture. Use within 1 year of opening the aluminium wrapper.',
    specialties: ['Nephrology', 'Gastroenterology', 'Cardiology', 'General Surgery'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Prograf 0.5 mg, 1 mg and 5 mg Hard Capsules SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1592/smpc',
    notes:
      'Originator Astellas twice-daily immediate-release tacrolimus 0.5 mg hard capsule. Narrow therapeutic index medicine: inadvertent switching between immediate-release (Prograf) and prolonged-release (Advagraf) formulations without clinical supervision and therapeutic drug monitoring can cause graft rejection or toxicity.',
  },
  {
    brandName: 'Prograf 1 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Transplant Immunosuppressants)',
    strength: '1 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 hard capsules in sealed aluminium wrapper with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in liver, kidney or heart allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products.',
    usualAdultDose:
      'Administered twice daily (every 12 hours) on an empty stomach, titrated according to whole blood tacrolimus trough levels and clinical assessment.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia, diabetes mellitus, nephrotoxicity, hyperkalaemia, hypomagnesaemia, hypertension, diarrhoea, nausea, infections.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture. Use within 1 year of opening the aluminium wrapper.',
    specialties: ['Nephrology', 'Gastroenterology', 'Cardiology', 'General Surgery'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Prograf 0.5 mg, 1 mg and 5 mg Hard Capsules SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1592/smpc',
    notes:
      'Originator Astellas twice-daily immediate-release tacrolimus 1 mg hard capsule.',
  },
  {
    brandName: 'Prograf 5 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Transplant Immunosuppressants)',
    strength: '5 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 hard capsules in sealed aluminium wrapper with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in liver, kidney or heart allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products.',
    usualAdultDose:
      'Administered twice daily (every 12 hours) on an empty stomach, adjusted individually based on whole blood tacrolimus trough concentrations.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia, diabetes mellitus, renal dysfunction, hyperkalaemia, hypertension, diarrhoea, nausea, opportunistic infections.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture. Use within 1 year of opening the aluminium wrapper.',
    specialties: ['Nephrology', 'Gastroenterology', 'Cardiology', 'General Surgery'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Prograf 0.5 mg, 1 mg and 5 mg Hard Capsules SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1592/smpc',
    notes:
      'Originator Astellas twice-daily immediate-release tacrolimus 5 mg hard capsule.',
  },
  {
    brandName: 'Prograf 5 mg/mL',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Transplant Immunosuppressants)',
    strength: '5 mg/mL',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 10 transparent glass ampoules of 1 mL concentrate (5 mg/mL)',
    approvedIndications:
      'Prophylaxis of transplant rejection in liver, kidney or heart allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products.',
    usualAdultDose:
      'Must be diluted in 5% dextrose or 0.9% sodium chloride in polyethylene/polypropylene or glass containers (not PVC) and administered as a continuous 24-hour intravenous infusion: 0.01–0.05 mg/kg/day (liver), 0.05–0.10 mg/kg/day (kidney), or 0.01–0.02 mg/kg/day (heart). Convert to oral therapy as soon as clinically feasible.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient (notably polyoxyethylene hydrogenated castor oil / Cremophor RH 60, which carries anaphylactoid reaction risk). Never administer as an undiluted bolus.',
    commonAdverseEffects:
      'Nephrotoxicity, neurotoxicity (tremor, headache, Posterior Reversible Encephalopathy Syndrome), hyperglycaemia, hyperkalaemia, hypertension, anaphylactoid/hypersensitivity reactions (due to castor oil derivative), infections, arrhythmias.',
    storageConditions:
      'Store ampoules in the original outer carton in order to protect from light. Do not store above 25°C.',
    specialties: ['Nephrology', 'Gastroenterology', 'Cardiology', 'Critical Care Medicine', 'General Surgery'],
    sourceTitle:
      'UK Electronic Medicines Compendium (EMC) — Prograf 5 mg/ml Concentrate for Solution for Infusion SmPC (Astellas)',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1593/smpc',
    notes:
      'Originator Astellas parenteral concentrate for continuous 24-hour IV infusion of tacrolimus. Incompatible with PVC tubing/bags.',
  },

  // 7. Advagraf (Tacrolimus — prolonged-release once-daily hard capsules)
  {
    brandName: 'Advagraf 0.5 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Once-Daily Prolonged-Release Transplant Immunosuppressants)',
    strength: '0.5 mg',
    dosageForm: 'Prolonged-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 prolonged-release hard capsules in sealed aluminium pouch with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in adult kidney or liver allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products in adult patients.',
    usualAdultDose:
      'Administered once daily in the morning on an empty stomach (at least 1 hour before or 2 to 3 hours after breakfast): initial prophylaxis 0.20–0.30 mg/kg/day (kidney) or 0.10–0.20 mg/kg/day (liver). Stable Prograf patients may be converted to Advagraf on a 1:1 (mg:mg) total daily dose basis with trough level monitoring.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia/diabetes mellitus, renal impairment, hyperkalaemia, hypertension, diarrhoea, nausea, hepatic enzyme elevations, opportunistic infections.',
    storageConditions:
      'Store in the original package to protect from moisture. Use within 1 year of opening the aluminium pouch.',
    specialties: ['Nephrology', 'Gastroenterology', 'General Surgery'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advagraf (tacrolimus)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advagraf',
    notes:
      'Originator Astellas once-daily prolonged-release tacrolimus 0.5 mg hard capsule. Do not switch between Advagraf and Prograf without close transplant specialist supervision.',
  },
  {
    brandName: 'Advagraf 1 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Once-Daily Prolonged-Release Transplant Immunosuppressants)',
    strength: '1 mg',
    dosageForm: 'Prolonged-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 prolonged-release hard capsules in sealed aluminium pouch with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in adult kidney or liver allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products in adult patients.',
    usualAdultDose:
      'Taken once daily in the morning on an empty stomach, individualized according to whole blood trough levels and clinical assessment.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia, diabetes mellitus, nephrotoxicity, hyperkalaemia, hypertension, diarrhoea, nausea, infections.',
    storageConditions:
      'Store in the original package to protect from moisture. Use within 1 year of opening the aluminium pouch.',
    specialties: ['Nephrology', 'Gastroenterology', 'General Surgery'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advagraf (tacrolimus)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advagraf',
    notes:
      'Originator Astellas once-daily prolonged-release tacrolimus 1 mg hard capsule.',
  },
  {
    brandName: 'Advagraf 3 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Once-Daily Prolonged-Release Transplant Immunosuppressants)',
    strength: '3 mg',
    dosageForm: 'Prolonged-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 prolonged-release hard capsules in sealed aluminium pouch with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in adult kidney or liver allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products in adult patients.',
    usualAdultDose:
      'Taken once daily in the morning on an empty stomach, adjusted based on whole blood trough concentration monitoring.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia, diabetes mellitus, renal dysfunction, hyperkalaemia, hypertension, diarrhoea, nausea, infections.',
    storageConditions:
      'Store in the original package to protect from moisture. Use within 1 year of opening the aluminium pouch.',
    specialties: ['Nephrology', 'Gastroenterology', 'General Surgery'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advagraf (tacrolimus)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advagraf',
    notes:
      'Originator Astellas once-daily prolonged-release tacrolimus 3 mg hard capsule.',
  },
  {
    brandName: 'Advagraf 5 mg',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Calcineurin Inhibitors (Once-Daily Prolonged-Release Transplant Immunosuppressants)',
    strength: '5 mg',
    dosageForm: 'Prolonged-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 50 prolonged-release hard capsules in sealed aluminium pouch with desiccant',
    approvedIndications:
      'Prophylaxis of transplant rejection in adult kidney or liver allograft recipients; treatment of allograft rejection resistant to treatment with other immunosuppressive medicinal products in adult patients.',
    usualAdultDose:
      'Taken once daily in the morning on an empty stomach, titrated according to whole blood tacrolimus trough concentrations.',
    contraindications:
      'Hypersensitivity to tacrolimus, other macrolides, or any excipient.',
    commonAdverseEffects:
      'Tremor, headache, insomnia, hyperglycaemia, diabetes mellitus, nephrotoxicity, hyperkalaemia, hypertension, diarrhoea, nausea, opportunistic infections.',
    storageConditions:
      'Store in the original package to protect from moisture. Use within 1 year of opening the aluminium pouch.',
    specialties: ['Nephrology', 'Gastroenterology', 'General Surgery'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advagraf (tacrolimus)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advagraf',
    notes:
      'Originator Astellas once-daily prolonged-release tacrolimus 5 mg hard capsule.',
  },

  // 8. Xtandi (Enzalutamide)
  {
    brandName: 'Xtandi 40 mg',
    genericName: 'Enzalutamide',
    activeIngredients: ['Enzalutamide'],
    drugClass: 'Androgen Receptor Signalling Inhibitors (Prostate Cancer)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Wallet blister pack of 112 film-coated tablets (4 wallets of 28 tablets)',
    approvedIndications:
      'Treatment of adult men with: high-risk biochemical recurrent (BCR) non-metastatic hormone-sensitive prostate cancer (nmHSPC) (as monotherapy or with androgen deprivation therapy); metastatic hormone-sensitive prostate cancer (mHSPC) in combination with ADT; high-risk non-metastatic castration-resistant prostate cancer (nmCRPC); and metastatic castration-resistant prostate cancer (mCRPC) (asymptomatic/mildly symptomatic after ADT failure, or post-docetaxel).',
    usualAdultDose:
      '160 mg (four 40 mg film-coated tablets) as a single oral daily dose with or without food; swallow tablets whole with water. Medical castration with an LHRH analogue should be continued during treatment in patients not surgically castrated (unless prescribed as monotherapy in high-risk BCR nmHSPC).',
    contraindications:
      'Hypersensitivity to enzalutamide or any excipient; women who are or may become pregnant.',
    commonAdverseEffects:
      'Asthenia, fatigue, hot flush, hypertension, falls, fractures, headache, memory impairment, cognitive disorder, amnesia, gynaecomastia, anxiety, restless legs syndrome, ischaemic heart disease, seizures (rare).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Xtandi (enzalutamide)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xtandi',
    notes:
      'Originator Astellas oral androgen receptor signalling inhibitor 40 mg film-coated tablet. Strong CYP3A4 inducer — review all concomitant medications for potential loss of efficacy.',
  },
  {
    brandName: 'Xtandi 80 mg',
    genericName: 'Enzalutamide',
    activeIngredients: ['Enzalutamide'],
    drugClass: 'Androgen Receptor Signalling Inhibitors (Prostate Cancer)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Wallet blister pack of 56 film-coated tablets (4 wallets of 14 tablets)',
    approvedIndications:
      'Treatment of adult men with high-risk BCR non-metastatic HSPC, metastatic HSPC, high-risk non-metastatic CRPC, and metastatic CRPC (pre- or post-chemotherapy).',
    usualAdultDose:
      '160 mg (two 80 mg film-coated tablets) as a single oral daily dose with or without food; swallow whole with water.',
    contraindications:
      'Hypersensitivity to enzalutamide or any excipient; women who are or may become pregnant.',
    commonAdverseEffects:
      'Asthenia, fatigue, hot flush, hypertension, falls, non-pathological fractures, cognitive and memory impairment, headache, ischaemic heart disease, neutropenia, rash, seizures (rare).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Xtandi (enzalutamide)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xtandi',
    notes:
      'Originator Astellas 80 mg film-coated tablet presentation of enzalutamide (2 tablets once daily = 160 mg).',
  },

  // 9. Xospata (Gilteritinib)
  {
    brandName: 'Xospata 40 mg',
    genericName: 'Gilteritinib',
    activeIngredients: ['Gilteritinib'],
    drugClass: 'FLT3 Tyrosine Kinase Inhibitors (Acute Myeloid Leukaemia)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 84 film-coated tablets (4 blisters of 21 tablets)',
    approvedIndications:
      'Monotherapy for the treatment of adult patients who have relapsed or refractory acute myeloid leukaemia (AML) with a FLT3 mutation.',
    usualAdultDose:
      'Recommended starting dose is 120 mg (three 40 mg tablets) once daily with or without food; may be increased to 200 mg (five 40 mg tablets) once daily in the absence of response after 4 weeks if tolerated. Confirm FLT3 mutation status with a validated test prior to initiation.',
    contraindications:
      'Hypersensitivity to gilteritinib or to any excipient.',
    commonAdverseEffects:
      'Elevated blood creatine phosphokinase, elevated ALT/AST/alkaline phosphatase, diarrhoea, fatigue, nausea, constipation, cough, peripheral oedema, dyspnoea, dizziness, hypotension, pain in extremity, Differentiation Syndrome, QTc interval prolongation, Posterior Reversible Encephalopathy Syndrome (PRES).',
    storageConditions:
      'Store in the original package in order to protect from light. No special temperature storage conditions are required.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Xospata (gilteritinib)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xospata',
    notes:
      'Originator Astellas FLT3/AXL tyrosine kinase inhibitor 40 mg film-coated tablet. Monitor for Differentiation Syndrome (initiate corticosteroids promptly if suspected) and perform ECG monitoring for QTc prolongation.',
  },

  // 10. Padcev (Enfortumab vedotin)
  {
    brandName: 'Padcev 20 mg',
    genericName: 'Enfortumab vedotin',
    activeIngredients: ['Enfortumab vedotin'],
    drugClass: 'Nectin-4-Directed Antibody-Drug Conjugates (Urothelial Carcinoma)',
    strength: '20 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 20 mg powder',
    approvedIndications:
      'In combination with pembrolizumab for the first-line treatment of adult patients with unresectable or metastatic urothelial cancer who are eligible for platinum-containing chemotherapy; and as monotherapy for adult patients with locally advanced or metastatic urothelial cancer who have previously received a platinum-containing chemotherapy and a PD-1 or PD-L1 inhibitor.',
    usualAdultDose:
      'Administered as an intravenous infusion over 30 minutes (never as IV push/bolus): 1.25 mg/kg (up to a maximum of 125 mg for patients ≥100 kg) on Days 1 and 8 of a 21-day cycle when combined with pembrolizumab, or on Days 1, 8, and 15 of a 28-day cycle as monotherapy.',
    contraindications:
      'Hypersensitivity to enfortumab vedotin or to any excipient.',
    commonAdverseEffects:
      'Severe cutaneous adverse reactions (including Stevens-Johnson syndrome and toxic epidermal necrolysis), peripheral neuropathy, hyperglycaemia and diabetic ketoacidosis, pneumonitis/interstitial lung disease, alopecia, fatigue, decreased appetite, diarrhoea, nausea, dysgeusia, dry eye, anaemia, weight decreased.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Padcev (enfortumab vedotin)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/padcev',
    notes:
      'Originator Astellas Nectin-4-directed antibody-drug conjugate 20 mg single-use vial (EMA Marketing Authorisation Holder: Astellas Pharma Europe B.V.). Monitor closely for skin reactions, blood glucose, and peripheral neuropathy.',
  },
  {
    brandName: 'Padcev 30 mg',
    genericName: 'Enfortumab vedotin',
    activeIngredients: ['Enfortumab vedotin'],
    drugClass: 'Nectin-4-Directed Antibody-Drug Conjugates (Urothelial Carcinoma)',
    strength: '30 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 30 mg powder',
    approvedIndications:
      'In combination with pembrolizumab for first-line unresectable or metastatic urothelial cancer; and as monotherapy for locally advanced or metastatic urothelial cancer following platinum-containing chemotherapy and a PD-1/PD-L1 inhibitor.',
    usualAdultDose:
      '1.25 mg/kg (maximum 125 mg for patients ≥100 kg) infused intravenously over 30 minutes on Days 1 and 8 of a 21-day cycle (with pembrolizumab) or Days 1, 8, and 15 of a 28-day cycle (monotherapy).',
    contraindications:
      'Hypersensitivity to enfortumab vedotin or to any excipient.',
    commonAdverseEffects:
      'Cutaneous reactions (maculopapular rash, pruritus, SJS/TEN), peripheral sensory/motor neuropathy, hyperglycaemia, pneumonitis/ILD, alopecia, fatigue, diarrhoea, decreased appetite, ocular disorders (dry eye, keratitis).',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze.',
    specialties: ['Oncology', 'Urology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Padcev (enfortumab vedotin)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/padcev',
    notes:
      'Originator Astellas Nectin-4-directed antibody-drug conjugate 30 mg single-use vial.',
  },

  // 11. Mycamine (Micafungin)
  {
    brandName: 'Mycamine 50 mg',
    genericName: 'Micafungin',
    activeIngredients: ['Micafungin'],
    drugClass: 'Echinocandin Systemic Antifungals',
    strength: '50 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 50 mg powder with UV-protective film',
    approvedIndications:
      'Adults, adolescents ≥16 years and elderly: treatment of invasive candidiasis; treatment of oesophageal candidiasis where intravenous therapy is appropriate; prophylaxis of Candida infection in patients undergoing allogeneic haematopoietic stem cell transplantation or expected to have neutropenia (ANC <500 cells/µL) for ≥10 days. Children (including neonates) and adolescents <16 years: treatment of invasive candidiasis and prophylaxis of Candida infection in HSCT or prolonged neutropenia.',
    usualAdultDose:
      'Administered by intravenous infusion over approximately 1 hour (in patients >40 kg): invasive candidiasis 100 mg/day (may increase to 200 mg/day if response is inadequate); oesophageal candidiasis 150 mg/day; prophylaxis of Candida infection 50 mg/day.',
    contraindications:
      'Hypersensitivity to micafungin, to other echinocandins, or to any excipient.',
    commonAdverseEffects:
      'Leukopenia, neutropenia, anaemia, hypokalaemia, hypomagnesaemia, hypocalcaemia, headache, phlebitis, nausea, vomiting, diarrhoea, abdominal pain, elevated liver enzymes (ALT, AST, alkaline phosphatase), hyperbilirubinaemia, rash, pyrexia, rigors.',
    storageConditions:
      'Unopened vial: This medicinal product does not require any special temperature storage conditions. Protect reconstituted/diluted solution from light.',
    specialties: ['Infectious Diseases', 'Critical Care Medicine', 'Hematology', 'Oncology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Mycamine (micafungin)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mycamine',
    notes:
      'Originator Astellas echinocandin systemic antifungal 50 mg single-use vial. Monitor hepatic function during treatment.',
  },
  {
    brandName: 'Mycamine 100 mg',
    genericName: 'Micafungin',
    activeIngredients: ['Micafungin'],
    drugClass: 'Echinocandin Systemic Antifungals',
    strength: '100 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 100 mg powder with UV-protective film',
    approvedIndications:
      'Treatment of invasive candidiasis, treatment of oesophageal candidiasis requiring IV therapy, and prophylaxis of Candida infection in allogeneic HSCT or prolonged severe neutropenia.',
    usualAdultDose:
      'Invasive candidiasis (body weight >40 kg): 100 mg once daily by intravenous infusion over approximately 1 hour (may be increased to 200 mg/day if response is inadequate). Oesophageal candidiasis (>40 kg): 150 mg once daily.',
    contraindications:
      'Hypersensitivity to micafungin, to other echinocandins, or to any excipient.',
    commonAdverseEffects:
      'Leukopenia, neutropenia, anaemia, hypokalaemia, hypomagnesaemia, hypocalcaemia, headache, phlebitis, nausea, vomiting, diarrhoea, abdominal pain, elevated transaminases/alkaline phosphatase/bilirubin, rash, pyrexia.',
    storageConditions:
      'Unopened vial: This medicinal product does not require any special temperature storage conditions. Protect diluted infusion bag from light.',
    specialties: ['Infectious Diseases', 'Critical Care Medicine', 'Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Mycamine (micafungin)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/mycamine',
    notes:
      'Originator Astellas echinocandin systemic antifungal 100 mg single-use vial.',
  },
];

export const ASTELLAS_PRODUCTS: AiProductDraft[] = ASTELLAS_COMPACT_DRUGS.map((d) => ({
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
    approvedIndications: d.approvedIndications,
    usualAdultDose: d.usualAdultDose,
    contraindications: d.contraindications,
    commonAdverseEffects: d.commonAdverseEffects,
    storageConditions: d.storageConditions,
  },
  specialties: d.specialties,
  sources: SRC(d.sourceTitle, d.sourceUrl),
  notes: d.notes,
}));

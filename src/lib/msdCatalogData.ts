import type { AiDraftSource, AiProductDraft } from './catalog';

const MSD_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactMsdDrug {
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

function toMsdProductDraft(item: CompactMsdDrug): AiProductDraft {
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
    sources: MSD_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Merck Sharp & Dohme LLC (MSD) regulatory monograph (EMA EPAR / SmPC / FDA); saved as draft pending verification.',
  };
}

const MSD_COMPACT_PRODUCTS: CompactMsdDrug[] = [
  // =========================================================================
  // 1. DIABETES & METABOLIC — SITAGLIPTIN & ERTUGLIFLOZIN (15 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Januvia 25 mg',
    brandNameAr: 'جانوفيا 25 ملغم',
    genericName: 'Sitagliptin',
    drugClassNameEn: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '25 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Improvement of glycemic control in adult patients with type 2 diabetes mellitus as monotherapy (when diet and exercise alone do not provide adequate control and metformin is inappropriate due to contraindications or intolerance), as dual or triple oral therapy in combination with metformin, a sulphonylurea, or a PPAR-gamma agonist (thiazolidinedione), or as add-on to insulin (with or without metformin).',
    adultDosage:
      'Standard adult dose with normal renal function is 100 mg once daily. The 25 mg strength is indicated for patients with severe renal impairment (GFR ≥15 to <30 mL/min) or with end-stage renal disease (ESRD, GFR <15 mL/min) including those on hemodialysis or peritoneal dialysis: one 25 mg tablet once daily with or without food, administered without regard to the timing of dialysis.',
    contraindications:
      'Hypersensitivity to sitagliptin or to any of the excipients.',
    sideEffects:
      'Hypoglycemia (particularly when combined with a sulphonylurea or insulin), headache, upper respiratory tract infection, nasopharyngitis, osteoarthritis, pain in extremity, constipation, flatulence, nausea, peripheral edema, and rare acute pancreatitis or bullous pemphigoid.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Januvia (sitagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/januvia',
  },
  {
    brandName: 'Januvia 50 mg',
    brandNameAr: 'جانوفيا 50 ملغم',
    genericName: 'Sitagliptin',
    drugClassNameEn: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Improvement of glycemic control in adult patients with type 2 diabetes mellitus as monotherapy, dual therapy, triple therapy, or add-on to insulin.',
    adultDosage:
      'Indicated for patients with moderate renal impairment (GFR ≥30 to <45 mL/min): one 50 mg tablet once daily with or without food.',
    contraindications:
      'Hypersensitivity to sitagliptin or any excipient.',
    sideEffects:
      'Hypoglycemia (with sulphonylurea or insulin), headache, nasopharyngitis, upper respiratory tract infection, constipation, arthralgia, and rare acute pancreatitis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Januvia (sitagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/januvia',
  },
  {
    brandName: 'Januvia 100 mg',
    brandNameAr: 'جانوفيا 100 ملغم',
    genericName: 'Sitagliptin',
    drugClassNameEn: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Improvement of glycemic control in adult patients with type 2 diabetes mellitus as monotherapy, dual or triple oral combination therapy, or add-on to insulin.',
    adultDosage:
      'One 100 mg film-coated tablet once daily with or without food in patients with GFR ≥45 mL/min.',
    contraindications:
      'Hypersensitivity to sitagliptin or any excipient.',
    sideEffects:
      'Headache, hypoglycemia (in combination with sulphonylureas or insulin), nasopharyngitis, upper respiratory tract infection, osteoarthritis, constipation, and rare acute pancreatitis or bullous pemphigoid.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Januvia (sitagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/januvia',
  },
  {
    brandName: 'Janumet 50 mg/500 mg',
    brandNameAr: 'جانوميت 50 ملغم / 500 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 500 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Adjunct to diet and exercise to improve glycemic control in adult patients with type 2 diabetes mellitus inadequately controlled on their maximal tolerated dose of metformin alone, or those already being treated with the combination of sitagliptin and metformin; also indicated in combination with a sulphonylurea, a PPAR-gamma agonist, or insulin.',
    adultDosage:
      'One 50 mg/500 mg tablet twice daily with meals to reduce gastrointestinal adverse reactions associated with metformin, titrated according to current metformin dose while maintaining 100 mg sitagliptin total daily dose.',
    contraindications:
      'Hypersensitivity to sitagliptin or metformin; any type of acute metabolic acidosis (such as lactic acidosis, diabetic ketoacidosis); diabetic pre-coma; severe renal failure (GFR <30 mL/min); acute conditions with the potential to alter renal function (dehydration, severe infection, shock, intravascular administration of iodinated contrast agents); acute or chronic disease which may cause tissue hypoxia (cardiac or respiratory failure, recent myocardial infarction, shock); hepatic impairment; acute alcohol intoxication, alcoholism; breastfeeding.',
    sideEffects:
      'Diarrhea, nausea, dyspepsia, flatulence, vomiting, abdominal pain, headache, hypoglycemia (with sulphonylurea or insulin), decreased vitamin B12 levels, and very rare lactic acidosis or acute pancreatitis.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet (sitagliptin / metformin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/janumet',
  },
  {
    brandName: 'Janumet 50 mg/850 mg',
    brandNameAr: 'جانوميت 50 ملغم / 850 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 850 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Improvement of glycemic control in adult patients with type 2 diabetes mellitus inadequately controlled on metformin alone or already treated with sitagliptin and metformin.',
    adultDosage:
      'One 50 mg/850 mg film-coated tablet twice daily with meals (providing 100 mg sitagliptin and 1700 mg metformin daily).',
    contraindications:
      'Hypersensitivity to sitagliptin or metformin; acute metabolic acidosis (lactic acidosis, DKA); GFR <30 mL/min; acute conditions altering renal function; tissue hypoxia states; hepatic impairment; alcoholism; breastfeeding.',
    sideEffects:
      'Diarrhea, nausea, dyspepsia, flatulence, vomiting, abdominal pain, headache, decreased vitamin B12 absorption, and hypoglycemia when combined with insulin or sulphonylureas.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet (sitagliptin / metformin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/janumet',
  },
  {
    brandName: 'Janumet 50 mg/1000 mg',
    brandNameAr: 'جانوميت 50 ملغم / 1000 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 1000 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'High-strength twice-daily combination of sitagliptin 50 mg and metformin 1000 mg for adults with type 2 diabetes mellitus.',
    adultDosage:
      'One 50 mg/1000 mg film-coated tablet twice daily with morning and evening meals (providing 100 mg sitagliptin and 2000 mg metformin daily; require GFR ≥45 mL/min for 2000 mg/day metformin).',
    contraindications:
      'Hypersensitivity to sitagliptin or metformin; acute metabolic acidosis (lactic acidosis, DKA); GFR <30 mL/min; hepatic impairment; acute conditions altering renal function or causing tissue hypoxia; alcoholism; breastfeeding.',
    sideEffects:
      'Gastrointestinal symptoms (diarrhea, nausea, dyspepsia, flatulence, vomiting, abdominal pain), headache, vitamin B12 decrease, and rare lactic acidosis or pancreatitis.',
    storageConditions: 'Do not store above 30°C.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet (sitagliptin / metformin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/janumet',
  },
  {
    brandName: 'Janumet XR 50 mg/500 mg',
    brandNameAr: 'جانوميت إكس آر 50 ملغم / 500 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Extended-Release Biguanide Combinations',
    dosageForm: 'Prolonged-release tablet',
    strength: '50 mg / 500 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (bottle)',
    indications:
      'Adjunct to diet and exercise to improve glycemic control in adults with type 2 diabetes mellitus when treatment with both sitagliptin and extended-release metformin is appropriate.',
    adultDosage:
      'Administer once daily with a meal, preferably in the evening. Patients taking one 50 mg/500 mg or 50 mg/1000 mg tablet should take two tablets together once daily to achieve the 100 mg sitagliptin daily dose. Swallow whole; do not split, crush, or chew.',
    contraindications:
      'Severe renal impairment (eGFR <30 mL/min/1.73 m²); acute or chronic metabolic acidosis, including diabetic ketoacidosis; history of serious hypersensitivity reaction to sitagliptin or metformin.',
    sideEffects:
      'Diarrhea, nausea, vomiting, dyspepsia, flatulence, abdominal discomfort, headache, upper respiratory tract infection, nasopharyngitis, vitamin B12 deficiency, and rare lactic acidosis or pancreatitis.',
    storageConditions: 'Store at 20°C to 25°C. Keep in a tightly closed moisture-resistant container.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet XR (sitagliptin and metformin extended-release) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/202270s004lbl.pdf',
  },
  {
    brandName: 'Janumet XR 50 mg/1000 mg',
    brandNameAr: 'جانوميت إكس آر 50 ملغم / 1000 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Extended-Release Biguanide Combinations',
    dosageForm: 'Prolonged-release tablet',
    strength: '50 mg / 1000 mg',
    route: 'Oral',
    packSize: '56 prolonged-release tablets (bottle)',
    indications:
      'Once-daily extended-release combination of sitagliptin and metformin for adults with type 2 diabetes mellitus.',
    adultDosage:
      'Two 50 mg/1000 mg prolonged-release tablets taken together once daily with the evening meal (delivering 100 mg sitagliptin and 2000 mg extended-release metformin once daily). Swallow whole without crushing or chewing.',
    contraindications:
      'Severe renal impairment (eGFR <30 mL/min/1.73 m²); acute or chronic metabolic acidosis including DKA; hypersensitivity to sitagliptin or metformin.',
    sideEffects:
      'Diarrhea, nausea, dyspepsia, abdominal pain, headache, nasopharyngitis, decreased vitamin B12 levels, and rare lactic acidosis or acute pancreatitis.',
    storageConditions: 'Store at 20°C to 25°C in original moisture-proof container.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet XR (sitagliptin and metformin extended-release) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/202270s004lbl.pdf',
  },
  {
    brandName: 'Janumet XR 100 mg/1000 mg',
    brandNameAr: 'جانوميت إكس آر 100 ملغم / 1000 ملغم',
    genericName: 'Sitagliptin + Metformin',
    drugClassNameEn: 'DPP-4 Inhibitor & Extended-Release Biguanide Combinations',
    dosageForm: 'Prolonged-release tablet',
    strength: '100 mg / 1000 mg',
    route: 'Oral',
    packSize: '28 prolonged-release tablets (bottle)',
    indications:
      'Single-tablet once-daily combination of sitagliptin 100 mg and extended-release metformin 1000 mg for adults with type 2 diabetes mellitus.',
    adultDosage:
      'One 100 mg/1000 mg prolonged-release tablet once daily with a meal, preferably in the evening. Swallow whole; do not split, crush, or chew.',
    contraindications:
      'Severe renal impairment (eGFR <30 mL/min/1.73 m²); acute or chronic metabolic acidosis (lactic acidosis, DKA); hypersensitivity to sitagliptin or metformin.',
    sideEffects:
      'Diarrhea, nausea, vomiting, abdominal pain, headache, upper respiratory tract infection, vitamin B12 decrease, and rare lactic acidosis or pancreatitis.',
    storageConditions: 'Store at 20°C to 25°C in tightly closed container.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Janumet XR (sitagliptin and metformin extended-release) — FDA Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/202270s004lbl.pdf',
  },
  {
    brandName: 'Steglatro 5 mg',
    brandNameAr: 'ستيجلاترو 5 ملغم',
    genericName: 'Ertugliflozin',
    drugClassNameEn: 'Sodium-Glucose Co-Transporter 2 (SGLT2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Treatment of adults aged 18 years and older with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise, as monotherapy when metformin is considered inappropriate due to intolerance or contraindications, or in addition to other medicinal products for the treatment of diabetes.',
    adultDosage:
      'Recommended starting dose is 5 mg once daily taken in the morning, with or without food. In patients tolerating 5 mg once daily who need additional glycemic control, the dose can be increased to 15 mg once daily. Initiation is not recommended if eGFR is <45 mL/min/1.73 m².',
    contraindications:
      'Hypersensitivity to ertugliflozin or to any of the excipients.',
    sideEffects:
      'Vulvovaginal mycotic infection and other female genital mycotic infections, balanitis candida and other male genital mycotic infections, urinary tract infection, hypoglycemia (with insulin or insulin secretagogues), volume depletion/hypotension, increased urination, thirst, pruritus vulvovaginal, and rare diabetic ketoacidosis or Fournier’s gangrene.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'Steglatro (ertugliflozin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/steglatro',
  },
  {
    brandName: 'Steglatro 15 mg',
    brandNameAr: 'ستيجلاترو 15 ملغم',
    genericName: 'Ertugliflozin',
    drugClassNameEn: 'Sodium-Glucose Co-Transporter 2 (SGLT2) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '15 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'High-strength maintenance SGLT2 inhibitor therapy for adults with type 2 diabetes mellitus requiring additional glycemic control beyond ertugliflozin 5 mg once daily.',
    adultDosage:
      'One 15 mg film-coated tablet once daily in the morning, with or without food.',
    contraindications:
      'Hypersensitivity to ertugliflozin or any excipient.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, osmotic diuresis (pollakiuria, polyuria, nocturia), thirst, volume depletion, and rare euglycemic diabetic ketoacidosis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'Steglatro (ertugliflozin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/steglatro',
  },
  {
    brandName: 'Segluromet 2.5 mg/1000 mg',
    brandNameAr: 'سيجلوروميت 2.5 ملغم / 1000 ملغم',
    genericName: 'Ertugliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor & Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg / 1000 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'Adjunct to diet and exercise to improve glycemic control in adult patients aged 18 years and older with type 2 diabetes mellitus inadequately controlled on their maximally tolerated dose of metformin alone, in combination with other medicinal products for the treatment of diabetes, or in patients already being treated with the combination of ertugliflozin and metformin as separate tablets.',
    adultDosage:
      'One 2.5 mg/1000 mg tablet twice daily with meals (providing 5 mg ertugliflozin and 2000 mg metformin daily).',
    contraindications:
      'Hypersensitivity to the active substances; any type of acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis); diabetic pre-coma; severe renal failure (GFR <30 mL/min); acute conditions with potential to alter renal function; tissue hypoxia states; hepatic impairment; acute alcohol intoxication, alcoholism.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, gastrointestinal symptoms (diarrhea, nausea, vomiting, flatulence, abdominal pain), osmotic diuresis, volume depletion, decreased vitamin B12, and rare lactic acidosis or DKA.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Segluromet (ertugliflozin / metformin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/segluromet',
  },
  {
    brandName: 'Segluromet 7.5 mg/1000 mg',
    brandNameAr: 'سيجلوروميت 7.5 ملغم / 1000 ملغم',
    genericName: 'Ertugliflozin + Metformin',
    drugClassNameEn: 'SGLT2 Inhibitor & Biguanide Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '7.5 mg / 1000 mg',
    route: 'Oral',
    packSize: '56 film-coated tablets (blister pack)',
    indications:
      'High-strength fixed-dose combination of ertugliflozin 7.5 mg and metformin 1000 mg twice daily for adults with type 2 diabetes mellitus.',
    adultDosage:
      'One 7.5 mg/1000 mg tablet twice daily with meals (providing the maximum daily dose of 15 mg ertugliflozin and 2000 mg metformin).',
    contraindications:
      'Hypersensitivity to ertugliflozin or metformin; acute metabolic acidosis (lactic acidosis, DKA); GFR <30 mL/min; hepatic impairment; acute conditions altering renal function or causing tissue hypoxia; alcoholism.',
    sideEffects:
      'Vulvovaginal candidiasis, balanitis, urinary tract infection, diarrhea, nausea, abdominal pain, polyuria, volume depletion, and rare DKA or lactic acidosis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Segluromet (ertugliflozin / metformin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/segluromet',
  },
  {
    brandName: 'Steglujan 5 mg/100 mg',
    brandNameAr: 'ستيجلوجان 5 ملغم / 100 ملغم',
    genericName: 'Ertugliflozin + Sitagliptin',
    drugClassNameEn: 'SGLT2 Inhibitor & DPP-4 Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg / 100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'In adults aged 18 years and older with type 2 diabetes mellitus as an adjunct to diet and exercise to improve glycemic control when metformin and/or a sulphonylurea and one of the monocomponents of Steglujan do not provide adequate glycemic control, or in patients already being treated with the combination of ertugliflozin and sitagliptin as separate tablets.',
    adultDosage:
      'Recommended starting dose is one 5 mg/100 mg tablet once daily taken in the morning, with or without food; may be increased to one 15 mg/100 mg tablet once daily if additional glycemic control is needed.',
    contraindications:
      'Hypersensitivity to ertugliflozin, sitagliptin, or to any of the excipients.',
    sideEffects:
      'Genital mycotic infections, urinary tract infection, headache, hypoglycemia (with insulin or sulphonylurea), volume depletion, increased urination, thirst, and rare acute pancreatitis or diabetic ketoacidosis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Steglujan (ertugliflozin / sitagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/steglujan',
  },
  {
    brandName: 'Steglujan 15 mg/100 mg',
    brandNameAr: 'ستيجلوجان 15 ملغم / 100 ملغم',
    genericName: 'Ertugliflozin + Sitagliptin',
    drugClassNameEn: 'SGLT2 Inhibitor & DPP-4 Inhibitor Combinations',
    dosageForm: 'Film-coated tablet',
    strength: '15 mg / 100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'High-strength once-daily fixed-dose combination of ertugliflozin 15 mg and sitagliptin 100 mg for adults with type 2 diabetes mellitus.',
    adultDosage:
      'One 15 mg/100 mg film-coated tablet once daily in the morning, with or without food.',
    contraindications:
      'Hypersensitivity to ertugliflozin, sitagliptin, or any excipient.',
    sideEffects:
      'Genital mycotic infections, urinary tract infections, osmotic diuresis, headache, nasopharyngitis, volume depletion, and rare DKA or pancreatitis.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Steglujan (ertugliflozin / sitagliptin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/steglujan',
  },

  // =========================================================================
  // 2. HOSPITAL ANTI-INFECTIVES — ANTIBACTERIALS, ANTIFUNGALS & ANTIVIRALS (22 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Invanz 1 g',
    brandNameAr: 'إنفانز 1 غم',
    genericName: 'Ertapenem',
    drugClassNameEn: 'Carbapenem Antibacterials',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '1000 mg',
    route: 'Intravenous',
    packSize: '1 vial × 1 g',
    indications:
      'Treatment of infections in pediatric patients (3 months to 17 years) and in adults when caused by bacteria known or very likely to be susceptible to ertapenem and when parenteral therapy is required: intra-abdominal infections, community-acquired pneumonia, acute gynecological infections, diabetic foot infections of the skin and soft tissue; and in adults for prophylaxis of surgical site infection following elective colorectal surgery.',
    adultDosage:
      'Adults and adolescents (13 to 17 years): 1 g administered once daily by intravenous infusion over a period of 30 minutes for 3 to 14 days depending on infection site and severity. Prophylaxis in elective colorectal surgery: single 1 g IV dose completed within 1 hour prior to surgical incision.',
    contraindications:
      'Hypersensitivity to ertapenem or to any excipient; hypersensitivity to any other carbapenem antibacterial agent; severe hypersensitivity (e.g. anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (e.g. penicillins or cephalosporins).',
    sideEffects:
      'Headache, infused vein complication, phlebitis/thrombophlebitis, diarrhea, nausea, vomiting, rash, pruritus, elevated ALT, AST, and alkaline phosphatase, increased platelet count, and rare seizures or Clostridioides difficile colitis.',
    storageConditions: 'Do not store above 25°C.',
    specialties: ['Internal Medicine', 'General Surgery', 'Pulmonology', 'Obstetrics and Gynecology', 'Emergency Medicine'],
    sourceTitle: 'Invanz (ertapenem) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/invanz',
  },
  {
    brandName: 'Tienam 500 mg/500 mg',
    brandNameAr: 'تينام 500 ملغم / 500 ملغم',
    genericName: 'Imipenem + Cilastatin',
    drugClassNameEn: 'Carbapenem & Renal Dehydropeptidase Inhibitor Combinations',
    dosageForm: 'Powder for solution for infusion',
    strength: '500 mg / 500 mg',
    route: 'Intravenous',
    packSize: '10 vials × 500 mg/500 mg',
    indications:
      'Treatment of complicated intra-abdominal infections, severe pneumonia including hospital- and ventilator-associated pneumonia, intra- and post-partum infections, complicated urinary tract infections, and complicated skin and soft-tissue infections; management of neutropenic patients with fever suspected to be due to a bacterial infection, and bacterial septicemia associated with the above infections.',
    adultDosage:
      'Adults and adolescents with normal renal function (CrCl ≥90 mL/min): 500 mg/500 mg every 6 hours OR 1000 mg/1000 mg every 8 hours or every 6 hours depending on severity and susceptibility (e.g. Pseudomonas aeruginosa). Administer by intravenous infusion over 20–30 minutes for doses ≤500 mg/500 mg, or over 40–60 minutes for doses >500 mg/500 mg. Reduce dose in renal impairment.',
    contraindications:
      'Hypersensitivity to imipenem, cilastatin, or any excipient; hypersensitivity to any other carbapenem antibacterial agent; severe hypersensitivity (e.g. anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (penicillins or cephalosporins).',
    sideEffects:
      'Eosinophilia, thrombophlebitis, diarrhea, nausea, vomiting, rash (exanthematous), transient increases in serum transaminases and alkaline phosphatase, positive direct Coombs test, and CNS adverse reactions (myoclonic activity, confusional states, or seizures, especially with unadjusted renal dosing or CNS lesions); decreases serum valproic acid concentrations.',
    storageConditions: 'Do not store above 25°C.',
    specialties: ['Internal Medicine', 'General Surgery', 'Pulmonology', 'Urology', 'Emergency Medicine'],
    sourceTitle: 'Tienam (imipenem / cilastatin) — EMA Harmonization Referral & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/tienam',
  },
  {
    brandName: 'Zerbaxa 1 g/0.5 g',
    brandNameAr: 'زيرباكسا 1 غم / 0.5 غم',
    genericName: 'Ceftolozane + Tazobactam',
    drugClassNameEn: 'Antipseudomonal Cephalosporin & Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '1000 mg / 500 mg',
    route: 'Intravenous',
    packSize: '10 vials × 1.5 g',
    indications:
      'Treatment of complicated intra-abdominal infections (used in combination with metronidazole), acute pyelonephritis, complicated urinary tract infections, and hospital-acquired pneumonia (HAP), including ventilator-associated pneumonia (VAP) in adults (and pediatric patients for cIAI/cUTI).',
    adultDosage:
      'Complicated intra-abdominal infections and complicated UTIs/pyelonephritis: 1 g ceftolozane / 0.5 g tazobactam (1.5 g) every 8 hours infused intravenously over 1 hour for 4–14 days (7 days for cUTI). Hospital-acquired/ventilator-associated pneumonia: 2 g ceftolozane / 1 g tazobactam (3 g, two vials) every 8 hours infused over 1 hour for 8–14 days. Adjust dose when CrCl ≤50 mL/min.',
    contraindications:
      'Hypersensitivity to the active substances or any excipient; hypersensitivity to any cephalosporin antibacterial agent; severe hypersensitivity (e.g. anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (penicillins or carbapenems).',
    sideEffects:
      'Nausea, headache, constipation, diarrhea, pyrexia, hypotension, insomnia, anxiety, hypokalemia, thrombocytosis, abdominal pain, vomiting, rash, infusion site reactions, elevated ALT and AST, and Clostridioides difficile colitis.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Store in the original packaging to protect from light.',
    specialties: ['Internal Medicine', 'Pulmonology', 'General Surgery', 'Urology', 'Emergency Medicine'],
    sourceTitle: 'Zerbaxa (ceftolozane / tazobactam) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zerbaxa',
  },
  {
    brandName: 'Recarbrio 500 mg/500 mg/250 mg',
    brandNameAr: 'ريكاربريو 500 ملغم / 500 ملغم / 250 ملغم',
    genericName: 'Imipenem + Cilastatin + Relebactam',
    drugClassNameEn: 'Carbapenem, Dehydropeptidase Inhibitor & Diazabicyclooctane Beta-Lactamase Inhibitor Combinations',
    dosageForm: 'Powder for solution for infusion',
    strength: '500 mg / 500 mg / 250 mg',
    route: 'Intravenous',
    packSize: '25 vials × 1.25 g',
    indications:
      'Treatment of hospital-acquired pneumonia (HAP), including ventilator-associated pneumonia (VAP), in adults; bacteremia that occurs in association with, or is suspected to be associated with HAP or VAP, in adults; and infections due to aerobic Gram-negative organisms in adults with limited treatment options.',
    adultDosage:
      'One vial (500 mg imipenem / 500 mg cilastatin / 250 mg relebactam) administered every 6 hours by intravenous infusion over 30 minutes for 7 to 14 days in patients with CrCl ≥90 mL/min. Adjust dose in patients with CrCl <90 mL/min.',
    contraindications:
      'Hypersensitivity to the active substances or any excipient; hypersensitivity to any other carbapenem antibacterial agent; severe hypersensitivity to any other type of beta-lactam antibacterial agent.',
    sideEffects:
      'Diarrhea, nausea, vomiting, eosinophilia, thrombophlebitis, rash, elevated ALT/AST and alkaline phosphatase, confusion, seizures (rare), and reduced valproic acid levels.',
    storageConditions: 'Do not store above 30°C. Keep vials in the outer carton to protect from light.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Emergency Medicine', 'General Surgery'],
    sourceTitle: 'Recarbrio (imipenem / cilastatin / relebactam) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/recarbrio',
  },
  {
    brandName: 'Sivextro 200 mg',
    brandNameAr: 'سيفيكسترو 200 ملغم',
    genericName: 'Tedizolid',
    drugClassNameEn: 'Oxazolidinone Antibacterials',
    dosageForm: 'Film-coated tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '6 film-coated tablets (blister pack)',
    indications:
      'Treatment of acute bacterial skin and skin structure infections (ABSSSI) in adults and adolescents from 12 years of age caused by susceptible Gram-positive microorganisms including MRSA.',
    adultDosage:
      'One 200 mg film-coated tablet once daily for 6 days, taken with or without food.',
    contraindications:
      'Hypersensitivity to tedizolid or to any of the excipients.',
    sideEffects:
      'Nausea, headache, diarrhea, vomiting, dizziness, fatigue, generalized pruritus, insomnia, and rare myelosuppression or peripheral/optic neuropathy with extended courses.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Internal Medicine', 'Dermatology', 'General Surgery'],
    sourceTitle: 'Sivextro (tedizolid) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/sivextro',
  },
  {
    brandName: 'Cubicin 350 mg',
    brandNameAr: 'كوبيسين 350 ملغم',
    genericName: 'Daptomycin',
    drugClassNameEn: 'Cyclic Lipopeptide Antibacterials',
    dosageForm: 'Powder for solution for injection or infusion',
    strength: '350 mg',
    route: 'Intravenous',
    packSize: '1 vial × 350 mg',
    indications:
      'Treatment of complicated skin and soft-tissue infections (cSSTI) in adults and pediatric patients (1 to 17 years); right-sided infective endocarditis (RIE) due to Staphylococcus aureus in adults; Staphylococcus aureus bacteremia (SAB) when associated with RIE or with cSSTI in adults and pediatric patients.',
    adultDosage:
      'cSSTI without S. aureus bacteremia: 4 mg/kg once every 24 hours for 7–14 days. cSSTI with S. aureus bacteremia or right-sided infective endocarditis: 6 mg/kg once every 24 hours. Administer as a 30-minute IV infusion or a 2-minute IV injection in adults (extend interval to every 48 hours if CrCl <30 mL/min). Monitor plasma creatine phosphokinase (CPK) at baseline and at least weekly.',
    contraindications:
      'Hypersensitivity to daptomycin or to any of the excipients.',
    sideEffects:
      'Fungal infections, urinary tract infection, Candida infection, anemia, anxiety, insomnia, dizziness, headache, hypertension, hypotension, gastrointestinal and abdominal pain, nausea, vomiting, constipation, diarrhea, flatulence, rash, pruritus, limb pain, increased serum creatine phosphokinase (CPK), myopathy/rhabdomyolysis, elevated liver enzymes, infusion site reactions, pyrexia, and rare eosinophilic pneumonia.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C).',
    specialties: ['Internal Medicine', 'Cardiology', 'General Surgery', 'Orthopedics'],
    sourceTitle: 'Cubicin (daptomycin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cubicin',
  },
  {
    brandName: 'Cubicin 500 mg',
    brandNameAr: 'كوبيسين 500 ملغم',
    genericName: 'Daptomycin',
    drugClassNameEn: 'Cyclic Lipopeptide Antibacterials',
    dosageForm: 'Powder for solution for injection or infusion',
    strength: '500 mg',
    route: 'Intravenous',
    packSize: '1 vial × 500 mg',
    indications:
      'Complicated skin and soft-tissue infections (cSSTI), right-sided infective endocarditis (RIE) due to Staphylococcus aureus, and Staphylococcus aureus bacteremia (SAB) associated with RIE or cSSTI.',
    adultDosage:
      '4 mg/kg once every 24 hours for cSSTI without bacteremia; 6 mg/kg once every 24 hours for S. aureus bacteremia or right-sided infective endocarditis, administered by 30-minute IV infusion or 2-minute IV injection.',
    contraindications:
      'Hypersensitivity to daptomycin or any excipient.',
    sideEffects:
      'Elevated blood creatine phosphokinase (CPK), myalgia/myopathy, nausea, vomiting, diarrhea, constipation, headache, rash, infusion site reactions, elevated transaminases, and rare eosinophilic pneumonia.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C).',
    specialties: ['Internal Medicine', 'Cardiology', 'General Surgery', 'Orthopedics'],
    sourceTitle: 'Cubicin (daptomycin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cubicin',
  },
  {
    brandName: 'Dificlir 200 mg',
    brandNameAr: 'ديفيكلير 200 ملغم',
    genericName: 'Fidaxomicin',
    drugClassNameEn: 'Macrocyclic Antibacterials (Narrow-Spectrum Anti-Clostridioides difficile)',
    dosageForm: 'Film-coated tablet',
    strength: '200 mg',
    route: 'Oral',
    packSize: '20 film-coated tablets (blister pack)',
    indications:
      'Treatment of Clostridioides difficile infections (CDI), also known as C. difficile-associated diarrhea (CDAD), in adults and pediatric patients from birth (tablets for patients weighing at least 12.5 kg).',
    adultDosage:
      'Standard dosing: one 200 mg tablet administered twice daily (every 12 hours) for 10 days, with or without food. Extended-pulsed dosing: 200 mg twice daily on Days 1–5, followed by 200 mg once every other day on Days 7–25.',
    contraindications:
      'Hypersensitivity to fidaxomicin or to any of the excipients.',
    sideEffects:
      'Nausea, vomiting, constipation, abdominal distension, dry mouth, flatulence, dizziness, headache, dysgeusia, rash, pruritus, and decreased appetite.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Dificlir (fidaxomicin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/dificlir',
  },
  {
    brandName: 'Zinplava 1000 mg/40 mL',
    brandNameAr: 'زينبلافا 1000 ملغم / 40 مل',
    genericName: 'Bezlotoxumab',
    drugClassNameEn: 'Anti-Clostridioides difficile Toxin B Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '25 mg / mL (1000 mg / 40 mL)',
    route: 'Intravenous',
    packSize: '1 vial × 40 mL (1000 mg)',
    indications:
      'Prevention of recurrence of Clostridioides difficile infection (CDI) in adults and pediatric patients 1 year of age and older at high risk for recurrence of CDI who are receiving antibacterial drug treatment for CDI.',
    adultDosage:
      'Administer as a single 10 mg/kg intravenous infusion over 60 minutes during the course of antibacterial therapy for CDI.',
    contraindications:
      'Hypersensitivity to bezlotoxumab or to any of the excipients.',
    sideEffects:
      'Nausea, diarrhea, pyrexia, headache, infusion-related reactions (hypertension, fatigue, dizziness, dyspnea), and heart failure exacerbation in patients with a history of congestive heart failure.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Zinplava (bezlotoxumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zinplava',
  },
  {
    brandName: 'Cancidas 50 mg',
    brandNameAr: 'كانسيداس 50 ملغم',
    genericName: 'Caspofungin',
    drugClassNameEn: 'Echinocandin Antifungals',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '50 mg',
    route: 'Intravenous',
    packSize: '1 vial × 50 mg',
    indications:
      'Treatment of invasive candidiasis in adult or pediatric patients; treatment of invasive aspergillosis in adult or pediatric patients who are refractory to or intolerant of amphotericin B, lipid formulations of amphotericin B, and/or itraconazole; empirical therapy for presumed fungal infections (such as Candida or Aspergillus) in febrile, neutropenic adult or pediatric patients.',
    adultDosage:
      'Single 70 mg loading dose on Day 1, followed by 50 mg daily thereafter (70 mg daily maintenance if body weight >80 kg or coadministered with metabolic inducers). Administer by slow intravenous infusion over approximately 1 hour (diluted in 0.9% NaCl or lactated Ringer’s; never dilute in glucose-containing solutions). Reduce maintenance dose to 35 mg daily in moderate hepatic impairment (Child-Pugh score 7 to 9).',
    contraindications:
      'Hypersensitivity to caspofungin or to any of the excipients.',
    sideEffects:
      'Decreased hemoglobin/hematocrit/WBC, hypokalemia, headache, phlebitis, dyspnea, nausea, diarrhea, vomiting, elevated hepatic enzymes (ALT, AST, alkaline phosphatase, direct and total bilirubin), rash, pruritus, erythema, hyperhidrosis, arthralgia, pyrexia, chills, and infusion-site pruritus.',
    storageConditions: 'Store unopened vials in a refrigerator (2°C to 8°C).',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine', 'General Surgery'],
    sourceTitle: 'Cancidas (caspofungin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cancidas',
  },
  {
    brandName: 'Cancidas 70 mg',
    brandNameAr: 'كانسيداس 70 ملغم',
    genericName: 'Caspofungin',
    drugClassNameEn: 'Echinocandin Antifungals',
    dosageForm: 'Powder for concentrate for solution for infusion',
    strength: '70 mg',
    route: 'Intravenous',
    packSize: '1 vial × 70 mg',
    indications:
      'Day 1 loading dose (and maintenance dose in adults >80 kg) for invasive candidiasis, refractory/intolerant invasive aspergillosis, and empirical antifungal therapy in febrile neutropenic patients.',
    adultDosage:
      'Single 70 mg loading dose on Day 1 (and 70 mg once daily maintenance in patients weighing >80 kg), administered by slow intravenous infusion over approximately 1 hour in glucose-free infusion solution.',
    contraindications:
      'Hypersensitivity to caspofungin or any excipient.',
    sideEffects:
      'Pyrexia, phlebitis, headache, nausea, vomiting, diarrhea, hypokalemia, elevated ALT/AST/alkaline phosphatase/bilirubin, rash, and histamine-mediated infusion symptoms.',
    storageConditions: 'Store unopened vials in a refrigerator (2°C to 8°C).',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine', 'General Surgery'],
    sourceTitle: 'Cancidas (caspofungin) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/cancidas',
  },
  {
    brandName: 'Noxafil 100 mg',
    brandNameAr: 'نوكسافيل 100 ملغم',
    genericName: 'Posaconazole',
    drugClassNameEn: 'Broad-Spectrum Triazole Antifungals',
    dosageForm: 'Gastro-resistant tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '24 gastro-resistant tablets (blister pack)',
    indications:
      'Prophylaxis of invasive fungal infections in high-risk immunocompromised patients (patients receiving remission-induction chemotherapy for acute myelogenous leukemia or myelodysplastic syndromes expected to result in prolonged neutropenia, and hematopoietic stem cell transplant recipients undergoing high-dose immunosuppressive therapy for graft-versus-host disease); primary treatment of invasive aspergillosis in adults; refractory or intolerant invasive aspergillosis, fusariosis, chromoblastomycosis, mycetoma, and coccidioidomycosis.',
    adultDosage:
      'Loading dose of 300 mg (three 100 mg gastro-resistant tablets) twice daily on Day 1, then 300 mg (three 100 mg tablets) once daily thereafter, taken with or without food. Swallow whole; do not crush, chew, or break. Notice: Noxafil tablets and Noxafil oral suspension are NOT interchangeable on a mg-for-mg basis due to higher bioavailability of the tablet.',
    contraindications:
      'Hypersensitivity to posaconazole or any excipient; coadministration with ergot alkaloids, CYP3A4 substrates that prolong QTc (terfenadine, astemizole, cisapride, pimozide, halofantrine, quinidine), HMG-CoA reductase inhibitors simvastatin, lovastatin, and atorvastatin, or venetoclax at initiation and ramp-up phase in CLL patients.',
    sideEffects:
      'Neutropenia, electrolyte imbalance (hypokalemia, hypomagnesemia), anorexia, paresthesia, dizziness, somnolence, headache, dysgeusia, hypertension, nausea, vomiting, diarrhea, abdominal pain, dyspepsia, dry mouth, flatulence, elevated liver function tests (ALT, AST, bilirubin, alkaline phosphatase, GGT), rash, pruritus, pyrexia, fatigue, and QTc prolongation.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine'],
    sourceTitle: 'Noxafil (posaconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/noxafil',
  },
  {
    brandName: 'Noxafil 40 mg/mL',
    brandNameAr: 'نوكسافيل 40 ملغم / مل',
    genericName: 'Posaconazole',
    drugClassNameEn: 'Broad-Spectrum Triazole Antifungals',
    dosageForm: 'Oral suspension',
    strength: '40 mg / mL',
    route: 'Oral',
    packSize: '1 bottle × 105 mL',
    indications:
      'Oropharyngeal candidiasis (first-line therapy in patients with severe disease or who are immunocompromised); prophylaxis of invasive fungal infections in high-risk AML/MDS or HSCT patients; refractory/intolerant invasive fungal infections (aspergillosis, fusariosis, chromoblastomycosis, mycetoma, coccidioidomycosis).',
    adultDosage:
      'Prophylaxis of invasive fungal infections: 200 mg (5 mL) three times daily. Refractory invasive fungal infections: 200 mg (5 mL) four times daily (or 400 mg [10 mL] twice daily in patients who can tolerate a meal or nutritional supplement). Oropharyngeal candidiasis: loading dose of 200 mg (5 mL) on Day 1, then 100 mg (2.5 mL) once daily for 13 days. Each dose must be administered during or immediately after a meal or nutritional supplement to enhance absorption.',
    contraindications:
      'Hypersensitivity to posaconazole; coadministration with ergot alkaloids, QT-prolonging CYP3A4 substrates (terfenadine, astemizole, cisapride, pimozide, halofantrine, quinidine), simvastatin, lovastatin, atorvastatin, or venetoclax during initiation/ramp-up.',
    sideEffects:
      'Nausea, vomiting, diarrhea, abdominal pain, headache, dizziness, elevated hepatic transaminases and bilirubin, hypokalemia, rash, pyrexia, and QTc prolongation.',
    storageConditions: 'Do not freeze. Discard any remaining suspension 4 weeks after first opening the bottle.',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine'],
    sourceTitle: 'Noxafil (posaconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/noxafil',
  },
  {
    brandName: 'Noxafil 300 mg',
    brandNameAr: 'نوكسافيل 300 ملغم',
    genericName: 'Posaconazole',
    drugClassNameEn: 'Broad-Spectrum Triazole Antifungals',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '300 mg / 16.7 mL (18 mg / mL)',
    route: 'Intravenous',
    packSize: '1 vial × 16.7 mL (300 mg)',
    indications:
      'Prophylaxis of invasive fungal infections in high-risk AML/MDS and HSCT patients, primary treatment of invasive aspergillosis, and refractory/intolerant invasive fungal infections when oral administration is not feasible.',
    adultDosage:
      'Loading dose of 300 mg twice daily on Day 1, then 300 mg once daily thereafter, infused via a central venous line (including central venous catheter or PICC) over approximately 90 minutes through an in-line 0.22 micron filter.',
    contraindications:
      'Hypersensitivity to posaconazole; coadministration with ergot alkaloids, QT-prolonging CYP3A4 substrates, simvastatin/lovastatin/atorvastatin, or venetoclax at initiation/ramp-up.',
    sideEffects:
      'Elevated liver enzymes, nausea, diarrhea, hypokalemia, pyrexia, headache, rash, catheter/infusion site phlebitis, and QTc prolongation.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C).',
    specialties: ['Hematology', 'Oncology', 'Internal Medicine'],
    sourceTitle: 'Noxafil (posaconazole) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/noxafil',
  },
  {
    brandName: 'Prevymis 240 mg',
    brandNameAr: 'بريفيمايس 240 ملغم',
    genericName: 'Letermovir',
    drugClassNameEn: 'CMV DNA Terminase Complex Antiviral Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '240 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Prophylaxis of cytomegalovirus (CMV) reactivation and disease in adult and pediatric patients weighing at least 15 kg who are CMV-seropositive recipients [R+] of an allogeneic hematopoietic stem cell transplant (HSCT); prophylaxis of CMV disease in adult and pediatric patients weighing at least 40 kg who are CMV-seronegative recipients of a kidney transplant from a CMV-seropositive donor [D+/R-].',
    adultDosage:
      'Recommended adult dose is 480 mg once daily; MUST be reduced to 240 mg once daily when coadministered with ciclosporin A. Start on the day of transplant and no later than Day 28 post-HSCT (continue through Day 100 or Day 200 post-HSCT) or within Day 7 post-kidney transplant (continue through Day 200). Swallow whole with or without food.',
    contraindications:
      'Hypersensitivity to letermovir or any excipient; concomitant administration with pimozide or ergot alkaloids; concomitant administration with St John’s Wort; when letermovir is combined with ciclosporin, concomitant use of dabigatran, atorvastatin, simvastatin, rosuvastatin, or pitavastatin is contraindicated.',
    sideEffects:
      'Nausea, diarrhea, vomiting, peripheral edema, cough, headache, fatigue, abdominal pain, decreased appetite, and tachycardia.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Prevymis (letermovir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/prevymis',
  },
  {
    brandName: 'Prevymis 480 mg',
    brandNameAr: 'بريفيمايس 480 ملغم',
    genericName: 'Letermovir',
    drugClassNameEn: 'CMV DNA Terminase Complex Antiviral Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '480 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Standard once-daily CMV prophylaxis in CMV-seropositive allogeneic HSCT recipients [R+] and high-risk kidney transplant recipients [D+/R-] not receiving concomitant ciclosporin.',
    adultDosage:
      'One 480 mg film-coated tablet once daily with or without food (reduce to 240 mg once daily if ciclosporin is co-administered).',
    contraindications:
      'Hypersensitivity to letermovir; concomitant pimozide, ergot alkaloids, or St John’s Wort; concomitant dabigatran or statins (atorvastatin, simvastatin, rosuvastatin, pitavastatin) when combined with ciclosporin.',
    sideEffects:
      'Nausea, diarrhea, vomiting, peripheral edema, headache, fatigue, cough, and abdominal pain.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Prevymis (letermovir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/prevymis',
  },
  {
    brandName: 'Isentress 400 mg',
    brandNameAr: 'إيزنتريس 400 ملغم',
    genericName: 'Raltegravir',
    drugClassNameEn: 'HIV Integrase Strand Transfer Inhibitors (INSTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '400 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (bottle)',
    indications:
      'In combination with other anti-retroviral medicinal products for the treatment of Human Immunodeficiency Virus (HIV-1) infection in adults, adolescents, children, toddlers, and infants from birth.',
    adultDosage:
      'One 400 mg tablet administered orally twice daily with or without food. Do not chew, crush, or split the tablets.',
    contraindications:
      'Hypersensitivity to raltegravir or to any of the excipients.',
    sideEffects:
      'Decreased appetite, abnormal dreams, insomnia, nightmare, abnormal behavior, depression, dizziness, headache, psychomotor hyperactivity, vertigo, abdominal distension, abdominal pain, diarrhea, flatulence, nausea, vomiting, dyspepsia, rash, asthenia, fatigue, pyrexia, elevated ALT, AST, triglycerides, and creatine phosphokinase (myopathy/rhabdomyolysis).',
    storageConditions: 'This medicinal product does not require any special storage conditions. Keep the bottle tightly closed with desiccant to protect from moisture.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Isentress (raltegravir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/isentress',
  },
  {
    brandName: 'Isentress 600 mg',
    brandNameAr: 'إيزنتريس 600 ملغم',
    genericName: 'Raltegravir',
    drugClassNameEn: 'HIV Integrase Strand Transfer Inhibitors (INSTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '600 mg',
    route: 'Oral',
    packSize: '60 film-coated tablets (bottle)',
    indications:
      'Once-daily regimen (1200 mg once daily) in combination with other antiretroviral medicinal products for the treatment of HIV-1 infection in adults and pediatric patients weighing at least 40 kg who are treatment-naive or virally suppressed on an initial regimen of raltegravir 400 mg twice daily.',
    adultDosage:
      '1200 mg (two 600 mg film-coated tablets) taken orally once daily with or without food.',
    contraindications:
      'Hypersensitivity to raltegravir or any excipient.',
    sideEffects:
      'Headache, insomnia, abnormal dreams, depression, dizziness, nausea, diarrhea, abdominal pain, fatigue, rash, and elevated hepatic enzymes or CPK.',
    storageConditions: 'Keep the bottle tightly closed with the desiccant in order to protect from moisture.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Isentress (raltegravir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/isentress',
  },
  {
    brandName: 'Pifeltro 100 mg',
    brandNameAr: 'بيفيلترو 100 ملغم',
    genericName: 'Doravirine',
    drugClassNameEn: 'Non-Nucleoside Reverse Transcriptase Inhibitors (NNRTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (bottle)',
    indications:
      'In combination with other antiretroviral medicinal products for the treatment of adults, and adolescents aged 12 years and older weighing at least 35 kg, infected with HIV-1 without past or present evidence of resistance to the NNRTI class.',
    adultDosage:
      'One 100 mg tablet taken orally once daily with or without food (increase to 100 mg twice daily approximately 12 hours apart if coadministered with moderate CYP3A inducers such as rifabutin or dabrafenib).',
    contraindications:
      'Hypersensitivity to doravirine or any excipient; coadministration with strong cytochrome P450 CYP3A enzyme inducers (carbamazepine, oxcarbazepine, phenobarbital, phenytoin, rifampicin, rifapentine, St John’s Wort, mitotane, enzalutamide, lumacaftor).',
    sideEffects:
      'Abnormal dreams, insomnia, nightmare, depression, headache, dizziness, somnolence, nausea, diarrhea, flatulence, abdominal pain, vomiting, rash, fatigue, and increased ALT.',
    storageConditions: 'Store in the original bottle and keep the bottle tightly closed in order to protect from moisture. Do not remove the desiccant.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Pifeltro (doravirine) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/pifeltro',
  },
  {
    brandName: 'Delstrigo 100 mg/300 mg/245 mg',
    brandNameAr: 'ديلستريغو 100 ملغم / 300 ملغم / 245 ملغم',
    genericName: 'Doravirine + Lamivudine + Tenofovir',
    drugClassNameEn: 'Single-Tablet HIV Antiretroviral Combinations (NNRTI + 2 NRTIs)',
    dosageForm: 'Film-coated tablet',
    strength: '100 mg / 300 mg / 245 mg',
    route: 'Oral',
    packSize: '30 film-coated tablets (bottle)',
    indications:
      'Treatment of adults, and adolescents aged 12 years and older weighing at least 35 kg, infected with HIV-1 without past or present evidence of resistance to the NNRTI class, lamivudine, or tenofovir.',
    adultDosage:
      'One 100 mg/300 mg/245 mg tablet taken orally once daily with or without food (not recommended if estimated creatinine clearance is <50 mL/min).',
    contraindications:
      'Hypersensitivity to doravirine, lamivudine, tenofovir, or any excipient; coadministration with strong CYP3A enzyme inducers (carbamazepine, oxcarbazepine, phenobarbital, phenytoin, rifampicin, rifapentine, St John’s Wort, mitotane, enzalutamide, lumacaftor).',
    sideEffects:
      'Abnormal dreams, insomnia, headache, dizziness, somnolence, nausea, diarrhea, abdominal pain, vomiting, rash, fatigue, hypophosphatemia, elevated serum creatinine/renal tubular effects, and post-treatment exacerbation of hepatitis B upon discontinuation.',
    storageConditions: 'Store in the original bottle tightly closed with desiccant to protect from moisture.',
    specialties: ['Internal Medicine'],
    sourceTitle: 'Delstrigo (doravirine / lamivudine / tenofovir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/delstrigo',
  },
  {
    brandName: 'Zepatier 50 mg/100 mg',
    brandNameAr: 'زيباتير 50 ملغم / 100 ملغم',
    genericName: 'Elbasvir + Grazoprevir',
    drugClassNameEn: 'Direct-Acting Antivirals for Hepatitis C (NS5A Inhibitor + NS3/4A Protease Inhibitor)',
    dosageForm: 'Film-coated tablet',
    strength: '50 mg / 100 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Treatment of chronic hepatitis C (CHC) genotype 1a, 1b, or 4 infection in adult and pediatric patients aged 12 years and older weighing at least 30 kg.',
    adultDosage:
      'One tablet (50 mg elbasvir / 100 mg grazoprevir) once daily with or without food for 12 weeks (or 16 weeks in combination with ribavirin in select genotype 1a or genotype 4 patients with baseline high viral load or NS5A polymorphisms). No dose adjustment required in renal impairment including hemodialysis.',
    contraindications:
      'Hypersensitivity to the active substances or any excipient; patients with moderate or severe hepatic impairment (Child-Pugh B or C); coadministration with organic anion transporting polypeptide 1B (OATP1B) inhibitors (rifampicin, atazanavir, darunavir, lopinavir, saquinavir, tipranavir, cobicistat, ciclosporin) or strong/moderate CYP3A inducers (efavirenz, phenytoin, carbamazepine, bosentan, etravirine, modafinil, St John’s Wort).',
    sideEffects:
      'Fatigue, headache, nausea, insomnia, anxiety, depression, dizziness, diarrhea, constipation, upper abdominal pain, dyspepsia, dry mouth, vomiting, pruritus, alopecia, arthralgia, myalgia, asthenia, irritability, and late ALT elevations.',
    storageConditions: 'Store in the original package until use in order to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Zepatier (elbasvir / grazoprevir) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zepatier',
  },

  // =========================================================================
  // 3. ANESTHESIA, CARDIOVASCULAR & PULMONARY HYPERTENSION (6 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Bridion 200 mg/2 mL',
    brandNameAr: 'بريديون 200 ملغم / 2 مل',
    genericName: 'Sugammadex',
    drugClassNameEn: 'Selective Relaxant Binding Agents (Neuromuscular Blockade Reversal)',
    dosageForm: 'Solution for injection',
    strength: '100 mg / mL (200 mg / 2 mL)',
    route: 'Intravenous',
    packSize: '10 vials × 2 mL (200 mg)',
    indications:
      'Reversal of neuromuscular blockade induced by rocuronium or vecuronium in adults, and routine reversal of rocuronium-induced blockade in children and adolescents aged 2 to 17 years.',
    adultDosage:
      'Routine reversal: 4 mg/kg if recovery has reached at least 1–2 post-tetanic counts (PTC); 2 mg/kg if spontaneous recovery has occurred up to at least the reappearance of T2. Immediate reversal of rocuronium-induced blockade: 16 mg/kg administered 3 minutes after a bolus dose of 1.2 mg/kg rocuronium. Administer rapidly as a single intravenous bolus injection within 10 seconds into an existing IV line.',
    contraindications:
      'Hypersensitivity to sugammadex or to any of the excipients.',
    sideEffects:
      'Cough, airway complication of anesthesia, anesthetic complication (movement, grimacing, or suckling on the endotracheal tube during emergence), procedural hypotension, procedural complication, bradycardia, nausea, vomiting, and rare drug hypersensitivity/anaphylaxis.',
    storageConditions: 'Store below 30°C. Do not freeze. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Anesthesiology', 'General Surgery', 'Emergency Medicine'],
    sourceTitle: 'Bridion (sugammadex) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/bridion',
  },
  {
    brandName: 'Bridion 500 mg/5 mL',
    brandNameAr: 'بريديون 500 ملغم / 5 مل',
    genericName: 'Sugammadex',
    drugClassNameEn: 'Selective Relaxant Binding Agents (Neuromuscular Blockade Reversal)',
    dosageForm: 'Solution for injection',
    strength: '100 mg / mL (500 mg / 5 mL)',
    route: 'Intravenous',
    packSize: '10 vials × 5 mL (500 mg)',
    indications:
      'Routine and immediate reversal of neuromuscular blockade induced by rocuronium or vecuronium in adults.',
    adultDosage:
      '2 mg/kg (at reappearance of T2), 4 mg/kg (at 1–2 PTCs), or 16 mg/kg (for immediate reversal of rocuronium blockade), given as a single rapid intravenous bolus over 10 seconds.',
    contraindications:
      'Hypersensitivity to sugammadex or any excipient.',
    sideEffects:
      'Cough, airway/anesthetic emergence complications, procedural hypotension, bradycardia, and rare anaphylaxis or severe bradycardia.',
    storageConditions: 'Store below 30°C. Do not freeze. Protect from light.',
    specialties: ['Anesthesiology', 'General Surgery', 'Emergency Medicine'],
    sourceTitle: 'Bridion (sugammadex) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/bridion',
  },
  {
    brandName: 'Verquvo 2.5 mg',
    brandNameAr: 'فيركوفو 2.5 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '2.5 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets (blister pack)',
    indications:
      'Treatment of symptomatic chronic heart failure in adult patients with reduced ejection fraction who are stabilised after a recent decompensation event requiring intravenous therapy.',
    adultDosage:
      'Recommended starting dose is 2.5 mg vericiguat once daily, taken with food. Double the dose approximately every 2 weeks (2.5 mg → 5 mg → 10 mg once daily) to reach the target maintenance dose of 10 mg once daily, as tolerated by the patient.',
    contraindications:
      'Hypersensitivity to vericiguat or any excipient; concomitant use of other soluble guanylate cyclase (sGC) stimulators, such as riociguat.',
    sideEffects:
      'Hypotension, anemia, dizziness, headache, nausea, dyspepsia, vomiting, gastro-esophageal reflux disease, and orthostatic hypotension.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Verquvo (vericiguat) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Verquvo 5 mg',
    brandNameAr: 'فيركوفو 5 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '5 mg',
    route: 'Oral',
    packSize: '14 film-coated tablets (blister pack)',
    indications:
      'Intermediate titration strength for symptomatic chronic heart failure with reduced ejection fraction in adults following a recent worsening heart failure event.',
    adultDosage:
      'One 5 mg tablet once daily with food (reached after 2 weeks on 2.5 mg once daily), then doubled after 2 weeks to the target maintenance dose of 10 mg once daily as tolerated.',
    contraindications:
      'Hypersensitivity to vericiguat; concomitant use of other sGC stimulators (riociguat).',
    sideEffects:
      'Hypotension, anemia, dizziness, headache, nausea, dyspepsia, and gastro-esophageal reflux disease.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Verquvo (vericiguat) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Verquvo 10 mg',
    brandNameAr: 'فيركوفو 10 ملغم',
    genericName: 'Vericiguat',
    drugClassNameEn: 'Soluble Guanylate Cyclase (sGC) Stimulators',
    dosageForm: 'Film-coated tablet',
    strength: '10 mg',
    route: 'Oral',
    packSize: '28 film-coated tablets (blister pack)',
    indications:
      'Target maintenance dose for symptomatic chronic heart failure with reduced ejection fraction in adults stabilised after a recent decompensation event.',
    adultDosage:
      'One 10 mg film-coated tablet once daily taken with food.',
    contraindications:
      'Hypersensitivity to vericiguat; concomitant use of other sGC stimulators such as riociguat.',
    sideEffects:
      'Hypotension, anemia, dizziness, headache, dyspepsia, nausea, and GERD.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Verquvo (vericiguat) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/verquvo',
  },
  {
    brandName: 'Winrevair 45 mg',
    brandNameAr: 'وينريفير 45 ملغم',
    genericName: 'Sotatercept',
    drugClassNameEn: 'Activin Signaling Inhibitors (Pulmonary Arterial Hypertension)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '45 mg',
    route: 'Subcutaneous',
    packSize: '1 vial powder (45 mg) + 1 pre-filled syringe solvent',
    indications:
      'In combination with other pulmonary arterial hypertension (PAH) therapies, for the treatment of PAH in adult patients with WHO Functional Class II to III, to improve exercise capacity.',
    adultDosage:
      'Initiate at 0.3 mg/kg by subcutaneous injection once every 3 weeks; increase to the target dose of 0.7 mg/kg once every 3 weeks after verifying acceptable hemoglobin and platelet levels prior to the second dose.',
    contraindications:
      'Hypersensitivity to sotatercept or to any of the excipients.',
    sideEffects:
      'Increased hemoglobin (erythrocytosis), thrombocytopenia, epistaxis, telangiectasia, dizziness, headache, diarrhea, increased blood pressure, and gingival bleeding.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Store in the original kit in order to protect from light.',
    specialties: ['Cardiology', 'Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Winrevair (sotatercept) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/winrevair',
  },

  // =========================================================================
  // 4. ONCOLOGY & ONCOLOGY SUPPORTIVE CARE (9 PRODUCTS)
  // =========================================================================
  {
    brandName: 'Keytruda 100 mg/4 mL',
    brandNameAr: 'كيترودا 100 ملغم / 4 مل',
    genericName: 'Pembrolizumab',
    drugClassNameEn: 'Anti-PD-1 Immune Checkpoint Inhibitor Monoclonal Antibodies',
    dosageForm: 'Concentrate for solution for infusion',
    strength: '25 mg / mL (100 mg / 4 mL)',
    route: 'Intravenous',
    packSize: '1 vial × 4 mL (100 mg)',
    indications:
      'Treatment of melanoma, non-small cell lung carcinoma (NSCLC), classical Hodgkin lymphoma, urothelial carcinoma, head and neck squamous cell carcinoma (HNSCC), renal cell carcinoma (RCC), microsatellite instability-high (MSI-H) or mismatch repair deficient (dMMR) colorectal, endometrial, gastric, small intestine, or biliary cancers, esophageal carcinoma, triple-negative breast cancer (TNBC), endometrial carcinoma, cervical cancer, gastric/GEJ adenocarcinoma, and biliary tract carcinoma.',
    adultDosage:
      'Recommended dose in adults is either 200 mg every 3 weeks or 400 mg every 6 weeks, administered as an intravenous infusion over 30 minutes.',
    contraindications:
      'Hypersensitivity to pembrolizumab or to any of the excipients.',
    sideEffects:
      'Anemia, hypothyroidism, hyperthyroidism, decreased appetite, headache, dizziness, peripheral neuropathy, dyspnea, cough, pneumonitis, diarrhea, nausea, vomiting, abdominal pain, constipation, colitis, pruritus, rash, arthralgia, myalgia, musculoskeletal pain, fatigue, asthenia, edema, pyrexia, and immune-mediated endocrinopathies, hepatitis, nephritis, myocarditis, or severe skin reactions.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C). Do not freeze. Store in the original carton in order to protect from light.',
    specialties: ['Oncology', 'Pulmonology', 'Hematology', 'Urology', 'Obstetrics and Gynecology'],
    sourceTitle: 'Keytruda (pembrolizumab) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/keytruda',
  },
  {
    brandName: 'Welireg 40 mg',
    brandNameAr: 'ويليريغ 40 ملغم',
    genericName: 'Belzutifan',
    drugClassNameEn: 'Hypoxia-Inducible Factor-2 Alpha (HIF-2α) Inhibitors',
    dosageForm: 'Film-coated tablet',
    strength: '40 mg',
    route: 'Oral',
    packSize: '90 film-coated tablets (blister pack or bottle)',
    indications:
      'Treatment of adult patients with von Hippel-Lindau (VHL) disease who require therapy for associated, localized renal cell carcinoma (RCC), central nervous system (CNS) hemangioblastomas, or pancreatic neuroendocrine tumors (pNET), and for whom localized procedures are unsuitable; and treatment of adult patients with advanced clear cell renal cell carcinoma that has progressed following two or more lines of therapy that included a PD-(L)1 inhibitor and at least two VEGF-targeted therapies.',
    adultDosage:
      '120 mg (three 40 mg film-coated tablets) administered orally once daily at the same time each day, with or without food. Swallow whole; do not chew, crush, or split.',
    contraindications:
      'Hypersensitivity to belzutifan or any excipient; pregnancy (in patients with VHL disease).',
    sideEffects:
      'Anemia, hypoxia, fatigue, nausea, constipation, vomiting, dizziness, headache, dyspnea, hemorrhage, peripheral edema, weight increased, and elevated creatinine or transaminases.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Oncology', 'Urology', 'Neurology'],
    sourceTitle: 'Welireg (belzutifan) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/welireg',
  },
  {
    brandName: 'Temodal 20 mg',
    brandNameAr: 'تيمودال 20 ملغم',
    genericName: 'Temozolomide',
    drugClassNameEn: 'Imidazotetrazine Alkylating Antineoplastic Agents',
    dosageForm: 'Hard capsule',
    strength: '20 mg',
    route: 'Oral',
    packSize: '5 hard capsules (bottle or sachet)',
    indications:
      'Treatment of adult patients with newly-diagnosed glioblastoma multiforme concomitantly with radiotherapy (RT) and subsequently as monotherapy treatment; and pediatric patients from the age of three years, adolescents, and adult patients with malignant glioma, such as glioblastoma multiforme or anaplastic astrocytoma, showing recurrence or progression after standard therapy.',
    adultDosage:
      'Newly-diagnosed glioblastoma concomitant phase: 75 mg/m² daily for 42 days (up to 49 days) with focal radiotherapy (40–49 Gy), followed 4 weeks later by up to 6 cycles of monotherapy (Cycle 1: 150 mg/m² once daily for 5 days of a 28-day cycle; Cycles 2–6: escalated to 200 mg/m² for 5 days if no hematologic toxicity). Administer on an empty stomach at least one hour before a meal; swallow whole with a glass of water.',
    contraindications:
      'Hypersensitivity to temozolomide, dacarbazine (DTIC), or any excipient; severe myelosuppression.',
    sideEffects:
      'Anorexia, nausea, vomiting, constipation, diarrhea, alopecia, headache, fatigue, convulsions, rash, neutropenia, thrombocytopenia, lymphopenia, leukopenia, opportunistic infections (including Pneumocystis jirovecii pneumonia during concomitant RT), and hepatotoxicity.',
    storageConditions: 'Do not store above 30°C. Store in the original bottle or sachet to protect from moisture.',
    specialties: ['Oncology', 'Neurology'],
    sourceTitle: 'Temodal (temozolomide) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/temodal',
  },
  {
    brandName: 'Temodal 100 mg',
    brandNameAr: 'تيمودال 100 ملغم',
    genericName: 'Temozolomide',
    drugClassNameEn: 'Imidazotetrazine Alkylating Antineoplastic Agents',
    dosageForm: 'Hard capsule',
    strength: '100 mg',
    route: 'Oral',
    packSize: '5 hard capsules (bottle or sachet)',
    indications:
      'Newly-diagnosed glioblastoma multiforme (concomitant with radiotherapy and subsequent adjuvant monotherapy) and recurrent or progressive malignant glioma (glioblastoma multiforme or anaplastic astrocytoma).',
    adultDosage:
      'Concomitant phase: 75 mg/m² daily for 42 days. Monotherapy/adjuvant phase: 150 to 200 mg/m² once daily on Days 1 to 5 of each 28-day cycle, taken on an empty stomach.',
    contraindications:
      'Hypersensitivity to temozolomide or dacarbazine (DTIC); severe myelosuppression.',
    sideEffects:
      'Nausea, vomiting, constipation, anorexia, fatigue, alopecia, headache, thrombocytopenia, neutropenia, lymphopenia, and elevated hepatic enzymes.',
    storageConditions: 'Do not store above 30°C. Keep tightly closed to protect from moisture.',
    specialties: ['Oncology', 'Neurology'],
    sourceTitle: 'Temodal (temozolomide) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/temodal',
  },
  {
    brandName: 'Temodal 250 mg',
    brandNameAr: 'تيمودال 250 ملغم',
    genericName: 'Temozolomide',
    drugClassNameEn: 'Imidazotetrazine Alkylating Antineoplastic Agents',
    dosageForm: 'Hard capsule',
    strength: '250 mg',
    route: 'Oral',
    packSize: '5 hard capsules (bottle or sachet)',
    indications:
      'High-strength capsule for 5-day adjuvant and recurrent monotherapy cycles in glioblastoma multiforme and anaplastic astrocytoma.',
    adultDosage:
      '150 to 200 mg/m² once daily for 5 consecutive days per 28-day cycle, swallowed whole on an empty stomach with a full glass of water.',
    contraindications:
      'Hypersensitivity to temozolomide or dacarbazine; severe myelosuppression.',
    sideEffects:
      'Myelosuppression (thrombocytopenia, neutropenia, anemia), nausea, vomiting, fatigue, constipation, headache, alopecia, and hepatotoxicity.',
    storageConditions: 'Do not store above 30°C. Protect from moisture.',
    specialties: ['Oncology', 'Neurology'],
    sourceTitle: 'Temodal (temozolomide) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/temodal',
  },
  {
    brandName: 'Emend 125 mg + 80 mg',
    brandNameAr: 'إيمند 125 ملغم + 80 ملغم',
    genericName: 'Aprepitant',
    drugClassNameEn: 'Neurokinin-1 (NK1) Receptor Antagonist Antiemetics',
    dosageForm: 'Hard capsule',
    strength: '125 mg (Day 1) + 80 mg (Days 2–3)',
    route: 'Oral',
    packSize: '1 capsule × 125 mg + 2 capsules × 80 mg (3-day combi-pack)',
    indications:
      'Prevention of acute and delayed nausea and vomiting associated with highly emetogenic cisplatin-based cancer chemotherapy and moderately emetogenic cancer chemotherapy in adults and adolescents from the age of 12 years, as part of a combination antiemetic regimen.',
    adultDosage:
      'Given for 3 days as part of a regimen including a corticosteroid and a 5-HT3 antagonist: 125 mg orally once daily one hour before chemotherapy start on Day 1, and 80 mg orally once daily in the morning on Days 2 and 3. Swallow whole with or without food.',
    contraindications:
      'Hypersensitivity to aprepitant or any excipient; coadministration with pimozide, terfenadine, astemizole, or cisapride.',
    sideEffects:
      'Hiccups, decreased appetite, headache, constipation, dyspepsia, eructation, diarrhea, fatigue, asthenia, and increased ALT and AST.',
    storageConditions: 'Store in the original package in order to protect from moisture.',
    specialties: ['Oncology', 'Hematology'],
    sourceTitle: 'Emend (aprepitant) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/emend',
  },
  {
    brandName: 'Ivemend 150 mg',
    brandNameAr: 'إيفيمند 150 ملغم',
    genericName: 'Fosaprepitant',
    drugClassNameEn: 'Parenteral Neurokinin-1 (NK1) Receptor Antagonist Antiemetics',
    dosageForm: 'Powder for solution for infusion',
    strength: '150 mg',
    route: 'Intravenous',
    packSize: '1 vial × 150 mg',
    indications:
      'Prevention of acute and delayed nausea and vomiting associated with highly emetogenic cisplatin-based cancer chemotherapy and moderately emetogenic cancer chemotherapy in adults and pediatric patients aged 6 months and older, as part of a combination antiemetic regimen.',
    adultDosage:
      'Adults: single 150 mg dose administered on Day 1 only as an intravenous infusion over 20–30 minutes, initiated approximately 30 minutes prior to chemotherapy, in combination with a corticosteroid and a 5-HT3 antagonist.',
    contraindications:
      'Hypersensitivity to fosaprepitant, aprepitant, polysorbate 80, or any excipient; coadministration with pimozide, terfenadine, astemizole, or cisapride.',
    sideEffects:
      'Hiccups, decreased appetite, headache, constipation, dyspepsia, fatigue, elevated ALT/AST, infusion site pain/erythema/pruritus/induration/thrombophlebitis, and immediate hypersensitivity reactions.',
    storageConditions: 'Store in a refrigerator (2°C to 8°C).',
    specialties: ['Oncology', 'Hematology'],
    sourceTitle: 'Ivemend (fosaprepitant) — EMA Official EPAR & SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ivemend',
  },
];

export const MSD_PRODUCTS: AiProductDraft[] = MSD_COMPACT_PRODUCTS.map(toMsdProductDraft);
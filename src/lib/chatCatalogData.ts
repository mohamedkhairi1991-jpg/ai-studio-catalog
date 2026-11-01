import type { SupabaseClient } from '@supabase/supabase-js';
import {
  rpcAdminCreateCompany,
  rpcAdminSaveAiProductDraft,
  type AiDraftSource,
  type AiProductDraft,
  type CatalogBundle,
} from './catalog';
import { SANOFI_PRODUCTS } from './sanofiCatalogData';

export interface CuratedCompanyEntry {
  key: string;
  companyName: string;
  legalName: string;
  websiteUrl: string;
  description: string;
  products: AiProductDraft[];
}

const AZ_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactAzDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
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
}

function toAiProductDraft(item: CompactAzDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.activeIngredients,
    drugClass: item.drugClass,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: item.approvedIndications,
      usualAdultDose: item.usualAdultDose,
      contraindications: item.contraindications,
      commonAdverseEffects: item.commonAdverseEffects,
      storageConditions: item.storageConditions,
    },
    specialties: item.specialties,
    sources: AZ_SRC(item.sourceTitle, item.sourceUrl),
    notes: 'Official AstraZeneca product presentation marketed in Iraq.',
  };
}

const ASTRAZENECA_COMPACT_PRODUCTS: CompactAzDrug[] = [
  // ============================================================================
  // 1. GASTROENTEROLOGY — Proton Pump Inhibitors (PPIs)
  // ============================================================================
  {
    brandName: 'Nexium 20 mg',
    brandNameAr: 'نيكسيوم ٢٠ ملغ',
    genericName: 'Esomeprazole magnesium trihydrate',
    activeIngredients: ['Esomeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: '28 gastro-resistant tablets (2 blisters x 14)',
    approvedIndications:
      'Gastroesophageal reflux disease (GERD): maintenance of healing of erosive reflux esophagitis and symptomatic treatment of GERD. Eradication of Helicobacter pylori in combination with appropriate antibacterial regimens and healing of H. pylori-associated duodenal ulcer. Prevention and healing of NSAID-associated gastric and duodenal ulcers in patients at risk.',
    usualAdultDose:
      'Symptomatic GERD or maintenance of healed esophagitis: 20 mg once daily. H. pylori eradication: 20 mg twice daily for 7 days with amoxicillin 1000 mg and clarithromycin 500 mg twice daily. NSAID ulcer prophylaxis/healing: 20 mg once daily. Swallow whole with liquid; do not chew or crush.',
    contraindications:
      'Hypersensitivity to esomeprazole, substituted benzimidazoles, or any excipient. Concomitant administration with nelfinavir.',
    commonAdverseEffects:
      'Headache, abdominal pain, constipation, diarrhea, flatulence, nausea, vomiting, and benign fundic gland polyps.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Nexium (esomeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/nexium',
  },
  {
    brandName: 'Nexium 40 mg',
    brandNameAr: 'نيكسيوم ٤٠ ملغ',
    genericName: 'Esomeprazole magnesium trihydrate',
    activeIngredients: ['Esomeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: '28 gastro-resistant tablets (2 blisters x 14)',
    approvedIndications:
      'Treatment of erosive reflux esophagitis. Prolonged management after intravenous-induced prevention of rebleeding of peptic ulcers. Treatment of Zollinger-Ellison syndrome and pathological hypersecretory conditions.',
    usualAdultDose:
      'Erosive reflux esophagitis: 40 mg once daily for 4 weeks (extend by 4 weeks if not fully healed). Zollinger-Ellison syndrome: starting dose 40 mg twice daily, adjusted individually. Swallow whole with water.',
    contraindications:
      'Known hypersensitivity to esomeprazole, substituted benzimidazoles, or any excipient. Concomitant use with nelfinavir.',
    commonAdverseEffects:
      'Headache, abdominal pain, diarrhea, flatulence, nausea/vomiting, constipation, and benign fundic gland polyps.',
    storageConditions:
      'Store below 30°C in the original blister pack to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Nexium (esomeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/nexium',
  },
  {
    brandName: 'Nexium 10 mg Sachets',
    brandNameAr: 'أكياس نيكسيوم ١٠ ملغ حبيبات للمعلق الفموي',
    genericName: 'Esomeprazole magnesium trihydrate',
    activeIngredients: ['Esomeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '10 mg',
    dosageForm: 'Gastro-resistant granules for oral suspension in sachet',
    route: 'Oral',
    packSize: '28 sachets',
    approvedIndications:
      'Treatment of gastroesophageal reflux disease (GERD) and erosive reflux esophagitis in pediatric patients aged 1 to 11 years and in adults or adolescents with difficulty swallowing gastro-resistant tablets.',
    usualAdultDose:
      'Pediatric (1–11 years, weight ≥10 kg): 10 mg or 20 mg once daily for up to 8 weeks. Adults/adolescents: reconstitute required dose (10 mg–40 mg) in 15 mL non-carbonated water per sachet, stir until granules disperse, leave a few minutes to thicken, and drink within 30 minutes without chewing granules.',
    contraindications:
      'Hypersensitivity to esomeprazole, substituted benzimidazoles, or any excipient. Concomitant use with nelfinavir.',
    commonAdverseEffects:
      'Headache, abdominal pain, diarrhea, flatulence, nausea, vomiting, and constipation.',
    storageConditions: 'Store below 30°C in the original sealed sachet.',
    specialties: ['Pediatrics', 'Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Nexium (esomeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/nexium',
  },
  {
    brandName: 'Nexium IV 40 mg',
    brandNameAr: 'نيكسيوم ٤٠ ملغ فيال للزرق الوريدي',
    genericName: 'Esomeprazole sodium',
    activeIngredients: ['Esomeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Powder for solution for injection/infusion',
    route: 'Intravenous',
    packSize: '10 vials x 40 mg',
    approvedIndications:
      'Gastric antisecretory therapy when the oral route is not possible (GERD with esophagitis/severe reflux, NSAID-associated gastric ulcers). Short-term maintenance of hemostasis and prevention of rebleeding following therapeutic endoscopy for acute bleeding gastric or duodenal ulcers.',
    usualAdultDose:
      'Antisecretory therapy when oral route is not possible: 20 mg or 40 mg once daily via IV injection (over ≥3 min) or IV infusion (10–30 min). Peptic ulcer rebleeding prophylaxis: 80 mg IV bolus infusion over 30 min followed by continuous IV infusion of 8 mg/h for 72 hours.',
    contraindications:
      'Hypersensitivity to esomeprazole, substituted benzimidazoles, or any excipient. Concomitant administration with nelfinavir.',
    commonAdverseEffects:
      'Headache, abdominal pain, diarrhea, flatulence, nausea, vomiting, constipation, and injection/infusion site reactions.',
    storageConditions:
      'Store below 30°C. Keep the vial in the outer carton to protect from light.',
    specialties: [
      'Gastroenterology',
      'Internal Medicine',
      'Emergency Medicine',
      'General Surgery',
    ],
    sourceTitle: 'Nexium (esomeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/nexium',
  },
  {
    brandName: 'Losec MUPS 20 mg',
    brandNameAr: 'لوسيك مابس ٢٠ ملغ',
    genericName: 'Omeprazole magnesium',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet (MUPS)',
    route: 'Oral',
    packSize: '14 gastro-resistant tablets',
    approvedIndications:
      'Treatment and relapse prevention of duodenal and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease with antibiotics; NSAID-associated ulcer prophylaxis and treatment; reflux esophagitis and symptomatic GERD; Zollinger-Ellison syndrome.',
    usualAdultDose:
      'Duodenal ulcer / symptomatic GERD: 20 mg once daily for 2–4 weeks. Gastric ulcer / reflux esophagitis: 20 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily with dual antibiotics for 7 days. Swallow whole with water in the morning.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or any excipient. Concomitant use with nelfinavir.',
    commonAdverseEffects:
      'Headache, abdominal pain, constipation, diarrhea, flatulence, nausea/vomiting, and benign fundic gland polyps.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
    sourceTitle: 'Losec (omeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/losec',
  },
  {
    brandName: 'Losec MUPS 40 mg',
    brandNameAr: 'لوسيك مابس ٤٠ ملغ',
    genericName: 'Omeprazole magnesium',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet (MUPS)',
    route: 'Oral',
    packSize: '14 gastro-resistant tablets',
    approvedIndications:
      'Severe or refractory reflux esophagitis and benign gastric or duodenal ulcers poorly responsive to standard 20 mg therapy; pathological hypersecretory conditions including Zollinger-Ellison syndrome.',
    usualAdultDose:
      'Refractory peptic ulcer or severe reflux esophagitis: 40 mg once daily for 4–8 weeks. Zollinger-Ellison syndrome: recommended initial dose 60 mg daily, adjusted individually (doses >80 mg/day divided twice daily).',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or any excipient. Concomitant administration with nelfinavir.',
    commonAdverseEffects:
      'Headache, diarrhea, constipation, abdominal pain, nausea, flatulence, and benign fundic gland polyps.',
    storageConditions:
      'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Losec (omeprazole) — EMA Official SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/losec',
  },

  // ============================================================================
  // 2. CARDIOVASCULAR — Lipid-Lowering Agents (Statins)
  // ============================================================================
  {
    brandName: 'Crestor 5 mg',
    brandNameAr: 'كريستور ٥ ملغ',
    genericName: 'Rosuvastatin calcium',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA Reductase Inhibitors (Statins)',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Primary hypercholesterolemia (type IIa including heterozygous familial hypercholesterolemia) or mixed dyslipidemia (type IIb) as an adjunct to diet; prevention of major cardiovascular events in high-risk patients; starting dose for patients predisposed to myopathy or of Asian ancestry.',
    usualAdultDose:
      '5 mg orally once daily at any time of day, with or without food; may be adjusted to 10 mg daily after 4 weeks if required.',
    contraindications:
      'Hypersensitivity to rosuvastatin; active liver disease or unexplained persistent transaminase elevations; severe renal impairment (CrCl < 30 mL/min); myopathy; concomitant ciclosporin; pregnancy and lactation.',
    commonAdverseEffects:
      'Headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia, and elevated HbA1c/fasting glucose.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Crestor (rosuvastatin calcium) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021366s042lbl.pdf',
  },
  {
    brandName: 'Crestor 10 mg',
    brandNameAr: 'كريستور ١٠ ملغ',
    genericName: 'Rosuvastatin calcium',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA Reductase Inhibitors (Statins)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Primary hypercholesterolemia (type IIa including heterozygous familial hypercholesterolemia), mixed dyslipidemia (type IIb), homozygous familial hypercholesterolemia, and primary/secondary prevention of major cardiovascular events.',
    usualAdultDose:
      'Recommended start dose is 5 mg or 10 mg orally once daily with or without food; may be titrated after 4 weeks if necessary.',
    contraindications:
      'Hypersensitivity to rosuvastatin; active liver disease; severe renal impairment (CrCl < 30 mL/min); myopathy; concomitant ciclosporin; pregnancy and lactation.',
    commonAdverseEffects:
      'Headache, dizziness, constipation, nausea, abdominal pain, myalgia, asthenia, and new-onset diabetes mellitus in predisposed patients.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Crestor (rosuvastatin calcium) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021366s042lbl.pdf',
  },
  {
    brandName: 'Crestor 20 mg',
    brandNameAr: 'كريستور ٢٠ ملغ',
    genericName: 'Rosuvastatin calcium',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA Reductase Inhibitors (Statins)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'High-intensity lipid-lowering therapy for primary hypercholesterolemia, mixed dyslipidemia, homozygous familial hypercholesterolemia, and atherosclerotic cardiovascular disease (ASCVD) risk reduction.',
    usualAdultDose:
      '20 mg orally once daily at any time of day, with or without food.',
    contraindications:
      'Hypersensitivity to rosuvastatin; active liver disease; severe renal impairment (CrCl < 30 mL/min); myopathy; concomitant ciclosporin; pregnancy and lactation.',
    commonAdverseEffects:
      'Myalgia, headache, dizziness, constipation, nausea, abdominal pain, asthenia, and elevated hepatic transaminases or CK.',
    storageConditions:
      'Store below 30°C in the original blister pack to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Crestor (rosuvastatin calcium) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021366s042lbl.pdf',
  },
  {
    brandName: 'Crestor 40 mg',
    brandNameAr: 'كريستور ٤٠ ملغ',
    genericName: 'Rosuvastatin calcium',
    activeIngredients: ['Rosuvastatin'],
    drugClass: 'HMG-CoA Reductase Inhibitors (Statins)',
    strength: '40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Severe hypercholesterolemia (including homozygous and heterozygous familial hypercholesterolemia) in high-cardiovascular-risk patients who do not achieve LDL-C goals on 20 mg daily.',
    usualAdultDose:
      '40 mg orally once daily under specialist supervision in patients not reaching treatment goals on 20 mg daily and without predisposing factors for myopathy.',
    contraindications:
      'Active liver disease; moderate-to-severe renal impairment (CrCl < 60 mL/min for the 40 mg dose); hypothyroidism; personal/family history of hereditary muscular disorders; concomitant fibrates or ciclosporin; Asian ancestry; pregnancy and lactation.',
    commonAdverseEffects:
      'Myalgia, arthralgia, proteinuria/hematuria (usually tubular and transient), headache, dizziness, gastrointestinal discomfort, and elevated transaminases or CK.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Crestor (rosuvastatin calcium) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021366s042lbl.pdf',
  },

  // ============================================================================
  // 3. DIABETES, HEART FAILURE & CKD — SGLT2 & DPP-4 Inhibitors
  // ============================================================================
  {
    brandName: 'Forxiga 5 mg',
    brandNameAr: 'فورسيجا ٥ ملغ',
    genericName: 'Dapagliflozin propanediol monohydrate',
    activeIngredients: ['Dapagliflozin'],
    drugClass: 'SGLT2 Inhibitors',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Type 2 diabetes mellitus in adults and children aged 10 years and above as an adjunct to diet and exercise; starting dose for patients with severe hepatic impairment.',
    usualAdultDose:
      '5 mg orally once daily with or without food (starting dose in severe hepatic impairment, increased to 10 mg if well tolerated).',
    contraindications:
      'Hypersensitivity to dapagliflozin or any excipient.',
    commonAdverseEffects:
      'Genital mycotic infections (vulvovaginitis, balanitis), urinary tract infection, polyuria, dysuria, dizziness, and back pain.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology', 'Nephrology'],
    sourceTitle: 'Forxiga (dapagliflozin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
  },
  {
    brandName: 'Forxiga 10 mg',
    brandNameAr: 'فورسيجا ١٠ ملغ',
    genericName: 'Dapagliflozin propanediol monohydrate',
    activeIngredients: ['Dapagliflozin'],
    drugClass: 'SGLT2 Inhibitors',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 blisters x 14)',
    approvedIndications:
      'Type 2 diabetes mellitus as an adjunct to diet and exercise; symptomatic chronic heart failure across the full spectrum of ejection fraction (HFrEF, HFmrEF, HFpEF); chronic kidney disease (CKD) in adults.',
    usualAdultDose:
      '10 mg orally once daily at any time of day, with or without food, for type 2 diabetes, heart failure, and chronic kidney disease.',
    contraindications:
      'Hypersensitivity to dapagliflozin or any excipient.',
    commonAdverseEffects:
      'Vulvovaginitis, balanitis and related genital infections, urinary tract infection, dizziness, back pain, dysuria, polyuria, and hypoglycemia (when combined with sulfonylurea or insulin).',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Cardiology', 'Nephrology', 'Internal Medicine'],
    sourceTitle: 'Forxiga (dapagliflozin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
  },
  {
    brandName: 'Xigduo XR 5 mg / 1000 mg',
    brandNameAr: 'زيجدو إكس آر ٥ / ١٠٠٠ ملغ',
    genericName: 'Dapagliflozin + Metformin hydrochloride',
    activeIngredients: ['Dapagliflozin', 'Metformin hydrochloride'],
    drugClass: 'SGLT2 Inhibitor & Biguanide Combinations',
    strength: '5 mg / 1000 mg',
    dosageForm: 'Modified-release film-coated tablet',
    route: 'Oral',
    packSize: '28 modified-release film-coated tablets',
    approvedIndications:
      'Type 2 diabetes mellitus in adults as an adjunct to diet and exercise when inadequately controlled on metformin or when switching from separate dapagliflozin and metformin tablets.',
    usualAdultDose:
      '1–2 tablets once daily with the evening meal (up to a maximum daily dose of 10 mg dapagliflozin / 2000 mg metformin HCl). Swallow whole; do not crush or chew.',
    contraindications:
      'Hypersensitivity to active substances; acute metabolic acidosis (lactic acidosis, diabetic ketoacidosis); severe renal impairment (eGFR < 30 mL/min/1.73 m²); hepatic impairment; acute conditions predisposing to tissue hypoxia or renal dysfunction.',
    commonAdverseEffects:
      'Nausea, vomiting, diarrhea, abdominal pain, loss of appetite, genital mycotic infections, urinary tract infection, dysgeusia, and polyuria.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Xigduo (dapagliflozin / metformin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xigduo',
  },
  {
    brandName: 'Xigduo XR 10 mg / 1000 mg',
    brandNameAr: 'زيجدو إكس آر ١٠ / ١٠٠٠ ملغ',
    genericName: 'Dapagliflozin + Metformin hydrochloride',
    activeIngredients: ['Dapagliflozin', 'Metformin hydrochloride'],
    drugClass: 'SGLT2 Inhibitor & Biguanide Combinations',
    strength: '10 mg / 1000 mg',
    dosageForm: 'Modified-release film-coated tablet',
    route: 'Oral',
    packSize: '28 modified-release film-coated tablets',
    approvedIndications:
      'Type 2 diabetes mellitus in adults inadequately controlled on metformin alone, in combination with other glucose-lowering agents, or as replacement for separate dapagliflozin 10 mg and metformin 1000 mg tablets.',
    usualAdultDose:
      'One tablet (10 mg dapagliflozin / 1000 mg extended-release metformin) once daily with the evening meal. Swallow whole.',
    contraindications:
      'Hypersensitivity to dapagliflozin or metformin; metabolic acidosis (lactic acidosis, DKA); severe renal failure (eGFR < 30 mL/min/1.73 m²); hepatic impairment; alcoholism.',
    commonAdverseEffects:
      'Gastrointestinal symptoms (nausea, diarrhea, abdominal pain), genital mycotic infections, urinary tract infection, dizziness, and polyuria.',
    storageConditions: 'Store below 30°C in the original blister package.',
    specialties: ['Endocrinology', 'Internal Medicine', 'Cardiology'],
    sourceTitle: 'Xigduo (dapagliflozin / metformin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/xigduo',
  },
  {
    brandName: 'Qtern 5 mg / 10 mg',
    brandNameAr: 'كويتيرن ٥ ملغ / ١٠ ملغ',
    genericName: 'Saxagliptin + Dapagliflozin',
    activeIngredients: ['Saxagliptin', 'Dapagliflozin'],
    drugClass: 'DPP-4 & SGLT2 Inhibitor Combinations',
    strength: '5 mg / 10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Type 2 diabetes mellitus in adults aged 18 years and older to improve glycemic control when metformin and/or sulfonylurea and one of the monocomponents of Qtern do not provide adequate glycemic control, or when already treated with the free combination of dapagliflozin and saxagliptin.',
    usualAdultDose:
      'One tablet (5 mg saxagliptin / 10 mg dapagliflozin) once daily at any time of the day, with or without food. Swallow whole.',
    contraindications:
      'Hypersensitivity to saxagliptin, dapagliflozin, other DPP-4 inhibitors, or any excipient; history of serious hypersensitivity reaction such as anaphylaxis or angioedema to any DPP-4 inhibitor.',
    commonAdverseEffects:
      'Upper respiratory tract infection, urinary tract infection, vulvovaginitis/balanitis, dizziness, dyslipidemia, headache, abdominal pain, nausea, and gastroenteritis.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Qtern (saxagliptin / dapagliflozin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/qtern',
  },
  {
    brandName: 'Onglyza 5 mg',
    brandNameAr: 'أونجليزا ٥ ملغ',
    genericName: 'Saxagliptin',
    activeIngredients: ['Saxagliptin'],
    drugClass: 'DPP-4 Inhibitors (Gliptins)',
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of adult patients with type 2 diabetes mellitus as an adjunct to diet and exercise to improve glycemic control as monotherapy (when metformin is inappropriate) or in combination with metformin, sulfonylurea, thiazolidinedione, or insulin.',
    usualAdultDose:
      '5 mg orally once daily at any time of the day, with or without food. Reduce dose to 2.5 mg once daily in patients with moderate or severe renal impairment (eGFR < 45 mL/min/1.73 m²) or when co-administered with strong CYP3A4/5 inhibitors.',
    contraindications:
      'Hypersensitivity to saxagliptin or history of a serious hypersensitivity reaction (anaphylaxis, angioedema, exfoliative skin conditions) to any DPP-4 inhibitor.',
    commonAdverseEffects:
      'Upper respiratory tract infection, urinary tract infection, gastroenteritis, sinusitis, headache, dizziness, abdominal pain, nausea, peripheral edema, and arthralgia.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Onglyza (saxagliptin) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/onglyza',
  },
  {
    brandName: 'Kombiglyze XR 5 mg / 1000 mg',
    brandNameAr: 'كومبيجليز إكس آر ٥ / ١٠٠٠ ملغ',
    genericName: 'Saxagliptin + Metformin hydrochloride',
    activeIngredients: ['Saxagliptin', 'Metformin hydrochloride'],
    drugClass: 'DPP-4 Inhibitor & Biguanide Combinations',
    strength: '5 mg / 1000 mg',
    dosageForm: 'Modified-release film-coated tablet',
    route: 'Oral',
    packSize: '28 modified-release film-coated tablets',
    approvedIndications:
      'Adjunct to diet and exercise to improve glycemic control in adults with type 2 diabetes mellitus inadequately controlled on maximally tolerated metformin alone, or already treated with the combination of saxagliptin and metformin as separate tablets.',
    usualAdultDose:
      'One tablet (5 mg saxagliptin / 1000 mg extended-release metformin) once daily with the evening meal. Swallow whole; do not cut, crush, or chew.',
    contraindications:
      'Hypersensitivity to saxagliptin or metformin; acute metabolic acidosis (lactic acidosis, DKA); severe renal impairment (eGFR < 30 mL/min/1.73 m²); hepatic impairment; acute conditions causing tissue hypoxia; alcoholism.',
    commonAdverseEffects:
      'Diarrhea, nausea, vomiting, abdominal pain, upper respiratory tract infection, urinary tract infection, headache, and dyspepsia.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Kombiglyze XR (saxagliptin / metformin) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/200678s025lbl.pdf',
  },

  // ============================================================================
  // 4. CARDIOVASCULAR — Antiplatelets, Beta-Blockers, ARBs, ACEIs, CCBs & Renal
  // ============================================================================
  {
    brandName: 'Brilinta 90 mg',
    brandNameAr: 'بريلينتا ٩٠ ملغ',
    genericName: 'Ticagrelor',
    activeIngredients: ['Ticagrelor'],
    drugClass: 'P2Y12 Platelet Aggregation Inhibitors',
    strength: '90 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 film-coated tablets (4 calendar blisters x 14)',
    approvedIndications:
      'Co-administered with acetylsalicylic acid (ASA) for the prevention of atherothrombotic events in adult patients with acute coronary syndromes (unstable angina, NSTEMI, or STEMI), including patients managed medically, with PCI, or with CABG.',
    usualAdultDose:
      'Initiate with a single 180 mg loading dose (two 90 mg tablets) and continue with 90 mg twice daily for 12 months with low-dose ASA (75–100 mg once daily).',
    contraindications:
      'Hypersensitivity to ticagrelor; active pathological bleeding; history of intracranial hemorrhage; severe hepatic impairment; co-administration with strong CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Dyspnea, epistaxis, gastrointestinal hemorrhage, subcutaneous/dermal bleeding, bruising, hyperuricemia, gout, dizziness, and headache.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Brilique / Brilinta (ticagrelor) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/brilique',
  },
  {
    brandName: 'Brilinta 60 mg',
    brandNameAr: 'بريلينتا ٦٠ ملغ',
    genericName: 'Ticagrelor',
    activeIngredients: ['Ticagrelor'],
    drugClass: 'P2Y12 Platelet Aggregation Inhibitors',
    strength: '60 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 film-coated tablets (4 calendar blisters x 14)',
    approvedIndications:
      'Co-administered with acetylsalicylic acid (ASA) for extended secondary prevention of atherothrombotic events in adult patients with a history of myocardial infarction (occurred at least one year ago) and a high risk of developing an atherothrombotic event.',
    usualAdultDose:
      '60 mg orally twice daily (starting as continuation therapy after the initial 1-year treatment with Brilinta 90 mg twice daily following myocardial infarction), taken with low-dose ASA 75–100 mg daily.',
    contraindications:
      'Active pathological bleeding; history of intracranial hemorrhage; severe hepatic impairment; concomitant strong CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Dyspnea, bruising, epistaxis, gastrointestinal bleeding, hyperuricemia, dizziness, and bradyarrhythmias.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Brilique / Brilinta (ticagrelor) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/brilique',
  },
  {
    brandName: 'Betaloc ZOK 25 mg',
    brandNameAr: 'بيتالوك زوك ٢٥ ملغ',
    genericName: 'Metoprolol succinate',
    activeIngredients: ['Metoprolol succinate'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '25 mg',
    dosageForm: 'Prolonged-release tablet (ZOK)',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Initiation and upward titration in stable symptomatic chronic heart failure (NYHA II–IV, LVEF ≤ 40%); mild-to-moderate hypertension; functional cardiac disorders with palpitations.',
    usualAdultDose:
      'Chronic heart failure initiation: 12.5 mg (half a 25 mg tablet) or 25 mg once daily in the morning, doubled every 2 weeks as tolerated up to target 200 mg once daily. Scored ZOK tablets may be divided; do not crush or chew.',
    contraindications:
      'Cardiogenic shock; sick sinus syndrome without pacemaker; second- or third-degree AV block; unstable decompensated heart failure; symptomatic bradycardia or hypotension.',
    commonAdverseEffects:
      'Bradycardia, postural hypotension, fatigue, dizziness, headache, cold extremities, and gastrointestinal upset.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Betaloc ZOK / Toprol-XL (metoprolol succinate) — Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019962s051lbl.pdf',
  },
  {
    brandName: 'Betaloc ZOK 50 mg',
    brandNameAr: 'بيتالوك زوك ٥٠ ملغ',
    genericName: 'Metoprolol succinate',
    activeIngredients: ['Metoprolol succinate'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '50 mg',
    dosageForm: 'Prolonged-release tablet (ZOK)',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Hypertension; angina pectoris; stable symptomatic chronic heart failure; secondary prevention after myocardial infarction; supraventricular tachyarrhythmias; functional cardiac disorders with palpitations; migraine prophylaxis.',
    usualAdultDose:
      '50–100 mg orally once daily in the morning for hypertension; 100–200 mg once daily for angina or migraine prophylaxis; titrated up to 200 mg once daily in chronic heart failure.',
    contraindications:
      'Cardiogenic shock; sick sinus syndrome without pacemaker; second- or third-degree AV block; unstable decompensated heart failure; symptomatic bradycardia or hypotension.',
    commonAdverseEffects:
      'Bradycardia, postural hypotension, cold hands and feet, fatigue, dizziness, headache, nausea, and exertional dyspnea.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Neurology'],
    sourceTitle: 'Betaloc ZOK / Toprol-XL (metoprolol succinate) — Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019962s051lbl.pdf',
  },
  {
    brandName: 'Betaloc ZOK 100 mg',
    brandNameAr: 'بيتالوك زوك ١٠٠ ملغ',
    genericName: 'Metoprolol succinate',
    activeIngredients: ['Metoprolol succinate'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '100 mg',
    dosageForm: 'Prolonged-release tablet (ZOK)',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Hypertension; chronic stable angina pectoris; maintenance after myocardial infarction; stable chronic heart failure with reduced ejection fraction; supraventricular tachyarrhythmias; migraine prophylaxis.',
    usualAdultDose:
      '100–200 mg orally once daily in the morning. Scored ZOK tablets may be halved but must not be crushed or chewed.',
    contraindications:
      'Second- or third-degree AV block; sick sinus syndrome without pacemaker; cardiogenic shock; decompensated heart failure; severe bradycardia or hypotension.',
    commonAdverseEffects:
      'Fatigue, dizziness, headache, bradycardia, orthostatic hypotension, peripheral coldness, and gastrointestinal disturbances.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Betaloc ZOK / Toprol-XL (metoprolol succinate) — Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019962s051lbl.pdf',
  },
  {
    brandName: 'Betaloc ZOK 200 mg',
    brandNameAr: 'بيتالوك زوك ٢٠٠ ملغ',
    genericName: 'Metoprolol succinate',
    activeIngredients: ['Metoprolol succinate'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '200 mg',
    dosageForm: 'Prolonged-release tablet (ZOK)',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Target maintenance dose in chronic heart failure with reduced ejection fraction; post-myocardial infarction secondary prevention; chronic stable angina pectoris; hypertension and tachyarrhythmias requiring full beta-1 blockade.',
    usualAdultDose:
      '200 mg orally once daily in the morning reached via gradual titration.',
    contraindications:
      'Second- or third-degree AV block; sick sinus syndrome without pacemaker; cardiogenic shock; decompensated heart failure; severe bradycardia or hypotension.',
    commonAdverseEffects:
      'Bradycardia, fatigue, dizziness, headache, postural hypotension, cold extremities, and dyspnea on exertion.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Betaloc ZOK / Toprol-XL (metoprolol succinate) — Official Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019962s051lbl.pdf',
  },
  {
    brandName: 'Tenormin 50 mg',
    brandNameAr: 'تينورمين ٥٠ ملغ',
    genericName: 'Atenolol',
    activeIngredients: ['Atenolol'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Management of hypertension; management of angina pectoris; control of cardiac dysrhythmias; early and late intervention after myocardial infarction.',
    usualAdultDose:
      'Hypertension: 50–100 mg orally once daily. Angina: 100 mg once daily or 50 mg twice daily. Adjust dosage in renal impairment (CrCl < 35 mL/min).',
    contraindications:
      'Hypersensitivity to atenolol; bradycardia (< 45 bpm); cardiogenic shock; hypotension; metabolic acidosis; severe peripheral arterial circulatory disturbances; second- or third-degree heart block; sick sinus syndrome; untreated pheochromocytoma; uncontrolled heart failure.',
    commonAdverseEffects:
      'Bradycardia, cold extremities, fatigue, gastrointestinal disturbances, dizziness, headache, and sleep disturbances.',
    storageConditions: 'Store below 25°C, protected from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Tenormin (atenolol) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/018240s080lbl.pdf',
  },
  {
    brandName: 'Tenormin 100 mg',
    brandNameAr: 'تينورمين ١٠٠ ملغ',
    genericName: 'Atenolol',
    activeIngredients: ['Atenolol'],
    drugClass: 'Beta-1 Selective Adrenergic Blockers',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Hypertension, chronic stable angina pectoris, cardiac arrhythmias, and secondary prevention following myocardial infarction.',
    usualAdultDose:
      '100 mg orally once daily. Reduce frequency/dose in patients with significant renal impairment.',
    contraindications:
      'Second- or third-degree AV block; sinus bradycardia; cardiogenic shock; uncontrolled heart failure; untreated pheochromocytoma; severe peripheral vascular disease.',
    commonAdverseEffects:
      'Bradycardia, fatigue, cold extremities, dizziness, postural hypotension, and gastrointestinal upset.',
    storageConditions: 'Store below 25°C, protected from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Tenormin (atenolol) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/018240s080lbl.pdf',
  },
  {
    brandName: 'Atacand 8 mg',
    brandNameAr: 'أتاكاند ٨ ملغ',
    genericName: 'Candesartan cilexetil',
    activeIngredients: ['Candesartan cilexetil'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '8 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets (2 blisters x 14)',
    approvedIndications:
      'Essential hypertension in adults and children aged 6 to <18 years; adult patients with heart failure and impaired left ventricular systolic function (LVEF ≤ 40%).',
    usualAdultDose:
      'Hypertension: recommended initial dose 8 mg once daily, increased to 16 mg or 32 mg once daily according to BP response. Heart failure: titrate from 4 mg once daily up to target 32 mg once daily.',
    contraindications:
      'Hypersensitivity to candesartan; second and third trimesters of pregnancy; severe hepatic impairment and/or cholestasis; concomitant aliskiren in diabetes or GFR < 60 mL/min/1.73 m².',
    commonAdverseEffects:
      'Dizziness/vertigo, headache, hypotension, hyperkalemia, and renal function changes.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Atacand (candesartan cilexetil) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/020838s039lbl.pdf',
  },
  {
    brandName: 'Atacand 16 mg',
    brandNameAr: 'أتاكاند ١٦ ملغ',
    genericName: 'Candesartan cilexetil',
    activeIngredients: ['Candesartan cilexetil'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '16 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets (2 blisters x 14)',
    approvedIndications:
      'Essential hypertension in adults and pediatric patients aged 6 to <18 years; heart failure with reduced ejection fraction (LVEF ≤ 40%) as an alternative or add-on to ACE inhibitors.',
    usualAdultDose:
      '16 mg orally once daily with or without food (may be increased up to 32 mg once daily).',
    contraindications:
      'Hypersensitivity to candesartan; second and third trimesters of pregnancy; severe hepatic impairment and/or cholestasis; concomitant aliskiren in diabetes or renal impairment.',
    commonAdverseEffects:
      'Dizziness/vertigo, headache, respiratory infection, hypotension, hyperkalemia, and elevated serum creatinine.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Atacand (candesartan cilexetil) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/020838s039lbl.pdf',
  },
  {
    brandName: 'Atacand 32 mg',
    brandNameAr: 'أتاكاند ٣٢ ملغ',
    genericName: 'Candesartan cilexetil',
    activeIngredients: ['Candesartan cilexetil'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '32 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets (2 blisters x 14)',
    approvedIndications:
      'Maximum-dose maintenance therapy for essential hypertension and target maintenance dose for chronic heart failure with reduced ejection fraction (LVEF ≤ 40%).',
    usualAdultDose:
      '32 mg orally once daily with or without food.',
    contraindications:
      'Hypersensitivity to candesartan; second and third trimesters of pregnancy; severe hepatic impairment and/or cholestasis; concomitant aliskiren in diabetes or renal impairment.',
    commonAdverseEffects:
      'Hypotension, dizziness, hyperkalemia, renal impairment, and headache.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Atacand (candesartan cilexetil) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/020838s039lbl.pdf',
  },
  {
    brandName: 'Atacand Plus 16 mg / 12.5 mg',
    brandNameAr: 'أتاكاند بلس ١٦ / ١٢.٥ ملغ',
    genericName: 'Candesartan cilexetil + Hydrochlorothiazide',
    activeIngredients: ['Candesartan cilexetil', 'Hydrochlorothiazide'],
    drugClass: 'ARB & Thiazide Diuretic Combinations',
    strength: '16 mg / 12.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets (2 blisters x 14)',
    approvedIndications:
      'Treatment of essential hypertension in adult patients whose blood pressure is not optimally controlled with candesartan cilexetil or hydrochlorothiazide monotherapy.',
    usualAdultDose:
      'One tablet (16 mg candesartan cilexetil / 12.5 mg hydrochlorothiazide) once daily with or without food.',
    contraindications:
      'Hypersensitivity to active substances or sulfonamide derivatives; second and third trimesters of pregnancy; severe renal impairment (CrCl < 30 mL/min); severe hepatic impairment/cholestasis; refractory hypokalemia and hypercalcemia; gout.',
    commonAdverseEffects:
      'Dizziness, vertigo, headache, electrolyte disturbances (hypokalemia, hyponatremia), hyperuricemia, hyperglycemia, and respiratory tract infection.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Atacand HCT (candesartan / hydrochlorothiazide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/021093s029lbl.pdf',
  },
  {
    brandName: 'Plendil 5 mg',
    brandNameAr: 'بلنديل ٥ ملغ',
    genericName: 'Felodipine',
    activeIngredients: ['Felodipine'],
    drugClass: 'Dihydropyridine Calcium Channel Blockers',
    strength: '5 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Treatment of essential hypertension and prophylactic treatment of chronic stable angina pectoris.',
    usualAdultDose:
      'Hypertension and angina pectoris: initiate at 5 mg once daily in the morning; maintenance dose is 5 mg or 10 mg once daily. Swallow whole with water; do not divide, crush, or chew. Avoid grapefruit juice.',
    contraindications:
      'Hypersensitivity to felodipine; pregnancy; uncompensated heart failure; acute myocardial infarction; unstable angina pectoris; hemodynamically significant cardiac valvular obstruction or dynamic cardiac outflow obstruction.',
    commonAdverseEffects:
      'Peripheral ankle edema (dose-related precapillary vasodilation), flushing, headache, palpitations, dizziness, fatigue, and gingival hyperplasia.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Plendil (felodipine) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/plendil',
  },
  {
    brandName: 'Plendil 10 mg',
    brandNameAr: 'بلنديل ١٠ ملغ',
    genericName: 'Felodipine',
    activeIngredients: ['Felodipine'],
    drugClass: 'Dihydropyridine Calcium Channel Blockers',
    strength: '10 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Maintenance treatment of essential hypertension and chronic stable angina pectoris requiring higher-dose calcium channel blockade.',
    usualAdultDose:
      '10 mg orally once daily in the morning. Swallow prolonged-release tablets whole; do not divide, crush, or chew.',
    contraindications:
      'Hypersensitivity to felodipine; pregnancy; uncompensated heart failure; acute myocardial infarction; unstable angina pectoris; severe aortic/mitral stenosis.',
    commonAdverseEffects:
      'Peripheral edema, flushing, headache, tachycardia/palpitations, dizziness, and gingival enlargement.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Plendil (felodipine) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/plendil',
  },
  {
    brandName: 'Zestril 10 mg',
    brandNameAr: 'زيستريل ١٠ ملغ',
    genericName: 'Lisinopril dihydrate',
    activeIngredients: ['Lisinopril'],
    drugClass: 'ACE Inhibitors',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Essential and renovascular hypertension; symptomatic heart failure; acute myocardial infarction (short-term 6-week treatment in hemodynamically stable patients within 24 hours of MI); renal complications of type 2 diabetes mellitus in hypertensive patients with incipient nephropathy.',
    usualAdultDose:
      'Hypertension: start at 10 mg once daily; usual maintenance 20 mg once daily (max 80 mg/day). Heart failure: start at 2.5 mg once daily and titrate up to 5–35 mg once daily. Diabetic nephropathy: 10–20 mg once daily.',
    contraindications:
      'Hypersensitivity to lisinopril or any ACE inhibitor; history of angioedema associated with previous ACE inhibitor therapy; hereditary or idiopathic angioedema; second and third trimesters of pregnancy; concomitant sacubitril/valsartan (within 36 hours) or aliskiren in diabetes/renal impairment.',
    commonAdverseEffects:
      'Persistent dry cough, dizziness, headache, orthostatic hypotension, diarrhea, vomiting, renal dysfunction, and hyperkalemia.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Zestril (lisinopril) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zestril',
  },
  {
    brandName: 'Zestril 20 mg',
    brandNameAr: 'زيستريل ٢٠ ملغ',
    genericName: 'Lisinopril dihydrate',
    activeIngredients: ['Lisinopril'],
    drugClass: 'ACE Inhibitors',
    strength: '20 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Maintenance therapy of essential and renovascular hypertension, chronic heart failure, and hypertensive type 2 diabetic nephropathy.',
    usualAdultDose:
      '20 mg orally once daily at approximately the same time each day, with or without food.',
    contraindications:
      'History of ACE-inhibitor-induced or hereditary/idiopathic angioedema; second and third trimesters of pregnancy; concomitant sacubitril/valsartan within 36 hours.',
    commonAdverseEffects:
      'Dry non-productive cough, dizziness, headache, hypotension, hyperkalemia, and elevated serum creatinine.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Zestril (lisinopril) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/zestril',
  },
  {
    brandName: 'Zestoretic 20 mg / 12.5 mg',
    brandNameAr: 'زيستوريتيك ٢٠ / ١٢.٥ ملغ',
    genericName: 'Lisinopril + Hydrochlorothiazide',
    activeIngredients: ['Lisinopril', 'Hydrochlorothiazide'],
    drugClass: 'ACE Inhibitor & Thiazide Diuretic Combinations',
    strength: '20 mg / 12.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Treatment of essential hypertension in patients whose blood pressure is not adequately controlled on lisinopril alone (or hydrochlorothiazide alone).',
    usualAdultDose:
      'One tablet (20 mg lisinopril / 12.5 mg hydrochlorothiazide) orally once daily at approximately the same time each day.',
    contraindications:
      'History of angioedema; hypersensitivity to lisinopril, thiazides, or sulfonamide derivatives; anuria; severe renal impairment (CrCl < 30 mL/min); severe hepatic impairment; second and third trimesters of pregnancy; concomitant sacubitril/valsartan.',
    commonAdverseEffects:
      'Dizziness, headache, dry cough, fatigue, orthostatic hypotension, hypokalemia or hyperkalemia, and hyperuricemia.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Zestoretic (lisinopril / hydrochlorothiazide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019888s062lbl.pdf',
  },
  {
    brandName: 'Lokelma 5 g',
    brandNameAr: 'لوكيلما ٥ غرام مسحوق للمعلق الفموي',
    genericName: 'Sodium zirconium cyclosilicate',
    activeIngredients: ['Sodium zirconium cyclosilicate'],
    drugClass: 'Potassium Binders (Hyperkalemia Agents)',
    strength: '5 g',
    dosageForm: 'Powder for oral suspension in sachet',
    route: 'Oral',
    packSize: '30 sachets x 5 g',
    approvedIndications:
      'Treatment of hyperkalemia in adult patients (including patients with chronic kidney disease, heart failure, or on RAAS inhibitor therapy, and patients on chronic hemodialysis).',
    usualAdultDose:
      'Correction phase: 10 g (two 5 g sachets) three times daily for up to 48 hours. Maintenance phase: 5 g once daily, titrated between 5 g every other day and 10 g once daily to maintain normokalemia. Stir sachet contents into ~45 mL of water and drink immediately.',
    contraindications:
      'Hypersensitivity to sodium zirconium cyclosilicate.',
    commonAdverseEffects:
      'Hypokalemia, edema-related events (fluid retention, peripheral edema), and constipation.',
    storageConditions: 'Store below 30°C in the original sachet.',
    specialties: ['Nephrology', 'Cardiology', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Lokelma (sodium zirconium cyclosilicate) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lokelma',
  },

  // ============================================================================
  // 5. RESPIRATORY & IMMUNOLOGY — Asthma, COPD & Allergic Rhinitis
  // ============================================================================
  {
    brandName: 'Symbicort Turbuhaler 80/4.5 mcg',
    brandNameAr: 'سيمبيكورت تيربوهيلر ٨٠ / ٤.٥ ميكروغرام',
    genericName: 'Budesonide + Formoterol fumarate dihydrate',
    activeIngredients: ['Budesonide', 'Formoterol fumarate dihydrate'],
    drugClass: 'Inhaled Corticosteroid & LABA Combinations',
    strength: '80 mcg / 4.5 mcg per actuation',
    dosageForm: 'Inhalation powder (Turbuhaler)',
    route: 'Inhalation',
    packSize: '1 inhaler x 120 doses',
    approvedIndications:
      'Regular treatment of asthma in adults, adolescents, and children aged 6 years and older where use of a combination (inhaled corticosteroid and long-acting beta-2 adrenoceptor agonist) is appropriate, both as maintenance therapy and as maintenance and reliever therapy (in adults and adolescents ≥12 years).',
    usualAdultDose:
      'Adults/adolescents: 1–2 inhalations twice daily (or as SMART maintenance and reliever therapy). Children (6–11 years): 2 inhalations twice daily. Rinse mouth with water after maintenance inhalations.',
    contraindications:
      'Hypersensitivity to budesonide, formoterol, or inhaled lactose.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, headache, tremor, palpitations, mild throat irritation, coughing, and hoarseness.',
    storageConditions:
      'Store below 30°C with the protective cap tightly replaced to protect from moisture.',
    specialties: ['Pulmonology', 'Pediatrics', 'Allergy & Immunology', 'Internal Medicine'],
    sourceTitle: 'Symbicort Turbuhaler (budesonide / formoterol) — EMA SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/symbicort',
  },
  {
    brandName: 'Symbicort Turbuhaler 160/4.5 mcg',
    brandNameAr: 'سيمبيكورت تيربوهيلر ١٦٠ / ٤.٥ ميكروغرام',
    genericName: 'Budesonide + Formoterol fumarate dihydrate',
    activeIngredients: ['Budesonide', 'Formoterol fumarate dihydrate'],
    drugClass: 'Inhaled Corticosteroid & LABA Combinations',
    strength: '160 mcg / 4.5 mcg per actuation',
    dosageForm: 'Inhalation powder (Turbuhaler)',
    route: 'Inhalation',
    packSize: '1 inhaler x 120 doses',
    approvedIndications:
      'Asthma in adults and adolescents (12–17 years) as regular maintenance therapy and as anti-inflammatory reliever + maintenance therapy (SMART). Symptomatic treatment of patients with severe COPD (FEV1 < 70% predicted normal) and a history of repeated exacerbations.',
    usualAdultDose:
      'Asthma maintenance: 1–2 inhalations twice daily (plus 1 inhalation as needed in SMART regimen, max 6 inhalations on a single occasion). COPD: 2 inhalations twice daily. Rinse mouth with water after maintenance doses.',
    contraindications:
      'Hypersensitivity to budesonide, formoterol, or inhaled lactose.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, pneumonia (in COPD patients), headache, tremor, palpitations, mild throat irritation, coughing, and hoarseness.',
    storageConditions:
      'Store below 30°C. Keep container tightly closed to protect from moisture.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Allergy & Immunology'],
    sourceTitle: 'Symbicort Turbuhaler (budesonide / formoterol) — EMA SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/symbicort',
  },
  {
    brandName: 'Symbicort Turbuhaler 320/9 mcg',
    brandNameAr: 'سيمبيكورت تيربوهيلر ٣٢٠ / ٩ ميكروغرام',
    genericName: 'Budesonide + Formoterol fumarate dihydrate',
    activeIngredients: ['Budesonide', 'Formoterol fumarate dihydrate'],
    drugClass: 'Inhaled Corticosteroid & LABA Combinations',
    strength: '320 mcg / 9 mcg per actuation',
    dosageForm: 'Inhalation powder (Turbuhaler)',
    route: 'Inhalation',
    packSize: '1 inhaler x 60 doses',
    approvedIndications:
      'Regular maintenance treatment of bronchial asthma in adults and adolescents (12–17 years) requiring high-dose ICS/LABA therapy (not intended for SMART reliever use). Symptomatic treatment of severe COPD with repeated exacerbations.',
    usualAdultDose:
      'Asthma maintenance: 1 inhalation twice daily (may be increased up to 2 inhalations twice daily in adults). COPD: 1 inhalation twice daily. Keep a separate rapid-acting bronchodilator for acute relief. Rinse mouth after use.',
    contraindications:
      'Hypersensitivity to budesonide, formoterol, or inhaled lactose.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, pneumonia (in COPD), tremor, palpitations, headache, cough, and dysphonia.',
    storageConditions:
      'Store below 30°C with the cover tightly closed.',
    specialties: ['Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Symbicort Turbuhaler (budesonide / formoterol) — EMA SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/symbicort',
  },
  {
    brandName: 'Pulmicort Respules 0.5 mg/2 mL',
    brandNameAr: 'بلميكورت ريسبولز ٠.٥ ملغ / ٢ مل',
    genericName: 'Budesonide',
    activeIngredients: ['Budesonide'],
    drugClass: 'Inhaled Corticosteroids (ICS)',
    strength: '0.5 mg / 2 mL (0.25 mg/mL)',
    dosageForm: 'Nebuliser suspension',
    route: 'Inhalation (Nebulisation)',
    packSize: '20 single-dose Respules x 2 mL',
    approvedIndications:
      'Bronchial asthma where pressurized MDI or dry-powder inhaler is unsatisfactory or inappropriate; acute laryngotracheobronchitis (croup) in infants and children; acute exacerbations of COPD.',
    usualAdultDose:
      'Asthma maintenance: Adults 0.5–2 mg daily; Children (6 months–11 years) 0.25–1 mg daily via jet nebuliser. Croup: 2 mg nebulised as a single dose or two 1 mg doses 30 minutes apart. Rinse mouth and wash face after nebulisation.',
    contraindications:
      'Hypersensitivity to budesonide or any excipient.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, cough, hoarseness, throat irritation, and perioral skin irritation from face mask.',
    storageConditions:
      'Store upright below 30°C in the protective foil envelope to protect from light. Do not freeze.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Pulmicort Respules (budesonide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/020929s017lbl.pdf',
  },
  {
    brandName: 'Pulmicort Respules 1 mg/2 mL',
    brandNameAr: 'بلميكورت ريسبولز ١ ملغ / ٢ مل',
    genericName: 'Budesonide',
    activeIngredients: ['Budesonide'],
    drugClass: 'Inhaled Corticosteroids (ICS)',
    strength: '1 mg / 2 mL (0.5 mg/mL)',
    dosageForm: 'Nebuliser suspension',
    route: 'Inhalation (Nebulisation)',
    packSize: '20 single-dose Respules x 2 mL',
    approvedIndications:
      'Moderate-to-severe persistent bronchial asthma requiring higher nebulised corticosteroid dosing, acute croup in infants and children, and hospital/outpatient management of acute COPD exacerbations.',
    usualAdultDose:
      'Adults: 1–2 mg daily in 1 or 2 divided nebulised administrations (up to 4 mg/day during severe exacerbations). Children: 0.5–1 mg daily (or 2 mg for acute croup). Rinse mouth and wash face after nebulisation.',
    contraindications:
      'Hypersensitivity to budesonide or any excipient.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, dysphonia, cough, throat irritation, and facial skin irritation.',
    storageConditions:
      'Store upright below 30°C in the foil envelope to protect from light. Do not freeze.',
    specialties: ['Pulmonology', 'Pediatrics', 'Internal Medicine', 'Emergency Medicine'],
    sourceTitle: 'Pulmicort Respules (budesonide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/020929s017lbl.pdf',
  },
  {
    brandName: 'Pulmicort Turbuhaler 200 mcg',
    brandNameAr: 'بلميكورت تيربوهيلر ٢٠٠ ميكروغرام',
    genericName: 'Budesonide',
    activeIngredients: ['Budesonide'],
    drugClass: 'Inhaled Corticosteroids (ICS)',
    strength: '200 mcg per actuation',
    dosageForm: 'Inhalation powder (Turbuhaler)',
    route: 'Inhalation',
    packSize: '1 inhaler x 100 doses',
    approvedIndications:
      'Maintenance treatment of bronchial asthma in adults and children aged 6 years and older requiring inhaled corticosteroid anti-inflammatory therapy.',
    usualAdultDose:
      'Adults: 200–800 mcg daily divided into 1–2 administrations (up to 1600 mcg daily in severe asthma). Children (≥6 years): 100–400 mcg daily in 1–2 divided doses. Rinse mouth with water after each dosing.',
    contraindications:
      'Hypersensitivity to budesonide.',
    commonAdverseEffects:
      'Oropharyngeal candidiasis, hoarseness/dysphonia, cough, and mild throat irritation.',
    storageConditions:
      'Store below 30°C with the protective cap tightly closed.',
    specialties: ['Pulmonology', 'Pediatrics', 'Allergy & Immunology'],
    sourceTitle: 'Pulmicort Flexhaler / Turbuhaler (budesonide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/021949s014lbl.pdf',
  },
  {
    brandName: 'Bricanyl Turbuhaler 0.5 mg',
    brandNameAr: 'بريكانيل تيربوهيلر ٠.٥ ملغ',
    genericName: 'Terbutaline sulfate',
    activeIngredients: ['Terbutaline sulfate'],
    drugClass: 'Short-Acting Beta-2 Agonists (SABA)',
    strength: '0.5 mg (500 mcg) per actuation',
    dosageForm: 'Inhalation powder (Turbuhaler)',
    route: 'Inhalation',
    packSize: '1 inhaler x 100 doses',
    approvedIndications:
      'Symptomatic relief of acute bronchospasm in bronchial asthma, chronic bronchitis, emphysema, and other bronchopulmonary disorders in adults and children.',
    usualAdultDose:
      '1 inhalation (0.5 mg) as needed for acute bronchospasm; in severe cases up to 3 inhalations on a single occasion. Maximum total dose should not exceed 8–12 inhalations (4–6 mg) in 24 hours.',
    contraindications:
      'Hypersensitivity to terbutaline sulfate.',
    commonAdverseEffects:
      'Tremor, headache, tachycardia, palpitations, tonic muscle cramps, and hypokalemia.',
    storageConditions:
      'Store below 30°C with the protective cover tightly replaced.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Pediatrics', 'Emergency Medicine'],
    sourceTitle: 'Bricanyl Turbuhaler (terbutaline sulfate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1021/smpc',
  },
  {
    brandName: 'Rhinocort Aqua 64 mcg',
    brandNameAr: 'رينوكورت أكوا ٦٤ ميكروغرام بخاخ أنفي',
    genericName: 'Budesonide',
    activeIngredients: ['Budesonide'],
    drugClass: 'Intranasal Corticosteroids',
    strength: '64 mcg per actuation',
    dosageForm: 'Nasal spray, suspension',
    route: 'Nasal',
    packSize: '1 bottle x 120 actuations',
    approvedIndications:
      'Treatment and prevention of seasonal and perennial allergic rhinitis, vasomotor (non-allergic) rhinitis, and symptomatic treatment and recurrence prophylaxis of nasal polyps in adults and children aged 6 years and older.',
    usualAdultDose:
      'Allergic/non-allergic rhinitis: start with 2 sprays (128 mcg) into each nostril once daily in the morning (total 256 mcg/day), or 1 spray into each nostril twice daily; reduce to 1 spray (64 mcg) per nostril once daily once symptoms are controlled. Nasal polyps: 1 spray into each nostril twice daily.',
    contraindications:
      'Hypersensitivity to budesonide or any excipient.',
    commonAdverseEffects:
      'Local nasal irritation, hemorrhagic nasal secretion, epistaxis, nasal dryness, sneezing, and pharyngeal irritation.',
    storageConditions: 'Store below 30°C. Do not freeze.',
    specialties: ['ENT (Otolaryngology)', 'Allergy & Immunology', 'General Practice'],
    sourceTitle: 'Rhinocort Aqua (budesonide nasal spray) — Official SmPC Summary',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/020746s032lbl.pdf',
  },
  {
    brandName: 'Fasenra 30 mg',
    brandNameAr: 'فاسينرا ٣٠ ملغ محقنة مسبقة التعبئة',
    genericName: 'Benralizumab',
    activeIngredients: ['Benralizumab'],
    drugClass: 'Anti-IL-5 Receptor Monoclonal Antibodies',
    strength: '30 mg / mL',
    dosageForm: 'Solution for injection in pre-filled syringe / pen',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (1 mL)',
    approvedIndications:
      'Add-on maintenance treatment in adult patients with severe eosinophilic asthma inadequately controlled despite high-dose inhaled corticosteroids plus long-acting beta-agonists.',
    usualAdultDose:
      '30 mg administered by subcutaneous injection every 4 weeks for the first 3 doses, and then every 8 weeks thereafter into the thigh, abdomen, or upper arm.',
    contraindications:
      'Hypersensitivity to benralizumab or any excipient.',
    commonAdverseEffects:
      'Headache, pharyngitis, pyrexia, injection site reactions, and hypersensitivity reactions.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original carton to protect from light. Do not freeze or shake.',
    specialties: ['Pulmonology', 'Allergy & Immunology'],
    sourceTitle: 'Fasenra (benralizumab) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/fasenra',
  },

  // ============================================================================
  // 6. ONCOLOGY & HEMATOLOGY — Targeted, Immunotherapy & Endocrine Oncology
  // ============================================================================
  {
    brandName: 'Tagrisso 80 mg',
    brandNameAr: 'تاجريسو ٨٠ ملغ',
    genericName: 'Osimertinib mesylate',
    activeIngredients: ['Osimertinib'],
    drugClass: 'Third-Generation EGFR Tyrosine Kinase Inhibitors',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets (3 blisters x 10)',
    approvedIndications:
      'Adjuvant treatment after complete tumor resection in adults with stage IB–IIIA NSCLC whose tumors have EGFR exon 19 deletions or exon 21 (L858R) substitution mutations; first-line treatment of locally advanced or metastatic EGFR-mutated NSCLC; treatment of locally advanced or metastatic EGFR T790M mutation-positive NSCLC.',
    usualAdultDose:
      '80 mg orally once daily with or without food until disease progression or unacceptable toxicity (or up to 3 years in adjuvant setting). Dose may be reduced to 40 mg once daily if required for adverse reactions.',
    contraindications:
      'Hypersensitivity to osimertinib or any excipient; concomitant use with St. John’s Wort.',
    commonAdverseEffects:
      'Diarrhea, rash, paronychia, dry skin, stomatitis, decreased appetite, leukopenia, lymphopenia, thrombocytopenia, neutropenia, QTc interval prolongation, and interstitial lung disease (ILD)/pneumonitis.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'Tagrisso (osimertinib) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tagrisso',
  },
  {
    brandName: 'Lynparza 150 mg',
    brandNameAr: 'لينبارزا ١٥٠ ملغ',
    genericName: 'Olaparib',
    activeIngredients: ['Olaparib'],
    drugClass: 'PARP Inhibitors',
    strength: '150 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 film-coated tablets',
    approvedIndications:
      'Maintenance and targeted therapy in BRCA-mutated or HRD-positive advanced ovarian, fallopian tube, or primary peritoneal cancer; germline BRCA1/2-mutated HER2-negative early high-risk or metastatic breast cancer; germline BRCA-mutated metastatic pancreatic adenocarcinoma; and BRCA-mutated or HRR-mutated metastatic castration-resistant prostate cancer.',
    usualAdultDose:
      '300 mg (two 150 mg tablets) taken orally twice daily (total daily dose 600 mg), with or without food. Swallow whole; do not chew, crush, dissolve, or divide.',
    contraindications:
      'Hypersensitivity to olaparib or any excipient; breastfeeding during treatment and for 1 month after the last dose.',
    commonAdverseEffects:
      'Nausea, anemia, fatigue/asthenia, vomiting, neutropenia, leukopenia, diarrhea, decreased appetite, headache, dysgeusia, cough, dyspnea, dizziness, and dyspepsia.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Oncology', 'Obstetrics & Gynecology', 'Urology'],
    sourceTitle: 'Lynparza (olaparib) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lynparza',
  },
  {
    brandName: 'Calquence 100 mg',
    brandNameAr: 'كالكوينس ١٠٠ ملغ',
    genericName: 'Acalabrutinib',
    activeIngredients: ['Acalabrutinib'],
    drugClass: 'Bruton Tyrosine Kinase (BTK) Inhibitors',
    strength: '100 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: '60 hard capsules',
    approvedIndications:
      'Monotherapy or in combination with obinutuzumab for adult patients with previously untreated chronic lymphocytic leukemia (CLL); monotherapy for adult patients with CLL who have received at least one prior therapy; relapsed or refractory mantle cell lymphoma (MCL).',
    usualAdultDose:
      '100 mg (one capsule) taken orally twice daily (approximately every 12 hours) with or without food. Swallow whole with water.',
    contraindications:
      'Hypersensitivity to acalabrutinib or any excipient.',
    commonAdverseEffects:
      'Respiratory tract infections, headache, diarrhea, bruising/contusion, musculoskeletal pain, nausea, fatigue, rash, arthralgia, neutropenia, thrombocytopenia, anemia, and atrial fibrillation.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'Calquence (acalabrutinib) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/calquence',
  },
  {
    brandName: 'Imfinzi 500 mg/10 mL',
    brandNameAr: 'إمفينزي ٥٠٠ ملغ / ١٠ مل فيال للتسريب الوريدي',
    genericName: 'Durvalumab',
    activeIngredients: ['Durvalumab'],
    drugClass: 'PD-L1 Immune Checkpoint Inhibitors',
    strength: '500 mg / 10 mL (50 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous',
    packSize: '1 vial x 10 mL',
    approvedIndications:
      'Unresectable stage III NSCLC after platinum-based chemoradiation; metastatic NSCLC in combination with tremelimumab and platinum chemotherapy; extensive-stage small cell lung cancer (ES-SCLC) with etoposide and platinum; locally advanced or metastatic biliary tract cancer (BTC) with gemcitabine and cisplatin; unresectable hepatocellular carcinoma (HCC).',
    usualAdultDose:
      'Administered as an intravenous infusion over 60 minutes at 10 mg/kg every 2 weeks or 1500 mg every 3 or 4 weeks depending on indication and body weight (>30 kg).',
    contraindications:
      'Hypersensitivity to durvalumab or any excipient.',
    commonAdverseEffects:
      'Cough, diarrhea, rash, pruritus, pyrexia, upper respiratory tract infections, hypothyroidism, abdominal pain, fatigue, and immune-mediated pneumonitis, hepatitis, or colitis.',
    storageConditions:
      'Store in a refrigerator (2°C–8°C) in the original carton to protect from light. Do not freeze or shake.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'Imfinzi (durvalumab) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/imfinzi',
  },
  {
    brandName: 'Iressa 250 mg',
    brandNameAr: 'إيريسا ٢٥٠ ملغ',
    genericName: 'Gefitinib',
    activeIngredients: ['Gefitinib'],
    drugClass: 'EGFR Tyrosine Kinase Inhibitors',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Treatment of adult patients with locally advanced or metastatic non-small cell lung cancer (NSCLC) with activating mutations of EGFR-TK.',
    usualAdultDose:
      'One 250 mg tablet once daily with or without food. May be dispersed in half a glass of non-carbonated water for patients with swallowing difficulties.',
    contraindications:
      'Hypersensitivity to gefitinib or any excipient; breastfeeding.',
    commonAdverseEffects:
      'Diarrhea, skin reactions (rash, acne, dry skin, pruritus), anorexia, asthenia, stomatitis, nausea, vomiting, elevated ALT/AST, and interstitial lung disease (ILD).',
    storageConditions:
      'Store below 30°C in the original blister package to protect from moisture.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'Iressa (gefitinib) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/iressa',
  },
  {
    brandName: 'Faslodex 250 mg/5 mL',
    brandNameAr: 'فاسلوديكس ٢٥٠ ملغ / ٥ مل محقنتان للحقن العضلي',
    genericName: 'Fulvestrant',
    activeIngredients: ['Fulvestrant'],
    drugClass: 'Estrogen Receptor Downregulators (SERDs)',
    strength: '250 mg / 5 mL (50 mg/mL)',
    dosageForm: 'Solution for intramuscular injection in pre-filled syringe',
    route: 'Intramuscular',
    packSize: '2 pre-filled syringes x 5 mL (total 500 mg dose)',
    approvedIndications:
      'Estrogen receptor-positive, locally advanced or metastatic breast cancer in postmenopausal women (as monotherapy or in combination with palbociclib, abemaciclib, or ribociclib in HR-positive, HER2-negative disease).',
    usualAdultDose:
      '500 mg administered as two consecutive 5 mL (250 mg) slow intramuscular injections (1–2 minutes per injection), one in each buttock (gluteal area), on Days 1, 15, 29, and once monthly thereafter.',
    contraindications:
      'Hypersensitivity to fulvestrant or any excipient; pregnancy and lactation; severe hepatic impairment.',
    commonAdverseEffects:
      'Injection site reactions, asthenia, nausea, elevated hepatic enzymes (ALT, AST, ALP), arthralgia, hot flushes, headache, rash, and musculoskeletal pain.',
    storageConditions:
      'Store and transport refrigerated (2°C–8°C) in the original carton to protect from light.',
    specialties: ['Oncology'],
    sourceTitle: 'Faslodex (fulvestrant) — EMA EPAR Product Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/faslodex',
  },
  {
    brandName: 'Zoladex 3.6 mg',
    brandNameAr: 'زولاديكس ٣.٦ ملغ غرسة تحت الجلد',
    genericName: 'Goserelin acetate',
    activeIngredients: ['Goserelin acetate'],
    drugClass: 'Gonadotropin-Releasing Hormone (GnRH) Agonists',
    strength: '3.6 mg',
    dosageForm: 'Implant in pre-filled syringe (SafeSystem)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe with SafeSystem protective needle sleeve',
    approvedIndications:
      'Management of hormone-sensitive prostate cancer; hormone-receptor-positive breast cancer in pre- and perimenopausal women; endometriosis; uterine fibroids; endometrial thinning prior to ablation; pituitary downregulation in assisted reproduction.',
    usualAdultDose:
      'One 3.6 mg depot implant injected subcutaneously into the anterior abdominal wall every 28 days.',
    contraindications:
      'Hypersensitivity to goserelin or GnRH analogues; pregnancy and lactation; undiagnosed vaginal bleeding.',
    commonAdverseEffects:
      'Hot flushes, hyperhidrosis, decreased libido, erectile dysfunction or vaginal dryness, mood changes, bone mineral density reduction, arthralgia, and injection site reactions.',
    storageConditions: 'Store below 25°C in the original sealed pouch.',
    specialties: ['Oncology', 'Urology', 'Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Zoladex (goserelin acetate) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/019726s066lbl.pdf',
  },
  {
    brandName: 'Zoladex LA 10.8 mg',
    brandNameAr: 'زولاديكس إل إيه ١٠.٨ ملغ غرسة تحت الجلد',
    genericName: 'Goserelin acetate',
    activeIngredients: ['Goserelin acetate'],
    drugClass: 'Gonadotropin-Releasing Hormone (GnRH) Agonists',
    strength: '10.8 mg',
    dosageForm: 'Implant in pre-filled syringe (SafeSystem)',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe with SafeSystem protective needle sleeve',
    approvedIndications:
      'Management of hormone-sensitive locally advanced or metastatic prostate cancer and adjuvant/neoadjuvant treatment with radiotherapy in high-risk localized or locally advanced prostate cancer.',
    usualAdultDose:
      'One 10.8 mg depot implant injected subcutaneously into the anterior abdominal wall every 12 weeks (3 months).',
    contraindications:
      'Hypersensitivity to goserelin or other LHRH analogues; pregnancy and lactation.',
    commonAdverseEffects:
      'Hot flushes, sweating, decreased libido, erectile dysfunction, gynecomastia, bone pain, reduced bone mineral density, impaired glucose tolerance, and injection site reactions.',
    storageConditions: 'Store below 25°C in the original sealed pouch.',
    specialties: ['Urology', 'Oncology'],
    sourceTitle: 'Zoladex 10.8 mg (goserelin acetate) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/020578s048lbl.pdf',
  },
  {
    brandName: 'Arimidex 1 mg',
    brandNameAr: 'أريميدكس ١ ملغ',
    genericName: 'Anastrozole',
    activeIngredients: ['Anastrozole'],
    drugClass: 'Aromatase Inhibitors',
    strength: '1 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (2 calendar blisters x 14)',
    approvedIndications:
      'Adjuvant treatment of postmenopausal women with hormone receptor-positive early invasive breast cancer; first-line and second-line treatment of hormone receptor-positive advanced breast cancer in postmenopausal women.',
    usualAdultDose:
      'One 1 mg tablet taken orally once daily, with or without food.',
    contraindications:
      'Pregnancy and breastfeeding; known hypersensitivity to anastrozole; premenopausal women.',
    commonAdverseEffects:
      'Hot flushes, arthralgia/joint stiffness, arthritis, osteoporosis, asthenia, headache, carpal tunnel syndrome, nausea, rash, and hypercholesterolemia.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Oncology', 'General Surgery'],
    sourceTitle: 'Arimidex (anastrozole) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/020541s033lbl.pdf',
  },
  {
    brandName: 'Casodex 50 mg',
    brandNameAr: 'كاسوديكس ٥٠ ملغ',
    genericName: 'Bicalutamide',
    activeIngredients: ['Bicalutamide'],
    drugClass: 'Non-Steroidal Anti-Androgens',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Treatment of advanced prostate cancer in combination with luteinizing hormone-releasing hormone (LHRH) analogue therapy or surgical castration.',
    usualAdultDose:
      'One 50 mg tablet orally once daily at the same time each day (usually in the morning or evening), started at the same time as LHRH analogue therapy or surgical castration.',
    contraindications:
      'Females and children; hypersensitivity to bicalutamide; co-administration with terfenadine, astemizole, or cisapride.',
    commonAdverseEffects:
      'Gynecomastia and breast tenderness, hot flushes, anemia, dizziness, abdominal pain, constipation, nausea, hematuria, asthenia, edema, and elevated hepatic transaminases.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Urology', 'Oncology'],
    sourceTitle: 'Casodex (bicalutamide) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/020498s042lbl.pdf',
  },
  {
    brandName: 'Nolvadex 10 mg',
    brandNameAr: 'نولفاديكس ١٠ ملغ',
    genericName: 'Tamoxifen citrate',
    activeIngredients: ['Tamoxifen'],
    drugClass: 'Selective Estrogen Receptor Modulators (SERMs)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Adjuvant and metastatic treatment of estrogen receptor-positive breast cancer in women and men; ductal carcinoma in situ (DCIS) following breast surgery and radiation; reduction of breast cancer incidence in women at high risk.',
    usualAdultDose:
      '20 mg daily (as two 10 mg tablets or one 20 mg tablet once daily), with or without food. Up to 40 mg daily in divided doses in advanced disease.',
    contraindications:
      'Pregnancy; concurrent anastrozole; history of deep vein thrombosis or pulmonary embolism when used for risk reduction/DCIS; known hypersensitivity to tamoxifen.',
    commonAdverseEffects:
      'Hot flushes, vaginal discharge or irregular menses, nausea, fluid retention, skin rash, thromboembolic events, and endometrial proliferation/changes.',
    storageConditions: 'Store below 30°C in the original package to protect from light.',
    specialties: ['Oncology', 'General Surgery', 'Obstetrics & Gynecology'],
    sourceTitle: 'Nolvadex (tamoxifen citrate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1059/smpc',
  },
  {
    brandName: 'Nolvadex-D 20 mg',
    brandNameAr: 'نولفاديكس-دي ٢٠ ملغ',
    genericName: 'Tamoxifen citrate',
    activeIngredients: ['Tamoxifen'],
    drugClass: 'Selective Estrogen Receptor Modulators (SERMs)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Once-daily endocrine therapy for adjuvant and advanced hormone-receptor-positive breast cancer in pre- and postmenopausal women and in men.',
    usualAdultDose:
      'One 20 mg tablet orally once daily with water.',
    contraindications:
      'Pregnancy; hypersensitivity to tamoxifen; history of venous thromboembolism in prophylactic indications.',
    commonAdverseEffects:
      'Hot flushes, vaginal bleeding/discharge, pruritus vulvae, gastrointestinal intolerance, headache, fluid retention, and venous thromboembolism.',
    storageConditions: 'Store below 30°C in the original package to protect from light.',
    specialties: ['Oncology', 'General Surgery'],
    sourceTitle: 'Nolvadex (tamoxifen citrate) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1059/smpc',
  },

  // ============================================================================
  // 7. CNS, ANESTHESIA & HOSPITAL ANTI-INFECTIVES
  // ============================================================================
  {
    brandName: 'Seroquel 25 mg',
    brandNameAr: 'سيروكويل ٢٥ ملغ',
    genericName: 'Quetiapine fumarate',
    activeIngredients: ['Quetiapine'],
    drugClass: 'Atypical Antipsychotics',
    strength: '25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Treatment of schizophrenia; treatment of bipolar disorder including moderate-to-severe manic episodes, major depressive episodes in bipolar disorder, and prevention of recurrence of manic or depressed episodes.',
    usualAdultDose:
      'Initiation/titration dose: Day 1 starts at 25 mg twice daily (schizophrenia) or 50 mg at bedtime (bipolar depression), titrated over 4 days to effective maintenance dose (150–750 mg/day depending on indication).',
    contraindications:
      'Hypersensitivity to quetiapine or any excipient; concomitant administration of cytochrome P450 3A4 inhibitors (HIV protease inhibitors, azole antifungals, erythromycin, clarithromycin, nefazodone).',
    commonAdverseEffects:
      'Somnolence, dizziness, dry mouth, headache, withdrawal symptoms, weight gain, elevated serum triglycerides and total cholesterol, orthostatic hypotension, and extrapyramidal symptoms.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroquel (quetiapine fumarate) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroquel',
  },
  {
    brandName: 'Seroquel 100 mg',
    brandNameAr: 'سيروكويل ١٠٠ ملغ',
    genericName: 'Quetiapine fumarate',
    activeIngredients: ['Quetiapine'],
    drugClass: 'Atypical Antipsychotics',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Schizophrenia; moderate-to-severe manic episodes and major depressive episodes associated with bipolar disorder; maintenance prophylaxis in bipolar disorder.',
    usualAdultDose:
      'Administered twice daily (schizophrenia and bipolar mania: 300–800 mg/day in divided doses) or once daily at bedtime (bipolar depression: 300 mg once daily at bedtime).',
    contraindications:
      'Hypersensitivity to quetiapine; co-administration with strong CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Somnolence, sedation, dizziness, dry mouth, constipation, orthostatic hypotension, tachycardia, weight gain, hyperglycemia, and dyslipidemia.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroquel (quetiapine fumarate) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroquel',
  },
  {
    brandName: 'Seroquel 200 mg',
    brandNameAr: 'سيروكويل ٢٠٠ ملغ',
    genericName: 'Quetiapine fumarate',
    activeIngredients: ['Quetiapine'],
    drugClass: 'Atypical Antipsychotics',
    strength: '200 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Maintenance treatment of schizophrenia and acute/maintenance treatment of bipolar I and II disorder.',
    usualAdultDose:
      'Schizophrenia: 150–750 mg/day in 2 divided doses. Bipolar mania: 400–800 mg/day in 2 divided doses. Bipolar maintenance: 300–800 mg/day in 2 divided doses.',
    contraindications:
      'Hypersensitivity to quetiapine; concomitant potent CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Sedation, somnolence, dizziness, dry mouth, weight gain, metabolic changes (hyperglycemia, hypertriglyceridemia), and postural hypotension.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroquel (quetiapine fumarate) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroquel',
  },
  {
    brandName: 'Seroquel XR 300 mg',
    brandNameAr: 'سيروكويل إكس آر ٣٠٠ ملغ',
    genericName: 'Quetiapine fumarate',
    activeIngredients: ['Quetiapine'],
    drugClass: 'Atypical Antipsychotics',
    strength: '300 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets',
    approvedIndications:
      'Schizophrenia; bipolar disorder (manic episodes, major depressive episodes, and recurrence prevention); add-on treatment of major depressive episodes in patients with Major Depressive Disorder (MDD) who have had suboptimal response to antidepressant monotherapy.',
    usualAdultDose:
      'Administered once daily, without food (at least 1 hour before a meal or at bedtime). Bipolar depression: 300 mg once daily. Schizophrenia/bipolar mania: 300–800 mg once daily. MDD add-on: 150–300 mg once daily. Swallow whole; do not split, chew, or crush.',
    contraindications:
      'Hypersensitivity to quetiapine; concomitant use of strong CYP3A4 inhibitors.',
    commonAdverseEffects:
      'Somnolence, dizziness, headache, dry mouth, weight gain, dyslipidemia, hyperglycemia, and extrapyramidal symptoms.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Seroquel XR (quetiapine fumarate) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/seroquel-xr',
  },
  {
    brandName: 'Zomig 2.5 mg',
    brandNameAr: 'زوميغ ٢.٥ ملغ',
    genericName: 'Zolmitriptan',
    activeIngredients: ['Zolmitriptan'],
    drugClass: 'Selective 5-HT1B/1D Receptor Agonists (Triptans)',
    strength: '2.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '6 film-coated tablets',
    approvedIndications:
      'Acute treatment of migraine headache with or without aura in adults.',
    usualAdultDose:
      'One 2.5 mg tablet taken as early as possible after onset of a migraine headache. If symptoms persist or recur within 24 hours, a second dose may be taken after at least 2 hours. Maximum daily dose: 10 mg in 24 hours.',
    contraindications:
      'Moderate or severe hypertension and mild uncontrolled hypertension; ischemic heart disease, coronary vasospasm (Prinzmetal angina), history of myocardial infarction, peripheral vascular disease, or history of CVA/TIA; concomitant ergotamine, other triptans, or MAO-A inhibitors.',
    commonAdverseEffects:
      'Dizziness, headache, paresthesia, somnolence, warm sensation, palpitations, abdominal pain, nausea, dry mouth, dysphagia, sensations of tightness/heaviness in throat, neck, or chest, and asthenia.',
    storageConditions: 'Store below 30°C.',
    specialties: ['Neurology', 'Internal Medicine'],
    sourceTitle: 'Zomig (zolmitriptan) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/020768s025lbl.pdf',
  },
  {
    brandName: 'Xylocaine 2% Jelly',
    brandNameAr: 'زايلوكايين ٢٪ جل معقم',
    genericName: 'Lidocaine hydrochloride',
    activeIngredients: ['Lidocaine hydrochloride'],
    drugClass: 'Local Anesthetics (Amide Type)',
    strength: '2% (20 mg/g)',
    dosageForm: 'Sterile urethral / topical gel',
    route: 'Topical / Mucosal / Urethral',
    packSize: '1 tube x 30 g with sterile applicator',
    approvedIndications:
      'Surface anesthesia and lubrication for male and female urethra during cystoscopy, catheterization, exploration by sound, and other endourethral procedures; nasal and pharyngeal cavity endoscopy; proctoscopy/rectoscopy; tracheal intubation lubrication; symptomatic relief of painful cystitis and urethritis.',
    usualAdultDose:
      'Male urethral anesthesia: instill 10–20 g (200–400 mg lidocaine) slowly prior to catheterization or cystoscopy. Female urethra: instill 5–10 g (100–200 mg) 5–10 minutes prior to procedure. Endoscopy/intubation: apply 2–5 g onto instrument surface.',
    contraindications:
      'Hypersensitivity to amide-type local anesthetics or any excipient (including methyl/propyl parahydroxybenzoate if present); severe trauma/bleeding of the mucosa in the region of application.',
    commonAdverseEffects:
      'Rare local irritation or hypersensitivity reactions; systemic CNS/cardiovascular toxicity (circumoral paresthesia, dizziness, tinnitus, bradycardia) only with excessive absorption across traumatized mucosa.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Urology', 'Anesthesiology', 'General Surgery', 'Emergency Medicine'],
    sourceTitle: 'Xylocaine 2% Jelly (lidocaine HCl) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/008816s034lbl.pdf',
  },
  {
    brandName: 'Xylocaine 10% Pump Spray',
    brandNameAr: 'زايلوكايين ١٠٪ بخاخ موضعي',
    genericName: 'Lidocaine',
    activeIngredients: ['Lidocaine'],
    drugClass: 'Local Anesthetics (Amide Type)',
    strength: '10 mg per metered spray (10% w/v)',
    dosageForm: 'Mucosal spray, solution',
    route: 'Topical / Oromucosal',
    packSize: '1 bottle x 50 mL (approx. 500 metered sprays)',
    approvedIndications:
      'Surface anesthesia of mucous membranes in dental procedures, otorhinolaryngology (puncture of maxillary sinus, minor nasal/pharyngeal procedures), endoscopy and instrumentation of upper respiratory or upper GI tract, and obstetrics (during final stages of delivery and before episiotomy/perineal suturing).',
    usualAdultDose:
      '1 to 20 metered sprays (10–200 mg lidocaine base) applied to the mucous membrane depending on the area and procedure (dentistry: 1–5 sprays; ENT/endoscopy: 2–6 sprays; obstetrics: up to 20 sprays). Maximum 20 sprays (200 mg) in adults.',
    contraindications:
      'Hypersensitivity to amide-type local anesthetics or any excipient.',
    commonAdverseEffects:
      'Transient local burning/stinging sensation at site of application, sore throat, hoarseness, loss of pharyngeal/laryngeal reflex, and rare allergic reactions.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['ENT (Otolaryngology)', 'Anesthesiology', 'Gastroenterology', 'Obstetrics & Gynecology'],
    sourceTitle: 'Xylocaine 10% Spray (lidocaine) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1025/smpc',
  },
  {
    brandName: 'Xylocaine 2% Injection',
    brandNameAr: 'زايلوكايين ٢٪ محلول للحقن الموضعي',
    genericName: 'Lidocaine hydrochloride',
    activeIngredients: ['Lidocaine hydrochloride'],
    drugClass: 'Local Anesthetics (Amide Type)',
    strength: '20 mg / mL (2%)',
    dosageForm: 'Solution for injection',
    route: 'Infiltration / Perineural / Epidural',
    packSize: '5 vials x 20 mL',
    approvedIndications:
      'Local and regional anesthesia by infiltration, peripheral nerve block, and central neural block (epidural/caudal).',
    usualAdultDose:
      'Individualized according to block type and vascularity of tissues. Maximum single recommended dose of plain lidocaine HCl without adrenaline in adults is 4.5 mg/kg (up to 300 mg total).',
    contraindications:
      'Hypersensitivity to amide-type local anesthetics; severe sinoatrial, atrioventricular, or intraventricular heart block without pacemaker; uncorrected hypovolemia or coagulopathy (for regional/epidural blocks).',
    commonAdverseEffects:
      'Hypotension, bradycardia, paresthesia, dizziness, nausea, vomiting, and CNS excitation/depression if inadvertent intravascular injection occurs.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Anesthesiology', 'General Surgery', 'Emergency Medicine'],
    sourceTitle: 'Xylocaine Injection (lidocaine HCl) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/006488s096lbl.pdf',
  },
  {
    brandName: 'Marcaine 0.5% Spinal Heavy',
    brandNameAr: 'ماركايين ٠.٥٪ سباينل هيفي أمبولات للتخدير النصفي',
    genericName: 'Bupivacaine hydrochloride + Dextrose',
    activeIngredients: ['Bupivacaine hydrochloride', 'Glucose monohydrate'],
    drugClass: 'Long-Acting Local Anesthetics',
    strength: '5 mg / mL (0.5%) hyperbaric',
    dosageForm: 'Solution for intrathecal (spinal) injection',
    route: 'Intrathecal (Spinal)',
    packSize: '5 ampoules x 4 mL',
    approvedIndications:
      'Intrathecal (subarachnoid/spinal) anesthesia for surgical and obstetric procedures (lower limb surgery, urological surgery, lower abdominal surgery, and Cesarean section).',
    usualAdultDose:
      'Urological / lower limb surgery: 1.5–3 mL (7.5–15 mg). Lower abdominal surgery / Cesarean section: 2–4 mL (10–20 mg) injected intrathecally into the L3–L4 intervertebral space.',
    contraindications:
      'Hypersensitivity to amide-type local anesthetics; general contraindications to intrathecal anesthesia (acute active CNS disease such as meningitis or intracranial hemorrhage, local infection at puncture site, septicemia, uncorrected hypovolemia/shock, coagulation disorders).',
    commonAdverseEffects:
      'Hypotension, bradycardia, nausea, vomiting, post-dural puncture headache, urinary retention, back pain, and transient paresthesia.',
    storageConditions: 'Store below 25°C. Do not freeze.',
    specialties: ['Anesthesiology', 'Obstetrics & Gynecology', 'General Surgery', 'Urology'],
    sourceTitle: 'Marcaine Spinal Heavy 0.5% (bupivacaine HCl) — Official SmPC Summary',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/1039/smpc',
  },
  {
    brandName: 'Naropin 0.2% (2 mg/mL)',
    brandNameAr: 'ناروبين ٠.٢٪ محلول للحقن والتسريب فوق الجافية',
    genericName: 'Ropivacaine hydrochloride',
    activeIngredients: ['Ropivacaine hydrochloride'],
    drugClass: 'Long-Acting Local Anesthetics',
    strength: '2 mg / mL (0.2%)',
    dosageForm: 'Solution for injection / infusion',
    route: 'Epidural / Perineural / Infiltration',
    packSize: '5 Polyamp ampoules x 20 mL',
    approvedIndications:
      'Acute pain management in adults and pediatric patients: continuous epidural infusion or intermittent bolus administration for postoperative pain or labor analgesia, field block, and continuous peripheral nerve block.',
    usualAdultDose:
      'Lumbar epidural infusion for postoperative pain or labor analgesia: bolus 10–20 mL (20–40 mg) followed by continuous infusion of 6–14 mL/h (12–28 mg/h). Peripheral nerve block infusion: 5–10 mL/h (10–20 mg/h).',
    contraindications:
      'Hypersensitivity to ropivacaine or other amide local anesthetics; general contraindications to epidural/regional anesthesia; intravenous regional anesthesia (Bier’s block); obstetric paracervical anesthesia; hypovolemia.',
    commonAdverseEffects:
      'Hypotension, nausea, vomiting, bradycardia, pyrexia, headache, paresthesia, dizziness, pruritus, and urinary retention.',
    storageConditions: 'Store below 30°C. Do not freeze.',
    specialties: ['Anesthesiology', 'Obstetrics & Gynecology', 'General Surgery'],
    sourceTitle: 'Naropin (ropivacaine HCl) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/020533s035lbl.pdf',
  },
  {
    brandName: 'Diprivan 1% (10 mg/mL)',
    brandNameAr: 'ديبريفان ١٪ مستحلب للحقن والتسريب الوريدي',
    genericName: 'Propofol',
    activeIngredients: ['Propofol'],
    drugClass: 'Intravenous General Anesthetics',
    strength: '10 mg / mL (1%)',
    dosageForm: 'Emulsion for intravenous injection or infusion',
    route: 'Intravenous',
    packSize: '5 ampoules x 20 mL (200 mg/20 mL)',
    approvedIndications:
      'Induction and maintenance of general anesthesia in adults and children >1 month; sedation for diagnostic and surgical procedures; sedation of ventilated patients >16 years of age in the intensive care unit.',
    usualAdultDose:
      'Anesthesia induction (adults <55 years): 1.5–2.5 mg/kg titrated IV (40 mg every 10 seconds) until clinical onset. Anesthesia maintenance: continuous IV infusion of 4–12 mg/kg/h. ICU sedation: 0.3–4.0 mg/kg/h IV infusion.',
    contraindications:
      'Hypersensitivity to propofol, soya, or peanut (refined soya-bean oil excipient); sedation of ventilated children and adolescents ≤16 years of age in intensive care.',
    commonAdverseEffects:
      'Local pain on induction injection, hypotension, bradycardia, transient apnea during induction, nausea and vomiting during recovery, headache, and propofol infusion syndrome with prolonged high-dose ICU infusions.',
    storageConditions: 'Store between 2°C and 25°C. Do not freeze. Shake before use.',
    specialties: ['Anesthesiology', 'Emergency Medicine', 'General Surgery'],
    sourceTitle: 'Diprivan (propofol injectable emulsion) — FDA Prescribing Information',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/019627s069lbl.pdf',
  },
  {
    brandName: 'Meronem 1 g IV',
    brandNameAr: 'ميرونيم ١ غرام فيال للزرق والتسريب الوريدي',
    genericName: 'Meropenem trihydrate',
    activeIngredients: ['Meropenem'],
    drugClass: 'Carbapenem Antibacterials',
    strength: '1 g',
    dosageForm: 'Powder for solution for injection or infusion',
    route: 'Intravenous',
    packSize: '10 vials x 1 g',
    approvedIndications:
      'Severe hospital infections in adults and children ≥3 months: severe pneumonia (including hospital- and ventilator-associated pneumonia), complicated urinary tract infections, complicated intra-abdominal infections, intra- and post-partum infections, complicated skin and soft tissue infections, acute bacterial meningitis, and febrile neutropenic patients.',
    usualAdultDose:
      '500 mg to 1 g administered intravenously every 8 hours over 15–30 minutes (or bolus over 5 minutes); 2 g every 8 hours for acute bacterial meningitis or bronchopulmonary infections in cystic fibrosis. Adjust dosing interval/dose when CrCl ≤ 50 mL/min.',
    contraindications:
      'Hypersensitivity to meropenem or any other carbapenem antibacterial agent; severe hypersensitivity (e.g., anaphylactic reaction, severe skin reaction) to any other type of beta-lactam antibacterial agent (penicillins or cephalosporins).',
    commonAdverseEffects:
      'Thrombocythemia, headache, diarrhea, vomiting, nausea, abdominal pain, elevated transaminases (ALT, AST, alkaline phosphatase, LDH), rash, pruritus, and injection/infusion site inflammation.',
    storageConditions: 'Store below 30°C. Do not freeze reconstituted solution.',
    specialties: ['Internal Medicine', 'Pulmonology', 'General Surgery', 'Emergency Medicine', 'Urology'],
    sourceTitle: 'Meronem (meropenem) — EMA Official Referral & SmPC Information',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/meronem',
  },
];

export const CHAT_CURATED_COMPANIES: CuratedCompanyEntry[] = [
  {
    key: 'astrazeneca',
    companyName: 'AstraZeneca',
    legalName: 'AstraZeneca PLC',
    websiteUrl: 'https://www.astrazeneca.com',
    description:
      'British-Swedish multinational pharmaceutical and biotechnology manufacturer (Cambridge, UK) supplying originator gastroenterology, cardiovascular, renal, metabolic, respiratory, and oncology medicines in Iraq.',
    products: ASTRAZENECA_COMPACT_PRODUCTS.map(toAiProductDraft),
  },
  {
    key: 'sanofi',
    companyName: 'Sanofi',
    legalName: 'Sanofi S.A.',
    websiteUrl: 'https://www.sanofi.com',
    description:
      'French multinational pharmaceutical and healthcare manufacturer (Paris, France) supplying originator cardiovascular, thrombosis, diabetes/insulin, neurology, allergy, gastroenterology, anti-infective, immunology, and oncology medicines in Iraq.',
    products: SANOFI_PRODUCTS,
  },
];

const REMOVED_COMPANY_STORAGE_PREFIX = 'pharmaconnect_chat_company_removed_';

export function markChatCompanyRemoved(companyName: string): void {
  try {
    const entry = CHAT_CURATED_COMPANIES.find(
      (c) =>
        c.companyName.trim().toLowerCase() === companyName.trim().toLowerCase()
    );
    if (entry && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(
        `${REMOVED_COMPANY_STORAGE_PREFIX}${entry.key}`,
        '1'
      );
    }
  } catch {
    // Ignore storage errors
  }
}

export function clearChatCompanyRemovedFlags(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (const entry of CHAT_CURATED_COMPANIES) {
        window.localStorage.removeItem(
          `${REMOVED_COMPANY_STORAGE_PREFIX}${entry.key}`
        );
      }
    }
  } catch {
    // Ignore storage errors
  }
}

export function isChatCompanyMarkedRemoved(key: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (
        window.localStorage.getItem(`${REMOVED_COMPANY_STORAGE_PREFIX}${key}`) ===
        '1'
      );
    }
  } catch {
    // Ignore storage errors
  }
  return false;
}

export function getMissingChatCatalogSummary(bundle: CatalogBundle | null): {
  missingCompanyCount: number;
  missingProductCount: number;
  companyNames: string[];
} {
  if (!bundle) {
    return { missingCompanyCount: 0, missingProductCount: 0, companyNames: [] };
  }

  let missingCompanyCount = 0;
  let missingProductCount = 0;
  const companyNames: string[] = [];

  for (const curated of CHAT_CURATED_COMPANIES) {
    const existingCompany = bundle.companies.find(
      (c) =>
        c.companyName.trim().toLowerCase() ===
        curated.companyName.trim().toLowerCase()
    );

    if (!existingCompany) {
      missingCompanyCount += 1;
      missingProductCount += curated.products.length;
      companyNames.push(curated.companyName);
      continue;
    }

    const companyProducts = bundle.products.filter(
      (p) => p.companyId === existingCompany.id
    );
    let companyMissingProducts = 0;
    for (const draft of curated.products) {
      const exists = companyProducts.some(
        (p) =>
          p.brandNameEn.trim().toLowerCase() ===
          draft.brandName.trim().toLowerCase()
      );
      if (!exists) {
        companyMissingProducts += 1;
      }
    }
    if (companyMissingProducts > 0) {
      missingProductCount += companyMissingProducts;
      companyNames.push(curated.companyName);
    }
  }

  return { missingCompanyCount, missingProductCount, companyNames };
}

export async function syncChatApprovedCatalog(
  client: SupabaseClient,
  existingBundle: CatalogBundle,
  options?: {
    forceIncludeRemoved?: boolean;
    onProgress?: (statusText: string) => void;
  }
): Promise<{
  companiesAdded: number;
  productsAdded: number;
  errors: string[];
}> {
  let companiesAdded = 0;
  let productsAdded = 0;
  const errors: string[] = [];

  for (const curated of CHAT_CURATED_COMPANIES) {
    if (
      !options?.forceIncludeRemoved &&
      isChatCompanyMarkedRemoved(curated.key)
    ) {
      continue;
    }

    let company = existingBundle.companies.find(
      (c) =>
        c.companyName.trim().toLowerCase() ===
        curated.companyName.trim().toLowerCase()
    );

    if (!company) {
      options?.onProgress?.(`Adding company ${curated.companyName}…`);
      const createRes = await rpcAdminCreateCompany(client, {
        companyName: curated.companyName,
        legalName: curated.legalName,
        websiteUrl: curated.websiteUrl,
        description: curated.description,
      });
      if (!createRes.ok) {
        errors.push(`${curated.companyName}: ${createRes.message}`);
        continue;
      }
      company = createRes.data;
      companiesAdded += 1;
    }

    const existingCompanyProducts = existingBundle.products.filter(
      (p) => p.companyId === company!.id
    );

    for (let i = 0; i < curated.products.length; i += 1) {
      const draft = curated.products[i];
      const alreadyPresent = existingCompanyProducts.some(
        (p) =>
          p.brandNameEn.trim().toLowerCase() ===
          draft.brandName.trim().toLowerCase()
      );
      if (alreadyPresent) {
        continue;
      }

      options?.onProgress?.(
        `Adding ${curated.companyName} (${i + 1}/${curated.products.length}): ${draft.brandName}…`
      );

      const saveRes = await rpcAdminSaveAiProductDraft(client, {
        companyId: company.id,
        draft,
        sources: draft.sources,
        model: 'curated-official-smpc',
      });

      if (!saveRes.ok) {
        errors.push(`${draft.brandName}: ${saveRes.message}`);
      } else if (saveRes.data.outcome === 'created') {
        productsAdded += 1;
      }
    }
  }

  return { companiesAdded, productsAdded, errors };
}
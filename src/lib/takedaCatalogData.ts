import type { AiDraftSource, AiProductDraft } from './catalog';

const SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactDrug {
  brandName: string;
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
  notes: string;
}

const TAKEDA_COMPACT_DRUGS: CompactDrug[] = [
  // =========================================================================
  // 1. GASTROENTEROLOGY — PROTON PUMP INHIBITORS & BIOLOGICS
  // =========================================================================
  {
    brandName: 'Pantoloc 20 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 gastro-resistant tablets',
    approvedIndications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis in adults and adolescents aged 12 years and above; prevention of gastroduodenal ulcers induced by non-selective non-steroidal anti-inflammatory drugs (NSAIDs) in continuous NSAID-treated patients at increased risk in adults.',
    usualAdultDose:
      'Symptomatic GORD: 20 mg once daily for 2 to 4 weeks (up to 4 additional weeks if required). Long-term management and relapse prevention in reflux oesophagitis: 20 mg once daily (increased to 40 mg daily if relapse occurs). NSAID ulcer prophylaxis: 20 mg once daily. Swallow whole 1 hour before a meal with water; do not chew or crush.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    commonAdverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension and bloating, constipation, dry mouth, abdominal pain and discomfort, rash, pruritus, asthenia, fatigue.',
    storageConditions:
      'No special temperature storage conditions required. Store in the original blister package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Pantoloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/pantoloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited gastro-resistant tablet presentation.',
  },
  {
    brandName: 'Pantoloc 40 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 gastro-resistant tablets',
    approvedIndications:
      'Reflux oesophagitis in adults and adolescents aged 12 years and above; eradication of Helicobacter pylori in combination with appropriate antibiotic therapy in adults with peptic ulcer; gastric and duodenal ulcer in adults; Zollinger-Ellison syndrome and other pathological hypersecretory conditions in adults.',
    usualAdultDose:
      'Reflux oesophagitis and gastric ulcer: 40 mg once daily for 4 to 8 weeks. Duodenal ulcer: 40 mg once daily for 2 to 4 weeks. H. pylori eradication: 40 mg twice daily for 7 to 14 days in combination with two antibiotics. Zollinger-Ellison syndrome: initially 80 mg daily, titrated to acid output. Swallow whole 1 hour before a meal.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient, or to any of the combination partners in H. pylori eradication regimens.',
    commonAdverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, flatulence, constipation, abdominal pain, elevated hepatic transaminases (rarely), vitamin B12 or magnesium deficiency with prolonged therapy.',
    storageConditions:
      'No special temperature storage conditions required. Store in the original blister package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Pantoloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/pantoloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited 40 mg gastro-resistant tablet presentation.',
  },
  {
    brandName: 'Pantoloc 40 mg Powder for Solution for Injection',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Powder for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 glass vial containing 40 mg powder for solution for injection',
    approvedIndications:
      'Reflux oesophagitis; gastric and duodenal ulcer; Zollinger-Ellison syndrome and other pathological hypersecretory conditions in adults when oral administration is not appropriate.',
    usualAdultDose:
      'Duodenal ulcer, gastric ulcer, and reflux oesophagitis: 40 mg once daily intravenously over 2 to 15 minutes after reconstitution with 10 mL of 0.9% sodium chloride solution. Zollinger-Ellison syndrome: initially 80 mg daily intravenously (divided if >80 mg/day). Switch to oral Pantoloc 40 mg as soon as oral therapy is feasible.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    commonAdverseEffects:
      'Injection site thrombophlebitis, benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal pain, constipation, flatulence.',
    storageConditions:
      'Do not store above 25°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Critical Care Medicine', 'General Surgery'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Pantoloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/pantoloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited 40 mg intravenous vial presentation.',
  },
  {
    brandName: 'Controloc 20 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 gastro-resistant tablets',
    approvedIndications:
      'Symptomatic gastro-oesophageal reflux disease (GORD); long-term management and prevention of relapse in reflux oesophagitis in adults and adolescents aged 12 years and above; prevention of gastroduodenal ulcers induced by non-selective NSAIDs in patients at risk requiring continuous NSAID treatment.',
    usualAdultDose:
      '20 mg once daily taken 1 hour before a meal with water (swallowed whole without chewing or crushing). Symptomatic GORD: 2 to 4 weeks. Long-term maintenance of reflux oesophagitis: 20 mg once daily.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    commonAdverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal distension, constipation, dry mouth, abdominal pain.',
    storageConditions:
      'No special temperature storage conditions required. Store in the original blister package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Controloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/controloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited regional trade name (Controloc) for pantoprazole 20 mg gastro-resistant tablets.',
  },
  {
    brandName: 'Controloc 40 mg',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 gastro-resistant tablets',
    approvedIndications:
      'Reflux oesophagitis in adults and adolescents aged 12 years and above; eradication of Helicobacter pylori in combination with two appropriate antibiotics in adults with peptic ulcer disease; gastric and duodenal ulcer in adults; Zollinger-Ellison syndrome and other pathological hypersecretory conditions.',
    usualAdultDose:
      'Reflux oesophagitis, gastric ulcer, and duodenal ulcer: 40 mg once daily taken 1 hour before a meal. H. pylori eradication: 40 mg twice daily for 7 to 14 days with combination antibiotic therapy. Zollinger-Ellison syndrome: initially 80 mg daily, adjusted as needed.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    commonAdverseEffects:
      'Benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, flatulence, constipation, abdominal discomfort, sleep disorders.',
    storageConditions:
      'No special temperature storage conditions required. Store in the original blister package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Controloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/controloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited regional trade name (Controloc) for pantoprazole 40 mg gastro-resistant tablets.',
  },
  {
    brandName: 'Controloc 40 mg Powder for Solution for Injection',
    genericName: 'Pantoprazole',
    activeIngredients: ['Pantoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '40 mg',
    dosageForm: 'Powder for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 glass vial containing 40 mg powder for solution for injection',
    approvedIndications:
      'Reflux oesophagitis; gastric and duodenal ulcer; Zollinger-Ellison syndrome and other pathological hypersecretory conditions in adults when oral administration is not appropriate.',
    usualAdultDose:
      '40 mg once daily intravenously over 2 to 15 minutes after reconstitution with 10 mL physiological sodium chloride (0.9%) solution. Zollinger-Ellison syndrome: initially 80 mg daily intravenously. Transition to oral Controloc 40 mg as soon as clinically feasible.',
    contraindications:
      'Hypersensitivity to pantoprazole, substituted benzimidazoles, or any excipient.',
    commonAdverseEffects:
      'Injection site thrombophlebitis, benign fundic gland polyps, headache, dizziness, diarrhoea, nausea, vomiting, abdominal pain.',
    storageConditions:
      'Do not store above 25°C. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Critical Care Medicine', 'General Surgery'],
    sourceTitle: 'EMA Article 30 Referral Assessment — Controloc (Pantoprazole) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/referrals/controloc',
    notes:
      'Originator Takeda GmbH / Takeda Pharmaceutical Company Limited intravenous vial presentation under the Controloc trade name.',
  },
  {
    brandName: 'Dexilant 30 mg',
    genericName: 'Dexlansoprazole',
    activeIngredients: ['Dexlansoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '30 mg',
    dosageForm: 'Modified-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 28 modified-release hard capsules',
    approvedIndications:
      'Maintenance of healed erosive oesophagitis and relief of heartburn for up to 6 months; treatment of heartburn associated with symptomatic non-erosive gastro-oesophageal reflux disease (GERD) for 4 weeks in adults and adolescents aged 12 years and older.',
    usualAdultDose:
      'Maintenance of healed erosive oesophagitis: 30 mg once daily for up to 6 months (or 60 mg once daily in moderate-to-severe erosive oesophagitis). Symptomatic non-erosive GERD: 30 mg once daily for 4 weeks. May be taken without regard to food; swallow whole or open capsule and sprinkle granules on a tablespoon of applesauce.',
    contraindications:
      'Hypersensitivity to dexlansoprazole or any excipient; concomitant use with rilpivirine-containing products.',
    commonAdverseEffects:
      'Diarrhoea, abdominal pain, nausea, upper respiratory tract infection, vomiting, flatulence, headache, benign fundic gland polyps.',
    storageConditions:
      'Store at 20°C to 25°C (excursions permitted between 15°C and 30°C). Keep in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'FDA Prescribing Information — Dexilant (Dexlansoprazole Delayed-Release Capsules)',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/022287s036lbl.pdf',
    notes:
      'Originator Takeda dual delayed-release (DDR) proton pump inhibitor capsule presentation.',
  },
  {
    brandName: 'Dexilant 60 mg',
    genericName: 'Dexlansoprazole',
    activeIngredients: ['Dexlansoprazole'],
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    strength: '60 mg',
    dosageForm: 'Modified-release hard capsule',
    route: 'Oral',
    packSize: 'Blister pack of 28 modified-release hard capsules',
    approvedIndications:
      'Healing of all grades of erosive oesophagitis for up to 8 weeks in adults and adolescents aged 12 years and older; maintenance of healed moderate-to-severe erosive oesophagitis.',
    usualAdultDose:
      'Healing of erosive oesophagitis: 60 mg once daily for up to 8 weeks. In patients with moderate or severe hepatic impairment (Child-Pugh Class B), maximum recommended dose is 30 mg once daily. Take without regard to meals.',
    contraindications:
      'Hypersensitivity to dexlansoprazole or any excipient; concomitant use with rilpivirine-containing products.',
    commonAdverseEffects:
      'Diarrhoea, abdominal pain, nausea, upper respiratory tract infection, vomiting, flatulence, headache, benign fundic gland polyps, hypomagnesaemia with long-term therapy.',
    storageConditions:
      'Store at 20°C to 25°C (excursions permitted between 15°C and 30°C). Keep in the original package to protect from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
    sourceTitle: 'FDA Prescribing Information — Dexilant (Dexlansoprazole Delayed-Release Capsules)',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/022287s036lbl.pdf',
    notes:
      'Originator Takeda 60 mg dual delayed-release capsule presentation for healing of erosive oesophagitis.',
  },
  {
    brandName: 'Entyvio 300 mg',
    genericName: 'Vedolizumab',
    activeIngredients: ['Vedolizumab'],
    drugClass: 'Integrin Receptor Antagonists (Selective Immunosuppressants)',
    strength: '300 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 300 mg powder',
    approvedIndications:
      'Treatment of adult patients with moderately to severely active ulcerative colitis or moderately to severely active Crohn’s disease who have had an inadequate response with, lost response to, or were intolerant to either conventional therapy or a tumour necrosis factor-alpha (TNFα) antagonist; treatment of adult patients with moderately to severely active chronic pouchitis after proctocolectomy and ileal pouch-anal anastomosis for ulcerative colitis.',
    usualAdultDose:
      '300 mg administered by intravenous infusion over 30 minutes at Weeks 0, 2, and 6, and every 8 weeks thereafter. Patients who experience a decrease in response may benefit from an increase in dosing frequency to 300 mg every 4 weeks.',
    contraindications:
      'Hypersensitivity to vedolizumab or any excipient; active severe infections such as tuberculosis, sepsis, cytomegalovirus, listeriosis, and opportunistic infections such as progressive multifocal leukoencephalopathy (PML).',
    commonAdverseEffects:
      'Nasopharyngitis, headache, arthralgia, upper respiratory tract infection, bronchitis, gastroenteritis, influenza, sinusitis, cough, oropharyngeal pain, nausea, rash, pruritus, back pain, pain in extremities, pyrexia, fatigue.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Entyvio (Vedolizumab) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/entyvio',
    notes:
      'Originator Takeda gut-selective humanised monoclonal antibody (α4β7 integrin antagonist) 300 mg intravenous vial presentation.',
  },
  {
    brandName: 'Entyvio 108 mg',
    genericName: 'Vedolizumab',
    activeIngredients: ['Vedolizumab'],
    drugClass: 'Integrin Receptor Antagonists (Selective Immunosuppressants)',
    strength: '108 mg / 0.68 mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 single-use pre-filled pen (0.68 mL)',
    approvedIndications:
      'Maintenance treatment of adult patients with moderately to severely active ulcerative colitis or moderately to severely active Crohn’s disease who have had an inadequate response with, lost response to, or were intolerant to either conventional therapy or a TNFα antagonist, following at least 2 intravenous infusions of Entyvio.',
    usualAdultDose:
      'Following at least 2 intravenous infusions of Entyvio 300 mg, the recommended subcutaneous maintenance regimen is 108 mg administered by subcutaneous injection once every 2 weeks, starting at the time of the next scheduled intravenous infusion.',
    contraindications:
      'Hypersensitivity to vedolizumab or any excipient; active severe infections such as tuberculosis, sepsis, cytomegalovirus, listeriosis, and opportunistic infections such as PML.',
    commonAdverseEffects:
      'Injection site erythema, pain, pruritus, or swelling, nasopharyngitis, upper respiratory tract infection, headache, arthralgia, pyrexia, fatigue.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton to protect from light. May be stored at room temperature (up to 25°C) for up to 7 days if needed.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Entyvio (Vedolizumab) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/entyvio',
    notes:
      'Originator Takeda subcutaneous maintenance pre-filled pen presentation.',
  },

  // =========================================================================
  // 2. CARDIOVASCULAR — HYPERTENSION (ARBs & COMBINATIONS)
  // =========================================================================
  {
    brandName: 'Edarbi 40 mg',
    genericName: 'Azilsartan',
    activeIngredients: ['Azilsartan'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '40 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 tablets (with desiccant)',
    approvedIndications:
      'Treatment of essential hypertension in adults.',
    usualAdultDose:
      'Recommended starting dose is 40 mg once daily, with or without food. The dose may be increased to a maximum of 80 mg once daily in patients whose blood pressure is not adequately controlled at 40 mg once daily (20 mg once daily starting dose considered in very elderly ≥75 years, mild-to-moderate hepatic impairment, or intravascular volume depletion).',
    contraindications:
      'Hypersensitivity to azilsartan medoxomil or any excipient; second and third trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    commonAdverseEffects:
      'Dizziness, diarrhoea, increased blood creatine phosphokinase, hypotension (particularly in volume- or salt-depleted patients), peripheral oedema, fatigue.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture. No special temperature storage conditions required.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Family Medicine'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Edarbi (Azilsartan Medoxomil) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/edarbi',
    notes:
      'Originator Takeda angiotensin II receptor antagonist 40 mg tablet presentation (contains azilsartan medoxomil potassium equivalent to 40 mg azilsartan medoxomil).',
  },
  {
    brandName: 'Edarbi 80 mg',
    genericName: 'Azilsartan',
    activeIngredients: ['Azilsartan'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    strength: '80 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 tablets (with desiccant)',
    approvedIndications:
      'Treatment of essential hypertension in adults.',
    usualAdultDose:
      '80 mg once daily (maximum recommended daily dose), taken with or without food, as monotherapy or in combination with other antihypertensive medicinal products (particularly diuretics such as chlortalidone or hydrochlorothiazide, or calcium channel blockers).',
    contraindications:
      'Hypersensitivity to azilsartan medoxomil or any excipient; second and third trimesters of pregnancy; concomitant use with aliskiren-containing products in patients with diabetes mellitus or renal impairment (GFR < 60 mL/min/1.73 m²).',
    commonAdverseEffects:
      'Dizziness, diarrhoea, increased blood creatine phosphokinase, hypotension, nausea, rash, pruritus, muscle spasms, increased blood creatinine and uric acid.',
    storageConditions:
      'Store in the original package in order to protect from light and moisture. No special temperature storage conditions required.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Family Medicine'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Edarbi (Azilsartan Medoxomil) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/edarbi',
    notes:
      'Originator Takeda maximum-strength 80 mg tablet presentation.',
  },
  {
    brandName: 'Edarbyclor 40 mg / 12.5 mg',
    genericName: 'Azilsartan + Chlortalidone',
    activeIngredients: ['Azilsartan', 'Chlortalidone'],
    drugClass: 'Angiotensin II Receptor Blocker and Thiazide-Like Diuretic Combinations',
    strength: '40 mg / 12.5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets',
    approvedIndications:
      'Treatment of hypertension in adults to lower blood pressure in patients not adequately controlled on monotherapy or as initial therapy in patients likely to need multiple drugs to achieve blood pressure goals.',
    usualAdultDose:
      'Recommended starting dose is 40 mg / 12.5 mg once daily, taken with or without food. May be titrated to 40 mg / 25 mg once daily after 2 to 4 weeks if additional blood pressure reduction is required.',
    contraindications:
      'Hypersensitivity to azilsartan, chlortalidone, or sulfonamide-derived drugs; anuria; pregnancy; concomitant use with aliskiren in patients with diabetes.',
    commonAdverseEffects:
      'Dizziness, increased blood creatinine, fatigue, hypotension, hypokalaemia, hyperuricaemia, diarrhoea, nausea, muscle spasms.',
    storageConditions:
      'Store at 20°C to 25°C in the tightly closed original container to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Family Medicine'],
    sourceTitle: 'FDA Prescribing Information — Edarbyclor (Azilsartan Medoxomil and Chlorthalidone Tablets)',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/202331s012lbl.pdf',
    notes:
      'Fixed-dose combination of azilsartan medoxomil and the long-acting thiazide-like diuretic chlortalidone.',
  },
  {
    brandName: 'Edarbyclor 40 mg / 25 mg',
    genericName: 'Azilsartan + Chlortalidone',
    activeIngredients: ['Azilsartan', 'Chlortalidone'],
    drugClass: 'Angiotensin II Receptor Blocker and Thiazide-Like Diuretic Combinations',
    strength: '40 mg / 25 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 28 film-coated tablets',
    approvedIndications:
      'Treatment of hypertension in adults requiring additional blood pressure lowering beyond Edarbyclor 40 mg / 12.5 mg or high-dose monotherapy.',
    usualAdultDose:
      'One 40 mg / 25 mg tablet once daily, with or without food (maximum recommended daily dose). Monitor serum electrolytes and renal function periodically.',
    contraindications:
      'Hypersensitivity to azilsartan, chlortalidone, or sulfonamide-derived drugs; anuria; pregnancy; concomitant use with aliskiren in patients with diabetes.',
    commonAdverseEffects:
      'Dizziness, increased blood creatinine and blood urea nitrogen, hypokalaemia, hyperuricaemia, hypotension, fatigue, muscle spasms, diarrhoea.',
    storageConditions:
      'Store at 20°C to 25°C in the tightly closed original container to protect from light and moisture.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology', 'Family Medicine'],
    sourceTitle: 'FDA Prescribing Information — Edarbyclor (Azilsartan Medoxomil and Chlorthalidone Tablets)',
    sourceUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/202331s012lbl.pdf',
    notes:
      'High-strength 40 mg / 25 mg fixed-dose combination tablet presentation.',
  },

  // =========================================================================
  // 3. ONCOLOGY & HAEMATOLOGIC MALIGNANCIES
  // =========================================================================
  {
    brandName: 'Ninlaro 2.3 mg',
    genericName: 'Ixazomib',
    activeIngredients: ['Ixazomib'],
    drugClass: 'Proteasome Inhibitors',
    strength: '2.3 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Wallet pack of 3 hard capsules (3 individual blister wallets for 1 cycle)',
    approvedIndications:
      'In combination with lenalidomide and dexamethasone for the treatment of adult patients with multiple myeloma who have received at least one prior therapy.',
    usualAdultDose:
      '2.3 mg is the reduced dose level used for toxicity management or in patients with severe renal impairment (creatinine clearance < 30 mL/min, including end-stage renal disease requiring dialysis). Taken orally once a week on Days 1, 8, and 15 of a 28-day treatment cycle, at least 1 hour before or at least 2 hours after food.',
    contraindications:
      'Hypersensitivity to ixazomib or any excipient.',
    commonAdverseEffects:
      'Diarrhoea, constipation, thrombocytopenia, peripheral neuropathy, nausea, peripheral oedema, vomiting, back pain, upper respiratory tract infection, rash.',
    storageConditions:
      'Do not store above 30°C. Do not freeze. Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Ninlaro (Ixazomib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ninlaro',
    notes:
      'Originator Takeda oral proteasome inhibitor 2.3 mg dose-reduction/renal-impairment capsule presentation (contains ixazomib citrate equivalent to 2.3 mg ixazomib).',
  },
  {
    brandName: 'Ninlaro 3 mg',
    genericName: 'Ixazomib',
    activeIngredients: ['Ixazomib'],
    drugClass: 'Proteasome Inhibitors',
    strength: '3 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Wallet pack of 3 hard capsules (3 individual blister wallets for 1 cycle)',
    approvedIndications:
      'In combination with lenalidomide and dexamethasone for the treatment of adult patients with multiple myeloma who have received at least one prior therapy.',
    usualAdultDose:
      '3 mg is the first reduced dose level from 4 mg for adverse event management, or the recommended starting dose in patients with moderate or severe hepatic impairment or severe renal impairment (creatinine clearance < 30 mL/min). Taken orally once a week on Days 1, 8, and 15 of a 28-day cycle at least 1 hour before or at least 2 hours after food.',
    contraindications:
      'Hypersensitivity to ixazomib or any excipient.',
    commonAdverseEffects:
      'Diarrhoea, constipation, thrombocytopenia, peripheral neuropathy, nausea, peripheral oedema, vomiting, back pain, upper respiratory tract infection, rash, herpes zoster reactivation (antiviral prophylaxis recommended).',
    storageConditions:
      'Do not store above 30°C. Do not freeze. Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Ninlaro (Ixazomib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ninlaro',
    notes:
      'Originator Takeda oral proteasome inhibitor 3 mg hard capsule presentation.',
  },
  {
    brandName: 'Ninlaro 4 mg',
    genericName: 'Ixazomib',
    activeIngredients: ['Ixazomib'],
    drugClass: 'Proteasome Inhibitors',
    strength: '4 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Wallet pack of 3 hard capsules (3 individual blister wallets for 1 cycle)',
    approvedIndications:
      'In combination with lenalidomide and dexamethasone for the treatment of adult patients with multiple myeloma who have received at least one prior therapy.',
    usualAdultDose:
      'Recommended starting dose is 4 mg (one capsule) administered orally once a week on Days 1, 8, and 15 of a 28-day treatment cycle, in combination with lenalidomide (25 mg daily on Days 1–21) and dexamethasone (40 mg on Days 1, 8, 15, and 22). Take at least 1 hour before or at least 2 hours after food.',
    contraindications:
      'Hypersensitivity to ixazomib or any excipient.',
    commonAdverseEffects:
      'Diarrhoea, constipation, thrombocytopenia, neutropenia, peripheral neuropathy, nausea, peripheral oedema, vomiting, back pain, upper respiratory tract infection, rash.',
    storageConditions:
      'Do not store above 30°C. Do not freeze. Store in the original package in order to protect from moisture.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Ninlaro (Ixazomib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ninlaro',
    notes:
      'Originator Takeda standard starting-dose 4 mg oral proteasome inhibitor capsule presentation.',
  },
  {
    brandName: 'Alunbrig 30 mg',
    genericName: 'Brigatinib',
    activeIngredients: ['Brigatinib'],
    drugClass: 'ALK Tyrosine Kinase Inhibitors',
    strength: '30 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 film-coated tablets',
    approvedIndications:
      'Monotherapy for the treatment of adult patients with anaplastic lymphoma kinase (ALK)-positive advanced non-small cell lung cancer (NSCLC) previously not treated with an ALK inhibitor, or previously treated with crizotinib.',
    usualAdultDose:
      'Used for dose modifications (60 mg once daily via two 30 mg tablets, or 120 mg once daily via 90 mg + 30 mg) or severe hepatic/renal impairment adjustments. Standard regimen begins at 90 mg once daily for the first 7 days, then 180 mg once daily.',
    contraindications:
      'Hypersensitivity to brigatinib or any excipient.',
    commonAdverseEffects:
      'Hyperglycaemia, hyperinsulinaemia, anaemia, headache, peripheral neuropathy, dizziness, visual disturbances, hypertension, cough, dyspnoea, interstitial lung disease / pneumonitis, diarrhoea, nausea, vomiting, constipation, elevated CPK, lipase, amylase, AST/ALT, rash, myalgia, arthralgia, fatigue.',
    storageConditions:
      'No special storage conditions required.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Alunbrig (Brigatinib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alunbrig',
    notes:
      'Originator Takeda next-generation ALK/ROS1 tyrosine kinase inhibitor 30 mg tablet presentation.',
  },
  {
    brandName: 'Alunbrig 90 mg',
    genericName: 'Brigatinib',
    activeIngredients: ['Brigatinib'],
    drugClass: 'ALK Tyrosine Kinase Inhibitors',
    strength: '90 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 film-coated tablets',
    approvedIndications:
      'Monotherapy for the treatment of adult patients with anaplastic lymphoma kinase (ALK)-positive advanced non-small cell lung cancer (NSCLC) previously not treated with an ALK inhibitor, or previously treated with crizotinib.',
    usualAdultDose:
      '90 mg once daily for the first 7 days (lead-in phase to reduce early-onset pulmonary events); if 90 mg is tolerated during the first 7 days, increase the dose to 180 mg once daily. Also used for dose reduction from 180 mg to 90 mg once daily. Swallow whole with or without food; avoid grapefruit.',
    contraindications:
      'Hypersensitivity to brigatinib or any excipient.',
    commonAdverseEffects:
      'Elevated CPK, lipase, amylase, and transaminases, diarrhoea, nausea, cough, hypertension, bradycardia, visual disturbances, interstitial lung disease / pneumonitis, rash, fatigue.',
    storageConditions:
      'No special storage conditions required.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Alunbrig (Brigatinib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alunbrig',
    notes:
      'Originator Takeda 90 mg lead-in and dose-adjustment tablet presentation.',
  },
  {
    brandName: 'Alunbrig 180 mg',
    genericName: 'Brigatinib',
    activeIngredients: ['Brigatinib'],
    drugClass: 'ALK Tyrosine Kinase Inhibitors',
    strength: '180 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 28 film-coated tablets',
    approvedIndications:
      'Monotherapy for the treatment of adult patients with anaplastic lymphoma kinase (ALK)-positive advanced non-small cell lung cancer (NSCLC) previously not treated with an ALK inhibitor, or previously treated with crizotinib.',
    usualAdultDose:
      'Following the 7-day lead-in at 90 mg once daily, the recommended maintenance dose is 180 mg once daily until disease progression or unacceptable toxicity. Swallow whole with or without food.',
    contraindications:
      'Hypersensitivity to brigatinib or any excipient.',
    commonAdverseEffects:
      'Elevated CPK, lipase, amylase, AST/ALT, hyperglycaemia, diarrhoea, nausea, vomiting, constipation, cough, dyspnoea, interstitial lung disease / pneumonitis, hypertension, bradycardia, visual disturbances, rash, myalgia, fatigue.',
    storageConditions:
      'No special storage conditions required.',
    specialties: ['Oncology', 'Pulmonology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Alunbrig (Brigatinib) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/alunbrig',
    notes:
      'Originator Takeda full maintenance-dose 180 mg once-daily tablet presentation.',
  },
  {
    brandName: 'Adcetris 50 mg',
    genericName: 'Brentuximab vedotin',
    activeIngredients: ['Brentuximab vedotin'],
    drugClass: 'CD30-Directed Antibody-Drug Conjugates',
    strength: '50 mg',
    dosageForm: 'Powder for concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 50 mg powder',
    approvedIndications:
      'Treatment of adult patients with previously untreated CD30+ Stage III or IV classical Hodgkin lymphoma (in combination with doxorubicin, vinblastine, and dacarbazine [AVD], or with etoposide, cyclophosphamide, doxorubicin, dacarbazine, and dexamethasone [BrECADD]); consolidation of CD30+ Hodgkin lymphoma at increased risk of relapse after ASCT; relapsed or refractory CD30+ Hodgkin lymphoma; previously untreated systemic anaplastic large cell lymphoma (sALCL) or other CD30+ peripheral T-cell lymphomas in combination with CHP; relapsed or refractory sALCL; CD30+ cutaneous T-cell lymphoma (CTCL) after at least 1 prior systemic therapy.',
    usualAdultDose:
      'Monotherapy (R/R Hodgkin lymphoma, sALCL, CTCL, or post-ASCT consolidation) and sALCL in combination with CHP: 1.8 mg/kg (up to a maximum of 180 mg for patients ≥100 kg) administered by intravenous infusion over 30 minutes every 3 weeks. Previously untreated Stage III/IV Hodgkin lymphoma with AVD: 1.2 mg/kg (maximum 120 mg) on Days 1 and 15 of each 28-day cycle for 6 cycles.',
    contraindications:
      'Hypersensitivity to brentuximab vedotin or any excipient; combined use of bleomycin and Adcetris (causes pulmonary toxicity).',
    commonAdverseEffects:
      'Peripheral sensory and motor neuropathy, neutropenia, febrile neutropenia, thrombocytopenia, anaemia, upper respiratory tract infection, herpes zoster, pneumonia, diarrhoea, nausea, vomiting, constipation, abdominal pain, alopecia, rash, pruritus, myalgia, arthralgia, infusion-related reactions, pyrexia, fatigue.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Hematology', 'Oncology'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Adcetris (Brentuximab Vedotin) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adcetris',
    notes:
      'Originator Takeda CD30-directed antibody-drug conjugate (monomethyl auristatin E [MMAE] payload) 50 mg single-use vial presentation.',
  },

  // =========================================================================
  // 4. RARE DISEASES — HEREDITARY ANGIOEDEMA & LYSOSOMAL STORAGE DISORDERS
  // =========================================================================
  {
    brandName: 'Takhzyro 300 mg',
    genericName: 'Lanadelumab',
    activeIngredients: ['Lanadelumab'],
    drugClass: 'Plasma Kallikrein Inhibitors (Hereditary Angioedema Agents)',
    strength: '300 mg / 2 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 single-use pre-filled syringe (2 mL)',
    approvedIndications:
      'Routine prevention of recurrent attacks of hereditary angioedema (HAE) in patients aged 2 years and older.',
    usualAdultDose:
      'Adults and adolescents aged 12 years and older (≥40 kg): recommended starting dose is 300 mg every 2 weeks by subcutaneous injection into the abdomen, thigh, or upper arm. In patients who are stably attack-free on treatment, a dose reduction to 300 mg every 4 weeks may be considered, especially in patients with low body weight.',
    contraindications:
      'Hypersensitivity to lanadelumab or any excipient.',
    commonAdverseEffects:
      'Injection site reactions (pain, erythema, bruising, discomfort, haematoma, pruritus), dizziness, maculopapular rash, myalgia, increased alanine aminotransferase and aspartate aminotransferase.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton in order to protect from light.',
    specialties: ['Allergy and Immunology', 'Internal Medicine', 'Dermatology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Takhzyro (Lanadelumab) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/takhzyro',
    notes:
      'Originator Takeda fully human monoclonal antibody plasma kallikrein inhibitor for HAE prophylaxis.',
  },
  {
    brandName: 'Vpriv 400 Units',
    genericName: 'Velaglucerase alfa',
    activeIngredients: ['Velaglucerase alfa'],
    drugClass: 'Enzyme Replacement Therapies (Gaucher Disease)',
    strength: '400 Units',
    dosageForm: 'Powder for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use glass vial containing 400 Units powder',
    approvedIndications:
      'Long-term enzyme replacement therapy (ERT) in patients with type 1 Gaucher disease.',
    usualAdultDose:
      'Recommended starting dose is 60 Units/kg administered every other week as a 60-minute intravenous infusion. Dose adjustments can be made on an individual basis between 15 Units/kg and 60 Units/kg every other week based on achievement and maintenance of therapeutic goals.',
    contraindications:
      'Severe allergic reaction to velaglucerase alfa or any excipient.',
    commonAdverseEffects:
      'Infusion-related reactions (headache, dizziness, hypotension, hypertension, nausea, fatigue, pyrexia), abdominal pain, back pain, arthralgia, bone pain, activated partial thromboplastin time prolonged, neutralising antibodies.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton in order to protect from light.',
    specialties: ['Hematology', 'Internal Medicine', 'Pediatrics', 'Medical Genetics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Vpriv (Velaglucerase Alfa) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/vpriv',
    notes:
      'Originator Takeda human cell line-derived glucocerebrosidase enzyme replacement therapy for Type 1 Gaucher disease.',
  },
  {
    brandName: 'Replagal 1 mg/mL (3.5 mg)',
    genericName: 'Agalsidase alfa',
    activeIngredients: ['Agalsidase alfa'],
    drugClass: 'Enzyme Replacement Therapies (Fabry Disease)',
    strength: '1 mg/mL (3.5 mg / 3.5 mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use vial containing 3.5 mg in 3.5 mL',
    approvedIndications:
      'Long-term enzyme replacement therapy in patients with a confirmed diagnosis of Fabry disease (α-galactosidase A deficiency).',
    usualAdultDose:
      '0.2 mg/kg body weight administered every other week by intravenous infusion over 40 minutes.',
    contraindications:
      'Hypersensitivity to agalsidase alfa or any excipient.',
    commonAdverseEffects:
      'Infusion-related reactions (rigors, pyrexia, flushing, headache, nausea, dyspnoea), peripheral neuropathic pain, dizziness, tremor, palpitations, tachycardia, hypertension, cough, diarrhoea, vomiting, abdominal pain, rash, arthralgia, myalgia, peripheral oedema, fatigue.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze.',
    specialties: ['Nephrology', 'Cardiology', 'Neurology', 'Internal Medicine', 'Medical Genetics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Replagal (Agalsidase Alfa) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/replagal',
    notes:
      'Originator Takeda human cell line-derived α-galactosidase A enzyme replacement therapy for Fabry disease.',
  },
  {
    brandName: 'Elaprase 2 mg/mL (6 mg)',
    genericName: 'Idursulfase',
    activeIngredients: ['Idursulfase'],
    drugClass: 'Enzyme Replacement Therapies (Hunter Syndrome / MPS II)',
    strength: '2 mg/mL (6 mg / 3 mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: 'Pack of 1 single-use vial containing 6 mg in 3 mL',
    approvedIndications:
      'Long-term treatment of patients with Hunter syndrome (Mucopolysaccharidosis II, MPS II).',
    usualAdultDose:
      '0.5 mg/kg body weight administered every week by intravenous infusion over a 3-hour period, which may be gradually reduced to 1 hour if no infusion-associated reactions are observed.',
    contraindications:
      'Severe or life-threatening hypersensitivity to idursulfase or any excipient, if hypersensitivity is not controllable.',
    commonAdverseEffects:
      'Infusion-related reactions (cutaneous rash, urticaria, pruritus, flushing, pyrexia, headache, hypertension, wheezing, hypoxia, dyspnoea), abdominal pain, nausea, diarrhoea, vomiting, chest pain, arthralgia, infusion site swelling.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze.',
    specialties: ['Pediatrics', 'Internal Medicine', 'Medical Genetics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Elaprase (Idursulfase) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/elaprase',
    notes:
      'Originator Takeda recombinant human iduronate-2-sulfatase enzyme replacement therapy for Hunter syndrome (MPS II).',
  },

  // =========================================================================
  // 5. HAEMATOLOGY — HAEMOPHILIA A & INHIBITOR BYPASSING AGENTS
  // =========================================================================
  {
    brandName: 'Advate 250 IU',
    genericName: 'Octocog alfa',
    activeIngredients: ['Octocog alfa'],
    drugClass: 'Recombinant Coagulation Factor VIII Concentrates',
    strength: '250 IU',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 250 IU powder + 1 vial of sterilized water for injections with BAXJECT II device',
    approvedIndications:
      'Treatment and prophylaxis of bleeding in patients with haemophilia A (congenital factor VIII deficiency) in all age groups.',
    usualAdultDose:
      'On-demand treatment: Required IU = body weight (kg) × desired factor VIII rise (% or IU/dL) × 0.5. Routine prophylaxis: 20 to 40 IU of factor VIII per kg body weight at intervals of 2 to 3 days. Administer intravenously at a rate not exceeding 10 mL/min.',
    contraindications:
      'Hypersensitivity to octocog alfa, mouse or hamster proteins, or any excipient.',
    commonAdverseEffects:
      'Factor VIII inhibition (neutralising antibodies, very common in previously untreated patients, uncommon in previously treated patients), headache, dizziness, pyrexia, cough, rash, arthralgia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Within its shelf-life, the product may be kept at room temperature (up to 25°C) for a single period not exceeding 6 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advate (Octocog Alfa) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advate',
    notes:
      'Originator Takeda plasma/albumin-free recombinant human coagulation factor VIII 250 IU presentation.',
  },
  {
    brandName: 'Advate 500 IU',
    genericName: 'Octocog alfa',
    activeIngredients: ['Octocog alfa'],
    drugClass: 'Recombinant Coagulation Factor VIII Concentrates',
    strength: '500 IU',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 500 IU powder + 1 vial of sterilized water for injections with BAXJECT II device',
    approvedIndications:
      'Treatment and prophylaxis of bleeding in patients with haemophilia A (congenital factor VIII deficiency) in all age groups.',
    usualAdultDose:
      'On-demand treatment: Required IU = body weight (kg) × desired factor VIII rise (% or IU/dL) × 0.5 (early haemarthrosis/muscle bleed: 20–40 IU/dL every 12–24 hours; life-threatening haemorrhage or major surgery: 60–100 IU/dL). Prophylaxis: 20 to 40 IU/kg every 2 to 3 days.',
    contraindications:
      'Hypersensitivity to octocog alfa, mouse or hamster proteins, or any excipient.',
    commonAdverseEffects:
      'Factor VIII inhibition (neutralising antibodies), headache, dizziness, pyrexia, rash, pruritus, infusion site reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. May be stored at room temperature (up to 25°C) for a single period not exceeding 6 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advate (Octocog Alfa) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advate',
    notes:
      'Originator Takeda plasma/albumin-free recombinant human coagulation factor VIII 500 IU presentation.',
  },
  {
    brandName: 'Advate 1000 IU',
    genericName: 'Octocog alfa',
    activeIngredients: ['Octocog alfa'],
    drugClass: 'Recombinant Coagulation Factor VIII Concentrates',
    strength: '1000 IU',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 1000 IU powder + 1 vial of sterilized water for injections with BAXJECT II device',
    approvedIndications:
      'Treatment and prophylaxis of bleeding in patients with haemophilia A (congenital factor VIII deficiency) in all age groups.',
    usualAdultDose:
      'Individualised according to severity of factor VIII deficiency, location and extent of bleeding, or prophylaxis regimen (20 to 40 IU/kg every 2 to 3 days). Administer by slow intravenous injection (up to 10 mL/min).',
    contraindications:
      'Hypersensitivity to octocog alfa, mouse or hamster proteins, or any excipient.',
    commonAdverseEffects:
      'Factor VIII inhibition (neutralising antibodies), headache, dizziness, pyrexia, rash, pruritus, arthralgia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. May be stored at room temperature (up to 25°C) for a single period not exceeding 6 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Advate (Octocog Alfa) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/advate',
    notes:
      'Originator Takeda plasma/albumin-free recombinant human coagulation factor VIII 1000 IU presentation.',
  },
  {
    brandName: 'Adynovi 500 IU',
    genericName: 'Rurioctocog alfa pegol',
    activeIngredients: ['Rurioctocog alfa pegol'],
    drugClass: 'Extended Half-Life Recombinant Coagulation Factor VIII Concentrates',
    strength: '500 IU',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 500 IU powder + 1 vial of 2 mL solvent with BAXJECT II Hi-Flow device',
    approvedIndications:
      'Treatment and prophylaxis of bleeding in patients aged 12 years and above with haemophilia A (congenital factor VIII deficiency).',
    usualAdultDose:
      'Long-term prophylaxis: 40 to 50 IU of Adynovi per kg body weight twice weekly in 3- to 4-day intervals. On-demand treatment: Required IU = body weight (kg) × desired factor VIII rise (%) × 0.5. Administer intravenously at a rate not exceeding 10 mL/min.',
    contraindications:
      'Hypersensitivity to rurioctocog alfa pegol, the parent molecule octocog alfa, mouse or hamster proteins, or any excipient.',
    commonAdverseEffects:
      'Headache, diarrhoea, nausea, rash, flushing, factor VIII inhibition (uncommon in previously treated patients), hypersensitivity reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Within its shelf-life, the product may be kept at room temperature (up to 30°C) for a single period not exceeding 3 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Adynovi (Rurioctocog Alfa Pegol) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adynovi',
    notes:
      'Originator Takeda PEGylated extended half-life recombinant human coagulation factor VIII 500 IU presentation.',
  },
  {
    brandName: 'Adynovi 1000 IU',
    genericName: 'Rurioctocog alfa pegol',
    activeIngredients: ['Rurioctocog alfa pegol'],
    drugClass: 'Extended Half-Life Recombinant Coagulation Factor VIII Concentrates',
    strength: '1000 IU',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 1000 IU powder + 1 vial of 2 mL solvent with BAXJECT II Hi-Flow device',
    approvedIndications:
      'Treatment and prophylaxis of bleeding in patients aged 12 years and above with haemophilia A (congenital factor VIII deficiency).',
    usualAdultDose:
      'Long-term prophylaxis: 40 to 50 IU/kg twice weekly at 3- to 4-day intervals. On-demand treatment and perioperative management: dosed according to target factor VIII level and clinical response.',
    contraindications:
      'Hypersensitivity to rurioctocog alfa pegol, octocog alfa, mouse or hamster proteins, or any excipient.',
    commonAdverseEffects:
      'Headache, diarrhoea, nausea, rash, flushing, factor VIII inhibition (uncommon in previously treated patients), hypersensitivity reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. May be stored at room temperature (up to 30°C) for a single period not exceeding 3 months.',
    specialties: ['Hematology', 'Pediatrics'],
    sourceTitle: 'EMA European Public Assessment Report (EPAR) — Adynovi (Rurioctocog Alfa Pegol) SmPC',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adynovi',
    notes:
      'Originator Takeda PEGylated extended half-life recombinant human coagulation factor VIII 1000 IU presentation.',
  },
  {
    brandName: 'Feiba 500 U',
    genericName: 'Anti-inhibitor coagulant complex',
    activeIngredients: ['Anti-inhibitor coagulant complex'],
    drugClass: 'Activated Prothrombin Complex Concentrates (Bypassing Agents)',
    strength: '500 U (50 U/mL after reconstitution)',
    dosageForm: 'Powder and solvent for solution for infusion',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 500 U powder + 1 vial of 10 mL sterilized water for injections with BAXJECT II Hi-Flow device',
    approvedIndications:
      'Treatment and prophylaxis of haemorrhage in haemophilia A patients with factor VIII inhibitors; treatment and prophylaxis of haemorrhage in haemophilia B patients with factor IX inhibitors (provided no history of anaphylactic reaction to factor IX); treatment of haemorrhage in non-haemophiliacs with acquired inhibitors to factors VIII, XI, and XII.',
    usualAdultDose:
      'General guideline: 50 to 100 U/kg body weight depending on site and severity of bleeding, without exceeding a single dose of 100 U/kg and a maximum daily dose of 200 U/kg. Prophylaxis: 85 U/kg every other day. Maximum infusion rate must not exceed 2 U/kg/min.',
    contraindications:
      'Hypersensitivity to the product or any excipient; disseminated intravascular coagulation (DIC); acute thrombosis or embolism (including myocardial infarction).',
    commonAdverseEffects:
      'Hypersensitivity and allergic-type reactions (urticaria, pruritus, chills, pyrexia, dyspnoea), headache, dizziness, somnolence, dysgeusia, hypotension, nausea, vomiting, diarrhoea, thromboembolic events (myocardial infarction, venous thromboembolism, DIC — particularly at high doses or with concomitant emicizumab).',
    storageConditions:
      'Do not store above 25°C. Do not freeze. Store in the original package in order to protect from light.',
    specialties: ['Hematology', 'Critical Care Medicine'],
    sourceTitle: 'UK Electronic Medicines Compendium (EMC) — FEIBA 50 U/ml Powder and Solvent for Solution for Infusion SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2789/smpc',
    notes:
      'Originator Takeda (Baxalta) factor VIII inhibitor bypassing activity (activated prothrombin complex concentrate) 500 U vial presentation.',
  },
  {
    brandName: 'Feiba 1000 U',
    genericName: 'Anti-inhibitor coagulant complex',
    activeIngredients: ['Anti-inhibitor coagulant complex'],
    drugClass: 'Activated Prothrombin Complex Concentrates (Bypassing Agents)',
    strength: '1000 U (50 U/mL after reconstitution)',
    dosageForm: 'Powder and solvent for solution for infusion',
    route: 'Intravenous',
    packSize: 'Pack of 1 vial of 1000 U powder + 1 vial of 20 mL sterilized water for injections with BAXJECT II Hi-Flow device',
    approvedIndications:
      'Treatment and prophylaxis of haemorrhage in haemophilia A patients with factor VIII inhibitors; treatment and prophylaxis of haemorrhage in haemophilia B patients with factor IX inhibitors; treatment of haemorrhage in non-haemophiliacs with acquired inhibitors to factors VIII, XI, and XII.',
    usualAdultDose:
      '50 to 100 U/kg body weight per infusion depending on severity of haemorrhage (maximum single dose 100 U/kg; maximum daily dose 200 U/kg; if used in patients on emicizumab prophylaxis for breakthrough bleeding, do not exceed 50 U/kg initial dose or 100 U/kg/day). Maximum infusion rate: 2 U/kg/min.',
    contraindications:
      'Hypersensitivity to the product or any excipient; disseminated intravascular coagulation (DIC); acute thrombosis or embolism (including myocardial infarction).',
    commonAdverseEffects:
      'Hypersensitivity reactions, headache, dizziness, nausea, vomiting, rash, injection site pain, thromboembolic complications (venous thromboembolism, pulmonary embolism, DIC, thrombotic microangiopathy).',
    storageConditions:
      'Do not store above 25°C. Do not freeze. Store in the original package in order to protect from light.',
    specialties: ['Hematology', 'Critical Care'],
    sourceTitle: 'UK Electronic Medicines Compendium (EMC) — FEIBA 50 U/ml Powder and Solvent for Solution for Infusion SmPC',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/2789/smpc',
    notes:
      'Originator Takeda (Baxalta) factor VIII inhibitor bypassing activity 1000 U vial presentation.',
  },
  {
    brandName: 'Actos 15 mg',
    genericName: 'Pioglitazone',
    activeIngredients: ['Pioglitazone hydrochloride'],
    drugClass: 'Thiazolidinedione (PPAR-gamma Agonist) Oral Antidiabetic Agents',
    strength: '15 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Second- or third-line treatment of type 2 diabetes mellitus in adults as monotherapy (in patients inadequately controlled by diet and exercise for whom metformin is inappropriate) or in dual/triple combination therapy with metformin, a sulphonylurea, or insulin.',
    usualAdultDose:
      'Initiate at 15 mg or 30 mg orally once daily with or without food; may be increased in increments up to 45 mg once daily. Review response after 3 to 6 months.',
    contraindications:
      'Hypersensitivity to pioglitazone; cardiac failure or history of cardiac failure (NYHA stages I to IV); hepatic impairment; diabetic ketoacidosis; current bladder cancer or history of bladder cancer; uninvestigated macroscopic haematuria.',
    commonAdverseEffects:
      'Weight gain, fluid retention and peripheral oedema, upper respiratory tract infection, visual disturbance, hypoesthesia, bone fractures (in women), heart failure (especially with insulin).',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Actos (pioglitazone) Summary of Product Characteristics (Takeda)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/actos',
    notes: 'Originator Takeda pioglitazone 15 mg tablet.',
  },
  {
    brandName: 'Actos 30 mg',
    genericName: 'Pioglitazone',
    activeIngredients: ['Pioglitazone hydrochloride'],
    drugClass: 'Thiazolidinedione (PPAR-gamma Agonist) Oral Antidiabetic Agents',
    strength: '30 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Second- or third-line treatment of type 2 diabetes mellitus in adults as monotherapy or in combination with metformin, a sulphonylurea, or insulin.',
    usualAdultDose:
      '30 mg orally once daily with or without food (maximum dose 45 mg once daily). Monitor for signs and symptoms of fluid retention and heart failure.',
    contraindications:
      'Hypersensitivity to pioglitazone; cardiac failure or history of cardiac failure (NYHA I–IV); hepatic impairment; diabetic ketoacidosis; current or history of bladder cancer; uninvestigated macroscopic haematuria.',
    commonAdverseEffects:
      'Fluid retention, oedema, weight gain, upper respiratory tract infection, visual disturbance, bone fracture, anaemia, heart failure when combined with insulin.',
    storageConditions: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Endocrinology', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR — Actos (pioglitazone) Summary of Product Characteristics (Takeda)',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/actos',
    notes: 'Originator Takeda pioglitazone 30 mg tablet.',
  },
  {
    brandName: 'Vocinti 20 mg (Vonoprazan)',
    genericName: 'Vonoprazan',
    activeIngredients: ['Vonoprazan fumarate'],
    drugClass: 'Potassium-Competitive Acid Blockers (P-CAB)',
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '14 or 28 film-coated tablets',
    approvedIndications:
      'Treatment of erosive oesophagitis (reflux oesophagitis) and maintenance of healed erosive oesophagitis; treatment of gastric ulcer and duodenal ulcer; prevention of recurrence of gastric or duodenal ulcer during low-dose aspirin or NSAID therapy; and adjunct to antibiotics for Helicobacter pylori eradication.',
    usualAdultDose:
      'Erosive oesophagitis: 20 mg once daily for 4 to 8 weeks (maintenance: 10 mg or 20 mg once daily). Gastric ulcer: 20 mg once daily for 8 weeks. Duodenal ulcer: 20 mg once daily for 6 weeks. H. pylori eradication: 20 mg twice daily in combination with amoxicillin (plus clarithromycin or metronidazole) for 7 to 14 days. May be taken without regard to food.',
    contraindications:
      'Hypersensitivity to vonoprazan or any excipient; concomitant administration with rilpivirine-containing products or atazanavir.',
    commonAdverseEffects:
      'Diarrhoea, constipation, abdominal distension, nausea, abdominal pain, dysgeusia, nasopharyngitis, elevated serum gastrin and hepatic transaminases.',
    storageConditions: 'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Vonoprazan fumarate (Vocinti / Voquezna) — DailyMed Official Prescribing Information',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=vonoprazan',
    notes: 'Originator Takeda potassium-competitive acid blocker (P-CAB) 20 mg film-coated tablet (also marketed regionally as Vonza 20 mg).',
  },
];

export const TAKEDA_PRODUCTS: AiProductDraft[] = TAKEDA_COMPACT_DRUGS.map((d) => ({
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

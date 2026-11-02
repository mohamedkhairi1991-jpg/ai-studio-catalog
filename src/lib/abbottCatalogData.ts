import type { AiDraftSource, AiProductDraft } from './catalog';

const ABBOTT_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactAbbottDrug {
  brandName: string;
  brandNameAr: string;
  category?: 'prescription_drug' | 'otc_drug' | 'dietary_supplement';
  genericName: string;
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

function toAbbottProductDraft(item: CompactAbbottDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
    brandNameAr: item.brandNameAr,
    category: item.category ?? 'prescription_drug',
    genericName: item.genericName,
    activeIngredients: item.genericName.split(' + ').map((s) => s.trim()),
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
    sources: ABBOTT_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official Abbott Laboratories (Established Pharmaceuticals) regulatory monograph; saved as draft pending verification.',
  };
}

const ABBOTT_COMPACT_PRODUCTS: CompactAbbottDrug[] = [
  // ===========================================================================
  // 1. WOMEN'S HEALTH & GYNAECOLOGY (4 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Duphaston 10 mg',
    brandNameAr: 'دوفاستون 10 ملغ',
    genericName: 'Dydrogesterone',
    drugClass: 'Selective Retroprogesterone Progestogens (G03DB01)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 film-coated tablets',
    approvedIndications:
      'Regulating menstrual cycles; endometriosis; dysmenorrhoea; infertility due to luteal insufficiency and luteal support as part of Assisted Reproductive Technology (ART); threatened miscarriage and habitual miscarriage associated with proven progesterone deficiency; dysfunctional uterine bleeding; secondary amenorrhoea; endometrial protection during oestrogen hormone replacement therapy (HRT).',
    usualAdultDose:
      'Threatened miscarriage: up to 40 mg stat then 10 mg every 8 hours until symptoms remit. Habitual miscarriage: 10 mg twice daily until week 20 of pregnancy. Luteal support in ART: 10 mg three times daily (30 mg/day) starting on the day of oocyte retrieval. Endometriosis: 10 mg 2 to 3 times daily from day 5 to 25 of cycle or continuously. Dysmenorrhoea / irregular cycles: 10 mg twice daily from day 11 to 25 of cycle.',
    contraindications:
      'Hypersensitivity to dydrogesterone or any excipient; known or suspected progestogen-dependent neoplasms (e.g., meningioma); undiagnosed vaginal bleeding; severe hepatic dysfunction; contraindications to oestrogens when used in combination with oestrogen for HRT.',
    commonAdverseEffects:
      'Migraine/headache, nausea, menstrual disorders (metrorrhagia, menorrhagia, oligo/amenorrhoea, irregular menstruation, dysmenorrhoea), breast pain/tenderness, dizziness, depressed mood, vomiting, allergic skin reactions.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Obstetrics & Gynaecology', 'Endocrinology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Duphaston (dydrogesterone)',
    sourceUrl: 'https://medicines.abbott.com/product/duphaston/',
  },
  {
    brandName: 'Femoston 1 mg/10 mg',
    brandNameAr: 'فيموستون 1 ملغ / 10 ملغ',
    genericName: 'Estradiol + Dydrogesterone',
    drugClass: 'Sequential Combined Hormone Replacement Therapy (G03FB08)',
    strength: '1 mg / 10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (14 estradiol 1 mg tablets + 14 estradiol 1 mg / dydrogesterone 10 mg tablets)',
    approvedIndications:
      'Hormone replacement therapy (HRT) for oestrogen deficiency symptoms in postmenopausal women at least 6 months since last menses; prevention of osteoporosis in postmenopausal women at high risk of future fractures who are intolerant of, or contraindicated for, other medicinal products approved for the prevention of osteoporosis.',
    usualAdultDose:
      'One tablet daily continuously without a break between packs: for the first 14 days of a 28-day cycle take 1 white tablet (estradiol 1 mg) daily; for the remaining 14 days take 1 grey tablet (estradiol 1 mg + dydrogesterone 10 mg) daily.',
    contraindications:
      'Known, past, or suspected breast cancer; known or suspected oestrogen- or progestogen-dependent malignant tumours (e.g., endometrial cancer, meningioma); undiagnosed genital bleeding; untreated endometrial hyperplasia; previous or current venous thromboembolism (DVT, PE); known thrombophilic disorders; active or recent arterial thromboembolic disease (e.g., angina, MI); acute liver disease; porphyria.',
    commonAdverseEffects:
      'Headache, migraine, nausea, abdominal pain, flatulence, leg cramps, breast pain/tenderness, pelvic pain, breakthrough bleeding and spotting, asthenia, weight changes.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Store in the original package.',
    specialties: ['Obstetrics & Gynaecology', 'Endocrinology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Femoston (estradiol / dydrogesterone)',
    sourceUrl: 'https://medicines.abbott.com/product/femoston/',
  },
  {
    brandName: 'Femoston 2 mg/10 mg',
    brandNameAr: 'فيموستون 2 ملغ / 10 ملغ',
    genericName: 'Estradiol + Dydrogesterone',
    drugClass: 'Sequential Combined Hormone Replacement Therapy (G03FB08)',
    strength: '2 mg / 10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets (14 estradiol 2 mg tablets + 14 estradiol 2 mg / dydrogesterone 10 mg tablets)',
    approvedIndications:
      'Hormone replacement therapy (HRT) for oestrogen deficiency symptoms in postmenopausal women at least 6 months since last menses; prevention of osteoporosis in postmenopausal women at high risk of future fractures who are intolerant of, or contraindicated for, other medicinal products approved for the prevention of osteoporosis.',
    usualAdultDose:
      'One tablet daily continuously without a break between packs: for the first 14 days of a 28-day cycle take 1 brick-red tablet (estradiol 2 mg) daily; for the remaining 14 days take 1 yellow tablet (estradiol 2 mg + dydrogesterone 10 mg) daily.',
    contraindications:
      'Known, past, or suspected breast cancer; known or suspected oestrogen- or progestogen-dependent malignant tumours; undiagnosed genital bleeding; untreated endometrial hyperplasia; previous or current venous thromboembolism (DVT, PE); known thrombophilic disorders; active or recent arterial thromboembolic disease; acute liver disease; porphyria.',
    commonAdverseEffects:
      'Headache, migraine, nausea, abdominal pain, flatulence, leg cramps, breast pain/tenderness, pelvic pain, breakthrough bleeding and spotting, asthenia, weight changes.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Store in the original package.',
    specialties: ['Obstetrics & Gynaecology', 'Endocrinology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Femoston (estradiol / dydrogesterone)',
    sourceUrl: 'https://medicines.abbott.com/product/femoston/',
  },
  {
    brandName: 'Femoston Conti 1 mg/5 mg',
    brandNameAr: 'فيموستون كونتي 1 ملغ / 5 ملغ',
    genericName: 'Estradiol + Dydrogesterone',
    drugClass: 'Continuous Combined Hormone Replacement Therapy (G03FA14)',
    strength: '1 mg / 5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets',
    approvedIndications:
      'Continuous combined hormone replacement therapy (HRT) for oestrogen deficiency symptoms in postmenopausal women with at least 12 months since last menses; prevention of osteoporosis in postmenopausal women at high risk of future fractures.',
    usualAdultDose:
      'One film-coated tablet (1 mg estradiol / 5 mg dydrogesterone) taken orally every day without a break between 28-day calendar packs.',
    contraindications:
      'Known, past, or suspected breast cancer; known or suspected oestrogen- or progestogen-dependent malignant tumours; undiagnosed genital bleeding; untreated endometrial hyperplasia; previous or current venous thromboembolism (DVT, PE); known thrombophilic disorders; active or recent arterial thromboembolic disease; acute liver disease; porphyria.',
    commonAdverseEffects:
      'Headache, migraine, nausea, abdominal pain, breast tenderness, spotting or breakthrough bleeding during the first months of treatment, back pain, asthenia.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Store in the original package.',
    specialties: ['Obstetrics & Gynaecology', 'Endocrinology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Femoston (estradiol / dydrogesterone)',
    sourceUrl: 'https://medicines.abbott.com/product/femoston/',
  },

  // ===========================================================================
  // 2. GASTROENTEROLOGY & HEPATOLOGY (12 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Creon 10000',
    brandNameAr: 'كريون 10000 وحدة',
    genericName: 'Pancreatin',
    drugClass: 'Pancreatic Enzyme Replacement Therapy / Multienzymes (A09AA02)',
    strength: '150 mg (10,000 Ph.Eur. units lipase / 8,000 units amylase / 600 units protease)',
    dosageForm: 'Gastro-resistant capsule, hard',
    route: 'Oral',
    packSize: '20 or 100 gastro-resistant hard capsules (Minimicrospheres)',
    approvedIndications:
      'Treatment of pancreatic exocrine insufficiency (PEI) in paediatric and adult patients, commonly associated with cystic fibrosis, chronic pancreatitis, post-pancreatectomy, post-gastrointestinal bypass surgery, or ductal obstruction of the pancreas or common bile duct (e.g., from neoplasm).',
    usualAdultDose:
      'Dosing is individualised based on severity of maldigestion and fat content of meals: usual starting dose in adults is 25,000 to 80,000 units of lipase per main meal and half the individual dose for snacks. Capsules must be swallowed whole during or immediately after meals with adequate fluid (or opened and mixed with acidic soft food pH <5.5 without chewing).',
    contraindications:
      'Hypersensitivity to pancreatin of porcine origin or to any of the excipients.',
    commonAdverseEffects:
      'Abdominal pain, nausea, vomiting, constipation, abdominal distension, diarrhoea. Fibrosing colonopathy has been reported rarely in cystic fibrosis patients taking high doses (>10,000 lipase units/kg/day).',
    storageConditions:
      'Do not store above 25°C. Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Gastroenterology', 'Paediatrics', 'General Surgery', 'Oncology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Creon (pancreatin)',
    sourceUrl: 'https://medicines.abbott.com/product/creon/',
  },
  {
    brandName: 'Creon 25000',
    brandNameAr: 'كريون 25000 وحدة',
    genericName: 'Pancreatin',
    drugClass: 'Pancreatic Enzyme Replacement Therapy / Multienzymes (A09AA02)',
    strength: '300 mg (25,000 Ph.Eur. units lipase / 18,000 units amylase / 1,000 units protease)',
    dosageForm: 'Gastro-resistant capsule, hard',
    route: 'Oral',
    packSize: '20, 50, or 100 gastro-resistant hard capsules (Minimicrospheres)',
    approvedIndications:
      'Treatment of pancreatic exocrine insufficiency (PEI) in paediatric and adult patients, commonly associated with cystic fibrosis, chronic pancreatitis, post-pancreatectomy, gastrectomy, or pancreatic cancer.',
    usualAdultDose:
      'Adult PEI: 1 to 3 capsules (25,000 to 75,000 Ph.Eur. units lipase) per main meal and 1 capsule with snacks, swallowed whole during or immediately after meals with sufficient fluid.',
    contraindications:
      'Hypersensitivity to pancreatin of porcine origin or to any of the excipients.',
    commonAdverseEffects:
      'Abdominal pain, nausea, vomiting, constipation, abdominal distension, diarrhoea.',
    storageConditions:
      'Do not store above 25°C. Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Gastroenterology', 'General Surgery', 'Oncology', 'Paediatrics'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Creon (pancreatin)',
    sourceUrl: 'https://medicines.abbott.com/product/creon/',
  },
  {
    brandName: 'Creon 40000',
    brandNameAr: 'كريون 40000 وحدة',
    genericName: 'Pancreatin',
    drugClass: 'Pancreatic Enzyme Replacement Therapy / Multienzymes (A09AA02)',
    strength: '400 mg (40,000 Ph.Eur. units lipase / 25,000 units amylase / 1,600 units protease)',
    dosageForm: 'Gastro-resistant capsule, hard',
    route: 'Oral',
    packSize: '50 or 100 gastro-resistant hard capsules (Minimicrospheres)',
    approvedIndications:
      'Treatment of pancreatic exocrine insufficiency (PEI) in adolescents and adults associated with chronic pancreatitis, cystic fibrosis, pancreatectomy, or pancreatic duct obstruction.',
    usualAdultDose:
      '1 to 2 capsules (40,000 to 80,000 Ph.Eur. units lipase) during or immediately after each main meal and half the main-meal dose with snacks.',
    contraindications:
      'Hypersensitivity to pancreatin of porcine origin or to any of the excipients.',
    commonAdverseEffects:
      'Abdominal pain, nausea, vomiting, constipation, abdominal distension, diarrhoea.',
    storageConditions:
      'Do not store above 25°C. Keep the container tightly closed in order to protect from moisture.',
    specialties: ['Gastroenterology', 'General Surgery', 'Oncology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Creon (pancreatin)',
    sourceUrl: 'https://medicines.abbott.com/product/creon/',
  },
  {
    brandName: 'Dicetel 50 mg',
    brandNameAr: 'ديستيل 50 ملغ',
    genericName: 'Pinaverium',
    drugClass: 'Gastrointestinal-Selective Calcium Antagonist Antispasmodics (A03AX04)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 or 30 film-coated tablets',
    approvedIndications:
      'Symptomatic treatment of pain, transit disturbances, and intestinal discomfort related to functional bowel disorders (irritable bowel syndrome); symptomatic treatment of pain related to functional disorders of the biliary tract; preparation for barium enema.',
    usualAdultDose:
      'Recommended dose is 1 tablet (50 mg) 3 times daily, or up to 2 tablets 3 times daily (maximum 300 mg/day) if necessary. Tablets must be swallowed whole with a full glass of water in the middle of a meal; do not chew, suck, or take while lying down or immediately before bedtime.',
    contraindications:
      'Hypersensitivity to pinaverium bromide or to any of the excipients.',
    commonAdverseEffects:
      'Abdominal pain, diarrhoea, nausea, vomiting, dysphagia, epigastric pain, oesophageal ulceration/irritation if taken without sufficient water or immediately before lying down.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Dicetel (pinaverium)',
    sourceUrl: 'https://medicines.abbott.com/product/dicetel/',
  },
  {
    brandName: 'Dicetel 100 mg',
    brandNameAr: 'ديستيل 100 ملغ',
    genericName: 'Pinaverium',
    drugClass: 'Gastrointestinal-Selective Calcium Antagonist Antispasmodics (A03AX04)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20 or 30 film-coated tablets',
    approvedIndications:
      'Symptomatic treatment of pain, transit disturbances, and intestinal discomfort related to functional bowel disorders (irritable bowel syndrome); symptomatic treatment of pain related to functional disorders of the biliary tract; preparation for barium enema.',
    usualAdultDose:
      'One 100 mg film-coated tablet twice daily (morning and evening) during meals, swallowed whole with a full glass of water. Exceptionally may be increased to 1 tablet three times daily (300 mg/day). Do not take while lying down or immediately before bedtime.',
    contraindications:
      'Hypersensitivity to pinaverium bromide or to any of the excipients.',
    commonAdverseEffects:
      'Abdominal pain, diarrhoea, nausea, vomiting, dysphagia, oesophageal irritation if swallowed improperly without sufficient water.',
    storageConditions:
      'Store below 30°C in the original blister package to protect from light and moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Dicetel (pinaverium)',
    sourceUrl: 'https://medicines.abbott.com/product/dicetel/',
  },
  {
    brandName: 'Duspatalin 135 mg',
    brandNameAr: 'دوسباتالين 135 ملغ',
    genericName: 'Mebeverine',
    drugClass: 'Musculotropic Gastrointestinal Antispasmodics (A03AA04)',
    strength: '135 mg',
    dosageForm: 'Coated tablet',
    route: 'Oral',
    packSize: '30 or 50 coated tablets',
    approvedIndications:
      'Symptomatic treatment of irritable bowel syndrome (IBS) including abdominal pain and cramps, bowel disturbances, and intestinal discomfort; treatment of gastrointestinal spasm secondary to organic diseases.',
    usualAdultDose:
      'One 135 mg coated tablet three times daily, taken approximately 20 minutes before meals. Swallow whole with at least 100 mL of water; do not chew.',
    contraindications:
      'Hypersensitivity to mebeverine hydrochloride or to any of the excipients; paralytic ileus.',
    commonAdverseEffects:
      'Allergic reactions mainly affecting the skin (urticaria, angioedema, face oedema, exanthema); rare hypersensitivity reactions.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Duspatalin / Duspatal (mebeverine)',
    sourceUrl: 'https://medicines.abbott.com/product/duspatal/',
  },
  {
    brandName: 'Duspatalin Retard 200 mg',
    brandNameAr: 'دوسباتالين ريتارد 200 ملغ',
    genericName: 'Mebeverine',
    drugClass: 'Musculotropic Gastrointestinal Antispasmodics (A03AA04)',
    strength: '200 mg',
    dosageForm: 'Prolonged-release capsule, hard',
    route: 'Oral',
    packSize: '30 prolonged-release hard capsules',
    approvedIndications:
      'Symptomatic treatment of irritable bowel syndrome (IBS): abdominal pain and cramps, bowel disturbances, and intestinal discomfort; treatment of gastrointestinal spasm secondary to organic diseases.',
    usualAdultDose:
      'One 200 mg prolonged-release capsule twice daily (morning and evening), swallowed whole with at least 100 mL of water. Do not crush or chew the capsules.',
    contraindications:
      'Hypersensitivity to mebeverine hydrochloride or to any of the excipients; paralytic ileus.',
    commonAdverseEffects:
      'Cutaneous hypersensitivity reactions (urticaria, angioedema, facial oedema, exanthema).',
    storageConditions:
      'Store below 25°C in the original package; do not refrigerate.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Duspatalin / Duspatal (mebeverine)',
    sourceUrl: 'https://medicines.abbott.com/product/duspatal/',
  },
  {
    brandName: 'Ganaton 50 mg',
    brandNameAr: 'جاناتون 50 ملغ',
    genericName: 'Itopride',
    drugClass: 'Gastroprokinetic Agents (D2 Antagonist & AChE Inhibitor, A03FA07)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '20, 30, or 40 film-coated tablets',
    approvedIndications:
      'Treatment of gastrointestinal symptoms caused by reduced gastrointestinal motility in functional (non-ulcer) dyspepsia and chronic gastritis, including bloating, early satiety, upper abdominal pain or discomfort, anorexia, heartburn, nausea, and vomiting.',
    usualAdultDose:
      '50 mg (one tablet) three times daily before meals (total daily dose 150 mg). Dose may be reduced according to age and clinical symptoms.',
    contraindications:
      'Hypersensitivity to itopride or any excipient; conditions in which increased gastrointestinal motility could be harmful such as gastrointestinal haemorrhage, mechanical obstruction, or perforation.',
    commonAdverseEffects:
      'Diarrhoea, constipation, abdominal pain, increased salivation, headache, dizziness, elevated serum prolactin (rarely galactorrhoea or gynaecomastia), transient leukopenia or elevated transaminases.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Ganaton (itopride)',
    sourceUrl: 'https://medicines.abbott.com/product/ganaton/',
  },
  {
    brandName: 'Duphalac 667 mg/mL',
    brandNameAr: 'دوفالاك 667 ملغ/مل',
    genericName: 'Lactulose',
    drugClass: 'Osmotically Acting Laxatives & Hepatic Encephalopathy Agents (A06AD11)',
    category: 'otc_drug',
    strength: '667 mg/mL (3.335 g/5 mL)',
    dosageForm: 'Oral solution',
    route: 'Oral (or rectal retention enema in hepatic encephalopathy)',
    packSize: '1 bottle (200 mL, 300 mL, or 500 mL)',
    approvedIndications:
      'Constipation (regulation of the physiological rhythm of the colon); conditions where soft stools are considered of medical benefit (e.g., haemorrhoids, post colonic/anal surgery); treatment and prevention of hepatic encephalopathy (portosystemic encephalopathy).',
    usualAdultDose:
      'Constipation in adults: starting daily dose 15 to 45 mL (10 to 30 g lactulose), maintenance 15 to 30 mL daily as a single morning dose or in 2 divided doses. Hepatic encephalopathy: starting dose 30 to 45 mL 3 to 4 times daily, adjusted to produce 2 to 3 soft stools per day.',
    contraindications:
      'Hypersensitivity to lactulose; galactosaemia; gastrointestinal obstruction, digestive perforation, or risk of digestive perforation.',
    commonAdverseEffects:
      'Flatulence during the first few days of treatment (usually subsides), abdominal pain, nausea, vomiting, diarrhoea and electrolyte imbalance if dosed excessively.',
    storageConditions:
      'Store below 25°C. Do not freeze.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Paediatrics', 'General Surgery'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Duphalac (lactulose)',
    sourceUrl: 'https://medicines.abbott.com/product/duphalac/',
  },
  {
    brandName: 'Heptral 400 mg',
    brandNameAr: 'هيبتـرال 400 ملغ',
    genericName: 'Ademetionine',
    drugClass: 'Hepatoprotective Methyl Donors / Amino Acid Derivatives (A16AA02)',
    strength: '400 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: '20 gastro-resistant tablets',
    approvedIndications:
      'Treatment of intrahepatic cholestasis in pre-cirrhotic and cirrhotic states; intrahepatic cholestasis in pregnancy; relief of fatigue in patients with chronic liver disease; depressive symptoms as advised by a specialist.',
    usualAdultDose:
      'Oral maintenance/initial therapy: 800 to 1600 mg/day (2 to 4 tablets daily) in divided doses. Tablets must be swallowed whole (not chewed) between meals on an empty stomach for optimal absorption, and removed from the blister immediately prior to ingestion.',
    contraindications:
      'Hypersensitivity to ademetionine or any excipient; genetic defects affecting the methionine cycle and/or causing homocystinuria and/or hyperhomocysteinaemia (e.g., cystathionine beta-synthase deficiency, vitamin B12 metabolism defect).',
    commonAdverseEffects:
      'Abdominal pain, diarrhoea, nausea, anxiety, insomnia, headache, pruritus, mild dyspepsia.',
    storageConditions:
      'Store below 25°C in the original sealed foil blister pack to protect from moisture and light.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Obstetrics & Gynaecology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Heptral (ademetionine)',
    sourceUrl: 'https://medicines.abbott.com/product/heptral/',
  },
  {
    brandName: 'Heptral 500 mg',
    brandNameAr: 'هيبتـرال 500 ملغ',
    genericName: 'Ademetionine',
    drugClass: 'Hepatoprotective Methyl Donors / Amino Acid Derivatives (A16AA02)',
    strength: '500 mg',
    dosageForm: 'Gastro-resistant tablet',
    route: 'Oral',
    packSize: '20 gastro-resistant tablets',
    approvedIndications:
      'Treatment of intrahepatic cholestasis in pre-cirrhotic and cirrhotic states; intrahepatic cholestasis in pregnancy; relief of fatigue in patients with chronic liver disease.',
    usualAdultDose:
      '800 to 1600 mg/day (2 to 3 tablets of 500 mg daily) taken between meals. Swallow whole without chewing; extract tablet from blister immediately before administration.',
    contraindications:
      'Hypersensitivity to ademetionine or any excipient; genetic defects affecting the methionine cycle and/or causing homocystinuria and/or hyperhomocysteinaemia.',
    commonAdverseEffects:
      'Abdominal pain, diarrhoea, nausea, anxiety, insomnia, headache, pruritus.',
    storageConditions:
      'Store below 25°C in the original sealed foil blister pack to protect from moisture and light.',
    specialties: ['Gastroenterology', 'Internal Medicine', 'Obstetrics & Gynaecology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Heptral (ademetionine)',
    sourceUrl: 'https://medicines.abbott.com/product/heptral/',
  },
  {
    brandName: 'Heptral 400 mg Injection',
    brandNameAr: 'هيبتـرال 400 ملغ فيال',
    genericName: 'Ademetionine',
    drugClass: 'Hepatoprotective Methyl Donors / Amino Acid Derivatives (A16AA02)',
    strength: '400 mg',
    dosageForm: 'Lyophilized powder and solvent for solution for injection',
    route: 'Intravenous or Intramuscular',
    packSize: '5 vials of lyophilized powder + 5 ampoules of L-lysine solvent (5 mL)',
    approvedIndications:
      'Initial intensive parenteral treatment of intrahepatic cholestasis in pre-cirrhotic and cirrhotic states and intrahepatic cholestasis in pregnancy.',
    usualAdultDose:
      'Initial intensive therapy: 400 to 800 mg/day (1 to 2 vials daily) administered by very slow intravenous injection/infusion or intramuscular injection for 1 to 2 weeks, followed by oral maintenance therapy.',
    contraindications:
      'Hypersensitivity to ademetionine or any excipient; genetic defects affecting the methionine cycle and/or causing homocystinuria and/or hyperhomocysteinaemia.',
    commonAdverseEffects:
      'Injection site reactions, flushing, nausea, abdominal pain, diarrhoea, insomnia, headache, dizziness.',
    storageConditions:
      'Store below 25°C. Reconstitute with the provided solvent immediately before use; discard if powder color has changed from white/yellowish-white.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Heptral (ademetionine)',
    sourceUrl: 'https://medicines.abbott.com/product/heptral/',
  },

  // ===========================================================================
  // 3. ANTI-INFECTIVES, PAIN & ANTI-INFLAMMATORY (10 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Klaricid 250 mg',
    brandNameAr: 'كلاريسيد 250 ملغ',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '14 film-coated tablets',
    approvedIndications:
      'Upper respiratory tract infections (pharyngitis, tonsillitis, acute maxillary sinusitis); lower respiratory tract infections (acute bacterial exacerbation of chronic bronchitis, community-acquired pneumonia); uncomplicated skin and soft tissue infections; acute otitis media; eradication of Helicobacter pylori in patients with duodenal ulcer in combination with acid suppression and another antibiotic.',
    usualAdultDose:
      'Usual adult dose: 250 mg twice daily for 7 to 14 days; may be increased to 500 mg twice daily in severe infections. May be taken with or without food.',
    contraindications:
      'Hypersensitivity to macrolide antibiotics; concomitant administration with astemizole, cisapride, domperidone, pimozide, terfenadine, ergot alkaloids, oral midazolam, lomitapide, ticagrelor, ranolazine, colchicine, or HMG-CoA reductase inhibitors extensively metabolised by CYP3A4 (lovastatin, simvastatin); history of QT prolongation or ventricular arrhythmia; hypokalaemia; severe hepatic failure in combination with renal impairment.',
    commonAdverseEffects:
      'Diarrhoea, vomiting, dyspepsia, nausea, abdominal pain, dysgeusia (taste perversion), headache, insomnia, abnormal liver function tests, rash, hyperhidrosis.',
    storageConditions:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Otolaryngology (ENT)', 'Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Klaricid 500 mg',
    brandNameAr: 'كلاريسيد 500 ملغ',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '500 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '14 film-coated tablets',
    approvedIndications:
      'Severe upper and lower respiratory tract infections (sinusitis, pneumonia, bronchitis); skin and soft tissue infections; mycobacterial infections (Mycobacterium avium complex); eradication of Helicobacter pylori in triple/quadruple therapy.',
    usualAdultDose:
      'Severe infections: 500 mg twice daily for 6 to 14 days. H. pylori eradication: 500 mg twice daily in combination with amoxicillin (or metronidazole) and a proton pump inhibitor for 7 to 14 days.',
    contraindications:
      'Hypersensitivity to macrolides; concomitant cisapride, pimozide, terfenadine, astemizole, domperidone, ergot alkaloids, lovastatin, simvastatin, colchicine, ticagrelor, or oral midazolam; congenital or acquired QT prolongation; hypokalaemia; combined severe hepatic and renal impairment.',
    commonAdverseEffects:
      'Diarrhoea, nausea, vomiting, abdominal pain, dyspepsia, dysgeusia, headache, insomnia, transient elevation of hepatic enzymes.',
    storageConditions:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Otolaryngology (ENT)', 'Gastroenterology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Klaricid XL 500 mg',
    brandNameAr: 'كلاريسيد إكس إل 500 ملغ',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '500 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '7 or 14 prolonged-release tablets',
    approvedIndications:
      'Acute bacterial exacerbation of chronic bronchitis; mild to moderate community-acquired pneumonia; acute bacterial sinusitis; pharyngitis/tonsillitis; uncomplicated skin and soft tissue infections in adults and adolescents aged 12 years and older.',
    usualAdultDose:
      'Usual dose: one 500 mg prolonged-release tablet once daily with food for 6 to 14 days. In more severe infections, two 500 mg tablets (1000 mg) once daily with food. Swallow whole; do not crush or chew.',
    contraindications:
      'Hypersensitivity to macrolides; creatinine clearance <30 mL/min (use immediate-release formulation for dose adjustment); concomitant cisapride, pimozide, terfenadine, astemizole, domperidone, ergot alkaloids, lovastatin, simvastatin, colchicine; history of QT prolongation or ventricular arrhythmia.',
    commonAdverseEffects:
      'Diarrhoea, nausea, abdominal pain, dyspepsia, dysgeusia, headache, insomnia, rash.',
    storageConditions:
      'Store below 30°C in the original package to protect from light.',
    specialties: ['Infectious Diseases', 'Pulmonology', 'Otolaryngology (ENT)', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Klaricid 125 mg/5 mL',
    brandNameAr: 'كلاريسيد معلق 125 ملغ/5 مل',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '125 mg/5 mL',
    dosageForm: 'Granules for oral suspension',
    route: 'Oral',
    packSize: '1 bottle (60 mL or 100 mL after reconstitution)',
    approvedIndications:
      'Treatment of upper and lower respiratory tract infections, acute otitis media, and skin and soft tissue infections caused by susceptible organisms in children aged 6 months to 12 years.',
    usualAdultDose:
      'Paediatric dose (children 6 months to 12 years): 7.5 mg/kg twice daily (up to a maximum of 500 mg twice daily) for 5 to 10 days. May be given with or without food or milk.',
    contraindications:
      'Hypersensitivity to macrolides; concomitant cisapride, pimozide, terfenadine, astemizole, domperidone, ergot alkaloids, lovastatin, simvastatin, colchicine; QT prolongation; hypokalaemia.',
    commonAdverseEffects:
      'Diarrhoea, vomiting, abdominal pain, dyspepsia, taste alteration, rash, transient liver enzyme elevations.',
    storageConditions:
      'Store below 25°C. After reconstitution, store below 25°C (do not refrigerate) and use within 14 days.',
    specialties: ['Paediatrics', 'Otolaryngology (ENT)', 'Infectious Diseases'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Klaricid 250 mg/5 mL',
    brandNameAr: 'كلاريسيد فورت معلق 250 ملغ/5 مل',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '250 mg/5 mL',
    dosageForm: 'Granules for oral suspension',
    route: 'Oral',
    packSize: '1 bottle (60 mL or 100 mL after reconstitution)',
    approvedIndications:
      'Treatment of upper and lower respiratory tract infections, acute otitis media, and skin and soft tissue infections caused by susceptible organisms in children aged 6 months to 12 years.',
    usualAdultDose:
      'Paediatric dose (children 6 months to 12 years): 7.5 mg/kg twice daily (up to a maximum of 500 mg twice daily) for 5 to 10 days.',
    contraindications:
      'Hypersensitivity to macrolides; concomitant cisapride, pimozide, terfenadine, astemizole, domperidone, ergot alkaloids, lovastatin, simvastatin, colchicine; QT prolongation; hypokalaemia.',
    commonAdverseEffects:
      'Diarrhoea, vomiting, abdominal pain, dyspepsia, taste alteration, rash.',
    storageConditions:
      'Store below 25°C. After reconstitution, store below 25°C (do not refrigerate) and use within 14 days.',
    specialties: ['Paediatrics', 'Otolaryngology (ENT)', 'Infectious Diseases'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Klaricid IV 500 mg',
    brandNameAr: 'كلاريسيد 500 ملغ فيال وريدي',
    genericName: 'Clarithromycin',
    drugClass: 'Macrolide Antibacterials (J01FA09)',
    strength: '500 mg',
    dosageForm: 'Powder for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial',
    approvedIndications:
      'Parenteral treatment of severe respiratory tract infections (including community-acquired and atypical pneumonia), skin and soft tissue infections, and susceptible mycobacterial infections when oral administration is not possible.',
    usualAdultDose:
      '500 mg twice daily administered by intravenous infusion over 60 minutes after reconstitution with Water for Injections and further dilution in at least 250 mL of compatible IV fluid for 2 to 5 days, switching to oral Klaricid as soon as clinically appropriate. Never give as an IV bolus or IM injection.',
    contraindications:
      'Hypersensitivity to macrolides; concomitant cisapride, pimozide, terfenadine, astemizole, domperidone, ergot alkaloids, lovastatin, simvastatin, colchicine; history of QT prolongation or ventricular arrhythmia; hypokalaemia.',
    commonAdverseEffects:
      'Infusion site phlebitis, pain, and inflammation; diarrhoea, nausea, vomiting, abnormal taste, headache, reversible elevation of hepatic enzymes.',
    storageConditions:
      'Store below 30°C in the outer carton to protect from light.',
    specialties: ['Infectious Diseases', 'Critical Care', 'Pulmonology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Klaricid / Klacid (clarithromycin)',
    sourceUrl: 'https://medicines.abbott.com/product/klacid/',
  },
  {
    brandName: 'Brufen 400 mg',
    brandNameAr: 'بروفين 400 ملغ',
    genericName: 'Ibuprofen',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (Propionic Acid Derivatives, M01AE01)',
    strength: '400 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Rheumatoid arthritis, ankylosing spondylitis, osteoarthritis, and other non-rheumatoid arthropathies; non-articular rheumatic conditions (frozen shoulder, bursitis, tendinitis, tenosynovitis, low back pain); soft tissue injuries (sprains and strains); mild to moderate pain such as dysmenorrhoea, dental and post-operative pain, and migraine/headache; pyrexia.',
    usualAdultDose:
      '1200 to 1800 mg daily in 3 to 4 divided doses (one 400 mg tablet 3 to 4 times daily), preferably with or after food; in acute or severe conditions may be increased up to a maximum of 2400 mg daily in divided doses.',
    contraindications:
      'Hypersensitivity to ibuprofen or any excipient; history of asthma, urticaria, or allergic-type reactions after taking aspirin or other NSAIDs; active or history of recurrent peptic ulcer/haemorrhage (two or more distinct episodes); history of GI bleeding or perforation related to previous NSAID therapy; severe heart failure (NYHA Class IV), severe hepatic failure, or severe renal failure; last trimester of pregnancy.',
    commonAdverseEffects:
      'Dyspepsia, abdominal pain, nausea, vomiting, diarrhoea, flatulence, constipation, gastrointestinal ulceration/bleeding, headache, dizziness, rash, fluid retention, oedema.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopaedics', 'Internal Medicine', 'Obstetrics & Gynaecology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Brufen (ibuprofen)',
    sourceUrl: 'https://medicines.abbott.com/product/brufen/',
  },
  {
    brandName: 'Brufen 600 mg',
    brandNameAr: 'بروفين 600 ملغ',
    genericName: 'Ibuprofen',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (Propionic Acid Derivatives, M01AE01)',
    strength: '600 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Rheumatoid arthritis, ankylosing spondylitis, osteoarthritis, acute gouty arthritis, periarticular disorders, soft tissue injuries, and moderate pain.',
    usualAdultDose:
      'One 600 mg tablet 2 to 3 times daily (1200 to 1800 mg/day) with or after food; maximum total daily dose 2400 mg.',
    contraindications:
      'Hypersensitivity to ibuprofen or NSAIDs; NSAID-induced asthma/urticaria/rhinitis; active or recurrent peptic ulcer/haemorrhage; prior NSAID-induced GI bleeding or perforation; severe heart failure (NYHA Class IV), severe renal or hepatic failure; third trimester of pregnancy.',
    commonAdverseEffects:
      'Dyspepsia, abdominal pain, nausea, diarrhoea, flatulence, peptic ulceration/GI bleeding, headache, dizziness, rash, fluid retention.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopaedics', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Brufen (ibuprofen)',
    sourceUrl: 'https://medicines.abbott.com/product/brufen/',
  },
  {
    brandName: 'Brufen Retard 800 mg',
    brandNameAr: 'بروفين ريتارد 800 ملغ',
    genericName: 'Ibuprofen',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (Propionic Acid Derivatives, M01AE01)',
    strength: '800 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '20 or 30 prolonged-release tablets',
    approvedIndications:
      'Rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, non-articular rheumatism, and chronic musculoskeletal pain in adults.',
    usualAdultDose:
      'Two 800 mg prolonged-release tablets (1600 mg) taken as a single daily dose in the early evening well before retiring, swallowed whole with plenty of fluid. In severe cases, one additional 800 mg tablet may be taken in the morning (maximum 2400 mg/day).',
    contraindications:
      'Hypersensitivity to ibuprofen or NSAIDs; NSAID-induced asthma/urticaria; active or recurrent peptic ulcer/haemorrhage; severe heart, hepatic, or renal failure; third trimester of pregnancy; children under 12 years.',
    commonAdverseEffects:
      'Dyspepsia, abdominal pain, nausea, diarrhoea, peptic ulceration/GI bleeding, headache, dizziness, oedema, rash.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Rheumatology', 'Orthopaedics', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Brufen (ibuprofen)',
    sourceUrl: 'https://medicines.abbott.com/product/brufen/',
  },
  {
    brandName: 'Brufen 100 mg/5 mL',
    brandNameAr: 'بروفين شراب 100 ملغ/5 مل',
    genericName: 'Ibuprofen',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (Propionic Acid Derivatives, M01AE01)',
    strength: '100 mg/5 mL',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: '1 bottle (100 mL or 150 mL)',
    approvedIndications:
      'Reduction of fever (including post-immunisation pyrexia), relief of mild to moderate pain (teething pain, toothache, earache, sore throat, headache, minor aches and sprains), and juvenile rheumatoid arthritis.',
    usualAdultDose:
      'Paediatric dose (pain and fever): 20 to 30 mg/kg/day in 3 to 4 divided doses (e.g., 5 mL three times daily for ages 1–3 years; 7.5 mL three times daily for ages 4–6 years; 10 mL three times daily for ages 7–9 years; 15 mL three times daily for ages 10–12 years). Juvenile arthritis: up to 30 to 40 mg/kg/day in 3 to 4 divided doses.',
    contraindications:
      'Hypersensitivity to ibuprofen or NSAIDs; NSAID-induced bronchospasm/urticaria; active or recurrent GI ulceration/bleeding; severe renal, hepatic, or cardiac failure; third trimester of pregnancy.',
    commonAdverseEffects:
      'Abdominal discomfort, nausea, dyspepsia, diarrhoea, rash, rare bronchospasm or GI bleeding.',
    storageConditions:
      'Store below 25°C. Shake well before use.',
    specialties: ['Paediatrics', 'Rheumatology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Brufen (ibuprofen)',
    sourceUrl: 'https://medicines.abbott.com/product/brufen/',
  },

  // ===========================================================================
  // 4. NEUROLOGY, VERTIGO & CARDIOMETABOLIC (17 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Betaserc 8 mg',
    brandNameAr: 'بيتاسيرك 8 ملغ',
    genericName: 'Betahistine',
    drugClass: 'Histamine Analogue Antivertigo Preparations (N07CA01)',
    strength: '8 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '50 or 100 tablets',
    approvedIndications:
      'Treatment of Ménière’s disease and syndrome characterised by the triad of vertigo (with nausea/vomiting), progressive hearing loss, and tinnitus; symptomatic treatment of vestibular vertigo.',
    usualAdultDose:
      'Total daily dose is 24 to 48 mg divided over the day: 1 to 2 tablets of 8 mg three times daily, preferably taken with meals.',
    contraindications:
      'Hypersensitivity to betahistine or any excipient; phaeochromocytoma.',
    commonAdverseEffects:
      'Nausea, dyspepsia, headache, mild gastric complaints (vomiting, gastrointestinal pain, abdominal distension, and bloating—usually relieved by taking the dose during meals), cutaneous hypersensitivity reactions.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Otolaryngology (ENT)', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Betaserc (betahistine)',
    sourceUrl: 'https://medicines.abbott.com/product/betaserc/',
  },
  {
    brandName: 'Betaserc 16 mg',
    brandNameAr: 'بيتاسيرك 16 ملغ',
    genericName: 'Betahistine',
    drugClass: 'Histamine Analogue Antivertigo Preparations (N07CA01)',
    strength: '16 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '30 or 60 tablets',
    approvedIndications:
      'Treatment of Ménière’s disease and syndrome (vertigo with nausea/vomiting, hearing loss, and tinnitus); symptomatic treatment of vestibular vertigo.',
    usualAdultDose:
      'Half to one 16 mg tablet three times daily (24 to 48 mg/day), preferably taken with meals.',
    contraindications:
      'Hypersensitivity to betahistine or any excipient; phaeochromocytoma.',
    commonAdverseEffects:
      'Nausea, dyspepsia, headache, mild gastrointestinal discomfort, rash, pruritus, urticaria.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Otolaryngology (ENT)', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Betaserc (betahistine)',
    sourceUrl: 'https://medicines.abbott.com/product/betaserc/',
  },
  {
    brandName: 'Betaserc 24 mg',
    brandNameAr: 'بيتاسيرك 24 ملغ',
    genericName: 'Betahistine',
    drugClass: 'Histamine Analogue Antivertigo Preparations (N07CA01)',
    strength: '24 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '20, 30, or 60 tablets',
    approvedIndications:
      'Treatment of Ménière’s disease and syndrome (vertigo with nausea/vomiting, hearing loss, and tinnitus); symptomatic treatment of vestibular vertigo.',
    usualAdultDose:
      'One 24 mg tablet twice daily (morning and evening; total 48 mg/day), preferably taken with meals.',
    contraindications:
      'Hypersensitivity to betahistine or any excipient; phaeochromocytoma.',
    commonAdverseEffects:
      'Nausea, dyspepsia, headache, mild gastrointestinal discomfort, cutaneous hypersensitivity reactions.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Otolaryngology (ENT)', 'Neurology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Betaserc (betahistine)',
    sourceUrl: 'https://medicines.abbott.com/product/betaserc/',
  },
  {
    brandName: 'Luvox 50 mg',
    brandNameAr: 'لوفوكس 50 ملغ',
    genericName: 'Fluvoxamine',
    drugClass: 'Selective Serotonin Reuptake Inhibitors (SSRIs, N06AB08)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 or 60 film-coated tablets',
    approvedIndications:
      'Major depressive episode; obsessive-compulsive disorder (OCD) in adults and children/adolescents aged 8 years and older.',
    usualAdultDose:
      'Depression: starting dose 50 or 100 mg once daily in the evening, titrated gradually as needed up to 300 mg/day (doses >150 mg/day given in divided doses). OCD: starting dose 50 mg daily for 3–4 days, increased gradually to 100–300 mg/day (maximum 200 mg/day in children/adolescents).',
    contraindications:
      'Hypersensitivity to fluvoxamine or any excipient; concomitant administration with tizanidine, monoamine oxidase inhibitors (MAOIs, including linezolid and methylene blue within 14 days), ramelteon, or pimozide.',
    commonAdverseEffects:
      'Nausea (sometimes accompanied by vomiting), anorexia, agitation, anxiety, dizziness, insomnia, somnolence, tremor, headache, dry mouth, hyperhidrosis, asthenia, palpitations, abdominal pain, constipation, diarrhoea, dyspepsia.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Luvox / Faverin (fluvoxamine)',
    sourceUrl: 'https://medicines.abbott.com/product/luvox/',
  },
  {
    brandName: 'Luvox 100 mg',
    brandNameAr: 'لوفوكس 100 ملغ',
    genericName: 'Fluvoxamine',
    drugClass: 'Selective Serotonin Reuptake Inhibitors (SSRIs, N06AB08)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Major depressive episode; obsessive-compulsive disorder (OCD).',
    usualAdultDose:
      '100 mg once daily in the evening, or up to 300 mg/day in 2 to 3 divided doses for doses exceeding 150 mg/day.',
    contraindications:
      'Hypersensitivity to fluvoxamine; concomitant tizanidine, MAOIs, ramelteon, or pimozide.',
    commonAdverseEffects:
      'Nausea, somnolence, insomnia, dizziness, tremor, headache, dry mouth, hyperhidrosis, asthenia, dyspepsia, constipation, diarrhoea.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Psychiatry', 'Neurology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Luvox / Faverin (fluvoxamine)',
    sourceUrl: 'https://medicines.abbott.com/product/luvox/',
  },
  {
    brandName: 'Physiotens 0.2 mg',
    brandNameAr: 'فيزيوتنس 0.2 ملغ',
    genericName: 'Moxonidine',
    drugClass: 'Selective Imidazoline I1-Receptor Agonist Antihypertensives (C02AC05)',
    strength: '0.2 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 or 30 film-coated tablets',
    approvedIndications:
      'Treatment of mild to moderate essential hypertension.',
    usualAdultDose:
      'Usual initial dose: 0.2 mg once daily in the morning. If therapeutic effect is insufficient after 3 weeks, the dose may be increased to 0.4 mg daily given as a single dose or in two divided doses (maximum 0.6 mg/day in two divided doses).',
    contraindications:
      'Hypersensitivity to moxonidine or any excipient; sick sinus syndrome; sino-atrial block; second- or third-degree AV block; bradycardia (<50 bpm at rest); heart failure.',
    commonAdverseEffects:
      'Dry mouth, headache, dizziness/vertigo, somnolence, asthenia, diarrhoea, nausea, vomiting, dyspepsia, rash, pruritus, back pain, insomnia.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Physiotens (moxonidine)',
    sourceUrl: 'https://medicines.abbott.com/product/physiotens/',
  },
  {
    brandName: 'Physiotens 0.3 mg',
    brandNameAr: 'فيزيوتنس 0.3 ملغ',
    genericName: 'Moxonidine',
    drugClass: 'Selective Imidazoline I1-Receptor Agonist Antihypertensives (C02AC05)',
    strength: '0.3 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 or 30 film-coated tablets',
    approvedIndications:
      'Treatment of mild to moderate essential hypertension.',
    usualAdultDose:
      '0.3 mg once daily in the morning or in divided doses as titrated from 0.2 mg/day (maximum single dose 0.4 mg; maximum daily dose 0.6 mg in two divided doses).',
    contraindications:
      'Hypersensitivity to moxonidine; sick sinus syndrome; sino-atrial block; second- or third-degree AV block; bradycardia (<50 bpm at rest); heart failure.',
    commonAdverseEffects:
      'Dry mouth, headache, dizziness/vertigo, somnolence, asthenia, gastrointestinal disturbances, rash.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Physiotens (moxonidine)',
    sourceUrl: 'https://medicines.abbott.com/product/physiotens/',
  },
  {
    brandName: 'Physiotens 0.4 mg',
    brandNameAr: 'فيزيوتنس 0.4 ملغ',
    genericName: 'Moxonidine',
    drugClass: 'Selective Imidazoline I1-Receptor Agonist Antihypertensives (C02AC05)',
    strength: '0.4 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 or 30 film-coated tablets',
    approvedIndications:
      'Treatment of mild to moderate essential hypertension.',
    usualAdultDose:
      '0.4 mg once daily in the morning (or in two divided doses of 0.2 mg morning and evening). In moderate renal impairment (GFR 30–60 mL/min), maximum daily dose is 0.4 mg.',
    contraindications:
      'Hypersensitivity to moxonidine; sick sinus syndrome; sino-atrial block; second- or third-degree AV block; bradycardia (<50 bpm at rest); heart failure.',
    commonAdverseEffects:
      'Dry mouth, headache, dizziness/vertigo, somnolence, asthenia, nausea, diarrhoea, rash.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Physiotens (moxonidine)',
    sourceUrl: 'https://medicines.abbott.com/product/physiotens/',
  },
  {
    brandName: 'Lipanthyl 145 mg',
    brandNameAr: 'ليبانثيل 145 ملغ',
    genericName: 'Fenofibrate',
    drugClass: 'PPAR-alpha Agonist Fibrates (C10AB05)',
    strength: '145 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Treatment of severe hypertriglyceridaemia with or without low HDL cholesterol; mixed hyperlipidaemia when a statin is contraindicated or not tolerated; mixed hyperlipidaemia in patients at high cardiovascular risk in addition to a statin when triglycerides and HDL cholesterol are not adequately controlled; reduction of the progression of diabetic retinopathy in patients with type 2 diabetes and existing diabetic retinopathy.',
    usualAdultDose:
      'One 145 mg film-coated tablet once daily at any time of the day, with or without food.',
    contraindications:
      'Hepatic insufficiency (including biliary cirrhosis and unexplained persistent liver function abnormality); known gallbladder disease; severe chronic kidney disease (eGFR <30 mL/min/1.73 m²); chronic or acute pancreatitis (except acute pancreatitis due to severe hypertriglyceridaemia); known photoallergy or phototoxic reaction during treatment with fibrates or ketoprofen; hypersensitivity to fenofibrate, soya lecithin, or peanut/arachis oil (where present).',
    commonAdverseEffects:
      'Abdominal pain, nausea, vomiting, diarrhoea, flatulence, moderately elevated serum transaminases (ALT/AST), increased blood homocysteine, headache, cholelithiasis, myalgia.',
    storageConditions:
      'Store below 30°C in the original package to protect from light and moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Lipanthyl / Tricor (fenofibrate)',
    sourceUrl: 'https://medicines.abbott.com/product/lipanthyl/',
  },
  {
    brandName: 'Lipanthyl Supra 160 mg',
    brandNameAr: 'ليبانثيل سوبرا 160 ملغ',
    genericName: 'Fenofibrate',
    drugClass: 'PPAR-alpha Agonist Fibrates (C10AB05)',
    strength: '160 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Severe hypertriglyceridaemia with or without low HDL cholesterol; mixed hyperlipidaemia when a statin is contraindicated or not tolerated, or in addition to a statin in high-risk patients; reduction of progression of diabetic retinopathy in type 2 diabetes.',
    usualAdultDose:
      'One 160 mg film-coated tablet once daily taken with a meal (absorption is reduced on an empty stomach).',
    contraindications:
      'Hepatic insufficiency; known gallbladder disease; severe renal insufficiency (eGFR <30 mL/min/1.73 m²); chronic or acute pancreatitis (except from severe hypertriglyceridaemia); known photoallergy/phototoxicity to fibrates or ketoprofen; hypersensitivity to fenofibrate, peanut/arachis oil, or soya lecithin.',
    commonAdverseEffects:
      'Gastrointestinal signs and symptoms (abdominal pain, nausea, vomiting, diarrhoea, flatulence), elevated transaminases, increased blood homocysteine, cholelithiasis, myalgia.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Lipanthyl / Tricor (fenofibrate)',
    sourceUrl: 'https://medicines.abbott.com/product/lipanthyl/',
  },
  {
    brandName: 'Lipanthyl Micronised 200 mg',
    brandNameAr: 'ليبانثيل ميكرونايزد 200 ملغ',
    genericName: 'Fenofibrate',
    drugClass: 'PPAR-alpha Agonist Fibrates (C10AB05)',
    strength: '200 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: '30 hard capsules',
    approvedIndications:
      'Severe hypertriglyceridaemia with or without low HDL cholesterol; mixed hyperlipidaemia when a statin is contraindicated or not tolerated, or in combination with a statin in high cardiovascular risk patients; reduction of progression of diabetic retinopathy in type 2 diabetes.',
    usualAdultDose:
      'One 200 mg micronised hard capsule once daily taken during a main meal, swallowed whole with a glass of water.',
    contraindications:
      'Hepatic insufficiency; known gallbladder disease; severe renal insufficiency (eGFR <30 mL/min/1.73 m²); chronic or acute pancreatitis; photoallergy/phototoxicity to fibrates or ketoprofen; hypersensitivity to fenofibrate.',
    commonAdverseEffects:
      'Abdominal pain, nausea, vomiting, diarrhoea, flatulence, moderately elevated serum transaminases, increased blood homocysteine, cholelithiasis, myalgia.',
    storageConditions:
      'Store below 30°C in the original package to protect from moisture.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Lipanthyl / Tricor (fenofibrate)',
    sourceUrl: 'https://medicines.abbott.com/product/lipanthyl/',
  },
  {
    brandName: 'Isoptin 80 mg',
    brandNameAr: 'إيزوبتين 80 ملغ',
    genericName: 'Verapamil',
    drugClass: 'Phenylalkylamine Non-DHP Calcium Channel Blockers (C08DA01)',
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 or 50 film-coated tablets',
    approvedIndications:
      'Coronary artery disease (chronic stable angina pectoris, unstable angina, vasospastic Prinzmetal angina, post-myocardial infarction angina); supraventricular tachyarrhythmias (paroxysmal supraventricular tachycardia, rate control in atrial fibrillation/flutter with rapid AV conduction); essential hypertension.',
    usualAdultDose:
      'Angina and arrhythmias: 80 to 120 mg three times daily (240 to 360 mg/day). Hypertension: 80 mg three times daily (up to 480 mg/day in divided doses). Swallow whole with liquid, preferably with or shortly after meals.',
    contraindications:
      'Cardiogenic shock; second- or third-degree AV block (except with a functioning pacemaker); sick sinus syndrome (except with a pacemaker); heart failure with reduced ejection fraction (<35%); atrial fibrillation/flutter in the presence of an accessory bypass tract (Wolff-Parkinson-White or Lown-Ganong-Levine syndrome); concomitant intravenous beta-blockers or ivabradine.',
    commonAdverseEffects:
      'Constipation, dizziness, headache, bradycardia, flushing, hypotension, peripheral oedema, nausea, fatigue.',
    storageConditions:
      'Store below 25°C in the original package to protect from light.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Isoptin (verapamil)',
    sourceUrl: 'https://medicines.abbott.com/product/isoptin/',
  },
  {
    brandName: 'Isoptin SR 240 mg',
    brandNameAr: 'إيزوبتين إس آر 240 ملغ',
    genericName: 'Verapamil',
    drugClass: 'Phenylalkylamine Non-DHP Calcium Channel Blockers (C08DA01)',
    strength: '240 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '20 or 30 prolonged-release tablets',
    approvedIndications:
      'Essential hypertension; treatment and prophylaxis of angina pectoris; secondary prevention post-myocardial infarction in patients without heart failure when beta-blockers are not indicated.',
    usualAdultDose:
      'Hypertension: one 240 mg prolonged-release tablet once daily in the morning with food (may be increased by half to one tablet in the evening up to 480 mg/day if needed). Swallow whole or divided along the score line; do not crush or chew.',
    contraindications:
      'Cardiogenic shock; second- or third-degree AV block without pacemaker; sick sinus syndrome without pacemaker; decompensated heart failure; atrial fibrillation/flutter with WPW accessory pathway; concomitant ivabradine or IV beta-blockers.',
    commonAdverseEffects:
      'Constipation, dizziness, headache, bradycardia, flushing, hypotension, peripheral oedema.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Isoptin (verapamil)',
    sourceUrl: 'https://medicines.abbott.com/product/isoptin/',
  },
  {
    brandName: 'Rytmonorm 150 mg',
    brandNameAr: 'ريتمونورم 150 ملغ',
    genericName: 'Propafenone',
    drugClass: 'Class IC Antiarrhythmics (Sodium Channel Blockers, C01BC03)',
    strength: '150 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 or 50 film-coated tablets',
    approvedIndications:
      'Prophylaxis and treatment of symptomatic supraventricular tachyarrhythmias requiring therapy (such as AV nodal reciprocating tachycardia, supraventricular tachycardia in WPW syndrome, or paroxysmal atrial fibrillation) in patients without structural heart disease; treatment of severe symptomatic life-threatening ventricular tachyarrhythmias.',
    usualAdultDose:
      'Titrated individually under ECG and blood pressure monitoring (for patients ~70 kg): 150 mg three times daily (450 mg/day), increasing at intervals of at least 3 to 4 days to 300 mg twice daily (600 mg/day) or a maximum of 300 mg three times daily (900 mg/day). Swallow whole after meals with liquid.',
    contraindications:
      'Known Brugada syndrome; significant structural heart disease (myocardial infarction within the last 3 months, uncontrolled congestive heart failure with LVEF <35%, cardiogenic shock); severe symptomatic bradycardia; sinus node dysfunction, atrial conduction defects, second- or higher-degree AV block, or bundle branch block in the absence of an artificial pacemaker; severe hypotension; myasthenia gravis; concomitant ritonavir.',
    commonAdverseEffects:
      'Dizziness, cardiac conduction disorders (sinoatrial, atrioventricular, or intraventricular block), palpitations, sinus bradycardia, dysgeusia (bitter or metallic taste), nausea, vomiting, constipation, blurred vision, fatigue, anxiety.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Rytmonorm (propafenone)',
    sourceUrl: 'https://medicines.abbott.com/product/rytmonorm/',
  },
  {
    brandName: 'Rytmonorm 300 mg',
    brandNameAr: 'ريتمونورم 300 ملغ',
    genericName: 'Propafenone',
    drugClass: 'Class IC Antiarrhythmics (Sodium Channel Blockers, C01BC03)',
    strength: '300 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets',
    approvedIndications:
      'Prophylaxis and treatment of symptomatic supraventricular tachyarrhythmias (including paroxysmal atrial fibrillation and WPW tachycardia) in patients without structural heart disease; severe symptomatic life-threatening ventricular tachyarrhythmias.',
    usualAdultDose:
      '300 mg twice daily (600 mg/day) or up to a maximum of 300 mg three times daily (900 mg/day) after titration from 450 mg/day under ECG monitoring. Swallow whole after meals.',
    contraindications:
      'Known Brugada syndrome; structural heart disease (recent MI within 3 months, uncontrolled heart failure with LVEF <35%, cardiogenic shock); sinus node or AV conduction blocks without pacemaker; severe bradycardia or hypotension; myasthenia gravis; concomitant ritonavir.',
    commonAdverseEffects:
      'Dizziness, conduction disturbances, palpitations, bradycardia, dysgeusia, nausea, vomiting, constipation, blurred vision, fatigue.',
    storageConditions:
      'Store below 30°C in the original package.',
    specialties: ['Cardiology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Rytmonorm (propafenone)',
    sourceUrl: 'https://medicines.abbott.com/product/rytmonorm/',
  },
  {
    brandName: 'Tarka 180 mg/2 mg',
    brandNameAr: 'تاركا 180 ملغ / 2 ملغ',
    genericName: 'Verapamil + Trandolapril',
    drugClass: 'ACE Inhibitor and Non-DHP Calcium Channel Blocker Combinations (C09BB10)',
    strength: '180 mg / 2 mg',
    dosageForm: 'Modified-release capsule, hard',
    route: 'Oral',
    packSize: '28 modified-release hard capsules',
    approvedIndications:
      'Treatment of essential hypertension in patients whose blood pressure has been normalised with the individual components given in the same proportion.',
    usualAdultDose:
      'One modified-release capsule (180 mg verapamil / 2 mg trandolapril) once daily in the morning before, with, or shortly after breakfast, swallowed whole with water.',
    contraindications:
      'Hypersensitivity to trandolapril, other ACE inhibitors, or verapamil; history of angioedema associated with prior ACE inhibitor therapy; hereditary or idiopathic angioedema; second- or third-degree AV block or sick sinus syndrome without pacemaker; cardiogenic shock or heart failure with reduced ejection fraction; atrial fibrillation/flutter with WPW syndrome; second and third trimesters of pregnancy; concomitant aliskiren in diabetes or renal impairment; concomitant sacubitril/valsartan or ivabradine.',
    commonAdverseEffects:
      'Cough, dizziness, headache, constipation, AV block, bradycardia, hypotension, flushing, fatigue.',
    storageConditions:
      'Store below 25°C in the original package.',
    specialties: ['Cardiology', 'Internal Medicine', 'Nephrology'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Tarka (verapamil / trandolapril)',
    sourceUrl: 'https://medicines.abbott.com/product/tarka/',
  },
  {
    brandName: 'Omacor 1000 mg',
    brandNameAr: 'أوماكور 1000 ملغ',
    genericName: 'Omega-3-acid ethyl esters',
    drugClass: 'Purified Omega-3 Fatty Acid Ethyl Esters (C10AX06)',
    strength: '1000 mg (containing 460 mg EPA ethyl ester + 380 mg DHA ethyl ester)',
    dosageForm: 'Capsule, soft',
    route: 'Oral',
    packSize: '28 soft capsules',
    approvedIndications:
      'Endogenous hypertriglyceridaemia as a supplement to diet when dietary measures alone are insufficient: type IV in monotherapy, and type IIb/III in combination with statins when control of triglycerides is insufficient.',
    usualAdultDose:
      'Hypertriglyceridaemia: initial treatment is 2 capsules (2000 mg) daily; if adequate response is not obtained, the dose may be increased to 4 capsules (4000 mg) daily. Take capsules with food to avoid gastrointestinal disturbances.',
    contraindications:
      'Hypersensitivity to the active substance, soya, peanut, or any of the excipients.',
    commonAdverseEffects:
      'Gastrointestinal disorders (abdominal distension, abdominal pain, constipation, diarrhoea, dyspepsia, flatulence, eructation, gastro-oesophageal reflux disease, nausea, vomiting), dose-dependent risk of atrial fibrillation in patients with established cardiovascular disease or cardiovascular risk factors.',
    storageConditions:
      'Store below 25°C. Do not freeze.',
    specialties: ['Cardiology', 'Endocrinology', 'Internal Medicine'],
    sourceTitle: 'Abbott Medicines Global Official Product Information – Omacor (omega-3-acid ethyl esters)',
    sourceUrl: 'https://medicines.abbott.com/product/omacor/',
  },
];

export const ABBOTT_PRODUCTS: AiProductDraft[] =
  ABBOTT_COMPACT_PRODUCTS.map(toAbbottProductDraft);
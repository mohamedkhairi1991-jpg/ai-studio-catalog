import type { AiDraftSource, AiProductDraft } from './catalog';

const IBSA_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactIbsaDrug {
  brandName: string;
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

const IBSA_COMPACT_PRODUCTS: CompactIbsaDrug[] = [
  // =========================================================================
  // REPRODUCTIVE MEDICINE & FERTILITY
  // =========================================================================
  {
    brandName: 'Meriofert 75 IU',
    genericName: 'Menotrophin',
    drugClassNameEn: 'Gonadotrophin (Highly Purified Human Menopausal Gonadotrophin, hMG)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '75 IU FSH + 75 IU LH',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 vial of powder + 1 pre-filled syringe of 1 mL solvent',
    indications:
      'Anovulation (including polycystic ovarian disease, PCOD) in women who have been unresponsive to treatment with clomifene citrate; controlled ovarian hyperstimulation to induce the development of multiple follicles for assisted reproductive technologies (ART) such as in vitro fertilisation (IVF), gamete intra-fallopian transfer (GIFT) and intracytoplasmic sperm injection (ICSI).',
    adultDosage:
      'Individualised according to ovarian response monitored by ultrasound and serum oestradiol. Anovulation: usually starts at 75–150 IU daily for at least 7 days, adjusted every 7 days up to a maximum of 225 IU daily. Controlled ovarian hyperstimulation for ART: usually starts at 150–225 IU daily from day 2 or 3 of the cycle, adjusted according to response (maximum 450 IU daily).',
    contraindications:
      'Hypersensitivity to menotrophin or any excipient; tumours of the pituitary gland or hypothalamus; ovarian, uterine or mammary carcinoma; pregnancy and lactation; gynaecological haemorrhage of unknown aetiology; ovarian cysts or enlarged ovaries not due to polycystic ovarian disease; primary ovarian failure; malformation of sexual organs or fibroid tumours of the uterus incompatible with pregnancy.',
    sideEffects:
      'Headache, abdominal pain, abdominal distension, nausea, pelvic pain, ovarian hyperstimulation syndrome (OHSS), injection site pain and erythema, breast tenderness, fatigue.',
    storageConditions:
      'Do not store above 25°C. Keep the vial and pre-filled syringe of solvent in the outer carton in order to protect from light. Reconstituted solution should be used immediately.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Meriofert 75 IU Powder and Solvent for Solution for Injection — UK eMC SmPC (IBSA)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Meriofert',
  },
  {
    brandName: 'Meriofert 150 IU',
    genericName: 'Menotrophin',
    drugClassNameEn: 'Gonadotrophin (Highly Purified Human Menopausal Gonadotrophin, hMG)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '150 IU FSH + 150 IU LH',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 vial of powder + 1 pre-filled syringe of 1 mL solvent',
    indications:
      'Controlled ovarian hyperstimulation to induce multiple follicular development in women undergoing assisted reproductive technology (ART) programmes; anovulation (including PCOD) in women unresponsive to clomifene citrate.',
    adultDosage:
      'Controlled ovarian hyperstimulation: typically 150–225 IU daily starting on day 2 or 3 of the cycle, adjusted based on transvaginal ultrasound and oestradiol monitoring up to a maximum of 450 IU daily until adequate follicular development is achieved, followed by hCG for final follicular maturation.',
    contraindications:
      'Hypersensitivity to menotrophin; hypothalamic or pituitary tumours; ovarian, uterine or breast carcinoma; undiagnosed vaginal bleeding; non-PCOD ovarian cysts or enlargement; pregnancy and lactation.',
    sideEffects:
      'Ovarian hyperstimulation syndrome (OHSS), pelvic pain, abdominal distension, nausea, headache, injection site bruising or erythema.',
    storageConditions:
      'Do not store above 25°C. Keep in the outer carton to protect from light. Use immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Meriofert 150 IU Powder and Solvent for Solution for Injection — UK eMC SmPC (IBSA)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Meriofert',
  },
  {
    brandName: 'Fostimon 75 IU',
    genericName: 'Urofollitropin',
    drugClassNameEn: 'Gonadotrophin (Highly Purified Human Follicle-Stimulating Hormone, FSH)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '75 IU',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 vial of powder + 1 ampoule of 1 mL solvent',
    indications:
      'Anovulation (including polycystic ovarian syndrome, PCOS) in women who have been unresponsive to treatment with clomifene citrate; stimulation of multifollicular development in patients undergoing superovulation for assisted reproductive technologies (ART) such as IVF, GIFT and ZIFT.',
    adultDosage:
      'Anovulation: typically initiated at 75–150 IU FSH daily for at least 7 days and increased by 37.5–75 IU at 7- or 14-day intervals if necessary (maximum daily dose 225 IU). Controlled ovarian hyperstimulation: 150–225 IU daily starting on day 2 or 3 of the cycle (maximum 450 IU daily).',
    contraindications:
      'Hypersensitivity to urofollitropin or any excipient; enlargement of the ovaries or cysts not caused by PCOS; gynaecological haemorrhages of unknown cause; ovarian, uterine or breast carcinoma; tumours of the hypothalamus or pituitary gland; primary ovarian failure; reproductive tract malformations incompatible with pregnancy; pregnancy and lactation.',
    sideEffects:
      'Headache, abdominal distension, constipation, abdominal pain, nausea, ovarian hyperstimulation syndrome (OHSS), pelvic pain, breast tenderness, local injection site reactions.',
    storageConditions:
      'Do not store above 25°C. Keep the vial and solvent ampoule in the outer carton to protect from light. Use immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Fostimon 75 IU Powder and Solvent for Solution for Injection — UK eMC SmPC (IBSA)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fostimon',
  },
  {
    brandName: 'Fostimon 150 IU',
    genericName: 'Urofollitropin',
    drugClassNameEn: 'Gonadotrophin (Highly Purified Human Follicle-Stimulating Hormone, FSH)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '150 IU',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 vial of powder + 1 ampoule of 1 mL solvent',
    indications:
      'Controlled ovarian hyperstimulation for multifollicular development in assisted reproductive technologies (IVF, ICSI, GIFT); anovulation (including PCOS) unresponsive to clomifene citrate.',
    adultDosage:
      '150–225 IU daily subcutaneously or intramuscularly starting on day 2 or 3 of the cycle, adjusted according to follicular growth and serum oestradiol levels (maximum 450 IU daily).',
    contraindications:
      'Hypersensitivity to urofollitropin; hypothalamic or pituitary tumours; non-PCOS ovarian cysts; undiagnosed gynaecological bleeding; ovarian, uterine or mammary carcinoma; pregnancy and lactation.',
    sideEffects:
      'Ovarian hyperstimulation syndrome (OHSS), pelvic pain, abdominal bloating, headache, nausea, injection site pain.',
    storageConditions:
      'Do not store above 25°C. Keep in the original package to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Fostimon 150 IU Powder and Solvent for Solution for Injection — UK eMC SmPC (IBSA)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Fostimon',
  },
  {
    brandName: 'Choriomon 5000 IU',
    genericName: 'Chorionic gonadotrophin',
    drugClassNameEn: 'Gonadotrophin (Human Chorionic Gonadotrophin, hCG)',
    dosageForm: 'Powder and solvent for solution for injection',
    strength: '5000 IU',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 vial of powder + 1 ampoule of 1 mL solvent',
    indications:
      'Induction of final follicular maturation and luteinisation after stimulation of follicular growth in women undergoing assisted reproductive technologies (ART) or ovulation induction; hypogonadotrophic hypogonadism and cryptorchidism (not due to anatomical obstruction) in males.',
    adultDosage:
      'Women undergoing ovulation induction or ART: 5,000 IU to 10,000 IU as a single subcutaneous or intramuscular injection 24 to 48 hours after optimal follicular growth has been achieved with FSH or hMG.',
    contraindications:
      'Hypersensitivity to human chorionic gonadotrophin or any excipient; uncontrolled non-gonadal endocrinopathies (thyroid, adrenal or pituitary disorders); breast, uterine or ovarian tumours; active thromboembolic disorders; undiagnosed vaginal bleeding; androgen-dependent tumours (prostate or male breast carcinoma).',
    sideEffects:
      'Headache, fatigue, mood changes, ovarian hyperstimulation syndrome (OHSS), abdominal pain, nausea, gynaecomastia (in males), injection site pain or erythema, thromboembolic events (rare, usually associated with severe OHSS).',
    storageConditions:
      'Do not store above 25°C. Protect from light. Use immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology', 'Urology'],
    sourceTitle: 'Choriomon (chorionic gonadotrophin) — Drugs.com international monograph',
    sourceUrl: 'https://www.drugs.com/international/choriomon.html',
  },
  {
    brandName: 'Lubion 25 mg',
    genericName: 'Progesterone',
    drugClassNameEn: 'Progestogen (Aqueous Subcutaneous Progesterone)',
    dosageForm: 'Solution for injection',
    strength: '25 mg / 1.112 mL',
    route: 'Subcutaneous or Intramuscular',
    packSize: '7 vials x 1.112 mL',
    indications:
      'Luteal support as part of an Assisted Reproductive Technology (ART) treatment programme in infertile women who are unable to use or tolerate vaginal preparations.',
    adultDosage:
      'One 25 mg injection once daily (subcutaneously or intramuscularly) starting from the day of oocyte retrieval and usually continued until 12 weeks of confirmed pregnancy.',
    contraindications:
      'Hypersensitivity to progesterone or hydroxypropylbetadex; undiagnosed vaginal bleeding; known missed abortion or ectopic pregnancy; severe hepatic dysfunction or disease; known or suspected breast or genital tract cancer; active arterial or venous thromboembolism or severe thrombophlebitis, or a history of these events; porphyria; history of idiopathic jaundice, severe pruritus or pemphigoid gestationis during pregnancy.',
    sideEffects:
      'Injection site reactions (irritation, pain, pruritus, swelling, bruising, induration), uterine spasm, vaginal haemorrhage, headache, abdominal pain, nausea, vomiting, constipation, breast tenderness, ovarian hyperstimulation syndrome.',
    storageConditions:
      'Store below 25°C. Do not refrigerate or freeze. Store in the original package in order to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Endocrinology'],
    sourceTitle: 'Lubion 25 mg Solution for Injection — UK eMC SmPC (IBSA)',
    sourceUrl: 'https://www.medicines.org.uk/emc/search?q=Lubion',
  },
  {
    brandName: 'Tirosint 25 mcg',
    genericName: 'Levothyroxine sodium',
    drugClassNameEn: 'Thyroid Hormone',
    dosageForm: 'Soft capsule',
    strength: '25 mcg',
    route: 'Oral',
    packSize: '30 soft capsules',
    indications:
      'Hypothyroidism: replacement therapy in primary (thyroidal), secondary (pituitary), and tertiary (hypothalamic) congenital or acquired hypothyroidism; pituitary thyrotropin (TSH) suppression as an adjunct to surgery and radioiodine therapy in the management of thyrotropin-dependent well-differentiated thyroid cancer.',
    adultDosage:
      'Individualised according to clinical response and laboratory parameters (TSH and free T4). Taken as a single daily dose on an empty stomach, one-half to one hour before breakfast with a full glass of water. 25 mcg is frequently used as an initial or titration step in elderly patients or those with underlying cardiovascular disease.',
    contraindications:
      'Uncorrected adrenal insufficiency; untreated thyrotoxicosis; acute myocardial infarction, acute myocarditis, and acute pancarditis; hypersensitivity to levothyroxine sodium or capsule excipients (gelatin, glycerol, water). Not indicated for suppression of benign thyroid nodules in iodine-sufficient patients or for treatment of obesity/weight loss.',
    sideEffects:
      'Adverse reactions are primarily those of hyperthyroidism due to therapeutic overdosage: arrhythmias, tachycardia, palpitations, angina, tremor, insomnia, headache, anxiety, hyperhidrosis, weight loss, diarrhoea, heat intolerance, decreased bone mineral density with chronic over-replacement.',
    storageConditions:
      'Store at 20°C to 25°C (68°F to 77°F). Protect from heat, light, and moisture. Do not remove capsules from blisters until immediately before use.',
    specialties: ['Endocrinology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Tirosint (Levothyroxine Sodium) Soft Capsules — DailyMed FDA Prescribing Information (IBSA)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tirosint',
  },
  {
    brandName: 'Tirosint 50 mcg',
    genericName: 'Levothyroxine sodium',
    drugClassNameEn: 'Thyroid Hormone',
    dosageForm: 'Soft capsule',
    strength: '50 mcg',
    route: 'Oral',
    packSize: '30 soft capsules',
    indications:
      'Thyroid hormone replacement in congenital or acquired primary, secondary, or tertiary hypothyroidism; pituitary TSH suppression in well-differentiated thyroid cancer.',
    adultDosage:
      'Taken once daily on an empty stomach 30–60 minutes before breakfast. Usual adult starting dose in mild-to-moderate hypothyroidism is 50 mcg daily (or 1.6 mcg/kg/day full replacement in healthy non-elderly adults), adjusted every 4–6 weeks based on serum TSH.',
    contraindications:
      'Uncorrected adrenal insufficiency; untreated hyperthyroidism; acute myocardial infarction or acute myocarditis; hypersensitivity to any component.',
    sideEffects:
      'With excessive dosing: palpitations, tachycardia, atrial fibrillation, nervousness, insomnia, tremor, weight loss, diarrhoea, sweating.',
    storageConditions:
      'Store at 20°C to 25°C in the original blister packaging to protect from moisture and light.',
    specialties: ['Endocrinology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Tirosint (Levothyroxine Sodium) Soft Capsules — DailyMed FDA Prescribing Information (IBSA)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tirosint',
  },
  {
    brandName: 'Tirosint 100 mcg',
    genericName: 'Levothyroxine sodium',
    drugClassNameEn: 'Thyroid Hormone',
    dosageForm: 'Soft capsule',
    strength: '100 mcg',
    route: 'Oral',
    packSize: '30 soft capsules',
    indications:
      'Maintenance replacement therapy in primary, secondary, or tertiary hypothyroidism; pituitary TSH suppression in the management of well-differentiated thyroid carcinoma.',
    adultDosage:
      'One 100 mcg soft capsule once daily on an empty stomach 30–60 minutes before breakfast (swallowed whole with water), titrated in 12.5–25 mcg increments every 4–6 weeks until euthyroid and serum TSH normalises.',
    contraindications:
      'Uncorrected adrenal cortical insufficiency; untreated thyrotoxicosis; acute myocardial infarction; hypersensitivity to levothyroxine or excipients.',
    sideEffects:
      'Symptoms of iatrogenic hyperthyroidism if over-replaced: tachycardia, arrhythmias, angina pectoris, tremor, restlessness, insomnia, headache, flushing, diarrhoea, bone mineral density reduction.',
    storageConditions:
      'Store below 25°C in the original blister to protect from moisture and light.',
    specialties: ['Endocrinology', 'Internal Medicine', 'General Practice / Family Medicine'],
    sourceTitle: 'Tirosint (Levothyroxine Sodium) Soft Capsules — DailyMed FDA Prescribing Information (IBSA)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tirosint',
  },

  // =========================================================================
  // PAIN, INFLAMMATION & OSTEOARTHRITIS
  // =========================================================================
  {
    brandName: 'Flector Tissugel 180 mg Medicated Plaster',
    genericName: 'Diclofenac epolamine',
    drugClassNameEn: 'Topical Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    dosageForm: 'Medicated plaster',
    strength: '180 mg (1.3% w/w; equivalent to 140 mg diclofenac sodium)',
    route: 'Cutaneous (topical)',
    packSize: '5 medicated plasters (10 cm x 14 cm)',
    indications:
      'Local symptomatic treatment of pain and inflammation of rheumatic or traumatic origin affecting joints, muscles, tendons and ligaments (such as sprains, strains, contusions, epicondylitis, tendinitis and localised osteoarthritis).',
    adultDosage:
      'Apply 1 medicated plaster to the most painful area once or twice daily (every 12 or 24 hours) for the shortest duration necessary (usually up to 7–14 days). Apply only to intact, non-diseased skin.',
    contraindications:
      'Hypersensitivity to diclofenac, acetylsalicylic acid, other NSAIDs, or excipients (propylene glycol, methyl/propyl parahydroxybenzoate); patients in whom aspirin or other NSAIDs precipitate asthma, urticaria or acute rhinitis; active peptic ulcer; application to damaged, exuding, eczematous or infected skin or open wounds; third trimester of pregnancy; setting of coronary artery bypass graft (CABG) surgery.',
    sideEffects:
      'Application site pruritus, erythema, dermatitis, rash, burning sensation or dryness; systemic NSAID adverse effects are rare due to low systemic absorption but may occur with prolonged application over large areas.',
    storageConditions:
      'Do not store above 25°C. Keep plasters in the sealed envelope; use within 3 months after first opening the resealable envelope.',
    specialties: ['Orthopedics', 'Rheumatology', 'General Practice / Family Medicine'],
    sourceTitle: 'Flector (Diclofenac Epolamine) Topical System — DailyMed FDA Prescribing Information (IBSA)',
    sourceUrl: 'https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Flector',
  },
  {
    brandName: 'Flector EP 1% Gel',
    genericName: 'Diclofenac epolamine',
    drugClassNameEn: 'Topical Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    dosageForm: 'Gel',
    strength: '1% w/w (equivalent to 1 g diclofenac sodium / 100 g)',
    route: 'Cutaneous (topical)',
    packSize: '60 g tube',
    indications:
      'Local symptomatic relief of pain and inflammation in trauma of the tendons, ligaments, muscles and joints (sprains, strains, bruises) and localised forms of soft-tissue rheumatism and osteoarthritis of superficial joints.',
    adultDosage:
      'Apply 2 g to 4 g of gel (depending on the size of the affected area) 3 to 4 times daily and rub in gently. Wash hands after application unless the hands are the treated site. Do not use for longer than 14 days without medical review.',
    contraindications:
      'Hypersensitivity to diclofenac, acetylsalicylic acid or other NSAIDs; history of NSAID-induced asthma, angioedema or urticaria; application to broken, eczematous or infected skin; third trimester of pregnancy.',
    sideEffects:
      'Local skin rash, itching, erythema, contact dermatitis, photosensitivity reactions (rare).',
    storageConditions:
      'Store below 25°C.',
    specialties: ['Orthopedics', 'Rheumatology', 'General Practice / Family Medicine'],
    sourceTitle: 'Flector EP Gel (diclofenac epolamine) — Swiss product information',
    sourceUrl: 'https://medikamio.com/de-ch/medikamente/flector-ep-gel/pil',
  },
  {
    brandName: 'Condrosulf 400 mg',
    genericName: 'Chondroitin sulfate sodium',
    drugClassNameEn: 'Symptomatic Slow-Acting Drug for Osteoarthritis (SYSADOA)',
    dosageForm: 'Hard capsule',
    strength: '400 mg',
    route: 'Oral',
    packSize: '60 hard capsules',
    indications:
      'Symptomatic treatment of osteoarthritis of the knee, hip, and finger joints with delayed onset of action.',
    adultDosage:
      '800 mg daily (two 400 mg capsules taken as a single daily dose or divided twice daily). In severe cases, an initial dose of 1200 mg daily (three 400 mg capsules) may be given for the first 2–4 weeks, followed by 800 mg daily for at least 3 months.',
    contraindications:
      'Hypersensitivity to chondroitin sulfate sodium or any excipient; pregnancy and lactation (due to insufficient clinical data).',
    sideEffects:
      'Mild gastrointestinal disturbances (nausea, diarrhoea, abdominal discomfort, constipation), rare allergic skin reactions (erythema, pruritus, urticaria) or mild oedema.',
    storageConditions:
      'Store below 25°C in the original blister package to protect from moisture.',
    specialties: ['Orthopedics', 'Rheumatology', 'General Practice / Family Medicine'],
    sourceTitle: 'Condrosulf (chondroitin sulfate) — Swiss Compendium product information',
    sourceUrl: 'https://compendium.ch/mpro/mnr/1892/html/fr',
  },
  {
    brandName: 'Condrosulf 800 mg',
    genericName: 'Chondroitin sulfate sodium',
    drugClassNameEn: 'Symptomatic Slow-Acting Drug for Osteoarthritis (SYSADOA)',
    dosageForm: 'Tablet',
    strength: '800 mg',
    route: 'Oral',
    packSize: '30 tablets',
    indications:
      'Symptomatic slow-acting treatment of degenerative joint disease (osteoarthritis of the knee, hip, and hand joints).',
    adultDosage:
      'One 800 mg tablet once daily taken with water (before, during, or after meals) for courses of at least 3 months.',
    contraindications:
      'Hypersensitivity to chondroitin sulfate sodium or any excipient; pregnancy and breast-feeding.',
    sideEffects:
      'Mild upper gastrointestinal symptoms (epigastric pain, nausea, flatulence, diarrhoea), rare cutaneous hypersensitivity reactions (rash, pruritus), rare peripheral oedema.',
    storageConditions:
      'Store below 25°C in the original package to protect from moisture.',
    specialties: ['Orthopedics', 'Rheumatology', 'General Practice / Family Medicine'],
    sourceTitle: 'Condrosulf (chondroitin sulfate) — Swiss Compendium product information',
    sourceUrl: 'https://compendium.ch/mpro/mnr/1892/html/fr',
  },
];

function toIbsaProductDraft(item: CompactIbsaDrug): AiProductDraft {
  return {
    found: true,
    brandName: item.brandName,
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
    sources: IBSA_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official IBSA Institut Biochimique SA regulatory monograph (UK eMC SmPC / DailyMed FDA / IBSA official portfolio); saved as draft pending verification.',
  };
}

export const IBSA_PRODUCTS: AiProductDraft[] = IBSA_COMPACT_PRODUCTS.map(
  toIbsaProductDraft
);

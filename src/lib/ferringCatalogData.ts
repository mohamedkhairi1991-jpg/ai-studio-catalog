import type { AiDraftSource, AiProductDraft } from './catalog';

interface CompactDrug {
  brandName: string;
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

const RAW_FERRING: CompactDrug[] = [
  // 1. Pentasa (Mesalazine)
  {
    brandName: 'Pentasa 500 mg',
    genericName: 'Mesalazine',
    activeIngredients: ['Mesalazine'],
    drugClass: 'Intestinal anti-inflammatory agent (aminosalicylate / 5-ASA)',
    strength: '500 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 100 prolonged-release tablets in aluminium blisters',
    indications:
      'Treatment of mild to moderate ulcerative colitis and maintenance of remission in ulcerative colitis.',
    dose:
      'Adults: Active disease: individual dosage up to 4 g mesalazine once daily or in divided doses. Maintenance treatment: recommended dose is 2 g mesalazine once daily. Tablets must not be chewed; may be dispersed in 50 mL of cold water or juice immediately before swallowing.',
    contraindications:
      'Hypersensitivity to mesalazine, any of the excipients, or salicylates; severe liver or renal impairment.',
    adverseEffects:
      'Headache, diarrhoea, abdominal pain, nausea, vomiting, flatulence, rash (including urticaria and erythematous rash), dizziness, myocarditis/pericarditis (rare), acute pancreatitis (rare), renal dysfunction including interstitial nephritis (very rare), severe cutaneous adverse reactions (SJS/TEN/DRESS).',
    storage: 'Do not store above 25°C. Store in the original package to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Pentasa Slow Release Tablets 500 mg SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/921/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Contains 500 mg mesalazine in ethylcellulose-coated microgranules for continuous release from duodenum to rectum.',
  },
  {
    brandName: 'Pentasa 1 g Tablet',
    genericName: 'Mesalazine',
    activeIngredients: ['Mesalazine'],
    drugClass: 'Intestinal anti-inflammatory agent (aminosalicylate / 5-ASA)',
    strength: '1 g',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: 'Pack of 60 prolonged-release tablets in aluminium blisters',
    indications:
      'Treatment of mild to moderate ulcerative colitis and maintenance of remission in ulcerative colitis.',
    dose:
      'Adults: Active ulcerative colitis: up to 4 g once daily or in divided doses. Maintenance of remission: 2 g (two 1 g tablets) once daily. Tablets must not be chewed; may be dispersed in 50 mL of cold water immediately before administration.',
    contraindications:
      'Hypersensitivity to mesalazine, any of the excipients, or salicylates; severe liver or renal impairment.',
    adverseEffects:
      'Headache, diarrhoea, abdominal pain, nausea, vomiting, flatulence, rash, dizziness; rare myocarditis/pericarditis, pancreatitis, and interstitial nephritis.',
    storage: 'Store in the original package to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Pentasa Slow Release Tablets 1 g SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1439/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each prolonged-release tablet contains 1 g (1,000 mg) mesalazine.',
  },
  {
    brandName: 'Pentasa Sachet 2 g',
    genericName: 'Mesalazine',
    activeIngredients: ['Mesalazine'],
    drugClass: 'Intestinal anti-inflammatory agent (aminosalicylate / 5-ASA)',
    strength: '2 g',
    dosageForm: 'Prolonged-release granules in sachet',
    route: 'Oral',
    packSize: 'Pack of 60 sachets of prolonged-release granules',
    indications:
      'Treatment of mild to moderate ulcerative colitis and maintenance of remission.',
    dose:
      'Adults: Active disease: up to 4 g once daily or in 2–4 divided doses. Maintenance treatment: 2 g (one 2 g sachet) once daily. Empty the contents of the sachet onto the tongue and wash down with water or orange juice without chewing.',
    contraindications:
      'Hypersensitivity to mesalazine, any of the excipients, or salicylates; severe liver or renal impairment.',
    adverseEffects:
      'Headache, diarrhoea, abdominal pain, nausea, vomiting, flatulence, rash, dizziness; rare myocarditis/pericarditis, acute pancreatitis, and interstitial nephritis.',
    storage: 'Store in the original package in order to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Pentasa Sachet 2 g Prolonged Release Granules SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/276/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each sachet contains 2 g mesalazine prolonged-release granules.',
  },
  {
    brandName: 'Pentasa Suppository 1 g',
    genericName: 'Mesalazine',
    activeIngredients: ['Mesalazine'],
    drugClass: 'Intestinal anti-inflammatory agent (rectal aminosalicylate / 5-ASA)',
    strength: '1 g',
    dosageForm: 'Suppository',
    route: 'Rectal',
    packSize: 'Pack of 28 suppositories in aluminium blisters with finger cots',
    indications:
      'Treatment of ulcerative proctitis.',
    dose:
      'Adults: Acute treatment: one 1 g suppository inserted into the rectum once daily for 2 to 4 weeks. Maintenance treatment: 1 g once daily.',
    contraindications:
      'Hypersensitivity to mesalazine, any excipient, or salicylates; severe liver or renal impairment.',
    adverseEffects:
      'Headache, diarrhoea, abdominal pain, nausea, vomiting, rash, local anal reactions (pruritus, rectal discomfort, painful urgency/tenesmus).',
    storage: 'Do not store above 25°C. Store in the original package to protect from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Pentasa Suppositories 1 g SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/922/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each suppository contains 1 g mesalazine.',
  },

  // 2. Minirin & Minirin Melt (Desmopressin)
  {
    brandName: 'Minirin 0.1 mg',
    genericName: 'Desmopressin',
    activeIngredients: ['Desmopressin'],
    drugClass: 'Synthetic vasopressin analogue (selective V2-receptor agonist / antidiuretic hormone)',
    strength: '0.1 mg (100 mcg)',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'HDPE bottle of 30 or 90 scored tablets',
    indications:
      'Treatment of central diabetes insipidus; treatment of primary nocturnal enuresis in patients (from 5 years of age) with normal ability to concentrate urine; symptomatic treatment of nocturia in adults associated with nocturnal polyuria.',
    dose:
      'Central diabetes insipidus: initial dose in adults and children is 0.1 mg three times daily, adjusted to patient response (usual maintenance 0.1–0.2 mg three times daily). Primary nocturnal enuresis: 0.2 mg at bedtime (may be increased up to 0.4 mg if needed) with fluid restriction from 1 hour before until 8 hours after administration. Nocturia in adults: 0.1 mg at bedtime, titrated weekly to 0.2 mg and up to 0.4 mg if needed; monitor serum sodium.',
    contraindications:
      'Hypersensitivity to desmopressin or any excipient; habitual or psychogenic polydipsia; known or suspected cardiac insufficiency and other conditions requiring treatment with diuretics; moderate and severe renal insufficiency (creatinine clearance <50 mL/min); known hyponatraemia; syndrome of inappropriate ADH secretion (SIADH).',
    adverseEffects:
      'Headache, hyponatraemia, dizziness, hypertension, nausea, abdominal pain, diarrhoea, constipation, vomiting, bladder and urethral symptoms, oedema, fatigue; water intoxication and hyponatraemic convulsions if fluid intake is not restricted.',
    storage: 'Do not store above 25°C. Keep the container tightly closed to protect from moisture; do not remove the desiccant capsule from the cap.',
    specialties: ['Endocrinology', 'Urology', 'Pediatrics', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Desmopressin / Minirin 0.1 mg & 0.2 mg Tablets SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/12299/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each tablet contains 0.1 mg desmopressin acetate (equivalent to 0.089 mg desmopressin base). Generic name normalized to INN base (Desmopressin).',
  },
  {
    brandName: 'Minirin 0.2 mg',
    genericName: 'Desmopressin',
    activeIngredients: ['Desmopressin'],
    drugClass: 'Synthetic vasopressin analogue (selective V2-receptor agonist / antidiuretic hormone)',
    strength: '0.2 mg (200 mcg)',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: 'HDPE bottle of 30 or 90 scored tablets',
    indications:
      'Treatment of central diabetes insipidus; treatment of primary nocturnal enuresis in patients (from 5 years of age) with normal ability to concentrate urine; symptomatic treatment of nocturia in adults associated with nocturnal polyuria.',
    dose:
      'Central diabetes insipidus: usual maintenance is 0.1 mg to 0.2 mg three times daily. Primary nocturnal enuresis: initial dose 0.2 mg at bedtime (up to 0.4 mg at bedtime if lower dose is not sufficiently effective), with strict evening fluid restriction.',
    contraindications:
      'Hypersensitivity to desmopressin or any excipient; habitual or psychogenic polydipsia; cardiac insufficiency and other conditions requiring diuretics; moderate and severe renal insufficiency (creatinine clearance <50 mL/min); known hyponatraemia; SIADH.',
    adverseEffects:
      'Headache, hyponatraemia, dizziness, hypertension, nausea, abdominal pain, diarrhoea, constipation, vomiting, oedema, fatigue.',
    storage: 'Do not store above 25°C. Keep the container tightly closed to protect from moisture.',
    specialties: ['Endocrinology', 'Urology', 'Pediatrics', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Desmopressin / Minirin 0.1 mg & 0.2 mg Tablets SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/12299/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each tablet contains 0.2 mg desmopressin acetate (equivalent to 0.178 mg desmopressin base). Generic name normalized to INN base (Desmopressin).',
  },
  {
    brandName: 'Minirin Melt 60 mcg',
    genericName: 'Desmopressin',
    activeIngredients: ['Desmopressin'],
    drugClass: 'Synthetic vasopressin analogue (selective V2-receptor agonist / antidiuretic hormone)',
    strength: '60 mcg',
    dosageForm: 'Oral lyophilisate',
    route: 'Sublingual',
    packSize: 'Pack of 30 or 100 oral lyophilisates in aluminium/aluminium blisters',
    indications:
      'Treatment of central diabetes insipidus; treatment of primary nocturnal enuresis in patients (from 5 years of age) with normal ability to concentrate urine; symptomatic treatment of nocturia in adults associated with nocturnal polyuria.',
    dose:
      'Placed under the tongue where it dissolves without the need for water. Central diabetes insipidus: start with 60 mcg three times daily sublingually and adjust to response (usual maintenance 60–120 mcg three times daily). Nocturia in adults: initial dose 60 mcg at bedtime sublingually, titrated weekly to 120 mcg and subsequently 240 mcg if needed.',
    contraindications:
      'Hypersensitivity to desmopressin or any excipient; habitual or psychogenic polydipsia; known or suspected cardiac insufficiency and other conditions requiring treatment with diuretics; moderate and severe renal insufficiency (creatinine clearance <50 mL/min); known hyponatraemia; SIADH.',
    adverseEffects:
      'Headache, hyponatraemia, dizziness, hypertension, nausea, abdominal pain, diarrhoea, constipation, vomiting, oedema, fatigue.',
    storage: 'Store in the original package in order to protect from moisture and light.',
    specialties: ['Endocrinology', 'Urology', 'Pediatrics', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — DDAVP / Minirin Melt 60 mcg Oral Lyophilisate SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/135/smpc',
      },
    ],
    notes:
      'Official Ferring Pharmaceuticals SmPC data (marketed as Minirin Melt in the Middle East and Europe). Each oral lyophilisate contains 60 mcg desmopressin (free base, added as desmopressin acetate). Generic name normalized to INN base (Desmopressin).',
  },
  {
    brandName: 'Minirin Melt 120 mcg',
    genericName: 'Desmopressin',
    activeIngredients: ['Desmopressin'],
    drugClass: 'Synthetic vasopressin analogue (selective V2-receptor agonist / antidiuretic hormone)',
    strength: '120 mcg',
    dosageForm: 'Oral lyophilisate',
    route: 'Sublingual',
    packSize: 'Pack of 30 or 100 oral lyophilisates in aluminium/aluminium blisters',
    indications:
      'Treatment of central diabetes insipidus; treatment of primary nocturnal enuresis in patients (from 5 years of age) with normal ability to concentrate urine; symptomatic treatment of nocturia in adults associated with nocturnal polyuria.',
    dose:
      'Primary nocturnal enuresis: recommended initial dose is 120 mcg at bedtime administered sublingually without water (may be increased up to 240 mcg if 120 mcg is not sufficiently effective), with fluid restriction from 1 hour before until 8 hours after administration. Central diabetes insipidus: 60–120 mcg three times daily sublingually.',
    contraindications:
      'Hypersensitivity to desmopressin or any excipient; habitual or psychogenic polydipsia; cardiac insufficiency and other conditions requiring diuretics; moderate and severe renal insufficiency (creatinine clearance <50 mL/min); known hyponatraemia; SIADH.',
    adverseEffects:
      'Headache, hyponatraemia, dizziness, hypertension, nausea, abdominal pain, diarrhoea, constipation, vomiting, oedema, fatigue.',
    storage: 'Store in the original package in order to protect from moisture and light.',
    specialties: ['Endocrinology', 'Urology', 'Pediatrics', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — DDAVP / Minirin Melt 120 mcg Oral Lyophilisate SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/136/smpc',
      },
    ],
    notes:
      'Official Ferring Pharmaceuticals SmPC data (marketed as Minirin Melt in the Middle East and Europe). Each oral lyophilisate contains 120 mcg desmopressin (free base, added as desmopressin acetate). Generic name normalized to INN base (Desmopressin).',
  },

  // 3. Menopur (Menotropin)
  {
    brandName: 'Menopur 75 IU',
    genericName: 'Menotropin',
    activeIngredients: ['Menotropin'],
    drugClass: 'Human menopausal gonadotropin (highly purified hMG providing 75 IU FSH + 75 IU LH activity)',
    strength: '75 IU FSH + 75 IU LH',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Subcutaneous or intramuscular',
    packSize: 'Pack of 5 or 10 vials of powder + 5 or 10 ampoules of 1 mL solvent',
    indications:
      'Anovulation (including polycystic ovarian syndrome, PCOS) in women who have been unresponsive to treatment with clomiphene citrate; controlled ovarian hyperstimulation to induce the development of multiple follicles for assisted reproductive technologies (ART) such as in vitro fertilisation/embryo transfer (IVF/ET), gamete intra-fallopian transfer (GIFT), and intracytoplasmic sperm injection (ICSI); hypogonadotrophic hypogonadism in men (in combination with hCG) to stimulate spermatogenesis.',
    dose:
      'Individualised according to ovarian response monitored by ultrasound and oestradiol levels. Anovulation: usually starts at 75–150 IU daily for at least 7 days, adjusted by 37.5–75 IU increments every 7 days (maximum 225 IU daily). Controlled ovarian hyperstimulation (ART): usually starts at 150–225 IU daily for at least the first 5 days of treatment, adjusted up to a maximum of 450 IU daily.',
    contraindications:
      'Hypersensitivity to menotropin or any excipient; tumours of the pituitary gland or hypothalamus; ovarian, uterine, or mammary carcinoma; pregnancy and lactation; gynaecological haemorrhage of unknown aetiology; ovarian cysts or enlarged ovaries not due to polycystic ovarian disease; in men: prostate carcinoma or testicular tumours.',
    adverseEffects:
      'Ovarian hyperstimulation syndrome (OHSS), abdominal pain, abdominal distension, nausea, headache, pelvic pain, injection site pain/reaction, ovarian cysts, breast complaints, hot flushes, multiple pregnancy.',
    storage: 'Do not store above 25°C. Do not freeze. Store in the original package in order to protect from light. Use immediately after reconstitution.',
    specialties: ['Obstetrics & Gynecology', 'Reproductive Medicine', 'Endocrinology', 'Andrology'],
    sources: [
      {
        title: 'UK EMC — Menopur 75 IU Powder and Solvent for Solution for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/3840/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Highly purified menotropin (human menopausal gonadotrophin, hMG) corresponding to 75 IU follicle stimulating hormone (FSH) activity and 75 IU luteinising hormone (LH) activity per vial.',
  },
  {
    brandName: 'Menopur 600 IU',
    genericName: 'Menotropin',
    activeIngredients: ['Menotropin'],
    drugClass: 'Human menopausal gonadotropin (highly purified multidose hMG)',
    strength: '600 IU FSH + 600 IU LH',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Subcutaneous',
    packSize: '1 multidose vial of powder + 1 pre-filled syringe of 1 mL solvent + 9 administration syringes',
    indications:
      'Anovulation (including polycystic ovarian syndrome, PCOS) in women unresponsive to clomiphene citrate; controlled ovarian hyperstimulation to induce multiple follicle development in assisted reproductive technologies (ART).',
    dose:
      'Administered by subcutaneous injection only using the graduated administration syringes provided. Individualised according to ovarian response: 75–150 IU daily in anovulation (up to 225 IU/day), or 150–225 IU daily initially in ART (up to 450 IU/day).',
    contraindications:
      'Hypersensitivity to menotropin or any excipient; pituitary or hypothalamic tumours; ovarian, uterine, or breast carcinoma; pregnancy and lactation; undiagnosed gynaecological haemorrhage; non-PCOS ovarian cysts or enlarged ovaries.',
    adverseEffects:
      'Ovarian hyperstimulation syndrome (OHSS), abdominal pain, abdominal distension, nausea, headache, pelvic pain, injection site reactions, multiple pregnancy.',
    storage: 'Store in a refrigerator (2°C–8°C) before reconstitution. Do not freeze. After reconstitution, the solution may be stored for a maximum of 28 days at not more than 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Reproductive Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'UK EMC — Menopur 600 IU Multidose Powder and Solvent for Solution for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/431/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Multidose vial containing highly purified menotropin corresponding to 600 IU FSH activity and 600 IU LH activity.',
  },
  {
    brandName: 'Menopur 1200 IU',
    genericName: 'Menotropin',
    activeIngredients: ['Menotropin'],
    drugClass: 'Human menopausal gonadotropin (highly purified multidose hMG)',
    strength: '1200 IU FSH + 1200 IU LH',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Subcutaneous',
    packSize: '1 multidose vial of powder + 2 pre-filled syringes of 1 mL solvent + 18 administration syringes',
    indications:
      'Anovulation (including polycystic ovarian syndrome, PCOS) in women unresponsive to clomiphene citrate; controlled ovarian hyperstimulation to induce multiple follicle development in assisted reproductive technologies (ART).',
    dose:
      'Administered by subcutaneous injection only using the graduated administration syringes provided. Individualised according to ovarian response: 75–150 IU daily in anovulation (up to 225 IU/day), or 150–225 IU daily initially in ART (up to 450 IU/day).',
    contraindications:
      'Hypersensitivity to menotropin or any excipient; pituitary or hypothalamic tumours; ovarian, uterine, or breast carcinoma; pregnancy and lactation; undiagnosed gynaecological haemorrhage; non-PCOS ovarian cysts or enlarged ovaries.',
    adverseEffects:
      'Ovarian hyperstimulation syndrome (OHSS), abdominal pain, abdominal distension, nausea, headache, pelvic pain, injection site reactions, multiple pregnancy.',
    storage: 'Store in a refrigerator (2°C–8°C) before reconstitution. Do not freeze. After reconstitution, the solution may be stored for a maximum of 28 days at not more than 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Reproductive Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'UK EMC — Menopur 1200 IU Multidose Powder and Solvent for Solution for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/432/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Multidose vial containing highly purified menotropin corresponding to 1200 IU FSH activity and 1200 IU LH activity.',
  },

  // 4. Gonapeptyl (Triptorelin)
  {
    brandName: 'Gonapeptyl 0.1 mg',
    genericName: 'Triptorelin',
    activeIngredients: ['Triptorelin'],
    drugClass: 'Gonadotropin-releasing hormone (GnRH) agonist',
    strength: '0.1 mg/1 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 7 pre-filled syringes of 1 mL',
    indications:
      'Pituitary down-regulation and prevention of premature luteinising hormone (LH) surges in women undergoing controlled ovarian hyperstimulation for assisted reproductive technologies (ART).',
    dose:
      'One pre-filled syringe (0.1 mg triptorelin) injected subcutaneously once daily into the lower abdominal wall, starting either in the early follicular phase (day 2 or 3 of the menstrual cycle) or the mid-luteal phase (day 21–23) and continued until the day of hCG administration.',
    contraindications:
      'Hypersensitivity to triptorelin, gonadotropin-releasing hormone (GnRH), other GnRH analogues, or any excipient; pregnancy and lactation.',
    adverseEffects:
      'Headache, hot flushes, abdominal pain, nausea, abdominal distension, injection site inflammation/pain/erythema, ovarian cysts, ovarian hyperstimulation syndrome (in combination with gonadotropins), mood swings, vaginal dryness, decreased libido.',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Keep the syringes in the outer carton in order to protect from light.',
    specialties: ['Obstetrics & Gynecology', 'Reproductive Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'UK EMC — Gonapeptyl Daily 0.1 mg Solution for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/6225/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each 1 mL pre-filled syringe contains 100 micrograms triptorelin acetate (equivalent to 95.6 micrograms triptorelin free base). Generic name normalized to INN base (Triptorelin).',
  },
  {
    brandName: 'Gonapeptyl Depot 3.75 mg',
    genericName: 'Triptorelin',
    activeIngredients: ['Triptorelin'],
    drugClass: 'Sustained-release gonadotropin-releasing hormone (GnRH) agonist',
    strength: '3.75 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection in pre-filled syringes',
    route: 'Subcutaneous or intramuscular',
    packSize: '1 pre-filled syringe with prolonged-release microcapsules + 1 pre-filled syringe with 1 mL solvent + connector',
    indications:
      'Men: Hormone-dependent locally advanced or metastatic prostate cancer. Women: Symptomatic uterine fibroids (myoma), endometriosis, and pituitary down-regulation in assisted reproduction (ART). Children: Central precocious puberty (girls under 9 years, boys under 10 years).',
    dose:
      'One injection (3.75 mg triptorelin) administered subcutaneously (into abdominal skin, buttock, or thigh) or by deep intramuscular injection every 28 days (every 4 weeks). In central precocious puberty, dosage is weight-adjusted at Day 0, Day 14, Day 28, and every 4 weeks thereafter.',
    contraindications:
      'Hypersensitivity to triptorelin, GnRH, other GnRH analogues, or any excipient; hormone-independent prostate cancer; following surgical castration; pregnancy and lactation in women.',
    adverseEffects:
      'Hot flushes, hyperhidrosis, decreased libido, erectile dysfunction (in men), vaginal dryness/bleeding (in women), headache, arthralgia, bone pain, fatigue, injection site reaction, mood changes/depression, loss of bone mineral density with prolonged use.',
    storage: 'Store in a refrigerator (2°C–8°C). Keep the container in the outer carton. Reconstituted suspension must be injected immediately.',
    specialties: ['Oncology', 'Urology', 'Obstetrics & Gynecology', 'Pediatric Endocrinology'],
    sources: [
      {
        title: 'UK EMC — Gonapeptyl Depot 3.75 mg Powder and Solvent for Suspension for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1428/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Contains 3.75 mg triptorelin (as triptorelin acetate) encapsulated in biodegradable poly-(d,l-lactide-co-glycolide) polymer microcapsules. Generic name normalized to INN base (Triptorelin).',
  },

  // 5. Firmagon (Degarelix)
  {
    brandName: 'Firmagon 80 mg',
    genericName: 'Degarelix',
    activeIngredients: ['Degarelix'],
    drugClass: 'Selective gonadotropin-releasing hormone (GnRH) antagonist (blocker)',
    strength: '80 mg',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Subcutaneous',
    packSize: '1 vial of 80 mg powder + 1 pre-filled syringe of 4.2 mL solvent + vial adapter and injection needle',
    indications:
      'Treatment of adult male patients with advanced hormone-dependent prostate cancer; treatment of high-risk localized and locally advanced hormone-dependent prostate cancer in combination with radiotherapy; neoadjuvant treatment prior to radiotherapy in patients with high-risk localized or locally advanced hormone-dependent prostate cancer.',
    dose:
      'Maintenance dose: 80 mg administered as one subcutaneous injection of 4 mL (20 mg/mL) once every month (every 28 days), starting one month after the 240 mg starting dose. Administer in the abdominal region ONLY; rotate injection sites.',
    contraindications:
      'Hypersensitivity to degarelix or to any of the excipients.',
    adverseEffects:
      'Hot flushes, injection site adverse events (pain, erythema, swelling, induration, nodule), anaemia, weight increase, insomnia, dizziness, headache, diarrhoea, nausea, increased hepatic transaminases, hyperhidrosis, rash, musculoskeletal pain, gynaecomastia, testicular atrophy, erectile dysfunction, chills, pyrexia, fatigue, influenza-like illness.',
    storage: 'This medicinal product does not require any special storage conditions. Use immediately after reconstitution.',
    specialties: ['Oncology', 'Urology'],
    sources: [
      {
        title: 'EMA EPAR — Firmagon (degarelix) Product Information (Ferring Pharmaceuticals A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/firmagon',
      },
    ],
    notes:
      'Official EMA EPAR product information (Ferring Pharmaceuticals A/S). Each vial contains 80 mg degarelix (as degarelix acetate). Generic name normalized to INN base (Degarelix).',
  },
  {
    brandName: 'Firmagon 120 mg',
    genericName: 'Degarelix',
    activeIngredients: ['Degarelix'],
    drugClass: 'Selective gonadotropin-releasing hormone (GnRH) antagonist (blocker)',
    strength: '120 mg',
    dosageForm: 'Powder and solvent for solution for injection',
    route: 'Subcutaneous',
    packSize: 'Starter pack of 2 vials of 120 mg powder + 2 pre-filled syringes of 3 mL solvent + vial adapters and needles',
    indications:
      'Initiation of treatment in adult male patients with advanced hormone-dependent prostate cancer, or high-risk localized and locally advanced hormone-dependent prostate cancer in combination with or as neoadjuvant prior to radiotherapy.',
    dose:
      'Starting dose: 240 mg administered as TWO consecutive subcutaneous injections of 120 mg each (2 x 3 mL at 40 mg/mL concentration) in the abdominal region, followed 1 month later by 80 mg maintenance injections every 28 days.',
    contraindications:
      'Hypersensitivity to degarelix or to any of the excipients.',
    adverseEffects:
      'Hot flushes, injection site reactions (pain, erythema, swelling, induration, nodule), anaemia, weight increase, insomnia, dizziness, headache, diarrhoea, nausea, increased hepatic transaminases, hyperhidrosis, musculoskeletal pain, gynaecomastia, testicular atrophy, erectile dysfunction, fatigue.',
    storage: 'This medicinal product does not require any special storage conditions. Use immediately after reconstitution.',
    specialties: ['Oncology', 'Urology'],
    sources: [
      {
        title: 'EMA EPAR — Firmagon (degarelix) Product Information (Ferring Pharmaceuticals A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/firmagon',
      },
    ],
    notes:
      'Official EMA EPAR product information (Ferring Pharmaceuticals A/S). Starter pack containing two 120 mg vials of degarelix (as degarelix acetate) for the 240 mg initiation dose. Generic name normalized to INN base (Degarelix).',
  },

  // 6. Rekovelle (Follitropin delta)
  {
    brandName: 'Rekovelle 72 mcg/2.16 mL',
    genericName: 'Follitropin delta',
    activeIngredients: ['Follitropin delta'],
    drugClass: 'Human cell-line derived recombinant follicle-stimulating hormone (rFSH)',
    strength: '72 mcg/2.16 mL (33.3 mcg/mL)',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '1 multidose pre-filled pen (2.16 mL) + 9 injection needles',
    indications:
      'Controlled ovarian stimulation for the development of multiple follicles in women undergoing assisted reproductive technologies (ART) such as an in vitro fertilisation (IVF) or intracytoplasmic sperm injection (ICSI) cycle.',
    dose:
      'Dosed in micrograms (not IU) using an individualised algorithm based on the woman serum anti-Müllerian hormone (AMH) concentration and body weight. For the first treatment cycle, the fixed daily subcutaneous dose (ranging up to 12 micrograms/day; up to 24 micrograms/day in subsequent cycles) is initiated on day 2 or 3 after start of menstrual bleeding and continued until adequate follicular development (>=3 follicles >=17 mm) is achieved.',
    contraindications:
      'Hypersensitivity to follitropin delta or any excipient; tumours of the hypothalamus or pituitary gland; ovarian enlargement or ovarian cyst not due to polycystic ovarian syndrome; gynaecological haemorrhages of unknown aetiology; ovarian, uterine, or mammary carcinoma; primary ovarian failure; malformations of sexual organs or fibroid tumours of the uterus incompatible with pregnancy.',
    adverseEffects:
      'Headache, pelvic discomfort, ovarian hyperstimulation syndrome (OHSS), pelvic pain, adnexa uteri pain, nausea, fatigue, somnolence, dizziness, diarrhoea, vomiting, constipation, abdominal discomfort.',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Before first use, may be stored at or below 25°C for up to 3 months. In-use shelf life after first opening: 28 days when stored at or below 25°C.',
    specialties: ['Obstetrics & Gynecology', 'Reproductive Medicine', 'Endocrinology'],
    sources: [
      {
        title: 'EMA EPAR — Rekovelle (follitropin delta) Product Information (Ferring Pharmaceuticals A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rekovelle',
      },
    ],
    notes:
      'Official EMA EPAR product information (Ferring Pharmaceuticals A/S). Also available in 12 mcg/0.36 mL and 36 mcg/1.08 mL pre-filled pens.',
  },

  // 7. Propess (Dinoprostone)
  {
    brandName: 'Propess 10 mg',
    genericName: 'Dinoprostone',
    activeIngredients: ['Dinoprostone'],
    drugClass: 'Prostaglandin E2 (PGE2) controlled-release vaginal delivery system for cervical ripening',
    strength: '10 mg (releasing ~0.3 mg/hour over 24 hours)',
    dosageForm: 'Vaginal delivery system',
    route: 'Vaginal',
    packSize: 'Pack of 5 individually foil-sealed vaginal delivery systems with retrieval tape',
    indications:
      'Initiation of cervical ripening in pregnant women at term (from 37 completed weeks of gestation).',
    dose:
      'One vaginal delivery system is inserted high into the posterior vaginal fornix using only small amounts of water-soluble lubricants. If cervical ripening is judged to be insufficient within 24 hours, the vaginal delivery system must be removed (maximum 24 hours). An interval of at least 30 minutes is recommended before sequential use of oxytocin following removal.',
    contraindications:
      'When labour has started; when oxytocic drugs and/or other labour induction agents are being given; when strong prolonged uterine contractions would be inappropriate (such as previous major uterine surgery/caesarean section, cephalopelvic disproportion, fetal malpresentation, suspicion or evidence of fetal distress, >=3 full-term deliveries, previous surgery or rupture of the cervix); current pelvic inflammatory disease unless adequately treated; hypersensitivity to dinoprostone or any excipient; placenta praevia or unexplained vaginal bleeding during the current pregnancy.',
    adverseEffects:
      'Fetal heart rate disorder, fetal distress syndrome, abnormal labour affecting fetus, uterine hyperstimulation, uterine hypertonus, meconium in amniotic fluid, nausea, vomiting, diarrhoea, abdominal pain, postpartum haemorrhage, uterine rupture (rare).',
    storage: 'Store in a freezer (-10°C to -25°C). Store in the original container in order to protect from moisture. Remove from the freezer immediately before insertion.',
    specialties: ['Obstetrics & Gynecology'],
    sources: [
      {
        title: 'UK EMC — Propess 10 mg Vaginal Delivery System SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/142/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Polymeric hydrogel vaginal insert containing 10 mg dinoprostone (Prostaglandin E2) enclosed in a polyester retrieval net.',
  },

  // 8. Glypressin (Terlipressin)
  {
    brandName: 'Glypressin 1 mg',
    genericName: 'Terlipressin',
    activeIngredients: ['Terlipressin'],
    drugClass: 'Synthetic triglycyl-lysine vasopressin analogue (splanchnic vasoconstrictor)',
    strength: '1 mg (equivalent to 0.85 mg terlipressin free base)',
    dosageForm: 'Solution for injection (or powder and solvent for solution for injection)',
    route: 'Intravenous',
    packSize: 'Pack of 5 ampoules of 8.5 mL solution for injection (0.12 mg/mL terlipressin acetate)',
    indications:
      'Treatment of bleeding oesophageal varices and treatment of hepatorenal syndrome (type 1) in patients with cirrhosis.',
    dose:
      'Bleeding oesophageal varices (adults): Initial IV bolus of 1 to 2 mg terlipressin acetate (8.5 to 17 mL), followed by maintenance IV injections every 4 to 6 hours according to body weight (<50 kg: 1 mg; 50–70 kg: 1.5 mg; >70 kg: 2 mg) for 24 to 48 hours until bleeding is controlled (maximum 48 hours). Hepatorenal syndrome type 1: 1 mg IV every 6 hours (or continuous IV infusion starting at 2 mg/day) in combination with human albumin.',
    contraindications:
      'Hypersensitivity to terlipressin or any excipient; septic shock in patients with a low cardiac output; pregnancy.',
    adverseEffects:
      'Headache, bradycardia, peripheral vasoconstriction, peripheral ischaemia, facial pallor, hypertension, transient abdominal cramps, transient diarrhoea, hyponatraemia, fluid overload, pulmonary oedema, respiratory failure (especially in hepatorenal syndrome), myocardial ischaemia, skin necrosis.',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Keep ampoules in the outer carton to protect from light.',
    specialties: ['Gastroenterology', 'Hepatology', 'Critical Care', 'Emergency Medicine'],
    sources: [
      {
        title: 'UK EMC — Glypressin Solution for Injection 1 mg/8.5 mL SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/1592/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Each ampoule contains 1 mg terlipressin acetate, equivalent to 0.85 mg terlipressin base. Generic name normalized to INN base (Terlipressin).',
  },

  // 9. Picoprep (Sodium picosulfate + Magnesium oxide + Citric acid)
  {
    brandName: 'Picoprep 10 mg / 3.5 g / 12 g',
    genericName: 'Sodium picosulfate + Magnesium oxide + Citric acid',
    activeIngredients: ['Sodium picosulfate', 'Magnesium oxide', 'Citric acid'],
    drugClass: 'Contact stimulant laxative and osmotic laxative bowel cleansing combination',
    strength: '10 mg / 3.5 g / 12 g per sachet',
    dosageForm: 'Powder for oral solution in sachet',
    route: 'Oral',
    packSize: 'Pack of 2 sachets of white powder for oral solution',
    indications:
      'To cleanse the bowel prior to X-ray examination, endoscopy (colonoscopy), or when judged clinically necessary prior to surgery in adults, adolescents, and children from 1 year of age.',
    dose:
      'Adults (including elderly) and children aged 9 years and older: Two 1-sachet doses reconstituted in ~150 mL cold water (stirred for 2–3 minutes and cooled if warm). Split-dose regimen: first sachet in the evening before the procedure (10–18 hours prior) followed by at least 5 x 250 mL drinks of clear liquids, and second sachet in the morning (5–9 hours prior to the procedure) followed by at least 3 x 250 mL drinks of clear liquids (stop liquids 2 hours prior to anaesthesia/procedure).',
    contraindications:
      'Hypersensitivity to any of the active substances or excipients; congestive cardiac failure; gastric retention; gastrointestinal ulceration; toxic colitis; toxic megacolon; ileus; nausea and vomiting; acute abdominal surgical conditions such as acute appendicitis; known or suspected gastrointestinal obstruction or perforation; severe dehydration; rhabdomyolysis; hypermagnesaemia; active inflammatory bowel disease; severely reduced renal function.',
    adverseEffects:
      'Headache, nausea, proctalgia, vomiting, abdominal pain, hyponatraemia, hypokalaemia, dizziness, dehydration, syncope, orthostatic hypotension, diarrhoea, faecal incontinence, rash.',
    storage: 'Store in the original package in order to protect from moisture. Do not store above 25°C.',
    specialties: ['Gastroenterology', 'Surgery', 'Radiology'],
    sources: [
      {
        title: 'UK EMC — Picolax / Picoprep Powder for Oral Solution SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/923/smpc',
      },
    ],
    notes:
      'Official Ferring Pharmaceuticals SmPC data (marketed as Picoprep in the Middle East and internationally). Each sachet contains sodium picosulfate 10.0 mg, magnesium oxide light 3.5 g, and citric acid anhydrous 12.0 g (forming magnesium citrate in solution).',
  },

  // 10. Tractocile (Atosiban)
  {
    brandName: 'Tractocile 37.5 mg/5 mL',
    genericName: 'Atosiban',
    activeIngredients: ['Atosiban'],
    drugClass: 'Selective oxytocin and vasopressin V1a receptor antagonist (tocolytic)',
    strength: '37.5 mg/5 mL (7.5 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous',
    packSize: '1 vial of 5 mL concentrate for solution for infusion',
    indications:
      'Delay of imminent pre-term birth in pregnant adult women with regular uterine contractions of at least 30 seconds duration at a rate of >=4 per 30 minutes, cervical dilation of 1 to 3 cm (0–3 cm for nulliparas) and effacement of >=50%, gestational age from 24 until 33 completed weeks, and a normal fetal heart rate.',
    dose:
      'Administered intravenously in three successive stages: (1) initial bolus of 6.75 mg (0.9 mL of 7.5 mg/mL solution for injection) over 1 minute; (2) immediately followed by a continuous high-dose loading infusion of 300 mcg/min (18 mg/hour) for 3 hours; (3) followed by a lower infusion of 100 mcg/min (6 mg/hour) for up to 45 hours. Total duration of treatment should not exceed 48 hours and total dose should preferably not exceed 330.75 mg.',
    contraindications:
      'Gestational age below 24 or over 33 completed weeks; premature rupture of the membranes >30 weeks of gestation; abnormal fetal heart rate; antepartum uterine haemorrhage requiring immediate delivery; eclampsia and severe pre-eclampsia requiring delivery; intrauterine fetal death; suspected intrauterine infection; placenta praevia; abruptio placentae; any other conditions of the mother or fetus in which continuation of pregnancy is hazardous; hypersensitivity to atosiban or any excipient.',
    adverseEffects:
      'Nausea, hyperglycaemia, headache, dizziness, tachycardia, hypotension, hot flush, vomiting, injection site reaction, insomnia, pruritus, rash, pulmonary oedema (especially when co-administered with beta-mimetics or fluid overload).',
    storage: 'Store in a refrigerator (2°C–8°C). Store in the original package in order to protect from light.',
    specialties: ['Obstetrics & Gynecology'],
    sources: [
      {
        title: 'EMA EPAR — Tractocile (atosiban) Product Information (Ferring Pharmaceuticals A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tractocile',
      },
    ],
    notes:
      'Official EMA EPAR product information (Ferring Pharmaceuticals A/S). Each 5 mL vial contains 37.5 mg atosiban (as atosiban acetate). Generic name normalized to INN base (Atosiban).',
  },

  // 11. Pabal (Carbetocin)
  {
    brandName: 'Pabal 100 mcg/mL',
    genericName: 'Carbetocin',
    activeIngredients: ['Carbetocin'],
    drugClass: 'Long-acting synthetic oxytocin agonist (uterotonic)',
    strength: '100 mcg/1 mL',
    dosageForm: 'Solution for injection',
    route: 'Intravenous or intramuscular',
    packSize: 'Pack of 5 vials of 1 mL solution for injection',
    indications:
      'Prevention of postpartum haemorrhage due to uterine atony.',
    dose:
      'Caesarean section under epidural or spinal anaesthesia: a single dose of 100 mcg (1 mL) administered slowly by intravenous injection over 1 minute, only after delivery of the infant. Vaginal delivery: a single dose of 100 mcg (1 mL) administered by intravenous injection (slowly over 1 minute) or intramuscular injection, after delivery of the infant.',
    contraindications:
      'Hypersensitivity to carbetocin, oxytocin, or any excipient; during pregnancy and labour before delivery of the infant; induction of labour; hepatic or renal disease; serious cardiovascular disorders; epilepsy.',
    adverseEffects:
      'Nausea, abdominal pain, pruritus, flushing, feeling of warmth, hypotension, headache, tremor, back pain, dizziness, metallic taste, anaemia, sweating, chest pain, dyspnoea, chills, tachycardia, vomiting.',
    storage: 'Keep vials in the outer carton in order to protect from light. Store below 30°C. Do not freeze.',
    specialties: ['Obstetrics & Gynecology', 'Anesthesiology'],
    sources: [
      {
        title: 'UK EMC — Pabal 100 micrograms/ml Solution for Injection SmPC (Ferring Pharmaceuticals Ltd)',
        url: 'https://www.medicines.org.uk/emc/product/219/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (Ferring Pharmaceuticals). Room-temperature stable formulation containing 100 micrograms carbetocin per 1 mL vial.',
  },
];

export const FERRING_PRODUCTS: AiProductDraft[] = RAW_FERRING.map((d) => ({
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

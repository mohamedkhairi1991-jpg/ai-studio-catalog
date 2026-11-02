import type { AiDraftSource, AiProductDraft } from './catalog';

interface CompactDrug {
  brandName: string;
  brandNameAr: string;
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

const RAW_JAMJOOM: CompactDrug[] = [
  // 1. Acretin (Tretinoin — Jamjoom Pharma)
  {
    brandName: 'Acretin 0.025%',
    brandNameAr: 'أكريتين 0.025%',
    genericName: 'Tretinoin',
    activeIngredients: ['Tretinoin'],
    drugClass: 'Topical retinoid (keratolytic and comedolytic acne vulgaris therapy)',
    strength: '0.025% w/w',
    dosageForm: 'Cream',
    route: 'Topical',
    packSize: 'Tube of 30 g cream',
    indications:
      'Topical treatment of acne vulgaris, particularly grades I–III in which comedones, papules, and pustules predominate.',
    dose:
      'Apply a thin layer lightly to the affected skin areas once daily before bedtime, 20 to 30 minutes after washing the face gently with a mild cleanser and patting completely dry. Avoid contact with eyes, eyelids, angles of the nose, mouth, and mucous membranes. Use sunscreen and protective clothing during daytime.',
    contraindications:
      'Hypersensitivity to tretinoin or to any of the excipients; pregnancy and women planning a pregnancy; personal or familial history of cutaneous epithelioma; acute eczematous, sunburned, or abraded skin; rosacea and perioral dermatitis.',
    adverseEffects:
      'Common: transient local skin irritation, erythema, peeling/desquamation, dryness, burning or stinging sensation, pruritus, heightened photosensitivity to sunlight/UV radiation, temporary hypo- or hyperpigmentation.',
    storage:
      'Store below 30°C. Do not freeze. Keep tube tightly closed.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Dermatology Portfolio (Acretin / Tretinoin)',
        url: 'https://www.jamjoompharma.com/dermatology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. (Jeddah, Saudi Arabia) SmPC data. Contains 0.025% w/w (0.25 mg/g) tretinoin.',
  },
  {
    brandName: 'Acretin 0.05%',
    brandNameAr: 'أكريتين 0.05%',
    genericName: 'Tretinoin',
    activeIngredients: ['Tretinoin'],
    drugClass: 'Topical retinoid (keratolytic and comedolytic acne vulgaris therapy)',
    strength: '0.05% w/w',
    dosageForm: 'Cream',
    route: 'Topical',
    packSize: 'Tube of 30 g cream',
    indications:
      'Topical treatment of acne vulgaris in patients with comedonal and papulopustular lesions.',
    dose:
      'Apply a pea-sized amount as a thin film to affected areas once daily in the evening after gentle cleansing and drying of the skin. Frequency may be reduced to every other night in patients with sensitive skin.',
    contraindications:
      'Hypersensitivity to tretinoin or excipients; pregnancy and women planning pregnancy; acute eczema, rosacea, perioral dermatitis, sunburn, or open skin wounds.',
    adverseEffects:
      'Common: local skin erythema, dryness, peeling, warmth or stinging sensation, pruritus, increased UV photosensitivity.',
    storage:
      'Store below 30°C. Do not freeze.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Dermatology Portfolio (Acretin 0.05% Cream)',
        url: 'https://www.jamjoompharma.com/dermatology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Contains 0.05% w/w (0.5 mg/g) tretinoin.',
  },

  // 2. Hyfresh (Sodium hyaluronate — Jamjoom Pharma)
  {
    brandName: 'Hyfresh 0.2%',
    brandNameAr: 'هايفريش 0.2%',
    genericName: 'Sodium hyaluronate',
    activeIngredients: ['Sodium hyaluronate'],
    drugClass: 'Viscoelastic ophthalmic lubricant (artificial tears)',
    strength: '0.2% (2 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 10 mL sterile ophthalmic solution (or pack of 20 single-dose unit vials of 0.4 mL)',
    indications:
      'Symptomatic relief of dry eye syndrome (keratoconjunctivitis sicca) and ocular surface irritation, burning, or foreign body sensation caused by tear film deficiency, environmental factors, prolonged screen use, contact lens wear, or ophthalmic surgical procedures.',
    dose:
      'Instil 1 drop into the conjunctival sac of the affected eye(s) 3 to 4 times daily, or as needed depending on symptom severity.',
    contraindications:
      'Hypersensitivity to sodium hyaluronate or to any of the excipients.',
    adverseEffects:
      'Uncommon/Rare: transient blurred vision immediately after instillation, mild transient ocular stinging or irritation.',
    storage:
      'Store below 30°C. Discard multi-dose bottle 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Hyfresh Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains 2 mg sodium hyaluronate (0.2%).',
  },

  // 3. Optiflox (Ofloxacin — Jamjoom Pharma)
  {
    brandName: 'Optiflox 0.3%',
    brandNameAr: 'أوبتيفلوكس 0.3%',
    genericName: 'Ofloxacin',
    activeIngredients: ['Ofloxacin'],
    drugClass: 'Fluoroquinolone ophthalmic antibacterial',
    strength: '0.3% (3 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Topical treatment of external ocular infections (such as bacterial conjunctivitis, keratitis, corneal ulcers, blepharitis, blepharoconjunctivitis, and dacryocystitis) caused by ofloxacin-susceptible microorganisms in adults and children.',
    dose:
      'Bacterial conjunctivitis and external eye infections: 1 to 2 drops instilled into the affected eye(s) every 2 to 4 hours for the first 2 days, then 4 times daily for up to 7–10 days. Corneal ulcer: 1 to 2 drops every 30 minutes while awake and at 4 and 6 hours after retiring on Days 1–2, then 1 to 2 drops hourly while awake on Days 3–7, then 4 times daily.',
    contraindications:
      'Hypersensitivity to ofloxacin, other quinolones, or to any of the excipients.',
    adverseEffects:
      'Common: eye irritation, ocular discomfort, burning or stinging. Uncommon: keratitis, conjunctivitis, blurred vision, photophobia, eye oedema, foreign body sensation, dry eye, tearing, dizziness, nausea.',
    storage:
      'Store below 30°C, protected from light. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Optiflox 0.3% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL of sterile ophthalmic solution contains 3 mg ofloxacin (0.3% w/v).',
  },

  // 4. Optidex-T (Tobramycin + Dexamethasone — Jamjoom Pharma)
  {
    brandName: 'Optidex-T 0.3%/0.1%',
    brandNameAr: 'أوبتيديكس-تي 0.3%/0.1%',
    genericName: 'Tobramycin + Dexamethasone',
    activeIngredients: ['Tobramycin', 'Dexamethasone'],
    drugClass: 'Ophthalmic aminoglycoside antibacterial and corticosteroid combination',
    strength: '3 mg/mL + 1 mg/mL',
    dosageForm: 'Eye drops, suspension',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic suspension',
    indications:
      'Prevention and treatment of inflammation and prophylaxis of infection associated with cataract surgery in adults and children aged 2 years and older; steroid-responsive inflammatory ocular conditions for which a corticosteroid is indicated and where superficial bacterial ocular infection or a risk of bacterial ocular infection exists.',
    dose:
      'Instil 1 to 2 drops into the conjunctival sac of the affected eye(s) every 4 to 6 hours. During the initial 24 to 48 hours, the dose may be increased to 1 or 2 drops every 2 hours, then gradually tapered as clinical signs improve. Shake bottle well before use.',
    contraindications:
      'Hypersensitivity to tobramycin, dexamethasone, aminoglycosides, or excipients; herpes simplex keratitis; vaccinia, varicella, and other viral diseases of the cornea and conjunctiva; mycobacterial infections of the eye; fungal diseases of ocular structures; untreated purulent infection of the eye.',
    adverseEffects:
      'Uncommon: increased intraocular pressure, eye pain, eye pruritus, ocular discomfort, eye irritation. Prolonged use may result in ocular hypertension/glaucoma, optic nerve damage, posterior subcapsular cataract formation, delayed wound healing, and secondary fungal or viral ocular infections.',
    storage:
      'Store below 25°C. Do not freeze. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Optidex-T Eye Drops Suspension)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL of sterile ophthalmic suspension contains 3 mg tobramycin (0.3%) and 1 mg dexamethasone (0.1%).',
  },

  // 5. Xolamol (Dorzolamide + Timolol — Jamjoom Pharma)
  {
    brandName: 'Xolamol 20 mg/5 mg per mL',
    brandNameAr: 'زولامول 20 ملغ/5 ملغ لكل مل',
    genericName: 'Dorzolamide + Timolol',
    activeIngredients: ['Dorzolamide', 'Timolol'],
    drugClass: 'Ophthalmic carbonic anhydrase inhibitor and beta-adrenergic receptor blocker combination',
    strength: '20 mg/mL + 5 mg/mL',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Treatment of elevated intraocular pressure (IOP) in patients with open-angle glaucoma or pseudoexfoliative glaucoma when topical beta-blocker monotherapy is not sufficient.',
    dose:
      'One drop in the conjunctival sac of the affected eye(s) twice daily. If another topical ophthalmic agent is being used, Xolamol and the other agent should be administered at least 10 minutes apart.',
    contraindications:
      'Hypersensitivity to dorzolamide, timolol, sulfonamides, or excipients; reactive airway disease including bronchial asthma or a history of bronchial asthma, or severe chronic obstructive pulmonary disease; sinus bradycardia, sick sinus syndrome, sino-atrial block, second or third degree atrioventricular block not controlled with pacemaker, overt cardiac failure, cardiogenic shock; severe renal impairment (CrCl < 30 mL/min) or hyperchloraemic acidosis.',
    adverseEffects:
      'Very common: ocular burning and stinging, dysgeusia (bitter taste). Common: conjunctival injection, blurred vision, corneal erosion, ocular itching, tearing, sinusitis, headache.',
    storage:
      'Store below 30°C, protected from light. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Xolamol Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains dorzolamide hydrochloride equivalent to 20 mg dorzolamide and timolol maleate equivalent to 5 mg timolol (INN bases: Dorzolamide + Timolol).',
  },

  // 6. Dompy (Domperidone — Jamjoom Pharma)
  {
    brandName: 'Dompy 10 mg',
    brandNameAr: 'دومبي 10 ملغ',
    genericName: 'Domperidone',
    activeIngredients: ['Domperidone'],
    drugClass: 'Peripheral dopamine D2-receptor antagonist (antiemetic and gastroprokinetic)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Pack of 30 film-coated tablets in blisters',
    indications:
      'Relief of the symptoms of nausea and vomiting in adults and adolescents aged 12 years and older weighing >= 35 kg.',
    dose:
      'Adults and adolescents (>= 12 years and >= 35 kg): One 10 mg tablet up to 3 times per day, with a maximum dose of 30 mg per day. Recommended to take before meals. Should be used at the lowest effective dose for the shortest duration necessary (usually not exceeding 1 week).',
    contraindications:
      'Hypersensitivity to domperidone or excipients; prolactin-releasing pituitary tumour (prolactinoma); conditions where stimulation of gastric motility could be harmful (gastrointestinal haemorrhage, mechanical obstruction, or perforation); moderate or severe hepatic impairment; known existing prolongation of cardiac conduction intervals (particularly QTc), significant electrolyte disturbances, or underlying cardiac diseases such as congestive heart failure; co-administration with QT-prolonging drugs or potent CYP3A4 inhibitors.',
    adverseEffects:
      'Common: dry mouth. Uncommon: anxiety, agitation, nervousness, loss of libido, somnolence, headache, dizziness, diarrhoea, rash, pruritus, urticaria, galactorrhoea, breast pain and tenderness, asthenia. Not known: ventricular arrhythmias, QTc prolongation, Torsade de Pointes, extrapyramidal disorder, gynaecomastia, amenorrhoea.',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Gastrointestinal & General Medicine Portfolio (Dompy / Domperidone)',
        url: 'https://www.jamjoompharma.com/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each film-coated tablet contains 10 mg domperidone. Also available as Dompy 1 mg/mL oral suspension.',
  },
];

export const JAMJOOM_PRODUCTS: AiProductDraft[] = RAW_JAMJOOM.map((d) => ({
  found: true,
  brandName: d.brandName,
  brandNameAr: d.brandNameAr,
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

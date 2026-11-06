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

const RAW_JAMJOOM: CompactDrug[] = [
  // 1. Acretin (Tretinoin — Jamjoom Pharma)
  {
    brandName: 'Acretin 0.025%',
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
  {
    brandName: 'Dompy 1 mg/mL',
    genericName: 'Domperidone',
    activeIngredients: ['Domperidone'],
    drugClass: 'Peripheral dopamine D2-receptor antagonist (antiemetic and gastroprokinetic)',
    strength: '1 mg/mL (5 mg/5 mL)',
    dosageForm: 'Oral suspension',
    route: 'Oral',
    packSize: 'Bottle of 200 mL oral suspension',
    indications:
      'Relief of the symptoms of nausea and vomiting in adults and adolescents aged 12 years and older weighing >= 35 kg.',
    dose:
      'Adults and adolescents (>= 12 years and >= 35 kg): 10 mL (10 mg) up to 3 times daily before meals; maximum daily dose is 30 mL (30 mg). Shake well before use and use for the shortest duration necessary (up to 7 days).',
    contraindications:
      'Hypersensitivity to domperidone or excipients; prolactinoma; GI haemorrhage, mechanical obstruction, or perforation; moderate or severe hepatic impairment; known QTc prolongation, significant electrolyte disturbances, or congestive heart failure; co-administration with QT-prolonging drugs or potent CYP3A4 inhibitors.',
    adverseEffects:
      'Common: dry mouth. Uncommon: somnolence, headache, dizziness, diarrhoea, rash, pruritus, galactorrhoea, breast tenderness. Rare/Not known: QTc prolongation, ventricular arrhythmias, extrapyramidal symptoms.',
    storage:
      'Store below 30°C, protected from light.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Gastrointestinal Portfolio (Dompy Suspension)',
        url: 'https://www.jamjoompharma.com/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each 1 mL of oral suspension contains 1 mg domperidone.',
  },
  {
    brandName: 'Optipred 1%',
    genericName: 'Prednisolone',
    activeIngredients: ['Prednisolone'],
    drugClass: 'Ophthalmic corticosteroid anti-inflammatory agent',
    strength: '1% (10 mg/mL)',
    dosageForm: 'Eye drops, suspension',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic suspension',
    indications:
      'Treatment of steroid-responsive inflammation of the palpebral and bulbar conjunctiva, cornea, and anterior segment of the globe, and control of post-operative ocular inflammation.',
    dose:
      'Instil 1 to 2 drops into the conjunctival sac 2 to 4 times daily. During the initial 24 to 48 hours, dosing frequency may be increased if necessary. Shake well before use. Taper gradually when discontinuing.',
    contraindications:
      'Hypersensitivity to prednisolone or excipients; acute untreated purulent ocular infections; herpes simplex keratitis; vaccinia, varicella, and other viral diseases of the cornea and conjunctiva; fungal or mycobacterial ocular infections.',
    adverseEffects:
      'Common/Uncommon: elevated intraocular pressure (glaucoma), posterior subcapsular cataract formation with prolonged use, delayed corneal wound healing, secondary ocular infection, transient stinging or blurred vision.',
    storage:
      'Store below 25°C. Do not freeze. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Optipred 1% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains 10 mg prednisolone acetate (1% w/v; INN base: Prednisolone).',
  },
  {
    brandName: 'Olopat 0.1%',
    genericName: 'Olopatadine',
    activeIngredients: ['Olopatadine'],
    drugClass: 'Ophthalmic selective histamine H1-receptor antagonist and mast-cell stabiliser',
    strength: '0.1% (1 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Treatment of ocular signs and symptoms of seasonal allergic conjunctivitis in adults and children aged 3 years and older.',
    dose:
      'One drop in the conjunctival sac of the affected eye(s) twice daily (at an interval of 8 hours). Treatment may be maintained for up to 4 months if considered necessary.',
    contraindications:
      'Hypersensitivity to olopatadine or to any of the excipients.',
    adverseEffects:
      'Common: eye pain, eye irritation, dry eye, abnormal sensation in eyes, headache, dysgeusia, nasal dryness, fatigue.',
    storage:
      'Store below 30°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology', 'Allergy and Immunology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Olopat 0.1% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains olopatadine hydrochloride equivalent to 1 mg olopatadine (0.1%; INN base: Olopatadine).',
  },
  {
    brandName: 'Olopat Forte 0.2%',
    genericName: 'Olopatadine',
    activeIngredients: ['Olopatadine'],
    drugClass: 'Ophthalmic selective histamine H1-receptor antagonist and mast-cell stabiliser',
    strength: '0.2% (2 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Once-daily treatment of ocular itching associated with allergic conjunctivitis.',
    dose:
      'One drop in each affected eye once daily.',
    contraindications:
      'Hypersensitivity to olopatadine or excipients.',
    adverseEffects:
      'Uncommon: blurred vision, dry eye, foreign body sensation, ocular hyperaemia, eyelid margin crusting, headache, dysgeusia.',
    storage:
      'Store below 30°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology', 'Allergy and Immunology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Olopat Forte 0.2% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains olopatadine hydrochloride equivalent to 2 mg olopatadine (0.2%; INN base: Olopatadine).',
  },
  {
    brandName: 'Tymer 0.3%',
    genericName: 'Gatifloxacin',
    activeIngredients: ['Gatifloxacin'],
    drugClass: 'Fourth-generation fluoroquinolone ophthalmic antibacterial',
    strength: '0.3% (3 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Treatment of bacterial conjunctivitis and external ocular infections caused by susceptible Gram-positive and Gram-negative strains in patients aged 1 year and older.',
    dose:
      'Days 1 and 2: Instil 1 drop every 2 hours in the affected eye(s) while awake, up to 8 times daily. Days 3 through 7: Instil 1 drop up to 4 times daily while awake.',
    contraindications:
      'Hypersensitivity to gatifloxacin, other quinolones, or excipients.',
    adverseEffects:
      'Common: conjunctival irritation, increased lacrimation, keratitis, papillary conjunctivitis, chemosis, eye pain, dysgeusia, headache.',
    storage:
      'Store below 25°C. Protect from freezing. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Tymer 0.3% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains gatifloxacin sesquihydrate equivalent to 3 mg gatifloxacin (0.3%; INN base: Gatifloxacin).',
  },
  {
    brandName: 'Moxicip 0.5%',
    genericName: 'Moxifloxacin',
    activeIngredients: ['Moxifloxacin'],
    drugClass: 'Fourth-generation fluoroquinolone ophthalmic antibacterial',
    strength: '0.5% (5 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Topical treatment of purulent bacterial conjunctivitis caused by moxifloxacin-susceptible strains in adults, children, and neonates.',
    dose:
      'Adults and paediatric patients: Instil 1 drop into the affected eye(s) 3 times daily for 4 to 7 days.',
    contraindications:
      'Hypersensitivity to moxifloxacin, other quinolones, or excipients.',
    adverseEffects:
      'Common: eye pain, eye irritation. Uncommon: dry eye, pruritus of eye, conjunctival hyperaemia, ocular hyperaemia, headache, dysgeusia.',
    storage:
      'Store below 30°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology', 'Pediatrics'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Moxicip 0.5% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains moxifloxacin hydrochloride equivalent to 5 mg moxifloxacin (0.5%; INN base: Moxifloxacin).',
  },
  {
    brandName: 'Brimo 0.2%',
    genericName: 'Brimonidine',
    activeIngredients: ['Brimonidine'],
    drugClass: 'Selective alpha-2 adrenergic receptor agonist (antiglaucoma ophthalmic agent)',
    strength: '0.2% (2 mg/mL)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 5 mL sterile ophthalmic solution',
    indications:
      'Reduction of elevated intraocular pressure (IOP) in patients with open-angle glaucoma or ocular hypertension, either as monotherapy when topical beta-blocker therapy is contraindicated or as adjunctive therapy with other IOP-lowering medications.',
    dose:
      'Instil 1 drop in the affected eye(s) twice daily, approximately 12 hours apart.',
    contraindications:
      'Hypersensitivity to brimonidine or excipients; neonates and infants under 2 years of age; patients receiving monoamine oxidase inhibitor (MAOI) therapy or antidepressants affecting noradrenergic transmission (e.g. tricyclic antidepressants and mianserin).',
    adverseEffects:
      'Very common: ocular hyperaemia, ocular burning/stinging, allergic blepharoconjunctivitis, blurred vision, dry mouth, headache, drowsiness/fatigue.',
    storage:
      'Store below 25°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Brimo 0.2% Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains 2 mg brimonidine tartrate (0.2%; INN base: Brimonidine).',
  },
  {
    brandName: 'Travost 0.004%',
    genericName: 'Travoprost',
    activeIngredients: ['Travoprost'],
    drugClass: 'Prostaglandin F2-alpha analogue (antiglaucoma ophthalmic agent)',
    strength: '40 micrograms/mL (0.004%)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic',
    packSize: 'Dropper bottle of 2.5 mL sterile ophthalmic solution',
    indications:
      'Decrease of elevated intraocular pressure in adult and paediatric patients with ocular hypertension or open-angle glaucoma.',
    dose:
      'One drop in the conjunctival sac of the affected eye(s) once daily, optimally in the evening. Do not exceed once-daily administration.',
    contraindications:
      'Hypersensitivity to travoprost or to any of the excipients.',
    adverseEffects:
      'Very common: ocular hyperaemia. Common: iris hyperpigmentation, eye pain, ocular discomfort, dry eye, eye pruritus, eyelash growth and thickening, periorbital skin hyperpigmentation.',
    storage:
      'Store below 30°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Ophthalmology Portfolio (Travost Eye Drops)',
        url: 'https://www.jamjoompharma.com/ophthalmology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each mL contains 40 micrograms travoprost (0.004%).',
  },
  {
    brandName: 'Jamprazole 20 mg',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '20 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Treatment and relapse prophylaxis of duodenal and benign gastric ulcers; Helicobacter pylori eradication in peptic ulcer disease with antibiotics; NSAID-associated gastroduodenal ulcers; reflux oesophagitis and symptomatic GORD; and Zollinger-Ellison syndrome.',
    dose:
      '20 mg once daily in the morning before food for 2–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with combination antibiotics.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant administration with nelfinavir.',
    adverseEffects:
      'Common: headache, abdominal pain, constipation, diarrhoea, flatulence, nausea, vomiting, benign fundic gland polyps.',
    storage:
      'Store below 25°C in a dry place, protected from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Gastrointestinal Portfolio (Jamprazole 20 mg)',
        url: 'https://www.jamjoompharma.com/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each gastro-resistant capsule contains 20 mg omeprazole.',
  },
  {
    brandName: 'Jamprazole 40 mg',
    genericName: 'Omeprazole',
    activeIngredients: ['Omeprazole'],
    drugClass: 'Proton pump inhibitor (H+/K+-ATPase inhibitor)',
    strength: '40 mg',
    dosageForm: 'Gastro-resistant hard capsule',
    route: 'Oral',
    packSize: 'Pack of 14 or 28 gastro-resistant hard capsules',
    indications:
      'Severe reflux oesophagitis, refractory peptic ulcer disease, Helicobacter pylori eradication regimens, and Zollinger-Ellison syndrome.',
    dose:
      '40 mg once daily in the morning before food for 4–8 weeks.',
    contraindications:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or excipients; concomitant nelfinavir.',
    adverseEffects:
      'Common: headache, diarrhoea, abdominal pain, constipation, flatulence, nausea, vomiting, benign fundic gland polyps.',
    storage:
      'Store below 25°C in a dry place, protected from moisture.',
    specialties: ['Gastroenterology', 'Internal Medicine'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Gastrointestinal Portfolio (Jamprazole 40 mg)',
        url: 'https://www.jamjoompharma.com/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each gastro-resistant capsule contains 40 mg omeprazole.',
  },
  {
    brandName: 'Relaxon 250 mg/300 mg',
    genericName: 'Chlorzoxazone + Paracetamol',
    activeIngredients: ['Chlorzoxazone', 'Paracetamol'],
    drugClass: 'Centrally acting skeletal muscle relaxant and analgesic combination',
    strength: '250 mg/300 mg',
    dosageForm: 'Hard capsule',
    route: 'Oral',
    packSize: 'Pack of 30 hard capsules in blisters',
    indications:
      'Adjunctive relief of discomfort and pain associated with acute, painful musculoskeletal conditions (such as acute low back spasm, cervical torticollis, muscle sprains, strains, and fibrositis).',
    dose:
      'Adults: Two capsules 3 to 4 times daily according to symptom severity; may be reduced to one capsule 3 to 4 times daily as improvement occurs.',
    contraindications:
      'Hypersensitivity to chlorzoxazone, paracetamol, or excipients; impaired hepatic function or active liver disease.',
    adverseEffects:
      'Common: drowsiness, dizziness, lightheadedness, malaise, gastrointestinal distress. Rare: hepatotoxicity (discontinue immediately if signs of hepatic dysfunction or jaundice develop), allergic skin rash, orange or reddish-purple discoloration of urine (benign metabolite of chlorzoxazone).',
    storage:
      'Store below 30°C in a dry place.',
    specialties: ['Orthopedics', 'Rheumatology', 'Physical Medicine and Rehabilitation', 'Internal Medicine'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — General Medicine Portfolio (Relaxon Capsules)',
        url: 'https://www.jamjoompharma.com/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Each hard capsule contains 250 mg chlorzoxazone and 300 mg paracetamol.',
  },
  {
    brandName: 'Elica 0.1% Cream',
    genericName: 'Mometasone',
    activeIngredients: ['Mometasone'],
    drugClass: 'Potent topical corticosteroid (Group III)',
    strength: '0.1% w/w (1 mg/g)',
    dosageForm: 'Cream',
    route: 'Topical',
    packSize: 'Tube of 30 g cream',
    indications:
      'Relief of inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses, such as psoriasis (excluding widespread plaque psoriasis) and atopic or contact dermatitis.',
    dose:
      'Apply a thin film to the affected skin areas once daily. Do not use under occlusive dressings or on the face for prolonged periods unless directed by a physician.',
    contraindications:
      'Hypersensitivity to mometasone furoate, other corticosteroids, or excipients; facial rosacea, acne vulgaris, skin atrophy, perioral dermatitis, perianal and genital pruritus, napkin eruptions, bacterial (e.g. impetigo), viral (e.g. herpes simplex, herpes zoster, varicella), or fungal skin infections.',
    adverseEffects:
      'Uncommon/Rare: local burning, stinging, pruritus, folliculitis, skin atrophy, striae, telangiectasia, hypertrichosis, hypopigmentation with prolonged use.',
    storage:
      'Store below 30°C. Do not freeze.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Dermatology Portfolio (Elica 0.1% Cream)',
        url: 'https://www.jamjoompharma.com/dermatology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Contains 0.1% w/w mometasone furoate (INN base: Mometasone).',
  },
  {
    brandName: 'Elica-M 0.1%/2% Cream',
    genericName: 'Mometasone + Miconazole',
    activeIngredients: ['Mometasone', 'Miconazole'],
    drugClass: 'Topical potent corticosteroid and imidazole antifungal combination',
    strength: '0.1% / 2% w/w',
    dosageForm: 'Cream',
    route: 'Topical',
    packSize: 'Tube of 30 g cream',
    indications:
      'Initial topical treatment of inflammatory superficial fungal skin infections (such as tinea pedis, tinea cruris, tinea corporis, and cutaneous candidiasis) accompanied by marked eczematous inflammation and pruritus.',
    dose:
      'Apply a thin layer to the affected skin area once or twice daily for up to 1–2 weeks; once acute inflammation subsides, switch to an antifungal monotherapy if needed.',
    contraindications:
      'Hypersensitivity to mometasone, miconazole, other imidazoles, or excipients; viral skin infections (herpes simplex, varicella, vaccinia), skin tuberculosis, rosacea, acne vulgaris, or perioral dermatitis.',
    adverseEffects:
      'Uncommon: local burning, pruritus, erythema, skin dryness, skin atrophy or striae with prolonged or occlusive use.',
    storage:
      'Store below 30°C. Do not freeze.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'Jamjoom Pharmaceuticals Factory Co. — Dermatology Portfolio (Elica-M Cream)',
        url: 'https://www.jamjoompharma.com/dermatology/',
      },
    ],
    notes:
      'Official Jamjoom Pharmaceuticals Factory Co. SmPC data. Contains 0.1% w/w mometasone furoate and 2% w/w miconazole nitrate (INN bases: Mometasone + Miconazole).',
  },
];

export const JAMJOOM_PRODUCTS: AiProductDraft[] = RAW_JAMJOOM.map((d) => ({
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

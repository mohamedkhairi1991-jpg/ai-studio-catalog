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

const RAW_CHIESI: CompactDrug[] = [
  // 1. Foster (Beclometasone + Formoterol — Chiesi Farmaceutici S.p.A.)
  {
    brandName: 'Foster 100/6 micrograms',
    brandNameAr: 'فوستر 100/6 ميكروغرام',
    genericName: 'Beclometasone + Formoterol',
    activeIngredients: ['Beclometasone', 'Formoterol'],
    drugClass: 'Extrafine inhaled corticosteroid (ICS) and long-acting beta2-agonist (LABA) fixed-dose combination',
    strength: '100 micrograms/6 micrograms',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 120 actuations',
    indications:
      'Regular treatment of asthma in adults where use of a combination product (inhaled corticosteroid and long-acting beta2-agonist) is appropriate (either as maintenance therapy with a separate rapid-acting bronchodilator, or as both maintenance and reliever therapy — MART); and symptomatic treatment of patients with severe COPD (FEV1 < 50% predicted normal) and a history of repeated exacerbations.',
    dose:
      'Asthma maintenance therapy: 1 or 2 inhalations twice daily (maximum daily dose 4 inhalations). Asthma maintenance and reliever therapy (MART): 1 inhalation twice daily (morning and evening) plus 1 additional inhalation as needed in response to symptoms (maximum daily dose 8 inhalations). COPD: 2 inhalations twice daily.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate, formoterol fumarate dihydrate, or to any of the excipients.',
    adverseEffects:
      'Common: pharyngitis, oral candidiasis, pneumonia (in COPD patients), headache, tremor, dysphonia (hoarseness). Uncommon: influenza, oral fungal infection, oropharyngeal and oesophageal candidiasis, sinusitis, rhinitis, restlessness, dizziness, palpitations, tachycardia, ECG QT prolongation, flushing, cough, productive cough, throat irritation, asthmatic crisis, diarrhoea, dry mouth, dyspepsia, muscle spasms, myalgia.',
    storage:
      'Prior to dispensing: store in a refrigerator (2°C to 8°C) for a maximum of 18 months. After dispensing to the patient: do not store above 25°C for a maximum of 3 months.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Fostair / Foster 100/6 micrograms Pressurised Inhalation Solution SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/6318/smpc',
      },
    ],
    notes:
      'Official Chiesi Farmaceutici S.p.A. SmPC data (marketed in the Middle East and continental Europe as Foster; UK name Fostair). Each metered dose contains 100 micrograms beclometasone dipropionate and 6 micrograms formoterol fumarate dihydrate (INN bases: Beclometasone + Formoterol).',
  },
  {
    brandName: 'Foster 200/6 micrograms',
    brandNameAr: 'فوستر 200/6 ميكروغرام',
    genericName: 'Beclometasone + Formoterol',
    activeIngredients: ['Beclometasone', 'Formoterol'],
    drugClass: 'Extrafine inhaled corticosteroid (ICS) and long-acting beta2-agonist (LABA) fixed-dose combination',
    strength: '200 micrograms/6 micrograms',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 120 actuations',
    indications:
      'Regular maintenance treatment of asthma in adults where use of a high-dose inhaled corticosteroid and long-acting beta2-agonist combination is appropriate.',
    dose:
      'Adults (18 years and older): 2 inhalations twice daily. Maximum daily dose is 4 inhalations. Foster 200/6 should be used as maintenance therapy only (a separate rapid-acting bronchodilator should be available for rescue).',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate, formoterol fumarate dihydrate, or excipients.',
    adverseEffects:
      'Common: pharyngitis, oral candidiasis, headache, tremor, dysphonia. Uncommon: palpitations, tachycardia, throat irritation, cough, muscle spasms, hyperglycaemia, hypokalaemia.',
    storage:
      'Prior to dispensing: store in a refrigerator (2°C to 8°C). After dispensing: store below 25°C for up to 3 months.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Fostair / Foster 200/6 micrograms Pressurised Inhalation Solution SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/3900/smpc',
      },
    ],
    notes:
      'Official Chiesi Farmaceutici S.p.A. SmPC data. High-strength extrafine pMDI containing 200 micrograms beclometasone dipropionate and 6 micrograms formoterol fumarate dihydrate per actuation (INN bases: Beclometasone + Formoterol).',
  },
  {
    brandName: 'Foster NEXThaler 100/6 micrograms',
    brandNameAr: 'فوستر نيكسثيلر 100/6 ميكروغرام',
    genericName: 'Beclometasone + Formoterol',
    activeIngredients: ['Beclometasone', 'Formoterol'],
    drugClass: 'Extrafine inhaled corticosteroid (ICS) and long-acting beta2-agonist (LABA) dry powder inhaler',
    strength: '100 micrograms/6 micrograms',
    dosageForm: 'Inhalation powder',
    route: 'Inhalation',
    packSize: '1 NEXThaler breath-actuated dry powder inhaler containing 120 doses',
    indications:
      'Regular treatment of asthma in adults (maintenance therapy or MART maintenance and reliever therapy); and symptomatic treatment of severe COPD (FEV1 < 50% predicted normal) with a history of repeated exacerbations.',
    dose:
      'Asthma maintenance: 1–2 inhalations twice daily (maximum 4 inhalations daily). Asthma MART: 1 inhalation twice daily plus 1 additional inhalation as needed for symptoms (maximum 8 inhalations daily). COPD: 2 inhalations twice daily.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate, formoterol fumarate dihydrate, or lactose (which contains small amounts of milk proteins).',
    adverseEffects:
      'Common: tremor, pneumonia (in COPD patients), oral candidiasis, dysphonia, throat irritation, headache. Uncommon: tachycardia, sinus bradycardia, angina pectoris, myocardial ischaemia, QT prolongation.',
    storage:
      'Do not store above 25°C. Store in the original package to protect from moisture. Use within 6 months after opening the pouch.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Fostair / Foster NEXThaler 100/6 micrograms Inhalation Powder SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/3361/smpc',
      },
    ],
    notes:
      'Official Chiesi Farmaceutici S.p.A. SmPC data. Breath-actuated dry powder inhaler delivering extrafine particles of beclometasone dipropionate 100 micrograms and formoterol fumarate dihydrate 6 micrograms.',
  },

  // 2. Clenil (Beclometasone — Chiesi Farmaceutici S.p.A.)
  {
    brandName: 'Clenil Modulite 100 micrograms',
    brandNameAr: 'كلينيل موديولايت 100 ميكروغرام',
    genericName: 'Beclometasone',
    activeIngredients: ['Beclometasone'],
    drugClass: 'Inhaled corticosteroid (ICS) anti-inflammatory preventative therapy',
    strength: '100 micrograms/actuation',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 200 actuations',
    indications:
      'Prophylactic management of mild, moderate, or severe asthma in adults and children.',
    dose:
      'Adults: Starting dose is typically 200 micrograms twice daily (up to 400 micrograms twice daily in more severe cases; maximum 2000 micrograms daily), titrated to the lowest effective maintenance dose. Children: 100 to 200 micrograms twice daily according to clinical response.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate or to any of the excipients.',
    adverseEffects:
      'Very common: candidiasis of the mouth and throat. Common: hoarseness (dysphonia), throat irritation. Uncommon: rash, urticaria, pruritus, erythema. Very rare: paradoxical bronchospasm, adrenal suppression, cataract, glaucoma, decreased bone mineral density.',
    storage:
      'Do not store above 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Pediatrics', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Clenil Modulite 100 micrograms Pressurised Inhalation Solution SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/6163/smpc',
      },
    ],
    notes:
      'Official Chiesi Farmaceutici S.p.A. / UK EMC SmPC data. CFC-free HFA pressurised metered-dose inhaler containing 100 micrograms beclometasone dipropionate per actuation (INN base: Beclometasone).',
  },
  {
    brandName: 'Clenil Modulite 250 micrograms',
    brandNameAr: 'كلينيل موديولايت 250 ميكروغرام',
    genericName: 'Beclometasone',
    activeIngredients: ['Beclometasone'],
    drugClass: 'Inhaled corticosteroid (ICS) anti-inflammatory preventative therapy',
    strength: '250 micrograms/actuation',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 200 actuations',
    indications:
      'Prophylactic management of moderate to severe asthma in adults requiring higher doses of inhaled corticosteroid.',
    dose:
      'Adults: Usual maintenance dose is 2 inhalations (500 micrograms) twice daily, or 1 inhalation four times daily. In severe cases, may be increased up to 2000 micrograms (8 inhalations) per day in divided doses, then stepped down once asthma is controlled. Not recommended for children.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate or to any of the excipients.',
    adverseEffects:
      'Very common: oropharyngeal candidiasis (rinse mouth with water after inhalation). Common: dysphonia, throat irritation, cough.',
    storage:
      'Do not store above 30°C. Protect from frost and direct sunlight.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Clenil Modulite 250 micrograms Pressurised Inhalation Solution SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/6165/smpc',
      },
    ],
    notes:
      'Official Chiesi Farmaceutici S.p.A. / UK EMC SmPC data. Each actuation delivers 250 micrograms beclometasone dipropionate (INN base: Beclometasone).',
  },

  // 3. Trimbow (Beclometasone + Formoterol + Glycopyrronium — Chiesi Farmaceutici S.p.A.)
  {
    brandName: 'Trimbow 87/5/9 micrograms',
    brandNameAr: 'تريمبو 87/5/9 ميكروغرام',
    genericName: 'Beclometasone + Formoterol + Glycopyrronium',
    activeIngredients: ['Beclometasone', 'Formoterol', 'Glycopyrronium'],
    drugClass: 'Extrafine triple therapy: inhaled corticosteroid (ICS), long-acting beta2-agonist (LABA), and long-acting muscarinic antagonist (LAMA)',
    strength: '87 micrograms/5 micrograms/9 micrograms',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 120 actuations',
    indications:
      'Maintenance treatment in adult patients with moderate to severe chronic obstructive pulmonary disease (COPD) who are not adequately treated by a combination of an inhaled corticosteroid and a long-acting beta2-agonist or a combination of a long-acting beta2-agonist and a long-acting muscarinic antagonist; and maintenance treatment of asthma in adults not adequately controlled with a maintenance combination of a long-acting beta2-agonist and a medium dose of inhaled corticosteroid, and who experienced one or more asthma exacerbations in the previous year.',
    dose:
      'Recommended dose is 2 inhalations twice daily. Maximum dose is 2 inhalations twice daily. Patients should be advised to rinse their mouth with water after inhaling.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate, formoterol fumarate dihydrate, glycopyrronium bromide, or to any of the excipients.',
    adverseEffects:
      'Common: pneumonia (in COPD patients), pharyngitis, oral candidiasis, urinary tract infection, nasopharyngitis, headache, dysphonia. Uncommon: influenza, oral fungal infection, sinusitis, rhinitis, gastroenteritis, vulvovaginal candidiasis, granulocytopenia, allergic dermatitis, hypokalaemia, hyperglycaemia, restlessness, tremor, dizziness, dysgeusia, atrial fibrillation, ECG QT prolongation, tachycardia, palpitations, cough, throat irritation, epistaxis, diarrhoea, dry mouth, dysphagia, nausea, dyspepsia, muscle spasms, myalgia, dysuria, urinary retention, fatigue, asthenia.',
    storage:
      'Prior to dispensing: store in a refrigerator (2°C to 8°C). After dispensing: do not store above 25°C for a maximum of 4 months.',
    specialties: ['Pulmonology', 'Internal Medicine', 'Allergy and Immunology'],
    sources: [
      {
        title: 'EMA EPAR — Trimbow (beclometasone / formoterol / glycopyrronium) Product Information (Chiesi Farmaceutici S.p.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trimbow',
      },
    ],
    notes:
      'Official EMA EPAR product information (Chiesi Farmaceutici S.p.A.). Each delivered dose (leaving the mouthpiece) contains 87 micrograms beclometasone dipropionate, 5 micrograms formoterol fumarate dihydrate, and 9 micrograms glycopyrronium (equivalent to 100/6/12.5 micrograms metered dose; INN bases: Beclometasone + Formoterol + Glycopyrronium).',
  },
  {
    brandName: 'Trimbow 172/5/9 micrograms',
    brandNameAr: 'تريمبو 172/5/9 ميكروغرام',
    genericName: 'Beclometasone + Formoterol + Glycopyrronium',
    activeIngredients: ['Beclometasone', 'Formoterol', 'Glycopyrronium'],
    drugClass: 'Extrafine high-dose ICS/LABA/LAMA fixed triple inhalation therapy',
    strength: '172 micrograms/5 micrograms/9 micrograms',
    dosageForm: 'Pressurised inhalation, solution',
    route: 'Inhalation',
    packSize: '1 pressurised metered-dose inhaler containing 120 actuations',
    indications:
      'Maintenance treatment of asthma in adults not adequately controlled with a maintenance combination of a long-acting beta2-agonist and a high dose of inhaled corticosteroid, and who experienced one or more asthma exacerbations in the previous year.',
    dose:
      'Recommended and maximum dose is 2 inhalations twice daily.',
    contraindications:
      'Hypersensitivity to beclometasone dipropionate, formoterol fumarate dihydrate, glycopyrronium bromide, or to any of the excipients.',
    adverseEffects:
      'Common: oral candidiasis, pharyngitis, nasopharyngitis, headache, dysphonia. Uncommon: tremor, dizziness, palpitations, tachycardia, atrial fibrillation, QT prolongation, dry mouth, muscle spasms, dysuria, urinary retention.',
    storage:
      'Prior to dispensing: store in a refrigerator (2°C to 8°C). After dispensing: store below 25°C for up to 4 months.',
    specialties: ['Pulmonology', 'Allergy and Immunology', 'Internal Medicine'],
    sources: [
      {
        title: 'EMA EPAR — Trimbow (beclometasone / formoterol / glycopyrronium) Product Information (Chiesi Farmaceutici S.p.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/trimbow',
      },
    ],
    notes:
      'Official EMA EPAR product information (Chiesi Farmaceutici S.p.A.). High-strength asthma triple therapy delivering 172 micrograms beclometasone dipropionate, 5 micrograms formoterol fumarate dihydrate, and 9 micrograms glycopyrronium per actuation.',
  },

  // 4. Curosurf (Poractant alfa — Chiesi Farmaceutici S.p.A.)
  {
    brandName: 'Curosurf 120 mg/1.5 mL',
    brandNameAr: 'كيوروسيرف 120 ملغ/1.5 مل',
    genericName: 'Poractant alfa',
    activeIngredients: ['Poractant alfa'],
    drugClass: 'Natural porcine lung surfactant (phospholipid fraction)',
    strength: '80 mg/mL (120 mg/1.5 mL)',
    dosageForm: 'Endotracheopulmonary instillation suspension',
    route: 'Endotracheopulmonary',
    packSize: '1 single-use vial of 1.5 mL suspension (120 mg)',
    indications:
      'Treatment of Respiratory Distress Syndrome (RDS) or hyaline membrane disease in newborn premature babies (rescue treatment); and prophylactic use in premature neonates at risk from RDS or with evidence of surfactant deficiency.',
    dose:
      'Rescue treatment: Recommended starting dose is 100 to 200 mg/kg (1.25 to 2.5 mL/kg) administered as a single dose as soon as possible after diagnosing RDS. Additional doses of 100 mg/kg (1.25 mL/kg) each, at about 12-hourly intervals, may be administered in babies who remain dependent on assisted ventilation and supplemental oxygen (maximum total dose 300 to 400 mg/kg). Prophylaxis: single dose of 100 to 200 mg/kg given as soon as possible (within 15 minutes) after birth. Administer solely by the endotracheopulmonary route (including LISA — Less Invasive Surfactant Administration).',
    contraindications:
      'Hypersensitivity to poractant alfa or to any of the excipients.',
    adverseEffects:
      'Uncommon: sepsis, intracranial haemorrhage, pneumothorax. Rare: bradycardia, hypotension, bronchopulmonary dysplasia, pulmonary haemorrhage, decreased oxygen saturation. Transient depression of cerebro-electrical activity and endotracheal tube blockage/reflux may occur during dosing.',
    storage:
      'Store in a refrigerator (2°C to 8°C) protected from light in the original package. Do not freeze. Before use, warm the vial to room temperature (e.g. by holding in the hand for a few minutes) and gently turn upside down without shaking.',
    specialties: ['Neonatology', 'Pediatrics', 'Critical Care'],
    sources: [
      {
        title: 'UK EMC — Curosurf 120 mg (1.5 ml) and 240 mg (3 ml) Endotracheopulmonary Instillation Suspension SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/1599/smpc',
      },
    ],
    notes:
      'Official UK EMC / Chiesi Farmaceutici S.p.A. SmPC data. Each 1.5 mL vial contains 120 mg poractant alfa (80 mg/mL phospholipid fraction from porcine lung).',
  },
  {
    brandName: 'Curosurf 240 mg/3 mL',
    brandNameAr: 'كيوروسيرف 240 ملغ/3 مل',
    genericName: 'Poractant alfa',
    activeIngredients: ['Poractant alfa'],
    drugClass: 'Natural porcine lung surfactant (phospholipid fraction)',
    strength: '80 mg/mL (240 mg/3 mL)',
    dosageForm: 'Endotracheopulmonary instillation suspension',
    route: 'Endotracheopulmonary',
    packSize: '1 single-use vial of 3 mL suspension (240 mg)',
    indications:
      'Rescue treatment and prophylaxis of neonatal Respiratory Distress Syndrome (RDS) in premature infants.',
    dose:
      'Initial dose of 100 to 200 mg/kg (1.25 to 2.5 mL/kg) instilled endotracheally, followed if required by up to two additional doses of 100 mg/kg (1.25 mL/kg) at 12-hour intervals (maximum total dose 300 to 400 mg/kg).',
    contraindications:
      'Hypersensitivity to poractant alfa or to any of the excipients.',
    adverseEffects:
      'Uncommon: sepsis, intracranial haemorrhage, pneumothorax. Rare: bradycardia, hypotension, pulmonary haemorrhage, bronchopulmonary dysplasia, transient oxygen desaturation during administration.',
    storage:
      'Store in a refrigerator (2°C to 8°C) in the original package to protect from light. Do not shake.',
    specialties: ['Neonatology', 'Pediatrics', 'Critical Care'],
    sources: [
      {
        title: 'UK EMC — Curosurf 120 mg (1.5 ml) and 240 mg (3 ml) Endotracheopulmonary Instillation Suspension SmPC (Chiesi)',
        url: 'https://www.medicines.org.uk/emc/product/1599/smpc',
      },
    ],
    notes:
      'Official UK EMC / Chiesi Farmaceutici S.p.A. SmPC data. Each 3 mL vial contains 240 mg poractant alfa (80 mg/mL).',
  },

  // 5. Peyona (Caffeine — Chiesi Farmaceutici S.p.A.)
  {
    brandName: 'Peyona 20 mg/mL',
    brandNameAr: 'بيونا 20 ملغ/مل',
    genericName: 'Caffeine',
    activeIngredients: ['Caffeine'],
    drugClass: 'Methylxanthine central nervous system and respiratory stimulant',
    strength: '20 mg/mL',
    dosageForm: 'Solution for infusion and oral solution',
    route: 'Intravenous or Oral',
    packSize: 'Pack of 10 ampoules of 1 mL (20 mg caffeine citrate)',
    indications:
      'Treatment of primary apnoea of premature newborns.',
    dose:
      'Loading dose: 20 mg/kg body weight of caffeine citrate (equivalent to 10 mg/kg caffeine base = 1 mL/kg) administered by slow intravenous infusion over 30 minutes using a syringe infusion pump. Maintenance dose: 5 mg/kg body weight of caffeine citrate (equivalent to 2.5 mg/kg caffeine base = 0.25 mL/kg) every 24 hours, starting 24 hours after the loading dose, given by slow IV infusion over 10 minutes or orally/via nasogastric tube.',
    contraindications:
      'Hypersensitivity to caffeine citrate or to any of the excipients.',
    adverseEffects:
      'Common: infusion site phlebitis and inflammation, tachycardia, hyperglycaemia. Uncommon: sepsis, convulsion, arrhythmia, regurgitation, increased urine output. Rare: necrotising enterocolitis, hypoglycaemia, irritability, jitteriness, restlessness, deafness.',
    storage:
      'This medicinal product does not require any special storage conditions. Use immediately after opening the ampoule.',
    specialties: ['Neonatology', 'Pediatrics', 'Critical Care'],
    sources: [
      {
        title: 'EMA EPAR — Peyona (caffeine citrate) Product Information (Chiesi Farmaceutici S.p.A.)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/peyona',
      },
    ],
    notes:
      'Official EMA EPAR product information (Chiesi Farmaceutici S.p.A.). Each 1 mL ampoule contains 20 mg caffeine citrate equivalent to 10 mg caffeine base (INN base: Caffeine).',
  },
];

export const CHIESI_PRODUCTS: AiProductDraft[] = RAW_CHIESI.map((d) => ({
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
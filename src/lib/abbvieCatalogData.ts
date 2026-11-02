import type { AiDraftSource, AiProductDraft } from './catalog';

const ABBVIE_SRC = (title: string, url: string): AiDraftSource[] => [{ title, url }];

interface CompactAbbvieDrug {
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

function toAbbvieProductDraft(item: CompactAbbvieDrug): AiProductDraft {
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
    sources: ABBVIE_SRC(item.sourceTitle, item.sourceUrl),
    notes:
      'Official AbbVie Inc. regulatory monograph (EMA EPAR / UK EMC / Official SmPC); saved as draft pending verification.',
  };
}

const ABBVIE_COMPACT_PRODUCTS: CompactAbbvieDrug[] = [
  // ===========================================================================
  // 1. IMMUNOLOGY, RHEUMATOLOGY, DERMATOLOGY & GASTROENTEROLOGY (12 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Humira 40 mg/0.4 mL Pre-filled Pen',
    brandNameAr: 'هيوميرا 40 ملغ/0.4 مل قلم',
    genericName: 'Adalimumab',
    drugClass: 'Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB04)',
    strength: '40 mg/0.4 mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '2 pre-filled pens (citrate-free high-concentration formulation)',
    approvedIndications:
      'Rheumatoid arthritis (moderate to severe active); polyarticular juvenile idiopathic arthritis and enthesitis-related arthritis; axial spondyloarthritis (ankylosing spondylitis and non-radiographic axial spondyloarthritis); psoriatic arthritis; moderate to severe chronic plaque psoriasis; moderate to severe hidradenitis suppurativa; Crohn’s disease; ulcerative colitis; non-infectious intermediate, posterior, and panuveitis.',
    usualAdultDose:
      'Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis: 40 mg subcutaneously every other week. Plaque psoriasis / uveitis: 80 mg initial dose followed by 40 mg every other week starting one week after the initial dose. Hidradenitis suppurativa / Crohn’s disease / ulcerative colitis: 160 mg at Week 0, 80 mg at Week 2, then 40 mg every week or 80 mg every other week (or 40 mg every other week depending on indication).',
    contraindications:
      'Hypersensitivity to adalimumab or any excipient; active tuberculosis or other severe infections such as sepsis and opportunistic infections; moderate to severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Respiratory tract infections (upper and lower, pneumonia, sinusitis, pharyngitis, nasopharyngitis), injection site reactions (erythema, pruritus, pain, swelling), leukopenia, anaemia, headache, abdominal pain, nausea, elevated hepatic enzymes, musculoskeletal pain, rash.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton to protect from light. A single pre-filled pen may be stored up to 25°C for up to 14 days.',
    specialties: ['Rheumatology', 'Gastroenterology', 'Dermatology', 'Ophthalmology', 'Paediatrics'],
    sourceTitle: 'EMA EPAR – Humira (adalimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humira',
  },
  {
    brandName: 'Humira 40 mg/0.4 mL Pre-filled Syringe',
    brandNameAr: 'هيوميرا 40 ملغ/0.4 مل سرنجة',
    genericName: 'Adalimumab',
    drugClass: 'Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB04)',
    strength: '40 mg/0.4 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '2 pre-filled syringes with needle guard',
    approvedIndications:
      'Rheumatoid arthritis; juvenile idiopathic arthritis; axial spondyloarthritis; psoriatic arthritis; plaque psoriasis; hidradenitis suppurativa; Crohn’s disease; ulcerative colitis; non-infectious intermediate, posterior, and panuveitis.',
    usualAdultDose:
      '40 mg subcutaneously every other week (or weekly / after loading doses depending on indication) injected into the thigh or abdomen.',
    contraindications:
      'Hypersensitivity to adalimumab or any excipient; active tuberculosis or other severe/opportunistic infections; moderate to severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Upper and lower respiratory tract infections, injection site erythema/pain, leukopenia, headache, rash, elevated transaminases, musculoskeletal pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Rheumatology', 'Gastroenterology', 'Dermatology', 'Ophthalmology', 'Paediatrics'],
    sourceTitle: 'EMA EPAR – Humira (adalimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humira',
  },
  {
    brandName: 'Humira 80 mg/0.8 mL Pre-filled Pen',
    brandNameAr: 'هيوميرا 80 ملغ/0.8 مل قلم',
    genericName: 'Adalimumab',
    drugClass: 'Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB04)',
    strength: '80 mg/0.8 mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '1 or 2 pre-filled pens',
    approvedIndications:
      'Induction and maintenance regimens requiring 80 mg or 160 mg dosing in Crohn’s disease, ulcerative colitis, hidradenitis suppurativa, plaque psoriasis, uveitis, and rheumatoid arthritis.',
    usualAdultDose:
      'Induction: two 80 mg pens (160 mg) at Week 0 and one 80 mg pen at Week 2 (Crohn’s, UC, HS), or one 80 mg pen at Week 0 (plaque psoriasis, uveitis). Maintenance in HS/UC/Crohn’s when 80 mg every other week is indicated: one 80 mg pen every other week.',
    contraindications:
      'Hypersensitivity to adalimumab; active tuberculosis or severe opportunistic infections; moderate to severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Respiratory tract infections, injection site reactions, leukopenia, headache, abdominal pain, rash, elevated liver enzymes.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Gastroenterology', 'Dermatology', 'Rheumatology', 'Ophthalmology'],
    sourceTitle: 'EMA EPAR – Humira (adalimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humira',
  },
  {
    brandName: 'Humira 20 mg/0.2 mL Pre-filled Syringe',
    brandNameAr: 'هيوميرا 20 ملغ/0.2 مل سرنجة',
    genericName: 'Adalimumab',
    drugClass: 'Tumour Necrosis Factor Alpha (TNF-α) Inhibitors (L04AB04)',
    strength: '20 mg/0.2 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '2 pre-filled syringes',
    approvedIndications:
      'Paediatric polyarticular juvenile idiopathic arthritis, enthesitis-related arthritis, paediatric plaque psoriasis, paediatric Crohn’s disease, and paediatric non-infectious uveitis in lower-weight children.',
    usualAdultDose:
      'Paediatric weight-based dosing (typically for patients 10 kg to <30 kg): 20 mg subcutaneously every other week (after any applicable induction dose).',
    contraindications:
      'Hypersensitivity to adalimumab; active tuberculosis or severe infections; moderate to severe heart failure (NYHA Class III/IV).',
    commonAdverseEffects:
      'Respiratory tract infections, injection site reactions, headache, abdominal pain, rash, leukopenia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Protect from light.',
    specialties: ['Paediatrics', 'Rheumatology', 'Gastroenterology', 'Dermatology', 'Ophthalmology'],
    sourceTitle: 'EMA EPAR – Humira (adalimumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/humira',
  },
  {
    brandName: 'Rinvoq 15 mg',
    brandNameAr: 'رينفوك 15 ملغ',
    genericName: 'Upadacitinib',
    drugClass: 'Selective Janus Kinase (JAK1) Inhibitors (L04AF03)',
    strength: '15 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Moderate to severe active rheumatoid arthritis; active psoriatic arthritis; active axial spondyloarthritis (non-radiographic axial spondyloarthritis and ankylosing spondylitis); moderate to severe atopic dermatitis in adults and adolescents ≥12 years; maintenance treatment of ulcerative colitis and Crohn’s disease.',
    usualAdultDose:
      'Rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis: 15 mg once daily. Atopic dermatitis: 15 mg or 30 mg once daily (15 mg once daily in adolescents ≥30 kg and adults ≥65 years). Ulcerative colitis / Crohn’s disease maintenance: 15 mg or 30 mg once daily. Swallow whole with or without food; do not split, crush, or chew.',
    contraindications:
      'Hypersensitivity to upadacitinib or any excipient; active tuberculosis or active serious infections; severe hepatic impairment (Child-Pugh Class C); pregnancy.',
    commonAdverseEffects:
      'Upper respiratory tract infections, bronchitis, herpes zoster, herpes simplex, acne, folliculitis, influenza, urinary tract infection, cough, abdominal pain, nausea, neutropenia, hypercholesterolaemia, hypertriglyceridaemia, increased blood creatine phosphokinase (CPK), increased ALT/AST, fatigue, pyrexia.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Store in the original blister or bottle in order to protect from moisture.',
    specialties: ['Rheumatology', 'Dermatology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR – Rinvoq (upadacitinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rinvoq',
  },
  {
    brandName: 'Rinvoq 30 mg',
    brandNameAr: 'رينفوك 30 ملغ',
    genericName: 'Upadacitinib',
    drugClass: 'Selective Janus Kinase (JAK1) Inhibitors (L04AF03)',
    strength: '30 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Moderate to severe atopic dermatitis in adults <65 years requiring higher efficacy; maintenance treatment of moderate to severe active ulcerative colitis and Crohn’s disease in adults <65 years.',
    usualAdultDose:
      '30 mg orally once daily with or without food in eligible adult patients (<65 years without elevated cardiovascular/malignancy risk). Swallow whole; do not split, crush, or chew.',
    contraindications:
      'Hypersensitivity to upadacitinib; active tuberculosis or active serious infections; severe hepatic impairment (Child-Pugh C); pregnancy.',
    commonAdverseEffects:
      'Upper respiratory tract infections, acne, herpes zoster, herpes simplex, increased CPK, hyperlipidaemia, neutropenia, elevated transaminases, headache, nausea.',
    storageConditions:
      'Store in the original blister or bottle to protect from moisture.',
    specialties: ['Dermatology', 'Gastroenterology'],
    sourceTitle: 'EMA EPAR – Rinvoq (upadacitinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rinvoq',
  },
  {
    brandName: 'Rinvoq 45 mg',
    brandNameAr: 'رينفوك 45 ملغ',
    genericName: 'Upadacitinib',
    drugClass: 'Selective Janus Kinase (JAK1) Inhibitors (L04AF03)',
    strength: '45 mg',
    dosageForm: 'Prolonged-release tablet',
    route: 'Oral',
    packSize: '28 prolonged-release tablets',
    approvedIndications:
      'Oral induction treatment of adult patients with moderate to severe active ulcerative colitis or moderate to severe active Crohn’s disease who have had an inadequate response, lost response, or were intolerant to either conventional therapy or a biologic agent.',
    usualAdultDose:
      'Ulcerative colitis induction: 45 mg once daily for 8 weeks (may be extended for an additional 8 weeks if needed). Crohn’s disease induction: 45 mg once daily for 12 weeks. Transition to 15 mg or 30 mg once daily for maintenance.',
    contraindications:
      'Hypersensitivity to upadacitinib; active tuberculosis or active serious infections; severe hepatic impairment (Child-Pugh C); pregnancy.',
    commonAdverseEffects:
      'Upper respiratory tract infections, acne, rash, herpes zoster, neutropenia, lymphopenia, elevated CPK and liver transaminases, hypercholesterolaemia.',
    storageConditions:
      'Store in the original blister or bottle to protect from moisture.',
    specialties: ['Gastroenterology'],
    sourceTitle: 'EMA EPAR – Rinvoq (upadacitinib) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rinvoq',
  },
  {
    brandName: 'Skyrizi 150 mg Pre-filled Pen',
    brandNameAr: 'سكايريزي 150 ملغ قلم',
    genericName: 'Risankizumab',
    drugClass: 'Selective Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC18)',
    strength: '150 mg/mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: '1 pre-filled pen (1 mL)',
    approvedIndications:
      'Treatment of moderate to severe plaque psoriasis in adults who are candidates for systemic therapy; treatment of active psoriatic arthritis in adults (alone or in combination with methotrexate) who have had an inadequate response or intolerance to one or more DMARDs.',
    usualAdultDose:
      '150 mg administered by subcutaneous injection at Week 0, Week 4, and every 12 weeks thereafter.',
    contraindications:
      'Hypersensitivity to risankizumab or any excipient; clinically important active infections (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Upper respiratory tract infections, tinea infections, headache, pruritus, eczema, rash, fatigue, injection site reactions (erythema, pain).',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the pre-filled pen in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Skyrizi (risankizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/skyrizi',
  },
  {
    brandName: 'Skyrizi 150 mg Pre-filled Syringe',
    brandNameAr: 'سكايريزي 150 ملغ سرنجة',
    genericName: 'Risankizumab',
    drugClass: 'Selective Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC18)',
    strength: '150 mg/mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '1 pre-filled syringe (1 mL)',
    approvedIndications:
      'Moderate to severe plaque psoriasis in adults who are candidates for systemic therapy; active psoriatic arthritis in adults.',
    usualAdultDose:
      '150 mg (one 150 mg/mL pre-filled syringe) administered subcutaneously at Week 0, Week 4, and every 12 weeks thereafter.',
    contraindications:
      'Hypersensitivity to risankizumab; clinically important active infections (e.g., active tuberculosis).',
    commonAdverseEffects:
      'Upper respiratory tract infections, tinea infections, headache, pruritus, fatigue, injection site reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Skyrizi (risankizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/skyrizi',
  },
  {
    brandName: 'Skyrizi 75 mg Pre-filled Syringe',
    brandNameAr: 'سكايريزي 75 ملغ سرنجة',
    genericName: 'Risankizumab',
    drugClass: 'Selective Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC18)',
    strength: '75 mg/0.83 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '2 pre-filled syringes (total dose 150 mg)',
    approvedIndications:
      'Moderate to severe plaque psoriasis in adults; active psoriatic arthritis in adults.',
    usualAdultDose:
      '150 mg (administered as two 75 mg subcutaneous injections at separate anatomical sites) at Week 0, Week 4, and every 12 weeks thereafter.',
    contraindications:
      'Hypersensitivity to risankizumab; clinically important active infections.',
    commonAdverseEffects:
      'Upper respiratory tract infections, tinea infections, headache, pruritus, fatigue, injection site reactions.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Dermatology', 'Rheumatology'],
    sourceTitle: 'EMA EPAR – Skyrizi (risankizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/skyrizi',
  },
  {
    brandName: 'Skyrizi 360 mg/2.4 mL Cartridge',
    brandNameAr: 'سكايريزي 360 ملغ/2.4 مل خرطوشة',
    genericName: 'Risankizumab',
    drugClass: 'Selective Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC18)',
    strength: '360 mg/2.4 mL (150 mg/mL)',
    dosageForm: 'Solution for injection in cartridge (with on-body injector)',
    route: 'Subcutaneous',
    packSize: '1 cartridge + 1 on-body injector',
    approvedIndications:
      'Subcutaneous maintenance treatment of adult patients with moderate to severe active Crohn’s disease or moderate to severe active ulcerative colitis following intravenous Skyrizi induction.',
    usualAdultDose:
      '360 mg administered subcutaneously using the on-body injector at Week 12 and every 8 weeks thereafter.',
    contraindications:
      'Hypersensitivity to risankizumab; clinically important active infections.',
    commonAdverseEffects:
      'Upper respiratory tract infections, headache, arthralgia, injection site reactions, rash, fatigue, transient hepatic enzyme elevations.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep in the outer carton to protect from light.',
    specialties: ['Gastroenterology'],
    sourceTitle: 'EMA EPAR – Skyrizi (risankizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/skyrizi',
  },
  {
    brandName: 'Skyrizi 600 mg/10 mL Vial',
    brandNameAr: 'سكايريزي 600 ملغ/10 مل فيال',
    genericName: 'Risankizumab',
    drugClass: 'Selective Interleukin-23 (IL-23p19) Monoclonal Antibody Inhibitors (L04AC18)',
    strength: '600 mg/10 mL (60 mg/mL)',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous infusion',
    packSize: '1 vial (10 mL)',
    approvedIndications:
      'Intravenous induction treatment of adult patients with moderate to severe active Crohn’s disease or moderate to severe active ulcerative colitis who have had an inadequate response, lost response, or were intolerant to conventional therapy or a biologic therapy.',
    usualAdultDose:
      'Crohn’s disease induction: 600 mg administered by intravenous infusion over at least 1 hour at Week 0, Week 4, and Week 8 (followed by subcutaneous maintenance starting at Week 12). Ulcerative colitis induction: 1200 mg (two 600 mg vials) by IV infusion over at least 2 hours at Week 0, Week 4, and Week 8.',
    contraindications:
      'Hypersensitivity to risankizumab; clinically important active infections (including active tuberculosis).',
    commonAdverseEffects:
      'Upper respiratory tract infections, headache, arthralgia, infusion-related reactions, rash, fatigue, elevated liver enzymes.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton to protect from light.',
    specialties: ['Gastroenterology'],
    sourceTitle: 'EMA EPAR – Skyrizi (risankizumab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/skyrizi',
  },

  // ===========================================================================
  // 2. ONCOLOGY, MALIGNANT HAEMATOLOGY & ENDOCRINOLOGY (8 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Venclyxto 10 mg',
    brandNameAr: 'فينكليكستو 10 ملغ',
    genericName: 'Venetoclax',
    drugClass: 'Selective BCL-2 Protein Inhibitors (L01XX52)',
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '14 film-coated tablets (Week 1 & 2 ramp-up wallet packs)',
    approvedIndications:
      'Chronic lymphocytic leukaemia (CLL): in combination with obinutuzumab for previously untreated adult patients, in combination with rituximab for adult patients who have received at least one prior therapy, or as monotherapy in patients with/without 17p deletion or TP53 mutation; Acute myeloid leukaemia (AML): in combination with a hypomethylating agent (azacitidine or decitabine) for newly diagnosed adult patients ineligible for intensive chemotherapy.',
    usualAdultDose:
      'CLL 5-week dose-titration schedule to mitigate tumour lysis syndrome (TLS): Week 1: 20 mg once daily; Week 2: 50 mg once daily; Week 3: 100 mg once daily; Week 4: 200 mg once daily; Week 5 and onwards: 400 mg once daily. Swallow whole with a meal and water.',
    contraindications:
      'Hypersensitivity to venetoclax or any excipient; concomitant use of strong CYP3A inhibitors at initiation and during the dose-titration phase in patients with CLL; concomitant use of preparations containing St. John’s wort.',
    commonAdverseEffects:
      'Neutropenia, febrile neutropenia, anaemia, thrombocytopenia, lymphopenia, upper respiratory tract infection, pneumonia, urinary tract infection, diarrhoea, vomiting, nausea, constipation, fatigue, hyperphosphataemia, tumour lysis syndrome (TLS).',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Venclyxto (venetoclax) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/venclyxto',
  },
  {
    brandName: 'Venclyxto 50 mg',
    brandNameAr: 'فينكليكستو 50 ملغ',
    genericName: 'Venetoclax',
    drugClass: 'Selective BCL-2 Protein Inhibitors (L01XX52)',
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '7 film-coated tablets (Week 2 ramp-up wallet pack)',
    approvedIndications:
      'Dose ramp-up and dose-modified maintenance therapy in chronic lymphocytic leukaemia (CLL) and newly diagnosed acute myeloid leukaemia (AML).',
    usualAdultDose:
      'CLL Week 2 ramp-up: 50 mg (one tablet) once daily for 7 days with a meal and water, or dose-reduced maintenance when co-administered with strong/moderate CYP3A inhibitors.',
    contraindications:
      'Hypersensitivity to venetoclax; concomitant strong CYP3A inhibitors during initiation and ramp-up in CLL; concomitant St. John’s wort.',
    commonAdverseEffects:
      'Neutropenia, anaemia, thrombocytopenia, diarrhoea, nausea, vomiting, upper respiratory tract infection, fatigue, tumour lysis syndrome.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Venclyxto (venetoclax) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/venclyxto',
  },
  {
    brandName: 'Venclyxto 100 mg',
    brandNameAr: 'فينكليكستو 100 ملغ',
    genericName: 'Venetoclax',
    drugClass: 'Selective BCL-2 Protein Inhibitors (L01XX52)',
    strength: '100 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '7, 14, or 112 film-coated tablets',
    approvedIndications:
      'Chronic lymphocytic leukaemia (CLL) in combination with obinutuzumab, in combination with rituximab, or as monotherapy; newly diagnosed acute myeloid leukaemia (AML) in combination with azacitidine or decitabine in adults ineligible for intensive chemotherapy.',
    usualAdultDose:
      'CLL maintenance after 5-week ramp-up: 400 mg (four 100 mg tablets) once daily with a meal and water. AML: 100 mg on Day 1, 200 mg on Day 2, 400 mg on Day 3 and beyond in combination with azacitidine or decitabine.',
    contraindications:
      'Hypersensitivity to venetoclax; concomitant strong CYP3A inhibitors during initiation and ramp-up in CLL; concomitant St. John’s wort.',
    commonAdverseEffects:
      'Neutropenia, febrile neutropenia, thrombocytopenia, anaemia, diarrhoea, nausea, vomiting, pneumonia, sepsis, fatigue, tumour lysis syndrome.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Venclyxto (venetoclax) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/venclyxto',
  },
  {
    brandName: 'Tepkinly 4 mg/0.8 mL',
    brandNameAr: 'تيبكينلي 4 ملغ/0.8 مل فيال',
    genericName: 'Epcoritamab',
    drugClass: 'Bispecific CD20-Directed CD3 T-Cell Engager Monoclonal Antibodies (L01FX27)',
    strength: '4 mg/0.8 mL (5 mg/mL)',
    dosageForm: 'Concentrate for solution for injection (and solution for injection)',
    route: 'Subcutaneous',
    packSize: '1 vial (0.8 mL)',
    approvedIndications:
      'Monotherapy for the treatment of adult patients with relapsed or refractory diffuse large B-cell lymphoma (DLBCL) or relapsed or refractory follicular lymphoma (FL) after two or more lines of systemic therapy.',
    usualAdultDose:
      'Cycle 1 step-up dosing to mitigate cytokine release syndrome (CRS): Day 1 priming dose of 0.16 mg (requires dilution) and Day 8 intermediate dose of 0.8 mg (and 3 mg on Day 15 in FL), followed by full 48 mg doses from Cycle 1 Day 15 (DLBCL) or Day 22 (FL).',
    contraindications:
      'Hypersensitivity to epcoritamab or any of the excipients.',
    commonAdverseEffects:
      'Cytokine release syndrome (CRS), immune effector cell-associated neurotoxicity syndrome (ICANS), injection site reactions, neutropenia, anaemia, thrombocytopenia, pyrexia, fatigue, diarrhoea, nausea, viral and bacterial infections.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton to protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Tepkinly (epcoritamab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tepkinly',
  },
  {
    brandName: 'Tepkinly 48 mg/0.8 mL',
    brandNameAr: 'تيبكينلي 48 ملغ/0.8 مل فيال',
    genericName: 'Epcoritamab',
    drugClass: 'Bispecific CD20-Directed CD3 T-Cell Engager Monoclonal Antibodies (L01FX27)',
    strength: '48 mg/0.8 mL (60 mg/mL)',
    dosageForm: 'Solution for injection',
    route: 'Subcutaneous',
    packSize: '1 vial (0.8 mL)',
    approvedIndications:
      'Monotherapy for adult patients with relapsed or refractory diffuse large B-cell lymphoma (DLBCL) or relapsed or refractory follicular lymphoma (FL) after two or more lines of systemic therapy.',
    usualAdultDose:
      'Full maintenance dose following Cycle 1 step-up: 48 mg subcutaneously once weekly in Cycles 1–3, once every 2 weeks in Cycles 4–9, and once every 4 weeks from Cycle 10 onwards until disease progression or unacceptable toxicity.',
    contraindications:
      'Hypersensitivity to epcoritamab or any of the excipients.',
    commonAdverseEffects:
      'Cytokine release syndrome (CRS), ICANS, neutropenia, anaemia, thrombocytopenia, injection site reactions, fatigue, pyrexia, diarrhoea, pneumonia.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C). Do not freeze. Keep the vial in the outer carton to protect from light.',
    specialties: ['Haematology', 'Oncology'],
    sourceTitle: 'EMA EPAR – Tepkinly (epcoritamab) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/tepkinly',
  },
  {
    brandName: 'Lucrin Depot 3.75 mg',
    brandNameAr: 'لوكرين ديبو 3.75 ملغ',
    genericName: 'Leuprorelin',
    drugClass: 'Gonadotropin-Releasing Hormone (GnRH / LHRH) Analogues (L02AE02)',
    strength: '3.75 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection in pre-filled syringe',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 pre-filled dual-chamber syringe (1-month depot)',
    approvedIndications:
      'Palliative treatment of advanced hormone-dependent prostate cancer; advanced breast cancer in pre- and perimenopausal women suitable for hormonal manipulation; endometriosis; uterine fibroids (leiomyomata) prior to surgery or in symptomatic women; central precocious puberty (CPP) in children.',
    usualAdultDose:
      '3.75 mg administered as a single subcutaneous or intramuscular injection once every month (every 4 weeks).',
    contraindications:
      'Hypersensitivity to leuprorelin, synthetic GnRH analogues, or any excipient; undiagnosed abnormal vaginal bleeding; pregnancy and lactation; hormone-independent prostate cancer.',
    commonAdverseEffects:
      'Hot flushes, hyperhidrosis, decreased libido, erectile dysfunction, testicular atrophy, initial transient flare of testosterone/bone pain, vaginitis/vaginal dryness, headache, mood swings, depression, arthralgia, bone mineral density decrease, injection site reactions.',
    storageConditions:
      'Store below 25°C. Do not freeze. Protect from light in the outer carton.',
    specialties: ['Oncology', 'Urology', 'Obstetrics & Gynaecology', 'Paediatrics', 'Endocrinology'],
    sourceTitle: 'Medsafe Official Data Sheet – Lucrin Depot (leuprorelin) 1-Month, 3-Month & 6-Month PDS',
    sourceUrl: 'https://www.medsafe.govt.nz/profs/datasheet/l/LucrinDepot1-month3month6monthDUALinj.pdf',
  },
  {
    brandName: 'Lucrin Depot 11.25 mg',
    brandNameAr: 'لوكرين ديبو 11.25 ملغ',
    genericName: 'Leuprorelin',
    drugClass: 'Gonadotropin-Releasing Hormone (GnRH / LHRH) Analogues (L02AE02)',
    strength: '11.25 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection in pre-filled syringe',
    route: 'Subcutaneous or Intramuscular',
    packSize: '1 pre-filled dual-chamber syringe (3-month depot)',
    approvedIndications:
      'Advanced hormone-dependent prostate cancer; pre- and perimenopausal hormone-receptor-positive breast cancer; endometriosis and uterine fibroids; central precocious puberty.',
    usualAdultDose:
      '11.25 mg administered as a single subcutaneous or intramuscular injection once every 3 months (every 12 weeks).',
    contraindications:
      'Hypersensitivity to leuprorelin or GnRH analogues; undiagnosed vaginal bleeding; pregnancy and lactation.',
    commonAdverseEffects:
      'Hot flushes, sweating, decreased libido, erectile dysfunction, initial tumour flare in prostate cancer, headache, mood changes, arthralgia, decreased bone mineral density, injection site pain/induration.',
    storageConditions:
      'Store below 25°C. Do not freeze. Protect from light.',
    specialties: ['Oncology', 'Urology', 'Obstetrics & Gynaecology', 'Paediatrics', 'Endocrinology'],
    sourceTitle: 'Medsafe Official Data Sheet – Lucrin Depot (leuprorelin) 1-Month, 3-Month & 6-Month PDS',
    sourceUrl: 'https://www.medsafe.govt.nz/profs/datasheet/l/LucrinDepot1-month3month6monthDUALinj.pdf',
  },
  {
    brandName: 'Lucrin Depot 30 mg',
    brandNameAr: 'لوكرين ديبو 30 ملغ',
    genericName: 'Leuprorelin',
    drugClass: 'Gonadotropin-Releasing Hormone (GnRH / LHRH) Analogues (L02AE02)',
    strength: '30 mg',
    dosageForm: 'Powder and solvent for prolonged-release suspension for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '1 pre-filled dual-chamber syringe (6-month depot)',
    approvedIndications:
      'Palliative treatment of locally advanced or metastatic hormone-dependent prostate cancer; treatment of central precocious puberty.',
    usualAdultDose:
      '30 mg administered as a single subcutaneous injection once every 6 months (every 24 weeks).',
    contraindications:
      'Hypersensitivity to leuprorelin or GnRH analogues; hormone-independent prostate cancer; pregnancy and lactation.',
    commonAdverseEffects:
      'Hot flushes, hyperhidrosis, erectile dysfunction, decreased libido, fatigue, arthralgia, bone mineral density loss, injection site reactions.',
    storageConditions:
      'Store below 25°C. Do not freeze. Protect from light.',
    specialties: ['Oncology', 'Urology', 'Endocrinology'],
    sourceTitle: 'Medsafe Official Data Sheet – Lucrin Depot (leuprorelin) 1-Month, 3-Month & 6-Month PDS',
    sourceUrl: 'https://www.medsafe.govt.nz/profs/datasheet/l/LucrinDepot1-month3month6monthDUALinj.pdf',
  },

  // ===========================================================================
  // 3. NEUROSCIENCE, MIGRAINE, ANAESTHESIA & VIROLOGY (8 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Botox 50 Units',
    brandNameAr: 'بوتوكس 50 وحدة',
    genericName: 'Botulinum toxin type A',
    drugClass: 'Neuromuscular Blocking Agents / Peripheral Muscle Relaxants (M03AX01)',
    strength: '50 Allergan Units',
    dosageForm: 'Powder for solution for injection',
    route: 'Intramuscular, Intradetrusor, or Intradermal',
    packSize: '1 vial',
    approvedIndications:
      'Neurological disorders: focal spasticity of the ankle and foot in ambulatory cerebral palsy children (≥2 years) and wrist/hand/ankle/foot post-stroke spasticity in adults; blepharospasm, hemifacial spasm, and cervical dystonia (spasmodic torticollis); prophylaxis of headaches in adults with chronic migraine (≥15 headache days/month); Bladder disorders: idiopathic overactive bladder (OAB) and neurogenic detrusor overactivity (NDO); Skin: persistent severe primary axillary hyperhidrosis.',
    usualAdultDose:
      'Dosing is strictly indication- and muscle-specific using reconstituted sterile unpreserved 0.9% sodium chloride solution (Allergan Units are specific to Botox and not interchangeable with other botulinum toxin preparations).',
    contraindications:
      'Known hypersensitivity to botulinum toxin type A or any excipient; infection at the proposed injection site(s); for bladder indications: urinary tract infection at the time of treatment or acute urinary retention in patients not routinely catheterising.',
    commonAdverseEffects:
      'Indication-dependent focal muscle weakness adjacent to injection site: ptosis and dry eye (blepharospasm), dysphagia and neck weakness (cervical dystonia), neck pain and eyelid ptosis (chronic migraine), urinary tract infection and dysuria/urinary retention (OAB/NDO), injection site pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C), or store in a freezer (at or below -5°C).',
    specialties: ['Neurology', 'Urology', 'Ophthalmology', 'Dermatology'],
    sourceTitle: 'UK EMC Official SmPC – Botox (botulinum toxin type A) 50, 100 & 200 Units',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/859/smpc',
  },
  {
    brandName: 'Botox 100 Units',
    brandNameAr: 'بوتوكس 100 وحدة',
    genericName: 'Botulinum toxin type A',
    drugClass: 'Neuromuscular Blocking Agents / Peripheral Muscle Relaxants (M03AX01)',
    strength: '100 Allergan Units',
    dosageForm: 'Powder for solution for injection',
    route: 'Intramuscular, Intradetrusor, or Intradermal',
    packSize: '1 vial',
    approvedIndications:
      'Focal spasticity (adult post-stroke upper/lower limb and paediatric cerebral palsy); blepharospasm, hemifacial spasm, and cervical dystonia; chronic migraine prophylaxis; idiopathic overactive bladder (100 Units) and neurogenic detrusor overactivity (200 Units); severe primary axillary hyperhidrosis.',
    usualAdultDose:
      'Chronic migraine: 155 to 195 Units divided across 31 to 39 pericranial head/neck sites every 12 weeks. Idiopathic OAB: 100 Units injected as 0.5 mL (5 Units) across 20 sites in the detrusor. Axillary hyperhidrosis: 50 Units intradermally per axilla.',
    contraindications:
      'Hypersensitivity to botulinum toxin type A; infection at the proposed injection site(s); active UTI or unmanaged acute urinary retention for intradetrusor administration.',
    commonAdverseEffects:
      'Localised muscle weakness, eyelid ptosis, dysphagia (cervical dystonia), neck pain (chronic migraine), urinary tract infection and elevated post-void residual volume (bladder indications), injection site pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C), or store in a freezer (at or below -5°C).',
    specialties: ['Neurology', 'Urology', 'Ophthalmology', 'Dermatology'],
    sourceTitle: 'UK EMC Official SmPC – Botox (botulinum toxin type A) 50, 100 & 200 Units',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/859/smpc',
  },
  {
    brandName: 'Botox 200 Units',
    brandNameAr: 'بوتوكس 200 وحدة',
    genericName: 'Botulinum toxin type A',
    drugClass: 'Neuromuscular Blocking Agents / Peripheral Muscle Relaxants (M03AX01)',
    strength: '200 Allergan Units',
    dosageForm: 'Powder for solution for injection',
    route: 'Intramuscular, Intradetrusor, or Intradermal',
    packSize: '1 vial',
    approvedIndications:
      'Neurogenic detrusor overactivity (NDO) due to subcervical spinal cord injury or multiple sclerosis; chronic migraine prophylaxis (155–195 Units); adult upper and lower limb focal spasticity (up to 400 Units); cervical dystonia.',
    usualAdultDose:
      'Neurogenic detrusor overactivity: 200 Units administered as 30 intradetrusor injections of 1 mL (~6.7 Units) each. Adult upper/lower limb focal spasticity: up to 200–400 Units divided among affected muscles.',
    contraindications:
      'Hypersensitivity to botulinum toxin type A; infection at the proposed injection site(s); active UTI at time of intradetrusor treatment.',
    commonAdverseEffects:
      'Focal muscle weakness, dysphagia, eyelid ptosis, urinary tract infection, urinary retention requiring clean intermittent catheterisation (NDO), injection site pain.',
    storageConditions:
      'Store in a refrigerator (2°C to 8°C), or store in a freezer (at or below -5°C).',
    specialties: ['Neurology', 'Urology'],
    sourceTitle: 'UK EMC Official SmPC – Botox (botulinum toxin type A) 50, 100 & 200 Units',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/859/smpc',
  },
  {
    brandName: 'Duodopa 20 mg/mL + 5 mg/mL',
    brandNameAr: 'دودوبا 20 ملغ/مل + 5 ملغ/مل',
    genericName: 'Levodopa + Carbidopa',
    drugClass: 'Dopaminergic Anti-Parkinson Agents / DOPA and DOPA Derivatives (N04BA02)',
    strength: '20 mg/mL + 5 mg/mL',
    dosageForm: 'Intestinal gel',
    route: 'Intestinal (continuous jejunal infusion via PEG-J tube)',
    packSize: '7 cassettes of 100 mL (each cassette contains 2000 mg levodopa + 500 mg carbidopa)',
    approvedIndications:
      'Treatment of advanced levodopa-responsive Parkinson’s disease with severe motor fluctuations and hyperkinesia or dyskinesia when available combinations of Parkinson medicinal products have not given satisfactory results.',
    usualAdultDose:
      'Administered by continuous intestinal infusion into the duodenum or upper jejunum via a portable pump and percutaneous endoscopic gastrostomy with jejunal tube (PEG-J), composed of three individually titrated doses: morning bolus dose (typically 5–10 mL), continuous maintenance dose (typically 1–10 mL/hour over ~16 waking hours), and extra bolus doses as required.',
    contraindications:
      'Hypersensitivity to levodopa, carbidopa, or any excipient; narrow-angle glaucoma; severe heart failure; severe cardiac arrhythmia; acute stroke; non-selective MAO inhibitors and selective MAO-A inhibitors (discontinue at least 2 weeks prior); phaeochromocytoma, hyperthyroidism, Cushing’s syndrome.',
    commonAdverseEffects:
      'Dyskinesia, nausea, constipation, orthostatic hypotension, dizziness, somnolence, insomnia, hallucinations, peripheral polyneuropathy (monitor vitamin B12/B6), device/procedure-related complications (stoma site infection, tube dislocation or occlusion).',
    storageConditions:
      'Store and transport refrigerated (2°C to 8°C). Keep the cassette in the outer carton to protect from light. Use within 24 hours once removed from the refrigerator.',
    specialties: ['Neurology', 'Gastroenterology'],
    sourceTitle: 'UK EMC Official SmPC – Duodopa 20 mg/mL + 5 mg/mL Intestinal Gel',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/6231/smpc',
  },
  {
    brandName: 'Aquipta 10 mg',
    brandNameAr: 'أكويبتا 10 ملغ',
    genericName: 'Atogepant',
    drugClass: 'Calcitonin Gene-Related Peptide (CGRP) Receptor Antagonists / Gepants (N02CD07)',
    strength: '10 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month (episodic and chronic migraine).',
    usualAdultDose:
      '10 mg once daily when co-administered with strong CYP3A4 inhibitors (e.g., itraconazole, clarithromycin) or strong OATP inhibitors (e.g., rifampicin, ciclosporin), or in patients with severe renal impairment (CrCl 15–29 mL/min) or end-stage renal disease (CrCl <15 mL/min). May be taken with or without food.',
    contraindications:
      'Hypersensitivity to atogepant or to any of the excipients.',
    commonAdverseEffects:
      'Nausea, constipation, decreased appetite, fatigue, somnolence, weight decrease, transient elevation of ALT/AST.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR – Aquipta (atogepant) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aquipta',
  },
  {
    brandName: 'Aquipta 60 mg',
    brandNameAr: 'أكويبتا 60 ملغ',
    genericName: 'Atogepant',
    drugClass: 'Calcitonin Gene-Related Peptide (CGRP) Receptor Antagonists / Gepants (N02CD07)',
    strength: '60 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets',
    approvedIndications:
      'Prophylaxis of migraine in adults who have at least 4 migraine days per month (episodic and chronic migraine).',
    usualAdultDose:
      'Recommended standard adult dose: 60 mg orally once daily with or without food.',
    contraindications:
      'Hypersensitivity to atogepant or to any of the excipients.',
    commonAdverseEffects:
      'Nausea, constipation, decreased appetite, fatigue, somnolence, weight decrease, transient elevation of ALT/AST.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Neurology'],
    sourceTitle: 'EMA EPAR – Aquipta (atogepant) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/aquipta',
  },
  {
    brandName: 'Sevorane 100% v/v',
    brandNameAr: 'سيفوران 100% سائل للاستنشاق',
    genericName: 'Sevoflurane',
    drugClass: 'Halogenated Hydrocarbon Inhalation General Anaesthetics (N01AB08)',
    strength: '100% v/v',
    dosageForm: 'Inhalation vapour, liquid',
    route: 'Inhalation',
    packSize: '1 bottle (250 mL)',
    approvedIndications:
      'Induction and maintenance of general anaesthesia in adult and paediatric patients for inpatient and outpatient surgery.',
    usualAdultDose:
      'Delivered via a specifically calibrated sevoflurane vaporiser: surgical anaesthesia in adults is usually achieved with inspired concentrations of 0.5% to 3% sevoflurane with or without nitrous oxide; induction in adults and children may be achieved with up to 5%–8% sevoflurane in oxygen or oxygen/nitrous oxide.',
    contraindications:
      'Known or suspected genetic susceptibility to malignant hyperthermia; known hypersensitivity to sevoflurane or other halogenated inhalational anaesthetics; history of confirmed hepatitis or unexplained moderate-to-severe hepatic dysfunction with jaundice/fever/eosinophilia after previous halogenated anaesthetic use.',
    commonAdverseEffects:
      'Agitation/emergence delirium (especially in children), bradycardia, hypotension, tachycardia, cough, laryngospasm, respiratory depression, nausea, vomiting, shivering, malignant hyperthermia (rare).',
    storageConditions:
      'Store below 25°C. Do not refrigerate. Keep bottle cap tightly closed.',
    specialties: ['Anaesthesiology', 'Critical Care'],
    sourceTitle: 'UK EMC Official SmPC – Sevorane (sevoflurane) 100% Inhalation Vapour, Liquid',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/833/smpc',
  },
  {
    brandName: 'Maviret 100 mg/40 mg',
    brandNameAr: 'مافيريت 100 ملغ / 40 ملغ',
    genericName: 'Glecaprevir + Pibrentasvir',
    drugClass: 'Pan-Genotypic Direct-Acting Antiviral NS3/4A Protease + NS5A Inhibitors (J05AP57)',
    strength: '100 mg / 40 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '84 film-coated tablets (4 weekly cartons of 21 tablets; 3 tablets/day)',
    approvedIndications:
      'Treatment of chronic hepatitis C virus (HCV) infection (genotypes 1, 2, 3, 4, 5, and 6) in adults and adolescents/children aged 12 years and older (or weighing at least 45 kg) without cirrhosis or with compensated cirrhosis (Child-Pugh A).',
    usualAdultDose:
      'Three 100 mg/40 mg tablets (total daily dose: 300 mg glecaprevir / 120 mg pibrentasvir) taken orally once daily together with food for 8 weeks in treatment-naïve patients (without cirrhosis or with compensated cirrhosis), or 8 to 16 weeks in treatment-experienced patients depending on genotype and cirrhosis status. Swallow whole; do not chew, crush, or break.',
    contraindications:
      'Hypersensitivity to glecaprevir, pibrentasvir, or any excipient; moderate or severe hepatic impairment (Child-Pugh Class B or C) or history of prior hepatic decompensation; concomitant use with atazanavir, atorvastatin, simvastatin, dabigatran etexilate, ethinylestradiol-containing products, rifampicin, carbamazepine, phenytoin, phenobarbital, or St. John’s wort.',
    commonAdverseEffects:
      'Headache, fatigue, diarrhoea, nausea, asthenia, pruritus, transient total bilirubin elevation.',
    storageConditions:
      'This medicinal product does not require any special storage conditions.',
    specialties: ['Gastroenterology', 'Infectious Diseases', 'Internal Medicine'],
    sourceTitle: 'EMA EPAR – Maviret (glecaprevir / pibrentasvir) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/maviret',
  },

  // ===========================================================================
  // 4. OPHTHALMOLOGY & GLAUCOMA (6 PRESENTATIONS)
  // ===========================================================================
  {
    brandName: 'Ozurdex 700 micrograms',
    brandNameAr: 'أوزوردكس 700 ميكروغرام غرسة',
    genericName: 'Dexamethasone',
    drugClass: 'Intravitreal Corticosteroid Anti-Inflammatory Implants (S01BA01)',
    strength: '700 micrograms',
    dosageForm: 'Intravitreal implant in applicator',
    route: 'Intravitreal',
    packSize: '1 single-use applicator containing 1 biodegradable intravitreal implant',
    approvedIndications:
      'Treatment of adult patients with visual impairment due to diabetic macular oedema (DMO) who are pseudophakic or who are considered insufficiently responsive to, or unsuitable for, non-corticosteroid therapy; macular oedema following either branch retinal vein occlusion (BRVO) or central retinal vein occlusion (CRVO); inflammation of the posterior segment of the eye presenting as non-infectious uveitis.',
    usualAdultDose:
      'One implant (700 micrograms dexamethasone) administered intravitreally into the affected eye by a qualified ophthalmologist under aseptic conditions. Retreatment may be considered after approximately 6 months if the patient experiences decreased vision and/or increased retinal thickness.',
    contraindications:
      'Hypersensitivity to dexamethasone or any excipient; active or suspected ocular or periocular infection (including viral diseases of the cornea and conjunctiva, mycobacterial, or fungal eye infections); advanced glaucoma not adequately controlled by medicinal products alone; aphakic eyes with ruptured posterior lens capsule; eyes with Anterior Chamber Intraocular Lens (ACIOL) and ruptured posterior lens capsule.',
    commonAdverseEffects:
      'Increased intraocular pressure (ocular hypertension), cataract (nuclear, subcapsular, cortical), conjunctival haemorrhage, vitreous detachment, vitreous floaters, vitreous opacities, blepharitis, eye pain, photopsia.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Keep the foil pouch sealed until ready for use.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR – Ozurdex (dexamethasone) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozurdex',
  },
  {
    brandName: 'Ganfort 0.3 mg/mL + 5 mg/mL',
    brandNameAr: 'جانفورت 0.3 ملغ/مل + 5 ملغ/مل قطرة عين',
    genericName: 'Bimatoprost + Timolol',
    drugClass: 'Prostamide + Beta-Blocker Fixed-Combination Antiglaucoma Preparations (S01ED51)',
    strength: '0.3 mg/mL + 5 mg/mL',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic (Ocular)',
    packSize: '1 bottle (3 mL)',
    approvedIndications:
      'Reduction of intraocular pressure (IOP) in adult patients with open-angle glaucoma or ocular hypertension who are insufficiently responsive to topical beta-blockers or prostaglandin analogues.',
    usualAdultDose:
      'One drop in the affected eye(s) once daily, administered either in the morning or in the evening at the same time each day.',
    contraindications:
      'Hypersensitivity to bimatoprost, timolol, or any excipient; reactive airway disease including bronchial asthma or a history of bronchial asthma, and severe chronic obstructive pulmonary disease (COPD); sinus bradycardia, sick sinus syndrome, sino-atrial block, second- or third-degree AV block not controlled with a pacemaker, overt cardiac failure, or cardiogenic shock.',
    commonAdverseEffects:
      'Conjunctival hyperaemia, growth of eyelashes, superficial punctate keratitis, eye pruritus, ocular burning/stinging, dry eye, iris hyperpigmentation, periocular skin hyperpigmentation, periorbital fat atrophy.',
    storageConditions:
      'This medicinal product does not require any special temperature storage conditions. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR – Ganfort (bimatoprost / timolol) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ganfort',
  },
  {
    brandName: 'Lumigan 0.1 mg/mL',
    brandNameAr: 'لوميجان 0.1 ملغ/مل قطرة عين',
    genericName: 'Bimatoprost',
    drugClass: 'Prostaglandin / Prostamide Analogues for Glaucoma (S01EE03)',
    strength: '0.1 mg/mL (0.01% w/v)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic (Ocular)',
    packSize: '1 bottle (3 mL)',
    approvedIndications:
      'Reduction of elevated intraocular pressure in chronic open-angle glaucoma and ocular hypertension in adults (as monotherapy or as adjunctive therapy to beta-blockers).',
    usualAdultDose:
      'One drop in the affected eye(s) once daily, administered in the evening. Do not exceed once-daily administration as more frequent administration may lessen the IOP-lowering effect.',
    contraindications:
      'Hypersensitivity to bimatoprost or any excipient (including benzalkonium chloride in patients with prior suspected benzalkonium-induced corneal toxicity).',
    commonAdverseEffects:
      'Conjunctival hyperaemia, growth of eyelashes, ocular pruritus, punctate keratitis, eye irritation, dry eye, periocular skin hyperpigmentation, iris hyperpigmentation, prostaglandin-associated periorbitopathy.',
    storageConditions:
      'Do not store above 25°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR – Lumigan (bimatoprost) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lumigan',
  },
  {
    brandName: 'Lumigan 0.3 mg/mL',
    brandNameAr: 'لوميجان 0.3 ملغ/مل قطرة عين',
    genericName: 'Bimatoprost',
    drugClass: 'Prostaglandin / Prostamide Analogues for Glaucoma (S01EE03)',
    strength: '0.3 mg/mL (0.03% w/v)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic (Ocular)',
    packSize: '1 bottle (3 mL)',
    approvedIndications:
      'Reduction of elevated intraocular pressure in chronic open-angle glaucoma and ocular hypertension in adults (as monotherapy or as adjunctive therapy to beta-blockers).',
    usualAdultDose:
      'One drop in the affected eye(s) once daily, administered in the evening.',
    contraindications:
      'Hypersensitivity to bimatoprost or any excipient.',
    commonAdverseEffects:
      'Conjunctival hyperaemia, growth of eyelashes, ocular pruritus, dry eye, visual disturbance, ocular burning, foreign body sensation, iris and periocular skin hyperpigmentation.',
    storageConditions:
      'Do not store above 25°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'EMA EPAR – Lumigan (bimatoprost) Summary of Product Characteristics',
    sourceUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/lumigan',
  },
  {
    brandName: 'Combigan 2 mg/mL + 5 mg/mL',
    brandNameAr: 'كومبيغان 2 ملغ/مل + 5 ملغ/مل قطرة عين',
    genericName: 'Brimonidine + Timolol',
    drugClass: 'Alpha-2 Adrenergic Agonist + Beta-Blocker Antiglaucoma Preparations (S01ED51)',
    strength: '2 mg/mL + 5 mg/mL',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic (Ocular)',
    packSize: '1 bottle (5 mL)',
    approvedIndications:
      'Reduction of intraocular pressure (IOP) in patients with chronic open-angle glaucoma or ocular hypertension who are insufficiently responsive to topical beta-blockers.',
    usualAdultDose:
      'One drop in the affected eye(s) twice daily approximately 12 hours apart. Apply nasolacrimal occlusion or close the eyelids for 2 minutes to reduce systemic absorption.',
    contraindications:
      'Hypersensitivity to brimonidine, timolol, or any excipient; reactive airway disease including bronchial asthma or severe COPD; sinus bradycardia, sick sinus syndrome, sino-atrial block, second- or third-degree AV block not controlled with a pacemaker, overt cardiac failure, cardiogenic shock; neonates and infants (<2 years of age); patients receiving monoamine oxidase (MAO) inhibitor therapy or antidepressants affecting noradrenergic transmission (e.g., tricyclic antidepressants, mianserin).',
    commonAdverseEffects:
      'Conjunctival hyperaemia, burning and stinging sensation in the eye, allergic conjunctivitis, corneal erosion, superficial punctate keratitis, eye pruritus, visual disturbance, dry mouth, somnolence, headache.',
    storageConditions:
      'Keep the bottle in the outer carton to protect from light. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'UK EMC Official SmPC – Combigan 2 mg/mL + 5 mg/mL Eye Drops, Solution',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/3909/smpc',
  },
  {
    brandName: 'Alphagan 2 mg/mL',
    brandNameAr: 'ألفاغان 2 ملغ/مل قطرة عين',
    genericName: 'Brimonidine',
    drugClass: 'Selective Alpha-2 Adrenergic Receptor Agonist Antiglaucoma Preparations (S01EA05)',
    strength: '2 mg/mL (0.2% w/v)',
    dosageForm: 'Eye drops, solution',
    route: 'Ophthalmic (Ocular)',
    packSize: '1 bottle (5 mL)',
    approvedIndications:
      'Reduction of elevated intraocular pressure (IOP) in patients with open-angle glaucoma or ocular hypertension: as monotherapy in patients in whom topical beta-blocker therapy is contraindicated, or as adjunctive therapy to other IOP-lowering medications when the target IOP is not achieved with a single agent.',
    usualAdultDose:
      'One drop in the affected eye(s) twice daily, approximately 12 hours apart.',
    contraindications:
      'Hypersensitivity to brimonidine or any excipient; neonates and infants (<2 years of age); patients receiving monoamine oxidase (MAO) inhibitor therapy and patients on antidepressants which affect noradrenergic transmission (e.g., tricyclic antidepressants and mianserin).',
    commonAdverseEffects:
      'Ocular hyperaemia, ocular burning/stinging, allergic blepharitis/blepharoconjunctivitis/conjunctivitis, blurred vision, follicular conjunctivitis, ocular pruritus, dry mouth, headache, fatigue, somnolence.',
    storageConditions:
      'Do not store above 25°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology'],
    sourceTitle: 'UK EMC Official SmPC – Alphagan 0.2% w/v (2 mg/mL) Eye Drops, Solution',
    sourceUrl: 'https://www.medicines.org.uk/emc/product/856/smpc',
  },
];

export const ABBVIE_PRODUCTS: AiProductDraft[] =
  ABBVIE_COMPACT_PRODUCTS.map(toAbbvieProductDraft);
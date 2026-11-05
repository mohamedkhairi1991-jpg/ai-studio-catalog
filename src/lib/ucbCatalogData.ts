import type { AiProductDraft } from './catalog';

// UCB products marketed in Iraq. Clinical text follows the EU (EMA EPAR) or UK (eMC) SmPC.
// Sources are exact EMA EPAR pages or eMC search pages only (no guessed product numbers).

interface UcbMolecule {
  genericName: string;
  drugClass: string;
  indications: string;
  adultDosage: string;
  contraindications: string;
  sideEffects: string;
  storageConditions: string;
  specialties: string[];
  sourceTitle: string;
  sourceUrl: string;
}

interface UcbPresentation {
  brandName: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  molecule: UcbMolecule;
  adultDosage?: string;
  storageConditions?: string;
  specialties?: string[];
}

const EPAR = (slug: string) => `https://www.ema.europa.eu/en/medicines/human/EPAR/${slug}`;
const EMC = (brand: string) => `https://www.medicines.org.uk/emc/search?q=${encodeURIComponent(brand)}`;

const LEVETIRACETAM: UcbMolecule = {
  genericName: 'Levetiracetam',
  drugClass: 'Antiepileptic (pyrrolidone derivative, SV2A ligand)',
  indications:
    'Monotherapy of partial-onset seizures with or without secondary generalisation in adults and adolescents from 16 years with newly diagnosed epilepsy. Adjunctive therapy of partial-onset seizures in adults, adolescents, children and infants from 1 month; of myoclonic seizures in juvenile myoclonic epilepsy (from 12 years); and of primary generalised tonic-clonic seizures in idiopathic generalised epilepsy (from 12 years).',
  adultDosage:
    'Monotherapy: start 250 mg twice daily, increase to 500 mg twice daily after 2 weeks; may increase by 250 mg twice daily every 2 weeks up to 1,500 mg twice daily. Adjunctive therapy: start 500 mg twice daily; may increase by 500 mg twice daily every 2–4 weeks up to 1,500 mg twice daily. Reduce the dose in renal impairment.',
  contraindications: 'Hypersensitivity to levetiracetam, other pyrrolidone derivatives or any excipient.',
  sideEffects:
    'Nasopharyngitis, somnolence, headache, fatigue, dizziness; also anorexia, depression, anxiety, insomnia, irritability, aggression, tremor, vertigo, cough, abdominal pain, nausea, diarrhoea, rash. Monitor for mood changes and suicidal thoughts.',
  storageConditions: 'This medicine does not require any special storage conditions.',
  specialties: ['Neurology', 'Pediatrics'],
  sourceTitle: 'Keppra (levetiracetam) — EMA EPAR product information (UCB Pharma)',
  sourceUrl: EPAR('keppra'),
};

const LACOSAMIDE: UcbMolecule = {
  genericName: 'Lacosamide',
  drugClass: 'Antiepileptic (functionalised amino acid, sodium-channel slow-inactivation enhancer)',
  indications:
    'Monotherapy and adjunctive therapy of partial-onset seizures with or without secondary generalisation in adults, adolescents and children from 2 years. Adjunctive therapy of primary generalised tonic-clonic seizures in patients from 4 years with idiopathic generalised epilepsy.',
  adultDosage:
    'Adults and patients weighing 50 kg or more, twice daily. Monotherapy: start 50 mg twice daily, increase to 100 mg twice daily after 1 week; then by 50 mg twice daily each week up to 300 mg twice daily. Adjunctive therapy: start 50 mg twice daily, increase to 100 mg twice daily after 1 week; then by 50 mg twice daily each week up to 200 mg twice daily. A 200 mg loading dose may be used under medical supervision.',
  contraindications: 'Hypersensitivity to lacosamide or any excipient; known second- or third-degree atrioventricular (AV) block.',
  sideEffects:
    'Dizziness, headache, diplopia, nausea; also somnolence, balance and coordination problems, tremor, nystagmus, blurred vision, vertigo, vomiting, constipation, pruritus, fatigue, falls. Dose-related PR-interval prolongation; caution in conduction disorders.',
  storageConditions: 'This medicine does not require any special storage conditions.',
  specialties: ['Neurology', 'Pediatrics'],
  sourceTitle: 'Vimpat (lacosamide) — EMA EPAR product information (UCB Pharma)',
  sourceUrl: EPAR('vimpat'),
};

const BRIVARACETAM: UcbMolecule = {
  genericName: 'Brivaracetam',
  drugClass: 'Antiepileptic (pyrrolidone derivative, SV2A ligand)',
  indications:
    'Adjunctive therapy of partial-onset seizures with or without secondary generalisation in adults, adolescents and children with epilepsy.',
  adultDosage:
    'Start 50 mg/day or 100 mg/day, given in two equal doses (morning and evening). The dose may be adjusted between 50 mg/day and 200 mg/day according to response and tolerability. Can be started without titration when switching from levetiracetam as directed by the prescriber.',
  contraindications: 'Hypersensitivity to brivaracetam, other pyrrolidone derivatives or any excipient.',
  sideEffects:
    'Somnolence, dizziness, fatigue, vertigo; also decreased appetite, depression, anxiety, insomnia, irritability, nausea, vomiting, constipation, upper respiratory infections, cough. Monitor for mood changes and suicidal thoughts.',
  storageConditions: 'This medicine does not require any special storage conditions.',
  specialties: ['Neurology'],
  sourceTitle: 'Briviact (brivaracetam) — EMA EPAR product information (UCB Pharma)',
  sourceUrl: EPAR('briviact'),
};

const ROTIGOTINE: UcbMolecule = {
  genericName: 'Rotigotine',
  drugClass: 'Non-ergot dopamine agonist (transdermal)',
  indications:
    "Early-stage idiopathic Parkinson's disease as monotherapy (without levodopa), or in combination with levodopa over the course of the disease including late stages when levodopa effect wears off or fluctuates.",
  adultDosage:
    'Apply one patch once daily to clean, dry, intact skin, rotating sites. Early-stage disease: start 2 mg/24 h, increase by 2 mg/24 h each week to the effective dose, up to 8 mg/24 h. Advanced disease: start 4 mg/24 h, increase by 2 mg/24 h each week, up to 16 mg/24 h. Withdraw gradually.',
  contraindications:
    'Hypersensitivity to rotigotine or any excipient. Remove the patch before magnetic resonance imaging (MRI) or cardioversion, because the backing layer contains aluminium.',
  sideEffects:
    'Nausea, vomiting, application-site reactions, somnolence, dizziness, headache; also insomnia, sudden onset of sleep, hallucinations, impulse control disorders, orthostatic hypotension, peripheral oedema.',
  storageConditions: 'Do not store above 30 °C. Store in the original package.',
  specialties: ['Neurology', 'Geriatrics'],
  sourceTitle: 'Neupro (rotigotine) — EMA EPAR product information (UCB Pharma)',
  sourceUrl: EPAR('neupro'),
};

const CERTOLIZUMAB: UcbMolecule = {
  genericName: 'Certolizumab pegol',
  drugClass: 'TNF-alpha inhibitor (PEGylated Fab′ fragment)',
  indications:
    'Moderate to severe active rheumatoid arthritis (with methotrexate, or alone when methotrexate is not suitable); severe active ankylosing spondylitis and non-radiographic axial spondyloarthritis; active psoriatic arthritis; moderate to severe plaque psoriasis in adults who are candidates for systemic therapy.',
  adultDosage:
    'Subcutaneous injection. Loading dose 400 mg (two 200 mg injections) at weeks 0, 2 and 4, then 200 mg every 2 weeks. In rheumatoid arthritis, psoriatic arthritis and axial spondyloarthritis, 400 mg every 4 weeks may be used once response is confirmed. Screen for tuberculosis and hepatitis B before starting.',
  contraindications:
    'Hypersensitivity to certolizumab pegol or any excipient; active tuberculosis or other severe infections such as sepsis or opportunistic infections; moderate to severe heart failure (NYHA class III/IV).',
  sideEffects:
    'Bacterial and viral infections (including upper respiratory tract infections and herpes), leukopenia, headache, hypertension, nausea, raised liver enzymes, rash, injection-site reactions, fever. Serious infections, tuberculosis reactivation and malignancy have been reported.',
  storageConditions:
    'Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light. May be kept at up to 25 °C for a single period of up to 10 days.',
  specialties: ['Rheumatology', 'Dermatology', 'Immunology'],
  sourceTitle: 'Cimzia (certolizumab pegol) — EMA EPAR product information (UCB Pharma)',
  sourceUrl: EPAR('cimzia'),
};

const LEVOCETIRIZINE: UcbMolecule = {
  genericName: 'Levocetirizine dihydrochloride',
  drugClass: 'Second-generation H1 antihistamine',
  indications:
    'Symptomatic treatment of allergic rhinitis (including persistent allergic rhinitis) and urticaria in adults and children from 6 years.',
  adultDosage: '5 mg once daily, with or without food. Adjust the dosing interval in renal impairment.',
  contraindications:
    'Hypersensitivity to levocetirizine, cetirizine, hydroxyzine, any piperazine derivative or any excipient; severe renal impairment (creatinine clearance below 10 mL/min).',
  sideEffects: 'Somnolence, headache, dry mouth, fatigue; also pharyngitis, abdominal pain, asthenia.',
  storageConditions: 'This medicine does not require any special storage conditions.',
  specialties: ['Allergy & Immunology', 'Dermatology', 'ENT (Otolaryngology)', 'General Practice / Family Medicine'],
  sourceTitle: 'Xyzal (levocetirizine) — UK eMC SmPC search (UCB Pharma)',
  sourceUrl: EMC('Xyzal'),
};

const PIRACETAM: UcbMolecule = {
  genericName: 'Piracetam',
  drugClass: 'Nootropic (pyrrolidone derivative)',
  indications:
    'Adjunctive treatment of myoclonus of cortical origin, regardless of cause, alone or with other anti-myoclonic medicines (UK-approved indication; other uses are not approved in all countries).',
  adultDosage:
    'Start 7.2 g/day, increase by 4.8 g/day every 3–4 days up to a maximum of 24 g/day, in 2 or 3 divided doses. Adjust the dose in renal impairment. Withdraw gradually.',
  contraindications:
    "Hypersensitivity to piracetam, other pyrrolidone derivatives or any excipient; cerebral haemorrhage; end-stage renal disease; Huntington's chorea.",
  sideEffects: 'Nervousness, hyperkinesia, weight increase; less often somnolence, depression, asthenia.',
  storageConditions: 'This medicine does not require any special storage conditions.',
  specialties: ['Neurology', 'Geriatrics'],
  sourceTitle: 'Nootropil (piracetam) — UK eMC SmPC search (UCB Pharma)',
  sourceUrl: EMC('Nootropil'),
};

const TABLET = 'Film-coated tablet';
const VARIES = 'Pack size varies by market';

const UCB_PRESENTATIONS: UcbPresentation[] = [
  { brandName: 'Keppra 250 mg', strength: '250 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 60 tablets)`, molecule: LEVETIRACETAM },
  { brandName: 'Keppra 500 mg', strength: '500 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 60 tablets)`, molecule: LEVETIRACETAM },
  { brandName: 'Keppra 1000 mg', strength: '1000 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 60 tablets)`, molecule: LEVETIRACETAM },
  {
    brandName: 'Keppra 100 mg/mL Oral Solution',
    strength: '100 mg/mL',
    dosageForm: 'Oral solution',
    route: 'Oral',
    packSize: '300 mL bottle with oral dosing syringe',
    molecule: LEVETIRACETAM,
    adultDosage:
      'Adults: as for Keppra tablets (500–1,500 mg twice daily). Infants 1–6 months: start 7 mg/kg twice daily, up to 21 mg/kg twice daily. Children from 6 months under 50 kg: start 10 mg/kg twice daily, up to 30 mg/kg twice daily. Measure with the supplied syringe.',
    storageConditions: 'Store in the original bottle to protect from light. Use within 7 months of first opening.',
  },
  {
    brandName: 'Keppra 100 mg/mL Concentrate for Infusion',
    strength: '500 mg/5 mL',
    dosageForm: 'Concentrate for solution for infusion',
    route: 'Intravenous',
    packSize: '5 mL vials',
    molecule: LEVETIRACETAM,
    adultDosage:
      'Used when oral treatment is temporarily not possible. Same total daily dose and frequency as oral treatment (500–1,500 mg twice daily). Dilute in at least 100 mL of a compatible diluent and infuse over 15 minutes.',
    storageConditions: 'No special storage conditions. Use the diluted solution immediately (chemically stable for 24 hours at 15–25 °C).',
    specialties: ['Neurology', 'Emergency Medicine', 'Critical Care'],
  },
  { brandName: 'Vimpat 50 mg', strength: '50 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 14 tablets)`, molecule: LACOSAMIDE },
  { brandName: 'Vimpat 100 mg', strength: '100 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 56 tablets)`, molecule: LACOSAMIDE },
  { brandName: 'Vimpat 150 mg', strength: '150 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 56 tablets)`, molecule: LACOSAMIDE },
  { brandName: 'Vimpat 200 mg', strength: '200 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 56 tablets)`, molecule: LACOSAMIDE },
  {
    brandName: 'Vimpat 10 mg/mL Syrup',
    strength: '10 mg/mL',
    dosageForm: 'Syrup',
    route: 'Oral',
    packSize: '200 mL bottle with measuring cup',
    molecule: LACOSAMIDE,
    adultDosage:
      'Adults and patients 50 kg or more: as for Vimpat tablets. Children from 2 years under 50 kg: weight-based twice-daily dosing as in the SmPC (start 1 mg/kg twice daily, increase weekly).',
    storageConditions: 'Do not refrigerate. Use within 6 months of first opening.',
  },
  {
    brandName: 'Vimpat 10 mg/mL Solution for Infusion',
    strength: '200 mg/20 mL',
    dosageForm: 'Solution for infusion',
    route: 'Intravenous',
    packSize: '20 mL vial',
    molecule: LACOSAMIDE,
    adultDosage:
      'Used when oral treatment is temporarily not possible. Same dose and twice-daily frequency as oral treatment, infused over 15–60 minutes.',
    specialties: ['Neurology', 'Emergency Medicine', 'Critical Care'],
  },
  { brandName: 'Briviact 50 mg', strength: '50 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 56 tablets)`, molecule: BRIVARACETAM },
  { brandName: 'Briviact 100 mg', strength: '100 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 56 tablets)`, molecule: BRIVARACETAM },
  { brandName: 'Neupro 2 mg/24 h', strength: '2 mg/24 h', dosageForm: 'Transdermal patch', route: 'Transdermal', packSize: '28 patches', molecule: ROTIGOTINE },
  { brandName: 'Neupro 4 mg/24 h', strength: '4 mg/24 h', dosageForm: 'Transdermal patch', route: 'Transdermal', packSize: '28 patches', molecule: ROTIGOTINE },
  { brandName: 'Neupro 6 mg/24 h', strength: '6 mg/24 h', dosageForm: 'Transdermal patch', route: 'Transdermal', packSize: '28 patches', molecule: ROTIGOTINE },
  { brandName: 'Neupro 8 mg/24 h', strength: '8 mg/24 h', dosageForm: 'Transdermal patch', route: 'Transdermal', packSize: '28 patches', molecule: ROTIGOTINE },
  {
    brandName: 'Cimzia 200 mg Pre-filled Syringe',
    strength: '200 mg/mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: '2 pre-filled syringes',
    molecule: CERTOLIZUMAB,
  },
  { brandName: 'Xyzal 5 mg', strength: '5 mg', dosageForm: TABLET, route: 'Oral', packSize: `${VARIES} (e.g. 10 or 30 tablets)`, molecule: LEVOCETIRIZINE },
  { brandName: 'Nootropil 800 mg', strength: '800 mg', dosageForm: TABLET, route: 'Oral', packSize: VARIES, molecule: PIRACETAM },
  { brandName: 'Nootropil 1200 mg', strength: '1200 mg', dosageForm: TABLET, route: 'Oral', packSize: VARIES, molecule: PIRACETAM },
];

function toUcbProductDraft(item: UcbPresentation): AiProductDraft {
  const m = item.molecule;
  return {
    found: true,
    brandName: item.brandName,
    category: 'prescription_drug',
    genericName: m.genericName,
    activeIngredients: [m.genericName],
    drugClass: m.drugClass,
    strength: item.strength,
    dosageForm: item.dosageForm,
    route: item.route,
    packSize: item.packSize,
    clinical: {
      approvedIndications: m.indications,
      usualAdultDose: item.adultDosage ?? m.adultDosage,
      contraindications: m.contraindications,
      commonAdverseEffects: m.sideEffects,
      storageConditions: item.storageConditions ?? m.storageConditions,
    },
    specialties: item.specialties ?? m.specialties,
    sources: [{ title: m.sourceTitle, url: m.sourceUrl }],
    notes: 'UCB product marketed in Iraq; clinical text from the EU (EMA EPAR) or UK (eMC) SmPC. Check the local leaflet.',
  };
}

export const UCB_PRODUCTS: AiProductDraft[] = UCB_PRESENTATIONS.map(toUcbProductDraft);
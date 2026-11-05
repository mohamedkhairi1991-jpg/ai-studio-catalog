import type { AiProductDraft } from './catalog';

// Iraq essentials, batch 1 (2026-11-06): well-known Iraq-marketed brands for generic
// medicines on the Iraqi National Master List (NBSD) that Pharmaty did not have yet.
// Grouped by company name as stored in Supabase. Loaded directly with
// admin_save_ai_product_draft; not listed in CHAT_CURATED_COMPANIES so companies are
// not duplicated in the curated list. Sources are UK eMC / DailyMed search pages or
// the maker's listing; clinical text follows the reference SmPC/label.
export const IRAQ_ESSENTIALS_BATCH_1: Record<string, AiProductDraft[]> = {
  "Haleon": [
    {
      "found": true,
      "brandName": "Panadol 500 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Paracetamol",
      "activeIngredients": [
        "Paracetamol"
      ],
      "drugClass": "Analgesic and antipyretic",
      "strength": "500 mg",
      "dosageForm": "Film-coated tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Mild to moderate pain (headache, migraine, toothache, period pain, back and muscle pain, sore throat) and fever.",
        "usualAdultDose": "Adults and adolescents from 16 years: 500 mg–1 g every 4–6 hours as needed; maximum 4 g (8 tablets) in 24 hours. Do not take with other paracetamol-containing products.",
        "contraindications": "Hypersensitivity to paracetamol or any excipient. Use with care in liver or kidney impairment, chronic alcohol use and low body weight.",
        "commonAdverseEffects": "Rare at usual doses: hypersensitivity reactions and rash, very rarely blood disorders or serious skin reactions. Overdose can cause severe, delayed liver damage.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "General Practice / Family Medicine",
        "Internal Medicine"
      ],
      "sources": [
        {
          "title": "Panadol (paracetamol) — UK eMC SmPC search (Haleon)",
          "url": "https://www.medicines.org.uk/emc/search?q=Panadol"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Panadol Extra Tablets",
      "category": "prescription_drug",
      "genericName": "Paracetamol + Caffeine",
      "activeIngredients": [
        "Paracetamol",
        "Caffeine"
      ],
      "drugClass": "Analgesic and antipyretic (with caffeine)",
      "strength": "500 mg / 65 mg",
      "dosageForm": "Film-coated tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Mild to moderate pain (headache, migraine, toothache, period pain, back and muscle pain, sore throat) and fever.",
        "usualAdultDose": "Adults and adolescents from 16 years: 2 tablets up to 4 times a day, at least 4 hours apart; maximum 8 tablets in 24 hours. Limit other caffeine intake.",
        "contraindications": "Hypersensitivity to paracetamol or any excipient. Use with care in liver or kidney impairment, chronic alcohol use and low body weight.",
        "commonAdverseEffects": "Rare at usual doses: hypersensitivity reactions and rash, very rarely blood disorders or serious skin reactions. Overdose can cause severe, delayed liver damage. Caffeine may cause nervousness, insomnia, restlessness and palpitations.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "General Practice / Family Medicine",
        "Internal Medicine"
      ],
      "sources": [
        {
          "title": "Panadol Extra (paracetamol + caffeine) — UK eMC SmPC search (Haleon)",
          "url": "https://www.medicines.org.uk/emc/search?q=Panadol%20Extra"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Otrivin 0.1% Nasal Spray",
      "category": "prescription_drug",
      "genericName": "Xylometazoline hydrochloride",
      "activeIngredients": [
        "Xylometazoline hydrochloride"
      ],
      "drugClass": "Nasal decongestant (alpha-adrenergic agonist)",
      "strength": "1 mg/mL (0.1%)",
      "dosageForm": "Nasal spray, solution",
      "route": "Nasal",
      "packSize": "10 mL spray bottle",
      "clinical": {
        "approvedIndications": "Short-term relief of nasal congestion in colds, sinusitis and allergic rhinitis.",
        "usualAdultDose": "Adults and children from 12 years: 1 spray into each nostril 1–3 times daily. Do not use for more than 7 days in a row.",
        "contraindications": "Hypersensitivity to xylometazoline or any excipient; dry or atrophic rhinitis (rhinitis sicca); after trans-sphenoidal hypophysectomy or other surgery exposing the dura mater; children under 12 years (0.1% strength).",
        "commonAdverseEffects": "Local burning, dryness, sneezing, headache, nausea. Rebound congestion (rhinitis medicamentosa) with prolonged use. Use with caution in hypertension, heart disease, hyperthyroidism and narrow-angle glaucoma.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "ENT (Otolaryngology)",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Otrivine (xylometazoline) — UK eMC SmPC search (Haleon)",
          "url": "https://www.medicines.org.uk/emc/search?q=Otrivine"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Julphar": [
    {
      "found": true,
      "brandName": "Adol 500 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Paracetamol",
      "activeIngredients": [
        "Paracetamol"
      ],
      "drugClass": "Analgesic and antipyretic",
      "strength": "500 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Mild to moderate pain (headache, migraine, toothache, period pain, back and muscle pain, sore throat) and fever.",
        "usualAdultDose": "Adults and children over 12 years: 500 mg–1 g every 4–6 hours as needed; maximum 4 g in 24 hours.",
        "contraindications": "Hypersensitivity to paracetamol or any excipient. Use with care in liver or kidney impairment, chronic alcohol use and low body weight.",
        "commonAdverseEffects": "Rare at usual doses: hypersensitivity reactions and rash, very rarely blood disorders or serious skin reactions. Overdose can cause severe, delayed liver damage.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "General Practice / Family Medicine",
        "Internal Medicine"
      ],
      "sources": [
        {
          "title": "Adol (paracetamol) — Julphar product listing (CPHI)",
          "url": "https://www.cphi-online.com/product/adol/"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Adol 120 mg/5 mL Suspension",
      "category": "prescription_drug",
      "genericName": "Paracetamol",
      "activeIngredients": [
        "Paracetamol"
      ],
      "drugClass": "Analgesic and antipyretic",
      "strength": "120 mg/5 mL",
      "dosageForm": "Oral suspension",
      "route": "Oral",
      "packSize": "100 mL bottle",
      "clinical": {
        "approvedIndications": "Fever and mild to moderate pain in infants and children (teething, colds and flu, headache, earache, after vaccination).",
        "usualAdultDose": "Paediatric medicine, not for adults. Children: 10–15 mg/kg every 4–6 hours, no more than 4 doses (60 mg/kg) in 24 hours. Follow the age and weight table on the pack and use the measuring device supplied.",
        "contraindications": "Hypersensitivity to paracetamol or any excipient. Use with care in liver or kidney impairment, chronic alcohol use and low body weight.",
        "commonAdverseEffects": "Rare at usual doses: hypersensitivity reactions and rash, very rarely blood disorders or serious skin reactions. Overdose can cause severe, delayed liver damage.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Pediatrics",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Adol (paracetamol) — Julphar product listing (CPHI)",
          "url": "https://www.cphi-online.com/product/adol/"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Grünenthal": [
    {
      "found": true,
      "brandName": "Tramal 50 mg Capsules",
      "category": "prescription_drug",
      "genericName": "Tramadol hydrochloride",
      "activeIngredients": [
        "Tramadol hydrochloride"
      ],
      "drugClass": "Opioid analgesic",
      "strength": "50 mg",
      "dosageForm": "Capsule, hard",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Moderate to severe pain.",
        "usualAdultDose": "Adults and adolescents from 12 years: 50–100 mg every 4–6 hours; maximum 400 mg per day. Use the lowest effective dose for the shortest time; longer intervals in renal or hepatic impairment and in the elderly.",
        "contraindications": "Hypersensitivity to tramadol or any excipient; acute intoxication with alcohol, hypnotics, analgesics, opioids or psychotropic medicines; use with or within 14 days of MAO inhibitors; epilepsy not controlled by treatment; not for narcotic withdrawal treatment.",
        "commonAdverseEffects": "Nausea, dizziness, vomiting, constipation, sweating, dry mouth, headache, somnolence. Risk of seizures, serotonin syndrome, respiratory depression (especially with benzodiazepines or other CNS depressants), dependence and misuse.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "General Practice / Family Medicine",
        "Orthopedics",
        "Anesthesiology",
        "Internal Medicine"
      ],
      "sources": [
        {
          "title": "Tramadol 50 mg capsules — reference SmPC, UK eMC search",
          "url": "https://www.medicines.org.uk/emc/search?q=tramadol%2050mg%20capsules"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Tramal 100 mg/2 mL Injection",
      "category": "prescription_drug",
      "genericName": "Tramadol hydrochloride",
      "activeIngredients": [
        "Tramadol hydrochloride"
      ],
      "drugClass": "Opioid analgesic",
      "strength": "100 mg/2 mL",
      "dosageForm": "Solution for injection",
      "route": "Intravenous / intramuscular / subcutaneous",
      "packSize": "2 mL ampoules",
      "clinical": {
        "approvedIndications": "Moderate to severe pain, including postoperative pain.",
        "usualAdultDose": "Adults: 50–100 mg every 4–6 hours by IM or SC injection, or by slow IV injection over 2–3 minutes or infusion; maximum 400 mg per day.",
        "contraindications": "Hypersensitivity to tramadol or any excipient; acute intoxication with alcohol, hypnotics, analgesics, opioids or psychotropic medicines; use with or within 14 days of MAO inhibitors; epilepsy not controlled by treatment; not for narcotic withdrawal treatment.",
        "commonAdverseEffects": "Nausea, dizziness, vomiting, constipation, sweating, dry mouth, headache, somnolence. Risk of seizures, serotonin syndrome, respiratory depression (especially with benzodiazepines or other CNS depressants), dependence and misuse.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Anesthesiology",
        "Emergency Medicine",
        "General Surgery"
      ],
      "sources": [
        {
          "title": "Tramadol injection — reference SmPC, UK eMC search",
          "url": "https://www.medicines.org.uk/emc/search?q=tramadol%20injection"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Aspen": [
    {
      "found": true,
      "brandName": "Lanoxin 250 microgram Tablets",
      "category": "prescription_drug",
      "genericName": "Digoxin",
      "activeIngredients": [
        "Digoxin"
      ],
      "drugClass": "Cardiac glycoside",
      "strength": "250 micrograms",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Heart failure (particularly with atrial fibrillation) and supraventricular arrhythmias, especially control of ventricular rate in atrial fibrillation or flutter.",
        "usualAdultDose": "Dose is individual. Usual maintenance 125–250 micrograms once daily, adjusted to renal function, age, body weight and plasma levels; a loading dose may be given as directed. Lower doses in the elderly and in renal impairment.",
        "contraindications": "Intermittent complete heart block or second-degree AV block; supraventricular arrhythmias caused by Wolff-Parkinson-White syndrome; ventricular tachycardia or fibrillation; hypertrophic obstructive cardiomyopathy (unless with atrial fibrillation and heart failure); hypersensitivity.",
        "commonAdverseEffects": "Nausea, vomiting, diarrhoea, dizziness, visual disturbances (blurred or yellow vision), arrhythmias and conduction disturbances, confusion. Toxicity is more likely with hypokalaemia, hypomagnesaemia, hypercalcaemia and renal impairment.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Cardiology",
        "Internal Medicine",
        "Geriatrics"
      ],
      "sources": [
        {
          "title": "Lanoxin (digoxin) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Lanoxin"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Imuran 50 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Azathioprine",
      "activeIngredients": [
        "Azathioprine"
      ],
      "drugClass": "Immunosuppressant (purine antimetabolite)",
      "strength": "50 mg",
      "dosageForm": "Film-coated tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "With other medicines to prevent rejection after organ transplantation; and in severe rheumatoid arthritis, systemic lupus erythematosus, dermatomyositis/polymyositis, autoimmune hepatitis, inflammatory bowel disease and other autoimmune conditions.",
        "usualAdultDose": "Transplantation: up to 5 mg/kg on day 1, then 1–4 mg/kg/day. Other conditions: usually 1–3 mg/kg/day. Check TPMT activity before starting where possible and monitor blood counts and liver tests regularly. Reduce to one quarter of the dose with allopurinol.",
        "contraindications": "Hypersensitivity to azathioprine, mercaptopurine or any excipient.",
        "commonAdverseEffects": "Bone marrow suppression (leucopenia, thrombocytopenia), infections, nausea, liver toxicity, pancreatitis, hypersensitivity reactions. Increased risk of skin cancer and lymphoma with long-term use; avoid live vaccines.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Rheumatology",
        "Gastroenterology",
        "Nephrology",
        "Immunology"
      ],
      "sources": [
        {
          "title": "Imuran (azathioprine) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Imuran"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Zyloric 100 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Allopurinol",
      "activeIngredients": [
        "Allopurinol"
      ],
      "drugClass": "Xanthine oxidase inhibitor",
      "strength": "100 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Chronic gout (prevention of attacks), hyperuricaemia, urate and uric acid kidney stones, and prevention of uric acid nephropathy during cancer treatment.",
        "usualAdultDose": "Start 100 mg once daily after food; increase by 100 mg every 1–3 weeks according to serum urate. Usual dose 200–600 mg daily; maximum 900 mg daily in divided doses. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to allopurinol or any excipient.",
        "commonAdverseEffects": "Rash (stop at the first sign: risk of severe skin reactions such as SJS/TEN and DRESS, higher with HLA-B*5801), gout flares when starting, nausea, raised liver enzymes.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Rheumatology",
        "Internal Medicine",
        "Nephrology"
      ],
      "sources": [
        {
          "title": "Zyloric (allopurinol) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Zyloric"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Zyloric 300 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Allopurinol",
      "activeIngredients": [
        "Allopurinol"
      ],
      "drugClass": "Xanthine oxidase inhibitor",
      "strength": "300 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Chronic gout (prevention of attacks), hyperuricaemia, urate and uric acid kidney stones, and prevention of uric acid nephropathy during cancer treatment.",
        "usualAdultDose": "Start 100 mg once daily after food; increase by 100 mg every 1–3 weeks according to serum urate. Usual dose 200–600 mg daily; maximum 900 mg daily in divided doses. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to allopurinol or any excipient.",
        "commonAdverseEffects": "Rash (stop at the first sign: risk of severe skin reactions such as SJS/TEN and DRESS, higher with HLA-B*5801), gout flares when starting, nausea, raised liver enzymes.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Rheumatology",
        "Internal Medicine",
        "Nephrology"
      ],
      "sources": [
        {
          "title": "Zyloric (allopurinol) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Zyloric"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Leukeran 2 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Chlorambucil",
      "activeIngredients": [
        "Chlorambucil"
      ],
      "drugClass": "Antineoplastic (alkylating agent)",
      "strength": "2 mg",
      "dosageForm": "Film-coated tablet",
      "route": "Oral",
      "packSize": "25 tablets",
      "clinical": {
        "approvedIndications": "Chronic lymphocytic leukaemia, Hodgkin's disease, some non-Hodgkin lymphomas and Waldenström's macroglobulinaemia.",
        "usualAdultDose": "Specialist use. Dose depends on the disease and protocol (for example chronic lymphocytic leukaemia: about 0.15 mg/kg/day initially). Monitor blood counts regularly.",
        "contraindications": "Hypersensitivity to chlorambucil or any excipient.",
        "commonAdverseEffects": "Bone marrow suppression, nausea, vomiting, mouth ulcers, rash (rarely severe), seizures (especially in children and with high doses), infertility, secondary malignancies.",
        "storageConditions": "Store in a refrigerator (2–8 °C)."
      },
      "specialties": [
        "Oncology",
        "Hematology"
      ],
      "sources": [
        {
          "title": "Leukeran (chlorambucil) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Leukeran"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Puri-Nethol 50 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Mercaptopurine",
      "activeIngredients": [
        "Mercaptopurine"
      ],
      "drugClass": "Antineoplastic (purine antimetabolite)",
      "strength": "50 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "25 tablets",
      "clinical": {
        "approvedIndications": "Acute lymphoblastic leukaemia (especially maintenance therapy) and acute myeloid leukaemia.",
        "usualAdultDose": "Specialist use. Usually 2.5 mg/kg/day (about 50–75 mg/m²/day), adjusted to blood counts. Check TPMT/NUDT15 where possible. Reduce to one quarter of the dose with allopurinol.",
        "contraindications": "Hypersensitivity to mercaptopurine or any excipient; yellow fever vaccination.",
        "commonAdverseEffects": "Bone marrow suppression, liver toxicity (including veno-occlusive disease), nausea, loss of appetite, pancreatitis, infections, mouth ulcers.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Hematology",
        "Oncology",
        "Pediatrics"
      ],
      "sources": [
        {
          "title": "Puri-Nethol (mercaptopurine) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Puri-Nethol"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Ultiva 1 mg Powder for Injection",
      "category": "prescription_drug",
      "genericName": "Remifentanil hydrochloride",
      "activeIngredients": [
        "Remifentanil hydrochloride"
      ],
      "drugClass": "Opioid analgesic (anaesthesia)",
      "strength": "1 mg",
      "dosageForm": "Powder for concentrate for solution for injection or infusion",
      "route": "Intravenous",
      "packSize": "5 vials",
      "clinical": {
        "approvedIndications": "Analgesia during induction and/or maintenance of general anaesthesia; analgesia and sedation in mechanically ventilated intensive care patients.",
        "usualAdultDose": "Only by staff trained in airway management, with monitoring. Given by IV infusion titrated to response, for example 0.05–2 micrograms/kg/min with a hypnotic during anaesthesia; see the SmPC for induction and ICU regimens.",
        "contraindications": "Hypersensitivity to remifentanil, other fentanyl analogues or any excipient; epidural or intrathecal use (contains glycine); use as the sole agent for induction of anaesthesia.",
        "commonAdverseEffects": "Muscle rigidity, bradycardia, hypotension, respiratory depression and apnoea, nausea, vomiting, shivering after anaesthesia.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Anesthesiology",
        "Critical Care"
      ],
      "sources": [
        {
          "title": "Ultiva (remifentanil) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Ultiva"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Tracrium 10 mg/mL Injection",
      "category": "prescription_drug",
      "genericName": "Atracurium besilate",
      "activeIngredients": [
        "Atracurium besilate"
      ],
      "drugClass": "Non-depolarising neuromuscular blocker",
      "strength": "10 mg/mL",
      "dosageForm": "Solution for injection or infusion",
      "route": "Intravenous",
      "packSize": "2.5 mL and 5 mL ampoules",
      "clinical": {
        "approvedIndications": "Adjunct to general anaesthesia to allow tracheal intubation and muscle relaxation during surgery, and to support controlled ventilation in intensive care.",
        "usualAdultDose": "Intubation and relaxation: 0.3–0.6 mg/kg IV; maintenance 0.1–0.2 mg/kg as needed, or infusion 0.3–0.6 mg/kg/hour. Only with facilities for intubation and ventilation.",
        "contraindications": "Hypersensitivity to atracurium, cisatracurium or benzenesulfonic acid.",
        "commonAdverseEffects": "Histamine release (skin flushing, hypotension, bronchospasm), changes in heart rate; rarely severe anaphylactic reactions.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Protect from light."
      },
      "specialties": [
        "Anesthesiology",
        "Critical Care"
      ],
      "sources": [
        {
          "title": "Tracrium (atracurium) — UK eMC SmPC search (Aspen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Tracrium"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Janssen": [
    {
      "found": true,
      "brandName": "Haldol 5 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Haloperidol",
      "activeIngredients": [
        "Haloperidol"
      ],
      "drugClass": "Antipsychotic (butyrophenone)",
      "strength": "5 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Schizophrenia and schizoaffective disorder, acute psychotic episodes, manic episodes of bipolar disorder, acute delirium when non-drug measures have failed, severe agitation and aggression, and tic disorders including Tourette's syndrome.",
        "usualAdultDose": "Adults: usually 2–10 mg daily in one or two doses, adjusted to response; maximum 20 mg daily. Lower doses in the elderly. An ECG is recommended before starting.",
        "contraindications": "Comatose state or CNS depression; Parkinson's disease, dementia with Lewy bodies or progressive supranuclear palsy; known QT prolongation or congenital long QT syndrome; recent acute myocardial infarction, uncompensated heart failure or ventricular arrhythmias; uncorrected hypokalaemia; use with other QT-prolonging medicines; hypersensitivity.",
        "commonAdverseEffects": "Extrapyramidal symptoms, akathisia, tardive dyskinesia, somnolence, hyperprolactinaemia, QT prolongation and arrhythmias, neuroleptic malignant syndrome. Increased mortality in elderly patients with dementia.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Psychiatry",
        "Neurology"
      ],
      "sources": [
        {
          "title": "Haldol (haloperidol) — UK eMC SmPC search (Janssen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Haldol"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Haldol 5 mg/mL Injection",
      "category": "prescription_drug",
      "genericName": "Haloperidol",
      "activeIngredients": [
        "Haloperidol"
      ],
      "drugClass": "Antipsychotic (butyrophenone)",
      "strength": "5 mg/mL",
      "dosageForm": "Solution for injection",
      "route": "Intramuscular",
      "packSize": "1 mL ampoules",
      "clinical": {
        "approvedIndications": "Rapid control of severe acute agitation in psychotic disorders, acute delirium when non-drug measures have failed, and postoperative nausea and vomiting.",
        "usualAdultDose": "Acute agitation: 5 mg IM, repeated hourly if needed; maximum 20 mg per day. Lower doses in the elderly. ECG monitoring is recommended.",
        "contraindications": "Comatose state or CNS depression; Parkinson's disease, dementia with Lewy bodies or progressive supranuclear palsy; known QT prolongation or congenital long QT syndrome; recent acute myocardial infarction, uncompensated heart failure or ventricular arrhythmias; uncorrected hypokalaemia; use with other QT-prolonging medicines; hypersensitivity.",
        "commonAdverseEffects": "Extrapyramidal symptoms, akathisia, tardive dyskinesia, somnolence, hyperprolactinaemia, QT prolongation and arrhythmias, neuroleptic malignant syndrome. Increased mortality in elderly patients with dementia.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Psychiatry",
        "Emergency Medicine"
      ],
      "sources": [
        {
          "title": "Haldol (haloperidol) — UK eMC SmPC search (Janssen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Haldol"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Vermox 100 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Mebendazole",
      "activeIngredients": [
        "Mebendazole"
      ],
      "drugClass": "Anthelmintic (benzimidazole)",
      "strength": "100 mg",
      "dosageForm": "Chewable tablet",
      "route": "Oral",
      "packSize": "6 tablets",
      "clinical": {
        "approvedIndications": "Threadworm (pinworm), roundworm, whipworm and hookworm infections, single or mixed, in adults and children from 2 years.",
        "usualAdultDose": "Threadworm: 100 mg as a single dose, repeated after 2–3 weeks if needed. Other worms: 100 mg twice daily for 3 days. Treat the whole household for threadworm.",
        "contraindications": "Hypersensitivity to mebendazole or any excipient.",
        "commonAdverseEffects": "Abdominal pain, diarrhoea, flatulence; rarely rash, hypersensitivity reactions, raised liver enzymes.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Pediatrics",
        "General Practice / Family Medicine",
        "Infectious Diseases"
      ],
      "sources": [
        {
          "title": "Vermox (mebendazole) — UK eMC SmPC search (Janssen)",
          "url": "https://www.medicines.org.uk/emc/search?q=Vermox"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Eli Lilly": [
    {
      "found": true,
      "brandName": "Prozac 20 mg Capsules",
      "category": "prescription_drug",
      "genericName": "Fluoxetine hydrochloride",
      "activeIngredients": [
        "Fluoxetine hydrochloride"
      ],
      "drugClass": "Antidepressant (SSRI)",
      "strength": "20 mg",
      "dosageForm": "Capsule, hard",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Major depressive episodes, obsessive-compulsive disorder and bulimia nervosa in adults; moderate to severe depression in children from 8 years when psychological therapy has not worked.",
        "usualAdultDose": "Depression: 20 mg once daily, may increase up to 60 mg daily. OCD: 20–60 mg daily. Bulimia nervosa: 60 mg daily. Lower or less frequent doses in hepatic impairment.",
        "contraindications": "Hypersensitivity to fluoxetine or any excipient; use with irreversible MAO inhibitors (start fluoxetine at least 2 weeks after stopping them; stop fluoxetine at least 5 weeks before starting them); metoprolol in heart failure.",
        "commonAdverseEffects": "Insomnia, headache, nausea, diarrhoea, fatigue, anxiety, decreased appetite, sexual dysfunction, rash. Monitor for suicidal thoughts (especially under 25 years), hyponatraemia, bleeding risk and serotonin syndrome.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Psychiatry",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Prozac (fluoxetine) — UK eMC SmPC search (Eli Lilly)",
          "url": "https://www.medicines.org.uk/emc/search?q=Prozac"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Sanofi": [
    {
      "found": true,
      "brandName": "Rifadin 300 mg Capsules",
      "category": "prescription_drug",
      "genericName": "Rifampicin",
      "activeIngredients": [
        "Rifampicin"
      ],
      "drugClass": "Antibacterial (rifamycin)",
      "strength": "300 mg",
      "dosageForm": "Capsule, hard",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Tuberculosis (always with other antituberculosis medicines), leprosy, brucellosis and other serious infections in combination; prevention of meningococcal disease and Haemophilus influenzae type b disease in close contacts.",
        "usualAdultDose": "Tuberculosis: 10 mg/kg once daily (usually 450 mg if under 50 kg, 600 mg if 50 kg or more), taken on an empty stomach 30 minutes before or 2 hours after a meal.",
        "contraindications": "Hypersensitivity to rifamycins; jaundice; use with saquinavir/ritonavir.",
        "commonAdverseEffects": "Orange-red colour of urine, sweat and tears (may stain soft contact lenses), nausea, abdominal pain, hepatitis, flu-like syndrome with intermittent dosing, thrombocytopenia. Strong enzyme inducer with many interactions (reduces the effect of hormonal contraceptives, warfarin and others).",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Infectious Diseases",
        "Pulmonology"
      ],
      "sources": [
        {
          "title": "Rifadin (rifampicin) — UK eMC SmPC search (Sanofi)",
          "url": "https://www.medicines.org.uk/emc/search?q=Rifadin"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Plaquenil 200 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Hydroxychloroquine sulfate",
      "activeIngredients": [
        "Hydroxychloroquine sulfate"
      ],
      "drugClass": "Antimalarial / disease-modifying antirheumatic drug",
      "strength": "200 mg",
      "dosageForm": "Film-coated tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Rheumatoid arthritis, discoid and systemic lupus erythematosus, and photosensitive skin conditions.",
        "usualAdultDose": "Adults: 200–400 mg daily, not exceeding 5 mg/kg actual body weight per day. Baseline and regular eye examinations for retinopathy.",
        "contraindications": "Hypersensitivity to 4-aminoquinolines or any excipient; pre-existing maculopathy of the eye.",
        "commonAdverseEffects": "Nausea, abdominal pain, diarrhoea, rash, headache, retinopathy with long-term use, QT prolongation, hypoglycaemia; rarely cardiomyopathy and severe skin reactions.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Rheumatology",
        "Dermatology"
      ],
      "sources": [
        {
          "title": "Plaquenil (hydroxychloroquine) — UK eMC SmPC search (Sanofi)",
          "url": "https://www.medicines.org.uk/emc/search?q=Plaquenil"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "GSK": [
    {
      "found": true,
      "brandName": "Zovirax 400 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Aciclovir",
      "activeIngredients": [
        "Aciclovir"
      ],
      "drugClass": "Antiviral (nucleoside analogue)",
      "strength": "400 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Herpes simplex infections of the skin and mucous membranes (including first and recurrent genital herpes), suppression of recurrent herpes simplex, herpes zoster (shingles) and chickenpox.",
        "usualAdultDose": "Herpes simplex: 200 mg five times daily for 5 days. Suppression: 400 mg twice daily. Herpes zoster: 800 mg five times daily for 7 days. Reduce the dose in renal impairment and keep well hydrated.",
        "contraindications": "Hypersensitivity to aciclovir, valaciclovir or any excipient.",
        "commonAdverseEffects": "Headache, dizziness, nausea, vomiting, diarrhoea, abdominal pain, rash, photosensitivity, fatigue; rarely kidney or neurological effects at high doses.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Infectious Diseases",
        "Dermatology",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Zovirax (aciclovir) — UK eMC SmPC search (GSK)",
          "url": "https://www.medicines.org.uk/emc/search?q=Zovirax"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Zovirax 5% Cream",
      "category": "prescription_drug",
      "genericName": "Aciclovir",
      "activeIngredients": [
        "Aciclovir"
      ],
      "drugClass": "Antiviral (topical)",
      "strength": "5% w/w",
      "dosageForm": "Cream",
      "route": "Cutaneous",
      "packSize": "2 g and 10 g tubes",
      "clinical": {
        "approvedIndications": "Herpes simplex infections of the lips and face (cold sores) and genital herpes.",
        "usualAdultDose": "Apply 5 times daily (about every 4 hours while awake) for 5 days, up to 10 days if not healed. Start as early as possible at the first signs.",
        "contraindications": "Hypersensitivity to aciclovir, valaciclovir or any excipient.",
        "commonAdverseEffects": "Transient burning or stinging, dryness, flaking or itching of the skin; rarely contact dermatitis.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Dermatology",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Zovirax (aciclovir) — UK eMC SmPC search (GSK)",
          "url": "https://www.medicines.org.uk/emc/search?q=Zovirax%20cream"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Pfizer": [
    {
      "found": true,
      "brandName": "Tazocin 4.5 g Powder for Infusion",
      "category": "prescription_drug",
      "genericName": "Piperacillin + Tazobactam",
      "activeIngredients": [
        "Piperacillin",
        "Tazobactam"
      ],
      "drugClass": "Antibacterial (penicillin with beta-lactamase inhibitor)",
      "strength": "4 g / 0.5 g",
      "dosageForm": "Powder for solution for infusion",
      "route": "Intravenous",
      "packSize": "Single vials",
      "clinical": {
        "approvedIndications": "Severe pneumonia including hospital-acquired and ventilator-associated pneumonia, complicated urinary tract infections including pyelonephritis, complicated intra-abdominal and skin infections, and fever in neutropenic patients.",
        "usualAdultDose": "Adults: 4.5 g every 8 hours (every 6 hours for hospital-acquired pneumonia and neutropenic fever), infused over 30 minutes. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to penicillins, other beta-lactams (cephalosporins, carbapenems) or beta-lactamase inhibitors.",
        "commonAdverseEffects": "Diarrhoea, nausea, vomiting, rash, Clostridioides difficile infection, hypokalaemia, thrombocytopenia, raised liver enzymes, injection-site reactions; rarely severe skin reactions.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Infectious Diseases",
        "Critical Care",
        "Internal Medicine"
      ],
      "sources": [
        {
          "title": "Tazocin (piperacillin/tazobactam) — UK eMC SmPC search (Pfizer)",
          "url": "https://www.medicines.org.uk/emc/search?q=Tazocin"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Depo-Provera 150 mg/mL Injection",
      "category": "prescription_drug",
      "genericName": "Medroxyprogesterone acetate",
      "activeIngredients": [
        "Medroxyprogesterone acetate"
      ],
      "drugClass": "Progestogen-only injectable contraceptive",
      "strength": "150 mg/mL",
      "dosageForm": "Suspension for injection",
      "route": "Intramuscular",
      "packSize": "1 mL pre-filled syringe or vial",
      "clinical": {
        "approvedIndications": "Long-acting contraception.",
        "usualAdultDose": "150 mg by deep intramuscular injection every 12 weeks; first injection within the first 5 days of a menstrual cycle. Shake well before use.",
        "contraindications": "Known or suspected pregnancy; undiagnosed vaginal or urinary tract bleeding; known or suspected cancer of the breast or genital organs; severe liver disease; hypersensitivity.",
        "commonAdverseEffects": "Irregular bleeding or amenorrhoea, weight gain, headache, mood changes, abdominal discomfort, reduced bone mineral density with long-term use, delayed return of fertility.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Obstetrics & Gynecology"
      ],
      "sources": [
        {
          "title": "Depo-Provera (medroxyprogesterone) — UK eMC SmPC search (Pfizer)",
          "url": "https://www.medicines.org.uk/emc/search?q=Depo-Provera"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Ketalar 50 mg/mL Injection",
      "category": "prescription_drug",
      "genericName": "Ketamine hydrochloride",
      "activeIngredients": [
        "Ketamine hydrochloride"
      ],
      "drugClass": "General anaesthetic (NMDA antagonist)",
      "strength": "50 mg/mL",
      "dosageForm": "Solution for injection or infusion",
      "route": "Intravenous / intramuscular",
      "packSize": "10 mL vials",
      "clinical": {
        "approvedIndications": "Sole anaesthetic for short diagnostic and surgical procedures, induction of anaesthesia before other agents, and supplementation of other anaesthetics.",
        "usualAdultDose": "IV induction: 1–4.5 mg/kg (2 mg/kg usually gives 5–10 minutes of anaesthesia). IM: 6.5–13 mg/kg. Only by staff trained in anaesthesia with resuscitation equipment available.",
        "contraindications": "Hypersensitivity to ketamine; patients in whom a rise in blood pressure would be a serious hazard (for example severe hypertension, recent stroke or severe heart disease); eclampsia or pre-eclampsia.",
        "commonAdverseEffects": "Emergence reactions (vivid dreams, hallucinations, confusion), raised blood pressure and heart rate, increased salivation, nausea and vomiting, double vision, involuntary movements.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Anesthesiology",
        "Emergency Medicine",
        "Critical Care"
      ],
      "sources": [
        {
          "title": "Ketalar (ketamine) — UK eMC SmPC search (Pfizer)",
          "url": "https://www.medicines.org.uk/emc/search?q=Ketalar"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Viatris": [
    {
      "found": true,
      "brandName": "Neurontin 300 mg Capsules",
      "category": "prescription_drug",
      "genericName": "Gabapentin",
      "activeIngredients": [
        "Gabapentin"
      ],
      "drugClass": "Antiepileptic / neuropathic pain agent",
      "strength": "300 mg",
      "dosageForm": "Capsule, hard",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Partial seizures with or without secondary generalisation (adjunctive therapy from 6 years; monotherapy from 12 years) and peripheral neuropathic pain in adults (such as diabetic neuropathy and post-herpetic neuralgia).",
        "usualAdultDose": "Titrate: 300 mg on day 1, 300 mg twice daily on day 2, 300 mg three times daily on day 3; then increase as needed to 900–3,600 mg daily in three divided doses. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to gabapentin or any excipient.",
        "commonAdverseEffects": "Somnolence, dizziness, ataxia, fatigue, fever, viral infections, weight gain, peripheral oedema, blurred vision. Respiratory depression risk with opioids; potential for misuse; monitor for mood changes and suicidal thoughts.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Neurology",
        "Anesthesiology",
        "General Practice / Family Medicine"
      ],
      "sources": [
        {
          "title": "Neurontin (gabapentin) — UK eMC SmPC search (Viatris)",
          "url": "https://www.medicines.org.uk/emc/search?q=Neurontin"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    },
    {
      "found": true,
      "brandName": "Xalatan 50 micrograms/mL Eye Drops",
      "category": "prescription_drug",
      "genericName": "Latanoprost",
      "activeIngredients": [
        "Latanoprost"
      ],
      "drugClass": "Prostaglandin analogue (glaucoma)",
      "strength": "50 micrograms/mL (0.005%)",
      "dosageForm": "Eye drops, solution",
      "route": "Ocular",
      "packSize": "2.5 mL bottle",
      "clinical": {
        "approvedIndications": "Reduction of raised intraocular pressure in open-angle glaucoma and ocular hypertension in adults and children.",
        "usualAdultDose": "One drop in the affected eye(s) once daily, preferably in the evening. Separate from other eye drops by at least 5 minutes.",
        "contraindications": "Hypersensitivity to latanoprost or any excipient.",
        "commonAdverseEffects": "Gradual, permanent increase in brown iris pigmentation, eye irritation and redness, eyelash changes (longer, darker, thicker), blurred vision, darkening of eyelid skin.",
        "storageConditions": "Before opening: store in a refrigerator (2–8 °C), protected from light. After opening: store below 25 °C and use within 4 weeks."
      },
      "specialties": [
        "Ophthalmology"
      ],
      "sources": [
        {
          "title": "Xalatan (latanoprost) — UK eMC SmPC search (Viatris)",
          "url": "https://www.medicines.org.uk/emc/search?q=Xalatan"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Novartis": [
    {
      "found": true,
      "brandName": "Lioresal 10 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Baclofen",
      "activeIngredients": [
        "Baclofen"
      ],
      "drugClass": "Centrally acting muscle relaxant",
      "strength": "10 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Spasticity caused by multiple sclerosis, spinal cord diseases or injuries, and spasticity of cerebral origin.",
        "usualAdultDose": "Start 5 mg three times daily, increasing by 5 mg three times daily every 3 days until the desired effect; usually up to 60 mg daily; maximum 100 mg daily under close supervision. Do not stop suddenly.",
        "contraindications": "Hypersensitivity to baclofen or any excipient; active peptic ulceration.",
        "commonAdverseEffects": "Sedation, somnolence, nausea, dizziness, muscle weakness, confusion, hypotonia. Sudden withdrawal can cause hallucinations, seizures and rebound spasticity.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Neurology",
        "Physical Medicine and Rehabilitation"
      ],
      "sources": [
        {
          "title": "Lioresal (baclofen) — UK eMC SmPC search (Novartis)",
          "url": "https://www.medicines.org.uk/emc/search?q=Lioresal"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Boehringer Ingelheim": [
    {
      "found": true,
      "brandName": "Mobic 15 mg Tablets",
      "category": "prescription_drug",
      "genericName": "Meloxicam",
      "activeIngredients": [
        "Meloxicam"
      ],
      "drugClass": "Non-steroidal anti-inflammatory drug (oxicam)",
      "strength": "15 mg",
      "dosageForm": "Tablet",
      "route": "Oral",
      "packSize": "Pack size varies by market",
      "clinical": {
        "approvedIndications": "Short-term symptomatic treatment of exacerbations of osteoarthritis; long-term symptomatic treatment of rheumatoid arthritis and ankylosing spondylitis.",
        "usualAdultDose": "Osteoarthritis: 7.5 mg once daily, up to 15 mg. Rheumatoid arthritis and ankylosing spondylitis: 15 mg once daily (7.5 mg in the elderly or at higher risk). Maximum 15 mg daily; use the lowest effective dose for the shortest time.",
        "contraindications": "Hypersensitivity to meloxicam or other NSAIDs (including asthma, nasal polyps, angioedema or urticaria after NSAIDs); active or recurrent peptic ulcer or GI bleeding; severe liver failure; severe non-dialysed kidney failure; severe heart failure; third trimester of pregnancy; children under 16 years.",
        "commonAdverseEffects": "Dyspepsia, nausea, abdominal pain, diarrhoea, headache; GI bleeding and ulcers, cardiovascular thrombotic risk, fluid retention and kidney effects.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Rheumatology",
        "Orthopedics"
      ],
      "sources": [
        {
          "title": "Mobic (meloxicam) — US prescribing information, DailyMed search",
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Mobic"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "MSD": [
    {
      "found": true,
      "brandName": "Esmeron 10 mg/mL Injection",
      "category": "prescription_drug",
      "genericName": "Rocuronium bromide",
      "activeIngredients": [
        "Rocuronium bromide"
      ],
      "drugClass": "Non-depolarising neuromuscular blocker",
      "strength": "10 mg/mL",
      "dosageForm": "Solution for injection or infusion",
      "route": "Intravenous",
      "packSize": "5 mL vials",
      "clinical": {
        "approvedIndications": "Adjunct to general anaesthesia to allow tracheal intubation (including rapid sequence induction) and muscle relaxation during surgery; to facilitate ventilation in intensive care.",
        "usualAdultDose": "Intubation: 0.6 mg/kg IV (rapid sequence induction 1.0 mg/kg); maintenance 0.15 mg/kg or infusion 0.3–0.6 mg/kg/hour. Only with facilities for intubation and ventilation. Can be reversed with sugammadex.",
        "contraindications": "Hypersensitivity to rocuronium, the bromide ion or any excipient.",
        "commonAdverseEffects": "Pain on injection, tachycardia, hypotension, prolonged neuromuscular block; rarely anaphylactic reactions.",
        "storageConditions": "Store in a refrigerator (2–8 °C). May be kept outside the refrigerator up to 30 °C for up to 12 weeks."
      },
      "specialties": [
        "Anesthesiology",
        "Critical Care"
      ],
      "sources": [
        {
          "title": "Esmeron (rocuronium) — UK eMC SmPC search (MSD)",
          "url": "https://www.medicines.org.uk/emc/search?q=Esmeron"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ],
  "Bayer": [
    {
      "found": true,
      "brandName": "Nebido 1000 mg/4 mL Injection",
      "category": "prescription_drug",
      "genericName": "Testosterone undecanoate",
      "activeIngredients": [
        "Testosterone undecanoate"
      ],
      "drugClass": "Androgen (long-acting)",
      "strength": "1000 mg/4 mL",
      "dosageForm": "Solution for injection",
      "route": "Intramuscular",
      "packSize": "4 mL vial",
      "clinical": {
        "approvedIndications": "Testosterone replacement in male hypogonadism confirmed by clinical features and blood tests.",
        "usualAdultDose": "1000 mg by very slow deep intramuscular injection (over about 2 minutes) every 10–14 weeks; the second injection may be given 6 weeks after the first. Monitor testosterone, haematocrit and PSA.",
        "contraindications": "Androgen-dependent cancer of the prostate or male breast; past or present liver tumours; hypersensitivity; use in women.",
        "commonAdverseEffects": "Injection-site pain, acne, increased haematocrit and red cell count, raised PSA, weight gain, hot flushes, mood changes; rarely pulmonary oil microembolism or allergic reactions during or right after injection.",
        "storageConditions": "Store in the original package as stated on the pack label."
      },
      "specialties": [
        "Endocrinology",
        "Andrology",
        "Urology"
      ],
      "sources": [
        {
          "title": "Nebido (testosterone undecanoate) — UK eMC SmPC search (Bayer)",
          "url": "https://www.medicines.org.uk/emc/search?q=Nebido"
        }
      ],
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet."
    }
  ]
};

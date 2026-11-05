import type { AiProductDraft } from './catalog';

// Iraq essentials, batches 2–5 (2026-11-06): Iraq-marketed brands for generic medicines,
// vaccines, plasma products and contrast media on the Iraqi National Master List (NBSD)
// that Pharmaty did not have. Exported from Supabase (product_ai_drafts, model
// 'claude-iraq-essentials') after loading; grouped by company name as stored there.
export const IRAQ_ESSENTIALS_BATCH_2_5: Record<string, AiProductDraft[]> = {
  "Abbott": [
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular / subcutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Influvac%20Tetra",
          "title": "Influvac sub-unit Tetra — UK eMC SmPC search (Abbott)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose each season. Children under 9 years not previously vaccinated need a second dose after at least 4 weeks. Use the strain composition recommended for the current season.",
        "contraindications": "Hypersensitivity to the vaccine, egg proteins (ovalbumin, chicken proteins) or residues such as formaldehyde, gentamicin and polysorbate 80; postpone in acute febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Prevention of influenza in adults and children from 6 months, especially those at increased risk of complications.",
        "commonAdverseEffects": "Headache, sweating, muscle and joint pain, malaise, injection-site pain and swelling, fever."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Influvac Tetra Suspension for Injection",
      "drugClass": "Viral vaccine (inactivated)",
      "dosageForm": "Suspension for injection in pre-filled syringe",
      "genericName": "Influenza vaccine (surface antigen, inactivated, quadrivalent)",
      "specialties": [
        "General Practice / Family Medicine",
        "Internal Medicine",
        "Pediatrics",
        "Geriatrics"
      ],
      "activeIngredients": [
        "Influenza vaccine (surface antigen, inactivated, quadrivalent)"
      ]
    }
  ],
  "AbbVie": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Ocular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=FML%20eye%20drops",
          "title": "FML (fluorometholone) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "1–2 drops into the affected eye 2–4 times daily; during the first 24–48 hours up to every hour if needed. Shake well. Do not stop suddenly after long use.",
        "contraindications": "Acute untreated bacterial eye infections; herpes simplex (dendritic) keratitis; vaccinia, varicella and other viral diseases of the cornea and conjunctiva; fungal or mycobacterial eye infections; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Steroid-responsive inflammation of the conjunctiva, cornea and anterior segment of the eye.",
        "commonAdverseEffects": "Raised intraocular pressure and glaucoma, cataract, delayed wound healing, secondary eye infections, eye irritation and blurred vision."
      },
      "packSize": "5 mL bottle",
      "strength": "1 mg/mL (0.1%)",
      "brandName": "FML 0.1% Eye Drops",
      "drugClass": "Ophthalmic corticosteroid",
      "dosageForm": "Eye drops, suspension",
      "genericName": "Fluorometholone",
      "specialties": [
        "Ophthalmology"
      ],
      "activeIngredients": [
        "Fluorometholone"
      ]
    }
  ],
  "Angelini": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oromucosal",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=benzydamine%20oral%20rinse",
          "title": "Benzydamine oral rinse — reference SmPC, UK eMC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and children over 12 years: rinse or gargle with 15 mL every 1.5–3 hours as needed, then spit out. Do not swallow.",
        "contraindications": "Hypersensitivity to benzydamine or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Relief of painful inflammatory conditions of the mouth and throat: sore throat, mouth ulcers, gum inflammation, after dental or ENT surgery, and radiation mucositis.",
        "commonAdverseEffects": "Numbness or stinging of the mouth; rarely hypersensitivity reactions, bronchospasm in sensitive patients."
      },
      "packSize": "Bottle (size varies)",
      "strength": "1.5 mg/mL (0.15%)",
      "brandName": "Tantum Verde 0.15% Mouthwash",
      "drugClass": "Topical anti-inflammatory and analgesic (oral)",
      "dosageForm": "Oromucosal solution (mouthwash)",
      "genericName": "Benzydamine hydrochloride",
      "specialties": [
        "ENT (Otolaryngology)",
        "General Practice / Family Medicine",
        "Oncology"
      ],
      "activeIngredients": [
        "Benzydamine hydrochloride"
      ]
    }
  ],
  "Baxter": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Cyclophosphamide%20Baxter",
          "title": "Cyclophosphamide (Baxter) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Dose depends on the protocol (for example 500–1,000 mg/m² IV every 3–4 weeks). Keep well hydrated and give mesna with high doses; monitor blood counts and urine.",
        "contraindications": "Hypersensitivity; severe bone marrow failure; acute infection; urinary tract inflammation (cystitis) or urinary outflow obstruction.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Leukaemias, lymphomas and solid tumours (including breast and ovarian cancer, small cell lung cancer, neuroblastoma and sarcomas); conditioning before stem cell transplantation; severe autoimmune disease such as lupus nephritis and ANCA vasculitis.",
        "commonAdverseEffects": "Bone marrow suppression, nausea, vomiting, hair loss, haemorrhagic cystitis, infections, infertility, cardiotoxicity at high doses, secondary malignancies."
      },
      "packSize": "Single vial",
      "strength": "500 mg",
      "brandName": "Endoxan 500 mg Powder for Injection",
      "drugClass": "Antineoplastic and immunosuppressant (alkylating agent)",
      "dosageForm": "Powder for solution for injection or infusion",
      "genericName": "Cyclophosphamide",
      "specialties": [
        "Oncology",
        "Hematology",
        "Rheumatology",
        "Nephrology"
      ],
      "activeIngredients": [
        "Cyclophosphamide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Ifosfamide%20Baxter",
          "title": "Ifosfamide (Baxter) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Dose depends on the protocol (for example 5–6 g/m² per cycle, or 1.2–2.4 g/m² daily for 3–5 days). Always give with mesna and adequate hydration; monitor blood counts, renal function and neurological status.",
        "contraindications": "Hypersensitivity; severe bone marrow suppression; cystitis or urinary outflow obstruction; severe renal impairment; acute infection.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Testicular germ cell tumours, soft tissue and bone sarcomas, lymphomas and other solid tumours as part of combination chemotherapy.",
        "commonAdverseEffects": "Bone marrow suppression, haemorrhagic cystitis, encephalopathy (confusion, somnolence, hallucinations), kidney damage, nausea, vomiting, hair loss."
      },
      "packSize": "Single vial",
      "strength": "1 g",
      "brandName": "Holoxan 1 g Powder for Injection",
      "drugClass": "Antineoplastic (alkylating agent)",
      "dosageForm": "Powder for solution for infusion",
      "genericName": "Ifosfamide",
      "specialties": [
        "Oncology",
        "Hematology"
      ],
      "activeIngredients": [
        "Ifosfamide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Uromitexan",
          "title": "Uromitexan (mesna) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Usually 20% of the ifosfamide or cyclophosphamide dose (by weight) given IV at the start of chemotherapy and again after 4 and 8 hours (total 60%); other schedules as in the protocol.",
        "contraindications": "Hypersensitivity to mesna or other thiol compounds.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of urothelial toxicity (haemorrhagic cystitis) caused by ifosfamide and high-dose cyclophosphamide.",
        "commonAdverseEffects": "Headache, nausea, vomiting, diarrhoea, abdominal pain, flushing, rash, injection-site reactions; rarely severe allergic or skin reactions."
      },
      "packSize": "4 mL ampoules",
      "strength": "100 mg/mL",
      "brandName": "Uromitexan 400 mg/4 mL Injection",
      "drugClass": "Uroprotective agent",
      "dosageForm": "Solution for injection",
      "genericName": "Mesna",
      "specialties": [
        "Oncology",
        "Hematology"
      ],
      "activeIngredients": [
        "Mesna"
      ]
    }
  ],
  "Bayer": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Bepanthen",
          "title": "Bepanthen (dexpanthenol) — UK eMC SmPC search (Bayer)"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Apply after each nappy change, or after each breastfeed for nipple care, or once or twice daily to affected skin.",
        "contraindications": "Hypersensitivity to dexpanthenol or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention and care of nappy rash, care of sore or cracked nipples during breastfeeding, and minor skin irritation and dryness.",
        "commonAdverseEffects": "Rarely allergic contact dermatitis or skin irritation."
      },
      "packSize": "Tube (size varies by market)",
      "strength": "5% w/w",
      "brandName": "Bepanthen 5% Ointment",
      "drugClass": "Skin protectant (pro-vitamin B5)",
      "dosageForm": "Ointment",
      "genericName": "Dexpanthenol",
      "specialties": [
        "Dermatology",
        "Pediatrics",
        "Obstetrics & Gynecology"
      ],
      "activeIngredients": [
        "Dexpanthenol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Gadovist",
          "title": "Gadovist (gadobutrol) — UK eMC SmPC search (Bayer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Usually 0.1 mL/kg (0.1 mmol/kg) as an IV bolus; use the lowest dose that gives adequate enhancement.",
        "contraindications": "Hypersensitivity to the gadolinium agent or any excipient. Use with care in severe renal impairment (risk of nephrogenic systemic fibrosis) and in patients with seizures.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Contrast enhancement in magnetic resonance imaging of the brain and spine, liver, kidneys, breast and whole body, and MR angiography, in adults and children of all ages.",
        "commonAdverseEffects": "Headache, nausea, dizziness, taste disturbance, injection-site coldness or pain; hypersensitivity reactions (rarely severe); nephrogenic systemic fibrosis in severe renal impairment (very rare with macrocyclic agents)."
      },
      "packSize": "Vials and pre-filled syringes (sizes vary)",
      "strength": "1.0 mmol/mL (604.72 mg/mL)",
      "brandName": "Gadovist 1.0 mmol/mL Solution for Injection",
      "drugClass": "Gadolinium-based MRI contrast agent (macrocyclic)",
      "dosageForm": "Solution for injection",
      "genericName": "Gadobutrol",
      "specialties": [
        "Radiology",
        "Neurology",
        "Oncology"
      ],
      "activeIngredients": [
        "Gadobutrol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravascular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Ultravist",
          "title": "Ultravist (iopromide) — UK eMC SmPC search (Bayer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose depends on the examination, patient age and weight (see the SmPC). Ensure good hydration before and after use.",
        "contraindications": "Hypersensitivity to the contrast agent or any excipient; manifest thyrotoxicosis. Take special care with previous contrast reactions, asthma, renal impairment, diabetes treated with metformin, heart disease, myasthenia gravis and phaeochromocytoma.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "X-ray contrast for computed tomography, angiography including coronary angiography, and urography.",
        "commonAdverseEffects": "Feeling of warmth, nausea, vomiting, taste changes, headache; hypersensitivity reactions from urticaria to anaphylaxis (have resuscitation available); contrast-induced kidney injury (ensure hydration); delayed skin reactions; thyroid dysfunction."
      },
      "packSize": "Bottles (sizes vary)",
      "strength": "370 mg iodine/mL",
      "brandName": "Ultravist 370 mg I/mL Solution for Injection",
      "drugClass": "Iodinated X-ray contrast medium (non-ionic, low-osmolar)",
      "dosageForm": "Solution for injection",
      "genericName": "Iopromide",
      "specialties": [
        "Radiology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Iopromide"
      ]
    }
  ],
  "Boehringer Ingelheim": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Persantin",
          "title": "Persantin (dipyridamole) — UK eMC SmPC search (Boehringer Ingelheim)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "200 mg twice daily, morning and evening, usually with meals. Swallow whole. Headache in the first days usually improves.",
        "contraindications": "Hypersensitivity to dipyridamole or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Secondary prevention of ischaemic stroke and transient ischaemic attacks, alone or with aspirin; adjunct to oral anticoagulation to prevent thromboembolism with prosthetic heart valves.",
        "commonAdverseEffects": "Headache, dizziness, nausea, diarrhoea, muscle pain, flushing, hypotension; may worsen symptoms in severe coronary artery disease."
      },
      "packSize": "Pack size varies by market",
      "strength": "200 mg",
      "brandName": "Persantin Retard 200 mg Capsules",
      "drugClass": "Antiplatelet agent (phosphodiesterase inhibitor)",
      "dosageForm": "Modified-release capsule, hard",
      "genericName": "Dipyridamole",
      "specialties": [
        "Neurology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Dipyridamole"
      ]
    }
  ],
  "Bracco": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravascular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Niopam",
          "title": "Iopamidol (Bracco, Niopam/Iopamiro) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose depends on the examination, patient age and weight (see the SmPC). Ensure good hydration before and after use.",
        "contraindications": "Hypersensitivity to the contrast agent or any excipient; manifest thyrotoxicosis. Take special care with previous contrast reactions, asthma, renal impairment, diabetes treated with metformin, heart disease, myasthenia gravis and phaeochromocytoma.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "X-ray contrast for angiography (including coronary), computed tomography and urography. (Marketed in the UK as Niopam.)",
        "commonAdverseEffects": "Feeling of warmth, nausea, vomiting, taste changes, headache; hypersensitivity reactions from urticaria to anaphylaxis (have resuscitation available); contrast-induced kidney injury (ensure hydration); delayed skin reactions; thyroid dysfunction."
      },
      "packSize": "Bottles (sizes vary)",
      "strength": "370 mg iodine/mL (755 mg iopamidol/mL)",
      "brandName": "Iopamiro 370 mg I/mL Solution for Injection",
      "drugClass": "Iodinated X-ray contrast medium (non-ionic, low-osmolar)",
      "dosageForm": "Solution for injection",
      "genericName": "Iopamidol",
      "specialties": [
        "Radiology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Iopamidol"
      ]
    }
  ],
  "Bristol Myers Squibb": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/imnovid",
          "title": "Imnovid (pomalidomide) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. With dexamethasone: 4 mg once daily on days 1–21 of 28-day cycles. With bortezomib and dexamethasone: 4 mg once daily on days 1–14 of 21-day cycles. Adjust for blood counts. Thromboprophylaxis is recommended.",
        "contraindications": "Pregnancy; women who can become pregnant unless all conditions of the Pregnancy Prevention Programme are met; male patients unable to follow the contraception requirements; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Relapsed or refractory multiple myeloma: with bortezomib and dexamethasone after at least one prior treatment including lenalidomide, or with dexamethasone after at least two prior treatments including lenalidomide and bortezomib.",
        "commonAdverseEffects": "Neutropenia, anaemia, thrombocytopenia, infections including pneumonia, fatigue, constipation, diarrhoea, peripheral neuropathy, venous thromboembolism."
      },
      "packSize": "21 capsules",
      "strength": "4 mg",
      "brandName": "Imnovid 4 mg Capsules",
      "drugClass": "Immunomodulatory agent (thalidomide analogue)",
      "dosageForm": "Capsule, hard",
      "genericName": "Pomalidomide",
      "specialties": [
        "Hematology",
        "Oncology"
      ],
      "activeIngredients": [
        "Pomalidomide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/opdivo",
          "title": "Opdivo (nivolumab) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Monotherapy: 240 mg every 2 weeks or 480 mg every 4 weeks by IV infusion over 30 minutes; combination regimens differ by indication. No dose reductions; withhold or stop for immune-related reactions.",
        "contraindications": "Hypersensitivity to nivolumab or any excipient.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the original carton to protect from light.",
        "approvedIndications": "Several advanced cancers alone or in combination: melanoma (including adjuvant), non-small cell lung cancer, mesothelioma, renal cell carcinoma, classical Hodgkin lymphoma, head and neck squamous cell cancer, urothelial carcinoma, oesophageal, gastric and gastro-oesophageal junction cancers, MSI-H colorectal cancer and hepatocellular carcinoma.",
        "commonAdverseEffects": "Fatigue, rash, itching, diarrhoea, nausea, musculoskeletal pain; immune-related pneumonitis, colitis, hepatitis, nephritis, skin reactions and endocrine disorders (thyroid, pituitary, adrenal, type 1 diabetes); infusion reactions."
      },
      "packSize": "4 mL, 10 mL and 24 mL vials",
      "strength": "10 mg/mL",
      "brandName": "Opdivo 10 mg/mL Concentrate",
      "drugClass": "PD-1 blocking monoclonal antibody (immune checkpoint inhibitor)",
      "dosageForm": "Concentrate for solution for infusion",
      "genericName": "Nivolumab",
      "specialties": [
        "Oncology",
        "Hematology"
      ],
      "activeIngredients": [
        "Nivolumab"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Subcutaneous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/orencia",
          "title": "Orencia (abatacept) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults: 125 mg by subcutaneous injection once weekly, with or without an intravenous loading dose. Screen for tuberculosis and hepatitis B before starting.",
        "contraindications": "Hypersensitivity to abatacept or any excipient; severe and uncontrolled infections such as sepsis and opportunistic infections.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the original carton to protect from light.",
        "approvedIndications": "Moderate to severe active rheumatoid arthritis (usually with methotrexate) after inadequate response to DMARDs, psoriatic arthritis, and polyarticular juvenile idiopathic arthritis.",
        "commonAdverseEffects": "Upper respiratory and urinary tract infections, headache, nausea, dizziness, hypertension, cough, injection-site reactions; serious infections. Do not combine with TNF inhibitors; avoid live vaccines."
      },
      "packSize": "4 pre-filled syringes",
      "strength": "125 mg/mL",
      "brandName": "Orencia 125 mg Pre-filled Syringe",
      "drugClass": "Selective T-cell co-stimulation modulator",
      "dosageForm": "Solution for injection in pre-filled syringe",
      "genericName": "Abatacept",
      "specialties": [
        "Rheumatology",
        "Immunology",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Abatacept"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/revlimid",
          "title": "Revlimid (lenalidomide) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Maintenance after transplant: 10 mg once daily on days 1–28 of 28-day cycles. Myelodysplastic syndromes: 10 mg once daily on days 1–21 of 28-day cycles. Adjust for blood counts and renal function. Thromboprophylaxis is recommended.",
        "contraindications": "Pregnancy; women who can become pregnant unless all conditions of the Pregnancy Prevention Programme are met; hypersensitivity. Lenalidomide is expected to cause birth defects.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Multiple myeloma (maintenance after autologous stem cell transplant; first-line in combination for patients not eligible for transplant; previously treated disease with dexamethasone), transfusion-dependent anaemia in low-risk myelodysplastic syndromes with del(5q), relapsed mantle cell lymphoma and follicular lymphoma with rituximab.",
        "commonAdverseEffects": "Neutropenia, thrombocytopenia, anaemia, venous and arterial thromboembolism, infections, fatigue, diarrhoea, constipation, rash, muscle cramps, peripheral neuropathy; second primary malignancies."
      },
      "packSize": "21 capsules",
      "strength": "10 mg",
      "brandName": "Revlimid 10 mg Capsules",
      "drugClass": "Immunomodulatory agent (thalidomide analogue)",
      "dosageForm": "Capsule, hard",
      "genericName": "Lenalidomide",
      "specialties": [
        "Hematology",
        "Oncology"
      ],
      "activeIngredients": [
        "Lenalidomide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/revlimid",
          "title": "Revlimid (lenalidomide) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Multiple myeloma with dexamethasone: 25 mg once daily on days 1–21 of 28-day cycles. Adjust for blood counts and renal function. Thromboprophylaxis is recommended.",
        "contraindications": "Pregnancy; women who can become pregnant unless all conditions of the Pregnancy Prevention Programme are met; hypersensitivity. Lenalidomide is expected to cause birth defects.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Multiple myeloma (first-line in combination for patients not eligible for transplant; previously treated disease with dexamethasone), and other haematological indications at other strengths.",
        "commonAdverseEffects": "Neutropenia, thrombocytopenia, anaemia, venous and arterial thromboembolism, infections, fatigue, diarrhoea, constipation, rash, muscle cramps, peripheral neuropathy; second primary malignancies."
      },
      "packSize": "21 capsules",
      "strength": "25 mg",
      "brandName": "Revlimid 25 mg Capsules",
      "drugClass": "Immunomodulatory agent (thalidomide analogue)",
      "dosageForm": "Capsule, hard",
      "genericName": "Lenalidomide",
      "specialties": [
        "Hematology",
        "Oncology"
      ],
      "activeIngredients": [
        "Lenalidomide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/sprycel",
          "title": "Sprycel (dasatinib) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Chronic-phase CML: 100 mg once daily. Accelerated or blast phase CML and Ph+ ALL: 140 mg once daily. Swallow whole at the same time each day; adjust for toxicity.",
        "contraindications": "Hypersensitivity to dasatinib or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Philadelphia chromosome-positive chronic myeloid leukaemia (newly diagnosed chronic phase, or any phase after resistance or intolerance to imatinib) and Ph+ acute lymphoblastic leukaemia.",
        "commonAdverseEffects": "Myelosuppression, fluid retention including pleural effusion, diarrhoea, headache, rash, nausea, bleeding, infections; pulmonary arterial hypertension and QT prolongation. Avoid strong CYP3A4 inhibitors; antacids and acid-reducing medicines lower absorption."
      },
      "packSize": "30 tablets",
      "strength": "100 mg",
      "brandName": "Sprycel 100 mg Tablets",
      "drugClass": "Tyrosine kinase inhibitor (BCR-ABL, SRC)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Dasatinib",
      "specialties": [
        "Hematology",
        "Oncology"
      ],
      "activeIngredients": [
        "Dasatinib"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/sprycel",
          "title": "Sprycel (dasatinib) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Chronic-phase CML: 100 mg once daily. Accelerated or blast phase CML and Ph+ ALL: 140 mg once daily. Swallow whole at the same time each day; adjust for toxicity.",
        "contraindications": "Hypersensitivity to dasatinib or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Philadelphia chromosome-positive chronic myeloid leukaemia (newly diagnosed chronic phase, or any phase after resistance or intolerance to imatinib) and Ph+ acute lymphoblastic leukaemia, in adults and children.",
        "commonAdverseEffects": "Myelosuppression, fluid retention including pleural effusion, diarrhoea, headache, rash, nausea, bleeding, infections; pulmonary arterial hypertension and QT prolongation. Avoid strong CYP3A4 inhibitors; antacids and acid-reducing medicines lower absorption."
      },
      "packSize": "60 tablets",
      "strength": "50 mg",
      "brandName": "Sprycel 50 mg Tablets",
      "drugClass": "Tyrosine kinase inhibitor (BCR-ABL, SRC)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Dasatinib",
      "specialties": [
        "Hematology",
        "Oncology",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Dasatinib"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/yervoy",
          "title": "Yervoy (ipilimumab) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Melanoma monotherapy: 3 mg/kg by IV infusion over 30 minutes every 3 weeks for 4 doses. With nivolumab the dose and schedule depend on the indication. Withhold or stop for immune-related reactions.",
        "contraindications": "Hypersensitivity to ipilimumab or any excipient.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the original carton to protect from light.",
        "approvedIndications": "Advanced melanoma (alone or with nivolumab) and, with nivolumab, renal cell carcinoma, non-small cell lung cancer, mesothelioma, MSI-H colorectal cancer, oesophageal squamous cell carcinoma and hepatocellular carcinoma.",
        "commonAdverseEffects": "Immune-related colitis and diarrhoea, hepatitis, dermatitis, endocrine disorders and neuropathies; fatigue, rash, itching, nausea, decreased appetite; infusion reactions."
      },
      "packSize": "10 mL and 40 mL vials",
      "strength": "5 mg/mL",
      "brandName": "Yervoy 5 mg/mL Concentrate",
      "drugClass": "CTLA-4 blocking monoclonal antibody (immune checkpoint inhibitor)",
      "dosageForm": "Concentrate for solution for infusion",
      "genericName": "Ipilimumab",
      "specialties": [
        "Oncology"
      ],
      "activeIngredients": [
        "Ipilimumab"
      ]
    }
  ],
  "CSL Behring": [
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intravenous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Rhophylac",
          "title": "Rhophylac (anti-D immunoglobulin) — UK eMC SmPC search (CSL Behring)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Antenatal: 300 micrograms at 28–30 weeks. After delivery: 200–300 micrograms within 72 hours (adjust to the size of fetomaternal haemorrhage). After other sensitising events: as soon as possible, within 72 hours. Give IV in severe thrombocytopenia.",
        "contraindications": "Hypersensitivity to human immunoglobulins or any excipient; IM injection in patients with severe thrombocytopenia or clotting disorders.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Prevention of Rh(D) immunisation in Rh(D)-negative women (antenatal prophylaxis, after delivery of an Rh(D)-positive baby, miscarriage, abortion, ectopic pregnancy and other sensitising events), and treatment after incompatible transfusion of Rh(D)-positive blood.",
        "commonAdverseEffects": "Injection-site pain, fever, chills, headache, nausea, skin reactions; rarely hypersensitivity reactions and haemolysis (after incompatible transfusion)."
      },
      "packSize": "Single pre-filled syringe",
      "strength": "300 micrograms (1500 IU)/2 mL",
      "brandName": "Rhophylac 300 micrograms/2 mL Solution for Injection",
      "drugClass": "Immunoglobulin (anti-D)",
      "dosageForm": "Solution for injection in pre-filled syringe",
      "genericName": "Human anti-D immunoglobulin",
      "specialties": [
        "Obstetrics & Gynecology",
        "Hematology"
      ],
      "activeIngredients": [
        "Human anti-D immunoglobulin"
      ]
    }
  ],
  "CSL Vifor": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Ferinject",
          "title": "Ferinject (ferric carboxymaltose) — UK eMC SmPC search (Vifor)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Total dose based on haemoglobin and body weight. Single dose up to 1,000 mg iron (maximum 20 mg/kg) by IV injection or infusion, no more than once a week. Observe for at least 30 minutes after each dose.",
        "contraindications": "Hypersensitivity to ferric carboxymaltose or serious hypersensitivity to other parenteral iron; anaemia not caused by iron deficiency; iron overload.",
        "storageConditions": "Do not store above 30 °C. Do not freeze.",
        "approvedIndications": "Iron deficiency (confirmed by blood tests) when oral iron is ineffective or cannot be used, or when iron must be given rapidly.",
        "commonAdverseEffects": "Headache, dizziness, nausea, flushing, hypertension, hypophosphataemia (can be prolonged), injection-site reactions including brown skin staining if leakage occurs; rarely serious hypersensitivity reactions (give only where resuscitation is available)."
      },
      "packSize": "2 mL, 10 mL and 20 mL vials",
      "strength": "50 mg iron/mL",
      "brandName": "Ferinject 50 mg/mL Injection",
      "drugClass": "Parenteral iron",
      "dosageForm": "Dispersion for injection or infusion",
      "genericName": "Ferric carboxymaltose",
      "specialties": [
        "Hematology",
        "Nephrology",
        "Obstetrics & Gynecology",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Ferric carboxymaltose"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Venofer",
          "title": "Venofer (iron sucrose) — UK eMC SmPC search (Vifor)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Cumulative dose based on haemoglobin and body weight. Usually 100–200 mg iron by slow IV injection or infusion up to three times a week; maximum single dose 200 mg by injection. Observe for at least 30 minutes after each dose.",
        "contraindications": "Hypersensitivity to iron sucrose or serious hypersensitivity to other parenteral iron; anaemia not caused by iron deficiency; iron overload.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Iron deficiency when oral iron is ineffective or cannot be used, including in chronic kidney disease.",
        "commonAdverseEffects": "Taste disturbance, hypotension or hypertension, nausea, headache, injection-site reactions; rarely serious hypersensitivity reactions (give only where resuscitation is available)."
      },
      "packSize": "5 mL ampoules",
      "strength": "20 mg iron/mL",
      "brandName": "Venofer 20 mg/mL Injection",
      "drugClass": "Parenteral iron",
      "dosageForm": "Solution for injection or concentrate for infusion",
      "genericName": "Iron sucrose",
      "specialties": [
        "Nephrology",
        "Hematology",
        "Obstetrics & Gynecology"
      ],
      "activeIngredients": [
        "Iron sucrose"
      ]
    }
  ],
  "Dr. Falk Pharma": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Ursofalk",
          "title": "Ursofalk (ursodeoxycholic acid) — UK eMC SmPC search (Dr. Falk)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Gallstones: about 10 mg/kg daily as a single evening dose, for 6–24 months. Primary biliary cholangitis: 12–16 mg/kg daily (divided during the first 3 months, then once daily in the evening).",
        "contraindications": "Acute inflammation of the gallbladder or bile ducts; blockage of the biliary tract; frequent biliary colic; calcified (radio-opaque) gallstones; impaired gallbladder contraction; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Dissolution of cholesterol gallstones (radiolucent, up to 15 mm, in a functioning gallbladder), primary biliary cholangitis, and hepatobiliary disease in cystic fibrosis in children.",
        "commonAdverseEffects": "Pasty stools or diarrhoea, upper right abdominal pain; rarely decompensation of advanced liver cirrhosis."
      },
      "packSize": "Pack size varies by market",
      "strength": "250 mg",
      "brandName": "Ursofalk 250 mg Capsules",
      "drugClass": "Bile acid",
      "dosageForm": "Capsule, hard",
      "genericName": "Ursodeoxycholic acid",
      "specialties": [
        "Gastroenterology",
        "Hepatology"
      ],
      "activeIngredients": [
        "Ursodeoxycholic acid"
      ]
    }
  ],
  "Galderma": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Differin",
          "title": "Differin (adapalene) — UK eMC SmPC search (Galderma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Apply a thin layer once daily at bedtime to clean, dry skin, avoiding the eyes, lips and nostrils. Improvement usually after 4–8 weeks.",
        "contraindications": "Hypersensitivity to adapalene or any excipient; pregnancy or planning pregnancy.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Acne vulgaris where comedones, papules and pustules predominate, on the face, chest or back.",
        "commonAdverseEffects": "Dry skin, redness, scaling, burning or stinging, especially in the first weeks; sensitivity to sunlight."
      },
      "packSize": "30 g tube",
      "strength": "0.1% w/w",
      "brandName": "Differin 0.1% Gel",
      "drugClass": "Topical retinoid",
      "dosageForm": "Gel",
      "genericName": "Adapalene",
      "specialties": [
        "Dermatology"
      ],
      "activeIngredients": [
        "Adapalene"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Epiduo",
          "title": "Epiduo (adapalene/benzoyl peroxide) — UK eMC SmPC search (Galderma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Apply a thin layer to the whole affected area once daily in the evening on clean, dry skin.",
        "contraindications": "Hypersensitivity to adapalene, benzoyl peroxide or any excipient; pregnancy or planning pregnancy.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Acne vulgaris when comedones, papules and pustules are present.",
        "commonAdverseEffects": "Dry skin, irritant dermatitis, redness, scaling, burning; sensitivity to sunlight. Benzoyl peroxide can bleach hair and coloured fabrics."
      },
      "packSize": "Tube or pump (size varies by market)",
      "strength": "0.1% / 2.5% w/w",
      "brandName": "Epiduo 0.1%/2.5% Gel",
      "drugClass": "Topical retinoid with antibacterial",
      "dosageForm": "Gel",
      "genericName": "Adapalene + Benzoyl peroxide",
      "specialties": [
        "Dermatology"
      ],
      "activeIngredients": [
        "Adapalene",
        "Benzoyl peroxide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous (nails)",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Loceryl",
          "title": "Loceryl (amorolfine) — UK eMC SmPC search (Galderma)"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Apply to the affected nails once or twice weekly after filing the nail surface; continue until the nail has regrown (about 6 months for fingernails, 9–12 months for toenails).",
        "contraindications": "Hypersensitivity to amorolfine or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Mild fungal nail infections (distal and lateral, up to two nails) caused by dermatophytes, yeasts or moulds.",
        "commonAdverseEffects": "Nail discolouration or brittleness, local burning or itching around the nail; rarely contact dermatitis."
      },
      "packSize": "Bottle with spatulas and nail files",
      "strength": "5% w/v",
      "brandName": "Loceryl 5% Medicated Nail Lacquer",
      "drugClass": "Antifungal (morpholine, topical)",
      "dosageForm": "Medicated nail lacquer",
      "genericName": "Amorolfine hydrochloride",
      "specialties": [
        "Dermatology"
      ],
      "activeIngredients": [
        "Amorolfine hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Rozex",
          "title": "Rozex (metronidazole) — UK eMC SmPC search (Galderma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Apply a thin film to the affected skin twice daily, morning and evening, usually for 3–4 months.",
        "contraindications": "Hypersensitivity to metronidazole or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Inflammatory papules, pustules and redness of rosacea.",
        "commonAdverseEffects": "Skin dryness, burning, irritation and redness at the application site; avoid contact with the eyes."
      },
      "packSize": "30 g tube",
      "strength": "0.75% w/w",
      "brandName": "Rozex 0.75% Gel",
      "drugClass": "Topical antibacterial (nitroimidazole)",
      "dosageForm": "Gel",
      "genericName": "Metronidazole",
      "specialties": [
        "Dermatology"
      ],
      "activeIngredients": [
        "Metronidazole"
      ]
    }
  ],
  "GE HealthCare": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravascular / intrathecal / oral / body cavities",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Omnipaque",
          "title": "Omnipaque (iohexol) — UK eMC SmPC search (GE HealthCare)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose and route depend on the examination, patient age and weight (see the SmPC tables). Ensure good hydration before and after intravascular use.",
        "contraindications": "Hypersensitivity to the contrast agent or any excipient; manifest thyrotoxicosis. Take special care with previous contrast reactions, asthma, renal impairment, diabetes treated with metformin, heart disease, myasthenia gravis and phaeochromocytoma.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "X-ray contrast for computed tomography, angiography, urography, myelography, arthrography and other radiological examinations in adults and children.",
        "commonAdverseEffects": "Feeling of warmth, nausea, vomiting, taste changes, headache; hypersensitivity reactions from urticaria to anaphylaxis (have resuscitation available); contrast-induced kidney injury (ensure hydration); delayed skin reactions; thyroid dysfunction."
      },
      "packSize": "Bottles (sizes vary)",
      "strength": "300 mg iodine/mL (647 mg iohexol/mL)",
      "brandName": "Omnipaque 300 mg I/mL Solution for Injection",
      "drugClass": "Iodinated X-ray contrast medium (non-ionic, low-osmolar)",
      "dosageForm": "Solution for injection",
      "genericName": "Iohexol",
      "specialties": [
        "Radiology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Iohexol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravascular / oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Omnipaque",
          "title": "Omnipaque (iohexol) — UK eMC SmPC search (GE HealthCare)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose depends on the examination, patient age and weight (see the SmPC tables). Ensure good hydration before and after intravascular use.",
        "contraindications": "Hypersensitivity to the contrast agent or any excipient; manifest thyrotoxicosis. Take special care with previous contrast reactions, asthma, renal impairment, diabetes treated with metformin, heart disease, myasthenia gravis and phaeochromocytoma.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "X-ray contrast for computed tomography, angiography and cardiac catheterisation, and urography in adults and children.",
        "commonAdverseEffects": "Feeling of warmth, nausea, vomiting, taste changes, headache; hypersensitivity reactions from urticaria to anaphylaxis (have resuscitation available); contrast-induced kidney injury (ensure hydration); delayed skin reactions; thyroid dysfunction."
      },
      "packSize": "Bottles (sizes vary)",
      "strength": "350 mg iodine/mL (755 mg iohexol/mL)",
      "brandName": "Omnipaque 350 mg I/mL Solution for Injection",
      "drugClass": "Iodinated X-ray contrast medium (non-ionic, low-osmolar)",
      "dosageForm": "Solution for injection",
      "genericName": "Iohexol",
      "specialties": [
        "Radiology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Iohexol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravascular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Visipaque",
          "title": "Visipaque (iodixanol) — UK eMC SmPC search (GE HealthCare)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose depends on the examination (see the SmPC tables). Ensure good hydration before and after use.",
        "contraindications": "Hypersensitivity to the contrast agent or any excipient; manifest thyrotoxicosis. Take special care with previous contrast reactions, asthma, renal impairment, diabetes treated with metformin, heart disease, myasthenia gravis and phaeochromocytoma.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "X-ray contrast for cardioangiography, cerebral and peripheral angiography, computed tomography and urography in adults.",
        "commonAdverseEffects": "Feeling of warmth, nausea, vomiting, taste changes, headache; hypersensitivity reactions from urticaria to anaphylaxis (have resuscitation available); contrast-induced kidney injury (ensure hydration); delayed skin reactions; thyroid dysfunction."
      },
      "packSize": "Bottles (sizes vary)",
      "strength": "320 mg iodine/mL",
      "brandName": "Visipaque 320 mg I/mL Solution for Injection",
      "drugClass": "Iodinated X-ray contrast medium (non-ionic, iso-osmolar)",
      "dosageForm": "Solution for injection",
      "genericName": "Iodixanol",
      "specialties": [
        "Radiology",
        "Cardiology"
      ],
      "activeIngredients": [
        "Iodixanol"
      ]
    }
  ],
  "GSK": [
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Boostrix",
          "title": "Boostrix (Tdap vaccine) — UK eMC SmPC search (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose IM as a booster; in pregnancy usually in the second or third trimester according to the national programme. Not for primary immunisation.",
        "contraindications": "Hypersensitivity; encephalopathy of unknown cause within 7 days after a previous pertussis vaccine; transient thrombocytopenia or neurological complications after an earlier diphtheria or tetanus vaccination; postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Booster vaccination against diphtheria, tetanus and pertussis from 4 years of age, including vaccination during pregnancy to protect the newborn from whooping cough.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, headache, fatigue, fever, irritability; extensive limb swelling after repeated doses."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Boostrix Suspension for Injection",
      "drugClass": "Bacterial vaccine (inactivated, adsorbed)",
      "dosageForm": "Suspension for injection",
      "genericName": "Diphtheria, tetanus and pertussis (acellular) vaccine, reduced antigen content (Tdap)",
      "specialties": [
        "General Practice / Family Medicine",
        "Obstetrics & Gynecology",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Diphtheria, tetanus and pertussis (acellular) vaccine, reduced antigen content (Tdap)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Engerix%20B",
          "title": "Engerix B (hepatitis B vaccine) — UK eMC SmPC search (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric vaccine. 0.5 mL IM (anterolateral thigh in infants) at 0, 1 and 6 months or according to the national schedule; babies of HBsAg-positive mothers start at birth with hepatitis B immunoglobulin.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against hepatitis B in newborns, infants, children and adolescents up to 15 years, including infants of HBsAg-positive mothers.",
        "commonAdverseEffects": "Injection-site pain and redness, irritability, fever, drowsiness, loss of appetite; rarely allergic reactions."
      },
      "packSize": "Single-dose vial or pre-filled syringe",
      "strength": "10 micrograms HBsAg/0.5 mL",
      "brandName": "Engerix-B 10 micrograms/0.5 mL Paediatric",
      "drugClass": "Viral vaccine (inactivated, recombinant)",
      "dosageForm": "Suspension for injection",
      "genericName": "Hepatitis B vaccine (rDNA, adsorbed)",
      "specialties": [
        "Pediatrics",
        "Neonatology",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Hepatitis B vaccine (rDNA, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Engerix%20B",
          "title": "Engerix B (hepatitis B vaccine) — UK eMC SmPC search (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "1 mL IM in the deltoid at 0, 1 and 6 months; accelerated schedules 0, 1, 2 and 12 months or 0, 7, 21 days plus 12 months. Higher or extra doses in dialysis and immunocompromised patients; check antibody response where needed.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against hepatitis B virus infection in non-immune adults and adolescents from 16 years (and from 11–15 years in a 2-dose schedule).",
        "commonAdverseEffects": "Injection-site pain and redness, fatigue, headache, irritability, fever, gastrointestinal symptoms; rarely allergic reactions."
      },
      "packSize": "Single-dose vial or pre-filled syringe",
      "strength": "20 micrograms HBsAg/1 mL",
      "brandName": "Engerix-B 20 micrograms/1 mL Suspension for Injection",
      "drugClass": "Viral vaccine (inactivated, recombinant)",
      "dosageForm": "Suspension for injection",
      "genericName": "Hepatitis B vaccine (rDNA, adsorbed)",
      "specialties": [
        "Infectious Diseases",
        "General Practice / Family Medicine",
        "Nephrology"
      ],
      "activeIngredients": [
        "Hepatitis B vaccine (rDNA, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Havrix",
          "title": "Havrix (hepatitis A vaccine) — UK eMC SmPC search (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 1 mL dose IM in the deltoid, with a booster dose 6–12 months later for long-term protection.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against hepatitis A in adults and adolescents from 16 years at risk of exposure.",
        "commonAdverseEffects": "Injection-site pain and redness, headache, fatigue, malaise, fever, loss of appetite, nausea."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1440 ELISA units/1 mL",
      "brandName": "Havrix 1440 Adult Suspension for Injection",
      "drugClass": "Viral vaccine (inactivated)",
      "dosageForm": "Suspension for injection",
      "genericName": "Hepatitis A vaccine (inactivated, adsorbed)",
      "specialties": [
        "Infectious Diseases",
        "General Practice / Family Medicine",
        "Hepatology"
      ],
      "activeIngredients": [
        "Hepatitis A vaccine (inactivated, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/infanrix-hexa",
          "title": "Infanrix hexa — EMA EPAR product information (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric vaccine. Primary series of 2 or 3 doses from 6 weeks of age at least 1 month apart (for example 2, 3, 4 or 2, 4, 6 months), then a booster at least 6 months after the last primary dose, according to the national schedule.",
        "contraindications": "Hypersensitivity to the vaccine or any excipient (including neomycin and polymyxin); encephalopathy of unknown cause within 7 days after a previous pertussis-containing vaccine; postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Primary vaccination and booster against diphtheria, tetanus, pertussis, hepatitis B, poliomyelitis and Hib disease in infants and toddlers.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, irritability, crying, drowsiness, loss of appetite; rarely febrile seizures, hypotonic-hyporesponsive episodes or allergic reactions."
      },
      "packSize": "Single dose (pre-filled syringe + vial)",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Infanrix hexa Powder and Suspension for Injection",
      "drugClass": "Combined bacterial and viral vaccine (inactivated)",
      "dosageForm": "Powder and suspension for suspension for injection",
      "genericName": "Diphtheria, tetanus, pertussis (acellular), hepatitis B, poliomyelitis (inactivated) and Haemophilus influenzae type b vaccine",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Diphtheria, tetanus, pertussis (acellular), hepatitis B, poliomyelitis (inactivated) and Haemophilus influenzae type b vaccine"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Subcutaneous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Priorix",
          "title": "Priorix (MMR vaccine) — UK eMC SmPC search (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Two doses at least 4 weeks apart, usually the first at 9–12 months and the second in the second year of life or before school entry, as per the national schedule.",
        "contraindications": "Hypersensitivity to the vaccine or any excipient (including neomycin); severe humoral or cellular immunodeficiency, including high-dose immunosuppressive therapy; pregnancy (avoid pregnancy for 1 month after vaccination); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against measles, mumps and rubella in children from 9 months (according to the national schedule), adolescents and adults.",
        "commonAdverseEffects": "Injection-site redness and pain, fever, rash, irritability; rarely febrile seizures, swollen glands or thrombocytopenia."
      },
      "packSize": "Single dose",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Priorix Powder and Solvent for Injection",
      "drugClass": "Viral vaccine (live attenuated)",
      "dosageForm": "Powder and solvent for solution for injection",
      "genericName": "Measles, mumps and rubella vaccine (live)",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Measles, mumps and rubella vaccine (live)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/rotarix",
          "title": "Rotarix — EMA EPAR product information (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric oral vaccine. Two doses at least 4 weeks apart, starting from 6 weeks of age; the course should be completed by 24 weeks of age. Never inject.",
        "contraindications": "Hypersensitivity; history of intussusception; uncorrected congenital gastrointestinal malformation that could predispose to intussusception; severe combined immunodeficiency; postpone in acute diarrhoea, vomiting or severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation of infants from 6 weeks of age to prevent gastroenteritis caused by rotavirus.",
        "commonAdverseEffects": "Irritability, diarrhoea, loss of appetite, vomiting; very rarely intussusception (usually within 7 days of the first dose)."
      },
      "packSize": "Single-dose oral applicator or tube",
      "strength": "1 dose (1.5 mL)",
      "brandName": "Rotarix Oral Suspension",
      "drugClass": "Viral vaccine (live attenuated)",
      "dosageForm": "Oral suspension",
      "genericName": "Rotavirus vaccine (live, oral)",
      "specialties": [
        "Pediatrics",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Rotavirus vaccine (live, oral)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/synflorix",
          "title": "Synflorix — EMA EPAR product information (GSK)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric vaccine. 3 primary doses (or 2 doses) from 6 weeks of age at least 1 month apart, plus a booster at least 6 months later, according to the national schedule; catch-up schedules for older children.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against invasive disease, pneumonia and acute otitis media caused by Streptococcus pneumoniae in infants and children from 6 weeks to 5 years.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, irritability, drowsiness, loss of appetite; rarely febrile seizures or allergic reactions."
      },
      "packSize": "Single-dose pre-filled syringe or vial",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Synflorix Suspension for Injection",
      "drugClass": "Bacterial vaccine (conjugate)",
      "dosageForm": "Suspension for injection",
      "genericName": "Pneumococcal polysaccharide conjugate vaccine (10-valent, adsorbed)",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Pneumococcal polysaccharide conjugate vaccine (10-valent, adsorbed)"
      ]
    }
  ],
  "Guerbet": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Dotarem",
          "title": "Dotarem (gadoteric acid) — UK eMC SmPC search (Guerbet)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Usually 0.1 mmol/kg (0.2 mL/kg) as an IV injection; use the lowest dose that gives adequate enhancement.",
        "contraindications": "Hypersensitivity to the gadolinium agent or any excipient. Use with care in severe renal impairment (risk of nephrogenic systemic fibrosis) and in patients with seizures.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Contrast enhancement in magnetic resonance imaging of the brain, spine and whole body, and MR angiography, in adults and children.",
        "commonAdverseEffects": "Headache, nausea, dizziness, taste disturbance, injection-site coldness or pain; hypersensitivity reactions (rarely severe); nephrogenic systemic fibrosis in severe renal impairment (very rare with macrocyclic agents)."
      },
      "packSize": "Vials and pre-filled syringes (sizes vary)",
      "strength": "0.5 mmol/mL",
      "brandName": "Dotarem 0.5 mmol/mL Solution for Injection",
      "drugClass": "Gadolinium-based MRI contrast agent (macrocyclic)",
      "dosageForm": "Solution for injection",
      "genericName": "Gadoteric acid (gadoterate meglumine)",
      "specialties": [
        "Radiology",
        "Neurology"
      ],
      "activeIngredients": [
        "Gadoteric acid (gadoterate meglumine)"
      ]
    }
  ],
  "Haleon": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Lamisil%20cream",
          "title": "Lamisil cream (terbinafine) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Apply once or twice daily to the affected and surrounding skin for 1–2 weeks depending on the infection.",
        "contraindications": "Hypersensitivity to terbinafine or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Fungal skin infections: athlete's foot (tinea pedis), jock itch (tinea cruris), ringworm (tinea corporis) and cutaneous candidiasis.",
        "commonAdverseEffects": "Local irritation, redness, itching, burning or skin peeling at the application site."
      },
      "packSize": "Tube (size varies by market)",
      "strength": "1% w/w",
      "brandName": "Lamisil 1% Cream",
      "drugClass": "Antifungal (allylamine, topical)",
      "dosageForm": "Cream",
      "genericName": "Terbinafine hydrochloride",
      "specialties": [
        "Dermatology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Terbinafine hydrochloride"
      ]
    }
  ],
  "Kenvue": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oromucosal",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Daktarin%20oral%20gel",
          "title": "Daktarin oral gel (miconazole) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and children from 2 years: 2.5 mL four times daily after meals. Infants 4–24 months: 1.25 mL four times daily, applied in small portions with a clean finger. Continue for at least a week after symptoms clear.",
        "contraindications": "Hypersensitivity; infants under 4 months or with an immature swallowing reflex; liver dysfunction; use with medicines metabolised by CYP3A4 that prolong QT or are sensitive (for example simvastatin, lovastatin, oral midazolam, triazolam).",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Treatment of fungal infections of the mouth and throat (oral thrush) in adults and infants from 4 months.",
        "commonAdverseEffects": "Nausea, vomiting, taste changes, dry mouth, oral discomfort. Choking risk in infants if applied carelessly. Strongly increases the effect of warfarin (risk of bleeding)."
      },
      "packSize": "Tube (size varies by market)",
      "strength": "20 mg/g",
      "brandName": "Daktarin 20 mg/g Oral Gel",
      "drugClass": "Antifungal (imidazole)",
      "dosageForm": "Oral gel",
      "genericName": "Miconazole",
      "specialties": [
        "General Practice / Family Medicine",
        "Pediatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Miconazole"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Imodium",
          "title": "Imodium (loperamide) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Acute diarrhoea: 4 mg initially, then 2 mg after each loose stool; usual maximum 12 mg (6 capsules) per day without medical advice, never more than 16 mg per day.",
        "contraindications": "Children under 12 years (capsules); acute dysentery with blood in stools and high fever; acute ulcerative colitis; antibiotic-associated (pseudomembranous) colitis; bacterial enterocolitis (Salmonella, Shigella, Campylobacter); when constipation or ileus must be avoided; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Symptomatic treatment of acute diarrhoea and of chronic diarrhoea in adults.",
        "commonAdverseEffects": "Constipation, flatulence, headache, nausea, dizziness. Serious heart rhythm problems with doses far above the recommended dose."
      },
      "packSize": "Pack size varies by market",
      "strength": "2 mg",
      "brandName": "Imodium 2 mg Capsules",
      "drugClass": "Antidiarrhoeal (peripheral opioid receptor agonist)",
      "dosageForm": "Capsule, hard",
      "genericName": "Loperamide hydrochloride",
      "specialties": [
        "Gastroenterology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Loperamide hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Nizoral%20cream",
          "title": "Nizoral (ketoconazole) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Apply once or twice daily to the affected and surrounding skin; continue for a few days after the symptoms clear (usually 2–6 weeks depending on the infection).",
        "contraindications": "Hypersensitivity to ketoconazole or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Fungal skin infections: tinea corporis, cruris, manus and pedis, cutaneous candidiasis, pityriasis versicolor, and seborrhoeic dermatitis.",
        "commonAdverseEffects": "Local burning, itching, redness or irritation at the application site; rarely contact dermatitis."
      },
      "packSize": "Tube (size varies by market)",
      "strength": "2% w/w",
      "brandName": "Nizoral 2% Cream",
      "drugClass": "Antifungal (imidazole, topical)",
      "dosageForm": "Cream",
      "genericName": "Ketoconazole",
      "specialties": [
        "Dermatology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Ketoconazole"
      ]
    }
  ],
  "MSD": [
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/gardasil-9",
          "title": "Gardasil 9 — EMA EPAR product information (MSD)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Age 9–14 years: 2 doses (second 5–13 months after the first) or 3 doses. From 15 years: 3 doses at 0, 2 and 6 months. Observe for 15 minutes after vaccination (fainting).",
        "contraindications": "Hypersensitivity to the vaccine or any excipient (including yeast); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Prevention of HPV-related precancerous lesions and cancers of the cervix, vulva, vagina and anus, and of genital warts, from 9 years of age.",
        "commonAdverseEffects": "Injection-site pain, swelling and redness, headache, dizziness, fever, nausea; fainting after injection, especially in adolescents."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Gardasil 9 Suspension for Injection",
      "drugClass": "Viral vaccine (recombinant)",
      "dosageForm": "Suspension for injection",
      "genericName": "Human papillomavirus 9-valent vaccine (recombinant, adsorbed)",
      "specialties": [
        "Obstetrics & Gynecology",
        "Pediatrics",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Human papillomavirus 9-valent vaccine (recombinant, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular / subcutaneous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/mmrvaxpro",
          "title": "M-M-RvaxPro — EMA EPAR product information (MSD)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Two doses at least 4 weeks apart according to the national schedule.",
        "contraindications": "Hypersensitivity to the vaccine or any excipient (including neomycin); severe humoral or cellular immunodeficiency, including high-dose immunosuppressive therapy; pregnancy (avoid pregnancy for 1 month after vaccination); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Vaccination against measles, mumps and rubella from 12 months of age (from 9 months in outbreaks or special circumstances).",
        "commonAdverseEffects": "Fever, injection-site redness and pain, rash; rarely febrile seizures, swollen glands, joint pain or thrombocytopenia."
      },
      "packSize": "Single dose",
      "strength": "1 dose (0.5 mL)",
      "brandName": "M-M-RvaxPro Powder and Solvent for Injection",
      "drugClass": "Viral vaccine (live attenuated)",
      "dosageForm": "Powder and solvent for suspension for injection",
      "genericName": "Measles, mumps and rubella vaccine (live)",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Measles, mumps and rubella vaccine (live)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular / subcutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Pneumovax%2023",
          "title": "Pneumovax 23 — UK eMC SmPC search (MSD)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose. Revaccination is considered only for people at highest risk, usually not sooner than 3–5 years after the first dose.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against pneumococcal disease in people from 2 years of age at increased risk and in older adults, according to national recommendations.",
        "commonAdverseEffects": "Injection-site pain, redness, swelling and warmth, fever, muscle pain, fatigue."
      },
      "packSize": "Single-dose pre-filled syringe or vial",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Pneumovax 23 Solution for Injection",
      "drugClass": "Bacterial vaccine (polysaccharide)",
      "dosageForm": "Solution for injection",
      "genericName": "Pneumococcal polysaccharide vaccine (23-valent)",
      "specialties": [
        "Internal Medicine",
        "Pulmonology",
        "Geriatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Pneumococcal polysaccharide vaccine (23-valent)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/rotateq",
          "title": "RotaTeq — EMA EPAR product information (MSD)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric oral vaccine. Three doses at least 4 weeks apart, starting at 6–12 weeks of age; the course should be completed by 32 weeks of age. Never inject.",
        "contraindications": "Hypersensitivity; history of intussusception; congenital gastrointestinal malformation that could predispose to intussusception; severe combined immunodeficiency; postpone in acute diarrhoea, vomiting or febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation of infants from 6 weeks of age to prevent gastroenteritis caused by rotavirus.",
        "commonAdverseEffects": "Diarrhoea, vomiting, fever, irritability; very rarely intussusception."
      },
      "packSize": "Single-dose squeezable tube",
      "strength": "1 dose (2 mL)",
      "brandName": "RotaTeq Oral Solution",
      "drugClass": "Viral vaccine (live)",
      "dosageForm": "Oral solution",
      "genericName": "Rotavirus vaccine (live, oral, pentavalent)",
      "specialties": [
        "Pediatrics",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Rotavirus vaccine (live, oral, pentavalent)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Subcutaneous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Varivax",
          "title": "Varivax (varicella vaccine) — UK eMC SmPC search (MSD)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Two doses at least 4 weeks apart (from 12 months of age), according to the national schedule.",
        "contraindications": "Hypersensitivity to the vaccine, gelatin or neomycin; blood dyscrasias, leukaemia or lymphomas; immunosuppressive therapy or severe immunodeficiency; active untreated tuberculosis; pregnancy (avoid for 1 month after); postpone in febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Vaccination against chickenpox (varicella) from 12 months of age, and of susceptible adolescents and adults.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, varicella-like rash; rarely transmission of vaccine virus to contacts."
      },
      "packSize": "Single dose",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Varivax Powder and Solvent for Injection",
      "drugClass": "Viral vaccine (live attenuated)",
      "dosageForm": "Powder and solvent for suspension for injection",
      "genericName": "Varicella vaccine (live)",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Varicella vaccine (live)"
      ]
    }
  ],
  "Mundipharma": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Betadine",
          "title": "Betadine (povidone-iodine) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Apply undiluted to the area and allow to dry; may be covered with a dressing. Avoid prolonged use on large areas.",
        "contraindications": "Hypersensitivity to iodine or povidone; thyroid disease such as hyperthyroidism; before or after radio-iodine treatment; dermatitis herpetiformis; regular use in newborns and very low birth weight infants.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Skin disinfection before surgery, injections and procedures, and antiseptic treatment of minor wounds, cuts, abrasions and burns.",
        "commonAdverseEffects": "Skin irritation, rarely allergic reactions; iodine absorption with long-term use on large areas, damaged skin or mucosa (may affect thyroid function)."
      },
      "packSize": "Bottle (size varies)",
      "strength": "10% w/v",
      "brandName": "Betadine 10% Antiseptic Solution",
      "drugClass": "Antiseptic (iodophor)",
      "dosageForm": "Cutaneous solution",
      "genericName": "Povidone-iodine",
      "specialties": [
        "General Surgery",
        "Dermatology",
        "Emergency Medicine"
      ],
      "activeIngredients": [
        "Povidone-iodine"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=MST%20Continus",
          "title": "MST Continus (morphine) — UK eMC SmPC search (Mundipharma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Every 12 hours. Dose depends on pain severity and previous opioid use; titrate carefully (opioid-naive adults often start with 10–20 mg every 12 hours). Swallow whole; do not crush or chew.",
        "contraindications": "Hypersensitivity; respiratory depression; head injury; paralytic ileus; acute abdomen; delayed gastric emptying; obstructive airways disease; acute liver disease; use with or within 2 weeks of MAO inhibitors.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prolonged relief of severe and intractable pain, including cancer pain.",
        "commonAdverseEffects": "Constipation, nausea, vomiting, drowsiness, confusion, dry mouth, sweating, itching; respiratory depression (especially with benzodiazepines or alcohol), dependence and misuse."
      },
      "packSize": "Pack size varies by market",
      "strength": "10 mg",
      "brandName": "MST Continus 10 mg Tablets",
      "drugClass": "Opioid analgesic (prolonged-release)",
      "dosageForm": "Prolonged-release tablet",
      "genericName": "Morphine sulfate",
      "specialties": [
        "Oncology",
        "Anesthesiology",
        "Internal Medicine"
      ],
      "activeIngredients": [
        "Morphine sulfate"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=OxyContin",
          "title": "OxyContin (oxycodone) — UK eMC SmPC search (Mundipharma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Every 12 hours. Opioid-naive adults usually start with 10 mg every 12 hours, titrated to response. Swallow whole; do not crush, chew or dissolve.",
        "contraindications": "Hypersensitivity; severe respiratory depression; severe chronic obstructive lung disease, cor pulmonale or severe bronchial asthma; raised carbon dioxide levels; paralytic ileus; acute abdomen; delayed gastric emptying.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Severe pain that can only be adequately managed with an opioid analgesic.",
        "commonAdverseEffects": "Constipation, nausea, vomiting, somnolence, dizziness, itching, headache, sweating; respiratory depression, dependence and misuse."
      },
      "packSize": "Pack size varies by market",
      "strength": "10 mg",
      "brandName": "OxyContin 10 mg Tablets",
      "drugClass": "Opioid analgesic (prolonged-release)",
      "dosageForm": "Prolonged-release tablet",
      "genericName": "Oxycodone hydrochloride",
      "specialties": [
        "Oncology",
        "Anesthesiology",
        "Orthopedics"
      ],
      "activeIngredients": [
        "Oxycodone hydrochloride"
      ]
    }
  ],
  "Novartis": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Ocular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/azopt",
          "title": "Azopt (brinzolamide) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One drop in the affected eye(s) twice daily (some patients three times daily). Shake well before use.",
        "contraindications": "Hypersensitivity to brinzolamide, sulphonamides or any excipient; severe renal impairment (creatinine clearance below 30 mL/min); hyperchloraemic acidosis.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Reduction of raised intraocular pressure in ocular hypertension and open-angle glaucoma, alone or added to a beta-blocker or prostaglandin analogue.",
        "commonAdverseEffects": "Blurred vision after instillation, bitter taste, eye irritation and discomfort, headache, dry mouth."
      },
      "packSize": "5 mL bottle",
      "strength": "10 mg/mL",
      "brandName": "Azopt 10 mg/mL Eye Drops",
      "drugClass": "Carbonic anhydrase inhibitor (topical, glaucoma)",
      "dosageForm": "Eye drops, suspension",
      "genericName": "Brinzolamide",
      "specialties": [
        "Ophthalmology"
      ],
      "activeIngredients": [
        "Brinzolamide"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Subcutaneous / intravenous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Desferal",
          "title": "Desferal (deferoxamine) — UK eMC SmPC search (Novartis)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Chronic iron overload: usually 20–60 mg/kg/day by slow subcutaneous infusion over 8–12 hours on 5–7 nights a week, adjusted to iron levels. Acute iron poisoning: IV infusion up to 15 mg/kg/hour. Monitor eyes and hearing regularly.",
        "contraindications": "Hypersensitivity to deferoxamine, unless desensitisation is possible.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Chronic iron overload (for example transfusion-dependent thalassaemia), acute iron poisoning, and aluminium overload in end-stage kidney disease.",
        "commonAdverseEffects": "Injection-site pain and swelling, joint and muscle pain, headache, urticaria, nausea, fever, reddish-brown urine; visual and hearing disturbances at high doses, growth retardation in children, Yersinia and mucormycosis infections."
      },
      "packSize": "Vials (pack size varies)",
      "strength": "500 mg",
      "brandName": "Desferal 500 mg Powder for Injection",
      "drugClass": "Iron chelating agent",
      "dosageForm": "Powder for solution for injection",
      "genericName": "Deferoxamine mesilate",
      "specialties": [
        "Hematology",
        "Pediatrics",
        "Nephrology"
      ],
      "activeIngredients": [
        "Deferoxamine mesilate"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Ocular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/duotrav",
          "title": "DuoTrav (travoprost/timolol) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One drop in the affected eye(s) once daily, at the same time each day (morning or evening).",
        "contraindications": "Hypersensitivity, including to other beta-blockers; asthma or history of asthma, severe COPD; sinus bradycardia, sick sinus syndrome, second- or third-degree AV block; overt heart failure or cardiogenic shock; severe allergic rhinitis; corneal dystrophies.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Reduction of intraocular pressure in open-angle glaucoma or ocular hypertension not adequately controlled by a beta-blocker or a prostaglandin analogue alone.",
        "commonAdverseEffects": "Eye redness and irritation, iris pigmentation and eyelash changes; systemic beta-blocker effects such as bradycardia, hypotension and bronchospasm."
      },
      "packSize": "2.5 mL bottle",
      "strength": "40 micrograms/mL / 5 mg/mL",
      "brandName": "DuoTrav 40 micrograms/mL + 5 mg/mL Eye Drops",
      "drugClass": "Prostaglandin analogue with beta-blocker (glaucoma)",
      "dosageForm": "Eye drops, solution",
      "genericName": "Travoprost + Timolol",
      "specialties": [
        "Ophthalmology"
      ],
      "activeIngredients": [
        "Travoprost",
        "Timolol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Lamisil%20tablets",
          "title": "Lamisil (terbinafine) — UK eMC SmPC search (Novartis)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "250 mg once daily. Skin infections: 2–6 weeks. Nail infections: usually 6 weeks (fingernails) to 12 weeks or longer (toenails).",
        "contraindications": "Hypersensitivity to terbinafine; chronic or active liver disease. Not recommended in significant renal impairment.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Fungal nail infections (onychomycosis) caused by dermatophytes, and ringworm (tinea corporis, cruris, pedis) when oral treatment is needed.",
        "commonAdverseEffects": "Headache, GI upset, loss of appetite, rash, joint and muscle pain, taste disturbance; rarely liver failure, blood disorders and severe skin reactions. Check liver function before starting."
      },
      "packSize": "Pack size varies by market",
      "strength": "250 mg",
      "brandName": "Lamisil 250 mg Tablets",
      "drugClass": "Antifungal (allylamine)",
      "dosageForm": "Tablet",
      "genericName": "Terbinafine hydrochloride",
      "specialties": [
        "Dermatology",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Terbinafine hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Ocular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/travatan",
          "title": "Travatan (travoprost) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One drop in the affected eye(s) once daily, in the evening. Separate from other eye drops by at least 5 minutes.",
        "contraindications": "Hypersensitivity to travoprost or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Reduction of raised intraocular pressure in ocular hypertension and open-angle glaucoma in adults, and in children from 2 months.",
        "commonAdverseEffects": "Eye redness, gradual increase in brown iris pigmentation, eyelash changes, eye irritation, pain or itching, dry eye, darkening of eyelid skin."
      },
      "packSize": "2.5 mL bottle",
      "strength": "40 micrograms/mL",
      "brandName": "Travatan 40 micrograms/mL Eye Drops",
      "drugClass": "Prostaglandin analogue (glaucoma)",
      "dosageForm": "Eye drops, solution",
      "genericName": "Travoprost",
      "specialties": [
        "Ophthalmology"
      ],
      "activeIngredients": [
        "Travoprost"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Zofran%20injection",
          "title": "Zofran (ondansetron) — UK eMC SmPC search (Novartis)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Chemotherapy: 8 mg by slow IV injection (over at least 30 seconds) or infusion immediately before treatment; single IV doses must not exceed 16 mg. Postoperative: 4 mg IV or IM at induction or for treatment.",
        "contraindications": "Hypersensitivity to ondansetron or other 5-HT3 antagonists; use with apomorphine.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention and treatment of nausea and vomiting caused by chemotherapy and radiotherapy, and of postoperative nausea and vomiting.",
        "commonAdverseEffects": "Headache, flushing, constipation, injection-site reactions; QT prolongation (dose-dependent), serotonin syndrome; rarely hypersensitivity reactions."
      },
      "packSize": "2 mL ampoules",
      "strength": "4 mg/2 mL",
      "brandName": "Zofran 4 mg/2 mL Injection",
      "drugClass": "Antiemetic (5-HT3 antagonist)",
      "dosageForm": "Solution for injection",
      "genericName": "Ondansetron",
      "specialties": [
        "Oncology",
        "Anesthesiology",
        "Emergency Medicine"
      ],
      "activeIngredients": [
        "Ondansetron"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Zofran",
          "title": "Zofran (ondansetron) — UK eMC SmPC search (Novartis)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Chemotherapy: 8 mg 1–2 hours before treatment and 8 mg 12 hours later, then 8 mg twice daily for up to 5 days. Postoperative: 16 mg one hour before anaesthesia. Maximum 8 mg per day in moderate or severe hepatic impairment.",
        "contraindications": "Hypersensitivity to ondansetron or other 5-HT3 antagonists; use with apomorphine.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of nausea and vomiting caused by chemotherapy and radiotherapy, and prevention of postoperative nausea and vomiting.",
        "commonAdverseEffects": "Headache, flushing or warm sensation, constipation; QT prolongation, serotonin syndrome with serotonergic medicines; rarely hypersensitivity reactions."
      },
      "packSize": "Pack size varies by market",
      "strength": "8 mg",
      "brandName": "Zofran 8 mg Tablets",
      "drugClass": "Antiemetic (5-HT3 antagonist)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Ondansetron",
      "specialties": [
        "Oncology",
        "Anesthesiology",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Ondansetron"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/zometa",
          "title": "Zometa (zoledronic acid) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "4 mg in 100 mL diluent by IV infusion over at least 15 minutes every 3–4 weeks, with calcium and vitamin D supplements. Lower doses in mild to moderate renal impairment; check creatinine before each dose.",
        "contraindications": "Hypersensitivity to zoledronic acid or other bisphosphonates; pregnancy and breastfeeding.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of skeletal-related events in adults with advanced cancer involving bone, and treatment of tumour-induced hypercalcaemia.",
        "commonAdverseEffects": "Acute-phase reaction (fever, flu-like symptoms, bone pain), hypocalcaemia, hypophosphataemia, renal impairment, anaemia, nausea; osteonecrosis of the jaw (dental check before starting) and atypical femoral fractures."
      },
      "packSize": "5 mL vial",
      "strength": "4 mg/5 mL",
      "brandName": "Zometa 4 mg/5 mL Concentrate",
      "drugClass": "Bisphosphonate",
      "dosageForm": "Concentrate for solution for infusion",
      "genericName": "Zoledronic acid",
      "specialties": [
        "Oncology",
        "Hematology",
        "Endocrinology"
      ],
      "activeIngredients": [
        "Zoledronic acid"
      ]
    }
  ],
  "Octapharma": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Albunorm",
          "title": "Albunorm (human albumin) — UK eMC SmPC search (Octapharma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dose and rate depend on the patient's condition and needs; monitor blood pressure, heart rate and fluid status to avoid circulatory overload.",
        "contraindications": "Hypersensitivity to albumin preparations or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Restoration and maintenance of circulating blood volume where volume deficiency has been shown and a colloid is appropriate (for example in hypoalbuminaemia, burns, paracentesis and surgery).",
        "commonAdverseEffects": "Rarely flushing, urticaria, fever, nausea; very rarely anaphylaxis; circulatory overload if given too fast or too much."
      },
      "packSize": "50 mL and 100 mL bottles",
      "strength": "200 g/L",
      "brandName": "Albunorm 20% Solution for Infusion",
      "drugClass": "Plasma protein (colloid volume expander)",
      "dosageForm": "Solution for infusion",
      "genericName": "Human albumin",
      "specialties": [
        "Critical Care",
        "Hepatology",
        "Nephrology",
        "General Surgery"
      ],
      "activeIngredients": [
        "Human albumin"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Octagam",
          "title": "Octagam (human normal immunoglobulin) — UK eMC SmPC search (Octapharma)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Specialist use. Primary immunodeficiency: 0.4–0.8 g/kg, then 0.2–0.8 g/kg every 3–4 weeks. ITP: 0.8–1 g/kg on day 1, or 0.4 g/kg daily for 2–5 days. Guillain-Barré: 0.4 g/kg daily for 5 days. Kawasaki disease: 2 g/kg once. Infuse slowly at first.",
        "contraindications": "Hypersensitivity to human immunoglobulins or any excipient, especially in IgA deficiency with antibodies against IgA.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Replacement therapy in primary and secondary immunodeficiency with severe or recurrent infections; immunomodulation in immune thrombocytopenia, Guillain-Barré syndrome, Kawasaki disease, CIDP and dermatomyositis.",
        "commonAdverseEffects": "Headache, chills, fever, nausea, back pain, fatigue, infusion reactions; rarely thromboembolism, acute kidney injury, aseptic meningitis and haemolytic anaemia."
      },
      "packSize": "Bottles (size varies)",
      "strength": "100 mg/mL",
      "brandName": "Octagam 10% Solution for Infusion",
      "drugClass": "Immunoglobulin",
      "dosageForm": "Solution for infusion",
      "genericName": "Human normal immunoglobulin (IVIg)",
      "specialties": [
        "Immunology",
        "Hematology",
        "Neurology",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Human normal immunoglobulin (IVIg)"
      ]
    }
  ],
  "Opella": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/referrals/ambroxol-bromhexine-containing-medicines",
          "title": "Bromhexine — EMA safety review of ambroxol- and bromhexine-containing medicines"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and adolescents from 12 years: 8–16 mg three times daily.",
        "contraindications": "Hypersensitivity to bromhexine or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Productive cough with thick mucus in acute and chronic bronchopulmonary disease.",
        "commonAdverseEffects": "Nausea, abdominal pain, diarrhoea, rash; rarely severe allergic and skin reactions (stop at the first sign). Caution in peptic ulcer."
      },
      "packSize": "Pack size varies by market",
      "strength": "8 mg",
      "brandName": "Bisolvon 8 mg Tablets",
      "drugClass": "Mucolytic",
      "dosageForm": "Tablet",
      "genericName": "Bromhexine hydrochloride",
      "specialties": [
        "Pulmonology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Bromhexine hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Dulcolax",
          "title": "Dulcolax (bisacodyl) — UK eMC SmPC search"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and children over 10 years: 5–10 mg at night. Swallow whole; do not take with milk or antacids. Do not use daily for long periods without medical advice.",
        "contraindications": "Ileus or intestinal obstruction; acute abdominal conditions such as appendicitis; acute inflammatory bowel disease; severe abdominal pain with nausea and vomiting; severe dehydration; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Short-term relief of constipation and bowel preparation before procedures as directed.",
        "commonAdverseEffects": "Abdominal cramps and pain, diarrhoea, nausea; with misuse, fluid and electrolyte loss."
      },
      "packSize": "Pack size varies by market",
      "strength": "5 mg",
      "brandName": "Dulcolax 5 mg Gastro-resistant Tablets",
      "drugClass": "Stimulant laxative",
      "dosageForm": "Gastro-resistant tablet",
      "genericName": "Bisacodyl",
      "specialties": [
        "Gastroenterology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Bisacodyl"
      ]
    }
  ],
  "Organon": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/aerius",
          "title": "Aerius (desloratadine) — EMA EPAR product information (Organon)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "5 mg once daily, with or without food.",
        "contraindications": "Hypersensitivity to desloratadine, loratadine or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Relief of the symptoms of allergic rhinitis and urticaria in adults and adolescents from 12 years.",
        "commonAdverseEffects": "Fatigue, dry mouth, headache; rarely tachycardia, raised liver enzymes, hypersensitivity reactions."
      },
      "packSize": "Pack size varies by market",
      "strength": "5 mg",
      "brandName": "Aerius 5 mg Tablets",
      "drugClass": "Non-sedating H1 antihistamine",
      "dosageForm": "Film-coated tablet",
      "genericName": "Desloratadine",
      "specialties": [
        "Allergy & Immunology",
        "Dermatology",
        "ENT (Otolaryngology)"
      ],
      "activeIngredients": [
        "Desloratadine"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Remeron",
          "title": "Remeron (mirtazapine) — US prescribing information, DailyMed search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "15–45 mg once daily, preferably at bedtime; start with 15 or 30 mg. Continue for at least 6 months after symptoms resolve.",
        "contraindications": "Hypersensitivity to mirtazapine or any excipient; use with MAO inhibitors.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Major depressive episodes in adults.",
        "commonAdverseEffects": "Increased appetite and weight gain, somnolence and sedation, headache, dry mouth, dizziness, oedema. Rarely agranulocytosis, hyponatraemia, severe skin reactions; monitor for suicidal thoughts."
      },
      "packSize": "Pack size varies by market",
      "strength": "30 mg",
      "brandName": "Remeron 30 mg Tablets",
      "drugClass": "Antidepressant (noradrenergic and specific serotonergic, NaSSA)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Mirtazapine",
      "specialties": [
        "Psychiatry"
      ],
      "activeIngredients": [
        "Mirtazapine"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Sustanon",
          "title": "Sustanon (testosterone esters) — UK eMC SmPC search (Organon)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Usually 1 mL by deep intramuscular injection every 3 weeks, adjusted to response and testosterone levels. Monitor haematocrit and PSA.",
        "contraindications": "Androgen-dependent cancer of the prostate or male breast; hypersensitivity, including to peanut or soya (contains arachis oil); use in women.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Testosterone replacement in male hypogonadism (primary or secondary).",
        "commonAdverseEffects": "Polycythaemia, acne, injection-site reactions, fluid retention, raised PSA, mood changes, hypertension."
      },
      "packSize": "1 mL ampoule",
      "strength": "250 mg/mL",
      "brandName": "Sustanon 250 mg/mL Injection",
      "drugClass": "Androgen",
      "dosageForm": "Solution for injection",
      "genericName": "Testosterone esters (propionate, phenylpropionate, isocaproate, decanoate)",
      "specialties": [
        "Endocrinology",
        "Andrology",
        "Urology"
      ],
      "activeIngredients": [
        "Testosterone esters (propionate, phenylpropionate, isocaproate, decanoate)"
      ]
    }
  ],
  "Pfizer": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous / intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Ativan%20injection",
          "title": "Ativan (lorazepam) injection — UK eMC SmPC search (Pfizer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Status epilepticus: 4 mg by slow IV injection into a large vein (dilute first), repeated once after 10 minutes if needed. Premedication: about 0.05 mg/kg IV 30–45 minutes before the procedure. Resuscitation equipment must be available.",
        "contraindications": "Hypersensitivity to benzodiazepines or any excipient; severe respiratory insufficiency (except in the emergency treatment of seizures); sleep apnoea; severe hepatic insufficiency; myasthenia gravis.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Protect from light.",
        "approvedIndications": "Status epilepticus, premedication before surgery or procedures, and acute anxiety or agitation.",
        "commonAdverseEffects": "Sedation, drowsiness, respiratory depression, hypotension, confusion, amnesia, injection-site pain; dependence with repeated use. Additive effects with opioids and alcohol."
      },
      "packSize": "1 mL ampoules",
      "strength": "4 mg/mL",
      "brandName": "Ativan 4 mg/mL Injection",
      "drugClass": "Benzodiazepine",
      "dosageForm": "Solution for injection",
      "genericName": "Lorazepam",
      "specialties": [
        "Emergency Medicine",
        "Neurology",
        "Anesthesiology",
        "Critical Care"
      ],
      "activeIngredients": [
        "Lorazepam"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Cyklokapron%20injection",
          "title": "Cyklokapron (tranexamic acid) — UK eMC SmPC search (Pfizer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults: 0.5–1 g by slow IV injection (about 1 mL per minute) two or three times daily, or as directed for the indication. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity; acute venous or arterial thrombosis; fibrinolysis due to consumption coagulopathy (except predominant fibrinolysis); severe renal impairment; history of convulsions; intrathecal or intraventricular injection.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention and treatment of bleeding due to general or local fibrinolysis, including surgery, trauma and obstetric haemorrhage.",
        "commonAdverseEffects": "Nausea, vomiting, diarrhoea, hypotension with fast injection; rarely convulsions, visual disturbances and thromboembolic events."
      },
      "packSize": "5 mL ampoules",
      "strength": "500 mg/5 mL",
      "brandName": "Cyklokapron 100 mg/mL Injection",
      "drugClass": "Antifibrinolytic",
      "dosageForm": "Solution for injection",
      "genericName": "Tranexamic acid",
      "specialties": [
        "Emergency Medicine",
        "Anesthesiology",
        "Obstetrics & Gynecology",
        "General Surgery"
      ],
      "activeIngredients": [
        "Tranexamic acid"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Cyklokapron",
          "title": "Cyklokapron (tranexamic acid) — UK eMC SmPC search (Pfizer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Usually 1–1.5 g two or three times daily. Heavy menstrual bleeding: 1 g three times daily for up to 4 days from the start of bleeding. Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity; active thromboembolic disease; history of venous or arterial thrombosis; severe renal impairment; history of convulsions.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Heavy menstrual bleeding, nosebleeds, bleeding after prostate surgery or dental extraction in haemophilia, and hereditary angioedema.",
        "commonAdverseEffects": "Nausea, vomiting, diarrhoea; rarely visual disturbances, allergic skin reactions and thromboembolic events."
      },
      "packSize": "Pack size varies by market",
      "strength": "500 mg",
      "brandName": "Cyklokapron 500 mg Tablets",
      "drugClass": "Antifibrinolytic",
      "dosageForm": "Film-coated tablet",
      "genericName": "Tranexamic acid",
      "specialties": [
        "Hematology",
        "Obstetrics & Gynecology",
        "ENT (Otolaryngology)"
      ],
      "activeIngredients": [
        "Tranexamic acid"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Cytotec",
          "title": "Cytotec (misoprostol) — US prescribing information, DailyMed search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Treatment: 800 micrograms daily in 2–4 divided doses with meals for 4–8 weeks. Prevention: 200 micrograms two to four times daily with the NSAID.",
        "contraindications": "Pregnancy or planned pregnancy (can cause abortion, birth defects and uterine rupture); hypersensitivity to prostaglandins. Women of childbearing age must use effective contraception.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Healing of duodenal and gastric ulcers, including those caused by NSAIDs, and prevention of NSAID-induced ulcers.",
        "commonAdverseEffects": "Diarrhoea, abdominal pain, nausea, flatulence, dyspepsia; abnormal uterine bleeding."
      },
      "packSize": "Pack size varies by market",
      "strength": "200 micrograms",
      "brandName": "Cytotec 200 microgram Tablets",
      "drugClass": "Prostaglandin E1 analogue (gastroprotective)",
      "dosageForm": "Tablet",
      "genericName": "Misoprostol",
      "specialties": [
        "Gastroenterology",
        "Rheumatology"
      ],
      "activeIngredients": [
        "Misoprostol"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=tinidazole",
          "title": "Tinidazole — US prescribing information, DailyMed search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Trichomoniasis, giardiasis, bacterial vaginosis: 2 g as a single dose with food. Anaerobic infections: 2 g on day 1, then 1 g daily for 5–6 days.",
        "contraindications": "Hypersensitivity to tinidazole or other nitroimidazoles; first trimester of pregnancy; breastfeeding; organic neurological disorders; history of blood disorders.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Trichomoniasis, giardiasis, amoebiasis, bacterial vaginosis, anaerobic infections and prevention of postoperative anaerobic infection; part of Helicobacter pylori eradication.",
        "commonAdverseEffects": "Metallic taste, nausea, loss of appetite, abdominal pain, headache, dizziness. Avoid alcohol during and for 3 days after treatment (disulfiram-like reaction)."
      },
      "packSize": "Pack size varies by market",
      "strength": "500 mg",
      "brandName": "Fasigyn 500 mg Tablets",
      "drugClass": "Antiprotozoal and antibacterial (nitroimidazole)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Tinidazole",
      "specialties": [
        "Infectious Diseases",
        "Obstetrics & Gynecology",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Tinidazole"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Precedex",
          "title": "Precedex (dexmedetomidine) — US prescribing information, DailyMed search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Dilute before use. ICU sedation: usually 0.2–0.7 micrograms/kg/hour by continuous infusion, titrated to response; an optional loading dose of 1 microgram/kg over 10 minutes. Reduce in the elderly and hepatic impairment. Only by trained staff with monitoring.",
        "contraindications": "Hypersensitivity; advanced heart block (grade 2 or 3) unless paced; uncontrolled hypotension; acute cerebrovascular conditions.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Sedation of intubated and mechanically ventilated patients in intensive care, and sedation of non-intubated patients before and during procedures.",
        "commonAdverseEffects": "Hypotension, bradycardia, hypertension (especially during loading), nausea, dry mouth, agitation; rarely sinus arrest."
      },
      "packSize": "2 mL vials",
      "strength": "100 micrograms/mL",
      "brandName": "Precedex 200 micrograms/2 mL Concentrate",
      "drugClass": "Alpha-2 adrenergic agonist (sedative)",
      "dosageForm": "Concentrate for solution for infusion",
      "genericName": "Dexmedetomidine hydrochloride",
      "specialties": [
        "Critical Care",
        "Anesthesiology"
      ],
      "activeIngredients": [
        "Dexmedetomidine hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/prevenar-13",
          "title": "Prevenar 13 — EMA EPAR product information (Pfizer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Infants from 6 weeks: 3 primary doses (or 2 doses) at least 1 month apart plus a booster at 11–15 months, according to the national schedule. Adults: one dose.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against invasive disease, pneumonia and acute otitis media caused by Streptococcus pneumoniae in infants, children and adolescents, and against invasive disease and pneumonia in adults.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, irritability, drowsiness, loss of appetite; rarely febrile seizures or allergic reactions."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Prevenar 13 Suspension for Injection",
      "drugClass": "Bacterial vaccine (conjugate)",
      "dosageForm": "Suspension for injection",
      "genericName": "Pneumococcal polysaccharide conjugate vaccine (13-valent, adsorbed)",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases",
        "Internal Medicine"
      ],
      "activeIngredients": [
        "Pneumococcal polysaccharide conjugate vaccine (13-valent, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/prevenar-20",
          "title": "Prevenar 20 — EMA EPAR product information (Pfizer)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Infants: 3 or 4 doses according to the national schedule (from 6 weeks of age). Adults from 18 years: one dose.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against invasive disease, pneumonia and acute otitis media caused by Streptococcus pneumoniae in infants and children from 6 weeks, and against invasive disease and pneumonia in adults.",
        "commonAdverseEffects": "Injection-site pain and swelling, muscle and joint pain, fatigue, headache, fever; in infants also irritability, drowsiness and loss of appetite."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Prevenar 20 Suspension for Injection",
      "drugClass": "Bacterial vaccine (conjugate)",
      "dosageForm": "Suspension for injection",
      "genericName": "Pneumococcal polysaccharide conjugate vaccine (20-valent, adsorbed)",
      "specialties": [
        "Pediatrics",
        "Internal Medicine",
        "Geriatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Pneumococcal polysaccharide conjugate vaccine (20-valent, adsorbed)"
      ]
    }
  ],
  "Reckitt": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Gaviscon%20Advance",
          "title": "Gaviscon Advance — UK eMC SmPC search (Reckitt)"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and children over 12 years: 5–10 mL after meals and at bedtime, up to four times daily.",
        "contraindications": "Hypersensitivity to any of the ingredients.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Heartburn, acid indigestion and symptoms of gastro-oesophageal reflux, including during pregnancy and after reflux oesophagitis.",
        "commonAdverseEffects": "Very rarely allergic reactions; bloating. Contains sodium and potassium: caution in renal impairment and in low-salt diets."
      },
      "packSize": "Bottle (size varies)",
      "strength": "500 mg / 100 mg per 5 mL",
      "brandName": "Gaviscon Advance Oral Suspension",
      "drugClass": "Alginate raft-forming antacid",
      "dosageForm": "Oral suspension",
      "genericName": "Sodium alginate + Potassium hydrogen carbonate",
      "specialties": [
        "Gastroenterology",
        "General Practice / Family Medicine",
        "Obstetrics & Gynecology"
      ],
      "activeIngredients": [
        "Sodium alginate",
        "Potassium hydrogen carbonate"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oromucosal",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Strepsils",
          "title": "Strepsils — UK eMC SmPC search (Reckitt)"
        }
      ],
      "category": "otc_drug",
      "clinical": {
        "usualAdultDose": "Adults and children over 6 years: dissolve 1 lozenge slowly in the mouth every 2–3 hours; maximum 12 lozenges in 24 hours.",
        "contraindications": "Hypersensitivity to any of the ingredients; children under 6 years.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Symptomatic relief of mouth and throat infections and sore throat.",
        "commonAdverseEffects": "Hypersensitivity reactions, sore tongue or mouth discomfort."
      },
      "packSize": "Pack size varies by market",
      "strength": "0.6 mg / 1.2 mg",
      "brandName": "Strepsils Original Lozenges",
      "drugClass": "Antiseptic throat lozenge",
      "dosageForm": "Lozenge",
      "genericName": "Amylmetacresol + 2,4-Dichlorobenzyl alcohol",
      "specialties": [
        "ENT (Otolaryngology)",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Amylmetacresol",
        "2,4-Dichlorobenzyl alcohol"
      ]
    }
  ],
  "Roche": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Cymevene",
          "title": "Cymevene (ganciclovir) — UK eMC SmPC search (Roche)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Induction: 5 mg/kg by IV infusion over 1 hour every 12 hours for 14–21 days. Maintenance and prevention: 5 mg/kg once daily (or 6 mg/kg on 5 days a week). Reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to ganciclovir or valganciclovir; breastfeeding.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Treatment of cytomegalovirus (CMV) disease in immunocompromised patients, and prevention of CMV disease in transplant recipients and patients receiving chemotherapy at risk.",
        "commonAdverseEffects": "Neutropenia, anaemia, thrombocytopenia, fever, diarrhoea, nausea, headache, phlebitis at the infusion site; potential to cause cancer, birth defects and infertility."
      },
      "packSize": "Single vial",
      "strength": "500 mg",
      "brandName": "Cymevene 500 mg Powder for Infusion",
      "drugClass": "Antiviral (nucleoside analogue)",
      "dosageForm": "Powder for concentrate for solution for infusion",
      "genericName": "Ganciclovir",
      "specialties": [
        "Infectious Diseases",
        "Hematology",
        "Nephrology"
      ],
      "activeIngredients": [
        "Ganciclovir"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Valcyte",
          "title": "Valcyte (valganciclovir) — UK eMC SmPC search (Roche)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "CMV retinitis: 900 mg twice daily for 21 days, then 900 mg once daily. Prevention: 900 mg once daily starting within 10 days of transplant, until 100 days (200 days for kidney transplant). Take with food; reduce the dose in renal impairment.",
        "contraindications": "Hypersensitivity to valganciclovir or ganciclovir; breastfeeding.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Treatment of cytomegalovirus (CMV) retinitis in adults with AIDS, and prevention of CMV disease in CMV-negative recipients of solid organ transplants from CMV-positive donors.",
        "commonAdverseEffects": "Neutropenia, anaemia, thrombocytopenia, diarrhoea, nausea, fever, headache, insomnia; potential to cause cancer, birth defects and infertility (handle tablets with care, use contraception)."
      },
      "packSize": "60 tablets",
      "strength": "450 mg",
      "brandName": "Valcyte 450 mg Tablets",
      "drugClass": "Antiviral (ganciclovir prodrug)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Valganciclovir",
      "specialties": [
        "Infectious Diseases",
        "Nephrology",
        "Hematology"
      ],
      "activeIngredients": [
        "Valganciclovir"
      ]
    }
  ],
  "Sanofi": [
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Avaxim",
          "title": "Avaxim (hepatitis A vaccine) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose IM in the deltoid, with a booster 6–36 months later for long-term protection.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against hepatitis A in adults and adolescents from 16 years.",
        "commonAdverseEffects": "Injection-site pain, headache, fatigue, muscle and joint pain, mild fever, gastrointestinal upset."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "160 antigen units/0.5 mL",
      "brandName": "Avaxim 160 U Suspension for Injection",
      "drugClass": "Viral vaccine (inactivated)",
      "dosageForm": "Suspension for injection",
      "genericName": "Hepatitis A vaccine (inactivated, adsorbed)",
      "specialties": [
        "Infectious Diseases",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Hepatitis A vaccine (inactivated, adsorbed)"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Frisium",
          "title": "Frisium (clobazam) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Anxiety: 20–30 mg daily in divided doses or at night, up to 60 mg in hospital; short term only. Epilepsy: start 20–30 mg daily, up to 60 mg daily. Lower doses in the elderly.",
        "contraindications": "Myasthenia gravis; severe respiratory insufficiency; sleep apnoea; severe hepatic impairment; history of drug or alcohol dependence; hypersensitivity to benzodiazepines.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Adjunctive treatment of epilepsy; short-term treatment of severe, disabling anxiety.",
        "commonAdverseEffects": "Drowsiness, fatigue, dizziness, dry mouth, constipation, mood changes; tolerance, dependence and withdrawal symptoms. Respiratory depression with opioids or alcohol."
      },
      "packSize": "Pack size varies by market",
      "strength": "10 mg",
      "brandName": "Frisium 10 mg Tablets",
      "drugClass": "Benzodiazepine (1,5-benzodiazepine)",
      "dosageForm": "Tablet",
      "genericName": "Clobazam",
      "specialties": [
        "Neurology",
        "Psychiatry"
      ],
      "activeIngredients": [
        "Clobazam"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/hexyon",
          "title": "Hexyon / Hexaxim — EMA EPAR product information (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Paediatric vaccine. Primary series of 2 or 3 doses from 6 weeks of age at least 4 weeks apart, then a booster, according to the national schedule. (Marketed in the EU as Hexyon/Hexacima.)",
        "contraindications": "Hypersensitivity to the vaccine or residues (glutaraldehyde, formaldehyde, neomycin, streptomycin, polymyxin B); encephalopathy of unknown cause within 7 days after a previous pertussis vaccine; uncontrolled neurological disorder or epilepsy; postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Primary and booster vaccination of infants and toddlers from 6 weeks against diphtheria, tetanus, pertussis, hepatitis B, poliomyelitis and Hib disease.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, irritability, drowsiness, loss of appetite; rarely febrile seizures or allergic reactions."
      },
      "packSize": "Single-dose pre-filled syringe or vial",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Hexaxim Suspension for Injection",
      "drugClass": "Combined bacterial and viral vaccine (inactivated)",
      "dosageForm": "Suspension for injection",
      "genericName": "Diphtheria, tetanus, pertussis (acellular), hepatitis B, poliomyelitis (inactivated) and Haemophilus influenzae type b vaccine",
      "specialties": [
        "Pediatrics",
        "Infectious Diseases"
      ],
      "activeIngredients": [
        "Diphtheria, tetanus, pertussis (acellular), hepatitis B, poliomyelitis (inactivated) and Haemophilus influenzae type b vaccine"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Orelox",
          "title": "Orelox (cefpodoxime) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults: 100–200 mg twice daily with food, depending on the infection. Increase the dosing interval if creatinine clearance is below 40 mL/min.",
        "contraindications": "Hypersensitivity to cefpodoxime or other cephalosporins; history of severe immediate hypersensitivity to penicillins or other beta-lactams.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Upper and lower respiratory tract infections (sinusitis, tonsillitis, pharyngitis, bronchitis, pneumonia), uncomplicated urinary tract infections and skin infections caused by susceptible bacteria.",
        "commonAdverseEffects": "Diarrhoea, nausea, abdominal pain, headache, rash; Clostridioides difficile infection; rarely severe allergic reactions."
      },
      "packSize": "Pack size varies by market",
      "strength": "100 mg",
      "brandName": "Orelox 100 mg Tablets",
      "drugClass": "Antibacterial (third-generation oral cephalosporin)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Cefpodoxime proxetil",
      "specialties": [
        "Infectious Diseases",
        "ENT (Otolaryngology)",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Cefpodoxime proxetil"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Phenergan",
          "title": "Phenergan (promethazine) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Allergy: 10–20 mg two or three times daily, or 25 mg at night. Motion sickness: 25 mg the night before travel. Insomnia: 25–50 mg at night.",
        "contraindications": "Hypersensitivity to promethazine or other phenothiazines; coma or CNS depression; use with or within 14 days of MAO inhibitors; children under 2 years.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Allergic conditions (rhinitis, urticaria, itching), short-term insomnia, nausea and vomiting, motion sickness, and sedation.",
        "commonAdverseEffects": "Drowsiness, dizziness, dry mouth, blurred vision, restlessness, headache, photosensitivity; paradoxical excitation in children; respiratory depression risk in young children."
      },
      "packSize": "Pack size varies by market",
      "strength": "25 mg",
      "brandName": "Phenergan 25 mg Tablets",
      "drugClass": "Sedating antihistamine (phenothiazine)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Promethazine hydrochloride",
      "specialties": [
        "Allergy & Immunology",
        "General Practice / Family Medicine",
        "Psychiatry"
      ],
      "activeIngredients": [
        "Promethazine hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/referrals/metoclopramide-containing-medicines",
          "title": "Metoclopramide — EMA review of metoclopramide-containing medicines"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults: 10 mg up to three times daily; maximum 30 mg (or 0.5 mg/kg) per day; maximum 5 days. Lower doses in renal or hepatic impairment and the elderly.",
        "contraindications": "GI haemorrhage, obstruction or perforation; phaeochromocytoma; history of neuroleptic or metoclopramide tardive dyskinesia; epilepsy; Parkinson's disease; use with levodopa or dopamine agonists; history of methaemoglobinaemia; children under 1 year; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of delayed nausea and vomiting after chemotherapy and of radiotherapy-induced nausea; symptomatic treatment of nausea and vomiting including that of acute migraine.",
        "commonAdverseEffects": "Somnolence, extrapyramidal reactions (especially in children and young adults), asthenia, diarrhoea, depression, hypotension, hyperprolactinaemia; tardive dyskinesia with long use."
      },
      "packSize": "Pack size varies by market",
      "strength": "10 mg",
      "brandName": "Primperan 10 mg Tablets",
      "drugClass": "Antiemetic and prokinetic (dopamine antagonist)",
      "dosageForm": "Tablet",
      "genericName": "Metoclopramide hydrochloride",
      "specialties": [
        "Gastroenterology",
        "Oncology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Metoclopramide hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Intravenous / intramuscular",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/referrals/metoclopramide-containing-medicines",
          "title": "Metoclopramide — EMA review of metoclopramide-containing medicines"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults: 10 mg by slow IV injection over at least 3 minutes or by IM injection, up to three times daily; maximum 30 mg (0.5 mg/kg) per day; maximum 5 days.",
        "contraindications": "GI haemorrhage, obstruction or perforation; phaeochromocytoma; history of tardive dyskinesia; epilepsy; Parkinson's disease; use with levodopa or dopamine agonists; history of methaemoglobinaemia; children under 1 year; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of postoperative nausea and vomiting, delayed chemotherapy-induced and radiotherapy-induced nausea and vomiting, and symptomatic treatment of nausea and vomiting.",
        "commonAdverseEffects": "Somnolence, extrapyramidal reactions, hypotension (especially with fast IV injection), asthenia, diarrhoea; rarely cardiac conduction disorders after IV use."
      },
      "packSize": "2 mL ampoules",
      "strength": "10 mg/2 mL",
      "brandName": "Primperan 10 mg/2 mL Injection",
      "drugClass": "Antiemetic and prokinetic (dopamine antagonist)",
      "dosageForm": "Solution for injection",
      "genericName": "Metoclopramide hydrochloride",
      "specialties": [
        "Emergency Medicine",
        "Anesthesiology",
        "Gastroenterology"
      ],
      "activeIngredients": [
        "Metoclopramide hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Rifinah",
          "title": "Rifinah (rifampicin/isoniazid) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Adults 50 kg or more: 2 tablets once daily on an empty stomach (30 minutes before or 2 hours after a meal). Give pyridoxine to patients at risk of neuropathy. Monitor liver function.",
        "contraindications": "Hypersensitivity to rifamycins or isoniazid; jaundice; previous isoniazid-associated hepatitis; use with saquinavir/ritonavir.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Treatment of tuberculosis (pulmonary and extrapulmonary) as part of a combination regimen, when both rifampicin and isoniazid are indicated.",
        "commonAdverseEffects": "Hepatitis, peripheral neuropathy, orange-red discoloration of urine, sweat and tears, nausea, abdominal pain, rash, flu-like syndrome, thrombocytopenia. Strong enzyme inducer with many interactions (including hormonal contraceptives)."
      },
      "packSize": "Pack size varies by market",
      "strength": "300 mg / 150 mg",
      "brandName": "Rifinah 300/150 Tablets",
      "drugClass": "Antituberculosis combination",
      "dosageForm": "Sugar-coated tablet",
      "genericName": "Rifampicin + Isoniazid",
      "specialties": [
        "Infectious Diseases",
        "Pulmonology"
      ],
      "activeIngredients": [
        "Rifampicin",
        "Isoniazid"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Tildiem",
          "title": "Tildiem (diltiazem) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "60 mg three times daily, increased if needed up to 360 mg daily in divided doses. Elderly and patients with renal or hepatic impairment: start 60 mg twice daily. Swallow whole.",
        "contraindications": "Sick sinus syndrome; second- or third-degree AV block (without a pacemaker); severe bradycardia (below 40/min); left ventricular failure with pulmonary congestion; use with intravenous dantrolene, ivabradine or lomitapide; pregnancy and women who may become pregnant; hypersensitivity.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prophylaxis and treatment of angina pectoris.",
        "commonAdverseEffects": "Peripheral oedema, headache, flushing, dizziness, bradycardia, AV block, palpitations, nausea, constipation, rash. Many interactions (CYP3A4 inhibitor: raises levels of simvastatin, ciclosporin and others)."
      },
      "packSize": "Pack size varies by market",
      "strength": "60 mg",
      "brandName": "Tildiem 60 mg Tablets",
      "drugClass": "Calcium channel blocker (benzothiazepine)",
      "dosageForm": "Modified-release tablet",
      "genericName": "Diltiazem hydrochloride",
      "specialties": [
        "Cardiology",
        "Internal Medicine"
      ],
      "activeIngredients": [
        "Diltiazem hydrochloride"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular / subcutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Typhim%20Vi",
          "title": "Typhim Vi (typhoid vaccine) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose IM or SC at least 2 weeks before possible exposure; revaccinate every 3 years if the risk continues.",
        "contraindications": "Hypersensitivity to the active substances or any excipient (including trace residues listed in the SmPC); postpone in acute severe febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Active immunisation against typhoid fever in adults and children from 2 years, especially travellers, laboratory workers and people in endemic areas.",
        "commonAdverseEffects": "Injection-site pain, redness and swelling, fever, headache, malaise, muscle pain."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "25 micrograms/0.5 mL",
      "brandName": "Typhim Vi Solution for Injection",
      "drugClass": "Bacterial vaccine (polysaccharide)",
      "dosageForm": "Solution for injection",
      "genericName": "Typhoid Vi polysaccharide vaccine",
      "specialties": [
        "Infectious Diseases",
        "General Practice / Family Medicine",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Typhoid Vi polysaccharide vaccine"
      ]
    },
    {
      "found": true,
      "notes": "Vaccine or immunoglobulin marketed in Iraq, added to cover the Iraqi National Master List. Clinical text follows the reference SmPC; follow the national immunisation schedule and the local leaflet.",
      "route": "Intramuscular / subcutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Vaxigrip%20Tetra",
          "title": "Vaxigrip Tetra (influenza vaccine) — UK eMC SmPC search (Sanofi)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "One 0.5 mL dose each season. Children under 9 years who have never been vaccinated against influenza need a second dose after at least 4 weeks. Use the strain composition recommended for the current season.",
        "contraindications": "Hypersensitivity to the vaccine, egg proteins (ovalbumin) or residues such as neomycin, formaldehyde and octoxinol-9; postpone in acute febrile illness.",
        "storageConditions": "Store in a refrigerator (2–8 °C). Do not freeze. Keep in the outer carton to protect from light.",
        "approvedIndications": "Prevention of influenza in adults and children from 6 months, and of influenza in infants under 6 months through vaccination of pregnant women.",
        "commonAdverseEffects": "Headache, muscle pain, malaise, injection-site pain and swelling, fever; rarely allergic reactions."
      },
      "packSize": "Single-dose pre-filled syringe",
      "strength": "1 dose (0.5 mL)",
      "brandName": "Vaxigrip Tetra Suspension for Injection",
      "drugClass": "Viral vaccine (inactivated)",
      "dosageForm": "Suspension for injection in pre-filled syringe",
      "genericName": "Influenza vaccine (split virion, inactivated, quadrivalent)",
      "specialties": [
        "General Practice / Family Medicine",
        "Internal Medicine",
        "Pediatrics",
        "Geriatrics"
      ],
      "activeIngredients": [
        "Influenza vaccine (split virion, inactivated, quadrivalent)"
      ]
    }
  ],
  "UCB": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/referrals/hydroxyzine-containing-medicines",
          "title": "Hydroxyzine — EMA review of hydroxyzine-containing medicines"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Anxiety: 50–100 mg daily in divided doses. Pruritus: start 25 mg at night, up to 25 mg three or four times daily. Maximum 100 mg per day in adults (50 mg in the elderly).",
        "contraindications": "Hypersensitivity to hydroxyzine, cetirizine, other piperazine derivatives or aminophylline; porphyria; known QT prolongation or risk factors for it; pregnancy and breastfeeding.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Symptomatic treatment of anxiety in adults and of pruritus (itching) in adults and children.",
        "commonAdverseEffects": "Somnolence, headache, dry mouth, fatigue; QT prolongation and arrhythmias (avoid with other QT-prolonging medicines)."
      },
      "packSize": "Pack size varies by market",
      "strength": "25 mg",
      "brandName": "Atarax 25 mg Tablets",
      "drugClass": "H1 antihistamine and anxiolytic (piperazine)",
      "dosageForm": "Film-coated tablet",
      "genericName": "Hydroxyzine hydrochloride",
      "specialties": [
        "Psychiatry",
        "Dermatology",
        "Allergy & Immunology"
      ],
      "activeIngredients": [
        "Hydroxyzine hydrochloride"
      ]
    }
  ],
  "Viatris": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
          "title": "Aldara (imiquimod) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Warts: 3 times a week at bedtime for up to 16 weeks. Superficial BCC: 5 times a week for 6 weeks. Actinic keratoses: 3 times a week for 4 weeks. Wash off after 6–10 hours.",
        "contraindications": "Hypersensitivity to imiquimod or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "External genital and perianal warts in adults; small superficial basal cell carcinoma; non-hyperkeratotic actinic keratoses on the face or scalp.",
        "commonAdverseEffects": "Local redness, erosion, flaking, swelling, itching, burning and pain; flu-like symptoms, headache, muscle pain."
      },
      "packSize": "Single-use sachets",
      "strength": "5% w/w",
      "brandName": "Aldara 5% Cream",
      "drugClass": "Immune response modifier (topical)",
      "dosageForm": "Cream",
      "genericName": "Imiquimod",
      "specialties": [
        "Dermatology",
        "Urology",
        "Obstetrics & Gynecology"
      ],
      "activeIngredients": [
        "Imiquimod"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Subcutaneous",
      "sources": [
        {
          "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/arixtra",
          "title": "Arixtra (fondaparinux) — EMA EPAR product information"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "VTE prevention: 2.5 mg SC once daily, starting 6 hours after surgery. Acute coronary syndrome: 2.5 mg once daily. Treatment of DVT/PE uses weight-based doses of other strengths.",
        "contraindications": "Hypersensitivity; active clinically significant bleeding; acute bacterial endocarditis; severe renal impairment (creatinine clearance below 20 mL/min for prevention).",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Prevention of venous thromboembolism in major orthopaedic or abdominal surgery and in immobilised medical patients; treatment of superficial vein thrombosis; unstable angina and NSTEMI or STEMI.",
        "commonAdverseEffects": "Bleeding, anaemia, thrombocytopenia, injection-site reactions, raised liver enzymes. Caution with spinal or epidural anaesthesia (risk of spinal haematoma)."
      },
      "packSize": "Pre-filled syringes (pack size varies)",
      "strength": "2.5 mg/0.5 mL",
      "brandName": "Arixtra 2.5 mg/0.5 mL Injection",
      "drugClass": "Anticoagulant (factor Xa inhibitor)",
      "dosageForm": "Solution for injection in pre-filled syringe",
      "genericName": "Fondaparinux sodium",
      "specialties": [
        "Hematology",
        "Orthopedics",
        "Cardiology",
        "Internal Medicine"
      ],
      "activeIngredients": [
        "Fondaparinux sodium"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Cutaneous",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Elidel",
          "title": "Elidel (pimecrolimus) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Apply a thin layer to affected skin twice daily; stop when the signs resolve. Review if no improvement after 6 weeks.",
        "contraindications": "Hypersensitivity to pimecrolimus, other macrolactams or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Mild to moderate atopic dermatitis (eczema) in patients from 2 years when topical corticosteroids are not advisable or not possible.",
        "commonAdverseEffects": "Burning or warm sensation at the application site, irritation, skin infections (including herpes and folliculitis). Avoid on malignant or pre-malignant skin and limit sun exposure."
      },
      "packSize": "Tube (size varies by market)",
      "strength": "1% w/w",
      "brandName": "Elidel 1% Cream",
      "drugClass": "Topical calcineurin inhibitor",
      "dosageForm": "Cream",
      "genericName": "Pimecrolimus",
      "specialties": [
        "Dermatology",
        "Pediatrics"
      ],
      "activeIngredients": [
        "Pimecrolimus"
      ]
    },
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Mestinon",
          "title": "Mestinon (pyridostigmine) — UK eMC SmPC search"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Myasthenia gravis: 30–120 mg at intervals through the day, adjusted to response; total usually 300–1,200 mg daily.",
        "contraindications": "Gastrointestinal or urinary obstruction; hypersensitivity to pyridostigmine or bromides.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Myasthenia gravis, paralytic ileus and postoperative urinary retention.",
        "commonAdverseEffects": "Increased salivation and sweating, nausea, vomiting, diarrhoea, abdominal cramps, bradycardia, muscle cramps; excess dosing can cause cholinergic crisis. Caution in asthma."
      },
      "packSize": "Pack size varies by market",
      "strength": "60 mg",
      "brandName": "Mestinon 60 mg Tablets",
      "drugClass": "Cholinesterase inhibitor",
      "dosageForm": "Tablet",
      "genericName": "Pyridostigmine bromide",
      "specialties": [
        "Neurology"
      ],
      "activeIngredients": [
        "Pyridostigmine bromide"
      ]
    }
  ],
  "Zambon": [
    {
      "found": true,
      "notes": "Iraq-marketed brand added to cover a medicine on the Iraqi National Master List. Clinical text follows the reference SmPC/label; check the local leaflet.",
      "route": "Oral",
      "sources": [
        {
          "url": "https://www.medicines.org.uk/emc/search?q=Monuril",
          "title": "Monuril (fosfomycin) — UK eMC SmPC search (Zambon)"
        }
      ],
      "category": "prescription_drug",
      "clinical": {
        "usualAdultDose": "Cystitis: one 3 g sachet dissolved in water as a single dose, on an empty stomach (2–3 hours before or after a meal), preferably at bedtime after emptying the bladder. Prostate biopsy: 3 g 3 hours before and 3 g 24 hours after the procedure.",
        "contraindications": "Hypersensitivity to fosfomycin or any excipient.",
        "storageConditions": "Store in the original package as stated on the pack label.",
        "approvedIndications": "Acute uncomplicated lower urinary tract infection (cystitis) in women and adolescent girls; prophylaxis for transrectal prostate biopsy.",
        "commonAdverseEffects": "Diarrhoea, nausea, dyspepsia, headache, dizziness, vulvovaginitis; rarely Clostridioides difficile infection."
      },
      "packSize": "1 sachet",
      "strength": "3 g fosfomycin",
      "brandName": "Monuril 3 g Granules",
      "drugClass": "Antibacterial (phosphonic acid derivative)",
      "dosageForm": "Granules for oral solution",
      "genericName": "Fosfomycin trometamol",
      "specialties": [
        "Urology",
        "Obstetrics & Gynecology",
        "General Practice / Family Medicine"
      ],
      "activeIngredients": [
        "Fosfomycin trometamol"
      ]
    }
  ]
};

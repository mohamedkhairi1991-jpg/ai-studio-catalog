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

const RAW_LEO_PHARMA: CompactDrug[] = [
  // 1. Fucidin Cream 2% (Fusidic acid)
  {
    brandName: 'Fucidin Cream 2%',
    brandNameAr: 'فيوسيدين 2%',
    genericName: 'Fusidic acid',
    activeIngredients: ['Fusidic acid'],
    drugClass: 'Topical antibacterial (fusidane antibiotic)',
    strength: '2% (20 mg/g)',
    dosageForm: 'Cream',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 15 g or 30 g cream',
    indications:
      'Treatment of primary and secondary skin infections caused by sensitive strains of Staphylococcus aureus, Streptococcus species, and Corynebacterium minutissimum, including impetigo contagiosa, superficial folliculitis, sycosis barbae, paronychia, erythrasma, and infected eczematoid dermatitis, infected contact dermatitis, and infected cuts/abrasions.',
    dose:
      'Adults and children: Apply to the affected skin area 3 to 4 times daily, generally for a period of 7 days. When a gauze dressing is used, frequency of application may be reduced to 1–2 times daily.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate or to any of the excipients.',
    adverseEffects:
      'Uncommon: dermatitis (including contact dermatitis and eczema), rash, pruritus, erythema, application site pain (including skin burning sensation), application site irritation; rare: hypersensitivity, allergic reaction, conjunctivitis, angioedema, urticaria, blister.',
    storage: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'General Practice', 'Pediatrics'],
    sources: [
      {
        title: 'UK EMC — Fucidin Cream 2% SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/5510/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains 20 mg/g fusidic acid (anhydrous) in a hydrophilic cream base.',
  },

  // 2. Fucidin Ointment 2% (Fusidic acid — sodium fusidate)
  {
    brandName: 'Fucidin Ointment 2%',
    brandNameAr: 'فيوسيدين 2%',
    genericName: 'Fusidic acid',
    activeIngredients: ['Fusidic acid'],
    drugClass: 'Topical antibacterial (fusidane antibiotic)',
    strength: '2% (20 mg/g)',
    dosageForm: 'Ointment',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 15 g or 30 g ointment',
    indications:
      'Treatment of primary and secondary skin infections caused by sensitive strains of Staphylococcus aureus, Streptococcus species, and Corynebacterium minutissimum, including impetigo contagiosa, superficial folliculitis, furunculosis, sycosis barbae, hidradenitis axillaris, paronychia, erythrasma, and infected wounds/burns.',
    dose:
      'Adults and children: Uncovered lesions: apply gently 3 to 4 times daily, generally for 7 days. Covered lesions: less frequent applications may be adequate.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate or to any of the excipients (contains cetyl alcohol, hydrous lanolin, and butylhydroxytoluene).',
    adverseEffects:
      'Uncommon: dermatitis (including contact dermatitis and eczema), rash, pruritus, erythema, application site pain and irritation; rare: hypersensitivity, conjunctivitis, angioedema, urticaria, blister.',
    storage: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'General Practice', 'Surgery', 'Pediatrics'],
    sources: [
      {
        title: 'UK EMC — Fucidin Ointment 2% SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/5511/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains 20 mg/g sodium fusidate; generic name normalized to INN base (Fusidic acid).',
  },

  // 3. Fucidin 250 mg Tablet (Fusidic acid — sodium fusidate)
  {
    brandName: 'Fucidin 250 mg',
    brandNameAr: 'فيوسيدين 250 ملغ',
    genericName: 'Fusidic acid',
    activeIngredients: ['Fusidic acid'],
    drugClass: 'Systemic antibacterial (steroid-structure fusidane antibiotic)',
    strength: '250 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: 'Blister pack of 10 or 20 film-coated tablets',
    indications:
      'Treatment of severe staphylococcal infections (including methicillin-resistant Staphylococcus aureus, MRSA) affecting bone and joints (osteomyelitis), skin and soft tissues, endocarditis, septicaemia, and pneumonia, generally in combination with a second anti-staphylococcal antibiotic to prevent emergence of resistance.',
    dose:
      'Adults and children over 12 years: 500 mg (two 250 mg tablets) three times daily. In skin and soft tissue infections: 250 mg twice daily (doubled in severe cases). Film-coated tablets should be swallowed whole with a glass of water.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate or any excipient; concomitant treatment with statins (HMG-CoA reductase inhibitors) due to risk of potentially fatal rhabdomyolysis (statin therapy must be discontinued throughout systemic Fucidin treatment and may be re-introduced 7 days after the last dose of systemic Fucidin).',
    adverseEffects:
      'Vomiting, diarrhoea, abdominal pain, dyspepsia, nausea, lethargy, fatigue, asthenia, hyperbilirubinaemia, jaundice, hepatotoxicity, reversible thrombocytopenia/leukopenia, rhabdomyolysis (especially if co-administered with statins).',
    storage: 'This medicinal product does not require any special storage conditions.',
    specialties: ['Infectious Diseases', 'Orthopedics', 'Internal Medicine', 'Dermatology'],
    sources: [
      {
        title: 'UK EMC — Fucidin 250 mg Tablets SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/1133/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Each film-coated tablet contains 250 mg sodium fusidate (equivalent to 240 mg fusidic acid). Generic name normalized to INN base (Fusidic acid).',
  },

  // 4. Fucicort (Fusidic acid + Betamethasone)
  {
    brandName: 'Fucicort 2% / 0.1%',
    brandNameAr: 'فيوسيكورت 2% / 0.1%',
    genericName: 'Fusidic acid + Betamethasone',
    activeIngredients: ['Fusidic acid', 'Betamethasone'],
    drugClass: 'Potent topical corticosteroid (Group III) and antibacterial combination',
    strength: '20 mg/g / 1 mg/g (2% / 0.1%)',
    dosageForm: 'Cream',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 15 g or 30 g cream',
    indications:
      'Treatment of inflammatory dermatoses where bacterial infection caused by microorganisms sensitive to fusidic acid is present or likely to occur (such as infected atopic eczema, discoid eczema, stasis eczema, contact dermatitis, seborrhoeic dermatitis, and psoriasis).',
    dose:
      'Adults and children: Apply a small amount to the affected area twice daily until a satisfactory response is obtained. A single treatment course should not normally exceed 2 weeks.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate, betamethasone valerate, or any excipient; systemic fungal infections; primary skin infections caused by fungi, viruses (such as herpes or varicella), or bacteria untreated or uncontrolled by appropriate therapy; skin manifestations in relation to tuberculosis or syphilis; perioral dermatitis, rosacea, and acne vulgaris.',
    adverseEffects:
      'Uncommon: hypersensitivity, contact dermatitis, eczema (condition aggravated), skin burning sensation, pruritus, dry skin, application site pain/irritation; corticosteroid class effects with prolonged use (skin atrophy, telangiectasia, striae, folliculitis, hypertrichosis, blurred vision, adrenal suppression).',
    storage: 'Do not store above 30°C.',
    specialties: ['Dermatology', 'General Practice'],
    sources: [
      {
        title: 'UK EMC — Fucibet / Fucicort 20 mg/g + 1 mg/g Cream SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/1130/smpc',
      },
    ],
    notes:
      'Official LEO Pharma SmPC data (marketed as Fucicort in the Middle East and most international markets). Contains fusidic acid 20 mg/g (2%) and betamethasone 1 mg/g (0.1%, as betamethasone valerate). Generic names normalized to INN bases (Fusidic acid + Betamethasone).',
  },

  // 5. Fucidin H (Fusidic acid + Hydrocortisone)
  {
    brandName: 'Fucidin H 2% / 1%',
    brandNameAr: 'فيوسيدين إتش 2% / 1%',
    genericName: 'Fusidic acid + Hydrocortisone',
    activeIngredients: ['Fusidic acid', 'Hydrocortisone'],
    drugClass: 'Mild topical corticosteroid (Group I) and antibacterial combination',
    strength: '20 mg/g / 10 mg/g (2% / 1%)',
    dosageForm: 'Cream',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 15 g or 30 g cream',
    indications:
      'Treatment of mild to moderate atopic dermatitis and other eczematous dermatoses with secondary bacterial infection caused by microorganisms sensitive to fusidic acid.',
    dose:
      'Adults and children: Apply to the affected area 3 times daily for a maximum of 2 weeks.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate, hydrocortisone acetate, or any excipient; primary skin infections caused by fungi, viruses (e.g. herpes or varicella), or bacteria; skin manifestations related to tuberculosis or syphilis; perioral dermatitis and rosacea.',
    adverseEffects:
      'Application site reaction (irritation, burning sensation, pruritus), worsening of eczema, allergic contact dermatitis, rash, mild corticosteroid skin effects with prolonged use.',
    storage: 'Do not store above 30°C. Use within 3 months of first opening.',
    specialties: ['Dermatology', 'Pediatrics', 'General Practice'],
    sources: [
      {
        title: 'UK EMC — Fucidin H Cream (Fusidic acid 2% / Hydrocortisone acetate 1%) SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/1132/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains fusidic acid 20 mg/g (2%) and hydrocortisone acetate 10 mg/g (1%). Generic names normalized to INN bases (Fusidic acid + Hydrocortisone).',
  },

  // 6. Fucithalmic (Fusidic acid)
  {
    brandName: 'Fucithalmic 1%',
    brandNameAr: 'فيوسيثالميك 1%',
    genericName: 'Fusidic acid',
    activeIngredients: ['Fusidic acid'],
    drugClass: 'Ophthalmic antibacterial (viscous carbomer sustained-release eye drops)',
    strength: '1% (10 mg/g)',
    dosageForm: 'Viscous eye drops, suspension',
    route: 'Ophthalmic',
    packSize: 'Laminated tube of 5 g viscous eye drops',
    indications:
      'Topical treatment of bacterial eye infections caused by susceptible organisms in conjunctivitis, blepharitis, hordeolum (stye), keratitis, dacryocystitis, and in connection with the removal of foreign bodies from the eye.',
    dose:
      'Adults and children: Instil one drop into the conjunctival sac twice daily (every 12 hours). Treatment should be continued for 2 days after the eye appears normal.',
    contraindications:
      'Hypersensitivity to fusidic acid/sodium fusidate or to any of the excipients (contains benzalkonium chloride).',
    adverseEffects:
      'Common: transient blurred vision, application site pain (including burning and stinging), application site pruritus and discomfort/irritation; uncommon: hypersensitivity, eyelid oedema, lacrimation increased, conjunctivitis aggravated, angioedema, rash, urticaria.',
    storage: 'Do not store above 25°C. Discard 28 days after first opening.',
    specialties: ['Ophthalmology', 'General Practice', 'Pediatrics'],
    sources: [
      {
        title: 'UK EMC — Fucithalmic Viscous Eye Drops 1% SmPC (LEO Pharma)',
        url: 'https://www.medicines.org.uk/emc/product/992/smpc',
      },
    ],
    notes:
      'Official SmPC data for Fucithalmic 1% viscous eye drops (10 mg/g anhydrous fusidic acid in a sustained-release carbomer gel base that liquefies on contact with tear fluid).',
  },

  // 7. Daivobet Ointment & Gel (Calcipotriol + Betamethasone)
  {
    brandName: 'Daivobet Ointment 50 mcg/g + 0.5 mg/g',
    brandNameAr: 'دايفوبيت 50 ميكروغرام/غ + 0.5 ملغ/غ',
    genericName: 'Calcipotriol + Betamethasone',
    activeIngredients: ['Calcipotriol', 'Betamethasone'],
    drugClass: 'Antipsoriatic vitamin D3 analogue and potent corticosteroid (Group III) combination',
    strength: '50 mcg/g + 0.5 mg/g',
    dosageForm: 'Ointment',
    route: 'Cutaneous',
    packSize: 'Tube of 30 g or 60 g ointment',
    indications:
      'Topical treatment of stable plaque psoriasis vulgaris amenable to topical therapy in adults.',
    dose:
      'Apply to the affected area once daily. The recommended treatment period is 4 weeks. The maximum daily dose should not exceed 15 g, and the body surface area treated should not exceed 30%.',
    contraindications:
      'Hypersensitivity to calcipotriol, betamethasone dipropionate, or any excipient; erythrodermic, exfoliative, and pustular psoriasis; known disorders of calcium metabolism; viral (e.g. herpes or varicella) lesions of the skin, fungal or bacterial skin infections, parasitic infections, skin manifestations in relation to tuberculosis, perioral dermatitis, atrophic skin, striae atrophicae, fragility of skin veins, ichthyosis, acne vulgaris, acne rosacea, rosacea, ulcers, and wounds.',
    adverseEffects:
      'Skin exfoliation, pruritus, rash, pustular psoriasis, skin burning sensation, skin pain or irritation, folliculitis, application site pigmentation changes, rebound effect, hypercalcaemia/hypercalciuria if maximum dose exceeded.',
    storage: 'Do not store above 25°C. Use within 12 months of first opening.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'UK EMC — Dovobet / Daivobet 50 micrograms/g + 0.5 mg/g Ointment SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/1593/smpc',
      },
    ],
    notes:
      'Official LEO Pharma SmPC data (marketed under the Middle East/EU brand name Daivobet). Contains calcipotriol 50 mcg/g (as monohydrate) and betamethasone 0.5 mg/g (as dipropionate). Generic names normalized to INN bases (Calcipotriol + Betamethasone).',
  },
  {
    brandName: 'Daivobet Gel 50 mcg/g + 0.5 mg/g',
    brandNameAr: 'دايفوبيت 50 ميكروغرام/غ + 0.5 ملغ/غ',
    genericName: 'Calcipotriol + Betamethasone',
    activeIngredients: ['Calcipotriol', 'Betamethasone'],
    drugClass: 'Antipsoriatic vitamin D3 analogue and potent corticosteroid (Group III) combination',
    strength: '50 mcg/g + 0.5 mg/g',
    dosageForm: 'Gel',
    route: 'Cutaneous',
    packSize: 'Bottle/applicator of 30 g or 60 g gel',
    indications:
      'Topical treatment of scalp psoriasis in adults, and mild to moderate plaque psoriasis vulgaris on the body (non-scalp) in adults.',
    dose:
      'Apply to affected areas once daily. Recommended treatment period is 4 weeks for scalp areas and 8 weeks for non-scalp areas. Maximum daily dose should not exceed 15 g and treated area should not exceed 30% of body surface area. Shake bottle before use.',
    contraindications:
      'Hypersensitivity to calcipotriol, betamethasone dipropionate, or any excipient; erythrodermic, exfoliative, and pustular psoriasis; known disorders of calcium metabolism; viral, fungal, bacterial, or parasitic skin infections; tuberculosis skin manifestations, perioral dermatitis, atrophic skin, striae, ichthyosis, acne vulgaris, rosacea, ulcers, and wounds.',
    adverseEffects:
      'Pruritus, skin burning sensation, skin pain or irritation, folliculitis, dermatitis, erythema, acne, dry skin, exacerbation of psoriasis, eye irritation (if accidentally applied near eyes).',
    storage: 'Do not store above 30°C. Do not refrigerate. Keep bottle in outer carton to protect from light.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'UK EMC — Dovobet / Daivobet 50 micrograms/g + 0.5 mg/g Gel SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/6557/smpc',
      },
    ],
    notes:
      'Official LEO Pharma SmPC data (marketed under the Middle East/EU brand name Daivobet Gel). Contains calcipotriol 50 mcg/g (as monohydrate) and betamethasone 0.5 mg/g (as dipropionate). Generic names normalized to INN bases (Calcipotriol + Betamethasone).',
  },

  // 8. Enstilar (Calcipotriol + Betamethasone cutaneous foam)
  {
    brandName: 'Enstilar 50 mcg/g + 0.5 mg/g',
    brandNameAr: 'إنستيلار 50 ميكروغرام/غ + 0.5 ملغ/غ',
    genericName: 'Calcipotriol + Betamethasone',
    activeIngredients: ['Calcipotriol', 'Betamethasone'],
    drugClass: 'Antipsoriatic vitamin D3 analogue and potent corticosteroid supersaturated cutaneous foam',
    strength: '50 mcg/g + 0.5 mg/g',
    dosageForm: 'Cutaneous foam',
    route: 'Cutaneous',
    packSize: 'Pressurised aluminium canister of 60 g cutaneous foam',
    indications:
      'Topical treatment of psoriasis vulgaris in adults.',
    dose:
      'Flare treatment: Apply to the affected area once daily for 4 weeks. Long-term maintenance treatment: in patients who have responded to 4 weeks of once-daily treatment, apply twice weekly (2 days per week on non-consecutive days) to areas previously affected by psoriasis vulgaris. Maximum daily dose should not exceed 15 g (one 60 g canister should last at least 4 days) and treated area should not exceed 30% of body surface area.',
    contraindications:
      'Hypersensitivity to calcipotriol, betamethasone dipropionate, or any excipient; erythrodermic and pustular psoriasis; known disorders of calcium metabolism; viral, fungal, bacterial, or parasitic skin infections; skin manifestations in relation to tuberculosis; perioral dermatitis, atrophic skin, striae atrophicae, fragility of skin veins, ichthyosis, acne vulgaris, acne rosacea, rosacea, ulcers, and wounds.',
    adverseEffects:
      'Uncommon: folliculitis, hypersensitivity, hypercalcaemia, skin hypopigmentation, rebound effect, application site pruritus, application site erythema, application site irritation/pain.',
    storage: 'Do not store above 30°C. Extremely flammable aerosol: do not spray on a naked flame or any incandescent material; protect from sunlight and do not expose to temperatures exceeding 50°C.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'UK EMC — Enstilar 50 micrograms/g + 0.5 mg/g Cutaneous Foam SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/2139/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Each gram of cutaneous foam contains 50 mcg calcipotriol (as monohydrate) and 0.5 mg betamethasone (as dipropionate). Generic names normalized to INN bases (Calcipotriol + Betamethasone).',
  },

  // 9. Xamiol (Calcipotriol + Betamethasone scalp gel)
  {
    brandName: 'Xamiol 50 mcg/g + 0.5 mg/g',
    brandNameAr: 'زاميول 50 ميكروغرام/غ + 0.5 ملغ/غ',
    genericName: 'Calcipotriol + Betamethasone',
    activeIngredients: ['Calcipotriol', 'Betamethasone'],
    drugClass: 'Antipsoriatic vitamin D3 analogue and potent corticosteroid scalp gel',
    strength: '50 mcg/g + 0.5 mg/g',
    dosageForm: 'Gel',
    route: 'Cutaneous',
    packSize: 'Bottle of 30 g or 60 g scalp gel',
    indications:
      'Topical treatment of scalp psoriasis in adults.',
    dose:
      'Apply to affected areas of the scalp once daily. The recommended treatment period is 4 weeks. Between 1 g and 4 g per day is usually sufficient for treatment of the scalp. Maximum daily dose across all calcipotriol-containing products must not exceed 15 g.',
    contraindications:
      'Hypersensitivity to calcipotriol, betamethasone dipropionate, or any excipient; erythrodermic, exfoliative, and pustular psoriasis; known disorders of calcium metabolism; viral, fungal, bacterial, or parasitic skin infections; skin manifestations in relation to tuberculosis; perioral dermatitis, atrophic skin, striae, ichthyosis, acne vulgaris, rosacea, ulcers, and wounds.',
    adverseEffects:
      'Pruritus, eye irritation, burning sensation of skin, skin pain or irritation, folliculitis, dermatitis, erythema, acne, dry skin, pustular psoriasis.',
    storage: 'Do not store above 30°C. Do not refrigerate. Keep the bottle in the outer carton in order to protect from light.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'LEO Pharma A/S — Xamiol 50 micrograms/g + 0.5 mg/g Gel Official Product Information',
        url: 'https://www.leo-pharma.com/product-overview',
      },
    ],
    notes:
      'Official LEO Pharma SmPC data for Xamiol Gel (50 mcg/g calcipotriol + 0.5 mg/g betamethasone). Generic names normalized to INN bases (Calcipotriol + Betamethasone).',
  },

  // 10. Daivonex (Calcipotriol)
  {
    brandName: 'Daivonex 50 mcg/g',
    brandNameAr: 'دايفونيكس 50 ميكروغرام/غ',
    genericName: 'Calcipotriol',
    activeIngredients: ['Calcipotriol'],
    drugClass: 'Topical antipsoriatic vitamin D3 analogue',
    strength: '50 mcg/g (0.005%)',
    dosageForm: 'Ointment',
    route: 'Cutaneous',
    packSize: 'Aluminium tube of 30 g ointment',
    indications:
      'Topical treatment of mild to moderate plaque psoriasis (psoriasis vulgaris).',
    dose:
      'Adults: Apply to the affected skin lesions once or twice daily. Often an initial twice-daily application can be reduced to once daily as appropriate. Maximum weekly dose should not exceed 100 g.',
    contraindications:
      'Hypersensitivity to calcipotriol or any excipient; known disorders of calcium metabolism; severe renal or hepatic impairment; guttate, erythrodermic, exfoliative, and pustular psoriasis.',
    adverseEffects:
      'Skin irritation, rash, burning and stinging sensation, dry skin, pruritus, erythema, aggravated psoriasis, dermatitis, photosensitivity, hypercalcaemia and hypercalciuria (if maximum weekly dose of 100 g is exceeded).',
    storage: 'Do not store above 25°C.',
    specialties: ['Dermatology'],
    sources: [
      {
        title: 'UK EMC — Dovonex / Daivonex Ointment 50 micrograms/g SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/1025/smpc',
      },
    ],
    notes:
      'Official LEO Pharma SmPC data (marketed under the Middle East/EU brand name Daivonex). Contains 50 micrograms/g (0.005% w/w) calcipotriol.',
  },

  // 11. Innohep (Tinzaparin)
  {
    brandName: 'Innohep 3,500 IU/0.35 mL',
    brandNameAr: 'إنوهيب 3,500 وحدة دولية/0.35 مل',
    genericName: 'Tinzaparin',
    activeIngredients: ['Tinzaparin'],
    drugClass: 'Antithrombotic agent (low molecular weight heparin)',
    strength: '3,500 anti-Xa IU/0.35 mL (10,000 IU/mL)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous (or intravenous/extracorporeal line for haemodialysis)',
    packSize: 'Pack of 2 or 10 pre-filled syringes of 0.35 mL with needle guard',
    indications:
      'Prophylaxis of venous thromboembolism (VTE) in adult patients undergoing surgery (particularly general or orthopaedic surgery) and in acutely ill medical patients with reduced mobility; prevention of clotting in extracorporeal circuits during haemodialysis and haemofiltration.',
    dose:
      'Thromboprophylaxis in patients with moderate risk of thrombosis (general surgery): 3,500 anti-Xa IU subcutaneously 2 hours before surgery and then once daily post-operatively for as long as the patient is considered to be at risk of VTE.',
    contraindications:
      'Hypersensitivity to tinzaparin sodium, heparin, or any excipient; current or history of immune-mediated heparin-induced thrombocytopenia (HIT, type II); active clinically significant bleeding or conditions predisposing to major haemorrhage; septic endocarditis; neuraxial anaesthesia in patients receiving treatment doses of tinzaparin.',
    adverseEffects:
      'Haemorrhage, injection site haematoma/reaction, anaemia, thrombocytopenia, transient elevation of hepatic transaminases, rash, pruritus, hyperkalaemia.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Hematology', 'Surgery', 'Orthopedics', 'Internal Medicine', 'Nephrology'],
    sources: [
      {
        title: 'UK EMC — Innohep 10,000 IU/ml Solution for Injection Pre-filled Syringes SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/3821/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains tinzaparin sodium 3,500 anti-Xa IU in 0.35 mL solution for injection. Generic name normalized to INN base (Tinzaparin).',
  },
  {
    brandName: 'Innohep 4,500 IU/0.45 mL',
    brandNameAr: 'إنوهيب 4,500 وحدة دولية/0.45 مل',
    genericName: 'Tinzaparin',
    activeIngredients: ['Tinzaparin'],
    drugClass: 'Antithrombotic agent (low molecular weight heparin)',
    strength: '4,500 anti-Xa IU/0.45 mL (10,000 IU/mL)',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous (or intravenous/extracorporeal line for haemodialysis)',
    packSize: 'Pack of 2 or 10 pre-filled syringes of 0.45 mL with needle guard',
    indications:
      'Prophylaxis of venous thromboembolism (VTE) in adult patients with high risk of thromboembolism, including orthopaedic surgery (hip or knee replacement) and immobilized medical patients at high thromboembolic risk; prevention of clotting in extracorporeal circuits during haemodialysis and haemofiltration.',
    dose:
      'High-risk thromboprophylaxis (e.g. orthopaedic surgery): 4,500 anti-Xa IU (or 50 anti-Xa IU/kg body weight) given subcutaneously 12 hours before surgery or 12 hours after surgery, then once daily for as long as the patient remains at risk. High-risk medical patients: 4,500 anti-Xa IU subcutaneously once daily.',
    contraindications:
      'Hypersensitivity to tinzaparin sodium, heparin, or any excipient; current or history of immune-mediated heparin-induced thrombocytopenia (HIT, type II); active clinically significant bleeding or conditions predisposing to major haemorrhage; septic endocarditis.',
    adverseEffects:
      'Haemorrhage, injection site haematoma/reaction, anaemia, thrombocytopenia, transient elevation of hepatic transaminases, rash, pruritus, hyperkalaemia.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Hematology', 'Orthopedics', 'Surgery', 'Internal Medicine', 'Obstetrics & Gynecology'],
    sources: [
      {
        title: 'UK EMC — Innohep 10,000 IU/ml Solution for Injection Pre-filled Syringes SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/3821/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains tinzaparin sodium 4,500 anti-Xa IU in 0.45 mL solution for injection. Generic name normalized to INN base (Tinzaparin).',
  },
  {
    brandName: 'Innohep 10,000 IU/0.5 mL',
    brandNameAr: 'إنوهيب 10,000 وحدة دولية/0.5 مل',
    genericName: 'Tinzaparin',
    activeIngredients: ['Tinzaparin'],
    drugClass: 'Antithrombotic agent (low molecular weight heparin)',
    strength: '10,000 anti-Xa IU/0.5 mL (20,000 IU/mL)',
    dosageForm: 'Solution for injection in graduated pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 2, 6, or 10 graduated pre-filled syringes of 0.5 mL',
    indications:
      'Treatment of venous thrombosis and thromboembolic disease including deep vein thrombosis (DVT) and pulmonary embolism (PE) in adults; extended treatment of venous thromboembolism and prevention of recurrences in adult patients with active cancer.',
    dose:
      '175 anti-Xa IU/kg body weight administered subcutaneously once daily. For DVT/PE without cancer, continue for at least 6 days and until adequate oral anticoagulation is established. In patients with active cancer, recommended duration is 6 months.',
    contraindications:
      'Hypersensitivity to tinzaparin sodium, heparin, or any excipient; current or history of immune-mediated heparin-induced thrombocytopenia (HIT, type II); active clinically significant bleeding or conditions predisposing to major haemorrhage; septic endocarditis; neuraxial (spinal or epidural) anaesthesia during treatment doses of tinzaparin.',
    adverseEffects:
      'Haemorrhage, injection site haematoma/reaction, anaemia, thrombocytopenia, transient elevation of hepatic transaminases, rash, pruritus, hyperkalaemia, osteoporosis with prolonged use.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Hematology', 'Cardiology', 'Pulmonology', 'Oncology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Innohep 20,000 IU/ml Solution for Injection Syringes SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/3822/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains tinzaparin sodium 10,000 anti-Xa IU in 0.5 mL graduated syringe (20,000 IU/mL). Generic name normalized to INN base (Tinzaparin).',
  },
  {
    brandName: 'Innohep 14,000 IU/0.7 mL',
    brandNameAr: 'إنوهيب 14,000 وحدة دولية/0.7 مل',
    genericName: 'Tinzaparin',
    activeIngredients: ['Tinzaparin'],
    drugClass: 'Antithrombotic agent (low molecular weight heparin)',
    strength: '14,000 anti-Xa IU/0.7 mL (20,000 IU/mL)',
    dosageForm: 'Solution for injection in graduated pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 2, 6, or 10 graduated pre-filled syringes of 0.7 mL',
    indications:
      'Treatment of venous thrombosis and thromboembolic disease including deep vein thrombosis (DVT) and pulmonary embolism (PE) in adults; extended treatment of venous thromboembolism and prevention of recurrences in adult patients with active cancer.',
    dose:
      '175 anti-Xa IU/kg body weight administered subcutaneously once daily (graduated syringe allows weight-adjusted dosing).',
    contraindications:
      'Hypersensitivity to tinzaparin sodium, heparin, or any excipient; current or history of immune-mediated heparin-induced thrombocytopenia (HIT, type II); active clinically significant bleeding or conditions predisposing to major haemorrhage; septic endocarditis; neuraxial anaesthesia during treatment doses of tinzaparin.',
    adverseEffects:
      'Haemorrhage, injection site haematoma/reaction, anaemia, thrombocytopenia, transient elevation of hepatic transaminases, rash, pruritus, hyperkalaemia, osteoporosis with prolonged use.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Hematology', 'Cardiology', 'Pulmonology', 'Oncology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Innohep 20,000 IU/ml Solution for Injection Syringes SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/3822/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains tinzaparin sodium 14,000 anti-Xa IU in 0.7 mL graduated syringe (20,000 IU/mL). Generic name normalized to INN base (Tinzaparin).',
  },
  {
    brandName: 'Innohep 18,000 IU/0.9 mL',
    brandNameAr: 'إنوهيب 18,000 وحدة دولية/0.9 مل',
    genericName: 'Tinzaparin',
    activeIngredients: ['Tinzaparin'],
    drugClass: 'Antithrombotic agent (low molecular weight heparin)',
    strength: '18,000 anti-Xa IU/0.9 mL (20,000 IU/mL)',
    dosageForm: 'Solution for injection in graduated pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 2, 6, or 10 graduated pre-filled syringes of 0.9 mL',
    indications:
      'Treatment of venous thrombosis and thromboembolic disease including deep vein thrombosis (DVT) and pulmonary embolism (PE) in adults; extended treatment of venous thromboembolism and prevention of recurrences in adult patients with active cancer.',
    dose:
      '175 anti-Xa IU/kg body weight administered subcutaneously once daily (graduated syringe allows weight-adjusted dosing).',
    contraindications:
      'Hypersensitivity to tinzaparin sodium, heparin, or any excipient; current or history of immune-mediated heparin-induced thrombocytopenia (HIT, type II); active clinically significant bleeding or conditions predisposing to major haemorrhage; septic endocarditis; neuraxial anaesthesia during treatment doses of tinzaparin.',
    adverseEffects:
      'Haemorrhage, injection site haematoma/reaction, anaemia, thrombocytopenia, transient elevation of hepatic transaminases, rash, pruritus, hyperkalaemia, osteoporosis with prolonged use.',
    storage: 'Do not store above 25°C. Do not freeze.',
    specialties: ['Hematology', 'Cardiology', 'Pulmonology', 'Oncology', 'Internal Medicine'],
    sources: [
      {
        title: 'UK EMC — Innohep 20,000 IU/ml Solution for Injection Syringes SmPC (LEO Pharma A/S)',
        url: 'https://www.medicines.org.uk/emc/product/3822/smpc',
      },
    ],
    notes:
      'Official UK EMC SmPC data (LEO Pharma). Contains tinzaparin sodium 18,000 anti-Xa IU in 0.9 mL graduated syringe (20,000 IU/mL). Generic name normalized to INN base (Tinzaparin).',
  },

  // 12. Adtralza (Tralokinumab)
  {
    brandName: 'Adtralza 150 mg',
    brandNameAr: 'أدترالزا 150 ملغ',
    genericName: 'Tralokinumab',
    activeIngredients: ['Tralokinumab'],
    drugClass: 'Human IgG4 monoclonal antibody interleukin-13 (IL-13) antagonist',
    strength: '150 mg/1 mL',
    dosageForm: 'Solution for injection in pre-filled syringe',
    route: 'Subcutaneous',
    packSize: 'Pack of 2 or 4 pre-filled syringes of 1 mL (150 mg/mL) with needle guard',
    indications:
      'Treatment of moderate-to-severe atopic dermatitis in adult and adolescent patients 12 years and older who are candidates for systemic therapy.',
    dose:
      'Recommended initial dose is 600 mg (four 150 mg subcutaneous injections), followed by 300 mg (two 150 mg subcutaneous injections) administered every other week (every 2 weeks). At prescriber discretion, every-fourth-week dosing may be considered for patients who achieve clear or almost clear skin after 16 weeks of treatment. Can be used with or without topical corticosteroids.',
    contraindications:
      'Hypersensitivity to tralokinumab or to any of the excipients.',
    adverseEffects:
      'Upper respiratory tract infections (common cold, pharyngitis), conjunctivitis, allergic conjunctivitis, injection site reactions (erythema, pain, swelling), eosinophilia, keratitis.',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Keep in the original package to protect from light. May be kept at room temperature up to 30°C for a maximum of 14 days.',
    specialties: ['Dermatology', 'Allergy & Immunology'],
    sources: [
      {
        title: 'EMA EPAR — Adtralza (tralokinumab) Product Information (LEO Pharma A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adtralza',
      },
    ],
    notes:
      'Official EMA EPAR product information (LEO Pharma A/S).',
  },
  {
    brandName: 'Adtralza 300 mg',
    brandNameAr: 'أدترالزا 300 ملغ',
    genericName: 'Tralokinumab',
    activeIngredients: ['Tralokinumab'],
    drugClass: 'Human IgG4 monoclonal antibody interleukin-13 (IL-13) antagonist',
    strength: '300 mg/2 mL',
    dosageForm: 'Solution for injection in pre-filled pen',
    route: 'Subcutaneous',
    packSize: 'Pack of 1 or 2 pre-filled pens of 2 mL (150 mg/mL)',
    indications:
      'Treatment of moderate-to-severe atopic dermatitis in adult and adolescent patients 12 years and older who are candidates for systemic therapy.',
    dose:
      'Recommended initial dose is 600 mg (two 300 mg injections), followed by 300 mg (one 300 mg injection) administered every other week as subcutaneous injection into the thigh or abdomen. Every-fourth-week dosing may be considered in patients achieving clear or almost clear skin after 16 weeks.',
    contraindications:
      'Hypersensitivity to tralokinumab or to any of the excipients.',
    adverseEffects:
      'Upper respiratory tract infections, conjunctivitis, allergic conjunctivitis, injection site reactions, eosinophilia, keratitis.',
    storage: 'Store in a refrigerator (2°C–8°C). Do not freeze. Keep in the original package to protect from light. May be kept at room temperature up to 30°C for a maximum of 14 days.',
    specialties: ['Dermatology', 'Allergy & Immunology'],
    sources: [
      {
        title: 'EMA EPAR — Adtralza (tralokinumab) Product Information (LEO Pharma A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/adtralza',
      },
    ],
    notes:
      'Official EMA EPAR product information (LEO Pharma A/S).',
  },

  // 13. Protopic (Tacrolimus — LEO Pharma A/S MAH)
  {
    brandName: 'Protopic 0.03%',
    brandNameAr: 'بروتوبك 0.03%',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Topical calcineurin inhibitor (immunomodulator for atopic dermatitis)',
    strength: '0.03% (0.3 mg/g)',
    dosageForm: 'Ointment',
    route: 'Cutaneous',
    packSize: 'Laminate tube of 30 g or 60 g ointment',
    indications:
      'Flare treatment and maintenance treatment of moderate to severe atopic dermatitis in adults, adolescents, and children from the age of 2 years who are not adequately responsive to or are intolerant of conventional therapies such as topical corticosteroids.',
    dose:
      'Children (2–15 years): Apply a thin layer of Protopic 0.03% ointment twice daily for up to 3 weeks, then reduce frequency to once daily until clearance of the lesion. Maintenance treatment (after up to 6 weeks of flare response): apply once daily twice a week (e.g. Monday and Thursday) to areas commonly affected by atopic dermatitis with 2–3 days between applications.',
    contraindications:
      'Hypersensitivity to tacrolimus, macrolides in general, or to any of the excipients.',
    adverseEffects:
      'Application site burning and pruritus (very common, typically mild-to-moderate and resolving within the first week), application site warmth, erythema, pain, irritation, paraesthesia, rash, folliculitis, herpes viral infections (herpes simplex, eczema herpeticum), alcohol intolerance (facial flushing or skin irritation after consumption of alcoholic beverages).',
    storage: 'Do not store above 25°C.',
    specialties: ['Dermatology', 'Pediatrics', 'Allergy & Immunology'],
    sources: [
      {
        title: 'EMA EPAR — Protopic (tacrolimus) Ointment Product Information (LEO Pharma A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/protopic',
      },
    ],
    notes:
      'Official EMA EPAR product information (Marketing Authorisation Holder: LEO Pharma A/S). Contains tacrolimus 0.3 mg/g (as tacrolimus monohydrate). Generic name normalized to INN base (Tacrolimus).',
  },
  {
    brandName: 'Protopic 0.1%',
    brandNameAr: 'بروتوبك 0.1%',
    genericName: 'Tacrolimus',
    activeIngredients: ['Tacrolimus'],
    drugClass: 'Topical calcineurin inhibitor (immunomodulator for atopic dermatitis)',
    strength: '0.1% (1.0 mg/g)',
    dosageForm: 'Ointment',
    route: 'Cutaneous',
    packSize: 'Laminate tube of 30 g or 60 g ointment',
    indications:
      'Flare treatment and maintenance treatment of moderate to severe atopic dermatitis in adults and adolescents (16 years of age and above) who are not adequately responsive to or are intolerant of conventional therapies such as topical corticosteroids.',
    dose:
      'Adults and adolescents (>=16 years): Start with Protopic 0.1% twice daily and continue until clearance of the lesion; if symptoms recur, twice-daily treatment with 0.1% should be restarted (an attempt should be made to reduce frequency or use 0.03% ointment if clinical condition allows). Maintenance treatment: apply once daily twice a week (e.g. Monday and Thursday) with 2–3 days between applications.',
    contraindications:
      'Hypersensitivity to tacrolimus, macrolides in general, or to any of the excipients.',
    adverseEffects:
      'Application site burning and pruritus, application site warmth, erythema, pain, irritation, paraesthesia, rash, folliculitis, cutaneous herpes viral infections, alcohol intolerance (facial flushing).',
    storage: 'Do not store above 25°C.',
    specialties: ['Dermatology', 'Allergy & Immunology'],
    sources: [
      {
        title: 'EMA EPAR — Protopic (tacrolimus) Ointment Product Information (LEO Pharma A/S)',
        url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/protopic',
      },
    ],
    notes:
      'Official EMA EPAR product information (Marketing Authorisation Holder: LEO Pharma A/S). Contains tacrolimus 1.0 mg/g (as tacrolimus monohydrate). Generic name normalized to INN base (Tacrolimus).',
  },
];

export const LEO_PHARMA_PRODUCTS: AiProductDraft[] = RAW_LEO_PHARMA.map((d) => ({
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

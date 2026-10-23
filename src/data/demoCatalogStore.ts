import {
  AuditLogEntry,
  CompanyRecord,
  CompanyRole,
  DemoUserSession,
  GenericDrugItem,
  MarketStatus,
  MediaType,
  PlatformRole,
  ProductCategory,
  ProductLifecycleStatus,
  ProductRecord,
  RegistrationStatus,
  TaxonomyItem,
} from '../types/catalog';

function createClinicalSvgDataUrl(
  title: string,
  subtitle: string,
  badge: string,
  accentHex: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <rect width="640" height="400" rx="16" fill="#1F2D38"/>
    <rect x="24" y="24" width="592" height="352" rx="12" fill="#263744" stroke="#51616D" stroke-width="2"/>
    <rect x="48" y="48" width="180" height="32" rx="16" fill="#123F68" stroke="${accentHex}" stroke-width="1.5"/>
    <text x="138" y="69" text-anchor="middle" fill="#5DB4F2" font-family="Arial, sans-serif" font-size="13" font-weight="700">${badge}</text>
    <text x="48" y="136" fill="#F2F5F8" font-family="Arial, sans-serif" font-size="30" font-weight="800">${title}</text>
    <text x="48" y="174" fill="#5DB4F2" font-family="Arial, sans-serif" font-size="18" font-weight="600">${subtitle}</text>
    <line x1="48" y1="208" x2="592" y2="208" stroke="#51616D" stroke-width="1.5"/>
    <rect x="48" y="234" width="250" height="108" rx="10" fill="#304451" stroke="#51616D"/>
    <text x="68" y="266" fill="#B8C3CC" font-family="Arial, sans-serif" font-size="13">PRIVATE STORAGE BUCKET</text>
    <text x="68" y="294" fill="#F2F5F8" font-family="monospace" font-size="14" font-weight="700">catalog-product-media</text>
    <text x="68" y="320" fill="#38C976" font-family="Arial, sans-serif" font-size="13" font-weight="700">Signed URL • RLS Verified</text>
    <rect x="324" y="234" width="268" height="108" rx="10" fill="#304451" stroke="#51616D"/>
    <text x="344" y="266" fill="#B8C3CC" font-family="Arial, sans-serif" font-size="13">MARKET AUTHORITY</text>
    <text x="344" y="294" fill="#F2F5F8" font-family="Arial, sans-serif" font-size="15" font-weight="700">Iraq Official Catalog</text>
    <text x="344" y="320" fill="#B8C3CC" font-family="Arial, sans-serif" font-size="13">Iraq Ministry of Health • Registered</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEMO_USERS: Record<string, DemoUserSession> = {
  doctor: {
    profileId: '70000000-0000-4000-8000-000000000001',
    fullName: 'Demo Doctor',
    email: 'doctor.demo@pharmaconnect.local',
    phone: '+9647000000001',
    role: PlatformRole.HealthcareProfessional,
    professionType: 'physician',
    verificationStatus: 'approved',
    specialtyName: 'Cardiology',
    workplace: 'Demo Medical Center',
    licenseNumber: 'DEMO-PHY-0001',
  },
  company_admin: {
    profileId: '70000000-0000-4000-8000-000000000002',
    fullName: 'Demo Company Admin',
    email: 'company.admin.demo@pharmaconnect.local',
    phone: '+9647000000002',
    role: PlatformRole.CompanyUser,
    companyRole: CompanyRole.CompanyAdmin,
    companyId: '75000000-0000-4000-8000-000000000001',
  },
  admin: {
    profileId: '70000000-0000-4000-8000-000000000003',
    fullName: 'Demo Admin Reviewer',
    email: 'admin.demo@pharmaconnect.local',
    phone: '+9647000000003',
    role: PlatformRole.Admin,
  },
  pending_doctor: {
    profileId: '70000000-0000-4000-8000-000000000004',
    fullName: 'Dr. Pending Verification',
    email: 'pending.hcp@pharmaconnect.local',
    phone: '+9647000000004',
    role: PlatformRole.HealthcareProfessional,
    professionType: 'physician',
    verificationStatus: 'pending',
    specialtyName: 'Pulmonology / Respiratory Medicine',
    workplace: 'Baghdad Teaching Hospital (Demo)',
    licenseNumber: 'DEMO-PHY-0009',
  },
};

export const DEMO_COMPANIES: CompanyRecord[] = [
  {
    id: '75000000-0000-4000-8000-000000000001',
    companyName: 'Tigris Pharma',
    legalName: 'Tigris Pharma Demo LLC — Baghdad, Iraq',
    description: 'Verified pharmaceutical company for PharmaConnect MVP catalog workflow.',
    websiteUrl: 'https://demo.tigris-pharma.local',
    contactEmail: 'catalog@tigris-pharma.local',
    contactPhone: '+9647000000000',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000002',
    companyName: 'Pioneer Pharmaceutical Industries',
    legalName: 'Pioneer Co. for Pharmaceutical Industries — Sulaymaniyah, Iraq',
    description: 'National pharmaceutical manufacturer registered in Iraq.',
    websiteUrl: 'https://pioneer.iq.local',
    contactEmail: 'medical@pioneer.iq.local',
    contactPhone: '+9647700000002',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000003',
    companyName: 'Awamedica',
    legalName: 'Awamedica Pharmaceutical Company — Erbil, Iraq',
    description: 'Research-driven pharmaceutical manufacturer operating in Iraq.',
    websiteUrl: 'https://awamedica.iq.local',
    contactEmail: 'scientific@awamedica.iq.local',
    contactPhone: '+9647500000003',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000004',
    companyName: 'SDI — Samarra Drug Industries',
    legalName: 'State Company for Drug Industries and Medical Appliances — Samarra, Iraq',
    description: 'Foundational Iraqi national pharmaceutical manufacturer.',
    websiteUrl: 'https://sdi.iq.local',
    contactEmail: 'info@sdi.iq.local',
    contactPhone: '+9647900000004',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000005',
    companyName: 'Ninevah Drug Industries (NDI)',
    legalName: 'Ninevah Pharmaceutical Industries — Mosul, Iraq',
    description: 'National solid, liquid, and sterile dosage form manufacturer in Iraq.',
    websiteUrl: 'https://ndi.iq.local',
    contactEmail: 'scientific@ndi.iq.local',
    contactPhone: '+9647700000005',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000006',
    companyName: 'Al-Mansour Pharma',
    legalName: 'Al-Mansour Company for Pharmaceutical Industries — Baghdad, Iraq',
    description: 'Baghdad-based pharmaceutical manufacturer.',
    websiteUrl: 'https://almansour.iq.local',
    contactEmail: 'catalog@almansour.iq.local',
    contactPhone: '+9647800000006',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000007',
    companyName: 'Hikma Pharmaceuticals Iraq',
    legalName: 'Hikma Pharmaceuticals Scientific Bureau — Baghdad, Iraq',
    description: 'Regional multinational pharmaceutical company registered in Iraq.',
    websiteUrl: 'https://hikma.iq.local',
    contactEmail: 'iraq.medical@hikma.local',
    contactPhone: '+9647800000007',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000008',
    companyName: 'Dar Al Dawa Iraq',
    legalName: 'Dar Al Dawa Development & Investment Scientific Bureau — Baghdad, Iraq',
    description: 'MENA pharmaceutical company with registered formulations in Iraq.',
    websiteUrl: 'https://dad.iq.local',
    contactEmail: 'iraq@dad.local',
    contactPhone: '+9647800000008',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000009',
    companyName: 'Julphar Iraq',
    legalName: 'Gulf Pharmaceutical Industries (Julphar) Scientific Office — Baghdad, Iraq',
    description: 'Regional pharmaceutical and insulin producer operating in Iraq.',
    websiteUrl: 'https://julphar.iq.local',
    contactEmail: 'iraq@julphar.local',
    contactPhone: '+9647800000009',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000010',
    companyName: 'Tabuk Pharmaceuticals Iraq',
    legalName: 'Tabuk Pharmaceutical Manufacturing Scientific Bureau — Baghdad, Iraq',
    description: 'Specialty and primary care formulations registered in Iraq.',
    websiteUrl: 'https://tabuk.iq.local',
    contactEmail: 'iraq@tabuk.local',
    contactPhone: '+9647800000010',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000011',
    companyName: 'SPIMACO Addwaeih Iraq',
    legalName: 'Saudi Pharmaceutical Industries & Medical Appliances — Iraq Bureau',
    description: 'Registered prescription and hospital products across Iraq.',
    websiteUrl: 'https://spimaco.iq.local',
    contactEmail: 'iraq@spimaco.local',
    contactPhone: '+9647800000011',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000012',
    companyName: 'AstraZeneca Iraq',
    legalName: 'AstraZeneca Scientific Office — Baghdad & Erbil, Iraq',
    description: 'Cardiovascular, renal, metabolic, respiratory, and oncology portfolio in Iraq.',
    websiteUrl: 'https://astrazeneca.iq.local',
    contactEmail: 'iraq.medinfo@astrazeneca.local',
    contactPhone: '+9647800000012',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000013',
    companyName: 'Novartis Iraq',
    legalName: 'Novartis Pharma Services Scientific Office — Baghdad, Iraq',
    description: 'Cardiology, immunology, neuroscience, and oncology medicines in Iraq.',
    websiteUrl: 'https://novartis.iq.local',
    contactEmail: 'iraq.medical@novartis.local',
    contactPhone: '+9647800000013',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000014',
    companyName: 'Sanofi Iraq',
    legalName: 'Sanofi Aventis Scientific Bureau — Baghdad, Iraq',
    description: 'Diabetes, cardiovascular, internal medicine, and specialty care in Iraq.',
    websiteUrl: 'https://sanofi.iq.local',
    contactEmail: 'iraq.medical@sanofi.local',
    contactPhone: '+9647800000014',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000015',
    companyName: 'Pfizer Iraq',
    legalName: 'Pfizer Scientific Office — Baghdad, Iraq',
    description: 'Anti-infectives, internal medicine, inflammation, and oncology in Iraq.',
    websiteUrl: 'https://pfizer.iq.local',
    contactEmail: 'iraq.medinfo@pfizer.local',
    contactPhone: '+9647800000015',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000016',
    companyName: 'Roche Iraq',
    legalName: 'F. Hoffmann-La Roche Scientific Office — Baghdad, Iraq',
    description: 'Oncology, hematology, neurology, and immunology biologics in Iraq.',
    websiteUrl: 'https://roche.iq.local',
    contactEmail: 'iraq.medinfo@roche.local',
    contactPhone: '+9647800000016',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000017',
    companyName: 'Novo Nordisk Iraq',
    legalName: 'Novo Nordisk Scientific Bureau — Baghdad, Iraq',
    description: 'Diabetes care, GLP-1 therapies, insulins, and rare endocrine disorders in Iraq.',
    websiteUrl: 'https://novonordisk.iq.local',
    contactEmail: 'iraq@novonordisk.local',
    contactPhone: '+9647800000017',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000018',
    companyName: 'Bayer Iraq',
    legalName: 'Bayer Middle East Scientific Office — Baghdad, Iraq',
    description: 'Cardiology, women’s healthcare, ophthalmology, and radiology in Iraq.',
    websiteUrl: 'https://bayer.iq.local',
    contactEmail: 'iraq@bayer.local',
    contactPhone: '+9647800000018',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000019',
    companyName: 'Boehringer Ingelheim Iraq',
    legalName: 'Boehringer Ingelheim Scientific Office — Baghdad, Iraq',
    description: 'Cardiometabolic and respiratory medicine portfolio in Iraq.',
    websiteUrl: 'https://boehringer.iq.local',
    contactEmail: 'iraq@boehringer.local',
    contactPhone: '+9647800000019',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000020',
    companyName: 'Servier Iraq',
    legalName: 'Les Laboratoires Servier Scientific Office — Baghdad, Iraq',
    description: 'Cardiology, venous disease, diabetology, and oncology medicines in Iraq.',
    websiteUrl: 'https://servier.iq.local',
    contactEmail: 'iraq@servier.local',
    contactPhone: '+9647800000020',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000021',
    companyName: 'GSK Iraq',
    legalName: 'GlaxoSmithKline Scientific Bureau — Baghdad, Iraq',
    description: 'Respiratory, anti-infectives, immunology, and vaccines in Iraq.',
    websiteUrl: 'https://gsk.iq.local',
    contactEmail: 'iraq@gsk.local',
    contactPhone: '+9647800000021',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000022',
    companyName: 'Merck Iraq',
    legalName: 'Merck Serono Scientific Bureau — Baghdad, Iraq',
    description: 'Endocrinology, thyroid, cardiometabolic, and neurology therapies in Iraq.',
    websiteUrl: 'https://merck.iq.local',
    contactEmail: 'iraq@merck.local',
    contactPhone: '+9647800000022',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000023',
    companyName: 'Abbott Iraq',
    legalName: 'Abbott Established Pharmaceuticals Scientific Office — Baghdad, Iraq',
    description: 'Gastroenterology, women’s health, cardiology, and neurology in Iraq.',
    websiteUrl: 'https://abbott.iq.local',
    contactEmail: 'iraq@abbott.local',
    contactPhone: '+9647800000023',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '75000000-0000-4000-8000-000000000024',
    companyName: 'Eva Pharma Iraq',
    legalName: 'Eva Pharma Scientific Bureau — Baghdad, Iraq',
    description: 'Neurology, endocrinology, orthopedics, and anti-infectives in Iraq.',
    websiteUrl: 'https://evapharma.iq.local',
    contactEmail: 'iraq@evapharma.local',
    contactPhone: '+9647800000024',
    status: 'verified',
    verifiedAt: '2026-06-29T09:00:00Z',
  },
];

export const DEMO_COMPANY: CompanyRecord = DEMO_COMPANIES[0];

export const DEMO_SPECIALTIES: TaxonomyItem[] = [
  {
    id: '73000000-0000-4000-8000-000000000003',
    code: 'allergy_and_immunology',
    nameEn: 'Allergy and Immunology',
    descriptionEn: 'Clinical immunology, allergic disorders, and hypersensitivity management.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000004',
    code: 'anesthesiology',
    nameEn: 'Anesthesiology',
    descriptionEn: 'Perioperative anesthesia, sedation, and acute pain management.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000001',
    code: 'cardiology',
    nameEn: 'Cardiology',
    descriptionEn: 'Cardiovascular medicine, heart failure, arrhythmias, and hypertension.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000005',
    code: 'cardiothoracic_surgery',
    nameEn: 'Cardiothoracic Surgery',
    descriptionEn: 'Surgical management of heart, great vessel, and thoracic diseases.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000006',
    code: 'clinical_pharmacology',
    nameEn: 'Clinical Pharmacology',
    descriptionEn: 'Rational drug therapy, pharmacokinetics, and therapeutic drug monitoring.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000007',
    code: 'colon_and_rectal_surgery',
    nameEn: 'Colorectal Surgery',
    descriptionEn: 'Surgical disorders of the colon, rectum, and intestinal tract.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000008',
    code: 'critical_care_medicine',
    nameEn: 'Critical Care Medicine',
    descriptionEn: 'Intensive care unit support, hemodynamic stabilization, and life support.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000009',
    code: 'dermatology',
    nameEn: 'Dermatology',
    descriptionEn: 'Medical and surgical management of skin, hair, and nail disorders.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000010',
    code: 'emergency_medicine',
    nameEn: 'Emergency Medicine',
    descriptionEn: 'Acute emergency care, resuscitation, and trauma stabilization.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000011',
    code: 'endocrinology',
    nameEn: 'Endocrinology, Diabetes and Metabolism',
    descriptionEn: 'Hormonal disorders, diabetes mellitus, thyroid, and metabolic diseases.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000012',
    code: 'family_medicine',
    nameEn: 'Family Medicine',
    descriptionEn: 'Comprehensive primary healthcare across all ages and chronic conditions.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000013',
    code: 'gastroenterology',
    nameEn: 'Gastroenterology and Hepatology',
    descriptionEn: 'Digestive tract, liver, biliary tree, and pancreatic disorders.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000014',
    code: 'general_practice',
    nameEn: 'General Practice',
    descriptionEn: 'Primary medical consultation, acute illness care, and preventive health.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000015',
    code: 'general_surgery',
    nameEn: 'General Surgery',
    descriptionEn: 'Abdominal, gastrointestinal, endocrine, and soft-tissue surgery.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000016',
    code: 'geriatric_medicine',
    nameEn: 'Geriatric Medicine',
    descriptionEn: 'Clinical care of older adults, polypharmacy management, and aging syndromes.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000017',
    code: 'hematology',
    nameEn: 'Hematology',
    descriptionEn: 'Disorders of blood, bone marrow, coagulation, and hemoglobinopathies.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000018',
    code: 'infectious_diseases',
    nameEn: 'Infectious Diseases',
    descriptionEn: 'Bacterial, viral, fungal, parasitic infections, and antimicrobial stewardship.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000019',
    code: 'internal_medicine',
    nameEn: 'Internal Medicine',
    descriptionEn: 'Adult multisystem medical diagnosis and chronic disease management.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000020',
    code: 'interventional_radiology',
    nameEn: 'Interventional Radiology',
    descriptionEn: 'Minimally invasive image-guided vascular and non-vascular procedures.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000021',
    code: 'medical_genetics',
    nameEn: 'Medical Genetics and Genomics',
    descriptionEn: 'Hereditary syndromes, metabolic genetics, and genomic medicine.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000022',
    code: 'medical_oncology',
    nameEn: 'Medical Oncology',
    descriptionEn: 'Systemic cancer therapy, immunotherapy, targeted agents, and solid tumors.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000023',
    code: 'neonatology',
    nameEn: 'Neonatology',
    descriptionEn: 'Intensive and specialized care of newborn and premature infants.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000024',
    code: 'nephrology',
    nameEn: 'Nephrology',
    descriptionEn: 'Renal diseases, hypertension, electrolyte disorders, and dialysis care.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000025',
    code: 'neurology',
    nameEn: 'Neurology',
    descriptionEn: 'Central, peripheral, and autonomic nervous system disorders.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000026',
    code: 'neurosurgery',
    nameEn: 'Neurosurgery',
    descriptionEn: 'Surgical treatment of brain, spinal cord, and peripheral nerve conditions.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000027',
    code: 'nuclear_medicine',
    nameEn: 'Nuclear Medicine',
    descriptionEn: 'Diagnostic radiopharmaceutical imaging and targeted radionuclide therapy.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000028',
    code: 'obstetrics_and_gynecology',
    nameEn: 'Obstetrics and Gynecology',
    descriptionEn: 'Maternal-fetal health, pregnancy care, and female reproductive medicine.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000029',
    code: 'occupational_medicine',
    nameEn: 'Occupational and Environmental Medicine',
    descriptionEn: 'Workplace health, toxicology, and occupational injury prevention.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000030',
    code: 'ophthalmology',
    nameEn: 'Ophthalmology',
    descriptionEn: 'Medical and microsurgical treatment of ocular and visual disorders.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000031',
    code: 'orthopedic_surgery',
    nameEn: 'Orthopedic Surgery',
    descriptionEn: 'Musculoskeletal trauma, joint reconstruction, and spine orthopedics.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000032',
    code: 'otolaryngology',
    nameEn: 'Otolaryngology (ENT)',
    descriptionEn: 'Medical and surgical management of ear, nose, throat, and head-neck diseases.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000033',
    code: 'pain_medicine',
    nameEn: 'Pain Medicine',
    descriptionEn: 'Multidisciplinary management of acute, chronic, and cancer pain.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000034',
    code: 'palliative_medicine',
    nameEn: 'Palliative Medicine',
    descriptionEn: 'Symptom relief and supportive care for serious and life-limiting illnesses.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000035',
    code: 'pathology',
    nameEn: 'Pathology and Laboratory Medicine',
    descriptionEn: 'Histopathology, cytopathology, clinical biochemistry, and microbiology.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000036',
    code: 'pediatrics',
    nameEn: 'Pediatrics',
    descriptionEn: 'Infant, child, and adolescent medical care, immunization, and growth.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000037',
    code: 'physical_medicine_rehabilitation',
    nameEn: 'Physical Medicine and Rehabilitation',
    descriptionEn: 'Functional restoration, neurorehabilitation, and musculoskeletal recovery.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000038',
    code: 'plastic_surgery',
    nameEn: 'Plastic and Reconstructive Surgery',
    descriptionEn: 'Reconstructive microsurgery, craniofacial repair, and burn care.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000039',
    code: 'preventive_medicine',
    nameEn: 'Preventive and Public Health Medicine',
    descriptionEn: 'Epidemiology, disease prevention, and population health programs.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000040',
    code: 'psychiatry',
    nameEn: 'Psychiatry',
    descriptionEn: 'Diagnosis, pharmacotherapy, and care of mental and behavioral disorders.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000002',
    code: 'respiratory_medicine',
    nameEn: 'Pulmonology / Respiratory Medicine',
    descriptionEn: 'Bronchial asthma, COPD, interstitial lung disease, and pulmonary care.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000041',
    code: 'radiation_oncology',
    nameEn: 'Radiation Oncology',
    descriptionEn: 'Therapeutic external-beam and brachytherapy radiation oncology.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000042',
    code: 'radiology',
    nameEn: 'Radiology and Diagnostic Imaging',
    descriptionEn: 'CT, MRI, ultrasound, fluoroscopy, and contrast-enhanced diagnostic imaging.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000043',
    code: 'rheumatology',
    nameEn: 'Rheumatology',
    descriptionEn: 'Autoimmune connective tissue diseases, inflammatory arthritis, and vasculitis.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000044',
    code: 'sports_medicine',
    nameEn: 'Sports and Exercise Medicine',
    descriptionEn: 'Athletic injury management, exercise physiology, and musculoskeletal care.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000045',
    code: 'urology',
    nameEn: 'Urology',
    descriptionEn: 'Urinary tract and male reproductive system medical and surgical care.',
    isActive: true,
  },
  {
    id: '73000000-0000-4000-8000-000000000046',
    code: 'vascular_surgery',
    nameEn: 'Vascular Surgery',
    descriptionEn: 'Arterial, venous, and endovascular surgical reconstruction.',
    isActive: true,
  },
];

export const DEMO_DRUG_CLASSES: TaxonomyItem[] = [
  {
    id: '77000000-0000-4000-8000-000000000003',
    code: 'ace_inhibitors',
    nameEn: 'ACE Inhibitors',
    descriptionEn: 'Angiotensin-converting enzyme inhibitors for hypertension and heart failure.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000004',
    code: 'alpha_blockers',
    nameEn: 'Alpha-Adrenergic Blockers',
    descriptionEn: 'Selective and non-selective alpha-adrenoceptor antagonists for BPH and hypertension.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000005',
    code: 'aminoglycosides',
    nameEn: 'Aminoglycoside Antibiotics',
    descriptionEn: 'Bactericidal gram-negative parenteral and topical aminoglycoside antibacterials.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000006',
    code: 'analgesics_non_opioid_nsaids',
    nameEn: 'Analgesics — Non-Opioid & NSAIDs',
    descriptionEn: 'Paracetamol and non-steroidal anti-inflammatory COX-1/COX-2 inhibitors.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000007',
    code: 'analgesics_opioid',
    nameEn: 'Analgesics — Opioid',
    descriptionEn: 'Controlled mu-opioid receptor agonists for severe acute and palliative pain.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000008',
    code: 'angiotensin_receptor_blockers',
    nameEn: 'Angiotensin II Receptor Blockers (ARBs)',
    descriptionEn: 'AT1 receptor antagonists for hypertension, diabetic nephropathy, and heart failure.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000009',
    code: 'antiarrhythmics',
    nameEn: 'Antiarrhythmics (Class I–IV)',
    descriptionEn: 'Sodium, potassium, and calcium channel cardiac rhythm control agents.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000010',
    code: 'anticoagulants_doacs',
    nameEn: 'Anticoagulants & Direct Oral Anticoagulants (DOACs)',
    descriptionEn: 'Factor Xa inhibitors, direct thrombin inhibitors, heparins, and coumarins.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000011',
    code: 'anticonvulsants',
    nameEn: 'Anticonvulsants & Antiepileptics',
    descriptionEn: 'Seizure prophylaxis, status epilepticus, and neuropathic pain modulators.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000012',
    code: 'antidepressants_ssri_snri',
    nameEn: 'Antidepressants — SSRIs, SNRIs & Tricyclics',
    descriptionEn: 'Monoamine reuptake inhibitors and receptor modulators for depressive and anxiety disorders.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000013',
    code: 'antidiabetics_biguanides_sulfonylureas',
    nameEn: 'Antidiabetics — Biguanides & Sulfonylureas',
    descriptionEn: 'Oral insulin sensitizers and secretagogues for type 2 diabetes mellitus.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000014',
    code: 'antidiabetics_dpp4_inhibitors',
    nameEn: 'Antidiabetics — DPP-4 Inhibitors (Gliptins)',
    descriptionEn: 'Incretin enhancer dipeptidyl peptidase-4 inhibitors.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000015',
    code: 'antidiabetics_glp1_agonists',
    nameEn: 'Antidiabetics — GLP-1 Receptor Agonists',
    descriptionEn: 'Glucagon-like peptide-1 receptor agonists for glycemic and cardiometabolic control.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000016',
    code: 'antidiabetics_insulins',
    nameEn: 'Antidiabetics — Insulins & Analogues',
    descriptionEn: 'Rapid-acting, short-acting, intermediate, premixed, and basal insulin analogues.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000017',
    code: 'antidiabetics_sglt2_inhibitors',
    nameEn: 'Antidiabetics — SGLT2 Inhibitors (Gliflozins)',
    descriptionEn: 'Sodium-glucose cotransporter-2 inhibitors for diabetes, heart failure, and CKD.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000018',
    code: 'antiemetics_prokinetics',
    nameEn: 'Antiemetics & Prokinetics',
    descriptionEn: '5-HT3 antagonists, dopamine antagonists, and NK1 receptor blockers.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000019',
    code: 'antifungals',
    nameEn: 'Antifungal Agents',
    descriptionEn: 'Triazoles, echinocandins, polyenes, and allylamines for systemic and mucocutaneous mycoses.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000020',
    code: 'antihistamines',
    nameEn: 'Antihistamines (H1 Receptor Antagonists)',
    descriptionEn: 'First- and second-generation histamine H1 blockers for allergic rhinitis and urticaria.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000021',
    code: 'antihyperlipidemics_statins',
    nameEn: 'Antihyperlipidemics — Statins & Lipid-Lowering Agents',
    descriptionEn: 'HMG-CoA reductase inhibitors, ezetimibe, fibrates, and PCSK9 inhibitors.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000022',
    code: 'antineoplastics_targeted_oncology',
    nameEn: 'Antineoplastics & Targeted Oncology Therapy',
    descriptionEn: 'Cytotoxic chemotherapy, tyrosine kinase inhibitors, and monoclonal antibodies.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000023',
    code: 'antiplatelets',
    nameEn: 'Antiplatelet Agents',
    descriptionEn: 'P2Y12 receptor inhibitors, COX-1 inhibitors, and glycoprotein IIb/IIIa blockers.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000024',
    code: 'antipsychotics',
    nameEn: 'Antipsychotics (First- & Second-Generation)',
    descriptionEn: 'Dopamine-serotonin receptor antagonists and partial agonists.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000025',
    code: 'antivirals',
    nameEn: 'Antivirals & Direct-Acting Antivirals',
    descriptionEn: 'Nucleoside analogues, neuraminidase inhibitors, and hepatitis/herpes antivirals.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000001',
    code: 'beta_blockers',
    nameEn: 'Beta Blockers (Beta-Adrenergic Antagonists)',
    descriptionEn: 'Cardioselective and non-selective beta-adrenergic blockers for cardiovascular care.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000026',
    code: 'bisphosphonates_bone_metabolism',
    nameEn: 'Bisphosphonates & Bone Metabolism Agents',
    descriptionEn: 'Osteoclast inhibitors and RANKL modulators for osteoporosis and bone metastases.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000002',
    code: 'bronchodilators',
    nameEn: 'Bronchodilators (SABA, LABA & LAMA)',
    descriptionEn: 'Short- and long-acting beta-2 agonists and muscarinic antagonists for asthma and COPD.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000027',
    code: 'calcium_channel_blockers',
    nameEn: 'Calcium Channel Blockers (CCBs)',
    descriptionEn: 'Dihydropyridine and non-dihydropyridine L-type calcium channel blockers.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000028',
    code: 'carbapenems_monobactams',
    nameEn: 'Carbapenems & Broad-Spectrum Beta-Lactams',
    descriptionEn: 'Hospital reserve parenteral beta-lactam antibiotics for multidrug-resistant infections.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000029',
    code: 'cephalosporins',
    nameEn: 'Cephalosporin Antibiotics (1st–5th Generation)',
    descriptionEn: 'Oral and parenteral bactericidal beta-lactam cephalosporins.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000030',
    code: 'corticosteroids_inhaled_intranasal',
    nameEn: 'Corticosteroids — Inhaled & Intranasal (ICS)',
    descriptionEn: 'Topical airway glucocorticoids for asthma control and allergic rhinitis.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000031',
    code: 'corticosteroids_systemic_topical',
    nameEn: 'Corticosteroids — Systemic & Dermatological',
    descriptionEn: 'Oral, parenteral, and cutaneous anti-inflammatory and immunosuppressive steroids.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000032',
    code: 'diuretics',
    nameEn: 'Diuretics (Loop, Thiazide & Mineralocorticoid Antagonists)',
    descriptionEn: 'Renal natriuretic and antikaliuretic agents for edema, heart failure, and hypertension.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000033',
    code: 'fluoroquinolones',
    nameEn: 'Fluoroquinolone Antibiotics',
    descriptionEn: 'DNA gyrase and topoisomerase IV inhibitors for respiratory and urinary infections.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000034',
    code: 'immunomodulators_biologics',
    nameEn: 'Immunosuppressants & Targeted Biologics (DMARDs)',
    descriptionEn: 'Calcineurin inhibitors, anti-TNF, IL inhibitors, and JAK inhibitors.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000035',
    code: 'leukotriene_receptor_antagonists',
    nameEn: 'Leukotriene Receptor Antagonists',
    descriptionEn: 'CysLT1 antagonists for asthma prophylaxis and seasonal allergic rhinitis.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000036',
    code: 'macrolides',
    nameEn: 'Macrolide Antibiotics',
    descriptionEn: '50S ribosomal subunit protein synthesis inhibitors (azithromycin, clarithromycin).',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000037',
    code: 'mucolytics_antitussives',
    nameEn: 'Mucolytics, Expectorants & Antitussives',
    descriptionEn: 'Airway mucokinetic and cough-suppressant respiratory agents.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000038',
    code: 'muscle_relaxants',
    nameEn: 'Muscle Relaxants & Antispasmodics',
    descriptionEn: 'Central skeletal muscle relaxants and smooth muscle antispasmodics.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000039',
    code: 'ophthalmic_preparations',
    nameEn: 'Ophthalmic Anti-Glaucoma & Anti-Infective Preparations',
    descriptionEn: 'Prostaglandin analogues, topical beta blockers, carbonic anhydrase inhibitors, and eye drops.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000040',
    code: 'penicillins_beta_lactams',
    nameEn: 'Penicillins & Beta-Lactamase Inhibitor Combinations',
    descriptionEn: 'Aminopenicillins, anti-pseudomonal penicillins, and clavulanate/tazobactam combinations.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000041',
    code: 'proton_pump_inhibitors',
    nameEn: 'Proton Pump Inhibitors (PPIs) & H2 Antagonists',
    descriptionEn: 'Gastric parietal cell H+/K+ ATPase inhibitors and histamine H2 blockers.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000042',
    code: 'sedatives_anxiolytics',
    nameEn: 'Sedatives, Hypnotics & Anxiolytics',
    descriptionEn: 'GABA-A receptor modulators and non-benzodiazepine hypnotics.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000043',
    code: 'tetracyclines_glycylcyclines',
    nameEn: 'Tetracycline & Glycylcycline Antibiotics',
    descriptionEn: '30S ribosomal subunit inhibitors for atypical, acne, and broad-spectrum infections.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000044',
    code: 'thyroid_antithyroid_agents',
    nameEn: 'Thyroid Hormones & Antithyroid Agents',
    descriptionEn: 'Levothyroxine replacement and thionamide thyroid peroxidase inhibitors.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000045',
    code: 'urologicals_pde5_bph',
    nameEn: 'Urologicals, PDE5 Inhibitors & 5-Alpha-Reductase Inhibitors',
    descriptionEn: 'Benign prostatic hyperplasia, overactive bladder, and urological therapies.',
    isActive: true,
  },
  {
    id: '77000000-0000-4000-8000-000000000046',
    code: 'vitamins_minerals_hematinics',
    nameEn: 'Vitamins, Minerals & Hematinics (Iron / Erythropoietins)',
    descriptionEn: 'Oral and parenteral iron, B-complex, cholecalciferol, and erythropoiesis-stimulating agents.',
    isActive: true,
  },
];

export const DEMO_GENERIC_DRUGS: GenericDrugItem[] = [
  {
    id: '79000000-0000-4000-8000-000000000001',
    code: 'bisoprolol',
    nameEn: 'Bisoprolol',
    descriptionEn: 'Cardioselective beta-1 adrenergic blocker.',
    drugClassId: '77000000-0000-4000-8000-000000000001',
    ingredients: ['Bisoprolol Fumarate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000002',
    code: 'salbutamol',
    nameEn: 'Salbutamol',
    descriptionEn: 'Short-acting selective beta-2 adrenergic bronchodilator.',
    drugClassId: '77000000-0000-4000-8000-000000000002',
    ingredients: ['Salbutamol Sulfate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000003',
    code: 'rosuvastatin',
    nameEn: 'Rosuvastatin',
    descriptionEn: 'Selective and competitive HMG-CoA reductase inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000021',
    ingredients: ['Rosuvastatin Calcium'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000004',
    nameEn: 'Empagliflozin',
    code: 'empagliflozin',
    descriptionEn: 'Sodium-glucose co-transporter-2 (SGLT2) inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000017',
    ingredients: ['Empagliflozin'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000005',
    code: 'esomeprazole',
    nameEn: 'Esomeprazole',
    descriptionEn: 'S-isomer proton pump inhibitor for gastric acid suppression.',
    drugClassId: '77000000-0000-4000-8000-000000000041',
    ingredients: ['Esomeprazole Magnesium Trihydrate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000006',
    code: 'amoxicillin_clavulanate',
    nameEn: 'Amoxicillin + Clavulanic Acid',
    descriptionEn: 'Broad-spectrum aminopenicillin and beta-lactamase inhibitor combination.',
    drugClassId: '77000000-0000-4000-8000-000000000040',
    ingredients: ['Amoxicillin Trihydrate', 'Potassium Clavulanate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000007',
    code: 'dapagliflozin',
    nameEn: 'Dapagliflozin',
    descriptionEn: 'Selective sodium-glucose co-transporter 2 (SGLT2) inhibitor for T2DM, heart failure, and CKD.',
    drugClassId: '77000000-0000-4000-8000-000000000017',
    ingredients: ['Dapagliflozin Propanediol Monohydrate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000008',
    code: 'dapagliflozin_metformin',
    nameEn: 'Dapagliflozin + Metformin HCl',
    descriptionEn: 'Fixed-dose SGLT2 inhibitor and biguanide extended-release combination.',
    drugClassId: '77000000-0000-4000-8000-000000000017',
    ingredients: ['Dapagliflozin Propanediol Monohydrate', 'Metformin Hydrochloride'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000009',
    code: 'ticagrelor',
    nameEn: 'Ticagrelor',
    descriptionEn: 'Direct-acting, reversible P2Y12 platelet adenosine diphosphate receptor antagonist.',
    drugClassId: '77000000-0000-4000-8000-000000000023',
    ingredients: ['Ticagrelor'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000010',
    code: 'metoprolol_succinate',
    nameEn: 'Metoprolol Succinate',
    descriptionEn: 'Cardioselective beta-1 adrenergic receptor blocker in zero-order kinetic formulation.',
    drugClassId: '77000000-0000-4000-8000-000000000001',
    ingredients: ['Metoprolol Succinate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000011',
    code: 'candesartan_cilexetil',
    nameEn: 'Candesartan Cilexetil',
    descriptionEn: 'Selective angiotensin II type 1 (AT1) receptor antagonist.',
    drugClassId: '77000000-0000-4000-8000-000000000008',
    ingredients: ['Candesartan Cilexetil'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000012',
    code: 'candesartan_hydrochlorothiazide',
    nameEn: 'Candesartan Cilexetil + Hydrochlorothiazide',
    descriptionEn: 'Angiotensin II receptor blocker and thiazide diuretic antihypertensive combination.',
    drugClassId: '77000000-0000-4000-8000-000000000008',
    ingredients: ['Candesartan Cilexetil', 'Hydrochlorothiazide'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000013',
    code: 'felodipine',
    nameEn: 'Felodipine',
    descriptionEn: 'Vascular-selective dihydropyridine L-type calcium channel antagonist.',
    drugClassId: '77000000-0000-4000-8000-000000000027',
    ingredients: ['Felodipine'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000014',
    code: 'saxagliptin',
    nameEn: 'Saxagliptin',
    descriptionEn: 'Competitive dipeptidyl peptidase-4 (DPP-4) inhibitor for type 2 diabetes mellitus.',
    drugClassId: '77000000-0000-4000-8000-000000000014',
    ingredients: ['Saxagliptin Hydrochloride'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000015',
    code: 'budesonide_formoterol',
    nameEn: 'Budesonide + Formoterol Fumarate Dihydrate',
    descriptionEn: 'Inhaled corticosteroid and rapid/long-acting beta-2 agonist combination.',
    drugClassId: '77000000-0000-4000-8000-000000000030',
    ingredients: ['Budesonide', 'Formoterol Fumarate Dihydrate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000016',
    code: 'budesonide',
    nameEn: 'Budesonide',
    descriptionEn: 'Potent non-halogenated inhaled glucocorticosteroid for airway inflammation.',
    drugClassId: '77000000-0000-4000-8000-000000000030',
    ingredients: ['Budesonide'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000017',
    code: 'terbutaline_sulfate',
    nameEn: 'Terbutaline Sulfate',
    descriptionEn: 'Short-acting selective beta-2 adrenergic agonist bronchodilator.',
    drugClassId: '77000000-0000-4000-8000-000000000002',
    ingredients: ['Terbutaline Sulfate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000018',
    code: 'benralizumab',
    nameEn: 'Benralizumab',
    descriptionEn: 'Humanized afucosylated monoclonal antibody targeting IL-5 receptor alpha on eosinophils.',
    drugClassId: '77000000-0000-4000-8000-000000000034',
    ingredients: ['Benralizumab'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000019',
    code: 'omeprazole',
    nameEn: 'Omeprazole',
    descriptionEn: 'Substituted benzimidazole gastric parietal cell proton pump inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000041',
    ingredients: ['Omeprazole'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000020',
    code: 'osimertinib',
    nameEn: 'Osimertinib',
    descriptionEn: 'Third-generation irreversible EGFR tyrosine kinase inhibitor targeting sensitizing and T790M mutations.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Osimertinib Mesylate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000021',
    code: 'olaparib',
    nameEn: 'Olaparib',
    descriptionEn: 'Selective poly (ADP-ribose) polymerase (PARP-1, PARP-2, PARP-3) inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Olaparib'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000022',
    code: 'durvalumab',
    nameEn: 'Durvalumab',
    descriptionEn: 'Human immunoglobulin G1 kappa monoclonal antibody blocking PD-L1 interaction with PD-1 and CD80.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Durvalumab'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000023',
    code: 'acalabrutinib',
    nameEn: 'Acalabrutinib',
    descriptionEn: 'Second-generation selective Bruton tyrosine kinase (BTK) inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Acalabrutinib'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000024',
    code: 'trastuzumab_deruxtecan',
    nameEn: 'Trastuzumab Deruxtecan',
    descriptionEn: 'HER2-directed antibody-drug conjugate linked to a topoisomerase I inhibitor payload.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Trastuzumab Deruxtecan'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000025',
    code: 'goserelin_acetate',
    nameEn: 'Goserelin Acetate',
    descriptionEn: 'Synthetic decapeptide analogue of luteinizing hormone-releasing hormone (LHRH agonist).',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Goserelin Acetate'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000026',
    code: 'fulvestrant',
    nameEn: 'Fulvestrant',
    descriptionEn: 'Selective estrogen receptor degrader (SERD) and competitive ER antagonist.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Fulvestrant'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000027',
    code: 'anastrozole',
    nameEn: 'Anastrozole',
    descriptionEn: 'Potent and selective non-steroidal aromatase inhibitor.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Anastrozole'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000028',
    code: 'bicalutamide',
    nameEn: 'Bicalutamide',
    descriptionEn: 'Non-steroidal competitive androgen receptor antagonist.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Bicalutamide'],
    isActive: true,
  },
  {
    id: '79000000-0000-4000-8000-000000000029',
    code: 'tamoxifen_citrate',
    nameEn: 'Tamoxifen Citrate',
    descriptionEn: 'Selective estrogen receptor modulator (SERM) with tissue-specific anti-estrogenic activity in breast tissue.',
    drugClassId: '77000000-0000-4000-8000-000000000022',
    ingredients: ['Tamoxifen Citrate'],
    isActive: true,
  },
];

interface AstraZenecaSeedSpec {
  seq: number;
  brandNameEn: string;
  genericDrugId: string;
  drugClassId: string;
  specialtyIds: string[];
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  registrationNumber: string;
  storageConditionsEn: string;
  approvedIndicationsEn: string;
  usualAdultDoseEn: string;
  contraindicationsEn: string;
  commonAdverseEffectsEn: string;
  brochureTitle: string;
  brochureSummary: string;
}

function buildAstraZenecaIraqProduct(spec: AstraZenecaSeedSpec): ProductRecord {
  const padded = String(spec.seq).padStart(4, '0');
  const productId = `71000000-0000-4000-8000-00000000${padded}`;
  const marketId = `72000000-0000-4000-8000-00000000${padded}`;
  const mediaId = `81000000-0000-4000-8000-00000000${padded}`;
  const brochureId = `82000000-0000-4000-8000-00000000${padded}`;
  const slug = spec.brandNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  return {
    id: productId,
    companyId: '75000000-0000-4000-8000-000000000012', // AstraZeneca Iraq
    genericDrugId: spec.genericDrugId,
    drugClassId: spec.drugClassId,
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: spec.brandNameEn,
    specialtyIds: spec.specialtyIds,
    iraqMarket: {
      id: marketId,
      productId,
      countryCode: 'IQ',
      strength: spec.strength,
      dosageForm: spec.dosageForm,
      route: spec.route,
      packSize: spec.packSize,
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: spec.registrationNumber,
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2029-12-31',
      storageConditionsEn: spec.storageConditionsEn,
      approvedIndicationsEn: spec.approvedIndicationsEn,
      usualAdultDoseEn: spec.usualAdultDoseEn,
      contraindicationsEn: spec.contraindicationsEn,
      commonAdverseEffectsEn: spec.commonAdverseEffectsEn,
    },
    media: [
      {
        id: mediaId,
        productId,
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: `${productId}/${slug}_pack.png`,
        fileName: `${slug}_pack.png`,
        mimeType: 'image/png',
        fileSizeBytes: 425600,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-25T10:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          spec.brandNameEn,
          `${spec.strength} • ${spec.dosageForm}`,
          'ASTRAZENECA IRAQ',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: brochureId,
        productMarketId: marketId,
        productId,
        locale: 'en',
        title: spec.brochureTitle,
        bucketId: 'catalog-brochures',
        storagePath: `${productId}/${slug}_iraq_monograph_v1.pdf`,
        fileName: `${slug}_iraq_monograph_v1.pdf`,
        mimeType: 'application/pdf',
        fileSizeBytes: 1540000,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-25T10:05:00Z',
        summaryNotes: spec.brochureSummary,
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-25T10:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-26T10:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-26T10:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-25T09:30:00Z',
    updatedAt: '2026-06-26T10:00:00Z',
  };
}

const ASTRAZENECA_IRAQ_PRODUCTS: ProductRecord[] = [
  // CVRM Portfolio
  buildAstraZenecaIraqProduct({
    seq: 101,
    brandNameEn: 'Forxiga 10 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000007', // Dapagliflozin
    drugClassId: '77000000-0000-4000-8000-000000000017', // SGLT2 Inhibitors
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000024', // Nephrology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '10 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets calendar blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0101',
    storageConditionsEn: 'Store below 30°C in original blister package.',
    approvedIndicationsEn:
      'Treatment of insufficiently controlled type 2 diabetes mellitus as adjunct to diet and exercise; symptomatic chronic heart failure across the full spectrum of left ventricular ejection fraction (HFrEF, HFmrEF, HFpEF); and chronic kidney disease to reduce sustained eGFR decline, ESKD, and cardiovascular or renal death.',
    usualAdultDoseEn:
      '10 mg orally once daily at any time of day with or without food for T2DM, heart failure, and chronic kidney disease.',
    contraindicationsEn:
      'History of serious hypersensitivity reaction (such as anaphylaxis or angioedema) to dapagliflozin or any excipient.',
    commonAdverseEffectsEn:
      'Vulvovaginal candidiasis, balanitis, urinary tract infection, polyuria, dizziness, and volume depletion in elderly or loop-diuretic patients.',
    brochureTitle: 'Forxiga 10 mg — AstraZeneca Iraq Cardiorenal & Metabolic Monograph',
    brochureSummary:
      'Iraq MOH approved prescribing monograph covering DAPA-HF, DELIVER, DAPA-CKD, and DECLARE-TIMI 58 clinical dosing protocols.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 102,
    brandNameEn: 'Xigduo XR 10 mg / 1000 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000008', // Dapagliflozin + Metformin HCl
    drugClassId: '77000000-0000-4000-8000-000000000017', // SGLT2 Inhibitors
    specialtyIds: [
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '10 mg / 1000 mg',
    dosageForm: 'Extended-release film-coated tablet',
    route: 'Oral',
    packSize: '28 extended-release tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0102',
    storageConditionsEn: 'Store below 30°C in original moisture-protective blister.',
    approvedIndicationsEn:
      'Adjunct to diet and exercise to improve glycemic control in adults with type 2 diabetes mellitus inadequately controlled on metformin or already treated with dapagliflozin and metformin as separate tablets.',
    usualAdultDoseEn:
      'One 10 mg / 1000 mg tablet once daily with the evening meal; swallow whole without crushing or chewing.',
    contraindicationsEn:
      'Severe renal impairment (eGFR < 30 mL/min/1.73 m²), acute or chronic metabolic acidosis including diabetic ketoacidosis, hepatic impairment, or hypersensitivity.',
    commonAdverseEffectsEn:
      'Diarrhea, nausea, dyspepsia, genital fungal infections, urinary tract infections, and headache.',
    brochureTitle: 'Xigduo XR 10/1000 mg — AstraZeneca Iraq T2DM Prescribing Monograph',
    brochureSummary:
      'Approved Iraq clinical monograph for once-daily extended-release dapagliflozin + metformin HCl therapy and eGFR monitoring thresholds.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 103,
    brandNameEn: 'Crestor 20 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000003', // Rosuvastatin
    drugClassId: '77000000-0000-4000-8000-000000000021', // Statins
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets aluminium blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0103',
    storageConditionsEn: 'Store below 30°C in original blister to protect from moisture.',
    approvedIndicationsEn:
      'Primary hypercholesterolemia (type IIa including heterozygous familial hypercholesterolemia), mixed dyslipidemia (type IIb), homozygous familial hypercholesterolemia, and prevention of major cardiovascular events in patients at high atherosclerotic risk.',
    usualAdultDoseEn:
      'Initial dose 5 mg or 10 mg once daily; titrate after 4 weeks to 20 mg once daily (or 40 mg in severe hypercholesterolemia under specialist supervision).',
    contraindicationsEn:
      'Active liver disease, severe renal impairment (CrCl < 30 mL/min), myopathy, concomitant ciclosporin, pregnancy, and lactation.',
    commonAdverseEffectsEn:
      'Headache, dizziness, constipation, nausea, abdominal pain, myalgia, and asthenia.',
    brochureTitle: 'Crestor 20 mg — AstraZeneca Iraq Dyslipidemia & ASCVD Prevention Monograph',
    brochureSummary:
      'Official AstraZeneca Iraq prescribing monograph detailing JUPITER and ASTEROID lipid-lowering efficacy and statin safety monitoring.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 104,
    brandNameEn: 'Brilinta 90 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000009', // Ticagrelor
    drugClassId: '77000000-0000-4000-8000-000000000023', // Antiplatelets
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
      '73000000-0000-4000-8000-000000000020', // Interventional Radiology
    ],
    strength: '90 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 film-coated tablets calendar blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0104',
    storageConditionsEn: 'Store below 30°C in original package.',
    approvedIndicationsEn:
      'Co-administered with acetylsalicylic acid (ASA) for the prevention of atherothrombotic events in adult patients with Acute Coronary Syndromes (unstable angina, NSTEMI, or STEMI) including patients managed medically and those managed with PCI or CABG.',
    usualAdultDoseEn:
      'Single 180 mg loading dose (two 90 mg tablets) followed by 90 mg twice daily with low-dose ASA (75–100 mg daily) for 12 months.',
    contraindicationsEn:
      'Active pathological bleeding, history of intracranial hemorrhage, severe hepatic impairment, and co-administration with strong CYP3A4 inhibitors.',
    commonAdverseEffectsEn:
      'Dyspnea, epistaxis, gastrointestinal or subcutaneous bleeding, bruising, hyperuricemia, and transient ventricular pauses.',
    brochureTitle: 'Brilinta 90 mg — AstraZeneca Iraq Acute Coronary Syndrome & PCI Dosing Guide',
    brochureSummary:
      'Approved Iraq Cardiology reference covering PLATO trial outcomes, perioperative CABG/PCI switching, and dual antiplatelet maintenance.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 105,
    brandNameEn: 'Betaloc ZOK 100 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000010', // Metoprolol Succinate
    drugClassId: '77000000-0000-4000-8000-000000000001', // Beta Blockers
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '100 mg (equivalent to 95 mg Metoprolol Succinate)',
    dosageForm: 'Prolonged-release scored ZOK tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0105',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Hypertension, angina pectoris, stable symptomatic chronic heart failure with impaired systolic left ventricular function, cardiac arrhythmias including supraventricular tachycardia, maintenance after myocardial infarction, and migraine prophylaxis.',
    usualAdultDoseEn:
      'Hypertension/Angina: 50–200 mg once daily in the morning. Chronic heart failure: titrate gradually from 12.5–25 mg once daily up to target 200 mg once daily.',
    contraindicationsEn:
      'Cardiogenic shock, sick sinus syndrome, second- or third-degree AV block, unstable decompensated heart failure, and symptomatic bradycardia or hypotension.',
    commonAdverseEffectsEn:
      'Fatigue, dizziness, headache, bradycardia, postural disorders, cold hands and feet, and gastrointestinal discomfort.',
    brochureTitle: 'Betaloc ZOK 100 mg — Zero-Order Kinetic Beta-Blockade Clinical Monograph',
    brochureSummary:
      'AstraZeneca Iraq monograph detailing 24-hour zero-order kinetic plasma profile and MERIT-HF titration schedule.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 106,
    brandNameEn: 'Atacand 16 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000011', // Candesartan Cilexetil
    drugClassId: '77000000-0000-4000-8000-000000000008', // ARBs
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000024', // Nephrology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '16 mg',
    dosageForm: 'Scored tablet',
    route: 'Oral',
    packSize: '28 scored tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0106',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Essential hypertension in adults and treatment of adult patients with heart failure and impaired left ventricular systolic function (LVEF ≤ 40%) when ACE inhibitors are not tolerated or as add-on therapy.',
    usualAdultDoseEn:
      'Hypertension: 8 mg to 16 mg once daily (up to 32 mg once daily). Heart Failure: initiate at 4 mg once daily and double at ≥2-week intervals to target 32 mg once daily.',
    contraindicationsEn:
      'Second and third trimesters of pregnancy, severe hepatic impairment and/or cholestasis, and concomitant use with aliskiren in patients with diabetes or renal impairment.',
    commonAdverseEffectsEn:
      'Dizziness, vertigo, headache, hyperkalemia, hypotension, and renal impairment in susceptible patients.',
    brochureTitle: 'Atacand 16 mg — AstraZeneca Iraq Hypertension & CHARM Heart Failure Guide',
    brochureSummary:
      'Official Iraq prescribing reference for Candesartan Cilexetil 16 mg covering blood pressure control and CHARM programme heart failure protocols.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 107,
    brandNameEn: 'Atacand Plus 16 mg / 12.5 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000012', // Candesartan + HCTZ
    drugClassId: '77000000-0000-4000-8000-000000000008', // ARBs
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '16 mg / 12.5 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    packSize: '28 tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0107',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Essential hypertension in adult patients whose blood pressure is not optimally controlled with candesartan cilexetil or hydrochlorothiazide monotherapy.',
    usualAdultDoseEn: 'One 16 mg / 12.5 mg tablet once daily with or without food.',
    contraindicationsEn:
      'Pregnancy, severe renal impairment (CrCl < 30 mL/min), severe hepatic impairment/cholestasis, refractory hypokalemia or hypercalcemia, and gout.',
    commonAdverseEffectsEn:
      'Dizziness, metabolic disturbances (hyperglycemia, hyperuricemia, electrolyte imbalance), headache, and fatigue.',
    brochureTitle: 'Atacand Plus 16/12.5 mg — AstraZeneca Iraq Combination Antihypertensive Monograph',
    brochureSummary:
      'Iraq MOH approved prescribing summary for fixed-dose Candesartan Cilexetil 16 mg + Hydrochlorothiazide 12.5 mg.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 108,
    brandNameEn: 'Plendil 5 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000013', // Felodipine
    drugClassId: '77000000-0000-4000-8000-000000000027', // Calcium Channel Blockers
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '5 mg',
    dosageForm: 'Prolonged-release film-coated tablet',
    route: 'Oral',
    packSize: '30 prolonged-release tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0108',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Essential hypertension and prophylactic treatment of chronic stable angina pectoris.',
    usualAdultDoseEn:
      'Initiate at 5 mg once daily in the morning; maintenance 5 mg to 10 mg once daily. Swallow tablet whole with water.',
    contraindicationsEn:
      'Unstable angina pectoris, acute myocardial infarction, decompensated heart failure, hemodynamically significant cardiac valvular obstruction, and pregnancy.',
    commonAdverseEffectsEn:
      'Peripheral ankle edema, flushing, headache, palpitations, and dizziness.',
    brochureTitle: 'Plendil 5 mg — AstraZeneca Iraq Vascular-Selective CCB Monograph',
    brochureSummary:
      'Approved Iraq prescribing information for Plendil 5 mg extended-release felodipine tablets in hypertension and angina.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 109,
    brandNameEn: 'Onglyza 5 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000014', // Saxagliptin
    drugClassId: '77000000-0000-4000-8000-000000000014', // DPP-4 Inhibitors
    specialtyIds: [
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '5 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets blister pack',
    registrationNumber: 'IQ-AZ-CVRM-0109',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Adult patients with type 2 diabetes mellitus as an adjunct to diet and exercise to improve glycemic control as monotherapy or in combination with metformin, sulfonylureas, SGLT2 inhibitors, or insulin.',
    usualAdultDoseEn:
      '5 mg orally once daily at any time of day with or without meals (reduce to 2.5 mg once daily if eGFR < 45 mL/min/1.73 m² or with strong CYP3A4/5 inhibitors).',
    contraindicationsEn:
      'History of serious hypersensitivity reaction such as anaphylaxis, angioedema, or exfoliative skin conditions to any DPP-4 inhibitor.',
    commonAdverseEffectsEn:
      'Upper respiratory tract infection, urinary tract infection, gastroenteritis, sinusitis, and headache.',
    brochureTitle: 'Onglyza 5 mg — AstraZeneca Iraq Incretin DPP-4 Prescribing Guide',
    brochureSummary:
      'Official Iraq prescribing monograph for Onglyza 5 mg (Saxagliptin) covering glycemic efficacy and renal dose adjustment.',
  }),

  // Respiratory & Immunology Portfolio
  buildAstraZenecaIraqProduct({
    seq: 110,
    brandNameEn: 'Symbicort Turbuhaler 160 / 4.5 mcg',
    genericDrugId: '79000000-0000-4000-8000-000000000015', // Budesonide + Formoterol
    drugClassId: '77000000-0000-4000-8000-000000000030', // Corticosteroids — Inhaled
    specialtyIds: [
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
      '73000000-0000-4000-8000-000000000003', // Allergy and Immunology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '160 mcg / 4.5 mcg per delivered inhalation',
    dosageForm: 'Inhalation powder, Turbuhaler dry powder inhaler',
    route: 'Inhalation',
    packSize: '120-dose Turbuhaler inhaler',
    registrationNumber: 'IQ-AZ-RESP-0110',
    storageConditionsEn: 'Store below 30°C with protective cap tightly replaced after use.',
    approvedIndicationsEn:
      'Regular treatment of bronchial asthma where use of an inhaled corticosteroid and long-acting beta-2 agonist combination is appropriate (both Maintenance and Reliever Therapy [SMART/AIR] and maintenance regimen), and symptomatic treatment of patients with moderate-to-severe COPD with frequent exacerbations.',
    usualAdultDoseEn:
      'Asthma SMART regimen: 1 inhalation twice daily (or 2 inhalations once daily) plus 1 inhalation as needed for symptom relief (max 6 inhalations per single occasion). COPD: 2 inhalations twice daily.',
    contraindicationsEn:
      'Hypersensitivity to budesonide, formoterol, or inhaled lactose (which contains small amounts of milk proteins).',
    commonAdverseEffectsEn:
      'Oropharyngeal candidiasis, hoarseness/dysphonia, throat irritation, mild tremor, and palpitations.',
    brochureTitle: 'Symbicort Turbuhaler 160/4.5 mcg — AstraZeneca Iraq Asthma MART & COPD Monograph',
    brochureSummary:
      'Iraq MOH respiratory monograph covering GINA Track 1 anti-inflammatory reliever (AIR/SMART) dosing and Turbuhaler inhalation technique.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 111,
    brandNameEn: 'Pulmicort Respules 0.5 mg / 2 mL',
    genericDrugId: '79000000-0000-4000-8000-000000000016', // Budesonide
    drugClassId: '77000000-0000-4000-8000-000000000030', // Corticosteroids — Inhaled
    specialtyIds: [
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
      '73000000-0000-4000-8000-000000000036', // Pediatrics
      '73000000-0000-4000-8000-000000000003', // Allergy and Immunology
    ],
    strength: '0.5 mg / 2 mL (0.25 mg/mL)',
    dosageForm: 'Nebuliser suspension in single-dose plastic ampoules',
    route: 'Inhalation (Jet Nebuliser)',
    packSize: '20 single-dose Respules (4 foil envelopes × 5 units of 2 mL)',
    registrationNumber: 'IQ-AZ-RESP-0111',
    storageConditionsEn:
      'Store upright below 30°C protected from light. Once foil envelope is opened, use within 3 months.',
    approvedIndicationsEn:
      'Bronchial asthma in patients where use of a pressurized MDI or dry powder formulation is unsatisfactory or inappropriate; acute laryngotracheobronchitis (croup) in infants and children; and hospitalised acute COPD exacerbations.',
    usualAdultDoseEn:
      'Adults: 1 mg to 2 mg daily divided into 1 or 2 administrations via jet nebuliser. Pediatrics (6 months+): 0.25 mg to 1 mg daily; Croup: 2 mg as single nebulised dose or two 1 mg doses 30 minutes apart.',
    contraindicationsEn: 'Known hypersensitivity to budesonide or any excipient.',
    commonAdverseEffectsEn:
      'Oropharyngeal candidiasis, cough, hoarseness, throat irritation, and perioral skin irritation when using a face mask (wash face after nebulisation).',
    brochureTitle: 'Pulmicort Respules 0.5 mg/2 mL — AstraZeneca Iraq Nebulised ICS Guide',
    brochureSummary:
      'Approved Iraq pediatric and adult nebulisation protocol for Pulmicort Respules in bronchial asthma, acute croup, and COPD exacerbations.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 112,
    brandNameEn: 'Bricanyl Turbuhaler 0.5 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000017', // Terbutaline Sulfate
    drugClassId: '77000000-0000-4000-8000-000000000002', // Bronchodilators
    specialtyIds: [
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '0.5 mg per metered inhalation',
    dosageForm: 'Inhalation powder, Turbuhaler dry powder inhaler',
    route: 'Inhalation',
    packSize: '100-dose Turbuhaler inhaler',
    registrationNumber: 'IQ-AZ-RESP-0112',
    storageConditionsEn: 'Store below 30°C with cap tightly closed.',
    approvedIndicationsEn:
      'Symptomatic relief of acute bronchospasm in bronchial asthma, chronic bronchitis, emphysema, and other lung diseases with reversible airway obstruction.',
    usualAdultDoseEn:
      '1 inhalation (0.5 mg) as required; in severe cases up to 3 inhalations at a single occasion, not exceeding 12 inhalations in 24 hours.',
    contraindicationsEn: 'Hypersensitivity to terbutaline sulfate.',
    commonAdverseEffectsEn:
      'Tremor, headache, tachycardia, palpitations, tonic muscle cramps, and hypokalemia.',
    brochureTitle: 'Bricanyl Turbuhaler 0.5 mg — AstraZeneca Iraq Bronchodilator Prescribing Summary',
    brochureSummary:
      'Official Iraq prescribing monograph for Bricanyl Turbuhaler 0.5 mg dry powder inhaler.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 113,
    brandNameEn: 'Fasenra 30 mg / mL',
    genericDrugId: '79000000-0000-4000-8000-000000000018', // Benralizumab
    drugClassId: '77000000-0000-4000-8000-000000000034', // Immunosuppressants & Targeted Biologics
    specialtyIds: [
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
      '73000000-0000-4000-8000-000000000003', // Allergy and Immunology
    ],
    strength: '30 mg / 1 mL',
    dosageForm: 'Solution for injection in pre-filled accessorized syringe / Fasenra Pen',
    route: 'Subcutaneous',
    packSize: '1 single-use pre-filled syringe (30 mg/mL)',
    registrationNumber: 'IQ-AZ-RESP-0113',
    storageConditionsEn:
      'Store in a refrigerator (2°C to 8°C) in original carton to protect from light. Do not freeze or shake.',
    approvedIndicationsEn:
      'Add-on maintenance treatment in adult patients with severe eosinophilic asthma inadequately controlled despite high-dose inhaled corticosteroids plus long-acting beta-agonists.',
    usualAdultDoseEn:
      '30 mg by subcutaneous injection every 4 weeks for the first 3 doses, and then every 8 weeks thereafter.',
    contraindicationsEn:
      'Known hypersensitivity to benralizumab or any of the excipients.',
    commonAdverseEffectsEn:
      'Headache, pharyngitis, pyrexia, and injection-site reactions.',
    brochureTitle: 'Fasenra 30 mg — AstraZeneca Iraq Severe Eosinophilic Asthma Biologic Monograph',
    brochureSummary:
      'Iraq MOH approved biologic monograph covering SIROCCO, CALIMA, and ZONDA eosinophil depletion and OCS-sparing protocols.',
  }),

  // Gastroenterology Portfolio
  buildAstraZenecaIraqProduct({
    seq: 114,
    brandNameEn: 'Nexium 40 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000005', // Esomeprazole
    drugClassId: '77000000-0000-4000-8000-000000000041', // Proton Pump Inhibitors
    specialtyIds: [
      '73000000-0000-4000-8000-000000000013', // Gastroenterology and Hepatology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '40 mg',
    dosageForm: 'Gastro-resistant MUPS tablet',
    route: 'Oral',
    packSize: '28 gastro-resistant tablets aluminium blister pack',
    registrationNumber: 'IQ-AZ-GI-0114',
    storageConditionsEn: 'Store below 30°C in original blister to protect from moisture.',
    approvedIndicationsEn:
      'Erosive reflux esophagitis treatment and long-term relapse prevention, symptomatic gastroesophageal reflux disease (GERD), Helicobacter pylori eradication in combination with appropriate antibiotics, healing and prevention of NSAID-associated gastric and duodenal ulcers, and Zollinger-Ellison syndrome.',
    usualAdultDoseEn:
      'Erosive esophagitis: 40 mg once daily for 4–8 weeks. H. pylori eradication: 20 mg twice daily for 7–14 days with antibiotic regimen. Zollinger-Ellison: initiate at 40 mg twice daily.',
    contraindicationsEn:
      'Known hypersensitivity to esomeprazole, substituted benzimidazoles, or concomitant administration with nelfinavir.',
    commonAdverseEffectsEn:
      'Headache, abdominal pain, constipation, diarrhea, flatulence, nausea/vomiting, and benign fundic gland polyps.',
    brochureTitle: 'Nexium 40 mg MUPS — AstraZeneca Iraq Gastroenterology Prescribing Monograph',
    brochureSummary:
      'Approved Iraq prescribing monograph for Nexium 40 mg MUPS (Multiple-Unit Pellet System) tablets, including nasogastric dispersion instructions.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 115,
    brandNameEn: 'Losec 20 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000019', // Omeprazole
    drugClassId: '77000000-0000-4000-8000-000000000041', // Proton Pump Inhibitors
    specialtyIds: [
      '73000000-0000-4000-8000-000000000013', // Gastroenterology and Hepatology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    strength: '20 mg',
    dosageForm: 'Gastro-resistant MUPS tablet / capsule',
    route: 'Oral',
    packSize: '28 gastro-resistant tablets blister pack',
    registrationNumber: 'IQ-AZ-GI-0115',
    storageConditionsEn: 'Store below 25°C in original moisture-resistant packaging.',
    approvedIndicationsEn:
      'Treatment and prevention of duodenal ulcers and benign gastric ulcers, NSAID-associated gastroduodenal ulcers, reflux esophagitis, symptomatic gastroesophageal reflux disease, and Helicobacter pylori eradication.',
    usualAdultDoseEn:
      '20 mg once daily in the morning for 2–8 weeks depending on indication; 40 mg once daily in refractory cases.',
    contraindicationsEn:
      'Hypersensitivity to omeprazole, substituted benzimidazoles, or co-administration with nelfinavir.',
    commonAdverseEffectsEn:
      'Headache, abdominal pain, constipation, diarrhea, flatulence, and nausea.',
    brochureTitle: 'Losec 20 mg — AstraZeneca Iraq Acid-Related Disorders Monograph',
    brochureSummary:
      'Official Iraq prescribing monograph for Losec 20 mg in peptic ulcer disease and GERD management.',
  }),

  // Oncology Portfolio
  buildAstraZenecaIraqProduct({
    seq: 116,
    brandNameEn: 'Tagrisso 80 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000020', // Osimertinib
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
    ],
    strength: '80 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets blister pack',
    registrationNumber: 'IQ-AZ-ONC-0116',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Adjuvant treatment after complete tumor resection in adults with stage IB–IIIA NSCLC whose tumors have EGFR exon 19 deletions or exon 21 (L858R) substitution mutations; first-line treatment of locally advanced or metastatic EGFR-mutated NSCLC (monotherapy or with pemetrexed and platinum chemotherapy); and locally advanced or metastatic EGFR T790M mutation-positive NSCLC.',
    usualAdultDoseEn:
      '80 mg orally once daily with or without food until disease progression or unacceptable toxicity (or up to 3 years in adjuvant setting). Dose reduction to 40 mg once daily if required for adverse events.',
    contraindicationsEn:
      'Hypersensitivity to osimertinib or any excipient; concomitant use of St. John’s Wort (strong CYP3A4 inducer).',
    commonAdverseEffectsEn:
      'Diarrhea, rash, paronychia, dry skin, stomatitis, leukopenia/thrombocytopenia, and rare interstitial lung disease (ILD) or QTc prolongation.',
    brochureTitle: 'Tagrisso 80 mg — AstraZeneca Iraq EGFRm NSCLC Precision Oncology Monograph',
    brochureSummary:
      'Approved Iraq oncology monograph covering ADAURA, FLAURA, and FLAURA2 trials, EGFR molecular testing requirements, and ILD/QTc monitoring.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 117,
    brandNameEn: 'Lynparza 150 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000021', // Olaparib
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000028', // Obstetrics and Gynecology
      '73000000-0000-4000-8000-000000000045', // Urology
    ],
    strength: '150 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '56 film-coated tablets aluminium blister pack',
    registrationNumber: 'IQ-AZ-ONC-0117',
    storageConditionsEn: 'Store below 30°C in original package to protect from moisture.',
    approvedIndicationsEn:
      'Maintenance treatment of BRCA1/2-mutated or HRD-positive advanced epithelial ovarian, fallopian tube, or primary peritoneal cancer; adjuvant and metastatic germline BRCA1/2-mutated HER2-negative breast cancer; germline BRCA-mutated metastatic pancreatic adenocarcinoma; and BRCA-mutated metastatic castration-resistant prostate cancer (mCRPC).',
    usualAdultDoseEn:
      '300 mg (two 150 mg tablets) taken orally twice daily (total daily dose 600 mg) with or without food. Note: 150 mg/100 mg tablets are not interchangeable on a mg-to-mg basis with capsules.',
    contraindicationsEn:
      'Hypersensitivity to olaparib or any excipient; breastfeeding during treatment and for 1 month after the last dose.',
    commonAdverseEffectsEn:
      'Anemia, nausea, fatigue/asthenia, vomiting, neutropenia, leukopenia, diarrhea, decreased appetite, and dysgeusia.',
    brochureTitle: 'Lynparza 150 mg — AstraZeneca Iraq PARP Inhibitor Oncology Prescribing Guide',
    brochureSummary:
      'Official Iraq oncology monograph covering SOLO-1, PAOLA-1, OlympiA, POLO, and PROfound clinical regimens and hematologic monitoring.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 118,
    brandNameEn: 'Imfinzi 500 mg / 10 mL',
    genericDrugId: '79000000-0000-4000-8000-000000000022', // Durvalumab
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
      '73000000-0000-4000-8000-000000000013', // Gastroenterology and Hepatology
    ],
    strength: '500 mg / 10 mL (50 mg/mL)',
    dosageForm: 'Concentrate for solution for intravenous infusion',
    route: 'Intravenous Infusion',
    packSize: '1 single-use vial of 10 mL (500 mg)',
    registrationNumber: 'IQ-AZ-ONC-0118',
    storageConditionsEn:
      'Store in a refrigerator (2°C to 8°C) in original carton to protect from light. Do not freeze or shake.',
    approvedIndicationsEn:
      'Unresectable Stage III NSCLC without progression after platinum-based chemoradiation therapy (PACIFIC); first-line treatment of Extensive-Stage Small Cell Lung Cancer (ES-SCLC) with etoposide and platinum (CASPIAN); locally advanced or metastatic biliary tract cancer with gemcitabine and cisplatin (TOPAZ-1); and unresectable hepatocellular carcinoma (HIMALAYA).',
    usualAdultDoseEn:
      'Weight-based or fixed dosing per indication: 10 mg/kg IV every 2 weeks or 1500 mg IV every 3 or 4 weeks infused over 60 minutes.',
    contraindicationsEn:
      'Hypersensitivity to durvalumab or any of the excipients.',
    commonAdverseEffectsEn:
      'Cough, pneumonitis, hypothyroidism/hyperthyroidism, rash, pruritus, diarrhea, abdominal pain, and immune-mediated hepatitis or colitis.',
    brochureTitle: 'Imfinzi 500 mg/10 mL — AstraZeneca Iraq Immuno-Oncology Prescribing Monograph',
    brochureSummary:
      'Iraq MOH approved immuno-oncology monograph covering PACIFIC, CASPIAN, TOPAZ-1, and HIMALAYA dosing and immune-mediated adverse event algorithms.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 119,
    brandNameEn: 'Calquence 100 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000023', // Acalabrutinib
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000017', // Hematology
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
    ],
    strength: '100 mg',
    dosageForm: 'Hard capsule / Film-coated tablet',
    route: 'Oral',
    packSize: '60 capsules aluminum blister pack',
    registrationNumber: 'IQ-AZ-ONC-0119',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Treatment of adult patients with Chronic Lymphocytic Leukemia (CLL) / Small Lymphocytic Lymphoma (SLL) as monotherapy or in combination with obinutuzumab, and adult patients with Mantle Cell Lymphoma (MCL) who have received at least one prior therapy.',
    usualAdultDoseEn:
      '100 mg orally approximately every 12 hours (total daily dose 200 mg) until disease progression or unacceptable toxicity.',
    contraindicationsEn:
      'Hypersensitivity to acalabrutinib or any excipient.',
    commonAdverseEffectsEn:
      'Headache, diarrhea, bruising/contusion, musculoskeletal pain, upper respiratory tract infection, neutropenia, and anemia.',
    brochureTitle: 'Calquence 100 mg — AstraZeneca Iraq Hematology BTK Inhibitor Monograph',
    brochureSummary:
      'Approved Iraq hematology-oncology monograph covering ELEVATE-TN and ASCEND CLL trials, CYP3A interactions, and cardiac/bleeding precautions.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 120,
    brandNameEn: 'Enhertu 100 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000024', // Trastuzumab Deruxtecan
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
    ],
    strength: '100 mg per vial (20 mg/mL after reconstitution)',
    dosageForm: 'Lyophilized powder for concentrate for solution for IV infusion',
    route: 'Intravenous Infusion',
    packSize: '1 single-dose amber glass vial (100 mg)',
    registrationNumber: 'IQ-AZ-ONC-0120',
    storageConditionsEn:
      'Store vials in a refrigerator (2°C to 8°C) in original carton. Do not freeze. Reconstitute with sterile water and dilute ONLY in 5% Dextrose Injection (never use 0.9% Sodium Chloride).',
    approvedIndicationsEn:
      'Unresectable or metastatic HER2-positive breast cancer (DESTINY-Breast03); unresectable or metastatic HER2-low (IHC 1+ or IHC 2+/ISH-) breast cancer (DESTINY-Breast04); unresectable or metastatic NSCLC with activating HER2 (ERBB2) mutations; and locally advanced or metastatic HER2-positive gastric or gastroesophageal junction adenocarcinoma.',
    usualAdultDoseEn:
      'Breast Cancer & HER2m NSCLC: 5.4 mg/kg IV once every 3 weeks (21-day cycle). Gastric Cancer: 6.4 mg/kg IV once every 3 weeks.',
    contraindicationsEn:
      'Severe hypersensitivity to trastuzumab deruxtecan or any excipient.',
    commonAdverseEffectsEn:
      'Nausea, fatigue, alopecia, vomiting, neutropenia, anemia, constipation, decreased appetite, diarrhea, and interstitial lung disease (ILD)/pneumonitis (requires prompt monitoring and corticosteroid management).',
    brochureTitle: 'Enhertu 100 mg — AstraZeneca Iraq HER2-Directed ADC Oncology Monograph',
    brochureSummary:
      'Official Iraq oncology monograph detailing DESTINY-Breast03/04 protocols, 5% Dextrose reconstitution rules, and ILD vigilance guidelines.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 121,
    brandNameEn: 'Zoladex 3.6 mg SafeSystem',
    genericDrugId: '79000000-0000-4000-8000-000000000025', // Goserelin Acetate
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000045', // Urology
      '73000000-0000-4000-8000-000000000028', // Obstetrics and Gynecology
    ],
    strength: '3.6 mg',
    dosageForm: 'Biodegradable subcutaneous depot implant in pre-filled SafeSystem syringe',
    route: 'Subcutaneous (Anterior Abdominal Wall)',
    packSize: '1 sterile pre-filled SafeSystem syringe applicator in sealed pouch',
    registrationNumber: 'IQ-AZ-ONC-0121',
    storageConditionsEn: 'Store below 25°C in sealed foil pouch.',
    approvedIndicationsEn:
      'Hormone-manipulable prostate cancer; hormone-receptor-positive breast cancer in pre- and perimenopausal women; endometriosis; uterine fibroids; and endometrial thinning prior to ablation.',
    usualAdultDoseEn:
      'One 3.6 mg subcutaneous depot injected into the anterior abdominal wall every 28 days (also available as Zoladex LA 10.8 mg every 12 weeks for prostate cancer).',
    contraindicationsEn:
      'Known hypersensitivity to goserelin or other LHRH analogues; pregnancy and lactation.',
    commonAdverseEffectsEn:
      'Hot flushes, hyperhidrosis, decreased libido, bone mineral density reduction, arthralgia, and transient initial tumor flare in prostate/breast cancer.',
    brochureTitle: 'Zoladex 3.6 mg — AstraZeneca Iraq LHRH Agonist Oncology & Gynecology Monograph',
    brochureSummary:
      'Iraq MOH approved monograph covering SafeSystem subcutaneous administration technique and endocrine therapy protocols.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 122,
    brandNameEn: 'Faslodex 250 mg / 5 mL',
    genericDrugId: '79000000-0000-4000-8000-000000000026', // Fulvestrant
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
    ],
    strength: '250 mg / 5 mL per pre-filled syringe (500 mg dose = 2 syringes)',
    dosageForm: 'Clear, viscous solution for intramuscular injection',
    route: 'Intramuscular (Slow Gluteus Maximus Injection)',
    packSize: '2 pre-filled syringes × 5 mL (250 mg each) with safety needles',
    registrationNumber: 'IQ-AZ-ONC-0122',
    storageConditionsEn:
      'Store and transport refrigerated (2°C to 8°C) in original carton to protect from light.',
    approvedIndicationsEn:
      'Estrogen receptor-positive, locally advanced or metastatic breast cancer in postmenopausal women not previously treated with endocrine therapy, or with disease relapse on or after adjuvant anti-estrogen therapy, or in combination with CDK4/6 inhibitors (palbociclib, abemaciclib, ribociclib).',
    usualAdultDoseEn:
      '500 mg administered intramuscularly into the buttocks as two slow 5 mL injections (1–2 minutes per injection, one in each buttock) on Days 1, 15, 29, and once monthly thereafter.',
    contraindicationsEn:
      'Hypersensitivity to fulvestrant or any excipient, pregnancy and lactation, and severe hepatic impairment.',
    commonAdverseEffectsEn:
      'Injection site reactions, asthenia, nausea, elevated hepatic enzymes (ALT, AST, ALP), arthralgia, and hot flushes.',
    brochureTitle: 'Faslodex 500 mg — AstraZeneca Iraq SERD Breast Cancer Prescribing Monograph',
    brochureSummary:
      'Approved Iraq oncology monograph covering FALCON and PALOMA-3/MONARCH-2 regimens and dorsogluteal injection technique.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 123,
    brandNameEn: 'Arimidex 1 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000027', // Anastrozole
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
    ],
    strength: '1 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets calendar blister pack',
    registrationNumber: 'IQ-AZ-ONC-0123',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Adjuvant treatment of postmenopausal women with hormone receptor-positive early invasive breast cancer, and treatment of hormone receptor-positive advanced breast cancer in postmenopausal women.',
    usualAdultDoseEn: 'One 1 mg tablet taken orally once daily.',
    contraindicationsEn:
      'Pregnancy, lactation, and known hypersensitivity to anastrozole or any excipient.',
    commonAdverseEffectsEn:
      'Hot flushes, arthralgia/joint stiffness, osteoporosis/bone loss, asthenia, headache, nausea, and rash.',
    brochureTitle: 'Arimidex 1 mg — AstraZeneca Iraq Aromatase Inhibitor Oncology Monograph',
    brochureSummary:
      'Official Iraq prescribing monograph for Arimidex 1 mg covering ATAC trial long-term adjuvant breast cancer outcomes and bone density guidance.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 124,
    brandNameEn: 'Casodex 50 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000028', // Bicalutamide
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000045', // Urology
    ],
    strength: '50 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '28 film-coated tablets blister pack',
    registrationNumber: 'IQ-AZ-ONC-0124',
    storageConditionsEn: 'Store below 30°C.',
    approvedIndicationsEn:
      'Treatment of advanced prostate cancer in combination with luteinizing hormone-releasing hormone (LHRH) analogue therapy (such as Zoladex) or surgical castration.',
    usualAdultDoseEn:
      'One 50 mg tablet orally once daily with or without food, initiated at the same time as LHRH analogue therapy.',
    contraindicationsEn:
      'Females and children; hypersensitivity to bicalutamide; co-administration with terfenadine, astemizole, or cisapride.',
    commonAdverseEffectsEn:
      'Gynecomastia, breast tenderness, hot flushes, anemia, dizziness, abdominal pain, constipation, and hepatic transaminase elevations.',
    brochureTitle: 'Casodex 50 mg — AstraZeneca Iraq Uro-Oncology Antiandrogen Monograph',
    brochureSummary:
      'Approved Iraq prescribing monograph for Casodex 50 mg combined androgen blockade in advanced prostate cancer.',
  }),
  buildAstraZenecaIraqProduct({
    seq: 125,
    brandNameEn: 'Nolvadex 20 mg',
    genericDrugId: '79000000-0000-4000-8000-000000000029', // Tamoxifen Citrate
    drugClassId: '77000000-0000-4000-8000-000000000022', // Antineoplastics & Targeted Oncology
    specialtyIds: [
      '73000000-0000-4000-8000-000000000022', // Medical Oncology
      '73000000-0000-4000-8000-000000000028', // Obstetrics and Gynecology
    ],
    strength: '20 mg',
    dosageForm: 'Film-coated tablet',
    route: 'Oral',
    packSize: '30 film-coated tablets blister pack',
    registrationNumber: 'IQ-AZ-ONC-0125',
    storageConditionsEn: 'Store below 30°C in original package to protect from light.',
    approvedIndicationsEn:
      'Adjuvant and palliative endocrine treatment of estrogen-receptor-positive early and advanced breast cancer in women and men.',
    usualAdultDoseEn: '20 mg orally once daily (up to 40 mg daily in advanced disease if needed).',
    contraindicationsEn:
      'Pregnancy, history of deep vein thrombosis or pulmonary embolism when used for risk reduction, and known hypersensitivity to tamoxifen.',
    commonAdverseEffectsEn:
      'Hot flushes, vaginal discharge or irregular bleeding, fluid retention, nausea, and rare thromboembolic or endometrial proliferative events.',
    brochureTitle: 'Nolvadex 20 mg — AstraZeneca Iraq SERM Breast Cancer Prescribing Guide',
    brochureSummary:
      'Official Iraq oncology prescribing monograph for Nolvadex 20 mg (Tamoxifen Citrate).',
  }),
];

export const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: '71000000-0000-4000-8000-000000000001',
    companyId: '75000000-0000-4000-8000-000000000001', // Tigris Pharma
    genericDrugId: '79000000-0000-4000-8000-000000000001',
    drugClassId: '77000000-0000-4000-8000-000000000001',
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: 'Cardiostead 5 mg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000001',
      productId: '71000000-0000-4000-8000-000000000001',
      countryCode: 'IQ',
      strength: '5 mg',
      dosageForm: 'Tablet',
      route: 'Oral',
      packSize: '30 tablets blister pack',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-CARDIO-001',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2028-12-31',
      storageConditionsEn: 'Store below 25°C in a dry place.',
      approvedIndicationsEn:
        'Official demo catalog information for physician review of approved cardiovascular indications (hypertension, chronic stable angina pectoris, and stable chronic heart failure).',
      usualAdultDoseEn:
        'Use according to the approved product information and physician judgment. Typical maintenance: 5 mg to 10 mg once daily.',
      contraindicationsEn:
        'Refer to approved labeling for contraindications: acute heart failure, cardiogenic shock, second- or third-degree AV block, severe bronchial asthma.',
      commonAdverseEffectsEn:
        'Refer to approved labeling for warnings and adverse effects: bradycardia, dizziness, fatigue, headache, cold extremities.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000001',
        productId: '71000000-0000-4000-8000-000000000001',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000001/cardiostead_5mg_blister.png',
        fileName: 'cardiostead_5mg_blister.png',
        mimeType: 'image/png',
        fileSizeBytes: 412800,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-25T09:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Cardiostead 5 mg',
          'Film-Coated Tablet • Blister Presentation',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
      {
        id: '81000000-0000-4000-8000-000000000002',
        productId: '71000000-0000-4000-8000-000000000001',
        mediaType: MediaType.PackageImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000001/cardiostead_5mg_outer_pack.png',
        fileName: 'cardiostead_5mg_outer_pack.png',
        mimeType: 'image/png',
        fileSizeBytes: 538400,
        sortOrder: 1,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-25T09:05:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Cardiostead 5 mg Outer Pack',
          '30 Tablets • IQ-DEMO-CARDIO-001',
          'PACKAGE IMAGE',
          '#38C976'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000001',
        productMarketId: '72000000-0000-4000-8000-000000000001',
        productId: '71000000-0000-4000-8000-000000000001',
        locale: 'en',
        title: 'Cardiostead 5 mg — Iraq Official Prescribing Information & Clinical Monograph',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000001/cardiostead_5mg_iraq_monograph_v1.pdf',
        fileName: 'cardiostead_5mg_iraq_monograph_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1482900,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-25T09:10:00Z',
        summaryNotes:
          'Approved Iraq clinical monograph covering Bisoprolol 5 mg pharmacokinetics, dosage titration in chronic heart failure, and hepatic/renal adjustment tables.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-25T09:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-26T09:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-26T09:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-24T09:00:00Z',
    updatedAt: '2026-06-26T09:00:00Z',
  },
  {
    id: '71000000-0000-4000-8000-000000000002',
    companyId: '75000000-0000-4000-8000-000000000001', // Tigris Pharma
    genericDrugId: '79000000-0000-4000-8000-000000000002',
    drugClassId: '77000000-0000-4000-8000-000000000002',
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Draft,
    brandNameEn: 'Airvento 100 mcg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000002',
      productId: '71000000-0000-4000-8000-000000000002',
      countryCode: 'IQ',
      strength: '100 mcg per actuation',
      dosageForm: 'Metered-dose inhaler',
      route: 'Inhalation',
      packSize: '200-dose inhaler',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-RESP-001',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2028-06-30',
      storageConditionsEn: 'Store below 30°C. Protect from direct sunlight and frost.',
      approvedIndicationsEn:
        'Official demo catalog information for physician review of approved respiratory indications (symptomatic relief and prevention of bronchospasm in bronchial asthma and reversible airways obstruction).',
      usualAdultDoseEn:
        'Use according to approved product information and physician judgment. Acute bronchospasm: 100 mcg or 200 mcg as a single inhalation.',
      contraindicationsEn:
        'Refer to approved labeling for contraindications: hypersensitivity to salbutamol or propellant excipients.',
      commonAdverseEffectsEn:
        'Refer to approved labeling for warnings and adverse effects: fine skeletal muscle tremor, tachycardia, headache.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000003',
        productId: '71000000-0000-4000-8000-000000000002',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000002/airvento_100mcg_inhaler.webp',
        fileName: 'airvento_100mcg_inhaler.webp',
        mimeType: 'image/webp',
        fileSizeBytes: 318200,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-28T11:20:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Airvento 100 mcg',
          'Metered-Dose Inhaler • 200 Actuations',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000002',
        productMarketId: '72000000-0000-4000-8000-000000000002',
        productId: '71000000-0000-4000-8000-000000000002',
        locale: 'en',
        title: 'Airvento 100 mcg — Iraq Respiratory Prescribing Brochure (Draft v1)',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000002/airvento_100mcg_brochure_v1.pdf',
        fileName: 'airvento_100mcg_brochure_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1120400,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-28T11:25:00Z',
        summaryNotes:
          'Draft respiratory prescribing brochure for Airvento 100 mcg per actuation metered-dose inhaler, including inhalation technique instructions for physicians.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: null,
    submittedAt: null,
    reviewedBy: null,
    reviewedAt: null,
    reviewReason: null,
    publishedBy: null,
    publishedAt: null,
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-28T10:00:00Z',
    updatedAt: '2026-06-29T09:00:00Z',
  },
  {
    id: '71000000-0000-4000-8000-000000000003',
    companyId: '75000000-0000-4000-8000-000000000002', // Pioneer Pharmaceutical Industries
    genericDrugId: '79000000-0000-4000-8000-000000000003', // Rosuvastatin
    drugClassId: '77000000-0000-4000-8000-000000000021', // Statins
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: 'Rovascor 20 mg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000003',
      productId: '71000000-0000-4000-8000-000000000003',
      countryCode: 'IQ',
      strength: '20 mg',
      dosageForm: 'Film-coated tablet',
      route: 'Oral',
      packSize: '28 tablets blister pack',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-STATIN-003',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2029-05-31',
      storageConditionsEn: 'Store below 25°C in original moisture-resistant blister.',
      approvedIndicationsEn:
        'Primary hypercholesterolemia, mixed dyslipidemia, and reduction of major cardiovascular events in high-risk patients.',
      usualAdultDoseEn: '5 mg to 20 mg orally once daily, at any time of day.',
      contraindicationsEn:
        'Active liver disease, unexplained persistent elevations of serum transaminases, pregnancy, and lactation.',
      commonAdverseEffectsEn: 'Myalgia, headache, abdominal pain, asthenia, and nausea.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000004',
        productId: '71000000-0000-4000-8000-000000000003',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000003/rovascor_20mg_blister.png',
        fileName: 'rovascor_20mg_blister.png',
        mimeType: 'image/png',
        fileSizeBytes: 394100,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-20T09:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Rovascor 20 mg',
          'Rosuvastatin • Film-Coated Tablet',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000003',
        productMarketId: '72000000-0000-4000-8000-000000000003',
        productId: '71000000-0000-4000-8000-000000000003',
        locale: 'en',
        title: 'Rovascor 20 mg — Iraq Prescribing Summary',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000003/rovascor_20mg_monograph_v1.pdf',
        fileName: 'rovascor_20mg_monograph_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1210400,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-20T09:10:00Z',
        summaryNotes:
          'Clinical prescribing monograph for Rovascor 20 mg (Rosuvastatin Calcium) registered in Iraq.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-20T09:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-21T09:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-21T09:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-19T09:00:00Z',
    updatedAt: '2026-06-21T09:00:00Z',
  },
  {
    id: '71000000-0000-4000-8000-000000000004',
    companyId: '75000000-0000-4000-8000-000000000003', // Awamedica
    genericDrugId: '79000000-0000-4000-8000-000000000005', // Esomeprazole
    drugClassId: '77000000-0000-4000-8000-000000000041', // Proton Pump Inhibitors
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: 'Esomed 40 mg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000013', // Gastroenterology and Hepatology
      '73000000-0000-4000-8000-000000000019', // Internal Medicine
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000004',
      productId: '71000000-0000-4000-8000-000000000004',
      countryCode: 'IQ',
      strength: '40 mg',
      dosageForm: 'Gastro-resistant tablet',
      route: 'Oral',
      packSize: '14 tablets blister pack',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-GI-004',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2029-09-30',
      storageConditionsEn: 'Store below 25°C. Keep in original package to protect from moisture.',
      approvedIndicationsEn:
        'Gastroesophageal reflux disease (GERD), erosive esophagitis, Helicobacter pylori eradication regimens, and peptic ulcer prophylaxis.',
      usualAdultDoseEn: '20 mg to 40 mg once daily before meals.',
      contraindicationsEn:
        'Known hypersensitivity to esomeprazole, substituted benzimidazoles, or concomitant nelfinavir therapy.',
      commonAdverseEffectsEn: 'Headache, abdominal pain, diarrhea, flatulence, and nausea.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000005',
        productId: '71000000-0000-4000-8000-000000000004',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000004/esomed_40mg_pack.png',
        fileName: 'esomed_40mg_pack.png',
        mimeType: 'image/png',
        fileSizeBytes: 382000,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-22T09:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Esomed 40 mg',
          'Esomeprazole • Gastro-Resistant Tablet',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000004',
        productMarketId: '72000000-0000-4000-8000-000000000004',
        productId: '71000000-0000-4000-8000-000000000004',
        locale: 'en',
        title: 'Esomed 40 mg — Iraq Gastroenterology Monograph',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000004/esomed_40mg_monograph_v1.pdf',
        fileName: 'esomed_40mg_monograph_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1094000,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-22T09:10:00Z',
        summaryNotes:
          'Clinical monograph for Esomed 40 mg gastro-resistant tablets marketed in Iraq.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-22T09:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-23T09:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-23T09:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-22T08:00:00Z',
    updatedAt: '2026-06-23T09:00:00Z',
  },
  {
    id: '71000000-0000-4000-8000-000000000005',
    companyId: '75000000-0000-4000-8000-000000000004', // SDI — Samarra Drug Industries
    genericDrugId: '79000000-0000-4000-8000-000000000006', // Amoxicillin + Clavulanic Acid
    drugClassId: '77000000-0000-4000-8000-000000000040', // Penicillins & Beta-Lactams
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: 'Samaclav 1000 mg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000018', // Infectious Diseases
      '73000000-0000-4000-8000-000000000032', // Otolaryngology (ENT)
      '73000000-0000-4000-8000-000000000002', // Pulmonology / Respiratory Medicine
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000005',
      productId: '71000000-0000-4000-8000-000000000005',
      countryCode: 'IQ',
      strength: '875 mg / 125 mg',
      dosageForm: 'Film-coated tablet',
      route: 'Oral',
      packSize: '14 tablets blister pack',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-ABX-005',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2029-11-30',
      storageConditionsEn: 'Store below 25°C in a dry place protected from moisture.',
      approvedIndicationsEn:
        'Acute bacterial sinusitis, acute otitis media, community-acquired pneumonia, acute exacerbations of chronic bronchitis, and urinary tract infections.',
      usualAdultDoseEn: 'One 875 mg / 125 mg tablet orally every 12 hours at the start of a meal.',
      contraindicationsEn:
        'History of severe immediate hypersensitivity reaction to penicillins or other beta-lactam agents; history of cholestatic jaundice with amoxicillin-clavulanate.',
      commonAdverseEffectsEn: 'Mucocutaneous candidiasis, diarrhea, nausea, and vomiting.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000006',
        productId: '71000000-0000-4000-8000-000000000005',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000005/samaclav_1000mg_pack.png',
        fileName: 'samaclav_1000mg_pack.png',
        mimeType: 'image/png',
        fileSizeBytes: 401200,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-23T09:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Samaclav 1000 mg',
          'Amoxicillin 875 mg + Clavulanic Acid 125 mg',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000005',
        productMarketId: '72000000-0000-4000-8000-000000000005',
        productId: '71000000-0000-4000-8000-000000000005',
        locale: 'en',
        title: 'Samaclav 1000 mg — Antimicrobial Prescribing Monograph',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000005/samaclav_1000mg_monograph_v1.pdf',
        fileName: 'samaclav_1000mg_monograph_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1185000,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-23T09:10:00Z',
        summaryNotes:
          'Antimicrobial susceptibility and renal dosing guidance for Samaclav 1000 mg in Iraq.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-23T09:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-24T09:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-24T09:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-23T08:00:00Z',
    updatedAt: '2026-06-24T09:00:00Z',
  },
  {
    id: '71000000-0000-4000-8000-000000000006',
    companyId: '75000000-0000-4000-8000-000000000007', // Hikma Pharmaceuticals Iraq
    genericDrugId: '79000000-0000-4000-8000-000000000004', // Empagliflozin
    drugClassId: '77000000-0000-4000-8000-000000000017', // SGLT2 Inhibitors
    category: ProductCategory.PrescriptionDrug,
    status: ProductLifecycleStatus.Published,
    brandNameEn: 'Glifozin-IQ 10 mg',
    specialtyIds: [
      '73000000-0000-4000-8000-000000000011', // Endocrinology
      '73000000-0000-4000-8000-000000000001', // Cardiology
      '73000000-0000-4000-8000-000000000024', // Nephrology
    ],
    iraqMarket: {
      id: '72000000-0000-4000-8000-000000000006',
      productId: '71000000-0000-4000-8000-000000000006',
      countryCode: 'IQ',
      strength: '10 mg',
      dosageForm: 'Film-coated tablet',
      route: 'Oral',
      packSize: '30 tablets blister pack',
      marketStatus: MarketStatus.MarketedInIraq,
      registrationStatus: RegistrationStatus.Registered,
      registrationNumber: 'IQ-DEMO-ENDO-006',
      registrationAuthority: 'Iraq Ministry of Health',
      registrationExpiresOn: '2029-12-31',
      storageConditionsEn: 'Store below 30°C in original blister.',
      approvedIndicationsEn:
        'Type 2 diabetes mellitus, symptomatic chronic heart failure across ejection fractions, and chronic kidney disease progression reduction.',
      usualAdultDoseEn: '10 mg orally once daily in the morning with or without food.',
      contraindicationsEn:
        'Hypersensitivity to empagliflozin or any excipient; severe renal impairment on dialysis.',
      commonAdverseEffectsEn:
        'Genital mycotic infections, urinary tract infections, volume depletion, and increased urination.',
    },
    media: [
      {
        id: '81000000-0000-4000-8000-000000000007',
        productId: '71000000-0000-4000-8000-000000000006',
        mediaType: MediaType.ProductImage,
        bucketId: 'catalog-product-media',
        storagePath: '71000000-0000-4000-8000-000000000006/glifozin_iq_10mg.png',
        fileName: 'glifozin_iq_10mg.png',
        mimeType: 'image/png',
        fileSizeBytes: 398000,
        sortOrder: 0,
        isPrimary: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-24T09:00:00Z',
        previewDataUrl: createClinicalSvgDataUrl(
          'Glifozin-IQ 10 mg',
          'Empagliflozin • SGLT2 Inhibitor',
          'PRODUCT IMAGE',
          '#5DB4F2'
        ),
      },
    ],
    brochures: [
      {
        id: '82000000-0000-4000-8000-000000000006',
        productMarketId: '72000000-0000-4000-8000-000000000006',
        productId: '71000000-0000-4000-8000-000000000006',
        locale: 'en',
        title: 'Glifozin-IQ 10 mg — Cardiometabolic & Renal Prescribing Guide',
        bucketId: 'catalog-brochures',
        storagePath: '71000000-0000-4000-8000-000000000006/glifozin_iq_10mg_v1.pdf',
        fileName: 'glifozin_iq_10mg_v1.pdf',
        mimeType: 'application/pdf',
        fileSizeBytes: 1310000,
        version: 1,
        isCurrent: true,
        uploadedBy: DEMO_USERS.company_admin.profileId,
        createdAt: '2026-06-24T09:10:00Z',
        summaryNotes:
          'Approved cardiometabolic and renal dosing monograph for Empagliflozin 10 mg in Iraq.',
      },
    ],
    createdBy: DEMO_USERS.company_admin.profileId,
    updatedBy: DEMO_USERS.company_admin.profileId,
    submittedBy: DEMO_USERS.company_admin.profileId,
    submittedAt: '2026-06-24T09:00:00Z',
    reviewedBy: DEMO_USERS.admin.profileId,
    reviewedAt: '2026-06-25T09:00:00Z',
    reviewReason: null,
    publishedBy: DEMO_USERS.admin.profileId,
    publishedAt: '2026-06-25T09:00:00Z',
    hiddenBy: null,
    hiddenAt: null,
    hiddenReason: null,
    createdAt: '2026-06-24T08:00:00Z',
    updatedAt: '2026-06-25T09:00:00Z',
  },
  ...ASTRAZENECA_IRAQ_PRODUCTS,
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: '2026-06-29 09:00 UTC',
    actorName: 'Demo Company Admin',
    actorRole: 'company_admin',
    action: 'storage.object.upload',
    targetName: 'Airvento 100 mcg',
    details:
      'Uploaded private storage objects to catalog-product-media and catalog-brochures under folder 71000000-0000-4000-8000-000000000002.',
  },
  {
    id: 'audit-002',
    timestamp: '2026-06-26 09:00 UTC',
    actorName: 'Demo Admin Reviewer',
    actorRole: 'admin',
    action: 'product.lifecycle.publish',
    targetName: 'Cardiostead 5 mg',
    details:
      'Reviewed and published official catalog product Cardiostead 5 mg (market_status = marketed_in_iraq).',
  },
  {
    id: 'audit-003',
    timestamp: '2026-06-25 09:00 UTC',
    actorName: 'Demo Company Admin',
    actorRole: 'company_admin',
    action: 'product.lifecycle.submit',
    targetName: 'Cardiostead 5 mg',
    details:
      'Submitted Cardiostead 5 mg from Tigris Pharma for official catalog review.',
  },
];

export { createClinicalSvgDataUrl };

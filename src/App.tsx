import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Filter,
  FolderLock,
  GitBranch,
  Heart,
  Image as ImageIcon,
  Info,
  Lock,
  LogOut,
  Pill,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Upload,
  UserCheck,
  X,
} from 'lucide-react';
import {
  DEMO_COMPANIES,
  DEMO_COMPANY,
  DEMO_DRUG_CLASSES,
  DEMO_GENERIC_DRUGS,
  DEMO_SPECIALTIES,
  DEMO_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PRODUCTS,
  createClinicalSvgDataUrl,
} from './data/demoCatalogStore';
import {
  AuditLogEntry,
  CompanyRecord,
  DemoUserSession,
  MarketStatus,
  MediaType,
  PlatformRole,
  ProductBrochureRecord,
  ProductCategory,
  ProductLifecycleStatus,
  ProductMediaRecord,
  ProductRecord,
  RegistrationStatus,
  TaxonomyItem,
} from './types/catalog';

type ActiveWorkspace = 'doctor' | 'company' | 'admin' | 'auth' | 'readiness';

type DoctorSearchMode = 'all' | 'company' | 'drug_class' | 'specialty';

type ReadinessPhaseStatus = 'verified' | 'in_progress' | 'action_required';

interface ArchitecturePhaseItem {
  phaseNumber: string;
  title: string;
  status: ReadinessPhaseStatus;
  completionPct: number;
  verifiedEvidence: string;
  remainingWork: string;
}

const ARCHITECTURE_CLOSURE_PHASES: ArchitecturePhaseItem[] = [
  {
    phaseNumber: 'Phase 01',
    title: 'Identity, Roles, Profiles & Trusted Authorization Helpers',
    status: 'verified',
    completionPct: 100,
    verifiedEvidence:
      '7 phase-1 SQL migrations applied; profiles, audit_logs, Iraq governorates/cities, and security-definer role helpers active.',
    remainingWork: 'Complete — verified in cloud backend and local runtime.',
  },
  {
    phaseNumber: 'Phase 02',
    title: 'Healthcare-Professional & Company Verification Foundation',
    status: 'verified',
    completionPct: 90,
    verifiedEvidence:
      'healthcare_professionals and companies schemas, RLS policies, and controlled verification RPCs applied.',
    remainingWork:
      'Connect production physician syndicate credential upload UI for live Iraq onboarding.',
  },
  {
    phaseNumber: 'Phase 03',
    title: 'Company Membership & Tokenized Invitation Workflow',
    status: 'in_progress',
    completionPct: 65,
    verifiedEvidence:
      'company_users table and 5 company roles (company_admin, product_manager, marketing_manager, representative, viewer) enforced.',
    remainingWork:
      'Add 7-day token-hashed email invitation UI (company_invitations) and acceptance screen.',
  },
  {
    phaseNumber: 'Phase 04',
    title: 'Product Taxonomy (Specialties, Drug Classes, Generics & Companies)',
    status: 'verified',
    completionPct: 100,
    verifiedEvidence:
      'Medical Specialties, Drug Classes, Generic Drugs, and Iraq-operating Pharmaceutical Companies wired in English.',
    remainingWork: 'Complete — full taxonomy searchable and filterable.',
  },
  {
    phaseNumber: 'Phase 05',
    title: 'Canonical Product Schema, Iraq Market & Official Lifecycle',
    status: 'verified',
    completionPct: 100,
    verifiedEvidence:
      'products, product_markets (marketed_in_iraq), clinical monograph fields, and draft → submitted → published / changes_requested / hidden transitions verified.',
    remainingWork: 'Complete — end-to-end lifecycle and immutable audit log verified.',
  },
  {
    phaseNumber: 'Phase 06',
    title: 'Official Doctor Catalog Discovery & Search Match Highlighting',
    status: 'verified',
    completionPct: 100,
    verifiedEvidence:
      'Approved-physician gate, multi-token search across brand/generic/company/presentation, clinical-blue match highlighting, and streamlined filter bar.',
    remainingWork: 'Complete — decluttered English-only Doctor Catalog verified.',
  },
  {
    phaseNumber: 'Phase 07',
    title: 'Secure Private Storage Foundation (Media & PDF Brochures)',
    status: 'in_progress',
    completionPct: 85,
    verifiedEvidence:
      'Migration 20260814000100 applied; private buckets catalog-product-media (10 MB) and catalog-brochures (25 MB PDF) with <product_uuid>/<file> isolation.',
    remainingWork:
      'Enable mandatory media & brochure gate enforcement by default for all production publications.',
  },
  {
    phaseNumber: 'Phase 08',
    title: 'Physician Favorites & Catalog Issue Reporting',
    status: 'in_progress',
    completionPct: 70,
    verifiedEvidence:
      'Approved-physician product and company favorites working with non-public privacy isolation.',
    remainingWork:
      'Add doctor/company issue reporting form (reports table) and admin resolution queue.',
  },
  {
    phaseNumber: 'Phase 09',
    title: 'Campaign Targets & Sponsored Search Placement',
    status: 'action_required',
    completionPct: 20,
    verifiedEvidence:
      'Architecture Closure Section 8 rules locked (featured_product and featured_company only, max 3 labeled sponsored results).',
    remainingWork:
      'Implement campaigns and campaign_targets tables plus labeled sponsored search section.',
  },
  {
    phaseNumber: 'Phase 10',
    title: 'Production Cutover, Security Audit & Release Verification',
    status: 'in_progress',
    completionPct: 75,
    verifiedEvidence:
      '31/31 migrations applied, 24/24 tables with RLS enabled, scoped validation and GitHub Actions checks verified on feature branches.',
    remainingWork:
      'Approve Pull Request merge to main, bind production Supabase environment keys, and replace demo seed records.',
  },
];

function formatShortDate(isoString: string | null): string {
  if (!isoString) return 'Not recorded';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function readableEnum(value: string): string {
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

export default function App() {
  const [currentUserKey, setCurrentUserKey] = useState<string>(() => {
    try {
      return localStorage.getItem('pharamty_current_user_key_v1') || 'doctor';
    } catch {
      return 'doctor';
    }
  });
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace>(() => {
    try {
      const saved = localStorage.getItem('pharamty_active_workspace_v1') as ActiveWorkspace | null;
      return saved || 'auth';
    } catch {
      return 'auth';
    }
  });
  const [products, setProducts] = useState<ProductRecord[]>(INITIAL_PRODUCTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([
    '71000000-0000-4000-8000-000000000101',
  ]);
  const [favoriteCompanyIds, setFavoriteCompanyIds] = useState<string[]>([
    DEMO_COMPANY.id,
  ]);

  // Admin-governed Search Lists & Paid Home Medications state
  const [companiesList, setCompaniesList] = useState<CompanyRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pharamty_companies_list_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: CompanyRecord) => ({
            ...c,
            password: c.password || 'Temp#2026',
            isTemporaryPassword: c.isTemporaryPassword ?? true,
          }));
        }
      }
    } catch {
      // Fallback to default seed companies
    }
    return DEMO_COMPANIES;
  });
  const [drugClassesList, setDrugClassesList] =
    useState<TaxonomyItem[]>(DEMO_DRUG_CLASSES);
  const [specialtiesList, setSpecialtiesList] =
    useState<TaxonomyItem[]>(DEMO_SPECIALTIES);
  const [paidHomeProductIds, setPaidHomeProductIds] = useState<string[]>([
    '71000000-0000-4000-8000-000000000101',
    '71000000-0000-4000-8000-000000000103',
  ]);

  // Doctor Catalog state
  const [doctorSearchMode, setDoctorSearchMode] = useState<DoctorSearchMode>('all');
  const [isSearchModePickerOpen, setIsSearchModePickerOpen] = useState<boolean>(false);
  const [isBrowseListOpen, setIsBrowseListOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompanyFilterId, setSelectedCompanyFilterId] = useState<string>('all');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('all');
  const [selectedDrugClassId, setSelectedDrugClassId] = useState<string>('all');
  const [selectedGenericDrugId, setSelectedGenericDrugId] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [selectedDoctorProductId, setSelectedDoctorProductId] = useState<string | null>(null);
  const [selectedDoctorCompanyId, setSelectedDoctorCompanyId] = useState<string | null>(null);
  const [signedBrochureModal, setSignedBrochureModal] = useState<{
    brochure: ProductBrochureRecord;
    productName: string;
    signedUrlToken: string;
  } | null>(null);

  // Company Workspace state
  const [activeCompanyWorkspaceId, setActiveCompanyWorkspaceId] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('pharamty_active_company_id_v1') ||
        '75000000-0000-4000-8000-000000000012'
      );
    } catch {
      return '75000000-0000-4000-8000-000000000012';
    }
  });
  const [selectedCompanyProductId, setSelectedCompanyProductId] = useState<string>(
    '71000000-0000-4000-8000-000000000101'
  );
  const [isCreatingDraft, setIsCreatingDraft] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [enforceMediaForPublication, setEnforceMediaForPublication] = useState<boolean>(false);
  const [showCompanySecuritySettings, setShowCompanySecuritySettings] = useState<boolean>(false);
  const [companyCurrentPassword, setCompanyCurrentPassword] = useState<string>('');
  const [companyNewPassword, setCompanyNewPassword] = useState<string>('');
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState<string>('');

  // Unified Auth / Login & Doctor Sign-Up state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [authLoginRole, setAuthLoginRole] = useState<'doctor' | 'company_admin' | 'admin'>(
    'doctor'
  );
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authSelectedCompanyId, setAuthSelectedCompanyId] = useState<string>(
    '75000000-0000-4000-8000-000000000012'
  );
  const [authDoctorVerificationMode, setAuthDoctorVerificationMode] = useState<
    'approved' | 'pending'
  >('approved');
  const [showDemoCredentialsHelper, setShowDemoCredentialsHelper] = useState<boolean>(false);

  // Registered Doctors store (supports Doctor Sign-Up + Admin Physician Verification Queue)
  const [registeredDoctors, setRegisteredDoctors] = useState<
    Array<
      DemoUserSession & {
        specialty?: string;
        workplace?: string;
        licenseNumber?: string;
        phone?: string;
        password?: string;
      }
    >
  >(() => {
    const defaultDoctors = [
      {
        ...DEMO_USERS.doctor,
        specialty: 'Cardiology',
        workplace: 'Baghdad Medical City — Cardiology Center',
        licenseNumber: 'IQ-IMA-2019-4412',
        phone: '+964 770 112 3344',
      },
      {
        ...DEMO_USERS.pending_doctor,
        specialty: 'Internal Medicine',
        workplace: 'Al-Yarmouk Teaching Hospital, Baghdad',
        licenseNumber: 'IQ-IMA-2025-9180',
        phone: '+964 780 554 1920',
      },
    ];
    try {
      const saved = localStorage.getItem('pharamty_registered_doctors_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default seed doctors
    }
    return defaultDoctors;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pharamty_registered_doctors_v1', JSON.stringify(registeredDoctors));
    } catch {
      // Ignore storage quota errors
    }
  }, [registeredDoctors]);

  useEffect(() => {
    try {
      localStorage.setItem('pharamty_companies_list_v1', JSON.stringify(companiesList));
    } catch {
      // Ignore storage quota errors
    }
  }, [companiesList]);

  useEffect(() => {
    try {
      localStorage.setItem('pharamty_current_user_key_v1', currentUserKey);
      localStorage.setItem('pharamty_active_workspace_v1', activeWorkspace);
      localStorage.setItem('pharamty_active_company_id_v1', activeCompanyWorkspaceId);
    } catch {
      // Ignore storage quota errors
    }
  }, [currentUserKey, activeWorkspace, activeCompanyWorkspaceId]);

  // Doctor Sign-Up form fields
  const [signupFullName, setSignupFullName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [signupSpecialty, setSignupSpecialty] = useState<string>('Cardiology');
  const [signupWorkplace, setSignupWorkplace] = useState<string>('');
  const [signupLicenseNumber, setSignupLicenseNumber] = useState<string>('');
  const [signupPhone, setSignupPhone] = useState<string>('');
  const [signupVerificationMode, setSignupVerificationMode] = useState<
    'approved' | 'pending'
  >('approved');

  // Admin Workspace state
  const [adminViewMode, setAdminViewMode] = useState<
    'review_queue' | 'company_pages' | 'search_lists' | 'paid_home' | 'access_accounts'
  >('access_accounts');
  const [selectedAdminCompanyId, setSelectedAdminCompanyId] = useState<string | null>(null);
  const [selectedAdminDoctorId, setSelectedAdminDoctorId] = useState<string | null>(null);
  const [adminInspectingMember, setAdminInspectingMember] = useState<boolean>(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [editDoctorFullName, setEditDoctorFullName] = useState<string>('');
  const [editDoctorEmail, setEditDoctorEmail] = useState<string>('');
  const [editDoctorSpecialty, setEditDoctorSpecialty] = useState<string>('Cardiology');
  const [editDoctorWorkplace, setEditDoctorWorkplace] = useState<string>('');
  const [editDoctorLicense, setEditDoctorLicense] = useState<string>('');
  const [editDoctorPhone, setEditDoctorPhone] = useState<string>('');
  const [editDoctorPassword, setEditDoctorPassword] = useState<string>('');
  const [adminGlobalSearchQuery, setAdminGlobalSearchQuery] = useState<string>('');
  const [adminSearchListTab, setAdminSearchListTab] = useState<
    'companies' | 'drug_classes' | 'specialties'
  >('companies');
  const [adminQueueFilter, setAdminQueueFilter] = useState<ProductLifecycleStatus | 'all'>(
    ProductLifecycleStatus.Submitted
  );
  const [selectedAdminProductId, setSelectedAdminProductId] = useState<string | null>(null);
  const [adminActionReason, setAdminActionReason] = useState<string>('');
  const [adminActionError, setAdminActionError] = useState<string | null>(null);
  const [bannerNotice, setBannerNotice] = useState<{
    tone: 'success' | 'warning' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [readinessPhaseFilter, setReadinessPhaseFilter] = useState<
    'all' | ReadinessPhaseStatus
  >('all');

  // Admin Search Lists CRUD form state
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyLegalName, setNewCompanyLegalName] = useState('');
  const [newCompanyDescription, setNewCompanyDescription] = useState('');
  const [newCompanyWebsite, setNewCompanyWebsite] = useState('');
  const [newCompanyEmail, setNewCompanyEmail] = useState('');
  const [newCompanyPhone, setNewCompanyPhone] = useState('');
  const [newCompanyTempPassword, setNewCompanyTempPassword] = useState('Temp#2026');
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editCompanyLegalName, setEditCompanyLegalName] = useState('');
  const [editCompanyDescription, setEditCompanyDescription] = useState('');
  const [editCompanyWebsite, setEditCompanyWebsite] = useState('');
  const [editCompanyEmail, setEditCompanyEmail] = useState('');
  const [editCompanyPhone, setEditCompanyPhone] = useState('');
  const [editCompanyTempPassword, setEditCompanyTempPassword] = useState('');

  const [newDrugClassName, setNewDrugClassName] = useState('');
  const [newDrugClassCode, setNewDrugClassCode] = useState('');
  const [newDrugClassDescription, setNewDrugClassDescription] = useState('');
  const [editingDrugClassId, setEditingDrugClassId] = useState<string | null>(null);
  const [editDrugClassName, setEditDrugClassName] = useState('');
  const [editDrugClassDescription, setEditDrugClassDescription] = useState('');

  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [newSpecialtyCode, setNewSpecialtyCode] = useState('');
  const [newSpecialtyDescription, setNewSpecialtyDescription] = useState('');
  const [editingSpecialtyId, setEditingSpecialtyId] = useState<string | null>(null);
  const [editSpecialtyName, setEditSpecialtyName] = useState('');
  const [editSpecialtyCode, setEditSpecialtyCode] = useState('');

  // New Draft / Edit form state (shared by Company Workspace and Admin Company Page / Global Editor)
  const [formCompanyId, setFormCompanyId] = useState<string>(DEMO_COMPANY.id);
  const [formStatus, setFormStatus] = useState<ProductLifecycleStatus>(
    ProductLifecycleStatus.Draft
  );
  const [formIsPaidHomeAd, setFormIsPaidHomeAd] = useState<boolean>(false);
  const [formBrandNameEn, setFormBrandNameEn] = useState('');
  const [formGenericDrugId, setFormGenericDrugId] = useState(DEMO_GENERIC_DRUGS[0].id);
  const [formDrugClassId, setFormDrugClassId] = useState(DEMO_DRUG_CLASSES[0].id);
  const [formCategory, setFormCategory] = useState<ProductCategory>(
    ProductCategory.PrescriptionDrug
  );
  const [formSpecialtyIds, setFormSpecialtyIds] = useState<string[]>([
    DEMO_SPECIALTIES[0].id,
  ]);
  const [formStrength, setFormStrength] = useState('');
  const [formDosageForm, setFormDosageForm] = useState('');
  const [formRoute, setFormRoute] = useState('');
  const [formPackSize, setFormPackSize] = useState('');
  const [formRegNumber, setFormRegNumber] = useState('');
  const [formRegExpiry, setFormRegExpiry] = useState('2028-12-31');
  const [formStorage, setFormStorage] = useState('');
  const [formIndications, setFormIndications] = useState('');
  const [formAdultDose, setFormAdultDose] = useState('');
  const [formContraindications, setFormContraindications] = useState('');
  const [formAdverseEffects, setFormAdverseEffects] = useState('');

  // Private Storage Upload form state
  const [uploadMediaType, setUploadMediaType] = useState<MediaType>(MediaType.PackageImage);
  const [uploadBrochureTitle, setUploadBrochureTitle] = useState('');
  const [uploadBrochureLocale, setUploadBrochureLocale] = useState<'en' | 'ar'>('en');
  const [uploadBrochureNotes, setUploadBrochureNotes] = useState('');

  const getCompanyName = (companyId: string): string => {
    return (
      companiesList.find((c) => c.id === companyId)?.companyName ??
      DEMO_COMPANY.companyName
    );
  };

  const activeCompanyWorkspaceRecord = useMemo(
    () =>
      companiesList.find((c) => c.id === activeCompanyWorkspaceId) ??
      companiesList[0] ??
      DEMO_COMPANY,
    [companiesList, activeCompanyWorkspaceId]
  );

  const currentUser: DemoUserSession = useMemo(() => {
    if (currentUserKey === 'company_admin') {
      return {
        ...DEMO_USERS.company_admin,
        companyId: activeCompanyWorkspaceRecord.id,
        fullName: `${activeCompanyWorkspaceRecord.companyName} — Official Account`,
        email: activeCompanyWorkspaceRecord.contactEmail,
      };
    }
    if (currentUserKey === 'admin') {
      return DEMO_USERS.admin;
    }
    const matchedRegisteredDoctor = registeredDoctors.find(
      (doc) =>
        doc.profileId === currentUserKey ||
        (currentUserKey === 'doctor' &&
          doc.profileId === DEMO_USERS.doctor.profileId) ||
        (currentUserKey === 'pending_doctor' &&
          doc.profileId === DEMO_USERS.pending_doctor.profileId)
    );
    if (matchedRegisteredDoctor) {
      return matchedRegisteredDoctor;
    }
    return DEMO_USERS[currentUserKey] ?? DEMO_USERS.doctor;
  }, [currentUserKey, activeCompanyWorkspaceRecord, registeredDoctors]);

  const switchRoleAndWorkspace = (
    userKey: string,
    workspace: ActiveWorkspace,
    companyIdOverride?: string
  ) => {
    setCurrentUserKey(userKey);
    setActiveWorkspace(workspace);
    if (companyIdOverride) {
      setActiveCompanyWorkspaceId(companyIdOverride);
      const firstProd = products.find((p) => p.companyId === companyIdOverride);
      if (firstProd) {
        setSelectedCompanyProductId(firstProd.id);
      }
    }
    setSelectedDoctorProductId(null);
    setSelectedDoctorCompanyId(null);
    setBannerNotice(null);
    setAdminActionError(null);
  };

  const handleInteractiveLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail = authEmail.trim().toLowerCase();
    if (!enteredEmail) return;

    // 1. Check if email belongs to Platform Admin
    const adminEmails = [
      DEMO_USERS.admin.email.toLowerCase(),
      'admin@pharamty.iq',
      'catalog.admin@pharamty.iq',
      'admin@pharmaconnect.local',
    ];
    if (adminEmails.includes(enteredEmail)) {
      switchRoleAndWorkspace('admin', 'admin');
      appendAudit(
        'auth.session.login',
        enteredEmail,
        'Platform Administrator authenticated via unified login portal into Admin Governance Workspace.'
      );
      setBannerNotice({
        tone: 'success',
        message: 'Signed in as Platform Governance Administrator.',
      });
      return;
    }

    // 2. Check if email matches an assigned Pharmaceutical Company login email (or domain)
    const matchedCompany = companiesList.find((comp) => {
      const compEmail = comp.contactEmail.trim().toLowerCase();
      if (compEmail === enteredEmail) return true;
      const compDomain = compEmail.split('@')[1];
      const enteredDomain = enteredEmail.split('@')[1];
      return Boolean(
        compDomain &&
          enteredDomain &&
          compDomain !== 'pharmaconnect.local' &&
          compDomain !== 'pharamty.iq' &&
          compDomain === enteredDomain
      );
    });

    if (matchedCompany) {
      const expectedPassword = matchedCompany.password || 'Temp#2026';
      const enteredPassword = authPassword.trim();
      if (enteredPassword && enteredPassword !== expectedPassword) {
        setBannerNotice({
          tone: 'error',
          message: `Invalid password for ${matchedCompany.companyName} (${matchedCompany.contactEmail}). Enter the temporary password assigned by the Platform Admin or your updated company password.`,
        });
        return;
      }

      switchRoleAndWorkspace('company_admin', 'company', matchedCompany.id);
      const isUsingTemp = matchedCompany.isTemporaryPassword !== false;
      if (isUsingTemp) {
        setShowCompanySecuritySettings(true);
      }
      appendAudit(
        'auth.session.login',
        enteredEmail,
        `Company Admin authenticated via unified Sign In (${enteredEmail}) into ${matchedCompany.companyName} Workspace.`
      );
      setBannerNotice({
        tone: isUsingTemp ? 'warning' : 'success',
        message: isUsingTemp
          ? `Signed in to ${matchedCompany.companyName} with Admin-assigned temporary password. Please update your password in Security Settings below.`
          : `Signed in to ${matchedCompany.companyName} Official Company Workspace (${matchedCompany.contactEmail}).`,
      });
      setAuthPassword('');
      return;
    }

    // 3. Otherwise authenticate as a Healthcare Professional (Doctor)
    const existingDoctor = registeredDoctors.find(
      (doc) => doc.email.trim().toLowerCase() === enteredEmail
    );

    if (existingDoctor) {
      switchRoleAndWorkspace(existingDoctor.profileId, 'doctor');
      appendAudit(
        'auth.session.login',
        existingDoctor.email,
        `Physician signed in (${existingDoctor.verificationStatus} verification status).`
      );
      setBannerNotice({
        tone: existingDoctor.verificationStatus === 'approved' ? 'success' : 'warning',
        message:
          existingDoctor.verificationStatus === 'approved'
            ? `Welcome back, ${existingDoctor.fullName} — Official Physician Catalog unlocked.`
            : `Signed in as ${existingDoctor.fullName}. Your physician account is awaiting Admin verification.`,
      });
      return;
    }

    // If a new doctor email is entered directly in Sign In, create an approved physician session
    const localPart = enteredEmail.split('@')[0] || 'Physician';
    const formattedName =
      'Dr. ' +
      localPart
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
    const newDocSession = {
      ...DEMO_USERS.doctor,
      profileId: `doc-${Date.now()}`,
      fullName: formattedName,
      email: enteredEmail,
      role: PlatformRole.HealthcareProfessional,
      verificationStatus: 'approved' as const,
      specialty: 'Internal Medicine',
      workplace: 'Iraq Clinical Practice',
      licenseNumber: 'IQ-IMA-VERIFIED',
    };
    setRegisteredDoctors((prev) => [...prev, newDocSession]);
    switchRoleAndWorkspace(newDocSession.profileId, 'doctor');
    appendAudit(
      'auth.session.login',
      enteredEmail,
      `Physician signed in via unified entrance (${formattedName}).`
    );
    setBannerNotice({
      tone: 'success',
      message: `Signed in as ${formattedName} — Official Physician Catalog unlocked.`,
    });
  };

  const handleDoctorSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = signupEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    // Prevent signing up with reserved Admin or Company emails
    const isCompanyEmail = companiesList.some(
      (c) => c.contactEmail.trim().toLowerCase() === cleanEmail
    );
    if (
      isCompanyEmail ||
      cleanEmail === DEMO_USERS.admin.email.toLowerCase() ||
      cleanEmail === 'admin@pharamty.iq'
    ) {
      setBannerNotice({
        tone: 'error',
        message:
          'This email is assigned to an institutional account. Please use the Sign In tab with this email.',
      });
      setAuthMode('signin');
      setAuthEmail(cleanEmail);
      return;
    }

    const derivedNameFromEmail =
      cleanEmail
        .split('@')[0]
        ?.replace(/[._0-9-]+/g, ' ')
        .trim()
        .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Physician';

    const rawName = signupFullName.trim() || derivedNameFromEmail;
    const formattedDoctorName = rawName.toLowerCase().startsWith('dr.')
      ? rawName
      : `Dr. ${rawName}`;

    const newDoctor = {
      ...DEMO_USERS.doctor,
      profileId: `doc-${Date.now()}`,
      fullName: formattedDoctorName,
      email: cleanEmail,
      role: PlatformRole.HealthcareProfessional,
      verificationStatus: signupVerificationMode,
      specialty: signupSpecialty,
      workplace: signupWorkplace.trim() || 'Baghdad Teaching Hospital, Iraq',
      licenseNumber: signupLicenseNumber.trim() || 'IQ-IMA-2026-5092',
      phone: signupPhone.trim() || '+964 770 000 0000',
      password: signupPassword,
    };

    setRegisteredDoctors((prev) => [
      ...prev.filter((d) => d.email.toLowerCase() !== cleanEmail),
      newDoctor,
    ]);
    switchRoleAndWorkspace(newDoctor.profileId, 'doctor');
    appendAudit(
      'auth.doctor.signup',
      newDoctor.email,
      `Physician registered via Doctor Sign Up (${newDoctor.fullName}, email: ${newDoctor.email}, status: ${newDoctor.verificationStatus}).`
    );

    setSignupFullName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupWorkplace('');
    setSignupLicenseNumber('');
    setSignupPhone('');

    setBannerNotice({
      tone: newDoctor.verificationStatus === 'approved' ? 'success' : 'warning',
      message:
        newDoctor.verificationStatus === 'approved'
          ? `Physician account created and verified for ${newDoctor.fullName} (${newDoctor.email}). Welcome to Pharmaty.`
          : `Registration submitted for ${newDoctor.fullName} (${newDoctor.email}). Your physician credential is now in the Admin Verification Queue.`,
    });
  };

  const handleAdminToggleDoctorVerification = (profileId: string) => {
    const targetDoc = registeredDoctors.find((d) => d.profileId === profileId);
    if (!targetDoc) return;
    const nextStatus =
      targetDoc.verificationStatus === 'approved' ? 'pending' : 'approved';
    setRegisteredDoctors((prev) =>
      prev.map((d) =>
        d.profileId === profileId ? { ...d, verificationStatus: nextStatus } : d
      )
    );
    appendAudit(
      nextStatus === 'approved'
        ? 'admin.doctor.approve_verification'
        : 'admin.doctor.set_pending',
      targetDoc.fullName,
      `Set physician verification status for ${targetDoc.email} to ${nextStatus}.`
    );
    setBannerNotice({
      tone: nextStatus === 'approved' ? 'success' : 'warning',
      message:
        nextStatus === 'approved'
          ? `Approved physician access for ${targetDoc.fullName} (${targetDoc.email}).`
          : `Set ${targetDoc.fullName} (${targetDoc.email}) to Pending Verification.`,
    });
  };

  const openAdminDoctorPage = (profileId: string) => {
    setSelectedAdminDoctorId(profileId);
    setSelectedAdminCompanyId(null);
    setEditingDoctorId(null);
    setAdminViewMode('access_accounts');
    setAdminGlobalSearchQuery('');
  };

  const openAdminCompanyPage = (companyId: string) => {
    setSelectedAdminCompanyId(companyId);
    setSelectedAdminDoctorId(null);
    setEditingCompanyId(null);
    setAdminViewMode('company_pages');
    setAdminGlobalSearchQuery('');
  };

  const handleAdminSaveDoctorEdit = (profileId: string) => {
    if (!editDoctorFullName.trim()) return;
    const formattedName = editDoctorFullName.trim().toLowerCase().startsWith('dr.')
      ? editDoctorFullName.trim()
      : `Dr. ${editDoctorFullName.trim()}`;
    setRegisteredDoctors((prev) =>
      prev.map((doc) => {
        if (doc.profileId !== profileId) return doc;
        return {
          ...doc,
          fullName: formattedName,
          email: editDoctorEmail.trim().toLowerCase() || doc.email,
          specialty: editDoctorSpecialty || doc.specialty,
          workplace: editDoctorWorkplace.trim() || doc.workplace,
          licenseNumber: editDoctorLicense.trim() || doc.licenseNumber,
          phone: editDoctorPhone.trim() || doc.phone,
          password: editDoctorPassword.trim() || doc.password,
        };
      })
    );
    appendAudit(
      'admin.doctor.profile_update',
      formattedName,
      `Admin updated physician member profile (${editDoctorEmail.trim()}).`
    );
    setBannerNotice({
      tone: 'success',
      message: `Saved Doctor Page profile changes for ${formattedName}.`,
    });
    setEditingDoctorId(null);
  };

  const appendAudit = (action: string, targetName: string, details: string) => {
    const now = new Date();
    const formatted = `${now.toISOString().slice(0, 16).replace('T', ' ')} UTC`;
    const newEntry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: formatted,
      actorName: currentUser.fullName,
      actorRole: currentUser.companyRole ?? currentUser.role,
      action,
      targetName,
      details,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const activeCompaniesList = useMemo(
    () => companiesList.filter((c) => c.status === 'verified'),
    [companiesList]
  );

  const activeDrugClassesList = useMemo(() => {
    const active = drugClassesList.filter((c) => c.isActive);
    return [...active].sort((a, b) => {
      const countA = products.filter(
        (p) => p.status === ProductLifecycleStatus.Published && p.drugClassId === a.id
      ).length;
      const countB = products.filter(
        (p) => p.status === ProductLifecycleStatus.Published && p.drugClassId === b.id
      ).length;
      if (countA !== countB) return countB - countA;
      return a.nameEn.localeCompare(b.nameEn);
    });
  }, [drugClassesList, products]);

  const activeSpecialtiesList = useMemo(() => {
    const active = specialtiesList.filter((s) => s.isActive);
    return [...active].sort((a, b) => {
      const countA = products.filter(
        (p) =>
          p.status === ProductLifecycleStatus.Published && p.specialtyIds.includes(a.id)
      ).length;
      const countB = products.filter(
        (p) =>
          p.status === ProductLifecycleStatus.Published && p.specialtyIds.includes(b.id)
      ).length;
      if (countA !== countB) return countB - countA;
      return a.nameEn.localeCompare(b.nameEn);
    });
  }, [specialtiesList, products]);

  // Official published products visible to approved physicians
  const publishedOfficialProducts = useMemo(() => {
    return products.filter((product) => {
      const owningCompany = companiesList.find((c) => c.id === product.companyId);
      const isCompanyVerified = owningCompany
        ? owningCompany.status === 'verified'
        : true;
      return (
        product.status === ProductLifecycleStatus.Published &&
        product.iraqMarket.marketStatus === MarketStatus.MarketedInIraq &&
        isCompanyVerified
      );
    });
  }, [products, companiesList]);

  const isDoctorSearchActive =
    doctorSearchMode !== 'all' ||
    searchQuery.trim().length > 0 ||
    selectedCompanyFilterId !== 'all' ||
    selectedDrugClassId !== 'all' ||
    selectedSpecialtyId !== 'all' ||
    selectedGenericDrugId !== 'all' ||
    onlyFavorites;

  const paidHomeProducts = useMemo(() => {
    return publishedOfficialProducts.filter((product) =>
      paidHomeProductIds.includes(product.id)
    );
  }, [publishedOfficialProducts, paidHomeProductIds]);

  // Matching verified companies when doctor searches by Company or types a company name
  const matchingDoctorCompanies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (doctorSearchMode === 'company') {
      if (!q) return activeCompaniesList;
      return activeCompaniesList.filter((comp) =>
        `${comp.companyName} ${comp.legalName} ${comp.description}`
          .toLowerCase()
          .includes(q)
      );
    }
    if (!q) return [];
    return activeCompaniesList.filter((comp) =>
      `${comp.companyName} ${comp.legalName}`.toLowerCase().includes(q)
    );
  }, [activeCompaniesList, doctorSearchMode, searchQuery]);

  // Matching drug classes when doctor is in Drug Class mode
  const matchingDoctorDrugClasses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeDrugClassesList;
    const stems = q
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => (t.length > 4 && t.endsWith('s') ? t.slice(0, -1) : t));
    return activeDrugClassesList.filter((dc) => {
      const hay = `${dc.nameEn} ${dc.code} ${dc.descriptionEn}`.toLowerCase();
      return stems.every((stem) => hay.includes(stem));
    });
  }, [activeDrugClassesList, searchQuery]);

  const filteredDoctorProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const selectedDrugClassObj =
      selectedDrugClassId !== 'all'
        ? drugClassesList.find((c) => c.id === selectedDrugClassId)
        : null;
    const selectedSpecialtyObj =
      selectedSpecialtyId !== 'all'
        ? specialtiesList.find((s) => s.id === selectedSpecialtyId)
        : null;
    const selectedCompanyObj =
      selectedCompanyFilterId !== 'all'
        ? companiesList.find((c) => c.id === selectedCompanyFilterId)
        : null;

    // Determine if searchQuery is simply echoing the selected taxonomy pill/dropdown item
    const isQueryEchoingSelection =
      (selectedDrugClassObj && q === selectedDrugClassObj.nameEn.toLowerCase()) ||
      (selectedSpecialtyObj && q === selectedSpecialtyObj.nameEn.toLowerCase()) ||
      (selectedCompanyObj && q === selectedCompanyObj.companyName.toLowerCase());

    const rawTokens = isQueryEchoingSelection ? [] : q.split(/\s+/).filter(Boolean);
    const normalizedTokens = rawTokens.map((t) =>
      t.length > 4 && t.endsWith('s') ? t.slice(0, -1) : t
    );

    return publishedOfficialProducts.filter((product) => {
      if (
        selectedCompanyFilterId !== 'all' &&
        product.companyId !== selectedCompanyFilterId
      ) {
        return false;
      }
      if (
        selectedSpecialtyId !== 'all' &&
        !product.specialtyIds.includes(selectedSpecialtyId)
      ) {
        return false;
      }
      if (selectedDrugClassId !== 'all' && product.drugClassId !== selectedDrugClassId) {
        return false;
      }
      if (
        selectedGenericDrugId !== 'all' &&
        product.genericDrugId !== selectedGenericDrugId
      ) {
        return false;
      }
      if (onlyFavorites && !favoriteProductIds.includes(product.id)) {
        return false;
      }

      if (normalizedTokens.length === 0) {
        return true;
      }

      const generic = DEMO_GENERIC_DRUGS.find((g) => g.id === product.genericDrugId);
      const drugClass = drugClassesList.find((c) => c.id === product.drugClassId);
      const companyName = getCompanyName(product.companyId);
      const specialtyNames = product.specialtyIds
        .map((spId) => {
          const sp = specialtiesList.find((item) => item.id === spId);
          return sp ? `${sp.nameEn} ${sp.code}` : '';
        })
        .join(' ');

      const fullSearchable = [
        product.brandNameEn,
        generic?.nameEn ?? '',
        generic?.descriptionEn ?? '',
        ...(generic?.ingredients ?? []),
        drugClass?.nameEn ?? '',
        drugClass?.code ?? '',
        drugClass?.descriptionEn ?? '',
        companyName,
        product.iraqMarket.strength,
        product.iraqMarket.dosageForm,
        product.iraqMarket.approvedIndicationsEn,
        specialtyNames,
      ]
        .join(' ')
        .toLowerCase();

      const searchableByMode =
        doctorSearchMode === 'company'
          ? `${companyName} ${product.brandNameEn} ${generic?.nameEn ?? ''}`.toLowerCase()
          : doctorSearchMode === 'drug_class'
          ? `${drugClass?.nameEn ?? ''} ${drugClass?.code ?? ''} ${
              drugClass?.descriptionEn ?? ''
            } ${generic?.nameEn ?? ''} ${generic?.descriptionEn ?? ''} ${
              product.brandNameEn
            }`.toLowerCase()
          : doctorSearchMode === 'specialty'
          ? `${specialtyNames} ${drugClass?.nameEn ?? ''} ${
              product.iraqMarket.approvedIndicationsEn
            }`.toLowerCase()
          : fullSearchable;

      return normalizedTokens.every((token) => searchableByMode.includes(token));
    });
  }, [
    publishedOfficialProducts,
    drugClassesList,
    specialtiesList,
    companiesList,
    doctorSearchMode,
    searchQuery,
    selectedCompanyFilterId,
    selectedSpecialtyId,
    selectedDrugClassId,
    selectedGenericDrugId,
    onlyFavorites,
    favoriteProductIds,
  ]);

  const selectedDoctorProduct = useMemo(
    () =>
      publishedOfficialProducts.find((item) => item.id === selectedDoctorProductId) ?? null,
    [publishedOfficialProducts, selectedDoctorProductId]
  );

  const selectedDoctorCompany = useMemo(
    () => companiesList.find((c) => c.id === selectedDoctorCompanyId) ?? null,
    [companiesList, selectedDoctorCompanyId]
  );

  const companyWorkspaceProducts = useMemo(
    () => products.filter((p) => p.companyId === activeCompanyWorkspaceRecord.id),
    [products, activeCompanyWorkspaceRecord]
  );

  const selectedCompanyProduct = useMemo(
    () =>
      companyWorkspaceProducts.find((item) => item.id === selectedCompanyProductId) ??
      companyWorkspaceProducts[0] ??
      null,
    [companyWorkspaceProducts, selectedCompanyProductId]
  );

  const selectedAdminCompany = useMemo(
    () => companiesList.find((c) => c.id === selectedAdminCompanyId) ?? null,
    [companiesList, selectedAdminCompanyId]
  );

  const selectedAdminDoctor = useMemo(
    () => registeredDoctors.find((d) => d.profileId === selectedAdminDoctorId) ?? null,
    [registeredDoctors, selectedAdminDoctorId]
  );

  // Unified Admin Global Search across Products, Companies, Doctors, Drug Classes, and Specialties
  const adminGlobalSearchResults = useMemo(() => {
    const q = adminGlobalSearchQuery.trim().toLowerCase();
    if (!q) {
      return {
        products: [] as ProductRecord[],
        companies: [] as CompanyRecord[],
        doctors: [] as typeof registeredDoctors,
        drugClasses: [] as TaxonomyItem[],
        specialties: [] as TaxonomyItem[],
      };
    }
    const tokens = q.split(/\s+/).filter(Boolean);

    const matchedCompanies = companiesList.filter((comp) => {
      const hay = `${comp.companyName} ${comp.legalName} ${comp.description} ${comp.contactEmail}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });

    const matchedDoctors = registeredDoctors.filter((doc) => {
      const hay = `${doc.fullName} ${doc.email} ${doc.specialty ?? ''} ${doc.workplace ?? ''} ${doc.licenseNumber ?? ''}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });

    const matchedProducts = products.filter((prod) => {
      const generic = DEMO_GENERIC_DRUGS.find((g) => g.id === prod.genericDrugId);
      const drugClass = drugClassesList.find((c) => c.id === prod.drugClassId);
      const companyName = getCompanyName(prod.companyId);
      const hay = [
        prod.brandNameEn,
        generic?.nameEn ?? '',
        drugClass?.nameEn ?? '',
        companyName,
        prod.iraqMarket.strength,
        prod.iraqMarket.dosageForm,
        prod.iraqMarket.registrationNumber,
        prod.status,
      ]
        .join(' ')
        .toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });

    const matchedDrugClasses = drugClassesList.filter((dc) => {
      const hay = `${dc.nameEn} ${dc.code} ${dc.descriptionEn}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });

    const matchedSpecialties = specialtiesList.filter((sp) => {
      const hay = `${sp.nameEn} ${sp.code} ${sp.descriptionEn}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });

    return {
      products: matchedProducts,
      companies: matchedCompanies,
      doctors: matchedDoctors,
      drugClasses: matchedDrugClasses,
      specialties: matchedSpecialties,
    };
  }, [
    adminGlobalSearchQuery,
    companiesList,
    registeredDoctors,
    products,
    drugClassesList,
    specialtiesList,
  ]);

  const adminFilteredQueue = useMemo(() => {
    if (adminQueueFilter === 'all') return products;
    return products.filter((item) => item.status === adminQueueFilter);
  }, [products, adminQueueFilter]);

  const selectedAdminProduct = useMemo(() => {
    if (selectedAdminProductId) {
      const match = products.find((p) => p.id === selectedAdminProductId);
      if (match) return match;
    }
    return adminFilteredQueue[0] ?? null;
  }, [products, selectedAdminProductId, adminFilteredQueue]);

  // Readiness evaluator for a product
  const evaluateProductReadiness = (product: ProductRecord) => {
    const hasBrandEn = product.brandNameEn.trim().length > 0;
    const hasGeneric = Boolean(product.genericDrugId);
    const hasDrugClass = Boolean(product.drugClassId);
    const hasSpecialty = product.specialtyIds.length > 0;
    const hasMarketedInIraq =
      product.iraqMarket.marketStatus === MarketStatus.MarketedInIraq &&
      product.iraqMarket.strength.trim().length > 0 &&
      product.iraqMarket.dosageForm.trim().length > 0 &&
      product.iraqMarket.route.trim().length > 0 &&
      product.iraqMarket.packSize.trim().length > 0;
    const hasClinicalContent =
      product.iraqMarket.storageConditionsEn.trim().length > 0 &&
      product.iraqMarket.approvedIndicationsEn.trim().length > 0 &&
      product.iraqMarket.usualAdultDoseEn.trim().length > 0 &&
      product.iraqMarket.contraindicationsEn.trim().length > 0 &&
      product.iraqMarket.commonAdverseEffectsEn.trim().length > 0;
    const hasProductImage = product.media.some(
      (m) => m.mediaType === MediaType.ProductImage
    );
    const hasPackageImage = product.media.some(
      (m) => m.mediaType === MediaType.PackageImage
    );
    const hasCurrentBrochure = product.brochures.some((b) => b.isCurrent);

    const coreReady =
      hasBrandEn &&
      hasGeneric &&
      hasDrugClass &&
      hasSpecialty &&
      hasMarketedInIraq &&
      hasClinicalContent;

    const mediaReady = hasProductImage && hasPackageImage && hasCurrentBrochure;

    return {
      hasBrandEn,
      hasGeneric,
      hasDrugClass,
      hasSpecialty,
      hasMarketedInIraq,
      hasClinicalContent,
      hasProductImage,
      hasPackageImage,
      hasCurrentBrochure,
      coreReady,
      mediaReady,
      canSubmitOrPublish: enforceMediaForPublication
        ? coreReady && mediaReady
        : coreReady,
    };
  };

  const toggleFavoriteProduct = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (
      currentUser.role !== PlatformRole.HealthcareProfessional ||
      currentUser.verificationStatus !== 'approved'
    ) {
      return;
    }
    setFavoriteProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFavoriteCompany = (companyId: string) => {
    if (
      currentUser.role !== PlatformRole.HealthcareProfessional ||
      currentUser.verificationStatus !== 'approved'
    ) {
      return;
    }
    setFavoriteCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const openEditDraftModal = (product?: ProductRecord, defaultCompanyId?: string) => {
    if (product) {
      setIsCreatingDraft(false);
      setEditingProductId(product.id);
      setFormCompanyId(product.companyId);
      setFormStatus(product.status);
      setFormIsPaidHomeAd(paidHomeProductIds.includes(product.id));
      setFormBrandNameEn(product.brandNameEn);
      setFormGenericDrugId(product.genericDrugId);
      setFormDrugClassId(product.drugClassId);
      setFormCategory(product.category);
      setFormSpecialtyIds(product.specialtyIds);
      setFormStrength(product.iraqMarket.strength);
      setFormDosageForm(product.iraqMarket.dosageForm);
      setFormRoute(product.iraqMarket.route);
      setFormPackSize(product.iraqMarket.packSize);
      setFormRegNumber(product.iraqMarket.registrationNumber);
      setFormRegExpiry(product.iraqMarket.registrationExpiresOn);
      setFormStorage(product.iraqMarket.storageConditionsEn);
      setFormIndications(product.iraqMarket.approvedIndicationsEn);
      setFormAdultDose(product.iraqMarket.usualAdultDoseEn);
      setFormContraindications(product.iraqMarket.contraindicationsEn);
      setFormAdverseEffects(product.iraqMarket.commonAdverseEffectsEn);
    } else {
      const targetCompId =
        defaultCompanyId ??
        (activeWorkspace === 'admin' && selectedAdminCompanyId
          ? selectedAdminCompanyId
          : activeCompanyWorkspaceRecord.id);
      setIsCreatingDraft(true);
      setEditingProductId(null);
      setFormCompanyId(targetCompId);
      setFormStatus(
        activeWorkspace === 'admin'
          ? ProductLifecycleStatus.Published
          : ProductLifecycleStatus.Draft
      );
      setFormIsPaidHomeAd(false);
      setFormBrandNameEn('');
      setFormGenericDrugId(DEMO_GENERIC_DRUGS[0].id);
      setFormDrugClassId(DEMO_DRUG_CLASSES[0].id);
      setFormCategory(ProductCategory.PrescriptionDrug);
      setFormSpecialtyIds([DEMO_SPECIALTIES[0].id]);
      setFormStrength('10 mg');
      setFormDosageForm('Film-coated tablet');
      setFormRoute('Oral');
      setFormPackSize('28 tablets blister pack');
      setFormRegNumber(`IQ-REG-${String(products.length + 101).padStart(4, '0')}`);
      setFormRegExpiry('2029-12-31');
      setFormStorage('Store below 30°C in original package.');
      setFormIndications(
        'Official catalog clinical summary for approved physician review.'
      );
      setFormAdultDose('Once daily oral administration as directed by physician.');
      setFormContraindications('Hypersensitivity to active substance or excipients.');
      setFormAdverseEffects('Mild headache, dizziness, gastrointestinal discomfort.');
    }
  };

  const saveDraftForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBrandNameEn.trim()) return;
    const nowIso = new Date().toISOString();
    const targetCompanyName = getCompanyName(formCompanyId);

    if (isCreatingDraft) {
      const newProductId = `71000000-0000-4000-8000-${String(products.length + 201).padStart(
        12,
        '0'
      )}`;
      const newMarketId = `72000000-0000-4000-8000-${String(products.length + 201).padStart(
        12,
        '0'
      )}`;
      const finalStatus =
        activeWorkspace === 'admin' ? formStatus : ProductLifecycleStatus.Draft;
      const newProduct: ProductRecord = {
        id: newProductId,
        companyId: formCompanyId,
        genericDrugId: formGenericDrugId,
        drugClassId: formDrugClassId,
        category: formCategory,
        status: finalStatus,
        brandNameEn: formBrandNameEn.trim(),
        specialtyIds: formSpecialtyIds.length ? formSpecialtyIds : [DEMO_SPECIALTIES[0].id],
        iraqMarket: {
          id: newMarketId,
          productId: newProductId,
          countryCode: 'IQ',
          strength: formStrength.trim(),
          dosageForm: formDosageForm.trim(),
          route: formRoute.trim(),
          packSize: formPackSize.trim(),
          marketStatus: MarketStatus.MarketedInIraq,
          registrationStatus: RegistrationStatus.Registered,
          registrationNumber: formRegNumber.trim(),
          registrationAuthority: 'Iraq Ministry of Health',
          registrationExpiresOn: formRegExpiry,
          storageConditionsEn: formStorage.trim(),
          approvedIndicationsEn: formIndications.trim(),
          usualAdultDoseEn: formAdultDose.trim(),
          contraindicationsEn: formContraindications.trim(),
          commonAdverseEffectsEn: formAdverseEffects.trim(),
        },
        media: [],
        brochures: [],
        createdBy: currentUser.profileId,
        updatedBy: currentUser.profileId,
        submittedBy:
          finalStatus === ProductLifecycleStatus.Published ? currentUser.profileId : null,
        submittedAt: finalStatus === ProductLifecycleStatus.Published ? nowIso : null,
        reviewedBy:
          finalStatus === ProductLifecycleStatus.Published ? currentUser.profileId : null,
        reviewedAt: finalStatus === ProductLifecycleStatus.Published ? nowIso : null,
        reviewReason: null,
        publishedBy:
          finalStatus === ProductLifecycleStatus.Published ? currentUser.profileId : null,
        publishedAt: finalStatus === ProductLifecycleStatus.Published ? nowIso : null,
        hiddenBy: null,
        hiddenAt: null,
        hiddenReason: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      setProducts((prev) => [newProduct, ...prev]);
      setSelectedCompanyProductId(newProductId);
      if (formIsPaidHomeAd) {
        setPaidHomeProductIds((prev) =>
          prev.includes(newProductId) ? prev : [...prev, newProductId]
        );
      }
      appendAudit(
        'product.create',
        newProduct.brandNameEn,
        `Created product "${newProduct.brandNameEn}" (${readableEnum(
          finalStatus
        )}) for ${targetCompanyName}.`
      );
      setBannerNotice({
        tone: 'success',
        message: `Added "${newProduct.brandNameEn}" under ${targetCompanyName}.`,
      });
    } else if (editingProductId) {
      setProducts((prev) =>
        prev.map((item) => {
          if (item.id !== editingProductId) return item;
          const nextStatus = activeWorkspace === 'admin' ? formStatus : item.status;
          return {
            ...item,
            companyId: formCompanyId,
            status: nextStatus,
            brandNameEn: formBrandNameEn.trim(),
            genericDrugId: formGenericDrugId,
            drugClassId: formDrugClassId,
            category: formCategory,
            specialtyIds: formSpecialtyIds.length
              ? formSpecialtyIds
              : [DEMO_SPECIALTIES[0].id],
            publishedAt:
              nextStatus === ProductLifecycleStatus.Published && !item.publishedAt
                ? nowIso
                : item.publishedAt,
            updatedBy: currentUser.profileId,
            updatedAt: nowIso,
            iraqMarket: {
              ...item.iraqMarket,
              strength: formStrength.trim(),
              dosageForm: formDosageForm.trim(),
              route: formRoute.trim(),
              packSize: formPackSize.trim(),
              registrationNumber: formRegNumber.trim(),
              registrationExpiresOn: formRegExpiry,
              storageConditionsEn: formStorage.trim(),
              approvedIndicationsEn: formIndications.trim(),
              usualAdultDoseEn: formAdultDose.trim(),
              contraindicationsEn: formContraindications.trim(),
              commonAdverseEffectsEn: formAdverseEffects.trim(),
            },
          };
        })
      );
      if (activeWorkspace === 'admin') {
        setPaidHomeProductIds((prev) => {
          if (formIsPaidHomeAd && !prev.includes(editingProductId)) {
            return [...prev, editingProductId];
          }
          if (!formIsPaidHomeAd && prev.includes(editingProductId)) {
            return prev.filter((id) => id !== editingProductId);
          }
          return prev;
        });
      }
      appendAudit(
        'product.update',
        formBrandNameEn.trim(),
        `Updated product "${formBrandNameEn.trim()}" under ${targetCompanyName}.`
      );
      setBannerNotice({
        tone: 'success',
        message: `Saved changes to "${formBrandNameEn.trim()}" (${targetCompanyName}).`,
      });
    }

    setIsCreatingDraft(false);
    setEditingProductId(null);
  };

  // Upload media to private bucket `catalog-product-media`
  const handleUploadProductMedia = (
    product: ProductRecord,
    mediaType: MediaType,
    customFile?: File
  ) => {
    const isEditable =
      product.status === ProductLifecycleStatus.Draft ||
      product.status === ProductLifecycleStatus.ChangesRequested;
    if (!isEditable) return;

    const ext = customFile
      ? customFile.name.split('.').pop()?.toLowerCase() ?? 'png'
      : 'png';
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      setBannerNotice({
        tone: 'error',
        message:
          'Storage policy violation: catalog-product-media allows only jpg, jpeg, png, or webp.',
      });
      return;
    }

    const fileSize = customFile ? customFile.size : 428600;
    if (fileSize > 10485760) {
      setBannerNotice({
        tone: 'error',
        message:
          'Storage policy violation: catalog-product-media enforces a 10 MB file_size_limit.',
      });
      return;
    }

    const slug = product.brandNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const typeSlug = mediaType === MediaType.ProductImage ? 'product' : 'package';
    const fileName = customFile
      ? customFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      : `${slug}_${typeSlug}_${product.media.length + 1}.${ext}`;
    const storagePath = `${product.id}/${fileName}`;

    const newMedia: ProductMediaRecord = {
      id: `media-${Date.now()}`,
      productId: product.id,
      mediaType,
      bucketId: 'catalog-product-media',
      storagePath,
      fileName,
      mimeType:
        ext === 'webp'
          ? 'image/webp'
          : ext === 'jpg' || ext === 'jpeg'
          ? 'image/jpeg'
          : 'image/png',
      fileSizeBytes: fileSize,
      sortOrder: product.media.length,
      isPrimary: !product.media.some((m) => m.mediaType === mediaType && m.isPrimary),
      uploadedBy: currentUser.profileId,
      createdAt: new Date().toISOString(),
      previewDataUrl: createClinicalSvgDataUrl(
        product.brandNameEn,
        `${readableEnum(mediaType)} • ${product.iraqMarket.strength}`,
        mediaType === MediaType.ProductImage ? 'PRODUCT IMAGE' : 'PACKAGE IMAGE',
        mediaType === MediaType.ProductImage ? '#5DB4F2' : '#38C976'
      ),
    };

    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              media: [...item.media, newMedia],
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );

    appendAudit(
      'storage.catalog_product_media.insert',
      product.brandNameEn,
      `Uploaded ${storagePath} (${formatBytes(fileSize)}) to private bucket catalog-product-media.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Uploaded ${readableEnum(mediaType)} to catalog-product-media/${storagePath}.`,
    });
  };

  // Upload PDF brochure to private bucket `catalog-brochures`
  const handleUploadBrochure = (product: ProductRecord, customFile?: File) => {
    const isEditable =
      product.status === ProductLifecycleStatus.Draft ||
      product.status === ProductLifecycleStatus.ChangesRequested;
    if (!isEditable) return;

    const ext = customFile
      ? customFile.name.split('.').pop()?.toLowerCase() ?? 'pdf'
      : 'pdf';
    if (ext !== 'pdf') {
      setBannerNotice({
        tone: 'error',
        message: 'Storage policy violation: catalog-brochures allows only PDF files.',
      });
      return;
    }

    const fileSize = customFile ? customFile.size : 1340200;
    if (fileSize > 26214400) {
      setBannerNotice({
        tone: 'error',
        message:
          'Storage policy violation: catalog-brochures enforces a 25 MB file_size_limit.',
      });
      return;
    }

    const localeBrochures = product.brochures.filter(
      (b) => b.locale === uploadBrochureLocale
    );
    const nextVersion =
      localeBrochures.reduce((max, b) => Math.max(max, b.version), 0) + 1;
    const slug = product.brandNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const fileName = customFile
      ? customFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      : `${slug}_iraq_brochure_${uploadBrochureLocale}_v${nextVersion}.pdf`;
    const storagePath = `${product.id}/${fileName}`;
    const title =
      uploadBrochureTitle.trim() ||
      `${product.brandNameEn} — Official Iraq Clinical Monograph (${uploadBrochureLocale.toUpperCase()} v${nextVersion})`;

    const newBrochure: ProductBrochureRecord = {
      id: `brochure-${Date.now()}`,
      productMarketId: product.iraqMarket.id,
      productId: product.id,
      locale: uploadBrochureLocale,
      title,
      bucketId: 'catalog-brochures',
      storagePath,
      fileName,
      mimeType: 'application/pdf',
      fileSizeBytes: fileSize,
      version: nextVersion,
      isCurrent: true,
      uploadedBy: currentUser.profileId,
      createdAt: new Date().toISOString(),
      summaryNotes:
        uploadBrochureNotes.trim() ||
        `Version ${nextVersion} official clinical prescribing brochure for ${product.brandNameEn} (${product.iraqMarket.strength} ${product.iraqMarket.dosageForm}).`,
    };

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== product.id) return item;
        const updatedBrochures = item.brochures.map((b) =>
          b.locale === uploadBrochureLocale ? { ...b, isCurrent: false } : b
        );
        return {
          ...item,
          brochures: [newBrochure, ...updatedBrochures],
          updatedAt: new Date().toISOString(),
        };
      })
    );

    setUploadBrochureTitle('');
    setUploadBrochureNotes('');
    appendAudit(
      'storage.catalog_brochures.insert',
      product.brandNameEn,
      `Uploaded ${storagePath} (v${nextVersion}, ${formatBytes(
        fileSize
      )}) to private bucket catalog-brochures.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Uploaded PDF brochure v${nextVersion} to catalog-brochures/${storagePath}.`,
    });
  };

  const handleDeleteMediaObject = (product: ProductRecord, mediaId: string) => {
    const target = product.media.find((m) => m.id === mediaId);
    if (!target) return;
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              media: item.media.filter((m) => m.id !== mediaId),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
    appendAudit(
      'storage.catalog_product_media.delete',
      product.brandNameEn,
      `Deleted storage object ${target.storagePath} from catalog-product-media.`
    );
  };

  // Company lifecycle transitions
  const handleCompanySubmitForReview = (product: ProductRecord) => {
    const readiness = evaluateProductReadiness(product);
    if (!readiness.canSubmitOrPublish) {
      setBannerNotice({
        tone: 'warning',
        message:
          'Product does not satisfy all required submission checks. Complete missing items first.',
      });
      return;
    }

    const nowIso = new Date().toISOString();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: ProductLifecycleStatus.Submitted,
              submittedBy: currentUser.profileId,
              submittedAt: nowIso,
              updatedBy: currentUser.profileId,
              updatedAt: nowIso,
            }
          : item
      )
    );
    appendAudit(
      'product.lifecycle.submit',
      product.brandNameEn,
      `Company submitted ${product.brandNameEn} for administrative review.`
    );
    setBannerNotice({
      tone: 'success',
      message: `"${product.brandNameEn}" is now locked and submitted for Admin Catalog Review.`,
    });
  };

  const handleCompanyWithdrawSubmission = (product: ProductRecord) => {
    const nowIso = new Date().toISOString();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: ProductLifecycleStatus.Draft,
              submittedBy: null,
              submittedAt: null,
              updatedBy: currentUser.profileId,
              updatedAt: nowIso,
            }
          : item
      )
    );
    appendAudit(
      'product.lifecycle.withdraw',
      product.brandNameEn,
      `Company withdrew ${product.brandNameEn} back to draft.`
    );
    setBannerNotice({
      tone: 'info',
      message: `Withdrew "${product.brandNameEn}" back to editable draft status.`,
    });
  };

  // Admin lifecycle transitions
  const handleAdminPublishProduct = (product: ProductRecord) => {
    setAdminActionError(null);
    const readiness = evaluateProductReadiness(product);
    if (!readiness.canSubmitOrPublish) {
      setAdminActionError(
        'Cannot publish: required clinical fields or enforced media/brochure assets are incomplete.'
      );
      return;
    }

    const nowIso = new Date().toISOString();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: ProductLifecycleStatus.Published,
              reviewedBy: currentUser.profileId,
              reviewedAt: nowIso,
              reviewReason: null,
              publishedBy: currentUser.profileId,
              publishedAt: nowIso,
              hiddenBy: null,
              hiddenAt: null,
              hiddenReason: null,
              updatedBy: currentUser.profileId,
              updatedAt: nowIso,
            }
          : item
      )
    );
    appendAudit(
      'product.lifecycle.publish',
      product.brandNameEn,
      `Admin approved and published ${product.brandNameEn} to the official doctor-facing catalog.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Published "${product.brandNameEn}" to the official doctor-facing catalog.`,
    });
  };

  const handleAdminRequestChanges = (product: ProductRecord) => {
    if (!adminActionReason.trim()) {
      setAdminActionError(
        'A mandatory review reason is required when returning a product for changes.'
      );
      return;
    }
    setAdminActionError(null);
    const nowIso = new Date().toISOString();
    const reason = adminActionReason.trim();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: ProductLifecycleStatus.ChangesRequested,
              reviewedBy: currentUser.profileId,
              reviewedAt: nowIso,
              reviewReason: reason,
              updatedBy: currentUser.profileId,
              updatedAt: nowIso,
            }
          : item
      )
    );
    setAdminActionReason('');
    appendAudit(
      'product.lifecycle.request_changes',
      product.brandNameEn,
      `Returned to company with mandatory reason: "${reason}"`
    );
    setBannerNotice({
      tone: 'warning',
      message: `Returned "${product.brandNameEn}" to Tigris Pharma with changes requested.`,
    });
  };

  const handleAdminHideProduct = (product: ProductRecord) => {
    if (!adminActionReason.trim()) {
      setAdminActionError(
        'A mandatory hidden_reason is required when hiding an official catalog product.'
      );
      return;
    }
    setAdminActionError(null);
    const nowIso = new Date().toISOString();
    const reason = adminActionReason.trim();
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: ProductLifecycleStatus.Hidden,
              hiddenBy: currentUser.profileId,
              hiddenAt: nowIso,
              hiddenReason: reason,
              updatedBy: currentUser.profileId,
              updatedAt: nowIso,
            }
          : item
      )
    );
    setAdminActionReason('');
    appendAudit(
      'product.lifecycle.hide',
      product.brandNameEn,
      `Admin hid product from discovery. Reason: "${reason}"`
    );
    setBannerNotice({
      tone: 'warning',
      message: `Hid "${product.brandNameEn}" from doctor discovery.`,
    });
  };

  const generateRandomTempPassword = (prefix = 'Temp') => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}#${code}IQ`;
  };

  // Company Security Settings: change temporary password to custom company password
  const handleCompanyChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedCurrent = activeCompanyWorkspaceRecord.password || 'Temp#2026';
    if (companyCurrentPassword.trim() !== expectedCurrent) {
      setBannerNotice({
        tone: 'error',
        message:
          'Current or temporary password does not match. Please enter the password currently assigned to this company account.',
      });
      return;
    }
    if (companyNewPassword.trim().length < 6) {
      setBannerNotice({
        tone: 'warning',
        message: 'New company password must be at least 6 characters long.',
      });
      return;
    }
    if (companyNewPassword.trim() !== companyConfirmPassword.trim()) {
      setBannerNotice({
        tone: 'error',
        message: 'New password and password confirmation do not match.',
      });
      return;
    }

    const updatedPassword = companyNewPassword.trim();
    const nowIso = new Date().toISOString();
    setCompaniesList((prev) =>
      prev.map((comp) =>
        comp.id === activeCompanyWorkspaceRecord.id
          ? {
              ...comp,
              password: updatedPassword,
              isTemporaryPassword: false,
              passwordUpdatedAt: nowIso,
            }
          : comp
      )
    );
    setCompanyCurrentPassword('');
    setCompanyNewPassword('');
    setCompanyConfirmPassword('');
    appendAudit(
      'company.security.password_update',
      activeCompanyWorkspaceRecord.companyName,
      `Company Admin (${activeCompanyWorkspaceRecord.contactEmail}) replaced the temporary password with a new company password in Security Settings.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Password updated for ${activeCompanyWorkspaceRecord.companyName}. Use your new password next time you sign in from the main Sign In page.`,
    });
  };

  // Admin Search Lists & Paid Home Medications handlers
  const handleAdminAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;
    const assignedTempPassword = newCompanyTempPassword.trim() || 'Temp#2026';
    const assignedEmail =
      newCompanyEmail.trim().toLowerCase() ||
      `admin@${newCompanyName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')}.iq`;
    const created: CompanyRecord = {
      id: `comp-${Date.now()}`,
      companyName: newCompanyName.trim(),
      legalName: newCompanyLegalName.trim() || `${newCompanyName.trim()} Ltd.`,
      description:
        newCompanyDescription.trim() ||
        'Verified pharmaceutical company operating in the Iraq healthcare market.',
      websiteUrl: newCompanyWebsite.trim() || 'https://pharamty.iq',
      contactEmail: assignedEmail,
      contactPhone: newCompanyPhone.trim() || '+964 770 000 0000',
      status: 'verified',
      verifiedAt: new Date().toISOString(),
      password: assignedTempPassword,
      isTemporaryPassword: true,
    };
    setCompaniesList((prev) => [created, ...prev]);
    setNewCompanyName('');
    setNewCompanyLegalName('');
    setNewCompanyDescription('');
    setNewCompanyWebsite('');
    setNewCompanyEmail('');
    setNewCompanyPhone('');
    setNewCompanyTempPassword(generateRandomTempPassword('Temp'));
    appendAudit(
      'taxonomy.company.create',
      created.companyName,
      `Admin added company "${created.companyName}" with login email (${created.contactEmail}) and temporary password.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Added "${created.companyName}" with login email ${created.contactEmail} and temporary password "${assignedTempPassword}".`,
    });
  };

  const handleAdminSaveCompanyEdit = (companyId: string) => {
    if (!editCompanyName.trim()) return;
    setCompaniesList((prev) =>
      prev.map((comp) => {
        if (comp.id !== companyId) return comp;
        const nextTemp = editCompanyTempPassword.trim();
        const passwordChangedByAdmin = Boolean(nextTemp && nextTemp !== comp.password);
        return {
          ...comp,
          companyName: editCompanyName.trim(),
          legalName: editCompanyLegalName.trim() || comp.legalName,
          description: editCompanyDescription.trim() || comp.description,
          websiteUrl: editCompanyWebsite.trim() || comp.websiteUrl,
          contactEmail: editCompanyEmail.trim().toLowerCase() || comp.contactEmail,
          contactPhone: editCompanyPhone.trim() || comp.contactPhone,
          password: nextTemp || comp.password || 'Temp#2026',
          isTemporaryPassword: passwordChangedByAdmin
            ? true
            : comp.isTemporaryPassword ?? true,
        };
      })
    );
    appendAudit(
      'taxonomy.company.update',
      editCompanyName.trim(),
      `Admin updated company login email (${editCompanyEmail.trim()}) and temporary password credentials.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Saved login email & temporary password credentials for "${editCompanyName.trim()}".`,
    });
    setEditingCompanyId(null);
  };

  const handleAdminToggleCompanyVisibility = (comp: CompanyRecord) => {
    const nextStatus = comp.status === 'verified' ? 'archived' : 'verified';
    setCompaniesList((prev) =>
      prev.map((item) =>
        item.id === comp.id ? { ...item, status: nextStatus } : item
      )
    );
    appendAudit(
      'taxonomy.company.visibility',
      comp.companyName,
      `Admin changed search list status to ${nextStatus}.`
    );
  };

  const handleAdminDeleteCompany = (comp: CompanyRecord) => {
    setCompaniesList((prev) => prev.filter((item) => item.id !== comp.id));
    if (selectedCompanyFilterId === comp.id) {
      setSelectedCompanyFilterId('all');
    }
    appendAudit(
      'taxonomy.company.delete',
      comp.companyName,
      `Admin removed "${comp.companyName}" from the Companies search list.`
    );
  };

  const handleAdminAddDrugClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrugClassName.trim()) return;
    const code =
      newDrugClassCode.trim().toUpperCase() ||
      newDrugClassName
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .slice(0, 14);
    const created: TaxonomyItem = {
      id: `dc-${Date.now()}`,
      code,
      nameEn: newDrugClassName.trim(),
      descriptionEn:
        newDrugClassDescription.trim() || 'Official pharmacological drug class.',
      isActive: true,
    };
    setDrugClassesList((prev) => [created, ...prev]);
    setNewDrugClassName('');
    setNewDrugClassCode('');
    setNewDrugClassDescription('');
    appendAudit(
      'taxonomy.drug_class.create',
      created.nameEn,
      `Admin added drug class "${created.nameEn}" to the search list.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Added "${created.nameEn}" to the Drug Classes search list.`,
    });
  };

  const handleAdminSaveDrugClassEdit = (id: string) => {
    if (!editDrugClassName.trim()) return;
    setDrugClassesList((prev) =>
      prev.map((dc) =>
        dc.id === id
          ? {
              ...dc,
              nameEn: editDrugClassName.trim(),
              descriptionEn: editDrugClassDescription.trim() || dc.descriptionEn,
            }
          : dc
      )
    );
    appendAudit(
      'taxonomy.drug_class.update',
      editDrugClassName.trim(),
      `Admin updated drug class in the search list.`
    );
    setEditingDrugClassId(null);
  };

  const handleAdminToggleDrugClassVisibility = (dc: TaxonomyItem) => {
    setDrugClassesList((prev) =>
      prev.map((item) =>
        item.id === dc.id ? { ...item, isActive: !item.isActive } : item
      )
    );
    appendAudit(
      'taxonomy.drug_class.visibility',
      dc.nameEn,
      `Admin ${dc.isActive ? 'hid' : 'enabled'} drug class "${dc.nameEn}" in the search list.`
    );
  };

  const handleAdminDeleteDrugClass = (dc: TaxonomyItem) => {
    setDrugClassesList((prev) => prev.filter((item) => item.id !== dc.id));
    if (selectedDrugClassId === dc.id) {
      setSelectedDrugClassId('all');
    }
    appendAudit(
      'taxonomy.drug_class.delete',
      dc.nameEn,
      `Admin removed "${dc.nameEn}" from the Drug Classes search list.`
    );
  };

  const handleAdminAddSpecialty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpecialtyName.trim()) return;
    const code =
      newSpecialtyCode.trim().toUpperCase() ||
      newSpecialtyName
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .slice(0, 12);
    const created: TaxonomyItem = {
      id: `sp-${Date.now()}`,
      code,
      nameEn: newSpecialtyName.trim(),
      descriptionEn:
        newSpecialtyDescription.trim() || 'Clinical specialty in official catalog.',
      isActive: true,
    };
    setSpecialtiesList((prev) => [created, ...prev]);
    setNewSpecialtyName('');
    setNewSpecialtyCode('');
    setNewSpecialtyDescription('');
    appendAudit(
      'taxonomy.specialty.create',
      created.nameEn,
      `Admin added specialty "${created.nameEn}" to the search list.`
    );
    setBannerNotice({
      tone: 'success',
      message: `Added "${created.nameEn}" to the Specialties search list.`,
    });
  };

  const handleAdminSaveSpecialtyEdit = (id: string) => {
    if (!editSpecialtyName.trim()) return;
    setSpecialtiesList((prev) =>
      prev.map((sp) =>
        sp.id === id
          ? {
              ...sp,
              nameEn: editSpecialtyName.trim(),
              code: editSpecialtyCode.trim().toUpperCase() || sp.code,
            }
          : sp
      )
    );
    appendAudit(
      'taxonomy.specialty.update',
      editSpecialtyName.trim(),
      `Admin updated medical specialty in the search list.`
    );
    setEditingSpecialtyId(null);
  };

  const handleAdminToggleSpecialtyVisibility = (sp: TaxonomyItem) => {
    setSpecialtiesList((prev) =>
      prev.map((item) =>
        item.id === sp.id ? { ...item, isActive: !item.isActive } : item
      )
    );
    appendAudit(
      'taxonomy.specialty.visibility',
      sp.nameEn,
      `Admin ${sp.isActive ? 'hid' : 'enabled'} specialty "${sp.nameEn}" in the search list.`
    );
  };

  const handleAdminDeleteSpecialty = (sp: TaxonomyItem) => {
    setSpecialtiesList((prev) => prev.filter((item) => item.id !== sp.id));
    if (selectedSpecialtyId === sp.id) {
      setSelectedSpecialtyId('all');
    }
    appendAudit(
      'taxonomy.specialty.delete',
      sp.nameEn,
      `Admin removed "${sp.nameEn}" from the Specialties search list.`
    );
  };

  const handleAdminTogglePaidHomeProduct = (product: ProductRecord) => {
    const isCurrentlyPaid = paidHomeProductIds.includes(product.id);
    setPaidHomeProductIds((prev) =>
      isCurrentlyPaid
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
    appendAudit(
      'campaign.paid_home_medication.toggle',
      product.brandNameEn,
      `Admin ${
        isCurrentlyPaid ? 'removed' : 'selected'
      } "${product.brandNameEn}" as a paid home medication linking to ${getCompanyName(
        product.companyId
      )}.`
    );
    setBannerNotice({
      tone: 'info',
      message: isCurrentlyPaid
        ? `Removed "${product.brandNameEn}" from Doctor Home Page paid medications.`
        : `Selected "${product.brandNameEn}" as a Paid Medication on the Doctor Home Page (links to ${getCompanyName(
            product.companyId
          )} page).`,
    });
  };

  const openSignedBrochureViewer = (
    brochure: ProductBrochureRecord,
    productName: string
  ) => {
    const token = `sig_${Math.random().toString(36).slice(2, 10)}_exp300s`;
    setSignedBrochureModal({
      brochure,
      productName,
      signedUrlToken: token,
    });
  };

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Role-Isolated Top Platform Header */}
      <header className="sticky top-0 z-30 bg-[#123F68]/95 backdrop-blur border-b border-[#46718F]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#1769AA] border border-[#5DB4F2]/50 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#F2F5F8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[14px] tracking-tight text-[#F2F5F8]">
                  Pharmaty
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#253F51] border border-[#46718F] text-[#5DB4F2]">
                  Iraq Clinical Catalog
                </span>
              </div>
              <p className="text-[11px] text-[#B8C3CC] leading-tight">
                Iraq Professional Pharmaceutical Information Platform • Official Clinical Monographs
              </p>
            </div>
          </div>

          {/* Role-Isolated Surface Navigation */}
          <nav
            aria-label="Workspace selector"
            className="flex flex-wrap items-center gap-2"
          >
            {activeWorkspace === 'auth' ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-[10px] bg-[#253F51] border border-[#46718F] text-[#5DB4F2] text-[12px] font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unified Clinical Authentication Portal</span>
                </span>
              </div>
            ) : currentUser.role === PlatformRole.HealthcareProfessional ? (
              /* DOCTOR NAVIGATION: Only Doctor Catalog + Profile Badge + Sign Out (No Company or Admin Tabs) */
              <>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctorProductId(null);
                    setSelectedDoctorCompanyId(null);
                    setActiveWorkspace('doctor');
                  }}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'doctor'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Official Catalog</span>
                </button>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#263744] border border-[#51616D]">
                  <span className="text-[12px] font-bold text-[#F2F5F8]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[11px] font-mono text-[#5DB4F2]">
                    ({currentUser.email})
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      currentUser.verificationStatus === 'approved'
                        ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                        : 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                    }`}
                  >
                    {currentUser.verificationStatus === 'approved'
                      ? 'Verified Physician'
                      : 'Pending Verification'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setActiveWorkspace('auth');
                  }}
                  className="px-3 py-1.5 rounded-[10px] bg-[#253F51] hover:bg-[#1769AA] text-[#5DB4F2] hover:text-[#F2F5F8] border border-[#46718F] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Doctor Sign Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthEmail(currentUser.email);
                    setActiveWorkspace('auth');
                  }}
                  className="px-3 py-1.5 rounded-[10px] bg-[#263744] hover:bg-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8] border border-[#51616D] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : currentUser.role === PlatformRole.CompanyUser ? (
              /* COMPANY NAVIGATION: Company Workspace + Catalog Preview + Sign Out */
              <>
                <button
                  type="button"
                  onClick={() => setActiveWorkspace('company')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'company'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{activeCompanyWorkspaceRecord.companyName} Workspace</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWorkspace('doctor')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'doctor'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Catalog Preview</span>
                </button>

                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#263744] border border-[#51616D] text-[11px] font-mono text-[#5DB4F2]">
                  <span>{activeCompanyWorkspaceRecord.contactEmail}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthEmail(activeCompanyWorkspaceRecord.contactEmail);
                    setActiveWorkspace('auth');
                  }}
                  className="px-3 py-1.5 rounded-[10px] bg-[#263744] hover:bg-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8] border border-[#51616D] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              /* ADMIN NAVIGATION: Full Platform Governance + Company Workspace + Doctor Catalog + Readiness + Sign Out */
              <>
                <button
                  type="button"
                  onClick={() => switchRoleAndWorkspace('admin', 'admin')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'admin'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Admin Governance</span>
                  {products.filter((p) => p.status === ProductLifecycleStatus.Submitted)
                    .length +
                    registeredDoctors.filter((d) => d.verificationStatus === 'pending')
                      .length >
                    0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[11px] font-bold">
                      {products.filter(
                        (p) => p.status === ProductLifecycleStatus.Submitted
                      ).length +
                        registeredDoctors.filter(
                          (d) => d.verificationStatus === 'pending'
                        ).length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWorkspace('company')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'company'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company Workspace</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWorkspace('doctor')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'doctor'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Doctor Catalog</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWorkspace('readiness')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                    activeWorkspace === 'readiness'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border-[#5DB4F2]'
                      : 'bg-[#263744] text-[#B8C3CC] border-[#51616D] hover:text-[#F2F5F8]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Launch Readiness (78%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthEmail(DEMO_USERS.admin.email);
                    setActiveWorkspace('auth');
                  }}
                  className="px-3 py-1.5 rounded-[10px] bg-[#263744] hover:bg-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8] border border-[#51616D] text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Admin Member Page Inspection Return Bar */}
      {adminInspectingMember && activeWorkspace !== 'admin' && activeWorkspace !== 'auth' && (
        <div className="bg-[#1769AA] border-b border-[#5DB4F2] px-4 sm:px-6 py-2">
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[12px] font-bold text-[#F2F5F8]">
              <Shield className="w-4 h-4 text-[#F2F5F8]" />
              <span>
                Admin Member Access Mode — Currently Viewing Page for:{' '}
                <strong className="underline">
                  {activeWorkspace === 'company'
                    ? `${activeCompanyWorkspaceRecord.companyName} (${activeCompanyWorkspaceRecord.contactEmail})`
                    : `${currentUser.fullName} (${currentUser.email})`}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdminInspectingMember(false);
                switchRoleAndWorkspace('admin', 'admin');
                setAdminViewMode('access_accounts');
              }}
              className="px-3 py-1 rounded-[8px] bg-[#1F2D38] hover:bg-[#263744] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Members List (Doctors & Companies)</span>
            </button>
          </div>
        </div>
      )}

      {/* Optional Notification Banner */}
      {bannerNotice && (
        <div className="max-w-[1120px] w-full mx-auto px-4 sm:px-6 pt-4">
          <div
            className={`p-3.5 rounded-[12px] border flex items-center justify-between gap-3 ${
              bannerNotice.tone === 'success'
                ? 'bg-[#193D2D] border-[#2F8F5C] text-[#38C976]'
                : bannerNotice.tone === 'warning'
                ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                : bannerNotice.tone === 'error'
                ? 'bg-[#4B2528] border-[#A9474E] text-[#FF7272]'
                : 'bg-[#253F51] border-[#46718F] text-[#5DB4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-[13px] font-medium">
              <Info className="w-4 h-4 shrink-0" />
              <span>{bannerNotice.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerNotice(null)}
              className="p-1 rounded hover:bg-black/20 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6 py-6">
        {/* ===================================================================
            1. DOCTOR OFFICIAL CATALOG WORKSPACE
        =================================================================== */}
        {activeWorkspace === 'doctor' && (
          <div>
            {/* Access Gate Check if Pending HCP */}
            {currentUser.verificationStatus !== 'approved' &&
            currentUser.role === PlatformRole.HealthcareProfessional ? (
              <div className="bg-[#263744] border border-[#A56F0B] rounded-[16px] p-8 max-w-xl mx-auto my-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#4A3B1C] border border-[#A56F0B] flex items-center justify-center mx-auto">
                  <ShieldAlert className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h1 className="text-[22px] font-extrabold text-[#F2F5F8]">
                  Physician Verification Pending
                </h1>
                <p className="text-[14px] text-[#B8C3CC] leading-relaxed">
                  Welcome, <strong className="text-[#F2F5F8]">{currentUser.fullName}</strong> (
                  <code className="text-[#5DB4F2]">{currentUser.email}</code>). Your Iraq
                  Medical Association credential is currently queued for Platform Administrator
                  verification. Only approved physicians can browse official pharmaceutical
                  monographs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signin');
                      setAuthEmail(DEMO_USERS.doctor.email);
                      setActiveWorkspace('auth');
                    }}
                    className="px-4 py-2.5 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[13px] font-bold transition cursor-pointer"
                  >
                    Return to Sign In Portal
                  </button>
                </div>
              </div>
            ) : selectedDoctorProduct ? (
              /* DOCTOR PRODUCT DETAIL VIEW (`DoctorCatalogProductDetailPage`) */
              <div className="space-y-6">
                {/* Detail Top Bar */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctorProductId(null)}
                      className="w-10 h-10 rounded-[10px] bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] flex items-center justify-center text-[#F2F5F8] transition cursor-pointer"
                      title="Back to official catalog"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-[20px] font-bold text-[#F2F5F8]">
                        Official product detail
                      </h1>
                      <p className="text-[13px] text-[#B8C3CC]">
                        Published catalog information
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => toggleFavoriteProduct(selectedDoctorProduct.id, e)}
                      className={`px-3.5 py-1.5 rounded-full border text-[12px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        favoriteProductIds.includes(selectedDoctorProduct.id)
                          ? 'bg-[#253F51] border-[#5DB4F2] text-[#5DB4F2]'
                          : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>
                        {favoriteProductIds.includes(selectedDoctorProduct.id)
                          ? 'Saved in Physician Favorites'
                          : 'Save to Favorites'}
                      </span>
                    </button>

                    <div className="px-3 py-1.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#38C976]" />
                      <span className="text-[12px] font-bold text-[#38C976]">
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Detail Hero */}
                <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold mb-4">
                    Published
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-[28px] font-extrabold text-[#F2F5F8] tracking-tight">
                      {selectedDoctorProduct.brandNameEn}
                    </h2>
                  </div>
                  <p className="text-[20px] font-bold text-[#5DB4F2] mt-1">
                    {DEMO_GENERIC_DRUGS.find(
                      (g) => g.id === selectedDoctorProduct.genericDrugId
                    )?.nameEn ?? 'Generic name not recorded'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        const companyId = selectedDoctorProduct.companyId;
                        setSelectedDoctorProductId(null);
                        setSelectedDoctorCompanyId(companyId);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#304451] hover:bg-[#3A5262] border border-[#5DB4F2] flex items-center gap-2 text-[12px] font-semibold text-[#F2F5F8] transition cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-[#5DB4F2]" />
                      <span>{getCompanyName(selectedDoctorProduct.companyId)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5DB4F2]" />
                    </button>
                    <div className="px-3 py-1.5 rounded-full bg-[#304451] border border-[#51616D] flex items-center gap-2 text-[12px] font-semibold text-[#F2F5F8]">
                      <Pill className="w-4 h-4 text-[#5DB4F2]" />
                      <span>{readableEnum(selectedDoctorProduct.category)}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#304451] border border-[#51616D] flex items-center gap-2 text-[12px] font-semibold text-[#F2F5F8]">
                      <Clock className="w-4 h-4 text-[#5DB4F2]" />
                      <span>
                        Updated {formatShortDate(selectedDoctorProduct.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Detail Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Product basics */}
                  <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#123F68] flex items-center justify-center">
                        <Pill className="w-5 h-5 text-[#5DB4F2]" />
                      </div>
                      <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                        Product basics
                      </h3>
                    </div>
                    <div className="divide-y divide-[#51616D]/60 space-y-3">
                      <div className="pt-1">
                        <div className="text-[12px] text-[#B8C3CC]">Dosage form</div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {selectedDoctorProduct.iraqMarket.dosageForm}
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">Strength</div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {selectedDoctorProduct.iraqMarket.strength}
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">Route</div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {selectedDoctorProduct.iraqMarket.route}
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">Presentation</div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {selectedDoctorProduct.iraqMarket.packSize}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Iraq registration */}
                  <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#123F68] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#5DB4F2]" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                          Iraq registration
                        </h3>
                        <p className="text-[11px] text-[#5DB4F2]">
                          Catalog market presence only • Not stock or commercial availability
                        </p>
                      </div>
                    </div>
                    <div className="divide-y divide-[#51616D]/60 space-y-3">
                      <div className="pt-1">
                        <div className="text-[12px] text-[#B8C3CC]">
                          Registration status
                        </div>
                        <div className="text-[14px] text-[#38C976] font-semibold mt-0.5">
                          {readableEnum(
                            selectedDoctorProduct.iraqMarket.registrationStatus
                          )}{' '}
                          • Marketed in Iraq
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">
                          Registration number
                        </div>
                        <div className="text-[14px] text-[#F2F5F8] font-mono mt-0.5">
                          {selectedDoctorProduct.iraqMarket.registrationNumber}
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">
                          Registration authority
                        </div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {selectedDoctorProduct.iraqMarket.registrationAuthority}
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-[12px] text-[#B8C3CC]">
                          Registration expiry
                        </div>
                        <div className="text-[14px] text-[#F2F5F8] font-medium mt-0.5">
                          {formatShortDate(
                            selectedDoctorProduct.iraqMarket.registrationExpiresOn
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinical information */}
                  <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-5 md:col-span-2">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-[#123F68] flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-[#5DB4F2]" />
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                            Clinical information
                          </h3>
                          <p className="text-[12px] text-[#5DB4F2]">
                            Official catalog information
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#304451] border border-[#51616D] text-[#B8C3CC]">
                        For Approved Healthcare Professionals
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3.5">
                        <div className="text-[12px] font-semibold text-[#5DB4F2]">
                          Indications
                        </div>
                        <p className="text-[13px] text-[#F2F5F8] leading-relaxed mt-1">
                          {selectedDoctorProduct.iraqMarket.approvedIndicationsEn}
                        </p>
                      </div>
                      <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3.5">
                        <div className="text-[12px] font-semibold text-[#5DB4F2]">
                          Dosing notes
                        </div>
                        <p className="text-[13px] text-[#F2F5F8] leading-relaxed mt-1">
                          {selectedDoctorProduct.iraqMarket.usualAdultDoseEn}
                        </p>
                      </div>
                      <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3.5">
                        <div className="text-[12px] font-semibold text-[#F59E0B]">
                          Contraindications
                        </div>
                        <p className="text-[13px] text-[#F2F5F8] leading-relaxed mt-1">
                          {selectedDoctorProduct.iraqMarket.contraindicationsEn}
                        </p>
                      </div>
                      <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3.5">
                        <div className="text-[12px] font-semibold text-[#FF7272]">
                          Warnings and adverse effects
                        </div>
                        <p className="text-[13px] text-[#F2F5F8] leading-relaxed mt-1">
                          {selectedDoctorProduct.iraqMarket.commonAdverseEffectsEn}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#51616D]/60 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#B8C3CC]">
                      <span>
                        <strong className="text-[#F2F5F8]">Storage conditions:</strong>{' '}
                        {selectedDoctorProduct.iraqMarket.storageConditionsEn}
                      </span>
                      <span className="text-[11px]">
                        Medical disclaimer: Informational reference for licensed physicians
                        only; verify full approved prescribing labeling.
                      </span>
                    </div>
                  </div>

                  {/* Private Storage Media & Authorized Brochures */}
                  <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-5 md:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-[#123F68] flex items-center justify-center">
                          <FolderLock className="w-5 h-5 text-[#5DB4F2]" />
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                            Official Catalog Media & Monographic Brochures
                          </h3>
                          <p className="text-[12px] text-[#B8C3CC]">
                            Served via private Supabase Storage buckets (
                            <code className="text-[#5DB4F2]">catalog-product-media</code> &{' '}
                            <code className="text-[#5DB4F2]">catalog-brochures</code>) with
                            RLS read verification
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      {selectedDoctorProduct.media.map((media) => (
                        <div
                          key={media.id}
                          className="bg-[#304451] border border-[#51616D] rounded-[10px] overflow-hidden"
                        >
                          <img
                            src={media.previewDataUrl}
                            alt={media.fileName}
                            className="w-full h-44 object-cover border-b border-[#51616D]"
                          />
                          <div className="p-3 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-[12px] font-bold text-[#F2F5F8]">
                                {readableEnum(media.mediaType)}
                              </div>
                              <div className="text-[11px] text-[#B8C3CC] font-mono truncate max-w-[260px]">
                                {media.storagePath}
                              </div>
                            </div>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] font-semibold">
                              {formatBytes(media.fileSizeBytes)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      {selectedDoctorProduct.brochures
                        .filter((b) => b.isCurrent)
                        .map((brochure) => (
                          <div
                            key={brochure.id}
                            className="bg-[#304451] border border-[#51616D] rounded-[10px] p-3.5 flex flex-wrap items-center justify-between gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-[#5DB4F2] mt-0.5 shrink-0" />
                              <div>
                                <div className="text-[14px] font-bold text-[#F2F5F8]">
                                  {brochure.title}
                                </div>
                                <div className="text-[11px] text-[#B8C3CC] font-mono mt-0.5">
                                  Bucket: {brochure.bucketId} • Path: {brochure.storagePath}{' '}
                                  • v{brochure.version} ({formatBytes(brochure.fileSizeBytes)})
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                openSignedBrochureViewer(
                                  brochure,
                                  selectedDoctorProduct.brandNameEn
                                )
                              }
                              className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>Issue Signed PDF URL</span>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedDoctorCompany ? (
              /* DOCTOR COMPANY PAGE VIEW (Opened when pressing a paid medication on the Doctor Home Page) */
              <div className="space-y-6">
                {/* Company Page Top Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctorCompanyId(null)}
                      className="w-10 h-10 rounded-[10px] bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] flex items-center justify-center text-[#F2F5F8] transition cursor-pointer"
                      title="Back to Doctor Home Page"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-[20px] font-bold text-[#F2F5F8]">
                        Company Page
                      </h1>
                      <p className="text-[13px] text-[#B8C3CC]">
                        Verified Pharmaceutical Manufacturer Profile & Published Portfolio
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavoriteCompany(selectedDoctorCompany.id)}
                    className={`px-3.5 py-1.5 rounded-[10px] border text-[12px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      favoriteCompanyIds.includes(selectedDoctorCompany.id)
                        ? 'bg-[#253F51] border-[#5DB4F2] text-[#5DB4F2]'
                        : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>
                      {favoriteCompanyIds.includes(selectedDoctorCompany.id)
                        ? 'Saved in Favorite Companies'
                        : 'Save Company'}
                    </span>
                  </button>
                </div>

                {/* Company Profile Header Card */}
                <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-[12px] bg-[#123F68] border border-[#5DB4F2]/60 flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-[#5DB4F2]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-[26px] font-extrabold text-[#F2F5F8] tracking-tight">
                            {selectedDoctorCompany.companyName}
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
                            Verified in Iraq
                          </span>
                        </div>
                        <p className="text-[14px] font-semibold text-[#5DB4F2] mt-0.5">
                          {selectedDoctorCompany.legalName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] text-[#F2F5F8] leading-relaxed">
                    {selectedDoctorCompany.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#51616D]/60 text-[12px]">
                    <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                      <div className="text-[#B8C3CC]">Official Website</div>
                      <div className="text-[#5DB4F2] font-semibold truncate mt-0.5">
                        {selectedDoctorCompany.websiteUrl}
                      </div>
                    </div>
                    <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                      <div className="text-[#B8C3CC]">Medical Information Email</div>
                      <div className="text-[#F2F5F8] font-semibold truncate mt-0.5">
                        {selectedDoctorCompany.contactEmail}
                      </div>
                    </div>
                    <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                      <div className="text-[#B8C3CC]">Iraq Scientific Office Phone</div>
                      <div className="text-[#F2F5F8] font-semibold truncate mt-0.5">
                        {selectedDoctorCompany.contactPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Published Products of this Company */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#F2F5F8]">
                      Published Medications by {selectedDoctorCompany.companyName}
                    </h3>
                  </div>

                  {publishedOfficialProducts.filter(
                    (p) => p.companyId === selectedDoctorCompany.id
                  ).length === 0 ? (
                    <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-6 text-center text-[13px] text-[#B8C3CC]">
                      No published catalog products are currently listed under{' '}
                      <strong className="text-[#F2F5F8]">
                        {selectedDoctorCompany.companyName}
                      </strong>
                      .
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {publishedOfficialProducts
                        .filter((p) => p.companyId === selectedDoctorCompany.id)
                        .map((product) => {
                          const generic = DEMO_GENERIC_DRUGS.find(
                            (g) => g.id === product.genericDrugId
                          );
                          const drugClass = drugClassesList.find(
                            (c) => c.id === product.drugClassId
                          );
                          return (
                            <div
                              key={product.id}
                              onClick={() => setSelectedDoctorProductId(product.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedDoctorProductId(product.id);
                                }
                              }}
                              className="bg-[#263744] hover:bg-[#304451]/70 border border-[#51616D] hover:border-[#5DB4F2] rounded-[12px] p-5 flex flex-col justify-between transition cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
                                    Published
                                  </span>
                                  <span className="text-[11px] text-[#5DB4F2] font-semibold">
                                    View Clinical Detail →
                                  </span>
                                </div>
                                <h4 className="text-[19px] font-bold text-[#F2F5F8] mt-2.5">
                                  {product.brandNameEn}
                                </h4>
                                <p className="text-[14px] font-semibold text-[#5DB4F2] mt-0.5">
                                  {generic?.nameEn ?? 'Generic name not recorded'}
                                </p>
                                <p className="text-[13px] text-[#B8C3CC] mt-2">
                                  {product.iraqMarket.strength} /{' '}
                                  {product.iraqMarket.dosageForm}
                                </p>
                              </div>
                              <div className="pt-3 mt-3 border-t border-[#51616D]/50 text-[11px] text-[#B8C3CC]">
                                {drugClass?.nameEn ?? 'Official Catalog'}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* DOCTOR CATALOG HOME VIEW (`DoctorCatalogHomePage`) */
              <div className="space-y-5">
                {/* Streamlined _CatalogSearchPanel with Single Search Mode Button & Search Bar */}
                <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h1 className="text-[22px] sm:text-[24px] font-extrabold text-[#F2F5F8] tracking-tight">
                        Official Medicine Catalog
                      </h1>
                      <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                        Select your search type, then use the search bar.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOnlyFavorites((prev) => !prev)}
                        className={`px-3 py-1.5 rounded-[10px] border text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                          onlyFavorites
                            ? 'bg-[#253F51] border-[#5DB4F2] text-[#5DB4F2]'
                            : 'bg-[#304451] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </button>
                    </div>
                  </div>

                  {/* Single Search Row: [Choose Search Type Button] + [Search Bar with Embedded Small Subclass Rolling Button] */}
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    {/* Left Button: opens the search mode choices when pressed */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchModePickerOpen((prev) => !prev);
                          setIsBrowseListOpen(false);
                        }}
                        aria-expanded={isSearchModePickerOpen}
                        aria-label="Choose search type"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[13px] font-bold flex items-center justify-between sm:justify-start gap-2 transition cursor-pointer whitespace-nowrap"
                      >
                        <Filter className="w-4 h-4 shrink-0" />
                        <span>
                          {doctorSearchMode === 'company'
                            ? 'Search by: Company'
                            : doctorSearchMode === 'drug_class'
                            ? 'Search by: Drug Class'
                            : doctorSearchMode === 'specialty'
                            ? 'Search by: Specialty'
                            : 'Search by: Drug Name'}
                        </span>
                      </button>

                      {/* Dropdown menu revealed only when the button is pressed */}
                      {isSearchModePickerOpen && (
                        <div className="absolute left-0 mt-2 w-56 rounded-[12px] bg-[#1F2D38] border border-[#5DB4F2] shadow-xl z-20 p-1.5 space-y-1">
                          {(
                            [
                              {
                                mode: 'all',
                                label: 'By Drug / Generic Name',
                                icon: Search,
                              },
                              {
                                mode: 'company',
                                label: 'By Company',
                                icon: Building2,
                              },
                              {
                                mode: 'drug_class',
                                label: 'By Drug Class',
                                icon: Pill,
                              },
                              {
                                mode: 'specialty',
                                label: 'By Specialty',
                                icon: Stethoscope,
                              },
                            ] as const
                          ).map((item) => {
                            const IconComponent = item.icon;
                            const isSelected = doctorSearchMode === item.mode;
                            return (
                              <button
                                key={item.mode}
                                type="button"
                                onClick={() => {
                                  setDoctorSearchMode(item.mode);
                                  setIsSearchModePickerOpen(false);
                                  setIsBrowseListOpen(false);
                                  setSearchQuery('');
                                  setSelectedCompanyFilterId('all');
                                  setSelectedDrugClassId('all');
                                  setSelectedGenericDrugId('all');
                                  setSelectedSpecialtyId('all');
                                }}
                                className={`w-full px-3 py-2 rounded-[8px] text-[13px] font-semibold flex items-center gap-2.5 text-left transition cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#1769AA] text-[#F2F5F8]'
                                    : 'text-[#B8C3CC] hover:bg-[#304451] hover:text-[#F2F5F8]'
                                }`}
                              >
                                <IconComponent className="w-4 h-4 shrink-0" />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Single Unified Search Bar with Embedded Small Rolling Subclass Button on Right */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#B8C3CC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedCompanyFilterId('all');
                          setSelectedDrugClassId('all');
                          setSelectedGenericDrugId('all');
                          setSelectedSpecialtyId('all');
                        }}
                        onFocus={() => {
                          setIsSearchModePickerOpen(false);
                          setIsBrowseListOpen(false);
                        }}
                        placeholder={
                          doctorSearchMode === 'company'
                            ? 'Search by medical company in Iraq...'
                            : doctorSearchMode === 'drug_class'
                            ? 'Search by drug class...'
                            : doctorSearchMode === 'specialty'
                            ? 'Search by medical specialty...'
                            : 'Search by brand name or generic drug...'
                        }
                        aria-label="Search the official catalog"
                        className={`w-full pl-10 ${
                          doctorSearchMode !== 'all' ? 'pr-36' : 'pr-10'
                        } py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[14px] text-[#F2F5F8] placeholder-[#84919B]`}
                      />

                      {/* Right-side controls embedded inside the search bar */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        {searchQuery.trim().length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setSelectedCompanyFilterId('all');
                              setSelectedDrugClassId('all');
                              setSelectedGenericDrugId('all');
                              setSelectedSpecialtyId('all');
                            }}
                            aria-label="Clear catalog search"
                            className="p-1 text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Small rolling subclass button inside the search bar (only after choosing Company, Drug Class, or Specialty) */}
                        {doctorSearchMode !== 'all' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsSearchModePickerOpen(false);
                              setIsBrowseListOpen((prev) => !prev);
                            }}
                            aria-expanded={isBrowseListOpen}
                            title="View subclasses list"
                            className={`px-2.5 py-1 rounded-[7px] border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
                              isBrowseListOpen
                                ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                                : 'bg-[#263744] hover:bg-[#304451] border-[#51616D] text-[#5DB4F2]'
                            }`}
                          >
                            <span>
                              {doctorSearchMode === 'company'
                                ? 'Companies'
                                : doctorSearchMode === 'drug_class'
                                ? 'Classes'
                                : 'Specialties'}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isBrowseListOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Secondary small rolling (scrollable) dropdown list anchored to the right side of the search bar */}
                      {isBrowseListOpen && doctorSearchMode !== 'all' && (
                        <div className="absolute right-0 mt-1.5 w-72 max-h-64 overflow-y-auto rounded-[10px] bg-[#1F2D38] border border-[#5DB4F2] shadow-xl z-20 p-1.5 space-y-0.5">
                          {doctorSearchMode === 'company' &&
                            activeCompaniesList.map((comp) => {
                              const pubCount = publishedOfficialProducts.filter(
                                (p) => p.companyId === comp.id
                              ).length;
                              return (
                                <button
                                  key={comp.id}
                                  type="button"
                                  onClick={() => {
                                    setIsBrowseListOpen(false);
                                    setSelectedDoctorCompanyId(comp.id);
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-[7px] text-left transition cursor-pointer flex items-center justify-between gap-2 text-[#F2F5F8] hover:bg-[#304451]"
                                >
                                  <span className="text-[12px] font-semibold truncate">
                                    {comp.companyName}
                                  </span>
                                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#263744] border border-[#51616D] text-[#5DB4F2] font-mono shrink-0">
                                    {pubCount} drugs →
                                  </span>
                                </button>
                              );
                            })}

                          {doctorSearchMode === 'drug_class' &&
                            activeDrugClassesList.map((dc) => {
                              const isSelected = selectedDrugClassId === dc.id;
                              const pubCount = publishedOfficialProducts.filter(
                                (p) => p.drugClassId === dc.id
                              ).length;
                              return (
                                <button
                                  key={dc.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDrugClassId(dc.id);
                                    setSearchQuery(dc.nameEn);
                                    setIsBrowseListOpen(false);
                                  }}
                                  className={`w-full px-2.5 py-1.5 rounded-[7px] text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                                    isSelected
                                      ? 'bg-[#1769AA] text-[#F2F5F8]'
                                      : 'text-[#F2F5F8] hover:bg-[#304451]'
                                  }`}
                                >
                                  <span className="text-[12px] font-semibold truncate">
                                    {dc.nameEn}
                                  </span>
                                  <span
                                    className={`text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                                      pubCount > 0
                                        ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                        : 'bg-[#263744] text-[#B8C3CC]'
                                    }`}
                                  >
                                    {pubCount}
                                  </span>
                                </button>
                              );
                            })}

                          {doctorSearchMode === 'specialty' &&
                            activeSpecialtiesList.map((sp) => {
                              const isSelected = selectedSpecialtyId === sp.id;
                              const pubCount = publishedOfficialProducts.filter((p) =>
                                p.specialtyIds.includes(sp.id)
                              ).length;
                              return (
                                <button
                                  key={sp.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSpecialtyId(sp.id);
                                    setSearchQuery(sp.nameEn);
                                    setIsBrowseListOpen(false);
                                  }}
                                  className={`w-full px-2.5 py-1.5 rounded-[7px] text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                                    isSelected
                                      ? 'bg-[#1769AA] text-[#F2F5F8]'
                                      : 'text-[#F2F5F8] hover:bg-[#304451]'
                                  }`}
                                >
                                  <span className="text-[12px] font-semibold truncate">
                                    {sp.nameEn}
                                  </span>
                                  <span
                                    className={`text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                                      pubCount > 0
                                        ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                        : 'bg-[#263744] text-[#B8C3CC]'
                                    }`}
                                  >
                                    {pubCount}
                                  </span>
                                </button>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* DEFAULT HOME VIEW (Before Search): Show ONLY Admin-Selected Paid Medications (Clicking opens Company Page) */}
                {!isDoctorSearchActive ? (
                  <div>
                    {paidHomeProducts.length === 0 ? (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-8 text-center">
                        <p className="text-[13px] text-[#B8C3CC]">
                          No medications are currently selected by the Admin. Use the
                          search bar above to search the catalog.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paidHomeProducts.map((product) => {
                          const generic = DEMO_GENERIC_DRUGS.find(
                            (g) => g.id === product.genericDrugId
                          );
                          const drugClass = drugClassesList.find(
                            (c) => c.id === product.drugClassId
                          );
                          const companyName = getCompanyName(product.companyId);
                          const isFav = favoriteProductIds.includes(product.id);
                          return (
                            <div
                              key={product.id}
                              onClick={() =>
                                setSelectedDoctorCompanyId(product.companyId)
                              }
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedDoctorCompanyId(product.companyId);
                                }
                              }}
                              className="h-[220px] bg-[#263744] hover:bg-[#304451]/70 border border-[#51616D] hover:border-[#5DB4F2] rounded-[12px] p-5 flex flex-col justify-between transition cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
                                    Published
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => toggleFavoriteProduct(product.id, e)}
                                    title={
                                      isFav
                                        ? 'Remove from favorites'
                                        : 'Save to favorites'
                                    }
                                    className={`p-1 rounded border transition cursor-pointer ${
                                      isFav
                                        ? 'bg-[#253F51] border-[#5DB4F2] text-[#5DB4F2]'
                                        : 'bg-[#304451] border-[#51616D] text-[#B8C3CC]'
                                    }`}
                                  >
                                    <Bookmark className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <h3 className="text-[20px] font-bold text-[#F2F5F8] mt-2.5 truncate">
                                  {product.brandNameEn}
                                </h3>
                                <p className="text-[14px] font-semibold text-[#5DB4F2] mt-0.5 truncate">
                                  {generic?.nameEn ?? 'Generic name not recorded'}
                                </p>

                                <div className="mt-3 space-y-1.5 text-[13px] text-[#B8C3CC]">
                                  <div className="flex items-center gap-2 truncate">
                                    <Building2 className="w-4 h-4 text-[#B8C3CC] shrink-0" />
                                    <span className="truncate">
                                      {companyName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 truncate">
                                    <Pill className="w-4 h-4 text-[#B8C3CC] shrink-0" />
                                    <span className="truncate">
                                      {product.iraqMarket.strength} /{' '}
                                      {product.iraqMarket.dosageForm}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-[#51616D]/50">
                                <span className="text-[11px] text-[#B8C3CC] truncate">
                                  {drugClass?.nameEn ?? 'Official Catalog'}
                                </span>
                                <ArrowRight className="w-4 h-4 text-[#5DB4F2] shrink-0" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ACTIVE SEARCH & TAXONOMY DISCOVERY VIEW */
                  <div className="space-y-5">
                    {/* MODE 1: SEARCH BY COMPANY — Direct Company Pages Directory */}
                    {doctorSearchMode === 'company' && (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h2 className="text-[18px] font-bold text-[#F2F5F8] flex items-center gap-2">
                              <Building2 className="w-5 h-5 text-[#5DB4F2]" />
                              <span>Verified Pharmaceutical Company Pages</span>
                            </h2>
                            <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                              Select any company below to open its official Company Page
                              and browse its published Iraq portfolio.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDoctorSearchMode('all');
                              setSearchQuery('');
                              setSelectedCompanyFilterId('all');
                            }}
                            className="px-3 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                          >
                            Back to Home
                          </button>
                        </div>

                        {matchingDoctorCompanies.length === 0 ? (
                          <div className="p-6 text-center text-[13px] text-[#B8C3CC] bg-[#1F2D38] border border-[#51616D] rounded-[12px]">
                            No verified companies match &ldquo;{searchQuery.trim()}&rdquo;.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {matchingDoctorCompanies.map((comp) => {
                              const compProductsCount = publishedOfficialProducts.filter(
                                (p) => p.companyId === comp.id
                              ).length;
                              return (
                                <div
                                  key={comp.id}
                                  onClick={() => setSelectedDoctorCompanyId(comp.id)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setSelectedDoctorCompanyId(comp.id);
                                    }
                                  }}
                                  className="p-4 rounded-[12px] bg-[#1F2D38] hover:bg-[#304451] border border-[#51616D] hover:border-[#5DB4F2] flex items-center justify-between gap-3 transition cursor-pointer"
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[16px] font-bold text-[#F2F5F8] truncate">
                                        <HighlightMatch
                                          text={comp.companyName}
                                          query={searchQuery}
                                        />
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold shrink-0">
                                        {compProductsCount} Published
                                      </span>
                                    </div>
                                    <p className="text-[12px] text-[#5DB4F2] truncate mt-0.5">
                                      {comp.legalName}
                                    </p>
                                    <p className="text-[12px] text-[#B8C3CC] truncate mt-1">
                                      {comp.description}
                                    </p>
                                  </div>
                                  <div className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1 shrink-0">
                                    <span>Company Page</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Matching Company Pages Quick Bar when searching in 'all' mode */}
                    {doctorSearchMode === 'all' &&
                      searchQuery.trim().length > 0 &&
                      matchingDoctorCompanies.length > 0 && (
                        <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-4 space-y-2.5">
                          <div className="text-[12px] font-bold text-[#5DB4F2] flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>Matching Pharmaceutical Company Pages</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {matchingDoctorCompanies.map((comp) => {
                              const count = publishedOfficialProducts.filter(
                                (p) => p.companyId === comp.id
                              ).length;
                              return (
                                <button
                                  key={comp.id}
                                  type="button"
                                  onClick={() => setSelectedDoctorCompanyId(comp.id)}
                                  className="px-3.5 py-2 rounded-[10px] bg-[#1F2D38] hover:bg-[#304451] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-2 transition cursor-pointer"
                                >
                                  <Building2 className="w-3.5 h-3.5 text-[#5DB4F2]" />
                                  <span>{comp.companyName}</span>
                                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#193D2D] text-[#38C976] font-mono">
                                    {count} products
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#5DB4F2]" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* MODE 2: SEARCH BY DRUG CLASS — Compact Active Drug Class Summary Bar */}
                    {doctorSearchMode === 'drug_class' && (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[12px] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-[#5DB4F2] uppercase flex items-center gap-1.5">
                            <Pill className="w-3.5 h-3.5" />
                            <span>
                              {selectedDrugClassId !== 'all'
                                ? 'Selected Drug Class — Cross-Company Catalog'
                                : 'Drug Class Filter Mode — Select a class from the dropdown list or type above'}
                            </span>
                          </div>
                          {selectedDrugClassId !== 'all' && (
                            <div className="text-[15px] font-bold text-[#F2F5F8] mt-0.5 truncate">
                              {
                                drugClassesList.find((c) => c.id === selectedDrugClassId)
                                  ?.nameEn
                              }{' '}
                              <span className="text-[12px] font-semibold text-[#38C976]">
                                ({filteredDoctorProducts.length} Medications)
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {selectedDrugClassId !== 'all' && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDrugClassId('all');
                                setSearchQuery('');
                              }}
                              className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] text-[#F2F5F8] text-[12px] font-bold cursor-pointer"
                            >
                              Show All Classes
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setDoctorSearchMode('all');
                              setSelectedDrugClassId('all');
                              setSearchQuery('');
                            }}
                            className="px-3 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                          >
                            Back to Home
                          </button>
                        </div>
                      </div>
                    )}

                    {/* MODE 3: SEARCH BY SPECIALTY — Quick Specialty Selector */}
                    {doctorSearchMode === 'specialty' && (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h2 className="text-[18px] font-bold text-[#F2F5F8] flex items-center gap-2">
                              <Stethoscope className="w-5 h-5 text-[#5DB4F2]" />
                              <span>Medical Specialties (Cross-Company Catalog)</span>
                            </h2>
                            <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                              Select a clinical specialty to view all published drugs
                              indicated for that specialty across all companies.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDoctorSearchMode('all');
                              setSelectedSpecialtyId('all');
                              setSearchQuery('');
                            }}
                            className="px-3 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                          >
                            Back to Home
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                          {activeSpecialtiesList.map((sp) => {
                            const count = publishedOfficialProducts.filter((p) =>
                              p.specialtyIds.includes(sp.id)
                            ).length;
                            const isSelected = selectedSpecialtyId === sp.id;
                            return (
                              <button
                                key={sp.id}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedSpecialtyId('all');
                                    setSearchQuery('');
                                  } else {
                                    setSelectedSpecialtyId(sp.id);
                                    setSearchQuery(sp.nameEn);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-[10px] border text-[12px] font-semibold flex items-center gap-2 transition cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                                    : count > 0
                                    ? 'bg-[#1F2D38] hover:bg-[#304451] border-[#51616D] text-[#F2F5F8]'
                                    : 'bg-[#1F2D38]/60 border-[#51616D]/60 text-[#B8C3CC]'
                                }`}
                              >
                                <span>{sp.nameEn}</span>
                                <span
                                  className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                                    isSelected
                                      ? 'bg-[#123F68] text-[#F2F5F8]'
                                      : count > 0
                                      ? 'bg-[#193D2D] text-[#38C976]'
                                      : 'bg-[#263744] text-[#B8C3CC]'
                                  }`}
                                >
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PUBLISHED MEDICATIONS RESULTS GRID (shown for Drug Name, Drug Class, Specialty, or filtered Company) */}
                    {doctorSearchMode !== 'company' &&
                      (filteredDoctorProducts.length === 0 ? (
                        <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-8 text-center">
                          <AlertTriangle className="w-7 h-7 text-[#F59E0B] mx-auto mb-3" />
                          <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                            No catalog matches found
                          </h3>
                          <p className="text-[13px] text-[#B8C3CC] mt-1">
                            {searchQuery.trim()
                              ? `No published products match "${searchQuery.trim()}".`
                              : 'No published products match the selected company, specialty, or drug class filters.'}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredDoctorProducts.map((product) => {
                            const generic = DEMO_GENERIC_DRUGS.find(
                              (g) => g.id === product.genericDrugId
                            );
                            const drugClass = drugClassesList.find(
                              (c) => c.id === product.drugClassId
                            );
                            const companyName = getCompanyName(product.companyId);
                            const isFav = favoriteProductIds.includes(product.id);
                            return (
                              <div
                                key={product.id}
                                onClick={() => setSelectedDoctorProductId(product.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedDoctorProductId(product.id);
                                  }
                                }}
                                className="h-[220px] bg-[#263744] hover:bg-[#304451]/70 border border-[#51616D] hover:border-[#5DB4F2] rounded-[12px] p-5 flex flex-col justify-between transition cursor-pointer"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
                                      Published
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        toggleFavoriteProduct(product.id, e)
                                      }
                                      title={
                                        isFav
                                          ? 'Remove from favorites'
                                          : 'Save to favorites'
                                      }
                                      className={`p-1 rounded border transition cursor-pointer ${
                                        isFav
                                          ? 'bg-[#253F51] border-[#5DB4F2] text-[#5DB4F2]'
                                          : 'bg-[#304451] border-[#51616D] text-[#B8C3CC]'
                                      }`}
                                    >
                                      <Bookmark className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <h3 className="text-[20px] font-bold text-[#F2F5F8] mt-2.5 truncate">
                                    <HighlightMatch
                                      text={product.brandNameEn}
                                      query={searchQuery}
                                    />
                                  </h3>
                                  <p className="text-[14px] font-semibold text-[#5DB4F2] mt-0.5 truncate">
                                    <HighlightMatch
                                      text={
                                        generic?.nameEn ?? 'Generic name not recorded'
                                      }
                                      query={searchQuery}
                                    />
                                  </p>

                                  <div className="mt-3 space-y-1.5 text-[13px] text-[#B8C3CC]">
                                    <div className="flex items-center justify-between gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedDoctorCompanyId(product.companyId);
                                        }}
                                        className="flex items-center gap-1.5 text-[#5DB4F2] hover:underline truncate cursor-pointer"
                                        title={`Open ${companyName} Company Page`}
                                      >
                                        <Building2 className="w-4 h-4 shrink-0" />
                                        <span className="truncate font-semibold">
                                          <HighlightMatch
                                            text={companyName}
                                            query={searchQuery}
                                          />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-2 truncate">
                                      <Pill className="w-4 h-4 text-[#B8C3CC] shrink-0" />
                                      <span className="truncate">
                                        <HighlightMatch
                                          text={`${product.iraqMarket.strength} / ${product.iraqMarket.dosageForm}`}
                                          query={searchQuery}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-[#51616D]/50">
                                  <span className="text-[11px] text-[#B8C3CC] truncate">
                                    {drugClass?.nameEn ?? 'Official Catalog'}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-[#5DB4F2] shrink-0" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            2. COMPANY CATALOG WORKSPACE (`MobileCompanyCatalogEntryPage`)
        =================================================================== */}
        {activeWorkspace === 'company' && (
          <div className="space-y-6">
            {/* _CompanyCatalogHeader */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#263744] border border-[#51616D] rounded-[16px] p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[12px] bg-[#1769AA] border border-[#5DB4F2]/50 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#F2F5F8]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-[20px] sm:text-[22px] font-bold text-[#F2F5F8]">
                      {activeCompanyWorkspaceRecord.companyName}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
                      Verified Company Account
                    </span>
                    {activeCompanyWorkspaceRecord.isTemporaryPassword !== false ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[11px] font-bold">
                        Temporary Password Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#123F68] border border-[#46718F] text-[#5DB4F2] text-[11px] font-bold">
                        Company Password Secured
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#B8C3CC]">
                    {activeCompanyWorkspaceRecord.legalName} •{' '}
                    {activeCompanyWorkspaceRecord.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {currentUser.role === PlatformRole.Admin ? (
                  <div className="flex items-center gap-2">
                    <label className="text-[12px] font-semibold text-[#B8C3CC]">
                      Admin Company View:
                    </label>
                    <select
                      value={activeCompanyWorkspaceRecord.id}
                      onChange={(e) => {
                        const nextId = e.target.value;
                        setActiveCompanyWorkspaceId(nextId);
                        const firstProd = products.find((p) => p.companyId === nextId);
                        if (firstProd) {
                          setSelectedCompanyProductId(firstProd.id);
                        }
                      }}
                      aria-label="Select active company workspace"
                      className="px-3 py-1.5 rounded-[10px] bg-[#1F2D38] border border-[#5DB4F2] text-[12px] font-bold text-[#F2F5F8]"
                    >
                      {companiesList.map((comp) => (
                        <option key={comp.id} value={comp.id}>
                          {comp.companyName} (
                          {products.filter((p) => p.companyId === comp.id).length} products)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#B8C3CC]">
                    Assigned Login Email:{' '}
                    <span className="font-mono font-bold text-[#5DB4F2]">
                      {activeCompanyWorkspaceRecord.contactEmail}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowCompanySecuritySettings((prev) => !prev)}
                  className={`px-3.5 py-2 rounded-[10px] border text-[12px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    showCompanySecuritySettings
                      ? 'bg-[#123F68] border-[#5DB4F2] text-[#F2F5F8]'
                      : 'bg-[#304451] hover:bg-[#3A5262] border-[#51616D] text-[#F2F5F8]'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-[#5DB4F2]" />
                  <span>Security Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => openEditDraftModal(undefined, activeCompanyWorkspaceRecord.id)}
                  className="px-4 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[13px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Product Draft</span>
                </button>
              </div>
            </div>

            {/* Temporary Password Action Required Banner */}
            {activeCompanyWorkspaceRecord.isTemporaryPassword !== false &&
              !showCompanySecuritySettings && (
                <div className="bg-[#4A3B1C]/80 border border-[#A56F0B] rounded-[12px] p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#F59E0B] shrink-0" />
                    <div className="text-[13px] text-[#F2F5F8]">
                      <strong>Action Required — Temporary Password Active:</strong> You
                      signed in with the temporary password assigned by the Platform Admin.
                      Open <strong>Security Settings</strong> to set your permanent company
                      password.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCompanySecuritySettings(true)}
                    className="px-3.5 py-1.5 rounded-[8px] bg-[#F59E0B] text-[#1F2D38] text-[12px] font-extrabold cursor-pointer"
                  >
                    Change Password in Security Settings →
                  </button>
                </div>
              )}

            {/* Company Security Settings — Change Password Card */}
            {showCompanySecuritySettings && (
              <div className="bg-[#263744] border border-[#5DB4F2] rounded-[16px] p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#51616D]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-[#123F68] border border-[#5DB4F2]/50 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-[#5DB4F2]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[17px] font-bold text-[#F2F5F8]">
                          Company Security Settings — Change Account Password
                        </h2>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            activeCompanyWorkspaceRecord.isTemporaryPassword !== false
                              ? 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                              : 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                          }`}
                        >
                          {activeCompanyWorkspaceRecord.isTemporaryPassword !== false
                            ? 'Using Admin Temporary Password'
                            : 'Custom Company Password Active'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                        Assigned Company Login Email:{' '}
                        <code className="text-[#5DB4F2] font-bold">
                          {activeCompanyWorkspaceRecord.contactEmail}
                        </code>{' '}
                        (Signs in from the main Sign In entrance and opens this Company
                        Workspace directly)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCompanySecuritySettings(false)}
                    className="px-3 py-1.5 rounded-[8px] bg-[#1F2D38] hover:bg-[#304451] border border-[#51616D] text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                  >
                    Close Security Settings
                  </button>
                </div>

                <form
                  onSubmit={handleCompanyChangePassword}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end"
                >
                  <div>
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      Current / Temporary Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={companyCurrentPassword}
                      onChange={(e) => setCompanyCurrentPassword(e.target.value)}
                      placeholder="Enter Admin temporary or current password"
                      className="w-full px-3 py-2 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      New Company Password (min. 6 chars) *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={companyNewPassword}
                      onChange={(e) => setCompanyNewPassword(e.target.value)}
                      placeholder="Enter new permanent password"
                      className="w-full px-3 py-2 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={companyConfirmPassword}
                      onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3 py-2 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="text-[12px] text-[#B8C3CC]">
                      {activeCompanyWorkspaceRecord.passwordUpdatedAt
                        ? `Last updated by Company Admin on ${formatShortDate(
                            activeCompanyWorkspaceRecord.passwordUpdatedAt
                          )}`
                        : `Initial temporary password provisioned by Platform Admin (${
                            activeCompanyWorkspaceRecord.password || 'Temp#2026'
                          })`}
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-[10px] bg-[#193D2D] hover:bg-[#22523D] border border-[#2F8F5C] text-[#38C976] text-[13px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Update Company Password</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* _CompanyWorkflowOverview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-4">
                <div className="text-[12px] text-[#B8C3CC] font-semibold">
                  EDITABLE DRAFTS & RETURNED
                </div>
                <div className="text-[26px] font-extrabold text-[#F59E0B] mt-1">
                  {
                    companyWorkspaceProducts.filter(
                      (p) =>
                        p.status === ProductLifecycleStatus.Draft ||
                        p.status === ProductLifecycleStatus.ChangesRequested
                    ).length
                  }
                </div>
                <div className="text-[12px] text-[#B8C3CC] mt-1">
                  Open for clinical content & private storage media uploads
                </div>
              </div>

              <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-4">
                <div className="text-[12px] text-[#B8C3CC] font-semibold">
                  SUBMITTED FOR ADMIN REVIEW
                </div>
                <div className="text-[26px] font-extrabold text-[#5DB4F2] mt-1">
                  {
                    companyWorkspaceProducts.filter(
                      (p) => p.status === ProductLifecycleStatus.Submitted
                    ).length
                  }
                </div>
                <div className="text-[12px] text-[#B8C3CC] mt-1">
                  Locked while awaiting platform administrator review
                </div>
              </div>

              <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-4">
                <div className="text-[12px] text-[#B8C3CC] font-semibold">
                  PUBLISHED IN OFFICIAL CATALOG
                </div>
                <div className="text-[26px] font-extrabold text-[#38C976] mt-1">
                  {
                    companyWorkspaceProducts.filter(
                      (p) => p.status === ProductLifecycleStatus.Published
                    ).length
                  }
                </div>
                <div className="text-[12px] text-[#B8C3CC] mt-1">
                  Admin-approved & discoverable by approved physicians
                </div>
              </div>
            </div>

            {/* Two-Column Company Workspace: Product List + Active Product Inspector & Private Storage Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Company Products List */}
              <div className="lg:col-span-5 space-y-3">
                <h2 className="text-[16px] font-bold text-[#F2F5F8]">
                  {activeCompanyWorkspaceRecord.companyName} Submissions (
                  {companyWorkspaceProducts.length})
                </h2>
                {companyWorkspaceProducts.length === 0 ? (
                  <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-6 text-center text-[13px] text-[#B8C3CC]">
                    No products recorded for {activeCompanyWorkspaceRecord.companyName}{' '}
                    yet. Click <strong>New Product Draft</strong> above to create one.
                  </div>
                ) : (
                  companyWorkspaceProducts.map((product) => {
                    const isSelected = selectedCompanyProduct?.id === product.id;
                    const generic = DEMO_GENERIC_DRUGS.find(
                      (g) => g.id === product.genericDrugId
                    );
                    return (
                      <div
                        key={product.id}
                        onClick={() => setSelectedCompanyProductId(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedCompanyProductId(product.id);
                          }
                        }}
                        className={`p-4 rounded-[12px] border transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#304451] border-[#5DB4F2]'
                            : 'bg-[#263744] border-[#51616D] hover:border-[#83939F]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <StatusPill status={product.status} />
                          <span className="text-[11px] text-[#B8C3CC]">
                            Updated {formatShortDate(product.updatedAt)}
                          </span>
                        </div>
                        <h3 className="text-[17px] font-bold text-[#F2F5F8] mt-2">
                          {product.brandNameEn}
                        </h3>
                        <p className="text-[13px] text-[#5DB4F2] font-medium">
                          {generic?.nameEn} • {product.iraqMarket.strength}{' '}
                          {product.iraqMarket.dosageForm}
                        </p>
                        {product.status === ProductLifecycleStatus.ChangesRequested &&
                          product.reviewReason && (
                            <div className="mt-2.5 p-2.5 rounded-[8px] bg-[#4A3B1C] border border-[#A56F0B] text-[12px] text-[#F59E0B]">
                              <strong>Admin Review Note:</strong> {product.reviewReason}
                            </div>
                          )}
                        <div className="mt-3 pt-2.5 border-t border-[#51616D]/50 flex items-center justify-between text-[11px] text-[#B8C3CC]">
                          <span>
                            Media: {product.media.length} • Brochures:{' '}
                            {product.brochures.length}
                          </span>
                          <span className="text-[#5DB4F2] font-semibold">
                            Inspect & Manage →
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Selected Product Detail, Readiness & Private Storage Foundation */}
              {selectedCompanyProduct && (
                <div className="lg:col-span-7 space-y-5">
                  <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <StatusPill status={selectedCompanyProduct.status} />
                          <span className="text-[11px] font-mono text-[#B8C3CC]">
                            UUID: {selectedCompanyProduct.id}
                          </span>
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#F2F5F8]">
                          {selectedCompanyProduct.brandNameEn}
                        </h2>
                        <p className="text-[14px] text-[#5DB4F2] font-semibold">
                          {
                            DEMO_GENERIC_DRUGS.find(
                              (g) => g.id === selectedCompanyProduct.genericDrugId
                            )?.nameEn
                          }{' '}
                          — {selectedCompanyProduct.iraqMarket.strength} /{' '}
                          {selectedCompanyProduct.iraqMarket.dosageForm}
                        </p>
                      </div>

                      {/* Company Lifecycle Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {(selectedCompanyProduct.status ===
                          ProductLifecycleStatus.Draft ||
                          selectedCompanyProduct.status ===
                            ProductLifecycleStatus.ChangesRequested) && (
                          <>
                            <button
                              type="button"
                              onClick={() => openEditDraftModal(selectedCompanyProduct)}
                              className="px-3 py-2 rounded-[10px] bg-[#304451] hover:bg-[#3A4650] border border-[#51616D] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Clinical Draft</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCompanySubmitForReview(selectedCompanyProduct)
                              }
                              className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit for Admin Review</span>
                            </button>
                          </>
                        )}

                        {selectedCompanyProduct.status ===
                          ProductLifecycleStatus.Submitted && (
                          <button
                            type="button"
                            onClick={() =>
                              handleCompanyWithdrawSubmission(selectedCompanyProduct)
                            }
                            className="px-3.5 py-2 rounded-[10px] bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Withdraw Submission to Draft</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Readiness Checklist */}
                    {(() => {
                      const readiness = evaluateProductReadiness(selectedCompanyProduct);
                      return (
                        <div className="mt-5 pt-4 border-t border-[#51616D]">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <h3 className="text-[14px] font-bold text-[#F2F5F8]">
                              Official Catalog Submission Readiness Checklist
                            </h3>
                            <label className="flex items-center gap-2 text-[12px] text-[#B8C3CC] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={enforceMediaForPublication}
                                onChange={(e) =>
                                  setEnforceMediaForPublication(e.target.checked)
                                }
                                className="rounded border-[#51616D]"
                              />
                              <span>Enforce Section 4 media & brochure gate</span>
                            </label>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                            <ReadinessItem
                              ok={readiness.hasBrandEn && readiness.hasGeneric}
                              label="English Brand & Generic Taxonomy"
                            />
                            <ReadinessItem
                              ok={readiness.hasMarketedInIraq}
                              label="Iraq Market Presentation (marketed_in_iraq)"
                            />
                            <ReadinessItem
                              ok={readiness.hasClinicalContent}
                              label="Required Clinical & Storage Fields"
                            />
                            <ReadinessItem
                              ok={readiness.hasProductImage}
                              label="Product Image in catalog-product-media"
                            />
                            <ReadinessItem
                              ok={readiness.hasPackageImage}
                              label="Package Image in catalog-product-media"
                            />
                            <ReadinessItem
                              ok={readiness.hasCurrentBrochure}
                              label="Current PDF Brochure in catalog-brochures"
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Private Storage Buckets Manager (`20260814000100_secure_catalog_storage_foundation.sql`) */}
                  <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-[#123F68] border border-[#46718F] flex items-center justify-center shrink-0">
                          <FolderLock className="w-5 h-5 text-[#5DB4F2]" />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-[#F2F5F8]">
                            Secure Private Storage Media & PDF Brochures
                          </h3>
                          <p className="text-[12px] text-[#B8C3CC]">
                            Enforces <code className="text-[#5DB4F2]">&lt;product_uuid&gt;/&lt;file&gt;</code>{' '}
                            folder isolation and RLS helper{' '}
                            <code className="text-[#5DB4F2]">
                              private.can_manage_official_product_content
                            </code>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bucket 1: catalog-product-media */}
                    <div className="bg-[#304451]/60 border border-[#51616D] rounded-[12px] p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-[13px] font-bold text-[#F2F5F8] flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#5DB4F2]" />
                            <span>Bucket: catalog-product-media</span>
                          </div>
                          <p className="text-[11px] text-[#B8C3CC]">
                            Private • Max 10 MB • Allowed MIME: image/jpeg, image/png,
                            image/webp
                          </p>
                        </div>

                        {(selectedCompanyProduct.status ===
                          ProductLifecycleStatus.Draft ||
                          selectedCompanyProduct.status ===
                            ProductLifecycleStatus.ChangesRequested) && (
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={uploadMediaType}
                              onChange={(e) =>
                                setUploadMediaType(e.target.value as MediaType)
                              }
                              aria-label="Media type to upload"
                              className="px-2.5 py-1.5 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                            >
                              <option value={MediaType.ProductImage}>
                                Product Image
                              </option>
                              <option value={MediaType.PackageImage}>
                                Package Image
                              </option>
                            </select>

                            <button
                              type="button"
                              onClick={() =>
                                handleUploadProductMedia(
                                  selectedCompanyProduct,
                                  uploadMediaType
                                )
                              }
                              className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload {readableEnum(uploadMediaType)}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {selectedCompanyProduct.media.length === 0 ? (
                        <div className="text-[12px] text-[#B8C3CC] py-3 text-center border border-dashed border-[#51616D] rounded-[8px]">
                          No product or package images uploaded for this record yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedCompanyProduct.media.map((media) => (
                            <div
                              key={media.id}
                              className="bg-[#263744] border border-[#51616D] rounded-[10px] overflow-hidden"
                            >
                              <img
                                src={media.previewDataUrl}
                                alt={media.fileName}
                                className="w-full h-32 object-cover border-b border-[#51616D]"
                              />
                              <div className="p-2.5 flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="text-[12px] font-bold text-[#F2F5F8]">
                                    {readableEnum(media.mediaType)}
                                  </div>
                                  <div className="text-[11px] text-[#B8C3CC] font-mono truncate">
                                    {media.storagePath}
                                  </div>
                                </div>
                                {(selectedCompanyProduct.status ===
                                  ProductLifecycleStatus.Draft ||
                                  selectedCompanyProduct.status ===
                                    ProductLifecycleStatus.ChangesRequested) && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteMediaObject(
                                        selectedCompanyProduct,
                                        media.id
                                      )
                                    }
                                    className="p-1.5 rounded bg-[#4B2528] border border-[#A9474E] text-[#FF7272] hover:opacity-90 cursor-pointer"
                                    title="Delete storage object"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bucket 2: catalog-brochures */}
                    <div className="bg-[#304451]/60 border border-[#51616D] rounded-[12px] p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-[13px] font-bold text-[#F2F5F8] flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#5DB4F2]" />
                            <span>Bucket: catalog-brochures</span>
                          </div>
                          <p className="text-[11px] text-[#B8C3CC]">
                            Private • Max 25 MB • Allowed MIME: application/pdf • Versioned
                            per market & locale
                          </p>
                        </div>

                        {(selectedCompanyProduct.status ===
                          ProductLifecycleStatus.Draft ||
                          selectedCompanyProduct.status ===
                            ProductLifecycleStatus.ChangesRequested) && (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleUploadBrochure(selectedCompanyProduct)}
                              className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload New PDF Brochure Version</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {selectedCompanyProduct.brochures.map((brochure) => (
                          <div
                            key={brochure.id}
                            className="bg-[#263744] border border-[#51616D] rounded-[10px] p-3 flex flex-wrap items-center justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-[#F2F5F8]">
                                  {brochure.title}
                                </span>
                                <span
                                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                                    brochure.isCurrent
                                      ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                      : 'bg-[#3A4650] text-[#B8C3CC]'
                                  }`}
                                >
                                  v{brochure.version}{' '}
                                  {brochure.isCurrent ? '(Current)' : '(Historical)'}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#B8C3CC] font-mono mt-0.5">
                                {brochure.storagePath} • {formatBytes(brochure.fileSizeBytes)}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                openSignedBrochureViewer(
                                  brochure,
                                  selectedCompanyProduct.brandNameEn
                                )
                              }
                              className="px-3 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A4650] border border-[#51616D] text-[#5DB4F2] text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview Signed PDF</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            3. ADMIN CATALOG REVIEW WORKSPACE (`AdminCatalogReviewEntryPage`)
        =================================================================== */}
        {activeWorkspace === 'admin' && (
          <div className="space-y-6">
            {/* _ReviewQueueHeader */}
            <div className="rounded-[16px] p-6 bg-gradient-to-br from-[#123F68] to-[#1769AA] border border-[#46718F] flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-[12px] font-extrabold tracking-wider text-[#F2F5F8] uppercase">
                  OFFICIAL CATALOG GOVERNANCE & MEMBER DIRECTORY
                </div>
                <h1 className="text-[28px] font-extrabold text-[#F2F5F8] tracking-tight mt-1">
                  Admin Governance — Doctors & Companies Members Directory
                </h1>
                <p className="text-[14px] text-[#F2F5F8]/90 leading-relaxed mt-1.5">
                  View all signed-up Doctors and Companies. Press directly on any Doctor&apos;s
                  name or Company&apos;s name to open their dedicated page, manage credentials,
                  or enter their live workspace.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAdminDoctorId(null);
                    setSelectedAdminCompanyId(null);
                    setAdminViewMode('access_accounts');
                  }}
                  className="min-w-[138px] p-3.5 rounded-[12px] bg-[#1F2D38]/50 hover:bg-[#1F2D38]/80 border border-[#F2F5F8]/30 text-left transition cursor-pointer"
                >
                  <div className="text-[11px] font-bold tracking-wider text-[#F2F5F8]/80 uppercase">
                    DOCTORS SIGN-UP
                  </div>
                  <div className="text-[24px] font-extrabold text-[#F2F5F8] mt-0.5 font-mono tabular-nums">
                    {registeredDoctors.length}
                  </div>
                  <div className="text-[11px] text-[#38C976] font-semibold">
                    {registeredDoctors.filter((d) => d.verificationStatus === 'approved').length}{' '}
                    verified •{' '}
                    {registeredDoctors.filter((d) => d.verificationStatus === 'pending').length}{' '}
                    pending
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedAdminDoctorId(null);
                    setSelectedAdminCompanyId(null);
                    setAdminViewMode('access_accounts');
                  }}
                  className="min-w-[138px] p-3.5 rounded-[12px] bg-[#1F2D38]/50 hover:bg-[#1F2D38]/80 border border-[#F2F5F8]/30 text-left transition cursor-pointer"
                >
                  <div className="text-[11px] font-bold tracking-wider text-[#F2F5F8]/80 uppercase">
                    COMPANIES SIGN-UP
                  </div>
                  <div className="text-[24px] font-extrabold text-[#F2F5F8] mt-0.5 font-mono tabular-nums">
                    {companiesList.length}
                  </div>
                  <div className="text-[11px] text-[#F2F5F8]/80">Click any name to open page</div>
                </button>

                <div className="min-w-[138px] p-3.5 rounded-[12px] bg-[#1F2D38]/40 border border-[#F2F5F8]/20">
                  <div className="text-[11px] font-bold tracking-wider text-[#F2F5F8]/80 uppercase">
                    PRODUCTS
                  </div>
                  <div className="text-[24px] font-extrabold text-[#F2F5F8] mt-0.5 font-mono tabular-nums">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-[#F2F5F8]/80">
                    {paidHomeProductIds.length} in Home Ad Space
                  </div>
                </div>
              </div>
            </div>

            {/* Persistent Admin Unified Global Search Bar */}
            <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-bold text-[#F2F5F8] flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#5DB4F2]" />
                    <span>
                      Admin Global Search (Doctors, Companies, Products, Drug Classes &
                      Specialties)
                    </span>
                  </h2>
                  <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                    Search any signed-up Doctor, Company, medication brand, generic name,
                    registration number, therapeutic class, or specialty. Press on any Doctor
                    or Company name to open their page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openEditDraftModal(undefined, selectedAdminCompanyId ?? undefined)}
                  className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Medication to Catalog</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#B8C3CC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={adminGlobalSearchQuery}
                  onChange={(e) => setAdminGlobalSearchQuery(e.target.value)}
                  placeholder="Search Doctors, Companies, or Medications: e.g. Dr. Tariq, AstraZeneca, Betaloc, Forxiga..."
                  aria-label="Admin global search across doctors, companies, products, classes, and specialties"
                  className="w-full pl-10 pr-10 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[14px] text-[#F2F5F8] placeholder-[#84919B]"
                />
                {adminGlobalSearchQuery.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setAdminGlobalSearchQuery('')}
                    aria-label="Clear admin global search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Global Search Results Panel */}
              {adminGlobalSearchQuery.trim().length > 0 && (
                <div className="bg-[#1F2D38] border border-[#5DB4F2] rounded-[12px] p-4 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#51616D] pb-3">
                    <div className="text-[13px] font-bold text-[#F2F5F8]">
                      Global Search Matches for{' '}
                      <span className="text-[#5DB4F2]">
                        &ldquo;{adminGlobalSearchQuery.trim()}&rdquo;
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#B8C3CC]">
                      <span>
                        Doctors: {adminGlobalSearchResults.doctors.length}
                      </span>
                      <span>•</span>
                      <span>
                        Companies: {adminGlobalSearchResults.companies.length}
                      </span>
                      <span>•</span>
                      <span>
                        Products: {adminGlobalSearchResults.products.length}
                      </span>
                      <span>•</span>
                      <span>
                        Classes: {adminGlobalSearchResults.drugClasses.length}
                      </span>
                      <span>•</span>
                      <span>
                        Specialties: {adminGlobalSearchResults.specialties.length}
                      </span>
                    </div>
                  </div>

                  {/* Matching Signed-Up Doctors */}
                  {adminGlobalSearchResults.doctors.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[12px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                        Matching Signed-Up Doctors ({adminGlobalSearchResults.doctors.length})
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {adminGlobalSearchResults.doctors.map((doc) => (
                          <div
                            key={doc.profileId}
                            className="p-3.5 rounded-[10px] bg-[#263744] border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() => openAdminDoctorPage(doc.profileId)}
                                className="text-[14px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left cursor-pointer"
                              >
                                <HighlightMatch
                                  text={doc.fullName}
                                  query={adminGlobalSearchQuery}
                                />
                              </button>
                              <div className="text-[12px] text-[#B8C3CC] truncate">
                                {doc.email} • {doc.specialty ?? 'Physician'}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => openAdminDoctorPage(doc.profileId)}
                              className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Stethoscope className="w-3.5 h-3.5" />
                              <span>Open Doctor Page</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Companies */}
                  {adminGlobalSearchResults.companies.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[12px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                        Matching Signed-Up Companies ({adminGlobalSearchResults.companies.length})
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {adminGlobalSearchResults.companies.map((comp) => {
                          const companyProductsCount = products.filter(
                            (p) => p.companyId === comp.id
                          ).length;
                          return (
                            <div
                              key={comp.id}
                              className="p-3.5 rounded-[10px] bg-[#263744] border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                            >
                              <div className="min-w-0">
                                <button
                                  type="button"
                                  onClick={() => openAdminCompanyPage(comp.id)}
                                  className="text-[14px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left cursor-pointer"
                                >
                                  <HighlightMatch
                                    text={comp.companyName}
                                    query={adminGlobalSearchQuery}
                                  />
                                </button>
                                <div className="text-[12px] text-[#B8C3CC] truncate">
                                  {comp.legalName} • {companyProductsCount} product(s)
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openAdminCompanyPage(comp.id)}
                                  className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Building2 className="w-3.5 h-3.5" />
                                  <span>Enter Company Page</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditDraftModal(undefined, comp.id)}
                                  className="px-2.5 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold cursor-pointer"
                                >
                                  + Add Drug
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matching Products */}
                  {adminGlobalSearchResults.products.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[12px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                        Matching Products ({adminGlobalSearchResults.products.length})
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                        {adminGlobalSearchResults.products.map((product) => {
                          const generic = DEMO_GENERIC_DRUGS.find(
                            (g) => g.id === product.genericDrugId
                          );
                          const isPaidAd = paidHomeProductIds.includes(product.id);
                          return (
                            <div
                              key={product.id}
                              className="p-3.5 rounded-[10px] bg-[#263744] border border-[#51616D] flex flex-col justify-between gap-3"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <StatusPill status={product.status} />
                                  <button
                                    type="button"
                                    onClick={() => openAdminCompanyPage(product.companyId)}
                                    className="text-[11px] text-[#5DB4F2] hover:underline font-semibold cursor-pointer"
                                  >
                                    {getCompanyName(product.companyId)}
                                  </button>
                                </div>
                                <div className="text-[15px] font-bold text-[#F2F5F8] mt-1.5">
                                  <HighlightMatch
                                    text={product.brandNameEn}
                                    query={adminGlobalSearchQuery}
                                  />
                                </div>
                                <div className="text-[12px] text-[#5DB4F2] font-semibold">
                                  <HighlightMatch
                                    text={generic?.nameEn ?? ''}
                                    query={adminGlobalSearchQuery}
                                  />
                                </div>
                                <div className="text-[11px] text-[#B8C3CC] mt-1">
                                  {product.iraqMarket.strength} •{' '}
                                  {product.iraqMarket.dosageForm}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#51616D]/60">
                                <button
                                  type="button"
                                  onClick={() => openEditDraftModal(product)}
                                  className="px-2.5 py-1 rounded bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit Product</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAdminTogglePaidHomeProduct(product)}
                                  className={`px-2.5 py-1 rounded border text-[11px] font-bold cursor-pointer ${
                                    isPaidAd
                                      ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                                      : 'bg-[#304451] border-[#51616D] text-[#F2F5F8] hover:border-[#5DB4F2]'
                                  }`}
                                >
                                  {isPaidAd ? 'In Home Ad Space ✓' : '+ Home Ad Space'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openAdminCompanyPage(product.companyId)}
                                  className="px-2.5 py-1 rounded bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                >
                                  Company Page →
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matching Drug Classes & Specialties */}
                  {(adminGlobalSearchResults.drugClasses.length > 0 ||
                    adminGlobalSearchResults.specialties.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adminGlobalSearchResults.drugClasses.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-[12px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                            Matching Drug Classes (
                            {adminGlobalSearchResults.drugClasses.length})
                          </div>
                          <div className="space-y-1.5">
                            {adminGlobalSearchResults.drugClasses.map((dc) => (
                              <div
                                key={dc.id}
                                className="p-2.5 rounded-[8px] bg-[#263744] border border-[#51616D] flex items-center justify-between gap-2"
                              >
                                <span className="text-[12px] font-bold text-[#F2F5F8] truncate">
                                  {dc.nameEn}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAdminViewMode('search_lists');
                                    setAdminSearchListTab('drug_classes');
                                    setEditingDrugClassId(dc.id);
                                    setEditDrugClassName(dc.nameEn);
                                    setEditDrugClassDescription(dc.descriptionEn);
                                    setAdminGlobalSearchQuery('');
                                  }}
                                  className="px-2.5 py-1 rounded bg-[#304451] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer shrink-0"
                                >
                                  Manage Class
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {adminGlobalSearchResults.specialties.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-[12px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                            Matching Specialties (
                            {adminGlobalSearchResults.specialties.length})
                          </div>
                          <div className="space-y-1.5">
                            {adminGlobalSearchResults.specialties.map((sp) => (
                              <div
                                key={sp.id}
                                className="p-2.5 rounded-[8px] bg-[#263744] border border-[#51616D] flex items-center justify-between gap-2"
                              >
                                <span className="text-[12px] font-bold text-[#F2F5F8] truncate">
                                  {sp.nameEn} ({sp.code})
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAdminViewMode('search_lists');
                                    setAdminSearchListTab('specialties');
                                    setEditingSpecialtyId(sp.id);
                                    setEditSpecialtyName(sp.nameEn);
                                    setEditSpecialtyCode(sp.code);
                                    setAdminGlobalSearchQuery('');
                                  }}
                                  className="px-2.5 py-1 rounded bg-[#304451] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer shrink-0"
                                >
                                  Manage Specialty
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {adminGlobalSearchResults.doctors.length === 0 &&
                    adminGlobalSearchResults.companies.length === 0 &&
                    adminGlobalSearchResults.products.length === 0 &&
                    adminGlobalSearchResults.drugClasses.length === 0 &&
                    adminGlobalSearchResults.specialties.length === 0 && (
                      <div className="text-center py-4 text-[13px] text-[#B8C3CC]">
                        No matching doctors, companies, products, drug classes, or specialties
                        found for &ldquo;{adminGlobalSearchQuery.trim()}&rdquo;.
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Admin Workspace Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#51616D] pb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedAdminCompanyId(null);
                  setSelectedAdminDoctorId(null);
                  setAdminViewMode('access_accounts');
                }}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-bold flex items-center gap-2 border transition cursor-pointer ${
                  adminViewMode === 'access_accounts'
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                    : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>
                  Members List: Doctors Sign-Up ({registeredDoctors.length}) & Companies Sign-Up (
                  {companiesList.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAdminDoctorId(null);
                  setAdminViewMode('company_pages');
                }}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-bold flex items-center gap-2 border transition cursor-pointer ${
                  adminViewMode === 'company_pages'
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                    : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Company Pages & Portfolios ({companiesList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAdminCompanyId(null);
                  setSelectedAdminDoctorId(null);
                  setAdminViewMode('review_queue');
                }}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-bold flex items-center gap-2 border transition cursor-pointer ${
                  adminViewMode === 'review_queue'
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                    : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Product Review Queue</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAdminCompanyId(null);
                  setSelectedAdminDoctorId(null);
                  setAdminViewMode('search_lists');
                }}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-bold flex items-center gap-2 border transition cursor-pointer ${
                  adminViewMode === 'search_lists'
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                    : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Manage Search Lists (Companies / Classes / Specialties)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAdminCompanyId(null);
                  setSelectedAdminDoctorId(null);
                  setAdminViewMode('paid_home');
                }}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-bold flex items-center gap-2 border transition cursor-pointer ${
                  adminViewMode === 'paid_home'
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                    : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Home Page Ad Space ({paidHomeProductIds.length})
                </span>
              </button>
            </div>

            {/* ===============================================================
                ADMIN TAB 0: COMPANY PAGES & PORTFOLIOS (ENTER ANY COMPANY PAGE, EDIT PROFILE & PRODUCTS, TOGGLE HOME AD SPACE)
            =============================================================== */}
            {adminViewMode === 'company_pages' && (
              <div className="space-y-6">
                {selectedAdminCompany ? (
                  /* INSIDE SPECIFIC COMPANY PAGE (ADMIN MANAGEMENT VIEW) */
                  <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAdminCompanyId(null);
                            setEditingCompanyId(null);
                          }}
                          className="w-10 h-10 rounded-[10px] bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] flex items-center justify-center text-[#F2F5F8] transition cursor-pointer"
                          title="Back to All Company Pages"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-[20px] font-bold text-[#F2F5F8]">
                              Admin Company Page — {selectedAdminCompany.companyName}
                            </h2>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                selectedAdminCompany.status === 'verified'
                                  ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                  : 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                              }`}
                            >
                              {selectedAdminCompany.status === 'verified'
                                ? 'Verified in Search'
                                : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#B8C3CC]">
                            Edit company profile, add or edit medications, and toggle Home Page
                            Ad Space placements for this manufacturer.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => openEditDraftModal(undefined, selectedAdminCompany.id)}
                          className="px-4 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Medication to {selectedAdminCompany.companyName}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAdminInspectingMember(true);
                            setActiveCompanyWorkspaceId(selectedAdminCompany.id);
                            switchRoleAndWorkspace(
                              'company_admin',
                              'company',
                              selectedAdminCompany.id
                            );
                          }}
                          className="px-3.5 py-2 rounded-[10px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#5DB4F2] text-[12px] font-bold cursor-pointer"
                        >
                          Open Live Company Admin Workspace →
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAdminInspectingMember(true);
                            switchRoleAndWorkspace('doctor', 'doctor');
                            setSelectedDoctorCompanyId(selectedAdminCompany.id);
                          }}
                          className="px-3.5 py-2 rounded-[10px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8] text-[12px] font-semibold cursor-pointer"
                        >
                          Preview Doctor View →
                        </button>
                      </div>
                    </div>

                    {/* Company Profile Card with Inline Admin Editor */}
                    <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-[12px] bg-[#123F68] border border-[#5DB4F2]/60 flex items-center justify-center shrink-0">
                            <Building2 className="w-7 h-7 text-[#5DB4F2]" />
                          </div>
                          <div>
                            <h3 className="text-[24px] font-extrabold text-[#F2F5F8]">
                              {selectedAdminCompany.companyName}
                            </h3>
                            <p className="text-[14px] font-semibold text-[#5DB4F2]">
                              {selectedAdminCompany.legalName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {editingCompanyId === selectedAdminCompany.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminSaveCompanyEdit(selectedAdminCompany.id)
                                }
                                className="px-3.5 py-1.5 rounded-[8px] bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[12px] font-bold cursor-pointer"
                              >
                                Save Profile Changes
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingCompanyId(null)}
                                className="px-3.5 py-1.5 rounded-[8px] bg-[#304451] border border-[#51616D] text-[#B8C3CC] text-[12px] font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCompanyId(selectedAdminCompany.id);
                                  setEditCompanyName(selectedAdminCompany.companyName);
                                  setEditCompanyLegalName(selectedAdminCompany.legalName);
                                  setEditCompanyDescription(selectedAdminCompany.description);
                                  setEditCompanyWebsite(selectedAdminCompany.websiteUrl);
                                  setEditCompanyEmail(selectedAdminCompany.contactEmail);
                                  setEditCompanyPhone(selectedAdminCompany.contactPhone);
                                }}
                                className="px-3.5 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#5DB4F2]" />
                                <span>Edit Company Profile</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminToggleCompanyVisibility(selectedAdminCompany)
                                }
                                className="px-3 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[#5DB4F2] text-[12px] font-semibold cursor-pointer"
                              >
                                {selectedAdminCompany.status === 'verified'
                                  ? 'Hide Company'
                                  : 'Show Company'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {editingCompanyId === selectedAdminCompany.id ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#51616D]">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Company Display Name
                            </label>
                            <input
                              type="text"
                              value={editCompanyName}
                              onChange={(e) => setEditCompanyName(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Legal Entity Name
                            </label>
                            <input
                              type="text"
                              value={editCompanyLegalName}
                              onChange={(e) => setEditCompanyLegalName(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Official Website
                            </label>
                            <input
                              type="text"
                              value={editCompanyWebsite}
                              onChange={(e) => setEditCompanyWebsite(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Medical Information Email
                            </label>
                            <input
                              type="text"
                              value={editCompanyEmail}
                              onChange={(e) => setEditCompanyEmail(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Iraq Scientific Office Phone
                            </label>
                            <input
                              type="text"
                              value={editCompanyPhone}
                              onChange={(e) => setEditCompanyPhone(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Company Description
                            </label>
                            <textarea
                              rows={2}
                              value={editCompanyDescription}
                              onChange={(e) => setEditCompanyDescription(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-[14px] text-[#F2F5F8] leading-relaxed">
                            {selectedAdminCompany.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#51616D]/60 text-[12px]">
                            <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                              <div className="text-[#B8C3CC]">Official Website</div>
                              <div className="text-[#5DB4F2] font-semibold truncate mt-0.5">
                                {selectedAdminCompany.websiteUrl}
                              </div>
                            </div>
                            <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                              <div className="text-[#B8C3CC]">Medical Information Email</div>
                              <div className="text-[#F2F5F8] font-semibold truncate mt-0.5">
                                {selectedAdminCompany.contactEmail}
                              </div>
                            </div>
                            <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                              <div className="text-[#B8C3CC]">Iraq Scientific Office Phone</div>
                              <div className="text-[#F2F5F8] font-semibold truncate mt-0.5">
                                {selectedAdminCompany.contactPhone}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Products Portfolio of this Company (Admin Editable + Ad Space Toggle) */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-[18px] font-bold text-[#F2F5F8]">
                            Medications Portfolio for {selectedAdminCompany.companyName} (
                            {
                              products.filter((p) => p.companyId === selectedAdminCompany.id)
                                .length
                            }
                            )
                          </h3>
                          <p className="text-[12px] text-[#B8C3CC]">
                            Edit any medication monograph, publish/hide status, or toggle its
                            placement in the Doctor Home Page Ad Space.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openEditDraftModal(undefined, selectedAdminCompany.id)}
                          className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Product to {selectedAdminCompany.companyName}</span>
                        </button>
                      </div>

                      {products.filter((p) => p.companyId === selectedAdminCompany.id).length ===
                      0 ? (
                        <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-8 text-center space-y-3">
                          <div className="text-[15px] font-bold text-[#F2F5F8]">
                            No products registered under {selectedAdminCompany.companyName} yet
                          </div>
                          <p className="text-[13px] text-[#B8C3CC]">
                            Add the first medication for this company and optionally place it on
                            the Doctor Home Page Ad Space.
                          </p>
                          <button
                            type="button"
                            onClick={() => openEditDraftModal(undefined, selectedAdminCompany.id)}
                            className="px-4 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add First Medication</span>
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {products
                            .filter((p) => p.companyId === selectedAdminCompany.id)
                            .map((product) => {
                              const generic = DEMO_GENERIC_DRUGS.find(
                                (g) => g.id === product.genericDrugId
                              );
                              const drugClass = drugClassesList.find(
                                (c) => c.id === product.drugClassId
                              );
                              const isPaidHome = paidHomeProductIds.includes(product.id);

                              return (
                                <div
                                  key={product.id}
                                  className={`p-5 rounded-[12px] border flex flex-col justify-between gap-4 transition ${
                                    isPaidHome
                                      ? 'bg-[#304451] border-[#F59E0B]'
                                      : 'bg-[#263744] border-[#51616D]'
                                  }`}
                                >
                                  <div>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <StatusPill status={product.status} />
                                      {isPaidHome && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[11px] font-bold">
                                          Active in Home Ad Space
                                        </span>
                                      )}
                                    </div>

                                    <h4 className="text-[19px] font-bold text-[#F2F5F8] mt-2.5">
                                      {product.brandNameEn}
                                    </h4>
                                    <p className="text-[14px] font-semibold text-[#5DB4F2] mt-0.5">
                                      {generic?.nameEn ?? 'Generic drug'}
                                    </p>
                                    <p className="text-[12px] text-[#B8C3CC] mt-1.5">
                                      {product.iraqMarket.strength} •{' '}
                                      {product.iraqMarket.dosageForm} •{' '}
                                      {drugClass?.nameEn ?? 'Unclassified'}
                                    </p>
                                    <p className="text-[12px] text-[#B8C3CC] mt-2 line-clamp-2">
                                      {product.iraqMarket.approvedIndicationsEn}
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#51616D]/60">
                                    <button
                                      type="button"
                                      onClick={() => openEditDraftModal(product)}
                                      className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                      <span>Edit Product</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleAdminTogglePaidHomeProduct(product)}
                                      className={`px-3 py-1.5 rounded-[8px] border text-[12px] font-bold cursor-pointer transition ${
                                        isPaidHome
                                          ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                                          : 'bg-[#1F2D38] hover:bg-[#304451] border-[#5DB4F2] text-[#5DB4F2]'
                                      }`}
                                    >
                                      {isPaidHome
                                        ? 'Remove from Home Ad Space'
                                        : '+ Add to Home Ad Space'}
                                    </button>

                                    {product.status !== ProductLifecycleStatus.Published && (
                                      <button
                                        type="button"
                                        onClick={() => handleAdminPublishProduct(product)}
                                        className="px-3 py-1.5 rounded-[8px] bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[12px] font-bold cursor-pointer"
                                      >
                                        Publish Now
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* DIRECTORY OF ALL COMPANY PAGES FOR ADMIN */
                  <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[20px] font-bold text-[#F2F5F8]">
                          All Pharmaceutical Company Pages ({companiesList.length})
                        </h2>
                        <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                          Select any company below to enter its Company Page, edit its
                          medications, add new products, or place its medications in the Doctor
                          Home Page Ad Space.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#51616D]">
                      {companiesList.map((comp) => {
                        const compProducts = products.filter((p) => p.companyId === comp.id);
                        const compPublishedCount = compProducts.filter(
                          (p) => p.status === ProductLifecycleStatus.Published
                        ).length;
                        const compPaidAdsCount = compProducts.filter((p) =>
                          paidHomeProductIds.includes(p.id)
                        ).length;

                        return (
                          <div
                            key={comp.id}
                            className="bg-[#1F2D38] hover:bg-[#304451]/60 border border-[#51616D] hover:border-[#5DB4F2] rounded-[12px] p-5 flex flex-col justify-between gap-4 transition"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                    comp.status === 'verified'
                                      ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                      : 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                                  }`}
                                >
                                  {comp.status === 'verified' ? 'Verified' : 'Hidden'}
                                </span>
                                <div className="flex items-center gap-2 text-[11px] font-mono">
                                  <span className="text-[#5DB4F2] font-bold">
                                    {compPublishedCount} Published
                                  </span>
                                  {compPaidAdsCount > 0 && (
                                    <span className="px-2 py-0.5 rounded bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] font-bold">
                                      {compPaidAdsCount} Home Ad(s)
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => openAdminCompanyPage(comp.id)}
                                className="text-[18px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left mt-2 cursor-pointer"
                              >
                                {comp.companyName}
                              </button>
                              <p className="text-[12px] text-[#5DB4F2] font-semibold">
                                {comp.legalName}
                              </p>
                              <p className="text-[12px] text-[#B8C3CC] mt-1.5 line-clamp-2">
                                {comp.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#51616D]/60">
                              <button
                                type="button"
                                onClick={() => setSelectedAdminCompanyId(comp.id)}
                                className="px-3.5 py-2 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <Building2 className="w-3.5 h-3.5" />
                                <span>Enter Company Page & Edit Products</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditDraftModal(undefined, comp.id)}
                                className="px-3 py-2 rounded-[8px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#5DB4F2] text-[12px] font-bold cursor-pointer"
                              >
                                + Add Drug
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminViewMode === 'review_queue' && (
              <>
                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {(
                      [
                        ProductLifecycleStatus.Submitted,
                        ProductLifecycleStatus.Published,
                        ProductLifecycleStatus.ChangesRequested,
                        ProductLifecycleStatus.Hidden,
                        ProductLifecycleStatus.Draft,
                        'all',
                      ] as const
                    ).map((filterStatus) => (
                      <button
                        key={filterStatus}
                        type="button"
                        onClick={() => setAdminQueueFilter(filterStatus)}
                        className={`px-3 py-1.5 rounded-[10px] text-[12px] font-bold border transition cursor-pointer ${
                          adminQueueFilter === filterStatus
                            ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                            : 'bg-[#263744] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                        }`}
                      >
                        {filterStatus === 'all'
                          ? `All Records (${products.length})`
                          : `${readableEnum(filterStatus)} (${
                              products.filter((p) => p.status === filterStatus).length
                            })`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Queue Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-1">
                    {adminFilteredQueue.length === 0 ? (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[12px] p-6 text-center">
                        <ClipboardCheck className="w-7 h-7 text-[#5DB4F2] mx-auto mb-2" />
                        <div className="text-[15px] font-bold text-[#F2F5F8]">
                          No products in this queue state
                        </div>
                        <p className="text-[12px] text-[#B8C3CC] mt-1">
                          Switch queue filters above or submit a draft from the Company
                          Workspace.
                        </p>
                      </div>
                    ) : (
                      adminFilteredQueue.map((product) => {
                        const isSelected = selectedAdminProduct?.id === product.id;
                        return (
                          <div
                            key={product.id}
                            onClick={() => {
                              setSelectedAdminProductId(product.id);
                              setAdminActionError(null);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedAdminProductId(product.id);
                              }
                            }}
                            className={`p-4 rounded-[12px] border transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#304451] border-[#5DB4F2]'
                                : 'bg-[#263744] border-[#51616D]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <StatusPill status={product.status} />
                              <span className="text-[11px] text-[#B8C3CC]">
                                {getCompanyName(product.companyId)}
                              </span>
                            </div>
                            <h3 className="text-[17px] font-bold text-[#F2F5F8] mt-2">
                              {product.brandNameEn}
                            </h3>
                            <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                              {product.iraqMarket.strength} •{' '}
                              {product.iraqMarket.dosageForm} • Reg:{' '}
                              {product.iraqMarket.registrationNumber}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Admin Review Decision Panel */}
                  <div className="lg:col-span-7 space-y-5">
                    {selectedAdminProduct ? (
                      <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <StatusPill status={selectedAdminProduct.status} />
                              {paidHomeProductIds.includes(selectedAdminProduct.id) && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[11px] font-bold">
                                  In Home Ad Space
                                </span>
                              )}
                            </div>
                            <h2 className="text-[22px] font-extrabold text-[#F2F5F8] mt-2">
                              {selectedAdminProduct.brandNameEn}
                            </h2>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAdminCompanyId(selectedAdminProduct.companyId);
                                setAdminViewMode('company_pages');
                              }}
                              className="text-[13px] text-[#5DB4F2] font-semibold hover:underline cursor-pointer mt-0.5"
                            >
                              Owning Company:{' '}
                              {getCompanyName(selectedAdminProduct.companyId)} (Open Company
                              Page →)
                            </button>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditDraftModal(selectedAdminProduct)}
                                className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit Product</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminTogglePaidHomeProduct(selectedAdminProduct)
                                }
                                className={`px-3 py-1.5 rounded-[8px] border text-[12px] font-bold cursor-pointer ${
                                  paidHomeProductIds.includes(selectedAdminProduct.id)
                                    ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                                    : 'bg-[#304451] border-[#51616D] text-[#F2F5F8]'
                                }`}
                              >
                                {paidHomeProductIds.includes(selectedAdminProduct.id)
                                  ? 'Remove Home Ad'
                                  : '+ Home Ad Space'}
                              </button>
                            </div>
                            <div className="text-right text-[11px] text-[#B8C3CC]">
                              Submitted: {formatShortDate(selectedAdminProduct.submittedAt)} •{' '}
                              Published: {formatShortDate(selectedAdminProduct.publishedAt)}
                            </div>
                          </div>
                        </div>

                        {/* Clinical & Storage Inspection Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#304451]/60 border border-[#51616D] rounded-[12px] p-4 text-[12px]">
                          <div>
                            <span className="text-[#B8C3CC]">Strength / Form:</span>
                            <div className="text-[#F2F5F8] font-semibold">
                              {selectedAdminProduct.iraqMarket.strength} •{' '}
                              {selectedAdminProduct.iraqMarket.dosageForm}
                            </div>
                          </div>
                          <div>
                            <span className="text-[#B8C3CC]">Iraq Registration:</span>
                            <div className="text-[#38C976] font-mono font-semibold">
                              {selectedAdminProduct.iraqMarket.registrationNumber}
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-[#B8C3CC]">Approved Indications:</span>
                            <div className="text-[#F2F5F8] mt-0.5">
                              {selectedAdminProduct.iraqMarket.approvedIndicationsEn}
                            </div>
                          </div>
                          <div>
                            <span className="text-[#B8C3CC]">Private Media Objects:</span>
                            <div className="text-[#F2F5F8] font-semibold">
                              {selectedAdminProduct.media.length} item(s) in
                              catalog-product-media
                            </div>
                          </div>
                          <div>
                            <span className="text-[#B8C3CC]">Private PDF Brochures:</span>
                            <div className="text-[#F2F5F8] font-semibold">
                              {selectedAdminProduct.brochures.length} file(s) in
                              catalog-brochures
                            </div>
                          </div>
                        </div>

                        {/* Governance Decision Form */}
                        <div className="space-y-3 pt-2 border-t border-[#51616D]">
                          <label className="block text-[12px] font-bold text-[#F2F5F8]">
                            Mandatory Governance Reason (Required for Request Changes or
                            Hide)
                          </label>
                          <textarea
                            rows={2}
                            value={adminActionReason}
                            onChange={(e) => setAdminActionReason(e.target.value)}
                            placeholder="Enter formal clinical review note or governance reason..."
                            className="w-full p-3 rounded-[10px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          {adminActionError && (
                            <div className="p-3 rounded-[10px] bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[12px] font-semibold">
                              {adminActionError}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2.5">
                            {(selectedAdminProduct.status ===
                              ProductLifecycleStatus.Submitted ||
                              selectedAdminProduct.status ===
                                ProductLifecycleStatus.Hidden) && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminPublishProduct(selectedAdminProduct)
                                }
                                className="px-4 py-2 rounded-[10px] bg-[#193D2D] hover:bg-[#2F8F5C]/40 border border-[#2F8F5C] text-[#38C976] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Approve & Publish to Official Catalog</span>
                              </button>
                            )}

                            {selectedAdminProduct.status ===
                              ProductLifecycleStatus.Submitted && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminRequestChanges(selectedAdminProduct)
                                }
                                className="px-4 py-2 rounded-[10px] bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>Request Changes</span>
                              </button>
                            )}

                            {selectedAdminProduct.status !==
                              ProductLifecycleStatus.Hidden && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminHideProduct(selectedAdminProduct)
                                }
                                className="px-4 py-2 rounded-[10px] bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                              >
                                <EyeOff className="w-4 h-4" />
                                <span>Hide from Discovery</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* Immutable Audit Log Panel */}
                    <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5">
                      <h3 className="text-[15px] font-bold text-[#F2F5F8] mb-3">
                        Immutable Governance & Storage Audit Log
                      </h3>
                      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                        {auditLogs.map((entry) => (
                          <div
                            key={entry.id}
                            className="p-3 rounded-[10px] bg-[#304451]/70 border border-[#51616D] text-[12px]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-[#5DB4F2]">
                                {entry.action}
                              </span>
                              <span className="text-[11px] text-[#B8C3CC]">
                                {entry.timestamp}
                              </span>
                            </div>
                            <div className="text-[#F2F5F8] font-semibold mt-1">
                              {entry.targetName} —{' '}
                              <span className="text-[#B8C3CC] font-normal">
                                by {entry.actorName} ({entry.actorRole})
                              </span>
                            </div>
                            <p className="text-[#B8C3CC] text-[11px] mt-0.5">
                              {entry.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ===============================================================
                ADMIN TAB 2: MANAGE SEARCH LISTS (COMPANIES, DRUG CLASSES, SPECIALTIES)
            =============================================================== */}
            {adminViewMode === 'search_lists' && (
              <div className="space-y-5">
                <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[20px] font-bold text-[#F2F5F8]">
                        Search Class Lists Management
                      </h2>
                      <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                        Add new items, edit names, or hide/remove subclasses across
                        Companies, Drug Classes, and Medical Specialties. Changes update
                        the Doctor Catalog search bar immediately.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdminSearchListTab('companies')}
                        className={`px-3.5 py-1.5 rounded-[10px] text-[12px] font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                          adminSearchListTab === 'companies'
                            ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                            : 'bg-[#304451] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Companies List</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAdminSearchListTab('drug_classes')}
                        className={`px-3.5 py-1.5 rounded-[10px] text-[12px] font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                          adminSearchListTab === 'drug_classes'
                            ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                            : 'bg-[#304451] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                        }`}
                      >
                        <Pill className="w-3.5 h-3.5" />
                        <span>Drug Classes List</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAdminSearchListTab('specialties')}
                        className={`px-3.5 py-1.5 rounded-[10px] text-[12px] font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                          adminSearchListTab === 'specialties'
                            ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                            : 'bg-[#304451] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                        }`}
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>Specialties List</span>
                      </button>
                    </div>
                  </div>

                  {/* 1. COMPANIES SEARCH LIST MANAGER */}
                  {adminSearchListTab === 'companies' && (
                    <div className="space-y-4 pt-2 border-t border-[#51616D]">
                      <form
                        onSubmit={handleAdminAddCompany}
                        className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4 space-y-3"
                      >
                        <div className="text-[13px] font-bold text-[#5DB4F2] flex items-center gap-1.5">
                          <Plus className="w-4 h-4" />
                          <span>
                            Add New Company to List (With Assigned Login Email & Temporary
                            Password)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            required
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                            placeholder="Company Name (e.g. Al-Mansour Pharma) *"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="email"
                            required
                            value={newCompanyEmail}
                            onChange={(e) => setNewCompanyEmail(e.target.value)}
                            placeholder="Company Admin Login Email (e.g. admin@company.iq) *"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#5DB4F2] text-[13px] font-mono text-[#F2F5F8]"
                          />
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              required
                              value={newCompanyTempPassword}
                              onChange={(e) => setNewCompanyTempPassword(e.target.value)}
                              placeholder="Temporary Password *"
                              className="flex-1 px-3 py-2 rounded-[8px] bg-[#263744] border border-[#F59E0B] text-[13px] font-mono text-[#F2F5F8]"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setNewCompanyTempPassword(generateRandomTempPassword('Temp'))
                              }
                              title="Generate new temporary password"
                              className="px-2.5 py-2 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#51616D] text-[11px] font-bold text-[#F59E0B] shrink-0 cursor-pointer"
                            >
                              Generate
                            </button>
                          </div>
                          <input
                            type="text"
                            value={newCompanyLegalName}
                            onChange={(e) => setNewCompanyLegalName(e.target.value)}
                            placeholder="Legal Name (e.g. Al-Mansour Industries Ltd.)"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newCompanyPhone}
                            onChange={(e) => setNewCompanyPhone(e.target.value)}
                            placeholder="Contact Phone (+964...)"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newCompanyDescription}
                            onChange={(e) => setNewCompanyDescription(e.target.value)}
                            placeholder="Company Profile Description"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] text-[#B8C3CC]">
                            The company signs in from the main Doctor Sign In page using the
                            assigned email + temporary password, then changes it in Security
                            Settings.
                          </span>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Company & Create Temp Password</span>
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                        {companiesList.map((comp) => {
                          const isEditing = editingCompanyId === comp.id;
                          const isVisible = comp.status === 'verified';
                          const isTemp = comp.isTemporaryPassword !== false;
                          return (
                            <div
                              key={comp.id}
                              className="p-3.5 rounded-[10px] bg-[#304451]/70 border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                            >
                              {isEditing ? (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2">
                                  <input
                                    type="text"
                                    value={editCompanyName}
                                    onChange={(e) => setEditCompanyName(e.target.value)}
                                    placeholder="Company Name"
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#5DB4F2] text-[12px] text-[#F2F5F8]"
                                  />
                                  <input
                                    type="email"
                                    value={editCompanyEmail}
                                    onChange={(e) => setEditCompanyEmail(e.target.value)}
                                    placeholder="Assigned Login Email"
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#5DB4F2] text-[12px] font-mono text-[#F2F5F8]"
                                  />
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={editCompanyTempPassword}
                                      onChange={(e) =>
                                        setEditCompanyTempPassword(e.target.value)
                                      }
                                      placeholder="Temp / Reset Password"
                                      className="flex-1 px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#F59E0B] text-[12px] font-mono text-[#F2F5F8]"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEditCompanyTempPassword(
                                          generateRandomTempPassword('Temp')
                                        )
                                      }
                                      className="px-2 py-1.5 rounded bg-[#263744] border border-[#51616D] text-[11px] font-bold text-[#F59E0B] cursor-pointer"
                                    >
                                      Gen
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={editCompanyDescription}
                                    onChange={(e) =>
                                      setEditCompanyDescription(e.target.value)
                                    }
                                    placeholder="Description"
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                                  />
                                </div>
                              ) : (
                                <div className="min-w-0 flex-1 space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => openAdminCompanyPage(comp.id)}
                                      className="text-[14px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left cursor-pointer"
                                    >
                                      {comp.companyName}
                                    </button>
                                    <span
                                      className={`text-[11px] font-bold ${
                                        isVisible ? 'text-[#38C976]' : 'text-[#F59E0B]'
                                      }`}
                                    >
                                      · {isVisible ? 'Active in Search' : 'Hidden'}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#B8C3CC]">
                                    <span>
                                      Login:{' '}
                                      <code className="text-[#5DB4F2] font-bold">
                                        {comp.contactEmail}
                                      </code>
                                    </span>
                                    <span className="text-[#51616D]">•</span>
                                    {isTemp ? (
                                      <span className="text-[#F59E0B] font-mono text-[11px]">
                                        Temp Password:{' '}
                                        <strong>{comp.password || 'Temp#2026'}</strong>
                                      </span>
                                    ) : (
                                      <span className="text-[#38C976] text-[11px] font-semibold">
                                        Password Changed by Company
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap items-center gap-2">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminSaveCompanyEdit(comp.id)}
                                      className="px-3 py-1 rounded bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold cursor-pointer"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingCompanyId(null)}
                                      className="px-3 py-1 rounded bg-[#263744] border border-[#51616D] text-[#B8C3CC] text-[11px] font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedAdminCompanyId(comp.id);
                                        setAdminViewMode('company_pages');
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[11px] font-bold cursor-pointer"
                                    >
                                      Enter Company Page
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingCompanyId(comp.id);
                                        setEditCompanyName(comp.companyName);
                                        setEditCompanyLegalName(comp.legalName);
                                        setEditCompanyDescription(comp.description);
                                        setEditCompanyWebsite(comp.websiteUrl);
                                        setEditCompanyEmail(comp.contactEmail);
                                        setEditCompanyPhone(comp.contactPhone);
                                        setEditCompanyTempPassword(
                                          comp.password || 'Temp#2026'
                                        );
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Edit Email / Temp Password</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAdminToggleCompanyVisibility(comp)
                                      }
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                    >
                                      {isVisible ? 'Hide' : 'Show'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminDeleteCompany(comp)}
                                      className="px-2.5 py-1 rounded bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Remove</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. DRUG CLASSES SEARCH LIST MANAGER */}
                  {adminSearchListTab === 'drug_classes' && (
                    <div className="space-y-4 pt-2 border-t border-[#51616D]">
                      <form
                        onSubmit={handleAdminAddDrugClass}
                        className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4 space-y-3"
                      >
                        <div className="text-[13px] font-bold text-[#5DB4F2] flex items-center gap-1.5">
                          <Plus className="w-4 h-4" />
                          <span>Add New Drug Class to Search List</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            required
                            value={newDrugClassName}
                            onChange={(e) => setNewDrugClassName(e.target.value)}
                            placeholder="Drug Class Name (e.g. SGLT2 Inhibitors) *"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newDrugClassCode}
                            onChange={(e) => setNewDrugClassCode(e.target.value)}
                            placeholder="Code (optional)"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newDrugClassDescription}
                            onChange={(e) => setNewDrugClassDescription(e.target.value)}
                            placeholder="Clinical Description"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Drug Class</span>
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                        {drugClassesList.map((dc) => {
                          const isEditing = editingDrugClassId === dc.id;
                          return (
                            <div
                              key={dc.id}
                              className="p-3.5 rounded-[10px] bg-[#304451]/70 border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                            >
                              {isEditing ? (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={editDrugClassName}
                                    onChange={(e) => setEditDrugClassName(e.target.value)}
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#5DB4F2] text-[12px] text-[#F2F5F8]"
                                  />
                                  <input
                                    type="text"
                                    value={editDrugClassDescription}
                                    onChange={(e) =>
                                      setEditDrugClassDescription(e.target.value)
                                    }
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                                  />
                                </div>
                              ) : (
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-bold text-[#F2F5F8]">
                                      {dc.nameEn}
                                    </span>
                                    <span
                                      className={`text-[11px] font-bold ${
                                        dc.isActive ? 'text-[#38C976]' : 'text-[#F59E0B]'
                                      }`}
                                    >
                                      · {dc.isActive ? 'Active in Search' : 'Hidden'}
                                    </span>
                                  </div>
                                  <div className="text-[12px] text-[#B8C3CC] truncate">
                                    {dc.descriptionEn}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminSaveDrugClassEdit(dc.id)}
                                      className="px-3 py-1 rounded bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold cursor-pointer"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingDrugClassId(null)}
                                      className="px-3 py-1 rounded bg-[#263744] border border-[#51616D] text-[#B8C3CC] text-[11px] font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingDrugClassId(dc.id);
                                        setEditDrugClassName(dc.nameEn);
                                        setEditDrugClassDescription(dc.descriptionEn);
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAdminToggleDrugClassVisibility(dc)
                                      }
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                    >
                                      {dc.isActive ? 'Hide' : 'Show'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminDeleteDrugClass(dc)}
                                      className="px-2.5 py-1 rounded bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Remove</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. MEDICAL SPECIALTIES SEARCH LIST MANAGER */}
                  {adminSearchListTab === 'specialties' && (
                    <div className="space-y-4 pt-2 border-t border-[#51616D]">
                      <form
                        onSubmit={handleAdminAddSpecialty}
                        className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4 space-y-3"
                      >
                        <div className="text-[13px] font-bold text-[#5DB4F2] flex items-center gap-1.5">
                          <Plus className="w-4 h-4" />
                          <span>Add New Medical Specialty to Search List</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            required
                            value={newSpecialtyName}
                            onChange={(e) => setNewSpecialtyName(e.target.value)}
                            placeholder="Specialty Name (e.g. Interventional Cardiology) *"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newSpecialtyCode}
                            onChange={(e) => setNewSpecialtyCode(e.target.value)}
                            placeholder="Specialty Code (optional)"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                          <input
                            type="text"
                            value={newSpecialtyDescription}
                            onChange={(e) => setNewSpecialtyDescription(e.target.value)}
                            placeholder="Specialty Description"
                            className="px-3 py-2 rounded-[8px] bg-[#263744] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Specialty</span>
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                        {specialtiesList.map((sp) => {
                          const isEditing = editingSpecialtyId === sp.id;
                          return (
                            <div
                              key={sp.id}
                              className="p-3.5 rounded-[10px] bg-[#304451]/70 border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                            >
                              {isEditing ? (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={editSpecialtyName}
                                    onChange={(e) => setEditSpecialtyName(e.target.value)}
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#5DB4F2] text-[12px] text-[#F2F5F8]"
                                  />
                                  <input
                                    type="text"
                                    value={editSpecialtyCode}
                                    onChange={(e) => setEditSpecialtyCode(e.target.value)}
                                    className="px-2.5 py-1.5 rounded bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                                  />
                                </div>
                              ) : (
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-bold text-[#F2F5F8]">
                                      {sp.nameEn}
                                    </span>
                                    <span className="text-[11px] font-mono text-[#5DB4F2]">
                                      ({sp.code})
                                    </span>
                                    <span
                                      className={`text-[11px] font-bold ${
                                        sp.isActive ? 'text-[#38C976]' : 'text-[#F59E0B]'
                                      }`}
                                    >
                                      · {sp.isActive ? 'Active in Search' : 'Hidden'}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminSaveSpecialtyEdit(sp.id)}
                                      className="px-3 py-1 rounded bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold cursor-pointer"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingSpecialtyId(null)}
                                      className="px-3 py-1 rounded bg-[#263744] border border-[#51616D] text-[#B8C3CC] text-[11px] font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingSpecialtyId(sp.id);
                                        setEditSpecialtyName(sp.nameEn);
                                        setEditSpecialtyCode(sp.code);
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAdminToggleSpecialtyVisibility(sp)
                                      }
                                      className="px-2.5 py-1 rounded bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                    >
                                      {sp.isActive ? 'Hide' : 'Show'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminDeleteSpecialty(sp)}
                                      className="px-2.5 py-1 rounded bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===============================================================
                ADMIN TAB 3: PAID HOME MEDICATIONS (HOME PAGE AD SPACE)
            =============================================================== */}
            {adminViewMode === 'paid_home' && (
              <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                <div>
                  <h2 className="text-[20px] font-bold text-[#F2F5F8]">
                    Doctor Home Page Ad Space Medications ({paidHomeProductIds.length} Active)
                  </h2>
                  <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                    Select which published medications appear on the Doctor Catalog Home
                    Page as paid ad placements. When a physician presses any of these
                    selected medications on the Home Page, it takes them directly to the
                    owning Company Page.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#51616D]">
                  {publishedOfficialProducts.map((product) => {
                    const isPaidSelected = paidHomeProductIds.includes(product.id);
                    const companyName = getCompanyName(product.companyId);
                    const generic = DEMO_GENERIC_DRUGS.find(
                      (g) => g.id === product.genericDrugId
                    );
                    return (
                      <div
                        key={product.id}
                        className={`p-4 rounded-[12px] border flex flex-col justify-between gap-3 transition ${
                          isPaidSelected
                            ? 'bg-[#304451] border-[#F59E0B]'
                            : 'bg-[#1F2D38] border-[#51616D]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[11px] font-bold ${
                                isPaidSelected ? 'text-[#F59E0B]' : 'text-[#B8C3CC]'
                              }`}
                            >
                              {isPaidSelected
                                ? 'Active Home Page Ad Placement'
                                : 'Standard Catalog Product'}
                            </span>
                            <span className="text-[11px] text-[#38C976] font-semibold">
                              Published
                            </span>
                          </div>

                          <h3 className="text-[18px] font-bold text-[#F2F5F8] mt-1.5">
                            {product.brandNameEn}
                          </h3>
                          <p className="text-[13px] text-[#5DB4F2] font-semibold">
                            {generic?.nameEn ?? 'Generic drug'}
                          </p>
                          <p className="text-[12px] text-[#B8C3CC] mt-2">
                            Target Company Page:{' '}
                            <strong className="text-[#F2F5F8]">{companyName}</strong>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#51616D]/60">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAdminTogglePaidHomeProduct(product)}
                              className={`px-3.5 py-1.5 rounded-[8px] border text-[12px] font-bold cursor-pointer transition ${
                                isPaidSelected
                                  ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                                  : 'bg-[#1769AA] hover:bg-[#1E78BA] border-[#5DB4F2] text-[#F2F5F8]'
                              }`}
                            >
                              {isPaidSelected
                                ? 'Remove from Home Ad Space'
                                : 'Add to Home Ad Space'}
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditDraftModal(product)}
                              className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] hover:bg-[#3A5262] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold cursor-pointer"
                            >
                              Edit Product
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAdminCompanyId(product.companyId);
                              setAdminViewMode('company_pages');
                            }}
                            className="text-[12px] font-semibold text-[#5DB4F2] hover:underline cursor-pointer"
                          >
                            Admin Company Page →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===============================================================
                ADMIN TAB 4: MEMBERS DIRECTORY (DOCTORS SIGN-UP & COMPANIES SIGN-UP)
            =============================================================== */}
            {adminViewMode === 'access_accounts' && (
              <div className="space-y-6">
                {selectedAdminDoctor ? (
                  /* INSIDE SPECIFIC DOCTOR MEMBER PAGE (ADMIN MANAGEMENT VIEW) */
                  <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAdminDoctorId(null);
                            setEditingDoctorId(null);
                          }}
                          className="w-10 h-10 rounded-[10px] bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] flex items-center justify-center text-[#F2F5F8] transition cursor-pointer"
                          title="Back to All Signed-Up Members"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-[20px] font-bold text-[#F2F5F8]">
                              Admin Doctor Member Page — {selectedAdminDoctor.fullName}
                            </h2>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                selectedAdminDoctor.verificationStatus === 'approved'
                                  ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                  : 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                              }`}
                            >
                              {selectedAdminDoctor.verificationStatus === 'approved'
                                ? 'Verified Physician'
                                : 'Pending Verification'}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#B8C3CC]">
                            Inspect or edit this physician&apos;s sign-up profile, manage their
                            verification status, or open their live Doctor Catalog page.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleAdminToggleDoctorVerification(selectedAdminDoctor.profileId)
                          }
                          className={`px-3.5 py-2 rounded-[10px] border text-[12px] font-bold cursor-pointer transition ${
                            selectedAdminDoctor.verificationStatus === 'approved'
                              ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                              : 'bg-[#193D2D] border-[#2F8F5C] text-[#38C976]'
                          }`}
                        >
                          {selectedAdminDoctor.verificationStatus === 'approved'
                            ? 'Set Pending Verification'
                            : 'Approve Physician Now'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAdminInspectingMember(true);
                            switchRoleAndWorkspace(selectedAdminDoctor.profileId, 'doctor');
                          }}
                          className="px-4 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Stethoscope className="w-4 h-4" />
                          <span>
                            Open Doctor&apos;s Live Catalog Page (as {selectedAdminDoctor.fullName}) →
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Doctor Member Profile Card with Inline Admin Editor */}
                    <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-[12px] bg-[#123F68] border border-[#5DB4F2]/60 flex items-center justify-center shrink-0">
                            <Stethoscope className="w-7 h-7 text-[#5DB4F2]" />
                          </div>
                          <div>
                            <h3 className="text-[24px] font-extrabold text-[#F2F5F8]">
                              {selectedAdminDoctor.fullName}
                            </h3>
                            <p className="text-[14px] font-mono font-semibold text-[#5DB4F2]">
                              {selectedAdminDoctor.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {editingDoctorId === selectedAdminDoctor.profileId ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAdminSaveDoctorEdit(selectedAdminDoctor.profileId)
                                }
                                className="px-3.5 py-1.5 rounded-[8px] bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[12px] font-bold cursor-pointer"
                              >
                                Save Doctor Changes
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingDoctorId(null)}
                                className="px-3.5 py-1.5 rounded-[8px] bg-[#304451] border border-[#51616D] text-[#B8C3CC] text-[12px] font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingDoctorId(selectedAdminDoctor.profileId);
                                setEditDoctorFullName(selectedAdminDoctor.fullName);
                                setEditDoctorEmail(selectedAdminDoctor.email);
                                setEditDoctorSpecialty(
                                  selectedAdminDoctor.specialty ?? 'Cardiology'
                                );
                                setEditDoctorWorkplace(
                                  selectedAdminDoctor.workplace ??
                                    'Baghdad Teaching Hospital, Iraq'
                                );
                                setEditDoctorLicense(
                                  selectedAdminDoctor.licenseNumber ?? 'IQ-IMA-2026'
                                );
                                setEditDoctorPhone(
                                  selectedAdminDoctor.phone ?? '+964 770 000 0000'
                                );
                                setEditDoctorPassword(
                                  selectedAdminDoctor.password ?? 'Doctor#2026'
                                );
                              }}
                              className="px-3.5 py-1.5 rounded-[8px] bg-[#304451] hover:bg-[#3A5262] border border-[#5DB4F2] text-[#F2F5F8] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#5DB4F2]" />
                              <span>Edit Doctor Profile & Credentials</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {editingDoctorId === selectedAdminDoctor.profileId ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-[#51616D]">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Physician Full Name
                            </label>
                            <input
                              type="text"
                              value={editDoctorFullName}
                              onChange={(e) => setEditDoctorFullName(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Doctor Login Email
                            </label>
                            <input
                              type="email"
                              value={editDoctorEmail}
                              onChange={(e) => setEditDoctorEmail(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] font-mono text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Medical Specialty
                            </label>
                            <select
                              value={editDoctorSpecialty}
                              onChange={(e) => setEditDoctorSpecialty(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            >
                              {specialtiesList.map((sp) => (
                                <option key={sp.id} value={sp.nameEn}>
                                  {sp.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Iraq Medical Syndicate License #
                            </label>
                            <input
                              type="text"
                              value={editDoctorLicense}
                              onChange={(e) => setEditDoctorLicense(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] font-mono text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Hospital / Clinical Workplace
                            </label>
                            <input
                              type="text"
                              value={editDoctorWorkplace}
                              onChange={(e) => setEditDoctorWorkplace(e.target.value)}
                              className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#B8C3CC] mb-1">
                              Mobile Phone & Password
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={editDoctorPhone}
                                onChange={(e) => setEditDoctorPhone(e.target.value)}
                                placeholder="+964..."
                                className="px-2.5 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                              />
                              <input
                                type="text"
                                value={editDoctorPassword}
                                onChange={(e) => setEditDoctorPassword(e.target.value)}
                                placeholder="Password"
                                className="px-2.5 py-2 rounded-[8px] bg-[#1F2D38] border border-[#F59E0B] text-[12px] font-mono text-[#F2F5F8]"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#51616D]/60 text-[12px]">
                          <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                            <div className="text-[#B8C3CC]">Medical Specialty</div>
                            <div className="text-[#5DB4F2] font-bold mt-0.5">
                              {selectedAdminDoctor.specialty ?? 'Internal Medicine'}
                            </div>
                          </div>
                          <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                            <div className="text-[#B8C3CC]">Iraq Syndicate License #</div>
                            <div className="text-[#F2F5F8] font-mono font-bold mt-0.5">
                              {selectedAdminDoctor.licenseNumber ?? 'IQ-IMA-2026'}
                            </div>
                          </div>
                          <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                            <div className="text-[#B8C3CC]">Hospital / Workplace</div>
                            <div className="text-[#F2F5F8] font-semibold truncate mt-0.5">
                              {selectedAdminDoctor.workplace ??
                                'Baghdad Medical City, Iraq'}
                            </div>
                          </div>
                          <div className="bg-[#304451]/60 border border-[#51616D] rounded-[10px] p-3">
                            <div className="text-[#B8C3CC]">Contact Phone & Access</div>
                            <div className="text-[#F2F5F8] font-mono font-semibold mt-0.5">
                              {selectedAdminDoctor.phone ?? '+964 770 000 0000'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Specialty-Matched Catalog Medications for this Doctor */}
                    <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                            Official Catalog Access Preview for {selectedAdminDoctor.fullName}
                          </h3>
                          <p className="text-[12px] text-[#B8C3CC]">
                            Published clinical monographs visible to this physician in the
                            official Iraq catalog ({publishedOfficialProducts.length} total
                            published medications).
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminInspectingMember(true);
                            switchRoleAndWorkspace(selectedAdminDoctor.profileId, 'doctor');
                          }}
                          className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold cursor-pointer"
                        >
                          Enter Full Doctor Catalog as {selectedAdminDoctor.fullName} →
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#51616D]">
                        {publishedOfficialProducts.map((product) => {
                          const generic = DEMO_GENERIC_DRUGS.find(
                            (g) => g.id === product.genericDrugId
                          );
                          return (
                            <div
                              key={product.id}
                              className="p-4 rounded-[12px] bg-[#1F2D38] border border-[#51616D] flex flex-wrap items-center justify-between gap-3"
                            >
                              <div>
                                <div className="text-[15px] font-bold text-[#F2F5F8]">
                                  {product.brandNameEn}
                                </div>
                                <div className="text-[12px] font-semibold text-[#5DB4F2]">
                                  {generic?.nameEn ?? 'Generic drug'} •{' '}
                                  {product.iraqMarket.strength}
                                </div>
                                <div className="text-[11px] text-[#B8C3CC] mt-0.5">
                                  Company:{' '}
                                  <button
                                    type="button"
                                    onClick={() => openAdminCompanyPage(product.companyId)}
                                    className="text-[#5DB4F2] font-semibold hover:underline cursor-pointer"
                                  >
                                    {getCompanyName(product.companyId)}
                                  </button>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setAdminInspectingMember(true);
                                  switchRoleAndWorkspace(
                                    selectedAdminDoctor.profileId,
                                    'doctor'
                                  );
                                  setSelectedDoctorProductId(product.id);
                                }}
                                className="px-3 py-1.5 rounded-[8px] bg-[#263744] hover:bg-[#304451] border border-[#5DB4F2] text-[#5DB4F2] text-[11px] font-bold cursor-pointer"
                              >
                                View Monograph as Doctor →
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SIDE-BY-SIDE MEMBERS DIRECTORY: DOCTORS SIGN-UP LIST & COMPANIES SIGN-UP LIST */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Doctors Sign-Up Members List */}
                    <div className="lg:col-span-6 bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-[11px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                            PHYSICIAN MEMBERS DIRECTORY
                          </div>
                          <h2 className="text-[19px] font-bold text-[#F2F5F8] mt-0.5">
                            Doctors Sign-Up List ({registeredDoctors.length} Members)
                          </h2>
                          <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                            Press directly on any Doctor&apos;s name below to open their
                            dedicated Doctor Page, inspect credentials, or open their live
                            Doctor Catalog page.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-[#51616D]">
                        {registeredDoctors.map((doc) => {
                          const isApproved = doc.verificationStatus === 'approved';
                          return (
                            <div
                              key={doc.profileId}
                              className="p-4 rounded-[12px] bg-[#1F2D38] hover:bg-[#304451]/50 border border-[#51616D] hover:border-[#5DB4F2] flex flex-wrap items-center justify-between gap-3 transition"
                            >
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openAdminDoctorPage(doc.profileId)}
                                    title={`Press to open Doctor Page for ${doc.fullName}`}
                                    className="text-[16px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Stethoscope className="w-4 h-4 shrink-0" />
                                    <span>{doc.fullName}</span>
                                  </button>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                      isApproved
                                        ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                        : 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                                    }`}
                                  >
                                    {isApproved ? 'Verified Physician' : 'Pending Approval'}
                                  </span>
                                </div>
                                <div className="text-[12px] font-mono text-[#F2F5F8]">
                                  {doc.email}
                                </div>
                                <div className="text-[12px] text-[#B8C3CC]">
                                  Specialty:{' '}
                                  <strong className="text-[#F2F5F8]">
                                    {doc.specialty ?? 'Internal Medicine'}
                                  </strong>{' '}
                                  • License:{' '}
                                  <span className="font-mono text-[#F2F5F8]">
                                    {doc.licenseNumber ?? 'IQ-IMA-2026'}
                                  </span>
                                </div>
                                {doc.workplace && (
                                  <div className="text-[11px] text-[#B8C3CC]">
                                    Workplace: {doc.workplace}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openAdminDoctorPage(doc.profileId)}
                                  className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[11px] font-bold cursor-pointer"
                                >
                                  Doctor Page →
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setAdminInspectingMember(true);
                                    switchRoleAndWorkspace(doc.profileId, 'doctor');
                                  }}
                                  className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                >
                                  Live View
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAdminToggleDoctorVerification(doc.profileId)
                                  }
                                  className={`px-3 py-1.5 rounded-[8px] border text-[11px] font-bold cursor-pointer transition ${
                                    isApproved
                                      ? 'bg-[#4A3B1C] border-[#A56F0B] text-[#F59E0B]'
                                      : 'bg-[#193D2D] border-[#2F8F5C] text-[#38C976]'
                                  }`}
                                >
                                  {isApproved ? 'Set Pending' : 'Approve'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Companies Sign-Up Members List */}
                    <div className="lg:col-span-6 bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-4">
                      <div>
                        <div className="text-[11px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                          PHARMACEUTICAL COMPANIES DIRECTORY
                        </div>
                        <h2 className="text-[19px] font-bold text-[#F2F5F8] mt-0.5">
                          Companies Sign-Up List ({companiesList.length} Members)
                        </h2>
                        <p className="text-[12px] text-[#B8C3CC] mt-0.5">
                          Press directly on any Company&apos;s name below to open its Company
                          Page, edit its products, or enter its live Company Admin workspace.
                        </p>
                      </div>

                      {/* Quick Provision Company Account Form */}
                      <form
                        onSubmit={handleAdminAddCompany}
                        className="p-3.5 rounded-[12px] bg-[#1F2D38] border border-[#51616D] space-y-2.5"
                      >
                        <div className="text-[12px] font-bold text-[#5DB4F2] flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Company Member & Create Temporary Password</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            required
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                            placeholder="Company Name *"
                            className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#51616D] text-[12px] text-[#F2F5F8]"
                          />
                          <input
                            type="email"
                            required
                            value={newCompanyEmail}
                            onChange={(e) => setNewCompanyEmail(e.target.value)}
                            placeholder="Company Login Email *"
                            className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#5DB4F2] text-[12px] font-mono text-[#F2F5F8]"
                          />
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              required
                              value={newCompanyTempPassword}
                              onChange={(e) => setNewCompanyTempPassword(e.target.value)}
                              placeholder="Temp Password *"
                              className="flex-1 px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#F59E0B] text-[12px] font-mono text-[#F2F5F8]"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setNewCompanyTempPassword(generateRandomTempPassword('Temp'))
                              }
                              className="px-2 py-1.5 rounded-[8px] bg-[#304451] border border-[#51616D] text-[11px] font-bold text-[#F59E0B] cursor-pointer"
                            >
                              Gen
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Company Email & Temp Password</span>
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1 pt-2 border-t border-[#51616D]">
                        {companiesList.map((comp) => {
                          const isEditingEmail = editingCompanyId === comp.id;
                          const isTemp = comp.isTemporaryPassword !== false;
                          const compProductCount = products.filter(
                            (p) => p.companyId === comp.id
                          ).length;
                          return (
                            <div
                              key={comp.id}
                              className="p-3.5 rounded-[12px] bg-[#1F2D38] hover:bg-[#304451]/50 border border-[#51616D] hover:border-[#5DB4F2] flex flex-wrap items-center justify-between gap-3 transition"
                            >
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openAdminCompanyPage(comp.id)}
                                    title={`Press to open Company Page for ${comp.companyName}`}
                                    className="text-[15px] font-bold text-[#5DB4F2] hover:text-[#F2F5F8] hover:underline text-left flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Building2 className="w-4 h-4 shrink-0" />
                                    <span>{comp.companyName}</span>
                                  </button>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                      isTemp
                                        ? 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                                        : 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                                    }`}
                                  >
                                    {isTemp
                                      ? `Temp Password: ${comp.password || 'Temp#2026'}`
                                      : 'Changed by Company'}
                                  </span>
                                </div>

                                {isEditingEmail ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5">
                                    <input
                                      type="email"
                                      value={editCompanyEmail}
                                      onChange={(e) => setEditCompanyEmail(e.target.value)}
                                      placeholder="Assigned company login email"
                                      className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#5DB4F2] text-[12px] font-mono text-[#F2F5F8]"
                                    />
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="text"
                                        value={editCompanyTempPassword}
                                        onChange={(e) =>
                                          setEditCompanyTempPassword(e.target.value)
                                        }
                                        placeholder="Temporary password"
                                        className="flex-1 px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#F59E0B] text-[12px] font-mono text-[#F2F5F8]"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setEditCompanyTempPassword(
                                            generateRandomTempPassword('Temp')
                                          )
                                        }
                                        className="px-2 py-1.5 rounded-[8px] bg-[#304451] border border-[#51616D] text-[11px] font-bold text-[#F59E0B] cursor-pointer"
                                      >
                                        Gen
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-[12px] text-[#B8C3CC] flex flex-wrap items-center gap-1.5">
                                    <span>Login Email:</span>
                                    <code className="text-[#5DB4F2] font-bold">
                                      {comp.contactEmail}
                                    </code>
                                    <span>•</span>
                                    <span>{compProductCount} product(s)</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                {isEditingEmail ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminSaveCompanyEdit(comp.id)}
                                      className="px-3 py-1.5 rounded-[8px] bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold cursor-pointer"
                                    >
                                      Save Credentials
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingCompanyId(null)}
                                      className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] border border-[#51616D] text-[#B8C3CC] text-[11px] font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => openAdminCompanyPage(comp.id)}
                                      className="px-2.5 py-1.5 rounded-[8px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[11px] font-bold cursor-pointer"
                                    >
                                      Company Page →
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setAdminInspectingMember(true);
                                        setActiveCompanyWorkspaceId(comp.id);
                                        switchRoleAndWorkspace(
                                          'company_admin',
                                          'company',
                                          comp.id
                                        );
                                      }}
                                      className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#5DB4F2] text-[11px] font-semibold cursor-pointer"
                                    >
                                      Live Workspace
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingCompanyId(comp.id);
                                        setEditCompanyName(comp.companyName);
                                        setEditCompanyLegalName(comp.legalName);
                                        setEditCompanyDescription(comp.description);
                                        setEditCompanyWebsite(comp.websiteUrl);
                                        setEditCompanyEmail(comp.contactEmail);
                                        setEditCompanyPhone(comp.contactPhone);
                                        setEditCompanyTempPassword(
                                          comp.password || 'Temp#2026'
                                        );
                                      }}
                                      className="px-2.5 py-1.5 rounded-[8px] bg-[#263744] hover:bg-[#304451] border border-[#51616D] text-[#F2F5F8] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Edit Email / Pass</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            4. UNIFIED CLINICAL SIGN IN & DOCTOR SIGN UP ENTRANCE
               (Doctor-facing portal; Companies & Admin authenticate via their
                assigned email through the same Sign In input without exposing
                internal role switchers or admin/company entrances to Doctors)
        =================================================================== */}
        {activeWorkspace === 'auth' && (
          <div className="max-w-xl mx-auto py-4 space-y-5">
            <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 sm:p-8 space-y-6">
              {/* Portal Header */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-[14px] bg-[#1769AA] border border-[#5DB4F2]/50 flex items-center justify-center mx-auto">
                  <Stethoscope className="w-6 h-6 text-[#F2F5F8]" />
                </div>
                <div className="text-[11px] font-bold text-[#5DB4F2] uppercase tracking-wider">
                  PHARMATY IRAQ CLINICAL GATEWAY
                </div>
                <h1 className="text-[24px] sm:text-[26px] font-extrabold text-[#F2F5F8]">
                  {authMode === 'signin'
                    ? 'Sign In to Pharmaty'
                    : 'Physician Registration (Sign Up)'}
                </h1>
                <p className="text-[13px] text-[#B8C3CC] max-w-md mx-auto leading-relaxed">
                  {authMode === 'signin'
                    ? 'Enter your professional email address and password to access official Iraq clinical drug monographs.'
                    : 'Register as a licensed Healthcare Professional in Iraq to access verified pharmaceutical monographs and scientific brochures.'}
                </p>
              </div>

              {/* Mode Toggle: Sign In vs Doctor Sign Up */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-[12px] bg-[#1F2D38] border border-[#51616D]">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`py-2.5 px-4 rounded-[8px] text-[13px] font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border border-[#5DB4F2]/40'
                      : 'text-[#B8C3CC] hover:text-[#F2F5F8]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`py-2.5 px-4 rounded-[8px] text-[13px] font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-[#1769AA] text-[#F2F5F8] border border-[#5DB4F2]/40'
                      : 'text-[#B8C3CC] hover:text-[#F2F5F8]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Doctor Sign Up</span>
                </button>
              </div>

              {authMode === 'signin' ? (
                /* UNIFIED SIGN IN FORM (Routes Doctors -> Catalog, Company Email -> Company Page/Workspace, Admin Email -> Admin Governance) */
                <form onSubmit={handleInteractiveLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      Professional Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="doctor@hospital.iq"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[14px] text-[#F2F5F8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[14px] text-[#F2F5F8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[14px] font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-[12px] font-semibold text-[#5DB4F2] hover:underline cursor-pointer"
                    >
                      New physician in Iraq? Create a Doctor Account →
                    </button>
                  </div>
                </form>
              ) : (
                /* DOCTOR SIGN UP FORM */
                <form onSubmit={handleDoctorSignUpSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="youremail@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Create your password"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Physician Full Name (Optional — auto-filled from email if blank)
                      </label>
                      <input
                        type="text"
                        value={signupFullName}
                        onChange={(e) => setSignupFullName(e.target.value)}
                        placeholder="Dr. Ahmed Al-Rubaye"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Medical Specialty
                      </label>
                      <select
                        value={signupSpecialty}
                        onChange={(e) => setSignupSpecialty(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      >
                        {specialtiesList.map((sp) => (
                          <option key={sp.id} value={sp.nameEn}>
                            {sp.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Iraq Medical Syndicate License # (Optional)
                      </label>
                      <input
                        type="text"
                        value={signupLicenseNumber}
                        onChange={(e) => setSignupLicenseNumber(e.target.value)}
                        placeholder="IQ-IMA-2026-4810"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Hospital / Clinical Workplace
                      </label>
                      <input
                        type="text"
                        value={signupWorkplace}
                        onChange={(e) => setSignupWorkplace(e.target.value)}
                        placeholder="Baghdad Medical City"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                        Mobile Phone (Iraq)
                      </label>
                      <input
                        type="text"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+964 770 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] text-[13px] text-[#F2F5F8]"
                      />
                    </div>
                  </div>

                  {/* Verification Mode Selector for Testing */}
                  <div className="pt-1">
                    <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1.5">
                      Initial Verification State (Testing Option)
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSignupVerificationMode('approved')}
                        className={`p-3 rounded-[10px] border text-left transition cursor-pointer ${
                          signupVerificationMode === 'approved'
                            ? 'bg-[#193D2D]/60 border-[#2F8F5C] text-[#38C976]'
                            : 'bg-[#1F2D38] border-[#51616D] text-[#B8C3CC]'
                        }`}
                      >
                        <div className="text-[12px] font-bold">
                          Verified Physician (Instant)
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5">
                          Opens Official Catalog immediately
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupVerificationMode('pending')}
                        className={`p-3 rounded-[10px] border text-left transition cursor-pointer ${
                          signupVerificationMode === 'pending'
                            ? 'bg-[#4A3B1C]/60 border-[#A56F0B] text-[#F59E0B]'
                            : 'bg-[#1F2D38] border-[#51616D] text-[#B8C3CC]'
                        }`}
                      >
                        <div className="text-[12px] font-bold">
                          Pending Admin Verification
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5">
                          Queued for Admin approval
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] text-[#F2F5F8] text-[14px] font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Complete Physician Sign Up</span>
                  </button>
                </form>
              )}
            </div>

            {/* Subtle Collapsible Demo Email Helper (Allows testing email-based routing without exposing Admin/Company entrances in the main UI) */}
            <div className="bg-[#263744]/70 border border-[#51616D]/80 rounded-[12px] p-4">
              <button
                type="button"
                onClick={() => setShowDemoCredentialsHelper((prev) => !prev)}
                className="w-full flex items-center justify-between text-left text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
              >
                <span>
                  Testing Reference: Pre-assigned Emails for Unified Entrance Routing
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showDemoCredentialsHelper ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showDemoCredentialsHelper && (
                <div className="mt-3 pt-3 border-t border-[#51616D]/60 space-y-2.5 text-[12px]">
                  <p className="text-[#B8C3CC]">
                    Click any email below to auto-fill the Sign In form and test automatic
                    role routing through the single entrance:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setAuthEmail(DEMO_USERS.doctor.email);
                        setAuthPassword('Doctor#2026');
                      }}
                      className="p-2.5 rounded-[8px] bg-[#1F2D38] hover:bg-[#304451] border border-[#51616D] flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="font-semibold text-[#38C976]">
                        Verified Physician
                      </span>
                      <code className="text-[#F2F5F8] font-mono">
                        {DEMO_USERS.doctor.email}
                      </code>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const azComp = companiesList.find(
                          (c) =>
                            c.contactEmail.toLowerCase() ===
                              'iraq.medinfo@astrazeneca.local' ||
                            c.id === '75000000-0000-4000-8000-000000000012'
                        );
                        setAuthMode('signin');
                        setAuthEmail(
                          azComp?.contactEmail ?? 'iraq.medinfo@astrazeneca.local'
                        );
                        setAuthPassword(azComp?.password ?? 'Temp#2026');
                      }}
                      className="p-2.5 rounded-[8px] bg-[#1F2D38] hover:bg-[#304451] border border-[#51616D] flex flex-wrap items-center justify-between gap-2 text-left cursor-pointer"
                    >
                      <span className="font-semibold text-[#5DB4F2]">
                        AstraZeneca Iraq (Opens Company Admin)
                      </span>
                      <code className="text-[#F2F5F8] font-mono">
                        iraq.medinfo@astrazeneca.local •{' '}
                        {companiesList.find(
                          (c) => c.id === '75000000-0000-4000-8000-000000000012'
                        )?.password ?? 'Temp#2026'}
                      </code>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setAuthEmail(DEMO_USERS.admin.email);
                        setAuthPassword('Admin#2026');
                      }}
                      className="p-2.5 rounded-[8px] bg-[#1F2D38] hover:bg-[#304451] border border-[#51616D] flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="font-semibold text-[#F59E0B]">
                        Platform Admin (Opens Admin Governance)
                      </span>
                      <code className="text-[#F2F5F8] font-mono">
                        {DEMO_USERS.admin.email}
                      </code>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            5. PUBLICATION READINESS & ARCHITECTURE CLOSURE TRACKER
        =================================================================== */}
        {activeWorkspace === 'readiness' && (
          <div className="space-y-6">
            {/* Hero Readiness Banner */}
            <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-[12px] font-bold text-[#5DB4F2]">
                    ARCHITECTURE CLOSURE & RELEASE AUDIT
                  </div>
                  <h1 className="text-[24px] sm:text-[26px] font-extrabold text-[#F2F5F8] tracking-tight mt-1">
                    Where Pharmaty Stands Right Now — Publication Readiness
                  </h1>
                  <p className="text-[14px] text-[#B8C3CC] leading-relaxed mt-1.5">
                    Live diagnostic of the platform against{' '}
                    <code className="text-[#5DB4F2]">ARCHITECTURE_CLOSURE.md</code> and{' '}
                    <code className="text-[#5DB4F2]">docs/PROJECT_STATUS.md</code>. The
                    core Iraq clinical catalog, multi-role governance workflow, and
                    private storage foundation are verified; 3 secondary MVP modules and
                    production credential cutover remain before public release.
                  </p>
                </div>

                <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] px-5 py-4 text-right min-w-[200px]">
                  <div className="text-[11px] font-semibold text-[#B8C3CC]">
                    OVERALL MVP READINESS
                  </div>
                  <div className="text-[32px] font-extrabold font-mono tabular-nums text-[#38C976] mt-0.5">
                    78%
                  </div>
                  <div className="text-[12px] text-[#B8C3CC]">
                    Staging Verified • Pre-Production
                  </div>
                </div>
              </div>

              {/* 4 Key Readiness Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
                <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4">
                  <div className="text-[12px] text-[#B8C3CC]">
                    Database & RLS Foundation
                  </div>
                  <div className="text-[22px] font-extrabold font-mono tabular-nums text-[#38C976] mt-1">
                    31 / 31
                  </div>
                  <div className="text-[12px] text-[#B8C3CC] mt-1">
                    SQL migrations • 24/24 RLS tables enabled
                  </div>
                </div>

                <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4">
                  <div className="text-[12px] text-[#B8C3CC]">
                    Iraq Catalog Taxonomy
                  </div>
                  <div className="text-[22px] font-extrabold font-mono tabular-nums text-[#5DB4F2] mt-1">
                    Verified
                  </div>
                  <div className="text-[12px] text-[#B8C3CC] mt-1">
                    Companies • Specialties • Drug Classes
                  </div>
                </div>

                <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4">
                  <div className="text-[12px] text-[#B8C3CC]">
                    Section 4 Compliant Products
                  </div>
                  <div className="text-[22px] font-extrabold font-mono tabular-nums text-[#38C976] mt-1">
                    {
                      products.filter((p) => {
                        const r = evaluateProductReadiness(p);
                        return r.coreReady && r.mediaReady;
                      }).length
                    }{' '}
                    / {products.length}
                  </div>
                  <div className="text-[12px] text-[#B8C3CC] mt-1">
                    Passing all 10 clinical & storage checks
                  </div>
                </div>

                <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4">
                  <div className="text-[12px] text-[#B8C3CC]">
                    Architecture Closure Phases
                  </div>
                  <div className="text-[22px] font-extrabold font-mono tabular-nums text-[#F59E0B] mt-1">
                    5 Verified · 4 Active
                  </div>
                  <div className="text-[12px] text-[#B8C3CC] mt-1">
                    1 remaining module (Sponsored Search)
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: 10-Phase Architecture Closure Scorecard */}
            <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[19px] font-bold text-[#F2F5F8]">
                    10-Phase Architecture Closure Roadmap (Section 11)
                  </h2>
                  <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                    Exact status of each mandatory implementation phase required before
                    public release.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'all', label: `All Phases (${ARCHITECTURE_CLOSURE_PHASES.length})` },
                      {
                        id: 'verified',
                        label: `Verified (${
                          ARCHITECTURE_CLOSURE_PHASES.filter((p) => p.status === 'verified')
                            .length
                        })`,
                      },
                      {
                        id: 'in_progress',
                        label: `In Progress (${
                          ARCHITECTURE_CLOSURE_PHASES.filter(
                            (p) => p.status === 'in_progress'
                          ).length
                        })`,
                      },
                      {
                        id: 'action_required',
                        label: `Not Started (${
                          ARCHITECTURE_CLOSURE_PHASES.filter(
                            (p) => p.status === 'action_required'
                          ).length
                        })`,
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setReadinessPhaseFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border transition cursor-pointer ${
                        readinessPhaseFilter === tab.id
                          ? 'bg-[#1769AA] border-[#5DB4F2] text-[#F2F5F8]'
                          : 'bg-[#304451] border-[#51616D] text-[#B8C3CC] hover:text-[#F2F5F8]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-[#51616D]/60 border border-[#51616D] rounded-[12px] overflow-hidden">
                {ARCHITECTURE_CLOSURE_PHASES.filter((item) =>
                  readinessPhaseFilter === 'all'
                    ? true
                    : item.status === readinessPhaseFilter
                ).map((item) => (
                  <div
                    key={item.phaseNumber}
                    className="p-4 bg-[#1F2D38] hover:bg-[#304451]/40 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[12px] font-bold text-[#5DB4F2]">
                          {item.phaseNumber}
                        </span>
                        <span className="text-[15px] font-bold text-[#F2F5F8]">
                          {item.title}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            item.status === 'verified'
                              ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
                              : item.status === 'in_progress'
                              ? 'bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B]'
                              : 'bg-[#4B2528] border border-[#A9474E] text-[#FF7272]'
                          }`}
                        >
                          {item.status === 'verified'
                            ? 'Verified'
                            : item.status === 'in_progress'
                            ? 'In Progress'
                            : 'Remaining Blocker'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#B8C3CC]">
                        <strong className="text-[#F2F5F8]">Verified Evidence:</strong>{' '}
                        {item.verifiedEvidence}
                      </p>
                      <p className="text-[12px] text-[#B8C3CC]">
                        <strong className="text-[#F2F5F8]">Next Step:</strong>{' '}
                        {item.remainingWork}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-28 bg-[#263744] h-2 rounded-full overflow-hidden border border-[#51616D]">
                        <div
                          className={`h-full ${
                            item.status === 'verified'
                              ? 'bg-[#38C976]'
                              : item.status === 'in_progress'
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#FF7272]'
                          }`}
                          style={{ width: `${item.completionPct}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-[13px] font-bold text-[#F2F5F8] w-10 text-right">
                        {item.completionPct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Live Section 4 Product Publication Gate Auditor */}
            <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[19px] font-bold text-[#F2F5F8]">
                    Live Section 4 Official Catalog Publication Gate Auditor
                  </h2>
                  <p className="text-[13px] text-[#B8C3CC] mt-0.5">
                    Real-time check of all {products.length} catalog records against the
                    10 mandatory rules in <code className="text-[#5DB4F2]">ARCHITECTURE_CLOSURE.md</code>{' '}
                    Section 4.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => switchRoleAndWorkspace('company_admin', 'company')}
                  className="px-3.5 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold cursor-pointer"
                >
                  Open Company Workspace →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => {
                  const r = evaluateProductReadiness(product);
                  const checks = [
                    { label: 'Verified Company', ok: true },
                    { label: 'English Brand Name', ok: r.hasBrandEn },
                    { label: 'Generic Drug Assigned', ok: r.hasGeneric },
                    { label: 'Drug Class Assigned', ok: r.hasDrugClass },
                    { label: 'Medical Specialty Assigned', ok: r.hasSpecialty },
                    { label: 'Marketed in Iraq Presentation', ok: r.hasMarketedInIraq },
                    { label: 'Clinical Monograph Fields', ok: r.hasClinicalContent },
                    { label: 'Product Image (Private Bucket)', ok: r.hasProductImage },
                    { label: 'Package Image (Private Bucket)', ok: r.hasPackageImage },
                    { label: 'Current PDF Brochure', ok: r.hasCurrentBrochure },
                  ];
                  const passedCount = checks.filter((c) => c.ok).length;
                  const missingLabels = checks.filter((c) => !c.ok).map((c) => c.label);

                  return (
                    <div
                      key={product.id}
                      className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <StatusPill status={product.status} />
                          <span
                            className={`font-mono tabular-nums text-[12px] font-bold ${
                              passedCount === 10 ? 'text-[#38C976]' : 'text-[#F59E0B]'
                            }`}
                          >
                            {passedCount}/10 Section-4 Checks
                          </span>
                        </div>

                        <h3 className="text-[17px] font-bold text-[#F2F5F8] mt-2">
                          {product.brandNameEn}
                        </h3>
                        <p className="text-[12px] text-[#B8C3CC]">
                          {getCompanyName(product.companyId)} •{' '}
                          {product.iraqMarket.strength} / {product.iraqMarket.dosageForm}
                        </p>

                        {missingLabels.length === 0 ? (
                          <div className="mt-3 p-2.5 rounded-[8px] bg-[#193D2D]/60 border border-[#2F8F5C] text-[12px] text-[#38C976] flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>
                              All 10 Section-4 publication requirements satisfied.
                            </span>
                          </div>
                        ) : (
                          <div className="mt-3 p-2.5 rounded-[8px] bg-[#4A3B1C]/60 border border-[#A56F0B] text-[12px] text-[#F59E0B]">
                            <strong>Missing for strict Section-4 gate:</strong>{' '}
                            {missingLabels.join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#51616D]/50">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCompanyProductId(product.id);
                            switchRoleAndWorkspace(
                              'company_admin',
                              'company',
                              product.companyId
                            );
                          }}
                          className="text-[12px] font-semibold text-[#5DB4F2] hover:underline cursor-pointer"
                        >
                          Manage Media & Clinical Draft →
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAdminProductId(product.id);
                            setAdminQueueFilter('all');
                            setAdminViewMode('review_queue');
                            switchRoleAndWorkspace('admin', 'admin');
                          }}
                          className="text-[12px] font-semibold text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
                        >
                          Admin Governance →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Production Go-Live Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#38C976]" />
                  <h3 className="text-[16px] font-bold text-[#F2F5F8]">
                    Ready Now (Staging & Controlled Pilot)
                  </h3>
                </div>
                <ul className="space-y-2 text-[13px] text-[#B8C3CC]">
                  <li>
                    • Official Doctor Catalog with English-only clinical dark UI, search
                    highlighting, and full Iraq company, specialty, and drug class
                    taxonomies.
                  </li>
                  <li>
                    • Complete Company Draft → Submission → Admin Review → Publish /
                    Request Changes / Hide governance workflow.
                  </li>
                  <li>
                    • 31 Supabase SQL migrations and 24 RLS-protected tables with
                    immutable audit logging.
                  </li>
                  <li>
                    • Private storage bucket policies (<code className="text-[#5DB4F2]">catalog-product-media</code>{' '}
                    & <code className="text-[#5DB4F2]">catalog-brochures</code>) and
                    signed PDF preview.
                  </li>
                </ul>
              </div>

              <div className="bg-[#263744] border border-[#51616D] rounded-[16px] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                  <h3 className="text-[16px] font-bold text-[#F2F5F8]">
                    Required Before Public Production Release
                  </h3>
                </div>
                <ul className="space-y-2 text-[13px] text-[#B8C3CC]">
                  <li>
                    • Turn on mandatory media & PDF brochure enforcement gate for all new
                    product publications (Section 4).
                  </li>
                  <li>
                    • Complete remaining 3 secondary MVP tables/screens: Company Team
                    Invitations (<code className="text-[#5DB4F2]">company_invitations</code>),
                    Issue Reports (<code className="text-[#5DB4F2]">reports</code>), and
                    Sponsored Search Campaigns (<code className="text-[#5DB4F2]">campaigns</code>).
                  </li>
                  <li>
                    • Connect production Supabase URL & anon key and remove fake demo seed
                    accounts (<code className="text-[#5DB4F2]">demo_mvp_catalog_seed.sql</code>).
                  </li>
                  <li>
                    • Explicit user approval to merge feature branch Pull Request into{' '}
                    <code className="text-[#5DB4F2]">main</code>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL: CREATE / EDIT OFFICIAL CATALOG PRODUCT
      ===================================================================== */}
      {(isCreatingDraft || editingProductId) && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#263744] border border-[#51616D] rounded-[16px] max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-extrabold text-[#F2F5F8]">
                {isCreatingDraft
                  ? 'Add Official Catalog Medication'
                  : 'Edit Official Catalog Medication'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsCreatingDraft(false);
                  setEditingProductId(null);
                }}
                className="p-1.5 rounded bg-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveDraftForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Owning Company Selector */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Owning Pharmaceutical Company *
                  </label>
                  <select
                    value={formCompanyId}
                    onChange={(e) => setFormCompanyId(e.target.value)}
                    disabled={activeWorkspace !== 'admin' && currentUser.role !== PlatformRole.Admin}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  >
                    {companiesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Catalog Lifecycle Status */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Catalog Lifecycle Status *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(e.target.value as ProductLifecycleStatus)
                    }
                    disabled={activeWorkspace !== 'admin' && currentUser.role !== PlatformRole.Admin}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  >
                    <option value={ProductLifecycleStatus.Published}>Published</option>
                    <option value={ProductLifecycleStatus.Submitted}>Submitted</option>
                    <option value={ProductLifecycleStatus.Draft}>Draft</option>
                    <option value={ProductLifecycleStatus.ChangesRequested}>
                      Changes Requested
                    </option>
                    <option value={ProductLifecycleStatus.Hidden}>Hidden</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBrandNameEn}
                    onChange={(e) => setFormBrandNameEn(e.target.value)}
                    placeholder="e.g. Vasocor 10 mg or Betaloc ZOK 50 mg"
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Generic / Scientific Drug *
                  </label>
                  <select
                    value={formGenericDrugId}
                    onChange={(e) => setFormGenericDrugId(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  >
                    {DEMO_GENERIC_DRUGS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Drug Class *
                  </label>
                  <select
                    value={formDrugClassId}
                    onChange={(e) => setFormDrugClassId(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  >
                    {drugClassesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Primary Medical Specialty *
                  </label>
                  <select
                    value={formSpecialtyIds[0] ?? specialtiesList[0]?.id ?? ''}
                    onChange={(e) => setFormSpecialtyIds([e.target.value])}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  >
                    {specialtiesList.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Strength *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStrength}
                    onChange={(e) => setFormStrength(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Dosage Form *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDosageForm}
                    onChange={(e) => setFormDosageForm(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Route *
                  </label>
                  <input
                    type="text"
                    required
                    value={formRoute}
                    onChange={(e) => setFormRoute(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Pack Size *
                  </label>
                  <input
                    type="text"
                    required
                    value={formPackSize}
                    onChange={(e) => setFormPackSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                  Approved Indications (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formIndications}
                  onChange={(e) => setFormIndications(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Usual Adult Dose *
                  </label>
                  <input
                    type="text"
                    required
                    value={formAdultDose}
                    onChange={(e) => setFormAdultDose(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#B8C3CC] mb-1">
                    Storage Conditions *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStorage}
                    onChange={(e) => setFormStorage(e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D] text-[13px] text-[#F2F5F8]"
                  />
                </div>
              </div>

              {/* Admin Option: Include in Doctor Home Page Ad Space */}
              {(activeWorkspace === 'admin' || currentUser.role === PlatformRole.Admin) && (
                <label className="flex items-center gap-3 p-3.5 rounded-[10px] bg-[#1F2D38] border border-[#A56F0B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPaidHomeAd}
                    onChange={(e) => setFormIsPaidHomeAd(e.target.checked)}
                    className="w-4 h-4 accent-[#F59E0B]"
                  />
                  <div>
                    <div className="text-[13px] font-bold text-[#F59E0B]">
                      Place in Doctor Home Page Ad Space
                    </div>
                    <div className="text-[11px] text-[#B8C3CC]">
                      Features this medication on the Doctor Home Page; clicking it opens the{' '}
                      {getCompanyName(formCompanyId)} Company Page.
                    </div>
                  </div>
                </label>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#51616D]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingDraft(false);
                    setEditingProductId(null);
                  }}
                  className="px-4 py-2 rounded-[10px] bg-[#304451] text-[#B8C3CC] text-[12px] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[10px] bg-[#1769AA] hover:bg-[#1E78BA] text-[#F2F5F8] text-[12px] font-bold cursor-pointer"
                >
                  Save Medication Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: AUTHORIZED SIGNED PDF BROCHURE VIEWER
      ===================================================================== */}
      {signedBrochureModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#263744] border border-[#51616D] rounded-[16px] max-w-xl w-full p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-[10px] bg-[#193D2D] border border-[#2F8F5C] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#38C976]" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#F2F5F8]">
                    Authorized Private Storage Signed URL
                  </h3>
                  <p className="text-[12px] text-[#38C976] font-mono">
                    Token: {signedBrochureModal.signedUrlToken}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSignedBrochureModal(null)}
                className="p-1 rounded bg-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#1F2D38] border border-[#51616D] rounded-[12px] p-4 space-y-2.5 text-[13px]">
              <div className="font-bold text-[#F2F5F8] text-[15px]">
                {signedBrochureModal.brochure.title}
              </div>
              <div className="text-[12px] text-[#B8C3CC] font-mono">
                storage.objects • bucket_id = &apos;catalog-brochures&apos; • name = &apos;
                {signedBrochureModal.brochure.storagePath}&apos;
              </div>
              <p className="text-[#F2F5F8] leading-relaxed pt-2 border-t border-[#51616D]">
                {signedBrochureModal.brochure.summaryNotes}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#B8C3CC]">
                Verified via RLS policy <code className="text-[#5DB4F2]">catalog_storage_read</code>
              </span>
              <button
                type="button"
                onClick={() => setSignedBrochureModal(null)}
                className="px-4 py-2 rounded-[10px] bg-[#1769AA] text-[#F2F5F8] text-[12px] font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: ProductLifecycleStatus }) {
  if (status === ProductLifecycleStatus.Published) {
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] text-[11px] font-bold">
        Published
      </span>
    );
  }
  if (
    status === ProductLifecycleStatus.Submitted ||
    status === ProductLifecycleStatus.ChangesRequested
  ) {
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-[#4A3B1C] border border-[#A56F0B] text-[#F59E0B] text-[11px] font-bold">
        {readableEnum(status)}
      </span>
    );
  }
  if (status === ProductLifecycleStatus.Hidden) {
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-[#4B2528] border border-[#A9474E] text-[#FF7272] text-[11px] font-bold">
        Hidden
      </span>
    );
  }
  return (
    <span className="px-2.5 py-0.5 rounded-full bg-[#253F51] border border-[#46718F] text-[#5DB4F2] text-[11px] font-bold">
      {readableEnum(status)}
    </span>
  );
}

function ReadinessItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-[8px] bg-[#1F2D38] border border-[#51616D]">
      {ok ? (
        <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
      ) : (
        <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
      )}
      <span className={ok ? 'text-[#F2F5F8]' : 'text-[#B8C3CC]'}>{label}</span>
    </div>
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed || !text) {
    return <>{text}</>;
  }

  const rawTokens = Array.from(
    new Set([trimmed, ...trimmed.split(/\s+/).filter(Boolean)])
  ).sort((a, b) => b.length - a.length);

  const escapedTokens = rawTokens.map(escapeRegExp).filter(Boolean);
  if (escapedTokens.length === 0) {
    return <>{text}</>;
  }

  const splitRegex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
  const exactRegex = new RegExp(`^(${escapedTokens.join('|')})$`, 'i');
  const parts = text.split(splitRegex);

  return (
    <>
      {parts.map((part, index) =>
        exactRegex.test(part) ? (
          <mark
            key={`${part}-${index}`}
            className="bg-[#123F68] text-[#F2F5F8] border border-[#5DB4F2]/75 px-1 py-0.5 rounded-[4px] font-bold not-italic"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
        )
      )}
    </>
  );
}


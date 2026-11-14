import React, { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Bookmark,
  Building2,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  Pencil,
  Phone,
  Pin,
  Layers,
  Package,
  Pill,
  Power,
  Scale,
  SlidersHorizontal,
  Search,
  Share2,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  Trash2,
  User,
  X,
} from 'lucide-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  THERAPEUTIC_GROUPS,
  buildProductRouteHash,
  classifyDrugTherapeuticGroup,
  groupProductsByTherapeuticClass,
  loadDoctorSponsoredAd,
  loadProductDetail,
  loadRecentDoctorDrugs,
  loadSavedDoctorDrugs,
  loadSpecialtiesCatalog,
  loadVerifiedCompanies,
  parseProductRoute,
  recordCatalogSearchOnce,
  recordProductView,
  recordRecentDoctorDrug,
  recordSponsoredAdEvent,
  searchCatalogProducts,
  searchCatalogProductsByTherapeuticGroup,
  toggleSavedDoctorDrug,
  type CatalogProduct,
  type CompanySummary,
  type DoctorSearchRow,
  type DoctorSponsoredAd,
  type SavedOrRecentDrugItem,
  type TaxonomyItem,
  type TherapeuticGroupKey,
} from '../lib/catalog';
import {
  doctorSelfSignup,
  listSpecialties,
  loadDoctorProfileSummary,
  type Option,
} from '../lib/onboarding';
import { recordAppOpen } from '../lib/notifications';
import {
  ERROR_TOPICS,
  formatCheckedLine,
  loadDrugSources,
  reportDrugError,
  requestMissingDrug,
  type DrugSources,
  type ErrorTopic,
} from '../lib/feedback';
import {
  COMPANY_TYPE_LABELS,
  agentLine,
  manufacturerLine,
} from '../lib/companies';
import {
  COMPANY_DIRECTORY_ROUTE,
  buildCompanyRouteHash,
  companyFacts,
  companyMediaUrl,
  groupCompanyProducts,
  loadCompanyDirectory,
  loadCompanyPage,
  parseCompanyRoute,
  type CompanyDirectoryEntry,
  type CompanyPage,
} from '../lib/companyPage';
import {
  alternativeSubtitle,
  closeMatchNotice,
  groupAlternatives,
  loadProductAlternatives,
  type ProductAlternative,
} from '../lib/alternatives';
import {
  clearMyAvatar,
  loadMyAvatarUrl,
  loadMyNotebook,
  saveMyAvatar,
  saveMyNotebook,
} from '../lib/doctorProfile';
import { NotificationBell } from './NotificationBell';
import {
  BrandLogo,
  Field,
  LegalFooter,
  buttonClass,
  inputClass,
  secondaryButtonClass,
} from './ui';

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 300;

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function extractDoctorFirstName(fullName: string, email?: string): string | null {
  const cleaned = fullName
    .replace(/^(dr\.?|doctor|د\.?|دكتور)\s+/i, '')
    .trim();
  let firstName = '';
  if (cleaned) {
    firstName = (cleaned.split(/\s+/)[0] ?? '').trim();
  } else {
    const emailLocal = (email ?? '').split('@')[0]?.trim() ?? '';
    const cleanedEmail = emailLocal
      .replace(/^(dr\.?|doctor)[._-]*/i, '')
      .replace(/[._-]+/g, ' ')
      .replace(/\d+$/g, '')
      .trim();
    const firstToken = (cleanedEmail.split(/\s+/)[0] ?? '').trim();
    if (firstToken) {
      firstName =
        firstToken.charAt(0).toUpperCase() + firstToken.slice(1).toLowerCase();
    }
  }
  if (!firstName || firstName.length > 7) return null;
  return firstName;
}

function formatDoctorDisplayTitle(fullName: string): string {
  const cleaned = fullName.trim();
  if (!cleaned) return 'Verified Clinical Physician';
  if (/^(dr\.?|doctor)\b/i.test(cleaned)) {
    return cleaned.replace(/^dr\.?\s+/i, 'Dr. ');
  }
  return `Dr. ${cleaned}`;
}

function getDoctorInitials(fullName: string, email?: string): string {
  const cleaned = fullName
    .replace(/^(dr\.?|doctor|د\.?|دكتور)\s+/i, '')
    .trim();
  if (cleaned) {
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
    }
    return (parts[0]?.slice(0, 2) ?? 'DR').toUpperCase();
  }
  const emailChar = (email ?? '').trim().charAt(0).toUpperCase();
  return emailChar && /[A-Z]/.test(emailChar) ? `D${emailChar}` : 'DR';
}

export function isSponsoredAdVideoUrl(
  url: string | null | undefined
): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!/^https:\/\/[^ ]+$/.test(trimmed)) return false;
  return (
    /\.(mp4|webm|mov|m4v|ogv)(\?[^#]*)?(#.*)?$/i.test(trimmed) ||
    /[?&#](media|type|format)=video\b/i.test(trimmed)
  );
}

export type DoctorNoteCategory =
  | 'clinical_pearl'
  | 'dosing_protocol'
  | 'case_memory'
  | 'conference_study'
  | 'personal_note';

export interface DoctorNotebookEntry {
  id: string;
  title: string;
  body: string;
  category: DoctorNoteCategory;
  pinned: boolean;
  linkedProductId: string | null;
  linkedProductName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorProfileExtras {
  avatarUrl: string;
  quote: string;
  workplace: string;
  clinicalLevel: string;
  boardStatus: string;
}

export const DOCTOR_LEVEL_OPTIONS: readonly string[] = [
  'Resident',
  'Senior House Officer (Rotator)',
  'Specialist',
  'Consultant',
  'General Practitioner',
  'Fellow',
];

export const DOCTOR_BOARD_OPTIONS: readonly string[] = [
  'Board Student (Iraqi Board)',
  'Board Student (Arab Board)',
  'Board Certified',
  'MSc / Higher Diploma',
  'Not a Board Student',
];

export const DOCTOR_NOTE_CATEGORIES: ReadonlyArray<{
  value: DoctorNoteCategory;
  label: string;
}> = [
  { value: 'clinical_pearl', label: 'Clinical Pearl' },
  { value: 'dosing_protocol', label: 'Dosing & Protocol' },
  { value: 'case_memory', label: 'Case Memory' },
  { value: 'conference_study', label: 'Study & Conference' },
  { value: 'personal_note', label: 'Personal Note' },
];

export const PRESET_DOCTOR_QUOTES: readonly string[] = [
  'Wherever the art of medicine is loved, there is also a love of humanity. — Hippocrates',
  'The good physician treats the disease; the great physician treats the patient who has the disease. — Sir William Osler',
  'Medicine is the science of knowing the states of the human body in health and disease. — Ibn Sina',
  'Dedicated to evidence-based prescribing and safe clinical care for every patient.',
];

function getProfileExtrasStorageKey(profileKey: string): string {
  return `pharmaconnect_doctor_profile_extras_v1_${profileKey || 'default'}`;
}

function getNotebookStorageKey(profileKey: string): string {
  return `pharmaconnect_doctor_notebook_v1_${profileKey || 'default'}`;
}

function loadLocalProfileExtras(profileKey: string): DoctorProfileExtras {
  if (typeof window === 'undefined') {
    return {
      avatarUrl: '',
      quote: '',
      workplace: '',
      clinicalLevel: '',
      boardStatus: '',
    };
  }
  try {
    const raw = window.localStorage.getItem(
      getProfileExtrasStorageKey(profileKey)
    );
    if (!raw) {
      return {
        avatarUrl: '',
        quote: '',
        workplace: '',
        clinicalLevel: '',
        boardStatus: '',
      };
    }
    const parsed = JSON.parse(raw) as Partial<DoctorProfileExtras>;
    return {
      avatarUrl: typeof parsed.avatarUrl === 'string' ? parsed.avatarUrl : '',
      quote: typeof parsed.quote === 'string' ? parsed.quote : '',
      workplace: typeof parsed.workplace === 'string' ? parsed.workplace : '',
      clinicalLevel:
        typeof parsed.clinicalLevel === 'string' ? parsed.clinicalLevel : '',
      boardStatus:
        typeof parsed.boardStatus === 'string' ? parsed.boardStatus : '',
    };
  } catch {
    return {
      avatarUrl: '',
      quote: '',
      workplace: '',
      clinicalLevel: '',
      boardStatus: '',
    };
  }
}

function saveLocalProfileExtras(
  profileKey: string,
  extras: DoctorProfileExtras
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      getProfileExtrasStorageKey(profileKey),
      JSON.stringify(extras)
    );
  } catch {
    // Ignore storage quota errors
  }
}

function loadLocalDoctorNotebook(profileKey: string): DoctorNotebookEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(getNotebookStorageKey(profileKey));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is DoctorNotebookEntry =>
          Boolean(item && typeof item.id === 'string' && typeof item.body === 'string')
      )
      .map((item) => ({
        id: item.id,
        title: typeof item.title === 'string' ? item.title : '',
        body: item.body,
        category: DOCTOR_NOTE_CATEGORIES.some((c) => c.value === item.category)
          ? item.category
          : 'clinical_pearl',
        pinned: Boolean(item.pinned),
        linkedProductId:
          typeof item.linkedProductId === 'string' && item.linkedProductId
            ? item.linkedProductId
            : null,
        linkedProductName:
          typeof item.linkedProductName === 'string' && item.linkedProductName
            ? item.linkedProductName
            : null,
        createdAt:
          typeof item.createdAt === 'string'
            ? item.createdAt
            : new Date().toISOString(),
        updatedAt:
          typeof item.updatedAt === 'string'
            ? item.updatedAt
            : new Date().toISOString(),
      }));
  } catch {
    return [];
  }
}

function saveLocalDoctorNotebook(
  profileKey: string,
  entries: DoctorNotebookEntry[]
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      getNotebookStorageKey(profileKey),
      JSON.stringify(entries)
    );
  } catch {
    // Ignore storage quota errors
  }
}

function resizeAvatarFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected image.'));
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!dataUrl || typeof document === 'undefined') {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        try {
          const size = 240;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          const minSide = Math.min(img.width, img.height);
          const sx = Math.max(0, (img.width - minSide) / 2);
          const sy = Math.max(0, (img.height - minSide) / 2);
          ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressed || dataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function formatNoteTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}


export function CatalogBanner({
  tone,
  children,
}: {
  tone: 'error' | 'warn' | 'success';
  children: React.ReactNode;
}) {
  const palette =
    tone === 'error'
      ? 'bg-danger/10 border-danger/40 text-danger'
      : tone === 'warn'
      ? 'bg-warning/10 border-warning/40 text-warning'
      : 'bg-success/10 border-success/40 text-success';
  return (
    <div className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${palette}`}>
      {children}
    </div>
  );
}

interface Props {
  client: SupabaseClient;
  access: AccessResult;
  onSignOut: () => void;
}

export function DoctorCatalog({ client, access, onSignOut }: Props) {
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [specialties, setSpecialties] = useState<TaxonomyItem[]>([]);
  const [physicianSpecialties, setPhysicianSpecialties] = useState<Option[]>([]);

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [therapeuticGroup, setTherapeuticGroup] = useState<
    TherapeuticGroupKey | ''
  >('');
  const [selectedSubclass, setSelectedSubclass] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [rows, setRows] = useState<DoctorSearchRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [closeMatches, setCloseMatches] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sponsoredAd, setSponsoredAd] = useState<DoctorSponsoredAd | null>(null);

  // Saved & Recently Viewed drugs (local on device)
  const [savedOpen, setSavedOpen] = useState(false);
  const [savedDrugs, setSavedDrugs] = useState<SavedOrRecentDrugItem[]>(() =>
    loadSavedDoctorDrugs()
  );
  const [recentDrugs, setRecentDrugs] = useState<SavedOrRecentDrugItem[]>(() =>
    loadRecentDoctorDrugs()
  );
  const [linkCopied, setLinkCopied] = useState(false);

  // My profile state
  const profileStorageKey = access.profileId || access.email || 'default';
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDetailsOpen, setProfileDetailsOpen] = useState(false);
  const [profileSavedListOpen, setProfileSavedListOpen] = useState(false);
  const [profileFullName, setProfileFullName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSpecialtyId, setProfileSpecialtyId] = useState('');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState(
    () => loadLocalProfileExtras(profileStorageKey).avatarUrl
  );
  const [profileQuote, setProfileQuote] = useState(
    () => loadLocalProfileExtras(profileStorageKey).quote
  );
  const [profileWorkplace, setProfileWorkplace] = useState(
    () => loadLocalProfileExtras(profileStorageKey).workplace
  );
  const [profileClinicalLevel, setProfileClinicalLevel] = useState(
    () => loadLocalProfileExtras(profileStorageKey).clinicalLevel
  );
  const [profileBoardStatus, setProfileBoardStatus] = useState(
    () => loadLocalProfileExtras(profileStorageKey).boardStatus
  );
  const [profileBusy, setProfileBusy] = useState(false);
  // The profile opens as a locked, read-only view; fields unlock only after "Edit profile".
  const [profileEditing, setProfileEditing] = useState(false);
  const [profileSaved, setProfileSaved] = useState(() => {
    const localExtras = loadLocalProfileExtras(profileStorageKey);
    return {
      fullName: '',
      phone: '',
      specialtyId: '',
      avatarUrl: localExtras.avatarUrl,
      quote: localExtras.quote,
      workplace: localExtras.workplace,
      clinicalLevel: localExtras.clinicalLevel,
      boardStatus: localExtras.boardStatus,
    };
  });
  const [profileNotice, setProfileNotice] = useState<{
    tone: 'error' | 'ok';
    text: string;
  } | null>(null);

  // Clinical Memory Notebook & Personal Posts state
  const [notebookEntries, setNotebookEntries] = useState<DoctorNotebookEntry[]>(
    () => loadLocalDoctorNotebook(profileStorageKey)
  );
  const [, setNoteComposerOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [noteCategory, setNoteCategory] =
    useState<DoctorNoteCategory>('clinical_pearl');
  const [notePinned, setNotePinned] = useState(false);
  const [noteLinkedProductId, setNoteLinkedProductId] = useState('');
  const [noteSearchQuery] = useState('');
  const [noteCategoryFilter] = useState<
    DoctorNoteCategory | 'all' | 'pinned'
  >('all');

  // Standalone #/product/<id>, #/company/<id>, and #/companies route state
  const [activeProductId, setActiveProductId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? parseProductRoute(window.location.hash) : null
  );
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? parseCompanyRoute(window.location.hash) : null
  );
  const [companiesDirectoryOpen, setCompaniesDirectoryOpen] = useState<boolean>(
    () =>
      typeof window !== 'undefined'
        ? window.location.hash
            .replace(/^#/, '')
            .trim()
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase() === 'companies'
        : false
  );
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(
    null
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // "Can't find this drug? Tell us" sheet state
  const [missingSheetOpen, setMissingSheetOpen] = useState(false);
  const [missingDrugName, setMissingDrugName] = useState('');
  const [missingCompanyName, setMissingCompanyName] = useState('');
  const [missingNote, setMissingNote] = useState('');
  const [missingBusy, setMissingBusy] = useState(false);
  const [missingError, setMissingError] = useState<string | null>(null);
  const [missingSuccess, setMissingSuccess] = useState(false);

  const openMissingDrugSheet = () => {
    setMissingDrugName(query.trim());
    setMissingCompanyName('');
    setMissingNote('');
    setMissingError(null);
    setMissingSuccess(false);
    setMissingSheetOpen(true);
  };

  const handleSubmitMissingDrug = async (e: FormEvent) => {
    e.preventDefault();
    setMissingBusy(true);
    setMissingError(null);
    const res = await requestMissingDrug(client, {
      drugName: missingDrugName,
      companyName: missingCompanyName,
      message: missingNote,
    });
    setMissingBusy(false);
    if (!res.ok) {
      setMissingError(res.message);
      return;
    }
    setMissingSuccess(true);
  };

  const searchReqSeqRef = useRef(0);
  const detailReqSeqRef = useRef(0);
  const searchRecordTrackerRef = useRef<{ lastQuery: string | null }>({
    lastQuery: null,
  });
  const viewedAdIdsRef = useRef<Set<string>>(new Set());

  // Listen to hashchange so #/product/<id>, #/company/<id>, #/companies and phone/browser Back button work seamlessly
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const nextProductId = parseProductRoute(hash);
      const nextCompanyId = parseCompanyRoute(hash);
      const nextDirectoryOpen =
        hash
          .replace(/^#/, '')
          .trim()
          .replace(/^\/+|\/+$/g, '')
          .toLowerCase() === 'companies';
      setActiveProductId(nextProductId);
      setActiveCompanyId(nextCompanyId);
      setCompaniesDirectoryOpen(nextDirectoryOpen);
      setLinkCopied(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Load doctor profile summary immediately on mount so the greeting name, avatar, quote, and notebook resolve right away
  useEffect(() => {
    let active = true;
    const localExtras = loadLocalProfileExtras(profileStorageKey);
    const localNotes = loadLocalDoctorNotebook(profileStorageKey);
    setNotebookEntries(localNotes);

    void client.auth.getUser().then(async (userRes) => {
      if (!active) return;
      const user = userRes.data.user;
      const userId = user?.id;
      const meta = (user?.user_metadata ?? {}) as {
        full_name?: string | null;
        name?: string | null;
        doctor_avatar_url?: string | null;
        doctor_quote?: string | null;
        doctor_workplace?: string | null;
        doctor_clinical_level?: string | null;
        doctor_board_status?: string | null;
        doctor_notebook_v1?: DoctorNotebookEntry[] | null;
      };
      const metaName = (meta.full_name ?? meta.name ?? '').trim();
      const metaAvatar = (meta.doctor_avatar_url ?? '').trim();
      // Pictures live in the doctor-avatars bucket, never in account metadata.
      const resolvedAvatar =
        localExtras.avatarUrl ||
        (metaAvatar && !metaAvatar.startsWith('data:') ? metaAvatar : '') ||
        (await loadMyAvatarUrl(client)) ||
        '';
      if (!active) return;
      const resolvedQuote =
        localExtras.quote || (meta.doctor_quote ?? '').trim();
      const resolvedWorkplace =
        localExtras.workplace || (meta.doctor_workplace ?? '').trim();
      const resolvedLevel =
        localExtras.clinicalLevel || (meta.doctor_clinical_level ?? '').trim();
      const resolvedBoard =
        localExtras.boardStatus || (meta.doctor_board_status ?? '').trim();

      if (localNotes.length === 0) {
        // The notebook is stored privately in the database (doctor_private_data).
        const cloudNotes = await loadMyNotebook<DoctorNotebookEntry>(client);
        if (!active) return;
        if (cloudNotes.ok && cloudNotes.data.length > 0) {
          setNotebookEntries(cloudNotes.data);
          saveLocalDoctorNotebook(profileStorageKey, cloudNotes.data);
        }
      }

      setProfileAvatarUrl(resolvedAvatar);
      setProfileQuote(resolvedQuote);
      setProfileWorkplace(resolvedWorkplace);
      setProfileClinicalLevel(resolvedLevel);
      setProfileBoardStatus(resolvedBoard);
      saveLocalProfileExtras(profileStorageKey, {
        avatarUrl: resolvedAvatar,
        quote: resolvedQuote,
        workplace: resolvedWorkplace,
        clinicalLevel: resolvedLevel,
        boardStatus: resolvedBoard,
      });

      if (metaName) {
        setProfileFullName((prev) => prev || metaName);
      }
      if (userId) {
        void recordAppOpen(client);
        const summary = await loadDoctorProfileSummary(client, userId);
        if (!active) return;
        const resolvedFullName = summary.fullName.trim() || metaName;
        setProfileFullName(resolvedFullName);
        setProfilePhone(summary.phone);
        setProfileSpecialtyId(summary.specialtyId);
        setProfileSaved({
          fullName: resolvedFullName,
          phone: summary.phone,
          specialtyId: summary.specialtyId,
          avatarUrl: resolvedAvatar,
          quote: resolvedQuote,
          workplace: resolvedWorkplace,
          clinicalLevel: resolvedLevel,
          boardStatus: resolvedBoard,
        });
      }
    });
    return () => {
      active = false;
    };
  }, [client, profileStorageKey]);

  // Load verified companies, active specialties, and sponsored ad once on mount
  useEffect(() => {
    let active = true;
    void Promise.all([
      loadVerifiedCompanies(client),
      loadSpecialtiesCatalog(client),
      listSpecialties(client),
      loadDoctorSponsoredAd(client, 0),
    ]).then(([companyList, specialtyList, physicianSpecList, ad]) => {
      if (!active) return;
      setCompanies(companyList);
      setSpecialties(specialtyList);
      setPhysicianSpecialties(physicianSpecList);
      setSponsoredAd(ad);
    });
    return () => {
      active = false;
    };
  }, [client]);

  // Debounce search query by 300 ms
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const activeFilterChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; clear: () => void }> = [];
    if (therapeuticGroup) {
      const g = THERAPEUTIC_GROUPS.find((x) => x.key === therapeuticGroup);
      chips.push({
        key: 'class',
        label: selectedSubclass || g?.shortLabel || 'Drug class',
        clear: () => {
          setTherapeuticGroup('');
          setSelectedSubclass('');
        },
      });
    }
    if (companyId) {
      chips.push({
        key: 'company',
        label: companies.find((c) => c.id === companyId)?.companyName ?? 'Company',
        clear: () => setCompanyId(''),
      });
    }
    if (specialtyId) {
      chips.push({
        key: 'specialty',
        label: specialties.find((sp) => sp.id === specialtyId)?.nameEn ?? 'Specialty',
        clear: () => setSpecialtyId(''),
      });
    }
    return chips;
  }, [therapeuticGroup, selectedSubclass, companyId, specialtyId, companies, specialties]);

  const activeFilterCount = activeFilterChips.length;

  const clearAllFilters = () => {
    setQuery('');
    setDebouncedQuery('');
    setCompanyId('');
    setSpecialtyId('');
    setTherapeuticGroup('');
    setSelectedSubclass('');
  };

  const isSearchingOrFiltering = Boolean(
    query.trim() ||
      debouncedQuery.trim() ||
      companyId ||
      specialtyId ||
      therapeuticGroup
  );

  const runSearch = useCallback(
    async (
      searchQuery: string,
      filterCompanyId: string,
      filterSpecialtyId: string,
      filterGroup: TherapeuticGroupKey | ''
    ) => {
      if (!searchQuery.trim()) {
        searchRecordTrackerRef.current.lastQuery = null;
      }

      if (
        !searchQuery.trim() &&
        !filterCompanyId &&
        !filterSpecialtyId &&
        !filterGroup
      ) {
        searchReqSeqRef.current++;
        setRows([]);
        setTotalCount(0);
        setCloseMatches(false);
        setLoading(false);
        setError(null);
        return;
      }

      const seq = ++searchReqSeqRef.current;
      setLoading(true);
      setError(null);

      const res = filterGroup
        ? await searchCatalogProductsByTherapeuticGroup(client, {
            groupKey: filterGroup,
            query: searchQuery,
            companyId: filterCompanyId || null,
            specialtyId: filterSpecialtyId || null,
          })
        : await searchCatalogProducts(client, {
            query: searchQuery,
            companyId: filterCompanyId || null,
            specialtyId: filterSpecialtyId || null,
            limit: PAGE_SIZE,
            offset: 0,
          });

      if (seq !== searchReqSeqRef.current) {
        return;
      }

      if (!res.ok) {
        setError(res.message);
        setRows([]);
        setTotalCount(0);
        setCloseMatches(false);
      } else {
        setRows(res.data.rows);
        setTotalCount(res.data.totalCount);
        const isClose =
          'closeMatches' in res.data
            ? Boolean(res.data.closeMatches)
            : res.data.rows.length > 0 &&
              res.data.rows.every((r) => r.matchKind === 'close');
        setCloseMatches(isClose);
        void recordCatalogSearchOnce(
          client,
          searchQuery,
          res.data.totalCount,
          searchRecordTrackerRef.current
        );
      }
      setLoading(false);
    },
    [client]
  );

  useEffect(() => {
    setSelectedSubclass('');
    void runSearch(debouncedQuery, companyId, specialtyId, therapeuticGroup);
  }, [runSearch, debouncedQuery, companyId, specialtyId, therapeuticGroup]);

  const handleLoadMore = useCallback(async () => {
    if (
      therapeuticGroup ||
      loading ||
      loadingMore ||
      rows.length >= totalCount
    ) {
      return;
    }
    const seq = searchReqSeqRef.current;
    setLoadingMore(true);
    setError(null);

    const res = await searchCatalogProducts(client, {
      query: debouncedQuery,
      companyId: companyId || null,
      specialtyId: specialtyId || null,
      limit: PAGE_SIZE,
      offset: rows.length,
    });

    if (seq !== searchReqSeqRef.current) {
      setLoadingMore(false);
      return;
    }

    if (!res.ok) {
      setError(res.message);
    } else {
      setRows((prev) => [...prev, ...res.data.rows]);
      if (res.data.rows.length > 0) {
        setTotalCount(res.data.totalCount);
      }
    }
    setLoadingMore(false);
  }, [
    client,
    companyId,
    debouncedQuery,
    loading,
    loadingMore,
    rows.length,
    specialtyId,
    therapeuticGroup,
    totalCount,
  ]);

  // Record anonymous ad view once per session when an active sponsored ad is displayed
  useEffect(() => {
    if (
      sponsoredAd?.adId &&
      !viewedAdIdsRef.current.has(sponsoredAd.adId)
    ) {
      viewedAdIdsRef.current.add(sponsoredAd.adId);
      void recordSponsoredAdEvent(client, sponsoredAd.adId, 'view');
    }
  }, [client, activeProductId, isSearchingOrFiltering, profileOpen, sponsoredAd]);

  // Load single product detail and scroll to top when activeProductId (#/product/<id>) changes
  useEffect(() => {
    if (!activeProductId) {
      setSelectedProduct(null);
      setDetailError(null);
      setDetailLoading(false);
      return;
    }

    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }

    void recordProductView(client, activeProductId);

    const seq = ++detailReqSeqRef.current;
    setDetailLoading(true);
    setDetailError(null);

    void loadProductDetail(client, activeProductId).then((res) => {
      if (seq !== detailReqSeqRef.current) return;
      if (!res.ok) {
        setDetailError(res.message);
        setSelectedProduct(null);
      } else {
        setSelectedProduct(res.data);
        setRecentDrugs(
          recordRecentDoctorDrug({
            productId: res.data.id,
            brandNameEn: res.data.brandNameEn,
            genericNameEn: res.data.genericNameEn,
            strength: res.data.market?.strength ?? null,
            dosageForm: res.data.market?.dosageForm ?? null,
            companyName: res.data.companyName,
          })
        );
      }
      setDetailLoading(false);
    });
  }, [client, activeProductId]);

  const openProductPage = (productId: string) => {
    setSavedOpen(false);
    setProfileOpen(false);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    const targetHash = buildProductRouteHash(productId);
    if (window.location.hash === targetHash) {
      setActiveProductId(productId);
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
    } else {
      window.location.hash = `/product/${encodeURIComponent(productId.trim())}`;
    }
  };

  const openCompanyPage = (targetCompanyId: string) => {
    const clean = targetCompanyId.trim();
    if (!clean) return;
    setSavedOpen(false);
    setProfileOpen(false);
    setActiveProductId(null);
    setCompaniesDirectoryOpen(false);
    const targetHash = buildCompanyRouteHash(clean);
    if (window.location.hash === targetHash) {
      setActiveCompanyId(clean);
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
    } else {
      window.location.hash = targetHash.slice(1);
    }
  };

  const openCompaniesDirectory = () => {
    setSavedOpen(false);
    setProfileOpen(false);
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(true);
    if (typeof window !== 'undefined') {
      if (window.location.hash !== COMPANY_DIRECTORY_ROUTE) {
        window.location.hash = COMPANY_DIRECTORY_ROUTE.slice(1);
      }
      if (typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBackToCatalog = () => {
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    window.location.hash = '/catalog';
  };

  const handleGoHome = () => {
    setQuery('');
    setDebouncedQuery('');
    setCompanyId('');
    setSpecialtyId('');
    setTherapeuticGroup('');
    setSelectedSubclass('');
    setFiltersOpen(false);
    setProfileOpen(false);
    setSavedOpen(false);
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    if (typeof window !== 'undefined' && window.location.hash !== '#/catalog') {
      window.location.hash = '/catalog';
    }
  };

  const handleSearchByGeneric = (genericName: string) => {
    const clean = genericName.trim();
    if (!clean || clean === '—') return;
    setCompanyId('');
    setSpecialtyId('');
    setTherapeuticGroup('');
    setSelectedSubclass('');
    setQuery(clean);
    setDebouncedQuery(clean);
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    window.location.hash = '/catalog';
  };

  const handleFilterByCompany = (targetCompanyId: string, companyName: string) => {
    if (targetCompanyId.trim()) {
      openCompanyPage(targetCompanyId);
      return;
    }
    setSpecialtyId('');
    setTherapeuticGroup('');
    setSelectedSubclass('');
    setCompanyId('');
    setQuery(companyName);
    setDebouncedQuery(companyName);
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    window.location.hash = '/catalog';
  };

  const handleFilterByClass = (
    groupKey: TherapeuticGroupKey,
    subclassLabel?: string
  ) => {
    setTherapeuticGroup(groupKey);
    setSelectedSubclass(subclassLabel ?? '');
    setActiveProductId(null);
    setActiveCompanyId(null);
    setCompaniesDirectoryOpen(false);
    window.location.hash = '/catalog';
  };

  const groupedClasses = useMemo(
    () =>
      groupProductsByTherapeuticClass(rows, (row) => ({
        brandNameEn: row.brandNameEn,
        genericNameEn: row.genericNameEn,
        drugClassNameEn: row.drugClassNameEn,
        category: row.category,
      })),
    [rows]
  );

  const allSubclasses = useMemo(() => {
    const list: Array<{
      groupKey: TherapeuticGroupKey;
      groupLabel: string;
      shortGroupLabel: string;
      subclassLabel: string;
      items: DoctorSearchRow[];
    }> = [];
    for (const grp of groupedClasses) {
      for (const sub of grp.subclasses) {
        list.push(sub);
      }
    }
    return list;
  }, [groupedClasses]);

  const visibleSubclasses = useMemo(() => {
    if (!selectedSubclass) return allSubclasses;
    return allSubclasses.filter((s) => s.subclassLabel === selectedSubclass);
  }, [allSubclasses, selectedSubclass]);

  const handleToggleSaveProduct = (product: CatalogProduct) => {
    setSavedDrugs(
      toggleSavedDoctorDrug({
        productId: product.id,
        brandNameEn: product.brandNameEn,
        genericNameEn: product.genericNameEn,
        strength: product.market?.strength ?? null,
        dosageForm: product.market?.dosageForm ?? null,
        companyName: product.companyName,
      })
    );
  };

  const handleShareProductLink = async (product: CatalogProduct) => {
    if (typeof window === 'undefined') return;
    const shareUrl = window.location.href;
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({
          title: `${product.brandNameEn} — Pharmaty`,
          text: `${product.brandNameEn} (${product.genericNameEn ?? 'Clinical Monograph'})`,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // Fall back to clipboard copy if share sheet was dismissed or unsupported
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        window.setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const uploadedAvatarRef = useRef<{ dataUrl: string; url: string } | null>(null);

  const syncProfileExtrasToCloud = async (
    nextExtras: DoctorProfileExtras,
    nextNotes?: DoctorNotebookEntry[]
  ) => {
    // Account metadata travels inside the sign-in token on every request, so
    // only short text goes there. The picture goes to storage and the notebook
    // to the database (src/lib/doctorProfile.ts).
    let extras = nextExtras;
    if (extras.avatarUrl.startsWith('data:')) {
      const cached = uploadedAvatarRef.current;
      let url = cached && cached.dataUrl === extras.avatarUrl ? cached.url : '';
      if (!url) {
        const up = await saveMyAvatar(client, extras.avatarUrl);
        if (up.ok && up.data) {
          url = up.data;
          uploadedAvatarRef.current = { dataUrl: extras.avatarUrl, url };
        }
      }
      if (url) {
        extras = { ...extras, avatarUrl: url };
        setProfileAvatarUrl(url);
        setProfileSaved((prev) => ({ ...prev, avatarUrl: url }));
      }
    } else if (!extras.avatarUrl) {
      void clearMyAvatar(client);
    }
    saveLocalProfileExtras(profileStorageKey, extras);
    try {
      await client.auth.updateUser({
        data: {
          doctor_avatar_url: extras.avatarUrl.startsWith('data:') ? null : extras.avatarUrl || null,
          doctor_quote: extras.quote || null,
          doctor_workplace: extras.workplace || null,
          doctor_clinical_level: extras.clinicalLevel || null,
          doctor_board_status: extras.boardStatus || null,
        },
      });
    } catch {
      // Ignore offline/metadata update errors; localStorage is already updated
    }
    if (nextNotes) {
      void saveMyNotebook(client, nextNotes);
    }
  };

  const handleAvatarFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!/^image\/(jpeg|jpg|png|webp|gif)$/i.test(file.type)) {
      setProfileNotice({
        tone: 'error',
        text: 'Please choose a JPG, PNG, or WebP image for your profile picture.',
      });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setProfileNotice({
        tone: 'error',
        text: 'Profile picture must be 8 MB or smaller.',
      });
      return;
    }
    try {
      const dataUrl = await resizeAvatarFileToDataUrl(file);
      setProfileAvatarUrl(dataUrl);
      if (!profileEditing) {
        const nextExtras: DoctorProfileExtras = {
          avatarUrl: dataUrl,
          quote: profileSaved.quote,
          workplace: profileSaved.workplace,
          clinicalLevel: profileSaved.clinicalLevel,
          boardStatus: profileSaved.boardStatus,
        };
        setProfileSaved((prev) => ({ ...prev, avatarUrl: dataUrl }));
        await syncProfileExtrasToCloud(nextExtras);
        setProfileNotice({ tone: 'ok', text: 'Profile picture updated.' });
      }
    } catch (err) {
      setProfileNotice({
        tone: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Could not update profile picture.',
      });
    }
  };

  const handleRemoveAvatar = async () => {
    setProfileAvatarUrl('');
    if (!profileEditing) {
      const nextExtras: DoctorProfileExtras = {
        avatarUrl: '',
        quote: profileSaved.quote,
        workplace: profileSaved.workplace,
        clinicalLevel: profileSaved.clinicalLevel,
        boardStatus: profileSaved.boardStatus,
      };
      setProfileSaved((prev) => ({ ...prev, avatarUrl: '' }));
      await syncProfileExtrasToCloud(nextExtras);
      setProfileNotice({ tone: 'ok', text: 'Profile picture removed.' });
    }
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileBusy(true);
    setProfileNotice(null);
    const res = await doctorSelfSignup(client, {
      fullName: profileFullName,
      phone: profilePhone,
      specialtyId: profileSpecialtyId,
    });
    const cleanQuote = profileQuote.trim().slice(0, 220);
    const cleanWorkplace = profileWorkplace.trim().slice(0, 120);
    const cleanLevel = profileClinicalLevel.trim().slice(0, 80);
    const cleanBoard = profileBoardStatus.trim().slice(0, 80);
    const nextExtras: DoctorProfileExtras = {
      avatarUrl: profileAvatarUrl,
      quote: cleanQuote,
      workplace: cleanWorkplace,
      clinicalLevel: cleanLevel,
      boardStatus: cleanBoard,
    };
    await syncProfileExtrasToCloud(nextExtras);
    setProfileBusy(false);
    if (!res.ok) {
      setProfileNotice({ tone: 'error', text: res.message });
      return;
    }
    setProfileQuote(cleanQuote);
    setProfileWorkplace(cleanWorkplace);
    setProfileClinicalLevel(cleanLevel);
    setProfileBoardStatus(cleanBoard);
    setProfileSaved({
      fullName: profileFullName,
      phone: profilePhone,
      specialtyId: profileSpecialtyId,
      avatarUrl: profileAvatarUrl,
      quote: cleanQuote,
      workplace: cleanWorkplace,
      clinicalLevel: cleanLevel,
      boardStatus: cleanBoard,
    });
    setProfileEditing(false);
    setProfileNotice({ tone: 'ok', text: 'Profile updated.' });
  };

  const startProfileEdit = () => {
    setProfileNotice(null);
    setProfileEditing(true);
  };

  const cancelProfileEdit = () => {
    setProfileFullName(profileSaved.fullName);
    setProfilePhone(profileSaved.phone);
    setProfileSpecialtyId(profileSaved.specialtyId);
    setProfileAvatarUrl(profileSaved.avatarUrl);
    setProfileQuote(profileSaved.quote);
    setProfileWorkplace(profileSaved.workplace);
    setProfileClinicalLevel(profileSaved.clinicalLevel);
    setProfileBoardStatus(profileSaved.boardStatus);
    setProfileNotice(null);
    setProfileEditing(false);
  };

  // Clinical Memory Notebook handlers
  const linkableDrugs = useMemo(() => {
    const map = new Map<string, SavedOrRecentDrugItem>();
    for (const d of savedDrugs) map.set(d.productId, d);
    for (const d of recentDrugs) {
      if (!map.has(d.productId)) map.set(d.productId, d);
    }
    return Array.from(map.values());
  }, [savedDrugs, recentDrugs]);

  const resetNoteComposer = () => {
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteBody('');
    setNoteCategory('clinical_pearl');
    setNotePinned(false);
    setNoteLinkedProductId('');
  };

  const handleSaveNote = async (e: FormEvent) => {
    e.preventDefault();
    const cleanBody = noteBody.trim();
    if (!cleanBody) return;
    const cleanTitle = noteTitle.trim().slice(0, 120);
    const linkedDrug = linkableDrugs.find(
      (d) => d.productId === noteLinkedProductId
    );
    const nowIso = new Date().toISOString();

    let nextEntries: DoctorNotebookEntry[];
    if (editingNoteId) {
      nextEntries = notebookEntries.map((entry) =>
        entry.id === editingNoteId
          ? {
              ...entry,
              title: cleanTitle,
              body: cleanBody.slice(0, 2000),
              category: noteCategory,
              pinned: notePinned,
              linkedProductId: linkedDrug ? linkedDrug.productId : null,
              linkedProductName: linkedDrug ? linkedDrug.brandNameEn : null,
              updatedAt: nowIso,
            }
          : entry
      );
    } else {
      const newEntry: DoctorNotebookEntry = {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: cleanTitle,
        body: cleanBody.slice(0, 2000),
        category: noteCategory,
        pinned: notePinned,
        linkedProductId: linkedDrug ? linkedDrug.productId : null,
        linkedProductName: linkedDrug ? linkedDrug.brandNameEn : null,
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      nextEntries = [newEntry, ...notebookEntries];
    }

    setNotebookEntries(nextEntries);
    saveLocalDoctorNotebook(profileStorageKey, nextEntries);
    resetNoteComposer();
    setNoteComposerOpen(false);
    void syncProfileExtrasToCloud(
      {
        avatarUrl: profileSaved.avatarUrl,
        quote: profileSaved.quote,
        workplace: profileSaved.workplace,
        clinicalLevel: profileSaved.clinicalLevel,
        boardStatus: profileSaved.boardStatus,
      },
      nextEntries
    );
  };

  const handleEditNote = (entry: DoctorNotebookEntry) => {
    setEditingNoteId(entry.id);
    setNoteTitle(entry.title);
    setNoteBody(entry.body);
    setNoteCategory(entry.category);
    setNotePinned(entry.pinned);
    setNoteLinkedProductId(entry.linkedProductId ?? '');
    setNoteComposerOpen(true);
  };

  const handleTogglePinNote = (noteId: string) => {
    const nextEntries = notebookEntries.map((entry) =>
      entry.id === noteId
        ? { ...entry, pinned: !entry.pinned, updatedAt: new Date().toISOString() }
        : entry
    );
    setNotebookEntries(nextEntries);
    saveLocalDoctorNotebook(profileStorageKey, nextEntries);
  };

  const handleDeleteNote = (noteId: string) => {
    const nextEntries = notebookEntries.filter((entry) => entry.id !== noteId);
    setNotebookEntries(nextEntries);
    saveLocalDoctorNotebook(profileStorageKey, nextEntries);
    if (editingNoteId === noteId) {
      resetNoteComposer();
      setNoteComposerOpen(false);
    }
  };

  const filteredNotebookEntries = useMemo(() => {
    const q = noteSearchQuery.trim().toLowerCase();
    return [...notebookEntries]
      .filter((entry) => {
        if (noteCategoryFilter === 'pinned' && !entry.pinned) return false;
        if (
          noteCategoryFilter !== 'all' &&
          noteCategoryFilter !== 'pinned' &&
          entry.category !== noteCategoryFilter
        ) {
          return false;
        }
        if (!q) return true;
        return (
          entry.title.toLowerCase().includes(q) ||
          entry.body.toLowerCase().includes(q) ||
          (entry.linkedProductName ?? '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [notebookEntries, noteCategoryFilter, noteSearchQuery]);

  const savedSpecialtyName =
    physicianSpecialties.find((s) => s.id === profileSaved.specialtyId)?.label ||
    specialties.find((s) => s.id === profileSaved.specialtyId)?.nameEn ||
    '';

  const doctorFirstName = extractDoctorFirstName(profileFullName, access.email);
  const greetingText = doctorFirstName
    ? `${getTimeOfDayGreeting()}, Dr ${doctorFirstName}`
    : `${getTimeOfDayGreeting()}, Doctor`;

  const isSelectedProductSaved = Boolean(
    selectedProduct &&
      savedDrugs.some((item) => item.productId === selectedProduct.id)
  );

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      {/* Sticky Translucent Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleGoHome}
              aria-label="Pharmaty home"
              title="Return to home"
              className="h-9 inline-flex items-center rounded-lg px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-opacity duration-150 hover:opacity-90"
            >
              <BrandLogo className="text-lg sm:text-xl" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <NotificationBell client={client} profileId={access.profileId} />
            <button
              type="button"
              aria-label="Companies"
              aria-current={companiesDirectoryOpen ? 'page' : undefined}
              title="Companies"
              className={`h-8 w-8 inline-flex items-center justify-center rounded-lg border text-xs transition-colors duration-150 ${
                companiesDirectoryOpen || Boolean(activeCompanyId)
                  ? 'border-accent bg-background text-accent'
                  : 'border-border bg-surface/60 text-text hover:bg-surface-raised'
              }`}
              onClick={openCompaniesDirectory}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Saved medicines"
              aria-expanded={savedOpen}
              title="Saved medicines"
              className={`relative h-8 w-8 inline-flex items-center justify-center rounded-lg border text-xs transition-colors duration-150 ${
                savedOpen
                  ? 'border-accent bg-background text-accent'
                  : 'border-border bg-surface/60 text-text hover:bg-surface-raised'
              }`}
              onClick={() => {
                setSavedOpen((v) => !v);
                setProfileOpen(false);
              }}
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {savedDrugs.length > 0 && (
                <span className="ml-0.5 text-[11px] font-semibold tabular-nums text-accent">
                  {savedDrugs.length}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="My profile"
              aria-expanded={profileOpen}
              title="My profile"
              className={`h-8 w-8 inline-flex items-center justify-center rounded-lg border text-xs transition-colors duration-150 ${
                profileOpen
                  ? 'border-accent bg-background text-accent'
                  : 'border-border bg-surface/60 text-text hover:bg-surface-raised'
              }`}
              onClick={() => {
                setProfileOpen((v) => !v);
                setSavedOpen(false);
                setProfileNotice(null);
                cancelProfileEdit();
              }}
            >
              {(profileSaved.avatarUrl || profileAvatarUrl) ? (
                <img
                  src={profileSaved.avatarUrl || profileAvatarUrl}
                  alt=""
                  className="w-4 h-4 rounded-full object-cover border border-accent/50 shrink-0"
                />
              ) : (
                <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-surface/60 text-xs text-text hover:bg-surface-raised hover:text-danger transition-colors duration-150"
              onClick={onSignOut}
            >
              <Power className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Saved Medicines Drawer (Only saved medicines, no recent list) */}
        {savedOpen && (
          <section className="rounded-2xl bg-surface border border-border shadow-soft p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent tabular-nums">
                <Bookmark className="w-4 h-4" aria-hidden="true" />
                <span>{savedDrugs.length}</span>
              </span>
              <button
                type="button"
                aria-label="Close saved medicines"
                title="Close"
                className="h-7 w-7 inline-flex items-center justify-center rounded-lg border border-border bg-background/60 text-text-muted hover:text-text transition-colors"
                onClick={() => setSavedOpen(false)}
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {savedDrugs.length === 0 ? (
              <p className="text-xs text-text-muted">
                No saved medicines yet.
              </p>
            ) : (
              <div className="divide-y divide-border/60">
                {savedDrugs.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-2 py-2 first:pt-0 last:pb-0"
                  >
                    <button
                      type="button"
                      onClick={() => openProductPage(item.productId)}
                      className="text-left flex-1 min-w-0"
                    >
                      <div className="text-xs font-semibold text-text truncate hover:text-accent transition-colors duration-150">
                        {item.brandNameEn}
                      </div>
                      <div className="text-xs text-text-muted truncate">
                        {item.genericNameEn ?? 'Dietary Supplement'} · {item.companyName}
                      </div>
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${item.brandNameEn} from saved`}
                      title="Remove"
                      onClick={() => setSavedDrugs(toggleSavedDoctorDrug(item))}
                      className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors duration-150"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Standalone My Profile Page */}
        {profileOpen ? (
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <button
                type="button"
                aria-label="Back"
                title="Back"
                onClick={() => {
                  cancelProfileEdit();
                  setProfileOpen(false);
                }}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
              >
                ←
              </button>
            </div>

            {/* Minimal Profile Header + Always-Open Info Row + Always-Open Square Note Box */}
            <section className="rounded-2xl bg-surface border border-border shadow-soft p-4 sm:p-5 space-y-4">
              {/* Row 1: Avatar + Name + Quote + Saved Medicines Symbol */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    {(profileEditing ? profileAvatarUrl : profileSaved.avatarUrl || profileAvatarUrl) ? (
                      <img
                        src={
                          profileEditing
                            ? profileAvatarUrl
                            : profileSaved.avatarUrl || profileAvatarUrl
                        }
                        alt={formatDoctorDisplayTitle(
                          profileSaved.fullName || profileFullName
                        )}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-accent/50 bg-background"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/25 border border-accent/40 flex items-center justify-center text-base sm:text-lg font-semibold tracking-wider text-accent"
                      >
                        {getDoctorInitials(
                          profileSaved.fullName || profileFullName,
                          access.email
                        )}
                      </div>
                    )}
                    <label
                      title="Upload or change profile picture"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary hover:bg-[#1E7BC4] border border-surface text-white flex items-center justify-center cursor-pointer shadow-sm transition-colors"
                    >
                      <Camera className="w-3 h-3" aria-hidden="true" />
                      <span className="sr-only">Upload profile picture</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) => void handleAvatarFileChange(e)}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-semibold text-text truncate">
                      {formatDoctorDisplayTitle(
                        profileSaved.fullName || profileFullName
                      )}
                    </h1>
                    <p className="text-xs italic text-text-muted leading-snug break-words mt-0.5">
                      “{profileSaved.quote ||
                        profileQuote ||
                        'Wherever the art of medicine is loved, there is also a love of humanity.'}”
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    aria-label="Saved medicines"
                    aria-expanded={profileSavedListOpen}
                    title="Saved medicines"
                    onClick={() => setProfileSavedListOpen((v) => !v)}
                    className={`relative h-8 min-w-[32px] px-2 inline-flex items-center justify-center gap-1 rounded-lg border transition-colors ${
                      profileSavedListOpen
                        ? 'border-accent bg-primary/20 text-accent'
                        : 'border-border bg-background/60 text-text-muted hover:text-text'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" aria-hidden="true" />
                    {savedDrugs.length > 0 && (
                      <span className="text-[11px] font-semibold tabular-nums">
                        {savedDrugs.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 2 (div:nth-of-type(2)): Always-open user details + Profile symbol button that widens Level & Board status */}
              <div className="border-t border-border/70 pt-3.5 space-y-3">
                {!profileEditing ? (
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-text-muted">
                        <span className="inline-flex items-center gap-1 text-accent font-medium">
                          <Stethoscope className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{savedSpecialtyName || '—'}</span>
                        </span>
                        {(profileSaved.workplace || profileWorkplace) && (
                          <span className="inline-flex items-center gap-1 text-text">
                            <Building2 className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden="true" />
                            <span>{profileSaved.workplace || profileWorkplace}</span>
                          </span>
                        )}
                        {profileSaved.phone && (
                          <span className="tabular-nums text-text">
                            {profileSaved.phone}
                          </span>
                        )}
                        {access.email && (
                          <span className="break-all">{access.email}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          aria-label="More profile details"
                          aria-expanded={profileDetailsOpen}
                          title="Level & board status"
                          onClick={() => setProfileDetailsOpen((v) => !v)}
                          className={`h-7 w-7 inline-flex items-center justify-center rounded-lg border transition-colors ${
                            profileDetailsOpen
                              ? 'border-accent bg-primary/20 text-accent'
                              : 'border-border bg-background/60 text-text-muted hover:text-accent'
                          }`}
                        >
                          <User className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Edit profile"
                          title="Edit profile"
                          onClick={startProfileEdit}
                          className="h-7 w-7 inline-flex items-center justify-center rounded-lg border border-border bg-background/60 text-text-muted hover:text-accent transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Widened Professional Details (Level: Resident/Specialist & Board Student status) when Profile symbol is pressed */}
                    {profileDetailsOpen && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 border-t border-border/50 text-xs">
                        <div>
                          <span className="text-text-muted">Level: </span>
                          <span className="font-medium text-text">
                            {profileSaved.clinicalLevel ||
                              profileClinicalLevel ||
                              'Resident / Specialist'}
                          </span>
                        </div>
                        <div>
                          <span className="text-text-muted">Board status: </span>
                          <span className="font-medium text-accent">
                            {profileSaved.boardStatus ||
                              profileBoardStatus ||
                              'Board Student'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => void handleSaveProfile(e)}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      <input
                        className={inputClass}
                        type="text"
                        value={profileFullName}
                        onChange={(e) => setProfileFullName(e.target.value)}
                        placeholder="Dr. Full Name"
                        aria-label="Full name"
                      />
                      <input
                        className={inputClass}
                        type="tel"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="+964 770 123 4567"
                        aria-label="Phone number"
                      />
                      <select
                        className={inputClass}
                        required
                        value={profileSpecialtyId}
                        onChange={(e) => setProfileSpecialtyId(e.target.value)}
                        aria-label="Medical specialty"
                      >
                        <option value="">— Specialty —</option>
                        {physicianSpecialties.map((spec) => (
                          <option key={spec.id} value={spec.id}>
                            {spec.label}
                          </option>
                        ))}
                      </select>
                      <select
                        className={inputClass}
                        value={profileClinicalLevel}
                        onChange={(e) => setProfileClinicalLevel(e.target.value)}
                        aria-label="Clinical level"
                      >
                        <option value="">— Level (Resident / Specialist) —</option>
                        {DOCTOR_LEVEL_OPTIONS.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                      <select
                        className={inputClass}
                        value={profileBoardStatus}
                        onChange={(e) => setProfileBoardStatus(e.target.value)}
                        aria-label="Board status"
                      >
                        <option value="">— Board student status —</option>
                        {DOCTOR_BOARD_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <input
                        className={inputClass}
                        type="text"
                        maxLength={120}
                        value={profileWorkplace}
                        onChange={(e) => setProfileWorkplace(e.target.value)}
                        placeholder="Hospital / Clinic"
                        aria-label="Hospital or clinic"
                      />
                    </div>

                    <input
                      type="text"
                      maxLength={220}
                      value={profileQuote}
                      onChange={(e) => setProfileQuote(e.target.value)}
                      placeholder="Personal quote…"
                      aria-label="Personal quote"
                      className={inputClass}
                    />

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <label
                          title="Upload photo"
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background/60 text-text-muted hover:text-accent cursor-pointer transition-colors"
                        >
                          <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => void handleAvatarFileChange(e)}
                            className="sr-only"
                          />
                        </label>
                        {profileAvatarUrl && (
                          <button
                            type="button"
                            aria-label="Remove photo"
                            title="Remove photo"
                            onClick={() => void handleRemoveAvatar()}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background/60 text-text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Cancel"
                          title="Cancel"
                          onClick={cancelProfileEdit}
                          disabled={profileBusy}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background/60 text-text-muted hover:text-text transition-colors"
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="submit"
                          aria-label="Save profile"
                          title="Save profile"
                          disabled={
                            profileBusy ||
                            !profilePhone.trim() ||
                            !profileSpecialtyId.trim()
                          }
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-primary hover:bg-[#1E7BC4] text-white disabled:opacity-50 transition-colors"
                        >
                          <Check className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {profileNotice && (
                  <p
                    className={`text-xs font-medium ${
                      profileNotice.tone === 'error' ? 'text-danger' : 'text-success'
                    }`}
                  >
                    {profileNotice.text}
                  </p>
                )}
              </div>

              {/* Saved Medicines List (Opens when pressing the Bookmark symbol button) */}
              {profileSavedListOpen && (
                <div className="border-t border-border/70 pt-3.5">
                  {savedDrugs.length === 0 ? (
                    <p className="text-xs text-text-muted">
                      No saved medicines yet.
                    </p>
                  ) : (
                    <div className="max-h-56 overflow-y-auto divide-y divide-border/60">
                      {savedDrugs.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center justify-between gap-2 py-2 first:pt-0 last:pb-0"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setProfileOpen(false);
                              openProductPage(item.productId);
                            }}
                            className="min-w-0 flex-1 text-left hover:text-accent transition-colors duration-150"
                          >
                            <span className="text-xs font-semibold text-text">
                              {item.brandNameEn}
                            </span>
                            <span className="text-xs text-text-muted ml-2">
                              {item.genericNameEn ?? 'Dietary Supplement'}
                              {item.strength ? ` · ${item.strength}` : ''} · {item.companyName}
                            </span>
                          </button>
                          <button
                            type="button"
                            aria-label={`Remove ${item.brandNameEn}`}
                            title="Remove"
                            onClick={() => setSavedDrugs(toggleSavedDoctorDrug(item))}
                            className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Always-Open Square Note / Post Space (No + button required) */}
              <form
                onSubmit={(e) => void handleSaveNote(e)}
                className="border-t border-border/70 pt-3.5 space-y-2"
              >
                <div className="relative">
                  <textarea
                    rows={3}
                    required
                    maxLength={2000}
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder="Write a note…"
                    aria-label="Write a note"
                    className={`${inputClass} py-2.5 pr-12 text-xs sm:text-sm leading-relaxed`}
                  />
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
                    {editingNoteId && (
                      <button
                        type="button"
                        aria-label="Cancel edit"
                        title="Cancel"
                        onClick={resetNoteComposer}
                        className="h-7 w-7 inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-text transition-colors"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="submit"
                      aria-label="Save note"
                      title="Save note"
                      disabled={!noteBody.trim()}
                      className="h-7 w-7 inline-flex items-center justify-center rounded-lg bg-primary hover:bg-[#1E7BC4] text-white disabled:opacity-40 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Notes / Posts Feed */}
              {notebookEntries.length > 0 && (
                <div className="divide-y divide-border/70 border-t border-border/70">
                  {filteredNotebookEntries.map((entry) => (
                    <article
                      key={entry.id}
                      className="py-3 last:pb-0 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 text-[11px] text-text-muted">
                          {entry.pinned && (
                            <Pin className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                          )}
                          {entry.title && (
                            <span className="text-xs sm:text-sm font-semibold text-text truncate">
                              {entry.title}
                            </span>
                          )}
                          {formatNoteTimestamp(entry.createdAt) && (
                            <span className="shrink-0">
                              {formatNoteTimestamp(entry.createdAt)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            aria-label={entry.pinned ? 'Unpin note' : 'Pin note'}
                            title={entry.pinned ? 'Unpin' : 'Pin'}
                            onClick={() => handleTogglePinNote(entry.id)}
                            className={`h-7 w-7 inline-flex items-center justify-center rounded-lg transition-colors ${
                              entry.pinned
                                ? 'text-accent'
                                : 'text-text-muted hover:text-text'
                            }`}
                          >
                            <Pin className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label="Edit note"
                            title="Edit"
                            onClick={() => handleEditNote(entry)}
                            className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete note"
                            title="Delete"
                            onClick={() => handleDeleteNote(entry.id)}
                            className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-text leading-relaxed whitespace-pre-line break-words">
                        {entry.body}
                      </p>

                      {entry.linkedProductId && entry.linkedProductName && (
                        <div className="pt-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              setProfileOpen(false);
                              openProductPage(entry.linkedProductId!);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                          >
                            <Pill className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{entry.linkedProductName}</span>
                          </button>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section aria-label="Partner notice" className="mt-auto pt-2">
              <SponsoredAdCard
                ad={sponsoredAd}
                onAdClick={(adId) =>
                  void recordSponsoredAdEvent(client, adId, 'click')
                }
              />
            </section>
          </div>
        ) : activeCompanyId ? (
          <DoctorCompanyPageView
            key={activeCompanyId}
            client={client}
            companyId={activeCompanyId}
            onBack={handleBackToCatalog}
            onOpenCompaniesDirectory={openCompaniesDirectory}
            onOpenCompany={openCompanyPage}
            onOpenProduct={openProductPage}
          />
        ) : companiesDirectoryOpen ? (
          <DoctorCompaniesDirectoryView
            client={client}
            onBack={handleBackToCatalog}
            onOpenCompany={openCompanyPage}
          />
        ) : activeProductId ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                aria-label="Back"
                title="Back"
                onClick={handleBackToCatalog}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
              >
                ←
              </button>

              {selectedProduct && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={isSelectedProductSaved ? 'Saved' : 'Save'}
                    title={isSelectedProductSaved ? 'Saved' : 'Save'}
                    onClick={() => handleToggleSaveProduct(selectedProduct)}
                    aria-pressed={isSelectedProductSaved}
                    className={`h-9 w-9 inline-flex items-center justify-center rounded-lg border transition-colors duration-150 ${
                      isSelectedProductSaved
                        ? 'border-accent bg-primary/30 text-accent'
                        : 'border-border bg-surface text-text hover:bg-surface-raised'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Share"
                    title="Share"
                    onClick={() => void handleShareProductLink(selectedProduct)}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text hover:bg-surface-raised transition-colors duration-150"
                  >
                    {linkCopied ? (
                      <Check className="w-4 h-4 text-success" aria-hidden="true" />
                    ) : (
                      <Share2 className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {detailError && (
              <CatalogBanner tone="error">{detailError}</CatalogBanner>
            )}

            {detailLoading ? (
              <div
                role="status"
                aria-label="Loading product details"
                className="rounded-2xl bg-surface border border-border p-6 space-y-6 animate-pulse"
              >
                <div className="space-y-3 border-b border-border pb-5">
                  <div className="h-7 w-56 rounded bg-surface-raised" />
                  <div className="h-4 w-72 rounded bg-surface-raised" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className="h-16 rounded-xl bg-background/60 border border-border"
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="h-24 rounded-xl bg-background/60 border border-border"
                    />
                  ))}
                </div>
              </div>
            ) : (
              selectedProduct && (
                <DoctorProductDetail
                  client={client}
                  product={selectedProduct}
                  sponsoredAd={sponsoredAd}
                  onOpenProduct={openProductPage}
                  onSearchGeneric={handleSearchByGeneric}
                  onFilterCompany={handleFilterByCompany}
                  onFilterClass={handleFilterByClass}
                />
              )
            )}
          </div>
        ) : (
          <>
            {error && <CatalogBanner tone="error">{error}</CatalogBanner>}

            {/* Doctor Greeting Line */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <span className="text-sm font-medium text-text">
                {greetingText}
              </span>
            </div>

            {/* Top Search Bar + Filter Toggle Icon */}
            <section className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-0">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="doctor-catalog-search"
                    type="search"
                    aria-label="Search brand, generic, class or company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search brand, generic, class or company"
                    className={`${inputClass} pl-10 min-h-[44px] bg-surface ${
                      query ? 'pr-10' : ''
                    }`}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      title="Clear search"
                      onClick={() => {
                        setQuery('');
                        setDebouncedQuery('');
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[34px] min-w-[34px] inline-flex items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-surface-raised transition-colors duration-150"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Toggle filters"
                  title="Filters"
                  aria-expanded={filtersOpen}
                  aria-controls="doctor-catalog-filters"
                  onClick={() => setFiltersOpen((v) => !v)}
                  className={`relative shrink-0 min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 text-xs sm:text-sm font-medium transition-colors duration-150 ${
                    filtersOpen || activeFilterCount > 0
                      ? 'border-accent/70 bg-primary/20 text-text'
                      : 'border-border bg-surface text-text-muted hover:text-text'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  {activeFilterCount > 0 && (
                    <span className="inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-background tabular-nums">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Filter Details Panel: opens when pressing the filter icon and closes when pressing it again */}
              {filtersOpen && (
                <div
                  id="doctor-catalog-filters"
                  className="rounded-xl bg-surface border border-border p-3 space-y-2.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <select
                        id="doctor-catalog-class"
                        aria-label="Filter by drug class"
                        value={therapeuticGroup}
                        onChange={(e) => {
                          setTherapeuticGroup(
                            e.target.value as TherapeuticGroupKey | ''
                          );
                          setSelectedSubclass('');
                        }}
                        className={`${inputClass} min-h-[40px] bg-background py-1.5 text-xs sm:text-sm`}
                      >
                        <option value="">All drug classes</option>
                        {THERAPEUTIC_GROUPS.map((group) => (
                          <option key={group.key} value={group.key}>
                            {group.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        id="doctor-catalog-company"
                        aria-label="Filter by company"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        className={`${inputClass} min-h-[40px] bg-background py-1.5 text-xs sm:text-sm`}
                      >
                        <option value="">All companies</option>
                        {companies.map((comp) => (
                          <option key={comp.id} value={comp.id}>
                            {comp.companyName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        id="doctor-catalog-specialty"
                        aria-label="Filter by specialty"
                        value={specialtyId}
                        onChange={(e) => setSpecialtyId(e.target.value)}
                        className={`${inputClass} min-h-[40px] bg-background py-1.5 text-xs sm:text-sm`}
                      >
                        <option value="">All specialties</option>
                        {specialties.map((spec) => (
                          <option key={spec.id} value={spec.id}>
                            {spec.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Drug Classes chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pt-1">
                    {THERAPEUTIC_GROUPS.map((group) => {
                      const active = therapeuticGroup === group.key;
                      return (
                        <button
                          key={group.key}
                          type="button"
                          title={group.examples}
                          onClick={() => {
                            if (active) {
                              setTherapeuticGroup('');
                              setSelectedSubclass('');
                            } else {
                              handleFilterByClass(group.key);
                            }
                          }}
                          className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                            active
                              ? 'bg-primary border-accent text-text'
                              : 'bg-background/60 border-border text-text-muted hover:text-text hover:border-accent/50'
                          }`}
                        >
                          {group.shortLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subclasses row when multiple subclasses match */}
                  {isSearchingOrFiltering && allSubclasses.length > 1 && (
                    <div
                      className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pt-2 border-t border-border/70"
                      aria-label="Filter by subclass"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedSubclass('')}
                        className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors tabular-nums ${
                          selectedSubclass === ''
                            ? 'bg-primary border-accent text-text'
                            : 'bg-background/50 border-border text-text-muted hover:text-text'
                        }`}
                      >
                        All ({rows.length})
                      </button>
                      {allSubclasses.map((sub) => {
                        const active = selectedSubclass === sub.subclassLabel;
                        return (
                          <button
                            key={`${sub.groupKey}-${sub.subclassLabel}`}
                            type="button"
                            onClick={() =>
                              setSelectedSubclass(
                                active ? '' : sub.subclassLabel
                              )
                            }
                            className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors tabular-nums whitespace-nowrap ${
                              active
                                ? 'bg-primary border-accent text-text'
                                : 'bg-background/50 border-border text-text-muted hover:text-text'
                            }`}
                          >
                            {sub.subclassLabel} ({sub.items.length})
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Active filter chips when filter panel is closed */}
              {!filtersOpen && activeFilterChips.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.clear}
                      aria-label={`Remove filter ${chip.label}`}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-accent/50 bg-primary/15 px-2.5 py-0.5 text-xs text-text"
                    >
                      <span className="max-w-[160px] truncate">
                        {chip.label}
                      </span>
                      <X
                        className="w-3 h-3 text-text-muted"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="shrink-0 px-2 py-0.5 text-xs font-medium text-accent hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </section>

            {/* Home View (when not actively filtering/searching) */}
            {!isSearchingOrFiltering ? (
              <section aria-label="Ad">
                <SponsoredAdCard
                  ad={sponsoredAd}
                  onAdClick={(adId) =>
                    void recordSponsoredAdEvent(client, adId, 'click')
                  }
                />
              </section>
            ) : (
              /* Search & Filter Results View */
              <section className="space-y-3">
                {loading ? (
                  <div
                    role="status"
                    aria-label="Loading catalog"
                    className="rounded-xl bg-surface border border-border overflow-hidden divide-y divide-border"
                  >
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <div
                        key={idx}
                        className="px-3.5 py-2.5 flex items-center justify-between gap-3 animate-pulse"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 w-40 rounded bg-surface-raised" />
                          <div className="h-3 w-28 rounded bg-surface-raised" />
                        </div>
                        <div className="h-4 w-4 rounded bg-surface-raised shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : rows.length === 0 ? (
                  <div className="rounded-xl bg-surface border border-border p-8 text-center space-y-2.5">
                    <div className="mx-auto w-9 h-9 rounded-full bg-surface-raised border border-border flex items-center justify-center text-text-muted">
                      <Search className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h2 className="text-sm sm:text-base font-semibold text-text">
                      No published products match your search.
                    </h2>
                    <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                      Try checking the spelling, searching by generic active ingredient (e.g. bisoprolol, paracetamol), or clearing active filters.
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={openMissingDrugSheet}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                      >
                        Can&apos;t find this drug? Tell us
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {closeMatches && closeMatchNotice(query, true) && (
                      <p className="text-xs text-text-muted px-0.5">
                        {closeMatchNotice(query, true)}
                      </p>
                    )}

                    {/* Slim count line */}
                    <div className="flex items-center justify-between gap-2 px-0.5">
                      <span className="text-xs text-text-muted tabular-nums">
                        Showing {rows.length} of {totalCount}{' '}
                        {totalCount === 1 ? 'medication' : 'medications'}
                        {therapeuticGroup && (
                          <>
                            {' '}in{' '}
                            <span className="text-text font-medium">
                              {THERAPEUTIC_GROUPS.find(
                                (g) => g.key === therapeuticGroup
                              )?.shortLabel ?? 'this class'}
                            </span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Compact medication list grouped by Subclass: each row shows ONLY Brand, Generic/Scientific, and Company */}
                    <div className="rounded-xl bg-surface border border-border overflow-clip">
                      {visibleSubclasses.map((sub) => (
                        <div key={`${sub.groupKey}-${sub.subclassLabel}`}>
                          <div className="sticky top-14 z-10 flex items-center justify-between gap-2 px-3.5 py-1.5 bg-surface-raised/95 backdrop-blur border-y border-border first:border-t-0">
                            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted truncate">
                              {sub.subclassLabel}
                            </h3>
                            <span className="text-[11px] text-text-muted tabular-nums shrink-0">
                              {sub.items.length}
                            </span>
                          </div>
                          <div className="divide-y divide-border">
                            {sub.items.map((row) => {
                              const genericName =
                                row.genericNameEn ?? 'Dietary Supplement';
                              return (
                                <a
                                  key={row.productId}
                                  href={buildProductRouteHash(row.productId)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openProductPage(row.productId);
                                  }}
                                  className="group flex items-center justify-between gap-3 px-3.5 py-2 hover:bg-surface-raised/60 transition-colors duration-150"
                                >
                                  <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
                                    <div className="min-w-0 truncate">
                                      <span className="font-semibold text-sm text-text group-hover:text-accent transition-colors duration-150">
                                        {row.brandNameEn}
                                      </span>
                                      <span
                                        className="mx-1.5 text-text-muted text-xs"
                                        aria-hidden="true"
                                      >
                                        ·
                                      </span>
                                      <span className="text-xs font-medium text-accent">
                                        {genericName}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openCompanyPage(row.companyId);
                                      }}
                                      title={`Open ${row.companyName} page`}
                                      className="text-xs text-text-muted hover:text-accent hover:underline truncate shrink-0 text-left sm:text-right"
                                    >
                                      {row.companyName}
                                    </button>
                                  </div>
                                  <ChevronRight
                                    className="w-4 h-4 shrink-0 text-text-muted group-hover:text-accent transition-colors duration-150"
                                    aria-hidden="true"
                                  />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {rows.length < totalCount && (
                      <div>
                        <button
                          type="button"
                          onClick={() => void handleLoadMore()}
                          disabled={loadingMore}
                          className={`${secondaryButtonClass} w-full`}
                        >
                          {loadingMore ? 'Loading…' : 'Load more'}
                        </button>
                      </div>
                    )}

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={openMissingDrugSheet}
                        className="text-xs text-text-muted hover:text-accent hover:underline transition-colors"
                      >
                        Can&apos;t find this drug? Tell us
                      </button>
                    </div>

                    {sponsoredAd && (
                      <div className="pt-2">
                        <SponsoredAdCard
                          ad={sponsoredAd}
                          compact
                          hideWhenEmpty
                          onAdClick={(adId) =>
                            void recordSponsoredAdEvent(client, adId, 'click')
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Missing Drug Request Bottom Sheet */}
            {missingSheetOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Request a missing drug"
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget && !missingBusy) {
                    setMissingSheetOpen(false);
                  }
                }}
              >
                <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-surface border border-border p-4 sm:p-5 space-y-3.5 shadow-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-text">
                      Can&apos;t find this drug? Tell us
                    </h3>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setMissingSheetOpen(false)}
                      className="rounded-md p-1 text-text-muted hover:text-text hover:bg-surface-raised transition-colors"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {missingSuccess ? (
                    <div className="space-y-3">
                      <p className="rounded-xl bg-success/10 border border-success/40 px-3.5 py-2.5 text-xs text-success">
                        Thank you — we will check it.
                      </p>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setMissingSheetOpen(false)}
                          className={`${secondaryButtonClass} px-4 py-1.5 text-xs`}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitMissingDrug} className="space-y-3">
                      {missingError && (
                        <CatalogBanner tone="error">{missingError}</CatalogBanner>
                      )}
                      <Field label="Drug name">
                        <input
                          type="text"
                          required
                          maxLength={120}
                          value={missingDrugName}
                          onChange={(e) => setMissingDrugName(e.target.value)}
                          placeholder="Brand or generic name (e.g. Bisoprolol 5 mg)"
                          className={`${inputClass} bg-background text-xs sm:text-sm py-2`}
                        />
                      </Field>
                      <Field label="Company (optional)">
                        <input
                          type="text"
                          maxLength={120}
                          value={missingCompanyName}
                          onChange={(e) => setMissingCompanyName(e.target.value)}
                          placeholder="Manufacturer name"
                          className={`${inputClass} bg-background text-xs sm:text-sm py-2`}
                        />
                      </Field>
                      <Field label="Note (optional)">
                        <textarea
                          rows={2}
                          maxLength={1000}
                          value={missingNote}
                          onChange={(e) => setMissingNote(e.target.value)}
                          placeholder="Strength, dosage form, or details…"
                          className={`${inputClass} bg-background text-xs sm:text-sm py-2`}
                        />
                      </Field>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          disabled={missingBusy}
                          onClick={() => setMissingSheetOpen(false)}
                          className={`${secondaryButtonClass} px-3.5 py-1.5 text-xs`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={missingBusy || missingDrugName.trim().length < 2}
                          className={`${buttonClass} w-auto px-4 py-1.5 text-xs`}
                        >
                          {missingBusy ? 'Sending…' : 'Send'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <LegalFooter />
    </div>
  );
}

function DoctorProductDetail({
  client,
  product,
  sponsoredAd,
  onOpenProduct,
  onSearchGeneric,
  onFilterCompany,
  onFilterClass,
}: {
  client: SupabaseClient;
  product: CatalogProduct;
  sponsoredAd?: DoctorSponsoredAd | null;
  onOpenProduct: (productId: string) => void;
  onSearchGeneric: (genericName: string) => void;
  onFilterCompany: (companyId: string, companyName: string) => void;
  onFilterClass: (groupKey: TherapeuticGroupKey, subclass?: string) => void;
}) {
  const market = product.market;
  const enClinical = product.marketTranslations.en;
  const [drugSources, setDrugSources] = useState<DrugSources | null>(null);
  const [alternatives, setAlternatives] = useState<ProductAlternative[]>([]);
  const [alternativesLoading, setAlternativesLoading] = useState(true);
  const [showAllSameStrength, setShowAllSameStrength] = useState(false);
  const [showAllOtherStrengths, setShowAllOtherStrengths] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportTopic, setReportTopic] = useState<ErrorTopic>('dose');
  const [reportMessage, setReportMessage] = useState('');
  const [reportBusy, setReportBusy] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    let active = true;
    setDrugSources(null);
    setAlternatives([]);
    setAlternativesLoading(true);
    setShowAllSameStrength(false);
    setShowAllOtherStrengths(false);
    void loadDrugSources(client, product.id).then((res) => {
      if (!active) return;
      if (res.ok) {
        setDrugSources(res.data);
      }
    });
    void loadProductAlternatives(client, product.id).then((res) => {
      if (!active) return;
      if (res.ok) {
        setAlternatives(res.data);
      }
      setAlternativesLoading(false);
    });
    return () => {
      active = false;
    };
  }, [client, product.id]);

  const groupedAlternatives = useMemo(
    () => groupAlternatives(alternatives),
    [alternatives]
  );

  const fallbackSources = (product.aiSources ?? []).filter((s) =>
    s.url.startsWith('https://')
  );
  const sources =
    drugSources && drugSources.sources.length > 0
      ? drugSources.sources
      : fallbackSources;
  const checkedLine = formatCheckedLine(drugSources?.checkedAt ?? null);

  const openReportSheet = () => {
    setReportTopic('dose');
    setReportMessage('');
    setReportError(null);
    setReportSuccess(false);
    setReportOpen(true);
  };

  const handleSubmitErrorReport = async (e: FormEvent) => {
    e.preventDefault();
    setReportBusy(true);
    setReportError(null);
    const res = await reportDrugError(client, {
      productId: product.id,
      topic: reportTopic,
      message: reportMessage,
    });
    setReportBusy(false);
    if (!res.ok) {
      setReportError(res.message);
      return;
    }
    setReportSuccess(true);
  };
  const classified = classifyDrugTherapeuticGroup(
    product.drugClassNameEn,
    product.genericNameEn,
    product.category
  );

  const categoryChipStyle =
    product.category === 'otc_drug'
      ? 'border-warning/40 bg-warning/15 text-warning'
      : product.category === 'prescription_drug'
      ? 'border-success/40 bg-success/15 text-success'
      : 'border-accent/40 bg-accent/15 text-accent';

  const makerLine = manufacturerLine(
    product.companyName,
    product.companyOriginCountryCode
  );
  const iraqAgent = agentLine(product.agentCompanyName);

  return (
    <div className="space-y-6">
      {/* Hero Header Card */}
      <div className="rounded-2xl bg-surface border border-border shadow-soft p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-text leading-tight">
              {product.brandNameEn}
            </h1>
            <div className="space-y-0.5">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    onFilterCompany(product.companyId, product.companyName)
                  }
                  title="Open company page"
                  className="text-xs sm:text-sm font-medium text-text hover:text-accent hover:underline text-left"
                >
                  {makerLine}
                </button>
              </div>
              {iraqAgent &&
                (product.agentCompanyId ? (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        onFilterCompany(
                          product.agentCompanyId!,
                          product.agentCompanyName ?? ''
                        )
                      }
                      title="Open Iraq agent company page"
                      className="text-xs text-text-muted hover:text-accent hover:underline text-left"
                    >
                      {iraqAgent}
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-text-muted">{iraqAgent}</div>
                ))}
            </div>
            <p className="text-sm sm:text-[15px] text-text-muted leading-snug">
              {product.genericNameEn ? (
                <button
                  type="button"
                  onClick={() => onSearchGeneric(product.genericNameEn!)}
                  title="View all products with this generic ingredient"
                  className="text-accent hover:underline text-left font-medium"
                >
                  {product.genericNameEn}
                </button>
              ) : (
                <span className="text-accent font-medium">Dietary Supplement</span>
              )}{' '}
              <span aria-hidden="true">·</span>{' '}
              <button
                type="button"
                onClick={() =>
                  onFilterClass(classified.groupKey, classified.subclassLabel)
                }
                title="View all drugs in this therapeutic subclass"
                className="hover:text-accent hover:underline text-left"
              >
                {classified.groupLabel} — {classified.subclassLabel}
              </button>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end shrink-0">
            <button
              type="button"
              onClick={() =>
                onFilterCompany(product.companyId, product.companyName)
              }
              title="View all products from this company"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-surface-raised px-3 py-1 text-xs font-medium text-accent hover:bg-primary/30 transition-colors duration-150"
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{makerLine}</span>
            </button>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryChipStyle}`}
            >
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>
        </div>

        {/* Quick-Facts Grid of Small Cards with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {market && (
            <>
              <QuickFactCard
                icon={<Scale className="w-4 h-4 text-accent" aria-hidden="true" />}
                label="Strength"
                value={market.strength}
                tabular
              />
              <QuickFactCard
                icon={<Pill className="w-4 h-4 text-accent" aria-hidden="true" />}
                label="Dosage Form"
                value={market.dosageForm}
              />
              <QuickFactCard
                icon={<Syringe className="w-4 h-4 text-accent" aria-hidden="true" />}
                label="Route"
                value={market.route}
              />
              <QuickFactCard
                icon={<Package className="w-4 h-4 text-accent" aria-hidden="true" />}
                label="Pack Size"
                value={market.packSize}
                tabular
              />
            </>
          )}
          <QuickFactCard
            icon={<Stethoscope className="w-4 h-4 text-accent" aria-hidden="true" />}
            label="Specialties"
            value={
              product.specialtyNamesEn.length > 0
                ? product.specialtyNamesEn.join(', ')
                : 'General Medicine'
            }
          />
          {market && (
            <QuickFactCard
              icon={<ShieldCheck className="w-4 h-4 text-success" aria-hidden="true" />}
              label="Market Status"
              value={MARKET_STATUS_LABELS[market.marketStatus]}
              tone={
                market.marketStatus === 'marketed_in_iraq'
                  ? 'success'
                  : 'neutral'
              }
            />
          )}
          <QuickFactCard
            icon={<Layers className="w-4 h-4 text-accent" aria-hidden="true" />}
            label="Generic Name"
            value={product.genericNameEn ?? '—'}
            onClick={
              product.genericNameEn
                ? () => onSearchGeneric(product.genericNameEn!)
                : undefined
            }
            actionTitle="Search other brands with this generic name"
          />
          <QuickFactCard
            icon={<Building2 className="w-4 h-4 text-accent" aria-hidden="true" />}
            label="Company"
            value={makerLine}
            onClick={() =>
              onFilterCompany(product.companyId, product.companyName)
            }
            actionTitle="View all products from this company"
          />
        </div>
      </div>

      {/* Same medicine, other brands */}
      {alternativesLoading ? (
        <section
          role="status"
          aria-label="Loading other brands"
          className="rounded-xl bg-surface border border-border p-4 space-y-2.5 animate-pulse"
        >
          <div className="h-4 w-48 rounded bg-surface-raised" />
          <div className="space-y-2 pt-1">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="h-10 rounded-lg bg-background/60 border border-border"
              />
            ))}
          </div>
        </section>
      ) : alternatives.length > 0 ? (
        <section className="space-y-2.5">
          <h2 className="text-base font-semibold text-text px-0.5">
            Same medicine, other brands
          </h2>
          <div className="rounded-xl bg-surface border border-border overflow-hidden divide-y divide-border">
            {[
              {
                key: 'same',
                title: 'Same strength',
                items: groupedAlternatives.sameStrength,
                expanded: showAllSameStrength,
                onExpand: () => setShowAllSameStrength(true),
              },
              {
                key: 'other',
                title: 'Other strengths',
                items: groupedAlternatives.otherStrengths,
                expanded: showAllOtherStrengths,
                onExpand: () => setShowAllOtherStrengths(true),
              },
            ]
              .filter((group) => group.items.length > 0)
              .map((group) => {
                const visibleItems = group.expanded
                  ? group.items
                  : group.items.slice(0, 6);
                return (
                  <div key={group.key}>
                    <div className="flex items-center justify-between gap-2 px-3.5 py-1.5 bg-surface-raised/90">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        {group.title}
                      </h3>
                      <span className="text-[11px] text-text-muted tabular-nums">
                        {group.items.length}
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {visibleItems.map((alt) => (
                        <a
                          key={alt.productId}
                          href={buildProductRouteHash(alt.productId)}
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenProduct(alt.productId);
                          }}
                          className="group flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-surface-raised/60 transition-colors duration-150"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm text-text group-hover:text-accent truncate transition-colors duration-150">
                              {alt.brandNameEn}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onFilterCompany(alt.companyId, alt.companyName);
                              }}
                              title={`Open ${alt.companyName} page`}
                              className="text-xs text-text-muted hover:text-accent hover:underline truncate block text-left max-w-full"
                            >
                              {alternativeSubtitle(alt)}
                            </button>
                          </div>
                          <ChevronRight
                            className="w-4 h-4 shrink-0 text-text-muted group-hover:text-accent transition-colors duration-150"
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>
                    {group.items.length > 6 && !group.expanded && (
                      <div className="px-3.5 py-2 bg-background/40 border-t border-border">
                        <button
                          type="button"
                          onClick={group.onExpand}
                          className="text-xs font-medium text-accent hover:underline"
                        >
                          Show all
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      ) : null}

      {/* Clinical Monograph Cards */}
      {enClinical && (
        <section className="space-y-3.5">
          <h2 className="text-base font-semibold text-text px-0.5">
            Clinical Information
          </h2>
          <div className="grid grid-cols-1 gap-3.5">
            <MonographSection
              icon={<Stethoscope className="w-4 h-4 text-accent" aria-hidden="true" />}
              title="Approved Indications"
              body={enClinical.approvedIndications}
              tone="default"
            />
            <MonographSection
              icon={<Clock className="w-4 h-4 text-accent" aria-hidden="true" />}
              title="Usual Adult Dose"
              body={enClinical.usualAdultDose}
              tone="default"
            />
            <MonographSection
              icon={<AlertOctagon className="w-4 h-4 text-danger" aria-hidden="true" />}
              title="Contraindications"
              body={enClinical.contraindications}
              tone="danger"
            />
            <MonographSection
              icon={<AlertTriangle className="w-4 h-4 text-warning" aria-hidden="true" />}
              title="Common Adverse Effects"
              body={enClinical.commonAdverseEffects}
              tone="warning"
            />
            <MonographSection
              icon={<Thermometer className="w-4 h-4 text-accent" aria-hidden="true" />}
              title="Storage Conditions"
              body={enClinical.storageConditions}
              tone="default"
            />
          </div>
        </section>
      )}

      {/* Bottom Sources, Checked Line & Report an Error */}
      <section className="rounded-xl bg-surface border border-border px-4 py-3.5 space-y-2.5">
        {sources.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Sources
            </h3>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{src.title || src.url}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          {checkedLine ? (
            <span className="text-xs text-text-muted">{checkedLine}</span>
          ) : (
            <span className="text-xs text-text-muted">
              Official clinical monograph
            </span>
          )}
          <button
            type="button"
            onClick={openReportSheet}
            className="text-xs text-text-muted hover:text-accent hover:underline transition-colors"
          >
            Report an error
          </button>
        </div>
      </section>

      {/* Drug Monograph Footer Partner Ad Placement */}
      {sponsoredAd && (
        <section aria-label="Partner notice">
          <SponsoredAdCard
            ad={sponsoredAd}
            compact
            hideWhenEmpty
            onAdClick={(adId) =>
              void recordSponsoredAdEvent(client, adId, 'click')
            }
          />
        </section>
      )}

      {/* Report an Error Bottom Sheet */}
      {reportOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Report an error"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !reportBusy) {
              setReportOpen(false);
            }
          }}
        >
          <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-surface border border-border p-4 sm:p-5 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-text">
                  Report an error
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {product.brandNameEn}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setReportOpen(false)}
                className="rounded-md p-1 text-text-muted hover:text-text hover:bg-surface-raised transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="space-y-3">
                <p className="rounded-xl bg-success/10 border border-success/40 px-3.5 py-2.5 text-xs text-success">
                  Thank you — we will check it.
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setReportOpen(false)}
                    className={`${secondaryButtonClass} px-4 py-1.5 text-xs`}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitErrorReport} className="space-y-3">
                {reportError && (
                  <CatalogBanner tone="error">{reportError}</CatalogBanner>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-text-muted">
                    What is wrong?
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ERROR_TOPICS.map((t) => {
                      const active = reportTopic === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setReportTopic(t.value)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                            active
                              ? 'bg-primary border-accent text-text'
                              : 'bg-background border-border text-text-muted hover:text-text'
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="Details (max 1000 characters)">
                  <textarea
                    rows={3}
                    required
                    maxLength={1000}
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Please describe what needs to be corrected…"
                    className={`${inputClass} bg-background text-xs sm:text-sm py-2`}
                  />
                </Field>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    disabled={reportBusy}
                    onClick={() => setReportOpen(false)}
                    className={`${secondaryButtonClass} px-3.5 py-1.5 text-xs`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reportBusy || !reportMessage.trim()}
                    className={`${buttonClass} w-auto px-4 py-1.5 text-xs`}
                  >
                    {reportBusy ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function QuickFactCard({
  icon,
  label,
  value,
  tabular,
  tone = 'neutral',
  onClick,
  actionTitle,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tabular?: boolean;
  tone?: 'neutral' | 'success';
  onClick?: () => void;
  actionTitle?: string;
}) {
  return (
    <div className="rounded-xl bg-background/70 border border-border p-3.5 space-y-1">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-muted">
        {icon}
        <span>{label}</span>
      </div>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          title={actionTitle}
          className="text-sm font-medium text-accent hover:underline text-left block"
        >
          {value}
        </button>
      ) : (
        <div
          className={`text-sm font-medium ${
            tabular ? 'tabular-nums' : ''
          } ${tone === 'success' ? 'text-success' : 'text-text'}`}
        >
          {value}
        </div>
      )}
    </div>
  );
}

function MonographSection({
  icon,
  title,
  body,
  tone = 'default',
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone?: 'default' | 'danger' | 'warning';
}) {
  const cardStyle =
    tone === 'danger'
      ? 'bg-danger/[0.06] border-danger/30'
      : tone === 'warning'
      ? 'bg-warning/[0.06] border-warning/30'
      : 'bg-surface border-border';

  const headingColor =
    tone === 'danger'
      ? 'text-danger'
      : tone === 'warning'
      ? 'text-warning'
      : 'text-accent';

  return (
    <div className={`rounded-2xl border p-5 space-y-2 ${cardStyle}`}>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${headingColor}`}>
          {title}
        </h3>
      </div>
      <p className="text-sm sm:text-[15px] text-text whitespace-pre-line leading-relaxed">
        {body}
      </p>
    </div>
  );
}

export function SponsoredAdCard({
  ad,
  onAdClick,
  compact = false,
  hideWhenEmpty = false,
}: {
  ad: DoctorSponsoredAd | null;
  onAdClick?: (adId: string) => void;
  compact?: boolean;
  hideWhenEmpty?: boolean;
}) {
  if (!ad) {
    if (hideWhenEmpty) return null;
    return (
      <div className="w-full min-h-[84px] rounded-2xl border border-dashed border-border/70 bg-surface/30" />
    );
  }

  const validMediaUrl =
    ad.imageUrl && /^https:\/\/[^ ]+$/.test(ad.imageUrl.trim())
      ? ad.imageUrl.trim()
      : null;
  const isVideo = isSponsoredAdVideoUrl(validMediaUrl);
  const validLinkUrl =
    ad.linkUrl && /^https:\/\/[^ ]+$/.test(ad.linkUrl.trim())
      ? ad.linkUrl.trim()
      : null;

  const textBlock = (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <div
          className={`${
            compact ? 'text-sm sm:text-base' : 'text-base'
          } font-semibold text-text`}
        >
          {ad.title}
        </div>
        {validLinkUrl && (
          <ExternalLink
            className="w-3.5 h-3.5 shrink-0 text-accent"
            aria-hidden="true"
          />
        )}
      </div>
      {ad.body && (
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
          {ad.body}
        </p>
      )}
    </div>
  );

  // When a short video is present alongside a link URL, keep video playback controls independent from the link anchor
  if (isVideo && validMediaUrl) {
    return (
      <div className="w-full rounded-2xl p-[1px] bg-gradient-to-r from-border via-accent/35 to-border transition-all duration-150 hover:via-accent/60">
        <div
          className={`w-full rounded-[15px] bg-surface/95 ${
            compact ? 'p-3.5 sm:p-4 space-y-2.5' : 'p-4 sm:p-5 space-y-3'
          }`}
        >
          {ad.sponsorName && (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="text-xs font-medium text-accent">
                {ad.sponsorName}
              </span>
            </div>
          )}

          <div className="rounded-xl bg-background border border-border p-2 flex items-center justify-center overflow-hidden">
            <video
              src={validMediaUrl}
              controls
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label={ad.title}
              className={`${
                compact ? 'max-h-[180px]' : 'max-h-[240px]'
              } w-full object-contain rounded`}
            />
          </div>

          {validLinkUrl ? (
            <a
              href={validLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAdClick?.(ad.adId)}
              className="block rounded-lg hover:opacity-90 transition-opacity"
            >
              {textBlock}
            </a>
          ) : (
            textBlock
          )}
        </div>
      </div>
    );
  }

  const content = (
    <div className="w-full rounded-2xl p-[1px] bg-gradient-to-r from-border via-accent/35 to-border transition-all duration-150 hover:via-accent/60">
      <div
        className={`w-full rounded-[15px] bg-surface/95 ${
          compact ? 'p-3.5 sm:p-4 space-y-2.5' : 'p-4 sm:p-5 space-y-3'
        }`}
      >
        {ad.sponsorName && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="text-xs font-medium text-accent">
              {ad.sponsorName}
            </span>
          </div>
        )}

        {validMediaUrl && (
          <div className="rounded-xl bg-background border border-border p-2 flex items-center justify-center overflow-hidden">
            <img
              src={validMediaUrl}
              alt={ad.title}
              loading="lazy"
              className={`${
                compact ? 'max-h-[160px]' : 'max-h-[200px]'
              } w-full object-contain rounded`}
            />
          </div>
        )}

        {textBlock}
      </div>
    </div>
  );

  if (validLinkUrl) {
    return (
      <a
        href={validLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onAdClick?.(ad.adId)}
        className="block rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

function getCompanyInitials(name: string | null | undefined): string {
  const words = (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'CO';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
}

function DoctorCompaniesDirectoryView({
  client,
  onBack,
  onOpenCompany,
}: {
  client: SupabaseClient;
  onBack: () => void;
  onOpenCompany: (companyId: string) => void;
}) {
  const [entries, setEntries] = useState<CompanyDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    void loadCompanyDirectory(client).then((res) => {
      if (!active) return;
      if (!res.ok) {
        setError(res.message);
        setEntries([]);
      } else {
        setEntries(res.data);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [client]);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) => {
      const hay = [
        entry.companyName,
        entry.originCountryName ?? '',
        entry.originCountryCode ?? '',
        entry.tagline ?? '',
        COMPANY_TYPE_LABELS[entry.companyType],
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entries, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Back"
            title="Back"
            onClick={onBack}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
          >
            ←
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-text">
              Companies
            </h1>
            <p className="text-xs text-text-muted">
              Verified pharmaceutical manufacturers and Iraq agents
            </p>
          </div>
        </div>
        {!loading && entries.length > 0 && (
          <span className="text-xs text-text-muted tabular-nums">
            {filteredEntries.length} of {entries.length}
          </span>
        )}
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          aria-label="Search companies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies by name or country…"
          className={`${inputClass} pl-10 min-h-[42px] bg-surface ${
            search ? 'pr-10' : ''
          }`}
        />
        {search && (
          <button
            type="button"
            aria-label="Clear company search"
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-text-muted hover:text-text"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {error && <CatalogBanner tone="error">{error}</CatalogBanner>}

      {loading ? (
        <div
          role="status"
          aria-label="Loading companies"
          className="rounded-xl bg-surface border border-border divide-y divide-border overflow-hidden"
        >
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="p-3.5 flex items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-surface-raised shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-40 rounded bg-surface-raised" />
                  <div className="h-3 w-28 rounded bg-surface-raised" />
                </div>
              </div>
              <div className="h-4 w-16 rounded bg-surface-raised shrink-0" />
            </div>
          ))}
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="rounded-xl bg-surface border border-border p-8 text-center space-y-1.5">
          <div className="text-sm font-semibold text-text">
            No matching companies found
          </div>
          <p className="text-xs text-text-muted">
            Try searching by another company name or country.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-surface border border-border divide-y divide-border overflow-hidden">
          {filteredEntries.map((entry) => {
            const logoUrl = companyMediaUrl(client, entry.logoPath);
            const subtitleParts = [
              entry.originCountryName,
              COMPANY_TYPE_LABELS[entry.companyType],
            ].filter(Boolean);
            return (
              <a
                key={entry.companyId}
                href={buildCompanyRouteHash(entry.companyId)}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCompany(entry.companyId);
                }}
                className="group flex items-center justify-between gap-3 px-3.5 py-3 hover:bg-surface-raised/60 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={entry.companyName}
                      loading="lazy"
                      className="w-10 h-10 rounded-xl object-contain bg-background border border-border p-1 shrink-0"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-xl bg-primary/20 border border-accent/35 flex items-center justify-center text-xs font-semibold tracking-wider text-accent shrink-0"
                    >
                      {getCompanyInitials(entry.companyName)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-text group-hover:text-accent truncate transition-colors duration-150">
                      {entry.companyName}
                    </div>
                    <div className="text-xs text-text-muted truncate">
                      {subtitleParts.join(' · ')}
                      {entry.tagline ? ` — ${entry.tagline}` : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-text-muted tabular-nums">
                    {entry.productCount}{' '}
                    {entry.productCount === 1 ? 'medicine' : 'medicines'}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors duration-150"
                    aria-hidden="true"
                  />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DoctorCompanyPageView({
  client,
  companyId,
  onBack,
  onOpenCompaniesDirectory,
  onOpenCompany,
  onOpenProduct,
}: {
  client: SupabaseClient;
  companyId: string;
  onBack: () => void;
  onOpenCompaniesDirectory: () => void;
  onOpenCompany: (companyId: string) => void;
  onOpenProduct: (productId: string) => void;
}) {
  const [page, setPage] = useState<CompanyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productQuery, setProductQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const viewedFeatureIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPage(null);
    setProductQuery('');
    setCollapsedGroups({});
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
    void loadCompanyPage(client, companyId).then((res) => {
      if (!active) return;
      if (!res.ok) {
        setError(res.message);
        setPage(null);
      } else {
        setPage(res.data);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [client, companyId]);

  useEffect(() => {
    const featureId = page?.feature?.id;
    if (featureId && !viewedFeatureIdsRef.current.has(featureId)) {
      viewedFeatureIdsRef.current.add(featureId);
      void recordSponsoredAdEvent(client, featureId, 'view');
    }
  }, [client, page?.feature?.id]);

  const filteredProducts = useMemo(() => {
    if (!page) return [];
    const q = productQuery.trim().toLowerCase();
    if (!q) return page.products;
    return page.products.filter((prod) => {
      const hay = [
        prod.brandNameEn,
        prod.genericNameEn ?? '',
        prod.drugClassNameEn ?? '',
        prod.strength ?? '',
        prod.dosageForm ?? '',
        prod.manufacturerName ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [page, productQuery]);

  const groupedProducts = useMemo(
    () => groupCompanyProducts(filteredProducts),
    [filteredProducts]
  );

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label="Back"
            title="Back"
            onClick={onBack}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
          >
            ←
          </button>
        </div>
        <div
          role="status"
          aria-label="Loading company page"
          className="rounded-2xl bg-surface border border-border overflow-hidden animate-pulse"
        >
          <div className="h-32 sm:h-40 bg-surface-raised" />
          <div className="p-5 space-y-3">
            <div className="h-6 w-48 rounded bg-surface-raised" />
            <div className="h-4 w-64 rounded bg-surface-raised" />
            <div className="h-16 w-full rounded-xl bg-background/60" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label="Back"
            title="Back"
            onClick={onBack}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
          >
            ←
          </button>
          <button
            type="button"
            onClick={onOpenCompaniesDirectory}
            className="text-xs font-medium text-accent hover:underline"
          >
            All companies
          </button>
        </div>
        <CatalogBanner tone="error">
          {error ?? 'Company not found.'}
        </CatalogBanner>
      </div>
    );
  }

  const coverUrl = companyMediaUrl(client, page.coverPath);
  const logoUrl = companyMediaUrl(client, page.logoPath);
  const factsLine = companyFacts(page);
  const feature = page.feature;
  const featureImageUrl =
    feature?.imageUrl && /^https:\/\/[^ ]+$/.test(feature.imageUrl.trim())
      ? feature.imageUrl.trim()
      : null;
  const featureLinkUrl =
    feature?.linkUrl && /^https:\/\/[^ ]+$/.test(feature.linkUrl.trim())
      ? feature.linkUrl.trim()
      : null;

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Back"
          title="Back"
          onClick={onBack}
          className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onOpenCompaniesDirectory}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface hover:bg-surface-raised px-3 py-1.5 text-xs font-medium text-text transition-colors duration-150"
        >
          <Building2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          <span>All companies</span>
        </button>
      </div>

      {/* Company Header Card with Cover + Overlapping Logo */}
      <section className="rounded-2xl bg-surface border border-border shadow-soft overflow-hidden">
        {coverUrl ? (
          <div className="h-32 sm:h-44 w-full bg-background overflow-hidden">
            <img
              src={coverUrl}
              alt={`${page.name} cover`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="h-28 sm:h-36 w-full bg-gradient-to-br from-[#253645] via-[#1B2834] to-[#131D26] border-b border-border/60"
          />
        )}

        <div className="px-4 sm:px-6 pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 -mt-8 sm:-mt-10">
            <div className="flex items-end gap-3.5 min-w-0">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={page.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-background border-2 border-surface p-1.5 shadow-md shrink-0"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#18242E] border-2 border-surface flex items-center justify-center text-lg sm:text-xl font-semibold tracking-wider text-accent shadow-md shrink-0"
                >
                  {getCompanyInitials(page.name)}
                </div>
              )}

              <div className="min-w-0 pt-2 sm:pt-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-semibold text-text leading-tight">
                    {page.name}
                  </h1>
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-primary/20 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    {COMPANY_TYPE_LABELS[page.companyType]}
                  </span>
                </div>
                {page.tagline && (
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    {page.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Website / Email / Call buttons when present */}
            {(page.websiteUrl || page.contactEmail || page.contactPhone) && (
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {page.websiteUrl && (
                  <a
                    href={page.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 hover:bg-surface-raised px-3 py-1.5 text-xs font-medium text-accent transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Website</span>
                  </a>
                )}
                {page.contactEmail && (
                  <a
                    href={`mailto:${page.contactEmail}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 hover:bg-surface-raised px-3 py-1.5 text-xs font-medium text-text hover:text-accent transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                )}
                {page.contactPhone && (
                  <a
                    href={`tel:${page.contactPhone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 hover:bg-surface-raised px-3 py-1.5 text-xs font-medium text-text hover:text-accent transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Call</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {factsLine && (
            <div className="text-xs text-text-muted font-medium">
              {factsLine}
            </div>
          )}

          {page.description && (
            <div className="space-y-1 pt-1 border-t border-border/60">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                About
              </h2>
              <p className="text-xs sm:text-sm text-text leading-relaxed whitespace-pre-line">
                {page.description}
              </p>
            </div>
          )}

          {page.agents.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-border/60">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Iraq agents
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {page.agents.map((ag) => (
                  <button
                    key={ag.id}
                    type="button"
                    onClick={() => onOpenCompany(ag.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 hover:border-accent/60 hover:text-accent px-3 py-1 text-xs font-medium text-text transition-colors"
                  >
                    <Building2 className="w-3 h-3 text-accent" aria-hidden="true" />
                    <span>{ag.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {page.represents.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-border/60">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Represents
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {page.represents.map((rep) => (
                  <button
                    key={rep.id}
                    type="button"
                    onClick={() => onOpenCompany(rep.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 hover:border-accent/60 hover:text-accent px-3 py-1 text-xs font-medium text-text transition-colors"
                  >
                    <Building2 className="w-3 h-3 text-accent" aria-hidden="true" />
                    <span>{rep.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature space when page.feature exists (NO Ad / Sponsored / Promoted text anywhere) */}
      {feature && (
        <section>
          {featureLinkUrl ? (
            <a
              href={featureLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                void recordSponsoredAdEvent(client, feature.id, 'click')
              }
              className="block rounded-2xl bg-surface border border-border overflow-hidden hover:border-accent/50 transition-colors duration-150"
            >
              {featureImageUrl && (
                <div className="w-full bg-background border-b border-border overflow-hidden">
                  <img
                    src={featureImageUrl}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-semibold text-text">
                    {feature.title}
                  </h2>
                  <ExternalLink
                    className="w-3.5 h-3.5 text-accent shrink-0"
                    aria-hidden="true"
                  />
                </div>
                {feature.body && (
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                    {feature.body}
                  </p>
                )}
              </div>
            </a>
          ) : (
            <div className="rounded-2xl bg-surface border border-border overflow-hidden">
              {featureImageUrl && (
                <div className="w-full bg-background border-b border-border overflow-hidden">
                  <img
                    src={featureImageUrl}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 space-y-1">
                <h2 className="text-sm sm:text-base font-semibold text-text">
                  {feature.title}
                </h2>
                {feature.body && (
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                    {feature.body}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Gallery (horizontal scroll, captions) hidden when empty */}
      {page.gallery.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted px-0.5">
            Gallery
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {page.gallery.map((img) => {
              const imgUrl = companyMediaUrl(client, img.storagePath);
              if (!imgUrl) return null;
              return (
                <figure
                  key={img.id}
                  className="shrink-0 w-60 sm:w-72 rounded-xl bg-surface border border-border overflow-hidden flex flex-col"
                >
                  <img
                    src={imgUrl}
                    alt={img.caption ?? page.name}
                    loading="lazy"
                    className="h-36 sm:h-40 w-full object-cover bg-background"
                  />
                  {img.caption && (
                    <figcaption className="px-3 py-2 text-xs text-text-muted truncate">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* Products grouped by collapsible therapeutic groups -> drug classes -> rows */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h2 className="text-base font-semibold text-text px-0.5">
            Medicines ({page.products.length})
          </h2>
          {page.products.length > 0 && (
            <div className="relative sm:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Filter company medicines"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Filter company medicines…"
                className={`${inputClass} pl-8 py-1.5 text-xs bg-surface`}
              />
              {productQuery && (
                <button
                  type="button"
                  aria-label="Clear medicine filter"
                  onClick={() => setProductQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 inline-flex items-center justify-center rounded text-text-muted hover:text-text"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>

        {page.products.length === 0 ? (
          <div className="rounded-xl bg-surface border border-border p-6 text-center text-xs text-text-muted">
            No published medicines for this company yet.
          </div>
        ) : groupedProducts.length === 0 ? (
          <div className="rounded-xl bg-surface border border-border p-6 text-center text-xs text-text-muted">
            No medicines match &ldquo;{productQuery}&rdquo;.
          </div>
        ) : (
          <div className="space-y-2.5">
            {groupedProducts.map((grp) => {
              const isCollapsed = Boolean(collapsedGroups[grp.groupKey]);
              return (
                <div
                  key={grp.groupKey}
                  className="rounded-xl bg-surface border border-border overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={!isCollapsed}
                    onClick={() => toggleGroup(grp.groupKey)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-surface-raised/90 hover:bg-surface-raised text-left transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-text">
                      {grp.groupLabel}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-text-muted tabular-nums">
                      <span>{grp.totalCount}</span>
                      {isCollapsed ? (
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="divide-y divide-border border-t border-border">
                      {grp.subclasses.map((sub) => (
                        <div key={`${grp.groupKey}-${sub.subclassLabel}`}>
                          <div className="flex items-center justify-between gap-2 px-3.5 py-1.5 bg-background/50">
                            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted truncate">
                              {sub.subclassLabel}
                            </h3>
                            <span className="text-[11px] text-text-muted tabular-nums shrink-0">
                              {sub.items.length}
                            </span>
                          </div>
                          <div className="divide-y divide-border">
                            {sub.items.map((prod) => {
                              const formLine = [
                                prod.strength,
                                prod.dosageForm,
                              ]
                                .filter(Boolean)
                                .join(' ');
                              return (
                                <a
                                  key={prod.productId}
                                  href={buildProductRouteHash(prod.productId)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onOpenProduct(prod.productId);
                                  }}
                                  className="group flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-surface-raised/60 transition-colors duration-150"
                                >
                                  <div className="min-w-0 flex-1 space-y-0.5">
                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                      <span className="font-semibold text-sm text-text group-hover:text-accent transition-colors duration-150">
                                        {prod.brandNameEn}
                                      </span>
                                      <span className="text-xs font-medium text-accent">
                                        {prod.genericNameEn ??
                                          'Dietary Supplement'}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-text-muted">
                                      {formLine && <span>{formLine}</span>}
                                      {prod.viaAgent &&
                                        prod.manufacturerName && (
                                          <span>
                                            {formLine ? '· ' : ''}by{' '}
                                            {prod.manufacturerName}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                  <ChevronRight
                                    className="w-4 h-4 shrink-0 text-text-muted group-hover:text-accent transition-colors duration-150"
                                    aria-hidden="true"
                                  />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}


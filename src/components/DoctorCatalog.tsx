import React, { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Bookmark,
  Building2,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Lock,
  Pencil,
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
  clearRecentDoctorDrugs,
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
import { agentLine, manufacturerLine } from '../lib/companies';
import {
  alternativeSubtitle,
  closeMatchNotice,
  groupAlternatives,
  loadProductAlternatives,
  type ProductAlternative,
} from '../lib/alternatives';
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileFullName, setProfileFullName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSpecialtyId, setProfileSpecialtyId] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);
  // The profile opens as a locked, read-only view; fields unlock only after "Edit profile".
  const [profileEditing, setProfileEditing] = useState(false);
  const [profileSaved, setProfileSaved] = useState({
    fullName: '',
    phone: '',
    specialtyId: '',
  });
  const [profileNotice, setProfileNotice] = useState<{
    tone: 'error' | 'ok';
    text: string;
  } | null>(null);

  // Standalone #/product/<id> drug page state
  const [activeProductId, setActiveProductId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? parseProductRoute(window.location.hash) : null
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

  // Listen to hashchange so #/product/<id> and phone/browser Back button work seamlessly
  useEffect(() => {
    const onHashChange = () => {
      const nextProductId = parseProductRoute(window.location.hash);
      setActiveProductId(nextProductId);
      setLinkCopied(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Load doctor profile summary immediately on mount so the greeting name resolves right away
  useEffect(() => {
    let active = true;
    void client.auth.getUser().then(async (userRes) => {
      if (!active) return;
      const user = userRes.data.user;
      const userId = user?.id;
      const meta = (user?.user_metadata ?? {}) as {
        full_name?: string | null;
        name?: string | null;
      };
      const metaName = (meta.full_name ?? meta.name ?? '').trim();
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
        });
      }
    });
    return () => {
      active = false;
    };
  }, [client]);

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

  const handleBackToCatalog = () => {
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
    window.location.hash = '/catalog';
  };

  const handleFilterByCompany = (targetCompanyId: string, companyName: string) => {
    setSpecialtyId('');
    setTherapeuticGroup('');
    setSelectedSubclass('');
    if (companies.some((c) => c.id === targetCompanyId)) {
      setQuery('');
      setDebouncedQuery('');
      setCompanyId(targetCompanyId);
    } else {
      setCompanyId('');
      setQuery(companyName);
      setDebouncedQuery(companyName);
    }
    setActiveProductId(null);
    window.location.hash = '/catalog';
  };

  const handleFilterByClass = (
    groupKey: TherapeuticGroupKey,
    subclassLabel?: string
  ) => {
    setTherapeuticGroup(groupKey);
    setSelectedSubclass(subclassLabel ?? '');
    setActiveProductId(null);
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

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileBusy(true);
    setProfileNotice(null);
    const res = await doctorSelfSignup(client, {
      fullName: profileFullName,
      phone: profilePhone,
      specialtyId: profileSpecialtyId,
    });
    setProfileBusy(false);
    if (!res.ok) {
      setProfileNotice({ tone: 'error', text: res.message });
      return;
    }
    setProfileSaved({
      fullName: profileFullName,
      phone: profilePhone,
      specialtyId: profileSpecialtyId,
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
    setProfileNotice(null);
    setProfileEditing(false);
  };

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
              aria-label="Saved and recent medicines"
              aria-expanded={savedOpen}
              title="Saved and recent medicines"
              className={`relative h-8 min-w-[32px] inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 sm:px-2.5 text-xs transition-colors duration-150 ${
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
              <span className="hidden sm:inline text-xs font-medium">Saved</span>
              {savedDrugs.length > 0 && (
                <span className="text-[11px] font-semibold tabular-nums text-accent">
                  {savedDrugs.length}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="My profile"
              aria-expanded={profileOpen}
              title="My profile"
              className={`h-8 min-w-[32px] inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 sm:px-2.5 text-xs transition-colors duration-150 ${
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
              <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium">Profile</span>
            </button>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="h-8 min-w-[32px] inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface/60 px-2 sm:px-2.5 text-xs text-text hover:bg-surface-raised hover:text-danger transition-colors duration-150"
              onClick={onSignOut}
            >
              <Power className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Saved & Recently Viewed Drawer */}
        {savedOpen && (
          <section className="rounded-2xl bg-surface border border-border shadow-soft p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="text-base font-semibold text-text">
                  Saved & recently viewed
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Quick access to medicines saved or opened on this device.
                </p>
              </div>
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setSavedOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Saved Medicines */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent tabular-nums">
                  Saved medicines ({savedDrugs.length})
                </div>
                {savedDrugs.length === 0 ? (
                  <p className="text-xs text-text-muted rounded-xl bg-background border border-border p-3.5">
                    No saved medicines yet. Open any product and tap Save to bookmark it here.
                  </p>
                ) : (
                  <div className="divide-y divide-border rounded-xl bg-background border border-border overflow-hidden">
                    {savedDrugs.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5"
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
                          onClick={() => setSavedDrugs(toggleSavedDoctorDrug(item))}
                          className="text-xs text-text-muted hover:text-danger px-2 py-1 rounded transition-colors duration-150"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recently Viewed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted tabular-nums">
                    Recently viewed ({recentDrugs.length})
                  </span>
                  {recentDrugs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setRecentDrugs(clearRecentDoctorDrugs())}
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {recentDrugs.length === 0 ? (
                  <p className="text-xs text-text-muted rounded-xl bg-background border border-border p-3.5">
                    Medicines you open will appear here for quick reference.
                  </p>
                ) : (
                  <div className="divide-y divide-border rounded-xl bg-background border border-border overflow-hidden">
                    {recentDrugs.map((item) => (
                      <button
                        key={item.productId}
                        type="button"
                        onClick={() => openProductPage(item.productId)}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-surface-raised/60 transition-colors duration-150"
                      >
                        <div className="text-xs font-semibold text-text truncate">
                          {item.brandNameEn}
                        </div>
                        <div className="text-xs text-text-muted truncate">
                          {item.genericNameEn ?? 'Dietary Supplement'} · {item.companyName}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Standalone My Profile & Preferences Page */}
        {profileOpen ? (
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  cancelProfileEdit();
                  setProfileOpen(false);
                }}
                className="min-h-[44px] inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface hover:bg-surface-raised px-3.5 py-2 text-sm font-medium text-text transition-colors duration-150"
              >
                ← Back
              </button>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/15 px-3 py-1 text-xs font-medium text-success">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Verified Physician Access</span>
              </span>
            </div>

            {/* Physician Identity & Clinical Dossier Card */}
            <section className="rounded-2xl bg-surface border border-border shadow-soft overflow-hidden">
              {/* Top Physician Identity Banner */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-surface via-surface-raised/70 to-surface border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div
                      aria-hidden="true"
                      className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-primary/25 border border-accent/40 flex items-center justify-center text-base sm:text-lg font-semibold tracking-wider text-accent shadow-inner"
                    >
                      {getDoctorInitials(profileSaved.fullName || profileFullName, access.email)}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-lg sm:text-xl font-semibold text-text truncate">
                          {formatDoctorDisplayTitle(profileSaved.fullName || profileFullName)}
                        </h1>
                        {!profileEditing && (
                          <span
                            className="inline-flex items-center gap-1 rounded-md bg-background/80 border border-border px-2 py-0.5 text-[11px] font-medium text-text-muted"
                            title="Your details are locked. Tap Edit profile to change them."
                          >
                            <Lock className="w-3 h-3" aria-hidden="true" />
                            Locked
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
                        <span className="inline-flex items-center gap-1 text-accent font-medium">
                          <Stethoscope className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{savedSpecialtyName || 'Specialty not specified'}</span>
                        </span>
                        {access.email && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="break-all">{access.email}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {!profileEditing ? (
                      <button
                        type="button"
                        onClick={startProfileEdit}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-[#1E7BC4] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                        Edit profile
                      </button>
                    ) : (
                      <span className="rounded-lg border border-accent/40 bg-primary/20 px-3 py-1.5 text-xs font-medium text-accent">
                        Editing credentials
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Clinical Activity Bar */}
                <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-border/70">
                  <div className="rounded-xl bg-background/60 border border-border px-3 py-2">
                    <div className="text-[11px] font-medium text-text-muted">
                      Saved monographs
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-text tabular-nums mt-0.5">
                      {savedDrugs.length}
                    </div>
                  </div>
                  <div className="rounded-xl bg-background/60 border border-border px-3 py-2">
                    <div className="text-[11px] font-medium text-text-muted">
                      Recently viewed
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-text tabular-nums mt-0.5">
                      {recentDrugs.length}
                    </div>
                  </div>
                  <div className="rounded-xl bg-background/60 border border-border px-3 py-2">
                    <div className="text-[11px] font-medium text-text-muted">
                      Formulary region
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-success mt-0.5 truncate">
                      Iraq Official
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials Body */}
              <div className="p-4 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-text">
                      My profile & clinical credentials
                    </h2>
                    <p className="text-xs text-text-muted mt-0.5">
                      {!profileEditing
                        ? 'Your verified physician profile used for specialty-matched clinical references.'
                        : 'Update your clinical details below, then save to lock your profile.'}
                    </p>
                  </div>
                  {profileNotice && (
                    <span
                      className={`rounded-lg border px-3 py-1 text-xs font-medium ${
                        profileNotice.tone === 'error'
                          ? 'border-danger/40 bg-danger/10 text-danger'
                          : 'border-success/40 bg-success/10 text-success'
                      }`}
                    >
                      {profileNotice.text}
                    </span>
                  )}
                </div>

                {!profileEditing ? (
                  <div className="space-y-5">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-background/70 border border-border p-3.5 min-w-0">
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                          <User className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                          <span>Full name</span>
                        </dt>
                        <dd className="mt-1.5 text-xs sm:text-sm font-medium text-text break-words">
                          {profileSaved.fullName ? (
                            formatDoctorDisplayTitle(profileSaved.fullName)
                          ) : (
                            <span className="text-text-muted">Not set</span>
                          )}
                        </dd>
                      </div>

                      <div className="rounded-xl bg-background/70 border border-border p-3.5 min-w-0">
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                          <Stethoscope className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                          <span>Medical specialty</span>
                        </dt>
                        <dd className="mt-1.5 text-xs sm:text-sm font-medium text-text break-words">
                          {savedSpecialtyName || (
                            <span className="text-text-muted">Not set</span>
                          )}
                        </dd>
                        {profileSaved.specialtyId &&
                          specialties.some((s) => s.id === profileSaved.specialtyId) && (
                            <button
                              type="button"
                              onClick={() => {
                                setSpecialtyId(profileSaved.specialtyId);
                                setProfileOpen(false);
                              }}
                              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline"
                            >
                              <span>Browse specialty drugs</span>
                              <ChevronRight className="w-3 h-3" aria-hidden="true" />
                            </button>
                          )}
                      </div>

                      <div className="rounded-xl bg-background/70 border border-border p-3.5 min-w-0">
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                          <span>Phone number</span>
                        </dt>
                        <dd className="mt-1.5 text-xs sm:text-sm font-medium text-text tabular-nums break-words">
                          {profileSaved.phone || (
                            <span className="text-text-muted">Not set</span>
                          )}
                        </dd>
                      </div>

                      <div className="rounded-xl bg-background/70 border border-border p-3.5 min-w-0">
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                          <Lock className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden="true" />
                          <span>Account email</span>
                        </dt>
                        <dd className="mt-1.5 text-xs sm:text-sm font-medium text-text break-all">
                          {access.email || (
                            <span className="text-text-muted">Not set</span>
                          )}
                        </dd>
                      </div>
                    </dl>

                    {/* Saved & Recently Consulted Clinical Workspace */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/70 pt-4">
                      {/* Saved Medicines */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent tabular-nums">
                            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>My saved medicines ({savedDrugs.length})</span>
                          </span>
                          {savedDrugs.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfileOpen(false);
                                setSavedOpen(true);
                              }}
                              className="text-xs font-medium text-accent hover:underline"
                            >
                              Saved & recent
                            </button>
                          )}
                        </div>
                        {savedDrugs.length === 0 ? (
                          <p className="text-xs text-text-muted rounded-xl bg-background/70 border border-border px-3.5 py-3">
                            No saved medicines yet. Open any monograph and tap Save to keep it in your quick clinical reference list.
                          </p>
                        ) : (
                          <div className="max-h-60 overflow-y-auto divide-y divide-border rounded-xl bg-background/70 border border-border">
                            {savedDrugs.map((item) => (
                              <button
                                key={item.productId}
                                type="button"
                                onClick={() => {
                                  setProfileOpen(false);
                                  openProductPage(item.productId);
                                }}
                                className="w-full flex items-center justify-between gap-2 text-left px-3.5 py-2.5 hover:bg-surface-raised/60 transition-colors duration-150"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-text truncate">
                                    {item.brandNameEn}
                                  </span>
                                  <span className="block text-[11px] text-text-muted truncate">
                                    {item.genericNameEn ?? 'Dietary Supplement'}
                                    {item.strength ? ` · ${item.strength}` : ''} · {item.companyName}
                                  </span>
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-text-muted" aria-hidden="true" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Recently Consulted Monographs */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Recently consulted ({recentDrugs.length})</span>
                          </span>
                          {recentDrugs.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setRecentDrugs(clearRecentDoctorDrugs())}
                              className="text-xs font-medium text-accent hover:underline"
                            >
                              Clear history
                            </button>
                          )}
                        </div>
                        {recentDrugs.length === 0 ? (
                          <p className="text-xs text-text-muted rounded-xl bg-background/70 border border-border px-3.5 py-3">
                            Monographs you view during clinical consultations will appear here for immediate recall.
                          </p>
                        ) : (
                          <div className="max-h-60 overflow-y-auto divide-y divide-border rounded-xl bg-background/70 border border-border">
                            {recentDrugs.map((item) => (
                              <button
                                key={item.productId}
                                type="button"
                                onClick={() => {
                                  setProfileOpen(false);
                                  openProductPage(item.productId);
                                }}
                                className="w-full flex items-center justify-between gap-2 text-left px-3.5 py-2.5 hover:bg-surface-raised/60 transition-colors duration-150"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-text truncate">
                                    {item.brandNameEn}
                                  </span>
                                  <span className="block text-[11px] text-text-muted truncate">
                                    {item.genericNameEn ?? 'Dietary Supplement'}
                                    {item.strength ? ` · ${item.strength}` : ''} · {item.companyName}
                                  </span>
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-text-muted" aria-hidden="true" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => void handleSaveProfile(e)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end rounded-xl bg-background/60 border border-border p-4"
                  >
                    <Field label="Full name (optional)">
                      <input
                        className={inputClass}
                        type="text"
                        value={profileFullName}
                        onChange={(e) => setProfileFullName(e.target.value)}
                        placeholder="Dr. Full Name"
                      />
                    </Field>
                    <Field label="Phone number">
                      <input
                        className={inputClass}
                        type="tel"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="+964 770 123 4567"
                      />
                    </Field>
                    <Field label="Medical specialty">
                      <select
                        className={inputClass}
                        required
                        value={profileSpecialtyId}
                        onChange={(e) => setProfileSpecialtyId(e.target.value)}
                      >
                        <option value="">— Select specialty —</option>
                        {physicianSpecialties.map((spec) => (
                          <option key={spec.id} value={spec.id}>
                            {spec.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/70">
                      <span className="text-xs text-text-muted break-all">
                        Account email: <strong className="text-text">{access.email ?? '—'}</strong>
                      </span>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={cancelProfileEdit}
                          disabled={profileBusy}
                          className={`${secondaryButtonClass} flex-1 sm:flex-none sm:w-auto px-4 py-2 text-xs`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={
                            profileBusy ||
                            !profilePhone.trim() ||
                            !profileSpecialtyId.trim()
                          }
                          className={`${buttonClass} flex-1 sm:flex-none sm:w-auto px-4 py-2 text-xs`}
                        >
                          {profileBusy ? 'Saving…' : 'Save profile'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
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
        ) : activeProductId ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleBackToCatalog}
                className="min-h-[44px] inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface hover:bg-surface-raised px-3.5 py-2 text-sm font-medium text-text transition-colors duration-150"
              >
                ← Back
              </button>

              {selectedProduct && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSaveProduct(selectedProduct)}
                    aria-pressed={isSelectedProductSaved}
                    className={`min-h-[44px] inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
                      isSelectedProductSaved
                        ? 'border-accent bg-primary/30 text-accent'
                        : 'border-border bg-surface text-text hover:bg-surface-raised'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" aria-hidden="true" />
                    <span>{isSelectedProductSaved ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleShareProductLink(selectedProduct)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium text-text hover:bg-surface-raised transition-colors duration-150"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4 text-success" aria-hidden="true" />
                        <span className="text-success">Link copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                        <span>Share</span>
                      </>
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
                                    <span className="text-xs text-text-muted truncate shrink-0">
                                      {row.companyName}
                                    </span>
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
                  title="View all products from this company"
                  className="text-xs sm:text-sm font-medium text-text hover:text-accent hover:underline text-left"
                >
                  {makerLine}
                </button>
              </div>
              {iraqAgent && (
                <div className="text-xs text-text-muted">{iraqAgent}</div>
              )}
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
                            <div className="text-xs text-text-muted truncate">
                              {alternativeSubtitle(alt)}
                            </div>
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

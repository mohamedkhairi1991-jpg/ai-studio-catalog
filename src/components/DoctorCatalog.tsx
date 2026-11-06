import React, { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
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
  RefreshCw,
  Scale,
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
  buildProductRouteHash,
  clearRecentDoctorDrugs,
  loadDoctorHomeSuggestions,
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
  toggleSavedDoctorDrug,
  type CatalogProduct,
  type CompanySummary,
  type DoctorHomeSuggestion,
  type DoctorSearchRow,
  type DoctorSponsoredAd,
  type SavedOrRecentDrugItem,
  type TaxonomyItem,
} from '../lib/catalog';
import {
  doctorSelfSignup,
  listSpecialties,
  loadDoctorProfileSummary,
  recordDoctorAppOpen,
  type Option,
} from '../lib/onboarding';
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

function extractDoctorFirstName(fullName: string): string | null {
  const cleaned = fullName
    .replace(/^(dr\.?|doctor)\s+/i, '')
    .trim();
  if (!cleaned) return null;
  return cleaned.split(/\s+/)[0] ?? null;
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

  const [rows, setRows] = useState<DoctorSearchRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<DoctorHomeSuggestion[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
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

  const searchReqSeqRef = useRef(0);
  const detailReqSeqRef = useRef(0);
  const suggestionsReqSeqRef = useRef(0);
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

  const loadSuggestions = useCallback(async () => {
    const seq = ++suggestionsReqSeqRef.current;
    const seed = seq - 1;
    setSuggestionsLoading(true);
    setSuggestionsError(null);
    // First load shows today's pair and ad; each Refresh asks for another pair and ad.
    const [res, ad] = await Promise.all([
      loadDoctorHomeSuggestions(client, 2, seed),
      loadDoctorSponsoredAd(client, seed),
    ]);
    if (seq !== suggestionsReqSeqRef.current) return;
    setSponsoredAd(ad);
    if (!res.ok) {
      setSuggestionsError(res.message);
      setSuggestions([]);
    } else {
      setSuggestions(res.data);
    }
    setSuggestionsLoading(false);
  }, [client]);

  // Load verified companies, active specialties, doctor profile summary, and home suggestions once on mount
  useEffect(() => {
    let active = true;
    void Promise.all([
      loadVerifiedCompanies(client),
      loadSpecialtiesCatalog(client),
      listSpecialties(client),
      client.auth.getUser(),
    ]).then(async ([companyList, specialtyList, physicianSpecList, userRes]) => {
      if (!active) return;
      setCompanies(companyList);
      setSpecialties(specialtyList);
      setPhysicianSpecialties(physicianSpecList);

      const userId = userRes.data.user?.id;
      if (userId) {
        void recordDoctorAppOpen(client, userId);
        const summary = await loadDoctorProfileSummary(client, userId);
        if (!active) return;
        setProfileFullName(summary.fullName);
        setProfilePhone(summary.phone);
        setProfileSpecialtyId(summary.specialtyId);
        setProfileSaved({
          fullName: summary.fullName,
          phone: summary.phone,
          specialtyId: summary.specialtyId,
        });
      }
    });
    void loadSuggestions();
    return () => {
      active = false;
    };
  }, [client, loadSuggestions]);

  // Debounce search query by 300 ms
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const isSearchingOrFiltering = Boolean(
    query.trim() || debouncedQuery.trim() || companyId || specialtyId
  );

  const runSearch = useCallback(
    async (
      searchQuery: string,
      filterCompanyId: string,
      filterSpecialtyId: string
    ) => {
      if (!searchQuery.trim()) {
        searchRecordTrackerRef.current.lastQuery = null;
      }

      if (!searchQuery.trim() && !filterCompanyId && !filterSpecialtyId) {
        searchReqSeqRef.current++;
        setRows([]);
        setTotalCount(0);
        setLoading(false);
        setError(null);
        return;
      }

      const seq = ++searchReqSeqRef.current;
      setLoading(true);
      setError(null);

      const res = await searchCatalogProducts(client, {
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
      } else {
        setRows(res.data.rows);
        setTotalCount(res.data.totalCount);
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
    void runSearch(debouncedQuery, companyId, specialtyId);
  }, [runSearch, debouncedQuery, companyId, specialtyId]);

  const handleLoadMore = useCallback(async () => {
    if (loading || loadingMore || rows.length >= totalCount) return;
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
    totalCount,
  ]);

  // Record anonymous ad view once per page load when a sponsored ad is displayed on Home
  useEffect(() => {
    if (
      !activeProductId &&
      !isSearchingOrFiltering &&
      sponsoredAd?.adId &&
      !viewedAdIdsRef.current.has(sponsoredAd.adId)
    ) {
      viewedAdIdsRef.current.add(sponsoredAd.adId);
      void recordSponsoredAdEvent(client, sponsoredAd.adId, 'view');
    }
  }, [client, activeProductId, isSearchingOrFiltering, sponsoredAd]);

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
    setQuery(clean);
    setDebouncedQuery(clean);
    setActiveProductId(null);
    window.location.hash = '/catalog';
  };

  const handleFilterByCompany = (targetCompanyId: string, companyName: string) => {
    setSpecialtyId('');
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
    await loadSuggestions();
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

  const doctorSpecialtyName =
    suggestions[0]?.specialtyName ||
    physicianSpecialties.find((s) => s.id === profileSpecialtyId)?.label ||
    specialties.find((s) => s.id === profileSpecialtyId)?.nameEn ||
    'Your specialty';

  const doctorFirstName = extractDoctorFirstName(profileFullName);
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleGoHome}
              aria-label="Pharmaty home"
              title="Return to home"
              className="min-h-[44px] inline-flex items-center rounded-lg px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-opacity duration-150 hover:opacity-90"
            >
              <BrandLogo className="text-xl" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Saved and recent medicines"
              aria-expanded={savedOpen}
              title="Saved and recent medicines"
              className={`relative min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 sm:px-3.5 transition-colors duration-150 ${
                savedOpen
                  ? 'border-accent bg-background text-accent'
                  : 'border-border bg-surface/60 text-text hover:bg-surface-raised'
              }`}
              onClick={() => {
                setSavedOpen((v) => !v);
                setProfileOpen(false);
              }}
            >
              <Bookmark className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium">Saved</span>
              {savedDrugs.length > 0 && (
                <span className="text-xs font-semibold tabular-nums text-accent">
                  {savedDrugs.length}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="My profile"
              aria-expanded={profileOpen}
              title="My profile"
              className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 sm:px-3.5 transition-colors duration-150 ${
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
              <User className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium">Profile</span>
            </button>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface/60 px-2.5 sm:px-3.5 text-text hover:bg-surface-raised hover:text-danger transition-colors duration-150"
              onClick={onSignOut}
            >
              <Power className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium">Sign out</span>
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
            <div>
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
            </div>

            <section className="rounded-2xl bg-surface border border-border shadow-soft p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <h2 className="text-base font-semibold text-text">
                    My profile
                  </h2>
                  {!profileEditing ? (
                    <span
                      className="inline-flex items-center gap-1 rounded-md bg-background/80 border border-border px-2 py-0.5 text-[11px] font-medium text-text-muted"
                      title="Your details are locked. Tap Edit profile to change them."
                    >
                      <Lock className="w-3 h-3" aria-hidden="true" />
                      Locked
                    </span>
                  ) : (
                    <span className="text-xs text-text-muted">
                      Update your details below, then save.
                    </span>
                  )}
                  {profileNotice && (
                    <span
                      className={`text-xs font-medium ${
                        profileNotice.tone === 'error'
                          ? 'text-danger'
                          : 'text-success'
                      }`}
                    >
                      · {profileNotice.text}
                    </span>
                  )}
                </div>
                {!profileEditing && (
                  <button
                    type="button"
                    onClick={startProfileEdit}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-[#1E7BC4] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    Edit profile
                  </button>
                )}
              </div>
              {!profileEditing ? (
                <div className="space-y-4">
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 rounded-xl bg-background/70 border border-border px-4 py-3">
                    {[
                      { label: 'Full name', value: profileSaved.fullName, isEmail: false },
                      { label: 'Medical specialty', value: savedSpecialtyName, isEmail: false },
                      { label: 'Phone number', value: profileSaved.phone, isEmail: false },
                      { label: 'Email', value: access.email ?? '', isEmail: true },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className={`min-w-0 ${row.isEmail ? 'col-span-2 sm:col-span-1' : ''}`}
                      >
                        <dt className="text-[11px] font-medium text-text-muted">
                          {row.label}
                        </dt>
                        <dd
                          className={`mt-0.5 text-xs sm:text-sm font-medium text-text ${
                            row.isEmail ? 'break-all' : 'break-words'
                          }`}
                        >
                          {row.value || <span className="text-text-muted">Not set</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="space-y-2 border-t border-border/70 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-accent tabular-nums">
                        My saved medicines ({savedDrugs.length})
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
                      <p className="text-xs text-text-muted rounded-lg bg-background/70 border border-border px-3 py-2.5">
                        No saved medicines yet. Open any medicine and tap Save to keep it here.
                      </p>
                    ) : (
                      <div className="max-h-56 overflow-y-auto divide-y divide-border rounded-xl bg-background/70 border border-border">
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
                            <span className="min-w-0 flex items-baseline gap-2 truncate">
                              <span className="text-xs font-semibold text-text truncate">
                                {item.brandNameEn}
                              </span>
                              <span className="text-xs text-text-muted truncate">
                                {item.genericNameEn ?? 'Dietary Supplement'} · {item.companyName}
                              </span>
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-text-muted" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => void handleSaveProfile(e)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
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
                  <div className="sm:col-span-3 flex flex-wrap items-center justify-end gap-2 pt-1">
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
                    <button
                      type="button"
                      onClick={cancelProfileEdit}
                      disabled={profileBusy}
                      className={`${secondaryButtonClass} flex-1 sm:flex-none sm:w-auto px-4 py-2 text-xs`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* Bottom space reserved for the sponsored ad (keeps its small "Sponsored" tag) */}
            <section aria-label="Sponsored" className="mt-auto pt-2">
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
                  product={selectedProduct}
                  onSearchGeneric={handleSearchByGeneric}
                  onFilterCompany={handleFilterByCompany}
                />
              )
            )}
          </div>
        ) : (
          <>
            {error && <CatalogBanner tone="error">{error}</CatalogBanner>}

            {/* Doctor Greeting Line + Specialty Chip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-text-muted">
                <span className="font-medium text-text">{greetingText}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-raised border border-border px-2.5 py-0.5 text-xs font-medium text-accent">
                  <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{doctorSpecialtyName}</span>
                </span>
              </div>
            </div>

            {/* Top Search & Filter Toolbar */}
            <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                  aria-hidden="true"
                />
                <input
                  id="doctor-catalog-search"
                  type="search"
                  aria-label="Search by brand, generic name, or company"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, generic name, or company"
                  className={`${inputClass} pl-10 min-h-[46px] bg-surface ${
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-surface-raised transition-colors duration-150"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5">
                <div className="sm:w-48">
                  <select
                    id="doctor-catalog-company"
                    aria-label="Filter by company"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className={`${inputClass} min-h-[46px] bg-surface py-2 text-xs sm:text-sm`}
                  >
                    <option value="">All companies</option>
                    {companies.map((comp) => (
                      <option key={comp.id} value={comp.id}>
                        {comp.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:w-48">
                  <select
                    id="doctor-catalog-specialty"
                    aria-label="Filter by specialty"
                    value={specialtyId}
                    onChange={(e) => setSpecialtyId(e.target.value)}
                    className={`${inputClass} min-h-[46px] bg-surface py-2 text-xs sm:text-sm`}
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

              {isSearchingOrFiltering && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setDebouncedQuery('');
                    setCompanyId('');
                    setSpecialtyId('');
                  }}
                  className="min-h-[40px] text-xs font-medium text-accent hover:underline px-2.5 py-1.5 shrink-0 self-end sm:self-center"
                >
                  Reset
                </button>
              )}
            </section>

            {/* Home View (when search box is empty and no filter is chosen) */}
            {!isSearchingOrFiltering ? (
              <div className="space-y-6">
                {/* Section a: For your specialty */}
                <section className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold text-text">
                      For your specialty: {doctorSpecialtyName}
                    </h2>
                    <button
                      type="button"
                      aria-label="Refresh specialty suggestions"
                      title="Refresh suggestions"
                      disabled={suggestionsLoading}
                      onClick={() => void loadSuggestions()}
                      className="min-h-[36px] inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-text-muted hover:text-text hover:bg-surface-raised/70 disabled:opacity-50 transition-colors duration-150"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${
                          suggestionsLoading ? 'animate-spin' : ''
                        }`}
                        aria-hidden="true"
                      />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {suggestionsError && (
                    <CatalogBanner tone="error">
                      {suggestionsError}
                    </CatalogBanner>
                  )}

                  {suggestionsLoading ? (
                    <div
                      role="status"
                      aria-label="Loading specialty suggestions"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {[0, 1].map((idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl bg-surface border border-border p-5 space-y-3 animate-pulse"
                        >
                          <div className="h-5 w-40 rounded bg-surface-raised" />
                          <div className="h-3.5 w-28 rounded bg-surface-raised" />
                          <div className="h-3.5 w-36 rounded bg-surface-raised" />
                          <div className="h-6 w-24 rounded-md bg-surface-raised" />
                        </div>
                      ))}
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="rounded-2xl bg-surface border border-border p-8 text-center text-sm text-text-muted">
                      No published products for this specialty yet. Use the search box above to search the catalog.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {suggestions.slice(0, 2).map((item) => {
                        const presentation = [item.strength, item.dosageForm]
                          .filter(Boolean)
                          .join(' · ');
                        return (
                          <a
                            key={item.productId}
                            href={buildProductRouteHash(item.productId)}
                            onClick={(e) => {
                              e.preventDefault();
                              openProductPage(item.productId);
                            }}
                            className="group flex items-center justify-between gap-3 rounded-2xl bg-surface border border-border hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-soft p-5 transition-all duration-150"
                          >
                            <div className="min-w-0 flex-1 space-y-1.5">
                              <div className="font-semibold text-base text-text group-hover:text-accent transition-colors duration-150 truncate">
                                {item.brandNameEn}
                              </div>
                              <div className="text-sm font-medium text-accent truncate">
                                {item.genericNameEn ?? 'Dietary Supplement'}
                              </div>
                              {presentation && (
                                <div className="text-xs text-text-muted tabular-nums">
                                  {presentation}
                                </div>
                              )}
                              <div className="pt-1">
                                <span className="inline-flex items-center gap-1 rounded-md bg-surface-raised/80 border border-border px-2 py-0.5 text-xs text-text-muted">
                                  <Building2 className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                                  <span className="truncate">{item.companyName}</span>
                                </span>
                              </div>
                            </div>
                            <ChevronRight
                              className="w-5 h-5 shrink-0 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150"
                              aria-hidden="true"
                            />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Section b: Clearly separated Sponsored ad space */}
                <section
                  aria-label="Sponsored"
                  className="pt-3 border-t border-border/80"
                >
                  <SponsoredAdCard
                    ad={sponsoredAd}
                    onAdClick={(adId) =>
                      void recordSponsoredAdEvent(client, adId, 'click')
                    }
                  />
                </section>
              </div>
            ) : (
              /* Search & Filter Results View */
              <section className="space-y-4">
                {loading ? (
                  <div
                    role="status"
                    aria-label="Loading catalog"
                    className="rounded-2xl bg-surface border border-border overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <div className="h-4 w-20 rounded bg-surface-raised animate-pulse" />
                      <div className="h-5 w-28 rounded-full bg-surface-raised animate-pulse" />
                    </div>
                    <div className="divide-y divide-border">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <div
                          key={idx}
                          className="px-4 py-4 flex items-center justify-between gap-4 animate-pulse"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-44 rounded bg-surface-raised" />
                            <div className="h-3.5 w-32 rounded bg-surface-raised" />
                            <div className="h-3 w-52 rounded bg-surface-raised" />
                          </div>
                          <div className="h-4 w-4 rounded bg-surface-raised shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : rows.length === 0 ? (
                  <div className="rounded-2xl bg-surface border border-border p-10 sm:p-12 text-center space-y-2.5">
                    <div className="mx-auto w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center text-text-muted">
                      <Search className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h2 className="text-base font-semibold text-text">
                      No published products match your search.
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                      Try checking the spelling, searching by generic active ingredient (e.g. bisoprolol, paracetamol), or clearing active filters.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-surface border border-border shadow-soft overflow-hidden">
                    <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between text-xs text-text-muted">
                      <span className="font-semibold uppercase tracking-wider">
                        Products
                      </span>
                      <span className="inline-flex items-center rounded-full bg-surface-raised border border-border px-2.5 py-0.5 text-xs font-medium text-text tabular-nums">
                        Showing {rows.length} of {totalCount}
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {rows.map((row) => {
                        const presentation = [row.strength, row.dosageForm]
                          .filter(Boolean)
                          .join(' · ');
                        return (
                          <a
                            key={row.productId}
                            href={buildProductRouteHash(row.productId)}
                            onClick={(e) => {
                              e.preventDefault();
                              openProductPage(row.productId);
                            }}
                            className="group flex items-center justify-between gap-3 w-full text-left px-4 sm:px-5 py-3.5 hover:bg-surface-raised/60 transition-colors duration-150"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="font-semibold text-sm sm:text-[15px] text-text group-hover:text-accent transition-colors duration-150 truncate">
                                  {row.brandNameEn}
                                </span>
                              </div>

                              <div className="text-xs sm:text-sm font-medium text-accent mt-0.5 truncate">
                                {row.genericNameEn ?? 'Dietary Supplement'}
                              </div>

                              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
                                {presentation && (
                                  <span className="tabular-nums">{presentation}</span>
                                )}
                                {presentation && <span aria-hidden="true">·</span>}
                                <span className="truncate">{row.companyName}</span>
                              </div>
                            </div>
                            <ChevronRight
                              className="w-4 h-4 shrink-0 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150"
                              aria-hidden="true"
                            />
                          </a>
                        );
                      })}
                    </div>

                    {rows.length < totalCount && (
                      <div className="p-3.5 border-t border-border bg-background/40 text-center">
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
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
      <LegalFooter />
    </div>
  );
}

function DoctorProductDetail({
  product,
  onSearchGeneric,
  onFilterCompany,
}: {
  product: CatalogProduct;
  onSearchGeneric: (genericName: string) => void;
  onFilterCompany: (companyId: string, companyName: string) => void;
}) {
  const market = product.market;
  const enClinical = product.marketTranslations.en;
  const sources = product.aiSources ?? [];

  const categoryChipStyle =
    product.category === 'otc_drug'
      ? 'border-warning/40 bg-warning/15 text-warning'
      : product.category === 'prescription_drug'
      ? 'border-success/40 bg-success/15 text-success'
      : 'border-accent/40 bg-accent/15 text-accent';

  return (
    <div className="space-y-6">
      {/* Hero Header Card */}
      <div className="rounded-2xl bg-surface border border-border shadow-soft p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-text leading-tight">
              {product.brandNameEn}
            </h1>
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
              <span>{product.drugClassNameEn}</span>
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
              <span>{product.companyName}</span>
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
            value={product.companyName}
            onClick={() =>
              onFilterCompany(product.companyId, product.companyName)
            }
            actionTitle="View all products from this company"
          />
        </div>
      </div>

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

      {/* Official Sources List */}
      {sources.length > 0 && (
        <section className="rounded-2xl bg-surface border border-border p-5 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Reference Sources
          </h3>
          <ul className="space-y-2">
            {sources.map((src) => (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline break-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{src.title || src.url}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
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
}: {
  ad: DoctorSponsoredAd | null;
  onAdClick?: (adId: string) => void;
}) {
  if (!ad) {
    return (
      <div className="w-full min-h-[84px] rounded-2xl border border-dashed border-border/70 bg-surface/30" />
    );
  }

  const validImageUrl =
    ad.imageUrl && /^https:\/\/[^ ]+$/.test(ad.imageUrl.trim())
      ? ad.imageUrl.trim()
      : null;
  const validLinkUrl =
    ad.linkUrl && /^https:\/\/[^ ]+$/.test(ad.linkUrl.trim())
      ? ad.linkUrl.trim()
      : null;

  const content = (
    <div className="w-full rounded-2xl p-[1px] bg-gradient-to-r from-border via-accent/35 to-border transition-all duration-150 hover:via-accent/60">
      <div className="w-full rounded-[15px] bg-surface/95 p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-wider text-text-muted">
            Sponsored
          </span>
          {ad.sponsorName && (
            <span className="text-xs font-medium text-accent">
              {ad.sponsorName}
            </span>
          )}
        </div>

        {validImageUrl && (
          <div className="rounded-xl bg-background border border-border p-2 flex items-center justify-center">
            <img
              src={validImageUrl}
              alt={ad.title}
              className="max-h-[200px] w-full object-contain rounded"
            />
          </div>
        )}

        <div className="space-y-1">
          <div className="text-base font-semibold text-text">{ad.title}</div>
          {ad.body && (
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {ad.body}
            </p>
          )}
        </div>
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

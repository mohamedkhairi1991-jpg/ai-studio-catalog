import React, { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  buildProductRouteHash,
  loadDoctorHomeSuggestions,
  loadProductDetail,
  loadSpecialtiesCatalog,
  loadVerifiedCompanies,
  parseProductRoute,
  searchCatalogProducts,
  type CatalogProduct,
  type CompanySummary,
  type DoctorHomeSuggestion,
  type DoctorSearchRow,
  type TaxonomyItem,
} from '../lib/catalog';
import {
  doctorSelfSignup,
  listSpecialties,
  loadDoctorProfileSummary,
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

export function CatalogBanner({
  tone,
  children,
}: {
  tone: 'error' | 'warn' | 'success';
  children: React.ReactNode;
}) {
  const palette =
    tone === 'error'
      ? 'bg-[#FF7272]/10 border-[#FF7272]/40 text-[#FF7272]'
      : tone === 'warn'
      ? 'bg-[#F59E0B]/10 border-[#F59E0B]/40 text-[#F59E0B]'
      : 'bg-[#38C976]/10 border-[#38C976]/40 text-[#38C976]';
  return (
    <div className={`rounded-lg border px-4 py-3 text-xs ${palette}`}>
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

  // My profile state
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileFullName, setProfileFullName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSpecialtyId, setProfileSpecialtyId] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);
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

  // Listen to hashchange so #/product/<id> and phone/browser Back button work seamlessly
  useEffect(() => {
    const onHashChange = () => {
      const nextProductId = parseProductRoute(window.location.hash);
      setActiveProductId(nextProductId);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const loadSuggestions = useCallback(async () => {
    const seq = ++suggestionsReqSeqRef.current;
    setSuggestionsLoading(true);
    setSuggestionsError(null);
    const res = await loadDoctorHomeSuggestions(client, 2);
    if (seq !== suggestionsReqSeqRef.current) return;
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
        const summary = await loadDoctorProfileSummary(client, userId);
        if (!active) return;
        setProfileFullName(summary.fullName);
        setProfilePhone(summary.phone);
        setProfileSpecialtyId(summary.specialtyId);
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
      }
      setDetailLoading(false);
    });
  }, [client, activeProductId]);

  const openProductPage = (productId: string) => {
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
    setProfileNotice({ tone: 'ok', text: 'Profile updated.' });
    await loadSuggestions();
  };

  const doctorSpecialtyName =
    suggestions[0]?.specialtyName ||
    physicianSpecialties.find((s) => s.id === profileSpecialtyId)?.label ||
    specialties.find((s) => s.id === profileSpecialtyId)?.nameEn ||
    'Your specialty';

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Clean Modern Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span className="h-4 w-px bg-[#304451] hidden sm:inline" />
            <span className="text-sm text-[#B8C3CC] hidden sm:inline">
              Official Catalog
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-[#B8C3CC] hidden md:inline">
              {access.email}
            </span>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setProfileOpen((v) => !v);
                setProfileNotice(null);
              }}
            >
              My profile
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={onSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* My Profile Drawer / Card */}
        {profileOpen && (
          <section className="rounded-xl bg-[#263744] border border-[#304451] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#304451] pb-3">
              <div>
                <h2 className="text-base font-semibold text-[#F2F5F8]">
                  My profile
                </h2>
                <p className="text-xs text-[#B8C3CC]">
                  Update your phone number and medical specialty.
                </p>
              </div>
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setProfileOpen(false)}
              >
                Close
              </button>
            </div>
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
              <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-1">
                <div>
                  {profileNotice && (
                    <p
                      className={`text-xs ${
                        profileNotice.tone === 'error'
                          ? 'text-[#FF7272]'
                          : 'text-[#38C976]'
                      }`}
                    >
                      {profileNotice.text}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={
                    profileBusy ||
                    !profilePhone.trim() ||
                    !profileSpecialtyId.trim()
                  }
                  className={`${buttonClass} sm:w-auto px-5`}
                >
                  {profileBusy ? 'Saving…' : 'Save profile'}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Standalone Drug Page (#/product/<id>) */}
        {activeProductId ? (
          <div className="space-y-4">
            <div>
              <button
                type="button"
                onClick={handleBackToCatalog}
                className={secondaryButtonClass}
              >
                ← Back
              </button>
            </div>

            {detailError && (
              <CatalogBanner tone="error">{detailError}</CatalogBanner>
            )}

            {detailLoading ? (
              <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
                Loading product details…
              </div>
            ) : (
              selectedProduct && (
                <DoctorProductDetail product={selectedProduct} />
              )
            )}
          </div>
        ) : (
          <>
            {error && <CatalogBanner tone="error">{error}</CatalogBanner>}

            {/* Top Search & Filter Toolbar */}
            <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <input
                  id="doctor-catalog-search"
                  type="search"
                  aria-label="Search by brand, generic name, or company"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, generic name, or company"
                  className={inputClass}
                />
              </div>

              <div className="sm:w-56">
                <select
                  id="doctor-catalog-company"
                  aria-label="Filter by company"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">All companies</option>
                  {companies.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:w-56">
                <select
                  id="doctor-catalog-specialty"
                  aria-label="Filter by specialty"
                  value={specialtyId}
                  onChange={(e) => setSpecialtyId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">All specialties</option>
                  {specialties.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.nameEn}
                    </option>
                  ))}
                </select>
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
                  className="text-xs font-medium text-[#5DB4F2] hover:underline px-2 py-2 shrink-0"
                >
                  Reset
                </button>
              )}
            </section>

            {/* Home View (when search box is empty and no filter is chosen) */}
            {!isSearchingOrFiltering ? (
              <div className="space-y-6">
                {/* Section a: For your specialty */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-[#F2F5F8]">
                      For your specialty: {doctorSpecialtyName}
                    </h2>
                  </div>

                  {suggestionsError && (
                    <CatalogBanner tone="error">
                      {suggestionsError}
                    </CatalogBanner>
                  )}

                  {suggestionsLoading ? (
                    <div className="rounded-xl bg-[#263744] border border-[#304451] p-8 text-center text-sm text-[#B8C3CC]">
                      Loading specialty suggestions…
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="rounded-xl bg-[#263744] border border-[#304451] p-8 text-center text-sm text-[#B8C3CC]">
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
                            className="block rounded-xl bg-[#263744] border border-[#304451] hover:border-[#5DB4F2] p-5 transition-colors"
                          >
                            <div className="font-semibold text-base text-[#F2F5F8]">
                              {item.brandNameEn}
                            </div>
                            <div className="text-xs text-[#5DB4F2] mt-1">
                              {item.genericNameEn ?? 'Dietary Supplement'}
                            </div>
                            {presentation && (
                              <div className="text-xs text-[#B8C3CC] font-mono tabular-nums mt-2">
                                {presentation}
                              </div>
                            )}
                            <div className="text-xs text-[#B8C3CC] mt-2">
                              {item.companyName}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Section b: Clearly separated Sponsored ad space placeholder */}
                <section
                  aria-label="Sponsored"
                  className="pt-2 border-t border-[#304451]"
                >
                  <div className="w-full aspect-video max-h-[320px] rounded-xl border border-[#304451] bg-[#263744]/50 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#B8C3CC]">
                        Sponsored
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-sm text-[#B8C3CC]">
                        Advertising space
                      </span>
                    </div>
                    <div className="h-4" aria-hidden="true" />
                  </div>
                </section>
              </div>
            ) : (
              /* Search & Filter Results View */
              <section className="space-y-4">
                {loading ? (
                  <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
                    Loading catalog…
                  </div>
                ) : rows.length === 0 ? (
                  <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center">
                    <h2 className="text-base font-medium text-[#F2F5F8]">
                      No published products match your search.
                    </h2>
                    <p className="text-xs text-[#B8C3CC] mt-1.5 max-w-lg mx-auto leading-relaxed">
                      Adjust your search query or filters to view available medicines.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between text-xs text-[#B8C3CC]">
                      <span className="font-medium">Products</span>
                      <span className="font-mono tabular-nums">
                        Showing {rows.length} of {totalCount}
                      </span>
                    </div>
                    <div className="divide-y divide-[#304451]">
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
                            className="block w-full text-left px-4 py-3.5 hover:bg-[#1F2D38]/60 transition-colors"
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="font-medium text-sm text-[#F2F5F8]">
                                {row.brandNameEn}
                              </span>
                            </div>

                            <div className="text-xs text-[#5DB4F2] mt-0.5">
                              {row.genericNameEn ?? 'Dietary Supplement'}
                            </div>

                            {presentation && (
                              <div className="text-xs text-[#B8C3CC] font-mono tabular-nums mt-1">
                                {presentation}
                              </div>
                            )}

                            <div className="mt-1 flex items-center justify-between gap-2 text-xs text-[#B8C3CC]">
                              <span className="truncate">{row.companyName}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {rows.length < totalCount && (
                      <div className="p-3 border-t border-[#304451] bg-[#1F2D38]/40 text-center">
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

function DoctorProductDetail({ product }: { product: CatalogProduct }) {
  const market = product.market;
  const enClinical = product.marketTranslations.en;

  return (
    <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#304451] pb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#F2F5F8]">
            {product.brandNameEn}
          </h2>
          <p className="text-sm text-[#5DB4F2] mt-1">
            {product.genericNameEn ?? 'Dietary Supplement'} ·{' '}
            {product.drugClassNameEn}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-[#B8C3CC]">{product.companyName}</div>
          <div className="text-xs font-medium text-[#38C976] mt-0.5">
            {CATEGORY_LABELS[product.category]}
          </div>
        </div>
      </div>

      {/* Specification Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
        <SpecItem label="Generic Name" value={product.genericNameEn ?? '—'} />
        <SpecItem label="Drug Class" value={product.drugClassNameEn} />
        <SpecItem label="Company" value={product.companyName} />
        <SpecItem
          label="Specialties"
          value={
            product.specialtyNamesEn.length > 0
              ? product.specialtyNamesEn.join(', ')
              : 'General Medicine'
          }
        />
        {market && (
          <>
            <SpecItem label="Strength" value={market.strength} mono />
            <SpecItem label="Dosage Form" value={market.dosageForm} />
            <SpecItem label="Route" value={market.route} />
            <SpecItem label="Pack Size" value={market.packSize} mono />
            <SpecItem
              label="Market Status"
              value={MARKET_STATUS_LABELS[market.marketStatus]}
              tone={
                market.marketStatus === 'marketed_in_iraq'
                  ? 'success'
                  : 'neutral'
              }
            />
          </>
        )}
      </div>

      {/* Clinical Monograph Content if present */}
      {enClinical && (
        <div className="border-t border-[#304451] pt-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
            Clinical Information
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <MonographSection
              title="Approved Indications"
              body={enClinical.approvedIndications}
            />
            <MonographSection
              title="Usual Adult Dose"
              body={enClinical.usualAdultDose}
            />
            <MonographSection
              title="Contraindications"
              body={enClinical.contraindications}
            />
            <MonographSection
              title="Common Adverse Effects"
              body={enClinical.commonAdverseEffects}
            />
            <MonographSection
              title="Storage Conditions"
              body={enClinical.storageConditions}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SpecItem({
  label,
  value,
  mono,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: 'neutral' | 'success';
}) {
  return (
    <div className="border-b border-[#304451]/60 pb-3">
      <div className="text-xs text-[#B8C3CC]">{label}</div>
      <div
        className={`text-sm mt-1 ${
          mono ? 'font-mono tabular-nums' : 'font-medium'
        } ${tone === 'success' ? 'text-[#38C976]' : 'text-[#F2F5F8]'}`}
      >
        {value}
      </div>
    </div>
  );
}

function MonographSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-[#B8C3CC]">{title}</div>
      <p className="text-sm text-[#F2F5F8] whitespace-pre-line leading-relaxed">
        {body}
      </p>
    </div>
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  loadProductDetail,
  loadSpecialtiesCatalog,
  loadVerifiedCompanies,
  searchCatalogProducts,
  type CatalogProduct,
  type CompanySummary,
  type DoctorSearchRow,
  type TaxonomyItem,
} from '../lib/catalog';
import { BrandLogo, inputClass, secondaryButtonClass } from './ui';

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

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');

  const [rows, setRows] = useState<DoctorSearchRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(
    null
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const searchReqSeqRef = useRef(0);
  const detailReqSeqRef = useRef(0);

  // Load verified companies and active specialties once on mount
  useEffect(() => {
    let active = true;
    void Promise.all([
      loadVerifiedCompanies(client),
      loadSpecialtiesCatalog(client),
    ]).then(([companyList, specialtyList]) => {
      if (!active) return;
      setCompanies(companyList);
      setSpecialties(specialtyList);
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

  const runSearch = useCallback(
    async (
      searchQuery: string,
      filterCompanyId: string,
      filterSpecialtyId: string
    ) => {
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
        setSelectedId(null);
      } else {
        setRows(res.data.rows);
        setTotalCount(res.data.totalCount);
        if (res.data.rows.length > 0) {
          setSelectedId((prev) =>
            prev && res.data.rows.some((r) => r.productId === prev)
              ? prev
              : res.data.rows[0].productId
          );
        } else {
          setSelectedId(null);
        }
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

  // Load single product detail when selectedId changes
  useEffect(() => {
    if (!selectedId) {
      setSelectedProduct(null);
      setDetailError(null);
      setDetailLoading(false);
      return;
    }

    const seq = ++detailReqSeqRef.current;
    setDetailLoading(true);
    setDetailError(null);

    void loadProductDetail(client, selectedId).then((res) => {
      if (seq !== detailReqSeqRef.current) return;
      if (!res.ok) {
        setDetailError(res.message);
        setSelectedProduct(null);
      } else {
        setSelectedProduct(res.data);
      }
      setDetailLoading(false);
    });
  }, [client, selectedId]);

  const hasActiveFilters = Boolean(query.trim() || companyId || specialtyId);

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Clean Modern Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span className="h-4 w-px bg-[#304451]" />
            <span className="text-sm text-[#B8C3CC]">Official Catalog</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#B8C3CC] hidden sm:inline">
              {access.email}
            </span>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => void runSearch(query, companyId, specialtyId)}
              disabled={loading}
            >
              Refresh
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">
        {error && <CatalogBanner tone="error">{error}</CatalogBanner>}

        {/* Streamlined Search & Filter Toolbar */}
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

          {hasActiveFilters && (
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

        {/* Loading / Empty / Split Master-Detail View */}
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
              {hasActiveFilters
                ? 'Adjust your search query or filters to view available medicines.'
                : 'Products added by the platform administrator will appear here once published to the official Iraq catalog.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Product List */}
            <div className="lg:col-span-4 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between text-xs text-[#B8C3CC]">
                <span className="font-medium">Products</span>
                <span className="font-mono tabular-nums">
                  Showing {rows.length} of {totalCount}
                </span>
              </div>
              <div className="divide-y divide-[#304451] max-h-[680px] overflow-y-auto">
                {rows.map((row) => {
                  const isSelected = selectedId === row.productId;
                  const presentation = [row.strength, row.dosageForm]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <button
                      key={row.productId}
                      type="button"
                      onClick={() => setSelectedId(row.productId)}
                      className={`w-full text-left px-4 py-3.5 transition-colors ${
                        isSelected
                          ? 'bg-[#1F2D38] border-l-2 border-l-[#5DB4F2]'
                          : 'hover:bg-[#1F2D38]/50'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-sm text-[#F2F5F8]">
                          {row.brandNameEn}
                        </span>
                        {row.brandNameAr && (
                          <span
                            dir="rtl"
                            className="text-xs text-[#B8C3CC] shrink-0"
                          >
                            {row.brandNameAr}
                          </span>
                        )}
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
                    </button>
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

            {/* Right Column: Product Detail Panel */}
            <div className="lg:col-span-8">
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
          </div>
        )}
      </main>
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
          {product.brandNameAr && (
            <div dir="rtl" className="text-sm text-[#B8C3CC] mt-0.5">
              {product.brandNameAr}
            </div>
          )}
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

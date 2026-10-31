import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  REGISTRATION_STATUS_LABELS,
  filterDoctorProducts,
  loadCatalogBundle,
  type CatalogBundle,
  type CatalogProduct,
  type ProductCategory,
} from '../lib/catalog';
import { inputClass, secondaryButtonClass } from './ui';

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
  const [bundle, setBundle] = useState<CatalogBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [drugClassId, setDrugClassId] = useState('');
  const [category, setCategory] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await loadCatalogBundle(client);
    if (!res.ok) {
      setError(res.message);
      setBundle(null);
    } else {
      setBundle(res.data);
      if (res.data.products.length > 0) {
        setSelectedId((prev) =>
          prev && res.data.products.some((p) => p.id === prev)
            ? prev
            : res.data.products[0].id
        );
      } else {
        setSelectedId(null);
      }
    }
    setLoading(false);
  }, [client]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filteredProducts = useMemo(() => {
    if (!bundle) return [];
    return filterDoctorProducts(bundle.products, {
      query,
      companyId,
      drugClassId,
      category,
    });
  }, [bundle, query, companyId, drugClassId, category]);

  const selectedProduct: CatalogProduct | null = useMemo(() => {
    if (filteredProducts.length === 0) return null;
    if (selectedId) {
      const match = filteredProducts.find((p) => p.id === selectedId);
      if (match) return match;
    }
    return filteredProducts[0] ?? null;
  }, [filteredProducts, selectedId]);

  const hasActiveFilters = Boolean(
    query.trim() || companyId || drugClassId || category
  );

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Clean Modern Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-[#F2F5F8]">
              Pharamty
            </span>
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
              onClick={() => void refresh()}
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

          <div className="sm:w-52">
            <select
              id="doctor-catalog-company"
              aria-label="Filter by company"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className={inputClass}
            >
              <option value="">All companies</option>
              {(bundle?.companies ?? []).map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:w-52">
            <select
              id="doctor-catalog-class"
              aria-label="Filter by drug class"
              value={drugClassId}
              onChange={(e) => setDrugClassId(e.target.value)}
              className={inputClass}
            >
              <option value="">All drug classes</option>
              {(bundle?.drugClasses ?? []).map((dc) => (
                <option key={dc.id} value={dc.id}>
                  {dc.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:w-48">
            <select
              id="doctor-catalog-category"
              aria-label="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">All categories</option>
              {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCompanyId('');
                setDrugClassId('');
                setCategory('');
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
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center">
            <h2 className="text-base font-medium text-[#F2F5F8]">
              {hasActiveFilters
                ? 'No matching products found'
                : 'No published products yet'}
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
                  {filteredProducts.length}
                </span>
              </div>
              <div className="divide-y divide-[#304451] max-h-[680px] overflow-y-auto">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedId(product.id)}
                      className={`w-full text-left px-4 py-3.5 transition-colors ${
                        isSelected
                          ? 'bg-[#1F2D38] border-l-2 border-l-[#5DB4F2]'
                          : 'hover:bg-[#1F2D38]/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-[#F2F5F8]">
                        {product.brandNameEn}
                      </div>

                      <div className="text-xs text-[#5DB4F2] mt-0.5">
                        {product.genericNameEn ?? 'Dietary Supplement'}
                      </div>

                      <div className="mt-1.5 flex items-center justify-between gap-2 text-xs text-[#B8C3CC]">
                        <span className="truncate">{product.companyName}</span>
                        {product.market && (
                          <span className="shrink-0 font-mono tabular-nums">
                            {product.market.strength}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Product Detail Panel */}
            <div className="lg:col-span-8">
              {selectedProduct && (
                <DoctorProductDetail product={selectedProduct} />
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
            <SpecItem
              label="Registration Status"
              value={REGISTRATION_STATUS_LABELS[market.registrationStatus]}
            />
            <SpecItem
              label="Registration Number"
              value={market.registrationNumber ?? '—'}
              mono
            />
            <SpecItem
              label="Registration Authority"
              value={market.registrationAuthority ?? '—'}
            />
            <SpecItem
              label="Registration Expiry"
              value={market.registrationExpiresOn ?? '—'}
              mono
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

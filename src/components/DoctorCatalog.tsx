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
import { Field, inputClass, secondaryButtonClass } from './ui';

export function CatalogBanner({
  tone,
  children,
}: {
  tone: 'error' | 'warn' | 'success';
  children: React.ReactNode;
}) {
  const palette =
    tone === 'error'
      ? 'bg-[#FF7272]/10 border-[#FF7272]/50 text-[#FF7272]'
      : tone === 'warn'
      ? 'bg-[#F59E0B]/10 border-[#F59E0B]/50 text-[#F59E0B]'
      : 'bg-[#38C976]/10 border-[#38C976]/50 text-[#38C976]';
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
      drugClassId,
      category,
    });
  }, [bundle, query, drugClassId, category]);

  const selectedProduct: CatalogProduct | null = useMemo(() => {
    if (filteredProducts.length === 0) return null;
    if (selectedId) {
      const match = filteredProducts.find((p) => p.id === selectedId);
      if (match) return match;
    }
    return filteredProducts[0] ?? null;
  }, [filteredProducts, selectedId]);

  const hasActiveFilters = Boolean(query.trim() || drugClassId || category);

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F1F5F9] flex flex-col">
      {/* Top Clinical Header */}
      <header className="border-b border-[#304451] bg-[#263744] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5DB4F2]">
                Pharamty · Official Iraq Catalog
              </span>
              <span className="text-xs text-[#94A3B8]">/catalog</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">
              Verified Physician Drug Reference
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-[#E2E8F0]">{access.email}</div>
              <div className="text-[11px] text-[#38C976]">Approved Physician · Read-only</div>
            </div>
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

        {/* Search & Filter Bar */}
        <section className="rounded-xl bg-[#263744] border border-[#304451] p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-6">
              <Field label="Search by Brand Name (English / العربية), Generic Name, or Company">
                <input
                  id="doctor-catalog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Amoxicare, أموكسي, Paracetamol, Company name..."
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field label="Drug Class">
                <select
                  id="doctor-catalog-class"
                  value={drugClassId}
                  onChange={(e) => setDrugClassId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">All drug classes</option>
                  {(bundle?.drugClasses ?? []).map((dc) => (
                    <option key={dc.id} value={dc.id}>
                      {dc.nameEn}
                      {dc.nameAr ? ` · ${dc.nameAr}` : ''}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="md:col-span-3">
              <Field label="Category">
                <select
                  id="doctor-catalog-category"
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
              </Field>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#304451] flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8]">
            <div className="font-mono tabular-nums">
              {loading
                ? 'Loading published catalog products…'
                : `Showing ${filteredProducts.length} of ${bundle?.products.length ?? 0} official published products`}
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setDrugClassId('');
                  setCategory('');
                }}
                className="text-[#5DB4F2] hover:underline text-xs"
              >
                Clear search & filters
              </button>
            )}
          </div>
        </section>

        {/* Loading / Empty / Split Master-Detail View */}
        {loading ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center text-sm text-[#94A3B8]">
            Loading official Iraq catalog records from Supabase…
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center">
            <h2 className="text-base font-semibold text-[#F1F5F9]">
              {hasActiveFilters
                ? 'No published products match your search criteria'
                : 'No published products in the official catalog yet'}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1.5 max-w-md mx-auto">
              {hasActiveFilters
                ? 'Try clearing or broadening the brand, generic, company, drug class, or category filters.'
                : 'Products appear here automatically once a verified company submits a product and an administrator publishes it for the Iraq market.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Product List */}
            <div className="lg:col-span-5 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                  Published Products
                </span>
                <span className="text-xs font-mono tabular-nums text-[#94A3B8]">
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
                          : 'hover:bg-[#1F2D38]/60'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-semibold text-sm text-[#F1F5F9]">
                          {product.brandNameEn}
                        </div>
                        {product.brandNameAr && (
                          <div
                            dir="rtl"
                            className="text-sm font-medium text-[#CBD5E1]"
                          >
                            {product.brandNameAr}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-[#5DB4F2] mt-1">
                        {product.genericNameEn ?? 'Dietary Supplement / No Generic Assigned'}
                        {product.genericNameAr ? ` · ${product.genericNameAr}` : ''}
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#94A3B8]">
                        <span>{product.companyName}</span>
                        <span>
                          {product.market
                            ? `${product.market.strength} · ${product.market.dosageForm}`
                            : product.drugClassNameEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Product Detail Panel */}
            <div className="lg:col-span-7">
              {selectedProduct && <DoctorProductDetail product={selectedProduct} />}
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
  const arClinical = product.marketTranslations.ar;

  return (
    <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#304451] pb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#38C976]">
            Published Official Monograph
          </div>
          <h2 className="text-2xl font-semibold text-[#F1F5F9] mt-1">
            {product.brandNameEn}
          </h2>
          {product.brandNameAr && (
            <div dir="rtl" className="text-lg font-medium text-[#CBD5E1] mt-0.5">
              {product.brandNameAr}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-[#94A3B8]">Category</div>
          <div className="text-sm font-medium text-[#E2E8F0] mt-0.5">
            {CATEGORY_LABELS[product.category]}
          </div>
        </div>
      </div>

      {/* Core Identification Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailField
          label="Generic / Scientific Name"
          value={
            product.genericNameEn
              ? `${product.genericNameEn}${product.genericNameAr ? ` (${product.genericNameAr})` : ''}`
              : 'Not applicable (Dietary Supplement)'
          }
        />
        <DetailField
          label="Drug Class"
          value={`${product.drugClassNameEn}${
            product.drugClassNameAr ? ` (${product.drugClassNameAr})` : ''
          }`}
        />
        <DetailField label="Manufacturer / Company" value={product.companyName} />
        <DetailField
          label="Clinical Specialties"
          value={
            product.specialtyNamesEn.length > 0
              ? product.specialtyNamesEn.join(', ')
              : 'General Medicine'
          }
        />
      </div>

      {/* Presentation & Iraq Market Status */}
      <div className="border-t border-[#304451] pt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-3">
          Presentation & Iraq Market Registration
        </h3>
        {market ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Strength" value={market.strength} mono />
            <DetailField label="Dosage Form" value={market.dosageForm} />
            <DetailField label="Route of Administration" value={market.route} />
            <DetailField label="Pack Size" value={market.packSize} mono />
            <DetailField
              label="Iraq Market Status"
              value={MARKET_STATUS_LABELS[market.marketStatus]}
              tone={market.marketStatus === 'marketed_in_iraq' ? 'success' : 'neutral'}
            />
            <DetailField
              label="Registration Status"
              value={REGISTRATION_STATUS_LABELS[market.registrationStatus]}
            />
            <DetailField
              label="Registration Number"
              value={market.registrationNumber ?? 'Not recorded'}
              mono
            />
            <DetailField
              label="Registration Authority"
              value={market.registrationAuthority ?? 'Not recorded'}
            />
            <DetailField
              label="Registration Expiry"
              value={market.registrationExpiresOn ?? 'Not recorded'}
              mono
            />
          </div>
        ) : (
          <p className="text-xs text-[#94A3B8]">
            No market record returned for this product.
          </p>
        )}
      </div>

      {/* Clinical Monograph Content if present */}
      {(enClinical || arClinical) && (
        <div className="border-t border-[#304451] pt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
            Clinical Prescribing Information
          </h3>
          {enClinical && (
            <div className="space-y-3 text-xs">
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
          )}
          {arClinical && (
            <div
              dir="rtl"
              className="space-y-3 text-xs border-t border-[#304451] pt-4"
            >
              <MonographSection
                title="دواعي الاستعمال المعتمدة"
                body={arClinical.approvedIndications}
              />
              <MonographSection
                title="الجرعة المعتادة للبالغين"
                body={arClinical.usualAdultDose}
              />
              <MonographSection
                title="موانع الاستعمال"
                body={arClinical.contraindications}
              />
              <MonographSection
                title="الآثار الجانبية الشائعة"
                body={arClinical.commonAdverseEffects}
              />
              <MonographSection
                title="ظروف الخزن"
                body={arClinical.storageConditions}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailField({
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
    <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
      <div className="text-[11px] text-[#94A3B8]">{label}</div>
      <div
        className={`text-sm mt-0.5 ${
          mono ? 'font-mono tabular-nums' : 'font-medium'
        } ${tone === 'success' ? 'text-[#38C976]' : 'text-[#F1F5F9]'}`}
      >
        {value}
      </div>
    </div>
  );
}

function MonographSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3">
      <div className="text-[11px] font-semibold text-[#CBD5E1]">{title}</div>
      <p className="text-xs text-[#E2E8F0] mt-1 whitespace-pre-line leading-relaxed">
        {body}
      </p>
    </div>
  );
}

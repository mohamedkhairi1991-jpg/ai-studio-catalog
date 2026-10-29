import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  REGISTRATION_STATUS_LABELS,
  STATUS_LABELS,
  filterProductsByStatus,
  loadCatalogBundle,
  rpcArchiveOwnProduct,
  rpcCreateProductDraft,
  rpcSetProductSpecialties,
  rpcSubmitProductForReview,
  rpcUpdateProductDraft,
  rpcUpsertProductMarket,
  rpcUpsertProductTranslation,
  rpcWithdrawProductSubmission,
  type CatalogBundle,
  type CatalogProduct,
  type IraqMarketStatus,
  type ProductCategory,
  type ProductRegistrationStatus,
  type ProductStatus,
} from '../lib/catalog';
import { CatalogBanner as Banner } from './DoctorCatalog';
import { Field, buttonClass, inputClass, secondaryButtonClass } from './ui';

const INPUT_CLASS = inputClass;
const SELECT_CLASS = inputClass;

function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={secondaryButtonClass} />;
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={buttonClass} />;
}

interface Props {
  client: SupabaseClient;
  access: AccessResult;
  onSignOut: () => void;
}

export function StatusText({ status }: { status: ProductStatus }) {
  const colorClass =
    status === 'published'
      ? 'text-[#38C976]'
      : status === 'submitted' || status === 'changes_requested'
      ? 'text-[#F59E0B]'
      : 'text-[#94A3B8]';

  return (
    <span className={`text-xs font-mono uppercase tracking-wider ${colorClass}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function CompanyCatalog({ client, access, onSignOut }: Props) {
  const canManageDrafts = Boolean(access.canManageDrafts);

  const [bundle, setBundle] = useState<CatalogBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);

  // New draft creation state
  const [newCategory, setNewCategory] = useState<ProductCategory>('prescription_drug');
  const [newGenericId, setNewGenericId] = useState('');
  const [newDrugClassId, setNewDrugClassId] = useState('');
  const [newBrandEn, setNewBrandEn] = useState('');
  const [newBrandAr, setNewBrandAr] = useState('');
  const [creatingBusy, setCreatingBusy] = useState(false);

  const refresh = useCallback(
    async (preferProductId?: string) => {
      setLoading(true);
      const res = await loadCatalogBundle(client);
      if (!res.ok) {
        setError(res.message);
        setBundle(null);
      } else {
        setBundle(res.data);
        const targetId = preferProductId ?? selectedId;
        if (targetId && res.data.products.some((p) => p.id === targetId)) {
          setSelectedId(targetId);
        } else if (res.data.products.length > 0) {
          setSelectedId(res.data.products[0].id);
        } else {
          setSelectedId(null);
        }
      }
      setLoading(false);
    },
    [client, selectedId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const activeCompany = useMemo(() => {
    if (!bundle) return null;
    if (access.companyName) {
      const byName = bundle.companies.find((c) => c.companyName === access.companyName);
      if (byName) return byName;
    }
    return (
      bundle.companies.find((c) => c.status === 'verified') ??
      bundle.companies[0] ??
      null
    );
  }, [bundle, access.companyName]);

  const filteredProducts = useMemo(() => {
    if (!bundle) return [];
    return filterProductsByStatus(bundle.products, statusFilter);
  }, [bundle, statusFilter]);

  const selectedProduct = useMemo(() => {
    if (!bundle || !selectedId) return null;
    return bundle.products.find((p) => p.id === selectedId) ?? null;
  }, [bundle, selectedId]);

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const companyId = activeCompany?.id;
    if (!companyId) {
      setError('Verified company record was not found for your account.');
      return;
    }

    setCreatingBusy(true);
    const createRes = await rpcCreateProductDraft(client, {
      companyId,
      category: newCategory,
      genericDrugId: newCategory === 'dietary_supplement' && !newGenericId ? null : newGenericId,
      drugClassId: newDrugClassId,
      englishBrandName: newBrandEn,
    });

    if (!createRes.ok) {
      setCreatingBusy(false);
      setError(createRes.message);
      return;
    }

    const newProductId = createRes.data.id;

    if (newBrandAr.trim()) {
      const arRes = await rpcUpsertProductTranslation(
        client,
        newProductId,
        'ar',
        newBrandAr
      );
      if (!arRes.ok) {
        setCreatingBusy(false);
        setError(arRes.message);
        await refresh(newProductId);
        return;
      }
    }

    setCreatingBusy(false);
    setCreatingNew(false);
    setNewBrandEn('');
    setNewBrandAr('');
    setNotice('Product draft created. You can now fill in market details and specialties.');
    await refresh(newProductId);
  };

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F1F5F9] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#304451] bg-[#263744] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5DB4F2]">
                Pharamty · Company Workspace
              </span>
              <span className="text-xs text-[#94A3B8]">/company/catalog</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">
              {access.companyName ?? activeCompany?.companyName ?? 'Company Product Catalog'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-[#E2E8F0]">{access.email}</div>
              <div className="text-[11px] text-[#94A3B8]">
                {canManageDrafts
                  ? 'Draft Management Enabled (Admin / Product Manager)'
                  : 'Read-only Company Access'}
              </div>
            </div>
            {canManageDrafts && (
              <button
                type="button"
                onClick={() => {
                  setCreatingNew((v) => !v);
                  setError(null);
                  setNotice(null);
                }}
                className="rounded-lg bg-[#1769AA] hover:bg-[#1E7AC2] text-white text-xs font-semibold px-3.5 py-2 transition-colors"
              >
                {creatingNew ? 'Close New Product Form' : '+ New Product'}
              </button>
            )}
            <GhostButton onClick={() => void refresh()} disabled={loading}>
              Refresh
            </GhostButton>
            <GhostButton onClick={onSignOut}>Sign out</GhostButton>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">
        {error && <Banner tone="error">{error}</Banner>}
        {notice && <Banner tone="success">{notice}</Banner>}

        {/* New Product Form (only for canManageDrafts) */}
        {canManageDrafts && creatingNew && bundle && (
          <section className="rounded-xl bg-[#263744] border border-[#304451] p-6">
            <div className="flex items-center justify-between border-b border-[#304451] pb-3 mb-4">
              <div>
                <h2 className="text-base font-semibold text-[#F1F5F9]">
                  Create New Product Draft
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Calls <code className="font-mono">create_product_draft</code> to initialize a new draft record, then opens market and specialty fields.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="English Brand Name *">
                  <input
                    type="text"
                    required
                    value={newBrandEn}
                    onChange={(e) => setNewBrandEn(e.target.value)}
                    placeholder="e.g. Amoxicare"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field label="Arabic Brand Name (الاسم التجاري بالعربية — optional)">
                  <input
                    type="text"
                    dir="rtl"
                    value={newBrandAr}
                    onChange={(e) => setNewBrandAr(e.target.value)}
                    placeholder="مثال: أموكسي كير"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field label="Product Category *">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className={SELECT_CLASS}
                  >
                    {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Drug Class *">
                  <select
                    required
                    value={newDrugClassId}
                    onChange={(e) => setNewDrugClassId(e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="">Select drug class…</option>
                    {bundle.drugClasses.map((dc) => (
                      <option key={dc.id} value={dc.id}>
                        {dc.nameEn}
                        {dc.nameAr ? ` · ${dc.nameAr}` : ''}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label={
                    newCategory === 'dietary_supplement'
                      ? 'Generic / Scientific Drug (optional for dietary supplement)'
                      : 'Generic / Scientific Drug *'
                  }
                >
                  <select
                    required={newCategory !== 'dietary_supplement'}
                    value={newGenericId}
                    onChange={(e) => setNewGenericId(e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="">
                      {newCategory === 'dietary_supplement'
                        ? 'None (Dietary Supplement)'
                        : 'Select generic drug…'}
                    </option>
                    {bundle.genericDrugs.map((gd) => (
                      <option key={gd.id} value={gd.id}>
                        {gd.nameEn}
                        {gd.nameAr ? ` · ${gd.nameAr}` : ''}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <GhostButton type="button" onClick={() => setCreatingNew(false)}>
                  Cancel
                </GhostButton>
                <div className="w-48">
                  <PrimaryButton type="submit" disabled={creatingBusy}>
                    {creatingBusy ? 'Creating draft…' : 'Create Product Draft'}
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* Filter Bar */}
        <section className="rounded-xl bg-[#263744] border border-[#304451] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                'all',
                'draft',
                'submitted',
                'changes_requested',
                'published',
                'hidden',
                'archived',
              ] as const
            ).map((st) => {
              const active = statusFilter === st;
              const count =
                st === 'all'
                  ? bundle?.products.length ?? 0
                  : (bundle?.products ?? []).filter((p) => p.status === st).length;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                      : 'bg-[#1F2D38] border-[#304451] text-[#CBD5E1] hover:border-[#475569]'
                  }`}
                >
                  {st === 'all' ? 'All Products' : STATUS_LABELS[st]}{' '}
                  <span className="font-mono tabular-nums opacity-80">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Master-Detail Split */}
        {loading ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center text-sm text-[#94A3B8]">
            Loading company products from Supabase…
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center">
            <h2 className="text-base font-semibold text-[#F1F5F9]">
              No company products found
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1.5 max-w-md mx-auto">
              {canManageDrafts
                ? 'Click "+ New Product" in the top bar to create your first product draft.'
                : 'No products match the selected status filter for your company.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Product List */}
            <div className="lg:col-span-5 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                  Company Products
                </span>
                <span className="text-xs font-mono tabular-nums text-[#94A3B8]">
                  {filteredProducts.length}
                </span>
              </div>

              <div className="divide-y divide-[#304451] max-h-[700px] overflow-y-auto">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(product.id);
                        setError(null);
                        setNotice(null);
                      }}
                      className={`w-full text-left px-4 py-3.5 transition-colors ${
                        isSelected
                          ? 'bg-[#1F2D38] border-l-2 border-l-[#5DB4F2]'
                          : 'hover:bg-[#1F2D38]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-[#F1F5F9]">
                          {product.brandNameEn}
                        </span>
                        <StatusText status={product.status} />
                      </div>

                      {product.brandNameAr && (
                        <div dir="rtl" className="text-xs text-[#CBD5E1] mt-0.5">
                          {product.brandNameAr}
                        </div>
                      )}

                      <div className="text-xs text-[#94A3B8] mt-1">
                        {product.genericNameEn ?? 'No Generic'} · {product.drugClassNameEn}
                      </div>

                      {product.status === 'changes_requested' && product.reviewReason && (
                        <div className="mt-2 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/40 px-2.5 py-1.5 text-[11px] text-[#FCD34D]">
                          <span className="font-semibold">Changes requested:</span>{' '}
                          {product.reviewReason}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail / Editor Panel */}
            <div className="lg:col-span-7">
              {selectedProduct && bundle && (
                <CompanyProductPanel
                  key={selectedProduct.id + ':' + selectedProduct.updatedAt}
                  client={client}
                  product={selectedProduct}
                  bundle={bundle}
                  canManageDrafts={canManageDrafts}
                  onError={(msg) => {
                    setNotice(null);
                    setError(msg);
                  }}
                  onSuccess={async (msg) => {
                    setError(null);
                    setNotice(msg);
                    await refresh(selectedProduct.id);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

interface PanelProps {
  client: SupabaseClient;
  product: CatalogProduct;
  bundle: CatalogBundle;
  canManageDrafts: boolean;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => Promise<void>;
}

function CompanyProductPanel({
  client,
  product,
  bundle,
  canManageDrafts,
  onError,
  onSuccess,
}: PanelProps) {
  const isEditableStatus =
    product.status === 'draft' || product.status === 'changes_requested';
  const canEdit = canManageDrafts && isEditableStatus;

  // Draft & Translation State
  const [category, setCategory] = useState<ProductCategory>(product.category);
  const [drugClassId, setDrugClassId] = useState(product.drugClassId);
  const [genericDrugId, setGenericDrugId] = useState(product.genericDrugId ?? '');
  const [brandEn, setBrandEn] = useState(product.brandNameEn);
  const [brandAr, setBrandAr] = useState(product.brandNameAr ?? '');

  // Market State
  const [strength, setStrength] = useState(product.market?.strength ?? '');
  const [dosageForm, setDosageForm] = useState(product.market?.dosageForm ?? '');
  const [route, setRoute] = useState(product.market?.route ?? '');
  const [packSize, setPackSize] = useState(product.market?.packSize ?? '');
  const [marketStatus, setMarketStatus] = useState<IraqMarketStatus>(
    product.market?.marketStatus ?? 'marketed_in_iraq'
  );
  const [registrationStatus, setRegistrationStatus] =
    useState<ProductRegistrationStatus>(
      product.market?.registrationStatus ?? 'not_recorded'
    );
  const [registrationNumber, setRegistrationNumber] = useState(
    product.market?.registrationNumber ?? ''
  );
  const [registrationAuthority, setRegistrationAuthority] = useState(
    product.market?.registrationAuthority ?? ''
  );
  const [registrationExpiresOn, setRegistrationExpiresOn] = useState(
    product.market?.registrationExpiresOn ?? ''
  );

  // Specialties State
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    product.specialtyIds
  );

  // Archive Reason State
  const [archiveReason, setArchiveReason] = useState('');
  const [showArchivePrompt, setShowArchivePrompt] = useState(false);

  const [busy, setBusy] = useState(false);

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSaveCoreAndNames = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    const draftRes = await rpcUpdateProductDraft(client, {
      productId: product.id,
      category,
      genericDrugId: category === 'dietary_supplement' && !genericDrugId ? null : genericDrugId,
      drugClassId,
    });
    if (!draftRes.ok) {
      setBusy(false);
      onError(draftRes.message);
      return;
    }

    const enRes = await rpcUpsertProductTranslation(
      client,
      product.id,
      'en',
      brandEn
    );
    if (!enRes.ok) {
      setBusy(false);
      onError(enRes.message);
      return;
    }

    if (brandAr.trim()) {
      const arRes = await rpcUpsertProductTranslation(
        client,
        product.id,
        'ar',
        brandAr
      );
      if (!arRes.ok) {
        setBusy(false);
        onError(arRes.message);
        return;
      }
    }

    setBusy(false);
    await onSuccess('Product classification and brand translations saved.');
  };

  const handleSaveMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcUpsertProductMarket(client, {
      productId: product.id,
      strength,
      dosageForm,
      route,
      packSize,
      marketStatus,
      registrationStatus,
      registrationNumber,
      registrationAuthority,
      registrationExpiresOn,
    });
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Iraq market details saved.');
  };

  const handleSaveSpecialties = async () => {
    setBusy(true);
    const res = await rpcSetProductSpecialties(
      client,
      product.id,
      selectedSpecialties
    );
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Product specialties updated.');
  };

  const handleSubmitForReview = async () => {
    setBusy(true);
    const res = await rpcSubmitProductForReview(client, product.id);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Product submitted for administrator review.');
  };

  const handleWithdraw = async () => {
    setBusy(true);
    const res = await rpcWithdrawProductSubmission(client, product.id);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Product submission withdrawn back to draft.');
  };

  const handleArchive = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcArchiveOwnProduct(client, product.id, archiveReason);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    setShowArchivePrompt(false);
    setArchiveReason('');
    await onSuccess('Product archived.');
  };

  return (
    <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      {/* Header & Lifecycle Actions */}
      <div className="border-b border-[#304451] pb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <StatusText status={product.status} />
          <h2 className="text-2xl font-semibold text-[#F1F5F9] mt-1">
            {product.brandNameEn}
          </h2>
          {product.brandNameAr && (
            <div dir="rtl" className="text-base text-[#CBD5E1] mt-0.5">
              {product.brandNameAr}
            </div>
          )}
        </div>

        {canManageDrafts && (
          <div className="flex flex-wrap items-center gap-2">
            {(product.status === 'draft' ||
              product.status === 'changes_requested') && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleSubmitForReview()}
                className="rounded-lg bg-[#1769AA] hover:bg-[#1E7AC2] disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2 transition-colors"
              >
                Submit for Review
              </button>
            )}

            {product.status === 'submitted' && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleWithdraw()}
                className="rounded-lg bg-[#1F2D38] border border-[#F59E0B]/60 text-[#FCD34D] hover:bg-[#F59E0B]/10 disabled:opacity-50 text-xs font-semibold px-3.5 py-2 transition-colors"
              >
                Withdraw Submission
              </button>
            )}

            {product.status !== 'archived' && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setShowArchivePrompt((v) => !v)}
                className="rounded-lg bg-[#1F2D38] border border-[#FF7272]/50 text-[#FCA5A5] hover:bg-[#FF7272]/10 disabled:opacity-50 text-xs font-semibold px-3.5 py-2 transition-colors"
              >
                Archive
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Reason Alert when changes_requested */}
      {product.status === 'changes_requested' && product.reviewReason && (
        <Banner tone="warn">
          <div className="font-semibold">Changes requested by administrator:</div>
          <div className="mt-1">{product.reviewReason}</div>
        </Banner>
      )}

      {/* Archive Prompt */}
      {canManageDrafts && showArchivePrompt && product.status !== 'archived' && (
        <form
          onSubmit={handleArchive}
          className="rounded-lg bg-[#1F2D38] border border-[#FF7272]/50 p-4 space-y-3"
        >
          <div className="text-xs font-semibold text-[#FCA5A5]">
            Archive Product (<code className="font-mono">archive_own_product</code>)
          </div>
          <Field label="Archive Reason *">
            <input
              type="text"
              required
              value={archiveReason}
              onChange={(e) => setArchiveReason(e.target.value)}
              placeholder="Explain why this product is being archived…"
              className={INPUT_CLASS}
            />
          </Field>
          <div className="flex items-center justify-end gap-2">
            <GhostButton
              type="button"
              onClick={() => setShowArchivePrompt(false)}
            >
              Cancel
            </GhostButton>
            <button
              type="submit"
              disabled={busy || !archiveReason.trim()}
              className="rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2"
            >
              Confirm Archive
            </button>
          </div>
        </form>
      )}

      {/* Editable Form vs Read-Only Summary */}
      {canEdit ? (
        <div className="space-y-6">
          {/* Section 1: Core Classification & Brand Translations */}
          <form
            onSubmit={handleSaveCoreAndNames}
            className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                1. Classification & Brand Names
              </h3>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                update_product_draft + upsert_product_translation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="English Brand Name (en) *">
                <input
                  type="text"
                  required
                  value={brandEn}
                  onChange={(e) => setBrandEn(e.target.value)}
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Arabic Brand Name (ar)">
                <input
                  type="text"
                  dir="rtl"
                  value={brandAr}
                  onChange={(e) => setBrandAr(e.target.value)}
                  placeholder="الاسم التجاري بالعربية"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Category *">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className={SELECT_CLASS}
                >
                  {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </option>
                    )
                  )}
                </select>
              </Field>

              <Field label="Drug Class *">
                <select
                  required
                  value={drugClassId}
                  onChange={(e) => setDrugClassId(e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="">Select drug class…</option>
                  {bundle.drugClasses.map((dc) => (
                    <option key={dc.id} value={dc.id}>
                      {dc.nameEn}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  category === 'dietary_supplement'
                    ? 'Generic Drug (optional)'
                    : 'Generic Drug *'
                }
              >
                <select
                  required={category !== 'dietary_supplement'}
                  value={genericDrugId}
                  onChange={(e) => setGenericDrugId(e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="">
                    {category === 'dietary_supplement'
                      ? 'None'
                      : 'Select generic drug…'}
                  </option>
                  {bundle.genericDrugs.map((gd) => (
                    <option key={gd.id} value={gd.id}>
                      {gd.nameEn}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="flex justify-end">
              <div className="w-56">
                <PrimaryButton type="submit" disabled={busy}>
                  Save Brand & Classification
                </PrimaryButton>
              </div>
            </div>
          </form>

          {/* Section 2: Iraq Market Presentation & Registration */}
          <form
            onSubmit={handleSaveMarket}
            className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                2. Iraq Market & Registration Details
              </h3>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                upsert_product_market
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Strength *">
                <input
                  type="text"
                  required
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  placeholder="e.g. 500 mg"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Dosage Form *">
                <input
                  type="text"
                  required
                  value={dosageForm}
                  onChange={(e) => setDosageForm(e.target.value)}
                  placeholder="e.g. Film-coated tablet"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Route of Administration *">
                <input
                  type="text"
                  required
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="e.g. Oral"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Pack Size *">
                <input
                  type="text"
                  required
                  value={packSize}
                  onChange={(e) => setPackSize(e.target.value)}
                  placeholder="e.g. 20 tablets"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Iraq Market Status *">
                <select
                  value={marketStatus}
                  onChange={(e) =>
                    setMarketStatus(e.target.value as IraqMarketStatus)
                  }
                  className={SELECT_CLASS}
                >
                  {(
                    Object.keys(MARKET_STATUS_LABELS) as IraqMarketStatus[]
                  ).map((ms) => (
                    <option key={ms} value={ms}>
                      {MARKET_STATUS_LABELS[ms]}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Registration Status *">
                <select
                  value={registrationStatus}
                  onChange={(e) =>
                    setRegistrationStatus(
                      e.target.value as ProductRegistrationStatus
                    )
                  }
                  className={SELECT_CLASS}
                >
                  {(
                    Object.keys(
                      REGISTRATION_STATUS_LABELS
                    ) as ProductRegistrationStatus[]
                  ).map((rs) => (
                    <option key={rs} value={rs}>
                      {REGISTRATION_STATUS_LABELS[rs]}
                    </option>
                  ))}
                </select>
              </Field>

              {registrationStatus !== 'not_recorded' && (
                <>
                  <Field label="Registration Number *">
                    <input
                      type="text"
                      required
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      placeholder="e.g. IQ-MOH-2026-104"
                      className={INPUT_CLASS}
                    />
                  </Field>

                  <Field label="Registration Authority *">
                    <input
                      type="text"
                      required
                      value={registrationAuthority}
                      onChange={(e) => setRegistrationAuthority(e.target.value)}
                      placeholder="e.g. Iraq Ministry of Health"
                      className={INPUT_CLASS}
                    />
                  </Field>

                  <Field
                    label={
                      registrationStatus === 'expired'
                        ? 'Registration Expiry Date *'
                        : 'Registration Expiry Date'
                    }
                  >
                    <input
                      type="date"
                      required={registrationStatus === 'expired'}
                      value={registrationExpiresOn}
                      onChange={(e) => setRegistrationExpiresOn(e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </Field>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <div className="w-56">
                <PrimaryButton type="submit" disabled={busy}>
                  Save Market Details
                </PrimaryButton>
              </div>
            </div>
          </form>

          {/* Section 3: Specialties */}
          <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                3. Medical Specialties
              </h3>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                set_product_specialties
              </span>
            </div>

            {bundle.specialties.length === 0 ? (
              <p className="text-xs text-[#94A3B8]">
                No active specialties available.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {bundle.specialties.map((spec) => {
                  const checked = selectedSpecialties.includes(spec.id);
                  return (
                    <label
                      key={spec.id}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[#263744] border-[#5DB4F2] text-[#F1F5F9]'
                          : 'bg-[#263744]/40 border-[#304451] text-[#CBD5E1]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSpecialty(spec.id)}
                        className="accent-[#1769AA]"
                      />
                      <span>{spec.nameEn}</span>
                    </label>
                  );
                })}
              </div>
            )}

            <div className="flex justify-end">
              <div className="w-56">
                <PrimaryButton
                  type="button"
                  disabled={busy}
                  onClick={() => void handleSaveSpecialties()}
                >
                  Save Specialties
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Read-Only Product Details (for non-draft status or read-only company members) */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <ReadOnlyItem
              label="Category"
              value={CATEGORY_LABELS[product.category]}
            />
            <ReadOnlyItem label="Drug Class" value={product.drugClassNameEn} />
            <ReadOnlyItem
              label="Generic Drug"
              value={product.genericNameEn ?? 'Not applicable'}
            />
            <ReadOnlyItem
              label="Specialties"
              value={
                product.specialtyNamesEn.length > 0
                  ? product.specialtyNamesEn.join(', ')
                  : 'None assigned'
              }
            />
            {product.market && (
              <>
                <ReadOnlyItem
                  label="Strength & Form"
                  value={`${product.market.strength} · ${product.market.dosageForm}`}
                />
                <ReadOnlyItem
                  label="Route & Pack Size"
                  value={`${product.market.route} · ${product.market.packSize}`}
                />
                <ReadOnlyItem
                  label="Iraq Market Status"
                  value={MARKET_STATUS_LABELS[product.market.marketStatus]}
                />
                <ReadOnlyItem
                  label="Registration"
                  value={`${
                    REGISTRATION_STATUS_LABELS[product.market.registrationStatus]
                  }${
                    product.market.registrationNumber
                      ? ` (${product.market.registrationNumber})`
                      : ''
                  }`}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ReadOnlyItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
      <div className="text-[11px] text-[#94A3B8]">{label}</div>
      <div className="text-sm font-medium text-[#F1F5F9] mt-0.5">{value}</div>
    </div>
  );
}

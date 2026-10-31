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
  rpcUpsertProductMarketTranslation,
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
      : 'text-[#B8C3CC]';

  return (
    <span className={`text-xs font-medium ${colorClass}`}>
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

  const [newCategory, setNewCategory] = useState<ProductCategory>('prescription_drug');
  const [newGenericId, setNewGenericId] = useState('');
  const [newDrugClassId, setNewDrugClassId] = useState('');
  const [newBrandEn, setNewBrandEn] = useState('');
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
      const byName = bundle.companies.find(
        (c) => c.companyName === access.companyName
      );
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
      genericDrugId:
        newCategory === 'dietary_supplement' && !newGenericId
          ? null
          : newGenericId,
      drugClassId: newDrugClassId,
      englishBrandName: newBrandEn,
    });

    if (!createRes.ok) {
      setCreatingBusy(false);
      setError(createRes.message);
      return;
    }

    const newProductId = createRes.data.id;
    setCreatingBusy(false);
    setCreatingNew(false);
    setNewBrandEn('');
    setNotice('Product draft created.');
    await refresh(newProductId);
  };

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-[#F2F5F8]">
              Pharamty
            </span>
            <span className="h-4 w-px bg-[#304451]" />
            <span className="text-sm text-[#B8C3CC]">
              {access.companyName ??
                activeCompany?.companyName ??
                'Company Catalog'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#B8C3CC] hidden sm:inline">
              {access.email}
            </span>
            {canManageDrafts && (
              <button
                type="button"
                onClick={() => {
                  setCreatingNew((v) => !v);
                  setError(null);
                  setNotice(null);
                }}
                className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-3.5 py-2 transition-colors"
              >
                {creatingNew ? 'Close' : 'New product'}
              </button>
            )}
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">
        {error && <Banner tone="error">{error}</Banner>}
        {notice && <Banner tone="success">{notice}</Banner>}

        {/* New Product Form */}
        {canManageDrafts && creatingNew && bundle && (
          <section className="rounded-xl bg-[#263744] border border-[#304451] p-6">
            <h2 className="text-base font-medium text-[#F2F5F8] mb-4">
              New Product Draft
            </h2>

            <form onSubmit={handleCreateDraft} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Brand Name">
                  <input
                    type="text"
                    required
                    value={newBrandEn}
                    onChange={(e) => setNewBrandEn(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Category">
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProductCategory)
                    }
                    className={inputClass}
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

                <Field label="Drug Class">
                  <select
                    required
                    value={newDrugClassId}
                    onChange={(e) => setNewDrugClassId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select drug class</option>
                    {bundle.drugClasses.map((dc) => (
                      <option key={dc.id} value={dc.id}>
                        {dc.nameEn}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label={
                    newCategory === 'dietary_supplement'
                      ? 'Generic Drug (optional)'
                      : 'Generic Drug'
                  }
                >
                  <select
                    required={newCategory !== 'dietary_supplement'}
                    value={newGenericId}
                    onChange={(e) => setNewGenericId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">
                      {newCategory === 'dietary_supplement'
                        ? 'None'
                        : 'Select generic drug'}
                    </option>
                    {bundle.genericDrugs.map((gd) => (
                      <option key={gd.id} value={gd.id}>
                        {gd.nameEn}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={() => setCreatingNew(false)}
                >
                  Cancel
                </button>
                <div className="w-44">
                  <button
                    type="submit"
                    className={buttonClass}
                    disabled={creatingBusy}
                  >
                    {creatingBusy ? 'Creating…' : 'Create draft'}
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* Filter Bar */}
        <section className="flex flex-wrap items-center gap-2">
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
                    : 'bg-[#263744] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                {st === 'all' ? 'All' : STATUS_LABELS[st]}{' '}
                <span className="font-mono tabular-nums opacity-75">
                  ({count})
                </span>
              </button>
            );
          })}
        </section>

        {/* Main Master-Detail Split */}
        {loading ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
            Loading products…
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center space-y-3">
            <h2 className="text-base font-medium text-[#F2F5F8]">
              No products found
            </h2>
            <p className="text-xs text-[#B8C3CC] max-w-md mx-auto">
              {canManageDrafts
                ? 'Create a new product draft to get started.'
                : 'No products match the selected filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Product List */}
            <div className="lg:col-span-4 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between text-xs text-[#B8C3CC]">
                <span className="font-medium">Products</span>
                <span className="font-mono tabular-nums">
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
                          : 'hover:bg-[#1F2D38]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-[#F2F5F8]">
                          {product.brandNameEn}
                        </span>
                        <StatusText status={product.status} />
                      </div>

                      <div className="text-xs text-[#B8C3CC] mt-1">
                        {product.market
                          ? `${product.market.strength} · ${product.market.dosageForm}`
                          : product.drugClassNameEn}
                      </div>

                      {product.status === 'changes_requested' &&
                        product.reviewReason && (
                          <div className="mt-2 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/40 px-2.5 py-1.5 text-xs text-[#F59E0B]">
                            {product.reviewReason}
                          </div>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail / Editor Panel */}
            <div className="lg:col-span-8">
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

  const enClinical = product.marketTranslations.en;

  const [category, setCategory] = useState<ProductCategory>(product.category);
  const [drugClassId, setDrugClassId] = useState(product.drugClassId);
  const [genericDrugId, setGenericDrugId] = useState(
    product.genericDrugId ?? ''
  );
  const [brandEn, setBrandEn] = useState(product.brandNameEn);

  const [strength, setStrength] = useState(product.market?.strength ?? '');
  const [dosageForm, setDosageForm] = useState(
    product.market?.dosageForm ?? ''
  );
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

  const [approvedIndications, setApprovedIndications] = useState(
    enClinical?.approvedIndications ?? ''
  );
  const [usualAdultDose, setUsualAdultDose] = useState(
    enClinical?.usualAdultDose ?? ''
  );
  const [contraindications, setContraindications] = useState(
    enClinical?.contraindications ?? ''
  );
  const [commonAdverseEffects, setCommonAdverseEffects] = useState(
    enClinical?.commonAdverseEffects ?? ''
  );
  const [storageConditions, setStorageConditions] = useState(
    enClinical?.storageConditions ?? ''
  );

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    product.specialtyIds
  );

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
      genericDrugId:
        category === 'dietary_supplement' && !genericDrugId
          ? null
          : genericDrugId,
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

    setBusy(false);
    await onSuccess('Product details saved.');
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
    await onSuccess('Market details saved.');
  };

  const handleSaveClinicalContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcUpsertProductMarketTranslation(client, {
      productId: product.id,
      locale: 'en',
      storageConditions,
      approvedIndications,
      usualAdultDose,
      contraindications,
      commonAdverseEffects,
    });
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Clinical monograph information saved.');
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
    await onSuccess('Specialties updated.');
  };

  const handleSubmitForReview = async () => {
    setBusy(true);
    const res = await rpcSubmitProductForReview(client, product.id);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Submitted for review.');
  };

  const handleWithdraw = async () => {
    setBusy(true);
    const res = await rpcWithdrawProductSubmission(client, product.id);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Submission withdrawn.');
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
          <h2 className="text-2xl font-semibold text-[#F2F5F8] mt-1">
            {product.brandNameEn}
          </h2>
        </div>

        {canManageDrafts && (
          <div className="flex flex-wrap items-center gap-2">
            {(product.status === 'draft' ||
              product.status === 'changes_requested') && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleSubmitForReview()}
                className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-medium px-3.5 py-2 transition-colors"
              >
                Submit for review
              </button>
            )}

            {product.status === 'submitted' && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleWithdraw()}
                className={secondaryButtonClass}
              >
                Withdraw
              </button>
            )}

            {product.status !== 'archived' && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setShowArchivePrompt((v) => !v)}
                className={secondaryButtonClass}
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
          <span className="font-medium">Changes requested:</span>{' '}
          {product.reviewReason}
        </Banner>
      )}

      {/* Archive Prompt */}
      {canManageDrafts && showArchivePrompt && product.status !== 'archived' && (
        <form
          onSubmit={handleArchive}
          className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-3"
        >
          <Field label="Reason for archiving">
            <input
              type="text"
              required
              value={archiveReason}
              onChange={(e) => setArchiveReason(e.target.value)}
              className={inputClass}
            />
          </Field>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setShowArchivePrompt(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy || !archiveReason.trim()}
              className="rounded-md bg-[#B42318] hover:bg-[#991B1B] disabled:opacity-50 text-white text-xs font-medium px-3.5 py-2"
            >
              Confirm archive
            </button>
          </div>
        </form>
      )}

      {/* Editable Form vs Read-Only Summary */}
      {canEdit ? (
        <div className="space-y-8">
          {/* Section 1: Core Classification & Brand Name */}
          <form onSubmit={handleSaveCoreAndNames} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
              Product Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Brand Name">
                <input
                  type="text"
                  required
                  value={brandEn}
                  onChange={(e) => setBrandEn(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ProductCategory)
                  }
                  className={inputClass}
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

              <Field label="Drug Class">
                <select
                  required
                  value={drugClassId}
                  onChange={(e) => setDrugClassId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select drug class</option>
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
                    : 'Generic Drug'
                }
              >
                <select
                  required={category !== 'dietary_supplement'}
                  value={genericDrugId}
                  onChange={(e) => setGenericDrugId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">
                    {category === 'dietary_supplement'
                      ? 'None'
                      : 'Select generic drug'}
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
              <div className="w-48">
                <button type="submit" className={buttonClass} disabled={busy}>
                  Save classification
                </button>
              </div>
            </div>
          </form>

          {/* Section 2: Iraq Market Presentation & Registration */}
          <form
            onSubmit={handleSaveMarket}
            className="border-t border-[#304451] pt-6 space-y-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
              Market & Registration Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Strength">
                <input
                  type="text"
                  required
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Dosage Form">
                <input
                  type="text"
                  required
                  value={dosageForm}
                  onChange={(e) => setDosageForm(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Route">
                <input
                  type="text"
                  required
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Pack Size">
                <input
                  type="text"
                  required
                  value={packSize}
                  onChange={(e) => setPackSize(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Market Status">
                <select
                  value={marketStatus}
                  onChange={(e) =>
                    setMarketStatus(e.target.value as IraqMarketStatus)
                  }
                  className={inputClass}
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

              <Field label="Registration Status">
                <select
                  value={registrationStatus}
                  onChange={(e) =>
                    setRegistrationStatus(
                      e.target.value as ProductRegistrationStatus
                    )
                  }
                  className={inputClass}
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
                  <Field label="Registration Number">
                    <input
                      type="text"
                      required
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Registration Authority">
                    <input
                      type="text"
                      required
                      value={registrationAuthority}
                      onChange={(e) => setRegistrationAuthority(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Registration Expiry Date">
                    <input
                      type="date"
                      required={registrationStatus === 'expired'}
                      value={registrationExpiresOn}
                      onChange={(e) => setRegistrationExpiresOn(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <div className="w-48">
                <button type="submit" className={buttonClass} disabled={busy}>
                  Save market details
                </button>
              </div>
            </div>
          </form>

          {/* Section 3: Clinical Prescribing Information */}
          <form
            onSubmit={handleSaveClinicalContent}
            className="border-t border-[#304451] pt-6 space-y-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
              Clinical Monograph Information
            </h3>

            <div className="space-y-3">
              <Field label="Approved Indications">
                <textarea
                  rows={2}
                  required
                  value={approvedIndications}
                  onChange={(e) => setApprovedIndications(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Usual Adult Dose">
                <textarea
                  rows={2}
                  required
                  value={usualAdultDose}
                  onChange={(e) => setUsualAdultDose(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Contraindications">
                <textarea
                  rows={2}
                  required
                  value={contraindications}
                  onChange={(e) => setContraindications(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Common Adverse Effects">
                <textarea
                  rows={2}
                  required
                  value={commonAdverseEffects}
                  onChange={(e) => setCommonAdverseEffects(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Storage Conditions">
                <input
                  type="text"
                  required
                  value={storageConditions}
                  onChange={(e) => setStorageConditions(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="flex justify-end">
              <div className="w-48">
                <button type="submit" className={buttonClass} disabled={busy}>
                  Save clinical info
                </button>
              </div>
            </div>
          </form>

          {/* Section 4: Specialties */}
          <div className="border-t border-[#304451] pt-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
              Specialties
            </h3>

            {bundle.specialties.length === 0 ? (
              <p className="text-xs text-[#B8C3CC]">
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
                          ? 'bg-[#1F2D38] border-[#5DB4F2] text-[#F2F5F8]'
                          : 'bg-[#1F2D38]/40 border-[#304451] text-[#B8C3CC]'
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
              <div className="w-48">
                <button
                  type="button"
                  className={buttonClass}
                  disabled={busy}
                  onClick={() => void handleSaveSpecialties()}
                >
                  Save specialties
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <ReadOnlyItem
              label="Category"
              value={CATEGORY_LABELS[product.category]}
            />
            <ReadOnlyItem label="Drug Class" value={product.drugClassNameEn} />
            <ReadOnlyItem
              label="Generic Drug"
              value={product.genericNameEn ?? '—'}
            />
            <ReadOnlyItem
              label="Specialties"
              value={
                product.specialtyNamesEn.length > 0
                  ? product.specialtyNamesEn.join(', ')
                  : '—'
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
                  label="Market Status"
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
                <ReadOnlyItem
                  label="Registration Authority"
                  value={product.market.registrationAuthority ?? '—'}
                />
                <ReadOnlyItem
                  label="Registration Expiry"
                  value={product.market.registrationExpiresOn ?? '—'}
                />
              </>
            )}
          </div>

          {enClinical && (
            <div className="border-t border-[#304451] pt-5 space-y-3 text-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
                Clinical Information
              </h4>
              <div>
                <span className="text-xs text-[#B8C3CC] block">
                  Approved Indications
                </span>
                <p className="text-[#F2F5F8] mt-0.5">
                  {enClinical.approvedIndications}
                </p>
              </div>
              <div>
                <span className="text-xs text-[#B8C3CC] block">
                  Usual Adult Dose
                </span>
                <p className="text-[#F2F5F8] mt-0.5">
                  {enClinical.usualAdultDose}
                </p>
              </div>
              <div>
                <span className="text-xs text-[#B8C3CC] block">
                  Contraindications
                </span>
                <p className="text-[#F2F5F8] mt-0.5">
                  {enClinical.contraindications}
                </p>
              </div>
              <div>
                <span className="text-xs text-[#B8C3CC] block">
                  Common Adverse Effects
                </span>
                <p className="text-[#F2F5F8] mt-0.5">
                  {enClinical.commonAdverseEffects}
                </p>
              </div>
              <div>
                <span className="text-xs text-[#B8C3CC] block">
                  Storage Conditions
                </span>
                <p className="text-[#F2F5F8] mt-0.5">
                  {enClinical.storageConditions}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ReadOnlyItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#304451]/60 pb-3">
      <div className="text-xs text-[#B8C3CC]">{label}</div>
      <div className="text-sm font-medium text-[#F2F5F8] mt-1">{value}</div>
    </div>
  );
}

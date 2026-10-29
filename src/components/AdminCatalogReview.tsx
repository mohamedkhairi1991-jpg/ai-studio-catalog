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
  rpcAdminArchiveProduct,
  rpcAdminHideProduct,
  rpcAdminPublishProduct,
  rpcAdminRequestProductChanges,
  rpcAdminRestoreProduct,
  type CatalogBundle,
  type CatalogProduct,
  type ProductStatus,
} from '../lib/catalog';
import AdminApprovals from './AdminApprovals';
import { StatusText } from './CompanyCatalog';
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

export function AdminCatalogReview({ client, access, onSignOut }: Props) {
  const [adminView, setAdminView] = useState<'catalog' | 'approvals'>('catalog');
  const [bundle, setBundle] = useState<CatalogBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>(
    'submitted'
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        } else {
          const submittedFirst = res.data.products.find(
            (p) => p.status === 'submitted'
          );
          setSelectedId(submittedFirst?.id ?? res.data.products[0]?.id ?? null);
        }
      }
      setLoading(false);
    },
    [client, selectedId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filteredProducts = useMemo(() => {
    if (!bundle) return [];
    return filterProductsByStatus(bundle.products, statusFilter);
  }, [bundle, statusFilter]);

  const selectedProduct = useMemo(() => {
    if (filteredProducts.length === 0) return null;
    if (selectedId) {
      const found = filteredProducts.find((p) => p.id === selectedId);
      if (found) return found;
    }
    return filteredProducts[0] ?? null;
  }, [filteredProducts, selectedId]);

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F1F5F9] flex flex-col">
      {/* Admin Navigation Header */}
      <header className="border-b border-[#304451] bg-[#263744] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5DB4F2]">
                Pharamty · Administration
              </span>
              <span className="text-xs text-[#94A3B8]">
                {adminView === 'catalog' ? '/catalog/review' : '/admin/approvals'}
              </span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">
              {adminView === 'catalog'
                ? 'Official Catalog Review & Governance'
                : 'Physician & Company Approvals'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Switcher to keep AdminApprovals reachable */}
            <div className="flex items-center rounded-lg bg-[#1F2D38] border border-[#304451] p-1">
              <button
                type="button"
                onClick={() => setAdminView('catalog')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  adminView === 'catalog'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                Catalog Review Queue
              </button>
              <button
                type="button"
                onClick={() => setAdminView('approvals')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  adminView === 'approvals'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                Physician & Company Approvals
              </button>
            </div>

            {adminView === 'catalog' && (
              <>
                <GhostButton onClick={() => void refresh()} disabled={loading}>
                  Refresh
                </GhostButton>
                <GhostButton onClick={onSignOut}>Sign out</GhostButton>
              </>
            )}
          </div>
        </div>
      </header>

      {adminView === 'approvals' ? (
        <AdminApprovals
          client={client}
          email={access.email}
          onSignOut={onSignOut}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">
          {error && <Banner tone="error">{error}</Banner>}
          {notice && <Banner tone="success">{notice}</Banner>}

          {/* Status Queue Tabs */}
          <section className="rounded-xl bg-[#263744] border border-[#304451] p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  'submitted',
                  'published',
                  'changes_requested',
                  'hidden',
                  'archived',
                  'draft',
                  'all',
                ] as const
              ).map((st) => {
                const active = statusFilter === st;
                const count =
                  st === 'all'
                    ? bundle?.products.length ?? 0
                    : (bundle?.products ?? []).filter((p) => p.status === st)
                        .length;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStatusFilter(st);
                      setError(null);
                      setNotice(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                        : 'bg-[#1F2D38] border-[#304451] text-[#CBD5E1] hover:border-[#475569]'
                    }`}
                  >
                    {st === 'all' ? 'All Records' : STATUS_LABELS[st]}{' '}
                    <span className="font-mono tabular-nums opacity-80">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-[#94A3B8]">
              Signed in as <span className="text-[#E2E8F0]">{access.email}</span>
            </div>
          </section>

          {/* Queue & Product Inspection Split */}
          {loading ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center text-sm text-[#94A3B8]">
              Loading catalog review queue from Supabase…
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-10 text-center">
              <h2 className="text-base font-semibold text-[#F1F5F9]">
                No products in{' '}
                {statusFilter === 'all'
                  ? 'the catalog'
                  : `"${STATUS_LABELS[statusFilter]}"`}{' '}
                queue
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1.5 max-w-md mx-auto">
                Switch status tabs above to inspect products in other lifecycle states.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Queue List */}
              <div className="lg:col-span-5 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#304451] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    {statusFilter === 'all'
                      ? 'All Catalog Records'
                      : `${STATUS_LABELS[statusFilter]} Queue`}
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
                          <div
                            dir="rtl"
                            className="text-xs text-[#CBD5E1] mt-0.5"
                          >
                            {product.brandNameAr}
                          </div>
                        )}

                        <div className="text-xs text-[#5DB4F2] mt-1">
                          {product.companyName}
                        </div>

                        <div className="text-[11px] text-[#94A3B8] mt-1 flex items-center justify-between">
                          <span>
                            {product.genericNameEn ?? 'No Generic'} ·{' '}
                            {product.drugClassNameEn}
                          </span>
                          {product.submittedAt && (
                            <span className="font-mono tabular-nums">
                              {new Date(product.submittedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Full Product Inspection & Governance Actions */}
              <div className="lg:col-span-7">
                {selectedProduct && (
                  <AdminProductInspector
                    key={selectedProduct.id + ':' + selectedProduct.updatedAt}
                    client={client}
                    product={selectedProduct}
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
      )}
    </div>
  );
}

interface InspectorProps {
  client: SupabaseClient;
  product: CatalogProduct;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => Promise<void>;
}

function AdminProductInspector({
  client,
  product,
  onError,
  onSuccess,
}: InspectorProps) {
  const [busy, setBusy] = useState(false);

  // Action input states
  const [changesReason, setChangesReason] = useState('');
  const [hideReason, setHideReason] = useState('');
  const [archiveReason, setArchiveReason] = useState('');
  const [restoreReason, setRestoreReason] = useState('');
  const [restoreDestination, setRestoreDestination] =
    useState<ProductStatus>('published');

  const market = product.market;
  const enClinical = product.marketTranslations.en;
  const arClinical = product.marketTranslations.ar;

  const handlePublish = async () => {
    setBusy(true);
    const res = await rpcAdminPublishProduct(client, product.id);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    await onSuccess('Product published to the official catalog.');
  };

  const handleRequestChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcAdminRequestProductChanges(
      client,
      product.id,
      changesReason
    );
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    setChangesReason('');
    await onSuccess('Product returned to company with requested changes.');
  };

  const handleHide = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcAdminHideProduct(client, product.id, hideReason);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    setHideReason('');
    await onSuccess('Product hidden from official catalog.');
  };

  const handleArchive = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcAdminArchiveProduct(client, product.id, archiveReason);
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    setArchiveReason('');
    await onSuccess('Product archived.');
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcAdminRestoreProduct(
      client,
      product.id,
      restoreDestination,
      restoreReason
    );
    setBusy(false);
    if (!res.ok) {
      onError(res.message);
      return;
    }
    setRestoreReason('');
    await onSuccess(`Product restored to ${STATUS_LABELS[restoreDestination]}.`);
  };

  return (
    <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      {/* Header */}
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
          <div className="text-xs text-[#94A3B8] mt-1">
            Submitted by{' '}
            <span className="text-[#E2E8F0] font-medium">
              {product.companyName}
            </span>{' '}
            {product.companyStatus ? `(${product.companyStatus})` : ''}
          </div>
        </div>

        <div className="text-right text-xs text-[#94A3B8] font-mono tabular-nums space-y-0.5">
          <div>ID: {product.id.slice(0, 8)}…</div>
          {product.submittedAt && (
            <div>
              Submitted: {new Date(product.submittedAt).toLocaleString()}
            </div>
          )}
          {product.reviewedAt && (
            <div>Reviewed: {new Date(product.reviewedAt).toLocaleString()}</div>
          )}
        </div>
      </div>

      {/* Existing Review Reason if present */}
      {product.reviewReason && (
        <Banner tone="warn">
          <span className="font-semibold">Recorded review reason:</span>{' '}
          {product.reviewReason}
        </Banner>
      )}

      {/* Administrator Lifecycle Actions */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
          Administrator Governance Actions
        </h3>

        {/* Actions on 'submitted' products */}
        {product.status === 'submitted' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-[#1F2D38] border border-[#38C976]/40 p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#38C976]">
                  Publish to Official Iraq Catalog
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">
                  Calls <code className="font-mono">admin_publish_product</code>.
                  Verifies publication requirements in PostgreSQL.
                </div>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handlePublish()}
                className="rounded-lg bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 transition-colors"
              >
                {busy ? 'Publishing…' : 'Publish Product'}
              </button>
            </div>

            <form
              onSubmit={handleRequestChanges}
              className="rounded-lg bg-[#1F2D38] border border-[#F59E0B]/40 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FCD34D]">
                  Request Changes from Company
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  admin_request_product_changes
                </span>
              </div>
              <Field label="Reason for requesting changes *">
                <input
                  type="text"
                  required
                  value={changesReason}
                  onChange={(e) => setChangesReason(e.target.value)}
                  placeholder="Specify what the company needs to correct or complete…"
                  className={INPUT_CLASS}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy || !changesReason.trim()}
                  className="rounded-lg bg-[#D97706] hover:bg-[#B45309] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 transition-colors"
                >
                  Request Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Actions on 'published' products: Hide and Archive */}
        {product.status === 'published' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form
              onSubmit={handleHide}
              className="rounded-lg bg-[#1F2D38] border border-[#F59E0B]/40 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FCD34D]">
                  Hide Published Product
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  admin_hide_product
                </span>
              </div>
              <Field label="Hiding Reason *">
                <input
                  type="text"
                  required
                  value={hideReason}
                  onChange={(e) => setHideReason(e.target.value)}
                  placeholder="Reason for hiding from catalog…"
                  className={INPUT_CLASS}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy || !hideReason.trim()}
                  className="rounded-lg bg-[#D97706] hover:bg-[#B45309] disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2"
                >
                  Hide Product
                </button>
              </div>
            </form>

            <form
              onSubmit={handleArchive}
              className="rounded-lg bg-[#1F2D38] border border-[#FF7272]/40 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FCA5A5]">
                  Archive Product
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  admin_archive_product
                </span>
              </div>
              <Field label="Archive Reason *">
                <input
                  type="text"
                  required
                  value={archiveReason}
                  onChange={(e) => setArchiveReason(e.target.value)}
                  placeholder="Reason for permanent archiving…"
                  className={INPUT_CLASS}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy || !archiveReason.trim()}
                  className="rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2"
                >
                  Archive Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Actions on 'hidden' or 'archived' products: Restore (and Archive if hidden) */}
        {(product.status === 'hidden' || product.status === 'archived') && (
          <div className="space-y-4">
            <form
              onSubmit={handleRestore}
              className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5DB4F2]">
                  Restore Product
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  admin_restore_product
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Destination Status *">
                  <select
                    value={restoreDestination}
                    onChange={(e) =>
                      setRestoreDestination(e.target.value as ProductStatus)
                    }
                    className={SELECT_CLASS}
                  >
                    <option value="published">Published</option>
                    <option value="changes_requested">Changes Requested</option>
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                  </select>
                </Field>
                <Field label="Restore Reason *">
                  <input
                    type="text"
                    required
                    value={restoreReason}
                    onChange={(e) => setRestoreReason(e.target.value)}
                    placeholder="Reason for restoring product…"
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
              <div className="flex justify-end">
                <div className="w-48">
                  <PrimaryButton
                    type="submit"
                    disabled={busy || !restoreReason.trim()}
                  >
                    Restore Product
                  </PrimaryButton>
                </div>
              </div>
            </form>

            {product.status === 'hidden' && (
              <form
                onSubmit={handleArchive}
                className="rounded-lg bg-[#1F2D38] border border-[#FF7272]/40 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#FCA5A5]">
                    Archive Hidden Product
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    admin_archive_product
                  </span>
                </div>
                <Field label="Archive Reason *">
                  <input
                    type="text"
                    required
                    value={archiveReason}
                    onChange={(e) => setArchiveReason(e.target.value)}
                    placeholder="Reason for permanent archiving…"
                    className={INPUT_CLASS}
                  />
                </Field>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={busy || !archiveReason.trim()}
                    className="rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2"
                  >
                    Archive Product
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Complete Submitted Data Inspection */}
      <div className="border-t border-[#304451] pt-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
          Submitted Product Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <InspectCell
            label="English Brand Name (en)"
            value={product.brandNameEn}
          />
          <InspectCell
            label="Arabic Brand Name (ar)"
            value={product.brandNameAr ?? 'Not provided'}
          />
          <InspectCell
            label="Company"
            value={`${product.companyName}${
              product.companyStatus ? ` (${product.companyStatus})` : ''
            }`}
          />
          <InspectCell
            label="Category"
            value={CATEGORY_LABELS[product.category]}
          />
          <InspectCell
            label="Generic / Scientific Drug"
            value={
              product.genericNameEn
                ? `${product.genericNameEn}${
                    product.genericNameAr ? ` (${product.genericNameAr})` : ''
                  }`
                : 'None (Dietary Supplement)'
            }
          />
          <InspectCell
            label="Drug Class"
            value={`${product.drugClassNameEn}${
              product.drugClassNameAr ? ` (${product.drugClassNameAr})` : ''
            }`}
          />
          <InspectCell
            label="Assigned Specialties"
            value={
              product.specialtyNamesEn.length > 0
                ? product.specialtyNamesEn.join(', ')
                : 'None assigned'
            }
          />
          <InspectCell
            label="Media & Brochures"
            value={`${product.media.length} media file(s), ${product.brochures.length} brochure(s)`}
            mono
          />
        </div>

        {/* Market Presentation & Registration */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-[#CBD5E1] mb-2">
            Iraq Market Presentation & Registration (product_markets)
          </h4>
          {market ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <InspectCell label="Strength" value={market.strength} mono />
              <InspectCell label="Dosage Form" value={market.dosageForm} />
              <InspectCell label="Route" value={market.route} />
              <InspectCell label="Pack Size" value={market.packSize} mono />
              <InspectCell
                label="Iraq Market Status"
                value={MARKET_STATUS_LABELS[market.marketStatus]}
              />
              <InspectCell
                label="Registration Status"
                value={REGISTRATION_STATUS_LABELS[market.registrationStatus]}
              />
              <InspectCell
                label="Registration Number"
                value={market.registrationNumber ?? 'Not recorded'}
                mono
              />
              <InspectCell
                label="Registration Authority"
                value={market.registrationAuthority ?? 'Not recorded'}
              />
              <InspectCell
                label="Registration Expiry"
                value={market.registrationExpiresOn ?? 'Not recorded'}
                mono
              />
            </div>
          ) : (
            <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3 text-xs text-[#94A3B8]">
              No Iraq market record (<code className="font-mono">product_markets</code>) entered yet.
            </div>
          )}
        </div>

        {/* Clinical Translations if entered */}
        {(enClinical || arClinical) && (
          <div className="pt-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#CBD5E1]">
              Market Clinical Content (product_market_translations)
            </h4>
            {enClinical && (
              <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3 text-xs space-y-1.5">
                <div className="font-semibold text-[#5DB4F2]">English (en)</div>
                <div>
                  <span className="text-[#94A3B8]">Indications:</span>{' '}
                  {enClinical.approvedIndications}
                </div>
                <div>
                  <span className="text-[#94A3B8]">Adult Dose:</span>{' '}
                  {enClinical.usualAdultDose}
                </div>
                <div>
                  <span className="text-[#94A3B8]">Contraindications:</span>{' '}
                  {enClinical.contraindications}
                </div>
                <div>
                  <span className="text-[#94A3B8]">Adverse Effects:</span>{' '}
                  {enClinical.commonAdverseEffects}
                </div>
                <div>
                  <span className="text-[#94A3B8]">Storage:</span>{' '}
                  {enClinical.storageConditions}
                </div>
              </div>
            )}
            {arClinical && (
              <div
                dir="rtl"
                className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3 text-xs space-y-1.5"
              >
                <div className="font-semibold text-[#5DB4F2]">العربية (ar)</div>
                <div>
                  <span className="text-[#94A3B8]">دواعي الاستعمال:</span>{' '}
                  {arClinical.approvedIndications}
                </div>
                <div>
                  <span className="text-[#94A3B8]">الجرعة:</span>{' '}
                  {arClinical.usualAdultDose}
                </div>
                <div>
                  <span className="text-[#94A3B8]">موانع الاستعمال:</span>{' '}
                  {arClinical.contraindications}
                </div>
                <div>
                  <span className="text-[#94A3B8]">الآثار الجانبية:</span>{' '}
                  {arClinical.commonAdverseEffects}
                </div>
                <div>
                  <span className="text-[#94A3B8]">الخزن:</span>{' '}
                  {arClinical.storageConditions}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InspectCell({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
      <div className="text-[11px] text-[#94A3B8]">{label}</div>
      <div
        className={`text-sm mt-0.5 text-[#F1F5F9] ${
          mono ? 'font-mono tabular-nums' : 'font-medium'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

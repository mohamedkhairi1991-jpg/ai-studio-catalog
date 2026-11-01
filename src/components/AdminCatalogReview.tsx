import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  REGISTRATION_STATUS_LABELS,
  STATUS_LABELS,
  filterProductsByStatus,
  findMatchingTaxonomyOption,
  invokeAiDraftProduct,
  loadCatalogBundle,
  loadProductAiDraft,
  publishProduct,
  rpcAdminArchiveCompany,
  rpcAdminArchiveProduct,
  rpcAdminCreateCompany,
  rpcAdminEnsureGenericDrug,
  rpcAdminEnsureSpecialties,
  rpcAdminHideProduct,
  rpcAdminRequestProductChanges,
  rpcAdminRestoreProduct,
  rpcAdminUpdateCompany,
  saveAndPublishCompleteProduct,
  type AiDraftProductResponse,
  type CatalogBundle,
  type CatalogProduct,
  type CompanySummary,
  type IraqMarketStatus,
  type ProductCategory,
  type ProductRegistrationStatus,
  type ProductStatus,
  type StoredProductAiDraft,
} from '../lib/catalog';
import { listCities, listCountries, type Option } from '../lib/onboarding';
import {
  clearChatCompanyRemovedFlags,
  getMissingChatCatalogSummary,
  markChatCompanyRemoved,
  syncChatApprovedCatalog,
} from '../lib/chatCatalogData';
import AdminApprovals from './AdminApprovals';
import { StatusText } from './CompanyCatalog';
import { CatalogBanner as Banner } from './DoctorCatalog';
import { BrandLogo, Field, buttonClass, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  access: AccessResult;
  onSignOut: () => void;
}

export function AdminCatalogReview({ client, access, onSignOut }: Props) {
  const [adminView, setAdminView] = useState<
    'catalog' | 'companies' | 'approvals'
  >('catalog');
  const [bundle, setBundle] = useState<CatalogBundle | null>(null);
  const [cities, setCities] = useState<Option[]>([]);
  const [defaultCountryId, setDefaultCountryId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [syncingChatCatalog, setSyncingChatCatalog] = useState(false);
  const [syncProgressText, setSyncProgressText] = useState<string | null>(null);
  const autoSyncAttemptedRef = React.useRef(false);
  const [confirmingRemoveCompanyId, setConfirmingRemoveCompanyId] = useState<
    string | null
  >(null);
  const [removingCompanyId, setRemovingCompanyId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [errorReasons, setErrorReasons] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const [companyFilterId, setCompanyFilterId] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [creatingProduct, setCreatingProduct] = useState(false);
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanySummary | null>(
    null
  );
  const [batchPublishing, setBatchPublishing] = useState(false);

  // Company Add / Edit form state
  const [compName, setCompName] = useState('');
  const [compLegalName, setCompLegalName] = useState('');
  const [compCityId, setCompCityId] = useState('');
  const [compWebsite, setCompWebsite] = useState('');
  const [compEmail, setCompEmail] = useState('');
  const [compPhone, setCompPhone] = useState('');
  const [compDescription, setCompDescription] = useState('');
  const [compBusy, setCompBusy] = useState(false);

  const clearFeedback = () => {
    setError(null);
    setErrorReasons([]);
    setNotice(null);
  };

  const setFailure = (message: string, reasons?: string[]) => {
    setNotice(null);
    setError(message);
    setErrorReasons(reasons ?? []);
  };

  const refresh = useCallback(
    async (preferProductId?: string) => {
      setLoading(true);
      const [res, countriesList] = await Promise.all([
        loadCatalogBundle(client),
        listCountries(client),
      ]);

      const iraqCountry = countriesList[0]?.id ?? '';
      setDefaultCountryId(iraqCountry);
      if (iraqCountry) {
        const citiesList = await listCities(client, iraqCountry);
        setCities(citiesList);
      }

      if (!res.ok) {
        setError(res.message);
        setErrorReasons(res.reasons ?? []);
        setBundle(null);
      } else {
        let finalBundle = res.data;

        if (!autoSyncAttemptedRef.current) {
          autoSyncAttemptedRef.current = true;
          const missing = getMissingChatCatalogSummary(finalBundle);
          if (missing.missingCompanyCount > 0 || missing.missingProductCount > 0) {
            setSyncingChatCatalog(true);
            const syncRes = await syncChatApprovedCatalog(client, finalBundle, {
              forceIncludeRemoved: false,
              onProgress: (text) => setSyncProgressText(text),
            });
            setSyncProgressText(null);
            setSyncingChatCatalog(false);

            if (syncRes.companiesAdded > 0 || syncRes.productsAdded > 0) {
              const reloaded = await loadCatalogBundle(client);
              if (reloaded.ok) {
                finalBundle = reloaded.data;
              }
              setNotice(
                `Added ${
                  syncRes.companiesAdded > 0
                    ? `${syncRes.companiesAdded} company and `
                    : ''
                }${syncRes.productsAdded} Iraq-marketed product draft${
                  syncRes.productsAdded === 1 ? '' : 's'
                } to the catalog.`
              );
            }
            if (syncRes.errors.length > 0) {
              setFailure(syncRes.errors.join(' | '));
            }
          }
        }

        setBundle(finalBundle);
        if (
          preferProductId &&
          finalBundle.products.some((p) => p.id === preferProductId)
        ) {
          setSelectedId(preferProductId);
        } else if (
          selectedId &&
          !finalBundle.products.some((p) => p.id === selectedId)
        ) {
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

  const handleManualSyncChatCatalog = async () => {
    if (!bundle || syncingChatCatalog) return;
    clearFeedback();
    clearChatCompanyRemovedFlags();
    setSyncingChatCatalog(true);
    const syncRes = await syncChatApprovedCatalog(client, bundle, {
      forceIncludeRemoved: true,
      onProgress: (text) => setSyncProgressText(text),
    });
    setSyncProgressText(null);
    setSyncingChatCatalog(false);

    if (syncRes.errors.length > 0) {
      setFailure(syncRes.errors.join(' | '));
    }
    if (syncRes.companiesAdded > 0 || syncRes.productsAdded > 0) {
      setNotice(
        `Synced ${
          syncRes.companiesAdded > 0
            ? `${syncRes.companiesAdded} company and `
            : ''
        }${syncRes.productsAdded} product draft${
          syncRes.productsAdded === 1 ? '' : 's'
        } into the catalog.`
      );
    } else if (syncRes.errors.length === 0) {
      setNotice('All chat-approved companies and products are already in the catalog.');
    }
    await refresh();
  };

  const handleRemoveCompany = async (comp: CompanySummary) => {
    setRemovingCompanyId(comp.id);
    clearFeedback();
    markChatCompanyRemoved(comp.companyName);

    const companyProducts = (bundle?.products ?? []).filter(
      (p) => p.companyId === comp.id
    );
    for (const prod of companyProducts) {
      await rpcAdminArchiveProduct(
        client,
        prod.id,
        `Archived with company ${comp.companyName}.`
      );
    }

    const res = await rpcAdminArchiveCompany(
      client,
      comp.id,
      'Removed by administrator.'
    );
    setRemovingCompanyId(null);
    setConfirmingRemoveCompanyId(null);

    if (!res.ok) {
      setFailure(res.message, res.reasons);
      return;
    }

    if (companyFilterId === comp.id) {
      setCompanyFilterId('all');
    }
    setNotice(`Removed company "${comp.companyName}".`);
    await refresh();
  };

  const filteredProducts = useMemo(() => {
    if (!bundle) return [];
    const byStatus = filterProductsByStatus(bundle.products, statusFilter);
    if (companyFilterId === 'all') return byStatus;
    return byStatus.filter((p) => p.companyId === companyFilterId);
  }, [bundle, statusFilter, companyFilterId]);

  const pendingProducts = useMemo(() => {
    if (!bundle) return [];
    return bundle.products.filter(
      (p) =>
        p.status === 'submitted' ||
        p.status === 'draft' ||
        p.status === 'changes_requested'
    );
  }, [bundle]);

  const openAddCompanyForm = () => {
    setEditingCompany(null);
    setCompName('');
    setCompLegalName('');
    setCompCityId('');
    setCompWebsite('');
    setCompEmail('');
    setCompPhone('');
    setCompDescription('');
    setCreatingCompany(true);
    clearFeedback();
  };

  const openEditCompanyForm = (comp: CompanySummary) => {
    setEditingCompany(comp);
    setCompName(comp.companyName);
    setCompLegalName(comp.legalName ?? comp.companyName);
    setCompCityId(comp.cityId ?? '');
    setCompWebsite(comp.websiteUrl ?? '');
    setCompEmail(comp.contactEmail ?? '');
    setCompPhone(comp.contactPhone ?? '');
    setCompDescription(comp.description ?? '');
    setCreatingCompany(true);
    clearFeedback();
  };

  const closeCompanyForm = () => {
    setCreatingCompany(false);
    setEditingCompany(null);
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim() || !compLegalName.trim()) {
      setFailure('Company name and legal name are required.');
      return;
    }
    setCompBusy(true);
    clearFeedback();

    const payload = {
      countryId: editingCompany?.countryId ?? defaultCountryId,
      cityId: compCityId || null,
      companyName: compName,
      legalName: compLegalName,
      websiteUrl: compWebsite,
      contactEmail: compEmail,
      contactPhone: compPhone,
      description: compDescription,
    };

    const res = editingCompany
      ? await rpcAdminUpdateCompany(client, editingCompany.id, payload)
      : await rpcAdminCreateCompany(client, payload);

    setCompBusy(false);
    if (!res.ok) {
      setFailure(res.message, res.reasons);
      return;
    }

    const wasEditing = Boolean(editingCompany);
    closeCompanyForm();
    setCompanyFilterId(res.data.id);
    setNotice(
      wasEditing
        ? `Updated company "${res.data.companyName}".`
        : `Added company "${res.data.companyName}".`
    );
    await refresh();
  };

  const handlePublishAllPending = async () => {
    if (pendingProducts.length === 0) return;
    setBatchPublishing(true);
    clearFeedback();
    let publishedCount = 0;
    const errors: string[] = [];
    const collectedReasons: string[] = [];

    for (const item of pendingProducts) {
      const res = await publishProduct(client, item);
      if (res.ok) {
        publishedCount += 1;
      } else {
        errors.push(`${item.brandNameEn}: ${res.message}`);
        for (const r of res.reasons ?? []) {
          const labeled = `${item.brandNameEn}: ${r}`;
          if (!collectedReasons.includes(labeled)) {
            collectedReasons.push(labeled);
          }
        }
      }
    }

    setBatchPublishing(false);
    if (errors.length > 0) {
      setFailure(errors.join(' | '), collectedReasons);
    }
    if (publishedCount > 0) {
      setNotice(
        `Published ${publishedCount} product${
          publishedCount === 1 ? '' : 's'
        } to the Official Doctor Catalog.`
      );
    }
    await refresh();
  };

  const selectedProduct = useMemo(() => {
    if (!selectedId || filteredProducts.length === 0) return null;
    return filteredProducts.find((p) => p.id === selectedId) ?? null;
  }, [filteredProducts, selectedId]);

  const productsByDrugClass = useMemo(() => {
    const groups = new Map<string, CatalogProduct[]>();
    for (const product of filteredProducts) {
      const className = product.drugClassNameEn || 'Other';
      const list = groups.get(className) ?? [];
      list.push(product);
      groups.set(className, list);
    }
    return Array.from(groups.entries());
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span className="h-4 w-px bg-[#304451]" />
            <div className="flex items-center rounded-lg bg-[#1F2D38] border border-[#304451] p-0.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('catalog');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  adminView === 'catalog'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Catalog ({bundle?.products.length ?? 0})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('companies');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  adminView === 'companies'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Companies ({bundle?.companies.length ?? 0})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('approvals');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  adminView === 'approvals'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Doctor Approvals
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#B8C3CC] hidden md:inline">
              {access.email}
            </span>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => void refresh()}
              disabled={loading || batchPublishing}
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

      {adminView === 'approvals' ? (
        <AdminApprovals
          client={client}
          email={access.email}
          onSignOut={onSignOut}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">
          {syncingChatCatalog && syncProgressText && (
            <Banner tone="warn">{syncProgressText}</Banner>
          )}
          {error && (
            <Banner tone="error">
              <div className="space-y-2">
                <div>{error}</div>
                {errorReasons.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#F2F5F8]">
                    {errorReasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Banner>
          )}
          {notice && <Banner tone="success">{notice}</Banner>}

          {adminView === 'companies' ? (
            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#263744] border border-[#304451] p-5">
                <div>
                  <h1 className="text-base font-semibold text-[#F2F5F8]">
                    Companies ({bundle?.companies.length ?? 0})
                  </h1>
                  <p className="text-xs text-[#B8C3CC] mt-0.5">
                    Manage pharmaceutical companies in the catalog.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  {getMissingChatCatalogSummary(bundle).missingProductCount >
                    0 && (
                    <button
                      type="button"
                      disabled={syncingChatCatalog || loading}
                      onClick={() => void handleManualSyncChatCatalog()}
                      className={secondaryButtonClass}
                    >
                      {syncingChatCatalog
                        ? 'Syncing…'
                        : `Sync Chat Catalog (${
                            getMissingChatCatalogSummary(bundle)
                              .missingProductCount
                          })`}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (creatingCompany) {
                        closeCompanyForm();
                      } else {
                        openAddCompanyForm();
                      }
                    }}
                    className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-4 py-2 transition-colors"
                  >
                    {creatingCompany ? 'Close Form' : '+ Add Company'}
                  </button>
                </div>
              </div>

              {creatingCompany && (
                <CompanyEditorForm
                  editingCompany={editingCompany}
                  cities={cities}
                  compName={compName}
                  setCompName={setCompName}
                  compLegalName={compLegalName}
                  setCompLegalName={setCompLegalName}
                  compCityId={compCityId}
                  setCompCityId={setCompCityId}
                  compWebsite={compWebsite}
                  setCompWebsite={setCompWebsite}
                  compEmail={compEmail}
                  setCompEmail={setCompEmail}
                  compPhone={compPhone}
                  setCompPhone={setCompPhone}
                  compDescription={compDescription}
                  setCompDescription={setCompDescription}
                  compBusy={compBusy}
                  onCancel={closeCompanyForm}
                  onSubmit={handleSaveCompany}
                />
              )}

              {loading ? (
                <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
                  Loading companies…
                </div>
              ) : (bundle?.companies.length ?? 0) === 0 ? (
                <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center space-y-2">
                  <div className="text-sm font-medium text-[#F2F5F8]">
                    No companies in the catalog
                  </div>
                  <p className="text-xs text-[#B8C3CC]">
                    Click "+ Add Company" to add a company.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(bundle?.companies ?? []).map((comp) => {
                    const compProducts = (bundle?.products ?? []).filter(
                      (p) => p.companyId === comp.id
                    );
                    const isConfirmingRemove =
                      confirmingRemoveCompanyId === comp.id;
                    const isRemoving = removingCompanyId === comp.id;
                    return (
                      <div
                        key={comp.id}
                        className="rounded-xl bg-[#263744] border border-[#304451] p-5 flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <button
                                type="button"
                                onClick={() => {
                                  setCompanyFilterId(comp.id);
                                  setSelectedId(null);
                                  setAdminView('catalog');
                                }}
                                className="text-left text-base font-semibold text-[#F2F5F8] hover:text-[#5DB4F2] transition-colors"
                              >
                                {comp.companyName}
                              </button>
                              {comp.legalName &&
                                comp.legalName !== comp.companyName && (
                                  <div className="text-xs text-[#B8C3CC] mt-0.5">
                                    {comp.legalName}
                                  </div>
                                )}
                            </div>
                            <span className="rounded-md bg-[#1F2D38] border border-[#304451] px-2 py-0.5 text-xs text-[#38C976] font-medium">
                              {comp.status}
                            </span>
                          </div>
                          {comp.description && (
                            <p className="text-xs text-[#B8C3CC]">
                              {comp.description}
                            </p>
                          )}
                          <div className="text-xs text-[#B8C3CC]">
                            Drugs:{' '}
                            <span className="font-mono text-[#F2F5F8]">
                              {compProducts.length}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#304451]">
                          {isConfirmingRemove ? (
                            <>
                              <span className="text-xs text-[#F59E0B] w-full">
                                Remove {comp.companyName} and archive its{' '}
                                {compProducts.length} product
                                {compProducts.length === 1 ? '' : 's'}?
                              </span>
                              <button
                                type="button"
                                disabled={isRemoving}
                                onClick={() => void handleRemoveCompany(comp)}
                                className="rounded-md bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-medium px-3 py-1.5 transition-colors disabled:opacity-50"
                              >
                                {isRemoving ? 'Removing…' : 'Confirm Remove'}
                              </button>
                              <button
                                type="button"
                                disabled={isRemoving}
                                onClick={() =>
                                  setConfirmingRemoveCompanyId(null)
                                }
                                className={secondaryButtonClass}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setCompanyFilterId(comp.id);
                                  setSelectedId(null);
                                  setAdminView('catalog');
                                }}
                                className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-3 py-2 transition-colors"
                              >
                                View Drugs ({compProducts.length})
                              </button>
                              <button
                                type="button"
                                onClick={() => openEditCompanyForm(comp)}
                                className={secondaryButtonClass}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCompanyFilterId(comp.id);
                                  setSelectedId(null);
                                  setCreatingProduct(true);
                                  setAdminView('catalog');
                                }}
                                className={secondaryButtonClass}
                              >
                                + Add Drug
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirmingRemoveCompanyId(comp.id)
                                }
                                className="rounded-md bg-[#1F2D38] hover:bg-[#B42318] border border-[#304451] text-[#B8C3CC] hover:text-white text-xs font-medium px-3 py-2 transition-colors"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Admin Catalog Toolbar */}
              <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#263744] border border-[#304451] p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    aria-label="Filter by company"
                    value={companyFilterId}
                    onChange={(e) => {
                      setCompanyFilterId(e.target.value);
                      setSelectedId(null);
                    }}
                    className={`${inputClass} sm:w-64`}
                  >
                    <option value="all">
                      All Companies ({bundle?.companies.length ?? 0})
                    </option>
                    {(bundle?.companies ?? []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (creatingCompany) {
                        closeCompanyForm();
                      } else {
                        openAddCompanyForm();
                        setCreatingProduct(false);
                      }
                    }}
                    className={secondaryButtonClass}
                  >
                    {creatingCompany ? 'Close Company Form' : '+ Add Company'}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {getMissingChatCatalogSummary(bundle).missingProductCount >
                    0 && (
                    <button
                      type="button"
                      disabled={syncingChatCatalog || loading}
                      onClick={() => void handleManualSyncChatCatalog()}
                      className={secondaryButtonClass}
                    >
                      {syncingChatCatalog
                        ? 'Syncing…'
                        : `Sync Chat Catalog (${
                            getMissingChatCatalogSummary(bundle)
                              .missingProductCount
                          })`}
                    </button>
                  )}

                  {pendingProducts.length > 0 && (
                    <button
                      type="button"
                      disabled={batchPublishing || loading}
                      onClick={() => void handlePublishAllPending()}
                      className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-3.5 py-2 transition-colors"
                    >
                      {batchPublishing
                        ? 'Publishing…'
                        : `Publish All Pending (${pendingProducts.length})`}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setCreatingProduct((v) => !v);
                      closeCompanyForm();
                      clearFeedback();
                    }}
                    className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-4 py-2 transition-colors"
                  >
                    {creatingProduct ? 'Close Product Form' : '+ New Product'}
                  </button>
                </div>
              </section>

              {/* Inline Add / Edit Company Form */}
              {creatingCompany && (
                <CompanyEditorForm
                  editingCompany={editingCompany}
                  cities={cities}
                  compName={compName}
                  setCompName={setCompName}
                  compLegalName={compLegalName}
                  setCompLegalName={setCompLegalName}
                  compCityId={compCityId}
                  setCompCityId={setCompCityId}
                  compWebsite={compWebsite}
                  setCompWebsite={setCompWebsite}
                  compEmail={compEmail}
                  setCompEmail={setCompEmail}
                  compPhone={compPhone}
                  setCompPhone={setCompPhone}
                  compDescription={compDescription}
                  setCompDescription={setCompDescription}
                  compBusy={compBusy}
                  onCancel={closeCompanyForm}
                  onSubmit={handleSaveCompany}
                />
              )}

              {/* Inline Admin New Product Creator */}
              {creatingProduct && bundle && (
                <AdminProductEditorForm
                  client={client}
                  bundle={bundle}
                  defaultCompanyId={
                    companyFilterId !== 'all'
                      ? companyFilterId
                      : bundle.companies[0]?.id ?? ''
                  }
                  onCancel={() => setCreatingProduct(false)}
                  onError={(msg, reasons) => setFailure(msg, reasons)}
                  onSaved={async (productId, status, createdTaxonomy) => {
                    setCreatingProduct(false);
                    clearFeedback();
                    const addedMsg =
                      createdTaxonomy && createdTaxonomy.length > 0
                        ? ` Added to the catalog: ${createdTaxonomy.join(', ')}.`
                        : '';
                    setNotice(
                      (status === 'published'
                        ? 'Product created and published to the Official Doctor Catalog.'
                        : `Product saved (${STATUS_LABELS[status]}).`) + addedMsg
                    );
                    await refresh(productId);
                  }}
                />
              )}

              {loading ? (
                <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
                  Loading catalog…
                </div>
              ) : companyFilterId === 'all' ? (
                /* Step 1: Single Button per Company (e.g., AstraZeneca) */
                <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4">
                  <div className="text-xs text-[#B8C3CC]">
                    Press a company button to open its drugs page:
                  </div>
                  {(bundle?.companies.length ?? 0) === 0 ? (
                    <div className="text-sm text-[#B8C3CC] py-6 text-center">
                      No companies in the catalog yet.
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-3">
                      {(bundle?.companies ?? []).map((comp) => {
                        const compDrugCount = (bundle?.products ?? []).filter(
                          (p) => p.companyId === comp.id
                        ).length;
                        return (
                          <button
                            key={comp.id}
                            type="button"
                            onClick={() => {
                              setCompanyFilterId(comp.id);
                              setSelectedId(null);
                              clearFeedback();
                            }}
                            className="inline-flex items-center gap-3 rounded-lg bg-[#1769AA] hover:bg-[#1E78BA] border border-[#5DB4F2] px-5 py-3 text-sm font-semibold text-white transition-colors"
                          >
                            <span>{comp.companyName}</span>
                            <span className="rounded bg-[#1F2D38]/60 px-2 py-0.5 text-xs font-mono text-[#F2F5F8]">
                              {compDrugCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Company Page Header + Status Filter Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#263744] border border-[#304451] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyFilterId('all');
                          setSelectedId(null);
                          clearFeedback();
                        }}
                        className={secondaryButtonClass}
                      >
                        ← Back
                      </button>
                      <h2 className="text-base font-semibold text-[#F2F5F8]">
                        {bundle?.companies.find((c) => c.id === companyFilterId)
                          ?.companyName ?? 'Company'}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(
                        [
                          'all',
                          'published',
                          'submitted',
                          'draft',
                          'changes_requested',
                          'hidden',
                        ] as const
                      ).map((st) => {
                        const active = statusFilter === st;
                        const baseList = (bundle?.products ?? []).filter(
                          (p) => p.companyId === companyFilterId
                        );
                        const count =
                          st === 'all'
                            ? baseList.length
                            : baseList.filter((p) => p.status === st).length;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              setStatusFilter(st);
                              setSelectedId(null);
                              clearFeedback();
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                              active
                                ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                                : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                            }`}
                          >
                            {st === 'all' ? 'All' : STATUS_LABELS[st]}{' '}
                            <span className="font-mono tabular-nums opacity-75">
                              ({count})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Drug Names List vs Step 3: Opened Drug Details */}
                  {filteredProducts.length === 0 ? (
                    <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center space-y-3">
                      <h2 className="text-base font-medium text-[#F2F5F8]">
                        No drugs found for this filter
                      </h2>
                      <p className="text-xs text-[#B8C3CC] max-w-md mx-auto">
                        Click "+ New Product" to add a drug.
                      </p>
                    </div>
                  ) : selectedProduct && bundle ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#263744] border border-[#304451] px-4 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(null);
                            clearFeedback();
                          }}
                          className={secondaryButtonClass}
                        >
                          ← Back to {selectedProduct.companyName} Drugs (
                          {filteredProducts.length})
                        </button>
                        <div className="text-xs text-[#B8C3CC]">
                          <span className="text-[#5DB4F2] font-medium">
                            {selectedProduct.companyName}
                          </span>{' '}
                          · {selectedProduct.drugClassNameEn}
                        </div>
                      </div>

                      <AdminProductInspector
                        key={
                          selectedProduct.id + ':' + selectedProduct.updatedAt
                        }
                        client={client}
                        product={selectedProduct}
                        bundle={bundle}
                        onError={(msg, reasons) => setFailure(msg, reasons)}
                        onSuccess={async (msg) => {
                          clearFeedback();
                          setNotice(msg);
                          await refresh(selectedProduct.id);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-xs text-[#B8C3CC] px-1">
                        Click any drug name below to open its full clinical
                        information and controls.
                      </div>
                      {productsByDrugClass.map(([className, classProducts]) => (
                        <div
                          key={className}
                          className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-[#304451] pb-2">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5DB4F2]">
                              {className}
                            </h3>
                            <span className="text-xs font-mono text-[#B8C3CC]">
                              {classProducts.length} drug
                              {classProducts.length === 1 ? '' : 's'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            {classProducts.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                onClick={() => {
                                  setSelectedId(product.id);
                                  clearFeedback();
                                }}
                                className="flex items-center justify-between gap-2 rounded-lg bg-[#1F2D38] hover:bg-[#1769AA]/25 border border-[#304451] hover:border-[#5DB4F2] px-3.5 py-2.5 text-left transition-colors"
                              >
                                <span className="text-sm font-medium text-[#F2F5F8] truncate">
                                  {product.brandNameEn}
                                </span>
                                <StatusText status={product.status} />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}

interface CompanyFormProps {
  editingCompany: CompanySummary | null;
  cities: Option[];
  compName: string;
  setCompName: (v: string) => void;
  compLegalName: string;
  setCompLegalName: (v: string) => void;
  compCityId: string;
  setCompCityId: (v: string) => void;
  compWebsite: string;
  setCompWebsite: (v: string) => void;
  compEmail: string;
  setCompEmail: (v: string) => void;
  compPhone: string;
  setCompPhone: (v: string) => void;
  compDescription: string;
  setCompDescription: (v: string) => void;
  compBusy: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

function CompanyEditorForm({
  editingCompany,
  cities,
  compName,
  setCompName,
  compLegalName,
  setCompLegalName,
  compCityId,
  setCompCityId,
  compWebsite,
  setCompWebsite,
  compEmail,
  setCompEmail,
  compPhone,
  setCompPhone,
  compDescription,
  setCompDescription,
  compBusy,
  onCancel,
  onSubmit,
}: CompanyFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4"
    >
      <h3 className="text-sm font-semibold text-[#F2F5F8]">
        {editingCompany
          ? `Edit Company: ${editingCompany.companyName}`
          : 'Add Company'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Field label="Company Name">
          <input
            type="text"
            required
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Legal Name">
          <input
            type="text"
            required
            value={compLegalName}
            onChange={(e) => setCompLegalName(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="City (optional)">
          <select
            value={compCityId}
            onChange={(e) => setCompCityId(e.target.value)}
            className={inputClass}
          >
            <option value="">All / Unspecified</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Website URL (optional, https://...)">
          <input
            type="url"
            value={compWebsite}
            onChange={(e) => setCompWebsite(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contact Email (optional)">
          <input
            type="email"
            value={compEmail}
            onChange={(e) => setCompEmail(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contact Phone (optional)">
          <input
            type="text"
            value={compPhone}
            onChange={(e) => setCompPhone(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2 md:col-span-3">
          <Field label="Description (optional)">
            <input
              type="text"
              value={compDescription}
              onChange={(e) => setCompDescription(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={onCancel}
        >
          Cancel
        </button>
        <div className="w-48">
          <button type="submit" disabled={compBusy} className={buttonClass}>
            {compBusy
              ? 'Saving…'
              : editingCompany
              ? 'Update Company'
              : 'Save Company'}
          </button>
        </div>
      </div>
    </form>
  );
}

interface EditorFormProps {
  client: SupabaseClient;
  bundle: CatalogBundle;
  defaultCompanyId: string;
  existingProduct?: CatalogProduct | null;
  onCancel: () => void;
  onError: (msg: string, reasons?: string[]) => void;
  onSaved: (
    productId: string,
    finalStatus: ProductStatus,
    createdTaxonomy?: string[]
  ) => Promise<void>;
}

function AdminProductEditorForm({
  client,
  bundle,
  defaultCompanyId,
  existingProduct,
  onCancel,
  onError,
  onSaved,
}: EditorFormProps) {
  const enClinical = existingProduct?.marketTranslations.en;

  const [companyId, setCompanyId] = useState(
    existingProduct?.companyId ?? defaultCompanyId
  );
  const [brandNameEn, setBrandNameEn] = useState(
    existingProduct?.brandNameEn ?? ''
  );
  const [brandNameAr, setBrandNameAr] = useState<string | null>(null);
  const [category, setCategory] = useState<ProductCategory>(
    existingProduct?.category ?? 'prescription_drug'
  );
  const [drugClassId, setDrugClassId] = useState(
    existingProduct?.drugClassId ?? bundle.drugClasses[0]?.id ?? ''
  );
  const [genericDrugId, setGenericDrugId] = useState(
    existingProduct?.genericDrugId ?? bundle.genericDrugs[0]?.id ?? ''
  );

  // Single-product AI Draft state
  const [aiProductName, setAiProductName] = useState(
    existingProduct?.brandNameEn ?? ''
  );
  const [aiExtraContext, setAiExtraContext] = useState('');
  const [aiDrafting, setAiDrafting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiDraftProductResponse | null>(null);
  const [storedAiDraft, setStoredAiDraft] =
    useState<StoredProductAiDraft | null>(null);
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [newDrugClassName, setNewDrugClassName] = useState<string | null>(null);
  const [newGenericName, setNewGenericName] = useState<string | null>(null);
  const [newSpecialtyNames, setNewSpecialtyNames] = useState<string[]>([]);

  const [strength, setStrength] = useState(
    existingProduct?.market?.strength ?? ''
  );
  const [dosageForm, setDosageForm] = useState(
    existingProduct?.market?.dosageForm ?? ''
  );
  const [route, setRoute] = useState(existingProduct?.market?.route ?? '');
  const [packSize, setPackSize] = useState(
    existingProduct?.market?.packSize ?? ''
  );
  const [marketStatus, setMarketStatus] = useState<IraqMarketStatus>(
    existingProduct?.market?.marketStatus ?? 'marketed_in_iraq'
  );
  const [registrationStatus, setRegistrationStatus] =
    useState<ProductRegistrationStatus>(
      existingProduct?.market?.registrationStatus ?? 'not_recorded'
    );
  const [registrationNumber, setRegistrationNumber] = useState(
    existingProduct?.market?.registrationNumber ?? ''
  );
  const [registrationAuthority, setRegistrationAuthority] = useState(
    existingProduct?.market?.registrationAuthority ?? ''
  );
  const [registrationExpiresOn, setRegistrationExpiresOn] = useState(
    existingProduct?.market?.registrationExpiresOn ?? ''
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
    existingProduct?.specialtyIds ?? []
  );

  const [busy, setBusy] = useState(false);

  // Load stored product_ai_drafts record when editing an existing product
  useEffect(() => {
    if (!existingProduct?.id) return;
    let active = true;
    void loadProductAiDraft(client, existingProduct.id).then((row) => {
      if (!active || !row) return;
      setStoredAiDraft(row);
      const d = row.draft;
      if (d.strength) setStrength((prev) => prev || d.strength);
      if (d.dosageForm) setDosageForm((prev) => prev || d.dosageForm);
      if (d.route) setRoute((prev) => prev || d.route);
      if (d.packSize) setPackSize((prev) => prev || d.packSize);
      if (d.clinical?.approvedIndications) {
        setApprovedIndications((prev) => prev || d.clinical.approvedIndications);
      }
      if (d.clinical?.usualAdultDose) {
        setUsualAdultDose((prev) => prev || d.clinical.usualAdultDose);
      }
      if (d.clinical?.contraindications) {
        setContraindications((prev) => prev || d.clinical.contraindications);
      }
      if (d.clinical?.commonAdverseEffects) {
        setCommonAdverseEffects(
          (prev) => prev || d.clinical.commonAdverseEffects
        );
      }
      if (d.clinical?.storageConditions) {
        setStorageConditions((prev) => prev || d.clinical.storageConditions);
      }
    });
    return () => {
      active = false;
    };
  }, [client, existingProduct?.id]);

  const selectedCompany = useMemo(
    () => bundle.companies.find((c) => c.id === companyId) ?? null,
    [bundle.companies, companyId]
  );

  const combinedSources = useMemo(() => {
    const rawList = aiResult
      ? [
          ...(aiResult.draft.sources ?? []),
          ...(aiResult.groundingSources ?? []),
        ]
      : storedAiDraft
      ? [
          ...(storedAiDraft.sources ?? []),
          ...(storedAiDraft.draft.sources ?? []),
        ]
      : [];
    const seen = new Set<string>();
    const list: Array<{ title: string; url: string }> = [];
    for (const s of rawList) {
      const url = s?.url?.trim();
      if (!url || !/^https?:\/\//i.test(url) || seen.has(url)) continue;
      seen.add(url);
      list.push({ title: s.title?.trim() || url, url });
    }
    return list;
  }, [aiResult, storedAiDraft]);

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAiDraft = async () => {
    if (!selectedCompany) {
      const msg = 'Please select a company first.';
      setAiError(msg);
      onError(msg);
      return;
    }
    const queryName = aiProductName.trim() || brandNameEn.trim();
    if (!queryName) {
      const msg = 'Product name is required (e.g. "Forxiga 10 mg tablets").';
      setAiError(msg);
      onError(msg);
      return;
    }

    setAiDrafting(true);
    setAiError(null);
    setAiResult(null);

    const res = await invokeAiDraftProduct(client, {
      productName: queryName,
      companyName: selectedCompany.companyName,
      extraContext: aiExtraContext,
    });

    setAiDrafting(false);

    if (!res.ok) {
      setAiError(res.message);
      onError(res.message);
      return;
    }

    const data = res.data;
    setAiResult(data);
    const { draft } = data;

    if (!draft.found) {
      return;
    }

    // Fill form fields from draft (do NOT save, do NOT touch registration or marketStatus)
    setBrandNameEn(draft.brandName ?? '');
    setBrandNameAr(draft.brandNameAr?.trim() ? draft.brandNameAr.trim() : null);

    const nextCategory: ProductCategory =
      draft.category === 'prescription_drug' ||
      draft.category === 'otc_drug' ||
      draft.category === 'dietary_supplement'
        ? draft.category
        : category;
    setCategory(nextCategory);

    setStrength(draft.strength ?? '');
    setDosageForm(draft.dosageForm ?? '');
    setRoute(draft.route ?? '');
    setPackSize(draft.packSize ?? '');

    setApprovedIndications(draft.clinical?.approvedIndications ?? '');
    setUsualAdultDose(draft.clinical?.usualAdultDose ?? '');
    setContraindications(draft.clinical?.contraindications ?? '');
    setCommonAdverseEffects(draft.clinical?.commonAdverseEffects ?? '');
    setStorageConditions(draft.clinical?.storageConditions ?? '');

    setActiveIngredients(
      Array.isArray(draft.activeIngredients)
        ? draft.activeIngredients.map((s) => s.trim()).filter(Boolean)
        : []
    );

    if (draft.drugClass && draft.drugClass.trim()) {
      const matchedClass = findMatchingTaxonomyOption(
        bundle.drugClasses,
        draft.drugClass
      );
      if (matchedClass) {
        setDrugClassId(matchedClass.id);
        setNewDrugClassName(null);
      } else {
        setNewDrugClassName(draft.drugClass.trim());
      }
    } else {
      setNewDrugClassName(null);
    }

    if (nextCategory === 'dietary_supplement' && !draft.genericName?.trim()) {
      setGenericDrugId('');
      setNewGenericName(null);
    } else if (draft.genericName && draft.genericName.trim()) {
      const matchedGeneric = findMatchingTaxonomyOption(
        bundle.genericDrugs,
        draft.genericName
      );
      if (matchedGeneric) {
        setGenericDrugId(matchedGeneric.id);
        setNewGenericName(null);
      } else {
        setNewGenericName(draft.genericName.trim());
      }
    } else {
      setNewGenericName(null);
    }

    const matchedSpecIds: string[] = [];
    const unmatchedSpecs: string[] = [];
    for (const rawSpec of draft.specialties ?? []) {
      const trimmed = rawSpec?.trim();
      if (!trimmed) continue;
      const matchedSpec = findMatchingTaxonomyOption(
        bundle.specialties,
        trimmed
      );
      if (matchedSpec) {
        if (!matchedSpecIds.includes(matchedSpec.id)) {
          matchedSpecIds.push(matchedSpec.id);
        }
      } else if (
        !unmatchedSpecs.some((s) => s.toLowerCase() === trimmed.toLowerCase())
      ) {
        unmatchedSpecs.push(trimmed);
      }
    }
    setSelectedSpecialties(matchedSpecIds);
    setNewSpecialtyNames(unmatchedSpecs);
  };

  const handleSave = async (publishImmediately: boolean) => {
    if (!companyId) {
      onError('Please select a company first.');
      return;
    }
    const hasDrugClass = Boolean(newDrugClassName?.trim() || drugClassId);
    if (!brandNameEn.trim() || !hasDrugClass) {
      onError('English brand name and drug class are required.');
      return;
    }

    setBusy(true);

    let resolvedDrugClassId = drugClassId;
    let resolvedGenericDrugId: string | null =
      category === 'dietary_supplement' && !genericDrugId
        ? null
        : genericDrugId;
    const createdTaxonomy: string[] = [];

    const needsEnsureGenericOrClass =
      Boolean(newDrugClassName?.trim()) ||
      (category !== 'dietary_supplement' && Boolean(newGenericName?.trim()));

    if (needsEnsureGenericOrClass) {
      const drugClassNameForRpc =
        newDrugClassName?.trim() ||
        bundle.drugClasses.find((dc) => dc.id === drugClassId)?.nameEn ||
        '';
      const genericNameForRpc =
        category === 'dietary_supplement'
          ? null
          : newGenericName?.trim() ||
            bundle.genericDrugs.find((gd) => gd.id === genericDrugId)?.nameEn ||
            null;

      const taxRes = await rpcAdminEnsureGenericDrug(client, {
        drugClassName: drugClassNameForRpc,
        genericName: genericNameForRpc,
        ingredientNames:
          activeIngredients.length > 0 ? activeIngredients : null,
      });

      if (!taxRes.ok) {
        setBusy(false);
        onError(taxRes.message);
        return;
      }

      resolvedDrugClassId = taxRes.data.drugClassId;
      resolvedGenericDrugId =
        category === 'dietary_supplement'
          ? null
          : taxRes.data.genericDrugId ?? resolvedGenericDrugId;
      createdTaxonomy.push(...taxRes.data.created);
    }

    const resolvedSpecialtyIds = [...selectedSpecialties];
    if (newSpecialtyNames.length > 0) {
      const specRes = await rpcAdminEnsureSpecialties(
        client,
        newSpecialtyNames
      );
      if (!specRes.ok) {
        setBusy(false);
        onError(specRes.message);
        return;
      }
      for (const s of specRes.data) {
        if (!resolvedSpecialtyIds.includes(s.specialtyId)) {
          resolvedSpecialtyIds.push(s.specialtyId);
        }
        if (s.created) {
          createdTaxonomy.push(`specialty: ${s.name}`);
        }
      }
    }

    const res = await saveAndPublishCompleteProduct(client, {
      existingProduct,
      companyId,
      brandNameEn,
      brandNameAr,
      category,
      drugClassId: resolvedDrugClassId,
      genericDrugId: resolvedGenericDrugId,
      strength,
      dosageForm,
      route,
      packSize,
      marketStatus,
      registrationStatus,
      registrationNumber,
      registrationAuthority,
      registrationExpiresOn,
      approvedIndications,
      usualAdultDose,
      contraindications,
      commonAdverseEffects,
      storageConditions,
      specialtyIds: resolvedSpecialtyIds,
      publishImmediately,
    });
    setBusy(false);

    if (!res.ok) {
      onError(res.message, res.reasons);
      return;
    }

    await onSaved(res.data.productId, res.data.finalStatus, createdTaxonomy);
  };

  const activeDraftNotes =
    aiResult?.draft.notes ?? storedAiDraft?.draft.notes ?? null;
  const activeDraftWarnings = aiResult?.warnings ?? [];

  return (
    <section className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#304451] pb-4">
        <div>
          <h2 className="text-base font-semibold text-[#F2F5F8]">
            {existingProduct
              ? `Edit Product: ${existingProduct.brandNameEn}`
              : 'Add Company Product'}
          </h2>
          <p className="text-xs text-[#B8C3CC] mt-0.5">
            {existingProduct?.status === 'published'
              ? 'Saving changes temporarily hides this product from doctors until it is republished.'
              : 'Enter product details, clinical information, and specialties.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className={secondaryButtonClass}
        >
          Cancel
        </button>
      </div>

      {/* Single-Product AI Draft Box */}
      <div className="rounded-xl bg-[#1F2D38] border border-[#304451] p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5DB4F2]">
              AI Draft from Official Sources
            </h3>
            <p className="text-xs text-[#B8C3CC] mt-0.5">
              Company:{' '}
              <span className="text-[#F2F5F8] font-medium">
                {selectedCompany?.companyName ?? 'Select a company below'}
              </span>{' '}
              — AI drafts the fields; check and save when ready.
            </p>
          </div>
          <button
            type="button"
            disabled={aiDrafting || busy || !aiProductName.trim() || !companyId}
            onClick={() => void handleAiDraft()}
            className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            {aiDrafting ? 'Drafting…' : 'AI draft'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Product name">
            <input
              type="text"
              placeholder="e.g. Forxiga 10 mg tablets"
              value={aiProductName}
              onChange={(e) => setAiProductName(e.target.value)}
              disabled={aiDrafting}
              className={inputClass}
            />
          </Field>
          <Field label="Paste leaflet text (optional)">
            <textarea
              rows={2}
              placeholder="Optional excerpt from official package leaflet or SmPC…"
              value={aiExtraContext}
              onChange={(e) => setAiExtraContext(e.target.value)}
              disabled={aiDrafting}
              className={inputClass}
            />
          </Field>
        </div>

        {aiDrafting && (
          <p className="text-xs text-[#F59E0B] font-medium">
            Researching official sources… this can take up to 2 minutes
          </p>
        )}

        {aiError && <Banner tone="error">{aiError}</Banner>}

        {aiResult && !aiResult.draft.found && (
          <Banner tone="warn">
            <div className="space-y-2">
              <div className="font-semibold text-[#F2F5F8]">
                Official product labeling was not found
              </div>
              {aiResult.draft.notes && (
                <p className="text-xs text-[#F2F5F8]">{aiResult.draft.notes}</p>
              )}
              {aiResult.warnings.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-xs text-[#B8C3CC]">
                  {aiResult.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          </Banner>
        )}

        {((aiResult && aiResult.draft.found) || storedAiDraft) && (
          <div className="rounded-lg border border-[#F59E0B]/60 bg-[#F59E0B]/10 p-4 space-y-3 text-xs">
            <div className="font-semibold text-[#F59E0B]">
              AI draft — check every field against the sources before publishing
            </div>

            {activeDraftNotes && (
              <p className="text-[#F2F5F8]">{activeDraftNotes}</p>
            )}

            {activeDraftWarnings.length > 0 && (
              <div className="space-y-1">
                <div className="font-medium text-[#F2F5F8]">
                  Checklist before publishing:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#B8C3CC]">
                  {activeDraftWarnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {combinedSources.length > 0 && (
              <div className="space-y-1">
                <div className="font-medium text-[#F2F5F8]">Sources:</div>
                <ul className="list-disc list-inside space-y-1">
                  {combinedSources.map((src) => (
                    <li key={src.url}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5DB4F2] hover:underline break-all"
                      >
                        {src.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiResult?.searchSuggestionsHtml && (
              <div className="pt-1">
                <iframe
                  title="Google Search suggestions"
                  sandbox="allow-popups allow-popups-to-escape-sandbox"
                  srcDoc={aiResult.searchSuggestionsHtml}
                  className="w-full h-14 rounded border border-[#304451] bg-[#1F2D38]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!existingProduct && (
          <Field label="Company">
            <select
              required
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className={inputClass}
            >
              <option value="">Select company</option>
              {bundle.companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Brand / Trade Name (EN)">
          <input
            type="text"
            required
            value={brandNameEn}
            onChange={(e) => setBrandNameEn(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className={inputClass}
          >
            {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </Field>

        <div>
          <Field label="Drug Class">
            <select
              required={!newDrugClassName}
              value={drugClassId}
              onChange={(e) => {
                setDrugClassId(e.target.value);
                setNewDrugClassName(null);
              }}
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
          {newDrugClassName && (
            <div className="mt-1.5 flex items-center justify-between gap-2 rounded-md bg-[#1F2D38] border border-[#5DB4F2]/50 px-2.5 py-1.5 text-xs text-[#F2F5F8]">
              <span>New: {newDrugClassName} (added when you save)</span>
              <button
                type="button"
                onClick={() => setNewDrugClassName(null)}
                aria-label={`Remove new drug class ${newDrugClassName}`}
                className="text-[#B8C3CC] hover:text-white font-semibold px-1"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <Field
            label={
              category === 'dietary_supplement'
                ? 'Generic / Scientific Name (optional)'
                : 'Generic / Scientific Name'
            }
          >
            <select
              required={category !== 'dietary_supplement' && !newGenericName}
              value={genericDrugId}
              onChange={(e) => {
                setGenericDrugId(e.target.value);
                setNewGenericName(null);
              }}
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
          {newGenericName && (
            <div className="mt-1.5 flex items-center justify-between gap-2 rounded-md bg-[#1F2D38] border border-[#5DB4F2]/50 px-2.5 py-1.5 text-xs text-[#F2F5F8]">
              <span>New: {newGenericName} (added when you save)</span>
              <button
                type="button"
                onClick={() => setNewGenericName(null)}
                aria-label={`Remove new generic drug ${newGenericName}`}
                className="text-[#B8C3CC] hover:text-white font-semibold px-1"
              >
                ×
              </button>
            </div>
          )}
        </div>

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

        <Field label="Iraq Market Status">
          <select
            value={marketStatus}
            onChange={(e) =>
              setMarketStatus(e.target.value as IraqMarketStatus)
            }
            className={inputClass}
          >
            {(Object.keys(MARKET_STATUS_LABELS) as IraqMarketStatus[]).map(
              (ms) => (
                <option key={ms} value={ms}>
                  {MARKET_STATUS_LABELS[ms]}
                </option>
              )
            )}
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
            <Field label="Registration Expiry">
              <input
                type="date"
                value={registrationExpiresOn}
                onChange={(e) => setRegistrationExpiresOn(e.target.value)}
                className={inputClass}
              />
            </Field>
          </>
        )}
      </div>

      {/* Clinical Monograph Fields */}
      <div className="border-t border-[#304451] pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Approved Indications (EN)">
          <textarea
            rows={2}
            value={approvedIndications}
            onChange={(e) => setApprovedIndications(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Usual Adult Dose (EN)">
          <textarea
            rows={2}
            value={usualAdultDose}
            onChange={(e) => setUsualAdultDose(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contraindications (EN)">
          <textarea
            rows={2}
            value={contraindications}
            onChange={(e) => setContraindications(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Common Adverse Effects (EN)">
          <textarea
            rows={2}
            value={commonAdverseEffects}
            onChange={(e) => setCommonAdverseEffects(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Storage Conditions (EN)">
            <input
              type="text"
              value={storageConditions}
              onChange={(e) => setStorageConditions(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Specialties */}
      <div className="border-t border-[#304451] pt-5 space-y-3">
        <div className="text-xs font-medium text-[#B8C3CC]">
          Medical Specialties
        </div>
        {newSpecialtyNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {newSpecialtyNames.map((specName) => (
              <span
                key={specName}
                className="inline-flex items-center gap-2 rounded-md bg-[#1F2D38] border border-[#5DB4F2]/50 px-2.5 py-1.5 text-xs text-[#F2F5F8]"
              >
                <span>New: {specName} (added when you save)</span>
                <button
                  type="button"
                  onClick={() =>
                    setNewSpecialtyNames((prev) =>
                      prev.filter((n) => n !== specName)
                    )
                  }
                  aria-label={`Remove new specialty ${specName}`}
                  className="text-[#B8C3CC] hover:text-white font-semibold px-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#304451] pt-4">
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </button>
        <button
          type="button"
          className={secondaryButtonClass}
          disabled={busy}
          onClick={() => void handleSave(false)}
        >
          {busy ? 'Saving…' : 'Save as Draft'}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void handleSave(true)}
          className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-4 py-2.5 transition-colors"
        >
          {busy ? 'Publishing…' : 'Save & Publish to Doctor Catalog'}
        </button>
      </div>
    </section>
  );
}

interface InspectorProps {
  client: SupabaseClient;
  product: CatalogProduct;
  bundle: CatalogBundle;
  onError: (msg: string, reasons?: string[]) => void;
  onSuccess: (msg: string) => Promise<void>;
}

function AdminProductInspector({
  client,
  product,
  bundle,
  onError,
  onSuccess,
}: InspectorProps) {
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);

  const [changesReason, setChangesReason] = useState('');
  const [hideReason, setHideReason] = useState('');
  const [archiveReason, setArchiveReason] = useState('');
  const [restoreReason, setRestoreReason] = useState('');
  const [restoreDestination, setRestoreDestination] =
    useState<ProductStatus>('published');

  const market = product.market;
  const enClinical = product.marketTranslations.en;

  if (editing) {
    return (
      <AdminProductEditorForm
        client={client}
        bundle={bundle}
        defaultCompanyId={product.companyId}
        existingProduct={product}
        onCancel={() => setEditing(false)}
        onError={onError}
        onSaved={async (_id, status, createdTaxonomy) => {
          setEditing(false);
          const addedMsg =
            createdTaxonomy && createdTaxonomy.length > 0
              ? ` Added to the catalog: ${createdTaxonomy.join(', ')}.`
              : '';
          await onSuccess(
            (status === 'published'
              ? 'Product updated and published to the Official Doctor Catalog.'
              : `Product updated (${STATUS_LABELS[status]}).`) + addedMsg
          );
        }}
      />
    );
  }

  const handlePublish = async () => {
    setBusy(true);
    const res = await publishProduct(client, product);
    setBusy(false);
    if (!res.ok) {
      onError(res.message, res.reasons);
      return;
    }
    await onSuccess('Product published to the Official Doctor Catalog.');
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
      onError(res.message, res.reasons);
      return;
    }
    setChangesReason('');
    await onSuccess('Product returned for changes.');
  };

  const handleHide = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await rpcAdminHideProduct(client, product.id, hideReason);
    setBusy(false);
    if (!res.ok) {
      onError(res.message, res.reasons);
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
      onError(res.message, res.reasons);
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
      onError(res.message, res.reasons);
      return;
    }
    setRestoreReason('');
    await onSuccess(`Product restored to ${STATUS_LABELS[restoreDestination]}.`);
  };

  const showAiDraftCheck =
    product.hasAiDraft &&
    (product.status === 'draft' || product.status === 'changes_requested');

  return (
    <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#304451] pb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <StatusText status={product.status} />
            {showAiDraftCheck && (
              <span className="rounded bg-[#F59E0B]/20 border border-[#F59E0B] px-2 py-0.5 text-xs font-medium text-[#F59E0B]">
                AI draft — check
              </span>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-[#F2F5F8] mt-1">
            {product.brandNameEn}
          </h2>
          <div className="text-xs text-[#5DB4F2] mt-1">
            {product.companyName}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={secondaryButtonClass}
          >
            Edit Product Details
          </button>
          {product.status !== 'published' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => void handlePublish()}
              className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
            >
              {busy ? 'Publishing…' : 'Publish to Doctor Catalog'}
            </button>
          )}
        </div>
      </div>

      {product.reviewReason && (
        <Banner tone="warn">
          <span className="font-medium">Review reason:</span>{' '}
          {product.reviewReason}
        </Banner>
      )}

      {/* Administrator Lifecycle Actions */}
      <div className="space-y-4">
        {product.status === 'submitted' && (
          <form
            onSubmit={handleRequestChanges}
            className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-3"
          >
            <Field label="Reason for requesting changes">
              <input
                type="text"
                required
                value={changesReason}
                onChange={(e) => setChangesReason(e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={busy || !changesReason.trim()}
                className={secondaryButtonClass}
              >
                Request changes
              </button>
            </div>
          </form>
        )}

        {product.status === 'published' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form
              onSubmit={handleHide}
              className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-3"
            >
              <Field label="Reason for hiding">
                <input
                  type="text"
                  required
                  value={hideReason}
                  onChange={(e) => setHideReason(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy || !hideReason.trim()}
                  className={secondaryButtonClass}
                >
                  Hide product
                </button>
              </div>
            </form>

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
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={busy || !archiveReason.trim()}
                  className="rounded-md bg-[#B42318] hover:bg-[#991B1B] disabled:opacity-50 text-white text-xs font-medium px-3.5 py-2"
                >
                  Archive product
                </button>
              </div>
            </form>
          </div>
        )}

        {(product.status === 'hidden' || product.status === 'archived') && (
          <div className="space-y-4">
            <form
              onSubmit={handleRestore}
              className="rounded-lg bg-[#1F2D38] border border-[#304451] p-4 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Destination Status">
                  <select
                    value={restoreDestination}
                    onChange={(e) =>
                      setRestoreDestination(e.target.value as ProductStatus)
                    }
                    className={inputClass}
                  >
                    <option value="published">Published</option>
                    <option value="changes_requested">Changes Requested</option>
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                  </select>
                </Field>
                <Field label="Reason for restoring">
                  <input
                    type="text"
                    required
                    value={restoreReason}
                    onChange={(e) => setRestoreReason(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="flex justify-end">
                <div className="w-44">
                  <button
                    type="submit"
                    className={buttonClass}
                    disabled={busy || !restoreReason.trim()}
                  >
                    Restore product
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Product Specification Summary */}
      <div className="border-t border-[#304451] pt-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
          <InspectCell label="Brand Name" value={product.brandNameEn} />
          <InspectCell label="Company" value={product.companyName} />
          <InspectCell
            label="Category"
            value={CATEGORY_LABELS[product.category]}
          />
          <InspectCell
            label="Generic Drug"
            value={product.genericNameEn ?? '—'}
          />
          <InspectCell label="Drug Class" value={product.drugClassNameEn} />
          <InspectCell
            label="Specialties"
            value={
              product.specialtyNamesEn.length > 0
                ? product.specialtyNamesEn.join(', ')
                : '—'
            }
          />
          {market && (
            <>
              <InspectCell label="Strength" value={market.strength} mono />
              <InspectCell label="Dosage Form" value={market.dosageForm} />
              <InspectCell label="Route" value={market.route} />
              <InspectCell label="Pack Size" value={market.packSize} mono />
              <InspectCell
                label="Market Status"
                value={MARKET_STATUS_LABELS[market.marketStatus]}
              />
              <InspectCell
                label="Registration Status"
                value={REGISTRATION_STATUS_LABELS[market.registrationStatus]}
              />
              <InspectCell
                label="Registration Number"
                value={market.registrationNumber ?? '—'}
                mono
              />
              <InspectCell
                label="Registration Authority"
                value={market.registrationAuthority ?? '—'}
              />
              <InspectCell
                label="Registration Expiry"
                value={market.registrationExpiresOn ?? '—'}
                mono
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
              <span className="text-xs text-[#B8C3CC] block">Indications</span>
              <p className="text-[#F2F5F8] mt-0.5">
                {enClinical.approvedIndications}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#B8C3CC] block">Adult Dose</span>
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
                Adverse Effects
              </span>
              <p className="text-[#F2F5F8] mt-0.5">
                {enClinical.commonAdverseEffects}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#B8C3CC] block">Storage</span>
              <p className="text-[#F2F5F8] mt-0.5">
                {enClinical.storageConditions}
              </p>
            </div>
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
    <div className="border-b border-[#304451]/60 pb-3">
      <div className="text-xs text-[#B8C3CC]">{label}</div>
      <div
        className={`text-sm mt-1 text-[#F2F5F8] ${
          mono ? 'font-mono tabular-nums' : 'font-medium'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessResult } from '../lib/access';
import {
  CATEGORY_LABELS,
  MARKET_STATUS_LABELS,
  STATUS_LABELS,
  classifyDrugTherapeuticGroup,
  cleanDrugClassLabel,
  extractAiDraftSources,
  filterReviewDraftProducts,
  findMatchingTaxonomyOption,
  findNextCompanyWithDrafts,
  getCompanyProductCounts,
  getProductSourceWarning,
  getReviewDraftSourceCounts,
  groupProductsByTherapeuticClass,
  invokeAiDraftProduct,
  loadAdminSponsoredAdStats,
  loadAdminSponsoredAds,
  loadAdminTopSearches,
  loadAdminTopViewedProducts,
  loadCatalogBundle,
  loadCompanyAiDraftSources,
  loadProductAiDraft,
  publishArchivedProducts,
  publishCheckedProducts,
  rpcAdminArchiveCompany,
  rpcAdminArchiveProduct,
  rpcAdminCreateCompany,
  rpcAdminEnsureGenericDrug,
  rpcAdminEnsureSpecialties,
  rpcAdminHideProduct,
  rpcAdminRequestProductChanges,
  rpcAdminRestoreProduct,
  rpcAdminSaveSponsoredAd,
  rpcAdminUpdateCompany,
  saveAndPublishCompleteProduct,
  validateSponsoredAdForm,
  type AdminSponsoredAdStat,
  type AdminTopSearchRow,
  type AdminTopViewedProductRow,
  type AiDraftProductResponse,
  type AiDraftSource,
  type CatalogBundle,
  type CatalogProduct,
  type CompanySummary,
  type IraqMarketStatus,
  type ProductCategory,
  type ProductStatus,
  type PublishCheckedSummary,
  type ReviewDraftSourceFilter,
  type SponsoredAdRecord,
  type StoredProductAiDraft,
  type TherapeuticGroupKey,
} from '../lib/catalog';
import {
  computeUserRegistrationStats,
  listCities,
  listCountries,
  listRegisteredUsers,
  type Option,
  type UserRegistrationStats,
} from '../lib/onboarding';
import AdminApprovals from './AdminApprovals';
import { StatusText } from './CompanyCatalog';
import { CatalogBanner as Banner, SponsoredAdCard } from './DoctorCatalog';
import { NotificationBell } from './NotificationBell';
import { recordAppOpen } from '../lib/notifications';
import { BrandLogo, Field, LegalFooter, buttonClass, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  access: AccessResult;
  onSignOut: () => void;
}

export function AdminCatalogReview({ client, access, onSignOut }: Props) {
  const [adminView, setAdminView] = useState<
    'catalog' | 'companies' | 'ads' | 'usage' | 'approvals'
  >('catalog');
  const [companySubView, setCompanySubView] = useState<
    'drafts' | 'published' | 'archived' | 'other'
  >('drafts');
  const [bundle, setBundle] = useState<CatalogBundle | null>(null);
  const [cities, setCities] = useState<Option[]>([]);
  const [defaultCountryId, setDefaultCountryId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [syncingChatCatalog, setSyncingChatCatalog] = useState(false);
  const [confirmingSyncChatCatalog, setConfirmingSyncChatCatalog] =
    useState(false);
  const [syncProgressText, setSyncProgressText] = useState<string | null>(null);
  const [confirmingRemoveCompanyId, setConfirmingRemoveCompanyId] = useState<
    string | null
  >(null);
  const [removingCompanyId, setRemovingCompanyId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [errorReasons, setErrorReasons] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const [companyFilterId, setCompanyFilterId] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [creatingProduct, setCreatingProduct] = useState(false);
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanySummary | null>(
    null
  );

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
        const finalBundle = res.data;

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
    void recordAppOpen(client);
    void refresh();
  }, [client, refresh]);

  const handleManualSyncChatCatalog = async () => {
    if (!bundle || syncingChatCatalog) return;
    setConfirmingSyncChatCatalog(false);
    clearFeedback();
    setSyncingChatCatalog(true);
    setSyncProgressText('Loading catalog data…');
    try {
      const { clearChatCompanyRemovedFlags, syncChatApprovedCatalog } =
        await import('../lib/chatCatalogData');
      clearChatCompanyRemovedFlags();
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
        setNotice(
          'All chat-approved companies and products are already in the catalog.'
        );
      }
      await refresh();
    } catch (err) {
      setSyncProgressText(null);
      setSyncingChatCatalog(false);
      setFailure(
        err instanceof Error
          ? err.message
          : 'Failed to load chat catalog data.'
      );
    }
  };

  const handleRemoveCompany = async (comp: CompanySummary) => {
    setRemovingCompanyId(comp.id);
    clearFeedback();

    const companyProducts = (bundle?.products ?? []).filter(
      (p) => p.companyId === comp.id && p.status !== 'archived'
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
    setCompanySubView('drafts');
    setNotice(
      wasEditing
        ? `Updated company "${res.data.companyName}".`
        : `Added company "${res.data.companyName}".`
    );
    await refresh();
  };

  const selectedProduct = useMemo(() => {
    if (!selectedId || !bundle) return null;
    return bundle.products.find((p) => p.id === selectedId) ?? null;
  }, [bundle, selectedId]);

  const selectedCompany = useMemo(
    () =>
      bundle?.companies.find((c) => c.id === companyFilterId) ?? null,
    [bundle, companyFilterId]
  );

  const selectedCompanyPublished = useMemo(
    () =>
      sortByBrand(
        (bundle?.products ?? []).filter(
          (p) => p.companyId === companyFilterId && p.status === 'published'
        )
      ),
    [bundle, companyFilterId]
  );

  const selectedCompanyArchived = useMemo(
    () =>
      sortByBrand(
        (bundle?.products ?? []).filter(
          (p) => p.companyId === companyFilterId && p.status === 'archived'
        )
      ),
    [bundle, companyFilterId]
  );

  const selectedCompanyOther = useMemo(
    () =>
      sortByBrand(
        (bundle?.products ?? []).filter(
          (p) =>
            p.companyId === companyFilterId &&
            (p.status === 'submitted' || p.status === 'hidden')
        )
      ),
    [bundle, companyFilterId]
  );

  const selectedCompanyCounts = useMemo(() => {
    if (!bundle || companyFilterId === 'all') {
      return { drafts: 0, published: 0, archived: 0 };
    }
    return getCompanyProductCounts(bundle.products, companyFilterId);
  }, [bundle, companyFilterId]);

  const selectedCompanyDrafts = useMemo(() => {
    if (!bundle || companyFilterId === 'all') return [];
    return bundle.products.filter(
      (p) =>
        p.companyId === companyFilterId &&
        (p.status === 'draft' || p.status === 'changes_requested')
    );
  }, [bundle, companyFilterId]);

  const nextCompanyWithDrafts = useMemo(() => {
    if (!bundle || companyFilterId === 'all') return null;
    return findNextCompanyWithDrafts(
      bundle.companies,
      bundle.products,
      companyFilterId
    );
  }, [bundle, companyFilterId]);

  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 max-w-full">
            <BrandLogo />
            <span className="h-4 w-px bg-[#304451]" />
            <div className="flex items-center rounded-lg bg-[#1F2D38] border border-[#304451] p-0.5 min-w-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('catalog');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
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
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
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
                  setAdminView('ads');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  adminView === 'ads'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Sponsored ads
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('usage');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  adminView === 'usage'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Usage
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setAdminView('approvals');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  adminView === 'approvals'
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Users & Registrations
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#B8C3CC] hidden md:inline">
              {access.email}
            </span>
            <NotificationBell client={client} profileId={access.profileId} />
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
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

        {adminView === 'approvals' ? (
          <AdminApprovals
            client={client}
            email={access.email}
            onSignOut={onSignOut}
            embedded
          />
        ) : adminView === 'ads' ? (
          <AdminSponsoredAdsView
            client={client}
            bundle={bundle}
            onNotice={(msg) => {
              clearFeedback();
              setNotice(msg);
            }}
            onError={(msg) => setFailure(msg)}
          />
        ) : adminView === 'usage' ? (
          <AdminUsageStatsView
            client={client}
            onError={(msg) => setFailure(msg)}
            onOpenUsersMonitor={() => {
              setSelectedId(null);
              setAdminView('approvals');
            }}
          />
        ) : adminView === 'companies' ? (
            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#263744] border border-[#304451] p-5">
                <div>
                  <h1 className="text-base font-semibold text-[#F2F5F8]">
                    Companies ({bundle?.companies.length ?? 0})
                  </h1>
                  <p className="text-xs text-[#B8C3CC] mt-0.5">
                    Manage pharmaceutical companies and review their drafts.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  {confirmingSyncChatCatalog ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={syncingChatCatalog || loading}
                        onClick={() => void handleManualSyncChatCatalog()}
                        className="rounded-md bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-3 py-2 transition-colors"
                      >
                        Confirm Sync
                      </button>
                      <button
                        type="button"
                        disabled={syncingChatCatalog}
                        onClick={() => setConfirmingSyncChatCatalog(false)}
                        className={secondaryButtonClass}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={syncingChatCatalog || loading}
                      onClick={() => setConfirmingSyncChatCatalog(true)}
                      className={secondaryButtonClass}
                    >
                      {syncingChatCatalog ? 'Syncing…' : 'Sync Chat Catalog'}
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
                    const counts = getCompanyProductCounts(
                      bundle?.products ?? [],
                      comp.id
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
                                  setCompanySubView('drafts');
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
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#B8C3CC] pt-1">
                            <span className="rounded bg-[#1F2D38] border border-[#304451] px-2 py-0.5 tabular-nums">
                              Drafts:{' '}
                              <span className="text-[#F59E0B] font-semibold">
                                {counts.drafts}
                              </span>
                            </span>
                            <span className="rounded bg-[#1F2D38] border border-[#304451] px-2 py-0.5 tabular-nums">
                              Published:{' '}
                              <span className="text-[#38C976] font-semibold">
                                {counts.published}
                              </span>
                            </span>
                            <span className="rounded bg-[#1F2D38] border border-[#304451] px-2 py-0.5 tabular-nums">
                              Archived:{' '}
                              <span className="text-[#F2F5F8] font-semibold">
                                {counts.archived}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#304451]">
                          {isConfirmingRemove ? (
                            <>
                              <span className="text-xs text-[#F59E0B] w-full">
                                Remove {comp.companyName} and archive its
                                products?
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
                                  setCompanySubView('drafts');
                                  setSelectedId(null);
                                  setAdminView('catalog');
                                }}
                                className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-3 py-2 transition-colors"
                              >
                                Open company page
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
              {/* Admin Catalog Toolbar (only on the company list; a company page has its own actions) */}
              {companyFilterId === 'all' && (
              <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#263744] border border-[#304451] p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    aria-label="Filter by company"
                    value={companyFilterId}
                    onChange={(e) => {
                      setCompanyFilterId(e.target.value);
                      setCompanySubView('drafts');
                      setSelectedId(null);
                    }}
                    className={`${inputClass} sm:w-80`}
                  >
                    <option value="all">
                      All Companies ({bundle?.companies.length ?? 0})
                    </option>
                    {(bundle?.companies ?? []).map((c) => {
                      const counts = getCompanyProductCounts(
                        bundle?.products ?? [],
                        c.id
                      );
                      return (
                        <option key={c.id} value={c.id}>
                          {c.companyName} ({counts.drafts} drafts /{' '}
                          {counts.published} pub / {counts.archived} arch)
                        </option>
                      );
                    })}
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
                  {confirmingSyncChatCatalog ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={syncingChatCatalog || loading}
                        onClick={() => void handleManualSyncChatCatalog()}
                        className="rounded-md bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-3 py-2 transition-colors"
                      >
                        Confirm Sync
                      </button>
                      <button
                        type="button"
                        disabled={syncingChatCatalog}
                        onClick={() => setConfirmingSyncChatCatalog(false)}
                        className={secondaryButtonClass}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={syncingChatCatalog || loading}
                      onClick={() => setConfirmingSyncChatCatalog(true)}
                      className={secondaryButtonClass}
                    >
                      {syncingChatCatalog ? 'Syncing…' : 'Sync Chat Catalog'}
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
              )}

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
                      `Product saved (${STATUS_LABELS[status]}).` + addedMsg
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
                /* Step 1: Company Selection Grid with drafts / published / archived counts */
                <div className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4">
                  <div className="text-xs text-[#B8C3CC]">
                    Select a company to review its drafts and manage its
                    products:
                  </div>
                  {(bundle?.companies.length ?? 0) === 0 ? (
                    <div className="text-sm text-[#B8C3CC] py-6 text-center">
                      No companies in the catalog yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(bundle?.companies ?? []).map((comp) => {
                        const counts = getCompanyProductCounts(
                          bundle?.products ?? [],
                          comp.id
                        );
                        return (
                          <button
                            key={comp.id}
                            type="button"
                            onClick={() => {
                              setCompanyFilterId(comp.id);
                              setCompanySubView('drafts');
                              setSelectedId(null);
                              clearFeedback();
                            }}
                            className="flex flex-col justify-between gap-2.5 rounded-lg bg-[#1F2D38] hover:bg-[#1769AA]/25 border border-[#304451] hover:border-[#5DB4F2] p-4 text-left transition-colors"
                          >
                            <div className="font-semibold text-sm text-[#F2F5F8]">
                              {comp.companyName}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs tabular-nums text-[#B8C3CC]">
                              <span>
                                Drafts:{' '}
                                <strong className="text-[#F59E0B]">
                                  {counts.drafts}
                                </strong>
                              </span>
                              <span>·</span>
                              <span>
                                Published:{' '}
                                <strong className="text-[#38C976]">
                                  {counts.published}
                                </strong>
                              </span>
                              <span>·</span>
                              <span>
                                Archived:{' '}
                                <strong className="text-[#F2F5F8]">
                                  {counts.archived}
                                </strong>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Company page: details, then Drafts / Published / Archived tabs */}
                  {selectedCompany && (
                    <section className="rounded-xl bg-[#263744] border border-[#304451] p-5 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <button
                            type="button"
                            onClick={() => {
                              setCompanyFilterId('all');
                              setSelectedId(null);
                              setConfirmingRemoveCompanyId(null);
                              clearFeedback();
                            }}
                            className={secondaryButtonClass}
                          >
                            ← All companies
                          </button>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg font-semibold text-[#F2F5F8]">
                                {selectedCompany.companyName}
                              </h2>
                              <span className="rounded-md bg-[#1F2D38] border border-[#304451] px-2 py-0.5 text-xs font-medium capitalize text-[#B8C3CC]">
                                {selectedCompany.status}
                              </span>
                            </div>
                            {selectedCompany.legalName &&
                              selectedCompany.legalName !==
                                selectedCompany.companyName && (
                                <div className="text-xs text-[#B8C3CC] mt-0.5">
                                  {selectedCompany.legalName}
                                </div>
                              )}
                          </div>
                        </div>

                        {confirmingRemoveCompanyId === selectedCompany.id ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-[#F59E0B]">
                              Remove this company and archive its products?
                            </span>
                            <button
                              type="button"
                              disabled={removingCompanyId === selectedCompany.id}
                              onClick={() =>
                                void handleRemoveCompany(selectedCompany)
                              }
                              className="rounded-md bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-medium px-3 py-2 transition-colors disabled:opacity-50"
                            >
                              {removingCompanyId === selectedCompany.id
                                ? 'Removing…'
                                : 'Confirm remove'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmingRemoveCompanyId(null)}
                              className={secondaryButtonClass}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setCreatingProduct(false);
                                openEditCompanyForm(selectedCompany);
                              }}
                              className={secondaryButtonClass}
                            >
                              Edit company
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                closeCompanyForm();
                                setSelectedId(null);
                                setCreatingProduct((v) => !v);
                                clearFeedback();
                              }}
                              className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-3 py-2 transition-colors"
                            >
                              {creatingProduct ? 'Close drug form' : '+ Add drug'}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmingRemoveCompanyId(selectedCompany.id)
                              }
                              className="rounded-md bg-[#1F2D38] hover:bg-[#B42318] border border-[#304451] text-[#B8C3CC] hover:text-white text-xs font-medium px-3 py-2 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      {selectedCompany.description && (
                        <p className="text-sm text-[#B8C3CC] leading-relaxed">
                          {selectedCompany.description}
                        </p>
                      )}

                      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        {[
                          {
                            label: 'Website',
                            value: selectedCompany.websiteUrl,
                            href: selectedCompany.websiteUrl,
                          },
                          {
                            label: 'Email',
                            value: selectedCompany.contactEmail,
                            href: selectedCompany.contactEmail
                              ? `mailto:${selectedCompany.contactEmail}`
                              : null,
                          },
                          {
                            label: 'Phone',
                            value: selectedCompany.contactPhone,
                            href: null,
                          },
                          {
                            label: 'City',
                            value:
                              cities.find((c) => c.id === selectedCompany.cityId)
                                ?.label ?? null,
                            href: null,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3 py-2 min-w-0"
                          >
                            <dt className="text-xs text-[#B8C3CC]">
                              {item.label}
                            </dt>
                            <dd className="text-[#F2F5F8] truncate">
                              {item.value ? (
                                item.href ? (
                                  <a
                                    href={item.href}
                                    target={
                                      item.label === 'Website'
                                        ? '_blank'
                                        : undefined
                                    }
                                    rel="noreferrer"
                                    className="text-[#5DB4F2] hover:underline"
                                  >
                                    {item.value}
                                  </a>
                                ) : (
                                  item.value
                                )
                              ) : (
                                <span className="text-[#B8C3CC]">Not set</span>
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div
                        role="tablist"
                        aria-label="Company products"
                        className="flex flex-wrap items-center gap-2 border-t border-[#304451] pt-4"
                      >
                        {(
                          [
                            {
                              key: 'drafts' as const,
                              label: 'Drafts',
                              count: selectedCompanyCounts.drafts,
                              tone: 'text-[#F59E0B]',
                            },
                            {
                              key: 'published' as const,
                              label: 'Published',
                              count: selectedCompanyCounts.published,
                              tone: 'text-[#38C976]',
                            },
                            {
                              key: 'archived' as const,
                              label: 'Archived',
                              count: selectedCompanyCounts.archived,
                              tone: 'text-[#F2F5F8]',
                            },
                            ...(selectedCompanyOther.length > 0
                              ? [
                                  {
                                    key: 'other' as const,
                                    label: 'Submitted / hidden',
                                    count: selectedCompanyOther.length,
                                    tone: 'text-[#5DB4F2]',
                                  },
                                ]
                              : []),
                          ]
                        ).map((tab) => {
                          const active = companySubView === tab.key;
                          return (
                            <button
                              key={tab.key}
                              type="button"
                              role="tab"
                              aria-selected={active}
                              onClick={() => {
                                setCompanySubView(tab.key);
                                setSelectedId(null);
                                clearFeedback();
                              }}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                active
                                  ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                                  : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                              }`}
                            >
                              {tab.label}{' '}
                              <span
                                className={`tabular-nums font-semibold ${
                                  active ? 'text-white' : tab.tone
                                }`}
                              >
                                {tab.count}
                              </span>
                            </button>
                          );
                        })}
                        {nextCompanyWithDrafts && (
                          <button
                            type="button"
                            onClick={() => {
                              setCompanyFilterId(nextCompanyWithDrafts.company.id);
                              setCompanySubView('drafts');
                              setSelectedId(null);
                              clearFeedback();
                            }}
                            className="ml-auto text-xs text-[#F59E0B] hover:underline"
                          >
                            Next company with drafts:{' '}
                            {nextCompanyWithDrafts.company.companyName} (
                            {nextCompanyWithDrafts.drafts}) →
                          </button>
                        )}
                      </div>
                    </section>
                  )}

                  {selectedProduct && bundle ? (
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
                          ← Back to the list
                        </button>
                        <div className="text-xs text-[#B8C3CC] truncate">
                          {selectedProduct.brandNameEn} ·{' '}
                          {selectedProduct.drugClassNameEn}
                        </div>
                      </div>

                      <AdminProductInspector
                        key={selectedProduct.id + ':' + selectedProduct.updatedAt}
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
                  ) : companySubView === 'drafts' && bundle ? (
                    <CompanyReviewDraftsView
                      key={companyFilterId}
                      client={client}
                      bundle={bundle}
                      companyId={companyFilterId}
                      draftProducts={selectedCompanyDrafts}
                      onError={(msg, reasons) => setFailure(msg, reasons)}
                      onNotice={(msg) => {
                        setError(null);
                        setErrorReasons([]);
                        setNotice(msg);
                      }}
                      onRefresh={refresh}
                    />
                  ) : (
                    <CompanyProductListView
                      key={companyFilterId + ':' + companySubView}
                      client={client}
                      mode={companySubView === 'drafts' ? 'other' : companySubView}
                      products={
                        companySubView === 'published'
                          ? selectedCompanyPublished
                          : companySubView === 'archived'
                            ? selectedCompanyArchived
                            : selectedCompanyOther
                      }
                      onOpen={(productId) => {
                        setSelectedId(productId);
                        clearFeedback();
                      }}
                      onError={(msg, reasons) => setFailure(msg, reasons)}
                      onRefresh={refresh}
                    />
                  )}
                </>
              )}
            </>
          )}
      </main>
      <LegalFooter />
    </div>
  );
}

function sortByBrand(products: CatalogProduct[]): CatalogProduct[] {
  return [...products].sort((a, b) =>
    a.brandNameEn.localeCompare(b.brandNameEn, 'en', { sensitivity: 'base' })
  );
}

interface CompanyProductListViewProps {
  client: SupabaseClient;
  mode: 'published' | 'archived' | 'other';
  products: CatalogProduct[];
  onOpen: (productId: string) => void;
  onError: (msg: string, reasons?: string[]) => void;
  onRefresh: (preferProductId?: string) => Promise<void>;
}

/**
 * One list of a company's products (published, archived, or submitted/hidden).
 * In the archived list every drug has a checkbox, so the administrator can
 * pick drugs and publish them again; each one is restored as a draft,
 * submitted and published in turn.
 */
function CompanyProductListView({
  client,
  mode,
  products,
  onOpen,
  onError,
  onRefresh,
}: CompanyProductListViewProps) {
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState<TherapeuticGroupKey | 'all'>(
    'all'
  );
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [confirmingIds, setConfirmingIds] = useState<string[] | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [summary, setSummary] = useState<PublishCheckedSummary | null>(null);

  const selectable = mode === 'archived';

  useEffect(() => {
    const valid = new Set(products.map((p) => p.id));
    setCheckedIds((prev) => prev.filter((id) => valid.has(id)));
  }, [products]);

  const allGroups = useMemo(
    () =>
      groupProductsByTherapeuticClass(products, (p) => ({
        brandNameEn: p.brandNameEn,
        genericNameEn: p.genericNameEn,
        drugClassNameEn: p.drugClassNameEn,
        category: p.category,
      })),
    [products]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (classFilter !== 'all') {
        const classified = classifyDrugTherapeuticGroup(
          p.drugClassNameEn,
          p.genericNameEn,
          p.category
        );
        if (classified.groupKey !== classFilter) return false;
      }
      if (!q) return true;
      return [p.brandNameEn, p.genericNameEn ?? '', p.drugClassNameEn]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [products, query, classFilter]);

  const visibleGroups = useMemo(
    () =>
      groupProductsByTherapeuticClass(visible, (p) => ({
        brandNameEn: p.brandNameEn,
        genericNameEn: p.genericNameEn,
        drugClassNameEn: p.drugClassNameEn,
        category: p.category,
      })),
    [visible]
  );

  const visibleIds = visible.map((p) => p.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => checkedIds.includes(id));

  const toggleAll = () => {
    if (allVisibleSelected) {
      const set = new Set(visibleIds);
      setCheckedIds((prev) => prev.filter((id) => !set.has(id)));
    } else {
      setCheckedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleOne = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirmPublish = async () => {
    if (!confirmingIds || confirmingIds.length === 0) return;
    const targets = products.filter((p) => confirmingIds.includes(p.id));
    setConfirmingIds(null);
    if (targets.length === 0) return;

    setPublishing(true);
    setSummary(null);
    setProgressText(
      `Publishing 1 of ${targets.length}: ${targets[0].brandNameEn}…`
    );

    const result = await publishArchivedProducts(
      client,
      targets.map((p) => ({
        id: p.id,
        brandNameEn: p.brandNameEn,
        status: p.status,
      })),
      {
        onProgress: (idx, total, item) =>
          setProgressText(`Publishing ${idx} of ${total}: ${item.brandNameEn}…`),
      }
    );

    setProgressText(null);
    setPublishing(false);
    setSummary(result);
    if (result.failedCount > 0 && result.publishedCount === 0) {
      onError(
        'None of the selected drugs could be published. The reason is shown next to each drug below.'
      );
    }
    const done = new Set(result.results.map((r) => r.id));
    setCheckedIds((prev) => prev.filter((id) => !done.has(id)));
    await onRefresh();
  };

  const emptyText =
    mode === 'published'
      ? 'No published drugs for this company yet.'
      : mode === 'archived'
        ? 'No archived drugs for this company.'
        : 'No submitted or hidden drugs for this company.';

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="search"
            aria-label="Search this list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, generic or class…"
            className={`${inputClass} sm:max-w-md`}
          />
          {selectable && (
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-[#F2F5F8] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  disabled={visible.length === 0 || publishing}
                  onChange={toggleAll}
                  className="accent-[#1769AA] h-4 w-4"
                />
                <span>Select all ({visible.length})</span>
              </label>
              <button
                type="button"
                disabled={checkedIds.length === 0 || publishing}
                onClick={() => {
                  setSummary(null);
                  setConfirmingIds(checkedIds);
                }}
                className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
              >
                Publish selected ({checkedIds.length})
              </button>
            </div>
          )}
        </div>
        {allGroups.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#304451]">
            <button
              type="button"
              onClick={() => setClassFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors tabular-nums ${
                classFilter === 'all'
                  ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                  : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
              }`}
            >
              All classes ({products.length})
            </button>
            {allGroups.map((grp) => (
              <button
                key={grp.groupKey}
                type="button"
                onClick={() =>
                  setClassFilter(
                    classFilter === grp.groupKey ? 'all' : grp.groupKey
                  )
                }
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors tabular-nums ${
                  classFilter === grp.groupKey
                    ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                    : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                }`}
              >
                {grp.groupLabel} ({grp.totalCount})
              </button>
            ))}
          </div>
        )}
        {selectable && (
          <p className="text-xs text-[#B8C3CC]">
            Tick the drugs you want doctors to see again. A drug that fails a
            publish check stays in Drafts so you can fix it.
          </p>
        )}
      </div>

      {confirmingIds && confirmingIds.length > 0 && (
        <div className="rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-medium text-[#F59E0B]">
            Publish {confirmingIds.length} archived{' '}
            {confirmingIds.length === 1 ? 'drug' : 'drugs'}? Doctors will see
            {confirmingIds.length === 1 ? ' it' : ' them'}.
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={publishing}
              onClick={() => void handleConfirmPublish()}
              className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
            >
              Confirm publish
            </button>
            <button
              type="button"
              disabled={publishing}
              onClick={() => setConfirmingIds(null)}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {publishing && progressText && <Banner tone="warn">{progressText}</Banner>}

      {summary && (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-[#F2F5F8]">
              Results: {summary.publishedCount} published, {summary.failedCount}{' '}
              not published
            </div>
            <button
              type="button"
              onClick={() => setSummary(null)}
              className="text-xs text-[#B8C3CC] hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <ul className="divide-y divide-[#304451] text-xs">
            {summary.results.map((item) => (
              <li
                key={item.id}
                className="py-2 flex flex-wrap items-start justify-between gap-2"
              >
                <span className="font-medium text-[#F2F5F8]">
                  {item.brandNameEn}
                </span>
                {item.ok ? (
                  <span className="text-[#38C976] font-semibold">Published</span>
                ) : (
                  <span className="text-right text-[#FF7272]">
                    {item.message}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
          {emptyText}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
          No drugs match your search.
        </div>
      ) : (
        <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
          {visibleGroups.map((grp) =>
            grp.subclasses.map((sub) => (
              <div key={`${grp.groupKey}-${sub.subclassLabel}`}>
                <div className="px-3.5 py-1.5 bg-[#1F2D38]/90 border-y border-[#304451] first:border-t-0 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC] truncate">
                    {sub.subclassLabel}
                  </span>
                  <span className="text-[11px] font-mono text-[#B8C3CC] tabular-nums shrink-0">
                    {sub.items.length}
                  </span>
                </div>
                <ul className="divide-y divide-[#304451]">
                  {sub.items.map((product) => {
                    const checked = checkedIds.includes(product.id);
                    const genericName =
                      product.genericNameEn ?? 'Dietary Supplement';
                    return (
                      <li
                        key={product.id}
                        className={`flex items-center gap-3 px-3.5 py-2 transition-colors ${
                          checked ? 'bg-[#1769AA]/15' : 'hover:bg-[#1F2D38]'
                        }`}
                      >
                        {selectable && (
                          <input
                            type="checkbox"
                            aria-label={`Select ${product.brandNameEn} for publishing`}
                            checked={checked}
                            disabled={publishing}
                            onChange={() => toggleOne(product.id)}
                            className="accent-[#1769AA] h-4 w-4 shrink-0"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => onOpen(product.id)}
                          className="flex-1 min-w-0 text-left flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3"
                        >
                          <div className="min-w-0 truncate">
                            <span className="text-sm font-semibold text-[#F2F5F8] hover:text-[#5DB4F2]">
                              {product.brandNameEn}
                            </span>
                            <span
                              className="mx-1.5 text-xs text-[#B8C3CC]"
                              aria-hidden="true"
                            >
                              ·
                            </span>
                            <span className="text-xs font-medium text-[#5DB4F2]">
                              {genericName}
                            </span>
                          </div>
                          <span className="text-xs text-[#B8C3CC] truncate shrink-0">
                            {product.companyName}
                          </span>
                        </button>
                        {selectable ? (
                          <button
                            type="button"
                            disabled={publishing}
                            onClick={() => {
                              setSummary(null);
                              setConfirmingIds([product.id]);
                            }}
                            className="shrink-0 rounded-md border border-[#38C976]/60 text-[#38C976] hover:bg-[#38C976] hover:text-[#1F2D38] disabled:opacity-50 text-xs font-semibold px-2.5 py-1 transition-colors"
                          >
                            Publish
                          </button>
                        ) : (
                          <span className="shrink-0">
                            <StatusText status={product.status} />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface CompanyReviewDraftsViewProps {
  client: SupabaseClient;
  bundle: CatalogBundle;
  companyId: string;
  draftProducts: CatalogProduct[];
  onError: (msg: string, reasons?: string[]) => void;
  onNotice: (msg: string) => void;
  onRefresh: (preferProductId?: string) => Promise<void>;
}

function CompanyReviewDraftsView({
  client,
  bundle,
  companyId,
  draftProducts,
  onError,
  onNotice,
  onRefresh,
}: CompanyReviewDraftsViewProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [confirmingPublishIds, setConfirmingPublishIds] = useState<
    string[] | null
  >(null);
  const [publishing, setPublishing] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [publishSummary, setPublishSummary] =
    useState<PublishCheckedSummary | null>(null);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [archivingProductId, setArchivingProductId] = useState<string | null>(
    null
  );
  const [archiveReason, setArchiveReason] = useState('');
  const [archivingBusy, setArchivingBusy] = useState(false);

  const [draftQuery, setDraftQuery] = useState('');
  const [draftSourceFilter, setDraftSourceFilter] =
    useState<ReviewDraftSourceFilter>('all');
  const [draftClassFilter, setDraftClassFilter] = useState<
    TherapeuticGroupKey | 'all'
  >('all');

  const [extraSourcesByProduct, setExtraSourcesByProduct] = useState<
    Record<string, AiDraftSource[]>
  >({});

  const draftIdKey = useMemo(
    () => draftProducts.map((p) => p.id).join(','),
    [draftProducts]
  );

  // Load any sources from product_ai_drafts (both sources column and draft.sources) for this company's drafts
  useEffect(() => {
    const ids = draftProducts.map((p) => p.id);
    if (ids.length === 0) return;
    let active = true;
    void loadCompanyAiDraftSources(client, ids).then((map) => {
      if (!active) return;
      setExtraSourcesByProduct(map);
    });
    return () => {
      active = false;
    };
  }, [client, draftIdKey, draftProducts]);

  // Keep checkedIds in sync with remaining draftProducts
  useEffect(() => {
    const validIds = new Set(draftProducts.map((p) => p.id));
    setCheckedIds((prev) => prev.filter((id) => validIds.has(id)));
  }, [draftProducts]);

  const sourceCounts = useMemo(
    () => getReviewDraftSourceCounts(draftProducts, extraSourcesByProduct),
    [draftProducts, extraSourcesByProduct]
  );

  const allDraftGroups = useMemo(
    () =>
      groupProductsByTherapeuticClass(draftProducts, (p) => ({
        brandNameEn: p.brandNameEn,
        genericNameEn: p.genericNameEn,
        drugClassNameEn: p.drugClassNameEn,
        category: p.category,
      })),
    [draftProducts]
  );

  const visibleDraftProducts = useMemo(() => {
    const filtered = filterReviewDraftProducts(
      draftProducts,
      extraSourcesByProduct,
      {
        query: draftQuery,
        sourceFilter: draftSourceFilter,
      }
    );
    if (draftClassFilter === 'all') return filtered;
    return filtered.filter((p) => {
      const classified = classifyDrugTherapeuticGroup(
        p.drugClassNameEn,
        p.genericNameEn,
        p.category
      );
      return classified.groupKey === draftClassFilter;
    });
  }, [
    draftProducts,
    extraSourcesByProduct,
    draftQuery,
    draftSourceFilter,
    draftClassFilter,
  ]);

  const visibleDraftGroups = useMemo(
    () =>
      groupProductsByTherapeuticClass(visibleDraftProducts, (p) => ({
        brandNameEn: p.brandNameEn,
        genericNameEn: p.genericNameEn,
        drugClassNameEn: p.drugClassNameEn,
        category: p.category,
      })),
    [visibleDraftProducts]
  );

  const editingProduct = useMemo(
    () => draftProducts.find((p) => p.id === editingProductId) ?? null,
    [draftProducts, editingProductId]
  );

  if (editingProduct) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#263744] border border-[#304451] px-4 py-3">
          <button
            type="button"
            onClick={() => setEditingProductId(null)}
            className={secondaryButtonClass}
          >
            ← Back to Review drafts ({draftProducts.length})
          </button>
          <span className="text-xs text-[#B8C3CC]">
            Editing draft:{' '}
            <strong className="text-[#F2F5F8]">
              {editingProduct.brandNameEn}
            </strong>
          </span>
        </div>

        <AdminProductEditorForm
          key={editingProduct.id + ':' + editingProduct.updatedAt}
          client={client}
          bundle={bundle}
          defaultCompanyId={companyId}
          existingProduct={editingProduct}
          onCancel={() => setEditingProductId(null)}
          onError={onError}
          onSaved={async (productId, status, createdTaxonomy) => {
            setEditingProductId(null);
            const addedMsg =
              createdTaxonomy && createdTaxonomy.length > 0
                ? ` Added to the catalog: ${createdTaxonomy.join(', ')}.`
                : '';
            onNotice(
              `Product updated (${STATUS_LABELS[status]}).` + addedMsg
            );
            await onRefresh(productId);
          }}
        />
      </div>
    );
  }

  const visibleIds = visibleDraftProducts.map((p) => p.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => checkedIds.includes(id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const visibleSet = new Set(visibleIds);
      setCheckedIds((prev) => prev.filter((id) => !visibleSet.has(id)));
    } else {
      setCheckedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleProductChecked = (productId: string) => {
    setCheckedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConfirmPublish = async () => {
    if (!confirmingPublishIds || confirmingPublishIds.length === 0) return;
    const targetProducts = draftProducts.filter((p) =>
      confirmingPublishIds.includes(p.id)
    );
    setConfirmingPublishIds(null);
    if (targetProducts.length === 0) return;

    setPublishing(true);
    setPublishSummary(null);
    setProgressText(
      `Publishing 1 of ${targetProducts.length}: ${targetProducts[0].brandNameEn}…`
    );

    const summary = await publishCheckedProducts(
      client,
      targetProducts.map((p) => ({
        id: p.id,
        brandNameEn: p.brandNameEn,
        status: p.status,
      })),
      {
        onProgress: (idx, total, item) => {
          setProgressText(
            `Publishing ${idx} of ${total}: ${item.brandNameEn}…`
          );
        },
      }
    );

    setProgressText(null);
    setPublishing(false);
    setPublishSummary(summary);

    const publishedIds = new Set(
      summary.results.filter((r) => r.ok).map((r) => r.id)
    );
    setCheckedIds((prev) => prev.filter((id) => !publishedIds.has(id)));
    await onRefresh();
  };

  const handleConfirmArchive = async (product: CatalogProduct) => {
    const cleanReason = archiveReason.trim();
    if (!cleanReason) {
      onError('Please enter a reason for archiving this product.');
      return;
    }
    setArchivingBusy(true);
    const res = await rpcAdminArchiveProduct(client, product.id, cleanReason);
    setArchivingBusy(false);

    if (!res.ok) {
      onError(res.message, res.reasons);
      return;
    }

    setArchivingProductId(null);
    setArchiveReason('');
    setCheckedIds((prev) => prev.filter((id) => id !== product.id));
    onNotice(`Archived "${product.brandNameEn}".`);
    await onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Review Toolbar: Search, Source Filter, Class Filter, Select all + Publish checked (N) */}
      <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3">
        {draftProducts.length > 0 && (
          <div className="space-y-2.5 border-b border-[#304451] pb-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex-1 max-w-md">
                <input
                  type="search"
                  aria-label="Search company drafts"
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder="Search drafts by brand, generic, or class…"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    {
                      key: 'all' as const,
                      label: `All (${sourceCounts.all})`,
                    },
                    {
                      key: 'ready' as const,
                      label: `Ready — valid source (${sourceCounts.ready})`,
                    },
                    {
                      key: 'warnings' as const,
                      label: `Has warnings (${sourceCounts.warnings})`,
                    },
                  ]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setDraftSourceFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      draftSourceFilter === tab.key
                        ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                        : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {allDraftGroups.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDraftClassFilter('all')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors tabular-nums ${
                    draftClassFilter === 'all'
                      ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                      : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                  }`}
                >
                  All classes ({draftProducts.length})
                </button>
                {allDraftGroups.map((grp) => (
                  <button
                    key={grp.groupKey}
                    type="button"
                    onClick={() =>
                      setDraftClassFilter(
                        draftClassFilter === grp.groupKey ? 'all' : grp.groupKey
                      )
                    }
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors tabular-nums ${
                      draftClassFilter === grp.groupKey
                        ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
                        : 'bg-[#1F2D38] border-[#304451] text-[#B8C3CC] hover:text-[#F2F5F8]'
                    }`}
                  >
                    {grp.groupLabel} ({grp.totalCount})
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[#F2F5F8] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                disabled={visibleDraftProducts.length === 0 || publishing}
                onChange={toggleSelectAll}
                className="accent-[#1769AA] h-4 w-4"
              />
              <span>Select all ({visibleDraftProducts.length})</span>
            </label>
            <span className="text-xs text-[#B8C3CC]">
              Check each product against its official source before publishing.
            </span>
          </div>

          <button
            type="button"
            disabled={checkedIds.length === 0 || publishing}
            onClick={() => {
              setPublishSummary(null);
              setConfirmingPublishIds(checkedIds);
            }}
            className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
          >
            Publish checked ({checkedIds.length})
          </button>
        </div>
      </div>

      {/* Confirmation prompt before publishing */}
      {confirmingPublishIds && confirmingPublishIds.length > 0 && (
        <div className="rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-medium text-[#F59E0B]">
            Publish {confirmingPublishIds.length} products? Doctors will see
            them.
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={publishing}
              onClick={() => void handleConfirmPublish()}
              className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
            >
              Confirm Publish
            </button>
            <button
              type="button"
              disabled={publishing}
              onClick={() => setConfirmingPublishIds(null)}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Progress line during publishing */}
      {publishing && progressText && (
        <Banner tone="warn">{progressText}</Banner>
      )}

      {/* Result list after publishing */}
      {publishSummary && (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-[#F2F5F8]">
              Publish results: {publishSummary.publishedCount} published,{' '}
              {publishSummary.failedCount} failed
            </div>
            <button
              type="button"
              onClick={() => setPublishSummary(null)}
              className="text-xs text-[#B8C3CC] hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <ul className="divide-y divide-[#304451] text-xs">
            {publishSummary.results.map((item) => (
              <li
                key={item.id}
                className="py-2 flex flex-wrap items-start justify-between gap-2"
              >
                <span className="font-medium text-[#F2F5F8]">
                  {item.brandNameEn}
                </span>
                {item.ok ? (
                  <span className="text-[#38C976] font-semibold">
                    Published
                  </span>
                ) : (
                  <div className="text-right text-[#FF7272]">
                    <div>Failed: {item.message}</div>
                    {item.reasons && item.reasons.length > 0 && (
                      <div className="text-[#B8C3CC] mt-0.5">
                        {item.reasons.join(' · ')}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {draftProducts.length === 0 ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center space-y-2">
          <div className="text-base font-medium text-[#F2F5F8]">
            No draft or changes-requested products for this company
          </div>
          <p className="text-xs text-[#B8C3CC]">
            All products for this company have been reviewed or archived.
          </p>
        </div>
      ) : visibleDraftProducts.length === 0 ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center space-y-2">
          <div className="text-base font-medium text-[#F2F5F8]">
            No drafts match your current filter
          </div>
          <p className="text-xs text-[#B8C3CC]">
            Adjust the search box or switch the source filter above.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {visibleDraftGroups.map((grp) =>
            grp.subclasses.map((sub) => (
              <div
                key={`${grp.groupKey}-${sub.subclassLabel}`}
                className="space-y-3"
              >
                <div className="px-4 py-2.5 rounded-xl bg-[#1F2D38] border border-[#304451] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#F2F5F8]">
                      {sub.subclassLabel}
                    </span>
                    <span className="text-xs text-[#B8C3CC]">·</span>
                    <span className="text-xs text-[#B8C3CC]">
                      {grp.groupLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#B8C3CC] tabular-nums">
                    {sub.items.length}{' '}
                    {sub.items.length === 1 ? 'draft' : 'drafts'}
                  </span>
                </div>

                {sub.items.map((product) => {
                  const isChecked = checkedIds.includes(product.id);
                  const market = product.market;
                  const enClinical = product.marketTranslations.en;
                  const sources = extractAiDraftSources(
                    product.aiSources ?? [],
                    { sources: extraSourcesByProduct[product.id] ?? [] }
                  );
                  const sourceWarning = getProductSourceWarning(sources);
                  const isArchiving = archivingProductId === product.id;

                  return (
                    <div
                      key={product.id}
                      className={`rounded-xl bg-[#263744] border p-5 space-y-4 transition-colors ${
                        isChecked ? 'border-[#5DB4F2]' : 'border-[#304451]'
                      }`}
                    >
                      {/* Row Top Bar */}
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#304451] pb-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="inline-flex items-center gap-2 rounded-md bg-[#1F2D38] border border-[#304451] px-3 py-1.5 text-xs font-medium text-[#F2F5F8] cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              disabled={publishing}
                              onChange={() => toggleProductChecked(product.id)}
                              className="accent-[#1769AA] h-4 w-4"
                            />
                            <span>Checked</span>
                          </label>

                          <div>
                            <div className="flex flex-wrap items-baseline gap-2.5">
                              <h3 className="text-base font-semibold text-[#F2F5F8]">
                                {product.brandNameEn}
                              </h3>
                              <StatusText status={product.status} />
                            </div>
                          </div>

                          {sourceWarning && (
                            <span className="rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/60 px-2.5 py-1 text-xs font-semibold text-[#F59E0B]">
                              {sourceWarning}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            disabled={publishing}
                            onClick={() => setEditingProductId(product.id)}
                            className={secondaryButtonClass}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={publishing}
                            onClick={() => {
                              setPublishSummary(null);
                              setConfirmingPublishIds([product.id]);
                            }}
                            className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-3 py-2 transition-colors"
                          >
                            Publish
                          </button>
                          <button
                            type="button"
                            disabled={publishing}
                            onClick={() => {
                              setArchivingProductId(
                                isArchiving ? null : product.id
                              );
                              setArchiveReason('');
                            }}
                            className="rounded-md bg-[#1F2D38] hover:bg-[#B42318] border border-[#304451] text-[#B8C3CC] hover:text-white text-xs font-medium px-3 py-2 transition-colors"
                          >
                            Archive
                          </button>
                        </div>
                      </div>

                      {/* Inline Archive Reason Prompt */}
                      {isArchiving && (
                        <div className="rounded-lg bg-[#1F2D38] border border-[#B42318]/60 p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                          <input
                            type="text"
                            value={archiveReason}
                            onChange={(e) => setArchiveReason(e.target.value)}
                            placeholder="Reason for archiving this product…"
                            className={`${inputClass} flex-1`}
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              disabled={archivingBusy || !archiveReason.trim()}
                              onClick={() =>
                                void handleConfirmArchive(product)
                              }
                              className="rounded-md bg-[#B42318] hover:bg-[#991B1B] disabled:opacity-50 text-white text-xs font-medium px-3.5 py-2 transition-colors"
                            >
                              {archivingBusy
                                ? 'Archiving…'
                                : 'Confirm Archive'}
                            </button>
                            <button
                              type="button"
                              disabled={archivingBusy}
                              onClick={() => {
                                setArchivingProductId(null);
                                setArchiveReason('');
                              }}
                              className={secondaryButtonClass}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Presentation & Taxonomy Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
                        <ReviewField
                          label="Generic"
                          value={product.genericNameEn ?? '—'}
                        />
                        <ReviewField
                          label="Strength"
                          value={market?.strength || '—'}
                          mono
                        />
                        <ReviewField
                          label="Dosage Form"
                          value={market?.dosageForm || '—'}
                        />
                        <ReviewField
                          label="Route"
                          value={market?.route || '—'}
                        />
                        <ReviewField
                          label="Pack Size"
                          value={market?.packSize || '—'}
                          mono
                        />
                        <ReviewField
                          label="Category"
                          value={CATEGORY_LABELS[product.category]}
                        />
                        <ReviewField
                          label="Drug Class"
                          value={cleanDrugClassLabel(product.drugClassNameEn)}
                        />
                        <ReviewField
                          label="Specialties"
                          value={
                            product.specialtyNamesEn.length > 0
                              ? product.specialtyNamesEn.join(', ')
                              : '—'
                          }
                        />
                      </div>

                      {/* 5 Clinical Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg bg-[#1F2D38] border border-[#304451] p-3.5 text-xs">
                        <ReviewClinicalField
                          label="Indications"
                          value={enClinical?.approvedIndications || '—'}
                        />
                        <ReviewClinicalField
                          label="Usual Adult Dose"
                          value={enClinical?.usualAdultDose || '—'}
                        />
                        <ReviewClinicalField
                          label="Contraindications"
                          value={enClinical?.contraindications || '—'}
                        />
                        <ReviewClinicalField
                          label="Common Adverse Effects"
                          value={enClinical?.commonAdverseEffects || '—'}
                        />
                        <div className="md:col-span-2">
                          <ReviewClinicalField
                            label="Storage"
                            value={enClinical?.storageConditions || '—'}
                          />
                        </div>
                      </div>

                      {/* AI Sources */}
                      <div className="text-xs space-y-1">
                        <div className="text-[#B8C3CC] font-medium">
                          AI Sources (product_ai_drafts):
                        </div>
                        {sources.length === 0 ? (
                          <div className="text-[#F59E0B]">
                            No source recorded
                          </div>
                        ) : (
                          <ul className="list-disc list-inside space-y-1">
                            {sources.map((src) => (
                              <li key={src.url}>
                                <a
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#5DB4F2] hover:underline break-all"
                                >
                                  {src.title} ({src.url})
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ReviewField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg bg-[#1F2D38]/70 border border-[#304451]/70 px-3 py-2">
      <div className="text-[#B8C3CC]">{label}</div>
      <div
        className={`text-[#F2F5F8] mt-0.5 break-words ${
          mono ? 'font-mono tabular-nums' : 'font-medium'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ReviewClinicalField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-[#B8C3CC] font-medium">{label}</div>
      <p className="text-[#F2F5F8] whitespace-pre-line leading-relaxed">
        {value}
      </p>
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

    // Fill form fields from draft (do NOT save, do NOT touch marketStatus)
    setBrandNameEn(draft.brandName ?? '');

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
      category,
      drugClassId: resolvedDrugClassId,
      genericDrugId: resolvedGenericDrugId,
      strength,
      dosageForm,
      route,
      packSize,
      marketStatus,
      registrationStatus: 'not_recorded',
      registrationNumber: '',
      registrationAuthority: '',
      registrationExpiresOn: '',
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
          className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
          disabled={busy}
          onClick={() => void handleSave(false)}
        >
          {busy ? 'Saving…' : 'Save as Draft'}
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
    useState<ProductStatus>('draft');

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
            `Product updated (${STATUS_LABELS[status]}).` + addedMsg
          );
        }}
      />
    );
  }

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

function AdminSponsoredAdsView({
  client,
  bundle,
  onNotice,
  onError,
}: {
  client: SupabaseClient;
  bundle: CatalogBundle | null;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [ads, setAds] = useState<SponsoredAdRecord[]>([]);
  const [statsById, setStatsById] = useState<Record<string, AdminSponsoredAdStat>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [sponsorName, setSponsorName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [targetSpecialtyId, setTargetSpecialtyId] = useState('');
  const [startsOn, setStartsOn] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [endsOn, setEndsOn] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [priority, setPriority] = useState(0);

  const loadAdsData = useCallback(async () => {
    setLoading(true);
    const [adsRes, statsRes] = await Promise.all([
      loadAdminSponsoredAds(client),
      loadAdminSponsoredAdStats(client, 30),
    ]);
    setLoading(false);

    if (!adsRes.ok) {
      onError(adsRes.message);
      return;
    }
    setAds(adsRes.data);

    if (statsRes.ok) {
      const map: Record<string, AdminSponsoredAdStat> = {};
      for (const s of statsRes.data) {
        map[s.adId] = s;
      }
      setStatsById(map);
    }
  }, [client, onError]);

  useEffect(() => {
    void loadAdsData();
  }, [loadAdsData]);

  const specialtiesMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of bundle?.specialties ?? []) {
      map.set(s.id, s.nameEn);
    }
    return map;
  }, [bundle]);

  const resetForm = () => {
    setEditingAdId(null);
    setSponsorName('');
    setTitle('');
    setBody('');
    setImageUrl('');
    setLinkUrl('');
    setCompanyId('');
    setTargetSpecialtyId('');
    setStartsOn(new Date().toISOString().slice(0, 10));
    setEndsOn('');
    setIsActive(true);
    setPriority(0);
    setFormErrors([]);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (ad: SponsoredAdRecord) => {
    setEditingAdId(ad.id);
    setSponsorName(ad.sponsorName);
    setTitle(ad.title);
    setBody(ad.body ?? '');
    setImageUrl(ad.imageUrl ?? '');
    setLinkUrl(ad.linkUrl ?? '');
    setCompanyId(ad.companyId ?? '');
    setTargetSpecialtyId(ad.targetSpecialtyId ?? '');
    setStartsOn(ad.startsOn ?? new Date().toISOString().slice(0, 10));
    setEndsOn(ad.endsOn ?? '');
    setIsActive(ad.isActive);
    setPriority(ad.priority);
    setFormErrors([]);
    setShowForm(true);
  };

  const handleSaveAd = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      adId: editingAdId,
      sponsorName,
      title,
      body,
      imageUrl,
      linkUrl,
      companyId: companyId || null,
      targetSpecialtyId: targetSpecialtyId || null,
      startsOn,
      endsOn,
      isActive,
      priority: Number(priority),
    };

    const validationErrors = validateSponsoredAdForm(input);
    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors([]);
    setSaving(true);
    const res = await rpcAdminSaveSponsoredAd(client, input);
    setSaving(false);

    if (!res.ok) {
      onError(res.message);
      return;
    }

    setShowForm(false);
    resetForm();
    onNotice(editingAdId ? 'Sponsored ad updated.' : 'Sponsored ad created.');
    await loadAdsData();
  };

  const handleToggleActive = async (ad: SponsoredAdRecord) => {
    setTogglingId(ad.id);
    const res = await rpcAdminSaveSponsoredAd(client, {
      adId: ad.id,
      sponsorName: ad.sponsorName,
      title: ad.title,
      body: ad.body ?? '',
      imageUrl: ad.imageUrl ?? '',
      linkUrl: ad.linkUrl ?? '',
      companyId: ad.companyId,
      targetSpecialtyId: ad.targetSpecialtyId,
      startsOn: ad.startsOn,
      endsOn: ad.endsOn ?? '',
      isActive: !ad.isActive,
      priority: ad.priority,
    });
    setTogglingId(null);

    if (!res.ok) {
      onError(res.message);
      return;
    }

    onNotice(
      !ad.isActive
        ? `Activated "${ad.title}".`
        : `Deactivated "${ad.title}".`
    );
    await loadAdsData();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#263744] border border-[#304451] p-5">
        <div>
          <h1 className="text-base font-semibold text-[#F2F5F8]">
            Sponsored ads ({ads.length})
          </h1>
          <p className="text-xs text-[#B8C3CC] mt-0.5">
            Manage doctor home Sponsored placements, specialty targeting, schedule dates, and 30-day impressions.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => void loadAdsData()}
            disabled={loading}
            className={secondaryButtonClass}
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                resetForm();
              } else {
                openCreateForm();
              }
            }}
            className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-medium px-4 py-2 transition-colors"
          >
            {showForm ? 'Close Form' : '+ New Sponsored Ad'}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSaveAd}
          className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-[#304451] pb-4">
            <div>
              <h2 className="text-base font-semibold text-[#F2F5F8]">
                {editingAdId ? 'Edit Sponsored Ad' : 'Create Sponsored Ad'}
              </h2>
              <p className="text-xs text-[#B8C3CC] mt-0.5">
                Title and sponsor name are required (max 80 chars). Body max 280 chars. Image and link URLs must start with https://.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
          </div>

          {formErrors.length > 0 && (
            <Banner tone="error">
              <ul className="list-disc list-inside space-y-1 text-xs">
                {formErrors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </Banner>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={`Sponsor Name * (${sponsorName.trim().length}/80)`}>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    placeholder="e.g. AstraZeneca"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label={`Title * (${title.trim().length}/80)`}>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    placeholder="e.g. Forxiga 10 mg Prescribing Update"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label={`Body (${body.trim().length}/280)`}>
                <textarea
                  rows={3}
                  maxLength={280}
                  placeholder="Short clinical summary or announcement (max 280 characters)…"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Image URL (https:// only)">
                  <input
                    type="url"
                    placeholder="https://example.com/banner.png"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Destination Link URL (https:// only)">
                  <input
                    type="url"
                    placeholder="https://www.ema.europa.eu/..."
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Target Specialty">
                  <select
                    value={targetSpecialtyId}
                    onChange={(e) => setTargetSpecialtyId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">All doctors</option>
                    {(bundle?.specialties ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nameEn}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Company (optional)">
                  <select
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">None</option>
                    {(bundle?.companies ?? []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Start Date *">
                  <input
                    type="date"
                    required
                    value={startsOn}
                    onChange={(e) => setStartsOn(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="End Date (optional)">
                  <input
                    type="date"
                    value={endsOn}
                    onChange={(e) => setEndsOn(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Priority (0–100)">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className={inputClass}
                  />
                </Field>
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-[#F2F5F8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-[#304451] bg-[#1F2D38] text-[#1769AA]"
                />
                Active (eligible to be shown to doctors during scheduled dates)
              </label>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className={secondaryButtonClass}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 transition-colors"
                >
                  {saving ? 'Saving…' : editingAdId ? 'Save Changes' : 'Create Ad'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#B8C3CC]">
                Card Preview (Doctor Home)
              </div>
              <SponsoredAdCard
                ad={{
                  adId: editingAdId ?? 'preview',
                  sponsorName: sponsorName.trim() || 'Sponsor Name',
                  title: title.trim() || 'Sponsored Ad Title',
                  body: body.trim() || null,
                  imageUrl: imageUrl.trim() || null,
                  linkUrl: linkUrl.trim() || null,
                }}
              />
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
          Loading sponsored ads…
        </div>
      ) : ads.length === 0 ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
          No sponsored ads yet. Click “+ New Sponsored Ad” to create one.
        </div>
      ) : (
        <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                  <th className="py-3 px-4">Title & Sponsor</th>
                  <th className="py-3 px-4">Target Specialty</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Priority</th>
                  <th className="py-3 px-4 text-right">Views (30d)</th>
                  <th className="py-3 px-4 text-right">Clicks (30d)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304451] text-xs">
                {ads.map((ad) => {
                  const stat = statsById[ad.id];
                  const specialtyLabel = ad.targetSpecialtyId
                    ? specialtiesMap.get(ad.targetSpecialtyId) ?? 'Specialty'
                    : 'All doctors';
                  return (
                    <tr key={ad.id} className="hover:bg-[#1F2D38]/40">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#F2F5F8]">
                          {ad.title}
                        </div>
                        <div className="text-[#B8C3CC] mt-0.5">
                          {ad.sponsorName}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#F2F5F8]">
                        {specialtyLabel}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#B8C3CC]">
                        {ad.startsOn}
                        {ad.endsOn ? ` → ${ad.endsOn}` : ' → open'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                            ad.isActive
                              ? 'bg-[#2E8B57]/20 text-[#2ECC71] border border-[#2E8B57]/40'
                              : 'bg-[#304451]/60 text-[#B8C3CC] border border-[#304451]'
                          }`}
                        >
                          {ad.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                        {ad.priority}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                        {stat?.views ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                        {stat?.clicks ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(ad)}
                            className={secondaryButtonClass}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={togglingId === ad.id}
                            onClick={() => void handleToggleActive(ad)}
                            className={secondaryButtonClass}
                          >
                            {togglingId === ad.id
                              ? 'Saving…'
                              : ad.isActive
                              ? 'Deactivate'
                              : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

function AdminUsageStatsView({
  client,
  onError,
  onOpenUsersMonitor,
}: {
  client: SupabaseClient;
  onError: (msg: string) => void;
  onOpenUsersMonitor: () => void;
}) {
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const [loading, setLoading] = useState(true);
  const [topSearches, setTopSearches] = useState<AdminTopSearchRow[]>([]);
  const [topProducts, setTopProducts] = useState<AdminTopViewedProductRow[]>([]);
  const [adStats, setAdStats] = useState<AdminSponsoredAdStat[]>([]);
  const [userStats, setUserStats] = useState<UserRegistrationStats | null>(null);

  const loadUsage = useCallback(
    async (selectedDays: 7 | 30 | 90) => {
      setLoading(true);
      const [searchesRes, productsRes, adsRes, regUsers] = await Promise.all([
        loadAdminTopSearches(client, selectedDays, 50),
        loadAdminTopViewedProducts(client, selectedDays, 50),
        loadAdminSponsoredAdStats(client, selectedDays),
        listRegisteredUsers(client),
      ]);
      setLoading(false);

      if (!searchesRes.ok) {
        onError(searchesRes.message);
        return;
      }
      if (!productsRes.ok) {
        onError(productsRes.message);
        return;
      }
      if (!adsRes.ok) {
        onError(adsRes.message);
        return;
      }

      setTopSearches(searchesRes.data);
      setTopProducts(productsRes.data);
      setAdStats(adsRes.data);
      setUserStats(computeUserRegistrationStats(regUsers));
    },
    [client, onError]
  );

  useEffect(() => {
    void loadUsage(days);
  }, [days, loadUsage]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#263744] border border-[#304451] p-5">
        <div>
          <h1 className="text-base font-semibold text-[#F2F5F8]">
            Usage & User Activity Statistics
          </h1>
          <p className="text-xs text-[#B8C3CC] mt-0.5">
            Registered users opening the app, search queries, drug page views, and sponsored ad performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-[#1F2D38] border border-[#304451] p-0.5">
            {([7, 30, 90] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setDays(period)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  days === period
                    ? 'bg-[#1769AA] text-white'
                    : 'text-[#B8C3CC] hover:text-white'
                }`}
              >
                Last {period} days
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void loadUsage(days)}
            disabled={loading}
            className={secondaryButtonClass}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* User Registrations & App Open Monitor Summary */}
      {userStats && (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-[#F2F5F8]">
                User Registrations & App Open Monitor
              </h2>
              <p className="text-xs text-[#B8C3CC]">
                Real-time summary of registered accounts and doctors opening the catalog.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenUsersMonitor}
              className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-semibold px-3.5 py-2 transition-colors"
            >
              Open Users & Activity Monitor →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
              <div className="text-[11px] uppercase tracking-wider text-[#B8C3CC]">
                Registered Users
              </div>
              <div className="mt-0.5 text-lg font-semibold tabular-nums text-[#F2F5F8]">
                {userStats.totalUsers}{' '}
                <span className="text-xs font-normal text-[#5DB4F2]">
                  ({userStats.totalDoctors} doctors)
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
              <div className="text-[11px] uppercase tracking-wider text-[#B8C3CC]">
                Opened App (24h)
              </div>
              <div className="mt-0.5 text-lg font-semibold tabular-nums text-[#38C976]">
                {userStats.openedLast24h}
              </div>
            </div>
            <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
              <div className="text-[11px] uppercase tracking-wider text-[#B8C3CC]">
                Opened App (7d)
              </div>
              <div className="mt-0.5 text-lg font-semibold tabular-nums text-[#5DB4F2]">
                {userStats.openedLast7d}
              </div>
            </div>
            <div className="rounded-lg bg-[#1F2D38] border border-[#304451] px-3.5 py-2.5">
              <div className="text-[11px] uppercase tracking-wider text-[#B8C3CC]">
                New Sign-ups (7d / 30d)
              </div>
              <div className="mt-0.5 text-lg font-semibold tabular-nums text-[#F2F5F8]">
                {userStats.newLast7d} / {userStats.newLast30d}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
          Loading usage statistics…
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Searches */}
          <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#304451] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#F2F5F8]">
                  Top Searches (Last {days} days)
                </h2>
                <p className="text-xs text-[#B8C3CC] mt-0.5">
                  Highlighted rows had searches with 0 matching products.
                </p>
              </div>
              <span className="text-xs font-mono text-[#B8C3CC]">
                {topSearches.length} queries
              </span>
            </div>
            {topSearches.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#B8C3CC]">
                No searches recorded in the last {days} days.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                      <th className="py-2.5 px-4">Query</th>
                      <th className="py-2.5 px-4 text-right">Searches</th>
                      <th className="py-2.5 px-4 text-right">No result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#304451] text-xs">
                    {topSearches.map((row) => {
                      const hasZeroResults = row.zeroResultSearches > 0;
                      return (
                        <tr
                          key={row.query}
                          className={
                            hasZeroResults
                              ? 'bg-[#F59E0B]/10 hover:bg-[#F59E0B]/15'
                              : 'hover:bg-[#1F2D38]/40'
                          }
                        >
                          <td className="py-2.5 px-4 font-medium text-[#F2F5F8] flex items-center gap-2">
                            <span>{row.query}</span>
                            {hasZeroResults && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                                No result
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                            {row.searches}
                          </td>
                          <td
                            className={`py-2.5 px-4 text-right font-mono tabular-nums font-semibold ${
                              hasZeroResults ? 'text-[#F59E0B]' : 'text-[#B8C3CC]'
                            }`}
                          >
                            {row.zeroResultSearches}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Most Viewed Drugs */}
          <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#304451] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#F2F5F8]">
                  Most Viewed Drugs (Last {days} days)
                </h2>
                <p className="text-xs text-[#B8C3CC] mt-0.5">
                  Published product pages opened by doctors.
                </p>
              </div>
              <span className="text-xs font-mono text-[#B8C3CC]">
                {topProducts.length} products
              </span>
            </div>
            {topProducts.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#B8C3CC]">
                No product views recorded in the last {days} days.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                      <th className="py-2.5 px-4">Drug</th>
                      <th className="py-2.5 px-4">Company</th>
                      <th className="py-2.5 px-4 text-right">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#304451] text-xs">
                    {topProducts.map((row) => (
                      <tr key={row.productId} className="hover:bg-[#1F2D38]/40">
                        <td className="py-2.5 px-4 font-semibold text-[#F2F5F8]">
                          {row.brandNameEn}
                        </td>
                        <td className="py-2.5 px-4 text-[#B8C3CC]">
                          {row.companyName}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                          {row.views}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Ad Views and Clicks */}
          <div className="lg:col-span-2 rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
            <div className="p-4 border-b border-[#304451] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#F2F5F8]">
                  Sponsored Ad Views & Clicks (Last {days} days)
                </h2>
                <p className="text-xs text-[#B8C3CC] mt-0.5">
                  Impressions and outbound link taps across all sponsored ads.
                </p>
              </div>
              <span className="text-xs font-mono text-[#B8C3CC]">
                {adStats.length} ads
              </span>
            </div>
            {adStats.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#B8C3CC]">
                No sponsored ads found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                      <th className="py-2.5 px-4">Title</th>
                      <th className="py-2.5 px-4">Sponsor</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Views</th>
                      <th className="py-2.5 px-4 text-right">Clicks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#304451] text-xs">
                    {adStats.map((ad) => (
                      <tr key={ad.adId} className="hover:bg-[#1F2D38]/40">
                        <td className="py-2.5 px-4 font-semibold text-[#F2F5F8]">
                          {ad.title}
                        </td>
                        <td className="py-2.5 px-4 text-[#B8C3CC]">
                          {ad.sponsorName}
                        </td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                              ad.isActive
                                ? 'bg-[#2E8B57]/20 text-[#2ECC71] border border-[#2E8B57]/40'
                                : 'bg-[#304451]/60 text-[#B8C3CC] border border-[#304451]'
                            }`}
                          >
                            {ad.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                          {ad.views}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#F2F5F8]">
                          {ad.clicks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

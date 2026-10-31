import React, { useMemo, useRef, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CATEGORY_LABELS,
  invokeAiDraftProduct,
  invokeAiFindCompanyProducts,
  invokeAiSuggestCompanies,
  rpcAdminCreateCompany,
  rpcAdminSaveAiProductDraft,
  type AiDraftSource,
  type CatalogBundle,
  type CompanySuggestion,
  type CompanySuggestionType,
  type IraqEvidence,
  type ProductSuggestion,
} from '../lib/catalog';
import { CatalogBanner as Banner } from './DoctorCatalog';
import { Field, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  bundle: CatalogBundle;
  defaultCountryId: string;
  onRefresh: () => Promise<void>;
  onOpenDraftsForReview: (companyId?: string) => void;
}

interface CompanyRow extends CompanySuggestion {
  localId: string;
  selected: boolean;
  added?: boolean;
}

type QueueOutcome =
  | { state: 'idle' }
  | { state: 'drafting' }
  | { state: 'created'; missing: string[]; productId: string }
  | { state: 'exists'; productId: string }
  | { state: 'not_found'; notes: string | null }
  | { state: 'failed'; reason: string };

interface ProductRow extends ProductSuggestion {
  localId: string;
  selected: boolean;
  outcome: QueueOutcome;
}

const COMPANY_TYPE_LABELS: Record<CompanySuggestionType, string> = {
  iraqi_manufacturer: 'Iraqi manufacturer',
  regional: 'Regional',
  multinational: 'Multinational',
};

function EvidenceBadge({ evidence }: { evidence: IraqEvidence }) {
  if (evidence === 'confirmed') {
    return (
      <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-[#38C976]/20 border border-[#38C976] text-[#38C976]">
        Confirmed
      </span>
    );
  }
  if (evidence === 'likely') {
    return (
      <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-[#F59E0B]/20 border border-[#F59E0B] text-[#F59E0B]">
        Likely
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-[#1F2D38] border border-[#304451] text-[#B8C3CC]">
      Unknown
    </span>
  );
}

export function CatalogBuilder({
  client,
  bundle,
  defaultCountryId,
  onRefresh,
  onOpenDraftsForReview,
}: Props) {
  // Step 1 — Suggest companies
  const [focus, setFocus] = useState('');
  const [suggestingCompanies, setSuggestingCompanies] = useState(false);
  const [companyRows, setCompanyRows] = useState<CompanyRow[]>([]);
  const [companyNotes, setCompanyNotes] = useState<string | null>(null);
  const [companySources, setCompanySources] = useState<AiDraftSource[]>([]);
  const [companySuggestionsHtml, setCompanySuggestionsHtml] = useState<
    string | null
  >(null);
  const [addingCompanies, setAddingCompanies] = useState(false);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [companyNotice, setCompanyNotice] = useState<string | null>(null);

  // Step 2 — Find products
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    bundle.companies[0]?.id ?? ''
  );
  const [therapeuticArea, setTherapeuticArea] = useState('');
  const [findingProducts, setFindingProducts] = useState(false);
  const [productRows, setProductRows] = useState<ProductRow[]>([]);
  const [productNotes, setProductNotes] = useState<string | null>(null);
  const [productSources, setProductSources] = useState<AiDraftSource[]>([]);
  const [productSuggestionsHtml, setProductSuggestionsHtml] = useState<
    string | null
  >(null);
  const [productError, setProductError] = useState<string | null>(null);

  // Step 3 — Draft all (queue)
  const [draftingQueue, setDraftingQueue] = useState(false);
  const [paused, setPaused] = useState(false);
  const [queueFinished, setQueueFinished] = useState(false);
  const [queueError, setQueueError] = useState<string | null>(null);
  const pausedRef = useRef(false);

  const selectedCompany = useMemo(
    () => bundle.companies.find((c) => c.id === selectedCompanyId) ?? null,
    [bundle.companies, selectedCompanyId]
  );

  const existingCompanyNamesLower = useMemo(
    () =>
      new Set(
        bundle.companies.map((c) => c.companyName.trim().toLowerCase())
      ),
    [bundle.companies]
  );

  const handleSuggestCompanies = async () => {
    setSuggestingCompanies(true);
    setCompanyError(null);
    setCompanyNotice(null);

    const exclude = Array.from(
      new Set([
        ...bundle.companies.map((c) => c.companyName),
        ...companyRows.map((r) => r.name),
      ])
    );

    const res = await invokeAiSuggestCompanies(client, {
      focus,
      exclude,
    });

    setSuggestingCompanies(false);

    if (!res.ok) {
      setCompanyError(res.message);
      return;
    }

    setCompanyNotes(res.data.notes);
    setCompanySources(res.data.groundingSources ?? []);
    setCompanySuggestionsHtml(res.data.searchSuggestionsHtml);

    setCompanyRows((prev) => {
      const seen = new Set(prev.map((p) => p.name.trim().toLowerCase()));
      const additions: CompanyRow[] = [];
      for (let i = 0; i < res.data.items.length; i += 1) {
        const item = res.data.items[i];
        const key = item.name.trim().toLowerCase();
        if (!key || seen.has(key) || existingCompanyNamesLower.has(key)) {
          continue;
        }
        seen.add(key);
        additions.push({
          ...item,
          localId: `comp-${Date.now()}-${i}`,
          selected:
            item.iraqEvidence === 'confirmed' || item.iraqEvidence === 'likely',
        });
      }
      return [...prev, ...additions];
    });
  };

  const handleAddSelectedCompanies = async () => {
    const ticked = companyRows.filter((r) => r.selected && !r.added);
    if (ticked.length === 0) return;

    setAddingCompanies(true);
    setCompanyError(null);
    setCompanyNotice(null);

    let addedCount = 0;
    let firstCreatedId: string | null = null;
    const knownNames = new Set(existingCompanyNamesLower);

    for (const row of ticked) {
      const trimmedName = row.name.trim();
      if (!trimmedName || knownNames.has(trimmedName.toLowerCase())) {
        setCompanyRows((prev) =>
          prev.map((r) =>
            r.localId === row.localId
              ? { ...r, selected: false, added: true }
              : r
          )
        );
        continue;
      }

      const description =
        [
          row.description,
          row.headquartersCountry &&
            `Headquarters: ${row.headquartersCountry}.`,
        ]
          .filter(Boolean)
          .join(' ') || undefined;

      const createRes = await rpcAdminCreateCompany(client, {
        countryId: defaultCountryId || null,
        cityId: null,
        companyName: trimmedName,
        legalName: row.legalName?.trim() || trimmedName,
        description,
        websiteUrl: row.website ?? undefined,
      });

      if (!createRes.ok) {
        setCompanyError(`${trimmedName}: ${createRes.message}`);
        continue;
      }

      knownNames.add(trimmedName.toLowerCase());
      addedCount += 1;
      if (!firstCreatedId) {
        firstCreatedId = createRes.data.id;
      }
      setCompanyRows((prev) =>
        prev.map((r) =>
          r.localId === row.localId
            ? { ...r, selected: false, added: true }
            : r
        )
      );
    }

    setAddingCompanies(false);
    setCompanyNotice(`Added ${addedCount} companies`);
    await onRefresh();
    if (!selectedCompanyId && firstCreatedId) {
      setSelectedCompanyId(firstCreatedId);
    }
  };

  const handleFindProducts = async () => {
    if (!selectedCompany) {
      setProductError('Please select a company first.');
      return;
    }

    setFindingProducts(true);
    setProductError(null);
    setQueueError(null);

    const existingCompanyBrands = bundle.products
      .filter((p) => p.companyId === selectedCompany.id)
      .map((p) => p.brandNameEn);

    const exclude = Array.from(
      new Set([
        ...existingCompanyBrands,
        ...productRows.map((r) => r.brandName),
      ])
    );

    const res = await invokeAiFindCompanyProducts(client, {
      companyName: selectedCompany.companyName,
      therapeuticArea,
      exclude,
    });

    setFindingProducts(false);

    if (!res.ok) {
      setProductError(res.message);
      return;
    }

    setProductNotes(res.data.notes);
    setProductSources(res.data.groundingSources ?? []);
    setProductSuggestionsHtml(res.data.searchSuggestionsHtml);

    const existingLower = new Set(
      exclude.map((b) => b.trim().toLowerCase()).filter(Boolean)
    );

    setProductRows((prev) => {
      const additions: ProductRow[] = [];
      for (let i = 0; i < res.data.items.length; i += 1) {
        const item = res.data.items[i];
        const key = item.brandName.trim().toLowerCase();
        if (!key || existingLower.has(key)) continue;
        existingLower.add(key);
        additions.push({
          ...item,
          localId: `prod-${Date.now()}-${i}`,
          selected:
            item.iraqEvidence === 'confirmed' || item.iraqEvidence === 'likely',
          outcome: { state: 'idle' },
        });
      }
      return [...prev, ...additions];
    });
  };

  const runDraftQueue = async () => {
    if (!selectedCompany) {
      setQueueError('Please select a company first.');
      return;
    }

    const queue = productRows.filter(
      (r) =>
        r.selected &&
        r.outcome.state !== 'created' &&
        r.outcome.state !== 'exists'
    );
    if (queue.length === 0) return;

    pausedRef.current = false;
    setPaused(false);
    setQueueFinished(false);
    setQueueError(null);
    setDraftingQueue(true);

    let stoppedEarly = false;

    for (const item of queue) {
      if (pausedRef.current) {
        stoppedEarly = true;
        break;
      }

      setProductRows((prev) =>
        prev.map((r) =>
          r.localId === item.localId
            ? { ...r, outcome: { state: 'drafting' } }
            : r
        )
      );

      const ai = await invokeAiDraftProduct(client, {
        productName: [item.brandName, item.dosageForm]
          .filter(Boolean)
          .join(' '),
        companyName: selectedCompany.companyName,
      });

      if (!ai.ok) {
        setProductRows((prev) =>
          prev.map((r) =>
            r.localId === item.localId
              ? {
                  ...r,
                  outcome: { state: 'failed', reason: ai.message },
                }
              : r
          )
        );
        if (ai.quota) {
          setQueueError('The AI quota is used up for now. Try again later.');
          stoppedEarly = true;
          break;
        }
        continue;
      }

      if (!ai.data.draft.found) {
        setProductRows((prev) =>
          prev.map((r) =>
            r.localId === item.localId
              ? {
                  ...r,
                  selected: false,
                  outcome: {
                    state: 'not_found',
                    notes: ai.data.draft.notes ?? null,
                  },
                }
              : r
          )
        );
        continue;
      }

      const sources = [
        ...(ai.data.draft.sources ?? []),
        ...(ai.data.groundingSources ?? []),
      ];

      const saveRes = await rpcAdminSaveAiProductDraft(client, {
        companyId: selectedCompany.id,
        draft: ai.data.draft,
        sources,
        model: ai.data.model,
      });

      if (!saveRes.ok) {
        setProductRows((prev) =>
          prev.map((r) =>
            r.localId === item.localId
              ? {
                  ...r,
                  outcome: { state: 'failed', reason: saveRes.message },
                }
              : r
          )
        );
      } else if (saveRes.data.outcome === 'exists') {
        setProductRows((prev) =>
          prev.map((r) =>
            r.localId === item.localId
              ? {
                  ...r,
                  selected: false,
                  outcome: {
                    state: 'exists',
                    productId: saveRes.data.productId,
                  },
                }
              : r
          )
        );
      } else {
        setProductRows((prev) =>
          prev.map((r) =>
            r.localId === item.localId
              ? {
                  ...r,
                  selected: false,
                  outcome: {
                    state: 'created',
                    missing: saveRes.data.missing,
                    productId: saveRes.data.productId,
                  },
                }
              : r
          )
        );
      }
    }

    setDraftingQueue(false);
    if (!stoppedEarly) {
      setQueueFinished(true);
    }
    await onRefresh();
  };

  const tickedCompanyCount = companyRows.filter(
    (r) => r.selected && !r.added
  ).length;
  const tickedProductCount = productRows.filter(
    (r) =>
      r.selected &&
      r.outcome.state !== 'created' &&
      r.outcome.state !== 'exists'
  ).length;
  const createdDraftsCount = productRows.filter(
    (r) => r.outcome.state === 'created'
  ).length;
  const hasAnyOutcomes = productRows.some((r) => r.outcome.state !== 'idle');

  return (
    <div className="space-y-6">
      {/* Step 1 — Suggest companies */}
      <section className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#F2F5F8]">
              1. Suggest companies
            </h2>
            <p className="text-xs text-[#B8C3CC]">
              AI lists pharmaceutical manufacturers selling medicines in Iraq.
              Tick the companies to add to the catalog.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-64">
              <Field label="Focus (optional)">
                <input
                  type="text"
                  placeholder="e.g. Iraqi manufacturers, Jordanian companies"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  disabled={suggestingCompanies || addingCompanies}
                  className={inputClass}
                />
              </Field>
            </div>
            <button
              type="button"
              disabled={suggestingCompanies || addingCompanies}
              onClick={() => void handleSuggestCompanies()}
              className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
            >
              {suggestingCompanies ? 'Researching…' : 'Suggest companies'}
            </button>
            {companyRows.length > 0 && (
              <button
                type="button"
                disabled={suggestingCompanies || addingCompanies}
                onClick={() => void handleSuggestCompanies()}
                className={secondaryButtonClass}
              >
                Suggest more
              </button>
            )}
          </div>
        </div>

        {suggestingCompanies && (
          <p className="text-xs text-[#F59E0B] font-medium">
            Researching… this can take up to 2 minutes
          </p>
        )}

        {companyError && <Banner tone="error">{companyError}</Banner>}
        {companyNotice && <Banner tone="success">{companyNotice}</Banner>}

        {(companyNotes ||
          companySources.length > 0 ||
          companySuggestionsHtml) && (
          <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3.5 space-y-2 text-xs">
            {companyNotes && <p className="text-[#F2F5F8]">{companyNotes}</p>}
            {companySources.length > 0 && (
              <div className="space-y-1">
                <div className="font-medium text-[#B8C3CC]">Sources:</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {companySources.map((src) => (
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
            {companySuggestionsHtml && (
              <iframe
                title="Google Search suggestions for companies"
                sandbox="allow-popups allow-popups-to-escape-sandbox"
                srcDoc={companySuggestionsHtml}
                className="w-full h-14 rounded border border-[#304451] bg-[#1F2D38]"
              />
            )}
          </div>
        )}

        {companyRows.length > 0 && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-lg border border-[#304451]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1F2D38] text-[#B8C3CC] border-b border-[#304451]">
                  <tr>
                    <th className="p-3 w-10">Tick</th>
                    <th className="p-3">Company Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Headquarters</th>
                    <th className="p-3">Iraq Evidence</th>
                    <th className="p-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#304451]">
                  {companyRows.map((row) => (
                    <tr key={row.localId} className="bg-[#263744]">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={row.selected}
                          disabled={row.added || addingCompanies}
                          onChange={(e) =>
                            setCompanyRows((prev) =>
                              prev.map((r) =>
                                r.localId === row.localId
                                  ? { ...r, selected: e.target.checked }
                                  : r
                              )
                            )
                          }
                          className="accent-[#1769AA]"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.name}
                          disabled={row.added || addingCompanies}
                          onChange={(e) =>
                            setCompanyRows((prev) =>
                              prev.map((r) =>
                                r.localId === row.localId
                                  ? { ...r, name: e.target.value }
                                  : r
                              )
                            )
                          }
                          className={`${inputClass} py-1`}
                        />
                        {row.added && (
                          <span className="text-xs text-[#38C976] block mt-1">
                            Added
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-[#B8C3CC]">
                        {row.type ? COMPANY_TYPE_LABELS[row.type] : '—'}
                      </td>
                      <td className="p-3 text-[#B8C3CC]">
                        {row.headquartersCountry ?? '—'}
                      </td>
                      <td className="p-3">
                        <EvidenceBadge evidence={row.iraqEvidence} />
                      </td>
                      <td className="p-3">
                        {row.source ? (
                          <a
                            href={row.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5DB4F2] hover:underline"
                          >
                            {row.source.title}
                          </a>
                        ) : (
                          <span className="text-[#B8C3CC]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={addingCompanies || tickedCompanyCount === 0}
                onClick={() => void handleAddSelectedCompanies()}
                className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] disabled:opacity-50 text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
              >
                {addingCompanies
                  ? 'Adding…'
                  : `Add selected (${tickedCompanyCount})`}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Step 2 — Find products */}
      <section className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#F2F5F8]">
              2. Find products
            </h2>
            <p className="text-xs text-[#B8C3CC]">
              Select a company and list its medicines sold in Iraq. Run it again
              per therapeutic area to get more products (up to 40 per search).
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-56">
              <Field label="Company">
                <select
                  value={selectedCompanyId}
                  onChange={(e) => {
                    setSelectedCompanyId(e.target.value);
                    setProductRows([]);
                    setProductNotes(null);
                    setProductSources([]);
                    setProductSuggestionsHtml(null);
                    setQueueFinished(false);
                  }}
                  disabled={findingProducts || draftingQueue}
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
            </div>
            <div className="w-56">
              <Field label="Therapeutic area (optional)">
                <input
                  type="text"
                  placeholder="e.g. Cardiology, Oncology"
                  value={therapeuticArea}
                  onChange={(e) => setTherapeuticArea(e.target.value)}
                  disabled={findingProducts || draftingQueue}
                  className={inputClass}
                />
              </Field>
            </div>
            <button
              type="button"
              disabled={findingProducts || draftingQueue || !selectedCompanyId}
              onClick={() => void handleFindProducts()}
              className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
            >
              {findingProducts ? 'Researching…' : 'Find products'}
            </button>
          </div>
        </div>

        {findingProducts && (
          <p className="text-xs text-[#F59E0B] font-medium">
            Researching… this can take up to 2 minutes
          </p>
        )}

        {productError && <Banner tone="error">{productError}</Banner>}

        {(productNotes ||
          productSources.length > 0 ||
          productSuggestionsHtml) && (
          <div className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3.5 space-y-2 text-xs">
            {productNotes && <p className="text-[#F2F5F8]">{productNotes}</p>}
            {productSources.length > 0 && (
              <div className="space-y-1">
                <div className="font-medium text-[#B8C3CC]">Sources:</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {productSources.map((src) => (
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
            {productSuggestionsHtml && (
              <iframe
                title="Google Search suggestions for company products"
                sandbox="allow-popups allow-popups-to-escape-sandbox"
                srcDoc={productSuggestionsHtml}
                className="w-full h-14 rounded border border-[#304451] bg-[#1F2D38]"
              />
            )}
          </div>
        )}

        {productRows.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-[#304451]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1F2D38] text-[#B8C3CC] border-b border-[#304451]">
                <tr>
                  <th className="p-3 w-10">Tick</th>
                  <th className="p-3">Brand (with strength)</th>
                  <th className="p-3">Generic</th>
                  <th className="p-3">Form</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Iraq Evidence</th>
                  <th className="p-3">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304451]">
                {productRows.map((row) => {
                  const done =
                    row.outcome.state === 'created' ||
                    row.outcome.state === 'exists';
                  return (
                    <tr key={row.localId} className="bg-[#263744]">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={row.selected}
                          disabled={done || draftingQueue}
                          onChange={(e) =>
                            setProductRows((prev) =>
                              prev.map((r) =>
                                r.localId === row.localId
                                  ? { ...r, selected: e.target.checked }
                                  : r
                              )
                            )
                          }
                          className="accent-[#1769AA]"
                        />
                      </td>
                      <td className="p-3 font-medium text-[#F2F5F8]">
                        {row.brandName}
                      </td>
                      <td className="p-3 text-[#B8C3CC]">
                        {row.genericName ?? '—'}
                      </td>
                      <td className="p-3 text-[#B8C3CC]">
                        {row.dosageForm || '—'}
                      </td>
                      <td className="p-3 text-[#B8C3CC]">
                        {row.category ? CATEGORY_LABELS[row.category] : '—'}
                      </td>
                      <td className="p-3">
                        <EvidenceBadge evidence={row.iraqEvidence} />
                      </td>
                      <td className="p-3">
                        {row.source ? (
                          <a
                            href={row.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5DB4F2] hover:underline"
                          >
                            {row.source.title}
                          </a>
                        ) : (
                          <span className="text-[#B8C3CC]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Step 3 — Draft all */}
      <section className="rounded-xl bg-[#263744] border border-[#304451] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#F2F5F8]">
              3. Draft all
            </h2>
            <p className="text-xs text-[#B8C3CC]">
              Researches each ticked product from official labeling and saves it
              as a draft. Nothing is published automatically.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {draftingQueue && (
              <button
                type="button"
                onClick={() => {
                  pausedRef.current = true;
                  setPaused(true);
                }}
                className={secondaryButtonClass}
              >
                Pause
              </button>
            )}
            {!draftingQueue && paused && tickedProductCount > 0 && (
              <button
                type="button"
                onClick={() => void runDraftQueue()}
                className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-semibold px-4 py-2.5 transition-colors"
              >
                Resume ({tickedProductCount})
              </button>
            )}
            <button
              type="button"
              disabled={draftingQueue || tickedProductCount === 0}
              onClick={() => void runDraftQueue()}
              className="rounded-md bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 transition-colors"
            >
              {draftingQueue
                ? 'Drafting…'
                : `Draft all (${tickedProductCount})`}
            </button>
          </div>
        </div>

        {draftingQueue && (
          <div className="text-xs text-[#F59E0B] font-medium space-y-1">
            <div>Keep this page open while drafting.</div>
            <div>Researching… this can take up to 2 minutes per product.</div>
          </div>
        )}

        {queueError && <Banner tone="error">{queueError}</Banner>}

        {hasAnyOutcomes && (
          <ul className="divide-y divide-[#304451] rounded-lg border border-[#304451] bg-[#1F2D38] text-xs">
            {productRows
              .filter((r) => r.outcome.state !== 'idle')
              .map((r) => {
                const o = r.outcome;
                return (
                  <li
                    key={r.localId}
                    className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-2"
                  >
                    <span className="font-medium text-[#F2F5F8]">
                      {r.brandName}
                    </span>
                    {o.state === 'drafting' && (
                      <span className="text-[#F59E0B]">
                        Researching… this can take up to 2 minutes
                      </span>
                    )}
                    {o.state === 'created' && (
                      <span className="text-[#38C976]">
                        ✓ Drafted
                        {o.missing.length > 0
                          ? ` (still missing: ${o.missing.join(', ')})`
                          : ''}
                      </span>
                    )}
                    {o.state === 'exists' && (
                      <span className="text-[#B8C3CC]">Already in catalog</span>
                    )}
                    {o.state === 'not_found' && (
                      <span className="text-[#F59E0B]">
                        Not found{o.notes ? ` — ${o.notes}` : ''}
                      </span>
                    )}
                    {o.state === 'failed' && (
                      <span className="text-[#F04438]">Failed: {o.reason}</span>
                    )}
                  </li>
                );
              })}
          </ul>
        )}

        {queueFinished && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#1F2D38] border border-[#304451] p-4">
            <span className="text-xs font-medium text-[#F2F5F8]">
              {createdDraftsCount} drafts ready for review
            </span>
            <button
              type="button"
              onClick={() => onOpenDraftsForReview(selectedCompanyId)}
              className="rounded-md bg-[#38C976] hover:bg-[#2F8F5C] text-[#1F2D38] text-xs font-semibold px-4 py-2 transition-colors"
            >
              Review drafts
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CATALOG_ID_CHUNK_SIZE,
  CATALOG_PAGE_SIZE,
  buildProductRouteHash,
  buildUpsertMarketArgs,
  fetchAllPages,
  fetchInChunksPaged,
  filterDoctorProducts,
  filterProductsByStatus,
  filterReviewDraftProducts,
  findMatchingTaxonomyOption,
  findNextCompanyWithDrafts,
  formatRpcError,
  getCompanyProductCounts,
  getProductSourceWarning,
  getReviewDraftSourceCounts,
  invokeAiDraftProduct,
  invokeAiFindCompanyProducts,
  invokeAiSuggestCompanies,
  isDomainOnlySourceUrl,
  loadAdminSponsoredAdStats,
  loadAdminTopSearches,
  loadAdminTopViewedProducts,
  loadDoctorHomeSuggestions,
  loadDoctorSponsoredAd,
  loadProductAiDraft,
  loadProductDetail,
  parseProductRoute,
  parsePublishChecklistErrors,
  publishCheckedProducts,
  recordCatalogSearchOnce,
  recordProductView,
  recordSponsoredAdEvent,
  rpcAdminArchiveCompany,
  rpcAdminEnsureGenericDrug,
  rpcAdminEnsureSpecialties,
  rpcAdminSaveAiProductDraft,
  rpcAdminSaveSponsoredAd,
  searchCatalogProducts,
  validateSponsoredAdForm,
  type CatalogProduct,
  type CompanySummary,
  type TaxonomyItem,
} from './catalog';

function sampleProduct(overrides: Partial<CatalogProduct> = {}): CatalogProduct {
  return {
    id: 'prod-1',
    companyId: 'comp-1',
    companyName: 'National Pharma',
    companyStatus: 'verified',
    genericDrugId: 'gen-1',
    genericNameEn: 'Amoxicillin',
    drugClassId: 'class-1',
    drugClassNameEn: 'Penicillins',
    category: 'prescription_drug',
    status: 'published',
    brandNameEn: 'Amoxil',
    market: null,
    marketTranslations: { en: null },
    specialtyIds: [],
    specialtyNamesEn: [],
    media: [],
    brochures: [],
    searchKeywords: [],
    submittedAt: '2026-06-19T10:00:00Z',
    reviewedAt: '2026-06-19T12:00:00Z',
    reviewReason: null,
    createdAt: '2026-06-19T09:00:00Z',
    updatedAt: '2026-06-19T12:00:00Z',
    ...overrides,
  };
}

describe('filterDoctorProducts', () => {
  const products = [
    sampleProduct(),
    sampleProduct({
      id: 'prod-2',
      companyId: 'comp-2',
      companyName: 'Baghdad Laboratories',
      genericDrugId: 'gen-2',
      genericNameEn: 'Paracetamol',
      drugClassId: 'class-2',
      drugClassNameEn: 'Analgesics',
      category: 'otc_drug',
      brandNameEn: 'Panadol',
    }),
  ];

  it('matches brand names, generic names, and company names', () => {
    expect(
      filterDoctorProducts(products, { query: 'amoxil', drugClassId: '', category: '' })
    ).toHaveLength(1);
    expect(
      filterDoctorProducts(products, { query: 'Paracetamol', drugClassId: '', category: '' })[0]?.id
    ).toBe('prod-2');
    expect(
      filterDoctorProducts(products, { query: 'National', drugClassId: '', category: '' })[0]?.id
    ).toBe('prod-1');
  });

  it('filters by drug class, category, and companyId', () => {
    expect(
      filterDoctorProducts(products, {
        query: '',
        drugClassId: 'class-2',
        category: 'otc_drug',
      }).map((p) => p.id)
    ).toEqual(['prod-2']);

    expect(
      filterDoctorProducts(products, {
        query: '',
        companyId: 'comp-1',
        drugClassId: '',
        category: '',
      }).map((p) => p.id)
    ).toEqual(['prod-1']);

    expect(
      filterDoctorProducts(products, {
        query: '',
        drugClassId: 'class-1',
        category: 'otc_drug',
      })
    ).toHaveLength(0);
  });
});

describe('publish checklist parsing and taxonomy matching', () => {
  it('maps publish validation codes in error details to readable checklist messages', () => {
    expect(
      parsePublishChecklistErrors({
        code: '23514',
        message: 'Product submission requirements are incomplete.',
        details: 'iraq_market_missing,english_iraq_content_missing,active_specialty_missing',
      })
    ).toEqual([
      'Iraq market details are missing',
      'English clinical information is incomplete (all 5 fields)',
      'Choose at least one specialty',
    ]);
  });

  it('matches existing taxonomy options case-insensitively or returns null for new names', () => {
    const items: TaxonomyItem[] = [
      { id: 'dc-1', code: 'sglt2_inhibitors', nameEn: 'SGLT2 Inhibitors', isActive: true },
      { id: 'dc-2', code: 'proton_pump_inhibitors', nameEn: 'Proton Pump Inhibitors', isActive: true },
    ];
    expect(findMatchingTaxonomyOption(items, ' sglt2 inhibitors ')?.id).toBe('dc-1');
    expect(findMatchingTaxonomyOption(items, 'SGLT2-Inhibitors')?.id).toBe('dc-1');
    expect(findMatchingTaxonomyOption(items, 'GLP-1 Receptor Agonists')).toBeNull();
    expect(findMatchingTaxonomyOption(items, '')).toBeNull();
  });
});

describe('AI draft and taxonomy ensure helpers', () => {
  it('invokes ai-draft-product and extracts FunctionsHttpError JSON error messages and quota flag', async () => {
    const okClient = {
      functions: {
        invoke: async (name: string, opts: { body: Record<string, unknown> }) => {
          expect(name).toBe('ai-draft-product');
          expect(opts.body).toEqual({
            productName: 'Forxiga 10 mg',
            companyName: 'AstraZeneca',
            extraContext: 'Film-coated tablets',
          });
          return {
            data: {
              draft: {
                found: true,
                brandName: 'Forxiga',
                category: 'prescription_drug',
                genericName: 'Dapagliflozin',
                activeIngredients: ['Dapagliflozin'],
                drugClass: 'SGLT2 Inhibitors',
                strength: '10 mg',
                dosageForm: 'Film-coated tablet',
                route: 'Oral',
                packSize: '28 tablets',
                clinical: {
                  approvedIndications: 'Type 2 diabetes mellitus',
                  usualAdultDose: '10 mg once daily',
                  contraindications: 'Hypersensitivity',
                  commonAdverseEffects: 'Genital mycotic infections',
                  storageConditions: 'Store below 30°C',
                },
                specialties: ['Endocrinology'],
                sources: [{ title: 'EMC SmPC', url: 'https://www.medicines.org.uk/' }],
                notes: null,
              },
              warnings: [],
              groundingSources: [],
              searchSuggestionsHtml: null,
              model: 'gemini-2.5-flash',
            },
            error: null,
          };
        },
      },
    } as unknown as SupabaseClient;

    const okRes = await invokeAiDraftProduct(okClient, {
      productName: ' Forxiga 10 mg ',
      companyName: ' AstraZeneca ',
      extraContext: ' Film-coated tablets ',
    });
    expect(okRes.ok).toBe(true);
    if (okRes.ok) {
      expect(okRes.data.draft.brandName).toBe('Forxiga');
      expect(okRes.data.draft.genericName).toBe('Dapagliflozin');
    }

    const quotaClient = {
      functions: {
        invoke: async () => ({
          data: null,
          error: {
            message: 'Edge Function returned a non-2xx status code',
            context: {
              json: async () => ({ error: 'Quota exceeded', quota: true }),
            },
          },
        }),
      },
    } as unknown as SupabaseClient;

    const quotaRes = await invokeAiDraftProduct(quotaClient, {
      productName: 'Forxiga 10 mg',
      companyName: 'AstraZeneca',
    });
    expect(quotaRes).toEqual({
      ok: false,
      message: 'The AI quota is used up for now. Try again later.',
      quota: true,
    });
  });

  it('invokes company and product discovery modes and saves AI product drafts', async () => {
    const calls: Array<{ type: string; name: string; payload: unknown }> = [];
    const client = {
      functions: {
        invoke: async (name: string, opts: { body: Record<string, unknown> }) => {
          calls.push({ type: 'fn', name, payload: opts.body });
          if (opts.body.mode === 'companies') {
            return {
              data: {
                items: [
                  {
                    legalName: 'Pioneer Co.',
                    companyType: 'manufacturer',
                    headquarters: 'Iraq',
                    iraqEvidence: 'confirmed',
                    notes: 'Sulaymaniyah plant',
                    sourceUrl: 'https://moh.gov.iq/',
                    sourceTitle: 'KIMADIA',
                  },
                ],
                notes: null,
                groundingSources: [],
                searchSuggestionsHtml: null,
                model: 'gemini-2.5-flash',
              },
              error: null,
            };
          }
          return {
            data: {
              items: [
                {
                  brandName: 'Concor',
                  genericName: 'Bisoprolol',
                  strength: '5 mg',
                  dosageForm: 'Film-coated tablet',
                  category: 'prescription_drug',
                  iraqEvidence: 'confirmed',
                  notes: null,
                  sourceUrl: 'https://www.medicines.org.uk/',
                  sourceTitle: 'EMC',
                },
              ],
              notes: null,
              groundingSources: [],
              searchSuggestionsHtml: null,
              model: 'gemini-2.5-flash',
            },
            error: null,
          };
        },
      },
      rpc: (fn: string, args: Record<string, unknown>) => {
        calls.push({ type: 'rpc', name: fn, payload: args });
        return {
          single: async () => ({
            data: {
              product_id: 'prod-new',
              outcome: 'created',
              missing: ['packSize'],
            },
            error: null,
          }),
        };
      },
      from: (table: string) => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data:
                table === 'product_ai_drafts'
                  ? {
                      model: 'gemini-2.5-flash',
                      draft: { notes: 'Verify storage' },
                      sources: [{ title: 'EMC', url: 'https://www.medicines.org.uk/' }],
                      created_at: '2026-10-31T10:00:00Z',
                    }
                  : null,
              error: null,
            }),
          }),
        }),
      }),
    } as unknown as SupabaseClient;

    const compRes = await invokeAiSuggestCompanies(client, {
      focus: ' Iraqi manufacturers ',
      exclude: ['AstraZeneca'],
    });
    expect(compRes.ok).toBe(true);

    const prodRes = await invokeAiFindCompanyProducts(client, {
      companyName: ' Merck ',
      therapeuticArea: ' Cardiology ',
      exclude: ['Glucophage'],
    });
    expect(prodRes.ok).toBe(true);

    const saveRes = await rpcAdminSaveAiProductDraft(client, {
      companyId: 'comp-1',
      draft: { found: true, brandName: 'Concor' } as never,
      sources: [{ title: 'EMC', url: 'https://www.medicines.org.uk/' }],
      model: 'gemini-2.5-flash',
    });
    expect(saveRes).toEqual({
      ok: true,
      data: {
        productId: 'prod-new',
        outcome: 'created',
        missing: ['packSize'],
      },
    });

    const loaded = await loadProductAiDraft(client, 'prod-new');
    expect(loaded?.model).toBe('gemini-2.5-flash');
    expect(loaded?.sources).toHaveLength(1);
  });

  it('calls admin_ensure_generic_drug, admin_ensure_specialties, and admin_archive_company', async () => {
    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        if (fn === 'admin_ensure_generic_drug') {
          return {
            single: async () => ({
              data: {
                drug_class_id: 'class-sglt2',
                generic_drug_id: 'gen-dapa',
                created: ['drug class: SGLT2 Inhibitors', 'generic drug: Dapagliflozin'],
              },
              error: null,
            }),
          };
        }
        if (fn === 'admin_archive_company') {
          return Promise.resolve({ data: null, error: null });
        }
        return Promise.resolve({
          data: [{ specialty_id: 'spec-endo', name: 'Endocrinology', created: true }],
          error: null,
        });
      },
    } as unknown as SupabaseClient;

    const taxRes = await rpcAdminEnsureGenericDrug(client, {
      drugClassName: 'SGLT2 Inhibitors',
      genericName: 'Dapagliflozin',
      ingredientNames: ['Dapagliflozin'],
    });
    expect(taxRes).toEqual({
      ok: true,
      data: {
        drugClassId: 'class-sglt2',
        genericDrugId: 'gen-dapa',
        created: ['drug class: SGLT2 Inhibitors', 'generic drug: Dapagliflozin'],
      },
    });

    const specRes = await rpcAdminEnsureSpecialties(client, ['Endocrinology']);
    expect(specRes).toEqual({
      ok: true,
      data: [{ specialtyId: 'spec-endo', name: 'Endocrinology', created: true }],
    });

    const archRes = await rpcAdminArchiveCompany(client, 'comp-tigris', 'Clear catalog');
    expect(archRes).toEqual({ ok: true, data: undefined });

    expect(rpcCalls).toEqual([
      {
        fn: 'admin_ensure_generic_drug',
        args: {
          p_drug_class_name: 'SGLT2 Inhibitors',
          p_generic_name: 'Dapagliflozin',
          p_ingredient_names: ['Dapagliflozin'],
        },
      },
      {
        fn: 'admin_ensure_specialties',
        args: {
          p_names: ['Endocrinology'],
        },
      },
      {
        fn: 'admin_archive_company',
        args: {
          p_company_id: 'comp-tigris',
          p_reason: 'Clear catalog',
        },
      },
    ]);
  });
});

describe('buildUpsertMarketArgs', () => {
  it('clears registration metadata when status is not_recorded', () => {
    const args = buildUpsertMarketArgs({
      productId: 'prod-1',
      strength: ' 500 mg ',
      dosageForm: ' Capsule ',
      route: ' Oral ',
      packSize: ' 20 capsules ',
      marketStatus: 'marketed_in_iraq',
      registrationStatus: 'not_recorded',
      registrationNumber: 'IQ-123',
      registrationAuthority: 'MOH Iraq',
      registrationExpiresOn: '2028-01-01',
    });

    expect(args).toEqual({
      p_product_id: 'prod-1',
      p_strength: '500 mg',
      p_dosage_form: 'Capsule',
      p_route: 'Oral',
      p_pack_size: '20 capsules',
      p_market_status: 'marketed_in_iraq',
      p_registration_status: 'not_recorded',
      p_registration_number: null,
      p_registration_authority: null,
      p_registration_expires_on: null,
    });
  });

  it('retains trimmed registration metadata when registered', () => {
    const args = buildUpsertMarketArgs({
      productId: 'prod-1',
      strength: '500 mg',
      dosageForm: 'Capsule',
      route: 'Oral',
      packSize: '20 capsules',
      marketStatus: 'marketed_in_iraq',
      registrationStatus: 'registered',
      registrationNumber: ' IQ-2026-009 ',
      registrationAuthority: ' KIMADIA / MOH ',
      registrationExpiresOn: '2029-12-31',
    });

    expect(args.p_registration_number).toBe('IQ-2026-009');
    expect(args.p_registration_authority).toBe('KIMADIA / MOH');
    expect(args.p_registration_expires_on).toBe('2029-12-31');
  });
});

describe('formatRpcError and filterProductsByStatus', () => {
  it('includes Postgres error details when present', () => {
    expect(
      formatRpcError({
        message: 'Product submission requirements are incomplete.',
        details: 'iraq_market_missing,active_specialty_missing',
      })
    ).toBe(
      'Product submission requirements are incomplete. (iraq_market_missing,active_specialty_missing)'
    );
  });

  it('filters products by status or returns all', () => {
    const items = [
      sampleProduct({ id: 'p1', status: 'draft' }),
      sampleProduct({ id: 'p2', status: 'submitted' }),
    ];
    expect(filterProductsByStatus(items, 'all')).toHaveLength(2);
    expect(filterProductsByStatus(items, 'submitted').map((i) => i.id)).toEqual(['p2']);
  });
});

describe('fetchAllPages and fetchInChunksPaged', () => {
  it('splits ID lists into chunks of 150 and pages each chunk with .range(from, from + 999) until fewer than 1000 rows return', async () => {
    expect(CATALOG_ID_CHUNK_SIZE).toBe(150);
    expect(CATALOG_PAGE_SIZE).toBe(1000);

    // 320 IDs -> 3 chunks: 150, 150, 20
    const allIds = Array.from({ length: 320 }, (_, i) => `prod-${i + 1}`);
    const recordedCalls: Array<{
      chunkLength: number;
      firstId: string;
      lastId: string;
      from: number;
      to: number;
    }> = [];

    // Simulate 8 rows per product in chunk 1 (150 * 8 = 1200 rows -> 1000 on page 1, 200 on page 2),
    // 2 rows per product in chunk 2 (300 rows -> 1 page),
    // and 2 rows per product in chunk 3 (40 rows -> 1 page).
    const rowsByChunkIndex = [
      Array.from({ length: 1200 }, (_, i) => ({ id: `c1-row-${i + 1}` })),
      Array.from({ length: 300 }, (_, i) => ({ id: `c2-row-${i + 1}` })),
      Array.from({ length: 40 }, (_, i) => ({ id: `c3-row-${i + 1}` })),
    ];

    const res = await fetchInChunksPaged<{ id: string }>(
      allIds,
      async (chunkIds, from, to) => {
        recordedCalls.push({
          chunkLength: chunkIds.length,
          firstId: chunkIds[0] ?? '',
          lastId: chunkIds[chunkIds.length - 1] ?? '',
          from,
          to,
        });
        const chunkIndex =
          chunkIds[0] === 'prod-1' ? 0 : chunkIds[0] === 'prod-151' ? 1 : 2;
        const source = rowsByChunkIndex[chunkIndex] ?? [];
        return {
          data: source.slice(from, to + 1),
          error: null,
        };
      }
    );

    expect(res.error).toBeNull();
    expect(res.data).toHaveLength(1540);
    expect(res.data[0]?.id).toBe('c1-row-1');
    expect(res.data[1199]?.id).toBe('c1-row-1200');
    expect(res.data[1200]?.id).toBe('c2-row-1');
    expect(res.data[1539]?.id).toBe('c3-row-40');

    expect(recordedCalls).toEqual([
      {
        chunkLength: 150,
        firstId: 'prod-1',
        lastId: 'prod-150',
        from: 0,
        to: 999,
      },
      {
        chunkLength: 150,
        firstId: 'prod-1',
        lastId: 'prod-150',
        from: 1000,
        to: 1999,
      },
      {
        chunkLength: 150,
        firstId: 'prod-151',
        lastId: 'prod-300',
        from: 0,
        to: 999,
      },
      {
        chunkLength: 20,
        firstId: 'prod-301',
        lastId: 'prod-320',
        from: 0,
        to: 999,
      },
    ]);
  });

  it('pages un-chunked list queries with .range(from, from + 999) until fewer than 1000 rows return', async () => {
    const totalRows = Array.from({ length: 2005 }, (_, i) => ({
      id: `item-${i + 1}`,
    }));
    const ranges: Array<[number, number]> = [];

    const res = await fetchAllPages<{ id: string }>(async (from, to) => {
      ranges.push([from, to]);
      return {
        data: totalRows.slice(from, to + 1),
        error: null,
      };
    });

    expect(res.error).toBeNull();
    expect(res.data).toHaveLength(2005);
    expect(ranges).toEqual([
      [0, 999],
      [1000, 1999],
      [2000, 2999],
    ]);
  });
});

describe('searchCatalogProducts and loadProductDetail', () => {
  it('calls search_catalog_products RPC with trimmed filters and normalizes total_count', async () => {
    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        return {
          data: [
            {
              product_id: 'prod-42',
              brand_name_en: 'Pentasa 500 mg',
              brand_name_ar: null,
              generic_name_en: 'Mesalazine',
              company_id: 'comp-ferring',
              company_name: 'Ferring Pharmaceuticals',
              drug_class_name_en: 'Aminosalicylates',
              category: 'prescription_drug',
              strength: '500 mg',
              dosage_form: 'Prolonged-release tablet',
              published_at: '2026-11-01T10:00:00Z',
              total_count: '134',
            },
          ],
          error: null,
        };
      },
    } as unknown as SupabaseClient;

    const res = await searchCatalogProducts(client, {
      query: '  pentasa  ',
      companyId: ' comp-ferring ',
      specialtyId: '',
      limit: 20,
      offset: 0,
    });

    expect(rpcCalls).toEqual([
      {
        fn: 'search_catalog_products',
        args: {
          p_query: 'pentasa',
          p_company_id: 'comp-ferring',
          p_specialty_id: null,
          p_limit: 20,
          p_offset: 0,
        },
      },
    ]);
    expect(res).toEqual({
      ok: true,
      data: {
        totalCount: 134,
        rows: [
          {
            productId: 'prod-42',
            brandNameEn: 'Pentasa 500 mg',
            genericNameEn: 'Mesalazine',
            companyId: 'comp-ferring',
            companyName: 'Ferring Pharmaceuticals',
            drugClassNameEn: 'Aminosalicylates',
            category: 'prescription_drug',
            strength: '500 mg',
            dosageForm: 'Prolonged-release tablet',
            publishedAt: '2026-11-01T10:00:00Z',
            totalCount: 134,
          },
        ],
      },
    });
  });

  it('loads a single product detail with .eq(product_id, id) queries without loading all products', async () => {
    const eqCalls: Array<{ table: string; column: string; value: unknown }> = [];
    const inCalls: Array<{ table: string; column: string; values: unknown[] }> = [];

    const client = {
      from: (table: string) => ({
        select: () => ({
          eq: (column: string, value: unknown) => {
            eqCalls.push({ table, column, value });
            if (table === 'products') {
              return {
                maybeSingle: async () => ({
                  data: {
                    id: 'prod-42',
                    company_id: 'comp-ferring',
                    generic_drug_id: 'gen-mesa',
                    drug_class_id: 'class-asa',
                    category: 'prescription_drug',
                    status: 'published',
                    submitted_at: '2026-11-01T08:00:00Z',
                    reviewed_at: '2026-11-01T10:00:00Z',
                    review_reason: null,
                    created_at: '2026-11-01T07:00:00Z',
                    updated_at: '2026-11-01T10:00:00Z',
                  },
                  error: null,
                }),
              };
            }
            if (table === 'companies') {
              return {
                maybeSingle: async () => ({
                  data: {
                    id: 'comp-ferring',
                    company_name: 'Ferring Pharmaceuticals',
                    status: 'verified',
                  },
                  error: null,
                }),
              };
            }
            if (table === 'product_translations') {
              return Promise.resolve({
                data: [
                  {
                    product_id: 'prod-42',
                    locale: 'en',
                    brand_name: 'Pentasa 500 mg',
                  },
                ],
                error: null,
              });
            }
            if (table === 'product_markets') {
              return Promise.resolve({
                data: [
                  {
                    id: 'mkt-42',
                    product_id: 'prod-42',
                    strength: '500 mg',
                    dosage_form: 'Prolonged-release tablet',
                    route: 'Oral',
                    pack_size: '100 tablets',
                    market_status: 'marketed_in_iraq',
                    registration_status: 'not_recorded',
                    registration_number: null,
                    registration_authority: null,
                    registration_expires_on: null,
                  },
                ],
                error: null,
              });
            }
            if (table === 'product_market_translations') {
              return Promise.resolve({
                data: [
                  {
                    product_market_id: 'mkt-42',
                    locale: 'en',
                    storage_conditions: 'Do not store above 25°C.',
                    approved_indications: 'Ulcerative colitis and Crohn disease.',
                    usualAdultDose: undefined,
                    usual_adult_dose: 'Up to 4 g daily in divided doses.',
                    contraindications: 'Severe renal or hepatic impairment.',
                    common_adverse_effects: 'Headache, diarrhoea, nausea.',
                  },
                ],
                error: null,
              });
            }
            if (table === 'product_specialties') {
              return Promise.resolve({
                data: [{ product_id: 'prod-42', specialty_id: 'spec-gastro' }],
                error: null,
              });
            }
            if (table === 'drug_class_translations') {
              return Promise.resolve({
                data: [
                  {
                    drug_class_id: 'class-asa',
                    locale: 'en',
                    name: 'Aminosalicylates',
                  },
                ],
                error: null,
              });
            }
            if (table === 'generic_drug_translations') {
              return Promise.resolve({
                data: [
                  {
                    generic_drug_id: 'gen-mesa',
                    locale: 'en',
                    name: 'Mesalazine',
                  },
                ],
                error: null,
              });
            }
            if (table === 'product_media') {
              return Promise.resolve({ data: [], error: null });
            }
            if (table === 'product_brochures') {
              return Promise.resolve({ data: [], error: null });
            }
            if (table === 'product_search_keywords') {
              return Promise.resolve({
                data: [
                  {
                    product_id: 'prod-42',
                    locale: 'en',
                    keyword: '5-ASA',
                    keyword_type: 'synonym',
                  },
                ],
                error: null,
              });
            }
            return Promise.resolve({ data: [], error: null });
          },
          in: (column: string, values: unknown[]) => {
            inCalls.push({ table, column, values });
            if (table === 'specialty_translations') {
              return Promise.resolve({
                data: [
                  {
                    specialty_id: 'spec-gastro',
                    locale: 'en',
                    name: 'Gastroenterology',
                  },
                ],
                error: null,
              });
            }
            return Promise.resolve({ data: [], error: null });
          },
        }),
      }),
    } as unknown as SupabaseClient;

    const res = await loadProductDetail(client, ' prod-42 ');
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.id).toBe('prod-42');
      expect(res.data.brandNameEn).toBe('Pentasa 500 mg');
      expect(res.data.genericNameEn).toBe('Mesalazine');
      expect(res.data.drugClassNameEn).toBe('Aminosalicylates');
      expect(res.data.companyName).toBe('Ferring Pharmaceuticals');
      expect(res.data.specialtyNamesEn).toEqual(['Gastroenterology']);
      expect(res.data.market?.strength).toBe('500 mg');
      expect(res.data.marketTranslations.en?.approvedIndications).toBe(
        'Ulcerative colitis and Crohn disease.'
      );
      expect(res.data.searchKeywords).toEqual(['5-ASA']);
    }

    expect(eqCalls).toContainEqual({
      table: 'product_translations',
      column: 'product_id',
      value: 'prod-42',
    });
    expect(eqCalls).toContainEqual({
      table: 'product_markets',
      column: 'product_id',
      value: 'prod-42',
    });
    expect(eqCalls).toContainEqual({
      table: 'product_market_translations',
      column: 'product_market_id',
      value: 'mkt-42',
    });
    expect(inCalls).toEqual([
      {
        table: 'specialty_translations',
        column: 'specialty_id',
        values: ['spec-gastro'],
      },
    ]);
  });
});

describe('Admin Review Drafts helpers', () => {
  it('detects missing and domain-only source warnings', () => {
    expect(isDomainOnlySourceUrl('https://samarrapharma.com')).toBe(true);
    expect(isDomainOnlySourceUrl('https://samarrapharma.com/')).toBe(true);
    expect(isDomainOnlySourceUrl('https://www.medicines.org.uk/emc/product/1234/smpc')).toBe(false);
    expect(isDomainOnlySourceUrl('https://example.com/?drug=amoxil')).toBe(false);

    expect(getProductSourceWarning(undefined)).toBe('No source');
    expect(getProductSourceWarning([])).toBe('No source');
    expect(
      getProductSourceWarning([
        { url: 'https://samarrapharma.com/', title: 'Home' },
        { url: 'https://pioneerpharma.iq', title: 'Pioneer' },
      ])
    ).toBe('Weak source: company home page only');
    expect(
      getProductSourceWarning([
        { url: 'https://samarrapharma.com/', title: 'Home' },
        { url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/zarzio', title: 'EMA EPAR' },
      ])
    ).toBeNull();
  });

  it('computes drafts, published, and archived counts per company', () => {
    const products = [
      { id: '1', companyId: 'c1', status: 'draft' },
      { id: '2', companyId: 'c1', status: 'changes_requested' },
      { id: '3', companyId: 'c1', status: 'submitted' },
      { id: '4', companyId: 'c1', status: 'published' },
      { id: '5', companyId: 'c1', status: 'archived' },
      { id: '6', companyId: 'c2', status: 'published' },
    ] as unknown as CatalogProduct[];

    expect(getCompanyProductCounts(products, 'c1')).toEqual({
      drafts: 2,
      published: 1,
      archived: 1,
    });
    expect(getCompanyProductCounts(products, 'c2')).toEqual({
      drafts: 0,
      published: 1,
      archived: 0,
    });
  });

  it('publishCheckedProducts calls submit_product_for_review then admin_publish_product sequentially and reports progress and errors', async () => {
    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const progressEvents: Array<{
      currentIndex: number;
      total: number;
      brandNameEn: string;
    }> = [];

    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        if (fn === 'submit_product_for_review' && args.p_product_id === 'prod-2') {
          return {
            data: null,
            error: {
              message: 'Publish checklist failed',
              details: 'missing_approved_indications_en',
            },
          };
        }
        if (fn === 'admin_publish_product' && args.p_product_id === 'prod-3') {
          return {
            data: null,
            error: {
              message: 'Publish checklist failed',
              details: 'company_not_verified',
            },
          };
        }
        return { data: args.p_product_id, error: null };
      },
    } as unknown as SupabaseClient;

    const summary = await publishCheckedProducts(
      client,
      [
        { id: 'prod-1', brandNameEn: 'Atoris 10 mg', status: 'draft' },
        { id: 'prod-2', brandNameEn: 'Nolpaza 20 mg', status: 'draft' },
        { id: 'prod-3', brandNameEn: 'Lorista 50 mg', status: 'changes_requested' },
      ],
      {
        onProgress: (currentIndex, total, item) => {
          progressEvents.push({
            currentIndex,
            total,
            brandNameEn: item.brandNameEn,
          });
        },
      }
    );

    expect(rpcCalls).toEqual([
      { fn: 'submit_product_for_review', args: { p_product_id: 'prod-1' } },
      { fn: 'admin_publish_product', args: { p_product_id: 'prod-1' } },
      { fn: 'submit_product_for_review', args: { p_product_id: 'prod-2' } },
      { fn: 'submit_product_for_review', args: { p_product_id: 'prod-3' } },
      { fn: 'admin_publish_product', args: { p_product_id: 'prod-3' } },
    ]);

    expect(progressEvents).toEqual([
      { currentIndex: 1, total: 3, brandNameEn: 'Atoris 10 mg' },
      { currentIndex: 2, total: 3, brandNameEn: 'Nolpaza 20 mg' },
      { currentIndex: 3, total: 3, brandNameEn: 'Lorista 50 mg' },
    ]);

    expect(summary).toEqual({
      publishedCount: 1,
      failedCount: 2,
      results: [
        {
          id: 'prod-1',
          brandNameEn: 'Atoris 10 mg',
          ok: true,
        },
        {
          id: 'prod-2',
          brandNameEn: 'Nolpaza 20 mg',
          ok: false,
          message: 'Publish checklist failed (missing_approved_indications_en)',
        },
        {
          id: 'prod-3',
          brandNameEn: 'Lorista 50 mg',
          ok: false,
          message: 'Publish checklist failed (company_not_verified)',
          reasons: ['Company is not active'],
        },
      ],
    });
  });

  it('parses and formats #/product/<id> routes and loads doctor_home_suggestions', async () => {
    expect(parseProductRoute('#/product/123e4567-e89b-12d3-a456-426614174000')).toBe(
      '123e4567-e89b-12d3-a456-426614174000'
    );
    expect(parseProductRoute('/product/prod-abc/')).toBe('prod-abc');
    expect(parseProductRoute('#/catalog')).toBeNull();
    expect(parseProductRoute('#/product/')).toBeNull();
    expect(parseProductRoute('')).toBeNull();
    expect(buildProductRouteHash('prod-123')).toBe('#/product/prod-123');

    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        return {
          data: [
            {
              product_id: 'prod-1',
              brand_name_en: 'Concor 5 mg',
              generic_name_en: 'Bisoprolol',
              company_id: 'comp-1',
              company_name: 'Merck',
              drug_class_name_en: 'Beta Blockers',
              category: 'prescription_drug',
              strength: '5 mg',
              dosage_form: 'Film-coated tablet',
              specialty_id: 'spec-1',
              specialty_name: 'Cardiology',
            },
            {
              product_id: 'prod-2',
              brand_name_en: 'Entresto 100 mg',
              generic_name_en: 'Sacubitril / Valsartan',
              company_id: 'comp-2',
              company_name: 'Novartis',
              drug_class_name_en: 'ARNI',
              category: 'prescription_drug',
              strength: '100 mg',
              dosage_form: 'Film-coated tablet',
              specialty_id: 'spec-1',
              specialty_name: 'Cardiology',
            },
          ],
          error: null,
        };
      },
    } as unknown as SupabaseClient;

    const res = await loadDoctorHomeSuggestions(client, 2);
    expect(rpcCalls).toEqual([
      { fn: 'doctor_home_suggestions', args: { p_limit: 2, p_seed: 0 } },
    ]);
    expect(res).toEqual({
      ok: true,
      data: [
        {
          productId: 'prod-1',
          brandNameEn: 'Concor 5 mg',
          genericNameEn: 'Bisoprolol',
          companyId: 'comp-1',
          companyName: 'Merck',
          drugClassNameEn: 'Beta Blockers',
          category: 'prescription_drug',
          strength: '5 mg',
          dosageForm: 'Film-coated tablet',
          specialtyId: 'spec-1',
          specialtyName: 'Cardiology',
        },
        {
          productId: 'prod-2',
          brandNameEn: 'Entresto 100 mg',
          genericNameEn: 'Sacubitril / Valsartan',
          companyId: 'comp-2',
          companyName: 'Novartis',
          drugClassNameEn: 'ARNI',
          category: 'prescription_drug',
          strength: '100 mg',
          dosageForm: 'Film-coated tablet',
          specialtyId: 'spec-1',
          specialtyName: 'Cardiology',
        },
      ],
    });
  });

  it('filters review drafts by source readiness and search query and finds next company with drafts', () => {
    const drafts = [
      sampleProduct({
        id: 'd1',
        companyId: 'c1',
        status: 'draft',
        brandNameEn: 'Cozaar 50 mg',
        genericNameEn: 'Losartan',
        drugClassNameEn: 'Angiotensin II Receptor Blockers',
        aiSources: [
          {
            title: 'UK eMC — Cozaar',
            url: 'https://www.medicines.org.uk/emc/search?q=Cozaar',
          },
        ],
      }),
      sampleProduct({
        id: 'd2',
        companyId: 'c1',
        status: 'draft',
        brandNameEn: 'Singulair 10 mg',
        genericNameEn: 'Montelukast',
        drugClassNameEn: 'Leukotriene Receptor Antagonists',
        aiSources: [{ title: 'Organon Home', url: 'https://www.organon.com/' }],
      }),
      sampleProduct({
        id: 'd3',
        companyId: 'c1',
        status: 'changes_requested',
        brandNameEn: 'Arcoxia 90 mg',
        genericNameEn: 'Etoricoxib',
        drugClassNameEn: 'COX-2 Inhibitors',
        aiSources: [],
      }),
    ];

    expect(getReviewDraftSourceCounts(drafts)).toEqual({
      all: 3,
      ready: 1,
      warnings: 2,
    });

    expect(
      filterReviewDraftProducts(drafts, {}, { sourceFilter: 'ready' }).map(
        (p) => p.id
      )
    ).toEqual(['d1']);

    expect(
      filterReviewDraftProducts(drafts, {}, { sourceFilter: 'warnings' }).map(
        (p) => p.id
      )
    ).toEqual(['d2', 'd3']);

    expect(
      filterReviewDraftProducts(
        drafts,
        {},
        { query: 'montelukast', sourceFilter: 'all' }
      ).map((p) => p.id)
    ).toEqual(['d2']);

    const companies: CompanySummary[] = [
      { id: 'c1', companyName: 'Organon', status: 'verified' },
      { id: 'c2', companyName: 'Pfizer', status: 'verified' },
      { id: 'c3', companyName: 'Viatris', status: 'verified' },
    ];
    const allProducts = [
      ...drafts,
      sampleProduct({ id: 'p1', companyId: 'c2', status: 'published' }),
      sampleProduct({ id: 'v1', companyId: 'c3', status: 'draft' }),
      sampleProduct({ id: 'v2', companyId: 'c3', status: 'draft' }),
    ];

    expect(findNextCompanyWithDrafts(companies, allProducts, 'c1')).toEqual({
      company: companies[2],
      drafts: 2,
    });
    expect(findNextCompanyWithDrafts(companies, allProducts, 'c3')).toEqual({
      company: companies[0],
      drafts: 3,
    });
  });

  it('validates sponsored ad form input rules', () => {
    const valid = validateSponsoredAdForm({
      adId: null,
      sponsorName: 'AstraZeneca',
      title: 'Forxiga 10 mg — Heart Failure & CKD Indication',
      body: 'Approved for symptomatic chronic heart failure and chronic kidney disease in adults.',
      imageUrl: 'https://www.astrazeneca.com/banner.png',
      linkUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
      companyId: 'comp-1',
      targetSpecialtyId: 'spec-1',
      startsOn: '2026-11-04',
      endsOn: '2026-12-31',
      isActive: true,
      priority: 50,
    });
    expect(valid).toEqual([]);

    const missingRequired = validateSponsoredAdForm({
      sponsorName: '   ',
      title: '',
      body: '',
      imageUrl: '',
      linkUrl: '',
      companyId: null,
      targetSpecialtyId: null,
      startsOn: '2026-11-04',
      endsOn: '',
      isActive: true,
      priority: 0,
    });
    expect(missingRequired).toContain('Sponsor name is required.');
    expect(missingRequired).toContain('Title is required.');

    const limitsAndUrls = validateSponsoredAdForm({
      sponsorName: 'S'.repeat(81),
      title: 'T'.repeat(81),
      body: 'B'.repeat(281),
      imageUrl: 'http://insecure.example.com/ad.png',
      linkUrl: 'ftp://example.com/doc',
      companyId: null,
      targetSpecialtyId: null,
      startsOn: '2026-11-10',
      endsOn: '2026-11-04',
      isActive: true,
      priority: 120,
    });
    expect(limitsAndUrls).toEqual([
      'Sponsor name must be 80 characters or fewer.',
      'Title must be 80 characters or fewer.',
      'Body must be 280 characters or fewer.',
      'Image URL must start with https:// and contain no spaces.',
      'Link URL must start with https:// and contain no spaces.',
      'End date cannot be before start date.',
      'Priority must be a whole number between 0 and 100.',
    ]);
  });

  it('records catalog search only once per final query and ignores queries shorter than 2 characters', async () => {
    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        return { data: null, error: null };
      },
    } as unknown as SupabaseClient;

    const tracker = { lastQuery: null as string | null };

    // 1-char query is ignored
    expect(await recordCatalogSearchOnce(client, 'a', 10, tracker)).toBe(false);
    expect(rpcCalls).toHaveLength(0);

    // First final query >= 2 chars is recorded once
    expect(await recordCatalogSearchOnce(client, '  Concor  ', 3, tracker)).toBe(
      true
    );
    expect(rpcCalls).toEqual([
      {
        fn: 'record_catalog_search',
        args: { p_query: 'Concor', p_result_count: 3 },
      },
    ]);

    // Repeat with same normalized query (e.g. Load more or filter toggle) does not record again
    expect(await recordCatalogSearchOnce(client, 'concor', 3, tracker)).toBe(
      false
    );
    expect(rpcCalls).toHaveLength(1);

    // Different final query is recorded
    expect(await recordCatalogSearchOnce(client, 'Entresto', 0, tracker)).toBe(
      true
    );
    expect(rpcCalls).toHaveLength(2);
    expect(rpcCalls[1]).toEqual({
      fn: 'record_catalog_search',
      args: { p_query: 'Entresto', p_result_count: 0 },
    });
  });

  it('loads doctor_sponsored_ad, fires ad/product events, saves admin ads, and loads usage stats', async () => {
    const rpcCalls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcCalls.push({ fn, args });
        if (fn === 'doctor_sponsored_ad') {
          return {
            data: [
              {
                ad_id: 'ad-1',
                sponsor_name: 'AstraZeneca',
                title: 'Forxiga 10 mg',
                body: 'SGLT2 inhibitor',
                image_url: 'https://www.astrazeneca.com/forxiga.png',
                link_url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
              },
            ],
            error: null,
          };
        }
        if (fn === 'admin_save_sponsored_ad') {
          return {
            data: {
              id: 'ad-1',
              sponsor_name: 'AstraZeneca',
              title: 'Forxiga 10 mg',
              body: 'SGLT2 inhibitor',
              image_url: 'https://www.astrazeneca.com/forxiga.png',
              link_url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
              company_id: 'comp-1',
              target_specialty_id: null,
              starts_on: '2026-11-04',
              ends_on: null,
              is_active: true,
              priority: 10,
              created_at: '2026-11-04T10:00:00Z',
              updated_at: '2026-11-04T10:00:00Z',
            },
            error: null,
          };
        }
        if (fn === 'admin_sponsored_ad_stats') {
          return {
            data: [
              {
                ad_id: 'ad-1',
                title: 'Forxiga 10 mg',
                sponsor_name: 'AstraZeneca',
                is_active: true,
                views: 42,
                clicks: 7,
              },
            ],
            error: null,
          };
        }
        if (fn === 'admin_top_searches') {
          return {
            data: [
              { query: 'ozempic', searches: 12, zero_result_searches: 12 },
              { query: 'concor', searches: 9, zero_result_searches: 0 },
            ],
            error: null,
          };
        }
        if (fn === 'admin_top_viewed_products') {
          return {
            data: [
              {
                product_id: 'prod-1',
                brand_name_en: 'Concor 5 mg',
                company_name: 'Merck',
                views: 19,
              },
            ],
            error: null,
          };
        }
        return { data: null, error: null };
      },
    } as unknown as SupabaseClient;

    const adRes = await loadDoctorSponsoredAd(client, 3);
    expect(adRes).toEqual({
      adId: 'ad-1',
      sponsorName: 'AstraZeneca',
      title: 'Forxiga 10 mg',
      body: 'SGLT2 inhibitor',
      imageUrl: 'https://www.astrazeneca.com/forxiga.png',
      linkUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
    });

    await recordSponsoredAdEvent(client, 'ad-1', 'view');
    await recordSponsoredAdEvent(client, 'ad-1', 'click');
    await recordProductView(client, 'prod-1');

    const saveRes = await rpcAdminSaveSponsoredAd(client, {
      adId: null,
      sponsorName: 'AstraZeneca',
      title: 'Forxiga 10 mg',
      body: 'SGLT2 inhibitor',
      imageUrl: 'https://www.astrazeneca.com/forxiga.png',
      linkUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
      companyId: 'comp-1',
      targetSpecialtyId: null,
      startsOn: '2026-11-04',
      endsOn: '',
      isActive: true,
      priority: 10,
    });
    expect(saveRes).toEqual({
      ok: true,
      data: {
        id: 'ad-1',
        sponsorName: 'AstraZeneca',
        title: 'Forxiga 10 mg',
        body: 'SGLT2 inhibitor',
        imageUrl: 'https://www.astrazeneca.com/forxiga.png',
        linkUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/forxiga',
        companyId: 'comp-1',
        targetSpecialtyId: null,
        startsOn: '2026-11-04',
        endsOn: null,
        isActive: true,
        priority: 10,
        createdAt: '2026-11-04T10:00:00Z',
        updatedAt: '2026-11-04T10:00:00Z',
      },
    });

    const statsRes = await loadAdminSponsoredAdStats(client, 30);
    expect(statsRes).toEqual({
      ok: true,
      data: [
        {
          adId: 'ad-1',
          title: 'Forxiga 10 mg',
          sponsorName: 'AstraZeneca',
          isActive: true,
          views: 42,
          clicks: 7,
        },
      ],
    });

    const searchesRes = await loadAdminTopSearches(client, 30, 50);
    expect(searchesRes).toEqual({
      ok: true,
      data: [
        { query: 'ozempic', searches: 12, zeroResultSearches: 12 },
        { query: 'concor', searches: 9, zeroResultSearches: 0 },
      ],
    });

    const viewedRes = await loadAdminTopViewedProducts(client, 30, 50);
    expect(viewedRes).toEqual({
      ok: true,
      data: [
        {
          productId: 'prod-1',
          brandNameEn: 'Concor 5 mg',
          companyName: 'Merck',
          views: 19,
        },
      ],
    });
  });
});
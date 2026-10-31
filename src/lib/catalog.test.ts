import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  buildUpsertMarketArgs,
  filterDoctorProducts,
  filterProductsByStatus,
  findMatchingTaxonomyOption,
  formatRpcError,
  invokeAiDraftProduct,
  parsePublishChecklistErrors,
  rpcAdminEnsureGenericDrug,
  rpcAdminEnsureSpecialties,
  type CatalogProduct,
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
    marketTranslations: { en: null, ar: null },
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
  it('invokes ai-draft-product and extracts FunctionsHttpError JSON error messages', async () => {
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
                brandNameAr: 'فورسيجا',
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

    const errClient = {
      functions: {
        invoke: async () => ({
          data: null,
          error: {
            message: 'Edge Function returned a non-2xx status code',
            context: {
              json: async () => ({ error: 'Gemini quota exceeded. Try again in a minute.' }),
            },
          },
        }),
      },
    } as unknown as SupabaseClient;

    const errRes = await invokeAiDraftProduct(errClient, {
      productName: 'Forxiga 10 mg',
      companyName: 'AstraZeneca',
    });
    expect(errRes).toEqual({
      ok: false,
      message: 'Gemini quota exceeded. Try again in a minute.',
    });
  });

  it('calls admin_ensure_generic_drug and admin_ensure_specialties and surfaces errors as-is', async () => {
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

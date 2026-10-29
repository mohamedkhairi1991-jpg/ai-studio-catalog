import { describe, expect, it } from 'vitest';
import {
  buildUpsertMarketArgs,
  filterDoctorProducts,
  filterProductsByStatus,
  formatRpcError,
  type CatalogProduct,
} from './catalog';

function sampleProduct(overrides: Partial<CatalogProduct> = {}): CatalogProduct {
  return {
    id: 'prod-1',
    companyId: 'comp-1',
    companyName: 'Al-Mansour Pharma',
    companyStatus: 'verified',
    genericDrugId: 'gen-1',
    genericNameEn: 'Amoxicillin',
    genericNameAr: 'أموكسيسيلين',
    drugClassId: 'class-1',
    drugClassNameEn: 'Penicillins',
    drugClassNameAr: 'البنسلينات',
    category: 'prescription_drug',
    status: 'published',
    brandNameEn: 'Amoxicare',
    brandNameAr: 'أموكسي كير',
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
      companyName: 'Tigris Therapeutics',
      genericDrugId: 'gen-2',
      genericNameEn: 'Paracetamol',
      genericNameAr: 'باراسيتامول',
      drugClassId: 'class-2',
      drugClassNameEn: 'Analgesics',
      category: 'otc_drug',
      brandNameEn: 'Tigridol',
      brandNameAr: 'تيجريدول',
    }),
  ];

  it('matches English and Arabic brand names, generic names, and company names', () => {
    expect(
      filterDoctorProducts(products, { query: 'amoxicare', drugClassId: '', category: '' })
    ).toHaveLength(1);
    expect(
      filterDoctorProducts(products, { query: 'تيجريدول', drugClassId: '', category: '' })[0]?.id
    ).toBe('prod-2');
    expect(
      filterDoctorProducts(products, { query: 'Paracetamol', drugClassId: '', category: '' })[0]?.id
    ).toBe('prod-2');
    expect(
      filterDoctorProducts(products, { query: 'Al-Mansour', drugClassId: '', category: '' })[0]?.id
    ).toBe('prod-1');
  });

  it('filters by drug class and category', () => {
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
        drugClassId: 'class-1',
        category: 'otc_drug',
      })
    ).toHaveLength(0);
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

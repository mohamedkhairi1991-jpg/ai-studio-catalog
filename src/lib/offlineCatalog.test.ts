import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CHECK_EVERY_MS,
  isNetworkErrorMessage,
  mergeOfflinePayload,
  normalizeSearchText,
  offlineProductDetail,
  searchOfflineCatalog,
  setOfflineCatalogForTests,
  syncOfflineCatalog,
  type OfflineCatalog,
  type OfflineProduct,
} from './offlineCatalog';

function product(id: string, brand: string, extra: Partial<OfflineProduct> = {}): OfflineProduct {
  return {
    id,
    companyId: 'c1',
    category: 'prescription_drug',
    brand,
    nBrand: normalizeSearchText(brand),
    ...extra,
  };
}

const catalog: OfflineCatalog = {
  version: 'v1',
  generatedAt: '2026-11-20T10:00:00Z',
  fullAt: 0,
  checkedAt: 0,
  products: [
    product('p1', 'Panadol 500 mg', {
      generic: 'Paracetamol',
      nGeneric: 'paracetamol',
      nIngredients: 'paracetamol',
      nClass: 'analgesics',
      specialtyIds: ['s1'],
      dose: '1 tablet every 6 hours',
      strength: '500 mg',
    }),
    product('p2', 'Ventolin Inhaler', {
      companyId: 'c2',
      generic: 'Salbutamol',
      nGeneric: 'salbutamol',
      nIngredients: 'salbutamol',
      nClass: 'bronchodilators',
      specialtyIds: ['s2'],
    }),
    product('p3', 'Augmentin 1 g', { nGeneric: 'amoxicillin clavulanic acid', nIngredients: 'amoxicillin clavulanic acid' }),
  ],
  companies: [
    { id: 'c1', name: 'GSK', originCountryCode: 'GB' },
    { id: 'c2', name: 'Glaxo Iraq Office' },
  ],
  specialties: [
    { id: 's1', name: 'General Practice' },
    { id: 's2', name: 'Pulmonology' },
  ],
  synonyms: [['albuterol', 'salbutamol']],
};

describe('offline search', () => {
  it('normalizes like the server', () => {
    expect(normalizeSearchText('  Pánadol-500mg! ')).toBe('panadol 500mg');
    expect(normalizeSearchText('%%')).toBe('');
  });

  it('finds by brand, generic, synonym and several words', () => {
    expect(searchOfflineCatalog(catalog, { query: 'pana' }).rows.map((r) => r.productId)).toEqual(['p1']);
    expect(searchOfflineCatalog(catalog, { query: 'salbutamol' }).rows[0].productId).toBe('p2');
    expect(searchOfflineCatalog(catalog, { query: 'albuterol' }).rows[0].productId).toBe('p2');
    expect(searchOfflineCatalog(catalog, { query: 'amoxicillin clav' }).rows[0].productId).toBe('p3');
  });

  it('puts brand matches first and fills company names', () => {
    const res = searchOfflineCatalog(catalog, { query: 'ventolin' });
    expect(res.rows[0]).toMatchObject({ productId: 'p2', companyName: 'Glaxo Iraq Office', matchKind: 'exact' });
    expect(res.totalCount).toBe(1);
    expect(res.closeMatches).toBe(false);
  });

  it('shows close spellings when nothing matches exactly', () => {
    const res = searchOfflineCatalog(catalog, { query: 'panadool' });
    expect(res.rows.map((r) => r.productId)).toEqual(['p1']);
    expect(res.closeMatches).toBe(true);
  });

  it('filters by company and specialty, pages, and ignores symbols-only text', () => {
    expect(searchOfflineCatalog(catalog, { companyId: 'c2' }).rows.map((r) => r.productId)).toEqual(['p2']);
    expect(searchOfflineCatalog(catalog, { specialtyId: 's1' }).rows.map((r) => r.productId)).toEqual(['p1']);
    const page = searchOfflineCatalog(catalog, { limit: 1, offset: 1 });
    expect(page.rows.map((r) => r.productId)).toEqual(['p1']);
    expect(page.totalCount).toBe(3);
    expect(searchOfflineCatalog(catalog, { query: '%%' }).rows).toEqual([]);
  });
});

describe('offline drug page', () => {
  it('builds the drug page from the saved catalog', () => {
    const detail = offlineProductDetail(catalog, 'p1', (code) => (code === 'GB' ? 'United Kingdom' : null));
    expect(detail).toMatchObject({
      brandNameEn: 'Panadol 500 mg',
      companyName: 'GSK',
      companyOriginCountryName: 'United Kingdom',
      genericNameEn: 'Paracetamol',
      specialtyNamesEn: ['General Practice'],
      status: 'published',
    });
    expect(detail?.market?.strength).toBe('500 mg');
    expect(detail?.marketTranslations.en?.usualAdultDose).toBe('1 tablet every 6 hours');
    expect(offlineProductDetail(catalog, 'nope', () => null)).toBeNull();
  });
});

describe('offline download', () => {
  it('merges change-only updates and drops removed drugs', () => {
    const merged = mergeOfflinePayload(
      catalog,
      {
        version: 'v2',
        generatedAt: '2026-11-21T10:00:00Z',
        products: [product('p2', 'Ventolin Evohaler', { companyId: 'c2' }), product('p4', 'Zyrtec 10 mg')],
        allIds: ['p2', 'p3', 'p4'],
      },
      123
    );
    expect(merged.version).toBe('v2');
    expect(merged.fullAt).toBe(0);
    expect(merged.checkedAt).toBe(123);
    expect(merged.products.map((p) => p.id).sort()).toEqual(['p2', 'p3', 'p4']);
    expect(merged.products.find((p) => p.id === 'p2')?.brand).toBe('Ventolin Evohaler');
    expect(merged.companies).toEqual(catalog.companies);
  });

  it('recognises "no connection" errors', () => {
    expect(isNetworkErrorMessage('TypeError: Failed to fetch')).toBe(true);
    expect(isNetworkErrorMessage('Load failed')).toBe(true);
    expect(isNetworkErrorMessage('Only approved doctors can download the catalog.')).toBe(false);
  });

  it('checks the version at most every 6 hours and downloads only changes', async () => {
    const calls: Array<{ fn: string; args?: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args?: Record<string, unknown>) => {
        calls.push({ fn, args });
        if (fn === 'get_offline_catalog_version') return { data: 'v9', error: null };
        return {
          data: { version: 'v9', generatedAt: '2026-11-22T10:00:00Z', products: [], allIds: ['p1', 'p2', 'p3'] },
          error: null,
        };
      },
    } as unknown as SupabaseClient;

    const now = Date.now();
    setOfflineCatalogForTests({ ...catalog, fullAt: now, checkedAt: now });
    expect(await syncOfflineCatalog(client, { now: now + 1000 })).toBe('skipped');
    expect(calls).toEqual([]);

    expect(await syncOfflineCatalog(client, { now: now + CHECK_EVERY_MS + 1 })).toBe('updated');
    expect(calls.map((c) => c.fn)).toEqual(['get_offline_catalog_version', 'get_offline_catalog_changes']);
    expect(typeof calls[1].args?.p_since).toBe('string');

    setOfflineCatalogForTests(null);
    calls.length = 0;
    expect(await syncOfflineCatalog(client, { now })).toBe('downloaded');
    expect(calls[1]).toEqual({ fn: 'get_offline_catalog_changes', args: { p_since: null } });
  });
});

import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_DIRECTORY_ROUTE,
  adminAddCompanyMedia,
  adminUpdateCompanyPage,
  buildCompanyRouteHash,
  checkCompanyImage,
  companyFacts,
  groupCompanyProducts,
  loadCompanyDirectory,
  loadCompanyPage,
  parseCompanyPage,
  parseCompanyRoute,
} from './companyPage';

const RAW = {
  company: {
    id: 'c1',
    name: 'Novartis',
    legal_name: 'Novartis Pharma AG',
    company_type: 'manufacturer',
    origin_country_code: 'CH',
    tagline: 'Reimagining medicine',
    description: 'Swiss company.',
    founded_year: 1996,
    website_url: 'https://www.novartis.com',
    contact_email: null,
    contact_phone: null,
    logo_path: 'c1/logo-1.png',
    cover_path: null,
  },
  agents: [{ id: 'a1', name: 'Noor Scientific Office' }],
  represents: [],
  gallery: [{ id: 'm1', storage_path: 'c1/gallery-1.jpg', caption: 'Basel campus' }],
  feature: { id: 'f1', title: 'New in Iraq', body: null, image_url: 'https://example.com/b.png', link_url: null },
  products: [
    {
      product_id: 'p1',
      brand_name_en: 'Galvus 50 mg',
      generic_name_en: 'Vildagliptin',
      drug_class_name_en: 'DPP-4 Inhibitors (Gliptins)',
      category: 'prescription_drug',
      strength: '50 mg',
      dosage_form: 'Tablet',
      manufacturer_id: 'c1',
      manufacturer_name: 'Novartis',
      via_agent: false,
    },
    {
      product_id: 'p2',
      brand_name_en: 'Augmentin 1 g',
      generic_name_en: 'Amoxicillin + Clavulanic acid',
      drug_class_name_en: 'Penicillin antibacterial plus beta-lactamase inhibitor combination',
      category: 'prescription_drug',
      strength: '1 g',
      dosage_form: 'Tablet',
      manufacturer_id: 'c1',
      manufacturer_name: 'Novartis',
      via_agent: false,
    },
  ],
};

describe('company pages', () => {
  it('parses the company page JSON', () => {
    const page = parseCompanyPage(RAW)!;
    expect(page.name).toBe('Novartis');
    expect(page.originCountryName).toBe('Switzerland');
    expect(page.agents).toEqual([{ id: 'a1', name: 'Noor Scientific Office' }]);
    expect(page.gallery[0]).toEqual({ id: 'm1', storagePath: 'c1/gallery-1.jpg', caption: 'Basel campus' });
    expect(page.feature?.title).toBe('New in Iraq');
    expect(page.products).toHaveLength(2);
    expect(page.products[0].viaAgent).toBe(false);
    expect(parseCompanyPage(null)).toBeNull();
    expect(parseCompanyPage({ company: {} })).toBeNull();
  });

  it('groups products by therapeutic class like the search screen', () => {
    const groups = groupCompanyProducts(parseCompanyPage(RAW)!.products);
    expect(groups.map((g) => g.groupKey).sort()).toEqual(['antibiotics', 'diabetes']);
    expect(groups.reduce((n, g) => n + g.totalCount, 0)).toBe(2);
  });

  it('builds the facts line', () => {
    expect(companyFacts(parseCompanyPage(RAW)!)).toBe('Switzerland · Founded 1996 · 2 medicines');
    expect(companyFacts({ originCountryName: null, foundedYear: null, products: [] })).toBe('');
  });

  it('builds and reads company routes', () => {
    expect(buildCompanyRouteHash(' c1 ')).toBe('#/company/c1');
    expect(parseCompanyRoute('#/company/c1')).toBe('c1');
    expect(parseCompanyRoute('#/product/c1')).toBeNull();
    expect(COMPANY_DIRECTORY_ROUTE).toBe('#/companies');
  });

  it('checks images before upload', () => {
    expect(checkCompanyImage({ size: 1000, type: 'image/png' })).toBeNull();
    expect(checkCompanyImage({ size: 1000, type: 'image/gif' })).toBe('Use a JPG, PNG or WebP image.');
    expect(checkCompanyImage({ size: 6 * 1024 * 1024, type: 'image/jpeg' })).toBe('The image must be 5 MB or smaller.');
  });

  it('loads the page and the directory through the RPCs', async () => {
    const calls: string[] = [];
    const client = {
      rpc: async (fn: string) => {
        calls.push(fn);
        if (fn === 'get_company_page') return { data: RAW, error: null };
        return {
          data: [
            {
              company_id: 'c1',
              company_name: 'Novartis',
              company_type: 'manufacturer',
              origin_country_code: 'CH',
              tagline: null,
              logo_path: null,
              product_count: '79',
            },
          ],
          error: null,
        };
      },
    } as unknown as SupabaseClient;
    const page = await loadCompanyPage(client, 'c1');
    expect(page.ok && page.data.name).toBe('Novartis');
    const dir = await loadCompanyDirectory(client);
    expect(dir.ok && dir.data[0]).toMatchObject({ companyName: 'Novartis', productCount: 79, originCountryName: 'Switzerland' });
    expect(calls).toEqual(['get_company_page', 'get_company_directory']);
    expect(await loadCompanyPage(client, ' ')).toEqual({ ok: false, message: 'Company not found.' });
  });

  it('validates admin input before calling the server', async () => {
    const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        calls.push({ fn, args });
        return { data: null, error: null };
      },
    } as unknown as SupabaseClient;
    expect(await adminUpdateCompanyPage(client, { companyId: 'c1', foundedYear: 1700 })).toEqual({
      ok: false,
      message: 'Enter a founded year between 1800 and 2100.',
    });
    expect(await adminUpdateCompanyPage(client, { companyId: 'c1', tagline: 'x'.repeat(141) })).toEqual({
      ok: false,
      message: 'The tagline must be 140 characters or fewer.',
    });
    expect(calls).toHaveLength(0);
    await adminUpdateCompanyPage(client, { companyId: 'c1', tagline: ' Hi ', foundedYear: 1996, logoPath: 'c1/l.png' });
    expect(calls[0]).toEqual({
      fn: 'admin_update_company_page',
      args: { p_company_id: 'c1', p_tagline: 'Hi', p_founded_year: 1996, p_logo_path: 'c1/l.png', p_cover_path: null },
    });
    await adminAddCompanyMedia(client, { companyId: 'c1', storagePath: 'c1/g.jpg', caption: ' Lab ' });
    expect(calls[1].args).toEqual({ p_company_id: 'c1', p_storage_path: 'c1/g.jpg', p_caption: 'Lab', p_sort_order: 0 });
  });
});

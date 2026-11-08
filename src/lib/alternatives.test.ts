import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  alternativeSubtitle,
  closeMatchNotice,
  groupAlternatives,
  loadProductAlternatives,
  type ProductAlternative,
} from './alternatives';

describe('same medicine, other brands', () => {
  it('loads alternatives and adds the country name', async () => {
    const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args: Record<string, unknown>) => {
        calls.push({ fn, args });
        return {
          data: [
            {
              product_id: 'p2',
              brand_name_en: 'Glucophage 500 mg',
              company_id: 'c1',
              company_name: 'Merck KGaA',
              origin_country_code: 'DE',
              strength: '500 mg',
              dosage_form: 'Film-coated tablet',
              same_strength: true,
              same_form: true,
            },
          ],
          error: null,
        };
      },
    } as unknown as SupabaseClient;

    const res = await loadProductAlternatives(client, ' p1 ');
    expect(calls).toEqual([{ fn: 'get_product_alternatives', args: { p_product_id: 'p1', p_limit: 20 } }]);
    expect(res).toEqual({
      ok: true,
      data: [
        {
          productId: 'p2',
          brandNameEn: 'Glucophage 500 mg',
          companyId: 'c1',
          companyName: 'Merck KGaA',
          originCountryCode: 'DE',
          originCountryName: 'Germany',
          strength: '500 mg',
          dosageForm: 'Film-coated tablet',
          sameStrength: true,
          sameForm: true,
        },
      ],
    });
  });

  it('returns nothing for an empty id and passes errors on', async () => {
    const client = {
      rpc: async () => ({ data: null, error: { message: 'This drug is not available.' } }),
    } as unknown as SupabaseClient;
    expect(await loadProductAlternatives(client, '  ')).toEqual({ ok: true, data: [] });
    expect(await loadProductAlternatives(client, 'p1')).toEqual({ ok: false, message: 'This drug is not available.' });
  });

  it('groups by strength and builds the subtitle', () => {
    const base: ProductAlternative = {
      productId: 'a',
      brandNameEn: 'A',
      companyId: 'c',
      companyName: 'Pioneer',
      originCountryCode: 'IQ',
      originCountryName: 'Iraq',
      strength: '500 mg',
      dosageForm: 'Tablet',
      sameStrength: true,
      sameForm: true,
    };
    const other = { ...base, productId: 'b', sameStrength: false, strength: '1000 mg' };
    expect(groupAlternatives([base, other])).toEqual({ sameStrength: [base], otherStrengths: [other] });
    expect(alternativeSubtitle(base)).toBe('Pioneer · Iraq · 500 mg Tablet');
    expect(alternativeSubtitle({ ...base, originCountryName: null, dosageForm: null })).toBe('Pioneer · 500 mg');
  });

  it('builds the close-spelling notice', () => {
    expect(closeMatchNotice(' panadool ', true)).toBe('No exact match for "panadool". Showing close spellings.');
    expect(closeMatchNotice('panadol', false)).toBeNull();
    expect(closeMatchNotice('', true)).toBeNull();
  });
});

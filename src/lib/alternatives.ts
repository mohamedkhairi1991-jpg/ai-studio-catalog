import type { SupabaseClient } from '@supabase/supabase-js';
import { countryNameFromCode } from './companies';

/**
 * "Same medicine, other brands" for the drug page, and the search notice for
 * close spellings. Database: get_product_alternatives,
 * search_catalog_products_v2 (migration 20261108160000_smart_search_v2).
 */

export interface ProductAlternative {
  productId: string;
  brandNameEn: string;
  companyId: string;
  companyName: string;
  originCountryCode: string | null;
  originCountryName: string | null;
  strength: string | null;
  dosageForm: string | null;
  /** Same strength as the drug being viewed. */
  sameStrength: boolean;
  /** Same dosage form as the drug being viewed. */
  sameForm: boolean;
}

export type AlternativesResult = { ok: true; data: ProductAlternative[] } | { ok: false; message: string };

/** Other brands of the same generic sold in Iraq (same strength and form first). */
export async function loadProductAlternatives(
  client: SupabaseClient,
  productId: string,
  limit = 20
): Promise<AlternativesResult> {
  const id = productId.trim();
  if (!id) return { ok: true, data: [] };
  const { data, error } = await client.rpc('get_product_alternatives', {
    p_product_id: id,
    p_limit: limit,
  });
  if (error) {
    return { ok: false, message: error.message?.trim() || 'Could not load other brands.' };
  }
  const rows = (data ?? []) as Array<{
    product_id: string;
    brand_name_en: string | null;
    company_id: string;
    company_name: string | null;
    origin_country_code: string | null;
    strength: string | null;
    dosage_form: string | null;
    same_strength: boolean | null;
    same_form: boolean | null;
  }>;
  return {
    ok: true,
    data: rows.map((row) => ({
      productId: row.product_id,
      brandNameEn: row.brand_name_en ?? 'Untitled Product',
      companyId: row.company_id,
      companyName: row.company_name ?? 'Company',
      originCountryCode: row.origin_country_code ?? null,
      originCountryName: countryNameFromCode(row.origin_country_code),
      strength: row.strength ?? null,
      dosageForm: row.dosage_form ?? null,
      sameStrength: Boolean(row.same_strength),
      sameForm: Boolean(row.same_form),
    })),
  };
}

/** Split alternatives into "same strength" and "other strengths" groups. */
export function groupAlternatives(rows: ProductAlternative[]): {
  sameStrength: ProductAlternative[];
  otherStrengths: ProductAlternative[];
} {
  return {
    sameStrength: rows.filter((row) => row.sameStrength),
    otherStrengths: rows.filter((row) => !row.sameStrength),
  };
}

/** Short line under one alternative: "Pfizer · United States · 500 mg Tablet". */
export function alternativeSubtitle(row: ProductAlternative): string {
  const form = [row.strength, row.dosageForm].filter(Boolean).join(' ');
  return [row.companyName, row.originCountryName, form].filter(Boolean).join(' · ');
}

/** Notice above search results that came from a close spelling, else null. */
export function closeMatchNotice(query: string | null | undefined, closeMatches: boolean): string | null {
  const clean = (query ?? '').trim();
  if (!closeMatches || !clean) return null;
  return `No exact match for "${clean}". Showing close spellings.`;
}

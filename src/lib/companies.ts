import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Manufacturer vs Iraq agent.
 *
 * products.company_id is always the MANUFACTURER (who makes the drug).
 * products.agent_company_id is the optional Iraq agent / scientific office.
 * Database: companies.company_type, companies.origin_country_code,
 * company_agencies, admin_set_company_profile, admin_set_company_agency,
 * admin_set_product_agent (migration 20261108140000_manufacturer_and_iraq_agent).
 */

export type CompanyType = 'manufacturer' | 'agent' | 'both';

export const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  manufacturer: 'Manufacturer',
  agent: 'Iraq agent / office',
  both: 'Manufacturer and Iraq agent',
};

export type CompaniesResult<T = void> = { ok: true; data: T } | { ok: false; message: string };

/** True when this company can own products (shown as the maker). */
export function isManufacturer(type: CompanyType | null | undefined): boolean {
  return (type ?? 'manufacturer') !== 'agent';
}

/** True when this company can be picked as an Iraq agent / office. */
export function isAgent(type: CompanyType | null | undefined): boolean {
  return type === 'agent' || type === 'both';
}

/** Clean a 2-letter country code ("ch " -> "CH"); null when empty or invalid. */
export function normalizeCountryCode(code: string | null | undefined): string | null {
  const clean = (code ?? '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(clean) ? clean : null;
}

let regionNames: Intl.DisplayNames | null | undefined;

/** English country name for an ISO code ("CH" -> "Switzerland"); null when unknown. */
export function countryNameFromCode(code: string | null | undefined): string | null {
  const clean = normalizeCountryCode(code);
  if (!clean) return null;
  if (regionNames === undefined) {
    try {
      regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    } catch {
      regionNames = null;
    }
  }
  try {
    const name = regionNames?.of(clean);
    return name && name !== clean ? name : clean;
  } catch {
    return clean;
  }
}

/** Main line on a drug page: "Novartis · Switzerland" (country only when known). */
export function manufacturerLine(companyName: string, countryCode?: string | null): string {
  const country = countryNameFromCode(countryCode);
  return country ? `${companyName} · ${country}` : companyName;
}

/** Small line on a drug page: "Agent in Iraq: Noor Scientific Office", or null. */
export function agentLine(agentName: string | null | undefined): string | null {
  const clean = (agentName ?? '').trim();
  return clean ? `Agent in Iraq: ${clean}` : null;
}

function errorMessage(error: { message?: string } | null | undefined, fallback: string): string {
  const text = error?.message?.trim();
  return text ? text : fallback;
}

/** Admin: set a company's type and home country. */
export async function adminSetCompanyProfile(
  client: SupabaseClient,
  input: { companyId: string; companyType: CompanyType; originCountryCode?: string | null }
): Promise<CompaniesResult> {
  const raw = (input.originCountryCode ?? '').trim();
  const code = normalizeCountryCode(raw);
  if (raw && !code) return { ok: false, message: 'Country must be a 2-letter code, e.g. CH.' };
  const { error } = await client.rpc('admin_set_company_profile', {
    p_company_id: input.companyId,
    p_company_type: input.companyType,
    p_origin_country_code: code,
  });
  return error ? { ok: false, message: errorMessage(error, 'Could not save the company.') } : { ok: true, data: undefined };
}

/** Admin: link (or unlink) an Iraq agent / office to a manufacturer. */
export async function adminSetCompanyAgency(
  client: SupabaseClient,
  input: { manufacturerCompanyId: string; agentCompanyId: string; isActive?: boolean }
): Promise<CompaniesResult> {
  if (input.manufacturerCompanyId === input.agentCompanyId) {
    return { ok: false, message: 'A company cannot be its own agent.' };
  }
  const { error } = await client.rpc('admin_set_company_agency', {
    p_manufacturer_company_id: input.manufacturerCompanyId,
    p_agent_company_id: input.agentCompanyId,
    p_is_active: input.isActive ?? true,
  });
  return error ? { ok: false, message: errorMessage(error, 'Could not save the agent link.') } : { ok: true, data: undefined };
}

/** Admin: set or clear (null) the Iraq agent of one product. */
export async function adminSetProductAgent(
  client: SupabaseClient,
  input: { productId: string; agentCompanyId: string | null }
): Promise<CompaniesResult> {
  const { error } = await client.rpc('admin_set_product_agent', {
    p_product_id: input.productId,
    p_agent_company_id: input.agentCompanyId,
  });
  return error ? { ok: false, message: errorMessage(error, 'Could not save the product agent.') } : { ok: true, data: undefined };
}

export interface CompanyAgency {
  manufacturerCompanyId: string;
  agentCompanyId: string;
  isActive: boolean;
}

/** Agency links where the company is the manufacturer or the agent. */
export async function loadCompanyAgencies(
  client: SupabaseClient,
  companyId: string
): Promise<CompaniesResult<CompanyAgency[]>> {
  const { data, error } = await client
    .from('company_agencies')
    .select('manufacturer_company_id,agent_company_id,is_active')
    .or(`manufacturer_company_id.eq.${companyId},agent_company_id.eq.${companyId}`);
  if (error) return { ok: false, message: errorMessage(error, 'Could not load agents.') };
  return {
    ok: true,
    data: ((data ?? []) as Array<{ manufacturer_company_id: string; agent_company_id: string; is_active: boolean }>).map(
      (row) => ({
        manufacturerCompanyId: row.manufacturer_company_id,
        agentCompanyId: row.agent_company_id,
        isActive: row.is_active,
      })
    ),
  };
}

import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_TYPE_LABELS,
  adminSetCompanyAgency,
  adminSetCompanyProfile,
  adminSetProductAgent,
  agentLine,
  countryNameFromCode,
  isAgent,
  isManufacturer,
  manufacturerLine,
  normalizeCountryCode,
} from './companies';

function rpcClient(result: { error: { message: string } | null } = { error: null }) {
  const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
  const client = {
    rpc: async (fn: string, args: Record<string, unknown>) => {
      calls.push({ fn, args });
      return { data: null, ...result };
    },
  } as unknown as SupabaseClient;
  return { client, calls };
}

describe('manufacturer vs Iraq agent', () => {
  it('labels company types and knows who can make or represent', () => {
    expect(COMPANY_TYPE_LABELS.agent).toBe('Iraq agent / office');
    expect(isManufacturer('manufacturer')).toBe(true);
    expect(isManufacturer('both')).toBe(true);
    expect(isManufacturer(undefined)).toBe(true);
    expect(isManufacturer('agent')).toBe(false);
    expect(isAgent('agent')).toBe(true);
    expect(isAgent('both')).toBe(true);
    expect(isAgent('manufacturer')).toBe(false);
  });

  it('turns country codes into names', () => {
    expect(normalizeCountryCode(' ch ')).toBe('CH');
    expect(normalizeCountryCode('Swiss')).toBeNull();
    expect(countryNameFromCode('CH')).toBe('Switzerland');
    expect(countryNameFromCode('iq')).toBe('Iraq');
    expect(countryNameFromCode(null)).toBeNull();
  });

  it('builds the manufacturer and agent lines for the drug page', () => {
    expect(manufacturerLine('Novartis', 'CH')).toBe('Novartis · Switzerland');
    expect(manufacturerLine('Pioneer', null)).toBe('Pioneer');
    expect(agentLine('Noor Scientific Office')).toBe('Agent in Iraq: Noor Scientific Office');
    expect(agentLine('  ')).toBeNull();
    expect(agentLine(null)).toBeNull();
  });

  it('calls the admin RPCs with clean values', async () => {
    const { client, calls } = rpcClient();
    expect(
      await adminSetCompanyProfile(client, { companyId: 'c1', companyType: 'agent', originCountryCode: 'iq' })
    ).toEqual({ ok: true, data: undefined });
    expect(calls[0]).toEqual({
      fn: 'admin_set_company_profile',
      args: { p_company_id: 'c1', p_company_type: 'agent', p_origin_country_code: 'IQ' },
    });

    await adminSetCompanyAgency(client, { manufacturerCompanyId: 'm1', agentCompanyId: 'a1' });
    expect(calls[1]).toEqual({
      fn: 'admin_set_company_agency',
      args: { p_manufacturer_company_id: 'm1', p_agent_company_id: 'a1', p_is_active: true },
    });

    await adminSetProductAgent(client, { productId: 'p1', agentCompanyId: null });
    expect(calls[2]).toEqual({
      fn: 'admin_set_product_agent',
      args: { p_product_id: 'p1', p_agent_company_id: null },
    });
  });

  it('refuses bad input before calling the server and passes server errors on', async () => {
    const { client, calls } = rpcClient();
    expect(
      await adminSetCompanyProfile(client, { companyId: 'c1', companyType: 'manufacturer', originCountryCode: 'Swiss' })
    ).toEqual({ ok: false, message: 'Country must be a 2-letter code, e.g. CH.' });
    expect(await adminSetCompanyAgency(client, { manufacturerCompanyId: 'x', agentCompanyId: 'x' })).toEqual({
      ok: false,
      message: 'A company cannot be its own agent.',
    });
    expect(calls).toHaveLength(0);

    const failing = rpcClient({ error: { message: "This agent does not represent the product's manufacturer." } });
    expect(await adminSetProductAgent(failing.client, { productId: 'p1', agentCompanyId: 'a1' })).toEqual({
      ok: false,
      message: "This agent does not represent the product's manufacturer.",
    });
  });
});

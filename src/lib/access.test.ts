import { describe, expect, it } from 'vitest';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { resolveAccess } from './access';

// Minimal stand-in for the Supabase query builder: every table returns the row we give it.
function fakeClient(rows: Record<string, unknown>): SupabaseClient {
  const chain = (table: string): unknown => ({
    select: () => chain(table),
    eq: () => chain(table),
    maybeSingle: async () => ({ data: rows[table] ?? null, error: null }),
  });
  return { from: (table: string) => chain(table) } as unknown as SupabaseClient;
}

const user = { id: 'auth-1', email: 'x@example.com' } as User;

const profile = (role: string | null, status: string) => ({ id: 'p1', role, status });
const doctor = (type: string, verification: string) => ({
  profession_type: type,
  verification_status: verification,
});
const company = (role: string, active: boolean, status: string) => ({
  company_role: role,
  is_active: active,
  companies: { company_name: 'Tigris Pharma', status },
});

describe('resolveAccess (mirrors Flutter CatalogAccessState)', () => {
  it('treats a missing profile as pending', async () => {
    expect((await resolveAccess(fakeClient({}), user)).audience).toBe('pending');
  });

  it('blocks pending, role-less, suspended and archived profiles', async () => {
    expect((await resolveAccess(fakeClient({ profiles: profile('admin', 'pending') }), user)).audience).toBe('pending');
    expect((await resolveAccess(fakeClient({ profiles: profile(null, 'active') }), user)).audience).toBe('pending');
    expect((await resolveAccess(fakeClient({ profiles: profile('admin', 'suspended') }), user)).audience).toBe('suspended');
    expect((await resolveAccess(fakeClient({ profiles: profile('admin', 'archived') }), user)).audience).toBe('suspended');
  });

  it('gives admin access only for active admin or super_admin', async () => {
    expect((await resolveAccess(fakeClient({ profiles: profile('admin', 'active') }), user)).audience).toBe('administrator');
    expect((await resolveAccess(fakeClient({ profiles: profile('super_admin', 'active') }), user)).audience).toBe('administrator');
  });

  it('opens the official catalog only for an approved physician', async () => {
    const base = { profiles: profile('healthcare_professional', 'active') };
    const ok = await resolveAccess(fakeClient({ ...base, healthcare_professionals: doctor('physician', 'approved') }), user);
    expect(ok.audience).toBe('officialCatalog');
    for (const row of [doctor('physician', 'pending'), doctor('physician', 'rejected'), doctor('pharmacist', 'approved')]) {
      expect((await resolveAccess(fakeClient({ ...base, healthcare_professionals: row }), user)).audience).toBe('roleIneligible');
    }
    expect((await resolveAccess(fakeClient(base), user)).audience).toBe('roleIneligible');
  });

  it('gives company access only for an active member of a verified company with a workflow role', async () => {
    const base = { profiles: profile('company_user', 'active') };
    const admin = await resolveAccess(fakeClient({ ...base, company_users: company('company_admin', true, 'verified') }), user);
    expect(admin.audience).toBe('companyWorkflow');
    expect(admin.canManageDrafts).toBe(true);
    expect(admin.companyName).toBe('Tigris Pharma');

    const marketing = await resolveAccess(fakeClient({ ...base, company_users: company('marketing_manager', true, 'verified') }), user);
    expect(marketing.audience).toBe('companyWorkflow');
    expect(marketing.canManageDrafts).toBe(false);

    for (const row of [
      company('representative', true, 'verified'),
      company('viewer', true, 'verified'),
      company('company_admin', false, 'verified'),
      company('company_admin', true, 'pending'),
      company('company_admin', true, 'suspended'),
    ]) {
      expect((await resolveAccess(fakeClient({ ...base, company_users: row }), user)).audience).toBe('roleIneligible');
    }
  });

  it('never grants access from an unknown role', async () => {
    expect((await resolveAccess(fakeClient({ profiles: profile('hacker', 'active') }), user)).audience).toBe('roleIneligible');
  });
});

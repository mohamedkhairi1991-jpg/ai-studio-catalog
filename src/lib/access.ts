import type { SupabaseClient, User } from '@supabase/supabase-js';

// Mirrors CatalogAudience / CatalogAccessState in packages/pharmaconnect_catalog.
export type Audience =
  | 'pending'
  | 'suspended'
  | 'roleIneligible'
  | 'officialCatalog'
  | 'companyWorkflow'
  | 'administrator';

export interface AccessResult {
  audience: Audience;
  email: string;
  role: string | null;
  companyName?: string;
  canManageDrafts?: boolean;
}

interface ProfileRow {
  role: string | null;
  status: string;
}

// Roles and approval come ONLY from the database, read under RLS as the
// signed-in user. Nothing in the browser decides who is an admin.
export async function resolveAccess(client: SupabaseClient, user: User): Promise<AccessResult> {
  const email = user.email ?? '';

  const { data: profile, error } = await client
    .from('profiles')
    .select('role,status')
    .eq('auth_user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (error || !profile) return { audience: 'pending', email, role: null };

  const base = { email, role: profile.role };

  if (profile.status === 'suspended' || profile.status === 'archived') {
    return { ...base, audience: 'suspended' };
  }
  if (profile.status !== 'active' || !profile.role) {
    return { ...base, audience: 'pending' };
  }

  if (profile.role === 'admin' || profile.role === 'super_admin') {
    return { ...base, audience: 'administrator' };
  }

  if (profile.role === 'healthcare_professional') {
    const { data } = await client
      .from('healthcare_professionals')
      .select('profession_type,verification_status')
      .eq('profile_id', await profileId(client, user.id))
      .maybeSingle<{ profession_type: string; verification_status: string }>();
    const eligible = data?.profession_type === 'physician' && data?.verification_status === 'approved';
    return { ...base, audience: eligible ? 'officialCatalog' : 'roleIneligible' };
  }

  if (profile.role === 'company_user') {
    const { data } = await client
      .from('company_users')
      .select('company_role,is_active,companies!inner(company_name,status)')
      .eq('profile_id', await profileId(client, user.id))
      .maybeSingle<{
        company_role: string;
        is_active: boolean;
        companies: { company_name: string; status: string } | { company_name: string; status: string }[];
      }>();
    const company = Array.isArray(data?.companies) ? data?.companies[0] : data?.companies;
    const canRead =
      Boolean(data?.is_active) &&
      company?.status === 'verified' &&
      ['company_admin', 'marketing_manager', 'product_manager'].includes(data?.company_role ?? '');
    if (!canRead) return { ...base, audience: 'roleIneligible' };
    return {
      ...base,
      audience: 'companyWorkflow',
      companyName: company?.company_name,
      canManageDrafts: ['company_admin', 'product_manager'].includes(data?.company_role ?? ''),
    };
  }

  return { ...base, audience: 'roleIneligible' };
}

async function profileId(client: SupabaseClient, authUserId: string): Promise<string> {
  const { data } = await client
    .from('profiles')
    .select('id')
    .eq('auth_user_id', authUserId)
    .maybeSingle<{ id: string }>();
  return data?.id ?? '';
}

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { isNetworkErrorMessage } from './offlineCatalog';

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
  profileId?: string;
  companyName?: string;
  canManageDrafts?: boolean;
  /** The database could not be reached (no internet); audience is not known. */
  networkError?: boolean;
  /** Using the access saved on this phone because there is no internet. */
  offline?: boolean;
}

interface ProfileRow {
  id?: string;
  role: string | null;
  status: string;
}

// Roles and approval come ONLY from the database, read under RLS as the
// signed-in user. Nothing in the browser decides who is an admin.
export async function resolveAccess(client: SupabaseClient, user: User): Promise<AccessResult> {
  const email = user.email ?? '';

  const { data: profile, error } = await client
    .from('profiles')
    .select('id,role,status')
    .eq('auth_user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (error && isNetworkErrorMessage(error.message)) {
    return { audience: 'pending', email, role: null, networkError: true };
  }
  if (error || !profile) return { audience: 'pending', email, role: null };

  const base = {
    ...(profile.id ? { profileId: profile.id } : {}),
    email,
    role: profile.role,
  };

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

// ---------------------------------------------------------------------------
// Offline: a doctor who signed in on this phone can open the catalog with no
// internet. Only the doctor audience is saved (never admin or company access),
// and it is used only while the database cannot be reached.

const ACCESS_KEY_PREFIX = 'pharmaty.offline-access.';

export function saveOfflineAccess(userId: string, access: AccessResult): void {
  try {
    if (access.audience === 'officialCatalog') {
      const { networkError: _n, offline: _o, ...rest } = access;
      localStorage.setItem(ACCESS_KEY_PREFIX + userId, JSON.stringify(rest));
    } else {
      localStorage.removeItem(ACCESS_KEY_PREFIX + userId);
    }
  } catch {
    // Storage blocked: offline sign-in is simply not available.
  }
}

export function loadOfflineAccess(userId: string): AccessResult | null {
  try {
    const raw = localStorage.getItem(ACCESS_KEY_PREFIX + userId);
    const parsed = raw ? (JSON.parse(raw) as AccessResult) : null;
    return parsed?.audience === 'officialCatalog' ? { ...parsed, offline: true } : null;
  } catch {
    return null;
  }
}

export function clearOfflineAccess(): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith(ACCESS_KEY_PREFIX)) localStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}

/**
 * The session supabase-js saved on this phone, even if its token has expired.
 * Used only with no internet (a token cannot be refreshed offline, and offline
 * screens read only the catalog saved on the phone).
 */
export function readSavedSession(): Session | null {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !/^sb-.+-auth-token$/.test(key)) continue;
      const parsed = JSON.parse(localStorage.getItem(key) ?? 'null') as Session | null;
      if (parsed?.user?.id) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

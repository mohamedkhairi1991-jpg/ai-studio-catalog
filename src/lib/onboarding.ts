import type { SupabaseClient } from '@supabase/supabase-js';
import { captchaOptions, signupCaptchaMetadata } from './captcha';

// ---------- Types ----------
export type ProfessionalStatus = 'pending' | 'approved' | 'rejected' | 'documents_requested';

export interface OnboardingState {
  profileId: string;
  professional: {
    id: string;
    status: ProfessionalStatus;
    reason: string | null;
    specialtyId: string | null;
    workplace: string | null;
    licenseNumber: string | null;
  } | null;
  company: { id: string; name: string; status: string } | null;
}

export type OnboardingStep =
  | 'choose'
  | 'doctor_pending'
  | 'doctor_documents'
  | 'doctor_rejected'
  | 'company_pending';

export interface DoctorForm {
  specialtyId: string;
  workplace: string;
  licenseNumber: string;
  acceptedTerms?: boolean;
}

export interface SignUpCredentialsInput {
  email: string;
  password: string;
  fullName?: string;
  phone: string;
  specialtyId: string;
  acceptedTerms: boolean;
  captchaToken?: string | null;
}

export interface DoctorSelfSignupInput {
  fullName?: string;
  phone: string;
  specialtyId: string;
}

export interface DoctorProfileSummary {
  fullName: string;
  phone: string;
  specialtyId: string;
}

export interface CompanyForm {
  countryId: string;
  cityId: string;
  companyName: string;
  legalName: string;
  description: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Option {
  id: string;
  label: string;
}

export interface PendingProfessional {
  id: string;
  email: string;
  fullName: string | null;
  workplace: string | null;
  licenseNumber: string | null;
}

export interface PendingCompany {
  id: string;
  companyName: string;
  legalName: string;
  applicantEmail: string;
  contactEmail: string | null;
  contactPhone: string | null;
  websiteUrl: string | null;
  description: string | null;
}

// Temporary operating model (docs/PROJECT_STATUS.md): only administrators and
// doctors use the app, so new users register as physicians only. Set to true
// to offer company self-signup again; the company form and RPCs are kept.
export const COMPANY_SELF_SIGNUP_ENABLED = false;

const PHONE_RE = /^\+?[0-9][0-9 ()-]{5,}$/;

// ---------- Pure helpers (unit tested) ----------
export function onboardingStep(state: OnboardingState): OnboardingStep {
  if (state.professional) {
    if (state.professional.status === 'documents_requested') return 'doctor_documents';
    if (state.professional.status === 'rejected') return 'doctor_rejected';
    return 'doctor_pending';
  }
  if (state.company) return 'company_pending';
  return 'choose';
}

export function blankToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

export function validateSignUpInput(input: SignUpCredentialsInput): string | null {
  if (!input.email.trim()) {
    return 'Email is required.';
  }
  if (input.password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  const fullName = input.fullName?.trim() ?? '';
  if (fullName.length > 120) {
    return 'The name is too long.';
  }
  const phone = input.phone.trim();
  if (!phone) {
    return 'Phone number is required.';
  }
  if (phone.length > 30 || !PHONE_RE.test(phone)) {
    return 'Enter a valid phone number.';
  }
  if (!input.specialtyId.trim()) {
    return 'Choose your medical specialty.';
  }
  if (!input.acceptedTerms) {
    return 'You must accept the Terms of Use and the Privacy Policy.';
  }
  return null;
}

export function validateDoctorSelfSignupForm(input: DoctorSelfSignupInput): string[] {
  const errors: string[] = [];
  const fullName = input.fullName?.trim() ?? '';
  if (fullName.length > 120) errors.push('The name is too long.');
  const phone = input.phone.trim();
  if (!phone) {
    errors.push('Phone number is required.');
  } else if (phone.length > 30 || !PHONE_RE.test(phone)) {
    errors.push('Enter a valid phone number.');
  }
  if (!input.specialtyId.trim()) {
    errors.push('Choose your medical specialty.');
  }
  return errors;
}

// Mirrors the database constraints so users get a clear message before the server rejects.
export function validateDoctorForm(form: DoctorForm): string[] {
  const errors: string[] = [];
  if (!form.workplace.trim()) errors.push('Workplace is required.');
  if (!form.licenseNumber.trim()) errors.push('License number is required for verification.');
  if (form.acceptedTerms === false) {
    errors.push('You must accept the Terms of Use and the Privacy Policy.');
  }
  return errors;
}

export function validateCompanyForm(form: CompanyForm): string[] {
  const errors: string[] = [];
  if (!form.countryId) errors.push('Country is required.');
  if (!form.companyName.trim()) errors.push('Company name is required.');
  if (!form.legalName.trim()) errors.push('Legal name is required.');
  const website = form.websiteUrl.trim();
  if (website && !/^https?:\/\//i.test(website)) errors.push('Website must start with http:// or https://.');
  const email = form.contactEmail.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Contact email is not valid.');
  return errors;
}

// ---------- Data access (all authorization is enforced by RLS and database functions) ----------
type Result = { ok: true } | { ok: false; message: string };
const fail = (message: string): Result => ({ ok: false, message });

export async function doctorSelfSignup(
  client: SupabaseClient,
  input: DoctorSelfSignupInput
): Promise<Result> {
  const errors = validateDoctorSelfSignupForm(input);
  if (errors.length > 0) return fail(errors.join(' '));
  const { error } = await client.rpc('doctor_self_signup', {
    p_full_name: blankToNull(input.fullName ?? ''),
    p_phone: input.phone.trim(),
    p_specialty_id: input.specialtyId.trim(),
  });
  return error ? fail(error.message) : { ok: true };
}

export async function loadDoctorProfileSummary(
  client: SupabaseClient,
  authUserId: string
): Promise<DoctorProfileSummary> {
  const { data: profile } = await client
    .from('profiles')
    .select('id,full_name,phone')
    .eq('auth_user_id', authUserId)
    .maybeSingle<{ id: string; full_name: string | null; phone: string | null }>();
  if (!profile) {
    return { fullName: '', phone: '', specialtyId: '' };
  }
  const { data: pro } = await client
    .from('healthcare_professionals')
    .select('specialty_id')
    .eq('profile_id', profile.id)
    .maybeSingle<{ specialty_id: string | null }>();
  return {
    fullName: profile.full_name ?? '',
    phone: profile.phone ?? '',
    specialtyId: pro?.specialty_id ?? '',
  };
}

export async function submitSignUpWithConsent(
  client: SupabaseClient,
  input: SignUpCredentialsInput
): Promise<Result & { sessionCreated?: boolean }> {
  const problem = validateSignUpInput(input);
  if (problem) return fail(problem);
  const metadata = {
    full_name: blankToNull(input.fullName ?? ''),
    phone: input.phone.trim(),
    specialty_id: input.specialtyId.trim(),
  };
  // The robot-check token goes in metadata for the sign-up hook
  // (a DB trigger removes it), and as captchaToken while the old
  // project-wide Supabase captcha setting may still be on.
  const token = input.captchaToken ?? null;
  const data = { ...metadata, ...signupCaptchaMetadata(token) };
  const { data: result, error } = await client.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options:
      typeof window === 'undefined'
        ? { data, ...captchaOptions(token) }
        : {
            emailRedirectTo: window.location.origin + import.meta.env.BASE_URL,
            data,
            ...captchaOptions(token),
          },
  });
  if (error) return fail(error.message);
  return {
    ok: true,
    sessionCreated: Boolean((result as { session?: unknown } | null)?.session),
  };
}

export async function loadOnboardingState(client: SupabaseClient, authUserId: string): Promise<OnboardingState | null> {
  const { data: profile } = await client
    .from('profiles')
    .select('id')
    .eq('auth_user_id', authUserId)
    .maybeSingle<{ id: string }>();
  if (!profile) return null;

  const { data: pro } = await client
    .from('healthcare_professionals')
    .select('id,verification_status,review_reason,specialty_id,workplace,license_number')
    .eq('profile_id', profile.id)
    .maybeSingle<{
      id: string;
      verification_status: ProfessionalStatus;
      review_reason: string | null;
      specialty_id: string | null;
      workplace: string | null;
      license_number: string | null;
    }>();

  const { data: company } = await client
    .from('companies')
    .select('id,company_name,status')
    .eq('applicant_profile_id', profile.id)
    .maybeSingle<{ id: string; company_name: string; status: string }>();

  return {
    profileId: profile.id,
    professional: pro
      ? {
          id: pro.id,
          status: pro.verification_status,
          reason: pro.review_reason,
          specialtyId: pro.specialty_id,
          workplace: pro.workplace,
          licenseNumber: pro.license_number,
        }
      : null,
    company: company ? { id: company.id, name: company.company_name, status: company.status } : null,
  };
}

export async function listSpecialties(client: SupabaseClient): Promise<Option[]> {
  const { data } = await client
    .from('specialties')
    .select('id,profession_type,specialty_translations(locale,name)')
    .eq('is_active', true);
  const rows = (data ?? []) as Array<{
    id: string;
    profession_type: string | null;
    specialty_translations: Array<{ locale: string; name: string }> | null;
  }>;
  return rows
    .filter((r) => r.profession_type === null || r.profession_type === 'physician')
    .map((r) => {
      const names = r.specialty_translations ?? [];
      const label = (names.find((n) => n.locale === 'en') ?? names[0])?.name;
      return label ? { id: r.id, label } : null;
    })
    .filter((o): o is Option => o !== null)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function listCountries(client: SupabaseClient): Promise<Option[]> {
  const { data } = await client.from('countries').select('id,name').eq('is_active', true).order('name');
  return ((data ?? []) as Array<{ id: string; name: string }>).map((c) => ({ id: c.id, label: c.name }));
}

export async function listCities(client: SupabaseClient, countryId: string): Promise<Option[]> {
  if (!countryId) return [];
  const { data } = await client
    .from('cities')
    .select('id,name')
    .eq('country_id', countryId)
    .eq('is_active', true)
    .order('name');
  return ((data ?? []) as Array<{ id: string; name: string }>).map((c) => ({ id: c.id, label: c.name }));
}

export async function submitDoctorRecord(client: SupabaseClient, form: DoctorForm, update: boolean): Promise<Result> {
  const { error } = await client.rpc(update ? 'update_my_healthcare_professional_record' : 'create_my_healthcare_professional_record', {
    p_profession_type: 'physician',
    p_specialty_id: blankToNull(form.specialtyId),
    p_workplace: blankToNull(form.workplace),
    p_license_number: blankToNull(form.licenseNumber),
  });
  return error ? fail(error.message) : { ok: true };
}

export async function submitCompanyApplication(client: SupabaseClient, form: CompanyForm): Promise<Result> {
  const { error } = await client.rpc('create_company_application', {
    p_country_id: form.countryId,
    p_city_id: blankToNull(form.cityId),
    p_company_name: form.companyName.trim(),
    p_legal_name: form.legalName.trim(),
    p_description: blankToNull(form.description),
    p_website_url: blankToNull(form.websiteUrl),
    p_contact_email: blankToNull(form.contactEmail),
    p_contact_phone: blankToNull(form.contactPhone),
  });
  return error ? fail(error.message) : { ok: true };
}

// ---------- Admin ----------
async function emailsFor(client: SupabaseClient, ids: string[]): Promise<Map<string, { email: string; fullName: string | null }>> {
  const map = new Map<string, { email: string; fullName: string | null }>();
  if (ids.length === 0) return map;
  const { data } = await client.from('profiles').select('id,email,full_name').in('id', ids);
  for (const p of (data ?? []) as Array<{ id: string; email: string; full_name: string | null }>) {
    map.set(p.id, { email: p.email, fullName: p.full_name });
  }
  return map;
}

export async function listPendingProfessionals(client: SupabaseClient): Promise<PendingProfessional[]> {
  const { data } = await client
    .from('healthcare_professionals')
    .select('id,profile_id,workplace,license_number')
    .eq('verification_status', 'pending')
    .order('created_at');
  const rows = (data ?? []) as Array<{ id: string; profile_id: string; workplace: string | null; license_number: string | null }>;
  const people = await emailsFor(client, rows.map((r) => r.profile_id));
  return rows.map((r) => ({
    id: r.id,
    email: people.get(r.profile_id)?.email ?? '(unknown)',
    fullName: people.get(r.profile_id)?.fullName ?? null,
    workplace: r.workplace,
    licenseNumber: r.license_number,
  }));
}

export async function listPendingCompanies(client: SupabaseClient): Promise<PendingCompany[]> {
  const { data } = await client
    .from('companies')
    .select('id,applicant_profile_id,company_name,legal_name,contact_email,contact_phone,website_url,description')
    .eq('status', 'pending')
    .order('created_at');
  const rows = (data ?? []) as Array<{
    id: string;
    applicant_profile_id: string;
    company_name: string;
    legal_name: string;
    contact_email: string | null;
    contact_phone: string | null;
    website_url: string | null;
    description: string | null;
  }>;
  const people = await emailsFor(client, rows.map((r) => r.applicant_profile_id));
  return rows.map((r) => ({
    id: r.id,
    companyName: r.company_name,
    legalName: r.legal_name,
    applicantEmail: people.get(r.applicant_profile_id)?.email ?? '(unknown)',
    contactEmail: r.contact_email,
    contactPhone: r.contact_phone,
    websiteUrl: r.website_url,
    description: r.description,
  }));
}

export async function reviewProfessional(
  client: SupabaseClient,
  id: string,
  status: 'approved' | 'rejected' | 'documents_requested',
  reason: string
): Promise<Result> {
  if (status !== 'approved' && !reason.trim()) return fail('A reason is required.');
  const { error } = await client.rpc('admin_review_healthcare_professional', {
    p_healthcare_professional_id: id,
    p_new_status: status,
    p_reason: blankToNull(reason),
  });
  return error ? fail(error.message) : { ok: true };
}

export interface RegisteredUserRecord {
  profileId: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  role: string | null;
  profileStatus: string;
  specialtyId: string | null;
  specialtyName: string | null;
  verificationStatus: ProfessionalStatus | null;
  workplace: string | null;
  licenseNumber: string | null;
  registeredAt: string;
  lastActiveAt: string | null;
}

export interface UserRegistrationStats {
  totalUsers: number;
  totalDoctors: number;
  openedLast24h: number;
  openedLast7d: number;
  newLast7d: number;
  newLast30d: number;
}

export function computeUserRegistrationStats(
  users: RegisteredUserRecord[],
  nowMs: number = Date.now()
): UserRegistrationStats {
  const dayMs = 24 * 60 * 60 * 1000;
  const cutoff24h = nowMs - dayMs;
  const cutoff7d = nowMs - 7 * dayMs;
  const cutoff30d = nowMs - 30 * dayMs;

  let totalDoctors = 0;
  let openedLast24h = 0;
  let openedLast7d = 0;
  let newLast7d = 0;
  let newLast30d = 0;

  const counted = users.filter((u) => u.profileStatus !== 'archived');

  for (const u of counted) {
    if (u.role === 'healthcare_professional' || u.verificationStatus !== null) {
      totalDoctors += 1;
    }
    const lastActiveMs = u.lastActiveAt ? Date.parse(u.lastActiveAt) : NaN;
    if (!Number.isNaN(lastActiveMs)) {
      if (lastActiveMs >= cutoff24h) openedLast24h += 1;
      if (lastActiveMs >= cutoff7d) openedLast7d += 1;
    }
    const regMs = Date.parse(u.registeredAt);
    if (!Number.isNaN(regMs)) {
      if (regMs >= cutoff7d) newLast7d += 1;
      if (regMs >= cutoff30d) newLast30d += 1;
    }
  }

  return {
    totalUsers: counted.length,
    totalDoctors,
    openedLast24h,
    openedLast7d,
    newLast7d,
    newLast30d,
  };
}

export async function listRegisteredUsers(
  client: SupabaseClient
): Promise<RegisteredUserRecord[]> {
  const [{ data: profilesData }, { data: prosData }, specialties] =
    await Promise.all([
      client
        .from('profiles')
        .select('id,email,full_name,phone,role,status,created_at,last_seen_at')
        .order('created_at', { ascending: false }),
      client
        .from('healthcare_professionals')
        .select(
          'profile_id,specialty_id,verification_status,workplace,license_number'
        ),
      listSpecialties(client),
    ]);

  const specialtyMap = new Map<string, string>();
  for (const s of specialties) {
    specialtyMap.set(s.id, s.label);
  }

  const proByProfileId = new Map<
    string,
    {
      specialty_id: string | null;
      verification_status: ProfessionalStatus;
      workplace: string | null;
      license_number: string | null;
    }
  >();
  for (const pro of (prosData ?? []) as Array<{
    profile_id: string;
    specialty_id: string | null;
    verification_status: ProfessionalStatus;
    workplace: string | null;
    license_number: string | null;
  }>) {
    proByProfileId.set(pro.profile_id, pro);
  }

  const rows = (profilesData ?? []) as Array<{
    id: string;
    email: string;
    full_name: string | null;
    phone: string | null;
    role: string | null;
    status: string;
    created_at: string;
    last_seen_at: string | null;
  }>;

  return rows.map((p) => {
    const pro = proByProfileId.get(p.id);
    const specialtyId = pro?.specialty_id ?? null;

    return {
      profileId: p.id,
      email: p.email,
      fullName: p.full_name,
      phone: p.phone,
      role: p.role,
      profileStatus: p.status,
      specialtyId,
      specialtyName: specialtyId ? specialtyMap.get(specialtyId) ?? null : null,
      verificationStatus: pro?.verification_status ?? null,
      workplace: pro?.workplace ?? null,
      licenseNumber: pro?.license_number ?? null,
      registeredAt: p.created_at,
      lastActiveAt: p.last_seen_at ?? null,
    };
  });
}

export async function setUserProfileStatus(
  client: SupabaseClient,
  profileId: string,
  newStatus: 'active' | 'suspended' | 'archived',
  reason: string
): Promise<Result> {
  if (!reason.trim()) return fail('A reason is required.');
  const { error } = await client.rpc('admin_set_profile_status', {
    target_profile_id: profileId,
    new_status: newStatus,
    reason: reason.trim(),
  });
  return error ? fail(error.message) : { ok: true };
}

export async function verifyCompany(client: SupabaseClient, id: string, reason: string): Promise<Result> {
  if (!reason.trim()) return fail('A verification reason is required.');
  const { error } = await client.rpc('admin_verify_company', { p_company_id: id, p_reason: reason.trim() });
  return error ? fail(error.message) : { ok: true };
}

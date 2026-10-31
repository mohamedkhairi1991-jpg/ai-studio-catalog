import type { SupabaseClient } from '@supabase/supabase-js';

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

// Mirrors the database constraints so users get a clear message before the server rejects.
export function validateDoctorForm(form: DoctorForm): string[] {
  const errors: string[] = [];
  if (!form.workplace.trim()) errors.push('Workplace is required.');
  if (!form.licenseNumber.trim()) errors.push('License number is required for verification.');
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

export async function verifyCompany(client: SupabaseClient, id: string, reason: string): Promise<Result> {
  if (!reason.trim()) return fail('A verification reason is required.');
  const { error } = await client.rpc('admin_verify_company', { p_company_id: id, p_reason: reason.trim() });
  return error ? fail(error.message) : { ok: true };
}

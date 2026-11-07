import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_SELF_SIGNUP_ENABLED,
  blankToNull,
  computeUserRegistrationStats,
  doctorSelfSignup,
  listRegisteredUsers,
  onboardingStep,
  reviewProfessional,
  setUserProfileStatus,
  submitCompanyApplication,
  submitDoctorRecord,
  submitSignUpWithConsent,
  validateCompanyForm,
  validateDoctorForm,
  validateDoctorSelfSignupForm,
  validateSignUpInput,
  verifyCompany,
  type CompanyForm,
  type OnboardingState,
} from './onboarding';
import { recordAppOpen } from './notifications';
import {
  LEGAL_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS,
  TERMS_OF_USE_SECTIONS,
  resolveLegalPage,
} from '../components/LegalPages';

// All migration SQL, loaded as text, so we can check every RPC name and parameter we call.
const migrations = Object.values(
  import.meta.glob('../../supabase/migrations/*.sql', { query: '?raw', import: 'default', eager: true })
).join('\n');

interface RpcCall {
  fn: string;
  args: Record<string, unknown>;
}

function recordingClient(calls: RpcCall[]): SupabaseClient {
  return {
    rpc: async (fn: string, args: Record<string, unknown>) => {
      calls.push({ fn, args });
      return { data: null, error: null };
    },
  } as unknown as SupabaseClient;
}

function expectMatchesMigration(call: RpcCall) {
  const match = migrations.match(new RegExp(`function public\\.${call.fn}\\(([^)]*)\\)`));
  expect(match, `${call.fn} must exist in migrations`).not.toBeNull();
  for (const param of Object.keys(call.args)) {
    expect(match![1], `${call.fn} must accept ${param}`).toContain(param);
  }
}

const base: OnboardingState = { profileId: 'p', professional: null, company: null };
const pro = (status: 'pending' | 'approved' | 'rejected' | 'documents_requested') => ({
  id: 'h',
  status,
  reason: null,
  specialtyId: null,
  workplace: null,
  licenseNumber: null,
});

describe('onboardingStep', () => {
  it('asks a new user to choose', () => expect(onboardingStep(base)).toBe('choose'));
  it('shows doctor states', () => {
    expect(onboardingStep({ ...base, professional: pro('pending') })).toBe('doctor_pending');
    expect(onboardingStep({ ...base, professional: pro('documents_requested') })).toBe('doctor_documents');
    expect(onboardingStep({ ...base, professional: pro('rejected') })).toBe('doctor_rejected');
  });
  it('shows company pending', () => {
    expect(onboardingStep({ ...base, company: { id: 'c', name: 'X', status: 'pending' } })).toBe('company_pending');
  });
});

describe('validation mirrors database rules', () => {
  const company: CompanyForm = {
    countryId: 'iq', cityId: '', companyName: 'A', legalName: 'A LLC',
    description: '', websiteUrl: '', contactEmail: '', contactPhone: '',
  };
  it('requires workplace and license for legacy doctor form and blocks when terms are not accepted', () => {
    expect(validateDoctorForm({ specialtyId: '', workplace: ' ', licenseNumber: '' })).toHaveLength(2);
    expect(validateDoctorForm({ specialtyId: '', workplace: 'Clinic', licenseNumber: '123' })).toHaveLength(0);
    expect(
      validateDoctorForm({
        specialtyId: '',
        workplace: 'Clinic',
        licenseNumber: '123',
        acceptedTerms: false,
      })
    ).toEqual(['You must accept the Terms of Use and the Privacy Policy.']);
    expect(
      validateDoctorForm({
        specialtyId: '',
        workplace: 'Clinic',
        licenseNumber: '123',
        acceptedTerms: true,
      })
    ).toHaveLength(0);
  });

  it('requires phone number, medical specialty, and Terms/Privacy acceptance on doctor sign-up', async () => {
    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        fullName: 'Dr. Ali',
        phone: ' ',
        specialtyId: 'spec-cardiology',
        acceptedTerms: true,
      })
    ).toBe('Phone number is required.');

    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        fullName: 'Dr. Ali',
        phone: 'abc',
        specialtyId: 'spec-cardiology',
        acceptedTerms: true,
      })
    ).toBe('Enter a valid phone number.');

    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        fullName: 'Dr. Ali',
        phone: '+964 770 123 4567',
        specialtyId: ' ',
        acceptedTerms: true,
      })
    ).toBe('Choose your medical specialty.');

    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        fullName: 'Dr. Ali',
        phone: '+964 770 123 4567',
        specialtyId: 'spec-cardiology',
        acceptedTerms: false,
      })
    ).toBe('You must accept the Terms of Use and the Privacy Policy.');

    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        fullName: 'Dr. Ali',
        phone: '+964 770 123 4567',
        specialtyId: 'spec-cardiology',
        acceptedTerms: true,
      })
    ).toBeNull();

    expect(
      validateDoctorSelfSignupForm({
        fullName: '',
        phone: '',
        specialtyId: '',
      })
    ).toEqual(['Phone number is required.', 'Choose your medical specialty.']);

    const signUpCalls: Array<{
      email: string;
      password: string;
      options?: { data?: Record<string, unknown> };
    }> = [];
    const client = {
      auth: {
        signUp: async (creds: {
          email: string;
          password: string;
          options?: { data?: Record<string, unknown> };
        }) => {
          signUpCalls.push(creds);
          return { data: { session: { access_token: 'tok' } }, error: null };
        },
      },
    } as unknown as SupabaseClient;

    const blocked = await submitSignUpWithConsent(client, {
      email: 'Doctor@Hospital.iq',
      password: 'Password123',
      fullName: 'Dr. Ali',
      phone: '+964 770 123 4567',
      specialtyId: 'spec-cardiology',
      acceptedTerms: false,
    });
    expect(blocked).toEqual({
      ok: false,
      message: 'You must accept the Terms of Use and the Privacy Policy.',
    });
    expect(signUpCalls).toHaveLength(0);

    const allowed = await submitSignUpWithConsent(client, {
      email: 'Doctor@Hospital.iq',
      password: 'Password123',
      fullName: '  Dr. Ali  ',
      phone: ' +964 770 123 4567 ',
      specialtyId: ' spec-cardiology ',
      acceptedTerms: true,
    });
    expect(allowed).toEqual({ ok: true, sessionCreated: true });
    expect(signUpCalls).toHaveLength(1);
    expect(signUpCalls[0]?.email).toBe('doctor@hospital.iq');
    expect(signUpCalls[0]?.password).toBe('Password123');
    expect(signUpCalls[0]?.options?.data).toEqual({
      full_name: 'Dr. Ali',
      phone: '+964 770 123 4567',
      specialty_id: 'spec-cardiology',
    });

    // Sign-up robot check: token goes in metadata for the server hook.
    await submitSignUpWithConsent(client, {
      email: 'doc2@hospital.iq',
      password: 'Password123',
      phone: '+964 770 123 4567',
      specialtyId: 'spec-cardiology',
      acceptedTerms: true,
      captchaToken: 'turnstile-token',
    });
    expect(signUpCalls[1]?.options?.data?.captcha_token).toBe('turnstile-token');
  });

  it('accepts a minimal valid company and rejects bad fields', () => {
    expect(validateCompanyForm(company)).toHaveLength(0);
    expect(validateCompanyForm({ ...company, countryId: '' })).toHaveLength(1);
    expect(validateCompanyForm({ ...company, companyName: ' ' })).toHaveLength(1);
    expect(validateCompanyForm({ ...company, websiteUrl: 'example.com' })).toHaveLength(1);
    expect(validateCompanyForm({ ...company, websiteUrl: 'https://example.com' })).toHaveLength(0);
    expect(validateCompanyForm({ ...company, contactEmail: 'nope' })).toHaveLength(1);
  });
  it('turns blank strings into null', () => {
    expect(blankToNull('  ')).toBeNull();
    expect(blankToNull(' x ')).toBe('x');
  });
});

describe('database function calls match the migrations', () => {
  it('calls every RPC with real names and parameters', async () => {
    const calls: RpcCall[] = [];
    const client = recordingClient(calls);
    await doctorSelfSignup(client, {
      fullName: 'Dr. Ali',
      phone: '+964 770 123 4567',
      specialtyId: '00000000-0000-0000-0000-000000000001',
    });
    await submitDoctorRecord(client, { specialtyId: '', workplace: 'W', licenseNumber: 'L' }, false);
    await submitDoctorRecord(client, { specialtyId: 's', workplace: 'W', licenseNumber: 'L' }, true);
    await submitCompanyApplication(client, {
      countryId: 'c', cityId: '', companyName: 'A', legalName: 'B',
      description: '', websiteUrl: '', contactEmail: '', contactPhone: '',
    });
    await reviewProfessional(client, 'id', 'approved', '');
    await verifyCompany(client, 'id', 'checked');
    await setUserProfileStatus(client, 'id', 'suspended', 'policy check');
    expect(calls.map((c) => c.fn)).toEqual([
      'doctor_self_signup',
      'create_my_healthcare_professional_record',
      'update_my_healthcare_professional_record',
      'create_company_application',
      'admin_review_healthcare_professional',
      'admin_verify_company',
      'admin_set_profile_status',
    ]);
    calls.forEach(expectMatchesMigration);
  });

  it('requires a reason before rejecting, requesting documents, verifying, or changing user status', async () => {
    const calls: RpcCall[] = [];
    const client = recordingClient(calls);
    expect((await reviewProfessional(client, 'id', 'rejected', ' ')).ok).toBe(false);
    expect((await reviewProfessional(client, 'id', 'documents_requested', '')).ok).toBe(false);
    expect((await verifyCompany(client, 'id', '')).ok).toBe(false);
    expect((await setUserProfileStatus(client, 'id', 'suspended', ' ')).ok).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('computes user registration and app-open activity stats from last_seen_at and records app opens via record_app_open', async () => {
    const now = Date.parse('2026-11-06T12:00:00Z');
    const stats = computeUserRegistrationStats(
      [
        {
          profileId: 'u1',
          email: 'doc1@hospital.iq',
          fullName: 'Dr. Sara',
          phone: '+964 770 111 2222',
          role: 'healthcare_professional',
          profileStatus: 'active',
          specialtyId: 'spec-1',
          specialtyName: 'Cardiology',
          verificationStatus: 'approved',
          workplace: null,
          licenseNumber: null,
          registeredAt: '2026-11-05T10:00:00Z',
          lastActiveAt: '2026-11-06T09:00:00Z',
        },
        {
          profileId: 'u2',
          email: 'doc2@hospital.iq',
          fullName: 'Dr. Omar',
          phone: '+964 770 333 4444',
          role: 'healthcare_professional',
          profileStatus: 'active',
          specialtyId: 'spec-2',
          specialtyName: 'Neurology',
          verificationStatus: 'approved',
          workplace: null,
          licenseNumber: null,
          registeredAt: '2026-10-20T10:00:00Z',
          lastActiveAt: '2026-11-02T10:00:00Z',
        },
        {
          profileId: 'u3',
          email: 'admin@pharmaty.iq',
          fullName: 'Admin',
          phone: null,
          role: 'admin',
          profileStatus: 'active',
          specialtyId: null,
          specialtyName: null,
          verificationStatus: null,
          workplace: null,
          licenseNumber: null,
          registeredAt: '2026-09-01T10:00:00Z',
          lastActiveAt: null,
        },
      ],
      now
    );

    expect(stats).toEqual({
      totalUsers: 3,
      totalDoctors: 2,
      openedLast24h: 1,
      openedLast7d: 2,
      newLast7d: 1,
      newLast30d: 2,
    });

    const selectedColumns: Record<string, string> = {};
    const listClient = {
      from: (table: string) => ({
        select: (cols: string) => {
          selectedColumns[table] = cols;
          if (table === 'profiles') {
            return {
              order: async () => ({
                data: [
                  {
                    id: 'u1',
                    email: 'doc1@hospital.iq',
                    full_name: 'Dr. Sara',
                    phone: '+964 770 111 2222',
                    role: 'healthcare_professional',
                    status: 'active',
                    created_at: '2026-11-05T10:00:00Z',
                    last_seen_at: '2026-11-06T09:00:00Z',
                  },
                ],
              }),
            };
          }
          if (table === 'healthcare_professionals') {
            return Promise.resolve({
              data: [
                {
                  profile_id: 'u1',
                  specialty_id: 'spec-1',
                  verification_status: 'approved',
                  workplace: null,
                  license_number: null,
                },
              ],
            });
          }
          return {
            eq: async () => ({
              data: [
                {
                  id: 'spec-1',
                  profession_type: 'physician',
                  specialty_translations: [{ locale: 'en', name: 'Cardiology' }],
                },
              ],
            }),
          };
        },
      }),
    } as unknown as SupabaseClient;

    const listed = await listRegisteredUsers(listClient);
    expect(selectedColumns.profiles).toContain('last_seen_at');
    expect(selectedColumns.profiles).not.toContain('updated_at');
    expect(listed[0]?.lastActiveAt).toBe('2026-11-06T09:00:00Z');

    const calls: string[] = [];
    const openClient = {
      rpc: async (fn: string) => {
        calls.push(fn);
        return { data: null, error: null };
      },
    } as unknown as SupabaseClient;

    await recordAppOpen(openClient);
    expect(calls).toEqual(['record_app_open']);
  });
});

describe('operating model', () => {
  it('keeps company self-signup off while administrators manage the catalog', () => {
    // Change docs/PROJECT_STATUS.md (operating model) before flipping this.
    expect(COMPANY_SELF_SIGNUP_ENABLED).toBe(false);
  });

  it('resolves /privacy and /terms routes and exposes legal document sections', () => {
    expect(resolveLegalPage('#/privacy', '/')).toBe('privacy');
    expect(resolveLegalPage('#/terms', '/')).toBe('terms');
    expect(resolveLegalPage('', '/privacy')).toBe('privacy');
    expect(resolveLegalPage('', '/terms')).toBe('terms');
    expect(resolveLegalPage('', '/pharmaconnect/privacy')).toBe('privacy');
    expect(resolveLegalPage('', '/pharmaconnect/terms')).toBe('terms');
    expect(resolveLegalPage('#/catalog', '/')).toBeNull();
    expect(LEGAL_LAST_UPDATED).toBe('Last updated: 4 November 2026');
    expect(TERMS_OF_USE_SECTIONS).toHaveLength(9);
    expect(PRIVACY_POLICY_SECTIONS).toHaveLength(7);
    expect(PRIVACY_POLICY_SECTIONS[0]?.body).toContain(
      'We count searches, drug-page views and ad views and clicks without linking them to you, to improve the catalog.'
    );
  });
});

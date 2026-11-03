import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_SELF_SIGNUP_ENABLED,
  blankToNull,
  onboardingStep,
  reviewProfessional,
  submitCompanyApplication,
  submitDoctorRecord,
  submitSignUpWithConsent,
  validateCompanyForm,
  validateDoctorForm,
  validateSignUpInput,
  verifyCompany,
  type CompanyForm,
  type OnboardingState,
} from './onboarding';
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
  it('requires workplace and license for doctors and blocks when terms are not accepted', () => {
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

  it('blocks sign-up until the Terms of Use and Privacy Policy checkbox is ticked', async () => {
    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        acceptedTerms: false,
      })
    ).toBe('You must accept the Terms of Use and the Privacy Policy.');

    expect(
      validateSignUpInput({
        email: 'doctor@hospital.iq',
        password: 'Password123',
        acceptedTerms: true,
      })
    ).toBeNull();

    const signUpCalls: Array<{ email: string; password: string }> = [];
    const client = {
      auth: {
        signUp: async (creds: { email: string; password: string }) => {
          signUpCalls.push(creds);
          return { data: {}, error: null };
        },
      },
    } as unknown as SupabaseClient;

    const blocked = await submitSignUpWithConsent(client, {
      email: 'Doctor@Hospital.iq',
      password: 'Password123',
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
      acceptedTerms: true,
    });
    expect(allowed).toEqual({ ok: true });
    expect(signUpCalls).toEqual([
      { email: 'doctor@hospital.iq', password: 'Password123' },
    ]);
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
    await submitDoctorRecord(client, { specialtyId: '', workplace: 'W', licenseNumber: 'L' }, false);
    await submitDoctorRecord(client, { specialtyId: 's', workplace: 'W', licenseNumber: 'L' }, true);
    await submitCompanyApplication(client, {
      countryId: 'c', cityId: '', companyName: 'A', legalName: 'B',
      description: '', websiteUrl: '', contactEmail: '', contactPhone: '',
    });
    await reviewProfessional(client, 'id', 'approved', '');
    await verifyCompany(client, 'id', 'checked');
    expect(calls.map((c) => c.fn)).toEqual([
      'create_my_healthcare_professional_record',
      'update_my_healthcare_professional_record',
      'create_company_application',
      'admin_review_healthcare_professional',
      'admin_verify_company',
    ]);
    calls.forEach(expectMatchesMigration);
  });

  it('requires a reason before rejecting, requesting documents, or verifying', async () => {
    const calls: RpcCall[] = [];
    const client = recordingClient(calls);
    expect((await reviewProfessional(client, 'id', 'rejected', ' ')).ok).toBe(false);
    expect((await reviewProfessional(client, 'id', 'documents_requested', '')).ok).toBe(false);
    expect((await verifyCompany(client, 'id', '')).ok).toBe(false);
    expect(calls).toHaveLength(0);
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
    expect(resolveLegalPage('#/catalog', '/')).toBeNull();
    expect(LEGAL_LAST_UPDATED).toBe('Last updated: 3 November 2026');
    expect(TERMS_OF_USE_SECTIONS).toHaveLength(9);
    expect(PRIVACY_POLICY_SECTIONS).toHaveLength(7);
  });
});

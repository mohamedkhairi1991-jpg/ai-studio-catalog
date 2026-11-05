import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_SELF_SIGNUP_ENABLED,
  doctorSelfSignup,
  listCities,
  listCountries,
  listSpecialties,
  loadDoctorProfileSummary,
  loadOnboardingState,
  onboardingStep,
  submitCompanyApplication,
  validateCompanyForm,
  validateDoctorSelfSignupForm,
  type CompanyForm,
  type OnboardingState,
  type Option,
} from '../lib/onboarding';
import {
  Errors,
  Field,
  Screen,
  TermsAcceptanceCheckbox,
  buttonClass,
  inputClass,
  secondaryButtonClass,
} from './ui';

interface Props {
  client: SupabaseClient;
  authUserId: string;
  email: string;
  initialFullName?: string;
  initialPhone?: string;
  initialSpecialtyId?: string;
  initialError?: string | null;
  onChanged: () => void;
  onSignOut: () => void;
}

type Path = 'choose' | 'doctor' | 'company';

// With company self-signup off, new users go straight to the physician form.
const initialPath: Path = COMPANY_SELF_SIGNUP_ENABLED ? 'choose' : 'doctor';

const emptyCompany: CompanyForm = {
  countryId: '',
  cityId: '',
  companyName: '',
  legalName: '',
  description: '',
  websiteUrl: '',
  contactEmail: '',
  contactPhone: '',
};

export default function Onboarding({
  client,
  authUserId,
  email,
  initialFullName = '',
  initialPhone = '',
  initialSpecialtyId = '',
  initialError = null,
  onChanged,
  onSignOut,
}: Props) {
  const [state, setState] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState<Path>(initialPath);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>(initialError ? [initialError] : []);
  const [specialties, setSpecialties] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [specialtyId, setSpecialtyId] = useState(initialSpecialtyId);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [company, setCompany] = useState<CompanyForm>(emptyCompany);

  const reload = useCallback(async () => {
    setLoading(true);
    const [next, summary] = await Promise.all([
      loadOnboardingState(client, authUserId),
      loadDoctorProfileSummary(client, authUserId),
    ]);
    setState(next);
    setFullName((prev) => prev || summary.fullName || initialFullName);
    setPhone((prev) => prev || summary.phone || initialPhone);
    setSpecialtyId(
      (prev) =>
        prev ||
        summary.specialtyId ||
        next?.professional?.specialtyId ||
        initialSpecialtyId
    );
    setLoading(false);
  }, [client, authUserId, initialFullName, initialPhone, initialSpecialtyId]);

  useEffect(() => {
    void reload();
    void listSpecialties(client).then(setSpecialties);
    void listCountries(client).then((list) => {
      setCountries(list);
      if (list.length === 1) setCompany((c) => ({ ...c, countryId: list[0].id }));
    });
  }, [client, reload]);

  useEffect(() => {
    void listCities(client, company.countryId).then(setCities);
  }, [client, company.countryId]);

  if (loading || !state) {
    return (
      <Screen>
        <p className="text-sm text-text-muted">
          {loading ? 'Loading…' : 'Your profile is not ready yet. Please sign out and sign in again.'}
        </p>
        {!loading && (
          <button className={buttonClass} onClick={onSignOut}>
            Sign out
          </button>
        )}
      </Screen>
    );
  }

  const step = onboardingStep(state);

  const refresh = async () => {
    await reload();
    onChanged();
  };

  const submitDoctor = async (e: FormEvent) => {
    e.preventDefault();
    const problems = validateDoctorSelfSignupForm({
      fullName,
      phone,
      specialtyId,
    });
    if (!acceptedTerms) {
      problems.push('You must accept the Terms of Use and the Privacy Policy.');
    }
    setErrors(problems);
    if (problems.length > 0) return;
    setBusy(true);
    const result = await doctorSelfSignup(client, {
      fullName,
      phone,
      specialtyId,
    });
    setBusy(false);
    if (!result.ok) return setErrors([result.message]);
    setPath(initialPath);
    await refresh();
  };

  const submitCompany = async (e: FormEvent) => {
    e.preventDefault();
    const problems = validateCompanyForm(company);
    setErrors(problems);
    if (problems.length > 0) return;
    setBusy(true);
    const result = await submitCompanyApplication(client, company);
    setBusy(false);
    if (!result.ok) return setErrors([result.message]);
    setPath('choose');
    await refresh();
  };

  const header = <p className="text-sm text-text-muted">Signed in as {email}</p>;
  const footer = (
    <div className="flex gap-2">
      <button className={secondaryButtonClass} onClick={() => void refresh()}>
        Refresh
      </button>
      <button className={secondaryButtonClass} onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );

  const doctorFields = () => (
    <form onSubmit={(e) => void submitDoctor(e)} className="space-y-3">
      <Field label="Full name (optional)">
        <input
          className={inputClass}
          type="text"
          autoComplete="name"
          placeholder="Dr. Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Field>
      <Field label="Phone number">
        <input
          className={inputClass}
          type="tel"
          required
          autoComplete="tel"
          placeholder="+964 770 123 4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Field>
      <Field label="Medical specialty">
        <select
          className={inputClass}
          required
          value={specialtyId}
          onChange={(e) => setSpecialtyId(e.target.value)}
        >
          <option value="">— Select specialty —</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>
      <TermsAcceptanceCheckbox
        checked={acceptedTerms}
        onChange={setAcceptedTerms}
      />
      <Errors items={errors} />
      <button
        className={buttonClass}
        disabled={busy || !acceptedTerms || !phone.trim() || !specialtyId.trim()}
        type="submit"
      >
        Continue to catalog
      </button>
    </form>
  );

  if (step === 'doctor_rejected') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-danger">Your doctor account is not active.</p>
        {state.professional?.reason && <p className="text-sm text-text-muted">Reason: {state.professional.reason}</p>}
        {footer}
      </Screen>
    );
  }

  if (step === 'company_pending') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-warning">
          Your application for {state.company?.name} is under review.
        </p>
        {footer}
      </Screen>
    );
  }

  if (path === 'doctor' || step === 'doctor_pending' || step === 'doctor_documents') {
    return (
      <Screen>
        {header}
        <p className="text-base font-semibold text-text">Complete your doctor profile</p>
        <p className="text-sm text-text-muted">
          Enter your phone number and medical specialty to open the Iraq pharmaceutical directory.
        </p>
        {doctorFields()}
        {COMPANY_SELF_SIGNUP_ENABLED ? (
          <button className={secondaryButtonClass} onClick={() => { setPath('choose'); setErrors([]); }}>
            Back
          </button>
        ) : (
          <button className={secondaryButtonClass} onClick={onSignOut}>
            Sign out
          </button>
        )}
      </Screen>
    );
  }

  if (path === 'company') {
    return (
      <Screen>
        {header}
        <p className="text-sm">Company application</p>
        <form onSubmit={(e) => void submitCompany(e)} className="space-y-3">
          <Field label="Country">
            <select className={inputClass} value={company.countryId} onChange={(e) => setCompany({ ...company, countryId: e.target.value, cityId: '' })}>
              <option value="">— Select —</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="City (optional)">
            <select className={inputClass} value={company.cityId} onChange={(e) => setCompany({ ...company, cityId: e.target.value })}>
              <option value="">— Not specified —</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Company name">
            <input className={inputClass} value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} />
          </Field>
          <Field label="Legal name">
            <input className={inputClass} value={company.legalName} onChange={(e) => setCompany({ ...company, legalName: e.target.value })} />
          </Field>
          <Field label="Description (optional)">
            <textarea className={inputClass} rows={3} value={company.description} onChange={(e) => setCompany({ ...company, description: e.target.value })} />
          </Field>
          <Field label="Website (optional, https://…)">
            <input className={inputClass} value={company.websiteUrl} onChange={(e) => setCompany({ ...company, websiteUrl: e.target.value })} />
          </Field>
          <Field label="Contact email (optional)">
            <input className={inputClass} value={company.contactEmail} onChange={(e) => setCompany({ ...company, contactEmail: e.target.value })} />
          </Field>
          <Field label="Contact phone (optional)">
            <input className={inputClass} value={company.contactPhone} onChange={(e) => setCompany({ ...company, contactPhone: e.target.value })} />
          </Field>
          <Errors items={errors} />
          <button className={buttonClass} disabled={busy} type="submit">
            Submit application
          </button>
        </form>
        <button className={secondaryButtonClass} onClick={() => { setPath('choose'); setErrors([]); }}>
          Back
        </button>
      </Screen>
    );
  }

  return (
    <Screen>
      {header}
      <p className="text-sm">Complete your registration. Choose one — this cannot be changed later.</p>
      <button className={buttonClass} onClick={() => setPath('doctor')}>
        I am a physician
      </button>
      <button className={buttonClass} onClick={() => setPath('company')}>
        I represent a pharmaceutical company
      </button>
      {footer}
    </Screen>
  );
}

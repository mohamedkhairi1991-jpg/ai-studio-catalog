import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  COMPANY_SELF_SIGNUP_ENABLED,
  listCities,
  listCountries,
  listSpecialties,
  loadOnboardingState,
  onboardingStep,
  submitCompanyApplication,
  submitDoctorRecord,
  validateCompanyForm,
  validateDoctorForm,
  type CompanyForm,
  type DoctorForm,
  type OnboardingState,
  type Option,
} from '../lib/onboarding';
import { Errors, Field, Screen, buttonClass, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  authUserId: string;
  email: string;
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

export default function Onboarding({ client, authUserId, email, onChanged, onSignOut }: Props) {
  const [state, setState] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState<Path>(initialPath);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [doctor, setDoctor] = useState<DoctorForm>({ specialtyId: '', workplace: '', licenseNumber: '' });
  const [company, setCompany] = useState<CompanyForm>(emptyCompany);

  const reload = useCallback(async () => {
    setLoading(true);
    const next = await loadOnboardingState(client, authUserId);
    setState(next);
    if (next?.professional) {
      setDoctor({
        specialtyId: next.professional.specialtyId ?? '',
        workplace: next.professional.workplace ?? '',
        licenseNumber: next.professional.licenseNumber ?? '',
      });
    }
    setLoading(false);
  }, [client, authUserId]);

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
        <p className="text-sm text-[#B8C3CC]">{loading ? 'Loading…' : 'Your profile is not ready yet. Please sign out and sign in again.'}</p>
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

  const submitDoctor = async (e: FormEvent, update: boolean) => {
    e.preventDefault();
    const problems = validateDoctorForm(doctor);
    setErrors(problems);
    if (problems.length > 0) return;
    setBusy(true);
    const result = await submitDoctorRecord(client, doctor, update);
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

  const header = <p className="text-sm text-[#B8C3CC]">Signed in as {email}</p>;
  const footer = (
    <div className="flex gap-2">
      <button className={secondaryButtonClass} onClick={() => void refresh()}>
        Check status
      </button>
      <button className={secondaryButtonClass} onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );

  const doctorFields = (update: boolean) => (
    <form onSubmit={(e) => void submitDoctor(e, update)} className="space-y-3">
      <Field label="Specialty (optional)">
        <select className={inputClass} value={doctor.specialtyId} onChange={(e) => setDoctor({ ...doctor, specialtyId: e.target.value })}>
          <option value="">— Not specified —</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Workplace">
        <input className={inputClass} value={doctor.workplace} onChange={(e) => setDoctor({ ...doctor, workplace: e.target.value })} />
      </Field>
      <Field label="Medical license number">
        <input className={inputClass} value={doctor.licenseNumber} onChange={(e) => setDoctor({ ...doctor, licenseNumber: e.target.value })} />
      </Field>
      <Errors items={errors} />
      <button className={buttonClass} disabled={busy} type="submit">
        {update ? 'Resubmit for verification' : 'Submit for verification'}
      </button>
    </form>
  );

  if (step === 'doctor_pending') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-[#F59E0B]">Your physician registration is awaiting verification by a platform administrator.</p>
        {footer}
      </Screen>
    );
  }

  if (step === 'doctor_rejected') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-[#FF7272]">Your physician registration was not approved.</p>
        {state.professional?.reason && <p className="text-sm text-[#B8C3CC]">Reason: {state.professional.reason}</p>}
        {footer}
      </Screen>
    );
  }

  if (step === 'doctor_documents') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-[#F59E0B]">The administrator asked for more information.</p>
        {state.professional?.reason && <p className="text-sm text-[#B8C3CC]">Note: {state.professional.reason}</p>}
        {doctorFields(true)}
        {footer}
      </Screen>
    );
  }

  if (step === 'company_pending') {
    return (
      <Screen>
        {header}
        <p className="text-sm text-[#F59E0B]">
          Your application for {state.company?.name} is awaiting verification by a platform administrator.
        </p>
        {footer}
      </Screen>
    );
  }

  // step === 'choose'
  if (path === 'doctor') {
    return (
      <Screen>
        {header}
        <p className="text-sm">Physician registration</p>
        {!COMPANY_SELF_SIGNUP_ENABLED && (
          <p className="text-sm text-[#B8C3CC]">
            Register to access the official Iraq product catalog. A platform administrator verifies every physician
            before access is granted.
          </p>
        )}
        {doctorFields(false)}
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

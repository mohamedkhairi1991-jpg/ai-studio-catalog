import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { resolveAccess, type AccessResult, type Audience } from '../lib/access';
import { parseProductRoute } from '../lib/catalog';
import {
  doctorSelfSignup,
  listSpecialties,
  submitSignUpWithConsent,
  type Option,
} from '../lib/onboarding';
import { AdminCatalogReview } from './AdminCatalogReview';
import { CompanyCatalog } from './CompanyCatalog';
import { DoctorCatalog } from './DoctorCatalog';
import { LegalDocumentPage, resolveLegalPage } from './LegalPages';
import Onboarding from './Onboarding';
import { Field, Screen, TermsAcceptanceCheckbox, buttonClass, inputClass } from './ui';

const ROUTE_FOR: Partial<Record<Audience, string>> = {
  officialCatalog: '/catalog',
  companyWorkflow: '/company/catalog',
  administrator: '/catalog/review',
};

const BLOCKED_MESSAGE: Partial<Record<Audience, string>> = {
  suspended: 'This account is suspended or archived. Contact the platform administrator.',
  roleIneligible: 'This account is not eligible for catalog access (verification, role, or company status).',
};

export default function AuthGate() {
  const [session, setSession] = useState<Session | null>(null);
  const [access, setAccess] = useState<AccessResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [specialties, setSpecialties] = useState<Option[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);
  const [initialOnboardingError, setInitialOnboardingError] = useState<string | null>(null);
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/');
  const [pathname, setPathname] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const syncLocation = () => {
      setRoute(window.location.hash.replace(/^#/, '') || '/');
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void listSpecialties(supabase).then(setSpecialties);
  }, []);

  const load = useCallback(async (next: Session | null) => {
    setSession(next);
    if (!supabase || !next) {
      setAccess(null);
      setLoading(false);
      return;
    }
    let resolved = await resolveAccess(supabase, next.user);
    if (resolved.audience === 'pending') {
      const meta = (next.user.user_metadata ?? {}) as {
        full_name?: string | null;
        phone?: string | null;
        specialty_id?: string | null;
      };
      const metaPhone = (meta.phone ?? '').trim();
      const metaSpecialtyId = (meta.specialty_id ?? '').trim();
      const metaFullName = (meta.full_name ?? '').trim();
      if (metaPhone && metaSpecialtyId) {
        const selfRes = await doctorSelfSignup(supabase, {
          fullName: metaFullName,
          phone: metaPhone,
          specialtyId: metaSpecialtyId,
        });
        if (selfRes.ok) {
          setInitialOnboardingError(null);
          resolved = await resolveAccess(supabase, next.user);
        } else {
          setInitialOnboardingError(selfRes.message);
        }
      }
    }
    setAccess(resolved);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => load(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      void load(next);
    });
    return () => data.subscription.unsubscribe();
  }, [load]);

  const legalPage = resolveLegalPage(route, pathname);

  // Redirect rule: signed-in users only ever see the route their database role allows,
  // plus the public /privacy and /terms pages and #/product/<id> for officialCatalog.
  useEffect(() => {
    if (!access || legalPage) return;
    const home = ROUTE_FOR[access.audience];
    if (!home) return;
    if (access.audience === 'officialCatalog' && parseProductRoute(route)) {
      return;
    }
    if (route !== home) window.location.hash = home;
  }, [access, route, legalPage]);

  if (legalPage) {
    const backRoute = (access && ROUTE_FOR[access.audience]) || '/';
    return <LegalDocumentPage page={legalPage} backRoute={backRoute} />;
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <Screen>
        <p className="text-sm text-[#FF7272]">
          Configuration error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set. Use only the public
          project URL and the anon/publishable key.
        </p>
      </Screen>
    );
  }

  const client = supabase;

  if (loading) {
    return (
      <Screen>
        <p className="text-sm text-[#B8C3CC]">Loading…</p>
      </Screen>
    );
  }

  const signOut = async () => {
    await client.auth.signOut();
    window.location.hash = '/';
  };

  if (session && access) {
    if (access.audience === 'pending') {
      const meta = (session.user.user_metadata ?? {}) as {
        full_name?: string | null;
        phone?: string | null;
        specialty_id?: string | null;
      };
      return (
        <Onboarding
          client={client}
          authUserId={session.user.id}
          email={access.email}
          initialFullName={meta.full_name ?? ''}
          initialPhone={meta.phone ?? ''}
          initialSpecialtyId={meta.specialty_id ?? ''}
          initialError={initialOnboardingError}
          onChanged={() => void load(session)}
          onSignOut={() => void signOut()}
        />
      );
    }
    if (access.audience === 'administrator') {
      return <AdminCatalogReview client={client} access={access} onSignOut={() => void signOut()} />;
    }
    if (access.audience === 'officialCatalog') {
      return <DoctorCatalog client={client} access={access} onSignOut={() => void signOut()} />;
    }
    if (access.audience === 'companyWorkflow') {
      return <CompanyCatalog client={client} access={access} onSignOut={() => void signOut()} />;
    }
    const blocked = BLOCKED_MESSAGE[access.audience];
    return (
      <Screen>
        <p className="text-sm text-[#B8C3CC]">Signed in as {access.email}</p>
        {blocked && <p className="text-sm text-[#F59E0B]">{blocked}</p>}
        <button className={buttonClass} onClick={() => void signOut()}>
          Sign out
        </button>
      </Screen>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    const cleanEmail = email.trim().toLowerCase();
    try {
      if (mode === 'signin') {
        const { error } = await client.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) setNotice({ tone: 'error', text: 'Sign-in failed. Check your email and password.' });
      } else if (mode === 'signup') {
        const res = await submitSignUpWithConsent(client, {
          email: cleanEmail,
          password,
          fullName,
          phone,
          specialtyId,
          acceptedTerms,
        });
        if (!res.ok) {
          setNotice({ tone: 'error', text: res.message });
        } else if (res.sessionCreated) {
          const selfRes = await doctorSelfSignup(client, {
            fullName,
            phone,
            specialtyId,
          });
          if (!selfRes.ok) {
            setInitialOnboardingError(selfRes.message);
            setNotice({ tone: 'error', text: selfRes.message });
          } else {
            setInitialOnboardingError(null);
          }
          const { data } = await client.auth.getSession();
          await load(data.session);
        } else {
          setNotice({
            tone: 'ok',
            text: 'Check your email to confirm your account, then sign in.',
          });
        }
      } else {
        const { error } = await client.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: window.location.origin + import.meta.env.BASE_URL,
        });
        setNotice(
          error
            ? { tone: 'error', text: error.message }
            : { tone: 'ok', text: 'If the email exists, a reset link has been sent.' }
        );
      }
    } finally {
      setBusy(false);
      setPassword('');
    }
  };

  return (
    <Screen>
      <form onSubmit={submit} className="space-y-3">
        <p className="text-sm text-[#B8C3CC]">
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create a doctor account' : 'Reset password'}
        </p>
        <Field label="Email">
          <input
            className={inputClass}
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        {mode !== 'reset' && (
          <Field label="Password">
            <input
              className={inputClass}
              type="password"
              required
              minLength={8}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              placeholder="Password (at least 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        )}
        {mode === 'signup' && (
          <>
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
          </>
        )}
        {notice && (
          <p className={`text-sm ${notice.tone === 'error' ? 'text-[#FF7272]' : 'text-[#38C976]'}`}>{notice.text}</p>
        )}
        <button
          className={buttonClass}
          disabled={
            busy ||
            (mode === 'signup' &&
              (!acceptedTerms || !phone.trim() || !specialtyId.trim()))
          }
          type="submit"
        >
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
        </button>
      </form>
      <div className="flex justify-between text-xs text-[#5DB4F2]">
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setNotice(null);
            setAcceptedTerms(false);
          }}
        >
          {mode === 'signin' ? 'Create account' : 'Back to sign in'}
        </button>
        {mode === 'signin' && (
          <button
            type="button"
            onClick={() => {
              setMode('reset');
              setNotice(null);
            }}
          >
            Forgot password?
          </button>
        )}
      </div>
    </Screen>
  );
}

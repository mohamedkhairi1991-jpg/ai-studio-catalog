import { Eye, EyeOff } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import {
  clearOfflineAccess,
  loadOfflineAccess,
  readSavedSession,
  resolveAccess,
  saveOfflineAccess,
  type AccessResult,
  type Audience,
} from '../lib/access';
import { isOffline } from '../lib/offlineCatalog';
import { parseProductRoute } from '../lib/catalog';
import { isCompanyDirectoryRoute, parseCompanyRoute } from '../lib/companyPage';
import {
  doctorSelfSignup,
  listSpecialties,
  submitSignUpWithConsent,
  type Option,
} from '../lib/onboarding';
// Each workspace loads only when that kind of user opens it, so doctors do not
// download the admin and company screens (smaller first load on mobile data).
const loadDoctorCatalog = () => import('./DoctorCatalog');
const DoctorCatalog = lazy(() => loadDoctorCatalog().then((m) => ({ default: m.DoctorCatalog })));
const AdminCatalogReview = lazy(() =>
  import('./AdminCatalogReview').then((m) => ({ default: m.AdminCatalogReview }))
);
const CompanyCatalog = lazy(() =>
  import('./CompanyCatalog').then((m) => ({ default: m.CompanyCatalog }))
);

function WorkspaceLoader({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <Screen>
          <p className="text-sm text-text-muted">Loading…</p>
        </Screen>
      }
    >
      {children}
    </Suspense>
  );
}
import { LegalDocumentPage, resolveLegalPage } from './LegalPages';
import Onboarding from './Onboarding';
import { NotificationBell } from './NotificationBell';
import { recordAppOpen } from '../lib/notifications';
import { Field, Screen, TermsAcceptanceCheckbox, buttonClass, inputClass } from './ui';
import { TurnstileWidget, preloadTurnstile } from './TurnstileWidget';
import { CAPTCHA_ENABLED, captchaOptions, isCaptchaRequiredError, showCaptchaFor } from '../lib/captcha';

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
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  // Sign-in/reset show the robot check only if Supabase still asks for one.
  const [serverAskedCaptcha, setServerAskedCaptcha] = useState(false);

  // Load the robot check while the person reads the form, so it is ready
  // as soon as they open "Create account".
  useEffect(() => {
    if (CAPTCHA_ENABLED) preloadTurnstile();
    // Most users are doctors: fetch their screen in the background while the
    // sign-in form is open, so it shows at once after signing in.
    const timer = window.setTimeout(() => {
      void loadDoctorCatalog().catch(() => undefined);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);
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
    // With no internet, any database call waits ~30 s for the token refresh to
    // give up, so go straight to the access saved on this phone.
    let resolved: AccessResult = isOffline()
      ? { audience: 'pending', email: next.user.email ?? '', role: null, networkError: true }
      : await resolveAccess(supabase, next.user);
    // No internet: a doctor who signed in on this phone before keeps using
    // the catalog saved on the phone.
    if (resolved.networkError || (isOffline() && resolved.audience === 'pending')) {
      const saved = loadOfflineAccess(next.user.id);
      if (saved) {
        setAccess(saved);
        setLoading(false);
        return;
      }
    }
    if (resolved.audience === 'pending' && !resolved.networkError) {
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
    void recordAppOpen(supabase);
    saveOfflineAccess(next.user.id, resolved);
    setAccess(resolved);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const client = supabase;
    // Offline, supabase-js cannot refresh an expired token and returns no
    // session; the session saved on the phone is enough to open the saved catalog.
    // (With no internet, getSession() keeps retrying the token refresh for about
    // 30 seconds, so use the saved session straight away instead.)
    const start = () => {
      if (isOffline()) {
        const saved = readSavedSession();
        if (saved) return load(saved);
      }
      return client.auth.getSession().then(({ data }) => {
        const saved = !data.session && isOffline() ? readSavedSession() : null;
        return load(data.session ?? saved);
      });
    };
    void start();
    const { data } = client.auth.onAuthStateChange((event, next) => {
      if (!next && event !== 'SIGNED_OUT' && isOffline()) return;
      void load(next);
    });
    // Back online after opening offline: check the account with the database again.
    const onOnline = () => {
      setAccess((current) => {
        if (current?.offline) void start();
        return current;
      });
    };
    window.addEventListener('online', onOnline);
    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener('online', onOnline);
    };
  }, [load]);

  const legalPage = resolveLegalPage(route, pathname);

  // Redirect rule: signed-in users only ever see the route their database role allows,
  // plus the public /privacy and /terms pages, and for officialCatalog (doctors)
  // the drug pages #/product/<id>, company pages #/company/<id> and #/companies.
  useEffect(() => {
    if (!access || legalPage) return;
    const home = ROUTE_FOR[access.audience];
    if (!home) return;
    if (
      access.audience === 'officialCatalog' &&
      (parseProductRoute(route) || parseCompanyRoute(route) || isCompanyDirectoryRoute(route))
    ) {
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
        <p className="text-sm text-danger">
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
        <p className="text-sm text-text-muted">Loading…</p>
      </Screen>
    );
  }

  const signOut = async () => {
    clearOfflineAccess();
    // With no internet, sign out on this phone only (the server cannot be reached).
    await client.auth.signOut(isOffline() ? { scope: 'local' } : undefined);
    setSession(null);
    setAccess(null);
    window.location.hash = '/';
  };

  if (session && access) {
    if (access.networkError) {
      return (
        <Screen>
          <div className="space-y-3">
            <p className="text-sm text-text">
              No internet. Connect once while signed in, and Pharmaty will then work on this phone without internet.
            </p>
            <button className={buttonClass} onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        </Screen>
      );
    }
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
      return (
        <WorkspaceLoader>
          <AdminCatalogReview client={client} access={access} onSignOut={() => void signOut()} />
        </WorkspaceLoader>
      );
    }
    if (access.audience === 'officialCatalog') {
      return (
        <WorkspaceLoader>
          <DoctorCatalog client={client} access={access} onSignOut={() => void signOut()} />
        </WorkspaceLoader>
      );
    }
    if (access.audience === 'companyWorkflow') {
      return (
        <WorkspaceLoader>
          <CompanyCatalog client={client} access={access} onSignOut={() => void signOut()} />
        </WorkspaceLoader>
      );
    }
    const blocked = BLOCKED_MESSAGE[access.audience];
    return (
      <Screen>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-text-muted">Signed in as {access.email}</p>
          <NotificationBell client={client} profileId={access.profileId} />
        </div>
        {blocked && <p className="text-sm text-warning">{blocked}</p>}
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
        const { error } = await client.auth.signInWithPassword({
          email: cleanEmail,
          password,
          options: captchaOptions(captchaToken),
        });
        if (error && isCaptchaRequiredError(error.message)) {
          setServerAskedCaptcha(true);
          setNotice({ tone: 'error', text: 'Please complete the robot check, then sign in again.' });
        } else if (error) {
          setNotice({ tone: 'error', text: 'Sign-in failed. Check your email and password.' });
        }
      } else if (mode === 'signup') {
        const res = await submitSignUpWithConsent(client, {
          email: cleanEmail,
          password,
          fullName,
          phone,
          specialtyId,
          acceptedTerms,
          captchaToken,
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
          ...captchaOptions(captchaToken),
        });
        if (error && isCaptchaRequiredError(error.message)) {
          setServerAskedCaptcha(true);
          setNotice({ tone: 'error', text: 'Please complete the robot check, then try again.' });
        } else {
          setNotice(
            error
              ? { tone: 'error', text: error.message }
              : { tone: 'ok', text: 'If the email exists, a reset link has been sent.' }
          );
        }
      }
    } finally {
      setBusy(false);
      setPassword('');
      // A robot-check token works only once: get a fresh one.
      setCaptchaToken(null);
      setCaptchaKey((k) => k + 1);
    }
  };

  const captchaShown = showCaptchaFor(mode, serverAskedCaptcha);

  return (
    <Screen>
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-base font-semibold text-text">
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create a doctor account' : 'Reset password'}
        </h2>
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
            <div className="relative">
              <input
                className={`${inputClass} pr-12`}
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                placeholder="Password (at least 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                title={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 w-11 inline-flex items-center justify-center text-text-muted hover:text-text"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
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
        {captchaShown && (
          <TurnstileWidget key={`${mode}-${captchaKey}`} onToken={setCaptchaToken} />
        )}
        {notice && (
          <div
            className={`rounded-lg border px-3.5 py-2.5 text-sm ${
              notice.tone === 'error'
                ? 'border-danger/40 bg-danger/10 text-danger'
                : 'border-success/40 bg-success/10 text-success'
            }`}
          >
            {notice.text}
          </div>
        )}
        <button
          className={buttonClass}
          disabled={
            busy ||
            (captchaShown && !captchaToken) ||
            (mode === 'signup' &&
              (!acceptedTerms || !phone.trim() || !specialtyId.trim()))
          }
          type="submit"
        >
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
        </button>
      </form>
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs font-medium text-accent">
        <button
          type="button"
          className="py-1.5 hover:underline transition-colors duration-150"
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
            className="py-1.5 hover:underline transition-colors duration-150"
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

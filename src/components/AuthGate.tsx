import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { resolveAccess, type AccessResult, type Audience } from '../lib/access';
import AdminApprovals from './AdminApprovals';
import Onboarding from './Onboarding';
import { Screen, buttonClass, inputClass } from './ui';

const ROUTE_FOR: Partial<Record<Audience, string>> = {
  officialCatalog: '/catalog',
  companyWorkflow: '/company/catalog',
  administrator: '/catalog/review',
};

const BLOCKED_MESSAGE: Partial<Record<Audience, string>> = {
  pending: 'Your account is awaiting verification by a platform administrator. Catalog access is unlocked after approval.',
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
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const load = useCallback(async (next: Session | null) => {
    setSession(next);
    if (!supabase || !next) {
      setAccess(null);
      setLoading(false);
      return;
    }
    setAccess(await resolveAccess(supabase, next.user));
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

  // Redirect rule: signed-in users only ever see the route their database role allows.
  useEffect(() => {
    if (!access) return;
    const home = ROUTE_FOR[access.audience];
    if (home && route !== home) window.location.hash = home;
  }, [access, route]);

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
      return (
        <Onboarding
          client={client}
          authUserId={session.user.id}
          email={access.email}
          onChanged={() => void load(session)}
          onSignOut={() => void signOut()}
        />
      );
    }
    if (access.audience === 'administrator') {
      return <AdminApprovals client={client} email={access.email} onSignOut={() => void signOut()} />;
    }
    const home = ROUTE_FOR[access.audience];
    const blocked = BLOCKED_MESSAGE[access.audience];
    return (
      <Screen>
        <p className="text-sm text-[#B8C3CC]">Signed in as {access.email}</p>
        {blocked ? (
          <p className="text-sm text-[#F59E0B]">{blocked}</p>
        ) : (
          <div className="space-y-2 text-sm">
            <p className="text-[#38C976]">Access verified by the database.</p>
            <p>Workspace: {home}</p>
            {access.companyName && <p>Company: {access.companyName}</p>}
            <p className="text-[#B8C3CC]">
              Catalog data is not connected in this web client yet. Use the Pharamty Flutter apps for the
              official catalog until it is wired to the database.
            </p>
          </div>
        )}
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
        const { error } = await client.auth.signUp({ email: cleanEmail, password });
        setNotice(
          error
            ? { tone: 'error', text: error.message }
            : { tone: 'ok', text: 'Account created. Confirm your email if asked, then wait for admin verification.' }
        );
      } else {
        const { error } = await client.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: window.location.origin,
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
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create a physician account' : 'Reset password'}
        </p>
        <input
          className={inputClass}
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {mode !== 'reset' && (
          <input
            className={inputClass}
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {notice && (
          <p className={`text-sm ${notice.tone === 'error' ? 'text-[#FF7272]' : 'text-[#38C976]'}`}>{notice.text}</p>
        )}
        <button className={buttonClass} disabled={busy} type="submit">
          {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
        </button>
      </form>
      <div className="flex justify-between text-xs text-[#5DB4F2]">
        <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
          {mode === 'signin' ? 'Create account' : 'Back to sign in'}
        </button>
        {mode === 'signin' && (
          <button type="button" onClick={() => setMode('reset')}>
            Forgot password?
          </button>
        )}
      </div>
    </Screen>
  );
}

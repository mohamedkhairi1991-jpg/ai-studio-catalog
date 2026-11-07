// signup-captcha-hook — Supabase Auth "Before User Created" HTTP hook.
//
// Checks the Cloudflare Turnstile token ONLY when a new account is created.
// Sign-in and password reset do not create users, so they never hit this
// hook and never show the robot check.
//
// The sign-up form sends the token in user metadata as `captcha_token`;
// a database trigger removes it before the user row is saved.
//
// Secrets (set by the owner in Supabase → Edge Functions → Secrets; never in code or chat):
//   TURNSTILE_SECRET_KEY            Cloudflare Turnstile secret key
//   BEFORE_USER_CREATED_HOOK_SECRET the "v1,whsec_..." secret from Auth → Hooks
// Deployed with verify_jwt = false: Supabase Auth signs each call instead.

import {
  SITEVERIFY_URL,
  captchaTokenFromEvent,
  reject,
  siteverifyBody,
  siteverifyPassed,
  verifyHookSignature,
  type HookEvent,
} from './hook.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const hookSecret = Deno.env.get('BEFORE_USER_CREATED_HOOK_SECRET') ?? '';
  const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY') ?? '';
  const body = await req.text();

  const signed = await verifyHookSignature(
    hookSecret,
    {
      id: req.headers.get('webhook-id'),
      timestamp: req.headers.get('webhook-timestamp'),
      signature: req.headers.get('webhook-signature'),
    },
    body
  );
  if (!signed) return json({ error: 'Invalid signature' }, 401);

  if (!turnstileSecret) {
    return json(reject('Sign-up robot check is not set up yet. Please try again later.', 503));
  }

  let event: HookEvent;
  try {
    event = JSON.parse(body) as HookEvent;
  } catch {
    return json(reject('Bad sign-up request.'));
  }

  const token = captchaTokenFromEvent(event);
  if (!token) return json(reject('Please complete the robot check, then try again.'));

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: siteverifyBody(turnstileSecret, token, event.metadata?.ip_address),
      signal: AbortSignal.timeout(8000),
    });
    const answer = await res.json().catch(() => null);
    if (!siteverifyPassed(answer)) {
      return json(reject('Robot check failed. Please try again.'));
    }
  } catch {
    return json(reject('Could not check the robot test. Please try again.', 503));
  }

  return json({});
});

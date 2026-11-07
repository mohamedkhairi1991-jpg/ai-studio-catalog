// Pure helpers for the signup-captcha-hook edge function (tested with vitest).
//
// Supabase Auth "Before User Created" hook: runs only when a NEW user is about
// to be created (sign-up). Sign-in and password reset never reach it, so the
// Cloudflare Turnstile robot check is asked only once, at sign-up.

export const CAPTCHA_METADATA_KEY = 'captcha_token';
export const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
/** Standard Webhooks: reject deliveries older or newer than 5 minutes. */
export const MAX_CLOCK_SKEW_SECONDS = 5 * 60;

export interface HookEvent {
  metadata?: { ip_address?: string; name?: string };
  user?: { user_metadata?: Record<string, unknown> | null };
}

export interface HookError {
  error: { http_code: number; message: string };
}

export function reject(message: string, httpCode = 400): HookError {
  return { error: { http_code: httpCode, message } };
}

/** The Turnstile token the sign-up form put in user metadata, if any. */
export function captchaTokenFromEvent(event: HookEvent): string | null {
  const raw = event?.user?.user_metadata?.[CAPTCHA_METADATA_KEY];
  if (typeof raw !== 'string') return null;
  const token = raw.trim();
  // Turnstile tokens are at most 2048 characters.
  if (token === '' || token.length > 2048) return null;
  return token;
}

/** Form body for Cloudflare siteverify. */
export function siteverifyBody(secret: string, token: string, ip?: string): URLSearchParams {
  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip.trim() !== '') body.set('remoteip', ip.trim());
  return body;
}

/** True only for a successful Cloudflare answer. */
export function siteverifyPassed(answer: unknown): boolean {
  return Boolean(answer && typeof answer === 'object' && (answer as { success?: unknown }).success === true);
}

// ---- Standard Webhooks signature (what Supabase Auth hooks use) ----

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToBase64(bytes: ArrayBuffer): string {
  let bin = '';
  const view = new Uint8Array(bytes);
  for (let i = 0; i < view.length; i++) bin += String.fromCharCode(view[i]);
  return btoa(bin);
}

/** Dashboard secrets look like "v1,whsec_<base64>"; return the raw key bytes. */
export function hookSecretBytes(secret: string): Uint8Array {
  const clean = secret.trim().replace(/^v1,/, '').replace(/^whsec_/, '');
  return base64ToBytes(clean);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signPayload(
  secret: string,
  id: string,
  timestamp: string,
  body: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    hookSecretBytes(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${id}.${timestamp}.${body}`));
  return bytesToBase64(mac);
}

/** Verify the webhook-id / webhook-timestamp / webhook-signature headers. */
export async function verifyHookSignature(
  secret: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  body: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<boolean> {
  const { id, timestamp, signature } = headers;
  if (!secret || !id || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowSeconds - ts) > MAX_CLOCK_SKEW_SECONDS) return false;
  let expected: string;
  try {
    expected = await signPayload(secret, id, timestamp, body);
  } catch {
    return false;
  }
  return signature
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.startsWith('v1,'))
    .some((part) => timingSafeEqual(part.slice(3), expected));
}

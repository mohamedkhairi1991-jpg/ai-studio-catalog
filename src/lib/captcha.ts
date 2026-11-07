// Cloudflare Turnstile robot check. Shown at sign-up only: a server hook
// (supabase/functions/signup-captcha-hook) checks the token when a new
// account is created. Sign-in and password reset have no robot check.
// The site key is public (it is meant to be in the browser). The secret key
// lives only in Supabase (Edge Function secret), never in code.
export const TURNSTILE_SITE_KEY: string =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() ||
  '0x4AAAAAAFz4fTdVWophI-ra';

export const CAPTCHA_ENABLED: boolean =
  import.meta.env.VITE_CAPTCHA_DISABLED !== 'true' && TURNSTILE_SITE_KEY !== '';

/** User-metadata key the sign-up hook reads (a DB trigger removes it afterwards). */
export const SIGNUP_CAPTCHA_METADATA_KEY = 'captcha_token';

/** Supabase auth options carrying the captcha token, or nothing when off. */
export function captchaOptions(token: string | null): { captchaToken?: string } {
  return CAPTCHA_ENABLED && token ? { captchaToken: token } : {};
}

/** Sign-up metadata carrying the token for the server hook, or nothing when off. */
export function signupCaptchaMetadata(token: string | null): Record<string, string> {
  return CAPTCHA_ENABLED && token ? { [SIGNUP_CAPTCHA_METADATA_KEY]: token } : {};
}

/**
 * True when Supabase refused a request because it still expects a captcha
 * (the old project-wide setting). The form then shows the robot check
 * for that one try instead of failing.
 */
export function isCaptchaRequiredError(message: string | null | undefined): boolean {
  return typeof message === 'string' && /captcha/i.test(message);
}

/** Robot check is shown at sign-up, or on sign-in/reset only if the server asks for it. */
export function showCaptchaFor(mode: 'signin' | 'signup' | 'reset', serverAsked: boolean): boolean {
  if (!CAPTCHA_ENABLED) return false;
  return mode === 'signup' || serverAsked;
}

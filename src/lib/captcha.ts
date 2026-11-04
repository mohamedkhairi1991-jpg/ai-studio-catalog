// Cloudflare Turnstile robot check for sign-in, sign-up and password reset.
// The site key is public (it is meant to be in the browser). The secret key
// lives only in Supabase Auth settings.
export const TURNSTILE_SITE_KEY: string =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() ||
  '0x4AAAAAAFz4fTdVWophI-ra';

export const CAPTCHA_ENABLED: boolean =
  import.meta.env.VITE_CAPTCHA_DISABLED !== 'true' && TURNSTILE_SITE_KEY !== '';

/** Supabase auth options carrying the captcha token, or nothing when off. */
export function captchaOptions(token: string | null): { captchaToken?: string } {
  return CAPTCHA_ENABLED && token ? { captchaToken: token } : {};
}

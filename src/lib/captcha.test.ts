import { describe, expect, it } from 'vitest';
import {
  CAPTCHA_ENABLED,
  SIGNUP_CAPTCHA_METADATA_KEY,
  TURNSTILE_SITE_KEY,
  captchaOptions,
  isCaptchaRequiredError,
  showCaptchaFor,
  signupCaptchaMetadata,
} from './captcha';

describe('robot check (Turnstile)', () => {
  it('has the public site key and is on by default', () => {
    expect(TURNSTILE_SITE_KEY.startsWith('0x')).toBe(true);
    expect(CAPTCHA_ENABLED).toBe(true);
  });

  it('adds the token to auth options only when there is one', () => {
    expect(captchaOptions('abc')).toEqual({ captchaToken: 'abc' });
    expect(captchaOptions(null)).toEqual({});
  });

  it('puts the sign-up token in metadata for the server hook', () => {
    expect(SIGNUP_CAPTCHA_METADATA_KEY).toBe('captcha_token');
    expect(signupCaptchaMetadata('abc')).toEqual({ captcha_token: 'abc' });
    expect(signupCaptchaMetadata(null)).toEqual({});
  });

  it('shows the check at sign-up only, unless the server asks for it', () => {
    expect(showCaptchaFor('signup', false)).toBe(true);
    expect(showCaptchaFor('signin', false)).toBe(false);
    expect(showCaptchaFor('reset', false)).toBe(false);
    expect(showCaptchaFor('signin', true)).toBe(true);
  });

  it('spots a captcha-required error from Supabase', () => {
    expect(isCaptchaRequiredError('captcha verification process failed')).toBe(true);
    expect(isCaptchaRequiredError('Invalid login credentials')).toBe(false);
    expect(isCaptchaRequiredError(null)).toBe(false);
  });
});

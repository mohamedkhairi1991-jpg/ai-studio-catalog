import { describe, expect, it } from 'vitest';
import { CAPTCHA_ENABLED, TURNSTILE_SITE_KEY, captchaOptions } from './captcha';

describe('robot check (Turnstile)', () => {
  it('has the public site key and is on by default', () => {
    expect(TURNSTILE_SITE_KEY.startsWith('0x')).toBe(true);
    expect(CAPTCHA_ENABLED).toBe(true);
  });

  it('adds the token to auth options only when there is one', () => {
    expect(captchaOptions('abc')).toEqual({ captchaToken: 'abc' });
    expect(captchaOptions(null)).toEqual({});
  });
});

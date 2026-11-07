import { describe, expect, it } from 'vitest';
import {
  CAPTCHA_METADATA_KEY,
  captchaTokenFromEvent,
  reject,
  signPayload,
  siteverifyBody,
  siteverifyPassed,
  verifyHookSignature,
} from './hook';

// Test-only key (base64 of "test-hook-secret-0123456789abcd"), not a real secret.
const SECRET = 'v1,whsec_' + btoa('test-hook-secret-0123456789abcd');

describe('signup captcha hook', () => {
  it('reads the token from user metadata', () => {
    expect(CAPTCHA_METADATA_KEY).toBe('captcha_token');
    expect(captchaTokenFromEvent({ user: { user_metadata: { captcha_token: ' tok ' } } })).toBe('tok');
    expect(captchaTokenFromEvent({ user: { user_metadata: {} } })).toBeNull();
    expect(captchaTokenFromEvent({ user: { user_metadata: { captcha_token: 5 } } })).toBeNull();
    expect(captchaTokenFromEvent({ user: { user_metadata: { captcha_token: 'x'.repeat(2049) } } })).toBeNull();
    expect(captchaTokenFromEvent({})).toBeNull();
  });

  it('builds the siteverify body and reads the answer', () => {
    const body = siteverifyBody('sec', 'tok', '1.2.3.4');
    expect(body.get('secret')).toBe('sec');
    expect(body.get('response')).toBe('tok');
    expect(body.get('remoteip')).toBe('1.2.3.4');
    expect(siteverifyBody('sec', 'tok').has('remoteip')).toBe(false);
    expect(siteverifyPassed({ success: true })).toBe(true);
    expect(siteverifyPassed({ success: false })).toBe(false);
    expect(siteverifyPassed(null)).toBe(false);
  });

  it('returns hook errors in the Supabase shape', () => {
    expect(reject('no')).toEqual({ error: { http_code: 400, message: 'no' } });
  });

  it('accepts only correctly signed, fresh hook calls', async () => {
    const now = 1_800_000_000;
    const body = '{"user":{}}';
    const sig = await signPayload(SECRET, 'msg_1', String(now), body);
    const headers = { id: 'msg_1', timestamp: String(now), signature: `v1,${sig}` };
    expect(await verifyHookSignature(SECRET, headers, body, now)).toBe(true);
    expect(await verifyHookSignature(SECRET, { ...headers, signature: `v1a,x v1,${sig}` }, body, now)).toBe(true);
    expect(await verifyHookSignature(SECRET, headers, body + ' ', now)).toBe(false);
    expect(await verifyHookSignature(SECRET, headers, body, now + 301)).toBe(false);
    expect(await verifyHookSignature('', headers, body, now)).toBe(false);
    expect(await verifyHookSignature(SECRET, { ...headers, signature: null }, body, now)).toBe(false);
  });
});

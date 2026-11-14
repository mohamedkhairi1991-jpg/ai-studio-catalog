import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import { DOCTOR_NOTEBOOK_MAX, dataUrlToBlob, loadMyNotebook, saveMyAvatar, saveMyNotebook } from './doctorProfile';

const PNG_1PX =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

describe('doctor profile storage', () => {
  it('turns a picture data URL into a Blob and refuses other text', () => {
    const blob = dataUrlToBlob(PNG_1PX);
    expect(blob?.type).toBe('image/png');
    expect(blob && blob.size > 0).toBe(true);
    expect(dataUrlToBlob('data:text/plain;base64,aGk=')).toBeNull();
    expect(dataUrlToBlob('not a data url')).toBeNull();
  });

  it('uploads the picture to the user folder and saves the path', async () => {
    const uploads: string[] = [];
    const rpcs: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const client = {
      auth: { getUser: async () => ({ data: { user: { id: 'u1' } } }) },
      storage: {
        from: () => ({
          upload: async (path: string) => {
            uploads.push(path);
            return { error: null };
          },
          getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn.example/${path}` } }),
        }),
      },
      rpc: async (fn: string, args: Record<string, unknown>) => {
        rpcs.push({ fn, args });
        return { data: null, error: null };
      },
    } as unknown as SupabaseClient;

    const res = await saveMyAvatar(client, PNG_1PX);
    expect(res.ok).toBe(true);
    expect(uploads[0]).toMatch(/^u1\/avatar-\d+\.png$/);
    expect(rpcs[0]).toEqual({ fn: 'set_my_avatar', args: { p_path: uploads[0] } });
    expect(res.ok && res.data).toBe(`https://cdn.example/${uploads[0]}`);
    expect(await saveMyAvatar(client, 'data:text/plain;base64,aGk=')).toEqual({
      ok: false,
      message: 'Use a JPG, PNG or WebP picture.',
    });
  });

  it('loads and saves the notebook (max 30 entries)', async () => {
    const rpcs: Array<{ fn: string; args?: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args?: Record<string, unknown>) => {
        rpcs.push({ fn, args });
        return { data: fn === 'get_my_notebook' ? [{ id: 'n1' }] : null, error: null };
      },
    } as unknown as SupabaseClient;
    expect(await loadMyNotebook(client)).toEqual({ ok: true, data: [{ id: 'n1' }] });
    const many = Array.from({ length: 40 }, (_, i) => ({ id: `n${i}` }));
    await saveMyNotebook(client, many);
    expect((rpcs[1].args?.p_notebook as unknown[]).length).toBe(DOCTOR_NOTEBOOK_MAX);
  });
});

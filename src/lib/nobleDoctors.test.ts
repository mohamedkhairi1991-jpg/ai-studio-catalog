import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  buildNobleDoctorRouteHash,
  loadNobleDoctorPage,
  parseNobleDoctor,
  parseNoblePost,
  parseNobleRoute,
  saveNoblePost,
} from './nobleDoctors';

describe('noble doctors', () => {
  it('reads routes', () => {
    expect(parseNobleRoute('#/noble')).toEqual({ doctorId: null });
    expect(parseNobleRoute('#/noble/')).toEqual({ doctorId: null });
    expect(parseNobleRoute(buildNobleDoctorRouteHash('abc-1'))).toEqual({ doctorId: 'abc-1' });
    expect(parseNobleRoute('#/catalog')).toBeNull();
    expect(parseNobleRoute('#/noble/a/b')).toBeNull();
  });

  it('parses doctors and posts from the database JSON', () => {
    expect(parseNobleDoctor({ profileId: 'p1', fullName: 'Dr. Sara', specialtyId: 's1', postCount: 3 })).toMatchObject({
      profileId: 'p1',
      fullName: 'Dr. Sara',
      postCount: 3,
      isActive: true,
      title: null,
    });
    expect(parseNobleDoctor({ fullName: 'x' })).toBeNull();
    const post = parseNoblePost({
      id: 'n1',
      body: 'Check inhaler technique.',
      topic: 'approach',
      isPinned: true,
      images: ['u/1.jpg', 5],
      drugs: [{ productId: 'd1', brandName: 'Ventolin' }, { brandName: 'no id' }],
      author: { profileId: 'p1', fullName: 'Dr. Sara' },
    });
    expect(post).toMatchObject({ topic: 'approach', isPinned: true, images: ['u/1.jpg'], drugs: [{ productId: 'd1', brandName: 'Ventolin' }] });
    expect(post?.author?.fullName).toBe('Dr. Sara');
    expect(parseNoblePost({ id: 'n2', body: 'x', topic: 'weird' })?.topic).toBe('tip');
    expect(parseNoblePost({ id: 'n3', body: 'x' })?.viewCount).toBeNull();
    expect(parseNoblePost({ id: 'n4', body: 'x', viewCount: 12 })?.viewCount).toBe(12);
  });

  it('loads a page and saves a post with the right arguments', async () => {
    const calls: Array<{ fn: string; args?: Record<string, unknown> }> = [];
    const client = {
      rpc: async (fn: string, args?: Record<string, unknown>) => {
        calls.push({ fn, args });
        if (fn === 'get_noble_doctor_page') {
          return { data: { doctor: { profileId: 'p1', fullName: 'Dr. Sara' }, posts: [{ id: 'n1', body: 'Hi' }] }, error: null };
        }
        return { data: 'new-id', error: null };
      },
    } as unknown as SupabaseClient;
    const page = await loadNobleDoctorPage(client, 'p1');
    expect(page.ok && page.data.posts.length).toBe(1);
    expect(await saveNoblePost(client, { title: ' ', body: '  ', topic: 'tip', pinned: false, productIds: [], imagePaths: [] })).toEqual({
      ok: false,
      message: 'Write something first.',
    });
    const saved = await saveNoblePost(client, {
      title: 'T',
      body: 'Body',
      topic: 'case',
      pinned: true,
      productIds: ['d1', 'd1', 'd2'],
      imagePaths: ['u/1.jpg'],
    });
    expect(saved).toEqual({ ok: true, data: 'new-id' });
    expect(calls[1]).toEqual({
      fn: 'noble_save_post',
      args: { p_post_id: null, p_title: 'T', p_body: 'Body', p_topic: 'case', p_pinned: true, p_product_ids: ['d1', 'd2'], p_image_paths: ['u/1.jpg'] },
    });
  });
});

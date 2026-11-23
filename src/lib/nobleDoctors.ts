import type { SupabaseClient } from '@supabase/supabase-js';
import { doctorAvatarUrl } from './doctorProfile';

/**
 * Noble doctors: experienced doctors chosen by the admin, listed by specialty,
 * each with a public page of posts (notes and recommendations, with pictures
 * and linked drugs) that every approved doctor can read. Posts go live without
 * approval; the admin can hide a post or remove the noble role.
 * Migration 20261123150000_noble_doctors.sql.
 */

export const NOBLE_POSTS_BUCKET = 'noble-posts';
export const NOBLE_ROUTE = '#/noble';
export const NOBLE_MAX_IMAGES = 10;
export const NOBLE_MAX_DRUGS = 10;
export const NOBLE_DISCLAIMER = 'Personal clinical experience, not official guidance. Always use your own judgement.';

export type NobleTopic = 'tip' | 'approach' | 'case' | 'warning';
export const NOBLE_TOPIC_LABELS: Record<NobleTopic, string> = {
  tip: 'Tip',
  approach: 'Treatment approach',
  case: 'Case lesson',
  warning: 'Warning',
};

export interface NobleDoctor {
  profileId: string;
  fullName: string;
  avatarPath: string | null;
  specialtyId: string;
  specialtyName: string | null;
  title: string | null;
  bio: string | null;
  workplace: string | null;
  isActive: boolean;
  postCount: number;
  lastPostAt: string | null;
}

export interface NoblePost {
  id: string;
  authorProfileId: string;
  title: string | null;
  body: string;
  topic: NobleTopic;
  isPinned: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
  drugs: Array<{ productId: string; brandName: string }>;
  /** In feeds and drug notes: who wrote it. */
  author: NobleDoctor | null;
}

export interface NobleSpecialty {
  specialtyId: string;
  name: string;
  doctorCount: number;
}

export interface NobleDoctorPage {
  doctor: NobleDoctor;
  posts: NoblePost[];
}

export interface AdminDoctorRow {
  profileId: string;
  fullName: string;
  email: string | null;
  specialtyId: string | null;
  specialtyName: string | null;
  workplace: string | null;
  isNoble: boolean;
}

export type NobleResult<T> = { ok: true; data: T } | { ok: false; message: string };

function fail(error: { message?: string } | null | undefined, fallback: string): { ok: false; message: string } {
  return { ok: false, message: error?.message?.trim() || fallback };
}

const str = (v: unknown): string | null => (typeof v === 'string' && v.trim() !== '' ? v : null);
const list = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? (v as Record<string, unknown>[]) : []);
const asTopic = (v: unknown): NobleTopic =>
  v === 'approach' || v === 'case' || v === 'warning' ? v : 'tip';

// ---------------------------------------------------------------------------
// Parsing (exported for tests)

export function parseNobleDoctor(raw: unknown): NobleDoctor | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.profileId !== 'string') return null;
  return {
    profileId: r.profileId,
    fullName: str(r.fullName) ?? 'Doctor',
    avatarPath: str(r.avatarPath),
    specialtyId: typeof r.specialtyId === 'string' ? r.specialtyId : '',
    specialtyName: str(r.specialtyName),
    title: str(r.title),
    bio: str(r.bio),
    workplace: str(r.workplace),
    isActive: r.isActive !== false,
    postCount: Number(r.postCount ?? 0),
    lastPostAt: str(r.lastPostAt),
  };
}

export function parseNoblePost(raw: unknown): NoblePost | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== 'string' || typeof r.body !== 'string') return null;
  return {
    id: r.id,
    authorProfileId: typeof r.authorProfileId === 'string' ? r.authorProfileId : '',
    title: str(r.title),
    body: r.body,
    topic: asTopic(r.topic),
    isPinned: r.isPinned === true,
    isHidden: r.isHidden === true,
    createdAt: str(r.createdAt) ?? '',
    updatedAt: str(r.updatedAt) ?? '',
    images: Array.isArray(r.images) ? (r.images as unknown[]).filter((p): p is string => typeof p === 'string') : [],
    drugs: list(r.drugs)
      .filter((d) => typeof d.productId === 'string')
      .map((d) => ({ productId: d.productId as string, brandName: str(d.brandName) ?? 'Drug' })),
    author: parseNobleDoctor(r.author),
  };
}

const posts = (v: unknown): NoblePost[] =>
  (Array.isArray(v) ? v : []).map(parseNoblePost).filter((p): p is NoblePost => p !== null);

// ---------------------------------------------------------------------------
// Routes: #/noble (list) and #/noble/<profileId> (a doctor's page)

export function buildNobleDoctorRouteHash(profileId: string): string {
  return `#/noble/${encodeURIComponent(profileId.trim())}`;
}

/** null = not a noble route; {doctorId: null} = the list; {doctorId} = a page. */
export function parseNobleRoute(hash: string): { doctorId: string | null } | null {
  const path = hash.replace(/^#/, '').replace(/^\/+|\/+$/g, '');
  if (path.toLowerCase() === 'noble') return { doctorId: null };
  const match = /^noble\/([^/?#]+)$/i.exec(path);
  if (!match) return null;
  try {
    const id = decodeURIComponent(match[1]).trim();
    return id ? { doctorId: id } : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Pictures

export function nobleImageUrl(client: SupabaseClient, path: string): string {
  return client.storage.from(NOBLE_POSTS_BUCKET).getPublicUrl(path).data.publicUrl;
}

export function nobleAvatarUrl(client: SupabaseClient, doctor: Pick<NobleDoctor, 'avatarPath'> | null): string | null {
  return doctor ? doctorAvatarUrl(client, doctor.avatarPath) : null;
}

/** Shrink a picture on the phone before upload (longest side 1600 px, JPEG); GIFs stay as they are. */
export async function shrinkImage(file: File, maxSide = 1600, quality = 0.85): Promise<Blob> {
  if (file.type === 'image/gif' || typeof document === 'undefined') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 900 * 1024 && file.type === 'image/jpeg') return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    return blob ?? file;
  } catch {
    return file;
  }
}

/** Upload one picture to the signed-in noble doctor's folder; returns its storage path. */
export async function uploadNobleImage(client: SupabaseClient, file: File): Promise<NobleResult<string>> {
  const { data: userData } = await client.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return { ok: false, message: 'Please sign in.' };
  const blob = await shrinkImage(file);
  if (blob.size > 5 * 1024 * 1024) return { ok: false, message: 'Each picture must be 5 MB or smaller.' };
  const type = blob.type || file.type;
  const ext = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : type === 'image/gif' ? 'gif' : 'jpg';
  const path = `${uid}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await client.storage
    .from(NOBLE_POSTS_BUCKET)
    .upload(path, blob, { contentType: type || 'image/jpeg', upsert: false });
  return error ? fail(error, 'Could not upload the picture.') : { ok: true, data: path };
}

// ---------------------------------------------------------------------------
// Reading

export async function loadMyNobleStatus(client: SupabaseClient): Promise<NobleDoctor | null> {
  const { data, error } = await client.rpc('get_my_noble_status');
  if (error || !data || (data as { isNoble?: boolean }).isNoble !== true) return null;
  return parseNobleDoctor((data as { doctor?: unknown }).doctor);
}

export async function loadNobleSpecialties(client: SupabaseClient): Promise<NobleResult<NobleSpecialty[]>> {
  const { data, error } = await client.rpc('get_noble_specialties');
  if (error) return fail(error, 'Could not load specialties.');
  return {
    ok: true,
    data: list(data).map((r) => ({
      specialtyId: String(r.specialtyId ?? ''),
      name: str(r.name) ?? 'Specialty',
      doctorCount: Number(r.doctorCount ?? 0),
    })),
  };
}

export async function loadNobleDoctors(
  client: SupabaseClient,
  specialtyId?: string | null
): Promise<NobleResult<NobleDoctor[]>> {
  const { data, error } = await client.rpc('get_noble_doctors', { p_specialty_id: specialtyId || null });
  if (error) return fail(error, 'Could not load noble doctors.');
  return { ok: true, data: list(data).map(parseNobleDoctor).filter((d): d is NobleDoctor => d !== null) };
}

export async function loadNobleDoctorPage(
  client: SupabaseClient,
  profileId: string
): Promise<NobleResult<NobleDoctorPage>> {
  const { data, error } = await client.rpc('get_noble_doctor_page', { p_profile_id: profileId });
  if (error) return fail(error, 'Could not load this page.');
  const doctor = parseNobleDoctor((data as { doctor?: unknown } | null)?.doctor);
  if (!doctor) return { ok: false, message: 'This noble doctor was not found.' };
  return { ok: true, data: { doctor, posts: posts((data as { posts?: unknown }).posts) } };
}

export async function loadNobleFeed(
  client: SupabaseClient,
  input: { specialtyId?: string | null; limit?: number; offset?: number } = {}
): Promise<NobleResult<NoblePost[]>> {
  const { data, error } = await client.rpc('get_noble_feed', {
    p_specialty_id: input.specialtyId || null,
    p_limit: input.limit ?? 20,
    p_offset: input.offset ?? 0,
  });
  return error ? fail(error, 'Could not load posts.') : { ok: true, data: posts(data) };
}

export async function loadProductNobleNotes(client: SupabaseClient, productId: string): Promise<NobleResult<NoblePost[]>> {
  const { data, error } = await client.rpc('get_product_noble_notes', { p_product_id: productId, p_limit: 10 });
  return error ? fail(error, 'Could not load noble doctors’ notes.') : { ok: true, data: posts(data) };
}

// ---------------------------------------------------------------------------
// Writing (noble doctors)

export interface NoblePostInput {
  id?: string | null;
  title: string;
  body: string;
  topic: NobleTopic;
  pinned: boolean;
  productIds: string[];
  imagePaths: string[];
}

export async function saveNoblePost(client: SupabaseClient, input: NoblePostInput): Promise<NobleResult<string>> {
  const body = input.body.trim();
  if (!body) return { ok: false, message: 'Write something first.' };
  const { data, error } = await client.rpc('noble_save_post', {
    p_post_id: input.id || null,
    p_title: input.title.trim() || null,
    p_body: body,
    p_topic: input.topic,
    p_pinned: input.pinned,
    p_product_ids: [...new Set(input.productIds)].slice(0, NOBLE_MAX_DRUGS),
    p_image_paths: input.imagePaths.slice(0, NOBLE_MAX_IMAGES),
  });
  return error ? fail(error, 'Could not save the post.') : { ok: true, data: String(data) };
}

export async function deleteNoblePost(client: SupabaseClient, postId: string): Promise<NobleResult<void>> {
  const { error } = await client.rpc('noble_delete_post', { p_post_id: postId });
  return error ? fail(error, 'Could not delete the post.') : { ok: true, data: undefined };
}

export async function updateMyNobleProfile(
  client: SupabaseClient,
  title: string,
  bio: string
): Promise<NobleResult<NobleDoctor>> {
  const { data, error } = await client.rpc('noble_update_my_profile', { p_title: title, p_bio: bio });
  const doctor = parseNobleDoctor(data);
  if (error) return fail(error, 'Could not save.');
  return doctor ? { ok: true, data: doctor } : { ok: false, message: 'Could not save.' };
}

// ---------------------------------------------------------------------------
// Admin

export async function adminSearchDoctors(client: SupabaseClient, query: string): Promise<NobleResult<AdminDoctorRow[]>> {
  const { data, error } = await client.rpc('admin_search_doctors', { p_query: query.trim() || null });
  if (error) return fail(error, 'Could not search doctors.');
  return {
    ok: true,
    data: list(data)
      .filter((r) => typeof r.profileId === 'string')
      .map((r) => ({
        profileId: r.profileId as string,
        fullName: str(r.fullName) ?? 'Doctor',
        email: str(r.email),
        specialtyId: str(r.specialtyId),
        specialtyName: str(r.specialtyName),
        workplace: str(r.workplace),
        isNoble: r.isNoble === true,
      })),
  };
}

export async function adminSetNobleDoctor(
  client: SupabaseClient,
  input: { profileId: string; specialtyId: string; title?: string; bio?: string; active: boolean }
): Promise<NobleResult<NobleDoctor>> {
  const { data, error } = await client.rpc('admin_set_noble_doctor', {
    p_profile_id: input.profileId,
    p_specialty_id: input.specialtyId,
    p_title: input.title?.trim() || null,
    p_bio: input.bio?.trim() || null,
    p_active: input.active,
  });
  if (error) return fail(error, 'Could not save.');
  const doctor = parseNobleDoctor(data);
  return doctor ? { ok: true, data: doctor } : { ok: false, message: 'Could not save.' };
}

export async function adminHideNoblePost(
  client: SupabaseClient,
  postId: string,
  hidden: boolean
): Promise<NobleResult<void>> {
  const { error } = await client.rpc('admin_hide_noble_post', { p_post_id: postId, p_hidden: hidden });
  return error ? fail(error, 'Could not change the post.') : { ok: true, data: undefined };
}

import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Doctor profile picture and notebook storage.
 *
 * Never put pictures or notebooks in Supabase Auth user metadata: it is sent
 * inside the sign-in token with every request. Pictures go to the
 * doctor-avatars bucket (<auth uid>/...), notebooks to doctor_private_data.
 * Migration 20261114150000_doctor_avatar_and_notebook.
 */

export const DOCTOR_AVATAR_BUCKET = 'doctor-avatars';
export const DOCTOR_NOTEBOOK_MAX = 30;

export type DoctorProfileResult<T> = { ok: true; data: T } | { ok: false; message: string };

function errorText(error: { message?: string } | null | undefined, fallback: string): string {
  return error?.message?.trim() || fallback;
}

/** Turn a "data:image/jpeg;base64,..." string into a Blob, or null. */
export function dataUrlToBlob(dataUrl: string): Blob | null {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  try {
    const binary = atob(match[2]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: match[1].toLowerCase() });
  } catch {
    return null;
  }
}

/** Public URL of a stored avatar path, or null. */
export function doctorAvatarUrl(client: SupabaseClient, path: string | null | undefined): string | null {
  const clean = (path ?? '').trim();
  if (!clean) return null;
  return client.storage.from(DOCTOR_AVATAR_BUCKET).getPublicUrl(clean).data.publicUrl ?? null;
}

/** Upload the signed-in doctor's picture (a data URL or Blob) and save it; returns its public URL. */
export async function saveMyAvatar(
  client: SupabaseClient,
  image: string | Blob
): Promise<DoctorProfileResult<string>> {
  const blob = typeof image === 'string' ? dataUrlToBlob(image) : image;
  if (!blob) return { ok: false, message: 'Use a JPG, PNG or WebP picture.' };
  if (blob.size > 1024 * 1024) return { ok: false, message: 'The picture must be 1 MB or smaller.' };
  const { data: userData } = await client.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return { ok: false, message: 'Please sign in.' };
  const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${uid}/avatar-${Date.now()}.${ext}`;
  const { error: upErr } = await client.storage
    .from(DOCTOR_AVATAR_BUCKET)
    .upload(path, blob, { contentType: blob.type, upsert: false });
  if (upErr) return { ok: false, message: errorText(upErr, 'Could not upload the picture.') };
  const { error } = await client.rpc('set_my_avatar', { p_path: path });
  if (error) return { ok: false, message: errorText(error, 'Could not save the picture.') };
  return { ok: true, data: doctorAvatarUrl(client, path) ?? '' };
}

/** Remove the signed-in doctor's picture. */
export async function clearMyAvatar(client: SupabaseClient): Promise<DoctorProfileResult<void>> {
  const { error } = await client.rpc('set_my_avatar', { p_path: null });
  return error ? { ok: false, message: errorText(error, 'Could not remove the picture.') } : { ok: true, data: undefined };
}

/** Public URL of the signed-in doctor's picture, or null. */
export async function loadMyAvatarUrl(client: SupabaseClient): Promise<string | null> {
  const { data: userData } = await client.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return null;
  const { data } = await client.from('profiles').select('avatar_path').eq('auth_user_id', uid).maybeSingle();
  return doctorAvatarUrl(client, (data as { avatar_path?: string | null } | null)?.avatar_path ?? null);
}

/** The signed-in doctor's notebook (list of entries as saved by the app). */
export async function loadMyNotebook<T = unknown>(client: SupabaseClient): Promise<DoctorProfileResult<T[]>> {
  const { data, error } = await client.rpc('get_my_notebook');
  if (error) return { ok: false, message: errorText(error, 'Could not load your notebook.') };
  return { ok: true, data: Array.isArray(data) ? (data as T[]) : [] };
}

/** Save the signed-in doctor's notebook (first 30 entries are kept). */
export async function saveMyNotebook<T>(client: SupabaseClient, entries: readonly T[]): Promise<DoctorProfileResult<void>> {
  const { error } = await client.rpc('save_my_notebook', {
    p_notebook: entries.slice(0, DOCTOR_NOTEBOOK_MAX),
  });
  return error ? { ok: false, message: errorText(error, 'Could not save your notebook.') } : { ok: true, data: undefined };
}

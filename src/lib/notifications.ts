import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * In-app notifications (bell icon) and "last seen" app opens.
 * Database: public.user_notifications, admin_send_notification,
 * mark_my_notifications_read and record_app_open.
 */

export type NotificationKind = 'message' | 'alert' | 'invitation';

export interface UserNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  linkUrl: string | null;
  createdAt: string;
  readAt: string | null;
}

export type NotificationResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string };

interface NotificationRow {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link_url: string | null;
  created_at: string;
  read_at: string | null;
}

function toNotification(row: NotificationRow): UserNotification {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    body: row.body,
    linkUrl: row.link_url,
    createdAt: row.created_at,
    readAt: row.read_at,
  };
}

/** The signed-in user's own notifications, newest first. */
export async function loadMyNotifications(
  client: SupabaseClient,
  profileId: string,
  limit = 30
): Promise<NotificationResult<UserNotification[]>> {
  const { data, error } = await client
    .from('user_notifications')
    .select('id,kind,title,body,link_url,created_at,read_at')
    .eq('recipient_profile_id', profileId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: ((data ?? []) as NotificationRow[]).map(toNotification) };
}

export function countUnread(notifications: UserNotification[]): number {
  return notifications.filter((n) => !n.readAt).length;
}

/** Marks the given notifications (or all, when ids is omitted) as read. */
export async function markMyNotificationsRead(
  client: SupabaseClient,
  ids?: string[]
): Promise<NotificationResult<number>> {
  const { data, error } = await client.rpc('mark_my_notifications_read', {
    p_notification_ids: ids && ids.length > 0 ? ids : null,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: typeof data === 'number' ? data : 0 };
}

export interface SendNotificationInput {
  recipientProfileIds: string[];
  kind: NotificationKind;
  title: string;
  body: string;
  linkUrl?: string;
}

export function validateNotificationInput(input: SendNotificationInput): string[] {
  const errors: string[] = [];
  if (input.recipientProfileIds.length === 0) errors.push('Choose at least one user.');
  if (input.recipientProfileIds.length > 500) errors.push('Send to at most 500 users at a time.');
  const title = input.title.trim();
  const body = input.body.trim();
  if (!title) errors.push('Title is required.');
  else if (title.length > 120) errors.push('Title must be 120 characters or fewer.');
  if (!body) errors.push('Message is required.');
  else if (body.length > 2000) errors.push('Message must be 2000 characters or fewer.');
  const link = input.linkUrl?.trim();
  if (link && !/^https:\/\/\S+$/.test(link)) errors.push('Link must start with https://');
  return errors;
}

/** Administrator only: sends one notification to each recipient. */
export async function adminSendNotification(
  client: SupabaseClient,
  input: SendNotificationInput
): Promise<NotificationResult<number>> {
  const errors = validateNotificationInput(input);
  if (errors.length > 0) return { ok: false, message: errors.join(' ') };
  const { data, error } = await client.rpc('admin_send_notification', {
    p_recipient_profile_ids: Array.from(new Set(input.recipientProfileIds)),
    p_kind: input.kind,
    p_title: input.title.trim(),
    p_body: input.body.trim(),
    p_link_url: input.linkUrl?.trim() || null,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: typeof data === 'number' ? data : 0 };
}

/**
 * Records that the signed-in user opened the app (sets profiles.last_seen_at,
 * at most once every 5 minutes). Fire-and-forget: never blocks the page.
 */
export async function recordAppOpen(client: SupabaseClient): Promise<void> {
  try {
    await client.rpc('record_app_open');
  } catch {
    // ignore: activity tracking must never break the catalog
  }
}
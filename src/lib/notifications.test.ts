import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  adminSendNotification,
  countUnread,
  markMyNotificationsRead,
  validateNotificationInput,
  type UserNotification,
} from './notifications';

function rpcClient(calls: Array<{ fn: string; args: Record<string, unknown> }>, result: unknown) {
  return {
    rpc: async (fn: string, args: Record<string, unknown>) => {
      calls.push({ fn, args });
      return { data: result, error: null };
    },
  } as unknown as SupabaseClient;
}

describe('validateNotificationInput', () => {
  it('requires recipients, title, message and an https link', () => {
    expect(
      validateNotificationInput({
        recipientProfileIds: [],
        kind: 'message',
        title: ' ',
        body: '',
        linkUrl: 'http://example.com',
      })
    ).toEqual([
      'Choose at least one user.',
      'Title is required.',
      'Message is required.',
      'Link must start with https://',
    ]);
  });
});

describe('adminSendNotification', () => {
  it('sends unique recipients and trimmed text', async () => {
    const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const res = await adminSendNotification(rpcClient(calls, 2), {
      recipientProfileIds: ['a', 'b', 'a'],
      kind: 'invitation',
      title: ' Webinar ',
      body: ' Join us ',
    });
    expect(res).toEqual({ ok: true, data: 2 });
    expect(calls).toEqual([
      {
        fn: 'admin_send_notification',
        args: {
          p_recipient_profile_ids: ['a', 'b'],
          p_kind: 'invitation',
          p_title: 'Webinar',
          p_body: 'Join us',
          p_link_url: null,
        },
      },
    ]);
  });

  it('does not call the database when the input is invalid', async () => {
    const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    const res = await adminSendNotification(rpcClient(calls, 0), {
      recipientProfileIds: ['a'],
      kind: 'message',
      title: '',
      body: 'x',
    });
    expect(res.ok).toBe(false);
    expect(calls).toHaveLength(0);
  });
});

describe('markMyNotificationsRead and countUnread', () => {
  it('marks all as read when no ids are given', async () => {
    const calls: Array<{ fn: string; args: Record<string, unknown> }> = [];
    await markMyNotificationsRead(rpcClient(calls, 3));
    expect(calls[0]).toEqual({
      fn: 'mark_my_notifications_read',
      args: { p_notification_ids: null },
    });
  });

  it('counts unread notifications', () => {
    const base: UserNotification = {
      id: '1',
      kind: 'message',
      title: 't',
      body: 'b',
      linkUrl: null,
      createdAt: '2026-11-06T10:00:00Z',
      readAt: null,
    };
    expect(countUnread([base, { ...base, id: '2', readAt: '2026-11-06T11:00:00Z' }])).toBe(1);
  });
});
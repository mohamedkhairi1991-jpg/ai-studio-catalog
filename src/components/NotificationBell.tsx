import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, ExternalLink, X } from 'lucide-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  countUnread,
  loadMyNotifications,
  markMyNotificationsRead,
  type NotificationKind,
  type UserNotification,
} from '../lib/notifications';

const KIND_LABELS: Record<NotificationKind, string> = {
  message: 'Message',
  alert: 'Alert',
  invitation: 'Invitation',
};

const KIND_BADGE_CLASSES: Record<NotificationKind, string> = {
  message: 'bg-[#1769AA]/25 text-[#5DB4F2] border border-[#5DB4F2]/40',
  alert: 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40',
  invitation: 'bg-[#2E8B57]/20 text-[#38C976] border border-[#2E8B57]/40',
};

function formatNotificationDate(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return '—';
  return new Date(ms).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface NotificationBellProps {
  client: SupabaseClient;
  profileId?: string | null;
}

export function NotificationBell({ client, profileId }: NotificationBellProps) {
  const [resolvedProfileId, setResolvedProfileId] = useState<string | null>(
    profileId ?? null
  );
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (profileId) {
      setResolvedProfileId(profileId);
      return;
    }
    let active = true;
    void client.auth.getUser().then(async ({ data }) => {
      if (!active) return;
      const authUserId = data.user?.id;
      if (!authUserId) return;
      const { data: profile } = await client
        .from('profiles')
        .select('id')
        .eq('auth_user_id', authUserId)
        .maybeSingle<{ id: string }>();
      if (!active || !profile?.id) return;
      setResolvedProfileId(profile.id);
    });
    return () => {
      active = false;
    };
  }, [client, profileId]);

  const fetchNotifications = useCallback(
    async (markReadAfterLoad = false) => {
      if (!resolvedProfileId) return;
      setLoading(true);
      setError(null);
      const res = await loadMyNotifications(client, resolvedProfileId);
      setLoading(false);
      if (!res.ok) {
        setError(res.message);
        return;
      }
      const list = res.data;
      if (markReadAfterLoad) {
        const nowIso = new Date().toISOString();
        setNotifications(
          list.map((n) => (n.readAt ? n : { ...n, readAt: nowIso }))
        );
        if (countUnread(list) > 0) {
          void markMyNotificationsRead(client);
        }
      } else {
        setNotifications(list);
      }
    },
    [client, resolvedProfileId]
  );

  useEffect(() => {
    void fetchNotifications(false);
  }, [fetchNotifications]);

  // Close popover on click outside or Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const unreadCount = countUnread(notifications);

  const handleToggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      const nowIso = new Date().toISOString();
      setNotifications((prev) =>
        prev.map((n) => (n.readAt ? n : { ...n, readAt: nowIso }))
      );
      void markMyNotificationsRead(client);
      void fetchNotifications(true);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={
          unreadCount > 0
            ? `Notifications (${unreadCount} unread)`
            : 'Notifications'
        }
        aria-expanded={open}
        title="Notifications"
        className={`relative h-8 min-w-[32px] inline-flex items-center justify-center rounded-lg border px-2 py-1.5 transition-colors duration-150 ${
          open
            ? 'border-[#5DB4F2] bg-[#1F2D38] text-[#5DB4F2]'
            : 'border-[#304451] bg-[#263744]/80 text-[#F2F5F8] hover:bg-[#304451]'
        }`}
      >
        <Bell className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {unreadCount > 0 && (
          <span
            data-testid="notification-unread-badge"
            className="ml-1.5 inline-flex items-center justify-center rounded-full bg-[#B42318] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white tabular-nums"
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96 z-50 rounded-xl bg-[#263744] border border-[#304451] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#304451] bg-[#1F2D38]/70">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F2F5F8]">
              Notifications ({notifications.length})
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close notifications"
              className="rounded-md p-1 text-[#B8C3CC] hover:text-white hover:bg-[#304451] transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-[#304451]">
            {loading && notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#B8C3CC]">
                Loading notifications…
              </div>
            ) : error ? (
              <div className="p-4 text-xs text-[#FF7272]">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#B8C3CC]">
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => {
                const kindLabel = KIND_LABELS[n.kind] ?? 'Message';
                const badgeClass =
                  KIND_BADGE_CLASSES[n.kind] ?? KIND_BADGE_CLASSES.message;
                return (
                  <div
                    key={n.id}
                    className="p-4 space-y-2 hover:bg-[#1F2D38]/40 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold ${badgeClass}`}
                      >
                        {kindLabel}
                      </span>
                      <span className="text-[11px] text-[#B8C3CC] tabular-nums">
                        {formatNotificationDate(n.createdAt)}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-[#F2F5F8] break-words">
                      {n.title}
                    </div>

                    <p className="text-xs text-[#B8C3CC] whitespace-pre-line break-words leading-relaxed">
                      {n.body}
                    </p>

                    {n.linkUrl && (
                      <div className="pt-1">
                        <a
                          href={n.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md bg-[#1769AA] hover:bg-[#1E78BA] px-3 py-1.5 text-xs font-medium text-white transition-colors"
                        >
                          <span>Open link</span>
                          <ExternalLink
                            className="w-3.5 h-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

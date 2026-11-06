import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  computeUserRegistrationStats,
  listPendingCompanies,
  listPendingProfessionals,
  listRegisteredUsers,
  reviewProfessional,
  setUserProfileStatus,
  verifyCompany,
  type PendingCompany,
  type PendingProfessional,
  type RegisteredUserRecord,
} from '../lib/onboarding';
import {
  adminSendNotification,
  recordAppOpen,
  type NotificationKind,
} from '../lib/notifications';
import { NotificationBell } from './NotificationBell';
import { buttonClass, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  email: string;
  onSignOut: () => void;
  embedded?: boolean;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
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

function formatRelativeTime(iso: string | null, nowMs: number = Date.now()): string {
  if (!iso) return 'Never opened';
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return 'Never opened';
  const diffSec = Math.max(0, Math.floor((nowMs - ms) / 1000));
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMo = Math.floor(diffDay / 30);
  return `${diffMo}mo ago`;
}

export default function AdminApprovals({
  client,
  email,
  onSignOut,
  embedded = false,
}: Props) {
  const [subTab, setSubTab] = useState<'registrations' | 'monitor' | 'approvals'>(
    'registrations'
  );
  const [users, setUsers] = useState<RegisteredUserRecord[]>([]);
  const [doctors, setDoctors] = useState<PendingProfessional[]>([]);
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{
    text: string;
    tone: 'ok' | 'err';
  } | null>(null);
  const [busy, setBusy] = useState(false);

  // Filters for User Registrations
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'archived'>('all');

  // Time window for App Open Monitor
  const [monitorWindow, setMonitorWindow] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  // Inline status action state for a user row
  const [editingStatusProfileId, setEditingStatusProfileId] = useState<string | null>(null);
  const [statusActionReason, setStatusActionReason] = useState('');

  // Selection & Send notification form state
  const [selectedProfileIds, setSelectedProfileIds] = useState<string[]>([]);
  const [recipientIds, setRecipientIds] = useState<string[] | null>(null);
  const [notifKind, setNotifKind] = useState<NotificationKind>('message');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifLink, setNotifLink] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const [regUsers, pendingDocs, pendingComps] = await Promise.all([
      listRegisteredUsers(client),
      listPendingProfessionals(client),
      listPendingCompanies(client),
    ]);
    setUsers(regUsers);
    setDoctors(pendingDocs);
    setCompanies(pendingComps);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!embedded) {
      void recordAppOpen(client);
    }
  }, [client, embedded]);

  const stats = useMemo(() => computeUserRegistrationStats(users), [users]);

  const availableSpecialties = useMemo(() => {
    const set = new Set<string>();
    for (const u of users) {
      if (u.specialtyName) set.add(u.specialtyName);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [users]);

  const filteredRegistrations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      if (specialtyFilter && u.specialtyName !== specialtyFilter) return false;
      if (statusFilter === 'archived') {
        if (u.profileStatus !== 'archived') return false;
      } else if (u.profileStatus === 'archived') {
        return false;
      }
      if (statusFilter === 'active' && u.profileStatus !== 'active') return false;
      if (statusFilter === 'suspended' && u.profileStatus !== 'suspended') return false;
      if (!q) return true;
      const haystack = [
        u.fullName ?? '',
        u.email,
        u.phone ?? '',
        u.specialtyName ?? '',
        u.role ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [users, searchQuery, specialtyFilter, statusFilter]);

  const selectableFilteredIds = useMemo(
    () =>
      filteredRegistrations
        .filter((u) => u.profileStatus === 'active')
        .map((u) => u.profileId),
    [filteredRegistrations]
  );

  const allFilteredSelected =
    selectableFilteredIds.length > 0 &&
    selectableFilteredIds.every((id) => selectedProfileIds.includes(id));

  const toggleSelectAllFiltered = () => {
    if (allFilteredSelected) {
      setSelectedProfileIds((prev) =>
        prev.filter((id) => !selectableFilteredIds.includes(id))
      );
    } else {
      setSelectedProfileIds((prev) =>
        Array.from(new Set([...prev, ...selectableFilteredIds]))
      );
    }
  };

  const toggleSelectOne = (profileId: string) => {
    setSelectedProfileIds((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const openSendForm = (ids: string[]) => {
    setRecipientIds(ids);
    setNotifKind('message');
    setNotifTitle('');
    setNotifBody('');
    setNotifLink('');
    setNotifError(null);
  };

  const closeSendForm = () => {
    setRecipientIds(null);
    setNotifError(null);
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientIds || recipientIds.length === 0) return;
    setSendingNotif(true);
    setNotifError(null);
    setMessage(null);
    const res = await adminSendNotification(client, {
      recipientProfileIds: recipientIds,
      kind: notifKind,
      title: notifTitle,
      body: notifBody,
      linkUrl: notifLink.trim() ? notifLink.trim() : undefined,
    });
    setSendingNotif(false);
    if (!res.ok) {
      setNotifError(res.message);
      return;
    }
    setMessage({
      text: `Sent to ${res.data} users`,
      tone: 'ok',
    });
    setSelectedProfileIds((prev) =>
      prev.filter((id) => !recipientIds.includes(id))
    );
    closeSendForm();
  };

  const monitoredUsers = useMemo(() => {
    const nowMs = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const cutoff =
      monitorWindow === '24h'
        ? nowMs - dayMs
        : monitorWindow === '7d'
        ? nowMs - 7 * dayMs
        : monitorWindow === '30d'
        ? nowMs - 30 * dayMs
        : 0;

    return [...users]
      .filter((u) => {
        if (!u.lastActiveAt) return cutoff === 0;
        const ms = Date.parse(u.lastActiveAt);
        if (Number.isNaN(ms)) return cutoff === 0;
        return cutoff === 0 || ms >= cutoff;
      })
      .sort((a, b) => {
        const aMs = a.lastActiveAt ? Date.parse(a.lastActiveAt) : 0;
        const bMs = b.lastActiveAt ? Date.parse(b.lastActiveAt) : 0;
        return (Number.isNaN(bMs) ? 0 : bMs) - (Number.isNaN(aMs) ? 0 : aMs);
      });
  }, [users, monitorWindow]);

  const reasonFor = (id: string) => reasons[id] ?? '';

  const run = async (
    action: () => Promise<{ ok: true } | { ok: false; message: string }>
  ) => {
    setBusy(true);
    setMessage(null);
    const result = await action();
    setBusy(false);
    setMessage(
      result.ok
        ? { text: 'Updated successfully.', tone: 'ok' }
        : { text: result.message, tone: 'err' }
    );
    if (result.ok) {
      setEditingStatusProfileId(null);
      setStatusActionReason('');
      await reload();
    }
  };

  const pendingTotal = doctors.length + companies.length;

  const recipientSummary = useMemo(() => {
    if (!recipientIds || recipientIds.length === 0) return '';
    if (recipientIds.length === 1) {
      const target = users.find((u) => u.profileId === recipientIds[0]);
      if (target) {
        return target.fullName ? `${target.fullName} (${target.email})` : target.email;
      }
      return '1 user';
    }
    return `${recipientIds.length} selected users`;
  }, [recipientIds, users]);

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#263744] border border-[#304451] p-5">
        <div>
          <h1 className="text-base font-semibold text-[#F2F5F8]">
            User Registrations & App Activity Monitor
          </h1>
          <p className="text-xs text-[#B8C3CC] mt-0.5">
            View all registered doctor and administrator accounts, monitor users opening the app, send notifications, and review pending applications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={secondaryButtonClass}
            disabled={loading}
            onClick={() => void reload()}
          >
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          {!embedded && (
            <>
              <NotificationBell client={client} />
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={onSignOut}
              >
                Sign out ({email})
              </button>
            </>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs font-medium ${
            message.tone === 'ok'
              ? 'bg-[#2E8B57]/15 border-[#38C976]/40 text-[#38C976]'
              : 'bg-[#B42318]/15 border-[#FF7272]/40 text-[#FF7272]'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Send Message Modal / Card */}
      {recipientIds && recipientIds.length > 0 && (
        <form
          onSubmit={(e) => void handleSendNotification(e)}
          aria-label="Send notification form"
          className="rounded-xl bg-[#263744] border border-[#5DB4F2]/60 p-5 space-y-4 shadow-lg"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#304451] pb-3">
            <div>
              <h2 className="text-sm font-semibold text-[#F2F5F8]">
                Send Message / Notification
              </h2>
              <p className="text-xs text-[#B8C3CC] mt-0.5">
                To: <span className="text-[#5DB4F2] font-medium">{recipientSummary}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={closeSendForm}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
          </div>

          {notifError && (
            <div className="rounded-lg bg-[#B42318]/15 border border-[#FF7272]/40 px-3.5 py-2.5 text-xs text-[#FF7272]">
              {notifError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="notif-kind"
                className="block text-xs font-medium text-[#B8C3CC] mb-1"
              >
                Kind
              </label>
              <select
                id="notif-kind"
                aria-label="Notification kind"
                value={notifKind}
                onChange={(e) => setNotifKind(e.target.value as NotificationKind)}
                className={inputClass}
              >
                <option value="message">Message</option>
                <option value="alert">Alert</option>
                <option value="invitation">Invitation</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="notif-title"
                  className="block text-xs font-medium text-[#B8C3CC]"
                >
                  Title
                </label>
                <span className="text-[11px] text-[#B8C3CC] tabular-nums">
                  {notifTitle.length}/120
                </span>
              </div>
              <input
                id="notif-title"
                type="text"
                maxLength={120}
                required
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="Subject or headline (max 120 characters)"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="notif-body"
                className="block text-xs font-medium text-[#B8C3CC]"
              >
                Message
              </label>
              <span className="text-[11px] text-[#B8C3CC] tabular-nums">
                {notifBody.length}/2000
              </span>
            </div>
            <textarea
              id="notif-body"
              rows={4}
              maxLength={2000}
              required
              value={notifBody}
              onChange={(e) => setNotifBody(e.target.value)}
              placeholder="Write your message, alert, or conference invitation (max 2000 characters)…"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="notif-link"
              className="block text-xs font-medium text-[#B8C3CC] mb-1"
            >
              Optional HTTPS link
            </label>
            <input
              id="notif-link"
              type="url"
              value={notifLink}
              onChange={(e) => setNotifLink(e.target.value)}
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={closeSendForm}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sendingNotif}
              className={buttonClass}
            >
              {sendingNotif ? 'Sending…' : 'Send notification'}
            </button>
          </div>
        </form>
      )}

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
            Registered Users
          </div>
          <div className="mt-1 text-2xl font-semibold tabular-nums text-[#F2F5F8]">
            {stats.totalUsers}
          </div>
          <div className="mt-0.5 text-xs text-[#5DB4F2] tabular-nums">
            {stats.totalDoctors} doctors
          </div>
        </div>

        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
            Opened App (24h)
          </div>
          <div className="mt-1 text-2xl font-semibold tabular-nums text-[#38C976]">
            {stats.openedLast24h}
          </div>
          <div className="mt-0.5 text-xs text-[#B8C3CC]">
            Active in last 24 hours
          </div>
        </div>

        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
            Opened App (7d)
          </div>
          <div className="mt-1 text-2xl font-semibold tabular-nums text-[#5DB4F2]">
            {stats.openedLast7d}
          </div>
          <div className="mt-0.5 text-xs text-[#B8C3CC]">
            Active in last 7 days
          </div>
        </div>

        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
            New Sign-ups (7d)
          </div>
          <div className="mt-1 text-2xl font-semibold tabular-nums text-[#F2F5F8]">
            {stats.newLast7d}
          </div>
          <div className="mt-0.5 text-xs text-[#B8C3CC] tabular-nums">
            {stats.newLast30d} in last 30 days
          </div>
        </div>

        <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
            Pending Approvals
          </div>
          <div
            className={`mt-1 text-2xl font-semibold tabular-nums ${
              pendingTotal > 0 ? 'text-[#F59E0B]' : 'text-[#F2F5F8]'
            }`}
          >
            {pendingTotal}
          </div>
          <div className="mt-0.5 text-xs text-[#B8C3CC] tabular-nums">
            {doctors.length} doctors · {companies.length} companies
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#304451] pb-3">
        <button
          type="button"
          onClick={() => setSubTab('registrations')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
            subTab === 'registrations'
              ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
              : 'bg-[#263744] border-[#304451] text-[#B8C3CC] hover:text-white'
          }`}
        >
          User Registrations ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setSubTab('monitor')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
            subTab === 'monitor'
              ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
              : 'bg-[#263744] border-[#304451] text-[#B8C3CC] hover:text-white'
          }`}
        >
          Users Opening App Monitor ({stats.openedLast7d} active / 7d)
        </button>
        <button
          type="button"
          onClick={() => setSubTab('approvals')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
            subTab === 'approvals'
              ? 'bg-[#1769AA] border-[#5DB4F2] text-white'
              : 'bg-[#263744] border-[#304451] text-[#B8C3CC] hover:text-white'
          }`}
        >
          Pending Approvals ({pendingTotal})
        </button>
      </div>

      {/* Tab 1: All User Registrations */}
      {subTab === 'registrations' && (
        <section className="space-y-4">
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <input
              type="search"
              aria-label="Search registered users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, email, phone, or specialty…"
              className={`${inputClass} sm:max-w-sm`}
            />
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                aria-label="Filter registrations by specialty"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className={`${inputClass} sm:w-52`}
              >
                <option value="">All specialties</option>
                {availableSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter registrations by status"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as 'all' | 'active' | 'suspended' | 'archived')
                }
                className={`${inputClass} sm:w-40`}
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="archived">Archived (old accounts)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
              Loading registered users…
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
              No registered users match the current filters.
            </div>
          ) : (
            <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#304451] flex flex-wrap items-center justify-between gap-2 text-xs text-[#B8C3CC]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold uppercase tracking-wider">
                    Registered Accounts
                  </span>
                  <span className="tabular-nums">
                    Showing {filteredRegistrations.length} of {users.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={selectedProfileIds.length === 0}
                    onClick={() => openSendForm(selectedProfileIds)}
                    className="rounded-lg bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-40 disabled:pointer-events-none px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                  >
                    Send to selected
                    {selectedProfileIds.length > 0
                      ? ` (${selectedProfileIds.length})`
                      : ''}
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                      <th className="py-3 px-4 w-10">
                        <input
                          type="checkbox"
                          aria-label="Select all active users"
                          checked={allFilteredSelected}
                          onChange={toggleSelectAllFiltered}
                          className="h-4 w-4 rounded border-[#304451] bg-[#1F2D38] text-[#1769AA]"
                        />
                      </th>
                      <th className="py-3 px-4">User / Doctor</th>
                      <th className="py-3 px-4">Specialty</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Registered</th>
                      <th className="py-3 px-4">Last Opened App</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#304451] text-xs">
                    {filteredRegistrations.map((u) => {
                      const activeMs = u.lastActiveAt ? Date.parse(u.lastActiveAt) : NaN;
                      const isActive24h =
                        !Number.isNaN(activeMs) &&
                        Date.now() - activeMs <= 24 * 60 * 60 * 1000;
                      const isEditingRow = editingStatusProfileId === u.profileId;
                      const isSelected = selectedProfileIds.includes(u.profileId);
                      const isActiveProfile = u.profileStatus === 'active';
                      return (
                        <tr key={u.profileId} className="hover:bg-[#1F2D38]/40">
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              aria-label={`Select ${u.fullName || u.email}`}
                              disabled={!isActiveProfile}
                              checked={isSelected}
                              onChange={() => toggleSelectOne(u.profileId)}
                              className="h-4 w-4 rounded border-[#304451] bg-[#1F2D38] text-[#1769AA] disabled:opacity-40"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-[#F2F5F8]">
                              {u.fullName || '—'}
                            </div>
                            <div className="text-[#5DB4F2] break-all mt-0.5">
                              {u.email}
                            </div>
                            {u.role && u.role !== 'healthcare_professional' && (
                              <span className="inline-block mt-1 rounded bg-[#1F2D38] border border-[#304451] px-1.5 py-0.5 text-[11px] text-[#B8C3CC]">
                                {u.role}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[#F2F5F8]">
                            {u.specialtyName ?? (
                              <span className="text-[#B8C3CC]">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 tabular-nums text-[#F2F5F8]">
                            {u.phone ?? <span className="text-[#B8C3CC]">—</span>}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                                u.profileStatus === 'active'
                                  ? 'bg-[#2E8B57]/20 text-[#38C976] border border-[#2E8B57]/40'
                                  : u.profileStatus === 'suspended'
                                  ? 'bg-[#B42318]/20 text-[#FF7272] border border-[#B42318]/40'
                                  : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                              }`}
                            >
                              {u.profileStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 tabular-nums text-[#B8C3CC]">
                            <div>{formatDateTime(u.registeredAt)}</div>
                            <div className="text-[11px] text-[#B8C3CC]/80">
                              {formatRelativeTime(u.registeredAt)}
                            </div>
                          </td>
                          <td className="py-3 px-4 tabular-nums">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`h-2 w-2 rounded-full shrink-0 ${
                                  isActive24h
                                    ? 'bg-[#38C976]'
                                    : u.lastActiveAt
                                    ? 'bg-[#5DB4F2]/60'
                                    : 'bg-[#304451]'
                                }`}
                              />
                              <span className="text-[#F2F5F8] font-medium">
                                {formatRelativeTime(u.lastActiveAt)}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#B8C3CC] mt-0.5">
                              {formatDateTime(u.lastActiveAt)}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {isEditingRow ? (
                              <div className="inline-flex flex-col items-end gap-1.5">
                                <input
                                  type="text"
                                  value={statusActionReason}
                                  onChange={(e) =>
                                    setStatusActionReason(e.target.value)
                                  }
                                  placeholder="Reason (required)"
                                  className="rounded border border-[#304451] bg-[#1F2D38] px-2.5 py-1 text-xs text-[#F2F5F8] w-44"
                                />
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    disabled={busy || !statusActionReason.trim()}
                                    onClick={() =>
                                      void run(() =>
                                        setUserProfileStatus(
                                          client,
                                          u.profileId,
                                          u.profileStatus === 'active'
                                            ? 'suspended'
                                            : 'active',
                                          statusActionReason
                                        )
                                      )
                                    }
                                    className="rounded bg-[#1769AA] hover:bg-[#1E78BA] disabled:opacity-50 px-2.5 py-1 text-[11px] font-semibold text-white"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingStatusProfileId(null);
                                      setStatusActionReason('');
                                    }}
                                    className="rounded border border-[#304451] bg-[#1F2D38] px-2.5 py-1 text-[11px] text-[#B8C3CC]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="inline-flex flex-wrap items-center justify-end gap-1.5">
                                {isActiveProfile && (
                                  <button
                                    type="button"
                                    onClick={() => openSendForm([u.profileId])}
                                    className={secondaryButtonClass}
                                  >
                                    Send message
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingStatusProfileId(u.profileId);
                                    setStatusActionReason('');
                                  }}
                                  className={secondaryButtonClass}
                                >
                                  {u.profileStatus === 'active'
                                    ? 'Suspend'
                                    : 'Activate'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Users Opening App Monitor */}
      {subTab === 'monitor' && (
        <section className="space-y-4">
          <div className="rounded-xl bg-[#263744] border border-[#304451] p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-[#F2F5F8]">
                Users Opening App Monitor
              </h2>
              <p className="text-xs text-[#B8C3CC] mt-0.5">
                Ordered by most recent app open (`last_seen_at`). Signed-in users automatically update their last-opened timestamp when opening the app.
              </p>
            </div>
            <div className="flex items-center rounded-lg bg-[#1F2D38] border border-[#304451] p-0.5">
              {(
                [
                  { id: '24h', label: 'Last 24h' },
                  { id: '7d', label: 'Last 7 days' },
                  { id: '30d', label: 'Last 30 days' },
                  { id: 'all', label: 'All users' },
                ] as const
              ).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setMonitorWindow(w.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    monitorWindow === w.id
                      ? 'bg-[#1769AA] text-white'
                      : 'text-[#B8C3CC] hover:text-white'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
              Loading user activity monitor…
            </div>
          ) : monitoredUsers.length === 0 ? (
            <div className="rounded-xl bg-[#263744] border border-[#304451] p-12 text-center text-sm text-[#B8C3CC]">
              No users opened the app in this time window.
            </div>
          ) : (
            <div className="rounded-xl bg-[#263744] border border-[#304451] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#304451] bg-[#1F2D38]/60 text-[11px] font-semibold uppercase tracking-wider text-[#B8C3CC]">
                      <th className="py-3 px-4">Last Opened</th>
                      <th className="py-3 px-4">Doctor / User</th>
                      <th className="py-3 px-4">Specialty</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Registered On</th>
                      <th className="py-3 px-4">Activity Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#304451] text-xs">
                    {monitoredUsers.map((u) => {
                      const activeMs = u.lastActiveAt ? Date.parse(u.lastActiveAt) : NaN;
                      const ageMs = Number.isNaN(activeMs) ? Infinity : Date.now() - activeMs;
                      const is24h = ageMs <= 24 * 60 * 60 * 1000;
                      const is7d = ageMs <= 7 * 24 * 60 * 60 * 1000;
                      return (
                        <tr key={u.profileId} className="hover:bg-[#1F2D38]/40">
                          <td className="py-3 px-4 tabular-nums">
                            <div className="font-semibold text-[#F2F5F8]">
                              {formatRelativeTime(u.lastActiveAt)}
                            </div>
                            <div className="text-[11px] text-[#B8C3CC]">
                              {formatDateTime(u.lastActiveAt)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-[#F2F5F8]">
                              {u.fullName || '—'}
                            </div>
                            <div className="text-[#5DB4F2] break-all">
                              {u.email}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#F2F5F8]">
                            {u.specialtyName ?? '—'}
                          </td>
                          <td className="py-3 px-4 tabular-nums text-[#F2F5F8]">
                            {u.phone ?? '—'}
                          </td>
                          <td className="py-3 px-4 tabular-nums text-[#B8C3CC]">
                            {formatDateTime(u.registeredAt)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                                is24h
                                  ? 'bg-[#2E8B57]/20 text-[#38C976] border border-[#2E8B57]/40'
                                  : is7d
                                  ? 'bg-[#1769AA]/25 text-[#5DB4F2] border border-[#5DB4F2]/40'
                                  : 'bg-[#1F2D38] text-[#B8C3CC] border border-[#304451]'
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  is24h
                                    ? 'bg-[#38C976]'
                                    : is7d
                                    ? 'bg-[#5DB4F2]'
                                    : 'bg-[#B8C3CC]'
                                }`}
                              />
                              {is24h
                                ? 'Opened in last 24h'
                                : is7d
                                ? 'Opened this week'
                                : u.lastActiveAt
                                ? 'Opened earlier'
                                : 'Never opened'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {u.profileStatus === 'active' && (
                              <button
                                type="button"
                                onClick={() => openSendForm([u.profileId])}
                                className={secondaryButtonClass}
                              >
                                Send message
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Pending Approvals */}
      {subTab === 'approvals' && (
        <div className="space-y-6">
          <section className="rounded-xl bg-[#263744] border border-[#304451] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#F2F5F8]">
              Pending Physicians ({doctors.length})
            </h3>
            {doctors.length === 0 && (
              <p className="text-xs text-[#B8C3CC]">
                No pending physician registrations. Doctors who sign up with their specialty and phone number are approved automatically and listed under User Registrations.
              </p>
            )}
            {doctors.map((d) => (
              <div
                key={d.id}
                className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3.5 space-y-2 text-sm"
              >
                <p className="font-medium text-[#F2F5F8]">
                  {d.fullName ?? d.email} —{' '}
                  <span className="text-[#5DB4F2]">{d.email}</span>
                </p>
                <p className="text-xs text-[#B8C3CC]">
                  Workplace: {d.workplace ?? '—'} · License:{' '}
                  {d.licenseNumber ?? '—'}
                </p>
                <input
                  className={inputClass}
                  placeholder="Reason (required to reject or request documents)"
                  value={reasonFor(d.id)}
                  onChange={(e) =>
                    setReasons({ ...reasons, [d.id]: e.target.value })
                  }
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    className={secondaryButtonClass}
                    disabled={busy}
                    onClick={() =>
                      void run(() =>
                        reviewProfessional(
                          client,
                          d.id,
                          'approved',
                          reasonFor(d.id)
                        )
                      )
                    }
                  >
                    Approve
                  </button>
                  <button
                    className={secondaryButtonClass}
                    disabled={busy}
                    onClick={() =>
                      void run(() =>
                        reviewProfessional(
                          client,
                          d.id,
                          'documents_requested',
                          reasonFor(d.id)
                        )
                      )
                    }
                  >
                    Request documents
                  </button>
                  <button
                    className={secondaryButtonClass}
                    disabled={busy}
                    onClick={() =>
                      void run(() =>
                        reviewProfessional(
                          client,
                          d.id,
                          'rejected',
                          reasonFor(d.id)
                        )
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-xl bg-[#263744] border border-[#304451] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#F2F5F8]">
              Pending Companies ({companies.length})
            </h3>
            {companies.length === 0 && (
              <p className="text-xs text-[#B8C3CC]">
                No pending company applications.
              </p>
            )}
            {companies.map((c) => (
              <div
                key={c.id}
                className="rounded-lg bg-[#1F2D38] border border-[#304451] p-3.5 space-y-2 text-sm"
              >
                <p className="font-medium text-[#F2F5F8]">
                  {c.companyName} ({c.legalName}) — applicant{' '}
                  <span className="text-[#5DB4F2]">{c.applicantEmail}</span>
                </p>
                <p className="text-xs text-[#B8C3CC]">
                  {c.contactEmail ?? '—'} · {c.contactPhone ?? '—'} ·{' '}
                  {c.websiteUrl ?? '—'}
                </p>
                {c.description && (
                  <p className="text-xs text-[#B8C3CC]">{c.description}</p>
                )}
                <input
                  className={inputClass}
                  placeholder="Verification reason (required)"
                  value={reasonFor(c.id)}
                  onChange={(e) =>
                    setReasons({ ...reasons, [c.id]: e.target.value })
                  }
                />
                <button
                  className={secondaryButtonClass}
                  disabled={busy}
                  onClick={() =>
                    void run(() => verifyCompany(client, c.id, reasonFor(c.id)))
                  }
                >
                  Verify company
                </button>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

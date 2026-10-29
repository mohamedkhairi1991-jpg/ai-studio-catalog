import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  listPendingCompanies,
  listPendingProfessionals,
  reviewProfessional,
  verifyCompany,
  type PendingCompany,
  type PendingProfessional,
} from '../lib/onboarding';
import { Screen, inputClass, secondaryButtonClass } from './ui';

interface Props {
  client: SupabaseClient;
  email: string;
  onSignOut: () => void;
}

export default function AdminApprovals({ client, email, onSignOut }: Props) {
  const [doctors, setDoctors] = useState<PendingProfessional[]>([]);
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    setDoctors(await listPendingProfessionals(client));
    setCompanies(await listPendingCompanies(client));
  }, [client]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const reasonFor = (id: string) => reasons[id] ?? '';

  const run = async (action: () => Promise<{ ok: true } | { ok: false; message: string }>) => {
    setBusy(true);
    setMessage(null);
    const result = await action();
    setBusy(false);
    setMessage(result.ok ? 'Done.' : result.message);
    if (result.ok) await reload();
  };

  return (
    <Screen wide>
      <p className="text-sm text-[#B8C3CC]">Administrator: {email}</p>
      <h2 className="text-lg font-medium">Pending approvals</h2>
      {message && <p className="text-sm text-[#F59E0B]">{message}</p>}

      <section className="space-y-3">
        <h3 className="text-sm font-medium">Physicians ({doctors.length})</h3>
        {doctors.length === 0 && <p className="text-sm text-[#B8C3CC]">No pending physician registrations.</p>}
        {doctors.map((d) => (
          <div key={d.id} className="rounded-md border border-[#304451] p-3 space-y-2 text-sm">
            <p>
              {d.fullName ?? d.email} — {d.email}
            </p>
            <p className="text-[#B8C3CC]">
              Workplace: {d.workplace ?? '—'} · License: {d.licenseNumber ?? '—'}
            </p>
            <input
              className={inputClass}
              placeholder="Reason (required to reject or request documents)"
              value={reasonFor(d.id)}
              onChange={(e) => setReasons({ ...reasons, [d.id]: e.target.value })}
            />
            <div className="flex flex-wrap gap-2">
              <button className={secondaryButtonClass} disabled={busy} onClick={() => void run(() => reviewProfessional(client, d.id, 'approved', reasonFor(d.id)))}>
                Approve
              </button>
              <button className={secondaryButtonClass} disabled={busy} onClick={() => void run(() => reviewProfessional(client, d.id, 'documents_requested', reasonFor(d.id)))}>
                Request documents
              </button>
              <button className={secondaryButtonClass} disabled={busy} onClick={() => void run(() => reviewProfessional(client, d.id, 'rejected', reasonFor(d.id)))}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-medium">Companies ({companies.length})</h3>
        {companies.length === 0 && <p className="text-sm text-[#B8C3CC]">No pending company applications.</p>}
        {companies.map((c) => (
          <div key={c.id} className="rounded-md border border-[#304451] p-3 space-y-2 text-sm">
            <p>
              {c.companyName} ({c.legalName}) — applicant {c.applicantEmail}
            </p>
            <p className="text-[#B8C3CC]">
              {c.contactEmail ?? '—'} · {c.contactPhone ?? '—'} · {c.websiteUrl ?? '—'}
            </p>
            {c.description && <p className="text-[#B8C3CC]">{c.description}</p>}
            <input
              className={inputClass}
              placeholder="Verification reason (required)"
              value={reasonFor(c.id)}
              onChange={(e) => setReasons({ ...reasons, [c.id]: e.target.value })}
            />
            <button className={secondaryButtonClass} disabled={busy} onClick={() => void run(() => verifyCompany(client, c.id, reasonFor(c.id)))}>
              Verify company
            </button>
          </div>
        ))}
      </section>

      <div className="flex gap-2">
        <button className={secondaryButtonClass} onClick={() => void reload()}>
          Refresh
        </button>
        <button className={secondaryButtonClass} onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </Screen>
  );
}

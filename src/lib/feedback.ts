import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Doctor feedback ("Report an error", "Can't find this drug?") and drug
 * sources ("Sources" + "Checked by Pharmaty on <date>").
 * Database: public.drug_feedback, report_drug_error, request_missing_drug,
 * admin_update_drug_feedback and get_product_sources.
 */

export type FeedbackKind = 'error_report' | 'missing_drug';
export type FeedbackStatus = 'open' | 'reviewing' | 'fixed' | 'dismissed';
export type ErrorTopic =
  | 'name_or_strength'
  | 'dose'
  | 'indication'
  | 'contraindication'
  | 'side_effects'
  | 'interaction'
  | 'company'
  | 'not_sold_in_iraq'
  | 'other';

/** Choices for the "What is wrong?" picker, in display order. */
export const ERROR_TOPICS: ReadonlyArray<{ value: ErrorTopic; label: string }> = [
  { value: 'dose', label: 'Dose' },
  { value: 'indication', label: 'Indication' },
  { value: 'contraindication', label: 'Contraindication' },
  { value: 'side_effects', label: 'Side effects' },
  { value: 'interaction', label: 'Interaction' },
  { value: 'name_or_strength', label: 'Name or strength' },
  { value: 'company', label: 'Company' },
  { value: 'not_sold_in_iraq', label: 'Not sold in Iraq' },
  { value: 'other', label: 'Other' },
];

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  open: 'New',
  reviewing: 'Reviewing',
  fixed: 'Fixed',
  dismissed: 'No change needed',
};

export type FeedbackResult<T = void> = { ok: true; data: T } | { ok: false; message: string };

export interface DrugFeedback {
  id: string;
  kind: FeedbackKind;
  productId: string | null;
  topic: ErrorTopic | null;
  requestedDrugName: string | null;
  requestedCompanyName: string | null;
  message: string | null;
  reporterProfileId: string;
  status: FeedbackStatus;
  adminNote: string | null;
  handledAt: string | null;
  createdAt: string;
}

interface FeedbackRow {
  id: string;
  kind: FeedbackKind;
  product_id: string | null;
  topic: ErrorTopic | null;
  requested_drug_name: string | null;
  requested_company_name: string | null;
  message: string | null;
  reporter_profile_id: string;
  status: FeedbackStatus;
  admin_note: string | null;
  handled_at: string | null;
  created_at: string;
}

const FEEDBACK_COLUMNS =
  'id,kind,product_id,topic,requested_drug_name,requested_company_name,message,reporter_profile_id,status,admin_note,handled_at,created_at';

function toFeedback(row: FeedbackRow): DrugFeedback {
  return {
    id: row.id,
    kind: row.kind,
    productId: row.product_id,
    topic: row.topic,
    requestedDrugName: row.requested_drug_name,
    requestedCompanyName: row.requested_company_name,
    message: row.message,
    reporterProfileId: row.reporter_profile_id,
    status: row.status,
    adminNote: row.admin_note,
    handledAt: row.handled_at,
    createdAt: row.created_at,
  };
}

const clean = (value: string | null | undefined): string => (value ?? '').trim();

/** Doctor: "Report an error" on a published drug. */
export async function reportDrugError(
  client: SupabaseClient,
  input: { productId: string; topic: ErrorTopic; message: string }
): Promise<FeedbackResult<string>> {
  const message = clean(input.message);
  if (!message) return { ok: false, message: 'Please describe the error.' };
  if (message.length > 1000) return { ok: false, message: 'Please keep it under 1000 characters.' };
  const { data, error } = await client.rpc('report_drug_error', {
    p_product_id: input.productId,
    p_topic: input.topic,
    p_message: message,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: String(data) };
}

/** Doctor: "Can't find this drug? Tell us". */
export async function requestMissingDrug(
  client: SupabaseClient,
  input: { drugName: string; companyName?: string; message?: string }
): Promise<FeedbackResult<string>> {
  const drugName = clean(input.drugName);
  if (drugName.length < 2) return { ok: false, message: 'Please write the drug name.' };
  if (drugName.length > 120) return { ok: false, message: 'The drug name is too long.' };
  const companyName = clean(input.companyName);
  const message = clean(input.message);
  if (companyName.length > 120) return { ok: false, message: 'The company name is too long.' };
  if (message.length > 1000) return { ok: false, message: 'Please keep it under 1000 characters.' };
  const { data, error } = await client.rpc('request_missing_drug', {
    p_drug_name: drugName,
    p_company_name: companyName || null,
    p_message: message || null,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: String(data) };
}

/**
 * Doctor: their own reports. Admin: every report (filter by status / kind).
 * Row security decides what each user can see.
 */
export async function loadDrugFeedback(
  client: SupabaseClient,
  filter: { status?: FeedbackStatus; kind?: FeedbackKind; limit?: number } = {}
): Promise<FeedbackResult<DrugFeedback[]>> {
  let query = client.from('drug_feedback').select(FEEDBACK_COLUMNS);
  if (filter.status) query = query.eq('status', filter.status);
  if (filter.kind) query = query.eq('kind', filter.kind);
  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(filter.limit ?? 100);
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: ((data ?? []) as FeedbackRow[]).map(toFeedback) };
}

/** Admin: set a report to reviewing / fixed / dismissed (the doctor is thanked when closed). */
export async function adminUpdateDrugFeedback(
  client: SupabaseClient,
  input: { id: string; status: FeedbackStatus; adminNote?: string }
): Promise<FeedbackResult<DrugFeedback>> {
  const note = clean(input.adminNote);
  if (note.length > 1000) return { ok: false, message: 'Please keep the note under 1000 characters.' };
  const { data, error } = await client.rpc('admin_update_drug_feedback', {
    p_feedback_id: input.id,
    p_status: input.status,
    p_admin_note: note || null,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, data: toFeedback(data as FeedbackRow) };
}

export interface DrugSource {
  title: string;
  url: string;
}

export interface DrugSources {
  checkedAt: string | null;
  sources: DrugSource[];
}

/** Drug page: official labels the drug was checked against, and when. */
export async function loadDrugSources(
  client: SupabaseClient,
  productId: string
): Promise<FeedbackResult<DrugSources>> {
  const { data, error } = await client.rpc('get_product_sources', { p_product_id: productId });
  if (error) return { ok: false, message: error.message };
  const raw = (data ?? {}) as { checked_at?: string | null; sources?: unknown };
  const sources = Array.isArray(raw.sources)
    ? (raw.sources as Array<Partial<DrugSource>>).filter(
        (s): s is DrugSource =>
          typeof s?.url === 'string' && s.url.startsWith('https://') && typeof s.title === 'string'
      )
    : [];
  return { ok: true, data: { checkedAt: raw.checked_at ?? null, sources } };
}

/** "Checked by Pharmaty on 7 Nov 2026" (or null when there is no date). */
export function formatCheckedLine(checkedAt: string | null): string | null {
  if (!checkedAt) return null;
  const date = new Date(checkedAt);
  if (Number.isNaN(date.getTime())) return null;
  const text = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return `Checked by Pharmaty on ${text}`;
}

-- Doctor feedback and drug sources (owner request, 2026-11-07).
--
-- 1. drug_feedback: an approved doctor can
--    * report an error on a published drug ("Report an error"), or
--    * ask for a drug that is missing from the catalog ("Can't find it?").
--    Each doctor sees only their own reports; administrators see all of them
--    and mark them reviewing / fixed / dismissed. When a report is closed the
--    doctor gets a thank-you message in their notification bell.
-- 2. get_product_sources: the official labels a published drug was checked
--    against (title + https link) and the date it was checked, so the drug
--    page can show "Sources" and "Checked by Pharmaty on <date>".

-- 1. Feedback -------------------------------------------------------------------

create table public.drug_feedback (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  product_id uuid references public.products (id) on delete cascade,
  topic text,
  requested_drug_name text,
  requested_company_name text,
  message text,
  reporter_profile_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'open',
  admin_note text,
  handled_by uuid references public.profiles (id) on delete set null,
  handled_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  constraint drug_feedback_kind check (kind in ('error_report', 'missing_drug')),
  constraint drug_feedback_status check (status in ('open', 'reviewing', 'fixed', 'dismissed')),
  constraint drug_feedback_topic check (
    topic is null or topic in (
      'name_or_strength', 'dose', 'indication', 'contraindication',
      'side_effects', 'interaction', 'company', 'not_sold_in_iraq', 'other'
    )
  ),
  constraint drug_feedback_shape check (
    (kind = 'error_report' and product_id is not null and topic is not null
      and requested_drug_name is null and requested_company_name is null)
    or
    (kind = 'missing_drug' and product_id is null and topic is null
      and requested_drug_name is not null)
  ),
  constraint drug_feedback_message_len check (
    message is null or char_length(btrim(message)) between 1 and 1000
  ),
  constraint drug_feedback_drug_name_len check (
    requested_drug_name is null or char_length(btrim(requested_drug_name)) between 2 and 120
  ),
  constraint drug_feedback_company_len check (
    requested_company_name is null or char_length(btrim(requested_company_name)) between 1 and 120
  ),
  constraint drug_feedback_admin_note_len check (
    admin_note is null or char_length(btrim(admin_note)) between 1 and 1000
  )
);

create index drug_feedback_status_idx on public.drug_feedback (status, created_at desc);
create index drug_feedback_reporter_idx on public.drug_feedback (reporter_profile_id, created_at desc);
create index drug_feedback_product_idx on public.drug_feedback (product_id) where product_id is not null;
create index drug_feedback_handled_by_idx on public.drug_feedback (handled_by) where handled_by is not null;

alter table public.drug_feedback enable row level security;

create policy drug_feedback_read on public.drug_feedback
  for select to authenticated
  using (
    reporter_profile_id = (select private.current_profile_id())
    or (select private.is_admin_or_super_admin())
  );

revoke all on public.drug_feedback from anon, authenticated;
grant select on public.drug_feedback to authenticated;

-- Shared guard: approved doctors (or administrators), at most 20 a day.
create or replace function private.require_feedback_sender()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid;
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501',
      message = 'Only approved doctors can send feedback.';
  end if;

  me := private.current_profile_id();

  if (
    select count(*) from public.drug_feedback
    where reporter_profile_id = me
      and created_at > timezone('utc', now()) - interval '1 day'
  ) >= 20 then
    raise exception using errcode = '54000',
      message = 'You have sent many reports today. Please try again tomorrow.';
  end if;

  return me;
end;
$$;

create or replace function public.report_drug_error(
  p_product_id uuid,
  p_topic text,
  p_message text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid;
  new_id uuid;
begin
  me := private.require_feedback_sender();

  if p_product_id is null or not exists (
    select 1 from public.products where id = p_product_id and status = 'published'
  ) then
    raise exception using errcode = '22023',
      message = 'This drug is not in the catalog.';
  end if;

  if nullif(btrim(coalesce(p_message, '')), '') is null then
    raise exception using errcode = '22023',
      message = 'Please describe the error.';
  end if;

  insert into public.drug_feedback (kind, product_id, topic, message, reporter_profile_id)
  values ('error_report', p_product_id, coalesce(nullif(btrim(p_topic), ''), 'other'),
    btrim(p_message), me)
  returning id into new_id;

  return new_id;
end;
$$;

create or replace function public.request_missing_drug(
  p_drug_name text,
  p_company_name text default null,
  p_message text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid;
  new_id uuid;
begin
  me := private.require_feedback_sender();

  if nullif(btrim(coalesce(p_drug_name, '')), '') is null then
    raise exception using errcode = '22023',
      message = 'Please write the drug name.';
  end if;

  insert into public.drug_feedback (
    kind, requested_drug_name, requested_company_name, message, reporter_profile_id
  )
  values (
    'missing_drug', btrim(p_drug_name),
    nullif(btrim(coalesce(p_company_name, '')), ''),
    nullif(btrim(coalesce(p_message, '')), ''),
    me
  )
  returning id into new_id;

  return new_id;
end;
$$;

create or replace function public.admin_update_drug_feedback(
  p_feedback_id uuid,
  p_status text,
  p_admin_note text default null
)
returns public.drug_feedback
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  old_row public.drug_feedback;
  new_row public.drug_feedback;
  drug_label text;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  if p_status is null or p_status not in ('open', 'reviewing', 'fixed', 'dismissed') then
    raise exception using errcode = '22023',
      message = 'Choose open, reviewing, fixed or dismissed.';
  end if;

  select * into old_row from public.drug_feedback where id = p_feedback_id for update;
  if not found then
    raise exception using errcode = 'P0002',
      message = 'Report not found.';
  end if;

  actor_id := private.current_profile_id();

  update public.drug_feedback
  set status = p_status,
    admin_note = coalesce(nullif(btrim(coalesce(p_admin_note, '')), ''), admin_note),
    handled_by = actor_id,
    handled_at = timezone('utc', now())
  where id = p_feedback_id
  returning * into new_row;

  -- Thank the doctor once, when the report is first closed.
  if p_status in ('fixed', 'dismissed') and old_row.status not in ('fixed', 'dismissed') then
    if new_row.kind = 'error_report' then
      select t.brand_name into drug_label
      from public.product_translations t
      where t.product_id = new_row.product_id and t.locale = 'en';
    else
      drug_label := new_row.requested_drug_name;
    end if;
    drug_label := left(coalesce(drug_label, 'a drug'), 60);

    insert into public.user_notifications (
      recipient_profile_id, sender_profile_id, kind, title, body
    )
    values (
      new_row.reporter_profile_id, actor_id, 'message',
      case
        when p_status = 'fixed' and new_row.kind = 'error_report' then 'Thank you — we fixed it'
        when p_status = 'fixed' then 'Thank you — drug added'
        else 'Thank you for your report'
      end,
      left(
        case
          when p_status = 'fixed' and new_row.kind = 'error_report' then
            format('Your report on %s was checked and the drug page was corrected.', drug_label)
          when p_status = 'fixed' then
            format('%s is now in the catalog. Thank you for asking.', drug_label)
          else
            format('We checked your report on %s and found no change was needed.', drug_label)
        end
        || coalesce(' Note: ' || new_row.admin_note, ''),
        2000
      )
    );
  end if;

  perform private.write_audit_log(
    actor_id, 'drug_feedback_updated', 'drug_feedback', p_feedback_id,
    jsonb_build_object('status', old_row.status, 'admin_note', old_row.admin_note),
    jsonb_build_object('status', new_row.status, 'admin_note', new_row.admin_note)
  );

  return new_row;
end;
$$;

revoke all on function private.require_feedback_sender() from public, anon, authenticated;
revoke all on function public.report_drug_error(uuid, text, text) from public, anon;
grant execute on function public.report_drug_error(uuid, text, text) to authenticated, service_role;
revoke all on function public.request_missing_drug(text, text, text) from public, anon;
grant execute on function public.request_missing_drug(text, text, text) to authenticated, service_role;
revoke all on function public.admin_update_drug_feedback(uuid, text, text) from public, anon;
grant execute on function public.admin_update_drug_feedback(uuid, text, text) to authenticated, service_role;

-- 2. Sources --------------------------------------------------------------------

create or replace function public.get_product_sources(p_product_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  if not (
    private.can_read_official_catalog_product(p_product_id)
    or private.is_admin_or_super_admin()
  ) then
    raise exception using errcode = '42501',
      message = 'This drug is not available.';
  end if;

  select jsonb_build_object(
    'checked_at', coalesce(p.reviewed_at, p.published_at),
    'sources', coalesce((
      select jsonb_agg(jsonb_build_object('title', s.title, 'url', s.url) order by s.first_pos)
      from (
        select
          (array_agg(
            left(coalesce(nullif(btrim(e.value ->> 'title'), ''), e.value ->> 'url'), 200)
            order by e.ordinality
          ))[1] as title,
          e.value ->> 'url' as url,
          min(e.ordinality) as first_pos
        from public.product_ai_drafts d,
          jsonb_array_elements(d.sources) with ordinality as e(value, ordinality)
        where d.product_id = p.id
          and jsonb_typeof(e.value) = 'object'
          and e.value ->> 'url' ~ '^https://[^ ]+$'
        group by e.value ->> 'url'
        order by min(e.ordinality)
        limit 5
      ) s
    ), '[]'::jsonb)
  )
  into result
  from public.products p
  where p.id = p_product_id;

  return result;
end;
$$;

revoke all on function public.get_product_sources(uuid) from public, anon;
grant execute on function public.get_product_sources(uuid) to authenticated, service_role;

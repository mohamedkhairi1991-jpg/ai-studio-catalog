-- User notifications and "last seen" (owner request, 2026-11-06).
--
-- 1. user_notifications: an administrator sends a message, alert or invitation
--    to one or more users. Each user sees only their own messages (bell icon)
--    and can mark them as read. sender_company_id is ready for later, when
--    companies get their own accounts.
-- 2. profiles.last_seen_at: set by record_app_open() when a signed-in user
--    opens the app (at most once every 5 minutes), so the admin monitor shows
--    real app opens instead of profile edits.

-- 1. Notifications -----------------------------------------------------------

create table public.user_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles (id) on delete cascade,
  sender_profile_id uuid references public.profiles (id) on delete set null,
  sender_company_id uuid references public.companies (id) on delete set null,
  kind text not null default 'message',
  title text not null,
  body text not null,
  link_url text,
  created_at timestamptz not null default timezone('utc', now()),
  read_at timestamptz,
  constraint user_notifications_kind check (kind in ('message', 'alert', 'invitation')),
  constraint user_notifications_title_len check (char_length(btrim(title)) between 1 and 120),
  constraint user_notifications_body_len check (char_length(btrim(body)) between 1 and 2000),
  constraint user_notifications_link_https check (link_url is null or link_url ~ '^https://[^ ]+$')
);

create index user_notifications_recipient_idx
  on public.user_notifications (recipient_profile_id, created_at desc);

alter table public.user_notifications enable row level security;

create policy user_notifications_read on public.user_notifications
  for select to authenticated
  using (
    recipient_profile_id = private.current_profile_id()
    or private.is_admin_or_super_admin()
  );

revoke all on public.user_notifications from anon, authenticated;
grant select on public.user_notifications to authenticated;

create or replace function public.admin_send_notification(
  p_recipient_profile_ids uuid[],
  p_kind text,
  p_title text,
  p_body text,
  p_link_url text default null
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  sent integer;
  wanted integer;
  batch_id uuid := pg_catalog.gen_random_uuid();
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  wanted := coalesce(cardinality(array(select distinct unnest(p_recipient_profile_ids))), 0);
  if wanted = 0 then
    raise exception using errcode = '22023',
      message = 'Choose at least one user.';
  end if;
  if wanted > 500 then
    raise exception using errcode = '22023',
      message = 'Send to at most 500 users at a time.';
  end if;

  if (
    select count(*) from public.profiles
    where id = any (p_recipient_profile_ids) and status = 'active'
  ) <> wanted then
    raise exception using errcode = '22023',
      message = 'Every recipient must be an active user.';
  end if;

  actor_id := private.current_profile_id();

  insert into public.user_notifications (
    recipient_profile_id, sender_profile_id, kind, title, body, link_url
  )
  select distinct r, actor_id, coalesce(nullif(btrim(p_kind), ''), 'message'),
    btrim(p_title), btrim(p_body), nullif(btrim(coalesce(p_link_url, '')), '')
  from unnest(p_recipient_profile_ids) as r;

  get diagnostics sent = row_count;

  perform private.write_audit_log(
    actor_id, 'notification_sent', 'user_notification_batch', batch_id, null,
    jsonb_build_object(
      'recipients', sent,
      'recipient_profile_ids', to_jsonb(p_recipient_profile_ids),
      'kind', coalesce(nullif(btrim(p_kind), ''), 'message'),
      'title', btrim(p_title)
    )
  );

  return sent;
end;
$$;

create or replace function public.mark_my_notifications_read(
  p_notification_ids uuid[] default null
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid;
  changed integer;
begin
  me := private.current_profile_id();
  if me is null then
    raise exception using errcode = '42501',
      message = 'An authenticated profile is required.';
  end if;

  update public.user_notifications
  set read_at = timezone('utc', now())
  where recipient_profile_id = me
    and read_at is null
    and (p_notification_ids is null or id = any (p_notification_ids));

  get diagnostics changed = row_count;
  return changed;
end;
$$;

revoke all on function public.admin_send_notification(uuid[], text, text, text, text) from public, anon;
grant execute on function public.admin_send_notification(uuid[], text, text, text, text) to authenticated, service_role;
revoke all on function public.mark_my_notifications_read(uuid[]) from public, anon;
grant execute on function public.mark_my_notifications_read(uuid[]) to authenticated, service_role;

-- 2. Last seen ----------------------------------------------------------------

alter table public.profiles add column last_seen_at timestamptz;

create or replace function public.record_app_open()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set last_seen_at = timezone('utc', now())
  where id = private.current_profile_id()
    and status = 'active'
    and (last_seen_at is null or last_seen_at < timezone('utc', now()) - interval '5 minutes');
end;
$$;

revoke all on function public.record_app_open() from public, anon;
grant execute on function public.record_app_open() to authenticated, service_role;
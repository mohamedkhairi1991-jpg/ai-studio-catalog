-- Doctor profile picture and notebook (fix, 14 Nov 2026).
--
-- AI Studio's profile screen saved the picture (as a ~30 KB data URL) and the
-- notebook in Supabase Auth user metadata. User metadata travels inside the
-- sign-in token on EVERY request, so it slows the app and can break requests.
--
-- 1. profiles.avatar_path + public bucket doctor-avatars (each user writes only
--    their own folder <auth uid>/...). set_my_avatar() saves the path.
-- 2. doctor_private_data: the notebook (JSON list, max 30 entries), readable and
--    writable only by its owner. get_my_notebook() / save_my_notebook().
-- 3. Guard trigger: strips data-URL pictures and notebooks from user metadata.
-- 4. Moves existing notebooks out of user metadata and cleans it.

-- 1 ---------------------------------------------------------------------------
alter table public.profiles
  add column avatar_path text;

alter table public.profiles
  add constraint profiles_avatar_path_owner
    check (avatar_path is null or avatar_path like (auth_user_id::text || '/%'));

comment on column public.profiles.avatar_path is
  'Profile picture path in the doctor-avatars bucket (<auth uid>/...).';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('doctor-avatars', 'doctor-avatars', true, 1048576,
        array['image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do nothing;

create policy doctor_avatars_owner_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'doctor-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
);

create policy doctor_avatars_owner_update
on storage.objects
for update
to authenticated
using (bucket_id = 'doctor-avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'doctor-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy doctor_avatars_owner_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'doctor-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create or replace function public.set_my_avatar(p_path text default null)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_path text := nullif(btrim(coalesce(p_path, '')), '');
begin
  if v_uid is null then
    raise exception using errcode = '42501', message = 'Please sign in.';
  end if;
  if v_path is not null and v_path not like (v_uid::text || '/%') then
    raise exception using errcode = '22023', message = 'The picture must be uploaded to your own folder.';
  end if;

  update public.profiles set avatar_path = v_path where auth_user_id = v_uid;
  return v_path;
end;
$$;

-- 2 ---------------------------------------------------------------------------
create table public.doctor_private_data (
  profile_id uuid primary key references public.profiles(id) on update restrict on delete cascade,
  notebook jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint doctor_private_data_notebook_array check (jsonb_typeof(notebook) = 'array'),
  constraint doctor_private_data_notebook_size check (
    jsonb_array_length(notebook) <= 30 and pg_column_size(notebook) <= 200000
  )
);

comment on table public.doctor_private_data is
  'Private per-doctor data (notebook). Only the owner reads or writes it.';

create trigger doctor_private_data_set_updated_at
before update on public.doctor_private_data
for each row execute function private.set_updated_at();

alter table public.doctor_private_data enable row level security;
revoke all on table public.doctor_private_data from public, anon, authenticated;
grant all on table public.doctor_private_data to service_role;

create or replace function public.get_my_notebook()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if v_profile is null then
    raise exception using errcode = '42501', message = 'Please sign in.';
  end if;
  return coalesce(
    (select d.notebook from public.doctor_private_data as d where d.profile_id = v_profile),
    '[]'::jsonb
  );
end;
$$;

create or replace function public.save_my_notebook(p_notebook jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if v_profile is null then
    raise exception using errcode = '42501', message = 'Please sign in.';
  end if;
  if p_notebook is null or jsonb_typeof(p_notebook) <> 'array' then
    raise exception using errcode = '22023', message = 'The notebook must be a list.';
  end if;
  if jsonb_array_length(p_notebook) > 30 then
    raise exception using errcode = '22023', message = 'The notebook can hold up to 30 notes.';
  end if;

  insert into public.doctor_private_data (profile_id, notebook)
  values (v_profile, p_notebook)
  on conflict (profile_id) do update set notebook = excluded.notebook;

  return p_notebook;
end;
$$;

revoke all on function public.set_my_avatar(text) from public, anon;
revoke all on function public.get_my_notebook() from public, anon;
revoke all on function public.save_my_notebook(jsonb) from public, anon;
grant execute on function public.set_my_avatar(text) to authenticated, service_role;
grant execute on function public.get_my_notebook() to authenticated, service_role;
grant execute on function public.save_my_notebook(jsonb) to authenticated, service_role;

-- 3 ---------------------------------------------------------------------------
create or replace function private.strip_heavy_user_metadata()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.raw_user_meta_data ? 'doctor_notebook_v1' then
    new.raw_user_meta_data := new.raw_user_meta_data - 'doctor_notebook_v1';
  end if;
  if coalesce(new.raw_user_meta_data ->> 'doctor_avatar_url', '') like 'data:%' then
    new.raw_user_meta_data := new.raw_user_meta_data - 'doctor_avatar_url';
  end if;
  return new;
end;
$$;

revoke all on function private.strip_heavy_user_metadata() from public;

create or replace trigger auth_users_strip_heavy_metadata
before insert or update of raw_user_meta_data on auth.users
for each row execute function private.strip_heavy_user_metadata();

-- 4 ---------------------------------------------------------------------------
insert into public.doctor_private_data (profile_id, notebook)
select p.id, (
  select coalesce(jsonb_agg(e), '[]'::jsonb)
  from (
    select e from jsonb_array_elements(u.raw_user_meta_data -> 'doctor_notebook_v1') as e limit 30
  ) as first30
)
from auth.users as u
join public.profiles as p on p.auth_user_id = u.id
where jsonb_typeof(u.raw_user_meta_data -> 'doctor_notebook_v1') = 'array'
  and jsonb_array_length(u.raw_user_meta_data -> 'doctor_notebook_v1') > 0
on conflict (profile_id) do nothing;

update auth.users
set raw_user_meta_data = raw_user_meta_data
where raw_user_meta_data ? 'doctor_notebook_v1'
   or coalesce(raw_user_meta_data ->> 'doctor_avatar_url', '') like 'data:%';

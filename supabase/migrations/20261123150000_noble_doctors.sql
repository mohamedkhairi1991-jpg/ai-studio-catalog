-- Noble doctors (23 Nov 2026).
--
-- Experienced doctors chosen by the admin, listed by specialty, each with a
-- public page of posts (notes and recommendations from their experience) that
-- every approved doctor can read. Owner decisions: noble doctors post straight
-- away (no approval), can add any pictures, no company-link notes. The admin
-- can hide a post or remove the noble role.
--
-- Tables (no direct access; everything goes through the functions below):
--   noble_doctors      one row per noble doctor (specialty, title, short bio)
--   noble_posts        their posts (title, text, topic, pinned, hidden)
--   noble_post_drugs   drugs a post is about (shown on those drug pages)
--   noble_post_images  pictures in the public bucket noble-posts (<auth uid>/...)

-- Tables ----------------------------------------------------------------------
create table public.noble_doctors (
  profile_id uuid primary key references public.profiles(id) on update restrict on delete cascade,
  specialty_id uuid not null references public.specialties(id) on update restrict on delete restrict,
  title text check (title is null or char_length(title) <= 120),
  bio text check (bio is null or char_length(bio) <= 2000),
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index noble_doctors_specialty_idx on public.noble_doctors (specialty_id) where is_active;
create index noble_doctors_created_by_idx on public.noble_doctors (created_by);

create table public.noble_posts (
  id uuid primary key default gen_random_uuid(),
  author_profile_id uuid not null references public.noble_doctors(profile_id) on update restrict on delete cascade,
  title text check (title is null or char_length(title) <= 200),
  body text not null check (char_length(btrim(body)) between 1 and 10000),
  topic text not null default 'tip' check (topic in ('tip', 'approach', 'case', 'warning')),
  is_pinned boolean not null default false,
  is_hidden boolean not null default false,
  hidden_by uuid references public.profiles(id) on delete set null,
  hidden_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index noble_posts_author_idx on public.noble_posts (author_profile_id, created_at desc);
create index noble_posts_recent_idx on public.noble_posts (created_at desc) where not is_hidden;
create index noble_posts_hidden_by_idx on public.noble_posts (hidden_by);

create table public.noble_post_drugs (
  post_id uuid not null references public.noble_posts(id) on update restrict on delete cascade,
  product_id uuid not null references public.products(id) on update restrict on delete cascade,
  primary key (post_id, product_id)
);

create index noble_post_drugs_product_idx on public.noble_post_drugs (product_id);

create table public.noble_post_images (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.noble_posts(id) on update restrict on delete cascade,
  storage_path text not null check (storage_path ~ '^[0-9a-f-]{36}/[^/]+$'),
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index noble_post_images_post_idx on public.noble_post_images (post_id, sort_order);

create trigger noble_doctors_set_updated_at
before update on public.noble_doctors
for each row execute function private.set_updated_at();

create trigger noble_posts_set_updated_at
before update on public.noble_posts
for each row execute function private.set_updated_at();

alter table public.noble_doctors enable row level security;
alter table public.noble_posts enable row level security;
alter table public.noble_post_drugs enable row level security;
alter table public.noble_post_images enable row level security;
revoke all on table public.noble_doctors, public.noble_posts, public.noble_post_drugs, public.noble_post_images
  from public, anon, authenticated;
grant all on table public.noble_doctors, public.noble_posts, public.noble_post_drugs, public.noble_post_images
  to service_role;

comment on table public.noble_doctors is 'Noble doctors chosen by the admin; read through get_noble_* functions.';
comment on table public.noble_posts is 'Public posts by noble doctors (no approval step; the admin can hide).';

-- Helpers ---------------------------------------------------------------------
create or replace function private.is_active_noble()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.noble_doctors as nd
    join public.profiles as p on p.id = nd.profile_id
    where p.auth_user_id = auth.uid()
      and p.status = 'active'
      and nd.is_active
  );
$$;

revoke all on function private.is_active_noble() from public, anon;
-- Used by the noble-posts storage policy (only says whether the caller is noble).
grant execute on function private.is_active_noble() to authenticated;

create or replace function private.require_catalog_reader()
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only approved doctors can read noble doctors'' pages.';
  end if;
end;
$$;

revoke all on function private.require_catalog_reader() from public, anon, authenticated;

-- One doctor's card (name, picture, specialty, title, workplace, post count).
create or replace function private.noble_doctor_json(p_profile_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_strip_nulls(jsonb_build_object(
    'profileId', nd.profile_id,
    'fullName', coalesce(nullif(btrim(p.full_name), ''), 'Doctor'),
    'avatarPath', p.avatar_path,
    'specialtyId', nd.specialty_id,
    'specialtyName', st.name,
    'title', nd.title,
    'bio', nd.bio,
    'workplace', hp.workplace,
    'isActive', nd.is_active,
    'postCount', (select count(*) from public.noble_posts as np where np.author_profile_id = nd.profile_id and not np.is_hidden),
    'lastPostAt', (select max(np.created_at) from public.noble_posts as np where np.author_profile_id = nd.profile_id and not np.is_hidden)
  ))
  from public.noble_doctors as nd
  join public.profiles as p on p.id = nd.profile_id
  left join public.healthcare_professionals as hp on hp.profile_id = nd.profile_id
  left join public.specialty_translations as st on st.specialty_id = nd.specialty_id and st.locale = 'en'
  where nd.profile_id = p_profile_id;
$$;

revoke all on function private.noble_doctor_json(uuid) from public, anon, authenticated;

-- One post with its pictures and drugs (only drugs doctors can see).
create or replace function private.noble_post_json(p_post_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_strip_nulls(jsonb_build_object(
    'id', np.id,
    'authorProfileId', np.author_profile_id,
    'title', np.title,
    'body', np.body,
    'topic', np.topic,
    'isPinned', np.is_pinned,
    'isHidden', np.is_hidden,
    'createdAt', np.created_at,
    'updatedAt', np.updated_at,
    'images', coalesce((
      select jsonb_agg(i.storage_path order by i.sort_order, i.created_at)
      from public.noble_post_images as i
      where i.post_id = np.id
    ), '[]'::jsonb),
    'drugs', coalesce((
      select jsonb_agg(jsonb_build_object('productId', c.product_id, 'brandName', c.brand_en) order by c.brand_en)
      from public.noble_post_drugs as d
      join private.catalog_search_cache as c on c.product_id = d.product_id
      where d.post_id = np.id
    ), '[]'::jsonb)
  ))
  from public.noble_posts as np
  where np.id = p_post_id;
$$;

revoke all on function private.noble_post_json(uuid) from public, anon, authenticated;

-- Reading -----------------------------------------------------------------------

-- Is the signed-in user a noble doctor? (any signed-in user may ask)
create or replace function public.get_my_noble_status()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if v_profile is null or not private.is_active_noble() then
    return jsonb_build_object('isNoble', false);
  end if;
  return jsonb_build_object('isNoble', true, 'doctor', private.noble_doctor_json(v_profile));
end;
$$;

-- Noble doctors, optionally for one specialty (most recent posters first).
create or replace function public.get_noble_doctors(p_specialty_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.require_catalog_reader();
  return coalesce((
    select jsonb_agg(private.noble_doctor_json(nd.profile_id) order by last_post desc nulls last, p.full_name)
    from public.noble_doctors as nd
    join public.profiles as p on p.id = nd.profile_id
    left join lateral (
      select max(np.created_at) as last_post
      from public.noble_posts as np
      where np.author_profile_id = nd.profile_id and not np.is_hidden
    ) as lp on true
    where nd.is_active
      and p.status = 'active'
      and (p_specialty_id is null or nd.specialty_id = p_specialty_id)
  ), '[]'::jsonb);
end;
$$;

-- Specialties that have noble doctors (for the specialty picker).
create or replace function public.get_noble_specialties()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.require_catalog_reader();
  return coalesce((
    select jsonb_agg(jsonb_build_object('specialtyId', x.specialty_id, 'name', x.name, 'doctorCount', x.n) order by x.name)
    from (
      select nd.specialty_id, coalesce(st.name, 'Specialty') as name, count(*) as n
      from public.noble_doctors as nd
      join public.profiles as p on p.id = nd.profile_id
      left join public.specialty_translations as st on st.specialty_id = nd.specialty_id and st.locale = 'en'
      where nd.is_active and p.status = 'active'
      group by nd.specialty_id, st.name
    ) as x
  ), '[]'::jsonb);
end;
$$;

-- A noble doctor's page: the doctor and their posts (pinned first, newest next).
-- Hidden posts are shown only to their author and admins (marked isHidden).
create or replace function public.get_noble_doctor_page(p_profile_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_viewer uuid := private.current_profile_id();
  v_admin boolean := private.is_admin_or_super_admin();
begin
  perform private.require_catalog_reader();
  if not exists (
    select 1 from public.noble_doctors as nd
    where nd.profile_id = p_profile_id and (nd.is_active or v_admin)
  ) then
    return null;
  end if;
  return jsonb_build_object(
    'doctor', private.noble_doctor_json(p_profile_id),
    'posts', coalesce((
      select jsonb_agg(private.noble_post_json(np.id) order by np.is_pinned desc, np.created_at desc)
      from public.noble_posts as np
      where np.author_profile_id = p_profile_id
        and (not np.is_hidden or v_admin or np.author_profile_id = v_viewer)
    ), '[]'::jsonb)
  );
end;
$$;

-- Latest posts from all noble doctors (optionally one specialty).
create or replace function public.get_noble_feed(
  p_specialty_id uuid default null,
  p_limit integer default 20,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.require_catalog_reader();
  return coalesce((
    select jsonb_agg(
      private.noble_post_json(x.id) || jsonb_build_object('author', private.noble_doctor_json(x.author_profile_id))
      order by x.created_at desc
    )
    from (
      select np.id, np.author_profile_id, np.created_at
      from public.noble_posts as np
      join public.noble_doctors as nd on nd.profile_id = np.author_profile_id and nd.is_active
      where not np.is_hidden
        and (p_specialty_id is null or nd.specialty_id = p_specialty_id)
      order by np.created_at desc
      limit least(greatest(coalesce(p_limit, 20), 1), 50)
      offset greatest(coalesce(p_offset, 0), 0)
    ) as x
  ), '[]'::jsonb);
end;
$$;

-- Noble doctors' posts about one drug (for the drug page).
create or replace function public.get_product_noble_notes(p_product_id uuid, p_limit integer default 10)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.require_catalog_reader();
  return coalesce((
    select jsonb_agg(
      private.noble_post_json(x.id) || jsonb_build_object('author', private.noble_doctor_json(x.author_profile_id))
      order by x.created_at desc
    )
    from (
      select np.id, np.author_profile_id, np.created_at
      from public.noble_post_drugs as d
      join public.noble_posts as np on np.id = d.post_id and not np.is_hidden
      join public.noble_doctors as nd on nd.profile_id = np.author_profile_id and nd.is_active
      where d.product_id = p_product_id
      order by np.created_at desc
      limit least(greatest(coalesce(p_limit, 10), 1), 50)
    ) as x
  ), '[]'::jsonb);
end;
$$;

-- Writing (noble doctors) ---------------------------------------------------------

-- Create (p_post_id null) or edit one's own post. Up to 10 pictures, 10 drugs.
create or replace function public.noble_save_post(
  p_post_id uuid,
  p_title text,
  p_body text,
  p_topic text default 'tip',
  p_pinned boolean default false,
  p_product_ids uuid[] default '{}',
  p_image_paths text[] default '{}'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
  v_id uuid := p_post_id;
  v_title text := nullif(btrim(coalesce(p_title, '')), '');
  v_body text := btrim(coalesce(p_body, ''));
  v_topic text := coalesce(nullif(btrim(coalesce(p_topic, '')), ''), 'tip');
  v_images text[] := coalesce(p_image_paths, '{}');
  v_products uuid[] := coalesce(p_product_ids, '{}');
  v_path text;
begin
  if v_profile is null or not private.is_active_noble() then
    raise exception using errcode = '42501', message = 'Only noble doctors can post.';
  end if;
  if v_body = '' then
    raise exception using errcode = '22023', message = 'Write something first.';
  end if;
  if char_length(v_body) > 10000 then
    raise exception using errcode = '22023', message = 'The post is too long (10,000 characters at most).';
  end if;
  if v_title is not null and char_length(v_title) > 200 then
    raise exception using errcode = '22023', message = 'The title is too long (200 characters at most).';
  end if;
  if v_topic not in ('tip', 'approach', 'case', 'warning') then
    raise exception using errcode = '22023', message = 'Choose a topic: tip, approach, case or warning.';
  end if;
  if coalesce(array_length(v_images, 1), 0) > 10 then
    raise exception using errcode = '22023', message = 'A post can have up to 10 pictures.';
  end if;
  if coalesce(array_length(v_products, 1), 0) > 10 then
    raise exception using errcode = '22023', message = 'A post can be linked to up to 10 drugs.';
  end if;
  foreach v_path in array v_images loop
    if v_path is null or v_path not like (auth.uid()::text || '/%') or v_path !~ '^[0-9a-f-]{36}/[^/]+$' then
      raise exception using errcode = '22023', message = 'Pictures must be uploaded to your own folder.';
    end if;
  end loop;

  if v_id is null then
    insert into public.noble_posts (author_profile_id, title, body, topic, is_pinned)
    values (v_profile, v_title, v_body, v_topic, coalesce(p_pinned, false))
    returning id into v_id;
  else
    update public.noble_posts
    set title = v_title, body = v_body, topic = v_topic, is_pinned = coalesce(p_pinned, false)
    where id = v_id and author_profile_id = v_profile;
    if not found then
      raise exception using errcode = '42501', message = 'You can only edit your own posts.';
    end if;
    delete from public.noble_post_drugs where post_id = v_id;
    delete from public.noble_post_images where post_id = v_id;
  end if;

  insert into public.noble_post_drugs (post_id, product_id)
  select distinct v_id, c.product_id
  from unnest(v_products) as u(product_id)
  join private.catalog_search_cache as c on c.product_id = u.product_id;

  insert into public.noble_post_images (post_id, storage_path, sort_order)
  select v_id, u.path, u.ord::integer
  from unnest(v_images) with ordinality as u(path, ord);

  return v_id;
end;
$$;

-- Delete one's own post (admins: any post).
create or replace function public.noble_delete_post(p_post_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if private.is_admin_or_super_admin() then
    delete from public.noble_posts where id = p_post_id;
  else
    delete from public.noble_posts where id = p_post_id and author_profile_id = v_profile;
  end if;
  if not found then
    raise exception using errcode = '42501', message = 'You can only delete your own posts.';
  end if;
end;
$$;

-- A noble doctor edits the title and bio on their own page.
create or replace function public.noble_update_my_profile(p_title text, p_bio text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if v_profile is null or not private.is_active_noble() then
    raise exception using errcode = '42501', message = 'Only noble doctors can edit a noble page.';
  end if;
  if char_length(coalesce(p_title, '')) > 120 or char_length(coalesce(p_bio, '')) > 2000 then
    raise exception using errcode = '22023', message = 'The title (120) or bio (2,000 characters) is too long.';
  end if;
  update public.noble_doctors
  set title = nullif(btrim(coalesce(p_title, '')), ''), bio = nullif(btrim(coalesce(p_bio, '')), '')
  where profile_id = v_profile;
  return private.noble_doctor_json(v_profile);
end;
$$;

-- Admin -------------------------------------------------------------------------

-- Find approved doctors to make noble.
create or replace function public.admin_search_doctors(p_query text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_q text := nullif(btrim(coalesce(p_query, '')), '');
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  return coalesce((
    select jsonb_agg(row_json order by full_name)
    from (
      select p.full_name, jsonb_strip_nulls(jsonb_build_object(
        'profileId', p.id,
        'fullName', coalesce(nullif(btrim(p.full_name), ''), 'Doctor'),
        'email', p.email,
        'specialtyId', hp.specialty_id,
        'specialtyName', st.name,
        'workplace', hp.workplace,
        'isNoble', coalesce(nd.is_active, false)
      )) as row_json
      from public.profiles as p
      join public.healthcare_professionals as hp
        on hp.profile_id = p.id and hp.profession_type = 'physician' and hp.verification_status = 'approved'
      left join public.specialty_translations as st on st.specialty_id = hp.specialty_id and st.locale = 'en'
      left join public.noble_doctors as nd on nd.profile_id = p.id
      where p.status = 'active'
        and (
          v_q is null
          or p.full_name ilike '%' || v_q || '%'
          or p.email ilike '%' || v_q || '%'
          or p.phone ilike '%' || v_q || '%'
        )
      order by p.full_name
      limit 25
    ) as rows
  ), '[]'::jsonb);
end;
$$;

-- Make an approved doctor noble (or change / remove: p_active false).
create or replace function public.admin_set_noble_doctor(
  p_profile_id uuid,
  p_specialty_id uuid,
  p_title text default null,
  p_bio text default null,
  p_active boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := private.current_profile_id();
  v_old jsonb;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  if not exists (
    select 1
    from public.healthcare_professionals as hp
    join public.profiles as p on p.id = hp.profile_id
    where hp.profile_id = p_profile_id
      and hp.profession_type = 'physician'
      and hp.verification_status = 'approved'
      and p.status = 'active'
  ) then
    raise exception using errcode = '22023', message = 'Only approved doctors can be noble doctors.';
  end if;
  if not exists (select 1 from public.specialties as s where s.id = p_specialty_id and s.is_active) then
    raise exception using errcode = '22023', message = 'Choose an active specialty.';
  end if;
  if char_length(coalesce(p_title, '')) > 120 or char_length(coalesce(p_bio, '')) > 2000 then
    raise exception using errcode = '22023', message = 'The title (120) or bio (2,000 characters) is too long.';
  end if;

  select to_jsonb(nd) into v_old from public.noble_doctors as nd where nd.profile_id = p_profile_id;

  insert into public.noble_doctors (profile_id, specialty_id, title, bio, is_active, created_by)
  values (
    p_profile_id, p_specialty_id,
    nullif(btrim(coalesce(p_title, '')), ''), nullif(btrim(coalesce(p_bio, '')), ''),
    coalesce(p_active, true), v_actor
  )
  on conflict (profile_id) do update
  set specialty_id = excluded.specialty_id,
      title = coalesce(excluded.title, public.noble_doctors.title),
      bio = coalesce(excluded.bio, public.noble_doctors.bio),
      is_active = excluded.is_active;

  perform private.write_audit_log(
    v_actor, 'noble_doctor_set', 'profile', p_profile_id, v_old,
    jsonb_build_object('specialty_id', p_specialty_id, 'is_active', coalesce(p_active, true))
  );
  return private.noble_doctor_json(p_profile_id);
end;
$$;

-- Hide or show a post.
create or replace function public.admin_hide_noble_post(p_post_id uuid, p_hidden boolean default true)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := private.current_profile_id();
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  update public.noble_posts
  set is_hidden = coalesce(p_hidden, true),
      hidden_by = case when coalesce(p_hidden, true) then v_actor else null end,
      hidden_at = case when coalesce(p_hidden, true) then timezone('utc', now()) else null end
  where id = p_post_id;
  if not found then
    raise exception using errcode = 'P0002', message = 'The post does not exist.';
  end if;
  perform private.write_audit_log(
    v_actor, case when coalesce(p_hidden, true) then 'noble_post_hidden' else 'noble_post_shown' end,
    'noble_post', p_post_id, null, null
  );
end;
$$;

-- Grants ------------------------------------------------------------------------
do $$
declare
  f text;
begin
  foreach f in array array[
    'public.get_my_noble_status()',
    'public.get_noble_doctors(uuid)',
    'public.get_noble_specialties()',
    'public.get_noble_doctor_page(uuid)',
    'public.get_noble_feed(uuid, integer, integer)',
    'public.get_product_noble_notes(uuid, integer)',
    'public.noble_save_post(uuid, text, text, text, boolean, uuid[], text[])',
    'public.noble_delete_post(uuid)',
    'public.noble_update_my_profile(text, text)',
    'public.admin_search_doctors(text)',
    'public.admin_set_noble_doctor(uuid, uuid, text, text, boolean)',
    'public.admin_hide_noble_post(uuid, boolean)'
  ] loop
    execute format('revoke all on function %s from public, anon', f);
    execute format('grant execute on function %s to authenticated, service_role', f);
  end loop;
end;
$$;

-- Pictures: public bucket, 5 MB, each noble doctor writes only their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('noble-posts', 'noble-posts', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[])
on conflict (id) do nothing;

create policy noble_posts_owner_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'noble-posts'
  and (storage.foldername(name))[1] = auth.uid()::text
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  and private.is_active_noble()
);

create policy noble_posts_owner_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'noble-posts' and (storage.foldername(name))[1] = auth.uid()::text);

-- Noble post views (23 Nov 2026).
--
-- How many doctors have seen each noble post. Each doctor counts once per post
-- (the author never counts). Only the author (and admins) see the number, on
-- the author's own page: noble_post_json() adds viewCount only for them.

create table public.noble_post_views (
  post_id uuid not null references public.noble_posts(id) on update restrict on delete cascade,
  viewer_profile_id uuid not null references public.profiles(id) on update restrict on delete cascade,
  first_seen_at timestamptz not null default timezone('utc', now()),
  primary key (post_id, viewer_profile_id)
);

create index noble_post_views_viewer_idx on public.noble_post_views (viewer_profile_id);

alter table public.noble_post_views enable row level security;
revoke all on table public.noble_post_views from public, anon, authenticated;
grant all on table public.noble_post_views to service_role;

comment on table public.noble_post_views is
  'One row per doctor who saw a noble post; counts shown only to the author.';

-- The app reports the posts a doctor has just seen (up to 50 at a time).
create or replace function public.record_noble_post_views(p_post_ids uuid[])
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile uuid := private.current_profile_id();
begin
  if v_profile is null or not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    return;
  end if;
  insert into public.noble_post_views (post_id, viewer_profile_id)
  select distinct np.id, v_profile
  from unnest(coalesce(p_post_ids[1:50], '{}')) as u(post_id)
  join public.noble_posts as np on np.id = u.post_id and not np.is_hidden
  where np.author_profile_id <> v_profile
  on conflict do nothing;
end;
$$;

revoke all on function public.record_noble_post_views(uuid[]) from public, anon;
grant execute on function public.record_noble_post_views(uuid[]) to authenticated, service_role;

-- Same post JSON as before, plus viewCount for the author and admins only.
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
    ), '[]'::jsonb),
    'viewCount', case
      when np.author_profile_id = private.current_profile_id() or private.is_admin_or_super_admin()
        then (select count(*) from public.noble_post_views as v where v.post_id = np.id)
    end
  ))
  from public.noble_posts as np
  where np.id = p_post_id;
$$;

revoke all on function private.noble_post_json(uuid) from public, anon, authenticated;

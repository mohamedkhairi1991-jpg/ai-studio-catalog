-- Public storage bucket for ad pictures and short videos, used by the admin
-- ad editor (AI Studio, 2026-11-08: "Upload picture or short video").
-- Only administrators upload; files are public so the app can show them.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'sponsored-ads',
  'sponsored-ads',
  true,
  26214400,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'
  ]::text[]
)
on conflict (id) do nothing;

create policy sponsored_ads_storage_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'sponsored-ads'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm', 'mov', 'm4v')
  and private.is_admin_or_super_admin()
);

create policy sponsored_ads_storage_admin_update
on storage.objects
for update
to authenticated
using (bucket_id = 'sponsored-ads' and private.is_admin_or_super_admin())
with check (bucket_id = 'sponsored-ads' and private.is_admin_or_super_admin());

create policy sponsored_ads_storage_admin_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'sponsored-ads' and private.is_admin_or_super_admin());

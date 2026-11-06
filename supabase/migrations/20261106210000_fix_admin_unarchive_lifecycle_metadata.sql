-- Fix admin_unarchive_product for drugs that were published before they were
-- archived. A draft must not carry submitted / reviewed / published / hidden
-- details (private.validate_product_catalog_record), so restoring now clears
-- them too. The old values are kept in the audit log.

create or replace function public.admin_unarchive_product(
  p_product_id uuid,
  p_reason text default null
)
returns public.products
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  current_row public.products;
  updated_row public.products;
  company_status text;
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501',
      message = 'Administrator access is required.';
  end if;

  select * into current_row
  from public.products
  where id = p_product_id
  for update;

  if not found then
    raise exception using errcode = 'P0002',
      message = 'The product does not exist.';
  end if;

  if current_row.status <> 'archived' then
    raise exception using errcode = '23514',
      message = 'Only archived products can be restored.';
  end if;

  select c.status::text into company_status
  from public.companies as c
  where c.id = current_row.company_id;

  if company_status = 'archived' then
    raise exception using errcode = '23514',
      message = 'Restore the company before restoring its products.';
  end if;

  actor_id := private.current_profile_id();

  perform set_config('pharmaty.admin_unarchive', 'on', true);

  update public.products
  set
    status = 'draft',
    submitted_by = null,
    submitted_at = null,
    reviewed_by = null,
    reviewed_at = null,
    review_reason = null,
    published_by = null,
    published_at = null,
    hidden_by = null,
    hidden_at = null,
    hidden_reason = null,
    archived_by = null,
    archived_at = null,
    archive_reason = null,
    updated_by = actor_id
  where id = p_product_id
  returning * into updated_row;

  perform set_config('pharmaty.admin_unarchive', 'off', true);

  perform private.write_audit_log(
    actor_id, 'product_unarchived', 'product', p_product_id,
    jsonb_build_object(
      'status', current_row.status,
      'archive_reason', current_row.archive_reason,
      'archived_at', current_row.archived_at,
      'published_at', current_row.published_at,
      'published_by', current_row.published_by
    ),
    jsonb_build_object(
      'status', updated_row.status,
      'company_id', updated_row.company_id,
      'reason', nullif(btrim(coalesce(p_reason, '')), '')
    )
  );

  return updated_row;
end;
$$;

revoke all on function public.admin_unarchive_product(uuid, text) from public, anon;
grant execute on function public.admin_unarchive_product(uuid, text) to authenticated, service_role;
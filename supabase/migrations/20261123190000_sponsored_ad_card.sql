-- Standard ad card (23 Nov 2026).
--
-- 1. sponsored_ads.cta: the button on the card — 'learn_more' (default),
--    'visit_website', 'call' (the linked company's phone) or 'view_products'
--    (the linked company's page). Set with admin_set_sponsored_ad_cta().
-- 2. doctor_sponsored_ad_v2(p_seed): the same choice of ad as
--    doctor_sponsored_ad(), plus the button and the linked company's name,
--    logo and phone, as JSON (the old function stays for older app versions).

alter table public.sponsored_ads
  add column cta text not null default 'learn_more'
    constraint sponsored_ads_cta_check check (cta in ('learn_more', 'visit_website', 'call', 'view_products'));

comment on column public.sponsored_ads.cta is
  'Card button: learn_more, visit_website, call (company phone) or view_products (company page).';

create or replace function public.doctor_sponsored_ad_v2(p_seed integer default 0)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_specialty uuid := private.current_doctor_specialty_id();
begin
  if not (private.is_approved_doctor() or private.is_admin_or_super_admin()) then
    raise exception using errcode = '42501', message = 'Only doctors can see sponsored content.';
  end if;

  return (
    select jsonb_strip_nulls(jsonb_build_object(
      'adId', a.id,
      'sponsorName', a.sponsor_name,
      'title', a.title,
      'body', a.body,
      'imageUrl', a.image_url,
      'linkUrl', a.link_url,
      'cta', a.cta,
      'companyId', c.id,
      'companyName', c.company_name,
      'companyLogoPath', c.logo_path,
      'companyPhone', c.contact_phone
    ))
    from public.sponsored_ads as a
    left join public.companies as c on c.id = a.company_id and c.status = 'verified'
    where a.is_active
      and (a.starts_on is null or a.starts_on <= current_date)
      and (a.ends_on is null or a.ends_on >= current_date)
      and (a.target_specialty_id is null or a.target_specialty_id = v_specialty)
    order by a.priority desc,
      md5(a.id::text || current_date::text || coalesce(p_seed, 0)::text)
    limit 1
  );
end;
$$;

create or replace function public.admin_set_sponsored_ad_cta(p_ad_id uuid, p_cta text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin_or_super_admin() then
    raise exception using errcode = '42501', message = 'Administrator access is required.';
  end if;
  if coalesce(p_cta, '') not in ('learn_more', 'visit_website', 'call', 'view_products') then
    raise exception using errcode = '22023', message = 'Choose a button: Learn more, Visit website, Call or View products.';
  end if;
  update public.sponsored_ads set cta = p_cta where id = p_ad_id;
  if not found then
    raise exception using errcode = 'P0002', message = 'The ad does not exist.';
  end if;
end;
$$;

revoke all on function public.doctor_sponsored_ad_v2(integer) from public, anon;
revoke all on function public.admin_set_sponsored_ad_cta(uuid, text) from public, anon;
grant execute on function public.doctor_sponsored_ad_v2(integer) to authenticated, service_role;
grant execute on function public.admin_set_sponsored_ad_cta(uuid, text) to authenticated, service_role;

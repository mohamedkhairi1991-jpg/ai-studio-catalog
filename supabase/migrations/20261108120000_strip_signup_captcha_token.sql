-- Sign-up robot check (Cloudflare Turnstile) runs only at sign-up, in the
-- signup-captcha-hook edge function (Supabase Auth "Before User Created" hook).
-- The form passes the one-time token in user metadata as `captcha_token`.
-- Remove it before the user row is saved so it never lands in the database
-- or in session tokens.

create or replace function private.strip_signup_captcha_token()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.raw_user_meta_data ? 'captcha_token' then
    new.raw_user_meta_data := new.raw_user_meta_data - 'captcha_token';
  end if;
  return new;
end;
$$;

revoke all on function private.strip_signup_captcha_token() from public;

drop trigger if exists auth_users_strip_captcha_token on auth.users;
create trigger auth_users_strip_captcha_token
before insert or update of raw_user_meta_data on auth.users
for each row execute function private.strip_signup_captcha_token();

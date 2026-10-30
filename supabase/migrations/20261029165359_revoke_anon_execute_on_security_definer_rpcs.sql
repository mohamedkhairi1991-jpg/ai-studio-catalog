-- Defense in depth: every SECURITY DEFINER RPC in public already rejects
-- unauthenticated callers internally; this removes anon EXECUTE entirely.
do $$
declare f record;
begin
  for f in
    select p.oid::regprocedure as sig
    from pg_proc p
    where p.pronamespace = 'public'::regnamespace and p.prosecdef
  loop
    execute format('revoke execute on function %s from anon, public', f.sig);
    execute format('grant execute on function %s to authenticated, service_role', f.sig);
  end loop;
end $$;

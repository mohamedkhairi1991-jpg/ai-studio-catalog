begin;

select plan(4);

-- App requests run with pg-safeupdate: a DELETE needs a WHERE clause.
select ok(
  pg_get_functiondef('private.refresh_catalog_search_cache()'::regprocedure) ~* 'delete from private\.catalog_search_cache\s+where true',
  'the search cache refresh deletes with a WHERE clause (pg-safeupdate)'
);

select is(
  (select count(*)::int
   from pg_trigger as tg
   where tg.tgname like '%\_refresh\_search\_cache\_at\_commit'
     and tg.tgdeferrable and tg.tginitdeferred
     and tg.tgfoid = 'private.refresh_catalog_search_cache_at_commit()'::regprocedure),
  9,
  'the search cache is rebuilt at commit, from all nine catalog tables'
);

-- A function-level SET clause would undo the once-per-transaction marker.
select ok(
  (select proconfig is null from pg_proc
   where oid = 'private.refresh_catalog_search_cache_at_commit()'::regprocedure),
  'the at-commit refresh keeps its once-per-transaction marker'
);

select lives_ok(
  $$ select private.refresh_catalog_search_cache() $$,
  'the search cache can be rebuilt'
);

select * from finish();
rollback;

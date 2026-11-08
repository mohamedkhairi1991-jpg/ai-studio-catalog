-- Stored, normalized search text (lower case, no accents, single spaces) so the
-- catalog search does not recompute it for every product on every keystroke.
-- Generated columns: always in step with the source text; nothing to maintain.

alter table public.product_translations
  add column if not exists search_text text
  generated always as (private.normalize_english_text(brand_name)) stored;

alter table public.generic_drug_translations
  add column if not exists search_text text
  generated always as (private.normalize_english_text(name)) stored;

alter table public.drug_class_translations
  add column if not exists search_text text
  generated always as (private.normalize_english_text(name)) stored;

alter table public.companies
  add column if not exists search_text text
  generated always as (private.normalize_english_text(company_name)) stored;

alter table public.product_markets
  add column if not exists search_text text
  generated always as (private.normalize_english_text(strength)) stored;

comment on column public.product_translations.search_text is 'Normalized brand name for search (generated).';
comment on column public.generic_drug_translations.search_text is 'Normalized generic name for search (generated).';
comment on column public.drug_class_translations.search_text is 'Normalized class name for search (generated).';
comment on column public.companies.search_text is 'Normalized company name for search (generated).';
comment on column public.product_markets.search_text is 'Normalized strength for search (generated).';

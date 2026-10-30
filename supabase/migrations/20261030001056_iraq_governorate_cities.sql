-- Seed the centre city of each of Iraq's 19 governorates.
-- Names are English, matching countries.name ('Iraq').
insert into public.cities (country_id, name, is_active)
select country.id, city.name, true
from public.countries as country
cross join (values
  ('Baghdad'), ('Basra'), ('Mosul'), ('Erbil'), ('Sulaymaniyah'),
  ('Duhok'), ('Kirkuk'), ('Ramadi'), ('Baqubah'), ('Hillah'),
  ('Karbala'), ('Najaf'), ('Diwaniyah'), ('Kut'), ('Amarah'),
  ('Nasiriyah'), ('Samawah'), ('Tikrit'), ('Halabja')
) as city(name)
where country.iso_code = 'IQ'
on conflict (country_id, lower(name)) do nothing;

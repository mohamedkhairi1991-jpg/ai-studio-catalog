# pharmaconnect
Pharmaceutical engagement platform for healthcare professionals and pharmaceutical companies.

## Web app (React)

The web client in `src/` uses real Supabase authentication by default. Roles and approval status come only from the database (read under Row Level Security); the browser never decides who is an admin.

```
npm ci
npm run dev
```

Environment variables (see `.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (public anon/publishable key only, never a service-role key), and `VITE_DEMO_MODE` (default `false`).

`VITE_DEMO_MODE=true` runs the offline demo prototype with fake data and no real authentication. It shows a permanent DEMO banner and must never be deployed publicly.

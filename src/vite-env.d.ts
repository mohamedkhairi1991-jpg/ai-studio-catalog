/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_DEMO_MODE?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_CAPTCHA_DISABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

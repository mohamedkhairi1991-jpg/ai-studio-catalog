import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Only the public project URL and the public anon/publishable key may be used
// in the browser. Never place a service-role key in this project.
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getOfflineCatalog, isOffline, syncOfflineCatalog } from './offlineCatalog';

export interface OfflineCatalogStatus {
  /** The phone has a connection. */
  online: boolean;
  /** Drugs saved on this phone (0 = nothing saved yet). */
  savedCount: number;
  /** When the saved catalog was last downloaded or updated (ISO), if any. */
  savedAt: string | null;
}

/**
 * Keeps the offline catalog up to date for the doctor screen: checks a few
 * seconds after opening (not to slow the first screen) and again whenever the
 * connection comes back.
 */
export function useOfflineCatalog(client: SupabaseClient): OfflineCatalogStatus {
  const [status, setStatus] = useState<OfflineCatalogStatus>({ online: !isOffline(), savedCount: 0, savedAt: null });

  useEffect(() => {
    let active = true;
    const refreshInfo = async () => {
      const saved = await getOfflineCatalog();
      if (!active) return;
      setStatus({ online: !isOffline(), savedCount: saved?.products.length ?? 0, savedAt: saved?.generatedAt ?? null });
    };
    const sync = () => {
      void syncOfflineCatalog(client)
        .catch(() => 'error' as const)
        .then(refreshInfo);
    };
    void refreshInfo();
    const timer = window.setTimeout(sync, 4000);
    const onOnline = () => {
      void refreshInfo();
      sync();
    };
    const onOffline = () => void refreshInfo();
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      active = false;
      window.clearTimeout(timer);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [client]);

  return status;
}

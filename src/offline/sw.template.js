/* Pharmaty service worker: lets the app open with no internet.
 * Built by vite.config.ts (offlineServiceWorker), which fills in the version
 * and the file list at build time. Never caches Supabase or other sites' data:
 * the offline catalog lives in IndexedDB (src/lib/offlineCatalog.ts). */
const VERSION = __VERSION__;
const PRECACHE = __PRECACHE__;
const APP_CACHE = `pharmaty-app-${VERSION}`;
const RUNTIME_CACHE = 'pharmaty-runtime-v1';
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

const scopeUrl = (path) => new URL(path, self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(PRECACHE.map(scopeUrl)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('pharmaty-app-') && key !== APP_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function networkFirstPage(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(APP_CACHE);
      await cache.put(scopeUrl('index.html'), response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(scopeUrl('index.html'));
    return cached || Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === 'opaque') {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }
  // Only this site's own files; Supabase, Cloudflare etc. go straight to the network.
  if (url.origin !== self.location.origin || !request.url.startsWith(self.registration.scope)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPage(request));
    return;
  }
  event.respondWith(cacheFirst(request, APP_CACHE));
});

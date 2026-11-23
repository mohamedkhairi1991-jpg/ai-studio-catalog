import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Files copied from public/ that the app needs offline.
const PUBLIC_PRECACHE = [
  'manifest.webmanifest',
  'favicon-48.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
];
// Big screens most doctors never open: cached only if someone uses them.
const SKIP_PRECACHE = /^assets\/(App|AdminCatalogReview|CompanyCatalog|chatCatalogData)-/;

/** Writes sw.js (see src/offline/sw.template.js) with the list of built files. */
function offlineServiceWorker(): Plugin {
  return {
    name: 'pharmaty-offline-service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      const files = Object.keys(bundle)
        .filter((name) => !name.endsWith('.map') && !SKIP_PRECACHE.test(name))
        .sort();
      const precache = ['./', 'index.html', ...PUBLIC_PRECACHE, ...files.filter((f) => f !== 'index.html')];
      const version = createHash('sha256').update(precache.join('\n')).digest('hex').slice(0, 12);
      const template = readFileSync(new URL('./src/offline/sw.template.js', import.meta.url), 'utf8');
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: template
          .replace('__VERSION__', JSON.stringify(version))
          .replace('__PRECACHE__', JSON.stringify(precache)),
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), offlineServiceWorker()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
});

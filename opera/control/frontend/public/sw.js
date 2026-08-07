// OPERA Control — Service Worker (mínimo, seguro)
// Estratégias:
//  - navegações HTML: NetworkFirst (fallback para app shell offline)
//  - assets estáticos same-origin: StaleWhileRevalidate
//  - API Supabase / auth: NUNCA interceptar
//  - /~oauth: NUNCA interceptar (respeita orientação do host)

const VERSION = 'opera-v1';
const APP_SHELL = 'opera-shell-' + VERSION;
const ASSETS = 'opera-assets-' + VERSION;

const OFFLINE_URLS = ['/', '/dashboard', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL).then((c) => c.addAll(OFFLINE_URLS).catch(() => {})),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

function isBypass(url) {
  return (
    url.pathname.startsWith('/~oauth') ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('supabase.in') ||
    url.pathname.startsWith('/_serverFn') ||
    url.pathname.startsWith('/api/')
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (isBypass(url)) return;

  // Navegação HTML
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(APP_SHELL).then((c) => c.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() =>
          caches.match(req).then(
            (r) => r || caches.match('/dashboard') || caches.match('/'),
          ),
        ),
    );
    return;
  }

  // Assets same-origin (JS/CSS/imagens)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetching = fetch(req)
          .then((resp) => {
            if (resp.ok) {
              const copy = resp.clone();
              caches.open(ASSETS).then((c) => c.put(req, copy)).catch(() => {});
            }
            return resp;
          })
          .catch(() => cached);
        return cached || fetching;
      }),
    );
  }
});

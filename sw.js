// Service Worker for 收纳整理师 - 货柜消除 3D
const CACHE_VERSION = 'v1.7.8';
const CACHE_NAME = `organizer-pwa-${CACHE_VERSION}`;
const ASSET_VERSION = CACHE_VERSION.slice(1);

// Core assets required for offline gameplay
const PRECACHE_ASSETS = [
  './',
  './index.html',
  `./style.css?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
  `./manifest.json?v=${ASSET_VERSION}`,
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-192-maskable.png',
  './assets/icons/icon-512-maskable.png',
  './assets/icons/apple-touch-icon.png',
  `./assets/ui/logo.svg?v=${ASSET_VERSION}`,
  `./assets/ui/btn_hammer.svg?v=${ASSET_VERSION}`,
  `./assets/ui/btn_wand.svg?v=${ASSET_VERSION}`,
  `./assets/ui/btn_freeze.svg?v=${ASSET_VERSION}`,
  `./assets/ui/btn_shuffle.svg?v=${ASSET_VERSION}`,
  `./assets/ui/btn_pause.svg?v=${ASSET_VERSION}`,
  `./assets/ui/cabinet_empty.svg?v=${ASSET_VERSION}`,
  `./assets/ui/shelf_plank.svg?v=${ASSET_VERSION}`,
  './assets/items/items_data.json'
];

// Install: precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[SW ${CACHE_VERSION}] Precaching core offline assets...`);
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name.startsWith('organizer-pwa-') && name !== CACHE_NAME) {
            console.log(`[SW] Removing obsolete cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: Stale-While-Revalidate with Cache-First for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests and http/https scheme
  if (req.method !== 'GET' || !req.url.startsWith('http')) {
    return;
  }

  // Handle navigation requests (e.g. user opens the app or reloads)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // Assets (images, scripts, styles): Cache-first with background revalidation & dynamic caching
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Optional background refresh for updated assets
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
        }).catch(() => {/* Offline fallback silently uses cachedResponse */});

        return cachedResponse;
      }

      // If not in cache, fetch from network and store in dynamic cache
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });

        return networkResponse;
      }).catch((err) => {
        console.warn(`[SW] Fetch failed for: ${req.url}`, err);
        return new Response('Network error occurred', {
          status: 408,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});

// Small offline shell; item photos are cached separately by content revision.
const CACHE_VERSION = 'v1.11.1';
const CACHE_NAME = `organizer-pwa-${CACHE_VERSION}`;
const ITEM_CACHE_NAME = 'organizer-items-v1';
const ASSET_VERSION = CACHE_VERSION.slice(1);
const CATALOG_URL = `./assets/items/items_data.json?v=${ASSET_VERSION}`;
const PRECACHE_ASSETS = [
  './index.html', `./style.css?v=${ASSET_VERSION}`, `./app.js?v=${ASSET_VERSION}`,
  `./manifest.json?v=${ASSET_VERSION}`, CATALOG_URL,
  // Android launchers and installation need both normal and adaptive PNG icons.
  ...['icon-192.png', 'icon-512.png', 'icon-192-maskable.png', 'icon-512-maskable.png', 'apple-touch-icon.png']
    .map(name => `./assets/icons/${name}?v=${ASSET_VERSION}`),
  `./assets/ui/logo.svg?v=${ASSET_VERSION}`, `./assets/ui/cat_avatar.webp?v=${ASSET_VERSION}`,
  `./assets/ui/toolbar_wood.webp?v=${ASSET_VERSION}`,
  ...['hammer', 'wand', 'freeze', 'shuffle', 'pause'].map(name => `./assets/ui/btn_${name}.svg?v=${ASSET_VERSION}`),
  `./assets/ui/cabinet_wood.webp?v=${ASSET_VERSION}`, `./assets/ui/shelf_wood.png?v=${ASSET_VERSION}`
];
const pending = new Map();
const openedCaches = new Map();
const scope = new URL(self.registration.scope);
const absolute = url => new URL(url, scope).href;
const itemPhoto = url => new URL(url).pathname.startsWith(`${scope.pathname}assets/items/photos/`);

function openCache(name) {
  if (!openedCaches.has(name)) {
    const opening = caches.open(name).catch(error => {
      openedCaches.delete(name);
      throw error;
    });
    openedCaches.set(name, opening);
  }
  return openedCaches.get(name);
}

// Browser storage can be disabled, evicted or full. It must never gate a download.
async function readCache(name, url) {
  try { return await (await openCache(name)).match(url); } catch (_) { return undefined; }
}

async function storeCache(name, url, response) {
  try { await (await openCache(name)).put(url, response); } catch (_) { /* Network response remains usable. */ }
}

async function cachedAsset(request, event, options) {
  const url = new URL(typeof request === 'string' ? absolute(request) : request.url);
  const retry = url.searchParams.has('_image_retry');
  url.searchParams.delete('_image_retry');
  const key = url.href;
  const name = itemPhoto(key) ? ITEM_CACHE_NAME : CACHE_NAME;
  const cached = retry ? undefined : await readCache(name, key);
  if (cached) return cached;
  // A recovery request must not share the previous failed or stalled download.
  const pendingKey = retry ? `${key}:retry` : key;
  let task = pending.get(pendingKey);
  if (!task) {
    const response = fetch(request, retry ? { ...options, cache: 'reload' } : options);
    const complete = response.then(res => res.ok ? storeCache(name, key, res.clone()) : undefined);
    task = { response, complete };
    pending.set(pendingKey, task);
    complete.catch(() => {}).finally(() => {
      if (pending.get(pendingKey) === task) pending.delete(pendingKey);
    });
  }
  event.waitUntil(task.complete.catch(() => {}));
  return (await task.response).clone();
}

async function cacheBatch(urls, event, concurrency) {
  let next = 0;
  let ready = true;
  const cache = await openCache(ITEM_CACHE_NAME);
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      try {
        if (await cache.match(url)) continue;
        const response = await cachedAsset(url, event, { priority: 'low' });
        const complete = pending.get(url)?.complete;
        await response.arrayBuffer();
        await complete;
        if (!response.ok || !await cache.match(url)) ready = false;
      } catch (_) { ready = false; /* Resume missing images on a later online visit. */ }
    }
  }));
  return ready;
}

self.addEventListener('install', event => {
  event.waitUntil(openCache(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(name =>
    name.startsWith('organizer-pwa-') && name !== CACHE_NAME
  ).map(name => caches.delete(name)))).then(() => self.clients.claim()));
});

self.addEventListener('message', event => {
  const type = event.data?.type;
  if (type !== 'CACHE_LEVEL' && type !== 'CACHE_LIBRARY') return;
  event.waitUntil((async () => {
    const cache = await openCache(CACHE_NAME);
    const response = await cache.match(absolute(CATALOG_URL));
    if (!response) return;
    const catalog = await response.json();
    const allowed = new Set(Object.values(catalog).map(item => absolute(`${item.img}?v=${item.revision || ASSET_VERSION}`)));
    const urls = type === 'CACHE_LIBRARY' ? [...allowed] : [...new Set(event.data.urls || [])].map(absolute).filter(url => allowed.has(url));
    const photos = await openCache(ITEM_CACHE_NAME);
    const completeURL = absolute(`./assets/items/library-ready?v=${ASSET_VERSION}`);
    // A ready marker can outlive individual entries after browser storage eviction.
    // Always check the catalog; cacheBatch only downloads missing photos.
    const ready = await cacheBatch(urls, event, type === 'CACHE_LIBRARY' ? 2 : 3);
    if (type === 'CACHE_LIBRARY' && ready) await photos.put(completeURL, new Response('ready'));
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== scope.origin) return;
  if (request.mode === 'navigate') {
    const network = fetch(request).then(async response => {
      if (response.ok) {
        await storeCache(CACHE_NAME, absolute('./index.html'), response.clone());
      }
      return response;
    });
    event.waitUntil(network.catch(() => {}));
    event.respondWith((async () => {
      const fallback = await readCache(CACHE_NAME, absolute('./index.html'));
      if (!fallback) return network;
      let timeout;
      try {
        return await Promise.race([
          network.catch(() => fallback),
          new Promise(resolve => { timeout = setTimeout(() => resolve(fallback), 800); })
        ]);
      } finally { clearTimeout(timeout); }
    })());
    return;
  }
  event.respondWith(cachedAsset(request, event).catch(() => new Response('Offline resource unavailable', { status: 503 })));
});

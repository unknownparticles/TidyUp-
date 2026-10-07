// Small offline shell; item photos are cached separately by content revision.
const CACHE_VERSION = 'v1.11.0';
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
  if (!openedCaches.has(name)) openedCaches.set(name, caches.open(name));
  return openedCaches.get(name);
}

async function cachedAsset(request, event, options) {
  const url = typeof request === 'string' ? absolute(request) : request.url;
  const cache = await openCache(itemPhoto(url) ? ITEM_CACHE_NAME : CACHE_NAME);
  const cached = await cache.match(url);
  // A content revision or release version makes this URL immutable.
  if (cached) return cached;
  let task = pending.get(url);
  if (!task) {
    const response = fetch(request, options);
    const complete = response.then(res => res.ok ? cache.put(url, res.clone()) : undefined);
    task = { response, complete };
    pending.set(url, task);
    complete.catch(() => {}).finally(() => {
      if (pending.get(url) === task) pending.delete(url);
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
    if (type === 'CACHE_LIBRARY' && await photos.match(completeURL)) return;
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
        const cache = await openCache(CACHE_NAME);
        await cache.put(absolute('./index.html'), response.clone());
      }
      return response;
    });
    event.waitUntil(network.catch(() => {}));
    event.respondWith((async () => {
      const cache = await openCache(CACHE_NAME);
      const fallback = await cache.match(absolute('./index.html'));
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

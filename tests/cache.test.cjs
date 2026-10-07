const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture(fetcher = async () => new Response('image bytes')) {
  const scope = 'https://example.test/TidyUp-/';
  const maps = new Map();
  const listeners = {};
  const requests = [];
  const added = [];
  const waits = [];
  const key = input => new URL(typeof input === 'string' ? input : input.url, scope).href;
  const caches = {
    open: async name => {
      if (!maps.has(name)) maps.set(name, new Map());
      const map = maps.get(name);
      return {
        match: async input => map.get(key(input))?.clone(),
        put: async (input, response) => { map.set(key(input), new Response(await response.arrayBuffer(), { status: response.status })); },
        addAll: async inputs => { added.push(...inputs); }
      };
    },
    keys: async () => [...maps.keys()],
    delete: async name => maps.delete(name)
  };
  const source = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  vm.runInNewContext(source, {
    self: { registration: { scope }, addEventListener: (name, callback) => { listeners[name] = callback; }, skipWaiting: async () => {}, clients: { claim: async () => {} } },
    caches, URL, Response, setTimeout, clearTimeout,
    fetch: async (input, options) => { requests.push(key(input)); return fetcher(input, options); }
  });
  async function dispatch(name, fields = {}) {
    let response;
    listeners[name]({ ...fields, waitUntil: p => waits.push(p), respondWith: p => { response = p; } });
    const result = await response;
    let done = 0;
    while (done < waits.length) { const pending = waits.slice(done); done = waits.length; await Promise.all(pending); }
    return result;
  }
  return { maps, requests, added, caches, dispatch, scope };
}

test('installation caches the small shell and does not download the full item library', async () => {
  const f = fixture();
  await f.dispatch('install');
  assert.ok(f.added.length < 20);
  assert.ok(!f.added.some(url => url.includes('/photos/')));
  assert.equal(f.requests.length, 0);
});

test('cached image is read locally without a revalidation network request', async () => {
  const f = fixture();
  const url = f.scope + 'assets/items/photos/item_810.webp?v=abcdef123456';
  const cache = await f.caches.open('organizer-items-v1');
  await cache.put(url, new Response('cached pixels'));
  const response = await f.dispatch('fetch', { request: { url, method: 'GET' } });
  assert.equal(await response.text(), 'cached pixels');
  assert.equal(f.requests.length, 0);
});

test('concurrent requests for an uncached image share one read and keep independent response bodies', async () => {
  let finish;
  const f = fixture(() => new Promise(resolve => { finish = () => resolve(new Response('shared image')); }));
  const request = { url: f.scope + 'assets/items/photos/item_810.webp?v=abcdef123456', method: 'GET' };
  const first = f.dispatch('fetch', { request });
  const second = f.dispatch('fetch', { request });
  while (!finish) await new Promise(resolve => setImmediate(resolve));
  finish();
  const responses = await Promise.all([first, second]);
  assert.deepEqual(await Promise.all(responses.map(response => response.text())), ['shared image', 'shared image']);
  assert.equal(f.requests.length, 1);
});

test('shell upgrade preserves photos cached by content revision', async () => {
  const f = fixture();
  await f.caches.open('organizer-pwa-v0.0.1');
  const itemCache = await f.caches.open('organizer-items-v1');
  await itemCache.put(f.scope + 'assets/items/photos/item_810.webp?v=abcdef123456', new Response('pixels'));
  await f.dispatch('activate');
  assert.ok(!f.maps.has('organizer-pwa-v0.0.1'));
  assert.ok(f.maps.has('organizer-items-v1'));
});

test('offline navigation uses the cached index within a deployment subdirectory', async () => {
  const f = fixture(async () => { throw new Error('offline'); });
  const shell = await f.caches.open(`organizer-pwa-v${require('../package.json').version}`);
  await shell.put(f.scope + 'index.html', new Response('<html>offline game</html>'));
  const response = await f.dispatch('fetch', { request: { url: f.scope, method: 'GET', mode: 'navigate' } });
  assert.equal(await response.text(), '<html>offline game</html>');
});

test('current level caching only accepts URLs from its revisioned catalog', async () => {
  const f = fixture();
  const version = require('../package.json').version;
  const shell = await f.caches.open(`organizer-pwa-v${version}`);
  await shell.put(f.scope + `assets/items/items_data.json?v=${version}`, new Response(JSON.stringify({ a: { img: './assets/items/photos/item_810.webp', revision: 'abcdef123456' } })));
  const allowed = f.scope + 'assets/items/photos/item_810.webp?v=abcdef123456';
  await f.dispatch('message', { data: { type: 'CACHE_LEVEL', urls: [allowed, allowed, 'https://other.test/item.webp', allowed.replace('abcdef123456', 'old-version')] } });
  assert.deepEqual(f.requests, [allowed]);
});

test('library warming uses two requests at a time and skips an already completed library', async () => {
  let active = 0, maximum = 0;
  const f = fixture(async () => {
    maximum = Math.max(maximum, ++active);
    await new Promise(resolve => setImmediate(resolve));
    active--;
    return new Response('pixels');
  });
  const version = require('../package.json').version;
  const shell = await f.caches.open(`organizer-pwa-v${version}`);
  const catalog = Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`item_${i}`, { img: `./assets/items/photos/item_${i}.webp`, revision: 'abcdef123456' }]));
  await shell.put(f.scope + `assets/items/items_data.json?v=${version}`, new Response(JSON.stringify(catalog)));
  await f.dispatch('message', { data: { type: 'CACHE_LIBRARY' } });
  assert.equal(maximum, 2);
  assert.equal(f.requests.length, 5);
  await f.dispatch('message', { data: { type: 'CACHE_LIBRARY' } });
  assert.equal(f.requests.length, 5);
  const photos = await f.caches.open('organizer-items-v1');
  assert.ok(await photos.match(f.scope + `assets/items/library-ready?v=${version}`));
});

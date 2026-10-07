const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const { createGameServer, acceptedEncoding } = require('../server.js');

async function fixture(t, options = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'zls-http-'));
  await fs.writeFile(path.join(root, 'app.js'), 'const message = "resource caching";\n'.repeat(200));
  let reads = 0;
  const server = createGameServer({ root, ...options, readFile: async file => { reads++; return fs.readFile(file); } });
  t.after(async () => { server.close(); await fs.rm(root, { recursive: true, force: true }); });
  function request(url = '/app.js', headers = {}, method = 'GET') {
    return new Promise(resolve => {
      let status, resultHeaders;
      server.emit('request', { url, headers, method }, {
        writeHead: (code, values) => { status = code; resultHeaders = values; },
        end: body => resolve({ status, headers: resultHeaders, body })
      });
    });
  }
  return { root, request, reads: () => reads };
}

test('Brotli and gzip preserve bytes, respect q=0 and identify the representation', async t => {
  const f = await fixture(t);
  const plain = await f.request();
  for (const [header, encoding, decode] of [
    ['gzip, br', 'br', zlib.brotliDecompressSync],
    ['gzip, br;q=0', 'gzip', zlib.gunzipSync]
  ]) {
    const response = await f.request('/app.js', { 'accept-encoding': header });
    assert.equal(response.headers['Content-Encoding'], encoding);
    assert.deepEqual(decode(response.body), plain.body);
    assert.ok(response.body.length < plain.body.length / 4);
    assert.notEqual(response.headers.ETag, plain.headers.ETag);
  }
  assert.equal(acceptedEncoding('br;q=0, gzip;q=0'), 'identity');
  assert.equal(f.reads(), 1);
});

test('parallel requests read once; conditional GET and HEAD omit the body', async t => {
  const f = await fixture(t);
  const responses = await Promise.all(Array.from({ length: 8 }, () => f.request()));
  assert.equal(f.reads(), 1);
  const cached = await f.request('/app.js', { 'if-none-match': responses[0].headers.ETag });
  assert.equal(cached.status, 304);
  assert.equal(cached.body, undefined);
  const head = await f.request('/app.js', {}, 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(head.body, undefined);
  assert.equal(head.headers['Content-Length'], responses[0].body.length);
});

test('a changed file invalidates its in-memory bytes and ETag', async t => {
  const f = await fixture(t);
  const old = await f.request();
  await fs.writeFile(path.join(f.root, 'app.js'), 'new resource');
  const fresh = await f.request('/app.js', { 'if-none-match': old.headers.ETag });
  assert.equal(fresh.status, 200);
  assert.equal(fresh.body.toString(), 'new resource');
  assert.notEqual(fresh.headers.ETag, old.headers.ETag);
  assert.equal(f.reads(), 2);
});

test('bounded cache evicts old bytes instead of retaining the entire resource set', async t => {
  const f = await fixture(t, { maxCacheBytes: 1 });
  await f.request();
  await f.request();
  assert.equal(f.reads(), 2);
});

test('versioned resources are immutable; source-only files and invalid paths are unavailable', async t => {
  const f = await fixture(t);
  const version = require('../package.json').version;
  const versioned = await f.request(`/app.js?v=${version}`);
  assert.match(versioned.headers['Cache-Control'], /immutable/);
  assert.equal((await f.request()).headers['Cache-Control'], 'no-cache');
  for (const url of ['/package.json', '/assets/%2e%2e/%2e%2e/server.js']) assert.equal((await f.request(url)).status, 404);
  assert.equal((await f.request('/%zz')).status, 400);
  assert.equal((await f.request('/app.js', {}, 'POST')).status, 405);
});

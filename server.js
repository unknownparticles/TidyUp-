const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const { promisify } = require('node:util');

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};
const ROOT_FILES = new Set(['index.html', 'app.js', 'style.css', 'sw.js', 'manifest.json']);

function acceptedEncoding(header = '') {
  const qualities = new Map(header.toLowerCase().split(',').map(value => {
    const [name, ...parameters] = value.trim().split(';');
    const q = parameters.find(p => p.trim().startsWith('q='));
    return [name, q ? Number(q.trim().slice(2)) : 1];
  }));
  const quality = name => qualities.get(name) ?? qualities.get('*') ?? 0;
  if (quality('br') > 0 && quality('br') >= quality('gzip')) return 'br';
  if (quality('gzip') > 0) return 'gzip';
  return 'identity';
}

function createGameServer({ root = __dirname, readFile = fs.promises.readFile, maxCacheBytes = 8 * 1024 * 1024 } = {}) {
  const cache = new Map();
  const pending = new Map();
  let cacheBytes = 0;

  async function readAsset(file) {
    const stat = await fs.promises.stat(file);
    if (!stat.isFile()) throw new Error('Not a file');
    const stamp = `${stat.mtimeMs}:${stat.size}`;
    const cached = cache.get(file);
    if (cached?.stamp === stamp) {
      cache.delete(file);
      cache.set(file, cached);
      return cached;
    }
    const key = `${file}:${stamp}`;
    if (pending.has(key)) return pending.get(key);
    const task = (async () => {
      const body = await readFile(file);
      const hash = crypto.createHash('sha256').update(body).digest('hex');
      const compressible = /\.(?:html|css|js|json|webmanifest|svg)$/.test(file) && body.length > 256;
      const entry = { stamp, hash, body, variants: { identity: body }, bytes: body.length };
      if (compressible) {
        const [br, gz] = await Promise.all([
          brotli(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }),
          gzip(body, { level: 6 })
        ]);
        if (br.length < body.length) entry.variants.br = br;
        if (gz.length < body.length) entry.variants.gzip = gz;
        entry.bytes = Object.values(entry.variants).reduce((sum, data) => sum + data.length, 0);
      }
      const previous = cache.get(file);
      if (previous) cacheBytes -= previous.bytes;
      cache.set(file, entry);
      cacheBytes += entry.bytes;
      while (cacheBytes > maxCacheBytes && cache.size) {
        const oldest = cache.keys().next().value;
        cacheBytes -= cache.get(oldest).bytes;
        cache.delete(oldest);
      }
      return entry;
    })();
    pending.set(key, task);
    try { return await task; } finally { pending.delete(key); }
  }

  return http.createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end();
      return;
    }
    try {
      const url = new URL(req.url, 'http://localhost');
      const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
      const file = path.resolve(root, relative);
      if (!file.startsWith(path.resolve(root) + path.sep)
          || (!ROOT_FILES.has(relative) && !relative.startsWith('assets/'))) throw new Error('Invalid path');
      const entry = await readAsset(file);
      const requestedEncoding = acceptedEncoding(req.headers['accept-encoding']);
      const encoding = entry.variants[requestedEncoding] ? requestedEncoding : 'identity';
      const body = entry.variants[encoding];
      const version = url.searchParams.get('v');
      const release = require('./package.json').version;
      const immutable = relative !== 'index.html' && relative !== 'sw.js'
        && version && (version === release || version === entry.hash.slice(0, 12));
      const etag = `"${entry.hash}-${encoding}"`;
      const headers = {
        'Content-Type': MIME_TYPES[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
        ETag: etag, Vary: 'Accept-Encoding'
      };
      if (encoding !== 'identity') headers['Content-Encoding'] = encoding;
      if (req.headers['if-none-match']?.split(',').map(v => v.trim().replace(/^W\//, '')).includes(etag)) {
        res.writeHead(304, headers);
        res.end();
        return;
      }
      headers['Content-Length'] = body.length;
      res.writeHead(200, headers);
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : 404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : 'Not Found');
    }
  });
}

if (require.main === module) {
  const previewRoot = process.argv.includes('--dist') ? path.join(__dirname, 'dist') : __dirname;
  createGameServer({ root: previewRoot }).listen(3000, '127.0.0.1', () => {
    console.log(`Organizer Game Server running at http://127.0.0.1:3000 (${path.basename(previewRoot)})`);
  });
}

module.exports = { createGameServer, acceptedEncoding };

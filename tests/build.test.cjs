const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const vm = require('node:vm');

test('production build keeps all revisioned items and hosting files, without legacy assets or dev tools', () => {
  const root = path.resolve(__dirname, '..');
  execFileSync(process.execPath, ['scripts/build.js'], { cwd: root });
  const dist = path.join(root, 'dist');
  const catalog = JSON.parse(fs.readFileSync(path.join(dist, 'assets/items/items_data.json')));
  const sourceCatalog = JSON.parse(fs.readFileSync(path.join(root, 'assets/items/items_data.json')));
  assert.deepEqual(Object.keys(catalog), Object.keys(sourceCatalog));
  for (const item of Object.values(catalog)) {
    const bytes = fs.readFileSync(path.join(dist, item.img));
    assert.equal(item.revision, crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12));
  }
  for (const file of ['.nojekyll', 'assets/ui/cat_avatar.webp', 'assets/ui/cabinet_wood.webp', 'assets/ui/toolbar_wood.webp']) assert.ok(fs.existsSync(path.join(dist, file)));
  const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'manifest.json')));
  const version = require('../package.json').version;
  for (const icon of manifest.icons) {
    const url = new URL(icon.src, 'https://example.test/TidyUp-/manifest.json');
    assert.equal(url.searchParams.get('v'), version);
    const bytes = fs.readFileSync(path.join(dist, url.pathname.replace('/TidyUp-/', '')));
    if (icon.type === 'image/png') {
      assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
      assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`, icon.sizes);
    }
  }
  for (const file of ['scripts', 'tests', 'node_modules', 'assets/items/blue_snowman.png', 'assets/ui/cabinet_empty.png']) assert.ok(!fs.existsSync(path.join(dist, file)));
  for (const file of ['app.js', 'style.css']) assert.ok(fs.statSync(path.join(dist, file)).size < fs.statSync(path.join(root, file)).size * 0.8);
  // Parse and execute the actual minified bundle without starting its game.
  vm.runInNewContext(fs.readFileSync(path.join(dist, 'app.js'), 'utf8'), { window: { addEventListener() {} } });
});

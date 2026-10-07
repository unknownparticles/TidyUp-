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
  assert.equal(Object.keys(catalog).length, 186);
  for (const item of Object.values(catalog)) {
    const bytes = fs.readFileSync(path.join(dist, item.img));
    assert.equal(item.revision, crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12));
  }
  for (const file of ['.nojekyll', 'assets/ui/cat_avatar.webp', 'assets/ui/cabinet_wood.webp', 'assets/ui/toolbar_wood.webp']) assert.ok(fs.existsSync(path.join(dist, file)));
  for (const file of ['scripts', 'tests', 'node_modules', 'assets/items/blue_snowman.png', 'assets/ui/cabinet_empty.png']) assert.ok(!fs.existsSync(path.join(dist, file)));
  for (const file of ['app.js', 'style.css']) assert.ok(fs.statSync(path.join(dist, file)).size < fs.statSync(path.join(root, file)).size * 0.8);
  // Parse and execute the actual minified bundle without starting its game.
  vm.runInNewContext(fs.readFileSync(path.join(dist, 'app.js'), 'utf8'), { window: { addEventListener() {} } });
});

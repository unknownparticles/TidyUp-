const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { transform } = require('esbuild');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

async function build() {
  const catalog = JSON.parse(await fs.readFile(path.join(root, 'assets/items/items_data.json'), 'utf8'));
  await Promise.all(Object.values(catalog).map(async item => {
    const bytes = await fs.readFile(path.join(root, item.img.replace(/^\.\//, '')));
    item.revision = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  }));
  const core = ['index.html', 'app.js', 'style.css', 'sw.js', 'manifest.json', 'assets/items/items_data.json'];
  const sources = await Promise.all(core.map(file => fs.readFile(path.join(root, file), 'utf8')));
  sources[core.indexOf('assets/items/items_data.json')] = JSON.stringify(catalog);
  sources[core.indexOf('app.js')] = sources[core.indexOf('app.js')].replace(
    /(\bconst ITEMS = )\{[\s\S]*?\n  \};/, (_, prefix) => prefix + JSON.stringify(catalog) + ';'
  );
  const assets = new Set(Object.values(catalog).map(item => item.img.replace(/^\.\//, '')));
  for (const file of ['.nojekyll', 'CNAME']) {
    try { await fs.access(path.join(root, file)); assets.add(file); } catch (_) { /* Optional hosting metadata. */ }
  }
  // Only resources referenced by the actual page, stylesheet, manifest and worker ship.
  for (const source of sources) {
    for (const match of source.matchAll(/(?:\.\/)?(assets\/[\w/.-]+\.(?:svg|png|webp|jpg|ico))/g)) assets.add(match[1]);
  }
  for (const name of ['hammer', 'wand', 'freeze', 'shuffle', 'pause']) assets.add(`assets/ui/btn_${name}.svg`);
  const rendered = await Promise.all(core.map(async (file, index) => {
    let content = sources[index];
    if (file.endsWith('.js') || file.endsWith('.css')) {
      content = (await transform(content, { loader: file.endsWith('.js') ? 'js' : 'css', minify: true, target: 'es2020', charset: 'utf8' })).code;
    } else if (file.endsWith('.json')) content = JSON.stringify(JSON.parse(content));
    else content = content.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s+/gm, '').replace(/\n{2,}/g, '\n');
    return [file, content];
  }));
  // Validate references before replacing the previous successful build.
  await Promise.all([...assets].map(file => fs.access(path.join(root, file))));
  await fs.rm(output, { recursive: true, force: true });
  await Promise.all(rendered.map(async ([file, content]) => {
    const target = path.join(output, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }));
  await Promise.all([...assets].map(async file => {
    const target = path.join(output, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(path.join(root, file), target);
  }));
  const bytes = (await Promise.all([...core, ...assets].map(file => fs.stat(path.join(output, file))))).reduce((sum, stat) => sum + stat.size, 0);
  console.log(`Production build: ${core.length + assets.size} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB`);
}

build().catch(error => { console.error(error); process.exitCode = 1; });

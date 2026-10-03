#!/usr/bin/env node
/**
 * Build SVG image assets directly from the original PNG references.
 * The SVGs embed cleaned PNGs to retain their original clay texture and detail;
 * they are self-contained image assets, not newly drawn vector illustrations.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ITEMS_TO_GENERATE = require('./item_catalog.json');

const rootDir = path.resolve(__dirname, '..');
const itemsDir = path.join(rootDir, 'assets', 'items');

function loadReferenceAssets(items) {
  const specs = {};
  for (const item of items) {
    const source = path.join(itemsDir, item.reference);
    if (!fs.existsSync(source)) throw new Error(`Missing reference for ${item.id}: ${source}`);
    specs[item.id] = { source, hueMap: item.hueMap };
  }
  const result = spawnSync('python3', [path.join(__dirname, 'prepare_reference_assets.py')], {
    input: JSON.stringify(specs),
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    throw new Error(`Reference preparation failed. Install Pillow with scripts/requirements-assets.txt.\n${result.error?.message || result.stderr}`);
  }
  const assets = JSON.parse(result.stdout);
  for (const item of items) {
    const asset = assets[item.id];
    if (!asset?.data.startsWith('data:image/png;base64,') || !asset.width || !asset.height) {
      throw new Error(`Invalid prepared reference for ${item.id}`);
    }
  }
  return assets;
}

function renderReferenceSvg(item, asset) {
  const { width, height, data } = asset;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
  <title>${item.name}</title>
  <image href="${data}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
}

function generate() {
  // Prepare and validate the entire set before writing any generated files.
  const assets = loadReferenceAssets(ITEMS_TO_GENERATE);
  const catalog = {};
  for (const item of ITEMS_TO_GENERATE) {
    catalog[item.id] = {
      id: item.id,
      name: item.name,
      archetype: item.archetype,
      colorGroup: item.colorGroup,
      img: `./assets/items/${item.id}.svg`,
    };
  }
  for (const item of ITEMS_TO_GENERATE) {
    fs.writeFileSync(path.join(itemsDir, `${item.id}.svg`), renderReferenceSvg(item, assets[item.id]), 'utf8');
  }
  fs.writeFileSync(path.join(itemsDir, 'items_data.json'), JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(path.join(rootDir, 'src', 'items.js'), `// Reference-faithful SVG assets with embedded, cleaned PNG artwork.
export const ITEMS = ${JSON.stringify(catalog, null, 2)};

export const ITEM_KEYS = Object.keys(ITEMS);
`, 'utf8');
  console.log(`[SVG Generator] Generated ${ITEMS_TO_GENERATE.length} reference-faithful SVG assets with cleaned edges.`);
  return catalog;
}

if (require.main === module) generate();
module.exports = { ITEMS_TO_GENERATE, generate, renderReferenceSvg };

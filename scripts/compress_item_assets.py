#!/usr/bin/env python3
"""Compress the complete item library, retaining dimensions and lossless alpha."""
import io
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ITEMS_DIR = ROOT / 'assets/items'


def main():
    catalog_path = ITEMS_DIR / 'items_data.json'
    catalog = json.loads(catalog_path.read_text())
    before = sum((ROOT / item['img'][2:]).stat().st_size for item in catalog.values())
    originals = []
    for item in catalog.values():
        path = ROOT / item['img'][2:]
        if path.suffix == '.webp':
            continue
        with Image.open(path) as source:
            rgba = source.convert('RGBA')
            target = path.with_suffix('.webp')
            rgba.save(target, format='WEBP', quality=82, method=6, exact=True)
            with Image.open(target) as compressed:
                if compressed.size != rgba.size or compressed.convert('RGBA').getchannel('A').tobytes() != rgba.getchannel('A').tobytes():
                    raise ValueError(f'Dimensions or transparency changed: {target}')
        item['img'] = './' + target.relative_to(ROOT).as_posix()
        originals.append(path)

    serialized = json.dumps(catalog, ensure_ascii=False, indent=2)
    app_path = ROOT / 'app.js'
    app, count = re.subn(r'(  const ITEMS = )\{.*?\n  \};',
                        lambda m: m[1] + serialized.replace('\n', '\n  ') + ';',
                        app_path.read_text(), count=1, flags=re.S)
    if count != 1:
        raise ValueError('Standalone catalog not found')
    catalog_path.write_text(serialized + '\n')
    (ROOT / 'src/items.js').write_text('// Imported photo assets, fitted to a shared transparent canvas.\n'
                                     f'export const ITEMS = {serialized};\n\n'
                                     'export const ITEM_KEYS = Object.keys(ITEMS);\n')
    app_path.write_text(app)
    for original in originals:
        original.unlink()

    # Historical PNG references stay compatible with the optional SVG generator.
    for path in ITEMS_DIR.glob('*.png'):
        with Image.open(path) as source:
            buffer = io.BytesIO()
            source.save(buffer, format='PNG', optimize=True, compress_level=9)
        if buffer.tell() < path.stat().st_size:
            path.write_bytes(buffer.getvalue())

    after = sum((ROOT / item['img'][2:]).stat().st_size for item in catalog.values())
    print(f'{len(catalog)} items: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)')


if __name__ == '__main__':
    main()

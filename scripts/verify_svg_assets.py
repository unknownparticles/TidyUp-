#!/usr/bin/env python3
"""Regression checks for the damaged cutouts and accidental raster wrappers.

Requires Pillow and the rsvg-convert command for actual SVG rendering.
Run: python3 scripts/verify_svg_assets.py
"""
import io
import json
import subprocess
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ITEMS = ROOT / 'assets' / 'items'
NAMESPACE = '{http://www.w3.org/2000/svg}'


def render(item_id, scale=4):
    tree = ET.parse(ITEMS / f'{item_id}.svg')
    width, height = int(tree.getroot().get('width')), int(tree.getroot().get('height'))
    output = subprocess.check_output([
        'rsvg-convert', '-w', str(width * scale), '-h', str(height * scale),
        str(ITEMS / f'{item_id}.svg'),
    ])
    return Image.open(io.BytesIO(output)).convert('RGBA')


class VectorAssetRegressionTests(unittest.TestCase):
    def test_geometry_is_simple_and_materials_are_not_blurred(self):
        for item in json.loads((ROOT / 'scripts' / 'item_catalog.json').read_text()):
            with self.subTest(item=item['id']):
                root = ET.parse(ITEMS / (item['id'] + '.svg')).getroot()
                paths = root.findall('.//' + NAMESPACE + 'path')
                self.assertLess(len(paths), 100, 'Fragmented tracing regions returned')
                self.assertTrue(all(len(p.get('d', '')) < 700 for p in paths))
                primitives = [node for node in root.iter() if node.tag in {
                    NAMESPACE + 'circle', NAMESPACE + 'ellipse', NAMESPACE + 'rect'
                }]
                self.assertGreaterEqual(len(primitives), 2)
                self.assertTrue(root.findall('.//' + NAMESPACE + 'filter'))
                for blur in root.findall('.//' + NAMESPACE + 'feGaussianBlur'):
                    self.assertEqual(blur.get('in'), 'SourceAlpha', 'Material geometry must stay crisp')
                self.assertTrue(root.findall('.//' + NAMESPACE + 'radialGradient'))

    def test_cabinet_and_shelf_use_vector_surfaces(self):
        for name in ['cabinet_empty.svg', 'shelf_plank.svg']:
            with self.subTest(surface=name):
                root = ET.parse(ROOT / 'assets' / 'ui' / name).getroot()
                self.assertFalse(root.findall('.//' + NAMESPACE + 'image'))
                self.assertTrue(root.findall('.//' + NAMESPACE + 'rect'))
                self.assertTrue(root.findall('.//' + NAMESPACE + 'linearGradient'))

    def test_all_assets_are_vectors_and_render(self):
        catalog = json.loads((ROOT / 'scripts' / 'item_catalog.json').read_text())
        for item in catalog:
            with self.subTest(item=item['id']):
                path = ITEMS / (item['id'] + '.svg')
                text = path.read_text()
                tree = ET.fromstring(text)
                self.assertGreater(len(tree.findall('.//' + NAMESPACE + 'path')), 0)
                self.assertEqual(tree.findall('.//' + NAMESPACE + 'image'), [])
                self.assertNotIn('data:image/', text)
                self.assertNotIn('base64', text)
                image = render(item['id'], scale=1)
                self.assertIsNotNone(image.getbbox())
                self.assertEqual(image.getpixel((0, 0))[3], 0)

    def test_previously_missing_material_is_opaque(self):
        # Probe the actual missing cheeks/forehead/white cuff/carton/ear roots,
        # rather than testing whether a repair function was called.
        probes = {
            'blue_snowman': [(18, 66), (24, 69), (22, 73), (45, 116)],
            'panda_bear': [(48, 16), (76, 59), (82, 54), (50, 100)],
            'polka_stocking': [(32, 16), (40, 24)],
            'classic_milk': [(25, 18), (60, 25)],
            'pea_bunny': [(62, 45), (73, 58)],
        }
        for item_id, points in probes.items():
            image = render(item_id)
            for x, y in points:
                with self.subTest(item=item_id, point=(x, y)):
                    self.assertGreater(image.getpixel((x * 4, y * 4))[3], 245)
        snow = render('blue_snowman')
        self.assertGreater(min(snow.getpixel((24 * 4, 69 * 4))[:3]), 200)

    def test_coloured_silhouettes_have_no_white_matte_outline(self):
        for item_id in ['pink_gift_box', 'xmas_tree', 'lucky_clover', 'red_pouch']:
            image = render(item_id)
            alpha = image.getchannel('A')
            solid = alpha.point(lambda value: 255 if value > 200 else 0)
            inner = solid.filter(ImageFilter.MinFilter(3))
            count = white = 0
            for (r, g, b, a), inside, shrunk in zip(image.getdata(), solid.getdata(), inner.getdata()):
                if inside and not shrunk:
                    count += 1
                    if min(r, g, b) > 225 and max(r, g, b) - min(r, g, b) < 18:
                        white += 1
            with self.subTest(item=item_id):
                self.assertGreater(count, 0)
                self.assertLess(white / count, .01, 'White matte remains around the silhouette')


if __name__ == '__main__':
    unittest.main()

#!/usr/bin/env python3
"""Build complete SVG illustrations from authored geometric recipes.

All assets share the same canvas and fitting envelope. Shapes, details, colour regions and
shading are explicit vector geometry, so damaged alpha cannot remove material.
"""
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from geometric_models import make_model
from reference_models import panda, snowman


MODEL_BOUNDS = json.loads(Path(__file__).with_name('model_bounds.json').read_text())
CANVAS_WIDTH, CANVAS_HEIGHT = 100, 140


def crisp_materials(defs, content):
    """Remove translucent decorative shine and outline solid material edges."""
    gradients = ET.fromstring(f'<defs>{defs}</defs>')
    colours = {}
    for gradient in gradients:
        stops = gradient.findall('stop')
        if stops:
            colours[gradient.get('id')] = stops[-1].get('stop-color')
    wrapper = ET.fromstring(f'<g>{content}</g>')
    for parent in list(wrapper.iter()):
        for node in list(parent):
            # Small opaque eye reflections stay; semi-transparent gloss goes.
            if node.get('opacity') is not None and node.tag in {'path', 'rect', 'ellipse', 'circle'}:
                parent.remove(node)
                continue
            fill = node.get('fill', 'none')
            if node.tag not in {'path', 'rect', 'ellipse', 'circle'} or fill == 'none' or 'blush' in fill or 'cheek' in fill:
                continue
            if not node.get('stroke'):
                colour = colours.get(fill[5:-1]) if fill.startswith('url(#') else None
                if colour:
                    node.set('stroke', colour)
                    node.set('stroke-width', '.65')
                    node.set('stroke-linejoin', 'round')
    return ''.join(ET.tostring(node, encoding='unicode') for node in wrapper)


def fit_model(source):
    # Fit actual visible geometry, rather than differently padded PNG canvases.
    # One uniform scale preserves circles and each object's natural proportions.
    left, top, width, height = MODEL_BOUNDS[source.name]
    scale = min(88 / width, 124 / height)
    x = (CANVAS_WIDTH - width * scale) / 2 - left * scale
    y = 132 - (top + height) * scale
    return f'translate({x:.6f} {y:.6f}) scale({scale:.6f})'


def shadows(width, height):
    # A compact vector contact shadow gives depth without filtering the model.
    defs = '<radialGradient id="floor-shadow"><stop stop-color="#6486ad" stop-opacity=".2"/><stop offset=".5" stop-color="#6486ad" stop-opacity=".1"/><stop offset="1" stop-color="#6486ad" stop-opacity="0"/></radialGradient>'
    floor = f'<ellipse cx="{width/2}" cy="134" rx="{width*.28}" ry="1.8" fill="url(#floor-shadow)"/>'
    return defs, floor


def main():
    specs = json.load(sys.stdin)
    result = {}
    for item_id, spec in specs.items():
        source = Path(spec['source'])
        width, height = CANVAS_WIDTH, CANVAS_HEIGHT
        if spec['archetype'] == 'snowman':
            defs, content = snowman(spec.get('hueMap'))
        elif spec['archetype'] == 'panda':
            defs, content = panda()
        else:
            defs, content = make_model({**spec, 'source': source})
        content = crisp_materials(defs, content)
        shadow_defs, floor = shadows(width, height)
        result[item_id] = {
            'width': width, 'height': height,
            'defs': defs + shadow_defs,
            'content': floor + f'<g id="item-model" transform="{fit_model(source)}">{content}</g>',
        }
    json.dump(result, sys.stdout, separators=(',', ':'))


if __name__ == '__main__':
    main()

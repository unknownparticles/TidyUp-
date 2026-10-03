#!/usr/bin/env python3
"""Build complete SVG illustrations from authored geometric recipes.

All assets share the same canvas and fitting envelope. Shapes, details, colour regions and
shading are explicit vector geometry, so damaged alpha cannot remove material.
"""
import json
import sys
from pathlib import Path

from geometric_models import make_model
from reference_models import panda, snowman


MODEL_BOUNDS = json.loads(Path(__file__).with_name('model_bounds.json').read_text())
CANVAS_WIDTH, CANVAS_HEIGHT = 100, 140


def fit_model(source):
    # Fit actual visible geometry, rather than differently padded PNG canvases.
    # One uniform scale preserves circles and each object's natural proportions.
    left, top, width, height = MODEL_BOUNDS[source.name]
    scale = min(88 / width, 124 / height)
    x = (CANVAS_WIDTH - width * scale) / 2 - left * scale
    y = 132 - (top + height) * scale
    return f'translate({x:.6f} {y:.6f}) scale({scale:.6f})'


def shadows(width, height):
    # Blur is restricted to SourceAlpha. The coloured SourceGraphic is merged
    # untouched, preserving crisp lettering, eyes and all material boundaries.
    defs = f'''<radialGradient id="floor-shadow"><stop stop-color="#9db9d8" stop-opacity=".12"/><stop offset=".6" stop-color="#9db9d8" stop-opacity=".05"/><stop offset="1" stop-color="#9db9d8" stop-opacity="0"/></radialGradient>
<filter id="object-shadow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="{width+20}" height="{height+24}" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation=".55" result="soft-shadow"/><feOffset in="soft-shadow" dy="1.4" result="offset-shadow"/><feFlood flood-color="#96acce" flood-opacity=".14"/><feComposite in2="offset-shadow" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'''
    floor = f'<ellipse cx="{width/2}" cy="{height-1}" rx="{width*.32}" ry="2.7" fill="url(#floor-shadow)"/>'
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
        shadow_defs, floor = shadows(width, height)
        result[item_id] = {
            'width': width, 'height': height,
            'defs': defs + shadow_defs,
            'content': floor + f'<g filter="url(#object-shadow)"><g id="item-model" transform="{fit_model(source)}">{content}</g></g>',
        }
    json.dump(result, sys.stdout, separators=(',', ':'))


if __name__ == '__main__':
    main()

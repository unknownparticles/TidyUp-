#!/usr/bin/env python3
"""Build complete SVG illustrations from authored geometric recipes.

Reference PNGs provide only dimensions. Shapes, details, colour regions and
shading are explicit vector geometry, so damaged alpha cannot remove material.
"""
import json
import struct
import sys
from pathlib import Path

from geometric_models import make_model
from reference_models import panda, snowman


def reference_size(source):
    with source.open('rb') as image:
        header = image.read(24)
    if header[:8] != b'\x89PNG\r\n\x1a\n' or header[12:16] != b'IHDR':
        raise ValueError(f'Invalid PNG reference: {source}')
    return struct.unpack('>II', header[16:24])


def shadows(width, height):
    # Blur is restricted to SourceAlpha. The coloured SourceGraphic is merged
    # untouched, preserving crisp lettering, eyes and all material boundaries.
    defs = f'''<radialGradient id="floor-shadow"><stop stop-color="#9db9d8" stop-opacity=".12"/><stop offset=".6" stop-color="#9db9d8" stop-opacity=".05"/><stop offset="1" stop-color="#9db9d8" stop-opacity="0"/></radialGradient>
<filter id="object-shadow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="{width+20}" height="{height+24}" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation=".85" result="soft-shadow"/><feOffset in="soft-shadow" dy="1.4" result="offset-shadow"/><feFlood flood-color="#96acce" flood-opacity=".10"/><feComposite in2="offset-shadow" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'''
    floor = f'<ellipse cx="{width/2}" cy="{height-1}" rx="{width*.32}" ry="2.7" fill="url(#floor-shadow)"/>'
    return defs, floor


def main():
    specs = json.load(sys.stdin)
    result = {}
    for item_id, spec in specs.items():
        source = Path(spec['source'])
        width, height = reference_size(source)
        if spec['archetype'] == 'snowman':
            defs, content = snowman(spec.get('hueMap'))
        elif spec['archetype'] == 'panda':
            defs, content = panda()
        else:
            defs, content = make_model({**spec, 'source': source})
            content = f'<g transform="scale({width/100:.6f} {height/140:.6f})">{content}</g>'
        shadow_defs, floor = shadows(width, height)
        result[item_id] = {
            'width': width, 'height': height,
            'defs': defs + shadow_defs,
            'content': floor + f'<g filter="url(#object-shadow)">{content}</g>',
        }
    json.dump(result, sys.stdout, separators=(',', ':'))


if __name__ == '__main__':
    main()

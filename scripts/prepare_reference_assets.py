#!/usr/bin/env python3
"""Prepare transparent PNG references for the generated SVG wrappers.

The source sprites were cut out against white.  Their partially transparent
edge pixels still contain some of that white, which becomes a visible halo on
the game's blue background.  This helper removes that contamination and can
recolour the small set of variants that do not have their own reference PNG.
"""

import base64
import colorsys
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


TARGET_HUES = {
    "red": 0.0,
    "yellow": 0.12,
    "green": 0.33,
    "purple": 0.78,
    "pink": 0.92,
}


def repair_cutout(image, source):
    """Restore the known accidental cutout in the snowman's white cheek."""
    if source.stem != "blue_snowman":
        return image
    backing = Image.new("RGBA", image.size)
    ImageDraw.Draw(backing).ellipse((10, 49, 73, 81), fill=(235, 241, 244, 255))
    # Only the damaged left cheek needs a backing; leave all other pixels as-is.
    mask = Image.new("L", image.size)
    ImageDraw.Draw(mask).rectangle((0, 50, 35, 78), fill=255)
    backing.putalpha(Image.composite(backing.getchannel("A"), Image.new("L", image.size), mask))
    backing.alpha_composite(image)
    return backing


def clean_edges(image):
    """Remove white matte contamination while preserving anti-aliased edges."""
    image = image.convert("RGBA")
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, alpha = pixels[x, y]
            if alpha <= 64:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            if alpha < 255:
                coverage = alpha / 255.0
                # The matte is white: observed = foreground * coverage +
                # white * (1 - coverage). Undo that blend before encoding.
                r = round(max(0.0, min(255.0, (r - 255.0 + 255.0 * coverage) / coverage)))
                g = round(max(0.0, min(255.0, (g - 255.0 + 255.0 * coverage) / coverage)))
                b = round(max(0.0, min(255.0, (b - 255.0 + 255.0 * coverage) / coverage)))
            # Low-coverage fringe is largely residual white background. A
            # smooth coverage ramp removes it without a hard pixel boundary.
            coverage = min(1.0, max(0.0, (alpha - 64) / 191.0))
            alpha = round(255 * coverage)
            pixels[x, y] = (r, g, b, alpha)
    # Some reference boundaries contain opaque white pixels too. Extend the
    # nearby interior colour through this narrow boundary band; alpha still
    # controls its smooth silhouette. White objects keep their white material.
    core = image.getchannel("A").point(lambda value: 255 if value == 255 else 0)
    core = core.filter(ImageFilter.MinFilter(3))
    core_pixels = core.load()
    original = image.copy().load()
    offsets = sorted(
        ((dx, dy) for dy in range(-5, 6) for dx in range(-5, 6)),
        key=lambda offset: offset[0] ** 2 + offset[1] ** 2,
    )
    for y in range(image.height):
        for x in range(image.width):
            if pixels[x, y][3] == 0 or core_pixels[x, y] != 0:
                continue
            for dx, dy in offsets:
                nx, ny = x + dx, y + dy
                if 0 <= nx < image.width and 0 <= ny < image.height and core_pixels[nx, ny]:
                    pixels[x, y] = (*original[nx, ny][:3], pixels[x, y][3])
                    break
    return image


def recolour(image, hue_map):
    """Map only the coloured source material; white highlights stay white."""
    if not hue_map:
        return image
    pixels = image.load()
    target_hue = TARGET_HUES[hue_map["target"]]
    source_kind = hue_map["source"]
    pod_mask = None
    if source_kind == "pea_bunny":
        pod_mask = Image.new("L", image.size)
        ImageDraw.Draw(pod_mask).polygon(
            [(3, 41), (24, 45), (39, 88), (58, 105), (92, 106),
             (103, 113), (90, 131), (48, 132), (14, 90)], fill=255
        )
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, alpha = pixels[x, y]
            if alpha == 0:
                continue
            h, saturation, value = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
            if source_kind == "snowman":
                matches = 0.48 <= h <= 0.72 and saturation >= 0.16
            else:
                matches = pod_mask.getpixel((x, y)) and 0.10 <= h <= 0.52 and saturation >= 0.12
            if matches:
                nr, ng, nb = colorsys.hsv_to_rgb(target_hue, saturation, value)
                pixels[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), alpha)
    return image


def main():
    specs = json.load(sys.stdin)
    result = {}
    for item_id, spec in specs.items():
        source = Path(spec["source"])
        image = clean_edges(Image.open(source))
        image = repair_cutout(image, source)
        image = recolour(image, spec.get("hueMap"))
        output = io.BytesIO()
        image.save(output, format="PNG", optimize=True)
        result[item_id] = {
            "width": image.width,
            "height": image.height,
            "data": "data:image/png;base64," + base64.b64encode(output.getvalue()).decode("ascii"),
        }
    json.dump(result, sys.stdout, separators=(",", ":"))


if __name__ == "__main__":
    main()

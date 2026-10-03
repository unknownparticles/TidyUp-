#!/usr/bin/env python3
"""Restore PNG cutouts, then trace their colours into genuine SVG curves.

PNG files are only build inputs. Generated assets contain paths, clip paths,
curves and gradients, with no raster images or data URLs.
"""
import colorsys
import json
import re
import sys
from pathlib import Path

import cv2
import numpy as np
import vtracer
from PIL import Image, ImageDraw, ImageFilter

from reference_models import panda, snowman

TARGET_HUES = {'red': 0.0, 'yellow': 0.12, 'green': 0.33, 'purple': 0.78, 'pink': 0.92}
TRACE_SCALE = 3
COLOURED_SILHOUETTES = {
    'xmas_tree', 'red_pouch', 'pink_gift_box', 'pink_gold_gift', 'polka_stocking',
    'green_gift_box', 'green_red_gift', 'striped_gift_box', 'red_yellow_gift',
    'yellow_gift_box', 'red_candle', 'green_chips_bag', 'red_snack_bag',
    'purple_snack_bag', 'yellow_chips', 'watermelon_slice', 'yellow_cheese',
}


def restore_silhouette(source, image):
    """Recover white material from the original RGB instead of flat patches."""
    rgba = np.array(image)
    mask = (rgba[:, :, 3] >= 180).astype(np.uint8) * 255
    if source.stem in COLOURED_SILHOUETTES:
        # White matte and cast shadows outside these coloured subjects are
        # background; enclosed labels and ribbons are restored by contour fill.
        hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
        mask = ((hsv[:, :, 1] > 35) & (rgba[:, :, 3] > 140)).astype(np.uint8) * 255
    if source.stem == 'farm_cow_milk':
        mask[:10] = 0  # Detached white crop-frame above the blue bottle cap.
    if source.stem == 'tiered_green_tree':
        mask[:8] = 0
        mask[:, :10] = 0
    if source.stem in {'red_wish_tree', 'xmas_gnome'}:
        hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
        bottom_shadow = (np.indices(mask.shape)[0] > image.height * .86) & (hsv[:, :, 1] < 35)
        mask[bottom_shadow] = 0
    if source.stem == 'lucky_clover':
        hsv = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2HSV)
        mask = ((hsv[:, :, 1] > 50) & (hsv[:, :, 0] > 20)
                & (hsv[:, :, 0] < 95) & (rgba[:, :, 3] > 60)).astype(np.uint8) * 255
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    repaired = np.zeros_like(mask)
    largest_area = max((cv2.contourArea(c) for c in contours), default=0)
    for contour in contours:
        if cv2.contourArea(contour) >= max(8, largest_area * .01):
            cv2.drawContours(repaired, [contour], -1, 255, -1)
    mask_image = Image.fromarray(repaired)
    draw = ImageDraw.Draw(mask_image)
    if source.stem == 'polka_stocking':
        draw.rounded_rectangle((19, 4, 76, 35), radius=5, fill=255)
    if source.stem == 'classic_milk':
        draw.rounded_rectangle((3, 4, 79, 129), radius=1, fill=255)
    if source.stem == 'orange_coffee_cup':
        draw.rounded_rectangle((16, 24, 74, 121), radius=6, fill=255)
    if source.stem == 'pea_bunny':
        draw.ellipse((33, 39, 91, 89), fill=255)
    # Smooth the mask before curve fitting, instead of tracing pixel stairs.
    repaired = np.array(mask_image.filter(ImageFilter.GaussianBlur(.65)))
    return (repaired >= 150).astype(np.uint8) * 255


def extend_interior_colours(rgb, mask):
    """Replace the narrow white matte border with nearest interior material."""
    core = cv2.erode(mask, np.ones((5, 5), np.uint8))
    if not np.any(core):
        return rgb
    _, labels = cv2.distanceTransformWithLabels(
        (core == 0).astype(np.uint8), cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL
    )
    ys, xs = np.nonzero(core)
    colours = np.zeros((len(xs) + 1, 3), dtype=np.uint8)
    colours[labels[ys, xs]] = rgb[ys, xs]
    result = rgb.copy()
    border = (mask > 0) & (core == 0)
    result[border] = colours[labels[border]]
    return result


def recolour(image, hue_map):
    if not hue_map:
        return image
    target = TARGET_HUES[hue_map['target']]
    pixels = image.load()
    pod_mask = Image.new('L', image.size)
    ImageDraw.Draw(pod_mask).polygon(
        [(3, 41), (24, 45), (39, 88), (58, 105), (92, 106),
         (103, 113), (90, 131), (48, 132), (14, 90)], fill=255
    )
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if a and pod_mask.getpixel((x, y)) and .10 <= h <= .52 and s >= .12:
                pixels[x, y] = tuple(round(c * 255) for c in colorsys.hsv_to_rgb(target, s, v)) + (a,)
    return image


def spline_path(contour):
    """Fit a closed cubic curve around a simplified reference silhouette."""
    points = cv2.approxPolyDP(contour, 1.05, True).reshape(-1, 2).astype(float)
    if len(points) < 3:
        return ''
    def coordinate(point):
        return f'{point[0]:.2f} {point[1]:.2f}'
    segments = [f'M{coordinate(points[0])}']
    count = len(points)
    for i in range(count):
        previous, start, end, following = (points[(i - 1) % count], points[i],
                                            points[(i + 1) % count], points[(i + 2) % count])
        control1 = start + (end - previous) / 8
        control2 = end - (following - start) / 8
        segments.append(f'C{coordinate(control1)} {coordinate(control2)} {coordinate(end)}')
    return ' '.join(segments) + 'Z'


def trace(source, image, hue_map):
    mask = restore_silhouette(source, image)
    # The raw RGB still contains correctly drawn white cuffs and carton tops.
    # Use it within the repaired mask, without applying the damaged old alpha.
    rgb = np.array(image.convert('RGB').filter(ImageFilter.MedianFilter(3)))
    rgb = extend_interior_colours(rgb, mask)
    restored = Image.fromarray(rgb).convert('RGBA')
    restored.putalpha(Image.fromarray(mask))
    restored = recolour(restored, hue_map)
    restored = restored.resize((image.width * TRACE_SCALE, image.height * TRACE_SCALE), Image.Resampling.BICUBIC)
    restored.putalpha(restored.getchannel('A').point(lambda value: 255 if value >= 128 else 0))
    svg = vtracer.convert_pixels_to_svg(
        list(restored.getdata()), restored.size, colormode='color', hierarchical='stacked',
        mode='spline', filter_speckle=8, color_precision=8, layer_difference=12,
        corner_threshold=120, length_threshold=5, max_iterations=10,
        splice_threshold=45, path_precision=2,
    )
    body = svg[svg.index('>') + 1:svg.rindex('</svg>')]
    # The tracer includes an XML declaration before its root SVG.
    body = re.sub(r'^.*?<svg[^>]*>', '', body, flags=re.S)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    outline = ' '.join(spline_path(contour) for contour in contours if cv2.contourArea(contour) > 5)
    defs = f'<clipPath id="silhouette"><path d="{outline}"/></clipPath>'
    # Curves soften the silhouette; a very slight material blur blends traced
    # colour bands while the outer clip remains crisp at every display size.
    defs += '<filter id="material" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation=".22"/></filter>'
    content = f'<g clip-path="url(#silhouette)"><g filter="url(#material)"><g transform="scale({1 / TRACE_SCALE:.8f})">{body}</g></g></g>'
    return defs, content


def main():
    specs = json.load(sys.stdin)
    result = {}
    prepared = {}
    for item_id, spec in specs.items():
        source = Path(spec['source'])
        with Image.open(source) as input_image:
            image = input_image.convert('RGBA')
        cache_key = (str(source), json.dumps(spec.get('hueMap'), sort_keys=True))
        if cache_key not in prepared:
            if source.stem == 'blue_snowman':
                defs, content = snowman(spec.get('hueMap'))
            elif source.stem == 'panda_bear':
                defs, content = panda()
            else:
                defs, content = trace(source, image, spec.get('hueMap'))
            prepared[cache_key] = {'width': image.width, 'height': image.height,
                                   'defs': defs, 'content': content}
        result[item_id] = prepared[cache_key]
    json.dump(result, sys.stdout, separators=(',', ':'))


if __name__ == '__main__':
    main()

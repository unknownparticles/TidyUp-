#!/usr/bin/env python3
"""Import the supplied white-background item photos without redrawing them."""
import argparse
import hashlib
import json
import re
import shutil
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_ITEM_NUMBERS = {912, 913}

# Source numbers stay stable, including the unusually numbered source files.
GROUPS = [
    (810, 815, 'stocking', '彩色长袜'), (816, 822, 'gift', '蝴蝶结礼盒'),
    (823, 826, 'candle', '彩色蜡烛'), (827, 830, 'cat', '小猫公仔'),
    (831, 843, 'plant', '绿植盆栽'), (845, 847, 'rabbit', '小兔公仔'),
    (848, 855, 'bear', '小熊公仔'), (856, 859, 'carton', '饮品纸盒'),
    (860, 864, 'snack', '零食袋'), (865, 867, 'carton', '饮品纸盒'),
    (869, 871, 'snack', '零食袋'), (872, 875, 'carton', '果味饮品'),
    (876, 880, 'snack', '零食袋'), (881, 892, 'bottle', '汽水瓶'),
    (893, 894, 'stocking', '条纹长袜'), (898, 899, 'coffee_maker', '咖啡机'),
    (905, 906, 'bin', '收纳桶'), (908, 911, 'cleaner', '清洁用品'),
    (912, 913, 'toothbrush_cup', '牙刷杯'), (914, 915, 'dryer', '吹风机'),
    (916, 917, 'vacuum', '吸尘器'), (919, 921, 'lantern', '彩色灯笼'),
    (922, 925, 'wreath', '节日花环'), (926, 927, 'pouch', '福袋'),
    (928, 929, 'party_popper', '庆典礼炮'), (930, 931, 'gift', '节日礼盒'),
    (932, 933, 'shoe', '高帮运动鞋'), (934, 936, 'scarf', '彩色围巾'),
    (937, 938, 'handbag', '手提包'), (939, 940, 'perfume', '香水瓶'),
    (941, 942, 'backpack', '双肩背包'), (943, 944, 'scooter', '小摩托'),
    (946, 948, 'balloon', '热气球'), (972, 981, 'drink', '彩色饮料'),
    (987, 988, 'snack', '薯片袋'), (990, 993, 'plant', '花草盆栽'),
]
SPECIAL = {
    799: ('lamp', '复古小夜灯'), 800: ('can', '草莓汽水罐'),
    801: ('can', '粉色草莓汽水罐'), 802: ('can', '柠檬汽水罐'),
    803: ('can', '蓝色海浪汽水罐'), 804: ('backpack', '紫色小兔背包'),
    805: ('backpack', '绿色糖果背包'), 806: ('backpack', '蓝色双肩背包'),
    807: ('backpack', '奶黄色小猫背包'), 808: ('backpack', '橙色胡萝卜背包'),
    809: ('backpack', '深蓝星星背包'),
    885: ('snack', '彩色波点零食袋'), 886: ('snack', '绿色波纹零食袋'),
    887: ('snack', '星光零食袋'),
    895: ('lamp', '青色台灯'), 896: ('drink', '橙色饮料'),
    897: ('calculator', '橙色计算器'), 900: ('bowling', '保龄球瓶'),
    901: ('racket', '网球拍'), 902: ('flask', '蓝色水壶'),
    907: ('brush', '清洁刷'), 918: ('tree', '圣诞树'),
    945: ('skateboard', '青色滑板'), 949: ('train', '红色列车'),
    951: ('notebook', '粉色笔记本'), 952: ('calculator', '红色计算器'),
    953: ('dice', '彩色骰子'), 954: ('headphones', '黄色耳机'),
    955: ('remote', '紫色遥控器'), 956: ('laptop', '蓝色笔记本电脑'),
    957: ('flask', '粉色保温杯'), 958: ('board', '灰色砧板'),
    959: ('microwave', '橙色微波炉'), 960: ('rice_cooker', '紫色电饭锅'),
    961: ('toaster', '黄色烤面包机'), 962: ('coffee_maker', '蓝色咖啡机'),
    963: ('kettle', '蓝色水壶'), 964: ('pan', '红色煎锅'),
    965: ('stool', '木色圆凳'), 966: ('chair', '黄色扶手椅'),
    968: ('washer', '洗衣机'), 969: ('fan', '蓝色风扇'),
    970: ('fridge', '青色冰箱'), 971: ('clock', '红色闹钟'),
    982: ('mitten', '黄色手套'), 983: ('drink', '玻璃杯饮料'),
    984: ('lamp', '橙色台灯'), 985: ('leaf', '龟背竹叶'),
    986: ('carton', '蓝盒牛奶'), 989: ('bottle', '小熊饮料瓶'),
    991: ('cookie', '圆形饼干'), 995: ('mitten', '雪花手套'),
    996: ('notebook', '彩色笔记本'), 997: ('stocking', '黄黑条纹长袜'),
    998: ('bottle', '蓝色矿泉水'), 999: ('bottle', '橙味汽水'),
    8788: ('snack', '彩色糖果袋'), 8871: ('carton', '葡萄饮品盒'),
    8877: ('snack', '饼干袋'), 9771: ('lamp', '紫色台灯'),
    88868: ('snack', '紫色薯片袋'),
}


def transparent_photo(path):
    rgb = Image.open(path).convert('RGB')
    r, g, b = rgb.split()
    lightest = ImageChops.lighter(ImageChops.lighter(r, g), b)
    darkest = ImageChops.darker(ImageChops.darker(r, g), b)
    neutral = ImageChops.subtract(lightest, darkest).point(lambda v: 255 if v < 14 else 0)
    white = darkest.point(lambda v: 255 if v >= 242 else 0)
    candidates = ImageChops.multiply(white, neutral)
    # Only remove white connected to the exterior. White fabric, eyes and labels
    # enclosed by the object's outline keep their original pixels.
    padded = Image.new('L', (rgb.width + 2, rgb.height + 2), 255)
    padded.paste(candidates, (1, 1))
    ImageDraw.floodfill(padded, (0, 0), 128)
    alpha = padded.crop((1, 1, rgb.width + 1, rgb.height + 1)).point(lambda v: 0 if v == 128 else 255)
    rgba = rgb.convert('RGBA')
    rgba.putalpha(alpha)
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError(f'No subject found: {path}')
    subject = rgba.crop(bounds)
    subject.thumbnail((184, 248), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (200, 280))
    canvas.alpha_composite(subject, ((200 - subject.width) // 2, 264 - subject.height))
    return canvas


def prepare_item(source, staging):
    number = int(source.stem.rstrip('.'))
    key = f'item_{number}'
    group, name = 'object', '生活物品'
    for start, end, category, label in GROUPS:
        if start <= number <= end:
            group, name = category, label
            break
    group, name = SPECIAL.get(number, (group, name))
    photo = transparent_photo(source)
    target = staging / f'{key}.webp'
    photo.save(target, format='WEBP', quality=82, method=4, exact=True)
    with Image.open(target) as compressed:
        decoded = compressed.convert('RGBA')
        if decoded.size != photo.size or decoded.getchannel('A').tobytes() != photo.getchannel('A').tobytes():
            raise ValueError(f'Dimensions or transparency changed: {source}')
        left, top, right, bottom = decoded.getbbox()
    return key, dict(id=key, name=f'{name}（{number}）', archetype=group,
                     colorGroup=str(number), img=f'./assets/items/photos/{key}.webp',
                     revision=hashlib.sha256(target.read_bytes()).hexdigest()[:12],
                     bounds=[left, top, right - left, bottom - top])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    files = sorted((path for path in args.source.glob('*.jpg')
                    if int(path.stem.rstrip('.')) not in EXCLUDED_ITEM_NUMBERS),
                   key=lambda p: int(p.stem.rstrip('.')))
    if not files:
        parser.error('No JPG item photos found')
    output = ROOT / 'assets/items/photos'
    catalog_path = ROOT / 'assets/items/items_data.json'
    previous = json.loads(catalog_path.read_text()) if catalog_path.exists() else {}
    # Finish and validate the entire batch before replacing the live library.
    with tempfile.TemporaryDirectory(prefix='zls-photo-import-') as temporary:
        staging = Path(temporary)
        catalog = {}
        with ThreadPoolExecutor(max_workers=4) as executor:
            for index, (key, item) in enumerate(executor.map(lambda source: prepare_item(source, staging), files), 1):
                if key in catalog:
                    raise ValueError(f'Duplicate item number: {key}')
                catalog[key] = item
                if index % 24 == 0:
                    print(f'Prepared {index}/{len(files)} items', flush=True)
        serialized = json.dumps(catalog, ensure_ascii=False, indent=2)
        app_path = ROOT / 'app.js'
        app, count = re.subn(r'  // (?:Bright geometric[^\n]*|Imported photo[^\n]*)\n  const ITEMS = \{.*?\n  \};',
                            lambda _: '  // Imported photo assets, fitted to a shared transparent canvas.\n'
                            '  const ITEMS = ' + serialized.replace('\n', '\n  ') + ';',
                            app_path.read_text(), count=1, flags=re.S)
        if count != 1:
            raise ValueError('Could not locate the standalone app catalog')
        output.mkdir(exist_ok=True)
        for key in catalog:
            shutil.copyfile(staging / f'{key}.webp', output / f'{key}.webp')
        catalog_path.write_text(serialized + '\n')
        (ROOT / 'src/items.js').write_text('// Imported photo assets, fitted to a shared transparent canvas.\n'
                                         f'export const ITEMS = {serialized};\n\n'
                                         'export const ITEM_KEYS = Object.keys(ITEMS);\n')
        app_path.write_text(app)
        for key, item in previous.items():
            obsolete = ROOT / item['img'][2:]
            if key not in catalog and obsolete.parent == output and obsolete.exists():
                obsolete.unlink()
    before = sum(source.stat().st_size for source in files)
    after = sum((output / f'{key}.webp').stat().st_size for key in catalog)
    print(f'Imported {len(catalog)} items: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)')


if __name__ == '__main__':
    main()

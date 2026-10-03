"""Small, authored SVG forms; no bitmap tracing or fragmented colour regions."""
import math

# Macaron hues with a compact highlight and clearly separated shaded material.
PALETTES = {
    'white': ('#ffffff', '#f0f5fc', '#c0d4ee'),
    'cream': ('#fff7da', '#ffe8b0', '#ebc775'),
    'blue': ('#bde8ff', '#45b9ef', '#2189cb'),
    'navy': ('#c6ddff', '#669ee6', '#3f73c1'),
    'cyan': ('#c2f2ff', '#39c4e0', '#179cb9'),
    'teal': ('#b9f2e7', '#3dc5a7', '#229a7f'),
    'green': ('#c2f7df', '#48ce96', '#23a774'),
    'red': ('#ffcac5', '#ff727e', '#df4a64'),
    'pink': ('#ffd6eb', '#f57cb9', '#d65299'),
    'yellow': ('#fff0b0', '#ffd15b', '#dfae32'),
    'gold': ('#fff0b9', '#f9c65c', '#dba032'),
    'orange': ('#ffe0bd', '#ffad70', '#e57d48'),
    'purple': ('#e8d4ff', '#ad80e8', '#875bc4'),
    'brown': ('#f9dfc6', '#e5bc98', '#c99c78'),
    'dark': ('#7b8ba4', '#4b5e7b', '#2e4162'),
    'coral': ('#ffdbca', '#ffa083', '#e57b68'),
}


def grad(name):
    return f'url(#{name})'


def ellipse(x, y, rx, ry, fill, extra=''):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" {extra}/>'


def circle(x, y, radius, fill, extra=''):
    return f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}" {extra}/>'


def rect(x, y, width, height, radius, fill, extra=''):
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}" {extra}/>'


def path(d, fill='none', extra=''):
    return f'<path d="{d}" fill="{fill}" {extra}/>'


def line(d, colour, width=1.5, extra=''):
    return path(d, 'none', f'stroke="{colour}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}')


class Drawing:
    def __init__(self):
        self.definitions = []
        self.names = set()

    def paint(self, name):
        if name not in self.names:
            light, middle, dark = PALETTES[name]
            # Keep the broad face opaque and coloured; local highlight geometry
            # handles shine instead of a large pale radial wash.
            self.definitions.append(f'<linearGradient id="{name}" x1="0" y1="0" x2=".25" y2="1"><stop stop-color="{middle}"/><stop offset=".84" stop-color="{middle}"/><stop offset="1" stop-color="{dark}"/></linearGradient>')
            self.names.add(name)
        return grad(name)

    def linear(self, name):
        key = name + '-linear'
        if key not in self.names:
            light, middle, dark = PALETTES[name]
            self.definitions.append(f'<linearGradient id="{key}" x1="0" y1="0" x2="1" y2=".75"><stop stop-color="{middle}"/><stop offset=".7" stop-color="{middle}"/><stop offset="1" stop-color="{dark}"/></linearGradient>')
            self.names.add(key)
        return grad(key)

    def blush(self):
        if 'blush' not in self.names:
            self.definitions.append('<radialGradient id="blush"><stop stop-color="#f58eab" stop-opacity=".6"/><stop offset="1" stop-color="#ffc0d1" stop-opacity="0"/></radialGradient>')
            self.names.add('blush')
        return grad('blush')

    def clip(self, name, shape):
        self.definitions.append(f'<clipPath id="{name}">{shape}</clipPath>')

    def finish(self, content):
        return ''.join(self.definitions), content


def eyes(d, left, right, y, radius=3):
    return ''.join(circle(x, y, radius, d.paint('dark')) + circle(x - radius * .27, y - radius * .3, radius * .28, '#fff') for x in (left, right))


def smile(x, y, width=5):
    return line(f'M{x-width} {y} Q{x} {y+5} {x+width} {y}', '#4c4e57', 1.5)


def cheeks(d, left, right, y, radius=6):
    return ellipse(left, y, radius, radius * .7, d.blush()) + ellipse(right, y, radius, radius * .7, d.blush())


def star(d, x, y, size=10):
    points = []
    for i in range(10):
        angle = -math.pi / 2 + i * math.pi / 5
        radius = size if i % 2 == 0 else size * .47
        points.append((x + math.cos(angle) * radius, y + math.sin(angle) * radius))
    return path('M' + ' L'.join(f'{px:.2f} {py:.2f}' for px, py in points) + 'Z', d.paint('gold')) + ellipse(x-2, y-3, 2, 1.5, '#fff8d7', 'opacity=".4"')


def snowflake(x, y, size=12, colour='#fff8e8'):
    content = ''
    for angle in (0, 60, 120):
        content += f'<g transform="rotate({angle} {x} {y})">' + line(f'M{x} {y-size} V{y+size}', colour, 2.3) + line(f'M{x-3} {y-size+4} L{x} {y-size+7} L{x+3} {y-size+4} M{x-3} {y+size-4} L{x} {y+size-7} L{x+3} {y+size-4}', colour, 1.6) + '</g>'
    return content


# Compact vector lettering keeps labels crisp without external font files.
GLYPHS = {
    'A': 'M0 10 L3 0 L6 10 M1 6 H5', 'B': 'M0 10 V0 H3 Q7 0 5 4 L3 5 H0 M3 5 Q7 5 6 8 Q6 10 3 10 H0',
    'C': 'M6 1 Q0 -2 0 5 Q0 12 6 9', 'D': 'M0 0 V10 H2 Q7 10 6 5 Q7 0 2 0Z',
    'E': 'M6 0 H0 V10 H6 M0 5 H5', 'F': 'M6 0 H0 V10 M0 5 H5', 'G': 'M6 1 Q0 -2 0 5 Q0 12 6 9 V5 H3',
    'H': 'M0 0 V10 M6 0 V10 M0 5 H6', 'I': 'M0 0 H6 M3 0 V10 M0 10 H6',
    'K': 'M0 0 V10 M6 0 L0 5 L6 10', 'L': 'M0 0 V10 H6',
    'M': 'M0 10 V0 L3 5 L6 0 V10', 'N': 'M0 10 V0 L6 10 V0',
    'O': 'M3 0 C-1 0 -1 10 3 10 C7 10 7 0 3 0Z', 'P': 'M0 10 V0 H3 Q7 0 6 3 Q6 5 3 5 H0',
    'R': 'M0 10 V0 H3 Q7 0 6 3 Q6 5 3 5 H0 M3 5 L6 10',
    'S': 'M6 1 C-1 -2 -2 4 3 5 C8 6 7 12 0 9', 'T': 'M0 0 H6 M3 0 V10',
    'U': 'M0 0 V7 Q0 10 3 10 Q6 10 6 7 V0', 'V': 'M0 0 L3 10 L6 0',
    'Y': 'M0 0 L3 5 L6 0 M3 5 V10', '2': 'M0 2 C0 -2 7 -1 6 3 Q5 5 0 9 V10 H6',
    '5': 'M6 0 H0 V5 Q6 3 6 7 Q6 12 0 9', '0': 'M3 0 C-1 0 -1 10 3 10 C7 10 7 0 3 0Z',
    '1': 'M1 2 L3 0 V10 M0 10 H6',
}


def label(word, x, y, width, colour='#fff', stroke=1.35):
    word = word.upper()
    scale = width / (len(word) * 8 - 2)
    content = ''
    for i, letter in enumerate(word):
        content += f'<g transform="translate({i*8} 0)">' + line(GLYPHS[letter], colour, stroke) + '</g>'
    return f'<g transform="translate({x-width/2:.3f} {y}) scale({scale:.5f})">{content}</g>'


def bow(d, x, y, name='red', scale=1):
    colour = d.paint(name)
    shape = path('M0 0 C-6 -14 -24 -20 -24 -7 C-24 7 -9 9 0 0Z M0 0 C6 -14 24 -20 24 -7 C24 7 9 9 0 0Z', colour)
    shape += path('M-3 3 L-14 19 Q-7 19 -4 16 L0 7 L5 18 L14 19 L4 3Z', d.linear(name))
    shape += line('M-19 -9 Q-15 -15 -6 -6 M6 -6 Q15 -15 19 -9', PALETTES[name][0], 2, 'opacity=".75"')
    shape += ellipse(0, 1, 5, 4, colour)
    return f'<g transform="translate({x} {y}) scale({scale})">{shape}</g>'


def bunny(d, colour):
    body = path('M8 42 C4 73 26 117 64 129 C80 135 96 126 97 108 C86 121 59 118 40 95 C23 76 19 57 18 40Z', d.paint(colour))
    body += ellipse(67, 97, 17, 14, d.paint('white'), 'transform="rotate(-20 67 97)"')
    body += ellipse(74, 99, 9, 8, d.paint('cream'))
    body += ellipse(32, 28, 8, 23, d.paint('white'), 'transform="rotate(-38 32 28)"')
    body += ellipse(32, 27, 4.7, 17, d.paint('pink'), 'transform="rotate(-38 32 27)"')
    body += ellipse(58, 24, 8, 23, d.paint('white'), 'transform="rotate(-20 58 24)"')
    body += ellipse(58, 24, 4.6, 17, d.paint('pink'), 'transform="rotate(-20 58 24)"')
    body += ellipse(61, 65, 27, 25, d.paint('white')) + cheeks(d, 45, 77, 71)
    body += line('M49 63 Q53 59 57 63', '#4c4e57', 2) + circle(73, 61, 2.5, d.paint('dark'))
    body += ellipse(64, 69, 2.2, 1.6, '#e990a8') + smile(64, 73, 3)
    body += ellipse(59, 91, 5, 4, d.paint('white')) + ellipse(69, 90, 5, 4, d.paint('white'))
    body += ellipse(85, 108, 7, 5, d.paint('white'), 'transform="rotate(-25 85 108)"') + ellipse(85, 108, 3.3, 2.6, d.paint('pink'))
    body += path('M8 42 C12 68 32 103 61 115 C77 122 90 119 97 108 C94 129 78 136 59 128 C28 115 9 84 8 42Z', d.linear(colour))
    body += line('M12 54 C21 85 40 111 61 120', PALETTES[colour][0], 2.2, 'opacity=".4"')
    return body


def tree(d, source):
    red = source == 'red_wish_tree'
    snowy = source == 'tiered_green_tree'
    paint = d.paint('red' if red else 'green')
    body = rect(42, 117, 17, 15, 4, d.paint('brown'))
    tiers = [(12, 106, 88, 67), (21, 82, 79, 43), (31, 55, 69, 20)]
    for left, bottom, right, top in tiers:
        body += path(f'M50 {top} C{left+14} {top+13} {left+3} {bottom-15} {left} {bottom-5} Q{left-3} {bottom+4} 50 {bottom+5} Q{right+3} {bottom+4} {right} {bottom-5} C{right-3} {bottom-15} {right-14} {top+13} 50 {top}Z', paint)
        body += path(f'M{left} {bottom-5} Q50 {bottom+3} {right} {bottom-5} Q{right+3} {bottom+5} 50 {bottom+8} Q{left-3} {bottom+5} {left} {bottom-5}Z', d.paint('white') if snowy or red else d.linear('green'))
        if not snowy and not red:
            body += line(f'M{left+7} {bottom-11} Q50 {bottom} {right-7} {bottom-11}', '#ffe387', 3)
    if not snowy:
        body += star(d, 50, 15, 11 if not red else 16)
    if not red and not snowy:
        for x, y, name in [(32,98,'pink'),(57,111,'yellow'),(73,97,'pink'),(41,75,'pink'),(64,73,'cyan'),(46,46,'pink')]:
            body += circle(x,y,3.2,d.paint(name)) + circle(x-1,y-1,1,'#fff','opacity=".75"')
    return body


def reindeer(d):
    body = line('M30 31 L22 16 L17 5 M23 18 L12 15 M21 13 L24 6 M70 31 L78 16 L83 5 M77 18 L88 15 M79 13 L76 6', '#d8b7a5', 5)
    body += rect(32,101,12,27,5,d.paint('brown')) + rect(57,101,12,27,5,d.paint('brown'))
    body += ellipse(36,125,8,4,d.paint('brown')) + ellipse(64,125,8,4,d.paint('brown'))
    body += ellipse(50,92,26,28,d.paint('orange')) + ellipse(50,99,16,20,d.paint('cream'))
    body += ellipse(21,44,11,7,d.paint('orange'),'transform="rotate(20 21 44)"') + ellipse(79,44,11,7,d.paint('orange'),'transform="rotate(-20 79 44)"')
    body += ellipse(50,57,30,27,d.paint('orange')) + eyes(d,38,62,52,3.6) + cheeks(d,29,71,64,7)
    body += ellipse(50,65,8,6,d.paint('red')) + ellipse(47,63,2.5,1.5,'#fff','opacity=".75"')
    body += line('M32 83 Q50 90 68 83', '#f496a1', 6) + circle(50,92,5,d.paint('gold')) + circle(50,94,1,'#dbb975')
    return body


def gnome(d):
    body = ellipse(50,104,33,26,d.paint('green')) + ellipse(29,127,12,5,d.paint('red')) + ellipse(72,127,12,5,d.paint('red'))
    body += ellipse(18,100,7,11,d.paint('white'),'transform="rotate(20 18 100)"') + ellipse(82,100,7,11,d.paint('white'),'transform="rotate(-20 82 100)"')
    body += path('M21 77 C17 94 29 118 50 124 C71 118 83 94 79 77Z',d.paint('white'))
    body += path('M25 70 C31 41 44 24 69 12 Q82 7 86 17 C77 31 71 50 73 70Z',d.paint('red'))
    body += circle(85,14,6,d.paint('white')) + rect(20,67,60,13,6,d.paint('white')) + ellipse(50,83,9,6,d.paint('cream'))
    return body


def stocking(d, source):
    green = source == 'green_xmas_sock'
    colour = 'green' if green else 'red'
    body = path('M27 30 L79 30 L78 83 C76 99 69 116 52 126 C35 138 14 128 12 115 C10 99 27 91 29 77Z',d.paint(colour))
    if green:
        body += path('M17 101 C31 95 42 108 42 128 C27 134 14 125 12 115Z',d.paint('red'))
        body += path('M71 82 Q83 87 75 101 Q66 98 64 92Z',d.paint('red'))
    else:
        for x,y,r in [(42,48,5),(69,55,5),(51,69,5),(63,85,5),(40,98,6),(24,115,5),(50,118,5)]:
            body += circle(x,y,r,d.paint('white'))
    body += rect(23,8,61,26,6,d.paint('red' if green else 'white'))
    body += line('M29 13 H77',PALETTES['red' if green else 'white'][0],2,'opacity=".4"')
    return body


def pouch(d):
    body = path('M37 32 C24 46 12 77 16 111 C18 133 82 133 84 111 C88 77 76 46 63 32Z',d.paint('red'))
    body += rect(34,14,32,18,5,d.paint('red')) + ellipse(50,33,21,5,d.paint('gold'))
    body += line('M46 35 Q34 44 32 56 M54 35 Q67 44 68 56','#ffdc72',3)
    body += circle(32,58,4,d.paint('gold')) + circle(68,58,4,d.paint('gold')) + snowflake(50,91,20)
    return body


def bell(d, bronze=False):
    body = path('M34 42 C34 63 28 84 18 101 Q14 109 50 113 Q86 109 82 101 C72 84 66 63 66 42Z',d.paint('orange' if bronze else 'gold'))
    body += ellipse(50,110,34,11,d.linear('gold')) + ellipse(50,109,27,7,'#e7bd77') + ellipse(50,108,25,5.5,'#f6d594')
    body += ellipse(50,109,8,7,d.paint('gold')) + line('M31 60 Q28 78 23 87','#fff3af',3,'opacity=".75"')
    body += bow(d,50,34,'red',1.03)
    return body


def gift(d, source):
    config = {
        'pink_gift_box': ('yellow','pink',False,False),
        'pink_gold_gift': ('pink','gold',False,False),
        'yellow_gift_box': ('yellow','red',True,False),
        'white_gift_box': ('white','red',True,False),
        'green_gift_box': ('green','gold',True,True),
        'green_red_gift': ('green','gold',True,False),
        'red_yellow_gift': ('red','gold',False,False),
        'striped_gift_box': ('red','green',True,True),
    }
    colour,ribbon,perspective,stripes = config[source]
    if perspective:
        outline = path('M15 44 L73 39 L90 50 L90 119 L72 132 L15 121Z',d.paint(colour))
        d.clip('box-face',outline)
        body = outline + path('M73 39 L90 50 L90 119 L72 132Z',d.linear(colour))
        if stripes:
            lines = ''.join(line(f'M{x} 140 L{x+62} 48','#fff8e4',7) for x in range(-35,95,19))
            body += f'<g clip-path="url(#box-face)">{lines}</g>'
        body += path('M15 44 L73 39 L90 50 L32 57Z',d.paint(colour))
        body += path('M43 42 L53 41 L70 52 L61 53 L61 130 L51 128 L51 54Z',d.linear(ribbon))
        body += rect(11,42,66,17,4,d.paint(colour)) + rect(43,42,10,17,1,d.paint(ribbon))
        body += bow(d,46,34,ribbon,.91)
    else:
        body = rect(15,20,70,110,7,d.paint(colour)) + rect(44,20,12,110,2,d.linear(ribbon)) + rect(15,69,70,13,2,d.linear(ribbon))
        body += bow(d,50,73,ribbon,1.08)
        body += line('M20 30 V61',PALETTES[colour][0],2,'opacity=".4"')
    return body


def bottle(d, source, bear=False):
    name = 'orange' if bear else {'cyan_done_bottle':'cyan','pink_done_bottle':'pink','teal_done_bottle':'teal'}[source]
    body = ellipse(81,30,9,6,d.paint(name)) + ellipse(81,30,4.5,2.5,'#f2faf9')
    body += path('M32 33 C32 46 19 46 17 57 L17 119 Q17 130 30 130 L71 130 Q83 130 83 119 L83 57 C81 46 68 46 68 33Z',d.paint(name))
    body += rect(30,15,40,20,6,d.paint(name)) + ellipse(50,16,19,4,d.paint(name))
    body += ellipse(43,51,12,2,'#fff','opacity=".16"') + line('M23 62 V109',PALETTES[name][0],2.5,'opacity=".4"')
    if bear:
        body += circle(34,75,8,d.paint('cream')) + circle(66,75,8,d.paint('cream'))
        body += circle(34,75,4,d.paint(name)) + circle(66,75,4,d.paint(name))
        body += ellipse(50,96,24,25,d.paint('cream')) + ellipse(50,98,21,20,d.paint('gold'))
        body += eyes(d,42,58,95,2.7) + ellipse(50,105,9,6,d.paint('cream'))
        body += ellipse(50,102,2.6,1.6,'#5c4b37') + smile(50,106,3)
    else:
        body += rect(17,72,66,35,2,PALETTES[name][2]) + label('DONE',50,80,49,{'cyan':'#225774','pink':'#7d365d','teal':'#236457'}[name],1.7)
    body += rect(24,120,52,3,1.5,PALETTES[name][0],'opacity=".65"')
    return body


def lollipop(d, colour):
    body = rect(46,66,8,66,3,d.paint('cream')) + line('M48 98 V127','#fff9e9',1.7)
    body += circle(50,44,35,d.paint(colour)) + line('M27 24 Q37 14 50 16',PALETTES[colour][0],3,'opacity=".4"')
    body += line('M18 48 Q50 57 82 47',PALETTES[colour][2],1.5,'opacity=".32"')
    body += bow(d,50,85,colour,.76)
    return body


def frog(d):
    body = ellipse(50,99,29,29,d.paint('green')) + ellipse(50,102,18,22,d.paint('cream'))
    body += ellipse(27,104,11,18,d.paint('green'),'transform="rotate(-25 27 104)"') + ellipse(75,104,11,18,d.paint('green'),'transform="rotate(25 75 104)"')
    body += ellipse(26,128,15,4,d.paint('yellow')) + ellipse(74,128,15,4,d.paint('yellow'))
    body += ellipse(30,36,16,19,d.paint('green')) + ellipse(71,29,15,18,d.paint('green'))
    body += ellipse(50,64,36,30,d.paint('green')) + path('M29 62 Q49 52 73 62 C75 77 61 87 52 91 C42 84 29 75 29 62Z',d.paint('cream'))
    body += ellipse(30,36,11,13,d.paint('brown')) + ellipse(71,29,10,12,d.paint('brown'))
    body += ellipse(31,36,8,10,d.paint('dark')) + ellipse(72,29,7.5,9,d.paint('dark'))
    body += circle(28,31,3,'#fff') + circle(70,24,2.6,'#fff') + cheeks(d,25,77,66,6)
    body += smile(51,69,6)
    body += ellipse(43,124,4,5,d.paint('green')) + ellipse(59,124,4,5,d.paint('green'))
    return body


def chick(d):
    body = ellipse(51,96,29,32,d.paint('gold')) + ellipse(52,101,19,24,d.paint('cream'))
    body += ellipse(24,97,9,18,d.paint('gold'),'transform="rotate(12 24 97)"') + ellipse(78,97,9,18,d.paint('gold'),'transform="rotate(-12 78 97)"')
    body += path('M40 28 Q37 16 46 12 Q45 19 53 24 Q49 12 59 9 Q63 25 68 31Z',d.paint('gold'))
    body += ellipse(51,55,31,29,d.paint('gold'))
    body += ellipse(37,56,16,19,d.paint('cream')) + ellipse(67,52,15,18,d.paint('cream'))
    body += ellipse(38,56,10,12,d.paint('brown')) + ellipse(67,52,9.5,11,d.paint('brown'))
    body += ellipse(39,57,7,9,d.paint('dark')) + ellipse(68,53,6.5,8,d.paint('dark'))
    body += circle(36,52,3,'#fff') + circle(65,49,2.7,'#fff')
    body += path('M47 66 Q53 61 59 65 L52 76Z',d.paint('orange'))
    body += line('M34 127 L32 133 M34 127 L42 131 M67 127 L65 133 M67 127 L75 131','#e5bc95',3)
    return body


def cookie_bucket(d):
    body = path('M16 54 L20 117 Q20 131 50 133 Q80 131 80 117 L84 54Z',d.paint('red'))
    body += ellipse(50,55,35,9,d.paint('cyan')) + ellipse(50,53,27,6,'#86c9d6')
    body += ellipse(38,36,12,24,d.paint('cream'),'transform="rotate(-18 38 36)"') + ellipse(68,32,13,24,d.paint('gold'),'transform="rotate(20 68 32)"')
    body += line('M31 22 Q36 21 42 29','#f1dfb7',2)
    body += snowflake(68,31,8,'#fff3cc')
    body += path('M15 53 Q50 68 85 53 L84 62 Q50 78 16 62Z',d.paint('cyan'))
    body += snowflake(50,100,17) + snowflake(29,81,5) + snowflake(73,84,5) + snowflake(27,117,5)
    return body


def milk(d, source):
    if source == 'farm_cow_milk':
        body = path('M32 23 L68 23 C68 36 79 42 83 54 L83 121 Q83 130 72 130 L28 130 Q17 130 17 121 L17 54 C21 42 32 36 32 23Z',d.paint('white'))
        body += rect(30,11,40,13,4,d.paint('blue')) + rect(17,72,66,41,1,d.linear('blue'))
        body += label('MILK',50,77,32,'#335d89',1.45)
        body += ellipse(37,96,6,5,d.paint('white'),'transform="rotate(-20 37 96)"') + ellipse(63,96,6,5,d.paint('white'),'transform="rotate(20 63 96)"')
        body += ellipse(50,102,15,12,d.paint('white')) + ellipse(50,106,11,6,d.paint('pink'))
        body += eyes(d,44,56,99,1.5) + circle(45,106,1,'#896176') + circle(55,106,1,'#896176')
        body += path('M39 94 Q44 89 46 96Z',d.paint('dark'))
        return body
    classic = source == 'classic_milk'
    body = rect(13,8,74,124,5,d.paint('white' if classic else 'blue'))
    body += path('M13 8 H80 Q87 8 87 15 V127 Q87 132 80 132 L78 20Z',d.linear('navy' if classic else 'blue'))
    if classic:
        body += path('M13 48 Q21 55 28 47 Q35 53 42 45 Q49 54 56 47 Q63 53 70 46 L78 49 L78 130 H13Z',d.paint('blue'))
        body += label('MILK',47,92,47,'#335d89',1.8)
        body += ellipse(44,71,12,12,d.paint('white')) + ellipse(33,65,5,4,d.paint('white')) + ellipse(55,65,5,4,d.paint('white'))
        body += ellipse(44,75,8,5,d.paint('pink')) + eyes(d,39,49,69,1.3)
    else:
        body += rect(23,17,48,27,5,d.paint('dark')) + rect(23,39,48,5,2,d.paint('red')) + label('MILK',47,22,35,'#fff',1.6)
        body += path('M13 97 Q24 89 36 96 Q52 85 78 96 V130 H13Z',d.paint('cream'))
        for x,y,rx,ry,angle in [(29,116,12,8,-20),(54,107,14,7,-25),(63,125,12,6,10)]:
            body += ellipse(x,y,rx,ry,d.paint('brown'),f'transform="rotate({angle} {x} {y})"')
        body += ellipse(34,88,8,9,d.paint('white'))
    body += line('M18 17 V78','#fff',2,'opacity=".45"')
    return body


def bear(d, colour):
    body = ellipse(50,100,24,29,d.paint(colour)) + ellipse(50,106,15,19,d.paint('cream'))
    body += ellipse(30,96,10,15,d.paint(colour),'transform="rotate(20 30 96)"') + ellipse(70,96,10,15,d.paint(colour),'transform="rotate(-20 70 96)"')
    body += circle(24,26,13,d.paint(colour)) + circle(76,26,13,d.paint(colour))
    body += circle(24,26,7,d.paint('cream')) + circle(76,26,7,d.paint('cream'))
    body += ellipse(50,58,35,35,d.paint(colour)) + cheeks(d,26,74,68,8)
    body += eyes(d,38,62,58,3.3) + ellipse(50,71,11,10,d.paint('cream')) + ellipse(50,68,3.7,2.5,'#706784') + smile(50,73,3)
    body += ellipse(38,101,7,10,d.paint(colour)) + ellipse(62,101,7,10,d.paint(colour))
    for x in (31,69):
        body += ellipse(x,126,13,9,d.paint(colour)) + ellipse(x,128,7,5,d.paint('cream'))
        for dx in (-5,0,5):
            body += circle(x+dx,122,1.8,d.paint('cream'))
    return body


def coffee(d):
    body = path('M20 31 H80 L73 124 Q73 131 50 131 Q27 131 27 124Z',d.paint('white'))
    body += path('M23 52 H77 L74 102 Q50 108 26 102Z',d.paint('orange'))
    body += rect(13,17,74,18,6,d.paint('orange')) + ellipse(50,17,32,5,d.paint('gold'))
    body += rect(20,33,60,5,2,d.paint('white')) + line('M28 59 L31 89','#fff0c9',2.5,'opacity=".4"')
    return body


def mitten(d):
    body = path('M34 115 C22 97 12 84 17 68 C19 60 26 63 29 70 L29 42 C29 22 46 9 61 13 C80 16 89 31 87 53 C90 74 82 96 74 115Z',d.paint('green'))
    body += ellipse(22,73,10,13,d.paint('cream'),'transform="rotate(15 22 73)"') + rect(31,112,46,21,7,d.paint('cream'))
    body += snowflake(58,67,17) + line('M36 35 Q40 24 49 21','#e1f8c6',2.4,'opacity=".4"')
    return body


def candle(d):
    body = rect(15,43,70,90,6,d.paint('red')) + ellipse(50,44,35,7,d.linear('red'))
    body += path('M15 43 Q50 52 85 43 V66 Q81 73 78 66 L78 56 Q74 50 69 55 V78 Q64 86 60 78 V60 Q56 54 52 62 V69 Q46 77 42 69 V60 Q36 56 33 63 V88 Q28 95 24 88 V58 Q19 54 15 59Z',d.paint('pink'))
    body += line('M50 44 L50 32','#71543c',2) + path('M50 9 C40 22 43 33 51 35 C62 32 60 20 50 9Z',d.paint('gold'))
    body += path('M51 22 Q45 32 51 33 Q55 29 51 22Z','#fff5c9') + line('M22 83 V118','#ffb5a6',2,'opacity=".4"')
    return body


def cheese(d):
    body = ellipse(51,74,38,59,d.paint('gold')) + path('M65 19 C90 32 97 88 76 124 Q88 109 85 77 Q84 42 65 19Z',d.linear('orange'))
    for x,y,rx,ry in [(35,39,7,9),(28,81,8,12),(51,61,6,7),(72,105,6,8),(47,122,5,5),(73,47,4,6)]:
        body += ellipse(x,y,rx,ry,'#edc37d') + ellipse(x+1,y+1,rx-1,ry-1,d.paint('yellow'))
    body += line('M28 48 Q22 60 22 70','#fff1a9',2,'opacity=".4"')
    return body


def crab(d):
    body = ''
    for left,right,yy in [(23,77,97),(21,79,110),(30,70,121)]:
        body += line(f'M{left} {yy-12} Q{left-14} {yy-10} {left-12} {yy+1} M{right} {yy-12} Q{right+14} {yy-10} {right+12} {yy+1}', '#f6b6a5',5)
    body += line('M27 78 Q11 68 17 46 M73 78 Q89 68 83 46','#f6b6a5',7)
    body += path('M17 56 C1 41 8 18 20 11 L20 29 L31 23 C36 38 31 49 17 56Z',d.paint('coral'))
    body += path('M83 56 C99 41 92 18 80 11 L80 29 L69 23 C64 38 69 49 83 56Z',d.paint('coral'))
    body += ellipse(50,86,33,31,d.paint('coral')) + eyes(d,38,62,81,3.6) + cheeks(d,29,72,91,7) + smile(50,94,5)
    body += line('M11 34 Q10 25 15 21 M89 34 Q90 25 85 21','#ffe5c9',2.4)
    return body


def clover(d):
    body = line('M51 78 Q46 111 53 132','#83cfb1',4)
    leaf = path('M50 70 C20 57 12 40 24 24 C37 9 50 22 50 33 C50 22 63 9 76 24 C88 40 80 57 50 70Z',d.paint('green'))
    body += ''.join(f'<g transform="rotate({angle} 50 70)">{leaf}</g>' for angle in (0,90,180,270))
    body += ''.join(f'<g transform="rotate({angle} 50 70)">' + line('M50 67 L50 36','#ddf6b6',1.6,'opacity=".4"') + '</g>' for angle in (0,90,180,270))
    body += circle(50,70,4,d.paint('green'))
    return body


def calendar(d, colour):
    body = path('M14 27 H80 L88 124 H13Z',d.linear(colour)) + rect(12,25,72,102,7,d.paint(colour))
    body += rect(19,54,58,59,7,d.paint('cream')) + label('25',48,65,44,'#509b81' if colour=='green' else '#cf7e92',1.85)
    for x in (29,48,67):
        body += rect(x-5,13,10,30,5,d.paint('dark' if colour=='green' else 'gold'))
        body += line(f'M{x-1} 18 V33', '#eaf0f3' if colour=='green' else '#fff3bb',1.7,'opacity=".4"')
    body += line('M19 120 H76',PALETTES[colour][0],2,'opacity=".5"')
    return body


def chips(d, source):
    name,text = {'green_chips_bag':('green','POTATO'),'red_snack_bag':('red','SNACK'),'purple_snack_bag':('purple','TARO'),'yellow_chips':('yellow','CHIPS')}[source]
    shape = path('M14 13 Q49 18 86 13 L82 30 Q88 72 83 111 L86 129 Q49 124 14 129 L18 111 Q13 71 18 30Z',d.linear(name))
    body = shape + path('M14 13 Q49 18 86 13 L84 23 Q49 26 16 23Z',d.paint(name)) + path('M16 119 Q49 122 84 119 L86 129 Q49 124 14 129Z',d.paint(name))
    body += line('M20 18 Q48 22 80 18',PALETTES[name][0],1.5,'opacity=".4"')
    if name == 'purple':
        body += label(text,50,39,39,'#8770b7',1.7)
        body += rect(26,63,48,4,2,'#e9dcff') + rect(32,74,37,3,1.5,'#e9dcff') + rect(29,84,43,3,1.5,'#e9dcff')
        body += rect(33,102,34,10,3,'#f0e5ff') + label('100',50,103,22,'#9f83c9',1)
    else:
        body += ellipse(50,61,29,22,d.paint('cream')) + label(text,50,53,45,{'yellow':'#bf8c71','red':'#c77c91','green':'#539b80'}[name],1.6)
        body += ellipse(39,104,13,8,d.paint('gold'),'transform="rotate(-25 39 104)"') + ellipse(61,104,13,8,d.paint('gold'),'transform="rotate(25 61 104)"')
        body += line('M30 102 L44 97 M33 106 L47 101 M55 99 L69 104 M52 103 L65 108','#fff0a4',1.5)
    body += line('M23 34 Q20 72 23 108',PALETTES[name][0],2,'opacity=".65"')
    return body


def watermelon(d):
    body = ellipse(50,77,40,53,d.paint('green')) + ellipse(50,64,37,41,d.paint('cream')) + ellipse(50,63,33,37,d.paint('red'))
    for x,y,angle in [(35,49,-20),(57,44,10),(70,59,25),(46,67,-10),(29,71,-25),(59,79,10),(41,88,-10)]:
        body += ellipse(x,y,1.8,3,d.paint('dark'),f'transform="rotate({angle} {x} {y})"')
    body += ''.join(line(f'M{x} 111 Q{x+3} 119 {x+1} 126','#7bc9a7',3,'opacity=".4"') for x in (26,41,57,72))
    body += path('M50 23 Q49 13 55 10',d.paint('green'), 'stroke="#86d6b0" stroke-width="3" stroke-linecap="round"')
    body += path('M52 23 Q35 19 25 28 Q43 26 49 32Z M54 23 Q67 19 79 31 Q63 25 58 33Z',d.paint('green'))
    return body


def make_model(item):
    """A complete recipe is required for every catalogue entry."""
    d = Drawing()
    source = item['source'].stem
    family = item['archetype']
    if family == 'pea_bunny':
        content = bunny(d, (item.get('hueMap') or {}).get('target','green'))
    elif family == 'xmas_tree': content = tree(d,source)
    elif family == 'xmas_reindeer': content = reindeer(d)
    elif family == 'xmas_gnome': content = gnome(d)
    elif family == 'stocking': content = stocking(d,source)
    elif family == 'red_pouch': content = pouch(d)
    elif family == 'bell': content = bell(d,source=='bronze_bell')
    elif family == 'gift_box': content = gift(d,source)
    elif family == 'done_bottle': content = bottle(d,source)
    elif family == 'bear_bottle': content = bottle(d,source,True)
    elif family == 'lollipop': content = lollipop(d,'pink' if source=='pink_lollipop' else 'green')
    elif family == 'frog': content = frog(d)
    elif family == 'chick': content = chick(d)
    elif family == 'cookie_bucket': content = cookie_bucket(d)
    elif family == 'milk_carton': content = milk(d,source)
    elif family == 'bear': content = bear(d,'purple' if source=='purple_bear' else 'orange')
    elif family == 'coffee_cup': content = coffee(d)
    elif family == 'mitten': content = mitten(d)
    elif family == 'candle': content = candle(d)
    elif family == 'cheese': content = cheese(d)
    elif family == 'crab': content = crab(d)
    elif family == 'clover': content = clover(d)
    elif family == 'calendar': content = calendar(d,'green' if source=='green_calendar' else 'red')
    elif family == 'chips': content = chips(d,source)
    elif family == 'watermelon': content = watermelon(d)
    else: raise ValueError(f'Missing authored model: {source} ({family})')
    return d.finish(content)

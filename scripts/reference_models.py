"""Complete vector models for the snowman and panda reference poses."""
from geometric_models import PALETTES


def snowman(hue_map=None):
    light, mid, dark = PALETTES[(hue_map or {}).get('target', 'blue')]
    defs = f'''<radialGradient id="snow" cx="33%" cy="28%" r="80%"><stop stop-color="#fff"/><stop offset=".58" stop-color="#f0f5fc"/><stop offset="1" stop-color="#c0d4ee"/></radialGradient>
<linearGradient id="hat" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="{light}"/><stop offset=".25" stop-color="{mid}"/><stop offset="1" stop-color="{dark}"/></linearGradient>
<linearGradient id="scarf"><stop stop-color="{light}"/><stop offset=".3" stop-color="{mid}"/><stop offset="1" stop-color="{dark}"/></linearGradient>
<radialGradient id="button" cx="30%" cy="25%" r="80%"><stop stop-color="{light}"/><stop offset=".7" stop-color="{mid}"/><stop offset="1" stop-color="{dark}"/></radialGradient>
<radialGradient id="nose" cx="30%" cy="25%"><stop stop-color="#ffcf72"/><stop offset="1" stop-color="#f3bb82"/></radialGradient>
<radialGradient id="blush"><stop stop-color="#ffb9d2" stop-opacity=".65"/><stop offset="1" stop-color="#edb5b8" stop-opacity="0"/></radialGradient>'''
    content = f'''<path d="M20 77 C7 87 2 107 7 121 C12 137 30 137 48 137 C68 137 77 130 77 117 C78 103 72 88 64 80Z" fill="url(#snow)"/>
<path d="M14 53 C17 47 29 44 42 45 C56 46 69 48 72 56 C77 64 72 76 64 79 C48 84 29 82 17 77 C9 71 10 59 14 53Z" fill="url(#snow)"/>
<ellipse cx="19" cy="68" rx="6" ry="5" fill="url(#blush)"/><ellipse cx="61" cy="68" rx="6" ry="5" fill="url(#blush)"/>
<ellipse cx="29" cy="59" rx="3.2" ry="3" fill="#424d51"/><ellipse cx="50" cy="60" rx="3.2" ry="3" fill="#424d51"/>
<circle cx="28.1" cy="58.2" r=".85" fill="#fff"/><circle cx="49.1" cy="59.2" r=".85" fill="#fff"/>
<ellipse cx="40" cy="66" rx="4" ry="3.6" fill="url(#nose)"/>
<g fill="#485252"><circle cx="32" cy="73" r="1.1"/><circle cx="37" cy="75" r="1.2"/><circle cx="43" cy="75" r="1.2"/><circle cx="49" cy="73" r="1.1"/></g>
<path d="M16 79 C12 85 6 101 3 119 Q8 123 17 122 L26 91Z" fill="url(#scarf)"/>
<path d="M16 82 C34 86 52 85 68 79 C73 82 74 86 73 92 C58 98 35 98 17 94 Q12 89 16 82Z" fill="url(#scarf)"/>
<path d="M18 84 Q43 91 68 82" fill="none" stroke="{light}" stroke-width="1.2" opacity=".65"/>
<path d="M10 48 C15 32 29 20 44 16 C57 16 67 32 72 46 Q75 51 70 55 C53 47 33 46 14 52 Q8 56 10 48Z" fill="url(#hat)"/>
<path d="M12 47 C27 40 48 41 69 48 Q73 50 70 55 C54 48 30 47 14 52 Q9 54 12 47Z" fill="url(#scarf)"/>
<path d="M44 16 C49 13 53 14 53 10 C54 6 50 6 49 3 C55 4 59 10 55 15 Q52 18 44 16Z" fill="url(#snow)"/>
<circle cx="34" cy="104" r="4.4" fill="url(#button)"/><circle cx="33" cy="103" r="1.1" fill="#fff" opacity=".8"/>
<circle cx="33" cy="121" r="4.6" fill="url(#button)"/><circle cx="32" cy="120" r="1.1" fill="#fff" opacity=".8"/>'''
    return defs, content


def panda():
    defs = '''<radialGradient id="fur" cx="40%" cy="25%" r="85%"><stop stop-color="#fff"/><stop offset=".55" stop-color="#f5f0f7"/><stop offset="1" stop-color="#d7c5dd"/></radialGradient>
<radialGradient id="dark" cx="30%" cy="25%" r="85%"><stop stop-color="#72809a"/><stop offset=".6" stop-color="#4b5975"/><stop offset="1" stop-color="#35445f"/></radialGradient>
<radialGradient id="pink" cx="40%" cy="30%"><stop stop-color="#ffdbeb"/><stop offset="1" stop-color="#eab4d2"/></radialGradient>
<radialGradient id="cheek"><stop stop-color="#e6a2af" stop-opacity=".65"/><stop offset="1" stop-color="#efbcc5" stop-opacity="0"/></radialGradient>'''
    content = '''<ellipse cx="19" cy="20" rx="9" ry="12" transform="rotate(25 19 20)" fill="url(#dark)"/>
<ellipse cx="78" cy="14" rx="9" ry="12" transform="rotate(-25 78 14)" fill="url(#dark)"/>
<ellipse cx="19" cy="19" rx="5" ry="7" transform="rotate(25 19 19)" fill="#d3d0e7"/>
<ellipse cx="78" cy="13" rx="5" ry="7" transform="rotate(-25 78 13)" fill="#d3d0e7"/>
<path d="M33 65 C26 75 20 92 24 107 C25 118 36 124 52 123 C75 125 85 116 86 102 C85 85 78 73 69 65Z" fill="url(#fur)"/>
<path d="M69 67 C83 68 89 86 84 96 C81 105 75 109 69 105 C60 103 66 94 68 86 Q71 75 69 67Z" fill="url(#dark)"/>
<path d="M18 28 C20 16 32 7 48 6 C65 4 78 16 84 27 C93 41 94 56 88 66 C83 77 70 80 55 79 C38 79 19 74 14 63 C10 53 13 37 18 28Z" fill="url(#fur)"/>
<ellipse cx="26" cy="61" rx="13" ry="11" fill="url(#cheek)"/><ellipse cx="78" cy="61" rx="12" ry="11" fill="url(#cheek)"/>
<path d="M25 42 C27 30 34 26 40 30 C46 34 48 43 44 45 Q31 49 25 47Z" fill="url(#dark)"/>
<path d="M56 29 C65 25 73 33 77 44 Q78 47 73 47 L59 46 C54 41 53 34 56 29Z" fill="url(#dark)"/>
<ellipse cx="38" cy="40" rx="3.3" ry="4" fill="#1b2025"/><ellipse cx="65" cy="40" rx="3.3" ry="4" fill="#1b2025"/>
<ellipse cx="39" cy="38.8" rx="1.4" ry="1" fill="#f6f9f7"/><ellipse cx="66" cy="38.8" rx="1.4" ry="1" fill="#f6f9f7"/>
<ellipse cx="52" cy="52" rx="10" ry="7" fill="#fff9f3"/>
<path d="M47 50 Q52 47 57 50 Q57 54 52 55 Q47 54 47 50Z" fill="#413633"/>
<path d="M49 60 Q54 57 58 60 Q56 65 52 65 Q49 64 49 60Z" fill="#45302e"/>
<path d="M26 61 C21 61 18 68 15 77 C11 86 14 93 23 96 C31 96 34 88 37 82 L44 68 Q42 61 36 60Z" fill="url(#dark)"/>
<path d="M8 104 C15 99 26 101 34 110 C40 117 37 125 26 124 L12 124 C4 123 1 111 8 104Z" fill="url(#dark)"/>
<path d="M72 108 C80 100 90 100 96 106 C101 113 96 124 88 125 L74 125 C67 123 65 115 72 108Z" fill="url(#dark)"/>
<ellipse cx="14" cy="116" rx="6" ry="5" transform="rotate(22 14 116)" fill="url(#pink)"/>
<ellipse cx="91" cy="116" rx="5" ry="6" transform="rotate(22 91 116)" fill="url(#pink)"/>
<g fill="#f3cee0"><circle cx="9" cy="107" r="1.5"/><circle cx="14" cy="106" r="1.5"/><circle cx="19" cy="108" r="1.5"/><circle cx="88" cy="106" r="1.5"/><circle cx="94" cy="108" r="1.5"/></g>'''
    return defs, content

#!/usr/bin/env node
/**
 * Procedural SVG Item Generator for Goods Sort 3D (收纳整理师)
 * Generates 15 base archetypes with 74 high-contrast, distinguishable variants.
 * 
 * Features:
 * - 100% Crisp Vector SVG (viewBox="0 0 100 100")
 * - 3D Gradients, Glossy Highlights, Outlines, and Drop Shadows
 * - Parameterized variations (e.g. Snowmen only vary hat/scarf style & color as requested)
 * - Maximum visual contrast to eliminate repetition and confusion
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const itemsDir = path.join(rootDir, 'assets', 'items');
if (!fs.existsSync(itemsDir)) {
  fs.mkdirSync(itemsDir, { recursive: true });
}

// Helper for SVG defs and wrappers
function wrapSvg(id, defs, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <!-- Common drop shadow for depth -->
    <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <radialGradient id="base-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    ${defs}
  </defs>
  <!-- Floor Contact Shadow -->
  <ellipse cx="50" cy="94" rx="34" ry="5.5" fill="url(#base-shadow)"/>
  <g filter="url(#shadow-${id})">
    ${content}
  </g>
</svg>`;
}

// ==========================================
// 1. SNOWMAN (雪人)
// Base body is classic snow white with carrot nose & coal buttons
// Variations ONLY change the Hat & Scarf style and colors!
// ==========================================
function renderSnowman(variant) {
  const { id, hatType, primaryColor, secondaryColor, pompomColor, pattern } = variant;
  const defs = `
    <radialGradient id="snow-body" cx="38%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#e3f2fd"/>
      <stop offset="100%" stop-color="#b0bec5"/>
    </radialGradient>
    <radialGradient id="snow-head" cx="38%" cy="28%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="#e8f5e9"/>
      <stop offset="100%" stop-color="#cfd8dc"/>
    </radialGradient>
    <linearGradient id="carrot-grad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#ff9f43"/>
      <stop offset="100%" stop-color="#ee5253"/>
    </linearGradient>
    <linearGradient id="hat-grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor[0]}"/>
      <stop offset="100%" stop-color="${primaryColor[1]}"/>
    </linearGradient>
    <linearGradient id="scarf-grad-${id}" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="${secondaryColor[0]}"/>
      <stop offset="100%" stop-color="${secondaryColor[1]}"/>
    </linearGradient>
  `;

  // Hat generation based on hatType
  let hatSvg = '';
  if (hatType === 'santa') {
    // Red pointed Santa hat drooping to right
    hatSvg = `
      <!-- Santa pointed cap -->
      <path d="M33,31 Q48,10 70,18 Q82,24 84,34 Q80,36 74,32 Q62,20 49,27 Z" fill="url(#hat-grad-${id})" stroke="#333" stroke-width="0.8"/>
      <!-- Fluffy brim -->
      <rect x="31" y="27" width="38" height="7" rx="3.5" fill="#ffffff" stroke="#cfd8dc" stroke-width="0.8"/>
      <!-- Fluffy pompom ball -->
      <circle cx="85" cy="36" r="5" fill="#ffffff" stroke="#cfd8dc" stroke-width="0.8"/>
    `;
  } else if (hatType === 'beanie') {
    // Winter knitted beanie with ribbed lines and round top pompom
    hatSvg = `
      <!-- Beanie dome -->
      <path d="M33,31 C33,14 67,14 67,31 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Rib lines on beanie -->
      <path d="M42,19 Q44,28 45,30 M50,17 Q50,28 50,30 M58,19 Q56,28 55,30" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Fold brim -->
      <rect x="31" y="26" width="38" height="7" rx="2" fill="url(#scarf-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Top pompom -->
      <circle cx="50" cy="14" r="5.5" fill="${pompomColor}" stroke="#333" stroke-width="0.8"/>
    `;
  } else if (hatType === 'tophat') {
    // Magician / formal top hat with gold band
    hatSvg = `
      <!-- Hat cylinder -->
      <rect x="37" y="12" width="26" height="18" rx="2" fill="url(#hat-grad-${id})" stroke="#111" stroke-width="0.8"/>
      <!-- Gold trim band -->
      <rect x="37" y="24" width="26" height="4" fill="${secondaryColor[0]}" stroke="#333" stroke-width="0.5"/>
      <!-- Hat brim -->
      <ellipse cx="50" cy="29" rx="21" ry="4" fill="url(#hat-grad-${id})" stroke="#111" stroke-width="0.8"/>
    `;
  } else if (hatType === 'elf') {
    // Pointed elf hat with curled tip & jingle bell
    hatSvg = `
      <!-- Curled elf hat -->
      <path d="M33,30 Q45,15 62,11 Q74,8 78,3 Q72,12 55,24 Q44,27 35,30 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Scalloped brim -->
      <path d="M31,27 L37,32 L43,27 L50,32 L57,27 L63,32 L69,27 L68,32 L32,32 Z" fill="url(#scarf-grad-${id})" stroke="#222" stroke-width="0.6"/>
      <!-- Bell at tip -->
      <circle cx="78" cy="3" r="3.8" fill="#f1c40f" stroke="#d35400" stroke-width="0.8"/>
    `;
  } else if (hatType === 'warmknit') {
    // Warm earflap winter cap
    hatSvg = `
      <path d="M33,30 C33,16 67,16 67,30 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Left ear flap -->
      <path d="M34,29 L32,37 Q34,40 37,37 L38,29 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Right ear flap -->
      <path d="M66,29 L68,37 Q66,40 63,37 L62,29 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <!-- Top fluffy ball -->
      <circle cx="50" cy="15" r="5" fill="${pompomColor}" stroke="#333" stroke-width="0.8"/>
    `;
  } else {
    // Twin pompom bobble hat
    hatSvg = `
      <path d="M34,31 C34,16 66,16 66,31 Z" fill="url(#hat-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <rect x="32" y="27" width="36" height="6" rx="2" fill="url(#scarf-grad-${id})" stroke="#222" stroke-width="0.8"/>
      <circle cx="37" cy="16" r="4.5" fill="${pompomColor}" stroke="#333" stroke-width="0.8"/>
      <circle cx="63" cy="16" r="4.5" fill="${pompomColor}" stroke="#333" stroke-width="0.8"/>
    `;
  }

  const content = `
    <!-- Twig Arms -->
    <path d="M30,62 L15,54 M18,56 L14,60 M21,54 L20,49" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M70,62 L85,54 M82,56 L86,60 M79,54 L80,49" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Bottom Snowball Body -->
    <circle cx="50" cy="69" r="23" fill="url(#snow-body)" stroke="#90a4ae" stroke-width="1"/>
    
    <!-- Coal Buttons on Body -->
    <circle cx="50" cy="62" r="2.2" fill="#2d3436"/>
    <circle cx="50" cy="70" r="2.2" fill="#2d3436"/>
    <circle cx="50" cy="78" r="2.2" fill="#2d3436"/>
    <circle cx="49.2" cy="61.2" r="0.6" fill="#fff"/>
    <circle cx="49.2" cy="69.2" r="0.6" fill="#fff"/>

    <!-- Head Snowball -->
    <circle cx="50" cy="40" r="16.5" fill="url(#snow-head)" stroke="#90a4ae" stroke-width="0.8"/>

    <!-- Blush Cheeks -->
    <ellipse cx="40" cy="43" rx="2.5" ry="1.5" fill="#ff7675" opacity="0.65"/>
    <ellipse cx="60" cy="43" rx="2.5" ry="1.5" fill="#ff7675" opacity="0.65"/>

    <!-- Coal Eyes -->
    <circle cx="44" cy="38" r="2.2" fill="#2d3436"/>
    <circle cx="56" cy="38" r="2.2" fill="#2d3436"/>
    <circle cx="43.3" cy="37.3" r="0.7" fill="#ffffff"/>
    <circle cx="55.3" cy="37.3" r="0.7" fill="#ffffff"/>

    <!-- Carrot Nose -->
    <polygon points="50,40 66,43 50,44" fill="url(#carrot-grad)" stroke="#d35400" stroke-width="0.5"/>

    <!-- Happy Coal Smile -->
    <circle cx="44" cy="46" r="1" fill="#2d3436"/>
    <circle cx="47" cy="47.5" r="1" fill="#2d3436"/>
    <circle cx="50" cy="48" r="1" fill="#2d3436"/>
    <circle cx="53" cy="47.5" r="1" fill="#2d3436"/>
    <circle cx="56" cy="46" r="1" fill="#2d3436"/>

    <!-- Neck Scarf -->
    <!-- Scarf neck loop -->
    <path d="M34,49 Q50,55 66,49 Q67,54 64,57 Q50,62 36,57 Z" fill="url(#scarf-grad-${id})" stroke="#222" stroke-width="0.8"/>
    <!-- Scarf hanging tail with fringes -->
    <path d="M54,54 L59,71 L67,70 L62,54 Z" fill="url(#scarf-grad-${id})" stroke="#222" stroke-width="0.8"/>
    <!-- Scarf fringe cuts -->
    <line x1="60" y1="71" x2="60" y2="74" stroke="${secondaryColor[0]}" stroke-width="1.2"/>
    <line x1="63" y1="71" x2="63" y2="74" stroke="${secondaryColor[0]}" stroke-width="1.2"/>
    <line x1="66" y1="70" x2="66" y2="73" stroke="${secondaryColor[0]}" stroke-width="1.2"/>

    <!-- Hat -->
    ${hatSvg}
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 2. BOBA & BEVERAGE CUPS (奶茶/冷饮杯)
// ==========================================
function renderBoba(variant) {
  const { id, liquidGrad, strawColor, topping, drinkName } = variant;
  const defs = `
    <linearGradient id="cup-liquid-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${liquidGrad[0]}"/>
      <stop offset="100%" stop-color="${liquidGrad[1]}"/>
    </linearGradient>
    <linearGradient id="cup-glare" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  `;

  let toppingSvg = '';
  if (topping === 'pearls_strawberry') {
    toppingSvg = `
      <!-- Tapioca Pearls -->
      <circle cx="40" cy="81" r="3" fill="#2d3436"/><circle cx="48" cy="83" r="3" fill="#2d3436"/>
      <circle cx="56" cy="82" r="3" fill="#2d3436"/><circle cx="62" cy="80" r="3" fill="#2d3436"/>
      <circle cx="44" cy="76" r="3" fill="#2d3436"/><circle cx="52" cy="77" r="3" fill="#2d3436"/>
      <!-- Strawberry Garnish on rim -->
      <path d="M62,28 Q75,18 72,32 Q68,36 62,34 Z" fill="#e74c3c" stroke="#c0392b" stroke-width="0.8"/>
      <circle cx="68" cy="27" r="0.7" fill="#fff"/><circle cx="66" cy="31" r="0.7" fill="#fff"/>
      <path d="M60,30 L63,26 L66,29 Z" fill="#2ecc71"/>
    `;
  } else if (topping === 'pearls_matcha') {
    toppingSvg = `
      <circle cx="40" cy="81" r="3" fill="#1b2a1a"/><circle cx="48" cy="83" r="3" fill="#1b2a1a"/>
      <circle cx="56" cy="82" r="3" fill="#1b2a1a"/><circle cx="62" cy="80" r="3" fill="#1b2a1a"/>
      <!-- Mint leaf on lid -->
      <path d="M60,28 Q70,22 66,32 Q58,32 60,28 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="0.8"/>
      <line x1="60" y1="28" x2="65" y2="30" stroke="#1b5e20" stroke-width="0.6"/>
    `;
  } else if (topping === 'citrus_wheel') {
    toppingSvg = `
      <!-- Lemon/Orange Wheel Garnish -->
      <circle cx="65" cy="30" r="10" fill="#f1c40f" stroke="#d68910" stroke-width="1.5"/>
      <circle cx="65" cy="30" r="8" fill="#f39c12"/>
      <path d="M65,22 L65,38 M57,30 L73,30 M59,24 L71,36 M59,36 L71,24" stroke="#fff" stroke-width="1"/>
      <circle cx="65" cy="30" r="2" fill="#fff"/>
    `;
  } else if (topping === 'stars_ice') {
    toppingSvg = `
      <!-- Ice Cubes -->
      <rect x="40" y="45" width="10" height="10" rx="2" fill="rgba(255,255,255,0.4)" stroke="#fff" stroke-width="0.6"/>
      <rect x="52" y="52" width="11" height="11" rx="2" fill="rgba(255,255,255,0.4)" stroke="#fff" stroke-width="0.6"/>
      <!-- Floating glitter stars -->
      <polygon points="45,68 47,72 51,72 48,74 49,78 45,75 41,78 42,74 39,72 43,72" fill="#ffeaa7"/>
      <polygon points="57,75 58,78 61,78 59,80 60,83 57,81 54,83 55,80 53,78 56,78" fill="#ffeaa7"/>
    `;
  } else if (topping === 'whipped_cream') {
    toppingSvg = `
      <!-- Whipped Cream Swirl -->
      <path d="M35,32 Q50,15 65,32 Q60,20 50,18 Q40,20 35,32 Z" fill="#ffffff" stroke="#e0e0e0" stroke-width="0.8"/>
      <!-- Caramel Drizzle -->
      <path d="M38,28 Q44,22 50,28 Q56,22 62,28" stroke="#d35400" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Chocolate chips at bottom -->
      <rect x="42" y="79" width="5" height="5" rx="1" fill="#3e2723"/>
      <rect x="52" y="80" width="5" height="5" rx="1" fill="#3e2723"/>
      <rect x="60" y="78" width="5" height="5" rx="1" fill="#3e2723"/>
    `;
  } else {
    // Tropical lime & mint
    toppingSvg = `
      <rect x="42" y="50" width="12" height="12" rx="2" fill="rgba(255,255,255,0.45)" stroke="#fff" stroke-width="0.8"/>
      <circle cx="64" cy="30" r="9" fill="#2ecc71" stroke="#27ae60" stroke-width="1.2"/>
      <circle cx="64" cy="30" r="7.2" fill="#a8e6cf"/>
      <line x1="64" y1="23" x2="64" y2="37" stroke="#fff" stroke-width="0.8"/>
      <line x1="57" y1="30" x2="71" y2="30" stroke="#fff" stroke-width="0.8"/>
    `;
  }

  const content = `
    <!-- Angled Straw -->
    <path d="M50,30 L64,8" stroke="${strawColor}" stroke-width="5" stroke-linecap="round"/>
    <path d="M50,30 L64,8" stroke="#fff" stroke-width="1.2" stroke-dasharray="3,3" stroke-linecap="round"/>

    <!-- Cup Liquid Body -->
    <path d="M30,36 L36,86 Q50,91 64,86 L70,36 Z" fill="url(#cup-liquid-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Toppings & Extras -->
    ${toppingSvg}

    <!-- Translucent Cup Shell & Glare -->
    <path d="M28,34 L35,88 Q50,93 65,88 L72,34 Z" fill="none" stroke="#dfe6e9" stroke-width="1.5"/>
    <path d="M31,37 L36,85 Q40,86 42,85 L37,37 Z" fill="url(#cup-glare)"/>

    <!-- Cup Dome Lid -->
    <path d="M26,34 Q50,22 74,34 Z" fill="rgba(255,255,255,0.75)" stroke="#b2bec3" stroke-width="1.2"/>
    <rect x="25" y="32" width="50" height="4" rx="2" fill="#ecf0f1" stroke="#95a5a6" stroke-width="1"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 3. GIFT BOX (礼品盒)
// ==========================================
function renderGiftBox(variant) {
  const { id, boxColor, ribbonColor, pattern } = variant;
  const defs = `
    <linearGradient id="box-body-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${boxColor[0]}"/>
      <stop offset="100%" stop-color="${boxColor[1]}"/>
    </linearGradient>
    <linearGradient id="box-lid-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${boxColor[2] || boxColor[0]}"/>
      <stop offset="100%" stop-color="${boxColor[1]}"/>
    </linearGradient>
    <linearGradient id="ribbon-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ribbonColor[0]}"/>
      <stop offset="100%" stop-color="${ribbonColor[1]}"/>
    </linearGradient>
  `;

  const content = `
    <!-- Box Body -->
    <rect x="24" y="44" width="52" height="42" rx="4" fill="url(#box-body-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Optional Polka or Stripes Pattern on Box -->
    ${pattern === 'dots' ? `
      <circle cx="33" cy="54" r="2.5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="43" cy="74" r="2.5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="67" cy="54" r="2.5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="57" cy="74" r="2.5" fill="rgba(255,255,255,0.3)"/>
    ` : ''}

    <!-- Vertical Ribbon on Body -->
    <rect x="44" y="44" width="12" height="42" fill="url(#ribbon-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Horizontal Ribbon on Body -->
    <rect x="24" y="58" width="52" height="10" fill="url(#ribbon-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Box Lid (overhangs body) -->
    <rect x="20" y="36" width="60" height="12" rx="3" fill="url(#box-lid-${id})" stroke="#222" stroke-width="1.2"/>
    <rect x="44" y="36" width="12" height="12" fill="url(#ribbon-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Big Fluffy Ribbon Bow on Top -->
    <!-- Left loop -->
    <path d="M47,36 C35,20 22,25 36,36 C42,37 46,37 48,36 Z" fill="url(#ribbon-${id})" stroke="#222" stroke-width="1"/>
    <!-- Right loop -->
    <path d="M53,36 C65,20 78,25 64,36 C58,37 54,37 52,36 Z" fill="url(#ribbon-${id})" stroke="#222" stroke-width="1"/>
    <!-- Center knot -->
    <circle cx="50" cy="36" r="4.5" fill="url(#ribbon-${id})" stroke="#222" stroke-width="1"/>
    <circle cx="48.5" cy="34.5" r="1.2" fill="#fff" opacity="0.6"/>

    <!-- Curled Ribbon ends hanging down -->
    <path d="M46,39 Q38,48 42,54" stroke="${ribbonColor[0]}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M54,39 Q62,48 58,54" stroke="${ribbonColor[0]}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 4. MILK CARTON (屋顶包牛奶盒)
// High-visibility fruit/flavor emblem on front!
// ==========================================
function renderMilkCarton(variant) {
  const { id, cartonColor, roofColor, badgeType } = variant;
  const defs = `
    <linearGradient id="milk-carton-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${cartonColor[0]}"/>
      <stop offset="100%" stop-color="${cartonColor[1]}"/>
    </linearGradient>
    <linearGradient id="milk-roof-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${roofColor[0]}"/>
      <stop offset="100%" stop-color="${roofColor[1]}"/>
    </linearGradient>
  `;

  let badgeSvg = '';
  if (badgeType === 'strawberry') {
    badgeSvg = `
      <!-- Big Strawberry 🍓 -->
      <path d="M50,56 C42,56 38,64 42,72 C46,80 50,83 50,83 C50,83 54,80 58,72 C62,64 58,56 50,56 Z" fill="#e74c3c" stroke="#c0392b" stroke-width="0.8"/>
      <!-- Seeds -->
      <circle cx="46" cy="65" r="0.7" fill="#fff"/><circle cx="54" cy="65" r="0.7" fill="#fff"/>
      <circle cx="50" cy="71" r="0.7" fill="#fff"/><circle cx="48" cy="77" r="0.7" fill="#fff"/>
      <!-- Leaves on top -->
      <path d="M45,57 Q50,52 47,49 Q50,53 53,49 Q50,52 55,57 Z" fill="#2ecc71"/>
    `;
  } else if (badgeType === 'banana') {
    badgeSvg = `
      <!-- Bananas 🍌 -->
      <path d="M42,74 C40,65 48,54 62,54 C56,58 48,65 49,76 C46,76 43,76 42,74 Z" fill="#f1c40f" stroke="#d68910" stroke-width="0.8"/>
      <path d="M37,76 C35,68 43,59 55,59 C50,63 44,69 44,78 Z" fill="#f39c12"/>
      <!-- Tips -->
      <circle cx="62" cy="54" r="1.2" fill="#795548"/>
      <circle cx="40" cy="76" r="1.5" fill="#5d4037"/>
    `;
  } else if (badgeType === 'chocolate') {
    badgeSvg = `
      <!-- Chocolate Bar 🍫 -->
      <rect x="40" y="56" width="20" height="24" rx="2" fill="#4e342e" stroke="#3e2723" stroke-width="1"/>
      <rect x="42" y="58" width="7" height="9" rx="1" fill="#6d4c41"/>
      <rect x="51" y="58" width="7" height="9" rx="1" fill="#6d4c41"/>
      <rect x="42" y="69" width="7" height="9" rx="1" fill="#6d4c41"/>
      <rect x="51" y="69" width="7" height="9" rx="1" fill="#6d4c41"/>
    `;
  } else if (badgeType === 'matcha') {
    badgeSvg = `
      <!-- Matcha Leaves 🍃 -->
      <path d="M50,55 C40,58 38,72 50,78 C62,72 60,58 50,55 Z" fill="#00b894" stroke="#00a382" stroke-width="0.8"/>
      <line x1="50" y1="57" x2="50" y2="76" stroke="#55efc4" stroke-width="1"/>
      <line x1="50" y1="64" x2="44" y2="60" stroke="#55efc4" stroke-width="0.8"/>
      <line x1="50" y1="68" x2="56" y2="64" stroke="#55efc4" stroke-width="0.8"/>
    `;
  } else if (badgeType === 'blueberry') {
    badgeSvg = `
      <!-- Blueberries -->
      <circle cx="45" cy="71" r="6" fill="#4834d4" stroke="#30336b" stroke-width="0.8"/>
      <circle cx="55" cy="71" r="6" fill="#30336b" stroke="#130f40" stroke-width="0.8"/>
      <circle cx="50" cy="63" r="6" fill="#686de0" stroke="#4834d4" stroke-width="0.8"/>
      <!-- Star crowns -->
      <polygon points="50,61 51,63 53,63 51,64 52,66 50,65 48,66 49,64 47,63 49,63" fill="#130f40"/>
    `;
  } else {
    // Classic Milk Splash & Cow Spots 🥛
    badgeSvg = `
      <!-- Milk Drop -->
      <path d="M50,55 C44,63 41,69 41,73 C41,78 45,82 50,82 C55,82 59,78 59,73 C59,69 56,63 50,55 Z" fill="#0984e3"/>
      <path d="M50,58 C46,65 44,70 44,73 C44,76 47,79 50,79 C53,79 56,76 56,73 C56,70 54,65 50,58 Z" fill="#ffffff"/>
      <circle cx="47" cy="70" r="1.5" fill="#74b9ff"/>
    `;
  }

  const content = `
    <!-- Carton Body -->
    <rect x="28" y="38" width="44" height="48" rx="3" fill="url(#milk-carton-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- White Label Field on Front -->
    <rect x="33" y="48" width="34" height="34" rx="4" fill="#ffffff" stroke="#e0e0e0" stroke-width="0.8"/>

    <!-- Flavor Emblem Badge -->
    ${badgeSvg}

    <!-- Gable Roof (Triangular Front + Side Slope) -->
    <!-- Gable Crest Flap -->
    <rect x="35" y="16" width="30" height="7" fill="#ffffff" stroke="#222" stroke-width="1"/>
    <!-- Triangular Roof Peak -->
    <polygon points="50,23 28,38 72,38" fill="url(#milk-roof-${id})" stroke="#222" stroke-width="1.2"/>
    <!-- Center Crease -->
    <line x1="50" y1="23" x2="50" y2="38" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 5. TEDDY BEAR (毛绒小熊)
// ==========================================
function renderTeddyBear(variant) {
  const { id, furColor, muzzleColor, bowtieColor, isPanda } = variant;
  const defs = `
    <radialGradient id="bear-fur-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${furColor[0]}"/>
      <stop offset="100%" stop-color="${furColor[1]}"/>
    </radialGradient>
    <linearGradient id="bear-bow-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bowtieColor[0]}"/>
      <stop offset="100%" stop-color="${bowtieColor[1]}"/>
    </linearGradient>
  `;

  const content = `
    <!-- Bear Ears -->
    <circle cx="32" cy="30" r="10" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="1"/>
    <circle cx="68" cy="30" r="10" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="1"/>
    <!-- Inner ear pads -->
    <circle cx="32" cy="30" r="5.5" fill="${isPanda ? '#2d3436' : muzzleColor}" opacity="0.8"/>
    <circle cx="68" cy="30" r="5.5" fill="${isPanda ? '#2d3436' : muzzleColor}" opacity="0.8"/>

    <!-- Bear Body -->
    <ellipse cx="50" cy="68" r="22" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="1"/>
    <!-- Belly patch -->
    <ellipse cx="50" cy="70" rx="13" ry="14" fill="${muzzleColor}" opacity="0.9"/>

    <!-- Paws -->
    <circle cx="28" cy="68" r="6" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="0.8"/>
    <circle cx="72" cy="68" r="6" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Bear Head -->
    <circle cx="50" cy="44" r="19" fill="url(#bear-fur-${id})" stroke="#222" stroke-width="1"/>

    ${isPanda ? `
      <!-- Panda Eye Patches -->
      <ellipse cx="42" cy="42" rx="5" ry="4" fill="#2d3436" transform="rotate(-15 42 42)"/>
      <ellipse cx="58" cy="42" rx="5" ry="4" fill="#2d3436" transform="rotate(15 58 42)"/>
    ` : ''}

    <!-- Eyes -->
    <circle cx="42" cy="42" r="2.5" fill="#111"/>
    <circle cx="58" cy="42" r="2.5" fill="#111"/>
    <circle cx="41.2" cy="41.2" r="0.8" fill="#fff"/>
    <circle cx="57.2" cy="41.2" r="0.8" fill="#fff"/>

    <!-- Muzzle / Snout -->
    <ellipse cx="50" cy="49" rx="8" ry="6" fill="${muzzleColor}" stroke="#333" stroke-width="0.6"/>
    <!-- Nose -->
    <path d="M47,46 Q50,45 53,46 Q50,50 47,46 Z" fill="#2d3436"/>
    <!-- Mouth -->
    <path d="M47,51 Q50,53 53,51" stroke="#2d3436" stroke-width="1" fill="none" stroke-linecap="round"/>

    <!-- Bowtie / Neck accessory -->
    <polygon points="42,59 50,62 42,65" fill="url(#bear-bow-${id})" stroke="#222" stroke-width="0.8"/>
    <polygon points="58,59 50,62 58,65" fill="url(#bear-bow-${id})" stroke="#222" stroke-width="0.8"/>
    <circle cx="50" cy="62" r="2.5" fill="url(#bear-bow-${id})" stroke="#222" stroke-width="0.8"/>

    ${isPanda ? `
      <!-- Bamboo sprig held by panda -->
      <path d="M68,58 Q72,50 78,48" stroke="#00b894" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M72,52 Q78,51 76,46 Q71,49 72,52 Z" fill="#55efc4"/>
    ` : ''}
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 6. CUTE BUNNY (萌萌小兔)
// ==========================================
function renderBunny(variant) {
  const { id, bodyColor, innerEarColor, heldItem } = variant;
  const defs = `
    <radialGradient id="bunny-body-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${bodyColor[0]}"/>
      <stop offset="100%" stop-color="${bodyColor[1]}"/>
    </radialGradient>
  `;

  let heldSvg = '';
  if (heldItem === 'carrot') {
    heldSvg = `
      <!-- Carrot 🥕 -->
      <polygon points="45,66 56,78 48,72" fill="#ff7675" stroke="#d63031" stroke-width="0.8"/>
      <path d="M43,65 L39,60 M44,64 L42,58 M46,65 L46,59" stroke="#2ecc71" stroke-width="1.8" stroke-linecap="round"/>
    `;
  } else if (heldItem === 'strawberry') {
    heldSvg = `
      <circle cx="50" cy="70" r="7" fill="#e74c3c" stroke="#c0392b" stroke-width="0.8"/>
      <circle cx="48" cy="68" r="0.8" fill="#fff"/><circle cx="52" cy="72" r="0.8" fill="#fff"/>
      <path d="M47,63 L50,60 L53,63 Z" fill="#2ecc71"/>
    `;
  } else if (heldItem === 'clover') {
    heldSvg = `
      <circle cx="47" cy="68" r="3.5" fill="#2ecc71"/>
      <circle cx="53" cy="68" r="3.5" fill="#2ecc71"/>
      <circle cx="50" cy="65" r="3.5" fill="#2ecc71"/>
      <circle cx="50" cy="72" r="3.5" fill="#2ecc71"/>
      <path d="M50,72 Q50,78 54,80" stroke="#27ae60" stroke-width="1.5" fill="none"/>
    `;
  } else if (heldItem === 'bell') {
    heldSvg = `
      <path d="M45,67 Q50,63 55,67 L57,75 L43,75 Z" fill="#f1c40f" stroke="#d68910" stroke-width="0.8"/>
      <circle cx="50" cy="76" r="2" fill="#e67e22"/>
    `;
  } else {
    // Star ⭐
    heldSvg = `
      <polygon points="50,62 52,67 57,67 53,70 55,75 50,72 45,75 47,70 43,67 48,67" fill="#f1c40f" stroke="#f39c12" stroke-width="0.8"/>
    `;
  }

  const content = `
    <!-- Long Bunny Ears -->
    <!-- Left Ear -->
    <path d="M37,42 C30,22 34,8 41,10 C46,12 45,28 42,42 Z" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="1"/>
    <path d="M38,38 C34,24 36,14 40,15 C44,16 43,26 41,38 Z" fill="${innerEarColor}"/>
    <!-- Right Ear -->
    <path d="M63,42 C70,22 66,8 59,10 C54,12 55,28 58,42 Z" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="1"/>
    <path d="M62,38 C66,24 64,14 60,15 C56,16 57,26 59,38 Z" fill="${innerEarColor}"/>

    <!-- Bunny Body -->
    <ellipse cx="50" cy="69" rx="20" ry="18" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="1"/>

    <!-- Bunny Head -->
    <circle cx="50" cy="46" r="18" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="1"/>

    <!-- Blush Cheeks -->
    <ellipse cx="38" cy="49" rx="3" ry="2" fill="#ff7675" opacity="0.6"/>
    <ellipse cx="62" cy="49" rx="3" ry="2" fill="#ff7675" opacity="0.6"/>

    <!-- Eyes -->
    <circle cx="43" cy="44" r="2.2" fill="#2d3436"/>
    <circle cx="57" cy="44" r="2.2" fill="#2d3436"/>
    <circle cx="42.3" cy="43.3" r="0.7" fill="#fff"/>
    <circle cx="56.3" cy="43.3" r="0.7" fill="#fff"/>

    <!-- Nose & Mouth -->
    <polygon points="48,48 52,48 50,50" fill="#e84393"/>
    <path d="M47,52 Q50,54 53,52" stroke="#2d3436" stroke-width="0.8" fill="none"/>

    <!-- Held Accessory -->
    ${heldSvg}

    <!-- Paws holding accessory -->
    <circle cx="43" cy="68" r="3.5" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="0.6"/>
    <circle cx="57" cy="68" r="3.5" fill="url(#bunny-body-${id})" stroke="#222" stroke-width="0.6"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 7. SWIRL LOLLIPOP (旋涡棒棒糖)
// ==========================================
function renderLollipop(variant) {
  const { id, swirlColors, bowColor } = variant;
  const defs = `
    <radialGradient id="lollipop-gloss" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  `;

  const content = `
    <!-- White Paper Stick -->
    <rect x="47" y="48" width="6" height="42" rx="3" fill="#ffffff" stroke="#b2bec3" stroke-width="1"/>

    <!-- Candy Disk Base -->
    <circle cx="50" cy="38" r="26" fill="${swirlColors[0]}" stroke="#222" stroke-width="1.2"/>

    <!-- Spiral Swirl Blades -->
    <path d="M50,38 Q50,16 66,22 Q76,38 50,38 Z" fill="${swirlColors[1]}"/>
    <path d="M50,38 Q72,38 66,54 Q50,64 50,38 Z" fill="${swirlColors[1]}"/>
    <path d="M50,38 Q50,60 34,54 Q24,38 50,38 Z" fill="${swirlColors[1]}"/>
    <path d="M50,38 Q28,38 34,22 Q50,12 50,38 Z" fill="${swirlColors[1]}"/>

    ${swirlColors[2] ? `
      <!-- 3rd Color Accent Pinwheel -->
      <path d="M50,38 Q58,24 64,28 Q60,38 50,38 Z" fill="${swirlColors[2]}"/>
      <path d="M50,38 Q64,48 58,54 Q50,46 50,38 Z" fill="${swirlColors[2]}"/>
      <path d="M50,38 Q42,52 36,48 Q40,38 50,38 Z" fill="${swirlColors[2]}"/>
      <path d="M50,38 Q36,28 42,22 Q50,30 50,38 Z" fill="${swirlColors[2]}"/>
    ` : ''}

    <!-- Center Glossy Bead -->
    <circle cx="50" cy="38" r="6" fill="${swirlColors[0]}" stroke="#fff" stroke-width="1"/>

    <!-- Glossy Highlight Overlay -->
    <circle cx="50" cy="38" r="26" fill="url(#lollipop-gloss)"/>

    <!-- Cute Bow Tie at stick junction -->
    <polygon points="42,62 50,65 42,68" fill="${bowColor}" stroke="#222" stroke-width="0.8"/>
    <polygon points="58,62 50,65 58,68" fill="${bowColor}" stroke="#222" stroke-width="0.8"/>
    <circle cx="50" cy="65" r="2.5" fill="${bowColor}" stroke="#222" stroke-width="0.8"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 8. JAM / HONEY CANNING JAR (果酱/蜂蜜罐)
// ==========================================
function renderJamJar(variant) {
  const { id, jamColor, clothColor, fruitType } = variant;
  const defs = `
    <linearGradient id="jam-liquid-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${jamColor[0]}"/>
      <stop offset="100%" stop-color="${jamColor[1]}"/>
    </linearGradient>
  `;

  let fruitSvg = '';
  if (fruitType === 'strawberry') {
    fruitSvg = `
      <path d="M50,61 C45,61 42,67 45,73 C48,78 50,80 50,80 C50,80 52,78 55,73 C58,67 55,61 50,61 Z" fill="#e74c3c"/>
      <circle cx="48" cy="68" r="0.6" fill="#fff"/><circle cx="52" cy="72" r="0.6" fill="#fff"/>
      <path d="M47,61 L50,58 L53,61 Z" fill="#2ecc71"/>
    `;
  } else if (fruitType === 'honeybee') {
    fruitSvg = `
      <!-- Honeybee 🐝 -->
      <ellipse cx="50" cy="70" rx="6" ry="4.5" fill="#f1c40f" stroke="#2d3436" stroke-width="0.8"/>
      <line x1="48" y1="66" x2="48" y2="74" stroke="#2d3436" stroke-width="1.2"/>
      <line x1="52" y1="66" x2="52" y2="74" stroke="#2d3436" stroke-width="1.2"/>
      <!-- Wings -->
      <ellipse cx="48" cy="64" rx="2.5" ry="4" fill="rgba(255,255,255,0.85)" stroke="#74b9ff" stroke-width="0.6"/>
      <ellipse cx="52" cy="64" rx="2.5" ry="4" fill="rgba(255,255,255,0.85)" stroke="#74b9ff" stroke-width="0.6"/>
    `;
  } else if (fruitType === 'blueberry') {
    fruitSvg = `
      <circle cx="47" cy="71" r="4.5" fill="#4834d4"/>
      <circle cx="53" cy="71" r="4.5" fill="#30336b"/>
      <circle cx="50" cy="65" r="4.5" fill="#686de0"/>
    `;
  } else if (fruitType === 'kiwi') {
    fruitSvg = `
      <circle cx="50" cy="70" r="7" fill="#2ecc71" stroke="#27ae60" stroke-width="0.8"/>
      <circle cx="50" cy="70" r="3" fill="#ecf0f1"/>
      <circle cx="48" cy="68" r="0.6" fill="#000"/><circle cx="52" cy="68" r="0.6" fill="#000"/>
      <circle cx="48" cy="72" r="0.6" fill="#000"/><circle cx="52" cy="72" r="0.6" fill="#000"/>
    `;
  } else {
    // Orange slice
    fruitSvg = `
      <circle cx="50" cy="70" r="7.5" fill="#f39c12" stroke="#d35400" stroke-width="0.8"/>
      <circle cx="50" cy="70" r="6" fill="#e67e22"/>
      <line x1="50" y1="64" x2="50" y2="76" stroke="#fff" stroke-width="0.8"/>
      <line x1="44" y1="70" x2="56" y2="70" stroke="#fff" stroke-width="0.8"/>
    `;
  }

  const content = `
    <!-- Glass Jar Body -->
    <rect x="28" y="44" width="44" height="42" rx="10" fill="url(#jam-liquid-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Front White Label -->
    <rect x="34" y="55" width="32" height="26" rx="5" fill="#ffffff" stroke="#e0e0e0" stroke-width="0.8"/>
    ${fruitSvg}

    <!-- Jar Glass Glare -->
    <path d="M31,48 L31,80 Q34,84 37,84 L37,48 Z" fill="rgba(255,255,255,0.3)"/>

    <!-- Cloth Checkered Lid Overhang -->
    <path d="M22,38 Q50,30 78,38 L75,46 Q68,42 64,46 Q56,42 50,46 Q44,42 36,46 Q32,42 25,46 Z" fill="${clothColor}" stroke="#222" stroke-width="1"/>

    <!-- Tied String Ribbon around Neck -->
    <line x1="26" y1="44" x2="74" y2="44" stroke="#d35400" stroke-width="2"/>
    <circle cx="50" cy="44" r="2.5" fill="#e67e22"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 9. CUPCAKE (奶油纸杯蛋糕)
// ==========================================
function renderCupcake(variant) {
  const { id, frostingGrad, cupColor, toppingType } = variant;
  const defs = `
    <linearGradient id="cupcake-frost-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${frostingGrad[0]}"/>
      <stop offset="100%" stop-color="${frostingGrad[1]}"/>
    </linearGradient>
  `;

  let toppingSvg = '';
  if (toppingType === 'cherry') {
    toppingSvg = `
      <!-- Cherry 🍒 -->
      <circle cx="50" cy="22" r="5.5" fill="#d63031" stroke="#c0392b" stroke-width="0.8"/>
      <circle cx="48" cy="20" r="1.2" fill="#fff"/>
      <path d="M50,17 Q58,6 64,12" stroke="#27ae60" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `;
  } else if (toppingType === 'star') {
    toppingSvg = `
      <!-- Star ⭐ -->
      <polygon points="50,12 52,17 57,17 53,20 55,25 50,22 45,25 47,20 43,17 48,17" fill="#f1c40f" stroke="#f39c12" stroke-width="0.8"/>
    `;
  } else if (toppingType === 'candycane') {
    toppingSvg = `
      <!-- Candy Cane -->
      <path d="M48,26 L48,14 Q48,9 53,9 Q58,9 58,14 L58,18" stroke="#e74c3c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M48,26 L48,14 Q48,9 53,9 Q58,9 58,14 L58,18" stroke="#fff" stroke-width="1" stroke-dasharray="2,2" fill="none" stroke-linecap="round"/>
    `;
  } else if (toppingType === 'berries') {
    toppingSvg = `
      <circle cx="47" cy="22" r="3.5" fill="#6c5ce7"/>
      <circle cx="53" cy="22" r="3.5" fill="#a29bfe"/>
      <circle cx="50" cy="18" r="3.5" fill="#fd79a8"/>
    `;
  } else {
    // Red Beans / Matcha
    toppingSvg = `
      <ellipse cx="48" cy="21" rx="2.5" ry="3.5" fill="#c0392b"/>
      <ellipse cx="53" cy="21" rx="2.5" ry="3.5" fill="#962d22"/>
    `;
  }

  const content = `
    <!-- Pleated Baking Paper Cup -->
    <polygon points="28,54 34,88 66,88 72,54" fill="${cupColor}" stroke="#222" stroke-width="1.2"/>
    <!-- Pleat ridges -->
    <line x1="36" y1="54" x2="40" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <line x1="44" y1="54" x2="47" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <line x1="52" y1="54" x2="53" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <line x1="60" y1="54" x2="60" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>

    <!-- Sponge Cake Rim -->
    <ellipse cx="50" cy="54" rx="23" ry="5" fill="#f5cd79" stroke="#eccc68" stroke-width="1"/>

    <!-- Frosting Swirl Layers -->
    <!-- Bottom swirl tier -->
    <path d="M24,53 Q32,44 50,44 Q68,44 76,53 Q66,57 50,57 Q34,57 24,53 Z" fill="url(#cupcake-frost-${id})" stroke="#222" stroke-width="1"/>
    <!-- Middle swirl tier -->
    <path d="M29,45 Q37,34 50,34 Q63,34 71,45 Q62,48 50,48 Q38,48 29,45 Z" fill="url(#cupcake-frost-${id})" stroke="#222" stroke-width="1"/>
    <!-- Top peak swirl -->
    <path d="M36,36 Q44,24 50,22 Q56,24 64,36 Q56,38 50,38 Q44,38 36,36 Z" fill="url(#cupcake-frost-${id})" stroke="#222" stroke-width="1"/>

    <!-- Colorful Sprinkles -->
    <rect x="36" y="47" width="3" height="1.5" rx="0.5" fill="#ff4757" transform="rotate(25 36 47)"/>
    <rect x="62" y="48" width="3" height="1.5" rx="0.5" fill="#2ed573" transform="rotate(-30 62 48)"/>
    <rect x="44" y="38" width="3" height="1.5" rx="0.5" fill="#ffa502" transform="rotate(40 44 38)"/>
    <rect x="56" y="37" width="3" height="1.5" rx="0.5" fill="#1e90ff" transform="rotate(-15 56 37)"/>

    <!-- Peak Topping -->
    ${toppingSvg}
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 10. FESTIVE PINE TREE (节日小树)
// ==========================================
function renderPineTree(variant) {
  const { id, foliageGrad, starColor, baubleColor } = variant;
  const defs = `
    <linearGradient id="tree-foliage-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${foliageGrad[0]}"/>
      <stop offset="100%" stop-color="${foliageGrad[1]}"/>
    </linearGradient>
  `;

  const content = `
    <!-- Tree Trunk -->
    <rect x="44" y="78" width="12" height="12" rx="2" fill="#795548" stroke="#4e342e" stroke-width="1"/>

    <!-- Bottom Tier Branches -->
    <path d="M22,78 L50,56 L78,78 Q64,74 50,78 Q36,74 22,78 Z" fill="url(#tree-foliage-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Middle Tier Branches -->
    <path d="M27,62 L50,42 L73,62 Q60,59 50,62 Q40,59 27,62 Z" fill="url(#tree-foliage-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Top Tier Branches -->
    <path d="M33,46 L50,26 L67,46 Q58,43 50,46 Q42,43 33,46 Z" fill="url(#tree-foliage-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Baubles / Ornaments -->
    <circle cx="36" cy="74" r="3.2" fill="${baubleColor[0]}" stroke="#fff" stroke-width="0.6"/>
    <circle cx="64" cy="74" r="3.2" fill="${baubleColor[1] || baubleColor[0]}" stroke="#fff" stroke-width="0.6"/>
    <circle cx="42" cy="58" r="3" fill="${baubleColor[1] || baubleColor[0]}" stroke="#fff" stroke-width="0.6"/>
    <circle cx="58" cy="58" r="3" fill="${baubleColor[0]}" stroke="#fff" stroke-width="0.6"/>
    <circle cx="50" cy="40" r="2.8" fill="${baubleColor[0]}" stroke="#fff" stroke-width="0.6"/>

    <!-- Top Pinnacle Star ⭐ -->
    <polygon points="50,16 53,23 60,23 54,27 57,34 50,30 43,34 46,27 40,23 47,23" fill="${starColor}" stroke="#e67e22" stroke-width="0.8"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 11. FESTIVE BELL (节日铃铛)
// ==========================================
function renderBell(variant) {
  const { id, metalGrad, bowColor } = variant;
  const defs = `
    <linearGradient id="bell-metal-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${metalGrad[0]}"/>
      <stop offset="50%" stop-color="${metalGrad[1]}"/>
      <stop offset="100%" stop-color="${metalGrad[2] || metalGrad[1]}"/>
    </linearGradient>
  `;

  const content = `
    <!-- Clapper Ball at bottom -->
    <circle cx="50" cy="80" r="5" fill="#333"/>
    <circle cx="50" cy="81" r="4" fill="${metalGrad[1]}"/>

    <!-- Bell Body -->
    <path d="M50,28 C37,28 32,46 30,68 C27,76 22,78 22,81 L78,81 C78,78 73,76 70,68 C68,46 63,28 50,28 Z" fill="url(#bell-metal-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Flared Lip Rim -->
    <ellipse cx="50" cy="81" rx="28" ry="4" fill="url(#bell-metal-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Engraved Snowflake / Star Emblem on Bell -->
    <polygon points="50,48 51.5,53 56,53 52,56 54,61 50,58 46,61 48,56 44,53 48.5,53" fill="rgba(255,255,255,0.7)"/>

    <!-- Big Decorative Ribbon Bow on Top -->
    <path d="M48,28 C36,14 24,19 37,28 Z" fill="${bowColor}" stroke="#222" stroke-width="1"/>
    <path d="M52,28 C64,14 76,19 63,28 Z" fill="${bowColor}" stroke="#222" stroke-width="1"/>
    <circle cx="50" cy="28" r="3.5" fill="${bowColor}" stroke="#222" stroke-width="1"/>
    <!-- Ribbon trails -->
    <path d="M46,31 Q38,40 42,46" stroke="${bowColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M54,31 Q62,40 58,46" stroke="${bowColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 12. CROWN FROG (荷叶萌蛙)
// ==========================================
function renderFrog(variant) {
  const { id, frogColor, accessoryType } = variant;
  const defs = `
    <radialGradient id="frog-skin-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${frogColor[0]}"/>
      <stop offset="100%" stop-color="${frogColor[1]}"/>
    </radialGradient>
  `;

  let accSvg = '';
  if (accessoryType === 'crown') {
    accSvg = `
      <!-- Royal Golden Crown 👑 -->
      <polygon points="40,24 43,14 50,19 57,14 60,24" fill="#f1c40f" stroke="#d68910" stroke-width="0.8"/>
      <circle cx="43" cy="14" r="1.5" fill="#e74c3c"/>
      <circle cx="50" cy="19" r="1.5" fill="#3498db"/>
      <circle cx="57" cy="14" r="1.5" fill="#e74c3c"/>
      <rect x="40" y="24" width="20" height="3" fill="#f39c12"/>
    `;
  } else if (accessoryType === 'flower') {
    accSvg = `
      <!-- Waterlily Flower 🌸 -->
      <circle cx="64" cy="26" r="3.5" fill="#ff7675"/>
      <circle cx="70" cy="26" r="3.5" fill="#ff7675"/>
      <circle cx="67" cy="21" r="3.5" fill="#ff7675"/>
      <circle cx="67" cy="26" r="2.5" fill="#f1c40f"/>
    `;
  } else if (accessoryType === 'bowtie') {
    accSvg = `
      <!-- Red Dapper Bowtie 🎀 -->
      <polygon points="40,65 50,68 40,71" fill="#e74c3c" stroke="#222" stroke-width="0.8"/>
      <polygon points="60,65 50,68 60,71" fill="#e74c3c" stroke="#222" stroke-width="0.8"/>
      <circle cx="50" cy="68" r="2.5" fill="#c0392b" stroke="#222" stroke-width="0.8"/>
    `;
  } else {
    // Poison dart spots
    accSvg = `
      <circle cx="45" cy="52" r="2" fill="#f1c40f"/>
      <circle cx="55" cy="52" r="2" fill="#f1c40f"/>
      <circle cx="50" cy="60" r="2.5" fill="#f1c40f"/>
    `;
  }

  const content = `
    <!-- Frog Eyes Protrusions -->
    <circle cx="36" cy="34" r="10" fill="url(#frog-skin-${id})" stroke="#222" stroke-width="1"/>
    <circle cx="64" cy="34" r="10" fill="url(#frog-skin-${id})" stroke="#222" stroke-width="1"/>

    <!-- Frog Big Head / Body -->
    <ellipse cx="50" cy="56" rx="26" ry="22" fill="url(#frog-skin-${id})" stroke="#222" stroke-width="1.2"/>
    <!-- Cream belly -->
    <ellipse cx="50" cy="64" rx="15" ry="11" fill="#e8f5e9" opacity="0.8"/>

    <!-- Eyes (Big and cute) -->
    <circle cx="36" cy="34" r="6" fill="#ffffff" stroke="#333" stroke-width="0.8"/>
    <circle cx="64" cy="34" r="6" fill="#ffffff" stroke="#333" stroke-width="0.8"/>
    <circle cx="37" cy="34" r="3.5" fill="#2d3436"/>
    <circle cx="63" cy="34" r="3.5" fill="#2d3436"/>
    <circle cx="35.5" cy="32.5" r="1.2" fill="#ffffff"/>
    <circle cx="61.5" cy="32.5" r="1.2" fill="#ffffff"/>

    <!-- Blush Cheeks -->
    <ellipse cx="32" cy="54" rx="3.5" ry="2" fill="#ff7675" opacity="0.6"/>
    <ellipse cx="68" cy="54" rx="3.5" ry="2" fill="#ff7675" opacity="0.6"/>

    <!-- Nostrils -->
    <circle cx="47" cy="48" r="0.8" fill="#2d3436"/>
    <circle cx="53" cy="48" r="0.8" fill="#2d3436"/>

    <!-- Wide Happy Smile -->
    <path d="M38,55 Q50,65 62,55" stroke="#2d3436" stroke-width="1.8" fill="none" stroke-linecap="round"/>

    <!-- Front Webbed Paws -->
    <circle cx="38" cy="74" r="4.5" fill="url(#frog-skin-${id})" stroke="#222" stroke-width="0.8"/>
    <circle cx="62" cy="74" r="4.5" fill="url(#frog-skin-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Accessory -->
    ${accSvg}
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 13. SNACK / CHIP BAG (膨化零食袋)
// ==========================================
function renderSnackBag(variant) {
  const { id, bagGrad, badgeColor, flavorIcon } = variant;
  const defs = `
    <linearGradient id="snack-bag-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bagGrad[0]}"/>
      <stop offset="100%" stop-color="${bagGrad[1]}"/>
    </linearGradient>
  `;

  let iconSvg = '';
  if (flavorIcon === 'flame') {
    iconSvg = `
      <!-- Chili / Hot Crisp -->
      <path d="M50,56 Q42,66 48,74 Q52,70 54,64 Q58,60 50,56 Z" fill="#e74c3c"/>
      <path d="M50,62 Q46,68 50,72 Q52,69 50,62 Z" fill="#f1c40f"/>
    `;
  } else if (flavorIcon === 'seaweed') {
    iconSvg = `
      <!-- Seaweed Nori & Lime -->
      <rect x="42" y="58" width="16" height="12" rx="1" fill="#1b5e20" transform="rotate(-10 50 64)"/>
      <circle cx="56" cy="68" r="4.5" fill="#2ecc71"/>
    `;
  } else if (flavorIcon === 'cheese') {
    iconSvg = `
      <!-- Cheese Wedge 🧀 -->
      <polygon points="40,70 60,62 58,74" fill="#f1c40f" stroke="#d68910" stroke-width="0.8"/>
      <circle cx="48" cy="68" r="1.5" fill="#d35400"/>
      <circle cx="54" cy="67" r="1.2" fill="#d35400"/>
    `;
  } else {
    // Sweet Potato
    iconSvg = `
      <ellipse cx="50" cy="66" rx="9" ry="5.5" fill="#8e44ad" transform="rotate(20 50 66)"/>
      <ellipse cx="50" cy="66" rx="7" ry="3.5" fill="#f39c12" transform="rotate(20 50 66)"/>
    `;
  }

  const content = `
    <!-- Bag Main Pillow Body -->
    <rect x="25" y="24" width="50" height="58" rx="6" fill="url(#snack-bag-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Crimped Top Edge (Zig-zag) -->
    <path d="M24,24 L27,20 L30,24 L33,20 L36,24 L39,20 L42,24 L45,20 L48,24 L51,20 L54,24 L57,20 L60,24 L63,20 L66,24 L69,20 L72,24 L75,20 L76,24 Z" fill="url(#snack-bag-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Crimped Bottom Edge -->
    <path d="M24,82 L27,86 L30,82 L33,86 L36,82 L39,86 L42,82 L45,86 L48,82 L51,86 L54,82 L57,86 L60,82 L63,86 L66,82 L69,86 L72,82 L75,86 L76,82 Z" fill="url(#snack-bag-${id})" stroke="#222" stroke-width="0.8"/>

    <!-- Center Flavor Badge Oval -->
    <ellipse cx="50" cy="54" rx="18" ry="20" fill="#ffffff" stroke="${badgeColor}" stroke-width="2"/>
    <text x="50" y="44" font-size="7" font-weight="900" fill="${badgeColor}" text-anchor="middle" font-family="sans-serif">CRISP</text>
    ${iconSvg}

    <!-- Bag Sheen Glare -->
    <path d="M28,28 L34,78 Q36,80 39,78 L33,28 Z" fill="rgba(255,255,255,0.25)"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 14. COFFEE & COCOA MUG (暖心马克杯)
// ==========================================
function renderCoffeeMug(variant) {
  const { id, mugColor, drinkColor, toppingType } = variant;
  const defs = `
    <linearGradient id="mug-body-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${mugColor[0]}"/>
      <stop offset="100%" stop-color="${mugColor[1]}"/>
    </linearGradient>
  `;

  let topSvg = '';
  if (toppingType === 'marshmallows') {
    topSvg = `
      <!-- White Mini Marshmallows -->
      <rect x="38" y="38" width="6" height="5" rx="1.5" fill="#ffffff" stroke="#ddd" stroke-width="0.5"/>
      <rect x="47" y="36" width="6" height="5" rx="1.5" fill="#ffffff" stroke="#ddd" stroke-width="0.5"/>
      <rect x="54" y="39" width="6" height="5" rx="1.5" fill="#ffffff" stroke="#ddd" stroke-width="0.5"/>
    `;
  } else if (toppingType === 'heart') {
    topSvg = `
      <!-- Foam Heart Latte Art -->
      <path d="M50,42 C46,36 38,38 43,44 L50,48 L57,44 C62,38 54,36 50,42 Z" fill="#ffffff" opacity="0.9"/>
    `;
  } else if (toppingType === 'lemon') {
    topSvg = `
      <circle cx="50" cy="40" r="5" fill="#f1c40f" stroke="#d68910" stroke-width="0.6"/>
      <line x1="50" y1="35" x2="50" y2="45" stroke="#fff" stroke-width="0.5"/>
      <line x1="45" y1="40" x2="55" y2="40" stroke="#fff" stroke-width="0.5"/>
    `;
  } else {
    // Whipped Cream swirl
    topSvg = `
      <path d="M42,42 Q50,30 58,42 Z" fill="#ffffff"/>
      <line x1="56" y1="44" x2="64" y2="28" stroke="#8d6e63" stroke-width="2.5" stroke-linecap="round"/>
    `;
  }

  const content = `
    <!-- Steam Trails -->
    <path d="M44,28 Q41,20 46,14" stroke="rgba(255,255,255,0.7)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M52,26 Q56,18 51,12" stroke="rgba(255,255,255,0.7)" stroke-width="1.8" fill="none" stroke-linecap="round"/>

    <!-- Curved Mug Handle -->
    <path d="M66,48 Q82,48 82,62 Q82,76 66,76" stroke="${mugColor[0]}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M66,48 Q82,48 82,62 Q82,76 66,76" stroke="#222" stroke-width="1.2" fill="none"/>

    <!-- Ceramic Mug Body -->
    <rect x="26" y="40" width="44" height="42" rx="6" fill="url(#mug-body-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Liquid Surface Rim -->
    <ellipse cx="48" cy="40" rx="22" ry="7" fill="${drinkColor}" stroke="#222" stroke-width="1"/>

    <!-- Front Emblem (Snowflake or Star) -->
    <polygon points="48,56 49,60 53,60 50,62 51,66 48,64 45,66 46,62 43,60 47,60" fill="rgba(255,255,255,0.85)"/>

    <!-- Topping Treats -->
    ${topSvg}
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// 15. MAGIC POTION BOTTLE (魔法药水瓶)
// ==========================================
function renderPotionBottle(variant) {
  const { id, liquidGrad, glowColor, sparkleIcon } = variant;
  const defs = `
    <radialGradient id="potion-liquid-${id}" cx="40%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${liquidGrad[0]}"/>
      <stop offset="100%" stop-color="${liquidGrad[1]}"/>
    </radialGradient>
  `;

  let symbolSvg = '';
  if (sparkleIcon === 'heart') {
    symbolSvg = `
      <path d="M50,64 C46,58 38,60 43,67 L50,73 L57,67 C62,60 54,58 50,64 Z" fill="#ffffff" opacity="0.85"/>
    `;
  } else if (sparkleIcon === 'ice') {
    symbolSvg = `
      <polygon points="50,58 52,64 58,64 53,68 55,74 50,70 45,74 47,68 42,64 48,64" fill="#ffffff" opacity="0.85"/>
    `;
  } else if (sparkleIcon === 'leaf') {
    symbolSvg = `
      <path d="M50,58 C42,60 40,70 50,75 C60,70 58,60 50,58 Z" fill="#ffffff" opacity="0.85"/>
    `;
  } else {
    // Star sparkles
    symbolSvg = `
      <polygon points="50,60 52,65 57,65 53,68 55,73 50,70 45,73 47,68 43,65 48,65" fill="#f1c40f"/>
    `;
  }

  const content = `
    <!-- Wooden Cork Stopper -->
    <polygon points="44,20 56,20 54,28 46,28" fill="#a0522d" stroke="#5d4037" stroke-width="1"/>

    <!-- Bottle Neck Glass -->
    <rect x="44" y="27" width="12" height="12" fill="rgba(255,255,255,0.7)" stroke="#222" stroke-width="1.2"/>
    <ellipse cx="50" cy="27" rx="7" ry="2.5" fill="#ecf0f1" stroke="#222" stroke-width="1"/>

    <!-- Round Flask Body -->
    <circle cx="50" cy="65" r="23" fill="url(#potion-liquid-${id})" stroke="#222" stroke-width="1.2"/>

    <!-- Glowing Liquid Surface Line -->
    <ellipse cx="50" cy="50" rx="19" ry="5" fill="${liquidGrad[0]}" opacity="0.7"/>

    <!-- Bubbles -->
    <circle cx="42" cy="72" r="2.5" fill="rgba(255,255,255,0.6)"/>
    <circle cx="58" cy="68" r="1.8" fill="rgba(255,255,255,0.6)"/>
    <circle cx="48" cy="58" r="1.5" fill="rgba(255,255,255,0.6)"/>

    <!-- Center Magic Glyphs -->
    ${symbolSvg}

    <!-- Glass Specular Highlight -->
    <path d="M33,52 C31,60 34,72 40,77" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  `;

  return wrapSvg(id, defs, content);
}

// ==========================================
// MASTER ITEM REGISTRY (74 Distinct Variants across 15 Archetypes)
// ==========================================
const ITEM_DEFINITIONS = [
  // 1. SNOWMAN (雪人) - 6 Variants (Hat & Scarf variations only as requested!)
  {
    id: 'snowman_red',
    name: '圣诞红帽雪人',
    archetype: 'snowman',
    colorGroup: 'red',
    render: () => renderSnowman({
      id: 'snowman_red',
      hatType: 'santa',
      primaryColor: ['#e74c3c', '#c0392b'],
      secondaryColor: ['#d63031', '#ffffff'],
      pompomColor: '#ffffff'
    })
  },
  {
    id: 'snowman_blue',
    name: '冰蓝毛线雪人',
    archetype: 'snowman',
    colorGroup: 'blue',
    render: () => renderSnowman({
      id: 'snowman_blue',
      hatType: 'beanie',
      primaryColor: ['#0984e3', '#00cec9'],
      secondaryColor: ['#74b9ff', '#0984e3'],
      pompomColor: '#81ecec'
    })
  },
  {
    id: 'snowman_green',
    name: '精灵绿帽雪人',
    archetype: 'snowman',
    colorGroup: 'green',
    render: () => renderSnowman({
      id: 'snowman_green',
      hatType: 'elf',
      primaryColor: ['#00b894', '#009472'],
      secondaryColor: ['#f1c40f', '#00b894'],
      pompomColor: '#f1c40f'
    })
  },
  {
    id: 'snowman_purple',
    name: '绅士礼帽雪人',
    archetype: 'snowman',
    colorGroup: 'purple',
    render: () => renderSnowman({
      id: 'snowman_purple',
      hatType: 'tophat',
      primaryColor: ['#6c5ce7', '#4834d4'],
      secondaryColor: ['#fed330', '#6c5ce7'],
      pompomColor: '#fed330'
    })
  },
  {
    id: 'snowman_yellow',
    name: '暖阳针织雪人',
    archetype: 'snowman',
    colorGroup: 'yellow',
    render: () => renderSnowman({
      id: 'snowman_yellow',
      hatType: 'warmknit',
      primaryColor: ['#f1c40f', '#e67e22'],
      secondaryColor: ['#f39c12', '#d35400'],
      pompomColor: '#ffffff'
    })
  },
  {
    id: 'snowman_pink',
    name: '甜心粉耳雪人',
    archetype: 'snowman',
    colorGroup: 'pink',
    render: () => renderSnowman({
      id: 'snowman_pink',
      hatType: 'twinpompom',
      primaryColor: ['#fd79a8', '#e84393'],
      secondaryColor: ['#ffffff', '#fd79a8'],
      pompomColor: '#ffffff'
    })
  },

  // 2. BOBA & BEVERAGE CUPS (奶茶冷饮) - 6 Variants
  {
    id: 'boba_strawberry',
    name: '草莓波波奶茶',
    archetype: 'boba',
    colorGroup: 'pink',
    render: () => renderBoba({
      id: 'boba_strawberry',
      liquidGrad: ['#ff7675', '#fd79a8'],
      strawColor: '#e84393',
      topping: 'pearls_strawberry'
    })
  },
  {
    id: 'boba_matcha',
    name: '翡翠抹茶奶绿',
    archetype: 'boba',
    colorGroup: 'green',
    render: () => renderBoba({
      id: 'boba_matcha',
      liquidGrad: ['#55efc4', '#00b894'],
      strawColor: '#00b894',
      topping: 'pearls_matcha'
    })
  },
  {
    id: 'boba_orange',
    name: '鲜橙柠檬气泡',
    archetype: 'boba',
    colorGroup: 'yellow',
    render: () => renderBoba({
      id: 'boba_orange',
      liquidGrad: ['#ffeaa7', '#f39c12'],
      strawColor: '#d35400',
      topping: 'citrus_wheel'
    })
  },
  {
    id: 'boba_blueberry',
    name: '星空蓝莓冰饮',
    archetype: 'boba',
    colorGroup: 'purple',
    render: () => renderBoba({
      id: 'boba_blueberry',
      liquidGrad: ['#a29bfe', '#6c5ce7'],
      strawColor: '#6c5ce7',
      topping: 'stars_ice'
    })
  },
  {
    id: 'boba_chocolate',
    name: '浓醇巧乐厚乳',
    archetype: 'boba',
    colorGroup: 'brown',
    render: () => renderBoba({
      id: 'boba_chocolate',
      liquidGrad: ['#8d6e63', '#4e342e'],
      strawColor: '#d35400',
      topping: 'whipped_cream'
    })
  },
  {
    id: 'boba_cyan',
    name: '蓝柑海盐苏打',
    archetype: 'boba',
    colorGroup: 'blue',
    render: () => renderBoba({
      id: 'boba_cyan',
      liquidGrad: ['#81ecec', '#0984e3'],
      strawColor: '#f1c40f',
      topping: 'tropical_lime'
    })
  },

  // 3. GIFT BOX (礼盒) - 6 Variants
  {
    id: 'gift_pink_gold',
    name: '樱粉金带礼盒',
    archetype: 'gift_box',
    colorGroup: 'pink',
    render: () => renderGiftBox({
      id: 'gift_pink_gold',
      boxColor: ['#fd79a8', '#e84393'],
      ribbonColor: ['#fed330', '#f1c40f']
    })
  },
  {
    id: 'gift_blue_white',
    name: '宝石蓝白礼盒',
    archetype: 'gift_box',
    colorGroup: 'blue',
    render: () => renderGiftBox({
      id: 'gift_blue_white',
      boxColor: ['#0984e3', '#0652dd'],
      ribbonColor: ['#ffffff', '#dfe6e9']
    })
  },
  {
    id: 'gift_green_red',
    name: '翡翠红带礼盒',
    archetype: 'gift_box',
    colorGroup: 'green',
    render: () => renderGiftBox({
      id: 'gift_green_red',
      boxColor: ['#00b894', '#009472'],
      ribbonColor: ['#e74c3c', '#c0392b']
    })
  },
  {
    id: 'gift_yellow_purple',
    name: '暖黄紫带礼盒',
    archetype: 'gift_box',
    colorGroup: 'yellow',
    render: () => renderGiftBox({
      id: 'gift_yellow_purple',
      boxColor: ['#fed330', '#f1c40f'],
      ribbonColor: ['#6c5ce7', '#4834d4']
    })
  },
  {
    id: 'gift_red_gold',
    name: '正红金带礼盒',
    archetype: 'gift_box',
    colorGroup: 'red',
    render: () => renderGiftBox({
      id: 'gift_red_gold',
      boxColor: ['#e74c3c', '#c0392b'],
      ribbonColor: ['#fed330', '#f1c40f']
    })
  },
  {
    id: 'gift_purple_yellow',
    name: '魅惑紫黄礼盒',
    archetype: 'gift_box',
    colorGroup: 'purple',
    render: () => renderGiftBox({
      id: 'gift_purple_yellow',
      boxColor: ['#8e44ad', '#6c3483'],
      ribbonColor: ['#f1c40f', '#e67e22'],
      pattern: 'dots'
    })
  },

  // 4. MILK CARTON (屋顶包牛奶) - 6 Variants
  {
    id: 'milk_classic',
    name: '纯香鲜牛奶',
    archetype: 'milk_carton',
    colorGroup: 'blue',
    render: () => renderMilkCarton({
      id: 'milk_classic',
      cartonColor: ['#74b9ff', '#0984e3'],
      roofColor: ['#ffffff', '#dfe6e9'],
      badgeType: 'classic'
    })
  },
  {
    id: 'milk_strawberry',
    name: '草莓甜心奶',
    archetype: 'milk_carton',
    colorGroup: 'pink',
    render: () => renderMilkCarton({
      id: 'milk_strawberry',
      cartonColor: ['#ff7675', '#fd79a8'],
      roofColor: ['#ffffff', '#ffccd2'],
      badgeType: 'strawberry'
    })
  },
  {
    id: 'milk_banana',
    name: '浓香香蕉奶',
    archetype: 'milk_carton',
    colorGroup: 'yellow',
    render: () => renderMilkCarton({
      id: 'milk_banana',
      cartonColor: ['#ffeaa7', '#f1c40f'],
      roofColor: ['#ffffff', '#fdf5e6'],
      badgeType: 'banana'
    })
  },
  {
    id: 'milk_matcha',
    name: '宇治抹茶乳',
    archetype: 'milk_carton',
    colorGroup: 'green',
    render: () => renderMilkCarton({
      id: 'milk_matcha',
      cartonColor: ['#55efc4', '#00b894'],
      roofColor: ['#ffffff', '#e8f8f5'],
      badgeType: 'matcha'
    })
  },
  {
    id: 'milk_chocolate',
    name: '丝滑巧克力奶',
    archetype: 'milk_carton',
    colorGroup: 'brown',
    render: () => renderMilkCarton({
      id: 'milk_chocolate',
      cartonColor: ['#8d6e63', '#5d4037'],
      roofColor: ['#ffffff', '#efebe9'],
      badgeType: 'chocolate'
    })
  },
  {
    id: 'milk_blueberry',
    name: '蓝莓营养奶',
    archetype: 'milk_carton',
    colorGroup: 'purple',
    render: () => renderMilkCarton({
      id: 'milk_blueberry',
      cartonColor: ['#a29bfe', '#6c5ce7'],
      roofColor: ['#ffffff', '#f3e5f5'],
      badgeType: 'blueberry'
    })
  },

  // 5. TEDDY BEAR (毛绒熊) - 6 Variants
  {
    id: 'bear_brown',
    name: '焦糖泰迪熊',
    archetype: 'teddy_bear',
    colorGroup: 'brown',
    render: () => renderTeddyBear({
      id: 'bear_brown',
      furColor: ['#d35400', '#ba4a00'],
      muzzleColor: '#fdebd0',
      bowtieColor: ['#e74c3c', '#c0392b']
    })
  },
  {
    id: 'bear_polar',
    name: '极地雪白熊',
    archetype: 'teddy_bear',
    colorGroup: 'white',
    render: () => renderTeddyBear({
      id: 'bear_polar',
      furColor: ['#ffffff', '#dfe6e9'],
      muzzleColor: '#b2bec3',
      bowtieColor: ['#0984e3', '#00cec9']
    })
  },
  {
    id: 'bear_pink',
    name: '粉樱草莓熊',
    archetype: 'teddy_bear',
    colorGroup: 'pink',
    render: () => renderTeddyBear({
      id: 'bear_pink',
      furColor: ['#fd79a8', '#e84393'],
      muzzleColor: '#ffeaa7',
      bowtieColor: ['#ffffff', '#fd79a8']
    })
  },
  {
    id: 'bear_panda',
    name: '国宝小熊猫',
    archetype: 'teddy_bear',
    colorGroup: 'black_white',
    render: () => renderTeddyBear({
      id: 'bear_panda',
      furColor: ['#ffffff', '#dfe6e9'],
      muzzleColor: '#ffffff',
      bowtieColor: ['#00b894', '#009472'],
      isPanda: true
    })
  },
  {
    id: 'bear_purple',
    name: '梦幻紫星熊',
    archetype: 'teddy_bear',
    colorGroup: 'purple',
    render: () => renderTeddyBear({
      id: 'bear_purple',
      furColor: ['#a55eea', '#8854d0'],
      muzzleColor: '#f5cd79',
      bowtieColor: ['#fed330', '#f1c40f']
    })
  },
  {
    id: 'bear_mint',
    name: '薄荷清凉熊',
    archetype: 'teddy_bear',
    colorGroup: 'green',
    render: () => renderTeddyBear({
      id: 'bear_mint',
      furColor: ['#55efc4', '#00b894'],
      muzzleColor: '#ffffff',
      bowtieColor: ['#f1c40f', '#e67e22']
    })
  },

  // 6. CUTE BUNNY (萌萌兔) - 5 Variants
  {
    id: 'bunny_white',
    name: '胡萝卜白兔',
    archetype: 'bunny',
    colorGroup: 'white',
    render: () => renderBunny({
      id: 'bunny_white',
      bodyColor: ['#ffffff', '#dfe6e9'],
      innerEarColor: '#ffb8b8',
      heldItem: 'carrot'
    })
  },
  {
    id: 'bunny_pink',
    name: '草莓甜心兔',
    archetype: 'bunny',
    colorGroup: 'pink',
    render: () => renderBunny({
      id: 'bunny_pink',
      bodyColor: ['#fd79a8', '#e84393'],
      innerEarColor: '#ffffff',
      heldItem: 'strawberry'
    })
  },
  {
    id: 'bunny_mint',
    name: '薄荷幸运兔',
    archetype: 'bunny',
    colorGroup: 'green',
    render: () => renderBunny({
      id: 'bunny_mint',
      bodyColor: ['#55efc4', '#00b894'],
      innerEarColor: '#ffffff',
      heldItem: 'clover'
    })
  },
  {
    id: 'bunny_yellow',
    name: '暖黄铃铛兔',
    archetype: 'bunny',
    colorGroup: 'yellow',
    render: () => renderBunny({
      id: 'bunny_yellow',
      bodyColor: ['#ffeaa7', '#f1c40f'],
      innerEarColor: '#ffffff',
      heldItem: 'bell'
    })
  },
  {
    id: 'bunny_purple',
    name: '浅紫星星兔',
    archetype: 'bunny',
    colorGroup: 'purple',
    render: () => renderBunny({
      id: 'bunny_purple',
      bodyColor: ['#a29bfe', '#6c5ce7'],
      innerEarColor: '#fd79a8',
      heldItem: 'star'
    })
  },

  // 7. SWIRL LOLLIPOP (旋涡糖) - 5 Variants
  {
    id: 'lollipop_rainbow',
    name: '彩虹旋涡糖',
    archetype: 'lollipop',
    colorGroup: 'red',
    render: () => renderLollipop({
      id: 'lollipop_rainbow',
      swirlColors: ['#ff4757', '#ffa502', '#2ed573'],
      bowColor: '#f1c40f'
    })
  },
  {
    id: 'lollipop_pink',
    name: '草莓奶霜糖',
    archetype: 'lollipop',
    colorGroup: 'pink',
    render: () => renderLollipop({
      id: 'lollipop_pink',
      swirlColors: ['#ff7675', '#ffffff'],
      bowColor: '#e74c3c'
    })
  },
  {
    id: 'lollipop_green',
    name: '青柠抹茶糖',
    archetype: 'lollipop',
    colorGroup: 'green',
    render: () => renderLollipop({
      id: 'lollipop_green',
      swirlColors: ['#2ed573', '#f1c40f'],
      bowColor: '#00cec9'
    })
  },
  {
    id: 'lollipop_blue',
    name: '海风蓝云糖',
    archetype: 'lollipop',
    colorGroup: 'blue',
    render: () => renderLollipop({
      id: 'lollipop_blue',
      swirlColors: ['#0984e3', '#ffffff', '#74b9ff'],
      bowColor: '#fed330'
    })
  },
  {
    id: 'lollipop_purple',
    name: '蓝莓香芋糖',
    archetype: 'lollipop',
    colorGroup: 'purple',
    render: () => renderLollipop({
      id: 'lollipop_purple',
      swirlColors: ['#8e44ad', '#fd79a8'],
      bowColor: '#f1c40f'
    })
  },

  // 8. JAM JAR (果酱罐) - 5 Variants
  {
    id: 'jam_strawberry',
    name: '鲜红草莓酱',
    archetype: 'jam_jar',
    colorGroup: 'red',
    render: () => renderJamJar({
      id: 'jam_strawberry',
      jamColor: ['#e74c3c', '#c0392b'],
      clothColor: '#d63031',
      fruitType: 'strawberry'
    })
  },
  {
    id: 'jam_honey',
    name: '金黄纯蜂蜜',
    archetype: 'jam_jar',
    colorGroup: 'yellow',
    render: () => renderJamJar({
      id: 'jam_honey',
      jamColor: ['#f1c40f', '#f39c12'],
      clothColor: '#e67e22',
      fruitType: 'honeybee'
    })
  },
  {
    id: 'jam_blueberry',
    name: '浓醇蓝莓酱',
    archetype: 'jam_jar',
    colorGroup: 'purple',
    render: () => renderJamJar({
      id: 'jam_blueberry',
      jamColor: ['#6c5ce7', '#4834d4'],
      clothColor: '#8e44ad',
      fruitType: 'blueberry'
    })
  },
  {
    id: 'jam_kiwi',
    name: '奇异果青酱',
    archetype: 'jam_jar',
    colorGroup: 'green',
    render: () => renderJamJar({
      id: 'jam_kiwi',
      jamColor: ['#2ecc71', '#27ae60'],
      clothColor: '#27ae60',
      fruitType: 'kiwi'
    })
  },
  {
    id: 'jam_orange',
    name: '糖渍甜橙酱',
    archetype: 'jam_jar',
    colorGroup: 'orange',
    render: () => renderJamJar({
      id: 'jam_orange',
      jamColor: ['#e67e22', '#d35400'],
      clothColor: '#e67e22',
      fruitType: 'orange'
    })
  },

  // 9. CUPCAKE (纸杯蛋糕) - 5 Variants
  {
    id: 'cupcake_strawberry',
    name: '草莓粉杯糕',
    archetype: 'cupcake',
    colorGroup: 'pink',
    render: () => renderCupcake({
      id: 'cupcake_strawberry',
      frostingGrad: ['#ff7675', '#fd79a8'],
      cupColor: '#f1c40f',
      toppingType: 'cherry'
    })
  },
  {
    id: 'cupcake_chocolate',
    name: '薄荷巧乐糕',
    archetype: 'cupcake',
    colorGroup: 'brown',
    render: () => renderCupcake({
      id: 'cupcake_chocolate',
      frostingGrad: ['#6d4c41', '#3e2723'],
      cupColor: '#55efc4',
      toppingType: 'candycane'
    })
  },
  {
    id: 'cupcake_lemon',
    name: '柠檬金星糕',
    archetype: 'cupcake',
    colorGroup: 'yellow',
    render: () => renderCupcake({
      id: 'cupcake_lemon',
      frostingGrad: ['#ffeaa7', '#f1c40f'],
      cupColor: '#ffffff',
      toppingType: 'star'
    })
  },
  {
    id: 'cupcake_blueberry',
    name: '蓝莓紫晶糕',
    archetype: 'cupcake',
    colorGroup: 'purple',
    render: () => renderCupcake({
      id: 'cupcake_blueberry',
      frostingGrad: ['#a29bfe', '#6c5ce7'],
      cupColor: '#fd79a8',
      toppingType: 'berries'
    })
  },
  {
    id: 'cupcake_matcha',
    name: '抹茶红豆糕',
    archetype: 'cupcake',
    colorGroup: 'green',
    render: () => renderCupcake({
      id: 'cupcake_matcha',
      frostingGrad: ['#55efc4', '#00b894'],
      cupColor: '#e74c3c',
      toppingType: 'matcha_beans'
    })
  },

  // 10. FESTIVE PINE TREE (节日小树) - 4 Variants
  {
    id: 'tree_classic',
    name: '常青圣诞树',
    archetype: 'xmas_tree',
    colorGroup: 'green',
    render: () => renderPineTree({
      id: 'tree_classic',
      foliageGrad: ['#2ecc71', '#27ae60'],
      starColor: '#f1c40f',
      baubleColor: ['#e74c3c', '#f1c40f']
    })
  },
  {
    id: 'tree_snow',
    name: '冰晶雪松树',
    archetype: 'xmas_tree',
    colorGroup: 'blue',
    render: () => renderPineTree({
      id: 'tree_snow',
      foliageGrad: ['#81ecec', '#0984e3'],
      starColor: '#ffffff',
      baubleColor: ['#ffffff', '#00cec9']
    })
  },
  {
    id: 'tree_pink',
    name: '梦幻粉晶树',
    archetype: 'xmas_tree',
    colorGroup: 'pink',
    render: () => renderPineTree({
      id: 'tree_pink',
      foliageGrad: ['#fd79a8', '#e84393'],
      starColor: '#fed330',
      baubleColor: ['#ffffff', '#f1c40f']
    })
  },
  {
    id: 'tree_golden',
    name: '璀璨金辉树',
    archetype: 'xmas_tree',
    colorGroup: 'yellow',
    render: () => renderPineTree({
      id: 'tree_golden',
      foliageGrad: ['#fed330', '#f39c12'],
      starColor: '#e74c3c',
      baubleColor: ['#e74c3c', '#00b894']
    })
  },

  // 11. FESTIVE BELL (铃铛) - 4 Variants
  {
    id: 'bell_gold',
    name: '璀璨金铃',
    archetype: 'bell',
    colorGroup: 'yellow',
    render: () => renderBell({
      id: 'bell_gold',
      metalGrad: ['#fed330', '#f1c40f', '#d35400'],
      bowColor: '#e74c3c'
    })
  },
  {
    id: 'bell_silver',
    name: '皎洁银铃',
    archetype: 'bell',
    colorGroup: 'white',
    render: () => renderBell({
      id: 'bell_silver',
      metalGrad: ['#ffffff', '#dfe6e9', '#b2bec3'],
      bowColor: '#0984e3'
    })
  },
  {
    id: 'bell_bronze',
    name: '古典铜铃',
    archetype: 'bell',
    colorGroup: 'brown',
    render: () => renderBell({
      id: 'bell_bronze',
      metalGrad: ['#e67e22', '#d35400', '#ba4a00'],
      bowColor: '#27ae60'
    })
  },
  {
    id: 'bell_rose',
    name: '粉玫金铃',
    archetype: 'bell',
    colorGroup: 'pink',
    render: () => renderBell({
      id: 'bell_rose',
      metalGrad: ['#ff7675', '#fd79a8', '#e84393'],
      bowColor: '#8e44ad'
    })
  },

  // 12. CROWN FROG (小青蛙) - 4 Variants
  {
    id: 'frog_crown',
    name: '金冠翠蛙',
    archetype: 'frog',
    colorGroup: 'gold_green',
    render: () => renderFrog({
      id: 'frog_crown',
      frogColor: ['#2ecc71', '#27ae60'],
      accessoryType: 'crown'
    })
  },
  {
    id: 'frog_flower',
    name: '睡莲粉花蛙',
    archetype: 'frog',
    colorGroup: 'pink_lime',
    render: () => renderFrog({
      id: 'frog_flower',
      frogColor: ['#55efc4', '#00b894'],
      accessoryType: 'flower'
    })
  },
  {
    id: 'frog_bowtie',
    name: '红领结绅士蛙',
    archetype: 'frog',
    colorGroup: 'red_mint',
    render: () => renderFrog({
      id: 'frog_bowtie',
      frogColor: ['#78e08f', '#38ada9'],
      accessoryType: 'bowtie'
    })
  },
  {
    id: 'frog_blue',
    name: '冰川箭毒蛙',
    archetype: 'frog',
    colorGroup: 'blue',
    render: () => renderFrog({
      id: 'frog_blue',
      frogColor: ['#81ecec', '#0984e3'],
      accessoryType: 'spots'
    })
  },

  // 13. SNACK BAG (零食袋) - 4 Variants
  {
    id: 'snack_red',
    name: '麻辣香脆薯片',
    archetype: 'snack_bag',
    colorGroup: 'red',
    render: () => renderSnackBag({
      id: 'snack_red',
      bagGrad: ['#e74c3c', '#c0392b'],
      badgeColor: '#e74c3c',
      flavorIcon: 'flame'
    })
  },
  {
    id: 'snack_green',
    name: '青柠海苔脆片',
    archetype: 'snack_bag',
    colorGroup: 'green',
    render: () => renderSnackBag({
      id: 'snack_green',
      bagGrad: ['#2ecc71', '#27ae60'],
      badgeColor: '#27ae60',
      flavorIcon: 'seaweed'
    })
  },
  {
    id: 'snack_yellow',
    name: '浓香芝士脆片',
    archetype: 'snack_bag',
    colorGroup: 'yellow',
    render: () => renderSnackBag({
      id: 'snack_yellow',
      bagGrad: ['#f1c40f', '#f39c12'],
      badgeColor: '#d35400',
      flavorIcon: 'cheese'
    })
  },
  {
    id: 'snack_purple',
    name: '紫薯风味薯片',
    archetype: 'snack_bag',
    colorGroup: 'purple',
    render: () => renderSnackBag({
      id: 'snack_purple',
      bagGrad: ['#8e44ad', '#6c3483'],
      badgeColor: '#8e44ad',
      flavorIcon: 'sweet_potato'
    })
  },

  // 14. COFFEE & COCOA MUG (马克杯) - 4 Variants
  {
    id: 'mug_red_cocoa',
    name: '暖冬热可可',
    archetype: 'coffee_mug',
    colorGroup: 'red',
    render: () => renderCoffeeMug({
      id: 'mug_red_cocoa',
      mugColor: ['#e74c3c', '#c0392b'],
      drinkColor: '#4e342e',
      toppingType: 'marshmallows'
    })
  },
  {
    id: 'mug_teal_latte',
    name: '青瓷心拉花',
    archetype: 'coffee_mug',
    colorGroup: 'blue',
    render: () => renderCoffeeMug({
      id: 'mug_teal_latte',
      mugColor: ['#00cec9', '#0984e3'],
      drinkColor: '#6d4c41',
      toppingType: 'heart'
    })
  },
  {
    id: 'mug_yellow_citrus',
    name: '暖阳蜂蜜柚',
    archetype: 'coffee_mug',
    colorGroup: 'yellow',
    render: () => renderCoffeeMug({
      id: 'mug_yellow_citrus',
      mugColor: ['#fed330', '#f1c40f'],
      drinkColor: '#e67e22',
      toppingType: 'lemon'
    })
  },
  {
    id: 'mug_purple_taro',
    name: '香芋紫奶油杯',
    archetype: 'coffee_mug',
    colorGroup: 'purple',
    render: () => renderCoffeeMug({
      id: 'mug_purple_taro',
      mugColor: ['#a29bfe', '#6c5ce7'],
      drinkColor: '#8e44ad',
      toppingType: 'cream'
    })
  },

  // 15. MAGIC POTION (魔法药水) - 4 Variants
  {
    id: 'potion_red',
    name: '生命活力红药水',
    archetype: 'potion_bottle',
    colorGroup: 'red',
    render: () => renderPotionBottle({
      id: 'potion_red',
      liquidGrad: ['#ff7675', '#d63031'],
      sparkleIcon: 'heart'
    })
  },
  {
    id: 'potion_blue',
    name: '冰霜魔力蓝药水',
    archetype: 'potion_bottle',
    colorGroup: 'blue',
    render: () => renderPotionBottle({
      id: 'potion_blue',
      liquidGrad: ['#81ecec', '#0984e3'],
      sparkleIcon: 'ice'
    })
  },
  {
    id: 'potion_green',
    name: '自然治愈绿药水',
    archetype: 'potion_bottle',
    colorGroup: 'green',
    render: () => renderPotionBottle({
      id: 'potion_green',
      liquidGrad: ['#55efc4', '#00b894'],
      sparkleIcon: 'leaf'
    })
  },
  {
    id: 'potion_purple',
    name: '星辰奇迹紫药水',
    archetype: 'potion_bottle',
    colorGroup: 'purple',
    render: () => renderPotionBottle({
      id: 'potion_purple',
      liquidGrad: ['#a29bfe', '#6c5ce7'],
      sparkleIcon: 'star'
    })
  }
];

// Main execution
console.log(`[SVG Generator] Generating ${ITEM_DEFINITIONS.length} SVG item assets...`);

const catalog = {};

ITEM_DEFINITIONS.forEach(def => {
  const svgContent = def.render();
  const filePath = path.join(itemsDir, `${def.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');

  catalog[def.id] = {
    id: def.id,
    name: def.name,
    archetype: def.archetype,
    colorGroup: def.colorGroup,
    img: `./assets/items/${def.id}.svg`
  };
});

// Write json catalog
const jsonPath = path.join(itemsDir, 'items_data.json');
fs.writeFileSync(jsonPath, JSON.stringify(catalog, null, 2), 'utf8');

console.log(`[SVG Generator] Successfully generated ${ITEM_DEFINITIONS.length} SVGs to ${itemsDir}!`);
console.log(`[SVG Generator] Catalog updated at ${jsonPath}`);

module.exports = { ITEM_DEFINITIONS, catalog };

#!/usr/bin/env node
/**
 * Authentic 3D Figurines & Clay-Style SVG Item Generator for Goods Sort 3D (收纳整理师)
 * Faithfully modeled after the original PNG sprite assets, with parameterized variations.
 * 
 * Quality Principles:
 * - 100% Modeled on the original PNG character silhouettes and clay aesthetic
 * - 3D volumetric multi-stop gradients, soft Gaussian blur for clay highlights & blush
 * - Contact ambient shadows
 * - Parameterized variations (e.g. Snowmen strictly vary only hat/scarf/buttons, Milk cartons vary flavor/color, etc.)
 * - High visual contrast between different archetypes and colorways to prevent confusion
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const itemsDir = path.join(rootDir, 'assets', 'items');
if (!fs.existsSync(itemsDir)) {
  fs.mkdirSync(itemsDir, { recursive: true });
}

function wrapSvg(defs, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <!-- Soft blur filter for realistic clay highlights & blush -->
    <filter id="clay-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2"/>
    </filter>
    <radialGradient id="clay-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.26"/>
      <stop offset="60%" stop-color="#000" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gloss-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#37474f"/>
      <stop offset="60%" stop-color="#212121"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    ${defs}
  </defs>
  <!-- Ambient Contact Floor Shadow -->
  <ellipse cx="50" cy="94" rx="26" ry="4.5" fill="url(#clay-shadow)"/>
  ${content}
</svg>`;
}

// -------------------------------------------------------------
// 1. SNOWMAN (雪人) - Modeled faithfully after blue_snowman.png
// Round body, 2 buttons, round orange nose button, blush, dotted smile,
// knit beanie with folded brim & pompom, cozy scarf with tail on left.
// Variations ONLY change hat, scarf, and button colors!
// -------------------------------------------------------------
function renderSnowman(hatColors, scarfColors, btnColors, id) {
  const defs = `
    <radialGradient id="snow-b-${id}" cx="36%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#f0f7fc"/>
      <stop offset="85%" stop-color="#d2e5f5"/>
      <stop offset="100%" stop-color="#b8d5ec"/>
    </radialGradient>
    <radialGradient id="snow-h-${id}" cx="36%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f2f8fc"/>
      <stop offset="88%" stop-color="#d5e7f5"/>
      <stop offset="100%" stop-color="#bedaf0"/>
    </radialGradient>
    <radialGradient id="hat-crown-${id}" cx="38%" cy="28%" r="65%">
      <stop offset="0%" stop-color="${hatColors[0]}"/>
      <stop offset="50%" stop-color="${hatColors[1]}"/>
      <stop offset="100%" stop-color="${hatColors[2]}"/>
    </radialGradient>
    <linearGradient id="hat-brim-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${hatColors[0]}"/>
      <stop offset="50%" stop-color="${hatColors[1]}"/>
      <stop offset="100%" stop-color="${hatColors[2]}"/>
    </linearGradient>
    <linearGradient id="scarf-g-${id}" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="${scarfColors[0]}"/>
      <stop offset="45%" stop-color="${scarfColors[1]}"/>
      <stop offset="100%" stop-color="${scarfColors[2]}"/>
    </linearGradient>
    <radialGradient id="btn-g-${id}" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${btnColors[0]}"/>
      <stop offset="60%" stop-color="${btnColors[1]}"/>
      <stop offset="100%" stop-color="${btnColors[2]}"/>
    </radialGradient>
    <radialGradient id="carrot-g" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffb74d"/>
      <stop offset="60%" stop-color="#ff9100"/>
      <stop offset="100%" stop-color="#e65100"/>
    </radialGradient>
  `;

  const content = `
    <!-- Snowman Bottom Snowball Body -->
    <circle cx="50" cy="72" r="22" fill="url(#snow-b-${id})"/>
    <path d="M34,84 Q50,94 66,84 Q72,72 70,62 Q66,86 46,88 Q36,88 34,84 Z" fill="#9ec1dd" opacity="0.38" filter="url(#clay-blur)"/>

    <!-- 2 Buttons on Belly -->
    <circle cx="50" cy="67" r="3.2" fill="url(#btn-g-${id})"/>
    <circle cx="49.1" cy="66.1" r="0.85" fill="#ffffff" opacity="0.75"/>
    <circle cx="50" cy="78" r="3.2" fill="url(#btn-g-${id})"/>
    <circle cx="49.1" cy="77.1" r="0.85" fill="#ffffff" opacity="0.75"/>

    <!-- Snowman Head -->
    <circle cx="50" cy="44" r="16.5" fill="url(#snow-h-${id})"/>

    <!-- Soft Rosy Blush Cheeks -->
    <ellipse cx="37" cy="46" rx="3.8" ry="2.8" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>
    <ellipse cx="63" cy="46" rx="3.8" ry="2.8" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>

    <!-- Glossy Eyes -->
    <circle cx="42" cy="39" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="58" cy="39" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="41.2" cy="38.2" r="0.85" fill="#ffffff"/>
    <circle cx="57.2" cy="38.2" r="0.85" fill="#ffffff"/>

    <!-- Round Orange Carrot Nose Button -->
    <ellipse cx="50" cy="43" rx="4.2" ry="3.3" fill="url(#carrot-g)"/>
    <ellipse cx="49" cy="42" rx="1.6" ry="1.1" fill="#ffe082" opacity="0.75"/>

    <!-- Sweet Dotted Smile -->
    <circle cx="44" cy="48.2" r="0.85" fill="#263238"/>
    <circle cx="47" cy="49.5" r="0.85" fill="#263238"/>
    <circle cx="50" cy="50.0" r="0.85" fill="#263238"/>
    <circle cx="53" cy="49.5" r="0.85" fill="#263238"/>
    <circle cx="56" cy="48.2" r="0.85" fill="#263238"/>

    <!-- Scarf Draped Tail on Left -->
    <path d="M38,55 L34,74 Q36,77 42,75 L45,56 Z" fill="url(#scarf-g-${id})"/>
    <path d="M38,55 L38,75" stroke="${scarfColors[2]}" stroke-width="1.2" opacity="0.5"/>

    <!-- Scarf Neck Wrap -->
    <path d="M31,52 Q50,60 69,52 Q71,57 67,61 Q50,67 33,61 Q29,56 31,52 Z" fill="url(#scarf-g-${id})"/>
    <path d="M33,53 Q50,61 67,53" stroke="${scarfColors[0]}" stroke-width="1" fill="none" opacity="0.6"/>

    <!-- Beanie Hat Crown -->
    <path d="M33,26 C33,12 67,12 67,26 C67,28 33,28 33,26 Z" fill="url(#hat-crown-${id})"/>
    <!-- Folded Thick Brim -->
    <path d="M30,26 C30,22 70,22 70,26 C72,32 28,32 30,26 Z" fill="url(#hat-brim-${id})"/>
    <path d="M31,25 C35,23 65,23 69,25" stroke="${hatColors[0]}" stroke-width="1" fill="none" opacity="0.7"/>

    <!-- White Fluffy Pompom on Top -->
    <circle cx="50" cy="12" r="4.6" fill="#ffffff"/>
    <circle cx="50" cy="12" r="4.6" fill="#d2e6f7" opacity="0.35"/>
    <circle cx="48.8" cy="10.8" r="1.8" fill="#ffffff"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 2. PEA BUNNY (豌豆小兔) - Modeled faithfully after pea_bunny.png
// -------------------------------------------------------------
function renderPeaBunny(podColors, id) {
  const defs = `
    <linearGradient id="pod-g-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${podColors[0]}"/>
      <stop offset="50%" stop-color="${podColors[1]}"/>
      <stop offset="100%" stop-color="${podColors[2]}"/>
    </linearGradient>
    <radialGradient id="bunny-f" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="65%" stop-color="#f5f8fa"/>
      <stop offset="100%" stop-color="#dbe5ed"/>
    </radialGradient>
    <linearGradient id="ear-i" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffccd2"/>
      <stop offset="100%" stop-color="#ffb3ba"/>
    </linearGradient>
  `;

  const content = `
    <!-- Pea Pod Back Shell -->
    <path d="M22,35 C14,58 24,88 56,92 C74,94 88,85 88,74 C86,85 68,91 50,88 C26,84 18,58 26,32 Z" fill="url(#pod-g-${id})" opacity="0.9"/>
    
    <!-- Bunny Body lying back -->
    <ellipse cx="60" cy="68" rx="16" ry="14" fill="url(#bunny-f)" transform="rotate(-15 60 68)"/>
    <ellipse cx="62" cy="72" rx="10" ry="8" fill="#fff9c4" opacity="0.8" transform="rotate(-15 62 72)"/>
    <!-- Feet -->
    <ellipse cx="74" cy="75" rx="4.5" ry="3" fill="url(#bunny-f)"/>
    <ellipse cx="74" cy="75" rx="2" ry="1.5" fill="#ffccd2"/>

    <!-- Bunny Long Ears tilted back -->
    <path d="M38,40 C28,26 18,18 25,12 C32,8 42,22 46,36 Z" fill="url(#bunny-f)"/>
    <path d="M36,36 C28,26 22,20 26,15 C30,12 38,22 42,34 Z" fill="url(#ear-i)"/>
    <path d="M48,36 C42,20 44,10 52,8 C58,6 60,18 56,34 Z" fill="url(#bunny-f)"/>
    <path d="M49,32 C45,20 46,13 51,11 C55,10 57,18 54,30 Z" fill="url(#ear-i)"/>

    <!-- Bunny Head -->
    <circle cx="52" cy="50" r="16" fill="url(#bunny-f)"/>
    <ellipse cx="44" cy="54" rx="3.5" ry="2.5" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>
    <ellipse cx="64" cy="50" rx="3.5" ry="2.5" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>

    <!-- Sleeping / Winking Eyes -->
    <path d="M45,46 Q48,43 51,46" stroke="#37474f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="44" r="1.8" fill="#37474f"/>
    <circle cx="59.4" cy="43.4" r="0.6" fill="#ffffff"/>
    <ellipse cx="55" cy="49" rx="1.4" ry="1" fill="#e91e63"/>
    <path d="M53,52 Q55,54 57,52" stroke="#37474f" stroke-width="1.2" fill="none" stroke-linecap="round"/>

    <!-- Paws on belly -->
    <ellipse cx="52" cy="64" rx="3.5" ry="2.8" fill="url(#bunny-f)"/>
    <ellipse cx="60" cy="63" rx="3.5" ry="2.8" fill="url(#bunny-f)"/>

    <!-- Pea Pod Front Cradle Lip -->
    <path d="M18,34 C12,58 24,88 56,92 C74,94 88,82 88,74 C78,82 60,86 44,80 C26,72 20,54 22,34 Z" fill="url(#pod-g-${id})"/>
    <path d="M22,34 C16,56 26,82 52,88" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.55"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 3. XMAS TREE (圣诞树) - Modeled faithfully after xmas_tree.png
// -------------------------------------------------------------
function renderXmasTree(treeColors, id) {
  const defs = `
    <linearGradient id="tree-t1-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${treeColors[0]}"/>
      <stop offset="60%" stop-color="${treeColors[1]}"/>
      <stop offset="100%" stop-color="${treeColors[2]}"/>
    </linearGradient>
    <radialGradient id="star-g" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="45%" stop-color="#fbc02d"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
  `;

  const content = `
    <!-- Tree Trunk -->
    <rect x="44" y="80" width="12" height="12" rx="3" fill="#8d6e63"/>
    <rect x="44" y="80" width="12" height="12" rx="3" fill="#5d4037" opacity="0.4"/>

    <!-- Bottom Tier (Widest) -->
    <path d="M22,78 C22,66 40,60 50,60 C60,60 78,66 78,78 C78,84 22,84 22,78 Z" fill="url(#tree-t1-${id})"/>
    <path d="M25,75 Q50,83 75,75" stroke="#fbc02d" stroke-width="2.6" fill="none" stroke-linecap="round"/>

    <!-- Middle Tier -->
    <path d="M28,60 C28,48 42,42 50,42 C58,42 72,48 72,60 C72,66 28,66 28,60 Z" fill="url(#tree-t1-${id})"/>
    <path d="M31,58 Q50,65 69,58" stroke="#fbc02d" stroke-width="2.6" fill="none" stroke-linecap="round"/>

    <!-- Top Tier -->
    <path d="M35,42 C35,26 44,22 50,22 C56,22 65,26 65,42 C65,48 35,48 35,42 Z" fill="url(#tree-t1-${id})"/>
    <path d="M38,39 Q50,45 62,39" stroke="#fbc02d" stroke-width="2.4" fill="none" stroke-linecap="round"/>

    <!-- Pastel Bauble Dots (pink, cyan, yellow) -->
    <circle cx="36" cy="74" r="2.8" fill="#ff80ab"/>
    <circle cx="52" cy="78" r="2.8" fill="#ffe57f"/>
    <circle cx="68" cy="74" r="2.8" fill="#ff80ab"/>
    <circle cx="42" cy="57" r="2.6" fill="#ff80ab"/>
    <circle cx="58" cy="60" r="2.6" fill="#80d8ff"/>
    <circle cx="45" cy="38" r="2.4" fill="#ff80ab"/>
    <circle cx="55" cy="40" r="2.4" fill="#80d8ff"/>

    <!-- 3D Star on Pinnacle -->
    <polygon points="50,8 53,16 61,16 55,21 57,29 50,24 43,29 45,21 39,16 47,16" fill="url(#star-g)"/>
    <circle cx="50" cy="18" r="2" fill="#fff" opacity="0.6"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 4. XMAS REINDEER (圣诞小鹿) - Modeled faithfully after xmas_reindeer.png
// -------------------------------------------------------------
function renderReindeer(id) {
  const defs = `
    <radialGradient id="deer-fur" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffe0b2"/>
      <stop offset="45%" stop-color="#ffb74d"/>
      <stop offset="100%" stop-color="#f57c00"/>
    </radialGradient>
    <radialGradient id="rudolph-nose" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ff5252"/>
      <stop offset="70%" stop-color="#d50000"/>
      <stop offset="100%" stop-color="#9b0000"/>
    </radialGradient>
    <radialGradient id="deer-bell" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="60%" stop-color="#fbc02d"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
  `;

  const content = `
    <!-- Branched Antlers -->
    <path d="M37,28 C34,16 28,12 24,10 M28,15 C24,18 20,17 18,15 M32,19 C28,21 24,22 22,23" stroke="#8d6e63" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M63,28 C66,16 72,12 76,10 M72,15 C76,18 80,17 82,15 M68,19 C72,21 76,22 78,23" stroke="#8d6e63" stroke-width="3" stroke-linecap="round" fill="none"/>

    <!-- Reindeer Legs / Body -->
    <rect x="36" y="65" width="9" height="24" rx="4" fill="url(#deer-fur)"/>
    <rect x="55" y="65" width="9" height="24" rx="4" fill="url(#deer-fur)"/>
    <rect x="36" y="85" width="9" height="4" rx="1.5" fill="#5d4037"/>
    <rect x="55" y="85" width="9" height="4" rx="1.5" fill="#5d4037"/>

    <ellipse cx="50" cy="65" rx="19" ry="17" fill="url(#deer-fur)"/>
    <ellipse cx="50" cy="68" rx="11" ry="12" fill="#fff3e0"/>

    <!-- Red Collar with Bell -->
    <path d="M37,56 Q50,62 63,56" stroke="#d50000" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="50" cy="63" r="4.2" fill="url(#deer-bell)"/>
    <circle cx="50" cy="64.5" r="1.1" fill="#795548"/>

    <!-- Deer Ears -->
    <ellipse cx="30" cy="38" rx="6" ry="3.5" fill="url(#deer-fur)" transform="rotate(-15 30 38)"/>
    <ellipse cx="70" cy="38" rx="6" ry="3.5" fill="url(#deer-fur)" transform="rotate(15 70 38)"/>

    <!-- Deer Head -->
    <ellipse cx="50" cy="42" rx="18" ry="16" fill="url(#deer-fur)"/>

    <circle cx="42" cy="38" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="58" cy="38" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="41.2" cy="37.2" r="0.85" fill="#ffffff"/>
    <circle cx="57.2" cy="37.2" r="0.85" fill="#ffffff"/>

    <ellipse cx="50" cy="45" rx="4.8" ry="3.8" fill="url(#rudolph-nose)"/>
    <circle cx="48.5" cy="43.5" r="1.3" fill="#ffffff" opacity="0.85"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 5. XMAS GNOME (圣诞小矮人) - Modeled faithfully after xmas_gnome.png
// -------------------------------------------------------------
function renderGnome(hatColors, coatColor, id) {
  const defs = `
    <linearGradient id="gnome-hat-${id}" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="${hatColors[0]}"/>
      <stop offset="60%" stop-color="${hatColors[1]}"/>
      <stop offset="100%" stop-color="${hatColors[2]}"/>
    </linearGradient>
    <radialGradient id="beard-g" cx="40%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f5f7fa"/>
      <stop offset="100%" stop-color="#cfd8dc"/>
    </radialGradient>
    <radialGradient id="nose-g" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffe0b2"/>
      <stop offset="70%" stop-color="#ffcc80"/>
      <stop offset="100%" stop-color="#ffa726"/>
    </radialGradient>
  `;

  const content = `
    <ellipse cx="40" cy="88" rx="8" ry="4.5" fill="#d32f2f"/>
    <ellipse cx="60" cy="88" rx="8" ry="4.5" fill="#d32f2f"/>

    <ellipse cx="50" cy="74" rx="20" ry="16" fill="${coatColor}"/>

    <path d="M30,55 C22,68 32,86 50,86 C68,86 78,68 70,55 Z" fill="url(#beard-g)"/>

    <ellipse cx="50" cy="55" rx="6.5" ry="5.2" fill="url(#nose-g)"/>
    <ellipse cx="48.5" cy="53.5" r="1.5" fill="#ffffff" opacity="0.6"/>

    <rect x="25" y="47" width="50" height="9" rx="4.5" fill="#ffffff"/>
    <rect x="25" y="47" width="50" height="9" rx="4.5" fill="#cfd8dc" opacity="0.3"/>

    <path d="M29,48 C34,26 50,14 74,10 C82,8 86,16 80,24 C72,28 65,40 71,48 Z" fill="url(#gnome-hat-${id})"/>

    <circle cx="82" cy="14" r="5" fill="#ffffff"/>
    <circle cx="82" cy="14" r="5" fill="#cfd8dc" opacity="0.3"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 6. STOCKING (长袜) - Modeled faithfully after polka_stocking.png
// -------------------------------------------------------------
function renderStocking(bodyColor, id) {
  const defs = `
    <linearGradient id="sock-g-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bodyColor[0]}"/>
      <stop offset="50%" stop-color="${bodyColor[1]}"/>
      <stop offset="100%" stop-color="${bodyColor[2]}"/>
    </linearGradient>
  `;

  const content = `
    <path d="M40,24 L40,64 C40,78 30,86 42,88 C54,90 70,88 64,74 C60,65 60,40 60,24 Z" fill="url(#sock-g-${id})"/>

    <circle cx="48" cy="38" r="3.2" fill="#ffffff"/>
    <circle cx="56" cy="48" r="3.2" fill="#ffffff"/>
    <circle cx="46" cy="56" r="3.2" fill="#ffffff"/>
    <circle cx="54" cy="68" r="3.2" fill="#ffffff"/>
    <circle cx="42" cy="74" r="3.2" fill="#ffffff"/>
    <circle cx="48" cy="82" r="2.8" fill="#ffffff"/>

    <path d="M58,66 C66,74 62,80 58,74 Z" fill="#ffffff" opacity="0.8"/>
    <path d="M40,84 C34,84 36,88 42,88 Z" fill="#ffffff" opacity="0.8"/>

    <rect x="36" y="16" width="28" height="12" rx="5" fill="#ffffff"/>
    <rect x="36" y="16" width="28" height="12" rx="5" fill="#cfd8dc" opacity="0.3"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 7. RED POUCH (圣诞福袋) - Modeled faithfully after red_pouch.png
// -------------------------------------------------------------
function renderPouch(pouchColors, id) {
  const defs = `
    <radialGradient id="pouch-g-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${pouchColors[0]}"/>
      <stop offset="50%" stop-color="${pouchColors[1]}"/>
      <stop offset="100%" stop-color="${pouchColors[2]}"/>
    </radialGradient>
    <radialGradient id="gold-pom" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="60%" stop-color="#fbc02d"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
  `;

  const content = `
    <path d="M42,32 C28,42 22,66 26,82 C28,90 72,90 74,82 C78,66 72,42 58,32 Z" fill="url(#pouch-g-${id})"/>
    <path d="M38,32 C34,22 42,18 46,24 C50,18 54,18 58,24 C62,18 68,22 64,32 Z" fill="url(#pouch-g-${id})"/>

    <path d="M38,32 Q50,36 62,32" stroke="#fbc02d" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M46,34 Q38,44 42,50" stroke="#fbc02d" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <circle cx="42" cy="51" r="2.8" fill="url(#gold-pom)"/>
    <path d="M54,34 Q62,44 58,50" stroke="#fbc02d" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <circle cx="58" cy="51" r="2.8" fill="url(#gold-pom)"/>

    <g transform="translate(50, 66)">
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-6" cy="0" r="1.5" fill="#ffffff"/><circle cx="6" cy="0" r="1.5" fill="#ffffff"/>
      <circle cx="0" cy="-6" r="1.5" fill="#ffffff"/><circle cx="0" cy="6" r="1.5" fill="#ffffff"/>
      <circle cx="0" cy="0" r="2.2" fill="#ffffff"/>
    </g>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 8. GOLD BELL (圣诞金铃) - Modeled faithfully after gold_bell.png
// -------------------------------------------------------------
function renderBell(metalColors, bowColor, id) {
  const defs = `
    <radialGradient id="bell-g-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${metalColors[0]}"/>
      <stop offset="50%" stop-color="${metalColors[1]}"/>
      <stop offset="100%" stop-color="${metalColors[2]}"/>
    </radialGradient>
  `;

  const content = `
    <circle cx="50" cy="80" r="5.5" fill="${metalColors[2]}"/>
    <circle cx="50" cy="81" r="4.5" fill="${metalColors[1]}"/>

    <path d="M50,28 C37,28 32,48 30,70 C28,78 22,80 22,83 L78,83 C78,80 72,78 70,70 C68,48 63,28 50,28 Z" fill="url(#bell-g-${id})"/>
    <ellipse cx="50" cy="83" rx="28" ry="4.5" fill="url(#bell-g-${id})"/>

    <path d="M48,27 C34,14 20,20 34,29 C40,30 45,29 48,27 Z" fill="${bowColor}"/>
    <path d="M52,27 C66,14 80,20 66,29 C60,30 55,29 52,27 Z" fill="${bowColor}"/>
    <circle cx="50" cy="27" r="4.2" fill="${bowColor}"/>
    <circle cx="48.8" cy="25.5" r="1.2" fill="#ffffff" opacity="0.6"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 9. GIFT BOX (礼盒) - Modeled faithfully after pink_gift_box.png & yellow_gift_box.png
// -------------------------------------------------------------
function renderGiftBox(boxColors, ribbonColor, id) {
  const defs = `
    <linearGradient id="gbox-b-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${boxColors[0]}"/>
      <stop offset="60%" stop-color="${boxColors[1]}"/>
      <stop offset="100%" stop-color="${boxColors[2]}"/>
    </linearGradient>
    <radialGradient id="ribbon-bow-${id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${ribbonColor[0]}"/>
      <stop offset="70%" stop-color="${ribbonColor[1]}"/>
      <stop offset="100%" stop-color="${ribbonColor[2]}"/>
    </radialGradient>
  `;

  const content = `
    <rect x="28" y="24" width="44" height="66" rx="5" fill="url(#gbox-b-${id})"/>
    <rect x="45" y="24" width="10" height="66" fill="url(#ribbon-bow-${id})"/>
    <rect x="28" y="52" width="44" height="10" fill="url(#ribbon-bow-${id})"/>

    <path d="M48,54 C34,42 26,48 38,57 Z" fill="url(#ribbon-bow-${id})"/>
    <path d="M52,54 C66,42 74,48 62,57 Z" fill="url(#ribbon-bow-${id})"/>
    <path d="M48,58 C34,68 26,62 38,55 Z" fill="url(#ribbon-bow-${id})"/>
    <path d="M52,58 C66,68 74,62 62,55 Z" fill="url(#ribbon-bow-${id})"/>
    <circle cx="50" cy="57" r="4.2" fill="url(#ribbon-bow-${id})"/>
    <circle cx="48.8" cy="55.8" r="1.2" fill="#ffffff" opacity="0.6"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 10. DONE BOTTLE (Done水杯) - Modeled faithfully after cyan_done_bottle.png
// -------------------------------------------------------------
function renderDoneBottle(bottleColors, labelBg, id) {
  const defs = `
    <linearGradient id="done-b-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${bottleColors[0]}"/>
      <stop offset="50%" stop-color="${bottleColors[1]}"/>
      <stop offset="100%" stop-color="${bottleColors[2]}"/>
    </linearGradient>
  `;

  const content = `
    <rect x="38" y="16" width="24" height="10" rx="3" fill="url(#done-b-${id})"/>
    <path d="M60,18 C72,18 72,26 60,26" stroke="${bottleColors[1]}" stroke-width="3" fill="none"/>
    <rect x="28" y="26" width="44" height="64" rx="8" fill="url(#done-b-${id})"/>

    <rect x="28" y="46" width="44" height="28" fill="${labelBg}"/>
    <text x="50" y="66" font-size="14" font-weight="900" fill="#fff9c4" text-anchor="middle" font-family="Arial Black, Impact, sans-serif">Done</text>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 11. BEAR BOTTLE (小熊饮料瓶) - Modeled faithfully after bear_bottle.png
// -------------------------------------------------------------
function renderBearBottle(id) {
  const defs = `
    <radialGradient id="bear-bot" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffa726"/>
      <stop offset="60%" stop-color="#fb8c00"/>
      <stop offset="100%" stop-color="#e65100"/>
    </radialGradient>
  `;

  const content = `
    <rect x="38" y="14" width="24" height="12" rx="3" fill="#ffd54f"/>
    <path d="M60,17 C72,17 72,25 60,25" stroke="#fbc02d" stroke-width="3.5" fill="none"/>
    <rect x="26" y="26" width="48" height="64" rx="10" fill="url(#bear-bot)"/>

    <circle cx="41" cy="46" r="6" fill="#ffffff"/>
    <circle cx="59" cy="46" r="6" fill="#ffffff"/>
    <ellipse cx="50" cy="56" rx="16" ry="14" fill="#ffffff"/>
    <ellipse cx="50" cy="57" rx="12" ry="10" fill="#ffe082"/>

    <circle cx="44" cy="56" r="1.8" fill="#3e2723"/>
    <circle cx="56" cy="56" r="1.8" fill="#3e2723"/>
    <circle cx="50" cy="59" r="1.5" fill="#3e2723"/>
    <path d="M48,62 Q50,64 52,62" stroke="#3e2723" stroke-width="1.2" fill="none"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 12. LOLLIPOP (棒棒糖) - Modeled faithfully after pink_lollipop.png
// -------------------------------------------------------------
function renderLollipop(candyColors, id) {
  const defs = `
    <radialGradient id="pop-g-${id}" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="${candyColors[0]}"/>
      <stop offset="60%" stop-color="${candyColors[1]}"/>
      <stop offset="100%" stop-color="${candyColors[2]}"/>
    </radialGradient>
  `;

  const content = `
    <rect x="47" y="55" width="6" height="38" rx="2" fill="#fff9c4"/>
    <circle cx="50" cy="38" r="22" fill="url(#pop-g-${id})"/>
    <ellipse cx="50" cy="38" rx="23" ry="4" fill="none" stroke="${candyColors[2]}" stroke-width="1.8"/>
    <circle cx="42" cy="28" r="4.5" fill="#ffffff" opacity="0.5"/>

    <path d="M48,58 C36,50 30,56 40,62 Z" fill="${candyColors[1]}"/>
    <path d="M52,58 C64,50 70,56 60,62 Z" fill="${candyColors[1]}"/>
    <circle cx="50" cy="58" r="3.6" fill="${candyColors[2]}"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 13. GREEN FROG (萌萌小青蛙) - Modeled faithfully after green_frog.png
// -------------------------------------------------------------
function renderFrog(id) {
  const defs = `
    <radialGradient id="frog-skin" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#c5e1a5"/>
      <stop offset="50%" stop-color="#8bc34a"/>
      <stop offset="100%" stop-color="#558b2f"/>
    </radialGradient>
    <radialGradient id="frog-eye-lens" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffb74d"/>
      <stop offset="50%" stop-color="#5d4037"/>
      <stop offset="100%" stop-color="#212121"/>
    </radialGradient>
  `;

  const content = `
    <ellipse cx="32" cy="85" rx="10" ry="4" fill="#aed581"/>
    <ellipse cx="68" cy="85" rx="10" ry="4" fill="#aed581"/>

    <ellipse cx="50" cy="66" rx="23" ry="20" fill="url(#frog-skin)"/>
    <ellipse cx="50" cy="68" rx="15" ry="14" fill="#f1f8e9"/>

    <ellipse cx="40" cy="82" rx="4.5" ry="3.5" fill="url(#frog-skin)"/>
    <ellipse cx="60" cy="82" rx="4.5" ry="3.5" fill="url(#frog-skin)"/>

    <circle cx="36" cy="34" r="11" fill="url(#frog-skin)"/>
    <circle cx="64" cy="34" r="11" fill="url(#frog-skin)"/>

    <circle cx="36" cy="34" r="8" fill="url(#frog-eye-lens)"/>
    <circle cx="64" cy="34" r="8" fill="url(#frog-eye-lens)"/>
    <circle cx="33.5" cy="31.5" r="2.8" fill="#ffffff"/>
    <circle cx="61.5" cy="31.5" r="2.8" fill="#ffffff"/>

    <ellipse cx="50" cy="48" rx="20" ry="13" fill="url(#frog-skin)"/>

    <circle cx="47" cy="45" r="0.8" fill="#33691e"/>
    <circle cx="53" cy="45" r="0.8" fill="#33691e"/>
    <path d="M42,50 Q50,56 58,50" stroke="#33691e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 14. YELLOW CHICK (金黄小鸡公仔) - Modeled faithfully after yellow_chick.png
// -------------------------------------------------------------
function renderYellowChick(id) {
  const defs = `
    <radialGradient id="chick-body" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="50%" stop-color="#fdd835"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
  `;

  const content = `
    <ellipse cx="42" cy="90" rx="4" ry="2.5" fill="#ff7043"/>
    <ellipse cx="58" cy="90" rx="4" ry="2.5" fill="#ff7043"/>

    <path d="M50,14 Q48,6 52,4 Q54,10 50,14" fill="#ffd54f"/>
    <circle cx="50" cy="54" r="26" fill="url(#chick-body)"/>

    <ellipse cx="26" cy="58" rx="5" ry="9" fill="#fbc02d" transform="rotate(15 26 58)"/>
    <ellipse cx="74" cy="58" rx="5" ry="9" fill="#fbc02d" transform="rotate(-15 74 58)"/>

    <circle cx="39" cy="44" r="6.5" fill="url(#gloss-eye)"/>
    <circle cx="61" cy="44" r="6.5" fill="url(#gloss-eye)"/>
    <circle cx="37" cy="41" r="2.5" fill="#ffffff"/>
    <circle cx="59" cy="41" r="2.5" fill="#ffffff"/>
    <circle cx="41" cy="46" r="1.1" fill="#ffffff"/>
    <circle cx="63" cy="46" r="1.1" fill="#ffffff"/>

    <polygon points="46,50 54,50 50,57" fill="#ff7043"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 15. COOKIE BUCKET (雪花饼干罐) - Modeled faithfully after red_cookie_bucket.png
// -------------------------------------------------------------
function renderCookieBucket(id) {
  const defs = `
    <linearGradient id="bucket-g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef5350"/>
      <stop offset="50%" stop-color="#e53935"/>
      <stop offset="100%" stop-color="#c62828"/>
    </linearGradient>
    <radialGradient id="cookie-g" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffe082"/>
      <stop offset="70%" stop-color="#ffb74d"/>
      <stop offset="100%" stop-color="#f57c00"/>
    </radialGradient>
  `;

  const content = `
    <ellipse cx="42" cy="24" rx="8" ry="12" fill="url(#cookie-g)" transform="rotate(-15 42 24)"/>
    <ellipse cx="58" cy="22" rx="8" ry="12" fill="url(#cookie-g)" transform="rotate(15 58 22)"/>
    <circle cx="40" cy="20" r="1" fill="#5d4037"/><circle cx="44" cy="26" r="1" fill="#5d4037"/>
    <circle cx="56" cy="20" r="1" fill="#5d4037"/><circle cx="60" cy="25" r="1" fill="#5d4037"/>

    <rect x="28" y="36" width="44" height="52" rx="4" fill="url(#bucket-g)"/>
    <rect x="25" y="30" width="50" height="8" rx="4" fill="#b3e5fc"/>

    <g transform="translate(50, 62)">
      <line x1="-9" y1="0" x2="9" y2="0" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="0" y1="-9" x2="0" y2="9" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="-6.5" y1="6.5" x2="6.5" y2="-6.5" stroke="#ffffff" stroke-width="1.8"/>
      <circle cx="0" cy="0" r="1.8" fill="#ffffff"/>
    </g>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 16. MILK CARTON (鲜牛奶盒) - Modeled faithfully after blue_milk_carton.png
// -------------------------------------------------------------
function renderMilkCarton(cartonColors, id) {
  const defs = `
    <linearGradient id="milk-c-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${cartonColors[0]}"/>
      <stop offset="60%" stop-color="${cartonColors[1]}"/>
      <stop offset="100%" stop-color="${cartonColors[2]}"/>
    </linearGradient>
  `;

  const content = `
    <rect x="28" y="16" width="44" height="74" rx="4" fill="url(#milk-c-${id})"/>

    <rect x="36" y="24" width="28" height="18" rx="4" fill="#212121"/>
    <text x="50" y="37" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="Georgia, serif" font-style="italic">Milk</text>

    <path d="M28,60 Q34,54 42,58 Q50,64 58,54 Q66,50 72,56 L72,90 L28,90 Z" fill="#ffffff"/>
    <ellipse cx="50" cy="72" rx="7" ry="5" fill="#ffe082" transform="rotate(-15 50 72)"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 17. TEDDY BEAR (毛绒泰迪熊) - Modeled faithfully after teddy_bear.png
// -------------------------------------------------------------
function renderTeddyBear(furColors, id) {
  const defs = `
    <radialGradient id="tbear-fur-${id}" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="${furColors[0]}"/>
      <stop offset="60%" stop-color="${furColors[1]}"/>
      <stop offset="100%" stop-color="${furColors[2]}"/>
    </radialGradient>
  `;

  const content = `
    <circle cx="34" cy="28" r="9" fill="url(#tbear-fur-${id})"/>
    <circle cx="34" cy="28" r="5" fill="#ffe0b2"/>
    <circle cx="66" cy="28" r="9" fill="url(#tbear-fur-${id})"/>
    <circle cx="66" cy="28" r="5" fill="#ffe0b2"/>

    <ellipse cx="50" cy="70" rx="19" ry="17" fill="url(#tbear-fur-${id})"/>
    <circle cx="38" cy="84" r="5" fill="#ffe0b2"/>
    <circle cx="62" cy="84" r="5" fill="#ffe0b2"/>

    <ellipse cx="44" cy="70" rx="4.5" ry="6" fill="url(#tbear-fur-${id})"/>
    <ellipse cx="56" cy="70" rx="4.5" ry="6" fill="url(#tbear-fur-${id})"/>

    <circle cx="50" cy="44" r="20" fill="url(#tbear-fur-${id})"/>

    <ellipse cx="37" cy="46" rx="4" ry="2.8" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>
    <ellipse cx="63" cy="46" rx="4" ry="2.8" fill="#ff8a80" opacity="0.55" filter="url(#clay-blur)"/>
    <circle cx="42" cy="40" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="58" cy="40" r="2.5" fill="url(#gloss-eye)"/>
    <circle cx="41.2" cy="39.2" r="0.85" fill="#ffffff"/>
    <circle cx="57.2" cy="39.2" r="0.85" fill="#ffffff"/>

    <ellipse cx="50" cy="46" rx="7" ry="5.5" fill="#ffffff"/>
    <ellipse cx="50" cy="44" rx="2.2" ry="1.5" fill="#4e342e"/>
    <path d="M48,47 Q50,49 52,47" stroke="#4e342e" stroke-width="1.2" fill="none"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 18. PANDA BEAR (国宝小熊猫) - Modeled faithfully after panda_bear.png
// -------------------------------------------------------------
function renderPanda(id) {
  const defs = `
    <radialGradient id="panda-w" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f5f5f5"/>
      <stop offset="100%" stop-color="#cfd8dc"/>
    </radialGradient>
  `;

  const content = `
    <circle cx="34" cy="28" r="9" fill="#212121"/>
    <circle cx="66" cy="28" r="9" fill="#212121"/>

    <ellipse cx="50" cy="70" rx="19" ry="17" fill="url(#panda-w)"/>
    <circle cx="36" cy="83" r="6" fill="#212121"/>
    <circle cx="64" cy="83" r="6" fill="#212121"/>
    <ellipse cx="43" cy="67" rx="5" ry="7" fill="#212121"/>
    <ellipse cx="57" cy="67" rx="5" ry="7" fill="#212121"/>

    <circle cx="50" cy="44" r="20" fill="url(#panda-w)"/>

    <ellipse cx="41" cy="41" rx="6" ry="4.5" fill="#212121" transform="rotate(-15 41 41)"/>
    <ellipse cx="59" cy="41" rx="6" ry="4.5" fill="#212121" transform="rotate(15 59 41)"/>
    <circle cx="41" cy="41" r="2.2" fill="#ffffff"/>
    <circle cx="59" cy="41" r="2.2" fill="#ffffff"/>
    <circle cx="41" cy="41" r="1.4" fill="#000000"/>
    <circle cx="59" cy="41" r="1.4" fill="#000000"/>

    <ellipse cx="50" cy="44" rx="2.5" ry="1.6" fill="#212121"/>
    <path d="M47,48 Q50,54 53,48 Z" fill="#e91e63"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 19. COFFEE CUP (随行咖啡杯) - Modeled faithfully after orange_coffee_cup.png
// -------------------------------------------------------------
function renderCoffeeCup(sleeveColors, id) {
  const defs = `
    <linearGradient id="cup-sleeve-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${sleeveColors[0]}"/>
      <stop offset="50%" stop-color="${sleeveColors[1]}"/>
      <stop offset="100%" stop-color="${sleeveColors[2]}"/>
    </linearGradient>
  `;

  const content = `
    <path d="M34,26 L38,86 Q50,89 62,86 L66,26 Z" fill="#ffffff" stroke="#cfd8dc" stroke-width="1.2"/>
    <path d="M35,46 L37,70 Q50,73 63,70 L65,46 Z" fill="url(#cup-sleeve-${id})"/>
    <rect x="30" y="16" width="40" height="12" rx="4" fill="url(#cup-sleeve-${id})"/>
    <rect x="33" y="12" width="34" height="6" rx="2" fill="url(#cup-sleeve-${id})"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 20. WINTER MITTEN (雪花手套) - Modeled faithfully after green_mitten.png
// -------------------------------------------------------------
function renderMitten(mittenColors, id) {
  const defs = `
    <linearGradient id="mitten-g-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${mittenColors[0]}"/>
      <stop offset="60%" stop-color="${mittenColors[1]}"/>
      <stop offset="100%" stop-color="${mittenColors[2]}"/>
    </linearGradient>
  `;

  const content = `
    <path d="M32,46 C24,46 22,58 32,60 Z" fill="url(#mitten-g-${id})"/>
    <path d="M30,36 C30,22 70,22 70,36 L70,74 C70,78 30,78 30,74 Z" fill="url(#mitten-g-${id})"/>

    <g transform="translate(52, 48)">
      <line x1="-8" y1="0" x2="8" y2="0" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="-6" y1="-6" x2="6" y2="6" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="-6" y1="6" x2="6" y2="-6" stroke="#ffffff" stroke-width="1.8"/>
      <circle cx="0" cy="0" r="1.5" fill="#ffffff"/>
    </g>

    <rect x="30" y="74" width="40" height="12" rx="3" fill="#ffe0b2"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 21. RED CANDLE (节日红蜡烛) - Modeled faithfully after red_candle.png
// -------------------------------------------------------------
function renderCandle(candleColors, id) {
  const defs = `
    <linearGradient id="candle-g-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${candleColors[0]}"/>
      <stop offset="50%" stop-color="${candleColors[1]}"/>
      <stop offset="100%" stop-color="${candleColors[2]}"/>
    </linearGradient>
    <radialGradient id="flame-g" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#ffeb3b"/>
      <stop offset="80%" stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#f44336"/>
    </radialGradient>
  `;

  const content = `
    <rect x="34" y="34" width="32" height="52" rx="4" fill="url(#candle-g-${id})"/>
    <path d="M34,34 Q38,48 42,42 Q46,52 50,44 Q54,54 58,42 Q62,48 66,34 Z" fill="${candleColors[0]}"/>
    <ellipse cx="50" cy="34" rx="16" ry="5" fill="${candleColors[0]}"/>
    <line x1="50" y1="34" x2="50" y2="24" stroke="#212121" stroke-width="1.8"/>
    <path d="M50,10 C46,16 46,24 50,26 C54,24 54,16 50,10 Z" fill="url(#flame-g)"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 22. YELLOW CHEESE (黄金奶酪块) - Modeled faithfully after yellow_cheese.png
// Swiss cheese sphere with crater holes.
// -------------------------------------------------------------
function renderCheese(id) {
  const defs = `
    <radialGradient id="cheese-sphere" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fff59d"/>
      <stop offset="50%" stop-color="#fbc02d"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
    <radialGradient id="crater-shadow" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#e65100" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
  `;

  const content = `
    <circle cx="50" cy="50" r="34" fill="url(#cheese-sphere)"/>
    <ellipse cx="32" cy="62" rx="9" ry="11" fill="url(#crater-shadow)"/>
    <ellipse cx="68" cy="70" rx="7" ry="8" fill="url(#crater-shadow)"/>
    <ellipse cx="44" cy="32" rx="5" ry="4" fill="url(#crater-shadow)"/>
    <ellipse cx="66" cy="30" rx="8" ry="7" fill="url(#crater-shadow)"/>
    <ellipse cx="38" cy="40" rx="4" ry="4.5" fill="url(#crater-shadow)"/>
    <circle cx="48" cy="80" r="3.5" fill="url(#crater-shadow)"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 23. CUTE CRAB (可爱小螃蟹) - Modeled faithfully after cute_crab.png
// Chubby coral pink crab, raised claws, glossy black eyes, blush.
// -------------------------------------------------------------
function renderCrab(id) {
  const defs = `
    <radialGradient id="crab-shell" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffab91"/>
      <stop offset="60%" stop-color="#ff7043"/>
      <stop offset="100%" stop-color="#d84315"/>
    </radialGradient>
  `;

  const content = `
    <!-- Walking Legs -->
    <path d="M26,64 L16,70 M24,70 L14,78 M24,76 L16,84" stroke="#ff7043" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M74,64 L84,70 M76,70 L86,78 M76,76 L84,84" stroke="#ff7043" stroke-width="2.8" stroke-linecap="round"/>

    <!-- Left Pincer Claw -->
    <path d="M30,46 C20,38 18,22 28,16 C34,22 34,34 32,46 Z" fill="url(#crab-shell)"/>
    <path d="M28,16 C22,24 24,32 30,34" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Right Pincer Claw -->
    <path d="M70,46 C80,38 82,22 72,16 C66,22 66,34 68,46 Z" fill="url(#crab-shell)"/>
    <path d="M72,16 C78,24 76,32 70,34" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Round Chubby Body -->
    <ellipse cx="50" cy="58" rx="24" ry="20" fill="url(#crab-shell)"/>

    <!-- Rosy Blush Cheeks -->
    <ellipse cx="38" cy="62" rx="3.5" ry="2.5" fill="#ff8a80" opacity="0.6" filter="url(#clay-blur)"/>
    <ellipse cx="62" cy="62" rx="3.5" ry="2.5" fill="#ff8a80" opacity="0.6" filter="url(#clay-blur)"/>

    <!-- Big Glossy Eyes -->
    <circle cx="42" cy="54" r="3" fill="url(#gloss-eye)"/>
    <circle cx="58" cy="54" r="3" fill="url(#gloss-eye)"/>
    <circle cx="41" cy="52.8" r="1.1" fill="#ffffff"/>
    <circle cx="57" cy="52.8" r="1.1" fill="#ffffff"/>

    <!-- Cute Smiling Mouth -->
    <path d="M47,61 Q50,64 53,61" stroke="#3e2723" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 24. LUCKY CLOVER (幸运四叶草) - Modeled faithfully after lucky_clover.png
// 4-leaf clover with soft glossy green leaves and stem.
// -------------------------------------------------------------
function renderClover(id) {
  const defs = `
    <radialGradient id="leaf-g" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#c5e1a5"/>
      <stop offset="50%" stop-color="#7cb342"/>
      <stop offset="100%" stop-color="#33691e"/>
    </radialGradient>
  `;

  const content = `
    <!-- Stem -->
    <path d="M50,50 Q48,74 54,88" stroke="#558b2f" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- 4 Heart-shaped Leaves -->
    <!-- Top Leaf -->
    <path d="M50,50 C40,38 34,22 46,18 C50,22 50,30 50,50 C50,30 50,22 54,18 C66,22 60,38 50,50 Z" fill="url(#leaf-g)"/>
    <!-- Bottom Leaf -->
    <path d="M50,50 C40,62 34,78 46,82 C50,78 50,70 50,50 C50,70 50,78 54,82 C66,78 60,62 50,50 Z" fill="url(#leaf-g)"/>
    <!-- Left Leaf -->
    <path d="M50,50 C38,40 22,34 18,46 C22,50 30,50 50,50 C30,50 22,50 18,54 C22,66 38,60 50,50 Z" fill="url(#leaf-g)"/>
    <!-- Right Leaf -->
    <path d="M50,50 C62,40 78,34 82,46 C78,50 70,50 50,50 C70,50 78,50 82,54 C78,66 62,60 50,50 Z" fill="url(#leaf-g)"/>

    <!-- Central Vein Glow -->
    <circle cx="50" cy="50" r="3.5" fill="#e8f5e9"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 25. CALENDAR 25 (圣诞日历25) - Modeled faithfully after red_calendar.png
// -------------------------------------------------------------
function renderCalendar(headerColor, id) {
  const content = `
    <!-- Calendar Block Base -->
    <rect x="26" y="24" width="48" height="62" rx="6" fill="#ffffff" stroke="#cfd8dc" stroke-width="1.2"/>
    <!-- Colored Header Band -->
    <path d="M26,30 C26,26 28,24 32,24 L68,24 C72,24 74,26 74,30 L74,44 L26,44 Z" fill="${headerColor}"/>

    <!-- Binder Rings -->
    <rect x="36" y="18" width="6" height="12" rx="3" fill="#90a4ae"/>
    <rect x="58" y="18" width="6" height="12" rx="3" fill="#90a4ae"/>

    <!-- "25" Typography -->
    <text x="50" y="76" font-size="28" font-weight="900" fill="#212121" text-anchor="middle" font-family="Arial Black, Impact, sans-serif">25</text>
  `;

  return wrapSvg('', content);
}

// -------------------------------------------------------------
// 26. CHIPS BAG (薯片袋) - Modeled faithfully after green_chips_bag.png
// -------------------------------------------------------------
function renderChipsBag(bagColors, flavorName, id) {
  const defs = `
    <linearGradient id="cbag-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bagColors[0]}"/>
      <stop offset="50%" stop-color="${bagColors[1]}"/>
      <stop offset="100%" stop-color="${bagColors[2]}"/>
    </linearGradient>
  `;

  const content = `
    <!-- Foil Pillow Bag Body -->
    <rect x="25" y="22" width="50" height="62" rx="6" fill="url(#cbag-${id})"/>

    <!-- Top & Bottom Crimped Edges -->
    <path d="M25,22 L28,18 L32,22 L36,18 L40,22 L44,18 L48,22 L52,18 L56,22 L60,18 L64,22 L68,18 L72,22 L75,18 L75,22 Z" fill="url(#cbag-${id})"/>
    <path d="M25,84 L28,88 L32,84 L36,88 L40,84 L44,88 L48,84 L52,88 L56,84 L60,88 L64,84 L68,88 L72,84 L75,88 L75,84 Z" fill="url(#cbag-${id})"/>

    <!-- Front Oval Flavor Badge -->
    <ellipse cx="50" cy="54" rx="17" ry="18" fill="#ffffff"/>
    <text x="50" y="48" font-size="6" font-weight="900" fill="#212121" text-anchor="middle" font-family="sans-serif">CHIPS</text>
    <ellipse cx="50" cy="62" rx="9" ry="5.5" fill="#fbc02d" transform="rotate(-15 50 62)"/>
  `;

  return wrapSvg(defs, content);
}

// -------------------------------------------------------------
// 27. WATERMELON SLICE (夏日甜西瓜) - Modeled faithfully after watermelon_slice.png
// -------------------------------------------------------------
function renderWatermelon(id) {
  const content = `
    <!-- Green Rind -->
    <path d="M24,28 Q50,92 76,28 Z" fill="#2e7d32"/>
    <!-- Light Green Inner Rind -->
    <path d="M26,30 Q50,88 74,30 Z" fill="#c8e6c9"/>
    <!-- Red Pulp -->
    <path d="M29,32 Q50,84 71,32 Z" fill="#d32f2f"/>

    <!-- Black Seeds -->
    <ellipse cx="44" cy="48" rx="1.5" ry="2.4" fill="#212121" transform="rotate(-15 44 48)"/>
    <ellipse cx="56" cy="48" rx="1.5" ry="2.4" fill="#212121" transform="rotate(15 56 48)"/>
    <ellipse cx="50" cy="62" rx="1.5" ry="2.4" fill="#212121"/>
  `;

  return wrapSvg('', content);
}


// =============================================================
// COMPREHENSIVE AUTHENTIC ITEMS CATALOG (65 AUTHENTIC ITEMS)
// =============================================================
const ITEMS_TO_GENERATE = [
  // 1. SNOWMEN (雪人 - Only hat & scarf & buttons change, as requested!)
  {
    id: 'blue_snowman',
    name: '蓝帽雪人',
    archetype: 'snowman',
    colorGroup: 'blue',
    render: () => renderSnowman(['#70c4ff', '#3da2f5', '#1e7bd6'], ['#63bcfa', '#3598eb', '#1c72ca'], ['#68bdfa', '#258bd6', '#105696'], 'blue_snowman')
  },
  {
    id: 'red_snowman',
    name: '红帽雪人',
    archetype: 'snowman',
    colorGroup: 'red',
    render: () => renderSnowman(['#ff8a80', '#e53935', '#b71c1c'], ['#ef5350', '#d32f2f', '#c62828'], ['#ef5350', '#d32f2f', '#b71c1c'], 'red_snowman')
  },
  {
    id: 'green_snowman',
    name: '绿帽雪人',
    archetype: 'snowman',
    colorGroup: 'green',
    render: () => renderSnowman(['#a5d6a7', '#43a047', '#1b5e20'], ['#81c784', '#388e3c', '#2e7d32'], ['#81c784', '#388e3c', '#1b5e20'], 'green_snowman')
  },
  {
    id: 'yellow_snowman',
    name: '黄帽雪人',
    archetype: 'snowman',
    colorGroup: 'yellow',
    render: () => renderSnowman(['#ffe082', '#ffb300', '#ff8f00'], ['#ffd54f', '#ffa000', '#e65100'], ['#ffd54f', '#ffa000', '#f57c00'], 'yellow_snowman')
  },
  {
    id: 'purple_snowman',
    name: '紫帽雪人',
    archetype: 'snowman',
    colorGroup: 'purple',
    render: () => renderSnowman(['#ce93d8', '#8e24aa', '#4a148c'], ['#ba68c8', '#7b1fa2', '#6a1b9a'], ['#ba68c8', '#7b1fa2', '#4a148c'], 'purple_snowman')
  },
  {
    id: 'pink_snowman',
    name: '粉帽雪人',
    archetype: 'snowman',
    colorGroup: 'pink',
    render: () => renderSnowman(['#f48fb1', '#d81b60', '#880e4f'], ['#ec407a', '#c2185b', '#ad1457'], ['#ec407a', '#c2185b', '#880e4f'], 'pink_snowman')
  },

  // 2. PEA BUNNY (豌豆小兔)
  {
    id: 'pea_bunny',
    name: '豌豆小兔',
    archetype: 'pea_bunny',
    colorGroup: 'green',
    render: () => renderPeaBunny(['#c5e1a5', '#8bc34a', '#558b2f'], 'pea_bunny')
  },
  {
    id: 'gold_pea_bunny',
    name: '金豆小兔',
    archetype: 'pea_bunny',
    colorGroup: 'yellow',
    render: () => renderPeaBunny(['#fff59d', '#fbc02d', '#f57f17'], 'gold_pea_bunny')
  },
  {
    id: 'pink_pea_bunny',
    name: '粉豆小兔',
    archetype: 'pea_bunny',
    colorGroup: 'pink',
    render: () => renderPeaBunny(['#f8bbd0', '#f06292', '#c2185b'], 'pink_pea_bunny')
  },

  // 3. XMAS TREE (圣诞树)
  {
    id: 'xmas_tree',
    name: '圣诞绿树',
    archetype: 'xmas_tree',
    colorGroup: 'green',
    render: () => renderXmasTree(['#aed581', '#7cb342', '#33691e'], 'xmas_tree')
  },
  {
    id: 'red_wish_tree',
    name: '红愿圣诞树',
    archetype: 'xmas_tree',
    colorGroup: 'red',
    render: () => renderXmasTree(['#ef9a9a', '#e53935', '#b71c1c'], 'red_wish_tree')
  },
  {
    id: 'tiered_green_tree',
    name: '多层圣诞树',
    archetype: 'xmas_tree',
    colorGroup: 'cyan_green',
    render: () => renderXmasTree(['#80cbc4', '#00897b', '#004d40'], 'tiered_green_tree')
  },

  // 4. XMAS REINDEER (圣诞小鹿)
  {
    id: 'xmas_reindeer',
    name: '圣诞小鹿',
    archetype: 'xmas_reindeer',
    colorGroup: 'brown',
    render: () => renderReindeer('xmas_reindeer')
  },

  // 5. XMAS GNOME (圣诞小矮人)
  {
    id: 'xmas_gnome',
    name: '圣诞小矮人',
    archetype: 'xmas_gnome',
    colorGroup: 'red',
    render: () => renderGnome(['#ff8a80', '#e53935', '#b71c1c'], '#43a047', 'xmas_gnome')
  },

  // 6. STOCKINGS (长袜)
  {
    id: 'polka_stocking',
    name: '红白长袜',
    archetype: 'stocking',
    colorGroup: 'red',
    render: () => renderStocking(['#ff8a80', '#e53935', '#b71c1c'], 'polka_stocking')
  },
  {
    id: 'green_xmas_sock',
    name: '红边绿长袜',
    archetype: 'stocking',
    colorGroup: 'green',
    render: () => renderStocking(['#a5d6a7', '#43a047', '#1b5e20'], 'green_xmas_sock')
  },

  // 7. POUCH (圣诞福袋)
  {
    id: 'red_pouch',
    name: '圣诞福袋',
    archetype: 'red_pouch',
    colorGroup: 'red',
    render: () => renderPouch(['#ff8a80', '#e53935', '#b71c1c'], 'red_pouch')
  },

  // 8. BELLS (铃铛)
  {
    id: 'gold_bell',
    name: '圣诞金铃',
    archetype: 'bell',
    colorGroup: 'yellow',
    render: () => renderBell(['#fff9c4', '#fbc02d', '#f57f17'], '#d32f2f', 'gold_bell')
  },
  {
    id: 'bronze_bell',
    name: '铜色金铃',
    archetype: 'bell',
    colorGroup: 'brown',
    render: () => renderBell(['#ffe0b2', '#fb8c00', '#e65100'], '#388e3c', 'bronze_bell')
  },

  // 9. GIFT BOXES (礼盒)
  {
    id: 'pink_gift_box',
    name: '金带粉礼盒',
    archetype: 'gift_box',
    colorGroup: 'pink',
    render: () => renderGiftBox(['#f8bbd0', '#ec407a', '#c2185b'], ['#fff9c4', '#fbc02d', '#f57f17'], 'pink_gift_box')
  },
  {
    id: 'yellow_gift_box',
    name: '暖黄红带礼盒',
    archetype: 'gift_box',
    colorGroup: 'yellow',
    render: () => renderGiftBox(['#fff9c4', '#fbc02d', '#f57f17'], ['#ff8a80', '#e53935', '#b71c1c'], 'yellow_gift_box')
  },
  {
    id: 'white_gift_box',
    name: '红带白礼盒',
    archetype: 'gift_box',
    colorGroup: 'white',
    render: () => renderGiftBox(['#ffffff', '#eceff1', '#cfd8dc'], ['#ff8a80', '#e53935', '#b71c1c'], 'white_gift_box')
  },
  {
    id: 'green_gift_box',
    name: '黄带绿礼盒',
    archetype: 'gift_box',
    colorGroup: 'green',
    render: () => renderGiftBox(['#c8e6c9', '#43a047', '#1b5e20'], ['#fff9c4', '#fbc02d', '#f57f17'], 'green_gift_box')
  },
  {
    id: 'green_red_gift',
    name: '绿盒红带礼盒',
    archetype: 'gift_box',
    colorGroup: 'green_red',
    render: () => renderGiftBox(['#a5d6a7', '#388e3c', '#1b5e20'], ['#ef5350', '#d32f2f', '#c62828'], 'green_red_gift')
  },
  {
    id: 'red_yellow_gift',
    name: '红盒黄带礼盒',
    archetype: 'gift_box',
    colorGroup: 'red_yellow',
    render: () => renderGiftBox(['#ef9a9a', '#e53935', '#b71c1c'], ['#fff59d', '#fbc02d', '#f57f17'], 'red_yellow_gift')
  },
  {
    id: 'striped_gift_box',
    name: '条纹节日礼盒',
    archetype: 'gift_box',
    colorGroup: 'purple',
    render: () => renderGiftBox(['#e1bee7', '#8e24aa', '#4a148c'], ['#fff9c4', '#fbc02d', '#f57f17'], 'striped_gift_box')
  },
  {
    id: 'pink_gold_gift',
    name: '典雅粉金盒',
    archetype: 'gift_box',
    colorGroup: 'gold_pink',
    render: () => renderGiftBox(['#fce4ec', '#f06292', '#ad1457'], ['#fffde7', '#ffd54f', '#ff8f00'], 'pink_gold_gift')
  },

  // 10. DONE BOTTLES (Done水杯)
  {
    id: 'cyan_done_bottle',
    name: '蓝Done水杯',
    archetype: 'done_bottle',
    colorGroup: 'cyan',
    render: () => renderDoneBottle(['#80deea', '#00acc1', '#006064'], '#00838f', 'cyan_done_bottle')
  },
  {
    id: 'pink_done_bottle',
    name: '粉Done水杯',
    archetype: 'done_bottle',
    colorGroup: 'pink',
    render: () => renderDoneBottle(['#f48fb1', '#d81b60', '#880e4f'], '#ad1457', 'pink_done_bottle')
  },
  {
    id: 'teal_done_bottle',
    name: '蓝Done水壶',
    archetype: 'done_bottle',
    colorGroup: 'teal',
    render: () => renderDoneBottle(['#80cbc4', '#00897b', '#004d40'], '#00695c', 'teal_done_bottle')
  },

  // 11. BEAR BOTTLE (小熊饮料瓶)
  {
    id: 'bear_bottle',
    name: '小熊饮料瓶',
    archetype: 'bear_bottle',
    colorGroup: 'orange',
    render: () => renderBearBottle('bear_bottle')
  },

  // 12. LOLLIPOPS (棒棒糖)
  {
    id: 'pink_lollipop',
    name: '粉色棒棒糖',
    archetype: 'lollipop',
    colorGroup: 'pink',
    render: () => renderLollipop(['#f8bbd0', '#ec407a', '#c2185b'], 'pink_lollipop')
  },
  {
    id: 'green_lollipop',
    name: '抹茶棒棒糖',
    archetype: 'lollipop',
    colorGroup: 'green',
    render: () => renderLollipop(['#c8e6c9', '#43a047', '#1b5e20'], 'green_lollipop')
  },

  // 13. FROG (萌萌小青蛙)
  {
    id: 'green_frog',
    name: '萌萌小青蛙',
    archetype: 'frog',
    colorGroup: 'green',
    render: () => renderFrog('green_frog')
  },

  // 14. YELLOW CHICK (金黄小鸡公仔)
  {
    id: 'yellow_chick',
    name: '金黄小鸡公仔',
    archetype: 'chick',
    colorGroup: 'yellow',
    render: () => renderYellowChick('yellow_chick')
  },

  // 15. COOKIE BUCKET (雪花饼干罐)
  {
    id: 'red_cookie_bucket',
    name: '雪花饼干罐',
    archetype: 'cookie_bucket',
    colorGroup: 'red',
    render: () => renderCookieBucket('red_cookie_bucket')
  },

  // 16. MILK CARTONS (鲜牛奶盒)
  {
    id: 'blue_milk_carton',
    name: '蓝盒鲜牛奶',
    archetype: 'milk_carton',
    colorGroup: 'blue',
    render: () => renderMilkCarton(['#90caf9', '#1e88e5', '#0d47a1'], 'blue_milk_carton')
  },
  {
    id: 'classic_milk',
    name: '醇香全脂奶',
    archetype: 'milk_carton',
    colorGroup: 'navy',
    render: () => renderMilkCarton(['#64b5f6', '#1565c0', '#0a3880'], 'classic_milk')
  },
  {
    id: 'farm_cow_milk',
    name: '高钙牧场奶',
    archetype: 'milk_carton',
    colorGroup: 'sky',
    render: () => renderMilkCarton(['#bbdefb', '#42a5f5', '#1976d2'], 'farm_cow_milk')
  },

  // 17. TEDDY BEAR (毛绒熊)
  {
    id: 'teddy_bear',
    name: '毛绒泰迪熊',
    archetype: 'bear',
    colorGroup: 'brown',
    render: () => renderTeddyBear(['#ffe0b2', '#ffb74d', '#f57c00'], 'teddy_bear')
  },
  {
    id: 'purple_bear',
    name: '紫色小玩偶',
    archetype: 'bear',
    colorGroup: 'purple',
    render: () => renderTeddyBear(['#e1bee7', '#ab47bc', '#7b1fa2'], 'purple_bear')
  },

  // 18. PANDA (国宝小熊猫)
  {
    id: 'panda_bear',
    name: '国宝小熊猫',
    archetype: 'panda',
    colorGroup: 'black_white',
    render: () => renderPanda('panda_bear')
  },

  // 19. COFFEE CUP (随行咖啡杯)
  {
    id: 'orange_coffee_cup',
    name: '随行咖啡杯',
    archetype: 'coffee_cup',
    colorGroup: 'orange',
    render: () => renderCoffeeCup(['#ffcc80', '#fb8c00', '#e65100'], 'orange_coffee_cup')
  },

  // 20. MITTEN (手套)
  {
    id: 'green_mitten',
    name: '雪花绿手套',
    archetype: 'mitten',
    colorGroup: 'green',
    render: () => renderMitten(['#a5d6a7', '#43a047', '#1b5e20'], 'green_mitten')
  },

  // 21. CANDLE (蜡烛)
  {
    id: 'red_candle',
    name: '节日红蜡烛',
    archetype: 'candle',
    colorGroup: 'red',
    render: () => renderCandle(['#ef5350', '#e53935', '#b71c1c'], 'red_candle')
  },

  // 22. SWISS CHEESE (黄金奶酪)
  {
    id: 'yellow_cheese',
    name: '黄金奶酪块',
    archetype: 'cheese',
    colorGroup: 'yellow',
    render: () => renderCheese('yellow_cheese')
  },

  // 23. CUTE CRAB (可爱小螃蟹)
  {
    id: 'cute_crab',
    name: '可爱小螃蟹',
    archetype: 'crab',
    colorGroup: 'coral',
    render: () => renderCrab('cute_crab')
  },

  // 24. LUCKY CLOVER (幸运四叶草)
  {
    id: 'lucky_clover',
    name: '幸运四叶草',
    archetype: 'clover',
    colorGroup: 'green',
    render: () => renderClover('lucky_clover')
  },

  // 25. CALENDARS (日历25)
  {
    id: 'red_calendar',
    name: '圣诞日历25',
    archetype: 'calendar',
    colorGroup: 'red',
    render: () => renderCalendar('#d32f2f', 'red_calendar')
  },
  {
    id: 'green_calendar',
    name: '绿色日历25',
    archetype: 'calendar',
    colorGroup: 'green',
    render: () => renderCalendar('#388e3c', 'green_calendar')
  },

  // 26. CHIPS BAGS (薯片零食袋)
  {
    id: 'green_chips_bag',
    name: '青柠薯片袋',
    archetype: 'chips',
    colorGroup: 'green',
    render: () => renderChipsBag(['#aed581', '#7cb342', '#33691e'], 'LIME', 'green_chips_bag')
  },
  {
    id: 'red_snack_bag',
    name: '红色小零食',
    archetype: 'chips',
    colorGroup: 'red',
    render: () => renderChipsBag(['#ef5350', '#d32f2f', '#b71c1c'], 'HOT', 'red_snack_bag')
  },
  {
    id: 'purple_snack_bag',
    name: '香芋零食包',
    archetype: 'chips',
    colorGroup: 'purple',
    render: () => renderChipsBag(['#ba68c8', '#8e24aa', '#4a148c'], 'TARO', 'purple_snack_bag')
  },
  {
    id: 'yellow_chips',
    name: '黄金波浪薯片',
    archetype: 'chips',
    colorGroup: 'yellow',
    render: () => renderChipsBag(['#fff176', '#fbc02d', '#f57f17'], 'CORN', 'yellow_chips')
  },

  // 27. WATERMELON SLICE (夏日甜西瓜)
  {
    id: 'watermelon_slice',
    name: '夏日甜西瓜',
    archetype: 'watermelon',
    colorGroup: 'red_green',
    render: () => renderWatermelon('watermelon_slice')
  }
];

// Generate files and update catalog
console.log(`[SVG Generator] Generating ${ITEMS_TO_GENERATE.length} authentic 3D SVG items...`);

const catalog = {};

ITEMS_TO_GENERATE.forEach(item => {
  const svgContent = item.render();
  const filePath = path.join(itemsDir, `${item.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');

  catalog[item.id] = {
    id: item.id,
    name: item.name,
    archetype: item.archetype,
    colorGroup: item.colorGroup,
    img: `./assets/items/${item.id}.svg`
  };
});

const jsonPath = path.join(itemsDir, 'items_data.json');
fs.writeFileSync(jsonPath, JSON.stringify(catalog, null, 2), 'utf8');

const srcItemsJsPath = path.join(__dirname, '..', 'src', 'items.js');
const srcItemsJsContent = `// Authentic 3D Figurines & Clay-Style Item Assets (Procedural Vector SVG Modeled after original PNGs)
export const ITEMS = ${JSON.stringify(catalog, null, 2)};

export const ITEM_KEYS = Object.keys(ITEMS);
`;
fs.writeFileSync(srcItemsJsPath, srcItemsJsContent, 'utf8');

console.log(`[SVG Generator] Successfully generated ${ITEMS_TO_GENERATE.length} SVGs to ${itemsDir}!`);
console.log(`[SVG Generator] Catalog updated at ${jsonPath}`);
console.log(`[SVG Generator] Updated ${srcItemsJsPath}`);

module.exports = { ITEMS_TO_GENERATE, catalog };

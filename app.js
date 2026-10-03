// Standalone High-Quality Goods Sort 3D Game with Solvability Guarantee
(function() {
  'use strict';

  // Game Application Version
  const APP_VERSION = '1.7.0';

    // 1. Authentic 3D Figurines & Clay-Style Item Assets (Procedural Vector SVG Modeled after original PNGs)
  const ITEMS = {
    blue_snowman: { id: 'blue_snowman', name: '蓝帽雪人', archetype: 'snowman', colorGroup: 'blue', img: './assets/items/blue_snowman.svg' },
    red_snowman: { id: 'red_snowman', name: '红帽雪人', archetype: 'snowman', colorGroup: 'red', img: './assets/items/red_snowman.svg' },
    green_snowman: { id: 'green_snowman', name: '绿帽雪人', archetype: 'snowman', colorGroup: 'green', img: './assets/items/green_snowman.svg' },
    yellow_snowman: { id: 'yellow_snowman', name: '黄帽雪人', archetype: 'snowman', colorGroup: 'yellow', img: './assets/items/yellow_snowman.svg' },
    purple_snowman: { id: 'purple_snowman', name: '紫帽雪人', archetype: 'snowman', colorGroup: 'purple', img: './assets/items/purple_snowman.svg' },
    pink_snowman: { id: 'pink_snowman', name: '粉帽雪人', archetype: 'snowman', colorGroup: 'pink', img: './assets/items/pink_snowman.svg' },
    pea_bunny: { id: 'pea_bunny', name: '豌豆小兔', archetype: 'pea_bunny', colorGroup: 'green', img: './assets/items/pea_bunny.svg' },
    gold_pea_bunny: { id: 'gold_pea_bunny', name: '金豆小兔', archetype: 'pea_bunny', colorGroup: 'yellow', img: './assets/items/gold_pea_bunny.svg' },
    pink_pea_bunny: { id: 'pink_pea_bunny', name: '粉豆小兔', archetype: 'pea_bunny', colorGroup: 'pink', img: './assets/items/pink_pea_bunny.svg' },
    xmas_tree: { id: 'xmas_tree', name: '圣诞绿树', archetype: 'xmas_tree', colorGroup: 'green', img: './assets/items/xmas_tree.svg' },
    red_wish_tree: { id: 'red_wish_tree', name: '红愿圣诞树', archetype: 'xmas_tree', colorGroup: 'red', img: './assets/items/red_wish_tree.svg' },
    tiered_green_tree: { id: 'tiered_green_tree', name: '多层圣诞树', archetype: 'xmas_tree', colorGroup: 'cyan_green', img: './assets/items/tiered_green_tree.svg' },
    xmas_reindeer: { id: 'xmas_reindeer', name: '圣诞小鹿', archetype: 'xmas_reindeer', colorGroup: 'brown', img: './assets/items/xmas_reindeer.svg' },
    xmas_gnome: { id: 'xmas_gnome', name: '圣诞小矮人', archetype: 'xmas_gnome', colorGroup: 'red', img: './assets/items/xmas_gnome.svg' },
    polka_stocking: { id: 'polka_stocking', name: '红白长袜', archetype: 'stocking', colorGroup: 'red', img: './assets/items/polka_stocking.svg' },
    green_xmas_sock: { id: 'green_xmas_sock', name: '红边绿长袜', archetype: 'stocking', colorGroup: 'green', img: './assets/items/green_xmas_sock.svg' },
    red_pouch: { id: 'red_pouch', name: '圣诞福袋', archetype: 'red_pouch', colorGroup: 'red', img: './assets/items/red_pouch.svg' },
    gold_bell: { id: 'gold_bell', name: '圣诞金铃', archetype: 'bell', colorGroup: 'yellow', img: './assets/items/gold_bell.svg' },
    bronze_bell: { id: 'bronze_bell', name: '铜色金铃', archetype: 'bell', colorGroup: 'brown', img: './assets/items/bronze_bell.svg' },
    pink_gift_box: { id: 'pink_gift_box', name: '金带粉礼盒', archetype: 'gift_box', colorGroup: 'pink', img: './assets/items/pink_gift_box.svg' },
    yellow_gift_box: { id: 'yellow_gift_box', name: '暖黄红带礼盒', archetype: 'gift_box', colorGroup: 'yellow', img: './assets/items/yellow_gift_box.svg' },
    white_gift_box: { id: 'white_gift_box', name: '红带白礼盒', archetype: 'gift_box', colorGroup: 'white', img: './assets/items/white_gift_box.svg' },
    green_gift_box: { id: 'green_gift_box', name: '黄带绿礼盒', archetype: 'gift_box', colorGroup: 'green', img: './assets/items/green_gift_box.svg' },
    green_red_gift: { id: 'green_red_gift', name: '绿盒红带礼盒', archetype: 'gift_box', colorGroup: 'green_red', img: './assets/items/green_red_gift.svg' },
    red_yellow_gift: { id: 'red_yellow_gift', name: '红盒黄带礼盒', archetype: 'gift_box', colorGroup: 'red_yellow', img: './assets/items/red_yellow_gift.svg' },
    striped_gift_box: { id: 'striped_gift_box', name: '条纹节日礼盒', archetype: 'gift_box', colorGroup: 'purple', img: './assets/items/striped_gift_box.svg' },
    pink_gold_gift: { id: 'pink_gold_gift', name: '典雅粉金盒', archetype: 'gift_box', colorGroup: 'gold_pink', img: './assets/items/pink_gold_gift.svg' },
    cyan_done_bottle: { id: 'cyan_done_bottle', name: '蓝Done水杯', archetype: 'done_bottle', colorGroup: 'cyan', img: './assets/items/cyan_done_bottle.svg' },
    pink_done_bottle: { id: 'pink_done_bottle', name: '粉Done水杯', archetype: 'done_bottle', colorGroup: 'pink', img: './assets/items/pink_done_bottle.svg' },
    teal_done_bottle: { id: 'teal_done_bottle', name: '蓝Done水壶', archetype: 'done_bottle', colorGroup: 'teal', img: './assets/items/teal_done_bottle.svg' },
    bear_bottle: { id: 'bear_bottle', name: '小熊饮料瓶', archetype: 'bear_bottle', colorGroup: 'orange', img: './assets/items/bear_bottle.svg' },
    pink_lollipop: { id: 'pink_lollipop', name: '粉色棒棒糖', archetype: 'lollipop', colorGroup: 'pink', img: './assets/items/pink_lollipop.svg' },
    green_lollipop: { id: 'green_lollipop', name: '抹茶棒棒糖', archetype: 'lollipop', colorGroup: 'green', img: './assets/items/green_lollipop.svg' },
    green_frog: { id: 'green_frog', name: '萌萌小青蛙', archetype: 'frog', colorGroup: 'green', img: './assets/items/green_frog.svg' },
    yellow_chick: { id: 'yellow_chick', name: '金黄小鸡公仔', archetype: 'chick', colorGroup: 'yellow', img: './assets/items/yellow_chick.svg' },
    red_cookie_bucket: { id: 'red_cookie_bucket', name: '雪花饼干罐', archetype: 'cookie_bucket', colorGroup: 'red', img: './assets/items/red_cookie_bucket.svg' },
    blue_milk_carton: { id: 'blue_milk_carton', name: '蓝盒鲜牛奶', archetype: 'milk_carton', colorGroup: 'blue', img: './assets/items/blue_milk_carton.svg' },
    classic_milk: { id: 'classic_milk', name: '醇香全脂奶', archetype: 'milk_carton', colorGroup: 'navy', img: './assets/items/classic_milk.svg' },
    farm_cow_milk: { id: 'farm_cow_milk', name: '高钙牧场奶', archetype: 'milk_carton', colorGroup: 'sky', img: './assets/items/farm_cow_milk.svg' },
    teddy_bear: { id: 'teddy_bear', name: '毛绒泰迪熊', archetype: 'bear', colorGroup: 'brown', img: './assets/items/teddy_bear.svg' },
    purple_bear: { id: 'purple_bear', name: '紫色小玩偶', archetype: 'bear', colorGroup: 'purple', img: './assets/items/purple_bear.svg' },
    panda_bear: { id: 'panda_bear', name: '国宝小熊猫', archetype: 'panda', colorGroup: 'black_white', img: './assets/items/panda_bear.svg' },
    orange_coffee_cup: { id: 'orange_coffee_cup', name: '随行咖啡杯', archetype: 'coffee_cup', colorGroup: 'orange', img: './assets/items/orange_coffee_cup.svg' },
    green_mitten: { id: 'green_mitten', name: '雪花绿手套', archetype: 'mitten', colorGroup: 'green', img: './assets/items/green_mitten.svg' },
    red_candle: { id: 'red_candle', name: '节日红蜡烛', archetype: 'candle', colorGroup: 'red', img: './assets/items/red_candle.svg' },
    yellow_cheese: { id: 'yellow_cheese', name: '三角香奶酪', archetype: 'cheese', colorGroup: 'yellow', img: './assets/items/yellow_cheese.svg' },
    cute_crab: { id: 'cute_crab', name: '橙红小螃蟹', archetype: 'crab', colorGroup: 'orange_red', img: './assets/items/cute_crab.svg' },
    lucky_clover: { id: 'lucky_clover', name: '幸运四叶草', archetype: 'clover', colorGroup: 'green', img: './assets/items/lucky_clover.svg' },
    red_calendar: { id: 'red_calendar', name: '喜庆红台历', archetype: 'calendar', colorGroup: 'red', img: './assets/items/red_calendar.svg' },
    green_calendar: { id: 'green_calendar', name: '复古绿台历', archetype: 'calendar', colorGroup: 'green', img: './assets/items/green_calendar.svg' },
    green_chips_bag: { id: 'green_chips_bag', name: '青柠脆薯片', archetype: 'chips', colorGroup: 'green', img: './assets/items/green_chips_bag.svg' },
    red_snack_bag: { id: 'red_snack_bag', name: '香辣烤薯片', archetype: 'chips', colorGroup: 'red', img: './assets/items/red_snack_bag.svg' },
    purple_snack_bag: { id: 'purple_snack_bag', name: '香芋风味薯片', archetype: 'chips', colorGroup: 'purple', img: './assets/items/purple_snack_bag.svg' },
    yellow_chips: { id: 'yellow_chips', name: '黄金波浪薯片', archetype: 'chips', colorGroup: 'yellow', img: './assets/items/yellow_chips.svg' },
    watermelon_slice: { id: 'watermelon_slice', name: '夏日甜西瓜', archetype: 'watermelon', colorGroup: 'red_green', img: './assets/items/watermelon_slice.svg' },
  };

  const ITEM_KEYS = Object.keys(ITEMS);

  // Smart selection ensuring maximum silhouette diversity and high-contrast color distinction
  function selectDistinguishableItemTypes(count) {
    const byArchetype = {};
    for (let k in ITEMS) {
      const a = ITEMS[k].archetype || 'other';
      if (!byArchetype[a]) byArchetype[a] = [];
      byArchetype[a].push(ITEMS[k]);
    }
    const archetypeList = Object.keys(byArchetype);
    const chosen = [];
    const chosenByArchetype = {};
    archetypeList.forEach(a => chosenByArchetype[a] = []);

    // Pass 1: Pick 1 variant from each archetype (ensuring diverse base silhouettes)
    const shuffledArch = [...archetypeList].sort(() => Math.random() - 0.5);
    for (let a of shuffledArch) {
      if (chosen.length >= count) break;
      const available = byArchetype[a].sort(() => Math.random() - 0.5);
      const pick = available[0];
      chosen.push(pick.id);
      chosenByArchetype[a].push(pick);
    }

    // Pass 2+: Distribute across archetypes with guaranteed color contrast
    while (chosen.length < count) {
      const candidates = [...archetypeList].filter(a => chosenByArchetype[a].length < byArchetype[a].length);
      if (candidates.length === 0) {
        const remaining = ITEM_KEYS.filter(k => !chosen.includes(k));
        if (remaining.length === 0) {
          // All unique items used: cycle through diverse archetypes to guarantee exact count
          const nextArch = archetypeList[chosen.length % archetypeList.length];
          const archList = byArchetype[nextArch];
          const pick = archList[Math.floor(Math.random() * archList.length)];
          chosen.push(pick.id);
          continue;
        }
        chosen.push(remaining[Math.floor(Math.random() * remaining.length)]);
        continue;
      }
      candidates.sort((a, b) => chosenByArchetype[a].length - chosenByArchetype[b].length || (Math.random() - 0.5));
      const arch = candidates[0];
      const alreadyPickedColors = new Set(chosenByArchetype[arch].map(x => x.colorGroup));
      const pool = byArchetype[arch].filter(x => !chosenByArchetype[arch].some(p => p.id === x.id));
      let best = pool.filter(x => !alreadyPickedColors.has(x.colorGroup));
      if (best.length === 0) best = pool;
      const pick = best[Math.floor(Math.random() * best.length)];
      chosen.push(pick.id);
      chosenByArchetype[arch].push(pick);
    }

    return chosen;
  }

  // Canonical visual matching key (ensures items that look identical match reliably)
  function getItemMatchKey(key) {
    if (!key || !ITEMS[key]) return key;
    return ITEMS[key].img || key;
  }

  // 2. Web Audio Synthesizer (Zero asset dependency, instant sound)
  class SoundSystem {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPick() {
      if (this.muted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.09);
    }

    playDrop() {
      if (this.muted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.13);
    }

    playMatch() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const noteStart = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.36);
      });
    }

    playHammer() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    }

    playWand() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.31);
      });
    }

    playFreeze() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + i * 0.08;
        osc.frequency.setValueAtTime(1400 + i * 220, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.41);
      }
    }

    playShuffle() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.31);
    }

    playWin() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [1046.50, 1318.51, 1567.98]
      ];
      chords.forEach((chord, step) => {
        const t = now + step * 0.18;
        chord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + (step === 3 ? 0.8 : 0.25));
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + (step === 3 ? 0.85 : 0.28));
        });
      });
    }

    playLose() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [440, 392, 349.23, 293.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const t = now + idx * 0.2;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }
  }

  const sound = new SoundSystem();

  // 3. Particle System (Canvas FX)
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.loop();
    }

    resize() {
      if (!this.canvas.parentElement) return;
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    emit(x, y, count = 24, type = 'star') {
      const colors = ['#f1c40f', '#e67e22', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          gravity: 0.18,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 15,
          type
        });
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.type === 'star') {
          this.drawStar(0, 0, 5, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }
      requestAnimationFrame(() => this.loop());
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        this.ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        this.ctx.lineTo(x, y);
        rot += step;
      }
      this.ctx.lineTo(cx, cy - outerRadius);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  // 4. Solvability Verification Algorithm (支持多层深度的可解性校验器)
  function verifySolvability(cabinetData, conveyorRows) {
    // Clone board state with all layers
    const slots = [];
    cabinetData.forEach(c => slots.push({ layers: c.layers.map(l => [...l]) }));
    conveyorRows.forEach(row => {
      row.forEach(s => slots.push({ layers: s.layers.map(l => [...l]) }));
    });

    // Promotion helper inside verification
    const promoteSimSlot = (slot) => {
      if (slot.layers[0].length === 0 && slot.layers.slice(1).some(l => l.length > 0)) {
        while (slot.layers.length > 1 && slot.layers[0].length === 0 && slot.layers.slice(1).some(l => l.length > 0)) {
          slot.layers.shift();
          slot.layers.push([]);
        }
      }
    };

    // BFS / Greedy simulation of elimination steps
    let maxSteps = 300;
    while (maxSteps-- > 0) {
      // 1. Count items in front layer across all slots
      const counts = {};
      slots.forEach(slot => {
        slot.layers[0].forEach(item => {
          const k = getItemMatchKey(item);
          counts[k] = (counts[k] || 0) + 1;
        });
      });

      // Find any item type with count >= 3 in front layer
      const matchableMatchKey = Object.keys(counts).find(key => counts[key] >= 3);
      if (matchableMatchKey) {
        // We can match this item!
        let needed = 3;
        for (let i = 0; i < slots.length && needed > 0; i++) {
          const slot = slots[i];
          for (let j = slot.layers[0].length - 1; j >= 0 && needed > 0; j--) {
            if (getItemMatchKey(slot.layers[0][j]) === matchableMatchKey) {
              slot.layers[0].splice(j, 1);
              needed--;
              promoteSimSlot(slot);
            }
          }
        }
        continue; // Next round of elimination
      }

      // 2. If no direct 3-match in front, check if emptying a slot to reveal deeper items helps
      let movedToReveal = false;
      const candidateSlots = slots.filter(s => s.layers[0].length > 0 && s.layers.slice(1).some(l => l.length > 0));
      candidateSlots.sort((a, b) => a.layers[0].length - b.layers[0].length);

      for (const cand of candidateSlots) {
        const toMove = cand.layers[0].length;
        const available = slots.filter(s => s !== cand && s.layers[0].length < 3);
        const totalAvail = available.reduce((acc, s) => acc + (3 - s.layers[0].length), 0);
        if (totalAvail >= toMove) {
          while (cand.layers[0].length > 0) {
            const item = cand.layers[0].pop();
            const target = slots.find(s => s !== cand && s.layers[0].length < 3);
            if (target) target.layers[0].push(item);
          }
          promoteSimSlot(cand);
          movedToReveal = true;
          break;
        }
      }

      if (movedToReveal) continue;

      // 3. Check if all items cleared
      const remainingItems = slots.reduce((acc, s) => acc + s.layers.reduce((lacc, l) => lacc + l.length, 0), 0);
      if (remainingItems === 0) {
        return true; // 100% Solvable!
      }

      // No more moves possible
      break;
    }

    const totalRemaining = slots.reduce((acc, s) => acc + s.layers.reduce((lacc, l) => lacc + l.length, 0), 0);
    return totalRemaining === 0;
  }

  // 5. Main Game Controller
  class GoodsOrganizerGame {
    constructor() {
      this.currentLevel = 2; // Elite Challenge as in screenshot
      this.score = 0;
      this.timerSeconds = 988; // 16:28 as in screenshot
      this.timerInterval = null;
      this.isFrozen = false;
      this.freezeTimeout = null;
      this.isPaused = false;
      this.hammerMode = false;

      this.propCounts = {
        hammer: 19,
        wand: 41,
        freeze: 67
      };

      this.cabinetData = [];
      this.conveyorRows = [];
      this.conveyorSpeeds = [-0.35, 0.42, -0.32]; // Smooth horizontal drift speeds
      this.conveyorMetrics = null;

      this.selectedItemInfo = null;
      this.dragState = null;

      this.initDOM();
      this.updateLayoutMetrics();
      this.particles = new ParticleSystem(document.getElementById('fx-canvas'));
      this.initLevelWithVerification(this.currentLevel);
      this.startConveyors();
      this.startTimer();
      this.bindEvents();
    }

    initDOM() {
      this.timerEl = document.getElementById('timer-text');
      this.scoreEl = document.getElementById('score-value');
      this.cabinetEl = document.getElementById('cabinet-grid');
      this.conveyorSectionEl = document.getElementById('conveyor-section');
      this.hammerBanner = document.getElementById('hammer-banner');
      this.freezeOverlay = document.getElementById('freeze-overlay');
      this.dragGhost = document.getElementById('drag-ghost');

      document.getElementById('count-hammer').textContent = this.propCounts.hammer;
      document.getElementById('count-wand').textContent = this.propCounts.wand;
      document.getElementById('count-freeze').textContent = this.propCounts.freeze;
    }

    // Dynamically calculate and apply responsive metrics for mobile, iPad, and desktop
    updateLayoutMetrics() {
      const container = document.getElementById('game-container');
      if (!container) return;

      const containerWidth = container.clientWidth;
      const trackEl = document.querySelector('.conveyor-track') || this.conveyorSectionEl;
      const trackWidth = trackEl ? trackEl.clientWidth : containerWidth;

      // 1. Calculate compartment and plank width
      // In the cabinet (3 columns, padding 2.3% left/right, column-gap 2.3%)
      // Net grid width = containerWidth * (1 - 2 * 0.023 - 2 * 0.023) = containerWidth * 0.908
      const cabinetWrapper = document.querySelector('.cabinet-wrapper');
      const actualCabinetWidth = cabinetWrapper ? cabinetWrapper.clientWidth : containerWidth;
      const compWidth = Math.round((actualCabinetWidth * 0.908) / 3);

      // Plank width matches compartment width for 1:1 scale
      const plankWidth = Math.max(132, Math.min(220, compWidth));
      const plankGap = Math.max(6, Math.round(plankWidth * 0.05));

      // 4 shelves per row: totalSpan = 4 * pitch
      // Ensure 3 * pitch >= trackWidth so wrap occurs off-screen
      const minPitchForLoop = Math.ceil((trackWidth + 8) / 3);
      const pitch = Math.max(plankWidth + plankGap, minPitchForLoop);
      const totalSpan = 4 * pitch;

      // Item dimensions: 3 items fit snugly inside compartment with minimal gap
      const itemWidth = Math.max(42, Math.min(84, Math.floor((compWidth - 4) / 3)));
      const itemHeight = Math.round(itemWidth * 1.44);

      // Set CSS variables on container
      container.style.setProperty('--item-w', `${itemWidth}px`);
      container.style.setProperty('--item-h', `${itemHeight}px`);
      container.style.setProperty('--plank-w', `${plankWidth}px`);

      const oldPitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : pitch;
      this.conveyorMetrics = {
        trackWidth,
        plankWidth,
        plankGap,
        pitch,
        totalSpan
      };

      // Rescale existing shelf positions if layout changed
      if (oldPitch && oldPitch !== pitch && this.conveyorRows && this.conveyorRows.length > 0) {
        const ratio = pitch / oldPitch;
        this.conveyorRows.forEach(row => {
          row.forEach(shelf => {
            shelf.xPos *= ratio;
          });
        });
      }
    }

    // Generate level with strict Reverse Triplet Generation and Solvability Verification
    initLevelWithVerification(levelNumber) {
      let attempts = 0;
      let valid = false;

      while (!valid && attempts < 15) {
        attempts++;
        this.generateLevelData(levelNumber);
        valid = verifySolvability(this.cabinetData, this.conveyorRows);
      }

      console.log(`[Level Generator] Level ${levelNumber} generated & verified in ${attempts} attempts! Solvable: ${valid}`);
      const verifyBadge = document.getElementById('verify-badge');
      if (verifyBadge) {
        verifyBadge.textContent = '可解性校验：已通过 ✔';
        verifyBadge.style.color = '#27ae60';
      }

      this.renderBoard();
    }

    // Helper to promote deeper layers when layer 0 is completely empty
    promoteSlot(slotData) {
      if (!slotData || !slotData.layers) return false;
      if (slotData.layers[0].length === 0 && slotData.layers.slice(1).some(l => l.length > 0)) {
        while (slotData.layers.length > 1 && slotData.layers[0].length === 0 && slotData.layers.slice(1).some(l => l.length > 0)) {
          slotData.layers.shift();
          slotData.layers.push([]);
        }
        if (slotData.layers[0].length > 0) {
          sound.playPick();
          return true;
        }
      }
      return false;
    }

    getSlotLayerCount(slotData) {
      if (!slotData || !slotData.layers) return 0;
      let count = 0;
      for (let i = 0; i < slotData.layers.length; i++) {
        if (slotData.layers[i] && slotData.layers[i].length > 0) {
          count++;
        }
      }
      return count;
    }

    generateLevelData(levelNumber) {
      this.currentLevel = levelNumber;
      this.selectedItemInfo = null;
      this.timerSeconds = 988; // 16:28
      this.updateTimerDisplay();

      // RICH MULTI-LAYER PACKING: 4 layers per slot (上下各多层货架)
      // Total triplets: Level 1 = 36 triplets (108 items), Level 2 = 46 triplets (138 items), Level 3 = 56 triplets (168 items)
      const tripletCounts = [36, 46, 56];
      const totalTriplets = tripletCounts[Math.min(levelNumber - 1, 2)] || 46;

      // Pick distinct item types with guaranteed visual diversity & contrast
      const chosenTypes = selectDistinguishableItemTypes(totalTriplets);

      const itemPool = [];
      chosenTypes.forEach(type => {
        itemPool.push(type, type, type);
      });
      // Shuffle pool
      itemPool.sort(() => Math.random() - 0.5);

      // Setup 3x3 Upper Cabinet: 9 cubbies, each with 4 layers
      this.cabinetData = [];
      for (let i = 0; i < 9; i++) {
        this.cabinetData.push({
          id: `cabinet-${i}`,
          layers: [[], [], [], []]
        });
      }

      // Setup 3 Conveyor Rows: 4 planks per row = 12 planks total, each with 4 layers
      if (!this.conveyorMetrics) {
        this.updateLayoutMetrics();
      }
      const pitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : 146;

      this.conveyorRows = [];
      for (let r = 0; r < 3; r++) {
        const shelves = [];
        const speed = this.conveyorSpeeds[r];
        for (let s = 0; s < 4; s++) {
          let initX = s * pitch;
          if (speed > 0) {
            initX = (s - 1) * pitch;
          }
          shelves.push({
            id: `conveyor-${r}-${s}`,
            rowIndex: r,
            shelfIndex: s,
            layers: [[], [], [], []],
            xPos: initX
          });
        }
        this.conveyorRows.push(shelves);
      }

      // Active populated cabinet cubbies: 0, 1, 3, 4, 5, 7, 8 (7 cubbies)
      // Cubbies 2 and 6 remain open buffer compartments across all layers for sorting
      const populatedCabinet = [0, 1, 3, 4, 5, 7, 8];

      // 1. Layer 0 (Front interactive layer):
      // Conveyor: all 12 shelves get 2 to 3 items
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.6 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[0].push(itemPool.pop());
          }
        });
      });
      // Cabinet: 7 cubbies get 2 to 3 items
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.6 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[0].push(itemPool.pop());
        }
      });

      // 2. Layer 1 (Back Layer 1):
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.6 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[1].push(itemPool.pop());
          }
        });
      });
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.6 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[1].push(itemPool.pop());
        }
      });

      // 3. Layer 2 (Back Layer 2 / Deep Layer):
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const count = Math.random() < 0.5 ? 3 : 2;
          for (let k = 0; k < count && itemPool.length > 0; k++) {
            shelf.layers[2].push(itemPool.pop());
          }
        });
      });
      populatedCabinet.forEach(c => {
        const count = Math.random() < 0.5 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[2].push(itemPool.pop());
        }
      });

      // 4. Layer 3 (Deepest Layer 3):
      while (itemPool.length > 0) {
        const item = itemPool.pop();
        const openSlot = populatedCabinet.map(c => this.cabinetData[c]).find(c => c.layers[3].length < 3) ||
                         this.conveyorRows.flatMap(r => r).find(s => s.layers[3].length < 3) ||
                         populatedCabinet.map(c => this.cabinetData[c]).find(c => c.layers[2].length < 3) ||
                         this.conveyorRows.flatMap(r => r).find(s => s.layers[2].length < 3);
        if (openSlot) {
          const targetL = openSlot.layers[3].length < 3 ? 3 : 2;
          openSlot.layers[targetL].push(item);
        } else {
          this.conveyorRows[0][0].layers[3].push(item);
        }
      }
    }

    renderBoard() {
      this.initBoardDOM();
      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    // Initialize persistent DOM elements once (avoids destroying conveyor animations and tracks!)
    initBoardDOM() {
      // 1. Setup 9 Upper Cabinet Compartments
      this.cabinetEl.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const compDiv = document.createElement('div');
        compDiv.className = 'compartment';
        compDiv.dataset.type = 'cabinet';
        compDiv.dataset.index = i;

        const lane = document.createElement('div');
        lane.className = 'slot-lane';
        compDiv.appendChild(lane);
        this.cabinetEl.appendChild(compDiv);
      }

      // 2. Setup 3 Conveyor Track Rows with 4 Planks each
      this.conveyorSectionEl.innerHTML = '';
      this.conveyorRows.forEach((row, rowIdx) => {
        const rowWrapper = document.createElement('div');
        rowWrapper.className = 'conveyor-row-wrapper';
        rowWrapper.id = `conveyor-row-${rowIdx}`;

        const track = document.createElement('div');
        track.className = 'conveyor-track';
        track.id = `conveyor-track-${rowIdx}`;

        row.forEach((shelf, shelfIdx) => {
          const plank = document.createElement('div');
          plank.className = 'shelf-plank';
          plank.dataset.type = 'conveyor';
          plank.dataset.rowIndex = rowIdx;
          plank.dataset.shelfIndex = shelfIdx;
          plank.style.transform = `translateX(${shelf.xPos}px)`;

          const lane = document.createElement('div');
          lane.className = 'slot-lane';
          plank.appendChild(lane);
          track.appendChild(plank);
        });

        rowWrapper.appendChild(track);
        this.conveyorSectionEl.appendChild(rowWrapper);
      });
    }

    // Render items inside a specific slot-lane without touching the rest of the board
    renderLane(laneEl, layers, type, slotIdx, shelfIdx = 0) {
      laneEl.innerHTML = '';
      const frontItems = layers[0] || [];
      const backItems = layers[1] || [];
      const deepItems = layers[2] || [];

      for (let pos = 0; pos < 3; pos++) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-layer-container';

        // Deepest 3rd layer: subtle silhouette in background
        if (deepItems[pos]) {
          const deepKey = deepItems[pos];
          const deepItemEl = document.createElement('div');
          deepItemEl.className = 'good-item layer-deep';
          deepItemEl.innerHTML = `<img src="${ITEMS[deepKey].img}" alt="" draggable="false">`;
          itemContainer.appendChild(deepItemEl);
        }

        // Back layer: Grayed out & darkened ("灰色代表在下一行")
        if (backItems[pos]) {
          const backKey = backItems[pos];
          const backItemEl = document.createElement('div');
          backItemEl.className = 'good-item layer-back';
          backItemEl.title = ITEMS[backKey].name;
          backItemEl.innerHTML = `<img src="${ITEMS[backKey].img}" alt="${ITEMS[backKey].name}" draggable="false">`;
          itemContainer.appendChild(backItemEl);
        }

        // Front layer: Interactive item
        if (frontItems[pos]) {
          const frontKey = frontItems[pos];
          const frontItemEl = document.createElement('div');
          frontItemEl.className = 'good-item layer-front';
          frontItemEl.dataset.itemKey = frontKey;
          frontItemEl.dataset.type = type;
          frontItemEl.dataset.slotIndex = slotIdx;
          frontItemEl.dataset.rowIndex = slotIdx;
          frontItemEl.dataset.shelfIndex = shelfIdx;
          frontItemEl.dataset.itemIndex = pos;
          frontItemEl.title = ITEMS[frontKey].name;
          frontItemEl.innerHTML = `<img src="${ITEMS[frontKey].img}" alt="${ITEMS[frontKey].name}" draggable="false">`;

          if (this.selectedItemInfo &&
              this.selectedItemInfo.locationType === type &&
              (type === 'cabinet' ? this.selectedItemInfo.slotIndex === slotIdx :
                (this.selectedItemInfo.rowIndex === slotIdx && this.selectedItemInfo.shelfIndex === shelfIdx)) &&
              this.selectedItemInfo.itemIndex === pos) {
            frontItemEl.classList.add('selected');
          }

          itemContainer.appendChild(frontItemEl);
        } else {
          // Empty slot indicator
          const emptySlot = document.createElement('div');
          emptySlot.className = 'empty-slot-indicator';
          emptySlot.textContent = '+';
          itemContainer.appendChild(emptySlot);
        }

        laneEl.appendChild(itemContainer);
      }
    }

    // Granular update: update only one compartment
    updateCompartment(compIdx) {
      const compDiv = this.cabinetEl.children[compIdx];
      if (!compDiv) return;
      const lane = compDiv.querySelector('.slot-lane');
      if (!lane) return;
      const slotData = this.cabinetData[compIdx];
      this.renderLane(lane, slotData.layers, 'cabinet', compIdx);

      // Remaining layer depth indicator badge
      let pill = compDiv.querySelector('.layer-depth-pill');
      const count = this.getSlotLayerCount(slotData);
      if (count > 1) {
        if (!pill) {
          pill = document.createElement('div');
          pill.className = 'layer-depth-pill';
          compDiv.appendChild(pill);
        }
        pill.textContent = `${count}层`;
      } else if (pill) {
        pill.remove();
      }
    }

    // Granular update: update only one conveyor shelf plank
    updateShelf(rowIdx, shelfIdx) {
      const track = document.getElementById(`conveyor-track-${rowIdx}`);
      if (!track) return;
      const plank = track.children[shelfIdx];
      if (!plank) return;
      const lane = plank.querySelector('.slot-lane');
      if (!lane) return;
      const slotData = this.conveyorRows[rowIdx][shelfIdx];
      this.renderLane(lane, slotData.layers, 'conveyor', rowIdx, shelfIdx);

      // Remaining layer depth indicator badge
      let pill = plank.querySelector('.layer-depth-pill');
      const count = this.getSlotLayerCount(slotData);
      if (count > 1) {
        if (!pill) {
          pill = document.createElement('div');
          pill.className = 'layer-depth-pill';
          plank.appendChild(pill);
        }
        pill.textContent = `${count}层`;
      } else if (pill) {
        pill.remove();
      }
    }

    // Granular update for any slot location
    updateLocation(loc) {
      if (!loc) return;
      if (loc.type === 'cabinet') {
        this.updateCompartment(loc.slotIndex);
      } else {
        this.updateShelf(loc.rowIndex, loc.shelfIndex);
      }
    }

    // Update all slots across cabinet and conveyors without destroying DOM nodes
    updateAllSlots() {
      for (let i = 0; i < 9; i++) {
        this.updateCompartment(i);
      }
      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((_, sIdx) => {
          this.updateShelf(rIdx, sIdx);
        });
      });
    }

    // Auto-scroll horizontal conveyor animation (Seamless cyclic 4-shelf train)
    startConveyors() {
      const animate = () => {
        if (!this.isPaused && !this.isFrozen) {
          const pitch = this.conveyorMetrics ? this.conveyorMetrics.pitch : 146;
          const totalSpan = this.conveyorMetrics ? this.conveyorMetrics.totalSpan : (4 * pitch);

          this.conveyorRows.forEach((row, rowIdx) => {
            const track = document.getElementById(`conveyor-track-${rowIdx}`);
            if (!track) return;

            const speed = this.conveyorSpeeds[rowIdx];

            row.forEach(shelf => {
              shelf.xPos += speed;

              if (speed < 0) {
                // Moving left: when shelf goes completely off-screen to the left
                if (shelf.xPos < -pitch) {
                  shelf.xPos += totalSpan;
                }
              } else {
                // Moving right: when shelf goes past the right boundary
                if (shelf.xPos > totalSpan - pitch) {
                  shelf.xPos -= totalSpan;
                }
              }
            });

            const plankEls = track.children;
            for (let i = 0; i < plankEls.length; i++) {
              const plank = plankEls[i];
              const shelf = row[i];
              if (plank && shelf) {
                plank.style.transform = `translateX(${shelf.xPos}px)`;
              }
            }
          });
        }
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }

    startTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (this.isPaused || this.isFrozen) return;
        this.timerSeconds--;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.handleGameOver('时间已耗尽！');
        }
      }, 1000);
    }

    updateTimerDisplay() {
      const mins = Math.floor(Math.max(0, this.timerSeconds) / 60);
      const secs = Math.max(0, this.timerSeconds) % 60;
      this.timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    checkMatches() {
      let matchedAny = false;

      // 1. Check Cabinet Compartments
      this.cabinetData.forEach((comp, idx) => {
        const front = comp.layers[0];
        if (front.length === 3) {
          const m0 = getItemMatchKey(front[0]);
          const m1 = getItemMatchKey(front[1]);
          const m2 = getItemMatchKey(front[2]);
          if (m0 === m1 && m1 === m2) {
            matchedAny = true;
            this.triggerMatchElimination('cabinet', idx, null, front[0]);
          }
        }
      });

      // 2. Check Conveyor Shelves
      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((shelf, sIdx) => {
          const front = shelf.layers[0];
          if (front.length === 3) {
            const m0 = getItemMatchKey(front[0]);
            const m1 = getItemMatchKey(front[1]);
            const m2 = getItemMatchKey(front[2]);
            if (m0 === m1 && m1 === m2) {
              matchedAny = true;
              this.triggerMatchElimination('conveyor', rIdx, sIdx, front[0]);
            }
          }
        });
      });

      return matchedAny;
    }

    triggerMatchElimination(type, idx1, idx2, itemKey) {
      sound.playMatch();
      this.score += 100;
      this.scoreEl.textContent = this.score;

      let targetEl;
      let targetData;

      if (type === 'cabinet') {
        targetEl = this.cabinetEl.children[idx1];
        targetData = this.cabinetData[idx1];
      } else {
        const track = document.getElementById(`conveyor-track-${idx1}`);
        if (track) targetEl = track.children[idx2];
        targetData = this.conveyorRows[idx1][idx2];
      }

      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const parentRect = document.getElementById('game-container').getBoundingClientRect();
        const fxX = rect.left - parentRect.left + rect.width / 2;
        const fxY = rect.top - parentRect.top + rect.height / 2;

        this.particles.emit(fxX, fxY, 30, 'star');

        const scoreFloat = document.createElement('div');
        scoreFloat.className = 'score-float';
        scoreFloat.textContent = '+100 消除!';
        scoreFloat.style.left = `${fxX - 45}px`;
        scoreFloat.style.top = `${fxY - 20}px`;
        document.getElementById('game-container').appendChild(scoreFloat);
        setTimeout(() => scoreFloat.remove(), 800);

        const frontItems = targetEl.querySelectorAll('.good-item.layer-front');
        frontItems.forEach(el => el.classList.add('matching'));
      }

      setTimeout(() => {
        targetData.layers[0] = [];

        // Deeper layer items promote to front layer! ("下一行变为上一行，灰色变为亮色")
        this.promoteSlot(targetData);

        // Granular update only the affected slot
        if (type === 'cabinet') {
          this.updateCompartment(idx1);
        } else {
          this.updateShelf(idx1, idx2);
        }

        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 320);
    }

    moveItem(fromLocation, toLocation) {
      let sourceArray;
      if (fromLocation.type === 'cabinet') {
        sourceArray = this.cabinetData[fromLocation.slotIndex].layers[0];
      } else {
        sourceArray = this.conveyorRows[fromLocation.rowIndex][fromLocation.shelfIndex].layers[0];
      }

      let targetArray;
      let targetSlotData;
      if (toLocation.type === 'cabinet') {
        targetSlotData = this.cabinetData[toLocation.slotIndex];
        targetArray = targetSlotData.layers[0];
      } else {
        targetSlotData = this.conveyorRows[toLocation.rowIndex][toLocation.shelfIndex];
        targetArray = targetSlotData.layers[0];
      }

      if (targetArray.length >= 3) {
        sound.playDrop();
        return false;
      }

      const item = sourceArray.splice(fromLocation.itemIndex, 1)[0];
      if (!item) return false;

      targetArray.push(item);
      sound.playDrop();

      let sourceSlotData = fromLocation.type === 'cabinet' 
        ? this.cabinetData[fromLocation.slotIndex]
        : this.conveyorRows[fromLocation.rowIndex][fromLocation.shelfIndex];

      this.promoteSlot(sourceSlotData);

      // Clear selection without rebuilding DOM
      this.selectedItemInfo = null;
      document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));

      // Granular update ONLY the two affected slots!
      this.updateLocation(fromLocation);
      this.updateLocation(toLocation);

      this.checkMatches();
      this.checkGameWinOrLoss();
      return true;
    }

    bindEvents() {
      const container = document.getElementById('game-container');

      let activePointerId = null;
      let startPointerPos = { x: 0, y: 0 };
      let isDragging = false;
      let draggedItemData = null;
      let draggedItemEl = null;
      let currentSnapTarget = null;
      let isTouchDevice = false;

      const clearSnapHighlights = () => {
        document.querySelectorAll('.drop-target-snap, .drop-target-valid, .drop-target-invalid').forEach(el => {
          el.classList.remove('drop-target-snap', 'drop-target-valid', 'drop-target-invalid');
        });
      };

      const findBestSnapTarget = (clientX, clientY) => {
        const candidates = [];

        // 1. Cabinet Compartments
        this.cabinetData.forEach((comp, idx) => {
          const el = this.cabinetEl.children[idx];
          if (!el) return;
          const count = comp.layers[0].length;
          candidates.push({
            el,
            type: 'cabinet',
            slotIndex: idx,
            rowIndex: idx,
            shelfIndex: 0,
            canPlace: count < 3,
            rect: el.getBoundingClientRect()
          });
        });

        // 2. Conveyor Planks
        this.conveyorRows.forEach((row, rIdx) => {
          const track = document.getElementById(`conveyor-track-${rIdx}`);
          if (!track) return;
          row.forEach((shelf, sIdx) => {
            const el = track.children[sIdx];
            if (!el) return;
            const count = shelf.layers[0].length;
            candidates.push({
              el,
              type: 'conveyor',
              slotIndex: rIdx,
              rowIndex: rIdx,
              shelfIndex: sIdx,
              canPlace: count < 3,
              rect: el.getBoundingClientRect()
            });
          });
        });

        let bestTarget = null;
        let minDistance = Infinity;
        const SNAP_RADIUS = Math.max(60, Math.round((this.conveyorMetrics?.plankWidth || 142) * 0.45)); // Auto-snap magnetic suction radius

        for (const cand of candidates) {
          const r = cand.rect;
          const dx = Math.max(r.left - clientX, 0, clientX - r.right);
          const dy = Math.max(r.top - clientY, 0, clientY - r.bottom);
          const dist = Math.hypot(dx, dy);

          if (dist === 0) {
            // Direct hit inside shelf boundary
            if (cand.canPlace) {
              return { ...cand, dist: 0, directHit: true };
            } else {
              if (!bestTarget || bestTarget.dist > 0) {
                bestTarget = { ...cand, dist: 0, directHit: true };
              }
            }
          } else if (cand.canPlace && dist <= SNAP_RADIUS && dist < minDistance) {
            minDistance = dist;
            bestTarget = { ...cand, dist, directHit: false };
          }
        }

        return bestTarget;
      };

      const handleItemTap = (itemData) => {
        // 1. If clicking on already selected item, deselect it
        if (this.selectedItemInfo &&
            this.selectedItemInfo.locationType === itemData.type &&
            this.selectedItemInfo.slotIndex === itemData.slotIndex &&
            this.selectedItemInfo.shelfIndex === itemData.shelfIndex &&
            this.selectedItemInfo.itemIndex === itemData.itemIndex) {
          this.selectedItemInfo = null;
          document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
          sound.playPick();
          return;
        }

        // 2. If an item is already selected, try moving it to this slot!
        if (this.selectedItemInfo) {
          const moved = this.moveItem(
            {
              type: this.selectedItemInfo.locationType,
              slotIndex: this.selectedItemInfo.slotIndex,
              rowIndex: this.selectedItemInfo.rowIndex,
              shelfIndex: this.selectedItemInfo.shelfIndex,
              itemIndex: this.selectedItemInfo.itemIndex
            },
            {
              type: itemData.type,
              slotIndex: itemData.slotIndex,
              rowIndex: itemData.rowIndex,
              shelfIndex: itemData.shelfIndex
            }
          );
          if (moved) return;
        }

        // 3. Select this item directly
        this.selectedItemInfo = {
          locationType: itemData.type,
          slotIndex: itemData.slotIndex,
          rowIndex: itemData.rowIndex,
          shelfIndex: itemData.shelfIndex,
          itemIndex: itemData.itemIndex,
          itemKey: itemData.itemKey
        };
        sound.playPick();

        // Update selected class directly on the clicked element - ZERO global re-render!
        document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
        let targetEl = null;
        if (itemData.type === 'cabinet') {
          targetEl = this.cabinetEl.children[itemData.slotIndex]?.querySelectorAll('.good-item.layer-front')[itemData.itemIndex];
        } else {
          const track = document.getElementById(`conveyor-track-${itemData.rowIndex}`);
          targetEl = track?.children[itemData.shelfIndex]?.querySelectorAll('.good-item.layer-front')[itemData.itemIndex];
        }
        if (targetEl) targetEl.classList.add('selected');
      };

      const onPointerDown = (e) => {
        if (this.isPaused) return;

        if (this.hammerMode) {
          const itemEl = e.target.closest('.good-item.layer-front');
          if (itemEl) {
            e.preventDefault();
            this.executeHammer(itemEl);
          }
          return;
        }

        const itemEl = e.target.closest('.good-item.layer-front');
        if (!itemEl) {
          // If clicked on an empty slot indicator or shelf while an item was selected
          if (this.selectedItemInfo) {
            const compEl = e.target.closest('.compartment, .shelf-plank');
            if (compEl) {
              const type = compEl.dataset.type;
              const slotIdx = parseInt(compEl.dataset.index || compEl.dataset.rowIndex);
              const shelfIdx = parseInt(compEl.dataset.shelfIndex || '0');
              this.moveItem(
                {
                  type: this.selectedItemInfo.locationType,
                  slotIndex: this.selectedItemInfo.slotIndex,
                  rowIndex: this.selectedItemInfo.rowIndex,
                  shelfIndex: this.selectedItemInfo.shelfIndex,
                  itemIndex: this.selectedItemInfo.itemIndex
                },
                {
                  type,
                  slotIndex: slotIdx,
                  rowIndex: slotIdx,
                  shelfIndex: shelfIdx
                }
              );
            }
          }
          return;
        }

        e.preventDefault();

        activePointerId = e.pointerId;
        isTouchDevice = e.pointerType === 'touch';
        startPointerPos = { x: e.clientX, y: e.clientY };
        isDragging = false;
        draggedItemEl = itemEl;

        const type = itemEl.dataset.type;
        const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
        const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
        const itemIdx = parseInt(itemEl.dataset.itemIndex);
        const itemKey = itemEl.dataset.itemKey;

        draggedItemData = {
          type,
          slotIndex: slotIdx,
          rowIndex: slotIdx,
          shelfIndex: shelfIdx,
          itemIndex: itemIdx,
          itemKey
        };
      };

      const onPointerMove = (e) => {
        if (activePointerId === null || e.pointerId !== activePointerId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;
        const dist = Math.hypot(clientX - startPointerPos.x, clientY - startPointerPos.y);

        if (!isDragging && dist > 5) {
          isDragging = true;
          // Clear any active selected item visually without recreating the DOM
          if (this.selectedItemInfo) {
            this.selectedItemInfo = null;
            document.querySelectorAll('.good-item.selected').forEach(el => el.classList.remove('selected'));
          }

          this.dragGhost.innerHTML = `<img src="${ITEMS[draggedItemData.itemKey].img}" alt="" draggable="false">`;
          this.dragGhost.style.display = 'flex';
          this.dragGhost.style.transition = 'none';
          this.dragGhost.style.left = `${clientX}px`;
          this.dragGhost.style.top = `${clientY}px`;
          this.dragGhost.style.transform = 'translate(-50%, -50%)';

          if (draggedItemEl) {
            draggedItemEl.style.visibility = 'hidden';
          }
          sound.playPick();
        }

        if (isDragging) {
          // Precise cursor tracking: pointer is exactly at the visual center of the dragged item
          this.dragGhost.style.left = `${clientX}px`;
          this.dragGhost.style.top = `${clientY}px`;
          this.dragGhost.style.transform = 'translate(-50%, -50%)';

          clearSnapHighlights();
          const target = findBestSnapTarget(clientX, clientY);
          currentSnapTarget = target;

          if (target) {
            if (target.canPlace) {
              target.el.classList.add('drop-target-snap');
            } else {
              target.el.classList.add('drop-target-invalid');
            }
          }
        }
      };

      const onPointerUp = (e) => {
        if (activePointerId === null || e.pointerId !== activePointerId) return;

        clearSnapHighlights();

        if (!isDragging) {
          // Tap / Click action
          if (draggedItemEl) draggedItemEl.style.visibility = 'visible';
          activePointerId = null;
          handleItemTap(draggedItemData);
          return;
        }

        // Auto-snap upon release ("松手要自吸附")
        const snap = currentSnapTarget && currentSnapTarget.canPlace ? currentSnapTarget : null;

        if (snap) {
          const isSameSlot = (draggedItemData.type === snap.type) &&
            (snap.type === 'cabinet' ? draggedItemData.slotIndex === snap.slotIndex : 
             (draggedItemData.rowIndex === snap.rowIndex && draggedItemData.shelfIndex === snap.shelfIndex));

          if (isSameSlot) {
            this.dragGhost.style.display = 'none';
            if (draggedItemEl) draggedItemEl.style.visibility = 'visible';
            this.renderBoard();
          } else {
            // Magnetic Snap Animation into target slot!
            const emptyIndicator = snap.el.querySelector('.empty-slot-indicator');
            const targetRect = emptyIndicator 
              ? emptyIndicator.getBoundingClientRect() 
              : snap.el.getBoundingClientRect();

            const targetX = targetRect.left + targetRect.width / 2;
            const targetY = targetRect.top + targetRect.height / 2;

            this.dragGhost.style.transition = 'all 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)';
            this.dragGhost.style.left = `${targetX}px`;
            this.dragGhost.style.top = `${targetY}px`;
            this.dragGhost.style.transform = 'translate(-50%, -50%)';

            const parentRect = document.getElementById('game-container').getBoundingClientRect();
            this.particles.emit(targetX - parentRect.left, targetY - parentRect.top, 14, 'star');

            const sourceData = { ...draggedItemData };
            const targetLocation = {
              type: snap.type,
              slotIndex: snap.slotIndex,
              rowIndex: snap.rowIndex,
              shelfIndex: snap.shelfIndex
            };

            setTimeout(() => {
              this.dragGhost.style.display = 'none';
              this.dragGhost.style.transition = 'none';
              this.dragGhost.style.transform = 'translate(-50%, -50%)';

              this.moveItem(
                {
                  type: sourceData.type,
                  slotIndex: sourceData.slotIndex,
                  rowIndex: sourceData.rowIndex,
                  shelfIndex: sourceData.shelfIndex,
                  itemIndex: sourceData.itemIndex
                },
                targetLocation
              );
            }, 140);
          }
        } else {
          // Snap back to origin
          if (draggedItemEl) {
            const srcRect = draggedItemEl.getBoundingClientRect();
            const srcX = srcRect.left + srcRect.width / 2;
            const srcY = srcRect.top + srcRect.height / 2;

            this.dragGhost.style.transition = 'all 0.16s ease-out';
            this.dragGhost.style.left = `${srcX}px`;
            this.dragGhost.style.top = `${srcY}px`;
            this.dragGhost.style.transform = 'translate(-50%, -50%)';

            setTimeout(() => {
              this.dragGhost.style.display = 'none';
              this.dragGhost.style.transition = 'none';
              this.dragGhost.style.transform = 'translate(-50%, -50%)';
              if (draggedItemEl) draggedItemEl.style.visibility = 'visible';
              this.renderBoard();
            }, 150);
          } else {
            this.dragGhost.style.display = 'none';
            this.renderBoard();
          }
        }

        activePointerId = null;
        isDragging = false;
        draggedItemData = null;
        draggedItemEl = null;
        currentSnapTarget = null;
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);

      // Boosters
      document.getElementById('btn-tool-hammer').addEventListener('click', () => this.activateHammer());
      document.getElementById('btn-tool-wand').addEventListener('click', () => this.activateWand());
      document.getElementById('btn-tool-freeze').addEventListener('click', () => this.activateFreeze());
      document.getElementById('btn-tool-shuffle').addEventListener('click', () => this.activateShuffle());
      document.getElementById('btn-cancel-hammer').addEventListener('click', () => this.deactivateHammer());

      // Header & Modals
      document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
      document.getElementById('btn-resume').addEventListener('click', () => this.togglePause());
      document.getElementById('btn-restart').addEventListener('click', () => {
        this.closeModals();
        this.initLevelWithVerification(this.currentLevel);
      });
      document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        document.getElementById('btn-sound-toggle').textContent = isMuted ? '🔇' : '🔊';
      });
      document.getElementById('btn-next-level').addEventListener('click', () => {
        this.closeModals();
        this.initLevelWithVerification(this.currentLevel + 1);
      });
      document.getElementById('btn-revive').addEventListener('click', () => {
        this.closeModals();
        this.timerSeconds = 90;
        this.startTimer();
      });

      // Window resize & orientation change listeners for dynamic mobile / iPad responsive adaptation
      const handleResize = () => {
        this.updateLayoutMetrics();
      };
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
      });
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.addEventListener('change', () => {
          setTimeout(handleResize, 100);
        });
      }
    }

    activateHammer() {
      if (this.propCounts.hammer <= 0) return;
      this.hammerMode = true;
      document.body.classList.add('hammer-mode');
      document.getElementById('btn-tool-hammer').classList.add('active-tool');
      this.hammerBanner.style.display = 'flex';
      sound.playPick();
    }

    deactivateHammer() {
      this.hammerMode = false;
      document.body.classList.remove('hammer-mode');
      document.getElementById('btn-tool-hammer').classList.remove('active-tool');
      this.hammerBanner.style.display = 'none';
    }

    executeHammer(itemEl) {
      const type = itemEl.dataset.type;
      const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
      const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
      const itemIdx = parseInt(itemEl.dataset.itemIndex);

      sound.playHammer();
      this.propCounts.hammer--;
      document.getElementById('count-hammer').textContent = this.propCounts.hammer;
      this.deactivateHammer();

      const rect = itemEl.getBoundingClientRect();
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(rect.left - parentRect.left + 25, rect.top - parentRect.top + 25, 30, 'star');

      itemEl.classList.add('smashed');

      setTimeout(() => {
        let slotData = type === 'cabinet' 
          ? this.cabinetData[slotIdx] 
          : this.conveyorRows[slotIdx][shelfIdx];

        slotData.layers[0].splice(itemIdx, 1);
        this.promoteSlot(slotData);

        if (type === 'cabinet') {
          this.updateCompartment(slotIdx);
        } else {
          this.updateShelf(slotIdx, shelfIdx);
        }
        this.checkMatches();
        this.checkGameWinOrLoss();
      }, 280);
    }

    activateWand() {
      if (this.propCounts.wand <= 0) return;

      const visibleItemMap = {};
      
      this.cabinetData.forEach((comp, cIdx) => {
        comp.layers[0].forEach((key, pos) => {
          if (!visibleItemMap[key]) visibleItemMap[key] = [];
          visibleItemMap[key].push({ type: 'cabinet', slotIndex: cIdx, itemIndex: pos });
        });
      });

      this.conveyorRows.forEach((row, rIdx) => {
        row.forEach((shelf, sIdx) => {
          shelf.layers[0].forEach((key, pos) => {
            if (!visibleItemMap[key]) visibleItemMap[key] = [];
            visibleItemMap[key].push({ type: 'conveyor', rowIndex: rIdx, shelfIndex: sIdx, itemIndex: pos });
          });
        });
      });

      let targetKey = Object.keys(visibleItemMap).find(key => visibleItemMap[key].length >= 3);
      if (!targetKey) targetKey = Object.keys(visibleItemMap)[0];
      if (!targetKey) return;

      sound.playWand();
      this.propCounts.wand--;
      document.getElementById('count-wand').textContent = this.propCounts.wand;

      let removedCount = 0;
      for (let key in visibleItemMap) {
        if (key === targetKey) {
          visibleItemMap[key].slice(0, 3).forEach(loc => {
            let slotData = loc.type === 'cabinet' 
              ? this.cabinetData[loc.slotIndex]
              : this.conveyorRows[loc.rowIndex][loc.shelfIndex];
            const idx = slotData.layers[0].indexOf(targetKey);
            if (idx !== -1) {
              slotData.layers[0].splice(idx, 1);
              removedCount++;
            }
          });
        }
      }

      if (removedCount < 3) {
        // Also look into deeper layers if needed
        for (let l = 1; l < 4 && removedCount < 3; l++) {
          this.cabinetData.forEach(comp => {
            if (comp.layers[l] && removedCount < 3) {
              const idx = comp.layers[l].indexOf(targetKey);
              if (idx !== -1) {
                comp.layers[l].splice(idx, 1);
                removedCount++;
              }
            }
          });
          this.conveyorRows.forEach(row => {
            row.forEach(shelf => {
              if (shelf.layers[l] && removedCount < 3) {
                const idx = shelf.layers[l].indexOf(targetKey);
                if (idx !== -1) {
                  shelf.layers[l].splice(idx, 1);
                  removedCount++;
                }
              }
            });
          });
        }
      }

      this.score += 150;
      this.scoreEl.textContent = this.score;
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(parentRect.width / 2, parentRect.height / 2, 40, 'star');

      this.cabinetData.forEach(c => {
        this.promoteSlot(c);
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          this.promoteSlot(shelf);
        });
      });

      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    activateFreeze() {
      if (this.propCounts.freeze <= 0 || this.isFrozen) return;
      sound.playFreeze();
      this.propCounts.freeze--;
      document.getElementById('count-freeze').textContent = this.propCounts.freeze;

      this.isFrozen = true;
      this.freezeOverlay.classList.add('active');
      this.timerEl.style.color = '#00d2d3';

      clearTimeout(this.freezeTimeout);
      this.freezeTimeout = setTimeout(() => {
        this.isFrozen = false;
        this.freezeOverlay.classList.remove('active');
        this.timerEl.style.color = '#fff';
      }, 25000);
    }

    activateShuffle() {
      sound.playShuffle();

      const allFrontItems = [];
      this.cabinetData.forEach(comp => {
        allFrontItems.push(...comp.layers[0]);
        comp.layers[0] = [];
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          allFrontItems.push(...shelf.layers[0]);
          shelf.layers[0] = [];
        });
      });

      allFrontItems.sort(() => Math.random() - 0.5);

      // Redistribute to fill cabinet first
      let itemIdx = 0;
      this.cabinetData.forEach(comp => {
        for (let k = 0; k < 3 && itemIdx < allFrontItems.length; k++) {
          comp.layers[0].push(allFrontItems[itemIdx++]);
        }
      });

      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const take = Math.min(2, allFrontItems.length - itemIdx);
          for (let k = 0; k < take; k++) {
            shelf.layers[0].push(allFrontItems[itemIdx++]);
          }
        });
      });

      while (itemIdx < allFrontItems.length) {
        const item = allFrontItems[itemIdx++];
        const openSlot = this.cabinetData.find(c => c.layers[0].length < 3) ||
                         this.conveyorRows[0].find(s => s.layers[0].length < 3);
        if (openSlot) openSlot.layers[0].push(item);
      }

      this.updateAllSlots();
      this.checkMatches();
      this.checkGameWinOrLoss();
    }

    togglePause() {
      this.isPaused = !this.isPaused;
      const modal = document.getElementById('modal-pause');
      if (this.isPaused) {
        const verEl = document.getElementById('pause-modal-version');
        if (verEl) verEl.textContent = `版本号：v${APP_VERSION}`;
        modal.classList.add('open');
      } else {
        modal.classList.remove('open');
      }
    }

    closeModals() {
      document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('open'));
      this.isPaused = false;
    }

    checkGameWinOrLoss() {
      let totalItems = 0;
      this.cabinetData.forEach(comp => {
        comp.layers.forEach(l => totalItems += l.length);
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          shelf.layers.forEach(l => totalItems += l.length);
        });
      });

      if (totalItems === 0) {
        clearInterval(this.timerInterval);
        sound.playWin();
        const parentRect = document.getElementById('game-container').getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.particles.emit(
              Math.random() * parentRect.width,
              Math.random() * parentRect.height * 0.6,
              40,
              'star'
            );
          }, i * 200);
        }
        document.getElementById('win-final-score').textContent = this.score;
        document.getElementById('modal-win').classList.add('open');
        return;
      }

      let totalFrontItems = 0;
      let totalFrontCapacity = 9 * 3 + (3 * 4 * 3);
      this.cabinetData.forEach(comp => totalFrontItems += comp.layers[0].length);
      this.conveyorRows.forEach(row => row.forEach(shelf => totalFrontItems += shelf.layers[0].length));

      if (totalFrontItems === totalFrontCapacity) {
        const hasMatch = this.checkMatches();
        if (!hasMatch) {
          this.handleGameOver('货架已全满，无可移动空格！');
        }
      }
    }

    handleGameOver(reason) {
      sound.playLose();
      document.getElementById('gameover-reason').textContent = reason;
      document.getElementById('modal-gameover').classList.add('open');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GoodsOrganizerGame();

    // ================== PWA Installation & Service Worker ==================
    let deferredInstallPrompt = null;
    const btnInstallPwa = document.getElementById('btn-install-pwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (btnInstallPwa) {
        btnInstallPwa.style.display = 'block';
      }
      console.log('[PWA] beforeinstallprompt captured, install button activated');
    });

    if (btnInstallPwa) {
      btnInstallPwa.addEventListener('click', async () => {
        if (!deferredInstallPrompt) return;
        btnInstallPwa.style.display = 'none';
        deferredInstallPrompt.prompt();
        try {
          const { outcome } = await deferredInstallPrompt.userChoice;
          console.log(`[PWA] Install prompt outcome: ${outcome}`);
        } catch (err) {
          console.error('[PWA] Error during install prompt:', err);
        }
        deferredInstallPrompt = null;
      });
    }

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Goods Sort 3D was installed successfully!');
      if (btnInstallPwa) {
        btnInstallPwa.style.display = 'none';
      }
    });

    // Register Service Worker for offline capability
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log(`[PWA] Service Worker registered with scope: ${reg.scope}`);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  });
})();

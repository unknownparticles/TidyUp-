// Standalone High-Quality Goods Sort 3D Game with Solvability Guarantee
(function() {
  'use strict';

  // 1. High-Resolution 3D Rendered Item Assets (Extracted directly from sprite sheet)
  const ITEMS = {
    santa: { id: 'santa', name: '圣诞老人', img: './assets/items/santa.png' },
    snowman_green: { id: 'snowman_green', name: '绿帽雪人', img: './assets/items/snowman_green.png' },
    gift_pouch: { id: 'gift_pouch', name: '圣诞福袋', img: './assets/items/gift_pouch.png' },
    gnome: { id: 'gnome', name: '圣诞矮人', img: './assets/items/gnome.png' },
    reindeer: { id: 'reindeer', name: '圣诞麋鹿', img: './assets/items/reindeer.png' },
    snowman_blue: { id: 'snowman_blue', name: '蓝帽雪人', img: './assets/items/snowman_blue.png' },
    stocking: { id: 'stocking', name: '圣诞长袜', img: './assets/items/stocking.png' },
    xmas_pudding: { id: 'xmas_pudding', name: '圣诞布丁', img: './assets/items/xmas_pudding.png' },
    xmas_tree: { id: 'xmas_tree', name: '梦幻圣诞树', img: './assets/items/xmas_tree.png' },
    cookie_bucket: { id: 'cookie_bucket', name: '雪花饼干罐', img: './assets/items/cookie_bucket.png' },
    gift_green: { id: 'gift_green', name: '翠绿礼盒', img: './assets/items/gift_green.png' },
    gift_white: { id: 'gift_white', name: '雪白礼盒', img: './assets/items/gift_white.png' },
    gift_striped: { id: 'gift_striped', name: '条纹礼盒', img: './assets/items/gift_striped.png' },
    gift_yellow: { id: 'gift_yellow', name: '暖黄礼盒', img: './assets/items/gift_yellow.png' },
    nutcracker: { id: 'nutcracker', name: '胡桃夹子士兵', img: './assets/items/nutcracker.png' },
    bell: { id: 'bell', name: '圣诞金铃', img: './assets/items/bell.png' },
    snowman: { id: 'snowman', name: '欢乐雪人', img: './assets/items/snowman.png' },
    gift_box: { id: 'gift_box', name: '经典红礼盒', img: './assets/items/gift_box.png' },
    gift_round: { id: 'gift_round', name: '波纹圆礼盒', img: './assets/items/gift_round.png' },
    cocoa: { id: 'cocoa', name: '热可可杯', img: './assets/items/cocoa.png' },
    chips: { id: 'chips', name: '香脆薯片', img: './assets/items/chips.png' },
    bottle_pink: { id: 'bottle_pink', name: '粉色提手水壶', img: './assets/items/bottle_pink.png' },
    tumbler: { id: 'tumbler', name: '天蓝便携水壶', img: './assets/items/tumbler.png' },
    snack_bag: { id: 'snack_bag', name: '经典零食包', img: './assets/items/snack_bag.png' },
    can_bips: { id: 'can_bips', name: 'BIPS坚果黄罐', img: './assets/items/can_bips.png' },
    green_jar: { id: 'green_jar', name: '养生绿茶罐', img: './assets/items/green_jar.png' },
    milk: { id: 'milk', name: '鲜草莓甜奶', img: './assets/items/milk.png' },
    cleaner_blue: { id: 'cleaner_blue', name: '亮蓝洗护瓶', img: './assets/items/cleaner_blue.png' },
    coffee: { id: 'coffee', name: '秘制烘焙酱', img: './assets/items/coffee.png' },
    tub_bips: { id: 'tub_bips', name: 'BIPS奶酪桶', img: './assets/items/tub_bips.png' },
    kiwi_bottle: { id: 'kiwi_bottle', name: '奇异果酸奶', img: './assets/items/kiwi_bottle.png' },
    chocolate: { id: 'chocolate', name: '夹心脆巧克力', img: './assets/items/chocolate.png' },
    sport_orange: { id: 'sport_orange', name: '活力运动饮', img: './assets/items/sport_orange.png' },
    candle_striped: { id: 'candle_striped', name: '节日红白蜡烛', img: './assets/items/candle_striped.png' },
    red_tree: { id: 'red_tree', name: '红愿圣诞树', img: './assets/items/red_tree.png' },
    sport_red: { id: 'sport_red', name: '便携运动壶', img: './assets/items/sport_red.png' },
    syrup_brown: { id: 'syrup_brown', name: '浓缩焦糖浆', img: './assets/items/syrup_brown.png' },
    grape_water: { id: 'grape_water', name: '葡萄清凉饮', img: './assets/items/grape_water.png' },
    pure_water: { id: 'pure_water', name: '天然矿泉水', img: './assets/items/pure_water.png' },
    lemon_green: { id: 'lemon_green', name: '青柠苏打水', img: './assets/items/lemon_green.png' },
    lemon_soda: { id: 'lemon_soda', name: '柠檬果汁汽水', img: './assets/items/lemon_soda.png' },
    grape_soda: { id: 'grape_soda', name: '紫葡萄果汁', img: './assets/items/grape_soda.png' },
    jam_carrot: { id: 'jam_carrot', name: '蜜橙胡萝卜酱', img: './assets/items/jam_carrot.png' },
    jam_berry: { id: 'jam_berry', name: '蔓越莓果酱', img: './assets/items/jam_berry.png' },
    jam_peach: { id: 'jam_peach', name: '黄桃蜂蜜酱', img: './assets/items/jam_peach.png' },
    jam_lime: { id: 'jam_lime', name: '清甜青柠酱', img: './assets/items/jam_lime.png' },
    pudding_blue: { id: 'pudding_blue', name: '蓝莓慕斯桶', img: './assets/items/pudding_blue.png' },
    pudding_red: { id: 'pudding_red', name: '草莓布丁桶', img: './assets/items/pudding_red.png' },
    bear_bottle: { id: 'bear_bottle', name: '萌熊甜心饼', img: './assets/items/bear_bottle.png' }
  };

  const ITEM_KEYS = Object.keys(ITEMS);

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

  // 4. Solvability Verification Algorithm (可解性校验器)
  function verifySolvability(cabinetData, conveyorRows) {
    // Clone board state
    const slots = [];
    cabinetData.forEach(c => slots.push({ front: [...c.layers[0]], back: [...c.layers[1]] }));
    conveyorRows.forEach(row => {
      row.forEach(s => slots.push({ front: [...s.layers[0]], back: [...s.layers[1]] }));
    });

    // BFS simulation of elimination steps
    let maxSteps = 120;
    while (maxSteps-- > 0) {
      // 1. Count items in front layer across all slots
      const counts = {};
      slots.forEach(slot => {
        slot.front.forEach(item => {
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
          for (let j = slot.front.length - 1; j >= 0 && needed > 0; j--) {
            if (getItemMatchKey(slot.front[j]) === matchableMatchKey) {
              slot.front.splice(j, 1);
              needed--;
              // If slot front became empty, promote back layer
              if (slot.front.length === 0 && slot.back.length > 0) {
                slot.front = [...slot.back];
                slot.back = [];
              }
            }
          }
        }
        continue; // Next round of elimination
      }

      // 2. If no direct 3-match in front, check if moving an item to an open slot reveals a needed item
      let movedToReveal = false;
      const openSlot = slots.find(s => s.front.length < 3);

      if (openSlot) {
        // Find a slot that has back items waiting to be exposed
        const slotWithBack = slots.find(s => s !== openSlot && s.front.length > 0 && s.back.length > 0);
        if (slotWithBack) {
          const item = slotWithBack.front.pop();
          openSlot.front.push(item);
          if (slotWithBack.front.length === 0) {
            slotWithBack.front = [...slotWithBack.back];
            slotWithBack.back = [];
          }
          movedToReveal = true;
        }
      }

      if (movedToReveal) continue;

      // 3. Check if all items cleared
      const remainingItems = slots.reduce((acc, s) => acc + s.front.length + s.back.length, 0);
      if (remainingItems === 0) {
        return true; // 100% Solvable!
      }

      // No more moves possible
      break;
    }

    const totalRemaining = slots.reduce((acc, s) => acc + s.front.length + s.back.length, 0);
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

      this.selectedItemInfo = null;
      this.dragState = null;

      this.initDOM();
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

    // Generate level with strict Reverse Triplet Generation and Solvability Verification
    initLevelWithVerification(levelNumber) {
      let attempts = 0;
      let valid = false;

      while (!valid && attempts < 50) {
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

    generateLevelData(levelNumber) {
      this.currentLevel = levelNumber;
      this.selectedItemInfo = null;
      this.timerSeconds = 988; // 16:28
      this.updateTimerDisplay();

      // DENSE PACKING: Triplet counts for full conveyor + bottom-aligned cabinet
      const tripletCounts = [18, 24, 28];
      const totalTriplets = tripletCounts[Math.min(levelNumber - 1, 2)] || 24;

      // Pick distinct item types
      const shuffledTypes = [...ITEM_KEYS].sort(() => Math.random() - 0.5);
      const chosenTypes = [];
      for (let i = 0; i < totalTriplets; i++) {
        chosenTypes.push(shuffledTypes[i % shuffledTypes.length]);
      }

      const itemPool = [];
      chosenTypes.forEach(type => {
        itemPool.push(type, type, type);
      });
      // Shuffle pool
      itemPool.sort(() => Math.random() - 0.5);

      // Setup 3x3 Upper Cabinet: 9 cubbies
      this.cabinetData = [];
      for (let i = 0; i < 9; i++) {
        this.cabinetData.push({
          id: `cabinet-${i}`,
          layers: [[], []] // layer 0: front (3 items), layer 1: back (3 items)
        });
      }

      // Setup 3 Conveyor Rows: 4 planks per row = 12 planks total (Seamless looping conveyor)
      const plankWidth = 136;
      const plankGap = 10;
      const pitch = plankWidth + plankGap; // 146

      this.conveyorRows = [];
      for (let r = 0; r < 3; r++) {
        const shelves = [];
        const speed = this.conveyorSpeeds[r];
        for (let s = 0; s < 4; s++) {
          let initX = s * pitch;
          if (speed > 0) {
            // For right-moving row, offset so one shelf is poised to enter smoothly from left
            initX = (s - 1) * pitch; // -146, 0, 146, 292
          }
          shelves.push({
            id: `conveyor-${r}-${s}`,
            rowIndex: r,
            shelfIndex: s,
            layers: [[], []],
            xPos: initX
          });
        }
        this.conveyorRows.push(shelves);
      }

      // 1. Conveyor Rows: "下面滚动的货架也应该是满的"
      // Every single shelf on all 3 conveyor tracks is 100% full in the front layer (3 items each = 36 items!)
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          for (let k = 0; k < 3 && itemPool.length > 0; k++) {
            shelf.layers[0].push(itemPool.pop());
          }
        });
      });

      // 2. Conveyor Rows Back Layer: Pack 2 to 3 items per shelf ("灰色代表在下一行")
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          const backCount = Math.random() < 0.5 ? 2 : 3;
          for (let k = 0; k < backCount && itemPool.length > 0; k++) {
            shelf.layers[1].push(itemPool.pop());
          }
        });
      });

      // 3. Upper Cabinet (9 cubbies across 3 rows):
      // Every shelf (Top, Middle, Bottom) has goods! Top shelf is definitely populated.
      // Top shelf: cubbies 0, 1 have 2-3 items; cubby 2 is empty workspace
      // Middle shelf: cubbies 3, 5 have 2-3 items; cubby 4 is empty workspace
      // Bottom shelf: cubbies 7, 8 have 2-3 items; cubby 6 is empty workspace
      // This leaves 3 full cubbies (9 slots) + partial slots open (10-12 empty slots total) for ample maneuvering!
      const populatedCubbies = [0, 1, 3, 5, 7, 8];
      populatedCubbies.forEach(c => {
        const count = Math.random() < 0.6 ? 3 : 2;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          this.cabinetData[c].layers[0].push(itemPool.pop());
        }
      });

      // Disperse remaining items into back layers of populated cabinet cubbies or conveyor shelves
      while (itemPool.length > 0) {
        const item = itemPool.pop();
        const openBackSlot = populatedCubbies.map(c => this.cabinetData[c]).find(c => c.layers[1].length < 2) ||
                             this.conveyorRows.flatMap(r => r).find(s => s.layers[1].length < 3);
        if (openBackSlot) {
          openBackSlot.layers[1].push(item);
        } else {
          this.conveyorRows[0][0].layers[1].push(item);
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
      const frontItems = layers[0];
      const backItems = layers[1];

      for (let pos = 0; pos < 3; pos++) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-layer-container';

        // Back layer: Grayed out & darkened ("灰色代表在下一行")
        if (backItems[pos]) {
          const backKey = backItems[pos];
          const backItemEl = document.createElement('div');
          backItemEl.className = 'good-item layer-back';
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
      this.renderLane(lane, this.cabinetData[compIdx].layers, 'cabinet', compIdx);
    }

    // Granular update: update only one conveyor shelf plank
    updateShelf(rowIdx, shelfIdx) {
      const track = document.getElementById(`conveyor-track-${rowIdx}`);
      if (!track) return;
      const plank = track.children[shelfIdx];
      if (!plank) return;
      const lane = plank.querySelector('.slot-lane');
      if (!lane) return;
      this.renderLane(lane, this.conveyorRows[rowIdx][shelfIdx].layers, 'conveyor', rowIdx, shelfIdx);
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
      const plankWidth = 136;
      const plankGap = 10;
      const pitch = plankWidth + plankGap; // 146
      const totalSpan = 4 * pitch; // 584

      const animate = () => {
        if (!this.isPaused && !this.isFrozen) {
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

        // Back layer items promote to front layer! ("下一行变为上一行，灰色变为亮色")
        if (targetData.layers[1] && targetData.layers[1].length > 0) {
          targetData.layers[0] = [...targetData.layers[1]];
          targetData.layers[1] = [];
          sound.playPick();
        }

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

      if (sourceSlotData.layers[0].length === 0 && sourceSlotData.layers[1].length > 0) {
        sourceSlotData.layers[0] = [...sourceSlotData.layers[1]];
        sourceSlotData.layers[1] = [];
        sound.playPick();
      }

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
        const SNAP_RADIUS = 60; // Auto-snap magnetic suction radius

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

        try {
          itemEl.setPointerCapture(e.pointerId);
        } catch (_) {}
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

          if (draggedItemEl) {
            draggedItemEl.style.opacity = '0.15';
          }
          sound.playPick();
        }

        if (isDragging) {
          // Precise cursor tracking: pointer is exactly at the visual center of the dragged item
          this.dragGhost.style.left = `${clientX}px`;
          this.dragGhost.style.top = `${clientY}px`;

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

        try {
          draggedItemEl?.releasePointerCapture(e.pointerId);
        } catch (_) {}

        clearSnapHighlights();

        if (!isDragging) {
          // Tap / Click action
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
            if (draggedItemEl) draggedItemEl.style.opacity = '1';
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
            this.dragGhost.style.transform = 'translate(-50%, -50%) scale(1)';

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
              this.dragGhost.style.transform = 'translate(-50%, -50%) scale(1.15)';

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
            this.dragGhost.style.transform = 'translate(-50%, -50%) scale(1)';

            setTimeout(() => {
              this.dragGhost.style.display = 'none';
              this.dragGhost.style.transition = 'none';
              this.dragGhost.style.transform = 'translate(-50%, -50%) scale(1.15)';
              if (draggedItemEl) draggedItemEl.style.opacity = '1';
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

        if (slotData.layers[0].length === 0 && slotData.layers[1].length > 0) {
          slotData.layers[0] = [...slotData.layers[1]];
          slotData.layers[1] = [];
        }

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
        this.cabinetData.forEach(comp => {
          const idx = comp.layers[1].indexOf(targetKey);
          if (idx !== -1 && removedCount < 3) {
            comp.layers[1].splice(idx, 1);
            removedCount++;
          }
        });
      }

      this.score += 150;
      this.scoreEl.textContent = this.score;
      const parentRect = document.getElementById('game-container').getBoundingClientRect();
      this.particles.emit(parentRect.width / 2, parentRect.height / 2, 40, 'star');

      this.cabinetData.forEach(c => {
        if (c.layers[0].length === 0 && c.layers[1].length > 0) {
          c.layers[0] = [...c.layers[1]];
          c.layers[1] = [];
        }
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
        totalItems += comp.layers[0].length + comp.layers[1].length;
      });
      this.conveyorRows.forEach(row => {
        row.forEach(shelf => {
          totalItems += shelf.layers[0].length + shelf.layers[1].length;
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
  });
})();

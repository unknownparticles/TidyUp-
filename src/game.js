import { ITEMS, ITEM_KEYS } from './items.js';
import { sound } from './audio.js';

// Particle System for matches and effects
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
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  emit(x, y, count = 20, type = 'star') {
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
      } else if (p.type === 'wood') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
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

// Main Game Controller
export class GoodsOrganizerGame {
  constructor() {
    this.currentLevel = 2; // Elite Challenge default as in screenshot
    this.score = 0;
    this.timerSeconds = 988; // 16:28 as in screenshot
    this.timerInterval = null;
    this.isFrozen = false;
    this.freezeTimeout = null;
    this.isPaused = false;
    this.hammerMode = false;

    // Prop inventory
    this.propCounts = {
      hammer: 19,
      wand: 41,
      freeze: 67
    };

    // State of cabinet compartments: 9 slots
    // Each compartment: { id: string, layers: [ [itemKey, itemKey, ...], [itemKey, ...] ] }
    this.cabinetData = [];

    // State of conveyor shelves: 3 rows
    // Each row: array of mini shelf planks
    // Each plank: { id: string, layers: [ [itemKey, ...], [itemKey, ...] ], offset: number }
    this.conveyorRows = [];
    this.conveyorSpeeds = [-0.4, 0.45, -0.38]; // pixels per frame

    // Selected item for tap-to-move
    this.selectedItemInfo = null; // { locationType: 'cabinet'|'conveyor', slotIndex: number, shelfIndex?: number, itemIndex: number, itemKey: string }

    // Drag and drop state
    this.dragState = null;

    this.initDOM();
    this.particles = new ParticleSystem(document.getElementById('fx-canvas'));
    this.initLevel(this.currentLevel);
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

    // Tool counts
    document.getElementById('count-hammer').textContent = this.propCounts.hammer;
    document.getElementById('count-wand').textContent = this.propCounts.wand;
    document.getElementById('count-freeze').textContent = this.propCounts.freeze;
  }

  initLevel(levelNumber) {
    this.currentLevel = levelNumber;
    this.scoreEl.textContent = this.score;
    this.selectedItemInfo = null;

    // Set time according to screenshot (16:28 = 988 seconds)
    this.timerSeconds = 988;
    this.updateTimerDisplay();

    // Determine total triplets
    // Level 1: 6 triplets = 18 items
    // Level 2: 14 triplets = 42 items (matching screenshot)
    // Level 3: 20 triplets = 60 items
    const tripletCounts = [6, 14, 20];
    const totalTriplets = tripletCounts[Math.min(levelNumber - 1, 2)] || 14;

    // Pick random item types
    const shuffledKeys = [...ITEM_KEYS].sort(() => Math.random() - 0.5);
    const chosenTypes = shuffledKeys.slice(0, totalTriplets);

    // Create pool of items: 3 of each type
    const itemPool = [];
    chosenTypes.forEach(type => {
      itemPool.push(type, type, type);
    });
    // Shuffle pool
    itemPool.sort(() => Math.random() - 0.5);

    // Setup Upper Cabinet: 9 compartments, each with 2 layers (front row + back row)
    this.cabinetData = [];
    for (let i = 0; i < 9; i++) {
      this.cabinetData.push({
        id: `cabinet-${i}`,
        layers: [
          [], // Layer 0: Front row (max 3 items, visible & interactable)
          []  // Layer 1: Back row (max 3 items, GRAYED OUT "在下一行")
        ]
      });
    }

    // Setup Conveyor: 3 rows, each row has 4 mini shelf planks
    this.conveyorRows = [];
    for (let r = 0; r < 3; r++) {
      const shelves = [];
      for (let s = 0; s < 4; s++) {
        shelves.push({
          id: `conveyor-${r}-${s}`,
          rowIndex: r,
          shelfIndex: s,
          layers: [
            [], // Front layer (max 3 items)
            []  // Back layer (max 3 items, grayed out)
          ],
          xPos: s * 145 // initial horizontal layout position
        });
      }
      this.conveyorRows.push(shelves);
    }

    // Distribute items into Cabinet front and back, and Conveyor front and back
    // Ensure plenty of empty spots so player has space to maneuver ("有空格可以移动")
    
    // Fill cabinet front: ~2 items per slot (leaving empty spaces)
    this.cabinetData.forEach(comp => {
      const count = Math.random() < 0.7 ? 2 : (Math.random() < 0.5 ? 3 : 1);
      for (let k = 0; k < count && itemPool.length > 0; k++) {
        comp.layers[0].push(itemPool.pop());
      }
    });

    // Fill cabinet back layer (GRAYED OUT):
    this.cabinetData.forEach(comp => {
      if (itemPool.length > 0 && Math.random() < 0.8) {
        const count = Math.random() < 0.6 ? 2 : 1;
        for (let k = 0; k < count && itemPool.length > 0; k++) {
          comp.layers[1].push(itemPool.pop());
        }
      }
    });

    // Fill conveyor rows front & back
    this.conveyorRows.forEach(row => {
      row.forEach(shelf => {
        // Front layer: 1 or 2 items (leave empty spots for movement)
        if (itemPool.length > 0) {
          const frontCount = Math.random() < 0.5 ? 2 : (Math.random() < 0.7 ? 1 : 0);
          for (let k = 0; k < frontCount && itemPool.length > 0; k++) {
            shelf.layers[0].push(itemPool.pop());
          }
        }
        // Back layer (GRAYED OUT): 1 or 2 items
        if (itemPool.length > 0 && Math.random() < 0.6) {
          const backCount = Math.random() < 0.5 ? 2 : 1;
          for (let k = 0; k < backCount && itemPool.length > 0; k++) {
            shelf.layers[1].push(itemPool.pop());
          }
        }
      });
    });

    // If any items remain in pool, disperse them into available cabinet or conveyor slots
    while (itemPool.length > 0) {
      const item = itemPool.pop();
      const openSlot = this.cabinetData.find(c => c.layers[0].length < 3) || 
                       this.conveyorRows[0].find(s => s.layers[0].length < 3);
      if (openSlot) {
        openSlot.layers[0].push(item);
      } else {
        this.cabinetData[0].layers[1].push(item);
      }
    }

    this.renderBoard();
  }

  // Render the entire cabinet and conveyor slots
  renderBoard() {
    this.renderCabinet();
    this.renderConveyors();
    this.checkMatches();
    this.checkGameWinOrLoss();
  }

  // Render Upper Main Cabinet
  renderCabinet() {
    this.cabinetEl.innerHTML = '';
    this.cabinetData.forEach((comp, compIdx) => {
      const compDiv = document.createElement('div');
      compDiv.className = 'compartment';
      compDiv.dataset.type = 'cabinet';
      compDiv.dataset.index = compIdx;

      const lane = document.createElement('div');
      lane.className = 'slot-lane';

      // Up to 3 positions in front
      const frontItems = comp.layers[0];
      const backItems = comp.layers[1];

      for (let pos = 0; pos < 3; pos++) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-layer-container';

        // Check if there is an item in the back layer ("灰色代表在下一行")
        if (backItems[pos]) {
          const backKey = backItems[pos];
          const backItemEl = document.createElement('div');
          backItemEl.className = 'good-item layer-back';
          backItemEl.innerHTML = ITEMS[backKey].svg;
          itemContainer.appendChild(backItemEl);
        }

        // Check if there is an item in the front layer
        if (frontItems[pos]) {
          const frontKey = frontItems[pos];
          const frontItemEl = document.createElement('div');
          frontItemEl.className = 'good-item layer-front';
          frontItemEl.dataset.itemKey = frontKey;
          frontItemEl.dataset.type = 'cabinet';
          frontItemEl.dataset.slotIndex = compIdx;
          frontItemEl.dataset.itemIndex = pos;
          frontItemEl.innerHTML = ITEMS[frontKey].svg;

          // Check if currently selected
          if (this.selectedItemInfo &&
              this.selectedItemInfo.locationType === 'cabinet' &&
              this.selectedItemInfo.slotIndex === compIdx &&
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

        lane.appendChild(itemContainer);
      }

      compDiv.appendChild(lane);
      this.cabinetEl.appendChild(compDiv);
    });
  }

  // Render Lower 3 Scrolling Conveyor Rows
  renderConveyors() {
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

        const lane = document.createElement('div');
        lane.className = 'slot-lane';

        const frontItems = shelf.layers[0];
        const backItems = shelf.layers[1];

        for (let pos = 0; pos < 3; pos++) {
          const itemContainer = document.createElement('div');
          itemContainer.className = 'item-layer-container';

          // Back layer (GRAYED OUT "灰色代表在下一行")
          if (backItems[pos]) {
            const backKey = backItems[pos];
            const backItemEl = document.createElement('div');
            backItemEl.className = 'good-item layer-back';
            backItemEl.innerHTML = ITEMS[backKey].svg;
            itemContainer.appendChild(backItemEl);
          }

          // Front layer
          if (frontItems[pos]) {
            const frontKey = frontItems[pos];
            const frontItemEl = document.createElement('div');
            frontItemEl.className = 'good-item layer-front';
            frontItemEl.dataset.itemKey = frontKey;
            frontItemEl.dataset.type = 'conveyor';
            frontItemEl.dataset.rowIndex = rowIdx;
            frontItemEl.dataset.shelfIndex = shelfIdx;
            frontItemEl.dataset.itemIndex = pos;
            frontItemEl.innerHTML = ITEMS[frontKey].svg;

            if (this.selectedItemInfo &&
                this.selectedItemInfo.locationType === 'conveyor' &&
                this.selectedItemInfo.rowIndex === rowIdx &&
                this.selectedItemInfo.shelfIndex === shelfIdx &&
                this.selectedItemInfo.itemIndex === pos) {
              frontItemEl.classList.add('selected');
            }

            itemContainer.appendChild(frontItemEl);
          } else {
            // Empty space
            const emptySlot = document.createElement('div');
            emptySlot.className = 'empty-slot-indicator';
            emptySlot.textContent = '+';
            itemContainer.appendChild(emptySlot);
          }

          lane.appendChild(itemContainer);
        }

        plank.appendChild(lane);
        track.appendChild(plank);
      });

      rowWrapper.appendChild(track);
      this.conveyorSectionEl.appendChild(rowWrapper);
    });
  }

  // Smooth Horizontal Conveyor Animation
  startConveyors() {
    const animate = () => {
      if (!this.isPaused && !this.isFrozen) {
        this.conveyorRows.forEach((row, rowIdx) => {
          const track = document.getElementById(`conveyor-track-${rowIdx}`);
          if (!track) return;

          const speed = this.conveyorSpeeds[rowIdx];
          const totalPlanks = row.length;
          const plankWidth = 150; // width + margin
          const trackWidth = totalPlanks * plankWidth;

          row.forEach(shelf => {
            shelf.xPos += speed;
            if (shelf.xPos < -plankWidth) {
              shelf.xPos += trackWidth;
            } else if (shelf.xPos > trackWidth - plankWidth) {
              shelf.xPos -= trackWidth;
            }
          });

          // Update DOM positions of each plank
          const plankEls = track.children;
          for (let i = 0; i < plankEls.length; i++) {
            const plank = plankEls[i];
            const shelf = row[i];
            plank.style.transform = `translateX(${shelf.xPos}px)`;
          }
        });
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // Timer Countdown
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

  // Core 3-Match Elimination Logic
  checkMatches() {
    let matchedAny = false;

    // 1. Check Cabinet Compartments
    this.cabinetData.forEach((comp, idx) => {
      const front = comp.layers[0];
      if (front.length === 3 && front[0] === front[1] && front[1] === front[2]) {
        matchedAny = true;
        this.triggerMatchElimination('cabinet', idx, null, front[0]);
      }
    });

    // 2. Check Conveyor Shelves
    this.conveyorRows.forEach((row, rIdx) => {
      row.forEach((shelf, sIdx) => {
        const front = shelf.layers[0];
        if (front.length === 3 && front[0] === front[1] && front[1] === front[2]) {
          matchedAny = true;
          this.triggerMatchElimination('conveyor', rIdx, sIdx, front[0]);
        }
      });
    });

    return matchedAny;
  }

  triggerMatchElimination(type, idx1, idx2, itemKey) {
    sound.playMatch();
    this.score += 100;
    this.scoreEl.textContent = this.score;

    // Find the DOM element of the matched compartment/shelf
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

      // Emit celebratory star particles
      this.particles.emit(fxX, fxY, 28, 'star');

      // Score float animation
      const scoreFloat = document.createElement('div');
      scoreFloat.className = 'score-float';
      scoreFloat.textContent = '+100 消除!';
      scoreFloat.style.left = `${fxX - 40}px`;
      scoreFloat.style.top = `${fxY - 20}px`;
      document.getElementById('game-container').appendChild(scoreFloat);
      setTimeout(() => scoreFloat.remove(), 800);

      // Play match animation on front items
      const frontItems = targetEl.querySelectorAll('.good-item.layer-front');
      frontItems.forEach(el => el.classList.add('matching'));
    }

    // Clear front layer after animation
    setTimeout(() => {
      targetData.layers[0] = [];

      // Promote back layer items to front layer! ("下一行变为上一行，灰色变为亮色")
      if (targetData.layers[1] && targetData.layers[1].length > 0) {
        targetData.layers[0] = [...targetData.layers[1]];
        targetData.layers[1] = [];
        sound.playPick();
      }

      this.renderBoard();
    }, 320);
  }

  // Move an item from source slot to target slot
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

    // Check if target has capacity (< 3)
    if (targetArray.length >= 3) {
      sound.playDrop();
      return false; // Target full
    }

    // Remove from source
    const item = sourceArray.splice(fromLocation.itemIndex, 1)[0];
    if (!item) return false;

    // Add to target
    targetArray.push(item);
    sound.playDrop();

    // If source layer 0 is now empty and layer 1 has items, promote layer 1 to layer 0!
    let sourceSlotData = fromLocation.type === 'cabinet' 
      ? this.cabinetData[fromLocation.slotIndex]
      : this.conveyorRows[fromLocation.rowIndex][fromLocation.shelfIndex];

    if (sourceSlotData.layers[0].length === 0 && sourceSlotData.layers[1].length > 0) {
      sourceSlotData.layers[0] = [...sourceSlotData.layers[1]];
      sourceSlotData.layers[1] = [];
      sound.playPick();
    }

    this.selectedItemInfo = null;
    this.renderBoard();
    return true;
  }

  // Event Handlers for Tap, Drag, and Booster tools
  bindEvents() {
    const container = document.getElementById('game-container');

    // Tap on game board
    container.addEventListener('click', (e) => {
      // 1. Hammer Mode active
      if (this.hammerMode) {
        const itemEl = e.target.closest('.good-item.layer-front');
        if (itemEl) {
          this.executeHammer(itemEl);
        }
        return;
      }

      // 2. Normal item tap
      const itemEl = e.target.closest('.good-item.layer-front');
      if (itemEl) {
        const type = itemEl.dataset.type;
        const slotIdx = parseInt(itemEl.dataset.slotIndex || itemEl.dataset.rowIndex);
        const shelfIdx = parseInt(itemEl.dataset.shelfIndex || '0');
        const itemIdx = parseInt(itemEl.dataset.itemIndex);
        const itemKey = itemEl.dataset.itemKey;

        // If clicking already selected item, deselect it
        if (this.selectedItemInfo &&
            this.selectedItemInfo.locationType === type &&
            this.selectedItemInfo.slotIndex === slotIdx &&
            this.selectedItemInfo.shelfIndex === shelfIdx &&
            this.selectedItemInfo.itemIndex === itemIdx) {
          this.selectedItemInfo = null;
          sound.playPick();
          this.renderBoard();
          return;
        }

        // If another item was selected, try moving it to this item's slot if space exists
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
              type: type,
              slotIndex: slotIdx,
              rowIndex: slotIdx,
              shelfIndex: shelfIdx
            }
          );
          if (moved) return;
        }

        // Otherwise select this item
        this.selectedItemInfo = {
          locationType: type,
          slotIndex: slotIdx,
          rowIndex: slotIdx,
          shelfIndex: shelfIdx,
          itemIndex: itemIdx,
          itemKey: itemKey
        };
        sound.playPick();
        this.renderBoard();
        return;
      }

      // 3. Tap on empty space / slot container to move selected item there
      const compEl = e.target.closest('.compartment, .shelf-plank');
      if (compEl && this.selectedItemInfo) {
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
            type: type,
            slotIndex: slotIdx,
            rowIndex: slotIdx,
            shelfIndex: shelfIdx
          }
        );
      }
    });

    // Touch & Mouse Drag and Drop handling
    const onDragStart = (e) => {
      if (this.hammerMode || this.isPaused) return;
      const target = e.target.closest('.good-item.layer-front');
      if (!target) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const type = target.dataset.type;
      const slotIdx = parseInt(target.dataset.slotIndex || target.dataset.rowIndex);
      const shelfIdx = parseInt(target.dataset.shelfIndex || '0');
      const itemIdx = parseInt(target.dataset.itemIndex);
      const itemKey = target.dataset.itemKey;

      this.dragState = {
        itemKey,
        location: {
          type,
          slotIndex: slotIdx,
          rowIndex: slotIdx,
          shelfIndex: shelfIdx,
          itemIndex: itemIdx
        }
      };

      // Setup ghost
      this.dragGhost.innerHTML = ITEMS[itemKey].svg;
      this.dragGhost.style.display = 'block';
      this.dragGhost.style.left = `${clientX}px`;
      this.dragGhost.style.top = `${clientY}px`;
      target.style.opacity = '0.3';
      sound.playPick();
    };

    const onDragMove = (e) => {
      if (!this.dragState) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.dragGhost.style.left = `${clientX}px`;
      this.dragGhost.style.top = `${clientY}px`;

      // Highlight hover slot
      const elementBelow = document.elementFromPoint(clientX, clientY);
      const slotBelow = elementBelow ? elementBelow.closest('.compartment, .shelf-plank') : null;

      document.querySelectorAll('.drop-target-valid, .drop-target-invalid').forEach(el => {
        el.classList.remove('drop-target-valid', 'drop-target-invalid');
      });

      if (slotBelow) {
        const type = slotBelow.dataset.type;
        let count = 0;
        if (type === 'cabinet') {
          count = this.cabinetData[parseInt(slotBelow.dataset.index)].layers[0].length;
        } else {
          count = this.conveyorRows[parseInt(slotBelow.dataset.rowIndex)][parseInt(slotBelow.dataset.shelfIndex)].layers[0].length;
        }

        if (count < 3) {
          slotBelow.classList.add('drop-target-valid');
        } else {
          slotBelow.classList.add('drop-target-invalid');
        }
      }
    };

    const onDragEnd = (e) => {
      if (!this.dragState) return;

      this.dragGhost.style.display = 'none';
      document.querySelectorAll('.drop-target-valid, .drop-target-invalid').forEach(el => {
        el.classList.remove('drop-target-valid', 'drop-target-invalid');
      });

      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

      const elementBelow = document.elementFromPoint(clientX, clientY);
      const slotBelow = elementBelow ? elementBelow.closest('.compartment, .shelf-plank') : null;

      if (slotBelow) {
        const type = slotBelow.dataset.type;
        const slotIdx = parseInt(slotBelow.dataset.index || slotBelow.dataset.rowIndex);
        const shelfIdx = parseInt(slotBelow.dataset.shelfIndex || '0');

        this.moveItem(
          this.dragState.location,
          {
            type: type,
            slotIndex: slotIdx,
            rowIndex: slotIdx,
            shelfIndex: shelfIdx
          }
        );
      } else {
        // Cancel drag
        this.renderBoard();
      }

      this.dragState = null;
    };

    container.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    container.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);

    // Booster Buttons
    document.getElementById('btn-tool-hammer').addEventListener('click', () => this.activateHammer());
    document.getElementById('btn-tool-wand').addEventListener('click', () => this.activateWand());
    document.getElementById('btn-tool-freeze').addEventListener('click', () => this.activateFreeze());
    document.getElementById('btn-tool-shuffle').addEventListener('click', () => this.activateShuffle());
    document.getElementById('btn-cancel-hammer').addEventListener('click', () => this.deactivateHammer());

    // Header & Modal Buttons
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-resume').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.closeModals();
      this.initLevel(this.currentLevel);
    });
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      document.getElementById('btn-sound-toggle').textContent = isMuted ? '🔇' : '🔊';
    });
    document.getElementById('btn-next-level').addEventListener('click', () => {
      this.closeModals();
      this.initLevel(this.currentLevel + 1);
    });
    document.getElementById('btn-revive').addEventListener('click', () => {
      this.closeModals();
      this.timerSeconds = 90; // Add 90s
      this.startTimer();
    });
  }

  // Booster 1: Hammer (强制消除指定物品)
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
    this.particles.emit(rect.left - parentRect.left + 25, rect.top - parentRect.top + 25, 30, 'wood');

    itemEl.classList.add('smashed');

    setTimeout(() => {
      let slotData = type === 'cabinet' 
        ? this.cabinetData[slotIdx] 
        : this.conveyorRows[slotIdx][shelfIdx];

      slotData.layers[0].splice(itemIdx, 1);

      // Check if back layer can promote
      if (slotData.layers[0].length === 0 && slotData.layers[1].length > 0) {
        slotData.layers[0] = [...slotData.layers[1]];
        slotData.layers[1] = [];
      }

      this.renderBoard();
    }, 280);
  }

  // Booster 2: Magic Wand (自动寻找并消除一组物品)
  activateWand() {
    if (this.propCounts.wand <= 0) return;

    // Scan all visible front items across all slots
    const visibleItemMap = {}; // itemKey: [locations...]
    
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

    // Find a key that has 3 visible instances, or if none, find from back layer
    let targetKey = Object.keys(visibleItemMap).find(key => visibleItemMap[key].length >= 3);

    if (!targetKey) {
      // Find key that has at least 2, or take any key
      targetKey = Object.keys(visibleItemMap)[0];
    }

    if (!targetKey) return; // No items left

    sound.playWand();
    this.propCounts.wand--;
    document.getElementById('count-wand').textContent = this.propCounts.wand;

    // Remove 3 instances of targetKey from wherever they are
    let removedCount = 0;

    // Check front
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

    // If still need more, take from back layers
    if (removedCount < 3) {
      this.cabinetData.forEach(comp => {
        const idx = comp.layers[1].indexOf(targetKey);
        if (idx !== -1 && removedCount < 3) {
          comp.layers[1].splice(idx, 1);
          removedCount++;
        }
      });
    }

    // Score & animation
    this.score += 150;
    this.scoreEl.textContent = this.score;
    const parentRect = document.getElementById('game-container').getBoundingClientRect();
    this.particles.emit(parentRect.width / 2, parentRect.height / 2, 40, 'star');

    // Promote any empty front slots
    this.cabinetData.forEach(c => {
      if (c.layers[0].length === 0 && c.layers[1].length > 0) {
        c.layers[0] = [...c.layers[1]];
        c.layers[1] = [];
      }
    });

    this.renderBoard();
  }

  // Booster 3: Freeze (暂停倒计时与减速)
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
    }, 25000); // 25s freeze
  }

  // Booster 4: Shuffle / Refresh (打乱并重新排列)
  activateShuffle() {
    sound.playShuffle();

    // Gather all front items
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

    // Shuffle items
    allFrontItems.sort(() => Math.random() - 0.5);

    // Redistribute items evenly
    let itemIdx = 0;
    this.cabinetData.forEach(comp => {
      const take = Math.min(2, allFrontItems.length - itemIdx);
      for (let k = 0; k < take; k++) {
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

    // Any leftovers
    while (itemIdx < allFrontItems.length) {
      const item = allFrontItems[itemIdx++];
      const openSlot = this.cabinetData.find(c => c.layers[0].length < 3) ||
                       this.conveyorRows[0].find(s => s.layers[0].length < 3);
      if (openSlot) openSlot.layers[0].push(item);
    }

    this.renderBoard();
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

  // Check victory or defeat conditions
  checkGameWinOrLoss() {
    // 1. Check Win: All items cleared!
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

    // 2. Check Deadlock: All slots full (< 3 empty capacity anywhere) and no matches exist
    let totalFrontItems = 0;
    let totalFrontCapacity = 9 * 3 + (3 * 4 * 3); // 27 + 36 = 63
    this.cabinetData.forEach(comp => totalFrontItems += comp.layers[0].length);
    this.conveyorRows.forEach(row => row.forEach(shelf => totalFrontItems += shelf.layers[0].length));

    // If all slots are completely full and no 3-matches trigger, it's a deadlock
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

// Start Game on Page Load
window.addEventListener('DOMContentLoaded', () => {
  window.game = new GoodsOrganizerGame();
});

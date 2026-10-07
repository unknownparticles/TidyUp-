const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
// Execute the shipped app and expose its controller without starting a level.
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8').replace(
  "  window.addEventListener('DOMContentLoaded', () => {",
  "  window.TestGame = GoodsOrganizerGame; sound.muted = true;\n  window.addEventListener('DOMContentLoaded', () => {"
);

class Element {
  constructor(rect = { left: 0, top: 0, width: 120, height: 100 }) {
    this.rect = { ...rect, right: rect.left + rect.width, bottom: rect.top + rect.height };
    this.classes = new Set();
    this.classList = {
      add: (...names) => names.forEach(name => this.classes.add(name)),
      remove: (...names) => names.forEach(name => this.classes.delete(name)),
      contains: name => this.classes.has(name)
    };
    this.style = { removeProperty: name => { delete this.style[name]; } };
    this.dataset = {};
    this.listeners = {};
    this.children = [];
    this.items = [];
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  getBoundingClientRect() { return this.rect; }
  closest(selector) { return selector === '.good-item.layer-front' ? this : null; }
  querySelector() { return null; }
  querySelectorAll(selector) { return selector === '.good-item.layer-front' ? this.items : []; }
}

function fixture({ sourceCount = 1, targetCount = 1, location = 'cabinet' } = {}) {
  const ids = new Map();
  const elements = [];
  const pending = [];
  const container = new Element({ left: 0, top: 0, width: 400, height: 400 });
  ids.set('game-container', container);
  const document = {
    getElementById(id) {
      if (!ids.has(id)) ids.set(id, new Element());
      return ids.get(id);
    },
    querySelectorAll(selector) {
      if (selector.includes('.drop-target-')) {
        return elements.filter(el => ['drop-target-snap', 'drop-target-valid', 'drop-target-invalid'].some(name => el.classes.has(name)));
      }
      return elements.filter(el => el.classes.has('selected'));
    }
  };
  const window = { listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } };
  vm.runInNewContext(source, { window, document, console, setTimeout: callback => { pending.push(callback); } });
  const game = Object.create(window.TestGame.prototype);
  const slotData = count => ({ layers: [['item_810', 'item_811', 'item_812'].slice(0, count), [], []] });
  game.cabinetData = [slotData(sourceCount), slotData(targetCount)];
  game.conveyorRows = [[slotData(sourceCount), slotData(targetCount)]];
  const compartments = [new Element(), new Element({ left: 200, top: 0, width: 120, height: 100 })];
  const planks = [new Element({ left: 0, top: 180, width: 120, height: 100 }), new Element({ left: 200, top: 180, width: 120, height: 100 })];
  game.cabinetEl = { children: compartments };
  document.getElementById('conveyor-track-0').children = planks;
  const sourceEl = new Element({ left: 20, top: location === 'cabinet' ? 20 : 200, width: 40, height: 70 });
  sourceEl.classList.add('good-item', 'layer-front', 'entering');
  sourceEl.dataset = { type: location, slotIndex: '0', rowIndex: '0', shelfIndex: '0', itemIndex: '0', itemKey: 'item_810' };
  const sourceItems = [sourceEl];
  for (let itemIndex = 1; itemIndex < sourceCount; itemIndex++) {
    const itemEl = new Element({ left: 30 + itemIndex * 30, top: sourceEl.rect.top, width: 25, height: 70 });
    itemEl.classList.add('good-item', 'layer-front');
    itemEl.dataset = { ...sourceEl.dataset, itemIndex: String(itemIndex), itemKey: `item_${810 + itemIndex}` };
    sourceItems.push(itemEl);
  }
  (location === 'cabinet' ? compartments[0] : planks[0]).items = sourceItems;
  elements.push(...sourceItems, ...compartments, ...planks);
  game.dragGhost = new Element();
  game.selectedItemInfo = null;
  game.particles = { emit() {} };
  game.updates = [];
  game.updateLocation = location => game.updates.push(location);
  game.checkMatches = () => false;
  game.checkGameWinOrLoss = () => {};
  game.renderCount = 0;
  game.renderBoard = () => { game.renderCount++; };
  game.bindEvents();
  let pointerX = 40;
  let pointerY = location === 'cabinet' ? 50 : 230;
  function event(type, x = pointerX, y = pointerY, pointerId = 1, target = sourceEl) {
    pointerX = x;
    pointerY = y;
    const handler = type === 'pointerdown' ? container.listeners[type] : window.listeners[type];
    handler({ target, clientX: x, clientY: y, pointerId, pointerType: 'mouse', preventDefault() {} });
  }
  return { game, sourceEl, sourceItems, event, pending, flush: () => { while (pending.length) pending.shift()(); } };
}

for (const location of ['cabinet', 'conveyor']) {
  for (const sourceCount of [2, 3]) {
    for (const targetIndex of Array.from({ length: sourceCount - 1 }, (_, i) => i + 1)) {
      for (const gesture of ['drag', 'tap']) {
        test(`${gesture} swaps item 0 and ${targetIndex} within ${location} with ${sourceCount} items`, () => {
          const f = fixture({ location, sourceCount });
          const slot = location === 'cabinet' ? f.game.cabinetData[0] : f.game.conveyorRows[0][0];
          slot.layers[1] = ['item_813'];
          slot.layers[2] = ['item_814'];
          const before = JSON.parse(JSON.stringify([f.game.cabinetData, f.game.conveyorRows]));
          const expected = JSON.parse(JSON.stringify(before));
          const front = (location === 'cabinet' ? expected[0][0] : expected[1][0][0]).layers[0];
          [front[0], front[targetIndex]] = [front[targetIndex], front[0]];
          const rect = f.sourceItems[targetIndex].rect;
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          f.event('pointerdown');
          if (gesture === 'drag') {
            f.event('pointermove', x, y);
            f.event('pointerup');
            assert.equal(JSON.stringify([f.game.cabinetData, f.game.conveyorRows]), JSON.stringify(before));
          } else {
            f.event('pointerup');
            f.event('pointerdown', x, y, 1, f.sourceItems[targetIndex]);
            f.event('pointerup');
          }
          f.flush();
          assert.equal(JSON.stringify([f.game.cabinetData, f.game.conveyorRows]), JSON.stringify(expected));
          assert.equal(f.game.updates.length, 1);
          assert.equal(f.game.renderCount, 0);
          assert.equal(f.game.selectedItemInfo, null);
          assert.equal(f.sourceEl.style.visibility, undefined);
          assert.ok(f.sourceItems.every(el => !el.classes.has('selected')));
          if (gesture === 'drag') assert.equal(f.game.dragGhost.style.display, 'none');
        });
      }
    }
  }

  test(`dropping on empty space within ${location} preserves item order`, () => {
    const f = fixture({ location, sourceCount: 2 });
    const before = JSON.stringify([f.game.cabinetData, f.game.conveyorRows]);
    f.event('pointerdown');
    f.event('pointermove', 110, location === 'cabinet' ? 50 : 230);
    f.event('pointerup');
    f.flush();
    assert.equal(JSON.stringify([f.game.cabinetData, f.game.conveyorRows]), before);
    assert.equal(f.game.updates.length, 0);
    assert.equal(f.sourceEl.style.visibility, undefined);
  });
}

test('drop uses release position when it differs from the last pointermove', () => {
  const f = fixture({ sourceCount: 3 });
  f.event('pointerdown');
  f.event('pointermove', 240, 50);
  f.event('pointerup', 102, 50);
  f.flush();
  assert.equal(JSON.stringify(f.game.cabinetData[0].layers[0]), JSON.stringify(['item_812', 'item_811', 'item_810']));
  assert.equal(f.game.cabinetData[1].layers[0].length, 1);
  assert.equal(f.game.updates.length, 1);
});

test('same-slot move without a valid destination item preserves data', () => {
  const f = fixture({ sourceCount: 3 });
  const before = JSON.stringify(f.game.cabinetData);
  const from = { type: 'cabinet', slotIndex: 0, itemIndex: 0 };
  for (const itemIndex of [undefined, -1, 0, 3, NaN]) {
    assert.equal(f.game.moveItem(from, { ...from, itemIndex }), false);
  }
  assert.equal(JSON.stringify(f.game.cabinetData), before);
  assert.equal(f.game.updates.length, 0);
});

for (const location of ['cabinet', 'conveyor']) {
  for (const sourceCount of [1, 3]) {
    test(`return to ${location} with ${sourceCount} items preserves nodes and data`, () => {
      const f = fixture({ location, sourceCount });
      const before = JSON.stringify([f.game.cabinetData, f.game.conveyorRows]);
      const y = location === 'cabinet' ? 50 : 230;
      f.event('pointerdown', 40, y);
      f.event('pointermove', 55, y);
      assert.equal(f.sourceEl.style.visibility, 'hidden');
      f.event('pointerup', 55, y);
      f.flush();
      assert.equal(f.game.renderCount, 0);
      assert.equal(f.game.updates.length, 0);
      assert.equal(f.sourceEl.style.visibility, undefined);
      assert.equal(f.game.dragGhost.style.display, 'none');
      assert.equal(JSON.stringify([f.game.cabinetData, f.game.conveyorRows]), before);
    });
  }
}

for (const destination of ['outside', 'full']) {
  test(`rejected ${destination} drop restores the captured source after the timer`, () => {
    const f = fixture({ targetCount: 3 });
    f.event('pointerdown');
    f.event('pointermove', destination === 'full' ? 240 : 700, destination === 'full' ? 50 : 650);
    f.event('pointerup');
    assert.equal(f.sourceEl.style.visibility, 'hidden');
    assert.equal(f.pending.length, 1);
    // A new pointer cannot steal the same ghost during the return transition.
    f.event('pointerdown');
    f.flush();
    assert.equal(f.sourceEl.style.visibility, undefined);
    assert.equal(f.game.dragGhost.style.display, 'none');
    assert.equal(f.game.renderCount, 0);
    assert.equal(f.game.updates.length, 0);
    f.event('pointerdown');
    f.event('pointerup');
    assert.ok(f.game.selectedItemInfo);
  });
}

test('pointercancel restores an active drag without moving it to the highlighted target', () => {
  const f = fixture();
  const before = JSON.stringify(f.game.cabinetData);
  f.event('pointerdown');
  f.event('pointermove', 240, 50);
  f.event('pointercancel');
  f.flush();
  assert.equal(f.sourceEl.style.visibility, undefined);
  assert.equal(f.game.dragGhost.style.display, 'none');
  assert.equal(JSON.stringify(f.game.cabinetData), before);
  assert.equal(f.game.updates.length, 0);
  assert.equal(f.game.renderCount, 0);
});

test('pressing without moving can select and deselect without restarting itemPop', () => {
  const f = fixture();
  for (let i = 0; i < 2; i++) {
    f.event('pointerdown');
    f.event('pointerup');
    assert.equal(f.sourceEl.classes.has('entering'), false);
  }
  assert.equal(f.game.selectedItemInfo, null);
  assert.equal(f.game.renderCount, 0);
  assert.equal(f.game.dragGhost.style.display, undefined);
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  const baseRule = css.match(/\.good-item\.layer-front\s*\{([^}]+)\}/)[1];
  assert.doesNotMatch(baseRule, /animation\s*:/);
});

test('a cancelled press is not a tap', () => {
  const f = fixture();
  f.event('pointerdown');
  f.event('pointercancel');
  assert.equal(f.game.selectedItemInfo, null);
});

test('a valid drop moves the item and updates only source and destination', () => {
  const f = fixture();
  f.event('pointerdown');
  f.event('pointermove', 240, 50);
  f.event('pointerup');
  assert.equal(f.game.cabinetData[0].layers[0].length, 1);
  f.flush();
  assert.equal(f.game.cabinetData[0].layers[0].length, 0);
  assert.equal(f.game.cabinetData[1].layers[0].length, 2);
  assert.equal(f.game.updates.length, 2);
  assert.equal(f.game.renderCount, 0);
  assert.equal(f.game.dragGhost.style.display, 'none');
});

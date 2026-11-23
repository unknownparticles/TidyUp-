const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8').replace(
  "  window.addEventListener('DOMContentLoaded', () => {",
  "  window.TestGame = GoodsOrganizerGame; sound.muted = true;\n  window.addEventListener('DOMContentLoaded', () => {"
);
const keys = Object.keys(require('../assets/items/items_data.json'));
const [a, b, c] = keys;
const slot = (front = [], back = [], deep = [], deepest = []) => ({ layers: [front, back, deep, deepest] });
const cabinet = (slotIndex, itemIndex = 0) => ({ type: 'cabinet', slotIndex, itemIndex });

function fixture() {
  const window = { addEventListener() {} };
  const queued = [];
  const element = {
    classList: { add() {}, remove() {} },
    style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 120, height: 100 })
  };
  const document = { body: element, getElementById: () => element, querySelectorAll: () => [] };
  const math = Object.create(Math);
  let state = 49591;
  math.random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  vm.runInNewContext(source, {
    window, document, Math: math, console: { log() {} },
    setTimeout: callback => queued.push(callback), clearInterval() {}
  });
  const game = Object.assign(Object.create(window.TestGame.prototype), {
    cabinetData: [], conveyorRows: [], cabinetEl: { children: [] },
    score: 0, scoreEl: element, timerEl: element, hammerBanner: element,
    propCounts: { hammer: 19, wand: 41 }, particles: { emit() {} },
    conveyorMetrics: { pitch: 146 }, conveyorSpeeds: [-1, 1, -1],
    updateCompartment() {}, updateShelf() {}, renderBoard() {}
  });
  const flush = () => { while (queued.length) queued.shift()(); };
  const board = () => [...game.cabinetData, ...game.conveyorRows.flat()];
  const items = () => board().flatMap(({ layers }) => [...layers.flat()]);
  const clickHammer = (key, slotIndex = 0, itemIndex = 0) => game.executeHammer({
    ...element, dataset: { type: 'cabinet', slotIndex: String(slotIndex), itemIndex: String(itemIndex), itemKey: key }
  });
  return { game, board, items, clickHammer, flush, queued };
}

test('wand clears a full group even when two copies share one hidden layer', () => {
  const { game, items } = fixture();
  game.cabinetData = [slot([a], [a, a]), slot([b])];
  game.conveyorRows = [[slot([b], [], [], [b])]];
  game.activateWand();
  assert.deepEqual(items(), [b, b, b]);
  assert.equal(game.propCounts.wand, 40);
  game.activateWand();
  assert.deepEqual(items(), []);
});

test('one hammer charge clears the clicked item and both of its copies', () => {
  const { game, items, clickHammer, flush } = fixture();
  game.cabinetData = [slot([b, a], [a]), slot([b])];
  game.conveyorRows = [[slot([b], [], [a])]];
  clickHammer(a, 0, 1);
  assert.equal(game.propCounts.hammer, 18);
  assert.deepEqual(items(), [b, b, b]);
  game.activateWand();
  flush();
  assert.deepEqual(items(), [b, b, b]);
  game.activateWand();
  assert.deepEqual(items(), []);
});

test('shuffle preserves all 63 front items and leaves hidden layers alone', () => {
  const { game, board, items } = fixture();
  const slots = Array.from({ length: 21 }, (_, i) => slot(keys.slice(i, i + 3), [keys[i + 23]]));
  game.cabinetData = slots.slice(0, 9);
  game.conveyorRows = [slots.slice(9, 13), slots.slice(13, 17), slots.slice(17)];
  const before = items().sort();
  const fronts = slots.map(({ layers }) => layers[0].join());
  game.activateShuffle();
  assert.deepEqual(items().sort(), before);
  assert.ok(board().every(({ layers }) => layers[0].length === 3));
  assert.notDeepEqual(board().map(({ layers }) => layers[0].join()), fronts);
  assert.deepEqual(board().map(({ layers }) => layers[1][0]), keys.slice(23, 44));
});

test('a pending match is scored once and cannot be split by rapid moves or tools', () => {
  const { game, items, clickHammer, flush, queued } = fixture();
  game.cabinetData = [slot([a, a, a], [b]), slot([b]), slot([b]), slot()];
  assert.equal(game.checkMatches(), true);
  assert.equal(game.checkMatches(), false);
  assert.equal(game.moveItem(cabinet(0), cabinet(3)), false);
  clickHammer(a);
  game.activateWand();
  game.activateShuffle();
  assert.equal(game.propCounts.hammer, 19);
  assert.equal(game.propCounts.wand, 41);
  assert.equal(game.score, 100);
  assert.equal(queued.length, 1);
  flush();
  assert.deepEqual(items().sort(), [b, b, b]);
});

test('callbacks from the previous board cannot clear or modify a restarted board', () => {
  const { game, items, clickHammer, flush } = fixture();
  game.cabinetData = [slot([a, a, a]), slot([b]), slot([b, b])];
  game.checkMatches();
  clickHammer(b, 1);
  game.cabinetData = [slot([c]), slot([c]), slot([c]), slot()];
  flush();
  assert.deepEqual(items(), [c, c, c]);
});

test('all difficulties retain complete triplets across 90 consecutive rounds with tools', () => {
  const { game, items, board, clickHammer, flush } = fixture();
  const countItems = () => {
    const counts = new Map();
    for (const key of items()) counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  };
  for (let round = 0; round < 90; round++) {
    const level = round % 3 + 1;
    game.initLevelWithVerification(level);
    assert.equal(countItems().size, [36, 46, 56][level - 1]);
    assert.ok([...countItems().values()].every(count => count === 3));
    assert.ok(board().every(({ layers }) => layers.every(layer => layer.length <= 3)));

    game.propCounts = { hammer: 1, wand: 1 };
    game.activateShuffle();
    const hammerSlot = game.cabinetData.findIndex(({ layers, animating }) => layers[0].length && !animating);
    assert.ok(hammerSlot !== -1);
    clickHammer(game.cabinetData[hammerSlot].layers[0][0], hammerSlot);
    game.activateWand();
    flush();
    assert.equal(game.propCounts.hammer, 0);
    assert.equal(game.propCounts.wand, 0);
    assert.ok([...countItems().values()].every(count => count === 3), `round ${round + 1}`);
  }
});

test('an unsolvable deal is replaced, and the replacement can be cleared through legal moves', () => {
  const { game, items, board, flush } = fixture();
  const generate = game.generateLevelData.bind(game);
  let fallbacks = 0;
  game.generateLevelData = (level, useGuaranteedDeal) => {
    if (useGuaranteedDeal) {
      fallbacks++;
      generate(level, true);
    } else {
      game.cabinetData = [slot([a, b, c]), slot([a, b, c]), slot([a, b, c])];
      game.conveyorRows = [];
    }
  };
  game.initLevelWithVerification(3);
  assert.equal(fallbacks, 1);
  assert.equal(items().length, 168);
  const locations = [
    ...game.cabinetData.map((_, index) => cabinet(index)),
    ...game.conveyorRows.flatMap((row, rowIndex) => row.map((_, shelfIndex) =>
      ({ type: 'conveyor', rowIndex, shelfIndex })))
  ];
  for (let cleared = 0; cleared < 56; cleared++) {
    const front = board().flatMap(({ layers }, index) => [...layers[0]].map((key, itemIndex) =>
      ({ key, itemIndex, location: locations[index] })));
    const key = front.find(item => front.filter(other => other.key === item.key).length === 3)?.key;
    assert.ok(key);
    for (const { itemIndex, location } of front.filter(item => item.key === key)) {
      assert.ok(game.moveItem({ ...location, itemIndex }, cabinet(2)));
    }
    flush();
  }
  assert.deepEqual(items(), []);
});

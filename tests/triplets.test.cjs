const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8').replace(
  "  window.addEventListener('DOMContentLoaded', () => {",
  "  window.TestGame = GoodsOrganizerGame; sound.muted = true;\n  window.addEventListener('DOMContentLoaded', () => {"
);
const catalog = require('../assets/items/items_data.json');
const keys = Object.keys(catalog);
const [a, b, c] = keys;
const slot = (front = [], back = [], deep = [], deepest = []) => ({ layers: [front, back, deep, deepest] });
const cabinet = (slotIndex, itemIndex = 0) => ({ type: 'cabinet', slotIndex, itemIndex });
const conveyor = (rowIndex, shelfIndex, itemIndex = 0) => ({ type: 'conveyor', rowIndex, shelfIndex, itemIndex });

function assertDifferentShelfGroups(board) {
  const groups = board.flatMap(({ layers }) => layers.filter(layer => layer.length >= 2).map(layer =>
    [...layer].sort().join('|')));
  assert.equal(new Set(groups).size, groups.length);
}

function fixture() {
  const window = { addEventListener() {} };
  const queued = [];
  const element = {
    classList: { add() {}, remove() {} },
    setAttribute() {},
    style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 120, height: 100 })
  };
  const document = {
    body: element,
    getElementById: id => id.startsWith('conveyor-track-') ? null : element,
    querySelectorAll: () => []
  };
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

test('three lookalike bags clear when moved from the conveyor onto one shelf', () => {
  const { game, items, flush } = fixture();
  const orange = 'item_872';
  const alternateOrange = 'item_991';
  const red = 'item_873';
  game.cabinetData = [slot([orange, alternateOrange, red])];
  assert.equal(game.checkMatches(), false);
  game.conveyorRows = [[slot([alternateOrange]), slot([orange]), slot([orange])]];

  assert.ok(game.moveItem(conveyor(0, 1), conveyor(0, 0)));
  assert.ok(game.moveItem(conveyor(0, 2), conveyor(0, 0)));
  flush();

  assert.deepEqual(items(), [orange, alternateOrange, red]);
  assert.equal(game.score, 100);
});

test('the coffee carton and fridge can both be matched across three conveyor rows', () => {
  const { game, items, flush } = fixture();
  const carton = 'item_779';
  const fridge = 'item_840';
  game.conveyorRows = [[slot([carton, fridge])], [slot([fridge, carton])], [slot([carton, fridge]), slot()]];

  for (const location of [conveyor(0, 0), conveyor(1, 0, 1), conveyor(2, 0)]) {
    assert.ok(game.moveItem(location, conveyor(2, 1)));
  }
  flush();
  assert.deepEqual(items(), [fridge, fridge, fridge]);
  for (const row of [0, 1, 2]) assert.ok(game.moveItem(conveyor(row, 0), conveyor(2, 1)));
  flush();
  assert.deepEqual(items(), []);
});

test('wand and hammer both count alternate crops as part of the same triplet', () => {
  const orange = 'item_872';
  const alternateOrange = 'item_991';
  for (const tool of ['wand', 'hammer']) {
    const { game, items, clickHammer, flush } = fixture();
    game.cabinetData = [slot([orange], [alternateOrange]), slot([a])];
    game.conveyorRows = [[slot([a], [orange, a])]];
    if (tool === 'wand') game.activateWand();
    else clickHammer(orange);
    flush();
    assert.deepEqual(items(), [a, a, a]);
  }
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
    assert.equal(countItems().size, [18, 46, 72][level - 1]);
    assert.ok([...countItems().values()].every(count => count === 3));
    const types = [...countItems().keys()].map(key => `${catalog[key].archetype}:${catalog[key].colorGroup}`);
    assert.equal(new Set(types).size, types.length);
    assertDifferentShelfGroups(board());
    assert.ok(board().every(({ layers }) => layers.every(layer => layer.length <= 3)));
    assert.equal(Math.max(...board().map(({ layers }) => layers.filter(layer => layer.length).length)),
      [2, 4, 6][level - 1]);
    if (level === 3) {
      const fronts = board().flatMap(({ layers }) => [...layers[0]]);
      const exposedTriplets = [...new Set(fronts)].filter(key => fronts.filter(item => item === key).length === 3);
      assert.ok(exposedTriplets.length < 11, 'master deals expose fewer triplets than easy deals');
    }

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

test('a deal with repeated combinations is replaced by a varied deal that clears through legal moves', () => {
  const { game, items, board, flush } = fixture();
  const generate = game.generateLevelData.bind(game);
  let fallbacks = 0;
  game.generateLevelData = (level, useGuaranteedDeal) => {
    if (useGuaranteedDeal) {
      fallbacks++;
      generate(level, true);
    } else {
      game.cabinetData = [slot([a, b, c]), slot([c, b, a]), slot([b, a, c]), slot()];
      game.conveyorRows = [];
    }
  };
  game.initLevelWithVerification(2);
  assert.equal(fallbacks, 1);
  assert.equal(items().length, 138);
  assertDifferentShelfGroups(board());
  const locations = [
    ...game.cabinetData.map((_, index) => cabinet(index)),
    ...game.conveyorRows.flatMap((row, rowIndex) => row.map((_, shelfIndex) =>
      ({ type: 'conveyor', rowIndex, shelfIndex })))
  ];
  for (let cleared = 0; cleared < 46; cleared++) {
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

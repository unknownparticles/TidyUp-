const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8').replace(
  "  window.addEventListener('DOMContentLoaded', () => {",
  "  window.TestGame = GoodsOrganizerGame;\n  window.addEventListener('DOMContentLoaded', () => {"
);

for (const [name, width, cabinetHeight, rowHeight] of [
  ['compact phone', 308, 210, 80],
  ['tablet', 648, 380, 128],
  ['short screen', 260, 180, 52]
]) {
  test(`${name}: three item positions fit the plank, with room for its wooden edge`, () => {
    const css = {};
    const container = { clientWidth: width, style: { setProperty: (key, value) => { css[key] = value; } } };
    const document = {
      getElementById: () => container,
      querySelector: selector => ({
        '.cabinet-wrapper': { clientWidth: width, clientHeight: cabinetHeight },
        '.conveyor-track': { clientWidth: width },
        '.conveyor-row-wrapper': { clientHeight: rowHeight }
      })[selector]
    };
    const window = { addEventListener() {} };
    vm.runInNewContext(source, { window, document, console });
    const game = Object.create(window.TestGame.prototype);
    game.dragGhost = { style: { setProperty(key, value) { this[key] = value; } } };
    game.conveyorSectionEl = { clientWidth: width, clientHeight: rowHeight * 3 + 6 };
    game.conveyorRows = [];
    game.updateLayoutMetrics();
    const itemWidth = parseFloat(css['--item-w']);
    const itemHeight = parseFloat(css['--item-h']);
    const plankWidth = parseFloat(css['--plank-w']);
    assert.equal(plankWidth, itemWidth * 3 - 2 + 4);
    assert.ok(itemHeight + plankWidth * 23 / 228 + 8 <= rowHeight);
    const cellHeight = (cabinetHeight * 0.934 - width * 0.061) / 3;
    assert.ok(itemHeight <= cellHeight - 8);
    assert.ok(itemHeight / (cellHeight - 8) > 0.7);
    assert.ok(game.conveyorMetrics.totalSpan - game.conveyorMetrics.pitch >= width + 8);
    assert.equal(game.dragGhost.style.width, css['--item-w']);
    assert.equal(game.dragGhost.style.height, css['--item-h']);
    assert.equal(game.dragGhost.style['--item-w'], css['--item-w']);
    assert.equal(game.dragGhost.style['--item-h'], css['--item-h']);
  });
}

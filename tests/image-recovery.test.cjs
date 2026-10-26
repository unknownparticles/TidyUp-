const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function fixture() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const start = source.indexOf('  function setupImageRecovery()');
  const end = source.indexOf('  // 2. Web Audio', start);
  const handlers = {}, timers = [];
  const document = { baseURI: 'https://example.test/TidyUp-/', addEventListener: (type, handler) => { handlers[type] = handler; } };
  vm.runInNewContext(source.slice(start, end) + '\nsetupImageRecovery();', {
    document, window: { addEventListener: (type, handler) => { handlers[type] = handler; } },
    URL, setTimeout: (callback, delay) => { timers.push({ callback, delay }); return timers.length; }
  });
  const image = { tagName: 'IMG', src: document.baseURI + 'assets/items/photos/item_810.webp?v=abcdef123456', isConnected: true, hasAttribute: name => name === 'data-item-image' };
  return { handlers, timers, image };
}

test('dynamic images retry twice with backoff and retain the content revision', () => {
  const { handlers, timers, image } = fixture();
  handlers.error({ target: image });
  handlers.error({ target: image });
  assert.equal(timers.length, 1);
  assert.equal(timers[0].delay, 500);
  timers[0].callback();
  assert.equal(new URL(image.src).searchParams.get('v'), 'abcdef123456');
  assert.equal(new URL(image.src).searchParams.get('_image_retry'), '1');
  assert.equal(image.loading, 'eager');
  handlers.error({ target: image });
  assert.equal(timers[1].delay, 1000);
  timers[1].callback();
  handlers.error({ target: image });
  assert.equal(timers.length, 2);
  handlers.online();
  assert.equal(timers.length, 3);
});

test('successful and detached images are not retried when connectivity returns', () => {
  for (const detached of [false, true]) {
    const { handlers, timers, image } = fixture();
    handlers.error({ target: image });
    timers[0].callback();
    if (detached) image.isConnected = false;
    else handlers.load({ target: image });
    handlers.online();
    assert.equal(timers.length, 1);
  }
});

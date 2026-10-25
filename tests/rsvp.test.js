const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const start = source.indexOf('  (function initRsvp() {');
const end = source.indexOf('  /* ============ 12a. Share', start);
const section = source.slice(start, end);

function setup({ fetchImpl, endpoint = 'https://example.test/rsvp' } = {}) {
  const elements = new Map();
  function element(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      value: '', textContent: '', checked: false, hidden: false, style: {},
      classList: { add() {}, remove() {} }, listeners: {},
      addEventListener(event, handler) { this.listeners[event] = handler; },
      focus() {}, querySelector() { return { value: 'yes' }; },
    });
    return elements.get(selector);
  }
  const opened = [];
  const blankWindow = { location: { href: '' }, close() { this.closed = true; } };
  const form = element('#rsvpForm');
  element('.rsvp');
  element('#rsvpDone');
  element('#rsvpName').value = 'Nusrat Ahmed';
  element('#rsvpGuests').value = '3';
  const context = {
    $: element,
    $$: () => [],
    cfg: {
      couple: { name1: 'Ayan', name2: 'Mim' },
      events: [],
      rsvp: { enabled: true, endpoint, whatsapp: '8801712345678', successNote: 'Thank you' },
    },
    c: { couple: { name1: 'Ayan', name2: 'Mim' }, rsvp: { successNote: 'Thank you' } },
    t: {
      nameSep: '&', waTitle: 'RSVP', waName: 'Name', joyfullyYes: 'Joyfully, yes',
      regretfullyNo: 'Regretfully, no', waEvents: 'Events', waMessage: 'Message',
      guestWord: 'guest', guestsWord: 'guests', rsvpWaOpened: 'WhatsApp opened',
      rsvpError: 'Could not send',
    },
    lang: 'en', L: String, esc: String,
    langHooks: [],
    window: { open(...args) { opened.push(args); return blankWindow; } },
    fetch: fetchImpl,
  };
  vm.runInNewContext(section, context);
  return {
    elements, opened, blankWindow,
    submit() { form.listeners.submit({ preventDefault() {} }); },
  };
}

test('endpoint failure falls back through a WhatsApp window opened during submit', async () => {
  const page = setup({ fetchImpl: async () => { throw new Error('offline'); } });
  page.submit();

  assert.equal(page.opened.length, 1);
  assert.equal(page.opened[0][0], '');
  await new Promise(resolve => setImmediate(resolve));

  const url = new URL(page.blankWindow.location.href);
  assert.equal(url.origin + url.pathname, 'https://wa.me/8801712345678');
  assert.match(url.searchParams.get('text'), /Name: Nusrat Ahmed/);
  assert.equal(page.blankWindow.closed, undefined);
});

test('successful endpoint delivery closes the unused WhatsApp fallback window', async () => {
  const page = setup({ fetchImpl: async () => ({ ok: true, status: 204 }) });
  page.submit();
  await new Promise(resolve => setImmediate(resolve));

  assert.equal(page.opened.length, 1);
  assert.equal(page.blankWindow.closed, true);
  assert.equal(page.elements.get('#rsvpDone').hidden, false);
});

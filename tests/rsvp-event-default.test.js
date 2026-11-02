const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

test('first RSVP event checkbox is checked by default', () => {
  assert.match(source, /i === 0 \? "checked" : ""/);
});

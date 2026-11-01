const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

test('Bangla eyebrow and scroll labels are four pixels larger', () => {
  assert.match(styles, /html\[lang="bn"\] \.eyebrow\s*\{[^}]*font-size:\s*14\.5px/s);
  assert.match(styles, /html\[lang="bn"\] \.hero__scroll span\s*\{[^}]*font-size:\s*13\.5px/s);
});

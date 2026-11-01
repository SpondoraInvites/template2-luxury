const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

test('Bangla mode removes Latin-style letter tracking from text', () => {
  assert.match(styles, /html\[lang="bn"\] \*\s*\{[^}]*letter-spacing:\s*normal/s);
});

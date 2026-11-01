const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

test('language toggle is hidden while the lightbox is open', () => {
  assert.match(script, /document\.body\.classList\.add\("lightbox-open"\)/);
  assert.match(script, /document\.body\.classList\.remove\("lightbox-open"\)/);
  assert.match(styles, /body\.lightbox-open\s+#langToggle\s*\{[^}]*visibility:\s*hidden/s);
});

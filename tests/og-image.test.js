const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('social metadata points to the generated deployed OG image', () => {
  const image = 'https://template2-luxury.spondorainvites.com/assets/og-image.jpg';
  assert.ok(html.includes(`<meta property="og:image" content="${image}"`));
  assert.ok(html.includes(`<meta name="twitter:image" content="${image}"`));
  assert.ok(fs.existsSync(path.join(root, 'tools', 'generate-og-image.mjs')));
});

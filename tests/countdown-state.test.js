const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

test('countdown switches to localized Today/Married states on venue-local calendar days', () => {
  assert.match(script, /today:\s*"Today"/);
  assert.match(script, /married:\s*"Married"/);
  assert.match(script, /today:\s*"আজ"/);
  assert.match(script, /married:\s*"বিবাহিত"/);
  assert.match(script, /dayKey\(now\) === dayKey\(target\)/);
  assert.match(html, /data-countdown-status[^>]*hidden/);
  assert.match(styles, /\.countdown__status\s*\{/);
});

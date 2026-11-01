const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

test('small Bangla labels use four-pixel larger type', () => {
  for (const [selector, size] of [
    ['.hero__place', '15px'],
    ['.row dt', '12.5px'],
    ['.gallery__hint', '15px'],
    ['.custom__quote-source', '13.5px'],
    ['.c-card__kicker', '12.5px'],
    ['.field__label', '13px'],
    ['.field__optional', '12px'],
    ['.intro__eyebrow', '13.5px'],
  ]) {
    const start = styles.indexOf(`html[lang="bn"] ${selector} {`);
    assert.notEqual(start, -1, `Bangla override exists for ${selector}`);
    const rule = styles.slice(start, styles.indexOf('}', start));
    assert.ok(rule.includes(`font-size: ${size}`), `${selector} uses ${size}`);
  }
});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'config.js'), 'utf8');
const config = vm.runInNewContext(`${source}\nINVITE_CONFIG`);

test('Bangla custom sections include the Quran quote', () => {
  const quote = config.bn.customSections.find(section => section.layout === 'quote');
  assert.ok(quote, 'Bangla quote section is present');
  assert.ok(quote.quote, 'Bangla quote text is present');
  assert.match(quote.source, /৩০:২১/);
});

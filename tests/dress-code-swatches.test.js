const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'config.js'), 'utf8');
const config = vm.runInNewContext(`${source}\nINVITE_CONFIG`);

test('Bangla dress-code cards retain their English palette swatches', () => {
  const palettes = config.customSections.find(section => section.layout === 'cards').cards.map(card => card.swatches);
  const banglaPalettes = config.bn.customSections.find(section => section.layout === 'cards').cards.map(card => card.swatches);
  assert.deepEqual(banglaPalettes, palettes);
});

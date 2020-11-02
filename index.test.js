const sampleIndex = require('./index');

test('sample test', () => {
  expect(() => sampleIndex('test')).toMatch(/img/);
});
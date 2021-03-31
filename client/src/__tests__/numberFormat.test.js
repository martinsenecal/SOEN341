const formatNumber = require('../utils/numberFormat');

test('testing format number for < 1000', () => {
  expect(formatNumber(10)).toBe(10);
});
test('testing format number for >= 1000', () => {
  expect(formatNumber(1548)).toBe('1.5k ');
});

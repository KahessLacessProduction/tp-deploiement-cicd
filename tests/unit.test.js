const { add } = require('../src/math');

describe('Unit Tests: Math functions', () => {
  test('add(1, 2) should return 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('add(-1, 1) should return 0', () => {
    expect(add(-1, 1)).toBe(0);
  });
});

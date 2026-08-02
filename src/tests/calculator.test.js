const { add, subtract, multiply, divide, toNumber } = require('../calculator');

describe('Calculator operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('division by zero');
  });

  test('toNumber parses valid numbers', () => {
    expect(toNumber('3.14')).toBeCloseTo(3.14);
  });

  test('toNumber returns null for invalid input', () => {
    expect(toNumber('abc')).toBeNull();
  });

  // Additional edge cases
  test('addition with floats', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.30000000000000004);
  });

  test('subtract negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('multiply by zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });
});
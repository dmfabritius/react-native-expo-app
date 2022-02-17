import { degrees2cardinal } from './degrees2cardinal';

describe('Function degrees2cardinal()', () => {
  it('Handle missing data', () => {
    expect(degrees2cardinal(undefined)).toBe('NO DATA');
    expect(degrees2cardinal(null)).toBe('NO DATA');
  });
  it('Handle primary cardinal directions', () => {
    expect(degrees2cardinal(0)).toBe('North');
    expect(degrees2cardinal(90)).toBe('East');
    expect(degrees2cardinal(180)).toBe('South');
    expect(degrees2cardinal(270)).toBe('West');
  });
});

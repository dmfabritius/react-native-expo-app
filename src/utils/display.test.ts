import { display } from './display';

describe('Function display()', () => {
  it('Handle missing data', () => {
    expect(display(undefined)).toBe('NO DATA');
    expect(display(null)).toBe('NO DATA');
  });
  it('Display data', () => {
    expect(display(0)).toBe('0.00 ');
    expect(display(0, 'units')).toBe('0.00 units');
  });
});

import { getBatteryIcon } from './getBatteryIcon';

describe('Function getBatteryIcon()', () => {
  it('Handle missing data', () => {
    expect(getBatteryIcon(undefined)).toBeTruthy();
    expect(getBatteryIcon(null)).toBeTruthy();
  });
  it('Provide icon', () => {
    expect(getBatteryIcon(-15)).toBeTruthy();
    expect(getBatteryIcon(0)).toBeTruthy();
    expect(getBatteryIcon(1)).toBeTruthy();
    expect(getBatteryIcon(2)).toBeTruthy();
    expect(getBatteryIcon(3)).toBeTruthy();
    expect(getBatteryIcon(4)).toBeTruthy();
    expect(getBatteryIcon(5)).toBeTruthy();
    expect(getBatteryIcon(6)).toBeTruthy();
    expect(getBatteryIcon(7)).toBeTruthy();
    expect(getBatteryIcon(8)).toBeTruthy();
    expect(getBatteryIcon(9)).toBeTruthy();
    expect(getBatteryIcon(10)).toBeTruthy();
    expect(getBatteryIcon(11)).toBeTruthy();
    expect(getBatteryIcon(12)).toBeTruthy();
    expect(getBatteryIcon(13)).toBeTruthy();
    expect(getBatteryIcon(14)).toBeTruthy();
    expect(getBatteryIcon(15)).toBeTruthy();
  });
});

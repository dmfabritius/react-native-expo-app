/**
 * Convert compass heading in degrees to one of the 16 cardinal directions.
 *
 * @param      {Number}  value     The direction in degrees
 * @return     {String}            The cardinal direction
 */
export const degrees2cardinal = (value: number): string => {
  if (value === undefined || value === null) return 'NO DATA';
  value = (value + 360) % 360;
  const i = Math.floor(value / 22.5 + 0.5);
  return cardinals[i];
};

const cardinals = [
  'North', // between 349 and 11 degrees
  'NNE',
  'NE',
  'ENE',
  'East',
  'ESE',
  'SE',
  'SSE',
  'South',
  'SSW',
  'SW',
  'WSW',
  'West',
  'WNW',
  'NW',
  'NNW',
  'North',
];

/**
 * Display a data value rounded to 1 decimal digit followed by
 * an optional units label, or 'NO DATA' if data is undefined.
 *
 * @param      {number | undefined}  data         The data value
 * @param      {string}              [units='']   Optional units label
 * @return     {string}                           Display string
 */
export const display = (data: number | undefined, units = ''): string =>
  data || data === 0 ? `${data.toFixed(1)} ${units}` : 'NO DATA';

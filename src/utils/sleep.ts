/**
 * Promise to sleep for a given number of milliseconds.
 * Use with async/await or sleep(ms).then(() => {...code to execute after sleep delay})
 *
 * @param      {Number}  ms     Milliseconds
 * @return     {Number}         Promise
 */
export const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Don't Mock Fetch (or Axios): Use Mock Service Worker and Test Like a User
  https://www.youtube.com/watch?v=v77fjkKQTH0

  Mock Service Worker library
  https://mswjs.io/docs/getting-started
*/
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export { rest, server };

const server = setupServer(
  rest.get('*', (req, res, ctx) => {
    console.log(`\n\n!!!!\n*** GET: WARNING *** ==>> Missing MSW handler\n!!!!\n\n${req.url.toString()}`);
    return res(ctx.status(555));
  }),
  rest.post('*', (req, res, ctx) => {
    console.log(`\n\n!!!!\n*** POST: WARNING *** ==>> Missing MSW handler\n!!!!\n\n${req.url.toString()}`);
    return res(ctx.status(555));
  }),
  rest.put('*', (req, res, ctx) => {
    console.log(`\n\n!!!!\n*** PUT: WARNING *** ==>> Missing MSW handler\n!!!!\n\n${req.url.toString()}`);
    return res(ctx.status(555));
  }),
  rest.delete('*', (req, res, ctx) => {
    console.log(`\n\n!!!!\n*** DELETE: WARNING *** ==>> Missing MSW handler\n!!!!\n\n${req.url.toString()}`);
    return res(ctx.status(555));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

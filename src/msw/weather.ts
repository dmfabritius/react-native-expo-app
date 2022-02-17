import { rest } from 'msw';

export { branches, branches_unavailable, summary, current };

const branches = rest.get('*/weather-branch/all', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ branches: [{ id: 1 }] }));
});

const branches_unavailable = rest.get('*/weather-branch/all', (_, res) => {
  return res.networkError('Network error');
});

const summary = rest.get('*/weather/summary', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ weather: [{ weatherBranchId: 1 }] }));
});

const current = rest.get('*/weather/current', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      weather: [
        {
          weatherCodeType: 'CLEAR',
          weatherBranchId: 1,
        },
      ],
    }),
  );
});

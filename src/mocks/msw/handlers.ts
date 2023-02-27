import { rest } from 'msw';

import { fakeFilterConfig } from '~/features/filters/testutils';

export const handlers = [
  // GET jobs filter config
  rest.get('http://localhost:3000/jobs/filters', async (_req, res, ctx) => {
    // Artificial delay
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((r) => setTimeout(r, 1000));

    return res(ctx.status(200), ctx.json(fakeFilterConfig()));
  }),
];

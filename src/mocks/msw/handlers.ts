import { rest } from 'msw';

import { fakeFilterConfig } from '~/features/filters/testutils';
import { API_MW_URL } from '~/shared/core/constants';

export const handlers = [
  // // GET jobs filter config
  // rest.get(`${API_MW_URL}/jobs/filters`, async (_req, res, ctx) => {
  //   // Artificial delay
  //   // eslint-disable-next-line no-promise-executor-return
  //   await new Promise((r) => setTimeout(r, 1000));
  //   return res(ctx.status(200), ctx.json(fakeFilterConfig()));
  // }),
];

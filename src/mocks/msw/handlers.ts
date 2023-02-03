import { rest } from 'msw';

import { fakeJobListings } from '../faker/fake-job-listing';
import { fakeOrgListings } from '../faker/fake-org-listings';
import { fakeProjectListings } from '../faker/fake-project-listings';

export const handlers = [
  // GET jobs listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/jobs',
    async (_req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      return res(
        ctx.status(200),
        ctx.json({
          listings: fakeJobListings(),
        }),
      );
    },
  ),

  // GET org listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/orgs',
    async (_req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      return res(
        ctx.status(200),
        ctx.json({
          listings: fakeOrgListings(),
        }),
      );
    },
  ),

  // GET project listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/projects',
    async (_req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      return res(
        ctx.status(200),
        ctx.json({
          listings: fakeProjectListings(),
        }),
      );
    },
  ),
];

import { rest } from 'msw';

import { fakeJobListings } from '../fakers/fake-job-listing';
import { fakeOrgListings } from '../fakers/fake-org-listing';
import { fakeProjectListings } from '../fakers/fake-project-listing';
import { fakeRepoListings } from '../fakers/fake-repo-listing';

export const handlers = [
  // GET jobs listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/jobs',
    async (req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      const cursor = Number(req.url.searchParams.get('cursor'));

      // Limit only to 10 fetches
      const maxCursor = 10;

      return res(
        ctx.status(200),
        ctx.json({
          nextCursor: cursor < maxCursor ? cursor + 1 : undefined,
          listings: cursor < maxCursor ? fakeJobListings() : [],
        }),
      );
    },
  ),

  // GET org listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/orgs',
    async (req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      const cursor = Number(req.url.searchParams.get('cursor'));

      // Limit only to 10 fetches
      const maxCursor = 10;

      return res(
        ctx.status(200),
        ctx.json({
          nextCursor: cursor < maxCursor ? cursor + 1 : undefined,
          listings: cursor < maxCursor ? fakeOrgListings() : [],
        }),
      );
    },
  ),

  // GET project listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/projects',
    async (req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      const cursor = Number(req.url.searchParams.get('cursor'));

      // Limit only to 10 fetches
      const maxCursor = 10;

      return res(
        ctx.status(200),
        ctx.json({
          nextCursor: cursor < maxCursor ? cursor + 1 : undefined,
          listings: cursor < maxCursor ? fakeProjectListings() : [],
        }),
      );
    },
  ),

  // GET repo listings
  rest.get(
    'http://localhost:3000/mocked-bff/listings/repos',
    async (req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      const cursor = Number(req.url.searchParams.get('cursor'));

      // Limit only to 10 fetches
      const maxCursor = 10;

      return res(
        ctx.status(200),
        ctx.json({
          nextCursor: cursor < maxCursor ? cursor + 1 : undefined,
          listings: cursor < maxCursor ? fakeRepoListings() : [],
        }),
      );
    },
  ),
];

import { rest } from 'msw';

import { sampleFilterConfig } from '~/features/filters/testutils';

import { fakeJobPosts } from '../fakers/fake-job-post';
import { fakeOrgPosts } from '../fakers/fake-org-post';
import { fakeProjectPosts } from '../fakers/fake-project-post';
import { fakeRepoPosts } from '../fakers/fake-repo-post';

export const handlers = [
  // GET jobs posts
  rest.get(
    'http://localhost:3000/mocked-bff/posts/jobs',
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
          posts: cursor < maxCursor ? fakeJobPosts() : [],
        }),
      );
    },
  ),

  // GET org posts
  rest.get(
    'http://localhost:3000/mocked-bff/posts/orgs',
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
          posts: cursor < maxCursor ? fakeOrgPosts() : [],
        }),
      );
    },
  ),

  // GET project posts
  rest.get(
    'http://localhost:3000/mocked-bff/posts/projects',
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
          posts: cursor < maxCursor ? fakeProjectPosts() : [],
        }),
      );
    },
  ),

  // GET repo posts
  rest.get(
    'http://localhost:3000/mocked-bff/posts/repos',
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
          posts: cursor < maxCursor ? fakeRepoPosts() : [],
        }),
      );
    },
  ),

  // GET jobs filter config
  rest.get(
    'http://localhost:3000/jobs/filter-config',
    async (req, res, ctx) => {
      // Artificial delay
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 1000));

      return res(ctx.status(200), ctx.json(sampleFilterConfig));
    },
  ),
];

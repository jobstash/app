import { graphql } from 'msw';

import type { JobListingsQuery } from '~/core/interfaces';

import { mockedCompanies } from './data/mocked-companies';
import { mockedJobs } from './data/mocked-jobs';

export const handlers = [
  // Capture JobListings query
  graphql.query<JobListingsQuery>('JobListings', (req, res, ctx) =>
    res(
      ctx.data({
        totalCount: 331,
        jobs: mockedJobs,
        companies: mockedCompanies,
      }),
    ),
  ),
];

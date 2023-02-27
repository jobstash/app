import { useInfiniteQuery } from '@tanstack/react-query';

import {
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import type { JobPost } from '~/shared/core/interfaces';
import { sentryMessage } from '~/shared/utils';

const SENTRY_LABEL = `fetchJobListings`;

const fetchJobListings = async ({
  pageParam = 0,
}): Promise<JobListingsInfQueryPage> => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/jobs?cursor=${pageParam}`,
  );

  // Query to mw should work - 500 otherwise
  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: JobListingsInfQueryPage;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};

interface JobListingsInfQueryPage {
  nextCursor: number;
  posts: JobPost[];
}

export const useJobListingInfQuery = () =>
  useInfiniteQuery<JobListingsInfQueryPage>(['job-posts'], fetchJobListings, {
    getNextPageParam: (page) => page.nextCursor,
  });

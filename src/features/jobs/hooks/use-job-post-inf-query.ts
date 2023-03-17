import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import {
  ERR_INTERNAL,
  NEXT_PUBLIC_MW_URL,
  NEXT_PUBLIC_PAGE_SIZE,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

import type { JobPost } from '../core/interfaces';

interface FetchJobOptions {
  pageParam?: number;
  queryKey: QueryKey;
}

const SENTRY_LABEL = `fetchJobListings`;
const fetchJobListings = async ({
  pageParam = 1,
  queryKey,
}: FetchJobOptions): Promise<JobListingsInfQueryPage> => {
  const filterParams = queryKey[1] as string | null;

  const mwURL = NEXT_PUBLIC_MW_URL;
  const limit = NEXT_PUBLIC_PAGE_SIZE ?? 10;

  const res = await fetch(
    `${mwURL}/jobs/list?page=${pageParam}&limit=${limit}${
      filterParams ? `&${filterParams}` : ''
    }`,
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
  page: number;
  count: number;
  total: number;
  data: JobPost[];
}

export const useJobListingInfQuery = (filterParams: string | null) =>
  useInfiniteQuery<JobListingsInfQueryPage>(
    ['job-posts', filterParams],
    async ({ pageParam, queryKey }) =>
      fetchJobListings({ pageParam, queryKey }),
    {
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    },
  );

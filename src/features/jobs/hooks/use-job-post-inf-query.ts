import { useInfiniteQuery } from '@tanstack/react-query';

import { API_MW_AUTH_TOKEN, API_MW_URL } from '~/shared/core/constants';
import {
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

import { JobPost } from '../core/interfaces';

const SENTRY_LABEL = `fetchJobListings`;
const fetchJobListings = async ({
  pageParam = 0,
}): Promise<JobListingsInfQueryPage> => {
  const res = await fetch(
    `${API_MW_URL}/jobs/list?page=${pageParam}?limit=10`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${API_MW_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
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
  data: JobPost[];
}

export const useJobListingInfQuery = () =>
  useInfiniteQuery<JobListingsInfQueryPage>(['job-posts'], fetchJobListings, {
    getNextPageParam: ({ page }) => page,
  });

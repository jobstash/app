import { useInfiniteQuery } from '@tanstack/react-query';

import type { OrgPost } from '~/core/interfaces';
import {
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

const SENTRY_LABEL = `fetchOrgListings`;

const fetchOrgListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/orgs?cursor=${pageParam}`,
  );

  // Query to mw should work - 500 otherwise
  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: OrgListingsInfQueryPage;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};

interface OrgListingsInfQueryPage {
  nextCursor: number;
  posts: OrgPost[];
}

export const useOrgPostInfQuery = () =>
  useInfiniteQuery<OrgListingsInfQueryPage>(['org-posts'], fetchOrgListings, {
    getNextPageParam: (page) => page.nextCursor,
  });

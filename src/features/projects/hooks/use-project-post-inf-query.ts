import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProjectPost } from '~/core/interfaces';
import {
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

const SENTRY_LABEL = `fetchProjectListings`;

const fetchProjectListings = async ({
  pageParam = 0,
}): Promise<ProjectListingsInfQueryPage> => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/projects?cursor=${pageParam}`,
  );

  // Query to mw should work - 500 otherwise
  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: ProjectListingsInfQueryPage;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};

interface ProjectListingsInfQueryPage {
  nextCursor: number;
  posts: ProjectPost[];
}

export const useProjectPostInfQuery = () =>
  useInfiniteQuery<ProjectListingsInfQueryPage>(
    ['project-posts'],
    fetchProjectListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );

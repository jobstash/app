import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { JobListQueryPage } from '@jobstash/jobs/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobList } from '@jobstash/jobs/data';

export const useOrgJobListQuery = (slug: string) => {
  const { mwVersion } = useMwVersionContext();

  return useInfiniteQuery<
    JobListQueryPage,
    Error,
    InfiniteData<JobListQueryPage, number>,
    [string | null, string, string],
    number
  >({
    queryKey: [mwVersion, 'org-job-list', slug],
    queryFn: async ({ pageParam }) =>
      getJobList({ page: pageParam, filterParams: { organizations: slug } }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
  });
};

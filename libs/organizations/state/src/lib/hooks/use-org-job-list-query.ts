import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { OrgJobListQueryPage } from '@jobstash/organizations/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgJobList } from '@jobstash/organizations/data';

export const useOrgJobListQuery = (orgId: string) => {
  const { mwVersion } = useMwVersionContext();

  return useInfiniteQuery<
    OrgJobListQueryPage,
    Error,
    InfiniteData<OrgJobListQueryPage, number>,
    [string | null, string, string],
    number
  >({
    queryKey: [mwVersion, 'org-job-list', orgId],
    queryFn: async ({ pageParam }) =>
      getOrgJobList({ page: pageParam, id: orgId }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
  });
};

import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { OrgListQueryPage } from '@jobstash/organizations/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgList } from '@jobstash/organizations/data';

export const useOrgListQuery = () => {
  const router = useRouter();
  const { mwVersion } = useMwVersionContext();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<
    OrgListQueryPage,
    Error,
    InfiniteData<OrgListQueryPage, number>,
    [string | null, string, Record<string, string>],
    number
  >({
    queryKey: [mwVersion, 'org-list', filterParamsObj],
    queryFn: async ({ pageParam }) =>
      getOrgList({ page: pageParam, filterParams: filterParamsObj }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
  });
};

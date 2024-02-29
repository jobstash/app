import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { OrgListQueryPage } from '@jobstash/organizations/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getOrgList } from '@jobstash/organizations/data';

export const useOrgListQuery = () => {
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<
    OrgListQueryPage,
    Error,
    InfiniteData<OrgListQueryPage, number>,
    [string, Record<string, string>],
    number
  >({
    queryKey: ['org-list', filterParamsObj],
    queryFn: async ({ pageParam }) => getOrgList(pageParam, filterParamsObj),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
  });
};

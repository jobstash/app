import { useRouter } from 'next/router';

import { useInfiniteQuery } from '@tanstack/react-query';

import { OrgListQueryPage } from '@jobstash/organizations/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getOrgList } from '@jobstash/organizations/data';

export const useOrgListQuery = () => {
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<OrgListQueryPage>(
    ['job-posts', filterParamsObj],
    async ({ pageParam }) => getOrgList(pageParam ?? 1, filterParamsObj),
    {
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),

      // TODO: setQueryData for individual fetch of org details
    },
  );
};

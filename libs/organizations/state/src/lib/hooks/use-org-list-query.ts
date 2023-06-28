import { useRouter } from 'next/router';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { OrgListQueryPage } from '@jobstash/organizations/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getOrgDetails, getOrgList } from '@jobstash/organizations/data';

export const useOrgListQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<OrgListQueryPage>(
    ['org-list', filterParamsObj],
    async ({ pageParam }) => getOrgList(pageParam ?? 1, filterParamsObj),
    {
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      onSuccess(data) {
        const orgListItems = data.pages.flatMap((d) => d.data);
        for (const orgListItem of orgListItems) {
          const { orgId } = orgListItem;
          queryClient.prefetchQuery({
            queryKey: ['org-details', orgId],
            queryFn: () => getOrgDetails(orgId),
          });
        }
      },
    },
  );
};

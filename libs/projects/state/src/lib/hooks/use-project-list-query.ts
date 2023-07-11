import { useRouter } from 'next/router';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { ProjectListQueryPage } from '@jobstash/projects/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getProjectDetails, getProjectList } from '@jobstash/projects/data';

export const useProjectListQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<ProjectListQueryPage>(
    ['project-list', filterParamsObj],
    async ({ pageParam }) => getProjectList(pageParam ?? 1, filterParamsObj),
    {
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      onSuccess(data) {
        const projectListItems = data.pages.flatMap((d) => d.data);
        for (const projectListItem of projectListItems) {
          const { id } = projectListItem;
          queryClient.prefetchQuery({
            queryKey: ['project-details', id],
            queryFn: () => getProjectDetails(id),
          });
        }
      },
    },
  );
};

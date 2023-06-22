import { useRouter } from 'next/router';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { type JobListQueryPage } from '@jobstash/jobs/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getCompetitors } from '@jobstash/competitors/data';
import { getJobList } from '@jobstash/jobs/data';

export const useJobListQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<JobListQueryPage>(
    ['job-posts', filterParamsObj],
    async ({ pageParam }) => getJobList(pageParam ?? 1, filterParamsObj),
    {
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      onSuccess(data) {
        const jobPosts = data.pages.flatMap((d) => d.data);
        for (const job of jobPosts) {
          queryClient.setQueryData(['job-post', job.shortUUID], job);
          if (job.organization.projects.length > 0) {
            const projectId = job.organization.projects[0].id;
            queryClient.prefetchQuery({
              queryKey: ['competitors', projectId],
              queryFn: () => getCompetitors(job.organization.projects[0].id),
            });
          }
        }
      },
    },
  );
};

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { useUrlFilterParams } from '~/features/filtersx/hooks';

import type { JobListQueryPage } from '../core/types';
import { fetchJobList } from '../fetch';

export const useJobListingInfQuery = () => {
  const { filterParams } = useUrlFilterParams();
  const queryClient = useQueryClient();

  return useInfiniteQuery<JobListQueryPage>(
    ['job-posts', filterParams],
    async ({ pageParam, queryKey }) => fetchJobList({ pageParam, queryKey }),
    {
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      staleTime: 1000 * 60 * 60, // 1 hour
      onSuccess: (data) => {
        const jobPosts = data.pages.flatMap((d) => d.data);
        for (const job of jobPosts) {
          queryClient.setQueryData(['job-post', job.jobpost.shortUUID], job);
        }
      },
    },
  );
};

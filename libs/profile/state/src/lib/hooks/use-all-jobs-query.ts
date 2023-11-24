import { useInfiniteQuery } from '@tanstack/react-query';

import { AllJobsQueryPage } from '@jobstash/admin/core';

import { getAllJobs } from '@jobstash/admin/data';

export const useAllJobsQuery = () =>
  useInfiniteQuery<AllJobsQueryPage>(['all-jobs'], async () => getAllJobs(), {
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    staleTime: 1000 * 60,
  });

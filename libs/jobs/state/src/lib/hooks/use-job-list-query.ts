import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { type JobListQueryPage } from '@jobstash/jobs/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { getJobList } from '@jobstash/jobs/data';

export const useJobListQuery = () => {
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<
    JobListQueryPage,
    Error,
    InfiniteData<JobListQueryPage, number>,
    [string, Record<string, string>],
    number
  >({
    queryKey: ['job-posts', filterParamsObj],
    queryFn: async ({ pageParam }) => getJobList(pageParam, filterParamsObj),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
  });
};
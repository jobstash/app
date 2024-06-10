import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { type JobListQueryPage, JobPost } from '@jobstash/jobs/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobList } from '@jobstash/jobs/data';

export const useJobListQuery = (access: JobPost['access']) => {
  const router = useRouter();
  const { mwVersion } = useMwVersionContext();
  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<
    JobListQueryPage,
    Error,
    InfiniteData<JobListQueryPage, number>,
    [string | null, string, Record<string, string>],
    number
  >({
    queryKey: [mwVersion, 'job-posts', filterParamsObj],
    queryFn: async ({ pageParam }) => getJobList(pageParam, filterParamsObj),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hr
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    select(data) {
      const filteredData = {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.filter((job) => job.access === access),
        })),
      };

      return filteredData;
    },
  });
};

import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { type JobListQueryPage, JobPost } from '@jobstash/jobs/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobList } from '@jobstash/jobs/data';

export const useJobListQuery = (access: JobPost['access']) => {
  const router = useRouter();
  const { mwVersion } = useMwVersionContext();
  const filterParams = createJobsFilterParamsObj(router.query);
  const isProtected = access === 'protected';

  return useInfiniteQuery<
    JobListQueryPage,
    Error,
    InfiniteData<JobListQueryPage, number>,
    [string | null, string, Record<string, string>, boolean],
    number
  >({
    queryKey: [mwVersion, 'job-posts', filterParams, isProtected],
    queryFn: async ({ pageParam }) =>
      getJobList({ page: pageParam, filterParams, isProtected }),
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

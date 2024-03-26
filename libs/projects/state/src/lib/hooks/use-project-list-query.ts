import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ProjectListQueryPage } from '@jobstash/projects/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { getProjectList } from '@jobstash/projects/data';

export const useProjectListQuery = () => {
  const router = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  const mwVersion = getLSMwVersion();

  return useInfiniteQuery<
    ProjectListQueryPage,
    Error,
    InfiniteData<ProjectListQueryPage, number>,
    [string | null, string, Record<string, string>],
    number
  >({
    queryKey: [mwVersion, 'project-list', filterParamsObj],
    queryFn: async ({ pageParam }) =>
      getProjectList(pageParam, filterParamsObj),
    initialPageParam: 1,
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    staleTime: 1000 * 60 * 60, // 1 hr
  });
};

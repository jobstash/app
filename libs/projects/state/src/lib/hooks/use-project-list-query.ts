import { useRouter } from 'next/router';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ProjectListQueryPage } from '@jobstash/projects/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getProjectList } from '@jobstash/projects/data';

export const useProjectListQuery = () => {
  const router = useRouter();
  const { mwVersion } = useMwVersionContext();

  const filterParamsObj = createJobsFilterParamsObj(router.query);

  return useInfiniteQuery<
    ProjectListQueryPage,
    Error,
    InfiniteData<ProjectListQueryPage, number>,
    [string | null, string, Record<string, string>, string | undefined],
    number
  >({
    queryKey: [mwVersion, 'project-list', filterParamsObj, undefined],
    queryFn: async ({ pageParam }) =>
      getProjectList({ page: pageParam, filterParams: filterParamsObj }),
    initialPageParam: 1,
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    staleTime: 1000 * 60 * 60, // 1 hr
  });
};

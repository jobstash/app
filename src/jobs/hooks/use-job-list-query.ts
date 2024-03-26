import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { JobQueryKeys, jobQueryKeys } from '~/jobs/core/query-keys';
import { JobListQueryPage } from '~/jobs/core/schemas';
import { getJobList } from '~/jobs/api/get-job-list';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

export const useJobListQuery = () => {
  const { filterSearchParams } = useFiltersContext();
  const filterParamsString = filterSearchParams.toString();

  return useInfiniteQuery<
    JobListQueryPage,
    Error,
    InfiniteData<JobListQueryPage, number>,
    ReturnType<JobQueryKeys['list']>,
    number
  >({
    queryKey: jobQueryKeys.list(filterParamsString),
    queryFn: async ({ pageParam }) => getJobList(pageParam, filterParamsString),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      page > 0 && data.length > 0 ? page + 1 : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};

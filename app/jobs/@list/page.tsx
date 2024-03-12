import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ROUTE_SECTIONS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';

import { filterQueryKeys } from '~/filters/core/query-keys';
import { jobQueryKeys } from '~/jobs/core/query-keys';
import { getFilterConfig } from '~/filters/api/get-filter-config';
import { getJobList } from '~/jobs/api/get-job-list';

import { JobListClientPage } from './client-page';

interface Props {
  searchParams: Record<string, string>;
}

const JobListPage = async ({ searchParams: rawSearchParams }: Props) => {
  const queryClient = getQueryClient();

  await Promise.all([
    // Prefetch list
    queryClient.prefetchInfiniteQuery({
      queryKey: jobQueryKeys.list(rawSearchParams),
      queryFn: async ({ pageParam }) => getJobList(pageParam, rawSearchParams),
      initialPageParam: 1,
    }),
    // Prefetch filter config
    queryClient.prefetchQuery({
      queryKey: filterQueryKeys.list(rawSearchParams, ROUTE_SECTIONS.JOBS),
      queryFn: () => getFilterConfig(`/${ROUTE_SECTIONS.JOBS}`),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobListClientPage rawSearchParams={rawSearchParams} />
    </HydrationBoundary>
  );
};

export default JobListPage;

// Force SSR on this page (needed to pick up searchParams)
export const dynamic = 'force-dynamic';

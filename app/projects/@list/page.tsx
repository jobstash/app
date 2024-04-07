import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ROUTE_SECTIONS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';

import { filterQueryKeys } from '~/filters/core/query-keys';
import { projectQueryKeys } from '~/projects/core/query-keys';
import { getFilterConfig } from '~/filters/api/get-filter-config';
import { getProjectList } from '~/projects/api/get-project-list';

import { ProjectListClientPage } from './client-page';

interface Props {
  searchParams: Record<string, string>;
}

const ProjectListPage = async ({ searchParams: rawSearchParams }: Props) => {
  const queryClient = getQueryClient();

  await Promise.all([
    // Prefetc list
    queryClient.prefetchInfiniteQuery({
      queryKey: projectQueryKeys.list(rawSearchParams),
      queryFn: async ({ pageParam }) =>
        getProjectList({ page: pageParam, searchParams: rawSearchParams }),
      initialPageParam: 1,
    }),
    // Prefetch filter config
    queryClient.prefetchQuery({
      queryKey: filterQueryKeys.list(rawSearchParams, ROUTE_SECTIONS.PROJECTS),
      queryFn: () => getFilterConfig(`/${ROUTE_SECTIONS.PROJECTS}`),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectListClientPage rawSearchParams={rawSearchParams} />
    </HydrationBoundary>
  );
};
export default ProjectListPage;

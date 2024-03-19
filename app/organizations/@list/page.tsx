import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ROUTE_SECTIONS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';

import { filterQueryKeys } from '~/filters/core/query-keys';
import { orgQueryKeys } from '~/orgs/core/query-keys';
import { getFilterConfig } from '~/filters/api/get-filter-config';
import { getOrgDetails } from '~/orgs/api/get-org-details';
import { getOrgList } from '~/orgs/api/get-org-list';

import { OrgListClientPage } from './client-page';

interface Props {
  searchParams: Record<string, string>;
}

const OrgListPage = async ({ searchParams: rawSearchParams }: Props) => {
  const queryClient = getQueryClient();

  const [orgListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: orgQueryKeys.list(rawSearchParams),
      queryFn: async ({ pageParam }) => getOrgList(pageParam, rawSearchParams),
      initialPageParam: 1,
    }),
    // Prefetch filter config
    queryClient.prefetchQuery({
      queryKey: filterQueryKeys.list(rawSearchParams, ROUTE_SECTIONS.ORGS),
      queryFn: () => getFilterConfig(`/${ROUTE_SECTIONS.ORGS}`),
    }),
  ]);

  // Prefetch details for each org item
  await Promise.all(
    orgListResult.pages
      .flatMap((page) => page.data)
      .map(({ orgId }) =>
        queryClient.prefetchQuery({
          queryKey: orgQueryKeys.details(orgId),
          queryFn: () => getOrgDetails(orgId),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrgListClientPage rawSearchParams={rawSearchParams} />
    </HydrationBoundary>
  );
};

export default OrgListPage;

// Force SSR on this page (needed to pick up searchParams)
export const dynamic = 'force-dynamic';

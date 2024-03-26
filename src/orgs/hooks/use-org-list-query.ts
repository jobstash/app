import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { OrgQueryKeys, orgQueryKeys } from '~/orgs/core/query-keys';
import { OrgListQueryPage } from '~/orgs/core/schemas';
import { getOrgList } from '~/orgs/api/get-org-list';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

export const useOrgListQuery = () => {
  const { filterSearchParams } = useFiltersContext();
  const filterParamsString = filterSearchParams.toString();

  return useInfiniteQuery<
    OrgListQueryPage,
    Error,
    InfiniteData<OrgListQueryPage, number>,
    ReturnType<OrgQueryKeys['list']>,
    number
  >({
    queryKey: orgQueryKeys.list(filterParamsString),
    queryFn: async ({ pageParam }) => getOrgList(pageParam, filterParamsString),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      page > 0 && data.length > 0 ? page + 1 : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};

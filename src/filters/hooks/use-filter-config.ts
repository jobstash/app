import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME, RouteSection } from '~/shared/core/constants';

import { filterQueryKeys } from '~/filters/core/query-keys';
import { sanitizeFilterParams } from '~/filters/utils/sanitizeFilterParams';
import { getFilterConfig } from '~/filters/api/get-filter-config';

export const useFilterConfig = (
  searchParams: string | Record<string, string>,
  routeSection: RouteSection,
) => {
  const query = useQuery({
    queryKey: filterQueryKeys.list(searchParams, routeSection),
    queryFn: () => getFilterConfig(`/${routeSection}`),
    staleTime: QUERY_STALETIME.DEFAULT,
    // Filter show-flag and then sort by position
    select: (data) =>
      Object.values(data)
        .filter((config) => config.show)
        .sort(({ position: p1 }, { position: p2 }) => p1 - p2),
  });

  const filterSearchParams = sanitizeFilterParams(
    searchParams,
    query.data ?? [],
  );

  return { ...query, filterSearchParams };
};

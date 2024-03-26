import { useQuery } from '@tanstack/react-query';

import { type RouteSection } from '@jobstash/shared/core';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { getFilterConfig } from '@jobstash/filters/data';

export const useFilterConfig = (routeSection: RouteSection) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'filter-config', routeSection],
    queryFn: () => getFilterConfig(routeSection),
    staleTime: 1000 * 60 * 5, // After 5 mins, refetch
  });
};

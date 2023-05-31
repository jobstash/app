import { useQuery } from '@tanstack/react-query';

import { type FilterConfig } from '@jobstash/filters/core';

import { getFilterConfig } from '@jobstash/filters/data';

export const useFilterConfig = () =>
  useQuery<FilterConfig>({
    queryKey: ['filter-config'],
    queryFn: getFilterConfig,
    staleTime: 1000 * 60 * 5, // After 5 mins, refetch
  });

import { useQuery } from '@tanstack/react-query';

import { type FilterSection } from '@jobstash/filters/core';

import { getFilterConfig } from '@jobstash/filters/data';

export const useFilterConfig = (filterSection: FilterSection) =>
  useQuery({
    queryKey: ['filter-config', filterSection],
    queryFn: () => getFilterConfig(filterSection),
    staleTime: 1000 * 60 * 5, // After 5 mins, refetch
  });

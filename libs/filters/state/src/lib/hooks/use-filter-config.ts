import { useQuery } from '@tanstack/react-query';

import { getFilterConfig } from '@jobstash/filters/data';

export const useFilterConfig = () =>
  useQuery({
    queryKey: ['filter-config'],
    queryFn: getFilterConfig,
    staleTime: 1000 * 60 * 5, // After 5 mins, refetch
  });

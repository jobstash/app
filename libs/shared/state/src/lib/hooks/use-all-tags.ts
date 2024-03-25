import { useQuery } from '@tanstack/react-query';

import { getAllTags } from '@jobstash/shared/data';

export const useAllTags = () =>
  useQuery({
    queryKey: ['all-technologies'],
    queryFn: () => getAllTags(),
  });

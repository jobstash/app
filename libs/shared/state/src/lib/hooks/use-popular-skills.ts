import { useQuery } from '@tanstack/react-query';

import { getPopularSkills } from '@jobstash/shared/data';

export const usePopularSkills = (count?: number) =>
  useQuery({
    queryKey: ['popular-skills', count],
    queryFn: () => getPopularSkills(count),
    staleTime: 1000 * 60 * 60, // 1hr
  });

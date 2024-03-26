import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getPopularSkills } from '@jobstash/shared/data';

export const usePopularSkills = (count?: number) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'popular-skills', count],
    queryFn: () => getPopularSkills(count),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

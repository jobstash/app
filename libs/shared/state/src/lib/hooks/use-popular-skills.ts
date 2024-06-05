import { useQuery } from '@tanstack/react-query';

import { getPopularSkills } from '@jobstash/shared/data';

import { useMwVersionContext } from './use-mw-version-context';

export const usePopularSkills = (count?: number) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'popular-skills', count],
    queryFn: () => getPopularSkills(count),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

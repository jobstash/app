import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevTalents } from '@jobstash/profile/data';

export const useDevTalents = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'dev-talents'],
    queryFn: () => getDevTalents(),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

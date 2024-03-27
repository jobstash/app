import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getDevTalents } from '@jobstash/profile/data';

export const useDevTalents = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'dev-talents'],
    queryFn: () => getDevTalents(),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

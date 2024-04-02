import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getWorkHistory } from '@jobstash/profile/data';

export const useWorkHistory = (user: string) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'work-history', user],
    queryFn: () => getWorkHistory(user),
    staleTime: 1000 * 60 * 60,
  });
};

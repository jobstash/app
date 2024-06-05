import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getWorkHistory } from '@jobstash/profile/data';

export const useWorkHistory = (user: string) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'work-history', user],
    queryFn: () => getWorkHistory(user),
    staleTime: 1000 * 60 * 60,
  });
};

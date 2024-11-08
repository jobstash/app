import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getUsersAvailableForWork } from '@jobstash/profile/data';

export const useUsersAvailableForWork = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'users-available-for-work'],
    queryFn: () => getUsersAvailableForWork(),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

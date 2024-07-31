import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileShowcase } from '@jobstash/profile/data';

export const useProfileShowcaseQuery = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'profile-showcase'],
    queryFn: () => getProfileShowcase(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isFetching, data };
};

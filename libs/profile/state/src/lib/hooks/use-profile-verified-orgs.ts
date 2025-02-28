import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileVerifiedOrgs } from '@jobstash/profile/data';

export const useProfileVerifiedOrgs = () => {
  const { mwVersion } = useMwVersionContext();
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: [mwVersion, 'profile-verified-orgs'],
    queryFn: () => getProfileVerifiedOrgs(),
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });
};

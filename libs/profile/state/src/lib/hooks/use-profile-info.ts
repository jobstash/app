import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileInfo } from '@jobstash/profile/data';

export const useProfileInfo = () => {
  const { mwVersion } = useMwVersionContext();
  const { isAuthenticated } = useAuthContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'profile-info'],
    queryFn: () => getProfileInfo(),
    enabled: isAuthenticated,
  });

  return {
    isLoading,
    profileInfoData,
  };
};

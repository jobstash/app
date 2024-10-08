import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { mwVersion } = useMwVersionContext();
  const { isAuthenticated } = useAuthContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info'],
    queryFn: () => getDevProfileInfo(),
    enabled: isAuthenticated,
  });

  return {
    isLoading,
    profileInfoData,
  };
};

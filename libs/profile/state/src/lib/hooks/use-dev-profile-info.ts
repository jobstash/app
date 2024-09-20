import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { mwVersion } = useMwVersionContext();
  const { authenticated } = usePrivy();
  console.log({ AUTHENTICATED: authenticated });

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info'],
    queryFn: () => getDevProfileInfo(),
    enabled: authenticated,
  });

  return {
    isLoading,
    profileInfoData,
  };
};

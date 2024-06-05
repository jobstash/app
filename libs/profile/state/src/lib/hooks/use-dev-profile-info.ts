import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { address } = useAccount();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info', address],
    queryFn: () => getDevProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

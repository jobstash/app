import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getProfileInfo } from '@jobstash/profile/data';

export const useProfileInfo = () => {
  const { address } = useAccount();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: ['profile-info', address],
    queryFn: () => getProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

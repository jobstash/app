import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { address } = useAccount();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: ['dev-profile-info', address],
    queryFn: () => getDevProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

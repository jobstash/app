import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfo = () => {
  const { address } = useAccount();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: ['org-profile-info', address],
    queryFn: () => getOrgProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

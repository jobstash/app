import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info', address],
    queryFn: () => getDevProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

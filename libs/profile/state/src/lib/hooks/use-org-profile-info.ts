import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfo = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'org-profile-info', address],
    queryFn: () => getOrgProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

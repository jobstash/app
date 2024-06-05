import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfo = () => {
  const { address } = useAccount();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'org-profile-info', address],
    queryFn: () => getOrgProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfo = () => {
  const { mwVersion } = useMwVersionContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'org-profile-info'],
    queryFn: () => getOrgProfileInfo(),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

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
    select: (data) => ({
      ...data,
      // Sort email w/ main on top
      email: data.email.toSorted((a, b) =>
        a.main === b.main ? 0 : a.main ? -1 : 1,
      ),
    }),
  });

  return {
    isLoading,
    profileInfoData,
  };
};

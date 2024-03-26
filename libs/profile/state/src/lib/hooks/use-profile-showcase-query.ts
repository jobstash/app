import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getProfileShowcase } from '@jobstash/profile/data';

export const useProfileShowcaseQuery = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'profile-showcase', address],
    queryFn: () => getProfileShowcase(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isFetching, data };
};

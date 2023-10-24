import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getProfileShowcase } from '@jobstash/profile/data';

export const useProfileShowcaseQuery = () => {
  const { address } = useAccount();

  const { isLoading: isLoadingShowcaseQuery, data: showcaseData } = useQuery({
    queryKey: ['profile-showcase', address],
    queryFn: () => getProfileShowcase(),
    enabled: Boolean(address),
  });

  return {
    isLoadingShowcaseQuery,
    showcaseData,
  };
};

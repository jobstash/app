import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getProfileOrgReviewList } from '@jobstash/profile/data';

export const useProfileOrgReviewListQuery = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['profile-org-review-list', address],
    queryFn: () => getProfileOrgReviewList(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });
};

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getProfileOrgReviewList } from '@jobstash/profile/data';

export const useProfileOrgReviewListQuery = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'profile-org-review-list', address],
    queryFn: () => getProfileOrgReviewList(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });
};

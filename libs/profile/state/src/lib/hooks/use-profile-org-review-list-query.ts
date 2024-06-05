import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileOrgReviewList } from '@jobstash/profile/data';

export const useProfileOrgReviewListQuery = () => {
  const { address } = useAccount();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'profile-org-review-list', address],
    queryFn: () => getProfileOrgReviewList(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });
};

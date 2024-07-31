import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileOrgReviewList } from '@jobstash/profile/data';

export const useProfileOrgReviewListQuery = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'profile-org-review-list'],
    queryFn: () => getProfileOrgReviewList(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 60,
  });
};

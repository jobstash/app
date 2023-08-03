import { useInfiniteQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileOrgReviewListQueryPage } from '@jobstash/profile/core';

import { getProfileOrgReviewList } from '@jobstash/profile/data';

export const useProfileOrgReviewListQuery = () => {
  const { address } = useAccount();

  return useInfiniteQuery<ProfileOrgReviewListQueryPage>(
    ['profile-org-review-list'],
    async ({ pageParam }) => getProfileOrgReviewList(pageParam ?? 1, address),
    {
      enabled: Boolean(address),
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    },
  );
};

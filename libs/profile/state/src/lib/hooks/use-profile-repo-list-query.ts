import { useInfiniteQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileRepoListQueryPage } from '@jobstash/profile/core';

import { getProfileRepoList } from '@jobstash/profile/data';

export const useProfileRepoListQuery = () => {
  const { address } = useAccount();

  return useInfiniteQuery<ProfileRepoListQueryPage>(
    ['profile-repo-list'],
    async ({ pageParam }) => getProfileRepoList(pageParam ?? 1, address),
    {
      enabled: Boolean(address),
      staleTime: 1000 * 60 * 60, // 1 hr
      getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    },
  );
};

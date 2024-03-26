import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileRepoListQueryPage } from '@jobstash/profile/core';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { getProfileRepoList } from '@jobstash/profile/data';

export const useProfileRepoListQuery = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  return useInfiniteQuery<
    ProfileRepoListQueryPage,
    Error,
    InfiniteData<ProfileRepoListQueryPage, number>,
    [string | null, string],
    number
  >({
    queryKey: [mwVersion, 'profile-repo-list'],
    queryFn: async ({ pageParam }) => getProfileRepoList(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60, // 1 hr
  });
};

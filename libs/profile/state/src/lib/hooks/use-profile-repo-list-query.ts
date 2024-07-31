import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ProfileRepoListQueryPage } from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileRepoList } from '@jobstash/profile/data';

export const useProfileRepoListQuery = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

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
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 60, // 1 hr
  });
};

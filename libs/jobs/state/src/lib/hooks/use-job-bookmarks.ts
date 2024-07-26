import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobBookmarks } from '@jobstash/jobs/data';

export const useJobBookmarks = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [mwVersion, 'job-bookmarks', isAuthenticated],
    queryFn: () => getJobBookmarks(isAuthenticated),
    staleTime: 1000 * 60 * 60,
  });

  const bookmarkedJobs = useMemo(
    () => new Set((data ?? []).map((d) => d.shortUUID)),
    [data],
  );

  return { isLoading, isError, data, bookmarkedJobs, isFetching };
};

import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getJobBookmarks } from '@jobstash/jobs/data';

export const useJobBookmarks = () => {
  const { isSignedIn } = useSIWE();

  const mwVersion = getLSMwVersion();

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [mwVersion, 'job-bookmarks', isSignedIn],
    queryFn: () => getJobBookmarks(isSignedIn),
    staleTime: 1000 * 60 * 60,
  });

  const bookmarkedJobs = useMemo(
    () => new Set((data ?? []).map((d) => d.shortUUID)),
    [data],
  );

  return { isLoading, isError, data, bookmarkedJobs, isFetching };
};

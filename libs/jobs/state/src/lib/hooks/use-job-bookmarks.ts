import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getJobBookmarks } from '@jobstash/jobs/data';

export const useJobBookmarks = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['job-bookmarks'],
    queryFn: () => getJobBookmarks(),
  });

  const bookmarkedJobs = useMemo(
    () => new Set((data ?? []).map((d) => d.shortUUID)),
    [data],
  );

  return { isLoading, data, bookmarkedJobs };
};

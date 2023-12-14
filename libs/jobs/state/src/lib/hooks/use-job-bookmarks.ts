import { useQuery } from '@tanstack/react-query';

import { getJobBookmarks } from '@jobstash/jobs/data';

export const useJobBookmarks = () =>
  useQuery({
    queryKey: ['job-bookmarks'],
    queryFn: () => getJobBookmarks(),
  });

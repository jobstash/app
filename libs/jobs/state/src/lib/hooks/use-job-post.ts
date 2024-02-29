import { useQuery } from '@tanstack/react-query';

import { getJobPost } from '@jobstash/jobs/data';

export const useJobPost = (shortUuid: string) =>
  useQuery({
    queryKey: ['job-post', shortUuid],
    queryFn: () => getJobPost(shortUuid),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(shortUuid),
  });

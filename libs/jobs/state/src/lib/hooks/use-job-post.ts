import { useQuery } from '@tanstack/react-query';

import { type JobPost } from '@jobstash/jobs/core';

import { getJobPost } from '@jobstash/jobs/data';

export const useJobPost = (
  shortUuid: string,
  onSuccess?: (jobPost: JobPost) => void,
) =>
  useQuery({
    queryKey: ['job-post', shortUuid],
    queryFn: () => getJobPost(shortUuid),
    staleTime: 1000 * 60 * 60, // 1 hr
    onSuccess,
    enabled: Boolean(shortUuid),
  });

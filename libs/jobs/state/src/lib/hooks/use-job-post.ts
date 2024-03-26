import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getJobPost } from '@jobstash/jobs/data';

export const useJobPost = (shortUuid: string) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'job-post', shortUuid],
    queryFn: () => getJobPost(shortUuid),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(shortUuid),
  });
};

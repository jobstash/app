import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobPost } from '@jobstash/jobs/data';

export const useJobPost = (shortUuid: string) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'job-post', shortUuid, undefined],
    queryFn: () => getJobPost({ shortUuid }),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(shortUuid),
  });
};

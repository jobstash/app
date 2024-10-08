import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobList } from '@jobstash/jobs/data';

export const useHomePageJobs = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'home-page', 'jobs'],
    queryFn: () => getJobList({ page: 1, limit: 3 }),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

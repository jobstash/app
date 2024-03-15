import { useQuery } from '@tanstack/react-query';

import { getJobList } from '@jobstash/jobs/data';

export const useHomePageJobs = () =>
  useQuery({
    queryKey: ['home-page', 'jobs'],
    queryFn: () => getJobList(1, undefined, 3),
    staleTime: 1000 * 60 * 60, // 1hr
  });

import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getJobList } from '@jobstash/jobs/data';

export const useHomePageJobs = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'home-page', 'jobs'],
    queryFn: () => getJobList(1, undefined, 3),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getAllJobs } from '@jobstash/admin/data';

export const useAllJobsQuery = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'all-jobs'],
    queryFn: async () => getAllJobs(),
    staleTime: 1000 * 60 * 60,
  });
};

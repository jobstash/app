import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllJobs } from '@jobstash/admin/data';

export const useAllJobsQuery = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'all-jobs'],
    queryFn: async () => getAllJobs(),
    staleTime: 1000 * 60 * 60,
  });
};

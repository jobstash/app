import { useQuery } from '@tanstack/react-query';

import { getAllJobs } from '@jobstash/admin/data';

export const useAllJobsQuery = () =>
  useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => getAllJobs(),
    staleTime: 1000 * 60 * 60,
  });

import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobsApplied } from '@jobstash/jobs/data';

export const useJobsApplied = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  const { data, isPending, isFetching, refetch } = useQuery({
    queryKey: [mwVersion, 'jobs-applied'],
    queryFn: () => getJobsApplied(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 60,
  });

  return {
    appliedJobs: data ?? [],
    isPendingJobsApplied: isPending,
    isFetchingJobsApplied: isFetching,
    refetchJobsApplied: refetch,
  };
};

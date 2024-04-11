import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getJobsApplied } from '@jobstash/jobs/data';

export const useJobsApplied = () => {
  const { address } = useAccount();

  const mwVersion = getLSMwVersion();

  const { data, isPending, isFetching, refetch } = useQuery({
    queryKey: [mwVersion, 'jobs-applied', address],
    queryFn: () => getJobsApplied(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });

  return {
    appliedJobs: data ?? [],
    isPendingJobsApplied: isPending,
    isFetchingJobsApplied: isFetching,
    refetchJobsApplied: refetch,
  };
};

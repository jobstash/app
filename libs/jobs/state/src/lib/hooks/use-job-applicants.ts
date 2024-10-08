/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobApplicants } from '@jobstash/jobs/data';

export const useJobApplicants = (
  orgId: string | undefined | null,
  list: 'all' | 'new' | 'shortlisted' | 'archived',
) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'job-applicants', orgId, list],
    queryFn: () => getJobApplicants(orgId!, list),
    enabled: Boolean(orgId),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};

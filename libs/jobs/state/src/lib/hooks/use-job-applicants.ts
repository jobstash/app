/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { getJobApplicants } from '@jobstash/jobs/data';

export const useJobApplicants = (orgId: string | undefined) =>
  useQuery({
    queryKey: ['job-applicants', orgId],
    queryFn: () => getJobApplicants(orgId!),
    enabled: Boolean(orgId),
  });

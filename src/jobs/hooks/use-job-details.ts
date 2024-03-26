import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { jobQueryKeys } from '~/jobs/core/query-keys';
import { getJobDetails } from '~/jobs/api/get-job-details';

export const useJobDetails = (id: string) => {
  return useQuery({
    queryKey: jobQueryKeys.details(id),
    queryFn: () => getJobDetails(id),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};

import { useQuery } from '@tanstack/react-query';

import { jobQueryKeys } from '~/jobs/core/query-keys';
import { getJobDetails } from '~/jobs/api/get-job-details';

export const useJobDetails = (id: string) => {
  return useQuery({
    queryKey: jobQueryKeys.details(id),
    queryFn: () => getJobDetails(id),
  });
};

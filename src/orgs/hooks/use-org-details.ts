import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { orgQueryKeys } from '~/orgs/core/query-keys';
import { getOrgDetails } from '~/orgs/api/get-org-details';

export const useOrgDetails = (orgId: string) => {
  return useQuery({
    queryKey: orgQueryKeys.details(orgId),
    queryFn: () => getOrgDetails(orgId),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};

import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getOrgDetails } from '@jobstash/organizations/data';

export const useOrgDetails = (orgId: string | null) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'org-details', orgId],
    queryFn: () => getOrgDetails(orgId as string),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(orgId),
  });
};

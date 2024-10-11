import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgDetails } from '@jobstash/organizations/data';

export const useOrgDetails = (orgId: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'org-details', orgId, undefined],
    queryFn: () => getOrgDetails({ orgId: orgId as string }),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(orgId) && typeof orgId === 'string',
  });
};

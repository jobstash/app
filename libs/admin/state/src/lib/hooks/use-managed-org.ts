/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getManagedOrg } from '@jobstash/admin/data';

export const useManagedOrg = (orgId?: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-managed-org', orgId],
    queryFn: () => getManagedOrg(orgId!),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(orgId) && typeof orgId === 'string',
    select: (data) => data.data,
  });
};

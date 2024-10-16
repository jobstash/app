import { useQuery } from '@tanstack/react-query';

import { MW_URL } from '@jobstash/shared/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

import { ManagedOrg, managedOrgSchema } from '../core/schemas';

const getManagedOrg = async (orgId: string) => {
  const url = `${MW_URL}/replace-me-when-its-up/${orgId}`;

  const options = {
    responseSchema: managedOrgSchema,
    sentryLabel: `getManagedOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ManagedOrg>(url, options);
};

export const useManagedOrg = (orgId: string) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-managed-org', orgId],
    queryFn: () => getManagedOrg(orgId),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(orgId) && typeof orgId === 'string',
  });
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { MW_URL } from '@jobstash/shared/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

import { ManagedOrgResponse, managedOrgResponseSchema } from '../core/schemas';

const getManagedOrg = async (orgId: string) => {
  const url = `${MW_URL}/organizations/${orgId}`;

  const options = {
    responseSchema: managedOrgResponseSchema,
    sentryLabel: `getManagedOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ManagedOrgResponse>(url, options);
};

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

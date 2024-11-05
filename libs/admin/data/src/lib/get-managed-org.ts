import {
  ManagedOrgResponse,
  managedOrgResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getManagedOrg = async (orgId: string) => {
  const url = `${MW_URL}/organizations/${orgId}`;

  const options = {
    responseSchema: managedOrgResponseSchema,
    sentryLabel: `getManagedOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ManagedOrgResponse>(url, options);
};

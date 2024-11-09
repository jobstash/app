import { OrgProfileList, orgProfileListSchema } from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getApprovalOrgList = async (status: 'pending' | 'approved') => {
  const url = `${MW_URL}/users/orgs/${status}`;

  const options = {
    responseSchema: orgProfileListSchema,
    sentryLabel: `getApprovalOrgList`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<OrgProfileList>(url, options);
};

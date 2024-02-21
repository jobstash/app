import { PendingOrgs, pendingOrgsSchema } from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getPendingOrgs = async () => {
  const url = `${MW_URL}/users/orgs/pending`;

  const options = {
    responseSchema: pendingOrgsSchema,
    sentryLabel: `getGodmodeBlockedTags`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<PendingOrgs>(url, options);
};

import {
  affiliationRequestResponseSchema,
  AffiliationRequestsResponse,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

type AffiliationList = 'all' | 'pending' | 'approved' | 'rejected';

export const getAdminAffiliationRequests = async (
  list = 'all' as AffiliationList,
) => {
  const url = `${MW_URL}/users/orgs/affiliation-requests?list=${list}`;

  const options = {
    responseSchema: affiliationRequestResponseSchema,
    sentryLabel: `getAdminAffiliationRequests`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AffiliationRequestsResponse>(url, options);
};

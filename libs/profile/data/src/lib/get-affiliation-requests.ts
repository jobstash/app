import {
  affiliationRequestResponseSchema,
  AffiliationRequestsResponse,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

interface Props {
  orgId?: string | null;
  list?: 'all' | 'pending' | 'approved' | 'rejected';
}

export const getAffiliationRequests = async ({
  orgId = null,
  list = 'all',
}: Props) => {
  const _url = new URL(`${MW_URL}/users/orgs/my-affiliation-requests`);

  if (orgId) _url.searchParams.append('orgId', orgId);
  if (list) _url.searchParams.append('list', list);

  const url = _url.toString();

  const options = {
    method: 'GET' as const,
    responseSchema: affiliationRequestResponseSchema,
    sentryLabel: `getAffiliationRequests`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AffiliationRequestsResponse>(url, options);
};

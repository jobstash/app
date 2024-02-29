import {
  OrgProfileInfoResponse,
  orgProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getOrgProfileInfo = async () => {
  const url = `${MW_URL}/profile/org/info`;

  const options = {
    responseSchema: orgProfileInfoResponseSchema,
    sentryLabel: `getOrgProfileInfo`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<OrgProfileInfoResponse>(url, options);

  return response.data;
};

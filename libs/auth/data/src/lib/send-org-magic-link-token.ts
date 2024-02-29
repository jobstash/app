import {
  type OrgProfileInfoResponse,
  orgProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const sendOrgMagicLinkToken = async (token: string) => {
  const url = `${MW_URL}/auth/magic/org/login/callback?token=${token}`;

  const options = {
    responseSchema: orgProfileInfoResponseSchema,
    sentryLabel: 'sendOrgMagicLinkToken',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<OrgProfileInfoResponse>(url, options);
};

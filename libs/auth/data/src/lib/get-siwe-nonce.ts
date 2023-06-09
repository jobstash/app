import {
  type SiweNonceResponse,
  siweNonceResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getSiweNonce = async () => {
  const url = `${MW_URL}/siwe/nonce`;

  const options = {
    responseSchema: siweNonceResponseSchema,
    sentryLabel: 'getNonce',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<SiweNonceResponse>(url, options);
};

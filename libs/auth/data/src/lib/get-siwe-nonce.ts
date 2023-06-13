import {
  type SiweNonceResponse,
  siweNonceResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getSiweNonce = async (): Promise<string> => {
  const url = `${MW_URL}/siwe/nonce`;

  const options = {
    responseSchema: siweNonceResponseSchema,
    sentryLabel: 'getNonce',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { data } = await mwFetch<SiweNonceResponse>(url, options);

  return data;
};

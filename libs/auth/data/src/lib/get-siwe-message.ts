import {
  SiweCreateMessageResponse,
  siweCreateMessageResponseSchema,
} from '@jobstash/auth/core';

import { mwFetch } from '@jobstash/shared/data';

interface Args {
  nonce: string;
  address: string;
}

export const getSiweMessage = async ({ nonce, address }: Args) => {
  const url = `/api/siwe/create-message?nonce=${nonce}&address=${address}&domain=${window?.location.host}&uri=${window?.location.origin}&host=${window?.location.host}`;

  const options = {
    responseSchema: siweCreateMessageResponseSchema,
    sentryLabel: 'getSiweMessage',
  };

  return mwFetch<SiweCreateMessageResponse>(url, options);
};

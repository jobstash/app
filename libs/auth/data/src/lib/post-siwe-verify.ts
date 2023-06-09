import {
  SiweVerifyPayload,
  siweVerifyPayloadSchema,
  SiweVerifyResponse,
  siweVerifyResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postSiweVerify = async (payload: SiweVerifyPayload) => {
  const url = `${MW_URL}/siwe/verify`;

  const options = {
    responseSchema: siweVerifyResponseSchema,
    sentryLabel: 'postSiweVerify',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    method: 'POST' as const,
    headers: {
      'Content-Type': 'application/json',
    },
    payload,
    payloadSchema: siweVerifyPayloadSchema,
  };
  return mwFetch<SiweVerifyResponse, SiweVerifyPayload>(url, options);
};

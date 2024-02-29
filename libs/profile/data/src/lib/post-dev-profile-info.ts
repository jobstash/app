import {
  type DevProfileInfoPayload,
  devProfileInfoPayloadSchema,
  type DevProfileInfoResponse,
  devProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postDevProfileInfo = async (payload: DevProfileInfoPayload) => {
  const url = `${MW_URL}/profile/dev/info`;

  const options = {
    method: 'POST' as const,
    responseSchema: devProfileInfoResponseSchema,
    sentryLabel: 'postDevProfileInfo',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: devProfileInfoPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await mwFetch<DevProfileInfoResponse, DevProfileInfoPayload>(
    url,
    options,
  );

  return data;
};

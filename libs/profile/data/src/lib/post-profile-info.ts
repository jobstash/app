import {
  type ProfileInfoPayload,
  profileInfoPayloadSchema,
  type ProfileInfoResponse,
  profileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileInfo = async (payload: ProfileInfoPayload) => {
  const url = `${MW_URL}/profile/info`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileInfoResponseSchema,
    sentryLabel: 'postProfileInfo',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileInfoPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await mwFetch<ProfileInfoResponse, ProfileInfoPayload>(
    url,
    options,
  );

  return data;
};

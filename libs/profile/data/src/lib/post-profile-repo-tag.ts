import {
  type ProfileRepoTagPayload,
  profileRepoTagPayloadSchema,
  type ProfileRepoTagResponse,
  profileRepoTagResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileRepoTag = async (payload: ProfileRepoTagPayload) => {
  const url = `${MW_URL}/profile/repositories/tags`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileRepoTagResponseSchema,
    sentryLabel: 'postProfileInfo',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileRepoTagPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    ProfileRepoTagResponse,
    ProfileRepoTagPayload
  >(url, options);

  return { success, message };
};

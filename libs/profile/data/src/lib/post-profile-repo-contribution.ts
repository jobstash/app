import {
  type ProfileRepoContributionPayload,
  profileRepoContributionPayloadSchema,
  type ProfileRepoContributionResponse,
  profileRepoContributionResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileRepoContribution = async (
  payload: ProfileRepoContributionPayload,
) => {
  const url = `${MW_URL}/profile/repositories/contribution`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileRepoContributionResponseSchema,
    sentryLabel: 'postProfileInfo',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileRepoContributionPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    ProfileRepoContributionResponse,
    ProfileRepoContributionPayload
  >(url, options);

  return { success, message };
};

import {
  type ProfileOrgReviewPayload,
  profileOrgReviewPayloadSchema,
  type ProfileOrgReviewResponse,
  profileOrgReviewResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileOrgReview = async (
  payload: ProfileOrgReviewPayload,
) => {
  const url = `${MW_URL}/profile/reviews/review`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileOrgReviewResponseSchema,
    sentryLabel: 'prostProfileOrgReview',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileOrgReviewPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    ProfileOrgReviewResponse,
    ProfileOrgReviewPayload
  >(url, options);

  return { success, message };
};

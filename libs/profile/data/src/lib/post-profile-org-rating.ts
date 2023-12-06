import {
  type ProfileOrgRatingPayload,
  profileOrgRatingPayloadSchema,
  type ProfileOrgRatingResponse,
  profileOrgRatingResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileOrgRating = async (
  payload: ProfileOrgRatingPayload,
) => {
  const url = `${MW_URL}/profile/reviews/rating`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileOrgRatingResponseSchema,
    sentryLabel: 'postProfileOrgRating',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileOrgRatingPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    ProfileOrgRatingResponse,
    ProfileOrgRatingPayload
  >(url, options);

  return { success, message };
};

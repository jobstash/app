import {
  type GodmodeBlockedTermsPayload,
  godmodeBlockedTermsPayloadSchema,
  type GodmodeBlockedTermsResponse,
  godmodeBlockedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postSetBlockedTerms = async (
  payload: GodmodeBlockedTermsPayload,
) => {
  const url = `${MW_URL}/technologies/set-blocked-terms`;

  const options = {
    method: 'POST' as const,
    responseSchema: godmodeBlockedTermsResponseSchema,
    sentryLabel: `postSetBlockedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: godmodeBlockedTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<
    GodmodeBlockedTermsResponse,
    GodmodeBlockedTermsPayload
  >(url, options);

  if (!response.success) throw new Error(response.message);

  return { success: response.success, message: response.message };
};

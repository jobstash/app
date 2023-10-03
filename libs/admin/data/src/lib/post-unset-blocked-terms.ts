import {
  BlockedTermsPayload,
  blockedTermsPayloadSchema,
  BlockedTermsResponse,
  blockedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postUnsetBlockedTerms = async (payload: BlockedTermsPayload) => {
  const url = `${MW_URL}/tags/unset-blocked-terms`;

  const options = {
    method: 'POST' as const,
    responseSchema: blockedTermsResponseSchema,
    sentryLabel: `postUnsetBlockedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: blockedTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<BlockedTermsResponse, BlockedTermsPayload>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return { success: response.success, message: response.message };
};

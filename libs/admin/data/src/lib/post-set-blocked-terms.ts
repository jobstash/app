import {
  type BlockedTermsPayload,
  blockedTermsPayloadSchema,
  type BlockedTermsResponse,
  blockedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postSetBlockedTerms = async (payload: BlockedTermsPayload) => {
  const url = `${MW_URL}/tags/block`;

  const options = {
    method: 'POST' as const,
    responseSchema: blockedTermsResponseSchema,
    sentryLabel: `postSetBlockedTerms`,
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

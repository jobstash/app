import {
  PairedTermsPayload,
  pairedTermsPayloadSchema,
  PairedTermsResponse,
  pairedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postPairedTerms = async (payload: PairedTermsPayload) => {
  const url = `${MW_URL}/technologies/create-paired-terms`;

  const options = {
    method: 'POST' as const,
    responseSchema: pairedTermsResponseSchema,
    sentryLabel: `postPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: pairedTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<PairedTermsResponse, PairedTermsPayload>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return { success: response.success, message: response.message };
};

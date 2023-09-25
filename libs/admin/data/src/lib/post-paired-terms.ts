import {
  PairedTermsPayload,
  pairedTermsPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postPairedTerms = async (payload: PairedTermsPayload) => {
  const url = `${MW_URL}/technologies/create-paired-terms`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: pairedTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    PairedTermsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

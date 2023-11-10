import {
  type CreatePreferenceResponse,
  createPreferenceResponseSchema,
  type PreferredTermsPayload,
  preferredTermsPayloadSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postCreatePreference = async (payload: PreferredTermsPayload) => {
  const url = `${MW_URL}/tags/create-preference`;

  const options = {
    method: 'POST' as const,
    responseSchema: createPreferenceResponseSchema,
    sentryLabel: `postPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: preferredTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    CreatePreferenceResponse,
    PreferredTermsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

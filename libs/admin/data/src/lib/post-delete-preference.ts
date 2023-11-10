import {
  type DeletePreferenceResponse,
  deletePreferenceResponseSchema,
  type PreferredTermsPayload,
  preferredTermsPayloadSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postDeletePreference = async (payload: PreferredTermsPayload) => {
  const url = `${MW_URL}/tags/delete-preference`;

  const options = {
    method: 'POST' as const,
    responseSchema: deletePreferenceResponseSchema,
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
    DeletePreferenceResponse,
    PreferredTermsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

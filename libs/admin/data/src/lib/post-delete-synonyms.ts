import {
  type DeleteSynonymsResponse,
  deleteSynonymsResponseSchema,
  type PreferredTermsPayload,
  preferredTermsPayloadSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postDeleteSynonyms = async (payload: PreferredTermsPayload) => {
  const url = `${MW_URL}/tags/delete-synonyms`;

  const options = {
    method: 'POST' as const,
    responseSchema: deleteSynonymsResponseSchema,
    sentryLabel: `postDeletePreference`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: preferredTermsPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    DeleteSynonymsResponse,
    PreferredTermsPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

import {
  type DeletePreferencePayload,
  type DeletePreferenceResponse,
  deletePreferenceResponseSchema,
  deletePreferrencePayloadSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postDeletePreference = async (
  payload: DeletePreferencePayload,
) => {
  const url = `${MW_URL}/tags/delete-preference`;

  const options = {
    method: 'POST' as const,
    responseSchema: deletePreferenceResponseSchema,
    sentryLabel: `postDeletePreference`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: deletePreferrencePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    DeletePreferenceResponse,
    DeletePreferencePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

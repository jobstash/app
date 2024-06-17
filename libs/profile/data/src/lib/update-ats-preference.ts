import {
  UpdateATSPreferencePayload,
  updateATSPreferencePayloadSchema,
} from '@jobstash/profile/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateATSPreference = async (
  payload: UpdateATSPreferencePayload,
) => {
  const url = `${MW_URL}/scorer/update/preferences`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateATSPreference`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateATSPreferencePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const result = await mwFetch<MessageResponse, UpdateATSPreferencePayload>(
    url,
    options,
  );

  if (!result.success) throw new Error(result.message);

  return result;
};

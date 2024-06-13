import {
  ATSPlatformName,
  RegisterATSClientPayload,
  registerATSClientPayloadSchema,
  RegisterATSResponse,
  registerATSResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const registerATSPlatform = async (
  platform: ATSPlatformName,
  payload: RegisterATSClientPayload,
) => {
  const url = `${MW_URL}/scorer/register/${platform}`;

  const options = {
    method: 'POST' as const,
    responseSchema: registerATSResponseSchema,
    sentryLabel: `registerATSPlatform`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: registerATSClientPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<RegisterATSResponse, RegisterATSClientPayload>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return response.data;
};

import myzod, { Infer } from 'myzod';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  url: myzod.string().min(1),
  name: myzod.string().min(1),
  orgId: myzod.string().optional(),
  defiLlamaSlug: myzod.string().optional(),
});

type Payload = Infer<typeof payloadSchema>;

export const importProject = async (payload: Payload) => {
  const result = payloadSchema.try(payload);
  if (result instanceof myzod.ValidationError) {
    throw new TypeError(`Invalid payload: ${result.name} ${result.message}`);
  }

  let domain: string;
  const { url, name, orgId, defiLlamaSlug } = result;

  try {
    domain = new URL(url).hostname;
  } catch {
    throw new Error('Invalid Org URL');
  }

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `importProject`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: {
      name,
      url: domain,
      orgId,
      defiLlamaSlug,
    },
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse, Payload>(
    `${MW_URL}/projects/add-by-url`,
    options,
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
};

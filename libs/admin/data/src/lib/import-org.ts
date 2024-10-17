import myzod, { Infer } from 'myzod';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  name: myzod.string().min(1),
  url: myzod.string().min(1),
});
type Payload = Infer<typeof payloadSchema>;

export const importOrg = async ({ name, url }: Payload) => {
  if (!name) throw new Error('Organization name is required');
  if (!url) throw new Error('Organization website is required');

  let domain: string;

  try {
    domain = new URL(url).hostname;
  } catch {
    throw new Error('Invalid Org URL');
  }

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `importOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: {
      name,
      url: domain,
    },
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse, Payload>(
    `${MW_URL}/organizations/add-by-url`,
    options,
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
};

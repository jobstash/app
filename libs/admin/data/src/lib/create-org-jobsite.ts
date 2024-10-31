import myzod, { Infer } from 'myzod';

import {
  Jobsite,
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  orgId: myzod.string().min(1),
  url: myzod.string().min(1),
  type: myzod.string(),
});
type Payload = Infer<typeof payloadSchema>;

export const createOrgJobsite = async ({ id, url, type }: Jobsite) => {
  const payload = {
    orgId: id,
    url,
    type,
  };
  const parseResult = payloadSchema.try(payload);
  if (parseResult instanceof myzod.ValidationError) {
    throw new TypeError('Invalid url or jobsite type');
  }

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `createOrgJobsite`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: parseResult,
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse, Payload>(
    `${MW_URL}/organizations/jobsites/create`,
    options,
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
};

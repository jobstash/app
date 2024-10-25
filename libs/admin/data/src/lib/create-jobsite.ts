import myzod, { Infer } from 'myzod';

import { JOBSITE_TYPES } from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  orgId: myzod.string().min(1),
  url: myzod.string().min(1),
  type: myzod.literals(...JOBSITE_TYPES),
});
type Payload = Infer<typeof payloadSchema>;

export const createJobsite = async (payload: Payload) => {
  const parseResult = payloadSchema.try(payload);
  if (parseResult instanceof myzod.ValidationError) {
    throw new TypeError('Invalid url or jobsite type');
  }

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `createJobsite`,
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

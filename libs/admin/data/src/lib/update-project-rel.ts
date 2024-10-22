import myzod, { Infer } from 'myzod';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  orgId: myzod.string().min(1),
  projectId: myzod.string().min(1),
});

type Payload = Infer<typeof payloadSchema>;

interface Props extends Payload {
  op?: 'add' | 'remove';
}

export const updateProjectRel = async ({
  op = 'add',
  orgId,
  projectId,
}: Props) => {
  const url = `${MW_URL}/organizations/${op}-project`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateProjectRel`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
    payloadSchema,
    payload: { orgId, projectId },
  };

  const response = await mwFetch<MessageResponse, Payload>(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};

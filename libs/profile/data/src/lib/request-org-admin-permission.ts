import myzod, { Infer } from 'myzod';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  orgId: myzod.string(),
});

type Payload = Infer<typeof payloadSchema>;

export const requestOrgAdminPermission = async (orgId: string) => {
  const url = `${MW_URL}/users/orgs/request-affiliation`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `requestOrgAccess`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: { orgId },
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<MessageResponse, Payload>(
    url,
    options,
  );

  if (!success) throw new Error(message);

  return { success, message };
};

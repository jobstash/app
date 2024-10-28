import {
  ManagedOrgPayload,
  managedOrgPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateOrg = async (payload: ManagedOrgPayload) => {
  const url = `${MW_URL}/organizations/update/${payload.orgId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: managedOrgPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    ManagedOrgPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

import {
  AuthorizeOrgPayload,
  authorizeOrgPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postAuthorizeOrg = async (payload: AuthorizeOrgPayload) => {
  const url = `${MW_URL}/users/orgs/authorize`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postAuthorizeOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: authorizeOrgPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    AuthorizeOrgPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

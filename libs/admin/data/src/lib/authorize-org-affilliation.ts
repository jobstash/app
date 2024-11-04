import {
  AuthorizeOrgAffiliationPayload,
  authorizeOrgAffiliationPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const authorizeOrgAffiliation = async (
  payload: AuthorizeOrgAffiliationPayload,
) => {
  const url = `${MW_URL}/users/orgs/authorize`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `authorizeOrgAffiliation`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: authorizeOrgAffiliationPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<
    MessageResponse,
    AuthorizeOrgAffiliationPayload
  >(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};

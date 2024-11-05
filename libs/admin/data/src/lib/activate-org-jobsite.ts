import {
  OrgJobsitePayload,
  orgJobsitePayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const activateOrgJobsite = async (payload: OrgJobsitePayload) => {
  const url = `${MW_URL}/organizations/jobsites/activate`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `activateOrgJobsite`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: orgJobsitePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    OrgJobsitePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

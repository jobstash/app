import {
  UpdateApplicantListPayload,
  updateApplicantListPayloadSchema,
} from '@jobstash/profile/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateApplicantList = async (
  orgId: string,
  payload: UpdateApplicantListPayload,
) => {
  const url = `${MW_URL}/jobs/org/${orgId}/applicants`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateApplicantList`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateApplicantListPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateApplicantListPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

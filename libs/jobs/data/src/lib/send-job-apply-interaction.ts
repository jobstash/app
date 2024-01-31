import {
  JobApplyInteractionPayload,
  jobApplyInteractionPayloadSchema,
} from '@jobstash/jobs/core';
import {
  messageResponseSchema,
  MW_URL,
  MwMessageResponse,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const sendJobApplyInteraction = async (shortUUID: string) => {
  const url = `${MW_URL}/profile/jobs/apply`;

  const payload = { shortUUID };

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: 'sendJobApplyInteraction',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: jobApplyInteractionPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MwMessageResponse, JobApplyInteractionPayload>(url, options);
};

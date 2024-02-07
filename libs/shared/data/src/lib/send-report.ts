import {
  MW_URL,
  MwMessageResponse,
  mwMessageResponseSchema,
  ReportPayload,
  reportPayloadSchema,
} from '@jobstash/shared/core';

import { mwFetch } from './mw-fetch';

export const sendReport = async (payload: ReportPayload) => {
  const url = `${MW_URL}/profile/report`;

  const options = {
    method: 'POST' as const,
    responseSchema: mwMessageResponseSchema,
    sentryLabel: 'sendReport',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: reportPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MwMessageResponse, ReportPayload>(url, options);
};

import myzod from 'myzod';

import {
  Jobsite,
  jobsiteSchema,
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const createProjectJobsite = async (payload: Jobsite) => {
  const parseResult = jobsiteSchema.try(payload);
  if (parseResult instanceof myzod.ValidationError) {
    throw new TypeError('Invalid url or jobsite type');
  }

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `createProjectJobsite`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: parseResult,
    payloadSchema: jobsiteSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse, Jobsite>(
    `${MW_URL}/projects/jobsites/create`,
    options,
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
};

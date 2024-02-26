import {
  GithubLoginPayload,
  githubLoginPayloadSchema,
} from '@jobstash/auth/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const githubLogin = async (payload: GithubLoginPayload) => {
  const url = `${MW_URL}/github/github-login`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: 'githubLogin',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: githubLoginPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MessageResponse, GithubLoginPayload>(url, options);
};

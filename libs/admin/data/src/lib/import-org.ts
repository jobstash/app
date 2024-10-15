import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

interface Payload {
  name: string;
  url: string;
}

export const importOrg = async ({ name, url }: Payload) => {
  if (!name) throw new Error('Organization name is required');
  if (!url) throw new Error('Organization website is required');

  let domain: string;

  try {
    domain = new URL(url).hostname;
  } catch {
    throw new Error('Invalid Org URL');
  }

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1000));

  return {
    success: true,
    message: '',
  };

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `getPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    paylaod: {
      name,
      url: domain,
    },
  };

  const response = await mwFetch<MessageResponse>(
    `${MW_URL}/organizations/id/${domain}`,
    options,
  );

  if (!response.success) {
    throw new Error(response.message);
  }

  return response;
};

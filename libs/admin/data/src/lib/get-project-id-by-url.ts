import myzod, { Infer } from 'myzod';

import { messageResponseSchema, MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProjectIdByUrl = async (url: string) => {
  let domain: string;

  try {
    domain = new URL(url).hostname;
  } catch {
    throw new Error('Invalid Org URL');
  }

  const options = {
    responseSchema,
    sentryLabel: `getProjectIdByUrl`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  try {
    const response = await mwFetch<IResponse>(
      `${MW_URL}/projects/id/${domain}`,
      options,
    );
    return response.data;
  } catch {
    // Fail silently, we're only polling
    // throw new Error(response.message);
    console.log(`Poll: still waiting for orgId for ${domain}`);
    return null;
  }
};

const responseSchema = messageResponseSchema.and(
  myzod.object({
    data: myzod.string().optional(),
  }),
);

type IResponse = Infer<typeof responseSchema>;

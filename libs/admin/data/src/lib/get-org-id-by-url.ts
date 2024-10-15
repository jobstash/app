import myzod, { Infer } from 'myzod';

import { messageResponseSchema, MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getOrgIdByUrl = async (url: string) => {
  let domain: string;

  try {
    domain = new URL(url).hostname;
  } catch {
    throw new Error('Invalid Org URL');
  }

  const options = {
    responseSchema,
    sentryLabel: `getPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<IResponse>(
    `${MW_URL}/organizations/id/${domain}`,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return response.data;
};

const responseSchema = messageResponseSchema.and(
  myzod.object({
    data: myzod.string().optional(),
  }),
);

type IResponse = Infer<typeof responseSchema>;

import myzod, { Infer } from 'myzod';

import { atsClientSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const leverUrlResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: atsClientSchema,
});

type LeverUrlResponse = Infer<typeof leverUrlResponseSchema>;

export const getATSClient = async () => {
  const url = `${MW_URL}/scorer/client`;

  const options = {
    responseSchema: leverUrlResponseSchema,
    sentryLabel: `getATSClient`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<LeverUrlResponse>(url, options);

  return response.data;
};

import myzod, { Infer } from 'myzod';

import { atsClientSchema } from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: atsClientSchema,
});

type AtsClientResponse = Infer<typeof responseSchema>;

export const getATSClient = async () => {
  const url = `${MW_URL}/scorer/client`;

  const options = {
    responseSchema,
    sentryLabel: `getATSClient`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<AtsClientResponse>(url, options);

  return response.data;
};

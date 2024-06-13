import myzod, { Infer } from 'myzod';

import { atsPreferenceSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

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

const leverUrlResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.object({
    id: myzod.string().nullable(),
    name: myzod.string().nullable(),
    orgId: myzod.string().nullable(),
    hasWebhooks: myzod.boolean(),
    preferences: atsPreferenceSchema.nullable(),
  }),
});
type LeverUrlResponse = Infer<typeof leverUrlResponseSchema>;

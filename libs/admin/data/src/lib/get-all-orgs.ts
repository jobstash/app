import myzod, { Infer } from 'myzod';

import { orgItemSchema } from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAllOrgs = async () => {
  const url = `${MW_URL}/organizations`;

  const options = {
    responseSchema,
    sentryLabel: 'getAllOrgs',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<AllOrgsResponse>(url, options);

  return response.data;
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(orgItemSchema),
});
type AllOrgsResponse = Infer<typeof responseSchema>;

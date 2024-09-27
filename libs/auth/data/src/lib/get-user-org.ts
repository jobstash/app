import myzod, { Infer } from 'myzod';

import { userOrgSchema } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const userOrgDtoSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(userOrgSchema),
});

type UserOrgDto = Infer<typeof userOrgDtoSchema>;

export const getUserOrg = async () => {
  const url = `${MW_URL}/profile/organizations/verified`;

  const options = {
    responseSchema: userOrgDtoSchema,
    sentryLabel: `getUserOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } = await mwFetch<UserOrgDto>(url, options);
  if (!success) {
    throw new Error(message);
  }

  return data;
};

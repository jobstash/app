import myzod, { Infer } from 'myzod';

import { affiliatedOrgSchema } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const userOrgDtoSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(affiliatedOrgSchema),
});

type UserOrgDto = Infer<typeof userOrgDtoSchema>;

export const getAffiliatedOrgs = async () => {
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

import myzod, { Infer } from 'myzod';

import { profileVerifiedOrgSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(profileVerifiedOrgSchema),
});

type ProfileAuthorizedOrgResponse = Infer<typeof responseSchema>;

export const getProfileAuthorizedOrgs = async () => {
  const url = `${MW_URL}/profile/organizations/authorized`;

  const options = {
    responseSchema,
    sentryLabel: `getProfileAuthorizedOrgs`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } =
    await mwFetch<ProfileAuthorizedOrgResponse>(url, options);

  if (!success) {
    throw new Error(message);
  }

  if (!data) {
    throw new Error('Empty profile authorized orgs data');
  }

  return data;
};

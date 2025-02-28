import myzod, { Infer } from 'myzod';

import { profileVerifiedOrgSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(profileVerifiedOrgSchema).optional(),
});

type ProfileVerifiedOrgResponse = Infer<typeof responseSchema>;

export const getProfileVerifiedOrgs = async () => {
  const url = `${MW_URL}/profile/organizations/verified`;

  const options = {
    responseSchema,
    sentryLabel: `getProfileVerifiedOrgs`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } = await mwFetch<ProfileVerifiedOrgResponse>(
    url,
    options,
  );

  if (!success) {
    throw new Error(message);
  }

  if (!data) {
    throw new Error('Empty profile verified orgs data');
  }

  return data;
};

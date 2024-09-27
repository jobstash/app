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
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 300));
  return [
    {
      id: '345',
      name: 'JobStash',
      slug: 'jobstash',
      url: 'https://jobstash.xyz',
      logo: null,
      account: 'johnshift',
    },
    {
      id: '9579',
      name: 'Ecosystem Vision',
      slug: 'ecosystem-vision',
      url: 'https://ecosystem.vision',
      logo: null,
      account: 'john@ecosystem.vision',
    },
  ];

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

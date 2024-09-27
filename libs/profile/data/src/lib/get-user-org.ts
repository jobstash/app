import myzod, { Infer } from 'myzod';

import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const userOrgDtoSchema = myzod.array(
  myzod.object({
    success: myzod.boolean(),
    message: myzod.string(),
    data: myzod
      .array(
        myzod.object({
          id: myzod.string(),
          name: myzod.string(),
        }),
      )
      .optional(),
  }),
);

type UserOrgDto = Infer<typeof userOrgDtoSchema>;

export const getUserOrg = async () => {
  const url = `${MW_URL}/profile/organizations/verified`;

  const options = {
    responseSchema: userOrgDtoSchema,
    sentryLabel: `getUserOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<UserOrgDto>(url, options);
};

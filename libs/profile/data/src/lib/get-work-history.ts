import myzod, { Infer } from 'myzod';

import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getWorkHistory = async (user: string) => {
  const url = `${MW_URL}/users/work-history?users=${user}`;

  const options = {
    responseSchema,
    sentryLabel: `getWorkHistory`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<Infer<typeof responseSchema>>(url, options);
};

const applicantRepositorySchema = myzod.object({
  name: myzod.string(),
  firstContributedAt: myzod.string(),
  lastContributedAt: myzod.string(),
  commitsCount: myzod.number(),
});

const applicantOrganizationSchema = myzod.object({
  login: myzod.string(),
  name: myzod.string(),
  firstContributedAt: myzod.string(),
  lastContributedAt: myzod.string(),
  repositories: myzod.array(applicantRepositorySchema),
});

const responseSchema = myzod
  .object({
    cryptoNative: myzod.boolean(),
    organizations: myzod.array(applicantOrganizationSchema),
  })
  .allowUnknownKeys(true);

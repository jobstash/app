import myzod, { Infer } from 'myzod';

import { profileOrgSubscriptionSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: profileOrgSubscriptionSchema.optional(),
});

type ProfileOrgSubscriptionResponse = Infer<typeof responseSchema>;

export const getProfileOrgSubscriptions = async (orgId: string) => {
  const url = `${MW_URL}/subscriptions/${orgId}`;

  const options = {
    responseSchema,
    sentryLabel: `getProfileOrgSubscriptions`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } =
    await mwFetch<ProfileOrgSubscriptionResponse>(url, options);

  if (!success) {
    throw new Error(message);
  }

  if (!data) {
    throw new Error('Empty org subscription data');
  }

  return data;
};

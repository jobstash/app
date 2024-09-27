import myzod, { Infer } from 'myzod';

import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

const jobPromotePaymentUrlDtoSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod
    .object({
      id: myzod.string(),
      url: myzod.string(),
    })
    .optional(),
});

type JobPromoteUrlDto = Infer<typeof jobPromotePaymentUrlDtoSchema>;

export const getJobPromotePaymentUrl = (uuid: string) => {
  const url = `${MW_URL}/jobs/promote/${uuid}`;

  const options = {
    responseSchema: jobPromotePaymentUrlDtoSchema,
    sentryLabel: `getJobPromoteUrl`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<JobPromoteUrlDto>(url, options);
};

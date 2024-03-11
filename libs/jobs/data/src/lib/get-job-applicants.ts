import myzod, { Infer } from 'myzod';

import { jobPostSchema } from '@jobstash/jobs/core';
import { devProfileInfoSchema } from '@jobstash/profile/core';
import { messageResponseSchema, MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobApplicants = async (orgId: string) => {
  const url = `${MW_URL}/jobs/org/${orgId}/applicants`;

  const options = {
    responseSchema,
    sentryLabel: `getJobApplicants`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ResponseSchema>(url, options);

  return response.data;
};

const jobPostWithApplicantSchema = myzod.intersection(
  myzod.omit(jobPostSchema, ['organization']),
  myzod.object({
    applicants: myzod.array(devProfileInfoSchema),
  }),
);

const responseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: myzod.array(jobPostWithApplicantSchema),
  }),
);
type ResponseSchema = Infer<typeof responseSchema>;

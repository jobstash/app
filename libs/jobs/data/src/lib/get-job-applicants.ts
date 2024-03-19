import myzod, { Infer } from 'myzod';

import { jobApplicantSchema } from '@jobstash/jobs/core';
import { messageResponseSchema, MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobApplicants = async (
  orgId: string,
  list: 'all' | 'new' | 'shortlisted' | 'archived',
) => {
  const url = `${MW_URL}/jobs/org/${orgId}/applicants?list=${list}`;

  const options = {
    responseSchema,
    sentryLabel: `getJobApplicants`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ResponseSchema>(url, options);

  return response.data;
};

const responseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: myzod.array(jobApplicantSchema),
  }),
);
type ResponseSchema = Infer<typeof responseSchema>;

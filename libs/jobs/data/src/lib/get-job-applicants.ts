import { fakeJobApplicants } from '@jobstash/jobs/testutils';
import myzod, { Infer } from 'myzod';

import { jobApplicantSchema } from '@jobstash/jobs/core';
import { messageResponseSchema, MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobApplicants = async (orgId: string) => {
  // // eslint-disable-next-line no-promise-executor-return
  // await new Promise((r) => setTimeout(r, 2000));

  // return fakeJobApplicants();

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

const responseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: myzod.array(jobApplicantSchema),
  }),
);
type ResponseSchema = Infer<typeof responseSchema>;

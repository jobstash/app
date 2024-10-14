import myzod, { Infer } from 'myzod';

import { projectItemSchema } from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAllProjects = async () => {
  const url = `${MW_URL}/projects`;

  const options = {
    responseSchema,
    sentryLabel: 'getAllOrgs',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<AllProjectsResponse>(url, options);

  return response.data;
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(projectItemSchema).optional(),
});
type AllProjectsResponse = Infer<typeof responseSchema>;

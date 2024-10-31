import myzod, { Infer } from 'myzod';

import { projectItemSchema } from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProjectItem = async (projectId: string) => {
  const url = `${MW_URL}/projects/${projectId}`;

  const options = {
    responseSchema,
    sentryLabel: 'getProjectItem',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<AllProjectsResponse>(url, options);

  return response.data;
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: projectItemSchema,
});
type AllProjectsResponse = Infer<typeof responseSchema>;

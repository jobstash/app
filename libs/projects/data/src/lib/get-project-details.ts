import { ProjectDetails, projectDetailsSchema } from '@jobstash/projects/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProjectDetails = async (projectId: string) => {
  const url = `${MW_URL}/projects/details/${projectId}`;

  const options = {
    responseSchema: projectDetailsSchema,
    sentryLabel: `getProjectDetails`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ProjectDetails>(url, options);
};

import { ProjectDetails, projectDetailsSchema } from '@jobstash/projects/core';
import { MW_URL } from '@jobstash/shared/core';
import { getEcosystemHeader } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';
interface Props {
  projectId: string;
  ssrHost?: string;
}

export const getProjectDetails = async ({ projectId, ssrHost }: Props) => {
  const url = `${MW_URL}/projects/details/${projectId}`;

  const options = {
    responseSchema: projectDetailsSchema,
    sentryLabel: `getProjectDetails`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      ...getEcosystemHeader(ssrHost),
    },
  };

  return mwFetch<ProjectDetails>(url, options);
};

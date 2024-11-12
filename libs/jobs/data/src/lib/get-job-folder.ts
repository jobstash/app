import {
  GetJobFolderResponse,
  getJobFolderResponse,
} from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobFolder = async (id: string) => {
  const url = `${MW_URL}/jobs/folder/${id}`;

  const options = {
    responseSchema: getJobFolderResponse,
    sentryLabel: `getJobFolder`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<GetJobFolderResponse>(url, options);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
};

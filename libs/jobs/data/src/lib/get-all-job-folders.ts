import {
  GetAllJobFoldersResponse,
  getAllJobFoldersResponse,
} from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAllJobFolders = async () => {
  const url = `${MW_URL}/jobs/folders`;

  const options = {
    responseSchema: getAllJobFoldersResponse,
    sentryLabel: `getAllJobFolders`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<GetAllJobFoldersResponse>(url, options);
};

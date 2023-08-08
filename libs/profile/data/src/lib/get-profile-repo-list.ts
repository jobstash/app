import {
  type ProfileRepoListQueryPage,
  profileRepoListQueryPageSchema,
} from '@jobstash/profile/core';
import { PAGE_SIZE } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileRepoList = async (
  page: number,
): Promise<ProfileRepoListQueryPage> => {
  //
  // const url = `${MW_URL}/profile/repositories?page=${page.toSTring()}&limit=${PAGE_SIZE}&wallet=${wallet}`;
  const url = `/api/fakers/profile/repositories?page=${page.toString()}&limit=${PAGE_SIZE}`;

  const options = {
    responseSchema: profileRepoListQueryPageSchema,
    sentryLabel: 'getProfileRepoList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ProfileRepoListQueryPage>(url, options);
};

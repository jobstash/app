import {
  type ProfileOrgReviewListQueryPage,
  profileOrgReviewListQueryPageSchema,
} from '@jobstash/profile/core';
import { PAGE_SIZE } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileOrgReviewList = async (
  page: number,
  wallet: `0x${string}` | undefined,
): Promise<ProfileOrgReviewListQueryPage> => {
  //
  // const url = `${MW_URL}/profile/repositories?page=${page.toSTring()}&limit=${PAGE_SIZE}&wallet=${wallet}`;
  const url = `/api/fakers/profile/reviews?page=${page.toString()}&limit=${PAGE_SIZE}&wallet=${wallet}`;

  const options = {
    responseSchema: profileOrgReviewListQueryPageSchema,
    sentryLabel: 'getProfileOrgReviewList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ProfileOrgReviewListQueryPage>(url, options);
};

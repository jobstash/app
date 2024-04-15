//
// import { fakeProfileOrgReviewList } from '@jobstash/profile/testutils';

import {
  type ProfileOrgReview,
  type ProfileOrgReviewListResponse,
  profileOrgReviewListResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileOrgReviewList = async (): Promise<
  ProfileOrgReview[]
> => {
  //
  // const url = `/api/fakers/profile/reviews?page=${page.toString()}&limit=${PAGE_SIZE}`;
  const url = `${MW_URL}/profile/organizations`;

  const options = {
    responseSchema: profileOrgReviewListResponseSchema,
    sentryLabel: 'getProfileOrgReviewList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } =
    await mwFetch<ProfileOrgReviewListResponse>(url, options);

  if (!success) throw new Error(message);

  return data;

  //
  // return fakeProfileOrgReviewList();
};

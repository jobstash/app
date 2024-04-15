import { faker } from '@faker-js/faker';
import { fakeOrgReview } from '@jobstash/organizations/testutils';

import { ProfileOrgReview } from '@jobstash/profile/core';

import { fakeProfileOrg } from './fake-profile-org';

export const fakeProfileOrgReview = (): ProfileOrgReview => ({
  ...fakeOrgReview(),
  org: fakeProfileOrg(),
});

export const fakeProfileOrgReviewList = (min = 4, max = 8) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeProfileOrgReview(),
  );

import { faker } from '@faker-js/faker';
import { fakeNullable } from '@jobstash/shared/testutils';

import {
  ORG_REVIEW_LOCATIONS,
  ORG_REVIEW_TIMEZONES,
  OrgCompensation,
  OrgRating,
  OrgReview,
  OrgStaffReview,
} from '@jobstash/organizations/core';

export const fakeOrgStarRating = () =>
  fakeNullable(faker.number.int({ min: 0, max: 5 }));

export const fakeOrgRating = (): OrgRating => ({
  benefits: fakeOrgStarRating(),
  careerGrowth: fakeOrgStarRating(),
  diversityInclusion: fakeOrgStarRating(),
  management: fakeOrgStarRating(),
  product: fakeOrgStarRating(),
  compensation: fakeOrgStarRating(),
  onboarding: fakeOrgStarRating(),
  workLifeBalance: fakeOrgStarRating(),
});

export const fakeOrgCompensation = (): OrgCompensation => ({
  offersTokenAllocation: faker.datatype.boolean(),
  salary: faker.number.int({ min: 10_000, max: 300_000 }),
  currency: faker.finance.currencyCode(),
});

export const fakeOrgStaffReview = (): OrgStaffReview => ({
  id: fakeNullable(faker.string.uuid()),
  title: faker.lorem.words({ min: 3, max: 6 }),
  location: fakeNullable(faker.helpers.arrayElement(ORG_REVIEW_LOCATIONS)),
  timezone: fakeNullable(faker.helpers.arrayElement(ORG_REVIEW_TIMEZONES)),
  pros: faker.lorem.sentences({ min: 2, max: 5 }),
  cons: fakeNullable(faker.lorem.sentences({ min: 2, max: 5 })),
});

export const fakeOrgReview = (): OrgReview => ({
  membershipStatus: faker.lorem.word(),
  startDate: faker.date.past({ years: 2 }).getDate(),
  endDate: faker.date.recent().getDate(),
  reviewedTimestamp: 0,
  commitCount: 0,
  compensation: fakeOrgCompensation(),
  rating: fakeOrgRating(),
  review: fakeOrgStaffReview(),
});

export const fakeOrgReviewList = (min = 4, max = 8): OrgReview[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeOrgReview(),
  );

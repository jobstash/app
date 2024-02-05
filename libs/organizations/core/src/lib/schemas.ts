import myzod from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobCardSetSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
} from '@jobstash/shared/core';

import {
  ORG_REVIEW_LOCATIONS,
  ORG_REVIEW_TIMEZONES,
  ORG_REVIEW_WORKING_HOURS,
} from './constants';

export const orgListItemSchema = myzod
  .object({
    orgId: myzod.string().min(1),
    url: myzod.string().min(1),
    name: myzod.string().min(1),
    location: myzod.string().min(1),
    jobCount: myzod.number(),
    projectCount: myzod.number(),
    lastFundingDate: myzod.number(),
    lastFundingAmount: myzod.number(),
    headcountEstimate: myzod.number().nullable(),
    logoUrl: myzod.string().min(1).nullable(),
    aggregateRating: myzod.number().min(0).max(5),
    reviewCount: myzod.number(),
    community: myzod.array(myzod.string()),
  })
  .allowUnknownKeys(true);

const orgProjectSchema = myzod
  .intersection(projectInfoSchema, projectMoreInfoSchema)
  .allowUnknownKeys(true);

export const orgJobSchema = myzod
  .intersection(
    jobCardSetSchema,
    myzod.object({
      id: myzod.string().min(1),
      title: myzod.string().min(1),
      shortUUID: myzod.string().min(1),
      summary: myzod.string().min(1).nullable(),
    }),
  )
  .allowUnknownKeys(true);

const starRatingSchema = myzod.number().min(0).max(5).nullable();
export const orgRatingSchema = myzod.object({
  benefits: starRatingSchema,
  careerGrowth: starRatingSchema,
  diversityInclusion: starRatingSchema,
  management: starRatingSchema,
  product: starRatingSchema,
  compensation: starRatingSchema,
  onboarding: starRatingSchema,
  workLifeBalance: starRatingSchema,
});
export const orgCompensationSchema = myzod.object({
  offersTokenAllocation: myzod.boolean(),
  salary: myzod.number().nullable(),
  currency: myzod.string().nullable(),
});
export const orgLocationSchema = myzod.literals(...ORG_REVIEW_LOCATIONS);
export const orgTimezoneSchema = myzod.literals(...ORG_REVIEW_TIMEZONES);
export const orgWorkingHourSchema = myzod.literals(...ORG_REVIEW_WORKING_HOURS);
export const orgWorkingHoursSchema = myzod.object({
  start: orgWorkingHourSchema.nullable(),
  end: orgWorkingHourSchema.nullable(),
});
export const orgStaffReviewSchema = myzod.object({
  id: myzod.string().min(1).nullable(),
  title: myzod.string().nullable(),
  location: orgLocationSchema.nullable(),
  timezone: orgTimezoneSchema.nullable(),
  workingHours: orgWorkingHoursSchema,
  pros: myzod.string().min(1).max(500).nullable(),
  cons: myzod.string().min(1).max(500).nullable(),
});
export const orgReviewSchema = myzod.object({
  membershipStatus: myzod.string().min(1).nullable(),
  startDate: myzod.number().nullable(),
  endDate: myzod.number().nullable(),
  reviewedTimestamp: myzod.number().nullable(),
  commitCount: myzod.number().nullable(),
  compensation: orgCompensationSchema,
  rating: orgRatingSchema,
  review: orgStaffReviewSchema,
});

export const orgDetailsSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      projects: myzod.array(orgProjectSchema),
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      jobs: myzod.array(orgJobSchema),
      aggregateRating: myzod.number().min(0).max(5),
      aggregateRatings: orgRatingSchema,
      reviewCount: myzod.number(),
      reviews: myzod.array(myzod.omit(orgReviewSchema, ['compensation'])),
    }),
  )
  .allowUnknownKeys(true);

export const orgListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(orgListItemSchema),
});

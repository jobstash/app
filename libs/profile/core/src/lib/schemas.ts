import myzod from 'myzod';

import {
  orgInfoSchema,
  repositoryInfoSchema,
  technologySchema,
} from '@jobstash/shared/core';

export const profileRepoTechnology = myzod.intersection(
  technologySchema,
  myzod.object({
    canTeach: myzod.boolean(),
  }),
);

export const profileRepoSchema = myzod.intersection(
  repositoryInfoSchema,
  myzod.object({
    org: myzod.object({
      name: myzod.string().min(1),
      logo: myzod.string().nullable(),
      url: myzod.string().min(1),
    }),
    technologies: myzod.array(profileRepoTechnology),
    contribution: myzod.object({
      summary: myzod.string(),
      count: myzod.number(),
    }),
  }),
);

export const profileRepoListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(profileRepoSchema),
});

export const profileOrgReviewSalarySchema = myzod.object({
  currency: myzod.object({
    value: myzod.string().nullable(),
    options: myzod.array(myzod.string()),
  }),
  amount: myzod.number().nullable(),
  token: myzod.object({
    value: myzod.string().nullable(),
    options: myzod.array(myzod.string()),
    noAllocation: myzod.boolean(),
  }),
});

export const profileOrgReviewRatingSchema = myzod.object({
  management: myzod.number().min(0).max(5).nullable(),
  careerGrowth: myzod.number().min(0).max(5).nullable(),
  benefits: myzod.number().min(0).max(5).nullable(),
  workLifeBalance: myzod.number().min(0).max(5).nullable(),
  cultureValues: myzod.number().min(0).max(5).nullable(),
  diversityInclusion: myzod.number().min(0).max(5).nullable(),
  interviewProcess: myzod.number().min(0).max(5).nullable(),
});

export const profileOrgReviewYourReviewSchema = myzod.object({
  headline: myzod.string().nullable(),
  pros: myzod.string().nullable(),
  cons: myzod.string().nullable(),
});

export const profileOrgReviewSchema = myzod.object({
  org: orgInfoSchema,
  membershipStatus: myzod.string().nullable(),
  startDate: myzod.number().nullable(),
  endDate: myzod.number().nullable(),
  commitCount: myzod.number().nullable(),
  salary: profileOrgReviewSalarySchema,
  rating: profileOrgReviewRatingSchema,
  review: profileOrgReviewYourReviewSchema,
});

export const profileOrgReviewListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(profileOrgReviewSchema),
});

export const profileInfoSchema = myzod.object({
  avatar: myzod.string().min(1),
  username: myzod.string().min(1),
  availableForWork: myzod.boolean(),
  contact: myzod.object({
    options: myzod.array(myzod.string().min(1)),
    preferred: myzod.string().nullable(),
    value: myzod.string().nullable(),
  }),
});

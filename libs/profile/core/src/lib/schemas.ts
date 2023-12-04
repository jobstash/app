import myzod from 'myzod';

import {
  orgInfoSchema,
  repositoryInfoSchema,
  tagSchema,
} from '@jobstash/shared/core';

export const profileRepoTag = myzod.intersection(
  tagSchema,
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
    tags: myzod.array(profileRepoTag),
    contribution: myzod.object({
      summary: myzod.string().nullable(),
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
  selectedCurrency: myzod.string().nullable(),
  amount: myzod.number().nullable(),
  offersTokenAllocation: myzod.boolean(),
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
  reviewedTimestamp: myzod.number(),
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
  avatar: myzod.string().min(1).nullable(),
  username: myzod.string().min(1).nullable(),
  availableForWork: myzod.boolean().nullable(),
  contact: myzod.object({
    preferred: myzod.string().nullable(),
    value: myzod.string().nullable(),
  }),
});

export const profileInfoResponseSchema = myzod.object({
  data: profileInfoSchema,
  success: myzod.boolean(),
  message: myzod.string(),
});

export const profileInfoPayloadSchema = profileInfoSchema;

export const profileSkillSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  normalizedName: myzod.string().min(1),
  canTeach: myzod.boolean(),
});

export const profileSkillResponseSchema = myzod.object({
  data: myzod.array(profileSkillSchema),
  success: myzod.boolean(),
  message: myzod.string(),
});

export const profileSkillsPayloadSchema = myzod.object({
  skills: myzod.array(profileSkillSchema),
});

export const profileShowcaseSchema = myzod.object({
  label: myzod.string().min(1),
  url: myzod.string().min(1),
});

export const profileShowcaseResponseSchema = myzod.object({
  data: myzod.array(profileShowcaseSchema),
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileShowcasePayloadSchema = myzod.object({
  showcase: myzod.array(profileShowcaseSchema),
});

export const profileRepoTagPayloadSchema = myzod.object({
  id: myzod.number(),
  tagsUsed: myzod.array(profileSkillSchema),
});

export const profileRepoTagResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileRepoContributionPayloadSchema = myzod.object({
  id: myzod.number(),
  contribution: myzod.string().min(1),
});

export const profileRepoContributionResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

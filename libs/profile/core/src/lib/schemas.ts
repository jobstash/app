import myzod from 'myzod';

import { repositoryInfoSchema, technologySchema } from '@jobstash/shared/core';

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

export const profileOrgReviewSchema = myzod.object({
  org: myzod.object({
    id: myzod.string().min(1),
    orgId: myzod.string().min(1),
    location: myzod.string().min(1),
  }),
  rating: myzod.number().min(1).max(5).nullable(),
  membershipStatus: myzod.string().nullable(),
  startDate: myzod.number().nullable(),
  endDate: myzod.number().nullable(),
  commitCount: myzod.number().nullable(),
});

export const profileOrgReviewListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(profileOrgReviewSchema),
});

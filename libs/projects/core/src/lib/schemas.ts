import myzod from 'myzod';

import {
  fundingRoundSchema,
  grantFundingSchema,
  investorSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  tagSchema,
} from '@jobstash/shared/core';

export const projectAllInfoSchema = myzod.intersection(
  projectInfoSchema,
  projectMoreInfoSchema,
);

export const projectOrgSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      grants: myzod.array(grantFundingSchema),
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      tags: myzod.array(tagSchema),
      aggregateRating: myzod.number().min(0).max(5),
      reviewCount: myzod.number(),
    }),
  )
  .allowUnknownKeys(true);

export const projectDetailsSchema = myzod
  .intersection(
    projectAllInfoSchema,
    myzod.object({
      organizations: myzod.array(projectOrgSchema),
    }),
  )
  .allowUnknownKeys(true);

export const projectListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(projectInfoSchema),
});

import myzod from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobCardSetSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
} from '@jobstash/shared/core';

export const orgListItemSchema = myzod.object({
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
});

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

export const orgDetailsSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      projects: myzod.array(orgProjectSchema),
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      jobs: myzod.array(orgJobSchema),
    }),
  )
  .allowUnknownKeys(true);

export const orgListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(orgListItemSchema),
});

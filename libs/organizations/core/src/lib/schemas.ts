import myzod from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
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
  logo: myzod.string().min(1).nullable(),
});

const orgProjectSchema = myzod
  .intersection(projectInfoSchema, projectMoreInfoSchema)
  .allowUnknownKeys(true);

export const orgDetailsSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      projects: myzod.array(orgProjectSchema),
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      jobs: myzod.array(jobInfoSchema),
    }),
  )
  .allowUnknownKeys(true);

export const orgListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(orgListItemSchema),
});

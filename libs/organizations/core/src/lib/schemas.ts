import myzod from 'myzod';

import { projectSchema } from '@jobstash/projects/core';
import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
  orgInfoSchema,
  technologySchema,
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
  headCount: myzod.number().nullable(),
  technologies: myzod.array(technologySchema),
});

export const orgDetailsSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      projects: myzod.array(projectSchema),
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

import myzod from 'myzod';

import { projectSchema } from '@jobstash/projects/core';
import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
  orgInfoSchema,
  technologySchema,
} from '@jobstash/shared/core';

export const jobPostSchema = myzod
  .intersection(
    jobInfoSchema,
    myzod.object({
      organization: myzod
        .intersection(
          orgInfoSchema,
          myzod.object({
            fundingRounds: myzod.array(fundingRoundSchema),
            investors: myzod.array(investorSchema),
            projects: myzod.array(projectSchema),
          }),
        )
        .allowUnknownKeys(true),
      technologies: myzod.array(technologySchema),
    }),
  )
  .allowUnknownKeys(true);

export const jobListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(jobPostSchema),
});

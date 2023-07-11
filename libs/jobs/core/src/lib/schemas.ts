import myzod from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
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
            projects: myzod.array(
              myzod
                .intersection(projectInfoSchema, projectMoreInfoSchema)
                .allowUnknownKeys(true),
            ),
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

import myzod from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  technologySchema,
} from '@jobstash/shared/core';

const projectAllInfo = myzod.intersection(
  projectInfoSchema,
  projectMoreInfoSchema,
);

export const projectOrgSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      technologies: myzod.array(technologySchema),
    }),
  )
  .allowUnknownKeys(true);

export const projectDetailsSchema = myzod
  .intersection(
    projectAllInfo,
    myzod.object({
      organization: projectOrgSchema,
    }),
  )
  .allowUnknownKeys(true);

export const projectListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(projectInfoSchema),
});

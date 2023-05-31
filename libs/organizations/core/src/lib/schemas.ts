import myzod from 'myzod';

import { projectSchema } from '@jobstash/projects/core';
import { fundingRoundSchema, investorSchema } from '@jobstash/shared/core';

export const organizationSchema = myzod.object(
  {
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    description: myzod.string().min(1),
    summary: myzod.string().min(1),
    location: myzod.string().min(1),
    url: myzod.string().min(1),
    github: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
    discord: myzod.string().min(1).nullable(),
    telegram: myzod.string().min(1).nullable(),
    docs: myzod.string().min(1).nullable(),
    jobsiteLink: myzod.string().min(1).nullable(),
    fundingRounds: myzod.array(fundingRoundSchema),
    investors: myzod.array(investorSchema),
    headCount: myzod.number().min(1).nullable(),
    projects: myzod.array(projectSchema),
  },
  { allowUnknown: true },
);

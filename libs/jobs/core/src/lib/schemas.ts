import myzod from 'myzod';

import { organizationSchema } from '@jobstash/organizations/core';
import { technologySchema } from '@jobstash/shared/core';

export const jobDetailsSchema = myzod.object({
  id: myzod.string().min(1),
  shortUUID: myzod.string().min(1),
  jobTitle: myzod.string().min(1),
  jobLocation: myzod.string().min(1).nullable(),
  jobCommitment: myzod.string().min(1).nullable(),
  jobCreatedTimestamp: myzod.number(),
  jobApplyPageUrl: myzod.string().min(1),
  minSalaryRange: myzod.number().nullable(),
  maxSalaryRange: myzod.number().nullable(),
  seniority: myzod.string().min(1).nullable(),
  role: myzod.string().min(1).nullable(),
  benefits: myzod.string().min(1).nullable(),
  team: myzod.string().min(1).nullable(),
  culture: myzod.string().min(1).nullable(),
  offersTokenAllocation: myzod.boolean().nullable(),
  paysInCrypto: myzod.boolean().nullable(),
});

export const jobPostSchema = myzod
  .intersection(
    jobDetailsSchema,
    myzod.object({
      organization: organizationSchema,
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

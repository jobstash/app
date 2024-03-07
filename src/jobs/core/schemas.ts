import { z } from 'zod';

import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
  orgInfoSchema,
  projectAllInfoSchema,
  tagSchema,
} from '~/shared/core/schemas';

export const jobOrgSchema = orgInfoSchema.extend({
  fundingRounds: z.array(fundingRoundSchema),
  investors: z.array(investorSchema),
  projects: z.array(projectAllInfoSchema),
});
export type JobOrg = z.infer<typeof jobOrgSchema>;

export const jobDetailsSchema = jobInfoSchema.extend({
  organization: jobOrgSchema,
  tags: z.array(tagSchema),
});
export type JobDetails = z.infer<typeof jobDetailsSchema>;

export const jobListQueryPageSchema = z.object({
  page: z.number(),
  count: z.number(),
  total: z.number(),
  data: z.array(jobDetailsSchema),
});
export type JobListQueryPage = z.infer<typeof jobListQueryPageSchema>;

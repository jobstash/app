import { Infer } from 'myzod';

import {
  jobDetailsSchema,
  jobListQueryPageSchema,
  jobPostOrgSchema,
  jobPostSchema,
} from './schemas';

export type JobDetails = Infer<typeof jobDetailsSchema>;
export type JobPost = Infer<typeof jobPostSchema>;
export type JobPostOrg = Infer<typeof jobPostOrgSchema>;
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;

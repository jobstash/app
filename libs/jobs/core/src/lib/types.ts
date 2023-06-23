import { Infer } from 'myzod';

import {
  jobDetailsSchema,
  jobListQueryPageSchema,
  jobPostSchema,
} from './schemas';

export type JobDetails = Infer<typeof jobDetailsSchema>;
export type JobPost = Infer<typeof jobPostSchema>;
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;

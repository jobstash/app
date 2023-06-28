import { Infer } from 'myzod';

import { jobListQueryPageSchema, jobPostSchema } from './schemas';

export type JobPost = Infer<typeof jobPostSchema>;
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;

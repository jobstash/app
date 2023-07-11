import { Infer } from 'myzod';

import {
  projectDetailsSchema,
  projectListQueryPageSchema,
  projectOrgSchema,
} from './schemas';

export type ProjectOrg = Infer<typeof projectOrgSchema>;
export type ProjectDetails = Infer<typeof projectDetailsSchema>;
export type ProjectListQueryPage = Infer<typeof projectListQueryPageSchema>;

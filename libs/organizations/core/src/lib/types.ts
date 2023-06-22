import { type Infer } from 'myzod';

import {
  organizationSchema,
  orgListQueryPageSchema,
  orgPostSchema,
} from './schemas';

export type Organization = Infer<typeof organizationSchema>;
export type OrgPost = Infer<typeof orgPostSchema>;
export type OrgListQueryPage = Infer<typeof orgListQueryPageSchema>;

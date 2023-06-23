import { type Infer } from 'myzod';

import {
  organizationSchema,
  orgDataSchema,
  orgListQueryPageSchema,
  orgPostSchema,
} from './schemas';

export type Organization = Infer<typeof organizationSchema>;
export type OrgData = Infer<typeof orgDataSchema>;
export type OrgPost = Infer<typeof orgPostSchema>;
export type OrgListQueryPage = Infer<typeof orgListQueryPageSchema>;

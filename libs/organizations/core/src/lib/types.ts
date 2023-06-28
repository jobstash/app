import { type Infer } from 'myzod';

import {
  orgDetailsSchema,
  orgListItemSchema,
  orgListQueryPageSchema,
} from './schemas';

export type OrgListItem = Infer<typeof orgListItemSchema>;
export type OrgDetails = Infer<typeof orgDetailsSchema>;
export type OrgListQueryPage = Infer<typeof orgListQueryPageSchema>;

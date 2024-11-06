import { Infer } from 'myzod';

import {
  jobApplyInteractionPayloadSchema,
  jobApplyInteractionResponseSchema,
  jobBookmarkPayloadSchema,
  jobBookmarksResponseSchema,
  jobListQueryPageSchema,
} from './schemas';

export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;
export type JobBookmarkPayload = Infer<typeof jobBookmarkPayloadSchema>;
export type JobBookmarksResponse = Infer<typeof jobBookmarksResponseSchema>;
export type JobApplyInterfactionResponse = Infer<
  typeof jobApplyInteractionResponseSchema
>;
export type JobApplyInteractionPayload = Infer<
  typeof jobApplyInteractionPayloadSchema
>;

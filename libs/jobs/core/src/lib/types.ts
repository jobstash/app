import { Infer } from 'myzod';

import { NotFoundInfo } from '@jobstash/shared/core';

import {
  jobApplyInteractionPayloadSchema,
  jobApplyInteractionResponseSchema,
  jobBookmarkPayloadSchema,
  jobBookmarksResponseSchema,
  jobListQueryPageSchema,
  jobPostSchema,
} from './schemas';

export type JobPost = Infer<typeof jobPostSchema>;
export type JobListQueryPage = Infer<typeof jobListQueryPageSchema>;
export type JobBookmarkPayload = Infer<typeof jobBookmarkPayloadSchema>;
export type JobBookmarksResponse = Infer<typeof jobBookmarksResponseSchema>;
export type JobApplyInterfactionResponse = Infer<
  typeof jobApplyInteractionResponseSchema
>;
export type JobApplyInteractionPayload = Infer<
  typeof jobApplyInteractionPayloadSchema
>;

export interface JobPostPageSharedProps {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
}

import myzod, { Infer } from 'myzod';

import { profileInfoLocationSchema } from '@jobstash/profile/core';
import {
  jobPostSchema,
  mwMessageResponseSchema,
  tagSchema,
} from '@jobstash/shared/core';

export const jobListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(jobPostSchema),
});

export const jobBookmarkPayloadSchema = myzod.object({
  shortUUID: myzod.string().min(1),
});

export const jobBookmarksResponseSchema = myzod.intersection(
  mwMessageResponseSchema,
  myzod.object({
    data: myzod.array(jobPostSchema),
  }),
);

export const jobApplyInteractionResponseSchema = myzod
  .object({
    success: myzod.literal(false),
    message: myzod.string(),
  })
  .or(
    myzod.object({
      success: myzod.literal(true),
      message: myzod.string(),
      data: myzod.string().optional(),
    }),
  );

export const jobApplyInteractionPayloadSchema = myzod.object({
  shortUUID: myzod.string(),
});

export const jobApplicantSchema = myzod.object({
  user: myzod
    .object({
      wallet: myzod.string().min(1),
      avatar: myzod.string().min(1).nullable(),
      username: myzod.string().min(1).nullable(),
      email: myzod.array(
        myzod.object({
          email: myzod.string(),
          main: myzod.boolean(),
        }),
      ),
      availableForWork: myzod.boolean().nullable(),
      location: profileInfoLocationSchema,
      skills: myzod.array(
        myzod.object({
          id: myzod.string().min(1),
          name: myzod.string().min(1),
          canTeach: myzod.boolean(),
        }),
      ),
      showcases: myzod.array(
        myzod.object({
          id: myzod.string().min(1),
          label: myzod.string().min(1),
          url: myzod.string().min(1),
        }),
      ),
      workHistory: myzod.array(
        myzod.object({
          login: myzod.string(),
          name: myzod.string().nullable(),
          url: myzod.string().nullable(),
          logoUrl: myzod.string().nullable(),
          createdAt: myzod.number(),
          firstContributedAt: myzod.number(),
          lastContributedAt: myzod.number(),
          repositories: myzod.array(
            myzod.object({
              url: myzod.string(),
              name: myzod.string().nullable(),
              createdAt: myzod.number(),
              firstContributedAt: myzod.number(),
              lastContributedAt: myzod.number(),
              commitsCount: myzod.number(),
              cryptoNative: myzod.boolean(),
            }),
          ),
        }),
      ),
    })
    .allowUnknownKeys(true),
  job: myzod
    .object({
      shortUUID: myzod.string(),
      title: myzod.string(),
      classification: myzod.string().min(1).nullable(),
      tags: myzod.array(tagSchema),
    })
    .allowUnknownKeys(true),
  attestations: myzod.object({
    upvotes: myzod.number().nullable(),
    downvotes: myzod.number().nullable(),
  }),
  appliedTimestamp: myzod.number().nullable(),
  calendly: myzod.string().nullable(),
  oss: myzod.boolean(),
  interviewed: myzod.boolean(),
  cryptoNative: myzod.boolean(),
  cryptoAdjacent: myzod.boolean(),
  upcomingTalent: myzod.boolean(),
  ecosystemActivations: myzod.array(myzod.string()),
  note: myzod.string().nullable(),
});
export type JobApplicant = Infer<typeof jobApplicantSchema>;

export const jobsAppliedResponseSchema = myzod.object({
  data: myzod.array(jobPostSchema),
  success: myzod.boolean(),
  message: myzod.string(),
});
export type JobsAppliedResponse = Infer<typeof jobsAppliedResponseSchema>;

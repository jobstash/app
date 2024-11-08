import myzod, { Infer } from 'myzod';

import {
  jobPostSchema,
  mwMessageResponseSchema,
  tagSchema,
  userProfileSchema,
  userShowcaseSchema,
  userSkillSchema,
  userWorkHistorySchema,
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
  oss: myzod.boolean(),
  interviewed: myzod.boolean(),
  cryptoNative: myzod.boolean(),
  cryptoAdjacent: myzod.boolean(),
  upcomingTalent: myzod.boolean(),
  calendly: myzod.string().nullable(),
  attestations: myzod.object({
    upvotes: myzod.number().nullable(),
    downvotes: myzod.number().nullable(),
  }),
  ecosystemActivations: myzod.array(myzod.string()),
  appliedTimestamp: myzod.number().nullable(),
  note: myzod.string().nullable(),
  user: userProfileSchema.and(
    myzod.object({
      skills: myzod.array(userSkillSchema),
      showcases: myzod.array(userShowcaseSchema),
      workHistory: myzod.array(userWorkHistorySchema),
      matchingSkills: myzod.number().nullable(),
    }),
  ),
  job: myzod
    .object({
      shortUUID: myzod.string(),
      title: myzod.string(),
      classification: myzod.string().min(1).nullable(),
      tags: myzod.array(tagSchema),
    })
    .allowUnknownKeys(true),
});
export type JobApplicant = Infer<typeof jobApplicantSchema>;

export const jobsAppliedResponseSchema = myzod.object({
  data: myzod.array(jobPostSchema),
  success: myzod.boolean(),
  message: myzod.string(),
});
export type JobsAppliedResponse = Infer<typeof jobsAppliedResponseSchema>;

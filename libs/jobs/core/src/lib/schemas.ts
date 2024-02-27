import myzod, { Infer } from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobInfoSchema,
  mwMessageResponseSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  tagSchema,
} from '@jobstash/shared/core';

export const jobPostSchema = myzod
  .intersection(
    jobInfoSchema,
    myzod.object({
      organization: myzod
        .intersection(
          orgInfoSchema,
          myzod.object({
            fundingRounds: myzod.array(fundingRoundSchema),
            investors: myzod.array(investorSchema),
            projects: myzod.array(
              myzod
                .intersection(projectInfoSchema, projectMoreInfoSchema)
                .allowUnknownKeys(true),
            ),
            aggregateRating: myzod.number().min(0).max(5),
            reviewCount: myzod.number(),
          }),
        )
        .allowUnknownKeys(true),
      tags: myzod.array(tagSchema),
    }),
  )
  .allowUnknownKeys(true);

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

export const jobApplyInteractionPayloadSchema = myzod.object({
  shortUUID: myzod.string(),
});

export const jobApplicantSchema = myzod.object({
  user: myzod.object({
    avatar: myzod.string(),
    name: myzod.string(),
    email: myzod.string(),
  }),
  job: myzod.object({
    title: myzod.string(),
    sub: myzod.string(),
  }),
  date: myzod.number(),
  cryptoNative: myzod.boolean(),
  attestations: myzod.object({
    up: myzod.number(),
    down: myzod.number(),
  }),
  matchingSkills: myzod.number(),
  upcomingTalent: myzod.boolean(),
  oss: myzod.boolean(),
});
export type JobApplicant = Infer<typeof jobApplicantSchema>;

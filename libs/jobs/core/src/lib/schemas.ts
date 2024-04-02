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
            hasUser: myzod.boolean(),
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

// TODO: Update user prop to intersection of devProfileInfo
// TODO: Update job prop to jobDetails schema (or whatever mw returns)
export const jobApplicantSchema = myzod.object({
  user: myzod
    .object({
      wallet: myzod.string().min(1),
      avatar: myzod.string().min(1).nullable(),
      username: myzod.string().min(1).nullable(),
      email: myzod.string().min(1).nullable(),
      availableForWork: myzod.boolean().nullable(),
      location: myzod.object({
        country: myzod.string().nullable(),
        city: myzod.string().nullable(),
      }),
      contact: myzod.object({
        preferred: myzod.string().nullable(),
        value: myzod.string().nullable(),
      }),
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
      //
      // wallet: myzod.string().min(1),
      // contact: myzod.object({
      //   preferred: myzod.string().nullable(),
      //   value: myzod.string().nullable(),
      // }),
      // matchingSkills: myzod.number().nullable(),
      // skills: myzod.array(
      //   myzod.object({
      //     id: myzod.string().min(1),
      //     name: myzod.string().min(1),
      //     canTeach: myzod.boolean(),
      //   }),
      // ),
      // showcases: myzod.array(
      //   myzod.object({
      //     id: myzod.string().min(1),
      //     label: myzod.string().min(1),
      //     url: myzod.string().min(1),
      //   }),
      // ),
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
  upcomingTalent: myzod.boolean(),
});
export type JobApplicant = Infer<typeof jobApplicantSchema>;

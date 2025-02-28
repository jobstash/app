import { UseMutateFunction } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import {
  orgCompensationSchema,
  orgRatingSchema,
  orgReviewSchema,
  orgStaffReviewSchema,
} from '@jobstash/organizations/core';
import {
  MessageResponse,
  messageResponseSchema,
  repositoryInfoSchema,
  tagSchema,
  userSkillSchema,
} from '@jobstash/shared/core';

export const profileRepoTag = myzod.intersection(
  tagSchema,
  myzod.object({
    canTeach: myzod.boolean(),
  }),
);

export const profileRepoSchema = myzod
  .intersection(
    repositoryInfoSchema,
    myzod.object({
      org: myzod.object({
        name: myzod.string().min(1),
        logo: myzod.string().nullable(),
        url: myzod.string().min(1),
      }),
      tags: myzod.array(profileRepoTag),
      contribution: myzod.string().nullable(),
    }),
  )
  .allowUnknownKeys(true);

export const profileRepoListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(profileRepoSchema),
});

export const profileOrgSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  description: myzod.string().min(1),
  orgId: myzod.string().min(1),
  location: myzod.string().min(1),
  summary: myzod.string().min(1),
  altName: myzod.string().min(1).nullable(),
  jobsiteLink: myzod.string().min(1).nullable(),
  updatedTimestamp: myzod.number().nullable(),
  github: myzod.string().min(1).nullable(),
  twitter: myzod.string().min(1).nullable(),
  discord: myzod.string().min(1).nullable(),
  docs: myzod.string().min(1).nullable(),
  website: myzod.string().min(1).nullable(),
  telegram: myzod.string().min(1).nullable(),
  headCount: myzod.number().nullable(),
  logo: myzod.string().min(1).nullable(),
});

export const profileOrgReviewSchema = myzod.intersection(
  orgReviewSchema,
  myzod.object({
    org: profileOrgSchema.allowUnknownKeys(true),
  }),
);

export const profileOrgReviewListResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(profileOrgReviewSchema),
});

export const legacyProfileInfoContactSchema = myzod.object({
  preferred: myzod.string().nullable(),
  value: myzod.string().nullable(),
});

export const userEmailSchema = myzod.object({
  email: myzod.string(),
  main: myzod.boolean(),
});

const orgInternalReferenceSchema = myzod.object({
  referencePersonName: myzod.string().nullable(),
  referencePersonRole: myzod.string().nullable(),
  referenceContact: myzod.string().nullable(),
  referenceContactPlatform: myzod.string().nullable(),
});

export const orgProfileInfoSchema = myzod.object({
  wallet: myzod.string().min(1),
  avatar: myzod.string().min(1).nullable(),
  username: myzod.string().min(1).nullable(),
  email: myzod.array(userEmailSchema),
  linkedin: myzod.string().nullable(),
  calendly: myzod.string().nullable(),
  orgId: myzod.string().nullable(),
  contact: legacyProfileInfoContactSchema,
  subscriberStatus: myzod.object({
    status: myzod.boolean(),
    expires: myzod.number().nullable(),
  }),
  internalReference: orgInternalReferenceSchema,
  linkedWallets: myzod.array(myzod.string()),
});

export const orgProfileInfoResponseSchema = myzod.object({
  data: orgProfileInfoSchema,
  success: myzod.boolean(),
  message: myzod.string(),
});

export const orgProfileInfoPayloadSchema = myzod.object({
  contact: legacyProfileInfoContactSchema,
  linkedin: myzod.string(),
  calendly: myzod.string(),
  internalReference: orgInternalReferenceSchema,
});

const profileTagsUsedSchema = myzod.intersection(
  userSkillSchema,
  myzod.object({
    normalizedName: myzod.string().min(1),
  }),
);

export const profileRepoTagPayloadSchema = myzod.object({
  id: myzod.string().min(1),
  tagsUsed: myzod.array(profileTagsUsedSchema),
});

export const profileRepoTagResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileRepoContributionPayloadSchema = myzod.object({
  id: myzod.string().min(1),
  contribution: myzod.string().min(1).max(500, 'Contribution text is too long'),
});

export const profileRepoContributionResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileOrgSalaryPayloadSchema = myzod.intersection(
  myzod.object({
    orgId: myzod.string().min(1),
  }),
  orgCompensationSchema,
);

export const profileOrgSalaryResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileOrgRatingPayloadSchema = myzod.intersection(
  myzod.object({
    orgId: myzod.string().min(1),
  }),
  orgRatingSchema,
);

export const profileOrgRatingResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileOrgReviewPayloadSchema = myzod.intersection(
  myzod.object({
    orgId: myzod.string().min(1),
    title: myzod
      .string()
      .min(1, 'Title is required')
      .max(128, 'Title is too long'),
  }),
  myzod.omit(orgStaffReviewSchema, ['title']),
);

export const profileOrgReviewResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const updateApplicantListPayloadSchema = myzod.object({
  applicants: myzod.array(
    myzod.object({
      wallet: myzod.string(),
      job: myzod.string(),
    }),
  ),
  list: myzod.literals('shortlisted', 'archived'),
});
export type UpdateApplicantListPayload = Infer<
  typeof updateApplicantListPayloadSchema
>;
export type UpdateApplicantListMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  UpdateApplicantListPayload,
  unknown
>;

export const profileVerifiedOrgSchema = myzod.object({
  id: myzod.string(),
  name: myzod.string(),
  slug: myzod.string(),
  url: myzod.string(),
  logo: myzod.string().nullable(),
  account: myzod.string(),
  credential: myzod.literals(
    'email',
    'github',
    'ecosystemActivation',
    'membership',
  ),
});

/**
 * Org verified by Jobstash that matches user credentials
 */
export type ProfileVerifiedOrg = Infer<typeof profileVerifiedOrgSchema>;

export const profileOrgSubscriptionSchema = myzod.object({
  id: myzod.string(),
  tier: myzod.string(),
  veri: myzod.string(),
  stashAlert: myzod.boolean(),
  extraSeats: myzod.number(),
  status: myzod.literals('active', 'inactive', 'expired'),
  duration: myzod.literals('monthly', 'yearly'),
  createdTimestamp: myzod.number(),
  expiryTimestamp: myzod.number(),
  quota: myzod.object({
    veri: myzod.number(),
    seats: myzod.number(),
    stashPool: myzod.boolean(),
    stashAlert: myzod.boolean(),
    atsIntegration: myzod.boolean(),
    boostedVacancyMultiplier: myzod.number(),
  }),
});

export type ProfileOrgSubscription = Infer<typeof profileOrgSubscriptionSchema>;

export const userSignupPayloadSchema = myzod.object({
  orgId: myzod.string().min(1),
  jobstash: myzod.literals('starter', 'growth', 'pro', 'max').optional(),
  veri: myzod.literals('lite', 'plus', 'elite', 'ultra').optional(),
  stashAlert: myzod.boolean().optional(),
  extraSeats: myzod.number().optional(),
});

export type UserSignupPayload = Infer<typeof userSignupPayloadSchema>;

export const userSignupResponseSchema = messageResponseSchema.and(
  myzod.object({
    data: myzod.string().optional(),
  }),
);

export type UserSignupResponse = Infer<typeof userSignupResponseSchema>;

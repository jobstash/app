import myzod from 'myzod';

import {
  orgCompensationSchema,
  orgRatingSchema,
  orgReviewSchema,
  orgStaffReviewSchema,
} from '@jobstash/organizations/core';
import { repositoryInfoSchema, tagSchema } from '@jobstash/shared/core';

export const profileRepoTag = myzod.intersection(
  tagSchema,
  myzod.object({
    canTeach: myzod.boolean(),
  }),
);

export const profileRepoSchema = myzod.intersection(
  repositoryInfoSchema,
  myzod.object({
    org: myzod.object({
      name: myzod.string().min(1),
      logo: myzod.string().nullable(),
      url: myzod.string().min(1),
    }),
    tags: myzod.array(profileRepoTag),
    contribution: myzod.object({
      summary: myzod.string().nullable(),
      count: myzod.number(),
    }),
  }),
);

export const profileRepoListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(profileRepoSchema),
});

const profileOrgSchema = myzod.object({
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

const profileInfoContactSchema = myzod.object({
  preferred: myzod.string().nullable(),
  value: myzod.string().nullable(),
});

const profileInfoLocationSchema = myzod.object({
  country: myzod.string().nullable(),
  city: myzod.string().nullable(),
});

export const devProfileInfoSchema = myzod.object({
  wallet: myzod.string().min(1),
  avatar: myzod.string().min(1).nullable(),
  username: myzod.string().min(1).nullable(),
  email: myzod.string().min(1).nullable(),
  availableForWork: myzod.boolean().nullable(),
  contact: profileInfoContactSchema,
  location: profileInfoLocationSchema,
});

export const devProfileInfoResponseSchema = myzod.object({
  data: devProfileInfoSchema,
  success: myzod.boolean(),
  message: myzod.string(),
});

export const devProfileInfoPayloadSchema = myzod.object({
  availableForWork: myzod.boolean(),
  contact: profileInfoContactSchema,
  location: profileInfoLocationSchema,
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
  email: myzod.string().min(1).nullable(),
  linkedin: myzod.string().nullable(),
  calendly: myzod.string().nullable(),
  orgId: myzod.string().nullable(),
  contact: profileInfoContactSchema,
  subscriberStatus: myzod.object({
    status: myzod.boolean(),
    expires: myzod.number().nullable(),
  }),
  internalReference: orgInternalReferenceSchema,
});

export const orgProfileInfoResponseSchema = myzod.object({
  data: orgProfileInfoSchema,
  success: myzod.boolean(),
  message: myzod.string(),
});

export const orgProfileInfoPayloadSchema = myzod.object({
  contact: profileInfoContactSchema,
  linkedin: myzod.string(),
  calendly: myzod.string(),
  internalReference: orgInternalReferenceSchema,
});

export const profileSkillSchema = myzod.object({
  id: myzod.string().min(1),
  name: myzod.string().min(1),
  canTeach: myzod.boolean(),
});

export const profileSkillResponseSchema = myzod.object({
  data: myzod.array(profileSkillSchema),
  success: myzod.boolean(),
  message: myzod.string(),
});

export const profileSkillsPayloadSchema = myzod.object({
  skills: myzod.array(profileSkillSchema),
});

export const profileShowcaseSchema = myzod.object({
  id: myzod.string().min(1),
  label: myzod.string().min(1),
  url: myzod.string().min(1),
});

export const profileShowcaseResponseSchema = myzod.object({
  data: myzod.array(profileShowcaseSchema),
  success: myzod.boolean(),
  message: myzod.string().min(1),
});

export const profileShowcasePayloadSchema = myzod.object({
  showcase: myzod.array(myzod.omit(profileShowcaseSchema, ['id'])),
});

const profileTagsUsedSchema = myzod.intersection(
  profileSkillSchema,
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

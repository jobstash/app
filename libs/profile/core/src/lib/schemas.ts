import { UseMutateFunction } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';
import { isAddress } from 'viem';

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
} from '@jobstash/shared/core';

import { ATS_PROVIDERS, CONTACT_FIELDS } from './constants';

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

export const profileInfoContactSchema = myzod.object({
  email: myzod.string().nullable(),
  twitter: myzod.string().nullable(),
  discord: myzod.string().nullable(),
  telegram: myzod.string().nullable(),
  farcaster: myzod.string().nullable(),
  lens: myzod.string().nullable(),
});

export const profileInfoLocationSchema = myzod.object({
  country: myzod.string().nullable(),
  city: myzod.string().nullable(),
});

export const preferredContactSchema = myzod.literals(...CONTACT_FIELDS);

export const devProfileInfoSchema = myzod.object({
  wallet: myzod.string().min(1),
  avatar: myzod.string().min(1).nullable(),
  username: myzod.string().min(1).nullable(),
  email: myzod.string().min(1).nullable(),
  availableForWork: myzod.boolean().nullable(),
  preferred: preferredContactSchema,
  contact: profileInfoContactSchema,
  location: profileInfoLocationSchema,
});

export const devProfileInfoResponseSchema = myzod
  .object({
    data: devProfileInfoSchema,
    success: myzod.boolean(),
    message: myzod.string(),
  })
  .allowUnknownKeys(true);

export const devProfileInfoPayloadSchema = myzod.object({
  availableForWork: myzod.boolean(),
  preferred: preferredContactSchema,
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
  contact: legacyProfileInfoContactSchema,
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
  contact: legacyProfileInfoContactSchema,
  linkedin: myzod.string(),
  calendly: myzod.string(),
  internalReference: orgInternalReferenceSchema,
});

export const profileSkillSchema = myzod
  .object({
    id: myzod.string().min(1),
    name: myzod.string().min(1),
    canTeach: myzod.boolean(),
  })
  .allowUnknownKeys(true);

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

export const devTalentSchema = myzod.intersection(
  devProfileInfoSchema,
  myzod.object({
    skills: myzod.array(profileSkillSchema),
    showcases: myzod.array(profileShowcaseSchema),
    cryptoNative: myzod.boolean(),
    cryptoAjacent: myzod.boolean(),
    ecosystemActivations: myzod.array(myzod.string()),
    workHistory: myzod.array(
      myzod.object({
        login: myzod.string(),
        name: myzod.string(),
        url: myzod.string().nullable(),
        logoUrl: myzod.string().nullable(),
        createdAt: myzod.number(),
        firstContributedAt: myzod.number(),
        lastContributedAt: myzod.number(),
        repositories: myzod.array(
          myzod.object({
            url: myzod.string(),
            name: myzod.string(),
            createdAt: myzod.number(),
            firstContributedAt: myzod.number(),
            lastContributedAt: myzod.number(),
            commitsCount: myzod.number(),
            cryptoNative: myzod.boolean(),
          }),
        ),
      }),
    ),
    note: myzod.string().nullable(),
    attestations: myzod.object({
      upvotes: myzod.number().nullable(),
      downvotes: myzod.number().nullable(),
    }),
  }),
);

export const devTalentResponseSchema = myzod.array(devTalentSchema);

export const atsTrackedNFTSchema = myzod.object({
  id: myzod.string().nullable(),
  name: myzod.string(),
  contractAddress: myzod
    .string()
    .withPredicate(
      (address) => isAddress(address),
      'Address is not a valid ethereum address',
    ),
  network: myzod
    .literals(
      'arbitrum',
      'avalanche',
      'base',
      'blast',
      'celo',
      'ethereum',
      'linea',
      'optimism',
      'palm',
      'polygon',
    )
    .nullable(),
});

export const atsPreferenceSchema = myzod.object({
  id: myzod.string().nullable(),
  platformName: myzod.literals(
    ATS_PROVIDERS.JOBSTASH.platformName,
    ATS_PROVIDERS.LEVER.platformName,
    ATS_PROVIDERS.GREENHOUSE.platformName,
    ATS_PROVIDERS.WORKABLE.platformName,
  ),
  highlightOrgs: myzod.array(myzod.string()),
  ecosystemActivations: myzod.array(atsTrackedNFTSchema),
});

export const atsClientSchema = myzod.object({
  id: myzod.string().nullable(),
  name: myzod.string().nullable(),
  orgId: myzod.string().nullable(),
  hasTags: myzod.boolean(),
  hasWebhooks: myzod.boolean(),
  preferences: atsPreferenceSchema.nullable(),
  applicationCreatedSignatureToken: myzod.string().nullable().optional(),
  candidateHiredSignatureToken: myzod.string().nullable().optional(),
});

export const linkATSPlatformPayloadSchema = myzod.object({
  clientId: myzod.string(),
  orgId: myzod.string(),
});

export const registerATSResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: atsClientSchema,
});

export const registerATSClientPayloadSchema = myzod.object({
  apiToken: myzod.string().optional(),
  userId: myzod.string().optional(),
  workableUrl: myzod.string().optional(),
});

export const updateATSPreferencePayloadSchema = myzod.object({
  clientId: myzod.string(),
  preferences: atsPreferenceSchema,
});

export const retryWebhooksResponseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: myzod
      .object({
        applicationCreatedSignatureToken: myzod.string(),
        candidateHiredSignatureToken: myzod.string(),
      })
      .optional(),
  }),
);

export const retryWebhooksPayloadSchema = myzod.object({
  clientId: myzod.string(),
  apiToken: myzod.string().nullable(),
});

export const updateNotePayloadSchema = myzod.object({
  wallet: myzod.string(),
  note: myzod.string(),
});

import myzod, { Infer } from 'myzod';
import { isAddress } from 'viem';

import {
  fundingRoundSchema,
  investorSchema,
  jobCardSetSchema,
  jobPostSchema,
  messageResponseSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  tagSchema,
} from '@jobstash/shared/core';

import {
  ATS_PROVIDERS,
  ORG_REVIEW_LOCATIONS,
  ORG_REVIEW_TIMEZONES,
  ORG_REVIEW_WORKING_HOURS,
} from './constants';

export const orgListItemSchema = myzod
  .object({
    orgId: myzod.string().min(1),
    url: myzod.string().min(1).nullable(),
    name: myzod.string().min(1),
    location: myzod.string().min(1),
    jobCount: myzod.number(),
    projectCount: myzod.number(),
    lastFundingDate: myzod.number(),
    lastFundingAmount: myzod.number(),
    headcountEstimate: myzod.number().nullable(),
    logoUrl: myzod.string().min(1).nullable(),
    aggregateRating: myzod.number().min(0).max(5),
    reviewCount: myzod.number(),
    community: myzod.array(myzod.string()),
  })
  .allowUnknownKeys(true);

const orgProjectSchema = myzod
  .intersection(projectInfoSchema, projectMoreInfoSchema)
  .allowUnknownKeys(true);

export const orgJobSchema = myzod
  .intersection(
    jobCardSetSchema,
    myzod.object({
      id: myzod.string().min(1),
      title: myzod.string().min(1),
      shortUUID: myzod.string().min(1),
      summary: myzod.string().min(1).nullable(),
    }),
  )
  .allowUnknownKeys(true);

const starRatingSchema = myzod.number().min(0).max(5).nullable();
export const orgRatingSchema = myzod.object({
  benefits: starRatingSchema,
  careerGrowth: starRatingSchema,
  diversityInclusion: starRatingSchema,
  management: starRatingSchema,
  product: starRatingSchema,
  compensation: starRatingSchema,
  onboarding: starRatingSchema,
  workLifeBalance: starRatingSchema,
});
export const orgCompensationSchema = myzod.object({
  offersTokenAllocation: myzod.boolean(),
  salary: myzod.number().nullable(),
  currency: myzod.string().nullable(),
});
export const orgLocationSchema = myzod.literals(...ORG_REVIEW_LOCATIONS);
export const orgTimezoneSchema = myzod.literals(...ORG_REVIEW_TIMEZONES);
export const orgWorkingHourSchema = myzod.literals(...ORG_REVIEW_WORKING_HOURS);
export const orgWorkingHoursSchema = myzod.object({
  start: orgWorkingHourSchema.nullable(),
  end: orgWorkingHourSchema.nullable(),
});

export const orgStaffReviewSchema = myzod.object({
  id: myzod.string().min(1).nullable(),
  title: myzod.string().nullable(),
  location: orgLocationSchema.nullable(),
  timezone: orgTimezoneSchema.nullable(),
  //
  // workingHours: orgWorkingHoursSchema,
  pros: myzod.string().min(1).max(500).nullable(),
  cons: myzod.string().min(1).max(500).nullable(),
});
export const orgReviewSchema = myzod.object({
  membershipStatus: myzod.string().min(1).nullable(),
  startDate: myzod.number().nullable(),
  endDate: myzod.number().nullable(),
  reviewedTimestamp: myzod.number().nullable(),
  commitCount: myzod.number().nullable(),
  compensation: orgCompensationSchema,
  rating: orgRatingSchema,
  review: orgStaffReviewSchema,
});

export const orgDetailsSchema = myzod
  .intersection(
    orgInfoSchema,
    myzod.object({
      projects: myzod.array(orgProjectSchema),
      fundingRounds: myzod.array(fundingRoundSchema),
      investors: myzod.array(investorSchema),
      jobs: myzod.array(orgJobSchema),
      aggregateRating: myzod.number().min(0).max(5),
      aggregateRatings: orgRatingSchema,
      reviewCount: myzod.number(),
      reviews: myzod.array(myzod.omit(orgReviewSchema, ['compensation'])),
    }),
  )
  .allowUnknownKeys(true);

export const orgListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(orgListItemSchema),
});

export const candidateReportPayloadSchema = myzod.object({
  github: myzod.string(),
  wallet: myzod.string(),
});
export type CandidateReportPayload = Infer<typeof candidateReportPayloadSchema>;

const candidateReportUserSchema = myzod.object({
  wallet: myzod.string().nullable(),
  github: myzod.string(),
  cryptoNative: myzod.boolean(),
  averageTenure: myzod.number().nullable(),
  stars: myzod.number().nullable(),
  tags: myzod.array(myzod.string()),
  avatar: myzod.string().nullable(),
});
export type CandidateReportUser = Infer<typeof candidateReportUserSchema>;

const candidateNftSchema = myzod.object({
  name: myzod.string(),
  previewUrl: myzod.string().nullable(),
  timestamp: myzod.number().nullable(),
});
export type CandidateNft = Infer<typeof candidateNftSchema>;

const candidateReportRepositorySchema = myzod.object({
  name: myzod.string(), // Maybe unslugified repo-name e.g. github.com/jobstash/job-frame -> "Job Frame"
  url: myzod.string(), // > e.g. https://github.com/some-user/repo-name or gitlab etc
  tenure: myzod.number(),
  stars: myzod.number(),
  commitCount: myzod.number(),
  timeFirstCommit: myzod.number(),
  timeLastCommit: myzod.number(),
  skills: myzod.array(myzod.string()),
});
export type CandidateReportRepository = Infer<
  typeof candidateReportRepositorySchema
>;

const candidateReportAdjacentRepoSchema = myzod.object({
  name: myzod.string(),
  stars: myzod.number(),
});
export type CandidateReportAdjacentRepo = Infer<
  typeof candidateReportAdjacentRepoSchema
>;

const candidateReportOrganizationSchema = myzod.object({
  name: myzod.string().nullable(),
  avatar: myzod.string(),
  tenure: myzod.number(),
  commits: myzod.number(),
  url: myzod.string().nullable(),
  github: myzod.string(),
  repositories: myzod.array(candidateReportRepositorySchema),
  cryptoNative: myzod.boolean(),
});
export type CandidateReportOrganization = Infer<
  typeof candidateReportOrganizationSchema
>;

export const candidateTopOrgItemSchema = myzod.object({
  name: myzod.string().nullable(),
  github: myzod.string(),
  avatar: myzod.string(),
  tenure: myzod.number(),
  commits: myzod.number(),
  cryptoNative: myzod.boolean(),
});
export type CandidateTopOrgItem = Infer<typeof candidateTopOrgItemSchema>;

const candidateReportSchema = myzod.object({
  user: candidateReportUserSchema,
  topOrganizations: myzod.array(candidateTopOrgItemSchema),
  nfts: myzod.array(candidateNftSchema),
  orgs: myzod.array(candidateReportOrganizationSchema),
  adjacentRepos: myzod.array(candidateReportAdjacentRepoSchema),
});
export type CandidateReport = Infer<typeof candidateReportSchema>;

export const candidateReportResponseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: candidateReportSchema,
  }),
);
export type CandidateReportResponse = Infer<
  typeof candidateReportResponseSchema
>;

export const updateOrgJobPayloadSchema = myzod.object({
  title: myzod.string().nullable(),
  url: myzod.string(),
  classification: myzod.string().nullable(),
  location: myzod.string().nullable(),
  locationType: myzod.string().nullable(),
  seniority: myzod.string().nullable(),
  commitment: myzod.string().nullable(),

  summary: myzod.string().nullable(),
  description: myzod.string().nullable(),
  culture: myzod.string().nullable(),

  requirements: myzod.array(myzod.string()),
  responsibilities: myzod.array(myzod.string()),
  benefits: myzod.array(myzod.string()),

  salary: myzod.number().nullable(),
  minimumSalary: myzod.number().nullable(),
  maximumSalary: myzod.number().nullable(),
  salaryCurrency: myzod.string().nullable(),
  paysInCrypto: myzod.boolean().nullable(),
  offersTokenAllocation: myzod.boolean().nullable(),

  project: myzod.string().nullable(),
  isBlocked: myzod.boolean(),
  isOnline: myzod.boolean(),
  tags: myzod.array(tagSchema),
});

export type UpdateOrgJobPayload = Infer<typeof updateOrgJobPayloadSchema>;

const orgJobProjectSchema = myzod.object({
  id: myzod.string(),
  name: myzod.string(),
});

export const orgJobItemSchema = myzod.intersection(
  jobPostSchema,
  myzod.object({
    isBlocked: myzod.boolean(),
    isOnline: myzod.boolean(),
    project: orgJobProjectSchema.nullable(),
  }),
);
export type OrgJobItem = Infer<typeof orgJobItemSchema>;

export const orgJobListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(orgJobItemSchema),
});
export type OrgJobListQueryPage = Infer<typeof orgJobListQueryPageSchema>;

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
export type ATSTrackedNFT = Infer<typeof atsTrackedNFTSchema>;

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
export type ATSPreference = Infer<typeof atsPreferenceSchema>;

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
export type ATSClient = Infer<typeof atsClientSchema>;

export const linkATSPlatformPayloadSchema = myzod.object({
  clientId: myzod.string(),
  orgId: myzod.string(),
});
export type LinkATSPlatformPayload = Infer<typeof linkATSPlatformPayloadSchema>;

export const registerATSResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: atsClientSchema,
});
export type RegisterATSResponse = Infer<typeof registerATSResponseSchema>;

export const registerATSClientPayloadSchema = myzod.object({
  apiToken: myzod.string().optional(),
  userId: myzod.string().optional(),
  workableUrl: myzod.string().optional(),
});
export type RegisterATSClientPayload = Infer<
  typeof registerATSClientPayloadSchema
>;

export const updateATSPreferencePayloadSchema = myzod.object({
  clientId: myzod.string(),
  preferences: atsPreferenceSchema,
});
export type UpdateATSPreferencePayload = Infer<
  typeof updateATSPreferencePayloadSchema
>;

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
export type RetryWebhooksResponse = Infer<typeof retryWebhooksResponseSchema>;

export const retryWebhooksPayloadSchema = myzod.object({
  clientId: myzod.string(),
  apiToken: myzod.string().nullable(),
});
export type RetryWebhooksPayload = Infer<typeof retryWebhooksPayloadSchema>;

import myzod, { Infer } from 'myzod';

import {
  fundingRoundSchema,
  investorSchema,
  jobCardSetSchema,
  messageResponseSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
} from '@jobstash/shared/core';

import {
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
  wallet: myzod.string(),
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

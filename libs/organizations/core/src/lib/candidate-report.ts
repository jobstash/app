import myzod, { Infer } from 'myzod';

import { messageResponseSchema } from '@jobstash/shared/core';

export const candidateReportPayloadSchema = myzod.object({
  github: myzod.string(),
  wallet: myzod.string(),
});
export type CandidateReportPayload = Infer<typeof candidateReportPayloadSchema>;

const candidateReportUserSchema = myzod.object({
  wallet: myzod.string(),
  avatar: myzod.string(),
  github: myzod.string(),
  cryptoNative: myzod.boolean(),
  averageTenure: myzod.number(),
  stars: myzod.number(),
  tags: myzod.array(myzod.string()),
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
  name: myzod.string(),
  avatar: myzod.string(),
  tenure: myzod.number(),
  commits: myzod.number(),
  url: myzod.string(),
  github: myzod.string(),
  repositories: myzod.array(candidateReportRepositorySchema),
});
export type CandidateReportOrganization = Infer<
  typeof candidateReportOrganizationSchema
>;

export const candidateTopOrgItemSchema = myzod.object({
  name: myzod.string(),
  github: myzod.string(),
  avatar: myzod.string(),
  tenure: myzod.number(),
  commits: myzod.number(),
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

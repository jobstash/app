import { z } from 'zod';

import {
  genericResponseSchema,
  socialsInfoSchema,
} from '~/shared/core/schemas';

import { orgReviewSchema } from '~/orgs/core/schemas';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from './constants';

export const walletRoleSchema = z.union([
  z.literal(CHECK_WALLET_ROLES.ANON),
  z.literal(CHECK_WALLET_ROLES.ADMIN),
  z.literal(CHECK_WALLET_ROLES.DEV),
  z.literal(CHECK_WALLET_ROLES.ORG),
]);
export type WalletRole = z.infer<typeof walletRoleSchema>;

export const walletFlowSchema = z.union([
  z.literal(CHECK_WALLET_FLOWS.ANON),
  z.literal(CHECK_WALLET_FLOWS.PICK_ROLE),
  z.literal(CHECK_WALLET_FLOWS.ADD_GITHUB_REPO),
  z.literal(CHECK_WALLET_FLOWS.ONBOARD_PROFILE),
  z.literal(CHECK_WALLET_FLOWS.ONBOARD_REPO),
  z.literal(CHECK_WALLET_FLOWS.ONBOARD_REVIEWS),
  z.literal(CHECK_WALLET_FLOWS.SIGNUP_COMPLETE),
  z.literal(CHECK_WALLET_FLOWS.ADMIN_SYNONYMS),
  z.literal(CHECK_WALLET_FLOWS.ADMIN_COMPLETE),
  z.literal(CHECK_WALLET_FLOWS.ORG_PROFILE),
  z.literal(CHECK_WALLET_FLOWS.ORG_APPROVAL),
  z.literal(CHECK_WALLET_FLOWS.ORG_COMPLETE),
  z.literal(CHECK_WALLET_FLOWS.ORG_REJECTED),
]);

export type WalletFlow = z.infer<typeof walletFlowSchema>;

export const walletDataSchema = z.object({
  role: walletRoleSchema,
  flow: walletFlowSchema,
});
export type WalletData = z.infer<typeof walletDataSchema>;

export const walletDataResponseSchema = z
  .object({
    data: walletDataSchema,
  })
  .merge(genericResponseSchema);
export type WalletDataResponse = z.infer<typeof walletDataResponseSchema>;

export const candidateOrgSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    orgId: z.string().min(1),
    location: z.string().min(1),
    summary: z.string().min(1),
    altName: z.string().min(1).nullable(),
    jobsiteLink: z.string().min(1).nullable(),
    updatedTimestamp: z.number().nullable(),
    headCount: z.number().nullable(),
    logo: z.string().min(1).nullable(),
  })
  .merge(socialsInfoSchema);
export type CandidateOrg = z.infer<typeof candidateOrgSchema>;

export const candidateOrgReviewSchema = z
  .object({
    org: candidateOrgSchema,
  })
  .merge(orgReviewSchema);
export type CandidateOrgReview = z.infer<typeof candidateOrgReviewSchema>;

export const candidateOrgReviewsResponseSchema = z
  .object({
    data: z.array(candidateOrgReviewSchema),
  })
  .merge(genericResponseSchema);
export type CandidateOrgReviewsResponse = z.infer<
  typeof candidateOrgReviewsResponseSchema
>;

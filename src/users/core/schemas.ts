import { z } from 'zod';

import { genericResponseSchema } from '~/shared/core/schemas';

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

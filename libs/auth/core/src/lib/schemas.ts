import myzod from 'myzod';

import { mwResponseFieldsSchema } from '@jobstash/shared/core';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from './constants';

export const checkWalletRolesSchema = myzod.literals(
  CHECK_WALLET_ROLES.ANON,
  CHECK_WALLET_ROLES.ADMIN,
  CHECK_WALLET_ROLES.DEV,
  CHECK_WALLET_ROLES.ORG,
);

export const checkWalletFlowsSchema = myzod.literals(
  CHECK_WALLET_FLOWS.PICK_ROLE,
  CHECK_WALLET_FLOWS.ADD_GITHUB_REPO,
  CHECK_WALLET_FLOWS.ONBOARD_REPO,
  CHECK_WALLET_FLOWS.ONBOARD_PROFILE,
  CHECK_WALLET_FLOWS.SIGNUP_COMPLETE,
  CHECK_WALLET_FLOWS.ADMIN_SYNONYMS,
);

export const checkWalletDataSchema = myzod.object({
  role: checkWalletRolesSchema,
  flow: checkWalletFlowsSchema,
});

export const siweNonceResponseSchema = myzod.intersection(
  mwResponseFieldsSchema,
  myzod.object({
    data: myzod.string().min(1),
  }),
);

export const siweSessionResponseSchema = myzod.intersection(
  mwResponseFieldsSchema,
  myzod.object({
    data: myzod.object({
      nonce: myzod.string().min(1).optional(),
      address: myzod.string().min(1).optional(),
      token: myzod.string().min(1).optional(),
      role: myzod.string().min(1).optional(),
      flow: myzod.string().min(1).optional(),
      chainId: myzod.number().optional(),
    }),
  }),
);

export const siweCreateMessageResponseSchema = myzod.object({
  siweMessage: myzod.string().min(1),
});

export const siweVerifyPayloadSchema = myzod.object({
  message: myzod.string().min(1),
  signature: myzod.string().min(1),
});

export const siweVerifyResponseSchema = myzod.intersection(
  mwResponseFieldsSchema,
  myzod.object({}),
);
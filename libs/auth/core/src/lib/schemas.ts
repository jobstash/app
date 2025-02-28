import myzod from 'myzod';

import { mwMessageResponseSchema } from '@jobstash/shared/core';

import { PERMISSIONS } from './constants';

export const checkWalletPermissionSchema = myzod.literals(
  ...Object.values(PERMISSIONS),
);

export const checkWalletResponseSchema = myzod.object({
  token: myzod.string(),
  cryptoNative: myzod.boolean(),
  permissions: myzod.array(checkWalletPermissionSchema),
});

export const siweNonceResponseSchema = myzod.intersection(
  mwMessageResponseSchema,
  myzod.object({
    data: myzod.string().min(1),
  }),
);

export const siweSessionResponseSchema = myzod.intersection(
  mwMessageResponseSchema,
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
  mwMessageResponseSchema,
  myzod.object({}),
);

export const githubLoginPayloadSchema = myzod.object({
  code: myzod.string(),
  wallet: myzod.string(),
  role: myzod.string(),
});

export const affiliatedOrgSchema = myzod.object({
  id: myzod.string(),
  name: myzod.string(),
  slug: myzod.string(),
  url: myzod.string(),
  logo: myzod.string().nullable(),
  account: myzod.string(),
  credential: myzod.literals('email', 'github', 'ecosystemActivation'),
});

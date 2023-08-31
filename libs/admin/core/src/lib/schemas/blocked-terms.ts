import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

import { technologySchema } from '@jobstash/shared/core';

export const blockedTechnologiesResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
});

export const blockedTermsResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1).optional(),
  })
  .allowUnknownKeys(true);

export const blockedTermsPayloadSchema = myzod.object({
  technologyNameList: myzod.array(myzod.string().min(1)),
  creatorWallet: myzod.string().min(1),
});

export type BlockedTechnologiesResponse = Infer<
  typeof blockedTechnologiesResponseSchema
>;

export type BlockedTermsResponse = Infer<typeof blockedTermsResponseSchema>;

export type BlockedTermsPayload = Infer<typeof blockedTermsPayloadSchema>;

export type BlockedTermsMutFn = UseMutateFunction<
  BlockedTermsResponse,
  unknown,
  BlockedTermsPayload,
  unknown
>;

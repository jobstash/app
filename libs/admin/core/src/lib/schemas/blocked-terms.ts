import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

import { tagSchema } from '@jobstash/shared/core';

export const blockedTagsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(tagSchema),
});

export const blockedTermsResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1).optional(),
  })
  .allowUnknownKeys(true);

export const blockedTermsPayloadSchema = myzod.object({
  tagNameList: myzod.array(myzod.string().min(1)),
});

export type BlockedTagsResponse = Infer<typeof blockedTagsResponseSchema>;

export type BlockedTermsResponse = Infer<typeof blockedTermsResponseSchema>;

export type BlockedTermsPayload = Infer<typeof blockedTermsPayloadSchema>;

export type BlockedTermsMutFn = UseMutateFunction<
  BlockedTermsResponse,
  unknown,
  BlockedTermsPayload,
  unknown
>;

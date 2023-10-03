import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

import { type MessageResponse, tagSchema } from '@jobstash/shared/core';

export const preferredTermSchema = myzod.object({
  tag: myzod.string(),
  synoynms: myzod.array(tagSchema),
});

export const preferredTermsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(preferredTermSchema),
});

export const preferredTermsPayloadSchema = myzod.object({
  preferredName: myzod.string().min(1),
  synonyms: myzod.array(myzod.string().min(1)),
});

export type PreferredTerm = Infer<typeof preferredTermSchema>;
export type PreferredTermsResponse = Infer<typeof preferredTermsResponseSchema>;
export type PreferredTermsPayload = Infer<typeof preferredTermsPayloadSchema>;

export type PreferredTermsMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  PreferredTermsPayload,
  unknown
>;

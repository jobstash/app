import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

import { type MessageResponse, tagSchema } from '@jobstash/shared/core';

export const preferredTermSchema = myzod.object({
  tag: tagSchema,
  synonyms: myzod.array(tagSchema),
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

export const deletePreferrencePayloadSchema = myzod.object({
  preferredName: myzod.string().min(1),
});

export const createPreferenceResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.object({
    preferredName: myzod.string().min(1),
    synonyms: myzod.array(tagSchema),
  }),
});

export const deleteSynonymsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: preferredTermSchema,
});

export const deletePreferenceResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: preferredTermSchema,
});

export const authorizeOrgPayloadSchema = myzod.object({
  wallet: myzod.string(),
  verdict: myzod.literals('approve', 'reject'),
});
export type AuthorizeOrgPayload = Infer<typeof authorizeOrgPayloadSchema>;
export type AuthorizeOrgMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  AuthorizeOrgPayload,
  unknown
>;

export type PreferredTerm = Infer<typeof preferredTermSchema>;
export type PreferredTermsResponse = Infer<typeof preferredTermsResponseSchema>;
export type PreferredTermsPayload = Infer<typeof preferredTermsPayloadSchema>;
export type DeletePreferencePayload = Infer<
  typeof deletePreferrencePayloadSchema
>;
export type CreatePreferenceResponse = Infer<
  typeof createPreferenceResponseSchema
>;
export type DeleteSynonymsResponse = Infer<typeof deleteSynonymsResponseSchema>;
export type DeletePreferenceResponse = Infer<
  typeof deletePreferenceResponseSchema
>;

export type PreferredTermsMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  PreferredTermsPayload,
  unknown
>;

import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

import { tagSchema } from '@jobstash/shared/core';

export const pairedTermSchema = myzod.object({
  tag: tagSchema,
  pairings: myzod.array(tagSchema),
});

export const pairedTermsResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1),
    data: myzod.array(pairedTermSchema),
  })
  .allowUnknownKeys(true);

export const pairedTermsPayloadSchema = myzod.object({
  originTag: myzod.string().min(1),
  pairedTagList: myzod.array(myzod.string().min(1)),
});

export type PairedTermsResponse = Infer<typeof pairedTermsResponseSchema>;

export type PairedTerm = Infer<typeof pairedTermSchema>;

export type PairedTermsPayload = Infer<typeof pairedTermsPayloadSchema>;

export type PairedTermsMutFn = UseMutateFunction<
  Omit<PairedTermsResponse, 'data'>,
  unknown,
  PairedTermsPayload,
  unknown
>;

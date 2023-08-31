import { type UseMutateFunction } from '@tanstack/react-query';
import myzod, { type Infer } from 'myzod';

export const pairedTermSchema = myzod.object({
  technology: myzod.string(),
  pairings: myzod.array(myzod.string()),
});

export const pairedTermsResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1),
    data: myzod.array(pairedTermSchema),
  })
  .allowUnknownKeys(true);

export const pairedTermsPayloadSchema = myzod.object({
  originTerm: myzod.string().min(1),
  pairedTermList: myzod.array(myzod.string().min(1)),
  creatorWallet: myzod.string().min(1),
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

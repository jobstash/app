import { UseMutateFunction } from '@tanstack/react-query';
import { Infer } from 'myzod';

import {
  godmodeBlockedTechnologiesResponseSchema,
  godmodeBlockedTermsPayloadSchema,
  godmodeBlockedTermsResponseSchema,
  godmodeTechnologiesSchema,
} from './schemas';

export type GodmodeTechnologiesResponse = Infer<
  typeof godmodeTechnologiesSchema
>;

export type GodmodeBlockedTechnologiesResponse = Infer<
  typeof godmodeBlockedTechnologiesResponseSchema
>;

export type GodmodeBlockedTermsResponse = Infer<
  typeof godmodeBlockedTermsResponseSchema
>;

export type GodmodeBlockedTermsPayload = Infer<
  typeof godmodeBlockedTermsPayloadSchema
>;

export type GodmodeBlockedTermsMutFn = UseMutateFunction<
  GodmodeBlockedTermsResponse,
  unknown,
  GodmodeBlockedTermsPayload,
  unknown
>;

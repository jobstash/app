import { UseMutateFunction } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import { devProfileInfoSchema } from '@jobstash/profile/core';
import { MessageResponse } from '@jobstash/shared/core';

export * from './blocked-terms';
export * from './jobs';
export * from './paired-terms';
export * from './preferred-terms';

export const pendingOrgsSchema = myzod.array(devProfileInfoSchema);
export type PendingOrgs = Infer<typeof pendingOrgsSchema>;

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

export const addAliasPayloadSchema = myzod.object({
  orgId: myzod.string(),
  aliases: myzod.array(myzod.string()),
});
export type AddAliasPayload = Infer<typeof addAliasPayloadSchema>;
export type AddAliasMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  AddAliasPayload,
  unknown
>;

import { UseMutateFunction } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import { orgProfileInfoSchema } from '@jobstash/profile/core';
import { MessageResponse } from '@jobstash/shared/core';

export * from './blocked-terms';
export * from './jobs';
export * from './orgs';
export * from './paired-terms';
export * from './preferred-terms';
export * from './projects';

export const orgProfileListSchema = myzod.array(orgProfileInfoSchema);
export type OrgProfileList = Infer<typeof orgProfileListSchema>;

export const authorizeOrgPayloadSchema = myzod.object({
  wallet: myzod.string(),
  verdict: myzod.literals('approve', 'reject'),
  orgId: myzod.string().optional(),
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

export const setCommunitiesPayloadSchema = myzod.object({
  orgId: myzod.string(),
  communities: myzod.array(myzod.string()),
});
export type SetCommunitiesPayload = Infer<typeof setCommunitiesPayloadSchema>;
export type SetCommunitiesMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  SetCommunitiesPayload,
  unknown
>;

import { type UseMutateAsyncFunction } from '@tanstack/react-query';
import { type Infer } from 'myzod';

import { MessageResponse } from '@jobstash/shared/core';

import { PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
  profileInfoPayloadSchema,
  profileInfoResponseSchema,
  profileInfoSchema,
  profileOrgRatingPayloadSchema,
  profileOrgRatingResponseSchema,
  profileOrgReviewListResponseSchema,
  profileOrgReviewPayloadSchema,
  profileOrgReviewResponseSchema,
  profileOrgReviewSchema,
  profileOrgSalaryPayloadSchema,
  profileOrgSalaryResponseSchema,
  profileRepoContributionResponseSchema,
  profileRepoListQueryPageSchema,
  profileRepoSchema,
  profileRepoTag,
  profileRepoTagPayloadSchema,
  profileRepoTagResponseSchema,
  profileShowcasePayloadSchema,
  profileShowcaseResponseSchema,
  profileShowcaseSchema,
  profileSkillResponseSchema,
  profileSkillSchema,
  profileSkillsPayloadSchema,
} from './schemas';
import { profileRepoContributionPayloadSchema } from './schemas';

export type ProfileRepoTag = Infer<typeof profileRepoTag>;

export type ProfileRepo = Infer<typeof profileRepoSchema>;

export type ProfileRepoListQueryPage = Infer<
  typeof profileRepoListQueryPageSchema
>;

export type ProfileRightPanelTab = {
  text: string;
  onClick: () => void;
};

export type ProfileOrgReview = Infer<typeof profileOrgReviewSchema>;
export type ProfileOrgReviewListResponse = Infer<
  typeof profileOrgReviewListResponseSchema
>;

export type ProfileInfo = Infer<typeof profileInfoSchema>;
export type ProfileInfoPayload = Infer<typeof profileInfoPayloadSchema>;
export type ProfileInfoResponse = Infer<typeof profileInfoResponseSchema>;

export type ProfileSkill = Infer<typeof profileSkillSchema>;
export type ProfileSkillResponse = Infer<typeof profileSkillResponseSchema>;
export type ProfileSkillsPayload = Infer<typeof profileSkillsPayloadSchema>;
export type ProfileSkillsMutFn = UseMutateAsyncFunction<
  MessageResponse,
  unknown,
  ProfileSkillsPayload,
  unknown
>;

export type ProfileShowcase = Infer<typeof profileShowcaseSchema>;
export type ProfileShowcaseResponse = Infer<
  typeof profileShowcaseResponseSchema
>;
export type ProfileShowcasePayload = Infer<typeof profileShowcasePayloadSchema>;
export type ProfileShowcaseMutFn = UseMutateAsyncFunction<
  MessageResponse,
  unknown,
  ProfileShowcasePayload,
  unknown
>;

export type ProfileTabOptions =
  typeof PROFILE_RIGHT_PANEL_TABS[keyof typeof PROFILE_RIGHT_PANEL_TABS];

export type ProfileRepoTagPayload = Infer<typeof profileRepoTagPayloadSchema>;
export type ProfileRepoTagResponse = Infer<typeof profileRepoTagResponseSchema>;

export type ProfileRepoContributionPayload = Infer<
  typeof profileRepoContributionPayloadSchema
>;

export type ProfileRepoContributionResponse = Infer<
  typeof profileRepoContributionResponseSchema
>;

export type ProfileOrgSalaryPayload = Infer<
  typeof profileOrgSalaryPayloadSchema
>;
export type ProfileOrgSalaryResponse = Infer<
  typeof profileOrgSalaryResponseSchema
>;

export type ProfileOrgRatingPayload = Infer<
  typeof profileOrgRatingPayloadSchema
>;
export type ProfileOrgRatingResponse = Infer<
  typeof profileOrgRatingResponseSchema
>;

export type ProfileOrgReviewPayload = Infer<
  typeof profileOrgReviewPayloadSchema
>;
export type ProfileOrgReviewResponse = Infer<
  typeof profileOrgReviewResponseSchema
>;

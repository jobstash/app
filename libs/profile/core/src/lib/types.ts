import { type UseMutateAsyncFunction } from '@tanstack/react-query';
import { type Infer } from 'myzod';

import { MessageResponse } from '@jobstash/shared/core';

import { PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
  profileInfoPayloadSchema,
  profileInfoResponseSchema,
  profileInfoSchema,
  profileOrgReviewListQueryPageSchema,
  profileOrgReviewRatingSchema,
  profileOrgReviewSalarySchema,
  profileOrgReviewSchema,
  profileOrgReviewYourReviewSchema,
  profileRepoListQueryPageSchema,
  profileRepoSchema,
  profileRepoTag,
  profileShowcasePayloadSchema,
  profileShowcaseResponseSchema,
  profileShowcaseSchema,
  profileSkillResponseSchema,
  profileSkillSchema,
  profileSkillsPayloadSchema,
} from './schemas';

export type ProfileRepoTag = Infer<typeof profileRepoTag>;

export type ProfileRepo = Infer<typeof profileRepoSchema>;

export type ProfileRepoListQueryPage = Infer<
  typeof profileRepoListQueryPageSchema
>;

export type ProfileRightPanelTab = {
  text: string;
  onClick: () => void;
};

export type ProfileOrgReviewSalary = Infer<typeof profileOrgReviewSalarySchema>;
export type ProfileOrgReviewRating = Infer<typeof profileOrgReviewRatingSchema>;
export type ProfileOrgReviewYourReview = Infer<
  typeof profileOrgReviewYourReviewSchema
>;
export type ProfileOrgReview = Infer<typeof profileOrgReviewSchema>;

export type ProfileOrgReviewListQueryPage = Infer<
  typeof profileOrgReviewListQueryPageSchema
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

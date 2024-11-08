import { type UseMutateFunction } from '@tanstack/react-query';
import { type Infer } from 'myzod';

import { MessageResponse, UserShowcasePayload } from '@jobstash/shared/core';

import { PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
  orgProfileInfoPayloadSchema,
  orgProfileInfoResponseSchema,
  orgProfileInfoSchema,
  profileOrgRatingPayloadSchema,
  profileOrgRatingResponseSchema,
  profileOrgReviewListResponseSchema,
  profileOrgReviewPayloadSchema,
  profileOrgReviewResponseSchema,
  profileOrgReviewSchema,
  profileOrgSalaryPayloadSchema,
  profileOrgSalaryResponseSchema,
  profileOrgSchema,
  profileRepoContributionResponseSchema,
  profileRepoListQueryPageSchema,
  profileRepoSchema,
  profileRepoTag,
  profileRepoTagPayloadSchema,
  profileRepoTagResponseSchema,
  userEmailSchema,
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

export type UserEmail = Infer<typeof userEmailSchema>;

export type OrgProfileInfo = Infer<typeof orgProfileInfoSchema>;
export type OrgProfileInfoPayload = Infer<typeof orgProfileInfoPayloadSchema>;
export type OrgProfileInfoResponse = Infer<typeof orgProfileInfoResponseSchema>;

export type ProfileShowcaseMutFn = UseMutateFunction<
  MessageResponse,
  unknown,
  UserShowcasePayload,
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

export type ProfileOrg = Infer<typeof profileOrgSchema>;

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

export type TableListOption = 'all' | 'new' | 'shortlisted' | 'archived';
export type UpdateTableListOption = 'shortlisted' | 'archived';

export interface ProfileGotItCardStatus {
  profile: boolean;
  repositories: boolean;
  reviews: boolean;
}

import { type UseMutateFunction } from '@tanstack/react-query';
import { type Infer } from 'myzod';

import { MessageResponse } from '@jobstash/shared/core';

import { ATS_PROVIDERS, PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
  atsClientSchema,
  atsPreferenceSchema,
  devProfileInfoPayloadSchema,
  devProfileInfoResponseSchema,
  devProfileInfoSchema,
  devTalentResponseSchema,
  devTalentSchema,
  linkATSPlatformPayloadSchema,
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
  profileShowcasePayloadSchema,
  profileShowcaseResponseSchema,
  profileShowcaseSchema,
  profileSkillResponseSchema,
  profileSkillSchema,
  profileSkillsPayloadSchema,
  registerATSClientPayloadSchema,
  registerATSResponseSchema,
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

export type DevProfileInfo = Infer<typeof devProfileInfoSchema>;
export type DevProfileInfoPayload = Infer<typeof devProfileInfoPayloadSchema>;
export type DevProfileInfoResponse = Infer<typeof devProfileInfoResponseSchema>;

export type OrgProfileInfo = Infer<typeof orgProfileInfoSchema>;
export type OrgProfileInfoPayload = Infer<typeof orgProfileInfoPayloadSchema>;
export type OrgProfileInfoResponse = Infer<typeof orgProfileInfoResponseSchema>;

export type ProfileSkill = Infer<typeof profileSkillSchema>;
export type ProfileSkillResponse = Infer<typeof profileSkillResponseSchema>;
export type ProfileSkillsPayload = Infer<typeof profileSkillsPayloadSchema>;
export type ProfileSkillsMutFn = UseMutateFunction<
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
export type ProfileShowcaseMutFn = UseMutateFunction<
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

export type DevTalent = Infer<typeof devTalentSchema>;
export type DevTalentResponse = Infer<typeof devTalentResponseSchema>;

export type TableListOption = 'all' | 'new' | 'shortlisted' | 'archived';
export type UpdateTableListOption = 'shortlisted' | 'archived';

export type ATSSiteLabel =
  typeof ATS_PROVIDERS[keyof typeof ATS_PROVIDERS]['siteLabel'];

export type ATSPlatform =
  typeof ATS_PROVIDERS[keyof typeof ATS_PROVIDERS]['platformName'];

export type ATSPlatformName = Omit<
  ATSPlatform,
  typeof ATS_PROVIDERS['DEFAULT']['platformName']
>;

export type ATSPreference = Infer<typeof atsPreferenceSchema>;

export type ATSClient = Infer<typeof atsClientSchema>;

export type LinkATSPlatformPayload = Infer<typeof linkATSPlatformPayloadSchema>;

export type RegisterATSResponse = Infer<typeof registerATSResponseSchema>;
export type RegisterATSClientPayload = Infer<
  typeof registerATSClientPayloadSchema
>;

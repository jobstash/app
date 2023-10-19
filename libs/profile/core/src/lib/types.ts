import { type Infer } from 'myzod';

import { PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
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
  profileSkillResponseSchema,
  profileSkillSchema,
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
export type ProfileInfoResponse = Infer<typeof profileInfoResponseSchema>;

export type ProfileSkill = Infer<typeof profileSkillSchema>;
export type ProfileSkillResponse = Infer<typeof profileSkillResponseSchema>;

export type ProfileTabOptions =
  typeof PROFILE_RIGHT_PANEL_TABS[keyof typeof PROFILE_RIGHT_PANEL_TABS];

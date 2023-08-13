import { type Infer } from 'myzod';

import { PROFILE_RIGHT_PANEL_TABS } from './constants';
import {
  profileInfoSchema,
  profileOrgReviewListQueryPageSchema,
  profileOrgReviewRatingSchema,
  profileOrgReviewSalarySchema,
  profileOrgReviewSchema,
  profileOrgReviewYourReviewSchema,
  profileRepoListQueryPageSchema,
  profileRepoSchema,
  profileRepoTechnology,
} from './schemas';

export type ProfileRepoTechnology = Infer<typeof profileRepoTechnology>;

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

export type ProfileTabOptions =
  typeof PROFILE_RIGHT_PANEL_TABS[keyof typeof PROFILE_RIGHT_PANEL_TABS];

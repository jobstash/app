import { type Dispatch, type SetStateAction } from 'react';

import { type Infer } from 'myzod';

import { type Technology } from '@jobstash/shared/core';

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

export interface TechsUsedProps {
  allTechs: Technology[];
  profileRepo: ProfileRepo | null;
}

export interface TechsUsedContextProps {
  techsUsed: ProfileRepoTechnology[];
  techsCreated: ProfileRepoTechnology[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  hoverAddButton: boolean;
  setHoverAddButton: Dispatch<SetStateAction<boolean>>;
  onBlurSearch: () => void;
  currentTechs: ProfileRepoTechnology[];
  disableAdd: boolean;
  onTechRemove: (id: string) => void;
  disableSave: boolean;
  techOptions: string[];
  isLoading: boolean;
  onClickSave: () => void;
  onClickCanTeach: (id: string, canTeach: boolean) => void;
}

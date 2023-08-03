import { Infer } from 'myzod';

import {
  profileOrgReviewListQueryPageSchema,
  profileOrgReviewSchema,
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

export type ProfileOrgReview = Infer<typeof profileOrgReviewSchema>;

export type ProfileOrgReviewListQueryPage = Infer<
  typeof profileOrgReviewListQueryPageSchema
>;

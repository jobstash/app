import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import {
  type ProfileOrgReview,
  type ProfileTabOptions,
} from '@jobstash/profile/core';

interface ProfileReviewsPageContextProps {
  profileOrgReviewCount: number | null;
  activeProfileOrgReview: ProfileOrgReview | null;
  tabs: {
    text: string;
    onClick: () => void;
  }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<ProfileTabOptions[number]>>;
  orgReview: ProfileOrgReview;
  isLoadingCard: boolean;
  setIsLoadingCard: Dispatch<SetStateAction<boolean>>;
}

export const ProfileReviewsPageContext =
  createContext<ProfileReviewsPageContextProps | null>(null);

export const useProfileReviewsPageContext = () => {
  const context = useContext(ProfileReviewsPageContext);
  if (!context) {
    throw new Error(
      `useProfileReviewsPageContext must be used within a ProfileReviewsPageContextProvider`,
    );
  }

  return context;
};

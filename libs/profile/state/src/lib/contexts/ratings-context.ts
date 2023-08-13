import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { ProfileOrgReviewRating } from '@jobstash/profile/core';

interface RatingsContextProps {
  currentRating: ProfileOrgReviewRating;
  setCurrentRating: Dispatch<SetStateAction<ProfileOrgReviewRating>>;
  isLoading: boolean;
  onClickSave: () => void;
  disableActions: boolean;
  getRatingTitle: (ratingKey: keyof ProfileOrgReviewRating) => string;
}

export const RatingsContext = createContext<RatingsContextProps | null>(null);

export const useRatingContext = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }

  return context;
};

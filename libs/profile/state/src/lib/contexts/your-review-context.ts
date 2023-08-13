import { createContext, useContext } from 'react';

import { type ProfileOrgReviewYourReview } from '@jobstash/profile/core';

interface YourReviewContextProps {
  currentReview: ProfileOrgReviewYourReview;
  setHeadline: (headline: string | null) => void;
  setPros: (pros: string | null) => void;
  setCons: (cons: string | null) => void;
  disableSave: boolean;
  isLoading: boolean;
  onClickSave: () => void;
  username: string;
}

export const YourReviewContext = createContext<YourReviewContextProps | null>(
  null,
);

export const useYourReviewContext = () => {
  const context = useContext(YourReviewContext);
  if (!context) {
    throw new Error(
      'useYourReviewContext must be used within a YourReviewProvider',
    );
  }

  return context;
};

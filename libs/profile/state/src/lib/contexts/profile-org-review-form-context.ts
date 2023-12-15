import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import {
  type ProfileOrgReviewRating,
  type ProfileOrgReviewYourReview,
} from '@jobstash/profile/core';

export interface ProfileOrgReviewFormContextProps {
  salary: {
    selectedCurrency: string | null;
    amount: number | null;
    offersTokenAllocation: boolean;
  };
  setSelectedCurrency: (value: string | null) => void;
  setAmount: (value: number | null) => void;
  setOffersTokenAllocation: (value: boolean) => void;
  saveSalary: () => void;
  isDisabledSalarySave: boolean;

  currentRating: ProfileOrgReviewRating;
  setCurrentRating: Dispatch<SetStateAction<ProfileOrgReviewRating>>;
  getRatingTitle: (ratingKey: keyof ProfileOrgReviewRating) => string;
  saveRating: () => void;
  isDisabledRatingSave: boolean;

  currentReview: ProfileOrgReviewYourReview;
  setHeadline: (headline: string | null) => void;
  setPros: (pros: string | null) => void;
  setCons: (cons: string | null) => void;
  saveReview: () => void;
  isDisabledReviewSave: boolean;
}

export const ProfileOrgReviewFormContext = createContext<
  ProfileOrgReviewFormContextProps | undefined
>(undefined);

export const useProfileOrgReviewFormContext = () => {
  const context = useContext(ProfileOrgReviewFormContext);
  if (!context) {
    throw new Error(
      'useProfileOrgReviewFormContext must be used within a ProfileOrgReviewFormProvider',
    );
  }

  return context;
};

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import {
  type OrgCompensation,
  OrgLocation,
  type OrgRating,
  OrgStaffReview,
  OrgTimezone,
  OrgWorkingHours,
} from '@jobstash/organizations/core';

export interface ProfileCompensationContextProps {
  compensation: OrgCompensation;
  setCurrency: (value: string | null) => void;
  setSalary: (value: number | null) => void;
  setOffersTokenAllocation: (value: boolean) => void;
  saveCompensation: () => void;
  isDisabledCompensationSave: boolean;
}

export interface ProfileRatingContextProps {
  rating: OrgRating;
  setRating: Dispatch<SetStateAction<OrgRating>>;
  getRatingTitle: (ratingKey: keyof OrgRating) => string;
  saveRating: () => void;
  isDisabledRatingSave: boolean;
}

export interface ProfileReviewContextProps {
  review: OrgStaffReview;
  setTitle: (title: string | null) => void;
  setLocation: (location: OrgLocation) => void;
  setTimezone: (timezone: OrgTimezone) => void;
  setWorkingHours: (workingHours: OrgWorkingHours) => void;
  setPros: (pros: string | null) => void;
  setCons: (cons: string | null) => void;
  saveReview: () => void;
  isDisabledReviewSave: boolean;
}

export type ProfileOrgReviewFormContextProps = ProfileCompensationContextProps &
  ProfileRatingContextProps &
  ProfileReviewContextProps;

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

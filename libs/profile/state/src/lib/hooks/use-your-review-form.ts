import { useEffect, useState } from 'react';

import {
  OrgLocation,
  OrgTimezone,
  OrgWorkingHours,
} from '@jobstash/organizations/core';

import { type ProfileReviewContextProps } from '../contexts/profile-org-review-form-context';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useYourReviewMutation } from './use-your-review-mutation';

export const useYourReviewForm = (): ProfileReviewContextProps => {
  const {
    orgReview: {
      review: { title, location, timezone, workingHours, pros, cons },
      org: { orgId },
    },
  } = useProfileReviewsPageContext();

  const [currentReview, setCurrentReview] = useState({
    title,
    location,
    timezone,
    workingHours,
    pros,
    cons,
  });

  useEffect(() => {
    setCurrentReview({
      title,
      location,
      timezone,
      workingHours,
      pros,
      cons,
    });
  }, [title, pros, cons, location, timezone, workingHours]);

  const setTitle = (title: string | null) =>
    setCurrentReview((prev) => ({ ...prev, title }));
  const setLocation = (location: OrgLocation) =>
    setCurrentReview((prev) => ({ ...prev, location }));
  const setTimezone = (timezone: OrgTimezone) =>
    setCurrentReview((prev) => ({ ...prev, timezone }));
  const setWorkingHours = (workingHours: OrgWorkingHours) =>
    setCurrentReview((prev) => ({ ...prev, workingHours }));
  const setPros = (pros: string | null) =>
    setCurrentReview((prev) => ({ ...prev, pros }));
  const setCons = (cons: string | null) =>
    setCurrentReview((prev) => ({ ...prev, cons }));

  const isDisabledReviewSave =
    JSON.stringify({ title, pros, cons }) === JSON.stringify(currentReview);

  const { mutate } = useYourReviewMutation();

  const saveReview = () => {
    mutate({
      orgId,
      ...currentReview,
    });
  };

  return {
    review: currentReview,
    setTitle,
    setLocation,
    setTimezone,
    setWorkingHours,
    setPros,
    setCons,
    saveReview,
    isDisabledReviewSave,
  };
};

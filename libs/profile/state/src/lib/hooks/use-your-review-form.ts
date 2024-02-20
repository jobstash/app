import { useEffect, useState } from 'react';

import {
  OrgLocation,
  OrgTimezone,
} from '@jobstash/organizations/core';

import { type ProfileReviewContextProps } from '../contexts/profile-org-review-form-context';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useYourReviewMutation } from './use-your-review-mutation';

const TEXTAREA_CHAR_LIMIT = 500;

export const useYourReviewForm = (): ProfileReviewContextProps => {
  const {
    orgReview: {
      review: { id, title, location, timezone, pros, cons },
      org: { orgId },
    },
  } = useProfileReviewsPageContext();

  const [currentReview, setCurrentReview] = useState({
    id,
    title: '',
    location,
    timezone,
    pros,
    cons,
  });

  useEffect(() => {
    setCurrentReview({
      id,
      title: title ?? '',
      location,
      timezone,
      pros,
      cons,
    });
  }, [title, pros, cons, location, timezone, id]);

  const setTitle = (title: string | null) =>
    setCurrentReview((prev) => ({ ...prev, title: title ?? '' }));
  const setLocation = (location: OrgLocation) =>
    setCurrentReview((prev) => ({ ...prev, location }));
  const setTimezone = (timezone: OrgTimezone) =>
    setCurrentReview((prev) => ({ ...prev, timezone }));

  const setPros = (v: string | null) => {
    const length = v?.length ?? 0;
    const isValid = length <= TEXTAREA_CHAR_LIMIT;
    const value = length > 0 ? v : null;

    if (isValid) {
      setCurrentReview((prev) => ({ ...prev, pros: value }));
    }
  };

  const setCons = (v: string | null) => {
    const length = v?.length ?? 0;
    const isValid = length <= TEXTAREA_CHAR_LIMIT;
    const value = length > 0 ? v : null;

    if (isValid) {
      setCurrentReview((prev) => ({ ...prev, cons: value }));
    }
  };

  const isDisabledReviewSave =
    JSON.stringify({ title, location, timezone, pros, cons }) ===
    JSON.stringify(currentReview);

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
    setPros,
    setCons,
    saveReview,
    isDisabledReviewSave,
  };
};

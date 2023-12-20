import { type ProfileOrgReviewFormContextProps } from '../contexts/profile-org-review-form-context';

import { useCompensationForm } from './use-compensation-form';
import { useRatingsForm } from './use-ratings-form';
import { useYourReviewForm } from './use-your-review-form';

export const useProfileOrgReviewForm = (): ProfileOrgReviewFormContextProps => {
  const salaryForm = useCompensationForm();
  const ratingsForm = useRatingsForm();
  const yourReviewForm = useYourReviewForm();

  return {
    ...salaryForm,
    ...ratingsForm,
    ...yourReviewForm,
  };
};

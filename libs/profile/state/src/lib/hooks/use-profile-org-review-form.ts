import { type ProfileOrgReviewFormContextProps } from '../contexts/profile-org-review-form-context';

import { useRatingsForm } from './use-ratings-form';
import { useSalaryForm } from './use-salary-form';
import { useYourReviewForm } from './use-your-review-form';

export const useProfileOrgReviewForm = (): ProfileOrgReviewFormContextProps => {
  const salaryForm = useSalaryForm();
  const ratingsForm = useRatingsForm();
  const yourReviewForm = useYourReviewForm();

  return {
    ...salaryForm,
    ...ratingsForm,
    ...yourReviewForm,
  };
};

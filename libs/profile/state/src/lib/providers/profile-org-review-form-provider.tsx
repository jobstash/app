import { type ReactNode } from 'react';

import { ProfileOrgReviewFormContext } from '../contexts/profile-org-review-form-context';
import { useProfileOrgReviewForm } from '../hooks/use-profile-org-review-form';

interface Props {
  children: ReactNode;
}

export const ProfileOrgReviewFormProvider = ({ children }: Props) => {
  const value = useProfileOrgReviewForm();

  return (
    <ProfileOrgReviewFormContext.Provider value={value}>
      {children}
    </ProfileOrgReviewFormContext.Provider>
  );
};

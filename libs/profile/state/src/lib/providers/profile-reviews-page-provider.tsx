import { type ReactNode } from 'react';

import { ProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';
import { useProfileReviewsPage } from '../hooks/use-profile-reviews-page';

interface Props {
  children: ReactNode;
  isOnboardSSR: boolean;
}

export const ProfileReviewsPageProvider = ({
  children,
  isOnboardSSR,
}: Props) => {
  const value = useProfileReviewsPage(isOnboardSSR);

  return (
    <ProfileReviewsPageContext.Provider value={value}>
      {children}
    </ProfileReviewsPageContext.Provider>
  );
};

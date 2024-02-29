import { type ReactNode } from 'react';

import { ProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';
import { useProfileReviewsPage } from '../hooks/use-profile-reviews-page';

import { DevProfileInfoProvider } from './dev-profile-info-provider';

interface Props {
  children: ReactNode;
}

export const ProfileReviewsPageProvider = ({ children }: Props) => {
  const value = useProfileReviewsPage();

  return (
    <ProfileReviewsPageContext.Provider value={value}>
      <DevProfileInfoProvider>{children}</DevProfileInfoProvider>
    </ProfileReviewsPageContext.Provider>
  );
};

import { type ReactNode } from 'react';

import { ProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { useProfileRepoPage } from '../hooks/use-profile-repo-page';

interface Props {
  children: ReactNode;
  isOnboardSSR: boolean;
}

export const ProfileRepoPageProvider = ({ children, isOnboardSSR }: Props) => {
  const value = useProfileRepoPage(isOnboardSSR);

  return (
    <ProfileRepoPageContext.Provider value={value}>
      {children}
    </ProfileRepoPageContext.Provider>
  );
};

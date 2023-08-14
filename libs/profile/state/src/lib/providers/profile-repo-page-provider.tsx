import { type ReactNode } from 'react';

import { ProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { useProfileRepoPage } from '../hooks/use-profile-repo-page';

import { ProfileInfoProvider } from './profile-info-provider';

interface Props {
  children: ReactNode;
  isOnboardSSR: boolean;
}

export const ProfileRepoPageProvider = ({ children, isOnboardSSR }: Props) => {
  const value = useProfileRepoPage(isOnboardSSR);

  return (
    <ProfileRepoPageContext.Provider value={value}>
      <ProfileInfoProvider>{children}</ProfileInfoProvider>
    </ProfileRepoPageContext.Provider>
  );
};

import { type ReactNode } from 'react';

import { ProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { useProfileRepoPage } from '../hooks/use-profile-repo-page';

import { ProfileInfoProvider } from './profile-info-provider';

interface Props {
  children: ReactNode;
}

export const ProfileRepoPageProvider = ({ children }: Props) => {
  const value = useProfileRepoPage();

  return (
    <ProfileRepoPageContext.Provider value={value}>
      <ProfileInfoProvider>{children}</ProfileInfoProvider>
    </ProfileRepoPageContext.Provider>
  );
};

import { type ReactNode } from 'react';

import { ProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { useProfileRepoPage } from '../hooks/use-profile-repo-page';

import { DevProfileInfoProvider } from './dev-profile-info-provider';

interface Props {
  children: ReactNode;
}

export const ProfileRepoPageProvider = ({ children }: Props) => {
  const value = useProfileRepoPage();

  return (
    <ProfileRepoPageContext.Provider value={value}>
      <DevProfileInfoProvider>{children}</DevProfileInfoProvider>
    </ProfileRepoPageContext.Provider>
  );
};

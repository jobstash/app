import { type ReactNode } from 'react';

import { Technology } from '@jobstash/shared/core';

import { ProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { useProfileRepoPage } from '../hooks/use-profile-repo-page';

interface Props {
  children: ReactNode;
  isOnboardSSR: boolean;
  allTechs: Technology[] | undefined;
}

export const ProfileRepoPageProvider = ({
  children,
  isOnboardSSR,
  allTechs,
}: Props) => {
  const value = useProfileRepoPage(isOnboardSSR, allTechs ?? []);

  return (
    <ProfileRepoPageContext.Provider value={value}>
      {children}
    </ProfileRepoPageContext.Provider>
  );
};

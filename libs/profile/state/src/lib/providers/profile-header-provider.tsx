import { type ReactNode } from 'react';

import { ProfileHeaderContext } from '../contexts/profile-header-context';
import { useProfileHeader } from '../hooks/use-profile-header';

interface Props {
  children: ReactNode;
}

export const ProfileHeaderProvider = ({ children }: Props) => {
  const value = useProfileHeader();

  return (
    <ProfileHeaderContext.Provider value={value}>
      {children}
    </ProfileHeaderContext.Provider>
  );
};

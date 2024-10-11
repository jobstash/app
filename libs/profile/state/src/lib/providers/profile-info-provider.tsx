import { type ReactNode } from 'react';

import { ProfileInfoContext } from '../contexts/profile-info-context';
import { useProfileInfo } from '../hooks/use-profile-info';

interface Props {
  children: ReactNode;
}

export const ProfileInfoProvider = ({ children }: Props) => {
  const value = useProfileInfo();

  return (
    <ProfileInfoContext.Provider value={value}>
      {children}
    </ProfileInfoContext.Provider>
  );
};

import { type ReactNode } from 'react';

import { ProfileDevInfoContext } from '../contexts/profile-dev-info-context';
import { useProfileDevInfo } from '../hooks/use-profile-dev-info';

interface Props {
  children: ReactNode;
}

export const ProfileDevInfoProvider = ({ children }: Props) => {
  const value = useProfileDevInfo();

  return (
    <ProfileDevInfoContext.Provider value={value}>
      {children}
    </ProfileDevInfoContext.Provider>
  );
};

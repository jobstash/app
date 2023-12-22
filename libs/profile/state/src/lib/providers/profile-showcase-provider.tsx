import { type ReactNode } from 'react';

import { ProfileShowcaseContext } from '../contexts/profile-showcase-context';
import { useProfileShowcase } from '../hooks/use-profile-showcase';

interface Props {
  children: ReactNode;
}

export const ProfileShowcaseProvider = ({ children }: Props) => {
  const value = useProfileShowcase();

  return (
    <ProfileShowcaseContext.Provider value={value}>
      {children}
    </ProfileShowcaseContext.Provider>
  );
};

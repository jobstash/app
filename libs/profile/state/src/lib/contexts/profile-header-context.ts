import { createContext, useContext } from 'react';

import { UserProfile } from '@jobstash/shared/core';

interface ProfileHeaderContextProps {
  isLoading: boolean;
  isAvailableForWork: boolean;
  updateAvailability: (isChecked: boolean) => void;
  wallet: string;
  githubAvatar: string | null;
  location: UserProfile['location'] | null;
}

export const ProfileHeaderContext =
  createContext<ProfileHeaderContextProps | null>(null);

export const useProfileHeaderContext = () => {
  const context = useContext(ProfileHeaderContext);

  if (context === null) {
    throw new Error(
      'useProfileHeaderContext must be used within a ProfileHeaderContextProvider',
    );
  }

  return context;
};

import { createContext, useContext } from 'react';

import { DevProfileInfo, PreferredContact } from '@jobstash/profile/core';

interface ProfileHeaderContextProps {
  isLoading: boolean;
  isAvailableForWork: boolean;
  setIsAvailableForWork: (isAvailableForWork: boolean) => void;
  updateAvailability: (isChecked: boolean) => void;
  avatar: string | null;
  username: string | null;
  email: string[];
  preferredContact: PreferredContact | null;
  contact: DevProfileInfo['contact'] | null;
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

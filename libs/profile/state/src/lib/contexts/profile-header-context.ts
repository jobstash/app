import { createContext, useContext } from 'react';

import { ProfileInfo } from '@jobstash/profile/core';

interface ProfileHeaderContextProps {
  isLoading: boolean;
  isAvailableForWork: boolean;
  setIsAvailableForWork: (isAvailableForWork: boolean) => void;
  preferredContact: string | null;
  setPreferredContact: (preferredContact: string | null) => void;
  selectedContact: string | null;
  setSelectedContact: (selectedContact: string | null) => void;
  saveProfileInfo: () => void;
  avatar: string;
  username: string;
  contact: ProfileInfo['contact'];
  disableSave: boolean;
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

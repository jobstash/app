import { type ChangeEventHandler, createContext, useContext } from 'react';

import { DevProfileInfo } from '@jobstash/profile/core';

interface ProfileHeaderContextProps {
  isLoading: boolean;
  isAvailableForWork: boolean;
  setIsAvailableForWork: (isAvailableForWork: boolean) => void;
  preferredContact: string | null;
  selectedContact: string | null;
  saveProfileInfo: () => void;
  updateAvailability: (isChecked: boolean) => void;
  avatar: string | null;
  username: string | null;
  location: { country: string | null; city: string | null };
  email: string | null;
  contact: DevProfileInfo['contact'];
  disableSave: boolean;
  onChangePreferredContact: (v: string | null) => void;
  onChangeSelectedContact: ChangeEventHandler<HTMLInputElement>;
  onChangeCountry: ChangeEventHandler<HTMLInputElement>;
  onChangeCity: ChangeEventHandler<HTMLInputElement>;
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

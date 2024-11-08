import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import { UserShowcase } from '@jobstash/shared/core';

export interface ProfileShowcaseContextProps {
  isLoading: {
    query: boolean;
    mutation: boolean;
  };
  options: string[];
  addOption: (option: string) => void;
  showcases: UserShowcase[];
  editedShowcase: UserShowcase;
  setEditedShowcase: Dispatch<SetStateAction<UserShowcase>>;
  displayForm: boolean;
  addShowcase: () => void;
  removeShowcase: (id: string) => void;
  onToggleForm: () => void;
  updatedId: string;
}

export const ProfileShowcaseContext =
  createContext<ProfileShowcaseContextProps | null>(null);

export const useProfileShowcaseContext = () => {
  const context = useContext(ProfileShowcaseContext);

  if (context === null) {
    throw new Error(
      'useProfileShowcaseFormContext must be used within a ProfileShowcaseFormContextProvider',
    );
  }

  return context;
};

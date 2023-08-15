import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import {
  type ProfileRepo,
  type ProfileTabOptions,
} from '@jobstash/profile/core';
import { Technology } from '@jobstash/shared/core';

interface ProfileRepoPageContextProps {
  profileRepoCount: number | null;
  activeProfileRepo: ProfileRepo | null;
  showGotItCard: boolean;
  setShowGotItCard: (show: boolean) => void;
  tabs: {
    text: string;
    onClick: () => void;
  }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<ProfileTabOptions[number]>>;
  allTechs: Technology[];
  profileRepo: ProfileRepo;
  isOnboarding: boolean;
}

export const ProfileRepoPageContext =
  createContext<ProfileRepoPageContextProps | null>(null);

export const useProfileRepoPageContext = () => {
  const context = useContext(ProfileRepoPageContext);
  if (!context) {
    throw new Error(
      `useProfileRepoPageContext must be used within a ProfileRepoPageContextProvider`,
    );
  }

  return context;
};

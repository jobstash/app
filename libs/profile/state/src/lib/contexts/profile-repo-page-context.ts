import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import { type ProfileRepo } from '@jobstash/profile/core';
import { Technology } from '@jobstash/shared/core';

interface ProfileRepoPageContextProps {
  isOnboardFlow: boolean;
  profileRepoCount: number | null;
  activeProfileRepo: ProfileRepo | null;
  showGotItCard: boolean;
  setShowGotItCard: (show: boolean) => void;
  isOnboardSSR: boolean;
  tabs: {
    text: string;
    onClick: () => void;
  }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  allTechs: Technology[];
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

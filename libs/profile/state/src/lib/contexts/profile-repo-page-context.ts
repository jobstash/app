import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import { type UseMutateFunction } from '@tanstack/react-query';

import {
  type ProfileRepo,
  type ProfileSkill,
  type ProfileSkillsPayload,
  type ProfileTabOptions,
} from '@jobstash/profile/core';
import { MessageResponse, Tag } from '@jobstash/shared/core';

interface ProfileRepoPageContextProps {
  profileRepoCount: number | null;
  activeProfileRepo: ProfileRepo | null;
  tabs: {
    text: string;
    onClick: () => void;
  }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<ProfileTabOptions[number]>>;
  allTags: Tag[];
  profileRepo: ProfileRepo;
  isLoadingCard: boolean;
  setIsLoadingCard: Dispatch<SetStateAction<boolean>>;
  isLoadingSkills: boolean;
  userSkills: ProfileSkill[];
  mutateSkills: UseMutateFunction<
    MessageResponse,
    unknown,
    ProfileSkillsPayload
  >;
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

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';

import { type UseMutateFunction } from '@tanstack/react-query';

import {
  type ProfileRepo,
  type ProfileTabOptions,
} from '@jobstash/profile/core';
import {
  MessageResponse,
  Tag,
  UserSkill,
  UserSkillsPayload,
} from '@jobstash/shared/core';

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
  userSkills: UserSkill[];
  mutateSkills: UseMutateFunction<MessageResponse, unknown, UserSkillsPayload>;
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

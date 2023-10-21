import { createContext, useContext } from 'react';

import type {
  ProfileShowcase,
  ProfileShowcaseMutFn,
  ProfileSkill,
  ProfileSkillsMutFn,
} from '@jobstash/profile/core';

export interface ProfileDevInfoContextProps {
  isLoading: {
    skillsQuery: boolean;
    skillsMutation: boolean;
    showcaseQuery: boolean;
    showcaseMutation: boolean;
  };

  skills: ProfileSkill[];
  fetchedSkills: ProfileSkill[];
  addSkill: (_: ProfileSkill) => void;
  removeSkill: (_: string) => void;

  showcases: ProfileShowcase[];
  fetchedShowcases: ProfileShowcase[];
  addShowcase: (_: ProfileShowcase) => void;
  removeShowcase: (_: string) => void;

  mutateAsyncSkills: ProfileSkillsMutFn;
  mutateAsyncShowcase: ProfileShowcaseMutFn;
}

export const ProfileDevInfoContext =
  createContext<ProfileDevInfoContextProps | null>(null);

export const useProfileDevInfoContext = () => {
  const context = useContext(ProfileDevInfoContext);

  if (context === null) {
    throw new Error(
      'useProfileDevInfoContext must be used within a ProfileDevInfoContextProvider',
    );
  }

  return context;
};

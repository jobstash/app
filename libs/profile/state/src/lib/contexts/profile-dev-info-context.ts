import { createContext, useContext } from 'react';

import {
  ProfileShowcase,
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
  addSkill: (_: ProfileSkill) => void;
  removeSkill: (_: string) => void;

  showcases: ProfileShowcase[];
  addShowcase: (_: ProfileShowcase) => void;
  removeShowcase: (_: string) => void;

  mutateSkills: ProfileSkillsMutFn;
  //
  // mutateShowcase
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

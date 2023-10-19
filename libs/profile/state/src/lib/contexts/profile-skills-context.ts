import { createContext, useContext } from 'react';

import { type ProfileSkill } from '@jobstash/profile/core';

interface ProfileSkillsContextProps {
  isLoading: boolean;
  skills: ProfileSkill[];
  addSkill: (_: ProfileSkill) => void;
  removeSkill: (_: string) => void;
  hasSkills: boolean;
  options: ProfileSkill[];
  isEditing: boolean;
  toggleEdit: () => void;
}

export const ProfileSkillsContext =
  createContext<ProfileSkillsContextProps | null>(null);

export const useProfileSkillsContext = () => {
  const context = useContext(ProfileSkillsContext);

  if (context === null) {
    throw new Error(
      'useProfileSkillsContext must be used within a ProfileSkillsContextProvider',
    );
  }

  return context;
};

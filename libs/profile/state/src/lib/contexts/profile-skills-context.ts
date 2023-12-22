import { createContext, useContext } from 'react';

import { type ProfileSkill } from '@jobstash/profile/core';

export interface ProfileSkillsContextProps {
  isLoading: {
    query: boolean;
    mutation: boolean;
  };
  skills: ProfileSkill[];
  options: ProfileSkill[];
  isEditing: boolean;
  toggleEdit: () => void;
  addSkill: (skill: ProfileSkill) => void;
  removeSkill: (id: string) => void;
  updateCanTeach: (id: string, canTeach: boolean) => void;
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

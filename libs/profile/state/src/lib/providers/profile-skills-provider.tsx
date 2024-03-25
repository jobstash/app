import { type ReactNode } from 'react';

import { ProfileSkillsContext } from '../contexts/profile-skills-context';
import { useProfileSkills } from '../hooks/use-profile-skills';

interface Props {
  children: ReactNode;
}

export const ProfileSkillsProvider = ({ children }: Props) => {
  const value = useProfileSkills();

  return (
    <ProfileSkillsContext.Provider value={value}>
      {children}
    </ProfileSkillsContext.Provider>
  );
};

import { type ReactNode } from 'react';

import { TagsProvider } from '@jobstash/admin/state';

import { ProfileSkillsContext } from '../contexts/profile-skills-context';
import { useProfileSkills } from '../hooks/use-profile-skills';

interface Props {
  children: ReactNode;
}

export const ProfileSkillsProvider = ({ children }: Props) => {
  const value = useProfileSkills();

  return (
    <TagsProvider>
      <ProfileSkillsContext.Provider value={value}>
        {children}
      </ProfileSkillsContext.Provider>
    </TagsProvider>
  );
};

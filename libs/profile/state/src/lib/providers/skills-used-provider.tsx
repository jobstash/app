import { type ReactNode } from 'react';

import { SkillsUsedContext } from '../contexts/skills-used-context';
import { useTagsUsed } from '../hooks/use-tags-used';

interface Props {
  children: ReactNode;
}

export const SkillsUsedProvider = ({ children }: Props) => {
  const value = useTagsUsed();

  return (
    <SkillsUsedContext.Provider value={value}>
      {children}
    </SkillsUsedContext.Provider>
  );
};

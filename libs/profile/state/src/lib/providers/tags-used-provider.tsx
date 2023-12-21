import { type ReactNode } from 'react';

import { TagsUsedContext } from '../contexts/tags-used-context';
import { useTagsUsed } from '../hooks/use-tags-used';

interface Props {
  children: ReactNode;
}

export const TagsUsedProvider = ({ children }: Props) => {
  const value = useTagsUsed();

  return (
    <TagsUsedContext.Provider value={value}>
      {children}
    </TagsUsedContext.Provider>
  );
};

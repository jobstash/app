import { type ReactNode } from 'react';

import { TagsUsedContext } from '../contexts/tags-used-context';
import { useTagsUsed } from '../hooks/use-tags-used';
import { useTagsUsedTour } from '../hooks/use-tags-used-tour';

interface Props {
  children: ReactNode;
}

export const TagsUsedProvider = ({ children }: Props) => {
  const value = useTagsUsed();

  useTagsUsedTour();

  return (
    <TagsUsedContext.Provider value={value}>
      {children}
    </TagsUsedContext.Provider>
  );
};

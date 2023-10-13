import { createContext, useContext } from 'react';

import { type Tag } from '@jobstash/shared/core';

export interface TagsContextProps {
  isLoading: boolean;
  tags: Tag[];
  mappedTags: string[];
}

export const TagsContext = createContext<TagsContextProps | null>(null);

export const useTagsContext = () => {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error('useTagsContext must be used within a TagsContextProvider');
  }

  return context;
};

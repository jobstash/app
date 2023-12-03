import { createContext, useContext } from 'react';
import { type Dispatch, type SetStateAction } from 'react';

import { type ProfileRepoTag } from '@jobstash/profile/core';

interface TagsUsedContextProps {
  tagsUsed: ProfileRepoTag[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  hoverAddButton: boolean;
  setHoverAddButton: Dispatch<SetStateAction<boolean>>;
  onBlurSearch: () => void;
  currentTags: ProfileRepoTag[];
  disableAdd: boolean;
  onTagRemove: (id: string) => void;
  disableSave: boolean;
  tagOptions: string[];
  onClickSave: () => void;
  onClickCanTeach: (id: string, canTeach: boolean) => void;
}

export const TagsUsedContext = createContext<TagsUsedContextProps | null>(null);

export const useTagsUsedContext = () => {
  const context = useContext(TagsUsedContext);
  if (!context) {
    throw new Error(
      'useTagsUsedContext must be used within a TagsUsedProvider',
    );
  }

  return context;
};

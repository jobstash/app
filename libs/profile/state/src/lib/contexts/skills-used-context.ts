import { createContext, useContext } from 'react';
import { type Dispatch, type SetStateAction } from 'react';

import { type ProfileRepoTag } from '@jobstash/profile/core';

export interface SkillsUsedContextProps {
  tagsUsed: ProfileRepoTag[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  disableAdd: boolean;
  onTagSelect: (name: string) => void;
  onTagRemove: (id: string) => void;
  tagOptions: string[];
  onClickSave: () => void;
  onClickCanTeach: (id: string, canTeach: boolean) => void;
}

export const SkillsUsedContext = createContext<SkillsUsedContextProps | null>(
  null,
);

export const useSkillsUsedContext = () => {
  const context = useContext(SkillsUsedContext);
  if (!context) {
    throw new Error(
      'useSkillsUsedContext must be used within a SkillsUsedProvider',
    );
  }

  return context;
};

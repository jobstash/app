import { createContext, useContext } from 'react';
import { type Dispatch, type SetStateAction } from 'react';

import { type ProfileRepoTechnology } from '@jobstash/profile/core';

interface TechsUsedContextProps {
  techsUsed: ProfileRepoTechnology[];
  techsCreated: ProfileRepoTechnology[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  hoverAddButton: boolean;
  setHoverAddButton: Dispatch<SetStateAction<boolean>>;
  onBlurSearch: () => void;
  currentTechs: ProfileRepoTechnology[];
  disableAdd: boolean;
  onTechRemove: (id: string) => void;
  disableSave: boolean;
  techOptions: string[];
  onClickSave: () => void;
  onClickCanTeach: (id: string, canTeach: boolean) => void;
}

export const TechsUsedContext = createContext<TechsUsedContextProps | null>(
  null,
);

export const useTechsUsedContext = () => {
  const context = useContext(TechsUsedContext);
  if (!context) {
    throw new Error(
      'useTechsUsedContext must be used within a TechsUsedProvider',
    );
  }

  return context;
};

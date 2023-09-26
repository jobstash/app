import { createContext, useContext } from 'react';

import { type Technology } from '@jobstash/shared/core';

export interface TechnologiesContextProps {
  isLoading: boolean;
  technologies: Technology[];
  mappedTechnologies: string[];
}

export const TechnologiesContext =
  createContext<TechnologiesContextProps | null>(null);

export const useTechnologiesContext = () => {
  const context = useContext(TechnologiesContext);

  if (!context) {
    throw new Error(
      'useTechnologiesContext must be used within a TechnologiesContextProvider',
    );
  }

  return context;
};

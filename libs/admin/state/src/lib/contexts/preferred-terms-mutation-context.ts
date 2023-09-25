import { createContext, useContext } from 'react';

import { type PreferredTermsMutFn } from '@jobstash/admin/core';

export interface PreferredTermsMutationContextProps {
  isLoading: boolean;
  mutate: PreferredTermsMutFn;
}

export const PreferredTermsMutationContext =
  createContext<PreferredTermsMutationContextProps | null>(null);

export const usePreferredTermsMutationContext = () => {
  const context = useContext(PreferredTermsMutationContext);

  if (!context) {
    throw new Error(
      'usePreferredTermsContext must be used within a PreferredTermsContextProvider',
    );
  }

  return context;
};

import { createContext, useContext } from 'react';

import { PreferredTerm } from '@jobstash/admin/core';

export interface PreferredTermsContextProps {
  isLoading: boolean;
  preferredTerms: PreferredTerm[];
  primaryTermOptions: string[];
}

export const PreferredTermsContext =
  createContext<PreferredTermsContextProps | null>(null);

export const usePreferredTermsContext = () => {
  const context = useContext(PreferredTermsContext);

  if (!context) {
    throw new Error(
      'usePreferredTermsContext must be used within a PreferredTermsContextProvider',
    );
  }

  return context;
};

import { createContext, useContext } from 'react';

import { PreferredTerm } from '@jobstash/admin/core';
import { Tag } from '@jobstash/shared/core';

export interface PreferredTermsContextProps {
  isLoading: boolean;
  isFetching: boolean;
  preferredTerms: PreferredTerm[];
  primaryTermOptions: Tag[];
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

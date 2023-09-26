import { createContext, useContext } from 'react';

import { PairedTerm } from '@jobstash/admin/core';

export interface PairedTermsContextProps {
  isLoading: boolean;
  pairedTerms: PairedTerm[];
  existingPairedTerms: string[];
}

export const PairedTermsContext = createContext<PairedTermsContextProps | null>(
  null,
);

export const usePairedTermsContext = () => {
  const context = useContext(PairedTermsContext);

  if (!context) {
    throw new Error(
      'usePairedTermsContext must be used within a PairedTermsContextProvider',
    );
  }

  return context;
};

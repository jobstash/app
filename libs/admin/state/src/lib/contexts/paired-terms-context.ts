import { createContext, useContext } from 'react';

import { PairedTermsMutFn } from '@jobstash/admin/core';

interface PairedTermsContextProps {
  isLoading: boolean;
  mutatePairedTerms: PairedTermsMutFn;
}

export const PairedTermsContext = createContext<PairedTermsContextProps | null>(
  null,
);

export const usePairedTermsContext = () => {
  const context = useContext(PairedTermsContext);
  if (context === null) {
    throw new Error(
      'usePairedTermsContext must be used within a PairedTermsContextProvider',
    );
  }

  return context;
};

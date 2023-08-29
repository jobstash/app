import { createContext, useContext } from 'react';

import { GodmodePairedTermsMutFn } from '@jobstash/admin/core';

interface PairedTermsContextProps {
  isLoading: boolean;
  mutatePairedTerms: GodmodePairedTermsMutFn;
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

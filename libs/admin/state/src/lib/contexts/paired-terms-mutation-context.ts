import { createContext, useContext } from 'react';

import { type PairedTermsMutFn } from '@jobstash/admin/core';

export interface PairedTermsMutationContextProps {
  isLoading: boolean;
  mutate: PairedTermsMutFn;
}

export const PairedTermsMutationContext =
  createContext<PairedTermsMutationContextProps | null>(null);

export const usePairedTermsMutationContext = () => {
  const context = useContext(PairedTermsMutationContext);

  if (!context) {
    throw new Error(
      'usePairedTermsContext must be used within a PairedTermsContextProvider',
    );
  }

  return context;
};

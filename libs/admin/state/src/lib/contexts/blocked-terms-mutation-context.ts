import { createContext, useContext } from 'react';

import { type BlockedTermsMutFn } from '@jobstash/admin/core';

export interface BlockedTermsMutationContextProps {
  isLoading: boolean;
  mutateSetBlockedTerms: BlockedTermsMutFn;
  mutateUnsetBlockedTerms: BlockedTermsMutFn;
}

export const BlockedTermsMutationContext =
  createContext<BlockedTermsMutationContextProps | null>(null);

export const useBlockedTermsMutationContext = () => {
  const context = useContext(BlockedTermsMutationContext);

  if (!context) {
    throw new Error(
      'useBlockedTermsContext must be used within a BlockedTermsContextProvider',
    );
  }

  return context;
};

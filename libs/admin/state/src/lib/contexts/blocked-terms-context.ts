import { createContext, useContext } from 'react';

import { GodmodeBlockedTermsMutFn } from '@jobstash/admin/core';

interface BlockedTermsContextProps {
  isLoading: boolean;
  mutateSetBlockedTerms: GodmodeBlockedTermsMutFn;
}

export const BlockedTermsContext =
  createContext<BlockedTermsContextProps | null>(null);

export const useBlockedTermsContext = () => {
  const context = useContext(BlockedTermsContext);

  if (!context) {
    throw new Error(
      'useBlockedTermsContext must be used within a BlockedTermsContextProvider',
    );
  }

  return context;
};

import { createContext, useContext } from 'react';

export interface BlockedTermsContextProps {
  isLoading: boolean;
  isFetching: boolean;
  fetchedBlockedTerms: string[];
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

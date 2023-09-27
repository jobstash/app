import { createContext, useContext } from 'react';

export interface BlockedTermsFormContextProps {
  options: string[];
  currentBlockedTerms: string[];
  blockTerm: (_: string) => void;
  currentUnblockedTerms: string[];
  unblockTerm: (_: string) => void;
  allBlockedTerms: string[];
}

export const BlockedTermsFormContext =
  createContext<BlockedTermsFormContextProps | null>(null);

export const useBlockedTermsFormContext = () => {
  const context = useContext(BlockedTermsFormContext);

  if (!context) {
    throw new Error(
      'useBlockedTermsContext must be used within a BlockedTermsContextProvider',
    );
  }

  return context;
};

import { type ReactNode } from 'react';

import { BlockedTermsContext } from '../contexts/blocked-terms-context';
import { useBlockedTerms } from '../hooks/use-blocked-terms';

interface Props {
  children: ReactNode;
}

export const BlockedTermsProvider = ({ children }: Props) => {
  const value = useBlockedTerms();

  return (
    <BlockedTermsContext.Provider value={value}>
      {children}
    </BlockedTermsContext.Provider>
  );
};

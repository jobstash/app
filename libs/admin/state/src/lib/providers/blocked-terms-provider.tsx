import { type ReactNode } from 'react';

import { BlockedTermsContext } from '../contexts/blocked-terms-context';
import { useBlockedTerms } from '../hooks/use-blocked-terms';

import { CanRenderProvider } from './can-render-provider';

interface Props {
  children: ReactNode;
}

export const BlockedTermsProvider = ({ children }: Props) => {
  const value = useBlockedTerms();

  return (
    <CanRenderProvider>
      <BlockedTermsContext.Provider value={value}>
        {children}
      </BlockedTermsContext.Provider>
    </CanRenderProvider>
  );
};

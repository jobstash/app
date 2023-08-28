import { type ReactNode } from 'react';

import { PairedTermsContext } from '../contexts/paired-terms-context';
import { usePairedTerms } from '../hooks/use-paired-terms';

import { CanRenderProvider } from './can-render-provider';

interface Props {
  children: ReactNode;
}

export const PairedTermsProvider = ({ children }: Props) => {
  const value = usePairedTerms();

  return (
    <CanRenderProvider>
      <PairedTermsContext.Provider value={value}>
        {children}
      </PairedTermsContext.Provider>
    </CanRenderProvider>
  );
};

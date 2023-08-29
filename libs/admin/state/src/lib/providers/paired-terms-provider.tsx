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
        <div className="flex flex-col gap-8 w-full justify-center items-center">
          {children}
        </div>
      </PairedTermsContext.Provider>
    </CanRenderProvider>
  );
};
